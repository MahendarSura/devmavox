const guide = {
  "title": "Docker volume data missing",
  "tool": "Docker",
  "issue": "VolumeDataMissing",
  "symptoms": [
    "Application cannot see expected files",
    "Data appears missing after recreating a container"
  ],
  "rootCauses": [
    "Wrong mount destination",
    "A different or anonymous volume is attached",
    "Application writes to the container filesystem instead of the persistent mount"
  ],
  "incidentScenario": "A production container is affected by this issue. Confirm the impact, preserve relevant logs, and diagnose before changing live resources.",
  "diagnosticCommands": [
    "docker volume ls",
    "docker inspect <container_name> --format '{{json .Mounts}}'",
    "docker volume inspect <volume_name>",
    "docker ps -a"
  ],
  "resolutionSteps": [
    "Inspect the actual volume source and destination",
    "Mount the intended named volume at the application's data directory",
    "Check file ownership and permissions inside the container",
    "Do not prune or delete volumes until data ownership and backups are confirmed"
  ],
  "verification": [
    "docker inspect <container_name> --format '{{json .Mounts}}'",
    "Write and read a test file in a safe test location",
    "Recreate the container only after confirming the correct volume is attached"
  ],
  "prevention": [
    "Prefer named volumes for persistent data",
    "Document mount paths",
    "Back up important volumes and test restoration"
  ],
  "safetyNotes": [
    "Inspect the actual environment and resource names before running commands.",
    "Do not delete production containers, images, or volumes without approval and a verified recovery plan.",
    "Redact secrets, tokens, credentials and sensitive logs before sharing diagnostic output."
  ]
}

export { guide }
export default guide

