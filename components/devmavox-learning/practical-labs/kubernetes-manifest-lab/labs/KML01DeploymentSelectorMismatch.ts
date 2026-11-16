export const KML01DeploymentSelectorMismatch = {
  id: "KML-01",
  title: "Deployment Selector Mismatch",
  severity: "High",
  businessImpact: "New application Pods are not managed correctly because Deployment selectors do not match Pod template labels. Application rollout and availability are affected.",
  incident: "A production Deployment is created, but its selector does not match the labels assigned to its Pods.",
  brokenYaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payment
  template:
    metadata:
      labels:
        app: payment-api
    spec:
      containers:
        - name: payment
          image: nginx:1.27`,
  fixedYaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payment-api
  template:
    metadata:
      labels:
        app: payment-api
    spec:
      containers:
        - name: payment
          image: nginx:1.27`,
  commands: [
    { command: "kubectl get deployments", purpose: "Inspect Deployments", output: "NAME          READY   UP-TO-DATE   AVAILABLE\npayment-api   0/3     0            0" },
    { command: "kubectl describe deployment payment-api", purpose: "Inspect selector and rollout", output: "Selector: app=payment\nPod Template Labels: app=payment-api\nWarning: selector does not match template labels." },
    { command: "kubectl get pods --show-labels", purpose: "Inspect Pod labels", output: "NAME   READY   STATUS    LABELS\nNo matching Pods are managed by the expected selector." },
    { command: "kubectl get events --sort-by=.metadata.creationTimestamp", purpose: "Inspect cluster events", output: "Warning: selector and template label configuration requires correction." }
  ],
  rootCause: "The Deployment selector uses app=payment, but the Pod template uses app=payment-api. Kubernetes requires the selector to match the Pod template labels.",
  validation: ["selector", "matchLabels", "payment-api", "template", "labels"],
  recovery: "The corrected manifest uses the same app=payment-api label in both selector.matchLabels and template.metadata.labels. A valid rollout can now manage the Pods.",
  prevention: ["Keep Deployment selectors consistent with Pod template labels.", "Review immutable selectors before applying changes.", "Validate manifests before production deployment."],
  assessment: ["Identify the mismatched selector.", "Explain why labels must match.", "Correct the Deployment manifest.", "Validate the corrected YAML."]
} as const;