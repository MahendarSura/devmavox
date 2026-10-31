const data = {
  title: "DevOps Interview Q&A",
  description: "Prepare for practical DevOps interviews with clear answers, technical explanations and command-based examples.",
  sections: [
    {
      heading: "1. Linux and Git Interview Questions",
      explanation: "Interviewers often check whether candidates can operate Linux systems, investigate processes and use Git safely in team workflows.",
      steps: [
        "Q: What is a Linux process? A: A running instance of a program with its own process ID.",
        "Q: How do you check disk usage? A: Use df -h for filesystems and du -sh for directory size.",
        "Q: What is Git? A: A distributed version control system for tracking source code changes.",
        "Q: What is the difference between fetch and pull? A: Fetch downloads remote changes; pull fetches and integrates them.",
        "Q: What is a merge conflict? A: A conflict that requires manual resolution when changes cannot be automatically combined."
      ],
      commands: "ps aux\ntop\ndf -h\ndu -sh /var/log\ngit status\ngit fetch origin\ngit pull origin main\ngit log --oneline",
      config: "A typical Git workflow:\n1. git checkout -b feature/update\n2. Make code changes\n3. git add .\n4. git commit -m \"Add feature\"\n5. git push origin feature/update\n6. Open a pull request for review",
      problems: [
        { issue: "How do you investigate a high CPU process?", solution: "Use top or ps to identify the process, inspect its logs and workload, and determine whether it is expected or abnormal." },
        { issue: "How do you resolve a merge conflict?", solution: "Inspect conflicted files, resolve the intended content, test it and commit the resolution." }
      ]
    },
    {
      heading: "2. Docker and Kubernetes Interview Questions",
      explanation: "Docker questions focus on images, containers, networking and storage. Kubernetes questions focus on Pods, Deployments, Services, scheduling and health management.",
      steps: [
        "Q: What is a Docker image? A: An immutable template used to create containers.",
        "Q: What is a container? A: An isolated running instance of an image.",
        "Q: What is a Docker volume? A: Persistent storage managed by Docker.",
        "Q: What is a Kubernetes Pod? A: The smallest deployable Kubernetes unit, containing one or more containers.",
        "Q: What is a Deployment? A: A controller that manages replica sets and application rollout.",
        "Q: What is a Service? A: A stable network endpoint for accessing selected Pods."
      ],
      commands: "docker build -t app:v1 .\ndocker ps -a\ndocker logs CONTAINER_NAME\nkubectl get pods\nkubectl get deployments\nkubectl get services\nkubectl describe pod POD_NAME",
      config: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: interview-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: interview-app\n  template:\n    metadata:\n      labels:\n        app: interview-app\n    spec:\n      containers:\n        - name: app\n          image: nginx:1.27",
      problems: [
        { issue: "How do you troubleshoot CrashLoopBackOff?", solution: "Inspect Pod events, current and previous logs, startup command, probes, configuration and resource limits." },
        { issue: "How do you expose an application in Kubernetes?", solution: "Use a Service for stable internal or external access, and Ingress or a Gateway for HTTP routing where configured." }
      ]
    },
    {
      heading: "3. CI/CD, AWS and Terraform Interview Questions",
      explanation: "These topics test automation, cloud infrastructure knowledge, deployment safety and infrastructure-as-code practices.",
      steps: [
        "Q: What is CI? A: Automatically integrating and validating code changes.",
        "Q: What is CD? A: Automating delivery or deployment of validated changes.",
        "Q: What is Terraform? A: An infrastructure-as-code tool for defining and managing infrastructure.",
        "Q: What is an AWS VPC? A: A logically isolated virtual network in AWS.",
        "Q: What is IAM? A: AWS identity and access management for controlling permissions.",
        "Q: Why is Terraform state important? A: It maps configuration to managed infrastructure resources."
      ],
      commands: "terraform init\nterraform fmt\nterraform validate\nterraform plan\nterraform apply\naws sts get-caller-identity\naws s3 ls",
      config: "terraform {\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n  }\n}\nprovider \"aws\" {\n  region = \"ap-south-1\"\n}",
      problems: [
        { issue: "How do you secure a CI/CD pipeline?", solution: "Use least-privilege credentials, secret stores, protected branches, dependency scanning and approval controls." },
        { issue: "What do you do before terraform apply?", solution: "Review the plan, confirm the target workspace and account, check destructive changes and obtain required approvals." }
      ]
    }
  ]
};
export default data;
