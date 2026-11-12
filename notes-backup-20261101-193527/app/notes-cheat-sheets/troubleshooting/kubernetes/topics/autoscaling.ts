import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Resource Management and Autoscaling",
  description: "Detailed Kubernetes notes covering resource management and autoscaling, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "15. Resource Quotas, LimitRanges and Autoscaling",
          explanation: `
    Kubernetes provides resource management at different levels.
    
    RESOURCE REQUESTS:
    Used by the scheduler to decide whether a Pod can fit on a node.
    
    RESOURCE LIMITS:
    Restrict resource usage for containers.
    
    RESOURCEQUOTA:
    Limits aggregate resource consumption within a namespace.
    
    LIMITRANGE:
    Defines default or maximum/minimum resource constraints for resources in a namespace.
    
    HORIZONTAL POD AUTOSCALER (HPA):
    Adjusts the number of Pod replicas based on configured metrics.
    
    VERTICAL POD AUTOSCALER (VPA):
    Can recommend or adjust resource requests based on observed usage, depending on its configuration and operating mode.
    
    CLUSTER AUTOSCALER:
    Can add or remove cluster nodes in supported environments when capacity requirements change.
    
    IMPORTANT:
    HPA requires suitable metrics. CPU-based scaling commonly depends on resource requests because utilization is calculated relative to them.
    
    Autoscaling does not fix inefficient application code or an unavailable dependency.
          `,
          steps: [
            "Inspect current resource requests and limits.",
            "Check namespace quota usage.",
            "Check LimitRange configuration.",
            "Check HPA status and current metrics.",
            "Verify metrics pipeline availability.",
            "Check node capacity and cluster autoscaling behavior.",
            "Tune requests and scaling thresholds using measured workloads."
          ],
          commands: `
    kubectl get resourcequota -A
    
    kubectl describe resourcequota <quota-name> -n <namespace>
    
    kubectl get limitrange -A
    
    kubectl describe limitrange <name> -n <namespace>
    
    kubectl get hpa -A
    
    kubectl describe hpa <hpa-name> -n <namespace>
    
    kubectl top pods -A
    
    kubectl top nodes
          `,
          config: `
    apiVersion: autoscaling/v2
    kind: HorizontalPodAutoscaler
    metadata:
      name: api-hpa
    spec:
      scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: api
      minReplicas: 2
      maxReplicas: 10
      metrics:
        - type: Resource
          resource:
            name: cpu
            target:
              type: Utilization
              averageUtilization: 70
          `,
          problems: [
            {
              issue: "HPA does not scale Pods.",
              rootCause:
                "Metrics may be unavailable, CPU requests may be missing or the scaling target may be incorrect.",
              solution:
                "Inspect HPA events and current metrics. Verify the metrics pipeline, resource requests and scaleTargetRef."
            },
            {
              issue: "Pod creation fails due to ResourceQuota.",
              rootCause:
                "The namespace has reached a configured resource or object-count quota.",
              solution:
                "Inspect quota usage and request capacity changes through the approved process. Right-size workloads where appropriate."
            }
          ]
        }
  ]
};

export default data;
