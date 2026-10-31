import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Helm",
  description: "Detailed Kubernetes notes covering helm, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "19. Helm – Kubernetes Package Management",
          explanation: `
    Helm is a package manager for Kubernetes.
    
    It helps teams package and manage Kubernetes resources using charts.
    
    IMPORTANT HELM CONCEPTS:
    
    Chart:
    A package containing Kubernetes templates and metadata.
    
    Release:
    An installed instance of a chart.
    
    Values:
    Configuration supplied to chart templates.
    
    Templates:
    Files used to generate Kubernetes resource manifests.
    
    values.yaml:
    Default chart configuration.
    
    Chart.yaml:
    Chart metadata and version information.
    
    COMMON HELM OPERATIONS:
    
    install:
    Installs a chart.
    
    upgrade:
    Updates a release.
    
    rollback:
    Returns a release to a previous revision.
    
    list:
    Lists releases.
    
    history:
    Shows release history.
    
    template:
    Renders templates locally without installing.
    
    IMPORTANT:
    Helm release history and Kubernetes Deployment rollout history are different mechanisms. A Helm rollback can change multiple chart-managed resources, while a Deployment rollback applies to that Deployment's revisions.
          `,
          steps: [
            "Inspect chart metadata and default values.",
            "Review the values file.",
            "Render templates before deployment.",
            "Install or upgrade the release.",
            "Check release status.",
            "Inspect Kubernetes resources created by the chart.",
            "Rollback when a release is unsafe.",
            "Verify application behavior."
          ],
          commands: `
    helm version
    
    helm repo list
    
    helm search repo nginx
    
    helm list -A
    
    helm show values <chart-name>
    
    helm template my-release <chart-name> -f values.yaml
    
    helm install my-release <chart-name> -f values.yaml
    
    helm upgrade my-release <chart-name> -f values.yaml
    
    helm history my-release
    
    helm rollback my-release 1
    
    helm status my-release
          `,
          problems: [
            {
              issue: "Helm upgrade fails.",
              rootCause:
                "Templates may be invalid, values may be incorrect, resources may conflict or the user may lack permissions.",
              solution:
                "Render templates, inspect Helm output and Kubernetes events, validate values and correct the resource or permission issue."
            },
            {
              issue: "Helm release is stuck in pending state.",
              rootCause:
                "A previous install or upgrade may not have completed successfully or release operations may be blocked.",
              solution:
                "Inspect Helm history and status, review Kubernetes resources and events, then follow a controlled recovery or rollback procedure."
            }
          ]
        }
  ]
};

export default data;
