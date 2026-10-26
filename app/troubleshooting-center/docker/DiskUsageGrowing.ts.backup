const guide = {
  "title": "Docker disk usage is growing excessively",
  "tool": "Docker",
  "issue": "DiskUsageGrowing",
  "symptoms": [
    "Disk space is running low",
    "Images, stopped containers or logs consume excessive storage"
  ],
  "rootCauses": [
    "Unused images and containers accumulate",
    "Container logs grow without rotation",
    "Build cache or unused volumes occupy space"
  ],
  "incidentScenario": "A production container is affected by this issue. Confirm the impact, preserve relevant logs, and diagnose before changing live resources.",
  "diagnosticCommands": [
    "docker system df -v",
    "docker ps -a --size",
    "docker image ls",
    "docker volume ls"
  ],
  "resolutionSteps": [
    "Identify which images, containers, build cache or logs consume space",
    "Configure log rotation using suitable max-size and max-file settings",
    "Remove only resources confirmed to be unused and safe to delete",
    "Back up and verify volumes before any cleanup"
  ],
  "verification": [
    "docker system df -v",
    "Check available host disk space",
    "Monitor log size after rotation is enabled"
  ],
  "prevention": [
    "Set Docker logging limits",
    "Schedule reviewed cleanup procedures",
    "Monitor disk usage and alert before capacity is exhausted"
  ],
  "safetyNotes": [
    "Inspect the actual environment and resource names before running commands.",
    "Do not delete production containers, images, or volumes without approval and a verified recovery plan.",
    "Redact secrets, tokens, credentials and sensitive logs before sharing diagnostic output."
  ]
}

export { guide }
export default guide

