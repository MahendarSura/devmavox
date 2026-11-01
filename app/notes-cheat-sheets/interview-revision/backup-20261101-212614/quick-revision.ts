const data = {
  "title": "DevOps Quick Revision",
  "description": "Easy-English revision notes for 18 DevOps tools. Understand each tool's purpose, architecture, workflow, important commands, configuration and common production problems.",
  "sections": [
    {
      "heading": "AWS - Complete Quick Revision",
      "explanation": "## What is AWS?\nAWS is a cloud platform. Instead of buying physical servers, companies rent computing, storage, networking and database services. A DevOps engineer uses AWS to build, deploy, secure and monitor applications.\n\n## Architecture to Remember\nA common production architecture uses Route 53 for DNS, an Application Load Balancer for incoming HTTP traffic, EC2 instances in private subnets, an Auto Scaling Group for capacity, RDS for database storage and S3 for files. CloudWatch collects metrics and logs. IAM controls access.\n\n## Real-Time Workflow\nDeveloper pushes code to Git. CI builds and tests the application. The pipeline creates an artifact or container image and stores it in a registry. CD deploys it to EC2 or EKS. The load balancer sends user traffic to healthy targets. CloudWatch monitors the application.\n\n## Important Technical Points\nCreate a VPC with public and private subnets in at least two Availability Zones. Place the load balancer in public subnets and application servers in private subnets. Use an Auto Scaling Group to replace unhealthy instances and increase capacity. Use Multi-AZ RDS when database availability is required. Store uploaded files in S3 instead of local server disks. Attach IAM roles instead of storing access keys on servers. Enable monitoring, encryption, backups and tested recovery.\n\n## Common Production Issues\nALB returns 502 or 503: check target health, application port, health-check path, security groups and application logs. EC2 cannot reach the internet: check private subnet route table, NAT Gateway, DNS and security rules. AccessDenied: verify the attached IAM role and policy. High cost: inspect idle instances, unattached disks, NAT traffic, snapshots and data transfer.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "aws sts get-caller-identity\naws ec2 describe-instances\naws s3 ls\naws elbv2 describe-target-health --target-group-arn <arn>\naws cloudwatch describe-alarms",
      "config": "Example EC2 instance role policy idea:\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Action\": [\"s3:GetObject\"],\n    \"Resource\": [\"arn:aws:s3:::company-app-config/*\"]\n  }]\n}\nThis allows reading only objects from the specified bucket path. Use the smallest permissions required.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Linux - Complete Quick Revision",
      "explanation": "## What is Linux?\nLinux is an operating system widely used on cloud servers. DevOps engineers use Linux to run applications, manage services, configure networking, control permissions, inspect logs and automate tasks.\n\n## Architecture to Remember\nThe Linux kernel manages CPU, memory, processes, devices and networking. User applications run in user space. systemd manages services on many distributions. Filesystems store data, while logs record system and application activity.\n\n## Real-Time Workflow\nConnect securely to the server. Check system health. Deploy application files with correct ownership and permissions. Configure environment variables and service definitions. Start the service using systemd. Check listening ports and logs. Monitor disk, memory and CPU.\n\n## Important Technical Points\nFirst identify the impact and the deployment time. Check systemctl status to understand the service state. Read journalctl and application logs to find the actual error. Check whether the process exists and whether the expected port is listening. Check disk space, inode usage, memory and file permissions. Validate the configuration before restarting. After the fix, confirm the service is healthy and monitor it.\n\n## Common Production Issues\nPermission denied: inspect owner, group and mode using ls -l and namei -l. Disk full: use df -h and du -sh to find large directories. Service fails: inspect journalctl and application logs. Port already in use: use ss -lntp to identify the process. High memory: inspect top, free and OOM messages in journalctl or dmesg.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "systemctl status <service>\njournalctl -u <service> -n 200 --no-pager\nss -lntp\nps aux\ntop\nfree -h\ndf -h\ndf -i\nls -l",
      "config": "Example systemd service:\n[Unit]\nDescription=Sample Web Application\nAfter=network.target\n\n[Service]\nUser=appuser\nWorkingDirectory=/opt/sample-app\nExecStart=/usr/bin/java -jar app.jar\nRestart=on-failure\n\n[Install]\nWantedBy=multi-user.target\nThis defines how systemd starts and monitors the application.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Git - Complete Quick Revision",
      "explanation": "## What is Git?\nGit is a version-control system. It records code changes so developers can work together, review history, create branches and safely return to earlier versions.\n\n## Architecture to Remember\nA Git repository contains commits, branches, tags and objects. The working tree contains files being edited. The staging area contains changes selected for the next commit. A remote repository such as GitHub stores shared history.\n\n## Real-Time Workflow\nCreate a feature branch. Edit files. Review changes with git diff. Stage selected files. Commit with a meaningful message. Push the branch. Open a pull request. Review, test and merge after approval.\n\n## Important Technical Points\nFirst inspect the commit and understand what it changed. For shared history, use git revert because it creates a new commit that reverses the unwanted change. Run tests and push the revert commit. Avoid git reset on shared branches because it rewrites history and can affect other developers.\n\n## Common Production Issues\nMerge conflict: open the conflicted file, understand both changes, edit the final result, stage it and continue the merge. Accidentally committed a secret: remove it from the repository and rotate the exposed credential; deleting the latest file alone does not remove it from history. Wrong branch: inspect status and log before moving commits.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "git status\ngit log --oneline --graph --decorate -15\ngit diff\ngit show <commit>\ngit branch\ngit switch -c feature/login\ngit add <file>\ngit commit -m \"Add login validation\"\ngit revert <commit>\ngit push",
      "config": "Example .gitignore:\nnode_modules/\n.next/\n.env\n.env.local\ndist/\ncoverage/\nThis prevents generated files and local secrets from being added to the repository.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "GitHub Actions - Complete Quick Revision",
      "explanation": "## What is GitHub Actions?\nGitHub Actions is a CI/CD automation service inside GitHub. It runs workflows when events happen, such as a push, pull request, release or manual trigger.\n\n## Architecture to Remember\nA workflow is a YAML file inside .github/workflows. Events start workflows. Jobs contain steps. Jobs run on GitHub-hosted or self-hosted runners. Artifacts store build outputs, while caches speed up repeated dependency downloads.\n\n## Real-Time Workflow\nA developer pushes code. A workflow checks out the repository, installs dependencies, runs lint and tests, builds the application, stores an artifact and deploys after required approvals.\n\n## Important Technical Points\nConfigure AWS IAM OIDC federation with GitHub. GitHub provides a short-lived identity token. AWS validates the token against a trust policy restricted to the correct repository and branch or environment. The workflow assumes the role and receives temporary credentials. Give that role only the permissions needed for deployment.\n\n## Common Production Issues\nWorkflow does not start: check event filters, branch names and YAML syntax. Job is waiting: inspect runner availability and labels. Secret is unavailable: check repository/environment secret scope and approval rules. Deployment is denied: check OIDC trust conditions and IAM policy. Never print secrets in workflow logs.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "gh workflow list\ngh run list\ngh run view <run-id>\ngh run view <run-id> --log\ngh workflow run <workflow.yml>",
      "config": "Example workflow:\nname: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n      - run: npm ci\n      - run: npm test\n      - run: npm run build\nFor production, pin third-party actions to reviewed commit SHAs and define minimal permissions.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Docker - Complete Quick Revision",
      "explanation": "## What is Docker?\nDocker packages an application and its required libraries into an image. A container is a running instance of that image. This helps an application behave consistently on a developer laptop, test server and production server.\n\n## Architecture to Remember\nA Docker image contains read-only layers. A container adds a writable runtime layer. The Docker daemon manages containers, networks, images and volumes. Registries store and distribute images.\n\n## Real-Time Workflow\nWrite a Dockerfile. Build the image. Run it locally and test it. Tag it with a version. Push it to a registry. Deploy the same image to the target environment. Use health checks, logs and resource limits.\n\n## Important Technical Points\nCheck docker ps -a and inspect the exit code. Read container logs. Inspect the configured entrypoint and command. Confirm required environment variables and mounted files exist. Check file permissions and dependency connectivity. A container normally stops when its main process exits, so the application must run in the foreground.\n\n## Common Production Issues\nContainer exits: inspect logs and PID 1 command. Cannot connect: inspect Docker network, published port and application bind address. Data disappears: use a volume for persistent data. Image is too large: use multi-stage builds and .dockerignore. Permission denied: check container user and mounted-directory ownership.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "docker ps -a\ndocker logs <container>\ndocker inspect <container>\ndocker exec -it <container> sh\ndocker images\ndocker image history <image>\ndocker stats\ndocker network ls\ndocker volume ls",
      "config": "Example Dockerfile:\nFROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\nEXPOSE 3000\nCMD [\"npm\", \"start\"]\nFor production, consider a multi-stage build, non-root user, pinned base image, health check and smaller runtime image.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Kubernetes - Complete Quick Revision",
      "explanation": "## What is Kubernetes?\nKubernetes manages containerized applications across a group of machines. It schedules containers, replaces failed Pods, provides service discovery and supports controlled application updates.\n\n## Architecture to Remember\nThe control plane includes the API server, scheduler, controller manager and cluster state store. Worker nodes run kubelet, a container runtime and networking components. Pods are the smallest deployable units.\n\n## Real-Time Workflow\nBuild and publish an image. Define a Deployment and Service in YAML. Apply the manifests. Kubernetes schedules Pods. Readiness checks decide when Pods receive traffic. Monitor rollout status and logs. Roll back if the release is unhealthy.\n\n## Important Technical Points\nCheck the Ingress controller and its routing rules. Check whether the Service selector matches the Pod labels. Inspect Service endpoints to confirm ready Pods are registered. Verify container ports and readiness probes. Then inspect Pod events, logs, resource limits and NetworkPolicies.\n\n## Common Production Issues\nCrashLoopBackOff: inspect current and previous logs, command, configuration and dependencies. ImagePullBackOff: verify image name, tag and registry credentials. Pending Pod: inspect scheduler events, resources, taints, affinity and storage. Service has no endpoints: compare selectors and labels. OOMKilled: inspect memory usage and limits.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "kubectl get nodes\nkubectl get pods -A\nkubectl get deploy,svc,endpoints -n <namespace>\nkubectl describe pod <pod> -n <namespace>\nkubectl logs <pod> -n <namespace>\nkubectl logs <pod> --previous -n <namespace>\nkubectl get events -n <namespace> --sort-by=.lastTimestamp\nkubectl rollout status deployment/<name> -n <namespace>",
      "config": "Example Deployment:\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n    spec:\n      containers:\n        - name: web\n          image: nginx:1.27\n          ports:\n            - containerPort: 80\n          readinessProbe:\n            httpGet:\n              path: /\n              port: 80\nThis creates three replicas and sends traffic only after readiness succeeds.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "EKS - Complete Quick Revision",
      "explanation": "## What is EKS?\nAmazon EKS is AWS managed Kubernetes. AWS operates the Kubernetes control plane, while the customer manages worker capacity, networking, workloads, permissions and cluster operations.\n\n## Architecture to Remember\nAn EKS cluster has a managed control plane connected to worker nodes or Fargate workloads. The VPC CNI provides Pod networking. IAM controls AWS access, while Kubernetes RBAC controls Kubernetes API permissions. Add-ons provide essential cluster functions.\n\n## Real-Time Workflow\nCreate the VPC and subnets. Create the EKS cluster. Configure managed node groups or Fargate. Configure workload identity. Install required add-ons. Deploy applications using Kubernetes manifests or Helm. Monitor nodes, Pods, networking and control-plane activity.\n\n## Important Technical Points\nFirst confirm which AWS identity the Pod is using. Configure IRSA or EKS Pod Identity for the workload instead of giving broad permissions to every node. Verify the service-account association, trust relationship and S3 policy. Check DNS, network egress and any endpoint policy. Test with the AWS CLI inside a safe diagnostic Pod.\n\n## Common Production Issues\nPod cannot obtain AWS credentials: check workload identity configuration and trust policy. Pods remain Pending: check node capacity, subnet IP availability and scheduling events. DNS failures: inspect CoreDNS and network access. Node NotReady: inspect kubelet, node conditions and CNI health.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "aws eks describe-cluster --name <cluster>\naws eks list-nodegroups --cluster-name <cluster>\naws eks update-kubeconfig --name <cluster>\nkubectl get nodes -o wide\nkubectl get pods -n kube-system\nkubectl describe pod <pod> -n <namespace>",
      "config": "Example service-account annotation for IRSA:\napiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: app-service-account\n  namespace: app\n  annotations:\n    eks.amazonaws.com/role-arn: arn:aws:iam::<account-id>:role/app-s3-role\nThe IAM role trust policy must also allow the matching cluster OIDC provider and service-account subject.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Jenkins - Complete Quick Revision",
      "explanation": "## What is Jenkins?\nJenkins is an automation server used to build, test and deploy applications. A Jenkins pipeline describes the steps needed to move code from source control to a deployable release.\n\n## Architecture to Remember\nThe controller manages jobs, credentials, plugins and scheduling. Agents execute build tasks. Jenkinsfiles define pipeline stages. Credentials are stored in Jenkins credentials management and should be exposed only to the required steps.\n\n## Real-Time Workflow\nA Git webhook starts a pipeline. Jenkins checks out code, installs dependencies, runs tests, builds an artifact or image, scans it, publishes it and deploys to the target environment. Each stage reports success or failure.\n\n## Important Technical Points\nInspect the queue reason and required agent label. Check whether matching agents are online and have free executors. Review agent provisioning, cloud capacity, controller logs and agent connection logs. Check whether a node is temporarily offline or restricted. Do not increase executors blindly when the machine is already overloaded.\n\n## Common Production Issues\nNo executor: check queue and node labels. Agent offline: check network, Java compatibility and agent logs. Pipeline syntax error: validate Jenkinsfile. Plugin issue: check plugin compatibility and controller logs. Secret unavailable: check credential ID and scope. Back up JENKINS_HOME.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "Inspect Manage Jenkins > Build Queue\nInspect Manage Jenkins > Nodes\nReview pipeline Console Output\nCheck controller logs\nCheck agent service and connection logs\nValidate agent labels in Jenkinsfile",
      "config": "Example Declarative Jenkinsfile:\npipeline {\n  agent any\n  stages {\n    stage('Checkout') { steps { checkout scm } }\n    stage('Build') { steps { sh 'mvn clean package' } }\n    stage('Test') { steps { sh 'mvn test' } }\n  }\n}\nUse credentials binding for secrets and move production deployment behind an approval step.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Terraform - Complete Quick Revision",
      "explanation": "## What is Terraform?\nTerraform is an Infrastructure as Code tool. Engineers describe the required infrastructure in configuration files. Terraform compares that configuration with its state and the real environment, then proposes changes.\n\n## Architecture to Remember\nTerraform configuration contains providers, resources, data sources, variables and outputs. State maps configuration resources to real infrastructure. A backend stores state. A locking mechanism prevents unsafe concurrent updates.\n\n## Real-Time Workflow\nWrite configuration. Run terraform fmt and validate. Initialize providers and backend. Review terraform plan. Apply an approved plan. Store state remotely and review changes through version control.\n\n## Important Technical Points\nUse a remote backend with state locking and encryption. Restrict state access because it can contain sensitive values. Run production plans through CI and serialize applies. Require approval for destructive changes. If a lock remains, confirm the owner and whether an operation is still running before taking recovery action.\n\n## Common Production Issues\nUnexpected resource replacement: inspect plan and immutable fields. State lock error: verify lock owner before recovery. Drift: compare plan with actual infrastructure. Provider error: check credentials, region and provider version. Never commit state files or run state commands without understanding their impact.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "terraform init\nterraform fmt -check\nterraform validate\nterraform plan -out=tfplan\nterraform show tfplan\nterraform apply tfplan\nterraform state list\nterraform output",
      "config": "Example variable and resource:\nvariable \"instance_type\" {\n  type    = string\n  default = \"t3.micro\"\n}\nresource \"aws_instance\" \"web\" {\n  ami           = var.ami_id\n  instance_type = var.instance_type\n  tags = { Name = \"dev-web\" }\n}\nDefine ami_id separately and use a reviewed provider version and remote backend.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Ansible - Complete Quick Revision",
      "explanation": "## What is Ansible?\nAnsible automates server configuration and application setup. It connects to managed machines, runs tasks and helps keep systems in the required state.\n\n## Architecture to Remember\nThe control node runs Ansible. Inventory lists managed hosts and groups. Playbooks contain plays and tasks. Modules perform work on remote systems. Roles organize reusable tasks, templates, files, variables and handlers.\n\n## Real-Time Workflow\nCreate inventory. Define variables. Write a playbook using suitable modules. Run syntax checks. Test in check mode or staging. Apply to a limited group first. Verify the result and run again to confirm idempotency.\n\n## Important Technical Points\nA shell or command task may always report changed unless it has suitable creates, removes or changed_when conditions. A template may contain changing timestamps or unstable values. Prefer declarative modules such as package, copy, template and service. Run the playbook twice and confirm the second run reports no unnecessary changes.\n\n## Common Production Issues\nUnreachable host: verify SSH, DNS, port and key. Permission denied: check remote user and become settings. Repeated changed status: inspect command tasks and template values. Wrong variable: check precedence and inventory group membership. Test against a small host group before broad rollout.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "ansible-inventory --graph\nansible all -m ping\nansible-playbook site.yml --syntax-check\nansible-playbook site.yml --check --diff\nansible-playbook site.yml --limit webservers",
      "config": "Example playbook:\n- name: Configure web servers\n  hosts: webservers\n  become: true\n  tasks:\n    - name: Install nginx\n      ansible.builtin.package:\n        name: nginx\n        state: present\n    - name: Ensure nginx is running\n      ansible.builtin.service:\n        name: nginx\n        state: started\n        enabled: true\nUse Ansible Vault for secrets and keep inventory variables organized.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "ArgoCD - Complete Quick Revision",
      "explanation": "## What is ArgoCD?\nArgo CD is a GitOps continuous delivery tool for Kubernetes. It watches the desired application configuration in Git and compares it with the live cluster.\n\n## Architecture to Remember\nThe API server provides the interface. The repository server reads Git repositories and renders manifests. The application controller compares desired and live state and performs reconciliation. Applications connect repositories to destination clusters and namespaces.\n\n## Real-Time Workflow\nStore Kubernetes YAML or Helm charts in Git. Create an Argo CD Application. Argo CD reads the repository and compares it with the cluster. A developer merges a change. Argo CD detects the change and syncs it according to the configured policy.\n\n## Important Technical Points\nOpen the application diff and compare Git manifests with live resources. Identify whether someone changed the cluster manually, a controller changed a field, or Git contains a new desired version. Decide which state is correct. Fix the source in Git and sync through the approved process. Review prune and self-heal settings before enabling them.\n\n## Common Production Issues\nOutOfSync: inspect diff and live drift. Sync failed: inspect repository rendering, permissions, API errors and events. App missing resources: verify path, target revision and namespace. Health degraded: inspect the affected Kubernetes resources and their events.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "argocd app list\nargocd app get <app>\nargocd app diff <app>\nargocd app history <app>\nargocd app sync <app>\nargocd app rollback <app> <revision>",
      "config": "Example Application:\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: web-app\n  namespace: argocd\nspec:\n  source:\n    repoURL: https://github.com/company/platform-config.git\n    targetRevision: main\n    path: apps/web\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: web\n  syncPolicy:\n    automated:\n      prune: false\n      selfHeal: true\nReview automation settings carefully for production.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Helm - Complete Quick Revision",
      "explanation": "## What is Helm?\nHelm is a package manager for Kubernetes. A Helm chart contains templates and default values that can be reused to deploy an application in different environments.\n\n## Architecture to Remember\nA chart contains Chart.yaml, values.yaml and templates. A release is an installed instance of a chart. Helm renders templates using values and sends the resulting Kubernetes resources to the cluster.\n\n## Real-Time Workflow\nCreate or select a chart. Set environment-specific values. Run lint and template checks. Review rendered YAML. Install or upgrade the release. Check rollout and application health. Use release history for controlled rollback.\n\n## Important Technical Points\nRead the exact Kubernetes API error and inspect the rendered manifest. Identify which immutable field changed and why. Plan a supported migration or controlled replacement. Check data persistence, service availability and dependencies. Never delete a stateful resource blindly just to make Helm succeed.\n\n## Common Production Issues\nTemplate rendering error: inspect template syntax and values. Release pending: inspect hooks and Kubernetes events. Immutable field error: plan migration. Wrong environment values: verify the selected values file and command-line overrides. Rollback may not reverse external database changes.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "helm list -A\nhelm lint ./chart\nhelm template <release> ./chart -f values.yaml\nhelm upgrade --install <release> ./chart -n <namespace> -f values.yaml --dry-run\nhelm history <release> -n <namespace>\nhelm rollback <release> <revision> -n <namespace>",
      "config": "Example values.yaml:\nreplicaCount: 3\nimage:\n  repository: nginx\n  tag: \"1.27\"\nservice:\n  type: ClusterIP\n  port: 80\nresources:\n  requests:\n    cpu: 100m\n    memory: 128Mi\nKeep secrets outside plain-text values files and inject them through an approved secret manager.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Prometheus - Complete Quick Revision",
      "explanation": "## What is Prometheus?\nPrometheus collects time-series metrics from applications and infrastructure. Teams use it to understand system health, create alerts and investigate performance problems.\n\n## Architecture to Remember\nPrometheus periodically scrapes metrics endpoints. It stores timestamped samples with labels. PromQL queries the data. Recording rules precompute useful queries. Alerting rules send firing alerts to Alertmanager for routing and notification.\n\n## Real-Time Workflow\nExpose application metrics. Configure scrape targets. Confirm targets are healthy. Build PromQL queries. Create recording and alerting rules. Route alerts through Alertmanager. Review retention and storage capacity.\n\n## Important Technical Points\nRead the exact scrape error on the Targets page. Test the metrics endpoint from the Prometheus network context. Check DNS, routing, firewall rules, port, metrics path, TLS, authentication and exporter health. Verify service discovery and relabeling have not removed the target.\n\n## Common Production Issues\nTarget DOWN: inspect scrape error and network path. No data: verify metric name, labels, time range and scrape status. High memory: inspect retention, series count and cardinality. Alert noise: improve expression, duration, severity and routing. Avoid labels containing user IDs or request IDs.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "Query: up\nQuery: rate(http_requests_total[5m])\nQuery: sum by (status) (rate(http_requests_total[5m]))\nInspect Prometheus /targets\nInspect Prometheus /rules\nCheck Prometheus and exporter logs",
      "config": "Example scrape job:\nscrape_configs:\n  - job_name: node-exporter\n    static_configs:\n      - targets: ['node1:9100', 'node2:9100']\nSet suitable scrape intervals, labels, authentication and TLS for the environment. Avoid putting sensitive credentials in a public configuration repository.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Grafana - Complete Quick Revision",
      "explanation": "## What is Grafana?\nGrafana helps teams view metrics and logs through dashboards. It connects to data sources such as Prometheus and Loki and presents information in panels, tables and alerts.\n\n## Architecture to Remember\nA data source connects Grafana to a backend. A dashboard contains panels. Each panel runs a query and displays its result. Variables allow reusable filters. Alert rules evaluate conditions and send notifications through contact points.\n\n## Real-Time Workflow\nAdd a data source. Test connectivity. Create a dashboard. Add panels with queries. Set variables and time ranges. Configure alert rules and notification routing. Provision important dashboards through version-controlled configuration.\n\n## Important Technical Points\nTest the data source connection. Inspect the panel query and time range. Check dashboard variables and label filters. Confirm the metric exists in the backend and that timestamps fall inside the selected range. Use Explore to run the query directly. Check datasource credentials and network access.\n\n## Common Production Issues\nNo data: check query, labels and time range. Datasource unavailable: verify URL, DNS, credentials and firewall. Dashboard is slow: reduce expensive queries and excessive panel counts. Alert not sent: inspect rule evaluation, contact point and notification policy.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "Use Grafana Explore to test queries\nOpen panel Query Inspector\nTest the data source connection\nCheck Grafana server logs\nFor Prometheus, test the same PromQL query directly",
      "config": "Example Prometheus data source provisioning:\napiVersion: 1\ndatasources:\n  - name: Prometheus\n    type: prometheus\n    access: proxy\n    url: http://prometheus:9090\n    isDefault: true\nUse secure secret handling for credentials and validate connectivity from the Grafana server.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Maven - Complete Quick Revision",
      "explanation": "## What is Maven?\nMaven is a Java build and dependency management tool. It reads project information from pom.xml, downloads required libraries and runs standard build lifecycle phases.\n\n## Architecture to Remember\nThe POM defines project coordinates, dependencies, plugins and build settings. Maven lifecycle phases run in order. Repositories provide dependencies and plugins. The local repository caches downloaded artifacts.\n\n## Real-Time Workflow\nCheck the Java and Maven versions. Review pom.xml. Resolve dependencies. Compile source code. Run unit tests. Package the application. Run verification checks. Publish the versioned artifact to a repository manager.\n\n## Important Technical Points\nCompare Java and Maven versions, settings.xml, active profiles, mirrors, proxy configuration, repository credentials and network access. Check whether the dependency coordinates exist in the configured repository. Run the same build with the CI settings. Use debug logs carefully because they may reveal sensitive information.\n\n## Common Production Issues\nCould not resolve dependency: check repository URL, coordinates, credentials and network. Compilation error: check JDK compatibility and source level. Tests fail: inspect test reports. Different local and CI output: compare JDK, Maven, profiles and settings.xml.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "mvn -version\nmvn clean compile\nmvn test\nmvn clean package\nmvn clean verify\nmvn dependency:tree\nmvn help:effective-pom\nmvn -U clean verify",
      "config": "Example dependency:\n<dependency>\n  <groupId>org.example</groupId>\n  <artifactId>sample-library</artifactId>\n  <version>1.2.0</version>\n  <scope>compile</scope>\n</dependency>\nPin dependency and plugin versions. Use a controlled repository mirror for reliable CI builds.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Nexus - Complete Quick Revision",
      "explanation": "## What is Nexus?\nNexus Repository Manager stores and distributes software artifacts. Teams use it to host internal releases and cache dependencies from external repositories.\n\n## Architecture to Remember\nHosted repositories store internal artifacts. Proxy repositories cache remote artifacts. Group repositories combine multiple repositories behind one URL. Blob stores hold artifact data. Users and roles control access.\n\n## Real-Time Workflow\nConfigure hosted and proxy repositories. Create a group endpoint. Configure Maven, npm or Docker clients to use Nexus. Publish versioned artifacts. Apply retention and cleanup policies. Back up repository metadata and blob data consistently.\n\n## Important Technical Points\nCheck whether Nexus is healthy. Inspect repository status and group membership/order. Verify the proxy remote is reachable. Check storage capacity, user privileges, TLS certificates, DNS and outbound network access. Use the HTTP status and Nexus logs to distinguish authentication, authorization, missing artifact and upstream failures.\n\n## Common Production Issues\n401: authentication is missing or invalid. 403: user lacks permission. 404: artifact or repository path may be wrong. Proxy failure: inspect remote availability and cached metadata. Storage full: inspect blob stores and cleanup policy before deleting anything.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "Test the repository URL using curl\nInspect Nexus repository status in the UI\nReview Nexus application logs\nCheck client settings.xml\nCheck filesystem capacity and blob-store health",
      "config": "Example Maven mirror settings:\n<settings>\n  <mirrors>\n    <mirror>\n      <id>company-nexus</id>\n      <mirrorOf>*</mirrorOf>\n      <url>https://nexus.example.com/repository/maven-group/</url>\n    </mirror>\n  </mirrors>\n</settings>\nUse the actual approved repository URL and credentials method for your company.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Jira - Complete Quick Revision",
      "explanation": "## What is Jira?\nJira is a work tracking platform. Software and DevOps teams use it to record tasks, bugs, incidents, changes and releases and to track ownership and progress.\n\n## Architecture to Remember\nProjects contain issues. Issue types classify work. Workflows define statuses and transitions. Boards display work. Components and versions help organize ownership and releases. JQL searches and filters issues.\n\n## Real-Time Workflow\nCreate an issue with a clear description and acceptance criteria. Assign an owner and priority. Move it through the approved workflow. Link related bugs, incidents and changes. Connect release information from CI/CD and review dashboards.\n\n## Important Technical Points\nCreate an incident issue with impact, severity, affected service, start and end times, owner and current status. Record investigation findings and link related deployment or change issues. After service recovery, document root cause and corrective actions with owners and due dates. Link follow-up bugs and release versions so the work can be traced.\n\n## Common Production Issues\nIssue cannot transition: inspect workflow conditions and permissions. User cannot see project: check project roles and issue security. Dashboard count is wrong: inspect JQL and resolution values. Release is not traceable: link deployment metadata and version issues.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "JQL: project = OPS AND statusCategory != Done ORDER BY priority DESC\nJQL: issuetype = Bug AND created >= -7d\nJQL: assignee = currentUser() AND resolution is EMPTY\nUse Jira REST API only with approved authentication and permissions.",
      "config": "Example issue template fields:\nSummary: API latency increased after release\nImpact: Checkout requests delayed\nSeverity: High\nAffected service: checkout-api\nStarted: <timestamp>\nOwner: <team>\nRelated release: <version>\nFollow-up: <corrective action>\nKeep incident fields consistent so teams can report accurately.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    },
    {
      "heading": "Tomcat - Complete Quick Revision",
      "explanation": "## What is Tomcat?\nApache Tomcat is a Java web application server. It runs Java web applications, commonly packaged as WAR files, and handles incoming HTTP requests through configured connectors.\n\n## Architecture to Remember\nTomcat runs inside a Java Virtual Machine. Connectors accept network requests. Worker threads process requests. Applications run in web contexts. Access logs record requests, while Catalina and application logs capture runtime events.\n\n## Real-Time Workflow\nInstall a supported JDK and Tomcat version. Configure the service account and connectors. Deploy the versioned WAR file. Configure external environment settings. Start Tomcat. Verify the application URL, logs, thread usage and JVM health.\n\n## Important Technical Points\nCheck request latency and access logs. Inspect busy and available connector threads, blocked threads, database connection pool waits, downstream service latency, garbage collection pauses, heap pressure and file descriptor limits. Capture thread dumps during the issue and correlate them with application and database metrics.\n\n## Common Production Issues\nHTTP 404: check context path and deployment. HTTP 500: inspect application stack trace. OutOfMemoryError: inspect heap, GC logs and memory usage. Thread exhaustion: inspect blocked requests and downstream waits. Port conflict: identify the process listening on the configured port.",
      "steps": [
        "Remember the purpose of the tool and the problem it solves.",
        "Understand the main components and how they communicate.",
        "Know the normal development-to-production workflow.",
        "Remember the important commands and configuration files.",
        "Know where to check logs, metrics and error messages.",
        "Understand rollback, backup and recovery options."
      ],
      "commands": "systemctl status tomcat\njournalctl -u tomcat -n 200\nInspect catalina.out and access logs\njcmd <pid> Thread.print\njcmd <pid> GC.heap_info\nss -lntp",
      "config": "Example connector settings:\n<Connector port=\"8080\" protocol=\"HTTP/1.1\"\n           connectionTimeout=\"20000\"\n           maxThreads=\"200\"\n           redirectPort=\"8443\" />\nTune thread counts and timeouts only after measuring request concurrency, memory and downstream capacity.",
      "problems": [
        "Authentication errors require identity and permission checks.",
        "Connectivity errors require DNS, routing, firewall, port and TLS checks.",
        "Performance errors require CPU, memory, disk, connection and latency checks.",
        "Configuration errors require comparison between expected and actual settings."
      ]
    }
  ]
}

export default data;

