export interface AnsibleQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const argocdQuestions = [
  
  {
    question: "What is Argo CD primarily used for in Kubernetes environments?",
    options: [
      "Container image scanning",
      "Declarative GitOps continuous delivery",
      "Cluster network monitoring",
      "Building container images"
    ],
    answer: 1
  },
  {
    question: "What is the source of truth for the desired application state in a typical Argo CD GitOps workflow?",
    options: [
      "A running Pod",
      "The Kubernetes event log",
      "A local container image",
      "A Git repository"
    ],
    answer: 3
  },
  {
    question: "Which Argo CD component compares desired application state with live cluster state and performs reconciliation?",
    options: [
      "Application Controller",
      "Repo Server",
      "Dex",
      "Redis"
    ],
    answer: 0
  },
  {
    question: "What is the primary responsibility of the Argo CD Repo Server?",
    options: [
      "Scheduling Kubernetes Pods",
      "Issuing Kubernetes certificates",
      "Generating manifests from repository content",
      "Managing container runtime processes"
    ],
    answer: 2
  },
  {
    question: "Which Argo CD component exposes the API used by the CLI and web interface?",
    options: [
      "Application Controller",
      "Argo CD API Server",
      "Repo Server",
      "Kubernetes Scheduler"
    ],
    answer: 1
  },
  {
    question: "What does an Argo CD Application resource define?",
    options: [
      "Only a Kubernetes Service",
      "Only a container registry",
      "A Kubernetes node pool",
      "A source of manifests and a destination cluster or namespace"
    ],
    answer: 3
  },
  {
    question: "What does the Synced status indicate for an Argo CD Application?",
    options: [
      "The live resources match the desired state according to Argo CD's comparison",
      "Every Pod is necessarily healthy",
      "The Git repository has no branches",
      "Automated sync is enabled"
    ],
    answer: 0
  },
  {
    question: "What does the Healthy status represent in Argo CD?",
    options: [
      "The application has no Git commits",
      "Automated pruning is enabled",
      "The assessed health of the application's resources",
      "The repository credentials are expired"
    ],
    answer: 2
  },
  {
    question: "Which command manually synchronizes an Argo CD application?",
    options: [
      "argocd app deploy <app-name>",
      "argocd app sync <app-name>",
      "argocd app update <app-name>",
      "argocd sync create <app-name>"
    ],
    answer: 1
  },
  {
    question: "Which CLI command displays an application's details and status?",
    options: [
      "argocd app status",
      "argocd inspect <app-name>",
      "argocd app check <app-name>",
      "argocd app get <app-name>"
    ],
    answer: 3
  },
  {
    question: "Which CLI command logs in to an Argo CD server?",
    options: [
      "argocd login <server-address>",
      "argocd connect <server-address>",
      "argocd auth start <server-address>",
      "argocd server login <server-address>"
    ],
    answer: 0
  },
  {
    question: "Which command lists applications visible to the Argo CD CLI?",
    options: [
      "argocd projects",
      "argocd app get-all",
      "argocd app list",
      "argocd applications show"
    ],
    answer: 2
  },
  {
    question: "What does an OutOfSync status indicate?",
    options: [
      "The API server is necessarily unavailable",
      "The observed live state differs from the desired state",
      "The application has no destination namespace",
      "All application resources have been deleted"
    ],
    answer: 1
  },
  {
    question: "What does automated sync allow Argo CD to do?",
    options: [
      "Build container images without a build system",
      "Create Git commits automatically for every cluster change",
      "Replace Kubernetes authentication",
      "Apply eligible changes from the desired source without requiring a manual sync command"
    ],
    answer: 3
  },
  {
    question: "What is the purpose of the selfHeal option in an automated sync policy?",
    options: [
      "To correct certain live-state changes that drift from the desired Git state",
      "To restart every cluster node",
      "To automatically rewrite Git history",
      "To rotate every container image tag"
    ],
    answer: 0
  },
  {
    question: "What does the prune option permit during synchronization?",
    options: [
      "Deleting the Git repository",
      "Removing all resources in every cluster",
      "Deleting tracked resources that are no longer defined in the desired source",
      "Removing application health checks"
    ],
    answer: 2
  },
  {
    question: "What is the purpose of an AppProject in Argo CD?",
    options: [
      "To build OCI container images",
      "To define logical boundaries, permitted sources, destinations, and resource permissions",
      "To replace Kubernetes namespaces entirely",
      "To store application logs permanently"
    ],
    answer: 1
  },
  {
    question: "Which field specifies the Git repository or other supported source for an Argo CD Application?",
    options: [
      "destination",
      "syncPolicy",
      "project",
      "source"
    ],
    answer: 3
  },
  {
    question: "Which Application field identifies the target Kubernetes cluster and namespace?",
    options: [
      "destination",
      "source",
      "revision",
      "repoURL"
    ],
    answer: 0
  },
  {
    question: "What does targetRevision commonly specify in an Argo CD Application source?",
    options: [
      "The target cluster's IP address",
      "The destination namespace",
      "The Git branch, tag, commit, or applicable chart version",
      "The number of application replicas"
    ],
    answer: 2
  },

  // --- 21 to 40 ---
  {
    question: "Which configuration specifies a Helm chart's values overrides in an Argo CD Application?",
    options: [
      "destination.helm",
      "source.helm",
      "project.helm",
      "syncPolicy.helm"
    ],
    answer: 1
  },
  {
    question: "How does Argo CD commonly use Kustomize?",
    options: [
      "It uses Kustomize only to create Git repositories",
      "It replaces the Kubernetes API server",
      "It converts Pods into virtual machines",
      "It builds Kubernetes manifests from Kustomize configurations"
    ],
    answer: 3
  },
  {
    question: "What is the purpose of the argocd.argoproj.io/hook annotation?",
    options: [
      "To identify a resource as an Argo CD lifecycle hook",
      "To mark a Docker image as trusted",
      "To select a Kubernetes storage class",
      "To configure Git authentication"
    ],
    answer: 0
  },
  {
    question: "Which Argo CD hook phase runs before the normal synchronization phase?",
    options: [
      "PostSync",
      "Sync",
      "PreSync",
      "PostDelete"
    ],
    answer: 2
  },
  {
    question: "When does a PostSync hook normally run?",
    options: [
      "Before manifests are generated",
      "After successful synchronization and when the required resources are healthy",
      "Before the PreSync phase",
      "Only when synchronization fails"
    ],
    answer: 1
  },
  {
    question: "Which hook phase is designed for actions after application resources have been deleted?",
    options: [
      "PreSync",
      "Sync",
      "PostSync",
      "PostDelete"
    ],
    answer: 3
  },
  {
    question: "What is the purpose of sync waves?",
    options: [
      "To order resource synchronization using wave values",
      "To scale all Deployments simultaneously",
      "To create additional Git branches",
      "To change container registry credentials"
    ],
    answer: 0
  },
  {
    question: "Which annotation can specify the synchronization wave of a resource?",
    options: [
      "argocd.argoproj.io/sync-order",
      "argocd.argoproj.io/wave",
      "argocd.argoproj.io/sync-wave",
      "argocd.argoproj.io/sequence"
    ],
    answer: 2
  },
  {
    question: "What is the purpose of the argocd app diff command?",
    options: [
      "To delete an application",
      "To compare desired manifests with live resources",
      "To create a new AppProject",
      "To rotate cluster credentials"
    ],
    answer: 1
  },
  {
    question: "Which command refreshes an application's target state and retrieves updated source information?",
    options: [
      "argocd app reload",
      "argocd app rebuild",
      "argocd app restart",
      "argocd app get <app-name> --refresh"
    ],
    answer: 3
  },
  {
    question: "What is the purpose of the hard refresh option in Argo CD?",
    options: [
      "To refresh application information while also invalidating relevant cached manifest and cluster state information",
      "To delete the application permanently",
      "To restart all Kubernetes nodes",
      "To reset the Git repository to its initial commit"
    ],
    answer: 0
  },
  {
    question: "What is a common reason an Argo CD Application remains OutOfSync after a deployment?",
    options: [
      "The Kubernetes cluster has no nodes in any circumstances",
      "Argo CD cannot support YAML",
      "The live resources differ from the desired manifests or generated output",
      "Every Git repository must contain exactly one branch"
    ],
    answer: 2
  },
  {
    question: "Which configuration can tell Argo CD to ignore differences in selected resource fields?",
    options: [
      "ignoreResources",
      "ignoreDifferences",
      "skipAllDiffs",
      "bypassSync"
    ],
    answer: 1
  },
  {
    question: "What is the main purpose of the CreateNamespace sync option?",
    options: [
      "To create a Git branch",
      "To create a container registry",
      "To create a new Kubernetes cluster",
      "To create the destination namespace when it does not exist"
    ],
    answer: 3
  },
  {
    question: "Which setting can permit Argo CD to replace resources during synchronization rather than updating them in place?",
    options: [
      "Replace=true",
      "Prune=false",
      "SelfHeal=true",
      "Validate=false"
    ],
    answer: 0
  },
  {
    question: "What does the ServerSideApply=true sync option enable?",
    options: [
      "Application synchronization only through SSH",
      "Client-side patching without the Kubernetes API",
      "Server-side apply behavior for supported resource operations",
      "Automatic container image building"
    ],
    answer: 2
  },
  {
    question: "What is the purpose of an Argo CD ApplicationSet?",
    options: [
      "To replace the Kubernetes Deployment controller",
      "To generate and manage multiple Application resources from generators and a template",
      "To store Git credentials in plain text",
      "To build container images"
    ],
    answer: 1
  },
  {
    question: "Which ApplicationSet generator is designed to create applications from a list of explicit parameter values?",
    options: [
      "Cluster generator",
      "Pull Request generator",
      "Git generator only",
      "List generator"
    ],
    answer: 3
  },
  {
    question: "What is a key use of the ApplicationSet Cluster generator?",
    options: [
      "Generating applications based on registered clusters and their metadata",
      "Creating Linux virtual machines",
      "Scanning images for vulnerabilities",
      "Creating Git commits from live resources"
    ],
    answer: 0
  },
  {
    question: "What does the ApplicationSet Git generator commonly use to discover application definitions?",
    options: [
      "Kubernetes events only",
      "Docker image layers",
      "Git repository directories or files",
      "Node CPU utilization"
    ],
    answer: 2
  },

  // --- 41 to 60 ---
  {
    question: "What is the purpose of Argo CD resource health assessment?",
    options: [
      "To measure Git server disk capacity",
      "To determine the health status of managed resources",
      "To scan every container image for malware",
      "To rotate Kubernetes certificates automatically"
    ],
    answer: 1
  },
  {
    question: "What is the role of Dex in common Argo CD installations?",
    options: [
      "Generating Kubernetes manifests",
      "Reconciling live resources",
      "Managing container storage",
      "Providing an identity service that can integrate with external identity providers"
    ],
    answer: 3
  },
  {
    question: "Which Argo CD capability supports role-based authorization for users and groups?",
    options: [
      "RBAC",
      "Kustomize",
      "Sync waves",
      "Manifest generation"
    ],
    answer: 0
  },
  {
    question: "Where are Argo CD local account and RBAC settings commonly configured?",
    options: [
      "The default Deployment image",
      "The Git commit message",
      "The argocd-cm and argocd-rbac-cm ConfigMaps, as applicable",
      "The Docker daemon configuration"
    ],
    answer: 2
  },
  {
    question: "Which resource commonly stores Argo CD repository credentials within Kubernetes?",
    options: [
      "ConfigMap containing plaintext passwords by default",
      "A Kubernetes Secret",
      "A Pod annotation",
      "A Service account name alone"
    ],
    answer: 1
  },
  {
    question: "What is an important security practice for Argo CD repository credentials?",
    options: [
      "Print credentials in application logs",
      "Commit credentials directly to public Git repositories",
      "Give every user unrestricted administrative access",
      "Use least-privilege credentials and manage secrets securely"
    ],
    answer: 3
  },
  {
    question: "What is the purpose of the argocd cluster add command?",
    options: [
      "To register a Kubernetes cluster with Argo CD for management",
      "To create a Git repository",
      "To install a container runtime",
      "To create a Helm chart"
    ],
    answer: 0
  },
  {
    question: "What does the Argo CD CLI command argocd app rollback historically provide for supported applications and configurations?",
    options: [
      "It permanently deletes all application resources",
      "It changes the Kubernetes API version globally",
      "It rolls back an application to a previous deployment history entry, subject to command and configuration constraints",
      "It rewrites the Git repository's commit history"
    ],
    answer: 2
  },
  {
    question: "Which tool is designed to support progressive delivery strategies such as canary and blue-green deployments?",
    options: [
      "Argo Events",
      "Argo Rollouts",
      "Argo CD Repo Server",
      "Dex"
    ],
    answer: 1
  },
  {
    question: "What is the purpose of sync windows in Argo CD?",
    options: [
      "To control when synchronization is permitted or denied",
      "To schedule Kubernetes node reboots",
      "To limit Git repository storage",
      "To control container image build duration"
    ],
    answer: 0
  },
  {
    question: "Which CLI command lists repositories configured in Argo CD?",
    options: [
      "argocd repo show-all",
      "argocd repository list",
      "argocd repo list",
      "argocd app repo list"
    ],
    answer: 2
  },
  {
    question: "What does the argocd app history command display?",
    options: [
      "Kubernetes audit logs",
      "Application deployment history",
      "Git server configuration",
      "Container vulnerability reports"
    ],
    answer: 1
  },
  {
    question: "Which CLI command terminates an ongoing application operation?",
    options: [
      "argocd app stop <app-name>",
      "argocd app cancel-sync <app-name>",
      "argocd app kill <app-name>",
      "argocd app terminate-op <app-name>"
    ],
    answer: 3
  },
  {
    question: "What is the purpose of the argocd app wait command?",
    options: [
      "To wait until specified application conditions are satisfied",
      "To pause the Kubernetes scheduler",
      "To delay Git commits",
      "To restart the API server"
    ],
    answer: 0
  },
  {
    question: "What can the argocd app logs command help an operator inspect?",
    options: [
      "Git server logs exclusively",
      "Kubernetes audit logs exclusively",
      "Logs from application containers",
      "Git commit history only"
    ],
    answer: 2
  },
  {
    question: "What is the primary purpose of Argo CD Notifications?",
    options: [
      "To replace the Application Controller",
      "To send event-driven notifications about application events and status",
      "To build container images",
      "To encrypt all Kubernetes resources automatically"
    ],
    answer: 1
  },
  {
    question: "Which event can trigger an Argo CD notification?",
    options: [
      "A developer opening a terminal",
      "A local file being renamed",
      "A Docker image being built without an application event",
      "An application reaching a configured health or synchronization condition"
    ],
    answer: 3
  },
  {
    question: "What is the purpose of the App of Apps pattern?",
    options: [
      "To manage multiple Argo CD Applications through a parent Application",
      "To combine all application containers into one image",
      "To replace every Application with one Pod",
      "To store Git commits in a ConfigMap"
    ],
    answer: 0
  },
  {
    question: "What is an important security consideration for the App of Apps pattern?",
    options: [
      "Child Applications cannot use separate namespaces",
      "Every child Application must use the same cluster",
      "Control access to the parent Application and the child Application definitions it manages",
      "The pattern eliminates the need for Git"
    ],
    answer: 2
  },
  {
    question: "What is the purpose of the resources finalizer on an Argo CD Application?",
    options: [
      "To encrypt the Git repository",
      "To enable cascading deletion of managed resources when the Application is deleted",
      "To configure single sign-on",
      "To scale application Pods automatically"
    ],
    answer: 1
  },

  // --- 61 to 80 ---
  {
    question: "What can happen when an Argo CD Application is deleted without cascading resource deletion?",
    options: [
      "The entire Kubernetes cluster is deleted",
      "All resources in every namespace are deleted",
      "The Git repository is automatically removed",
      "The managed Kubernetes resources may remain in the cluster"
    ],
    answer: 3
  },
  {
    question: "What are orphaned resources in an Argo CD project?",
    options: [
      "Resources in the project scope that are not managed by an Application in that project",
      "Resources that have no container image",
      "Resources that always have failed health checks",
      "Resources that exist only in Git"
    ],
    answer: 0
  },
  {
    question: "What is the purpose of orphaned resource monitoring?",
    options: [
      "To rebuild every container image",
      "To disable automated synchronization",
      "To help identify unmanaged resources within the configured project scope",
      "To delete every resource without labels"
    ],
    answer: 2
  },
  {
    question: "Which configuration helps restrict where an Argo CD Application can deploy resources?",
    options: [
      "source.targetRevision alone",
      "Application destination settings and AppProject destination restrictions",
      "metadata.generateName",
      "syncPolicy.automated alone"
    ],
    answer: 1
  },
  {
    question: "Why should production AppProjects restrict permitted source repositories?",
    options: [
      "To force every application to use Docker Hub",
      "To prevent Git from storing YAML files",
      "To disable Kubernetes namespaces",
      "To prevent unapproved repositories from supplying deployment manifests"
    ],
    answer: 3
  },
  {
    question: "What is the purpose of destinations in an AppProject?",
    options: [
      "To restrict the clusters and namespaces where project applications may deploy",
      "To define notification templates",
      "To select a Git merge strategy",
      "To build container images"
    ],
    answer: 0
  },
  {
    question: "How can Argo CD authenticate to a private Git repository?",
    options: [
      "By disabling repository authentication",
      "By making the Kubernetes API public",
      "By configuring supported credentials such as an SSH key or HTTPS token",
      "By embedding passwords in every Kubernetes manifest"
    ],
    answer: 2
  },
  {
    question: "What is the purpose of repository credential templates in Argo CD?",
    options: [
      "To generate Kubernetes node certificates",
      "To reuse credentials for repositories matching configured URL prefixes",
      "To configure Pod health checks",
      "To change Git commit history"
    ],
    answer: 1
  },
  {
    question: "Why is a read-only Git deploy key useful for Argo CD?",
    options: [
      "It automatically grants cluster-admin permissions",
      "It disables TLS verification",
      "It makes all Git branches writable",
      "It limits repository access to reading when write access is unnecessary"
    ],
    answer: 3
  },
  {
    question: "What should you investigate when Argo CD cannot access a private repository?",
    options: [
      "Repository URL, credentials, network connectivity, host verification, and permissions",
      "Only the application replica count",
      "Only the browser cache",
      "Only the Kubernetes Service type"
    ],
    answer: 0
  },
  {
    question: "What is the purpose of an Argo CD Config Management Plugin?",
    options: [
      "To replace the Kubernetes API server",
      "To manage physical network switches",
      "To generate or customize manifests through a supported custom workflow",
      "To store Git commits inside container layers"
    ],
    answer: 2
  },
  {
    question: "Why must custom manifest-generation plugins be secured carefully?",
    options: [
      "They always disable Kubernetes RBAC",
      "They may execute code and access data within their execution environment",
      "They cannot read repository files",
      "They only perform harmless YAML formatting"
    ],
    answer: 1
  },
  {
    question: "How does Argo CD commonly handle Helm applications?",
    options: [
      "It always requires helm install to manage the release lifecycle",
      "It converts Helm charts into Docker images",
      "It requires every chart to be publicly hosted",
      "It renders Helm templates into manifests and manages the resulting resources"
    ],
    answer: 3
  },
  {
    question: "Which Argo CD Application source field specifies Helm value files?",
    options: [
      "source.helm.valueFiles",
      "destination.valueFiles",
      "project.helmFiles",
      "syncPolicy.valueFiles"
    ],
    answer: 0
  },
  {
    question: "What is the purpose of Helm value parameters in an Argo CD Application?",
    options: [
      "To configure cluster authentication",
      "To override selected Helm chart values during manifest generation",
      "To modify Git commit history",
      "To replace the Application destination"
    ],
    answer: 1
  },
  {
    question: "What is a key benefit of Kustomize overlays?",
    options: [
      "They eliminate Kubernetes manifests",
      "They require identical configuration in every environment",
      "They automatically provision cloud accounts",
      "They allow environment-specific customization while reusing a shared base"
    ],
    answer: 3
  },
  {
    question: "What can happen if Argo CD cannot generate manifests from a configured source?",
    options: [
      "The Application can report a manifest-generation error",
      "The Kubernetes scheduler automatically fixes the source",
      "All application Pods become healthy",
      "Argo CD automatically converts every chart to Kustomize"
    ],
    answer: 0
  },
  {
    question: "What does the ignoreDifferences setting configure in an Argo CD Application?",
    options: [
      "Which Git users may create commits",
      "Which container images can be built",
      "Which specified resource fields should be ignored during diff comparison",
      "Which Kubernetes nodes can run workloads"
    ],
    answer: 2
  },
  {
    question: "An Application is Synced, but its Pods are unhealthy. What should you investigate?",
    options: [
      "Only the Git repository README",
      "Pod events, container logs, probes, image availability, and application configuration",
      "The Argo CD UI theme",
      "Only the number of Git branches"
    ],
    answer: 1
  },
  {
    question: "What commonly causes an Argo CD Application to remain in Progressing health?",
    options: [
      "The Git repository has a valid commit",
      "The Application has a configured project",
      "The CLI is installed on a developer laptop",
      "A managed resource has not reached its expected health condition"
    ],
    answer: 3
  },

  // --- 81 to 100 (Newly added unique questions) ---
  {
    question: "Synchronization fails because of a Kubernetes permission error. What should you check?",
    options: [
      "The identity Argo CD uses and the relevant Kubernetes RBAC permissions",
      "The web interface color scheme",
      "The number of Git branches",
      "The developer laptop screen resolution"
    ],
    answer: 0
  },
  {
    question: "Why can an update to an immutable Kubernetes field fail during synchronization?",
    options: [
      "Argo CD does not support YAML",
      "Every Kubernetes field is immutable",
      "Kubernetes rejects changes to fields that cannot be modified after resource creation",
      "Git cannot store resource specifications"
    ],
    answer: 2
  },
  {
    question: "What should be considered before enabling automated pruning in production?",
    options: [
      "Whether the Application name contains a hyphen",
      "Whether deleting resources removed from Git is safe and reviewed",
      "Whether all Git commits have the same author",
      "Whether the browser supports HTTPS"
    ],
    answer: 1
  },
  {
    question: "What is a key benefit of Git-based promotion between development, staging, and production?",
    options: [
      "It eliminates the need for testing",
      "It bypasses version control",
      "It guarantees every deployment succeeds",
      "It provides reviewable, versioned changes to deployment configuration"
    ],
    answer: 3
  },
  {
    question: "Why are immutable image references useful for production deployments?",
    options: [
      "They improve reproducibility and reduce ambiguity caused by mutable image tags",
      "They disable Kubernetes image pulling",
      "They prevent every possible rollback",
      "They eliminate security scanning"
    ],
    answer: 0
  },
  {
    question: "Why integrate Argo CD with an external secrets-management solution?",
    options: [
      "To commit all production passwords into Git",
      "To disable application authentication",
      "To manage sensitive values without unnecessarily exposing plaintext secrets in repositories",
      "To remove all Kubernetes Secrets"
    ],
    answer: 2
  },
  {
    question: "Which statement about Kubernetes Secrets is correct?",
    options: [
      "Base64 encoding alone provides strong encryption",
      "Secrets need appropriate access controls and encryption-at-rest configuration where required",
      "Every Kubernetes user can read every Secret",
      "Secrets never appear in backups"
    ],
    answer: 1
  },
  {
    question: "What is the purpose of a Git webhook integration with Argo CD?",
    options: [
      "To replace the Kubernetes API",
      "To grant every Git user cluster-admin permissions",
      "To force every Application to synchronize",
      "To notify Argo CD of repository changes and prompt an earlier refresh"
    ],
    answer: 3
  },
  {
    question: "What is the primary role of Redis in common Argo CD installations?",
    options: [
      "Providing caching to improve performance",
      "Acting as the Kubernetes scheduler",
      "Replacing the Git repository as the source of truth",
      "Building container images"
    ],
    answer: 0
  },
  {
    question: "Why might a large Argo CD installation use Application Controller sharding?",
    options: [
      "To disable synchronization across clusters",
      "To merge all managed clusters into one",
      "To distribute reconciliation workload across controller shards",
      "To replace Kubernetes RBAC with Git permissions"
    ],
    answer: 2
  },
  {
    question: "What is the main benefit of deploying Argo CD with high availability?",
    options: [
      "It guarantees defect-free application code",
      "It reduces disruption from failures of supported Argo CD components",
      "It eliminates every Kubernetes control-plane failure",
      "It removes the need for backups"
    ],
    answer: 1
  },
  {
    question: "What should be considered before upgrading Argo CD in production?",
    options: [
      "Custom plugins never have compatibility concerns",
      "Every version can be upgraded in any order",
      "The Git repository must be deleted first",
      "Version compatibility, upgrade guidance, backups, integrations, and rollback planning"
    ],
    answer: 3
  },
  {
    question: "How can separate AppProjects benefit different teams?",
    options: [
      "They help isolate deployment permissions and restrict permitted sources and destinations",
      "They eliminate every cluster security risk",
      "They require every team to share credentials",
      "They prevent teams from using Git"
    ],
    answer: 0
  },
  {
    question: "What is the purpose of analysis templates in Argo Rollouts?",
    options: [
      "To generate Git commit messages",
      "To configure Argo CD repository credentials",
      "To evaluate metrics or analysis results that inform rollout decisions",
      "To replace Kubernetes Services with Git branches"
    ],
    answer: 2
  },
  {
    question: "How does Argo CD commonly differ from a push-based deployment pipeline?",
    options: [
      "Argo CD cannot deploy Kubernetes resources",
      "It reconciles the desired state from a configured source through a controller",
      "It requires every deployment to be manual",
      "It does not support automated synchronization"
    ],
    answer: 1
  },
  {
    question: "An Application is OutOfSync unexpectedly. What is the best initial troubleshooting approach?",
    options: [
      "Delete the Kubernetes cluster",
      "Disable all health checks",
      "Rotate every credential immediately",
      "Inspect the diff, generated manifests, target revision, and live resource changes"
    ],
    answer: 3
  },
  {
    question: "Which practice best supports secure GitOps operations?",
    options: [
      "Review Git changes, restrict permissions, monitor status, and test deployment procedures",
      "Allow unreviewed production changes from any repository",
      "Store credentials in public manifests",
      "Disable monitoring after deployment"
    ],
    answer: 0
  },
  {
    question: "Which CLI command displays the installed Argo CD client and server versions?",
    options: [
      "argocd version-info",
      "argocd app version",
      "argocd version",
      "argocd server inspect-version"
    ],
    answer: 2
  },
  {
    question: "Why should Argo CD API access be protected with authentication and network controls?",
    options: [
      "The API only displays static documentation",
      "Authorized API operations can affect application deployments and cluster resources",
      "Authentication prevents Git commits",
      "Network controls automatically repair unhealthy Pods"
    ],
    answer: 1
  },
  {
    question: "What is the function of the argocd app diff command when tracking changes?",
    options: [
      "It shows the difference between the target state in Git and the live state in the cluster",
      "It deletes differing resources",
      "It generates a new Git branch",
      "It checks the health status of pods"
    ],
    answer: 0
  }
];
