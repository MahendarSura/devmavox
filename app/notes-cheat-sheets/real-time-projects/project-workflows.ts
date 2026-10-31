const data = {
  title: "Real-Time Project Workflows",
  description: "Follow end-to-end DevOps project workflows that connect source code, infrastructure, containers, deployment and monitoring.",
  sections: [
    {
      heading: "1. Three-Tier Application Deployment",
      explanation: "A typical three-tier application contains a frontend, backend API and database. Each tier has its own configuration, scaling and network requirements.",
      steps: [
        "Create separate frontend, backend and database components.",
        "Store source code and configuration in version control.",
        "Build and test frontend and backend artifacts.",
        "Package application components into container images.",
        "Deploy services into the target environment.",
        "Configure network access between application tiers.",
        "Monitor health, latency and database connections."
      ],
      commands: "docker compose config\ndocker compose up -d\ndocker compose ps\ndocker compose logs",
      config: "services:\n  frontend:\n    image: my-frontend:v1\n    ports:\n      - \"8080:80\"\n    depends_on:\n      - backend\n  backend:\n    image: my-backend:v1\n    environment:\n      DATABASE_HOST: database\n  database:\n    image: postgres:16\n    volumes:\n      - db-data:/var/lib/postgresql/data\nvolumes:\n  db-data:",
      problems: [
        { issue: "Frontend cannot call backend.", solution: "Check service DNS, API URL, ports, network membership and browser CORS configuration." },
        { issue: "Backend cannot connect to database.", solution: "Check database readiness, service hostname, credentials, port and network access." }
      ]
    },
    {
      heading: "2. Kubernetes Application Delivery",
      explanation: "A Kubernetes project typically includes a Deployment, Service, configuration resources, health probes and optionally an Ingress or Gateway for external access.",
      steps: [
        "Build and tag a versioned application image.",
        "Push the image to a registry.",
        "Create Kubernetes manifests.",
        "Apply configuration and workload resources.",
        "Verify Pod readiness and Service endpoints.",
        "Configure external routing if required.",
        "Monitor rollout and application health."
      ],
      commands: "docker build -t REGISTRY/myapp:v1 .\ndocker push REGISTRY/myapp:v1\nkubectl apply -f k8s/\nkubectl get pods -o wide\nkubectl get services\nkubectl rollout status deployment/myapp",
      config: "apiVersion: v1\nkind: Service\nmetadata:\n  name: myapp\nspec:\n  selector:\n    app: myapp\n  ports:\n    - port: 80\n      targetPort: 8080\n  type: ClusterIP",
      problems: [
        { issue: "Deployment does not become Ready.", solution: "Inspect Pod events, image availability, startup logs, probes and resource settings." },
        { issue: "Traffic does not reach the application.", solution: "Check Service selectors, endpoints, targetPort and ingress or gateway routing." }
      ]
    },
    {
      heading: "3. Monitoring and Incident Response Workflow",
      explanation: "Production operations require monitoring and a repeatable response process. Metrics, logs and alerts help engineers detect problems and restore service.",
      steps: [
        "Expose application and infrastructure metrics.",
        "Collect metrics using a monitoring system.",
        "Create dashboards for service health and performance.",
        "Define alert thresholds based on service objectives.",
        "Investigate alerts using logs, metrics and recent changes.",
        "Mitigate the issue and verify recovery.",
        "Document the incident and preventive actions."
      ],
      commands: "kubectl get pods -A\nkubectl top nodes\nkubectl top pods -A\nkubectl logs POD_NAME\nkubectl get events -A --sort-by=.metadata.creationTimestamp",
      config: "Example monitoring signals:\nAvailability - Successful requests / total requests\nLatency - Request response time\nErrors - Failed requests / total requests\nSaturation - CPU, memory and queue pressure",
      problems: [
        { issue: "Too many noisy alerts.", solution: "Tune thresholds, group related alerts and alert on user-impacting symptoms where possible." },
        { issue: "Incident has no clear owner.", solution: "Define escalation paths, service ownership and incident roles before production incidents occur." }
      ]
    }
  ]
};
export default data;
