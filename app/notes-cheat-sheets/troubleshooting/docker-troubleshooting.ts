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

export const dockerTroubleshooting: NoteData = {
  title: "Docker A–Z Complete Practical and Production Troubleshooting Notes",

  description:
    "Complete Docker learning notes covering fundamentals, architecture, installation, Dockerfiles, images, containers, networking, volumes, Compose, registries, security, resource management, logging, BuildKit, production workflows and real-world troubleshooting.",

  sections: [
    {
      heading: "01. Docker Fundamentals – What is Docker?",
      explanation: `
Docker is a containerization platform. It packages an application and its required dependencies into an image.

A developer may face a common problem:

The application works on the developer's laptop but fails on the testing server.

Possible reasons:
- Different Java or Node.js versions.
- Missing operating-system packages.
- Different library versions.
- Incorrect environment variables.
- Different file paths.
- Different application configuration.

Docker helps reduce these environment differences by packaging the application and its runtime dependencies into an image.

IMPORTANT CONCEPTS:

1. Docker Image:
An image is a packaged template used to create containers. It contains application files, dependencies and configuration metadata.

2. Docker Container:
A container is a running or stopped instance created from an image. It runs an application process in an isolated environment.

3. Dockerfile:
A text file containing instructions to build an image.

4. Docker Engine:
The software responsible for managing Docker images, containers, networks and volumes.

5. Docker Registry:
A service used to store and distribute Docker images. Examples include Docker Hub and private registries.

6. Docker Volume:
Persistent storage used by containers.

7. Docker Network:
Allows containers to communicate with each other and with external systems.

8. Docker Compose:
A tool for defining and running applications containing multiple containers.

IMAGE VS CONTAINER:

Image:
- Template.
- Read-only layers.
- Used to create containers.
- Can be stored in a registry.

Container:
- Runtime instance.
- Has a writable container layer.
- Runs application processes.
- Can be started, stopped and removed.

DOCKER VS VIRTUAL MACHINE:

A virtual machine runs its own guest operating system and kernel.

A normal Linux container shares the host Linux kernel and uses kernel isolation features.

Docker containers are generally lighter than full virtual machines, but they are not a replacement for every VM use case.

REAL-TIME EXAMPLE:

A company develops a Java application.

Developer builds the application and creates a Docker image.

The image is tested in the QA environment.

After successful testing, the same image version is deployed to production.

The application configuration can differ between QA and production without rebuilding the application image.
      `,
      steps: [
        "Identify the application language and runtime version.",
        "Identify required libraries, packages and application files.",
        "Create a Dockerfile.",
        "Build an image using docker build.",
        "Run a container using docker run.",
        "Verify application logs and health.",
        "Push the tested image to a registry.",
        "Deploy the same image version in the target environment."
      ],
      commands: `
docker --version
docker version
docker info

docker image ls
docker ps
docker ps -a

docker pull nginx
docker run -d --name web nginx

docker logs web
docker inspect web

docker stop web
docker rm web
      `,
      problems: [
        {
          issue: "Application works on the developer laptop but fails on the server.",
          rootCause:
            "Runtime versions, dependencies, operating-system packages or configuration may differ between environments.",
          solution:
            "Package the application and required runtime dependencies into an image. Test the same image that will be deployed."
        },
        {
          issue: "Container is running but the application is not accessible.",
          rootCause:
            "The application may not have started correctly, may be listening on the wrong address or may not have a published port.",
          solution:
            "Check application logs, container port configuration, published ports, health endpoint and network connectivity."
        }
      ]
    },

    {
      heading: "02. Docker Architecture – CLI, Daemon, containerd and runc",
      explanation: `
Docker uses a client-server architecture.

MAIN COMPONENTS:

1. Docker CLI:
The command-line interface used by engineers.

Example:
docker run nginx

2. Docker Daemon – dockerd:
The background service that manages Docker objects such as images, containers, networks and volumes.

3. Docker Engine API:
The API through which clients communicate with the Docker daemon.

4. containerd:
A container runtime component responsible for container lifecycle management.

5. runc:
An OCI runtime commonly used to create and run containers.

6. OCI:
Open Container Initiative. It defines standards for container images and runtimes.

HOW docker run WORKS INTERNALLY:

Step 1:
Engineer executes docker run nginx.

Step 2:
Docker CLI sends a request to the Docker Engine API.

Step 3:
Docker daemon checks whether the nginx image is available locally.

Step 4:
If the image is missing, Docker attempts to pull it from a registry.

Step 5:
Docker prepares the container configuration, filesystem, networking and mounts.

Step 6:
Runtime components create the container process environment.

Step 7:
The nginx process starts.

Step 8:
Docker reports the container status.

LINUX ISOLATION CONCEPTS:

Namespaces:
Provide isolation for process IDs, networking, mount points, hostnames and other system resources.

Cgroups:
Control and account for resource usage such as CPU and memory.

Union or layered filesystems:
Allow images to be composed from reusable filesystem layers.

IMPORTANT:
A container is not a complete virtual machine. It uses the host kernel in a normal Linux container environment.

TROUBLESHOOTING LAYERS:

- CLI problem.
- Wrong Docker context.
- Daemon unavailable.
- Image download failure.
- Runtime failure.
- Host resource or permission issue.
- Application startup failure.

An engineer should identify which layer failed before changing the system.
      `,
      steps: [
        "Check Docker client and server versions.",
        "Check the active Docker context.",
        "Check Docker daemon status.",
        "Check daemon logs if the engine is unavailable.",
        "Check image availability and container creation errors.",
        "Separate infrastructure errors from application errors."
      ],
      commands: `
docker version
docker info

docker context ls
docker context show

# Linux
sudo systemctl status docker

sudo journalctl -u docker --since "30 minutes ago"

# Show recent Docker events
docker events --since 30m
      `,
      problems: [
        {
          issue: "Cannot connect to the Docker daemon.",
          rootCause:
            "The daemon may be stopped, the Docker context may point to the wrong endpoint or the user may lack socket access.",
          solution:
            "Verify the active context, check daemon status and review socket permissions. Do not make the Docker socket world-writable."
        },
        {
          issue: "Docker commands are affecting an unexpected server.",
          rootCause:
            "The active Docker context may point to a remote Docker Engine.",
          solution:
            "Run docker context show and docker context ls. Select the intended context and verify its endpoint before running commands."
        }
      ]
    },

    {
      heading: "03. Docker Installation and Host Preparation",
      explanation: `
Docker installation depends on the operating system.

Linux:
Docker Engine normally runs as a system service.

Windows:
Docker Desktop commonly uses WSL2 or a supported virtualization backend for Linux containers.

macOS:
Docker Desktop provides a managed Linux environment for Linux containers.

IMPORTANT INSTALLATION CHECKS:

1. Docker CLI installed.
2. Docker daemon installed or available.
3. Docker daemon running.
4. CLI can communicate with the daemon.
5. Docker can access registries.
6. Host has sufficient CPU, memory and disk space.

Do not assume that installing the Docker CLI means the Docker Engine is running.

On Linux, systemctl and journalctl are useful for service troubleshooting.

On Docker Desktop, check the Desktop engine status, diagnostics, WSL integration and selected container mode.

Use official installation instructions for the operating system and Docker release. Installation requirements can change between releases.
      `,
      steps: [
        "Install Docker using the supported instructions for the operating system.",
        "Check the CLI version.",
        "Check client-to-daemon communication.",
        "Check Docker Engine information.",
        "Run a test container.",
        "If image pulling fails, investigate DNS, proxy, firewall and registry access."
      ],
      commands: `
docker --version
docker version
docker info

docker run --rm hello-world

# Linux service checks
sudo systemctl status docker
sudo systemctl start docker
sudo journalctl -u docker -n 100
      `,
      problems: [
        {
          issue: "Docker Desktop engine does not start.",
          rootCause:
            "Virtualization, WSL2 integration, backend configuration or Docker Desktop startup may have failed.",
          solution:
            "Check Docker Desktop diagnostics, virtualization support, WSL2 status and engine configuration. Restart the Desktop engine after identifying the issue."
        },
        {
          issue: "Docker CLI is installed but commands cannot connect.",
          rootCause:
            "The CLI exists, but the daemon may not be running or the selected context may be incorrect.",
          solution:
            "Check docker context show and daemon status. Start the correct engine and verify connectivity with docker info."
        }
      ]
    },

    {
      heading: "04. Dockerfile – Instructions and Build Process",
      explanation: `
A Dockerfile contains instructions used to build a Docker image.

IMPORTANT DOCKERFILE INSTRUCTIONS:

FROM:
Selects the base image.

RUN:
Executes commands during image build. Commonly used to install packages or build application files.

COPY:
Copies files from the build context into the image.

ADD:
Copies files and supports additional features such as local archive extraction. Prefer COPY for ordinary file copying.

WORKDIR:
Sets the working directory for subsequent instructions.

ENV:
Defines environment variables in the image configuration.

ARG:
Defines build-time variables.

USER:
Sets the user used by subsequent build instructions and the container's default process.

EXPOSE:
Documents the port that the application expects to use. It does not publish the port to the host.

CMD:
Provides the default command or arguments for the container.

ENTRYPOINT:
Defines the main executable for the container.

HEALTHCHECK:
Defines a command Docker can use to determine whether the container is healthy.

SHELL:
Changes the shell used for shell-form RUN instructions.

STOPSIGNAL:
Sets the signal sent when stopping the container.

BUILD CONTEXT:
The directory sent to the builder. Files excluded by .dockerignore are not sent as normal build-context files.

LAYERING:
Many Dockerfile instructions create image layers. Ordering instructions carefully helps reuse build cache.

MULTI-STAGE BUILDS:
Use one stage to compile or build an application and another stage to contain only the runtime files. This can reduce final image size and avoid shipping build tools.

SECURITY:
Do not copy passwords, private keys or production secrets into image layers. Removing a secret in a later layer does not reliably remove it from the image history.
      `,
      steps: [
        "Choose a suitable and maintained base image.",
        "Set WORKDIR.",
        "Copy dependency manifests before frequently changing application source when that helps cache reuse.",
        "Install dependencies with reproducible version constraints.",
        "Copy application source.",
        "Set a non-root USER where practical.",
        "Define the startup command.",
        "Build and test the image.",
        "Scan and inspect the image before publishing."
      ],
      commands: `
docker build -t myapp:v1 .

# Specify Dockerfile
docker build -f Dockerfile.prod -t myapp:prod .

# Disable build cache
docker build --no-cache -t myapp:test .

# Pull base image before building
docker build --pull -t myapp:latest .

# Show image layers
docker history myapp:v1

# Inspect image configuration
docker image inspect myapp:v1
      `,
      config: `
# Example Dockerfile for a Node.js application

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

USER node

CMD ["npm", "start"]
      `,
      problems: [
        {
          issue: "Docker build fails with COPY failed: file not found.",
          rootCause:
            "The file may not exist inside the build context, the path may be incorrect or .dockerignore may exclude it.",
          solution:
            "Check the build command's context directory, verify the source path and inspect .dockerignore."
        },
        {
          issue: "Docker image becomes very large.",
          rootCause:
            "The image may contain build tools, package caches, unnecessary files or multiple versions of dependencies.",
          solution:
            "Use a suitable smaller base image, multi-stage builds, .dockerignore and cleanup in the same build layer where appropriate."
        },
        {
          issue: "Docker build uses outdated dependencies or source.",
          rootCause:
            "The build cache may be reused because the inputs to an instruction have not changed.",
          solution:
            "Inspect the build output and cache inputs. Use --no-cache only when a clean rebuild is necessary; use --pull when a fresh base image is required."
        }
      ]
    },

    {
      heading: "05. Docker Image Management – Layers, Tags, Digests and Cache",
      explanation: `
An image consists of filesystem layers and image configuration metadata.

Each layer can be reused by other images. This saves storage and can speed up builds and downloads.

TAG:
A human-readable label such as myapp:v1.4.2.

DIGEST:
A content-addressed identifier for an image manifest. A digest is useful when an exact immutable image reference is required.

IMPORTANT:
A tag such as latest is not automatically the newest or safest image. It is simply a tag that can be moved to point to another image.

IMAGE COMMANDS:

docker image ls:
Lists local images.

docker image inspect:
Displays image configuration and metadata.

docker history:
Shows image layer history.

docker image tag:
Creates another tag for an existing image.

docker image rm:
Removes an image reference, subject to container and image usage constraints.

docker image prune:
Removes unused images according to its options.

Before deleting images on a production host, identify which containers and deployments depend on them.
      `,
      steps: [
        "List local images.",
        "Inspect the image ID, tags and architecture.",
        "Check image history when investigating unexpected image size.",
        "Use versioned tags for release management.",
        "Use digest references when exact content identity is required.",
        "Remove unused images only after checking host usage and deployment requirements."
      ],
      commands: `
docker image ls
docker image inspect myapp:v1
docker history myapp:v1

docker image tag myapp:v1 registry.example.com/team/myapp:v1

docker image rm myapp:v1

# Preview unused images
docker image ls

# Remove dangling images
docker image prune
      `,
      problems: [
        {
          issue: "Image pull downloads a different image than expected.",
          rootCause:
            "A mutable tag may have been updated in the registry.",
          solution:
            "Use a versioned tag or a digest-pinned image reference. Verify the pulled image ID and digest."
        },
        {
          issue: "Image deletion fails because an image is being used.",
          rootCause:
            "One or more containers still reference the image.",
          solution:
            "Inspect containers using the image. Remove only containers that are confirmed to be disposable, then remove the image."
        }
      ]
    },

    {
      heading: "06. Container Lifecycle – run, create, start, stop, restart and exec",
      explanation: `
A container has a lifecycle.

docker create:
Creates a container without starting it.

docker start:
Starts an existing created or stopped container.

docker run:
Creates and starts a new container.

docker stop:
Sends the configured stop signal, normally SIGTERM, and then sends SIGKILL after the timeout if the process does not stop.

docker kill:
Sends a signal immediately. The default signal is SIGKILL.

docker restart:
Restarts a container.

docker pause:
Freezes container processes.

docker unpause:
Resumes paused processes.

docker exec:
Starts another process inside a running container.

docker attach:
Attaches to the container's main process streams.

docker rm:
Removes a stopped container. Use -f only when you understand the impact.

IMPORTANT:
The container's main process is PID 1 inside its process namespace. When that main process exits, the container stops.

A container restart policy can restart a container after certain exits, but it does not fix the underlying application error.

EXIT CODE 137:
Often means the process was killed by SIGKILL. It does not prove that the container was killed by an out-of-memory event. Check OOMKilled and host/kernel evidence.
      `,
      steps: [
        "Check whether the container exists.",
        "Check its current state and exit code.",
        "Read the container logs.",
        "Inspect the container configuration.",
        "Enter a running container with docker exec when appropriate.",
        "Identify why the main process exited.",
        "Fix the application or configuration before applying a restart policy."
      ],
      commands: `
docker run -d --name web nginx

docker create --name test nginx
docker start test

docker ps
docker ps -a

docker stop web
docker restart web

docker exec -it web sh

docker inspect web
docker logs --tail 100 web

docker rm test
      `,
      problems: [
        {
          issue: "Container exits immediately after starting.",
          rootCause:
            "The main process may finish, crash, receive a signal or fail because of missing configuration.",
          solution:
            "Check docker logs and docker inspect. Fix the startup command, application configuration or dependency issue."
        },
        {
          issue: "Container keeps restarting.",
          rootCause:
            "The main process repeatedly exits and a restart policy starts it again.",
          solution:
            "Inspect the exit code, logs, health and dependencies. Fix the actual startup failure instead of relying only on restart."
        },
        {
          issue: "Container exits with code 137.",
          rootCause:
            "The process received SIGKILL. Possible causes include an OOM kill, a forced stop after timeout or an external kill signal.",
          solution:
            "Inspect State.OOMKilled, memory limits, host kernel logs and stop events. Identify the actual SIGKILL source before changing memory limits."
        }
      ]
    },

    {
      heading: "07. Docker Run Options – Practical Command Flags",
      explanation: `
docker run supports many options. Engineers should understand what each option changes.

-d:
Runs the container in detached mode.

-it:
Combines interactive mode (-i) and terminal allocation (-t).

--rm:
Automatically removes the container after it exits. Useful for temporary tasks, not for containers whose stopped state must be retained for investigation.

--name:
Assigns a readable container name.

-p:
Publishes a container port to a host port.

-P:
Publishes ports declared by the image to randomly selected host ports.

-e:
Sets an environment variable.

--env-file:
Loads environment variables from a file.

-v:
Mounts a volume or bind mount using short syntax.

--mount:
Uses explicit mount syntax and is often easier to read for complex mounts.

--network:
Connects the container to a selected Docker network.

--restart:
Sets the restart policy.

--memory:
Sets a memory limit.

--cpus:
Sets a CPU quota limit.

--user:
Sets the process user.

--entrypoint:
Overrides the image ENTRYPOINT.

-w:
Sets the working directory.

--read-only:
Makes the container root filesystem read-only, except for explicitly writable mounts and other configured writable areas.

--privileged:
Grants broad additional privileges. Avoid it unless a carefully reviewed requirement demands it.

--cap-add / --cap-drop:
Adds or removes Linux capabilities.

--security-opt:
Changes supported security settings, such as seccomp profiles.

Always check docker run --help for the full option list supported by the installed Engine version.
      `,
      steps: [
        "Start with the image name and required application command.",
        "Choose a stable container name.",
        "Publish only the required ports.",
        "Provide configuration through environment variables or an environment file.",
        "Attach the correct network and storage.",
        "Set resource limits based on measured requirements.",
        "Choose a restart policy appropriate to the workload.",
        "Verify the effective configuration using docker inspect."
      ],
      commands: `
docker run -d --name web -p 8080:80 nginx

docker run -it --rm alpine sh

docker run -d --name api \\
  --restart unless-stopped \\
  --memory 512m \\
  --cpus 1.5 \\
  -p 3000:3000 \\
  my-api:v1

docker run --help
docker inspect api
      `,
      problems: [
        {
          issue: "Host port is already allocated.",
          rootCause:
            "Another process or container is already listening on the requested host port.",
          solution:
            "Identify the process or container using the port. Stop or reconfigure the conflicting service, or publish the container on a different host port."
        },
        {
          issue: "Container cannot write to a mounted directory.",
          rootCause:
            "The container process user may not have permission to write to the host directory or mounted volume.",
          solution:
            "Inspect the container UID/GID and host directory ownership and permissions. Apply the minimum required permission change rather than using chmod 777."
        }
      ]
    },

    {
      heading: "08. Docker Networking – Bridge, Host, None and Overlay",
      explanation: `
Docker networking allows containers to communicate.

BRIDGE:
A common network mode for containers on a single Docker host. User-defined bridge networks provide automatic DNS resolution between containers by name.

HOST:
The container shares the host network namespace on supported Linux configurations. Port publishing is not used in the same way as bridge mode.

NONE:
Disables normal container network connectivity, apart from loopback.

OVERLAY:
Provides networking across Docker hosts when used with a suitable multi-host setup such as Swarm.

MACVLAN:
Can give containers addresses on a physical network, subject to host and network infrastructure configuration.

PORT PUBLISHING:
-p HOST_PORT:CONTAINER_PORT publishes a container port on the host.

Example:
-p 8080:80

Host port 8080 forwards traffic to container port 80.

EXPOSE:
Dockerfile EXPOSE documents the intended container port. It does not publish that port.

CONTAINER DNS:
On a user-defined bridge network, containers can normally reach each other by container name or network alias.

LOCALHOST WARNING:
Inside a container, localhost means that same container's network namespace. It does not mean another container or the Docker host.

Example:
An API container connecting to a database container should normally use the database service/container name and database port, not localhost.
      `,
      steps: [
        "List Docker networks.",
        "Inspect the network used by each container.",
        "Confirm both containers are attached to the intended network.",
        "Check the destination service name and listening port.",
        "Check application bind address and firewall rules.",
        "Test name resolution and TCP connectivity from the correct container.",
        "Inspect host port publishing when traffic enters from outside."
      ],
      commands: `
docker network ls
docker network inspect app-network

docker network create app-network

docker run -d --name database \\
  --network app-network \\
  postgres

docker run -d --name api \\
  --network app-network \\
  my-api:v1

docker port api
docker inspect api

# Test from a suitable diagnostic container
docker run --rm --network app-network busybox nslookup database
      `,
      problems: [
        {
          issue: "API container cannot connect to database using localhost.",
          rootCause:
            "localhost inside the API container points to the API container itself, not the database container.",
          solution:
            "Connect to the database using its Docker network name or Compose service name and the database listening port."
        },
        {
          issue: "Container name cannot be resolved.",
          rootCause:
            "The containers may be on different networks, or the application may be using a network without the expected DNS behavior.",
          solution:
            "Inspect network membership and attach both containers to the intended user-defined network."
        },
        {
          issue: "Application is reachable inside the container but not from the host.",
          rootCause:
            "The port may not be published, the application may bind only to loopback, or host firewall rules may block traffic.",
          solution:
            "Check docker port, inspect published-port configuration, verify the application bind address and review host firewall rules."
        }
      ]
    },

    {
      heading: "09. Docker Storage – Volumes, Bind Mounts and tmpfs",
      explanation: `
A container's writable layer is not the right place for important data that must survive container replacement.

DOCKER VOLUME:
A Docker-managed storage location. Volumes are commonly used for databases and persistent application data.

BIND MOUNT:
Maps a specific host filesystem path into a container.

tmpfs:
Stores temporary data in memory on supported Linux configurations. It is not persistent storage.

WHY STORAGE MATTERS:

A database container may be removed and recreated during deployment. If its database files exist only in the container writable layer, data may be lost when the container is removed.

Use persistent storage for important application state.

MOUNT SYNTAX:

-v:
Short syntax for volumes and bind mounts.

--mount:
Explicit syntax with fields such as type, source and target.

READ-ONLY MOUNT:
A mount can be made read-only when the application only needs to read its contents.

BACKUP:
A volume is not automatically a backup. Production data needs a tested backup and restore process.
      `,
      steps: [
        "Identify which application paths contain persistent data.",
        "Choose a Docker volume or bind mount.",
        "Check ownership and permissions for the container process.",
        "Mount the storage at the application's expected path.",
        "Write test data and recreate the container.",
        "Confirm the data survives container replacement.",
        "Test backup and restore separately."
      ],
      commands: `
docker volume ls
docker volume create app-data
docker volume inspect app-data

docker run -d --name app \\
  --mount type=volume,source=app-data,target=/var/lib/app \\
  my-app:v1

docker inspect app

docker volume ls
      `,
      config: `
# Compose example with persistent database storage

services:
  database:
    image: postgres:16
    volumes:
      - database-data:/var/lib/postgresql/data

volumes:
  database-data:
      `,
      problems: [
        {
          issue: "Database data disappears after container replacement.",
          rootCause:
            "Database files were stored in the container writable layer rather than persistent storage.",
          solution:
            "Use a persistent volume, restore data from a verified backup if needed and test container replacement before production rollout."
        },
        {
          issue: "Application receives permission denied on a mounted path.",
          rootCause:
            "The process UID/GID inside the container does not have the required permissions on the mounted storage.",
          solution:
            "Inspect process identity and storage ownership. Set appropriate ownership or group access with the minimum required permissions."
        }
      ]
    },

    {
      heading: "10. Docker Compose – Multi-Container Applications",
      explanation: `
Docker Compose defines an application using a YAML configuration file.

A typical application may contain:
- Frontend.
- Backend API.
- Database.
- Cache.
- Reverse proxy.

Compose allows an engineer to describe services, networks, volumes and related configuration in one place.

IMPORTANT COMPOSE CONCEPTS:

services:
Defines application containers.

image:
Selects an existing image.

build:
Builds an image from a Dockerfile.

ports:
Publishes container ports.

environment:
Defines environment variables.

env_file:
Loads environment variables from a file.

volumes:
Defines persistent storage and mounts.

networks:
Defines network membership.

depends_on:
Controls dependency startup ordering. It does not automatically prove that a dependency is ready to serve requests. Use health checks and supported dependency conditions when readiness ordering is required.

healthcheck:
Defines a service health test.

profiles:
Enables optional groups of services.

secrets:
Provides secret data through supported Compose secret mechanisms. For production, also evaluate the deployment platform's secret-management capabilities.

configs:
Provides configuration files to services where supported.

Compose is useful for local development, testing and some deployment workflows. It is not the same thing as a full production orchestration platform.
      `,
      steps: [
        "Create compose.yaml.",
        "Define application services.",
        "Define networks and persistent volumes.",
        "Provide configuration without committing secrets.",
        "Validate the file.",
        "Start the application.",
        "Inspect service status and logs.",
        "Test dependency readiness and application endpoints."
      ],
      commands: `
docker compose config
docker compose up -d

docker compose ps
docker compose logs
docker compose logs -f api

docker compose exec api sh

docker compose restart api
docker compose down

# Remove declared volumes too: destructive to persisted data
docker compose down --volumes
      `,
      config: `
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_HOST: database
    depends_on:
      database:
        condition: service_healthy

  database:
    image: postgres:16
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - database-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser -d appdb"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  database-data:
      `,
      problems: [
        {
          issue: "API starts before the database is ready.",
          rootCause:
            "Container startup order does not necessarily mean that the database is accepting connections.",
          solution:
            "Use a database health check and a supported depends_on health condition. The API should also implement retry logic for temporary database unavailability."
        },
        {
          issue: "Compose application cannot resolve a service name.",
          rootCause:
            "The services may not share the expected Compose network or the application may use the wrong hostname.",
          solution:
            "Inspect Compose network configuration and use the service name as the hostname for service-to-service communication."
        }
      ]
    },

    {
      heading: "11. Docker Registry – Pull, Push, Login and Private Images",
      explanation: `
A Docker registry stores and distributes images.

Examples:
- Docker Hub.
- Private company registries.
- Cloud container registries.

Typical workflow:

1. Build an image.
2. Tag the image with the registry and repository name.
3. Authenticate if required.
4. Push the image.
5. Pull the image from the deployment environment.
6. Deploy the required version.

A registry path commonly contains:
registry / namespace / repository : tag

Example:
registry.example.com/team/api:v2.1

Authentication failures, missing repositories, network restrictions and TLS configuration can all cause registry errors.

Do not put registry passwords directly into scripts or source code. Use an approved credential store or CI/CD secret mechanism.
      `,
      steps: [
        "Confirm the registry hostname and repository path.",
        "Check DNS and network connectivity to the registry.",
        "Authenticate using the approved credential method.",
        "Tag the image correctly.",
        "Push the intended version.",
        "Verify the image exists in the registry.",
        "Pull the image from a clean deployment environment."
      ],
      commands: `
docker login registry.example.com

docker build -t registry.example.com/team/api:v2.1 .

docker push registry.example.com/team/api:v2.1

docker pull registry.example.com/team/api:v2.1

docker image inspect registry.example.com/team/api:v2.1
      `,
      problems: [
        {
          issue: "Docker push returns unauthorized.",
          rootCause:
            "The credentials may be invalid, expired or missing permission to push to the repository.",
          solution:
            "Authenticate using the approved credential method and verify repository-level push permissions."
        },
        {
          issue: "Docker pull fails with manifest unknown.",
          rootCause:
            "The requested repository or tag may not exist, or the image may have been pushed under a different path.",
          solution:
            "Verify the registry hostname, namespace, repository and exact tag."
        },
        {
          issue: "Image pull fails due to certificate verification.",
          rootCause:
            "The registry TLS certificate may be invalid, untrusted or incorrectly configured.",
          solution:
            "Fix the registry certificate chain and trust configuration. Do not disable TLS verification as a permanent workaround."
        }
      ]
    },

    {
      heading: "12. Docker Security – Non-Root, Capabilities and Secrets",
      explanation: `
Container security requires protecting the image, process, host and application data.

IMPORTANT PRACTICES:

1. Run as a non-root user where practical.
2. Use trusted and maintained base images.
3. Scan images for known vulnerabilities.
4. Avoid embedding credentials in Dockerfiles or image layers.
5. Drop unnecessary Linux capabilities.
6. Avoid privileged containers unless absolutely required.
7. Use read-only root filesystems where practical.
8. Use appropriate seccomp and security profiles.
9. Limit access to the Docker daemon socket.
10. Keep Docker Engine and host security updates current.

ROOT USER:
A container process running as root can increase the impact of a container compromise. A non-root user reduces privileges but does not replace other security controls.

CAPABILITIES:
Linux capabilities divide root privileges into smaller units. Add only capabilities that the application actually needs.

SECRETS:
Do not bake database passwords, API keys or private keys into an image. Build arguments and ordinary image environment settings are not a safe secret-storage solution.

DOCKER SOCKET:
Access to the Docker daemon socket is highly privileged. A user who can control the daemon may be able to gain extensive control over the host.
      `,
      steps: [
        "Inspect the image source and base image.",
        "Check which user runs the application.",
        "Identify required Linux capabilities.",
        "Remove unnecessary privileges.",
        "Use approved secret-management mechanisms.",
        "Scan images and remediate applicable vulnerabilities.",
        "Review Docker socket access and host permissions."
      ],
      commands: `
docker image inspect myapp:v1
docker inspect myapp

docker run --rm --user 10001:10001 myapp:v1

docker run --rm \\
  --read-only \\
  --cap-drop ALL \\
  myapp:v1
      `,
      problems: [
        {
          issue: "Security scan reports vulnerable packages.",
          rootCause:
            "The base image or application dependencies contain packages with known vulnerabilities.",
          solution:
            "Review severity and exploitability, update the affected base image or dependency, rebuild, rescan and test the new image."
        },
        {
          issue: "Application fails after switching to a non-root user.",
          rootCause:
            "The application may need write access to directories owned by root or access to a privileged port or resource.",
          solution:
            "Identify the exact permission requirement and grant only the required directory ownership or capability."
        }
      ]
    },

    {
      heading: "13. CPU, Memory, OOM and Resource Management",
      explanation: `
Containers share host resources. Without appropriate controls, one workload can consume resources needed by other workloads.

CPU:
--cpus sets a CPU quota limit.

Memory:
--memory sets a memory limit.

Memory reservation:
Can be used to express a softer memory reservation in supported configurations.

PIDs:
PID limits can restrict the number of processes or threads.

OOM:
When memory pressure becomes severe, the Linux kernel may kill processes. A container can be terminated because it exceeded its memory limit or because the host experienced memory pressure.

EXIT CODE 137 IS NOT PROOF OF OOM:
Check the container's OOMKilled state and host kernel logs.

RESOURCE INVESTIGATION:
- Check current usage.
- Check configured limits.
- Inspect application memory behavior.
- Check host memory pressure.
- Check whether usage grows over time.
- Identify memory leaks or unexpectedly large workloads.

Do not simply increase memory limits without checking host capacity and the reason for the growth.
      `,
      steps: [
        "Check live container resource usage.",
        "Inspect configured CPU and memory limits.",
        "Check exit status and OOMKilled state.",
        "Review host memory and kernel logs.",
        "Compare resource usage with normal workload levels.",
        "Identify leaks, spikes or workload changes.",
        "Apply an appropriate limit or application fix.",
        "Monitor after deployment."
      ],
      commands: `
docker stats

docker inspect --format '{{.State.OOMKilled}}' api

docker inspect --format '{{.State.ExitCode}}' api

docker inspect api

# Linux host
free -h
df -h
sudo journalctl -k --since "30 minutes ago"
      `,
      problems: [
        {
          issue: "Container is killed during high traffic.",
          rootCause:
            "The application may exceed its memory limit due to increased concurrency, large requests, memory leaks or inefficient processing.",
          solution:
            "Correlate traffic and memory metrics, inspect OOM evidence, profile the application and tune concurrency or memory allocation. Increase limits only when host capacity allows."
        },
        {
          issue: "Container becomes slow under load.",
          rootCause:
            "CPU throttling, memory pressure, disk I/O or dependency latency may be limiting performance.",
          solution:
            "Use docker stats and application monitoring to identify the constrained resource. Investigate the bottleneck before changing resource limits."
        }
      ]
    },

    {
      heading: "14. Docker Logs and Monitoring",
      explanation: `
Logs help engineers understand application behavior and diagnose incidents.

docker logs:
Reads the standard output and standard error captured for a container, subject to the configured logging driver and setup.

Useful options:

-f:
Follow log output.

--tail:
Show only the last requested number of lines.

--since:
Show logs after a specified time.

--timestamps:
Include timestamps.

--details:
Show extra attributes when available.

Logging drivers:
Docker supports logging drivers such as json-file, local, journald, syslog and other configured drivers.

LOG ROTATION:
Without suitable log rotation, container logs can consume host disk space.

IMPORTANT:
Not every logging driver makes logs available through docker logs in the same way. Understand the configured driver and central logging setup.

PRODUCTION LOGGING:

A useful log record should include:
- Timestamp.
- Severity.
- Application/service name.
- Environment.
- Request or correlation ID.
- Error message.
- Relevant context without exposing secrets.

Never log passwords, access tokens or sensitive customer data.
      `,
      steps: [
        "Identify the affected container and incident time window.",
        "Read recent logs.",
        "Filter or search for errors and correlation IDs.",
        "Compare application logs with infrastructure events.",
        "Check logging driver and host disk usage.",
        "Preserve relevant evidence before cleanup.",
        "Confirm log rotation and centralized retention."
      ],
      commands: `
docker logs api
docker logs --tail 100 api
docker logs --since 30m api
docker logs -f api
docker logs --timestamps api

docker inspect --format '{{.HostConfig.LogConfig.Type}}' api

docker system df
df -h
      `,
      problems: [
        {
          issue: "Container logs are missing.",
          rootCause:
            "The application may write to files instead of stdout/stderr, the logging driver may not support docker logs as expected or logs may be sent elsewhere.",
          solution:
            "Inspect the logging driver and application logging configuration. Use the configured log destination and ensure application logs are collected centrally."
        },
        {
          issue: "Docker host disk becomes full because of logs.",
          rootCause:
            "Log files may grow without an effective rotation or retention policy.",
          solution:
            "Configure supported log rotation, verify the logging driver behavior and monitor host disk usage."
        }
      ]
    },

    {
      heading: "15. Docker Healthcheck – Healthy and Unhealthy Containers",
      explanation: `
A health check runs a configured command to determine whether a container is healthy.

A container can be running but unhealthy.

Example:
An API process is running, but its HTTP endpoint is returning errors because it cannot connect to its database.

Health status can help distinguish process existence from application readiness.

IMPORTANT:
An unhealthy status does not automatically mean Docker will restart the container. Restart policies respond to container exit behavior; they do not automatically restart a still-running unhealthy process.

Healthcheck options include:
- --interval: time between checks.
- --timeout: maximum duration for a check.
- --start-period: startup grace period.
- --start-interval: startup check interval where supported.
- --retries: consecutive failures needed to mark unhealthy.

A good health check should test the actual service condition without being unnecessarily expensive.
      `,
      steps: [
        "Define a meaningful health endpoint or check command.",
        "Configure the health check interval and timeout.",
        "Allow sufficient startup time.",
        "Inspect health status and health-check output.",
        "Correlate failures with application logs and dependencies.",
        "Fix the underlying issue rather than assuming Docker will restart it."
      ],
      commands: `
docker inspect --format '{{json .State.Health}}' api

docker ps

docker events --since 30m
      `,
      config: `
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \\
  CMD curl -fsS http://localhost:3000/health || exit 1
      `,
      problems: [
        {
          issue: "Container is running but marked unhealthy.",
          rootCause:
            "The health-check command may fail, the application may not be ready or a required dependency may be unavailable.",
          solution:
            "Inspect health-check output, application logs and dependency connectivity. Correct the endpoint, timing or application failure."
        },
        {
          issue: "Health check fails because curl is missing.",
          rootCause:
            "The final image does not contain the executable used by the health-check command.",
          solution:
            "Use a health-check tool available in the final image or include a suitable lightweight check implementation."
        }
      ]
    },

    {
      heading: "16. BuildKit, Buildx and Multi-Platform Builds",
      explanation: `
BuildKit is a modern build engine used by Docker to build images efficiently.

Benefits can include:
- Improved build performance.
- Better cache handling.
- Parallel build steps where possible.
- Build secrets.
- SSH forwarding.
- Multi-platform build support through buildx.

BUILDX:
A Docker CLI plugin used for advanced builds and builder management.

MULTI-STAGE BUILD:
Separates build-time tools from the final runtime image.

BUILD SECRET:
Allows a build step to access a secret without placing the secret directly into a normal image layer.

IMPORTANT:
Do not use ARG or ENV as a substitute for BuildKit secret mounts when handling sensitive build credentials.

MULTI-PLATFORM:
An image can be built for architectures such as linux/amd64 and linux/arm64. The builder and target platform must be configured correctly.
      `,
      steps: [
        "Check the available builder.",
        "Use multi-stage builds to separate build and runtime dependencies.",
        "Use cache efficiently.",
        "Use BuildKit secret mounts for sensitive build-time data.",
        "Select the required target platforms.",
        "Test the image on the target architecture or a suitable runtime."
      ],
      commands: `
docker buildx version
docker buildx ls

docker buildx build --platform linux/amd64,linux/arm64 \\
  -t registry.example.com/team/api:v1 .

docker buildx build --secret id=npmrc,src=.npmrc \\
  -t myapp:build .
      `,
      problems: [
        {
          issue: "Image fails with exec format error on another server.",
          rootCause:
            "The image architecture may not match the host architecture.",
          solution:
            "Inspect the image platform and host architecture. Build or publish an image for the required platform."
        },
        {
          issue: "Build cannot access a private package registry.",
          rootCause:
            "The build process may not have the required authentication or secret mount.",
          solution:
            "Configure a secure BuildKit secret or approved package credential mechanism and verify that the secret is not copied into the image."
        }
      ]
    },

    {
      heading: "17. Docker Events, Inspect and System Diagnostics",
      explanation: `
Production troubleshooting requires evidence.

docker inspect:
Shows detailed metadata and configuration for a container, image, network or volume.

docker events:
Shows Docker Engine events such as container create, start, stop, die and destroy.

docker system df:
Shows Docker disk usage.

docker stats:
Shows live resource usage.

docker top:
Shows processes running inside a container.

These commands answer different questions.

Example:
If a container unexpectedly stopped, inspect its exit code and state, check its logs, and correlate the time with Docker events and host logs.

Do not immediately delete and recreate an affected container. First collect evidence when incident investigation requires it.
      `,
      steps: [
        "Record the container name and incident time.",
        "Collect docker inspect output.",
        "Collect recent application logs.",
        "Collect Docker events for the incident window.",
        "Check resource usage and disk capacity.",
        "Check daemon and host logs when the failure appears infrastructure-related.",
        "Build a timeline from the evidence."
      ],
      commands: `
docker inspect api

docker stats --no-stream

docker top api

docker events --since 1h

docker system df

docker ps -a
      `,
      problems: [
        {
          issue: "Container stopped but the reason is unclear.",
          rootCause:
            "The engineer has checked only docker ps and has not collected exit state, logs or event history.",
          solution:
            "Inspect the stopped container, collect logs and correlate Docker events with host and application logs."
        }
      ]
    },

    {
      heading: "18. Docker Disk Space – Images, Containers, Volumes and Build Cache",
      explanation: `
Docker consumes disk space through images, writable container layers, volumes, build cache and logs.

Useful diagnostic command:
docker system df

It provides an overview of Docker disk usage.

Cleanup commands can be destructive.

docker container prune:
Removes stopped containers.

docker image prune:
Removes unused images according to the command's options.

docker volume prune:
Removes unused volumes. This can permanently remove important data.

docker builder prune:
Removes build cache.

docker system prune:
Removes selected unused Docker objects.

Never run broad prune commands blindly on a production host.

Before cleanup:
1. Identify the filesystem that is full.
2. Check Docker disk usage.
3. Identify important volumes.
4. Check stopped containers that may contain evidence.
5. Confirm backup and recovery requirements.
6. Remove only approved unused objects.
      `,
      steps: [
        "Run df -h to identify full filesystems.",
        "Run docker system df.",
        "Identify large images, containers, volumes and build cache.",
        "Confirm which resources are safe to remove.",
        "Back up important data before any volume cleanup.",
        "Perform controlled cleanup.",
        "Verify free disk space and application health."
      ],
      commands: `
df -h
docker system df
docker image ls
docker ps -a
docker volume ls

docker container prune
docker image prune
docker builder prune

# Destructive: may remove unused volumes and persistent data
docker volume prune
      `,
      problems: [
        {
          issue: "Docker host runs out of disk space.",
          rootCause:
            "Unused images, build cache, container logs, writable layers or volumes may have grown over time.",
          solution:
            "Identify the actual disk consumer. Apply controlled cleanup and configure image retention, log rotation and volume monitoring."
        }
      ]
    },

    {
      heading: "19. Production Workflow – Developer to CI/CD to Deployment",
      explanation: `
A common production workflow looks like this:

1. Developer commits application code.
2. Git-based CI pipeline starts.
3. Pipeline runs tests and code checks.
4. Docker image is built.
5. Image is scanned and validated.
6. Image is tagged with a release version or commit identifier.
7. Image is pushed to a registry.
8. Deployment system pulls the approved image.
9. Runtime configuration and secrets are supplied.
10. Application starts.
11. Health checks and smoke tests run.
12. Monitoring checks application behavior.
13. If the release fails, the team follows its rollback procedure.

IMPORTANT PRODUCTION PRINCIPLES:

- Prefer immutable, traceable image versions.
- Avoid relying on a mutable latest tag for controlled releases.
- Keep secrets outside the image.
- Use persistent storage for stateful workloads.
- Set resource limits based on measured capacity.
- Configure logs and monitoring.
- Test rollback procedures.
- Deploy gradually where the platform supports safe rollout strategies.

Docker alone does not provide every orchestration feature required for large-scale production. Teams may use Kubernetes, Swarm or managed container platforms depending on their architecture.
      `,
      steps: [
        "Commit code and review the change.",
        "Run automated tests.",
        "Build the Docker image.",
        "Scan and test the image.",
        "Push the image using a unique release tag.",
        "Deploy the exact image reference.",
        "Verify health checks and application endpoints.",
        "Monitor errors, latency and resource usage.",
        "Rollback to a known-good image if the release fails."
      ],
      commands: `
# Example release commands

docker build -t registry.example.com/team/api:2026.10.31 .

docker push registry.example.com/team/api:2026.10.31

docker pull registry.example.com/team/api:2026.10.31

docker run -d --name api \\
  --restart unless-stopped \\
  -p 3000:3000 \\
  registry.example.com/team/api:2026.10.31

docker logs --tail 100 api
docker inspect api
      `,
      problems: [
        {
          issue: "New release fails after deployment.",
          rootCause:
            "The image may contain a regression, configuration may be incorrect or a dependency may not be compatible.",
          solution:
            "Stop further rollout, collect logs and health evidence, compare the release with the previous version and follow the approved rollback process."
        },
        {
          issue: "Production server runs an unexpected application version.",
          rootCause:
            "The deployment may use a mutable tag or the release pipeline may not have verified the exact image digest.",
          solution:
            "Use traceable version tags or digest-pinned references and record the deployed image identity in the release process."
        }
      ]
    },

    {
      heading: "20. Real Production Incident – Container Keeps Restarting",
      explanation: `
SCENARIO:

An API container restarts repeatedly after a production deployment.

USER IMPACT:
Requests fail intermittently or the API becomes unavailable.

INCIDENT INVESTIGATION:

Step 1 – Confirm the container state.
Use docker ps -a and identify restart count and current status.

Step 2 – Read the logs.
Use docker logs with a limited time window. Look for startup errors, missing configuration, failed dependency connections and stack traces.

Step 3 – Inspect container state.
Check exit code, OOMKilled, restart policy and startup configuration.

Step 4 – Check dependencies.
Verify database DNS, port, credentials and service readiness.

Step 5 – Compare with the previous release.
Check changes in environment variables, image version, Dockerfile and application configuration.

Step 6 – Find root cause.
Do not assume that restart count itself explains the problem. Use the evidence to identify the failure.

EXAMPLE ROOT CAUSE:
The new API release expects DATABASE_HOST, but the deployment configuration still provides DB_HOST. The application cannot connect to the database and exits.

FIX:
Correct the runtime configuration, deploy the corrected release and verify successful startup.

VERIFICATION:
- Container remains running.
- Health check passes.
- API endpoint responds.
- Database connection succeeds.
- Restart count no longer increases.
- Error rate returns to normal.

PREVENTION:
Validate required environment variables during startup, test deployment configuration in CI and monitor restart events.
      `,
      steps: [
        "Confirm impact and identify affected containers.",
        "Capture container status, restart count and exit code.",
        "Collect application logs and inspect output.",
        "Check OOMKilled and resource usage.",
        "Verify dependency connectivity.",
        "Compare the deployed configuration with the previous working release.",
        "Apply the smallest safe fix or rollback.",
        "Verify service health and monitor for recurrence.",
        "Document root cause and prevention actions."
      ],
      commands: `
docker ps -a

docker inspect api

docker inspect --format '{{.State.ExitCode}}' api

docker inspect --format '{{.State.OOMKilled}}' api

docker logs --since 30m --tail 300 api

docker stats --no-stream api

docker events --since 30m
      `,
      config: `
# Example: required configuration validation in Node.js

const requiredVariables = [
  "DATABASE_HOST",
  "DATABASE_USER",
  "DATABASE_PASSWORD"
];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(\`Missing required environment variable: \${variable}\`);
  }
}
      `,
      problems: [
        {
          issue: "Container repeatedly restarts after a new release.",
          rootCause:
            "The application exits during startup because of invalid configuration, a missing dependency, a failed migration or an application regression.",
          solution:
            "Use logs, inspect state and compare release configuration. Correct the root cause or roll back to the last known-good image."
        }
      ]
    },

    {
      heading: "21. Real Production Incident – Database Connection Failure",
      explanation: `
SCENARIO:

The API container is running, but every database request fails.

COMMON SYMPTOMS:

- Connection refused.
- Name or service not known.
- Connection timed out.
- Authentication failed.
- Too many connections.

INVESTIGATION:

1. Check the exact error message in API logs.
2. Confirm the database container or service is running.
3. Check whether API and database share a network.
4. Check the database hostname.
5. Check the database listening port.
6. Check credentials and database name.
7. Check database readiness and connection limits.

IMPORTANT:
Inside the API container, localhost refers to the API container itself. Use the database service name or network alias.

Connection refused usually means the destination was reached but no process accepted the connection at that address and port.

Connection timed out can indicate network filtering, routing problems or a service that is not responding.

Authentication failed points toward credentials or database authorization, not necessarily Docker networking.
      `,
      steps: [
        "Read the exact database error.",
        "Inspect both API and database containers.",
        "Inspect shared network membership.",
        "Test database DNS resolution from the API network.",
        "Test TCP connectivity to the database port.",
        "Verify credentials securely.",
        "Check database readiness and connection capacity.",
        "Correct the relevant configuration and retest."
      ],
      commands: `
docker logs --tail 200 api
docker logs --tail 200 database

docker inspect api
docker inspect database

docker network ls
docker network inspect app-network

# If the diagnostic utilities exist in the API image:
getent hosts database
nc -vz database 5432
      `,
      config: `
# Incorrect application configuration
DATABASE_HOST=localhost

# Correct when the database service is named "database"
DATABASE_HOST=database
DATABASE_PORT=5432
      `,
      problems: [
        {
          issue: "Connection refused.",
          rootCause:
            "The database may not be listening on the target port, may still be starting or may be bound to a different interface.",
          solution:
            "Check database logs, listening address, port and readiness. Ensure the API uses the correct service name and port."
        },
        {
          issue: "Name or service not known.",
          rootCause:
            "The hostname may be incorrect or the containers may not share a network with the expected DNS behavior.",
          solution:
            "Verify the Compose service name or Docker network alias and inspect network membership."
        },
        {
          issue: "Password authentication failed.",
          rootCause:
            "The application may use an incorrect, outdated or mismatched credential.",
          solution:
            "Verify the secret source and database user permissions. Rotate credentials through the approved secret-management process if necessary."
        }
      ]
    },

    {
      heading: "22. Real Production Incident – ImagePullBackOff or Registry Pull Failure",
      explanation: `
SCENARIO:

A deployment host cannot pull the required application image.

Docker error examples can include:
- pull access denied.
- repository does not exist.
- manifest unknown.
- unauthorized.
- certificate signed by unknown authority.
- no matching manifest for the requested platform.

INVESTIGATION:

1. Verify the complete registry image path.
2. Verify repository and tag.
3. Check authentication.
4. Check repository pull permissions.
5. Check DNS and network access.
6. Check registry TLS certificates.
7. Check host architecture against image platform.

Do not treat every pull failure as a password problem. The exact error message is important.
      `,
      steps: [
        "Capture the full image-pull error.",
        "Verify registry hostname and repository path.",
        "Verify the tag exists.",
        "Check authentication and pull permission.",
        "Check DNS, proxy and TLS.",
        "Check target architecture.",
        "Retry the pull after correcting the identified issue."
      ],
      commands: `
docker pull registry.example.com/team/api:v1

docker login registry.example.com

docker image inspect registry.example.com/team/api:v1

docker info
      `,
      problems: [
        {
          issue: "pull access denied.",
          rootCause:
            "The repository may be private, the user may not be authenticated or pull permission may be missing.",
          solution:
            "Authenticate securely and verify repository access permissions."
        },
        {
          issue: "manifest unknown.",
          rootCause:
            "The repository or requested tag may not exist.",
          solution:
            "Verify the exact repository path and tag in the registry."
        },
        {
          issue: "no matching manifest for the requested platform.",
          rootCause:
            "The registry image may not contain a manifest for the host's required architecture.",
          solution:
            "Build and publish the required platform image or configure a suitable multi-platform image."
        }
      ]
    },

    {
      heading: "23. Real Production Incident – Container Cannot Write to Volume",
      explanation: `
SCENARIO:

An application starts but fails when it tries to write uploaded files or database data.

Possible error:
Permission denied.

INVESTIGATION:

1. Identify the exact path from the application log.
2. Inspect the container's configured user.
3. Inspect the mounted volume or bind mount.
4. Check ownership and permissions on the host path.
5. Confirm whether the mount is read-only.
6. Check whether the application expects a different directory.
7. Apply the smallest permission correction.

Avoid chmod 777 as a default fix. It grants broad access and hides the actual ownership problem.
      `,
      steps: [
        "Capture the exact path and permission error.",
        "Check the container process UID and GID.",
        "Inspect the mount configuration.",
        "Check host directory ownership and permissions.",
        "Check read-only mount settings.",
        "Correct ownership or group access.",
        "Restart or redeploy if required.",
        "Verify that the application can write and read the expected data."
      ],
      commands: `
docker inspect api

docker exec api id

docker exec api sh -c 'ls -ld /app/uploads'

docker exec api sh -c 'touch /app/uploads/write-test'
      `,
      problems: [
        {
          issue: "Permission denied when writing to a bind mount.",
          rootCause:
            "The host directory ownership or permissions do not allow the container process user to write.",
          solution:
            "Match the required UID/GID or group permissions and grant only the access the application needs."
        }
      ]
    },

    {
      heading: "24. Real Production Incident – Docker Host Disk Full",
      explanation: `
SCENARIO:

The Docker host reports no free disk space. New containers fail to start or applications cannot write files.

POSSIBLE CONSUMERS:

- Container logs.
- Image layers.
- Build cache.
- Container writable layers.
- Volumes.
- Application data.

INVESTIGATION:

1. Run df -h to identify the full filesystem.
2. Run docker system df.
3. Inspect large log files and configured logging drivers.
4. Check volumes before cleanup.
5. Check build cache and unused images.
6. Confirm whether the filesystem is shared with application data.

RECOVERY:
Remove only approved unused objects. Do not remove volumes without verifying their contents and backup status.

PREVENTION:
Configure log rotation, monitor disk usage, define image retention and maintain volume backup policies.
      `,
      steps: [
        "Identify the full filesystem.",
        "Inspect Docker storage usage.",
        "Identify large logs, images, cache or volumes.",
        "Confirm which data is safe to remove.",
        "Back up important data.",
        "Perform controlled cleanup.",
        "Verify disk capacity and application health."
      ],
      commands: `
df -h
docker system df
docker image ls
docker ps -a
docker volume ls

docker builder prune
docker image prune
      `,
      problems: [
        {
          issue: "Disk is still full after removing containers.",
          rootCause:
            "The actual space consumer may be logs, volumes, images, build cache or application files.",
          solution:
            "Identify the filesystem and its largest consumers before selecting a cleanup operation."
        }
      ]
    },

    {
      heading: "25. Docker Troubleshooting Method – Production Engineer RCA Checklist",
      explanation: `
A production engineer should follow a repeatable investigation method.

1. UNDERSTAND IMPACT:
Which service is affected? How many users? Is the issue total or partial?

2. RECORD TIME:
Record when the incident started and when symptoms were observed.

3. COLLECT EVIDENCE:
Capture container state, logs, events, resource usage and relevant host information.

4. FORM A HYPOTHESIS:
Use the evidence to identify likely causes.

5. TEST SAFELY:
Run targeted checks. Avoid destructive commands during investigation.

6. IDENTIFY ROOT CAUSE:
Find the condition that caused the failure, not just the visible symptom.

7. RECOVER:
Apply a safe fix or rollback according to the incident procedure.

8. VERIFY:
Confirm application health, user-facing behavior, dependency connectivity and resource stability.

9. PREVENT:
Add validation, monitoring, alerts, automated tests or configuration controls.

10. DOCUMENT:
Record impact, timeline, evidence, root cause, recovery and follow-up actions.

A restart is an action, not a root-cause analysis.
      `,
      steps: [
        "Confirm impact and severity.",
        "Record the incident timeline.",
        "Collect logs and diagnostic output.",
        "Inspect container, image, network, storage and resource configuration as relevant.",
        "Compare current state with the last known-good state.",
        "Test the suspected root cause.",
        "Apply the approved fix or rollback.",
        "Verify service recovery.",
        "Create preventive actions and document the incident."
      ],
      commands: `
docker ps -a
docker logs --since 30m --tail 300 <container>
docker inspect <container>
docker stats --no-stream
docker events --since 30m
docker system df
docker network ls
docker volume ls

# Linux host diagnostics
df -h
free -h
sudo journalctl -u docker --since "30 minutes ago"
      `,
      problems: [
        {
          issue: "Engineer restarts the container repeatedly but the issue returns.",
          rootCause:
            "The restart treats the symptom but leaves the actual failure condition unchanged.",
          solution:
            "Collect evidence, identify the failure condition and fix the application, configuration, dependency or infrastructure problem."
        },
        {
          issue: "Troubleshooting removes useful incident evidence.",
          rootCause:
            "The engineer deletes or recreates the affected container before recording its state and logs.",
          solution:
            "Capture relevant logs, inspect output, events and configuration before performing destructive cleanup."
        }
      ]
    }
  ]
};
