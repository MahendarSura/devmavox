import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Docker Fundamentals - Complete Practical Guide",
  description:
    "Understand Docker from beginner to production level, including architecture, internal working, images, containers, networking, storage, real-time deployment workflows and production troubleshooting.",

  sections: [
    {
      heading: "1. Introduction - What Is Docker and Why Do We Use It?",
      explanation:
        "Docker is a containerization platform. It packages an application and its required dependencies into a portable unit called a container image. A container runs the application in an isolated environment. Without Docker, an application may work on a developer laptop but fail on a test or production server because of different operating systems, libraries, runtime versions or configuration. Docker helps reduce these environment differences. For example, a Node.js application may require Node 22, specific npm packages and environment variables. Docker packages the application runtime and dependencies so the same image can be used in development, testing and production. A container is not a complete virtual machine. Containers share the host operating system kernel while maintaining process, filesystem and network isolation.",
      steps: [
        "Developer writes application code.",
        "Developer creates a Dockerfile containing image build instructions.",
        "Docker builds an image containing the application and required dependencies.",
        "The image is tested and pushed to a container registry.",
        "A server or orchestration platform downloads the image.",
        "A container is created from that image and the application starts.",
        "Monitoring and logging systems observe the running application."
      ],
      commands:
        "docker --version\n" +
        "docker version\n" +
        "docker info\n" +
        "docker help\n" +
        "docker run hello-world\n" +
        "docker images\n" +
        "docker ps -a",
      problems: [
        {
          issue: "Docker command is not recognized.",
          rootCause:
            "Docker CLI may not be installed, or its executable directory may not be available in the system PATH.",
          solution:
            "Install Docker Desktop or Docker Engine for the operating system. Restart the terminal and run docker --version. On Windows, verify that Docker Desktop is installed and started."
        },
        {
          issue: "Cannot connect to the Docker daemon.",
          rootCause:
            "The Docker client is available, but the Docker Engine service is stopped or the client is connected to an incorrect Docker context.",
          solution:
            "Start Docker Desktop or the Docker Engine service. Run docker context ls and docker context show. Verify the active context and retry docker info."
        },
        {
          issue: "Application works locally but fails inside a container.",
          rootCause:
            "The application may depend on local files, environment variables, runtime versions, network services or libraries that were not included in the image.",
          solution:
            "Inspect the Dockerfile, image contents, environment variables and application logs. Rebuild the image with all required dependencies and test the same image before production deployment."
        }
      ]
    },

    {
      heading: "2. Docker Architecture - Main Components",
      explanation:
        "Docker uses a client-server architecture. The Docker CLI is the client. When an engineer runs a command such as docker run, the CLI sends an API request to the Docker daemon. The daemon manages Docker objects such as images, containers, networks and volumes. The daemon communicates with container runtime components to create and start containers. The image registry stores and distributes images. Docker Desktop on Windows and macOS provides a managed environment for running the Docker Engine, commonly through a Linux virtual machine or equivalent backend. On a Linux server, Docker Engine normally runs directly on the Linux host.",
      steps: [
        "Docker CLI receives the engineer's command.",
        "The Docker client sends a request to the Docker Engine API.",
        "The Docker daemon validates and processes the request.",
        "The daemon downloads an image if it is not available locally.",
        "The container runtime prepares the container process and isolation.",
        "Linux namespaces isolate process IDs, networking and mount views.",
        "Control groups manage and account for resource usage.",
        "The container process starts using the configured entrypoint or command.",
        "Docker reports the container state to the client."
      ],
      commands:
        "docker version\n" +
        "docker info\n" +
        "docker context ls\n" +
        "docker context inspect default\n" +
        "docker system info\n" +
        "docker inspect CONTAINER_NAME",
      config:
        "Important architecture components:\n" +
        "Docker CLI: Command-line client used by engineers.\n" +
        "Docker Engine API: Interface used by clients and automation.\n" +
        "Docker daemon (dockerd): Manages images, containers, networks and volumes.\n" +
        "containerd: Manages container lifecycle operations.\n" +
        "OCI runtime such as runc: Creates and starts the isolated container process.\n" +
        "Image registry: Stores and distributes container images.\n" +
        "Namespaces: Provide process, network, mount and other isolation.\n" +
        "Control groups: Control and account for CPU and memory resources.",
      problems: [
        {
          issue: "Docker CLI works but containers cannot start.",
          rootCause:
            "The daemon or lower-level runtime may be unavailable, or the host may not have enough resources.",
          solution:
            "Check docker info, daemon logs and host resource usage. Restart the Docker service only after understanding the failure. Check disk space, memory and runtime errors."
        },
        {
          issue: "Docker commands connect to an unexpected server.",
          rootCause:
            "The active Docker context or DOCKER_HOST environment variable may point to another Docker Engine.",
          solution:
            "Run docker context ls and docker context show. Inspect the DOCKER_HOST variable. Select the intended context before executing deployment commands."
        }
      ]
    },

    {
      heading: "3. How Docker Works Internally",
      explanation:
        "A Docker image is a read-only template made from layers. When an image is built, instructions such as FROM, RUN, COPY and WORKDIR create image layers or image metadata. Docker can reuse unchanged layers during later builds, which makes builds faster. When a container is created, Docker adds a writable container layer above the image's read-only layers. Changes made inside the container normally go into this writable layer. Removing the container removes that writable layer, but named volumes can preserve application data. When the container starts, its configured process runs as the main container process. If that process exits, the container stops. Docker does not automatically keep an application alive if its main process has finished.",
      steps: [
        "Docker reads the Dockerfile and build context.",
        "The FROM instruction selects a base image.",
        "RUN instructions execute commands during image building.",
        "COPY or ADD instructions add files to the image.",
        "Docker stores build results in reusable image layers.",
        "At container creation, Docker prepares the container filesystem and writable layer.",
        "Docker configures namespaces, resource controls, networking and mounts.",
        "The configured entrypoint and command start as the container's main process.",
        "The application writes logs to standard output and standard error when configured correctly.",
        "The container remains running while its main process remains active."
      ],
      commands:
        "docker build -t myapp:1.0 .\n" +
        "docker history myapp:1.0\n" +
        "docker image inspect myapp:1.0\n" +
        "docker create --name test myapp:1.0\n" +
        "docker start test\n" +
        "docker inspect test\n" +
        "docker logs test\n" +
        "docker diff test",
      config:
        "Example Dockerfile:\n" +
        "FROM node:22-alpine\n" +
        "WORKDIR /app\n" +
        "COPY package*.json ./\n" +
        "RUN npm ci\n" +
        "COPY . .\n" +
        "EXPOSE 3000\n" +
        "CMD [\"npm\", \"start\"]\n\n" +
        "Explanation:\n" +
        "FROM selects the base runtime image.\n" +
        "WORKDIR sets the working directory.\n" +
        "COPY adds application files.\n" +
        "RUN installs dependencies during image build.\n" +
        "EXPOSE documents the application's listening port.\n" +
        "CMD defines the default container command.\n\n" +
        "Note: EXPOSE does not publish a host port. Use docker run -p to publish a port.",
      problems: [
        {
          issue: "Container exits immediately after starting.",
          rootCause:
            "The main process may finish, crash, use an incorrect command or fail because required configuration is missing.",
          solution:
            "Run docker ps -a and inspect the exit code. Read docker logs CONTAINER_NAME. Check ENTRYPOINT, CMD, environment variables and application startup dependencies. Correct the configuration and recreate the container."
        },
        {
          issue: "Image rebuild takes too long.",
          rootCause:
            "Dockerfile instructions may invalidate frequently used cache layers. Dependencies may be installed after copying frequently changing application source files.",
          solution:
            "Copy dependency manifests first, install dependencies in a separate layer, and copy application source afterward. Use a suitable .dockerignore file and avoid unnecessary build-context files."
        },
        {
          issue: "Container data disappears after container removal.",
          rootCause:
            "The application stored important data only in the container's writable layer.",
          solution:
            "Use a named Docker volume or an appropriate persistent storage solution. Back up important data and verify that the application writes to the mounted storage path."
        }
      ]
    },

    {
      heading: "4. Real-Time Workflow - Developer to Production",
      explanation:
        "In a typical company workflow, a developer pushes application code to Git. A CI pipeline checks out the source, runs tests and builds a Docker image. The pipeline tags the image with a version or commit identifier and pushes it to a registry such as Amazon ECR, Docker Hub or a private registry. The deployment process updates the production server or orchestrator to use that image. The runtime downloads the image if needed, creates a container and starts the application. Health checks and monitoring help the operations team identify failures. Production teams should promote the same tested image between environments rather than rebuilding different images for each environment.",
      steps: [
        "Developer commits code and pushes it to the Git repository.",
        "A webhook or CI trigger starts the pipeline.",
        "The pipeline installs dependencies and runs automated tests.",
        "The pipeline builds the Docker image.",
        "The image receives a traceable tag such as an application version or commit SHA.",
        "The pipeline scans and pushes the image to a trusted registry.",
        "Deployment automation updates the production workload to the tested image.",
        "The production runtime pulls the image and starts the container.",
        "The application health endpoint is checked.",
        "Logs, metrics and alerts are monitored after deployment.",
        "If the release is unhealthy, the team follows its rollback procedure."
      ],
      commands:
        "git status\n" +
        "git add .\n" +
        "git commit -m \"Release application\"\n" +
        "docker build -t myapp:1.0 .\n" +
        "docker run -d --name myapp -p 8080:3000 myapp:1.0\n" +
        "docker ps\n" +
        "docker logs -f myapp\n" +
        "docker inspect myapp\n" +
        "docker stop myapp\n" +
        "docker rm myapp",
      config:
        "Example production-style runtime configuration:\n" +
        "docker run -d \\\n" +
        "  --name myapp \\\n" +
        "  --restart unless-stopped \\\n" +
        "  --memory 512m \\\n" +
        "  --cpus 1.0 \\\n" +
        "  -p 8080:3000 \\\n" +
        "  --env-file .env.production \\\n" +
        "  myapp:1.0\n\n" +
        "This example assumes the application listens on port 3000 inside the container. The host publishes it on port 8080. Resource values must be selected according to actual workload measurements. Protect environment files and never commit production secrets to Git.",
      problems: [
        {
          issue: "The CI pipeline builds an image but production runs an older version.",
          rootCause:
            "The deployment may reference an old image tag, a mutable latest tag or a different registry repository.",
          solution:
            "Check the image tag in the deployment configuration and inspect the running container image. Use unique immutable version tags or image digests. Confirm that the deployment updated successfully."
        },
        {
          issue: "Application is running but users cannot access it.",
          rootCause:
            "The application may listen on a different internal port, the host port may not be published, or a firewall or reverse proxy may block traffic.",
          solution:
            "Check docker port CONTAINER_NAME, docker inspect CONTAINER_NAME and application listening configuration. Verify host firewall, proxy and network routing."
        }
      ]
    },

    {
      heading: "5. Production Scenario - Application Container Keeps Restarting",
      explanation:
        "Consider an online shopping application deployed as a Docker container. After a new release, the container starts and then exits repeatedly. Customers may see errors because the application is unavailable. The engineer should not immediately restart containers repeatedly. First identify the exit status, inspect current and previous logs, check resource usage and compare the new release configuration with the last healthy release. Possible causes include a database connection failure, missing environment variable, invalid startup command, permission issue or memory exhaustion.",
      steps: [
        "Confirm the affected container and its restart behavior.",
        "Check container status and exit code.",
        "Read application logs and identify the first meaningful failure.",
        "Inspect environment variables without exposing secret values.",
        "Check CPU, memory and host disk availability.",
        "Check database and dependent-service connectivity.",
        "Compare the current image and configuration with the previous healthy release.",
        "Fix the actual cause and deploy a corrected image or configuration.",
        "Verify application health and customer-facing access.",
        "Record the incident, root cause and preventive action."
      ],
      commands:
        "docker ps -a\n" +
        "docker inspect myapp --format='{{.State.Status}} {{.State.ExitCode}} {{.RestartCount}}'\n" +
        "docker logs --tail 200 myapp\n" +
        "docker logs --since 15m myapp\n" +
        "docker stats\n" +
        "docker events --since 15m\n" +
        "docker inspect myapp",
      config:
        "Example of a useful health check in a Dockerfile:\n" +
        "HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \\\n" +
        "  CMD wget -q --spider http://127.0.0.1:3000/health || exit 1\n\n" +
        "The application must provide the /health endpoint and the image must contain wget for this exact command to work. Choose a health check suitable for the application's runtime. A health check reports health; it does not automatically repair every application failure.",
      problems: [
        {
          issue: "Container exits with code 1.",
          rootCause:
            "The application process returned a general failure status. The actual reason must be found in application logs or startup diagnostics.",
          solution:
            "Read docker logs and inspect the application startup error. Verify configuration, dependencies, permissions and startup command. Correct the failure and deploy a new tested image."
        },
        {
          issue: "Container exits with code 137.",
          rootCause:
            "Exit code 137 commonly indicates that the process received SIGKILL. Memory pressure or an out-of-memory kill is one possible cause, but it is not the only explanation.",
          solution:
            "Check docker inspect for OOMKilled, inspect docker stats and host memory pressure, and review system logs. Adjust application memory usage or container limits based on measured demand."
        },
        {
          issue: "Container is healthy but application requests fail.",
          rootCause:
            "A basic health check may verify only that a process responds. It may not test database access, downstream services or the complete business workflow.",
          solution:
            "Use appropriate readiness and dependency checks. Test the actual application endpoint, inspect application logs and verify database and downstream connectivity."
        }
      ]
    },

    {
      heading: "6. Logs, Monitoring and Diagnosis",
      explanation:
        "Production engineers use container logs, runtime state, resource metrics and host-level information together. Docker captures the container process standard output and standard error when the logging configuration supports it. The default json-file logging driver stores logs locally, but production environments may use a centralized logging platform. Logs explain what happened. Metrics show resource behavior over time. Events show Docker lifecycle activity such as container creation, start, stop and die. No single command provides the complete root cause.",
      steps: [
        "Identify the affected container and its current state.",
        "Read recent application logs.",
        "Check logs from the previous failure when available.",
        "Inspect exit code, restart count and OOMKilled state.",
        "Check CPU, memory and network activity.",
        "Review Docker events around the incident time.",
        "Correlate container logs with application, host and monitoring-system logs.",
        "Record timestamps and the first failure rather than only the final error."
      ],
      commands:
        "docker ps -a\n" +
        "docker logs myapp\n" +
        "docker logs -f myapp\n" +
        "docker logs --tail 100 myapp\n" +
        "docker logs --since 30m myapp\n" +
        "docker stats\n" +
        "docker top myapp\n" +
        "docker events --since 30m\n" +
        "docker inspect myapp",
      config:
        "Useful inspection fields:\n" +
        "State.Status - Current container state.\n" +
        "State.ExitCode - Last process exit code.\n" +
        "State.OOMKilled - Whether Docker recorded an out-of-memory kill.\n" +
        "RestartCount - Number of container restarts.\n" +
        "NetworkSettings - Network and address information.\n" +
        "Mounts - Mounted volumes and bind mounts.\n" +
        "Config.Image - Image used to create the container.",
      problems: [
        {
          issue: "docker logs does not show the expected application messages.",
          rootCause:
            "The application may write logs to a file inside the container instead of standard output and standard error.",
          solution:
            "Check the application's logging configuration. Prefer structured logs to stdout and stderr when suitable. If files are required, configure log rotation, persistence and centralized collection."
        },
        {
          issue: "Container logs consume too much disk space.",
          rootCause:
            "High-volume logs may be retained without suitable rotation or centralized log management.",
          solution:
            "Configure an appropriate logging driver and retention policy. Monitor host disk usage. Do not delete active Docker storage files manually."
        }
      ]
    },

    {
      heading: "7. Before vs After - Better Docker Practices",
      explanation:
        "A container may work in a developer environment and still be unsafe or unreliable in production. Production configurations should use traceable image versions, appropriate resource limits, safe secret handling, persistent storage where required and clear health checks. The following examples show common differences between a quick local setup and a more controlled deployment.",
      steps: [
        "Avoid relying on an unpinned latest image tag for production releases.",
        "Use a versioned or digest-pinned image.",
        "Avoid embedding passwords and API keys inside Dockerfiles.",
        "Use environment injection or a secret-management system.",
        "Set resource limits according to workload measurements.",
        "Use named volumes for data that must survive container replacement.",
        "Run as a non-root user when the application supports it.",
        "Use a suitable health check and centralized logging."
      ],
      commands:
        "docker image inspect myapp:1.0\n" +
        "docker inspect myapp\n" +
        "docker stats myapp\n" +
        "docker volume ls\n" +
        "docker port myapp",
      config:
        "Less safe example:\n" +
        "FROM node:latest\n" +
        "WORKDIR /app\n" +
        "COPY . .\n" +
        "RUN npm install\n" +
        "ENV DB_PASSWORD=my-secret-password\n" +
        "CMD [\"npm\", \"start\"]\n\n" +
        "Improved example:\n" +
        "FROM node:22-alpine\n" +
        "WORKDIR /app\n" +
        "COPY package*.json ./\n" +
        "RUN npm ci --omit=dev\n" +
        "COPY --chown=node:node . .\n" +
        "USER node\n" +
        "EXPOSE 3000\n" +
        "CMD [\"npm\", \"start\"]\n\n" +
        "The improved example uses a selected runtime version, repeatable dependency installation and a non-root user. Production secrets should be injected securely at runtime, not stored in the Dockerfile. Review base-image support and security updates regularly.",
      problems: [
        {
          issue: "Production deployment unexpectedly changes after rebuilding the same image tag.",
          rootCause:
            "A mutable image tag such as latest may point to a different image over time.",
          solution:
            "Use unique release tags or immutable image digests. Record the exact image deployed to every environment."
        },
        {
          issue: "Sensitive information appears in an image.",
          rootCause:
            "Secrets may have been added through ENV, COPY, build arguments or committed configuration files.",
          solution:
            "Remove secrets from image build inputs, rotate exposed credentials and use a secret-management solution. Rebuild and scan the corrected image."
        }
      ]
    },

    {
      heading: "8. Verification and Prevention - Production Checklist",
      explanation:
        "A successful docker run command does not prove that an application is production-ready. Engineers must verify the container state, application health, published ports, persistent storage, resource behavior, logs and external access. Preventive controls include image scanning, repeatable builds, release tagging, resource monitoring, log retention, backups and documented rollback procedures.",
      steps: [
        "Confirm the intended image name, tag or digest.",
        "Confirm the container is running.",
        "Check that the application health endpoint responds successfully.",
        "Verify the host-to-container port mapping.",
        "Verify required volumes and data persistence.",
        "Check logs for startup errors and repeated warnings.",
        "Observe CPU, memory and restart count under realistic load.",
        "Verify network access to required dependencies.",
        "Confirm monitoring alerts and log collection work.",
        "Document the release version and rollback procedure."
      ],
      commands:
        "docker ps\n" +
        "docker inspect myapp\n" +
        "docker port myapp\n" +
        "docker logs --tail 100 myapp\n" +
        "docker stats --no-stream myapp\n" +
        "docker exec myapp sh -c 'wget -qO- http://127.0.0.1:3000/health'\n" +
        "docker volume ls\n" +
        "docker image ls",
      config:
        "Example production verification sequence:\n" +
        "1. Container state: docker ps\n" +
        "2. Recent logs: docker logs --tail 100 myapp\n" +
        "3. Port mapping: docker port myapp\n" +
        "4. Resource usage: docker stats --no-stream myapp\n" +
        "5. Health endpoint: test the actual application health URL.\n" +
        "6. External test: access the application through its normal load balancer or domain.\n\n" +
        "The example health command requires wget inside the container. If the image does not contain wget, use an approved diagnostic method or test the endpoint from the host.",
      problems: [
        {
          issue: "Container is running but the release is not ready for customers.",
          rootCause:
            "The process is running, but the application may not be ready, dependencies may be unavailable or external traffic may not reach it.",
          solution:
            "Verify the real application health endpoint, dependencies, port mapping, proxy and external access. Keep the release out of customer traffic until readiness checks pass."
        },
        {
          issue: "Application data is lost after a deployment.",
          rootCause:
            "Persistent data was stored in the container writable layer or an incorrect host path.",
          solution:
            "Move persistent data to a managed volume or appropriate external data service. Verify mount paths and perform a backup-and-restore test."
        }
      ]
    },

    {
      heading: "9. Interview and Production Engineer Knowledge",
      explanation:
        "A production engineer should understand the difference between an image and a container, the Docker client-server architecture, image layers, writable layers, namespaces, control groups, container networking, volumes, health checks, logging drivers and restart policies. Engineers should also know that a running container does not always mean the application is healthy. Production troubleshooting must follow evidence: identify the failure, collect logs and metrics, determine the root cause, apply a controlled fix and verify the result.",
      steps: [
        "Explain Docker image versus container with a practical example.",
        "Explain Docker client, daemon and container runtime responsibilities.",
        "Explain image layers and Docker build cache.",
        "Explain why a container exits when its main process exits.",
        "Explain the difference between a Docker volume and container writable layer.",
        "Explain the difference between EXPOSE and publishing a host port with -p.",
        "Explain how to inspect a restarting container.",
        "Explain how resource limits affect production containers.",
        "Explain why immutable image versions improve release traceability.",
        "Explain how to verify an application after deployment."
      ],
      commands:
        "docker version\n" +
        "docker info\n" +
        "docker ps -a\n" +
        "docker inspect myapp\n" +
        "docker logs myapp\n" +
        "docker stats\n" +
        "docker history myapp:1.0\n" +
        "docker network ls\n" +
        "docker volume ls",
      problems: [
        {
          issue: "What is the difference between a Docker image and a container?",
          rootCause:
            "Beginners often treat the image and running container as the same object.",
          solution:
            "An image is the packaged, read-only template. A container is a created runtime instance with its own configuration and writable layer. Multiple containers can be created from the same image."
        },
        {
          issue: "Does a running container always mean the application is healthy?",
          rootCause:
            "Container state mainly describes the main process lifecycle. The process can remain alive while the application is unable to serve requests correctly.",
          solution:
            "Use application-level health checks, readiness checks, monitoring and real endpoint tests. Investigate dependencies and logs when health checks fail."
        }
      ]
    }
  ]
};


/*
 * ADDITIONAL SECTION
 */

data.sections.push({
  heading: "10. Docker Container Lifecycle and Internal Process Management",

  explanation:
    "A Docker container follows a lifecycle. When an engineer creates a container, Docker prepares its configuration, filesystem, networking and runtime environment. When the container starts, its main process runs as PID 1 inside the container's process namespace. The container remains running while this main process is active. When the process exits, the container stops. Stopping a container normally sends SIGTERM first and waits for the configured stop timeout. If the process does not exit in time, Docker sends SIGKILL. This is important in production because applications need time to finish active requests, close database connections and flush important data before shutdown. A stopped container can normally be started again, but a removed container cannot be restarted. The image remains separate from the container lifecycle.",

  steps: [
    "Created: Docker creates the container configuration and prepares its writable filesystem layer.",
    "Running: Docker starts the configured entrypoint or command as the container's main process.",
    "Paused: The container processes are temporarily frozen. The container is not removed.",
    "Stopped: The main process has exited or the container has been stopped.",
    "Restarted: Docker starts the existing stopped container again.",
    "Removed: Docker deletes the container object and its writable layer. Persistent volume data is separate.",
    "During graceful shutdown, Docker sends SIGTERM to the main process.",
    "The application should stop accepting new work, finish or safely cancel active work and close connections.",
    "If the process does not exit before the stop timeout, Docker sends SIGKILL."
  ],

  commands:
    "docker create --name lifecycle-demo nginx:alpine\n" +
    "docker ps -a\n" +
    "docker start lifecycle-demo\n" +
    "docker pause lifecycle-demo\n" +
    "docker unpause lifecycle-demo\n" +
    "docker stop lifecycle-demo\n" +
    "docker start lifecycle-demo\n" +
    "docker restart lifecycle-demo\n" +
    "docker kill lifecycle-demo\n" +
    "docker rm lifecycle-demo\n" +
    "docker inspect lifecycle-demo\n" +
    "docker inspect lifecycle-demo --format='{{.State.Status}} {{.State.ExitCode}}'",

  config:
    "Example: graceful shutdown in Docker\n\n" +
    "docker stop --time 30 myapp\n\n" +
    "Docker sends SIGTERM and waits up to 30 seconds for the container to stop. If the main process is still running after the timeout, Docker sends SIGKILL.\n\n" +
    "Dockerfile example:\n" +
    "FROM node:22-alpine\n" +
    "WORKDIR /app\n" +
    "COPY package*.json ./\n" +
    "RUN npm ci --omit=dev\n" +
    "COPY . .\n" +
    "STOPSIGNAL SIGTERM\n" +
    "CMD [\"node\", \"server.js\"]\n\n" +
    "Application shutdown example in Node.js:\n" +
    "process.on('SIGTERM', async () => {\n" +
    "  console.log('SIGTERM received. Starting graceful shutdown.');\n" +
    "  server.close(async () => {\n" +
    "    await database.close();\n" +
    "    process.exit(0);\n" +
    "  });\n" +
    "});\n\n" +
    "This is an illustrative example. The server and database objects must be initialized by the application. The application should also handle shutdown timeouts and avoid accepting new requests during shutdown.",

  problems: [
    {
      issue: "Container stops immediately during deployment.",
      rootCause:
        "The application may not handle SIGTERM correctly, or its shutdown timeout may be too short for active requests and connection cleanup.",
      solution:
        "Implement graceful shutdown in the application. Stop accepting new requests, finish or safely cancel active requests, close database connections and configure an appropriate stop timeout. Test shutdown behavior before production rollout."
    },
    {
      issue: "Container does not stop within the expected time.",
      rootCause:
        "The main process may ignore SIGTERM, be blocked during shutdown or be unable to complete cleanup.",
      solution:
        "Inspect application logs and process behavior during shutdown. Fix signal handling and blocking operations. Increase the stop timeout only when the application genuinely needs more time. Understand that Docker may eventually send SIGKILL."
    },
    {
      issue: "Container cannot be restarted after removal.",
      rootCause:
        "docker rm deletes the container object. A removed container is no longer available for docker start.",
      solution:
        "Create a new container from the required image using the correct environment, ports, network and volume settings. Preserve important data in persistent volumes."
    },
    {
      issue: "Application process exits but the container does not behave as expected.",
      rootCause:
        "The configured entrypoint, shell wrapper or process supervision may affect signal delivery and process lifecycle.",
      solution:
        "Use exec-form ENTRYPOINT or CMD where suitable. Ensure the actual application receives termination signals. Inspect the process tree with docker top and verify the main process."
    },
    {
      issue: "Important requests fail during container replacement.",
      rootCause:
        "The application may be stopped before active requests finish, or the deployment process may remove the old container before the replacement is ready.",
      solution:
        "Use readiness checks and a deployment strategy that starts the replacement before removing the old instance. Configure graceful shutdown and load-balancer connection draining where supported."
    }
  ]
});

export default data;

