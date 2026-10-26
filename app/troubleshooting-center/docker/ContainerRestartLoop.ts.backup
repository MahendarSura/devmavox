const guide = {
  "title": "Docker container keeps restarting",
  "tool": "Docker",
  "issue": "ContainerRestartLoop",
  "symptoms": [
    "Container repeatedly restarts",
    "Service becomes intermittently unavailable"
  ],
  "rootCauses": [
    "Application crashes on startup",
    "Incorrect restart policy",
    "Out-of-memory termination",
    "Dependency or configuration failure"
  ],
  "incidentScenario": "A production container is affected by this issue. Confirm the impact, preserve relevant logs, and diagnose before changing live resources.",
  "diagnosticCommands": [
    "docker ps -a",
    "docker logs --tail 200 <container_name>",
    "docker inspect <container_name> --format '{{json .State}}'",
    "docker stats"
  ],
  "resolutionSteps": [
    "Use logs and State.ExitCode to identify the actual failure",
    "Check OOMKilled and memory usage",
    "Validate environment variables, mounted files and dependency connectivity",
    "Correct the restart policy only after fixing the underlying failure"
  ],
  "verification": [
    "docker start <container_name>",
    "docker ps",
    "docker logs --tail 100 <container_name>"
  ],
  "prevention": [
    "Set appropriate health checks",
    "Monitor restart counts",
    "Test failure and recovery behaviour"
  ],
  "safetyNotes": [
    "Inspect the actual environment and resource names before running commands.",
    "Do not delete production containers, images, or volumes without approval and a verified recovery plan.",
    "Redact secrets, tokens, credentials and sensitive logs before sharing diagnostic output."
  ]
}

export { guide }
export default guide

