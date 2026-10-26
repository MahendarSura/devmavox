export interface HelmQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const helmQuestions: HelmQuestion[] = [
  {
    question: "1. What is Helm in Kubernetes?",
    options: [
      "A container runtime",
      "A package manager for Kubernetes",
      "A Kubernetes networking plugin",
      "A monitoring tool"
    ],
    answer: 1
  },
  {
    question: "2. What is the primary purpose of Helm?",
    options: [
      "To manage Linux users",
      "To build Docker images only",
      "To package, configure, and deploy Kubernetes applications",
      "To replace Kubernetes"
    ],
    answer: 2
  },
  {
    question: "3. What is a Helm Chart?",
    options: [
      "A package containing Kubernetes resource templates and configuration",
      "A Docker image",
      "A Kubernetes node",
      "A monitoring dashboard"
    ],
    answer: 0
  },
  {
    question: "4. Which file defines the metadata of a Helm chart?",
    options: [
      "values.yaml",
      "deployment.yaml",
      "config.json",
      "Chart.yaml"
    ],
    answer: 3
  },
  {
    question: "5. What is the purpose of values.yaml?",
    options: [
      "To store Kubernetes cluster logs",
      "To provide default configuration values for chart templates",
      "To define Docker image layers",
      "To store Helm release history only"
    ],
    answer: 1
  },
  {
    question: "6. Which command installs a Helm chart?",
    options: [
      "helm install",
      "helm create",
      "helm package",
      "helm lint"
    ],
    answer: 0
  },
  {
    question: "7. Which command upgrades an existing Helm release?",
    options: [
      "helm update-chart",
      "helm refresh",
      "helm upgrade",
      "helm replace"
    ],
    answer: 2
  },
  {
    question: "8. What is a Helm release?",
    options: [
      "A Kubernetes namespace",
      "A Docker registry",
      "A chart repository",
      "An installed instance of a Helm chart"
    ],
    answer: 3
  },
  {
    question: "9. Which command lists Helm releases?",
    options: [
      "helm list",
      "helm releases",
      "helm show",
      "helm status-all"
    ],
    answer: 0
  },
  {
    question: "10. Which command uninstalls a Helm release?",
    options: [
      "helm delete-chart",
      "helm uninstall",
      "helm remove-chart",
      "helm destroy-cluster"
    ],
    answer: 1
  },
  {
    question: "11. Which command creates a new chart directory with starter files?",
    options: [
      "helm init",
      "helm build",
      "helm create",
      "helm generate"
    ],
    answer: 2
  },
  {
    question: "12. Which directory contains a chart's Kubernetes resource templates?",
    options: [
      "config/",
      "manifests/",
      "resources/",
      "templates/"
    ],
    answer: 3
  },
  {
    question: "13. What is the purpose of the charts/ directory?",
    options: [
      "To store chart dependencies",
      "To store Kubernetes node logs",
      "To store Docker images",
      "To store cluster certificates only"
    ],
    answer: 0
  },
  {
    question: "14. Which command validates a chart for common issues?",
    options: [
      "helm verify-template",
      "helm lint",
      "helm check-cluster",
      "helm validate-release"
    ],
    answer: 1
  },
  {
    question: "15. Which command renders chart templates locally without installing them?",
    options: [
      "helm deploy",
      "helm start",
      "helm template",
      "helm launch"
    ],
    answer: 2
  },
  {
    question: "16. What does `helm show values` display?",
    options: [
      "The running Pod logs",
      "The Kubernetes cluster events",
      "The Helm release history",
      "The chart's default values"
    ],
    answer: 3
  },
  {
    question: "17. Which command displays chart metadata and information?",
    options: [
      "helm show chart",
      "helm describe cluster",
      "helm metadata",
      "helm chart-info"
    ],
    answer: 0
  },
  {
    question: "18. Which command adds a chart repository?",
    options: [
      "helm repository add",
      "helm repo add",
      "helm add repository",
      "helm registry create"
    ],
    answer: 1
  },
  {
    question: "19. Which command downloads the latest repository index information?",
    options: [
      "helm repo reload",
      "helm repo download",
      "helm repo update",
      "helm update-index"
    ],
    answer: 2
  },
  {
    question: "20. Which command searches charts in configured repositories?",
    options: [
      "helm find",
      "helm query",
      "helm repo list",
      "helm search repo"
    ],
    answer: 3
  },
  {
    question: "21. Which command overrides a chart value during installation?",
    options: [
      "helm install myapp ./mychart --set replicaCount=3",
      "helm install myapp ./mychart --replicas 3",
      "helm install myapp ./mychart --value-set replicaCount 3",
      "helm install myapp ./mychart --config replicaCount=3"
    ],
    answer: 0
  },
  {
    question: "22. How can you supply custom values from a file?",
    options: [
      "Use `--config-file`",
      "Use `-f custom-values.yaml`",
      "Use `--yaml-input`",
      "Use `--chart-values`"
    ],
    answer: 1
  },
  {
    question: "23. If a value is provided using `--set`, what generally happens?",
    options: [
      "The chart is automatically deleted",
      "The value is ignored",
      "It overrides the corresponding value from the values files",
      "It changes the Kubernetes API version"
    ],
    answer: 2
  },
  {
    question: "24. Which template expression accesses a value named replicaCount?",
    options: [
      "{{ Values.replicaCount }}",
      "${values.replicaCount}",
      "{{ .replicaCount }}",
      "{{ .Values.replicaCount }}"
    ],
    answer: 3
  },
  {
    question: "25. What does the leading dot in `.Values` represent in a standard Helm template context?",
    options: [
      "The current template context",
      "The chart repository URL",
      "The Kubernetes API server",
      "The Helm installation directory"
    ],
    answer: 0
  },
  {
    question: "26. Which templating language does Helm primarily use?",
    options: [
      "Jinja2",
      "Go templates",
      "JavaScript JSX",
      "Python templates"
    ],
    answer: 1
  },
  {
    question: "27. Which function is commonly used to provide a default value in a Helm template?",
    options: [
      "fallbackTo",
      "otherwise",
      "default",
      "defaultValueOnly"
    ],
    answer: 2
  },
  {
    question: "28. What is the purpose of the `quote` function in a Helm template?",
    options: [
      "To encode a Docker image",
      "To delete empty values",
      "To create a Kubernetes namespace",
      "To return a quoted string representation"
    ],
    answer: 3
  },
  {
    question: "29. Which template action is commonly used for conditional rendering?",
    options: [
      "{{ if .Values.enabled }}",
      "{{ when .Values.enabled }}",
      "{{ condition .Values.enabled }}",
      "{{ case .Values.enabled }}"
    ],
    answer: 0
  },
  {
    question: "30. Which template action is used to iterate over a collection?",
    options: [
      "{{ iterate .Values.items }}",
      "{{ range .Values.items }}",
      "{{ loop .Values.items }}",
      "{{ each .Values.items }}"
    ],
    answer: 1
  },
  {
    question: "31. What is the purpose of `_helpers.tpl`?",
    options: [
      "To store application database data",
      "To define Kubernetes nodes",
      "To define reusable named template helpers",
      "To replace Chart.yaml"
    ],
    answer: 2
  },
  {
    question: "32. Which template action defines a named template?",
    options: [
      "{{ create \"myapp.name\" }}",
      "{{ function \"myapp.name\" }}",
      "{{ helper \"myapp.name\" }}",
      "{{ define \"myapp.name\" }}"
    ],
    answer: 3
  },
  {
    question: "33. Which function invokes a named template and allows specifying its context?",
    options: [
      "include",
      "execute",
      "render",
      "call-template"
    ],
    answer: 0
  },
  {
    question: "34. Why is `include` often preferred over `template` when formatting YAML?",
    options: [
      "It disables all template evaluation",
      "It returns rendered text that can be piped through functions such as `nindent`",
      "It automatically creates namespaces",
      "It installs chart dependencies"
    ],
    answer: 1
  },
  {
    question: "35. What does `nindent 4` do?",
    options: [
      "Removes four YAML keys",
      "Adds four blank lines",
      "Adds a newline and indents text by four spaces",
      "Converts text into JSON"
    ],
    answer: 2
  },
  {
    question: "36. What is the purpose of the `required` template function?",
    options: [
      "To restart Kubernetes nodes",
      "To install missing charts automatically",
      "To force all values to be integers",
      "To fail rendering when a required value is empty or missing"
    ],
    answer: 3
  },
  {
    question: "37. Which command previews an upgrade's rendered manifests without applying them?",
    options: [
      "helm upgrade myapp ./mychart --dry-run",
      "helm upgrade myapp ./mychart --force-preview",
      "helm preview myapp ./mychart",
      "helm simulate myapp ./mychart"
    ],
    answer: 0
  },
  {
    question: "38. Which command displays the status of a release?",
    options: [
      "helm inspect-release",
      "helm status myapp",
      "helm release-status-all",
      "helm health myapp"
    ],
    answer: 1
  },
  {
    question: "39. Which command shows the revision history of a release?",
    options: [
      "helm revisions",
      "helm logs",
      "helm history myapp",
      "helm list-history"
    ],
    answer: 2
  },
  {
    question: "40. Which command rolls back a release to a previous revision?",
    options: [
      "helm revert myapp",
      "helm restore myapp",
      "helm undo myapp",
      "helm rollback myapp 1"
    ],
    answer: 3
  },
  {
    question: "41. What does `helm upgrade --install` do?",
    options: [
      "Installs a release if absent, otherwise upgrades it",
      "Always uninstalls the existing release first",
      "Only validates the chart",
      "Upgrades Helm itself"
    ],
    answer: 0
  },
  {
    question: "42. What does the `--wait` option generally do during an install or upgrade?",
    options: [
      "Waits indefinitely for every application request",
      "Waits for supported Kubernetes resources to reach ready conditions, up to the timeout",
      "Waits for a chart repository to become public",
      "Pauses all Kubernetes scheduling"
    ],
    answer: 1
  },
  {
    question: "43. What is the purpose of the `--timeout` option?",
    options: [
      "To set the Pod CPU limit",
      "To set the chart version",
      "To set the time limit for Helm operations that wait on Kubernetes resources",
      "To set the container's restart policy"
    ],
    answer: 2
  },
  {
    question: "44. What does `--atomic` generally do during install or upgrade?",
    options: [
      "Makes every Kubernetes resource permanently immutable",
      "Encrypts the chart",
      "Prevents all future upgrades",
      "Automatically rolls back a failed upgrade or uninstalls a failed install"
    ],
    answer: 3
  },
  {
    question: "45. What does `--namespace` specify?",
    options: [
      "The Kubernetes namespace for the release operation",
      "The chart repository name",
      "The Docker registry namespace only",
      "The Helm template directory"
    ],
    answer: 0
  },
  {
    question: "46. Which option creates the target namespace if it does not exist?",
    options: [
      "--namespace-create",
      "--create-namespace",
      "--make-namespace",
      "--ensure-namespace"
    ],
    answer: 1
  },
  {
    question: "47. What is the purpose of `--version` when installing a chart from a repository?",
    options: [
      "To choose the Kubernetes cluster version automatically",
      "To update Helm to that version",
      "To select a specific chart version",
      "To select a container runtime version"
    ],
    answer: 2
  },
  {
    question: "48. What is the purpose of `appVersion` in Chart.yaml?",
    options: [
      "It always determines the Helm CLI version",
      "It specifies the Kubernetes namespace",
      "It replaces the chart's version field",
      "It records the application version packaged by the chart"
    ],
    answer: 3
  },
  {
    question: "49. What does the `version` field in Chart.yaml identify?",
    options: [
      "The chart package version",
      "The Kubernetes node version",
      "The Docker Engine version",
      "The application's HTTP port"
    ],
    answer: 0
  },
  {
    question: "50. Which command packages a chart into a versioned archive?",
    options: [
      "helm compress",
      "helm package",
      "helm archive-create",
      "helm bundle"
    ],
    answer: 1
  },
  {
    question: "51. What is a common extension for a packaged Helm chart?",
    options: [
      ".zip",
      ".docker",
      ".tgz",
      ".yaml.gz"
    ],
    answer: 2
  },
  {
    question: "52. Which command inspects a packaged chart before installation?",
    options: [
      "helm package-check",
      "helm unpack-info",
      "helm validate-package",
      "helm show chart ./mychart-1.0.0.tgz"
    ],
    answer: 3
  },
  {
    question: "53. What does `helm dependency update` do?",
    options: [
      "Resolves and downloads chart dependencies declared in Chart.yaml",
      "Upgrades all Kubernetes Deployments",
      "Updates the Kubernetes API server",
      "Changes all image tags to latest"
    ],
    answer: 0
  },
  {
    question: "54. Where are chart dependencies commonly declared?",
    options: [
      "In a Pod's status field",
      "In the `dependencies` section of Chart.yaml",
      "In Dockerfile instructions",
      "In the Kubernetes kubeconfig file"
    ],
    answer: 1
  },
  {
    question: "55. What is the purpose of a dependency alias in Helm?",
    options: [
      "To change the Kubernetes API server URL",
      "To encrypt dependency archives",
      "To refer to a dependency under an alternate name in the parent chart",
      "To disable every dependency"
    ],
    answer: 2
  },
  {
    question: "56. What is a subchart?",
    options: [
      "A Kubernetes worker node",
      "A Helm release rollback",
      "A values.yaml backup",
      "A chart included as a dependency of another chart"
    ],
    answer: 3
  },
  {
    question: "57. How can a parent chart commonly configure a subchart's values?",
    options: [
      "Under a key matching the subchart's name or alias",
      "Only by editing the Kubernetes API server",
      "Only with environment variables on the Helm client",
      "By modifying the subchart's Dockerfile"
    ],
    answer: 0
  },
  {
    question: "58. What does a `condition` on a chart dependency commonly control?",
    options: [
      "The cluster's network plugin",
      "Whether the dependency is enabled based on a values setting",
      "The Docker image build context",
      "The Helm CLI installation directory"
    ],
    answer: 1
  },
  {
    question: "59. What is a Helm hook?",
    options: [
      "A Kubernetes network policy",
      "A Docker image tag",
      "A Kubernetes resource associated with a lifecycle event in a Helm operation",
      "A permanent replacement for a Deployment"
    ],
    answer: 2
  },
  {
    question: "60. Which annotation defines a Helm hook event?",
    options: [
      "helm.io/event",
      "kubernetes.io/helm-hook",
      "helm.sh/lifecycle",
      "helm.sh/hook"
    ],
    answer: 3
  },
  {
    question: "61. Which hook can run before Helm installs regular chart resources?",
    options: [
      "pre-install",
      "after-create",
      "before-deploy",
      "pre-chart"
    ],
    answer: 0
  },
  {
    question: "62. Which hook can run after Helm upgrades a release's resources?",
    options: [
      "upgrade-finished",
      "post-upgrade",
      "after-update",
      "release-complete"
    ],
    answer: 1
  },
  {
    question: "63. What is a common use case for a Helm hook Job?",
    options: [
      "Replacing the Kubernetes scheduler",
      "Building the Helm CLI",
      "Running a database migration during a release lifecycle event",
      "Automatically changing the cluster's network CIDR"
    ],
    answer: 2
  },
  {
    question: "64. What can happen if a hook-created Job fails?",
    options: [
      "Helm always ignores it",
      "The entire cluster is automatically deleted",
      "The chart repository is permanently removed",
      "The Helm operation may fail, depending on the hook and operation"
    ],
    answer: 3
  },
  {
    question: "65. Which command can display the computed values of an existing release?",
    options: [
      "helm get values myapp",
      "helm values list myapp",
      "helm inspect values myapp",
      "helm show values myapp"
    ],
    answer: 0
  },
  {
    question: "66. Which command retrieves the manifest stored for a release?",
    options: [
      "helm get resources",
      "helm get manifest myapp",
      "helm manifest list myapp",
      "helm show manifest myapp"
    ],
    answer: 1
  },
  {
    question: "67. Which command retrieves notes associated with a release?",
    options: [
      "helm show notes",
      "helm release notes",
      "helm get notes myapp",
      "helm notes myapp"
    ],
    answer: 2
  },
  {
    question: "68. Which command retrieves the hooks associated with a release?",
    options: [
      "helm show hooks",
      "helm hook-list myapp",
      "helm describe hooks",
      "helm get hooks myapp"
    ],
    answer: 3
  },
  {
    question: "69. How can you see the computed values including chart defaults and user overrides?",
    options: [
      "helm get values myapp --all",
      "helm show values --all-releases",
      "helm list --values",
      "helm template --release-values"
    ],
    answer: 0
  },
  {
    question: "70. What does `helm upgrade --reuse-values` do?",
    options: [
      "Discards every existing release value",
      "Reuses values from the previous release while applying new overrides",
      "Reuses the previous Kubernetes cluster",
      "Copies values into every namespace"
    ],
    answer: 1
  },
  {
    question: "71. Why should you avoid putting plaintext passwords in a committed values.yaml?",
    options: [
      "Helm cannot parse passwords",
      "Passwords always break YAML indentation",
      "Secrets may be exposed through source control or rendered manifests",
      "Kubernetes does not support passwords"
    ],
    answer: 2
  },
  {
    question: "72. What is a safer approach for handling sensitive Helm values?",
    options: [
      "Commit them in a public repository",
      "Place them in chart names",
      "Print them in CI logs for debugging",
      "Use an approved secrets manager or protected secret-injection workflow"
    ],
    answer: 3
  },
  {
    question: "73. Does a Kubernetes Secret automatically guarantee that secret data is encrypted everywhere?",
    options: [
      "No; encryption at rest and access controls depend on cluster configuration",
      "Yes, all secret data is always encrypted at rest by default in every environment",
      "Yes, because Helm encrypts every values file automatically",
      "No, because Kubernetes does not support Secrets"
    ],
    answer: 0
  },
  {
    question: "74. What is the purpose of a Helm chart provenance file?",
    options: [
      "To store Pod logs",
      "To provide chart package verification and provenance information",
      "To configure an Ingress controller",
      "To define container resource requests"
    ],
    answer: 1
  },
  {
    question: "75. Which command verifies a chart package using provenance information when available?",
    options: [
      "helm lint --verify-signature",
      "helm package --check",
      "helm verify ./mychart-1.0.0.tgz",
      "helm check-signature ./mychart"
    ],
    answer: 2
  },
  {
    question: "76. What does `helm registry login` help you do?",
    options: [
      "Log in to a Kubernetes worker node",
      "Create a Helm template",
      "Authenticate to the Kubernetes Dashboard",
      "Authenticate to an OCI-compatible registry"
    ],
    answer: 3
  },
  {
    question: "77. What is OCI support in Helm used for?",
    options: [
      "Storing and distributing charts through OCI-compatible registries",
      "Replacing Kubernetes Services",
      "Managing Linux kernel modules",
      "Creating Prometheus alerts"
    ],
    answer: 0
  },
  {
    question: "78. Which command can push a packaged chart to an OCI registry?",
    options: [
      "helm registry upload",
      "helm push ./mychart-1.0.0.tgz oci://registry.example.com/charts",
      "helm publish-chart",
      "helm repo push"
    ],
    answer: 1
  },
  {
    question: "79. What does `helm pull` do?",
    options: [
      "Pulls container logs from a Pod",
      "Downloads a Kubernetes node image",
      "Downloads a chart from a chart repository or OCI registry",
      "Rolls back a release"
    ],
    answer: 2
  },
  {
    question: "80. Which option lets `helm pull` extract a downloaded chart archive?",
    options: [
      "--unzip",
      "--extract-files",
      "--expand",
      "--untar"
    ],
    answer: 3
  },
  {
    question: "81. A Helm template fails with a nil pointer error. What should you check first?",
    options: [
      "Whether the referenced value exists and has the expected structure",
      "Whether the cluster has more worker nodes",
      "Whether Docker is installed on every node",
      "Whether Grafana is running"
    ],
    answer: 0
  },
  {
    question: "82. A chart renders invalid YAML. Which command is a useful first debugging step?",
    options: [
      "helm uninstall myapp",
      "helm template myapp ./mychart --debug",
      "helm repo remove",
      "helm rollback myapp 1"
    ],
    answer: 1
  },
  {
    question: "83. Helm reports that a release name is already in use. What should you check?",
    options: [
      "Only the Docker image size",
      "Only the worker-node CPU",
      "Existing releases in the target namespace and their status",
      "Only the chart repository's website"
    ],
    answer: 2
  },
  {
    question: "84. A Helm installation fails with a Kubernetes RBAC error. What is the likely area to investigate?",
    options: [
      "The chart's README spelling",
      "The application's CSS",
      "The Helm repository's display name",
      "The identity used by Helm and its Kubernetes permissions"
    ],
    answer: 3
  },
  {
    question: "85. A release upgrade succeeds, but the application is unavailable. What should you do next?",
    options: [
      "Inspect Pods, events, logs, Service endpoints, and readiness probes",
      "Immediately delete the entire cluster",
      "Remove all chart dependencies",
      "Disable Kubernetes health checks permanently"
    ],
    answer: 0
  },
  {
    question: "86. Why might a Helm upgrade fail when a Kubernetes resource is immutable?",
    options: [
      "Helm never supports Deployments",
      "The chart attempts to change a field Kubernetes does not allow to be changed in place",
      "Helm requires every resource to use NodePort",
      "All YAML fields are immutable"
    ],
    answer: 1
  },
  {
    question: "87. What is a sensible first step when a Helm release is stuck in a pending state?",
    options: [
      "Delete every namespace",
      "Reinstall the Kubernetes control plane immediately",
      "Inspect release status/history and relevant Kubernetes resources before acting",
      "Change every image tag to latest"
    ],
    answer: 2
  },
  {
    question: "88. Why can `helm list` show no releases when you expect one?",
    options: [
      "Helm cannot list Kubernetes releases",
      "The chart must always be installed in default",
      "Helm releases do not have namespaces",
      "You may be querying the wrong namespace or cluster context"
    ],
    answer: 3
  },
  {
    question: "89. Which Helm option can show additional diagnostic information during a command?",
    options: [
      "--debug",
      "--verbose-yaml-only",
      "--trace-cluster",
      "--show-everything"
    ],
    answer: 0
  },
  {
    question: "90. What is a recommended approach before applying a chart change in production?",
    options: [
      "Delete the old release first in every case",
      "Run linting and render/dry-run checks, review the changes, and use a controlled deployment process",
      "Skip validation to save time",
      "Apply unreviewed values from an unknown source"
    ],
    answer: 1
  },
  {
    question: "91. In a CI/CD pipeline, why use `helm lint`?",
    options: [
      "To measure the application's network latency",
      "To build a container image",
      "To catch common chart structure and template issues before deployment",
      "To create a Kubernetes cluster"
    ],
    answer: 2
  },
  {
    question: "92. Why pin Helm chart versions in production pipelines?",
    options: [
      "To force all deployments to use the latest version",
      "To remove the need for testing",
      "To automatically patch every container",
      "To improve reproducibility and control over what gets deployed"
    ],
    answer: 3
  },
  {
    question: "93. How can you deploy the same chart to development and production with different configurations?",
    options: [
      "Use separate environment-specific values files",
      "Maintain an entirely different Helm CLI for each environment",
      "Hardcode production settings into every template",
      "Use one namespace for every cluster and environment"
    ],
    answer: 0
  },
  {
    question: "94. What is a major benefit of using Helm in GitOps workflows?",
    options: [
      "Helm eliminates the need for Git",
      "Helm charts can define repeatable application deployments that GitOps controllers reconcile",
      "Helm automatically guarantees zero downtime",
      "Helm removes Kubernetes RBAC requirements"
    ],
    answer: 1
  },
  {
    question: "95. Which tool can use Helm charts as part of a declarative GitOps deployment workflow?",
    options: [
      "Docker Compose only",
      "Linux cron only",
      "Argo CD",
      "A text editor only"
    ],
    answer: 2
  },
  {
    question: "96. What is an important consideration when using Helm with Argo CD?",
    options: [
      "Argo CD always stores releases exactly like a direct Helm CLI install",
      "Helm charts cannot be used with Argo CD",
      "Argo CD requires every chart to contain a Dockerfile",
      "Argo CD commonly renders Helm charts and manages the resulting resources declaratively"
    ],
    answer: 3
  },
  {
    question: "97. Why should Helm templates avoid generating unpredictable resource names?",
    options: [
      "Unstable names can cause unnecessary resource replacement and reconciliation problems",
      "Kubernetes does not support resource names",
      "Helm requires random names for every upgrade",
      "Names have no effect on resource identity"
    ],
    answer: 0
  },
  {
    question: "98. What is the purpose of `helm test`?",
    options: [
      "To benchmark the Kubernetes control plane",
      "To run tests defined by the chart, commonly using test-hook resources",
      "To test a Dockerfile without building it",
      "To validate every cluster node's hardware"
    ],
    answer: 1
  },
  {
    question: "99. What is a key benefit of using reusable Helm charts across teams?",
    options: [
      "Every team must use identical application code",
      "Kubernetes no longer needs manifests",
      "Standardized, repeatable deployment patterns with configurable values",
      "It eliminates the need for application monitoring"
    ],
    answer: 2
  },
  {
    question: "100. What is a good production strategy for Helm release management?",
    options: [
      "Deploy untested chart changes directly to all environments",
      "Use plaintext secrets in Git and disable RBAC",
      "Always delete the previous release before every upgrade",
      "Version charts, validate changes, protect secrets, monitor rollouts, and keep a rollback plan"
    ],
    answer: 3
  }
];
