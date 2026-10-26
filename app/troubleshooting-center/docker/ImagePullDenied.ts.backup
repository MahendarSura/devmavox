const guide = {
  "title": "Docker image pull denied or image not found",
  "tool": "Docker",
  "issue": "ImagePullDenied",
  "symptoms": [
    "Image pull returns denied or not found",
    "Deployment cannot download the requested image"
  ],
  "rootCauses": [
    "Incorrect image name or tag",
    "Private registry authentication failure",
    "Missing repository permissions"
  ],
  "incidentScenario": "A production container is affected by this issue. Confirm the impact, preserve relevant logs, and diagnose before changing live resources.",
  "diagnosticCommands": [
    "docker image pull <image:tag>",
    "docker image ls",
    "docker info"
  ],
  "resolutionSteps": [
    "Verify the registry hostname, repository and tag",
    "Authenticate using docker login <registry>",
    "Ask the registry administrator to verify repository pull permissions",
    "Avoid putting passwords or tokens in command history or source files"
  ],
  "verification": [
    "docker image pull <image:tag>",
    "docker image inspect <image:tag>"
  ],
  "prevention": [
    "Use immutable image tags or digests",
    "Manage registry credentials securely",
    "Validate image availability in CI"
  ],
  "safetyNotes": [
    "Inspect the actual environment and resource names before running commands.",
    "Do not delete production containers, images, or volumes without approval and a verified recovery plan.",
    "Redact secrets, tokens, credentials and sensitive logs before sharing diagnostic output."
  ]
}

export { guide }
export default guide

