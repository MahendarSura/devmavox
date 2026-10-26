const guide = {
  "title": "Docker image build fails",
  "tool": "Docker",
  "issue": "DockerBuildFailure",
  "symptoms": [
    "docker build exits with an error",
    "A Dockerfile layer fails"
  ],
  "rootCauses": [
    "Invalid Dockerfile instruction",
    "Missing build-context files",
    "Incorrect COPY path",
    "Package download or dependency failure"
  ],
  "incidentScenario": "A production container is affected by this issue. Confirm the impact, preserve relevant logs, and diagnose before changing live resources.",
  "diagnosticCommands": [
    "docker build --progress=plain -t troubleshooting-app .",
    "Get-Content .\\Dockerfile",
    "Get-ChildItem -Force",
    "docker version"
  ],
  "resolutionSteps": [
    "Read the first failing build step in the output",
    "Run docker build from the correct directory",
    "Correct COPY paths and verify files are not excluded by .dockerignore",
    "Fix package versions or registry connectivity before retrying"
  ],
  "verification": [
    "docker build --progress=plain -t troubleshooting-app .",
    "docker image inspect troubleshooting-app"
  ],
  "prevention": [
    "Pin dependency versions",
    "Use a suitable .dockerignore",
    "Build and test images in CI"
  ],
  "safetyNotes": [
    "Inspect the actual environment and resource names before running commands.",
    "Do not delete production containers, images, or volumes without approval and a verified recovery plan.",
    "Redact secrets, tokens, credentials and sensitive logs before sharing diagnostic output."
  ]
}

export { guide }
export default guide

