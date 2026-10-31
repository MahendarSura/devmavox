import type { DevOpsTool } from "./command-types";

export const helmTool: DevOpsTool = {
    name: "Helm",
    category: "Orchestration",
    commands: [
      { command: "helm list -A", level: "Basic", english: "to list Helm releases across namespaces", telugu: "అన్ని namespaces లో Helm releases చూడటానికి." },
      { command: "helm show values <chart>", level: "Intermediate", english: "to inspect a chart's default values", telugu: "Chart default values చూడటానికి." },
      { command: "helm template <release> <chart>", level: "Advanced", english: "to render Kubernetes manifests locally", telugu: "Kubernetes manifests ను local లో generate చేయటానికి." },
      { command: "helm status <release> -n <namespace>", level: "Troubleshooting", english: "to inspect a release status", telugu: "Helm release status తెలుసుకోవటానికి." },
      {
        command: "helm version",
        level: "Basic",
        english: "Display the Helm version.",
        telugu: "Helm version chudataniki.",
      },
      {
        command: "helm history <release> -n <namespace>",
        level: "Intermediate",
        english: "Show revision history for a release.",
        telugu: "Release revisions history chudataniki.",
      },
      {
        command: "helm get values <release> -n <namespace>",
        level: "Intermediate",
        english: "Display values applied to a release.",
        telugu: "Release ki apply ayina values chudataniki.",
      },
      {
        command: "helm get manifest <release> -n <namespace>",
        level: "Advanced",
        english: "Display Kubernetes manifests generated for a release.",
        telugu: "Release generate chesina manifests inspect cheyyataniki.",
      },
      {
        command: "helm lint ./chart",
        level: "Basic",
        english: "Check a chart for common issues.",
        telugu: "Chart structure, templates common issues validate cheyyataniki.",
      },
      {
        command: "helm template <release> ./chart",
        level: "Intermediate",
        english: "Render chart templates locally without installing.",
        telugu: "Install cheyyakunda rendered YAML preview cheyyataniki.",
      },
      {
        command: "helm upgrade --install <release> ./chart -n <namespace> --create-namespace",
        level: "Intermediate",
        english: "Install a release or upgrade it if it already exists.",
        telugu: "Release install/upgrade cheyyataniki; production values verify cheyyali.",
      },
      {
        command: "helm rollback <release> <revision> -n <namespace>",
        level: "Advanced",
        english: "Roll back a release to a selected revision.",
        telugu: "Helm release previous revision ki rollback cheyyataniki.",
      },
      {
        command: "helm repo list",
        level: "Basic",
        english: "List configured chart repositories.",
        telugu: "Configured Helm repositories chudataniki.",
      },
      {
        command: "helm repo update",
        level: "Basic",
        english: "Refresh chart repository metadata.",
        telugu: "Repository chart metadata update cheyyataniki.",
      },
      {
        command: "helm dependency list ./chart",
        level: "Intermediate",
        english: "List chart dependencies and their status.",
        telugu: "Chart dependencies status inspect cheyyataniki.",
      },
      {
        command: "helm dependency update ./chart",
        level: "Intermediate",
        english: "Resolve and download chart dependencies.",
        telugu: "Chart dependencies download/update cheyyataniki.",
      },
      {
        command: "helm test <release> -n <namespace>",
        level: "Advanced",
        english: "Run chart-defined tests for a release.",
        telugu: "Release chart tests execute cheyyataniki.",
      },
      {
        command: "helm uninstall <release> -n <namespace>",
        level: "Advanced",
        english: "Uninstall a Helm release.",
        telugu: "Release resources remove cheyyataniki; production workload impact verify cheyyali.",
      },
      {
        command: "helm get notes <release> -n <namespace>",
        level: "Basic",
        english: "Show notes printed by a chart after installation.",
        telugu: "Chart installation notes chudataniki.",
      },
      {
        command: "helm pull <chart> --untar",
        level: "Intermediate",
        english: "Download and unpack a chart.",
        telugu: "Chart download chesi inspect cheyyataniki.",
      },
      {
        command: "helm upgrade <release> ./chart --dry-run --debug -n <namespace>",
        level: "Troubleshooting",
        english: "Simulate an upgrade and show debugging output.",
        telugu: "Upgrade apply cheyyakunda rendered changes debug cheyyataniki.",
      },
    ],
  };
