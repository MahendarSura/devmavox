import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Kubernetes Networking",
  description: "Detailed Kubernetes notes covering kubernetes networking, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "07. Kubernetes Networking – Pod IP, CNI and NetworkPolicy",
          explanation: `
    Kubernetes networking provides communication between Pods and Services.
    
    Important networking concepts:
    
    POD NETWORK:
    Each Pod receives an IP address through the cluster networking implementation.
    
    CNI:
    Container Network Interface plugins provide network configuration for Pods.
    
    SERVICE NETWORK:
    Services provide stable virtual access to selected backend Pods.
    
    CLUSTER DNS:
    Provides name resolution for Services and other cluster resources.
    
    NETWORK POLICY:
    Controls permitted network traffic when supported and enforced by the installed network plugin.
    
    COMMON NETWORKING FLOW:
    
    Client Pod
       |
       v
    Kubernetes Service
       |
       v
    Selected backend Pod
       |
       v
    Application container
    
    COMMON NETWORKING ISSUES:
    
    1. Pod cannot reach another Pod.
    2. Service has no endpoints.
    3. DNS lookup fails.
    4. NetworkPolicy blocks traffic.
    5. CNI plugin has failed.
    6. Application listens only on localhost.
    7. Firewall or routing rules block traffic.
    
    IMPORTANT:
    A NetworkPolicy resource has no effect unless the cluster network implementation supports and enforces it.
    
    Use the actual cluster CNI documentation when diagnosing plugin-specific behavior.
          `,
          steps: [
            "Check Pod IP addresses.",
            "Check whether the source and destination Pods are healthy.",
            "Inspect the Service and EndpointSlices.",
            "Test DNS resolution.",
            "Test TCP connectivity.",
            "Inspect NetworkPolicies.",
            "Investigate CNI and node networking if Pod-level connectivity fails."
          ],
          commands: `
    kubectl get pods -o wide -A
    
    kubectl get services -A
    
    kubectl get endpointslices -A
    
    kubectl get networkpolicies -A
    
    kubectl describe networkpolicy <policy-name> -n <namespace>
    
    kubectl exec -it <pod-name> -- sh
          `,
          config: `
    apiVersion: networking.k8s.io/v1
    kind: NetworkPolicy
    metadata:
      name: allow-api-from-frontend
      namespace: production
    spec:
      podSelector:
        matchLabels:
          app: api
      policyTypes:
        - Ingress
      ingress:
        - from:
            - podSelector:
                matchLabels:
                  app: frontend
          ports:
            - protocol: TCP
              port: 8080
          `,
          problems: [
            {
              issue: "One Pod cannot connect to another Pod.",
              rootCause:
                "The application may not be listening, the destination Pod may be unhealthy, or CNI and network policy rules may block traffic.",
              solution:
                "Check Pod IPs, application listening address, NetworkPolicies and CNI health."
            },
            {
              issue: "NetworkPolicy blocks application traffic.",
              rootCause:
                "The policy may select the destination Pod but fail to allow the intended source or port.",
              solution:
                "Inspect policy selectors and allowed traffic. Add only the required ingress or egress rule."
            }
          ]
        }
  ]
};

export default data;
