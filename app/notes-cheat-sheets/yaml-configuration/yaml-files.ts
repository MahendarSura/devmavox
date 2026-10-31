const data = {
  title: "YAML Files",
  description: "Learn YAML syntax and the structure of Kubernetes manifests, Docker Compose files, Jenkins pipelines, GitHub Actions workflows and infrastructure configuration.",
  sections: [
    {
      heading: "1. YAML Fundamentals",
      explanation: "YAML is a human-readable data serialization format. It uses indentation to represent structure. Spaces matter; tabs should not be used for indentation. Key-value pairs, lists and nested objects are common YAML structures.",
      steps: [
        "Use key: value for a simple mapping.",
        "Use a dash to define each list item.",
        "Use consistent spaces for nested values.",
        "Quote strings when special characters or ambiguity require it.",
        "Validate YAML before applying it to production."
      ],
      commands: "python -c \"import yaml; yaml.safe_load(open('file.yaml'))\"\nyamllint file.yaml",
      config: "application:\n  name: myapp\n  environment: production\n  replicas: 2\n  ports:\n    - 3000\n    - 8080\n  enabled: true",
      problems: [
        { issue: "YAML parser reports a mapping or indentation error.", solution: "Check indentation, missing colons, inconsistent spaces and list item alignment." },
        { issue: "A value is interpreted as a boolean or number.", solution: "Quote values that must remain strings, such as version identifiers or special words." }
      ]
    },
    {
      heading: "2. Kubernetes YAML Manifests",
      explanation: "Kubernetes manifests describe desired cluster resources. Common fields include apiVersion, kind, metadata and spec. A Deployment manages Pods, while a Service provides network access.",
      steps: [
        "Choose the correct API version and resource kind.",
        "Give the resource a meaningful metadata name.",
        "Define desired replicas and Pod labels.",
        "Make Deployment selectors match Pod template labels.",
        "Define container images, ports and resources.",
        "Validate and apply the manifest."
      ],
      commands: "kubectl apply --dry-run=client -f deployment.yaml\nkubectl apply -f deployment.yaml\nkubectl get deployment\nkubectl get pods\nkubectl describe deployment myapp",
      config: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: myapp\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: myapp\n  template:\n    metadata:\n      labels:\n        app: myapp\n    spec:\n      containers:\n        - name: web\n          image: nginx:1.27\n          ports:\n            - containerPort: 80",
      problems: [
        { issue: "Deployment selector does not match Pod labels.", solution: "Make spec.selector.matchLabels exactly match spec.template.metadata.labels." },
        { issue: "ImagePullBackOff occurs.", solution: "Verify image repository, tag, registry authentication and imagePullSecrets." },
        { issue: "Manifest is rejected by the API server.", solution: "Check API version, field names, resource schema and kubectl validation output." }
      ]
    },
    {
      heading: "3. Docker Compose YAML",
      explanation: "Docker Compose defines multiple containers and their configuration in one YAML file. It can define services, networks, volumes, ports, environment variables and dependencies.",
      steps: [
        "Define each application component under services.",
        "Set the correct image or build context.",
        "Map required ports.",
        "Use volumes for persistent data.",
        "Configure environment variables securely.",
        "Start the application stack and inspect service status."
      ],
      commands: "docker compose config\ndocker compose up -d\ndocker compose ps\ndocker compose logs\ndocker compose down",
      config: "services:\n  web:\n    image: nginx:1.27\n    ports:\n      - \"8080:80\"\n    depends_on:\n      - api\n  api:\n    image: myapi:latest\n    environment:\n      APP_ENV: production",
      problems: [
        { issue: "Compose reports invalid YAML.", solution: "Check indentation, list syntax, quoting and the output of docker compose config." },
        { issue: "A service cannot connect to another service.", solution: "Use the Compose service name as the hostname and verify that both services share a network." },
        { issue: "Container data disappears after recreation.", solution: "Use a named volume or bind mount for data that must persist." }
      ]
    }
  ]
};
export default data;
