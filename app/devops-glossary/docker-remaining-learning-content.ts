import type { GlossaryLearningSection } from "./glossary-data";

const bilingual = (telugu: string, english: string) =>
  `Telugu Answer:\n${telugu}\n\nEnglish Explanation:\n${english}`;

export const dockerRemainingLearningContent: Record<string, GlossaryLearningSection[]> = {
  "Docker": [
    {
      title: "1. Purpose – Why Is It Used?",
      items: [{
        title: "Docker ante enti?",
        explanation: bilingual(
          "Docker anedi containerization platform. Application code, runtime, libraries and dependencies ni image ga package chesi containers lo run cheyyadaniki use chestham. Developer laptop lo work ayina application, same image use chesi testing and production environments lo kuda consistent ga run avuthundi. Containers host operating system kernel ni share chesukuntayi kabatti virtual machines kanna lightweight ga untayi.",
          "Docker is a containerization platform that packages applications and their dependencies into images and runs them as isolated containers. It provides consistent environments across development, testing, and production. Containers share the host operating system kernel, so they generally require fewer resources than full virtual machines."
        ),
        example: "E-commerce project lo frontend, backend API and worker services ni separate Docker containers lo run cheyyachu."
      }]
    },
    {
      title: "2. How It Works",
      items: [{
        title: "Docker image nunchi container ela create avuthundi?",
        explanation: bilingual(
          "Developer Dockerfile create chesi docker build command tho image build chesthadu. Image registry lo store cheyyachu. Docker run command execute chesinappudu Docker Engine image ni use chesi container create chesthundi. Container ki writable layer, process isolation, network configuration and optional storage mounts untayi.",
          "A Dockerfile defines image build instructions. Docker builds an image from those instructions. When docker run is executed, the Docker Engine creates a container from the image, configures its process environment, networking, storage mounts, and writable layer."
        ),
        commands: [
          "docker build -t shop-api:1.0 .",
          "docker run -d --name shop-api -p 8080:8080 shop-api:1.0"
        ]
      }]
    },
    {
      title: "3. Real-Time Project Example",
      items: [{
        title: "E-commerce application deployment",
        explanation: bilingual(
          "Oka e-commerce project lo frontend React application, backend Node.js API, database PostgreSQL untayi. Frontend and API ki separate images build chestham. PostgreSQL ki official image use chestham. Services ni Docker network lo connect chestham. Database data container delete ayina lose kakunda named volume use chestham.",
          "In an e-commerce project, the React frontend, Node.js API, and PostgreSQL database can run as separate containers. The services communicate over a Docker network, while a named volume preserves database data when a container is replaced."
        ),
        example: "Frontend container port 3000, API container port 8080, PostgreSQL container port 5432 use chesthayi. Database port ni public internet ki expose cheyyakunda internal network lo maintain cheyyali."
      }]
    },
    {
      title: "4. Architecture / Components",
      items: [{
        title: "Docker architecture components",
        explanation: bilingual(
          "Docker Client commands accept chesthundi. Docker Daemon containers, images, networks and volumes manage chesthundi. Docker Registry images store chesthundi. Docker Engine client-server architecture and required runtime components provide chesthundi. Containerd and OCI runtime components container lifecycle lo participate chesthayi.",
          "The Docker Client accepts user commands and communicates with the Docker Daemon through an API. The daemon manages Docker objects. Registries store images. Containerd and an OCI-compatible runtime participate in container lifecycle operations."
        ),
        details: [
          "Docker Client: CLI interface used to issue commands.",
          "Docker Daemon: manages images, containers, networks and volumes.",
          "Registry: stores and distributes container images.",
          "Containerd: manages container lifecycle operations.",
          "OCI runtime: creates and runs container processes."
        ]
      }]
    },
    {
      title: "5. Step-by-Step Workflow",
      items: [{
        title: "Application deployment workflow",
        explanation: bilingual(
          "First source code prepare chestham. Dockerfile create chesi image build chestham. Image ni test chesi registry ki push chestham. Deployment server image pull chesi container create chesthundi. Ports, environment variables, volumes, networks and health checks configure chesi application verify chestham.",
          "The workflow starts with application source code and a Dockerfile. The image is built and tested, then pushed to a registry. The deployment environment pulls the image, creates containers, configures runtime settings, and verifies application health."
        ),
        details: [
          "1. Prepare application source code.",
          "2. Create and review Dockerfile.",
          "3. Build and tag the image.",
          "4. Test the image locally.",
          "5. Scan and push the image to a registry.",
          "6. Pull the approved image in the deployment environment.",
          "7. Start the container and verify logs and health."
        ]
      }]
    },
    {
      title: "6. Practical Commands",
      items: [{
        title: "Docker daily administration commands",
        explanation: bilingual(
          "Docker commands use chesi images, containers, logs and resource usage inspect cheyyachu. Production lo delete commands execute cheyyadaniki mundu correct container identify cheyyali. Important data volumes lo persist avuthundo verify cheyyali.",
          "Docker CLI commands help administrators inspect images, containers, logs, and resource usage. Before removing production containers, verify the target resource and confirm that persistent data is stored safely."
        ),
        commands: [
          "docker version",
          "docker info",
          "docker images",
          "docker pull nginx:stable",
          "docker ps -a",
          "docker inspect <container>",
          "docker logs --tail 100 <container>",
          "docker stats",
          "docker stop <container>",
          "docker start <container>",
          "docker rm <container>"
        ]
      }]
    },
    {
      title: "7. Configuration Examples",
      items: [{
        title: "Container port, environment and volume configuration",
        explanation: bilingual(
          "Container start chesetappudu host port and container port mapping configure cheyyachu. Environment variables application settings pass cheyyadaniki use avuthayi. Named volumes persistent data store chesthayi. Sensitive passwords ni command history lo expose cheyyakunda secrets management solution use cheyyali.",
          "Docker runtime options configure port mappings, environment variables, and persistent storage. Named volumes preserve data independently of container lifecycle. Sensitive credentials should be supplied through an appropriate secrets-management mechanism."
        ),
        commands: [
          "docker run -d --name web -p 8080:80 nginx:stable",
          "docker run -d --name api -e NODE_ENV=production -p 3000:3000 shop-api:1.0",
          "docker volume create postgres-data",
          "docker run -d --name db -v postgres-data:/var/lib/postgresql/data postgres:16"
        ]
      }]
    },
    {
      title: "8. Common Mistakes",
      items: [{
        title: "Docker usage lo common errors",
        explanation: bilingual(
          "Container ni remove chesinappudu data kuda pothundi ani users expect cheyyakapovachu. Image tag pin cheyyakunda latest use cheyyadam unexpected updates ki reason avuthundi. Application ni root user ga run cheyyadam security risk. Host port already occupied unte container start avvadu. Dockerfile lo secrets store cheyyadam dangerous.",
          "Common mistakes include storing persistent data only in the container writable layer, relying on mutable image tags, running applications as root unnecessarily, ignoring port conflicts, and embedding credentials in image layers."
        ),
        details: [
          "Using latest without controlling image versions.",
          "Storing database data only inside the container filesystem.",
          "Exposing internal service ports publicly.",
          "Running privileged containers without a clear requirement.",
          "Ignoring container logs and resource limits."
        ]
      }]
    },
    {
      title: "9. Troubleshooting",
      items: [{
        title: "Container exits or becomes unhealthy",
        explanation: bilingual(
          "First docker ps -a tho container status check cheyyali. Exited status unte logs inspect cheyyali. Exit code, entrypoint, environment variables, dependencies and port mapping verify cheyyali. OOM kill suspicion unte memory usage and host kernel logs check cheyyali. Blind ga container restart cheyyadam badhulu root cause identify cheyyali.",
          "Start troubleshooting by checking container status and logs. Review the exit code, entrypoint, environment variables, dependencies, and port mappings. If an out-of-memory kill is suspected, inspect memory usage and host kernel logs before changing resource limits."
        ),
        commands: [
          "docker ps -a",
          "docker logs --tail 200 <container>",
          "docker inspect <container>",
          "docker stats",
          "docker events --since 15m"
        ]
      }]
    },
    {
      title: "10. Best Practices",
      items: [{
        title: "Production Docker best practices",
        explanation: bilingual(
          "Small trusted base images use cheyyali. Image versions pin cheyyali. Application ni non-root user tho run cheyyali. CPU and memory limits set cheyyali. Health checks, structured logs, image scanning and regular patching implement cheyyali. Persistent data ni volumes lo store cheyyali.",
          "Use trusted minimal base images, pin image versions, run processes as non-root users, define resource limits, configure health checks, centralize logs, scan images, and keep persistent data outside disposable container layers."
        ),
        details: [
          "Use multi-stage builds to reduce final image size.",
          "Use .dockerignore to exclude unnecessary build-context files.",
          "Pin base image versions or digests.",
          "Set CPU and memory limits based on measured workload needs.",
          "Use volumes for persistent application data."
        ]
      }]
    },
    {
      title: "11. Security Considerations",
      items: [{
        title: "Container security",
        explanation: bilingual(
          "Container ki minimum privileges ivvali. Docker socket access ni restrict cheyyali endukante socket access host-level control ivvagaladu. Secrets ni image lo bake cheyyakudadhu. Images vulnerability scan cheyyali. Required ports matrame expose cheyyali. Trusted registry nunchi verified images pull cheyyali.",
          "Apply least privilege to containers and restrict access to the Docker socket because it can provide extensive host control. Never bake secrets into images. Scan images, expose only required ports, and use trusted registries and verified image artifacts."
        ),
        commands: [
          "docker image inspect nginx:stable",
          "docker run --read-only --cap-drop ALL --security-opt no-new-privileges nginx:stable"
        ]
      }]
    },
    {
      title: "12. Interview Points",
      items: [{
        title: "Important Docker interview questions",
        explanation: bilingual(
          "Docker and virtual machine difference enti? Image and container difference enti? Docker Daemon role enti? Container data persistent ga ela maintain chestharu? Docker network enduku use chestharu? Image registry role enti? Production lo container security ela implement chestharu? Ee questions ki architecture and practical commands tho answer prepare avvali.",
          "Be prepared to explain Docker versus virtual machines, images versus containers, daemon responsibilities, persistent storage, container networking, registries, and production security. Support explanations with practical deployment examples."
        ),
        details: [
          "Docker image is a template; a container is an instance created from it.",
          "Containers share the host kernel; virtual machines run separate guest operating systems.",
          "Volumes preserve data beyond container replacement.",
          "Docker networks provide connectivity between containers.",
          "Registries distribute container images."
        ]
      }]
    },
    {
      title: "13. Related Concepts",
      items: [{
        title: "Docker ecosystem concepts",
        explanation: bilingual(
          "Docker ni complete ga understand cheyyadaniki Dockerfile, Docker Image, Docker Container, Docker Engine, Registry, Volume, Bind Mount, Network and Docker Compose concepts connect chesi study cheyyali. Ee components kalisi application packaging and runtime environment provide chesthayi.",
          "Docker works with related concepts such as Dockerfiles, images, containers, the Docker Engine, registries, volumes, bind mounts, networks, and Docker Compose. Together they support application packaging and runtime management."
        ),
        details: ["Dockerfile", "Docker Image", "Docker Container", "Docker Engine", "Docker Registry", "Docker Volume", "Docker Network", "Docker Compose"]
      }]
    }
  ],

  "Dockerfile": [
    {
      title: "1. Purpose – Why Is Dockerfile Used?",
      items: [{
        title: "Dockerfile ante enti?",
        explanation: bilingual(
          "Dockerfile anedi image build instructions unna text file. Base image, working directory, dependency installation, source files, environment settings and startup command define chestham. Docker build command ee instructions execute chesi image create chesthundi. Manual server setup badhulu repeatable image build process provide chesthundi.",
          "A Dockerfile is a text file containing instructions for building a container image. It defines the base image, working directory, dependencies, application files, runtime settings, and startup command. Docker uses these instructions to create a repeatable image build."
        ),
        example: "Node.js API ki Node base image select chesi package files copy chesi npm ci run chesi application startup command define cheyyachu."
      }]
    },
    {
      title: "2. How It Works",
      items: [{
        title: "Docker build process",
        explanation: bilingual(
          "Docker build command Dockerfile and build context ni Docker Engine ki provide chesthundi. Docker instructions order lo process avuthayi. FROM base layer select chesthundi. RUN build-time commands execute chesthundi. COPY files image loki copy chesthundi. Final image layers create avuthayi. Cache use chesi unchanged build steps repeat execution avoid cheyyachu.",
          "The docker build command sends the Dockerfile and build context to the builder. Instructions are processed in order. Base images and filesystem changes form image layers. Build cache can reuse unchanged steps to improve build performance."
        ),
        commands: ["docker build -t node-api:1.0 .", "docker history node-api:1.0"]
      }]
    },
    {
      title: "3. Real-Time Project Example",
      items: [{
        title: "Node.js application image build",
        explanation: bilingual(
          "Node.js backend project lo package.json and package-lock.json first copy chestham. npm ci tho lock file prakaram dependencies install chestham. Tarvatha source code copy chesi non-root user tho application start chestham. Production image lo development dependencies and unnecessary files include cheyyakunda multi-stage build use cheyyachu.",
          "For a Node.js backend, copy package manifests first and install locked dependencies using npm ci. Then copy application source and run the service as a non-root user. Multi-stage builds can keep development tooling out of the final production image."
        ),
        example: "CI pipeline lo code commit vachinappudu Dockerfile use chesi node-api image build, test, scan and registry ki push chestham."
      }]
    },
    {
      title: "4. Architecture / Components",
      items: [{
        title: "Important Dockerfile instructions",
        explanation: bilingual(
          "FROM base image select chesthundi. WORKDIR working directory set chesthundi. COPY build context files copy chesthundi. RUN image build time lo commands execute chesthundi. ENV environment variables define chesthundi. EXPOSE intended listening port document chesthundi. USER runtime user set chesthundi. CMD default command provide chesthundi. ENTRYPOINT main executable define chesthundi.",
          "FROM selects a base image. WORKDIR sets the working directory. COPY adds files from the build context. RUN executes build-time commands. ENV defines environment variables. EXPOSE documents the intended port. USER selects the user. CMD provides default arguments or a command, while ENTRYPOINT defines the main executable."
        ),
        details: [
          "ARG: build-time variables.",
          "ENV: environment variables available in the image and runtime.",
          "ADD: copies files and supports additional archive and URL behaviour; COPY is preferred for ordinary file copying.",
          "VOLUME: declares a mount point.",
          "HEALTHCHECK: defines a container health-check command.",
          "SHELL: changes the shell used by shell-form instructions."
        ]
      }]
    },
    {
      title: "5. Step-by-Step Workflow",
      items: [{
        title: "Dockerfile creation workflow",
        explanation: bilingual(
          "Application requirements identify cheyyali. Suitable base image select cheyyali. Dependency files first copy chesi dependencies install cheyyali. Source code copy chesi startup configuration define cheyyali. Build run chesi image inspect and test cheyyali. Final image size and vulnerabilities review chesi registry ki publish cheyyali.",
          "Identify application runtime requirements, select a suitable base image, install dependencies, copy application files, and define runtime behaviour. Build and test the image, inspect its contents, review vulnerabilities, and publish the approved artifact."
        ),
        details: [
          "1. Select a supported base image.",
          "2. Define WORKDIR.",
          "3. Copy dependency manifests.",
          "4. Install dependencies with reproducible commands.",
          "5. Copy application source.",
          "6. Configure USER and startup instructions.",
          "7. Build, test and scan the image."
        ]
      }]
    },
    {
      title: "6. Practical Commands",
      items: [{
        title: "Build and inspect Dockerfile images",
        explanation: bilingual(
          "Dockerfile directory lo build command execute cheyyali. -f option use chesi custom Dockerfile path specify cheyyachu. --no-cache use chesthe cached build layers reuse avvavu. Build ayina image ni history and inspect commands tho examine cheyyachu.",
          "Use docker build from the directory containing the build context. The -f option selects a Dockerfile path. --no-cache disables reuse of cached build layers. Inspect the resulting image with history and inspect commands."
        ),
        commands: [
          "docker build -t app:1.0 .",
          "docker build -f Dockerfile.prod -t app:prod .",
          "docker build --no-cache -t app:test .",
          "docker image history app:1.0",
          "docker image inspect app:1.0",
          "docker run --rm app:1.0"
        ]
      }]
    },
    {
      title: "7. Configuration Examples",
      items: [{
        title: "Production-oriented Node.js Dockerfile",
        explanation: bilingual(
          "Ee example Node.js application ki dependency installation and runtime user configure chesthundi. package files first copy cheyyadam valla source code change ayina dependency layer cache reuse avvachu. Production project lo application-specific health check and graceful shutdown behaviour kuda configure cheyyali.",
          "This example installs Node.js dependencies before copying the remaining source files, improving cache reuse when application code changes. Production applications should also implement appropriate health checks and graceful shutdown handling."
        ),
        commands: [
          "FROM node:22-alpine",
          "WORKDIR /app",
          "COPY package*.json ./",
          "RUN npm ci --omit=dev",
          "COPY --chown=node:node . .",
          "USER node",
          "EXPOSE 3000",
          "CMD [\"node\", \"server.js\"]"
        ],
        example: "Build: docker build -t node-api:1.0 ."
      }]
    },
    {
      title: "8. Common Mistakes",
      items: [{
        title: "Dockerfile lo jarige common errors",
        explanation: bilingual(
          "COPY source path wrong unte build fail avuthundi. package files copy cheyyakunda full source copy chesi dependency install chesthe cache efficiency tagguthundi. RUN commands unnecessary ga separate layers create cheyyachu. Secrets ARG or ENV lo pettadam image metadata and layers lo leak avvachu. CMD and ENTRYPOINT difference ardham kakapothe startup behaviour unexpected ga untundi.",
          "Common Dockerfile mistakes include incorrect COPY paths, inefficient dependency caching, unnecessary image layers, embedding secrets in build arguments or environment variables, and misunderstanding CMD and ENTRYPOINT behaviour."
        ),
        details: [
          "Using an unmaintained or unnecessarily large base image.",
          "Copying the entire repository before dependency installation.",
          "Leaving credentials in image layers.",
          "Running the application as root without a reason.",
          "Using shell commands that leave package caches behind."
        ]
      }]
    },
    {
      title: "9. Troubleshooting",
      items: [{
        title: "Docker build failure diagnostics",
        explanation: bilingual(
          "Build fail ayithe first exact failing instruction identify cheyyali. COPY error unte build context and .dockerignore inspect cheyyali. Package install fail ayithe repository access, package lock and network verify cheyyali. Permission error unte file ownership and USER instruction check cheyyali. Cache issue suspicion unte controlled ga --no-cache tho rebuild cheyyali.",
          "When a build fails, identify the exact failing instruction. For COPY failures, inspect the build context and .dockerignore. For dependency failures, verify package manifests, repository access, and network connectivity. For permission errors, review file ownership and the configured user."
        ),
        commands: [
          "docker build --progress=plain -t app:test .",
          "docker build --no-cache --progress=plain -t app:test .",
          "docker image history app:test"
        ]
      }]
    },
    {
      title: "10. Best Practices",
      items: [{
        title: "Maintainable Dockerfile practices",
        explanation: bilingual(
          "Small trusted base image select cheyyali. Dependency manifest first copy cheyyali. Reproducible package installation use cheyyali. .dockerignore maintain cheyyali. Multi-stage builds tho build tools final image nunchi remove cheyyali. Non-root user use cheyyali. Image versions pin cheyyali and automated scanning implement cheyyali.",
          "Use trusted minimal base images, copy dependency manifests early, use reproducible installation commands, maintain a .dockerignore file, apply multi-stage builds, run as non-root, pin image versions, and scan built images."
        ),
        details: [
          "Prefer COPY over ADD for ordinary file copying.",
          "Combine related cleanup operations with package installation where appropriate.",
          "Avoid unnecessary files in the build context.",
          "Keep build-time dependencies out of runtime images.",
          "Review image size and vulnerability reports."
        ]
      }]
    },
    {
      title: "11. Security Considerations",
      items: [{
        title: "Dockerfile security controls",
        explanation: bilingual(
          "Passwords, API tokens and private keys ni Dockerfile lo hardcode cheyyakudadhu. BuildKit secrets or approved secret management use cheyyali. Trusted base images use cheyyali. Non-root USER configure cheyyali. Unnecessary packages remove cheyyali. Image scan and provenance verification pipeline lo include cheyyali.",
          "Never hardcode passwords, API tokens, or private keys in a Dockerfile. Use BuildKit secret mounts or an approved secret-management workflow. Use trusted base images, non-root users, minimal packages, vulnerability scanning, and artifact verification."
        ),
        commands: [
          "docker build --check .",
          "docker image inspect app:1.0"
        ]
      }]
    },
    {
      title: "12. Interview Points",
      items: [{
        title: "Dockerfile interview questions",
        explanation: bilingual(
          "FROM and RUN difference enti? COPY and ADD difference enti? CMD and ENTRYPOINT ela work avuthayi? ARG and ENV difference enti? Docker layer caching ela work avuthundi? Multi-stage build enduku use chestham? Secrets ni secure ga build lo ela pass chestham? Ee topics ki practical Dockerfile examples tho prepare avvali.",
          "Prepare to explain FROM versus RUN, COPY versus ADD, CMD versus ENTRYPOINT, ARG versus ENV, layer caching, multi-stage builds, and secure build-time secret handling. Be ready to demonstrate how each instruction affects the resulting image."
        ),
        details: [
          "RUN executes during image build.",
          "CMD supplies default runtime command or arguments.",
          "ENTRYPOINT defines the main executable.",
          "ARG is available during build; ENV persists as image configuration.",
          "Multi-stage builds separate build dependencies from runtime artifacts."
        ]
      }]
    },
    {
      title: "13. Related Concepts",
      items: [{
        title: "Dockerfile related concepts",
        explanation: bilingual(
          "Dockerfile image creation process lo central role play chesthundi. Docker Image, Docker Container, Docker Engine, Docker Registry and Docker Compose tho kalipi study chesthe complete application packaging workflow ardham avuthundi.",
          "Dockerfile is central to image creation. Understanding it alongside Docker images, containers, the Docker Engine, registries, and Docker Compose provides a complete view of container packaging and deployment."
        ),
        details: ["Docker", "Docker Image", "Docker Container", "Docker Engine", "Docker Registry", "Docker Compose", "Multi-stage Build"]
      }]
    }
  ]
};
