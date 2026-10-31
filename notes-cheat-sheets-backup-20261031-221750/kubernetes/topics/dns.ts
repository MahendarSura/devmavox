import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Kubernetes DNS",
  description: "Detailed Kubernetes notes covering kubernetes dns, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "08. Kubernetes DNS – CoreDNS and Service Name Resolution",
          explanation: `
    Kubernetes provides DNS-based service discovery.
    
    Applications can access Services using DNS names rather than hardcoded Pod IP addresses.
    
    Example:
    database.production.svc.cluster.local
    
    For a Service in the same namespace, the short name may be sufficient:
    
    database
    
    CORE DNS:
    CoreDNS is commonly used to provide DNS services inside Kubernetes clusters.
    
    COMMON DNS ISSUES:
    
    - CoreDNS Pods are not running.
    - CoreDNS cannot reach the Kubernetes API.
    - Pod DNS configuration is incorrect.
    - Network policies block DNS traffic.
    - Incorrect Service name.
    - Incorrect namespace.
    - Upstream DNS problems.
    
    TROUBLESHOOTING:
    First determine whether the failure is specific to one Pod, one namespace or the entire cluster.
    
    If every Pod has DNS problems, investigate cluster DNS and networking.
    
    If only one application fails, inspect its DNS settings and the hostname it uses.
          `,
          steps: [
            "Check CoreDNS Pods.",
            "Check the kube-system namespace events.",
            "Inspect CoreDNS logs.",
            "Run a DNS lookup from an affected Pod.",
            "Verify the Service name and namespace.",
            "Check network policy rules for DNS traffic.",
            "Verify external DNS forwarding if external names fail."
          ],
          commands: `
    kubectl get pods -n kube-system -l k8s-app=kube-dns
    
    kubectl get services -n kube-system
    
    kubectl logs -n kube-system deployment/coredns
    
    kubectl get configmap coredns -n kube-system
    
    kubectl exec -it <pod-name> -- nslookup kubernetes.default
    
    kubectl exec -it <pod-name> -- cat /etc/resolv.conf
          `,
          problems: [
            {
              issue: "Temporary failure in name resolution.",
              rootCause:
                "DNS service may be unavailable, blocked or incorrectly configured.",
              solution:
                "Check CoreDNS health, DNS traffic permissions, Pod resolver configuration and the CNI network."
            },
            {
              issue: "Service name does not resolve.",
              rootCause:
                "The application may use the wrong Service name or namespace.",
              solution:
                "Verify the Service exists and use the correct service DNS name."
            }
          ]
        },
    {
          heading: "26. Production Incident – CoreDNS and Cluster DNS Failure",
          explanation: `
    SCENARIO:
    
    Applications cannot resolve Kubernetes Service names.
    
    Example error:
    Temporary failure in name resolution.
    
    IMPACT:
    
    Backend services cannot connect to databases or internal APIs using service DNS names.
    
    INVESTIGATION:
    
    1. Check CoreDNS Pod status.
    2. Check CoreDNS logs.
    3. Check the kube-dns Service.
    4. Test DNS from an affected Pod.
    5. Inspect /etc/resolv.conf.
    6. Check DNS network policy.
    7. Check CNI and node networking.
    
    If all namespaces are affected, investigate cluster DNS and network infrastructure.
    
    If only one Pod is affected, check its Pod configuration, DNS policy and local network restrictions.
          `,
          steps: [
            "Check CoreDNS Pods.",
            "Check kube-dns Service.",
            "Read CoreDNS logs.",
            "Run nslookup from an affected Pod.",
            "Inspect Pod DNS configuration.",
            "Check network policies and CNI health.",
            "Verify internal and external name resolution."
          ],
          commands: `
    kubectl get pods -n kube-system -l k8s-app=kube-dns
    
    kubectl get svc kube-dns -n kube-system
    
    kubectl logs -n kube-system deployment/coredns
    
    kubectl get configmap coredns -n kube-system
    
    kubectl exec -it <pod-name> -- nslookup kubernetes.default
    
    kubectl exec -it <pod-name> -- cat /etc/resolv.conf
          `,
          problems: [
            {
              issue: "CoreDNS Pods are CrashLoopBackOff.",
              rootCause:
                "CoreDNS configuration, permissions, API connectivity or resource constraints may be causing startup failure.",
              solution:
                "Inspect CoreDNS logs and events, validate the Corefile and investigate API connectivity and resources."
            }
          ]
        }
  ]
};

export default data;
