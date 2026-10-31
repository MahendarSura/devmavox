import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Docker Production",
  description: "Detailed Docker production notes, practical steps, commands, root causes and solutions.",
  sections: [
    {
      heading: "19. Production Workflow – Developer to CI/CD to Deployment",
      explanation: `
A common production workflow looks like this:

1. Developer commits application code.
2. Git-based CI pipeline starts.
3. Pipeline runs tests and code checks.
4. Docker image is built.
5. Image is scanned and validated.
6. Image is tagged with a release version or commit identifier.
7. Image is pushed to a registry.
8. Deployment system pulls the approved image.
9. Runtime configuration and secrets are supplied.
10. Application starts.
11. Health checks and smoke tests run.
12. Monitoring checks application behavior.
13. If the release fails, the team follows its rollback procedure.

IMPORTANT PRODUCTION PRINCIPLES:

- Prefer immutable, traceable image versions.
- Avoid relying on a mutable latest tag for controlled releases.
- Keep secrets outside the image.
- Use persistent storage for stateful workloads.
- Set resource limits based on measured capacity.
- Configure logs and monitoring.
- Test rollback procedures.
- Deploy gradually where the platform supports safe rollout strategies.

Docker alone does not provide every orchestration feature required for large-scale production. Teams may use Kubernetes, Swarm or managed container platforms depending on their architecture.
      `,
      steps: [
        "Commit code and review the change.",
        "Run automated tests.",
        "Build the Docker image.",
        "Scan and test the image.",
        "Push the image using a unique release tag.",
        "Deploy the exact image reference.",
        "Verify health checks and application endpoints.",
        "Monitor errors, latency and resource usage.",
        "Rollback to a known-good image if the release fails."
      ],
      commands: `
# Example release commands

docker build -t registry.example.com/team/api:2026.10.31 .

docker push registry.example.com/team/api:2026.10.31

docker pull registry.example.com/team/api:2026.10.31

docker run -d --name api \\
  --restart unless-stopped \\
  -p 3000:3000 \\
  registry.example.com/team/api:2026.10.31

docker logs --tail 100 api
docker inspect api
      `,
      problems: [
        {
          issue: "New release fails after deployment.",
          rootCause:
            "The image may contain a regression, configuration may be incorrect or a dependency may not be compatible.",
          solution:
            "Stop further rollout, collect logs and health evidence, compare the release with the previous version and follow the approved rollback process."
        },
        {
          issue: "Production server runs an unexpected application version.",
          rootCause:
            "The deployment may use a mutable tag or the release pipeline may not have verified the exact image digest.",
          solution:
            "Use traceable version tags or digest-pinned references and record the deployed image identity in the release process."
        }
      ]
    },
    {
      heading: "20. Real Production Incident – Container Keeps Restarting",
      explanation: `
SCENARIO:

An API container restarts repeatedly after a production deployment.

USER IMPACT:
Requests fail intermittently or the API becomes unavailable.

INCIDENT INVESTIGATION:

Step 1 – Confirm the container state.
Use docker ps -a and identify restart count and current status.

Step 2 – Read the logs.
Use docker logs with a limited time window. Look for startup errors, missing configuration, failed dependency connections and stack traces.

Step 3 – Inspect container state.
Check exit code, OOMKilled, restart policy and startup configuration.

Step 4 – Check dependencies.
Verify database DNS, port, credentials and service readiness.

Step 5 – Compare with the previous release.
Check changes in environment variables, image version, Dockerfile and application configuration.

Step 6 – Find root cause.
Do not assume that restart count itself explains the problem. Use the evidence to identify the failure.

EXAMPLE ROOT CAUSE:
The new API release expects DATABASE_HOST, but the deployment configuration still provides DB_HOST. The application cannot connect to the database and exits.

FIX:
Correct the runtime configuration, deploy the corrected release and verify successful startup.

VERIFICATION:
- Container remains running.
- Health check passes.
- API endpoint responds.
- Database connection succeeds.
- Restart count no longer increases.
- Error rate returns to normal.

PREVENTION:
Validate required environment variables during startup, test deployment configuration in CI and monitor restart events.
      `,
      steps: [
        "Confirm impact and identify affected containers.",
        "Capture container status, restart count and exit code.",
        "Collect application logs and inspect output.",
        "Check OOMKilled and resource usage.",
        "Verify dependency connectivity.",
        "Compare the deployed configuration with the previous working release.",
        "Apply the smallest safe fix or rollback.",
        "Verify service health and monitor for recurrence.",
        "Document root cause and prevention actions."
      ],
      commands: `
docker ps -a

docker inspect api

docker inspect --format '{{.State.ExitCode}}' api

docker inspect --format '{{.State.OOMKilled}}' api

docker logs --since 30m --tail 300 api

docker stats --no-stream api

docker events --since 30m
      `,
      config: `
# Example: required configuration validation in Node.js

const requiredVariables = [
  "DATABASE_HOST",
  "DATABASE_USER",
  "DATABASE_PASSWORD"
];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(\`Missing required environment variable: \${variable}\`);
  }
}
      `,
      problems: [
        {
          issue: "Container repeatedly restarts after a new release.",
          rootCause:
            "The application exits during startup because of invalid configuration, a missing dependency, a failed migration or an application regression.",
          solution:
            "Use logs, inspect state and compare release configuration. Correct the root cause or roll back to the last known-good image."
        }
      ]
    },
    {
      heading: "21. Real Production Incident – Database Connection Failure",
      explanation: `
SCENARIO:

The API container is running, but every database request fails.

COMMON SYMPTOMS:

- Connection refused.
- Name or service not known.
- Connection timed out.
- Authentication failed.
- Too many connections.

INVESTIGATION:

1. Check the exact error message in API logs.
2. Confirm the database container or service is running.
3. Check whether API and database share a network.
4. Check the database hostname.
5. Check the database listening port.
6. Check credentials and database name.
7. Check database readiness and connection limits.

IMPORTANT:
Inside the API container, localhost refers to the API container itself. Use the database service name or network alias.

Connection refused usually means the destination was reached but no process accepted the connection at that address and port.

Connection timed out can indicate network filtering, routing problems or a service that is not responding.

Authentication failed points toward credentials or database authorization, not necessarily Docker networking.
      `,
      steps: [
        "Read the exact database error.",
        "Inspect both API and database containers.",
        "Inspect shared network membership.",
        "Test database DNS resolution from the API network.",
        "Test TCP connectivity to the database port.",
        "Verify credentials securely.",
        "Check database readiness and connection capacity.",
        "Correct the relevant configuration and retest."
      ],
      commands: `
docker logs --tail 200 api
docker logs --tail 200 database

docker inspect api
docker inspect database

docker network ls
docker network inspect app-network

# If the diagnostic utilities exist in the API image:
getent hosts database
nc -vz database 5432
      `,
      config: `
# Incorrect application configuration
DATABASE_HOST=localhost

# Correct when the database service is named "database"
DATABASE_HOST=database
DATABASE_PORT=5432
      `,
      problems: [
        {
          issue: "Connection refused.",
          rootCause:
            "The database may not be listening on the target port, may still be starting or may be bound to a different interface.",
          solution:
            "Check database logs, listening address, port and readiness. Ensure the API uses the correct service name and port."
        },
        {
          issue: "Name or service not known.",
          rootCause:
            "The hostname may be incorrect or the containers may not share a network with the expected DNS behavior.",
          solution:
            "Verify the Compose service name or Docker network alias and inspect network membership."
        },
        {
          issue: "Password authentication failed.",
          rootCause:
            "The application may use an incorrect, outdated or mismatched credential.",
          solution:
            "Verify the secret source and database user permissions. Rotate credentials through the approved secret-management process if necessary."
        }
      ]
    },
    {
      heading: "24. Real Production Incident – Docker Host Disk Full",
      explanation: `
SCENARIO:

The Docker host reports no free disk space. New containers fail to start or applications cannot write files.

POSSIBLE CONSUMERS:

- Container logs.
- Image layers.
- Build cache.
- Container writable layers.
- Volumes.
- Application data.

INVESTIGATION:

1. Run df -h to identify the full filesystem.
2. Run docker system df.
3. Inspect large log files and configured logging drivers.
4. Check volumes before cleanup.
5. Check build cache and unused images.
6. Confirm whether the filesystem is shared with application data.

RECOVERY:
Remove only approved unused objects. Do not remove volumes without verifying their contents and backup status.

PREVENTION:
Configure log rotation, monitor disk usage, define image retention and maintain volume backup policies.
      `,
      steps: [
        "Identify the full filesystem.",
        "Inspect Docker storage usage.",
        "Identify large logs, images, cache or volumes.",
        "Confirm which data is safe to remove.",
        "Back up important data.",
        "Perform controlled cleanup.",
        "Verify disk capacity and application health."
      ],
      commands: `
df -h
docker system df
docker image ls
docker ps -a
docker volume ls

docker builder prune
docker image prune
      `,
      problems: [
        {
          issue: "Disk is still full after removing containers.",
          rootCause:
            "The actual space consumer may be logs, volumes, images, build cache or application files.",
          solution:
            "Identify the filesystem and its largest consumers before selecting a cleanup operation."
        }
      ]
    },
    {
      heading: "25. Docker Troubleshooting Method – Production Engineer RCA Checklist",
      explanation: `
A production engineer should follow a repeatable investigation method.

1. UNDERSTAND IMPACT:
Which service is affected? How many users? Is the issue total or partial?

2. RECORD TIME:
Record when the incident started and when symptoms were observed.

3. COLLECT EVIDENCE:
Capture container state, logs, events, resource usage and relevant host information.

4. FORM A HYPOTHESIS:
Use the evidence to identify likely causes.

5. TEST SAFELY:
Run targeted checks. Avoid destructive commands during investigation.

6. IDENTIFY ROOT CAUSE:
Find the condition that caused the failure, not just the visible symptom.

7. RECOVER:
Apply a safe fix or rollback according to the incident procedure.

8. VERIFY:
Confirm application health, user-facing behavior, dependency connectivity and resource stability.

9. PREVENT:
Add validation, monitoring, alerts, automated tests or configuration controls.

10. DOCUMENT:
Record impact, timeline, evidence, root cause, recovery and follow-up actions.

A restart is an action, not a root-cause analysis.
      `,
      steps: [
        "Confirm impact and severity.",
        "Record the incident timeline.",
        "Collect logs and diagnostic output.",
        "Inspect container, image, network, storage and resource configuration as relevant.",
        "Compare current state with the last known-good state.",
        "Test the suspected root cause.",
        "Apply the approved fix or rollback.",
        "Verify service recovery.",
        "Create preventive actions and document the incident."
      ],
      commands: `
docker ps -a
docker logs --since 30m --tail 300 <container>
docker inspect <container>
docker stats --no-stream
docker events --since 30m
docker system df
docker network ls
docker volume ls

# Linux host diagnostics
df -h
free -h
sudo journalctl -u docker --since "30 minutes ago"
      `,
      problems: [
        {
          issue: "Engineer restarts the container repeatedly but the issue returns.",
          rootCause:
            "The restart treats the symptom but leaves the actual failure condition unchanged.",
          solution:
            "Collect evidence, identify the failure condition and fix the application, configuration, dependency or infrastructure problem."
        },
        {
          issue: "Troubleshooting removes useful incident evidence.",
          rootCause:
            "The engineer deletes or recreates the affected container before recording its state and logs.",
          solution:
            "Capture relevant logs, inspect output, events and configuration before performing destructive cleanup."
        }
      ]
    }
  ]
};

export default data;
