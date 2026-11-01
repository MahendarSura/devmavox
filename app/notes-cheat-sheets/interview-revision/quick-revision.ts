const data = [
  {
    "sections": [
      {
        "commands": "aws iam get-role --role-name MyRole",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check the caller identity, trust policy, permission policy, resource policy, permissions boundary and SCP.",
            "issue": "AccessDenied or failed AssumeRole"
          }
        ],
        "explanation": "IAM controls authentication and authorization through users, groups, roles, identity policies and resource policies.",
        "heading": "IAM Roles and Policies"
      },
      {
        "commands": "aws ec2 describe-route-tables",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Verify subnet route association, public IP, Internet Gateway route, security group and network ACL.",
            "issue": "EC2 instance cannot reach the internet"
          }
        ],
        "explanation": "A VPC provides an isolated network with CIDR ranges, subnets, route tables, gateways and network controls.",
        "heading": "VPC Networking"
      },
      {
        "commands": "aws ec2 describe-instances",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect system and instance checks, security group ingress, route, key permissions, OS firewall and boot logs.",
            "issue": "Instance fails status checks or SSH connection"
          }
        ],
        "explanation": "EC2 provides virtual machines controlled through AMIs, instance types, key pairs, security groups and EBS volumes.",
        "heading": "EC2 Instances"
      },
      {
        "commands": "aws s3api get-bucket-policy --bucket my-bucket",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Evaluate IAM permissions, bucket policy, KMS key policy, ownership settings and public-access block.",
            "issue": "AccessDenied while reading an object"
          }
        ],
        "explanation": "S3 stores objects in buckets and supports versioning, lifecycle policies, encryption, replication and access policies.",
        "heading": "S3 Storage"
      },
      {
        "commands": "aws logs tail /aws/my-app --follow",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Verify log agent, IAM permissions, log group, metric filters, alarm dimensions and SNS subscription.",
            "issue": "No application logs or alarm notifications"
          }
        ],
        "explanation": "CloudWatch collects metrics, logs, alarms and events for AWS resources and applications.",
        "heading": "CloudWatch Monitoring"
      }
    ],
    "description": "Practical AWS revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "AWS Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "docker image inspect myapp:latest",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Verify image name, tag, registry authentication, architecture, digest and image pull policy.",
            "issue": "Image pull fails or unexpected image is deployed"
          }
        ],
        "explanation": "Images are immutable application templates built from layered filesystem instructions and stored in registries.",
        "heading": "Docker Images"
      },
      {
        "commands": "docker build --no-cache -t myapp:1.0 .",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect build context, .dockerignore, COPY paths, package installation and build-stage dependencies.",
            "issue": "Build fails because a dependency or file is missing"
          }
        ],
        "explanation": "Dockerfiles define reproducible image builds using instructions such as FROM, RUN, COPY, WORKDIR and CMD.",
        "heading": "Dockerfile and Build"
      },
      {
        "commands": "docker inspect mycontainer",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect docker logs, exit code, entrypoint, command, environment variables and application process.",
            "issue": "Container exits immediately after startup"
          }
        ],
        "explanation": "Containers are runtime instances of images with isolated processes, networking and filesystem layers.",
        "heading": "Container Lifecycle"
      },
      {
        "commands": "docker network inspect my-network",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check shared network membership, service DNS name, listening port, bind address and firewall.",
            "issue": "One container cannot resolve another container"
          }
        ],
        "explanation": "Docker networks connect containers using bridge, host, overlay and custom network drivers.",
        "heading": "Docker Networking"
      },
      {
        "commands": "docker volume inspect app-data",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Verify volume mount destination, named volume, permissions, ownership and database data directory.",
            "issue": "Database data disappears after container recreation"
          }
        ],
        "explanation": "Volumes persist container data independently of the container writable layer.",
        "heading": "Volumes and Persistence"
      }
    ],
    "description": "Practical Docker revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Docker Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "kubectl describe pod POD -n NAMESPACE",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect scheduler events, resource requests, node capacity, taints, tolerations, PVC binding and affinity.",
            "issue": "Pod remains Pending"
          }
        ],
        "explanation": "Pods are the smallest deployable Kubernetes units and are scheduled onto eligible worker nodes.",
        "heading": "Pods and Scheduling"
      },
      {
        "commands": "kubectl rollout status deployment/myapp",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect rollout status, ReplicaSet events, readiness probes, image pull errors and resource constraints.",
            "issue": "Deployment rollout is stuck"
          }
        ],
        "explanation": "Deployments manage ReplicaSets and provide declarative updates and rollback for stateless workloads.",
        "heading": "Deployments and Rollouts"
      },
      {
        "commands": "kubectl get endpointslices -n NAMESPACE",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Compare Service selectors with Pod labels, targetPort, container port and readiness status.",
            "issue": "Service returns connection refused or has no endpoints"
          }
        ],
        "explanation": "Services provide stable virtual endpoints for accessing changing Pod IP addresses.",
        "heading": "Services and DNS"
      },
      {
        "commands": "kubectl describe pod POD -n NAMESPACE",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check object namespace, key names, volume mounts, environment references and Pod restart after updates.",
            "issue": "Application starts with missing configuration"
          }
        ],
        "explanation": "ConfigMaps and Secrets provide configuration and sensitive values to workloads through environment variables or mounted files.",
        "heading": "ConfigMaps and Secrets"
      },
      {
        "commands": "kubectl auth can-i get pods --as=system:serviceaccount:default:app",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect RoleBinding subjects, namespaces, verbs, API groups and service-account identity.",
            "issue": "User receives Forbidden responses"
          }
        ],
        "explanation": "RBAC authorizes users and service accounts through Roles, ClusterRoles and bindings.",
        "heading": "RBAC and Cluster Access"
      }
    ],
    "description": "Practical Kubernetes revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Kubernetes Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "jenkins-cli get-job my-pipeline",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect stage logs, shell exit code, environment, workspace, credentials and agent availability.",
            "issue": "Pipeline fails at a particular stage"
          }
        ],
        "explanation": "Pipeline defines build, test, security and deployment stages as code in a Jenkinsfile.",
        "heading": "Jenkins Pipeline"
      },
      {
        "commands": "Manage Jenkins > Nodes",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check node online state, labels, executor count, disk space, connectivity and agent logs.",
            "issue": "Build remains queued waiting for an executor"
          }
        ],
        "explanation": "Agents execute pipeline workloads while executors determine how many tasks can run concurrently.",
        "heading": "Agents and Executors"
      },
      {
        "commands": "Manage Jenkins > Credentials",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Verify credential ID, scope, permissions, expiry and credentials binding without printing secret values.",
            "issue": "Pipeline reports authentication failure"
          }
        ],
        "explanation": "Jenkins Credentials stores secrets and exposes them to authorized pipeline steps.",
        "heading": "Credentials Management"
      },
      {
        "commands": "Manage Jenkins > Plugins",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check plugin compatibility, dependency versions, startup logs and safe rollback procedure.",
            "issue": "Jenkins fails after plugin upgrade"
          }
        ],
        "explanation": "Plugins extend Jenkins with integrations for SCM, build tools, testing, security and deployment.",
        "heading": "Plugins and Configuration"
      },
      {
        "commands": "archiveArtifacts artifacts: 'target/*.jar'",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check workspace path, artifact pattern, stage execution, retention and artifact repository upload.",
            "issue": "Deployment cannot find the build artifact"
          }
        ],
        "explanation": "Artifacts are generated outputs retained for testing, promotion, deployment and traceability.",
        "heading": "Build Artifacts"
      }
    ],
    "description": "Practical Jenkins revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Jenkins Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "git log --oneline --graph --all",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect conflicting files, resolve intended changes, stage resolutions and complete the merge.",
            "issue": "Merge produces conflicts"
          }
        ],
        "explanation": "Branches isolate development work and merges integrate changes into a target branch.",
        "heading": "Branching and Merging"
      },
      {
        "commands": "git rebase origin/main",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Resolve each conflict, run git add, continue with git rebase --continue or safely abort.",
            "issue": "Rebase stops with conflicts"
          }
        ],
        "explanation": "Rebase replays commits onto another base and rewrites commit history.",
        "heading": "Rebase and History"
      },
      {
        "commands": "git remote -v",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Fetch remote changes, inspect divergence and integrate them before pushing; verify branch protection.",
            "issue": "Push is rejected"
          }
        ],
        "explanation": "Remotes identify hosted repositories used for fetch, pull and push operations.",
        "heading": "Remote Repositories"
      },
      {
        "commands": "git status --short",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Review staged changes with git diff --cached and unstage unintended files before committing.",
            "issue": "Unexpected files enter a commit"
          }
        ],
        "explanation": "The staging area selects changes that become part of the next commit.",
        "heading": "Staging and Commits"
      },
      {
        "commands": "git tag -a v1.0.0 -m 'Release 1.0.0'",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect tag target, verify commit hash and recreate the tag only with an approved release procedure.",
            "issue": "Release points to the wrong commit"
          }
        ],
        "explanation": "Tags identify important repository revisions and support release traceability.",
        "heading": "Tags and Releases"
      }
    ],
    "description": "Practical Git revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Git Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "terraform providers",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check provider source, version constraints, credentials, region and API permissions.",
            "issue": "Provider initialization or resource creation fails"
          }
        ],
        "explanation": "Providers translate Terraform configuration into API operations while resources represent managed infrastructure.",
        "heading": "Providers and Resources"
      },
      {
        "commands": "terraform state list",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Identify the lock owner and active operation; never force-unlock until stale ownership is confirmed.",
            "issue": "State lock prevents an operation"
          }
        ],
        "explanation": "Terraform state maps configuration resources to real infrastructure objects.",
        "heading": "State Management"
      },
      {
        "commands": "terraform get",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check module source, version, required variables, output names and provider inheritance.",
            "issue": "Module source or input validation fails"
          }
        ],
        "explanation": "Modules package reusable Terraform resources, inputs, outputs and dependencies.",
        "heading": "Modules"
      },
      {
        "commands": "terraform plan -out=tfplan",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect plan diff, lifecycle rules, immutable attributes, provider changes and state drift before applying.",
            "issue": "Unexpected resource replacement appears"
          }
        ],
        "explanation": "Plan previews infrastructure changes and apply executes the approved change set.",
        "heading": "Plan and Apply"
      },
      {
        "commands": "terraform init -reconfigure",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Verify backend configuration, storage permissions, encryption, network access and lock-table configuration.",
            "issue": "Backend initialization or state access fails"
          }
        ],
        "explanation": "Remote backends store state centrally and can provide locking and collaboration.",
        "heading": "Remote Backend"
      }
    ],
    "description": "Practical Terraform revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Terraform Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "ansible-inventory --list",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Verify inventory hostname, SSH connectivity, user, private key, port, DNS and privilege escalation.",
            "issue": "Hosts are unreachable"
          }
        ],
        "explanation": "Inventory defines managed hosts and groups with connection details and variables.",
        "heading": "Inventory"
      },
      {
        "commands": "ansible-playbook site.yml --syntax-check",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect task output, module arguments, target state, permissions and host-specific variables.",
            "issue": "Task fails on a host"
          }
        ],
        "explanation": "Playbooks define ordered automation tasks applied to selected hosts.",
        "heading": "Playbooks and Tasks"
      },
      {
        "commands": "ansible-galaxy role list",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check role directory layout, roles_path, requirements file and role installation.",
            "issue": "Role cannot be found"
          }
        ],
        "explanation": "Roles organize reusable tasks, handlers, templates, files, defaults and variables.",
        "heading": "Roles"
      },
      {
        "commands": "ansible-playbook site.yml --list-hosts",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect variable precedence, group_vars, host_vars, role defaults and template expressions.",
            "issue": "Unexpected variable value is rendered"
          }
        ],
        "explanation": "Variables parameterize automation and templates generate configuration files dynamically.",
        "heading": "Variables and Templates"
      },
      {
        "commands": "ansible-playbook site.yml --check --diff",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect module choice, command usage, creates/removes guards and actual target-state comparison.",
            "issue": "A task reports changed on every run"
          }
        ],
        "explanation": "Handlers run when notified, while idempotent tasks converge systems toward a declared state.",
        "heading": "Handlers and Idempotency"
      }
    ],
    "description": "Practical Ansible revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Ansible Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "ps aux; top; kill -TERM PID",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect CPU, memory, process state, open files and logs before using stronger termination signals.",
            "issue": "Application process becomes unresponsive"
          }
        ],
        "explanation": "Linux processes are managed through process IDs, signals, priorities and service supervisors.",
        "heading": "Processes and Signals"
      },
      {
        "commands": "systemctl status nginx",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect systemctl status, journalctl, unit configuration, permissions, ports and dependency failures.",
            "issue": "Service fails during startup"
          }
        ],
        "explanation": "systemd manages services, dependencies, startup targets and service lifecycle.",
        "heading": "Systemd Services"
      },
      {
        "commands": "df -h; df -i; lsblk",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check free blocks, inode usage, mount state, filesystem permissions and quotas.",
            "issue": "Application cannot write files"
          }
        ],
        "explanation": "Linux filesystems organize persistent storage, mount points, inodes and capacity.",
        "heading": "Disk and Filesystems"
      },
      {
        "commands": "ip addr; ip route; ss -tulpn",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check listener binding, routes, DNS, firewall rules and upstream network connectivity.",
            "issue": "Server port is unreachable"
          }
        ],
        "explanation": "Linux networking uses interfaces, routes, DNS resolution, sockets and firewall rules.",
        "heading": "Networking"
      },
      {
        "commands": "journalctl -xe; ls -l /var/log",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect owner, group, mode, ACLs, service user and log rotation configuration.",
            "issue": "Permission denied or missing logs"
          }
        ],
        "explanation": "Linux logs record system and application events while ownership and mode bits control access.",
        "heading": "Logs and Permissions"
      }
    ],
    "description": "Practical Linux revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Linux Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "argocd app get myapp",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect diff, target revision, destination cluster, namespace and ignored differences.",
            "issue": "Application remains OutOfSync"
          }
        ],
        "explanation": "Argo CD compares desired Git state with live Kubernetes state and reconciles differences.",
        "heading": "Application Reconciliation"
      },
      {
        "commands": "argocd app sync myapp",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect resource health, Pod events, readiness, dependencies and controller status.",
            "issue": "Sync succeeds but application is Degraded"
          }
        ],
        "explanation": "Sync applies desired manifests while health assessment reports workload readiness.",
        "heading": "Sync and Health"
      },
      {
        "commands": "argocd repo list",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check repository URL, deploy key or token, certificate trust and repository connectivity.",
            "issue": "Repository authentication fails"
          }
        ],
        "explanation": "Argo CD reads manifests from configured Git repositories and revisions.",
        "heading": "Git Repository Access"
      },
      {
        "commands": "argocd proj get default",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check project sourceRepos, destinations, resource allowlists and role policies.",
            "issue": "Application creation or sync is denied"
          }
        ],
        "explanation": "AppProjects restrict repositories, destinations and resource types; RBAC controls user actions.",
        "heading": "Projects and RBAC"
      },
      {
        "commands": "argocd app get myapp",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Review automated prune settings, Git diff, resource tracking and sync options before enabling pruning.",
            "issue": "Unexpected resource deletion or stale resource"
          }
        ],
        "explanation": "Automated sync applies Git changes and pruning removes resources no longer declared when enabled.",
        "heading": "Automated Sync and Pruning"
      }
    ],
    "description": "Practical ArgoCD revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "ArgoCD Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "helm lint ./mychart",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect template syntax, required values, helper templates and Kubernetes API compatibility.",
            "issue": "Chart rendering fails"
          }
        ],
        "explanation": "Helm charts package Kubernetes manifests using templates, metadata and default values.",
        "heading": "Charts and Templates"
      },
      {
        "commands": "helm get values myrelease -a",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check chart defaults, values files, override order and rendered manifests.",
            "issue": "Deployment uses an unexpected configuration"
          }
        ],
        "explanation": "Values files and command-line overrides customize chart deployments.",
        "heading": "Values and Overrides"
      },
      {
        "commands": "helm history myrelease",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect release status, hook jobs, Kubernetes events and failed revision before rollback.",
            "issue": "Upgrade fails or release is pending"
          }
        ],
        "explanation": "Helm releases track installed chart revisions and support upgrades, history and rollback.",
        "heading": "Release Lifecycle"
      },
      {
        "commands": "helm dependency update ./mychart",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Verify Chart.yaml dependency declarations, repository URLs, versions and packaged charts.",
            "issue": "Dependency chart is missing"
          }
        ],
        "explanation": "Chart dependencies package other charts and are resolved through chart repositories or local dependencies.",
        "heading": "Dependencies"
      },
      {
        "commands": "helm rollback myrelease 2",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect hook annotations, job logs, timeout, deletion policy and external side effects.",
            "issue": "Hook job blocks an upgrade"
          }
        ],
        "explanation": "Helm hooks execute lifecycle jobs while rollback restores a previous release revision.",
        "heading": "Hooks and Rollbacks"
      }
    ],
    "description": "Practical Helm revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Helm Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "promtool check config prometheus.yml",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check target URL, network reachability, exporter process, scrape path and authentication.",
            "issue": "Target is DOWN"
          }
        ],
        "explanation": "Prometheus periodically scrapes configured HTTP metrics endpoints and stores time-series data.",
        "heading": "Prometheus Scraping"
      },
      {
        "commands": "up{job='node-exporter'}",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Verify metric name, labels, scrape interval, time range and target availability.",
            "issue": "Query returns no data"
          }
        ],
        "explanation": "PromQL selects and aggregates time-series data for dashboards and alerts.",
        "heading": "PromQL"
      },
      {
        "commands": "promtool check rules alerts.yml",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check expression, evaluation interval, threshold, labels, pending duration and data availability.",
            "issue": "Expected alert does not fire"
          }
        ],
        "explanation": "Recording and alerting rules calculate derived metrics and evaluate alert conditions.",
        "heading": "Alerting Rules"
      },
      {
        "commands": "curl http://localhost:9090/api/v1/targets",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect discovery configuration, relabeling, permissions, labels and discovery refresh.",
            "issue": "New service is missing from targets"
          }
        ],
        "explanation": "Service discovery dynamically identifies scrape targets from infrastructure or orchestration platforms.",
        "heading": "Service Discovery"
      },
      {
        "commands": "prometheus --storage.tsdb.retention.time=15d",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Review retention, cardinality, high-volume labels, scrape frequency and persistent volume capacity.",
            "issue": "Disk usage grows rapidly"
          }
        ],
        "explanation": "Prometheus stores time-series blocks locally and applies configured retention and compaction.",
        "heading": "Retention and Storage"
      }
    ],
    "description": "Practical Prometheus revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Prometheus Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "Grafana dashboard settings",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect panel query, datasource, time range, variables, labels and query inspector.",
            "issue": "Panel displays No Data"
          }
        ],
        "explanation": "Grafana dashboards visualize metrics through panels, queries, variables and transformations.",
        "heading": "Dashboards and Panels"
      },
      {
        "commands": "Grafana > Connections > Data sources",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Verify URL, credentials, TLS, network path and backend service health.",
            "issue": "Datasource connection test fails"
          }
        ],
        "explanation": "Data sources connect Grafana to Prometheus, Loki, databases and other observability systems.",
        "heading": "Data Sources"
      },
      {
        "commands": "Grafana > Alerting > Alert rules",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect rule state, evaluation errors, contact point, notification policy and delivery logs.",
            "issue": "Alert notification is not delivered"
          }
        ],
        "explanation": "Grafana alert rules evaluate queries and route notifications through contact points and policies.",
        "heading": "Alerting"
      },
      {
        "commands": "Grafana dashboard > Settings > Variables",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check variable query, datasource, refresh mode, label names and dependency order.",
            "issue": "Dashboard variable dropdown is empty"
          }
        ],
        "explanation": "Dashboard variables dynamically filter queries and enable reusable dashboards.",
        "heading": "Variables and Templating"
      },
      {
        "commands": "Grafana > Administration > Users and access",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check organization, team membership, folder permissions, datasource permissions and role.",
            "issue": "User cannot view a dashboard"
          }
        ],
        "explanation": "Grafana roles and folder/dashboard permissions control access to observability data.",
        "heading": "Authentication and Permissions"
      }
    ],
    "description": "Practical Grafana revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Grafana Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "aws eks describe-cluster --name my-cluster",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check cluster endpoint, kubeconfig context, network access, IAM authentication and cluster status.",
            "issue": "kubectl cannot connect to cluster"
          }
        ],
        "explanation": "EKS provides a managed Kubernetes control plane integrated with AWS networking and IAM.",
        "heading": "EKS Cluster Control Plane"
      },
      {
        "commands": "aws eks list-access-entries --cluster-name my-cluster",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Verify access entry, associated access policy, namespace scope and Kubernetes RBAC.",
            "issue": "AWS identity receives Kubernetes Forbidden"
          }
        ],
        "explanation": "EKS access combines AWS IAM identities with Kubernetes authorization.",
        "heading": "IAM and Access Entries"
      },
      {
        "commands": "kubectl -n kube-system logs daemonset/aws-node",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect subnet free IPs, ENI limits, CNI logs, prefix delegation and warm IP settings.",
            "issue": "Pods remain in ContainerCreating due to IP exhaustion"
          }
        ],
        "explanation": "Amazon VPC CNI assigns VPC IP addresses to Kubernetes Pods and manages ENI networking.",
        "heading": "VPC CNI Networking"
      },
      {
        "commands": "aws eks describe-nodegroup --cluster-name my-cluster --nodegroup-name workers",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check node IAM role, bootstrap configuration, subnet routes, security groups and AMI compatibility.",
            "issue": "Nodes fail to join the cluster"
          }
        ],
        "explanation": "Managed node groups provision and maintain EC2 worker nodes for EKS workloads.",
        "heading": "Node Groups"
      },
      {
        "commands": "kubectl logs -n kube-system deployment/aws-load-balancer-controller",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check controller IAM policy, subnet tags, ingress class, annotations and controller events.",
            "issue": "Ingress does not create an ALB"
          }
        ],
        "explanation": "AWS Load Balancer Controller provisions ALBs and NLBs from Kubernetes service and ingress resources.",
        "heading": "Load Balancers and Ingress"
      }
    ],
    "description": "Practical EKS revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "EKS Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "mvn dependency:tree",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect coordinates, repository configuration, version conflicts, mirrors and network access.",
            "issue": "Dependency resolution fails"
          }
        ],
        "explanation": "Maven uses pom.xml to define project coordinates, dependencies, plugins and build configuration.",
        "heading": "POM and Dependencies"
      },
      {
        "commands": "mvn clean verify",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Identify failed phase, compiler output, test reports, JDK version and plugin configuration.",
            "issue": "Build fails during test or package phase"
          }
        ],
        "explanation": "Maven lifecycle phases execute ordered goals for validation, compilation, testing, packaging and installation.",
        "heading": "Build Lifecycle"
      },
      {
        "commands": "mvn help:effective-settings",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check repository URL, credentials, mirror settings, proxy, TLS and artifact availability.",
            "issue": "Artifact cannot be downloaded"
          }
        ],
        "explanation": "Local and remote Maven repositories cache and distribute dependency artifacts.",
        "heading": "Repositories"
      },
      {
        "commands": "mvn help:active-profiles",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect active profiles, activation conditions, settings.xml and command-line profile selection.",
            "issue": "Wrong environment configuration is used"
          }
        ],
        "explanation": "Maven profiles activate environment-specific properties, dependencies and build settings.",
        "heading": "Profiles"
      },
      {
        "commands": "mvn -X test",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect plugin version, test naming, includes/excludes, JUnit provider and test reports.",
            "issue": "Tests are skipped or fail unexpectedly"
          }
        ],
        "explanation": "Maven plugins implement build tasks while Surefire executes unit tests.",
        "heading": "Plugins and Surefire"
      }
    ],
    "description": "Practical Maven revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Maven Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "curl -u USER https://nexus.example.com/service/rest/v1/repositories",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check repository format, deployment policy, credentials, write privileges and version rules.",
            "issue": "Artifact upload is rejected"
          }
        ],
        "explanation": "Hosted repositories store internally published packages and build artifacts.",
        "heading": "Hosted Repositories"
      },
      {
        "commands": "Nexus repository configuration",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Verify upstream URL, remote availability, routing rules, negative cache and artifact coordinates.",
            "issue": "Dependency download returns 404"
          }
        ],
        "explanation": "Proxy repositories cache artifacts from external upstream repositories.",
        "heading": "Proxy Repositories"
      },
      {
        "commands": "Nexus repository list",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect group membership, repository order, content selectors and member health.",
            "issue": "Client cannot find an artifact available in a member repository"
          }
        ],
        "explanation": "Group repositories combine multiple hosted and proxy repositories behind one endpoint.",
        "heading": "Group Repositories"
      },
      {
        "commands": "Nexus Administration > Blob Stores",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check filesystem capacity, permissions, blob store status, backup and storage health.",
            "issue": "Repository storage becomes unavailable"
          }
        ],
        "explanation": "Blob stores hold repository binary content and metadata on configured storage.",
        "heading": "Blob Stores"
      },
      {
        "commands": "Nexus Administration > Security",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check user role, privileges, repository format, token validity and cleanup policy impact.",
            "issue": "Build receives 401 or 403"
          }
        ],
        "explanation": "Nexus security controls repository access while cleanup policies remove eligible unused components.",
        "heading": "Security and Cleanup"
      }
    ],
    "description": "Practical Nexus revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Nexus Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "Jira Project settings > Issue types",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect project issue-type scheme, permissions and workflow configuration.",
            "issue": "Issue type is unavailable"
          }
        ],
        "explanation": "Jira projects organize work while issue types classify tasks, bugs, stories and epics.",
        "heading": "Projects and Issue Types"
      },
      {
        "commands": "Jira Project settings > Workflows",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check transition availability, conditions, validators, required fields and user permissions.",
            "issue": "Issue cannot transition to the next status"
          }
        ],
        "explanation": "Jira workflows define statuses, transitions, conditions, validators and post-functions.",
        "heading": "Workflows"
      },
      {
        "commands": "Jira Board settings",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect board filter, project scope, status-column mapping, sprint assignment and permissions.",
            "issue": "Issue is missing from a sprint board"
          }
        ],
        "explanation": "Boards visualize issues through columns while Scrum sprints organize time-boxed work.",
        "heading": "Boards and Sprints"
      },
      {
        "commands": "project = DEV AND statusCategory != Done",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Validate JQL syntax, field names, project permissions, saved filter sharing and query scope.",
            "issue": "Search returns unexpected results"
          }
        ],
        "explanation": "JQL queries select issues using fields, operators, functions and saved filters.",
        "heading": "JQL and Filters"
      },
      {
        "commands": "Jira Project settings > Automation",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect rule audit log, trigger, conditions, actor permissions, execution limits and integration response.",
            "issue": "Automation rule does not execute"
          }
        ],
        "explanation": "Jira automation rules trigger actions based on events, conditions and scheduled execution.",
        "heading": "Automation and Integrations"
      }
    ],
    "description": "Practical Jira revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Jira Quick Revision"
  },
  {
    "sections": [
      {
        "commands": "catalina.sh version",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect catalina.out, server.xml, Java version, port conflicts and startup permissions.",
            "issue": "Tomcat fails to start"
          }
        ],
        "explanation": "Tomcat hosts Java web applications through connectors, servlet containers, engines, hosts and contexts.",
        "heading": "Tomcat Architecture"
      },
      {
        "commands": "ls -lh /webapps",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Check WAR name, deployment logs, context path, application startup and servlet mappings.",
            "issue": "Application returns HTTP 404 after deployment"
          }
        ],
        "explanation": "Tomcat deploys web applications from WAR archives or configured application directories.",
        "heading": "WAR Deployment"
      },
      {
        "commands": "ss -lntp | grep java",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Inspect connector port, bind address, firewall, port conflict and connector configuration.",
            "issue": "Tomcat port is not accepting connections"
          }
        ],
        "explanation": "Tomcat connectors accept HTTP or AJP traffic and forward requests into the servlet engine.",
        "heading": "Connectors and Ports"
      },
      {
        "commands": "jcmd PID VM.flags",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Review heap usage, GC logs, thread count, memory leak indicators and application allocation patterns.",
            "issue": "OutOfMemoryError or frequent garbage collection"
          }
        ],
        "explanation": "Tomcat runs on the JVM and depends on heap, garbage collection, thread pools and memory configuration.",
        "heading": "JVM and Memory"
      },
      {
        "commands": "tail -f /logs/catalina.out",
        "steps": [
          "Identify the affected service, resource and environment.",
          "Check configuration, dependencies and access permissions.",
          "Run the documented inspection command and review its output.",
          "Correlate logs, events and monitoring data.",
          "Apply the smallest safe correction and verify recovery."
        ],
        "problems": [
          {
            "solution": "Correlate access and application logs, stack traces, dependency versions and recent configuration changes.",
            "issue": "HTTP 500 errors appear after deployment"
          }
        ],
        "explanation": "Tomcat logs record startup, application, access and container events.",
        "heading": "Logs and Access"
      }
    ],
    "description": "Practical Tomcat revision covering core architecture, commands, production operations and troubleshooting.",
    "title": "Tomcat Quick Revision"
  }
]

export default data;
