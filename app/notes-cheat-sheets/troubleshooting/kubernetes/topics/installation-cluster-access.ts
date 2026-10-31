import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Installation and Cluster Access",
  description: "Detailed Kubernetes notes covering installation and cluster access, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "03. Kubernetes Installation and Cluster Access – kubeadm, Managed Clusters and kubeconfig",
          explanation: `
    Kubernetes clusters can be created using different approaches.
    
    SELF-MANAGED CLUSTER:
    An organization manages control-plane and worker-node infrastructure.
    
    KUBEADM:
    A tool used to bootstrap Kubernetes clusters on supported Linux systems.
    
    MANAGED KUBERNETES:
    A cloud provider manages some or most control-plane operations.
    
    Examples:
    - Amazon EKS.
    - Azure AKS.
    - Google GKE.
    
    LOCAL LEARNING CLUSTERS:
    Tools such as Minikube and kind are commonly used for learning and local development.
    
    KUBECONFIG:
    
    kubectl uses kubeconfig to identify:
    - Cluster endpoint.
    - Authentication information.
    - User.
    - Context.
    - Default namespace.
    
    A context combines cluster, user and optional namespace information.
    
    COMMON COMMANDS:
    
    kubectl config get-contexts:
    Lists available contexts.
    
    kubectl config current-context:
    Shows the active context.
    
    kubectl config use-context:
    Selects another context.
    
    IMPORTANT PRODUCTION WARNING:
    
    Always verify the active context before running destructive commands.
    
    A command executed against production instead of a development cluster can cause serious impact.
    
    Do not share kubeconfig files containing credentials or tokens.
          `,
          steps: [
            "Install a supported kubectl version.",
            "Obtain the correct cluster credentials.",
            "Check the kubeconfig location and permissions.",
            "List available contexts.",
            "Select the intended context.",
            "Verify the cluster endpoint and node list.",
            "Confirm permissions before changing resources."
          ],
          commands: `
    kubectl version --client
    
    kubectl config view
    
    kubectl config get-contexts
    
    kubectl config current-context
    
    kubectl config use-context development
    
    kubectl cluster-info
    
    kubectl get nodes
          `,
          problems: [
            {
              issue: "The connection to the server was refused.",
              rootCause:
                "The API Server may be unavailable, kubeconfig may point to an incorrect endpoint or network access may be blocked.",
              solution:
                "Verify the current context, API Server endpoint, cluster status, DNS and network connectivity."
            },
            {
              issue: "You must be logged in to the server.",
              rootCause:
                "Authentication credentials may be missing, expired or incorrectly configured.",
              solution:
                "Refresh credentials through the approved cluster authentication process and verify the selected user."
            },
            {
              issue: "kubectl commands affect the wrong cluster.",
              rootCause:
                "The active kubeconfig context is not the intended environment.",
              solution:
                "Check kubectl config current-context and explicitly select the correct context before making changes."
            }
          ]
        }
  ]
};

export default data;
