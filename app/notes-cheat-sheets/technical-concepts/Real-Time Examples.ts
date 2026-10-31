
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

const realTimeExamplesData: NoteData = {
  title: "Real-Time DevOps Production Examples",
  description:
    "Learn how DevOps engineers handle real production workflows, application deployments, Kubernetes scaling, release failures, troubleshooting, monitoring and recovery through practical end-to-end scenarios.",

  sections: [
    {
      heading:
        "1. Real-Time Project – Deploy a Web Application from GitHub to Production Using Jenkins, Docker and Kubernetes",

      explanation: `PROJECT SCENARIO:

Imagine a company called TechShop operates an online shopping application.

The application contains:
- Frontend: React-based customer interface.
- Backend: Node.js REST API.
- Database: PostgreSQL.
- Source control: GitHub.
- CI/CD: Jenkins.
- Code quality: SonarQube.
- Containerization: Docker.
- Container registry: Amazon ECR.
- Deployment platform: Amazon EKS.
- GitOps: ArgoCD.
- Monitoring: Prometheus and Grafana.

The development team releases new application versions regularly. The DevOps team must automate the process so that developers can push code without manually copying files to production servers.

BUSINESS REQUIREMENT:

When a developer adds a new feature or fixes a bug:
1. Code must be pushed to GitHub.
2. Jenkins must automatically start the pipeline.
3. Application must compile successfully.
4. Automated tests must pass.
5. Code quality and security checks must pass.
6. Docker image must be built.
7. Image must be pushed to Amazon ECR.
8. Kubernetes deployment configuration must be updated.
9. ArgoCD must synchronize the new desired state.
10. Application must become healthy and accessible.
11. Production metrics must be monitored.

REAL-TIME PROJECT ARCHITECTURE:

Developer Laptop
       |
       v
GitHub Repository
       |
       v
Pull Request and Code Review
       |
       v
Jenkins Pipeline
       |
       +----> Checkout Source Code
       |
       +----> Install Dependencies
       |
       +----> Build Application
       |
       +----> Unit Tests
       |
       +----> SonarQube Analysis
       |
       +----> Security Scanning
       |
       v
Docker Image Build
       |
       v
Amazon ECR
       |
       v
GitOps Repository
       |
       v
ArgoCD
       |
       v
Amazon EKS
       |
       v
Kubernetes Service
       |
       v
Ingress / Load Balancer
       |
       v
Customer Accesses Application

Prometheus collects application and cluster metrics.
Grafana displays production health.
Alertmanager notifies the operations team when configured conditions are met.

PROJECT DIRECTORY STRUCTURE:

techshop/
|
+-- frontend/
|   +-- src/
|   +-- package.json
|   +-- Dockerfile
|
+-- backend/
|   +-- src/
|   +-- package.json
|   +-- Dockerfile
|
+-- tests/
|
+-- Jenkinsfile
|
+-- docker-compose.yml
|
+-- k8s/
|   +-- namespace.yaml
|   +-- backend-deployment.yaml
|   +-- backend-service.yaml
|   +-- frontend-deployment.yaml
|   +-- frontend-service.yaml
|   +-- ingress.yaml
|
+-- README.md

HOW THE PROJECT WORKS IN A COMPANY:

Developer Activity:
A backend developer modifies the product API and pushes the code to a feature branch. A pull request is opened and reviewed by another developer.

CI Pipeline:
Jenkins receives the repository event and checks out the exact commit. The pipeline installs dependencies, builds the application and runs automated tests.

Quality Validation:
SonarQube checks configured quality rules. A dependency scanner checks vulnerable packages. A failed mandatory quality gate prevents the artifact from progressing.

Docker Packaging:
The backend application is packaged into a Docker image. The image includes the application and runtime dependencies, not the entire development environment.

Image Publishing:
The image is tagged using a release identifier and commit SHA. Jenkins pushes it to Amazon ECR using an IAM role or securely managed credentials.

CD / GitOps:
The deployment configuration repository is updated with the new image digest. ArgoCD observes the Git change and reconciles the desired Kubernetes state.

Kubernetes Deployment:
The Deployment controller creates a new ReplicaSet. The scheduler assigns Pods to worker nodes. Kubelet starts containers through the container runtime.

Traffic Handling:
A Kubernetes Service provides stable access to healthy Pods. Ingress or a cloud load balancer exposes the application to customers.

Production Verification:
The team checks Pod readiness, application health endpoints, logs, response times and error rates. A successful pipeline alone does not prove that the release is healthy.

IMPORTANT REAL-WORLD RESPONSIBILITIES:

- Developers own application code and unit tests.
- DevOps engineers maintain CI/CD infrastructure and deployment automation.
- Security teams define security policies and review exceptions.
- Platform teams maintain Kubernetes and shared infrastructure.
- Operations teams monitor service health and respond to incidents.

PRODUCTION CONSIDERATIONS:

Use separate Development, QA, Staging and Production environments where required. Keep secrets outside Git and container images. Use immutable image digests, least-privilege access, controlled production approvals and documented recovery procedures.

Database migrations must be backward compatible when old and new application versions may run simultaneously. Rolling back a container does not automatically roll back database changes.`,

      steps: [
        "Step 1 – Create the application repository in GitHub. Organize frontend, backend, tests and deployment configuration into maintainable directories.",
        "Step 2 – Developer creates a feature branch, implements the required API or UI change, runs local tests and pushes the code.",
        "Step 3 – Open a pull request. Reviewers verify application behavior, test coverage, dependencies, configuration changes and security implications.",
        "Step 4 – Merge the approved code into the protected main branch. A GitHub webhook triggers the Jenkins pipeline.",
        "Step 5 – Jenkins checks out the exact commit. The build agent verifies the required Node.js version and installs dependencies using the lock file.",
        "Step 6 – Run application build and automated tests. If compilation or tests fail, Jenkins marks the build as failed and stops the release.",
        "Step 7 – Execute SonarQube analysis and security scans. Enforce the configured quality gate and vulnerability policy.",
        "Step 8 – Build the Docker image using a multi-stage Dockerfile. Run image scanning and verify that the runtime image contains only required dependencies.",
        "Step 9 – Authenticate to Amazon ECR through a secure IAM-based or credential-based mechanism. Push the versioned image and record its immutable digest.",
        "Step 10 – Update the GitOps repository with the new image digest. Do not rebuild a different image for production.",
        "Step 11 – ArgoCD detects the Git change and compares the desired configuration with the live EKS resources. Synchronization applies the approved changes.",
        "Step 12 – Kubernetes creates or updates the Deployment ReplicaSet. The scheduler assigns Pods to suitable nodes and kubelet starts the containers.",
        "Step 13 – Readiness probes verify that the new Pods can serve requests. The Service routes traffic only to eligible endpoints.",
        "Step 14 – Ingress or the external load balancer routes customer requests to the application. Validate DNS, TLS and the actual public endpoint.",
        "Step 15 – Run smoke tests for important customer workflows such as login, product listing and order creation.",
        "Step 16 – Monitor request rate, latency, errors, Pod restarts, CPU and memory. Compare the new release with the previous baseline.",
        "Step 17 – Record the release version, commit SHA, image digest, pipeline ID and deployment revision for future auditing and troubleshooting."
      ],

      commands: `GITHUB – SOURCE CONTROL

git clone https://github.com/ORG/techshop.git

cd techshop

git checkout -b feature/product-api

git add .

git commit -m "Add product API"

git push origin feature/product-api

JENKINS – APPLICATION BUILD

# Backend example using Node.js.
cd backend

npm ci

npm test

npm run build

# Review test reports and build output before publishing.

DOCKER – BUILD APPLICATION IMAGE

docker build \
  -t techshop-backend:1.0.0 \
  ./backend

docker image inspect techshop-backend:1.0.0

docker run --rm \
  -p 3000:3000 \
  techshop-backend:1.0.0

AMAZON ECR – AUTHENTICATION

aws sts get-caller-identity

aws ecr get-login-password \
  --region REGION \
  | docker login \
      --username AWS \
      --password-stdin ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com

docker tag techshop-backend:1.0.0 \
  ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/techshop-backend:1.0.0

docker push \
  ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/techshop-backend:1.0.0

# Retrieve the published image digest using AWS CLI.
aws ecr describe-images \
  --repository-name techshop-backend \
  --region REGION

EKS – CONNECT TO CLUSTER

aws eks update-kubeconfig \
  --region REGION \
  --name techshop-cluster

kubectl cluster-info

kubectl get nodes -o wide

ARGOCD – CHECK APPLICATION

argocd app get techshop

argocd app diff techshop

argocd app sync techshop

argocd app wait techshop --health

KUBERNETES – VERIFY RELEASE

kubectl get deployments -n production

kubectl get replicasets -n production

kubectl get pods -n production -o wide

kubectl rollout status deployment/backend \
  -n production

kubectl get services -n production

kubectl get endpointslices -n production

kubectl logs deployment/backend \
  -n production --tail=100

APPLICATION SMOKE TEST

curl -i https://api.example.com/health

curl -i https://api.example.com/products

# Replace example.com with the actual application hostname.
# Confirm expected HTTP status and response content.`,

      config: `EXAMPLE 1 – BACKEND DOCKERFILE

FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

USER node

EXPOSE 3000

CMD ["node", "dist/server.js"]

Adapt the build output path, start command, Node.js version and health endpoint to the actual application. Pin approved base-image versions and scan the final image.

EXAMPLE 2 – JENKINS PIPELINE

pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        ECR_REPOSITORY = "techshop-backend"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Test') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                dir('backend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                  docker build \
                    -t $ECR_REPOSITORY:$BUILD_NUMBER \
                    ./backend
                '''
            }
        }

        stage('Image Scan') {
            steps {
                echo 'Run approved container image scanner here'
            }
        }

        stage('Publish Image') {
            steps {
                echo 'Authenticate to ECR using Jenkins AWS role or secure credentials'
                echo 'Push the tested image to the approved ECR repository'
            }
        }
    }

    post {
        success {
            echo 'CI stages completed successfully'
        }

        failure {
            echo 'Pipeline failed. Inspect the failed stage and test reports.'
        }

        always {
            cleanWs()
        }
    }
}

This pipeline illustrates the CI stages. Configure Jenkins agents, AWS identity, ECR publishing, scanner integration, quality-gate enforcement and GitOps repository updates for the actual environment. Do not grant unrestricted production access to a generic build agent.

EXAMPLE 3 – KUBERNETES BACKEND DEPLOYMENT

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
          image: ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/techshop-backend@sha256:REPLACE_WITH_DIGEST

          ports:
            - name: http
              containerPort: 3000

          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"
            limits:
              cpu: "1000m"
              memory: "512Mi"

          startupProbe:
            httpGet:
              path: /health
              port: http
            periodSeconds: 5
            failureThreshold: 30

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

Replace the digest placeholder with the actual published image digest. Configure ECR image-pull permissions using the appropriate node or workload identity setup.

EXAMPLE 4 – BACKEND SERVICE

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
      targetPort: http
      protocol: TCP

EXAMPLE 5 – PRODUCTION RELEASE CHECKLIST

Before deployment:
- Pull request approved.
- Build completed.
- Tests passed.
- Quality gate passed.
- Security scan reviewed.
- Image published.
- Image digest recorded.
- Deployment configuration reviewed.
- Database migration compatibility checked.
- Production approval completed, where required.

After deployment:
- New Pods are Ready.
- Deployment rollout completed.
- Service has healthy endpoints.
- Smoke tests passed.
- Error rate remains acceptable.
- Latency remains within SLO.
- No unexpected restart or resource-pressure increase.
- Release metadata recorded.`,

      problems: [
        {
          issue: "Jenkins pipeline fails during npm install.",
          solution: "Check Node.js version, package-lock.json, registry access and dependency availability. Use npm ci for reproducible installation and inspect the exact dependency-resolution error."
        },
        {
          issue: "Docker image builds successfully but application exits immediately.",
          solution: "Inspect docker logs, CMD, entry point, runtime dependencies, environment variables and build output. Confirm the application start command works inside the final runtime image."
        },
        {
          issue: "Amazon ECR returns AccessDenied during image push.",
          solution: "Verify the AWS identity used by Jenkins and the required ECR authentication and repository permissions. Check region, account ID, repository name and token expiration."
        },
        {
          issue: "EKS Pods show ImagePullBackOff.",
          solution: "Inspect Pod events. Verify image URI, digest, ECR repository access, node IAM permissions, image availability and network connectivity to ECR."
        },
        {
          issue: "ArgoCD shows the application OutOfSync after image publishing.",
          solution: "Publishing an image does not automatically modify the GitOps repository. Update the deployment configuration with the exact tested digest and verify ArgoCD's source path and synchronization policy."
        },
        {
          issue: "New Pods are Running but the application endpoint returns errors.",
          solution: "Check readiness status, Service selectors, EndpointSlices, Ingress rules, application logs, database connectivity, configuration and external dependencies."
        },
        {
          issue: "Application deployment succeeds but customers cannot access the website.",
          solution: "Check DNS resolution, TLS certificates, load balancer health, Ingress controller, firewall rules, Service endpoints and the application's public routing configuration."
        },
        {
          issue: "Production application works but the database connection fails intermittently.",
          solution: "Inspect connection limits, network paths, database availability, authentication, connection pooling, timeout settings and database resource utilization."
        },
        {
          issue: "New release causes increased HTTP 5xx errors.",
          solution: "Correlate errors with the release version. Inspect logs, traces, dependencies and latency. Stop further rollout and use the approved rollback or mitigation process."
        },
        {
          issue: "The image in production is different from the image tested in staging.",
          solution: "Use immutable image digests and artifact promotion. Record the digest during CI and verify the actual deployed image reference rather than relying only on mutable tags."
        }
      ]
    },

    {
      heading:
        "2. Real-Time Project – Kubernetes Application Scaling Using HPA, Resource Requests and Load Distribution",

      explanation: `PROJECT SCENARIO:

Imagine the same TechShop application during a major festival sale.

On normal days, the backend handles approximately 100 requests per second. During the sale, traffic increases significantly because customers browse products, search for items and place orders.

The existing three backend Pods begin consuming more CPU. Response times increase and customers experience delays.

The DevOps team must scale the application without manually creating Pods every time traffic changes.

BUSINESS REQUIREMENT:

- Maintain application availability during traffic spikes.
- Increase backend capacity when demand rises.
- Reduce unnecessary replicas when demand decreases.
- Avoid overloading worker nodes.
- Distribute requests across healthy Pods.
- Monitor scaling decisions and application performance.

KUBERNETES SCALING COMPONENTS:

1. Deployment:
Defines the application Pod template and desired replica configuration.

2. Horizontal Pod Autoscaler:
HPA adjusts the number of replicas based on configured metrics such as CPU or memory utilization.

3. Metrics Server:
Provides resource usage metrics to Kubernetes components such as HPA. It is not a complete replacement for Prometheus monitoring.

4. Resource Requests:
Represent the resources Kubernetes uses for scheduling and relative utilization calculations.

5. Resource Limits:
Set upper resource boundaries for containers. CPU limits can cause throttling; memory limits can result in OOM termination.

6. Kubernetes Scheduler:
Assigns new Pods to eligible worker nodes based on resource requests and scheduling constraints.

7. Service:
Provides stable access to the changing set of healthy Pod endpoints.

8. Cluster Autoscaler or Node Autoscaling:
Can add or remove worker-node capacity when Pods cannot be scheduled because the cluster lacks resources. HPA and node autoscaling solve different scaling problems.

REAL-TIME TRAFFIC FLOW:

NORMAL TRAFFIC:

100 Requests / Second
         |
         v
Kubernetes Service
         |
    +----+----+
    |    |    |
    v    v    v
  Pod1  Pod2  Pod3

HIGH TRAFFIC:

800 Requests / Second
         |
         v
Kubernetes Service
         |
    +----+----+----+----+----+
    |    |    |    |    |    |
    v    v    v    v    v    v
  Pod1 Pod2 Pod3 Pod4 Pod5 Pod6

The additional replicas are created only when the HPA observes metrics that satisfy its scaling policy and the cluster has enough capacity.

HOW HPA WORKS INTERNALLY:

1. HPA periodically reads the configured metric values.
2. It compares the current utilization with the desired target.
3. It calculates the required replica count.
4. It updates the scale target when scaling is necessary.
5. The Deployment and ReplicaSet controllers create or remove Pods.
6. The scheduler assigns newly created Pods to suitable Nodes.
7. Kubelet starts containers and evaluates their probes.
8. The Service updates its eligible endpoints as Pods become Ready.

CPU UTILIZATION EXAMPLE:

Suppose a Deployment has three replicas.

Average CPU utilization is 90%.
Configured HPA target is 60%.

The approximate scaling recommendation is:

Desired Replicas =
Current Replicas × (Current Utilization / Target Utilization)

3 × (90 / 60) = 4.5

Kubernetes rounds the required replica count according to its scaling logic and configured policies.

The actual HPA decision can also be influenced by missing metrics, stabilization windows, tolerance, scaling policies and replica limits.

IMPORTANT SCALING DIFFERENCES:

Horizontal Scaling:
Increase or decrease the number of Pods.

Vertical Scaling:
Increase or decrease CPU and memory allocated to an individual Pod.

Cluster Scaling:
Increase or decrease worker-node capacity.

Application-level Scaling:
Improve application concurrency, connection pooling, caching, database capacity and other bottlenecks.

Adding Pods does not automatically solve every performance issue. If all Pods depend on one overloaded database, scaling the application tier may increase database pressure instead of improving performance.

PRODUCTION BEST PRACTICES:

- Set realistic resource requests based on measurements.
- Configure HPA targets that match application behavior.
- Set minimum and maximum replica counts.
- Use readiness and startup probes.
- Use topology spread constraints for critical services.
- Configure node capacity or cluster autoscaling.
- Monitor database connections and downstream dependencies.
- Load-test before major traffic events.
- Use queue-based scaling where asynchronous workloads require it.
- Define scaling stabilization policies to reduce rapid replica fluctuations.`,

      steps: [
        "Step 1 – Establish a baseline by measuring normal request rate, CPU, memory, response latency, error rate and database utilization.",
        "Step 2 – Verify that Metrics Server is installed and resource metrics are available. Run kubectl top pods and kubectl top nodes.",
        "Step 3 – Configure CPU and memory requests for the application container. HPA utilization targets require meaningful resource requests for the relevant resource.",
        "Step 4 – Deploy the application with a minimum of three replicas and suitable health probes.",
        "Step 5 – Create an HPA targeting the Deployment. Configure a CPU utilization target and a maximum replica count based on capacity planning.",
        "Step 6 – Configure scaling behavior, including stabilization windows and policies, to prevent unnecessary rapid scale-up and scale-down cycles.",
        "Step 7 – Generate controlled test traffic in a non-production environment. Use an approved load-testing tool and a realistic traffic pattern.",
        "Step 8 – Observe HPA status using kubectl get hpa. Inspect current CPU utilization, target utilization and replica counts.",
        "Step 9 – Observe Pod creation, scheduling and readiness. Check whether new Pods are distributed across available worker nodes.",
        "Step 10 – Verify that the Kubernetes Service has healthy EndpointSlices and that traffic reaches the new replicas.",
        "Step 11 – Inspect application latency, request rate, errors and downstream database load. Confirm that scaling improves actual customer-facing performance.",
        "Step 12 – Reduce test traffic gradually. Observe scale-down behavior and verify that the stabilization policy prevents premature removal of capacity.",
        "Step 13 – If Pods remain Pending, inspect Node capacity and scheduling events. Configure additional node capacity through the appropriate cluster autoscaling mechanism if needed.",
        "Step 14 – Document the observed peak traffic, scaling behavior, cost impact and recommended production thresholds."
      ],

      commands: `CHECK METRICS SERVER

kubectl get deployment metrics-server -n kube-system

kubectl top nodes

kubectl top pods -n production

# Metrics Server must be available for resource-based HPA metrics.

CHECK DEPLOYMENT

kubectl get deployments -n production

kubectl describe deployment backend -n production

kubectl get pods -n production -o wide

CHECK HPA

kubectl get hpa -n production

kubectl describe hpa backend-hpa -n production

kubectl get hpa backend-hpa -n production -w

CHECK SCALING EVENTS

kubectl get events -n production \
  --sort-by=.metadata.creationTimestamp

CHECK SERVICE ENDPOINTS

kubectl get service backend -n production

kubectl get endpointslices -n production

CHECK NODE CAPACITY

kubectl describe nodes

kubectl get pods -n production \
  -o custom-columns=NAME:.metadata.name,NODE:.spec.nodeName,STATUS:.status.phase

CONTROLLED MANUAL SCALING

kubectl scale deployment backend \
  --replicas=5 \
  -n production

# Manual scaling is useful for controlled operations and testing.
# An active HPA may subsequently change the replica count.

LOAD TESTING EXAMPLE

# Example using an approved load-testing environment.
# Do not run uncontrolled load tests against production.

hey -n 1000 -c 20 \
  https://staging.example.com/api/products

# Review request count, latency and HTTP status distribution.

APPLICATION MONITORING

kubectl logs deployment/backend \
  -n production --tail=200

kubectl top pods -n production

# Compare CPU, memory, latency and error rate during the test.`,

      config: `EXAMPLE 1 – APPLICATION DEPLOYMENT WITH RESOURCE MANAGEMENT

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

  template:
    metadata:
      labels:
        app: backend

    spec:
      containers:
        - name: backend
          image: registry.example.com/backend:1.0

          ports:
            - name: http
              containerPort: 3000

          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"
            limits:
              cpu: "1000m"
              memory: "512Mi"

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

EXAMPLE 2 – HORIZONTAL POD AUTOSCALER

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
          averageUtilization: 60

  behavior:
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Percent
          value: 100
          periodSeconds: 60
        - type: Pods
          value: 4
          periodSeconds: 60
      selectPolicy: Max

    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 25
          periodSeconds: 60

This configuration is illustrative. The CPU target is calculated against CPU requests. Validate actual load, application startup time, node capacity and cost before choosing production values.

EXAMPLE 3 – KUBERNETES SERVICE

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
      targetPort: http

EXAMPLE 4 – POD DISTRIBUTION

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

  template:
    metadata:
      labels:
        app: backend

    spec:
      topologySpreadConstraints:
        - maxSkew: 1
          topologyKey: kubernetes.io/hostname
          whenUnsatisfiable: ScheduleAnyway
          labelSelector:
            matchLabels:
              app: backend

      containers:
        - name: backend
          image: registry.example.com/backend:1.0

This is a scheduling distribution example. For strict availability requirements, validate the failure-domain design, number of Nodes and topology labels.

EXAMPLE 5 – SCALING RESPONSIBILITY

HPA:
Controls the number of application replicas.

Metrics Server:
Supplies resource metrics used by resource-based autoscaling.

Prometheus:
Provides broader monitoring and can supply custom or external metrics when the required adapter and configuration are installed.

Cluster Autoscaler / Node Autoscaling:
Adds or removes worker-node capacity based on cluster scheduling requirements.

Database Scaling:
Requires separate database capacity planning, connection management, query optimization and possibly read replicas or caching.

PRODUCTION SCALING CHECKLIST:

Before scaling:
- Confirm the actual bottleneck.
- Verify CPU and memory requests.
- Check HPA metrics availability.
- Confirm worker-node capacity.
- Review database and downstream limits.
- Define maximum replica and cost boundaries.

During scaling:
- Monitor Pending Pods.
- Monitor readiness and restarts.
- Observe traffic distribution.
- Check latency and error rate.
- Check database connections and queue depth.

After scaling:
- Validate application performance.
- Observe scale-down behavior.
- Review resource consumption.
- Record peak capacity and cost.
- Update runbooks and scaling thresholds.`,

      problems: [
        {
          issue: "HPA shows unknown CPU utilization.",
          solution: "Verify Metrics Server health and kubectl top output. Check whether CPU requests are configured for the relevant containers and whether the metrics API is available."
        },
        {
          issue: "HPA does not increase replicas even when CPU usage is high.",
          solution: "Inspect HPA conditions, current metrics, target utilization, min/max replicas and scaling events. Confirm that the measured metric belongs to the selected Deployment and that scaling has not reached maxReplicas."
        },
        {
          issue: "HPA creates more Pods but they remain Pending.",
          solution: "Inspect Pod events and Node capacity. Check resource requests, taints, tolerations, node selectors and topology constraints. Add worker-node capacity through the approved node autoscaling mechanism if necessary."
        },
        {
          issue: "Pods increase but application latency remains high.",
          solution: "Check whether the bottleneck is the database, external API, network, thread pool, connection pool or a shared cache. More application replicas cannot remove a bottleneck in a shared dependency."
        },
        {
          issue: "CPU utilization stays high because of CPU throttling.",
          solution: "Inspect container CPU limits and runtime metrics. Profile the application, review concurrency and evaluate CPU requests and limits against measured workload requirements."
        },
        {
          issue: "HPA repeatedly scales up and down.",
          solution: "Use suitable stabilization windows and scaling policies. Review metric noise, application startup times, traffic patterns and the configured target."
        },
        {
          issue: "New replicas are Ready but are not receiving traffic.",
          solution: "Check Service selectors, EndpointSlices, readiness conditions, network policies, Ingress configuration and any service-mesh routing rules."
        },
        {
          issue: "Memory usage increases until Pods are OOMKilled.",
          solution: "Inspect memory working set, container limits and application heap or memory profiles. Investigate leaks and workload spikes before changing memory limits."
        },
        {
          issue: "Node autoscaling does not add new worker nodes.",
          solution: "Inspect unschedulable Pod events, node-group limits, IAM permissions, cloud quotas, subnet capacity and autoscaler logs. Confirm that the pending Pods can fit on the configured node types."
        },
        {
          issue: "Traffic increases but HPA does not respond quickly enough.",
          solution: "Review metric collection and evaluation intervals, scaling policies and startup time. Consider custom request-rate or queue-depth metrics through a supported autoscaling adapter, and maintain baseline capacity for predictable peak events."
        }
      ]
    },

    {
      heading:
        "3. Real-Time Production Incident – Failed Kubernetes Deployment, Troubleshooting and Rollback",

      explanation: `PROJECT SCENARIO:

A company operates a customer-facing payment application in production.

The DevOps team deploys version 2.5.0 of the backend application. The Kubernetes Deployment completes its initial update, but customers begin reporting payment failures.

The monitoring dashboard shows:
- HTTP 5xx errors increased.
- Payment API latency increased.
- Some Pods are restarting.
- Application logs contain database connection errors.
- The incident began immediately after the release.

This is a production incident. The priority is to protect customers, limit business impact and restore service safely.

INCIDENT RESPONSE PRINCIPLES:

1. Confirm customer impact.
2. Identify affected services and release versions.
3. Stop additional rollout if the deployment is still progressing.
4. Preserve logs, events and release information.
5. Determine whether rollback is safe.
6. Restore service using the approved recovery procedure.
7. Verify the recovery with actual application checks.
8. Investigate the root cause after service stabilization.
9. Document preventive actions.

PRODUCTION INCIDENT ARCHITECTURE:

Customer Requests
       |
       v
Load Balancer / Ingress
       |
       v
Kubernetes Service
       |
       +------> Old Application Pods
       |
       +------> New Application Pods
                        |
                        v
                  Application Error
                        |
                        v
                  Prometheus Alert
                        |
                        v
                  Alertmanager
                        |
                        v
                  On-Call Engineer
                        |
                        v
                 Incident Investigation
                        |
             +----------+----------+
             |                     |
             v                     v
        Application Logs      Deployment Events
             |                     |
             +----------+----------+
                        |
                        v
                 Root Cause Analysis
                        |
                        v
                Approved Recovery
                        |
                        v
                 Service Verification

HOW A KUBERNETES ROLLING UPDATE CAN FAIL:

During a rolling update, Kubernetes gradually replaces old Pods with new Pods according to the Deployment strategy.

A new version may:
- Start successfully but fail readiness checks.
- Have incorrect environment variables.
- Use an incompatible database schema.
- Fail to connect to a dependency.
- Consume more CPU or memory.
- Return incorrect application responses.
- Pass basic health checks but fail actual business operations.

A Deployment rollout completing does not guarantee that every business transaction works correctly.

INCIDENT TIMELINE:

10:00 – Version 2.5.0 deployment starts.

10:02 – New ReplicaSet creates application Pods.

10:04 – Some Pods become Ready.

10:06 – Customer traffic reaches the new version.

10:08 – Payment API starts returning HTTP 5xx errors.

10:09 – Monitoring alert is triggered.

10:10 – On-call engineer acknowledges the incident.

10:12 – Team checks release history, Pod status and application logs.

10:15 – Team identifies the new release as the likely trigger.

10:17 – Further rollout is stopped if still in progress.

10:20 – Team verifies database and configuration compatibility.

10:22 – Approved rollback is initiated.

10:25 – Previous application version becomes active.

10:28 – Smoke tests and payment checks pass.

10:30 – Error rate returns to the normal range.

These timestamps are an illustrative incident timeline, not a guaranteed recovery duration.

ROLLBACK METHODS:

1. Deployment Rollback:
Kubernetes can restore a previous Deployment revision when the previous ReplicaSet is retained and the rollback is safe.

2. GitOps Rollback:
When ArgoCD manages the application, revert the deployment configuration in Git and allow ArgoCD to synchronize the approved desired state.

3. Image Rollback:
Restore a previously tested image reference or immutable digest through the controlled deployment process.

4. Traffic Rollback:
Where supported, route traffic away from the unhealthy release using the configured canary or blue-green deployment mechanism.

IMPORTANT DATABASE WARNING:

If version 2.5.0 changed the database schema, simply restoring version 2.4.0 may not work.

Database changes should be backward compatible whenever old and new application versions may coexist. Use expand-and-contract migrations, backups and a tested recovery procedure.

ROLLBACK IS NOT THE SAME AS ROOT CAUSE FIX:

Rollback restores a previously known application version. It does not necessarily fix the underlying database, infrastructure, network, configuration or dependency problem.

A complete incident response includes service recovery, root cause analysis and preventive actions.

POST-INCIDENT REVIEW:

Record:
- Incident start and end times.
- Customer impact.
- Affected service and release.
- Detection source.
- Timeline of investigation and actions.
- Root cause and contributing factors.
- Recovery method.
- Data integrity verification.
- Preventive engineering tasks.
- Monitoring and alert improvements.

The goal is to improve system reliability, not to blame the individual who deployed the release.`,

      steps: [
        "Step 1 – Receive the production alert or customer report. Acknowledge the incident and establish who is leading the response.",
        "Step 2 – Confirm customer impact using availability checks, error rate, latency and critical business transaction results.",
        "Step 3 – Identify the affected service, namespace, Deployment, Pod versions and exact release timestamp.",
        "Step 4 – Inspect the Kubernetes Deployment and rollout status. Determine whether the new rollout is still progressing or has completed.",
        "Step 5 – Review Pod events, container restart counts, previous container logs and application logs. Preserve relevant information before changing resources.",
        "Step 6 – Compare the new image digest, environment configuration, secrets references and deployment manifest with the previous release.",
        "Step 7 – Check database connectivity, schema compatibility, external dependencies and infrastructure health. Do not assume the application image is the only possible cause.",
        "Step 8 – If the rollout is still progressing, pause it when appropriate. Prevent additional exposure while the incident lead decides the recovery approach.",
        "Step 9 – Confirm that the previous release is available and compatible with current database and external state. Review the approved rollback procedure.",
        "Step 10 – Execute Deployment rollback or revert the GitOps configuration according to the environment's deployment ownership model. Avoid conflicting manual changes when ArgoCD is reconciling the application.",
        "Step 11 – Watch the recovery rollout. Confirm that previous-version Pods become Ready and the Service has healthy endpoints.",
        "Step 12 – Execute smoke tests and critical business checks. For a payment service, verify safe test transactions or the approved payment validation procedure.",
        "Step 13 – Monitor error rates, latency, traffic, restarts and dependency health until the service is stable.",
        "Step 14 – Communicate service restoration to stakeholders and record the incident timeline.",
        "Step 15 – Perform root cause analysis. Identify whether the failure was caused by code, configuration, database migration, resource capacity, dependency behavior or deployment automation.",
        "Step 16 – Create preventive actions such as improved tests, canary rollout, stronger readiness checks, compatibility validation, alerting and safer release approvals.",
        "Step 17 – Close the incident only after service recovery, required data checks and follow-up ownership have been recorded."
      ],

      commands: `STEP 1 – CHECK DEPLOYMENT STATUS

kubectl get deployments -n production

kubectl describe deployment backend -n production

kubectl rollout status deployment/backend \
  -n production

STEP 2 – CHECK ROLLOUT HISTORY

kubectl rollout history deployment/backend \
  -n production

kubectl rollout history deployment/backend \
  -n production --revision=2

# Inspect the available revision details before selecting a rollback.

STEP 3 – CHECK POD STATUS

kubectl get pods -n production -o wide

kubectl get pods -n production \
  --sort-by=.status.containerStatuses[0].restartCount

kubectl describe pod POD_NAME -n production

STEP 4 – CHECK APPLICATION LOGS

kubectl logs POD_NAME \
  -n production --tail=200

kubectl logs POD_NAME \
  -n production --previous

kubectl logs deployment/backend \
  -n production --since=15m

STEP 5 – CHECK EVENTS

kubectl get events -n production \
  --sort-by=.metadata.creationTimestamp

STEP 6 – CHECK SERVICE AND ENDPOINTS

kubectl get services -n production

kubectl get endpointslices -n production

kubectl describe service backend -n production

STEP 7 – PAUSE A PROGRESSING ROLLOUT

kubectl rollout pause deployment/backend \
  -n production

# Pause only when appropriate to stop further rollout progression.
# Confirm the release controller and deployment ownership first.

STEP 8 – ROLLBACK A DEPLOYMENT

kubectl rollout undo deployment/backend \
  -n production

# Or select a verified previous revision:
kubectl rollout undo deployment/backend \
  --to-revision=2 \
  -n production

# Use only after confirming the revision and recovery safety.

STEP 9 – VERIFY ROLLBACK

kubectl rollout status deployment/backend \
  -n production

kubectl get pods -n production -o wide

kubectl rollout history deployment/backend \
  -n production

STEP 10 – VERIFY APPLICATION

curl -i https://api.example.com/health

curl -i https://api.example.com/products

# Run approved business-level smoke tests.
# Do not use real customer payment data for testing.

STEP 11 – GITOPS RECOVERY

# If ArgoCD owns the desired state:
# 1. Revert the deployment configuration commit in Git.
# 2. Review the diff.
# 3. Obtain required approval.
# 4. Push the approved change.
# 5. Verify ArgoCD reconciliation.

argocd app get techshop

argocd app diff techshop

argocd app sync techshop

argocd app wait techshop --health

IMPORTANT:
Do not mix an emergency kubectl rollback with an active GitOps reconciliation without a recovery plan. ArgoCD may restore the version still declared in Git. The authoritative desired state must be corrected through the appropriate process.`,

      config: `EXAMPLE 1 – DEPLOYMENT WITH CONTROLLED ROLLING UPDATE

apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: production

spec:
  replicas: 4

  revisionHistoryLimit: 10

  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0

  selector:
    matchLabels:
      app: backend

  template:
    metadata:
      labels:
        app: backend

    spec:
      containers:
        - name: backend
          image: registry.example.com/backend:2.5.0

          ports:
            - name: http
              containerPort: 3000

          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"
            limits:
              cpu: "1000m"
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
            failureThreshold: 3

          livenessProbe:
            httpGet:
              path: /health
              port: http
            periodSeconds: 10
            failureThreshold: 3

revisionHistoryLimit controls how many old ReplicaSets are retained for Deployment revision history. A rollback is possible only when the required previous revision is still available.

EXAMPLE 2 – PROMETHEUS PRODUCTION ALERT

groups:
  - name: production-application
    rules:
      - alert: BackendHighErrorRate
        expr: |
          (
            sum(rate(http_requests_total{
              app="backend",
              status=~"5.."
            }[5m]))
            /
            clamp_min(
              sum(rate(http_requests_total{
                app="backend"
              }[5m])),
              0.001
            )
          ) > 0.05
        for: 5m

        labels:
          severity: critical
          service: backend
          environment: production

        annotations:
          summary: "Backend HTTP 5xx rate is high"
          description: "Backend server-error rate has exceeded the configured threshold for five minutes."
          runbook_url: "https://docs.example.com/runbooks/backend-errors"

The metric and labels are illustrative. Verify actual instrumentation and alert thresholds before applying this rule.

EXAMPLE 3 – GITOPS RELEASE CHANGE

Before incident:

image:
  repository: registry.example.com/backend
  digest: sha256:OLD_TESTED_DIGEST

After release:

image:
  repository: registry.example.com/backend
  digest: sha256:NEW_RELEASE_DIGEST

Recovery:

image:
  repository: registry.example.com/backend
  digest: sha256:OLD_TESTED_DIGEST

The recovery change should be reviewed and committed through the GitOps repository's approved process. Use actual immutable image digests rather than relying on mutable tags.

EXAMPLE 4 – SAFE DATABASE MIGRATION STRATEGY

EXPAND PHASE:
- Add a new nullable database column.
- Deploy application code that can work with old and new schema.
- Begin writing the new field while maintaining compatibility.

MIGRATION PHASE:
- Backfill existing records in controlled batches.
- Validate data consistency.
- Monitor database load and migration errors.

CONTRACT PHASE:
- Remove old application references only after all old versions are retired.
- Remove obsolete schema only after compatibility and backup checks.
- Use a separate approved migration procedure.

Never assume a container rollback can reverse a database migration.

EXAMPLE 5 – INCIDENT RESPONSE CHECKLIST

DETECTION:
- Alert received.
- Customer impact confirmed.
- Incident owner assigned.

INVESTIGATION:
- Deployment revision identified.
- Pod status inspected.
- Logs and events preserved.
- Dependencies checked.
- Database compatibility reviewed.

RECOVERY:
- Recovery method approved.
- Previous artifact verified.
- Deployment or GitOps state corrected.
- Healthy replicas confirmed.
- Smoke tests completed.

CLOSURE:
- Customer impact recorded.
- Recovery time recorded.
- Root cause documented.
- Preventive actions assigned.
- Runbook and monitoring updated.

EXAMPLE 6 – POST-INCIDENT REPORT

Incident: Payment API failures after version 2.5.0 deployment.

Impact:
Some payment requests failed during the affected period.

Detection:
Prometheus alert and customer reports.

Primary Investigation:
New release logs showed database connection errors.

Recovery:
The team restored the previous compatible application version through the approved deployment procedure.

Root Cause:
A connection configuration change was introduced without adequate integration validation.

Corrective Actions:
- Add database integration tests.
- Validate configuration before release.
- Add connection-failure alerting.
- Introduce staged rollout.
- Add production smoke tests.
- Document rollback and database compatibility procedures.

This is an illustrative incident report. A real postmortem must use verified evidence from the actual incident.

PRODUCTION RELEASE BEST PRACTICES:

- Use immutable release artifacts.
- Keep deployment revision history.
- Implement readiness and startup probes.
- Use staged or canary releases for high-risk services.
- Validate business workflows, not just Pod status.
- Monitor error rate and latency after deployment.
- Maintain backward-compatible database changes.
- Keep tested recovery artifacts available.
- Avoid conflicting manual changes in GitOps-managed environments.
- Define incident ownership and communication procedures.
- Test rollback procedures before an actual outage.
- Preserve logs, events and audit history during investigations.`,

      problems: [
        {
          issue: "kubectl rollout undo fails because the previous revision is unavailable.",
          solution: "Inspect rollout history and revisionHistoryLimit. Identify a known-good image digest and deployment configuration from the release repository. Restore the verified version through the approved deployment process."
        },
        {
          issue: "Deployment rollback succeeds but customer requests still fail.",
          solution: "Check whether the failure is in the database, network, external payment provider, secrets, configuration or persistent data. Validate the complete request path instead of relying only on Pod readiness."
        },
        {
          issue: "ArgoCD immediately deploys the failed version again after manual rollback.",
          solution: "Git still declares the failed version as desired state. Revert the GitOps configuration to the verified release, review and commit the change, then allow ArgoCD to reconcile it."
        },
        {
          issue: "New Pods fail readiness checks after deployment.",
          solution: "Inspect readiness probe events, application logs, startup duration, port configuration, dependencies and endpoint behavior. Ensure readiness checks test the ability to serve traffic without unnecessarily depending on unrelated systems."
        },
        {
          issue: "Old application version cannot work with the new database schema.",
          solution: "Stop assuming application rollback is safe. Assess the schema and data changes, use the approved database recovery plan and introduce backward-compatible expand-and-contract migrations for future releases."
        },
        {
          issue: "Some Pods show CrashLoopBackOff during the incident.",
          solution: "Inspect previous container logs, exit codes, events, configuration, secrets, startup commands, resource limits and dependency connectivity. Identify the failure before changing restart settings."
        },
        {
          issue: "Kubernetes rollout is complete but customers still see errors.",
          solution: "A successful Deployment rollout only confirms the rollout conditions. Validate real HTTP requests, application business operations, dependency health, error rate and latency."
        },
        {
          issue: "Production incident is detected too late.",
          solution: "Review monitoring coverage and alert thresholds. Add user-facing availability checks, meaningful SLI alerts, release correlation and synthetic tests for critical business operations."
        },
        {
          issue: "Team cannot identify which release caused the incident.",
          solution: "Record commit SHA, pipeline ID, image digest, deployment revision and release timestamp. Add deployment annotations or events to dashboards so engineers can correlate failures with releases."
        },
        {
          issue: "Rollback causes another outage because the previous release is not tested.",
          solution: "Maintain a known-good artifact, test rollback regularly in non-production environments and validate database compatibility, configuration, secrets and external dependency requirements."
        },
        {
          issue: "Incident response team performs conflicting production changes.",
          solution: "Assign an incident lead, communicate actions, identify the authoritative deployment controller and record each operation. Use one coordinated recovery plan rather than multiple untracked changes."
        },
        {
          issue: "Service appears recovered but duplicate or incomplete payment transactions remain.",
          solution: "Perform a separate business-data integrity investigation. Check transaction records, idempotency keys, provider status and reconciliation workflows. Application rollback alone does not guarantee transactional consistency."
        }
      ]
    }
  ]
};

export default realTimeExamplesData;
