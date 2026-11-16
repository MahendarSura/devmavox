export const CD03ArgoCDDesiredStateDrift = {
  id: "CD-03",
  title: "Argo CD Desired State Drift",
  severity: "High",
  businessImpact: "The live Kubernetes resources differ from Git desired state. Manual changes can be overwritten or remain inconsistent, creating deployment and compliance risks.",
  incident: "An operator manually changes a live Deployment replica count, causing Argo CD to detect drift from Git.",
  brokenYaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: inventory-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: inventory
  template:
    metadata:
      labels:
        app: inventory
    spec:
      containers:
        - name: inventory
          image: nginx:1.27`,
  fixedYaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: inventory-api
spec:
  replicas: 4
  selector:
    matchLabels:
      app: inventory
  template:
    metadata:
      labels:
        app: inventory
    spec:
      containers:
        - name: inventory
          image: nginx:1.27`,
  commands: [
    { command: "argocd app list", purpose: "Inspect managed applications", output: "Review application health and sync status." },
    { command: "argocd app get inventory", purpose: "Inspect application drift", output: "Simulated status: OutOfSync. Live replica count differs from Git desired state." },
    { command: "kubectl get deployment inventory-api -o yaml", purpose: "Inspect live Deployment", output: "Live replica count: 4. Compare with the Git manifest." },
    { command: "git diff -- deployment.yaml", purpose: "Inspect desired-state change", output: "Review the replica count stored in Git and determine the intended value." }
  ],
  rootCause: "The live Deployment was changed manually, while the Git repository still defines a different replica count. Argo CD detects this difference as configuration drift.",
  validation: ["replicas:", "4", "inventory", "Deployment"],
  recovery: "Decide the intended replica count, update Git as the source of truth, review the rendered change, and synchronize the Argo CD application.",
  prevention: ["Use Git as the desired-state source.", "Avoid unmanaged manual production changes.", "Review OutOfSync status and audit changes."],
  assessment: ["Explain desired and live state.", "Identify the drift.", "Correct the Git manifest.", "Describe safe synchronization."]
} as const;