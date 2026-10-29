export interface ContainerExitDiagnostic {
  id: string;
  title: string;
  purpose: string;
  command: string;
  exampleOutput: string;
  interpretation: string[];
  nextStep: string;
  risk: "read-only" | "low" | "moderate" | "high";
}

export interface ContainerExitRootCause {
  id: string;
  cause: string;
  symptoms: string[];
  confirmationSteps: string[];
  resolution: string[];
  verification: string[];
  prevention: string[];
}

export interface ContainerExitScenario {
  title: string;
  environment: string;
  severity: "SEV-1" | "SEV-2" | "SEV-3" | "SEV-4";
  impact: string[];
  timeline: Array<{
    time: string;
    observation: string;
    action: string;
  }>;
  rootCause: string;
  recovery: string[];
  lessonsLearned: string[];
}

export interface ContainerExitInterviewQuestion {
  question: string;
  answer: string;
  followUp?: string;
}

export interface ContainerExitExercise {
  title: string;
  symptoms: string[];
  task: string[];
  expectedFindings: string[];
  solution: string[];
}

export const containerExitsGuide = {
  id: "docker-container-exits",
  title: "Docker Container Exits Immediately",
  tool: "Docker",
  category: "Container Runtime Troubleshooting",
  difficulty: "Intermediate to Advanced",

  summary:
    "A production-focused troubleshooting guide for Docker containers that stop immediately, exit unexpectedly, repeatedly restart, or terminate after their main process finishes.",

  objectives: [
    "Understand Docker container lifecycle and PID 1.",
    "Interpret container exit codes without guessing the root cause.",
    "Preserve logs and inspect stopped containers before restarting or deleting them.",
    "Distinguish application crashes, command errors, configuration problems, OOM kills, and orchestration restarts.",
    "Trace failures from the application process to Docker, the host, and the deployment pipeline.",
    "Recover safely and verify that the service remains healthy.",
    "Prevent recurring container exits using health checks, monitoring, and release controls.",
  ],

  placeholders: {
    container: "<container-name-or-id>",
    image: "my-service:build-123",
    service: "<compose-service-name>",
    composeFile: "compose.yaml",
    dockerfile: "Dockerfile",
    application: "<application-name>",
    environment: "<development-staging-production>",
    host: "<docker-host>",
    namespace: "<kubernetes-namespace-if-applicable>",
    note:
      "Replace placeholders with actual values. Example logs, names, and timestamps in this guide are illustrative, not records from a real system.",
  },

  overview: {
    definition:
      "A Docker container exits when its primary process terminates. Docker manages the container lifecycle, but it does not automatically keep an application process alive unless a restart policy or an orchestrator is configured to restart it.",

    lifecycle: [
      {
        step: 1,
        name: "Image selection",
        explanation:
          "Docker selects the image and its configured ENTRYPOINT, CMD, environment defaults, user, working directory, and filesystem.",
      },
      {
        step: 2,
        name: "Container creation",
        explanation:
          "Docker creates the container configuration, writable layer, network attachment, mounts, and resource limits.",
      },
      {
        step: 3,
        name: "Process startup",
        explanation:
          "Docker starts the configured entrypoint and command. The resulting primary process is normally PID 1 inside the container.",
      },
      {
        step: 4,
        name: "Application initialization",
        explanation:
          "The process reads configuration, accesses files and dependencies, binds ports, initializes the application, and begins its intended work.",
      },
      {
        step: 5,
        name: "Process termination",
        explanation:
          "The primary process can exit normally, fail with a nonzero status, receive a signal, or be terminated because of resource or host conditions.",
      },
      {
        step: 6,
        name: "Container status",
        explanation:
          "Docker records the container state, exit code, timestamps, and available runtime information. The container's filesystem and inspectable metadata usually remain available until it is removed.",
      },
      {
        step: 7,
        name: "Restart or orchestration action",
        explanation:
          "A Docker restart policy or external orchestrator may restart the container. A restart does not itself explain or correct the underlying cause.",
      },
    ],

    importantDistinctions: [
      {
        symptom: "Container exits with code 0",
        meaning:
          "The primary process completed successfully from its own perspective. That can be correct for a one-shot job or incorrect for a service expected to run continuously.",
        nextAction:
          "Check the intended workload type, command, and whether the application should remain in the foreground.",
      },
      {
        symptom: "Container exits with code 1",
        meaning:
          "A process reported a general failure. The code alone does not identify whether the cause is configuration, dependencies, application logic, or another error.",
        nextAction:
          "Inspect the complete application logs and the command that ran.",
      },
      {
        symptom: "Container exits with code 126",
        meaning:
          "A command was found but could not be executed in the usual shell convention.",
        nextAction:
          "Inspect executable permissions, interpreter requirements, mount options, and user permissions.",
      },
      {
        symptom: "Container exits with code 127",
        meaning:
          "The shell commonly reports that a command could not be found.",
        nextAction:
          "Check the executable name, PATH, image contents, and whether the required binary exists.",
      },
      {
        symptom: "Container exits with code 137",
        meaning:
          "The process was terminated by SIGKILL in the usual Unix exit-status convention. An OOM kill is one possibility, but a manual kill or forced stop can produce the same code.",
        nextAction:
          "Inspect Docker events, container state, host memory evidence, and orchestration events before concluding that it was an OOM kill.",
      },
      {
        symptom: "Container exits with code 143",
        meaning:
          "The process commonly terminated after receiving SIGTERM. This may be a normal shutdown, deployment replacement, manual stop, or orchestration action.",
        nextAction:
          "Correlate timestamps with deployment activity, stop requests, and application shutdown logs.",
      },
      {
        symptom: "Container exits with code 139",
        meaning:
          "The process commonly terminated due to SIGSEGV, a segmentation fault.",
        nextAction:
          "Inspect native-library compatibility, application crash logs, core-dump policy, and the relevant runtime.",
      },
      {
        symptom: "Container restarts repeatedly",
        meaning:
          "The process is repeatedly terminating and a restart mechanism is starting it again.",
        nextAction:
          "Inspect the previous container logs, restart count, exit state, and the first failure before changing the restart policy.",
      },
      {
        symptom: "Container is running but application is unavailable",
        meaning:
          "A running container does not prove that its application is ready or reachable.",
        nextAction:
          "Inspect application logs, health checks, listening ports, networking, and dependency connectivity.",
      },
      {
        symptom: "Container exits immediately after startup",
        meaning:
          "The configured process may be a one-shot command, shell script, invalid entrypoint, or application that fails during initialization.",
        nextAction:
          "Inspect image configuration and the exact command executed.",
      },
    ],

    exitCodeCaution:
      "Exit codes are evidence, not definitive root causes. Interpret them together with logs, timestamps, Docker events, host resource evidence, and deployment history.",
  },

  severityAssessment: [
    {
      level: "SEV-1",
      criteria:
        "A critical customer-facing service is unavailable, multiple critical containers have terminated, or a container failure is preventing an urgent production recovery.",
      actions: [
        "Engage the incident commander and application/platform owners.",
        "Confirm customer impact, redundancy, traffic routing, and current service availability.",
        "Preserve container logs and state before making changes.",
        "Use the approved incident recovery and change process.",
      ],
    },
    {
      level: "SEV-2",
      criteria:
        "A production service is degraded, a critical deployment is blocked, or a shared host/container platform failure affects several services.",
      actions: [
        "Check whether the failure is isolated to one container or shared across workloads.",
        "Identify the last known-good release and approved recovery options.",
        "Escalate to the container platform or infrastructure owner when required.",
      ],
    },
    {
      level: "SEV-3",
      criteria:
        "A single application container fails in development, testing, or a non-critical production workload without broad customer impact.",
      actions: [
        "Capture the failure evidence.",
        "Identify the exact process and failure condition.",
        "Apply and verify a targeted fix.",
      ],
    },
    {
      level: "SEV-4",
      criteria:
        "A non-critical one-shot container exits as expected, or a documented non-blocking issue needs investigation.",
      actions: [
        "Confirm whether termination is expected for the workload type.",
        "Document the observed behavior.",
        "Create a tracked improvement if the behavior is unintended.",
      ],
    },
  ],

  incidentResponseWorkflow: [
    {
      step: 1,
      title: "Detect and acknowledge",
      actions: [
        "Record the alert, service, host, container ID, image tag, and first failure time.",
        "Check whether the container is exited, restarting, or running but unhealthy.",
        "Capture the exit code and last known state.",
        "Identify whether the failure followed a release, configuration change, host event, or dependency outage.",
      ],
      decision:
        "If several unrelated containers fail at the same time, investigate host, resource, network, or shared dependency conditions before changing individual application images.",
    },
    {
      step: 2,
      title: "Assess impact and severity",
      actions: [
        "Identify the affected environment and service.",
        "Check customer impact, redundancy, traffic routing, and remaining healthy replicas.",
        "Determine whether the container is a long-running service, scheduled job, migration, or one-shot task.",
        "Check whether a deployment or configuration change already occurred.",
        "Check whether a container is repeatedly restarting and consuming resources.",
      ],
      decision:
        "Do not automatically restart a failed migration, payment job, or other non-idempotent task. First determine whether it partially completed its work.",
    },
    {
      step: 3,
      title: "Perform safety checks",
      actions: [
        "Confirm the Docker host and context.",
        "Confirm the container ID, service name, image, tag, and intended environment.",
        "Check the current deployment revision and approved change ticket.",
        "Preserve logs and inspect metadata before removing or recreating the container.",
        "Do not print environment variables that may contain secrets.",
        "Do not delete containers, volumes, or application data to make the status appear healthy.",
      ],
      decision:
        "If the container identity or host is uncertain, stop before running commands that restart, remove, or replace workloads.",
    },
    {
      step: 4,
      title: "Collect evidence",
      actions: [
        "Capture docker ps -a output.",
        "Capture docker logs with timestamps.",
        "Inspect exit code, state, restart count, start time, and finish time.",
        "Inspect image ENTRYPOINT, CMD, user, working directory, mounts, environment configuration, and restart policy.",
        "Inspect Docker events around the failure timestamp.",
        "Check host memory, disk, kernel logs, and platform events when relevant.",
        "Compare the current deployment and configuration with the last known-good revision.",
      ],
      decision:
        "Record the first meaningful application error and correlate it with process termination. Avoid treating a later restart message as the root cause.",
    },
    {
      step: 5,
      title: "Run ordered diagnostics",
      actions: [
        "Confirm container state and exit code.",
        "Read logs from the stopped container.",
        "Inspect container configuration and image defaults.",
        "Check Docker events and host resources.",
        "Validate command, environment, mounts, permissions, and dependency access.",
        "Compare behavior with the previous image or known-good configuration.",
      ],
      decision:
        "Select the next diagnostic from the evidence. Do not run destructive cleanup commands simply because the container exited.",
    },
    {
      step: 6,
      title: "Isolate the root cause",
      actions: [
        "Distinguish normal completion from an unexpected service exit.",
        "Determine whether the application crashed, the entrypoint failed, or an external stop occurred.",
        "Check for OOM evidence instead of inferring OOM from exit code 137 alone.",
        "Determine whether the failure is application-specific or shared across the host.",
        "Reproduce in a safe environment when possible.",
      ],
      decision:
        "If the evidence is insufficient, preserve the failed state and escalate rather than repeatedly restarting and losing useful context.",
    },
    {
      step: 7,
      title: "Fix and recover",
      actions: [
        "Apply the smallest correction supported by evidence.",
        "Review the Dockerfile, application change, and deployment configuration.",
        "Validate the fix in a controlled environment.",
        "Restart or recreate the workload through its intended deployment mechanism.",
        "Check for duplicate or partially completed work before rerunning jobs.",
        "Use approved rollback criteria and procedures.",
      ],
      decision:
        "Do not assume a manual docker start or restart is the correct permanent recovery for a service managed by Compose, Swarm, Kubernetes, or another deployment controller.",
    },
    {
      step: 8,
      title: "Verify and close",
      actions: [
        "Confirm the container stays running when it is expected to be long-lived.",
        "Check application readiness and real service requests.",
        "Check logs, error rates, resource consumption, and restart counts.",
        "Confirm the intended image and configuration are deployed.",
        "Record root cause, recovery, and prevention actions.",
      ],
      decision:
        "A container in the running state is not enough to close the incident if the application remains unhealthy or unavailable.",
    },
  ],

  diagnostics: [
    {
      id: "D01",
      title: "Find the stopped container",
      purpose:
        "Identify the exact container and determine whether it is exited, restarting, or still running.",
      command: [
        "docker ps -a",
        "docker ps -a --filter status=exited",
        "docker ps -a --filter status=restarting",
      ].join("\n"),
      exampleOutput:
        "Illustrative output:\nCONTAINER ID   IMAGE                COMMAND            STATUS\nabc123def456   my-service:build-123 \"node server.js\"   Exited (1) 2 minutes ago",
      interpretation: [
        "Exited indicates that the container's main process has stopped.",
        "Restarting indicates that a restart mechanism may be repeatedly starting a failing process.",
        "Record the container ID because names can be reused by deployment automation.",
        "The last status line does not establish why the process stopped.",
      ],
      nextStep:
        "Inspect logs and the container's recorded state before attempting a restart.",
      risk: "read-only",
    },
    {
      id: "D02",
      title: "Read logs from the stopped container",
      purpose:
        "Capture application startup errors and the last messages before process termination.",
      command:
        "docker logs --timestamps --tail 300 <container-name-or-id>",
      exampleOutput:
        "Illustrative output:\n2026-10-27T08:41:12Z ERROR Missing required configuration: APP_MODE\n2026-10-27T08:41:12Z ERROR Application initialization failed",
      interpretation: [
        "Look for the first meaningful error, not just the final line.",
        "Check whether the logs show a normal shutdown, application exception, failed dependency connection, or missing configuration.",
        "A container may have no useful logs if the application writes only to files or exits before logging initializes.",
        "Redact tokens, passwords, customer data, and private URLs before sharing logs.",
      ],
      nextStep:
        "If logs identify a specific configuration or application error, inspect that setting or code path. If logs are empty, inspect container metadata and the entrypoint.",
      risk: "read-only",
    },
    {
      id: "D03",
      title: "Inspect exit code and timestamps",
      purpose:
        "Retrieve the container's last known termination status and timing.",
      command:
        "docker inspect <container-name-or-id> --format '{{json .State}}'",
      exampleOutput:
        "Illustrative output:\n{\"Status\":\"exited\",\"Running\":false,\"ExitCode\":1,\"OOMKilled\":false,\"Error\":\"\",\"StartedAt\":\"2026-10-27T08:41:10Z\",\"FinishedAt\":\"2026-10-27T08:41:12Z\"}",
      interpretation: [
        "ExitCode records the process exit status.",
        "OOMKilled can provide evidence that Docker recorded an out-of-memory kill, but correlate it with host and runtime evidence.",
        "StartedAt and FinishedAt show how long the process ran.",
        "Error can contain a runtime-level error; an empty value does not mean the application exited successfully.",
      ],
      nextStep:
        "Use the exit code, duration, and logs to select the next branch. Do not infer a root cause from the exit code alone.",
      risk: "read-only",
    },
    {
      id: "D04",
      title: "Inspect the configured command",
      purpose:
        "Determine which executable and arguments Docker attempted to run.",
      command:
        "docker inspect <container-name-or-id> --format 'Path={{.Path}} Args={{json .Args}}'",
      exampleOutput:
        "Illustrative output:\nPath=node Args=[\"server.js\"]",
      interpretation: [
        "The actual command may differ from the command assumed by the application team.",
        "Compose overrides, runtime arguments, ENTRYPOINT, and CMD can change the final process.",
        "A shell wrapper may exit before starting the application.",
        "Review the output for sensitive arguments before sharing it.",
      ],
      nextStep:
        "Compare the actual process with the Dockerfile and deployment configuration. Investigate an unexpected command or argument.",
      risk: "read-only",
    },
    {
      id: "D05",
      title: "Inspect image ENTRYPOINT and CMD",
      purpose:
        "Find whether the image defaults launch the intended application process.",
      command:
        "docker image inspect my-service:build-123 --format 'Entrypoint={{json .Config.Entrypoint}} Cmd={{json .Config.Cmd}}'",
      exampleOutput:
        "Illustrative output:\nEntrypoint=[\"node\"] Cmd=[\"server.js\"]",
      interpretation: [
        "A service process normally needs to remain in the foreground.",
        "A command that starts a background process and then exits may cause the container to stop.",
        "An incorrect CMD can override expected startup behavior.",
        "The image defaults may be overridden when a container is created.",
      ],
      nextStep:
        "Compare image defaults with the actual container command and the service's intended lifecycle.",
      risk: "read-only",
    },
    {
      id: "D06",
      title: "Inspect container configuration",
      purpose:
        "Review image identity, restart policy, user, working directory, mounts, and health configuration.",
      command:
        "docker inspect <container-name-or-id>",
      exampleOutput:
        "Illustrative findings:\nImage: sha256:<image-id>\nRestartPolicy: unless-stopped\nWorkingDir: /app\nUser: 10001",
      interpretation: [
        "Compare the image identity with the expected release.",
        "A restart policy may explain repeated starts but does not fix the process failure.",
        "An incorrect working directory or user can cause startup errors.",
        "Inspect mounts and environment metadata carefully; the output may contain sensitive values.",
      ],
      nextStep:
        "Investigate the specific configuration that correlates with the observed failure.",
      risk: "read-only",
    },
    {
      id: "D07",
      title: "Check recent Docker events",
      purpose:
        "Correlate process termination with Docker stop, kill, die, restart, or health events.",
      command:
        "docker events --since 30m --until 0s --filter container=<container-name-or-id>",
      exampleOutput:
        "Illustrative output:\ncontainer ... stop\ncontainer ... die (exitCode=143)",
      interpretation: [
        "Events can help identify the sequence of container lifecycle operations.",
        "An exit code of 143 may correlate with a graceful stop request.",
        "Events are time-bounded and may not be available indefinitely.",
        "An event does not always identify which person or automation initiated the action.",
      ],
      nextStep:
        "Correlate event timestamps with deployments, operator actions, host maintenance, and application logs.",
      risk: "read-only",
    },
    {
      id: "D08",
      title: "Inspect host memory and OOM evidence",
      purpose:
        "Determine whether memory exhaustion plausibly caused process termination.",
      command: [
        "docker stats --no-stream",
        "docker inspect <container-name-or-id> --format '{{.State.OOMKilled}} {{.State.ExitCode}}'",
        "free -h",
        "journalctl -k --since '30 minutes ago'",
      ].join("\n"),
      exampleOutput:
        "Illustrative output:\nDocker state: true 137\nKernel log: memory cgroup out-of-memory event",
      interpretation: [
        "The example shows evidence consistent with an OOM kill; actual output and availability vary by platform.",
        "Exit code 137 alone is insufficient to prove OOM.",
        "Inspect container memory limits, host pressure, kernel logs, and other workloads.",
        "Do not increase memory limits blindly if the application has a leak or the host lacks capacity.",
      ],
      nextStep:
        "If OOM is confirmed, determine whether to fix memory usage, adjust an appropriate limit, or increase host capacity under the approved change process.",
      risk: "read-only",
    },
    {
      id: "D09",
      title: "Check container environment configuration safely",
      purpose:
        "Determine whether required configuration is missing or incorrectly supplied without exposing secrets.",
      command:
        "docker inspect <container-name-or-id> --format '{{json .Config.Env}}'",
      exampleOutput:
        "Illustrative finding:\nThe application requires APP_MODE, but the expected non-secret configuration key is absent.",
      interpretation: [
        "The command can print environment variable values, including secrets. Do not run it in shared logs or paste its raw output into tickets.",
        "Prefer checking required key names and non-sensitive values through approved tooling.",
        "Environment changes may not affect an existing container until it is recreated.",
      ],
      nextStep:
        "Compare the required configuration contract with the deployment configuration and secret injection mechanism.",
      risk: "read-only",
    },
    {
      id: "D10",
      title: "Inspect mounts and filesystem paths",
      purpose:
        "Determine whether a mount hides required image files or makes a startup path unavailable.",
      command:
        "docker inspect <container-name-or-id> --format '{{json .Mounts}}'",
      exampleOutput:
        "Illustrative finding:\nA host directory is mounted over /app and hides application files that were present in the image.",
      interpretation: [
        "A bind mount can hide files already present at the mount destination.",
        "A missing host path, permission problem, or read-only mount can prevent initialization.",
        "Inspect the actual mount source, destination, and access mode.",
      ],
      nextStep:
        "Compare the mount configuration with the expected image filesystem and correct the source or destination if proven wrong.",
      risk: "read-only",
    },
    {
      id: "D11",
      title: "Inspect Docker Compose service configuration",
      purpose:
        "Check the effective Compose configuration for command overrides, environment references, mounts, dependencies, and restart policies.",
      command: [
        "docker compose config --quiet",
        "docker compose ps -a",
        "docker compose logs --timestamps --tail 300 <service-name>",
      ].join("\n"),
      exampleOutput:
        "Illustrative finding:\nThe service configuration is valid, but the configured command runs a migration script that exits after completion.",
      interpretation: [
        "docker compose config validates and renders Compose configuration; it does not prove the application can start successfully.",
        "Rendered configuration can contain interpolated secrets. Do not share it without redaction.",
        "Compose service dependencies do not automatically guarantee that a dependency is ready for application traffic.",
      ],
      nextStep:
        "Inspect the effective command and dependency readiness, then validate the corrected configuration in a controlled environment.",
      risk: "read-only",
    },
    {
      id: "D12",
      title: "Check application port binding",
      purpose:
        "Determine whether the application fails during startup because it cannot bind its required port.",
      command: [
        "docker logs --timestamps --tail 300 <container-name-or-id>",
        "docker port <container-name-or-id>",
      ].join("\n"),
      exampleOutput:
        "Illustrative output:\nApplication startup error: address already in use",
      interpretation: [
        "A host port conflict and an application port-binding conflict are different problems.",
        "docker port shows published mappings; it does not prove that the application is listening inside the container.",
        "Inspect the application's listening address and actual startup error.",
      ],
      nextStep:
        "Determine whether the conflict is inside the container or on the host before changing port mappings.",
      risk: "read-only",
    },
    {
      id: "D13",
      title: "Check dependencies and startup order",
      purpose:
        "Investigate whether the application exits because a database, queue, or external service is unavailable.",
      command:
        "docker logs --timestamps --tail 300 <container-name-or-id>",
      exampleOutput:
        "Illustrative output:\nERROR database connection refused during startup",
      interpretation: [
        "Connection refused, DNS failure, authentication failure, and timeout indicate different problems.",
        "A dependency container being started does not guarantee that the dependency is ready.",
        "Check dependency health, network attachment, service names, and credentials through approved methods.",
      ],
      nextStep:
        "Validate the dependency independently, then use appropriate readiness checks and bounded retries where suitable.",
      risk: "read-only",
    },
    {
      id: "D14",
      title: "Inspect container user and executable permissions",
      purpose:
        "Determine whether the configured process can execute its entrypoint or access required files.",
      command: [
        "docker image inspect my-service:build-123 --format 'User={{.Config.User}} WorkingDir={{.Config.WorkingDir}}'",
        "docker logs --timestamps --tail 300 <container-name-or-id>",
      ].join("\n"),
      exampleOutput:
        "Illustrative output:\nexec ./entrypoint.sh: permission denied",
      interpretation: [
        "Check executable permissions, interpreter availability, line endings, and filesystem mount options.",
        "The configured user may lack access to the working directory or application files.",
        "Do not solve the problem by running the application as root without a security review.",
      ],
      nextStep:
        "Correct the specific executable permission, interpreter, ownership, or path issue.",
      risk: "read-only",
    },
    {
      id: "D15",
      title: "Check host disk and filesystem errors",
      purpose:
        "Investigate failures caused by exhausted storage or unavailable mounted filesystems.",
      command: [
        "df -h",
        "df -i",
        "docker system df",
      ].join("\n"),
      exampleOutput:
        "Illustrative output:\nFilesystem capacity: 99% used\nApplication log directory cannot accept writes",
      interpretation: [
        "Disk exhaustion can prevent log writes, temporary-file creation, and application initialization.",
        "Inode exhaustion may prevent new files from being created even if disk space remains.",
        "Inspect the filesystem actually used by Docker and the application.",
      ],
      nextStep:
        "Use approved storage cleanup or capacity remediation and then verify application startup.",
      risk: "read-only",
    },
    {
      id: "D16",
      title: "Compare the current and last known-good image",
      purpose:
        "Determine whether a new image or configuration introduced the exit.",
      command: [
        "docker image inspect my-service:build-123",
        "docker image ls --digests",
        "git log -5 --oneline",
      ].join("\n"),
      exampleOutput:
        "Illustrative finding:\nThe current release changed the entrypoint and introduced a new startup dependency.",
      interpretation: [
        "Compare image digests, source revisions, Dockerfile changes, and runtime configuration.",
        "A mutable tag can refer to different images at different times.",
        "Do not remove the previous known-good image before release recovery is complete.",
      ],
      nextStep:
        "If the regression is release-related, use the approved rollback or forward-fix decision process.",
      risk: "read-only",
    },
    {
      id: "D17",
      title: "Inspect the container's health status",
      purpose:
        "Distinguish process termination from a failed application health check.",
      command:
        "docker inspect <container-name-or-id> --format '{{json .State.Health}}'",
      exampleOutput:
        "Illustrative output:\nHealth status: unhealthy\nRecent health-check exit code: 1",
      interpretation: [
        "A health check can fail while the main process remains running.",
        "An unhealthy state is not the same as an exited state.",
        "A Docker health check does not necessarily restart a container by itself; restart behavior depends on the runtime or orchestrator.",
        "Inspect the configured health-check command and its output.",
      ],
      nextStep:
        "Check whether the application is genuinely unavailable or whether the health-check command, path, timeout, or startup period is incorrect.",
      risk: "read-only",
    },
    {
      id: "D18",
      title: "Check whether an orchestrator owns the container",
      purpose:
        "Determine whether a deployment controller manages container creation, replacement, and restart behavior.",
      command:
        "docker ps -a --no-trunc",
      exampleOutput:
        "Illustrative finding:\nContainer labels identify a Compose project or Swarm service.",
      interpretation: [
        "Manually changing a controller-managed container may be temporary because the controller can recreate it.",
        "For Kubernetes workloads, inspect Pod events, previous container logs, termination state, and workload rollout history instead of treating a Docker host container as the source of truth.",
        "Use the deployment platform's normal update and rollback process.",
      ],
      nextStep:
        "Identify the owning service or controller and investigate the configuration at that layer.",
      risk: "read-only",
    },
  ] satisfies ContainerExitDiagnostic[],

  rootCauses: [
    {
      id: "RC01",
      cause: "The main process completes successfully but should have remained running",
      symptoms: [
        "The container exits with code 0.",
        "Logs show the command completed.",
        "The workload is expected to provide a continuously running service.",
      ],
      confirmationSteps: [
        "Inspect the actual command, ENTRYPOINT, and CMD.",
        "Confirm whether the workload is a service or a one-shot job.",
        "Check whether the application daemonizes or launches a background process.",
      ],
      resolution: [
        "Configure the container to run the intended foreground application process.",
        "Use a one-shot workload model if the process is supposed to complete.",
        "Avoid artificial commands such as tail -f /dev/null as a substitute for a correct application process.",
      ],
      verification: [
        "Confirm that a long-running service remains active.",
        "Confirm that a one-shot job completes with the expected result.",
        "Verify actual application functionality rather than status alone.",
      ],
      prevention: [
        "Document the expected lifecycle for each image.",
        "Test the configured startup command in CI.",
        "Keep the primary process in the foreground.",
      ],
    },
    {
      id: "RC02",
      cause: "Application crashes during initialization",
      symptoms: [
        "The container exits with a nonzero code shortly after startup.",
        "Logs show an exception, panic, failed assertion, or configuration error.",
        "The problem may follow a code or dependency update.",
      ],
      confirmationSteps: [
        "Inspect timestamped logs and the first application exception.",
        "Compare the source revision and image digest with the previous release.",
        "Check whether the same exception occurs in a controlled environment.",
      ],
      resolution: [
        "Fix the application defect or invalid startup configuration.",
        "Run the appropriate tests and build a reviewed image.",
        "Use an approved rollback if the release is causing customer impact and a known-good version is available.",
      ],
      verification: [
        "Confirm the original exception no longer occurs.",
        "Check startup, readiness, and real application requests.",
        "Monitor error rates after recovery.",
      ],
      prevention: [
        "Add startup tests and configuration validation.",
        "Publish structured logs and crash diagnostics.",
        "Use progressive deployment and rollback controls where supported.",
      ],
    },
    {
      id: "RC03",
      cause: "Incorrect ENTRYPOINT or CMD",
      symptoms: [
        "The wrong command starts.",
        "The container exits immediately after running a shell script.",
        "The application binary is not invoked.",
      ],
      confirmationSteps: [
        "Inspect image defaults and actual container Path/Args.",
        "Review Compose or deployment command overrides.",
        "Compare the current Dockerfile with the last known-good revision.",
      ],
      resolution: [
        "Correct the command and arguments.",
        "Use the appropriate exec-form ENTRYPOINT/CMD when suitable.",
        "Ensure wrapper scripts execute the intended application and handle signals correctly.",
      ],
      verification: [
        "Inspect the final image command.",
        "Start the image in a controlled environment.",
        "Verify process lifetime and graceful shutdown.",
      ],
      prevention: [
        "Test the final image, not only the build stage.",
        "Review command overrides during deployment changes.",
        "Use consistent entrypoint conventions.",
      ],
    },
    {
      id: "RC04",
      cause: "Required environment configuration is missing",
      symptoms: [
        "Logs identify a missing configuration key.",
        "The application exits before serving requests.",
        "The issue follows a configuration or secret rotation.",
      ],
      confirmationSteps: [
        "Compare required configuration names with the deployment configuration.",
        "Check secret injection status without printing secret values.",
        "Confirm whether the container was recreated after configuration changes.",
      ],
      resolution: [
        "Restore the required non-secret configuration.",
        "Correct the approved secret reference or injection mechanism.",
        "Recreate the workload through its deployment system when changed configuration requires a new container.",
      ],
      verification: [
        "Confirm initialization succeeds.",
        "Verify dependency authentication using approved checks.",
        "Check application readiness.",
      ],
      prevention: [
        "Validate required configuration before startup.",
        "Use managed secrets and controlled rotation.",
        "Document configuration contracts.",
      ],
    },
    {
      id: "RC05",
      cause: "Command or executable is missing",
      symptoms: [
        "The container exits with code 127.",
        "The logs report command not found.",
        "The failure follows a base-image or multi-stage build change.",
      ],
      confirmationSteps: [
        "Inspect the actual command and PATH assumptions.",
        "Check whether the executable exists in the final image.",
        "Review the build stage and artifact-copy steps.",
      ],
      resolution: [
        "Include the required executable or copy the correct artifact into the final image.",
        "Correct the executable path.",
        "Use an appropriate base image without adding unnecessary packages.",
      ],
      verification: [
        "Inspect the final image and startup command.",
        "Run the intended entrypoint and application checks.",
      ],
      prevention: [
        "Test the final multi-stage image.",
        "Add required-artifact checks.",
        "Keep build and runtime dependencies explicit.",
      ],
    },
    {
      id: "RC06",
      cause: "Executable permission or interpreter problem",
      symptoms: [
        "Logs report permission denied or an interpreter error.",
        "The container exits with code 126 or another nonzero code.",
        "A script works on one machine but fails in Linux CI.",
      ],
      confirmationSteps: [
        "Inspect file permissions, ownership, and the script's interpreter declaration.",
        "Check for incompatible line endings.",
        "Inspect the configured container user and mount options.",
      ],
      resolution: [
        "Correct executable permissions and ownership.",
        "Ensure the required interpreter exists in the image.",
        "Use a compatible script format and avoid unnecessary root privileges.",
      ],
      verification: [
        "Run the script as the intended container user.",
        "Confirm successful startup and required file access.",
      ],
      prevention: [
        "Validate scripts in Linux CI.",
        "Review file modes and line endings.",
        "Use least-privilege container users.",
      ],
    },
    {
      id: "RC07",
      cause: "Out-of-memory termination",
      symptoms: [
        "The container exits with code 137.",
        "Docker records OOMKilled as true, or kernel/cgroup evidence indicates memory exhaustion.",
        "The failure correlates with memory pressure or a workload increase.",
      ],
      confirmationSteps: [
        "Inspect container state and OOMKilled.",
        "Check Docker statistics and host memory pressure.",
        "Inspect kernel or platform events.",
        "Review application memory trends and configured limits.",
      ],
      resolution: [
        "Reduce excessive memory usage or fix a memory leak.",
        "Tune the container memory limit based on measured demand and host capacity.",
        "Increase host capacity when justified and approved.",
      ],
      verification: [
        "Run representative workload tests.",
        "Monitor memory usage and OOM events.",
        "Verify that the application remains healthy under expected load.",
      ],
      prevention: [
        "Alert on memory pressure and OOM kills.",
        "Load-test memory-intensive workloads.",
        "Track memory trends across releases.",
      ],
    },
    {
      id: "RC08",
      cause: "External stop or forced termination",
      symptoms: [
        "The container exits with code 143 or 137.",
        "Docker events show stop or kill activity.",
        "The timestamp coincides with a deployment or host operation.",
      ],
      confirmationSteps: [
        "Inspect Docker events and deployment history.",
        "Correlate the stop time with automation, maintenance, or operator activity.",
        "Check whether the termination was expected during replacement.",
      ],
      resolution: [
        "Correct the deployment or automation behavior if the stop was unintended.",
        "Allow adequate graceful-shutdown time where appropriate.",
        "Use the approved process to restore the intended workload.",
      ],
      verification: [
        "Confirm the new container starts and remains healthy.",
        "Verify graceful shutdown during a controlled replacement.",
      ],
      prevention: [
        "Audit lifecycle automation.",
        "Monitor unexpected stop events.",
        "Test termination handling and shutdown timeouts.",
      ],
    },
    {
      id: "RC09",
      cause: "Dependency unavailable during startup",
      symptoms: [
        "Logs show connection refused, timeout, DNS failure, or dependency authentication errors.",
        "The application exits instead of retrying or remaining in a controlled degraded state.",
        "The failure follows a dependency outage or network change.",
      ],
      confirmationSteps: [
        "Identify the exact dependency error.",
        "Check DNS, network reachability, dependency health, and authentication separately.",
        "Determine whether the application supports safe startup retries.",
      ],
      resolution: [
        "Restore dependency connectivity or correct the configuration.",
        "Use bounded retries and backoff where appropriate.",
        "Avoid unlimited retry loops that conceal a persistent configuration defect.",
      ],
      verification: [
        "Confirm dependency access.",
        "Verify the application initializes and serves requests.",
      ],
      prevention: [
        "Monitor dependencies.",
        "Implement appropriate resilience and timeout policies.",
        "Test startup behavior during dependency interruptions.",
      ],
    },
    {
      id: "RC10",
      cause: "Bind mount hides application files or prevents writes",
      symptoms: [
        "The image contains expected files but the running container cannot find them.",
        "Startup fails after a volume or bind-mount change.",
        "The application cannot write to a mounted directory.",
      ],
      confirmationSteps: [
        "Inspect mount sources, destinations, and access modes.",
        "Compare mount destinations with image directories.",
        "Check ownership and existence of host paths.",
      ],
      resolution: [
        "Correct the mount source or destination.",
        "Restore appropriate directory ownership and write permissions.",
        "Use named volumes or bind mounts according to the workload's requirements.",
      ],
      verification: [
        "Confirm required files are visible inside the container.",
        "Test only the necessary read/write operations.",
      ],
      prevention: [
        "Review mount changes.",
        "Validate host-path prerequisites.",
        "Document data ownership and persistence requirements.",
      ],
    },
    {
      id: "RC11",
      cause: "Application listens on the wrong address or port",
      symptoms: [
        "The application exits because a port is occupied or configuration is invalid.",
        "The container runs but the service is inaccessible.",
        "Logs show a bind or listen failure.",
      ],
      confirmationSteps: [
        "Read the application startup logs.",
        "Inspect configured container ports and published host ports.",
        "Determine whether the error concerns host binding or application binding inside the container.",
      ],
      resolution: [
        "Correct the application bind address or port configuration.",
        "Correct the host-port mapping if the conflict is on the host.",
        "Ensure health checks target the intended endpoint.",
      ],
      verification: [
        "Confirm the application listens on the intended address.",
        "Test connectivity from the relevant network path.",
      ],
      prevention: [
        "Document port requirements.",
        "Validate port mappings in deployment reviews.",
        "Test health-check endpoints.",
      ],
    },
    {
      id: "RC12",
      cause: "Container restart loop hides the first failure",
      symptoms: [
        "The container repeatedly starts and exits.",
        "The latest logs contain only part of the startup sequence.",
        "The restart count increases continuously.",
      ],
      confirmationSteps: [
        "Inspect current state and restart count.",
        "Capture logs from the failed process.",
        "Correlate events and timestamps.",
        "Check whether the restart mechanism is Docker, Compose, Swarm, or another orchestrator.",
      ],
      resolution: [
        "Fix the actual startup failure.",
        "Use the controller's supported configuration and rollout process.",
        "Avoid disabling restart behavior as a substitute for diagnosis.",
      ],
      verification: [
        "Confirm restart counts stop increasing.",
        "Verify readiness and real requests.",
        "Monitor after recovery.",
      ],
      prevention: [
        "Alert on repeated restarts.",
        "Preserve previous-instance logs where supported.",
        "Add startup diagnostics and meaningful health checks.",
      ],
    },
  ] satisfies ContainerExitRootCause[],

  incidentScenarios: [
    {
      title: "Production API container exits after a release",
      environment:
        "Production API running in Docker Compose on a Linux host.",
      severity: "SEV-2",
      impact: [
        "The API becomes unavailable on the affected host.",
        "Requests may fail if no healthy replicas or failover route exist.",
        "The release pipeline may have completed even though the application failed at startup.",
      ],
      timeline: [
        {
          time: "09:00",
          observation:
            "A reviewed image is deployed to the production host.",
          action:
            "Record the image digest, release ID, and deployment revision.",
        },
        {
          time: "09:02",
          observation:
            "The container exits shortly after startup.",
          action:
            "Check service impact and preserve logs before attempting recovery.",
        },
        {
          time: "09:04",
          observation:
            "Logs report that APP_MODE is missing.",
          action:
            "Compare required configuration with the effective deployment configuration without exposing secrets.",
        },
        {
          time: "09:08",
          observation:
            "The release configuration is missing a required non-secret setting.",
          action:
            "Review and correct the configuration through the approved change process.",
        },
        {
          time: "09:14",
          observation:
            "The container starts after the corrected configuration is applied through the deployment workflow.",
          action:
            "Verify readiness, service requests, and error rates.",
        },
        {
          time: "09:25",
          observation:
            "Service health remains stable.",
          action:
            "Record root cause and add configuration validation to CI.",
        },
      ],
      rootCause:
        "Illustrative confirmed cause: a required configuration value was missing. Actual incidents require evidence from logs and configuration history.",
      recovery: [
        "Preserve the failed container logs and metadata.",
        "Confirm the exact missing configuration key.",
        "Correct the deployment configuration without printing secrets.",
        "Recreate the container through the normal deployment mechanism.",
        "Verify readiness and customer-facing requests.",
      ],
      lessonsLearned: [
        "An image can build successfully and still fail during application startup.",
        "Required configuration should be validated before production rollout.",
        "Container status alone is not sufficient to establish service recovery.",
      ],
    },
    {
      title: "Container is killed during a memory spike",
      environment:
        "Linux host running several production containers.",
      severity: "SEV-2",
      impact: [
        "The affected service becomes unavailable or degraded.",
        "The host may experience pressure that affects other containers.",
        "Repeated restarts may worsen resource contention.",
      ],
      timeline: [
        {
          time: "14:10",
          observation:
            "Monitoring reports a sudden increase in application memory.",
          action:
            "Check the affected container and host memory pressure.",
        },
        {
          time: "14:12",
          observation:
            "The container exits with code 137.",
          action:
            "Inspect OOMKilled, Docker events, and kernel evidence rather than assuming OOM from the code alone.",
        },
        {
          time: "14:18",
          observation:
            "Host and container evidence indicate memory exhaustion.",
          action:
            "Assess the blast radius and inspect application memory trends.",
        },
        {
          time: "14:30",
          observation:
            "A memory-intensive workload is identified.",
          action:
            "Apply the approved mitigation and correct the underlying memory behavior.",
        },
        {
          time: "14:45",
          observation:
            "Memory usage stabilizes under representative traffic.",
          action:
            "Verify service health and continue monitoring.",
        },
      ],
      rootCause:
        "Illustrative scenario: memory exhaustion terminates the process. Exit code 137 alone does not prove this cause.",
      recovery: [
        "Preserve state and inspect memory evidence.",
        "Reduce or stop the source of excessive load using approved procedures.",
        "Fix a leak or tune limits based on measured capacity.",
        "Verify behavior under representative workload.",
      ],
      lessonsLearned: [
        "Exit code 137 requires corroborating evidence.",
        "Increasing memory limits without checking host capacity can shift the problem to other workloads.",
        "Memory alerts should fire before repeated termination occurs.",
      ],
    },
    {
      title: "A background command causes a service container to exit",
      environment: "CI validation and staging deployment.",
      severity: "SEV-3",
      impact: [
        "The service container stops immediately.",
        "The image build may still be successful.",
        "The pipeline may incorrectly treat image creation as proof of runtime health.",
      ],
      timeline: [
        {
          time: "11:00",
          observation:
            "A Dockerfile change is merged.",
          action:
            "Review the final image's ENTRYPOINT and CMD.",
        },
        {
          time: "11:05",
          observation:
            "The container exits with code 0 after launching a shell script.",
          action:
            "Inspect the actual process and application logs.",
        },
        {
          time: "11:10",
          observation:
            "The script starts the application in the background and then terminates.",
          action:
            "Correct the container startup behavior to run the intended foreground process.",
        },
        {
          time: "11:20",
          observation:
            "The revised image remains running and passes readiness checks.",
          action:
            "Add a runtime smoke test to the pipeline.",
        },
      ],
      rootCause:
        "Illustrative confirmed cause: the container's primary process completed while the service was running as a detached background process.",
      recovery: [
        "Correct the entrypoint or command.",
        "Build a reviewed image.",
        "Test the final image and process lifetime.",
        "Verify service readiness and graceful shutdown.",
      ],
      lessonsLearned: [
        "A container should run the intended primary process in the foreground.",
        "A successful build does not prove the container can serve requests.",
      ],
    },
  ] satisfies ContainerExitScenario[],

  decisionTree: [
    {
      symptom: "Container exits with code 0",
      evidence:
        "Logs show normal completion and the recorded state is exited.",
      likelyCause:
        "One-shot command completion or an unintended short-lived entrypoint.",
      nextAction:
        "Confirm the intended workload lifecycle and inspect ENTRYPOINT/CMD.",
    },
    {
      symptom: "Container exits with code 1",
      evidence:
        "Application logs show a startup error or unhandled exception.",
      likelyCause:
        "Application, configuration, or dependency initialization failure.",
      nextAction:
        "Inspect the first causal log message and validate the relevant configuration or dependency.",
    },
    {
      symptom: "Container exits with code 126 or 127",
      evidence:
        "Permission denied or command-not-found messages appear.",
      likelyCause:
        "Executable permission, missing binary, PATH, or interpreter issue.",
      nextAction:
        "Inspect the actual command, image contents, file permissions, and configured user.",
    },
    {
      symptom: "Container exits with code 137",
      evidence:
        "State, kernel, or runtime evidence may indicate OOM or forced termination.",
      likelyCause:
        "SIGKILL; possible OOM kill or external forced stop.",
      nextAction:
        "Inspect OOMKilled, host memory, Docker events, and deployment activity.",
    },
    {
      symptom: "Container exits with code 143",
      evidence:
        "Stop events or deployment history correlate with SIGTERM.",
      likelyCause:
        "Graceful stop, deployment replacement, or an external stop request.",
      nextAction:
        "Correlate timestamps and verify whether the stop was expected.",
    },
    {
      symptom: "Container repeatedly restarts",
      evidence:
        "Restart count increases and the same startup failure recurs.",
      likelyCause:
        "Persistent application or configuration failure combined with restart behavior.",
      nextAction:
        "Inspect failed-instance logs and fix the cause rather than disabling restarts blindly.",
    },
    {
      symptom: "Container is running but service is unavailable",
      evidence:
        "The process remains active, but health checks or real requests fail.",
      likelyCause:
        "Application readiness, port binding, network, or dependency problem.",
      nextAction:
        "Inspect health-check output, application logs, port mappings, and dependency access.",
    },
    {
      symptom: "Several containers fail together",
      evidence:
        "Failures share a host or timestamp.",
      likelyCause:
        "Host resource pressure, shared dependency outage, or platform maintenance.",
      nextAction:
        "Investigate shared infrastructure and correlate events before changing individual images.",
    },
  ],

  safeRecoveryProcedure: {
    principles: [
      "Preserve logs and inspect the stopped container before removing it.",
      "Confirm whether the workload is a service or a one-shot job.",
      "Determine whether a failed job may have partially completed its work.",
      "Use the smallest evidence-based correction.",
      "Use the owning deployment system to recreate managed containers.",
      "Protect secrets and customer data in logs and diagnostic output.",
      "Require production approval for production-changing operations.",
    ],

    workflow: [
      {
        step: 1,
        action: "Preserve the failure",
        verification:
          "The incident record contains the container ID, image digest, logs, state, exit code, and timestamps.",
      },
      {
        step: 2,
        action: "Identify the root cause",
        verification:
          "A specific application, configuration, resource, dependency, or lifecycle issue is supported by evidence.",
      },
      {
        step: 3,
        action: "Review the fix",
        verification:
          "The code or configuration diff addresses the confirmed cause and has required approval.",
      },
      {
        step: 4,
        action: "Validate safely",
        verification:
          "The revised image or configuration passes the relevant tests in a controlled environment.",
      },
      {
        step: 5,
        action: "Recover through the correct controller",
        verification:
          "The container is recreated or restarted using the supported deployment workflow.",
      },
      {
        step: 6,
        action: "Verify service health",
        verification:
          "The expected process remains active, readiness checks pass, and real requests succeed.",
      },
      {
        step: 7,
        action: "Monitor and document",
        verification:
          "Restart counts remain stable, error rates return to normal, and preventive actions are recorded.",
      },
    ],

    highRiskOperations: [
      {
        operation: "docker rm <container>",
        risk:
          "Moderate to high depending on the workload. It removes the container object and can discard inspectable state or writable-layer data.",
        saferApproach:
          "Capture logs and inspect metadata first. Confirm ownership, data persistence, and the controller responsible for recreating it.",
      },
      {
        operation: "docker rm -f <container>",
        risk:
          "High for production services because it forcefully removes a running or stopped container.",
        saferApproach:
          "Use only when authorized and necessary after assessing traffic, state, graceful shutdown, and recovery.",
      },
      {
        operation: "docker restart <container>",
        risk:
          "Moderate to high for production workloads. It interrupts the process and may repeat a non-idempotent operation.",
        saferApproach:
          "Check whether the workload is safe to restart, preserve logs, and use the owning deployment system.",
      },
      {
        operation: "docker compose down -v",
        risk:
          "High. The -v option removes declared named volumes and can delete persistent application data.",
        saferApproach:
          "Do not use it as a routine restart fix. Inspect volume ownership and persistence requirements before any approved data-removal operation.",
      },
      {
        operation: "Changing a restart policy",
        risk:
          "Moderate. It may conceal a persistent crash or change expected recovery behavior.",
        saferApproach:
          "Determine the root cause and intended workload lifecycle before modifying restart behavior.",
      },
    ],
  },

  prevention: {
    applicationDesign: [
      "Run the intended primary service process in the foreground.",
      "Handle SIGTERM and graceful shutdown correctly.",
      "Validate required configuration at startup.",
      "Use bounded dependency retries with backoff when appropriate.",
      "Emit structured logs for startup, failure, and shutdown.",
      "Make scheduled jobs and migrations safe to retry only when their design supports it.",
    ],

    containerConfiguration: [
      "Use explicit ENTRYPOINT and CMD settings.",
      "Use a non-root runtime user where practical.",
      "Set resource limits based on measured workload requirements.",
      "Configure meaningful health checks with appropriate timeouts and startup grace.",
      "Use persistent volumes only where data must survive container replacement.",
      "Review mount paths and ownership before release.",
    ],

    observability: [
      "Monitor container exits, restart counts, OOM kills, and startup duration.",
      "Alert when critical services stop or restart repeatedly.",
      "Monitor host memory, disk, inode usage, and container resource pressure.",
      "Collect logs and lifecycle events with consistent timestamps.",
      "Correlate runtime events with deployment and configuration changes.",
    ],

    releaseManagement: [
      "Record the source commit and image digest for every release.",
      "Run container startup and readiness smoke tests in CI.",
      "Use progressive rollout and health-based rollback where supported.",
      "Keep a known-good image and tested rollback procedure.",
      "Verify the actual deployed digest instead of relying only on a mutable tag.",
    ],

    security: [
      "Avoid embedding credentials in image layers or command arguments.",
      "Use approved secret-management and rotation mechanisms.",
      "Apply least-privilege permissions.",
      "Scan images and dependencies according to organizational policy.",
      "Redact sensitive data before sharing logs.",
    ],
  },

  commonMistakes: [
    {
      mistake: "Assuming exit code 137 always means OOM",
      whyItFails:
        "SIGKILL can result from OOM termination or an external forced stop.",
      betterApproach:
        "Check OOMKilled, kernel events, resource metrics, and stop history.",
    },
    {
      mistake: "Restarting repeatedly without reading logs",
      whyItFails:
        "The same startup error repeats and useful evidence may be lost.",
      betterApproach:
        "Preserve logs and state, then identify the first causal failure.",
    },
    {
      mistake: "Adding tail -f /dev/null to keep a container alive",
      whyItFails:
        "It can hide the fact that the application process has already failed.",
      betterApproach:
        "Correct the entrypoint so the intended application is the primary foreground process.",
    },
    {
      mistake: "Printing every environment variable",
      whyItFails:
        "Tokens, passwords, and other secrets can leak into logs.",
      betterApproach:
        "Validate required configuration keys without exposing secret values.",
    },
    {
      mistake: "Deleting the container before collecting evidence",
      whyItFails:
        "It can remove useful runtime metadata and writable-layer state.",
      betterApproach:
        "Capture logs, state, events, and image identity first.",
    },
    {
      mistake: "Treating running status as proof of health",
      whyItFails:
        "The process may be active while the application cannot serve requests.",
      betterApproach:
        "Verify readiness, dependencies, and actual service behavior.",
    },
    {
      mistake: "Increasing memory limits without checking host capacity",
      whyItFails:
        "It can move the memory-pressure problem to other workloads on the same host.",
      betterApproach:
        "Inspect memory usage, application behavior, and host capacity before tuning limits.",
    },
    {
      mistake: "Manually changing a controller-managed container",
      whyItFails:
        "The controller may overwrite the change or recreate the container.",
      betterApproach:
        "Change the authoritative Compose, Swarm, Kubernetes, or deployment configuration.",
    },
    {
      mistake: "Assuming a failed job can safely be rerun",
      whyItFails:
        "A job may have partially modified a database, uploaded files, or processed messages before termination.",
      betterApproach:
        "Determine whether the job is idempotent and inspect its side effects before retrying.",
    },
  ],

  incidentReportTemplate: {
    incidentId: "<incident-id>",
    startTime: "<UTC timestamp>",
    detectionSource: "<alert / monitoring / engineer>",
    affectedService: "<service-name>",
    affectedEnvironment: "<development / staging / production>",
    dockerHost: "<host-or-cluster>",
    containerId: "<container-id>",
    imageReference: "<image:tag>",
    imageDigest: "<digest-if-known>",
    sourceRevision: "<commit-sha>",
    exitCode: "<observed-exit-code>",
    oomKilled: "<true / false / unknown>",
    customerImpact: "<observed impact>",
    severity: "<SEV-1 / SEV-2 / SEV-3 / SEV-4>",
    firstFailureEvidence: "<redacted logs and event details>",
    confirmedRootCause: "<evidence-supported cause>",
    contributingFactors: ["<factor>"],
    recoveryActions: ["<action and timestamp>"],
    verificationEvidence: ["<health, request, log, and metric checks>"],
    rollbackDecision: "<not required / performed / pending approval>",
    preventionActions: [
      {
        action: "<preventive task>",
        owner: "<team-or-role>",
        dueDate: "<date>",
        status: "<open / in progress / complete>",
      },
    ],
    lessonsLearned: ["<lesson>"],
  },

  productionRunbook: [
    {
      phase: "Detection",
      checklist: [
        "Identify the container and affected service.",
        "Record exit code, timestamps, image, and deployment revision.",
        "Determine whether the process is exited, restarting, or running but unhealthy.",
      ],
    },
    {
      phase: "Impact and safety",
      checklist: [
        "Assess customer impact and remaining healthy capacity.",
        "Confirm the correct host and environment.",
        "Check whether a job may have partially completed work.",
        "Preserve logs and protect secrets.",
      ],
    },
    {
      phase: "Investigation",
      checklist: [
        "Read logs from the failed container.",
        "Inspect state, command, image, restart policy, mounts, and user.",
        "Correlate Docker events with deployment history.",
        "Check host resources and dependencies as indicated by evidence.",
      ],
    },
    {
      phase: "Recovery",
      checklist: [
        "Confirm the root cause with evidence.",
        "Review and approve the smallest corrective change.",
        "Validate the fix in a controlled environment.",
        "Recover through the owning deployment system.",
      ],
    },
    {
      phase: "Verification",
      checklist: [
        "Confirm expected process behavior.",
        "Check readiness and real service requests.",
        "Verify resource use and restart counts.",
        "Monitor for recurrence.",
      ],
    },
    {
      phase: "Closure",
      checklist: [
        "Document root cause and recovery evidence.",
        "Record rollback decisions.",
        "Assign prevention tasks and owners.",
        "Update the runbook and alerting rules.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "Why does a Docker container exit immediately?",
      answer:
        "The primary process may finish, crash, receive a signal, or fail during initialization. Inspect logs, exit status, the configured command, and lifecycle events before choosing a fix.",
    },
    {
      question: "What does exit code 0 mean?",
      answer:
        "The process reports successful completion. This may be expected for a one-shot job but unexpected for a long-running service.",
    },
    {
      question: "Does exit code 137 prove an OOM kill?",
      answer:
        "No. It commonly represents termination by SIGKILL. Correlate it with OOMKilled, kernel or cgroup evidence, memory metrics, and external stop events.",
    },
    {
      question: "What is the difference between ENTRYPOINT and CMD?",
      answer:
        "ENTRYPOINT defines the executable or entrypoint behavior, while CMD supplies default command arguments or the default command when no entrypoint is defined. Their interaction determines the process Docker launches.",
    },
    {
      question: "Why should the main application run in the foreground?",
      answer:
        "Docker tracks the primary process. If a shell script launches a background service and then exits, the container may terminate even though the background process was intended to remain active.",
    },
    {
      question: "How do you troubleshoot exit code 127?",
      answer:
        "Check the actual command, PATH, image contents, executable name, and whether the required binary exists in the final image.",
    },
    {
      question: "What is the difference between a restart policy and a health check?",
      answer:
        "A restart policy controls when Docker restarts a terminated container. A health check evaluates a configured health command. An unhealthy status alone does not necessarily cause Docker to restart the container.",
    },
    {
      question: "Why can a container be running but unavailable?",
      answer:
        "The application may not be ready, may listen on the wrong address, may fail dependencies, or may be unreachable through its network or published port.",
    },
    {
      question: "What should you inspect before deleting a stopped container?",
      answer:
        "Capture logs, state, exit code, timestamps, image identity, events, and any important writable-layer data. Confirm that persistent data is stored safely and that the container is not managed by a controller.",
    },
    {
      question: "How do you investigate repeated restarts?",
      answer:
        "Inspect the failed process logs, state, restart count, events, resource pressure, and deployment history. Fix the underlying cause rather than repeatedly restarting the workload.",
    },
    {
      question: "When is it unsafe to rerun a failed container job?",
      answer:
        "It may be unsafe when the process has non-idempotent side effects, such as database migrations, payment processing, message consumption, or external uploads. Inspect progress and use the job's recovery procedure first.",
    },
    {
      question: "How do you verify recovery?",
      answer:
        "Confirm the expected process stays active, readiness passes, real requests succeed, resource usage is stable, restart counts stop increasing, and the intended image and configuration are deployed.",
    },
  ] satisfies ContainerExitInterviewQuestion[],

  handsOnExercises: [
    {
      title: "Exercise 1: Container exits with code 0",
      symptoms: [
        "The container stops immediately.",
        "The exit code is 0.",
      ],
      task: [
        "Inspect logs and the configured command.",
        "Determine whether the image is intended for a service or one-shot task.",
        "Inspect ENTRYPOINT and CMD.",
      ],
      expectedFindings: [
        "The command may have completed normally.",
        "The service may have been launched as a background process.",
      ],
      solution: [
        "Correct the foreground process or use the appropriate one-shot workload model.",
        "Verify the intended lifecycle.",
      ],
    },
    {
      title: "Exercise 2: Container exits with code 137",
      symptoms: [
        "The container stops during a traffic spike.",
        "The exit code is 137.",
      ],
      task: [
        "Inspect State.OOMKilled.",
        "Check host memory, container metrics, and kernel events.",
        "Correlate the timestamp with deployment or operator activity.",
      ],
      expectedFindings: [
        "OOM evidence may confirm memory exhaustion, or external stop evidence may identify another cause.",
      ],
      solution: [
        "Fix the confirmed cause.",
        "Tune memory only after checking application behavior and host capacity.",
        "Verify recovery under representative load.",
      ],
    },
    {
      title: "Exercise 3: Missing executable",
      symptoms: [
        "The container exits with code 127.",
        "Logs report command not found.",
      ],
      task: [
        "Inspect actual Path and Args.",
        "Inspect image ENTRYPOINT and CMD.",
        "Check whether the executable exists in the final image.",
      ],
      expectedFindings: [
        "The binary may be missing, named incorrectly, or excluded from the final build stage.",
      ],
      solution: [
        "Correct the command or final-stage artifact copy.",
        "Rebuild and test the final image.",
      ],
    },
    {
      title: "Exercise 4: Missing configuration",
      symptoms: [
        "The application exits during startup.",
        "Logs identify a required configuration key.",
      ],
      task: [
        "Compare the configuration contract with the deployment definition.",
        "Check secret injection without printing values.",
        "Determine whether a container recreation is required.",
      ],
      expectedFindings: [
        "The required configuration may be absent or the container may still use an older configuration.",
      ],
      solution: [
        "Correct the approved configuration.",
        "Recreate the container through the deployment system.",
        "Verify readiness and service behavior.",
      ],
    },
    {
      title: "Exercise 5: Service runs but is unhealthy",
      symptoms: [
        "Docker reports the container as running.",
        "The health check fails and requests time out.",
      ],
      task: [
        "Inspect health-check output.",
        "Check the application bind address and port.",
        "Validate dependency readiness and network connectivity.",
      ],
      expectedFindings: [
        "The process may be alive but unable to serve traffic.",
      ],
      solution: [
        "Fix the application, dependency, network, or health-check configuration as evidence indicates.",
        "Verify the real request path, not only container status.",
      ],
    },
  ] satisfies ContainerExitExercise[],

  finalVerificationChecklist: [
    "The exact container and environment were confirmed.",
    "Logs and state were preserved before destructive actions.",
    "The exit code was interpreted with supporting evidence.",
    "The intended command, image, and configuration were verified.",
    "The root cause was distinguished from similar symptoms.",
    "The corrective change was reviewed and approved.",
    "The container was recovered through the correct deployment mechanism.",
    "The expected process behavior and readiness were confirmed.",
    "Real application requests succeeded.",
    "Resource metrics and restart counts remained stable.",
    "No secrets were exposed during diagnosis.",
    "The incident report and preventive actions were recorded.",
  ],
} satisfies {
  id: string;
  title: string;
  tool: string;
  category: string;
  difficulty: string;
  summary: string;
  objectives: string[];
  placeholders: Record<string, string>;
  overview: {
    definition: string;
    lifecycle: Array<{
      step: number;
      name: string;
      explanation: string;
    }>;
    importantDistinctions: Array<{
      symptom: string;
      meaning: string;
      nextAction: string;
    }>;
    exitCodeCaution: string;
  };
  severityAssessment: Array<{
    level: "SEV-1" | "SEV-2" | "SEV-3" | "SEV-4";
    criteria: string;
    actions: string[];
  }>;
  incidentResponseWorkflow: Array<{
    step: number;
    title: string;
    actions: string[];
    decision: string;
  }>;
  diagnostics: ContainerExitDiagnostic[];
  rootCauses: ContainerExitRootCause[];
  incidentScenarios: ContainerExitScenario[];
  decisionTree: Array<{
    symptom: string;
    evidence: string;
    likelyCause: string;
    nextAction: string;
  }>;
  safeRecoveryProcedure: {
    principles: string[];
    workflow: Array<{
      step: number;
      action: string;
      verification: string;
    }>;
    highRiskOperations: Array<{
      operation: string;
      risk: string;
      saferApproach: string;
    }>;
  };
  prevention: {
    applicationDesign: string[];
    containerConfiguration: string[];
    observability: string[];
    releaseManagement: string[];
    security: string[];
  };
  commonMistakes: Array<{
    mistake: string;
    whyItFails: string;
    betterApproach: string;
  }>;
  incidentReportTemplate: {
    incidentId: string;
    startTime: string;
    detectionSource: string;
    affectedService: string;
    affectedEnvironment: string;
    dockerHost: string;
    containerId: string;
    imageReference: string;
    imageDigest: string;
    sourceRevision: string;
    exitCode: string;
    oomKilled: string;
    customerImpact: string;
    severity: string;
    firstFailureEvidence: string;
    confirmedRootCause: string;
    contributingFactors: string[];
    recoveryActions: string[];
    verificationEvidence: string[];
    rollbackDecision: string;
    preventionActions: Array<{
      action: string;
      owner: string;
      dueDate: string;
      status: string;
    }>;
    lessonsLearned: string[];
  };
  productionRunbook: Array<{
    phase: string;
    checklist: string[];
  }>;
  interviewQuestions: ContainerExitInterviewQuestion[];
  handsOnExercises: ContainerExitExercise[];
  finalVerificationChecklist: string[];
};

export default containerExitsGuide;
