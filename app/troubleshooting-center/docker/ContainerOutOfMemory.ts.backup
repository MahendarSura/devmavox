const guide = {
  "title": "Docker container is running out of memory",
  "tool": "Docker",
  "issue": "ContainerOutOfMemory",
  "symptoms": [
    "Container is terminated under memory pressure",
    "Application reports allocation failures or OOM errors"
  ],
  "rootCauses": [
    "Application memory leak or excessive workload",
    "Container memory limit is too low",
    "Host memory pressure"
  ],
  "incidentScenario": "A production container is affected by this issue. Confirm the impact, preserve relevant logs, and diagnose before changing live resources.",
  "diagnosticCommands": [
    "docker stats",
    "docker inspect <container_name> --format '{{json .State}}'",
    "docker inspect <container_name> --format '{{json .HostConfig.Memory}}'",
    "docker logs --tail 200 <container_name>"
  ],
  "resolutionSteps": [
    "Confirm OOMKilled status and correlate it with application logs",
    "Measure memory usage under realistic load",
    "Fix leaks or reduce unnecessary memory consumption",
    "Set an appropriate container memory limit based on measured requirements and host capacity"
  ],
  "verification": [
    "docker stats",
    "Run a representative workload",
    "Check container state and application error logs"
  ],
  "prevention": [
    "Monitor memory usage and OOM events",
    "Load-test before releases",
    "Set realistic resource limits and alerts"
  ],
  "safetyNotes": [
    "Inspect the actual environment and resource names before running commands.",
    "Do not delete production containers, images, or volumes without approval and a verified recovery plan.",
    "Redact secrets, tokens, credentials and sensitive logs before sharing diagnostic output."
  ]
}

export { guide }
export default guide

