import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Production Deployment and Incidents",
  description: "Detailed Kubernetes notes covering production deployment and incidents, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "20. Production Deployment Workflow – CI/CD to Kubernetes",
          explanation: `
    A common production workflow:
    
    1. Developer pushes code to Git.
    2. CI pipeline starts.
    3. Tests and code checks run.
    4. Docker image is built.
    5. Image is scanned.
    6. Image is pushed to a container registry.
    7. Deployment pipeline updates Kubernetes manifests or Helm values.
    8. Kubernetes Deployment creates a new ReplicaSet.
    9. Scheduler assigns Pods to nodes.
    10. Kubelet starts containers.
    11. Readiness checks determine when Pods can receive traffic.
    12. Monitoring verifies application behavior.
    
    IMPORTANT RELEASE PRACTICES:
    
    - Use immutable image versions or digests.
    - Keep deployment manifests in version control.
    - Review configuration changes.
    - Use separate configuration for environments.
    - Protect production credentials.
    - Use readiness and startup probes.
    - Configure resource requests and limits.
    - Use a safe rollout strategy.
    - Monitor after deployment.
    - Maintain a tested rollback process.
    
    Kubernetes can manage the desired state of resources, but it cannot guarantee that a new application release is logically correct.
          `,
          steps: [
            "Commit application changes.",
            "Run tests and quality checks.",
            "Build and scan the container image.",
            "Push the approved image to the registry.",
            "Update the Deployment image or Helm values.",
            "Apply the approved configuration.",
            "Monitor rollout status.",
            "Verify Pods, Services and application endpoints.",
            "Monitor errors and latency.",
            "Rollback if the new release causes unacceptable impact."
          ],
          commands: `
    kubectl apply -f deployment.yaml
    
    kubectl get deployments -n production
    
    kubectl rollout status deployment/api -n production
    
    kubectl get pods -n production -o wide
    
    kubectl get services -n production
    
    kubectl logs deployment/api -n production
    
    kubectl rollout undo deployment/api -n production
          `,
          problems: [
            {
              issue: "New deployment causes production downtime.",
              rootCause:
                "Readiness checks, rollout settings, capacity or application compatibility may be incorrect.",
              solution:
                "Stop further rollout, inspect unavailable replicas and application errors, then roll back or apply the verified fix."
            },
            {
              issue: "New image is deployed but old application behavior remains.",
              rootCause:
                "The Deployment may still reference an old image, a mutable tag may resolve unexpectedly or the rollout may not have completed.",
              solution:
                "Inspect the Deployment's image reference, Pod image IDs and rollout status. Prefer immutable release tags or digests."
            }
          ]
        },
    {
          heading: "25. Production Incident – Node NotReady",
          explanation: `
    SCENARIO:
    
    A worker node changes to NotReady.
    
    Pods on that node may become unavailable or experience disruption.
    
    POSSIBLE CAUSES:
    
    - Kubelet stopped.
    - Container runtime failed.
    - Node memory pressure.
    - Node disk pressure.
    - Network connectivity failure.
    - API Server communication failure.
    - Node operating system problem.
    
    INVESTIGATION:
    
    1. Check node conditions.
    2. Describe the node.
    3. Inspect node events.
    4. Check kubelet service.
    5. Check container runtime.
    6. Check memory and disk.
    7. Check node network connectivity.
    
    IMPORTANT:
    Do not immediately delete all Pods on the node. Understand workload controllers, storage attachments and disruption requirements before recovery actions.
    
    Managed Kubernetes providers may restrict direct access to control-plane and worker components. Use provider-supported node diagnostics where applicable.
          `,
          steps: [
            "Identify the NotReady node.",
            "Describe node conditions.",
            "Inspect node events.",
            "Check kubelet status.",
            "Check container runtime status.",
            "Check memory, disk and filesystem.",
            "Investigate node network connectivity.",
            "Restore node health or follow the node replacement process.",
            "Verify affected workloads recover."
          ],
          commands: `
    kubectl get nodes -o wide
    
    kubectl describe node <node-name>
    
    kubectl get pods -A -o wide
    
    # Linux worker node
    sudo systemctl status kubelet
    
    sudo journalctl -u kubelet --since "30 minutes ago"
    
    sudo systemctl status containerd
    
    free -h
    
    df -h
          `,
          problems: [
            {
              issue: "Node condition shows Ready=False.",
              rootCause:
                "Kubelet may be unhealthy, the node may be disconnected or a critical node component may have failed.",
              solution:
                "Inspect node conditions and kubelet logs, restore runtime or network health and verify the node becomes Ready."
            },
            {
              issue: "Node shows DiskPressure.",
              rootCause:
                "Node storage is approaching configured pressure thresholds.",
              solution:
                "Identify filesystem usage, container image storage, logs and local data. Perform controlled cleanup and expand capacity if necessary."
            }
          ]
        },
    {
          heading: "28. Production Engineer RCA – Complete Incident Investigation Method",
          explanation: `
    A Kubernetes production engineer should not randomly restart Pods.
    
    Follow a repeatable incident investigation process.
    
    1. UNDERSTAND IMPACT:
    Which application is failing? How many users are affected? Is the issue total or partial?
    
    2. RECORD THE TIME:
    Record when the incident started and identify recent deployments or configuration changes.
    
    3. IDENTIFY THE FAILURE LAYER:
    - Cluster.
    - Node.
    - Pod.
    - Container.
    - Service.
    - DNS.
    - Ingress.
    - Storage.
    - Application dependency.
    
    4. COLLECT EVIDENCE:
    - Pod status.
    - Events.
    - Container logs.
    - Previous logs.
    - Node conditions.
    - Resource usage.
    - Service endpoints.
    - Network policies.
    - Deployment history.
    
    5. FORM A HYPOTHESIS:
    Use actual error messages and evidence.
    
    6. TEST THE HYPOTHESIS:
    Use safe, targeted commands.
    
    7. RECOVER:
    Apply the approved fix or rollback.
    
    8. VERIFY:
    Check readiness, traffic, error rate and business functionality.
    
    9. PREVENT:
    Improve monitoring, configuration validation, deployment testing and recovery procedures.
    
    10. DOCUMENT:
    Record impact, timeline, root cause, recovery and preventive action.
    
    IMPORTANT:
    A Pod being Running does not prove the application is healthy.
    A Deployment being Available does not prove every business workflow is working.
    A successful rollout does not prove the release is free of bugs.
          `,
          steps: [
            "Confirm incident impact and severity.",
            "Record incident start time.",
            "Check cluster and node status.",
            "Identify affected resources.",
            "Collect events, logs and resource metrics.",
            "Compare the current release with the last known-good release.",
            "Test the suspected root cause.",
            "Apply the smallest safe fix or rollback.",
            "Verify application and business functionality.",
            "Document the incident and prevention actions."
          ],
          commands: `
    kubectl config current-context
    
    kubectl get nodes
    
    kubectl get pods -A -o wide
    
    kubectl get deployments -A
    
    kubectl get services -A
    
    kubectl get events -A --sort-by=.lastTimestamp
    
    kubectl logs <pod-name> -n <namespace> --previous
    
    kubectl describe pod <pod-name> -n <namespace>
    
    kubectl top nodes
    
    kubectl top pods -A
    
    kubectl get endpointslices -A
          `,
          problems: [
            {
              issue: "Engineer repeatedly deletes and recreates failing Pods.",
              rootCause:
                "The actual application, configuration, storage or infrastructure problem is not being investigated.",
              solution:
                "Collect evidence first, identify the root cause and correct the controller-managed workload configuration."
            },
            {
              issue: "Incident returns after recovery.",
              rootCause:
                "The immediate symptom was removed, but the underlying failure condition remains.",
              solution:
                "Complete root-cause analysis and add preventive controls such as alerts, tests, resource tuning or configuration validation."
            }
          ]
        }
  ]
};

export default data;
