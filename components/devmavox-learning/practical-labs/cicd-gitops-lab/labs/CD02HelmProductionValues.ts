export const CD02HelmProductionValues = {
  id: "CD-02",
  title: "Helm Production Values",
  severity: "High",
  businessImpact: "Unsafe Helm values can deploy insufficient replicas, expose services incorrectly, or configure resource limits unsuitable for production workloads.",
  incident: "A Helm chart is deployed to production using development-oriented values.",
  brokenYaml: `replicaCount: 1
image:
  repository: example/payment
  tag: latest
service:
  type: NodePort
resources: {}`,
  fixedYaml: `replicaCount: 3
image:
  repository: example/payment
  tag: "1.4.2"
service:
  type: ClusterIP
resources:
  requests:
    cpu: 250m
    memory: 256Mi
  limits:
    cpu: 1000m
    memory: 1Gi`,
  commands: [
    { command: "helm list -A", purpose: "Inspect releases", output: "Review installed Helm releases and namespaces." },
    { command: "helm get values payment -n production", purpose: "Inspect release values", output: "replicaCount: 1\nimage.tag: latest\nservice.type: NodePort" },
    { command: "helm show values ./payment-chart", purpose: "Inspect chart defaults", output: "Review configurable replicas, image, service, and resource values." },
    { command: "helm template payment ./payment-chart -f values-production.yaml", purpose: "Render production manifests", output: "Simulated rendering. Actual output depends on the chart and Helm installation." }
  ],
  rootCause: "Production uses development-oriented settings: one replica, a mutable latest image tag, NodePort exposure, and no resource requests or limits.",
  validation: ["replicaCount: 3", "tag:", "1.4.2", "ClusterIP", "resources:", "requests:", "limits:"],
  recovery: "Use environment-specific production values, a fixed image version, appropriate service exposure, and resource requests and limits. Render and review manifests before upgrading.",
  prevention: ["Maintain separate values files per environment.", "Pin image versions.", "Review rendered manifests before production upgrades."],
  assessment: ["Identify unsafe production values.", "Select a stable image tag.", "Configure replicas and resources.", "Explain Helm rendering validation."]
} as const;