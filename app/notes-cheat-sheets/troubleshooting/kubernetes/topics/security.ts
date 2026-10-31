import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Kubernetes Security and RBAC",
  description: "Detailed Kubernetes notes covering kubernetes security and rbac, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "14. Namespaces and RBAC – Users, Roles and Permissions",
          explanation: `
    Namespaces logically separate resources inside a Kubernetes cluster.
    
    Example namespaces:
    - development.
    - testing.
    - staging.
    - production.
    
    Namespaces help organize workloads and apply access controls, quotas and policies.
    
    RBAC:
    Role-Based Access Control manages who can perform which actions.
    
    IMPORTANT RBAC OBJECTS:
    
    Role:
    Defines permissions within a namespace.
    
    ClusterRole:
    Defines permissions at cluster scope or reusable permissions.
    
    RoleBinding:
    Grants a Role or ClusterRole to a subject within a namespace.
    
    ClusterRoleBinding:
    Grants permissions at cluster scope.
    
    ServiceAccount:
    An identity used by workloads running inside the cluster.
    
    COMMON RBAC VERBS:
    
    get:
    Read a single resource or resource details.
    
    list:
    List resources.
    
    watch:
    Watch resource changes.
    
    create:
    Create resources.
    
    update:
    Update resources.
    
    patch:
    Partially modify resources.
    
    delete:
    Delete resources.
    
    IMPORTANT SECURITY PRINCIPLE:
    Grant the minimum permissions required. Avoid using cluster-admin for ordinary application operations.
          `,
          steps: [
            "Identify the user or ServiceAccount.",
            "Identify the namespace and resource.",
            "Determine the required action.",
            "Inspect existing Roles and Bindings.",
            "Use kubectl auth can-i to test permissions.",
            "Grant only the required access.",
            "Verify the action using the intended identity."
          ],
          commands: `
    kubectl get namespaces
    
    kubectl get roles -A
    
    kubectl get rolebindings -A
    
    kubectl get clusterroles
    
    kubectl get clusterrolebindings
    
    kubectl auth can-i get pods -n production
    
    kubectl auth can-i create deployments -n production
          `,
          config: `
    apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
      name: pod-reader
      namespace: production
    rules:
      - apiGroups: [""]
        resources: ["pods"]
        verbs: ["get", "list", "watch"]
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: RoleBinding
    metadata:
      name: pod-reader-binding
      namespace: production
    subjects:
      - kind: ServiceAccount
        name: monitoring
        namespace: production
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: Role
      name: pod-reader
          `,
          problems: [
            {
              issue: "User receives Forbidden when accessing a resource.",
              rootCause:
                "The user may be authenticated but does not have the required RBAC permission.",
              solution:
                "Check the identity and use kubectl auth can-i. Grant the minimum required permission through the appropriate RoleBinding or ClusterRoleBinding."
            },
            {
              issue: "Application cannot access Kubernetes API resources.",
              rootCause:
                "The Pod's ServiceAccount may lack the required RBAC permissions or may not be the intended identity.",
              solution:
                "Inspect the Pod ServiceAccount and its RoleBindings. Grant only the required API permissions."
            }
          ]
        },
    {
          heading: "17. Kubernetes Security – SecurityContext, Pod Security and Image Policies",
          explanation: `
    Kubernetes security protects cluster resources, workloads and application data.
    
    IMPORTANT SECURITY CONTROLS:
    
    runAsNonRoot:
    Requires a non-root process where applicable.
    
    runAsUser:
    Sets the process user ID.
    
    runAsGroup:
    Sets the primary group ID.
    
    readOnlyRootFilesystem:
    Makes the container root filesystem read-only.
    
    allowPrivilegeEscalation:
    Controls whether a process can gain additional privileges.
    
    capabilities:
    Controls Linux capabilities.
    
    seccomp:
    Applies system-call restrictions.
    
    serviceAccountName:
    Selects the ServiceAccount used by a Pod.
    
    imagePullSecrets:
    Provides registry credentials through Kubernetes Secret references.
    
    POD SECURITY STANDARDS:
    Kubernetes defines security profiles such as:
    - Privileged.
    - Baseline.
    - Restricted.
    
    A namespace can enforce an appropriate Pod Security Admission policy.
    
    IMPORTANT:
    Security configuration can break an application if it depends on root privileges or writable filesystem paths. Identify the exact requirement and provide the minimum safe permission.
          `,
          steps: [
            "Review image provenance and vulnerability status.",
            "Run workloads as non-root where possible.",
            "Set an appropriate ServiceAccount.",
            "Restrict Linux capabilities.",
            "Use read-only filesystems where practical.",
            "Configure resource and network restrictions.",
            "Protect Secrets and API credentials.",
            "Verify the workload still functions under the restricted configuration."
          ],
          commands: `
    kubectl get pods -n production
    
    kubectl get serviceaccounts -n production
    
    kubectl describe pod <pod-name> -n production
    
    kubectl get pod <pod-name> -n production -o yaml
    
    kubectl auth can-i --list -n production
          `,
          config: `
    apiVersion: v1
    kind: Pod
    metadata:
      name: secure-app
    spec:
      serviceAccountName: app-service-account
      securityContext:
        runAsNonRoot: true
        runAsUser: 10001
        runAsGroup: 10001
      containers:
        - name: app
          image: my-app:v1
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities:
              drop:
                - ALL
          volumeMounts:
            - name: tmp
              mountPath: /tmp
      volumes:
        - name: tmp
          emptyDir: {}
          `,
          problems: [
            {
              issue: "Pod fails after enabling runAsNonRoot.",
              rootCause:
                "The image may require root or may not have a suitable non-root user configuration.",
              solution:
                "Build the image to support a non-root user and provide appropriate ownership for writable paths."
            },
            {
              issue: "Container cannot write after enabling readOnlyRootFilesystem.",
              rootCause:
                "The application writes temporary files or runtime data into the container root filesystem.",
              solution:
                "Mount dedicated writable volumes or emptyDir paths only where required."
            }
          ]
        }
  ]
};

export default data;
