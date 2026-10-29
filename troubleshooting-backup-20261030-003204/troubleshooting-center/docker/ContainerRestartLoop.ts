
export interface RestartLoopStep {
  title: string;
  purpose: string;
  commands: string[];
  expectedEvidence: string[];
  interpretation: string[];
  nextAction: string[];
}

export interface RestartLoopScenario {
  title: string;
  symptoms: string[];
  timeline: string[];
  evidence: string[];
  rootCause: string;
  resolution: string[];
  prevention: string[];
}

export interface RestartLoopQuestion {
  question: string;
  answer: string;
  followUp: string;
}

export interface RestartLoopGuide {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  summary: string;
  overview: {
    definition: string;
    lifecycle: string[];
    distinctions: string[];
    commonCauses: string[];
  };
  severityMatrix: {
    environment: string;
    impact: string;
    severity: string;
    response: string;
  }[];
  safetyChecks: string[];
  incidentScenario: RestartLoopScenario;
  evidenceCollection: {
    source: string;
    commands: string[];
    purpose: string;
    cautions: string[];
  }[];
  diagnosticWorkflow: RestartLoopStep[];
  exitCodeReference: {
    code: string;
    meaning: string;
    whatToVerify: string[];
  }[];
  rootCausePlaybooks: {
    cause: string;
    evidence: string[];
    diagnosis: string[];
    remediation: string[];
    validation: string[];
  }[];
  recoveryWorkflow: {
    phase: string;
    actions: string[];
    successCriteria: string[];
  }[];
  decisionTree: {
    symptom: string;
    evidence: string;
    likelyCause: string;
    nextAction: string;
  }[];
  prevention: {
    area: string;
    practices: string[];
  }[];
  commonMistakes: {
    mistake: string;
    whyItFails: string;
    betterApproach: string;
  }[];
  incidentReportTemplate: string[];
  productionRunbook: {
    phase: string;
    checklist: string[];
  }[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    expectedFinding: string;
    solution: string[];
  }[];
  interviewQuestions: RestartLoopQuestion[];
  references: {
    title: string;
    url: string;
  }[];
}

export const containerRestartLoopGuide = {
  title: "Docker Container Restart Loop — Production Troubleshooting Guide",
  slug: "container-restart-loop",
  category: "Docker",
  difficulty: "Advanced",
  summary:
    "A production-focused incident response guide for diagnosing containers that repeatedly stop and restart. Covers Docker lifecycle state, restart policies, exit codes, OOM kills, application startup failures, PID 1 and signal handling, configuration errors, dependency failures, health checks, Compose, orchestrators, controlled recovery, rollback, observability, incident reporting, hands-on labs, and interview questions.",

  overview: {
    definition:
      "A container restart loop occurs when a container repeatedly terminates or is restarted by its runtime, restart policy, orchestrator, operator, or an external automation system. The container may run for milliseconds or several minutes before stopping again. Repeated restarts can cause downtime, failed deployments, request errors, lost in-memory state, queue backlogs, cascading failures, and increased infrastructure load.",

    lifecycle: [
      "1. Docker creates the container from an image and applies the configured command, environment, mounts, networking, security settings, and resource limits.",
      "2. The container runtime starts the configured process. The application should initialize configuration, credentials, dependencies, listeners, and background workers.",
      "3. If the primary process exits, the container stops. An exit code, timestamps, logs, and state details may provide clues about the termination.",
      "4. If a restart policy applies, Docker may restart the stopped container. An external supervisor or orchestrator may also restart or replace it.",
      "5. The next process start may encounter the same defect, creating a repeating failure pattern.",
      "6. Engineers collect evidence, correlate each restart with deployment and infrastructure events, isolate the trigger, apply a controlled fix, and verify stability."
    ],

    distinctions: [
      "Docker restart loop: a container repeatedly stops and starts, commonly because of its restart policy or external automation.",
      "Kubernetes CrashLoopBackOff: a Kubernetes container repeatedly exits, and Kubernetes applies increasing delays before retrying. It is not the same status as Docker's standalone restart policy.",
      "Unhealthy container: a health check reports failure. The Docker health status alone does not automatically restart a standalone container; another mechanism must take action.",
      "Exited container: the container process has stopped. An exit code of 0 can be normal for a one-shot task.",
      "OOM kill: the process or container is killed because of memory pressure or an applicable memory limit. Exit code 137 is a clue, not proof by itself.",
      "Container replacement: Compose, Kubernetes, Swarm, or a deployment controller may create a replacement container. Inspect the orchestrator and container IDs rather than assuming the same container is restarting.",
      "Build failure: the image cannot be built successfully. This is different from a successfully created container whose runtime process exits.",
      "Image pull failure: the runtime cannot obtain the requested image. No application startup has occurred for that failed container instance.",
      "Application restart loop: the application or an internal supervisor repeatedly starts child processes, while the container itself may remain running. Confirm which process is actually restarting."
    ],

    commonCauses: [
      "The application exits because of a startup exception or an unhandled runtime error.",
      "A required environment variable, configuration file, certificate, or mounted secret is missing or invalid.",
      "The configured ENTRYPOINT or CMD is wrong, or the expected executable is absent.",
      "A shell wrapper does not correctly replace itself with the application process or forward termination signals.",
      "The application listens on the wrong interface or port, or fails while binding a port.",
      "A database, DNS service, API, message broker, or other dependency is unavailable during startup.",
      "The container exceeds its memory limit, or the host experiences memory pressure.",
      "A mounted file or directory has the wrong owner, permissions, or contents.",
      "The application cannot write to its working directory, temporary directory, log path, or persistent mount.",
      "A recent image, configuration, secret, schema, or dependency change introduced a regression.",
      "The configured restart policy repeatedly retries a process that is expected to terminate.",
      "An external orchestrator replaces containers after failed probes or desired-state reconciliation.",
      "The process receives SIGTERM or SIGKILL during deployments, host maintenance, manual intervention, or automated remediation.",
      "A health-check command is invalid or its timing thresholds are too aggressive.",
      "The image architecture, runtime dependency, native library, or executable format is incompatible with the host.",
      "A disk, inode, file-descriptor, process-count, or connection limit prevents reliable startup."
    ]
  },

  severityMatrix: [
    {
      environment: "Development",
      impact:
        "A developer's local container repeatedly exits. Shared environments and customers are unaffected.",
      severity: "SEV-4 / Low",
      response:
        "Capture logs and configuration, reproduce the failure, and correct the defect before promoting the image."
    },
    {
      environment: "Staging or QA",
      impact:
        "Testing, release validation, or a scheduled demonstration is blocked. Production may remain healthy.",
      severity: "SEV-3 / Moderate",
      response:
        "Identify the release change, verify dependencies and environment differences, and block promotion until validation passes."
    },
    {
      environment: "Production — one noncritical replica",
      impact:
        "Capacity is reduced but remaining replicas continue serving requests.",
      severity: "SEV-2 / High",
      response:
        "Check remaining capacity, error rates, and load. Stabilize safely and monitor for cascading impact."
    },
    {
      environment: "Production — all replicas or critical dependency",
      impact:
        "Customer requests fail, a critical API is unavailable, jobs stop processing, or data processing falls behind.",
      severity: "SEV-1 / Critical",
      response:
        "Declare an incident, notify the incident commander and service owner, assess rollback, preserve evidence, and prioritize safe service restoration."
    }
  ],

  safetyChecks: [
    "Confirm the incident time, affected service, host or cluster, environment, region, and deployment revision.",
    "Confirm the active Docker context before inspecting or modifying resources: docker context show.",
    "Confirm the actual Docker daemon and host. A correct context name does not by itself prove that the target is the intended production environment.",
    "Record the container ID, container name, image tag, immutable image digest, creation time, start time, and restart count.",
    "Confirm whether Docker Compose, Swarm, Kubernetes, or another supervisor manages the workload. Do not independently manipulate a controller-managed container without understanding reconciliation behavior.",
    "Check whether a deployment, rollback, configuration update, secret rotation, node maintenance, autoscaling event, or operator action occurred near the first failure.",
    "Check whether any containers or replicas are still serving traffic. Do not stop healthy replicas during an incident unless the recovery plan requires it.",
    "Determine whether the service is stateful. Identify persistent volumes, write activity, queues, transactions, and recovery requirements before replacement or rollback.",
    "Obtain required production change approval and follow the incident command structure.",
    "Begin with read-only diagnostics. Do not restart, delete, recreate, prune, or change resource limits merely to see whether the problem disappears.",
    "Do not print or share passwords, access tokens, connection strings, private keys, complete environment dumps, or unsanitized Compose configuration.",
    "Preserve logs and timestamps before a restart or replacement can make useful evidence harder to retrieve.",
    "Record every mitigation, command, configuration change, approval, and observed result in the incident timeline."
  ],

  incidentScenario: {
    title: "Production API starts restarting immediately after a deployment",

    symptoms: [
      "The deployment pipeline reports success, but the API's availability alert fires shortly afterward.",
      "The container restart count rises rapidly.",
      "The service returns intermittent HTTP 502 or 503 responses.",
      "Application logs show startup errors, or the logs end abruptly after each attempt.",
      "The previous image was stable, but the new release fails in production."
    ],

    timeline: [
      "09:00 — The previous application revision is healthy and all replicas are available.",
      "09:05 — A new image digest is deployed through the release pipeline.",
      "09:06 — The deployment controller reports that the new workload has started.",
      "09:07 — Readiness or availability alerts report reduced healthy capacity.",
      "09:08 — Container restart counts increase. The load balancer reports failed targets.",
      "09:10 — The on-call engineer acknowledges the incident and checks whether unaffected replicas can continue serving traffic.",
      "09:12 — Read-only inspection captures the current image digest, restart count, state, exit code, timestamps, health information, and logs.",
      "09:15 — The team correlates the first failure with the deployment and checks the image and configuration changes.",
      "09:20 — Evidence points to a specific startup failure, such as a missing configuration key. The team verifies the hypothesis before changing production.",
      "09:25 — An approved configuration correction or rollback is applied through the normal release mechanism.",
      "09:30 — The replacement workload starts successfully. Readiness, request success, error rate, and restart count are checked.",
      "09:45 — The team confirms stable service and records the root cause, recovery actions, and preventive work."
    ],

    evidence: [
      "Deployment ID, source commit, artifact digest, configuration version, and release timestamp.",
      "Container ID and image digest before and after the rollout.",
      "Container State, ExitCode, OOMKilled, Error, StartedAt, FinishedAt, and RestartCount.",
      "Timestamped application logs and Docker events covering the first failure.",
      "Health-check status and recent probe results, if configured.",
      "Memory usage, configured memory limit, host memory pressure, disk space, and inode availability.",
      "Load balancer target health, application request rate, error rate, latency, and healthy replica count.",
      "Changes to environment variables, mounted files, secrets, permissions, startup command, dependencies, and network configuration."
    ],

    rootCause:
      "Illustrative hypothesis: the new image expects a required configuration variable that was not supplied in the production environment. The application exits during initialization, and the restart policy repeatedly starts it. This is only the confirmed root cause if the logs and configuration comparison support it; the scenario must not be treated as proof for every restart loop.",

    resolution: [
      "Preserve the failing container's state and logs before changing anything.",
      "Compare the last healthy revision with the failing revision, including the effective configuration and image digest.",
      "Verify the missing setting against the approved configuration source without exposing secret values.",
      "Determine whether correcting the setting or rolling back the image is safer and faster.",
      "Obtain production approval and apply the fix through the deployment pipeline or controller.",
      "Verify startup, health/readiness, real requests, downstream dependencies, and capacity.",
      "Monitor the service for recurrence and confirm that restart counts stop increasing.",
      "Document the causal evidence and add a regression check to the release process."
    ],

    prevention: [
      "Validate required configuration keys before deployment.",
      "Use immutable image digests and retain the last known-good release.",
      "Test startup and dependency failure behavior in CI and staging.",
      "Use readiness checks that reflect actual ability to serve traffic.",
      "Alert on unexpected restart-rate increases and loss of healthy replicas.",
      "Use gradual rollout, automatic health-based promotion gates, and a tested rollback procedure.",
      "Add a runbook and a post-incident action owner."
    ]
  },

  evidenceCollection: [
    {
      source: "Container inventory and restart count",
      commands: [
        "docker context show",
        "docker ps -a --no-trunc",
        "docker inspect --format '{{.Id}} {{.Name}} {{.Config.Image}} {{.Image}} {{.State.Status}} {{.State.ExitCode}} {{.RestartCount}}' CONTAINER"
      ],
      purpose:
        "Confirm the active Docker context and capture the container identity, requested image, resolved image ID, current state, exit code, and restart count.",
      cautions: [
        "Replace CONTAINER with the verified container name or ID.",
        "A container name can be reused after recreation. Record the full ID.",
        "Do not assume the requested image tag uniquely identifies the deployed image; compare its immutable digest."
      ]
    },
    {
      source: "Detailed container state",
      commands: [
        "docker inspect --format '{{json .State}}' CONTAINER",
        "docker inspect --format '{{.HostConfig.RestartPolicy.Name}} {{.HostConfig.RestartPolicy.MaximumRetryCount}}' CONTAINER",
        "docker inspect --format '{{json .State.Health}}' CONTAINER"
      ],
      purpose:
        "Inspect lifecycle status, exit code, OOMKilled flag, error text, start and finish timestamps, restart policy, and health-check history.",
      cautions: [
        "The health object may be absent if no health check is configured.",
        "An absent or false OOMKilled flag does not rule out every form of host memory pressure.",
        "A restart policy may not be the only actor restarting or replacing a workload."
      ]
    },
    {
      source: "Application and runtime logs",
      commands: [
        "docker logs --timestamps --tail 300 CONTAINER",
        "docker logs --timestamps --since 30m CONTAINER",
        "docker events --since 30m --filter container=CONTAINER"
      ],
      purpose:
        "Correlate application startup messages with stop, die, restart, kill, and other runtime events.",
      cautions: [
        "Container logs may be incomplete, rotated, or sent to an external logging driver.",
        "Use an appropriate time window and account for timezone differences.",
        "Redact sensitive values before sharing log output."
      ]
    },
    {
      source: "Image and startup configuration",
      commands: [
        "docker inspect --format '{{json .Config.Entrypoint}} {{json .Config.Cmd}}' CONTAINER",
        "docker inspect --format '{{.Config.WorkingDir}} {{.Config.User}}' CONTAINER",
        "docker inspect --format '{{json .Mounts}}' CONTAINER",
        "docker image inspect IMAGE"
      ],
      purpose:
        "Compare the startup executable, arguments, working directory, runtime user, mounts, and image metadata against the last healthy release.",
      cautions: [
        "Use the exact image identifier from the incident.",
        "Inspecting configuration is usually read-only, but environment or mount details can disclose sensitive paths or settings.",
        "Never paste unredacted secrets into a ticket or chat."
      ]
    },
    {
      source: "Resource and host health",
      commands: [
        "docker stats --no-stream CONTAINER",
        "docker system df",
        "free -h",
        "df -h",
        "df -i",
        "ps -eo pid,ppid,%mem,%cpu,stat,cmd --sort=-%mem | head"
      ],
      purpose:
        "Check memory consumption, disk capacity, inode exhaustion, and competing host processes.",
      cautions: [
        "Host commands apply to the host where they are executed; confirm that it is the correct host.",
        "Some commands require Linux and may not be available in Docker Desktop or managed container environments.",
        "A one-time resource snapshot may miss a short spike that occurred before the container exited."
      ]
    },
    {
      source: "Linux kernel and Docker daemon",
      commands: [
        "journalctl -u docker --since '30 minutes ago'",
        "dmesg -T | grep -i -E 'oom|killed process|out of memory'",
        "docker info"
      ],
      purpose:
        "Look for runtime errors, daemon issues, host-level OOM events, and system-wide resource constraints.",
      cautions: [
        "These commands are platform-specific and may require elevated privileges.",
        "Kernel logs may not be accessible in managed environments.",
        "Do not restart the Docker daemon as a first-line troubleshooting action on a shared production host."
      ]
    },
    {
      source: "Docker Compose configuration",
      commands: [
        "docker compose ps -a",
        "docker compose logs --timestamps --tail 300 SERVICE",
        "docker compose config --quiet"
      ],
      purpose:
        "Inspect service status and logs and validate the Compose model when supported by the installed version.",
      cautions: [
        "Run commands from the correct project directory with the intended Compose files and environment.",
        "Compose config validation does not prove that an application can start or that its dependencies are healthy.",
        "A full resolved Compose configuration may expose secrets. Review locally and sanitize before sharing."
      ]
    },
    {
      source: "Kubernetes-managed containers",
      commands: [
        "kubectl config current-context",
        "kubectl get pods -n NAMESPACE -o wide",
        "kubectl describe pod POD -n NAMESPACE",
        "kubectl logs POD -n NAMESPACE -c CONTAINER --previous --timestamps",
        "kubectl get events -n NAMESPACE --sort-by=.metadata.creationTimestamp"
      ],
      purpose:
        "Use Kubernetes-native evidence when the failing container belongs to a Pod managed by Kubernetes.",
      cautions: [
        "Verify cluster context and namespace before investigating or changing resources.",
        "The previous-container logs option is useful when the prior container terminated and those logs remain available.",
        "Do not treat Kubernetes CrashLoopBackOff as a standalone Docker restart-policy status."
      ]
    }
  ],

  diagnosticWorkflow: [
    {
      title: "Step 1 — Confirm the actual failure and its scope",
      purpose:
        "Determine whether a container is repeatedly exiting, an application process is restarting internally, or an orchestrator is replacing containers.",
      commands: [
        "docker context show",
        "docker ps -a --no-trunc",
        "docker inspect --format '{{.Name}} {{.Id}} {{.State.Status}} {{.State.ExitCode}} {{.RestartCount}}' CONTAINER"
      ],
      expectedEvidence: [
        "A growing RestartCount with recurring start and finish timestamps suggests repeated lifecycle activity.",
        "A stopped container with ExitCode 0 may be a completed job rather than a failure.",
        "New container IDs may indicate replacement rather than restarting the same container."
      ],
      interpretation: [
        "If the service is managed by Kubernetes, Swarm, or Compose, inspect its controller and desired state.",
        "If the container remains running while only an application worker restarts, investigate the application supervisor instead.",
        "If the container never starts because the image cannot be pulled or created, investigate that earlier lifecycle stage."
      ],
      nextAction: [
        "Record environment, container ID, image digest, restart count, first failure time, and healthy replica count.",
        "Proceed to detailed state and log collection before applying changes."
      ]
    },
    {
      title: "Step 2 — Preserve state and establish a timeline",
      purpose:
        "Capture the current evidence and find when the failure first appeared.",
      commands: [
        "docker inspect --format '{{json .State}}' CONTAINER",
        "docker logs --timestamps --tail 300 CONTAINER",
        "docker events --since 30m --filter container=CONTAINER"
      ],
      expectedEvidence: [
        "State fields include Status, Running, Restarting, ExitCode, OOMKilled, Error, StartedAt, and FinishedAt where available.",
        "Logs may show a configuration exception, missing executable, permission denial, failed dependency connection, or abrupt termination.",
        "Events may show start, die, kill, or other lifecycle transitions."
      ],
      interpretation: [
        "A startup error immediately before every exit suggests a repeatable startup defect.",
        "An abrupt log ending is not proof of an OOM kill; correlate with state, host logs, and monitoring.",
        "A SIGTERM around deployment time may indicate an intentional stop or rollout."
      ],
      nextAction: [
        "Save sanitized evidence with timestamps.",
        "Correlate the first failure with deployment, configuration, host, and dependency events."
      ]
    },
    {
      title: "Step 3 — Inspect the exact image and startup command",
      purpose:
        "Verify that the container is running the expected artifact and command.",
      commands: [
        "docker inspect --format '{{.Config.Image}} {{.Image}}' CONTAINER",
        "docker inspect --format '{{json .Config.Entrypoint}} {{json .Config.Cmd}}' CONTAINER",
        "docker inspect --format '{{.Config.WorkingDir}} {{.Config.User}}' CONTAINER",
        "docker image inspect IMAGE"
      ],
      expectedEvidence: [
        "The requested tag and resolved image ID can be compared with the approved release.",
        "Entrypoint, command, working directory, and user may differ from the previous working release.",
        "Image metadata may reveal a wrong platform, entrypoint, or expected runtime."
      ],
      interpretation: [
        "If the image digest differs from the approved release, confirm whether the new artifact was intended.",
        "If the executable is absent or the command is malformed, investigate image build and startup configuration.",
        "If the command is correct, continue to runtime logs, environment, mounts, and dependencies."
      ],
      nextAction: [
        "Compare the failing artifact with the last known-good image.",
        "Do not rebuild or overwrite production tags before preserving the failing digest."
      ]
    },
    {
      title: "Step 4 — Classify the exit code without guessing",
      purpose:
        "Use the exit code as a clue, then verify the cause with other evidence.",
      commands: [
        "docker inspect --format 'Exit={{.State.ExitCode}} OOM={{.State.OOMKilled}} Error={{.State.Error}}' CONTAINER",
        "docker inspect --format 'Started={{.State.StartedAt}} Finished={{.State.FinishedAt}}' CONTAINER"
      ],
      expectedEvidence: [
        "ExitCode 0 can indicate successful completion of a one-shot task.",
        "ExitCode 1 often indicates a generic application error.",
        "ExitCode 137 commonly indicates SIGKILL, but is not proof of OOM.",
        "ExitCode 143 commonly indicates termination by SIGTERM."
      ],
      interpretation: [
        "Correlate 137 with OOMKilled, kernel logs, memory metrics, and limit settings.",
        "Correlate 143 with deployment events, graceful shutdown logs, operators, and host maintenance.",
        "For other nonzero codes, use application-specific exit-code documentation and the logs."
      ],
      nextAction: [
        "Select the matching root-cause playbook based on corroborating evidence.",
        "If the evidence is inconclusive, collect more data rather than changing multiple settings at once."
      ]
    },
    {
      title: "Step 5 — Check memory, CPU, disk, and host pressure",
      purpose:
        "Identify resource exhaustion or host-level instability that may interrupt startup.",
      commands: [
        "docker stats --no-stream CONTAINER",
        "docker inspect --format '{{.HostConfig.Memory}} {{.HostConfig.NanoCpus}}' CONTAINER",
        "free -h",
        "df -h",
        "df -i",
        "journalctl -u docker --since '30 minutes ago'"
      ],
      expectedEvidence: [
        "A configured memory limit, high memory usage, or kernel OOM event can support an OOM hypothesis.",
        "A full filesystem or exhausted inodes can prevent logs, temporary files, or application state from being written.",
        "CPU starvation can make startup exceed probe or external timeout thresholds."
      ],
      interpretation: [
        "A snapshot taken after a crash may not show the peak resource usage.",
        "Host-wide memory pressure and a container-specific memory-limit violation are related but distinct possibilities.",
        "Do not increase limits without checking host capacity and neighboring workloads."
      ],
      nextAction: [
        "Use historical monitoring where available.",
        "Apply only the resource change supported by evidence and approved capacity planning."
      ]
    },
    {
      title: "Step 6 — Validate configuration, mounts, permissions, and dependencies",
      purpose:
        "Find startup failures caused by missing or invalid runtime inputs.",
      commands: [
        "docker inspect --format '{{.Config.WorkingDir}} {{.Config.User}}' CONTAINER",
        "docker inspect --format '{{json .Mounts}}' CONTAINER",
        "docker inspect --format '{{json .NetworkSettings.Networks}}' CONTAINER",
        "docker compose ps -a",
        "docker compose logs --timestamps --tail 200 SERVICE"
      ],
      expectedEvidence: [
        "A bind mount may hide files already present in the image.",
        "The runtime user may lack permission to read configuration or write required directories.",
        "Application logs may show missing keys, invalid certificates, DNS failures, connection timeouts, or authentication failures."
      ],
      interpretation: [
        "Verify the configuration source and key names without printing secret values.",
        "Check dependency health, network path, DNS, credentials, and timeouts separately.",
        "Do not assume that starting the database container proves the database is ready to accept connections."
      ],
      nextAction: [
        "Reproduce the specific failure in a safe environment if production evidence is insufficient.",
        "Correct the verified configuration, permission, mount, or dependency issue through the approved release process."
      ]
    },
    {
      title: "Step 7 — Distinguish process exit from health-check failure",
      purpose:
        "Determine whether the main process exits or the container remains running but fails health checks.",
      commands: [
        "docker inspect --format '{{.State.Status}} {{json .State.Health}}' CONTAINER",
        "docker inspect --format '{{json .Config.Healthcheck}}' CONTAINER",
        "docker logs --timestamps --tail 200 CONTAINER"
      ],
      expectedEvidence: [
        "A running container can have an unhealthy health status.",
        "Health-check output may show a failed command, wrong port, invalid path, or timeout.",
        "A stopped container has a process lifecycle failure even if health checks are also configured."
      ],
      interpretation: [
        "Docker health status alone does not automatically restart a standalone container.",
        "An external monitor, orchestrator, or operator may react to health failures.",
        "A probe that runs before the application is ready can generate false failures."
      ],
      nextAction: [
        "Validate the health-check command, endpoint, interval, timeout, retries, and startup grace behavior.",
        "Do not weaken a probe just to make the service appear healthy; confirm real service readiness."
      ]
    },
    {
      title: "Step 8 — Compare deployment and orchestration behavior",
      purpose:
        "Find whether a recent rollout, controller, restart policy, or host action is causing repeated lifecycle transitions.",
      commands: [
        "docker inspect --format '{{.HostConfig.RestartPolicy.Name}} {{.HostConfig.RestartPolicy.MaximumRetryCount}}' CONTAINER",
        "docker events --since 30m --filter container=CONTAINER",
        "docker compose ps -a",
        "kubectl describe pod POD -n NAMESPACE"
      ],
      expectedEvidence: [
        "The configured restart policy shows whether Docker is set to retry after exits.",
        "Deployment timestamps can correlate with termination and replacement events.",
        "Orchestrator events may show probe failures, scheduling issues, failed mounts, or controller reconciliation."
      ],
      interpretation: [
        "A restart policy describes retry behavior, not the original application defect.",
        "A controller-managed workload can be recreated after direct manual changes.",
        "A successful deployment command does not prove that the application passed readiness or customer-level checks."
      ],
      nextAction: [
        "Use the controller's deployment and rollback mechanisms where applicable.",
        "Fix the underlying startup or infrastructure problem instead of suppressing restart behavior."
      ]
    },
    {
      title: "Step 9 — Prove the root cause and select a minimal correction",
      purpose:
        "Avoid speculative changes and ensure that the proposed fix explains the observed evidence.",
      commands: [
        "git log -n 5 --oneline",
        "git diff PREVIOUS_COMMIT..CURRENT_COMMIT --",
        "docker image inspect IMAGE"
      ],
      expectedEvidence: [
        "A configuration or code change aligns with the first failure.",
        "The proposed correction predicts the observed exit or startup behavior.",
        "A staging test or controlled reproduction confirms the hypothesis."
      ],
      interpretation: [
        "A temporal correlation is useful but not sufficient on its own to establish causality.",
        "If several variables changed together, isolate the relevant difference before modifying production.",
        "If no hypothesis fits the evidence, escalate to the application owner or platform team."
      ],
      nextAction: [
        "Document the causal evidence and the expected result of the fix.",
        "Obtain approval for the least risky remediation and define rollback criteria before execution."
      ]
    },
    {
      title: "Step 10 — Verify recovery and monitor for recurrence",
      purpose:
        "Prove that the service is stable after the approved correction.",
      commands: [
        "docker ps --no-trunc",
        "docker inspect --format '{{.State.Status}} {{.State.ExitCode}} {{.RestartCount}}' CONTAINER",
        "docker logs --timestamps --tail 100 CONTAINER",
        "docker stats --no-stream CONTAINER"
      ],
      expectedEvidence: [
        "The expected image digest is running.",
        "Restart counts stop increasing during the observation window.",
        "Health and readiness checks pass, real requests succeed, and resource usage is sustainable."
      ],
      interpretation: [
        "A container that starts once is not necessarily recovered.",
        "A successful health check does not prove that all customer workflows work.",
        "Confirm adequate replica capacity and downstream dependency health."
      ],
      nextAction: [
        "Monitor service-level indicators for an agreed period.",
        "Close the incident only after the service owner accepts recovery and the evidence is recorded."
      ]
    }
  ],

  exitCodeReference: [
    {
      code: "0",
      meaning: "The process exited successfully.",
      whatToVerify: [
        "Determine whether the container was intended to run a one-shot task.",
        "If it was meant to be a long-running service, inspect the command and application lifecycle.",
        "Check whether a supervisor or restart policy is repeatedly starting a process that immediately completes."
      ]
    },
    {
      code: "1",
      meaning: "Generic application failure.",
      whatToVerify: [
        "Read the last application log lines before exit.",
        "Inspect startup configuration, validation errors, dependency failures, and application-specific diagnostics.",
        "Do not infer a specific root cause from code 1 alone."
      ]
    },
    {
      code: "126",
      meaning: "The command was found but could not be invoked in common shell contexts.",
      whatToVerify: [
        "Check executable permissions, runtime user, mount permissions, and executable format.",
        "Confirm that the image command is correct for the container environment."
      ]
    },
    {
      code: "127",
      meaning: "Command not found in common shell contexts.",
      whatToVerify: [
        "Verify the executable name, PATH, image contents, and working directory.",
        "Compare the configured ENTRYPOINT and CMD with the image build."
      ]
    },
    {
      code: "137",
      meaning: "Commonly associated with SIGKILL.",
      whatToVerify: [
        "Check State.OOMKilled and host kernel logs.",
        "Correlate with container memory limits and historical memory metrics.",
        "Investigate manual kills, host pressure, and other SIGKILL sources if OOM evidence is absent."
      ]
    },
    {
      code: "139",
      meaning: "Commonly associated with a segmentation fault.",
      whatToVerify: [
        "Inspect native-library crashes, core dumps where available, and application/runtime logs.",
        "Compare architecture, native dependencies, and the last image change."
      ]
    },
    {
      code: "143",
      meaning: "Commonly associated with termination by SIGTERM.",
      whatToVerify: [
        "Check deployment, shutdown, maintenance, and operator events.",
        "Review whether the application handles SIGTERM and exits gracefully.",
        "Confirm whether an external controller intentionally replaced the workload."
      ]
    }
  ],

  rootCausePlaybooks: [
    {
      cause: "Application startup exception",
      evidence: [
        "A stack trace, configuration-validation error, or fatal application log appears immediately before each exit.",
        "The same error repeats on each start."
      ],
      diagnosis: [
        "Read timestamped container logs.",
        "Compare the application revision and effective nonsecret configuration with the last healthy release.",
        "Reproduce the startup command in a controlled environment."
      ],
      remediation: [
        "Correct the verified code or configuration defect.",
        "Build and test a new immutable image if the defect is in application code.",
        "Promote the tested artifact using the approved deployment pipeline."
      ],
      validation: [
        "The application initializes successfully.",
        "Readiness checks pass and real requests succeed.",
        "Restart counts remain stable."
      ]
    },
    {
      cause: "Missing or invalid environment configuration",
      evidence: [
        "Logs name a missing required setting or reject a configuration value.",
        "The failing environment differs from the known-good environment."
      ],
      diagnosis: [
        "Compare configuration keys and configuration versions without dumping secret values.",
        "Verify the secret or configuration reference, mount path, and application expectations.",
        "Check whether the configuration changed during the release."
      ],
      remediation: [
        "Correct the approved configuration source or secret reference.",
        "Validate required settings in CI or pre-deployment checks.",
        "Roll out the corrected configuration using the platform's normal mechanism."
      ],
      validation: [
        "Startup validation passes.",
        "The application connects to required services using the intended credentials.",
        "No secret values appear in logs."
      ]
    },
    {
      cause: "Memory exhaustion or OOM kill",
      evidence: [
        "State.OOMKilled is true, or kernel logs and metrics corroborate an OOM event.",
        "Memory usage approaches a container limit or host capacity.",
        "Exit code 137 may be present."
      ],
      diagnosis: [
        "Inspect container memory configuration and historical metrics.",
        "Check host memory pressure, neighboring workloads, and application memory trends.",
        "Determine whether the workload has a leak, oversized cache, startup spike, or undersized limit."
      ],
      remediation: [
        "Fix a confirmed memory leak or excessive allocation.",
        "Tune cache, concurrency, or workload size where evidence supports it.",
        "Increase the memory limit only after verifying host capacity and scheduling impact.",
        "Apply changes gradually and follow production approval requirements."
      ],
      validation: [
        "Memory remains within the approved budget during representative load.",
        "No new OOM events occur during the observation window.",
        "Latency and error rates remain acceptable."
      ]
    },
    {
      cause: "Wrong ENTRYPOINT, CMD, or process lifecycle",
      evidence: [
        "The configured command differs from the expected application command.",
        "The process exits immediately, or a shell wrapper fails to forward signals.",
        "The image no longer contains the expected executable."
      ],
      diagnosis: [
        "Inspect Entrypoint, Cmd, WorkingDir, User, and the image build definition.",
        "Compare the startup command with the last working artifact.",
        "Determine whether the container is meant to be a service or a finite job."
      ],
      remediation: [
        "Correct the image startup configuration and rebuild the artifact.",
        "Prefer exec-form ENTRYPOINT or CMD where appropriate.",
        "Use exec in shell wrappers so the application becomes PID 1, or explicitly implement correct signal forwarding.",
        "Do not force a completed batch job to remain alive just to avoid an exited status."
      ],
      validation: [
        "The intended application process starts with the expected arguments.",
        "SIGTERM is handled within the platform's shutdown grace period.",
        "One-shot jobs exit with the expected result."
      ]
    },
    {
      cause: "Mount, file, or permission failure",
      evidence: [
        "Logs show permission denied, missing files, read-only filesystem errors, or failed writes.",
        "A bind mount may hide image files at the same target path."
      ],
      diagnosis: [
        "Inspect mount sources, destinations, modes, runtime user, and file ownership.",
        "Check filesystem and inode capacity.",
        "Compare expected image paths with the mounted filesystem layout."
      ],
      remediation: [
        "Correct the mount source or destination and the minimum required file permissions.",
        "Ensure the application has only the access it needs.",
        "Preserve persistent data and obtain approval before any filesystem changes."
      ],
      validation: [
        "The application can read required configuration and write permitted state.",
        "Ownership and access controls remain consistent with security requirements.",
        "Persistent data remains intact."
      ]
    },
    {
      cause: "Dependency or network startup failure",
      evidence: [
        "Logs show DNS errors, refused connections, timeouts, TLS failures, or authentication errors.",
        "The dependency is not ready when the application attempts to connect."
      ],
      diagnosis: [
        "Check dependency health, service discovery, DNS, routes, network policy, TLS trust, and credentials.",
        "Determine whether the application retries transient failures with bounded exponential backoff.",
        "Verify that the dependency endpoint and port match the current environment."
      ],
      remediation: [
        "Restore the failing dependency or correct the verified network or configuration issue.",
        "Implement bounded retries and meaningful startup behavior for transient dependency failures.",
        "Avoid hard-coded container IP addresses and use the intended service discovery mechanism."
      ],
      validation: [
        "The application establishes connections to required dependencies.",
        "Retries recover from transient faults without producing a restart storm.",
        "End-to-end requests and background jobs complete successfully."
      ]
    },
    {
      cause: "Health-check or readiness misconfiguration",
      evidence: [
        "The main process is running but the health status is unhealthy.",
        "Probe output indicates a wrong path, port, command, timeout, or premature startup check."
      ],
      diagnosis: [
        "Inspect health-check configuration and recent probe output.",
        "Verify that the health endpoint reflects actual service readiness.",
        "Compare startup duration with configured timing thresholds."
      ],
      remediation: [
        "Correct the probe command or endpoint.",
        "Set timing and startup grace behavior based on measured initialization time.",
        "Keep liveness and readiness semantics separate where the orchestrator supports them."
      ],
      validation: [
        "The probe succeeds for a genuinely ready service.",
        "Real application requests work, not just the probe endpoint.",
        "Transient dependency issues do not trigger unnecessary restart storms."
      ]
    },
    {
      cause: "Deployment or restart-policy behavior",
      evidence: [
        "Restart events correlate with rollout activity or an external controller.",
        "The same failure returns after every retry.",
        "Container IDs may change as the controller replaces instances."
      ],
      diagnosis: [
        "Inspect the restart policy and deployment controller's desired state.",
        "Review rollout history, health failures, and termination events.",
        "Compare the failing and last known-good artifact digests."
      ],
      remediation: [
        "Fix the underlying defect or perform an approved rollback.",
        "Use the controller's supported rollout and rollback mechanisms.",
        "Change restart policy only when it is demonstrably incorrect for the workload."
      ],
      validation: [
        "The intended revision remains deployed.",
        "Healthy capacity is restored and stable.",
        "The controller no longer repeatedly replaces the workload."
      ]
    },
    {
      cause: "Host, runtime, architecture, or storage problem",
      evidence: [
        "Multiple unrelated containers fail on the same host.",
        "Docker daemon logs show runtime errors, or disk and inode capacity is exhausted.",
        "The image architecture or native dependencies are incompatible with the host."
      ],
      diagnosis: [
        "Compare failures across containers and hosts.",
        "Check Docker info, host resource metrics, daemon logs, storage health, and image platform metadata.",
        "Escalate to the platform team if the runtime or host is implicated."
      ],
      remediation: [
        "Resolve the confirmed host, storage, runtime, or image compatibility issue through the infrastructure change process.",
        "Drain or replace a host only through an approved procedure that accounts for capacity and persistent data.",
        "Do not restart a shared Docker daemon casually during a production incident."
      ],
      validation: [
        "Affected workloads start and remain stable.",
        "Other workloads on the host are healthy.",
        "Storage, runtime, and capacity alerts return to normal."
      ]
    }
  ],

  recoveryWorkflow: [
    {
      phase: "1. Detect and acknowledge",
      actions: [
        "Acknowledge the alert and establish an incident owner.",
        "Identify the affected service, environment, revision, and start of impact.",
        "Check whether traffic can be served by remaining healthy replicas."
      ],
      successCriteria: [
        "The incident has an owner and severity.",
        "The customer impact and affected scope are understood."
      ]
    },
    {
      phase: "2. Preserve evidence",
      actions: [
        "Capture container IDs, image digests, state, restart counts, logs, events, and timestamps.",
        "Save sanitized configuration comparisons and relevant resource metrics.",
        "Record recent deployments, secret rotations, host events, and operator actions."
      ],
      successCriteria: [
        "The failure can be correlated with a timeline.",
        "Useful evidence has been preserved before disruptive remediation."
      ]
    },
    {
      phase: "3. Isolate the cause",
      actions: [
        "Use the diagnostic sequence to distinguish application, configuration, resource, dependency, probe, and host failures.",
        "Form a testable hypothesis.",
        "Confirm it with evidence or a controlled reproduction."
      ],
      successCriteria: [
        "The proposed root cause explains the observed behavior.",
        "The remediation is targeted and has a defined rollback path."
      ]
    },
    {
      phase: "4. Choose mitigation",
      actions: [
        "Assess whether a healthy replica can temporarily carry traffic.",
        "Compare a configuration correction, controlled rollout, and rollback of the last known-good revision.",
        "Obtain the required production approval.",
        "Avoid blind restarts, repeated force kills, or deletion of containers and volumes."
      ],
      successCriteria: [
        "The mitigation has an owner, approval, and recovery criteria.",
        "Data integrity and remaining capacity have been considered."
      ]
    },
    {
      phase: "5. Apply and verify",
      actions: [
        "Apply the smallest approved correction through the normal release mechanism.",
        "Verify the exact image digest, startup logs, health/readiness, dependency connections, and real requests.",
        "Watch restart counts, error rates, latency, memory, CPU, and healthy replica count."
      ],
      successCriteria: [
        "The application serves real traffic successfully.",
        "Restarts stop increasing and the service remains stable through the agreed observation period."
      ]
    },
    {
      phase: "6. Close and learn",
      actions: [
        "Confirm recovery with the service owner.",
        "Publish the incident timeline, verified root cause, impact, and remediation.",
        "Create preventive action items with owners and deadlines.",
        "Add automated regression tests and update the runbook."
      ],
      successCriteria: [
        "Recovery evidence is recorded.",
        "Follow-up work has accountable owners.",
        "The incident is closed according to the team's policy."
      ]
    }
  ],

  decisionTree: [
    {
      symptom: "Container exits immediately after startup",
      evidence: "Startup logs, ExitCode, Entrypoint, Cmd, WorkingDir",
      likelyCause: "Application initialization failure, missing executable, invalid configuration, or a process that completes normally",
      nextAction:
        "Inspect the final startup logs and command. Determine whether the workload should be long-running or one-shot."
    },
    {
      symptom: "Exit code 137",
      evidence: "State.OOMKilled, kernel logs, historical memory metrics, termination events",
      likelyCause: "SIGKILL, potentially from OOM but also possible from another kill source",
      nextAction:
        "Confirm the cause before changing memory limits. Check container and host resource evidence."
    },
    {
      symptom: "Exit code 143",
      evidence: "Deployment timestamps, stop events, shutdown logs, operator actions",
      likelyCause: "SIGTERM or an intentional shutdown sequence",
      nextAction:
        "Identify who initiated termination and verify graceful shutdown and deployment behavior."
    },
    {
      symptom: "Container is running but marked unhealthy",
      evidence: "State.Health, health-check output, endpoint and port configuration",
      likelyCause: "Probe configuration, startup timing, application readiness, or dependency failure",
      nextAction:
        "Validate the probe and actual service behavior. Identify any external component reacting to the health result."
    },
    {
      symptom: "Restart count rises after each deployment",
      evidence: "Image digest, configuration version, rollout history, application logs",
      likelyCause: "Release regression or environment/configuration mismatch",
      nextAction:
        "Compare with the last known-good release and choose an approved correction or rollback."
    },
    {
      symptom: "Multiple containers fail on the same host",
      evidence: "Docker daemon logs, kernel logs, disk, inodes, memory, runtime events",
      likelyCause: "Host resource exhaustion, storage problem, runtime issue, or infrastructure change",
      nextAction:
        "Escalate to the platform team and assess host-wide impact before taking action."
    },
    {
      symptom: "A container completes with exit code 0 and is restarted",
      evidence: "Configured command, workload purpose, restart policy",
      likelyCause: "A finite job is configured with service-style restart behavior",
      nextAction:
        "Verify the intended workload model and correct the command or restart policy if the configuration is wrong."
    },
    {
      symptom: "Container IDs continually change",
      evidence: "Orchestrator events, Compose status, rollout history",
      likelyCause: "Controller-driven replacement or recreation",
      nextAction:
        "Investigate the managing controller and use its supported rollout, scaling, or rollback mechanism."
    }
  ],

  prevention: [
    {
      area: "Image and application startup",
      practices: [
        "Use immutable image digests in production releases.",
        "Keep the container's main process in the foreground.",
        "Use exec-form ENTRYPOINT and CMD where appropriate.",
        "Validate required configuration before serving requests.",
        "Use multi-stage builds and include only necessary runtime dependencies.",
        "Test startup and graceful termination in CI."
      ]
    },
    {
      area: "Health and dependency management",
      practices: [
        "Design health checks to measure meaningful application readiness.",
        "Avoid probes that depend on unrelated optional features.",
        "Set startup timing and timeouts based on measured behavior.",
        "Use bounded retries with exponential backoff and jitter for transient dependencies.",
        "Prevent a dependency outage from causing synchronized restart storms."
      ]
    },
    {
      area: "Resources and host reliability",
      practices: [
        "Set memory and CPU limits based on workload measurements.",
        "Monitor memory trends, OOM events, CPU throttling, disk capacity, and inode usage.",
        "Alert on restart rate, unavailable replicas, and sustained health failures.",
        "Avoid unbounded in-memory caches and unbounded worker concurrency.",
        "Maintain capacity for rollout and recovery."
      ]
    },
    {
      area: "Release safety",
      practices: [
        "Use staged or canary rollouts where supported.",
        "Block promotion when startup, readiness, smoke tests, or error-rate gates fail.",
        "Keep a known-good image and configuration version available for rollback.",
        "Validate configuration and secret references before deployment.",
        "Test rollback regularly and document state/schema compatibility risks."
      ]
    },
    {
      area: "Observability and incident readiness",
      practices: [
        "Centralize timestamped logs and preserve logs across container replacement.",
        "Collect restart counts, container exit codes, health results, memory, CPU, latency, and error rates.",
        "Correlate deploy IDs and image digests with alerts.",
        "Maintain an on-call runbook and clear escalation ownership.",
        "Review repeated incidents and turn the confirmed causes into automated checks."
      ]
    }
  ],

  commonMistakes: [
    {
      mistake: "Restarting the container immediately without collecting evidence",
      whyItFails:
        "The restart may erase useful runtime context, trigger another failure, or hide a time-sensitive clue without correcting the defect.",
      betterApproach:
        "Capture state, logs, events, timestamps, image identity, and resource evidence first. Restart only as an approved mitigation."
    },
    {
      mistake: "Treating exit code 137 as automatic proof of OOM",
      whyItFails:
        "137 commonly represents SIGKILL, which can have causes other than a memory-limit OOM event.",
      betterApproach:
        "Correlate OOMKilled, kernel logs, historical metrics, and termination events."
    },
    {
      mistake: "Assuming an unhealthy health check means Docker will restart the container",
      whyItFails:
        "Standalone Docker health status does not itself restart the container.",
      betterApproach:
        "Identify the actual supervisor or automation that reacts to the health result."
    },
    {
      mistake: "Changing several variables simultaneously",
      whyItFails:
        "It becomes difficult to identify which change corrected the problem, and new regressions may be introduced.",
      betterApproach:
        "Test a specific hypothesis and make the smallest approved change possible."
    },
    {
      mistake: "Running docker system prune to fix a restart loop",
      whyItFails:
        "Pruning is not a general application repair and can remove resources needed by other workloads. Some prune variants can delete unused volumes and important data.",
      betterApproach:
        "Inspect disk and inode usage, identify the actual space consumer, and follow a reviewed cleanup plan."
    },
    {
      mistake: "Deleting a container or volume before checking persistent data",
      whyItFails:
        "Data or evidence may be lost, and an orchestrator may recreate the same broken workload.",
      betterApproach:
        "Confirm statefulness, backups, mounts, evidence retention, and the controller's intended behavior before destructive operations."
    },
    {
      mistake: "Using docker exec against a stopped container",
      whyItFails:
        "A stopped container has no running process to execute a command inside.",
      betterApproach:
        "Inspect state and logs, examine image metadata, or use an authorized isolated diagnostic reproduction."
    },
    {
      mistake: "Adding sleep infinity to keep a broken service alive",
      whyItFails:
        "The container may appear running while the application remains unavailable.",
      betterApproach:
        "Fix the actual startup command or application error and verify real service requests."
    },
    {
      mistake: "Rolling back an image without checking database or schema compatibility",
      whyItFails:
        "The old application may be incompatible with a database migration or new persistent state.",
      betterApproach:
        "Evaluate schema compatibility, irreversible migrations, data integrity, and the documented rollback procedure first."
    },
    {
      mistake: "Sharing full docker inspect output or resolved configuration",
      whyItFails:
        "Environment settings, internal paths, topology, or secret references may be exposed.",
      betterApproach:
        "Collect only the fields needed for diagnosis and redact credentials, tokens, and sensitive values."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Incident title: Docker container restart loop",
    "Environment / region / cluster / host:",
    "Service and container name:",
    "Container ID and image digest:",
    "Deployment ID, source commit, and configuration version:",
    "Severity and incident owner:",
    "Detection time / acknowledgement time / recovery time:",
    "Customer impact and affected functionality:",
    "Number of affected and healthy replicas:",
    "First observed exit code and State.OOMKilled value:",
    "Relevant logs and runtime events:",
    "Resource evidence: memory, CPU, disk, inodes, and host pressure:",
    "Changes immediately preceding the incident:",
    "Verified root cause and supporting evidence:",
    "Mitigation applied and approval reference:",
    "Rollback considered? If not selected, why?",
    "Recovery validation: startup, readiness, requests, error rate, and restart trend:",
    "Data integrity and backlog verification:",
    "What went well:",
    "What did not go well:",
    "Preventive action / owner / deadline:",
    "Runbook or CI checks updated:",
    "Incident closure approved by:"
  ],

  productionRunbook: [
    {
      phase: "Detect and acknowledge",
      checklist: [
        "Confirm the alert is actionable.",
        "Identify the service owner and incident severity.",
        "Check customer impact and available healthy capacity.",
        "Record the start time and deployment revision."
      ]
    },
    {
      phase: "Investigate",
      checklist: [
        "Verify the Docker context or orchestrator cluster.",
        "Capture container ID, image digest, state, exit code, restart count, and timestamps.",
        "Collect timestamped logs and lifecycle events.",
        "Check health status, resource metrics, host logs, mounts, and dependencies.",
        "Compare the latest release with the last known-good release."
      ]
    },
    {
      phase: "Mitigate",
      checklist: [
        "Preserve useful evidence.",
        "Confirm the root cause or clearly label the mitigation as temporary.",
        "Assess capacity, persistent data, and rollback compatibility.",
        "Obtain the required production approval.",
        "Apply one controlled mitigation using the correct deployment mechanism."
      ]
    },
    {
      phase: "Recover",
      checklist: [
        "Confirm the intended image and configuration are running.",
        "Check readiness and real user-facing requests.",
        "Verify dependency connectivity and background processing.",
        "Monitor restart counts, latency, error rate, and resource usage.",
        "Confirm no data loss or unacceptable processing backlog."
      ]
    },
    {
      phase: "Close and follow up",
      checklist: [
        "Get service-owner confirmation.",
        "Record the verified cause and recovery timeline.",
        "Update alerts, tests, runbooks, and deployment gates.",
        "Assign action owners and deadlines.",
        "Communicate closure through the team's incident process."
      ]
    }
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Reproduce a container that exits immediately",
      objective:
        "Understand why a container can stop even when its image was created successfully.",
      steps: [
        "In a disposable development environment, run: docker run --name restart-lab-once alpine:3.20 sh -c 'echo startup-finished; exit 1'",
        "Inspect the stopped container: docker ps -a --filter name=restart-lab-once",
        "Inspect its state: docker inspect --format '{{.State.Status}} {{.State.ExitCode}} {{.RestartCount}}' restart-lab-once",
        "Read its output: docker logs --timestamps restart-lab-once",
        "After saving the evidence, remove only this disposable lab container: docker rm restart-lab-once"
      ],
      expectedFinding:
        "The container exits with a nonzero code after the command completes. The image can be valid even though the process failed.",
      solution: [
        "Use the logs and exit status to investigate the command's failure.",
        "Distinguish a one-shot process from a service that should remain running.",
        "Do not keep a failed process alive simply to make the container appear healthy."
      ]
    },
    {
      title: "Lab 2 — Observe restart-policy behavior",
      objective:
        "See how Docker retries a failed process and why a restart policy is not a root-cause fix.",
      steps: [
        "In a disposable environment, run: docker run -d --name restart-lab-loop --restart on-failure:3 alpine:3.20 sh -c 'echo attempt; exit 1'",
        "Inspect state repeatedly over a short observation period: docker inspect --format '{{.State.Status}} {{.State.ExitCode}} {{.RestartCount}}' restart-lab-loop",
        "Review logs: docker logs --timestamps --tail 30 restart-lab-loop",
        "Inspect events: docker events --since 5m --filter container=restart-lab-loop",
        "After collecting evidence, clean up the lab container: docker rm -f restart-lab-loop"
      ],
      expectedFinding:
        "The container may be restarted after a nonzero exit until the retry limit is reached. Restart timing is managed by Docker and may not be instantaneous.",
      solution: [
        "Use restart counts, events, and logs to connect the retries to the process exit.",
        "Fix the failing command or application rather than increasing retries blindly.",
        "The cleanup command is destructive to this disposable lab container; never run it against a production target."
      ]
    },
    {
      title: "Lab 3 — Inspect an OOM-like failure safely",
      objective:
        "Learn the evidence required before attributing a termination to memory exhaustion.",
      steps: [
        "Review a disposable test container's memory limit and observed usage.",
        "Capture State.ExitCode and State.OOMKilled.",
        "Review host kernel logs and historical memory metrics when available.",
        "Compare the configured limit with the application's expected peak usage.",
        "Do not create an uncontrolled memory-exhaustion workload on a shared host."
      ],
      expectedFinding:
        "An exit code alone cannot establish that OOM caused the failure. Stronger evidence comes from the OOMKilled field, kernel logs, and resource telemetry.",
      solution: [
        "Determine whether the limit is too low, the application has a leak, or the host is under pressure.",
        "Test resource changes in a safe environment.",
        "Make production limit changes only after capacity review and approval."
      ]
    },
    {
      title: "Lab 4 — Separate unhealthy status from process exit",
      objective:
        "Understand why health status and container lifecycle status are different.",
      steps: [
        "Inspect a development container with a configured health check.",
        "Run: docker inspect --format '{{.State.Status}} {{json .State.Health}}' CONTAINER",
        "Compare the health output with the process state and application logs.",
        "Check whether any external controller reacts to the health status."
      ],
      expectedFinding:
        "A container can remain running while its health check reports unhealthy. Health status alone does not restart a standalone Docker container.",
      solution: [
        "Correct the probe only after verifying the actual application readiness behavior.",
        "Identify the real restart or replacement mechanism before changing policy."
      ]
    },
    {
      title: "Lab 5 — Practice an incident release comparison",
      objective:
        "Practice a safe investigation when restarts begin immediately after a release.",
      steps: [
        "Record the failing image digest, container state, logs, and first failure timestamp.",
        "Record the last known-good digest and release timestamp.",
        "Compare startup command, configuration references, mounts, and dependency changes.",
        "Write a root-cause hypothesis and the evidence that would confirm or reject it.",
        "Test the proposed correction in staging and define rollback criteria."
      ],
      expectedFinding:
        "A deployment correlation narrows the search, but the exact changed component must still be established through evidence.",
      solution: [
        "Choose the smallest evidence-supported correction.",
        "Use an approved deployment or rollback workflow.",
        "Verify service-level behavior, not only that the container starts."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is a Docker container restart loop?",
      answer:
        "It is repeated container termination and restart caused by a restart policy, orchestrator, operator, or external automation. The loop is a symptom; the underlying cause may be an application error, configuration problem, resource exhaustion, or infrastructure issue.",
      followUp:
        "Explain how you would distinguish a Docker restart policy from an orchestrator replacing containers."
    },
    {
      question: "What is the first thing you check during a production restart-loop incident?",
      answer:
        "I confirm the environment and workload identity, assess customer impact and healthy capacity, preserve logs and state, then inspect the image digest, exit code, OOMKilled flag, timestamps, restart count, and deployment history.",
      followUp:
        "Why should evidence be collected before restarting the container?"
    },
    {
      question: "Does exit code 137 always mean OOM?",
      answer:
        "No. It commonly indicates SIGKILL. I verify State.OOMKilled, kernel logs, memory metrics, limits, and other termination events before concluding that OOM caused it.",
      followUp:
        "What would you investigate if OOMKilled is false?"
    },
    {
      question: "What does exit code 143 usually indicate?",
      answer:
        "It commonly indicates SIGTERM. I correlate it with deployment events, shutdown logs, host maintenance, and operator actions to determine why termination was requested.",
      followUp:
        "How do you make a containerized application shut down gracefully?"
    },
    {
      question: "Can an unhealthy Docker container restart automatically?",
      answer:
        "A standalone Docker health check changes the health status but does not itself restart the container. An external controller or automation can react to that status.",
      followUp:
        "How do Docker health checks differ from Kubernetes liveness and readiness probes?"
    },
    {
      question: "How do you investigate a container that exits with code 0?",
      answer:
        "I determine whether it is a one-shot job or a long-running service. For a service, I inspect the command, entrypoint, application lifecycle, and restart policy. Exit code 0 means the process reported successful completion, not necessarily that the intended service stayed available.",
      followUp:
        "Why might a batch container correctly exit while a web server should not?"
    },
    {
      question: "What is the difference between ENTRYPOINT and CMD?",
      answer:
        "ENTRYPOINT defines the executable or main command, while CMD provides default arguments or the default command when an entrypoint is not set. Their combination determines what actually starts inside the container.",
      followUp:
        "How can shell-form commands affect signal forwarding?"
    },
    {
      question: "Why is PID 1 important in a container?",
      answer:
        "The main container process receives lifecycle signals and its exit determines the container's primary process status. A shell wrapper that does not correctly forward signals can interfere with graceful shutdown.",
      followUp:
        "When is exec useful in an entrypoint script?"
    },
    {
      question: "How would you troubleshoot a restart loop after deployment?",
      answer:
        "I correlate the first restart with the deployment, capture image and configuration versions, inspect logs and state, compare the last known-good release, verify a specific root cause, and choose an approved correction or rollback.",
      followUp:
        "What compatibility checks are necessary before rolling back a database-backed service?"
    },
    {
      question: "What is the difference between a restart and a container replacement?",
      answer:
        "A restart starts the same container again, while a replacement creates a new container instance, usually with a different ID. Controllers may replace instances to reconcile desired state.",
      followUp:
        "How do you identify which controller is managing a workload?"
    },
    {
      question: "How do you distinguish a health-check failure from an application crash?",
      answer:
        "I inspect State.Status, State.Health, application logs, and process lifecycle timestamps. A running but unhealthy container differs from an exited container, although both can indicate service failure.",
      followUp:
        "What should a readiness check verify?"
    },
    {
      question: "Why is repeatedly increasing a restart policy a poor fix?",
      answer:
        "It repeats the failing operation without correcting the defect and can increase load or delay diagnosis. The restart policy should match the workload's intended behavior.",
      followUp:
        "How do bounded retries and backoff help with transient dependency failures?"
    },
    {
      question: "How do you investigate multiple containers failing on one host?",
      answer:
        "I check whether the failures share a time window, then inspect host memory, disk and inode usage, Docker daemon logs, kernel events, and runtime health. I escalate as a host-level incident if evidence supports it.",
      followUp:
        "Why is restarting the Docker daemon risky on a shared production host?"
    },
    {
      question: "What production checks are required after a restart-loop fix?",
      answer:
        "I verify the intended image and configuration, startup logs, readiness, real requests, dependency connectivity, healthy capacity, restart trends, latency, error rates, and resource usage. I also check data integrity and processing backlogs where applicable.",
      followUp:
        "Why is a single successful container start insufficient to close the incident?"
    },
    {
      question: "How do you prevent restart-loop incidents?",
      answer:
        "I use startup and configuration validation, immutable images, CI tests, sensible health checks, graceful shutdown, resource monitoring, dependency resilience, staged rollouts, rollback procedures, alerts, and tested runbooks.",
      followUp:
        "Which signals would you alert on to detect a restart storm early?"
    }
  ],

  references: [
    {
      title: "Docker — Start containers automatically",
      url: "https://docs.docker.com/engine/containers/start-containers-automatically/"
    },
    {
      title: "Docker — Inspect container details",
      url: "https://docs.docker.com/reference/cli/docker/inspect/"
    },
    {
      title: "Docker — Container logs",
      url: "https://docs.docker.com/reference/cli/docker/container/logs/"
    },
    {
      title: "Docker — Health checks in Dockerfile",
      url: "https://docs.docker.com/reference/dockerfile/#healthcheck"
    },
    {
      title: "Docker — Resource constraints",
      url: "https://docs.docker.com/engine/containers/resource_constraints/"
    },
    {
      title: "Kubernetes — Debugging applications",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/"
    },
    {
      title: "Kubernetes — Pod lifecycle",
      url: "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/"
    }
  ]
} satisfies RestartLoopGuide;

export default containerRestartLoopGuide;
