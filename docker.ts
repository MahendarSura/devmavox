export interface InterviewQA {
  question: string;
  answer: string;
}

export const dockerQuestions: InterviewQA[] = [
  {
    question: "1. What is Docker?",
    answer: `Docker is an open-source containerization platform used to package applications and their dependencies into lightweight, portable containers.

It helps developers build an application once and run it consistently across development, testing, and production environments. A Docker container includes the application, runtime, libraries, and configuration required to run it.

For example, a Java application may work on a developer's laptop but fail on a production server because of different Java versions. Docker packages the application with its required environment and reduces these differences.

Docker is widely used in DevOps to simplify application deployment, improve consistency, and support microservices and CI/CD pipelines.`
  },
  {
    question: "2. What is a Docker Container?",
    answer: `A Docker container is a running instance of a Docker image. It provides an isolated environment in which an application and its dependencies can execute.

Containers share the host operating system kernel but maintain separate process, filesystem, and network environments. This makes them lighter and faster to start than traditional virtual machines.

For example, an organization can run its frontend, backend, and database as separate containers on the same server. Each service can be managed and updated independently.

Containers help DevOps teams achieve consistent deployments, efficient resource utilization, and easier application scaling.`
  },
  {
    question: "3. What is a Docker Image?",
    answer: `A Docker image is a read-only template used to create Docker containers. It contains the application code, runtime, libraries, dependencies, and filesystem instructions required to run an application.

Images are usually created using a Dockerfile. Docker builds the image in layers, allowing unchanged layers to be reused during later builds.

For example, a team can build an image containing a Node.js application and its dependencies, then use that same image in development, testing, and production.

Docker images make application packaging repeatable and help maintain consistent deployment environments.`
  },
  {
    question: "4. What is a Dockerfile?",
    answer: `A Dockerfile is a text file containing instructions that Docker uses to build an image. It defines the base image, working directory, application files, dependencies, ports, and startup command.

Common instructions include FROM, WORKDIR, COPY, RUN, EXPOSE, ENV, and CMD. Docker reads these instructions in sequence and creates image layers.

For example, a DevOps engineer can write a Dockerfile for a Python application that installs dependencies, copies source code, and starts the application.

Dockerfiles allow teams to automate image creation and maintain the same build process across environments.`
  },
  {
    question: "5. What is the difference between Docker Image and Container?",
    answer: `A Docker image is a read-only template, whereas a Docker container is an executable instance created from that image.

An image contains the application and its required dependencies. When Docker starts a container from the image, it creates an isolated runtime environment where the application executes.

For example, one Nginx image can be used to create several Nginx containers for different application environments. Each container runs independently while using the same image as its base.

Images are used for packaging and distribution, while containers are used to run applications.`
  },
  {
    question: "6. What is Docker Hub?",
    answer: `Docker Hub is a cloud-based container registry where developers can store, share, and download Docker images.

It provides official images for commonly used technologies such as Nginx, MySQL, Redis, and Python. Teams can also create repositories to store their own application images.

For example, a developer can build a custom application image and push it to a private Docker Hub repository. A deployment server can later pull that image and start a container.

Docker Hub simplifies image distribution and supports collaboration between development and operations teams.`
  },
  {
    question: "7. What is a Docker Registry?",
    answer: `A Docker Registry is a service used to store and distribute Docker images. It acts as a central location from which Docker clients can push and pull images.

Registries can be public or private. Docker Hub is a commonly used public registry, while organizations may use private registries to control access to internal application images.

For example, a CI/CD pipeline can build an application image, push it to Amazon ECR, and allow an EKS cluster to pull that image during deployment.

A registry provides centralized image storage, version management, and controlled distribution.`
  },
  {
    question: "8. What is the difference between CMD and ENTRYPOINT?",
    answer: `CMD and ENTRYPOINT are Dockerfile instructions that define the command executed when a container starts.

CMD provides a default command or default arguments that can be overridden when running the container. ENTRYPOINT defines the main executable that the container is intended to run.

For example, an image designed to run a monitoring agent can use ENTRYPOINT to start the agent. CMD can provide default arguments that may be changed during container execution.

Understanding both instructions helps engineers create predictable container startup behavior and flexible application images.`
  },
  {
    question: "9. What is the difference between COPY and ADD?",
    answer: `COPY and ADD are Dockerfile instructions used to transfer files from the build context into an image.

COPY performs a straightforward file or directory copy. ADD provides additional functionality, including automatic extraction of supported local tar archives and handling certain remote URL sources.

For example, COPY can place an application JAR file into the image, while ADD can extract a supported archive during the build.

COPY is generally preferred when only copying files is required because its behavior is simple and predictable.`
  },
  {
    question: "10. What is a Docker Volume?",
    answer: `A Docker volume is a storage mechanism used to persist data generated or used by containers. Volumes are managed by Docker and exist independently of an individual container's lifecycle.

When a container is removed, its associated volume can remain available for another container. This is important for applications that store databases, uploaded files, or other important information.

For example, a MySQL container can store its database files in a named Docker volume. Recreating the container will not remove the data stored in that volume.

Volumes help protect persistent application data and support reliable container operations.`
  },
  {
    question: "11. What is a Bind Mount in Docker?",
    answer: `A bind mount connects a specific file or directory on the host machine to a location inside a Docker container.

Unlike Docker volumes, bind mounts use a host filesystem path selected by the user. Changes made to the mounted files can be visible from both the host and the container, depending on the mount configuration.

For example, developers can mount their local source-code directory into a Node.js container so that code changes are available without rebuilding the image.

Bind mounts are useful for development workflows, configuration sharing, and accessing host files from containers.`
  },
  {
    question: "12. What is the difference between Docker Volume and Bind Mount?",
    answer: `Docker volumes and bind mounts both allow containers to access persistent storage, but they manage storage differently.

Docker volumes are managed by Docker and are generally stored in Docker's designated storage area. Bind mounts connect containers directly to specific host filesystem paths.

For example, a production database may use a named volume for persistent data, while a development container may use a bind mount to access source code from a developer's workstation.

Volumes are usually preferred for container-managed persistent data, while bind mounts are useful when a specific host directory must be shared.`
  },
  {
    question: "13. What is Docker Networking?",
    answer: `Docker networking allows containers to communicate with one another, the host machine, and external networks.

Docker provides network drivers such as bridge, host, none, and overlay. Each driver supports different communication and isolation requirements.

For example, a web application container may communicate with a database container through a user-defined bridge network. The database does not need to expose its port publicly for this internal communication.

Docker networking helps DevOps engineers design secure application communication and connect containerized services.`
  },
  {
    question: "14. What is a Bridge Network?",
    answer: `A bridge network is a Docker network driver commonly used to connect containers running on the same Docker host.

Containers connected to the same user-defined bridge network can communicate using their container names. Docker provides network isolation from containers that are not connected to that network.

For example, a backend container and a MySQL container can join the same bridge network. The backend can connect to MySQL using the database container's name.

Bridge networks are useful for single-host application deployments and separating groups of containerized services.`
  },
  {
    question: "15. What is Host Network Mode?",
    answer: `Host networking allows a container to use the network stack of the Docker host instead of receiving an isolated container network.

In this mode, the container does not receive a separate network IP address in the same way as a bridge-networked container. Its application uses the host's network interfaces and ports.

For example, a monitoring agent may use host networking when it needs direct access to host network interfaces.

Host mode can reduce network isolation, so engineers should evaluate port conflicts and security requirements before using it.`
  },
  {
    question: "16. What is Port Mapping in Docker?",
    answer: `Port mapping connects a port on the Docker host to a port inside a container. It allows external clients to access an application running inside the container.

The docker run command supports port mapping through the -p option. The mapping identifies the host port and the container port.

For example, running an Nginx container with port 8080 mapped to container port 80 allows users to access the web server through the host's port 8080.

Port mapping is commonly used to expose web applications, APIs, and development services.`
  },
  {
    question: "17. What is Docker Compose?",
    answer: `Docker Compose is a tool used to define and manage multi-container applications through a YAML configuration file.

The configuration describes application services, images, networks, volumes, environment variables, and dependencies. A single Compose command can start or stop the defined application environment.

For example, an application may require separate frontend, backend, and MySQL containers. Docker Compose allows all three services to be configured and managed together.

It simplifies local development, testing, and smaller multi-container deployments by reducing manual container management.`
  },
  {
    question: "18. What is a docker-compose.yml file?",
    answer: `A docker-compose.yml file is a YAML configuration file that describes the services and resources required by a Docker Compose application.

It can define container images, build instructions, port mappings, environment variables, networks, volumes, and service dependencies.

For example, a DevOps engineer can define a web application and its database in the same Compose file. Team members can use that file to start a consistent environment on their machines.

This configuration improves repeatability and makes multi-container application setup easier to maintain.`
  },
  {
    question: "19. What is Docker Swarm?",
    answer: `Docker Swarm is Docker's native container orchestration technology used to manage a cluster of Docker engines.

A Swarm cluster contains manager and worker nodes. Managers maintain cluster state and schedule services, while worker nodes run assigned tasks.

For example, an organization can deploy a web service with multiple replicas across several Docker hosts. Swarm can schedule containers and help maintain the requested number of replicas.

Docker Swarm provides basic orchestration features such as service scaling, service discovery, and load balancing.`
  },
  {
    question: "20. What is a Docker Service?",
    answer: `A Docker Service is a definition of the desired state of an application running in a Docker Swarm cluster.

It specifies details such as the container image, number of replicas, networking, and deployment configuration. Swarm managers work to maintain the requested service state.

For example, a service can be configured to run five replicas of a web application. If a task fails, Swarm can schedule a replacement to maintain the desired replica count.

Services simplify the deployment and management of replicated applications across a Swarm cluster.`
  },
  {
    question: "21. What is a Multi-stage Docker Build?",
    answer: `A multi-stage Docker build uses multiple FROM instructions in one Dockerfile to separate application building from the final runtime image.

The first stage can contain compilers, build tools, and dependencies required to compile the application. A later stage copies only the required build output into a smaller runtime image.

For example, a Java application can be compiled in a Maven build stage and then copied into a lightweight Java runtime image.

Multi-stage builds reduce final image size, remove unnecessary build tools, and help improve image security and deployment efficiency.`
  },
  {
    question: "22. What is Docker Layer Caching?",
    answer: `Docker layer caching is a build optimization technique in which Docker reuses previously generated image layers when the relevant instructions and inputs have not changed.

Each Dockerfile instruction can create a layer. When an instruction or its required files change, Docker may need to rebuild that layer and subsequent dependent layers.

For example, copying dependency files and installing packages before copying frequently changing application source code can help preserve dependency layers between builds.

Layer caching reduces build time and improves the efficiency of CI/CD pipelines.`
  },
  {
    question: "23. What is a Docker Tag?",
    answer: `A Docker tag is a label used to identify a particular version or variant of a Docker image.

Tags commonly represent application versions, release stages, or build identifiers. For example, an image may use tags such as 1.0, 2.0, staging, or a CI-generated build number.

A deployment pipeline can build an image, tag it with a release identifier, and push it to a container registry.

Using meaningful tags helps teams identify and deploy the intended image version. Production workflows should avoid relying only on the mutable latest tag.`
  },
  {
    question: "24. What is the difference between docker run and docker start?",
    answer: `The docker run command creates a new container from an image and starts it. It can also configure options such as ports, environment variables, volumes, and networking.

The docker start command starts an existing stopped container without creating a new container.

For example, an engineer can use docker run to create a new Nginx container. If that container is later stopped, docker start can start the same container again.

Understanding this difference helps prevent unnecessary container creation and supports effective container lifecycle management.`
  },
  {
    question: "25. What is the difference between docker stop and docker kill?",
    answer: `The docker stop command requests a graceful shutdown of a running container. Docker sends a termination signal and waits for the configured timeout before forcefully stopping the container if necessary.

The docker kill command sends a signal directly to the container, using SIGKILL by default, which terminates it immediately.

For example, a database container should normally be stopped gracefully so that the database can complete shutdown operations. The kill command may be required when a container does not respond.

Graceful stopping is generally preferred to reduce the risk of interrupted operations.`
  },
  {
    question: "26. What is Docker Logging?",
    answer: `Docker logging captures output generated by applications running inside containers. Docker provides logging drivers that determine how container logs are collected and stored.

The default json-file logging driver stores container standard output and standard error in JSON-formatted files. Other drivers can forward logs to centralized logging systems.

For example, when a web application returns errors, an engineer can use docker logs to inspect the container output and investigate the issue.

Logging helps teams troubleshoot application failures, monitor behavior, and integrate containers with centralized observability platforms.`
  },
  {
    question: "27. How do you troubleshoot a Docker container that keeps restarting?",
    answer: `A Docker container may repeatedly restart because of application errors, incorrect startup commands, missing configuration, unavailable dependencies, or failed health checks.

The first step is to inspect the container status using docker ps -a. The engineer can then review application output using docker logs and inspect configuration using docker inspect.

For example, a backend container may restart because it cannot connect to its database. Checking the logs and network configuration can help identify the connection failure.

Troubleshooting should focus on the original application error rather than repeatedly restarting the container.`
  },
  {
    question: "28. What is a Docker Health Check?",
    answer: `A Docker health check is a mechanism used to determine whether an application inside a container is functioning correctly.

A Dockerfile or container configuration can define a command that Docker executes periodically. Based on the command result, the container health status can be reported as starting, healthy, or unhealthy.

For example, an Nginx container can use an HTTP request to check whether its web endpoint responds successfully.

Health checks help operations teams identify applications that are running as processes but are not actually serving requests correctly.`
  },
  {
    question: "29. What is Docker Resource Limiting?",
    answer: `Docker resource limiting allows administrators to control the CPU and memory resources available to containers.

Without appropriate limits, a containerized application may consume excessive host resources and affect other workloads. Docker provides options for configuring CPU shares, CPU limits, and memory limits.

For example, a development container can be restricted to a defined memory allocation so that an accidental memory-intensive process does not consume all host memory.

Resource limits improve workload isolation, host stability, and resource planning in container environments.`
  },
  {
    question: "30. What is Docker Prune?",
    answer: `Docker prune commands remove unused Docker resources such as stopped containers, unused networks, dangling images, and build cache.

Over time, repeated builds and deployments can leave unused resources on a Docker host. These resources consume disk space even when they are no longer required.

For example, a CI server that builds images every day may accumulate unused build cache and old containers. An engineer can review Docker disk usage and remove unnecessary resources using suitable prune commands.

Prune operations should be used carefully because removing resources that are still needed can affect workloads or future builds.`
  },
  {
    question: "31. What is Docker-in-Docker?",
    answer: `Docker-in-Docker, commonly called DinD, is an approach in which a Docker daemon runs inside a container so that Docker commands can build and manage other containers.

It is sometimes used in CI/CD environments where a pipeline needs to build container images. The setup requires careful consideration of daemon access, storage, and security.

For example, a CI job may use a Docker-enabled runner to build an application image and push it to a registry.

DinD can support isolated build workflows, but teams should evaluate alternatives such as remote Docker daemons or rootless build tools.`
  },
  {
    question: "32. What is a Docker Manifest?",
    answer: `A Docker image manifest contains metadata describing an image and the layers and configuration required to retrieve it.

A manifest list, also called a multi-platform image index, can reference image variants built for different operating system and CPU architectures.

For example, a team can publish an application image that supports both AMD64 and ARM64 systems. Docker can select the appropriate image variant for the target platform.

Manifests help container registries distribute the correct image content to different environments and hardware architectures.`
  },
  {
    question: "33. How do you reduce Docker image size?",
    answer: `Docker image size can be reduced by selecting suitable minimal base images, using multi-stage builds, removing unnecessary packages, and avoiding temporary build files in the final image.

Dockerfile instructions should be organized carefully so that unnecessary files are not included in the image. A .dockerignore file can exclude items such as local dependencies, logs, and development files from the build context.

For example, a Java application can be compiled in a Maven stage and copied into a smaller runtime stage.

Smaller images generally require less storage and can improve image transfer and deployment times.`
  },
  {
    question: "34. What are Docker security best practices?",
    answer: `Docker security best practices help protect containerized applications, images, and the underlying host system.

Teams should use trusted base images, scan images for known vulnerabilities, avoid embedding passwords in images, and run containers as non-root users whenever possible. Unnecessary Linux capabilities and exposed ports should also be restricted.

For example, a production API container should receive database credentials through a secure secret-management mechanism instead of storing them in its Dockerfile.

Applying these controls reduces attack surface and improves the security of container-based deployments.`
  },
  {
    question: "35. How is Docker used in a CI/CD pipeline?",
    answer: `Docker is commonly used in CI/CD pipelines to package applications into consistent images that can be tested and deployed across environments.

A pipeline can retrieve source code, run tests, build a Docker image, scan it for vulnerabilities, and push the approved image to a container registry. A deployment stage can then pull that exact image into a test or production environment.

For example, a Jenkins pipeline can build a Java application image and publish it to Amazon ECR before deploying it to Amazon EKS.

Docker makes application delivery repeatable and helps reduce differences between development, testing, and production environments.`
  }
];
