const data = [
  {
    "sections": [
      {
        "steps": [
          "IAM Roles and Policies: IAM controls authentication and authorization through users, groups, roles, identity policies and resource policies.",
          "VPC Networking: A VPC provides an isolated network with CIDR ranges, subnets, route tables, gateways and network controls.",
          "EC2 Instances: EC2 provides virtual machines controlled through AMIs, instance types, key pairs, security groups and EBS volumes.",
          "S3 Storage: S3 stores objects in buckets and supports versioning, lifecycle policies, encryption, replication and access policies.",
          "CloudWatch Monitoring: CloudWatch collects metrics, logs, alarms and events for AWS resources and applications."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each AWS component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "IAM Roles and Policies: aws iam get-role --role-name MyRole\nVPC Networking: aws ec2 describe-route-tables\nEC2 Instances: aws ec2 describe-instances\nS3 Storage: aws s3api get-bucket-policy --bucket my-bucket\nCloudWatch Monitoring: aws logs tail /aws/my-app --follow",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Check the caller identity, trust policy, permission policy, resource policy, permissions boundary and SCP.",
            "issue": "AccessDenied or failed AssumeRole"
          },
          {
            "solution": "Verify subnet route association, public IP, Internet Gateway route, security group and network ACL.",
            "issue": "EC2 instance cannot reach the internet"
          },
          {
            "solution": "Inspect system and instance checks, security group ingress, route, key permissions, OS firewall and boot logs.",
            "issue": "Instance fails status checks or SSH connection"
          },
          {
            "solution": "Evaluate IAM permissions, bucket policy, KMS key policy, ownership settings and public-access block.",
            "issue": "AccessDenied while reading an object"
          },
          {
            "solution": "Verify log agent, IAM permissions, log group, metric filters, alarm dimensions and SNS subscription.",
            "issue": "No application logs or alarm notifications"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for AWS.",
    "title": "AWS Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Docker Images: Images are immutable application templates built from layered filesystem instructions and stored in registries.",
          "Dockerfile and Build: Dockerfiles define reproducible image builds using instructions such as FROM, RUN, COPY, WORKDIR and CMD.",
          "Container Lifecycle: Containers are runtime instances of images with isolated processes, networking and filesystem layers.",
          "Docker Networking: Docker networks connect containers using bridge, host, overlay and custom network drivers.",
          "Volumes and Persistence: Volumes persist container data independently of the container writable layer."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Docker component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Docker Images: docker image inspect myapp:latest\nDockerfile and Build: docker build --no-cache -t myapp:1.0 .\nContainer Lifecycle: docker inspect mycontainer\nDocker Networking: docker network inspect my-network\nVolumes and Persistence: docker volume inspect app-data",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Verify image name, tag, registry authentication, architecture, digest and image pull policy.",
            "issue": "Image pull fails or unexpected image is deployed"
          },
          {
            "solution": "Inspect build context, .dockerignore, COPY paths, package installation and build-stage dependencies.",
            "issue": "Build fails because a dependency or file is missing"
          },
          {
            "solution": "Inspect docker logs, exit code, entrypoint, command, environment variables and application process.",
            "issue": "Container exits immediately after startup"
          },
          {
            "solution": "Check shared network membership, service DNS name, listening port, bind address and firewall.",
            "issue": "One container cannot resolve another container"
          },
          {
            "solution": "Verify volume mount destination, named volume, permissions, ownership and database data directory.",
            "issue": "Database data disappears after container recreation"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Docker.",
    "title": "Docker Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Pods and Scheduling: Pods are the smallest deployable Kubernetes units and are scheduled onto eligible worker nodes.",
          "Deployments and Rollouts: Deployments manage ReplicaSets and provide declarative updates and rollback for stateless workloads.",
          "Services and DNS: Services provide stable virtual endpoints for accessing changing Pod IP addresses.",
          "ConfigMaps and Secrets: ConfigMaps and Secrets provide configuration and sensitive values to workloads through environment variables or mounted files.",
          "RBAC and Cluster Access: RBAC authorizes users and service accounts through Roles, ClusterRoles and bindings."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Kubernetes component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Pods and Scheduling: kubectl describe pod POD -n NAMESPACE\nDeployments and Rollouts: kubectl rollout status deployment/myapp\nServices and DNS: kubectl get endpointslices -n NAMESPACE\nConfigMaps and Secrets: kubectl describe pod POD -n NAMESPACE\nRBAC and Cluster Access: kubectl auth can-i get pods --as=system:serviceaccount:default:app",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Inspect scheduler events, resource requests, node capacity, taints, tolerations, PVC binding and affinity.",
            "issue": "Pod remains Pending"
          },
          {
            "solution": "Inspect rollout status, ReplicaSet events, readiness probes, image pull errors and resource constraints.",
            "issue": "Deployment rollout is stuck"
          },
          {
            "solution": "Compare Service selectors with Pod labels, targetPort, container port and readiness status.",
            "issue": "Service returns connection refused or has no endpoints"
          },
          {
            "solution": "Check object namespace, key names, volume mounts, environment references and Pod restart after updates.",
            "issue": "Application starts with missing configuration"
          },
          {
            "solution": "Inspect RoleBinding subjects, namespaces, verbs, API groups and service-account identity.",
            "issue": "User receives Forbidden responses"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Kubernetes.",
    "title": "Kubernetes Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Jenkins Pipeline: Pipeline defines build, test, security and deployment stages as code in a Jenkinsfile.",
          "Agents and Executors: Agents execute pipeline workloads while executors determine how many tasks can run concurrently.",
          "Credentials Management: Jenkins Credentials stores secrets and exposes them to authorized pipeline steps.",
          "Plugins and Configuration: Plugins extend Jenkins with integrations for SCM, build tools, testing, security and deployment.",
          "Build Artifacts: Artifacts are generated outputs retained for testing, promotion, deployment and traceability."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Jenkins component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Jenkins Pipeline: jenkins-cli get-job my-pipeline\nAgents and Executors: Manage Jenkins > Nodes\nCredentials Management: Manage Jenkins > Credentials\nPlugins and Configuration: Manage Jenkins > Plugins\nBuild Artifacts: archiveArtifacts artifacts: 'target/*.jar'",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Inspect stage logs, shell exit code, environment, workspace, credentials and agent availability.",
            "issue": "Pipeline fails at a particular stage"
          },
          {
            "solution": "Check node online state, labels, executor count, disk space, connectivity and agent logs.",
            "issue": "Build remains queued waiting for an executor"
          },
          {
            "solution": "Verify credential ID, scope, permissions, expiry and credentials binding without printing secret values.",
            "issue": "Pipeline reports authentication failure"
          },
          {
            "solution": "Check plugin compatibility, dependency versions, startup logs and safe rollback procedure.",
            "issue": "Jenkins fails after plugin upgrade"
          },
          {
            "solution": "Check workspace path, artifact pattern, stage execution, retention and artifact repository upload.",
            "issue": "Deployment cannot find the build artifact"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Jenkins.",
    "title": "Jenkins Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Branching and Merging: Branches isolate development work and merges integrate changes into a target branch.",
          "Rebase and History: Rebase replays commits onto another base and rewrites commit history.",
          "Remote Repositories: Remotes identify hosted repositories used for fetch, pull and push operations.",
          "Staging and Commits: The staging area selects changes that become part of the next commit.",
          "Tags and Releases: Tags identify important repository revisions and support release traceability."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Git component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Branching and Merging: git log --oneline --graph --all\nRebase and History: git rebase origin/main\nRemote Repositories: git remote -v\nStaging and Commits: git status --short\nTags and Releases: git tag -a v1.0.0 -m 'Release 1.0.0'",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Inspect conflicting files, resolve intended changes, stage resolutions and complete the merge.",
            "issue": "Merge produces conflicts"
          },
          {
            "solution": "Resolve each conflict, run git add, continue with git rebase --continue or safely abort.",
            "issue": "Rebase stops with conflicts"
          },
          {
            "solution": "Fetch remote changes, inspect divergence and integrate them before pushing; verify branch protection.",
            "issue": "Push is rejected"
          },
          {
            "solution": "Review staged changes with git diff --cached and unstage unintended files before committing.",
            "issue": "Unexpected files enter a commit"
          },
          {
            "solution": "Inspect tag target, verify commit hash and recreate the tag only with an approved release procedure.",
            "issue": "Release points to the wrong commit"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Git.",
    "title": "Git Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Providers and Resources: Providers translate Terraform configuration into API operations while resources represent managed infrastructure.",
          "State Management: Terraform state maps configuration resources to real infrastructure objects.",
          "Modules: Modules package reusable Terraform resources, inputs, outputs and dependencies.",
          "Plan and Apply: Plan previews infrastructure changes and apply executes the approved change set.",
          "Remote Backend: Remote backends store state centrally and can provide locking and collaboration."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Terraform component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Providers and Resources: terraform providers\nState Management: terraform state list\nModules: terraform get\nPlan and Apply: terraform plan -out=tfplan\nRemote Backend: terraform init -reconfigure",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Check provider source, version constraints, credentials, region and API permissions.",
            "issue": "Provider initialization or resource creation fails"
          },
          {
            "solution": "Identify the lock owner and active operation; never force-unlock until stale ownership is confirmed.",
            "issue": "State lock prevents an operation"
          },
          {
            "solution": "Check module source, version, required variables, output names and provider inheritance.",
            "issue": "Module source or input validation fails"
          },
          {
            "solution": "Inspect plan diff, lifecycle rules, immutable attributes, provider changes and state drift before applying.",
            "issue": "Unexpected resource replacement appears"
          },
          {
            "solution": "Verify backend configuration, storage permissions, encryption, network access and lock-table configuration.",
            "issue": "Backend initialization or state access fails"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Terraform.",
    "title": "Terraform Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Inventory: Inventory defines managed hosts and groups with connection details and variables.",
          "Playbooks and Tasks: Playbooks define ordered automation tasks applied to selected hosts.",
          "Roles: Roles organize reusable tasks, handlers, templates, files, defaults and variables.",
          "Variables and Templates: Variables parameterize automation and templates generate configuration files dynamically.",
          "Handlers and Idempotency: Handlers run when notified, while idempotent tasks converge systems toward a declared state."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Ansible component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Inventory: ansible-inventory --list\nPlaybooks and Tasks: ansible-playbook site.yml --syntax-check\nRoles: ansible-galaxy role list\nVariables and Templates: ansible-playbook site.yml --list-hosts\nHandlers and Idempotency: ansible-playbook site.yml --check --diff",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Verify inventory hostname, SSH connectivity, user, private key, port, DNS and privilege escalation.",
            "issue": "Hosts are unreachable"
          },
          {
            "solution": "Inspect task output, module arguments, target state, permissions and host-specific variables.",
            "issue": "Task fails on a host"
          },
          {
            "solution": "Check role directory layout, roles_path, requirements file and role installation.",
            "issue": "Role cannot be found"
          },
          {
            "solution": "Inspect variable precedence, group_vars, host_vars, role defaults and template expressions.",
            "issue": "Unexpected variable value is rendered"
          },
          {
            "solution": "Inspect module choice, command usage, creates/removes guards and actual target-state comparison.",
            "issue": "A task reports changed on every run"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Ansible.",
    "title": "Ansible Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Processes and Signals: Linux processes are managed through process IDs, signals, priorities and service supervisors.",
          "Systemd Services: systemd manages services, dependencies, startup targets and service lifecycle.",
          "Disk and Filesystems: Linux filesystems organize persistent storage, mount points, inodes and capacity.",
          "Networking: Linux networking uses interfaces, routes, DNS resolution, sockets and firewall rules.",
          "Logs and Permissions: Linux logs record system and application events while ownership and mode bits control access."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Linux component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Processes and Signals: ps aux; top; kill -TERM PID\nSystemd Services: systemctl status nginx\nDisk and Filesystems: df -h; df -i; lsblk\nNetworking: ip addr; ip route; ss -tulpn\nLogs and Permissions: journalctl -xe; ls -l /var/log",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Inspect CPU, memory, process state, open files and logs before using stronger termination signals.",
            "issue": "Application process becomes unresponsive"
          },
          {
            "solution": "Inspect systemctl status, journalctl, unit configuration, permissions, ports and dependency failures.",
            "issue": "Service fails during startup"
          },
          {
            "solution": "Check free blocks, inode usage, mount state, filesystem permissions and quotas.",
            "issue": "Application cannot write files"
          },
          {
            "solution": "Check listener binding, routes, DNS, firewall rules and upstream network connectivity.",
            "issue": "Server port is unreachable"
          },
          {
            "solution": "Inspect owner, group, mode, ACLs, service user and log rotation configuration.",
            "issue": "Permission denied or missing logs"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Linux.",
    "title": "Linux Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Application Reconciliation: Argo CD compares desired Git state with live Kubernetes state and reconciles differences.",
          "Sync and Health: Sync applies desired manifests while health assessment reports workload readiness.",
          "Git Repository Access: Argo CD reads manifests from configured Git repositories and revisions.",
          "Projects and RBAC: AppProjects restrict repositories, destinations and resource types; RBAC controls user actions.",
          "Automated Sync and Pruning: Automated sync applies Git changes and pruning removes resources no longer declared when enabled."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each ArgoCD component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Application Reconciliation: argocd app get myapp\nSync and Health: argocd app sync myapp\nGit Repository Access: argocd repo list\nProjects and RBAC: argocd proj get default\nAutomated Sync and Pruning: argocd app get myapp",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Inspect diff, target revision, destination cluster, namespace and ignored differences.",
            "issue": "Application remains OutOfSync"
          },
          {
            "solution": "Inspect resource health, Pod events, readiness, dependencies and controller status.",
            "issue": "Sync succeeds but application is Degraded"
          },
          {
            "solution": "Check repository URL, deploy key or token, certificate trust and repository connectivity.",
            "issue": "Repository authentication fails"
          },
          {
            "solution": "Check project sourceRepos, destinations, resource allowlists and role policies.",
            "issue": "Application creation or sync is denied"
          },
          {
            "solution": "Review automated prune settings, Git diff, resource tracking and sync options before enabling pruning.",
            "issue": "Unexpected resource deletion or stale resource"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for ArgoCD.",
    "title": "ArgoCD Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Charts and Templates: Helm charts package Kubernetes manifests using templates, metadata and default values.",
          "Values and Overrides: Values files and command-line overrides customize chart deployments.",
          "Release Lifecycle: Helm releases track installed chart revisions and support upgrades, history and rollback.",
          "Dependencies: Chart dependencies package other charts and are resolved through chart repositories or local dependencies.",
          "Hooks and Rollbacks: Helm hooks execute lifecycle jobs while rollback restores a previous release revision."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Helm component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Charts and Templates: helm lint ./mychart\nValues and Overrides: helm get values myrelease -a\nRelease Lifecycle: helm history myrelease\nDependencies: helm dependency update ./mychart\nHooks and Rollbacks: helm rollback myrelease 2",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Inspect template syntax, required values, helper templates and Kubernetes API compatibility.",
            "issue": "Chart rendering fails"
          },
          {
            "solution": "Check chart defaults, values files, override order and rendered manifests.",
            "issue": "Deployment uses an unexpected configuration"
          },
          {
            "solution": "Inspect release status, hook jobs, Kubernetes events and failed revision before rollback.",
            "issue": "Upgrade fails or release is pending"
          },
          {
            "solution": "Verify Chart.yaml dependency declarations, repository URLs, versions and packaged charts.",
            "issue": "Dependency chart is missing"
          },
          {
            "solution": "Inspect hook annotations, job logs, timeout, deletion policy and external side effects.",
            "issue": "Hook job blocks an upgrade"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Helm.",
    "title": "Helm Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Prometheus Scraping: Prometheus periodically scrapes configured HTTP metrics endpoints and stores time-series data.",
          "PromQL: PromQL selects and aggregates time-series data for dashboards and alerts.",
          "Alerting Rules: Recording and alerting rules calculate derived metrics and evaluate alert conditions.",
          "Service Discovery: Service discovery dynamically identifies scrape targets from infrastructure or orchestration platforms.",
          "Retention and Storage: Prometheus stores time-series blocks locally and applies configured retention and compaction."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Prometheus component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Prometheus Scraping: promtool check config prometheus.yml\nPromQL: up{job='node-exporter'}\nAlerting Rules: promtool check rules alerts.yml\nService Discovery: curl http://localhost:9090/api/v1/targets\nRetention and Storage: prometheus --storage.tsdb.retention.time=15d",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Check target URL, network reachability, exporter process, scrape path and authentication.",
            "issue": "Target is DOWN"
          },
          {
            "solution": "Verify metric name, labels, scrape interval, time range and target availability.",
            "issue": "Query returns no data"
          },
          {
            "solution": "Check expression, evaluation interval, threshold, labels, pending duration and data availability.",
            "issue": "Expected alert does not fire"
          },
          {
            "solution": "Inspect discovery configuration, relabeling, permissions, labels and discovery refresh.",
            "issue": "New service is missing from targets"
          },
          {
            "solution": "Review retention, cardinality, high-volume labels, scrape frequency and persistent volume capacity.",
            "issue": "Disk usage grows rapidly"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Prometheus.",
    "title": "Prometheus Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Dashboards and Panels: Grafana dashboards visualize metrics through panels, queries, variables and transformations.",
          "Data Sources: Data sources connect Grafana to Prometheus, Loki, databases and other observability systems.",
          "Alerting: Grafana alert rules evaluate queries and route notifications through contact points and policies.",
          "Variables and Templating: Dashboard variables dynamically filter queries and enable reusable dashboards.",
          "Authentication and Permissions: Grafana roles and folder/dashboard permissions control access to observability data."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Grafana component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Dashboards and Panels: Grafana dashboard settings\nData Sources: Grafana > Connections > Data sources\nAlerting: Grafana > Alerting > Alert rules\nVariables and Templating: Grafana dashboard > Settings > Variables\nAuthentication and Permissions: Grafana > Administration > Users and access",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Inspect panel query, datasource, time range, variables, labels and query inspector.",
            "issue": "Panel displays No Data"
          },
          {
            "solution": "Verify URL, credentials, TLS, network path and backend service health.",
            "issue": "Datasource connection test fails"
          },
          {
            "solution": "Inspect rule state, evaluation errors, contact point, notification policy and delivery logs.",
            "issue": "Alert notification is not delivered"
          },
          {
            "solution": "Check variable query, datasource, refresh mode, label names and dependency order.",
            "issue": "Dashboard variable dropdown is empty"
          },
          {
            "solution": "Check organization, team membership, folder permissions, datasource permissions and role.",
            "issue": "User cannot view a dashboard"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Grafana.",
    "title": "Grafana Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "EKS Cluster Control Plane: EKS provides a managed Kubernetes control plane integrated with AWS networking and IAM.",
          "IAM and Access Entries: EKS access combines AWS IAM identities with Kubernetes authorization.",
          "VPC CNI Networking: Amazon VPC CNI assigns VPC IP addresses to Kubernetes Pods and manages ENI networking.",
          "Node Groups: Managed node groups provision and maintain EC2 worker nodes for EKS workloads.",
          "Load Balancers and Ingress: AWS Load Balancer Controller provisions ALBs and NLBs from Kubernetes service and ingress resources."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each EKS component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "EKS Cluster Control Plane: aws eks describe-cluster --name my-cluster\nIAM and Access Entries: aws eks list-access-entries --cluster-name my-cluster\nVPC CNI Networking: kubectl -n kube-system logs daemonset/aws-node\nNode Groups: aws eks describe-nodegroup --cluster-name my-cluster --nodegroup-name workers\nLoad Balancers and Ingress: kubectl logs -n kube-system deployment/aws-load-balancer-controller",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Check cluster endpoint, kubeconfig context, network access, IAM authentication and cluster status.",
            "issue": "kubectl cannot connect to cluster"
          },
          {
            "solution": "Verify access entry, associated access policy, namespace scope and Kubernetes RBAC.",
            "issue": "AWS identity receives Kubernetes Forbidden"
          },
          {
            "solution": "Inspect subnet free IPs, ENI limits, CNI logs, prefix delegation and warm IP settings.",
            "issue": "Pods remain in ContainerCreating due to IP exhaustion"
          },
          {
            "solution": "Check node IAM role, bootstrap configuration, subnet routes, security groups and AMI compatibility.",
            "issue": "Nodes fail to join the cluster"
          },
          {
            "solution": "Check controller IAM policy, subnet tags, ingress class, annotations and controller events.",
            "issue": "Ingress does not create an ALB"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for EKS.",
    "title": "EKS Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "POM and Dependencies: Maven uses pom.xml to define project coordinates, dependencies, plugins and build configuration.",
          "Build Lifecycle: Maven lifecycle phases execute ordered goals for validation, compilation, testing, packaging and installation.",
          "Repositories: Local and remote Maven repositories cache and distribute dependency artifacts.",
          "Profiles: Maven profiles activate environment-specific properties, dependencies and build settings.",
          "Plugins and Surefire: Maven plugins implement build tasks while Surefire executes unit tests."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Maven component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "POM and Dependencies: mvn dependency:tree\nBuild Lifecycle: mvn clean verify\nRepositories: mvn help:effective-settings\nProfiles: mvn help:active-profiles\nPlugins and Surefire: mvn -X test",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Inspect coordinates, repository configuration, version conflicts, mirrors and network access.",
            "issue": "Dependency resolution fails"
          },
          {
            "solution": "Identify failed phase, compiler output, test reports, JDK version and plugin configuration.",
            "issue": "Build fails during test or package phase"
          },
          {
            "solution": "Check repository URL, credentials, mirror settings, proxy, TLS and artifact availability.",
            "issue": "Artifact cannot be downloaded"
          },
          {
            "solution": "Inspect active profiles, activation conditions, settings.xml and command-line profile selection.",
            "issue": "Wrong environment configuration is used"
          },
          {
            "solution": "Inspect plugin version, test naming, includes/excludes, JUnit provider and test reports.",
            "issue": "Tests are skipped or fail unexpectedly"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Maven.",
    "title": "Maven Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Hosted Repositories: Hosted repositories store internally published packages and build artifacts.",
          "Proxy Repositories: Proxy repositories cache artifacts from external upstream repositories.",
          "Group Repositories: Group repositories combine multiple hosted and proxy repositories behind one endpoint.",
          "Blob Stores: Blob stores hold repository binary content and metadata on configured storage.",
          "Security and Cleanup: Nexus security controls repository access while cleanup policies remove eligible unused components."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Nexus component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Hosted Repositories: curl -u USER https://nexus.example.com/service/rest/v1/repositories\nProxy Repositories: Nexus repository configuration\nGroup Repositories: Nexus repository list\nBlob Stores: Nexus Administration > Blob Stores\nSecurity and Cleanup: Nexus Administration > Security",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Check repository format, deployment policy, credentials, write privileges and version rules.",
            "issue": "Artifact upload is rejected"
          },
          {
            "solution": "Verify upstream URL, remote availability, routing rules, negative cache and artifact coordinates.",
            "issue": "Dependency download returns 404"
          },
          {
            "solution": "Inspect group membership, repository order, content selectors and member health.",
            "issue": "Client cannot find an artifact available in a member repository"
          },
          {
            "solution": "Check filesystem capacity, permissions, blob store status, backup and storage health.",
            "issue": "Repository storage becomes unavailable"
          },
          {
            "solution": "Check user role, privileges, repository format, token validity and cleanup policy impact.",
            "issue": "Build receives 401 or 403"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Nexus.",
    "title": "Nexus Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Projects and Issue Types: Jira projects organize work while issue types classify tasks, bugs, stories and epics.",
          "Workflows: Jira workflows define statuses, transitions, conditions, validators and post-functions.",
          "Boards and Sprints: Boards visualize issues through columns while Scrum sprints organize time-boxed work.",
          "JQL and Filters: JQL queries select issues using fields, operators, functions and saved filters.",
          "Automation and Integrations: Jira automation rules trigger actions based on events, conditions and scheduled execution."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Jira component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Projects and Issue Types: Jira Project settings > Issue types\nWorkflows: Jira Project settings > Workflows\nBoards and Sprints: Jira Board settings\nJQL and Filters: project = DEV AND statusCategory != Done\nAutomation and Integrations: Jira Project settings > Automation",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Inspect project issue-type scheme, permissions and workflow configuration.",
            "issue": "Issue type is unavailable"
          },
          {
            "solution": "Check transition availability, conditions, validators, required fields and user permissions.",
            "issue": "Issue cannot transition to the next status"
          },
          {
            "solution": "Inspect board filter, project scope, status-column mapping, sprint assignment and permissions.",
            "issue": "Issue is missing from a sprint board"
          },
          {
            "solution": "Validate JQL syntax, field names, project permissions, saved filter sharing and query scope.",
            "issue": "Search returns unexpected results"
          },
          {
            "solution": "Inspect rule audit log, trigger, conditions, actor permissions, execution limits and integration response.",
            "issue": "Automation rule does not execute"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Jira.",
    "title": "Jira Important Comparisons"
  },
  {
    "sections": [
      {
        "steps": [
          "Tomcat Architecture: Tomcat hosts Java web applications through connectors, servlet containers, engines, hosts and contexts.",
          "WAR Deployment: Tomcat deploys web applications from WAR archives or configured application directories.",
          "Connectors and Ports: Tomcat connectors accept HTTP or AJP traffic and forward requests into the servlet engine.",
          "JVM and Memory: Tomcat runs on the JVM and depends on heap, garbage collection, thread pools and memory configuration.",
          "Logs and Access: Tomcat logs record startup, application, access and container events."
        ],
        "explanation": "Understand the responsibility, dependencies and operational boundaries of each Tomcat component. Select the component that matches the workload requirement rather than using one component for every situation.",
        "heading": "Core Concepts and Responsibilities"
      },
      {
        "commands": "Tomcat Architecture: catalina.sh version\nWAR Deployment: ls -lh /webapps\nConnectors and Ports: ss -lntp | grep java\nJVM and Memory: jcmd PID VM.flags\nLogs and Access: tail -f /logs/catalina.out",
        "explanation": "Choose inspection commands according to the resource being investigated. Compare configuration, runtime state and observed behaviour before changing production.",
        "heading": "Commands and Operational Verification"
      },
      {
        "problems": [
          {
            "solution": "Inspect catalina.out, server.xml, Java version, port conflicts and startup permissions.",
            "issue": "Tomcat fails to start"
          },
          {
            "solution": "Check WAR name, deployment logs, context path, application startup and servlet mappings.",
            "issue": "Application returns HTTP 404 after deployment"
          },
          {
            "solution": "Inspect connector port, bind address, firewall, port conflict and connector configuration.",
            "issue": "Tomcat port is not accepting connections"
          },
          {
            "solution": "Review heap usage, GC logs, thread count, memory leak indicators and application allocation patterns.",
            "issue": "OutOfMemoryError or frequent garbage collection"
          },
          {
            "solution": "Correlate access and application logs, stack traces, dependency versions and recent configuration changes.",
            "issue": "HTTP 500 errors appear after deployment"
          }
        ],
        "explanation": "Different failure symptoms require different evidence. Avoid assuming that every failure has the same root cause.",
        "heading": "Failure Symptoms and Recovery"
      }
    ],
    "description": "Important operational distinctions and decision points for Tomcat.",
    "title": "Tomcat Important Comparisons"
  }
]

export default data;
