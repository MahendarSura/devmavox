
"use client";

import { useMemo, useState } from "react";

type Lesson = {
  title: string;
  description: string;
  topics: string[];
  commands?: string[];
  lab?: string;
};

type Module = {
  title: string;
  level: string;
  objective: string;
  lessons: Lesson[];
};

const modules: Module[] = [
  {
    title: "01. Docker Fundamentals",
    level: "Beginner",
    objective: "Understand containers, images, and the Docker platform.",
    lessons: [
      {
        title: "Introduction to Docker",
        description:
          "Docker packages an application and its dependencies into a container image so it can run consistently across supported environments.",
        topics: [
          "What is Docker?",
          "Why DevOps engineers use Docker",
          "Containers versus virtual machines",
          "Benefits and limitations of containers",
          "Docker use cases in development and production",
          "Docker Community Edition and Docker Desktop",
        ],
        commands: ["docker --version", "docker info", "docker --help"],
        lab: "Install Docker in a supported environment and verify the installation.",
      },
      {
        title: "Docker Architecture",
        description:
          "Understand how the Docker client communicates with the Docker daemon and how images and containers are managed.",
        topics: [
          "Docker client and Docker daemon",
          "Docker Engine and REST API",
          "Container runtime concepts",
          "Image registries",
          "Container lifecycle",
          "High-level OCI image and runtime standards",
        ],
        commands: [
          "docker version",
          "docker info",
          "docker context ls",
          "docker system df",
        ],
        lab: "Inspect your Docker environment and identify the client, engine, images, and running containers.",
      },
      {
        title: "First Docker Container",
        description:
          "Run an existing image, publish a port, inspect the application, and remove the container.",
        topics: [
          "Pulling an image",
          "Foreground and detached containers",
          "Container names and IDs",
          "Port publishing",
          "Container logs",
          "Stopping, starting, and removing containers",
        ],
        commands: [
          "docker pull nginx",
          "docker run -d --name web -p 8080:80 nginx",
          "docker ps",
          "docker logs web",
          "docker stop web",
          "docker rm web",
        ],
        lab: "Run NGINX and open http://localhost:8080. Stop and remove the container after testing.",
      },
    ],
  },
  {
    title: "02. Images and Container Management",
    level: "Beginner",
    objective: "Manage images and understand container execution.",
    lessons: [
      {
        title: "Image and Container Lifecycle",
        description:
          "Learn the difference between an image template and a running container instance.",
        topics: [
          "Image layers and container writable layers",
          "Image tags and digests",
          "Container states",
          "Restart policies",
          "Container environment variables",
          "Inspecting container configuration",
        ],
        commands: [
          "docker images",
          "docker ps -a",
          "docker inspect web",
          "docker start web",
          "docker stats",
          "docker rm -f web",
        ],
        lab: "Create multiple containers, inspect their states, and compare their configurations.",
      },
      {
        title: "Logs and Interactive Debugging",
        description:
          "Diagnose container problems using logs, process inspection, and resource statistics.",
        topics: [
          "Reading standard output and error logs",
          "Following live logs",
          "Executing commands inside containers",
          "Checking container processes",
          "Inspecting exit codes",
          "Understanding minimal images without a shell",
        ],
        commands: [
          "docker logs --tail 100 web",
          "docker logs -f web",
          "docker exec -it web sh",
          "docker top web",
          "docker inspect web",
        ],
        lab: "Intentionally stop a test application and use logs and inspection to identify why it stopped.",
      },
    ],
  },
  {
    title: "03. Dockerfile and Image Building",
    level: "Beginner to Intermediate",
    objective: "Build reproducible, efficient application images.",
    lessons: [
      {
        title: "Dockerfile Instructions",
        description:
          "Create a Dockerfile that describes how to build an application image.",
        topics: [
          "FROM and base image selection",
          "WORKDIR and COPY",
          "RUN and package installation",
          "ENV and ARG",
          "EXPOSE versus actual port publishing",
          "CMD versus ENTRYPOINT",
          "USER, LABEL and HEALTHCHECK",
          "Build context and .dockerignore",
        ],
        commands: [
          "docker build -t devmavox-app:1.0 .",
          "docker image ls",
          "docker history devmavox-app:1.0",
        ],
        lab: "Write a Dockerfile for a simple static website and build your own image.",
      },
      {
        title: "Node.js Application Containerization",
        description:
          "Package an application with its runtime dependencies and expose its application port.",
        topics: [
          "Application source code and package manifests",
          "Dependency installation",
          "Production start commands",
          "Port configuration",
          "Environment-based configuration",
          "Container startup and exit debugging",
        ],
        commands: [
          "docker build -t devmavox-node-app:1.0 .",
          "docker run --rm -p 3000:3000 devmavox-node-app:1.0",
        ],
        lab: "Containerize a small Node.js application. Confirm that it starts correctly and responds on the expected port.",
      },
      {
        title: "Image Optimization",
        description:
          "Reduce unnecessary image content and improve build efficiency without breaking the application.",
        topics: [
          "Layer caching",
          "Instruction ordering",
          "Multi-stage builds",
          "Minimal trusted base images",
          "BuildKit concepts",
          "Image size inspection",
          "Reproducible builds and dependency pinning",
        ],
        commands: [
          "docker build --no-cache -t devmavox-app:test .",
          "docker build --progress=plain -t devmavox-app:test .",
          "docker image inspect devmavox-app:test",
        ],
        lab: "Build an application with multiple stages and compare its final image size with the original.",
      },
    ],
  },
  {
    title: "04. Docker Storage",
    level: "Intermediate",
    objective: "Persist application data safely outside disposable containers.",
    lessons: [
      {
        title: "Volumes and Bind Mounts",
        description:
          "Choose the correct storage mechanism for persistent application data and local development.",
        topics: [
          "Container writable layer limitations",
          "Named and anonymous volumes",
          "Bind mounts",
          "Read-only mounts",
          "Volume inspection",
          "Data persistence after container replacement",
        ],
        commands: [
          "docker volume create app-data",
          "docker volume ls",
          "docker volume inspect app-data",
          "docker run --rm -v app-data:/data alpine",
        ],
        lab: "Write a test file to a named volume, remove the container, and verify the data from a new container.",
      },
      {
        title: "Database Persistence and Recovery",
        description:
          "Practice persistence and backups using a disposable test database.",
        topics: [
          "Database data directories",
          "Volume ownership and permissions",
          "Logical database backups",
          "Restore verification",
          "Storage capacity monitoring",
          "Backup security",
        ],
        lab: "Run a test database with a named volume, create a logical backup, and restore it into a separate test instance.",
      },
    ],
  },
  {
    title: "05. Docker Networking",
    level: "Intermediate",
    objective: "Connect containers and troubleshoot connectivity failures.",
    lessons: [
      {
        title: "Networking Fundamentals",
        description:
          "Learn how container network isolation, addresses, published ports, and name resolution work.",
        topics: [
          "Bridge networking",
          "User-defined bridge networks",
          "Port publishing and host ports",
          "Container IP addresses",
          "Container DNS and service discovery",
          "Host networking limitations",
          "Network isolation and firewall interactions",
        ],
        commands: [
          "docker network ls",
          "docker network create app-network",
          "docker network inspect app-network",
          "docker network connect app-network web",
          "docker network disconnect app-network web",
        ],
        lab: "Connect two test containers to a user-defined network and verify communication by container name.",
      },
      {
        title: "Application Connectivity",
        description:
          "Identify whether a connection problem originates from the application, port mapping, DNS, or network.",
        topics: [
          "Application listening address",
          "Host port conflicts",
          "Container-to-container ports",
          "DNS lookup failures",
          "Network aliases",
          "Inspecting connection errors",
        ],
        lab: "Break a test application's port configuration, diagnose the failure, and correct the mapping.",
      },
    ],
  },
  {
    title: "06. Docker Compose",
    level: "Intermediate",
    objective: "Run multi-container applications from a declarative configuration.",
    lessons: [
      {
        title: "Compose Fundamentals",
        description:
          "Define an application and its services, networks, volumes, and configuration in a Compose file.",
        topics: [
          "Compose YAML structure",
          "Services, images, and build",
          "Ports and environment variables",
          "Networks and volumes",
          "Configuration validation",
          "Compose project naming",
        ],
        commands: [
          "docker compose config",
          "docker compose up -d",
          "docker compose ps",
          "docker compose logs -f",
          "docker compose down",
        ],
        lab: "Create a Compose project that runs an NGINX service and a separate application service.",
      },
      {
        title: "Production-Style Compose",
        description:
          "Improve a multi-service setup with health checks, configuration management, and operational controls.",
        topics: [
          "Health checks",
          "Service dependencies and readiness",
          "Restart policies",
          "Environment files",
          "Secrets handling",
          "Resource constraints where supported",
          "Compose profiles",
          "Graceful shutdown",
        ],
        commands: [
          "docker compose up -d --build",
          "docker compose ps",
          "docker compose logs --tail 100",
          "docker compose restart",
        ],
        lab: "Deploy a test web application and database with health checks, persistent storage, and externalized configuration.",
      },
    ],
  },
  {
    title: "07. Docker Registry and Image Distribution",
    level: "Intermediate",
    objective: "Publish and retrieve versioned images securely.",
    lessons: [
      {
        title: "Docker Hub and Private Registries",
        description:
          "Understand registry authentication, repository naming, and image distribution.",
        topics: [
          "Registry and repository concepts",
          "Docker Hub",
          "Private registries",
          "Image tags and immutable digests",
          "Authentication and access permissions",
          "Pull policies and version promotion",
        ],
        commands: [
          "docker login",
          "docker tag devmavox-app:1.0 USERNAME/devmavox-app:1.0",
          "docker push USERNAME/devmavox-app:1.0",
          "docker pull USERNAME/devmavox-app:1.0",
          "docker logout",
        ],
        lab: "Publish a test image to your own authorized registry and pull it onto another environment.",
      },
    ],
  },
  {
    title: "08. Docker Security",
    level: "Advanced",
    objective: "Reduce container risk using least privilege and secure image practices.",
    lessons: [
      {
        title: "Container Security Fundamentals",
        description:
          "Apply security controls at image build time and container runtime.",
        topics: [
          "Run as a non-root user",
          "Linux capabilities",
          "Read-only root filesystem",
          "Container privilege boundaries",
          "Secrets versus ordinary environment variables",
          "Host socket access risks",
          "Resource limits and denial-of-service prevention",
        ],
        commands: [
          "docker inspect devmavox-app:1.0",
          "docker run --read-only --tmpfs /tmp nginx",
          "docker run --user 10001:10001 nginx",
        ],
        lab: "Run a test container with reduced privileges and document which operations are no longer permitted.",
      },
      {
        title: "Supply Chain and Image Scanning",
        description:
          "Evaluate image vulnerabilities and establish a repeatable image trust process.",
        topics: [
          "Base image maintenance",
          "Vulnerability scanning",
          "Software bill of materials concepts",
          "Image signing and provenance concepts",
          "Dependency updates",
          "Secret scanning",
          "CI security gates",
        ],
        lab: "Scan a test image with an approved scanner, review findings, update vulnerable dependencies, and rescan.",
      },
    ],
  },
  {
    title: "09. Production Operations and Monitoring",
    level: "Advanced",
    objective: "Operate containers reliably and investigate production symptoms.",
    lessons: [
      {
        title: "Health and Resource Management",
        description:
          "Distinguish application health from process status and manage container resource usage.",
        topics: [
          "Health checks",
          "CPU and memory constraints",
          "Container restart behavior",
          "Graceful shutdown and signals",
          "Log collection",
          "Disk and image cleanup",
          "Metrics and alerting concepts",
        ],
        commands: [
          "docker stats",
          "docker events",
          "docker system df",
          "docker inspect web",
          "docker logs --since 10m web",
        ],
        lab: "Set appropriate resource limits for a test container and observe the results under controlled load.",
      },
      {
        title: "Production Troubleshooting",
        description:
          "Follow a structured incident workflow instead of randomly restarting containers.",
        topics: [
          "Collect symptoms and timestamps",
          "Inspect exit code and recent logs",
          "Verify configuration and dependencies",
          "Check CPU, memory, disk, and network",
          "Determine immediate mitigation",
          "Validate the fix",
          "Write a root cause analysis",
        ],
        lab: "Simulate a failed application, capture evidence, identify the root cause, and write a short incident report.",
      },
    ],
  },
  {
    title: "10. Docker CI/CD Integration",
    level: "Advanced",
    objective: "Automate container builds, checks, publication, and deployment.",
    lessons: [
      {
        title: "Jenkins and GitHub Actions",
        description:
          "Build and test images automatically when application code changes.",
        topics: [
          "Source control triggers",
          "Automated Docker builds",
          "Unit tests and image checks",
          "Registry credentials",
          "Image tagging by commit",
          "Pipeline artifacts and logs",
          "Deployment approvals",
        ],
        lab: "Build a pipeline that tests an application, builds an image, scans it, and pushes it to a registry only after successful checks.",
      },
      {
        title: "Deployment and Rollback",
        description:
          "Promote tested images and recover from an unsuccessful deployment.",
        topics: [
          "Immutable image versions",
          "Environment promotion",
          "Configuration separation",
          "Deployment health verification",
          "Rollback planning",
          "Secrets management in pipelines",
          "Deployment audit trail",
        ],
        lab: "Deploy version 1 of a test application, promote version 2, and demonstrate a controlled rollback.",
      },
    ],
  },
  {
    title: "11. Docker with Kubernetes and AWS",
    level: "Advanced",
    objective: "Understand where Docker fits in modern container platforms.",
    lessons: [
      {
        title: "Docker and Kubernetes",
        description:
          "Understand the relationship between building OCI-compatible images and running workloads in Kubernetes.",
        topics: [
          "Container images in Kubernetes",
          "Image registries and pull credentials",
          "ImagePullBackOff troubleshooting",
          "Container runtime interfaces",
          "containerd and CRI-O concepts",
          "Why Kubernetes does not require the Docker Engine",
          "Image tags and deployment reproducibility",
        ],
        lab: "Build an application image, publish it to a registry, and deploy it to a suitable Kubernetes test cluster.",
      },
      {
        title: "Docker on AWS",
        description:
          "Connect image creation and registry workflows to AWS container services.",
        topics: [
          "Amazon ECR repositories",
          "IAM permissions for image access",
          "EC2 container hosting",
          "ECS and EKS high-level architecture",
          "Registry authentication",
          "Container logs and monitoring in AWS",
          "Deployment and rollback considerations",
        ],
        lab: "Publish a test image to Amazon ECR and deploy it in an appropriately configured AWS test environment.",
      },
    ],
  },
  {
    title: "12. Real-World Projects",
    level: "Production Practice",
    objective: "Combine Docker skills into portfolio-ready projects.",
    lessons: [
      {
        title: "Project 1: Containerized Web Application",
        description:
          "Package and run a web application using a custom image.",
        topics: [
          "Create application source files",
          "Write a Dockerfile",
          "Build and run the image",
          "Publish the application port",
          "Inspect logs and runtime settings",
          "Document local setup instructions",
        ],
        lab: "Deliver a working containerized website with a Dockerfile and a README containing build and run instructions.",
      },
      {
        title: "Project 2: Application and Database",
        description:
          "Build a multi-service application using Docker Compose.",
        topics: [
          "Application and database services",
          "Service-to-service DNS",
          "Persistent database volume",
          "Environment configuration",
          "Health checks",
          "Backup and recovery",
        ],
        lab: "Deploy a test application and database with Compose, persist its data, and verify recovery after recreation.",
      },
      {
        title: "Project 3: CI/CD and Registry",
        description:
          "Automate the image delivery process from source commit to registry.",
        topics: [
          "Git repository integration",
          "Automated tests",
          "Docker image build",
          "Security scan",
          "Versioned image publication",
          "Deployment validation",
          "Rollback documentation",
        ],
        lab: "Build a reproducible CI/CD pipeline and document its successful and failed execution paths.",
      },
      {
        title: "Project 4: Production Incident Simulation",
        description:
          "Practice responding to common operational failures.",
        topics: [
          "Broken port mapping",
          "Application startup failure",
          "Missing environment variables",
          "Container memory exhaustion",
          "Registry authentication failure",
          "Database connectivity issue",
          "Incident report and prevention plan",
        ],
        lab: "Create a safe test environment, reproduce three failures, resolve each one, and document the evidence.",
      },
    ],
  },
  {
    title: "13. Docker Interview Preparation",
    level: "Career Preparation",
    objective: "Explain concepts clearly and solve scenario-based problems.",
    lessons: [
      {
        title: "Core Interview Questions",
        description:
          "Practise concise answers backed by commands and examples.",
        topics: [
          "What is Docker?",
          "Image versus container",
          "CMD versus ENTRYPOINT",
          "COPY versus ADD",
          "EXPOSE versus published ports",
          "Volumes versus bind mounts",
          "Docker Compose use cases",
          "Image layers and caching",
        ],
        lab: "Explain each concept aloud and demonstrate the relevant command in a test environment.",
      },
      {
        title: "Scenario-Based Interview Questions",
        description:
          "Use a systematic diagnostic approach to production-style questions.",
        topics: [
          "Why does a container exit immediately?",
          "Why is a published port unreachable?",
          "Why can one container not reach another?",
          "How do you debug a growing image or disk?",
          "How do you secure a container?",
          "How do you update an image safely?",
          "How would you build a Docker CI/CD pipeline?",
          "What changes when moving to Kubernetes?",
        ],
        lab: "Answer each scenario with symptoms, diagnostic steps, likely causes, a safe fix, and verification.",
      },
    ],
  },
];

const referenceCommands = [
  ["docker version", "Check Docker client and server versions."],
  ["docker ps -a", "List running and stopped containers."],
  ["docker images", "List locally available images."],
  ["docker logs <container>", "Read application logs."],
  ["docker inspect <container>", "Inspect container configuration and state."],
  ["docker exec -it <container> sh", "Open a shell if the image provides one."],
  ["docker stats", "View live container resource statistics."],
  ["docker volume ls", "List Docker volumes."],
  ["docker network ls", "List Docker networks."],
  ["docker compose config", "Validate and render Compose configuration."],
  ["docker system df", "Inspect Docker disk usage."],
  ["docker events", "Observe Docker daemon events."],
];

const troubleshooting = [
  {
    issue: "Container exits immediately",
    cause: "The main process may finish, crash, or use an incorrect startup command.",
    fix: "Inspect docker ps -a, docker logs, the exit code, and the configured command.",
  },
  {
    issue: "ImagePullBackOff or pull denied",
    cause: "The image name, tag, registry permissions, or credentials may be incorrect.",
    fix: "Verify the full image reference, test registry access, and correct the pull credentials.",
  },
  {
    issue: "Application port is unreachable",
    cause: "Port publishing may be missing, the port may conflict, or the application may listen on the wrong interface.",
    fix: "Inspect docker port, docker ps, application logs, and the application's listening address.",
  },
  {
    issue: "Containers cannot communicate",
    cause: "The containers may be on different networks or use an incorrect hostname or port.",
    fix: "Inspect docker network ls and docker network inspect, then verify service names and destination ports.",
  },
  {
    issue: "Container is out of memory",
    cause: "The application may have excessive memory use or an unsuitable memory limit.",
    fix: "Check docker stats, logs, exit details, and application memory behavior before adjusting limits.",
  },
  {
    issue: "Data disappears after recreation",
    cause: "Data may have been written only to the container's writable layer.",
    fix: "Use an appropriate volume or bind mount and verify the backup and restore procedure.",
  },
  {
    issue: "Docker disk usage is growing",
    cause: "Unused images, stopped containers, build cache, logs, or volumes may consume space.",
    fix: "Inspect docker system df and identify the data before removing anything. Do not prune volumes blindly.",
  },
  {
    issue: "Docker daemon is unavailable",
    cause: "The service may be stopped, the context may be incorrect, or the client may lack permission.",
    fix: "Check docker context ls, docker version, daemon status, and operating-system-specific service logs.",
  },
];

const projects = [
  "Containerize a static NGINX website",
  "Package a Node.js application using a multi-stage Dockerfile",
  "Run an application and database with Compose and persistent volumes",
  "Build and publish versioned images through a CI/CD pipeline",
  "Scan an image and apply container security controls",
  "Deploy a container image to a test Kubernetes or AWS environment",
];

export default function DockerRoadmapPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<number[]>([0]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<
    "roadmap" | "commands" | "troubleshooting" | "projects"
  >("roadmap");

  const allLessons = useMemo(
    () =>
      modules.flatMap((module, moduleIndex) =>
        module.lessons.map((lesson, lessonIndex) => ({
          id: `${moduleIndex}-${lessonIndex}`,
          module: module.title,
          lesson,
        }))
      ),
    []
  );

  const totalTopics = modules.reduce(
    (sum, module) =>
      sum +
      module.lessons.reduce(
        (lessonSum, lesson) => lessonSum + lesson.topics.length,
        0
      ),
    0
  );

  const filteredModules = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return modules;

    return modules
      .map((module) => ({
        ...module,
        lessons: module.lessons.filter((lesson) =>
          [
            module.title,
            module.objective,
            lesson.title,
            lesson.description,
            ...lesson.topics,
            ...(lesson.commands ?? []),
          ]
            .join(" ")
            .toLowerCase()
            .includes(term)
        ),
      }))
      .filter((module) => module.lessons.length > 0);
  }, [search]);

  const progress = Math.round((completed.length / totalTopics) * 100);

  function toggleTopic(topicId: string) {
    setCompleted((current) =>
      current.includes(topicId)
        ? current.filter((item) => item !== topicId)
        : [...current, topicId]
    );
  }

  function toggleModule(index: number) {
    setExpanded((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="relative overflow-hidden rounded-3xl border border-sky-500/30 bg-gradient-to-br from-sky-950 via-slate-900 to-slate-950 p-6 sm:p-10">
          <div className="relative z-10 max-w-4xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-sky-400">
              DevMavox · DevOps Learning Center
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
              Docker Learning Roadmap
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              A structured path from container fundamentals to image
              optimization, secure production operations, CI/CD, Kubernetes
              integration, real-world projects, and interview preparation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm text-sky-300">
                Beginner to Advanced
              </span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                Hands-on Learning
              </span>
              <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm text-violet-300">
                Production Practice
              </span>
            </div>
          </div>
        </header>

        <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ["13", "Learning modules"],
            [String(allLessons.length), "Lessons"],
            [String(totalTopics), "Learning checkpoints"],
            [String(projects.length), "Project ideas"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <p className="text-3xl font-black text-sky-400">{value}</p>
              <p className="mt-2 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Learning Progress</h2>
              <p className="mt-1 text-sm text-slate-400">
                Track each topic as you learn and practise it.
              </p>
            </div>
            <span className="text-2xl font-black text-sky-400">
              {progress}%
            </span>
          </div>
          <div
            className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-label="Docker learning progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-sky-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-slate-400">
            {completed.length} of {totalTopics} checkpoints completed.
          </p>
          <button
            type="button"
            onClick={() => setCompleted([])}
            className="mt-3 text-sm text-sky-400 underline hover:text-sky-300"
          >
            Reset progress
          </button>
        </section>

        <nav
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Docker learning sections"
        >
          {(
            [
              ["roadmap", "Learning Roadmap"],
              ["commands", "Command Reference"],
              ["troubleshooting", "Troubleshooting"],
              ["projects", "Practical Projects"],
            ] as const
          ).map(([tab, label]) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                activeTab === tab
                  ? "border-sky-400 bg-sky-500/15 text-sky-300"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {activeTab === "roadmap" && (
          <section className="mt-6">
            <label htmlFor="roadmap-search" className="sr-only">
              Search Docker learning topics
            </label>
            <input
              id="roadmap-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search Docker topics, commands, or lessons..."
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-4 text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-500"
            />

            <div className="mt-5 space-y-4">
              {filteredModules.map((module) => {
                const originalIndex = modules.findIndex(
                  (item) => item.title === module.title
                );
                const isExpanded =
                  search.trim().length > 0 ||
                  expanded.includes(originalIndex);

                return (
                  <article
                    key={module.title}
                    className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
                  >
                    <button
                      type="button"
                      onClick={() => toggleModule(originalIndex)}
                      aria-expanded={isExpanded}
                      className="flex w-full items-start justify-between gap-4 p-5 text-left hover:bg-slate-800/70 sm:p-6"
                    >
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                          {module.level}
                        </span>
                        <h2 className="mt-2 text-lg font-bold sm:text-xl">
                          {module.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {module.objective}
                        </p>
                      </div>
                      <span className="mt-2 text-2xl text-sky-400">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="space-y-4 border-t border-slate-800 p-4 sm:p-6">
                        {module.lessons.map((lesson) => {
                          const lessonKey = `${module.title}-${lesson.title}`;
                          const lessonTopics = lesson.topics.map(
                            (topic) => `${lessonKey}-${topic}`
                          );
                          const finished = lessonTopics.filter((id) =>
                            completed.includes(id)
                          ).length;

                          return (
                            <section
                              key={lesson.title}
                              className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5"
                            >
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <h3 className="text-base font-bold text-slate-100 sm:text-lg">
                                  {lesson.title}
                                </h3>
                                <span className="text-xs text-slate-400">
                                  {finished}/{lesson.topics.length} complete
                                </span>
                              </div>

                              <p className="mt-3 text-sm leading-7 text-slate-400">
                                {lesson.description}
                              </p>

                              <h4 className="mb-3 mt-5 font-semibold text-sky-300">
                                Learning objectives and topics
                              </h4>
                              <div className="space-y-3">
                                {lesson.topics.map((topic) => {
                                  const id = `${lessonKey}-${topic}`;
                                  const isDone = completed.includes(id);

                                  return (
                                    <label
                                      key={id}
                                      className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-300"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isDone}
                                        onChange={() => toggleTopic(id)}
                                        className="mt-1 accent-sky-500"
                                      />
                                      <span
                                        className={
                                          isDone
                                            ? "text-slate-500 line-through"
                                            : ""
                                        }
                                      >
                                        {topic}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>

                              {lesson.commands &&
                                lesson.commands.length > 0 && (
                                  <>
                                    <h4 className="mb-3 mt-6 font-semibold text-emerald-300">
                                      Practice commands
                                    </h4>
                                    <div className="space-y-2">
                                      {lesson.commands.map((command) => (
                                        <pre
                                          key={command}
                                          className="overflow-x-auto rounded-lg border border-slate-800 bg-black/40 p-3 text-sm text-emerald-300"
                                        >
                                          <code>{command}</code>
                                        </pre>
                                      ))}
                                    </div>
                                  </>
                                )}

                              {lesson.lab && (
                                <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                                  <h4 className="font-semibold text-amber-300">
                                    Hands-on lab
                                  </h4>
                                  <p className="mt-2 text-sm leading-7 text-slate-300">
                                    {lesson.lab}
                                  </p>
                                </div>
                              )}
                            </section>
                          );
                        })}
                      </div>
                    )}
                  </article>
                );
              })}

              {filteredModules.length === 0 && (
                <p className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
                  No matching topics found. Try another search term.
                </p>
              )}
            </div>
          </section>
        )}

        {activeTab === "commands" && (
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
            <h2 className="text-2xl font-bold">Docker Command Reference</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Use these commands in a Docker environment you control. Replace
              placeholder names with the actual container or image names.
            </p>

            <div className="mt-5 space-y-3">
              {referenceCommands.map(([command, explanation]) => (
                <div
                  key={command}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                >
                  <pre className="overflow-x-auto text-sm text-emerald-300">
                    <code>{command}</code>
                  </pre>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-7 text-slate-300">
              <strong className="text-amber-300">Safety note:</strong> Commands
              such as docker rm, docker system prune, and volume removal can
              destroy data. Inspect the target resources and confirm backups
              before executing destructive operations.
            </div>
          </section>
        )}

        {activeTab === "troubleshooting" && (
          <section className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="text-2xl font-bold">Docker Troubleshooting Center</h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Follow the sequence: reproduce the issue, collect evidence,
                identify the root cause, apply the smallest safe fix, and
                verify the result.
              </p>
            </div>

            {troubleshooting.map((item) => (
              <article
                key={item.issue}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="text-lg font-bold text-rose-300">
                  {item.issue}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  <strong>Possible cause: </strong>
                  {item.cause}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  <strong>Diagnostic approach: </strong>
                  {item.fix}
                </p>
              </article>
            ))}
          </section>
        )}

        {activeTab === "projects" && (
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
            <h2 className="text-2xl font-bold">Portfolio and Practical Projects</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Complete the projects in order. Keep the Dockerfile, Compose
              configuration, pipeline files, screenshots, test evidence, and
              project documentation in your repository.
            </p>

            <div className="mt-5 space-y-3">
              {projects.map((project, index) => (
                <div
                  key={project}
                  className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 font-bold text-sky-300">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{project}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Deliverable: working implementation, setup instructions,
                      validation evidence, troubleshooting notes, and lessons
                      learned.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <h3 className="font-bold text-emerald-300">
                Completion criteria
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                You should be able to explain the architecture, build and run
                images, persist data, connect services, secure containers,
                diagnose common failures, and automate image delivery through
                CI/CD. Production readiness also requires supervised practice,
                testing, and environment-specific operational experience.
              </p>
            </div>
          </section>
        )}

        <footer className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">Your Docker Learning Goal</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Work through the modules in sequence, run the commands in a test
            environment, complete the labs, and document what you learn. This
            roadmap is a structured learning guide; individual lessons can be
            expanded with full tutorials, expected outputs, downloadable lab
            files, and detailed solutions as the DevMavox learning content
            grows.
          </p>
        </footer>
      </div>
    </main>
  );
}
