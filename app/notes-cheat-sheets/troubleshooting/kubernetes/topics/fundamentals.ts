import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Kubernetes Fundamentals",
  description: "Detailed Kubernetes notes covering kubernetes fundamentals, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "01. Kubernetes Fundamentals – What is Kubernetes?",
          explanation: `
    Kubernetes is an open-source container orchestration platform.
    
    Docker helps us build and run containers.
    
    But imagine a company running 200 containers across 20 servers. Engineers must manage:
    
    - Container deployment.
    - Container failures.
    - Application scaling.
    - Network communication.
    - Load balancing.
    - Storage.
    - Application updates.
    - Rollbacks.
    - Resource allocation.
    - Service availability.
    
    Managing all these manually becomes difficult.
    
    Kubernetes automates many of these operations.
    
    IMPORTANT CONCEPTS:
    
    1. Cluster:
    A Kubernetes cluster is a group of machines managed together.
    
    2. Node:
    A node is a machine that runs Kubernetes workloads.
    
    3. Pod:
    A Pod is the smallest deployable unit in Kubernetes. It can contain one or more closely related containers.
    
    4. Deployment:
    A Deployment manages the desired number of application replicas and supports controlled application updates.
    
    5. ReplicaSet:
    A ReplicaSet maintains the required number of matching Pods.
    
    6. Service:
    A Service provides a stable network endpoint for accessing a group of Pods.
    
    7. Namespace:
    A Namespace logically separates resources inside a cluster.
    
    8. ConfigMap:
    Stores non-sensitive application configuration.
    
    9. Secret:
    Stores sensitive configuration data. Kubernetes Secrets require suitable encryption, access controls and secure handling.
    
    10. Ingress:
    Provides HTTP/HTTPS routing into cluster services through an Ingress controller.
    
    11. PersistentVolume:
    Represents storage available to the cluster.
    
    12. PersistentVolumeClaim:
    A request for storage by an application.
    
    REAL-TIME EXAMPLE:
    
    A company has an online shopping application.
    
    It contains:
    - Frontend.
    - Backend API.
    - Payment service.
    - Database.
    - Redis cache.
    
    Kubernetes can run these workloads, maintain their desired replicas, provide service discovery and help roll out new application versions.
    
    IMPORTANT:
    Kubernetes does not automatically fix every application problem. If application code is broken, Kubernetes may repeatedly restart the broken application.
          `,
          steps: [
            "Understand the application and its container images.",
            "Create Kubernetes Deployment definitions.",
            "Create Services for internal communication.",
            "Configure storage and application settings.",
            "Deploy resources to the cluster.",
            "Check Pod status and application logs.",
            "Verify service connectivity.",
            "Monitor the application after deployment."
          ],
          commands: `
    kubectl version --client
    
    kubectl cluster-info
    
    kubectl get nodes
    
    kubectl get namespaces
    
    kubectl get pods -A
    
    kubectl get deployments -A
    
    kubectl get services -A
          `,
          problems: [
            {
              issue: "Application works in Docker but fails in Kubernetes.",
              rootCause:
                "Kubernetes introduces additional configuration such as Pod networking, service discovery, probes, security contexts, scheduling and resource limits.",
              solution:
                "Inspect Pod events, container logs, Deployment configuration, Services, networking and resource settings separately."
            },
            {
              issue: "Kubernetes cluster is available but application is unavailable.",
              rootCause:
                "The control plane may be healthy while application Pods, Services or external routing are failing.",
              solution:
                "Check workload health, Service endpoints, DNS, Ingress and the application itself."
            }
          ]
        }
  ]
};

export default data;
