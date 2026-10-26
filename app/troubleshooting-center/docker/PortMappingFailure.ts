const guide = {
  "title": "Docker container port mapping not working",
  "tool": "Docker",
  "issue": "PortMappingFailure",
  "symptoms": [
    "Application cannot be reached from the host",
    "Container is running but the published port fails"
  ],
  "rootCauses": [
    "Incorrect host-to-container port mapping",
    "Application listens only on localhost inside the container",
    "Host port conflict or firewall restriction"
  ],
  "incidentScenario": "A production container is affected by this issue. Confirm the impact, preserve relevant logs, and diagnose before changing live resources.",
  "diagnosticCommands": [
    "docker ps",
    "docker port <container_name>",
    "docker inspect <container_name> --format '{{json .NetworkSettings.Ports}}",
    "docker logs <container_name>"
  ],
  "resolutionSteps": [
    "Confirm the application listens on the expected container port",
    "Publish the correct mapping, for example docker run -p 8080:80 <image>",
    "Configure the application to listen on 0.0.0.0 inside the container",
    "Check host port conflicts and firewall rules"
  ],
  "verification": [
    "docker port <container_name>",
    "Test the published endpoint from the host",
    "docker logs --tail 50 <container_name>"
  ],
  "prevention": [
    "Document host and container ports separately",
    "Add endpoint health checks",
    "Test published ports in deployment pipelines"
  ],
  "safetyNotes": [
    "Inspect the actual environment and resource names before running commands.",
    "Do not delete production containers, images, or volumes without approval and a verified recovery plan.",
    "Redact secrets, tokens, credentials and sensitive logs before sharing diagnostic output."
  ]
}

export { guide }
export default guide

