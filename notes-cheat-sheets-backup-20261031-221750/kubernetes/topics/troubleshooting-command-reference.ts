import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Troubleshooting Command Reference",
  description: "Detailed Kubernetes notes covering troubleshooting command reference, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "27. Kubernetes Troubleshooting Command Reference",
          explanation: `
    A production engineer should know how to use kubectl effectively.
    
    GET:
    Lists resources.
    
    DESCRIBE:
    Shows detailed resource information and events.
    
    LOGS:
    Reads container logs.
    
    EXEC:
    Runs a command inside a container.
    
    APPLY:
    Creates or updates resources from configuration files.
    
    DELETE:
    Deletes resources.
    
    EDIT:
    Opens a live resource for editing. Use carefully in production.
    
    PATCH:
    Applies a targeted change.
    
    DIFF:
    Shows the differences between the live configuration and a proposed configuration.
    
    ROLLOUT:
    Manages Deployment rollout operations.
    
    TOP:
    Displays resource usage when metrics are available.
    
    OUTPUT FORMATS:
    
    -o wide:
    Shows additional columns.
    
    -o yaml:
    Prints resource YAML.
    
    -o json:
    Prints resource JSON.
    
    -o name:
    Prints resource names.
    
    --all-namespaces:
    Includes resources from all namespaces.
    
    -n:
    Selects a namespace.
    
    -l:
    Selects resources by label.
    
    --watch:
    Watches for changes.
    
    IMPORTANT:
    kubectl delete, apply, patch and rollout operations can affect production. Confirm context, namespace and resource before executing.
          `,
          steps: [
            "Check the current context.",
            "Select the correct namespace.",
            "List the affected resources.",
            "Describe the resource.",
            "Read logs and events.",
            "Inspect the YAML configuration.",
            "Apply the smallest verified change.",
            "Check status and verify the application."
          ],
          commands: `
    kubectl config current-context
    
    kubectl get pods -A
    
    kubectl get pods -n production -o wide
    
    kubectl describe pod <pod-name> -n production
    
    kubectl logs <pod-name> -n production
    
    kubectl logs <pod-name> -n production --previous
    
    kubectl exec -it <pod-name> -n production -- sh
    
    kubectl get deployment api -n production -o yaml
    
    kubectl diff -f deployment.yaml
    
    kubectl apply -f deployment.yaml
    
    kubectl rollout status deployment/api -n production
    
    kubectl get events -A --sort-by=.lastTimestamp
    
    kubectl top nodes
    
    kubectl top pods -A
          `,
          problems: [
            {
              issue: "Engineer changes the wrong resource or namespace.",
              rootCause:
                "The active context or namespace was not verified before running a command.",
              solution:
                "Check the active context and namespace before every production change. Use explicit -n values for important operations."
            }
          ]
        }
  ]
};

export default data;
