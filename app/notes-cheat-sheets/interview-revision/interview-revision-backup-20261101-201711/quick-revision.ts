const data = {
  title: "Quick DevOps Revision",
  description: "A compact revision guide for important commands, concepts and workflows across Linux, Git, Docker, Kubernetes, AWS and CI/CD.",
  sections: [
    {
      heading: "1. Linux and Git Quick Reference",
      explanation: "Linux commands help inspect files, processes, permissions and resources. Git commands help track changes and collaborate through branches and remote repositories.",
      steps: [
        "pwd displays the current directory.",
        "ls -la lists files, including hidden files.",
        "chmod changes file permissions.",
        "systemctl checks or manages services.",
        "git status shows working tree changes.",
        "git branch lists branches.",
        "git merge combines branch histories."
      ],
      commands: "pwd\nls -la\nchmod 755 script.sh\nsystemctl status nginx\ngit status\ngit branch\ngit switch main\ngit merge feature",
      config: "Common Git lifecycle:\nWorking directory\n      |\n      v\ngit add\n      |\n      v\nStaging area\n      |\n      v\ngit commit\n      |\n      v\nLocal repository\n      |\n      v\ngit push\n      |\n      v\nRemote repository",
      problems: [
        { issue: "Permission denied.", solution: "Check ownership and permissions with ls -l and id before changing permissions." },
        { issue: "Git push is rejected.", solution: "Fetch remote changes, integrate them safely and push again." }
      ]
    },
    {
      heading: "2. Docker and Kubernetes Quick Reference",
      explanation: "Docker packages and runs containers. Kubernetes orchestrates containers across cluster nodes and maintains the desired application state.",
      steps: [
        "Dockerfile defines image build instructions.",
        "docker build creates an image.",
        "docker run starts a container.",
        "A Pod runs one or more containers.",
        "A Deployment manages replicas and rollouts.",
        "A Service provides stable access to Pods.",
        "ConfigMaps and Secrets provide configuration."
      ],
      commands: "docker build -t app:v1 .\ndocker run -d -p 8080:80 app:v1\ndocker logs CONTAINER_NAME\nkubectl get pods -A\nkubectl apply -f deployment.yaml\nkubectl rollout status deployment/app\nkubectl rollout undo deployment/app",
      config: "Useful Kubernetes objects:\nDeployment - Manages application replicas\nService - Provides stable networking\nConfigMap - Stores non-sensitive configuration\nSecret - Stores sensitive configuration data\nIngress - Routes HTTP/HTTPS traffic",
      problems: [
        { issue: "ImagePullBackOff.", solution: "Check image reference, tag and registry access." },
        { issue: "Pending Pod.", solution: "Inspect events and scheduling requirements." }
      ]
    },
    {
      heading: "3. AWS, Terraform and CI/CD Quick Reference",
      explanation: "AWS provides cloud infrastructure, Terraform defines infrastructure as code, and CI/CD automates the process of building, testing and releasing application changes.",
      steps: [
        "IAM controls identity and permissions.",
        "VPC provides isolated networking.",
        "EC2 provides virtual compute instances.",
        "S3 provides object storage.",
        "Terraform init downloads providers and initializes the working directory.",
        "Terraform plan previews changes.",
        "CI/CD validates and deploys application changes."
      ],
      commands: "aws sts get-caller-identity\naws configure list\nterraform init\nterraform fmt\nterraform validate\nterraform plan\nterraform apply",
      config: "Typical delivery sequence:\nDeveloper -> Git -> CI pipeline\n-> Build -> Test -> Docker image\n-> Registry -> Deployment -> Monitoring",
      problems: [
        { issue: "AWS AccessDenied.", solution: "Check the identity in use and the IAM policy permissions required for the operation." },
        { issue: "Terraform plan shows unexpected changes.", solution: "Check state, provider versions, workspace and actual infrastructure before applying." }
      ]
    }
  ]
};
export default data;
