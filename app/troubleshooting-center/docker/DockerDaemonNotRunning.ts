const guide = {
  "title": "Docker daemon is not running",
  "tool": "Docker",
  "issue": "DockerDaemonNotRunning",
  "symptoms": [
    "Docker CLI cannot connect to the daemon",
    "docker info reports a connection error"
  ],
  "rootCauses": [
    "Docker Desktop or Docker Engine is stopped",
    "Incorrect Docker context",
    "Daemon startup or permission issue"
  ],
  "incidentScenario": "A production container is affected by this issue. Confirm the impact, preserve relevant logs, and diagnose before changing live resources.",
  "diagnosticCommands": [
    "docker version",
    "docker context ls",
    "docker context show",
    "Get-Service com.docker.service"
  ],
  "resolutionSteps": [
    "Start Docker Desktop if using Docker Desktop on Windows",
    "If the Docker service exists and is stopped, start it from an elevated PowerShell session",
    "Check the active Docker context",
    "Review Docker Engine logs if the daemon fails to start"
  ],
  "verification": [
    "docker info",
    "docker ps"
  ],
  "prevention": [
    "Monitor Docker Engine availability",
    "Keep Docker Desktop and Engine updated",
    "Document the correct context and startup procedure"
  ],
  "safetyNotes": [
    "Inspect the actual environment and resource names before running commands.",
    "Do not delete production containers, images, or volumes without approval and a verified recovery plan.",
    "Redact secrets, tokens, credentials and sensitive logs before sharing diagnostic output."
  ]
}

export { guide }
export default guide

