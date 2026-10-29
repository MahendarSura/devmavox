// File: app/troubleshooting-center/kubernetes/ContainerProbes.ts
// Production-grade Kubernetes Container Probes troubleshooting guide.
// Commands and sample outputs are illustrative. Replace placeholders
// with the correct namespace, deployment, pod, container and environment.

export interface ProbeDiagnosticStep {
  id: string;
  title: string;
  objective: string;
  commands: string[];
  expectedEvidence: string[];
  decisionPoints: string[];
  safetyNotes: string[];
}

export interface ProbeRootCause {
  id: string;
  title: string;
  symptoms: string[];
  evidence: string[];
  diagnosis: string[];
  remediation: string[];
  verification: string[];
  prevention: string[];
}

export interface ProbeIncidentScenario {
  id: string;
  title: string;
  severity: string;
  impact: string[];
  timeline: string[];
  investigation: string[];
  recovery: string[];
  successCriteria: string[];
}

export interface ProbeInterviewQuestion {
  question: string;
  answer: string;
  productionExample: string;
}

export interface ProbeLab {
  title: string;
  objective: string;
  steps: string[];
  expectedResult: string;
  cleanup: string[];
}

export interface ContainerProbesGuide {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  summary: string;
  learningObjectives: string[];
  productionPrinciples: string[];
  probeTypes: {
    name: string;
    purpose: string;
    failureBehavior: string;
    useWhen: string[];
    avoid: string[];
  }[];
  severityMatrix: {
    severity: string;
    indicators: string[];
    response: string;
  }[];
  diagnosticWorkflow: ProbeDiagnosticStep[];
  rootCauses: ProbeRootCause[];
  incidentScenarios: ProbeIncidentScenario[];
  commandReference: {
    purpose: string;
    command: string;
    interpretation: string;
  }[];
  productionChecklist: string[];
  prevention: string[];
  monitoring: string[];
  incidentReportTemplate: string[];
  labs: ProbeLab[];
  interviewQuestions: ProbeInterviewQuestion[];
  commonMistakes: string[];
  references: {
    title: string;
    url: string;
  }[];
}

export const containerProbesGuide: ContainerProbesGuide = {
  title: "Kubernetes Container Probes: Real-World Production Troubleshooting",
  slug: "container-probes",
  category: "Kubernetes",
  difficulty: "Advanced",
  estimatedTime: "90–150 minutes",

  summary: `
This runbook explains how production engineers investigate Kubernetes
startup, liveness and readiness probe failures.

It follows the complete incident lifecycle:
detect impact, preserve evidence, inspect Kubernetes events, inspect
the actual pod specification, validate the application endpoint,
distinguish application failures from networking and dependency failures,
apply a minimal safe fix, verify recovery, and prevent recurrence.

A probe failure is a symptom, not necessarily the root cause.
Restarting a pod repeatedly or increasing every timeout can hide the
underlying issue and make an outage worse.
`,

  learningObjectives: [
    "Explain startup, readiness and liveness probes and their different purposes.",
    "Investigate Unhealthy events, probe failures and container restarts.",
    "Troubleshoot HTTP, TCP, exec and gRPC probe configurations where supported.",
    "Identify incorrect ports, paths, schemes, headers and named ports.",
    "Distinguish application startup delays from deadlocks and dependency failures.",
    "Investigate CrashLoopBackOff, OOMKilled and resource saturation.",
    "Understand how readiness affects Service endpoints and traffic routing.",
    "Inspect live workload configuration, Helm values and rendered manifests.",
    "Use metrics, logs, events and timestamps to establish a root cause.",
    "Perform safe recovery, rollback and post-incident prevention."
  ],

  productionPrinciples: [
    "Confirm the cluster, namespace, workload and environment before changing anything.",
    "Treat production probe failures as an incident when customer traffic is affected.",
    "Collect evidence before restarting, deleting or replacing a pod.",
    "Do not assume that every readiness failure is caused by the probe configuration.",
    "Do not make liveness depend on every external service; transient dependency outages can otherwise restart healthy application processes.",
    "Use startup probes for slow initialization rather than making liveness excessively tolerant.",
    "Readiness should indicate whether the application can safely accept its intended traffic.",
    "Liveness should indicate whether restarting the process is an appropriate recovery action.",
    "Use version-controlled configuration and the normal deployment process for durable fixes.",
    "Validate recovery through application behavior and service-level indicators, not merely a Running pod status."
  ],

  probeTypes: [
    {
      name: "Startup probe",
      purpose:
        "Determines whether the application has completed its startup phase.",
      failureBehavior:
        "If startup continues failing until failureThreshold is reached, Kubernetes restarts the container.",
      useWhen: [
        "Applications perform migrations or initialization before serving traffic.",
        "JVM applications require significant warm-up time.",
        "Applications load models, caches or configuration during startup.",
        "Startup time varies substantially between cold and warm starts."
      ],
      avoid: [
        "Using a very large threshold to conceal a permanently broken application.",
        "Assuming a successful startup probe means the application is ready for traffic.",
        "Removing startup protection simply to make a rollout appear faster."
      ]
    },
    {
      name: "Readiness probe",
      purpose:
        "Determines whether a container should receive normal Service traffic.",
      failureBehavior:
        "The container is marked not ready. For a normal Pod-backed Service, the endpoint is generally excluded from ready traffic endpoints; terminating and special endpoint conditions require separate interpretation.",
      useWhen: [
        "The application starts listening before it can serve requests.",
        "The application must finish loading required configuration.",
        "A process temporarily cannot handle its intended workload.",
        "The application exposes a dedicated readiness endpoint."
      ],
      avoid: [
        "Using an endpoint that always returns success even when the application cannot serve requests.",
        "Making readiness depend on every optional downstream service.",
        "Assuming a failed readiness probe automatically restarts the container."
      ]
    },
    {
      name: "Liveness probe",
      purpose:
        "Detects a process that is unhealthy enough to warrant a container restart.",
      failureBehavior:
        "After the configured failure threshold, Kubernetes restarts the affected container, subject to its restart policy and workload behavior.",
      useWhen: [
        "The application can enter a deadlocked or permanently stuck state.",
        "A local health check can reliably detect a condition a restart can resolve.",
        "The process can remain alive while no longer making progress."
      ],
      avoid: [
        "Failing liveness solely because a database or remote API is temporarily unavailable.",
        "Using aggressive intervals that cause restart loops under load.",
        "Treating a successful TCP connection as proof that the application is fully functional."
      ]
    }
  ],

  severityMatrix: [
    {
      severity: "SEV-1 / Critical",
      indicators: [
        "Production service is unavailable across most or all replicas.",
        "Critical customer transactions are failing.",
        "A probe configuration change has caused a broad restart loop."
      ],
      response:
        "Activate the incident process, coordinate with the service owner, stop risky rollouts, preserve evidence and evaluate rollback immediately."
    },
    {
      severity: "SEV-2 / High",
      indicators: [
        "A significant subset of replicas is unready.",
        "Error rate or latency is increasing.",
        "The deployment cannot progress and available capacity is falling."
      ],
      response:
        "Investigate failing and healthy replicas side by side. Assess remaining capacity and pause additional changes if necessary."
    },
    {
      severity: "SEV-3 / Moderate",
      indicators: [
        "A single replica repeatedly fails probes but redundancy remains healthy.",
        "Restart counts are increasing without measurable customer impact."
      ],
      response:
        "Capture evidence, identify the failing replica's node and configuration, then fix the underlying cause through a controlled change."
    },
    {
      severity: "SEV-4 / Low",
      indicators: [
        "Intermittent probe failures occur in a development environment.",
        "There is no sustained impact or repeated restart behavior."
      ],
      response:
        "Reproduce the issue, validate configuration and add automated tests before promoting the workload."
    }
  ],

  diagnosticWorkflow: [
    {
      id: "step-01",
      title: "Establish scope and stop unsafe changes",
      objective:
        "Confirm which service, environment and release are affected before touching the workload.",
      commands: [
        "kubectl config current-context",
        "kubectl get namespaces",
        "kubectl -n <namespace> get deployment,statefulset,daemonset",
        "kubectl -n <namespace> get pods -o wide",
        "kubectl -n <namespace> rollout status deployment/<deployment> --timeout=30s"
      ],
      expectedEvidence: [
        "The current context identifies the intended cluster.",
        "Pod output shows READY, STATUS, RESTARTS, AGE and NODE.",
        "Rollout status identifies whether the release is progressing or blocked."
      ],
      decisionPoints: [
        "If the context or namespace is unexpected, stop before issuing write commands.",
        "If all replicas are affected, investigate shared configuration, dependencies and recent changes.",
        "If only one pod is affected, compare its node, image, events and configuration with a healthy replica.",
        "If the rollout is still progressing, determine whether it is safe to pause or roll back through the team's deployment procedure."
      ],
      safetyNotes: [
        "A rollout status command can wait until its timeout; it does not change the deployment.",
        "Do not delete all pods to make the symptoms disappear.",
        "Record the release version, image digest and incident start time."
      ]
    },
    {
      id: "step-02",
      title: "Collect pod events and container state",
      objective:
        "Determine whether the immediate failure is a probe failure, process exit, scheduling problem or resource termination.",
      commands: [
        "kubectl -n <namespace> describe pod <pod>",
        "kubectl -n <namespace> get pod <pod> -o yaml",
        "kubectl -n <namespace> get events --sort-by=.metadata.creationTimestamp",
        "kubectl -n <namespace> get pod <pod> -o jsonpath='{range .status.containerStatuses[*]}{.name}{\" restarts=\"}{.restartCount}{\" waiting=\"}{.state.waiting.reason}{\" terminated=\"}{.lastState.terminated.reason}{\" exitCode=\"}{.lastState.terminated.exitCode}{\"\\n\"}{end}"
      ],
      expectedEvidence: [
        "Events may include Unhealthy, Killing, BackOff or Failed.",
        "Container state can show CrashLoopBackOff, Error, OOMKilled or a termination exit code.",
        "The pod specification shows the actual probe settings and container ports."
      ],
      decisionPoints: [
        "If events report connection refused, check whether the process is listening on the expected port.",
        "If events report HTTP 404, verify the probe path and application routing.",
        "If events report HTTP 401 or 403, inspect authentication and authorization requirements.",
        "If the container exits before the probe can run, inspect previous logs and termination state.",
        "If the container was OOMKilled, investigate memory usage and limits before tuning probe timing."
      ],
      safetyNotes: [
        "Events expire; capture them early.",
        "A pod's YAML can contain sensitive environment values. Do not paste secrets into public tickets.",
        "The most recent termination state is useful but may not explain earlier failures."
      ]
    },
    {
      id: "step-03",
      title: "Compare current and previous container logs",
      objective:
        "Find application-level errors around the exact probe failure timestamp.",
      commands: [
        "kubectl -n <namespace> logs <pod> -c <container> --timestamps --since=30m",
        "kubectl -n <namespace> logs <pod> -c <container> --previous --timestamps",
        "kubectl -n <namespace> get pod <pod> -o jsonpath='{.status.containerStatuses[?(@.name==\"<container>\")].lastState.terminated.finishedAt}'"
      ],
      expectedEvidence: [
        "Startup logs reveal initialization duration and listener startup.",
        "Previous logs may reveal fatal exceptions from the crashed container.",
        "Timestamps help correlate probe events with database timeouts, garbage collection or memory pressure."
      ],
      decisionPoints: [
        "If the application never binds to the expected port, investigate startup errors and application configuration.",
        "If the listener starts after probe failures, calculate the startup window and evaluate a startup probe.",
        "If long pauses correlate with probe failures, investigate CPU throttling, garbage collection and thread starvation.",
        "If previous logs are unavailable, use centralized logs and metrics; the container may not have restarted or retained output."
      ],
      safetyNotes: [
        "Do not expose tokens, passwords or customer data from logs.",
        "Avoid restarting the workload before collecting previous-container evidence."
      ]
    },
    {
      id: "step-04",
      title: "Inspect the live probe configuration",
      objective:
        "Verify what Kubernetes actually runs instead of assuming the source manifest matches the cluster.",
      commands: [
        "kubectl -n <namespace> get deployment <deployment> -o yaml",
        "kubectl -n <namespace> get pod <pod> -o jsonpath='{range .spec.containers[*]}{.name}{\"\\n startup=\"}{.startupProbe}{\"\\n readiness=\"}{.readinessProbe}{\"\\n liveness=\"}{.livenessProbe}{\"\\n ports=\"}{.ports}{\"\\n\"}{end}'",
        "kubectl -n <namespace> get rs",
        "helm -n <namespace> get values <release> --all",
        "helm -n <namespace> get manifest <release>"
      ],
      expectedEvidence: [
        "The live Pod specification includes the effective probe configuration.",
        "ReplicaSets reveal which revision is active and whether multiple revisions coexist.",
        "Helm output can reveal rendered values that differ from the developer's assumptions."
      ],
      decisionPoints: [
        "If the Pod differs from the expected manifest, identify the deployment mechanism and source of truth.",
        "If the configured port is a name, verify that the name exists on the same container.",
        "If the path or scheme changed in the last release, compare the last known good revision.",
        "If admission policies mutate the Pod, inspect the final Pod specification rather than only the submitted YAML."
      ],
      safetyNotes: [
        "Helm values and manifests can expose sensitive configuration.",
        "Do not directly patch a Helm-managed object without understanding how the next reconciliation will affect it.",
        "Do not assume the latest ReplicaSet is the only one serving traffic."
      ]
    },
    {
      id: "step-05",
      title: "Validate the probe endpoint from the correct network location",
      objective:
        "Determine whether the application endpoint responds as expected from the kubelet's probe execution context.",
      commands: [
        "kubectl -n <namespace> get pod <pod> -o wide",
        "kubectl -n <namespace> get pod <pod> -o jsonpath='{.status.podIP}{\"\\n\"}'",
        "kubectl -n <namespace> exec <pod> -c <container> -- sh -c 'id; cat /proc/1/cmdline 2>/dev/null | tr \"\\000\" \" \"'",
        "kubectl -n <namespace> exec <pod> -c <container> -- sh -c 'command -v curl || command -v wget || true'",
        "kubectl -n <namespace> exec <pod> -c <container> -- sh -c 'curl -sS -o /dev/null -w \"http=%{http_code} time=%{time_total}\\n\" http://127.0.0.1:<port>/<path>'"
      ],
      expectedEvidence: [
        "The actual listener and application process are identified.",
        "A local request returns the expected status code.",
        "The endpoint latency is measured instead of merely assuming it is fast enough."
      ],
      decisionPoints: [
        "If curl is missing, use an approved ephemeral debug container or a diagnostic image rather than installing packages into production.",
        "If localhost succeeds but the kubelet probe fails, inspect the probe host, port, scheme, headers, timing and node-to-Pod networking.",
        "If localhost fails, investigate the application listener and endpoint implementation first.",
        "If a request hangs, check application saturation and dependency calls within the handler."
      ],
      safetyNotes: [
        "Containers may intentionally omit shells, curl and wget.",
        "An ephemeral container requires appropriate permissions and may alter the Pod's debug state.",
        "A request made inside the container does not perfectly reproduce every kubelet probe condition."
      ]
    },
    {
      id: "step-06",
      title: "Inspect Service endpoints and real traffic separately",
      objective:
        "Find out whether the probe failure is affecting Service routing or whether a separate Service/network issue exists.",
      commands: [
        "kubectl -n <namespace> get svc",
        "kubectl -n <namespace> describe svc <service>",
        "kubectl -n <namespace> get endpoints <service> -o yaml",
        "kubectl -n <namespace> get endpointslice -l kubernetes.io/service-name=<service> -o yaml",
        "kubectl -n <namespace> get pods --show-labels"
      ],
      expectedEvidence: [
        "The Service selector matches the intended Pods.",
        "EndpointSlice addresses and conditions indicate which endpoints are eligible.",
        "Pod readiness and actual application request success can be compared."
      ],
      decisionPoints: [
        "If no ready endpoints exist, check readiness probes, labels, selectors and endpoint conditions.",
        "If endpoints exist but traffic fails, investigate Service ports, target ports, network policy, ingress or application routing.",
        "If readiness is healthy but requests fail, inspect the endpoint's semantic accuracy and actual user-facing request path.",
        "If only some replicas fail, compare their image, node, configuration and dependencies."
      ],
      safetyNotes: [
        "Endpoint behavior can vary with terminating endpoints, publishNotReadyAddresses and other Service settings.",
        "Do not change Service selectors blindly; this can route production traffic to the wrong Pods."
      ]
    },
    {
      id: "step-07",
      title: "Evaluate timing and resource pressure",
      objective:
        "Determine whether the probe is incorrectly tuned or the application is genuinely too slow under current load.",
      commands: [
        "kubectl -n <namespace> top pod <pod> --containers",
        "kubectl top nodes",
        "kubectl -n <namespace> describe pod <pod>",
        "kubectl -n <namespace> get deployment <deployment> -o jsonpath='{range .spec.template.spec.containers[*]}{.name}{\" requests=\"}{.resources.requests}{\" limits=\"}{.resources.limits}{\"\\n\"}{end}'",
        "kubectl -n <namespace> get events --sort-by=.metadata.creationTimestamp"
      ],
      expectedEvidence: [
        "Metrics reveal CPU and memory utilization when Metrics Server is available.",
        "Events and container status reveal OOMKilled, eviction and scheduling signals.",
        "Resource limits, restart counts and probe latency can be compared."
      ],
      decisionPoints: [
        "If CPU is throttled or saturated, inspect application performance and CPU limits before increasing probe thresholds.",
        "If memory approaches the limit and the container is OOMKilled, investigate heap, memory leaks and container sizing.",
        "If initialization is slow but progresses normally, evaluate startupProbe thresholds.",
        "If the process is stuck permanently, making all probes more tolerant only delays recovery."
      ],
      safetyNotes: [
        "kubectl top is a snapshot, not a historical graph.",
        "Use monitoring history to correlate latency, throttling, memory and restarts.",
        "Do not increase CPU or memory limits without checking node capacity and scheduling impact."
      ]
    },
    {
      id: "step-08",
      title: "Identify the root cause and select the smallest safe fix",
      objective:
        "Turn evidence into a specific corrective action.",
      commands: [
        "git diff -- <manifest-or-chart-path>",
        "kubectl diff -f <validated-manifest.yaml>",
        "kubectl -n <namespace> rollout history deployment/<deployment>",
        "kubectl -n <namespace> get deployment <deployment> -o yaml"
      ],
      expectedEvidence: [
        "The change is traceable to a commit, release or configuration update.",
        "The proposed manifest diff contains only intended changes.",
        "The last known good revision is identifiable."
      ],
      decisionPoints: [
        "Wrong path or port: correct the probe to match the real health endpoint and listener.",
        "Slow startup: introduce or tune startupProbe based on measured initialization time.",
        "Bad readiness semantics: implement a dedicated readiness endpoint.",
        "Transient resource pressure: fix capacity or application performance rather than blindly increasing timeouts.",
        "Regression after release: follow the approved rollback process if rollback is safer than an untested fix.",
        "Node-specific failure: investigate kubelet, node pressure and node networking before modifying the application probe."
      ],
      safetyNotes: [
        "Use a reviewed and validated manifest or chart change.",
        "kubectl diff is a preview, not a complete guarantee of what admission or controllers will do.",
        "Do not make unrelated probe changes during an active incident."
      ]
    },
    {
      id: "step-09",
      title: "Recover, verify and monitor",
      objective:
        "Confirm the service is healthy after the fix and that the incident does not recur.",
      commands: [
        "kubectl apply --dry-run=server -f <validated-manifest.yaml",
        "kubectl diff -f <validated-manifest.yaml",
        "kubectl apply -f <validated-manifest.yaml",
        "kubectl -n <namespace> rollout status deployment/<deployment> --timeout=5m",
        "kubectl -n <namespace> get pods -o wide",
        "kubectl -n <namespace> get events --sort-by=.metadata.creationTimestamp",
        "kubectl -n <namespace> logs deployment/<deployment> --all-pods=true --since=15m"
      ],
      expectedEvidence: [
        "The new ReplicaSet becomes available and the rollout completes.",
        "Ready replica count matches the desired count.",
        "Restart counts stabilize and probe failure events stop.",
        "Synthetic tests and real service-level indicators recover."
      ],
      decisionPoints: [
        "If the rollout fails again, stop repeated deployments and return to diagnosis.",
        "If Pods become ready but customer requests still fail, investigate application and traffic routing separately.",
        "If a new failure appears, compare timestamps and configuration before making another change.",
        "If rollback is required, use the deployment system's approved rollback procedure and verify its revision."
      ],
      safetyNotes: [
        "The example uses kubectl apply only when the file is the intended source of truth.",
        "Do not combine manual patches and Helm or GitOps changes without a clear ownership plan.",
        "A successful rollout is necessary but not sufficient proof of recovery."
      ]
    }
  ],

  rootCauses: [
    {
      id: "wrong-http-path",
      title: "HTTP probe returns 404",
      symptoms: [
        "Events show HTTP probe failed with statuscode: 404.",
        "The application process is running but the Pod is not ready."
      ],
      evidence: [
        "The live probe path differs from the application's registered health route.",
        "The application uses a context path such as /api but the probe checks /health.",
        "A reverse proxy handles a different path than the container's local server."
      ],
      diagnosis: [
        "Inspect the live startupProbe, readinessProbe and livenessProbe paths.",
        "Test the exact URL from inside the container or an approved debug container.",
        "Compare the endpoint with application route configuration and recent commits.",
        "Check whether redirects, virtual hosts or authentication affect the response."
      ],
      remediation: [
        "Correct the probe path to the actual intended health endpoint.",
        "If the application lacks a dedicated endpoint, implement one that reports meaningful local health.",
        "Validate the change in staging and deploy through the normal release pipeline."
      ],
      verification: [
        "The exact probe URL returns the expected successful HTTP status.",
        "Unhealthy events stop and the Pod becomes ready when appropriate.",
        "Synthetic requests and application error rate recover."
      ],
      prevention: [
        "Test health routes in CI.",
        "Keep health endpoint paths in version-controlled configuration.",
        "Add deployment smoke tests that call the same endpoint."
      ]
    },
    {
      id: "wrong-port",
      title: "Probe port does not match the listener",
      symptoms: [
        "Connection refused events.",
        "The application listens on one port while the probe targets another."
      ],
      evidence: [
        "The effective containerPort name or number does not match the listener.",
        "Application startup logs identify a different bind port.",
        "A request to the configured port fails while the actual port responds."
      ],
      diagnosis: [
        "Inspect the Pod's container ports and the probe's port value.",
        "Check application environment variables and command-line arguments.",
        "Confirm that a named probe port references a port declared on the same container.",
        "Test both the configured port and the confirmed listener port."
      ],
      remediation: [
        "Align the probe port with the actual application listener.",
        "Keep Service targetPort configuration separate from the container's local probe port where appropriate.",
        "Add a configuration test to prevent port drift."
      ],
      verification: [
        "The configured probe port responds as expected.",
        "Probe events stop and readiness matches application health."
      ],
      prevention: [
        "Use consistent port names in manifests and charts.",
        "Validate rendered Helm manifests in CI.",
        "Avoid maintaining duplicate, hard-coded port values."
      ]
    },
    {
      id: "slow-startup",
      title: "Application needs more time to initialize",
      symptoms: [
        "The container is repeatedly restarted during startup.",
        "Logs show that initialization eventually completes.",
        "The workload fails mainly after cold starts or large releases."
      ],
      evidence: [
        "The application begins listening later than the liveness probe's allowed window.",
        "Initialization time varies with cache loading, migrations or JVM warm-up.",
        "The failure happens before startup completion."
      ],
      diagnosis: [
        "Measure startup duration across multiple deployments.",
        "Determine whether the application makes progress or hangs indefinitely.",
        "Inspect startupProbe settings and current liveness/readiness behavior.",
        "Review initialization dependencies, database migrations and image changes."
      ],
      remediation: [
        "Configure startupProbe with a measured startup budget.",
        "Allow readiness to remain false until traffic can be served safely.",
        "Retain a liveness probe that detects genuine stuck processes after startup.",
        "Optimize unnecessarily expensive initialization if it exceeds the service's startup objective."
      ],
      verification: [
        "Cold starts complete without premature liveness restarts.",
        "Readiness becomes successful only after the application can serve traffic.",
        "The deployment rollout finishes within its operational objective."
      ],
      prevention: [
        "Measure startup latency as a deployment metric.",
        "Test cold starts and resource-constrained environments.",
        "Alert on sustained startup duration increases."
      ]
    },
    {
      id: "readiness-dependency",
      title: "Readiness endpoint fails because a dependency is unavailable",
      symptoms: [
        "All replicas become unready during a database or external API outage.",
        "The application process remains alive.",
        "Probe failures and dependency errors begin at similar timestamps."
      ],
      evidence: [
        "The readiness handler calls a remote dependency and blocks or returns failure.",
        "Dependency timeout or connection errors appear in application logs.",
        "The process can still serve some routes or return controlled errors."
      ],
      diagnosis: [
        "Determine whether the dependency is essential for every request served by this application.",
        "Check dependency latency, connection pool saturation, DNS and network policy.",
        "Inspect whether the health handler waits synchronously for every dependency.",
        "Compare readiness behavior with real customer request success."
      ],
      remediation: [
        "Design readiness around whether the instance can safely handle its intended traffic.",
        "Use bounded dependency checks when a dependency is genuinely required.",
        "Avoid making liveness fail solely because a remote dependency is unavailable.",
        "Use application-level resilience such as timeouts, circuit breakers and controlled degradation where appropriate."
      ],
      verification: [
        "A dependency outage no longer causes unnecessary process restart loops.",
        "Readiness reflects actual ability to serve intended requests.",
        "Recovery after the dependency returns is automatic and observable."
      ],
      prevention: [
        "Document health endpoint semantics.",
        "Test dependency outages in staging.",
        "Monitor dependency errors separately from process liveness."
      ]
    },
    {
      id: "cpu-pressure",
      title: "CPU throttling or saturation causes probe timeouts",
      symptoms: [
        "Probe latency increases during traffic peaks.",
        "Application latency and request queues rise.",
        "Failures are intermittent rather than constant."
      ],
      evidence: [
        "CPU utilization or throttling increases around the incident.",
        "Application profiling shows expensive work or thread starvation.",
        "Probe timeouts correlate with load."
      ],
      diagnosis: [
        "Compare CPU and latency graphs at the exact incident time.",
        "Inspect container requests and limits.",
        "Review garbage collection, thread pools and request queues.",
        "Compare healthy and unhealthy replicas and their nodes."
      ],
      remediation: [
        "Optimize the expensive code path or reduce unnecessary contention.",
        "Review resource requests and limits against actual demand and node capacity.",
        "Tune probe timeouts only when evidence shows the health check needs a larger legitimate response budget."
      ],
      verification: [
        "Probe latency remains below the configured timeout under representative load.",
        "Customer latency and error rate improve.",
        "Restart counts remain stable during peak traffic."
      ],
      prevention: [
        "Load-test health endpoints and the application.",
        "Alert on CPU throttling, latency and restarts together.",
        "Review resource sizing after significant traffic changes."
      ]
    },
    {
      id: "oom-killed",
      title: "Memory pressure terminates the container",
      symptoms: [
        "Container status reports OOMKilled.",
        "Restart count increases and probe events appear near termination.",
        "Memory usage grows before the failure."
      ],
      evidence: [
        "The previous termination reason is OOMKilled.",
        "Container memory metrics approach the configured limit.",
        "Application logs or profiling show a leak or excessive allocation."
      ],
      diagnosis: [
        "Inspect container memory requests and limits.",
        "Compare historical memory metrics with restart timestamps.",
        "Check application heap, native memory and cache behavior.",
        "Determine whether the probe failure preceded the OOM event or merely followed it."
      ],
      remediation: [
        "Fix memory leaks or unbounded caches where identified.",
        "Adjust memory requests and limits only after capacity review.",
        "Do not use probe tuning as a substitute for memory remediation."
      ],
      verification: [
        "Memory remains within a sustainable range under expected load.",
        "OOMKilled events stop.",
        "Probe and customer-facing metrics recover."
      ],
      prevention: [
        "Alert on memory growth and OOM kills.",
        "Run memory soak tests.",
        "Track memory usage by release."
      ]
    },
    {
      id: "exec-probe",
      title: "Exec probe fails inside the container",
      symptoms: [
        "Events report an exec probe failure.",
        "The container is distroless or lacks expected shell utilities.",
        "A script or binary referenced by the probe is missing."
      ],
      evidence: [
        "The probe command references a missing executable or incorrect path.",
        "The process user cannot execute the command.",
        "The command returns non-zero even though the application is serving traffic."
      ],
      diagnosis: [
        "Inspect the exact command and image contents.",
        "Check executable path, permissions, exit code and required environment.",
        "Run an equivalent diagnostic command in a safe test environment.",
        "Determine whether the probe starts a new process frequently and adds meaningful overhead."
      ],
      remediation: [
        "Correct the command or package the required health-check binary.",
        "Prefer a simple application-owned HTTP endpoint where suitable.",
        "Avoid complex scripts that depend on utilities absent from minimal images."
      ],
      verification: [
        "The command exits successfully under the same user and filesystem constraints.",
        "Probe failures stop.",
        "The health check remains lightweight."
      ],
      prevention: [
        "Test the final container image in CI.",
        "Avoid relying on undocumented image contents.",
        "Document probe command dependencies."
      ]
    },
    {
      id: "tls-scheme",
      title: "HTTPS probe fails because of scheme or certificate assumptions",
      symptoms: [
        "HTTP probe reports TLS or connection errors.",
        "The application listener uses HTTPS but the probe uses HTTP, or vice versa."
      ],
      evidence: [
        "The probe's scheme does not match the actual listener.",
        "The application redirects or rejects the request.",
        "TLS termination occurs in a proxy rather than in the container."
      ],
      diagnosis: [
        "Inspect the configured scheme and listener protocol.",
        "Test the correct endpoint from an approved diagnostic context.",
        "Check the server certificate, TLS configuration and proxy architecture.",
        "Review redirects and virtual-host requirements."
      ],
      remediation: [
        "Align the probe scheme with the endpoint served by the container.",
        "Avoid adding unnecessary TLS complexity to a local health endpoint.",
        "Use a dedicated health route with predictable behavior."
      ],
      verification: [
        "The probe reaches the correct listener and returns the expected status.",
        "TLS errors no longer appear in probe events."
      ],
      prevention: [
        "Test health checks against the final deployment configuration.",
        "Document where TLS terminates."
      ]
    },
    {
      id: "node-kubelet",
      title: "Probe failures are isolated to one node",
      symptoms: [
        "Pods on one node fail while equivalent Pods elsewhere are healthy.",
        "Probe failures coincide with node pressure or kubelet issues."
      ],
      evidence: [
        "Affected Pod placement shares a node.",
        "Node conditions show pressure or NotReady.",
        "Kubelet or node-network logs report errors."
      ],
      diagnosis: [
        "Compare pod placement and probe results across nodes.",
        "Inspect node conditions and resource pressure.",
        "Check node-level kubelet logs through the approved infrastructure access path.",
        "Review recent node upgrades, CNI changes and runtime issues."
      ],
      remediation: [
        "Escalate to the platform team if the failure is node-specific.",
        "Cordon or drain a node only under the cluster's operational procedure and after capacity checks.",
        "Repair the node or roll back a node-level change using the approved process."
      ],
      verification: [
        "Affected workloads remain healthy after remediation.",
        "Node conditions and kubelet health return to normal."
      ],
      prevention: [
        "Monitor node conditions and kubelet errors.",
        "Use staged node upgrades.",
        "Test probe behavior during node maintenance."
      ]
    }
  ],

  incidentScenarios: [
    {
      id: "incident-01",
      title: "Production deployment enters CrashLoopBackOff after a probe change",
      severity: "SEV-1 or SEV-2 depending on customer impact",
      impact: [
        "New Pods repeatedly restart.",
        "Available replicas fall below the desired count.",
        "A rollout may stall or cause elevated error rates."
      ],
      timeline: [
        "T+00: Alert fires for increased restarts and reduced available replicas.",
        "T+03: Confirm context, namespace, deployment and release revision.",
        "T+05: Capture describe output, events, current logs and previous logs.",
        "T+10: Compare the failing probe configuration with the last known good revision.",
        "T+15: Identify the specific regression and decide whether rollback is safer.",
        "T+20: Apply the reviewed fix or approved rollback.",
        "T+30: Verify rollout, endpoint health, customer metrics and restart stability."
      ],
      investigation: [
        "Run kubectl describe pod and inspect Unhealthy and Killing events.",
        "Inspect logs from the previous container instance.",
        "Compare the exact path, port, scheme, timeout and threshold with the prior release.",
        "Check whether a startupProbe was removed or an endpoint was renamed.",
        "Check resource pressure to rule out a coincident CPU or memory problem."
      ],
      recovery: [
        "If the new probe configuration is proven to be the regression, use the approved deployment rollback or a minimal reviewed fix.",
        "Wait for the rollout to finish and confirm the desired number of available replicas.",
        "Check real requests, error rate, latency and restart counts.",
        "Keep incident monitoring active for an agreed observation period."
      ],
      successCriteria: [
        "Desired replicas are available.",
        "No sustained probe failures or restart growth remain.",
        "Service-level indicators recover.",
        "The regression and preventive action are documented."
      ]
    },
    {
      id: "incident-02",
      title: "All replicas become unready during a database outage",
      severity: "SEV-1 or SEV-2 depending on service criticality",
      impact: [
        "Service endpoints may lose ready replicas.",
        "Traffic may fail even though application processes remain alive.",
        "Repeated restarts may increase database connection pressure."
      ],
      timeline: [
        "T+00: Readiness failure and application errors begin.",
        "T+03: Confirm whether database latency or connectivity changed at the same time.",
        "T+07: Compare readiness behavior and actual request requirements.",
        "T+12: Coordinate database and application incident response.",
        "T+20: Restore dependency health or apply a reviewed resilience fix.",
        "T+30: Verify that replicas recover without restart storms."
      ],
      investigation: [
        "Inspect readiness events and application logs.",
        "Check database connectivity, connection pool saturation, DNS and network policy.",
        "Determine whether the health endpoint waits for database availability.",
        "Distinguish an essential dependency failure from an overly strict health endpoint."
      ],
      recovery: [
        "Restore the dependency when the database is the actual root cause.",
        "Do not disable readiness merely to make Pods appear healthy.",
        "Do not weaken liveness in a way that leaves genuinely stuck processes unrecoverable.",
        "If application resilience is insufficient, implement a reviewed endpoint and dependency-handling change."
      ],
      successCriteria: [
        "Dependency metrics recover.",
        "Readiness reflects the application's real ability to serve traffic.",
        "No unnecessary restart loop occurs.",
        "Customer transactions succeed."
      ]
    },
    {
      id: "incident-03",
      title: "New version starts slowly and fails liveness",
      severity: "SEV-2 if deployment capacity or traffic is affected",
      impact: [
        "Rollout takes longer than expected.",
        "New containers are restarted before initialization finishes.",
        "Healthy old replicas may temporarily carry extra load."
      ],
      timeline: [
        "T+00: New Pods fail probes during initialization.",
        "T+05: Compare startup logs and startup duration with the previous version.",
        "T+10: Measure cold-start time and inspect current probe configuration.",
        "T+15: Determine whether startup is slow but progressing or permanently stuck.",
        "T+20: Add or tune startup protection based on measured startup behavior.",
        "T+30: Validate the rollout and cold-start behavior in a controlled environment."
      ],
      investigation: [
        "Check when the process begins listening.",
        "Check initialization steps, migration duration, cache warm-up and CPU limits.",
        "Inspect whether liveness is running before startup has completed.",
        "Compare several cold starts rather than relying on a single observation."
      ],
      recovery: [
        "Use a startupProbe when slow initialization is legitimate and measurable.",
        "Correct the application if startup has become unexpectedly slow.",
        "Preserve readiness behavior so the container receives traffic only when ready."
      ],
      successCriteria: [
        "Startup completes within the agreed objective.",
        "No premature liveness restarts occur.",
        "Rollout and customer traffic remain healthy."
      ]
    },
    {
      id: "incident-04",
      title: "One replica fails intermittently under peak load",
      severity: "SEV-2 or SEV-3 based on capacity and customer impact",
      impact: [
        "Traffic is unevenly distributed across remaining replicas.",
        "One Pod repeatedly leaves and rejoins ready endpoints.",
        "Latency or error rates may increase during peaks."
      ],
      timeline: [
        "T+00: Alert identifies probe failures on a subset of Pods.",
        "T+05: Compare node placement, resource metrics and request latency.",
        "T+10: Correlate probe timeout events with CPU, memory and application queues.",
        "T+20: Apply the evidence-backed resource or application fix.",
        "T+30: Load-test and observe the service during representative traffic."
      ],
      investigation: [
        "Compare failing and healthy replicas.",
        "Inspect CPU throttling, memory, thread pools and garbage collection.",
        "Check whether the health handler competes with business requests.",
        "Review probe timeout and period against measured latency."
      ],
      recovery: [
        "Fix the resource bottleneck or expensive application work.",
        "Tune probe settings only if measured health-check latency justifies it.",
        "Verify adequate capacity remains while one replica is unready."
      ],
      successCriteria: [
        "Probe latency remains within its configured budget.",
        "Restart counts stabilize.",
        "Peak-load service-level indicators recover."
      ]
    }
  ],

  commandReference: [
    {
      purpose: "Inspect Pod events and probe failures",
      command: "kubectl -n <namespace> describe pod <pod>",
      interpretation:
        "Look for Unhealthy, Killing, BackOff, Failed and node-related warnings. Correlate timestamps with logs."
    },
    {
      purpose: "Show probe configuration from the live Deployment",
      command: "kubectl -n <namespace> get deployment <deployment> -o yaml",
      interpretation:
        "Inspect the actual template's startupProbe, readinessProbe, livenessProbe, ports, resources and image."
    },
    {
      purpose: "Read logs from the current container",
      command: "kubectl -n <namespace> logs <pod> -c <container> --timestamps --since=30m",
      interpretation:
        "Identify startup failures, listener binding, endpoint errors, dependency failures and pauses."
    },
    {
      purpose: "Read logs from the previous crashed container",
      command: "kubectl -n <namespace> logs <pod> -c <container> --previous --timestamps",
      interpretation:
        "Useful when the container restarted and its previous logs are still available."
    },
    {
      purpose: "Check current and previous termination state",
      command: "kubectl -n <namespace> get pod <pod> -o jsonpath='{range .status.containerStatuses[*]}{.name}{\" restarts=\"}{.restartCount}{\" lastReason=\"}{.lastState.terminated.reason}{\" exit=\"}{.lastState.terminated.exitCode}{\"\\n\"}{end}",
      interpretation:
        "Distinguish probe-triggered restarts from OOMKilled and application process exits."
    },
    {
      purpose: "Inspect resource usage",
      command: "kubectl -n <namespace> top pod <pod> --containers",
      interpretation:
        "Provides a current CPU and memory snapshot when Metrics Server is available; use historical metrics for incident correlation."
    },
    {
      purpose: "Check node conditions",
      command: "kubectl describe node <node>",
      interpretation:
        "Look for MemoryPressure, DiskPressure, PIDPressure, NotReady and recent node events."
    },
    {
      purpose: "Inspect Service endpoints",
      command: "kubectl -n <namespace> get endpointslice -l kubernetes.io/service-name=<service> -o yaml",
      interpretation:
        "Check endpoint addresses and readiness/serving conditions; distinguish probe failures from Service routing issues."
    },
    {
      purpose: "Inspect rollout history",
      command: "kubectl -n <namespace> rollout history deployment/<deployment>",
      interpretation:
        "Identify revisions for investigation. Use the approved rollback process after confirming the target revision."
    },
    {
      purpose: "Check recent events",
      command: "kubectl -n <namespace> get events --sort-by=.metadata.creationTimestamp",
      interpretation:
        "Establish event order. Events are retained for a limited period and may not contain the complete history."
    },
    {
      purpose: "Validate a proposed manifest against the API server",
      command: "kubectl apply --dry-run=server -f <validated-manifest.yaml>",
      interpretation:
        "Checks server-side validation and admission behavior without persisting the requested resource changes."
    },
    {
      purpose: "Review proposed manifest changes",
      command: "kubectl diff -f <validated-manifest.yaml>",
      interpretation:
        "Shows a prospective difference where supported. Review it carefully; it does not guarantee runtime success."
    },
    {
      purpose: "Inspect effective Helm values",
      command: "helm -n <namespace> get values <release> --all",
      interpretation:
        "Compare deployed values with chart defaults and the intended release. Protect sensitive values."
    }
  ],

  productionChecklist: [
    "Confirm cluster context, namespace, workload, image version and release timestamp.",
    "Record the incident start time, affected regions and customer impact.",
    "Check desired, ready and available replicas.",
    "Capture Pod descriptions, events, current logs and previous logs before disruptive actions.",
    "Inspect the actual Pod probe configuration, not only the source chart.",
    "Verify HTTP path, port, scheme, headers, timeout and thresholds.",
    "Confirm whether the application is listening on the expected address and port.",
    "Check CPU, memory, OOMKilled, node pressure and application latency.",
    "Inspect Service selectors and EndpointSlices if traffic is affected.",
    "Compare failing replicas with healthy replicas.",
    "Identify the exact root cause and the smallest safe corrective action.",
    "Review the diff and use the approved deployment mechanism.",
    "Verify rollout completion, endpoint health, synthetic requests and service-level indicators.",
    "Document rollback decisions, evidence, root cause and preventive actions."
  ],

  prevention: [
    "Define clear semantics for startup, readiness and liveness endpoints.",
    "Add manifest schema and policy validation to CI.",
    "Test health endpoints against the final container image.",
    "Validate rendered Helm manifests before deployment.",
    "Measure startup duration and health endpoint latency.",
    "Run load tests to detect probe timeouts caused by resource contention.",
    "Exercise dependency outages and slow-start scenarios in staging.",
    "Alert on sustained probe failures, restart increases and available replica loss.",
    "Track probe-related failures by deployment revision and image digest.",
    "Use progressive delivery where available so bad releases affect fewer replicas.",
    "Keep a documented, tested rollback procedure.",
    "Review probe settings whenever startup logic, endpoint paths, ports or resource limits change."
  ],

  monitoring: [
    "Monitor Kubernetes container restart counts and restart rate.",
    "Alert on sustained Unhealthy probe events where event-based monitoring is available.",
    "Monitor Deployment available replicas against desired replicas.",
    "Track rollout duration and rollout failure rate.",
    "Monitor application readiness, request latency, error rate and throughput.",
    "Track container CPU, memory, throttling and OOM kills.",
    "Track application startup duration and health endpoint latency.",
    "Monitor node readiness and node pressure.",
    "Correlate alerts with deployment revision, image digest and release timestamp.",
    "Avoid alerts that page on every isolated transient failure without considering duration and impact."
  ],

  incidentReportTemplate: [
    "Incident ID and service:",
    "Environment, cluster and namespace:",
    "Severity and customer impact:",
    "Incident start, detection and recovery timestamps:",
    "Affected deployment revision and image digest:",
    "Initial symptoms and alerts:",
    "Evidence collected: Pod events, logs, probe configuration and metrics:",
    "Root cause supported by evidence:",
    "Contributing factors:",
    "Corrective action and change reference:",
    "Rollback performed and reason, if applicable:",
    "Verification performed and service-level indicators recovered:",
    "Preventive actions, owners and due dates:",
    "Runbook or monitoring improvements:"
  ],

  labs: [
    {
      title: "Lab 1 — Incorrect HTTP readiness path",
      objective:
        "Understand how an incorrect endpoint prevents a Pod from becoming ready.",
      steps: [
        "Create a disposable test namespace and a test HTTP application.",
        "Configure readinessProbe to use a path that returns HTTP 404.",
        "Run kubectl describe pod and identify the Unhealthy event.",
        "Test the correct and incorrect endpoints from an approved diagnostic context.",
        "Fix the path in the manifest and apply the corrected test workload.",
        "Confirm the Pod becomes ready and its Service receives a ready endpoint."
      ],
      expectedResult:
        "The initial Pod fails readiness; after correcting the endpoint, it becomes ready without requiring a liveness-triggered restart.",
      cleanup: [
        "Confirm the namespace contains only lab resources.",
        "Delete the lab namespace when finished.",
        "Never run this deliberately broken configuration against production."
      ]
    },
    {
      title: "Lab 2 — Slow startup and startupProbe",
      objective:
        "Demonstrate why startup protection is useful for slow initialization.",
      steps: [
        "Use a disposable test application that delays listener startup.",
        "Configure an aggressive liveness probe and observe the restart behavior.",
        "Capture events and startup timestamps.",
        "Add a startupProbe with a budget based on measured startup duration.",
        "Retest cold starts and confirm liveness begins protecting the process after startup succeeds."
      ],
      expectedResult:
        "The correctly configured startup probe protects legitimate initialization while liveness remains available for later stuck-process detection.",
      cleanup: [
        "Remove the lab resources.",
        "Do not copy arbitrary timing values into production without measuring startup duration."
      ]
    },
    {
      title: "Lab 3 — Readiness versus liveness during dependency failure",
      objective:
        "Understand why a remote dependency outage should not automatically cause a restart storm.",
      steps: [
        "Create a test application with separate readiness and liveness endpoints.",
        "Simulate an unavailable dependency in the test environment.",
        "Observe readiness failures while the process remains alive.",
        "Inspect Service endpoint conditions.",
        "Restore the dependency and verify that readiness recovers."
      ],
      expectedResult:
        "The test demonstrates that readiness can stop normal traffic to an unhealthy instance without necessarily restarting the process.",
      cleanup: [
        "Restore the dependency and confirm test health.",
        "Delete the isolated test resources."
      ]
    },
    {
      title: "Lab 4 — Resource pressure and probe latency",
      objective:
        "Correlate resource pressure with health endpoint latency.",
      steps: [
        "Use an isolated load-testing environment.",
        "Measure normal probe latency and application request latency.",
        "Apply controlled load while collecting CPU, memory and restart metrics.",
        "Compare the probe failure timestamps with resource metrics.",
        "Fix the identified bottleneck and repeat the test."
      ],
      expectedResult:
        "The learner can distinguish a real resource bottleneck from an incorrectly configured probe.",
      cleanup: [
        "Stop all load generators.",
        "Remove temporary workloads and restore the lab environment.",
        "Do not create artificial resource exhaustion on shared production nodes."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is the difference between startup, readiness and liveness probes?",
      answer:
        "Startup checks whether initialization has completed. Readiness determines whether normal Service traffic should be directed to the container. Liveness detects a failure that warrants restarting the container.",
      productionExample:
        "A Java service needs 70 seconds to initialize. A startup probe protects initialization, readiness waits until it can serve traffic, and liveness detects a later deadlock."
    },
    {
      question: "Does a failed readiness probe restart a container?",
      answer:
        "No. Readiness normally marks the container not ready; it does not by itself restart the container.",
      productionExample:
        "An application temporarily cannot serve requests. Its endpoint is removed from normal ready traffic while the process continues running."
    },
    {
      question: "What happens when a liveness probe repeatedly fails?",
      answer:
        "After failureThreshold is reached, kubelet restarts the container. The container restart policy and workload controller determine the subsequent behavior.",
      productionExample:
        "A deadlocked process fails its liveness endpoint repeatedly and is restarted, after which the application recovers."
    },
    {
      question: "Why use a startup probe?",
      answer:
        "It gives a slow-starting application a bounded initialization window before liveness failures can restart it.",
      productionExample:
        "A service loads a large cache on cold start and should not be restarted while making legitimate initialization progress."
    },
    {
      question: "What does connection refused mean in a probe event?",
      answer:
        "The attempted TCP connection was refused. Common causes include no listener on the target port, binding to the wrong address, or a process that has not started.",
      productionExample:
        "The application listens on port 8080, but the probe targets 8081."
    },
    {
      question: "What does HTTP 404 from a probe indicate?",
      answer:
        "The endpoint responded but the requested path was not found on that handler.",
      productionExample:
        "The application health route changed from /health to /healthz, but the deployed probe still uses the old path."
    },
    {
      question: "Why can a readiness endpoint that checks every dependency be dangerous?",
      answer:
        "A transient failure of an optional or shared dependency can make every replica unready and remove all available capacity.",
      productionExample:
        "An analytics API is unavailable, but the main service can still serve critical requests. A health check coupled to analytics incorrectly removes every replica."
    },
    {
      question: "How do you troubleshoot a CrashLoopBackOff associated with probe failures?",
      answer:
        "Inspect Pod events, current and previous logs, termination reason, actual probe settings, listener behavior and resource metrics. Establish whether a probe triggered the restart or the application exited first.",
      productionExample:
        "Previous logs show startup is still running when liveness failures begin, confirming a startup configuration regression."
    },
    {
      question: "What is the difference between timeoutSeconds and periodSeconds?",
      answer:
        "timeoutSeconds is the maximum duration allowed for an individual probe attempt. periodSeconds is the interval between probe executions.",
      productionExample:
        "A health endpoint normally responds in 200 milliseconds but occasionally takes 4 seconds. The team measures latency and tunes the timeout only if the longer response is legitimate."
    },
    {
      question: "What does failureThreshold control?",
      answer:
        "It specifies how many consecutive failures are required before the probe is considered failed for its action.",
      productionExample:
        "A short-lived transient failure should not immediately restart a healthy application, but a permanently stuck process should still be detected."
    },
    {
      question: "Can an HTTP probe access a remote URL through a Service?",
      answer:
        "Kubernetes HTTP probes target the Pod IP by default unless httpGet.host is configured otherwise. They are generally intended to check the local application, not to test the entire external traffic route.",
      productionExample:
        "A Pod-local health check succeeds, but the external Service fails because its selector or ingress configuration is incorrect."
    },
    {
      question: "How do you distinguish OOMKilled from a probe-triggered restart?",
      answer:
        "Inspect container last termination state, reason, exit code, events, logs and memory metrics. Probe events alone do not establish the root cause.",
      productionExample:
        "The container is OOMKilled immediately before the next probe attempt, showing that memory pressure is the primary issue."
    },
    {
      question: "What is the impact of a readiness failure on Service traffic?",
      answer:
        "A Pod that is not ready is normally excluded from ready Service endpoints. EndpointSlice conditions and special Service settings must be checked for exact behavior.",
      productionExample:
        "All replicas fail readiness, so the Service has no normal ready endpoints and requests fail."
    },
    {
      question: "Why might an exec probe fail in a minimal image?",
      answer:
        "The command, shell or utility might not exist, the executable may not be permitted, or the command may return a non-zero status.",
      productionExample:
        "A health check invokes /bin/sh and curl in a distroless image that contains neither."
    },
    {
      question: "What would you do if a new probe change causes a production outage?",
      answer:
        "Assess customer impact, capture evidence, compare the new and last known good configurations, then choose a minimal reviewed fix or approved rollback. Verify recovery with service-level indicators.",
      productionExample:
        "A newly deployed probe uses the wrong port. The team confirms the mismatch, rolls back or corrects the configuration and verifies stable ready replicas."
    },
    {
      question: "Why should liveness not always check database connectivity?",
      answer:
        "A database outage can trigger restarts of otherwise healthy processes, causing restart storms and extra connection pressure without repairing the database.",
      productionExample:
        "The application remains alive during a short database failover and recovers when the database becomes available."
    },
    {
      question: "How do you troubleshoot probe failures isolated to one node?",
      answer:
        "Compare placement across healthy and unhealthy Pods, inspect node conditions and pressure, and review kubelet, runtime and networking evidence through approved node access.",
      productionExample:
        "Only Pods on a node undergoing a runtime problem fail their health checks, while identical Pods on other nodes remain healthy."
    },
    {
      question: "How do you prove a probe fix is successful?",
      answer:
        "Confirm the intended configuration is active, the rollout completes, ready replicas recover, probe failures stop, restart counts stabilize and customer-facing service indicators return to normal.",
      productionExample:
        "A corrected endpoint makes Pods ready, and synthetic requests confirm successful transactions at normal latency."
    }
  ],

  commonMistakes: [
    "Increasing timeoutSeconds, periodSeconds and failureThreshold without collecting evidence.",
    "Using liveness to check every external dependency.",
    "Treating Running as proof that a container is ready.",
    "Assuming readiness failure automatically restarts a container.",
    "Deleting Pods before collecting events and previous logs.",
    "Using the Service port without verifying the container's actual listener.",
    "Checking the wrong namespace or Kubernetes context.",
    "Ignoring OOMKilled, CPU throttling and node pressure.",
    "Testing only the endpoint from a developer laptop instead of the actual Pod context.",
    "Assuming a local HTTP 200 proves ingress, DNS, Service routing and customer traffic are healthy.",
    "Applying a manual patch to a Helm- or GitOps-managed workload without understanding reconciliation.",
    "Disabling probes to force a rollout to complete.",
    "Using aggressive liveness thresholds that cause restart storms.",
    "Making readiness depend on optional services and unintentionally removing every replica.",
    "Failing to validate the final rendered manifest and container image.",
    "Declaring recovery when Pods are ready but customer requests still fail.",
    "Ignoring the effect of probe execution overhead on heavily loaded containers.",
    "Failing to document the root cause and the preventive action."
  ],

  references: [
    {
      title: "Kubernetes documentation: Configure Liveness, Readiness and Startup Probes",
      url: "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/"
    },
    {
      title: "Kubernetes documentation: Debugging Pods",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/"
    },
    {
      title: "Kubernetes documentation: Debugging Services",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/"
    },
    {
      title: "Kubernetes documentation: Deployments",
      url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
    },
    {
      title: "Kubernetes documentation: Pod Lifecycle",
      url: "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/"
    },
    {
      title: "Kubernetes documentation: Resource Management for Pods and Containers",
      url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
    }
  ]
};

export default containerProbesGuide;
