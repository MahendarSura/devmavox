const data = {
  "sections": [
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect CloudWatch, CloudTrail, VPC Flow Logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "IAM AccessDenied, EC2 unreachable, unhealthy load balancer targets, S3 permission errors."
        }
      ],
      "commands": "aws sts get-caller-identity\naws ec2 describe-instances\naws s3 ls",
      "heading": "AWS - Quick Revision",
      "explanation": "AWS is used for Cloud infrastructure, EC2, VPC, IAM, S3, RDS, ELB, Auto Scaling and CloudWatch. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect Container stdout/stderr, docker logs and daemon logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "Crash or exit, image pull failure, port conflict, volume permissions and network errors."
        }
      ],
      "commands": "docker build -t app:1.0 .\ndocker ps -a\ndocker logs <container>\ndocker inspect <container>",
      "heading": "Docker - Quick Revision",
      "explanation": "Docker is used for Container images, Dockerfiles, registries, containers, networks and volumes. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect Pod logs, Kubernetes events, kubelet and control-plane logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "CrashLoopBackOff, ImagePullBackOff, Pending pods, failed probes and service connectivity."
        }
      ],
      "commands": "kubectl get pods -A\nkubectl describe pod <pod>\nkubectl logs <pod> --previous\nkubectl get events -A",
      "heading": "Kubernetes - Quick Revision",
      "explanation": "Kubernetes is used for Pods, Deployments, ReplicaSets, Services, ConfigMaps, Secrets, probes and scheduling. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect Build console output, Jenkins system logs, agent and plugin logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "Offline agent, failed stage, credentials error, plugin conflict and workspace problems."
        }
      ],
      "commands": "java -version\ngit status\njenkins-cli help",
      "heading": "Jenkins - Quick Revision",
      "explanation": "Jenkins is used for Controllers, agents, Jenkinsfiles, pipeline stages, credentials, plugins and artifacts. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect Git command output, hooks, CI logs and repository audit logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "Merge conflicts, rejected push, detached HEAD and authentication errors."
        }
      ],
      "commands": "git status\ngit log --oneline --graph\ngit diff\ngit branch -a\ngit remote -v",
      "heading": "Git - Quick Revision",
      "explanation": "Git is used for Repositories, commits, branches, staging, merging, rebasing and remote collaboration. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect Terraform CLI output, provider logs and cloud audit logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "State lock, drift, provider errors, dependency cycles and unexpected resource replacement."
        }
      ],
      "commands": "terraform fmt -check\nterraform init\nterraform validate\nterraform plan\nterraform state list",
      "heading": "Terraform - Quick Revision",
      "explanation": "Terraform is used for Providers, resources, modules, state, plan, apply, backend and infrastructure drift. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect Playbook output, SSH logs and target system logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "Unreachable hosts, privilege escalation, undefined variables and non-idempotent tasks."
        }
      ],
      "commands": "ansible all -i inventory -m ping\nansible-playbook site.yml --syntax-check\nansible-playbook site.yml --check",
      "heading": "Ansible - Quick Revision",
      "explanation": "Ansible is used for Inventory, playbooks, tasks, modules, variables, handlers, roles and idempotency. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect journalctl, /var/log/messages, /var/log/syslog and application logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "Service failure, disk full, high CPU, memory pressure and permission errors."
        }
      ],
      "commands": "systemctl status <service>\njournalctl -u <service> -n 100\ntop\ndf -h\nfree -m\nss -tulpn",
      "heading": "Linux - Quick Revision",
      "explanation": "Linux is used for Processes, systemd, users, permissions, filesystems, networking, memory and storage. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect Application events, repo-server and application-controller logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "OutOfSync, SyncFailed, repository authentication and degraded application health."
        }
      ],
      "commands": "argocd app list\nargocd app get <app>\nargocd app diff <app>\nargocd app sync <app>",
      "heading": "ArgoCD - Quick Revision",
      "explanation": "ArgoCD is used for GitOps, application definitions, desired state, synchronization, health and drift. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect Helm output, rendered manifests and Kubernetes events. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "Template errors, values mismatch, failed upgrade and pending release."
        }
      ],
      "commands": "helm lint ./chart\nhelm template app ./chart\nhelm list -A\nhelm history app\nhelm rollback app 1",
      "heading": "Helm - Quick Revision",
      "explanation": "Helm is used for Charts, templates, values, releases, upgrades, rollback and Kubernetes packaging. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect Prometheus server logs, scrape errors and Alertmanager logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "Target down, missing metrics, high cardinality and alerts not firing."
        }
      ],
      "commands": "promtool check config prometheus.yml\ncurl http://localhost:9090/-/healthy\ncurl http://localhost:9090/api/v1/targets",
      "heading": "Prometheus - Quick Revision",
      "explanation": "Prometheus is used for Metrics scraping, exporters, time series, labels, PromQL, recording rules and alerts. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect Grafana server logs, datasource errors and alert evaluation logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "No data, datasource timeout, dashboard query errors and notification failure."
        }
      ],
      "commands": "grafana-server -v\ncurl http://localhost:3000/api/health",
      "heading": "Grafana - Quick Revision",
      "explanation": "Grafana is used for Data sources, dashboards, panels, queries, variables and alerting. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect EKS control-plane logs, CloudWatch, kubelet and VPC CNI logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "Node NotReady, IAM access denied, CNI IP exhaustion and load balancer failures."
        }
      ],
      "commands": "aws eks describe-cluster --name <cluster>\naws eks update-kubeconfig --name <cluster>\nkubectl get nodes",
      "heading": "EKS - Quick Revision",
      "explanation": "EKS is used for Managed Kubernetes control plane, node groups, IAM, VPC CNI and AWS integrations. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect Maven output and Surefire test reports. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "Dependency resolution, compilation, test failures and plugin version conflicts."
        }
      ],
      "commands": "mvn validate\nmvn clean test\nmvn package\nmvn dependency:tree",
      "heading": "Maven - Quick Revision",
      "explanation": "Maven is used for Java project lifecycle, POM, dependency management, plugins, tests and packaging. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect Nexus application, request, audit and storage logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "401/403 errors, upload failure, proxy cache issues and disk exhaustion."
        }
      ],
      "commands": "curl -I https://<nexus-host>/service/rest/v1/status",
      "heading": "Nexus - Quick Revision",
      "explanation": "Nexus is used for Hosted, proxy and group repositories for storing and distributing artifacts. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect Jira application, audit and automation logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "Permission denied, blocked transitions, automation failures and integration errors."
        }
      ],
      "commands": "curl -u user:token https://<jira-host>/rest/api/3/myself",
      "heading": "Jira - Quick Revision",
      "explanation": "Jira is used for Projects, issues, workflows, boards, sprints, automation and reporting. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    },
    {
      "steps": [
        "Understand the architecture and components.",
        "Check dependencies and access permissions.",
        "Validate configuration before making changes.",
        "Monitor health, performance and errors.",
        "Document recovery and rollback procedures."
      ],
      "problems": [
        {
          "solution": "Read the exact error and timestamp. Inspect catalina.out, localhost logs and access logs. Check configuration, permissions, connectivity, resources and recent changes. Fix the root cause and verify the service.",
          "issue": "HTTP 404/500, port conflict, deployment failure and thread exhaustion."
        }
      ],
      "commands": "catalina.sh version\ncatalina.sh configtest\ncurl -I http://localhost:8080/",
      "heading": "Tomcat - Quick Revision",
      "explanation": "Tomcat is used for Java web application runtime, JVM, connectors, thread pools, WAR deployment and access logs. Review its architecture, dependencies, security, monitoring and recovery procedures.",
      "config": "Keep configuration under version control. Separate environment settings and protect credentials. Test changes before production."
    }
  ],
  "description": "Quick revision reference for 17 DevOps tools.",
  "title": "DevOps Quick Revision Notes"
}

export default data;
