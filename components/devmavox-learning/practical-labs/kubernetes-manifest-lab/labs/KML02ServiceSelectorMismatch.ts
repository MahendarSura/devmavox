export const KML02ServiceSelectorMismatch = {
  id: "KML-02",
  title: "Service Selector Mismatch",
  severity: "Critical",
  businessImpact: "The application Pods may be running, but the Service cannot route traffic to them. Users experience connection failures or unavailable application endpoints.",
  incident: "A Kubernetes Service has no usable endpoints because its selector does not match the application Pod labels.",
  brokenYaml: `apiVersion: v1
kind: Service
metadata:
  name: catalog-service
spec:
  selector:
    app: catalog-prod
  ports:
    - port: 80
      targetPort: 8080`,
  fixedYaml: `apiVersion: v1
kind: Service
metadata:
  name: catalog-service
spec:
  selector:
    app: catalog
  ports:
    - port: 80
      targetPort: 8080`,
  commands: [
    { command: "kubectl get pods --show-labels", purpose: "Inspect workload labels", output: "NAME           READY   STATUS    LABELS\ncatalog-api    1/1     Running   app=catalog" },
    { command: "kubectl get service catalog-service", purpose: "Inspect Service", output: "NAME              TYPE        CLUSTER-IP      PORT(S)\ncatalog-service   ClusterIP   10.96.10.20     80/TCP" },
    { command: "kubectl get endpoints catalog-service", purpose: "Inspect Service endpoints", output: "NAME              ENDPOINTS\ncatalog-service   <none>" },
    { command: "kubectl describe service catalog-service", purpose: "Inspect selector and ports", output: "Selector: app=catalog-prod\nNo matching Pod endpoints found." }
  ],
  rootCause: "The Service selector app=catalog-prod does not match the actual Pod label app=catalog. Therefore, the Service has no matching endpoints.",
  validation: ["selector", "app", "catalog", "targetPort", "8080"],
  recovery: "After correcting the Service selector to app=catalog, matching Pods become eligible endpoints and Service traffic can be routed.",
  prevention: ["Standardize application labels.", "Verify endpoints after Service creation.", "Test Service connectivity before production release."],
  assessment: ["Find the Pod label.", "Compare it with the Service selector.", "Correct the selector.", "Verify expected endpoints."]
} as const;