import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Docker Performance",
  description: "Detailed Docker performance notes, practical steps, commands, root causes and solutions.",
  sections: [
    {
      heading: "13. CPU, Memory, OOM and Resource Management",
      explanation: `
Containers share host resources. Without appropriate controls, one workload can consume resources needed by other workloads.

CPU:
--cpus sets a CPU quota limit.

Memory:
--memory sets a memory limit.

Memory reservation:
Can be used to express a softer memory reservation in supported configurations.

PIDs:
PID limits can restrict the number of processes or threads.

OOM:
When memory pressure becomes severe, the Linux kernel may kill processes. A container can be terminated because it exceeded its memory limit or because the host experienced memory pressure.

EXIT CODE 137 IS NOT PROOF OF OOM:
Check the container's OOMKilled state and host kernel logs.

RESOURCE INVESTIGATION:
- Check current usage.
- Check configured limits.
- Inspect application memory behavior.
- Check host memory pressure.
- Check whether usage grows over time.
- Identify memory leaks or unexpectedly large workloads.

Do not simply increase memory limits without checking host capacity and the reason for the growth.
      `,
      steps: [
        "Check live container resource usage.",
        "Inspect configured CPU and memory limits.",
        "Check exit status and OOMKilled state.",
        "Review host memory and kernel logs.",
        "Compare resource usage with normal workload levels.",
        "Identify leaks, spikes or workload changes.",
        "Apply an appropriate limit or application fix.",
        "Monitor after deployment."
      ],
      commands: `
docker stats

docker inspect --format '{{.State.OOMKilled}}' api

docker inspect --format '{{.State.ExitCode}}' api

docker inspect api

# Linux host
free -h
df -h
sudo journalctl -k --since "30 minutes ago"
      `,
      problems: [
        {
          issue: "Container is killed during high traffic.",
          rootCause:
            "The application may exceed its memory limit due to increased concurrency, large requests, memory leaks or inefficient processing.",
          solution:
            "Correlate traffic and memory metrics, inspect OOM evidence, profile the application and tune concurrency or memory allocation. Increase limits only when host capacity allows."
        },
        {
          issue: "Container becomes slow under load.",
          rootCause:
            "CPU throttling, memory pressure, disk I/O or dependency latency may be limiting performance.",
          solution:
            "Use docker stats and application monitoring to identify the constrained resource. Investigate the bottleneck before changing resource limits."
        }
      ]
    },
    {
      heading: "14. Docker Logs and Monitoring",
      explanation: `
Logs help engineers understand application behavior and diagnose incidents.

docker logs:
Reads the standard output and standard error captured for a container, subject to the configured logging driver and setup.

Useful options:

-f:
Follow log output.

--tail:
Show only the last requested number of lines.

--since:
Show logs after a specified time.

--timestamps:
Include timestamps.

--details:
Show extra attributes when available.

Logging drivers:
Docker supports logging drivers such as json-file, local, journald, syslog and other configured drivers.

LOG ROTATION:
Without suitable log rotation, container logs can consume host disk space.

IMPORTANT:
Not every logging driver makes logs available through docker logs in the same way. Understand the configured driver and central logging setup.

PRODUCTION LOGGING:

A useful log record should include:
- Timestamp.
- Severity.
- Application/service name.
- Environment.
- Request or correlation ID.
- Error message.
- Relevant context without exposing secrets.

Never log passwords, access tokens or sensitive customer data.
      `,
      steps: [
        "Identify the affected container and incident time window.",
        "Read recent logs.",
        "Filter or search for errors and correlation IDs.",
        "Compare application logs with infrastructure events.",
        "Check logging driver and host disk usage.",
        "Preserve relevant evidence before cleanup.",
        "Confirm log rotation and centralized retention."
      ],
      commands: `
docker logs api
docker logs --tail 100 api
docker logs --since 30m api
docker logs -f api
docker logs --timestamps api

docker inspect --format '{{.HostConfig.LogConfig.Type}}' api

docker system df
df -h
      `,
      problems: [
        {
          issue: "Container logs are missing.",
          rootCause:
            "The application may write to files instead of stdout/stderr, the logging driver may not support docker logs as expected or logs may be sent elsewhere.",
          solution:
            "Inspect the logging driver and application logging configuration. Use the configured log destination and ensure application logs are collected centrally."
        },
        {
          issue: "Docker host disk becomes full because of logs.",
          rootCause:
            "Log files may grow without an effective rotation or retention policy.",
          solution:
            "Configure supported log rotation, verify the logging driver behavior and monitor host disk usage."
        }
      ]
    },
    {
      heading: "17. Docker Events, Inspect and System Diagnostics",
      explanation: `
Production troubleshooting requires evidence.

docker inspect:
Shows detailed metadata and configuration for a container, image, network or volume.

docker events:
Shows Docker Engine events such as container create, start, stop, die and destroy.

docker system df:
Shows Docker disk usage.

docker stats:
Shows live resource usage.

docker top:
Shows processes running inside a container.

These commands answer different questions.

Example:
If a container unexpectedly stopped, inspect its exit code and state, check its logs, and correlate the time with Docker events and host logs.

Do not immediately delete and recreate an affected container. First collect evidence when incident investigation requires it.
      `,
      steps: [
        "Record the container name and incident time.",
        "Collect docker inspect output.",
        "Collect recent application logs.",
        "Collect Docker events for the incident window.",
        "Check resource usage and disk capacity.",
        "Check daemon and host logs when the failure appears infrastructure-related.",
        "Build a timeline from the evidence."
      ],
      commands: `
docker inspect api

docker stats --no-stream

docker top api

docker events --since 1h

docker system df

docker ps -a
      `,
      problems: [
        {
          issue: "Container stopped but the reason is unclear.",
          rootCause:
            "The engineer has checked only docker ps and has not collected exit state, logs or event history.",
          solution:
            "Inspect the stopped container, collect logs and correlate Docker events with host and application logs."
        }
      ]
    },
    {
      heading: "18. Docker Disk Space – Images, Containers, Volumes and Build Cache",
      explanation: `
Docker consumes disk space through images, writable container layers, volumes, build cache and logs.

Useful diagnostic command:
docker system df

It provides an overview of Docker disk usage.

Cleanup commands can be destructive.

docker container prune:
Removes stopped containers.

docker image prune:
Removes unused images according to the command's options.

docker volume prune:
Removes unused volumes. This can permanently remove important data.

docker builder prune:
Removes build cache.

docker system prune:
Removes selected unused Docker objects.

Never run broad prune commands blindly on a production host.

Before cleanup:
1. Identify the filesystem that is full.
2. Check Docker disk usage.
3. Identify important volumes.
4. Check stopped containers that may contain evidence.
5. Confirm backup and recovery requirements.
6. Remove only approved unused objects.
      `,
      steps: [
        "Run df -h to identify full filesystems.",
        "Run docker system df.",
        "Identify large images, containers, volumes and build cache.",
        "Confirm which resources are safe to remove.",
        "Back up important data before any volume cleanup.",
        "Perform controlled cleanup.",
        "Verify free disk space and application health."
      ],
      commands: `
df -h
docker system df
docker image ls
docker ps -a
docker volume ls

docker container prune
docker image prune
docker builder prune

# Destructive: may remove unused volumes and persistent data
docker volume prune
      `,
      problems: [
        {
          issue: "Docker host runs out of disk space.",
          rootCause:
            "Unused images, build cache, container logs, writable layers or volumes may have grown over time.",
          solution:
            "Identify the actual disk consumer. Apply controlled cleanup and configure image retention, log rotation and volume monitoring."
        }
      ]
    }
  ]
};

export default data;
