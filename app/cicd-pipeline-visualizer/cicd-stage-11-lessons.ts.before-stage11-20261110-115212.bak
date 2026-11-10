const makeLesson = (
  overview: string,
  purpose: string,
  architecture: string,
  workflow: string[],
  example: string,
  commands: string[],
  configuration: string,
  failures: string[],
  recovery: string[],
  bestPractices: string[],
  exercise: string
) => ({
  overview,
  purpose,
  architecture,
  workflow,
  example,
  commands,
  configuration,
  failures,
  recovery,
  bestPractices,
  exercise,
});

export const stageElevenLessonOverrides = {
  "11|Helm Fundamentals": makeLesson(
    "Helm is a package manager for Kubernetes. It packages related Kubernetes manifests into charts and provides commands to install, upgrade, inspect, and roll back application releases.",
    "Helm reduces repetitive YAML and makes application deployment reusable across development, staging, and production. Teams can maintain one chart and supply different environment values.",
    "A chart contains metadata, default values, templates, and optional dependencies. Helm renders templates using supplied values and submits the resulting Kubernetes resources to the cluster. A release represents an installed instance of a chart.",
    ["Install Helm on the deployment workstation or CI agent.", "Create a chart for the Spring Boot payment service.", "Define default values and Kubernetes templates.", "Render the chart locally to inspect generated YAML.", "Install the chart into a Kubernetes namespace.", "Verify the release and running resources."],
    "The payment-service chart defines a Deployment, Service, and configurable replica count. Development installs two replicas, while production supplies a separate values file for three replicas and production resource limits.",
    ["helm version", "helm create payment-service", "helm lint ./payment-service", "helm template payment-service ./payment-service", "helm install payment-service ./payment-service --namespace payments --create-namespace", "helm list -n payments", "kubectl get pods,svc -n payments"],
    "A typical chart includes Chart.yaml, values.yaml, templates/, and optionally charts/. Keep application image, replica count, Service settings, resources, and probe configuration configurable through values.",
    ["Chart validation fails.", "Rendered YAML contains invalid Kubernetes fields.", "Release installation fails because a resource already exists.", "The chart deploys the wrong image or namespace."],
    ["Run helm lint and helm template before installation.", "Inspect rendered manifests and Kubernetes events.", "Check the release namespace and existing resource ownership.", "Correct chart values and retry with a reviewed change."],
    ["Version charts independently from application images.", "Validate charts in CI.", "Use environment-specific values files.", "Avoid hardcoding production secrets in chart defaults.", "Keep chart templates readable and reusable."],
    "Create a payment-service Helm chart, render its Kubernetes manifests, install it into a payments namespace, and verify the release."
  ),

  "11|Helm Architecture": makeLesson(
    "Helm uses a client-side command interface to manage chart releases in Kubernetes. Helm 3 communicates with the Kubernetes API using the user's configured credentials and does not require the old in-cluster Tiller server.",
    "Understanding Helm architecture helps operators identify whether a problem belongs to chart rendering, Kubernetes authentication, resource creation, or release history.",
    "The Helm CLI reads chart files and values, renders templates, and interacts with the Kubernetes API. Release information is stored in the cluster, commonly as Secrets in the release namespace. Kubernetes controllers then manage the created resources.",
    ["Run Helm with a valid kubeconfig context.", "Load chart metadata and default values.", "Merge supplied values and render templates.", "Submit resources to the Kubernetes API.", "Store release revision information.", "Inspect or upgrade the release later."],
    "A Jenkins agent runs helm upgrade --install for payment-service using its Kubernetes credentials. Helm renders the chart and applies the desired resources to the EKS cluster.",
    ["helm version", "kubectl config current-context", "helm list -A", "helm status payment-service -n payments", "helm history payment-service -n payments", "kubectl get secrets -n payments"],
    "Helm 3 uses Kubernetes API access and release storage. Protect kubeconfig credentials and release metadata because they can reveal deployment configuration.",
    ["Helm reports Kubernetes connection errors.", "Release storage cannot be accessed.", "The command targets the wrong cluster context.", "A release exists in a different namespace."],
    ["Verify kubeconfig and current context.", "Check namespace and release name.", "Confirm the caller has permissions for required resources and release storage.", "Inspect Helm status and history."],
    ["Use Helm 3 or a supported current version.", "Use dedicated deployment identities.", "Restrict access to release Secrets.", "Make target cluster and namespace explicit in CI commands."],
    "Trace a Helm installation from chart loading through template rendering, Kubernetes API submission, and release history storage."
  ),

  "11|Chart Structure": makeLesson(
    "A Helm chart is a directory containing metadata, default configuration, templates, and optional dependencies. A consistent chart structure makes deployments easier to maintain and review.",
    "A well-organized chart separates reusable Kubernetes templates from environment-specific configuration and application release metadata.",
    "Chart.yaml defines chart identity and version. values.yaml contains defaults. templates/ holds rendered Kubernetes resources. charts/ contains packaged dependencies, while files/ can hold additional non-template files.",
    ["Create a new chart directory.", "Inspect the generated Chart.yaml and values.yaml.", "Create Deployment and Service templates.", "Add helper definitions where needed.", "Render the chart locally.", "Validate and package the chart."],
    "The payment-service chart stores its Deployment and Service templates under templates/, with image and replica settings in values.yaml.",
    ["helm create payment-service", "Get-ChildItem .\\payment-service -Recurse", "helm lint ./payment-service", "helm template payment-service ./payment-service", "helm package ./payment-service"],
    "Keep chart metadata in Chart.yaml, default settings in values.yaml, and Kubernetes resource definitions in templates/. Use _helpers.tpl for reusable template definitions.",
    ["Required chart metadata is missing.", "Template file has invalid YAML.", "A values key is referenced but not defined.", "Generated resource names collide with other releases."],
    ["Check Chart.yaml fields and chart directory layout.", "Run helm lint.", "Render templates with helm template and inspect output.", "Use consistent release-aware resource naming."],
    ["Keep templates small and understandable.", "Use helper templates for common labels and names.", "Do not place secrets in chart defaults.", "Package and version charts for controlled distribution."],
    "Build a chart directory for payment-service containing Chart.yaml, values.yaml, Deployment, Service, and helper templates."
  ),

  "11|Chart.yaml and values.yaml": makeLesson(
    "Chart.yaml stores chart metadata such as name, version, application version, and dependencies. values.yaml defines default configuration consumed by chart templates.",
    "Separating metadata from values allows chart releases to be versioned and application configuration to be overridden without editing templates.",
    "Helm reads Chart.yaml to identify the chart package. It loads values.yaml, merges user-supplied values, and exposes the final values to templates through the .Values object.",
    ["Define chart name and chart version.", "Set the application version metadata.", "Create defaults for image, replicas, Service, and resources.", "Override selected values using a separate file.", "Render and inspect the final manifests.", "Package the chart after validation."],
    "The payment-service chart defaults to two replicas and an example image. Production values override the replica count, image tag, resource requests, and Service exposure.",
    ["helm show chart ./payment-service", "helm show values ./payment-service", "helm template payment-service ./payment-service -f values-production.yaml", "helm package ./payment-service"],
    "The chart version tracks chart changes; appVersion describes the application version and is informational unless templates use it. Quote string values such as image tags to avoid YAML type interpretation issues.",
    ["Chart version is invalid or not incremented.", "Production values file overrides the wrong key.", "A numeric-looking string is interpreted as a number.", "Template references an undefined values property."],
    ["Validate Chart.yaml syntax and version.", "Compare values file keys with template references.", "Use helm show values and helm template to inspect merged configuration.", "Correct value types and rerun lint."],
    ["Keep defaults safe for local use.", "Maintain separate values files for environments.", "Do not put passwords in values files committed to Git.", "Increment chart version for chart changes."],
    "Create Chart.yaml and values.yaml for payment-service, then render the chart with production overrides and inspect the resulting image and replica settings."
  ),

  "11|Template Functions": makeLesson(
    "Helm template functions transform values and generate Kubernetes manifest content. Functions can format strings, provide defaults, convert data, and produce predictable resource definitions.",
    "Template functions reduce duplication and help charts adapt to different release names, namespaces, labels, and environment configuration.",
    "Helm templates use Go template syntax with Helm-provided functions. Pipelines pass values between functions, while objects such as .Values, .Release, and .Chart provide chart context.",
    ["Identify values that need formatting or default behavior.", "Use template expressions in a resource manifest.", "Apply functions such as quote, default, upper, and replace.", "Render the chart with representative values.", "Inspect the final YAML and data types.", "Validate the generated resources."],
    "The payment-service chart uses a default replica count when none is supplied and quotes the configured image tag before rendering the Deployment.",
    ["helm template payment-service ./payment-service --debug", "helm lint ./payment-service", "helm template payment-service ./payment-service --set image.tag=1.4.1"],
    "For example, use {{ .Values.image.repository }} and {{ .Values.image.tag | quote }}. Use default carefully so an intentional zero or false value is not accidentally replaced.",
    ["A template function receives an unexpected type.", "Rendered strings are not quoted correctly.", "A default hides an invalid configuration.", "Template output is syntactically valid but semantically wrong."],
    ["Render with helm template --debug.", "Inspect the generated YAML rather than only the template source.", "Validate values and types.", "Use schema validation and chart linting where appropriate."],
    ["Prefer readable pipelines.", "Quote string values in generated YAML.", "Validate rendered output in CI.", "Avoid overly complex template logic when a simpler values structure is possible."],
    "Use default, quote, and upper functions in a payment-service chart and compare the rendered YAML for different input values."
  ),

  "11|Template Helpers": makeLesson(
    "Helm helper templates define reusable template fragments, commonly for resource names, labels, selectors, and annotations. They are often stored in templates/_helpers.tpl.",
    "Helpers keep chart templates consistent and reduce repeated expressions. A single naming or labeling rule can be reused by Deployments, Services, and other resources.",
    "Helm processes named template definitions using define and includes them using include. The include function returns text that can be piped through indentation functions such as nindent.",
    ["Create templates/_helpers.tpl.", "Define a chart name helper.", "Define common labels and selector labels.", "Include helpers in Deployment and Service templates.", "Render the chart.", "Verify that selectors match pod labels."],
    "The payment-service Deployment and Service use the same selector-label helper so the Service reliably routes traffic to the correct pods.",
    ["helm template payment-service ./payment-service", "helm lint ./payment-service", "helm template payment-service ./payment-service --debug"],
    "A helper can use {{- define \"payment-service.selectorLabels\" -}} and be inserted with {{- include \"payment-service.selectorLabels\" . | nindent 4 }}. Ensure indentation matches the surrounding YAML.",
    ["Template helper name is incorrect.", "Rendered YAML indentation is invalid.", "Deployment and Service labels do not match.", "Generated resource names exceed Kubernetes length limits."],
    ["Inspect rendered manifests.", "Compare selector and pod-template labels.", "Correct include context and indentation.", "Use consistent naming helpers and length-safe names."],
    ["Centralize common labels and names.", "Use selector labels consistently.", "Avoid changing stable selectors during upgrades.", "Keep helper definitions documented."],
    "Create reusable name and selector-label helpers and use them in both payment-service Deployment and Service templates."
  ),

  "11|Chart Dependencies": makeLesson(
    "Helm chart dependencies allow one chart to include and manage other charts. Dependencies are declared in Chart.yaml and downloaded or updated using Helm dependency commands.",
    "Dependencies make it possible to assemble an application release from reusable subcharts, such as a service chart that relies on a shared Redis or monitoring chart.",
    "The parent chart declares dependency names, versions, and repositories. Helm resolves dependency packages into the charts/ directory and renders them as part of the parent release.",
    ["Identify required subcharts.", "Add dependency declarations to Chart.yaml.", "Configure dependency versions and repositories.", "Run helm dependency update.", "Inspect downloaded charts and lock metadata.", "Render and validate the complete parent chart."],
    "A payment platform chart can include a separately maintained Redis dependency for a non-production lab, while production may use a managed external cache.",
    ["helm dependency list ./payment-platform", "helm dependency update ./payment-platform", "helm dependency build ./payment-platform", "helm template payment-platform ./payment-platform", "helm lint ./payment-platform"],
    "Declare dependencies with a chart name, version range, and repository. Commit Chart.lock for repeatable dependency resolution and review dependency updates.",
    ["Dependency repository cannot be reached.", "Requested chart version is unavailable.", "Chart.lock is inconsistent with Chart.yaml.", "Subchart values are overridden at the wrong nesting level."],
    ["Run helm repo list and helm repo update.", "Check dependency version and repository URL.", "Rebuild dependencies from the reviewed lock file.", "Inspect subchart value paths and rendered manifests."],
    ["Pin dependency versions.", "Review subchart security and maintenance.", "Commit lock metadata.", "Avoid adding dependencies that the application does not need."],
    "Add a chart dependency to a sample payment-platform chart, resolve it, and verify the generated manifests."
  ),

  "11|Helm Repositories": makeLesson(
    "A Helm repository is a location that hosts packaged charts and repository metadata. Teams use repositories to distribute versioned charts to CI systems and deployment environments.",
    "A centralized chart repository separates application chart distribution from source code and supports controlled release promotion.",
    "A repository exposes an index of available chart packages. Helm adds the repository URL under a local alias, refreshes its metadata, and downloads selected chart versions for installation.",
    ["Choose a trusted chart repository.", "Add the repository using a local alias.", "Refresh repository metadata.", "Search for available charts.", "Inspect chart versions and metadata.", "Install a selected version or package."],
    "The DevMavox team publishes the payment-service chart to an approved internal chart repository. Jenkins retrieves a specific chart version during deployment.",
    ["helm repo add stable https://charts.helm.sh/stable", "helm repo update", "helm repo list", "helm search repo nginx", "helm pull stable/nginx --version CHART_VERSION"],
    "Use a trusted HTTPS repository URL and a controlled repository alias. Replace example chart names and versions with versions actually available in the selected repository.",
    ["Repository URL is unreachable.", "Repository index is invalid or stale.", "Chart version cannot be found.", "An untrusted repository provides an unexpected package."],
    ["Check repository connectivity and TLS.", "Run helm repo update.", "Confirm chart name and available version.", "Verify package provenance and source before use."],
    ["Use approved repositories only.", "Pin chart versions.", "Review chart changes before production use.", "Use authenticated private repositories for internal charts."],
    "Add a trusted chart repository, search for a chart, inspect available versions, and download one selected version."
  ),

  "11|Release Installation": makeLesson(
    "A Helm release is an installed instance of a chart in a Kubernetes cluster. Installation creates the resources rendered from the chart using the selected values and release name.",
    "Helm installation makes repeatable application deployment possible and records release metadata for later upgrades, status checks, and rollbacks.",
    "The Helm CLI renders a chart using its defaults and supplied overrides, then submits the generated Kubernetes objects to the API server. Release metadata tracks the chart and revision.",
    ["Select the target cluster context and namespace.", "Validate the chart and values.", "Render manifests before installation.", "Install the chart with a clear release name.", "Check Helm release status.", "Verify Kubernetes resources and application health."],
    "Install payment-service into the payments namespace using a production values file and verify that the expected Deployment and Service are created.",
    ["kubectl config current-context", "helm lint ./payment-service", "helm template payment-service ./payment-service -f values-production.yaml", "helm install payment-service ./payment-service -n payments --create-namespace -f values-production.yaml", "helm status payment-service -n payments", "kubectl get pods,svc -n payments"],
    "Specify release name, namespace, chart version, and values file explicitly. Use --wait and an appropriate timeout when the pipeline must wait for Kubernetes resources to become ready.",
    ["Release installation fails because of invalid manifests.", "Resources already exist and are not owned by the release.", "Pods remain unready after installation.", "The command targets the wrong cluster."],
    ["Confirm current context and namespace.", "Run helm lint and inspect rendered YAML.", "Inspect Kubernetes events and pod logs.", "Resolve existing resource ownership deliberately rather than deleting production resources blindly."],
    ["Use predictable release names.", "Review rendered manifests before production installation.", "Use explicit values files.", "Keep secrets outside ordinary chart values.", "Verify application health after Helm reports success."],
    "Install payment-service with Helm into a payments namespace and verify the release status, Deployment readiness, and Service."
  ),

  "11|Upgrade and Rollback": makeLesson(
    "Helm upgrades update an existing release using a new chart version or configuration values. Rollbacks restore a previous release revision when a deployment change causes problems.",
    "Controlled Helm upgrades support application releases without manually editing each Kubernetes object. Release history provides a structured way to inspect and recover earlier configurations.",
    "Helm compares the new rendered resources with the existing release state and submits changes to Kubernetes. Each successful upgrade creates a new release revision. Rollback applies a previous revision's configuration and resources.",
    ["Inspect the current release and revision history.", "Validate the new chart and values.", "Run an upgrade using the intended chart version.", "Wait for resources and application readiness.", "Inspect rollout status and application behavior.", "Rollback to a previous revision if necessary."],
    "The payment-service chart changes from image 1.4.0 to 1.4.1. When the new pods fail readiness, the operator rolls back the Helm release to the previous revision.",
    ["helm list -n payments", "helm history payment-service -n payments", "helm upgrade payment-service ./payment-service -n payments -f values-production.yaml --wait --timeout 5m", "helm status payment-service -n payments", "helm rollback payment-service 1 -n payments --wait", "kubectl rollout status deployment/payment-service -n payments"],
    "Use --install when a pipeline should install a missing release. Use --atomic when automatic rollback on upgrade failure is appropriate and understood. Database changes and external side effects may require separate recovery steps.",
    ["Upgrade fails due to invalid values.", "New pods do not become ready.", "Immutable Kubernetes fields prevent an update.", "Rollback restores manifests but not an incompatible database migration."],
    ["Inspect Helm upgrade output and release history.", "Review generated manifests and Kubernetes events.", "Use helm rollback to a known healthy revision.", "Handle database and external changes using a separate recovery plan."],
    ["Test upgrades in staging.", "Keep chart and application versions traceable.", "Use readiness checks and deployment timeouts.", "Plan backward-compatible database migrations.", "Practice rollback before production incidents."],
    "Upgrade payment-service from one chart revision to another, simulate a failed rollout, and restore the previous healthy revision."
  ),

  "11|Environment-specific Values": makeLesson(
    "Environment-specific values files override chart defaults for development, staging, and production. They allow the same chart to deploy with different resource, replica, image, and networking settings.",
    "A consistent chart with controlled values reduces configuration drift and prevents teams from maintaining separate Kubernetes templates for each environment.",
    "Helm merges values from the chart defaults, supplied values files, and command-line overrides. Later overrides take precedence, so deployment pipelines must use the intended file and values order.",
    ["Define safe chart defaults.", "Create development, staging, and production values files.", "Set environment-specific image and resource values.", "Render each environment before deployment.", "Compare important settings.", "Deploy using the correct environment values file."],
    "Development uses one or two payment-service replicas and lower resource requests. Production uses multiple replicas, stricter resource limits, and the approved ingress configuration.",
    ["helm template payment-service ./payment-service -f values-dev.yaml", "helm template payment-service ./payment-service -f values-staging.yaml", "helm template payment-service ./payment-service -f values-production.yaml", "helm upgrade --install payment-service ./payment-service -n payments -f values-production.yaml"],
    "Keep shared defaults in values.yaml and environment overrides in separately reviewed files. Do not store credentials in Git-tracked values files; reference a secure secret-management workflow.",
    ["Wrong values file is used in production.", "A later override unexpectedly replaces an earlier setting.", "Production values contain development endpoints.", "A required key is missing from one environment."],
    ["Print and inspect the exact CI command and values file.", "Render the chart with the same arguments used by deployment.", "Compare environment-specific rendered manifests.", "Correct configuration and repeat validation."],
    ["Keep values files in version control.", "Review production changes through pull requests.", "Avoid duplicating entire values files unnecessarily.", "Validate all environments in CI.", "Keep secrets out of plain-text values."],
    "Create dev, staging, and production values files for payment-service and compare replicas, image tags, resources, and Service exposure."
  ),

  "11|Argo CD Fundamentals": makeLesson(
    "Argo CD is a declarative GitOps continuous delivery tool for Kubernetes. It watches application configuration stored in Git and compares it with the live cluster state.",
    "Argo CD provides a consistent and auditable deployment workflow. Teams can review changes in Git and let Argo CD synchronize approved desired state into Kubernetes.",
    "Argo CD contains an API server, repository server, application controller, and supporting components. The repository server generates manifests from Git sources, while the application controller compares desired and live state and performs synchronization when configured.",
    ["Store Kubernetes or Helm configuration in Git.", "Install Argo CD in the target cluster.", "Connect the Git repository.", "Create an Argo CD Application.", "Compare desired and live state.", "Synchronize the application and monitor health."],
    "The payment-service Helm chart and production values are committed to Git. Argo CD observes the repository and deploys the approved configuration to the EKS payments namespace.",
    ["kubectl get pods -n argocd", "argocd version", "argocd login ARGOCD_SERVER", "argocd app list", "argocd app get payment-service", "argocd app sync payment-service"],
    "An Application resource defines source repository, path or chart, destination cluster and namespace, and sync policy. Protect repository credentials and Argo CD API access.",
    ["Repository connection fails.", "Application remains Unknown or OutOfSync.", "Manifest generation fails.", "Argo CD cannot apply resources to the destination cluster."],
    ["Inspect repository credentials and connectivity.", "Check application source path and manifest generation.", "Review sync errors and destination permissions.", "Verify target cluster and namespace configuration."],
    ["Keep desired configuration in Git.", "Use pull-request reviews for production changes.", "Restrict Argo CD permissions.", "Monitor application sync and health status.", "Avoid unmanaged manual changes to GitOps-owned resources."],
    "Connect a Git repository containing the payment-service Helm chart to Argo CD and deploy the application into the payments namespace."
  ),

  "11|Argo CD Architecture": makeLesson(
    "Argo CD uses separate components to provide its user interface and API, generate manifests from repositories, and reconcile applications with Kubernetes clusters.",
    "Knowing component responsibilities helps troubleshoot repository fetch failures, manifest generation errors, synchronization failures, and application health problems.",
    "The API server provides UI, CLI, and API access. The repository server clones sources and renders manifests. The application controller compares desired and live resources and performs sync operations. Redis and other supporting services assist internal operation depending on deployment configuration.",
    ["User creates or updates an Application resource.", "Application controller observes the Application.", "Repository server retrieves the configured source.", "Repository server generates Kubernetes manifests.", "Controller compares desired and live state.", "Controller reports status and performs permitted sync actions."],
    "A payment-service Application becomes OutOfSync after a Git commit. The repository server renders the updated Helm chart, and the controller identifies the changed Deployment image.",
    ["kubectl get pods -n argocd", "kubectl get deployments -n argocd", "kubectl logs deployment/argocd-repo-server -n argocd", "kubectl logs deployment/argocd-application-controller -n argocd", "argocd app get payment-service"],
    "Component names and deployment topology can vary by installation mode and version. Inspect the actual Argo CD namespace and supported installation configuration.",
    ["Repository server cannot fetch Git.", "Manifest generation repeatedly fails.", "Application controller is unhealthy.", "API server login or UI access fails."],
    ["Inspect component pod readiness and logs.", "Verify repository credentials and network access.", "Validate Helm or Kustomize configuration.", "Check API server service and ingress configuration."],
    ["Monitor Argo CD component health.", "Use supported installation manifests or Helm charts.", "Scale components based on application count and repository workload.", "Restrict component and API access."],
    "Trace an application change through the Argo CD API server, repository server, and application controller."
  ),

  "11|Application Resources": makeLesson(
    "An Argo CD Application is a custom resource that defines the desired source configuration and destination for a Kubernetes application.",
    "Application resources allow Argo CD to manage workloads consistently across clusters and namespaces while reporting synchronization and health status.",
    "The Application specification identifies a Git repository or Helm source, revision, path or chart, destination cluster, namespace, and synchronization policy. Argo CD compares the generated manifests with live resources.",
    ["Create a Git repository containing payment-service manifests or a Helm chart.", "Define an Argo CD Application.", "Set the source repository and revision.", "Set the destination cluster and namespace.", "Apply the Application resource.", "Inspect sync and health status."],
    "The payment-service Application points to the production branch and charts/payment-service path, deploying to the payments namespace in the selected EKS cluster.",
    ["kubectl apply -f payment-service-application.yaml", "kubectl get applications -n argocd", "kubectl describe application payment-service -n argocd", "argocd app get payment-service", "argocd app diff payment-service"],
    "Set project, source, target revision, destination server, destination namespace, and sync policy explicitly. Use a dedicated Argo CD Project to control repository and destination boundaries.",
    ["Application references an incorrect Git path.", "Destination cluster or namespace is wrong.", "Application remains OutOfSync.", "Manifest generation reports missing chart values."],
    ["Inspect Application spec and status conditions.", "Validate repository URL, revision, path, and chart configuration.", "Check destination registration and namespace permissions.", "Run an application diff before syncing."],
    ["Use one clear Application definition per deployment boundary.", "Separate production and non-production projects.", "Review source revision and destination carefully.", "Keep Application definitions in version control."],
    "Create an Argo CD Application for payment-service and verify its source, target revision, destination namespace, and sync status."
  ),

  "11|GitOps Workflow": makeLesson(
    "GitOps is an operational model where Git stores the declarative desired state of infrastructure and applications. Automated controllers reconcile the running environment with that state.",
    "GitOps creates an auditable change history and reduces direct manual changes to production clusters. Pull requests become the controlled path for reviewing deployment configuration.",
    "Developers commit application and deployment configuration to Git. Argo CD detects a revision, generates manifests, compares desired state with live state, and synchronizes approved changes according to policy.",
    ["Build and test the Spring Boot application.", "Publish an immutable image to ECR.", "Update the Helm values or Kubernetes manifest in Git.", "Open a pull request and complete review.", "Merge the approved change.", "Argo CD detects the new revision and synchronizes it.", "Verify workload health and release evidence."],
    "After Jenkins publishes payment-service image git-a82f91c, a pull request updates the Helm values file. Once merged, Argo CD deploys the approved image to EKS.",
    ["git status", "git checkout -b release/payment-service-1.4.1", "git add charts/payment-service/values-production.yaml", "git commit -m 'Deploy payment-service 1.4.1'", "git push origin release/payment-service-1.4.1", "argocd app diff payment-service", "argocd app sync payment-service"],
    "Separate application build pipelines from deployment configuration workflows when appropriate. Keep secrets in approved secret-management systems and define clear repository ownership.",
    ["Git change is not detected.", "Argo CD cannot render the repository.", "Manual changes create drift.", "An unreviewed commit reaches production.", "The deployed image does not match the approved build."],
    ["Verify repository revision and webhook or polling behavior.", "Inspect manifest generation errors.", "Compare Git state and live state.", "Restore the approved configuration through Git.", "Verify deployed image digest and commit metadata."],
    ["Use pull requests and protected branches.", "Promote tested artifacts rather than rebuilding.", "Keep deployment changes auditable.", "Restrict direct production changes.", "Monitor reconciliation and workload health."],
    "Complete a GitOps release exercise: publish an ECR image, update Helm values through a pull request, synchronize with Argo CD, and verify the deployed revision."
  ),

  "11|Automated Sync and Self-healing": makeLesson(
    "Automated sync allows Argo CD to apply detected Git changes without a manual sync command. Self-healing enables Argo CD to reconcile certain live-state changes back to the desired Git state.",
    "These features reduce manual deployment work and help maintain consistent cluster configuration. They must be configured carefully to avoid unexpected changes during incidents.",
    "The application controller compares desired manifests from Git with live Kubernetes objects. Automated sync applies eligible changes, while selfHeal can trigger reconciliation when live resources drift from Git.",
    ["Define an Application with automated sync policy.", "Enable prune only when resource deletion is intended.", "Enable selfHeal where continuous reconciliation is appropriate.", "Commit a safe configuration change to Git.", "Observe automatic synchronization.", "Modify a managed field manually and observe reconciliation."],
    "A payment-service replica count changes from two to three in Git. Argo CD automatically synchronizes the Deployment. If an operator manually changes it back to two, self-healing can restore the Git-defined value.",
    ["kubectl get application payment-service -n argocd -o yaml", "argocd app get payment-service", "argocd app diff payment-service", "argocd app sync payment-service", "kubectl get deployment payment-service -n payments -w"],
    "Automated sync, prune, and selfHeal are separate controls. Enable pruning only after understanding resource ownership and deletion impact. Use sync windows or approval controls where production policy requires them.",
    ["A sync loop repeatedly applies changes.", "Pruning deletes a resource that should be retained.", "Self-healing reverses an emergency manual change.", "Automated sync fails because of insufficient permissions."],
    ["Inspect the Application sync policy and diff.", "Disable or adjust automation through a reviewed Git change when necessary.", "Restore required state in Git.", "Use an approved break-glass process and reconcile afterward."],
    ["Start with manual sync in new environments.", "Enable self-healing only for resources with clear ownership.", "Use prune cautiously.", "Document emergency change procedures.", "Monitor sync failures and repeated reconciliation."],
    "Enable automated sync for a test payment-service Application, change a replica value in Git, and observe the resulting rollout."
  ),

  "11|Health and Sync Status": makeLesson(
    "Argo CD reports synchronization status and application health as separate dimensions. Sync status indicates whether live resources match Git, while health indicates whether resources are functioning according to Argo CD health assessment.",
    "A resource can be synchronized but unhealthy, or healthy while OutOfSync. Operators need both views to determine whether a release is safe.",
    "The application controller compares generated manifests with live objects to calculate sync status. Resource health assessments evaluate states such as Deployment availability and pod readiness, and the Application summarizes these results.",
    ["Open the payment-service Application.", "Inspect overall sync status.", "Inspect application health.", "Review individual resource status.", "Investigate unhealthy or OutOfSync resources.", "Verify the application after synchronization."],
    "The payment-service Deployment matches Git and shows Synced, but its pods are failing readiness checks and the application health is Degraded. A successful sync alone does not mean the release is healthy.",
    ["argocd app get payment-service", "argocd app resources payment-service", "argocd app diff payment-service", "kubectl get deployments,pods -n payments", "kubectl describe deployment payment-service -n payments", "kubectl get events -n payments --sort-by=.metadata.creationTimestamp"],
    "Health assessment depends on resource type and configured health checks. A custom resource may need a custom health assessment if its status is not interpreted as expected.",
    ["Application remains OutOfSync.", "Deployment is Synced but Degraded.", "A resource reports Progressing for too long.", "Custom resource health is Unknown."],
    ["Compare desired and live manifests.", "Inspect Deployment conditions and pod readiness.", "Check controller events and application logs.", "Review custom health assessment configuration where applicable."],
    ["Monitor sync and health separately.", "Do not equate a successful sync with application success.", "Use readiness and rollout checks.", "Alert on prolonged Degraded or Progressing states."],
    "Create a payment-service scenario where resources are Synced but pods are unhealthy, then diagnose the health status independently."
  ),

  "11|Drift Detection": makeLesson(
    "Configuration drift occurs when the live Kubernetes resources differ from the desired configuration stored in Git. Argo CD detects differences by comparing generated manifests with cluster state.",
    "Drift detection identifies manual changes, accidental configuration edits, and unmanaged resources before they create inconsistent production behavior.",
    "Argo CD continuously or periodically compares Git-generated manifests with live Kubernetes objects. It presents differences in the Application view and can optionally reconcile them using automated sync and self-healing.",
    ["Store the approved payment-service configuration in Git.", "Synchronize it to the cluster.", "Make a controlled manual change to a managed field.", "Refresh the Argo CD Application.", "Inspect the difference.", "Restore the desired state through Git or approved reconciliation."],
    "Git defines three payment-service replicas, but an operator manually scales the Deployment to five. Argo CD detects the replica drift and reports OutOfSync.",
    ["argocd app get payment-service", "argocd app diff payment-service", "argocd app refresh payment-service", "kubectl get deployment payment-service -n payments -o yaml", "argocd app sync payment-service"],
    "Some fields are changed by Kubernetes controllers or admission webhooks. Configure ignoreDifferences only for justified fields and avoid hiding meaningful application drift.",
    ["Application shows unexpected OutOfSync status.", "A controller repeatedly changes a managed field.", "Ignored differences hide a real configuration problem.", "Manual changes are overwritten by self-healing."],
    ["Use app diff to identify the exact field.", "Determine whether the difference is intentional or controller-generated.", "Update Git for approved changes.", "Use narrow ignore rules only when required and documented."],
    ["Treat Git as the source of truth.", "Avoid routine manual production edits.", "Review drift regularly.", "Keep ignoreDifferences rules minimal.", "Document break-glass changes and reconcile them back into Git."],
    "Change the live payment-service replica count manually, detect the drift in Argo CD, and restore the Git-defined configuration."
  ),

  "11|RBAC and Repository Credentials": makeLesson(
    "Argo CD RBAC controls which users and groups can view, synchronize, or modify applications and projects. Repository credentials allow Argo CD to retrieve private Git repositories or chart sources.",
    "Production GitOps requires both secure user access and reliable source retrieval. Incorrect permissions can expose deployment controls or prevent applications from loading configuration.",
    "Argo CD RBAC policies map identities and groups to roles and application actions. Repository credentials are stored through supported Argo CD secret mechanisms and used by the repository server to authenticate to source systems.",
    ["Define user and team access requirements.", "Create least-privilege Argo CD roles or project roles.", "Configure identity provider integration if used.", "Add private repository credentials securely.", "Test repository connectivity.", "Verify permitted and denied application actions."],
    "Developers can view payment-service sync status, while the release engineering group can synchronize production applications. Repository access uses a read-only deploy key or approved token.",
    ["argocd account get-user-info", "argocd admin settings rbac can payment-service get applications --namespace argocd", "argocd repo list", "argocd repo add https://github.com/example/payment-config.git --username GIT_USERNAME --password GIT_TOKEN", "argocd app get payment-service"],
    "The repository URL and credential must match the actual Git provider. Use supported secret storage and external identity integration where available. Never commit tokens or private keys to Git.",
    ["Repository reports authentication failure.", "User receives permission denied.", "RBAC policy grants excessive access.", "Token expires and manifest refresh stops working."],
    ["Check repository connection status and credential scope.", "Verify identity provider groups and RBAC mappings.", "Use Argo CD permission checks and application project policies.", "Rotate expired credentials and retest repository access."],
    ["Use read-only repository credentials where possible.", "Grant sync permissions only to approved roles.", "Rotate tokens and keys.", "Keep project source and destination restrictions explicit.", "Audit changes to RBAC and repository secrets."],
    "Configure a private Git repository connection and design Argo CD roles for read-only developers and authorized production releasers."
  ),

  "11|Troubleshooting": makeLesson(
    "Helm and Argo CD troubleshooting requires identifying whether the failure occurs in chart packaging, template rendering, repository access, Kubernetes authorization, synchronization, or application health.",
    "A deployment may fail even when the application code is correct. Separating chart, Git, controller, cluster, and workload errors prevents unnecessary changes to production resources.",
    "Helm renders and installs chart resources. Argo CD retrieves Git sources, generates manifests, compares live state, and synchronizes changes. Kubernetes controllers then operate the created resources.",
    ["Identify the release or Argo CD Application.", "Check Helm release status or Argo CD sync status.", "Inspect chart rendering and generated manifests.", "Check repository credentials and revision.", "Inspect Kubernetes events and resource conditions.", "Apply a controlled fix and verify workload health."],
    "The payment-service Application reports ComparisonError because the repository contains an invalid Helm template. The engineer runs helm lint and helm template locally, fixes the template, commits the correction, and verifies Argo CD synchronization.",
    ["helm list -A", "helm status payment-service -n payments", "helm history payment-service -n payments", "helm lint ./charts/payment-service", "helm template payment-service ./charts/payment-service --debug", "argocd app get payment-service", "argocd app diff payment-service", "kubectl get events -n payments --sort-by=.metadata.creationTimestamp"],
    "Collect the exact release name, namespace, Git revision, chart version, Application status, and error message. Do not delete release Secrets or Kubernetes resources as a first troubleshooting action.",
    ["Chart lint or template errors: validate templates and values.", "Repository connection errors: inspect URL, credentials, and network.", "ComparisonError: inspect manifest generation and API compatibility.", "SyncFailed: inspect RBAC, admission, and resource conflicts.", "Degraded health: inspect pods, probes, and dependencies.", "Repeated drift: identify manual changes or controller-managed fields."],
    ["Fix chart or repository issues in version control.", "Correct the minimum required permissions.", "Review the diff before retrying sync.", "Use Helm rollback or Git revert when a release must be reversed.", "Verify application readiness and endpoint behavior."],
    ["Prefer read-only diagnostics first.", "Keep deployment configuration in Git.", "Avoid manual resource deletion.", "Record failed revision and recovery revision.", "Test charts and policies before production promotion."],
    "Troubleshoot a failed payment-service GitOps release caused by an invalid Helm template, then verify repository, sync, and workload health."
  ),

  "11|Production Hands-on Lab": makeLesson(
    "This lab deploys a Spring Boot payment service to Amazon EKS using a versioned Helm chart and Argo CD GitOps. The application image is published to ECR and deployment configuration is maintained in Git.",
    "The lab combines chart packaging, environment values, release management, Git review, automated synchronization, drift detection, and operational recovery into one production-style workflow.",
    "Jenkins tests and builds the payment-service image and pushes it to ECR. A Git repository stores the Helm chart and production values. Argo CD retrieves that configuration, renders the chart, compares desired state with EKS, and synchronizes the release.",
    ["Create a Helm chart for payment-service.", "Define Deployment, Service, probes, and resource values.", "Create development and production values files.", "Validate and package the chart.", "Publish deployment configuration to Git.", "Connect the repository to Argo CD.", "Create an Application targeting the EKS payments namespace.", "Review the initial diff and synchronize.", "Verify health and sync status.", "Test a chart upgrade and controlled rollback.", "Test drift detection and restore Git-defined state."],
    "Jenkins publishes payment-service image git-a82f91c to ECR. The release pull request updates the production Helm values. Argo CD detects the merged change, deploys the image, and reports Synced and Healthy after the pods pass readiness checks.",
    ["helm lint ./charts/payment-service", "helm template payment-service ./charts/payment-service -f ./charts/payment-service/values-production.yaml", "helm package ./charts/payment-service", "git status", "git add charts/payment-service", "git commit -m 'Release payment-service configuration'", "git push origin release/payment-service", "argocd app get payment-service", "argocd app diff payment-service", "argocd app sync payment-service", "kubectl rollout status deployment/payment-service -n payments", "helm history payment-service -n payments"],
    "Replace sample Git URLs, cluster names, image URIs, account IDs, and namespaces with actual project values. Keep production secrets outside Git. Use protected branches, least-privilege Argo CD roles, and reviewed sync policies.",
    ["Helm chart fails lint or rendering.", "Argo CD cannot authenticate to the Git repository.", "Application points to the wrong EKS cluster or namespace.", "Sync fails because of RBAC or immutable fields.", "Pods remain unhealthy after successful sync.", "A manual change creates drift.", "A new release requires rollback."],
    ["Correct chart templates and values before publishing.", "Repair repository credentials using a secure credential process.", "Verify Application source and destination.", "Inspect sync errors and Kubernetes events.", "Fix image access, probes, or dependencies.", "Restore desired state through Git or approved sync.", "Revert the release configuration and synchronize a known healthy revision."],
    ["Version charts and application images separately.", "Use immutable image references.", "Require pull-request review for production.", "Keep Git as the source of truth.", "Protect repository credentials and Argo CD permissions.", "Monitor both sync and health status.", "Practice rollback and drift recovery."],
    "Complete an end-to-end GitOps release: publish an ECR image, update the payment-service Helm chart in Git, deploy through Argo CD, verify health, introduce controlled drift, and restore the approved configuration."
  ),
};