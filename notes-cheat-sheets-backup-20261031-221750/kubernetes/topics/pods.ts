import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Pods and Pod Troubleshooting",
  description: "Detailed Kubernetes notes covering pods and pod troubleshooting, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "04. Pods – Creation, Lifecycle and Troubleshooting",
          explanation: `
    A Pod is the smallest deployable unit in Kubernetes.
    
    A Pod usually contains one application container, but it can contain multiple containers that need to share resources.
    
    Containers inside the same Pod share:
    - Network namespace.
    - Pod IP address.
    - Localhost networking.
    - Configured shared volumes.
    
    Each container in a Pod has its own container filesystem and process environment.
    
    POD LIFECYCLE:
    
    Pending:
    Pod has been accepted but is not fully running. It may be waiting for scheduling, image pulling or other setup.
    
    Running:
    At least one container is running or starting. This does not guarantee application readiness.
    
    Succeeded:
    All containers completed successfully.
    
    Failed:
    All containers terminated and at least one failed.
    
    Unknown:
    Kubernetes cannot determine the Pod state.
    
    COMMON POD ISSUES:
    
    CrashLoopBackOff:
    Container repeatedly exits and Kubernetes delays subsequent restart attempts.
    
    ImagePullBackOff:
    Image pull attempts are failing and Kubernetes is backing off before retrying.
    
    ErrImagePull:
    An image pull attempt failed.
    
    Pending:
    Pod has not been scheduled or is waiting for required resources.
    
    ContainerCreating:
    Container setup is still in progress or blocked.
    
    OOMKilled:
    A container process was killed due to an out-of-memory condition.
    
    CreateContainerConfigError:
    Container configuration could not be prepared, often because a referenced ConfigMap or Secret is missing or invalid.
    
    IMPORTANT:
    Pod names are not stable across Deployment replacements. Use labels and higher-level controllers to manage applications.
          `,
          steps: [
            "List Pods in the correct namespace.",
            "Check Pod status and node assignment.",
            "Describe the affected Pod.",
            "Read current and previous container logs.",
            "Inspect container exit codes and restart counts.",
            "Check referenced images, ConfigMaps, Secrets and volumes.",
            "Check resource requests and limits.",
            "Fix the root cause and verify the replacement Pod."
          ],
          commands: `
    kubectl get pods
    
    kubectl get pods -A
    
    kubectl get pods -o wide
    
    kubectl describe pod <pod-name> -n <namespace>
    
    kubectl logs <pod-name> -n <namespace>
    
    kubectl logs <pod-name> -n <namespace> --previous
    
    kubectl get pod <pod-name> -n <namespace> -o yaml
    
    kubectl get events -n <namespace> --sort-by=.lastTimestamp
          `,
          problems: [
            {
              issue: "Pod is in CrashLoopBackOff.",
              rootCause:
                "The application process repeatedly exits because of startup errors, invalid configuration, failed dependencies or resource problems.",
              solution:
                "Read current and previous logs, inspect exit status and events, then correct the application or configuration issue."
            },
            {
              issue: "Pod remains in ContainerCreating.",
              rootCause:
                "Image pulling, volume mounting, CNI setup or container runtime preparation may be blocked.",
              solution:
                "Inspect Pod events and node health. Investigate the exact FailedMount, image, sandbox or runtime error."
            },
            {
              issue: "Pod is in OOMKilled state.",
              rootCause:
                "The container exceeded its effective memory allowance or was killed during host memory pressure.",
              solution:
                "Inspect container limits, memory usage and application behavior. Fix leaks or excessive allocation and set appropriate resource limits."
            }
          ]
        },
    {
          heading: "13. Liveness, Readiness and Startup Probes",
          explanation: `
    Kubernetes probes check different aspects of application health.
    
    LIVENESS PROBE:
    Checks whether the container should be restarted because the application is unhealthy.
    
    READINESS PROBE:
    Checks whether the application is ready to receive normal Service traffic.
    
    STARTUP PROBE:
    Allows slow-starting applications time to initialize before liveness and readiness checks become active.
    
    IMPORTANT DIFFERENCE:
    
    Liveness failure:
    Can cause the container to be restarted.
    
    Readiness failure:
    Removes the Pod from normal Service traffic while it is not ready.
    
    Startup failure:
    After the configured failure threshold is reached, the container can be restarted.
    
    PROBE TYPES:
    
    HTTP GET:
    Requests an HTTP endpoint.
    
    TCP Socket:
    Checks whether a TCP connection can be established.
    
    Exec:
    Runs a command inside the container.
    
    gRPC:
    Checks a gRPC health endpoint when supported and configured.
    
    COMMON PROBE MISTAKES:
    
    - Wrong port.
    - Wrong path.
    - Health endpoint requires authentication.
    - Probe starts too early.
    - Timeout too short.
    - Application startup takes longer than expected.
    - Probe checks an external dependency unnecessarily.
    
    A liveness probe should not restart an application simply because a temporary external dependency is unavailable, unless that behavior is deliberately required.
          `,
          steps: [
            "Identify which probe is failing.",
            "Read Pod events.",
            "Check probe path, port and command.",
            "Test the health endpoint from inside the Pod.",
            "Measure actual application startup time.",
            "Adjust thresholds and timing based on evidence.",
            "Verify Pod readiness and restart behavior."
          ],
          commands: `
    kubectl describe pod <pod-name> -n <namespace>
    
    kubectl get pod <pod-name> -n <namespace> -o yaml
    
    kubectl logs <pod-name> -n <namespace>
    
    kubectl get events -n <namespace> --sort-by=.lastTimestamp
          `,
          config: `
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: api
    spec:
      replicas: 2
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
              image: my-api:v1
              ports:
                - containerPort: 8080
              startupProbe:
                httpGet:
                  path: /health
                  port: 8080
                periodSeconds: 5
                failureThreshold: 30
              readinessProbe:
                httpGet:
                  path: /ready
                  port: 8080
                periodSeconds: 10
                timeoutSeconds: 3
              livenessProbe:
                httpGet:
                  path: /health
                  port: 8080
                periodSeconds: 20
                timeoutSeconds: 3
          `,
          problems: [
            {
              issue: "Liveness probe keeps restarting the application.",
              rootCause:
                "The endpoint may fail during normal startup or temporary load, or the probe may use incorrect timing.",
              solution:
                "Inspect probe events and application startup time. Configure a startup probe when appropriate and correct liveness thresholds."
            },
            {
              issue: "Pod is Running but not Ready.",
              rootCause:
                "The readiness check is failing, so Kubernetes does not consider the Pod ready for normal Service traffic.",
              solution:
                "Check readiness endpoint, application dependencies and probe configuration. Fix the readiness condition."
            },
            {
              issue: "Application is killed before completing startup.",
              rootCause:
                "Liveness checks may start before the application has completed initialization.",
              solution:
                "Configure a startup probe with a suitable startup window."
            }
          ]
        },
    {
          heading: "21. Production Incident – CrashLoopBackOff",
          explanation: `
    SCENARIO:
    
    After a new release, the backend API Pod enters CrashLoopBackOff.
    
    USER IMPACT:
    
    API requests fail because the application does not stay running.
    
    INVESTIGATION:
    
    Step 1:
    Identify the affected Pod.
    
    Step 2:
    Describe the Pod and inspect events.
    
    Step 3:
    Read the current logs.
    
    Step 4:
    Read previous container logs because the container may have already restarted.
    
    Step 5:
    Inspect exit code and restart count.
    
    Step 6:
    Check ConfigMaps, Secrets, environment variables and dependency connectivity.
    
    Step 7:
    Check whether a liveness probe is terminating the process.
    
    EXAMPLE ROOT CAUSE:
    
    The new application version requires DATABASE_HOST, but the Deployment does not provide it.
    
    The application exits during startup.
    
    Kubernetes repeatedly restarts the container.
    
    FIX:
    
    Add the required configuration through the correct ConfigMap or Secret reference and perform a controlled rollout.
    
    VERIFICATION:
    
    - New Pod starts.
    - Restart count stops increasing.
    - Readiness probe succeeds.
    - API responds successfully.
    - Database connection works.
          `,
          steps: [
            "Check Pod status and restart count.",
            "Run kubectl describe pod.",
            "Read current and previous logs.",
            "Inspect the exit code.",
            "Check probes and environment configuration.",
            "Verify dependency connectivity.",
            "Fix the identified root cause.",
            "Monitor the replacement Pod.",
            "Verify the application endpoint."
          ],
          commands: `
    kubectl get pods -n production
    
    kubectl describe pod <pod-name> -n production
    
    kubectl logs <pod-name> -n production
    
    kubectl logs <pod-name> -n production --previous
    
    kubectl get pod <pod-name> -n production -o yaml
    
    kubectl get events -n production --sort-by=.lastTimestamp
    
    kubectl rollout status deployment/api -n production
          `,
          problems: [
            {
              issue: "Pod repeatedly enters CrashLoopBackOff.",
              rootCause:
                "The main process repeatedly exits because of an application error, missing configuration, dependency failure or failed probe.",
              solution:
                "Inspect previous logs, Pod events, exit status, probes and configuration. Fix the underlying issue before relying on restarts."
            }
          ]
        },
    {
          heading: "22. Production Incident – ImagePullBackOff and ErrImagePull",
          explanation: `
    SCENARIO:
    
    A new Deployment is created, but its Pods show ImagePullBackOff.
    
    The application never starts because Kubernetes cannot download the container image.
    
    COMMON ERROR REASONS:
    
    - Image name is incorrect.
    - Image tag does not exist.
    - Private registry authentication is missing.
    - imagePullSecrets is incorrect.
    - Registry is unavailable.
    - DNS or firewall blocks registry access.
    - Host architecture is incompatible with the image.
    
    INVESTIGATION:
    
    1. Describe the Pod.
    2. Read the exact image-pull error.
    3. Verify the image repository and tag.
    4. Check registry authentication.
    5. Check imagePullSecrets.
    6. Check node connectivity to the registry.
    7. Verify image platform compatibility.
    
    IMPORTANT:
    ImagePullBackOff is a retry/backoff state. The actual cause is usually explained in the Pod events.
          `,
          steps: [
            "Identify the affected Pod.",
            "Run kubectl describe pod.",
            "Read the exact Failed to pull image event.",
            "Verify repository and tag.",
            "Verify registry permissions.",
            "Check imagePullSecrets.",
            "Check registry DNS and network access.",
            "Verify image architecture.",
            "Confirm that the Pod starts after correction."
          ],
          commands: `
    kubectl describe pod <pod-name> -n production
    
    kubectl get pods -n production
    
    kubectl get secrets -n production
    
    kubectl get serviceaccount default -n production -o yaml
    
    kubectl get events -n production --sort-by=.lastTimestamp
          `,
          config: `
    apiVersion: v1
    kind: Pod
    metadata:
      name: private-api
      namespace: production
    spec:
      imagePullSecrets:
        - name: registry-credentials
      containers:
        - name: api
          image: registry.example.com/team/api:v2
          imagePullPolicy: IfNotPresent
          `,
          problems: [
            {
              issue: "ErrImagePull: repository does not exist or may require authorization.",
              rootCause:
                "The repository path may be wrong, the repository may be private or authentication may be missing.",
              solution:
                "Verify the exact image path and configure valid registry credentials with the correct pull permissions."
            },
            {
              issue: "ImagePullBackOff after using a new tag.",
              rootCause:
                "The requested tag may not have been pushed to the registry.",
              solution:
                "Verify the tag in the registry and correct the Deployment image reference."
            }
          ]
        }
  ]
};

export default data;
