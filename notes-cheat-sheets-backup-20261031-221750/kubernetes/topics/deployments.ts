import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Deployments",
  description: "Detailed Kubernetes notes covering deployments, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "05. Deployments and ReplicaSets – Scaling and Rollouts",
          explanation: `
    A Deployment manages stateless application Pods through ReplicaSets.
    
    Instead of creating individual Pods manually, engineers define the desired number of replicas.
    
    Example:
    replicas: 3
    
    Kubernetes attempts to maintain three matching Pods.
    
    REPLICASET:
    Maintains the requested number of matching Pods.
    
    DEPLOYMENT:
    Manages ReplicaSets and provides declarative updates and rollback capabilities.
    
    DEPLOYMENT STRATEGIES:
    
    RollingUpdate:
    Gradually replaces old Pods with new Pods.
    
    Recreate:
    Terminates existing Pods before creating new ones.
    
    IMPORTANT ROLLING UPDATE SETTINGS:
    
    maxSurge:
    Maximum additional Pods allowed above the desired replica count during an update.
    
    maxUnavailable:
    Maximum number of Pods allowed to be unavailable during an update.
    
    READINESS:
    A Pod should be ready before it receives normal Service traffic.
    
    ROLLOUT COMMANDS:
    
    rollout status:
    Checks update progress.
    
    rollout history:
    Displays rollout history.
    
    rollout undo:
    Rolls back to a previous revision where available.
    
    scale:
    Changes the desired replica count.
    
    IMPORTANT:
    A successful rollout does not guarantee every business workflow works. Perform application-level smoke tests.
          `,
          steps: [
            "Create a Deployment with the correct image and replicas.",
            "Verify Pod creation.",
            "Check readiness and availability.",
            "Update the image or configuration.",
            "Monitor rollout progress.",
            "Investigate unavailable replicas or failed updates.",
            "Roll back if the new version is unsafe.",
            "Verify the application after rollout."
          ],
          commands: `
    kubectl get deployments
    
    kubectl describe deployment api
    
    kubectl get replicasets
    
    kubectl scale deployment api --replicas=5
    
    kubectl set image deployment/api api=my-api:v2
    
    kubectl rollout status deployment/api
    
    kubectl rollout history deployment/api
    
    kubectl rollout undo deployment/api
          `,
          config: `
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: api
    spec:
      replicas: 3
      strategy:
        type: RollingUpdate
        rollingUpdate:
          maxSurge: 1
          maxUnavailable: 0
      selector:
        matchLabels:
          app: api
      template:
        metadata:
          labels:
            app: api
        spec:
          containers:
            - name: api
              image: nginx:1.27
              ports:
                - containerPort: 80
              readinessProbe:
                httpGet:
                  path: /
                  port: 80
                initialDelaySeconds: 5
                periodSeconds: 10
          `,
          problems: [
            {
              issue: "Deployment rollout is stuck.",
              rootCause:
                "New Pods may fail to start, fail readiness checks, lack resources or be unable to pull the required image.",
              solution:
                "Check rollout status, Deployment conditions, ReplicaSets, Pod events and logs. Correct the failure or roll back."
            },
            {
              issue: "Deployment has fewer available replicas than expected.",
              rootCause:
                "Pods may be Pending, crashing, unready or unable to schedule.",
              solution:
                "Inspect all matching Pods and their events. Fix resource, image, application or scheduling issues."
            },
            {
              issue: "New version causes application errors.",
              rootCause:
                "The release may contain a regression or incompatible configuration.",
              solution:
                "Stop further rollout, verify the impact and roll back to a known-good revision when appropriate."
            }
          ]
        }
  ]
};

export default data;
