const guide = {
  "title": "Docker containers cannot communicate",
  "tool": "Docker",
  "issue": "ContainerNetworkFailure",
  "symptoms": [
    "One container cannot reach another",
    "Service-to-service requests fail"
  ],
  "rootCauses": [
    "Containers are on different networks",
    "Wrong destination hostname or port",
    "Application is not listening on the container interface"
  ],
  "incidentScenario": "A production container is affected by this issue. Confirm the impact, preserve relevant logs, and diagnose before changing live resources.",
  "diagnosticCommands": [
    "docker network ls",
    "docker network inspect <network_name>",
    "docker inspect <container_name> --format '{{json .NetworkSettings.Networks}}'",
    "docker logs <container_name>"
  ],
  "resolutionSteps": [
    "Attach both containers to the intended user-defined network",
    "Use the destination container name or Compose service name for DNS",
    "Use the destination container port rather than assuming the host-published port",
    "Verify application bind address and service readiness"
  ],
  "verification": [
    "docker network inspect <network_name>",
    "Run a connectivity test from the source container if diagnostic tools are available"
  ],
  "prevention": [
    "Define networks explicitly in Compose",
    "Use service names instead of changing container IPs",
    "Add dependency readiness checks"
  ],
  "safetyNotes": [
    "Inspect the actual environment and resource names before running commands.",
    "Do not delete production containers, images, or volumes without approval and a verified recovery plan.",
    "Redact secrets, tokens, credentials and sensitive logs before sharing diagnostic output."
  ]
}

export { guide }
export default guide

