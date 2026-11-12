import type { GlossaryTerm } from "./glossary-data";

export const dockerGlossaryDetails: Record<string, Partial<GlossaryTerm>> = {
  "Docker": {
    project: "In a DevMavox application environment, developers use Docker to package the Next.js application and its runtime dependencies into a consistent container image. The same image is tested in development, validated in CI/CD, and deployed to staging and production.",
    purpose: "Docker packages an application and its runtime dependencies into an image so the same application artifact can run consistently across development, testing and production. It reduces environment differences, supports repeatable deployments and makes application scaling easier. Docker containers share the host kernel, unlike traditional virtual machines that normally run separate guest operating systems.",
    workflow: [
      "Create or select the application source code and identify its runtime, dependencies, listening port and startup command.",
      "Write a Dockerfile that defines the base image, dependency installation, application files and container startup behaviour.",
      "Build an image from the Dockerfile and build context using docker build. Apply a meaningful version tag rather than relying only on latest.",
      "Run a container from the image, configure required environment variables, networking, storage and resource limits, and verify application health.",
      "Push the tested image to a registry. Deploy the same immutable image reference to test and production environments, then monitor logs and container health."
    ],
    commands: [
      "# Check Docker client and server versions\ndocker version",
      "# Display Docker Engine information\ndocker info",
      "# Build an image from the current directory\ndocker build -t myapp:1.0 .",
      "# Run the application and publish host port 8080 to container port 3000\ndocker run -d --name myapp -p 8080:3000 myapp:1.0",
      "# Inspect running containers and application logs\ndocker ps\ndocker logs --tail 100 myapp",
      "# Stop and remove the test container\ndocker stop myapp\ndocker rm myapp"
    ],
    mistakes: [
      "Assuming a container is a complete virtual machine; containers share the host kernel and have different isolation boundaries.",
      "Using the latest tag as the only production version identifier, making rollbacks and audit trails harder.",
      "Storing important application data only in the writable container layer, which is lost when the container is removed.",
      "Publishing container ports or mounting host directories without checking the security impact.",
      "Building an image locally but deploying a different tag or image digest in production."
    ],
    configuration: [
      "A typical application container needs an explicit image tag, restart policy, port mapping and environment-specific configuration. Keep secrets outside the image and inject them through an approved secret-management mechanism.",
      "Example: docker run -d --name api --restart unless-stopped -p 8080:3000 -e NODE_ENV=production myapp:1.0",
      "The example assumes the application listens on container port 3000. Change the host and container ports to match the actual application."
    ],
    troubleshooting: [
      "Container exits immediately: inspect docker ps -a and docker logs api. Check the process entrypoint, startup command, missing environment variables and application exceptions.",
      "Application is not reachable: confirm the process listens on 0.0.0.0 inside the container, verify the published port with docker port api, and inspect host firewall rules.",
      "Image build fails: review the first failing Dockerfile instruction, build context, dependency registry access and file paths. Rebuild after correcting the underlying issue."
    ],
    bestPractices: [
      "Use small, maintained base images and pin important production dependencies to controlled versions.",
      "Run the application as a non-root user wherever possible and configure CPU and memory limits according to measured workload needs.",
      "Use health checks, structured logs and immutable image tags or digests for reliable operations.",
      "Keep application data in volumes or external managed storage instead of the disposable container layer."
    ],
    securityConsiderations: [
      "Do not bake passwords, API keys, certificates or cloud credentials into Dockerfiles, image layers or source control.",
      "Scan images for known vulnerabilities and use trusted base images from controlled registries.",
      "Avoid privileged containers and unnecessary Linux capabilities; mount host paths read-only when write access is not required.",
      "Restrict exposed ports and registry permissions to the minimum required."
    ]
  },

  "Docker Image": {
    project: "A CI/CD pipeline builds a versioned Docker image for the DevMavox application, tags it with the Git commit identifier, scans it for vulnerabilities, and pushes the approved image to a container registry for deployment.",
    purpose: "A Docker image is the versioned, read-only application artifact from which containers are created. Images make deployments repeatable because the application files and required runtime dependencies are packaged together. Image layers can be reused by the build cache and shared between related images, reducing storage and build time.",
    workflow: [
      "Create a Dockerfile describing the base image, application dependencies, file-copy operations and runtime configuration.",
      "Build the image with a clear repository name and version tag, using the correct build context.",
      "Inspect the image metadata, size, layers and architecture. Run a test container before publishing it.",
      "Tag the validated image with the destination registry and repository name, then authenticate to that registry.",
      "Push the image and deploy using a controlled tag or immutable digest. Retain earlier versions for rollback."
    ],
    commands: [
      "# Build and tag an image\ndocker build -t myapp:1.2 .",
      "# List local images\ndocker images",
      "# Inspect image configuration and metadata\ndocker image inspect myapp:1.2",
      "# Review image layer history\ndocker history myapp:1.2",
      "# Tag an image for a registry\ndocker tag myapp:1.2 registry.example.com/team/myapp:1.2",
      "# Push the tagged image\ndocker push registry.example.com/team/myapp:1.2"
    ],
    mistakes: [
      "Treating an image tag as immutable; tags can be moved to point to a different image.",
      "Copying unnecessary source files, test data or local build artifacts into the image.",
      "Installing dependencies in separate layers without considering cache invalidation and image size.",
      "Assuming a successful image build proves that the application works correctly at runtime.",
      "Failing to verify CPU architecture compatibility between the build environment and deployment nodes."
    ],
    configuration: [
      "Use a specific base image tag in the FROM instruction and arrange Dockerfile instructions so stable dependency layers can be cached.",
      "Example: docker build --pull -t myapp:1.2 .",
      "For production deployment, record the image digest returned by the registry and use that digest when strict artifact identity is required."
    ],
    troubleshooting: [
      "Image not found: check the exact repository, tag, registry hostname and authentication context.",
      "Unexpectedly large image: inspect docker history, review copied files and add an appropriate .dockerignore file.",
      "Build cache not reused: check whether frequently changing files are copied before dependency installation and whether build arguments or base layers changed."
    ],
    bestPractices: [
      "Use multi-stage builds and .dockerignore to reduce image size and exclude unnecessary files.",
      "Tag images with release versions or commit identifiers and retain a traceable mapping to source code.",
      "Scan and test images before pushing them into production registries.",
      "Use image digests for deployments where exact artifact reproducibility is required."
    ],
    securityConsiderations: [
      "Never include secrets in image layers; deleting a secret in a later layer does not reliably remove it from the earlier layer.",
      "Use trusted, maintained base images and scan the final image for vulnerabilities.",
      "Restrict who can push to production repositories and enable registry access controls."
    ]
  },

  "Docker Container": {
    project: "The DevMavox deployment runs the application as a Docker container created from an approved image. The container receives environment configuration, exposes the application port, and uses health checks so the deployment platform can detect failures.",
    purpose: "A container is an isolated process environment created from an image. It has its own filesystem view, process namespace and network configuration, while sharing the host kernel. Containers provide a consistent way to start, stop, replace and scale application instances without rebuilding the application for every deployment.",
    workflow: [
      "Select a tested image and define the container name, command, environment and resource requirements.",
      "Create the container with docker run or through an orchestrator such as Docker Compose or Kubernetes.",
      "Configure port publishing, networks, persistent volumes and restart behaviour as required.",
      "Verify its state, application logs, health status and resource usage.",
      "Replace or remove the container during deployment while preserving required data in external storage or volumes."
    ],
    commands: [
      "# Start a named container in detached mode\ndocker run -d --name web -p 8080:80 nginx:stable",
      "# List running and stopped containers\ndocker ps -a",
      "# View container logs\ndocker logs --tail 100 web",
      "# Open a shell inside a running container\ndocker exec -it web sh",
      "# Inspect container configuration\ndocker inspect web",
      "# View container resource usage\ndocker stats web"
    ],
    mistakes: [
      "Assuming data written only inside the container filesystem will survive container removal.",
      "Using docker exec as the normal deployment mechanism instead of defining repeatable configuration in an image or deployment file.",
      "Exposing a container port without understanding the host network and firewall configuration.",
      "Ignoring exit codes, logs and health checks when a container repeatedly restarts.",
      "Running every application process as root without assessing whether lower privileges are possible."
    ],
    configuration: [
      "A container can be configured with port mappings, environment variables, volumes, restart policies and resource constraints.",
      "Example: docker run -d --name web --restart unless-stopped --memory 512m --cpus 1 -p 8080:80 nginx:stable",
      "The resource values are illustrative. Set limits based on application load and host capacity."
    ],
    troubleshooting: [
      "Container status is Exited: use docker ps -a and docker logs web to identify startup errors or an invalid command.",
      "Container keeps restarting: inspect its restart count, health status, logs and configured restart policy. Fix the application failure rather than masking it.",
      "Container cannot access a dependency: inspect docker network ls, docker network inspect and the container's DNS and routing configuration."
    ],
    bestPractices: [
      "Keep containers focused on the intended application process and make startup behaviour explicit.",
      "Use health checks and resource limits appropriate to the workload.",
      "Keep persistent data outside the disposable container layer.",
      "Use stable image versions and replace containers through repeatable deployment definitions."
    ],
    securityConsiderations: [
      "Prefer non-root users, read-only filesystems and dropped Linux capabilities when compatible with the application.",
      "Avoid privileged mode unless a documented requirement justifies the expanded host access.",
      "Limit published ports and restrict access to the Docker daemon because daemon access can provide powerful host-level control."
    ]
  },

  "Dockerfile": {
    project: "The DevMavox repository stores a Dockerfile that defines the base runtime, dependency installation, application build, required files, exposed port, and startup command. CI builds the image from this file whenever application code changes.",
    purpose: "A Dockerfile is the declarative build recipe for a Docker image. It documents the base runtime, dependency installation, application files, build-time configuration and default startup behaviour. Keeping this recipe in source control makes image creation repeatable in developer machines and CI pipelines.",
    workflow: [
      "Choose a suitable base image using FROM and establish the working directory with WORKDIR.",
      "Copy dependency manifests first and install dependencies so unchanged dependency layers can be cached.",
      "Copy the required application source and build the application using the appropriate build command.",
      "Set runtime metadata such as USER, EXPOSE and CMD or ENTRYPOINT according to the application.",
      "Build the image, run it locally and verify the startup process, port, logs and filesystem contents."
    ],
    commands: [
      "# Build using the Dockerfile in the current directory\ndocker build -t node-api:1.0 .",
      "# Build using a Dockerfile with a different name\ndocker build -f Dockerfile.production -t node-api:1.0 .",
      "# Rebuild without using the layer cache\ndocker build --no-cache -t node-api:test .",
      "# Display the build history\ndocker history node-api:1.0"
    ],
    mistakes: [
      "Using COPY . . before dependency installation, causing unnecessary cache invalidation whenever source files change.",
      "Forgetting .dockerignore and accidentally copying node_modules, .git, local secrets or build output.",
      "Using RUN for a long-running application process instead of defining the runtime process with CMD or ENTRYPOINT.",
      "Assuming EXPOSE publishes a host port; it documents the intended container port but does not publish it.",
      "Using an unpinned or unsuitable base image without considering reproducibility and security."
    ],
    configuration: [
      "Example Dockerfile for a simple Node.js application:\nFROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY --chown=node:node . .\nUSER node\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]",
      "This example assumes package-lock.json and server.js exist and that the application listens on port 3000. Adapt the runtime version and startup command to the project.",
      "Example .dockerignore entries:\nnode_modules\n.git\n.env\n.next\ncoverage\nnpm-debug.log"
    ],
    troubleshooting: [
      "COPY failed: verify that the source path exists inside the build context and is not excluded by .dockerignore.",
      "Dependency installation fails: check lockfile consistency, package registry access and the base image's runtime compatibility.",
      "Container starts but application is unavailable: verify CMD, application bind address and the actual listening port."
    ],
    bestPractices: [
      "Use explicit base image versions, dependency lockfiles and a small build context.",
      "Order instructions to maximise safe build-cache reuse.",
      "Use multi-stage builds when build tools and development dependencies are not needed at runtime.",
      "Use JSON-array syntax for CMD and ENTRYPOINT to provide predictable signal handling."
    ],
    securityConsiderations: [
      "Do not COPY .env files, private keys or credentials into the image.",
      "Use a non-root runtime user and keep the final runtime image minimal.",
      "Use trusted base images and review package vulnerabilities during CI."
    ]
  },

  "Docker Engine": {
    project: "A developer or CI runner uses Docker Engine to build images, create containers, manage networks, and attach persistent storage while testing the DevMavox application before deployment.",
    purpose: "Docker Engine is the technology that builds and runs containers on a host. The Docker CLI sends requests through the Docker API to the Docker daemon, which manages images, containers, networks and volumes. The engine coordinates lower-level runtime components to create and manage isolated container processes.",
    workflow: [
      "Install and start Docker Engine on a supported host operating system.",
      "The user runs a Docker CLI command such as docker build or docker run.",
      "The CLI communicates with the Docker daemon through the configured Docker API endpoint.",
      "The daemon resolves image and storage requirements and coordinates container creation through the runtime stack.",
      "The daemon reports the resulting state, which operators inspect using Docker commands, logs and events."
    ],
    commands: [
      "# Check client and server availability\ndocker version",
      "# Inspect engine configuration and host details\ndocker info",
      "# Check Docker service status on a systemd Linux host\nsudo systemctl status docker",
      "# Review recent Docker service logs on a systemd Linux host\nsudo journalctl -u docker -n 100 --no-pager",
      "# Inspect recent Docker events\ndocker events --since 10m"
    ],
    mistakes: [
      "Assuming the Docker CLI and Docker daemon are the same component; the CLI is a client and the daemon performs engine operations.",
      "Exposing the Docker API over an unauthenticated network endpoint.",
      "Restarting Docker Engine without considering the impact on running workloads and host operations.",
      "Ignoring daemon logs when commands fail or containers cannot start.",
      "Assuming every Docker installation uses the same service-management mechanism across operating systems."
    ],
    configuration: [
      "On systemd-based Linux hosts, Docker Engine is commonly managed through the docker service. Service names and installation methods can differ by distribution.",
      "Example Linux checks:\nsudo systemctl is-active docker\nsudo systemctl status docker\ndocker info",
      "Docker daemon configuration is commonly stored in /etc/docker/daemon.json on Linux installations. Validate configuration before restarting the daemon."
    ],
    troubleshooting: [
      "Cannot connect to the Docker daemon: check whether the daemon is running, whether the CLI uses the correct context and whether the user has appropriate socket permissions.",
      "Docker service fails to start: inspect systemd journal logs and validate daemon configuration syntax before attempting another restart.",
      "Unexpected engine target: run docker context ls and docker context show to confirm which Docker endpoint the CLI is using."
    ],
    bestPractices: [
      "Keep Docker Engine patched and use supported installation packages.",
      "Monitor daemon health, disk consumption and container resource usage.",
      "Use named Docker contexts deliberately when managing multiple environments.",
      "Limit access to the Docker socket and document daemon configuration changes."
    ],
    securityConsiderations: [
      "Membership in the docker group commonly grants root-equivalent control over a Linux host; grant it only to trusted administrators.",
      "Do not expose an unauthenticated Docker TCP API.",
      "Protect daemon configuration, socket access and host credentials."
    ]
  },

  "Docker Registry": {
    project: "After CI builds and scans a DevMavox application image, it pushes the immutable versioned image to a private registry. Deployment environments pull the same approved image instead of rebuilding it independently.",
    purpose: "A Docker Registry stores and distributes container images. A registry contains repositories, and repositories contain image manifests addressed by tags or digests. CI systems push validated images to a registry, while deployment hosts and orchestrators pull those images when creating application containers.",
    workflow: [
      "Create or select a registry and repository, then configure authentication and access permissions.",
      "Build and test the application image locally or in a CI runner.",
      "Tag the image with the registry hostname, repository path and release version.",
      "Authenticate using the registry's supported login mechanism and push the image.",
      "Configure deployment systems with pull permissions, retrieve the image and deploy the intended version or digest."
    ],
    commands: [
      "# Authenticate to a registry\ndocker login registry.example.com",
      "# Tag a local image for the destination repository\ndocker tag myapp:1.0 registry.example.com/team/myapp:1.0",
      "# Push the image\ndocker push registry.example.com/team/myapp:1.0",
      "# Pull an image from the registry\ndocker pull registry.example.com/team/myapp:1.0",
      "# Inspect the local image identity\ndocker image inspect registry.example.com/team/myapp:1.0"
    ],
    mistakes: [
      "Confusing a registry hostname with a repository name or image tag.",
      "Pushing to the wrong account, region or repository because the registry hostname was incorrect.",
      "Assuming a successful push means deployment hosts have permission to pull the image.",
      "Using mutable tags without recording which image digest was actually deployed.",
      "Embedding registry passwords in scripts, Dockerfiles or source-control files."
    ],
    configuration: [
      "An image reference commonly follows this pattern: registry-host/team-or-project/image-name:tag.",
      "Example: registry.example.com/payments/api:2026.11.06",
      "For Amazon ECR, authenticate using the AWS CLI and the appropriate account, region and IAM permissions:\naws ecr get-login-password --region REGION | docker login --username AWS --password-stdin AWS_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com",
      "Replace REGION and AWS_ACCOUNT_ID with the actual values. Create the ECR repository and grant the required push or pull permissions before using it."
    ],
    troubleshooting: [
      "unauthorized: verify the login identity, token validity and repository permissions.",
      "repository does not exist: verify the registry hostname, namespace and repository creation.",
      "Image pull fails on a deployment node: check network access, DNS, registry availability and the node's image-pull credentials."
    ],
    bestPractices: [
      "Use release-specific tags and retain a traceable relationship between image, commit and pipeline run.",
      "Apply registry lifecycle policies to remove unneeded old images without deleting rollback versions.",
      "Separate development and production repository permissions.",
      "Use image digests when deployments must reference an exact artifact."
    ],
    securityConsiderations: [
      "Use short-lived credentials or managed identity mechanisms where supported.",
      "Enable registry vulnerability scanning and restrict push permissions.",
      "Require authenticated access for private repositories and avoid sharing long-lived credentials.",
      "Protect production images from unauthorised overwrite or deletion."
    ]
  },

  "Docker Volume": {
    project: "A DevMavox service that requires persistent runtime data stores it in a Docker volume. The volume remains available when the application container is replaced during upgrades or recovery.",
    purpose: "A Docker volume provides persistent storage managed by Docker and can outlive an individual container. It is useful for databases, uploaded files and other data that must remain available when containers are replaced. The volume lifecycle is separate from the container lifecycle, but persistence still depends on the host or storage platform and backup strategy.",
    workflow: [
      "Identify which application paths contain data that must survive container replacement.",
      "Create a named volume or allow Docker to create it when the container starts.",
      "Mount the volume at the application's data directory with the correct read and write permissions.",
      "Verify that the application can read and write data and that the data remains after container replacement.",
      "Back up and restore the volume using an appropriate storage-aware process and test recovery."
    ],
    commands: [
      "# Create a named volume\ndocker volume create db-data",
      "# List Docker volumes\ndocker volume ls",
      "# Inspect the volume\ndocker volume inspect db-data",
      "# Mount the volume into a database container\ndocker run -d --name database -v db-data:/var/lib/postgresql/data postgres:16",
      "# Remove a volume after confirming it is no longer needed\ndocker volume rm db-data"
    ],
    mistakes: [
      "Assuming removing a container automatically removes every named volume; named volumes normally remain unless explicitly removed.",
      "Using docker compose down -v without understanding that it removes project-managed volumes.",
      "Deleting a volume before verifying backups and recovery requirements.",
      "Mounting the same writable database volume into multiple independent database instances without a supported shared-storage design.",
      "Ignoring filesystem ownership and permissions inside the container."
    ],
    configuration: [
      "A named volume can be declared in Docker Compose and mounted into a service:\nservices:\n  database:\n    image: postgres:16\n    volumes:\n      - db-data:/var/lib/postgresql/data\nvolumes:\n  db-data:",
      "The PostgreSQL path is illustrative. Use the data directory required by the selected database image and configure credentials securely."
    ],
    troubleshooting: [
      "Data appears missing: inspect the mounted volume name and destination path using docker inspect and docker volume inspect.",
      "Permission denied: check the process UID/GID, volume ownership and image-specific permission requirements.",
      "Disk space is exhausted: inspect host filesystem usage and Docker storage usage before deleting any data."
    ],
    bestPractices: [
      "Use descriptive named volumes for important persistent data.",
      "Define backup frequency, retention, encryption and restore testing for stateful workloads.",
      "Separate application configuration from persistent data.",
      "Document which Compose or deployment cleanup commands can remove volumes."
    ],
    securityConsiderations: [
      "Restrict access to hosts and users that can read or modify volume contents.",
      "Encrypt backups and use storage encryption where supported by the host or storage platform.",
      "Avoid mounting sensitive host directories into containers without a clear requirement."
    ]
  },

  "Docker Bind Mount": {
    project: "During local DevMavox development, a bind mount maps the source-code directory from the developer workstation into the container. Code changes become visible inside the container without rebuilding the image.",
    purpose: "A bind mount maps a specific path from the Docker host filesystem into a container. It is useful when a container must access host-managed files, such as application source code during development or configuration files at runtime. Unlike named volumes, the host path is explicitly selected and managed outside Docker.",
    workflow: [
      "Identify the exact host directory or file that the container needs to access.",
      "Select the container destination path and decide whether access must be read-only or writable.",
      "Start the container with a bind mount using --mount or the supported -v syntax.",
      "Verify the mounted path and file permissions from inside the container.",
      "Update host files when needed and confirm the application sees the expected changes."
    ],
    commands: [
      "# Mount a host source directory into a development container\ndocker run --rm -it --mount type=bind,source=\"${PWD}\",target=/workspace node:22-alpine sh",
      "# Mount a configuration directory read-only\ndocker run -d --name web --mount type=bind,source=/opt/myapp/config,target=/app/config,readonly nginx:stable",
      "# Inspect configured mounts\ndocker inspect web",
      "# Check the mounted path inside a running container\ndocker exec web ls -la /app/config"
    ],
    mistakes: [
      "Mounting the wrong host path because relative paths or working directories were misunderstood.",
      "Using a writable bind mount when the container only needs read access.",
      "Overwriting image files with an empty or incomplete host directory mounted at the same destination.",
      "Assuming host and container users have matching numeric IDs and permissions.",
      "Mounting sensitive host directories such as SSH credentials or system paths without a security review."
    ],
    configuration: [
      "Prefer the explicit --mount syntax for clarity:\ndocker run --mount type=bind,source=/opt/myapp/config,target=/app/config,readonly nginx:stable",
      "On Windows, use a valid path accessible to the Docker runtime. Shell path syntax differs between PowerShell, CMD, WSL and Git Bash.",
      "Use read-only mounts for configuration and certificates when the application does not need to modify them."
    ],
    troubleshooting: [
      "Mount source path is missing: verify the absolute host path and Docker Desktop file-sharing permissions where applicable.",
      "Files are not visible: inspect the container destination and check whether another mount covers the same path.",
      "Permission denied: compare host filesystem permissions with the UID/GID used by the container process."
    ],
    bestPractices: [
      "Use named volumes for Docker-managed persistent application data and bind mounts when a specific host path is required.",
      "Mount only the minimum required directory and use read-only access by default where possible.",
      "Document host path dependencies so deployments remain reproducible.",
      "Avoid relying on a developer's personal directory structure in production."
    ],
    securityConsiderations: [
      "A writable bind mount can allow a container process to modify host files within the mounted path.",
      "Never mount the Docker socket or sensitive host directories into an application container unless the access is essential and controlled.",
      "Review file permissions and avoid exposing secrets through broadly accessible host paths."
    ]
  },

  "Docker Network": {
    project: "The DevMavox application and its supporting services communicate through a dedicated Docker network. Containers use service names for internal communication, while only required application ports are exposed externally.",
    purpose: "A Docker network connects containers and controls how they communicate with each other and external systems. User-defined bridge networks provide container-to-container connectivity and service-name DNS resolution. Network configuration helps separate application tiers, control exposure and define how traffic reaches published host ports.",
    workflow: [
      "Identify which services must communicate and which services must remain isolated.",
      "Create a user-defined bridge network for containers running on the same Docker host when appropriate.",
      "Attach containers to the network and configure application connection strings using service or container names.",
      "Publish only the ports that must be reachable from outside the Docker host.",
      "Inspect network membership, DNS resolution and connectivity when validating or troubleshooting the application."
    ],
    commands: [
      "# Create a user-defined bridge network\ndocker network create app-network",
      "# Run a backend container on the network\ndocker run -d --name backend --network app-network my-backend:1.0",
      "# Run a frontend container on the same network\ndocker run -d --name frontend --network app-network my-frontend:1.0",
      "# Inspect network configuration and connected containers\ndocker network inspect app-network",
      "# Test backend DNS resolution from another container\ndocker run --rm --network app-network busybox nslookup backend",
      "# List available Docker networks\ndocker network ls"
    ],
    mistakes: [
      "Assuming containers on unrelated user-defined bridge networks can communicate directly.",
      "Using localhost inside a container to reach a different container; localhost refers to the current container's own network namespace.",
      "Publishing every service port to the host even when only an edge service needs external access.",
      "Hardcoding container IP addresses instead of using Docker DNS names on a user-defined network.",
      "Confusing a container's listening port with the host port published by Docker."
    ],
    configuration: [
      "A user-defined bridge network supports name-based communication between attached containers.",
      "Example: docker run -d --name api --network app-network my-api:1.0",
      "A frontend on the same network can use the backend service name and its internal listening port, for example http://api:3000. The exact port depends on the application."
    ],
    troubleshooting: [
      "Name resolution fails: verify both containers are attached to the same user-defined network and inspect the network configuration.",
      "Connection refused: check whether the destination process is running and listening on the expected container interface and port.",
      "Host cannot reach service: verify docker port output, host firewall rules and the port-publishing configuration."
    ],
    bestPractices: [
      "Use separate networks for different application tiers when isolation is required.",
      "Prefer service names over container IP addresses for internal communication.",
      "Publish only the ports that external clients need.",
      "Document network ownership, expected traffic paths and required external dependencies."
    ],
    securityConsiderations: [
      "Do not expose databases or internal administration ports to public interfaces without a clear requirement.",
      "Use network segmentation to reduce unnecessary service-to-service connectivity.",
      "Remember that Docker network isolation is not a replacement for host firewall controls, application authentication or encryption."
    ]
  },

  "Docker Compose": {
    project: "The DevMavox development environment uses Docker Compose to define the application and supporting services in one configuration. Developers can start, stop, and inspect the complete local environment using Compose commands.",
    purpose: "Docker Compose defines and manages a multi-container application using a declarative YAML file. It lets teams describe services, networks, volumes, environment configuration and health checks in one project definition. Compose is particularly useful for local development, integration testing and smaller single-host deployments.",
    workflow: [
      "Create a compose.yaml file describing each application service, its image or build context, ports and dependencies.",
      "Declare shared networks and persistent volumes where services require communication or storage.",
      "Validate the Compose configuration before starting the application.",
      "Start the project and inspect service status, logs and health checks.",
      "Update the YAML file and recreate affected services when configuration or image versions change."
    ],
    commands: [
      "# Validate and render the Compose configuration\ndocker compose config",
      "# Build images and start services in the background\ndocker compose up -d --build",
      "# List services and their status\ndocker compose ps",
      "# Follow logs for all services\ndocker compose logs -f",
      "# Follow logs for one service\ndocker compose logs -f backend",
      "# Stop and remove project containers and networks\ndocker compose down"
    ],
    mistakes: [
      "Assuming depends_on alone means a dependency is fully ready to accept application traffic; readiness requires health checks or application-level retry logic.",
      "Using container localhost in one service to connect to another service.",
      "Committing production secrets directly into compose.yaml.",
      "Running docker compose down -v without understanding that named project volumes may be removed.",
      "Assuming Compose automatically provides multi-host orchestration or production-grade high availability."
    ],
    configuration: [
      "Example compose.yaml:\nservices:\n  backend:\n    build: ./backend\n    ports:\n      - \"8080:3000\"\n    environment:\n      NODE_ENV: production\n    depends_on:\n      database:\n        condition: service_healthy\n  database:\n    image: postgres:16\n    environment:\n      POSTGRES_DB: appdb\n      POSTGRES_USER: appuser\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    volumes:\n      - db-data:/var/lib/postgresql/data\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U appuser -d appdb\"]\n      interval: 10s\n      timeout: 5s\n      retries: 5\nvolumes:\n  db-data:",
      "Store DB_PASSWORD outside the committed YAML file, for example in a protected local environment file or an approved secret-management system. The example is a starting point and needs application-specific readiness and credential configuration."
    ],
    troubleshooting: [
      "Compose rejects the YAML: run docker compose config and check indentation, quoting, variable interpolation and service definitions.",
      "Backend cannot connect to database: verify the service name, internal database port, shared network and database readiness.",
      "Changes are not reflected: rebuild the affected image when source files are baked into the image and recreate the relevant service.",
      "Volume data disappears: review cleanup commands and confirm the expected named volume is still present."
    ],
    bestPractices: [
      "Keep the Compose file in source control and use separate override or environment configuration for local and deployment-specific settings.",
      "Use health checks and application retry logic for dependent services.",
      "Pin image versions and persist stateful data in named volumes.",
      "Use profiles when optional services such as monitoring or debugging tools should not always start."
    ],
    securityConsiderations: [
      "Do not commit real passwords, API tokens or private keys to Compose files or environment files.",
      "Restrict published ports and avoid exposing databases unnecessarily.",
      "Use least-privilege users and read-only mounts where practical.",
      "Protect access to the Docker daemon and the host paths mounted into services."
    ]
  },

  "Multi-stage Build": {
    project: "The DevMavox Dockerfile uses separate build and runtime stages. Dependencies and compilation tools stay in the build stage, while the final image contains only the production application and required runtime files.",
    purpose: "A multi-stage Docker build uses multiple FROM instructions in one Dockerfile. An early stage can compile source code and install build tools, while a later stage copies only the required runtime artifacts. This reduces the final image size, removes unnecessary build dependencies and limits the software included in the production runtime image.",
    workflow: [
      "Identify the build-time tools and dependencies required to compile or package the application.",
      "Create a builder stage with a suitable SDK or build image and install the required dependencies.",
      "Compile or package the application into a known output directory.",
      "Create a separate runtime stage with a smaller runtime image and copy only the required artifacts using COPY --from.",
      "Build and test the final image to confirm the application starts without tools or files that existed only in the builder stage."
    ],
    commands: [
      "# Build the final image from a multi-stage Dockerfile\ndocker build -t myapp:1.0 .",
      "# Inspect final image size and metadata\ndocker images myapp:1.0\ndocker image inspect myapp:1.0",
      "# Review final image layers\ndocker history myapp:1.0",
      "# Run the final image to verify its runtime behaviour\ndocker run --rm -p 8080:3000 myapp:1.0"
    ],
    mistakes: [
      "Copying the entire builder filesystem into the final stage instead of selecting only required artifacts.",
      "Using incompatible runtime and builder versions, causing missing libraries or runtime failures.",
      "Forgetting production runtime dependencies that were available in the builder stage but not copied into the final stage.",
      "Assuming a smaller image automatically means a secure image without scanning or configuration review.",
      "Copying generated files from the wrong stage name or output directory."
    ],
    configuration: [
      "Example Node.js multi-stage Dockerfile:\nFROM node:22-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:22-alpine AS runtime\nWORKDIR /app\nENV NODE_ENV=production\nCOPY package*.json ./\nRUN npm ci --omit=dev && npm cache clean --force\nCOPY --from=build /app/dist ./dist\nUSER node\nEXPOSE 3000\nCMD [\"node\", \"dist/server.js\"]",
      "This example assumes the application produces dist/server.js and that its runtime dependencies are declared in package.json. Adapt the build output and runtime command to the actual application."
    ],
    troubleshooting: [
      "COPY --from fails: confirm the stage alias and source path exist in the builder stage.",
      "Final container reports missing modules: verify that required runtime dependencies are installed in the final stage and that the application output was copied correctly.",
      "Final image is still large: inspect its layers and check whether build tools, caches or unnecessary files are being installed in the runtime stage."
    ],
    bestPractices: [
      "Use descriptive stage aliases such as build and runtime.",
      "Copy only required artifacts from the builder stage.",
      "Keep builder and runtime versions compatible and use lockfiles for reproducible dependencies.",
      "Test the final stage independently rather than relying only on a successful build."
    ],
    securityConsiderations: [
      "Keep compilers, package managers and debugging tools out of the final runtime image when they are not needed.",
      "Never pass secrets through Docker build arguments when they could be persisted in build metadata or layers; use supported build secret mechanisms.",
      "Run the final application as a non-root user and scan the final image."
    ]
  }
};

