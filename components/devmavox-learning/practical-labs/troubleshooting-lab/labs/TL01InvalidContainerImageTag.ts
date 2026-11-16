export const TL01InvalidContainerImageTag = {
  id: "TL-01",
  title: "Invalid Container Image Tag",
  severity: "High",
  businessImpact: "The application cannot start because the container runtime cannot pull the requested image. Deployment availability is affected.",
  incident: "A production Deployment references a non-existent or unavailable container image tag.",
  brokenYaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: orders
  template:
    metadata:
      labels:
        app: orders
    spec:
      containers:
        - name: orders
          image: nginx:99.99-invalid`,
  fixedYaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: orders
  template:
    metadata:
      labels:
        app: orders
    spec:
      containers:
        - name: orders
          image: nginx:1.27`,
  commands: [
    { command: "kubectl get pods", purpose: "Find affected Pods", output: "orders-api-xxxxx   0/1   ImagePullBackOff" },
    { command: "kubectl describe pod orders-api-xxxxx", purpose: "Inspect image pull events", output: "Failed to pull image nginx:99.99-invalid. Image tag not found." },
    { command: "kubectl get deployment orders-api -o yaml", purpose: "Inspect configured image", output: "image: nginx:99.99-invalid" },
    { command: "kubectl get events --sort-by=.lastTimestamp", purpose: "Review recent failures", output: "Warning Failed: Error response from image registry." }
  ],
  rootCause: "The Deployment references an invalid or unavailable image tag. Kubernetes cannot download the image from the container registry.",
  validation: ["image:", "nginx:", "1.27"],
  recovery: "Replace the invalid image tag with a verified available version, apply the corrected manifest, and verify the rollout.",
  prevention: ["Use verified immutable image tags.", "Validate images in CI pipelines.", "Maintain a trusted image registry."],
  assessment: ["Identify the image pull failure.", "Inspect Pod events.", "Correct the image tag.", "Verify rollout recovery."]
} as const;