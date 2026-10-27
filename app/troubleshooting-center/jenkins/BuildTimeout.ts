
export interface BuildTimeoutStep {
  id: string;
  title: string;
  purpose: string;
  commands: string[];
  expectedEvidence: string[];
  branches: {
    condition: string;
    nextAction: string;
  }[];
  safetyNote?: string;
}

export interface BuildTimeoutFailure {
  id: string;
  cause: string;
  symptoms: string[];
  evidence: string[];
  diagnosis: string[];
  fix: string[];
  validation: string[];
  prevention: string[];
}

export interface BuildTimeoutIncident {
  title: string;
  severity: string;
  scenario: string;
  impact: string[];
  response: string[];
  recovery: string[];
  rollbackCriteria: string[];
}

export interface BuildTimeoutGuide {
  title: string;
  category: string;
  slug: string;
  overview: string;
  symptoms: string[];
  severityMatrix: {
    severity: string;
    condition: string;
    response: string;
  }[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: BuildTimeoutStep[];
  failureCases: BuildTimeoutFailure[];
  productionIncidents: BuildTimeoutIncident[];
  commandReference: {
    purpose: string;
    command: string;
    interpretation: string;
  }[];
  recoveryRunbook: string[];
  rollbackPlan: string[];
  prevention: string[];
  monitoring: string[];
  cicdValidation: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    successCriteria: string[];
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  references: {
    title: string;
    url: string;
  }[];
}

export const buildTimeoutGuide: BuildTimeoutGuide = {
  title: "Jenkins Build Timeout — Production Troubleshooting",
  category: "Jenkins",
  slug: "build-timeout",

  overview: `
A Jenkins build timeout occurs when a pipeline, stage, agent allocation,
test, deployment, or external operation exceeds its configured time limit
or stops making progress before the expected completion.

A timeout is a symptom, not necessarily the root cause.

Possible causes include:
- Jenkins executor or agent queue delays
- Offline or disconnected agents
- CPU, memory, disk, or inode exhaustion
- Dependency repository slowness
- Maven or Gradle dependency resolution problems
- Hanging unit, integration, or end-to-end tests
- Docker build or image push delays
- Kubernetes pod scheduling or startup delays
- Deployment health checks waiting indefinitely
- Network, DNS, TLS, proxy, or firewall failures
- Lock contention and concurrent pipeline execution
- External API rate limits
- Incorrect timeout placement or overly restrictive timeout values
- A process that continues running after Jenkins stops waiting

The objective is to identify the exact timed-out operation, preserve evidence,
prevent duplicate deployments, recover safely, and remove the underlying cause.
`,

  symptoms: [
    "Pipeline fails with a message containing 'Timeout has been exceeded'.",
    "Build remains in the queue before any pipeline stage starts.",
    "An agent allocation stage consumes most of the timeout budget.",
    "Maven or Gradle downloads dependencies very slowly.",
    "Unit tests stop producing output and never finish.",
    "Docker build, image push, or registry authentication appears stuck.",
    "A Kubernetes deployment waits for pods to become Ready.",
    "An SSH command or deployment script never returns.",
    "The Jenkins agent disconnects while the build is running.",
    "A stage times out, but the remote process may still be active.",
    "Build duration suddenly increases compared with historical runs.",
    "The pipeline is green after retrying, but the original failure remains unexplained."
  ],

  severityMatrix: [
    {
      severity: "SEV-1",
      condition:
        "A production release is partially applied, production availability is affected, or duplicate deployment activity may cause an outage.",
      response:
        "Stop unsafe release activity, notify the incident owner, verify actual production state, and follow the approved rollback or recovery procedure."
    },
    {
      severity: "SEV-2",
      condition:
        "A critical release is blocked, multiple teams are affected, or production deployment capacity is unavailable.",
      response:
        "Assign a pipeline owner, preserve logs, investigate shared Jenkins infrastructure, and communicate the release impact."
    },
    {
      severity: "SEV-3",
      condition:
        "One non-production build or isolated test stage fails without customer impact.",
      response:
        "Diagnose the affected stage and agent, restore the build, and create a follow-up action for recurring causes."
    },
    {
      severity: "SEV-4",
      condition:
        "An intermittent timeout occurs without blocking a release.",
      response:
        "Compare build-duration trends, investigate intermittent dependencies, and improve observability."
    }
  ],

  safetyChecks: [
    "Confirm the Jenkins controller, folder, job, branch, build number, and environment.",
    "Identify whether the timeout occurred in queue time, agent allocation, a stage, a test, or a remote operation.",
    "Check whether a deployment already changed the target environment before retrying.",
    "Verify whether the timed-out process was terminated or is still running remotely.",
    "Do not repeatedly restart Jenkins or all agents as an initial troubleshooting step.",
    "Do not increase timeouts blindly to hide a slow or stuck process.",
    "Do not run a second production deployment until the first deployment's state is understood.",
    "Check change approval, release freeze, and maintenance-window requirements.",
    "Preserve console output, timestamps, test reports, and relevant agent logs.",
    "Redact tokens, passwords, authorization headers, and secret environment variables before sharing logs.",
    "Do not disable TLS verification or grant broad administrator permissions to bypass a failure.",
    "Use read-only diagnostic commands before making infrastructure or production changes."
  ],

  evidenceCollection: [
    "Jenkins job URL, build number, branch, commit SHA, and build trigger.",
    "Build start time, failure time, elapsed duration, and configured timeout.",
    "Full console output surrounding the last successful operation.",
    "Stage View or Pipeline Graph showing where time was spent.",
    "Queue duration, executor availability, agent labels, and agent online status.",
    "Jenkins controller logs and agent logs for the relevant time window.",
    "Agent CPU, memory, disk capacity, inode usage, and process state.",
    "Maven or Gradle logs, dependency repository response times, and test reports.",
    "Docker daemon logs, registry response, and image digest when relevant.",
    "Kubernetes pod events, scheduling conditions, rollout status, and application logs.",
    "Network, DNS, proxy, TLS, and firewall evidence from the affected execution environment.",
    "Comparison with the last successful build using the same commit, agent, and dependency versions.",
    "Deployment audit logs and target-system state if the timed-out stage changed infrastructure.",
    "Recent changes to Jenkinsfiles, shared libraries, plugins, agent images, credentials, or infrastructure."
  ],

  diagnosticWorkflow: [
    {
      id: "step-1",
      title: "Identify the exact timeout boundary",
      purpose:
        "Determine whether Jenkins timed out while waiting for an executor, running a stage, executing a test, or waiting for a remote system.",
      commands: [
        "Open Jenkins > Job > Build Number > Console Output.",
        "Open the Pipeline Stage View or Pipeline Graph.",
        "Record the timeout exception, last completed command, and elapsed time.",
        "Inspect the Jenkinsfile and shared-library code for timeout blocks."
      ],
      expectedEvidence: [
        "The first timeout exception and its timestamp.",
        "The stage that exceeded its limit.",
        "Whether the stage started executing on an agent.",
        "Whether the timeout is global, stage-specific, or operation-specific."
      ],
      branches: [
        {
          condition: "No stage command ran and the job was waiting for an executor.",
          nextAction: "Continue to step-2 and investigate queue and agent capacity."
        },
        {
          condition: "A stage started but stopped progressing.",
          nextAction: "Continue to step-3 and inspect the active operation."
        },
        {
          condition: "A deployment or remote command timed out.",
          nextAction: "Continue to step-7 and verify remote state before retrying."
        }
      ],
      safetyNote:
        "The last console line may not identify the root cause. Correlate timestamps with controller and agent logs."
    },
    {
      id: "step-2",
      title: "Investigate queue and executor delays",
      purpose:
        "Distinguish a slow build from a build that never received an executor.",
      commands: [
        "Open Jenkins > Build Queue and inspect the waiting reason.",
        "Open Manage Jenkins > Nodes and inspect the selected agent.",
        "Check whether the required label exists and has available executors.",
        "Inspect other jobs occupying the same label or node.",
        "Review agent provisioning and autoscaling events."
      ],
      expectedEvidence: [
        "Queue wait duration and waiting reason.",
        "Required label and matching online nodes.",
        "Executor saturation or unavailable capacity.",
        "Agent provisioning errors or repeated offline transitions."
      ],
      branches: [
        {
          condition: "All matching executors are busy.",
          nextAction: "Identify long-running jobs and safely rebalance capacity or concurrency."
        },
        {
          condition: "No online node matches the required label.",
          nextAction: "Correct the label or restore the intended agent using approved procedures."
        },
        {
          condition: "Agents repeatedly go offline.",
          nextAction: "Investigate connectivity, agent process health, resource pressure, and controller logs."
        },
        {
          condition: "An executor was allocated promptly.",
          nextAction: "Continue to step-3."
        }
      ]
    },
    {
      id: "step-3",
      title: "Determine whether the process is active or stuck",
      purpose:
        "Check whether the build is making progress or waiting indefinitely.",
      commands: [
        "Inspect the last 50-100 lines of console output.",
        "Compare timestamps between successive log entries.",
        "Check agent CPU, memory, disk, and process activity.",
        "Identify the exact command running when output stopped.",
        "Check whether the process is waiting for input, a lock, a network call, or a child process."
      ],
      expectedEvidence: [
        "Regular output and changing process activity indicate progress.",
        "No output alone does not prove a deadlock.",
        "High CPU can indicate a slow computation or a busy loop.",
        "Low CPU with no progress can indicate blocking I/O, a lock, or a stalled dependency.",
        "An agent disconnect can make process state unavailable from Jenkins."
      ],
      branches: [
        {
          condition: "The process is progressing but slower than normal.",
          nextAction: "Continue to step-4 and investigate resource and dependency performance."
        },
        {
          condition: "The process is alive but has no progress.",
          nextAction: "Capture process diagnostics and inspect locks, network calls, thread dumps, or child processes."
        },
        {
          condition: "The agent is unreachable.",
          nextAction: "Continue to step-5 and investigate agent health before restarting it."
        }
      ],
      safetyNote:
        "Do not terminate an unfamiliar process until its ownership and production impact are known."
    },
    {
      id: "step-4",
      title: "Inspect agent resource pressure",
      purpose:
        "Identify CPU throttling, memory pressure, disk exhaustion, inode exhaustion, or I/O saturation.",
      commands: [
        "uptime",
        "free -h",
        "df -h",
        "df -i",
        "ps -eo pid,ppid,stat,%cpu,%mem,etime,cmd --sort=-%cpu | head -20",
        "ps -eo pid,ppid,stat,%cpu,%mem,etime,cmd --sort=-%mem | head -20"
      ],
      expectedEvidence: [
        "High load relative to available CPU capacity.",
        "Memory pressure or evidence of an OOM kill.",
        "Filesystem or inode usage near 100%.",
        "Long-running processes consuming unexpected CPU or memory.",
        "Disk I/O saturation or insufficient temporary workspace."
      ],
      branches: [
        {
          condition: "Disk space or inodes are exhausted.",
          nextAction: "Identify the owning workspace, caches, or logs; clean only approved data and verify capacity."
        },
        {
          condition: "Memory pressure or OOM events are present.",
          nextAction: "Inspect heap size, container limits, concurrent jobs, and kernel or container OOM evidence."
        },
        {
          condition: "Resources are healthy.",
          nextAction: "Continue to step-5 or step-6 according to the affected operation."
        }
      ],
      safetyNote:
        "Run Linux commands on the affected agent. Controller metrics do not necessarily represent agent resource usage."
    },
    {
      id: "step-5",
      title: "Investigate Jenkins agent connectivity",
      purpose:
        "Determine whether the controller lost the agent or the agent became unhealthy.",
      commands: [
        "Check agent status in Manage Jenkins > Nodes.",
        "Review the agent log and controller log around the disconnect timestamp.",
        "ps -ef | grep -E 'agent.jar|remoting' | grep -v grep",
        "journalctl -u jenkins-agent --since '30 minutes ago' --no-pager",
        "systemctl status jenkins-agent --no-pager"
      ],
      expectedEvidence: [
        "Connection reset, heartbeat failure, or remoting errors.",
        "Agent service stopped or repeatedly restarted.",
        "Host reboot, OOM event, network outage, or container eviction.",
        "Service name may differ; the commands must match the actual agent installation."
      ],
      branches: [
        {
          condition: "Agent process is down.",
          nextAction: "Check service logs, host health, and restart policy before controlled recovery."
        },
        {
          condition: "Agent is running but disconnected.",
          nextAction: "Check DNS, routing, firewall, proxy, TLS, and controller reachability."
        },
        {
          condition: "Agent is healthy and connected.",
          nextAction: "Continue with the command or dependency that stalled."
        }
      ],
      safetyNote:
        "Do not assume every agent runs as a systemd service. Kubernetes and container agents require their own diagnostics."
    },
    {
      id: "step-6",
      title: "Trace the slow build command",
      purpose:
        "Isolate dependency downloads, compiler activity, tests, Docker builds, or custom scripts.",
      commands: [
        "mvn -B -ntp -e verify",
        "./gradlew --no-daemon --console=plain test",
        "docker build --progress=plain -t example/app:diagnostic .",
        "git status --short",
        "git rev-parse HEAD"
      ],
      expectedEvidence: [
        "The exact Maven goal, Gradle task, Docker build step, or script that stalls.",
        "Dependency resolution retries or repository connection delays.",
        "Test names and duration reports for slow or hanging tests.",
        "Commit SHA and working-tree state for reproducibility."
      ],
      branches: [
        {
          condition: "Dependency downloads are slow.",
          nextAction: "Continue to step-8 and inspect repository connectivity and cache behavior."
        },
        {
          condition: "A specific test hangs.",
          nextAction: "Isolate the test, inspect its logs and external dependencies, and reproduce with a bounded test timeout."
        },
        {
          condition: "The build tool finishes but a later stage stalls.",
          nextAction: "Investigate the next pipeline command rather than increasing the build-tool timeout."
        }
      ],
      safetyNote:
        "These commands can perform real build or test work. Reproduce in a safe workspace and avoid rerunning deployment goals unintentionally."
    },
    {
      id: "step-7",
      title: "Verify remote deployment state before retry",
      purpose:
        "Prevent duplicate changes when Jenkins times out after a deployment request was already accepted.",
      commands: [
        "Review the deployment platform's audit log for the build's time window.",
        "kubectl rollout status deployment/<deployment-name> -n <namespace> --timeout=30s",
        "kubectl get deployment,pods -n <namespace> -o wide",
        "kubectl describe deployment <deployment-name> -n <namespace>",
        "Inspect the release system's operation ID or deployment history."
      ],
      expectedEvidence: [
        "Whether the deployment request reached the remote system.",
        "Whether the desired revision is already active.",
        "Whether pods are progressing, failing, or waiting for readiness.",
        "Whether an asynchronous operation remains active after Jenkins timed out."
      ],
      branches: [
        {
          condition: "The desired revision is healthy and fully deployed.",
          nextAction: "Reconcile Jenkins status with verified deployment evidence; do not redeploy blindly."
        },
        {
          condition: "The deployment is partially applied or unhealthy.",
          nextAction: "Follow the application's approved recovery or rollback runbook."
        },
        {
          condition: "The remote system never received the request.",
          nextAction: "Correct the identified connectivity or authentication issue and retry under release controls."
        }
      ],
      safetyNote:
        "Replace placeholders with the actual deployment name and namespace. A timed-out client request does not prove that the remote operation failed."
    },
    {
      id: "step-8",
      title: "Diagnose dependencies and network waits",
      purpose:
        "Find DNS failures, repository slowness, TLS errors, proxy problems, rate limits, or connection timeouts.",
      commands: [
        "getent hosts <repository-host>",
        "curl -sS -o /dev/null -w 'http=%{http_code} connect=%{time_connect} total=%{time_total}\\n' --connect-timeout 5 --max-time 20 https://<repository-host>/",
        "env | grep -iE '^(http|https|no)_proxy='",
        "Review Maven or Gradle logs for connection, authentication, and retry messages."
      ],
      expectedEvidence: [
        "DNS lookup failures or unexpectedly slow resolution.",
        "Connection timeout versus HTTP response timeout.",
        "HTTP 401/403 authentication or permission failures.",
        "HTTP 429 rate limiting or HTTP 5xx repository failures.",
        "TLS certificate validation or proxy configuration errors."
      ],
      branches: [
        {
          condition: "DNS lookup fails.",
          nextAction: "Verify the configured hostname, resolver, network policy, and DNS service."
        },
        {
          condition: "The connection succeeds but the response is slow.",
          nextAction: "Measure repository latency, inspect server status, and compare from another approved network location."
        },
        {
          condition: "HTTP 401 or 403 is returned.",
          nextAction: "Check the correct credential binding and least-privilege permissions."
        },
        {
          condition: "The dependency service is healthy.",
          nextAction: "Continue to step-9 and inspect pipeline timeout semantics."
        }
      ],
      safetyNote:
        "Use approved endpoints and do not print secrets or send credentials to untrusted hosts."
    },
    {
      id: "step-9",
      title: "Validate timeout configuration and pipeline structure",
      purpose:
        "Confirm the timeout protects the intended operation and is not incorrectly scoped.",
      commands: [
        "Review the Jenkinsfile for timeout blocks and nested stages.",
        "Check whether agent allocation is included in the configured timeout.",
        "Inspect shared libraries for additional timeout wrappers.",
        "Compare the configured timeout with successful historical duration and a justified safety margin."
      ],
      expectedEvidence: [
        "Whether the timeout includes agent allocation or only stage execution.",
        "Whether a global timeout unexpectedly includes queue or setup time.",
        "Whether nested timeouts obscure the real failing operation.",
        "Whether the configured duration is inconsistent with normal runtime."
      ],
      branches: [
        {
          condition: "Timeout scope is incorrect or the limit is unjustifiably low.",
          nextAction: "Correct the scope or set a measured limit with an explicit maximum."
        },
        {
          condition: "Timeout configuration is reasonable.",
          nextAction: "Continue to step-10 and confirm the root cause with a controlled reproduction."
        }
      ]
    },
    {
      id: "step-10",
      title: "Prove root cause and verify recovery",
      purpose:
        "Confirm the proposed cause explains the evidence and verify that the fix restores normal behavior.",
      commands: [
        "Compare the failed run with the last successful run.",
        "Re-run only the affected safe stage when supported by the pipeline.",
        "Measure stage duration and compare it with the baseline.",
        "Validate test reports, artifact identity, and deployment health.",
        "Monitor subsequent builds for recurrence."
      ],
      expectedEvidence: [
        "The failure can be explained by a specific condition supported by logs or metrics.",
        "The correction removes the observed failure condition.",
        "The stage completes within the expected duration.",
        "Artifacts and deployed revisions match the intended commit.",
        "No duplicate release or unintended side effect occurred."
      ],
      branches: [
        {
          condition: "The same failure repeats.",
          nextAction: "Reopen diagnosis using the new evidence; do not classify the incident as resolved."
        },
        {
          condition: "The stage succeeds but the cause remains unknown.",
          nextAction: "Record the result as recovered but not fully root-caused, and add targeted observability."
        },
        {
          condition: "The fix and validation both succeed.",
          nextAction: "Close the incident after monitoring and complete prevention actions."
        }
      ]
    }
  ],

  failureCases: [
    {
      id: "queue-timeout",
      cause: "No matching executor is available.",
      symptoms: [
        "Pipeline appears stuck before the first shell command.",
        "Build duration is mostly queue time."
      ],
      evidence: [
        "Queue waiting reason.",
        "Agent labels and online status.",
        "Executor saturation and provisioning logs."
      ],
      diagnosis: [
        "Compare the required label with available online agents.",
        "Inspect competing builds and their duration.",
        "Check whether agent provisioning is failing."
      ],
      fix: [
        "Restore the intended agent or correct the label.",
        "Adjust concurrency or capacity only after confirming resource and licensing limits.",
        "Avoid indiscriminately cancelling other teams' jobs."
      ],
      validation: [
        "The job receives a matching executor.",
        "Queue wait returns to its normal range."
      ],
      prevention: [
        "Alert on queue wait percentiles.",
        "Monitor offline agents and provisioning failures.",
        "Review labels and executor capacity."
      ]
    },
    {
      id: "agent-resource-exhaustion",
      cause: "CPU, memory, disk, inodes, or I/O capacity is exhausted.",
      symptoms: [
        "Builds slow down across multiple jobs on one agent.",
        "Processes are killed or workspaces cannot write files."
      ],
      evidence: [
        "System metrics and kernel logs.",
        "Filesystem and inode usage.",
        "Container resource limits and OOM events."
      ],
      diagnosis: [
        "Compare the affected agent with a healthy agent.",
        "Identify the process or workspace consuming resources.",
        "Check whether parallel builds exceed host capacity."
      ],
      fix: [
        "Remove only approved stale files after checking ownership.",
        "Correct resource limits or reduce excessive concurrency.",
        "Move work to a healthy agent if the current one is unsafe."
      ],
      validation: [
        "The agent is stable and resource usage is acceptable.",
        "The build completes without OOM or disk errors."
      ],
      prevention: [
        "Set disk and inode alerts.",
        "Use workspace cleanup policies.",
        "Right-size agents and cap concurrent workloads."
      ]
    },
    {
      id: "dependency-download",
      cause: "Maven, Gradle, npm, or another package repository is slow or unreachable.",
      symptoms: [
        "Build logs stop at dependency resolution.",
        "Retries increase duration."
      ],
      evidence: [
        "Repository URL and response time.",
        "DNS and TLS errors.",
        "Dependency cache and repository health."
      ],
      diagnosis: [
        "Identify the exact dependency and endpoint.",
        "Test DNS and HTTPS from the same agent.",
        "Distinguish network failure, authentication failure, and server-side slowness."
      ],
      fix: [
        "Restore network or repository connectivity.",
        "Correct credential bindings or certificate trust through approved processes.",
        "Use a healthy approved mirror when available."
      ],
      validation: [
        "The dependency resolves successfully.",
        "The build completes with reproducible dependency versions."
      ],
      prevention: [
        "Use reliable artifact mirrors and controlled caches.",
        "Monitor repository latency and error rate.",
        "Avoid unbounded retry loops."
      ]
    },
    {
      id: "test-hang",
      cause: "A test waits indefinitely for a lock, external service, socket, or child process.",
      symptoms: [
        "Compilation finishes but the test stage does not.",
        "No test report is produced or one test remains active."
      ],
      evidence: [
        "Test logs and test reports.",
        "Thread dumps or process diagnostics.",
        "External service and test-container health."
      ],
      diagnosis: [
        "Identify the last started test.",
        "Run the affected test in an isolated environment with a bounded timeout.",
        "Inspect locks, asynchronous waits, cleanup hooks, and external dependencies."
      ],
      fix: [
        "Correct the deadlock or unbounded wait.",
        "Add appropriate per-test and suite timeouts.",
        "Make test cleanup deterministic."
      ],
      validation: [
        "The isolated test and full suite complete.",
        "Failure reports remain available when tests fail."
      ],
      prevention: [
        "Track slow tests.",
        "Add bounded waits and reliable test cleanup.",
        "Separate flaky tests from genuine product regressions."
      ]
    },
    {
      id: "docker-build",
      cause: "Docker build stalls because of large build contexts, slow downloads, cache misses, or resource pressure.",
      symptoms: [
        "A specific Dockerfile step consumes most of the build time.",
        "Image builds become slower after context or base-image changes."
      ],
      evidence: [
        "Plain build output.",
        "Build context size.",
        "Agent resources and base-image pull duration."
      ],
      diagnosis: [
        "Use plain build progress to identify the slow step.",
        "Inspect .dockerignore and build context contents.",
        "Compare cache behavior and base-image versions."
      ],
      fix: [
        "Exclude unnecessary files from the build context.",
        "Optimize expensive layers and use appropriate caching.",
        "Resolve registry or resource bottlenecks."
      ],
      validation: [
        "The image builds reproducibly.",
        "The expected image digest and security checks pass."
      ],
      prevention: [
        "Use multi-stage builds where appropriate.",
        "Track image build duration and context size.",
        "Pin and review base-image updates."
      ]
    },
    {
      id: "agent-disconnect",
      cause: "The Jenkins agent loses connectivity or crashes during execution.",
      symptoms: [
        "Remoting channel errors appear.",
        "Several jobs on the same agent fail together."
      ],
      evidence: [
        "Agent and controller logs.",
        "Host restarts, network changes, and OOM events.",
        "Container or Kubernetes events."
      ],
      diagnosis: [
        "Determine whether one agent or multiple agents are affected.",
        "Check host health and connectivity.",
        "Verify whether the command continued after the disconnect."
      ],
      fix: [
        "Restore agent health and connectivity.",
        "Replace a damaged ephemeral agent through the approved provisioning process.",
        "Reconcile any remote side effects before rerunning the job."
      ],
      validation: [
        "The agent reconnects and remains stable.",
        "The affected workload completes on a healthy agent."
      ],
      prevention: [
        "Monitor agent heartbeat and disconnect rate.",
        "Keep agent images and remoting versions supported.",
        "Design release steps to be idempotent."
      ]
    },
    {
      id: "external-api",
      cause: "A deployment API or third-party service is slow, rate-limited, or unavailable.",
      symptoms: [
        "A script waits on an HTTP request.",
        "Repeated retries consume the stage timeout."
      ],
      evidence: [
        "HTTP status, request duration, and correlation ID.",
        "Service health and rate-limit headers.",
        "Client connection and read timeout settings."
      ],
      diagnosis: [
        "Separate connection timeout from response timeout.",
        "Identify 429, 5xx, DNS, and TLS failures.",
        "Check whether the operation is safe to retry."
      ],
      fix: [
        "Use bounded retries with backoff for transient failures.",
        "Correct client timeout configuration.",
        "Coordinate with the service owner for persistent server-side errors."
      ],
      validation: [
        "Requests complete within the defined latency budget.",
        "Retries do not create duplicate operations."
      ],
      prevention: [
        "Add service-level latency and error metrics.",
        "Use correlation IDs and bounded retries.",
        "Define an explicit failure policy for unavailable dependencies."
      ]
    },
    {
      id: "lock-contention",
      cause: "A shared lock, resource reservation, or concurrent deployment prevents progress.",
      symptoms: [
        "Build waits for a lock or resource.",
        "One release succeeds while another remains blocked."
      ],
      evidence: [
        "Lock owner and acquisition logs.",
        "Concurrent job execution.",
        "Resource reservation state."
      ],
      diagnosis: [
        "Identify the lock or resource and current owner.",
        "Check whether the owner is still active.",
        "Determine whether the lock has a safe expiration or recovery mechanism."
      ],
      fix: [
        "Allow the valid owner to finish when safe.",
        "Recover stale locks using the documented owner-specific procedure.",
        "Serialize conflicting production operations."
      ],
      validation: [
        "The lock is released correctly.",
        "Only the intended operation changes the shared resource."
      ],
      prevention: [
        "Use bounded lock waits.",
        "Document stale-lock recovery.",
        "Make lock ownership and duration observable."
      ]
    },
    {
      id: "timeout-scope",
      cause: "A timeout is configured at the wrong scope or does not reflect measured workload duration.",
      symptoms: [
        "The build repeatedly fails at nearly the same elapsed time.",
        "Agent allocation or setup consumes most of the limit."
      ],
      evidence: [
        "Jenkinsfile timeout blocks.",
        "Pipeline stage durations.",
        "Historical build duration distribution."
      ],
      diagnosis: [
        "Identify the exact timeout wrapper that fired.",
        "Determine whether agent allocation is included.",
        "Compare the timeout against normal runtime and required safety margin."
      ],
      fix: [
        "Place the timeout around the intended operation.",
        "Use a justified limit based on observed duration and workload requirements.",
        "Fix the slow underlying operation rather than only increasing the limit."
      ],
      validation: [
        "The stage has an appropriate bounded runtime.",
        "Genuine hangs still fail within the intended operational window."
      ],
      prevention: [
        "Review timeout policy during pipeline changes.",
        "Track stage duration percentiles.",
        "Use stage-specific limits where appropriate."
      ]
    },
    {
      id: "kubernetes-deployment-wait",
      cause: "A deployment rollout does not become healthy before the Jenkins timeout.",
      symptoms: [
        "The deploy command waits for readiness.",
        "Pods remain Pending, CrashLoopBackOff, or NotReady."
      ],
      evidence: [
        "Deployment conditions and ReplicaSet state.",
        "Pod events, logs, and readiness probes.",
        "Image pull and scheduling errors."
      ],
      diagnosis: [
        "Inspect rollout status and deployment events.",
        "Check the exact pod failure reason.",
        "Verify image identity, resource requests, probes, and configuration."
      ],
      fix: [
        "Correct the identified scheduling, image, configuration, or application failure.",
        "Use the approved rollout recovery strategy.",
        "Do not increase the timeout to conceal an unhealthy release."
      ],
      validation: [
        "Expected replicas become Ready.",
        "Application health checks and smoke tests pass.",
        "The deployed image digest matches the release."
      ],
      prevention: [
        "Monitor rollout duration and failure rates.",
        "Set meaningful readiness probes.",
        "Add explicit post-deployment health verification."
      ]
    },
    {
      id: "remote-operation-uncertain",
      cause: "Jenkins timed out after a remote system accepted an operation but before the response returned.",
      symptoms: [
        "The build reports failure but the remote deployment may have completed.",
        "A retry risks duplicate changes."
      ],
      evidence: [
        "Remote audit logs.",
        "Operation ID, release ID, or deployment revision.",
        "Actual resource and application state."
      ],
      diagnosis: [
        "Query the remote system for the operation's current state.",
        "Compare the intended and actual revision.",
        "Check whether the operation is idempotent."
      ],
      fix: [
        "Reconcile the remote state before deciding to retry.",
        "Resume monitoring an existing operation if supported.",
        "Use a documented rollback if the actual state is unhealthy."
      ],
      validation: [
        "The remote system has exactly the intended release state.",
        "No duplicate operation remains active."
      ],
      prevention: [
        "Use operation IDs and idempotency keys where supported.",
        "Record remote operation state.",
        "Separate request submission from operation monitoring."
      ]
    }
  ],

  productionIncidents: [
    {
      title: "Release pipeline times out while waiting for an agent",
      severity: "SEV-2 when a critical release is blocked",
      scenario:
        "A Jenkins pipeline is configured with a 10-minute timeout, but its required agent label has no available executors. No build command has actually started.",
      impact: [
        "Release is delayed.",
        "Queue length increases.",
        "Unrelated jobs may compete for the same capacity."
      ],
      response: [
        "Confirm the job, environment, label, and timeout scope.",
        "Capture queue waiting reason and agent status.",
        "Check whether the intended agent is offline or merely busy.",
        "Inspect provisioning and executor capacity.",
        "Distinguish queue delay from execution time."
      ],
      recovery: [
        "Restore the correct agent or label.",
        "Adjust capacity or concurrency after confirming constraints.",
        "Re-run only after checking that the previous build did not execute deployment steps.",
        "Monitor queue duration after recovery."
      ],
      rollbackCriteria: [
        "No deployment rollback is needed if no deployment occurred.",
        "If remote changes were made by an earlier attempt, reconcile them before restarting."
      ]
    },
    {
      title: "Build hangs during dependency resolution",
      severity: "SEV-3, escalating if a release is blocked",
      scenario:
        "Maven or Gradle spends most of the build duration downloading dependencies from an artifact repository.",
      impact: [
        "Build duration increases.",
        "Executors remain occupied.",
        "Release throughput decreases."
      ],
      response: [
        "Identify the exact dependency and repository endpoint.",
        "Inspect repository response times and build logs.",
        "Test DNS and HTTPS from the affected agent.",
        "Check for authentication, TLS, rate limiting, or server-side failures.",
        "Compare with another approved agent or the last successful build."
      ],
      recovery: [
        "Restore repository connectivity or credentials.",
        "Use a healthy approved mirror if available.",
        "Retry the build with bounded retries.",
        "Verify dependency integrity and resulting artifact identity."
      ],
      rollbackCriteria: [
        "No application rollback is normally required for a dependency-resolution failure before deployment.",
        "If a release partially deployed, evaluate the actual target state separately."
      ]
    },
    {
      title: "Production deployment times out but the release may have succeeded",
      severity: "SEV-1 or SEV-2 depending on production impact",
      scenario:
        "Jenkins submits a deployment request. The remote platform accepts it, but the client request times out before Jenkins receives confirmation.",
      impact: [
        "Jenkins reports failure while production may already be changed.",
        "A retry could initiate a duplicate release.",
        "Pipeline status and actual environment state disagree."
      ],
      response: [
        "Pause further release attempts.",
        "Identify the deployment operation ID or revision.",
        "Query deployment audit logs and actual target state.",
        "Check application health, rollout status, and error rates.",
        "Notify the release owner if production state is uncertain."
      ],
      recovery: [
        "If the desired revision is healthy, reconcile the pipeline result without redeploying.",
        "If rollout is progressing, monitor the existing operation.",
        "If the release is unhealthy, follow the approved recovery plan.",
        "Re-run only after proving it is safe and necessary."
      ],
      rollbackCriteria: [
        "Rollback when the deployed release violates health criteria or causes unacceptable impact.",
        "Do not roll back solely because Jenkins displayed a timeout if the release is healthy.",
        "Follow application-specific data migration and compatibility constraints."
      ]
    },
    {
      title: "Build times out because tests never finish",
      severity: "SEV-3, escalating if required release validation is blocked",
      scenario:
        "Compilation completes, but an integration test waits indefinitely for a database, container, lock, or external endpoint.",
      impact: [
        "Build executors remain occupied.",
        "Feedback to developers is delayed.",
        "Test reliability becomes difficult to assess."
      ],
      response: [
        "Identify the last started test and the absence of a completion report.",
        "Check external dependency health.",
        "Inspect test process and thread state where available.",
        "Compare the test duration with historical results.",
        "Separate a slow test from a true deadlock."
      ],
      recovery: [
        "Correct the test wait condition or unavailable dependency.",
        "Add bounded per-test timeouts and cleanup.",
        "Run the isolated test before the full suite.",
        "Require the normal test and quality gates to pass."
      ],
      rollbackCriteria: [
        "Do not bypass mandatory release tests merely to complete a deployment.",
        "Use the approved release exception process only if organizational policy permits it."
      ]
    }
  ],

  commandReference: [
    {
      purpose: "Inspect host uptime and load",
      command: "uptime",
      interpretation:
        "Use with CPU and workload metrics; load average alone does not prove CPU saturation."
    },
    {
      purpose: "Inspect memory",
      command: "free -h",
      interpretation:
        "Review available memory and swap activity alongside OOM and container-limit evidence."
    },
    {
      purpose: "Inspect filesystem capacity",
      command: "df -h",
      interpretation:
        "Identifies filesystems with insufficient free space."
    },
    {
      purpose: "Inspect inode capacity",
      command: "df -i",
      interpretation:
        "A filesystem can fail to create files even when byte capacity remains available."
    },
    {
      purpose: "Find high CPU processes",
      command:
        "ps -eo pid,ppid,stat,%cpu,%mem,etime,cmd --sort=-%cpu | head -20",
      interpretation:
        "Helps identify long-running processes; inspect command output for sensitive arguments before sharing."
    },
    {
      purpose: "Check DNS from the affected agent",
      command: "getent hosts <repository-host>",
      interpretation:
        "A failed lookup points toward name resolution or hostname configuration."
    },
    {
      purpose: "Measure HTTPS response time",
      command:
        "curl -sS -o /dev/null -w 'http=%{http_code} connect=%{time_connect} total=%{time_total}\\n' --connect-timeout 5 --max-time 20 https://<repository-host>/",
      interpretation:
        "Distinguishes connection delay from total request duration. An HTTP error still proves that an HTTP response was received."
    },
    {
      purpose: "Run Maven verification",
      command: "mvn -B -ntp -e verify",
      interpretation:
        "Provides batch output and diagnostic errors. Use in a safe workspace; this may execute project verification steps."
    },
    {
      purpose: "Run Gradle tests",
      command: "./gradlew --no-daemon --console=plain test",
      interpretation:
        "Produces readable test output; use the project's actual wrapper and task names."
    },
    {
      purpose: "Inspect Kubernetes rollout",
      command:
        "kubectl rollout status deployment/<deployment-name> -n <namespace> --timeout=30s",
      interpretation:
        "Bounds the diagnostic wait. It does not repair the rollout or prove that a timed-out earlier deployment did not apply."
    },
    {
      purpose: "Inspect Kubernetes pod state",
      command:
        "kubectl get pods -n <namespace> -o wide",
      interpretation:
        "Shows pod state and node placement; use describe and logs for root-cause evidence."
    },
    {
      purpose: "Review recent Kubernetes events",
      command:
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
      interpretation:
        "Helps identify scheduling, image pull, probe, and resource issues."
    },
    {
      purpose: "Confirm current Git revision",
      command: "git rev-parse HEAD",
      interpretation:
        "Records the checked-out commit for comparison with the intended release."
    }
  ],

  recoveryRunbook: [
    "1. Declare the incident or build failure and identify its owner.",
    "2. Record job URL, build number, commit, environment, start time, and timeout message.",
    "3. Identify the exact timeout boundary and the last successful stage.",
    "4. Determine whether the problem is queue delay, agent health, resource pressure, a build command, a dependency, a test, or a remote operation.",
    "5. Preserve logs and relevant metrics before restarting services or deleting workspaces.",
    "6. Apply only the smallest corrective action supported by evidence.",
    "7. Confirm that production state is understood before any deployment retry.",
    "8. Use a controlled retry with the intended commit, environment, and approval checks.",
    "9. Validate artifact identity, test results, rollout health, and application smoke tests.",
    "10. Monitor the next runs and document both recovery and any remaining uncertainty."
  ],

  rollbackPlan: [
    "Establish whether the timed-out operation changed remote state.",
    "Identify the actual deployed revision, artifact digest, and operation status.",
    "Compare actual state with the intended release and approved change.",
    "Use the application or infrastructure team's approved rollback procedure if health criteria fail.",
    "For database changes, confirm backward compatibility and migration safety before rollback.",
    "Do not delete artifacts, reverse infrastructure changes, or redeploy blindly to make Jenkins green.",
    "Verify service health, error rates, and the final release revision after recovery.",
    "Record who authorized rollback and what evidence supported the decision."
  ],

  prevention: [
    "Use explicit, bounded timeouts at pipeline, stage, test, and external-command levels.",
    "Base timeout limits on measured runtime distributions and the actual operational requirement.",
    "Track queue wait separately from execution duration.",
    "Use healthy, correctly labeled agents and alert on provisioning failures.",
    "Right-size agent CPU, memory, disk, and concurrency.",
    "Set dependency download and network client timeouts.",
    "Use bounded retries with backoff only for operations that are safe to retry.",
    "Track slow and flaky tests; add per-test timeout and reliable cleanup.",
    "Use reproducible builds, pinned dependencies, and controlled artifact repositories.",
    "Make deployment operations idempotent where possible and retain operation IDs.",
    "Add post-deployment health verification and a documented rollback path.",
    "Test Jenkinsfile and shared-library changes before production use.",
    "Review recurring timeouts as reliability defects, not simply as reasons to increase timeout values."
  ],

  monitoring: [
    "Jenkins queue wait time and queue length.",
    "Build duration percentiles by job, branch, stage, and agent label.",
    "Build timeout count and timeout rate.",
    "Agent online status, disconnect rate, and provisioning duration.",
    "Agent CPU, memory, disk, inode, and I/O utilization.",
    "Dependency repository latency, error rate, and rate-limit responses.",
    "Test duration, failure rate, and missing test reports.",
    "Docker build duration, registry latency, and image push failures.",
    "Kubernetes rollout duration, pod readiness, restarts, and deployment failures.",
    "External deployment API latency and operation completion status.",
    "Alert on sustained anomalies and correlated failures across multiple jobs."
  ],

  cicdValidation: [
    "Validate Jenkinsfile syntax and shared-library changes in a safe test job.",
    "Check that each critical stage has an appropriate bounded timeout.",
    "Verify agent labels and expected tool versions.",
    "Run unit and integration tests with explicit timeout behavior.",
    "Check that test reports and build artifacts are published even when supported failure paths occur.",
    "Validate dependency and artifact identity before deployment.",
    "Require approvals and environment checks for production releases.",
    "Verify that retry logic cannot duplicate non-idempotent deployment actions.",
    "Run a post-deployment smoke test and health check.",
    "Test failure handling in a non-production environment before relying on recovery logic."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Jenkins job and build number:",
    "Environment and affected service:",
    "Severity and customer impact:",
    "Start time and detection time:",
    "Timeout stage and configured limit:",
    "Last successful operation:",
    "Evidence collected:",
    "Root cause and supporting evidence:",
    "Contributing factors:",
    "Immediate mitigation:",
    "Recovery and validation results:",
    "Was remote state changed before timeout?:",
    "Rollback decision and approval:",
    "Prevention actions and owners:",
    "Monitoring improvements:",
    "Follow-up deadline:"
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Reproduce a bounded stage timeout",
      objective:
        "Understand how a Jenkins stage timeout is reported and how it differs from a slow queue.",
      steps: [
        "Create a temporary non-production pipeline.",
        "Run a harmless wait operation inside a short stage timeout.",
        "Capture the console output and elapsed time.",
        "Compare the stage failure with a separate executor queue delay.",
        "Confirm that the pipeline terminates or reports the timeout as expected."
      ],
      successCriteria: [
        "The timeout is associated with the intended stage.",
        "The failure can be distinguished from queue waiting.",
        "The diagnostic run does not modify production."
      ]
    },
    {
      title: "Lab 2 — Diagnose an unavailable dependency endpoint",
      objective:
        "Practice distinguishing DNS, connection, HTTP, and response-time failures.",
      steps: [
        "Use a controlled test endpoint in a non-production agent.",
        "Capture DNS lookup and bounded HTTPS request timing.",
        "Simulate an unavailable endpoint in the test environment.",
        "Compare the observed error with a successful request.",
        "Document the evidence needed before retrying."
      ],
      successCriteria: [
        "The failure category is identified from evidence.",
        "The test request has a bounded duration.",
        "No production endpoint or credential is exposed."
      ]
    },
    {
      title: "Lab 3 — Investigate an agent resource bottleneck",
      objective:
        "Correlate build duration with CPU, memory, and disk evidence.",
      steps: [
        "Run a controlled resource-intensive task on an isolated agent.",
        "Collect uptime, memory, filesystem, and process information.",
        "Compare the affected run with a normal run.",
        "Identify the resource bottleneck.",
        "Repeat after adjusting the test workload or approved resource limit."
      ],
      successCriteria: [
        "The diagnosis uses metrics instead of assumptions.",
        "The corrective action addresses the measured bottleneck.",
        "The agent returns to a healthy state."
      ]
    },
    {
      title: "Lab 4 — Recover safely from a deployment timeout",
      objective:
        "Practice checking remote operation state before retrying.",
      steps: [
        "Use a non-production deployment target.",
        "Simulate a client timeout after the deployment request is accepted.",
        "Query the remote operation status and actual deployed revision.",
        "Decide whether to resume monitoring, retry, or recover.",
        "Record the final state and the reason for the decision."
      ],
      successCriteria: [
        "The remote state is checked before retry.",
        "Duplicate deployment activity is avoided.",
        "The final revision and health are verified."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is a Jenkins build timeout?",
      answer:
        "It is a bounded time limit for a pipeline, stage, or operation. When the limit is exceeded, Jenkins interrupts the relevant execution according to its timeout and interruption behavior. The timeout does not itself identify the root cause."
    },
    {
      question: "Should you increase the timeout immediately?",
      answer:
        "No. First determine whether the job is waiting for an executor, blocked on an agent, consuming resources, waiting on dependencies, hanging in tests, or waiting for a remote operation. Increase the limit only when measured workload duration justifies it."
    },
    {
      question: "How do you identify queue delay versus execution delay?",
      answer:
        "Compare queue wait and executor allocation timestamps with the first actual stage command. A job that has not received an executor has a different problem from one that is executing slowly."
    },
    {
      question: "What if the Jenkins agent disconnects?",
      answer:
        "Correlate controller and agent logs with host, network, and resource evidence. Determine whether the command stopped or continued remotely, then restore the agent and reconcile any side effects before retrying."
    },
    {
      question: "Why can increasing a timeout hide a problem?",
      answer:
        "It may allow an unhealthy dependency, deadlock, resource bottleneck, or infinite wait to occupy resources for longer without fixing the cause."
    },
    {
      question: "What is the difference between connection and read timeout?",
      answer:
        "A connection timeout bounds the time needed to establish a connection. A read or response timeout bounds waiting for response data. A command can connect successfully and still hang while waiting for the server."
    },
    {
      question: "How do you troubleshoot a Maven dependency timeout?",
      answer:
        "Identify the dependency and repository, inspect Maven logs, test DNS and HTTPS from the same agent, and distinguish network errors from authentication, TLS, rate limiting, and repository slowness."
    },
    {
      question: "How do you troubleshoot a hanging test stage?",
      answer:
        "Identify the last started test, inspect test reports and external dependencies, and use bounded test execution. Investigate locks, thread waits, child processes, and cleanup behavior."
    },
    {
      question: "What should you do if a deployment request times out?",
      answer:
        "Query the deployment platform and inspect the actual target revision before retrying. The remote system may have accepted and completed the operation even though Jenkins did not receive a response."
    },
    {
      question: "What is an idempotent deployment operation?",
      answer:
        "An operation is idempotent when repeating it produces the same intended final state without unintended duplicate effects. Idempotency reduces retry risk but does not remove the need to verify remote state."
    },
    {
      question: "How can resource exhaustion cause a timeout?",
      answer:
        "CPU saturation slows execution, memory pressure may cause OOM kills, disk exhaustion prevents writes, and I/O saturation delays reads and writes. Correlate the timeout with metrics and system events."
    },
    {
      question: "How do you distinguish a timeout from an authentication failure?",
      answer:
        "Inspect the actual error and HTTP response. Authentication often produces 401 or 403, whereas a connection or response timeout may produce no HTTP status at all. Some clients wrap these errors, so underlying logs matter."
    },
    {
      question: "What is the purpose of stage-specific timeouts?",
      answer:
        "They bound individual operations and make failures easier to isolate. Their scope should be explicit, and limits should reflect measured runtime and operational requirements."
    },
    {
      question: "How do you monitor Jenkins timeouts?",
      answer:
        "Track timeout rate, queue duration, stage duration percentiles, agent health, resource utilization, dependency latency, test duration, and deployment completion status."
    },
    {
      question: "How do you prevent duplicate production deployment after a timeout?",
      answer:
        "Use operation IDs, idempotent deployment mechanisms where possible, release serialization, and remote-state verification before retrying."
    },
    {
      question: "What does a successful retry prove?",
      answer:
        "It proves that the subsequent attempt completed under its observed conditions. It does not prove the original root cause is fixed; compare logs and identify why the original attempt failed."
    },
    {
      question: "How should retries be implemented?",
      answer:
        "Use a bounded number of retries with backoff for transient errors and only when the operation is safe to repeat. Do not retry permanent authentication errors or non-idempotent production operations blindly."
    },
    {
      question: "What evidence should be included in a post-incident report?",
      answer:
        "Include impact, timestamps, the timed-out operation, relevant logs and metrics, evidence-based root cause, mitigation, recovery validation, rollback decision, and prevention actions with owners."
    },
    {
      question: "Why can a stage be slow even when CPU usage is low?",
      answer:
        "It may be blocked on network I/O, a lock, a remote service, disk I/O, or a child process. Low CPU is a clue, not a root cause."
    },
    {
      question: "When should a production rollback occur?",
      answer:
        "When the actual deployed state violates health or release criteria and the approved recovery plan calls for rollback. A Jenkins timeout alone is insufficient evidence that the deployment failed."
    }
  ],

  references: [
    {
      title: "Jenkins Pipeline Syntax",
      url: "https://www.jenkins.io/doc/book/pipeline/syntax/"
    },
    {
      title: "Jenkins Pipeline Steps Reference",
      url: "https://www.jenkins.io/doc/pipeline/steps/"
    },
    {
      title: "Jenkins Pipeline Best Practices",
      url: "https://www.jenkins.io/doc/book/pipeline/pipeline-best-practices/"
    },
    {
      title: "Jenkins Distributed Builds",
      url: "https://www.jenkins.io/doc/book/using/using-agents/"
    },
    {
      title: "Apache Maven CLI Reference",
      url: "https://maven.apache.org/ref/current/maven-embedder/cli.html"
    },
    {
      title: "Gradle Build Environment",
      url: "https://docs.gradle.org/current/userguide/build_environment.html"
    },
    {
      title: "Docker Build Documentation",
      url: "https://docs.docker.com/build/"
    },
    {
      title: "Kubernetes Debugging Applications",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/"
    }
  ]
};
