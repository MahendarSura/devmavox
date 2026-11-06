import type { GlossaryTerm } from "./glossary-data";

export const gitopsGlossaryDetails: Record<string, Partial<GlossaryTerm>> = {
  "Argo CD": {
    purpose: "Argo CD automates Kubernetes delivery by continuously comparing the desired application configuration stored in Git with the live resources in a Kubernetes cluster. It provides visibility into synchronization status, health, deployment history and configuration differences. Teams use it to make Git-reviewed changes the normal deployment path, reduce manual kubectl changes, support controlled promotion between environments and detect configuration drift. Argo CD is a continuous delivery controller, not a replacement for CI systems that build and test application artifacts.",
    project: "A team builds a Docker image in Jenkins, pushes it to a container registry and updates the image tag in a Git deployment repository. Argo CD watches the repository and deploys the approved Kubernetes manifests to an EKS cluster. Engineers inspect the application health and sync status in Argo CD rather than manually applying every manifest. Production access is restricted through repository permissions and Argo CD RBAC.",
    workflow: [
      "Create a Git repository containing Kubernetes manifests or Helm/Kustomize configuration for the application.",
      "Configure an Argo CD Application with the repository URL, target revision, application path, destination cluster and namespace.",
      "Argo CD fetches the desired configuration and compares it with the resources currently running in the destination cluster.",
      "Review the application's Sync Status and Health Status. OutOfSync means desired and live configuration differ; Degraded indicates a health problem.",
      "After approval, synchronize the application manually or use an explicitly configured automated sync policy.",
      "Argo CD applies the required resource changes and continues reconciling the live cluster against the configured Git revision.",
      "Check application events, resource health, controller logs and Git history when synchronization or rollout fails."
    ],
    commands: [
      "argocd login argocd.example.com",
      "argocd app list",
      "argocd app get payments",
      "argocd app diff payments",
      "argocd app sync payments",
      "argocd app history payments",
      "argocd app logs payments",
      "kubectl get applications -n argocd"
    ],
    mistakes: [
      "Treating Argo CD as a CI build system. Image compilation, testing and publishing normally belong to a CI pipeline.",
      "Allowing unrestricted manual kubectl changes in production while assuming Git remains the actual source of truth.",
      "Enabling automated pruning without understanding that resources removed from Git may also be deleted from the cluster.",
      "Using self-heal or automated sync without testing how emergency changes and intentionally managed resources should behave.",
      "Pointing a production Application at an unprotected development branch.",
      "Ignoring health checks and assuming a successful sync means the application is ready to serve traffic.",
      "Giving the Argo CD controller broad cluster-admin permissions when narrower permissions are sufficient."
    ],
    configuration: [
      "An Argo CD Application normally defines spec.source.repoURL, targetRevision and path, together with spec.destination.server and namespace.",
      "A basic Application can use syncPolicy.automated with prune and selfHeal settings. Enable these only after reviewing deletion and drift behavior.",
      "Use project restrictions to limit which repositories, clusters, namespaces and resource kinds an application may manage.",
      "Use separate Applications or carefully designed ApplicationSets for multiple environments and application instances.",
      "Keep deployment manifests and application source code organized so that image promotion and environment-specific configuration are reviewable."
    ],
    troubleshooting: [
      "If an Application is Unknown or missing, verify the Application resource, Argo CD namespace, API connectivity and controller health.",
      "If it is OutOfSync, run argocd app diff and identify whether the difference comes from Git changes, defaulted fields or manual cluster modifications.",
      "If sync fails, inspect the sync operation details, Kubernetes events, RBAC permissions, admission webhook responses and controller logs.",
      "If health is Degraded after a successful sync, inspect the Deployment, Pods, readiness probes, image pull status and application logs.",
      "If Git authentication fails, verify repository credentials, deploy keys, token permissions, certificate trust and repository URL.",
      "If a destination cluster is unreachable, verify its registration, credentials, API endpoint, network path and certificate configuration."
    ],
    bestPractices: [
      "Protect deployment branches with pull requests, code review and required status checks.",
      "Separate build and deployment responsibilities: CI produces immutable artifacts; GitOps updates the desired deployment state.",
      "Pin image tags or digests rather than relying on mutable latest tags.",
      "Use project-level restrictions and least-privilege RBAC for users, service accounts and destination clusters.",
      "Test automated pruning, self-healing and sync waves in non-production before enabling them broadly.",
      "Monitor sync failures, application health and reconciliation delays.",
      "Maintain a documented recovery procedure for reverting Git changes and restoring a known-good application version."
    ],
    securityConsiderations: [
      "Protect Git credentials, repository deploy keys and cluster credentials using approved secret-management systems.",
      "Use TLS for Argo CD endpoints and verify certificates rather than disabling certificate checks.",
      "Restrict who can create Applications, change destinations, sync production applications or modify project policies.",
      "Do not commit plaintext passwords, tokens, private keys or Kubernetes Secret values to deployment repositories.",
      "Review repository and Helm chart sources before allowing them to deploy privileged workloads.",
      "Audit Git changes and Argo CD actions so production deployment decisions can be traced to authorized users."
    ]
  },

  "Helm": {
    purpose: "Helm is a package manager for Kubernetes that installs, upgrades, inspects and removes applications using charts. A chart packages Kubernetes resource templates, default configuration and metadata so teams can deploy the same application consistently with different values in development, staging and production. Helm manages releases and records revision history, which supports controlled upgrades and rollback. Helm does not replace Kubernetes controllers; Kubernetes still creates and maintains the actual resources.",
    project: "A DevOps team maintains a Helm chart for a payments API containing a Deployment, Service, ServiceAccount and optional Ingress. The CI pipeline publishes a versioned chart, and the release process installs it into separate namespaces with environment-specific values files. Engineers use Helm history and rollback when a tested upgrade causes a production issue.",
    workflow: [
      "Create or obtain a chart containing Chart.yaml, values.yaml and a templates directory.",
      "Review the default values and provide environment-specific overrides using a values file or --set arguments.",
      "Run helm lint to check chart structure and common template issues.",
      "Render the templates with helm template to inspect the Kubernetes manifests before deployment.",
      "Use helm upgrade --install to install a new release or upgrade an existing release.",
      "Verify the release status and inspect the Kubernetes resources created by the chart.",
      "Use helm history to review revisions and helm rollback to return to a previous release revision when appropriate."
    ],
    commands: [
      "helm version",
      "helm repo add bitnami https://charts.bitnami.com/bitnami",
      "helm repo update",
      "helm search repo nginx",
      "helm create payments",
      "helm lint ./payments",
      "helm template payments ./payments -f values-prod.yaml",
      "helm install payments ./payments -n production --create-namespace",
      "helm upgrade --install payments ./payments -n production -f values-prod.yaml",
      "helm list -n production",
      "helm status payments -n production",
      "helm history payments -n production",
      "helm uninstall payments -n production"
    ],
    mistakes: [
      "Confusing a chart with a release. A chart is the package; a release is an installed instance of that chart.",
      "Changing templates without rendering them and discovering invalid Kubernetes YAML during deployment.",
      "Reusing one values file across environments when replicas, resource limits, hostnames or storage requirements differ.",
      "Using mutable chart versions or unpinned dependencies that make deployments difficult to reproduce.",
      "Assuming Helm rollback reverses database migrations or external changes made by application code.",
      "Deleting a release without checking whether persistent data or other resources need to be retained.",
      "Passing sensitive values directly through shell history or exposing them in CI logs."
    ],
    configuration: [
      "Chart.yaml defines chart metadata such as apiVersion, name, description, type and chart version.",
      "values.yaml contains default values consumed by templates through expressions such as .Values.replicaCount.",
      "Environment overrides can be supplied with -f values-staging.yaml or -f values-prod.yaml.",
      "Dependencies are declared in Chart.yaml and can be downloaded or updated with helm dependency update.",
      "Use helm upgrade --install for repeatable installation and upgrade workflows; include namespace and version settings explicitly.",
      "Use template functions, named templates and helpers to avoid repeating resource labels and common configuration."
    ],
    troubleshooting: [
      "If helm lint fails, inspect Chart.yaml, template syntax, required values and chart dependency definitions.",
      "If helm template produces unexpected manifests, inspect the effective values, template conditions and value type conversions.",
      "If installation fails, inspect helm status, helm history, Kubernetes events and the failed resource's validation message.",
      "If a Pod cannot start after an upgrade, check image availability, configuration references, probes, scheduling and resource limits.",
      "If an upgrade reports an immutable field error, determine whether the Kubernetes resource must be recreated and assess downtime and data impact before proceeding.",
      "If rollback fails, inspect the target revision, resource ownership, admission policies and changes that cannot be reversed by Helm."
    ],
    bestPractices: [
      "Version charts and application images independently and use reproducible release inputs.",
      "Keep shared defaults in the chart and environment differences in separately reviewed values files.",
      "Run linting, template rendering and policy validation in CI before deployment.",
      "Use explicit chart versions and review dependency updates.",
      "Keep release names and namespaces consistent with an agreed environment naming convention.",
      "Test upgrades and rollback procedures in a representative non-production environment.",
      "Document breaking changes, required migration steps and persistent-resource behavior."
    ],
    securityConsiderations: [
      "Store secrets in an approved secret manager or encrypted secret workflow instead of committing plaintext values.",
      "Review third-party charts, their maintainers, dependencies, container images and requested Kubernetes permissions.",
      "Avoid granting charts privileged access, host networking or broad cluster permissions without a documented requirement.",
      "Restrict who can publish charts and who can deploy them into production namespaces.",
      "Use trusted chart repositories and verify artifact provenance where supported.",
      "Ensure CI logs and command histories do not expose credentials passed during Helm operations."
    ]
  },

  "Helm Chart": {
    purpose: "A Helm chart is the versioned package definition used to deploy an application to Kubernetes. It contains metadata, default values, templates and optional dependencies. Templates generate Kubernetes manifests by combining reusable YAML structures with supplied values. Charts help teams standardize application deployment while allowing controlled differences between environments. A chart is not itself a running application; installing it creates a Helm release in a Kubernetes cluster.",
    project: "A platform team creates a payments-api chart with a Deployment, Service, ConfigMap and optional Ingress. Developers use the same chart for development and production, while separate values files define replica counts, image versions, resource requests, hostnames and environment-specific settings.",
    workflow: [
      "Create the chart directory with helm create or build its required structure manually.",
      "Define chart metadata in Chart.yaml, including the chart name and version.",
      "Set safe default values in values.yaml.",
      "Create templates for Kubernetes resources and reference values through .Values.",
      "Add helpers in templates/_helpers.tpl for reusable labels and names.",
      "Declare dependencies when the application requires other charts.",
      "Run helm lint and helm template with representative values files.",
      "Package and publish the chart to an approved chart repository or OCI registry."
    ],
    commands: [
      "helm create payments-api",
      "helm lint ./payments-api",
      "helm template payments-api ./payments-api",
      "helm template payments-api ./payments-api -f values-prod.yaml",
      "helm dependency update ./payments-api",
      "helm dependency list ./payments-api",
      "helm package ./payments-api",
      "helm show values ./payments-api",
      "helm show chart ./payments-api"
    ],
    mistakes: [
      "Putting environment-specific production values into the chart defaults, making the chart unsafe for other environments.",
      "Using inconsistent labels and selectors between Deployment and Service templates.",
      "Writing templates that generate invalid YAML when optional values are empty or disabled.",
      "Using an incorrect chart version or forgetting to update dependencies after changing Chart.yaml.",
      "Embedding credentials or private keys in default values.",
      "Making templates excessively complex with nested conditions that are difficult to test.",
      "Assuming a chart version automatically identifies the application image version."
    ],
    configuration: [
      "Chart.yaml contains chart metadata; version identifies the chart package, while appVersion describes the application version and is informational unless templates use it.",
      "values.yaml defines defaults such as replicaCount, image.repository, image.tag and service.port.",
      "Templates access configuration with expressions such as {{ .Values.image.repository }}.",
      "Use templates/_helpers.tpl for common names, labels and annotations.",
      "Declare dependencies in Chart.yaml and keep the dependency lock file when reproducibility is required.",
      "Use schema validation through values.schema.json to constrain supported values and catch invalid input."
    ],
    troubleshooting: [
      "If the chart cannot be loaded, check its directory structure, Chart.yaml syntax and required metadata.",
      "If rendering fails, inspect template expressions, missing values, indentation and helper names.",
      "If generated selectors do not match Pod labels, compare the rendered Deployment and Service YAML.",
      "If dependencies are missing, inspect Chart.yaml and run helm dependency update.",
      "If a values file is ignored, verify the file path and precedence of multiple -f and --set arguments.",
      "If Kubernetes rejects a rendered resource, inspect the API version, field types and cluster-supported resource schema."
    ],
    bestPractices: [
      "Keep charts small and focused on one application or a clearly defined deployable unit.",
      "Use meaningful defaults that work safely in a local or development environment.",
      "Validate values with a schema and test representative environment configurations.",
      "Use shared helpers for naming and labels while keeping resource templates readable.",
      "Version chart changes and document breaking values or template changes.",
      "Publish immutable chart versions and maintain provenance and release notes.",
      "Use automated chart linting, rendering and Kubernetes manifest policy checks."
    ],
    securityConsiderations: [
      "Never store plaintext passwords, tokens or private keys in values.yaml or chart defaults.",
      "Set secure container defaults where appropriate, including non-root execution and restricted capabilities.",
      "Review ServiceAccount permissions and avoid broad cluster-level RBAC in application charts.",
      "Pin trusted dependencies and scan referenced container images.",
      "Validate user-supplied values so templates cannot create unintended privileged resources.",
      "Control access to chart publishing repositories and production deployment pipelines."
    ]
  },

  "Helm Release": {
    purpose: "A Helm release is a named installation of a chart in a Kubernetes cluster and namespace. Helm tracks the release's configuration and revision history, allowing teams to inspect deployments, upgrade an installation and roll back to an earlier revision. Multiple releases can be created from the same chart with different names or namespaces. Release history is useful during incident response, but it does not guarantee that every external side effect of an application deployment can be undone.",
    project: "A team deploys the same payments-api chart as payments-dev in the development namespace and payments-prod in production. Each release has independent values and revision history. When a production upgrade introduces a broken readiness probe, the on-call engineer reviews the release history and rolls back to the previous known-good revision.",
    workflow: [
      "Choose a release name, chart version, target namespace and values file.",
      "Install the chart to create the release or use upgrade --install for an idempotent deployment command.",
      "Inspect the release with helm status and review the deployed Kubernetes resources.",
      "When configuration changes, perform an upgrade and record the resulting release revision.",
      "Monitor workload health and application behavior after the upgrade.",
      "If the release is unhealthy, inspect helm history and identify a safe earlier revision.",
      "Roll back only after considering database compatibility, persistent data and external side effects."
    ],
    commands: [
      "helm install payments-prod ./payments-api -n production --create-namespace",
      "helm list -A",
      "helm status payments-prod -n production",
      "helm get values payments-prod -n production",
      "helm get manifest payments-prod -n production",
      "helm history payments-prod -n production",
      "helm upgrade payments-prod ./payments-api -n production -f values-prod.yaml",
      "helm rollback payments-prod 3 -n production",
      "helm uninstall payments-prod -n production"
    ],
    mistakes: [
      "Assuming two releases using the same chart share the same values or revision history.",
      "Reusing a release name in the wrong namespace and inspecting the wrong installation.",
      "Deleting a release without checking persistent volumes, external services and data-retention requirements.",
      "Rolling back the Kubernetes manifests while leaving an incompatible database schema in place.",
      "Using helm list without -A and overlooking releases in other namespaces.",
      "Treating a successful Helm operation as proof that the application is functionally healthy.",
      "Removing release history or using cleanup options without understanding their recovery impact."
    ],
    configuration: [
      "A release is identified by its name and namespace; the chart and values define the resources rendered for that installation.",
      "Use helm upgrade --install with a consistent release name and namespace in deployment automation.",
      "Use explicit chart versions and version-controlled values files for repeatable releases.",
      "Use --history-max where appropriate to control retained revision history, while preserving enough history for operational recovery.",
      "Use --atomic only after understanding its automatic failure cleanup and rollback behavior.",
      "Keep application version, chart version and release revision visible in deployment metadata."
    ],
    troubleshooting: [
      "If a release is pending or failed, inspect helm status and helm history before starting another upgrade.",
      "If resources are missing, inspect helm get manifest and compare the rendered resources with the live namespace.",
      "If an upgrade is stuck, inspect Kubernetes events, hooks, Jobs, admission webhooks and rollout status.",
      "If rollback fails, inspect whether the target revision still exists and whether resource ownership or immutable fields changed.",
      "If the application remains unhealthy after rollback, verify image compatibility, database migrations, external dependencies and configuration.",
      "If the wrong release is being inspected, confirm both the exact release name and namespace."
    ],
    bestPractices: [
      "Use predictable release names and namespaces for each application environment.",
      "Record the chart version, application image digest and release revision for every production deployment.",
      "Keep release values in reviewed configuration files and avoid undocumented command-line overrides.",
      "Define retention policies for release history and backups.",
      "Test upgrade, rollback and uninstall behavior before production adoption.",
      "Monitor Kubernetes workload health separately from Helm release status.",
      "Document which resources and external data are retained when a release is removed."
    ],
    securityConsiderations: [
      "Restrict deployment permissions to approved namespaces and authorized release operators.",
      "Do not expose sensitive release values through terminal output, CI logs or broadly accessible release inspection tools.",
      "Protect release configuration and chart artifacts with repository access controls.",
      "Review hooks and chart lifecycle scripts because they may execute privileged workloads.",
      "Use least-privilege ServiceAccounts and RBAC in the resources owned by the release.",
      "Keep audit records for production upgrades, rollbacks and uninstall operations."
    ]
  },

  "Values.yaml": {
    purpose: "A values.yaml file provides configuration inputs to Helm chart templates. It separates application settings from reusable Kubernetes resource definitions. The same chart can therefore be deployed with different replica counts, image references, resource limits, service settings and ingress hosts across environments. Helm combines chart defaults with supplied override files and command-line values according to precedence rules. Values files should contain configuration, not unprotected credentials.",
    project: "A payments application uses one Helm chart in development, staging and production. The production values file increases replicas, sets production resource requests and limits, specifies an approved image digest and configures the production ingress hostname. Staging uses a different file without changing the chart templates.",
    workflow: [
      "Define documented default settings in the chart's values.yaml file.",
      "Reference the settings from templates using .Values paths.",
      "Create separate override files such as values-dev.yaml, values-staging.yaml and values-prod.yaml.",
      "Validate each configuration by rendering the chart with the corresponding values file.",
      "Review the final rendered Kubernetes manifests before deployment.",
      "Deploy using the same chart version with the intended environment values file.",
      "Inspect effective release values carefully when diagnosing configuration differences."
    ],
    commands: [
      "helm show values ./payments-api",
      "helm lint ./payments-api",
      "helm template payments ./payments-api -f values-prod.yaml",
      "helm upgrade --install payments ./payments-api -n production -f values-prod.yaml",
      "helm get values payments -n production",
      "helm get values payments -n production --all",
      "helm upgrade payments ./payments-api -n production -f values-common.yaml -f values-prod.yaml",
      "helm upgrade payments ./payments-api -n production --set replicaCount=4"
    ],
    mistakes: [
      "Using the wrong YAML indentation or value type, such as quoting a number when a template expects an integer.",
      "Assuming a value in an override file is applied when a later override file replaces it.",
      "Confusing chart defaults with user-supplied release values.",
      "Using --set for complex nested structures that are difficult to review and escape correctly.",
      "Committing passwords, API keys or certificates in plain text.",
      "Changing a values key without updating templates and environment files that depend on it.",
      "Assuming values.yaml alone guarantees the final Kubernetes resource configuration without inspecting rendered output."
    ],
    configuration: [
      "A chart may define replicaCount, image.repository, image.tag, service.type and resources as default values.",
      "Templates access nested keys with .Values, for example .Values.resources.requests.cpu.",
      "Multiple -f files can be supplied; later files take precedence when they set the same key.",
      "Command-line --set values override values from files, so use them carefully and avoid secrets.",
      "Use values.schema.json to validate required fields, accepted types and allowed values.",
      "Keep shared defaults separate from environment-specific overrides to make configuration differences explicit."
    ],
    troubleshooting: [
      "If a value is empty, check its exact YAML key, indentation, case and template reference.",
      "If the wrong value appears, inspect the order of -f files and any --set arguments.",
      "If rendering fails, validate YAML syntax and confirm the expected data type.",
      "If the rendered manifest differs from expectations, run helm template with the exact production inputs.",
      "If an application receives an old setting, verify whether it reads a ConfigMap, Secret or environment variable and whether a Pod restart is required.",
      "If sensitive values appear in logs, stop further exposure and rotate affected credentials."
    ],
    bestPractices: [
      "Keep values files environment-specific, reviewed and version controlled.",
      "Document each supported value, its type, default and operational impact.",
      "Use a schema to reject invalid values before deployment.",
      "Prefer explicit image versions or digests and define resource requests and limits.",
      "Keep secrets outside ordinary plaintext values files.",
      "Test all supported environment files in CI using helm lint and helm template.",
      "Avoid excessive configuration options that make a chart difficult to understand."
    ],
    securityConsiderations: [
      "Never commit plaintext production credentials or private keys to Git.",
      "Use external secret managers, sealed-secret workflows or another approved secret delivery mechanism.",
      "Limit access to private values files and CI variables.",
      "Avoid passing credentials with --set because command history and process output may expose them.",
      "Review security-sensitive values such as privileged mode, host networking and ServiceAccount configuration.",
      "Rotate credentials if a values file or build log exposes them."
    ]
  },

  "Argo CD Sync": {
    purpose: "Argo CD Sync is the operation that applies the desired configuration from the configured Git revision to the destination Kubernetes cluster. Argo CD first calculates differences between desired and live resources, then applies the required changes according to the sync configuration and resource ordering. Sync can be manual or automated. It is distinct from health assessment: resources may synchronize successfully but still fail to become healthy because Pods cannot start, dependencies are unavailable or application checks fail.",
    project: "A developer submits a pull request that changes the payments Deployment image tag. After review and merge, Argo CD detects that the live cluster is OutOfSync. The release engineer reviews the diff, starts a sync and monitors the Deployment rollout and application health before announcing the release.",
    workflow: [
      "Commit and review the desired Kubernetes configuration in the Git repository.",
      "Wait for Argo CD to detect the configured target revision or refresh the Application.",
      "Inspect the OutOfSync resources and review the generated diff.",
      "Check whether pruning, hooks, sync waves and resource health checks affect the operation.",
      "Start a manual sync or allow an approved automated sync policy to perform it.",
      "Monitor the sync operation, Kubernetes events and rollout status.",
      "Verify the Application health and business-level checks after synchronization completes."
    ],
    commands: [
      "argocd app get payments",
      "argocd app diff payments",
      "argocd app sync payments",
      "argocd app sync payments --dry-run",
      "argocd app wait payments --sync --health --timeout 300",
      "argocd app history payments",
      "kubectl get deploy,pods,svc -n production",
      "kubectl rollout status deployment/payments -n production"
    ],
    mistakes: [
      "Syncing without reviewing a diff that contains unexpected resource deletion or privilege changes.",
      "Assuming a successful sync guarantees application readiness or correct business behavior.",
      "Enabling pruning without understanding the consequences of removing resources from Git.",
      "Using force or replace synchronization options without checking whether resources will be recreated or experience downtime.",
      "Changing live resources manually and then being surprised when Argo CD reports drift.",
      "Ignoring hooks or sync waves that control ordering and prerequisite operations.",
      "Syncing a production revision before the corresponding image has been published and verified."
    ],
    configuration: [
      "Manual sync is suitable when a human approval is required before production changes are applied.",
      "Automated sync can be configured under spec.syncPolicy.automated; pruning and self-healing are separate behaviors.",
      "Use sync options only for documented requirements, such as server-side apply or controlled resource replacement.",
      "Use sync waves and resource hooks when resources must be created in a specific order.",
      "Configure health checks and timeouts that reflect application startup and dependency behavior.",
      "Restrict which revisions and repositories are allowed to drive production synchronization."
    ],
    troubleshooting: [
      "If the Application remains OutOfSync, inspect argocd app diff and determine whether the difference is intentional or caused by live drift.",
      "If sync is blocked, inspect the operation error, repository access, destination permissions and Kubernetes admission responses.",
      "If sync is stuck, inspect hooks, Jobs, resource finalizers and controller logs.",
      "If resources synchronize but remain Degraded, inspect Pod events, probes, image pulls and application logs.",
      "If pruning deletes an unexpected resource, inspect Git history, resource tracking and automated prune settings before attempting recovery.",
      "If Argo CD does not detect a new commit, verify targetRevision, repository credentials, refresh status and the actual commit path."
    ],
    bestPractices: [
      "Review diffs before sensitive production sync operations.",
      "Use pull requests and protected branches as the approval mechanism for desired-state changes.",
      "Separate routine application synchronization from high-risk infrastructure changes.",
      "Use automated sync only with tested policies and appropriate repository controls.",
      "Monitor both sync status and workload health after every release.",
      "Test pruning, hooks, sync waves and force behavior in non-production.",
      "Keep an auditable link between the Git commit and the deployed application version."
    ],
    securityConsiderations: [
      "Only authorized users and automation identities should be able to sync production applications.",
      "Protect repository credentials and destination cluster credentials.",
      "Review manifests for privileged containers, excessive RBAC and exposed services before syncing.",
      "Restrict pruning and force synchronization to approved workflows.",
      "Use signed or otherwise verified artifacts and trusted image registries where supported.",
      "Audit sync operations and retain enough information to investigate unauthorized changes."
    ]
  },

  "Configuration Drift": {
    purpose: "Configuration drift is the difference between the intended configuration and the actual running system. In Kubernetes GitOps, drift can occur when someone changes a live resource manually, an external controller modifies fields, or a deployment repository is not updated to reflect the desired state. Argo CD detects differences by comparing Git-managed configuration with live resources. Drift is not automatically a fault in every case; some fields are intentionally controlled by Kubernetes or other operators and must be handled through clear ownership rules.",
    project: "An engineer manually increases the production Deployment replica count using kubectl during an incident. Git still specifies the previous replica count, so Argo CD reports the Application as OutOfSync. The team reviews the emergency change, updates the Git configuration if it should remain, and lets the normal GitOps process reconcile the cluster.",
    workflow: [
      "Define the intended configuration in a version-controlled Git repository.",
      "Allow the GitOps controller to compare the desired state with live Kubernetes resources.",
      "Inspect reported differences and identify the resource and fields that changed.",
      "Determine whether the difference is unauthorized drift, an intentional emergency change or a field managed by another controller.",
      "For an approved permanent change, update Git through a reviewed pull request.",
      "For an unintended change, reconcile the resource using the approved GitOps process.",
      "Review permissions and operational procedures to reduce recurring manual modifications."
    ],
    commands: [
      "argocd app get payments",
      "argocd app diff payments",
      "argocd app sync payments",
      "kubectl get deployment payments -n production -o yaml",
      "kubectl diff -f deployment.yaml",
      "kubectl get deployment payments -n production -o json",
      "git log --oneline -- deployments/payments"
    ],
    mistakes: [
      "Treating every difference as malicious when some fields are updated by Kubernetes controllers.",
      "Allowing repeated manual changes without updating the Git source of truth.",
      "Enabling self-healing without defining how emergency changes are approved and recorded.",
      "Ignoring drift alerts until they become a production outage.",
      "Changing generated resources that should be owned by an operator or parent controller.",
      "Using broad ignore-difference rules that hide important configuration changes.",
      "Assuming a successful reconciliation proves that the desired configuration itself is safe."
    ],
    configuration: [
      "Configure Argo CD comparison and synchronization behavior according to the ownership of each resource.",
      "Use ignoreDifferences only for fields intentionally managed by another controller, and document the reason.",
      "Use automated self-healing when the organization has approved automatic restoration of Git-defined values.",
      "Use pruning carefully because resources removed from desired state may be deleted.",
      "Protect production Git branches so the desired state cannot be changed by unauthorized commits.",
      "Define an emergency-change process that records temporary live changes and reconciles them back into Git."
    ],
    troubleshooting: [
      "Run argocd app diff to identify exact fields that differ between Git and the cluster.",
      "Inspect the live resource with kubectl get -o yaml and compare it with the committed manifest.",
      "Check managedFields to understand which Kubernetes manager last changed a field.",
      "Review admission controllers, operators, autoscalers and defaulting behavior before changing comparison rules.",
      "If self-healing repeatedly reverses a change, determine which source should own the field.",
      "If drift is not detected, verify the Application path, target revision, resource tracking and refresh status."
    ],
    bestPractices: [
      "Treat Git as the approved desired-state record for GitOps-managed resources.",
      "Use RBAC to restrict direct production modifications.",
      "Record emergency changes and convert approved changes into reviewed Git commits.",
      "Assign clear ownership for fields managed by autoscalers, operators and admission controllers.",
      "Alert on important drift and prioritize differences that affect security, availability or cost.",
      "Review ignore-difference rules regularly so they do not hide meaningful changes.",
      "Test self-healing and pruning policies before enabling them in critical environments."
    ],
    securityConsiderations: [
      "Investigate unauthorized changes to RBAC, network policies, secrets and privileged workloads immediately.",
      "Protect Git repositories and require review for production configuration changes.",
      "Audit Kubernetes API access to identify who changed a live resource.",
      "Avoid broad permissions that allow users to bypass the deployment approval process.",
      "Do not expose secret values while comparing or logging configuration differences.",
      "Use admission policies to block unsafe configurations before they become live."
    ]
  },

  "Rollback": {
    purpose: "Rollback restores an application or deployment configuration to an earlier known-good version after a problematic release. In Kubernetes, rollback may involve reverting a Git commit, synchronizing an earlier manifest revision, using Helm release history or changing an application image to a known-good version. The correct method depends on which system owns the deployment state. Rollback can restore workload configuration, but it cannot automatically undo database migrations, lost data, external API actions or incompatible persistent-state changes.",
    project: "A new payments API release introduces elevated error rates. The team checks the deployment history, identifies the previous image digest and reverts the deployment repository through a reviewed change. Argo CD synchronizes the known-good configuration, and engineers verify readiness, error rate and transaction processing before closing the incident.",
    workflow: [
      "Detect the failed release through health checks, metrics, logs or user reports.",
      "Identify the last known-good application version and its exact image digest or deployment revision.",
      "Check whether database schema changes, persistent data or external services make a simple rollback unsafe.",
      "Choose the rollback mechanism that matches the deployment owner, such as Git revert, Argo CD revision recovery or Helm rollback.",
      "Apply the recovery change through the approved deployment process.",
      "Monitor rollout completion, application health, traffic and critical business operations.",
      "Document the incident, root cause and any forward fix required to prevent recurrence."
    ],
    commands: [
      "helm history payments -n production",
      "helm rollback payments 4 -n production",
      "argocd app history payments",
      "argocd app get payments",
      "git revert <bad-commit>",
      "kubectl rollout history deployment/payments -n production",
      "kubectl rollout undo deployment/payments -n production",
      "kubectl rollout status deployment/payments -n production"
    ],
    mistakes: [
      "Rolling back only the application image while ignoring an incompatible database migration.",
      "Using kubectl rollout undo on a resource that Argo CD will immediately reconcile back to the Git-defined state.",
      "Choosing a previous revision without verifying that its image still exists in the registry.",
      "Assuming Helm rollback restores external resources or application data.",
      "Deleting the failed release or history before collecting incident evidence.",
      "Making multiple untracked emergency changes during recovery.",
      "Declaring recovery complete without validating traffic, error rates and business transactions."
    ],
    configuration: [
      "Maintain immutable image tags or digests so a previous release can be identified reliably.",
      "Retain sufficient Helm and deployment history for the organization's recovery window.",
      "Use Git revert or a reviewed known-good commit when Git is the authoritative desired-state source.",
      "Configure readiness probes, rollout strategies and monitoring thresholds that expose failed releases quickly.",
      "Keep database migration and backup recovery plans separate from ordinary application deployment rollback.",
      "Define who can authorize emergency rollback and how the action is recorded."
    ],
    troubleshooting: [
      "If a rollback cannot find the image, verify registry retention, repository permissions and the recorded image digest.",
      "If Argo CD reverses a manual rollback, inspect the Git desired state and use the approved Git revert or revision process.",
      "If Helm rollback fails, inspect the target revision, immutable fields, hooks and resource ownership.",
      "If Pods remain unhealthy after rollback, compare the old configuration with current Secrets, ConfigMaps and external dependencies.",
      "If database errors continue, inspect schema compatibility and determine whether a forward migration or data restoration is required.",
      "If traffic does not recover, verify service endpoints, ingress routing, DNS, load balancer health and application metrics."
    ],
    bestPractices: [
      "Practice rollback during release testing rather than designing it for the first time during an incident.",
      "Keep immutable artifacts and known-good deployment revisions available.",
      "Use automated health gates and progressive delivery to detect failures early.",
      "Document rollback limits for database, storage and external-system changes.",
      "Prefer a reviewed Git revert for GitOps-managed desired state.",
      "Measure recovery using service-level indicators such as availability, latency and error rate.",
      "Preserve logs and deployment history for post-incident investigation."
    ],
    securityConsiderations: [
      "Restrict production rollback privileges to authorized operators and approved automation.",
      "Verify that the previous image and chart are trusted and have not been replaced or compromised.",
      "Do not restore obsolete credentials or insecure configuration as part of rollback.",
      "Protect backups and ensure recovery access is audited.",
      "Review emergency actions that bypass normal pull-request approvals.",
      "Confirm that restored versions still meet current security requirements and vulnerability policies."
    ]
  },

  "Canary Deployment": {
    purpose: "A canary deployment gradually exposes a new application version to a small portion of production traffic or users before expanding the rollout. Engineers compare the new version with the stable version using metrics such as error rate, latency, resource usage and business outcomes. If the canary performs well, traffic is increased in controlled stages. If it performs poorly, traffic can be returned to the stable version. A canary requires a traffic-management mechanism and meaningful analysis; simply creating a second Deployment does not automatically split traffic.",
    project: "A payments service introduces a new API version. The platform team deploys the canary version and routes a small percentage of requests to it using a service mesh or ingress traffic-splitting capability. Prometheus tracks error rate and latency for both versions. The rollout proceeds only when the canary meets the agreed thresholds.",
    workflow: [
      "Build and publish an immutable image for the new application version.",
      "Deploy the canary workload separately from the stable workload.",
      "Configure the ingress controller, service mesh or progressive-delivery controller to direct a small traffic percentage to the canary.",
      "Define measurable success and failure thresholds before exposing production traffic.",
      "Observe canary-specific latency, errors, saturation and business metrics.",
      "Increase traffic gradually when analysis is successful, or route traffic back to the stable version when thresholds fail.",
      "Complete the rollout only after the new version has passed the required observation stages."
    ],
    commands: [
      "kubectl get deployments,services -n production",
      "kubectl get pods -n production -l app=payments",
      "kubectl rollout status deployment/payments-canary -n production",
      "kubectl describe deployment payments-canary -n production",
      "kubectl logs deployment/payments-canary -n production",
      "kubectl get endpointslices -n production",
      "argocd app get payments",
      "kubectl get analysisruns -n production"
    ],
    mistakes: [
      "Assuming two Deployments automatically split traffic between stable and canary versions.",
      "Sending canary traffic without measuring errors, latency and business-level outcomes.",
      "Using too much initial traffic before validating the new version.",
      "Comparing metrics that combine stable and canary traffic, making failures difficult to isolate.",
      "Changing application code, database schema and traffic routing simultaneously without a recovery plan.",
      "Ignoring session affinity, long-lived connections or state compatibility during traffic shifting.",
      "Continuing rollout when analysis data is missing or monitoring is unavailable."
    ],
    configuration: [
      "Use a traffic-splitting controller, service mesh or compatible ingress feature to control canary percentages.",
      "Define stable and canary workloads with distinct labels or routing destinations.",
      "Configure analysis metrics such as request success rate, p95 latency and resource saturation.",
      "Use explicit rollout steps and observation intervals appropriate to application traffic.",
      "Configure automatic abort behavior only when analysis signals are reliable and tested.",
      "Keep application and database changes backward compatible during the canary period."
    ],
    troubleshooting: [
      "If no canary traffic arrives, inspect route weights, service selectors, ingress rules and service mesh configuration.",
      "If traffic reaches the wrong Pods, compare labels, selectors and endpoint membership.",
      "If canary metrics are missing, inspect Prometheus targets, metric labels and analysis query configuration.",
      "If the canary has elevated errors, inspect its logs, configuration, dependency responses and image version.",
      "If traffic shifting fails, inspect the progressive-delivery controller, route resource status and Kubernetes events.",
      "If users see inconsistent behavior, investigate session affinity, caches, database compatibility and shared state."
    ],
    bestPractices: [
      "Define success thresholds and abort criteria before the rollout begins.",
      "Start with a small traffic percentage and increase it in controlled stages.",
      "Use separate stable and canary metrics to make comparison meaningful.",
      "Ensure the monitoring system can identify the canary version reliably.",
      "Keep rollback fast and test traffic restoration before production use.",
      "Use backward-compatible API and database changes during progressive rollout.",
      "Record traffic percentages, analysis results and release identifiers for auditability."
    ],
    securityConsiderations: [
      "Scan and verify the canary image before allowing it to receive production traffic.",
      "Apply the same authentication, authorization and network policies to canary workloads as stable workloads.",
      "Avoid exposing internal canary endpoints publicly without an explicit requirement.",
      "Protect deployment credentials and traffic-management configuration.",
      "Monitor for security regressions as well as availability regressions.",
      "Restrict who can change traffic weights or bypass canary analysis."
    ]
  },

  "Blue-Green Deployment": {
    purpose: "Blue-green deployment uses two separate application environments or workload versions. One environment serves current production traffic while the other receives the new version for validation. After testing, traffic is switched from the old environment to the new one. If the new version fails, traffic can be switched back while the old environment remains available. This strategy can reduce release downtime, but it requires enough capacity for both environments and careful handling of shared databases, sessions, background jobs and external side effects.",
    project: "An online retail application currently runs the blue version. The team deploys a green version with the new application image, validates its health and performs smoke tests through an internal route. After approval, the load balancer or ingress switches production traffic to green. Blue remains available temporarily for fast recovery.",
    workflow: [
      "Identify the currently active environment and the target inactive environment.",
      "Deploy the new application version to the inactive environment without redirecting production traffic.",
      "Verify readiness, dependencies, configuration, security policies and smoke tests.",
      "Confirm database and session compatibility between both application versions.",
      "Switch the production service, ingress or load balancer to the new environment.",
      "Monitor errors, latency, user requests and background processing after the switch.",
      "Keep the old environment available for the agreed recovery period, then retire it safely."
    ],
    commands: [
      "kubectl get deployments,services -n production",
      "kubectl get pods -n production -l version=green",
      "kubectl rollout status deployment/payments-green -n production",
      "kubectl describe service payments -n production",
      "kubectl get endpointslices -n production",
      "kubectl patch service payments -n production -p '{\"spec\":{\"selector\":{\"app\":\"payments\",\"version\":\"green\"}}}'",
      "kubectl get service payments -n production -o yaml",
      "kubectl logs deployment/payments-green -n production"
    ],
    mistakes: [
      "Switching traffic before the new environment passes readiness and functional tests.",
      "Assuming two application versions can safely share a database without schema compatibility planning.",
      "Deleting the old environment immediately after switching traffic, removing the fast recovery option.",
      "Forgetting to move scheduled jobs, background workers or event consumers safely between environments.",
      "Using a Service selector that accidentally matches both versions during the traffic switch.",
      "Ignoring session storage, cache compatibility and in-flight requests.",
      "Treating traffic switching as a complete rollback when data changes made by the new version may persist."
    ],
    configuration: [
      "Create distinct blue and green Deployments with clear version labels and matching resource selectors.",
      "Use a stable Service or ingress route as the production traffic entry point.",
      "Keep environment configuration consistent while changing only the intended application version.",
      "Use readiness probes and pre-switch smoke tests to prevent routing traffic to unhealthy Pods.",
      "Plan capacity for both environments during the deployment window.",
      "Define how database migrations, background jobs, sessions and persistent storage remain compatible across the switch."
    ],
    troubleshooting: [
      "If traffic does not switch, inspect Service selectors, EndpointSlices, ingress rules and load balancer target health.",
      "If green Pods are not ready, inspect readiness probes, container logs, resource pressure and dependency connectivity.",
      "If some users still reach blue, investigate DNS caching, ingress propagation, load balancer behavior and persistent sessions.",
      "If rollback does not restore service, inspect shared database changes, caches, background jobs and external side effects.",
      "If both versions receive traffic unexpectedly, verify selectors and routing weights.",
      "If the new environment fails smoke tests, keep production traffic on the existing environment and investigate before switching."
    ],
    bestPractices: [
      "Automate environment deployment, health validation and traffic switching.",
      "Keep both versions compatible with the shared data layer during the transition.",
      "Use a controlled approval gate before production traffic is switched.",
      "Retain the previous environment until the new version has passed the agreed observation period.",
      "Test rollback and ensure it includes routing, background workers and any relevant configuration.",
      "Monitor the new version independently after the switch.",
      "Document capacity requirements and cleanup conditions for the inactive environment."
    ],
    securityConsiderations: [
      "Apply equivalent network policies, RBAC, TLS and secrets controls to both environments.",
      "Ensure the inactive environment is not accidentally exposed to public traffic before validation.",
      "Use trusted, scanned and immutable application images in both environments.",
      "Restrict who can change production traffic routing.",
      "Rotate and manage credentials consistently across both versions.",
      "Audit the switch and rollback actions and verify that old environments are securely retired."
    ]
  }
};
