
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

export const kubernetesTool: DevOpsTool = {
  name: "Kubernetes",
  category: "Orchestration",
  commands: [
    // BASIC - 14
    ...makeCommands("Basic", [
      [
        "kubectl version --client",
        "Display the Kubernetes client version.",
        "kubectl client version chudataniki.",
      ],
      [
        "kubectl version",
        "Display Kubernetes client and server versions.",
        "Client mariyu cluster server versions chudataniki.",
      ],
      [
        "kubectl cluster-info",
        "Display Kubernetes control-plane endpoints.",
        "Cluster control-plane endpoints verify cheyyataniki.",
      ],
      [
        "kubectl config current-context",
        "Show the active Kubernetes context.",
        "Current active cluster context chudataniki.",
      ],
      [
        "kubectl config get-contexts",
        "List configured Kubernetes contexts.",
        "Available Kubernetes contexts list chudataniki.",
      ],
      [
        "kubectl get nodes",
        "List Kubernetes cluster nodes.",
        "Cluster lo unna nodes status chudataniki.",
      ],
      [
        "kubectl get nodes -o wide",
        "List nodes with additional details.",
        "Nodes status, IP, runtime details chudataniki.",
      ],
      [
        "kubectl get namespaces",
        "List all namespaces.",
        "Cluster lo namespaces chudataniki.",
      ],
      [
        "kubectl get pods",
        "List pods in the current namespace.",
        "Current namespace lo Pods chudataniki.",
      ],
      [
        "kubectl get pods -A",
        "List pods across all namespaces.",
        "Anni namespaces lo Pods chudataniki.",
      ],
      [
        "kubectl get services -A",
        "List services across all namespaces.",
        "Anni namespaces lo Services chudataniki.",
      ],
      [
        "kubectl get deployments -A",
        "List deployments across all namespaces.",
        "Anni namespaces lo Deployments chudataniki.",
      ],
      [
        "kubectl api-resources",
        "List API resources supported by the cluster.",
        "Cluster support chese API resources chudataniki.",
      ],
      [
        "kubectl get deploy,rs,svc,ingress -n <namespace>",
        "List deployments, ReplicaSets, services and ingress resources.",
        "Namespace lo workloads, networking resources chudataniki.",
      ],
    ]),

    // INTERMEDIATE - 18
    ...makeCommands("Intermediate", [
      [
        "kubectl get pods -n <namespace> -o wide",
        "List namespace pods with node and IP details.",
        "Namespace lo Pods node, IP details chudataniki.",
      ],
      [
        "kubectl describe pod <pod-name> -n <namespace>",
        "Inspect pod details, conditions and events.",
        "Pod details, conditions, events telusukovataniki.",
      ],
      [
        "kubectl describe node <node-name>",
        "Inspect node conditions and resource information.",
        "Node conditions, resource details chudataniki.",
      ],
      [
        "kubectl get pods -n <namespace> -o yaml",
        "Display pod configuration in YAML format.",
        "Pod configuration YAML format lo chudataniki.",
      ],
      [
        "kubectl logs <pod-name> -n <namespace>",
        "Display logs from a pod.",
        "Pod application logs chudataniki.",
      ],
      [
        "kubectl logs <pod-name> -c <container-name> -n <namespace>",
        "Display logs from a specific container in a pod.",
        "Pod lo specific container logs chudataniki.",
      ],
      [
        "kubectl logs -f deployment/<deployment> -n <namespace>",
        "Follow logs from a deployment's pods.",
        "Deployment pods logs live ga chudataniki.",
      ],
      [
        "kubectl exec -it <pod-name> -n <namespace> -- /bin/sh",
        "Open a shell inside a pod container.",
        "Pod container lopala shell open cheyyataniki.",
      ],
      [
        "kubectl port-forward pod/<pod-name> 8080:80 -n <namespace>",
        "Forward a local port to a pod.",
        "Local machine nunchi pod ni access cheyyataniki.",
      ],
      [
        "kubectl port-forward svc/<service> 8080:80 -n <namespace>",
        "Forward a local port to a Kubernetes service.",
        "Local machine nunchi service test cheyyataniki.",
      ],
      [
        "kubectl apply -f deployment.yaml",
        "Create or update resources from a manifest.",
        "YAML manifest dwara resources create or update cheyyataniki.",
      ],
      [
        "kubectl diff -f deployment.yaml",
        "Preview manifest changes before applying them.",
        "Apply mundu manifest changes preview cheyyataniki.",
      ],
      [
        "kubectl explain deployment.spec --recursive",
        "Display documentation for deployment fields.",
        "Deployment fields gurinchi detailed information chudataniki.",
      ],
      [
        "kubectl scale deployment/<deployment> --replicas=3 -n <namespace>",
        "Set the desired replica count for a deployment.",
        "Deployment replicas 3 ki set cheyyataniki.",
      ],
      [
        "kubectl get pvc -A",
        "List persistent volume claims across namespaces.",
        "Anni namespaces lo PVC status chudataniki.",
      ],
      [
        "kubectl get services,endpoints -A",
        "List services and their endpoint resources.",
        "Services mariyu vati endpoints chudataniki.",
      ],
      [
        "kubectl get pods -n <namespace> -l app=<label>",
        "List pods matching a label selector.",
        "Label match ayye Pods matrame chudataniki.",
      ],
      [
        "kubectl get pods -n <namespace> --watch",
        "Watch pod changes in real time.",
        "Pods status changes live ga chudataniki.",
      ],
    ]),

    // ADVANCED - 20
    ...makeCommands("Advanced", [
      [
        "kubectl create deployment nginx --image=nginx",
        "Create a deployment using the specified container image.",
        "Nginx image tho deployment create cheyyataniki.",
      ],
      [
        "kubectl expose deployment nginx --port=80 --target-port=80 --type=ClusterIP",
        "Expose a deployment through a ClusterIP service.",
        "Deployment ni ClusterIP service dwara expose cheyyataniki.",
      ],
      [
        "kubectl autoscale deployment nginx --min=2 --max=10 --cpu-percent=80",
        "Configure horizontal pod autoscaling based on CPU utilization.",
        "CPU usage base chesukoni automatic scaling configure cheyyataniki.",
      ],
      [
        "kubectl set image deployment/nginx nginx=nginx:1.27",
        "Update the container image in a deployment.",
        "Deployment lo container image update cheyyataniki.",
      ],
      [
        "kubectl rollout status deployment/nginx",
        "Check deployment rollout progress.",
        "Deployment update status telusukovataniki.",
      ],
      [
        "kubectl rollout history deployment/nginx",
        "Display deployment rollout history.",
        "Deployment previous revisions chudataniki.",
      ],
      [
        "kubectl rollout restart deployment/nginx",
        "Restart all pods managed by a deployment.",
        "Deployment pods restart cheyyataniki.",
      ],
      [
        "kubectl rollout pause deployment/nginx",
        "Pause a deployment rollout.",
        "Deployment rollout ni temporarily pause cheyyataniki.",
      ],
      [
        "kubectl rollout resume deployment/nginx",
        "Resume a paused deployment rollout.",
        "Paused deployment rollout ni resume cheyyataniki.",
      ],
      [
        "kubectl rollout undo deployment/<deployment> -n <namespace>",
        "Roll back a deployment to its previous revision.",
        "Deployment ni previous revision ki rollback cheyyataniki.",
      ],
      [
        "kubectl get endpointslices -A",
        "Inspect EndpointSlice resources for service backends.",
        "Services backend endpoints inspect cheyyataniki.",
      ],
      [
        "kubectl apply --dry-run=server -f deployment.yaml",
        "Validate a manifest against the API server without saving it.",
        "API server dwara manifest validate cheyyataniki; resource save avvadu.",
      ],
      [
        "kubectl create configmap <name> --from-file=<directory>",
        "Create a ConfigMap from files in a directory.",
        "Directory files nunchi ConfigMap create cheyyataniki.",
      ],
      [
        "kubectl create secret generic <name> --from-file=<file>",
        "Create a generic Secret from a file.",
        "File nunchi Kubernetes Secret create cheyyataniki.",
      ],
      [
        "kubectl set env deployment/<deployment> KEY=value -n <namespace>",
        "Set an environment variable on a deployment.",
        "Deployment lo environment variable set cheyyataniki.",
      ],
      [
        "kubectl set resources deployment/<deployment> -c=<container> --requests=cpu=100m,memory=128Mi --limits=cpu=500m,memory=512Mi",
        "Set CPU and memory requests and limits.",
        "Container CPU, memory requests and limits set cheyyataniki.",
      ],
      [
        "kubectl patch deployment <deployment> -p '{\"spec\":{\"replicas\":3}}' -n <namespace>",
        "Update selected deployment fields using a patch.",
        "Patch dwara deployment fields update cheyyataniki.",
      ],
      [
        "kubectl label node <node-name> environment=production",
        "Add a label to a Kubernetes node.",
        "Node ki production label add cheyyataniki.",
      ],
      [
        "kubectl taint nodes <node-name> dedicated=app:NoSchedule",
        "Add a NoSchedule taint to a node.",
        "Node meeda NoSchedule taint apply cheyyataniki.",
      ],
      [
        "kubectl kustomize ./overlays/production",
        "Build Kubernetes resources from a Kustomize directory.",
        "Kustomize directory nunchi Kubernetes manifests generate cheyyataniki.",
      ],
    ]),

    // TROUBLESHOOTING - 22
    ...makeCommands("Troubleshooting", [
      [
        "kubectl get pods -A -o wide",
        "Inspect pods across namespaces with node and IP details.",
        "Anni namespaces lo Pods node, IP details troubleshoot cheyyataniki.",
      ],
      [
        "kubectl get pods -o wide",
        "Inspect pod nodes and IP addresses in the current namespace.",
        "Current namespace lo Pod node, IP details chudataniki.",
      ],
      [
        "kubectl get events -A --sort-by=.metadata.creationTimestamp",
        "View cluster events ordered by creation time.",
        "Cluster events ni creation time prakaram chudataniki.",
      ],
      [
        "kubectl get events -A --sort-by=.lastTimestamp",
        "View events ordered by their last timestamp where available.",
        "Events last timestamp prakaram troubleshoot cheyyataniki.",
      ],
      [
        "kubectl logs <pod-name> -n <namespace> --previous",
        "Inspect logs from the previous crashed container instance.",
        "Crash ayina container previous logs chudataniki.",
      ],
      [
        "kubectl logs <pod-name> -n <namespace> --tail=100",
        "Display the last 100 lines of pod logs.",
        "Pod logs lo last 100 lines chudataniki.",
      ],
      [
        "kubectl top nodes",
        "Display node CPU and memory usage.",
        "Node CPU, RAM usage chudataniki; Metrics Server required.",
      ],
      [
        "kubectl top pods -A",
        "Display pod CPU and memory usage across namespaces.",
        "Anni namespaces lo Pod resource usage chudataniki.",
      ],
      [
        "kubectl get pods -n <namespace> --field-selector=status.phase=Pending",
        "Find pods stuck in Pending phase in a namespace.",
        "Namespace lo Pending Pods identify cheyyataniki.",
      ],
      [
        "kubectl get pods -n <namespace> --field-selector=status.phase=Failed",
        "Find failed pods in a namespace.",
        "Namespace lo Failed Pods identify cheyyataniki.",
      ],
      [
        "kubectl get pods -A --field-selector=status.phase=Pending",
        "Find pending pods across all namespaces.",
        "Anni namespaces lo Pending Pods identify cheyyataniki.",
      ],
      [
        "kubectl get pods -A --field-selector=status.phase=Failed",
        "Find failed pods across all namespaces.",
        "Anni namespaces lo Failed Pods identify cheyyataniki.",
      ],
      [
        "kubectl wait --for=condition=Ready pod/<pod-name> -n <namespace> --timeout=120s",
        "Wait until a pod becomes Ready or the timeout expires.",
        "Pod Ready state ki vachhe varaku wait cheyyataniki.",
      ],
      [
        "kubectl uncordon <node-name>",
        "Allow new pods to be scheduled on a cordoned node.",
        "Cordoned node meeda malli Pods schedule avvadaniki allow cheyyataniki.",
      ],
      [
        "kubectl auth can-i create deployments -n <namespace>",
        "Check whether the current identity can create deployments.",
        "Deployment create permission undho check cheyyataniki.",
      ],
      [
        "kubectl auth can-i --list -n <namespace>",
        "List permissions available to the current identity in a namespace.",
        "Current identity ki unna namespace permissions chudataniki.",
      ],
      [
        "kubectl delete pod <pod-name> -n <namespace>",
        "Delete a pod so its controller can recreate it when applicable.",
        "Pod delete chesi controller recreate chesthundo chudataniki.",
      ],
      [
        "kubectl describe deployment <deployment> -n <namespace>",
        "Inspect deployment conditions, events and rollout details.",
        "Deployment conditions, events, rollout errors chudataniki.",
      ],
      [
        "kubectl debug pod/<pod-name> -it --image=busybox --target=<container-name> -n <namespace>",
        "Start an ephemeral debugging container for a pod.",
        "Pod troubleshoot cheyyataniki temporary debug container start cheyyataniki.",
      ],
      [
        "kubectl cordon <node-name>",
        "Mark a node as unschedulable during maintenance.",
        "Maintenance time lo node meeda new Pods schedule avvakunda cheyyataniki.",
      ],
      [
        "kubectl drain <node-name> --ignore-daemonsets",
        "Evict eligible pods from a node before maintenance.",
        "Node maintenance mundu eligible Pods evict cheyyataniki.",
      ],
      [
        "kubectl cluster-info dump",
        "Collect cluster diagnostic information.",
        "Cluster diagnostic information collect cheyyataniki.",
      ],
    ]),
  ],
};
