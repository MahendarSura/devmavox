export const KML03MissingConfigMapReference = {
  id: "KML-03",
  title: "Missing ConfigMap Reference",
  severity: "High",
  businessImpact: "The application cannot start because a required configuration object is missing. Deployment availability and dependent services may be affected.",
  incident: "A Pod references a ConfigMap that does not exist in its namespace.",
  brokenYaml: `apiVersion: v1
kind: Pod
metadata:
  name: checkout-api
spec:
  containers:
    - name: checkout
      image: nginx:1.27
      envFrom:
        - configMapRef:
            name: checkout-config-prod`,
  fixedYaml: `apiVersion: v1
kind: ConfigMap
metadata:
  name: checkout-config
data:
  APP_MODE: production
---
apiVersion: v1
kind: Pod
metadata:
  name: checkout-api
spec:
  containers:
    - name: checkout
      image: nginx:1.27
      envFrom:
        - configMapRef:
            name: checkout-config`,
  commands: [
    { command: "kubectl get pods", purpose: "Inspect Pod status", output: "NAME           READY   STATUS\ncheckout-api   0/1     CreateContainerConfigError" },
    { command: "kubectl describe pod checkout-api", purpose: "Inspect Pod events", output: "Warning: configmap checkout-config-prod not found." },
    { command: "kubectl get configmaps", purpose: "List available ConfigMaps", output: "NAME             DATA\ncheckout-config  1" },
    { command: "kubectl get pod checkout-api -o yaml", purpose: "Inspect Pod configuration", output: "envFrom references configMapRef.name: checkout-config-prod" }
  ],
  rootCause: "The Pod references checkout-config-prod, but the available ConfigMap is named checkout-config. The referenced ConfigMap must exist in the same namespace.",
  validation: ["configMapRef", "checkout-config"],
  recovery: "Create or reference the correct ConfigMap in the Pod namespace. The corrected manifest references checkout-config.",
  prevention: ["Manage ConfigMaps with application manifests.", "Validate object names and namespaces.", "Check Pod events during deployment."],
  assessment: ["Identify the missing ConfigMap.", "Inspect available ConfigMaps.", "Correct the reference or create the missing object.", "Validate the manifest."]
} as const;