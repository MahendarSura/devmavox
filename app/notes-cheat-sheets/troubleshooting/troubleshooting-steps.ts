const data = {
  title: "Troubleshooting Steps",
  description: "Use a repeatable incident investigation process. Gather evidence, isolate the failure, test a safe fix and verify recovery before closing the incident.",
  sections: [
    {
      heading: "1. Standard Incident Investigation",
      explanation: "A disciplined troubleshooting process prevents random changes. First understand the impact, collect evidence and identify the last known good state.",
      steps: [
        "Record the symptom, affected service and start time.",
        "Check whether the incident affects one user, one service or the whole environment.",
        "Review recent deployments and configuration changes.",
        "Collect logs, events, metrics and relevant alerts.",
        "Form a root-cause hypothesis and test it safely.",
        "Apply the smallest appropriate corrective action.",
        "Verify service health and document the result."
      ],
      commands: "date\nkubectl get pods -A\nkubectl get events -A --sort-by=.metadata.creationTimestamp\nkubectl logs POD_NAME -n NAMESPACE\nkubectl top nodes\nkubectl top pods -A",
      config: "Incident record:\nIncident ID: INC-001\nService: web-application\nImpact: Users receive HTTP 503\nStart time: Record actual time\nRecent change: Record deployment or config change\nEvidence: Logs, metrics and events\nResolution: Record verified corrective action",
      problems: [
        { issue: "Team changes multiple settings without evidence.", solution: "Change one variable at a time where possible, record the change and compare the result." },
        { issue: "Incident closes before service is verified.", solution: "Check health endpoints, logs, error rates and user-facing functionality before declaring recovery." }
      ]
    },
    {
      heading: "2. Kubernetes Pod Troubleshooting Procedure",
      explanation: "Pod diagnosis should move from status to events, container logs, configuration and resource checks. This identifies whether the failure is caused by the cluster or the application.",
      steps: [
        "Run kubectl get pods and identify the affected Pod.",
        "Run kubectl describe pod to inspect events and conditions.",
        "Read current and previous container logs.",
        "Check image name, configuration references and probes.",
        "Check node capacity and scheduling constraints.",
        "Correct the cause and observe the new Pod state."
      ],
      commands: "kubectl get pods -n NAMESPACE -o wide\nkubectl describe pod POD_NAME -n NAMESPACE\nkubectl logs POD_NAME -n NAMESPACE\nkubectl logs POD_NAME -n NAMESPACE --previous\nkubectl get events -n NAMESPACE --sort-by=.metadata.creationTimestamp",
      config: "readinessProbe:\n  httpGet:\n    path: /health\n    port: 8080\n  initialDelaySeconds: 10\n  periodSeconds: 5\nlivenessProbe:\n  httpGet:\n    path: /health\n    port: 8080\n  initialDelaySeconds: 20\n  periodSeconds: 10",
      problems: [
        { issue: "Readiness probe fails.", solution: "Verify the health endpoint, port, startup time and application readiness behavior." },
        { issue: "Pod cannot be scheduled.", solution: "Inspect scheduling events, resource requests, node selectors, taints and tolerations." }
      ]
    },
    {
      heading: "3. Production Verification and Prevention",
      explanation: "After a fix, verify the application from the user's perspective and add preventive controls so the same failure is easier to detect or avoid.",
      steps: [
        "Confirm all required replicas are Ready.",
        "Check service endpoints and external access.",
        "Review error rate, latency and resource metrics.",
        "Confirm alerts have returned to a healthy state.",
        "Document the root cause and corrective action.",
        "Add tests, alerts or automation to prevent recurrence."
      ],
      commands: "kubectl rollout status deployment/myapp\nkubectl get pods -l app=myapp\nkubectl get endpoints myapp-service\ncurl -I https://YOUR-APPLICATION-HOST\nkubectl get events --sort-by=.metadata.creationTimestamp",
      config: "apiVersion: v1\nkind: Service\nmetadata:\n  name: myapp-service\nspec:\n  selector:\n    app: myapp\n  ports:\n    - port: 80\n      targetPort: 8080",
      problems: [
        { issue: "Pods are Ready but users still see errors.", solution: "Test the full request path, including Ingress, load balancer, application dependencies and database." },
        { issue: "The same incident repeats.", solution: "Create a permanent corrective action, add monitoring or tests, and track the action to completion." }
      ]
    }
  ]
};
export default data;
