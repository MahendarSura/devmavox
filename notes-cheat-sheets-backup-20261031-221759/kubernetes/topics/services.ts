import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Services",
  description: "Detailed Kubernetes notes covering services, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "06. Kubernetes Services – ClusterIP, NodePort and LoadBalancer",
          explanation: `
    A Kubernetes Service provides a stable network endpoint for accessing a changing set of Pods.
    
    Pods can be replaced and their IP addresses can change. A Service provides a stable way to reach matching Pods.
    
    SERVICE TYPES:
    
    ClusterIP:
    The default Service type. Exposes the Service inside the cluster.
    
    NodePort:
    Exposes the Service on a port on each node, subject to cluster networking configuration.
    
    LoadBalancer:
    Requests an external load balancer integration where supported.
    
    ExternalName:
    Maps a Service name to an external DNS name.
    
    SELECTOR:
    A Service uses label selectors to identify matching Pods.
    
    ENDPOINTS:
    The Service's backend endpoints show which Pods are selected and eligible for traffic.
    
    PORT FIELDS:
    
    port:
    The port exposed by the Service.
    
    targetPort:
    The port on the selected Pod.
    
    nodePort:
    The node-level port used by NodePort Services.
    
    IMPORTANT:
    containerPort in a Pod specification documents a container port. It does not itself publish that port outside the Pod.
    
    If the Service selector does not match Pod labels, the Service may have no backends.
          `,
          steps: [
            "Inspect the Service definition.",
            "Check the Service selector.",
            "Compare selector labels with Pod labels.",
            "Inspect EndpointSlices or endpoints.",
            "Verify port and targetPort.",
            "Test connectivity from another Pod.",
            "Check external load balancer integration if required."
          ],
          commands: `
    kubectl get services
    
    kubectl describe service api
    
    kubectl get endpoints api
    
    kubectl get endpointslices
    
    kubectl get pods --show-labels
    
    kubectl get service api -o yaml
          `,
          config: `
    apiVersion: v1
    kind: Service
    metadata:
      name: api
    spec:
      type: ClusterIP
      selector:
        app: api
      ports:
        - name: http
          port: 80
          targetPort: 8080
          protocol: TCP
          `,
          problems: [
            {
              issue: "Service is not reaching Pods.",
              rootCause:
                "The Service selector may not match Pod labels, or the selected Pods may not be ready.",
              solution:
                "Compare Service selectors with Pod labels, inspect EndpointSlices and verify Pod readiness."
            },
            {
              issue: "Service returns connection refused.",
              rootCause:
                "The targetPort may be incorrect or the application may not be listening on that port.",
              solution:
                "Verify the application listening port and Service targetPort. Test from inside the cluster."
            },
            {
              issue: "LoadBalancer Service remains pending.",
              rootCause:
                "The cluster environment may not have a supported cloud load balancer integration or required permissions.",
              solution:
                "Inspect Service events and cloud integration configuration. Verify the cluster's load balancer implementation."
            }
          ]
        },
    {
          heading: "24. Production Incident – Service Not Reaching Pods",
          explanation: `
    SCENARIO:
    
    The backend Pod is Running and Ready, but requests through the Kubernetes Service fail.
    
    COMMON ROOT CAUSES:
    
    - Service selector does not match Pod labels.
    - Service has no endpoints.
    - targetPort is wrong.
    - Application listens on a different port.
    - Application binds only to localhost.
    - NetworkPolicy blocks traffic.
    - Application is not ready.
    
    INVESTIGATION:
    
    1. Inspect Service YAML.
    2. Inspect Pod labels.
    3. Compare selector and labels.
    4. Inspect EndpointSlices.
    5. Check targetPort.
    6. Test connectivity directly from a diagnostic Pod.
    7. Inspect NetworkPolicies.
    
    EXAMPLE:
    
    Service selector:
    app: backend
    
    Pod label:
    app: api
    
    These do not match.
    
    The Service cannot select the Pod.
    
    FIX:
    
    Correct the selector or Pod labels using a controlled deployment change.
          `,
          steps: [
            "Check Service configuration.",
            "Check Pod labels.",
            "Compare selector and labels.",
            "Inspect EndpointSlices.",
            "Check application listening port.",
            "Test connectivity from another Pod.",
            "Inspect NetworkPolicies.",
            "Verify requests through the Service."
          ],
          commands: `
    kubectl get svc api -n production -o yaml
    
    kubectl get pods -n production --show-labels
    
    kubectl get endpointslices -n production
    
    kubectl describe svc api -n production
    
    kubectl get networkpolicies -n production
    
    kubectl get pods -n production -o wide
          `,
          problems: [
            {
              issue: "Service has no endpoints.",
              rootCause:
                "The Service selector does not match eligible Pods, or matching Pods are not ready.",
              solution:
                "Correct selector labels and readiness configuration. Confirm EndpointSlices contain the expected backend addresses."
            },
            {
              issue: "Service forwards to the wrong port.",
              rootCause:
                "Service targetPort does not match the application's actual listening port.",
              solution:
                "Verify the application port and update targetPort to the correct value."
            }
          ]
        }
  ]
};

export default data;
