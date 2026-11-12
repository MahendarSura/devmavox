
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

const howItWorksData: NoteData = {
  title: "How It Works",
  description:
    "Understand how core DevOps technologies work internally, how components communicate, and how applications move from source code to production.",

  sections: [
    {
      heading: "1. How a CI/CD Pipeline Works – From Git Commit to Production",
      explanation: `CI/CD is an automated software delivery process that helps development and operations teams build, test, package, and deploy applications reliably.

Continuous Integration (CI) means developers frequently merge code into a shared repository. Every change can trigger automated validation such as compilation, unit tests, code-quality checks, and security scans.

Continuous Delivery means the application is automatically prepared and validated for release. A production release may still require manual approval.

Continuous Deployment goes one step further: every change that passes the required checks can be automatically deployed to production.

INTERNAL WORKING:

1. Source code is maintained in GitHub, GitLab, or Bitbucket.
2. A developer pushes a commit to a branch or opens a pull request.
3. The Git provider sends a webhook event to Jenkins or another CI/CD platform.
4. The CI/CD platform identifies the repository, branch, commit and pipeline definition.
5. A build agent or runner checks out the exact source-code revision.
6. Dependencies are downloaded and the application is compiled or packaged.
7. Unit tests and integration tests validate application behavior.
8. Static code analysis checks maintainability, bugs and code quality.
9. Security checks scan dependencies, source code and container images.
10. A Docker image is created using the application code and its runtime dependencies.
11. The image is tagged with a version or immutable commit identifier.
12. The image is pushed to a container registry such as Amazon ECR, Docker Hub or Nexus.
13. The deployment stage updates the target environment with the new image.
14. Kubernetes performs the rollout by creating or updating Pods.
15. Readiness checks and application health checks verify the deployment.
16. Monitoring tools collect metrics and logs to identify production issues.

IMPORTANT INTERNAL CONCEPTS:

- Webhook: An HTTP event notification sent by the source-code platform when a configured event occurs.
- Runner/Agent: The machine or container that executes pipeline commands.
- Workspace: The directory where source code and build files are checked out.
- Artifact: A generated output such as a JAR, ZIP or Docker image.
- Pipeline stage: A logical phase such as Build, Test, Scan or Deploy.
- Environment: A deployment target such as Development, QA, Staging or Production.
- Artifact promotion: Moving the same tested artifact between environments rather than rebuilding different binaries for each environment.
- Immutable image tag: A unique tag, preferably based on a commit SHA or release version, that identifies a specific image.
- Deployment gate: A condition that must pass before the next stage can run.

A successful pipeline does not automatically guarantee a healthy production application. Deployment verification, observability, rollback strategy and database compatibility are also essential.`,

      steps: [
        "Step 1 – Developer changes application code and tests it locally. The developer checks the changes using git status and commits the work with a meaningful commit message.",
        "Step 2 – Developer pushes the branch to the remote Git repository. A pull request can trigger an additional validation pipeline before merging.",
        "Step 3 – GitHub sends a webhook event to the CI/CD server. The webhook endpoint receives the event and the pipeline identifies the repository, branch and commit.",
        "Step 4 – Jenkins schedules the pipeline on an available agent. The agent checks out the requested revision and prepares the workspace.",
        "Step 5 – The build stage installs or resolves dependencies and compiles the application. A failed build stops the pipeline.",
        "Step 6 – Automated tests execute. Unit tests validate individual components, integration tests validate communication between components, and end-to-end tests validate complete user workflows.",
        "Step 7 – Code-quality and security checks execute. A quality gate can reject code that does not meet the configured quality criteria.",
        "Step 8 – The packaging stage creates a deployable artifact. For containerized applications, Docker builds an image using the Dockerfile.",
        "Step 9 – The image is tagged with a release version or commit SHA and pushed to the configured registry. The registry stores the image layers and metadata.",
        "Step 10 – The deployment stage updates the target environment. For Kubernetes, the Deployment image is updated and the cluster begins a rollout.",
        "Step 11 – Kubernetes schedules replacement Pods, starts containers and checks readiness probes. Traffic should reach only healthy application instances.",
        "Step 12 – The pipeline verifies rollout status and application health. If validation fails, the release is marked unsuccessful and the configured recovery procedure is followed.",
        "Step 13 – Monitoring tools observe CPU, memory, request rate, latency and error rate. Logs and alerts help the team investigate issues after release.",
        "Step 14 – The team reviews pipeline results, deployment history and production behavior. This feedback improves the next development cycle."
      ],

      commands: `GIT – SOURCE CODE MANAGEMENT

git status
# Check modified and untracked files

git add .
# Stage the changes

git commit -m "Add application health endpoint"
# Create a commit

git push origin main
# Push the commit to the remote repository

JENKINS – PIPELINE EXECUTION

# Open Jenkins and inspect the pipeline job.
# Check the latest build number and build status.
# Open Console Output to inspect execution logs.

# Useful Jenkins CLI examples, when the CLI is configured:
java -jar jenkins-cli.jar -s http://JENKINS_URL/ -auth USER:TOKEN build my-pipeline

DOCKER – IMAGE CREATION

docker build -t myapp:1.0 .
# Build an image using the Dockerfile in the current directory

docker image ls
# List local images

docker run -d --name myapp -p 3000:3000 myapp:1.0
# Start a container and map host port 3000 to container port 3000

docker logs myapp
# Read application container logs

docker inspect myapp
# Inspect container configuration and state

REGISTRY – IMAGE PUBLISHING

docker tag myapp:1.0 REGISTRY_HOST/myapp:1.0
# Add the registry repository name and tag

docker login REGISTRY_HOST
# Authenticate with the registry

docker push REGISTRY_HOST/myapp:1.0
# Upload the image

KUBERNETES – DEPLOYMENT

kubectl get deployments
# List deployments

kubectl get pods -o wide
# Check Pod status and node placement

kubectl rollout status deployment/myapp
# Wait for the rollout to complete

kubectl describe deployment myapp
# Inspect deployment events and configuration

kubectl logs deployment/myapp
# Read logs from a Pod selected by the Deployment

kubectl rollout history deployment/myapp
# View rollout history

kubectl rollout undo deployment/myapp
# Roll back to the previous revision when appropriate

IMPORTANT:
Replace REGISTRY_HOST, application names, ports, credentials and namespaces with the values from your environment. Never place registry passwords or access tokens directly in pipeline source code.`,

      config: `EXAMPLE 1 – JENKINS DECLARATIVE PIPELINE

pipeline {
    agent any

    environment {
        IMAGE_NAME = "myapp"
        IMAGE_TAG = "\${BUILD_NUMBER}"
        REGISTRY = "registry.example.com"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $REGISTRY/$IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'registry-credentials',
                        usernameVariable: 'REGISTRY_USER',
                        passwordVariable: 'REGISTRY_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$REGISTRY_PASSWORD" |
                        docker login "$REGISTRY" \
                          -u "$REGISTRY_USER" --password-stdin
                        docker push "$REGISTRY/$IMAGE_NAME:$IMAGE_TAG"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed. Inspect the failed stage.'
        }
        always {
            cleanWs()
        }
    }
}

This is an illustrative pipeline. Configure the agent with the required Node.js and Docker tools, registry access, Jenkins credentials and workspace permissions. Add a deployment stage only after the target environment and deployment credentials are configured.

EXAMPLE 2 – END-TO-END PIPELINE FLOW

Developer
   |
   v
Git Repository
   |
   | Webhook
   v
Jenkins Pipeline
   |
   +----> Checkout Source
   |
   +----> Install Dependencies
   |
   +----> Build Application
   |
   +----> Unit / Integration Tests
   |
   +----> Code Quality / Security Scan
   |
   +----> Docker Image Build
   |
   +----> Container Registry
   |
   +----> Kubernetes Deployment
   |
   +----> Rollout / Health Verification
   |
   v
Production Application
   |
   +----> Prometheus Metrics
   +----> Grafana Dashboards
   +----> Alertmanager Notifications

EXAMPLE 3 – DEPLOYMENT VERIFICATION

kubectl rollout status deployment/myapp

kubectl get pods -l app=myapp

kubectl get service myapp

kubectl describe pods -l app=myapp

# Confirm:
# 1. New Pods reach Ready state.
# 2. The expected image version is running.
# 3. The Service has healthy endpoints.
# 4. Application health checks succeed.
# 5. No unexpected increase in error rate or latency.

Production pipelines should use protected branches, least-privilege credentials, approval gates where required, immutable artifacts, audit logs and a tested rollback procedure.`,

      problems: [
        {
          issue: "Webhook does not trigger the Jenkins pipeline.",
          solution: "Verify the webhook URL, network connectivity, Jenkins webhook endpoint, repository event configuration and webhook delivery response. Inspect Jenkins logs and the Git provider's webhook delivery history. Confirm that the configured branch and event match the pipeline trigger."
        },
        {
          issue: "Jenkins pipeline fails during source checkout.",
          solution: "Check repository URL, branch name, SSH key or access token, credential permissions and network connectivity. Verify that the Jenkins agent can reach the Git provider and that the requested commit exists."
        },
        {
          issue: "Build fails because dependencies cannot be downloaded.",
          solution: "Inspect package manager logs, repository availability, proxy configuration, lock files and dependency versions. Use reproducible dependency installation and approved internal mirrors where required."
        },
        {
          issue: "Unit tests fail but the build stage succeeds.",
          solution: "Keep test execution as a separate mandatory pipeline stage. Inspect the test report, reproduce the failure locally and correct the application or test data. Do not silently skip failed tests to force a green pipeline."
        },
        {
          issue: "Docker image push fails with an authentication error.",
          solution: "Check registry credentials, token expiry, repository permissions and registry URL. Store credentials in the CI/CD credential manager and authenticate using a short-lived or appropriately scoped credential."
        },
        {
          issue: "Kubernetes deployment succeeds but the application is unavailable.",
          solution: "Check Pod readiness, container logs, Service selectors, EndpointSlices, Ingress rules, application listening port, network policies and readiness probes. A successful manifest update is not proof of application availability."
        },
        {
          issue: "New Pods enter ImagePullBackOff.",
          solution: "Inspect kubectl describe pod output. Verify image name, tag, registry availability, imagePullSecrets and node network access. Confirm that the pushed image exists in the target registry."
        },
        {
          issue: "Pipeline reports success but production users see errors.",
          solution: "Add post-deployment smoke tests and health verification. Compare application error rate, latency and resource usage against the pre-deployment baseline. Use staged rollout or automated rollback based on defined release criteria."
        },
        {
          issue: "Pipeline exposes passwords or access tokens in logs.",
          solution: "Immediately rotate exposed credentials, remove hard-coded secrets, use a secrets manager or CI credential store, restrict job permissions and prevent shell tracing from exposing sensitive values."
        }
      ]
    },

    {
      heading: "2. How Docker Images and Containers Work – Internal Container Lifecycle",
      explanation: `Docker is a containerization platform used to package an application and its runtime dependencies into a portable image. A container is a running instance of an image.

IMAGE INTERNAL WORKING:

A Docker image is built from a sequence of filesystem layers. Each Dockerfile instruction that changes the image filesystem can create a layer. Layers can be reused and shared between images, reducing storage and download requirements.

An image contains application files, dependencies, runtime components and metadata. It does not normally contain a complete independent guest operating system.

CONTAINER INTERNAL WORKING:

1. A user runs docker run.
2. The Docker CLI sends the request to the Docker Engine API.
3. The Docker daemon processes the request.
4. The image is located locally or pulled from a registry.
5. The container configuration is prepared.
6. The container runtime creates the container process.
7. Linux namespaces provide isolation for process IDs, networking, mounts and other resources.
8. Control groups (cgroups) manage and account for resource usage such as CPU and memory.
9. A layered filesystem provides the image's read-only layers plus a writable container layer.
10. The configured entrypoint or command starts as the container's main process.
11. The container receives networking configuration and can communicate through its network interfaces.
12. When the main process exits, the container stops.

IMPORTANT COMPONENTS:

- Docker CLI: Command-line client used to interact with Docker.
- Docker Engine: Platform that manages image and container operations.
- Docker daemon: Background service responsible for Docker operations.
- Image: Immutable template used to create containers.
- Container: Isolated running or stopped instance of an image.
- Dockerfile: Instructions used to build an image.
- Registry: Storage and distribution system for container images.
- Volume: Persistent storage that can exist independently of a container.
- Bind mount: Maps a host filesystem path into a container.
- Network: Provides communication between containers and external systems.
- Namespace: Provides isolation of selected system resources.
- cgroups: Controls and accounts for resource consumption.

IMAGE VS CONTAINER:

Image:
- A packaged template.
- Composed of filesystem layers.
- Normally treated as immutable.
- Can be stored in a registry.

Container:
- An instance created from an image.
- Has runtime configuration and process state.
- Uses a writable container layer by default.
- Can be stopped, restarted or removed.

DATA PERSISTENCE:

Changes written only to a container's writable layer can disappear when the container is removed. Use volumes or bind mounts for data that must survive container replacement.

CONTAINER SECURITY:

Containers share the host kernel. They provide process and resource isolation, but they are not equivalent to separate virtual machines. Use non-root users, minimal base images, trusted image sources, resource limits, image scanning and restricted capabilities.`,

      steps: [
        "Step 1 – Create the application source code and identify its runtime requirements, dependencies, listening port and startup command.",
        "Step 2 – Create a Dockerfile. Choose an appropriate base image, set the working directory, install dependencies and copy the application files.",
        "Step 3 – Run docker build. Docker reads the Dockerfile and creates an image from the instructions. Reusable layers can be obtained from the build cache.",
        "Step 4 – Inspect the image using docker image ls and docker image inspect. Verify its tag, size, exposed ports and metadata.",
        "Step 5 – Start a container using docker run. Docker configures the container's filesystem, networking, environment and resource settings.",
        "Step 6 – The container runtime starts the configured process. The application must listen on the correct interface and port to accept traffic through the container network.",
        "Step 7 – Use docker ps, docker logs and docker inspect to understand the container state, application output and runtime configuration.",
        "Step 8 – Map a host port to the container port when external access is required. A Dockerfile EXPOSE instruction documents a port but does not publish it by itself.",
        "Step 9 – Attach a named volume or bind mount when the application needs persistent or externally managed data.",
        "Step 10 – Build a versioned image and push it to a registry. Deployment systems can pull the same image into other environments.",
        "Step 11 – Stop and remove containers safely. Keep persistent data in managed storage rather than relying on the container's writable layer.",
        "Step 12 – Monitor container health, CPU, memory, logs, restart count and application behavior. A running container does not necessarily mean the application is healthy."
      ],

      commands: `IMAGE BUILDING

docker build -t devmavox-app:1.0 .
# Build an image from the Dockerfile in the current directory

docker image ls
# List local images

docker image inspect devmavox-app:1.0
# Inspect image metadata

docker history devmavox-app:1.0
# View image layer history

CONTAINER LIFECYCLE

docker run -d --name devmavox-app -p 8080:3000 devmavox-app:1.0
# Run in background and map host port 8080 to container port 3000

docker ps
# List running containers

docker ps -a
# List all containers, including stopped ones

docker logs -f devmavox-app
# Follow application logs

docker inspect devmavox-app
# Inspect runtime configuration

docker stats
# Display live resource usage

docker exec -it devmavox-app sh
# Open a shell inside a running container, if the image includes sh

docker stop devmavox-app
# Stop the container gracefully

docker start devmavox-app
# Start an existing stopped container

docker rm devmavox-app
# Remove a stopped container

NETWORKING

docker network ls
# List Docker networks

docker network inspect bridge
# Inspect the default bridge network

docker network create app-network
# Create a user-defined bridge network

docker run -d --name app --network app-network devmavox-app:1.0
# Start a container on the custom network

PERSISTENT STORAGE

docker volume create app-data
# Create a named volume

docker volume ls
# List volumes

docker volume inspect app-data
# Inspect volume details

docker run -d --name db -v app-data:/var/lib/mysql mysql:8
# Illustrative volume mount for a database container.
# Supply the required database environment variables and secrets securely.

REGISTRY

docker tag devmavox-app:1.0 REGISTRY_HOST/devmavox-app:1.0

docker login REGISTRY_HOST

docker push REGISTRY_HOST/devmavox-app:1.0

docker pull REGISTRY_HOST/devmavox-app:1.0

SECURITY AND CLEANUP

docker image ls
docker container ls -a
docker system df
# Inspect Docker disk usage

docker image prune
# Remove unused dangling images

docker builder prune
# Remove unused build cache

Avoid running destructive prune commands on shared production hosts without checking which resources will be removed.`,

      config: `EXAMPLE 1 – PRODUCTION-ORIENTED DOCKERFILE

# syntax=docker/dockerfile:1

FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine AS runtime

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

USER node

EXPOSE 3000

CMD ["node", "dist/server.js"]

This is an illustrative multi-stage Dockerfile for a Node.js application whose build output is in dist/server.js. Adjust the output path and runtime dependencies to match the actual application. Multi-stage builds keep build-only files out of the runtime image.

EXAMPLE 2 – .dockerignore

node_modules
.git
.next
coverage
.env
.env.*
npm-debug.log
Dockerfile*
README.md

Do not copy secrets or unnecessary development files into the build context. If the build needs a specific file, allow it explicitly.

EXAMPLE 3 – DOCKER COMPOSE

services:
  web:
    build: .
    container_name: web-app
    ports:
      - "8080:3000"
    environment:
      NODE_ENV: production
    depends_on:
      - redis
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    volumes:
      - redis-data:/data
    networks:
      - app-network

volumes:
  redis-data:

networks:
  app-network:
    driver: bridge

Note: depends_on controls startup ordering, not application readiness. Use a health check and application-level retry logic when the application depends on Redis being ready.

EXAMPLE 4 – CONTAINER RUNTIME FLOW

Docker CLI
   |
   v
Docker Engine API
   |
   v
Docker Daemon
   |
   +----> Image / Registry
   |
   +----> Container Configuration
   |
   v
Container Runtime
   |
   +----> Namespaces
   +----> cgroups
   +----> Filesystem Layers
   +----> Network Configuration
   |
   v
Container Process
   |
   v
Application

EXAMPLE 5 – IMPORTANT PORT MAPPING

docker run -d --name web -p 8080:3000 devmavox-app:1.0

Host machine port: 8080
Container port: 3000

The Dockerfile EXPOSE instruction is metadata/documentation. The -p option publishes a host port to a container port.

PRODUCTION BEST PRACTICES:

- Prefer small, trusted and maintained base images.
- Pin image versions and consider digest-based references.
- Use multi-stage builds.
- Run as a non-root user wherever possible.
- Never bake credentials into an image.
- Scan images for known vulnerabilities.
- Set CPU and memory limits appropriate to the workload.
- Configure health checks and application logging.
- Use volumes for persistent data.
- Keep container processes in the foreground.
- Use an image tag tied to a release or commit.
- Rebuild images regularly to include security updates.`,

      problems: [
        {
          issue: "docker build fails because a file or directory cannot be found.",
          solution: "Check the build context, Dockerfile location, COPY source paths and .dockerignore rules. Run docker build from the intended directory and verify that required files are included in the build context."
        },
        {
          issue: "Container starts and immediately exits.",
          solution: "Run docker ps -a and docker logs CONTAINER_NAME. Inspect the ENTRYPOINT and CMD, missing environment variables, application startup errors and exit code. The main container process must remain running."
        },
        {
          issue: "Application works inside the container but cannot be accessed from the host.",
          solution: "Verify the application listens on 0.0.0.0 rather than only 127.0.0.1 inside the container. Check docker run -p mapping, host firewall rules and the actual application listening port."
        },
        {
          issue: "Container cannot connect to another container.",
          solution: "Verify both containers are attached to the same user-defined network, inspect network configuration and use the destination container's service or container name and listening port. Check application bind addresses and firewall rules."
        },
        {
          issue: "Data disappears after container removal.",
          solution: "Store persistent data in a named volume or managed external storage. Verify the mount destination and permissions using docker inspect and docker volume inspect."
        },
        {
          issue: "Image size is unexpectedly large.",
          solution: "Use a suitable minimal base image, multi-stage builds, .dockerignore and production-only dependencies. Inspect docker history to identify large layers."
        },
        {
          issue: "Container repeatedly restarts.",
          solution: "Inspect docker logs, docker inspect restart policy, exit codes and application health. Identify whether the process is crashing, failing startup validation or being terminated due to resource pressure."
        },
        {
          issue: "Container exits with an out-of-memory error.",
          solution: "Inspect docker stats, host memory and container resource limits. Investigate application memory consumption and tune limits based on measured workload requirements."
        },
        {
          issue: "Permission denied when writing to a mounted volume.",
          solution: "Check the container's effective user ID, host directory ownership, filesystem permissions and mount configuration. Grant only the minimum permissions required; avoid using privileged mode as a shortcut."
        },
        {
          issue: "Docker image push or pull fails.",
          solution: "Check registry DNS, network connectivity, credentials, image repository name, tag, permissions and available disk space. Inspect the registry response for the exact failure."
        }
      ]
    },

    {
      heading: "3. How Kubernetes Deployments Work – From Desired State to Running Pods",
      explanation: `Kubernetes is a container orchestration platform. It manages containerized applications across a cluster of machines called Nodes.

Kubernetes follows a declarative model. The user describes the desired state in YAML or through the Kubernetes API. Controllers continuously compare the actual cluster state with the desired state and take action to reduce the difference.

DEPLOYMENT INTERNAL WORKING:

1. An engineer submits a Deployment manifest using kubectl apply.
2. kubectl sends an HTTPS request to the Kubernetes API Server.
3. The API Server authenticates the request, authorizes the user and validates the resource.
4. Admission controls may apply additional validation or mutation.
5. The API Server stores the accepted resource state in etcd.
6. The Deployment controller observes the new or changed Deployment.
7. The Deployment controller creates or updates a ReplicaSet.
8. The ReplicaSet controller observes that the required number of Pods does not exist and creates Pod objects.
9. The Scheduler watches unscheduled Pods and selects suitable Nodes based on resource requests, constraints, policies and scheduling rules.
10. The selected Node's kubelet observes the assigned Pod.
11. Kubelet asks the container runtime to pull images and create the required containers.
12. The container runtime starts the application containers.
13. The configured CNI plugin provides Pod networking.
14. Kubelet executes startup, readiness and liveness probes according to the Pod specification.
15. The Service controller and endpoint mechanisms make ready backends available to Service traffic.
16. The controller loops continue reconciling the cluster state.

IMPORTANT CONTROL PLANE COMPONENTS:

API Server:
The front door to the Kubernetes API. It handles API requests, authentication, authorization, admission and resource persistence coordination.

etcd:
A consistent distributed key-value store used by Kubernetes to store cluster state and configuration. It should be backed up and secured.

Scheduler:
Selects a suitable Node for each unscheduled Pod. It considers resource requests, node selectors, affinity, taints, tolerations and other scheduling constraints.

Controller Manager:
Runs controllers that continuously reconcile desired and actual states. Examples include Deployment, ReplicaSet and Node controllers.

CLOUD CONTROLLER MANAGER:
Integrates Kubernetes with cloud-provider functionality such as load balancers, routes and node-related cloud resources when configured.

WORKER NODE COMPONENTS:

Kubelet:
The node agent responsible for ensuring that Pods assigned to the node are running as specified.

Container Runtime:
Runs containers. Common examples include containerd and CRI-O.

Kube-proxy:
In clusters that use it, maintains network rules for Service virtual IP traffic. Some cluster networking implementations replace its role with other dataplane solutions.

CNI:
The Container Network Interface plugin configures Pod networking. Pods receive network connectivity according to the cluster's networking implementation.

DEPLOYMENT, REPLICASET AND POD:

Deployment manages application rollout and desired replica configuration.

ReplicaSet maintains the requested number of matching Pods.

Pod is the smallest deployable Kubernetes object and can contain one or more tightly coupled containers.

SERVICE AND INGRESS:

A Service provides a stable network identity for a changing set of Pods. It selects matching Pods using labels and exposes them through a virtual IP or other supported Service type.

Ingress defines HTTP and HTTPS routing rules, but it requires an Ingress controller to implement those rules. Gateway API is another option for modern traffic management.

HEALTH PROBES:

- Startup probe: Gives an application time to start before liveness or readiness checks take effect.
- Readiness probe: Determines whether a Pod should receive Service traffic.
- Liveness probe: Determines whether a container should be restarted when it is unhealthy.

A readiness failure does not automatically restart the container. A liveness failure can cause a restart. Incorrect probes can create outages, so probe endpoints and timing must be designed carefully.

SELF-HEALING:

If a Pod disappears, the ReplicaSet controller attempts to create another Pod to restore the desired replica count. If a container fails its liveness probe, kubelet can restart it. If a Node becomes unavailable, workload recovery depends on controller behavior, scheduling capacity, storage constraints and configured tolerations.

Kubernetes does not guarantee that every application failure is automatically fixed. Persistent application errors, broken dependencies, bad configuration and insufficient cluster capacity still require investigation.`,

      steps: [
        "Step 1 – Create a Kubernetes cluster with a control plane and one or more worker nodes. Configure kubectl to communicate with the correct cluster context.",
        "Step 2 – Create a Deployment YAML describing the application image, desired replica count, labels, ports, resource requests and health probes.",
        "Step 3 – Run kubectl apply. The API Server authenticates and validates the request and persists the accepted resource state.",
        "Step 4 – The Deployment controller observes the desired replica count and creates a ReplicaSet.",
        "Step 5 – The ReplicaSet controller creates Pod objects to reach the desired count.",
        "Step 6 – The Scheduler assigns unscheduled Pods to suitable worker nodes. A Pod may remain Pending if no node satisfies its requirements.",
        "Step 7 – Kubelet on the selected node asks the container runtime to pull the image and start the containers.",
        "Step 8 – The networking plugin configures Pod connectivity. The Pod receives its cluster network identity.",
        "Step 9 – Kubelet runs configured probes. Readiness determines whether the Pod can receive normal Service traffic.",
        "Step 10 – A Service selects matching Pods through labels and provides a stable way to reach them.",
        "Step 11 – An Ingress controller or Gateway implementation routes external requests according to configured routing rules.",
        "Step 12 – During an update, the Deployment controller creates a new ReplicaSet and manages the rollout according to the configured strategy.",
        "Step 13 – If the new version fails, inspect rollout status, Pod events, logs and health checks before deciding whether to pause or roll back.",
        "Step 14 – Monitoring and logging systems observe application behavior, resource usage and cluster health."
      ],

      commands: `CLUSTER INFORMATION

kubectl config get-contexts
# List configured cluster contexts

kubectl config current-context
# Show the active context

kubectl cluster-info
# Display control-plane endpoint information

kubectl get nodes -o wide
# List cluster nodes

APPLICATION DEPLOYMENT

kubectl apply -f deployment.yaml
# Create or update resources from a manifest

kubectl get deployments
# List Deployments

kubectl get replicasets
# List ReplicaSets

kubectl get pods -o wide
# List Pods with node placement

kubectl describe deployment myapp
# Inspect Deployment configuration and events

kubectl describe pod POD_NAME
# Inspect a specific Pod

kubectl logs POD_NAME
# Read container logs

kubectl logs POD_NAME -c CONTAINER_NAME
# Read logs from a specific container in a multi-container Pod

kubectl exec -it POD_NAME -- sh
# Open a shell if the container image includes sh

SCALING

kubectl scale deployment myapp --replicas=4
# Set the desired replica count to four

kubectl get deployment myapp -w
# Watch Deployment changes

ROLLOUT

kubectl rollout status deployment/myapp
# Monitor rollout progress

kubectl rollout history deployment/myapp
# View rollout revisions

kubectl rollout pause deployment/myapp
# Pause a rollout

kubectl rollout resume deployment/myapp
# Resume a paused rollout

kubectl rollout undo deployment/myapp
# Roll back to the previous revision

kubectl rollout undo deployment/myapp --to-revision=2
# Roll back to a selected revision

SERVICE AND NETWORKING

kubectl get services
# List Services

kubectl get endpointslices
# Inspect Service backend endpoint information

kubectl get ingress
# List Ingress resources

kubectl get networkpolicies
# List NetworkPolicies

DEBUGGING

kubectl get events --sort-by=.metadata.creationTimestamp
# Inspect recent cluster events

kubectl top nodes
# View node CPU and memory usage, if Metrics Server is available

kubectl top pods
# View Pod CPU and memory usage, if Metrics Server is available

kubectl get pods --all-namespaces
# List Pods across namespaces

kubectl describe node NODE_NAME
# Inspect node conditions, capacity and allocated resources

kubectl get pods -o yaml
# Inspect Pod specifications and status

Always verify the active context and namespace before executing changes. Rollback changes application workloads, not necessarily external database schema or persistent data.`,

      config: `EXAMPLE 1 – KUBERNETES DEPLOYMENT

apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp

spec:
  replicas: 3

  selector:
    matchLabels:
      app: myapp

  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0

  template:
    metadata:
      labels:
        app: myapp

    spec:
      containers:
        - name: myapp
          image: registry.example.com/myapp:1.0
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

This manifest assumes that the application listens on port 3000 and implements /health and /ready endpoints. Configure the probe paths and resource values based on actual application behavior and measured resource usage.

EXAMPLE 2 – KUBERNETES SERVICE

apiVersion: v1
kind: Service
metadata:
  name: myapp

spec:
  type: ClusterIP

  selector:
    app: myapp

  ports:
    - name: http
      port: 80
      targetPort: http
      protocol: TCP

The Service selects Pods with the label app=myapp. The port is the Service port and targetPort refers to the named container port.

EXAMPLE 3 – REQUEST FLOW

External User
     |
     v
Cloud Load Balancer
     |
     v
Ingress Controller
     |
     v
Kubernetes Service
     |
     +----------+----------+
     |          |          |
     v          v          v
   Pod 1      Pod 2      Pod 3
     |          |          |
     +----------+----------+
                |
                v
          Application

The exact packet path depends on the cluster's CNI, Service implementation, dataplane and cloud networking configuration.

EXAMPLE 4 – CONTROL PLANE RECONCILIATION FLOW

Engineer
   |
   v
kubectl apply
   |
   v
API Server
   |
   v
Authentication / Authorization / Admission
   |
   v
etcd
   |
   v
Deployment Controller
   |
   v
ReplicaSet Controller
   |
   v
Pod Objects
   |
   v
Scheduler
   |
   v
Worker Node
   |
   +----> Kubelet
   |
   +----> Container Runtime
   |
   +----> CNI Networking
   |
   v
Running Application

EXAMPLE 5 – HORIZONTAL POD AUTOSCALER

apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa

spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp

  minReplicas: 2
  maxReplicas: 10

  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70

This example assumes resource requests are defined on the application containers and a compatible metrics pipeline is available. HPA adjusts replica count based on observed metrics; it does not automatically increase node capacity.

PRODUCTION BEST PRACTICES:

- Use namespaces to separate environments or workloads.
- Define resource requests and suitable limits.
- Configure startup, readiness and liveness probes correctly.
- Use rolling updates and verify rollout health.
- Keep secrets out of plain-text source repositories.
- Apply RBAC with least privilege.
- Restrict Pod-to-Pod traffic using NetworkPolicies where supported.
- Use PodDisruptionBudgets for workloads that require availability during voluntary disruptions.
- Monitor cluster capacity and application saturation.
- Back up etcd according to the cluster distribution's documented procedure.
- Keep Kubernetes versions and node images supported and patched.
- Use persistent storage classes appropriate for the workload.
- Test restore and rollback procedures, not only deployment procedures.`,

      problems: [
        {
          issue: "Pod remains in Pending state.",
          solution: "Run kubectl describe pod POD_NAME and inspect events. Common causes include insufficient CPU or memory, unavailable nodes, unbound PersistentVolumeClaims, node selectors, taints and tolerations, or scheduling constraints. Fix the actual scheduling requirement rather than deleting the Pod repeatedly."
        },
        {
          issue: "Pod shows ImagePullBackOff or ErrImagePull.",
          solution: "Inspect Pod events and verify the image repository, tag, registry access, imagePullSecrets and node network connectivity. Confirm that the image exists and that the credentials have permission to pull it."
        },
        {
          issue: "Pod enters CrashLoopBackOff.",
          solution: "Check kubectl logs POD_NAME --previous and kubectl describe pod POD_NAME. Investigate application startup failures, missing configuration, incorrect commands, unavailable dependencies, permission issues and failed liveness probes."
        },
        {
          issue: "Deployment rollout remains incomplete.",
          solution: "Run kubectl rollout status deployment/myapp and inspect the Deployment, ReplicaSets, Pods and events. Check readiness failures, image pull problems, insufficient resources, quota limits and maxSurge/maxUnavailable settings."
        },
        {
          issue: "Service cannot reach application Pods.",
          solution: "Verify Service selectors against Pod labels, inspect EndpointSlices, check targetPort and application listening port, and inspect NetworkPolicies and CNI health. Confirm the application listens on the Pod interface rather than only localhost."
        },
        {
          issue: "Pod is Running but not Ready.",
          solution: "Inspect readiness probe failures and application health endpoint responses. Check the probe path, port, initial delay, timeout, thresholds and dependencies. Running means the container process exists; Ready means it has passed its readiness condition."
        },
        {
          issue: "Pod repeatedly restarts.",
          solution: "Inspect previous container logs, restart count, termination reason, liveness probe results and resource usage. Investigate OOMKilled events, application crashes and incorrect health-check thresholds."
        },
        {
          issue: "Application is unavailable through Ingress.",
          solution: "Check whether an Ingress controller is installed and healthy. Validate Ingress class, host rules, paths, TLS configuration, Service name, Service port, backend endpoints and DNS resolution."
        },
        {
          issue: "Horizontal Pod Autoscaler does not scale.",
          solution: "Run kubectl describe hpa myapp-hpa and inspect metric availability. Confirm Metrics Server or the required custom metrics adapter is healthy, resource requests are defined and the target Deployment is correct."
        },
        {
          issue: "New release causes production errors.",
          solution: "Check rollout history, application logs, readiness, error rate and latency. If the previous application version is compatible with the current database and configuration, use kubectl rollout undo deployment/myapp. Handle database migrations separately and follow the tested recovery plan."
        }
      ]
    }
  ]
};

export default howItWorksData;
