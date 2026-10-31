
import type { DevOpsTool } from "./command-types";

type CommandLevel = DevOpsTool["commands"][number]["level"];

const makeCommands = (
  level: CommandLevel,
  rows: [string, string, string][]
) =>
  rows.map(([command, english, telugu]) => ({
    command,
    level,
    english,
    telugu,
  }));

export const helmTool: DevOpsTool = {
  name: "Helm",
  category: "Orchestration",

  commands: [
    // BASIC - 10
    ...makeCommands("Basic", [
      [
        "helm version",
        "Display the installed Helm client version.",
        "Install ayina Helm version choodu.",
      ],
      [
        "helm help",
        "Display general Helm command help.",
        "Helm commands help choodu.",
      ],
      [
        "helm env",
        "Display Helm client environment information.",
        "Helm environment details choodu.",
      ],
      [
        "helm list -A",
        "List Helm releases across all namespaces.",
        "Namespaces anni lo Helm releases choodu.",
      ],
      [
        "helm repo list",
        "List configured chart repositories.",
        "Configured Helm repositories list choodu.",
      ],
      [
        "helm repo update",
        "Refresh chart repository metadata.",
        "Repository chart metadata update cheyyi.",
      ],
      [
        "helm search hub nginx",
        "Search Artifact Hub for charts matching nginx.",
        "Artifact Hub lo nginx charts search cheyyi.",
      ],
      [
        "helm search repo nginx",
        "Search configured chart repositories for nginx.",
        "Configured repositories lo nginx charts search cheyyi.",
      ],
      [
        "helm show values <chart>",
        "Display the default values of a chart.",
        "Chart default values choodu.",
      ],
      [
        "helm get notes <release> -n <namespace>",
        "Display notes provided by an installed release.",
        "Installed release notes choodu.",
      ],
    ]),

    // INTERMEDIATE - 10
    ...makeCommands("Intermediate", [
      [
        "helm create mychart",
        "Create a new Helm chart directory.",
        "Kotha Helm chart create cheyyi.",
      ],
      [
        "helm repo add <repo-name> <repo-url>",
        "Add a chart repository.",
        "Helm chart repository add cheyyi.",
      ],
      [
        "helm lint ./chart",
        "Check a chart for common issues.",
        "Chart structure, templates lo common issues check cheyyi.",
      ],
      [
        "helm template <release> ./chart",
        "Render Kubernetes manifests locally without installing the release.",
        "Install cheyakunda Kubernetes manifests local ga generate cheyyi.",
      ],
      [
        "helm install <release> <chart> -n <namespace>",
        "Install a chart in the specified namespace.",
        "Specified namespace lo chart install cheyyi.",
      ],
      [
        "helm upgrade --install <release> ./chart -n <namespace> --create-namespace",
        "Install a release or upgrade it if it already exists, creating the namespace if needed.",
        "Release install leda upgrade cheyyi; namespace lekapothe create cheyyi.",
      ],
      [
        "helm status <release> -n <namespace>",
        "Display the status of a named release.",
        "Helm release status choodu.",
      ],
      [
        "helm get values <release> -n <namespace>",
        "Display values applied to an installed release.",
        "Release ki apply ayina values choodu.",
      ],
      [
        "helm dependency list ./chart",
        "List chart dependencies and their status.",
        "Chart dependencies status choodu.",
      ],
      [
        "helm dependency update ./chart",
        "Resolve and download chart dependencies from Chart.yaml.",
        "Chart.yaml prakaram dependencies download and update cheyyi.",
      ],
    ]),

    // ADVANCED - 8
    ...makeCommands("Advanced", [
      [
        "helm get manifest <release> -n <namespace>",
        "Display Kubernetes manifests generated for a release.",
        "Release generate chesina Kubernetes manifests choodu.",
      ],
      [
        "helm history <release> -n <namespace>",
        "Display revision history for a release.",
        "Release revision history choodu.",
      ],
      [
        "helm test <release> -n <namespace>",
        "Run chart-defined tests for an installed release.",
        "Installed release ki chart tests run cheyyi.",
      ],
      [
        "helm rollback <release> <revision> -n <namespace>",
        "Roll back a release to a selected revision.",
        "Release ni selected previous revision ki rollback cheyyi.",
      ],
      [
        "helm uninstall <release> -n <namespace>",
        "Uninstall a Helm release.",
        "Helm release uninstall cheyyi.",
      ],
      [
        "helm package ./chart",
        "Package a chart directory into a chart archive.",
        "Chart directory ni archive ga package cheyyi.",
      ],
      [
        "helm pull <chart> --untar",
        "Download and unpack a chart.",
        "Chart download chesi unpack cheyyi.",
      ],
      [
        "helm push <chart-archive.tgz> oci://<registry>/<repository>",
        "Push a packaged chart to an OCI registry.",
        "Packaged chart ni OCI registry ki push cheyyi.",
      ],
    ]),

    // TROUBLESHOOTING - 7
    ...makeCommands("Troubleshooting", [
      [
        "helm list -A --failed",
        "List failed Helm releases across all namespaces.",
        "Namespaces anni lo failed releases choodu.",
      ],
      [
        "helm upgrade <release> ./chart --dry-run --debug -n <namespace>",
        "Simulate an upgrade and display debugging information without applying changes.",
        "Changes apply cheyakunda upgrade simulate chesi debug details choodu.",
      ],
      [
        "helm template <release> ./chart --debug",
        "Render chart templates with debugging information.",
        "Chart templates debug information tho render cheyyi.",
      ],
      [
        "helm get all <release> -n <namespace>",
        "Display release notes, hooks, values, and generated manifests.",
        "Release notes, hooks, values, manifests anni inspect cheyyi.",
      ],
      [
        "helm dependency build ./chart",
        "Rebuild chart dependencies using the Chart.lock file.",
        "Chart.lock file use chesi dependencies rebuild cheyyi.",
      ],
      [
        "helm rollback <release> <revision> -n <namespace> --wait --timeout 5m",
        "Roll back a release and wait up to five minutes for resources to become ready.",
        "Release rollback chesi resources ready ayye varaku 5 minutes wait cheyyi.",
      ],
      [
        "helm status <release> -n <namespace> --show-resources",
        "Display release status along with its associated resources.",
        "Release status tho paatu associated resources choodu.",
      ],
    ]),
  ],
};
