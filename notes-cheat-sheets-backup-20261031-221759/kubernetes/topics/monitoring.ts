import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Monitoring and Logging",
  description: "Detailed Kubernetes notes covering monitoring and logging, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "18. Kubernetes Monitoring and Logging – Metrics, Events and Application Logs",
          explanation: `
    Monitoring helps engineers understand cluster and application health.
    
    IMPORTANT SIGNALS:
    
    CPU:
    Shows processor usage and possible throttling.
    
    Memory:
    Shows memory usage and possible OOM conditions.
    
    Pod restarts:
    Can indicate application crashes, failed probes or resource issues.
    
    Node readiness:
    Shows whether nodes are healthy from Kubernetes' perspective.
    
    API latency:
    Shows how quickly application requests are served.
    
    Error rate:
    Shows how frequently requests fail.
    
    Logs:
    Provide application and component-level diagnostic information.
    
    Events:
    Show Kubernetes resource lifecycle and warning messages.
    
    METRICS SERVER:
    Provides resource metrics commonly used by kubectl top and HPA resource metrics.
    
    PROMETHEUS:
    Commonly used for collecting and querying metrics.
    
    GRAFANA:
    Commonly used for dashboards and visualizing metrics.
    
    CENTRALIZED LOGGING:
    Systems such as Loki or Elasticsearch-based solutions can collect logs from multiple workloads.
    
    IMPORTANT:
    Metrics, logs and events answer different questions. Use them together to build an incident timeline.
          `,
          steps: [
            "Identify the affected application and time window.",
            "Check Pod and node status.",
            "Check resource usage.",
            "Read application logs.",
            "Inspect Kubernetes events.",
            "Compare metrics before and during the incident.",
            "Correlate application errors with deployments and infrastructure changes.",
            "Add alerts for repeated or high-impact failures."
          ],
          commands: `
    kubectl top nodes
    
    kubectl top pods -A
    
    kubectl get events -A --sort-by=.lastTimestamp
    
    kubectl logs <pod-name> -n <namespace>
    
    kubectl logs <pod-name> -n <namespace> --previous
    
    kubectl describe node <node-name>
    
    kubectl get pods -A -o wide
          `,
          problems: [
            {
              issue: "kubectl top returns metrics unavailable.",
              rootCause:
                "Metrics Server may be missing, unhealthy or unable to collect node metrics.",
              solution:
                "Inspect Metrics Server Pods and logs, check its APIService and resolve node metrics connectivity."
            },
            {
              issue: "Application logs disappear after Pod replacement.",
              rootCause:
                "Logs may exist only in the container's local runtime storage and are not being collected centrally.",
              solution:
                "Configure a cluster-level log collection system with appropriate retention and access controls."
            }
          ]
        }
  ]
};

export default data;
