const howItWorks = {
  description: "Understand how DevOps tools operate internally and how they work together in an application delivery process.",
  sections: [
    {
      heading: "1. How a CI/CD Pipeline Works",
      explanation: "Continuous Integration automatically builds and tests code changes. Continuous Delivery or Deployment prepares or releases validated application changes. Jenkins or GitHub Actions can automate these stages.",
      steps: [
        "A developer writes or updates application code.",
        "The developer commits and pushes changes to GitHub.",
        "A webhook or pipeline trigger starts the CI/CD pipeline.",
        "The pipeline checks out the source code.",
        "Dependencies are installed and the application is built.",
        "Automated tests check application functionality.",
        "Docker builds an image and pushes it to a container registry.",
        "The deployment stage releases the application to the target environment.",
        "Monitoring checks application health after deployment."
      ],
      commands: "git status\ngit add .\ngit commit -m \"Update application\"\ngit push origin main",
      config: "pipeline {\n  agent any\n  stages {\n    stage('Checkout') {\n      steps {\n        git branch: 'main',\n          url: 'https://github.com/USERNAME/REPOSITORY.git'\n      }\n    }\n    stage('Build') {\n      steps {\n        sh 'npm ci'\n        sh 'npm run build'\n      }\n    }\n    stage('Test') {\n      steps {\n        sh 'npm test'\n      }\n    }\n  }\n}",
      problems: [
        { issue: "Pipeline does not start after GitHub push.", solution: "Check webhook delivery, Jenkins connectivity, job trigger configuration and branch settings." },
        { issue: "Build fails because dependencies are missing.", solution: "Check package.json, lock files, runtime versions and dependency installation logs." },
        { issue: "Deployment fails after a successful build.", solution: "Check deployment credentials, server access, environment variables and application logs." }
      ]
    },
    {
      heading: "2. How Docker Images and Containers Work",
      explanation: "A Docker image is a packaged template containing application files, dependencies and runtime instructions. A container is a running instance of an image. A Dockerfile defines how the image is built.",
      steps: [
        "Create a Dockerfile in the application directory.",
        "Select a suitable base image.",
        "Copy application files and install dependencies.",
        "Build the image using docker build.",
        "Start a container using docker run.",
        "Check container status and application logs.",
        "Tag and push the image to a registry."
      ],
      commands: "docker build -t myapp:v1 .\ndocker images\ndocker run -d --name myapp -p 3000:3000 myapp:v1\ndocker ps\ndocker logs myapp\ndocker stop myapp",
      config: "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\nEXPOSE 3000\nCMD [\"npm\", \"start\"]",
      problems: [
        { issue: "Docker build fails.", solution: "Check Dockerfile syntax, build context, COPY paths, dependencies and build logs." },
        { issue: "Container exits immediately.", solution: "Run docker logs CONTAINER_NAME and check the configured startup command." },
        { issue: "Application is not reachable.", solution: "Check port mapping, application listening address, container status and firewall rules." }
      ]
    },
    {
      heading: "3. How Kubernetes Deployments Work",
      explanation: "Kubernetes manages containerized applications. A Deployment maintains the desired number of Pods and manages updates. A Service provides a stable network endpoint for selected Pods.",
      steps: [
        "Build the application image and push it to a registry.",
        "Create a Kubernetes Deployment YAML file.",
        "Apply the YAML using kubectl.",
        "Kubernetes schedules Pods on available worker nodes.",
        "A Service routes traffic to matching Pods.",
        "Check rollout status and application health."
      ],
      commands: "kubectl apply -f deployment.yaml\nkubectl get deployments\nkubectl get pods -o wide\nkubectl describe pod POD_NAME\nkubectl rollout status deployment/myapp\nkubectl get services",
      config: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: myapp\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: myapp\n  template:\n    metadata:\n      labels:\n        app: myapp\n    spec:\n      containers:\n        - name: myapp\n          image: nginx:1.27\n          ports:\n            - containerPort: 80",
      problems: [
        { issue: "Pod is in ImagePullBackOff.", solution: "Check image name, tag, registry access and imagePullSecrets." },
        { issue: "Pod is stuck in Pending.", solution: "Run kubectl describe pod and inspect scheduling events, resource requests and node capacity." },
        { issue: "Service cannot reach Pods.", solution: "Compare Service selectors with Pod labels and verify targetPort and container port." }
      ]
    }
  ]
};

export default howItWorks;
