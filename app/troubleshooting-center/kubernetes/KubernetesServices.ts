const KubernetesServicesGuide = {
  id: "kubernetes-kubernetesservices",
  title: "Kubernetes Services Troubleshooting",
  category: "Kubernetes",
  severity: "High",
  description:
    "Diagnose Kubernetes Services that cannot reach Pods, expose the wrong endpoints, or fail to route application traffic.",

  overview: {
    purpose:
      "A Kubernetes Service provides a stable network endpoint for a group of Pods. It selects Pods using labels and routes traffic to eligible endpoints.",
    affectedComponents: [
      "Service",
      "Pod labels and selectors",
      "EndpointSlices",
      "CoreDNS",
      "kube-proxy or the cluster networking dataplane",
      "NetworkPolicy",
      "Ingress or LoadBalancer, when applicable"
    ]
  },

  symptoms: [
    "Requests to a ClusterIP Service time out or get connection refused.",
    "The Service has no endpoints or EndpointSlices.",
    "The application works when accessed directly through a Pod but not through its Service.",
    "DNS resolution fails for the Service name.",
    "A NodePort or LoadBalancer Service is unreachable externally.",
    "Only some requests fail because selected Pods are unhealthy."
  ],

  diagnosticCommands: [
    {
      command: "kubectl get svc -n <namespace>",
      purpose: "Check Service type, ClusterIP, ports, and current configuration."
    },
    {
      command: "kubectl describe svc <service-name> -n <namespace>",
      purpose: "Inspect selectors, ports, events, and Service configuration."
    },
    {
      command: "kubectl get pods -n <namespace> --show-labels",
      purpose: "Compare Pod labels with the Service selector."
    },
    {
      command: "kubectl get endpoints <service-name> -n <namespace>",
      purpose: "Check whether the Service has backend addresses."
    },
    {
      command: "kubectl get endpointslices -n <namespace>",
      purpose: "Inspect EndpointSlice resources and backend readiness."
    },
    {
      command: "kubectl get networkpolicy -n <namespace>",
      purpose: "Check whether network policies could block traffic."
    },
    {
      command: "kubectl get svc <service-name> -n <namespace> -o yaml",
      purpose: "Review the complete Service specification."
    }
  ],

  rootCauses: [
    {
      cause: "Incorrect Service selector",
      explanation:
        "The Service selector does not match the labels on the intended Pods, leaving the Service without usable endpoints.",
      fix:
        "Compare spec.selector in the Service with metadata.labels on the Pods and correct the mismatch."
    },
    {
      cause: "Incorrect targetPort",
      explanation:
        "The Service forwards traffic to a port where the application is not listening.",
      fix:
        "Verify the container listening port and set targetPort to the correct numeric port or named container port."
    },
    {
      cause: "Pods are not ready",
      explanation:
        "Readiness probes fail or Pods are unhealthy, so they may not be eligible to receive normal Service traffic.",
      fix:
        "Inspect Pod status, readiness probes, container logs, and application health."
    },
    {
      cause: "NetworkPolicy blocks traffic",
      explanation:
        "Ingress or egress policies may prevent clients from reaching the backend Pods.",
      fix:
        "Review applicable NetworkPolicies and allow only the required traffic from approved sources."
    },
    {
      cause: "Cluster networking or DNS problem",
      explanation:
        "The Service may have valid endpoints, but DNS, routing, kube-proxy, or the CNI dataplane may be unhealthy.",
      fix:
        "Test direct Pod connectivity, Service IP connectivity, and DNS separately. Inspect cluster networking components."
    },
    {
      cause: "External Service configuration error",
      explanation:
        "NodePort, LoadBalancer, firewall, or cloud load balancer configuration may prevent external access.",
      fix:
        "Check Service type, assigned ports and addresses, load balancer health checks, firewall rules, and cloud networking."
    }
  ],

  troubleshootingWorkflow: [
    {
      step: "1. Inspect the Service",
      actions: [
        "Run kubectl get svc -n <namespace>.",
        "Confirm the Service name, type, port, targetPort, and selector.",
        "Describe the Service and review events."
      ],
      expectedResult:
        "The Service configuration matches the intended application and exposes the expected port."
    },
    {
      step: "2. Verify selector and endpoints",
      actions: [
        "Run kubectl get pods -n <namespace> --show-labels.",
        "Compare Pod labels with the Service selector.",
        "Inspect Endpoints and EndpointSlices."
      ],
      expectedResult:
        "The Service has the expected backend Pod IP addresses."
    },
    {
      step: "3. Check application health",
      actions: [
        "Inspect Pod readiness and restart counts.",
        "Review kubectl logs <pod-name> -n <namespace>.",
        "Verify the application listens on the configured targetPort."
      ],
      expectedResult:
        "Backend Pods are healthy, ready, and listening on the expected port."
    },
    {
      step: "4. Test connectivity",
      actions: [
        "Test the application locally inside a backend Pod.",
        "Test the Service ClusterIP and port from an authorized in-cluster client.",
        "Test the Service DNS name from the same client.",
        "If only external access fails, inspect Ingress, LoadBalancer, NodePort, and firewall configuration."
      ],
      expectedResult:
        "The failing network layer is identified without assuming every failure is caused by the Service itself."
    },
    {
      step: "5. Check network controls",
      actions: [
        "Inspect applicable NetworkPolicies.",
        "Check CNI and cluster networking health.",
        "Review kube-proxy or the networking dataplane if routing is failing."
      ],
      expectedResult:
        "Required traffic is allowed and the cluster networking components are healthy."
    }
  ],

  validation: [
    "Confirm the Service has the expected ready endpoints.",
    "Verify the application responds through the Service DNS name and port.",
    "Confirm external access if the Service is intended to be externally reachable.",
    "Check application logs and metrics for connection errors.",
    "Repeat the test after a Pod restart or rollout to verify recovery."
  ],

  prevention: [
    "Keep Service selectors and Pod labels consistent.",
    "Use readiness probes that reflect actual application health.",
    "Manage Services and workloads declaratively through version control.",
    "Monitor Service errors, endpoint availability, and application latency.",
    "Test NetworkPolicies and Service connectivity during deployment validation.",
    "Document required ports and distinguish port from targetPort."
  ],

  safetyNotes: [
    "Run diagnostic commands against the correct cluster and namespace.",
    "Avoid deleting production Services or restarting networking components as an initial troubleshooting step.",
    "Make changes through the team's approved deployment workflow and validate their impact."
  ]
};

export default KubernetesServicesGuide;
export { KubernetesServicesGuide };