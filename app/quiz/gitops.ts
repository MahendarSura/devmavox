export interface gitopsQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const gitopsQuestions: gitopsQuestion[] = [
  {
    id: "gitops-1",
    question: "What is GitOps?",
    options: [
      "Managing infrastructure and application deployments through Git as the source of truth",
      "Managing only Git branches",
      "Replacing Kubernetes with Git",
      "Manually deploying applications on servers"
    ],
    answer: 0
  },
  {
    id: "gitops-2",
    question: "What is the primary principle of GitOps?",
    options: [
      "Deploy every change without review",
      "Keep the desired system state declared in version control",
      "Store production passwords in Git",
      "Allow manual changes without tracking"
    ],
    answer: 1
  },
  {
    id: "gitops-3",
    question: "What does source of truth mean in GitOps?",
    options: [
      "The Kubernetes worker node",
      "The container registry",
      "The Git repository containing the approved desired configuration",
      "The developer's local machine"
    ],
    answer: 2
  },
  {
    id: "gitops-4",
    question: "Which tool is commonly used for GitOps-based Kubernetes deployments?",
    options: [
      "Apache Maven",
      "SonarQube",
      "Jira",
      "Argo CD"
    ],
    answer: 3
  },
  {
    id: "gitops-5",
    question: "What is declarative configuration?",
    options: [
      "Describing the desired end state rather than every manual step",
      "Executing commands manually on each server",
      "Writing only shell scripts",
      "Creating containers without configuration"
    ],
    answer: 0
  },
  {
    id: "gitops-6",
    question: "What is reconciliation in GitOps?",
    options: [
      "Deleting the Git repository",
      "Comparing actual state with desired state and correcting differences",
      "Building a Docker image",
      "Creating a pull request automatically"
    ],
    answer: 1
  },
  {
    id: "gitops-7",
    question: "What is configuration drift?",
    options: [
      "A Git commit message",
      "A container image build",
      "A difference between the declared desired state and actual deployed state",
      "A Kubernetes namespace"
    ],
    answer: 2
  },
  {
    id: "gitops-8",
    question: "A developer manually changes a Deployment replica count in Kubernetes. What should GitOps do?",
    options: [
      "Always delete the entire cluster",
      "Ignore the difference permanently",
      "Modify the Git history automatically",
      "Detect the drift and reconcile according to the configured policy"
    ],
    answer: 3
  },
  {
    id: "gitops-9",
    question: "What is a pull-based GitOps model?",
    options: [
      "An agent inside or near the target environment observes Git and reconciles changes",
      "A developer manually copies files to servers",
      "A registry pushes images directly into Git",
      "A monitoring system edits application source code"
    ],
    answer: 0
  },
  {
    id: "gitops-10",
    question: "What is a push-based deployment model?",
    options: [
      "A cluster continuously reads Git without an external deployment system",
      "An external CI/CD system sends deployment changes to the target environment",
      "Kubernetes pushes source code to developers",
      "A user manually edits every Pod"
    ],
    answer: 1
  },
  {
    id: "gitops-11",
    question: "Why is pull-based GitOps often preferred for production clusters?",
    options: [
      "It eliminates the need for Kubernetes",
      "It guarantees that applications never fail",
      "The cluster-side controller can reconcile changes without giving CI broad cluster credentials",
      "It removes the need for Git"
    ],
    answer: 2
  },
  {
    id: "gitops-12",
    question: "What is the role of CI in a GitOps workflow?",
    options: [
      "Continuously modify live production resources manually",
      "Replace the Kubernetes API server",
      "Store all production secrets in source code",
      "Build, test, scan, and publish artifacts or propose configuration changes"
    ],
    answer: 3
  },
  {
    id: "gitops-13",
    question: "What is the role of CD in a pull-based GitOps workflow?",
    options: [
      "Reconcile the approved desired state into the target environment",
      "Write application unit tests only",
      "Manage employee access cards",
      "Replace source control"
    ],
    answer: 0
  },
  {
    id: "gitops-14",
    question: "Which repository structure is commonly used to separate application source from deployment configuration?",
    options: [
      "Only one local folder with no version control",
      "Separate application and configuration repositories",
      "A single container image containing every environment's secrets",
      "A monitoring dashboard repository only"
    ],
    answer: 1
  },
  {
    id: "gitops-15",
    question: "Why should production configuration changes go through pull requests?",
    options: [
      "To make every deployment slower",
      "To prevent all configuration changes",
      "To provide review, traceability, and controlled approval",
      "To bypass automated testing"
    ],
    answer: 2
  },
  {
    id: "gitops-16",
    question: "What is a GitOps reconciliation loop?",
    options: [
      "A one-time manual deployment",
      "A process that runs only when a developer opens an editor",
      "A process that builds source code but never checks the cluster",
      "A repeated process that observes differences and works toward the desired state"
    ],
    answer: 3
  },
  {
    id: "gitops-17",
    question: "What does idempotency mean in declarative deployment?",
    options: [
      "Repeated application of the same desired configuration converges to the same intended state",
      "Every deployment must create duplicate resources",
      "Every sync must change the application version",
      "The system can only deploy once"
    ],
    answer: 0
  },
  {
    id: "gitops-18",
    question: "Why should GitOps deployments be auditable?",
    options: [
      "To hide who changed production",
      "To identify what changed, who approved it, and when it was deployed",
      "To remove all commit history",
      "To avoid incident investigations"
    ],
    answer: 1
  },
  {
    id: "gitops-19",
    question: "What should happen before an untested configuration change reaches production?",
    options: [
      "Apply it directly to the cluster",
      "Disable all monitoring",
      "Validate and test it through the required delivery workflow",
      "Delete the staging environment"
    ],
    answer: 2
  },
  {
    id: "gitops-20",
    question: "Which statement about GitOps is correct?",
    options: [
      "GitOps works only with one cloud provider",
      "GitOps eliminates the need for monitoring",
      "GitOps guarantees zero downtime without additional design",
      "GitOps improves repeatability and traceability but does not guarantee application health"
    ],
    answer: 3
  },
  {
    id: "gitops-21",
    question: "In Argo CD, what does an Application resource define?",
    options: [
      "The source configuration, destination cluster or namespace, and deployment settings",
      "A developer's Git password",
      "A Docker build cache only",
      "A Kubernetes worker node"
    ],
    answer: 0
  },
  {
    id: "gitops-22",
    question: "What does Argo CD's Synced status generally indicate?",
    options: [
      "Every application request succeeds",
      "The live resources match the desired configuration Argo CD compares",
      "All container images are vulnerability-free",
      "The cluster has no failed Pods"
    ],
    answer: 1
  },
  {
    id: "gitops-23",
    question: "What does Argo CD's OutOfSync status mean?",
    options: [
      "The Git repository has been deleted",
      "The application is always down",
      "The compared live state differs from the desired state",
      "The Kubernetes API is permanently unavailable"
    ],
    answer: 2
  },
  {
    id: "gitops-24",
    question: "What does Argo CD's Healthy status indicate?",
    options: [
      "The Git repository has no open pull requests",
      "The latest image has been rebuilt",
      "The application has passed every business test",
      "The evaluated resource health checks indicate a healthy state"
    ],
    answer: 3
  },
  {
    id: "gitops-25",
    question: "An Argo CD Application is Synced but Degraded. What does this suggest?",
    options: [
      "The desired configuration may be applied, but one or more resources are unhealthy",
      "Git credentials are definitely invalid",
      "All application features are working",
      "The cluster has no resources"
    ],
    answer: 0
  },
  {
    id: "gitops-26",
    question: "What is the difference between automated sync and manual sync in Argo CD?",
    options: [
      "Manual sync always deletes resources",
      "Automated sync applies eligible detected changes automatically; manual sync requires an operator action",
      "There is no difference",
      "Automated sync works only with virtual machines"
    ],
    answer: 1
  },
  {
    id: "gitops-27",
    question: "What does selfHeal generally do in Argo CD automated sync?",
    options: [
      "Rebuild every image on each sync",
      "Delete the source repository",
      "Reconcile certain live-state changes that diverge from Git",
      "Automatically fix every application bug"
    ],
    answer: 2
  },
  {
    id: "gitops-28",
    question: "What does prune mean in Argo CD?",
    options: [
      "Increase the number of replicas",
      "Rebuild the Git history",
      "Restart the Kubernetes API server",
      "Delete managed resources that are no longer declared in the desired configuration, when pruning is enabled"
    ],
    answer: 3
  },
  {
    id: "gitops-29",
    question: "What is the risk of enabling automated pruning?",
    options: [
      "Resources removed from the desired configuration may be deleted",
      "Git commits become impossible",
      "Container images cannot be pulled",
      "Monitoring metrics stop automatically"
    ],
    answer: 0
  },
  {
    id: "gitops-30",
    question: "What is the purpose of Argo CD's refresh and hard refresh operations?",
    options: [
      "Change application source code",
      "Refresh application comparison information; hard refresh also refreshes relevant cached manifest and cluster state information",
      "Delete all cluster resources",
      "Rotate every cloud credential"
    ],
    answer: 1
  },
  {
    id: "gitops-31",
    question: "Argo CD cannot generate manifests from a repository. What should you inspect first?",
    options: [
      "The laptop screen resolution",
      "The number of GitHub stars",
      "Repository access, path, revision, and manifest-generation errors",
      "The production website's logo"
    ],
    answer: 2
  },
  {
    id: "gitops-32",
    question: "Argo CD reports that a repository is inaccessible. Which investigation is most useful?",
    options: [
      "Increase application replicas immediately",
      "Delete all Application resources",
      "Disable TLS verification permanently",
      "Check repository URL, credentials, network access, and certificate trust"
    ],
    answer: 3
  },
  {
    id: "gitops-33",
    question: "What is an Argo CD AppProject used for?",
    options: [
      "Restricting permitted source repositories, destinations, and resource kinds",
      "Building Docker images",
      "Replacing Kubernetes namespaces entirely",
      "Creating Git commits automatically"
    ],
    answer: 0
  },
  {
    id: "gitops-34",
    question: "Why use Argo CD RBAC?",
    options: [
      "To allow every user to administer production",
      "To control which users and groups can perform specific Argo CD actions",
      "To encrypt every container image automatically",
      "To replace all cloud IAM policies"
    ],
    answer: 1
  },
  {
    id: "gitops-35",
    question: "What is the purpose of an Argo CD ApplicationSet?",
    options: [
      "To store application logs permanently",
      "To replace all Git repositories with one file",
      "To generate and manage multiple Application resources from defined generators and templates",
      "To build a Kubernetes kernel"
    ],
    answer: 2
  },
  {
    id: "gitops-36",
    question: "What is an Argo CD sync wave used for?",
    options: [
      "Compressing container images",
      "Encrypting Git commits",
      "Scaling worker nodes based on CPU",
      "Ordering resource application across configured synchronization phases or waves"
    ],
    answer: 3
  },
  {
    id: "gitops-37",
    question: "Why might an Argo CD resource health status remain Progressing?",
    options: [
      "The resource has not yet met its health criteria, or the health evaluation has not completed",
      "The Git server must always be offline",
      "The cluster must be deleted",
      "Every Progressing resource is necessarily a security breach"
    ],
    answer: 0
  },
  {
    id: "gitops-38",
    question: "An Argo CD sync fails with a Kubernetes Forbidden error. What should you investigate?",
    options: [
      "The Git commit message style",
      "The destination identity's RBAC permissions and resource restrictions",
      "The browser cache only",
      "The application's marketing description"
    ],
    answer: 1
  },
  {
    id: "gitops-39",
    question: "Why can an Argo CD application remain OutOfSync after a successful sync?",
    options: [
      "Git is no longer needed",
      "A successful sync always means every resource is healthy",
      "Mutating webhooks, controllers, ignored fields, or other live changes may cause differences",
      "OutOfSync always means the source repository is empty"
    ],
    answer: 2
  },
  {
    id: "gitops-40",
    question: "What is a safe first step when an Argo CD sync unexpectedly fails in production?",
    options: [
      "Delete the cluster immediately",
      "Disable all access controls",
      "Retry repeatedly without reading the error",
      "Inspect sync status, events, controller logs, and the failed resource before taking corrective action"
    ],
    answer: 3
  },
  {
    id: "gitops-41",
    question: "What is the recommended way to promote a tested application release to production?",
    options: [
      "Update the production deployment reference through the approved Git workflow",
      "Manually edit a running Pod only",
      "Copy files directly into a worker node",
      "Disable all review rules"
    ],
    answer: 0
  },
  {
    id: "gitops-42",
    question: "How should development, staging, and production configuration usually be managed?",
    options: [
      "Use identical secret values everywhere",
      "Keep environment-specific configuration explicit and controlled in versioned configuration",
      "Edit every live environment manually",
      "Store production passwords in public pull requests"
    ],
    answer: 1
  },
  {
    id: "gitops-43",
    question: "What is a common benefit of using Kustomize overlays in GitOps?",
    options: [
      "They replace Kubernetes manifests with compiled binaries",
      "They eliminate the need for a base configuration",
      "They reuse a base configuration while applying environment-specific changes",
      "They automatically resolve every application error"
    ],
    answer: 2
  },
  {
    id: "gitops-44",
    question: "What is a Helm chart in a GitOps workflow?",
    options: [
      "A Git hosting server",
      "A container runtime",
      "A Kubernetes network interface",
      "A packaged set of Kubernetes templates, defaults, and related metadata"
    ],
    answer: 3
  },
  {
    id: "gitops-45",
    question: "A new image has been pushed with the same mutable tag. Why might GitOps not deploy it?",
    options: [
      "The desired manifest may be unchanged, and the tag may resolve to a different image without an explicit configuration change",
      "Git cannot store text files",
      "Kubernetes cannot run containers",
      "Argo CD requires every image to use a different registry hostname"
    ],
    answer: 0
  },
  {
    id: "gitops-46",
    question: "Why are immutable image tags or image digests useful?",
    options: [
      "They automatically fix vulnerabilities",
      "They make the deployed artifact identifiable and reproducible",
      "They remove the need for testing",
      "They allow secrets to be embedded safely in images"
    ],
    answer: 1
  },
  {
    id: "gitops-47",
    question: "What is the purpose of separating application code changes from deployment configuration changes?",
    options: [
      "To prevent developers from testing code",
      "To eliminate release history",
      "To improve control, review, traceability, and promotion of deployment changes",
      "To make all repositories public"
    ],
    answer: 2
  },
  {
    id: "gitops-48",
    question: "A production deployment is failing after a new Git commit. What is a common GitOps rollback approach?",
    options: [
      "Delete the entire Git repository",
      "Patch the running Pod and leave Git unchanged",
      "Disable reconciliation permanently",
      "Revert or restore the desired configuration to a known-good revision through the approved workflow"
    ],
    answer: 3
  },
  {
    id: "gitops-49",
    question: "Why can directly rolling back a live deployment be temporary in GitOps?",
    options: [
      "The reconciler may reapply the state still declared in Git",
      "Git automatically deletes the Kubernetes API",
      "Kubernetes cannot roll back deployments",
      "Every rollback deletes the registry"
    ],
    answer: 0
  },
  {
    id: "gitops-50",
    question: "What should be verified before promoting a release from staging to production?",
    options: [
      "Only that the Git branch exists",
      "Tests, artifact identity, configuration, security checks, and required approvals",
      "Only that the developer can access the cluster",
      "Only that the image has a latest tag"
    ],
    answer: 1
  },
  {
    id: "gitops-51",
    question: "How should secrets be handled in GitOps repositories?",
    options: [
      "Commit plaintext passwords and restrict the repository later",
      "Put passwords directly into public Helm values",
      "Use an approved secret-management solution or encrypted secret workflow",
      "Store secrets in commit messages"
    ],
    answer: 2
  },
  {
    id: "gitops-52",
    question: "Which is a common secret-management integration for GitOps?",
    options: [
      "A plain text README",
      "A Kubernetes Service without credentials",
      "A public GitHub issue",
      "External Secrets Operator connected to a supported secrets backend"
    ],
    answer: 3
  },
  {
    id: "gitops-53",
    question: "A developer accidentally commits a production token. What should happen?",
    options: [
      "Revoke or rotate the token, assess exposure, and remove the secret safely from the repository history where appropriate",
      "Only rename the variable",
      "Assume deleting the latest commit removes all copies",
      "Leave the token active if the repository is private"
    ],
    answer: 0
  },
  {
    id: "gitops-54",
    question: "Why should GitOps controllers follow least privilege?",
    options: [
      "They need unrestricted administrator permissions everywhere",
      "Limiting permissions reduces the impact of compromised controllers or configuration",
      "It makes all deployment errors disappear",
      "It prevents resource monitoring"
    ],
    answer: 1
  },
  {
    id: "gitops-55",
    question: "Why should production branches have protection rules?",
    options: [
      "To stop all automated tests",
      "To let anyone bypass review",
      "To enforce required reviews, checks, and controlled changes",
      "To delete deployment history"
    ],
    answer: 2
  },
  {
    id: "gitops-56",
    question: "How can a GitOps workflow reduce supply-chain risk?",
    options: [
      "By disabling image scanning",
      "By trusting every image with a latest tag",
      "By downloading arbitrary artifacts during production deployment",
      "By verifying artifact provenance, scanning images, and using trusted immutable artifacts"
    ],
    answer: 3
  },
  {
    id: "gitops-57",
    question: "Why is signing container images useful?",
    options: [
      "It can help verify artifact authenticity and integrity against a trusted identity",
      "It automatically repairs application defects",
      "It replaces all access controls",
      "It guarantees an image contains no vulnerabilities"
    ],
    answer: 0
  },
  {
    id: "gitops-58",
    question: "What is the purpose of policy-as-code in GitOps?",
    options: [
      "To replace version control",
      "To evaluate configuration against defined security and compliance policies",
      "To store all application logs in Git",
      "To bypass pull-request checks"
    ],
    answer: 1
  },
  {
    id: "gitops-59",
    question: "A manifest requests privileged containers in production. What is a suitable control?",
    options: [
      "Ignore the setting if deployment succeeds",
      "Make every namespace privileged",
      "Use admission policies and Kubernetes security controls to reject or restrict unsafe configurations",
      "Disable the API server's authorization"
    ],
    answer: 2
  },
  {
    id: "gitops-60",
    question: "Why should GitOps audit logs be retained?",
    options: [
      "To store application passwords",
      "To make rollback impossible",
      "To replace health monitoring",
      "To investigate who performed actions and reconstruct relevant changes"
    ],
    answer: 3
  },
  {
    id: "gitops-61",
    question: "A Git repository is unavailable temporarily. What is an important operational consideration?",
    options: [
      "Existing workloads may continue running, but new reconciliation can be delayed until access returns",
      "Kubernetes immediately deletes every running Pod",
      "Every running container stops as soon as Git is unreachable",
      "All cluster resources become publicly accessible"
    ],
    answer: 0
  },
  {
    id: "gitops-62",
    question: "What is a practical way to reduce GitOps controller overload in a large environment?",
    options: [
      "Disable reconciliation everywhere",
      "Tune reconciliation settings, resource capacity, repository access, and application grouping",
      "Run unlimited duplicate controllers without coordination",
      "Store every manifest in a single enormous file without testing"
    ],
    answer: 1
  },
  {
    id: "gitops-63",
    question: "Why should a GitOps team monitor its own controllers?",
    options: [
      "Controllers never fail",
      "Monitoring is only for application developers",
      "Controller health, reconciliation delays, errors, and repository access affect delivery reliability",
      "It removes the need for audit logs"
    ],
    answer: 2
  },
  {
    id: "gitops-64",
    question: "A manifest fails schema validation. What should you do?",
    options: [
      "Disable all validation in production",
      "Ignore the error and repeatedly sync",
      "Delete the Git history",
      "Check the manifest syntax, API version, schema, and supported fields before applying it"
    ],
    answer: 3
  },
  {
    id: "gitops-65",
    question: "A deployment is healthy in staging but fails in production. What should you compare first?",
    options: [
      "Image digest, environment-specific values, secrets references, permissions, and resource availability",
      "Only the repository's display name",
      "Only the developer's workstation wallpaper",
      "The number of pull requests in unrelated repositories"
    ],
    answer: 0
  },
  {
    id: "gitops-66",
    question: "What can cause a Kubernetes resource to be rejected during GitOps sync?",
    options: [
      "A successful image pull alone",
      "Invalid schema, missing permissions, admission-policy rejection, or unavailable dependencies",
      "A descriptive commit message",
      "A healthy Git server"
    ],
    answer: 1
  },
  {
    id: "gitops-67",
    question: "A Kubernetes admission webhook is unavailable and blocks deployments. What is a safe response?",
    options: [
      "Disable all admission controls immediately",
      "Delete all namespaces",
      "Investigate webhook health, endpoints, certificates, and timeout configuration",
      "Commit credentials to the manifests"
    ],
    answer: 2
  },
  {
    id: "gitops-68",
    question: "Why can Kubernetes custom resources fail during GitOps synchronization?",
    options: [
      "Git cannot store YAML",
      "Every custom resource requires a Dockerfile",
      "Custom resources cannot be version controlled",
      "The required CustomResourceDefinition may not exist yet, or resource ordering may be incorrect"
    ],
    answer: 3
  },
  {
    id: "gitops-69",
    question: "A new CRD and its custom resource are deployed together. What can improve reliability?",
    options: [
      "Ensure the CRD is established before dependent resources are applied, using supported ordering or staged deployment",
      "Delete the CRD after every sync",
      "Store the CRD only on a developer's laptop",
      "Disable Kubernetes API validation"
    ],
    answer: 0
  },
  {
    id: "gitops-70",
    question: "How should teams handle intentional live fields modified by Kubernetes controllers?",
    options: [
      "Ignore every field in every resource",
      "Use carefully scoped diff-ignore or ownership configuration and retain appropriate health and policy checks",
      "Disable all reconciliation permanently",
      "Remove all controllers from the cluster"
    ],
    answer: 1
  },
  {
    id: "gitops-71",
    question: "What is a major benefit of GitOps for disaster recovery?",
    options: [
      "It makes backups unnecessary",
      "It guarantees the recovery of lost persistent data",
      "Versioned configuration can help recreate infrastructure and workloads when dependencies and data recovery are also addressed",
      "It prevents every regional outage"
    ],
    answer: 2
  },
  {
    id: "gitops-72",
    question: "What is an important consideration when managing multiple clusters with GitOps?",
    options: [
      "Give every cluster unrestricted access to all other clusters",
      "Use the same secrets and permissions everywhere without isolation",
      "Disable environment-specific policies",
      "Control cluster destinations, credentials, access boundaries, and configuration differences"
    ],
    answer: 3
  },
  {
    id: "gitops-73",
    question: "How can GitOps support a canary deployment?",
    options: [
      "Declare the intended canary configuration and coordinate rollout and promotion using suitable rollout tooling",
      "Always send all traffic to the new version immediately",
      "Remove readiness probes",
      "Edit random live Pods manually"
    ],
    answer: 0
  },
  {
    id: "gitops-74",
    question: "What is blue-green deployment?",
    options: [
      "A method for rotating Git credentials",
      "Maintaining two deployment environments and switching traffic between the current and new versions",
      "A way to compress manifests",
      "A Kubernetes storage class"
    ],
    answer: 1
  },
  {
    id: "gitops-75",
    question: "What must be considered when rolling back a database schema change?",
    options: [
      "Only the Git commit hash",
      "Whether the container image is small",
      "Schema compatibility, data changes, migration reversibility, and application-version compatibility",
      "Whether the repository has a README"
    ],
    answer: 2
  },
  {
    id: "gitops-76",
    question: "What is the purpose of progressive delivery tooling alongside GitOps?",
    options: [
      "To remove the need for Git",
      "To replace application tests",
      "To expose every release to all users immediately",
      "To control staged rollout, traffic shifting, and promotion using configured analysis or checks"
    ],
    answer: 3
  },
  {
    id: "gitops-77",
    question: "A new release passes deployment checks but error rates rise after traffic increases. What should happen?",
    options: [
      "Pause or abort promotion according to the rollout policy and investigate the failure",
      "Ignore metrics because the sync succeeded",
      "Delete all monitoring dashboards",
      "Disable the health checks permanently"
    ],
    answer: 0
  },
  {
    id: "gitops-78",
    question: "Why are readiness probes important in a GitOps-managed rollout?",
    options: [
      "They store Git credentials",
      "They help Kubernetes determine when a container is ready to receive traffic",
      "They replace all security scanning",
      "They ensure every database migration is reversible"
    ],
    answer: 1
  },
  {
    id: "gitops-79",
    question: "What is the purpose of a PodDisruptionBudget?",
    options: [
      "To define Git branch permissions",
      "To encrypt Kubernetes secrets automatically",
      "To limit voluntary disruptions within the configured availability policy",
      "To replace Deployment replicas"
    ],
    answer: 2
  },
  {
    id: "gitops-80",
    question: "Why should resource requests and limits be version controlled?",
    options: [
      "They make CPU unlimited",
      "They eliminate the need for capacity planning",
      "They guarantee no Pod will ever restart",
      "They make workload resource expectations reviewable and reproducible"
    ],
    answer: 3
  },
  {
    id: "gitops-81",
    question: "What is a common GitOps repository organization for many applications?",
    options: [
      "Use clear ownership and structure, separating shared configuration from application-specific configuration",
      "Put every environment's credentials in one public file",
      "Remove application ownership",
      "Store only screenshots of manifests"
    ],
    answer: 0
  },
  {
    id: "gitops-82",
    question: "Why can monorepo changes require careful path and ownership controls?",
    options: [
      "Monorepos cannot support GitOps",
      "A change to shared configuration may affect multiple applications and environments",
      "Every commit deploys to every cluster by definition",
      "Monorepos do not support pull requests"
    ],
    answer: 1
  },
  {
    id: "gitops-83",
    question: "How can teams prevent unapproved changes from reaching production?",
    options: [
      "Give every developer cluster-admin access",
      "Store production manifests outside version control",
      "Enforce branch protection, required checks, approvals, and restricted deployment permissions",
      "Disable all audit logs"
    ],
    answer: 2
  },
  {
    id: "gitops-84",
    question: "Why are immutable Git commit SHAs useful for deployment references?",
    options: [
      "They automatically patch vulnerabilities",
      "They eliminate the need for reviews",
      "They always point to the newest commit",
      "They identify a specific configuration revision for traceability and reproducibility"
    ],
    answer: 3
  },
  {
    id: "gitops-85",
    question: "What is the risk of tracking a moving branch for production configuration?",
    options: [
      "The desired configuration can change as new commits arrive, so the deployed revision needs clear tracking and controls",
      "Git branches cannot contain YAML",
      "Kubernetes cannot use branches",
      "A moving branch guarantees an immutable release"
    ],
    answer: 0
  },
  {
    id: "gitops-86",
    question: "A pull request changes production replicas from 10 to 1. What should a reviewer do?",
    options: [
      "Approve it automatically because it is valid YAML",
      "Assess capacity and availability impact, validate intent, and require appropriate approval",
      "Delete all monitoring data",
      "Disable deployment protections"
    ],
    answer: 1
  },
  {
    id: "gitops-87",
    question: "Why should GitOps changes be tested before merging?",
    options: [
      "To avoid keeping a deployment history",
      "To make reconciliation impossible",
      "To detect syntax, policy, compatibility, and configuration errors before deployment",
      "To remove the need for production monitoring"
    ],
    answer: 2
  },
  {
    id: "gitops-88",
    question: "What should a team do when a configuration repository contains duplicate or conflicting definitions?",
    options: [
      "Keep adding duplicates",
      "Disable schema validation everywhere",
      "Allow random resource ownership",
      "Define clear ownership, remove ambiguity, and validate rendered manifests"
    ],
    answer: 3
  },
  {
    id: "gitops-89",
    question: "Why should a GitOps controller's version be managed carefully?",
    options: [
      "Upgrades may change supported APIs, behavior, security fixes, and compatibility",
      "Controllers never need security updates",
      "Version pinning removes every operational risk",
      "Every upgrade automatically fixes all manifests"
    ],
    answer: 0
  },
  {
    id: "gitops-90",
    question: "What should be checked before upgrading Argo CD in production?",
    options: [
      "Only the dashboard theme",
      "Release notes, compatibility, backup or recovery plans, test results, and upgrade procedure",
      "Only the Git repository name",
      "Whether all applications use the same owner"
    ],
    answer: 1
  },
  {
    id: "gitops-91",
    question: "What does RCA mean in a production GitOps incident?",
    options: [
      "Repository Cluster Access",
      "Remote Container Automation",
      "Root Cause Analysis",
      "Release Configuration Archive"
    ],
    answer: 2
  },
  {
    id: "gitops-92",
    question: "A deployment outage follows a configuration change. What is a useful incident response?",
    options: [
      "Delete all deployment history",
      "Ignore the incident if sync is green",
      "Disable alerts permanently",
      "Assess impact, restore a known-good state if appropriate, and investigate the cause"
    ],
    answer: 3
  },
  {
    id: "gitops-93",
    question: "What is an SLI?",
    options: [
      "A measurable indicator of service behavior or reliability",
      "A Git repository branch",
      "A container image format",
      "A Kubernetes storage volume"
    ],
    answer: 0
  },
  {
    id: "gitops-94",
    question: "What is an SLO?",
    options: [
      "A mandatory Dockerfile instruction",
      "A target value or range for a service-level indicator over a defined period",
      "A Kubernetes namespace",
      "A Git hosting permission"
    ],
    answer: 1
  },
  {
    id: "gitops-95",
    question: "How can GitOps help with compliance?",
    options: [
      "By removing all approvals",
      "By allowing undocumented manual changes",
      "By providing versioned changes, review history, and repeatable deployment evidence",
      "By guaranteeing compliance without policies or audits"
    ],
    answer: 2
  },
  {
    id: "gitops-96",
    question: "A team wants to prevent configuration drift from recurring. What is the best long-term approach?",
    options: [
      "Keep manually fixing the cluster without updating Git",
      "Disable every controller",
      "Give all users direct production write access",
      "Manage intended changes through Git and configure reconciliation and access controls appropriately"
    ],
    answer: 3
  },
  {
    id: "gitops-97",
    question: "What is an important limitation of GitOps?",
    options: [
      "It does not by itself guarantee correct application behavior, data recovery, or zero downtime",
      "It cannot version control YAML",
      "It cannot be used with Kubernetes",
      "It prevents all configuration reviews"
    ],
    answer: 0
  },
  {
    id: "gitops-98",
    question: "A cluster is OutOfSync because an operator changes a field continuously. What should you do?",
    options: [
      "Disable the operator immediately in every environment",
      "Identify field ownership and configure desired-state comparison appropriately without hiding important drift",
      "Ignore every difference across the cluster",
      "Delete the entire application repository"
    ],
    answer: 1
  },
  {
    id: "gitops-99",
    question: "What is a good production GitOps release strategy?",
    options: [
      "Deploy untested images directly to every cluster",
      "Use mutable image tags and no review process",
      "Use tested immutable artifacts, reviewed configuration, controlled promotion, health checks, and a rollback plan",
      "Allow untracked live changes as the standard process"
    ],
    answer: 2
  },
  {
    id: "gitops-100",
    question: "In a production incident, Git shows the correct configuration but the application is down. What should you investigate?",
    options: [
      "Only the Git commit message",
      "Only the number of repository stars",
      "Assume GitOps has permanently failed",
      "Check workload status, events, logs, probes, networking, dependencies, resource capacity, and recent changes"
    ],
    answer: 3
  }
];
