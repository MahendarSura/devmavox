type Problem = {
  issue: string;
  solution: string;
};

type NoteSection = {
  heading: string;
  explanation: string;
  steps: string[];
  commands?: string;
  config?: string;
  problems: Problem[];
};

type NoteData = {
  title: string;
  description: string;
  sections: NoteSection[];
};

export const dockerTroubleshooting: NoteData = {
  title: "Docker Troubleshooting – Complete Real-Time & Production Engineering Notes",

  description:
    "Complete practical Docker troubleshooting training notes covering architecture, internal working, real-time DevOps workflows, production incidents, error identification, logs, diagnostic commands, root cause analysis, practical fixes, configuration examples, verification, prevention and interview knowledge. Written in simple English for beginners.",

  sections: [
    {
      heading: "1. Introduction – What Is Docker and Why Do We Use It?",

      explanation:
        "Docker is a containerization platform used to package and run applications in isolated environments called containers.\n\nImagine a developer creates a Java application on a laptop. The application works correctly on that laptop, but when it is deployed to a production Linux server, it fails because the server has a different Java version, missing libraries or different configuration.\n\nThis is a common problem in software development. Docker helps reduce these environment differences by packaging the application and its required dependencies into an image.\n\nA Docker image is a packaged template. A container is a running instance created from that image.\n\nImportant Docker terms:\n\nDockerfile: Contains instructions to build an image.\nDocker Image: Contains application files, dependencies and runtime requirements.\nDocker Container: An isolated running instance of an image.\nDocker Registry: Stores and distributes images.\nDocker Volume: Stores persistent data outside the container writable layer.\nDocker Network: Allows containers and external services to communicate.\nDocker Engine: Provides the functionality to build and manage Docker objects.\n\nReal-time production example:\nAn e-commerce company has a frontend application, backend API and MySQL database. The DevOps engineer packages the frontend and backend into Docker images. The database may run as a managed database service or in a separate container for suitable environments.\n\nThe team can deploy the same approved application image to testing and production while providing different environment-specific configuration.\n\nImportant: Docker does not automatically make an application secure, highly available or production-ready. Engineers must also configure networking, storage, secrets, monitoring, resource limits and deployment strategy.",

      steps: [
        "Understand the application runtime and dependencies.",
        "Create a Dockerfile for the application.",
        "Build an image using docker build.",
        "Run a container using docker run.",
        "Configure environment variables, ports, networks and volumes.",
        "Monitor application health and container resource usage.",
        "Investigate failures using logs and diagnostic commands."
      ],

      commands:
        "docker --version\n" +
        "docker version\n" +
        "docker info\n" +
        "docker images\n" +
        "docker ps -a",

      problems: [
        {
          issue: "Docker command is not recognized.",
          solution:
            "Install Docker CLI and the appropriate Docker Engine or Docker Desktop environment. Verify that the executable is available in the system PATH."
        },
        {
          issue: "Docker is installed but the daemon is not responding.",
          solution:
            "Check whether Docker Engine or Docker Desktop is running. On Linux, use systemctl status docker and start the service if required."
        }
      ]
    },

    {
      heading: "2. Docker Architecture – Internal Components and How They Communicate",

      explanation:
        "Docker follows a client-server architecture. Understanding this architecture helps engineers identify whether a problem belongs to the CLI, daemon, image, runtime, container, network or application.\n\nDocker Client:\nThe Docker CLI is the tool used by engineers to execute commands such as docker build, docker pull and docker run. It sends requests to the Docker API.\n\nDocker Daemon:\nThe dockerd process manages images, containers, networks and volumes. It receives API requests and coordinates Docker operations.\n\nDocker API:\nProvides communication between the Docker client and daemon.\n\ncontainerd:\nA container runtime component responsible for container lifecycle management. Docker Engine commonly uses containerd as part of its runtime architecture.\n\nrunc:\nA low-level OCI runtime commonly used to create and run containers.\n\nImage:\nAn image contains filesystem layers and metadata required to create a container.\n\nContainer:\nA container is an isolated process environment created from an image. It has a writable layer and runtime configuration.\n\nNamespaces:\nLinux namespaces provide isolation for process IDs, networking, mounts, users and other resources.\n\nControl Groups:\nLinux cgroups help control and monitor resource consumption such as CPU and memory.\n\nDocker Network:\nProvides connectivity between containers and other network endpoints.\n\nDocker Volume:\nProvides persistent storage independent of a container's writable layer.\n\nHow the components work together:\nWhen an engineer runs docker run nginx, the CLI sends a request to dockerd. The daemon checks whether the image is available locally. If it is missing, Docker pulls it from a registry. Runtime components prepare the container filesystem, networking and process configuration. The nginx process starts inside the container.\n\nIf the nginx process exits, the container stops. A configured restart policy may restart it according to its rules.",

      steps: [
        "Run docker version to inspect client and server versions.",
        "Run docker info to inspect the Docker Engine.",
        "Use docker ps to inspect running containers.",
        "Use docker inspect to examine container configuration.",
        "Use docker network ls to inspect Docker networks.",
        "Use docker volume ls to inspect persistent volumes.",
        "Use docker image inspect to inspect image metadata."
      ],

      commands:
        "docker version\n" +
        "docker info\n" +
        "docker ps -a\n" +
        "docker inspect <container_name>\n" +
        "docker network ls\n" +
        "docker volume ls\n" +
        "docker image inspect <image_name>",

      problems: [
        {
          issue: "Docker CLI cannot communicate with the daemon.",
          solution:
            "Check the daemon status, Docker context, configured endpoint and permissions. On Linux, verify the Docker service. On Docker Desktop, verify that the correct engine is running."
        },
        {
          issue: "Container cannot access a required file or resource.",
          solution:
            "Inspect mount configuration, file permissions, namespaces and resource restrictions. Confirm that the container process has the required access."
        }
      ]
    },

    {
      heading: "3. How Docker Works – Internal Working from Image Build to Container Startup",

      explanation:
        "A DevOps engineer should understand what Docker does internally when an application is packaged and started.\n\nStep 1 – Developer writes code:\nThe developer creates a Java, Python, Node.js or another application and stores the source code in Git.\n\nStep 2 – Dockerfile creation:\nThe Dockerfile describes the base image, working directory, dependency installation, application files and startup command.\n\nStep 3 – Image build:\nThe engineer executes docker build. Docker reads the Dockerfile and executes its instructions. BuildKit can reuse previously built layers when the inputs have not changed.\n\nStep 4 – Image layers:\nDocker creates image filesystem layers. These layers help reuse common files and dependencies between images.\n\nStep 5 – Image tagging:\nThe image is assigned a name and version, such as myapp:1.0.\n\nStep 6 – Image registry:\nThe image can be pushed to Docker Hub or a private registry.\n\nStep 7 – Container creation:\nDocker creates a container from the image. It prepares the container's writable layer and runtime configuration.\n\nStep 8 – Network and volume setup:\nDocker connects the container to the selected network and mounts configured volumes.\n\nStep 9 – Main process startup:\nDocker starts the process configured by ENTRYPOINT and CMD.\n\nStep 10 – Application execution:\nThe application starts listening on its configured port and begins handling requests.\n\nStep 11 – Health monitoring:\nA configured Docker HEALTHCHECK can periodically test the container's health. Other production systems may also use separate readiness and liveness checks.\n\nStep 12 – Failure handling:\nIf the main process exits, the container stops. A restart policy may restart it. The engineer must still investigate why the application exited.\n\nImportant concept:\nA running container does not always mean the application is working correctly. For example, the container may be running while the backend cannot connect to its database.",

      steps: [
        "Write application code and dependency files.",
        "Create a Dockerfile.",
        "Build the image.",
        "Tag the image with a meaningful version.",
        "Run the container with the required configuration.",
        "Check the main process and application startup logs.",
        "Test the application endpoint.",
        "Monitor health and resource usage."
      ],

      commands:
        "docker build -t myapp:1.0 .\n" +
        "docker images\n" +
        "docker run -d --name myapp -p 8080:8080 myapp:1.0\n" +
        "docker ps\n" +
        "docker logs myapp\n" +
        "docker inspect myapp\n" +
        "docker stats myapp\n" +
        "curl http://localhost:8080",

      problems: [
        {
          issue: "Container exits immediately after starting.",
          solution:
            "Inspect the ENTRYPOINT and CMD instructions and read the application logs. Confirm that the main application process runs in the foreground and does not exit unexpectedly."
        },
        {
          issue: "Container is running but the application is unavailable.",
          solution:
            "Check the application process, listening port, published port, bind address, firewall, network configuration and logs."
        }
      ]
    },

    {
      heading: "4. Real-Time Workflow – Developer to Production Deployment",

      explanation:
        "This is a typical Docker-based DevOps delivery workflow.\n\nA developer changes application code and pushes it to GitHub. Jenkins or another CI/CD system detects the change and starts a pipeline.\n\nComplete workflow:\n\nDeveloper → Git Repository → CI Pipeline → Build → Automated Testing → Docker Image Build → Image Registry → Deployment Server → Container Creation → Application Startup → Health Check → Traffic Routing → Monitoring.\n\nStage 1 – Developer:\nThe developer writes application code and pushes it to the Git repository.\n\nStage 2 – CI pipeline:\nJenkins checks out the source code and executes build and test commands.\n\nStage 3 – Docker image build:\nThe pipeline builds the Docker image using the Dockerfile. It assigns a version tag such as shopping-api:1.4.2.\n\nStage 4 – Image registry:\nThe pipeline authenticates to the private registry and pushes the image.\n\nStage 5 – Deployment:\nThe deployment system pulls the approved image and starts a container with the production configuration.\n\nStage 6 – Application startup:\nThe backend starts and attempts to connect to MySQL, Redis and other required services.\n\nStage 7 – Health check:\nThe team verifies that the application is healthy and ready to receive requests. Docker HEALTHCHECK and load-balancer health checks are separate mechanisms.\n\nStage 8 – Traffic routing:\nThe reverse proxy or load balancer routes requests to healthy application instances.\n\nStage 9 – Monitoring:\nThe team monitors logs, error rates, response times, CPU, memory and disk usage.\n\nStage 10 – Failure handling:\nIf the new version fails, the engineer checks the evidence, fixes the issue or rolls back to the previous known-good image.\n\nImportant responsibility separation:\nDocker builds and runs containers. Jenkins automates build and deployment workflows. Kubernetes or another orchestrator manages scheduling, scaling and recovery across production infrastructure.",

      steps: [
        "Developer pushes code to Git.",
        "CI pipeline checks out the source.",
        "Build and automated tests execute.",
        "Docker image is created.",
        "Image is scanned and approved according to company policy.",
        "Image is pushed to a registry.",
        "Deployment system pulls the approved image.",
        "Container starts with environment-specific settings.",
        "Health checks and application tests execute.",
        "Traffic is routed to healthy instances.",
        "Monitoring detects application or infrastructure problems.",
        "Failed releases are rolled back when required."
      ],

      commands:
        "git checkout main\n" +
        "docker build -t shopping-api:1.4.2 .\n" +
        "docker login <registry>\n" +
        "docker tag shopping-api:1.4.2 <registry>/shopping-api:1.4.2\n" +
        "docker push <registry>/shopping-api:1.4.2\n" +
        "docker pull <registry>/shopping-api:1.4.2\n" +
        "docker run -d --name shopping-api -p 8080:8080 <registry>/shopping-api:1.4.2",

      problems: [
        {
          issue: "CI pipeline builds the application but Docker image creation fails.",
          solution:
            "Inspect the Dockerfile, build context, dependency installation, base image availability and build logs. Fix the failing build instruction and rerun the pipeline."
        },
        {
          issue: "Deployment succeeds but users receive application errors.",
          solution:
            "Check application logs, environment variables, database connectivity, health checks and reverse-proxy routing. Compare the new release with the previous working version."
        },
        {
          issue: "Production deploys an unexpected image version.",
          solution:
            "Inspect the deployment image reference and tag. Use immutable version tags or image digests rather than relying only on latest."
        }
      ]
    },

    {
      heading: "5. Production Scenarios – Practical Incidents Faced by Docker Engineers",

      explanation:
        "Production troubleshooting means understanding the business impact, collecting evidence, identifying the failure layer, fixing the root cause and verifying recovery.\n\nScenario 1 – Container repeatedly restarts:\nA new backend release is deployed. The application starts and attempts to connect to MySQL. The database hostname is incorrect. The application exits after connection failure. A restart policy restarts the container. Users experience API failures.\n\nEngineer investigation:\nThe engineer checks docker ps -a and observes that the container keeps exiting. The engineer reads docker logs and finds a database connection error. The engineer checks environment variables and network configuration. The wrong database hostname is identified and corrected.\n\nScenario 2 – Application works inside the container but not from the browser:\nThe application listens on port 8080 inside the container. The engineer publishes the wrong host port, or the application listens only on 127.0.0.1 inside the container. The engineer checks port mapping and application bind address.\n\nScenario 3 – Uploaded files disappear after deployment:\nThe application saves uploaded documents inside the container filesystem. During deployment, the old container is removed and a new container is created. The files disappear because they were stored in the container writable layer. The engineer migrates uploads to persistent storage.\n\nScenario 4 – Application becomes slow during peak traffic:\nThe container uses more memory as traffic increases. It reaches its configured memory limit and may be killed. The engineer checks docker stats, application metrics and host memory. The team investigates memory leaks and resource requirements.\n\nScenario 5 – Backend cannot connect to database container:\nThe backend uses localhost as its database hostname. Inside a container, localhost points to that same container, not another container. The engineer places both services on a shared Docker network and uses the database service name.\n\nScenario 6 – Registry image pull fails:\nA deployment cannot pull the image because the image tag does not exist or registry credentials are incorrect. The engineer checks the image name, tag, authentication, permissions and network access.\n\nScenario 7 – Disk space is exhausted:\nApplication logs and temporary files grow continuously. The Docker host runs out of disk space. The engineer checks Docker storage usage and log configuration, then implements suitable log rotation and storage cleanup.\n\nScenario 8 – Application becomes unhealthy:\nThe container is running, but its configured health check fails because the application endpoint is unavailable. The engineer inspects health-check output and application logs instead of assuming the container itself has stopped.",

      steps: [
        "Identify the affected service and business impact.",
        "Check container status and recent deployment history.",
        "Collect logs, resource usage and runtime configuration.",
        "Identify whether the failure is in the application, network, storage, image or host.",
        "Compare the failing deployment with a known-good deployment.",
        "Find the root cause using evidence.",
        "Apply the smallest safe fix.",
        "Verify service recovery.",
        "Monitor the service after recovery.",
        "Document the incident and preventive action."
      ],

      commands:
        "docker ps -a\n" +
        "docker logs --tail 200 <container_name>\n" +
        "docker inspect <container_name>\n" +
        "docker stats\n" +
        "docker port <container_name>\n" +
        "docker events --since 30m\n" +
        "docker system df",

      problems: [
        {
          issue: "Container runs but production users cannot access the service.",
          solution:
            "Trace the request path from client to load balancer, host port, Docker network and application process. Check each connection and identify where requests fail."
        },
        {
          issue: "Application data disappears after a container is recreated.",
          solution:
            "Move persistent data to Docker volumes or suitable external storage. Back up existing data and test restoration before changing production storage."
        },
        {
          issue: "New release repeatedly fails.",
          solution:
            "Compare the new image and configuration with the previous successful release. Restore service through rollback if necessary and investigate the new release separately."
        }
      ]
    },

    {
      heading: "6. Error Identification – Common Docker Errors and Their Meaning",

      explanation:
        "An engineer should identify the stage where an error occurred. Docker build errors, image pull errors, container startup errors and application runtime errors have different causes.\n\nCommon errors:\n\n1. command not found: Docker CLI is missing or unavailable in PATH.\n\n2. Cannot connect to the Docker daemon: The CLI cannot reach the configured Docker daemon endpoint.\n\n3. pull access denied: The image may not exist, the tag may be wrong or the registry credentials may be invalid.\n\n4. no space left on device: The relevant filesystem has insufficient free storage.\n\n5. port is already allocated: Another process or container is already using the requested host port.\n\n6. permission denied: The process cannot access a required file, directory, socket or resource.\n\n7. exec format error: The executable format or image architecture may be incompatible with the runtime environment.\n\n8. connection refused: The destination did not accept the connection at the requested address and port.\n\n9. OOMKilled: The container was killed due to memory exhaustion or a memory limit. Verify actual memory pressure before deciding the cause.\n\n10. unhealthy: A configured Docker health check has failed. The container may still be running.\n\n11. Exit code 1: The main process exited with a general failure status. Inspect application logs.\n\n12. Exit code 137: The process received SIGKILL. Memory pressure is one possible cause, but not the only possible cause.\n\n13. Exit code 126: The command could not be executed.\n\n14. Exit code 127: The requested command could not be found.\n\n15. Docker build failed: A Dockerfile instruction, dependency download, build context or another build step failed.\n\n16. ImagePullBackOff: This is commonly seen in Kubernetes when repeated image pulls fail. Investigate image reference and registry access.",

      steps: [
        "Capture the exact error message.",
        "Identify whether the error occurred during build, pull, container creation or runtime.",
        "Check container status and exit code.",
        "Read recent application and Docker logs.",
        "Inspect configuration and image details.",
        "Test the suspected dependency or network connection.",
        "Fix the actual cause and repeat the failed operation."
      ],

      commands:
        "docker ps -a\n" +
        "docker inspect <container_name>\n" +
        "docker logs <container_name>\n" +
        "docker image inspect <image_name>\n" +
        "docker system df\n" +
        "docker port <container_name>\n" +
        "docker events --since 15m",

      problems: [
        {
          issue: "Port is already allocated.",
          solution:
            "Identify the process or container using the host port. Stop or reconfigure the conflicting service, or publish the container on a different available host port."
        },
        {
          issue: "No space left on device.",
          solution:
            "Inspect host filesystem capacity, Docker image and container storage, build cache and log growth. Remove only confirmed-unused resources after checking production dependencies and backups."
        },
        {
          issue: "Image pull access denied.",
          solution:
            "Verify the registry hostname, repository name, image tag, authentication and account permissions. Confirm that the image exists."
        }
      ]
    },

    {
      heading: "7. Logs Analysis – Where Docker Logs Are Stored and How Engineers Read Them",

      explanation:
        "Logs are one of the most important sources of evidence during production troubleshooting.\n\nDocker container logs usually capture the container process standard output (stdout) and standard error (stderr), depending on the configured logging driver.\n\nWhen an application starts, it may print messages such as:\n\nApplication starting...\nLoading configuration...\nConnecting to MySQL...\nDatabase connection failed: Unknown host mysql-db\nApplication startup failed.\n\nAn engineer uses these messages to identify the actual failure.\n\nImportant commands:\n\ndocker logs: Reads container logs.\n--tail: Displays the last specified number of lines.\n-f: Follows new log entries.\n--since: Shows logs from a specified time.\n--timestamps: Adds timestamps.\n\nDocker logging drivers determine how container logs are handled. The default json-file driver commonly stores log data in Docker-managed files on Linux. The exact location depends on the Docker data root and driver configuration. Engineers should use docker logs rather than manually editing Docker-managed log files.\n\nOn Linux, Docker daemon logs can commonly be inspected through systemd journal using journalctl -u docker.\n\nOn Docker Desktop, Docker Engine runs in its managed environment, so host-level log locations differ from a normal Linux Docker Engine installation.\n\nProduction logging example:\nA backend container receives a customer checkout request. The application returns HTTP 500. The engineer checks logs around the exact incident time and finds a database connection timeout. The engineer compares database health, network connectivity and application connection settings.\n\nImportant:\nDo not print passwords, access tokens, database secrets or personal data into application logs.",

      steps: [
        "Identify the affected container.",
        "Check the incident time and recent deployment time.",
        "Read the last 100 or 200 log lines.",
        "Follow live logs when reproducing the issue.",
        "Search for ERROR, Exception, timeout and connection failures.",
        "Correlate application logs with infrastructure and database logs.",
        "Identify the first meaningful failure, not just the final shutdown message.",
        "Confirm whether the issue is resolved after applying the fix."
      ],

      commands:
        "docker logs <container_name>\n" +
        "docker logs --tail 100 <container_name>\n" +
        "docker logs -f <container_name>\n" +
        "docker logs --since 30m <container_name>\n" +
        "docker logs --timestamps <container_name>\n" +
        "docker inspect --format '{{.HostConfig.LogConfig.Type}}' <container_name>\n" +
        "journalctl -u docker --since '30 minutes ago'",

      problems: [
        {
          issue: "docker logs shows no useful output.",
          solution:
            "Check whether the application writes logs to stdout and stderr. Inspect its logging configuration and Docker logging driver. If the application writes only to internal files, inspect those files through an approved method."
        },
        {
          issue: "Container logs are growing continuously.",
          solution:
            "Configure appropriate log rotation or use a centralized logging system. Set retention limits and monitor disk consumption."
        },
        {
          issue: "Logs show only connection timeout errors.",
          solution:
            "Check destination service health, DNS resolution, network connectivity, firewall rules, connection limits and application timeout settings."
        }
      ]
    },

    {
      heading: "8. Diagnostic Commands – Practical Commands Used by Docker Engineers",

      explanation:
        "Docker troubleshooting requires commands that inspect different layers. An engineer should not randomly execute every command. First identify the symptom and then select the relevant diagnostic command.\n\nContainer status:\nUse docker ps to inspect running containers and docker ps -a to include stopped containers.\n\nContainer logs:\nUse docker logs to understand startup failures and application errors.\n\nContainer configuration:\nUse docker inspect to inspect image, network, mount, port, environment and state details.\n\nResource usage:\nUse docker stats to inspect current CPU, memory, network and block I/O statistics.\n\nImage inspection:\nUse docker image inspect to inspect image metadata and configuration.\n\nNetwork inspection:\nUse docker network inspect to examine connected containers and network configuration.\n\nVolume inspection:\nUse docker volume inspect to inspect volume details.\n\nPort inspection:\nUse docker port to check published container ports.\n\nProcess inspection:\nUse docker top to inspect processes running inside a container.\n\nEvents:\nUse docker events to inspect recent Docker Engine events.\n\nStorage:\nUse docker system df to inspect Docker disk usage.\n\nPractical troubleshooting example:\nA backend container is restarting. The engineer first checks docker ps -a. Then the engineer reads docker logs. Next, docker inspect reveals the configured environment variables and restart policy. docker network inspect helps confirm whether the backend can reach the database network.\n\nEach command provides a different piece of evidence. The engineer combines the results to identify the root cause.",

      steps: [
        "Check the current container status.",
        "Inspect recent logs.",
        "Inspect the container configuration.",
        "Check CPU and memory usage.",
        "Inspect the relevant Docker network.",
        "Inspect volume mounts and port mappings.",
        "Compare the evidence with the expected configuration.",
        "Record the findings before making production changes."
      ],

      commands:
        "docker ps -a\n" +
        "docker logs --tail 200 <container>\n" +
        "docker inspect <container>\n" +
        "docker stats\n" +
        "docker top <container>\n" +
        "docker port <container>\n" +
        "docker network inspect <network>\n" +
        "docker volume inspect <volume>\n" +
        "docker events --since 30m\n" +
        "docker system df",

      problems: [
        {
          issue: "Engineer cannot identify which diagnostic command to use.",
          solution:
            "Start with the symptom. For a stopped container use docker ps -a and docker logs. For connectivity use network inspection and connection tests. For resource issues use docker stats and host monitoring."
        },
        {
          issue: "Production troubleshooting changes the environment before evidence is collected.",
          solution:
            "Collect logs, status, configuration and metrics first. Avoid deleting containers, volumes or images until their purpose and data dependencies are understood."
        }
      ]
    },

    {
      heading: "9. Root Cause Analysis – Why Docker Problems Actually Happen",

      explanation:
        "Root Cause Analysis (RCA) is the process of finding the actual reason behind an incident rather than only fixing its visible symptom.\n\nExample:\nSymptom: Backend container repeatedly restarts.\n\nFirst observation: docker ps -a shows repeated container exits.\n\nSecond observation: docker logs shows a database connection failure.\n\nThird observation: docker inspect shows the DB_HOST environment variable is set to localhost.\n\nFourth observation: The database is running in a separate container.\n\nActual root cause: The backend uses localhost to reach another container. In the backend container, localhost points to the backend container itself.\n\nCorrective action: Put both containers on the same user-defined network and use the database container or service name as the hostname.\n\nOther common root causes:\n\n1. Wrong environment variables.\n2. Incorrect image or application version.\n3. Missing dependency or startup command.\n4. Incorrect port mapping.\n5. Wrong bind address.\n6. DNS resolution failure.\n7. Network isolation.\n8. Insufficient memory or CPU.\n9. Missing volume mount.\n10. File permission problems.\n11. Registry authentication failure.\n12. Host disk exhaustion.\n13. Invalid health-check configuration.\n14. Application process exiting unexpectedly.\n\nProduction RCA should also include impact, timeline, detection method, contributing factors, corrective actions and prevention.",

      steps: [
        "Describe the symptom and business impact.",
        "Create a timeline of the incident.",
        "Collect logs, metrics and configuration.",
        "Identify the first failure in the request or startup flow.",
        "Test each suspected cause.",
        "Use evidence to identify the root cause.",
        "Apply the corrective action.",
        "Verify the application and monitor for recurrence.",
        "Document prevention and follow-up actions."
      ],

      commands:
        "docker ps -a\n" +
        "docker logs --timestamps <container>\n" +
        "docker inspect <container>\n" +
        "docker stats\n" +
        "docker network inspect <network>\n" +
        "docker events --since 1h",

      problems: [
        {
          issue: "The team fixes the symptom but the same incident happens again.",
          solution:
            "Perform root cause analysis. Identify why the original failure occurred and implement a preventive change such as configuration validation, monitoring, resource planning or automated testing."
        },
        {
          issue: "The root cause is unclear because multiple services failed together.",
          solution:
            "Build a timeline and correlate application, database, network, host and deployment events. Identify the earliest failure and distinguish cause from secondary symptoms."
        }
      ]
    },

    {
      heading: "10. Step-by-Step Fixes – Container Repeatedly Restarting",

      explanation:
        "This is a common real-time Docker troubleshooting incident.\n\nProduction situation:\nA company deploys a new backend version. The container starts but stops after a few seconds. Docker uses a restart policy and starts it again. The application is unavailable.\n\nStep 1 – Check container status:\nUse docker ps -a. Look at STATUS and restart behavior.\n\nStep 2 – Read application logs:\nUse docker logs. Look for the first meaningful error before the process exits.\n\nStep 3 – Inspect exit information:\nUse docker inspect and examine State.ExitCode, State.Error, State.OOMKilled and State.Health where available.\n\nStep 4 – Check environment configuration:\nVerify database hostname, username, port and required variables. Do not expose passwords while collecting evidence.\n\nStep 5 – Check network:\nIf the database is another container, verify that both services share a suitable network and that the backend uses the database service name.\n\nStep 6 – Check database availability:\nVerify that the database is ready to accept connections. A running database container may still be initializing.\n\nStep 7 – Fix the actual cause:\nCorrect the hostname, missing configuration or dependency problem.\n\nStep 8 – Recreate or restart safely:\nApply the corrected configuration using the team's deployment process. Changing an environment variable on the host does not automatically change the environment of an already-created container.\n\nStep 9 – Verify:\nCheck logs, health, API response and database connectivity.\n\nStep 10 – Monitor:\nWatch the application after deployment and confirm that restart counts and errors remain stable.",

      commands:
        "docker ps -a\n" +
        "docker logs --tail 200 backend\n" +
        "docker inspect backend\n" +
        "docker inspect --format '{{.State.ExitCode}} {{.State.OOMKilled}}' backend\n" +
        "docker network ls\n" +
        "docker network inspect app-network\n" +
        "docker stats backend",

      steps: [
        "Check container status and restart behavior.",
        "Read logs from the latest failed startup.",
        "Inspect exit code and OOMKilled state.",
        "Verify required environment variables.",
        "Check database DNS and network connectivity.",
        "Verify dependency readiness.",
        "Correct the root cause.",
        "Deploy using the corrected configuration.",
        "Verify application functionality.",
        "Monitor logs and resource usage."
      ],

      problems: [
        {
          issue: "Container restarts because database hostname is wrong.",
          solution:
            "Use the correct database service name on a shared Docker network instead of localhost when connecting to another container."
        },
        {
          issue: "Container restarts because the application exits after startup.",
          solution:
            "Inspect the application's startup logs and process configuration. Ensure that the intended service runs as the foreground main process."
        },
        {
          issue: "Container is killed due to memory pressure.",
          solution:
            "Check OOMKilled state, docker stats and host memory. Investigate memory usage and configure an appropriate resource limit after capacity analysis."
        }
      ]
    },

    {
      heading: "11. Before vs After – Dockerfile Configuration",

      explanation:
        "A poorly written Dockerfile can create large images, unreliable deployments, slow builds and security problems.\n\nExample problem:\nThe application uses a generic base image, copies unnecessary files, installs dependencies without using a lock file and runs as root. This increases image size and can create inconsistent builds.\n\nThe improved Dockerfile uses a specific base image, dependency lock file, multi-stage build and non-root runtime user.\n\nBefore configuration:\n\nThe application build environment and runtime environment are mixed. Unnecessary development dependencies may be included in the final image.\n\nAfter configuration:\n\nA multi-stage build separates compilation from runtime. The final image contains only the runtime requirements and compiled application files.\n\nImportant:\nThe exact Dockerfile depends on the application framework, runtime and build process. The following example is for a Node.js application.",

      config:
        "BEFORE – Basic Dockerfile:\n\n" +
        "FROM node:latest\n" +
        "WORKDIR /app\n" +
        "COPY . .\n" +
        "RUN npm install\n" +
        "EXPOSE 3000\n" +
        "CMD [\"npm\", \"start\"]\n\n" +
        "AFTER – Multi-stage Dockerfile:\n\n" +
        "FROM node:22-alpine AS build\n" +
        "WORKDIR /app\n" +
        "COPY package*.json ./\n" +
        "RUN npm ci\n" +
        "COPY . .\n" +
        "RUN npm run build\n\n" +
        "FROM node:22-alpine AS runtime\n" +
        "WORKDIR /app\n" +
        "ENV NODE_ENV=production\n" +
        "COPY --from=build /app/package*.json ./\n" +
        "RUN npm ci --omit=dev && addgroup -S app && adduser -S app -G app\n" +
        "COPY --from=build /app/dist ./dist\n" +
        "USER app\n" +
        "EXPOSE 3000\n" +
        "CMD [\"node\", \"dist/server.js\"]\n\n" +
        "Example .dockerignore:\n\n" +
        "node_modules\n" +
        ".git\n" +
        ".env\n" +
        "npm-debug.log\n" +
        "coverage\n",

      steps: [
        "Identify the application runtime and build command.",
        "Use an appropriate and supported base image.",
        "Use dependency lock files for reproducible installation.",
        "Separate build and runtime stages when appropriate.",
        "Avoid copying secrets and unnecessary files.",
        "Use a non-root runtime user where possible.",
        "Build the image and inspect its size.",
        "Test the image before deployment."
      ],

      commands:
        "docker build -t my-node-app:1.0 .\n" +
        "docker image inspect my-node-app:1.0\n" +
        "docker history my-node-app:1.0\n" +
        "docker run --rm -p 3000:3000 my-node-app:1.0",

      problems: [
        {
          issue: "Docker image is unnecessarily large.",
          solution:
            "Use a suitable base image, multi-stage builds, .dockerignore and production-only dependencies. Do not remove files that are required at runtime."
        },
        {
          issue: "Build fails because package dependencies are inconsistent.",
          solution:
            "Commit the dependency lock file and use npm ci for a reproducible npm installation."
        }
      ]
    },

    {
      heading: "12. Before vs After – Container Networking Configuration",

      explanation:
        "Container networking is a frequent source of production incidents.\n\nProduction example:\nA backend container must connect to a MySQL container. The backend configuration uses localhost as the database host.\n\nWhy it fails:\nInside a container, localhost refers to the same container. It does not automatically refer to another container.\n\nCorrect approach:\nCreate a user-defined Docker network and attach both containers to that network. The backend can connect using the database container or service name through Docker network DNS.\n\nAlso understand the difference between container ports and host ports.\n\nExample:\n-p 8080:3000 means host port 8080 forwards to container port 3000.\n\nA published port does not mean the application is listening on that port inside the container. The application must listen on the correct container port and usually bind to 0.0.0.0 to accept external container traffic.",

      config:
        "BEFORE – Incorrect backend configuration:\n\n" +
        "DB_HOST=localhost\n" +
        "DB_PORT=3306\n\n" +
        "AFTER – Correct configuration for a shared Docker network:\n\n" +
        "DB_HOST=mysql-db\n" +
        "DB_PORT=3306\n\n" +
        "Create network:\n" +
        "docker network create app-network\n\n" +
        "Start database:\n" +
        "docker run -d --name mysql-db --network app-network -e MYSQL_ROOT_PASSWORD=change-me mysql:8\n\n" +
        "Start backend:\n" +
        "docker run -d --name backend --network app-network -p 8080:8080 -e DB_HOST=mysql-db -e DB_PORT=3306 backend:1.0\n\n" +
        "Production note:\n" +
        "Do not use example passwords in production. Use a secret-management solution and configure database readiness, authentication and persistent storage.",

      steps: [
        "Identify the source and destination containers.",
        "Inspect the existing Docker networks.",
        "Create or select a suitable user-defined network.",
        "Attach the application and dependency containers.",
        "Use the dependency's service or container name.",
        "Check DNS resolution and TCP connectivity.",
        "Verify application connection logs.",
        "Test the complete application request."
      ],

      commands:
        "docker network create app-network\n" +
        "docker network ls\n" +
        "docker network inspect app-network\n" +
        "docker inspect backend\n" +
        "docker exec backend getent hosts mysql-db\n" +
        "docker port backend",

      problems: [
        {
          issue: "Backend cannot connect to another container using localhost.",
          solution:
            "Use a shared user-defined network and connect using the other container's network name."
        },
        {
          issue: "Container is running but its service is inaccessible from the host.",
          solution:
            "Check the published host port, container listening port, application bind address and host firewall."
        },
        {
          issue: "Container name cannot be resolved.",
          solution:
            "Verify that both containers are attached to the same user-defined network and that the requested network alias or service name is correct."
        }
      ]
    },

    {
      heading: "13. Before vs After – Persistent Storage and Volume Configuration",

      explanation:
        "Containers are designed to be replaceable. Data stored only in the container writable layer may be lost when the container is removed.\n\nProduction example:\nAn application stores customer-uploaded documents inside /app/uploads. During a deployment, the old container is removed and a new one is created. The uploaded documents are missing.\n\nRoot cause:\nThe application stored persistent business data inside the container filesystem rather than a persistent storage location.\n\nSolution:\nUse a Docker volume or external storage service. Volumes can remain available even when containers are replaced.\n\nA named volume is managed by Docker. A bind mount maps a host directory into the container. Both require correct backup, permissions and operational management.",

      config:
        "BEFORE – Data stored only in the container:\n\n" +
        "docker run -d --name uploads-app uploads-app:1.0\n\n" +
        "AFTER – Named volume:\n\n" +
        "docker volume create uploads-data\n" +
        "docker run -d --name uploads-app -v uploads-data:/app/uploads uploads-app:1.0\n\n" +
        "Inspect volume:\n" +
        "docker volume inspect uploads-data\n\n" +
        "Alternative bind mount on Linux:\n\n" +
        "docker run -d --name uploads-app -v /srv/uploads:/app/uploads uploads-app:1.0\n\n" +
        "Production note:\n" +
        "Verify ownership, permissions, backup, recovery and storage capacity. A Docker volume is not a substitute for a tested backup strategy.",

      steps: [
        "Identify which application paths contain persistent data.",
        "Check whether those paths are currently mounted.",
        "Create a named volume or choose suitable external storage.",
        "Mount storage at the correct application path.",
        "Verify container user permissions.",
        "Migrate existing data safely.",
        "Test application reads and writes.",
        "Test data persistence after container recreation.",
        "Configure backup and restore procedures."
      ],

      commands:
        "docker volume ls\n" +
        "docker volume create uploads-data\n" +
        "docker volume inspect uploads-data\n" +
        "docker inspect uploads-app\n" +
        "docker exec uploads-app ls -la /app/uploads",

      problems: [
        {
          issue: "Uploaded files disappear after container recreation.",
          solution:
            "Store uploads in a named volume, bind mount or external object storage. Migrate existing files and test persistence."
        },
        {
          issue: "Application receives permission denied on a mounted volume.",
          solution:
            "Check the host directory and container user IDs, ownership and permissions. Apply the minimum required permissions."
        },
        {
          issue: "Volume fills up and application writes fail.",
          solution:
            "Inspect filesystem capacity, identify growing files, expand or migrate storage and configure monitoring and retention."
        }
      ]
    },

    {
      heading: "14. Health Checks – How to Detect an Unhealthy Application",

      explanation:
        "A container being in running state does not guarantee that the application is ready to serve users.\n\nExample:\nA backend container starts successfully, but the application takes 40 seconds to initialize. During initialization, the API endpoint is not ready. A monitoring system or load balancer may send traffic too early.\n\nA Docker HEALTHCHECK can run a command inside the container to determine whether the application responds correctly.\n\nDocker health states commonly include starting, healthy and unhealthy.\n\nImportant difference:\nA Docker health check reports health status. It does not automatically restart an unhealthy container just because the health status is unhealthy. Restart policies generally respond to container process termination, not simply to an unhealthy status.\n\nIn production, load balancers and orchestrators may have their own readiness and liveness checks. They should be configured based on application behavior.",

      config:
        "Dockerfile example:\n\n" +
        "FROM nginx:alpine\n" +
        "HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1\n\n" +
        "Build and run:\n\n" +
        "docker build -t healthy-nginx:1.0 .\n" +
        "docker run -d --name healthy-nginx -p 8080:80 healthy-nginx:1.0\n\n" +
        "Inspect health:\n\n" +
        "docker inspect --format '{{json .State.Health}}' healthy-nginx",

      steps: [
        "Identify an endpoint that accurately represents application health.",
        "Ensure the health-check tool exists inside the image.",
        "Configure suitable interval, timeout and retry values.",
        "Allow sufficient startup time.",
        "Inspect health-check results.",
        "Check application logs when health checks fail.",
        "Verify that traffic is routed only to ready instances where the platform supports it."
      ],

      commands:
        "docker ps\n" +
        "docker inspect --format '{{.State.Health.Status}}' <container>\n" +
        "docker inspect --format '{{json .State.Health.Log}}' <container>\n" +
        "docker logs <container>",

      problems: [
        {
          issue: "Container is running but health status is unhealthy.",
          solution:
            "Inspect the health-check command output and application logs. Verify the endpoint, port, timeout and required startup time."
        },
        {
          issue: "Health check fails because its command is missing.",
          solution:
            "Install an appropriate health-check utility in the image or use a suitable command already available in the runtime image."
        }
      ]
    },

    {
      heading: "15. Docker Resource Troubleshooting – CPU and Memory Problems",

      explanation:
        "Containers use host resources such as CPU, memory, disk and network. In production, incorrect resource planning can cause slow responses and application failures.\n\nCPU issue:\nA container may consume high CPU because of heavy requests, inefficient code, excessive threads or background processing.\n\nMemory issue:\nA container may consume increasing memory due to large workloads, caching or memory leaks. If it reaches its memory limit, the Linux kernel may kill processes.\n\nDisk issue:\nImages, writable layers, volumes and logs consume storage. A full filesystem may prevent application writes and Docker operations.\n\nProduction example:\nDuring a sale event, the e-commerce API receives five times the normal traffic. Memory consumption increases and the container is killed. The engineer checks docker stats and inspect output, then compares application memory metrics and host memory.\n\nThe correct fix is not always to increase the memory limit. The team should first determine whether the workload increased, a leak exists or the application has inefficient memory usage.",

      steps: [
        "Check current CPU and memory usage.",
        "Inspect container resource limits.",
        "Check host memory and filesystem capacity.",
        "Compare resource usage with application traffic.",
        "Review application metrics and logs.",
        "Identify leaks or unusually expensive operations.",
        "Set resource limits based on capacity testing.",
        "Monitor after the change."
      ],

      commands:
        "docker stats\n" +
        "docker stats <container_name>\n" +
        "docker inspect <container_name>\n" +
        "docker system df\n" +
        "docker info",

      config:
        "Example resource limits:\n\n" +
        "docker run -d --name api-service --memory=512m --cpus=1.5 api-service:1.0\n\n" +
        "Compose example:\n\n" +
        "services:\n" +
        "  api:\n" +
        "    image: api-service:1.0\n" +
        "    mem_limit: 512m\n" +
        "    cpus: 1.5\n\n" +
        "Production note:\n" +
        "Validate the resource settings against actual workload requirements and the deployment platform's supported configuration.",

      problems: [
        {
          issue: "Container is OOMKilled.",
          solution:
            "Check the container's OOMKilled state, memory limit, host memory and application metrics. Investigate memory leaks and workload changes before adjusting limits."
        },
        {
          issue: "Application becomes slow due to high CPU usage.",
          solution:
            "Inspect docker stats and application profiling data. Identify CPU-intensive code, excessive threads or workload spikes and optimize or scale appropriately."
        },
        {
          issue: "Docker host runs out of disk space.",
          solution:
            "Inspect Docker disk usage and host filesystem capacity. Apply approved cleanup, log rotation and storage retention policies."
        }
      ]
    },

    {
      heading: "16. Docker Image and Registry Troubleshooting",

      explanation:
        "Production teams store application images in a registry and deploy approved versions from that registry.\n\nExample workflow:\nJenkins builds an image named company-api:2.3.1, tags it with the registry path and pushes it. The deployment server pulls the image and starts the container.\n\nCommon failures:\n\nImage does not exist: The repository or tag is incorrect.\n\nAuthentication failure: The deployment environment does not have valid registry credentials.\n\nPermission denied: The registry account cannot pull the repository.\n\nArchitecture mismatch: The image platform does not match the runtime platform.\n\nOld image deployed: The pipeline uses an incorrect or mutable tag.\n\nEngineers should use versioned tags or immutable image digests, validate registry access and manage credentials securely.",

      steps: [
        "Check the exact image repository and tag.",
        "Verify registry DNS and network access.",
        "Verify authentication and repository permissions.",
        "Pull the image manually in a controlled environment.",
        "Inspect image architecture and metadata.",
        "Compare the deployed image digest with the approved release.",
        "Redeploy using the correct image reference."
      ],

      commands:
        "docker images\n" +
        "docker image inspect <image>\n" +
        "docker pull <registry>/<repository>:<tag>\n" +
        "docker login <registry>\n" +
        "docker image ls --digests\n" +
        "docker history <image>",

      problems: [
        {
          issue: "Docker cannot pull the image.",
          solution:
            "Verify repository name, tag, registry endpoint, network connectivity, authentication and permissions."
        },
        {
          issue: "Production deploys an old image.",
          solution:
            "Use unique release tags or digests. Verify the image reference in deployment configuration and pipeline output."
        },
        {
          issue: "Image fails on the target machine due to architecture mismatch.",
          solution:
            "Inspect image and host platform. Build or publish an image for the required architecture using an appropriate multi-platform build process."
        }
      ]
    },

    {
      heading: "17. Docker Compose Troubleshooting – Multi-Container Applications",

      explanation:
        "Docker Compose is used to define and manage multi-container applications through a YAML configuration file.\n\nA typical development or suitable deployment setup may include a frontend, backend and database.\n\nInstead of manually executing many docker run commands, engineers define services, networks, volumes, environment variables and dependencies in compose.yaml.\n\nExample production-like workflow:\nThe frontend sends API requests to the backend. The backend connects to MySQL. Both containers communicate through a Compose network. The database uses a named volume for persistent data.\n\nImportant:\nThe depends_on option controls service startup ordering, but it does not by itself guarantee that a database is ready to accept connections. Use suitable health checks and application retry logic.\n\nCompose is useful for defining repeatable environments, but production teams should evaluate their deployment platform, availability, backup, security and scaling requirements.",

      config:
        "compose.yaml:\n\n" +
        "services:\n" +
        "  backend:\n" +
        "    image: company-api:1.0\n" +
        "    ports:\n" +
        "      - \"8080:8080\"\n" +
        "    environment:\n" +
        "      DB_HOST: mysql\n" +
        "      DB_PORT: \"3306\"\n" +
        "    depends_on:\n" +
        "      mysql:\n" +
        "        condition: service_healthy\n\n" +
        "  mysql:\n" +
        "    image: mysql:8\n" +
        "    environment:\n" +
        "      MYSQL_DATABASE: appdb\n" +
        "      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}\n" +
        "    volumes:\n" +
        "      - mysql-data:/var/lib/mysql\n" +
        "    healthcheck:\n" +
        "      test: [\"CMD\", \"mysqladmin\", \"ping\", \"-h\", \"127.0.0.1\"]\n" +
        "      interval: 10s\n" +
        "      timeout: 5s\n" +
        "      retries: 5\n\n" +
        "volumes:\n" +
        "  mysql-data:\n\n" +
        "Production note:\n" +
        "Use a secure secret-management approach. Do not commit .env files containing real passwords to Git.",

      steps: [
        "Validate the Compose YAML configuration.",
        "Check service names, ports, networks and volumes.",
        "Check required environment variables.",
        "Start services using Docker Compose.",
        "Inspect service status and logs.",
        "Verify database readiness.",
        "Test communication between services.",
        "Verify persistent storage and backup configuration."
      ],

      commands:
        "docker compose config\n" +
        "docker compose up -d\n" +
        "docker compose ps\n" +
        "docker compose logs -f\n" +
        "docker compose logs backend\n" +
        "docker compose exec backend sh\n" +
        "docker compose down",

      problems: [
        {
          issue: "Backend starts before the database is ready.",
          solution:
            "Configure a suitable database health check, use the Compose service dependency condition where supported and implement retry logic in the application."
        },
        {
          issue: "Compose service cannot connect to another service.",
          solution:
            "Use the Compose service name as the hostname and verify that both services are attached to the expected network."
        },
        {
          issue: "Database data disappears after Compose restart.",
          solution:
            "Use a named volume and verify that the volume is mounted at the database's actual data directory."
        }
      ]
    },

    {
      heading: "18. Step-by-Step Production Incident – Backend Cannot Connect to MySQL",

      explanation:
        "This is a complete practical incident designed to show how a production engineer investigates a real Docker issue.\n\nBusiness impact:\nCustomers open the shopping website and click Checkout. The frontend sends a request to the backend. The backend cannot connect to MySQL. Checkout requests fail.\n\nWhat the customer sees:\nThe checkout page displays an error or the API returns HTTP 500 or 503 depending on application behavior and the failure path.\n\nInitial investigation:\nThe engineer checks application monitoring and confirms that checkout failures increased after a deployment.\n\nContainer investigation:\nThe engineer checks docker ps and confirms that the backend container is running. Running status alone does not prove application health.\n\nLog investigation:\nThe engineer runs docker logs backend and finds a database connection error.\n\nConfiguration investigation:\nThe engineer inspects the backend configuration and finds DB_HOST=localhost.\n\nNetwork investigation:\nThe database runs in a separate container. The backend and database must share a suitable network.\n\nRoot cause:\nThe backend uses localhost, which points to itself rather than the MySQL container.\n\nFix:\nAttach the backend and database to the same user-defined network and configure DB_HOST=mysql-db.\n\nVerification:\nCheck DNS resolution, database connectivity, backend logs and a real checkout test.\n\nProduction follow-up:\nAdd configuration validation, connection retry behavior, alerting and a documented incident report.",

      config:
        "BEFORE:\n\n" +
        "DB_HOST=localhost\n" +
        "DB_PORT=3306\n\n" +
        "AFTER:\n\n" +
        "DB_HOST=mysql-db\n" +
        "DB_PORT=3306\n\n" +
        "Network setup example:\n\n" +
        "docker network create shopping-network\n" +
        "docker network connect shopping-network mysql-db\n" +
        "docker network connect shopping-network backend\n\n" +
        "Note:\n" +
        "The containers must exist, and their actual names must match the commands. Apply environment-variable changes by recreating the backend container through the deployment configuration.",

      steps: [
        "Confirm checkout failures using application monitoring.",
        "Identify the backend container.",
        "Check backend status and recent logs.",
        "Inspect DB_HOST and DB_PORT configuration securely.",
        "Confirm where the database is running.",
        "Inspect Docker network membership.",
        "Test database hostname resolution from the backend container.",
        "Correct the hostname and network configuration.",
        "Recreate the backend using the approved deployment process.",
        "Test database connectivity and checkout functionality.",
        "Monitor error rates and application health."
      ],

      commands:
        "docker ps -a\n" +
        "docker logs --tail 200 backend\n" +
        "docker inspect backend\n" +
        "docker network inspect shopping-network\n" +
        "docker exec backend getent hosts mysql-db\n" +
        "docker exec backend sh\n" +
        "docker logs -f backend",

      problems: [
        {
          issue: "Backend reports UnknownHostException or hostname resolution failure.",
          solution:
            "Verify the database hostname and shared network membership. Use the correct service or container name."
        },
        {
          issue: "Backend reports Connection refused.",
          solution:
            "Verify that MySQL is running, listening on the expected port and ready to accept connections. Check the network path and database configuration."
        },
        {
          issue: "Backend reports Access denied for user.",
          solution:
            "Verify database username, password, grants and authentication configuration using a secure process. Do not print credentials in logs."
        },
        {
          issue: "Backend reports connection timeout.",
          solution:
            "Investigate network reachability, firewall rules, database load, connection limits and timeout settings."
        }
      ]
    },

    {
      heading: "19. Verification and Prevention – How to Confirm the Fix and Avoid Repeat Incidents",

      explanation:
        "A production fix is not complete when the error message disappears. The engineer must verify the application's actual functionality and confirm that the issue does not return.\n\nVerification process:\n\n1. Container status: Confirm the container is running.\n\n2. Application logs: Confirm that startup errors are gone.\n\n3. Health check: Confirm the configured health check reports healthy.\n\n4. Network: Verify communication with required services.\n\n5. Endpoint: Test the actual application API or web page.\n\n6. Business workflow: Test the affected business operation, such as login, checkout or file upload.\n\n7. Resource usage: Check CPU, memory and disk usage.\n\n8. Monitoring: Watch error rates and restart behavior after deployment.\n\nPrevention:\n\nUse specific image versions rather than latest.\n\nUse multi-stage builds and .dockerignore.\n\nUse persistent volumes for required data.\n\nUse suitable health checks.\n\nUse secret-management tools for credentials.\n\nConfigure log rotation and centralized logging.\n\nMonitor CPU, memory, disk and network.\n\nUse automated tests and image scanning in CI/CD.\n\nDocument deployment and rollback procedures.\n\nTest backup restoration, not just backup creation.\n\nAvoid unnecessary root privileges inside containers.",

      steps: [
        "Confirm the container is running.",
        "Read the latest application logs.",
        "Verify container health status.",
        "Test application and dependency connectivity.",
        "Test the affected business workflow.",
        "Check CPU, memory and disk usage.",
        "Monitor error rates and restart behavior.",
        "Document the root cause and corrective action.",
        "Add preventive tests, alerts or configuration checks.",
        "Review the incident after service recovery."
      ],

      commands:
        "docker ps\n" +
        "docker logs --tail 100 <container>\n" +
        "docker inspect <container>\n" +
        "docker stats\n" +
        "docker port <container>\n" +
        "docker system df\n" +
        "curl -i http://localhost:8080/health",

      problems: [
        {
          issue: "The container is healthy but the business function still fails.",
          solution:
            "Test the actual business workflow and its dependencies. A basic health endpoint may not test database writes, authentication or external API integrations."
        },
        {
          issue: "The same Docker incident returns after a few days.",
          solution:
            "Review the RCA and add preventive controls such as monitoring, resource alerts, deployment checks, configuration validation and automated tests."
        }
      ]
    },

    {
      heading: "20. Docker Interview and Real-Time Production Engineer Knowledge",

      explanation:
        "A Docker engineer should be able to explain both concepts and practical troubleshooting.\n\nImportant interview questions and practical answers:\n\n1. What is Docker?\nDocker is a containerization platform used to package and run applications in isolated environments.\n\n2. What is the difference between an image and a container?\nAn image is a packaged template. A container is an instance created from that image.\n\n3. What is a Dockerfile?\nA Dockerfile contains instructions used to build an image.\n\n4. What is the difference between CMD and ENTRYPOINT?\nENTRYPOINT defines the main executable or command. CMD provides default command arguments or a default command, depending on the ENTRYPOINT configuration.\n\n5. What is a Docker volume?\nA volume is a persistent storage mechanism managed by Docker.\n\n6. Why does a container exit immediately?\nIts main process may have completed or failed. Inspect logs, exit code, ENTRYPOINT and CMD.\n\n7. What is the difference between docker stop and docker kill?\ndocker stop requests graceful termination and later sends SIGKILL if needed. docker kill sends a signal directly, SIGKILL by default.\n\n8. Why is localhost not used to connect to another container?\nBecause localhost inside a container refers to that same container. Use a shared network and service or container name.\n\n9. What is a multi-stage build?\nIt uses multiple build stages so that the final image can contain only the required runtime artifacts.\n\n10. What is Docker Compose?\nIt is a tool for defining and managing multi-container applications.\n\n11. What is a Docker health check?\nIt periodically runs a configured command to report the container's health status.\n\n12. Does an unhealthy Docker container automatically restart?\nNot simply because its health status is unhealthy. Restart policies generally respond to the container process exiting.\n\n13. What is the difference between a bind mount and a named volume?\nA bind mount maps a host path. A named volume is managed by Docker.\n\n14. What is OOMKilled?\nIt indicates a process or container was killed due to memory exhaustion or memory-limit enforcement. Investigate actual resource conditions.\n\n15. How do you troubleshoot a container restarting continuously?\nCheck docker ps -a, docker logs, docker inspect, exit code, resource usage, environment variables, dependencies and network connectivity.\n\n16. How do you troubleshoot a container that is running but inaccessible?\nCheck the application process, listening address, port mapping, network, firewall, reverse proxy and health endpoint.\n\n17. How do you reduce Docker image size?\nUse suitable base images, multi-stage builds, dependency lock files, .dockerignore and production-only dependencies.\n\n18. How do you protect secrets?\nUse a suitable secrets-management mechanism and avoid embedding credentials in Dockerfiles or image layers.\n\n19. What happens when a container is removed?\nThe container's writable layer is removed. Named volumes normally remain unless explicitly removed.\n\n20. What is the difference between Docker and Kubernetes?\nDocker provides container image building and container runtime management. Kubernetes orchestrates containerized workloads across a cluster.\n\nReal-time engineer responsibilities:\n- Build and maintain Docker images.\n- Troubleshoot image build and registry failures.\n- Deploy and inspect containers.\n- Manage networks and persistent storage.\n- Investigate logs and resource problems.\n- Support CI/CD pipelines.\n- Apply security and configuration best practices.\n- Perform production incident analysis.\n- Verify fixes and document preventive actions.\n\nFinal production troubleshooting mindset:\nDo not restart or delete everything immediately. First collect evidence. Understand the request flow. Identify the failing component. Find the root cause. Apply a safe fix. Verify the business workflow. Monitor the service and document the incident.",

      steps: [
        "Practice building images from real application Dockerfiles.",
        "Run frontend, backend and database containers on a shared network.",
        "Practice diagnosing restart loops.",
        "Practice port mapping and DNS troubleshooting.",
        "Practice persistent volume configuration.",
        "Practice resource monitoring and log analysis.",
        "Build a CI/CD pipeline that pushes versioned images.",
        "Practice rollback and production incident documentation."
      ],

      commands:
        "docker build -t practice-app:1.0 .\n" +
        "docker run -d --name practice-app -p 8080:8080 practice-app:1.0\n" +
        "docker ps -a\n" +
        "docker logs practice-app\n" +
        "docker inspect practice-app\n" +
        "docker stats practice-app\n" +
        "docker network ls\n" +
        "docker volume ls\n" +
        "docker system df",

      problems: [
        {
          issue: "An engineer knows Docker commands but cannot troubleshoot a real production incident.",
          solution:
            "Practice complete incidents from symptom to root cause. Understand architecture, logs, networking, storage, resources, deployment workflow and verification rather than memorizing commands alone."
        },
        {
          issue: "The engineer fixes a container but cannot explain why the failure occurred.",
          solution:
            "Document the timeline, evidence, root cause, corrective action and preventive action. Explain how the application and Docker components interacted during the incident."
        }
      ]
    }
  ]
};
