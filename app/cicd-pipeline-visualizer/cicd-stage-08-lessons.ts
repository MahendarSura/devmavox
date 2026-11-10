export type DockerSection = {
  title: string;
  content: string;
  code?: string;
  practicalNotes?: string[];
};

export type DockerLesson = {
  title: string;
  description: string;
  sections: DockerSection[];
  exercise: string;
};

const section = (
  title: string,
  content: string,
  code?: string,
  practicalNotes?: string[]
): DockerSection => ({ title, content, code, practicalNotes });

export const stageEightLessonOverrides: Record<string, DockerLesson> = {
  "Docker Fundamentals": {
    title: "Docker Fundamentals",
    description: "Understand containerization, Docker images, containers, and the role Docker plays in modern application delivery.",
    sections: [
      section("What Docker Is", "Docker is a containerization platform used to package an application together with its runtime, libraries, and required dependencies. The resulting image can run consistently across developer laptops, CI servers, virtual machines, and cloud environments."),
      section("Why Organizations Use Docker", "Containers reduce environment differences between development, testing, staging, and production. They improve application portability, simplify deployment, support horizontal scaling, and make CI/CD pipelines more repeatable."),
      section("Images and Containers", "An image is an immutable template containing filesystem layers and image metadata. A container is a running or stopped instance created from an image. Multiple containers can be created from the same image while maintaining separate writable layers."),
      section("Containerization Compared with Virtual Machines", "A virtual machine normally runs a separate guest operating system on a hypervisor. Containers share the host kernel while isolating processes, filesystems, and networking. Containers are generally lighter, but they do not provide the same kernel isolation boundary as separate virtual machines."),
      section("First Docker Workflow", "A normal developer workflow pulls or builds an image, starts a container, checks its logs, tests the application, and removes the container when it is no longer required.", "docker pull nginx:alpine`ndocker run -d --name web -p 8080:80 nginx:alpine`ndocker ps`ncurl http://localhost:8080`ndocker logs web`ndocker rm -f web"),
      section("Docker in a CI/CD Pipeline", "A CI server can build an image after source-code validation, run automated tests inside containers, tag the tested image with a commit identifier, and publish that exact image for deployment. Production should deploy an approved immutable image rather than rebuild different content later."),
      section("Container Lifecycle and Cleanup", "Containers move through created, running, paused, restarting, exited, or dead states. Operators should inspect stopped containers and their logs before removing them. Automated cleanup must avoid deleting images or volumes that are still required.", "docker ps -a`ndocker inspect web`ndocker stop web`ndocker rm web`ndocker image ls`ndocker system df"),
      section("Hands-on Exercise", "Create an Nginx container, publish it on host port 8080, verify the HTTP response, inspect its logs, stop it, and remove it. Explain the difference between the image and the container created from it.")
    ],
    exercise: "Run an Nginx container using nginx:alpine, expose port 8080, verify the page with curl, inspect the container, and clean up the container without deleting the image."
  },

  "Docker Architecture": {
    title: "Docker Architecture",
    description: "Learn how the Docker client, daemon, API, container runtime, images, registries, and operating-system features work together.",
    sections: [
      section("Architecture Overview", "Docker uses a client-server architecture. The Docker CLI sends requests to the Docker Engine API, and the Docker daemon manages images, containers, networks, and volumes. Container execution is delegated through runtime components."),
      section("Docker Client", "The Docker CLI is the command-line interface used by engineers and automation systems. Commands such as docker build and docker run are translated into API requests. The CLI does not itself execute the application process inside the container.", "docker version`ndocker info`ndocker context ls"),
      section("Docker Daemon", "The dockerd daemon manages Docker objects and coordinates image builds, container creation, networking, and storage. A daemon outage can prevent normal Docker operations even when the CLI executable is installed correctly."),
      section("Docker Engine API", "The Engine API exposes operations used by the CLI, SDKs, and automation tools. Access to the Docker socket is highly privileged because a user who controls the daemon can often gain host-level control."),
      section("Container Runtime Components", "Docker commonly uses containerd to manage container lifecycle operations and a low-level runtime such as runc to create containers using Linux kernel features. Exact implementation details can vary by Docker Engine version and platform."),
      section("Linux Kernel Isolation", "Namespaces isolate process IDs, networking, mounts, users, and other resources. Control groups limit and account for CPU, memory, and other resources. Capabilities and security profiles restrict privileged operations."),
      section("Image Registry Communication", "When an image is not available locally, the engine contacts a registry to retrieve image manifests and layers. Registry authentication, DNS, TLS, proxy settings, and network connectivity can all affect image pulls."),
      section("Architecture Diagnostics", "Inspect both client and server versions, daemon information, configured contexts, and runtime details when commands fail. A successful docker version client response does not prove that the daemon is healthy.", "docker version`ndocker info`ndocker context show`ndocker system events --since 10m"),
      section("Hands-on Exercise", "Trace a docker run command from the CLI to the Docker daemon and runtime. Inspect the client/server versions and identify the configured Docker context.")
    ],
    exercise: "Use docker version, docker info, docker context show, and docker system events to document the client, daemon, runtime, and container lifecycle information on your machine."
  },

  "Docker Installation": {
    title: "Docker Installation",
    description: "Install Docker safely and validate the Engine, CLI, permissions, service state, and platform-specific configuration.",
    sections: [
      section("Installation Options", "Docker Desktop is commonly used on Windows and macOS. Linux servers commonly install Docker Engine using the official repository for the distribution. Installation steps must match the operating system and supported release."),
      section("Windows Installation", "On Windows, Docker Desktop commonly uses the WSL 2 backend. Verify virtualization support, WSL availability, and the Docker Desktop service before troubleshooting application containers.", "wsl --status`ndocker version`ndocker info"),
      section("Linux Engine Installation", "For Linux production hosts, configure the official Docker package repository and install the Engine, CLI, containerd, and build components required by the platform. Avoid mixing packages from unrelated repositories.", "sudo systemctl status docker`nsudo systemctl enable --now docker`ndocker version"),
      section("Service and Startup Validation", "The Docker daemon must be running before most engine commands can succeed. Check service status, startup failures, and system logs rather than repeatedly reinstalling Docker.", "sudo systemctl status docker`nsudo journalctl -u docker --since '30 minutes ago'`nsudo systemctl restart docker"),
      section("User Permissions", "On Linux, access to the Docker socket is normally restricted. Membership in the docker group grants powerful daemon control and should be treated as a security-sensitive privilege. Prefer controlled administrative access."),
      section("Post-installation Verification", "Validate the CLI and daemon versions, run a small test container, inspect daemon information, and verify that image pulls work. A successful installation should be tested before it is used by CI automation.", "docker version`ndocker run --rm hello-world`ndocker info`ndocker image ls"),
      section("Proxy, DNS, and Corporate Network Setup", "Corporate environments may require proxy configuration, trusted certificate authorities, and approved registry endpoints. Configure daemon-level proxy settings where required and restart the daemon after changing them."),
      section("Installation Failure Recovery", "Common failures include unsupported virtualization, WSL startup problems, daemon permission errors, package conflicts, unavailable repositories, and blocked registry access. Capture the exact error and relevant service logs before changing configuration."),
      section("Hands-on Exercise", "Install or validate Docker on a supported machine. Record the client and server versions, daemon status, storage driver, and result of the hello-world test.")
    ],
    exercise: "Validate Docker installation by checking the CLI, daemon, service startup, and hello-world container. Record any permission or network issue and its root cause."
  },

  "Dockerfile Instructions": {
    title: "Dockerfile Instructions",
    description: "Write maintainable Dockerfiles using build instructions, metadata, dependency installation, startup commands, and safe defaults.",
    sections: [
      section("Dockerfile Build Process", "A Dockerfile is a declarative set of instructions used to build an image. Docker processes instructions in order and creates filesystem layers or build metadata according to each instruction."),
      section("FROM and Base Image Selection", "FROM selects the parent image and establishes the build stage. Prefer trusted, maintained, minimal base images and pin versions deliberately. Review operating-system and runtime compatibility before changing a base image.", "FROM node:22-alpine"),
      section("WORKDIR, COPY, and ADD", "WORKDIR sets the working directory for later instructions. COPY transfers files from the build context into the image. ADD has additional archive and remote-source behavior, so COPY is generally easier to reason about for ordinary file copying.", "WORKDIR /app`nCOPY package*.json ./"),
      section("RUN and Dependency Installation", "RUN executes commands during image construction. Combine related package installation and cleanup steps where appropriate, and avoid leaving package-manager caches or temporary build artifacts in runtime images.", "RUN npm ci --omit=dev"),
      section("ENV, ARG, and Build-time Values", "ARG defines build-time variables while ENV defines environment variables available in the resulting image and containers. Never place passwords, API keys, or private tokens in ARG or ENV because image metadata and layers may expose them."),
      section("EXPOSE, USER, and Metadata", "EXPOSE documents the container port but does not publish it on the host. USER selects the identity used by subsequent instructions and the default application process. Prefer a non-root user when the application supports it.", "EXPOSE 3000`nUSER node"),
      section("CMD and ENTRYPOINT", "ENTRYPOINT defines the primary executable while CMD supplies default arguments or a default command. Exec-form instructions provide predictable signal handling and avoid unnecessary shell-process behavior.", "ENTRYPOINT [\"node\"]`nCMD [\"server.js\"]"),
      section("Health Checks and Stop Behavior", "HEALTHCHECK can define a command that reports whether the application is healthy. STOPSIGNAL controls the signal used when stopping a container. Health checks must test application readiness rather than merely checking that a process exists."),
      section("Production Dockerfile Example", "A production Dockerfile should use deterministic dependency installation, a suitable runtime image, a non-root user, and a clear startup command. Build secrets should be supplied through supported build-secret mechanisms rather than embedded in the image.", "FROM node:22-alpine`nWORKDIR /app`nCOPY package*.json ./`nRUN npm ci --omit=dev`nCOPY --chown=node:node . .`nUSER node`nEXPOSE 3000`nCMD [\"node\", \"server.js\"]"),
      section("Hands-on Exercise", "Create a Dockerfile for a small Node.js service. Use a pinned base version, install dependencies reproducibly, run as a non-root user, expose the application port, and start the application using exec form.")
    ],
    exercise: "Build and run a Node.js image using a Dockerfile with FROM, WORKDIR, COPY, RUN, USER, EXPOSE, and CMD. Verify the process runs as a non-root user."
  },

  "Build Context and .dockerignore": {
    title: "Build Context and .dockerignore",
    description: "Control which files Docker sends to the builder and prevent unnecessary, sensitive, or expensive content from entering image builds.",
    sections: [
      section("Understanding Build Context", "The build context is the set of files made available to the builder for a build. In docker build ., the current directory is the context. COPY and ADD source paths are resolved relative to the context rather than arbitrary host paths."),
      section("How Context Transfer Works", "The Docker client or build frontend makes the selected context available to the builder. Large contexts increase transfer time, consume resources, and can slow local and remote CI builds."),
      section("Purpose of .dockerignore", ".dockerignore excludes files and directories from the build context. It reduces accidental inclusion of local dependencies, Git history, test output, secrets, and generated files."),
      section("Common Ignore Patterns", "Use patterns that match the project layout. Keep required build inputs available, and review exclusions whenever the Dockerfile changes. An overly broad pattern can silently remove a required file.", "node_modules`n.git`n.env`n.env.*`ndist`ncoverage`n*.log`n.DS_Store"),
      section("Protecting Sensitive Files", "Do not send private keys, cloud credentials, local environment files, or personal configuration into the build context. A .dockerignore file is an important safeguard, but secret handling must also be enforced in CI and build tooling."),
      section("Debugging Missing COPY Sources", "A COPY failure can occur when a file is outside the context or excluded by .dockerignore. Check the build command directory, context path, ignore patterns, and exact source filename."),
      section("Build Performance Optimization", "Keep the context limited to files required for the build. Separate dependency manifests from frequently changing application source so dependency installation layers can be reused."),
      section("Hands-on Exercise", "Create a .dockerignore file for a Node.js application. Measure the context before and after excluding node_modules, .git, coverage, logs, and local environment files.")
    ],
    exercise: "Build an application image with and without .dockerignore. Compare the context size and verify that .env, node_modules, and .git are not included in the build context."
  },

  "Image Layers and Caching": {
    title: "Image Layers and Caching",
    description: "Understand image layer construction, cache reuse, invalidation, and Dockerfile ordering for faster and more reliable builds.",
    sections: [
      section("Image Layer Fundamentals", "Container images are assembled from filesystem layers and image configuration. Layers are reused between images when their content and metadata permit reuse, reducing repeated downloads and build work."),
      section("Read-only Layers and Container Writable Layer", "Image layers are read-only. A running container receives a writable layer for runtime changes. Changes written into this layer normally disappear when the container is removed unless data is stored in a volume or another persistent location."),
      section("Build Cache Behavior", "Docker can reuse the result of an earlier build instruction when its inputs and relevant build configuration have not changed. A changed dependency manifest can invalidate dependency installation and subsequent layers."),
      section("Dockerfile Instruction Ordering", "Place stable dependency manifests before frequently changing application source. This allows dependency installation to remain cached when only source files change.", "COPY package*.json ./`nRUN npm ci`nCOPY . .`nRUN npm run build"),
      section("Cache Invalidation", "Changes to copied files, build arguments, parent images, or instruction definitions can invalidate cache entries. Diagnose unexpected rebuilds by identifying the first instruction whose inputs changed."),
      section("Inspecting Image Layers", "Use image history and inspection commands to understand how an image was constructed. Large layers can reveal unnecessary package installations, build artifacts, or copied directories.", "docker image history myapp:latest`ndocker image inspect myapp:latest`ndocker system df"),
      section("Cache Management", "Build cache can be pruned to reclaim disk space, but deleting useful cache may increase future build time. On shared CI agents, establish cleanup policies that account for disk capacity and build frequency.", "docker builder du`ndocker builder prune"),
      section("Hands-on Exercise", "Build the same application twice, first without changes and then after changing a source file. Observe cached steps and explain why dependency installation should remain reusable.")
    ],
    exercise: "Optimize a sample Dockerfile by copying dependency manifests before source files. Build twice and record which steps use cache and which steps are rebuilt after a source-only change."
  },

  "BuildKit": {
    title: "BuildKit",
    description: "Use the modern Docker build backend for parallel execution, improved caching, build secrets, and efficient multi-platform image creation.",
    sections: [
      section("What BuildKit Provides", "BuildKit is the modern build engine used by Docker build workflows. It supports advanced caching, parallelizable build operations, improved progress output, secret mounts, SSH mounts, and multi-platform build capabilities."),
      section("Enabling BuildKit", "BuildKit is enabled by default in many modern Docker setups. Confirm the active builder and build command behavior instead of assuming every host has identical configuration.", "docker buildx version`ndocker buildx ls`ndocker buildx inspect"),
      section("Buildx Builder Management", "Buildx provides a user-facing interface for creating and selecting builders. A builder may use a local Docker driver or another supported driver depending on the environment.", "docker buildx create --name devmavox-builder --use`ndocker buildx inspect --bootstrap"),
      section("Build Secrets", "BuildKit secret mounts provide temporary access to sensitive build inputs without baking them into ordinary image layers. Use secret mounts for package tokens and private dependency credentials instead of Dockerfile ARG or ENV.", "RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci"),
      section("SSH Forwarding", "SSH mounts allow a build step to use an SSH agent for private repository access without copying the private key into the image. Limit access to the specific build step that requires it.", "RUN --mount=type=ssh git clone git@example.com:team/private-repo.git"),
      section("Cache Mounts", "Cache mounts preserve reusable package-manager data across builds when supported by the builder. They can reduce dependency download time without including the cache directory in the final runtime image.", "RUN --mount=type=cache,target=/root/.npm npm ci"),
      section("Multi-platform Builds", "Buildx can build for multiple target platforms when the builder and host environment support the required emulation or native workers. Confirm the resulting manifest and test each supported architecture.", "docker buildx build --platform linux/amd64,linux/arm64 -t registry.example.com/team/app:1.0 --push ."),
      section("BuildKit Troubleshooting", "Common failures include unavailable builder instances, missing secret IDs, unsupported mount syntax, registry authentication failures, and platform execution errors. Inspect builder details and build output before changing the Dockerfile."),
      section("Hands-on Exercise", "Create a Buildx builder, build a sample image, use a cache mount for dependencies, and demonstrate how a build secret is mounted without being stored in the final image.")
    ],
    exercise: "Build a sample application using Buildx with a cache mount and a temporary secret. Inspect the final image and verify that the secret value is not present in image history."
  },

  "Multi-stage Builds": {
    title: "Multi-stage Builds",
    description: "Separate compilation and dependency preparation from the runtime image to reduce image size and production attack surface.",
    sections: [
      section("Multi-stage Build Concept", "A multi-stage Dockerfile uses multiple FROM instructions. Earlier stages can compile source code or install build tools, while a final stage copies only the required runtime artifacts."),
      section("Builder and Runtime Separation", "The builder stage contains compilers, package managers, and development dependencies. The runtime stage contains the application output and only the libraries required to execute it."),
      section("Naming and Referencing Stages", "Name stages with AS and copy artifacts from a named stage. Named stages make Dockerfiles easier to maintain when build stages are reordered.", "FROM node:22-alpine AS build`nWORKDIR /app`nCOPY package*.json ./`nRUN npm ci`nCOPY . .`nRUN npm run build"),
      section("Creating a Minimal Runtime Image", "Use a suitable runtime base and copy only compiled output and required runtime dependencies. Verify that certificates, timezone data, native libraries, and runtime assets are present when the application needs them.", "FROM node:22-alpine AS runtime`nWORKDIR /app`nCOPY --from=build /app/dist ./dist`nCOPY --from=build /app/node_modules ./node_modules`nUSER node`nCMD [\"node\", \"dist/server.js\"]"),
      section("Targeting Specific Stages", "BuildKit supports targeting a named stage for development, testing, or production workflows. This can reduce unnecessary work when only one stage output is required.", "docker build --target build -t app:build ."),
      section("Security and Size Benefits", "Keeping compilers, source-control metadata, test tools, and temporary credentials out of the runtime image reduces image size and the number of components exposed in production."),
      section("Native Dependency Compatibility", "Native modules compiled in one stage must be compatible with the libraries and architecture of the runtime stage. Use compatible base distributions and test the final image rather than only the builder stage."),
      section("Hands-on Exercise", "Create a multi-stage build for a Node.js application. Compare the image size with a single-stage build and verify that development tools are absent from the runtime image.")
    ],
    exercise: "Build a Node.js application with separate build and runtime stages. Compare both image sizes and inspect the runtime image for build-only tools and source files."
  },

  "Container Runtime": {
    title: "Container Runtime",
    description: "Manage container startup, process behavior, resource constraints, health, signals, restart policies, and runtime inspection.",
    sections: [
      section("Container Creation and Execution", "A container is created from an image with runtime configuration such as command, environment, mounts, network, and resource limits. The container process runs within the isolation provided by the host operating system."),
      section("Foreground and Detached Execution", "Foreground mode attaches the terminal to the container process. Detached mode returns control to the shell while the container continues running in the background.", "docker run --rm alpine:3.20 echo hello`ndocker run -d --name web nginx:alpine"),
      section("Process and Signal Handling", "The application process should receive termination signals and shut down gracefully. Exec-form ENTRYPOINT and CMD reduce unnecessary shell process layers and improve signal delivery."),
      section("Environment and Runtime Configuration", "Environment variables can configure application behavior at startup. Do not pass secrets through command history or expose them in logs. Use controlled secret delivery for sensitive values.", "docker run -d --name api -e NODE_ENV=production -p 3000:3000 my-api:1.0"),
      section("Resource Limits", "Set memory and CPU limits to prevent one container from consuming excessive host resources. Monitor actual workload behavior and configure limits based on measured demand rather than arbitrary values.", "docker run -d --memory=512m --cpus=1.5 --name api my-api:1.0`ndocker stats"),
      section("Health Checks and Restart Policies", "Health checks report application health, while restart policies control whether Docker restarts containers after exit. A running process is not necessarily a healthy service.", "docker run -d --restart unless-stopped --health-cmd='wget -qO- http://localhost:3000/health || exit 1' --health-interval=30s my-api:1.0"),
      section("Runtime Inspection and Logs", "Inspect container configuration, process state, exit code, network settings, and logs when investigating incidents. Correlate container timestamps with application and host monitoring data.", "docker inspect api`ndocker logs --tail 100 api`ndocker top api`ndocker stats --no-stream"),
      section("Runtime Recovery", "Restart a container only after identifying why it stopped or became unhealthy. Repeated restarts can hide an application crash, missing dependency, bad configuration, or resource exhaustion."),
      section("Hands-on Exercise", "Run a container with CPU and memory limits, configure a restart policy, inspect its health state, and review its resource usage.")
    ],
    exercise: "Run a test service with resource limits and a restart policy. Inspect its logs, health status, process list, and resource usage, then explain its runtime lifecycle."
  },

  "Docker Networking": {
    title: "Docker Networking",
    description: "Configure container communication, bridge networks, published ports, DNS discovery, and production network isolation.",
    sections: [
      section("Container Networking Fundamentals", "Docker networking connects containers to each other and to external networks. Network configuration determines addressing, name resolution, routing, and which ports are reachable from outside the container."),
      section("Bridge Networks", "Bridge networks are commonly used for containers on a single Docker host. User-defined bridge networks provide automatic DNS-based name resolution between attached containers.", "docker network create app-network`ndocker run -d --name backend --network app-network nginx:alpine"),
      section("Port Publishing", "Publishing maps a host port to a container port. EXPOSE in a Dockerfile is documentation and does not publish a port by itself.", "docker run -d --name web -p 8080:80 nginx:alpine`ncurl http://localhost:8080"),
      section("Container-to-container Communication", "Containers on the same user-defined network can generally communicate using container names or network aliases. Use service names rather than hard-coded container IP addresses because IPs can change."),
      section("Network Drivers", "Bridge is common for standalone single-host workloads. Host networking removes normal network namespace isolation on supported platforms. Overlay networking supports multi-host communication in supported orchestration environments. Select drivers according to deployment architecture."),
      section("DNS and Name Resolution", "Docker provides service discovery on user-defined networks. DNS failures may result from containers being attached to different networks, incorrect aliases, or application configuration using stale IP addresses."),
      section("Network Inspection and Diagnostics", "Inspect network membership, container IP configuration, routes, listening ports, and application logs. Test connectivity from the correct network namespace rather than assuming host connectivity proves container connectivity.", "docker network ls`ndocker network inspect app-network`ndocker inspect backend`ndocker exec backend cat /etc/resolv.conf"),
      section("Network Isolation and Security", "Separate frontend, backend, and data services into networks according to required communication paths. Avoid publishing database ports publicly when only application containers need access."),
      section("Hands-on Exercise", "Create a user-defined network with an application and database container. Verify name resolution and connectivity, then demonstrate that a container on a separate network cannot directly use the same service name.")
    ],
    exercise: "Create frontend and backend Docker networks. Attach the application and database containers only to the required networks, test service-name resolution, and verify published ports."
  },

  "Volumes and Storage": {
    title: "Volumes and Storage",
    description: "Persist application data safely and understand volumes, bind mounts, temporary filesystems, backup, and storage troubleshooting.",
    sections: [
      section("Container Storage Model", "A container writable layer is temporary and tied to the container lifecycle. Important application data should be stored in a volume or an explicitly managed host path."),
      section("Named Volumes", "Docker named volumes are managed by Docker and can outlive individual containers. They are suitable for persistent application data when the storage lifecycle is managed separately from the container.", "docker volume create db-data`ndocker run -d --name database -v db-data:/var/lib/postgresql/data postgres:16"),
      section("Bind Mounts", "Bind mounts connect a specific host path to a container path. They are useful for local development and controlled host integration, but they create dependencies on host directory layout and permissions.", "docker run --rm -v ${PWD}:/workspace -w /workspace alpine:3.20 ls -la"),
      section("Temporary Filesystems", "Tmpfs mounts provide temporary in-memory filesystem storage on supported Linux environments. They are useful for transient files that should not persist in the container writable layer or a normal volume."),
      section("Storage Drivers and Copy-on-write", "The storage driver manages image layers and container writable layers. Performance and behavior depend on the host filesystem, driver, and workload. Persistent application data should generally use volumes rather than relying on writable-layer behavior."),
      section("Volume Permissions", "A container process must have appropriate ownership and permissions on mounted data. Diagnose user IDs, group IDs, filesystem ownership, and security restrictions before applying broad permission changes."),
      section("Backup and Restore", "Back up persistent data using application-consistent procedures. For databases, use database-native dump or backup tools where appropriate; a raw filesystem copy during active writes may not provide a consistent backup.", "docker run --rm -v db-data:/data -v ${PWD}:/backup alpine:3.20 tar czf /backup/db-data-backup.tgz -C /data ."),
      section("Storage Inspection and Cleanup", "Inspect volume usage and references before pruning. Removing a volume can permanently delete data. Production cleanup must distinguish unused disposable volumes from retained business data.", "docker volume ls`ndocker volume inspect db-data`ndocker system df -v"),
      section("Hands-on Exercise", "Create a named volume, write data from a container, remove the container, and create another container using the same volume. Verify that the data remains available.")
    ],
    exercise: "Persist a test file in a named volume, delete the original container, mount the volume into a new container, and verify the file. Document a safe backup and restore approach."
  },

  "Docker Security": {
    title: "Docker Security",
    description: "Reduce container attack surface through trusted images, non-root execution, capabilities, secrets handling, scanning, and runtime controls.",
    sections: [
      section("Container Security Model", "Container security depends on the host kernel, daemon, runtime, image contents, container configuration, and orchestration controls. Containers provide isolation but should not be treated as a complete substitute for host security."),
      section("Trusted and Minimal Base Images", "Use maintained images from trusted publishers, pin versions, review provenance, and remove unnecessary packages. Rebuild images regularly to receive security fixes."),
      section("Non-root Container Execution", "Run applications as a dedicated non-root user whenever possible. Verify ownership of application files and mounted directories so the application does not need unnecessary root privileges.", "USER 10001:10001"),
      section("Linux Capabilities and Privileged Mode", "Linux capabilities divide powerful root privileges into smaller permissions. Avoid --privileged unless a documented requirement exists; it grants broad access that weakens container isolation.", "docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE nginx:alpine"),
      section("Read-only Filesystem", "A read-only root filesystem prevents many unintended writes. Provide explicitly writable temporary directories or volumes for applications that require runtime write access.", "docker run --read-only --tmpfs /tmp nginx:alpine"),
      section("Secrets and Credential Protection", "Never bake passwords, tokens, private keys, or cloud credentials into image layers. Use a secrets manager or supported runtime/build secret mechanism and restrict access to the minimum required process."),
      section("Resource and Kernel Security Controls", "Apply CPU and memory limits, appropriate seccomp profiles, AppArmor or SELinux controls where supported, and restricted device access. Validate compatibility before enforcing policies in production."),
      section("Image Scanning and Supply Chain", "Scan base images and application dependencies for vulnerabilities. Review severity, exploitability, reachability, fix availability, and business impact before prioritizing remediation. Record the image digest that passed approval."),
      section("Docker Daemon and Socket Security", "Access to the Docker daemon socket is highly privileged. Do not mount the host Docker socket into untrusted containers, and restrict daemon access to trusted administrators and automation."),
      section("Security Incident Response", "For a suspected compromised container, preserve relevant logs and image identity, isolate affected workloads according to incident procedures, rotate exposed credentials, rebuild from trusted sources, and investigate the host."),
      section("Hands-on Exercise", "Build a non-root image, run it with a read-only root filesystem and restricted capabilities, and inspect the effective user and runtime settings.")
    ],
    exercise: "Harden a sample container by using a non-root user, read-only filesystem, resource limits, and dropped capabilities. Verify that the application still works and document any required writable paths."
  },

  "Image Tagging and Digests": {
    title: "Image Tagging and Digests",
    description: "Identify images reliably using repository names, version tags, immutable digests, and release traceability.",
    sections: [
      section("Image Naming Structure", "An image reference commonly contains a registry hostname, namespace, repository, and optional tag. If no registry is specified, Docker uses its configured default registry behavior.", "docker image ls`ndocker pull nginx:1.27"),
      section("Tagging Strategy", "Tags can represent releases, environments, branches, or commit identifiers. Mutable tags such as latest are convenient labels but do not guarantee that the underlying image remains unchanged."),
      section("Semantic Version Tags", "Use a versioning strategy that communicates compatibility and release intent. Avoid reusing a production release tag for different image content because it weakens traceability."),
      section("Commit-based Tags", "CI pipelines can add a short Git commit SHA to identify the source revision used to build an image. Combine this with release metadata so an incident can be traced back to source code and build records.", "docker build -t devmavox/api:git-a1b2c3d ."),
      section("Image Digests", "A digest identifies image content using a cryptographic hash and is more reliable than a mutable tag for deployment identity. Record the digest of the approved image and use it when immutable deployment references are required."),
      section("Inspecting Digests", "Inspect local image metadata and registry manifests to identify content digests. Multi-platform images may use a manifest-list digest that points to platform-specific image manifests.", "docker image inspect nginx:1.27`ndocker buildx imagetools inspect nginx:1.27"),
      section("Release Promotion", "Promote the same tested image between environments rather than rebuilding it independently for staging and production. Preserve its digest and associate it with the release approval record."),
      section("Hands-on Exercise", "Build an image with a semantic version tag and a commit-based tag. Inspect the image digest and explain why production deployment should use an immutable image reference.")
    ],
    exercise: "Tag one image with a release version and commit identifier, inspect its digest, and document how the same digest is promoted from testing to production."
  },

  "Registry Integration": {
    title: "Registry Integration",
    description: "Authenticate with container registries, publish images, retrieve approved artifacts, and integrate registry operations into CI/CD.",
    sections: [
      section("Container Registry Fundamentals", "A registry stores image manifests and layers and provides access control for publishing and pulling images. Organizations may use Docker Hub, cloud registries, or private enterprise registries."),
      section("Registry Image References", "Use fully qualified image names in automated workflows so the destination registry and repository are explicit. Establish consistent repository naming and retention rules."),
      section("Authentication", "Authenticate using approved credentials or workload identity. Avoid placing passwords directly in scripts, source control, or command-line arguments that may be logged.", "docker login registry.example.com`ndocker logout registry.example.com"),
      section("Build and Push Workflow", "A pipeline builds an image, applies a unique release tag, authenticates to the registry, and pushes the artifact. Validate the pushed manifest and digest before marking the build successful.", "docker build -t registry.example.com/team/api:1.0.0 .`ndocker push registry.example.com/team/api:1.0.0"),
      section("Pull and Deployment Workflow", "Deployment systems pull the approved image from the registry. Use immutable digests for controlled releases and verify that runtime identities have pull access to the required repository."),
      section("Private Registry Certificates and Network", "Private registries may require trusted CA certificates, correct DNS, firewall access, and proxy configuration. Do not disable TLS verification as a permanent workaround."),
      section("CI/CD Credential Management", "Use short-lived credentials or workload identity where supported. Restrict push permissions to build jobs and pull permissions to deployment workloads. Separate production and non-production access where practical."),
      section("Retention and Cleanup Policies", "Define retention rules for old development builds while preserving release artifacts needed for rollback, audits, or compliance. Confirm that cleanup policies do not remove currently deployed images."),
      section("Registry Troubleshooting", "Authentication failures, denied pushes, missing repositories, TLS errors, rate limits, and DNS failures require different fixes. Capture the registry hostname, repository, identity, and exact error before changing permissions."),
      section("Hands-on Exercise", "Build an image, authenticate to a test registry, push a unique tag, retrieve it from a clean environment, and verify the image digest.")
    ],
    exercise: "Push a versioned application image to a test registry, pull it into a clean environment, verify its digest, and explain how CI credentials should be protected."
  },

  "Troubleshooting": {
    title: "Troubleshooting",
    description: "Diagnose common Docker build, startup, networking, storage, resource, daemon, and registry incidents using evidence-driven methods.",
    sections: [
      section("Troubleshooting Method", "Start by identifying the affected host, image, container, deployment time, and user impact. Collect logs and configuration before changing the system. Reproduce the issue safely and change one variable at a time."),
      section("Container Exits Immediately", "A container exits when its main process completes or fails. Inspect the exit code, command, entrypoint, and application logs. A background process that daemonizes may also cause the container to exit if the main process ends.", "docker ps -a`ndocker logs <container>`ndocker inspect <container>"),
      section("Image Build Failures", "Build failures may come from invalid Dockerfile instructions, missing context files, package repository outages, dependency errors, or resource constraints. Identify the first failing build step and inspect its complete output."),
      section("Image Pull and Registry Errors", "Check image reference spelling, registry DNS, network reachability, authentication, repository permissions, and rate limits. Distinguish a missing tag from an authorization failure."),
      section("Port and Network Failures", "Check whether the application listens on the expected interface and container port. Inspect published port mappings, network membership, DNS, and host firewall rules.", "docker port <container>`ndocker network inspect <network>`ndocker exec <container> ss -lnt"),
      section("Volume Permission Problems", "A container may fail to read or write mounted files because of UID, GID, ownership, or security policy differences. Inspect mount details and process identity before changing host permissions."),
      section("Out of Memory and Resource Pressure", "Exit code 137 can indicate a process was killed, commonly due to memory pressure, but it is not proof of an out-of-memory event by itself. Check container state, host kernel logs, and memory metrics.", "docker stats --no-stream`ndocker inspect <container>`ndmesg -T | grep -i -E 'oom|killed process'"),
      section("Daemon and Storage Failures", "A stopped daemon, full disk, corrupted storage metadata, or filesystem issue can prevent container operations. Check daemon logs and disk capacity before restarting services or pruning data.", "sudo systemctl status docker`ndf -h`ndocker system df`nsudo journalctl -u docker -n 200"),
      section("Recovery and Rollback", "Restore service using a known-good image digest and verified configuration. Preserve logs and incident evidence, avoid deleting persistent volumes, and validate the application after recovery."),
      section("Hands-on Exercise", "Intentionally create a failing container, diagnose it using logs and inspect output, identify the root cause, apply a safe correction, and verify recovery.")
    ],
    exercise: "Troubleshoot a container that exits immediately and a service with an unreachable port. Record evidence, root cause, recovery action, and validation results for both incidents."
  },

  "Production Hands-on Lab": {
    title: "Production Hands-on Lab",
    description: "Build, scan, publish, and run a production-oriented Docker image using secure configuration, persistent storage, networking, and operational validation.",
    sections: [
      section("Lab Architecture and Requirements", "Build a small API service with a Dockerfile, a non-root runtime user, a health endpoint, and externalized configuration. The service should be packaged once and promoted as the same artifact."),
      section("Application and Dockerfile Preparation", "Create the application source and a production Dockerfile. Use deterministic dependency installation, a suitable base image, a non-root user, and a predictable startup command."),
      section("Build Context and Supply Chain Controls", "Create a .dockerignore file to exclude local dependencies, Git history, test output, and secret files. Pin base image versions and record the source commit used for the build."),
      section("Optimized Multi-stage Image Build", "Separate dependency preparation and compilation from the runtime stage. Copy only required runtime artifacts and verify that build-only tools are absent from the final image."),
      section("Build and Validate the Image", "Build with a unique version and commit tag. Inspect image history, configuration, size, and digest. Run the application locally and execute functional checks before publishing.", "docker build -t devmavox/api:1.0.0 .`ndocker image inspect devmavox/api:1.0.0"),
      section("Security Validation", "Run vulnerability scanning and review findings according to severity and exploitability. Verify non-root execution, avoid privileged mode, restrict capabilities, and confirm that no credentials are embedded in image layers."),
      section("Registry Publishing", "Authenticate through a protected CI credential, push the approved image, and record its digest. The deployment stage should consume the exact published artifact rather than rebuilding it.", "docker tag devmavox/api:1.0.0 registry.example.com/devmavox/api:1.0.0`ndocker push registry.example.com/devmavox/api:1.0.0"),
      section("Production Runtime Configuration", "Run the service with an explicit network, resource limits, restart policy, health check, and externalized configuration. Persist only the data that must survive container replacement."),
      section("Observability and Operational Checks", "Collect application logs and container resource metrics. Monitor health, restart count, CPU, memory, disk, and request behavior. Define actionable alerts rather than relying only on container running state."),
      section("Failure Simulation and Recovery", "Simulate an application failure and validate alerting, diagnosis, and recovery. Roll back to the last approved image digest when a release causes production impact."),
      section("Release Checklist and Evidence", "Record the source commit, image tag, digest, scan results, test results, deployment configuration, and rollback reference. Keep evidence with the release record for audit and incident investigation."),
      section("Hands-on Exercise", "Complete the full workflow: build, test, scan, tag, push, pull, run, inspect, and recover the service. Submit the Dockerfile, .dockerignore, validation commands, and release evidence.")
    ],
    exercise: "Build a production-style API image, scan it, publish it to a registry, deploy it with resource limits and health checks, simulate a failure, and roll back using the previously approved image digest."
  }
};
