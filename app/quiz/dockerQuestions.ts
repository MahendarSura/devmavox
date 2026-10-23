export interface DockerQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const dockerQuestions: DockerQuestion[] = [
  // --- 1 to 20: Fundamentals & Basic Commands ---
  {
    question: "1. What is Docker?",
    options: ["Version control tool", "Containerization platform", "Programming language", "Database"],
    answer: 1
  },
  {
    question: "2. What is a Docker container?",
    options: ["A source code repository", "A physical server", "An isolated environment for running applications", "An image registry"],
    answer: 2
  },
  {
    question: "3. What is a Docker image?",
    options: ["A template used to create containers", "A running process", "A network", "A storage volume"],
    answer: 0
  },
  {
    question: "4. What is the difference between an image and a container?",
    options: ["They are identical", "An image is a template; a container is an instance", "A container builds images automatically", "An image is always running"],
    answer: 1
  },
  {
    question: "5. Which command displays the Docker version?",
    options: ["docker check", "docker status", "docker --version", "docker version-check"],
    answer: 2
  },
  {
    question: "6. Which command downloads an image from a registry?",
    options: ["docker pull", "docker get", "docker download", "docker install"],
    answer: 0
  },
  {
    question: "7. Which command lists running containers?",
    options: ["docker images", "docker ps", "docker build", "docker volume ls"],
    answer: 1
  },
  {
    question: "8. Which command lists all containers, including stopped ones?",
    options: ["docker images -a", "docker list -all", "docker ps -a", "docker show"],
    answer: 2
  },
  {
    question: "9. What is a Dockerfile?",
    options: ["A file containing image-build instructions", "A container log file", "A network configuration only", "A Git configuration file"],
    answer: 0
  },
  {
    question: "10. Which command builds an image from a Dockerfile in the current directory?",
    options: ["docker start -t app", "docker pull app", "docker run app .", "docker build -t app ."],
    answer: 3
  },
  {
    question: "11. What is Docker Engine?",
    options: ["A code editor", "The software that builds and runs containers", "A cloud database", "A package manager"],
    answer: 1
  },
  {
    question: "12. What is Docker Hub?",
    options: ["A container runtime", "A Linux kernel", "A registry for storing and sharing images", "A monitoring dashboard"],
    answer: 2
  },
  {
    question: "13. What does `docker run` do?",
    options: ["Creates and starts a container from an image", "Only lists images", "Deletes all images", "Builds a Git repository"],
    answer: 0
  },
  {
    question: "14. Which command starts an existing stopped container?",
    options: ["docker create", "docker build", "docker pull", "docker start"],
    answer: 3
  },
  {
    question: "15. Which command stops a running container gracefully?",
    options: ["docker delete", "docker stop", "docker pause-image", "docker remove"],
    answer: 1
  },
  {
    question: "16. Which command removes a stopped container?",
    options: ["docker rmi", "docker rm", "docker stop", "docker kill"],
    answer: 1
  },
  {
    question: "17. Which command removes a Docker image?",
    options: ["docker rm", "docker stop", "docker rmi", "docker erase"],
    answer: 2
  },
  {
    question: "18. What does `docker exec -it CONTAINER sh` do?",
    options: ["Opens an interactive shell inside a running container", "Builds an image", "Deletes the container", "Displays image history"],
    answer: 0
  },
  {
    question: "19. Which command displays container logs?",
    options: ["docker inspect", "docker images", "docker logs", "docker login"],
    answer: 2
  },
  {
    question: "20. What is the purpose of `docker inspect`?",
    options: ["Builds an image", "Displays detailed information about Docker objects", "Uploads source code", "Deletes unused volumes"],
    answer: 1
  },

  // --- 21 to 40: Dockerfile Instructions & Layers ---
  {
    question: "21. What does the `FROM` instruction do in a Dockerfile?",
    options: ["Defines the base image", "Copies a running container", "Publishes a port", "Starts a network"],
    answer: 0
  },
  {
    question: "22. What is the purpose of `RUN` in a Dockerfile?",
    options: ["Maps host ports", "Executes a command during image building", "Starts an existing container", "Creates a registry"],
    answer: 1
  },
  {
    question: "23. What does `COPY` do in a Dockerfile?",
    options: ["Copies files from the build context into the image", "Copies an image to RAM", "Stops a container", "Creates a network"],
    answer: 0
  },
  {
    question: "24. What is the purpose of `WORKDIR`?",
    options: ["Sets a registry URL", "Removes a directory", "Sets the working directory for subsequent instructions", "Exposes a port"],
    answer: 2
  },
  {
    question: "25. What does `EXPOSE` do in a Dockerfile?",
    options: ["Automatically opens every firewall", "Documents the port the application listens on", "Publishes a port to the host automatically", "Starts the application"],
    answer: 1
  },
  {
    question: "26. What is the difference between `CMD` and `ENTRYPOINT`?",
    options: ["They always have identical behavior", "CMD builds the image; ENTRYPOINT pushes it", "ENTRYPOINT defines the main executable; CMD supplies default command or arguments", "CMD is only for networking"],
    answer: 2
  },
  {
    question: "27. What is a `.dockerignore` file used for?",
    options: ["Excluding files from the build context", "Ignoring container crashes", "Deleting images automatically", "Disabling Docker networking"],
    answer: 0
  },
  {
    question: "28. What is a multi-stage Docker build?",
    options: ["Running multiple containers on one port", "Using multiple Docker daemons", "Building images without a Dockerfile", "Using multiple build stages to separate build tools from the final image"],
    answer: 3
  },
  {
    question: "29. What is a Docker image layer?",
    options: ["A network interface", "A filesystem change or layer contributing to an image", "A running container", "A host firewall rule"],
    answer: 1
  },
  {
    question: "30. Why should Dockerfile instructions be ordered carefully?",
    options: ["To disable image layers", "To prevent all container networking", "To improve cache reuse and reduce unnecessary rebuilds", "To make images run only as root"],
    answer: 2
  },
  {
    question: "31. What is a Docker registry?",
    options: ["A service for storing and distributing container images", "A container process", "A Linux filesystem", "A Dockerfile instruction"],
    answer: 0
  },
  {
    question: "32. Which command uploads an image to a registry?",
    options: ["docker push", "docker send", "docker upload-file", "docker publish-container"],
    answer: 0
  },
  {
    question: "33. Why is image tagging important?",
    options: ["It changes the host kernel", "It identifies a particular image version or reference", "It automatically patches vulnerabilities", "It creates a Docker volume"],
    answer: 1
  },
  {
    question: "34. Which command assigns a new tag to an existing image?",
    options: ["docker label", "docker version", "docker tag", "docker rename"],
    answer: 2
  },
  {
    question: "35. What is a container registry authentication command?",
    options: ["docker connect", "docker auth-start", "docker registry-open", "docker login"],
    answer: 3
  },
  {
    question: "36. Why is using the `latest` tag not always recommended in production?",
    options: ["It cannot run containers", "It may point to different image versions over time", "It disables image caching completely", "It prevents image downloads"],
    answer: 1
  },
  {
    question: "37. What is a container's writable layer?",
    options: ["The container-specific layer where runtime filesystem changes are stored", "The registry's permanent backup", "The host's boot partition", "A Docker network"],
    answer: 0
  },
  {
    question: "38. What happens to a container's writable-layer data when the container is removed?",
    options: ["It always moves to Docker Hub", "It becomes a named volume", "It is generally removed with the container", "It is saved automatically as an image"],
    answer: 2
  },
  {
    question: "39. What is a dangling Docker image?",
    options: ["An image running without a port", "An image with no repository name or tag reference", "An image stored in a volume", "An image with a running process"],
    answer: 1
  },
  {
    question: "40. Which command lists local Docker images?",
    options: ["docker ps", "docker volume ls", "docker network ls", "docker images"],
    answer: 3
  },

  // --- 41 to 60: Networking & Storage ---
  {
    question: "41. What is Docker networking used for?",
    options: ["Connecting containers with each other and external networks", "Building source code only", "Compressing images", "Managing Git commits"],
    answer: 0
  },
  {
    question: "42. Which Docker network driver is commonly used for standalone containers on one host?",
    options: ["overlay only", "bridge", "macvlan only", "none only"],
    answer: 1
  },
  {
    question: "43. What is the default network driver for a typical standalone Docker installation?",
    options: ["overlay", "host", "bridge", "macvlan"],
    answer: 2
  },
  {
    question: "44. What does the host network mode do on Linux?",
    options: ["Gives each container a separate host kernel", "Disables all network access", "Creates an encrypted overlay automatically", "Shares the host network namespace with the container"],
    answer: 3
  },
  {
    question: "45. What is an overlay network commonly used for?",
    options: ["Connecting containers across multiple Docker hosts", "Deleting images", "Creating image layers", "Persisting database files"],
    answer: 0
  },
  {
    question: "46. What does `-p 8080:80` mean in `docker run`?",
    options: ["Container port 8080 maps to host port 80", "Host port 8080 maps to container port 80", "Both ports are disabled", "It exposes only UDP port 80"],
    answer: 1
  },
  {
    question: "47. Why might a container not be reachable from a browser on the host?",
    options: ["The image has a tag", "Docker uses layers", "The port may not be published or the app may not listen on the expected interface or port", "The container has an ID"],
    answer: 2
  },
  {
    question: "48. How can two containers on a user-defined bridge network usually communicate?",
    options: ["Only through Docker Hub", "Only by sharing a PID namespace", "Only by using host networking", "By using each other's container names or network aliases"],
    answer: 3
  },
  {
    question: "49. What is the purpose of `docker network ls`?",
    options: ["Lists Docker networks", "Lists running processes inside a container", "Lists image layers", "Lists volumes only"],
    answer: 0
  },
  {
    question: "50. Which command connects an existing container to a network?",
    options: ["docker network build", "docker network connect", "docker network attach-image", "docker connect-volume"],
    answer: 1
  },
  {
    question: "51. What is a Docker volume?",
    options: ["A network driver", "Persistent storage managed by Docker", "An image tag", "A container process"],
    answer: 1
  },
  {
    question: "52. Why are volumes used for databases?",
    options: ["To expose ports", "To build images", "To preserve data beyond container removal", "To change the database language"],
    answer: 2
  },
  {
    question: "53. Which command lists Docker volumes?",
    options: ["docker volume ls", "docker ps", "docker images", "docker network ls"],
    answer: 0
  },
  {
    question: "54. What is a bind mount?",
    options: ["A registry", "A Docker image", "A network connection", "Mounting a host path inside a container"],
    answer: 3
  },
  {
    question: "55. What is the difference between a volume and a bind mount?",
    options: ["They are identical", "Docker manages volumes; bind mounts use a specified host path", "Volumes cannot persist data", "Bind mounts only work with images"],
    answer: 1
  },
  {
    question: "56. Which command creates a named volume?",
    options: ["docker volume create appdata", "docker create-volume appdata", "docker mount appdata", "docker volume start appdata"],
    answer: 0
  },
  {
    question: "57. What happens to a named volume when its container is removed?",
    options: ["It is always deleted", "It becomes an image", "It generally remains until explicitly removed", "It is uploaded to Docker Hub"],
    answer: 2
  },
  {
    question: "58. What does the :ro mount option mean?",
    options: ["Restart only", "Remove on exit", "Run once", "Read-only mount"],
    answer: 3
  },
  {
    question: "59. Which command removes unused Docker volumes?",
    options: ["docker volume prune", "docker volume stop", "docker volume build", "docker volume reset"],
    answer: 0
  },
  {
    question: "60. What should you check before removing a volume?",
    options: ["The image tag only", "Whether important data needs to be retained", "The container name length", "The registry URL"],
    answer: 1
  },

  // --- 61 to 80: Docker Compose & Architecture ---
  {
    question: "61. What is Docker Compose?",
    options: ["A Linux kernel", "A source control tool", "A tool for defining and running multi-container applications", "A programming language"],
    answer: 2
  },
  {
    question: "62. Which file is commonly used to define Docker Compose services?",
    options: ["package.json", "Dockerfile.lock", "requirements.txt", "compose.yaml"],
    answer: 3
  },
  {
    question: "63. Which command starts services defined in a Compose file?",
    options: ["docker compose up", "docker compose login", "docker compose images-only", "docker compose remove-all"],
    answer: 0
  },
  {
    question: "64. Which command stops and removes Compose containers and networks?",
    options: ["docker compose build", "docker compose down", "docker compose logs", "docker compose pull"],
    answer: 1
  },
  {
    question: "65. Which command builds Compose service images?",
    options: ["docker compose ps", "docker compose down", "docker compose build", "docker compose logs"],
    answer: 2
  },
  {
    question: "66. Does depends_on always guarantee that a dependency is ready to accept requests?",
    options: ["Yes, always", "Only for databases", "Only on Linux", "No; startup ordering alone does not guarantee readiness"],
    answer: 3
  },
  {
    question: "67. How do you view logs for Compose services?",
    options: ["docker compose logs", "docker compose images", "docker compose volumes", "docker compose tag"],
    answer: 0
  },
  {
    question: "68. How should one Compose service usually connect to another service?",
    options: ["Using localhost in every case", "Using the service name as the hostname", "Using a random public IP", "Using the Dockerfile name"],
    answer: 1
  },
  {
    question: "69. What is a container health check used for?",
    options: ["Creating images", "Publishing ports", "Checking whether an application meets a defined health condition", "Deleting volumes"],
    answer: 2
  },
  {
    question: "70. How should application configuration vary between development and production?",
    options: ["Hard-code all secrets", "Use identical passwords everywhere", "Commit production credentials to Git", "Use environment-specific configuration and secure secret management"],
    answer: 3
  },
  {
    question: "71. What is a key benefit of containerization?",
    options: ["Consistent application packaging and isolation", "A separate physical server for every process", "Guaranteed zero vulnerabilities", "Elimination of all testing"],
    answer: 0
  },
  {
    question: "72. How do containers generally differ from virtual machines?",
    options: ["Containers always require a full guest OS", "Containers generally share the host kernel; VMs run guest operating systems", "VMs never provide isolation", "Containers cannot run applications"],
    answer: 1
  },
  {
    question: "73. What does a container runtime do?",
    options: ["Writes application source code", "Manages Git branches", "Runs and manages container processes", "Creates database schemas automatically"],
    answer: 2
  },
  {
    question: "74. What is containerd?",
    options: ["A Dockerfile instruction", "A network protocol", "A programming language", "A container runtime component that manages container lifecycle operations"],
    answer: 3
  },
  {
    question: "75. What do Linux namespaces provide?",
    options: ["Isolation of resources such as processes and networking", "Image compression only", "Registry authentication", "Automatic database backups"],
    answer: 0
  },
  {
    question: "76. What are Linux cgroups used for?",
    options: ["Tagging images", "Controlling and accounting for resource usage", "Creating Dockerfiles", "Publishing images"],
    answer: 1
  },
  {
    question: "77. What is the Docker daemon?",
    options: ["A container image", "A Docker volume", "A background service that manages Docker objects", "A YAML file"],
    answer: 2
  },
  {
    question: "78. What does the Docker client do?",
    options: ["Stores all container data permanently", "Replaces the host operating system", "Automatically fixes application bugs", "Sends requests to the Docker daemon or configured endpoint"],
    answer: 3
  },
  {
    question: "79. Which command displays Docker disk usage?",
    options: ["docker system df", "docker ps", "docker login", "docker network ls"],
    answer: 0
  },
  {
    question: "80. What does docker system prune do?",
    options: ["Restarts every container", "Removes selected unused Docker resources", "Backs up all volumes to the cloud", "Builds every image"],
    answer: 1
  },

  // --- 81 to 100: Security & Troubleshooting ---
  {
    question: "81. Why should production containers avoid running as root when possible?",
    options: ["Images cannot be built otherwise", "It disables networking", "It can reduce the impact of a container compromise", "It prevents logs from being created"],
    answer: 2
  },
  {
    question: "82. How should database passwords be handled in production?",
    options: ["Bake them into public images", "Commit them to source control", "Print them in logs", "Use an appropriate secrets-management mechanism"],
    answer: 3
  },
  {
    question: "83. Why scan container images for vulnerabilities?",
    options: ["To identify known security issues in image components", "To rename containers", "To create volumes", "To publish ports"],
    answer: 0
  },
  {
    question: "84. Why use trusted and maintained base images?",
    options: ["They guarantee zero vulnerabilities", "They can reduce exposure to outdated or vulnerable components", "They eliminate all updates", "They make monitoring unnecessary"],
    answer: 1
  },
  {
    question: "85. What does the principle of least privilege mean?",
    options: ["Give every container host access", "Run every container in privileged mode", "Grant only the permissions needed for its task", "Disable all monitoring"],
    answer: 2
  },
  {
    question: "86. Why is unnecessary privileged mode risky?",
    options: ["It prevents image downloads", "It deletes all volumes", "It automatically encrypts traffic", "It grants extensive access and can weaken isolation"],
    answer: 3
  },
  {
    question: "87. Why should access to the Docker socket be restricted?",
    options: ["It can provide powerful control over the Docker daemon and host resources", "It prevents image tagging", "It disables Dockerfiles", "It changes application code"],
    answer: 0
  },
  {
    question: "88. What is a Docker image digest used for?",
    options: ["Setting CPU limits", "Identifying image content using a content-addressed hash", "Mapping host ports", "Creating volumes"],
    answer: 1
  },
  {
    question: "89. Why are smaller production images often preferred?",
    options: ["They guarantee zero vulnerabilities", "They eliminate monitoring", "They can reduce storage use and download time", "They replace automated tests"],
    answer: 2
  },
  {
    question: "90. What is the purpose of image signing and verification?",
    options: ["Increasing container memory", "Publishing application ports", "Replacing CI/CD", "Helping verify image authenticity and integrity"],
    answer: 3
  },
  {
    question: "91. A container exits immediately after starting. What should you check?",
    options: ["Logs, exit status, and the configured main process", "Only the image name", "Only the host screen resolution", "The Docker Hub homepage"],
    answer: 0
  },
  {
    question: "92. A web container cannot connect to a database container. What should you investigate?",
    options: ["Only image size", "Network membership, hostname, port, and database readiness", "Only the container ID", "The Dockerfile extension"],
    answer: 1
  },
  {
    question: "93. Docker reports that a host port is already allocated. What is a likely solution?",
    options: ["Delete every image", "Remove all volumes", "Free the conflicting port or choose another host port", "Reinstall the application language"],
    answer: 2
  },
  {
    question: "94. An application cannot write to a mounted directory. What should you check?",
    options: ["Only the image tag", "Only registry login", "Only the container hostname", "Mount configuration, filesystem permissions, and container user"],
    answer: 3
  },
  {
    question: "95. A Docker image build is very slow. What should you investigate?",
    options: ["Build context size, cache invalidation, downloads, and Dockerfile instruction order", "Only the container name", "Only the image ID length", "Only the network name"],
    answer: 0
  },
  {
    question: "96. A container is consuming excessive memory. What should you do?",
    options: ["Delete the Dockerfile", "Inspect memory usage and application behavior; configure suitable resource limits", "Publish every port", "Disable all logs permanently"],
    answer: 1
  },
  {
    question: "97. A container keeps restarting. What should you inspect?",
    options: ["Only its image tag", "Only the registry URL", "Restart policy, logs, exit code, and health checks", "Only the container name"],
    answer: 2
  },
  {
    question: "98. What is a good CI/CD practice for container images?",
    options: ["Deploy untested images", "Store passwords in image layers", "Skip dependency checks", "Build, test, scan, tag, and publish versioned images"],
    answer: 3
  },
  {
    question: "99. What is a good practice when deploying a new containerized application version?",
    options: ["Test a versioned image, deploy with a rollback plan, and monitor health", "Overwrite production without testing", "Delete persistent data before every release", "Disable monitoring"],
    answer: 0
  },
  {
    question: "100. What should be considered when running containers in production?",
    options: ["Containers never fail", "Security, persistent data, resource limits, monitoring, backups, and recovery", "Logging is unnecessary", "Images replace the entire CI/CD process"],
    answer: 1
  }
];
