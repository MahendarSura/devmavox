const data = {
  "title": "DevOps Important Comparisons",
  "description": "Detailed technical comparisons for 18 DevOps tools, including how features differ, when to use them, production trade-offs, commands and practical examples.",
  "sections": [
    {
      "heading": "AWS - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nAWS is a cloud platform. Instead of buying physical servers, companies rent computing, storage, networking and database services. A DevOps engineer uses AWS to build, deploy, secure and monitor applications.\n\n## Important Comparisons\nALB vs NLB: ALB understands HTTP and can route using host names and URL paths. NLB works at the transport layer and handles TCP or UDP traffic. Multi-AZ protects resources across zones in one region. Multi-Region supports regional disaster recovery but needs data replication and failover planning.\n\n## Production Example\nCreate a VPC with public and private subnets in at least two Availability Zones. Place the load balancer in public subnets and application servers in private subnets. Use an Auto Scaling Group to replace unhealthy instances and increase capacity. Use Multi-AZ RDS when database availability is required. Store uploaded files in S3 instead of local server disks. Attach IAM roles instead of storing access keys on servers. Enable monitoring, encryption, backups and tested recovery.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "aws sts get-caller-identity\naws ec2 describe-instances\naws s3 ls\naws elbv2 describe-target-health --target-group-arn <arn>\naws cloudwatch describe-alarms",
      "config": "Example EC2 instance role policy idea:\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Action\": [\"s3:GetObject\"],\n    \"Resource\": [\"arn:aws:s3:::company-app-config/*\"]\n  }]\n}\nThis allows reading only objects from the specified bucket path. Use the smallest permissions required.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Linux - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nLinux is an operating system widely used on cloud servers. DevOps engineers use Linux to run applications, manage services, configure networking, control permissions, inspect logs and automate tasks.\n\n## Important Comparisons\nProcess vs thread: a process has its own address space; threads share memory inside a process. Hard link vs symbolic link: a hard link points to the same inode; a symbolic link stores a path. User vs root: root has broad administrative permissions, while normal users should receive only required access.\n\n## Production Example\nFirst identify the impact and the deployment time. Check systemctl status to understand the service state. Read journalctl and application logs to find the actual error. Check whether the process exists and whether the expected port is listening. Check disk space, inode usage, memory and file permissions. Validate the configuration before restarting. After the fix, confirm the service is healthy and monitor it.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "systemctl status <service>\njournalctl -u <service> -n 200 --no-pager\nss -lntp\nps aux\ntop\nfree -h\ndf -h\ndf -i\nls -l",
      "config": "Example systemd service:\n[Unit]\nDescription=Sample Web Application\nAfter=network.target\n\n[Service]\nUser=appuser\nWorkingDirectory=/opt/sample-app\nExecStart=/usr/bin/java -jar app.jar\nRestart=on-failure\n\n[Install]\nWantedBy=multi-user.target\nThis defines how systemd starts and monitors the application.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Git - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nGit is a version-control system. It records code changes so developers can work together, review history, create branches and safely return to earlier versions.\n\n## Important Comparisons\nMerge vs rebase: merge preserves branch topology; rebase replays commits to create a linear history. Revert vs reset: revert creates a new reversing commit; reset moves the branch pointer. Fetch vs pull: fetch downloads remote information; pull fetches and integrates changes.\n\n## Production Example\nFirst inspect the commit and understand what it changed. For shared history, use git revert because it creates a new commit that reverses the unwanted change. Run tests and push the revert commit. Avoid git reset on shared branches because it rewrites history and can affect other developers.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "git status\ngit log --oneline --graph --decorate -15\ngit diff\ngit show <commit>\ngit branch\ngit switch -c feature/login\ngit add <file>\ngit commit -m \"Add login validation\"\ngit revert <commit>\ngit push",
      "config": "Example .gitignore:\nnode_modules/\n.next/\n.env\n.env.local\ndist/\ncoverage/\nThis prevents generated files and local secrets from being added to the repository.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "GitHub Actions - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nGitHub Actions is a CI/CD automation service inside GitHub. It runs workflows when events happen, such as a push, pull request, release or manual trigger.\n\n## Important Comparisons\nArtifact vs cache: artifacts preserve outputs for later jobs or download; caches speed up dependency reuse and can be evicted. Hosted runners are managed by GitHub; self-hosted runners provide custom network or hardware access but require patching, isolation and cleanup.\n\n## Production Example\nConfigure AWS IAM OIDC federation with GitHub. GitHub provides a short-lived identity token. AWS validates the token against a trust policy restricted to the correct repository and branch or environment. The workflow assumes the role and receives temporary credentials. Give that role only the permissions needed for deployment.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "gh workflow list\ngh run list\ngh run view <run-id>\ngh run view <run-id> --log\ngh workflow run <workflow.yml>",
      "config": "Example workflow:\nname: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n      - run: npm ci\n      - run: npm test\n      - run: npm run build\nFor production, pin third-party actions to reviewed commit SHAs and define minimal permissions.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Docker - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nDocker packages an application and its required libraries into an image. A container is a running instance of that image. This helps an application behave consistently on a developer laptop, test server and production server.\n\n## Important Comparisons\nImage vs container: image is the template; container is the running instance. CMD provides a default command or arguments; ENTRYPOINT defines the main executable. Volume data can survive container replacement; data in the container writable layer is not a reliable persistence strategy.\n\n## Production Example\nCheck docker ps -a and inspect the exit code. Read container logs. Inspect the configured entrypoint and command. Confirm required environment variables and mounted files exist. Check file permissions and dependency connectivity. A container normally stops when its main process exits, so the application must run in the foreground.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "docker ps -a\ndocker logs <container>\ndocker inspect <container>\ndocker exec -it <container> sh\ndocker images\ndocker image history <image>\ndocker stats\ndocker network ls\ndocker volume ls",
      "config": "Example Dockerfile:\nFROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\nEXPOSE 3000\nCMD [\"npm\", \"start\"]\nFor production, consider a multi-stage build, non-root user, pinned base image, health check and smaller runtime image.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Kubernetes - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nKubernetes manages containerized applications across a group of machines. It schedules containers, replaces failed Pods, provides service discovery and supports controlled application updates.\n\n## Important Comparisons\nDeployment is suitable for interchangeable stateless replicas. StatefulSet provides stable identity and ordered lifecycle for stateful applications. Readiness controls traffic eligibility; liveness can restart a container. A ConfigMap stores non-secret configuration; a Secret is intended for sensitive values but still needs proper encryption and access control.\n\n## Production Example\nCheck the Ingress controller and its routing rules. Check whether the Service selector matches the Pod labels. Inspect Service endpoints to confirm ready Pods are registered. Verify container ports and readiness probes. Then inspect Pod events, logs, resource limits and NetworkPolicies.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "kubectl get nodes\nkubectl get pods -A\nkubectl get deploy,svc,endpoints -n <namespace>\nkubectl describe pod <pod> -n <namespace>\nkubectl logs <pod> -n <namespace>\nkubectl logs <pod> --previous -n <namespace>\nkubectl get events -n <namespace> --sort-by=.lastTimestamp\nkubectl rollout status deployment/<name> -n <namespace>",
      "config": "Example Deployment:\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n    spec:\n      containers:\n        - name: web\n          image: nginx:1.27\n          ports:\n            - containerPort: 80\n          readinessProbe:\n            httpGet:\n              path: /\n              port: 80\nThis creates three replicas and sends traffic only after readiness succeeds.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "EKS - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nAmazon EKS is AWS managed Kubernetes. AWS operates the Kubernetes control plane, while the customer manages worker capacity, networking, workloads, permissions and cluster operations.\n\n## Important Comparisons\nIRSA grants an IAM role to a Kubernetes service account; a node IAM role applies to the EC2 node and can unintentionally grant broad access to workloads. Managed node groups use EC2 nodes; Fargate removes node management but has workload and feature constraints.\n\n## Production Example\nFirst confirm which AWS identity the Pod is using. Configure IRSA or EKS Pod Identity for the workload instead of giving broad permissions to every node. Verify the service-account association, trust relationship and S3 policy. Check DNS, network egress and any endpoint policy. Test with the AWS CLI inside a safe diagnostic Pod.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "aws eks describe-cluster --name <cluster>\naws eks list-nodegroups --cluster-name <cluster>\naws eks update-kubeconfig --name <cluster>\nkubectl get nodes -o wide\nkubectl get pods -n kube-system\nkubectl describe pod <pod> -n <namespace>",
      "config": "Example service-account annotation for IRSA:\napiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: app-service-account\n  namespace: app\n  annotations:\n    eks.amazonaws.com/role-arn: arn:aws:iam::<account-id>:role/app-s3-role\nThe IAM role trust policy must also allow the matching cluster OIDC provider and service-account subject.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Jenkins - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nJenkins is an automation server used to build, test and deploy applications. A Jenkins pipeline describes the steps needed to move code from source control to a deployable release.\n\n## Important Comparisons\nDeclarative pipeline offers a structured syntax with standard sections. Scripted pipeline offers more Groovy flexibility but can be harder to maintain. The controller coordinates work; agents run builds. Production builds should normally run on agents, not the controller.\n\n## Production Example\nInspect the queue reason and required agent label. Check whether matching agents are online and have free executors. Review agent provisioning, cloud capacity, controller logs and agent connection logs. Check whether a node is temporarily offline or restricted. Do not increase executors blindly when the machine is already overloaded.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "Inspect Manage Jenkins > Build Queue\nInspect Manage Jenkins > Nodes\nReview pipeline Console Output\nCheck controller logs\nCheck agent service and connection logs\nValidate agent labels in Jenkinsfile",
      "config": "Example Declarative Jenkinsfile:\npipeline {\n  agent any\n  stages {\n    stage('Checkout') { steps { checkout scm } }\n    stage('Build') { steps { sh 'mvn clean package' } }\n    stage('Test') { steps { sh 'mvn test' } }\n  }\n}\nUse credentials binding for secrets and move production deployment behind an approval step.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Terraform - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nTerraform is an Infrastructure as Code tool. Engineers describe the required infrastructure in configuration files. Terraform compares that configuration with its state and the real environment, then proposes changes.\n\n## Important Comparisons\nPlan previews changes; apply performs them. count uses numeric indexes and may cause churn when list ordering changes. for_each uses stable keys and is often better for named resources. A module groups reusable infrastructure; a workspace separates state instances but does not replace sound environment isolation.\n\n## Production Example\nUse a remote backend with state locking and encryption. Restrict state access because it can contain sensitive values. Run production plans through CI and serialize applies. Require approval for destructive changes. If a lock remains, confirm the owner and whether an operation is still running before taking recovery action.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "terraform init\nterraform fmt -check\nterraform validate\nterraform plan -out=tfplan\nterraform show tfplan\nterraform apply tfplan\nterraform state list\nterraform output",
      "config": "Example variable and resource:\nvariable \"instance_type\" {\n  type    = string\n  default = \"t3.micro\"\n}\nresource \"aws_instance\" \"web\" {\n  ami           = var.ami_id\n  instance_type = var.instance_type\n  tags = { Name = \"dev-web\" }\n}\nDefine ami_id separately and use a reviewed provider version and remote backend.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Ansible - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nAnsible automates server configuration and application setup. It connects to managed machines, runs tasks and helps keep systems in the required state.\n\n## Important Comparisons\ncommand runs a command without shell parsing; shell supports pipes and redirects but needs careful quoting. A playbook orchestrates tasks across hosts; a role packages reusable automation. Ansible is agentless over SSH in common Linux setups, while some configuration tools use installed agents.\n\n## Production Example\nA shell or command task may always report changed unless it has suitable creates, removes or changed_when conditions. A template may contain changing timestamps or unstable values. Prefer declarative modules such as package, copy, template and service. Run the playbook twice and confirm the second run reports no unnecessary changes.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "ansible-inventory --graph\nansible all -m ping\nansible-playbook site.yml --syntax-check\nansible-playbook site.yml --check --diff\nansible-playbook site.yml --limit webservers",
      "config": "Example playbook:\n- name: Configure web servers\n  hosts: webservers\n  become: true\n  tasks:\n    - name: Install nginx\n      ansible.builtin.package:\n        name: nginx\n        state: present\n    - name: Ensure nginx is running\n      ansible.builtin.service:\n        name: nginx\n        state: started\n        enabled: true\nUse Ansible Vault for secrets and keep inventory variables organized.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "ArgoCD - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nArgo CD is a GitOps continuous delivery tool for Kubernetes. It watches the desired application configuration in Git and compares it with the live cluster.\n\n## Important Comparisons\nGitOps stores desired state in Git and continuously reconciles it. Imperative deployment issues direct commands and can create unrecorded drift. Manual sync requires an operator; automated sync applies eligible changes automatically. Prune can delete resources removed from Git, so use it carefully.\n\n## Production Example\nOpen the application diff and compare Git manifests with live resources. Identify whether someone changed the cluster manually, a controller changed a field, or Git contains a new desired version. Decide which state is correct. Fix the source in Git and sync through the approved process. Review prune and self-heal settings before enabling them.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "argocd app list\nargocd app get <app>\nargocd app diff <app>\nargocd app history <app>\nargocd app sync <app>\nargocd app rollback <app> <revision>",
      "config": "Example Application:\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: web-app\n  namespace: argocd\nspec:\n  source:\n    repoURL: https://github.com/company/platform-config.git\n    targetRevision: main\n    path: apps/web\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: web\n  syncPolicy:\n    automated:\n      prune: false\n      selfHeal: true\nReview automation settings carefully for production.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Helm - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nHelm is a package manager for Kubernetes. A Helm chart contains templates and default values that can be reused to deploy an application in different environments.\n\n## Important Comparisons\nhelm install creates a release and fails if it already exists; helm upgrade --install can create or update. values.yaml is reviewable configuration; --set is useful for small overrides but can become difficult to audit. A chart is a package; a release is one installed instance.\n\n## Production Example\nRead the exact Kubernetes API error and inspect the rendered manifest. Identify which immutable field changed and why. Plan a supported migration or controlled replacement. Check data persistence, service availability and dependencies. Never delete a stateful resource blindly just to make Helm succeed.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "helm list -A\nhelm lint ./chart\nhelm template <release> ./chart -f values.yaml\nhelm upgrade --install <release> ./chart -n <namespace> -f values.yaml --dry-run\nhelm history <release> -n <namespace>\nhelm rollback <release> <revision> -n <namespace>",
      "config": "Example values.yaml:\nreplicaCount: 3\nimage:\n  repository: nginx\n  tag: \"1.27\"\nservice:\n  type: ClusterIP\n  port: 80\nresources:\n  requests:\n    cpu: 100m\n    memory: 128Mi\nKeep secrets outside plain-text values files and inject them through an approved secret manager.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Prometheus - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nPrometheus collects time-series metrics from applications and infrastructure. Teams use it to understand system health, create alerts and investigate performance problems.\n\n## Important Comparisons\nCounter increases over time and suits event totals. Gauge can rise and fall and suits current values such as queue depth. Metrics are efficient for trends and alerting; logs provide detailed event context. Prometheus scrapes metrics; exporters expose metrics from systems that do not natively provide them.\n\n## Production Example\nRead the exact scrape error on the Targets page. Test the metrics endpoint from the Prometheus network context. Check DNS, routing, firewall rules, port, metrics path, TLS, authentication and exporter health. Verify service discovery and relabeling have not removed the target.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "Query: up\nQuery: rate(http_requests_total[5m])\nQuery: sum by (status) (rate(http_requests_total[5m]))\nInspect Prometheus /targets\nInspect Prometheus /rules\nCheck Prometheus and exporter logs",
      "config": "Example scrape job:\nscrape_configs:\n  - job_name: node-exporter\n    static_configs:\n      - targets: ['node1:9100', 'node2:9100']\nSet suitable scrape intervals, labels, authentication and TLS for the environment. Avoid putting sensitive credentials in a public configuration repository.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Grafana - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nGrafana helps teams view metrics and logs through dashboards. It connects to data sources such as Prometheus and Loki and presents information in panels, tables and alerts.\n\n## Important Comparisons\nA dashboard supports human exploration; an alert rule evaluates a condition and notifies responders. Prometheus stores metrics; Loki stores log streams and queries them using LogQL. A panel is not a replacement for an operational alert.\n\n## Production Example\nTest the data source connection. Inspect the panel query and time range. Check dashboard variables and label filters. Confirm the metric exists in the backend and that timestamps fall inside the selected range. Use Explore to run the query directly. Check datasource credentials and network access.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "Use Grafana Explore to test queries\nOpen panel Query Inspector\nTest the data source connection\nCheck Grafana server logs\nFor Prometheus, test the same PromQL query directly",
      "config": "Example Prometheus data source provisioning:\napiVersion: 1\ndatasources:\n  - name: Prometheus\n    type: prometheus\n    access: proxy\n    url: http://prometheus:9090\n    isDefault: true\nUse secure secret handling for credentials and validate connectivity from the Grafana server.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Maven - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nMaven is a Java build and dependency management tool. It reads project information from pom.xml, downloads required libraries and runs standard build lifecycle phases.\n\n## Important Comparisons\ncompile builds source code. package creates a distributable artifact. verify runs configured checks before install or deploy. compile scope is available for compilation and runtime; provided is expected from the runtime/container and is not normally packaged as an application dependency.\n\n## Production Example\nCompare Java and Maven versions, settings.xml, active profiles, mirrors, proxy configuration, repository credentials and network access. Check whether the dependency coordinates exist in the configured repository. Run the same build with the CI settings. Use debug logs carefully because they may reveal sensitive information.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "mvn -version\nmvn clean compile\nmvn test\nmvn clean package\nmvn clean verify\nmvn dependency:tree\nmvn help:effective-pom\nmvn -U clean verify",
      "config": "Example dependency:\n<dependency>\n  <groupId>org.example</groupId>\n  <artifactId>sample-library</artifactId>\n  <version>1.2.0</version>\n  <scope>compile</scope>\n</dependency>\nPin dependency and plugin versions. Use a controlled repository mirror for reliable CI builds.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Nexus - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nNexus Repository Manager stores and distributes software artifacts. Teams use it to host internal releases and cache dependencies from external repositories.\n\n## Important Comparisons\nHosted repositories store your organization's artifacts. Proxy repositories cache artifacts from remote repositories. Group repositories provide one combined endpoint. Release versions should be immutable; snapshots are mutable development versions.\n\n## Production Example\nCheck whether Nexus is healthy. Inspect repository status and group membership/order. Verify the proxy remote is reachable. Check storage capacity, user privileges, TLS certificates, DNS and outbound network access. Use the HTTP status and Nexus logs to distinguish authentication, authorization, missing artifact and upstream failures.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "Test the repository URL using curl\nInspect Nexus repository status in the UI\nReview Nexus application logs\nCheck client settings.xml\nCheck filesystem capacity and blob-store health",
      "config": "Example Maven mirror settings:\n<settings>\n  <mirrors>\n    <mirror>\n      <id>company-nexus</id>\n      <mirrorOf>*</mirrorOf>\n      <url>https://nexus.example.com/repository/maven-group/</url>\n    </mirror>\n  </mirrors>\n</settings>\nUse the actual approved repository URL and credentials method for your company.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Jira - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nJira is a work tracking platform. Software and DevOps teams use it to record tasks, bugs, incidents, changes and releases and to track ownership and progress.\n\n## Important Comparisons\nEpic groups a large body of work. Story describes user value. Task tracks a unit of work. Bug records a defect. Status is the current workflow position; resolution records the outcome. A closed status without a resolution can produce confusing reports.\n\n## Production Example\nCreate an incident issue with impact, severity, affected service, start and end times, owner and current status. Record investigation findings and link related deployment or change issues. After service recovery, document root cause and corrective actions with owners and due dates. Link follow-up bugs and release versions so the work can be traced.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "JQL: project = OPS AND statusCategory != Done ORDER BY priority DESC\nJQL: issuetype = Bug AND created >= -7d\nJQL: assignee = currentUser() AND resolution is EMPTY\nUse Jira REST API only with approved authentication and permissions.",
      "config": "Example issue template fields:\nSummary: API latency increased after release\nImpact: Checkout requests delayed\nSeverity: High\nAffected service: checkout-api\nStarted: <timestamp>\nOwner: <team>\nRelated release: <version>\nFollow-up: <corrective action>\nKeep incident fields consistent so teams can report accurately.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    },
    {
      "heading": "Tomcat - Technical Comparisons and Decision Making",
      "explanation": "## Tool Context\nApache Tomcat is a Java web application server. It runs Java web applications, commonly packaged as WAR files, and handles incoming HTTP requests through configured connectors.\n\n## Important Comparisons\nJVM heap controls memory for Java objects; Tomcat connector threads control concurrent request processing. Increasing heap does not solve a blocked thread pool. WAR deployment packages the application; external context configuration separates environment-specific deployment settings from the artifact.\n\n## Production Example\nCheck request latency and access logs. Inspect busy and available connector threads, blocked threads, database connection pool waits, downstream service latency, garbage collection pauses, heap pressure and file descriptor limits. Capture thread dumps during the issue and correlate them with application and database metrics.\n\n## How to Select the Correct Option\nChoose based on the application requirement, expected traffic, security, availability, cost, complexity and team support. Explain the reason for the choice instead of saying that one option is always better.",
      "steps": [
        "Identify the requirement before selecting a technology or feature.",
        "Compare how each option works and which layer it operates at.",
        "Compare security, availability, performance and operating cost.",
        "Consider failure behavior, migration effort and rollback.",
        "Use a real application example to justify the final choice."
      ],
      "commands": "systemctl status tomcat\njournalctl -u tomcat -n 200\nInspect catalina.out and access logs\njcmd <pid> Thread.print\njcmd <pid> GC.heap_info\nss -lntp",
      "config": "Example connector settings:\n<Connector port=\"8080\" protocol=\"HTTP/1.1\"\n           connectionTimeout=\"20000\"\n           maxThreads=\"200\"\n           redirectPort=\"8443\" />\nTune thread counts and timeouts only after measuring request concurrency, memory and downstream capacity.",
      "problems": [
        "Do not compare features that solve different problems as if they are direct replacements.",
        "Do not select a production option only because it is popular.",
        "Check version compatibility and operational limitations before migration."
      ]
    }
  ]
}

export default data;

