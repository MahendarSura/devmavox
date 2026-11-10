export type HelmArgoSection = {
  title: string;
  content: string;
  code?: string;
  practicalNotes?: string[];
};

export type HelmArgoLesson = {
  title: string;
  description: string;
  sections: HelmArgoSection[];
  exercise: string;
};

const section = (
  title: string,
  content: string,
  code?: string,
  practicalNotes?: string[]
): HelmArgoSection => ({
  title,
  content,
  ...(code ? { code } : {}),
  ...(practicalNotes ? { practicalNotes } : {})
});

export const stageElevenLessonOverrides: Record<string, HelmArgoLesson> = {
  "Helm Fundamentals": {
    title: "Helm Fundamentals",
    description: "Understand Helm as a Kubernetes package manager and learn how charts simplify repeatable application deployments.",
    sections: [
      section("Why Helm Exists", "Helm packages Kubernetes manifests into reusable charts. Instead of maintaining separate copied YAML files for every environment, teams define templates and supply environment-specific values. This reduces duplication and creates a consistent deployment interface."),
      section("Charts, Releases, and Repositories", "A chart is the package containing templates and metadata. A release is an installed instance of a chart in a Kubernetes cluster. A repository distributes packaged charts and their index metadata. Multiple releases can use the same chart with different values."),
      section("Helm CLI Installation and Context", "Install a Helm version supported by your team and verify the active Kubernetes context before changing releases. Helm uses Kubernetes access configuration, so the current kubeconfig context determines the target cluster.", "helm version\nhelm env\nkubectl config current-context\nhelm list --all-namespaces"),
      section("Basic Chart Operations", "helm create generates a starter chart. helm lint checks chart structure and common issues. helm template renders Kubernetes manifests locally without installing them. These checks should run before deployment.", "helm create payment-api\nhelm lint ./payment-api\nhelm template payment-api ./payment-api"),
      section("Helm in CI/CD", "A CI pipeline can validate chart structure, render templates, scan rendered manifests, package the chart, and publish it to a trusted chart repository. Deployment stages should promote a tested chart version rather than rebuilding different artifacts for each environment."),
      section("Operational Boundaries", "Helm manages Kubernetes release resources, but it does not automatically guarantee application health, safe database migrations, or correct traffic behavior. Validate rollout readiness and application-level health after each release.")
    ],
    exercise: "Install Helm, create a sample chart, inspect its files, run helm lint, and render its templates. Record the rendered Kubernetes resources and explain the difference between a chart and a release."
  },

  "Helm Architecture": {
    title: "Helm Architecture",
    description: "Understand Helm 3 client-side operation, chart rendering, Kubernetes API interaction, and release state.",
    sections: [
      section("Helm 3 Operating Model", "Helm 3 runs as a client-side CLI and communicates with the Kubernetes API using the user's kubeconfig. Unlike older Helm 2 deployments, Helm 3 does not require a Tiller server inside the cluster."),
      section("Chart Rendering Pipeline", "Helm loads chart metadata, default values, supplied overrides, and templates. The Go template engine evaluates expressions and produces Kubernetes YAML. The rendered manifests are then submitted to the Kubernetes API."),
      section("Release Records", "Helm stores release information in Kubernetes Secrets by default. Release records include chart and configuration information needed for history and rollback. Protect access to these records because they may contain sensitive configuration values."),
      section("Install and Upgrade Lifecycle", "During installation Helm renders the chart and creates resources. During upgrade it compares the desired release with the existing release and applies resource changes. Kubernetes controllers then reconcile the resulting objects."),
      section("Inspecting Release State", "Use helm status, helm history, and helm get to inspect release state, values, and rendered manifests. These commands are useful during failed deployments and change reviews.", "helm list -A\nhelm status payment-api -n production\nhelm history payment-api -n production\nhelm get values payment-api -n production\nhelm get manifest payment-api -n production"),
      section("Permissions and Security", "Helm inherits the permissions of the Kubernetes identity used by the CLI. A pipeline identity should have only the namespace and resource permissions needed for its deployment. Avoid broad cluster-admin access for routine release automation.")
    ],
    exercise: "Install a chart into a test namespace and inspect its release status, history, values, and generated manifest. Explain how Helm interacts with the Kubernetes API and where release history is stored."
  },

  "Chart Structure": {
    title: "Chart Structure",
    description: "Explore chart directories, templates, default values, dependencies, and packaged chart artifacts.",
    sections: [
      section("Standard Directory Layout", "A Helm chart normally contains Chart.yaml, values.yaml, a templates directory, and optionally charts, crds, and a README. Each file has a specific responsibility and should be maintained with the application source."),
      section("Templates Directory", "The templates directory contains Kubernetes resource templates. Files can use Go template expressions and values from the chart context. Helm renders these files into Kubernetes manifests during installation or upgrade."),
      section("Static Files and Supporting Content", "The files directory can hold non-template files accessed through template functions. The crds directory contains CustomResourceDefinition files handled specially by Helm. Keep chart documentation and examples clear so consumers understand supported configuration."),
      section("Chart Creation and Inspection", "Create a chart and inspect its generated structure before customizing it. Remove unused sample templates rather than shipping unnecessary resources.", "helm create payment-api\nGet-ChildItem .\\payment-api -Recurse\nhelm show chart ./payment-api\nhelm show values ./payment-api"),
      section("Packaging a Chart", "helm package validates and packages a chart directory into a versioned archive. The resulting .tgz file can be stored in an artifact repository and promoted through deployment environments.", "helm lint ./payment-api\nhelm package ./payment-api\nGet-ChildItem *.tgz"),
      section("Chart Design Conventions", "Use meaningful template names, consistent labels, explicit resource names where necessary, and documented values. Keep application-specific defaults in values.yaml and avoid embedding environment secrets in the chart.")
    ],
    exercise: "Generate a chart, inspect every standard directory, remove unused starter templates, add a documented application value, lint the chart, and package it as a versioned archive."
  },

  "Chart.yaml and values.yaml": {
    title: "Chart.yaml and values.yaml",
    description: "Define chart metadata and configurable deployment defaults using Chart.yaml and values.yaml.",
    sections: [
      section("Chart Metadata Fields", "Chart.yaml describes the chart name, API version, chart version, application version, description, type, maintainers, and dependencies. The chart version tracks changes to the package; appVersion describes the application version and does not automatically control the image tag."),
      section("Versioning Rules", "Use semantic versioning for chart releases. Increment the chart version when templates, defaults, or chart behavior change. Keep application versioning meaningful and separate from chart package versioning."),
      section("Default Values", "values.yaml contains default configuration consumed by templates. Define sensible defaults for image, replica count, service, resources, and probes. Avoid embedding passwords, tokens, or private keys."),
      section("Values Precedence", "Values can come from chart defaults, parent charts, supplied values files, and command-line overrides. More specific user-supplied values override defaults. Review the effective values during troubleshooting.", "helm show values ./payment-api\nhelm get values payment-api -n production\nhelm get values payment-api -n production --all"),
      section("Example Metadata and Defaults", "A chart should declare a stable chart version and explicit application defaults. This example separates chart metadata from deployment configuration.", "apiVersion: v2\nname: payment-api\ndescription: Helm chart for the payment API\ntype: application\nversion: 1.2.0\nappVersion: \"3.4.1\"\n\n# values.yaml\nreplicaCount: 2\nimage:\n  repository: nginx\n  tag: \"1.27\"\n  pullPolicy: IfNotPresent\nservice:\n  type: ClusterIP\n  port: 80"),
      section("Schema Validation", "A values.schema.json file can validate value types and required properties before templates are rendered. Use schema constraints to reject invalid ports, replica counts, and unsupported configuration values."),
      section("Configuration Documentation", "Document each supported value, its type, default, and operational impact. Clear documentation prevents teams from guessing which values are safe to override in production.")
    ],
    exercise: "Create Chart.yaml and values.yaml for a sample service. Add image, replica, service, resource, and probe values. Change values through a custom file and verify the rendered output."
  },

  "Template Functions": {
    title: "Template Functions",
    description: "Use Helm and Go template functions to generate flexible Kubernetes manifests safely.",
    sections: [
      section("Template Expression Basics", "Helm templates use Go template syntax. Expressions are enclosed in double braces and can access chart metadata, release metadata, and values. Whitespace trimming controls generated YAML formatting."),
      section("String and Default Functions", "Functions such as quote, default, upper, lower, trim, and replace help normalize values. Use quote for string values that may otherwise be interpreted as YAML booleans or numbers."),
      section("Conditional Rendering", "if, else, and with control whether sections are rendered. Conditions are useful for optional Ingress, autoscaling, or monitoring resources. Validate both enabled and disabled cases.", "{{- if .Values.ingress.enabled }}\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: {{ include \"payment-api.fullname\" . }}\nspec:\n  ingressClassName: {{ .Values.ingress.className | quote }}\n{{- end }}"),
      section("Iteration with range", "range iterates over lists and maps. It is useful for rendering environment variables, additional ports, volumes, and multiple routing rules. Use stable keys and test empty collections."),
      section("Pipelines and Formatting", "Pipelines pass one function's output to another. nindent and indent help generate nested YAML. Incorrect indentation can produce invalid manifests even when the template itself parses.", "name: {{ .Values.name | default .Chart.Name | quote }}\nlabels:\n{{- include \"payment-api.labels\" . | nindent 2 }}"),
      section("Required Values and Validation", "Use required when a value must be supplied. Combine template validation with values.schema.json so configuration errors are caught before deployment. Avoid silently defaulting critical production settings."),
      section("Debugging Template Output", "Use helm lint and helm template --debug to inspect generated output. When rendering fails, identify the template file and line, check missing values, and verify the data type expected by the expression.", "helm lint ./payment-api\nhelm template payment-api ./payment-api --debug\nhelm template payment-api ./payment-api -f values-production.yaml")
    ],
    exercise: "Add a conditional Ingress, a range-based environment variable list, a default image pull policy, and a required application setting. Render the chart with feature enabled and disabled values."
  },

  "Template Helpers": {
    title: "Template Helpers",
    description: "Create reusable named templates for consistent labels, names, selectors, and Kubernetes metadata.",
    sections: [
      section("Why Helpers Matter", "Named templates prevent repeated YAML fragments across Deployments, Services, and Ingress resources. A helper centralizes naming and labeling conventions so resources remain consistent."),
      section("Defining Named Templates", "Named templates are commonly stored in _helpers.tpl. They are not rendered as standalone Kubernetes resources. Use define to declare a helper and include to insert its output into another template."),
      section("Common Name Helpers", "fullname helpers create predictable resource names while respecting Kubernetes name length constraints. Avoid generating names differently across related resources because Service selectors and ownership labels must match.", "{{- define \"payment-api.fullname\" -}}\n{{- printf \"%s-%s\" .Release.Name .Chart.Name | trunc 63 | trimSuffix \"-\" -}}\n{{- end -}}"),
      section("Reusable Label Helpers", "Standard labels improve resource selection, observability, and release tracking. Keep selector labels stable and distinguish them from descriptive metadata labels.", "{{- define \"payment-api.labels\" -}}\napp.kubernetes.io/name: {{ include \"payment-api.name\" . }}\napp.kubernetes.io/instance: {{ .Release.Name }}\napp.kubernetes.io/version: {{ .Chart.AppVersion | quote }}\napp.kubernetes.io/managed-by: {{ .Release.Service }}\nhelm.sh/chart: {{ printf \"%s-%s\" .Chart.Name .Chart.Version | replace \"+\" \"_\" }}\n{{- end -}}"),
      section("include Versus template", "include returns rendered template text and can be piped through functions such as nindent. template writes output directly and is less flexible for formatting. include is generally preferred when helper output must be indented."),
      section("Helper Scope and Context", "The dot represents the current context. When passing a custom dictionary or nested context to a helper, ensure the helper receives the fields it expects. Use explicit context handling to avoid missing release or chart metadata."),
      section("Testing Helper Changes", "Render every resource that consumes a helper and verify labels, names, selectors, and indentation. A helper change can affect multiple templates, so review the complete rendered manifest.")
    ],
    exercise: "Create fullname, name, and labels helpers. Reuse them in a Deployment and Service, render the chart, and verify the Service selector matches the Deployment Pod labels."
  },

  "Chart Dependencies": {
    title: "Chart Dependencies",
    description: "Manage dependent charts and package related services using Helm dependency metadata.",
    sections: [
      section("Parent and Subcharts", "A parent chart can include subcharts as dependencies. This allows a platform chart to package related components while keeping each component independently maintained and versioned."),
      section("Dependency Declaration", "Dependencies are declared in Chart.yaml with chart name, version range, repository, and optional alias or condition. Pin compatible versions and avoid uncontrolled version ranges in production.", "dependencies:\n  - name: redis\n    version: 19.6.4\n    repository: https://charts.bitnami.com/bitnami\n    condition: redis.enabled"),
      section("Dependency Download", "helm dependency update resolves dependency declarations and downloads matching packages. The resulting lock file records resolved dependency versions and should be reviewed and committed for reproducible builds.", "helm dependency update ./platform-chart\nhelm dependency list ./platform-chart\nhelm dependency build ./platform-chart"),
      section("Dependency Values", "Parent charts can configure subchart values under the dependency name or alias. Use clear nested values and document which parent values are forwarded to each dependency."),
      section("Conditions and Tags", "Conditions enable or disable optional dependencies using values. Tags can group related dependencies. Validate all combinations that are supported so disabled dependencies do not leave broken references."),
      section("Version Compatibility", "Check compatibility between parent and subchart versions, Kubernetes APIs, and application requirements. A dependency update can introduce configuration or resource changes even when the parent chart templates remain unchanged."),
      section("Supply Chain Controls", "Use trusted repositories, review chart provenance where available, scan packaged artifacts, and pin dependency versions. Avoid allowing production pipelines to fetch arbitrary latest dependencies during deployment.")
    ],
    exercise: "Add a Redis dependency to a sample parent chart. Update and build dependencies, configure the subchart through parent values, render the complete chart, and document the resolved dependency version."
  },

  "Helm Repositories": {
    title: "Helm Repositories",
    description: "Publish, discover, authenticate to, and consume Helm charts from trusted repositories and OCI registries.",
    sections: [
      section("Repository Concepts", "A traditional Helm repository exposes an index.yaml file and chart archives. OCI registries store charts as OCI artifacts alongside container images. Both approaches distribute versioned chart packages."),
      section("Adding and Searching Repositories", "Add only trusted repositories and use search to discover available chart packages. Verify chart ownership and version before installing third-party components.", "helm repo add bitnami https://charts.bitnami.com/bitnami\nhelm repo update\nhelm search repo bitnami/redis --versions"),
      section("Chart Retrieval", "helm pull downloads a chart archive for inspection or promotion. Use --untar when source inspection is needed. Verify chart metadata, templates, dependencies, and defaults before deploying.", "helm pull bitnami/redis --version 19.6.4\nhelm pull bitnami/redis --version 19.6.4 --untar"),
      section("OCI Registry Workflow", "OCI support allows charts to be pushed and pulled through compatible registries. Authenticate using an approved identity and follow the registry's retention and access-control policies.", "helm registry login registry.example.com\nhelm push payment-api-1.2.0.tgz oci://registry.example.com/helm\nhelm pull oci://registry.example.com/helm/payment-api --version 1.2.0"),
      section("Repository Authentication", "Private chart repositories may require credentials or registry login. Store credentials in approved secret stores and inject them securely into CI jobs. Never commit repository passwords or tokens to chart source."),
      section("Chart Promotion", "Promote the same tested chart artifact between development, staging, and production. Avoid repackaging or modifying chart content between environments; use values files and controlled release configuration instead."),
      section("Repository Failure Diagnosis", "Authentication errors, missing index metadata, TLS problems, rate limits, and incorrect chart versions can prevent retrieval. Check repository configuration, credentials, network access, and the exact chart reference.")
    ],
    exercise: "Add a trusted chart repository, search for a chart version, download and inspect it, then package a local chart and publish it to a test OCI registry."
  },

  "Release Installation": {
    title: "Release Installation",
    description: "Install Helm releases safely and validate the Kubernetes resources created by a chart.",
    sections: [
      section("Release Naming and Namespace", "A Helm release has a name and namespace. Use predictable names that identify the application and environment. Create namespaces deliberately and verify the active cluster before installation."),
      section("Installation Modes", "helm install installs a chart from a local directory, repository reference, or OCI source. Use --create-namespace when the target namespace should be created automatically.", "helm install payment-api ./payment-api --namespace production --create-namespace"),
      section("Supplying Configuration", "Use -f to provide environment values and --set for small command-line overrides. For repeatable deployments, keep configuration in reviewed values files rather than long command strings."),
      section("Dry Run and Render Review", "Use helm template for local rendering and helm install --dry-run --debug to inspect the installation process. Dry-run output may expose configured values, so handle logs carefully.", "helm lint ./payment-api\nhelm template payment-api ./payment-api -f values-production.yaml\nhelm install payment-api ./payment-api -n production --dry-run --debug"),
      section("Waiting for Readiness", "Use --wait and a suitable timeout when the deployment pipeline must wait for supported resources to become ready. Helm readiness does not replace application smoke tests or external dependency checks.", "helm install payment-api ./payment-api -n production --wait --timeout 5m"),
      section("Post-install Validation", "Check release status, Deployment readiness, Pod events, Service endpoints, and application health. Capture the release revision and chart version in deployment records.", "helm status payment-api -n production\nkubectl get deployments,pods,svc -n production\nkubectl get events -n production --sort-by=.metadata.creationTimestamp"),
      section("Installation Failure Handling", "If installation fails, inspect Helm output and Kubernetes events before deleting resources. Use a controlled cleanup process and preserve evidence when the failure may indicate a cluster or permission issue.")
    ],
    exercise: "Install a sample application chart into a dedicated namespace using a custom values file. Validate release status, rendered configuration, Pod readiness, Service endpoints, and application response."
  },

  "Upgrade and Rollback": {
    title: "Upgrade and Rollback",
    description: "Manage release revisions, apply chart changes, recover from failed upgrades, and validate rollback behavior.",
    sections: [
      section("Release Revision Model", "Each successful Helm upgrade creates a new release revision. Helm history records previous revisions and their status. Release history helps operators understand what changed and which revision may be a suitable recovery target."),
      section("Upgrade Workflow", "helm upgrade applies a new chart or configuration to an existing release. Use --install when a pipeline should install the release if it does not yet exist. Review the rendered manifests before upgrading production.", "helm upgrade payment-api ./payment-api -n production -f values-production.yaml"),
      section("Atomic and Wait Options", "The --wait option waits for supported resources to become ready. --atomic attempts to roll back changes if an upgrade fails and implies waiting. Understand the consequences before using automatic rollback for stateful or irreversible changes."),
      section("Change Inspection", "Compare chart versions, effective values, and rendered manifests before changing a release. Review image tags, service ports, storage, permissions, and resource changes for unintended impact.", "helm diff upgrade payment-api ./payment-api -n production -f values-production.yaml"),
      section("Rollback Procedure", "helm rollback restores a previous release revision. Confirm the target revision and validate application compatibility, especially when database migrations or external resources changed.", "helm history payment-api -n production\nhelm rollback payment-api 2 -n production --wait --timeout 5m\nhelm status payment-api -n production"),
      section("Failed Upgrade Investigation", "Inspect the failed revision, Kubernetes events, Pod logs, admission failures, image pull errors, and resource constraints. Determine whether the safest response is rollback, correction, or a new forward upgrade."),
      section("Irreversible Change Awareness", "Helm rollback cannot automatically reverse external database migrations, messages already processed, or data written in a new format. Design releases for backward compatibility and use separate migration controls.")
    ],
    exercise: "Install chart version one, upgrade to version two, inspect release history, then roll back to the earlier revision. Verify the running image and explain which external changes Helm cannot undo."
  },

  "Environment-specific Values": {
    title: "Environment-specific Values",
    description: "Manage configuration differences across development, staging, and production without duplicating chart templates.",
    sections: [
      section("Configuration Versus Templates", "Keep environment differences in values files whenever possible. Templates should describe reusable resource structure, while values files describe environment-specific replica counts, image references, resource settings, hostnames, and feature flags."),
      section("Values File Organization", "Maintain separate reviewed files such as values-dev.yaml, values-staging.yaml, and values-production.yaml. Keep shared defaults in values.yaml and avoid copying the entire default file into every environment."),
      section("Override Precedence", "Helm merges chart defaults with supplied values files and command-line overrides. When multiple -f files are supplied, later files override earlier ones. Confirm the final rendered output rather than assuming precedence.", "helm template payment-api ./payment-api -f values.yaml -f values-production.yaml\nhelm upgrade --install payment-api ./payment-api -n production -f values-production.yaml"),
      section("Production Resource Profiles", "Production commonly requires higher replica counts, stricter resource settings, disruption controls, and monitoring. Values should reflect measured workload demand and the availability requirements of the application."),
      section("Secret Configuration Strategy", "Do not store production credentials in ordinary values files committed to Git. Use external secret management, encrypted secret workflows, or an approved secret injection mechanism. Restrict access to rendered output and release records."),
      section("Promotion Consistency", "Promote the same chart package across environments and change only approved configuration. Record the chart version, image digest, values revision, and deployment result for every environment."),
      section("Environment Validation", "Render each environment configuration and inspect replica counts, namespaces, hostnames, storage, network exposure, and resource settings. Automated policy checks can prevent accidental production exposure or unsafe defaults.")
    ],
    exercise: "Create development, staging, and production values files for one chart. Render each configuration and compare replica count, image, resource requests, and Service exposure. Confirm that secrets are not stored in the files."
  },

  "Argo CD Fundamentals": {
    title: "Argo CD Fundamentals",
    description: "Understand GitOps delivery with Argo CD and how repository state becomes Kubernetes application state.",
    sections: [
      section("GitOps Delivery Model", "GitOps uses a version-controlled repository as the desired-state source. Argo CD continuously observes repository content and cluster state, then reports differences and can synchronize the cluster to the declared configuration."),
      section("Argo CD Responsibilities", "Argo CD manages application synchronization, health assessment, repository retrieval, and deployment visibility. It complements CI systems: CI builds and tests artifacts, while Argo CD deploys declared desired state."),
      section("Desired State and Live State", "Desired state is the configuration stored in the repository. Live state is what currently exists in Kubernetes. Differences can result from manual changes, controller defaults, failed sync operations, or repository changes."),
      section("Application Model", "An Argo CD Application identifies a source repository, target revision, path or chart, destination cluster, namespace, and synchronization policy. This resource defines what should be deployed and where."),
      section("Installation and CLI", "Install Argo CD using an approved method and configure the CLI or web interface. Secure the initial administrator credentials and configure identity integration before production use.", "kubectl get pods -n argocd\nkubectl get svc -n argocd\nargocd version\nargocd app list"),
      section("CI and CD Separation", "A CI pipeline should build, test, scan, and publish an immutable image. It can then update a Git configuration repository with the tested image digest. Argo CD detects the Git change and deploys it."),
      section("Operational Benefits", "Git history provides an auditable record of intended changes. Reconciliation improves consistency, but repository protection, approval workflows, access control, and reliable health checks remain essential.")
    ],
    exercise: "Describe a CI-to-GitOps pipeline for a containerized application. Build and publish an image, update a deployment manifest in Git, and explain how Argo CD detects and deploys the desired state."
  },

  "Argo CD Architecture": {
    title: "Argo CD Architecture",
    description: "Explore Argo CD API services, repository server, application controller, Redis, and Kubernetes cluster connections.",
    sections: [
      section("API Server", "The Argo CD API server exposes the web UI, CLI API, authentication, and application management operations. It coordinates user requests and access to Argo CD resources."),
      section("Repository Server", "The repository server retrieves source repositories and generates Kubernetes manifests using supported tools such as Kustomize, Helm, and plugins. Repository credentials and rendering dependencies must be managed securely."),
      section("Application Controller", "The application controller compares desired manifests with live cluster resources, calculates synchronization differences, and performs reconciliation when authorized by the configured policy."),
      section("Redis and Supporting Services", "Redis is used for caching and supporting application operations. Supporting components such as Dex may be used for identity integration. Component availability and resource sizing affect the reliability of the Argo CD control plane."),
      section("Application Processing Flow", "The repository server generates manifests from the selected Git revision. The application controller compares generated resources with live cluster state and determines sync and health status. The API server provides user and automation access."),
      section("Architecture Inspection", "Inspect Argo CD Pods, Services, deployments, and logs to understand the installed topology. Component names can vary with installation and high-availability configuration.", "kubectl get pods,svc,deployments -n argocd\nkubectl logs deployment/argocd-repo-server -n argocd\nkubectl logs deployment/argocd-server -n argocd\nkubectl logs statefulset/argocd-application-controller -n argocd"),
      section("High Availability and Scaling", "Production installations should consider controller replicas, repository server capacity, API server availability, Redis topology, network connectivity, and disaster recovery. Size components based on application count and manifest generation workload.")
    ],
    exercise: "Inspect an Argo CD installation and identify its API server, repository server, application controller, and supporting components. Trace one Application from repository rendering through synchronization."
  },

  "Application Resources": {
    title: "Application Resources",
    description: "Define Argo CD Application resources that connect source repositories to Kubernetes destinations.",
    sections: [
      section("Application Resource Purpose", "An Application is a Kubernetes custom resource that describes the source of desired manifests and the destination where those manifests should be applied. It is the central unit of Argo CD deployment management."),
      section("Source Configuration", "The source identifies a repository URL, target revision, and path. For Helm sources, it can identify a chart and values. For Kustomize, it points to a directory containing the relevant kustomization file."),
      section("Destination Configuration", "The destination specifies a registered cluster and namespace. Validate that the destination cluster is registered and that Argo CD has the necessary permissions to manage the requested resources."),
      section("Application Manifest", "This example uses a Git repository path containing Kubernetes manifests. Replace the repository and cluster destination with values approved for the environment.", "apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: payment-api\n  namespace: argocd\nspec:\n  project: default\n  source:\n    repoURL: https://github.com/example/platform-config.git\n    targetRevision: main\n    path: apps/payment-api/overlays/production\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: production\n  syncPolicy:\n    automated:\n      prune: false\n      selfHeal: true"),
      section("AppProjects and Boundaries", "AppProjects restrict which repositories, clusters, namespaces, and resource kinds an Application may use. Use separate projects to enforce team and environment boundaries rather than placing every application in the default project."),
      section("Application Inspection", "Use the UI, CLI, or kubectl to inspect Application source, destination, sync status, health, and conditions. Check generated manifests when the desired resources differ from expectations.", "kubectl get applications -n argocd\nkubectl describe application payment-api -n argocd\nargocd app get payment-api"),
      section("Application Ownership", "Define who owns the source repository, deployment configuration, destination namespace, and incident response. Keep application definitions in a controlled repository so they can be reviewed and recreated.")
    ],
    exercise: "Create an Argo CD Application pointing to a test repository and namespace. Verify its source, destination, generated resources, health, and sync status."
  },

  "GitOps Workflow": {
    title: "GitOps Workflow",
    description: "Build a traceable delivery process in which CI produces artifacts and Git changes drive deployment through Argo CD.",
    sections: [
      section("Source of Truth", "The Git repository stores the declared deployment configuration. Branch protection, pull-request review, and controlled promotion establish how changes become approved desired state."),
      section("Build and Publish Stage", "CI checks out application source, runs tests, builds a container image, scans it, and pushes it to a trusted registry. The image should be referenced by an immutable tag or digest."),
      section("Configuration Update", "After a successful build, automation updates the environment configuration repository with the tested artifact reference. Keep application source and deployment configuration changes traceable to the same release identifier."),
      section("Argo CD Reconciliation", "Argo CD detects the selected Git revision, renders the manifests, compares them with live resources, and synchronizes according to policy. A deployment is not complete until health and application checks pass."),
      section("Promotion Between Environments", "Promote a tested image digest from development to staging and then production. Use environment-specific pull requests and approvals rather than rebuilding a different image for each environment."),
      section("GitOps Pipeline Example", "A pipeline can update a manifest using a commit tied to the CI build. Protect credentials and ensure automation cannot bypass repository approval rules.", "yq -i '.images[0].newTag = \"3.4.1\"' kustomization.yaml\ngit diff -- kustomization.yaml\ngit add kustomization.yaml\ngit commit -m \"chore: promote payment-api 3.4.1\"\ngit push"),
      section("Audit and Recovery", "Git history records who changed desired state and when. Reverting a reviewed configuration commit can restore a previous declaration, but validate data migrations and external side effects before relying on Git revert as a full rollback."),
      section("CI/CD Responsibility Boundaries", "CI should not need unrestricted production cluster credentials when Argo CD owns deployment. Keep build permissions, repository write permissions, and cluster deployment permissions separated.")
    ],
    exercise: "Build a sample GitOps workflow: publish a test image, update a configuration repository through a commit, observe Argo CD detect the change, and verify the deployed image matches the approved commit."
  },

  "Automated Sync and Self-healing": {
    title: "Automated Sync and Self-healing",
    description: "Configure automatic synchronization, pruning, and self-healing with appropriate production safeguards.",
    sections: [
      section("Automated Synchronization", "Automated sync allows Argo CD to apply repository changes without an operator manually triggering each deployment. It is useful for controlled environments where Git approvals represent deployment authorization."),
      section("Self-healing Behavior", "Self-heal allows Argo CD to correct live changes that differ from the desired repository state. This supports declarative consistency but can overwrite emergency manual changes unless the incident process includes a corresponding Git update."),
      section("Pruning Removed Resources", "Pruning deletes resources that were previously managed by an Application but are no longer present in the desired source. This can be dangerous for stateful or shared resources, so review ownership and deletion behavior carefully."),
      section("Sync Policy Configuration", "Automated sync, prune, and self-heal are separate controls. Enable them deliberately based on resource ownership, environment criticality, and approval requirements.", "spec:\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\n    syncOptions:\n    - CreateNamespace=true"),
      section("Retry and Sync Windows", "Sync retry behavior can help with transient failures. Sync windows can restrict when synchronization is allowed. These controls should align with maintenance periods and production change policies."),
      section("Emergency Change Handling", "If an operator must make an emergency live change, document the reason and update the Git desired state promptly. Otherwise self-heal may revert the manual modification and create confusion during an incident."),
      section("Safe Enablement Strategy", "Start with a non-production Application, validate normal updates and deletions, then enable production automation only after repository protection and resource ownership are established.")
    ],
    exercise: "Enable automated sync and self-heal on a test Application. Change a managed field manually and observe reconciliation. Remove a test resource from Git and verify pruning behavior only in the isolated namespace."
  },

  "Health and Sync Status": {
    title: "Health and Sync Status",
    description: "Interpret Argo CD synchronization and resource health, then diagnose degraded or out-of-sync applications.",
    sections: [
      section("Sync Status Meaning", "Synced means the live resources match the desired manifests according to Argo CD comparison. OutOfSync means differences exist. Unknown indicates that Argo CD cannot determine comparison status reliably."),
      section("Health Status Meaning", "Health describes the operational condition of resources. Healthy indicates expected resource readiness, while Progressing, Degraded, Suspended, Missing, or Unknown provide additional lifecycle information depending on the resource."),
      section("Sync and Health Are Different", "An Application can be Synced but Degraded if the desired manifests were applied but the workload is unhealthy. It can be OutOfSync while the existing workload remains Healthy. Investigate both dimensions."),
      section("Resource-level Inspection", "Inspect the individual resource tree and conditions to identify which Deployment, Pod, Service, or custom resource is unhealthy. Use kubectl to validate the live Kubernetes state independently.", "argocd app get payment-api\nargocd app resources payment-api\nkubectl get pods,deployments,svc -n production\nkubectl get events -n production --sort-by=.metadata.creationTimestamp"),
      section("Common Health Failures", "A Deployment may remain Progressing because Pods are not ready. A resource can be Degraded because a probe fails, image pull fails, or required dependency is missing. Check events and logs rather than repeatedly synchronizing."),
      section("Custom Health Assessment", "Some custom resources need custom health logic because their status fields do not map cleanly to built-in health checks. Validate custom health scripts against real resource states and supported Argo CD versions."),
      section("Operational Alerts", "Alert on persistent OutOfSync, Degraded, Unknown, and failed synchronization conditions. Include application name, destination, revision, and failing resource in the alert so responders can act quickly.")
    ],
    exercise: "Deploy an application with a deliberately failing readiness probe. Observe the distinction between sync status and health status in Argo CD, then fix the probe and verify recovery."
  },

  "Drift Detection": {
    title: "Drift Detection",
    description: "Identify differences between Git desired state and live Kubernetes resources and resolve them safely.",
    sections: [
      section("What Configuration Drift Means", "Drift occurs when live Kubernetes resources differ from the declared desired state. It can result from manual kubectl changes, another deployment tool, admission mutation, controller defaults, or an unreviewed configuration update."),
      section("Argo CD Comparison", "Argo CD renders repository configuration and compares it with live cluster objects. The difference view identifies fields that changed, disappeared, or were added. Inspect the resource and field before deciding whether the difference is harmful."),
      section("Manual Change Detection", "A direct kubectl edit can create drift when the edited field is managed by Git. Record the live change and determine whether it was an emergency fix or an accidental modification.", "kubectl get deployment payment-api -n production -o yaml\nargocd app diff payment-api\nargocd app get payment-api"),
      section("Diff Customization", "Some Kubernetes fields are defaulted or mutated by API admission and controllers. Argo CD supports diff customization for known cases, but broad ignore rules can hide real configuration problems. Scope exceptions narrowly."),
      section("Drift Remediation", "If Git remains authoritative, update the repository through a reviewed commit or synchronize the approved desired state. Do not blindly sync during an incident without understanding the live change and its operational purpose."),
      section("Drift Prevention", "Reduce drift by limiting manual write access, routing changes through Git, protecting branches, and separating ownership between controllers. Document emergency procedures and ensure changes are reconciled back into source control."),
      section("Audit and Compliance", "Use Git history, Argo CD comparison output, Kubernetes audit logs, and deployment records to identify when drift appeared and which identity performed the change.")
    ],
    exercise: "Deploy an Application, manually change a managed Deployment replica count, and inspect the Argo CD diff. Restore consistency through a reviewed Git change and document the drift cause."
  },

  "RBAC and Repository Credentials": {
    title: "RBAC and Repository Credentials",
    description: "Secure Argo CD users, projects, cluster access, and private repository authentication.",
    sections: [
      section("Argo CD RBAC Model", "Argo CD RBAC controls which users and groups can view, create, update, sync, or delete applications and projects. Configure permissions according to team responsibilities and environment sensitivity."),
      section("Roles and Policies", "Policies define subjects, resources, actions, and scopes. Use read-only roles for observers, application-scoped permissions for deployment teams, and tightly controlled administrative permissions for platform operators."),
      section("AppProject Restrictions", "AppProjects restrict allowed source repositories, destination clusters and namespaces, and resource kinds. They provide an important boundary between teams and prevent applications from deploying to unauthorized locations."),
      section("Repository Credential Management", "Private repository access requires credentials such as deploy keys, tokens, or workload identity integration. Use the least-privilege credential type and store it through supported Argo CD secret mechanisms."),
      section("Repository Secret Example", "Repository credentials are sensitive. This example shows the general Kubernetes Secret structure with placeholders only. Use approved secret injection and never commit actual credentials.", "apiVersion: v1\nkind: Secret\nmetadata:\n  name: private-repo\n  namespace: argocd\n  labels:\n    argocd.argoproj.io/secret-type: repository\nstringData:\n  type: git\n  url: https://github.com/example/platform-config.git\n  username: REPLACE_WITH_USER\n  password: REPLACE_WITH_TOKEN"),
      section("Cluster Credentials and Access", "Argo CD needs access to destination clusters. Review registered cluster identities and permissions. Avoid using broad administrator credentials when namespace-scoped deployment permissions are sufficient."),
      section("Credential Rotation and Auditing", "Rotate repository and cluster credentials, remove unused access, audit RBAC policy changes, and verify that revoked credentials no longer work. Monitor failed repository authentication and unexpected application modifications.")
    ],
    exercise: "Create a restricted AppProject and a read-only Argo CD role for a test team. Connect a test repository using a placeholder or test credential and verify that unauthorized operations are denied."
  },

  "Troubleshooting": {
    title: "Troubleshooting",
    description: "Diagnose Helm release failures and Argo CD GitOps synchronization problems using logs, rendered manifests, events, and permissions.",
    sections: [
      section("Establish the Failure Layer", "Identify whether the failure occurs during repository access, chart rendering, manifest validation, Kubernetes admission, resource creation, scheduling, or application runtime. This prevents changing unrelated configuration."),
      section("Helm Template Errors", "Template errors commonly result from missing values, incorrect types, invalid helper references, or malformed YAML indentation. Run helm lint and helm template with the same values files used by the deployment.", "helm lint ./payment-api\nhelm template payment-api ./payment-api -f values-production.yaml --debug"),
      section("Helm Release Failures", "A failed or pending release may result from Kubernetes timeouts, resource conflicts, insufficient permissions, image pull failures, or unready workloads. Inspect release status and the underlying Kubernetes resources.", "helm status payment-api -n production\nhelm history payment-api -n production\nkubectl get events -n production --sort-by=.metadata.creationTimestamp"),
      section("Argo CD Repository Errors", "Repository failures can result from invalid URLs, expired credentials, missing branches, unreachable Git hosts, TLS errors, or manifest generation failures. Inspect repo-server logs and repository connection status.", "kubectl logs deployment/argocd-repo-server -n argocd\nargocd repo list\nargocd app get payment-api"),
      section("OutOfSync and Sync Failures", "Compare desired and live manifests. Check admission webhooks, RBAC, immutable fields, missing CRDs, namespace permissions, and resource ownership. Correct the source configuration rather than repeatedly retrying an invalid sync."),
      section("Health Degradation", "If resources synchronize but remain degraded, inspect workload events, Pod logs, readiness probes, Service endpoints, and dependency health. Argo CD reports resource state; it does not replace application-level diagnosis."),
      section("Recovery and Prevention", "Preserve the failed revision and logs, identify the root cause, apply the smallest safe fix, and verify synchronization and application health. Add regression checks to chart linting, manifest validation, and GitOps pipeline stages.")
    ],
    exercise: "Troubleshoot three test incidents: a Helm missing-value template error, an invalid Argo CD repository credential, and a Deployment that syncs but remains degraded. Record symptoms, root causes, fixes, and verification."
  },

  "Production Hands-on Lab": {
    title: "Production Hands-on Lab",
    description: "Build a complete Helm and Argo CD GitOps deployment with versioned charts, environment configuration, access controls, and recovery procedures.",
    sections: [
      section("Lab Architecture", "Create a test Kubernetes or EKS environment, a source-code repository, a configuration repository, a container registry, a Helm chart, and an Argo CD installation. Keep production credentials and resources out of the lab."),
      section("Create a Reusable Helm Chart", "Build a chart with metadata, documented values, Deployment, Service, probes, resources, and optional Ingress. Add reusable helpers for names and labels and validate all templates with helm lint."),
      section("Environment Configuration", "Create development, staging, and production values files. Configure replicas, image references, resource requests, hostnames, and feature flags. Keep secrets outside ordinary chart values committed to Git."),
      section("Chart Versioning and Artifact Storage", "Set chart and application versions independently. Package the chart and publish it to a trusted chart repository or OCI registry. Record the chart digest or immutable artifact reference where supported."),
      section("CI Validation Pipeline", "Run chart linting, template rendering, schema validation, manifest policy checks, and image security scanning in CI. Publish only approved chart and image artifacts."),
      section("Argo CD Application Setup", "Create an Argo CD Application pointing to the configuration repository and target environment. Restrict the Application through an AppProject and validate its source and destination."),
      section("GitOps Release Promotion", "After CI publishes an image, update the desired image reference through a reviewed Git change. Promote the same immutable image through staging and production configuration rather than rebuilding it."),
      section("Synchronization and Health", "Configure sync behavior appropriate for the environment. Validate resource health, rollout status, endpoints, and application smoke tests. Use automated sync and self-heal only after repository protections are in place."),
      section("Drift and Rollback Exercise", "Change a managed field manually in the test cluster and inspect the resulting diff. Restore desired state through Git. Then deploy a previous approved chart or image revision and validate application recovery."),
      section("Security and Operational Review", "Review Argo CD RBAC, AppProjects, repository credentials, Kubernetes access, secret handling, branch protection, artifact provenance, and auditability. Remove temporary credentials and lab resources after testing."),
      section("Production Readiness Evidence", "Submit chart source, values files, pipeline results, Application manifest, sync and health screenshots or logs, release history, drift investigation, rollback evidence, and an operational runbook. Document known limitations and ownership.")
    ],
    exercise: "Complete the end-to-end lab: create and package a Helm chart, validate it in CI, publish the chart and image, configure an Argo CD Application, deploy through a reviewed Git change, verify health, test drift detection, and perform a controlled rollback. Produce a production-readiness report."
  }
};
