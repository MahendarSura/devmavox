const data = {
  title: "DevOps Root Causes",
  description: "Go beyond error messages. Learn how to identify the underlying causes of deployment failures, infrastructure problems and production incidents.",
  sections: [
    {
      heading: "1. Resource Exhaustion",
      explanation: "CPU, memory, disk and connection limits can cause applications to slow down or fail. A symptom such as OOMKilled may be caused by a memory leak, an undersized limit or unexpectedly high traffic.",
      steps: [
        "Identify when the incident started.",
        "Check CPU, memory and disk metrics.",
        "Compare current usage with configured requests and limits.",
        "Inspect application logs and recent traffic changes.",
        "Determine whether the cause is a leak, capacity issue or workload spike."
      ],
      commands: "kubectl top nodes\nkubectl top pods -A\ndf -h\nfree -m\nuptime\ndocker stats",
      config: "resources:\n  requests:\n    cpu: 100m\n    memory: 128Mi\n  limits:\n    cpu: 500m\n    memory: 512Mi",
      problems: [
        { issue: "Pods repeatedly become OOMKilled.", solution: "Check memory usage over time, application heap behavior and memory limits. Fix leaks or right-size resources based on measured usage." },
        { issue: "Node reports DiskPressure.", solution: "Inspect disk usage, container logs, images and ephemeral storage. Clean up safely using the platform's supported procedures." }
      ]
    },
    {
      heading: "2. Network and DNS Failures",
      explanation: "Connectivity issues can originate from DNS records, routing, firewalls, security groups, NetworkPolicies, load balancers or incorrect service ports.",
      steps: [
        "Confirm the failing source and destination.",
        "Test name resolution.",
        "Test network connectivity and service ports.",
        "Inspect routing, firewall and security group rules.",
        "Check Kubernetes Service selectors and endpoints.",
        "Compare the failing path with a working path."
      ],
      commands: "nslookup example.com\ncurl -Iv https://example.com\nip route\nkubectl get services -A\nkubectl get endpoints -A\nkubectl get networkpolicies -A",
      config: "apiVersion: v1\nkind: Service\nmetadata:\n  name: web\nspec:\n  selector:\n    app: web\n  ports:\n    - port: 80\n      targetPort: 8080",
      problems: [
        { issue: "DNS resolves to an incorrect address.", solution: "Check DNS records, resolver configuration, caching and the intended hostname." },
        { issue: "Service has no endpoints.", solution: "Check Pod labels, Service selectors, readiness state and namespace." },
        { issue: "Application works internally but not externally.", solution: "Inspect Ingress, load balancer health checks, firewall rules and public routing." }
      ]
    },
    {
      heading: "3. Configuration and Dependency Failures",
      explanation: "Applications can fail when environment variables, secrets, configuration files, dependency versions or external services do not match the expected setup.",
      steps: [
        "Compare the working and failing environment configurations.",
        "Check required environment variable names without printing secret values.",
        "Verify secret and ConfigMap references.",
        "Check dependency availability and version compatibility.",
        "Inspect recent configuration changes.",
        "Test the application with a known-good configuration."
      ],
      commands: "kubectl describe pod POD_NAME\nkubectl get configmaps -n NAMESPACE\nkubectl get secrets -n NAMESPACE\nkubectl logs POD_NAME -n NAMESPACE",
      config: "env:\n  - name: APP_ENV\n    value: production\n  - name: DATABASE_URL\n    valueFrom:\n      secretKeyRef:\n        name: database-secret\n        key: url",
      problems: [
        { issue: "CreateContainerConfigError.", solution: "Check referenced ConfigMaps, Secrets, keys and namespace." },
        { issue: "Application cannot connect to database.", solution: "Verify DNS, network access, database availability, credentials and connection settings." },
        { issue: "New release fails after dependency update.", solution: "Review lock-file changes, compatibility requirements and build/test results; revert or pin a verified version if necessary." }
      ]
    }
  ]
};
export default data;
