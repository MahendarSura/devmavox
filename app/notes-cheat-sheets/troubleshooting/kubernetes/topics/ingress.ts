import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Ingress",
  description: "Detailed Kubernetes notes covering ingress, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "09. Ingress – HTTP Routing and Ingress Controller",
          explanation: `
    Ingress manages HTTP and HTTPS routing rules for services inside a Kubernetes cluster.
    
    An Ingress resource describes routing rules.
    
    An Ingress Controller implements those rules.
    
    IMPORTANT:
    Creating an Ingress resource alone does not make traffic work. A compatible Ingress Controller must be installed and configured.
    
    COMMON INGRESS CONCEPTS:
    
    Host:
    The DNS hostname used for routing.
    
    Path:
    The URL path used to select a backend.
    
    Backend:
    The Service receiving the traffic.
    
    TLS:
    Configuration for HTTPS termination.
    
    Ingress Controller:
    The software that watches Ingress resources and configures routing.
    
    COMMON ERRORS:
    
    404:
    The requested host or path may not match a configured route, or the application may return its own 404.
    
    502:
    The proxy may be unable to obtain a valid response from the backend.
    
    503:
    The backend may be unavailable or have no usable endpoints.
    
    TLS errors:
    The certificate may be missing, expired or incorrectly configured.
    
    Always determine whether an error originates from the Ingress Controller or the backend application.
          `,
          steps: [
            "Check that the Ingress Controller is running.",
            "Inspect the Ingress resource.",
            "Verify host and path rules.",
            "Verify backend Service name and port.",
            "Check Service EndpointSlices.",
            "Inspect Ingress Controller logs.",
            "Check DNS and TLS configuration.",
            "Test the route from inside and outside the cluster."
          ],
          commands: `
    kubectl get ingress -A
    
    kubectl describe ingress <ingress-name> -n <namespace>
    
    kubectl get pods -A
    
    kubectl get services -A
    
    kubectl get endpointslices -A
    
    kubectl logs <ingress-controller-pod> -n <controller-namespace>
          `,
          config: `
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: api-ingress
    spec:
      ingressClassName: nginx
      rules:
        - host: api.example.com
          http:
            paths:
              - path: /
                pathType: Prefix
                backend:
                  service:
                    name: api
                    port:
                      number: 80
          `,
          problems: [
            {
              issue: "Ingress returns 404.",
              rootCause:
                "The host or path may not match the configured rule, the Ingress class may be incorrect or the backend application may return its own 404.",
              solution:
                "Inspect the route, controller logs and backend response. Verify host, path, IngressClass and Service configuration."
            },
            {
              issue: "Ingress returns 502.",
              rootCause:
                "The controller may be unable to connect to the backend or receive a valid response.",
              solution:
                "Check Service endpoints, target port, application readiness and backend logs."
            },
            {
              issue: "Ingress returns 503.",
              rootCause:
                "The controller may have no available backend endpoints or the backend service may be unavailable.",
              solution:
                "Inspect EndpointSlices and Pod readiness. Restore healthy backend replicas."
            }
          ]
        }
  ]
};

export default data;
