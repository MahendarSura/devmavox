import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Docker Containers",
  description: "Detailed Docker containers notes, practical steps, commands, root causes and solutions.",
  sections: [
    {
      heading: "06. Container Lifecycle – run, create, start, stop, restart and exec",
      explanation: `
A container has a lifecycle.

docker create:
Creates a container without starting it.

docker start:
Starts an existing created or stopped container.

docker run:
Creates and starts a new container.

docker stop:
Sends the configured stop signal, normally SIGTERM, and then sends SIGKILL after the timeout if the process does not stop.

docker kill:
Sends a signal immediately. The default signal is SIGKILL.

docker restart:
Restarts a container.

docker pause:
Freezes container processes.

docker unpause:
Resumes paused processes.

docker exec:
Starts another process inside a running container.

docker attach:
Attaches to the container's main process streams.

docker rm:
Removes a stopped container. Use -f only when you understand the impact.

IMPORTANT:
The container's main process is PID 1 inside its process namespace. When that main process exits, the container stops.

A container restart policy can restart a container after certain exits, but it does not fix the underlying application error.

EXIT CODE 137:
Often means the process was killed by SIGKILL. It does not prove that the container was killed by an out-of-memory event. Check OOMKilled and host/kernel evidence.
      `,
      steps: [
        "Check whether the container exists.",
        "Check its current state and exit code.",
        "Read the container logs.",
        "Inspect the container configuration.",
        "Enter a running container with docker exec when appropriate.",
        "Identify why the main process exited.",
        "Fix the application or configuration before applying a restart policy."
      ],
      commands: `
docker run -d --name web nginx

docker create --name test nginx
docker start test

docker ps
docker ps -a

docker stop web
docker restart web

docker exec -it web sh

docker inspect web
docker logs --tail 100 web

docker rm test
      `,
      problems: [
        {
          issue: "Container exits immediately after starting.",
          rootCause:
            "The main process may finish, crash, receive a signal or fail because of missing configuration.",
          solution:
            "Check docker logs and docker inspect. Fix the startup command, application configuration or dependency issue."
        },
        {
          issue: "Container keeps restarting.",
          rootCause:
            "The main process repeatedly exits and a restart policy starts it again.",
          solution:
            "Inspect the exit code, logs, health and dependencies. Fix the actual startup failure instead of relying only on restart."
        },
        {
          issue: "Container exits with code 137.",
          rootCause:
            "The process received SIGKILL. Possible causes include an OOM kill, a forced stop after timeout or an external kill signal.",
          solution:
            "Inspect State.OOMKilled, memory limits, host kernel logs and stop events. Identify the actual SIGKILL source before changing memory limits."
        }
      ]
    },
    {
      heading: "07. Docker Run Options – Practical Command Flags",
      explanation: `
docker run supports many options. Engineers should understand what each option changes.

-d:
Runs the container in detached mode.

-it:
Combines interactive mode (-i) and terminal allocation (-t).

--rm:
Automatically removes the container after it exits. Useful for temporary tasks, not for containers whose stopped state must be retained for investigation.

--name:
Assigns a readable container name.

-p:
Publishes a container port to a host port.

-P:
Publishes ports declared by the image to randomly selected host ports.

-e:
Sets an environment variable.

--env-file:
Loads environment variables from a file.

-v:
Mounts a volume or bind mount using short syntax.

--mount:
Uses explicit mount syntax and is often easier to read for complex mounts.

--network:
Connects the container to a selected Docker network.

--restart:
Sets the restart policy.

--memory:
Sets a memory limit.

--cpus:
Sets a CPU quota limit.

--user:
Sets the process user.

--entrypoint:
Overrides the image ENTRYPOINT.

-w:
Sets the working directory.

--read-only:
Makes the container root filesystem read-only, except for explicitly writable mounts and other configured writable areas.

--privileged:
Grants broad additional privileges. Avoid it unless a carefully reviewed requirement demands it.

--cap-add / --cap-drop:
Adds or removes Linux capabilities.

--security-opt:
Changes supported security settings, such as seccomp profiles.

Always check docker run --help for the full option list supported by the installed Engine version.
      `,
      steps: [
        "Start with the image name and required application command.",
        "Choose a stable container name.",
        "Publish only the required ports.",
        "Provide configuration through environment variables or an environment file.",
        "Attach the correct network and storage.",
        "Set resource limits based on measured requirements.",
        "Choose a restart policy appropriate to the workload.",
        "Verify the effective configuration using docker inspect."
      ],
      commands: `
docker run -d --name web -p 8080:80 nginx

docker run -it --rm alpine sh

docker run -d --name api \\
  --restart unless-stopped \\
  --memory 512m \\
  --cpus 1.5 \\
  -p 3000:3000 \\
  my-api:v1

docker run --help
docker inspect api
      `,
      problems: [
        {
          issue: "Host port is already allocated.",
          rootCause:
            "Another process or container is already listening on the requested host port.",
          solution:
            "Identify the process or container using the port. Stop or reconfigure the conflicting service, or publish the container on a different host port."
        },
        {
          issue: "Container cannot write to a mounted directory.",
          rootCause:
            "The container process user may not have permission to write to the host directory or mounted volume.",
          solution:
            "Inspect the container UID/GID and host directory ownership and permissions. Apply the minimum required permission change rather than using chmod 777."
        }
      ]
    },
    {
      heading: "15. Docker Healthcheck – Healthy and Unhealthy Containers",
      explanation: `
A health check runs a configured command to determine whether a container is healthy.

A container can be running but unhealthy.

Example:
An API process is running, but its HTTP endpoint is returning errors because it cannot connect to its database.

Health status can help distinguish process existence from application readiness.

IMPORTANT:
An unhealthy status does not automatically mean Docker will restart the container. Restart policies respond to container exit behavior; they do not automatically restart a still-running unhealthy process.

Healthcheck options include:
- --interval: time between checks.
- --timeout: maximum duration for a check.
- --start-period: startup grace period.
- --start-interval: startup check interval where supported.
- --retries: consecutive failures needed to mark unhealthy.

A good health check should test the actual service condition without being unnecessarily expensive.
      `,
      steps: [
        "Define a meaningful health endpoint or check command.",
        "Configure the health check interval and timeout.",
        "Allow sufficient startup time.",
        "Inspect health status and health-check output.",
        "Correlate failures with application logs and dependencies.",
        "Fix the underlying issue rather than assuming Docker will restart it."
      ],
      commands: `
docker inspect --format '{{json .State.Health}}' api

docker ps

docker events --since 30m
      `,
      config: `
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \\
  CMD curl -fsS http://localhost:3000/health || exit 1
      `,
      problems: [
        {
          issue: "Container is running but marked unhealthy.",
          rootCause:
            "The health-check command may fail, the application may not be ready or a required dependency may be unavailable.",
          solution:
            "Inspect health-check output, application logs and dependency connectivity. Correct the endpoint, timing or application failure."
        },
        {
          issue: "Health check fails because curl is missing.",
          rootCause:
            "The final image does not contain the executable used by the health-check command.",
          solution:
            "Use a health-check tool available in the final image or include a suitable lightweight check implementation."
        }
      ]
    }
  ]
};

export default data;
