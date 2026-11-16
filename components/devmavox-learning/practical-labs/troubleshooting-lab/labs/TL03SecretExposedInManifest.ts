export const TL03SecretExposedInManifest = {
  id: "TL-03",
  title: "Secret Exposed in Manifest",
  severity: "Critical",
  businessImpact: "Credentials committed in plain text can be exposed through source control, logs, backups, and deployment artifacts. Unauthorized access may compromise production systems.",
  incident: "A Kubernetes Deployment stores a database password directly inside its environment variables.",
  brokenYaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: billing-api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: billing
  template:
    metadata:
      labels:
        app: billing
    spec:
      containers:
        - name: billing
          image: nginx:1.27
          env:
            - name: DB_PASSWORD
              value: "PlainTextPassword123"`,
  fixedYaml: `apiVersion: v1
kind: Secret
metadata:
  name: billing-db-secret
type: Opaque
stringData:
  DB_PASSWORD: "REPLACE_WITH_SECURE_SECRET"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: billing-api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: billing
  template:
    metadata:
      labels:
        app: billing
    spec:
      containers:
        - name: billing
          image: nginx:1.27
          env:
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: billing-db-secret
                  key: DB_PASSWORD`,
  commands: [
    { command: "kubectl get deployment billing-api -o yaml", purpose: "Inspect environment configuration", output: "DB_PASSWORD is configured using a literal value." },
    { command: "kubectl get secrets", purpose: "Inspect available Secret objects", output: "NAME                 TYPE\nNo billing-db-secret found in this namespace." },
    { command: "kubectl describe deployment billing-api", purpose: "Inspect deployment configuration", output: "Environment variable DB_PASSWORD uses a directly configured value." },
    { command: "git log --oneline --all", purpose: "Review source-control exposure history", output: "Review commits and artifacts for accidentally committed credentials. Rotate exposed credentials immediately." }
  ],
  rootCause: "A sensitive database password is embedded directly in a Deployment manifest instead of being referenced through a Kubernetes Secret. Previously exposed credentials must be rotated.",
  validation: ["secretKeyRef", "billing-db-secret", "DB_PASSWORD", "valueFrom"],
  recovery: "Create a Kubernetes Secret using a secure secret-management process, reference it through secretKeyRef, and rotate any credential that was exposed. Do not use real credentials in this exercise.",
  prevention: ["Never commit real credentials.", "Use an external secret manager where appropriate.", "Enable secret scanning and credential rotation."],
  assessment: ["Identify the exposed credential.", "Explain the security impact.", "Replace literal value with Secret reference.", "Describe credential rotation."]
} as const;