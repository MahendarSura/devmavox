
export interface UnhealthyAppDiagnostic {
  id: number;
  title: string;
  objective: string;
  commands: string[];
  interpretOutput: string[];
  nextStep: string;
  safetyNote?: string;
}

export interface UnhealthyAppRootCause {
  cause: string;
  symptoms: string[];
  confirmation: string[];
  resolution: string[];
  prevention: string[];
}

export interface UnhealthyAppIncidentScenario {
  title: string;
  environment: string;
  symptoms: string[];
  timeline: string[];
  investigation: string[];
  rootCause: string;
  recovery: string[];
  verification: string[];
}

export interface UnhealthyAppInterviewQuestion {
  question: string;
  answer: string;
}

export const unhealthyAppsGuide = {
  title: "Argo CD Unhealthy Applications",
  slug: "unhealthy-apps",
  category: "Argo CD",
  difficulty: "Advanced",
  estimatedTime: "60–90 minutes",

  summary:
    "A production troubleshooting runbook for Argo CD Applications that become Degraded, remain Progressing, show missing resources, or appear Synced while the real application is unavailable.",

  overview: {
    whatIsIt:
      "An Argo CD Application is considered unhealthy when one or more managed resources fail their applicable health assessment. The underlying problem can be a failed Deployment, crashing Pods, incomplete Jobs, unhealthy custom resources, missing dependencies, or an application-level failure that Kubernetes resource health does not detect.",

    whyItMatters:
      "GitOps synchronization and application availability are different concerns. Argo CD can successfully apply the desired manifests while the application remains unavailable. Production engineers must investigate both the Kubernetes resource state and the application's real behavior.",

    keyDistinctions: [
      {
        term: "Synced",
        explanation:
          "The live state matches the desired state according to Argo CD's comparison. This does not prove that the application works correctly.",
      },
      {
        term: "OutOfSync",
        explanation:
          "The live state differs from the desired state. The difference may be intentional, caused by manual changes, or caused by another controller.",
      },
      {
        term: "Healthy",
        explanation:
          "The resources pass their applicable Argo CD health assessments. This is useful evidence but does not guarantee every business transaction succeeds.",
      },
      {
        term: "Progressing",
        explanation:
          "A resource has not yet reached its expected health state. It may be making progress, waiting for a dependency, or genuinely stuck.",
      },
      {
        term: "Degraded",
        explanation:
          "A resource or custom health assessment indicates a failure or unhealthy condition. Identify the specific resource and condition before choosing a fix.",
      },
      {
        term: "Missing",
        explanation:
          "An expected resource is absent from the live state. Determine whether it was never created, removed, renamed, pruned, or is being reported differently because of ownership or configuration.",
      },
      {
        term: "Application-level failure",
        explanation:
          "The Kubernetes objects may appear healthy while the application returns errors, fails business checks, or cannot reach a dependency.",
      },
    ],

    healthAssessment:
      "Argo CD assesses resources using built-in health logic and, where configured and supported, custom health assessments. A resource's actual behavior, controller conditions, and application-level telemetry must be checked when the reported health does not explain the incident.",

    investigationPrinciples: [
      "Start with the affected Application and its destination cluster.",
      "Identify the specific resource responsible for the health status.",
      "Determine whether the issue affects users or only a deployment.",
      "Use read-only diagnostics before changing production resources.",
      "Correlate Kubernetes conditions, events, logs, metrics, and recent Git changes.",
      "Do not assume that a successful sync means the application is available.",
      "Do not assume that Degraded always means the latest release caused the problem.",
      "Verify the actual application after recovery.",
    ],
  },

  incidentScenario: {
    title: "Production Application is Synced but Degraded",

    environment:
      "Production Kubernetes cluster managed by Argo CD, with a Deployment, Service, ingress or gateway, and external dependencies.",

    symptoms: [
      "Argo CD displays the Application as Synced but Degraded.",
      "The deployment pipeline reports that synchronization succeeded.",
      "Some Pods restart or fail readiness checks.",
      "The application endpoint returns HTTP 5xx errors or times out.",
      "The Service has fewer ready endpoints than expected.",
      "The previous application version may still be serving some traffic.",
    ],

    businessImpact: [
      "Users may be unable to log in or complete important transactions.",
      "API error rates may rise while some requests continue to succeed.",
      "A partial rollout may send traffic to both healthy and unhealthy replicas.",
      "Dependent applications may experience cascading failures.",
      "A database or message-processing failure may cause data-processing delays.",
    ],

    exampleArchitecture: [
      {
        component: "Argo CD",
        responsibility:
          "Reconciles the desired manifests and reports synchronization and resource health.",
      },
      {
        component: "Deployment",
        responsibility:
          "Creates and manages the desired application replicas.",
      },
      {
        component: "Pods",
        responsibility:
          "Run the containers and expose readiness, liveness, and startup behavior.",
      },
      {
        component: "Service",
        responsibility:
          "Routes traffic to eligible backend endpoints.",
      },
      {
        component: "Ingress or gateway",
        responsibility:
          "Routes external requests to the appropriate Service.",
      },
      {
        component: "Dependencies",
        responsibility:
          "Provide database, cache, message broker, authentication, or external API functionality.",
      },
    ],

    firstResponse:
      "Check user impact and actual service behavior first. Then inspect Argo CD health, identify the unhealthy resource, and follow the evidence to the root cause. Do not start by forcing a sync or restarting every Pod.",
  },

  severityAssessment: {
    levels: [
      {
        level: "SEV-1 — Critical",
        indicators: [
          "A critical production service is unavailable.",
          "Major user journeys are failing.",
          "Data integrity or security is at immediate risk.",
          "The failure is spreading across multiple services.",
        ],
        actions: [
          "Activate the incident process.",
          "Assign an incident owner and technical lead.",
          "Notify the relevant service and platform owners.",
          "Preserve evidence and use the approved recovery plan.",
        ],
      },
      {
        level: "SEV-2 — High",
        indicators: [
          "A substantial part of the application is degraded.",
          "A critical feature is unavailable.",
          "Error rates or latency are significantly elevated.",
        ],
        actions: [
          "Assess customer impact and affected endpoints.",
          "Identify the unhealthy resource and recent changes.",
          "Coordinate an approved fix or rollback.",
        ],
      },
      {
        level: "SEV-3 — Medium",
        indicators: [
          "A non-critical feature is degraded.",
          "The application remains usable with limited functionality.",
          "A non-production deployment is blocked.",
        ],
        actions: [
          "Investigate the unhealthy resource.",
          "Collect evidence and prepare a controlled correction.",
        ],
      },
      {
        level: "SEV-4 — Low",
        indicators: [
          "A development or test Application has an isolated health issue.",
          "There is no immediate user impact.",
        ],
        actions: [
          "Reproduce safely and document the findings.",
          "Add a regression test or improve monitoring.",
        ],
      },
    ],

    questions: [
      "Which Application, cluster, namespace, and environment are affected?",
      "Is production traffic failing or is only the GitOps health status affected?",
      "What is the exact unhealthy resource and its current condition?",
      "Which Git revision is deployed and which revision is intended?",
      "Did the issue begin after a release, infrastructure change, or dependency incident?",
      "Are all replicas unhealthy or only a subset?",
      "Are multiple Applications affected by the same dependency?",
      "Have any resources already changed during the failed deployment?",
      "Is rollback safe for the current database schema and persistent data?",
      "What is the agreed recovery objective and who can approve production changes?",
    ],
  },

  productionWorkflow: [
    {
      step: 1,
      title: "Detect and confirm the incident",
      actions: [
        "Capture the Argo CD Application status and exact health message.",
        "Record the first failure timestamp and the alert source.",
        "Check the service's real endpoint and synthetic health checks.",
        "Confirm the intended Git revision and the deployed revision.",
        "Identify whether the issue is new, intermittent, or recurring.",
      ],
      successCriteria:
        "The affected Application, revision, environment, and initial symptoms are known.",
    },
    {
      step: 2,
      title: "Assess business impact and severity",
      actions: [
        "Check request success rate, latency, and customer-facing errors.",
        "Identify affected endpoints and critical business transactions.",
        "Check whether only one replica, one zone, or the whole service is affected.",
        "Check dependent services and whether the failure is spreading.",
        "Determine whether immediate recovery is needed before a full root-cause investigation.",
      ],
      successCriteria:
        "The incident has a severity, an owner, and a clear statement of user impact.",
    },
    {
      step: 3,
      title: "Perform safety and environment checks",
      actions: [
        "Confirm the current Kubernetes context and cluster.",
        "Confirm the exact Argo CD Application and destination namespace.",
        "Verify the repository, branch, commit, and release version.",
        "Check whether a sync operation or another deployment is active.",
        "Confirm production change approval and recovery ownership.",
        "Identify stateful resources and any database migration risks.",
      ],
      successCriteria:
        "Diagnostics target the correct environment and no recovery action is being taken blindly.",
    },
    {
      step: 4,
      title: "Collect initial evidence",
      actions: [
        "Save the pipeline output and Argo CD operation message.",
        "Capture Application sync and health status.",
        "Capture Deployment, ReplicaSet, Pod, Service, and endpoint state.",
        "Capture relevant Kubernetes events and sanitized logs.",
        "Record resource conditions, timestamps, and recent changes.",
        "Capture application metrics and endpoint responses.",
      ],
      successCriteria:
        "The original state is recorded before restarts, rollbacks, deletions, or configuration changes.",
    },
    {
      step: 5,
      title: "Run diagnostics in dependency order",
      actions: [
        "Identify the unhealthy resource in Argo CD.",
        "Inspect the resource's status and conditions.",
        "Follow the dependency chain from Deployment to Pod, Service, and application endpoint.",
        "Check scheduling, image pulling, startup, readiness, storage, networking, and permissions as indicated by evidence.",
        "Inspect application and dependency logs.",
        "Check cluster or controller health if multiple resources or Applications are affected.",
      ],
      successCriteria:
        "The investigation narrows the problem to a specific resource, dependency, configuration, or platform failure.",
    },
    {
      step: 6,
      title: "Isolate the root cause",
      actions: [
        "Write a hypothesis based on observed evidence.",
        "Compare current and previous healthy revisions.",
        "Distinguish resource creation failures from runtime failures.",
        "Determine whether the issue is caused by the release or a shared dependency.",
        "Use a controlled test or non-production reproduction where appropriate.",
        "Confirm the causal mechanism before making a change.",
      ],
      successCriteria:
        "The root cause explains the symptoms and is supported by command output, events, logs, metrics, or a reproducible test.",
    },
    {
      step: 7,
      title: "Fix and recover safely",
      actions: [
        "Choose the smallest correction that addresses the confirmed cause.",
        "Validate the intended manifest or application change.",
        "Review the Git diff and expected live changes.",
        "Obtain the required approval for production actions.",
        "Use the approved GitOps workflow for managed resources.",
        "Consider rollback only after assessing compatibility, partial changes, and data risk.",
      ],
      successCriteria:
        "The recovery addresses the cause without introducing uncontrolled changes or data loss.",
    },
    {
      step: 8,
      title: "Verify service and resource health",
      actions: [
        "Confirm that the unhealthy resource reaches the expected health state.",
        "Confirm that the desired number of replicas becomes available.",
        "Verify Service endpoints and ingress or gateway behavior.",
        "Run application smoke tests and important business checks.",
        "Confirm error rate and latency return to acceptable levels.",
        "Check for repeated restarts, new events, and dependency failures.",
      ],
      successCriteria:
        "Both Argo CD health and real application behavior meet the service's recovery criteria.",
    },
    {
      step: 9,
      title: "Prevent recurrence and close the incident",
      actions: [
        "Record the root cause and the evidence that confirmed it.",
        "Add validation or automated tests for the failure mode.",
        "Improve alerts and diagnostic information.",
        "Document recovery and rollback limitations.",
        "Assign preventive actions with owners and due dates.",
        "Review whether the incident exposed a monitoring or release-process gap.",
      ],
      successCriteria:
        "The incident has a clear resolution record and actionable preventive follow-up.",
    },
  ],

  diagnostics: [
    {
      id: 1,
      title: "Verify the Kubernetes context",
      objective:
        "Ensure that read-only commands inspect the intended cluster.",

      commands: [
        "kubectl config current-context",
        "kubectl config get-contexts",
        "kubectl cluster-info",
      ],

      interpretOutput: [
        "The current context must match the intended environment.",
        "A context name alone is not sufficient proof of cluster identity.",
        "Authentication, DNS, or API connectivity errors must be resolved before interpreting workload state.",
      ],

      nextStep:
        "Confirm the cluster using the team's approved environment mapping before continuing.",
    },

    {
      id: 2,
      title: "Inspect the Argo CD Application",
      objective:
        "Identify sync status, health status, destination, revision, and reported resource errors.",

      commands: [
        "argocd app list",
        "argocd app get <application-name>",
        "argocd app history <application-name>",
      ],

      interpretOutput: [
        "Synced does not guarantee that the application is available to users.",
        "Degraded indicates a health problem but may not explain its underlying cause.",
        "Progressing can mean a resource is still starting or is stuck waiting on a dependency.",
        "Application history helps identify revisions and the last known healthy deployment.",
        "The CLI output depends on the installed Argo CD version and permissions.",
      ],

      nextStep:
        "Record the destination, revision, health state, sync state, operation message, and unhealthy resource.",

      safetyNote:
        "Use read-only commands during initial diagnosis. Do not start a sync or rollback merely to inspect status.",
    },

    {
      id: 3,
      title: "Inspect the Application custom resource",
      objective:
        "Review structured status and resource-level health information.",

      commands: [
        "kubectl get applications.argoproj.io -A",
        "kubectl -n argocd get application <application-name> -o yaml",
        "kubectl -n argocd get application <application-name> -o jsonpath='{.status.sync.status}{\"\\n\"}{.status.health.status}{\"\\n\"}{.status.operationState.phase}{\"\\n\"}{.status.operationState.message}{\"\\n\"}'",
      ],

      interpretOutput: [
        "The Application namespace may not be argocd in every installation.",
        "The operation phase and message can identify an incomplete or failed operation.",
        "Resource-level status can identify which object is reported unhealthy.",
        "An empty operation message does not mean that all resources are healthy.",
      ],

      nextStep:
        "Use the actual Application namespace and inspect the specific resource reported as unhealthy.",
    },

    {
      id: 4,
      title: "List Application resources",
      objective:
        "Identify the exact resource and its health status.",

      commands: [
        "argocd app resources <application-name>",
        "argocd app get <application-name>",
        "kubectl -n <destination-namespace> get deployments,statefulsets,daemonsets,jobs,pods",
      ],

      interpretOutput: [
        "Look for the specific resource reported as Degraded, Progressing, Missing, or otherwise unhealthy.",
        "The same Application can contain healthy and unhealthy resources.",
        "The Application destination namespace and individual resource namespaces may differ.",
        "A missing resource may be expected if the manifest was intentionally removed, so compare with desired state.",
      ],

      nextStep:
        "Choose the resource type and namespace before running deeper diagnostics.",
    },

    {
      id: 5,
      title: "Inspect Deployment conditions and replicas",
      objective:
        "Determine whether the workload has achieved its desired availability.",

      commands: [
        "kubectl -n <namespace> get deployment",
        "kubectl -n <namespace> describe deployment <deployment-name>",
        "kubectl -n <namespace> get deployment <deployment-name> -o yaml",
        "kubectl -n <namespace> rollout status deployment/<deployment-name> --timeout=30s",
      ],

      interpretOutput: [
        "Compare desired replicas with updated, ready, and available replicas.",
        "ProgressDeadlineExceeded indicates that the Deployment failed to make sufficient progress within its configured deadline.",
        "Unavailable replicas can result from scheduling, image, configuration, startup, readiness, or dependency failures.",
        "The rollout status command's timeout limits the diagnostic wait; it does not fix the workload.",
      ],

      nextStep:
        "Inspect the new ReplicaSet and Pods to find why replicas are not becoming available.",
    },

    {
      id: 6,
      title: "Inspect ReplicaSets and rollout history",
      objective:
        "Determine whether a new revision introduced the unhealthy state.",

      commands: [
        "kubectl -n <namespace> get replicasets",
        "kubectl -n <namespace> describe replicaset <replicaset-name>",
        "kubectl -n <namespace> rollout history deployment/<deployment-name>",
      ],

      interpretOutput: [
        "A new ReplicaSet with zero ready replicas may indicate a failed new revision.",
        "Older replicas may still be serving traffic during a partial rollout.",
        "Rollout history can help correlate a change with the first failure.",
        "A ReplicaSet problem can also result from quotas, admission failures, or scheduling constraints.",
      ],

      nextStep:
        "Inspect the new ReplicaSet's Pods and events before deciding whether a rollback is justified.",
    },

    {
      id: 7,
      title: "Inspect Pod states and conditions",
      objective:
        "Identify startup, scheduling, readiness, and container failures.",

      commands: [
        "kubectl -n <namespace> get pods -o wide",
        "kubectl -n <namespace> describe pod <pod-name>",
        "kubectl -n <namespace> get pod <pod-name> -o yaml",
      ],

      interpretOutput: [
        "Pending may indicate scheduling constraints, storage problems, or resource pressure.",
        "ImagePullBackOff indicates repeated image-pull failure.",
        "CrashLoopBackOff indicates repeated container restarts.",
        "Running does not mean Ready.",
        "Readiness probe failures can prevent traffic from reaching a Pod.",
        "Pod conditions and container state explain more than the short STATUS column alone.",
      ],

      nextStep:
        "Use events, container states, and logs to identify the concrete failure.",
    },

    {
      id: 8,
      title: "Inspect current and previous container logs",
      objective:
        "Find startup exceptions, missing configuration, and dependency errors.",

      commands: [
        "kubectl -n <namespace> logs <pod-name> --all-containers=true --tail=200",
        "kubectl -n <namespace> logs <pod-name> -c <container-name> --previous --tail=200",
      ],

      interpretOutput: [
        "The current logs show the running container's output.",
        "The previous option can retrieve logs from a terminated container if they remain available.",
        "Missing environment variables, invalid configuration, failed migrations, and dependency connection errors can explain startup failures.",
        "Authentication failures can indicate invalid credentials or insufficient permissions.",
        "A timeout alone does not distinguish DNS, network, overload, or application-level problems.",
      ],

      nextStep:
        "Correlate log timestamps with Pod events and recent changes. Redact credentials and tokens before sharing logs.",
    },

    {
      id: 9,
      title: "Check Kubernetes events",
      objective:
        "Find concrete reasons for resource creation, scheduling, and runtime failures.",

      commands: [
        "kubectl -n <namespace> get events --sort-by=.metadata.creationTimestamp",
        "kubectl -n <namespace> describe pod <pod-name>",
        "kubectl -n <namespace> describe deployment <deployment-name>",
      ],

      interpretOutput: [
        "FailedScheduling can indicate resource requests, affinity, taints, or placement constraints.",
        "FailedMount can indicate volume or configuration mount failures.",
        "FailedCreate can indicate admission, quota, or controller problems.",
        "Back-off messages can indicate repeated startup failures.",
        "Events can expire or be aggregated; absence of an event is not proof that no failure occurred.",
      ],

      nextStep:
        "Investigate the named resource or dependency and correlate its event timestamp with the incident timeline.",
    },

    {
      id: 10,
      title: "Check image and registry failures",
      objective:
        "Determine whether containers are unable to retrieve the intended image.",

      commands: [
        "kubectl -n <namespace> describe pod <pod-name>",
        "kubectl -n <namespace> get deployment <deployment-name> -o jsonpath='{.spec.template.spec.containers[*].image}{\"\\n\"}'",
        "kubectl -n <namespace> get serviceaccount <service-account-name> -o yaml",
      ],

      interpretOutput: [
        "ImagePullBackOff and ErrImagePull usually have a more specific reason in Pod events.",
        "The requested image tag or digest may not exist in the registry.",
        "Registry authentication or network access may be failing.",
        "A mutable tag can point to different image contents over time.",
      ],

      nextStep:
        "Verify the image reference, registry availability, pull-secret configuration, and release provenance.",

      safetyNote:
        "Do not print or share registry credentials or Secret contents.",
    },

    {
      id: 11,
      title: "Investigate readiness, liveness, and startup probes",
      objective:
        "Determine whether probe configuration or application startup behavior prevents health.",

      commands: [
        "kubectl -n <namespace> get deployment <deployment-name> -o yaml",
        "kubectl -n <namespace> describe pod <pod-name>",
        "kubectl -n <namespace> logs <pod-name> --all-containers=true --tail=200",
      ],

      interpretOutput: [
        "Readiness failures can remove a Pod from Service endpoints.",
        "Liveness failures can cause container restarts.",
        "Startup probes can provide a startup window for applications that take longer to initialize.",
        "Incorrect paths, ports, schemes, timeouts, or thresholds can produce repeated probe failures.",
        "Making a probe less strict without evidence may hide a real application failure.",
      ],

      nextStep:
        "Verify the application's real readiness behavior, configured probe endpoint, port, and dependency requirements.",
    },

    {
      id: 12,
      title: "Inspect Service selectors and endpoints",
      objective:
        "Determine whether healthy Pods are available as Service backends.",

      commands: [
        "kubectl -n <namespace> get services",
        "kubectl -n <namespace> describe service <service-name>",
        "kubectl -n <namespace> get endpoints <service-name>",
        "kubectl -n <namespace> get endpointslices",
      ],

      interpretOutput: [
        "A Service with no ready endpoints may indicate absent matching Pods or Pods that are not ready.",
        "A selector mismatch can prevent Pods from being selected.",
        "The Service port, target port, and container listening port must be consistent.",
        "EndpointSlice information can help investigate the backends registered for a Service.",
      ],

      nextStep:
        "Compare Service selectors with Pod labels, then check readiness and port configuration.",
    },

    {
      id: 13,
      title: "Test the application endpoint",
      objective:
        "Confirm whether the application is usable independently of the Argo CD status.",

      commands: [
        "kubectl -n <namespace> get ingress",
        "kubectl -n <namespace> describe ingress <ingress-name>",
        "curl -i --max-time 10 https://<approved-test-host>/<health-path>",
      ],

      interpretOutput: [
        "HTTP 200 may indicate success for that endpoint, but does not validate every business operation.",
        "HTTP 401 or 403 may indicate authentication or authorization requirements rather than application downtime.",
        "HTTP 404 can indicate a wrong path, host rule, or application route.",
        "HTTP 502 or 503 may indicate an unavailable upstream or gateway routing problem.",
        "Connection timeout can result from DNS, routing, firewall, endpoint, or application problems.",
      ],

      nextStep:
        "Compare external and internal tests to determine whether the failure is in the application, Service, ingress, or network path.",

      safetyNote:
        "Use approved health endpoints and test accounts. Avoid load-generating or state-changing requests during an incident.",
    },

    {
      id: 14,
      title: "Check ingress or gateway routing",
      objective:
        "Determine whether external traffic reaches the correct healthy backend.",

      commands: [
        "kubectl -n <namespace> get ingress",
        "kubectl -n <namespace> describe ingress <ingress-name>",
        "kubectl -n <namespace> get services,endpoints",
      ],

      interpretOutput: [
        "A correct ingress object does not prove that its controller or upstream is healthy.",
        "Host, path, TLS, and Service backend settings can route requests incorrectly.",
        "An upstream error may occur even while Pods are running.",
      ],

      nextStep:
        "Inspect ingress-controller or gateway logs, backend health, host/path rules, and the application's Service endpoints.",
    },

    {
      id: 15,
      title: "Investigate DNS and network connectivity",
      objective:
        "Determine whether the application can reach required internal or external dependencies.",

      commands: [
        "kubectl -n <namespace> get pods",
        "kubectl -n <namespace> get services",
        "kubectl -n <namespace> get networkpolicies",
        "kubectl -n <namespace> logs <pod-name> --all-containers=true --tail=200",
      ],

      interpretOutput: [
        "DNS resolution errors can indicate incorrect names, unavailable DNS services, or search-domain issues.",
        "Connection refused can indicate that the target endpoint is not listening.",
        "Connection timeout can indicate routing, policy, firewall, or overload problems.",
        "NetworkPolicy can restrict communication even when the destination Service exists.",
      ],

      nextStep:
        "Test connectivity using approved diagnostic tools in the affected environment and inspect DNS, routing, policy, and destination health.",
    },

    {
      id: 16,
      title: "Check resource requests, limits, and cluster capacity",
      objective:
        "Determine whether resource pressure prevents workloads from scheduling or running reliably.",

      commands: [
        "kubectl -n <namespace> describe pod <pod-name>",
        "kubectl describe nodes",
        "kubectl top nodes",
        "kubectl -n <namespace> top pods",
      ],

      interpretOutput: [
        "Insufficient CPU or memory in scheduling events indicates a placement constraint.",
        "OOMKilled indicates that the container was terminated after a memory-related failure.",
        "Node pressure can affect scheduling and workload stability.",
        "kubectl top requires an available metrics pipeline and may not work in every cluster.",
      ],

      nextStep:
        "Compare requests, limits, node allocatable capacity, observed usage, and scheduling constraints before changing resources.",
    },

    {
      id: 17,
      title: "Investigate persistent storage",
      objective:
        "Find volume provisioning, attachment, mount, and data-access problems.",

      commands: [
        "kubectl -n <namespace> get pvc",
        "kubectl -n <namespace> describe pvc <pvc-name>",
        "kubectl get pv",
        "kubectl -n <namespace> describe pod <pod-name>",
      ],

      interpretOutput: [
        "A Pending PVC can indicate storage-class, capacity, or provisioning issues.",
        "FailedMount can indicate attachment, mount, permissions, or configuration problems.",
        "A bound volume can still fail to attach or mount on a particular node.",
      ],

      nextStep:
        "Inspect PVC events, storage-class settings, provisioner health, and volume attachment status.",

      safetyNote:
        "Do not delete PVCs or replace stateful storage during diagnosis. Confirm data preservation and recovery requirements first.",
    },

    {
      id: 18,
      title: "Check database and external dependencies",
      objective:
        "Determine whether the application is unhealthy because a required dependency is unavailable.",

      commands: [
        "kubectl -n <namespace> logs <pod-name> --all-containers=true --tail=200",
        "kubectl -n <namespace> get services,endpoints",
        "kubectl -n <namespace> get secrets",
      ],

      interpretOutput: [
        "Database connection failures can be caused by credentials, DNS, network policy, connection limits, or database availability.",
        "A service may start successfully but fail its readiness check while waiting for a dependency.",
        "An external API failure can cause only some application features to fail.",
        "Listing Secret names is different from reading their contents; never expose secret values in incident reports.",
      ],

      nextStep:
        "Verify the dependency's health through its approved monitoring and diagnostics, then check connectivity and configuration from the application environment.",

      safetyNote:
        "Do not display Secret data or credentials. Use approved secret-management tools and sanitized diagnostics.",
    },

    {
      id: 19,
      title: "Inspect ConfigMaps and configuration references",
      objective:
        "Identify missing keys, incorrect references, or configuration changes that cause startup failure.",

      commands: [
        "kubectl -n <namespace> get configmaps",
        "kubectl -n <namespace> describe deployment <deployment-name>",
        "kubectl -n <namespace> get pod <pod-name> -o yaml",
      ],

      interpretOutput: [
        "A missing ConfigMap or required key can prevent a container from starting.",
        "Environment variables and mounted configuration may differ between revisions.",
        "Updating a ConfigMap does not guarantee that every running application process reloads it.",
        "Secret references may fail even if the corresponding ConfigMap exists.",
      ],

      nextStep:
        "Compare expected configuration keys and references with the deployed manifest and application logs.",
    },

    {
      id: 20,
      title: "Inspect Jobs and custom resources",
      objective:
        "Find unhealthy non-Deployment resources that affect Application health.",

      commands: [
        "kubectl -n <namespace> get jobs",
        "kubectl -n <namespace> describe job <job-name>",
        "kubectl get crds",
        "kubectl get events -A --sort-by=.metadata.creationTimestamp",
      ],

      interpretOutput: [
        "A Job can fail or remain incomplete even when Deployments are healthy.",
        "A custom resource may depend on a controller or CRD that is not ready.",
        "Custom health assessments may report Degraded based on controller conditions.",
        "The specific resource type must be inspected; get all does not show every Kubernetes resource.",
      ],

      nextStep:
        "Inspect the resource's conditions, owning controller, events, and logs. Confirm whether it is genuinely unhealthy or incorrectly assessed.",
    },

    {
      id: 21,
      title: "Investigate RBAC and admission failures",
      objective:
        "Determine whether permissions or policy controls prevent resource creation or operation.",

      commands: [
        "kubectl -n <namespace> get serviceaccounts",
        "kubectl auth can-i get secrets -n <namespace> --as=system:serviceaccount:<namespace>:<service-account>",
        "kubectl get validatingwebhookconfigurations",
        "kubectl get mutatingwebhookconfigurations",
      ],

      interpretOutput: [
        "A 'no' authorization result means the tested identity lacks the specific permission.",
        "A Forbidden error can identify a missing action or resource permission.",
        "An admission rejection may indicate policy non-compliance.",
        "A webhook timeout may indicate an unavailable webhook or a connectivity issue.",
      ],

      nextStep:
        "Identify the exact denied action or policy failure and request the smallest approved correction.",

      safetyNote:
        "Impersonation checks require sufficient privileges. Do not bypass production security policies or grant broad administrator access.",
    },

    {
      id: 22,
      title: "Compare desired and live state",
      objective:
        "Determine whether drift or a manifest change explains the health problem.",

      commands: [
        "argocd app diff <application-name>",
        "argocd app manifests <application-name>",
        "git log -n 10 --oneline",
        "git diff <last-known-good-revision>..<current-revision> --",
      ],

      interpretOutput: [
        "A diff can reveal changes to images, ports, probes, resources, environment references, and annotations.",
        "Live-state changes may have been made manually or by another controller.",
        "A Git diff identifies changes but does not prove that a particular change caused the incident.",
        "Rendered manifests help distinguish source-rendering issues from runtime failures.",
      ],

      nextStep:
        "Correlate relevant manifest changes with the first failure timestamp and runtime evidence.",

      safetyNote:
        "Review sensitive manifest output before sharing it. Never expose credentials or secret values.",
    },

    {
      id: 23,
      title: "Inspect Argo CD controller health",
      objective:
        "Determine whether a shared controller issue contributes to unhealthy Applications.",

      commands: [
        "kubectl -n argocd get pods",
        "kubectl -n argocd get deployments",
        "kubectl -n argocd logs deployment/argocd-application-controller --since=30m",
        "kubectl -n argocd get events --sort-by=.metadata.creationTimestamp",
      ],

      interpretOutput: [
        "The controller namespace and workload names can differ by installation.",
        "Restarts, API errors, resource pressure, and reconciliation delays may indicate controller-side problems.",
        "A single Application's health failure does not automatically mean Argo CD itself is unhealthy.",
        "Controller logs can contain information about multiple Applications.",
      ],

      nextStep:
        "Correlate controller logs with the affected Application and timestamps. If several Applications are affected, investigate shared dependencies.",

      safetyNote:
        "Do not restart or scale controller workloads during diagnosis without an approved operational plan.",
    },

    {
      id: 24,
      title: "Check API server and node health",
      objective:
        "Determine whether a broader cluster issue is affecting workload health.",

      commands: [
        "kubectl get --raw='/readyz?verbose'",
        "kubectl get nodes",
        "kubectl describe nodes",
        "kubectl get events -A --sort-by=.metadata.creationTimestamp",
      ],

      interpretOutput: [
        "An API server readiness result does not guarantee every API operation or dependency is healthy.",
        "NotReady nodes can cause scheduling and availability problems.",
        "Node pressure conditions can affect workloads.",
        "Multiple Applications failing at the same time may point to a shared platform dependency.",
      ],

      nextStep:
        "Correlate node and API conditions with the affected workloads and escalate to the platform team when evidence indicates a cluster-level incident.",
    },

    {
      id: 25,
      title: "Check application-level telemetry",
      objective:
        "Confirm whether the application meets its actual service-level objectives.",

      commands: [
        "curl -i --max-time 10 https://<approved-test-host>/<health-path>",
        "kubectl -n <namespace> logs <pod-name> --all-containers=true --since=15m",
        "kubectl -n <namespace> get pods -o wide",
      ],

      interpretOutput: [
        "A health endpoint may only test process availability and may not validate business functionality.",
        "Error rate and latency metrics provide broader evidence than one successful request.",
        "Synthetic checks should cover important user journeys without causing unintended changes.",
        "A healthy Kubernetes resource state does not replace application monitoring.",
      ],

      nextStep:
        "Use service dashboards, synthetic checks, and approved smoke tests to verify the behavior users actually depend on.",
    },
  ] satisfies UnhealthyAppDiagnostic[],

  rootCauses: [
    {
      cause: "Deployment rollout failure",
      symptoms: [
        "The Application is Degraded.",
        "The Deployment has fewer available replicas than expected.",
        "The rollout is incomplete.",
      ],
      confirmation: [
        "Inspect Deployment conditions and replica counts.",
        "Inspect the newest ReplicaSet and its Pods.",
        "Check events, probe failures, and container logs.",
      ],
      resolution: [
        "Correct the confirmed image, configuration, startup, capacity, or dependency problem.",
        "Validate the intended change.",
        "Observe the rollout and verify application behavior.",
      ],
      prevention: [
        "Validate images and configuration in CI.",
        "Monitor rollout progress and unavailable replicas.",
        "Test release and rollback procedures.",
      ],
    },

    {
      cause: "CrashLoopBackOff or application startup crash",
      symptoms: [
        "Pods restart repeatedly.",
        "Logs contain startup exceptions.",
        "The Deployment cannot reach expected availability.",
      ],
      confirmation: [
        "Inspect Pod events and container restart counts.",
        "Read current and previous logs.",
        "Compare environment variables, configuration references, and image versions.",
      ],
      resolution: [
        "Correct the confirmed application or configuration defect.",
        "Validate the change in an appropriate environment.",
        "Use the approved rollout or rollback procedure.",
      ],
      prevention: [
        "Add startup smoke tests.",
        "Validate required configuration.",
        "Alert on abnormal restart rates.",
      ],
    },

    {
      cause: "Readiness probe failure",
      symptoms: [
        "Containers run but Pods remain not ready.",
        "Service endpoints are missing or reduced.",
        "The Application remains Progressing or Degraded.",
      ],
      confirmation: [
        "Inspect probe configuration and Pod events.",
        "Check whether the application listens on the configured port and path.",
        "Correlate probe failures with startup and dependency logs.",
      ],
      resolution: [
        "Fix the application readiness behavior or incorrect probe configuration.",
        "Use a startup probe when startup timing justifies it.",
        "Verify endpoints and traffic after the correction.",
      ],
      prevention: [
        "Test probes against realistic startup conditions.",
        "Separate readiness from liveness checks.",
        "Alert on prolonged readiness failures.",
      ],
    },

    {
      cause: "Missing or invalid configuration",
      symptoms: [
        "The application exits during startup.",
        "Logs report missing keys or invalid settings.",
        "The failure began after a configuration change.",
      ],
      confirmation: [
        "Inspect manifest references and ConfigMap keys.",
        "Review application logs.",
        "Compare the current and previous revisions.",
      ],
      resolution: [
        "Correct the invalid configuration through the approved GitOps workflow.",
        "Verify the application receives the intended settings.",
        "Confirm readiness and application-level behavior.",
      ],
      prevention: [
        "Validate configuration schemas.",
        "Test required environment variables in CI.",
        "Use controlled secret and configuration management.",
      ],
    },

    {
      cause: "Database or external dependency unavailable",
      symptoms: [
        "The application starts but reports dependency errors.",
        "Readiness fails or API requests return 5xx responses.",
        "Other services may also show elevated errors.",
      ],
      confirmation: [
        "Correlate application logs with dependency telemetry.",
        "Verify approved connectivity and DNS tests.",
        "Check dependency availability, connection limits, and authentication.",
      ],
      resolution: [
        "Repair the confirmed dependency or connectivity issue.",
        "Use approved fallback behavior if available.",
        "Verify the application's critical transactions after recovery.",
      ],
      prevention: [
        "Monitor dependency availability and latency.",
        "Use appropriate timeouts, retries, and circuit breakers.",
        "Test failure and recovery behavior.",
      ],
    },

    {
      cause: "Service selector or port mismatch",
      symptoms: [
        "Pods are running but the Service has no usable endpoints.",
        "Requests fail even though the Deployment exists.",
        "A manifest change altered labels or ports.",
      ],
      confirmation: [
        "Compare Service selectors with Pod labels.",
        "Inspect endpoints and EndpointSlices.",
        "Check Service port and targetPort against the actual listener.",
      ],
      resolution: [
        "Correct the selector or port mapping in the intended manifest.",
        "Validate the Service backends.",
        "Run approved internal and external health tests.",
      ],
      prevention: [
        "Validate Service and Deployment labels in CI.",
        "Test service routing during deployment.",
        "Monitor backend endpoint counts.",
      ],
    },

    {
      cause: "Ingress or gateway failure",
      symptoms: [
        "The internal application works but external requests fail.",
        "Requests return 404, 502, or 503.",
        "The Application health status may not identify the routing problem.",
      ],
      confirmation: [
        "Compare internal Service tests with external endpoint tests.",
        "Inspect ingress or gateway configuration and logs.",
        "Check backend endpoints, TLS, host rules, and path rules.",
      ],
      resolution: [
        "Correct the confirmed routing or TLS issue.",
        "Restore gateway or upstream health through the approved process.",
        "Verify external traffic and error rates.",
      ],
      prevention: [
        "Test host and path routing.",
        "Monitor gateway error codes and upstream health.",
        "Validate TLS and backend changes before promotion.",
      ],
    },

    {
      cause: "Cluster capacity or scheduling problem",
      symptoms: [
        "Pods remain Pending.",
        "Events report insufficient CPU or memory.",
        "Node pressure or placement constraints are present.",
      ],
      confirmation: [
        "Inspect Pod scheduling events.",
        "Review node allocatable capacity and workload requests.",
        "Check taints, affinity, topology, and storage constraints.",
      ],
      resolution: [
        "Correct justified resource or placement settings.",
        "Add approved capacity or restore the relevant infrastructure.",
        "Verify the workload schedules and becomes ready.",
      ],
      prevention: [
        "Monitor capacity and scheduling failures.",
        "Test autoscaling behavior.",
        "Review requests and limits during code review.",
      ],
    },

    {
      cause: "Storage provisioning or mount failure",
      symptoms: [
        "Pods cannot start because a volume is unavailable.",
        "PVCs remain Pending or events report FailedMount.",
        "Stateful workloads are degraded.",
      ],
      confirmation: [
        "Inspect PVC and PV conditions.",
        "Review storage-class and volume events.",
        "Check provisioner and attachment health.",
      ],
      resolution: [
        "Correct the confirmed storage or attachment issue.",
        "Follow the approved storage recovery procedure.",
        "Verify data integrity and workload readiness.",
      ],
      prevention: [
        "Monitor storage provisioning and attachment.",
        "Test storage recovery.",
        "Document data preservation requirements.",
      ],
    },

    {
      cause: "Admission policy or RBAC failure",
      symptoms: [
        "Resources are rejected or cannot be created.",
        "Errors contain Forbidden or admission-denial messages.",
        "Only some resources may have applied.",
      ],
      confirmation: [
        "Inspect the exact API error and events.",
        "Verify the responsible identity or policy.",
        "Check webhook availability if a webhook timeout is reported.",
      ],
      resolution: [
        "Apply a least-privilege RBAC correction or a compliant manifest change.",
        "Repair the approved webhook dependency if necessary.",
        "Verify the resource is accepted and becomes healthy.",
      ],
      prevention: [
        "Validate policies in non-production.",
        "Review RBAC changes.",
        "Monitor admission webhook health.",
      ],
    },

    {
      cause: "CRD or custom controller unhealthy",
      symptoms: [
        "Custom resources are missing, progressing, or degraded.",
        "The CRD exists but the expected resource behavior is absent.",
        "The owning controller is unhealthy.",
      ],
      confirmation: [
        "Inspect CRDs and API resources.",
        "Check custom-resource conditions.",
        "Inspect controller health and logs.",
      ],
      resolution: [
        "Correct the dependency order or API compatibility issue.",
        "Restore the required controller through the approved process.",
        "Verify the custom resource reaches its expected condition.",
      ],
      prevention: [
        "Document CRD dependencies.",
        "Test clean installation and upgrade scenarios.",
        "Monitor custom-resource health.",
      ],
    },

    {
      cause: "Argo CD health assessment mismatch",
      symptoms: [
        "Argo CD reports unhealthy status while runtime evidence appears healthy.",
        "A custom resource remains Progressing or Degraded.",
        "The resource's controller reports a different state.",
      ],
      confirmation: [
        "Inspect the live resource status and controller conditions.",
        "Review any configured custom health assessment.",
        "Compare Argo CD's reported health with actual application behavior.",
      ],
      resolution: [
        "Fix the genuine runtime issue if the resource is unhealthy.",
        "If the assessment is incorrect, update it using a tested and compatible configuration.",
        "Verify that the revised assessment still detects real failures.",
      ],
      prevention: [
        "Test custom health assessments.",
        "Version-control health customizations.",
        "Monitor application behavior independently.",
      ],
    },

    {
      cause: "Shared Kubernetes or Argo CD platform failure",
      symptoms: [
        "Several Applications degrade around the same time.",
        "Multiple workloads show API, scheduling, or controller errors.",
        "Reconciliation is delayed across the environment.",
      ],
      confirmation: [
        "Compare timestamps across affected Applications.",
        "Inspect nodes, API readiness, controller health, and shared dependencies.",
        "Check platform alerts and infrastructure changes.",
      ],
      resolution: [
        "Follow the platform incident procedure.",
        "Address the confirmed control-plane, capacity, or controller issue.",
        "Reassess Applications after shared services recover.",
      ],
      prevention: [
        "Monitor shared platform health.",
        "Track reconciliation latency.",
        "Test platform recovery procedures.",
      ],
    },
  ] satisfies UnhealthyAppRootCause[],

  incidentScenarios: [
    {
      title: "Scenario 1: Synced but Degraded after a new image release",

      environment: "Production Kubernetes Deployment managed by Argo CD.",

      symptoms: [
        "Argo CD shows Synced but Degraded.",
        "The new ReplicaSet has no available replicas.",
        "The pipeline reports a successful sync.",
        "Application requests return errors.",
      ],

      timeline: [
        "T+00: New Git revision is promoted.",
        "T+02: Argo CD applies the manifests.",
        "T+03: New Pods start.",
        "T+04: Readiness probes fail.",
        "T+06: The Application becomes Degraded.",
        "T+07: Customer-facing error rates increase.",
      ],

      investigation: [
        "Confirm customer impact and the affected endpoints.",
        "Inspect the Application health and resource list.",
        "Describe the Deployment and new Pods.",
        "Read current and previous container logs.",
        "Compare the new image and configuration with the last healthy revision.",
      ],

      rootCause:
        "The new application version cannot load a required configuration key and fails its readiness check.",

      recovery: [
        "Confirm the missing configuration using sanitized logs.",
        "Validate the corrected configuration in the appropriate environment.",
        "Review the manifest diff and production approval.",
        "Promote the correction through the approved GitOps workflow.",
        "If immediate recovery is required, use the approved rollback plan after checking compatibility.",
      ],

      verification: [
        "Pods become ready and available.",
        "The Service has the expected ready endpoints.",
        "The Application reports the expected resource health.",
        "Critical smoke tests pass.",
        "Error rate and latency return to acceptable levels.",
      ],
    },

    {
      title: "Scenario 2: Pods are healthy but the external endpoint returns 503",

      environment: "Production application behind an ingress or gateway.",

      symptoms: [
        "Deployment replicas are available.",
        "Pods are Running and Ready.",
        "External requests return HTTP 503.",
        "Argo CD may show Healthy or only a partial health warning.",
      ],

      timeline: [
        "T+00: A routing or Service change is deployed.",
        "T+02: Pods remain healthy.",
        "T+03: External requests begin returning 503.",
        "T+05: Gateway alerts show upstream failures.",
      ],

      investigation: [
        "Test the application using an approved internal endpoint.",
        "Inspect the Service and EndpointSlices.",
        "Compare Service selectors and targetPort.",
        "Inspect ingress or gateway events and logs.",
        "Compare routing configuration with the last healthy revision.",
      ],

      rootCause:
        "The Service targetPort no longer matches the port used by the application container.",

      recovery: [
        "Confirm the actual application listener and intended port.",
        "Correct the Service mapping in Git.",
        "Validate the change and obtain approval.",
        "Deploy through the approved GitOps process.",
      ],

      verification: [
        "Service endpoints are available.",
        "Internal and external requests succeed.",
        "Gateway upstream errors stop.",
        "Monitoring confirms service recovery.",
      ],
    },

    {
      title: "Scenario 3: All replicas fail after a database dependency incident",

      environment: "Production API whose readiness or critical requests depend on a database.",

      symptoms: [
        "Multiple replicas report database connection errors.",
        "Readiness or business checks fail.",
        "The Argo CD Application becomes Degraded.",
        "Other services using the same database may also be affected.",
      ],

      timeline: [
        "T+00: Database latency increases.",
        "T+02: Application connection timeouts begin.",
        "T+04: Readiness failures increase.",
        "T+06: The Application is reported Degraded.",
      ],

      investigation: [
        "Correlate application logs with database telemetry.",
        "Check approved database health and connection metrics.",
        "Verify DNS, connectivity, credentials, and connection limits.",
        "Compare the incident with other Applications using the same dependency.",
      ],

      rootCause:
        "The database connection pool is exhausted, preventing new application connections.",

      recovery: [
        "Engage the database owner.",
        "Determine whether a connection leak, capacity limit, or database slowdown is responsible.",
        "Use the approved procedure to restore safe database capacity.",
        "Avoid blindly restarting all application replicas, which may increase connection pressure.",
        "Verify recovery gradually.",
      ],

      verification: [
        "Database connection failures stop.",
        "Readiness and critical requests recover.",
        "Connection usage and latency return to expected levels.",
        "Argo CD health and service-level indicators recover.",
      ],
    },

    {
      title: "Scenario 4: Pods remain Pending after a release",

      environment: "Kubernetes cluster with constrained workload capacity.",

      symptoms: [
        "The Deployment has fewer available replicas than desired.",
        "New Pods remain Pending.",
        "The Application becomes Progressing or Degraded.",
      ],

      timeline: [
        "T+00: A new replica count or resource request is deployed.",
        "T+02: The scheduler cannot place new Pods.",
        "T+05: The rollout remains incomplete.",
      ],

      investigation: [
        "Describe the pending Pod.",
        "Inspect scheduling events.",
        "Compare requests with node allocatable capacity.",
        "Check taints, affinity, topology, quotas, and storage.",
      ],

      rootCause:
        "The new Pod requests more CPU than the eligible nodes can provide.",

      recovery: [
        "Validate whether the request reflects actual workload needs.",
        "Choose an approved resource correction or capacity change.",
        "Check autoscaling and placement constraints.",
        "Monitor the new Pods through readiness.",
      ],

      verification: [
        "Pods schedule successfully.",
        "Required replicas become available.",
        "The application passes health checks.",
        "Capacity alerts are reviewed.",
      ],
    },

    {
      title: "Scenario 5: Argo CD reports Degraded for a custom resource",

      environment: "A GitOps-managed platform using a custom Kubernetes operator.",

      symptoms: [
        "The custom resource is present.",
        "Argo CD reports Degraded or Progressing.",
        "The custom controller reports a reconciliation error.",
      ],

      timeline: [
        "T+00: A custom-resource configuration changes.",
        "T+02: Argo CD applies the new object.",
        "T+03: The controller rejects a configuration field.",
        "T+05: Health remains degraded.",
      ],

      investigation: [
        "Inspect the custom resource's status and conditions.",
        "Inspect the controller's logs.",
        "Check the CRD schema and supported API version.",
        "Compare the new configuration with the last healthy revision.",
      ],

      rootCause:
        "The custom resource uses a field that is not supported by the installed controller version.",

      recovery: [
        "Confirm the compatible API and controller versions.",
        "Correct the manifest or coordinate an approved controller upgrade.",
        "Validate the change in a test environment.",
        "Deploy through the approved GitOps process.",
      ],

      verification: [
        "The controller reconciles the resource successfully.",
        "The custom resource reaches its expected status.",
        "Argo CD health matches the observed state.",
        "Dependent services are verified.",
      ],
    },
  ] satisfies UnhealthyAppIncidentScenario[],

  diagnosticDecisionTree: [
    {
      question: "Is the application actually unavailable to users?",
      yes:
        "Treat this as a service incident. Assess severity, preserve evidence, and investigate the failed endpoint and its dependencies.",
      no:
        "Determine whether the issue is limited to Argo CD's health assessment, a non-critical resource, or a deployment warning.",
    },
    {
      question: "Which resource is reported unhealthy?",
      yes:
        "Inspect that resource's status, conditions, events, and logs.",
      no:
        "Inspect Application resource status and custom health assessments to identify the reported resource.",
    },
    {
      question: "Are Deployment replicas unavailable?",
      yes:
        "Inspect ReplicaSets, Pod scheduling, image pulling, startup, probes, and resource capacity.",
      no:
        "Inspect Services, ingress, Jobs, custom resources, dependencies, and application-level telemetry.",
    },
    {
      question: "Are Pods Ready but traffic is failing?",
      yes:
        "Inspect Service selectors, endpoints, ports, network policies, ingress or gateway routing, and application behavior.",
      no:
        "Continue from the concrete Pod or resource condition causing the health failure.",
    },
    {
      question: "Are several Applications affected at once?",
      yes:
        "Investigate shared infrastructure, dependencies, Kubernetes API health, and Argo CD controller behavior.",
      no:
        "Focus on the affected Application's release, manifests, dependencies, and workload.",
    },
    {
      question: "Is the root cause supported by evidence?",
      yes:
        "Apply the smallest approved fix, validate, recover, and verify the service.",
      no:
        "Collect more evidence or reproduce safely. Avoid destructive actions based on assumptions.",
    },
  ],

  safeRecoveryProcedure: {
    title: "Production-safe recovery",

    beforeChangingAnything: [
      "Confirm cluster, Application, namespace, and Git revision.",
      "Record customer impact and severity.",
      "Capture the unhealthy resource and its conditions.",
      "Check whether a sync operation is still active.",
      "Determine whether the previous revision is still serving traffic.",
      "Assess stateful dependencies, migrations, and partial changes.",
      "Confirm production approval and recovery ownership.",
    ],

    recoverySteps: [
      {
        step: 1,
        action: "Identify the actual failing component.",
        reason:
          "An Application health label alone is not a root-cause diagnosis.",
      },
      {
        step: 2,
        action: "Confirm the cause with evidence.",
        reason:
          "Use events, logs, conditions, metrics, and manifest differences to distinguish alternative causes.",
      },
      {
        step: 3,
        action: "Choose the smallest safe correction.",
        reason:
          "Avoid broad restarts or unrelated changes that may make the incident worse.",
      },
      {
        step: 4,
        action: "Validate the intended change.",
        reason:
          "Check configuration, rendered manifests, policy compliance, and dependency compatibility.",
      },
      {
        step: 5,
        action: "Obtain approval and recover through the approved workflow.",
        reason:
          "Production changes must follow change-control and ownership requirements.",
      },
      {
        step: 6,
        action: "Monitor the affected resource.",
        reason:
          "Confirm that the specific failure has been corrected before considering the incident resolved.",
      },
      {
        step: 7,
        action: "Verify the complete request path.",
        reason:
          "Healthy Pods are not sufficient if Service, gateway, or dependencies still fail.",
      },
      {
        step: 8,
        action: "Record the final state and remaining risks.",
        reason:
          "The incident record should distinguish full recovery from partial mitigation.",
      },
    ],

    rollbackGuidance: [
      "Compare the current revision with the last known healthy revision.",
      "Check whether the failure is actually caused by the latest release.",
      "Determine whether database schema and data changes are compatible with the old application version.",
      "Review whether previous resources were already modified.",
      "Use the approved rollback or forward-fix procedure.",
      "Verify the live state after rollback; reverting Git does not automatically reverse every side effect.",
    ],

    dangerousShortcuts: [
      {
        action: "Force sync immediately",
        risk:
          "May repeat operations or apply changes without correcting the actual runtime problem.",
      },
      {
        action: "Delete every failing Pod",
        risk:
          "Can remove useful evidence and cause repeated crashes without fixing the cause.",
      },
      {
        action: "Delete PVCs to clear health errors",
        risk:
          "Can cause data loss or make stateful recovery more difficult.",
      },
      {
        action: "Disable readiness probes",
        risk:
          "May allow traffic to reach an application that cannot serve requests correctly.",
      },
      {
        action: "Increase all resource limits",
        risk:
          "May worsen cluster pressure or hide an application memory leak.",
      },
      {
        action: "Rollback without dependency checks",
        risk:
          "The previous application may be incompatible with a newer database schema or changed persistent state.",
      },
      {
        action: "Restart Argo CD controllers without evidence",
        risk:
          "May disrupt reconciliation and will not repair an unhealthy application dependency.",
      },
    ],
  },

  prevention: {
    title: "Prevention and operational readiness",

    releaseEngineering: [
      "Validate YAML and rendered manifests in CI.",
      "Validate image references, ports, probes, and configuration references.",
      "Run application startup and smoke tests before promotion.",
      "Test the new application version against compatible dependencies.",
      "Review changes to resource requests, limits, and replica counts.",
      "Test both successful rollout and failed-rollout recovery.",
      "Use controlled image promotion and reproducible release revisions.",
      "Test database migration compatibility and rollback constraints.",
      "Validate Service selectors and ingress routing.",
      "Prevent conflicting deployments to the same Application.",
    ],

    observability: [
      "Monitor application availability and critical business transactions.",
      "Monitor HTTP 5xx rates and request latency.",
      "Monitor ready and available replicas.",
      "Alert on prolonged readiness failures and repeated restarts.",
      "Monitor Pod scheduling failures and OOMKilled events.",
      "Monitor Service endpoint availability.",
      "Monitor database connection failures and dependency latency.",
      "Monitor persistent-volume provisioning and mount failures.",
      "Monitor Argo CD sync failures, health states, and reconciliation delays.",
      "Correlate deployment revisions with application alerts.",
    ],

    alertDesign: [
      {
        signal: "Application Degraded",
        alertWhen:
          "A critical Application remains Degraded beyond its service-specific threshold.",
        response:
          "Include the Application, environment, affected resource, health message, and current revision.",
      },
      {
        signal: "Unavailable replicas",
        alertWhen:
          "Available replicas remain below the required level.",
        response:
          "Include Deployment conditions, ReplicaSet state, Pod events, and recent rollout history.",
      },
      {
        signal: "HTTP 5xx rate",
        alertWhen:
          "The service exceeds its defined error-rate threshold.",
        response:
          "Include affected endpoint, latency, dependency signals, and the deployed revision.",
      },
      {
        signal: "Repeated container restarts",
        alertWhen:
          "Restart count or crash rate exceeds the workload's normal behavior.",
        response:
          "Include Pod events and sanitized current and previous logs.",
      },
      {
        signal: "No Service endpoints",
        alertWhen:
          "A critical Service has no expected ready backends.",
        response:
          "Include Service selectors, Pod labels, readiness, and EndpointSlice state.",
      },
      {
        signal: "Multiple Applications degrade",
        alertWhen:
          "Several Applications become unhealthy within a correlated time window.",
        response:
          "Investigate shared dependencies, cluster health, admission, and Argo CD controllers.",
      },
    ],

    runbookMaintenance: [
      "Keep commands compatible with the installed Kubernetes and Argo CD versions.",
      "Record the actual Argo CD namespace and controller topology.",
      "Document service owners and escalation contacts.",
      "Test recovery procedures in a non-production environment.",
      "Review runbooks after incidents and platform upgrades.",
      "Do not store production credentials or secret values in runbooks.",
    ],
  },

  operationalRunbook: {
    title: "On-call runbook",

    firstFiveMinutes: [
      "Confirm the Application and production environment.",
      "Check customer impact and critical endpoint availability.",
      "Capture the Argo CD health message and deployed revision.",
      "Identify the unhealthy resource.",
      "Inspect its conditions and recent events.",
      "Check whether a rollout or sync is still active.",
      "Avoid blind retries, force operations, and deletion.",
    ],

    nextFifteenMinutes: [
      "Inspect Deployment, ReplicaSet, and Pod state.",
      "Read relevant container logs.",
      "Check Service endpoints and ingress routing.",
      "Investigate dependencies based on observed errors.",
      "Compare the current revision with the last healthy revision.",
      "Agree on a controlled fix or rollback with the responsible owner.",
    ],

    beforeClosing: [
      "Confirm expected Argo CD resource health.",
      "Confirm required replicas are available.",
      "Verify Service endpoints and external routing.",
      "Run approved smoke tests and critical business checks.",
      "Confirm service-level metrics have recovered.",
      "Document root cause, recovery, and residual risks.",
      "Assign preventive actions.",
    ],

    escalation: [
      {
        team: "Application team",
        when:
          "Startup exceptions, application bugs, configuration errors, or readiness behavior are responsible.",
      },
      {
        team: "Database or dependency owner",
        when:
          "Database availability, connection limits, authentication, or external dependency failures are implicated.",
      },
      {
        team: "Kubernetes platform team",
        when:
          "Scheduling, capacity, storage, networking, admission, or API health is implicated.",
      },
      {
        team: "Argo CD / GitOps team",
        when:
          "Application reconciliation, resource health assessment, or controller behavior is implicated.",
      },
      {
        team: "Security team",
        when:
          "RBAC, admission policy, image trust, or security controls are implicated.",
      },
    ],
  },

  incidentReportTemplate: {
    fields: [
      "Incident ID",
      "Detection timestamp",
      "Environment and cluster",
      "Argo CD Application",
      "Repository and Git revision",
      "Affected resources",
      "Severity and customer impact",
      "Sync status and health status",
      "Relevant events and log evidence",
      "Application metrics and endpoint results",
      "Recent changes",
      "Confirmed root cause",
      "Contributing factors",
      "Recovery or rollback action",
      "Verification evidence",
      "Remaining risk",
      "Preventive actions",
      "Action owner and due date",
    ],

    exampleRootCause:
      "The Application was Synced but Degraded because the new Deployment's Pods failed readiness checks. Sanitized logs showed a missing required configuration key introduced by the latest revision. The Service therefore had fewer ready endpoints, causing elevated HTTP 5xx responses.",

    writingGuidance:
      "Document the causal mechanism and evidence, not just the status label. Record which checks established the cause, which recovery action was taken, and how the team verified the real service recovered.",
  },

  interviewQuestions: [
    {
      question: "What does Degraded mean in Argo CD?",
      answer:
        "It means that a resource or applicable health assessment reports an unhealthy state. The engineer should identify the specific resource and investigate its conditions, events, logs, and dependencies.",
    },
    {
      question: "Can an Application be Synced but Degraded?",
      answer:
        "Yes. Synced compares desired and live state. Degraded reflects health. Kubernetes may accept the manifests while the resulting application fails at runtime.",
    },
    {
      question: "How do you troubleshoot an unhealthy Application?",
      answer:
        "Confirm impact, inspect Application status, identify the unhealthy resource, examine its conditions and events, read logs, check dependencies, compare revisions, fix the confirmed cause, and verify actual service behavior.",
    },
    {
      question: "What is the difference between Running and Ready Pods?",
      answer:
        "Running describes the Pod's phase. Ready indicates whether the Pod satisfies its readiness conditions for serving traffic. A Running Pod can still be unavailable.",
    },
    {
      question: "Why can a Service have no endpoints?",
      answer:
        "Its selector may not match Pod labels, Pods may be absent, or the matching Pods may not be eligible as ready endpoints. Check selectors, labels, readiness, and EndpointSlices.",
    },
    {
      question: "How do you investigate CrashLoopBackOff?",
      answer:
        "Describe the Pod, inspect events and restart counts, read current and previous logs, and compare image and configuration changes. Fix the actual startup or runtime cause.",
    },
    {
      question: "How do you distinguish an application problem from an ingress problem?",
      answer:
        "Compare approved internal application or Service tests with external requests. If internal requests work but external traffic fails, investigate ingress, gateway, TLS, routing, and upstream configuration.",
    },
    {
      question: "What does ProgressDeadlineExceeded mean?",
      answer:
        "The Deployment failed to make sufficient rollout progress within its configured progress deadline. Inspect Pods, scheduling, readiness, startup, and dependencies to determine why.",
    },
    {
      question: "When should you roll back an Application?",
      answer:
        "Rollback is appropriate when evidence indicates that reverting is the safest approved recovery. Check partial changes, database compatibility, persistent data, and the current operation before doing so.",
    },
    {
      question: "Should you delete unhealthy Pods immediately?",
      answer:
        "No. First capture evidence and identify the cause. A replacement Pod may fail in the same way, and deletion can remove useful diagnostic information.",
    },
    {
      question: "What if multiple Applications become Degraded simultaneously?",
      answer:
        "Look for shared failures such as the Kubernetes API, node capacity, storage, admission webhooks, networking, common databases, or Argo CD controllers.",
    },
    {
      question: "How do you verify recovery?",
      answer:
        "Check resource health, available replicas, Service endpoints, external routing, application smoke tests, error rates, latency, and critical business transactions.",
    },
    {
      question: "Does Healthy in Argo CD guarantee the application works?",
      answer:
        "No. Health assessments are useful signals but may not cover all business functions or external dependencies. Application-level monitoring and tests are also required.",
    },
    {
      question: "How do you prevent recurring unhealthy deployments?",
      answer:
        "Use CI validation, realistic probes, dependency checks, release testing, resource-capacity monitoring, health alerts, controlled promotion, and tested recovery runbooks.",
    },
  ] satisfies UnhealthyAppInterviewQuestion[],

  handsOnExercises: [
    {
      title: "Exercise 1: Diagnose Synced but Degraded",
      objective:
        "Trace an unhealthy Deployment from the Application to its Pod.",
      tasks: [
        "Use a non-production Application.",
        "Inspect sync status and health status.",
        "Identify the unhealthy resource.",
        "Inspect Deployment conditions, Pod events, and logs.",
        "Compare the deployed revision with the previous healthy revision.",
        "Write a root-cause statement supported by evidence.",
      ],
      expectedOutcome:
        "A short incident report identifies the resource, the failure mechanism, and the safest next action.",
    },
    {
      title: "Exercise 2: Diagnose missing Service endpoints",
      objective:
        "Understand why running Pods may not receive traffic.",
      tasks: [
        "Inspect Service selectors.",
        "Inspect Pod labels and readiness.",
        "Review Endpoints and EndpointSlices.",
        "Compare Service ports with the container listener.",
        "Validate a correction in a test environment.",
      ],
      expectedOutcome:
        "The Service has the expected ready backends and approved connectivity tests pass.",
    },
    {
      title: "Exercise 3: Investigate dependency failure",
      objective:
        "Distinguish an application defect from a shared dependency incident.",
      tasks: [
        "Inspect sanitized application logs.",
        "Correlate the first error with dependency telemetry.",
        "Check approved DNS and connectivity tests.",
        "Compare other Applications using the same dependency.",
        "Document the evidence and escalation decision.",
      ],
      expectedOutcome:
        "The incident report identifies whether the failure is local to one workload or shared across services.",
    },
    {
      title: "Exercise 4: Validate safe rollback",
      objective:
        "Practice a controlled recovery without risking production.",
      tasks: [
        "Use a disposable test environment.",
        "Deploy a deliberately unhealthy application revision.",
        "Capture the failure evidence.",
        "Compare the current and last known healthy revisions.",
        "Check configuration and migration compatibility.",
        "Execute the approved test recovery procedure.",
        "Verify resources and application behavior.",
      ],
      expectedOutcome:
        "The recovery procedure includes validation, approval checkpoints, and observable success criteria.",
    },
  ],

  troubleshootingChecklist: [
    "Correct cluster and Application confirmed",
    "Environment and severity assessed",
    "Customer impact evaluated",
    "Current and intended Git revisions recorded",
    "Sync and health statuses captured",
    "Unhealthy resource identified",
    "Deployment and ReplicaSet conditions reviewed",
    "Pod events and logs captured",
    "Service endpoints and routing checked",
    "Dependencies investigated",
    "Recent manifest changes reviewed",
    "Root cause confirmed with evidence",
    "Recovery approved",
    "Data and rollback risks assessed",
    "Resource health verified",
    "Application smoke tests passed",
    "Service metrics recovered",
    "Incident report completed",
    "Preventive actions assigned",
  ],

  bestPractices: [
    "Treat Application health as a signal, not a complete root-cause diagnosis.",
    "Assess customer impact before choosing a technical recovery.",
    "Use read-only diagnostics first.",
    "Investigate the specific unhealthy resource rather than restarting everything.",
    "Correlate events, logs, metrics, and Git history.",
    "Check both desired state and actual runtime behavior.",
    "Never expose credentials or Secret values in diagnostics.",
    "Avoid deleting stateful resources during initial investigation.",
    "Use approved GitOps changes for managed resources.",
    "Validate rollback compatibility before reverting a release.",
    "Verify the full request path after recovery.",
    "Improve alerts and runbooks after recurring incidents.",
  ],

  finalSummary:
    "An unhealthy Argo CD Application requires investigation of both GitOps state and real runtime behavior. Identify the unhealthy resource, follow the evidence through Pods, Services, routing, and dependencies, and confirm the root cause before changing production. Recovery is complete only when the required resources are healthy and the application's important user-facing functions work correctly.",
} satisfies {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  summary: string;
  overview: {
    whatIsIt: string;
    whyItMatters: string;
    keyDistinctions: { term: string; explanation: string }[];
    healthAssessment: string;
    investigationPrinciples: string[];
  };
  incidentScenario: {
    title: string;
    environment: string;
    symptoms: string[];
    businessImpact: string[];
    exampleArchitecture: { component: string; responsibility: string }[];
    firstResponse: string;
  };
  severityAssessment: {
    levels: { level: string; indicators: string[]; actions: string[] }[];
    questions: string[];
  };
  productionWorkflow: {
    step: number;
    title: string;
    actions: string[];
    successCriteria: string;
  }[];
  diagnostics: UnhealthyAppDiagnostic[];
  rootCauses: UnhealthyAppRootCause[];
  incidentScenarios: UnhealthyAppIncidentScenario[];
  diagnosticDecisionTree: {
    question: string;
    yes: string;
    no: string;
  }[];
  safeRecoveryProcedure: {
    title: string;
    beforeChangingAnything: string[];
    recoverySteps: { step: number; action: string; reason: string }[];
    rollbackGuidance: string[];
    dangerousShortcuts: { action: string; risk: string }[];
  };
  prevention: {
    title: string;
    releaseEngineering: string[];
    observability: string[];
    alertDesign: { signal: string; alertWhen: string; response: string }[];
    runbookMaintenance: string[];
  };
  operationalRunbook: {
    title: string;
    firstFiveMinutes: string[];
    nextFifteenMinutes: string[];
    beforeClosing: string[];
    escalation: { team: string; when: string }[];
  };
  incidentReportTemplate: {
    fields: string[];
    exampleRootCause: string;
    writingGuidance: string;
  };
  interviewQuestions: UnhealthyAppInterviewQuestion[];
  handsOnExercises: {
    title: string;
    objective: string;
    tasks: string[];
    expectedOutcome: string;
  }[];
  troubleshootingChecklist: string[];
  bestPractices: string[];
  finalSummary: string;
};

export default unhealthyAppsGuide;
