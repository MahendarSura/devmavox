import type { GlossaryLearningSection } from "./glossary-data";

export const dockerContainerLearningContent: GlossaryLearningSection[] = [
  {
    title: "1. Purpose – Why Is It Used?",
    items: [
      {
        title: "Container ante enti?",
        explanation: "Telugu Answer:\nDocker container ante application run avvadaniki kavalsina files, libraries, runtime dependencies mariyu configuration tho create chesina isolated environment. Image nunchi container create avutundi. Container virtual machine kaadu; Linux lo host kernel ni share cheskuntu namespaces mariyu cgroups dwara isolation, resource control provide chestundi.\n\nEnglish Explanation:\nA Docker container is an isolated environment in which an application process runs with the files, libraries, runtime dependencies and configuration it needs. A container is created from an image. The image provides the application filesystem and startup configuration, while the container adds a runtime layer for the running process and its writable changes. A container is not a complete virtual machine: it normally shares the host operating-system kernel while using Linux namespaces and cgroups to provide isolation and resource control.",
        details: [
          "Image: the read-only template used to create containers.",
          "Container: the created runtime instance of an image. It may be running, stopped, paused or exited.",
          "Container process: the main process started by the image ENTRYPOINT and CMD configuration.",
          "Writable layer: the container-specific filesystem layer where runtime changes are stored. This layer is normally disposable."
        ],
        example: "A team builds a Node.js API image containing the Node runtime and application files. Docker creates a container from that image and starts the Node.js process inside it. The API can then be reached through a published host port."
      },
      {
        title: "Enduku containers use chestaru?",
        explanation: "Telugu Answer:\nDeveloper laptop, testing server, production server madhya software versions mariyu configuration differences valla application problems ravachu. Container image lo application ki kavalsina runtime mariyu dependencies package cheyyadam valla ee differences taggutayi. Same tested image ni different environments lo deploy cheyochu.\n\nEnglish Explanation:\nTraditional deployments can behave differently on developer laptops, test servers and production machines because runtime versions, operating-system packages and configuration may differ. Containers package application dependencies into a consistent image, reducing these environment differences. Teams can test a specific image and promote that same image through environments instead of rebuilding a different artifact for every environment.",
        details: [
          "Consistency: the same image contains the same application files and runtime dependencies in each environment.",
          "Portability: a compatible container runtime can run the image on different supported hosts.",
          "Repeatability: deployment definitions describe how the container should start, connect to networks and access storage.",
          "Replacement: failed or outdated containers can be replaced with newly created instances from a known image."
        ],
        example: "A Node.js service works on a developer machine but fails on a test server because the server has a different Node version. Packaging the service and its runtime into an image reduces this type of mismatch."
      },
      {
        title: "Virtual Machine ki Container ki difference enti?",
        explanation: "Telugu Answer:\nVirtual Machine ki separate guest operating system mariyu virtual hardware untayi. Linux container matram host Linux kernel ni share cheskuntu isolated processes ni run chestundi. Anduke containers generally takkuva overhead tho fast ga start avutayi. Kani VM mariyu container isolation levels different.\n\nEnglish Explanation:\nA traditional virtual machine runs a guest operating system on virtualized hardware. A typical Linux container runs isolated processes that share the host Linux kernel. Because containers do not normally boot a separate guest kernel, they can start with less overhead. However, containers and VMs provide different isolation boundaries, and containers are not automatically a replacement for VMs.",
        details: [
          "VM architecture: physical host → hypervisor → virtual hardware → guest operating system → application.",
          "Container architecture: host operating-system kernel → container runtime isolation → container process.",
          "VMs are useful when workloads need different guest operating systems or a stronger separate-kernel boundary.",
          "Containers are useful for packaging and running application processes consistently with efficient resource usage.",
          "A container running on Docker Desktop may run inside a Linux VM on Windows or macOS; the container itself still uses a Linux kernel."
        ],
        example: "A company may run Linux VMs on a cloud platform and run multiple application containers inside each VM. The VM provides the host boundary, while containers isolate individual application workloads."
      },
      {
        title: "Container valla benefits enti?",
        explanation: "Telugu Answer:\nContainers valla application ni consistent environment lo run cheyochu. Same image ni development, testing, production environments lo use cheyochu. Failed container ni manually repair cheyyakunda tested image nunchi replacement create cheyochu. CI/CD automation mariyu horizontal scaling ki kuda containers help chestayi.\n\nEnglish Explanation:\nContainers provide a repeatable application runtime and make it easier to create, replace and scale application instances. Their benefits depend on correct image design, resource configuration, storage planning and operational monitoring.",
        details: [
          "Portability: move a compatible image between development, testing and production environments.",
          "Consistency: reduce differences in runtime and dependency versions.",
          "Fast replacement: create a replacement container from a tested image instead of manually repairing a damaged instance.",
          "Resource efficiency: multiple containers can share the host kernel rather than each running a full guest operating system.",
          "Automation: container build and deployment steps can be integrated into CI/CD pipelines.",
          "Scalability: create additional application instances when workload and architecture support horizontal scaling."
        ],
        example: "During a traffic increase, a web service can run multiple container replicas behind a load balancer. An orchestrator can manage replica count and replace failed instances."
      },
      {
        title: "Real-time DevOps use cases",
        explanation: "Telugu Answer:\nDevOps projects lo web applications, backend APIs, microservices, background workers mariyu CI/CD build jobs ni containers lo run chestaru. Application data ni container writable layer lo kakunda volumes leda external storage lo maintain chestaru.\n\nEnglish Explanation:\nDevOps teams use containers to package services and run predictable workloads throughout the software delivery lifecycle. The container should be treated as a replaceable application runtime, while important persistent data and environment-specific secrets should be managed separately.",
        details: [
          "Web applications: run Node.js, Java, Python or .NET services in containers.",
          "Microservices: package independently deployable services as separate images.",
          "Background workers: run queue consumers and scheduled processing jobs.",
          "CI/CD: create temporary build and test containers during pipeline execution.",
          "Development environments: provide consistent tools and dependencies to developers.",
          "Orchestration: deploy and manage containers through Docker Compose or Kubernetes."
        ],
        example: "A project can run a frontend container, backend API container and database service on a dedicated network. The API connects to the database using its service name rather than a hard-coded container IP."
      }
    ]
  },
  {
    title: "2. Real-Time Project Example",
    items: [
      {
        title: "Node.js application ni Docker container lo run cheyyadam",
        explanation: "First, the application needs a Dockerfile that selects a Node.js runtime, copies dependency manifests, installs locked dependencies, copies application files and defines the startup command. Build the image from the project directory, then create a container from that image. The example assumes the application listens on port 3000 and binds to 0.0.0.0 inside the container.",
        commands: [
          "docker build -t devmavox-api:1.0 .",
          "docker run -d --name devmavox-api -p 8080:3000 devmavox-api:1.0",
          "docker ps",
          "docker logs --tail 100 devmavox-api",
          "docker inspect devmavox-api"
        ],
        example: "Users access the application at http://localhost:8080. Docker forwards host port 8080 to container port 3000. If the application listens only on 127.0.0.1 inside the container, external access through the published port may fail; the application should listen on 0.0.0.0 when appropriate."
      },
      {
        title: "Development, testing and production environments",
        explanation: "The image should contain the application artifact and runtime dependencies, while environment-specific values should be supplied when the container is deployed. Development may use debug logging and source mounts; testing may use test configuration and automated checks; production should use controlled configuration, restricted access, health checks and resource limits. Avoid rebuilding different application artifacts for each environment when the same tested artifact can be promoted.",
        details: [
          "Development: use fast feedback, local source mounts where suitable, and non-production credentials.",
          "Testing: run automated integration tests against the candidate image and its dependencies.",
          "Production: use approved image versions or digests, managed secrets, resource limits and monitoring.",
          "Environment variables configure runtime behaviour; they should not be treated as a safe place for every type of secret unless the platform protects them appropriately."
        ],
        example: "Promote devmavox-api:1.0 after testing. Supply different database endpoints through deployment configuration rather than embedding a development database address in the image."
      },
      {
        title: "Application deployment architecture",
        explanation: "A typical deployment starts with source code in version control. CI builds an image, tests it, scans it and pushes it to a registry. A deployment platform pulls the approved image and starts containers on the target hosts. Traffic reaches the application through a load balancer or published port. Logs and metrics are collected for operational visibility.",
        details: [
          "Source repository: stores application code, Dockerfile and deployment definitions.",
          "CI pipeline: builds, tests, scans and tags the image.",
          "Container registry: stores versioned images for deployment.",
          "Runtime host: runs the container using a compatible container engine.",
          "Network entry point: routes client traffic to the correct service.",
          "Observability platform: collects logs, metrics, traces and alerts."
        ],
        example: "Developer pushes code → Jenkins builds devmavox-api:commit-sha → image scan passes → image is pushed to a registry → deployment updates the service → health verification confirms the new version."
      },
      {
        title: "Database and application containers integration",
        explanation: "Application and database containers should communicate over a dedicated Docker network. The application connects to the database using the database service or container name and its internal port. The database data directory must use a persistent volume so that removing or replacing the database container does not automatically remove its data. For production systems, assess whether a managed database is more appropriate than running the database in the same host environment.",
        commands: [
          "docker network create app-network",
          "docker volume create db-data",
          "docker run -d --name database --network app-network -v db-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=change-this-locally postgres:16",
          "docker run -d --name api --network app-network -p 8080:3000 -e DB_HOST=database devmavox-api:1.0"
        ],
        details: [
          "The commands are an illustrative local example; use a secure secret mechanism instead of a real password in shell history or shared scripts.",
          "The API uses database as its network hostname; Docker's user-defined bridge network provides name-based container discovery.",
          "The database data directory is mounted to the named volume db-data.",
          "The database container should not publish its database port to the public host interface unless there is a specific, protected requirement.",
          "Configure database readiness checks and application retry behaviour; container startup order alone does not guarantee that the database is ready."
        ]
      }
    ]
  },
  {
    title: "3. How It Works – Workflow",
    items: [
      {
        title: "Image nunchi container creation",
        explanation: "The Docker client sends a container creation request to the Docker daemon. The daemon checks the requested image and configuration, prepares the container filesystem and runtime settings, and coordinates with lower-level runtime components to create the isolated process. The container starts only when its configured process is launched.",
        commands: [
          "docker image ls",
          "docker create --name web nginx:stable",
          "docker start web",
          "docker ps -a"
        ],
        example: "docker create prepares a stopped container; docker start starts it. docker run is a convenient command that creates and starts a container in one operation."
      },
      {
        title: "Container startup process",
        explanation: "When a container starts, the runtime prepares the configured namespaces, resource controls, filesystem mounts, networking and process settings. It then launches the configured entrypoint and command. If the main process exits, the container normally transitions to an exited state. A restart policy may ask Docker to start it again, depending on the exit and daemon conditions.",
        details: [
          "Image metadata supplies defaults such as ENTRYPOINT, CMD, environment and working directory.",
          "Runtime options can override or extend those defaults.",
          "The container's main process is important: its lifecycle generally determines whether the container is running.",
          "A successful container start does not prove that the application is ready to serve requests."
        ]
      },
      {
        title: "Process isolation",
        explanation: "Linux namespaces provide separate views of selected system resources, such as process IDs, network interfaces, mount points and hostnames. This helps processes inside a container see an environment that is separated from other processes. Namespaces provide isolation views, but they are not a complete security boundary by themselves.",
        details: [
          "PID namespace: provides an isolated process ID view.",
          "Network namespace: provides separate network interfaces, routes and port space.",
          "Mount namespace: provides an isolated mount view of the filesystem.",
          "UTS namespace: provides a separate hostname and domain-name view.",
          "User namespace: can map container user IDs to different host IDs when configured.",
          "IPC namespace: isolates inter-process communication resources."
        ]
      },
      {
        title: "Filesystem and networking",
        explanation: "A container filesystem is assembled from image layers and a container-specific writable layer. Docker can also mount named volumes or host bind mounts into the container. Networking connects containers to bridge, host, overlay or other supported network modes. Published ports provide a path from a host port to a container port.",
        details: [
          "Image layers are reusable read-only filesystem layers.",
          "The writable container layer is normally removed when the container is removed.",
          "Named volumes are managed by Docker and are suitable for data that must outlive a container.",
          "Bind mounts connect a specific host path to a container path and require careful host-permission management.",
          "A user-defined bridge network supports container-to-container communication and name resolution."
        ],
        commands: [
          "docker inspect web",
          "docker network ls",
          "docker network inspect bridge",
          "docker volume ls",
          "docker port web"
        ]
      },
      {
        title: "Container lifecycle",
        explanation: "A container can be created, started, running, paused, stopped and removed. Stopping a container sends a termination signal to its main process and waits for the configured timeout before forcefully killing it if necessary. Removing a container deletes its container metadata and writable layer, but separately managed named volumes are not removed by default unless explicitly requested.",
        details: [
          "Created: container configuration exists but its process has not started.",
          "Running: the configured main process is active.",
          "Paused: processes are frozen until the container is unpaused.",
          "Exited: the main process has terminated.",
          "Removed: container metadata and its writable layer are deleted."
        ],
        commands: [
          "docker pause web",
          "docker unpause web",
          "docker stop --time 20 web",
          "docker start web",
          "docker rm web"
        ]
      },
      {
        title: "Container termination and replacement",
        explanation: "A container should normally be replaced with a new container when the application version or deployment configuration changes. Do not depend on manually changing a running production container because those changes are difficult to reproduce. Before replacement, verify that required data is stored outside the disposable writable layer and that the new instance passes health checks.",
        details: [
          "Graceful shutdown: the application should handle termination signals and finish or safely cancel in-flight work.",
          "Persistent data: store it in a volume or external service, not only in the container writable layer.",
          "Replacement: create a new container from the approved image and deployment configuration.",
          "Rollback: retain a known-good image version and a repeatable way to redeploy it."
        ]
      }
    ]
  },
  {
    title: "4. Practical Commands",
    items: [
      {
        title: "Create and run a container",
        explanation: "docker run creates a container from an image and starts its configured process. The -d option runs it in detached mode, --name assigns a readable name, and -p publishes a host port to a container port.",
        commands: [
          "docker run -d --name web -p 8080:80 nginx:stable"
        ],
        example: "Open http://localhost:8080 to reach the Nginx service if the host port is available and local firewall rules allow access."
      },
      {
        title: "List containers",
        explanation: "docker ps displays running containers. Adding -a includes stopped and created containers. Review status, image, command, ports and names when checking deployment state.",
        commands: [
          "docker ps",
          "docker ps -a"
        ]
      },
      {
        title: "View container logs",
        explanation: "docker logs displays the container process output collected by the configured logging driver. --tail limits the number of recent lines, and -f follows new output. Applications should write operational logs to stdout and stderr when using the standard Docker logging approach.",
        commands: [
          "docker logs --tail 100 web",
          "docker logs -f web"
        ]
      },
      {
        title: "Execute a command inside a running container",
        explanation: "docker exec starts an additional process inside an already running container. It is useful for diagnostics, such as checking files or testing a connection. It should not become the normal way to configure production applications because manual changes are not reproducible.",
        commands: [
          "docker exec -it web sh",
          "docker exec web nginx -t"
        ]
      },
      {
        title: "Inspect container configuration",
        explanation: "docker inspect returns detailed JSON metadata, including state, image, mounts, networks, environment configuration and host settings. Use it to investigate how a container was created and what runtime configuration it received.",
        commands: [
          "docker inspect web",
          "docker inspect --format '{{.State.Status}}' web",
          "docker inspect --format '{{json .NetworkSettings.Networks}}' web"
        ]
      },
      {
        title: "Monitor resource usage",
        explanation: "docker stats provides a live view of CPU, memory, network I/O, block I/O and process counts for running containers. Compare the values with configured limits and host capacity before changing resource settings.",
        commands: [
          "docker stats web",
          "docker stats --no-stream"
        ]
      },
      {
        title: "Check published ports and container exit status",
        explanation: "docker port displays host-to-container port mappings. docker inspect can reveal the exit code and state details after a container stops. These checks help separate application startup problems from port publishing problems.",
        commands: [
          "docker port web",
          "docker inspect --format '{{.State.ExitCode}}' web",
          "docker ps -a"
        ]
      },
      {
        title: "Stop, restart and remove a container",
        explanation: "docker stop requests graceful termination, docker restart stops and starts the container again, and docker rm removes a stopped container. Removing a container does not mean that a named volume is automatically removed.",
        commands: [
          "docker stop web",
          "docker restart web",
          "docker rm web"
        ]
      }
    ]
  },
  {
    title: "5. Common Mistakes",
    items: [
      {
        title: "Container filesystem-lo important data store cheyyadam",
        explanation: "Files written only to the container writable layer are tied to that container. If the container is removed and recreated, those changes are not automatically transferred to the replacement. Store database files and other persistent data in named volumes, bind mounts or external storage designed for the workload.",
        example: "A database stores its data under /var/lib/postgresql/data. Mount a persistent volume at that path and verify backup and restore procedures."
      },
      {
        title: "Incorrect port mapping",
        explanation: "The syntax -p HOST_PORT:CONTAINER_PORT maps a host port to the port where the application listens inside the container. Reversing these values or using the wrong container port can make the service unreachable. The application should also listen on the appropriate container interface, commonly 0.0.0.0 for a service intended to receive container network traffic.",
        commands: [
          "docker port web",
          "docker inspect web"
        ]
      },
      {
        title: "Root user tho container run cheyyadam",
        explanation: "A process running as root inside a container has elevated privileges within its container environment. Depending on runtime configuration and vulnerabilities, excessive privileges can increase host impact. Use a dedicated non-root user, drop unnecessary capabilities and avoid privileged mode unless there is a justified requirement.",
        example: "Define USER node in a Node.js Dockerfile after ensuring the application files are readable by that user."
      },
      {
        title: "Resource limits configure cheyyakapovadam",
        explanation: "Without suitable resource controls, one container can consume a disproportionate amount of host CPU or memory. This may affect neighbouring workloads or contribute to host instability. Configure CPU and memory limits according to measured workload needs, and monitor throttling and memory pressure.",
        commands: [
          "docker run -d --name limited-web --memory 512m --cpus 1 nginx:stable",
          "docker stats limited-web"
        ]
      },
      {
        title: "Restart loops ignore cheyyadam",
        explanation: "A restart policy can repeatedly start a container whose application keeps failing. This may hide the original startup problem and create repeated load or noisy logs. Inspect the exit code, logs, health status, configuration and dependencies before changing restart settings.",
        commands: [
          "docker ps -a",
          "docker logs --tail 200 web",
          "docker inspect --format '{{.RestartCount}} {{.State.ExitCode}}' web"
        ]
      },
      {
        title: "Container ni manually modify chesi deployment process-ga use cheyyadam",
        explanation: "Manual changes made through docker exec can disappear when the container is replaced. Put application changes in source code, image build instructions or deployment configuration. This keeps deployments repeatable and auditable."
      }
    ]
  },
  {
    title: "6. Configuration Examples",
    items: [
      {
        title: "Restart policy, port mapping and resource constraints",
        explanation: "This example starts Nginx with a restart policy, a host-to-container port mapping and illustrative CPU and memory limits. unless-stopped asks Docker to restart the container after daemon or process restarts, subject to Docker restart-policy behaviour. Resource values must be selected based on actual workload measurements.",
        commands: [
          "docker run -d --name web --restart unless-stopped --memory 512m --cpus 1 -p 8080:80 nginx:stable"
        ],
        details: [
          "--name web: assigns a stable container name.",
          "--restart unless-stopped: configures restart behaviour.",
          "--memory 512m: sets a memory limit.",
          "--cpus 1: limits the container to approximately one CPU worth of scheduling capacity.",
          "-p 8080:80: publishes host port 8080 to container port 80."
        ]
      },
      {
        title: "Environment variables",
        explanation: "Environment variables allow runtime configuration to be supplied without rebuilding the image. They are useful for non-secret settings such as application mode or service endpoints. Environment variables may be visible through container inspection or process diagnostics, so do not assume they are a secure secret store.",
        commands: [
          "docker run -d --name api -e NODE_ENV=production -e LOG_LEVEL=info -p 8080:3000 devmavox-api:1.0"
        ],
        example: "The application reads NODE_ENV and LOG_LEVEL at startup. Supply sensitive credentials through a suitable secret-management mechanism with controlled access."
      },
      {
        title: "Volume configuration",
        explanation: "A named volume stores data separately from the container writable layer. Docker manages the volume lifecycle, allowing a replacement container to mount the same data location. A volume is not a backup by itself; production data still needs tested backup, restore and retention procedures.",
        commands: [
          "docker volume create app-data",
          "docker run -d --name app -v app-data:/var/lib/app-data devmavox-api:1.0",
          "docker volume inspect app-data"
        ]
      },
      {
        title: "Docker network configuration",
        explanation: "A user-defined bridge network allows containers on the same host to communicate by container name. It provides a clearer application network boundary than relying on the default bridge for every workload.",
        commands: [
          "docker network create backend-network",
          "docker run -d --name api --network backend-network devmavox-api:1.0",
          "docker network inspect backend-network"
        ]
      },
      {
        title: "Health check configuration",
        explanation: "A health check runs a command at configured intervals and records whether the container is healthy, starting or unhealthy. A health check does not automatically repair an application. Deployment systems must decide how to react to unhealthy status.",
        commands: [
          "docker run -d --name web --health-cmd='wget -q --spider http://127.0.0.1/ || exit 1' --health-interval=30s --health-timeout=5s --health-retries=3 nginx:stable",
          "docker inspect --format '{{.State.Health.Status}}' web"
        ],
        details: [
          "Choose a health endpoint that verifies meaningful application readiness.",
          "Ensure the selected health-check utility exists in the image.",
          "Avoid checks that always return success without testing the service."
        ]
      },
      {
        title: "Read-only filesystem and restricted capabilities",
        explanation: "A read-only root filesystem reduces the locations where an application process can write. Some applications need temporary writable paths, which can be provided through tmpfs or dedicated volumes. Dropping unnecessary Linux capabilities reduces the privileges available to the process.",
        commands: [
          "docker run -d --name hardened-web --read-only --tmpfs /var/cache/nginx --tmpfs /var/run --cap-drop ALL -p 8080:80 nginx:stable"
        ],
        details: [
          "Test the image first because applications may require additional writable paths or capabilities.",
          "Do not add privileges simply to hide an unexplained permission error.",
          "Use a non-root runtime user where the image supports it."
        ]
      }
    ]
  },
  {
    title: "7. Troubleshooting",
    items: [
      {
        title: "Container exited",
        explanation: "An exited container means its main process has terminated. Common causes include an application exception, invalid command, missing configuration, failed dependency connection or a process that completed normally. Start with status, exit code and logs before changing the image or restart policy.",
        commands: [
          "docker ps -a",
          "docker logs --tail 200 web",
          "docker inspect --format '{{.State.ExitCode}} {{.State.Error}}' web"
        ],
        details: [
          "Exit code 0 usually indicates normal process completion, but check whether a long-running service was expected.",
          "A non-zero exit code indicates failure and should be interpreted with application logs.",
          "Correct the underlying startup problem and recreate the container from a repeatable configuration."
        ]
      },
      {
        title: "Container restarting continuously",
        explanation: "A restart loop may occur when the main process exits and a restart policy starts it again. Check the restart count, recent logs, environment variables, command, dependencies and health state. Do not assume that changing the restart policy fixes the underlying application error.",
        commands: [
          "docker inspect --format '{{.RestartCount}}' web",
          "docker logs --tail 200 web",
          "docker inspect web"
        ]
      },
      {
        title: "Port conflicts or application not reachable",
        explanation: "A host port may already be used by another process or container. The application may also be listening on the wrong internal port or only on loopback. Verify the actual application listening port, Docker port mapping and host firewall before changing network configuration.",
        commands: [
          "docker ps",
          "docker port web",
          "docker inspect web"
        ],
        example: "If the application listens on container port 3000, use -p 8080:3000 rather than -p 8080:80."
      },
      {
        title: "Network connectivity failures",
        explanation: "Containers may fail to reach each other because they are on different networks, use an incorrect service name, or connect to the wrong port. Inspect network membership and DNS resolution from the relevant container. Prefer user-defined networks for application communication.",
        commands: [
          "docker network ls",
          "docker network inspect app-network",
          "docker exec api getent hosts database"
        ]
      },
      {
        title: "Out-of-memory termination",
        explanation: "A container may be terminated after exceeding its memory limit, or the host may experience memory pressure. Inspect container state, Docker events, host memory and application memory behaviour. Increase a limit only after checking for leaks, unexpected workload growth and host capacity.",
        commands: [
          "docker inspect --format '{{.State.OOMKilled}} {{.State.ExitCode}}' web",
          "docker stats --no-stream",
          "docker events --since 30m"
        ]
      },
      {
        title: "Application startup failures",
        explanation: "Startup failures often come from a missing environment variable, invalid configuration, wrong working directory, incorrect entrypoint, unavailable dependency or permission problem. Compare the container's actual configuration with the expected deployment configuration and inspect the first relevant error in the logs.",
        commands: [
          "docker logs --tail 200 web",
          "docker inspect web",
          "docker exec -it web sh"
        ]
      },
      {
        title: "Graceful shutdown is not working",
        explanation: "If the application does not handle termination signals, it may be killed after Docker's stop timeout. Use an exec-form ENTRYPOINT or CMD where possible, ensure the application process receives signals, and configure the application to stop accepting new work and finish in-flight requests.",
        commands: [
          "docker stop --time 30 web",
          "docker inspect --format '{{.State.FinishedAt}} {{.State.ExitCode}}' web"
        ]
      }
    ]
  },
  {
    title: "8. Best Practices",
    items: [
      {
        title: "Small and reliable images",
        explanation: "Use maintained base images and include only the runtime files needed by the application. Multi-stage builds can keep compilers and development tools out of the final runtime image. Smaller images can reduce transfer time and the amount of software that needs vulnerability review."
      },
      {
        title: "Health checks and readiness",
        explanation: "Define a meaningful health check for the service and distinguish process health from application readiness. A running process may still be unable to serve requests because a required dependency is unavailable. Coordinate health checks with the deployment platform's traffic and restart behaviour."
      },
      {
        title: "Resource limits and monitoring",
        explanation: "Set CPU and memory constraints based on load tests and observed production behaviour. Monitor memory usage, CPU throttling, restarts and host pressure. Limits that are too low can cause instability; limits that are too high can allow one workload to affect others."
      },
      {
        title: "Persistent storage",
        explanation: "Keep important data outside the disposable container writable layer. Use named volumes, bind mounts or external managed storage according to the workload. Define backup schedules and regularly test restoration rather than assuming a volume alone protects data."
      },
      {
        title: "Repeatable and immutable deployments",
        explanation: "Use versioned image tags or digests and store deployment configuration in source control. Avoid manually modifying running containers. Promote a tested image through environments and retain a known-good version for rollback."
      },
      {
        title: "Graceful shutdown and one primary service process",
        explanation: "Design the container around its intended service process and make signal handling predictable. The application should handle termination, close connections and complete or safely cancel work within the platform's shutdown grace period."
      }
    ]
  },
  {
    title: "9. Security Considerations",
    items: [
      {
        title: "Non-root containers",
        explanation: "Run the application with a dedicated unprivileged user whenever possible. Ensure required application files and writable directories have correct ownership and permissions. Non-root execution reduces the privileges available to a compromised application process."
      },
      {
        title: "Read-only filesystem",
        explanation: "Use a read-only root filesystem when the application supports it. Provide explicit writable locations through tmpfs or dedicated volumes. This limits unintended filesystem modifications but must be tested against application runtime requirements."
      },
      {
        title: "Linux capabilities",
        explanation: "Linux capabilities divide traditionally broad root privileges into smaller permissions. Drop capabilities the application does not need and add back only a specific capability when there is a documented technical reason. Do not use broad privilege escalation as a shortcut for permission troubleshooting."
      },
      {
        title: "Seccomp profiles",
        explanation: "Seccomp can restrict which system calls a process may make. Docker applies a default seccomp profile on supported Linux configurations. Custom profiles should be based on application requirements and tested carefully to avoid breaking legitimate runtime operations."
      },
      {
        title: "Avoid privileged mode",
        explanation: "Privileged containers receive substantially expanded access to host devices and capabilities. Avoid --privileged for normal application workloads. If a workload needs host access, identify the exact requirement and grant the smallest possible permission."
      },
      {
        title: "Docker daemon access restrictions",
        explanation: "Access to the Docker daemon is highly privileged because a user who can control it may be able to start containers with host filesystem access. Restrict membership in the Docker group, protect the daemon socket and use controlled administrative access."
      },
      {
        title: "Secrets and image provenance",
        explanation: "Do not bake passwords, API keys, certificates or cloud credentials into image layers or source control. Build secrets should use supported secret-mount mechanisms. At runtime, use a secret manager or platform-provided secret facility with restricted access. Scan images and use trusted registries."
      },
      {
        title: "Network exposure",
        explanation: "Publish only the ports that clients need. Bind management interfaces to restricted addresses or private networks where appropriate. Separate application and data networks when useful, and review firewall and registry access controls."
      }
    ]
  },
  {
    title: "10. Related Concepts",
    items: [
      {
        title: "Docker CLI",
        explanation: "The Docker CLI is the command-line client used to request operations such as building images, creating containers, inspecting state and managing networks. It communicates with the Docker daemon through the Docker API."
      },
      {
        title: "Docker Image", teluguTitle: "Docker Image anedi container create cheyadaniki use chese read-only template. Application code, dependencies mariyu required configuration image lo untayi. Ee image nunchi multiple containers create cheyochu.",
        explanation: "A Docker image is the read-only template from which containers are created. It contains application files, dependencies and runtime defaults. Multiple containers can be created from the same image."
      },
      {
        title: "Docker Engine",
        teluguTitle: "Docker Engine containers build, run and manage cheyadaniki use ayye platform.",
        explanation: "Docker Engine is the container platform that exposes the Docker API and manages images, containers, networks and volumes through its daemon and supporting runtime components."
      },
      {
        title: "Dockerfile",
        teluguTitle: "Dockerfile image build instructions define chese text file.",
        explanation: "A Dockerfile is a build recipe that describes how to create an image. It defines the base image, filesystem changes, dependencies, user, exposed ports and default startup command."
      },
      {
        title: "Docker Network",
        teluguTitle: "Containers madhya communication kosam Docker Network use chestham.",
        explanation: "A Docker network provides connectivity between containers and, depending on its driver and configuration, external networks. User-defined bridge networks provide container name resolution on a single Docker host."
      },
      {
        title: "Docker Volume",
        teluguTitle: "Container remove ayina data persist avvadaniki Docker Volume use chestham.",
        explanation: "A Docker volume stores data independently of a container's writable layer. It is useful when application or database data must remain available after a container is replaced."
      },
      {
        title: "Docker Compose",
        teluguTitle: "Multiple containers ni YAML configuration dwara manage cheyadaniki Docker Compose use chestham.",
        explanation: "Docker Compose defines and manages multi-container applications through a YAML file. It can describe services, networks, volumes, environment configuration and dependency relationships."
      }
    ]
  },
  {
    title: "11. Architecture & Internals",
    items: [
      {
        title: "Docker Client and Docker Daemon",
        explanation: "The Docker CLI is the client used by an operator or automation system. It sends API requests to the Docker daemon, dockerd, which manages Docker objects such as containers, images, networks and volumes. The client and daemon may run on the same machine or communicate with a remote Docker Engine endpoint.",
        details: [
          "Client: parses the command and sends the requested operation to the Docker API.",
          "Daemon: validates and coordinates Docker object management.",
          "API endpoint: controls how the client reaches the daemon; protect remote endpoints with appropriate authentication and transport security."
        ]
      },
      {
        title: "containerd and runc",
        explanation: "Docker Engine uses lower-level container runtime components. containerd manages container lifecycle operations and image-related tasks. runc is a low-level OCI runtime commonly used to create and run containers according to OCI runtime configuration. Exact implementation details can vary by Docker Engine version and platform.",
        details: [
          "dockerd coordinates Docker-level operations.",
          "containerd manages container lifecycle tasks.",
          "runc creates and starts the isolated container process using Linux kernel features.",
          "OCI specifications help standardize image and runtime formats."
        ]
      },
      {
        title: "Linux namespaces",
        explanation: "Namespaces isolate a process's view of selected system resources. They help a container see its own process IDs, network interfaces, mount points and hostname rather than the host's complete view. Namespace isolation works together with other kernel security mechanisms; it should not be treated as a complete boundary on its own."
      },
      {
        title: "Control groups (cgroups)",
        explanation: "Control groups organize processes and measure or limit resource consumption. Docker uses cgroups on supported Linux systems to apply controls such as memory limits and CPU quotas. Cgroup versions and available controls depend on the host kernel and runtime configuration.",
        commands: [
          "docker stats web",
          "docker inspect web"
        ]
      },
      {
        title: "Container filesystem layers",
        explanation: "Container images are assembled from read-only filesystem layers. When a container is created, a writable layer is added for container-specific changes. Storage drivers implement the layered filesystem behaviour. Persistent application data should normally be mounted separately through volumes or other storage."
      },
      {
        title: "OCI runtime standards",
        explanation: "The Open Container Initiative publishes specifications for container image formats and runtime behaviour. OCI standards support interoperability between compliant image tools and runtimes. Docker images and container runtimes participate in this broader ecosystem, although individual products may have additional features."
      }
    ]
  },
  {
    title: "12. Implementation – Hands-on",
    items: [
      {
        title: "Step 1 – Prepare a Node.js application",
        explanation: "Create a small Node.js service that listens on port 3000 and binds to 0.0.0.0. Confirm that the application works locally before creating the image. The container port must match the port used by the application.",
        commands: [
          "npm install",
          "npm start"
        ],
        example: "For a Next.js project, use the project's production start command and ensure the server listens on the expected container interface and port."
      },
      {
        title: "Step 2 – Build the application image",
        explanation: "Create a Dockerfile with a suitable base image, working directory, dependency installation, application build and startup command. Copy dependency manifests before the rest of the source where that supports build-cache reuse. Exclude local dependencies, secrets and unnecessary files through .dockerignore.",
        commands: [
          "docker build -t devmavox-api:1.0 .",
          "docker image ls"
        ]
      },
      {
        title: "Step 3 – Create and run the container",
        explanation: "Start the container from the built image. Configure the host port, container port, runtime environment and restart behaviour. Use a versioned image tag so the deployment can be identified and rolled back.",
        commands: [
          "docker run -d --name devmavox-api --restart unless-stopped -p 8080:3000 devmavox-api:1.0"
        ]
      },
      {
        title: "Step 4 – Configure networks and volumes",
        explanation: "Create a user-defined network for services that need to communicate. Attach the application and dependency containers to that network. Use a volume only for data that must persist independently of the container lifecycle.",
        commands: [
          "docker network create devmavox-network",
          "docker network connect devmavox-network devmavox-api",
          "docker network inspect devmavox-network"
        ]
      },
      {
        title: "Step 5 – Verify deployment",
        explanation: "Check container state, logs, published ports and application response. Confirm that the service is reachable from the intended client network and that dependencies are available. A running status alone is not sufficient evidence of application readiness.",
        commands: [
          "docker ps",
          "docker logs --tail 100 devmavox-api",
          "docker port devmavox-api",
          "docker stats --no-stream devmavox-api"
        ]
      },
      {
        title: "Step 6 – Replace the application version",
        explanation: "Build and test a new image version, then create a replacement container using the approved deployment definition. For production systems, use a deployment platform or orchestrator that supports controlled rollout and rollback rather than relying on an uncoordinated manual stop-and-start process.",
        commands: [
          "docker build -t devmavox-api:1.1 .",
          "docker image inspect devmavox-api:1.1"
        ]
      }
    ]
  },
  {
    title: "13. Production Use Cases",
    items: [
      {
        title: "Deploy Node.js applications and backend APIs",
        explanation: "Package each API with its runtime dependencies and deploy it using a controlled image version. Configure application settings at runtime, publish only required service ports and use health checks to verify readiness. Keep session state and important data outside the individual container when the service needs horizontal scaling."
      },
      {
        title: "Run background workers",
        explanation: "A worker container can run a queue consumer or scheduled processing process independently of the web API. Scale worker replicas according to queue depth and processing time. Implement idempotency, retry limits and graceful shutdown so messages are not lost or processed incorrectly during replacement."
      },
      {
        title: "Separate application and database services",
        explanation: "Run the application and database as separate services with independent configuration and lifecycle management. Use private network connectivity and persistent database storage. For production, consider managed database services for availability, backups, patching and operational support."
      },
      {
        title: "Replace unhealthy containers",
        explanation: "When an application instance fails, a deployment platform can stop routing traffic to it and create a replacement from the approved image. Health checks, readiness gates and sufficient replica capacity reduce the chance that replacement causes an outage."
      },
      {
        title: "Handle graceful shutdown",
        explanation: "During deployments, the application should stop accepting new requests, finish or safely cancel in-flight work, close database connections and exit within the configured grace period. This reduces dropped requests and incomplete background jobs."
      }
    ]
  },
  {
    title: "14. Monitoring & Observability",
    items: [
      {
        title: "CPU and memory utilization",
        explanation: "Monitor CPU consumption, memory working set, configured limits and host-level pressure. A container approaching its memory limit may be killed, while sustained CPU throttling can increase response latency. Compare metrics with request volume and application behaviour before tuning limits.",
        commands: [
          "docker stats",
          "docker stats --no-stream web"
        ]
      },
      {
        title: "Container health status",
        explanation: "Use a meaningful health check to detect whether the application can perform its intended function. Track transitions between starting, healthy and unhealthy states. A health check should test the service, not merely whether a process exists."
      },
      {
        title: "Logs and log drivers",
        explanation: "Applications should produce structured logs with timestamps, severity and request or correlation identifiers where appropriate. Docker logging drivers control how container output is captured and routed. Configure retention and central collection so that logs remain available after a container is replaced.",
        commands: [
          "docker logs --since 30m web",
          "docker logs --tail 200 web",
          "docker inspect --format '{{.HostConfig.LogConfig.Type}}' web"
        ]
      },
      {
        title: "Restart counts and failure alerts",
        explanation: "Track restart counts, exit codes and unhealthy transitions. A rising restart count can indicate application crashes, dependency failures or resource pressure. Alert on sustained failures rather than every harmless short-lived test container."
      },
      {
        title: "Prometheus and Grafana integration",
        explanation: "Prometheus can collect metrics exposed by the application or host and container monitoring components. Grafana can visualize CPU, memory, restart counts, request rate and latency. Choose exporters and dashboards that match the runtime and host environment; Docker Engine metrics alone do not provide every application-level metric."
      },
      {
        title: "Alerting for container failures",
        explanation: "Create actionable alerts for repeated restarts, unhealthy services, high memory pressure, sustained CPU throttling and application request failures. Include service identity, environment, image version and a link to relevant logs or dashboards in the alert context."
      }
    ]
  },
  {
    title: "15. Recovery & Incident Management",
    items: [
      {
        title: "Recover failed containers",
        explanation: "Identify whether the failure is caused by the application, configuration, host or dependency. Review the last known good image and deployment definition. If the container is damaged or misconfigured, replace it from the approved image rather than manually modifying the failed instance."
      },
      {
        title: "Diagnose OOMKilled situations",
        explanation: "Check the container's OOMKilled state, memory limit, resource metrics and application logs. Determine whether the cause is a memory leak, traffic spike, unexpectedly large workload or an unsuitable limit. Correct the cause and verify behaviour under representative load.",
        commands: [
          "docker inspect --format '{{.State.OOMKilled}}' web",
          "docker stats --no-stream web",
          "docker events --since 1h"
        ]
      },
      {
        title: "Restore application connectivity",
        explanation: "Check whether the application is listening on the expected interface and port. Verify Docker network membership, DNS name resolution, routing, published ports and firewall rules. Test connectivity from the same network path used by the dependent service."
      },
      {
        title: "Recover persistent data from volumes and backups",
        explanation: "Identify the correct volume and the latest verified backup. Restore into a controlled environment first when possible, validate application consistency and then perform the production recovery procedure. A volume protects data from ordinary container replacement but does not protect against host loss, accidental deletion or corruption by itself."
      },
      {
        title: "Roll back to a previous image",
        explanation: "Keep the previous approved image tag or digest and the matching deployment configuration. If a new release causes failures, redeploy the known-good artifact and verify service health. Database schema changes may require a separate compatible rollback or forward-repair plan."
      },
      {
        title: "Incident investigation and root cause analysis",
        explanation: "Record the incident timeline, affected services, image version, deployment change, alerts, logs and recovery actions. Identify the technical root cause and contributing factors. Convert the findings into prevention work such as better tests, resource alerts, health checks or safer rollout procedures."
      }
    ]
  },
  {
    title: "16. Automation & CI/CD Integration",
    items: [
      {
        title: "Jenkins pipeline integration",
        explanation: "A Jenkins pipeline can check out source code, run tests, build a container image, scan it and push it to a registry. The pipeline should fail when required quality or security checks fail. Store registry credentials in Jenkins credentials or an approved secret integration rather than in the Jenkinsfile.",
        example: "A pipeline tags an image with the Git commit SHA so that the deployed container can be traced to the exact source revision."
      },
      {
        title: "Build and push images to a registry",
        explanation: "Authenticate to the approved registry, build the image with a unique version tag and push it after tests pass. Record the resulting digest when exact artifact identity is required. Registry permissions should restrict who can publish production images.",
        commands: [
          "docker build -t registry.example.com/devmavox/api:1.0 .",
          "docker push registry.example.com/devmavox/api:1.0"
        ]
      },
      {
        title: "Automated container deployment",
        explanation: "A deployment stage updates the target environment to use the approved image version. The deployment definition should include environment configuration, networks, storage, health checks and resource settings. Production deployment should use a controlled rollout mechanism appropriate to the platform."
      },
      {
        title: "Image tagging and version management",
        explanation: "Use release versions, build numbers or commit identifiers to trace each image to source code. Tags are mutable labels, so use digests when strict artifact identity is required. Retain approved previous versions to support rollback and incident investigation."
      },
      {
        title: "Automated health verification",
        explanation: "After deployment, run checks against the actual service endpoint and verify application-level readiness. Confirm expected response codes, dependency connectivity and critical business behaviour. Do not mark a deployment successful merely because the container process started."
      },
      {
        title: "Deployment rollback automation",
        explanation: "Define measurable rollback conditions such as failed readiness checks, elevated error rates or severe latency regression. Automate rollback to a previously approved image when safe, and ensure database changes and persistent data are compatible with the rollback plan."
      }
    ]
  },
  {
    title: "17. Performance & Capacity",
    items: [
      {
        title: "CPU and memory tuning",
        explanation: "Measure actual CPU and memory usage under representative traffic. Set limits and reservations according to workload behaviour and host capacity. Watch for CPU throttling, garbage-collection pressure, memory leaks and OOM termination rather than increasing limits without investigation."
      },
      {
        title: "Container startup time",
        explanation: "Startup time depends on image availability, filesystem preparation, application initialization and dependency readiness. Reduce unnecessary image size, avoid expensive startup work and measure readiness separately from process creation. A fast process start does not guarantee that the service is ready for traffic."
      },
      {
        title: "Resource contention",
        explanation: "Containers share host resources. CPU-intensive or memory-heavy workloads can affect other services on the same host. Use resource controls, workload separation and monitoring to prevent noisy-neighbour problems. Consider dedicated hosts or orchestration policies for workloads with strict performance requirements."
      },
      {
        title: "Disk usage and cleanup",
        explanation: "Images, writable layers, volumes, logs and build cache consume disk space. Monitor filesystem capacity and configure log rotation and image-retention policies. Remove unused resources only after checking whether volumes or images are still needed.",
        commands: [
          "docker system df",
          "docker image ls",
          "docker container ls -a",
          "docker volume ls"
        ]
      },
      {
        title: "Host capacity planning",
        explanation: "Plan capacity using peak CPU, memory, disk I/O, network throughput and expected replica count. Include host operating-system overhead and monitoring agents. Load test the deployment and maintain headroom for rolling updates, failure replacement and temporary traffic spikes."
      },
      {
        title: "Workload optimization",
        explanation: "Optimize application code, connection pools, caching, concurrency and image startup behaviour based on measurements. Keep containers focused on their workload and scale horizontally only when the service architecture supports it. Validate improvements with repeatable performance tests."
      }
    ]
  }
];
