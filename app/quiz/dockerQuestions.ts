export interface DockerQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const dockerQuestions: DockerQuestion[] = [
  {
    question: "1. What is Docker primarily used for?",
    options: [
      "Creating and managing containers",
      "Managing databases only",
      "Developing frontend applications only",
      "Replacing the operating system"
    ],
    answer: 0
  },
  {
    question: "2. What is a Docker container?",
    options: [
      "A physical server",
      "An isolated environment for running an application",
      "A programming language",
      "A database server"
    ],
    answer: 1
  },
  {
    question: "3. What is a Docker image?",
    options: [
      "A running container",
      "A network connection",
      "A read-only template used to create containers",
      "A physical machine"
    ],
    answer: 2
  },
  {
    question: "4. Which command displays the installed Docker version?",
    options: [
      "docker status",
      "docker check",
      "docker show-version",
      "docker --version"
    ],
    answer: 3
  },
  {
    question: "5. Which command displays detailed Docker system information?",
    options: [
      "docker info",
      "docker details",
      "docker system-version",
      "docker status"
    ],
    answer: 0
  },
  {
    question: "6. Which command downloads an image from a registry?",
    options: [
      "docker get",
      "docker pull",
      "docker download",
      "docker fetch-image"
    ],
    answer: 1
  },
  {
    question: "7. Which command builds an image from a Dockerfile in the current directory?",
    options: [
      "docker create .",
      "docker compile .",
      "docker build -t myapp .",
      "docker run Dockerfile"
    ],
    answer: 2
  },
  {
    question: "8. Which command lists running containers?",
    options: [
      "docker images",
      "docker list",
      "docker ps -a",
      "docker ps"
    ],
    answer: 3
  },
  {
    question: "9. Which command lists all containers, including stopped containers?",
    options: [
      "docker ps -a",
      "docker ps",
      "docker images -a",
      "docker containers-running"
    ],
    answer: 0
  },
  {
    question: "10. Which command lists locally available Docker images?",
    options: [
      "docker ps",
      "docker images",
      "docker volumes",
      "docker networks"
    ],
    answer: 1
  },
  {
    question: "11. Which command starts a new container from an image?",
    options: [
      "docker image",
      "docker attach",
      "docker run",
      "docker logs"
    ],
    answer: 2
  },
  {
    question: "12. Which command starts an existing stopped container?",
    options: [
      "docker create",
      "docker build",
      "docker pull",
      "docker start"
    ],
    answer: 3
  },
  {
    question: "13. Which command stops a running container gracefully?",
    options: [
      "docker stop",
      "docker remove",
      "docker pause",
      "docker kill-all"
    ],
    answer: 0
  },
  {
    question: "14. Which command forcibly terminates a running container?",
    options: [
      "docker pause",
      "docker kill",
      "docker wait",
      "docker freeze"
    ],
    answer: 1
  },
  {
    question: "15. Which command removes a stopped container?",
    options: [
      "docker image prune",
      "docker stop",
      "docker rm",
      "docker rmi"
    ],
    answer: 2
  },
  {
    question: "16. Which command removes a Docker image?",
    options: [
      "docker rm",
      "docker stop",
      "docker delete-container",
      "docker rmi"
    ],
    answer: 3
  },
  {
    question: "17. What is the purpose of a Dockerfile?",
    options: [
      "To define instructions for building a Docker image",
      "To store container logs only",
      "To manage Linux users only",
      "To monitor CPU usage"
    ],
    answer: 0
  },
  {
    question: "18. Which Dockerfile instruction specifies the base image?",
    options: [
      "RUN",
      "FROM",
      "CMD",
      "COPY"
    ],
    answer: 1
  },
  {
    question: "19. Which Dockerfile instruction executes commands while building an image?",
    options: [
      "CMD",
      "ENTRYPOINT",
      "RUN",
      "EXPOSE"
    ],
    answer: 2
  },
  {
    question: "20. Which Dockerfile instruction copies files from the build context into the image?",
    options: [
      "RUN",
      "EXPOSE",
      "CMD",
      "COPY"
    ],
    answer: 3
  },
  {
    question: "21. Which Dockerfile instruction can copy files from a URL or extract a local tar archive?",
    options: [
      "ADD",
      "FROM",
      "WORKDIR",
      "ENV"
    ],
    answer: 0
  },
  {
    question: "22. What is the purpose of CMD in a Dockerfile?",
    options: [
      "To publish a port automatically",
      "To provide the default command or arguments for a container",
      "To create a Docker network",
      "To delete image layers"
    ],
    answer: 1
  },
  {
    question: "23. What is the purpose of ENTRYPOINT?",
    options: [
      "To define environment variables only",
      "To expose a container port",
      "To configure the main executable for a container",
      "To copy files into a volume"
    ],
    answer: 2
  },
  {
    question: "24. What is the main difference between CMD and ENTRYPOINT?",
    options: [
      "They always perform identical functions",
      "CMD creates images; ENTRYPOINT deletes images",
      "ENTRYPOINT only works with Windows",
      "ENTRYPOINT defines the main executable, while CMD commonly provides defaults"
    ],
    answer: 3
  },
  {
    question: "25. Which Dockerfile instruction sets the working directory?",
    options: [
      "WORKDIR",
      "USER",
      "VOLUME",
      "LABEL"
    ],
    answer: 0
  },
  {
    question: "26. Which Dockerfile instruction sets environment variables?",
    options: [
      "ARG",
      "ENV",
      "COPY",
      "EXPOSE"
    ],
    answer: 1
  },
  {
    question: "27. Which Dockerfile instruction declares build-time arguments?",
    options: [
      "ENV",
      "LABEL",
      "ARG",
      "USER"
    ],
    answer: 2
  },
  {
    question: "28. Which Dockerfile instruction documents the port an application is intended to use?",
    options: [
      "PORT",
      "PUBLISH",
      "NETWORK",
      "EXPOSE"
    ],
    answer: 3
  },
  {
    question: "29. Does EXPOSE automatically publish a container port to the host?",
    options: [
      "No, publishing generally requires options such as -p when running the container",
      "Yes, it always publishes every port",
      "Yes, but only UDP ports",
      "No, because Docker does not support ports"
    ],
    answer: 0
  },
  {
    question: "30. Which command maps host port 8080 to container port 80?",
    options: [
      "docker run -p 80:8080 nginx",
      "docker run -p 8080:80 nginx",
      "docker run --expose 8080:80 nginx",
      "docker run --port 80 nginx"
    ],
    answer: 1
  },
  {
    question: "31. What is a Docker image layer?",
    options: [
      "A physical network card",
      "A running application process",
      "A filesystem change or layer contributing to an image",
      "A Docker login credential"
    ],
    answer: 2
  },
  {
    question: "32. What is a major benefit of Docker image layer caching?",
    options: [
      "It removes the need for Dockerfiles",
      "It automatically fixes application bugs",
      "It eliminates all image storage",
      "It can speed up builds by reusing unchanged layers"
    ],
    answer: 3
  },
  {
    question: "33. Which command tags an image as myapp:v1?",
    options: [
      "docker tag myapp myapp:v1",
      "docker label myapp:v1",
      "docker version myapp:v1",
      "docker rename-image myapp:v1"
    ],
    answer: 0
  },
  {
    question: "34. Which command uploads an image to a registry?",
    options: [
      "docker push",
      "docker pull",
      "docker download",
      "docker export"
    ],
    answer: 0
  },
  {
    question: "35. Which command authenticates with a Docker registry?",
    options: [
      "docker auth-start",
      "docker login",
      "docker connect",
      "docker registry-open"
    ],
    answer: 1
  },
  {
    question: "36. What is Docker Hub?",
    options: [
      "A Dockerfile instruction",
      "A container runtime process",
      "A hosted container image registry",
      "A Linux kernel module"
    ],
    answer: 2
  },
  {
    question: "37. What does the image tag nginx:1.27 identify?",
    options: [
      "A container ID",
      "A Docker network",
      "A named volume",
      "The nginx image with the 1.27 tag"
    ],
    answer: 3
  },
  {
    question: "38. What can happen when you use an image tag such as latest?",
    options: [
      "It may refer to different image versions at different times",
      "It guarantees the image never changes",
      "It disables image caching",
      "It automatically upgrades the host operating system"
    ],
    answer: 0
  },
  {
    question: "39. What is a container registry?",
    options: [
      "A tool that edits source code",
      "A service for storing and distributing container images",
      "A container-only operating system",
      "A Docker network driver"
    ],
    answer: 1
  },
  {
    question: "40. Which command shows the logs of a container?",
    options: [
      "docker inspect",
      "docker events",
      "docker logs",
      "docker images"
    ],
    answer: 2
  },
  {
    question: "41. Which command opens an interactive shell inside a running container?",
    options: [
      "docker build -it container sh",
      "docker start -it container",
      "docker logs -it container",
      "docker exec -it container sh"
    ],
    answer: 3
  },
  {
    question: "42. Which command displays detailed configuration and metadata for a container?",
    options: [
      "docker inspect",
      "docker images",
      "docker login",
      "docker tag"
    ],
    answer: 0
  },
  {
    question: "43. Which command displays resource usage statistics for running containers?",
    options: [
      "docker info --logs",
      "docker stats",
      "docker ps --memory-only",
      "docker inspect --cpu"
    ],
    answer: 1
  },
  {
    question: "44. What does the -d option do in docker run?",
    options: [
      "Deletes the image",
      "Enables debug compilation",
      "Runs the container in detached mode",
      "Disables networking"
    ],
    answer: 2
  },
  {
    question: "45. What does the -it option commonly provide when running a container?",
    options: [
      "Automatic image upload",
      "Image tagging and tracking",
      "Container networking only",
      "An interactive terminal with a TTY"
    ],
    answer: 3
  },
  {
    question: "46. Which command pauses processes in a running container?",
    options: [
      "docker pause",
      "docker stop",
      "docker rm",
      "docker commit"
    ],
    answer: 0
  },
  {
    question: "47. Which command resumes a paused container?",
    options: [
      "docker start",
      "docker unpause",
      "docker restart-all",
      "docker continue-build"
    ],
    answer: 1
  },
  {
    question: "48. Which command restarts a container?",
    options: [
      "docker rebuild",
      "docker recreate",
      "docker restart",
      "docker refresh"
    ],
    answer: 2
  },
  {
    question: "49. What does docker run --rm do?",
    options: [
      "Removes every Docker image",
      "Removes the Docker daemon",
      "Deletes the host filesystem",
      "Automatically removes the container after it exits"
    ],
    answer: 3
  },
  {
    question: "50. Which command displays the processes running inside a container?",
    options: [
      "docker top",
      "docker stats",
      "docker images",
      "docker network ls"
    ],
    answer: 0
  },
  {
    question: "51. What is a Docker volume primarily used for?",
    options: [
      "Increasing CPU speed",
      "Persisting data independently of a container's writable layer",
      "Building a Docker image",
      "Creating image tags"
    ],
    answer: 1
  },
  {
    question: "52. Which command creates a named Docker volume?",
    options: [
      "docker volume build",
      "docker volume start",
      "docker volume create mydata",
      "docker create-volume mydata"
    ],
    answer: 2
  },
  {
    question: "53. Which command lists Docker volumes?",
    options: [
      "docker ps",
      "docker images",
      "docker volume show-all",
      "docker volume ls"
    ],
    answer: 3
  },
  {
    question: "54. What is a bind mount?",
    options: [
      "A mount that maps a host filesystem path into a container",
      "A Docker image layer",
      "A container registry",
      "A command to stop containers"
    ],
    answer: 0
  },
  {
    question: "55. Which command mounts the named volume mydata at /app/data?",
    options: [
      "docker run --volume /app/data mydata nginx",
      "docker run -v mydata:/app/data nginx",
      "docker run --mount-volume /app/data nginx",
      "docker volume attach mydata nginx"
    ],
    answer: 1
  },
  {
    question: "56. What can happen to data stored only in a container's writable layer when the container is removed?",
    options: [
      "It is always uploaded to Docker Hub",
      "It becomes a named volume automatically",
      "It is generally removed along with the container",
      "It is copied to every other container"
    ],
    answer: 2
  },
  {
    question: "57. Which command removes unused Docker volumes?",
    options: [
      "docker volume delete-all",
      "docker volume stop",
      "docker volume reset",
      "docker volume prune"
    ],
    answer: 3
  },
  {
    question: "58. What is Docker networking used for?",
    options: [
      "Enabling communication between containers and other endpoints",
      "Building Dockerfiles",
      "Compressing image layers",
      "Changing application source code"
    ],
    answer: 0
  },
  {
    question: "59. Which command lists Docker networks?",
    options: [
      "docker network show-all",
      "docker network ls",
      "docker networks",
      "docker network status"
    ],
    answer: 1
  },
  {
    question: "60. Which command creates a Docker network?",
    options: [
      "docker network build",
      "docker network start",
      "docker network create mynet",
      "docker create-net mynet"
    ],
    answer: 2
  },
  {
    question: "61. What is the default network driver commonly used by standalone Docker containers on Linux?",
    options: [
      "overlay",
      "macvlan",
      "none",
      "bridge"
    ],
    answer: 3
  },
  {
    question: "62. Which Docker network driver is commonly used for multi-host container networking in a Swarm?",
    options: [
      "overlay",
      "host",
      "none",
      "bridge"
    ],
    answer: 0
  },
  {
    question: "63. What does the host network driver do on Linux?",
    options: [
      "Creates a completely isolated network namespace",
      "Uses the host network namespace instead of a separate container network namespace",
      "Disables every network interface on the host",
      "Automatically creates a private overlay network"
    ],
    answer: 1
  },
  {
    question: "64. What does the none network driver provide?",
    options: [
      "Full internet access by default",
      "Automatic multi-host networking",
      "No regular external container networking, apart from loopback",
      "Automatic port publishing"
    ],
    answer: 2
  },
  {
    question: "65. How can containers on the same user-defined bridge network commonly discover one another?",
    options: [
      "By sharing the same image ID only",
      "By using host process IDs",
      "By using Docker Hub tags",
      "Through container names or network aliases using Docker DNS"
    ],
    answer: 3
  },
  {
    question: "66. What is Docker Compose used for?",
    options: [
      "Defining and managing multi-container applications",
      "Compiling the Linux kernel",
      "Replacing Git",
      "Editing images directly"
    ],
    answer: 0
  },
  {
    question: "67. Which file is commonly used to define a Docker Compose application?",
    options: [
      "Dockerfile.lock",
      "compose.yaml",
      "docker-image.json",
      "container.cfg"
    ],
    answer: 1
  },
  {
    question: "68. Which command starts services defined in a Compose file?",
    options: [
      "docker compose build-only",
      "docker compose start-new",
      "docker compose up",
      "docker compose images-only"
    ],
    answer: 2
  },
  {
    question: "69. Which command stops and removes Compose-managed containers and networks?",
    options: [
      "docker compose pause",
      "docker compose stop-only",
      "docker compose restart",
      "docker compose down"
    ],
    answer: 3
  },
  {
    question: "70. Which Compose property is used to configure port mappings?",
    options: [
      "ports",
      "volumes",
      "environment",
      "depends_on"
    ],
    answer: 0
  },
  {
    question: "71. Which Compose property configures environment variables for a service?",
    options: [
      "networks",
      "environment",
      "ports",
      "build"
    ],
    answer: 1
  },
  {
    question: "72. What does depends_on primarily express in Docker Compose?",
    options: [
      "A guaranteed application-level readiness check",
      "A requirement to use the host network",
      "A dependency and startup/shutdown ordering relationship between services",
      "A requirement to use the same image tag"
    ],
    answer: 2
  },
  {
    question: "73. Does depends_on alone guarantee that a database is ready to accept queries?",
    options: [
      "Yes, for every database",
      "Yes, if the database uses port 5432",
      "Yes, if all services use bridge networking",
      "No, readiness requires an appropriate health check or application retry strategy"
    ],
    answer: 3
  },
  {
    question: "74. What does a Docker health check help determine?",
    options: [
      "Whether a containerized application is healthy according to a configured test",
      "Whether an image is stored in Docker Hub",
      "Whether a Dockerfile has comments",
      "Whether the host has a graphical desktop"
    ],
    answer: 0
  },
  {
    question: "75. Which Dockerfile instruction defines a health-check command?",
    options: [
      "HEALTH",
      "HEALTHCHECK",
      "CHECKSTATUS",
      "VERIFY"
    ],
    answer: 1
  },
  {
    question: "76. What does the Docker restart policy unless-stopped generally do?",
    options: [
      "Never restarts a container after failure",
      "Restarts every container on every host unconditionally",
      "Restarts a container after it exits, unless it has been explicitly stopped",
      "Rebuilds the image whenever a container exits"
    ],
    answer: 2
  },
  {
    question: "77. Which option configures a container restart policy when using docker run?",
    options: [
      "--auto-rebuild",
      "--restart-image",
      "--keep-running",
      "--restart"
    ],
    answer: 3
  },
  {
    question: "78. What is a multi-stage Docker build?",
    options: [
      "A build that uses multiple FROM stages, often to separate build tools from the final image",
      "A build that requires multiple Docker hosts in every case",
      "A build that runs only on Windows",
      "A build that creates no image layers"
    ],
    answer: 0
  },
  {
    question: "79. What is a major benefit of using a smaller base image?",
    options: [
      "It guarantees the application has no vulnerabilities",
      "It can reduce image size and the number of included components",
      "It removes the need for testing",
      "It automatically encrypts application traffic"
    ],
    answer: 1
  },
  {
    question: "80. What is the purpose of a .dockerignore file?",
    options: [
      "To stop Docker from starting",
      "To store registry credentials",
      "To exclude specified files and directories from the build context",
      "To define container restart policies"
    ],
    answer: 2
  },
  {
    question: "81. Why should unnecessary files be excluded from the Docker build context?",
    options: [
      "To disable image caching",
      "To force every layer to rebuild",
      "To publish all host ports",
      "To reduce build context size and avoid copying unwanted files"
    ],
    answer: 3
  },
  {
    question: "82. Which command removes unused Docker objects such as stopped containers and unused networks, according to its options?",
    options: [
      "docker system prune",
      "docker system start",
      "docker system login",
      "docker system build"
    ],
    answer: 0
  },
  {
    question: "83. Which command shows Docker disk usage?",
    options: [
      "docker disk status",
      "docker system df",
      "docker space list",
      "docker info --disk-only"
    ],
    answer: 1
  },
  {
    question: "84. What is a container's writable layer?",
    options: [
      "The original Dockerfile",
      "A registry's storage layer only",
      "The container-specific writable layer above the image's read-only layers",
      "A host network interface"
    ],
    answer: 2
  },
  {
    question: "85. What is the main purpose of Docker Content Trust or image-signing mechanisms?",
    options: [
      "To increase container CPU limits automatically",
      "To replace application testing",
      "To create host bind mounts",
      "To help verify image authenticity and integrity through signing mechanisms"
    ],
    answer: 3
  },
  {
    question: "86. Which practice is recommended for Docker container security?",
    options: [
      "Run as a non-root user when practical and apply least privilege",
      "Run every container as root without restrictions",
      "Store all secrets directly in the Dockerfile",
      "Disable security updates"
    ],
    answer: 0
  },
  {
    question: "87. Why should secrets generally not be placed directly in a Dockerfile?",
    options: [
      "Docker cannot build images containing text",
      "Secrets can persist in image layers or build metadata and be exposed",
      "Dockerfiles only support numbers",
      "Secrets automatically disable networking"
    ],
    answer: 1
  },
  {
    question: "88. What is the purpose of Docker secrets in supported environments?",
    options: [
      "To make images larger",
      "To expose every password in container logs",
      "To provide sensitive information to services more securely than hardcoding it in images",
      "To replace container networking"
    ],
    answer: 2
  },
  {
    question: "89. What does running a container with --read-only generally do?",
    options: [
      "Prevents the image from being downloaded",
      "Disables all network traffic",
      "Prevents the container from starting",
      "Makes the container root filesystem read-only, apart from separately writable mounts or configured areas"
    ],
    answer: 3
  },
  {
    question: "90. Why might a production container use CPU and memory limits?",
    options: [
      "To prevent one container from consuming excessive host resources",
      "To automatically fix every memory leak",
      "To remove the need for monitoring",
      "To make the container image immutable"
    ],
    answer: 0
  },
  {
    question: "91. A container exits immediately after starting. What is a useful first troubleshooting step?",
    options: [
      "Delete every Docker image",
      "Check container logs and its exit status",
      "Reinstall the host operating system",
      "Disable all container networks"
    ],
    answer: 1
  },
  {
    question: "92. A container cannot reach a database in another container. What should you check first?",
    options: [
      "The color of the terminal",
      "The Docker image creation date only",
      "Network connectivity, service DNS/name, port, and database readiness",
      "The number of comments in the Dockerfile"
    ],
    answer: 2
  },
  {
    question: "93. A host port mapping fails because the port is already in use. What should you do?",
    options: [
      "Delete the Dockerfile",
      "Remove every Docker volume",
      "Change the image's repository name only",
      "Free the occupied host port or choose another available host port"
    ],
    answer: 3
  },
  {
    question: "94. A containerized application loses data after the container is recreated. What is the best preventive approach?",
    options: [
      "Store persistent data in a suitable volume or bind mount",
      "Increase the image tag number",
      "Use docker ps more frequently",
      "Disable container restarts"
    ],
    answer: 0
  },
  {
    question: "95. A Docker image build is unexpectedly slow. What should you investigate?",
    options: [
      "Only the container name",
      "Build context size, layer caching, dependency downloads, and Dockerfile instruction order",
      "Only the host wallpaper",
      "Only the number of running networks"
    ],
    answer: 1
  },
  {
    question: "96. A container repeatedly restarts in production. What should you investigate?",
    options: [
      "Only its image tag format",
      "Whether the Dockerfile contains comments",
      "Logs, exit codes, health checks, restart policy, and resource limits",
      "Only the registry login username"
    ],
    answer: 2
  },
  {
    question: "97. Which command can copy a file from a container to the host?",
    options: [
      "docker move",
      "docker pull-file",
      "docker export-file",
      "docker cp"
    ],
    answer: 3
  },
  {
    question: "98. What is the purpose of docker commit?",
    options: [
      "To create a new image from a container's changes",
      "To upload application source code to GitHub",
      "To create a Docker network",
      "To restart the Docker daemon"
    ],
    answer: 0
  },
  {
    question: "99. Which practice helps make Docker deployments more reproducible?",
    options: [
      "Use unpinned dependencies and change them without testing",
      "Use controlled image versions or digests and a repeatable build process",
      "Build production images manually without recording changes",
      "Store production data only in a container's writable layer"
    ],
    answer: 1
  },
  {
    question: "100. What should be considered when running Docker containers in production?",
    options: [
      "Containers never fail, so monitoring is unnecessary",
      "Images alone replace backups and disaster recovery",
      "Security, persistent data, resource limits, monitoring, backups, and recovery",
      "Every container should run with unrestricted root privileges"
    ],
    answer: 2
  }
];
