const data = {
  title: "DevOps Error Messages",
  description: "Recognize common Linux, Git, Docker, Kubernetes, Jenkins and Terraform errors. Learn what the message means and which diagnostic commands to run.",
  sections: [
    {
      heading: "1. Kubernetes Errors",
      explanation: "Kubernetes reports Pod and workload states that help identify scheduling, image, startup and health problems. Events and container logs are essential diagnostic sources.",
      steps: [
        "Check Pod status and namespace.",
        "Describe the affected Pod.",
        "Read recent cluster events.",
        "Inspect current and previous container logs.",
        "Identify whether the problem is scheduling, image access, configuration or application startup."
      ],
      commands: "kubectl get pods -A\nkubectl describe pod POD_NAME -n NAMESPACE\nkubectl get events -n NAMESPACE --sort-by=.metadata.creationTimestamp\nkubectl logs POD_NAME -n NAMESPACE\nkubectl logs POD_NAME -n NAMESPACE --previous",
      config: "Common states:\nCrashLoopBackOff - Container repeatedly exits\nImagePullBackOff - Image cannot be pulled\nPending - Pod is not scheduled or initialized\nOOMKilled - Container exceeded memory limit\nCreateContainerConfigError - Configuration reference problem",
      problems: [
        { issue: "CrashLoopBackOff", solution: "Inspect previous logs, startup command, environment variables, probes and application dependencies." },
        { issue: "ImagePullBackOff", solution: "Verify image name, tag, registry permissions and image pull secrets." },
        { issue: "OOMKilled", solution: "Inspect memory usage, container limits and application memory behavior before adjusting resources." }
      ]
    },
    {
      heading: "2. Docker Errors",
      explanation: "Docker errors commonly involve image builds, container startup, port mapping, volumes and daemon connectivity.",
      steps: [
        "Check whether the Docker daemon is running.",
        "Inspect container status and exit code.",
        "Read container logs.",
        "Inspect image and network configuration.",
        "Verify volume mounts and port mappings."
      ],
      commands: "docker version\ndocker ps -a\ndocker images\ndocker logs CONTAINER_NAME\ndocker inspect CONTAINER_NAME\ndocker events --since 10m",
      config: "docker run -d \\\n  --name web \\\n  -p 8080:80 \\\n  nginx:1.27",
      problems: [
        { issue: "Cannot connect to the Docker daemon.", solution: "Check Docker Desktop or the Docker service and verify that the CLI is connected to the expected daemon." },
        { issue: "Port is already allocated.", solution: "Find the process or container using the host port and choose an available port if appropriate." },
        { issue: "Container exits immediately.", solution: "Read docker logs and verify the container's command, entrypoint and application startup requirements." }
      ]
    },
    {
      heading: "3. Git, Jenkins and Terraform Errors",
      explanation: "Source control, CI pipelines and infrastructure automation can fail because of authentication, merge conflicts, missing tools, invalid configuration or incorrect state.",
      steps: [
        "Read the first meaningful error in the logs.",
        "Identify which pipeline stage or command failed.",
        "Check repository access and branch configuration.",
        "Validate tool versions and configuration syntax.",
        "Check credentials and permissions without exposing secrets.",
        "Re-run only after correcting the root cause."
      ],
      commands: "git status\ngit log --oneline -5\ngit remote -v\nterraform validate\nterraform plan\n# Review Jenkins console output for the failed stage",
      problems: [
        { issue: "Git authentication failed.", solution: "Verify the remote URL, access token or SSH key and repository permissions." },
        { issue: "Jenkins pipeline fails at a stage.", solution: "Inspect that stage's console output, agent environment, tool versions and credentials." },
        { issue: "Terraform state lock error.", solution: "Confirm whether another operation is active. Do not force-unlock until you have verified that the lock is stale and the team has agreed." }
      ]
    }
  ]
};
export default data;
