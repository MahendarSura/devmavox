const guide = {
  "title": "Docker container exits immediately",
  "tool": "Docker",
  "issue": "ContainerExitCode137",
  "symptoms": [
    "Container stops immediately after startup",
    "docker ps does not show the stopped container"
  ],
  "rootCauses": [
    "The main process finishes or exits",
    "Incorrect CMD or ENTRYPOINT",
    "Missing environment variables or startup configuration"
  ],
  "incidentScenario": "A production container is affected by this issue. Confirm the impact, preserve relevant logs, and diagnose before changing live resources.",
  "diagnosticCommands": [
    "docker ps -a",
    "docker logs <container_name>",
    "docker inspect <container_name> --format '{{json .State}}'",
    "docker inspect <container_name> --format '{{json .Config.Cmd}} {{json .Config.Entrypoint}}'"
  ],
  "resolutionSteps": [
    "Read container logs and identify the first startup error",
    "Check CMD and ENTRYPOINT in the Dockerfile",
    "Supply required environment variables and files",
    "Ensure the container's main process stays in the foreground"
  ],
  "verification": [
    "docker start <container_name>",
    "docker logs --tail 100 <container_name>",
    "docker ps"
  ],
  "prevention": [
    "Add startup validation",
    "Use reliable health checks",
    "Test the image locally before deployment"
  ],
  "safetyNotes": [
    "Inspect the actual environment and resource names before running commands.",
    "Do not delete production containers, images, or volumes without approval and a verified recovery plan.",
    "Redact secrets, tokens, credentials and sensitive logs before sharing diagnostic output."
  ]
}

export { guide }
export default guide

