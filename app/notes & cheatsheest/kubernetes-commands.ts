
import type { DevOpsTool } from "./command-types";

export const kubernetesTool: DevOpsTool = {
  name: "Kubernetes",
  category: "Orchestration",
  commands: [
    // BASIC - 12
    {
      command: "kubectl version --client",
      level: "Basic",
      english: "Display the Kubernetes client version.",
      telugu: "kubectl client version chudataniki.",
    },
    {
      command: "kubectl version",
      level: "Basic",
      english: "Display Kubernetes client and server versions.",
      telugu: "kubectl client mariyu cluster server versions chudataniki.",
    },
    {
      command: "kubectl cluster-info",
      level: "Basic",
      english: "Display Kubernetes control-plane endpoints.",
      telugu: "Cluster control-plane endpoints verify cheyyataniki.",
    },
    {
      command: "kubectl config current-context",
      level: "Basic",
      english: "Show the active Kubernetes context.",
      telugu: "Current active cluster context chudataniki.",
    },
    {
      command: "kubectl config get-contexts",
      level: "Basic",
      english: "List configured Kubernetes contexts.",
      telugu: "Available Kubernetes contexts list chudataniki.",
    },
    {
      command: "kubectl get nodes",
      level: "Basic",
      english: "List Kubernetes cluster nodes.",
      telugu: "Cluster lo unna nodes status chudataniki.",
    },
    {
      command: "kubectl get nodes -o wide",
      level: "Basic",
      english: "List nodes with additional details.",
      telugu: "Nodes status, IP, runtime details chudataniki.",
    },
    {
      command: "kubectl get namespaces",
      level: "Basic",
      english: "List all namespaces.",
      telugu: "Cluster lo namespaces chudataniki.",
    },
    {
      command: "kubectl get pods",
      level: "Basic",
      english: "List pods in the current namespace.",
      telugu: "Current namespace lo Pods chudataniki.",
    },
    {
      command: "kubectl get pods -A",
      level: "Basic",
      english: "List pods in all namespaces.",
      telugu: "Anni namespaces lo Pods status chudataniki.",
    },
    {
      command: "kubectl get services -A",
      level: "Basic",
      english: "List services across all namespaces.",
      telugu: "Anni namespaces lo Services chudataniki.",
    },
    {
      command: "kubectl get deployments -A",
      level: "Basic",
      english: "List deployments across all namespaces.",
      telugu: "Anni namespaces lo Deployments chudataniki.",
    },

    // INTERMEDIATE - 14
    {
      command: "kubectl get pods -n <namespace> -o wide",
      level: "Intermediate",
      english: "List namespace pods with node and IP details.",
      telugu: "Namespace lo Pods node, IP details chudataniki.",
    },
    {
      command: "kubectl describe pod <pod-name> -n <namespace>",
      level: "Intermediate",
      english: "Inspect pod details, conditions and events.",
      telugu: "Pod details, conditions, events telusukovataniki.",
    },
    {
      command: "kubectl describe node <node-name>",
      level: "Intermediate",
      english: "Inspect node conditions and resource information.",
      telugu: "Node conditions, resource details chudataniki.",
    },
    {
      command: "kubectl get pods -n <namespace> -o yaml",
      level: "Intermediate",
      english: "Display pod configuration in YAML format.",
      telugu: "Pod configuration YAML format lo chudataniki.",
    },
    {
      command: "kubectl logs <pod-name> -n <namespace>",
      level: "Intermediate",
      english: "Display logs from a pod.",
      telugu: "Pod application logs chudataniki.",
    },
    {
      command: "kubectl logs <pod-name> -c <container-name> -n <namespace>",
      level: "Intermediate",
      english: "Display logs from a specific container in a pod.",
      telugu: "Pod lo specific container logs chudataniki.",
    },
    {
      command: "kubectl logs -f deployment/<deployment> -n <namespace>",
      level: "Intermediate",
      english: "Follow logs from a deployment's pods.",
      telugu: "Deployment pods logs live ga chudataniki.",
    },
    {
      command: "kubectl exec -it <pod-name> -n <namespace> -- /bin/sh",
      level: "Intermediate",
      english: "Open a shell inside a pod container.",
      telugu: "Pod container lopala shell open cheyyataniki.",
    },
    {
      command: "kubectl port-forward pod/<pod-name> 8080:80 -n <namespace>",
      level: "Intermediate",
      english: "Forward a local port to a pod.",
      telugu: "Local machine nunchi pod ni access cheyyataniki.",
    },
    {
      command: "kubectl port-forward svc/<service> 8080:80 -n <namespace>",
      level: "Intermediate",
      english: "Forward a local port to a Kubernetes service.",
      telugu: "Local machine nunchi service test cheyyataniki.",
    },
    {
      command: "kubectl apply -f deployment.yaml",
      level: "Intermediate",
      english: "Create or update resources from a manifest.",
      telugu: "YAML manifest dwara resources create or update cheyyataniki.",
    },
    {
      command: "kubectl diff -f deployment.yaml",
      level: "Intermediate",
      english: "Preview manifest changes before applying them.",
      telugu: "Apply mundu manifest changes preview cheyyataniki.",
    },
    {
      command: "kubectl explain deployment.spec --recursive",
      level: "Intermediate",
      english: "Display detailed documentation for deployment fields.",
      telugu: "Deployment fields gurinchi detailed information chudataniki.",
    },
    {
      command: "kubectl scale deployment/<deployment> --replicas=3 -n <namespace>",
      level: "Intermediate",
      english: "Set the desired replica count for a deployment.",
      telugu: "Deployment replicas 3 ki set cheyyataniki.",
    },

    // ADVANCED - 12
    {
      command: "kubectl create deployment nginx --image=nginx",
      level: "Advanced",
      english: "Create a deployment using the specified container image.",
      telugu: "Nginx image tho deployment create cheyyataniki.",
    },
    {
      command: "kubectl expose deployment nginx --port=80 --target-port=80 --type=ClusterIP",
      level: "Advanced",
      english: "Expose a deployment through a ClusterIP service.",
      telugu: "Deployment ni ClusterIP service dwara expose cheyyataniki.",
    },
    {
      command: "kubectl autoscale deployment nginx --min=2 --max=10 --cpu-percent=80",
      level: "Advanced",
      english: "Configure horizontal pod autoscaling based on CPU utilization.",
      telugu: "CPU usage base chesukoni automatic scaling configure cheyyataniki.",
    },
    {
      command: "kubectl set image deployment/nginx nginx=nginx:1.27",
      level: "Advanced",
      english: "Update the container image in a deployment.",
      telugu: "Deployment lo container image update cheyyataniki.",
    },
    {
      command: "kubectl rollout status deployment/nginx",
      level: "Advanced",
      english: "Check deployment rollout progress.",
      telugu: "Deployment update status telusukovataniki.",
    },
    {
      command: "kubectl rollout history deployment/nginx",
      level: "Advanced",
      english: "Display deployment rollout history.",
      telugu: "Deployment previous revisions chudataniki.",
    },
    {
      command: "kubectl rollout restart deployment/nginx",
      level: "Advanced",
      english: "Restart all pods managed by a deployment.",
      telugu: "Deployment pods restart cheyyataniki.",
    },
    {
      command: "kubectl rollout pause deployment/nginx",
      level: "Advanced",
      english: "Pause a deployment rollout.",
      telugu: "Deployment rollout ni temporarily pause cheyyataniki.",
    },
    {
      command: "kubectl rollout resume deployment/nginx",
      level: "Advanced",
      english: "Resume a paused deployment rollout.",
      telugu: "Paused deployment rollout ni resume cheyyataniki.",
    },
    {
      command: "kubectl rollout undo deployment/<deployment-name> -n <namespace>",
      level: "Advanced",
      english: "Roll back a deployment to its previous revision.",
      telugu: "Deployment ni previous revision ki rollback cheyyataniki.",
    },
    {
      command: "kubectl get endpointslices -A",
      level: "Advanced",
      english: "Inspect EndpointSlice resources for service backends.",
      telugu: "Services backend endpoints inspect cheyyataniki.",
    },
    {
      command: "kubectl apply --dry-run=server -f deployment.yaml",
      level: "Advanced",
      english: "Validate a manifest against the API server without saving it.",
      telugu: "API server dwara manifest validate cheyyataniki; resource save avvadu.",
    },

    // TROUBLESHOOTING - 13
    {
      command: "kubectl get pods -A -o wide",
      level: "Troubleshooting",
      english: "Inspect pods across namespaces with node and IP details.",
      telugu: "Anni namespaces lo Pods node, IP details troubleshoot cheyyataniki.",
    },
    {
      command: "kubectl get pods -o wide",
      level: "Troubleshooting",
      english: "Inspect pod nodes and IP addresses in the current namespace.",
      telugu: "Current namespace lo Pod node, IP details chudataniki.",
    },
    {
      command: "kubectl get events -A --sort-by=.metadata.creationTimestamp",
      level: "Troubleshooting",
      english: "View cluster events ordered by creation time.",
      telugu: "Cluster events ni creation time prakaram chudataniki.",
    },
    {
      command: "kubectl get events -A --sort-by=.lastTimestamp",
      level: "Troubleshooting",
      english: "View events ordered by their last timestamp where available.",
      telugu: "Events last timestamp prakaram troubleshoot cheyyataniki.",
    },
    {
      command: "kubectl logs <pod-name> -n <namespace> --previous",
      level: "Troubleshooting",
      english: "Inspect logs from the previous crashed container instance.",
      telugu: "Crash ayina container previous logs chudataniki.",
    },
    {
      command: "kubectl logs <pod-name> -n <namespace> --tail=100",
      level: "Troubleshooting",
      english: "Display the last 100 lines of pod logs.",
      telugu: "Pod logs lo last 100 lines chudataniki.",
    },
    {
      command: "kubectl top nodes",
      level: "Troubleshooting",
      english: "Display node CPU and memory usage.",
      telugu: "Node CPU, RAM usage chudataniki; Metrics Server required.",
    },
    {
      command: "kubectl top pods -A",
      level: "Troubleshooting",
      english: "Display pod CPU and memory usage across namespaces.",
      telugu: "Anni namespaces lo Pod resource usage chudataniki.",
    },
    {
      command: "kubectl get pods -n <namespace> --field-selector=status.phase=Pending",
      level: "Troubleshooting",
      english: "Find pods stuck in Pending phase.",
      telugu: "Pending state lo unna Pods identify cheyyataniki.",
    },
    {
      command: "kubectl get pods -n <namespace> --field-selector=status.phase=Failed",
      level: "Troubleshooting",
      english: "Find pods in Failed phase.",
      telugu: "Failed state lo unna Pods identify cheyyataniki.",
    },
    {
      command: "kubectl wait --for=condition=Ready pod/<pod-name> -n <namespace> --timeout=120s",
      level: "Troubleshooting",
      english: "Wait until a pod becomes Ready or the timeout expires.",
      telugu: "Pod Ready state ki vachhe varaku wait cheyyataniki.",
    },
    {
      command: "kubectl uncordon <node-name>",
      level: "Troubleshooting",
      english: "Allow new pods to be scheduled on a cordoned node.",
      telugu: "Cordoned node meeda malli Pods schedule avvadaniki allow cheyyataniki.",
    },
    {
      command: "kubectl auth can-i create deployments -n <namespace>",
      level: "Troubleshooting",
      english: "Check whether the current identity can create deployments.",
      telugu: "Current identity ki deployment create permission undho check cheyyataniki.",
    },
    {
      command: "kubectl get pvc -A",
      level: "Troubleshooting",
      english: "List persistent volume claims across namespaces.",
      telugu: "PVC Pending or Bound status troubleshoot cheyyataniki.",
    },
    {
      command: "kubectl delete pod <pod-name> -n <namespace>",
      level: "Troubleshooting",
      english: "Delete a pod so its controller can recreate it when applicable.",
      telugu: "Pod delete chesi controller recreate chesthundo chudataniki.",
    },
  ],
};
