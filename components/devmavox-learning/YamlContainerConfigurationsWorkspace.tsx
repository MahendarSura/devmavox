"use client";

import { useState } from "react";
import { parseDocument } from "yaml";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type ContainerLesson = {
  title: string;
  description: string;
  purpose: string;
  concepts: string[];
  example: string;
  practice: string[];
  mistakes: string[];
  incident: string;
  recovery: string[];
  quiz: QuizQuestion[];
};

const lessons: Record<string, ContainerLesson> = {
  "Docker Compose": {
    title: "Docker Compose — Multi-Container Application Management",
    description:
      "Docker Compose is a tool for defining and managing multi-container applications through a declarative configuration file. A Compose project describes services, networks, volumes, configurations, health checks and other runtime settings. Instead of manually creating every container, developers describe the desired application topology and use Docker Compose commands to create, start, inspect and stop the application.",
    purpose:
      "Compose is useful for local development, integration testing, demonstrations and controlled single-host deployments. It allows an application and its dependencies, such as an API, database, cache and message broker, to be described together. The configuration becomes version-controlled documentation of how the application components communicate and persist data.",
    concepts: [
      "services defines the containers that make up the application. Each service normally becomes one or more containers.",
      "image selects an existing container image. Use a deliberate version or digest rather than relying on an uncontrolled latest tag.",
      "build tells Compose to build an image from a Dockerfile and build context.",
      "ports publishes container ports to the host. The format HOST:CONTAINER controls host-to-container port mapping.",
      "expose documents ports intended for communication between services without publishing them to the host.",
      "environment supplies environment variables to a container. Avoid placing production passwords directly in committed Compose files.",
      "env_file loads environment values from an external file. Protect sensitive files and exclude local secret files from source control.",
      "volumes mount persistent named volumes or host paths. Named volumes are commonly used for database data.",
      "networks define communication boundaries. Services on a shared network can normally discover each other using service names.",
      "depends_on describes service startup dependencies. Basic dependency ordering does not automatically guarantee application readiness.",
      "healthcheck defines a command and timing parameters used to assess container health.",
      "restart controls restart behavior, but it is not a substitute for application-level resilience or orchestration.",
      "command overrides the default command, while entrypoint changes the executable used to start a container.",
      "profiles allow optional services to be enabled for specific workflows.",
      "resources and deploy-related settings have implementation-specific behavior; do not assume every Swarm-oriented option is enforced identically by ordinary local Compose.",
      "secrets provide a mechanism for supplying sensitive data to supported services. Understand the deployment environment and file permissions.",
      "configs provide non-sensitive configuration files to services.",
      "Compose interpolation supports environment-based values and defaults. Validate the resolved configuration before deployment.",
      "docker compose config renders and validates the effective Compose model.",
      "docker compose ps, logs, exec and inspect help investigate runtime behavior."
    ],
    example: `services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    image: sample-api:1.0
    ports:
      - "8080:8080"
    environment:
      APP_ENV: development
      DB_HOST: database
      DB_PORT: "5432"
    depends_on:
      database:
        condition: service_healthy
    networks:
      - application-network
    restart: unless-stopped

  database:
    image: postgres:16
    environment:
      POSTGRES_DB: sampledb
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - database-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser -d sampledb"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - application-network

volumes:
  database-data:

networks:
  application-network:
    driver: bridge`,
    practice: [
      "Create a Compose project with separate API and database services. Explain why each service has an independent container lifecycle.",
      "Build an API service from a Dockerfile using build.context and dockerfile. Identify which directory becomes the build context.",
      "Publish application port 8080 on host port 8080. Then change the host port to 9090 and explain which address users access.",
      "Create a named volume for database storage. Recreate the database container and verify that persistent data remains available.",
      "Place the API and database on a dedicated network. Configure the API to use the database service name instead of localhost.",
      "Configure a database healthcheck and make the API wait for the database health condition.",
      "Move local development variables into an env file and ensure the file is excluded from source control when it contains sensitive values.",
      "Add a development-only service using profiles and verify how profile activation changes the running application.",
      "Use docker compose config to render the resolved configuration and identify missing variables or invalid service definitions.",
      "Use docker compose logs and docker compose exec to diagnose a failing application container.",
      "Create separate development and production override configurations while keeping production credentials outside the repository.",
      "Explain the operational difference between docker compose stop, down and down -v before using them."
    ],
    mistakes: [
      "Using localhost as the database hostname from inside an API container. In a Compose network, use the database service name.",
      "Publishing a database port publicly when only the application service needs database access.",
      "Assuming depends_on without a health condition means the database is ready to accept connections.",
      "Using anonymous or temporary storage for database data and losing it when containers are recreated.",
      "Committing passwords, tokens or private certificates in Compose files.",
      "Using a relative build context that points to the wrong directory.",
      "Assuming environment variables in a local shell are automatically available inside every container without explicit configuration.",
      "Using container startup order as a replacement for application retry logic.",
      "Running docker compose down -v without understanding that named volumes declared by the project can be removed.",
      "Using mutable image tags without a controlled update and rollback strategy.",
      "Assuming every deploy resource option is enforced by every Compose runtime mode.",
      "Ignoring container health status and relying only on whether a container process is running."
    ],
    incident:
      "A developer starts an API and PostgreSQL stack with Docker Compose. The API container repeatedly restarts because it tries to connect to localhost:5432. The database container is running, but it is still initializing. After correcting the hostname, the application connects, but database records disappear when the developer removes and recreates the stack.",
    recovery: [
      "Run docker compose ps to identify service states and restart loops.",
      "Inspect API logs with docker compose logs --tail=200 api and identify the actual connection error.",
      "Verify the API database hostname. Inside the Compose network, use the database service name rather than localhost.",
      "Inspect database logs and health status to determine whether initialization has completed.",
      "Configure a suitable healthcheck and dependency condition where supported.",
      "Add application-level retry and connection recovery because service health can change after startup.",
      "Inspect docker volume ls and docker volume inspect to identify the database's persistent storage.",
      "Confirm the Compose volume mapping points to the correct database data directory.",
      "Avoid docker compose down -v when persistent database data must be retained.",
      "Test container recreation and verify records remain available before considering the incident resolved."
    ],
    quiz: [
      {
        question: "How should one Compose service normally connect to another service on a shared Compose network?",
        options: ["Use localhost", "Use the service name", "Use the host's public IP only", "Use a random container ID"],
        answer: 1,
        explanation: "Compose provides service-name-based discovery on shared networks. The API can connect to the database using the database service name."
      },
      {
        question: "What is the main purpose of a named volume for a database?",
        options: ["Publish a database port", "Persist data beyond an individual container lifecycle", "Replace a healthcheck", "Build a Docker image"],
        answer: 1,
        explanation: "A named volume stores database data independently from the writable layer of an individual container."
      },
      {
        question: "What does docker compose config help with?",
        options: ["Render and validate the effective Compose configuration", "Deploy a Kubernetes cluster", "Create Git branches", "Compile application source code"],
        answer: 0,
        explanation: "The config command resolves and displays the effective Compose model, helping detect configuration and interpolation problems."
      },
      {
        question: "Does basic depends_on ordering always guarantee that a database is ready?",
        options: ["Yes, in every configuration", "No, startup ordering alone does not guarantee readiness", "Only when ports are published", "Only when restart is always"],
        answer: 1,
        explanation: "Startup order is not the same as application readiness. Health conditions and application retry behavior are important."
      }
    ]
  },

  "Dockerfile": {
    title: "Dockerfile — Container Image Build Engineering",
    description:
      "A Dockerfile is a declarative set of instructions used by Docker-compatible builders to construct container images. It defines the base image, build-time arguments, environment variables, working directory, copied files, installed dependencies, execution user, exposed ports and startup command. A well-designed Dockerfile produces predictable, secure and maintainable images.",
    purpose:
      "Dockerfiles make application packaging reproducible across developer machines, CI pipelines and deployment environments. They allow teams to standardize runtime dependencies, separate build-time tooling from runtime components, reduce unnecessary image contents and apply security controls during image construction.",
    concepts: [
      "FROM selects the base image. Prefer maintained, trusted images and deliberately selected versions.",
      "WORKDIR sets the working directory for subsequent instructions.",
      "COPY transfers files from the build context into the image. Avoid copying secrets or unnecessary repository content.",
      "ADD has additional archive and remote-source behavior. Prefer COPY when those additional features are not required.",
      "RUN executes commands during image construction and creates image layers.",
      "CMD defines the default command or arguments used when the container starts.",
      "ENTRYPOINT configures the executable that is started when the container runs.",
      "EXPOSE documents the container port but does not publish that port on the host.",
      "ENV defines environment variables that are available in the image and containers created from it.",
      "ARG defines build-time variables. Do not treat ARG as a secure secret-storage mechanism.",
      "USER selects the user for subsequent build instructions and the default container process.",
      "HEALTHCHECK defines a command that the container runtime can use to assess application health.",
      "LABEL attaches metadata such as maintainer, version and source information to an image.",
      "Multi-stage builds separate compilation dependencies from the final runtime image.",
      "BuildKit supports advanced build features such as efficient caching and secret mounts.",
      ".dockerignore excludes unnecessary files from the build context.",
      "Layer caching reuses unchanged build steps. Instruction order and input stability influence cache effectiveness.",
      "A smaller build context can reduce transfer time and avoid accidentally packaging sensitive or irrelevant files.",
      "A non-root runtime user reduces the impact of some container compromises.",
      "Image scanning helps identify known vulnerable operating-system packages and application dependencies.",
      "Pinning base images and recording provenance improve build reproducibility and traceability.",
      "Exec-form CMD and ENTRYPOINT avoid unnecessary shell behavior and improve signal handling.",
      "A container image is immutable after creation; changing source or configuration generally requires creating a new image."
    ],
    example: `# Build stage
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /workspace

COPY pom.xml .
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre

WORKDIR /app

RUN useradd --system --uid 10001 appuser

COPY --from=build --chown=appuser:appuser \\
  /workspace/target/*.jar /app/application.jar

USER 10001

EXPOSE 8080

ENV JAVA_OPTS=""

ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar /app/application.jar"]`,
    practice: [
      "Create a Dockerfile using a trusted runtime base image and set an explicit WORKDIR.",
      "Copy a Maven pom.xml before copying frequently changing source code. Explain how this can improve dependency-layer caching.",
      "Build an image with docker build -t sample-api:1.0 . and explain what the final dot represents.",
      "Create a .dockerignore file that excludes node_modules, .git, build output, local environment files and other unnecessary content.",
      "Use a multi-stage build so compilation tools do not remain in the final runtime image.",
      "Configure a non-root runtime user and verify the process identity inside the running container.",
      "Compare CMD and ENTRYPOINT using practical application startup examples.",
      "Configure a healthcheck suitable for the application and explain the difference between a running process and a healthy service.",
      "Inspect image layers using docker history and identify large or unnecessary build steps.",
      "Build the same source revision twice and investigate which inputs can make image output differ.",
      "Use a controlled base image version and document how security updates are introduced.",
      "Generate an SBOM and scan the resulting image with an approved security scanning tool."
    ],
    mistakes: [
      "Using an unpinned or unreviewed base image without a deliberate update policy.",
      "Copying the entire repository without a .dockerignore file and accidentally including local files or secrets.",
      "Installing build dependencies in the final runtime stage when a multi-stage build could remove them.",
      "Running the application as root without a justified requirement.",
      "Using RUN for commands that should execute when the container starts.",
      "Assuming EXPOSE publishes a port to the host. Port publishing is configured when a container is run or through an orchestrator.",
      "Using shell-form commands without considering process signals and PID 1 behavior.",
      "Copying frequently changing source files before stable dependency manifests and unnecessarily invalidating cached dependency layers.",
      "Passing sensitive credentials through ordinary build arguments or copying secret files into image layers.",
      "Installing packages without cleaning package-manager metadata where appropriate.",
      "Using broad file permissions such as chmod 777 as a shortcut.",
      "Assuming a successful image build proves that the application starts and works correctly."
    ],
    incident:
      "A CI pipeline builds an application image successfully, but the deployed container exits immediately. The Dockerfile copied the JAR from an incorrect path. A separate review also finds that the final image contains build tooling and runs as root, increasing the attack surface.",
    recovery: [
      "Run docker image inspect to identify the image metadata and configured startup command.",
      "Run docker history to inspect image layers and understand how files were added.",
      "Inspect the build logs and confirm the application artifact was generated at the expected path.",
      "Check the COPY source and destination paths against the actual build-stage filesystem.",
      "Use a temporary diagnostic container or builder-stage inspection to verify the artifact exists.",
      "Correct the multi-stage COPY instruction and rebuild the image with a new controlled tag.",
      "Start the new image locally and inspect its logs and exit code.",
      "Verify the application process runs as the intended non-root user.",
      "Review the final image contents to ensure unnecessary build tools and credentials are not present.",
      "Run vulnerability scanning and application smoke tests before promoting the image."
    ],
    quiz: [
      {
        question: "What is the primary purpose of FROM in a Dockerfile?",
        options: ["Select the base image", "Publish a port", "Start a container", "Create a Docker network"],
        answer: 0,
        explanation: "FROM establishes the base image or build stage used by subsequent Dockerfile instructions."
      },
      {
        question: "What does EXPOSE do?",
        options: ["Automatically publish a host port", "Document the container's intended listening port", "Create a firewall rule", "Start the application"],
        answer: 1,
        explanation: "EXPOSE documents the intended container port. It does not itself publish that port to the host."
      },
      {
        question: "Why are multi-stage builds useful?",
        options: ["They remove the need for source code", "They separate build tooling from the final runtime image", "They automatically encrypt every file", "They replace container registries"],
        answer: 1,
        explanation: "Multi-stage builds allow compiled artifacts to be copied into a cleaner runtime image without retaining all build-stage tools."
      },
      {
        question: "Which instruction selects the default runtime user?",
        options: ["USER", "LABEL", "ARG", "EXPOSE"],
        answer: 0,
        explanation: "USER selects the user and optionally group used by subsequent instructions and the default runtime process."
      }
    ]
  }
};


export default function YamlContainerConfigurationsWorkspace({
  topic,
  tab
}: {
  topic: string;
  tab: string;
}) {
  const lesson = lessons[topic] ?? lessons["Docker Compose"];
  const activeTab = tab || "Learn";
  const [source, setSource] = useState(lesson.example);
  const [validation, setValidation] = useState("");
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const correct = lesson.quiz.filter((question, index) => answers[index] === question.answer).length;

  function restoreExample() {
    setSource(lesson.example);
    setValidation("");
  }

  function validateSource() {
    if (topic === "Dockerfile") {
      const lines = source.split(/\r?\n/);
      const instructions = lines
        .map(line => line.trim())
        .filter(line => line && !line.startsWith("#"));

      const allowed = new Set([
        "ADD", "ARG", "CMD", "COPY", "ENTRYPOINT", "ENV", "EXPOSE",
        "FROM", "HEALTHCHECK", "LABEL", "MAINTAINER", "ONBUILD",
        "RUN", "SHELL", "STOPSIGNAL", "USER", "VOLUME", "WORKDIR"
      ]);

      const issues: string[] = [];

      if (!instructions.length) issues.push("Dockerfile is empty.");

      instructions.forEach((line, index) => {
        const match = line.match(/^([A-Za-z]+)\s+(.+)$/);
        if (!match) {
          issues.push(`Line ${index + 1}: Expected a Dockerfile instruction followed by an argument.`);
          return;
        }

        if (!allowed.has(match[1].toUpperCase())) {
          issues.push(`Line ${index + 1}: Unknown Dockerfile instruction '${match[1]}'.`);
        }
      });

      if (!instructions.some(line => /^FROM\s+/i.test(line))) {
        issues.push("At least one FROM instruction is required.");
      }

      if (instructions.some(line => /^FROM\s*$/i.test(line))) {
        issues.push("A FROM instruction is missing its base image.");
      }

      setValidation(
        issues.length
          ? "Basic Dockerfile checks found:\n" + issues.join("\n") +
            "\nThis is not a Docker build or Dockerfile parser."
          : "PASS: Basic Dockerfile instruction checks passed. Run docker build and image tests for authoritative validation."
      );
      return;
    }

    try {
      const document = parseDocument(source, { uniqueKeys: true });

      if (document.errors.length) {
        setValidation(document.errors.map(error => error.message).join("\n"));
        return;
      }

      const parsed = document.toJS();
      const issues: string[] = [];

      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        issues.push("Compose configuration must have a mapping at the document root.");
      } else {
        if (!parsed.services || typeof parsed.services !== "object" || Array.isArray(parsed.services)) {
          issues.push("Compose configuration requires a services mapping.");
        }

        if (parsed.services && typeof parsed.services === "object") {
          Object.entries(parsed.services).forEach(([name, service]: [string, any]) => {
            if (!service || typeof service !== "object" || Array.isArray(service)) {
              issues.push(`Service '${name}' must be a mapping.`);
              return;
            }

            if (!service.image && !service.build) {
              issues.push(`Service '${name}' needs image or build configuration.`);
            }

            if (service.ports !== undefined && !Array.isArray(service.ports)) {
              issues.push(`Service '${name}' ports should be a sequence.`);
            }

            if (service.volumes !== undefined && !Array.isArray(service.volumes)) {
              issues.push(`Service '${name}' volumes should be a sequence.`);
            }
          });
        }

        if (parsed.volumes !== undefined &&
            (!parsed.volumes || typeof parsed.volumes !== "object" || Array.isArray(parsed.volumes))) {
          issues.push("Top-level volumes must be a mapping.");
        }

        if (parsed.networks !== undefined &&
            (!parsed.networks || typeof parsed.networks !== "object" || Array.isArray(parsed.networks))) {
          issues.push("Top-level networks must be a mapping.");
        }
      }

      setValidation(
        issues.length
          ? "YAML syntax is valid, but Compose structural checks found:\n" + issues.join("\n")
          : "PASS: YAML syntax and basic Docker Compose structure checks passed. Run docker compose config to validate against your installed Compose implementation."
      );
    } catch (error) {
      setValidation(error instanceof Error ? error.message : "Unknown validation error.");
    }
  }

  return (
    <section className="w-full space-y-6">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Container Configurations Learning Workspace
        </span>
        <h2 className="text-2xl font-bold">{lesson.title}</h2>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{lesson.description}</p>
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4">
          <h3 className="font-semibold mb-2">Purpose in real DevOps workflows</h3>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{lesson.purpose}</p>
        </div>
      </div>


      {activeTab === "Learn" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Core Concepts and Architecture</h3>
          {lesson.concepts.map((item, index) => (
            <div key={index} className="flex gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <span className="font-bold text-blue-600">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-7">{item}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Examples" && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Complete Configuration Example</h3>
          <pre className="overflow-x-auto rounded-xl bg-slate-950 text-green-300 p-5 text-sm leading-7">
            <code>{lesson.example}</code>
          </pre>
          <button onClick={restoreExample} className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm">
            Load example into editor
          </button>
        </div>
      )}

      {activeTab === "Practice" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Hands-on Container Exercises</h3>
          {lesson.practice.map((item, index) => (
            <div key={index} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="font-semibold text-sm">Exercise {index + 1}</p>
              <p className="mt-2 text-sm leading-7">{item}</p>
            </div>
          ))}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4">
            <h4 className="font-semibold">Useful Docker commands</h4>
            <pre className="overflow-x-auto text-xs leading-7 mt-2">
              <code>{`docker version
docker info
docker images
docker ps -a
docker logs <container>
docker inspect <container>`}</code>
            </pre>
          </div>
        </div>
      )}

      {activeTab === "Debug" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Common Container Configuration Failures</h3>
          {lesson.mistakes.map((item, index) => (
            <div key={index} className="rounded-xl border border-amber-200 dark:border-amber-900 p-4">
              <p className="text-sm leading-7"><strong>Issue {index + 1}:</strong> {item}</p>
            </div>
          ))}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4 space-y-2">
            <h4 className="font-semibold">Diagnostic command reference</h4>
            <pre className="overflow-x-auto text-xs leading-7">
              <code>{`docker ps -a
docker logs --tail=200 <container>
docker inspect <container>
docker image inspect <image>
docker history <image>
docker network ls
docker volume ls
docker system df`}</code>
            </pre>
          </div>
        </div>
      )}

      {activeTab === "Validate" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Container Configuration Editor</h3>
          <p className="text-sm text-slate-500">
            {topic === "Docker Compose"
              ? "YAML syntax and basic Compose structure checks. Use docker compose config for platform-level validation."
              : "Basic Dockerfile instruction checks. Use docker build to verify actual build behavior."}
          </p>
          <textarea
            value={source}
            onChange={event => {
              setSource(event.target.value);
              setValidation("");
            }}
            spellCheck={false}
            className="w-full min-h-[440px] rounded-xl bg-slate-950 text-green-300 p-5 font-mono text-sm leading-6"
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={validateSource} className="rounded-lg bg-green-700 text-white px-5 py-2 text-sm font-semibold">
              Validate Configuration
            </button>
            <button onClick={restoreExample} className="rounded-lg border border-slate-300 px-5 py-2 text-sm">
              Restore Example
            </button>
          </div>
          {validation && (
            <pre className="whitespace-pre-wrap rounded-xl border border-slate-300 dark:border-slate-700 p-4 text-sm leading-6">
              {validation}
            </pre>
          )}
        </div>
      )}

      {activeTab === "Scenarios" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Production Incident Simulation</h3>
          <div className="rounded-xl border border-red-200 dark:border-red-900 p-5 space-y-3">
            <span className="text-xs font-semibold uppercase text-red-600">Incident scenario</span>
            <p className="text-sm leading-7">{lesson.incident}</p>
          </div>
          <h4 className="font-semibold">Investigation and recovery workflow</h4>
          {lesson.recovery.map((item, index) => (
            <div key={index} className="flex gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
              <span className="rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">
                {index + 1}
              </span>
              <p className="text-sm leading-7">{item}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Quiz" && (
        <div className="space-y-5">
          <div>
            <h3 className="text-xl font-semibold">Container Engineering Assessment</h3>
            <p className="text-sm text-slate-500 mt-1">Select an answer and review the explanation.</p>
          </div>
          {lesson.quiz.map((item, index) => (
            <div key={index} className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
              <p className="font-semibold text-sm">{index + 1}. {item.question}</p>
              {item.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name={`container-quiz-${topic}-${index}`}
                    checked={answers[index] === optionIndex}
                    onChange={() => setAnswers(current => ({ ...current, [index]: optionIndex }))}
                  />
                  {option}
                </label>
              ))}
              {answers[index] !== undefined && (
                <div className={`rounded-lg p-3 text-sm ${
                  answers[index] === item.answer
                    ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300"
                    : "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                }`}>
                  <strong>{answers[index] === item.answer ? "Correct" : "Review this answer"}</strong>
                  <p className="mt-1">{item.explanation}</p>
                </div>
              )}
            </div>
          ))}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4">
            <p className="font-semibold">Answered: {Object.keys(answers).length}/{lesson.quiz.length}</p>
            <p className="text-sm mt-1">Correct answers: {correct}/{lesson.quiz.length}</p>
            <button onClick={() => setAnswers({})} className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-sm">
              Reset assessment
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
