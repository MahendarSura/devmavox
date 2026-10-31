const architectureFlow = {
  description: "Learn how developers, source control, CI/CD tools, registries, Kubernetes, networking and monitoring connect in a production environment.",
  sections: [
    {
      heading: "1. End-to-End CI/CD Architecture",
      explanation: "A CI/CD architecture moves application code from a developer workstation to a running application. Git stores source code, Jenkins builds and tests it, a registry stores images, and the deployment platform runs them.",
      steps: [
        "Developer writes and tests code locally.",
        "Code is pushed to a Git repository.",
        "A webhook notifies the CI server.",
        "The CI server checks out code and runs build and test stages.",
        "The pipeline creates a versioned Docker image.",
        "The image is pushed to a container registry.",
        "The deployment system updates the application environment.",
        "Monitoring checks availability, latency and errors."
      ],
      commands: "git push origin main\ndocker build -t myapp:v1 .\ndocker tag myapp:v1 REGISTRY/myapp:v1\ndocker push REGISTRY/myapp:v1",
      config: "Developer\n   |\n   v\nGit Repository\n   |\n   v\nJenkins CI Pipeline\n   |\n   +--> Build and Test\n   |\n   v\nDocker Image\n   |\n   v\nContainer Registry\n   |\n   v\nKubernetes Deployment\n   |\n   v\nMonitoring and Alerts",
      problems: [
        { issue: "CI server cannot clone repository.", solution: "Check repository URL, credentials, network connectivity and branch name." },
        { issue: "Deployment uses an old image.", solution: "Use unique image tags and verify the tag in the Deployment manifest." },
        { issue: "Application is deployed but unavailable.", solution: "Check Pod readiness, Service endpoints, Ingress rules and application logs." }
      ]
    },
    {
      heading: "2. Kubernetes Cluster Architecture",
      explanation: "A Kubernetes cluster contains a control plane and worker nodes. The control plane manages cluster state and scheduling. Worker nodes run application Pods through a container runtime.",
      steps: [
        "The user submits a manifest using kubectl.",
        "The API server receives and validates the request.",
        "Cluster state is stored in etcd.",
        "The scheduler selects a suitable worker node.",
        "The kubelet ensures the Pod is running on that node.",
        "The container runtime starts the containers.",
        "Services provide stable network access to application Pods."
      ],
      commands: "kubectl get nodes\nkubectl get pods -A\nkubectl get deployments\nkubectl get services\nkubectl describe node NODE_NAME\nkubectl get events --sort-by=.metadata.creationTimestamp",
      config: "apiVersion: v1\nkind: Service\nmetadata:\n  name: myapp-service\nspec:\n  selector:\n    app: myapp\n  ports:\n    - protocol: TCP\n      port: 80\n      targetPort: 80\n  type: ClusterIP",
      problems: [
        { issue: "Worker node becomes NotReady.", solution: "Inspect node conditions, kubelet status, disk pressure, memory pressure and network connectivity." },
        { issue: "Pods are not scheduled.", solution: "Check node resources, taints, tolerations, affinity rules and scheduling events." },
        { issue: "Service has no endpoints.", solution: "Verify that Service selectors match labels on ready Pods." }
      ]
    },
    {
      heading: "3. Monitoring and Alerting Architecture",
      explanation: "Monitoring collects infrastructure and application metrics. Prometheus commonly scrapes metrics, Grafana visualizes them, and alerting rules notify teams when defined conditions occur.",
      steps: [
        "Applications and servers expose metrics.",
        "Prometheus scrapes configured metric endpoints.",
        "Prometheus stores time-series metrics.",
        "Grafana queries Prometheus and displays dashboards.",
        "Alert rules evaluate metric conditions.",
        "The alerting system sends notifications.",
        "Engineers investigate and resolve incidents."
      ],
      commands: "kubectl get pods -n monitoring\nkubectl get services -n monitoring\nkubectl logs POD_NAME -n monitoring\nkubectl describe pod POD_NAME -n monitoring",
      config: "Prometheus --> Collects metrics\n     |\n     v\nTime-series storage\n     |\n     v\nGrafana dashboards\n     |\n     v\nAlert rules\n     |\n     v\nNotification to DevOps team",
      problems: [
        { issue: "Prometheus target is DOWN.", solution: "Check endpoint, scrape configuration, labels, network access and metrics endpoint." },
        { issue: "Grafana dashboard shows no data.", solution: "Verify Prometheus data source, query, time range and metric availability." },
        { issue: "Alerts are not delivered.", solution: "Check alert rule state, notification policies, contact points and alerting logs." }
      ]
    }
  ]
};

export default architectureFlow;
