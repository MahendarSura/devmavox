
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

export const helm: DevOpsTool = {
  name: "Helm",
  category: "Kubernetes Package Management",

  commands: [
    // BASIC - 7
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
        "helm repo list",
        "List configured Helm chart repositories.",
        "Configure chesina Helm repositories list choodu.",
      ],
      [
        "helm repo update",
        "Update chart information from configured repositories.",
        "Repositories nunchi latest chart information update cheyyi.",
      ],
      [
        "helm search hub nginx",
        "Search Artifact Hub for charts matching nginx.",
        "Artifact Hub lo nginx charts search cheyyi.",
      ],
      [
        "helm list",
        "List Helm releases in the current namespace.",
        "Current namespace lo Helm releases list choodu.",
      ],
    ]),

    // INTERMEDIATE - 9
    ...makeCommands("Intermediate", [
      [
        "helm create mychart",
        "Create a new Helm chart with the specified name.",
        "Kotha Helm chart create cheyyi.",
      ],
      [
        "helm repo add bitnami https://charts.bitnami.com/bitnami",
        "Add the Bitnami chart repository.",
        "Bitnami chart repository add cheyyi.",
      ],
      [
        "helm search repo nginx",
        "Search locally configured repositories for nginx charts.",
        "Configured repositories lo nginx charts search cheyyi.",
      ],
      [
        "helm show values bitnami/nginx",
        "Display the default values of a chart.",
        "Chart default values choodu.",
      ],
      [
        "helm lint ./mychart",
        "Check a chart for potential errors and issues.",
        "Chart lo errors, issues unnayo check cheyyi.",
      ],
      [
        "helm template myrelease ./mychart",
        "Render chart templates locally without installing the release.",
        "Install cheyakunda templates locally render cheyyi.",
      ],
      [
        "helm install myrelease ./mychart",
        "Install a chart as a named Helm release.",
        "Chart ni release ga install cheyyi.",
      ],
      [
        "helm status myrelease",
        "Display the status of a named release.",
        "Release status choodu.",
      ],
      [
        "helm get values myrelease",
        "Display the values used by an installed release.",
        "Installed release values choodu.",
      ],
    ]),

    // ADVANCED - 7
    ...makeCommands("Advanced", [
      [
        "helm upgrade myrelease ./mychart",
        "Upgrade an existing release using a chart.",
        "Existing release ni chart tho upgrade cheyyi.",
      ],
      [
        "helm get manifest myrelease",
        "Display the Kubernetes manifest generated for a release.",
        "Release generate chesina manifest choodu.",
      ],
      [
        "helm dependency list ./mychart",
        "List the dependencies declared by a chart.",
        "Chart dependencies list choodu.",
      ],
      [
        "helm dependency update ./mychart",
        "Download and update chart dependencies from Chart.yaml.",
        "Chart.yaml prakaram dependencies update cheyyi.",
      ],
      [
        "helm package ./mychart",
        "Package a chart directory into a chart archive.",
        "Chart directory ni archive ga package cheyyi.",
      ],
      [
        "helm pull bitnami/nginx",
        "Download a chart from a configured repository.",
        "Repository nunchi chart download cheyyi.",
      ],
      [
        "helm push mychart-0.1.0.tgz oci://registry.example.com/helm-charts",
        "Push a packaged chart to an OCI registry.",
        "Packaged chart ni OCI registry ki push cheyyi.",
      ],
    ]),

    // TROUBLESHOOTING - 8
    ...makeCommands("Troubleshooting", [
      [
        "helm list --all-namespaces --failed",
        "List failed Helm releases across all namespaces.",
        "Namespaces anni lo failed releases choodu.",
      ],
      [
        "helm history myrelease",
        "Inspect the revision history of a release.",
        "Release revision history check cheyyi.",
      ],
      [
        "helm get all myrelease",
        "Inspect release notes, hooks, values, and manifest information.",
        "Release notes, hooks, values, manifest details choodu.",
      ],
      [
        "helm template myrelease ./mychart --debug",
        "Render chart templates with debug information to investigate template issues.",
        "Template issues debug cheyyadaniki render cheyyi.",
      ],
      [
        "helm lint ./mychart",
        "Validate a chart when investigating chart configuration problems.",
        "Chart configuration problems kosam validate cheyyi.",
      ],
      [
        "helm dependency build ./mychart",
        "Rebuild chart dependencies using the Chart.lock file.",
        "Chart.lock use chesi dependencies rebuild cheyyi.",
      ],
      [
        "helm rollback myrelease 1",
        "Roll back a release to revision 1.",
        "Release ni revision 1 ki rollback cheyyi.",
      ],
      [
        "helm rollback myrelease 1 --wait --timeout 5m",
        "Roll back to revision 1 and wait for resources to become ready, with a five-minute timeout.",
        "Revision 1 ki rollback chesi resources ready ayye varaku wait cheyyi.",
      ],
    ]),
  ],
};
