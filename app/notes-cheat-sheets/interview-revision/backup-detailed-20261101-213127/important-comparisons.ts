const data = {
  "sections": [
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "aws sts get-caller-identity\naws ec2 describe-instances\naws s3 ls",
      "heading": "AWS - Important Comparisons",
      "explanation": "Compare different implementation choices in AWS based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Cloud infrastructure, EC2, VPC, IAM, S3, RDS, ELB, Auto Scaling and CloudWatch.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "docker build -t app:1.0 .\ndocker ps -a\ndocker logs <container>\ndocker inspect <container>",
      "heading": "Docker - Important Comparisons",
      "explanation": "Compare different implementation choices in Docker based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Container images, Dockerfiles, registries, containers, networks and volumes.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "kubectl get pods -A\nkubectl describe pod <pod>\nkubectl logs <pod> --previous\nkubectl get events -A",
      "heading": "Kubernetes - Important Comparisons",
      "explanation": "Compare different implementation choices in Kubernetes based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Pods, Deployments, ReplicaSets, Services, ConfigMaps, Secrets, probes and scheduling.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "java -version\ngit status\njenkins-cli help",
      "heading": "Jenkins - Important Comparisons",
      "explanation": "Compare different implementation choices in Jenkins based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Controllers, agents, Jenkinsfiles, pipeline stages, credentials, plugins and artifacts.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "git status\ngit log --oneline --graph\ngit diff\ngit branch -a\ngit remote -v",
      "heading": "Git - Important Comparisons",
      "explanation": "Compare different implementation choices in Git based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Repositories, commits, branches, staging, merging, rebasing and remote collaboration.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "terraform fmt -check\nterraform init\nterraform validate\nterraform plan\nterraform state list",
      "heading": "Terraform - Important Comparisons",
      "explanation": "Compare different implementation choices in Terraform based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Providers, resources, modules, state, plan, apply, backend and infrastructure drift.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "ansible all -i inventory -m ping\nansible-playbook site.yml --syntax-check\nansible-playbook site.yml --check",
      "heading": "Ansible - Important Comparisons",
      "explanation": "Compare different implementation choices in Ansible based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Inventory, playbooks, tasks, modules, variables, handlers, roles and idempotency.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "systemctl status <service>\njournalctl -u <service> -n 100\ntop\ndf -h\nfree -m\nss -tulpn",
      "heading": "Linux - Important Comparisons",
      "explanation": "Compare different implementation choices in Linux based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Processes, systemd, users, permissions, filesystems, networking, memory and storage.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "argocd app list\nargocd app get <app>\nargocd app diff <app>\nargocd app sync <app>",
      "heading": "ArgoCD - Important Comparisons",
      "explanation": "Compare different implementation choices in ArgoCD based on functionality, security, performance, availability, cost and operational complexity. Its main areas include GitOps, application definitions, desired state, synchronization, health and drift.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "helm lint ./chart\nhelm template app ./chart\nhelm list -A\nhelm history app\nhelm rollback app 1",
      "heading": "Helm - Important Comparisons",
      "explanation": "Compare different implementation choices in Helm based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Charts, templates, values, releases, upgrades, rollback and Kubernetes packaging.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "promtool check config prometheus.yml\ncurl http://localhost:9090/-/healthy\ncurl http://localhost:9090/api/v1/targets",
      "heading": "Prometheus - Important Comparisons",
      "explanation": "Compare different implementation choices in Prometheus based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Metrics scraping, exporters, time series, labels, PromQL, recording rules and alerts.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "grafana-server -v\ncurl http://localhost:3000/api/health",
      "heading": "Grafana - Important Comparisons",
      "explanation": "Compare different implementation choices in Grafana based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Data sources, dashboards, panels, queries, variables and alerting.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "aws eks describe-cluster --name <cluster>\naws eks update-kubeconfig --name <cluster>\nkubectl get nodes",
      "heading": "EKS - Important Comparisons",
      "explanation": "Compare different implementation choices in EKS based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Managed Kubernetes control plane, node groups, IAM, VPC CNI and AWS integrations.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "mvn validate\nmvn clean test\nmvn package\nmvn dependency:tree",
      "heading": "Maven - Important Comparisons",
      "explanation": "Compare different implementation choices in Maven based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Java project lifecycle, POM, dependency management, plugins, tests and packaging.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "curl -I https://<nexus-host>/service/rest/v1/status",
      "heading": "Nexus - Important Comparisons",
      "explanation": "Compare different implementation choices in Nexus based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Hosted, proxy and group repositories for storing and distributing artifacts.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "curl -u user:token https://<jira-host>/rest/api/3/myself",
      "heading": "Jira - Important Comparisons",
      "explanation": "Compare different implementation choices in Jira based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Projects, issues, workflows, boards, sprints, automation and reporting.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    },
    {
      "steps": [
        "Identify the actual project requirement.",
        "Compare available approaches and limitations.",
        "Evaluate security and failure recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Review workload, architecture, limits, permissions and failure scenarios. Test an alternative and compare the results.",
          "issue": "Selected implementation does not meet production requirements."
        }
      ],
      "commands": "catalina.sh version\ncatalina.sh configtest\ncurl -I http://localhost:8080/",
      "heading": "Tomcat - Important Comparisons",
      "explanation": "Compare different implementation choices in Tomcat based on functionality, security, performance, availability, cost and operational complexity. Its main areas include Java web application runtime, JVM, connectors, thread pools, WAR deployment and access logs.",
      "config": "Document the selected design, alternatives, trade-offs and rollback procedure."
    }
  ],
  "description": "Technical comparison and design revision notes for DevOps tools.",
  "title": "DevOps Important Comparisons"
}

export default data;
