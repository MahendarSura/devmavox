export const TL02ContainerExitsImmediately = {
  id: "TL-02",
  title: "Container Exits Immediately",
  severity: "High",
  businessImpact: "The application repeatedly terminates after startup. Users experience service interruption and Kubernetes may repeatedly restart the container.",
  incident: "A container exits immediately because its configured command does not keep the application process running.",
  brokenYaml: `apiVersion: v1
kind: Pod
metadata:
  name: worker
spec:
  restartPolicy: Always
  containers:
    - name: worker
      image: busybox:1.36
      command: ["sh", "-c", "echo Starting worker; exit 1"]`,
  fixedYaml: `apiVersion: v1
kind: Pod
metadata:
  name: worker
spec:
  restartPolicy: Always
  containers:
    - name: worker
      image: busybox:1.36
      command: ["sh", "-c", "while true; do echo Worker running; sleep 10; done"]`,
  commands: [
    { command: "kubectl get pods", purpose: "Inspect restart status", output: "worker   0/1   CrashLoopBackOff   RESTARTS: 5" },
    { command: "kubectl logs worker --previous", purpose: "Inspect previous container logs", output: "Starting worker\nProcess exited with status 1" },
    { command: "kubectl describe pod worker", purpose: "Inspect termination details", output: "Last State: Terminated\nReason: Error\nExit Code: 1" },
    { command: "kubectl get pod worker -o yaml", purpose: "Inspect container command", output: "command: sh -c echo Starting worker; exit 1" }
  ],
  rootCause: "The configured shell command prints a message and exits with status code 1. Kubernetes restarts the container because restartPolicy is Always.",
  validation: ["command:", "while true", "sleep"],
  recovery: "Configure a valid long-running application process. Verify that the container remains Running and restart count stops increasing.",
  prevention: ["Use the correct application entrypoint.", "Test container commands locally.", "Review previous container logs and exit codes."],
  assessment: ["Inspect restart count.", "Read previous logs.", "Identify the exit command.", "Repair the container process."]
} as const;