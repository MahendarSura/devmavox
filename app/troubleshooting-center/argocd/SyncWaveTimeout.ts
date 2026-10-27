export interface SyncWaveDiagnostic {
  id: number;
  title: string;
  objective: string;
  commands: string[];
  interpretOutput: string[];
  nextStep: string;
  safetyNote?: string;
}

export interface SyncWaveRootCause {
  cause: string;
  symptoms: string[];
  confirmation: string[];
  resolution: string[];
  prevention: string[];
}

export interface SyncWaveIncidentScenario {
  title: string;
  environment: string;
  symptoms: string[];
  timeline: string[];
  investigation: string[];
  rootCause: string;
  recovery: string[];
  verification: string[];
}

export interface SyncWaveInterviewQuestion {
  question: string;
  answer: string;
}

export const syncWaveTimeoutGuide = {
  title: "Argo CD Sync Wave Timeout",
  slug: "sync-wave-timeout",

  category: "Argo CD",
  difficulty: "Advanced",
  estimatedTime: "60–90 minutes",

  summary:
    "A production-focused troubleshooting guide for Argo CD deployments that stall, fail, or time out while processing sync waves, hooks, health checks, and dependent Kubernetes resources.",

  overview: {
    whatIsIt:
      "Argo CD Sync Waves allow Kubernetes resources to be applied in a controlled order. Resources are assigned wave numbers using the argocd.argoproj.io/sync-wave annotation. Lower-numbered waves are processed before higher-numbered waves. Resources in the same wave may be processed together, so a wave is not necessarily a strict one-resource-at-a-time sequence.",

    whyItMatters:
      "Production applications often depend on infrastructure, namespaces, service accounts, configuration, database migrations, application deployments, and traffic-routing resources. If an earlier wave fails to become healthy, Argo CD may not proceed to later waves. A single slow or unhealthy resource can therefore block an entire deployment.",

    importantDistinction: [
      {
        term: "Sync operation timeout",
        explanation:
          "The overall sync operation exceeded a configured or effective time limit. Identify the actual timeout source instead of assuming every sync failure is a wave timeout.",
      },
      {
        term: "Wave progression blocked",
        explanation:
          "Argo CD is waiting for resources in an earlier wave to satisfy its progression and health requirements before continuing.",
      },
      {
        term: "Resource health timeout",
        explanation:
          "A resource was applied, but it did not reach the health state required for progression. Examples include a Deployment with unavailable replicas or a Job that never completes.",
      },
      {
        term: "Hook timeout",
        explanation:
          "A PreSync, Sync, or PostSync hook failed or remained incomplete. Hook failures can prevent the operation from finishing.",
      },
      {
        term: "Kubernetes scheduling or startup delay",
        explanation:
          "A resource is waiting on Kubernetes scheduling, image downloads, volume attachment, application startup, readiness probes, or another dependency.",
      },
      {
        term: "Application controller or API delay",
        explanation:
          "The Kubernetes API, Argo CD application controller, repo-server, or related component is slow, unhealthy, or unable to complete its work.",
      },
    ],

    howWavesWork: [
      "Argo CD obtains the desired manifests from the configured source.",
      "It identifies resource ordering, including sync phases, waves, and dependencies.",
      "Resources in the earliest applicable wave are applied.",
      "Argo CD evaluates resource health and determines whether progression can continue.",
      "If a resource remains unhealthy, later waves can remain blocked.",
      "When earlier resources satisfy the progression requirements, Argo CD processes subsequent waves.",
      "Hooks and PostSync actions may add additional execution and health requirements.",
      "The operation completes only after its required synchronization and hook processing finishes.",
    ],

    keyConcepts: [
      {
        concept: "Sync phase",
        detail:
          "PreSync hooks run before the normal Sync phase. Sync resources are applied during the Sync phase. PostSync hooks run after the required synchronization and health conditions are met.",
      },
      {
        concept: "Sync wave",
        detail:
          "The argocd.argoproj.io/sync-wave annotation determines ordering within a phase. Lower numbers run earlier. Unannotated resources normally belong to wave 0.",
      },
      {
        concept: "Health assessment",
        detail:
          "Argo CD health assessments help determine whether resources are ready for progression. A Kubernetes object existing in the API does not automatically mean it is healthy.",
      },
      {
        concept: "Wave delay",
        detail:
          "Argo CD can insert a delay between waves. The ARGOCD_SYNC_WAVE_DELAY setting is relevant when diagnosing configured wave delays, controller behavior, or health-assessment timing. Do not assume it is the cause without evidence.",
      },
      {
        concept: "Application operation",
        detail:
          "The Application status and operation state provide evidence about the active or last sync, the phase, and reported errors. They must be correlated with resource status and Kubernetes events.",
      },
    ],
  },

  incidentScenario: {
    title: "Production deployment stalls after the database migration wave",

    environment:
      "Production Kubernetes cluster managed by Argo CD. The application is deployed using GitOps manifests and multiple sync waves.",

    symptoms: [
      "The Argo CD sync operation remains running or eventually fails.",
      "The database migration Job remains incomplete.",
      "Application Deployment resources in later waves are not progressing.",
      "The pipeline reports a timeout.",
      "The previous application version may still be serving traffic.",
      "Some resources may already have been applied before the failure.",
    ],

    expectedArchitecture: [
      {
        wave: "-2",
        resources: "Namespace, service accounts, required baseline configuration",
        expectation:
          "Required prerequisites exist and are available before dependent resources are applied.",
      },
      {
        wave: "-1",
        resources: "Database migration Job or migration hook",
        expectation:
          "The migration completes successfully and produces the expected result.",
      },
      {
        wave: "0",
        resources: "Application Deployment and supporting services",
        expectation:
          "The application rollout reaches the expected health state.",
      },
      {
        wave: "1",
        resources: "Ingress, traffic routing, or dependent integration resources",
        expectation:
          "Traffic is enabled only after the required application resources are healthy.",
      },
    ],

    workflow:
      "These wave values are illustrative. Actual ordering depends on the repository manifests, hook phases, and resource annotations. Diagnose the real configured sequence rather than assuming that every project uses this layout.",

    realWorldRisk: [
      "The database migration might have partially completed.",
      "The application may still be serving traffic while the deployment is blocked.",
      "A retry could execute a migration twice if the migration is not safely repeatable.",
      "A rollout may have changed some resources even though the overall operation failed.",
      "A forced sync or prune may cause additional damage.",
      "A pipeline timeout does not prove that the Kubernetes operation stopped.",
    ],
  },

  severityAssessment: {
    title: "Impact and severity assessment",

    levels: [
      {
        level: "SEV-1 / Critical",
        conditions: [
          "Production application is unavailable across a major user population.",
          "Data integrity is at immediate risk.",
          "A migration or deployment is causing widespread service failure.",
          "Critical customer-facing traffic is disrupted.",
        ],
        action:
          "Activate the incident process, notify the responsible production owners, preserve evidence, and follow the approved recovery or rollback plan.",
      },
      {
        level: "SEV-2 / High",
        conditions: [
          "A critical production deployment is blocked.",
          "A significant feature or service is unavailable.",
          "A dependency is degraded and affecting production traffic.",
        ],
        action:
          "Assign an incident owner, assess the affected service, and prioritize diagnosis and a controlled recovery.",
      },
      {
        level: "SEV-3 / Medium",
        conditions: [
          "A non-critical deployment is blocked.",
          "The current service remains healthy.",
          "A development or staging release is delayed.",
        ],
        action:
          "Investigate the blocked resource and correct the cause before attempting another deployment.",
      },
      {
        level: "SEV-4 / Low",
        conditions: [
          "A test environment has a non-urgent sync-wave issue.",
          "There is no immediate user impact.",
        ],
        action:
          "Collect evidence, reproduce safely, and add regression checks.",
      },
    ],

    questionsToAsk: [
      "Which exact Argo CD Application is affected?",
      "Is the affected environment development, staging, or production?",
      "Which Git revision is currently intended for deployment?",
      "Which revision was deployed before this incident?",
      "Which wave, phase, and resource are blocking progress?",
      "Did any earlier resources apply successfully?",
      "Is the currently running application still serving traffic?",
      "Is the database migration reversible, repeatable, or partially applied?",
      "Is the sync operation still active after the CI pipeline timed out?",
      "Was a recent repository, configuration, infrastructure, or cluster change made?",
      "Is the issue isolated to one Application or affecting multiple Applications?",
    ],
  },

  productionWorkflow: [
    {
      step: 1,
      title: "Incident detection and initial confirmation",
      actions: [
        "Capture the exact error from the deployment pipeline.",
        "Record the first failure timestamp and the time the timeout was reported.",
        "Identify the Application, cluster, namespace, environment, and intended Git revision.",
        "Check whether the pipeline timed out independently of the Argo CD operation.",
        "Identify whether this is a new failure or a repeated failure from earlier deployments.",
      ],
      successCriteria:
        "The affected Application and deployment revision are known, and the incident is reproducible or supported by evidence.",
    },
    {
      step: 2,
      title: "Assess impact and severity",
      actions: [
        "Check production availability and user impact.",
        "Identify whether earlier waves changed production resources.",
        "Check application and database health independently of sync status.",
        "Determine whether a migration, rollout, or traffic change is in progress.",
        "Notify the responsible service owner when production risk is significant.",
      ],
      successCriteria:
        "The team understands whether this is a blocked release, an active outage, or a data-integrity risk.",
    },
    {
      step: 3,
      title: "Perform safety checks",
      actions: [
        "Confirm the target Kubernetes context and cluster.",
        "Confirm the exact Argo CD Application and destination namespace.",
        "Verify the repository, branch or revision, and intended deployment.",
        "Check for active sync operations or another deployment running concurrently.",
        "Confirm production change approval and rollback ownership.",
        "Avoid blind sync retries, force operations, resource deletion, and pruning.",
      ],
      successCriteria:
        "All diagnostic commands target the intended environment, and recovery actions have the required approval.",
    },
    {
      step: 4,
      title: "Collect evidence before changing anything",
      actions: [
        "Save pipeline logs and timestamps.",
        "Capture Application status and operation state.",
        "Capture the reported wave, hook, and resource errors.",
        "Inspect the affected Kubernetes objects, pod conditions, and events.",
        "Capture logs from the affected Job, Pod, or application container.",
        "Record the intended Git revision and relevant manifest changes.",
        "Preserve evidence before restarting or deleting resources.",
      ],
      successCriteria:
        "The initial state is recorded so the team can distinguish the original failure from the result of recovery.",
    },
    {
      step: 5,
      title: "Run diagnostics in dependency order",
      actions: [
        "Inspect Application-level sync and health status.",
        "Identify the earliest blocked phase and wave.",
        "Inspect all resources in the blocked wave.",
        "Check resource health, conditions, and Kubernetes events.",
        "Inspect Job completion, Deployment availability, and Pod startup.",
        "Check resource dependencies, permissions, admission, storage, and cluster capacity.",
        "Inspect Argo CD controller logs only when resource-level evidence points to controller behavior or the source of the reported error remains unclear.",
      ],
      successCriteria:
        "The investigation narrows the problem to a specific resource, dependency, controller behavior, or configured timeout.",
    },
    {
      step: 6,
      title: "Isolate the root cause",
      actions: [
        "Form a hypothesis based on actual command output.",
        "Separate a slow resource from a failed resource.",
        "Distinguish scheduling, image pulling, startup, readiness, and Job execution failures.",
        "Check whether the issue is limited to one resource or affects multiple resources.",
        "Compare the current desired state with the last known healthy revision.",
        "Use a controlled test or approved non-production reproduction where necessary.",
      ],
      successCriteria:
        "A specific cause is supported by evidence instead of assumptions based only on the word timeout.",
    },
    {
      step: 7,
      title: "Fix and recover safely",
      actions: [
        "Choose a correction that directly addresses the confirmed cause.",
        "Review the intended manifest changes and operational risk.",
        "Check whether a migration or other one-time operation can safely run again.",
        "Apply changes through the approved GitOps workflow whenever possible.",
        "Perform an approved retry only after confirming the current operation state.",
        "Use rollback only after checking database compatibility and the consequences of reverting the previous revision.",
      ],
      successCriteria:
        "The fix addresses the actual cause without creating an uncontrolled second deployment or unsafe data change.",
    },
    {
      step: 8,
      title: "Verify recovery",
      actions: [
        "Confirm the sync operation completes.",
        "Confirm expected resources are synchronized.",
        "Confirm all required waves and hooks complete.",
        "Confirm Deployments, Pods, Jobs, Services, and application endpoints are healthy.",
        "Run appropriate smoke tests and business-critical checks.",
        "Verify that the previous failure is no longer present in current events and logs.",
        "Confirm production traffic and error rates have returned to expected levels.",
      ],
      successCriteria:
        "Both the GitOps operation and the actual application behavior are healthy.",
    },
    {
      step: 9,
      title: "Prevent recurrence and close the incident",
      actions: [
        "Record the root cause and the evidence that confirmed it.",
        "Add manifest validation and dependency checks to CI.",
        "Add monitoring for blocked sync operations and unhealthy workloads.",
        "Improve Job retry behavior, deadlines, and observability where appropriate.",
        "Document recovery, rollback limitations, and escalation contacts.",
        "Create a post-incident action list with owners and due dates.",
      ],
      successCriteria:
        "The incident is documented, monitoring is improved, and preventive actions have clear owners.",
    },
  ],

  diagnostics: [
    {
      id: 1,
      title: "Confirm the current Kubernetes context",
      objective:
        "Prevent diagnostics or recovery actions from targeting the wrong cluster.",

      commands: [
        "kubectl config current-context",
        "kubectl config get-contexts",
        "kubectl cluster-info",
      ],

      interpretOutput: [
        "The current context should match the intended cluster.",
        "A valid context name does not guarantee that it points to the correct production environment.",
        "A cluster-info error may indicate authentication, network, API server, or context problems.",
      ],

      nextStep:
        "Confirm the cluster identity with the team's approved environment information before continuing.",
    },

    {
      id: 2,
      title: "Inspect the Argo CD Application",
      objective:
        "Find the Application's sync status, health status, destination, revision, and reported errors.",

      commands: [
        "argocd app list",
        "argocd app get <application-name>",
        "argocd app history <application-name>",
      ],

      interpretOutput: [
        "OutOfSync indicates that the desired and live states differ; it does not alone prove a timeout.",
        "Degraded indicates an unhealthy resource or health assessment.",
        "An operation phase of Running can indicate that the operation is still in progress.",
        "An error or failed operation can identify the resource or phase where the sync failed.",
        "Application history helps compare revisions and identify the last known healthy deployment.",
      ],

      nextStep:
        "Record the exact destination, revision, sync status, health status, operation phase, and resource-specific message.",

      safetyNote:
        "Use the correct Argo CD account and project. Do not run sync, rollback, or termination commands merely to inspect the Application.",
    },

    {
      id: 3,
      title: "Inspect Application status directly",
      objective:
        "Obtain structured status and operation information from the Kubernetes Application object.",

      commands: [
        "kubectl get applications.argoproj.io -A",
        "kubectl -n argocd get application <application-name> -o yaml",
        "kubectl -n argocd get application <application-name> -o jsonpath='{.status.sync.status}{\"\\n\"}{.status.health.status}{\"\\n\"}{.status.operationState.phase}{\"\\n\"}{.status.operationState.message}{\"\\n\"}'",
      ],

      interpretOutput: [
        "The Application namespace may not be argocd in every installation; use the actual namespace.",
        "The operation state can contain the phase and message of the latest operation.",
        "Resource-level status can identify the object associated with the failure.",
        "The operation message may be missing or incomplete, so correlate it with resource events and logs.",
      ],

      nextStep:
        "Identify the earliest reported failure and inspect the corresponding resource in the correct destination namespace.",
    },

    {
      id: 4,
      title: "Identify the actual sync-wave annotations",
      objective:
        "Confirm the real ordering instead of assuming a fixed sequence of wave numbers.",

      commands: [
        "kubectl -n <destination-namespace> get deployment,service,job,configmap -o yaml",
        "kubectl -n <destination-namespace> get deployment <deployment-name> -o jsonpath='{.metadata.annotations.argoproj\\.io/sync-wave}{\"\\n\"}'",
        "git grep -n 'argocd.argoproj.io/sync-wave' -- '*.yaml' '*.yml'",
      ],

      interpretOutput: [
        "A missing annotation normally means the resource belongs to wave 0.",
        "Negative waves are processed before wave 0 within the applicable ordering rules.",
        "The same wave can contain multiple resources, and those resources may progress concurrently.",
        "A wave annotation determines ordering; it does not guarantee that the resource will become healthy.",
        "The kubectl command inspects live resources, while git grep inspects the checked-out repository. They can differ.",
      ],

      nextStep:
        "Compare the intended manifest wave assignments with the live objects and identify the earliest blocked resource.",
    },

    {
      id: 5,
      title: "Inspect the blocked resources",
      objective:
        "Determine which objects have been created, updated, or left unhealthy.",

      commands: [
        "kubectl -n <destination-namespace> get all",
        "kubectl -n <destination-namespace> get events --sort-by=.metadata.creationTimestamp",
        "kubectl -n <destination-namespace> get deployment,job,pod -o wide",
      ],

      interpretOutput: [
        "A resource can exist even when it is unhealthy.",
        "A Deployment with zero available replicas may block progression.",
        "A Job with no completion timestamp may still be running or may be unable to start.",
        "Events such as FailedScheduling, FailedMount, BackOff, or FailedCreate provide more specific evidence.",
        "The get all command does not include every Kubernetes resource type.",
      ],

      nextStep:
        "Choose the affected resource type and inspect its conditions, events, and logs.",
    },

    {
      id: 6,
      title: "Inspect Deployment rollout status",
      objective:
        "Determine whether a Deployment has reached its desired number of available replicas.",

      commands: [
        "kubectl -n <destination-namespace> describe deployment <deployment-name>",
        "kubectl -n <destination-namespace> rollout status deployment/<deployment-name> --timeout=30s",
        "kubectl -n <destination-namespace> get deployment <deployment-name> -o yaml",
      ],

      interpretOutput: [
        "The rollout status command's timeout limits how long the diagnostic command waits; it does not automatically repair the Deployment.",
        "ProgressDeadlineExceeded indicates that the Deployment failed to make sufficient rollout progress within its configured progress deadline.",
        "Unavailable replicas can result from scheduling, startup, readiness, capacity, or dependency failures.",
        "Check the observed generation, desired replicas, updated replicas, ready replicas, and available replicas.",
      ],

      nextStep:
        "Inspect the new ReplicaSet and its Pods to determine why replicas are not becoming available.",
    },

    {
      id: 7,
      title: "Inspect Pod scheduling and startup",
      objective:
        "Determine whether the Pod is pending, pulling an image, starting a container, or failing readiness.",

      commands: [
        "kubectl -n <destination-namespace> get pods -o wide",
        "kubectl -n <destination-namespace> describe pod <pod-name>",
        "kubectl -n <destination-namespace> get pod <pod-name> -o yaml",
      ],

      interpretOutput: [
        "Pending may indicate scheduling constraints, unavailable capacity, unbound storage, or admission-related problems.",
        "ImagePullBackOff indicates repeated image-pull failure.",
        "CrashLoopBackOff indicates repeated container restarts; inspect the previous container logs.",
        "ContainerCreating can involve image pulls, volumes, network setup, or runtime operations.",
        "Readiness probe failures can prevent a Pod from becoming ready even if its process is running.",
      ],

      nextStep:
        "Use the Pod conditions, container states, events, and logs to isolate the exact startup failure.",
    },

    {
      id: 8,
      title: "Investigate Kubernetes events",
      objective:
        "Find the earliest concrete explanation for why a resource cannot progress.",

      commands: [
        "kubectl -n <destination-namespace> get events --sort-by=.metadata.creationTimestamp",
        "kubectl -n <destination-namespace> describe pod <pod-name>",
        "kubectl -n <destination-namespace> describe job <job-name>",
      ],

      interpretOutput: [
        "FailedScheduling often indicates resource pressure, affinity, taints, or other scheduling constraints.",
        "FailedMount indicates a volume, secret, ConfigMap, or storage dependency problem.",
        "FailedCreate can indicate admission, quota, or controller-related issues.",
        "Probe failures indicate that the configured health check did not succeed.",
        "Events are time-limited and may be aggregated; absence of an event does not prove that no failure occurred.",
      ],

      nextStep:
        "Match the event timestamp to the failed operation and investigate the resource or dependency named in the event.",
    },

    {
      id: 9,
      title: "Investigate a migration or hook Job",
      objective:
        "Determine whether a migration or hook is blocking the next wave.",

      commands: [
        "kubectl -n <destination-namespace> get jobs",
        "kubectl -n <destination-namespace> describe job <job-name>",
        "kubectl -n <destination-namespace> get pods -l job-name=<job-name>",
        "kubectl -n <destination-namespace> logs job/<job-name> --all-containers=true",
      ],

      interpretOutput: [
        "A Job that has not reached its required completion state may prevent subsequent work from progressing.",
        "A Job can remain active while its Pod is pending, restarting, or waiting on an external dependency.",
        "A failed migration may have changed part of the database before returning an error.",
        "A Job with backoffLimit exceeded has exhausted its configured retry allowance.",
        "A missing Job can mean it was never created, was cleaned up, or has a different name or namespace.",
      ],

      nextStep:
        "Check the Job specification, logs, completion conditions, and external dependencies. Confirm migration safety before retrying.",

      safetyNote:
        "Do not delete or rerun a production migration Job until the database state and migration repeatability have been assessed.",
    },

    {
      id: 10,
      title: "Read current and previous container logs",
      objective:
        "Find application startup failures, migration errors, and dependency timeouts.",

      commands: [
        "kubectl -n <destination-namespace> logs <pod-name> --all-containers=true --tail=200",
        "kubectl -n <destination-namespace> logs <pod-name> -c <container-name> --previous --tail=200",
      ],

      interpretOutput: [
        "Connection refused can indicate that a dependency is not listening at the expected endpoint.",
        "Connection timeout may indicate routing, firewall, DNS, endpoint, or overloaded-service issues.",
        "Authentication errors suggest credential or permission problems.",
        "Database schema errors can indicate migration ordering or version incompatibility.",
        "The --previous option is useful when the current container has restarted and previous logs are available.",
      ],

      nextStep:
        "Correlate the log timestamp with Pod events, deployment changes, and dependency health. Redact secrets before sharing logs.",
    },

    {
      id: 11,
      title: "Check resource requests, limits, and capacity",
      objective:
        "Determine whether a Pod is waiting because the cluster cannot schedule it.",

      commands: [
        "kubectl -n <destination-namespace> describe pod <pod-name>",
        "kubectl describe nodes",
        "kubectl top nodes",
        "kubectl -n <destination-namespace> top pods",
      ],

      interpretOutput: [
        "Insufficient cpu or memory in scheduling events indicates that the Pod cannot currently fit on eligible nodes.",
        "Node allocatable capacity is not the same as current observed CPU or memory usage.",
        "A Pod may remain unschedulable because of affinity, taints, topology constraints, or persistent-volume placement even when overall cluster usage appears low.",
        "kubectl top requires a functioning metrics pipeline and may not be available in every cluster.",
      ],

      nextStep:
        "Compare requests, node allocatable capacity, placement constraints, and the cluster's scaling policy before changing resource settings.",
    },

    {
      id: 12,
      title: "Check namespace quotas and limits",
      objective:
        "Find quota or LimitRange constraints preventing a workload from being created or scheduled.",

      commands: [
        "kubectl -n <destination-namespace> get resourcequota",
        "kubectl -n <destination-namespace> describe resourcequota",
        "kubectl -n <destination-namespace> get limitrange",
        "kubectl -n <destination-namespace> describe limitrange",
      ],

      interpretOutput: [
        "A quota at its hard limit can prevent new Pods or other resources from being created.",
        "A LimitRange can impose defaults or constraints on container requests and limits.",
        "Quota errors may appear in admission messages or events.",
      ],

      nextStep:
        "Identify the exhausted quota or violated constraint. Request an approved capacity or configuration change rather than removing controls blindly.",
    },

    {
      id: 13,
      title: "Inspect persistent-volume dependencies",
      objective:
        "Determine whether a workload is waiting for storage.",

      commands: [
        "kubectl -n <destination-namespace> get pvc",
        "kubectl -n <destination-namespace> describe pvc <pvc-name>",
        "kubectl get pv",
        "kubectl -n <destination-namespace> describe pod <pod-name>",
      ],

      interpretOutput: [
        "A Pending PVC may indicate storage-class, capacity, access-mode, or provisioning problems.",
        "A FailedMount event can indicate attachment, mount, permissions, or storage-system problems.",
        "A volume may be bound but still fail to attach or mount on the target node.",
      ],

      nextStep:
        "Inspect the storage class, PVC events, provisioner health, volume topology, and attachment status before modifying storage.",
    },

    {
      id: 14,
      title: "Check Services, endpoints, and application dependencies",
      objective:
        "Identify a workload that is running but cannot become ready because a dependency is unavailable.",

      commands: [
        "kubectl -n <destination-namespace> get services",
        "kubectl -n <destination-namespace> get endpoints",
        "kubectl -n <destination-namespace> get endpointslices",
        "kubectl -n <destination-namespace> describe service <service-name>",
      ],

      interpretOutput: [
        "A Service with no ready endpoints may indicate that matching Pods are absent or not ready.",
        "A successful Deployment rollout does not guarantee that the application can reach a database, message broker, or external API.",
        "EndpointSlice output can provide additional information about the backends registered for a Service.",
      ],

      nextStep:
        "Inspect selectors, labels, readiness, network policies, DNS, and the health of the actual dependency.",
    },

    {
      id: 15,
      title: "Check admission and policy failures",
      objective:
        "Determine whether Kubernetes admission controls are rejecting the resources.",

      commands: [
        "kubectl -n <destination-namespace> get events --sort-by=.metadata.creationTimestamp",
        "kubectl -n <destination-namespace> describe <resource-type> <resource-name>",
        "kubectl get validatingwebhookconfigurations",
        "kubectl get mutatingwebhookconfigurations",
      ],

      interpretOutput: [
        "A policy denial can identify a missing security setting, invalid image source, or prohibited configuration.",
        "Webhook timeout errors can indicate an unavailable webhook service or a network problem.",
        "An admission rejection is different from a Pod that was successfully created but failed at runtime.",
      ],

      nextStep:
        "Inspect the exact rejection message and the responsible policy or webhook. Make the smallest approved compliant correction.",
    },

    {
      id: 16,
      title: "Check service-account permissions",
      objective:
        "Determine whether a controller or workload lacks the permissions needed to complete its task.",

      commands: [
        "kubectl -n <destination-namespace> get serviceaccount",
        "kubectl -n <destination-namespace> describe serviceaccount <service-account-name>",
        "kubectl auth can-i get secrets -n <destination-namespace> --as=system:serviceaccount:<destination-namespace>:<service-account-name>",
      ],

      interpretOutput: [
        "A 'no' result indicates that the tested identity does not have the requested permission.",
        "The test evaluates only the specific action, resource, namespace, and identity provided.",
        "A service-account permission failure may prevent a workload from accessing a dependency or completing a migration.",
      ],

      nextStep:
        "Verify the actual identity and required permissions. Request a least-privilege RBAC change rather than granting broad administrator access.",

      safetyNote:
        "Impersonation checks require sufficient privileges. Use approved diagnostic access and never expose credentials.",
    },

    {
      id: 17,
      title: "Check CRDs and API compatibility",
      objective:
        "Determine whether a resource depends on an API or CRD that is not available.",

      commands: [
        "kubectl api-resources",
        "kubectl get crds",
        "kubectl get crd <crd-name> -o yaml",
        "kubectl get events -A --sort-by=.metadata.creationTimestamp",
      ],

      interpretOutput: [
        "A missing API resource can prevent Kubernetes from accepting a manifest.",
        "A CRD may exist but not yet be established or usable.",
        "A controller may be installed but unhealthy, preventing its custom resources from reaching a healthy state.",
      ],

      nextStep:
        "Verify the API version, CRD installation wave, controller health, and dependency order.",
    },

    {
      id: 18,
      title: "Inspect Argo CD resource status and diff",
      objective:
        "Compare the intended desired state with the live resource state.",

      commands: [
        "argocd app resources <application-name>",
        "argocd app diff <application-name>",
        "argocd app get <application-name>",
      ],

      interpretOutput: [
        "The resource list can help identify the objects associated with the Application.",
        "A diff can reveal changed image tags, annotations, probes, resource requests, or configuration.",
        "A diff may also show differences caused by defaulting or controllers that modify resources.",
        "A large diff is not itself proof of the cause of the timeout.",
      ],

      nextStep:
        "Identify the specific changed fields that relate to the unhealthy resource and compare them with the last known healthy revision.",

      safetyNote:
        "Treat diff output as sensitive when manifests contain confidential configuration. Do not paste secrets into public logs or tickets.",
    },

    {
      id: 19,
      title: "Inspect hook configuration and lifecycle",
      objective:
        "Determine whether a hook is blocking completion or has failed.",

      commands: [
        "git grep -n 'argocd.argoproj.io/hook' -- '*.yaml' '*.yml'",
        "git grep -n 'argocd.argoproj.io/hook-delete-policy' -- '*.yaml' '*.yml'",
        "kubectl -n <destination-namespace> get jobs,pods",
        "kubectl -n <destination-namespace> get events --sort-by=.metadata.creationTimestamp",
      ],

      interpretOutput: [
        "PreSync hooks execute before normal Sync resources.",
        "PostSync hooks run after the required sync and health conditions have been met.",
        "A failed hook can cause the operation to fail even when some application resources were applied.",
        "Hook deletion policies can affect whether hook resources remain available for inspection.",
        "A missing hook resource does not establish whether the hook was never created or was later cleaned up.",
      ],

      nextStep:
        "Inspect the Application operation message, hook annotations, Job status, logs, and cleanup behavior.",
    },

    {
      id: 20,
      title: "Inspect Argo CD controller health",
      objective:
        "Determine whether controller instability or processing delays are contributing to the issue.",

      commands: [
        "kubectl -n argocd get pods",
        "kubectl -n argocd get deployment",
        "kubectl -n argocd logs deployment/argocd-application-controller --since=30m",
        "kubectl -n argocd get events --sort-by=.metadata.creationTimestamp",
      ],

      interpretOutput: [
        "The controller name and deployment topology may differ by Argo CD installation.",
        "Repeated restarts, resource exhaustion, API errors, or reconciliation delays may indicate a controller-side problem.",
        "Controller logs can contain information about other Applications; filter and handle them carefully.",
        "A controller warning does not automatically prove that the controller caused the resource-level failure.",
      ],

      nextStep:
        "Correlate controller errors with the affected Application, timestamps, Kubernetes API errors, and resource events.",

      safetyNote:
        "Do not restart or scale down Argo CD controllers in production without an approved plan and an understanding of reconciliation impact.",
    },

    {
      id: 21,
      title: "Inspect the configured wave delay",
      objective:
        "Determine whether intentional delays or health-assessment timing contribute to slow wave progression.",

      commands: [
        "kubectl -n argocd get deployment argocd-application-controller -o yaml",
        "kubectl -n argocd get pods",
        "kubectl -n argocd logs deployment/argocd-application-controller --since=30m",
      ],

      interpretOutput: [
        "ARGOCD_SYNC_WAVE_DELAY can introduce an intentional delay between waves.",
        "The effective value depends on the actual controller configuration and Argo CD version.",
        "A wave delay does not explain a resource that remains unhealthy indefinitely.",
        "Increasing or decreasing a delay without understanding health assessment behavior can hide symptoms rather than fix the root cause.",
      ],

      nextStep:
        "Inspect the actual controller configuration and correlate elapsed time with wave transitions, health checks, and resource events.",
    },

    {
      id: 22,
      title: "Check API server and cluster pressure",
      objective:
        "Determine whether the cluster is experiencing API errors, throttling, or broader resource pressure.",

      commands: [
        "kubectl get --raw='/readyz?verbose'",
        "kubectl get nodes",
        "kubectl get events -A --sort-by=.metadata.creationTimestamp",
        "kubectl top nodes",
      ],

      interpretOutput: [
        "A ready API server does not guarantee that every API request is fast or that every dependency is healthy.",
        "Node NotReady conditions may affect workload scheduling and availability.",
        "API throttling, request timeouts, and admission webhook delays can slow resource operations.",
        "A failure affecting several Applications may indicate a shared cluster or control-plane dependency.",
      ],

      nextStep:
        "Correlate failures across Applications and nodes. Escalate control-plane or managed-cluster issues to the responsible platform team.",
    },

    {
      id: 23,
      title: "Compare the failing revision with the last healthy revision",
      objective:
        "Identify whether a recent manifest or configuration change introduced the failure.",

      commands: [
        "git log -n 10 --oneline",
        "git diff <last-known-good-revision>..<failing-revision> --",
        "git grep -n 'argocd.argoproj.io/sync-wave' <failing-revision> -- '*.yaml' '*.yml'",
      ],

      interpretOutput: [
        "Changes to wave numbers may have altered resource ordering.",
        "Probe, image, resource request, dependency, and hook changes may explain the health failure.",
        "A Git diff identifies configuration changes but does not alone prove causation.",
      ],

      nextStep:
        "Correlate the relevant change with the first failure timestamp and confirm the mechanism using runtime evidence.",

      safetyNote:
        "Use the correct repository and revisions. Do not revert unrelated changes without reviewing their purpose and dependencies.",
    },

    {
      id: 24,
      title: "Validate rendered manifests before recovery",
      objective:
        "Confirm that the intended source renders the expected resources and annotations.",

      commands: [
        "argocd app manifests <application-name>",
        "argocd app diff <application-name>",
        "git diff --check",
      ],

      interpretOutput: [
        "Rendered manifests help verify which resources and wave annotations Argo CD intends to apply.",
        "A successful render does not prove that Kubernetes will accept or run the resources.",
        "A source or rendering error must be resolved separately from a resource health timeout.",
      ],

      nextStep:
        "Verify the rendered resource ordering and review the proposed changes before approving a new sync.",
    },
  ] satisfies SyncWaveDiagnostic[],

  rootCauses: [
    {
      cause: "A Deployment never becomes healthy",
      symptoms: [
        "The rollout does not complete.",
        "Later waves remain blocked.",
        "Pods are not ready or available.",
      ],
      confirmation: [
        "Inspect Deployment conditions and replica counts.",
        "Inspect the newest ReplicaSet and its Pods.",
        "Correlate probe failures, scheduling events, and container logs.",
      ],
      resolution: [
        "Correct the specific startup, image, configuration, capacity, or readiness problem.",
        "Validate the corrected manifest.",
        "Observe the rollout before proceeding with additional changes.",
      ],
      prevention: [
        "Use realistic readiness and startup probes.",
        "Validate image and configuration changes before production deployment.",
        "Alert on prolonged rollout degradation.",
      ],
    },

    {
      cause: "A migration Job never completes",
      symptoms: [
        "A migration wave remains blocked.",
        "The Job stays active or fails repeatedly.",
        "The application Deployment does not progress.",
      ],
      confirmation: [
        "Inspect Job conditions and Pod events.",
        "Read current and previous logs.",
        "Check database connectivity, permissions, lock waits, and migration status.",
      ],
      resolution: [
        "Correct the confirmed database, connectivity, or migration issue.",
        "Determine whether the migration partially changed data.",
        "Rerun only after confirming repeatability and obtaining required approval.",
      ],
      prevention: [
        "Make migrations observable and safely repeatable where possible.",
        "Define realistic Job deadlines and retry policies.",
        "Test migration compatibility and recovery procedures.",
      ],
    },

    {
      cause: "Incorrect sync-wave ordering",
      symptoms: [
        "A resource is applied before its dependency is available.",
        "A hook or custom resource fails intermittently.",
        "The same dependency error appears during each release.",
      ],
      confirmation: [
        "Inspect wave annotations in rendered manifests.",
        "Identify the required dependency and its actual readiness conditions.",
        "Compare the current ordering with the last known healthy deployment.",
      ],
      resolution: [
        "Correct the wave annotations or hook phase when ordering is the confirmed cause.",
        "Ensure dependent resources wait for the required readiness condition.",
        "Validate the complete dependency sequence before deploying.",
      ],
      prevention: [
        "Document resource dependencies.",
        "Test fresh-cluster and upgrade scenarios.",
        "Avoid relying on creation order alone when readiness is required.",
      ],
    },

    {
      cause: "Incorrect health assessment",
      symptoms: [
        "A resource exists but is considered unhealthy.",
        "A custom resource remains progressing despite successful underlying work.",
        "The next wave never begins.",
      ],
      confirmation: [
        "Inspect the resource status and actual runtime state.",
        "Review any configured custom health assessment.",
        "Compare Argo CD's health result with the resource controller's conditions.",
      ],
      resolution: [
        "Correct the actual workload problem if the resource is genuinely unhealthy.",
        "If the health assessment is incorrect, update it using a tested, version-compatible configuration.",
        "Verify that the new assessment does not mark genuinely unhealthy resources as healthy.",
      ],
      prevention: [
        "Test health customizations against real resource states.",
        "Version-control Argo CD health customizations.",
        "Monitor both GitOps status and application-level health.",
      ],
    },

    {
      cause: "Image pull or container startup failure",
      symptoms: [
        "Pods show ImagePullBackOff, ErrImagePull, or CrashLoopBackOff.",
        "Deployment availability does not increase.",
        "The wave remains blocked.",
      ],
      confirmation: [
        "Inspect Pod events and container state.",
        "Check the image reference, registry availability, pull-secret configuration, and previous logs.",
      ],
      resolution: [
        "Correct the image reference, registry permissions, network access, or startup configuration.",
        "Use a verified image digest or approved release tag.",
        "Observe the new Pods until they reach the expected state.",
      ],
      prevention: [
        "Validate image references in CI.",
        "Use controlled image promotion.",
        "Monitor registry availability and image-pull failures.",
      ],
    },

    {
      cause: "Cluster capacity or scheduling constraints",
      symptoms: [
        "Pods remain Pending.",
        "Events report insufficient CPU, memory, or placement constraints.",
        "The Deployment cannot obtain available replicas.",
      ],
      confirmation: [
        "Inspect Pod scheduling events.",
        "Compare resource requests with node allocatable capacity.",
        "Inspect taints, tolerations, affinity, topology constraints, and storage placement.",
      ],
      resolution: [
        "Correct inaccurate requests or constraints when justified.",
        "Add approved capacity or repair the relevant infrastructure.",
        "Verify that the workload schedules and becomes healthy.",
      ],
      prevention: [
        "Monitor scheduling failures and capacity trends.",
        "Test autoscaling and capacity limits.",
        "Review resource requests during deployment changes.",
      ],
    },

    {
      cause: "Storage provisioning or attachment failure",
      symptoms: [
        "Pods cannot start because volumes are unavailable.",
        "PVCs remain Pending or events show FailedMount.",
        "The workload never becomes ready.",
      ],
      confirmation: [
        "Inspect PVC and PV status.",
        "Review storage-class and volume events.",
        "Check storage-provisioner and attachment health.",
      ],
      resolution: [
        "Correct the confirmed storage-class, capacity, access-mode, or attachment issue.",
        "Follow the storage team's recovery process.",
        "Verify data integrity before replacing or recreating storage resources.",
      ],
      prevention: [
        "Monitor PVC provisioning and volume attachment failures.",
        "Test storage recovery procedures.",
        "Document data-preservation requirements.",
      ],
    },

    {
      cause: "Admission webhook or policy rejection",
      symptoms: [
        "Kubernetes rejects a resource during apply.",
        "Events or operation messages report admission denial or webhook timeout.",
        "Some earlier resources may already have applied.",
      ],
      confirmation: [
        "Inspect the exact API error.",
        "Check the responsible policy or webhook and its service health.",
        "Compare the rejected resource with the policy requirements.",
      ],
      resolution: [
        "Make a compliant manifest correction or repair the approved webhook dependency.",
        "Do not bypass security controls simply to make the sync pass.",
        "Verify the rejected resource can be accepted and becomes healthy.",
      ],
      prevention: [
        "Validate policies in non-production environments.",
        "Monitor webhook availability and latency.",
        "Include admission failures in deployment diagnostics.",
      ],
    },

    {
      cause: "Insufficient RBAC permissions",
      symptoms: [
        "The API reports Forbidden.",
        "A controller or workload cannot perform a required action.",
        "The resource or dependency remains incomplete.",
      ],
      confirmation: [
        "Identify the exact Kubernetes identity.",
        "Inspect the denied action and resource.",
        "Use approved authorization checks to confirm the missing permission.",
      ],
      resolution: [
        "Add the smallest approved permission required for the operation.",
        "Verify the correct namespace and service account.",
        "Retest the failed operation.",
      ],
      prevention: [
        "Review RBAC changes in code review.",
        "Use least-privilege service accounts.",
        "Add permission checks to deployment validation where appropriate.",
      ],
    },

    {
      cause: "CRD or controller dependency is unavailable",
      symptoms: [
        "A custom resource cannot be accepted or becomes unhealthy.",
        "A dependent resource fails even though its manifest is present.",
        "The resource controller has not established the expected condition.",
      ],
      confirmation: [
        "Inspect available API resources and CRDs.",
        "Check whether the CRD is established.",
        "Inspect the custom-resource controller's health and logs.",
      ],
      resolution: [
        "Correct the installation order or API-version mismatch.",
        "Restore the required controller or CRD through the approved GitOps process.",
        "Verify the custom resource reaches its expected condition.",
      ],
      prevention: [
        "Document CRD and controller dependencies.",
        "Test clean installations and upgrades.",
        "Validate API compatibility before promoting a release.",
      ],
    },

    {
      cause: "Argo CD controller or API server latency",
      symptoms: [
        "Several Applications are delayed or failing.",
        "Logs show API timeouts, throttling, or repeated reconciliation errors.",
        "Resource operations take unusually long despite healthy workloads.",
      ],
      confirmation: [
        "Compare multiple Applications and resource events.",
        "Inspect controller health and logs.",
        "Check API readiness, node health, and relevant platform telemetry.",
      ],
      resolution: [
        "Follow the platform team's control-plane incident procedure.",
        "Address the confirmed capacity, connectivity, throttling, or controller issue.",
        "Reassess active operations before retrying them.",
      ],
      prevention: [
        "Monitor controller health and reconciliation delays.",
        "Track API error rates and control-plane latency.",
        "Test the recovery process for shared platform failures.",
      ],
    },

    {
      cause: "Incorrect hook lifecycle or cleanup behavior",
      symptoms: [
        "A required hook fails or does not complete.",
        "A hook resource disappears before evidence is collected.",
        "A migration or validation step blocks the sync.",
      ],
      confirmation: [
        "Inspect hook phase and deletion-policy annotations.",
        "Inspect operation state, Job events, and available logs.",
        "Determine whether cleanup occurred after success or failure.",
      ],
      resolution: [
        "Correct the hook configuration or command after identifying the failure.",
        "Preserve sufficient logs and completion evidence.",
        "Verify that cleanup behavior matches operational requirements.",
      ],
      prevention: [
        "Use clear hook completion and cleanup policies.",
        "Make hook operations observable.",
        "Test failed, retried, and interrupted hook scenarios.",
      ],
    },

    {
      cause: "Pipeline timeout mistaken for an Argo CD operation timeout",
      symptoms: [
        "CI reports a timeout while Argo CD may still be processing the sync.",
        "The next pipeline run encounters an operation already in progress.",
        "Some resources have changed despite a failed pipeline job.",
      ],
      confirmation: [
        "Compare pipeline timestamps with Application operation state.",
        "Inspect the actual Argo CD error message.",
        "Check live resources and the current revision.",
      ],
      resolution: [
        "Determine whether the operation is still running and whether it is safe to wait.",
        "Correct the appropriate pipeline wait configuration or the actual Argo CD resource issue.",
        "Avoid starting a competing deployment before checking operation state.",
      ],
      prevention: [
        "Align pipeline wait limits with realistic deployment duration.",
        "Report the current Application operation state on timeout.",
        "Use explicit failure handling and deployment concurrency controls.",
      ],
    },
  ] satisfies SyncWaveRootCause[],

  incidentScenarios: [
    {
      title: "Scenario 1: Database migration Job blocks production deployment",

      environment:
        "Production Application with a migration Job in an earlier sync wave.",

      symptoms: [
        "The pipeline reaches its wait limit.",
        "The migration Job is still active.",
        "The application wave does not progress.",
      ],

      timeline: [
        "T+00: Deployment begins.",
        "T+02: Earlier prerequisite resources are applied.",
        "T+04: Migration Job starts.",
        "T+08: Migration logs show repeated database lock waits.",
        "T+15: The pipeline reports a timeout.",
      ],

      investigation: [
        "Inspect Application operation state.",
        "Identify the blocked wave and migration Job.",
        "Inspect Job conditions and container logs.",
        "Check database connectivity and migration execution state.",
        "Confirm whether the migration changed the schema or data before stalling.",
      ],

      rootCause:
        "The migration is waiting on a database lock. The pipeline timeout is a symptom, not the database root cause.",

      recovery: [
        "Notify the database owner and follow the approved database incident procedure.",
        "Identify the blocking transaction using approved database diagnostics.",
        "Confirm whether it is safe to wait, cancel the migration, or address the blocking transaction.",
        "Do not kill database sessions or rerun the migration without assessing data integrity.",
        "After the database condition is resolved, inspect the Job and Application operation state before continuing.",
      ],

      verification: [
        "The migration reaches its expected completion state.",
        "The expected schema version is confirmed.",
        "The next wave proceeds.",
        "The application passes smoke tests.",
        "Database latency and error rates return to expected levels.",
      ],
    },

    {
      title: "Scenario 2: Deployment remains unavailable because of readiness failures",

      environment:
        "Production Deployment in wave 0, followed by traffic-routing resources.",

      symptoms: [
        "The new ReplicaSet exists.",
        "Pods are running but not ready.",
        "Later waves do not progress.",
      ],

      timeline: [
        "T+00: A new application image is deployed.",
        "T+01: Pods start successfully.",
        "T+03: Readiness probes begin failing.",
        "T+05: The rollout remains incomplete.",
        "T+10: The pipeline reports a timeout.",
      ],

      investigation: [
        "Inspect the Deployment and ReplicaSet.",
        "Describe the failing Pod.",
        "Read application logs.",
        "Check probe paths, ports, startup time, configuration, and dependencies.",
        "Compare the new image and probe configuration with the previous healthy revision.",
      ],

      rootCause:
        "The readiness endpoint requires a dependency that is unavailable or takes longer to initialize than expected.",

      recovery: [
        "Confirm whether the dependency is healthy.",
        "Correct the actual dependency, application startup, or probe configuration.",
        "Use a startup probe when the application legitimately needs additional startup time and the configuration is appropriate.",
        "Follow the approved rollout or rollback plan if user impact is significant.",
      ],

      verification: [
        "Pods become ready.",
        "Deployment availability reaches the expected replica count.",
        "The next wave progresses.",
        "Application health checks and smoke tests pass.",
      ],
    },

    {
      title: "Scenario 3: A later wave depends on a CRD that is not ready",

      environment:
        "A GitOps Application deploys a controller and its custom resources.",

      symptoms: [
        "The custom resource fails to apply or remains unhealthy.",
        "The controller or CRD is being installed in the same release.",
        "The sync operation does not complete.",
      ],

      timeline: [
        "T+00: The controller installation starts.",
        "T+02: The controller Deployment is created.",
        "T+03: The custom resource is processed.",
        "T+04: The API reports that the custom resource type is unavailable or not established.",
      ],

      investigation: [
        "Inspect the rendered manifests and wave assignments.",
        "Check whether the CRD exists and is established.",
        "Inspect controller Pod readiness and logs.",
        "Check whether the custom resource was applied before its API dependency was available.",
      ],

      rootCause:
        "The custom resource is being processed before the required CRD or controller is ready.",

      recovery: [
        "Correct the dependency ordering where necessary.",
        "Ensure the CRD is established and the controller is ready before applying dependent resources.",
        "Review the current operation and partial changes before retrying.",
      ],

      verification: [
        "The custom resource is accepted by the API.",
        "The controller reconciles it successfully.",
        "Argo CD reports the expected resource health.",
        "The remaining waves complete.",
      ],
    },

    {
      title: "Scenario 4: Pipeline times out, but Argo CD is still running",

      environment:
        "CI pipeline waits for an Argo CD sync operation.",

      symptoms: [
        "The CI job fails after its configured wait limit.",
        "Argo CD still reports a running operation.",
        "Some resources have already been applied.",
      ],

      timeline: [
        "T+00: CI starts the deployment.",
        "T+03: Argo CD applies resources.",
        "T+10: A slow health check delays progression.",
        "T+12: CI exits due to its wait limit.",
        "T+13: The Argo CD operation remains active.",
      ],

      investigation: [
        "Check the CI job logs and configured wait limit.",
        "Inspect the Application operation state.",
        "Identify the current wave and resource.",
        "Check whether the resource is progressing or genuinely blocked.",
      ],

      rootCause:
        "The pipeline's waiting limit expires before the Argo CD operation finishes.",

      recovery: [
        "Determine whether the existing operation is progressing safely.",
        "Do not immediately start another sync.",
        "If the resource is healthy and simply slow, correct the pipeline wait policy based on measured deployment duration.",
        "If the resource is blocked, troubleshoot its actual health failure instead.",
      ],

      verification: [
        "The operation reaches a terminal state.",
        "CI reports the correct result.",
        "The intended revision and live resources are verified.",
        "Future pipeline runs report meaningful timeout diagnostics.",
      ],
    },

    {
      title: "Scenario 5: A wave appears stuck after an admission rejection",

      environment:
        "A policy-controlled production cluster.",

      symptoms: [
        "A resource fails to apply.",
        "An earlier resource was applied successfully.",
        "Later resources do not progress.",
      ],

      timeline: [
        "T+00: Sync starts.",
        "T+01: An earlier resource is applied.",
        "T+02: A Deployment or dependent resource is rejected by admission.",
        "T+05: The operation fails or remains blocked while the error is investigated.",
      ],

      investigation: [
        "Inspect the exact API rejection message.",
        "Review resource events and the Application operation message.",
        "Identify the responsible admission policy or webhook.",
        "Determine which resources were already changed.",
      ],

      rootCause:
        "The API server rejects a resource that violates an admission requirement or cannot reach the required webhook.",

      recovery: [
        "Correct the manifest to satisfy the policy, or repair the approved webhook dependency.",
        "Avoid bypassing production security policies.",
        "Review partial changes and operation state before retrying.",
      ],

      verification: [
        "The rejected resource is accepted.",
        "The resource reaches the expected health state.",
        "The sync operation completes.",
        "Policy and application checks pass.",
      ],
    },
  ] satisfies SyncWaveIncidentScenario[],

  diagnosticDecisionTree: [
    {
      question: "Did the desired manifests render successfully?",
      yes:
        "Inspect sync operation state and the resource where progression stopped.",
      no:
        "Investigate repository access, Helm or Kustomize rendering, plugins, and source configuration. This is not yet evidence of a Kubernetes health timeout.",
    },
    {
      question: "Does the Application show an active operation?",
      yes:
        "Determine whether it is progressing, waiting for health, or blocked on a particular resource.",
      no:
        "Inspect the last operation result, sync status, resource health, and whether the pipeline timeout is separate from the Argo CD operation.",
    },
    {
      question: "Is a resource in the earliest blocked wave unhealthy?",
      yes:
        "Inspect that resource's conditions, events, logs, dependencies, and recent manifest changes.",
      no:
        "Check hook phase, resource ownership, health assessment, controller errors, and whether another dependency is blocking progression.",
    },
    {
      question: "Is the resource a Job or hook?",
      yes:
        "Inspect Job conditions, execution logs, deadlines, retry limits, and the safety of rerunning its work.",
      no:
        "Inspect the resource-specific health and runtime diagnostics.",
    },
    {
      question: "Are several Applications affected?",
      yes:
        "Investigate shared dependencies such as the API server, admission webhooks, cluster capacity, or Argo CD controllers.",
      no:
        "Prioritize the affected Application's manifests, dependencies, and workload behavior.",
    },
    {
      question: "Has the root cause been confirmed?",
      yes:
        "Apply the smallest approved correction, validate, recover, and verify.",
      no:
        "Collect more evidence or reproduce safely. Do not use force sync, pruning, or deletion as a substitute for diagnosis.",
    },
  ],

  safeRecoveryProcedure: {
    title: "Production-safe recovery procedure",

    beforeAnyChange: [
      "Confirm the correct cluster, Application, namespace, and Git revision.",
      "Record the operation phase, wave, failed resource, and relevant events.",
      "Determine whether the operation is still active.",
      "Determine which resources have already changed.",
      "Assess customer impact and data-integrity risk.",
      "Confirm approval and the person responsible for recovery.",
      "Review the rollback plan and any database or persistent-storage implications.",
    ],

    recoverySteps: [
      {
        step: 1,
        action: "Identify the earliest blocked dependency.",
        reason:
          "Fixing a later wave will not help if an earlier required resource remains unhealthy.",
      },
      {
        step: 2,
        action: "Correct the confirmed root cause.",
        reason:
          "The fix must address the actual scheduling, startup, dependency, policy, or controller problem.",
      },
      {
        step: 3,
        action: "Review the intended change.",
        reason:
          "Check the Git diff and rendered manifests before production deployment.",
      },
      {
        step: 4,
        action: "Validate the configuration.",
        reason:
          "Use repository-specific linting, manifest rendering, and policy validation before promotion.",
      },
      {
        step: 5,
        action: "Determine the safe operation state.",
        reason:
          "A pipeline timeout does not prove that Argo CD stopped. Avoid competing sync operations.",
      },
      {
        step: 6,
        action: "Perform an approved recovery.",
        reason:
          "Use the team's established GitOps workflow and avoid unreviewed direct changes to managed resources.",
      },
      {
        step: 7,
        action: "Monitor the previously blocked wave.",
        reason:
          "Confirm that the original blocker becomes healthy before assuming the problem is resolved.",
      },
      {
        step: 8,
        action: "Verify all remaining waves and the application.",
        reason:
          "Successful synchronization does not guarantee that every business function works correctly.",
      },
    ],

    rollbackGuidance: [
      "Do not assume reverting Git automatically reverses database changes.",
      "Check whether earlier resources were partially applied.",
      "Determine whether the previous application version is compatible with the current database schema.",
      "Review persistent data and stateful-resource implications before rollback.",
      "Use the approved Argo CD and service recovery process.",
      "Record the rollback revision and verify the resulting live state.",
    ],

    dangerousShortcuts: [
      {
        action: "Blindly retry sync",
        risk:
          "Can repeat hooks, migrations, or partial changes without addressing the original failure.",
      },
      {
        action: "Delete the failed Job",
        risk:
          "May destroy useful evidence or cause a migration to execute again.",
      },
      {
        action: "Prune every unexpected resource",
        risk:
          "Can remove resources that still serve production traffic or preserve important data.",
      },
      {
        action: "Increase every timeout",
        risk:
          "Can hide genuine failures and delay detection without fixing the cause.",
      },
      {
        action: "Disable readiness checks",
        risk:
          "Can allow traffic to reach an application that is not actually ready.",
      },
      {
        action: "Force changes directly in production",
        risk:
          "Can create drift, bypass review, and make the next GitOps reconciliation unpredictable.",
      },
    ],
  },

  prevention: {
    title: "Prevent recurring sync-wave timeouts",

    manifestPractices: [
      "Use explicit sync-wave annotations only where ordering is required.",
      "Document dependencies between namespaces, CRDs, controllers, migrations, workloads, and traffic resources.",
      "Do not assume resource creation means resource readiness.",
      "Design hooks to report clear completion and failure information.",
      "Use sensible Job deadlines, backoff limits, and retry behavior.",
      "Make one-time operations safe to observe and recover.",
      "Test both clean installations and upgrades from previous versions.",
      "Review health customizations for custom resources.",
      "Validate rendered manifests and policy requirements before promotion.",
    ],

    ciPractices: [
      "Validate YAML syntax.",
      "Render Helm and Kustomize sources.",
      "Check required CRDs and API versions.",
      "Run schema and policy validation.",
      "Review changes to sync-wave and hook annotations.",
      "Check that migrations are compatible with the application version.",
      "Prevent conflicting deployments to the same Application.",
      "Record the deployed Git revision in pipeline logs.",
      "Report Application operation state and the blocked resource when a wait expires.",
      "Use measured deployment durations when configuring CI wait limits.",
    ],

    monitoring: [
      "Alert on Applications remaining Progressing beyond a defined threshold.",
      "Alert on failed sync operations.",
      "Monitor Deployment availability and rollout failures.",
      "Monitor Job failures, duration, and retry exhaustion.",
      "Monitor Pod scheduling failures and repeated restarts.",
      "Monitor PVC provisioning and volume attachment failures.",
      "Monitor Argo CD controller health and reconciliation delays.",
      "Monitor Kubernetes API latency, errors, and admission webhook availability.",
      "Track deployment duration by Application, environment, and release type.",
    ],

    alertingDesign: [
      {
        signal: "Sync operation duration",
        alertWhen:
          "An operation exceeds the expected duration for that Application and environment.",
        response:
          "Include the Application, revision, current phase, wave, and operation message.",
      },
      {
        signal: "Deployment unavailable replicas",
        alertWhen:
          "Available replicas remain below the required level for longer than the service-specific threshold.",
        response:
          "Include Deployment conditions, Pod events, and recent rollout information.",
      },
      {
        signal: "Job failure",
        alertWhen:
          "A critical migration or release Job fails or exceeds its expected duration.",
        response:
          "Include Job conditions and sanitized logs. Do not automatically rerun unsafe migrations.",
      },
      {
        signal: "Shared controller degradation",
        alertWhen:
          "Multiple Applications experience reconciliation delays or controller errors.",
        response:
          "Correlate failures and investigate shared Argo CD and Kubernetes dependencies.",
      },
    ],
  },

  operationalRunbook: {
    title: "On-call quick runbook",

    firstFiveMinutes: [
      "Confirm the affected Application and environment.",
      "Check production impact and whether the service is still available.",
      "Capture the exact pipeline and Argo CD errors.",
      "Inspect Application status and operation state.",
      "Identify the earliest blocked wave and resource.",
      "Check recent Kubernetes events.",
      "Avoid blind retry, force sync, pruning, or deletion.",
    ],

    nextFifteenMinutes: [
      "Inspect the blocked resource and its conditions.",
      "Review logs and events for the underlying failure.",
      "Check dependency health, scheduling, storage, permissions, and admission where relevant.",
      "Compare the failing Git revision with the last known healthy revision.",
      "Agree on a safe recovery plan with the responsible owner.",
    ],

    beforeIncidentClosure: [
      "Confirm the sync operation has completed or reached a documented safe terminal state.",
      "Confirm expected resource health.",
      "Run application-level smoke tests.",
      "Confirm service availability and error rates.",
      "Document the root cause and evidence.",
      "Record preventive actions, owners, and deadlines.",
    ],

    escalation: [
      {
        team: "Application team",
        escalateWhen:
          "Application startup, readiness, configuration, or dependency logic is the confirmed cause.",
      },
      {
        team: "Database team",
        escalateWhen:
          "A migration is blocked by database locks, schema state, permissions, or data-integrity concerns.",
      },
      {
        team: "Platform / Kubernetes team",
        escalateWhen:
          "Scheduling, storage, API server, admission, networking, or cluster capacity is implicated.",
      },
      {
        team: "GitOps / Argo CD team",
        escalateWhen:
          "Controller behavior, resource ordering, health assessment, or Application operation processing is implicated.",
      },
      {
        team: "Security team",
        escalateWhen:
          "Admission policy, image provenance, identity, or security-control failures require policy-owner action.",
      },
    ],
  },

  incidentReportTemplate: {
    title: "Sync-wave timeout incident report",

    fields: [
      "Incident ID",
      "Date and time first detected",
      "Environment and cluster",
      "Argo CD Application",
      "Repository and Git revision",
      "Affected namespace and resources",
      "Blocked sync phase and wave",
      "Pipeline timeout message",
      "Argo CD operation message",
      "Customer and business impact",
      "Severity and incident owner",
      "Evidence collected",
      "Confirmed root cause",
      "Contributing factors",
      "Recovery action",
      "Rollback decision and rationale",
      "Recovery verification",
      "Preventive actions",
      "Action owner and due date",
    ],

    rootCauseWritingTip:
      "Write the causal mechanism, not just the symptom. For example: 'The migration Job remained blocked because the database migration waited on a conflicting transaction; the CI timeout then expired while Argo CD was still processing the operation.'",
  },

  interviewQuestions: [
    {
      question: "What is an Argo CD Sync Wave?",
      answer:
        "A Sync Wave is an ordering mechanism that uses the argocd.argoproj.io/sync-wave annotation to control when resources are processed during synchronization. Lower-numbered waves are processed earlier within the applicable sync phase and ordering rules.",
    },
    {
      question: "Why can a resource in an earlier wave block later waves?",
      answer:
        "Argo CD uses resource health and operation progression to determine when to continue. If a required earlier resource remains unhealthy, later waves may not be processed.",
    },
    {
      question: "Does every sync-wave timeout mean Kubernetes is slow?",
      answer:
        "No. Possible causes include an unhealthy workload, a failed hook, incorrect dependencies, a pipeline wait timeout, API delays, scheduling constraints, or controller issues. The exact failure must be established from evidence.",
    },
    {
      question: "How do you find the resource blocking a sync?",
      answer:
        "Inspect the Application status and operation message, identify the earliest blocked wave, and correlate the resource state with Kubernetes conditions, events, and logs.",
    },
    {
      question: "What is the difference between sync status and health status?",
      answer:
        "Sync status compares the desired state with the live state. Health status assesses whether a resource is healthy according to the applicable health assessment. An Application can be Synced but Degraded, or OutOfSync while its live workload is healthy.",
    },
    {
      question: "Can a pipeline timeout happen while Argo CD is still running?",
      answer:
        "Yes. A CI job's wait limit and an Argo CD operation are separate mechanisms. Inspect the actual Application operation state before retrying or starting another deployment.",
    },
    {
      question: "How do you troubleshoot a stuck migration Job?",
      answer:
        "Inspect the Job conditions, Pod events, logs, database connectivity, permissions, locks, and migration state. Before retrying, determine whether the migration partially changed the database and whether another execution is safe.",
    },
    {
      question: "How can incorrect wave ordering cause deployment failure?",
      answer:
        "A resource may be processed before a required dependency is ready. Correct ordering and explicit readiness requirements can prevent dependent resources from being applied too early.",
    },
    {
      question: "What does ProgressDeadlineExceeded mean?",
      answer:
        "It indicates that a Deployment failed to make sufficient rollout progress within its configured progress deadline. Investigate the underlying Pod, scheduling, startup, readiness, and dependency failures.",
    },
    {
      question: "Should you increase the timeout whenever a sync fails?",
      answer:
        "No. First establish whether the operation is legitimately slow or genuinely blocked. Increasing a timeout without fixing the cause can delay failure detection.",
    },
    {
      question: "What is the risk of blindly retrying a failed sync?",
      answer:
        "Earlier resources may already have changed, and hooks or migrations may run again. Check the current operation, partial changes, and repeatability of side effects before retrying.",
    },
    {
      question: "How do you verify that recovery succeeded?",
      answer:
        "Confirm the operation state, expected synchronization, required resource health, successful hooks, completed waves, application smoke tests, and service-level health.",
    },
    {
      question: "When should you investigate Argo CD controller logs?",
      answer:
        "Use them when resource-level evidence points to reconciliation delays, API errors, controller instability, or when the Application's reported failure cannot otherwise be explained. Correlate log timestamps with the affected Application and resource.",
    },
    {
      question: "What should a useful timeout alert contain?",
      answer:
        "It should identify the Application, environment, Git revision, operation phase, blocked wave or resource when available, elapsed duration, and a link or reference to relevant logs.",
    },
    {
      question: "How would you prevent repeated sync-wave incidents?",
      answer:
        "Validate manifests and dependencies in CI, test upgrades, use reliable hooks, monitor operation duration and resource health, control concurrent deployments, and maintain an evidence-based recovery runbook.",
    },
  ] satisfies SyncWaveInterviewQuestion[],

  handsOnExercises: [
    {
      title: "Exercise 1: Find a blocked Deployment",
      objective:
        "Practice tracing an incomplete rollout from the Application to the Pod.",
      tasks: [
        "Identify an Application in a non-production cluster.",
        "Inspect its sync status, health status, and operation state.",
        "Identify the earliest blocked resource and its wave.",
        "Inspect Deployment conditions, Pod events, and logs.",
        "Write a root-cause hypothesis supported by evidence.",
      ],
      expectedOutcome:
        "A short incident report identifies the blocked resource, the evidence, and the next safe action.",
    },
    {
      title: "Exercise 2: Validate a migration hook",
      objective:
        "Practice diagnosing a hook without risking production data.",
      tasks: [
        "Use a disposable test environment.",
        "Inspect the hook phase and cleanup policy.",
        "Simulate a controlled Job failure.",
        "Capture Job status, Pod events, and logs.",
        "Design a safe retry procedure.",
      ],
      expectedOutcome:
        "A documented procedure explains how to diagnose and recover from a failed hook without blindly repeating side effects.",
    },
    {
      title: "Exercise 3: Review sync-wave ordering",
      objective:
        "Practice identifying a missing dependency relationship.",
      tasks: [
        "Inspect the repository's wave annotations.",
        "List each resource's prerequisites.",
        "Compare the intended sequence with rendered manifests.",
        "Validate the revised ordering in a test environment.",
        "Verify the health requirements before later waves proceed.",
      ],
      expectedOutcome:
        "A dependency map and a tested ordering change are prepared for code review.",
    },
    {
      title: "Exercise 4: Distinguish CI and Argo CD timeouts",
      objective:
        "Practice determining which component actually timed out.",
      tasks: [
        "Record the CI job's configured wait limit.",
        "Inspect the Application operation state after the simulated CI timeout.",
        "Compare the operation and resource timestamps.",
        "Identify whether the sync is progressing or blocked.",
        "Write the appropriate recovery decision.",
      ],
      expectedOutcome:
        "The incident response distinguishes a CI waiting limit from an actual resource or Argo CD failure.",
    },
  ],

  bestPractices: [
    "Always identify the actual failing resource before changing timeout settings.",
    "Use read-only diagnostics first.",
    "Correlate Application status, Kubernetes events, logs, and Git history.",
    "Treat the earliest blocked dependency as the primary investigation target.",
    "Do not assume that a failed operation left the cluster unchanged.",
    "Do not rerun migrations without checking data integrity and repeatability.",
    "Do not bypass readiness checks to make the deployment appear successful.",
    "Use approved GitOps changes for managed resources.",
    "Separate source-rendering failures, sync failures, health failures, and pipeline wait timeouts.",
    "Verify actual application behavior after synchronization.",
    "Record the evidence that confirms the root cause.",
    "Turn repeated manual recovery steps into validated runbooks and automation.",
  ],

  troubleshootingChecklist: [
    "Correct cluster and Application confirmed",
    "Environment and production impact assessed",
    "Git revision and repository confirmed",
    "Current operation state captured",
    "Blocked phase, wave, and resource identified",
    "Partial changes assessed",
    "Kubernetes conditions and events reviewed",
    "Relevant logs captured and secrets redacted",
    "Dependencies and recent manifest changes reviewed",
    "Root cause supported by evidence",
    "Recovery approved",
    "Migration and rollback risks assessed where applicable",
    "Fix validated before production deployment",
    "Required waves and hooks completed",
    "Application-level health verified",
    "Incident report and preventive actions recorded",
  ],

  finalSummary:
    "A sync-wave timeout is a symptom, not a complete root-cause diagnosis. Start with the Application operation state, identify the earliest blocked wave, inspect the responsible resource and its dependencies, and use events, conditions, logs, and Git history to establish the cause. Recover through a controlled and approved process, then verify both Argo CD synchronization and real application health.",

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
    importantDistinction: { term: string; explanation: string }[];
    howWavesWork: string[];
    keyConcepts: { concept: string; detail: string }[];
  };
  incidentScenario: {
    title: string;
    environment: string;
    symptoms: string[];
    expectedArchitecture: { wave: string; resources: string; expectation: string }[];
    workflow: string;
    realWorldRisk: string[];
  };
  severityAssessment: {
    title: string;
    levels: { level: string; conditions: string[]; action: string }[];
    questionsToAsk: string[];
  };
  productionWorkflow: {
    step: number;
    title: string;
    actions: string[];
    successCriteria: string;
  }[];
  diagnostics: SyncWaveDiagnostic[];
  rootCauses: SyncWaveRootCause[];
  incidentScenarios: SyncWaveIncidentScenario[];
  diagnosticDecisionTree: {
    question: string;
    yes: string;
    no: string;
  }[];
  safeRecoveryProcedure: {
    title: string;
    beforeAnyChange: string[];
    recoverySteps: { step: number; action: string; reason: string }[];
    rollbackGuidance: string[];
    dangerousShortcuts: { action: string; risk: string }[];
  };
  prevention: {
    title: string;
    manifestPractices: string[];
    ciPractices: string[];
    monitoring: string[];
    alertingDesign: { signal: string; alertWhen: string; response: string }[];
  };
  operationalRunbook: {
    title: string;
    firstFiveMinutes: string[];
    nextFifteenMinutes: string[];
    beforeIncidentClosure: string[];
    escalation: { team: string; escalateWhen: string }[];
  };
  incidentReportTemplate: {
    title: string;
    fields: string[];
    rootCauseWritingTip: string;
  };
  interviewQuestions: SyncWaveInterviewQuestion[];
  handsOnExercises: {
    title: string;
    objective: string;
    tasks: string[];
    expectedOutcome: string;
  }[];
  bestPractices: string[];
  troubleshootingChecklist: string[];
  finalSummary: string;
};

export default syncWaveTimeoutGuide;
