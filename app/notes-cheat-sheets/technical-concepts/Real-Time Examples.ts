const realTimeExamples = {
  description: "Follow practical DevOps scenarios from source code to production. These examples show the workflow, commands and troubleshooting steps used by engineers.",
  sections: [
    {
      heading: "1. Deploy a Web Application",
      explanation: "Scenario: A team has a Node.js application in GitHub and wants to deploy it as a Docker container. The workflow builds the application, creates an image and starts a container.",
      steps: [
        "Clone the application repository.",
        "Install dependencies and build the application.",
        "Create a Dockerfile suited to the application.",
        "Build the Docker image.",
        "Run the container with the required port mapping.",
        "Verify the application using a browser or curl.",
        "Push the image to a registry for deployment."
      ],
      commands: "git clone https://github.com/USERNAME/REPOSITORY.git\ncd REPOSITORY\nnpm ci\nnpm run build\ndocker build -t myapp:v1 .\ndocker run -d --name myapp -p 3000:3000 myapp:v1\ncurl http://localhost:3000",
      config: "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\nEXPOSE 3000\nCMD [\"npm\", \"start\"]",
      problems: [
        { issue: "npm run build fails.", solution: "Read the first actual build error, verify Node.js version and dependencies, then fix application or TypeScript errors." },
        { issue: "Docker reports port already allocated.", solution: "Choose another host port or stop the process/container already using that port." },
        { issue: "Browser cannot open the application.", solution: "Check container status, logs, port mapping and whether the app listens on 0.0.0.0 inside the container." }
      ]
    },
    {
      heading: "2. Scale an Application in Kubernetes",
      explanation: "Scenario: Application traffic increases. The team increases the number of Pod replicas so Kubernetes can run more application instances.",
      steps: [
        "Check the current Deployment and Pod count.",
        "Increase the replica count.",
        "Watch Kubernetes create additional Pods.",
        "Verify that all replicas become Ready.",
        "Confirm the Service selects the new Pods.",
        "Monitor resource usage and application performance."
      ],
      commands: "kubectl get deployment myapp\nkubectl scale deployment myapp --replicas=5\nkubectl get pods -l app=myapp\nkubectl rollout status deployment/myapp\nkubectl get endpoints myapp-service",
      config: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: myapp\nspec:\n  replicas: 5\n  selector:\n    matchLabels:\n      app: myapp\n  template:\n    metadata:\n      labels:\n        app: myapp\n    spec:\n      containers:\n        - name: myapp\n          image: nginx:1.27\n          resources:\n            requests:\n              cpu: 100m\n              memory: 128Mi\n            limits:\n              cpu: 500m\n              memory: 256Mi",
      problems: [
        { issue: "New Pods remain Pending.", solution: "Inspect kubectl describe pod output and check available CPU, memory, node capacity and scheduling constraints." },
        { issue: "Some Pods are not Ready.", solution: "Check readiness probes, container logs, application startup and dependency availability." },
        { issue: "Scaling does not improve response time.", solution: "Check database bottlenecks, CPU limits, load balancing and application concurrency." }
      ]
    },
    {
      heading: "3. Roll Back a Failed Deployment",
      explanation: "Scenario: A new release causes production errors. Kubernetes Deployment rollout history can help the team return to a previous ReplicaSet revision.",
      steps: [
        "Check the Deployment rollout status.",
        "Inspect current Pods and application logs.",
        "Review the rollout history.",
        "Identify the last known good revision.",
        "Undo the failed rollout.",
        "Verify that the previous version becomes Ready.",
        "Test the application and investigate the failed release."
      ],
      commands: "kubectl rollout status deployment/myapp\nkubectl rollout history deployment/myapp\nkubectl rollout undo deployment/myapp\nkubectl get pods\nkubectl rollout status deployment/myapp\nkubectl describe deployment myapp",
      config: "spec:\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0",
      problems: [
        { issue: "Rollback does not restore application health.", solution: "Check whether the previous image is available and whether external configuration or database changes also caused the failure." },
        { issue: "Old Pods remain in an error state.", solution: "Inspect ReplicaSets, Pod events and logs. Confirm Deployment selectors and replica count." },
        { issue: "The faulty release is deployed again.", solution: "Fix the source or pipeline configuration and use a new verified image tag before deploying again." }
      ]
    }
  ]
};

export default realTimeExamples;
