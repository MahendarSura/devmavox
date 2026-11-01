const data = {
  "sections": [
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Use least-privilege policies and temporary role credentials. Check policy evaluation, trust relationships and CloudTrail when access is denied.\nCheck subnet routes, security groups, network ACLs and DNS when instances cannot communicate.\nInspect instance status checks, system logs, CPU, memory, security groups and boot configuration.\nCheck bucket policies, IAM permissions, encryption, versioning and lifecycle rules when access fails.\nCheck connection limits, subnet groups, security groups, storage, failover events and database metrics.\nInspect listener rules, target health, health-check path, port and backend response.\nReview scaling metrics, cooldown, launch templates, quotas and health-check replacement behaviour.\nCheck metric dimensions, alarm thresholds, log retention and missing-data treatment.\nUse event history to identify the principal, API action, timestamp, source IP and error.\nCheck record type, TTL, hosted zone, delegation and DNS resolution from multiple resolvers.",
      "heading": "AWS - Important Comparisons",
      "explanation": "AWS comparison notes. IAM vs VPC: IAM controls authentication and authorization through users, groups, roles and policies. A VPC is an isolated virtual network containing subnets, route tables and network controls. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nEC2 vs S3: EC2 provides virtual compute instances with selectable instance types, storage and networking. S3 is object storage organized into buckets and objects. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nRDS vs Load Balancer: RDS is a managed relational database service. Elastic Load Balancing distributes requests across registered targets. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nAuto Scaling vs CloudWatch: Auto Scaling adjusts compute capacity based on policies and desired capacity. CloudWatch collects metrics, logs and alarms for AWS resources and applications. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nCloudTrail vs Route 53: CloudTrail records AWS API activity for auditing and investigation. Route 53 provides DNS hosting, routing policies and health checks. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Use pinned base-image versions, small trusted images and vulnerability scanning.\nUse explicit base images, dependency caching, non-root users and multi-stage builds.\nInspect exit code, entrypoint, environment, resource limits and application output.\nCheck mount paths, ownership, permissions and backup/restore procedures.\nCheck network membership, DNS names, exposed ports and host firewall rules.\nCheck image tags, authentication, repository permissions and image digest.\nCopy only required artifacts into the final stage to reduce size and attack surface.\nChoose a meaningful endpoint and distinguish process-running from application-ready.\nInspect memory usage, OOM kills, CPU throttling and configured limits.\nSend logs to a central platform and write application logs to stdout/stderr.",
      "heading": "Docker - Important Comparisons",
      "explanation": "Docker comparison notes. Image vs Dockerfile: An image is a layered, immutable template used to create containers. A Dockerfile describes repeatable image build instructions. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nContainer vs Volumes: A container is an isolated running process created from an image. Volumes persist data independently of a container lifecycle. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nNetworking vs Registry: Docker networks allow containers to communicate using network isolation. A registry stores and distributes container images. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nMulti-stage Build vs Health Check: Multi-stage builds separate compilation tools from the final runtime image. A health check reports whether the container application is functioning. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nResource Limits vs Logging: CPU and memory limits prevent one container from exhausting host resources. Container logs expose application output for diagnosis. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Inspect pod events, container status, probes, node assignment and previous container logs.\nCheck desired versus available replicas, rollout history and readiness failures.\nCheck selectors, endpoints, target port, network policies and DNS.\nVerify mounted keys, environment variables and whether a restart is required after changes.\nRestrict RBAC access, enable encryption at rest and avoid exposing secret values in logs.\nCheck ingress controller, host rules, TLS secret, DNS and backend service port.\nUse readiness for traffic eligibility and liveness for restart decisions; avoid aggressive thresholds.\nInspect requests, taints, tolerations, affinity, available capacity and scheduling events.\nCheck metrics API, resource requests, target utilization and scaling limits.\nUse least privilege and verify the identity and verb/resource combination.",
      "heading": "Kubernetes - Important Comparisons",
      "explanation": "Kubernetes comparison notes. Pod vs Deployment: A Pod is the smallest deployable Kubernetes workload unit. A Deployment manages stateless application replicas and rolling updates. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nService vs ConfigMap: A Service provides a stable network endpoint for selected Pods. A ConfigMap stores non-sensitive application configuration. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nSecret vs Ingress: A Secret stores sensitive configuration data in Kubernetes. Ingress defines HTTP and HTTPS routing to cluster Services. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nProbes vs Scheduler: Liveness, readiness and startup probes control container health behaviour. The scheduler assigns unscheduled Pods to suitable nodes. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nHPA vs RBAC: Horizontal Pod Autoscaler adjusts replica count based on metrics. RBAC controls access through Roles, ClusterRoles and bindings. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Keep stages in source control and validate syntax before running production jobs.\nMonitor controller resources, plugin compatibility, backups and queue length.\nCheck agent connectivity, labels, executors, workspace and required tools.\nUse separate checkout, build, test, scan, package and deploy stages.\nUse credential IDs and scoped access; never print secrets in console output.\nCheck disk space, stale files, permissions and concurrent workspace usage.\nUse traceable version numbers and retain artifacts needed for rollback.\nCheck webhook delivery, authentication, branch filters and Jenkins endpoint reachability.\nReview compatibility, security advisories and dependency requirements before upgrades.\nRestrict job permissions, isolate untrusted builds and use approval gates for production.",
      "heading": "Jenkins - Important Comparisons",
      "explanation": "Jenkins comparison notes. Jenkinsfile vs Controller: A Jenkinsfile defines a pipeline as code. The controller coordinates jobs, configuration and agents. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nAgent vs Stages: Agents execute pipeline steps outside or alongside the controller. Stages divide a pipeline into understandable phases. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nCredentials vs Workspace: Credentials store secrets used by pipeline jobs. A workspace contains files used by a build execution. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nArtifacts vs Webhooks: Artifacts are outputs retained or published after a build. Webhooks trigger builds when repository events occur. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nPlugins vs Pipeline Security: Plugins extend Jenkins functionality. Pipeline security protects execution and deployment permissions. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Use status and diff to identify changed, deleted and untracked files before committing.\nStage specific files and review the staged diff to avoid committing secrets or unrelated changes.\nUse meaningful messages and ensure the intended changes are included.\nUse short-lived feature branches and merge reviewed changes into the target branch.\nResolve conflicts carefully, run tests and inspect the merge result.\nUse it to maintain a linear local history; avoid rewriting shared public history without coordination.\nVerify fetch and push URLs, authentication and tracking branch configuration.\nUnderstand --soft, --mixed and --hard before using them; protect uncommitted work.\nUse it for targeted fixes and verify conflicts and resulting commit history.\nList and inspect stashes before applying or dropping them.",
      "heading": "Git - Important Comparisons",
      "explanation": "Git comparison notes. Working Tree vs Staging: The working tree contains the checked-out files and their modifications. The index selects changes for the next commit. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nCommit vs Branch: A commit records a snapshot and metadata in repository history. A branch is a movable reference to a line of development. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nMerge vs Rebase: Merge integrates histories from different branches. Rebase replays commits on top of another base commit. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nRemote vs Reset: A remote identifies another repository location. Reset moves HEAD and may change the index or working tree. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nCherry-pick vs Stash: Cherry-pick applies a selected commit onto the current branch. Stash temporarily stores uncommitted changes. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Pin provider versions and inspect authentication and provider configuration.\nReview arguments, dependencies, lifecycle behaviour and planned changes.\nProtect state access, use remote state and locking, and never edit state manually without a recovery plan.\nReview creates, updates, deletes and replacements before approval.\nUse reviewed plans and verify resulting resources in both Terraform and the cloud platform.\nDefine clear inputs, outputs, versions and responsibility boundaries.\nConfigure access control, encryption, locking and recovery for remote state.\nWrite matching configuration and review the plan after import.\nRun plans regularly and determine whether configuration or the real resource should change.\nUse create_before_destroy and prevent_destroy only when their effects are understood.",
      "heading": "Terraform - Important Comparisons",
      "explanation": "Terraform comparison notes. Provider vs Resource: A provider connects Terraform to an infrastructure API. A resource represents an infrastructure object managed by Terraform. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nState vs Plan: State maps Terraform configuration to real infrastructure objects. Plan previews proposed infrastructure changes. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nApply vs Module: Apply executes approved infrastructure changes. A module groups reusable Terraform configuration. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nBackend vs Import: A backend stores Terraform state. Import associates an existing resource with Terraform state. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nDrift vs Lifecycle: Drift occurs when real infrastructure differs from declared configuration. Lifecycle rules control resource replacement and destruction behaviour. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Validate hostnames, variables, connection settings and group membership.\nUse readable task names, clear variables and controlled execution order.\nChoose purpose-built modules instead of shell commands where possible.\nKeep roles focused and define documented inputs and dependencies.\nUse handlers for service restarts so unchanged systems are not restarted unnecessarily.\nUse gathered facts carefully and disable gathering only when it is unnecessary.\nUnderstand precedence and avoid storing secrets in plain text.\nProtect vault passwords and test encrypted data access in automation.\nPrefer state-based modules and investigate tasks that report changes every run.\nGrant minimum required privileges and validate sudo policy on target hosts.",
      "heading": "Ansible - Important Comparisons",
      "explanation": "Ansible comparison notes. Inventory vs Playbook: Inventory defines the hosts and groups Ansible manages. A playbook defines automation plays and tasks. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nModule vs Role: Modules perform operations on managed hosts. A role packages reusable tasks, handlers, templates and defaults. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nHandler vs Facts: A handler runs when notified by a changed task. Facts describe properties discovered from managed hosts. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nVariables vs Vault: Variables parameterize playbooks and roles. Ansible Vault encrypts sensitive data files or variables. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nIdempotency vs Privilege Escalation: Idempotency means repeated runs converge on the same intended state. Become allows tasks to run with elevated privileges. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Inspect service state, dependencies, exit status and journal messages.\nCheck CPU, memory, process state, parent process and open files.\nCheck owner, group, mode bits, ACLs and parent directory permissions.\nCheck mount points, inode usage, filesystem errors and capacity.\nCheck available memory, swap activity, OOM events and process usage.\nCheck IP addresses, routes, DNS, listening ports and firewall rules.\nCheck daemon status, key permissions, authorized keys and authentication logs.\nFilter logs by unit, time and severity to correlate a failure.\nCheck crontab syntax, execution user, environment and command output.\nCheck repository configuration, package locks and version compatibility.",
      "heading": "Linux - Important Comparisons",
      "explanation": "Linux comparison notes. systemd vs Processes: systemd manages services and system startup on many Linux distributions. Processes are running program instances managed by the kernel. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nPermissions vs Filesystem: Linux permissions control read, write and execute access. Filesystems organize data on mounted storage devices. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nMemory vs Networking: Linux memory management uses RAM, caches and swap. Linux networking manages interfaces, routes, sockets and name resolution. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nSSH vs Logs: SSH provides encrypted remote login and command execution. System logs record events from services and applications. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nCron vs Package Management: Cron schedules recurring commands. Package managers install and update software with dependency tracking. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Review commits and pull requests as the change audit trail.\nVerify source path, target revision, destination and project permissions.\nReview diffs and sync options before applying production changes.\nInspect the diff and identify manual changes, controller changes or configuration drift.\nInspect unhealthy resources and their Kubernetes events rather than relying only on application status.\nCheck repository access, revision availability, Helm/Kustomize errors and cache issues.\nCheck controller logs, resource tracking and reconciliation status.\nUse project boundaries to enforce environment and team separation.\nPrefer reverting Git changes so the desired state remains auditable.\nUse an approved secret-management integration and restrict repository access.",
      "heading": "ArgoCD - Important Comparisons",
      "explanation": "ArgoCD comparison notes. GitOps vs Application: GitOps uses Git as the source of truth for desired infrastructure and application state. An Argo CD Application maps a repository path and revision to a destination cluster and namespace. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nSync vs OutOfSync: Sync applies the desired manifests from Git to the cluster. OutOfSync means live resources differ from the desired Git state. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nHealth vs Repo Server: Health reports the operational state of managed resources. Repo server fetches repositories and renders manifests. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nApplication Controller vs Projects: The controller compares desired and live state and coordinates synchronization. Projects restrict allowed repositories, clusters and namespaces. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nRollback vs Secrets: Rollback restores a previous known-good revision or deployment state. GitOps secret handling must avoid exposing plaintext credentials in Git. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Keep chart structure predictable and validate dependencies.\nReview precedence among defaults, values files and command-line overrides.\nRender templates locally and inspect the generated YAML before deployment.\nTrack release name, namespace, chart version and revision history.\nReview rendered changes and use controlled rollout and timeout settings.\nInspect release history and validate application health after rollback.\nPin dependency versions and update the dependency lock consistently.\nUse hooks carefully because failures and deletion policies affect release operations.\nAvoid passing secrets in visible command history and protect release storage.\nUse linting, template rendering and integration tests in CI.",
      "heading": "Helm - Important Comparisons",
      "explanation": "Helm comparison notes. Chart vs Values: A chart is a package containing templates, defaults and metadata. Values provide configuration inputs to chart templates. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nTemplates vs Release: Templates generate Kubernetes manifests from chart inputs. A release is an installed instance of a chart. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nUpgrade vs Rollback: Upgrade changes an existing release to a new chart or configuration. Rollback returns a release to a previous revision. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nDependencies vs Hooks: Chart dependencies package related charts together. Hooks run Kubernetes resources at defined release lifecycle points. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nSecrets vs Testing: Helm release data may contain sensitive configuration. Chart tests validate expected release behaviour. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Check target reachability, scrape path, port, interval and TLS settings.\nVerify exporter health and metric names before configuring dashboards.\nCheck labels, time range, rate windows and aggregation dimensions.\nAvoid unbounded values such as request IDs because they create high cardinality.\nValidate expression results, pending duration and alert labels.\nCheck routing tree, receiver configuration, inhibition and notification delivery.\nMonitor retention, disk capacity, compaction and cardinality.\nCheck discovered labels, relabeling rules and target state.\nUse them for expensive repeated queries and validate naming conventions.\nValidate YAML and reload safely after changes.",
      "heading": "Prometheus - Important Comparisons",
      "explanation": "Prometheus comparison notes. Scraping vs Exporter: Prometheus periodically retrieves metrics from configured targets. An exporter exposes metrics from a system or application. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nPromQL vs Labels: PromQL queries time-series data using selectors and functions. Labels identify and group metric time series. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nAlert Rules vs Alertmanager: Alert rules evaluate expressions and create firing alerts. Alertmanager groups, routes, silences and sends alerts. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nTSDB vs Service Discovery: The time-series database stores metric samples. Service discovery dynamically identifies scrape targets. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nRecording Rules vs Configuration: Recording rules precompute frequently used expressions. Prometheus configuration defines scrape jobs and rule files. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Test connectivity, credentials, TLS and query permissions.\nUse consistent naming, variables and documented ownership.\nCheck query output, units, time range and transformation settings.\nValidate variable queries and avoid excessively expensive refresh behaviour.\nCheck evaluation state, contact points, notification policies and error messages.\nStore provisioning files in version control and validate startup logs.\nConnect deployment events to metric changes during incident analysis.\nApply role-based access and avoid sharing administrative credentials.\nUse it to test queries before adding them to dashboards.\nReduce expensive queries, use appropriate intervals and avoid excessive panels.",
      "heading": "Grafana - Important Comparisons",
      "explanation": "Grafana comparison notes. Data Source vs Dashboard: A data source connects Grafana to a metrics, logs or database backend. A dashboard groups panels into an operational view. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nPanel vs Variables: A panel visualizes a query result. Variables make dashboards reusable across services and environments. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nAlerting vs Provisioning: Grafana alerting evaluates rules and routes notifications. Provisioning manages data sources and dashboards as configuration. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nAnnotations vs Permissions: Annotations mark deployments and important events on graphs. Grafana permissions control access to folders, dashboards and data sources. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nExplore vs Performance: Explore supports ad hoc query investigation. Dashboard performance depends on query cost and data volume. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Inspect cluster status, endpoint access and control-plane logs.\nCheck desired capacity, instance health, launch template and scaling events.\nVerify identity mapping, access entries and Kubernetes RBAC permissions.\nInvestigate subnet IP capacity, CNI logs and security group rules.\nRefresh context and verify the selected cluster before operating.\nCheck IAM permissions, controller logs, subnet tags and ingress/service annotations.\nCheck pending Pods, node group limits, IAM permissions and autoscaler logs.\nCheck storage classes, PVC events, IAM permissions and availability zones.\nTrace traffic across subnet routes, CNI, network policies and load balancer targets.\nEnable required control-plane logs and monitor nodes, Pods and AWS dependencies.",
      "heading": "EKS - Important Comparisons",
      "explanation": "EKS comparison notes. Control Plane vs Node Group: EKS manages the Kubernetes API server and control-plane components. Managed node groups provision and manage EC2 worker nodes. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nIAM Access vs VPC CNI: IAM identities and EKS access configuration govern cluster access. The VPC CNI assigns VPC IP addresses to Pods. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nKubeconfig vs Load Balancer Controller: Kubeconfig defines cluster connection and authentication settings. The controller provisions AWS load balancers for Kubernetes resources. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nCluster Autoscaler vs Storage: Cluster Autoscaler adjusts node groups when Pods cannot be scheduled. EKS uses CSI drivers to integrate persistent storage. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nNetworking vs Observability: EKS networking combines VPC routing, security groups and Kubernetes networking. EKS observability combines control-plane, node and workload telemetry. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Inspect effective POM and inherited properties when behaviour differs between environments.\nUnderstand phase order and which goals execute at each phase.\nInspect scopes, transitive dependencies and version conflicts.\nCheck repository URLs, credentials, proxy and artifact availability.\nPin plugin versions and inspect plugin configuration and compatibility.\nInspect reports, fork settings and test environment when tests fail.\nCheck activation conditions and avoid embedding production secrets.\nVerify artifact contents, version and reproducibility.\nProtect credentials and check mirror definitions when downloads fail.\nRead the first meaningful error and identify the failing lifecycle phase.",
      "heading": "Maven - Important Comparisons",
      "explanation": "Maven comparison notes. POM vs Lifecycle: pom.xml defines project metadata, dependencies and build configuration. Maven lifecycle phases coordinate validation, compilation, testing and packaging. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nDependency vs Repository: Dependencies provide libraries required by the project. Repositories provide artifacts for dependency resolution. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nPlugin vs Surefire: Plugins implement build goals and lifecycle tasks. Surefire runs unit tests during the test phase. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nProfiles vs Packaging: Profiles activate environment-specific build configuration. Packaging produces JAR, WAR or other build artifacts. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nSettings vs Build Failure: settings.xml configures mirrors, servers and user-level Maven options. Build failures can originate from compilation, tests, plugins or dependency resolution. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Check deployment permissions, repository format and version policy.\nCheck remote URL, connectivity, credentials and cache behaviour.\nReview member order and repository content availability.\nVerify coordinates, permissions, checksum and response status.\nTest policy criteria and retention requirements before execution.\nMonitor disk capacity, integrity and backup procedures.\nApply least privilege and investigate 401 versus 403 responses separately.\nCheck cache age, negative cache and upstream availability.\nUse scoped tokens, secure transport and documented endpoints.\nCoordinate database and blob-store recovery procedures and test restores.",
      "heading": "Nexus - Important Comparisons",
      "explanation": "Nexus comparison notes. Hosted Repository vs Proxy Repository: A hosted repository stores artifacts uploaded by an organization. A proxy repository caches artifacts from an upstream repository. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nGroup Repository vs Artifact Upload: A group repository combines multiple repositories behind one endpoint. Artifact upload publishes a versioned build output. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nCleanup Policy vs Blob Store: Cleanup policies remove eligible unused components. Blob stores hold repository binary content. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nPrivileges vs Proxy Cache: Privileges restrict repository and administrative actions. Proxy caching stores remote artifacts for later requests. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nREST API vs Backup: The REST API supports repository administration and automation. Backup protects repository configuration and artifact data. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Use issue type, status, priority, assignee and history to understand work state.\nInspect conditions, validators, permissions and transition rules when an issue cannot move.\nCheck saved filters, status mapping and swimlane configuration.\nReview scope, capacity, blockers and incomplete work before closing.\nValidate field names, permissions and query scope when results are missing.\nInspect audit logs, rule actor permissions, loops and execution limits.\nCheck project role membership and issue security levels.\nUse clear component leads and consistent assignment rules.\nUse scoped credentials, pagination and rate-limit handling.\nValidate filters, date ranges and status mappings before sharing metrics.",
      "heading": "Jira - Important Comparisons",
      "explanation": "Jira comparison notes. Issue vs Workflow: An issue represents work such as a task, bug or story. A workflow defines statuses and allowed transitions. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nBoard vs Sprint: A board visualizes work using filters and column mappings. A sprint is a time-boxed planning and delivery period. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nJQL vs Automation: JQL searches issues using fields, operators and functions. Automation rules trigger actions based on events and conditions. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nPermissions vs Components: Permission schemes determine who can view and modify project issues. Components organize work into project areas with ownership. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nREST API vs Reports: The REST API integrates Jira with external tools. Reports summarize project progress and delivery information. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    },
    {
      "steps": [
        "Identify the requirement before choosing a component.",
        "Compare purpose, operational responsibility and dependencies.",
        "Evaluate security, failure behaviour and recovery.",
        "Test the selected approach before production."
      ],
      "problems": [
        {
          "solution": "Revisit the architecture and compare the responsibilities of the components. Test the correct combination and document the decision.",
          "issue": "A component is selected for a responsibility it was not designed to handle."
        }
      ],
      "commands": "Inspect heap, garbage collection, thread count and JVM options.\nCheck port binding, protocol, TLS and connection settings.\nInvestigate busy threads, slow requests, database waits and pool limits.\nCheck archive contents, context path, permissions and deployment logs.\nVerify context path, resource configuration and deployment descriptor.\nUse status codes, request duration and client information to identify patterns.\nCheck pool exhaustion, connection validation and database availability.\nVerify certificate chain, expiry, connector configuration and supported protocols.\nInvestigate heap usage, garbage collection pauses and memory leaks.\nInspect catalina logs, application logs, Java version and deployment permissions.",
      "heading": "Tomcat - Important Comparisons",
      "explanation": "Tomcat comparison notes. JVM vs Connector: The JVM executes Java bytecode and manages runtime memory. A connector accepts client connections using HTTP or HTTPS. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nThread Pool vs WAR Deployment: Tomcat worker threads process incoming requests. A WAR file packages a web application for deployment. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nContext vs Access Logs: A context configures an application inside Tomcat. Access logs record incoming HTTP requests and response details. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nJDBC Pool vs TLS: A JDBC pool manages reusable database connections. TLS encrypts client-server communication. Choose based on the responsibility and requirement; these components solve different parts of the workflow.\n\nHeap vs Deployment Failure: The Java heap stores objects allocated by the application. Deployment failures may result from application, dependency or configuration errors. Choose based on the responsibility and requirement; these components solve different parts of the workflow.",
      "config": "Document the decision, limitations, security impact and rollback approach."
    }
  ],
  "description": "Tool-specific component comparisons and practical design considerations.",
  "title": "DevOps Important Comparisons"
}

export default data;
