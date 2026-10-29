
export interface AgentRunnerStep {
  title: string;
  purpose: string;
  commands: string[];
  expectedEvidence: string[];
  decisionLogic: string[];
  nextAction: string;
  risk: "low" | "medium" | "high";
}

export interface AgentRunnerFailureCase {
  title: string;
  symptoms: string[];
  likelyCauses: string[];
  diagnosticWorkflow: AgentRunnerStep[];
  resolution: string[];
  verification: string[];
  prevention: string[];
}

export interface AgentRunnerIncident {
  title: string;
  severity: string;
  scenario: string;
  impact: string[];
  investigation: string[];
  rootCauseIsolation: string[];
  recovery: string[];
  rollbackDecision: string;
  verification: string[];
}

export interface AgentRunnerGuide {
  title: string;
  slug: string;
  category: string;
  description: string;
  symptoms: string[];
  severityMatrix: {
    severity: string;
    condition: string;
    response: string;
  }[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: AgentRunnerStep[];
  failureCases: AgentRunnerFailureCase[];
  incidentScenarios: AgentRunnerIncident[];
  commandReference: {
    command: string;
    purpose: string;
    interpretation: string;
  }[];
  recoveryRunbook: string[];
  prevention: string[];
  monitoring: string[];
  cicdValidation: string[];
  incidentReportTemplate: string[];
  labs: {
    title: string;
    objective: string;
    steps: string[];
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
    followUp?: string;
  }[];
  references: {
    title: string;
    url: string;
  }[];
}

export const agentsRunnersGuide: AgentRunnerGuide = {
  title: "Jenkins Agents and Runners - Production Troubleshooting Runbook",
  slug: "agents-runners",
  category: "Jenkins",
  description:
    "A production-focused troubleshooting guide for Jenkins agents and runners, including offline nodes, queue bottlenecks, executor exhaustion, SSH and inbound connection failures, Java compatibility, remoting errors, workspace and disk problems, Docker and Kubernetes agents, credentials, network failures, hung builds, deployment recovery, monitoring, CI validation, and incident management.",

  symptoms: [
    "Jenkins builds remain queued and never start.",
    "An agent suddenly changes to Offline.",
    "A pipeline reports that no nodes match its label.",
    "An agent connects successfully but builds fail immediately.",
    "SSH launch repeatedly fails.",
    "Inbound agents cannot connect to the Jenkins controller.",
    "Agent processes disconnect intermittently.",
    "Builds remain stuck in Running or appear hung.",
    "All executors on a node are occupied.",
    "A workspace cannot be created or cleaned.",
    "The agent reports no space left on device.",
    "Java version incompatibility prevents the agent from starting.",
    "Git checkout fails only on one agent.",
    "Docker commands fail on a Docker-based agent.",
    "Kubernetes agent Pods remain Pending or terminate unexpectedly.",
    "A pipeline works on one agent but fails on another.",
    "Credentials are unavailable inside the agent.",
    "Builds fail after an agent image, plugin, OS, or network change.",
    "Production deployment is blocked because the deployment agent is offline.",
    "A disconnected agent leaves temporary files or orphaned processes.",
  ],

  severityMatrix: [
    {
      severity: "SEV-1 - Critical",
      condition:
        "A critical production service is unavailable, a release caused widespread impact, or an active deployment incident is worsening.",
      response:
        "Declare an incident, stop unsafe releases, preserve evidence, assign an incident lead, and coordinate the approved recovery or rollback.",
    },
    {
      severity: "SEV-2 - High",
      condition:
        "Production deployment is blocked, critical pipelines are unavailable, or all agents for a critical workload are offline.",
      response:
        "Identify the affected agent pool, protect running production work, investigate connectivity and capacity, and restore service through an approved change.",
    },
    {
      severity: "SEV-3 - Medium",
      condition:
        "A subset of builds is queued or one non-critical agent is unhealthy.",
      response:
        "Check labels, executors, agent health, recent changes, and resource utilization. Restore capacity and monitor the queue.",
    },
    {
      severity: "SEV-4 - Low",
      condition:
        "An isolated development build fails without affecting release commitments.",
      response:
        "Collect logs, isolate the specific agent or job configuration, correct the issue, and add regression checks.",
    },
  ],

  safetyChecks: [
    "Confirm the Jenkins controller URL, controller identity, folder, job, branch, and build number.",
    "Identify the affected environment: development, staging, or production.",
    "Determine whether the issue affects one agent, a complete label pool, or all agents.",
    "Check whether another deployment is already running against the same environment.",
    "Determine whether a deployment partially changed infrastructure or application state.",
    "Check whether a production approval is pending or already granted.",
    "Preserve console output, agent logs, controller logs, timestamps, and recent changes.",
    "Do not restart the controller as the first response to one offline agent.",
    "Do not terminate active builds before checking their impact and interruption safety.",
    "Do not delete workspaces before collecting evidence about the failure.",
    "Do not print Jenkins credentials, secret environment variables, private keys, or tokens.",
    "Do not disable host-key verification or broadly weaken SSH security to bypass a connection problem.",
    "Do not give Jenkins agents unrestricted root, Docker socket, or production privileges merely to make a build pass.",
    "Use approved change-control procedures before changing executors, agent images, Java, plugins, or firewall rules.",
    "Use a trusted source of truth for agent configuration and provisioning.",
    "If an agent may be compromised, isolate it according to the security incident procedure instead of reconnecting it blindly.",
  ],

  evidenceCollection: [
    "Incident ID, first failure timestamp, affected team, and customer impact.",
    "Jenkins controller version, relevant plugin versions, and agent connection method.",
    "Job name, folder, branch, build number, queue duration, and console log.",
    "Agent name, labels, executor count, online status, and last connection time.",
    "Agent launch method: SSH, inbound/remoting, Docker, or Kubernetes.",
    "Controller and agent logs covering the same time window.",
    "Agent operating system, architecture, Java version, disk space, memory, and CPU.",
    "DNS resolution, routing, firewall, proxy, and connection test results.",
    "Recent Jenkinsfile, shared library, credential, plugin, image, and infrastructure changes.",
    "Workspace path, filesystem ownership, disk and inode usage, and available capacity.",
    "Queue causes, label expressions, executor utilization, and competing builds.",
    "Docker daemon status or Kubernetes Pod events, when applicable.",
    "Whether the deployment started, which changes were applied, and whether rollback is needed.",
    "Approved recovery action, validation evidence, and follow-up preventive tasks.",
  ],

  diagnosticWorkflow: [
    {
      title: "1. Confirm the incident and its scope",
      purpose:
        "Determine whether the failure is isolated to one agent, one label, one job, or the Jenkins platform.",
      commands: [
        "Check Jenkins Dashboard and Manage Jenkins > Nodes.",
        "Inspect the affected job's Build Queue and console output.",
        "Review the agent's status, labels, executors, and offline reason.",
        "Compare a failed build with a recent successful build.",
      ],
      expectedEvidence: [
        "Only one agent is offline: suspect that agent, its host, or its connection path.",
        "All agents with one label are unavailable: suspect shared infrastructure or label configuration.",
        "All jobs are queued: investigate global executor capacity, controller health, queue causes, and shared dependencies.",
        "Only one pipeline fails: investigate its agent label, Jenkinsfile, credentials, and workspace assumptions.",
      ],
      decisionLogic: [
        "If only one agent is affected, start with agent-side diagnostics.",
        "If several agents share a host, network, image, or node pool, investigate the shared dependency.",
        "If jobs are running but deployment is blocked, determine whether the blocker is the agent or a later pipeline stage.",
      ],
      nextAction:
        "Record the affected jobs, labels, agent names, queue duration, last successful build, and recent changes.",
      risk: "low",
    },
    {
      title: "2. Determine deployment impact",
      purpose:
        "Establish whether a release is merely queued or has already changed production.",
      commands: [
        "Inspect the affected build's console log.",
        "Inspect Jenkins stage and deployment logs.",
        "Check the target environment using approved read-only health checks.",
        "Review the release record and recent deployment history.",
      ],
      expectedEvidence: [
        "The build may have failed before deployment, during deployment, or after a partial change.",
        "An agent disconnect does not prove that the remote deployment process stopped.",
        "A pipeline may have completed a remote action before the agent lost connectivity.",
      ],
      decisionLogic: [
        "If no deployment command ran, focus on restoring pipeline execution.",
        "If a deployment started, verify the target system's actual state before retrying.",
        "If deployment status is uncertain, pause duplicate releases and use the deployment-specific recovery procedure.",
      ],
      nextAction:
        "Identify the exact last completed stage and the current state of the target environment.",
      risk: "low",
    },
    {
      title: "3. Inspect the queue and executor capacity",
      purpose:
        "Find whether jobs cannot start because of capacity, labels, or scheduling restrictions.",
      commands: [
        "Review Jenkins Dashboard > Build Queue.",
        "Open the queued item's cause and required label.",
        "Inspect Manage Jenkins > Nodes for executor availability.",
        "Review the job's agent or label expression in its Jenkinsfile.",
      ],
      expectedEvidence: [
        "A label expression may match no online agent.",
        "All matching executors may already be occupied.",
        "A job may be blocked by an upstream dependency, lock, throttle, or another queue condition.",
      ],
      decisionLogic: [
        "No matching online agent: verify the label expression and agent configuration.",
        "Matching agents are online but busy: inspect queue duration and executor saturation.",
        "The queue identifies another blocking cause: investigate that cause instead of adding agents immediately.",
      ],
      nextAction:
        "Correct a proven label or capacity problem, or resolve the specific queue blocker.",
      risk: "low",
    },
    {
      title: "4. Verify the agent host and connection path",
      purpose:
        "Separate host failure from DNS, routing, firewall, SSH, and Jenkins remoting failures.",
      commands: [
        "getent hosts <agent-host>",
        "nc -vz <agent-host> 22",
        "ssh -vvv -o BatchMode=yes <approved-agent-user>@<agent-host>",
        "systemctl status jenkins-agent",
        "journalctl -u jenkins-agent --since '30 minutes ago'",
      ],
      expectedEvidence: [
        "The example systemctl commands apply only if the agent is managed by that Linux service.",
        "DNS failure points toward name resolution or configuration.",
        "A connection timeout suggests routing, firewall, host availability, or a wrong endpoint.",
        "SSH authentication failure suggests user, key, account, or authorization problems.",
        "A missing service means the agent may be launched by another mechanism.",
      ],
      decisionLogic: [
        "If the host is unreachable, verify host health and the approved network path.",
        "If TCP is reachable but SSH authentication fails, inspect SSH configuration and key authorization.",
        "If the connection works but Jenkins launch fails, inspect the launch command, Java, remoting, and controller logs.",
      ],
      nextAction:
        "Collect the exact failure stage and engage the relevant host or network owner.",
      risk: "low",
    },
    {
      title: "5. Validate Java and agent compatibility",
      purpose:
        "Identify runtime incompatibility and agent process startup failures.",
      commands: [
        "java -version",
        "which java",
        "echo \"$JAVA_HOME\"",
        "ps -ef | grep -E '[a]gent.jar|[r]emoting'",
        "df -h",
        "free -h",
      ],
      expectedEvidence: [
        "The Java runtime used by the service may differ from the interactive shell.",
        "The service may point to an outdated Java path.",
        "An unsupported runtime or incompatible agent setup may prevent launch.",
        "Disk or memory pressure can prevent the agent process from starting.",
      ],
      decisionLogic: [
        "Compare the actual service runtime with the requirements for the installed Jenkins controller and agent.",
        "Inspect service configuration instead of assuming an interactive java -version reflects the service runtime.",
        "Check agent launch logs for the exact compatibility or startup error.",
      ],
      nextAction:
        "Correct the approved runtime configuration and test the connection before returning the agent to production use.",
      risk: "medium",
    },
    {
      title: "6. Inspect workspace, disk, and permissions",
      purpose:
        "Find filesystem issues that prevent builds from starting or completing.",
      commands: [
        "df -h",
        "df -i",
        "id",
        "pwd",
        "ls -ld <workspace-path>",
        "find <workspace-path> -maxdepth 2 -type d -print",
      ],
      expectedEvidence: [
        "Disk usage at 100% can prevent checkout, temporary files, logs, and builds.",
        "Inode exhaustion can block file creation even when disk space remains.",
        "Workspace ownership or mount permissions may differ from the agent service user.",
        "A full filesystem may also affect unrelated workloads on the same host.",
      ],
      decisionLogic: [
        "If disk or inodes are exhausted, identify the largest consumers and retention requirements.",
        "If permissions are wrong, identify the intended service user and ownership model.",
        "If the filesystem is healthy, inspect Git checkout and build-tool errors rather than cleaning the workspace blindly.",
      ],
      nextAction:
        "Use the approved retention or filesystem repair procedure and preserve artifacts needed for investigation.",
      risk: "medium",
    },
    {
      title: "7. Inspect the build execution environment",
      purpose:
        "Identify differences between the failing agent and a known-good execution environment.",
      commands: [
        "git --version",
        "git status --short",
        "git rev-parse --show-toplevel",
        "git rev-parse HEAD",
        "docker version",
        "env | cut -d= -f1 | sort",
      ],
      expectedEvidence: [
        "Git, Docker, build tools, or required executables may be missing.",
        "The agent may check out a different commit or repository directory.",
        "The environment variable command lists variable names only, avoiding secret values.",
        "Docker client availability does not prove that the daemon is reachable.",
      ],
      decisionLogic: [
        "Compare tool versions and commit SHA with the last successful build.",
        "If Docker is involved, inspect daemon connectivity and authorization separately.",
        "If only one repository fails, inspect checkout credentials, workspace path, and repository configuration.",
      ],
      nextAction:
        "Reproduce the failure using the same approved image, tools, commit, and non-secret configuration.",
      risk: "low",
    },
    {
      title: "8. Inspect controller and agent logs",
      purpose:
        "Correlate the agent disconnect with controller-side connection and queue events.",
      commands: [
        "Inspect Jenkins system log for the affected agent and timestamp.",
        "Inspect the agent launch log and service logs.",
        "Inspect the affected build's complete console output.",
        "Check recent controller restarts, plugin updates, and configuration changes.",
      ],
      expectedEvidence: [
        "Controller logs may show a connection timeout, remoting exception, or failed launch.",
        "Agent logs may reveal a process crash, runtime error, or lost network connection.",
        "The console log may identify the exact stage that stopped.",
      ],
      decisionLogic: [
        "Controller and agent logs showing the same disconnect time suggest a shared connection event.",
        "Agent process termination without a controller restart points toward the host, process, or runtime.",
        "A queue blocker without a disconnect may indicate labels, capacity, or another queue condition.",
      ],
      nextAction:
        "Build a timestamped timeline before making controller, plugin, or agent configuration changes.",
      risk: "low",
    },
    {
      title: "9. Confirm the root cause and recover safely",
      purpose:
        "Avoid repeated restarts and duplicate deployments without evidence.",
      commands: [
        "Repeat the smallest relevant connectivity or health check.",
        "Validate the proposed configuration in a test or staging environment where possible.",
        "Check whether the affected production release partially applied changes.",
        "Follow the approved agent restoration or deployment rollback procedure.",
      ],
      expectedEvidence: [
        "The evidence identifies a specific failure rather than a generic agent-offline symptom.",
        "The correction addresses the proven cause.",
        "The target environment's actual state is known before a deployment retry.",
      ],
      decisionLogic: [
        "If the fix does not address the observed failure, stop and revisit the diagnosis.",
        "If deployment state is uncertain, do not blindly rerun non-idempotent steps.",
        "If the agent may be compromised, follow security isolation and re-provisioning procedures.",
      ],
      nextAction:
        "Restore the minimum required agent capacity, run a controlled validation build, and monitor the result.",
      risk: "medium",
    },
  ],

  failureCases: [
    {
      title: "Agent suddenly goes Offline",
      symptoms: [
        "Jenkins shows the node as Offline.",
        "Builds previously assigned to the node cannot continue.",
        "The agent's last connection timestamp stops updating.",
      ],
      likelyCauses: [
        "Host shutdown or operating-system failure.",
        "Network interruption or DNS change.",
        "Agent process crash.",
        "Java runtime failure.",
        "Controller or agent connection failure.",
        "Disk or memory exhaustion.",
        "Intentional administrative disconnect.",
      ],
      diagnosticWorkflow: [
        {
          title: "Check the Jenkins offline reason",
          purpose: "Determine whether the node was intentionally disconnected or failed unexpectedly.",
          commands: [
            "Open Manage Jenkins > Nodes > <agent-name>.",
            "Inspect the offline reason and node log.",
            "Inspect recent controller system logs.",
          ],
          expectedEvidence: [
            "The offline reason may identify an administrative action or failed launch.",
          ],
          decisionLogic: [
            "If intentionally offline, confirm the maintenance or security reason.",
            "If unexpectedly offline, continue with host and connection diagnostics.",
          ],
          nextAction: "Do not reconnect an agent until its health and security status are understood.",
          risk: "low",
        },
        {
          title: "Check host and service health",
          purpose: "Determine whether the agent host and agent process are available.",
          commands: [
            "systemctl status jenkins-agent",
            "journalctl -u jenkins-agent --since '30 minutes ago'",
            "df -h",
            "free -h",
          ],
          expectedEvidence: [
            "These Linux service commands apply only when the agent uses that service.",
            "Process exits, filesystem exhaustion, or memory pressure may explain the disconnect.",
          ],
          decisionLogic: [
            "If the host is down, follow host recovery procedures.",
            "If the process failed, inspect its exit reason before restarting it.",
          ],
          nextAction: "Correct the proven host or process problem, then restore the agent using the approved launch method.",
          risk: "medium",
        },
      ],
      resolution: [
        "Restore host availability if the host is unhealthy.",
        "Correct network, runtime, disk, or service configuration based on evidence.",
        "Reconnect or re-provision the agent using its approved launch mechanism.",
        "If compromise is suspected, isolate and rebuild according to the security procedure.",
      ],
      verification: [
        "The agent is online and has the expected labels.",
        "A small validation build starts and completes.",
        "The queue begins draining without creating duplicate deployments.",
      ],
      prevention: [
        "Monitor agent connection status and last-seen timestamps.",
        "Alert on repeated disconnects and agent launch failures.",
        "Keep agent configuration reproducible and version-controlled.",
      ],
    },
    {
      title: "Builds remain queued despite online agents",
      symptoms: [
        "The queue grows but builds do not start.",
        "Agents appear online in Jenkins.",
        "Some labels or job types remain blocked.",
      ],
      likelyCauses: [
        "No online agent matches the job label expression.",
        "All matching executors are occupied.",
        "The job is restricted to a specific node.",
        "An upstream dependency, lock, or throttle blocks execution.",
        "An agent is temporarily unavailable or has zero executors.",
      ],
      diagnosticWorkflow: [
        {
          title: "Inspect queue causes and labels",
          purpose: "Identify why the queued job cannot be assigned.",
          commands: [
            "Open the queued item and inspect its cause.",
            "Inspect the Jenkinsfile agent or label expression.",
            "Inspect online nodes, labels, and executor availability.",
          ],
          expectedEvidence: [
            "The queue cause may name a missing label or unavailable matching executor.",
          ],
          decisionLogic: [
            "If no node matches, correct the intended label configuration.",
            "If matching executors are busy, inspect workload demand and queue duration.",
            "If another condition blocks execution, resolve that condition before adding capacity.",
          ],
          nextAction: "Correct the proven scheduling or queue blocker and monitor queue drainage.",
          risk: "low",
        },
      ],
      resolution: [
        "Correct the label expression if it does not match the intended pool.",
        "Restore unavailable matching agents.",
        "Add capacity only when executor saturation is confirmed and the workload can safely run in parallel.",
        "Review throttling, locks, and upstream dependencies.",
      ],
      verification: [
        "The job is assigned to the intended agent.",
        "Queue duration returns to its normal range.",
        "Other workloads do not suffer from resource starvation.",
      ],
      prevention: [
        "Use consistent, documented agent labels.",
        "Monitor queue age by label and job class.",
        "Test label expressions in pipeline validation.",
      ],
    },
    {
      title: "SSH agent launch fails",
      symptoms: [
        "SSH launch retries repeatedly.",
        "Authentication fails or the host is unreachable.",
        "The agent never becomes online.",
      ],
      likelyCauses: [
        "Incorrect hostname or DNS record.",
        "Network routing or firewall restriction.",
        "SSH key or account authorization failure.",
        "Host-key verification failure.",
        "Wrong remote Java path or incompatible runtime.",
        "Insufficient remote filesystem permissions.",
      ],
      diagnosticWorkflow: [
        {
          title: "Check name resolution and network reachability",
          purpose: "Determine whether the connection reaches the correct host.",
          commands: [
            "getent hosts <agent-host>",
            "nc -vz <agent-host> 22",
            "ssh -vvv -o BatchMode=yes <approved-agent-user>@<agent-host>",
          ],
          expectedEvidence: [
            "DNS output should resolve to the intended host.",
            "TCP connection failure suggests network, host, or port issues.",
            "SSH verbose output helps distinguish authentication from transport failure.",
          ],
          decisionLogic: [
            "If DNS is wrong, fix the approved DNS or host configuration.",
            "If TCP fails, investigate route, firewall, host health, and port configuration.",
            "If authentication fails, inspect the approved key and account authorization.",
          ],
          nextAction: "Fix the exact failing layer without weakening SSH security controls.",
          risk: "low",
        },
        {
          title: "Inspect remote runtime and permissions",
          purpose: "Validate prerequisites after SSH access works.",
          commands: [
            "ssh <approved-agent-user>@<agent-host> 'java -version'",
            "ssh <approved-agent-user>@<agent-host> 'id'",
            "ssh <approved-agent-user>@<agent-host> 'df -h'",
          ],
          expectedEvidence: [
            "The service account must have the required permissions and runtime.",
            "The workspace and temporary filesystem must be writable and have capacity.",
          ],
          decisionLogic: [
            "If Java is incompatible, follow the supported runtime upgrade procedure.",
            "If permissions are insufficient, correct only the intended paths and account access.",
          ],
          nextAction: "Re-test the Jenkins-managed SSH launch after validating the prerequisites.",
          risk: "medium",
        },
      ],
      resolution: [
        "Correct DNS, network, SSH account, or key configuration as identified.",
        "Verify host keys through the approved trust process.",
        "Ensure the remote agent runtime meets the applicable Jenkins requirements.",
        "Correct permissions on required agent directories without broad recursive permission changes.",
      ],
      verification: [
        "The SSH launch completes successfully.",
        "The agent stays online.",
        "A controlled build can check out source and execute its required commands.",
      ],
      prevention: [
        "Manage SSH keys through approved credential management.",
        "Monitor SSH launch failures.",
        "Test agent prerequisites during host provisioning.",
      ],
    },
    {
      title: "Inbound agent or remoting connection fails",
      symptoms: [
        "The inbound agent cannot connect to the controller.",
        "Remoting logs show repeated disconnects.",
        "The agent starts but drops offline shortly afterward.",
      ],
      likelyCauses: [
        "Incorrect controller URL or agent identity.",
        "Required inbound connectivity is blocked.",
        "Proxy or TLS configuration is incorrect.",
        "Agent process exits or is restarted.",
        "Network interruptions or resource pressure.",
        "Unsupported or mismatched agent runtime.",
      ],
      diagnosticWorkflow: [
        {
          title: "Validate controller reachability",
          purpose: "Check the configured controller endpoint from the agent host.",
          commands: [
            "getent hosts <jenkins-controller-host>",
            "curl -I https://<jenkins-controller-host>/login",
            "Inspect inbound agent launch logs.",
          ],
          expectedEvidence: [
            "HTTP response confirms that the web endpoint is reachable, not necessarily that the agent transport is working.",
            "TLS errors may indicate trust-chain, hostname, proxy, or certificate problems.",
          ],
          decisionLogic: [
            "If the web endpoint is unreachable, investigate DNS, routing, TLS, and proxy configuration.",
            "If the web endpoint works but the agent disconnects, verify the configured inbound connection method and its required transport.",
          ],
          nextAction: "Validate the exact connection method and required network path with the platform owner.",
          risk: "low",
        },
      ],
      resolution: [
        "Correct the controller endpoint and approved TLS configuration.",
        "Permit only the required network path for the configured connection method.",
        "Use the supported agent launch procedure and runtime.",
        "Do not expose controller or agent secrets in logs or command output.",
      ],
      verification: [
        "The inbound agent remains connected.",
        "The node has the expected labels and executors.",
        "A controlled pipeline completes without remoting disconnects.",
      ],
      prevention: [
        "Document supported agent connection methods.",
        "Monitor remoting disconnects and connection duration.",
        "Test certificate and proxy changes before production rollout.",
      ],
    },
    {
      title: "Java version or agent runtime incompatibility",
      symptoms: [
        "Agent launch fails after a Java upgrade.",
        "Logs show unsupported class versions or runtime errors.",
        "An agent works interactively but fails as a service.",
      ],
      likelyCauses: [
        "The service uses a different Java binary than the login shell.",
        "The runtime is unsupported by the installed Jenkins version.",
        "JAVA_HOME or PATH points to an old installation.",
        "An agent image was updated without compatibility testing.",
      ],
      diagnosticWorkflow: [
        {
          title: "Inspect the actual runtime",
          purpose: "Determine which Java executable the agent process uses.",
          commands: [
            "java -version",
            "which java",
            "echo \"$JAVA_HOME\"",
            "ps -ef | grep -E '[a]gent.jar|[r]emoting'",
          ],
          expectedEvidence: [
            "The interactive shell and service environment may differ.",
            "The launch command or service environment may point to a different runtime.",
          ],
          decisionLogic: [
            "Compare the runtime against the supported requirements for the installed Jenkins release and agent setup.",
            "Check logs for the exact Java compatibility exception before changing versions.",
          ],
          nextAction: "Upgrade or configure the runtime through the approved agent-image or host-management workflow.",
          risk: "medium",
        },
      ],
      resolution: [
        "Use a supported runtime for the relevant Jenkins controller and agent combination.",
        "Update JAVA_HOME and service environment consistently.",
        "Rebuild immutable agent images rather than applying undocumented manual changes.",
      ],
      verification: [
        "Agent launch succeeds with the expected runtime.",
        "The agent stays online.",
        "A representative build passes using the updated image.",
      ],
      prevention: [
        "Pin and document supported Java versions.",
        "Test runtime upgrades in staging.",
        "Add runtime checks to agent image CI.",
      ],
    },
    {
      title: "Workspace permission or disk exhaustion",
      symptoms: [
        "Checkout fails with permission denied.",
        "Builds fail with no space left on device.",
        "Only one agent experiences workspace-related failures.",
      ],
      likelyCauses: [
        "Filesystem or inode exhaustion.",
        "Workspace owned by another user.",
        "Read-only mount or incorrect mount options.",
        "Accumulated artifacts, caches, or abandoned workspaces.",
        "A previous build left files with incompatible ownership.",
      ],
      diagnosticWorkflow: [
        {
          title: "Check filesystem and ownership",
          purpose: "Identify whether the failure is capacity or permissions.",
          commands: [
            "df -h",
            "df -i",
            "id",
            "ls -ld <workspace-path>",
            "find <workspace-path> -maxdepth 2 -type d -print",
          ],
          expectedEvidence: [
            "Disk usage or inode usage may be exhausted.",
            "The workspace may not be writable by the agent service account.",
          ],
          decisionLogic: [
            "If capacity is exhausted, identify safe cleanup candidates and retention rules.",
            "If ownership is wrong, establish the intended service user and correct only affected paths.",
            "If the filesystem is read-only, investigate the underlying mount or storage failure.",
          ],
          nextAction: "Follow the approved filesystem or workspace repair procedure.",
          risk: "medium",
        },
      ],
      resolution: [
        "Free capacity through approved artifact retention and cleanup policies.",
        "Correct ownership and permissions on the intended workspace paths.",
        "Investigate storage errors before attempting cleanup.",
        "Preserve build evidence and required artifacts before deleting temporary data.",
      ],
      verification: [
        "The agent can create and write to its workspace.",
        "Git checkout and a representative build succeed.",
        "Filesystem capacity remains healthy after the build.",
      ],
      prevention: [
        "Monitor disk and inode usage.",
        "Set artifact and workspace retention policies.",
        "Separate build caches from required deliverables.",
      ],
    },
    {
      title: "Docker-based agent cannot run containers",
      symptoms: [
        "Docker commands fail on the agent.",
        "The Docker client cannot connect to the daemon.",
        "Builds fail with permission denied on the Docker socket.",
      ],
      likelyCauses: [
        "Docker daemon is stopped or unreachable.",
        "Wrong Docker endpoint or context.",
        "Agent user lacks the required authorization.",
        "Docker socket permissions are incorrect.",
        "Host disk or image storage is exhausted.",
        "A remote Docker endpoint or TLS configuration is invalid.",
      ],
      diagnosticWorkflow: [
        {
          title: "Inspect Docker client and daemon",
          purpose: "Separate client installation from daemon connectivity.",
          commands: [
            "docker version",
            "docker context show",
            "docker info",
            "df -h",
          ],
          expectedEvidence: [
            "A working client does not prove that the daemon is reachable.",
            "Docker daemon errors may identify socket, authorization, endpoint, or storage problems.",
          ],
          decisionLogic: [
            "If the client is missing, inspect the agent image and PATH.",
            "If the daemon is unreachable, validate the configured endpoint and service health.",
            "If access is denied, review the approved authorization model rather than granting unrestricted privileges.",
          ],
          nextAction: "Repair the intended Docker environment or use the approved isolated build platform.",
          risk: "medium",
        },
      ],
      resolution: [
        "Restore daemon availability when the host uses a managed Docker service.",
        "Correct the approved Docker endpoint and authorization.",
        "Clean unused images only through an approved retention policy.",
        "Do not grant privileged host access just to bypass a socket permission error.",
      ],
      verification: [
        "The intended Docker endpoint responds.",
        "The agent can build and run a test container.",
        "No unintended host or production privileges were introduced.",
      ],
      prevention: [
        "Use reproducible agent images.",
        "Monitor image storage and daemon health.",
        "Prefer isolated builders and least-privilege execution.",
      ],
    },
    {
      title: "Kubernetes agent Pod remains Pending or terminates",
      symptoms: [
        "A Kubernetes plugin creates an agent Pod that remains Pending.",
        "The agent Pod is evicted or repeatedly restarts.",
        "The pipeline never receives an executor.",
      ],
      likelyCauses: [
        "Insufficient cluster CPU or memory.",
        "Node selector, affinity, or toleration mismatch.",
        "PVC binding or image-pull failure.",
        "Pod creation rejected by quota or admission policy.",
        "Agent container exits or cannot connect to Jenkins.",
      ],
      diagnosticWorkflow: [
        {
          title: "Inspect agent Pod status and events",
          purpose: "Determine whether the issue is Pod scheduling, container startup, or Jenkins connectivity.",
          commands: [
            "kubectl get pods -n <agent-namespace> -o wide",
            "kubectl describe pod <agent-pod> -n <agent-namespace>",
            "kubectl get events -n <agent-namespace> --sort-by=.metadata.creationTimestamp",
            "kubectl logs <agent-pod> -n <agent-namespace> --all-containers",
          ],
          expectedEvidence: [
            "Pending with no node assignment suggests scheduling constraints.",
            "ImagePullBackOff suggests image or registry access problems.",
            "A scheduled Pod with connection errors requires Jenkins endpoint, DNS, TLS, or network investigation.",
            "Logs may be unavailable if the container never started.",
          ],
          decisionLogic: [
            "Follow Kubernetes events first if the Pod has no node assignment.",
            "Inspect image, command, and runtime if the Pod is assigned but fails to start.",
            "Inspect connectivity only after confirming that the agent container is running.",
          ],
          nextAction: "Correct the failure at the Kubernetes layer where it originates.",
          risk: "low",
        },
      ],
      resolution: [
        "Resolve Kubernetes scheduling, quota, storage, image, or admission errors.",
        "Verify the agent image contains the required runtime and tools.",
        "Check the approved controller endpoint and network path from the Pod.",
        "Do not expose agent secrets in Pod logs or manifests.",
      ],
      verification: [
        "The agent Pod reaches Running and the Jenkins agent connects.",
        "A controlled build completes.",
        "The Pod lifecycle and cleanup behave as intended.",
      ],
      prevention: [
        "Monitor agent Pod Pending duration and failure rates.",
        "Validate agent Pod templates in staging.",
        "Set realistic requests and limits for agent containers.",
      ],
    },
    {
      title: "Agent executor exhaustion and slow queues",
      symptoms: [
        "Jobs queue during peak hours.",
        "Agents are online but all executors are busy.",
        "Increasing build concurrency causes instability.",
      ],
      likelyCauses: [
        "Too few executors for demand.",
        "Builds consume excessive CPU, memory, disk, or network.",
        "Long-running builds occupy scarce deployment executors.",
        "Unbounded parallel stages increase contention.",
        "A shared dependency is slower than the build system.",
      ],
      diagnosticWorkflow: [
        {
          title: "Measure queue and executor saturation",
          purpose: "Determine whether additional concurrency is safe and useful.",
          commands: [
            "Review queue age and matching label availability.",
            "Inspect executor utilization by agent.",
            "Inspect CPU, memory, disk, and build duration.",
            "Compare peak demand with recent successful build throughput.",
          ],
          expectedEvidence: [
            "High queue age with saturated executors indicates capacity pressure.",
            "Low executor utilization with a long queue suggests labels or another queue blocker.",
            "Resource contention may make additional executors counterproductive.",
          ],
          decisionLogic: [
            "If executors are saturated and resources are healthy, evaluate safe additional capacity.",
            "If resources are saturated, optimize or isolate workloads before increasing concurrency.",
            "If jobs are blocked for another reason, resolve the blocker instead of scaling executors.",
          ],
          nextAction: "Apply a capacity change only after validating resource limits and workload isolation.",
          risk: "medium",
        },
      ],
      resolution: [
        "Add appropriate agent capacity when demand justifies it.",
        "Reduce unnecessary pipeline parallelism.",
        "Separate deployment, security-sensitive, and resource-heavy workloads where required.",
        "Use queue management and throttling for constrained shared resources.",
      ],
      verification: [
        "Queue age improves.",
        "Build duration remains stable or improves.",
        "Agents do not experience increased memory pressure or disk exhaustion.",
      ],
      prevention: [
        "Forecast demand from queue and duration metrics.",
        "Track executor utilization by label.",
        "Set controlled concurrency limits.",
      ],
    },
    {
      title: "Build hangs after agent disconnect",
      symptoms: [
        "A build remains Running even though the agent is offline.",
        "The pipeline waits indefinitely for a shell command or remote task.",
        "The remote deployment may still be running.",
      ],
      likelyCauses: [
        "Agent-to-controller communication was interrupted.",
        "A subprocess or remote deployment continued after the agent disconnected.",
        "A shell command has no timeout.",
        "The pipeline is waiting for an external service.",
        "A process or lock was left behind.",
      ],
      diagnosticWorkflow: [
        {
          title: "Identify the last active stage",
          purpose: "Find whether the build is blocked locally or waiting on a remote operation.",
          commands: [
            "Inspect the complete console log and timestamps.",
            "Inspect the affected stage and shell command.",
            "Check agent process and service logs.",
            "Check the remote deployment target using approved read-only checks.",
          ],
          expectedEvidence: [
            "The last console line may identify the blocked operation.",
            "The remote task may have completed even though Jenkins did not receive the result.",
          ],
          decisionLogic: [
            "If a remote change may have occurred, inspect the target before retrying.",
            "If the command is waiting on a dependency, inspect that dependency's health.",
            "If the agent process has exited, follow the approved build interruption or recovery process.",
          ],
          nextAction: "Establish the actual build and deployment state before restarting or retrying.",
          risk: "medium",
        },
      ],
      resolution: [
        "Add appropriate stage and shell timeouts.",
        "Use idempotent deployment operations and explicit completion checks.",
        "Terminate abandoned processes only after confirming ownership and impact.",
        "Use the approved pipeline abort or recovery mechanism.",
      ],
      verification: [
        "The blocked build reaches a known terminal state.",
        "The target environment is consistent with the release record.",
        "A subsequent validation build completes.",
      ],
      prevention: [
        "Add timeouts around network and remote commands.",
        "Record deployment operation IDs and completion state.",
        "Design safe retries for interrupted operations.",
      ],
    },
    {
      title: "Git checkout fails only on one agent",
      symptoms: [
        "The repository builds on other agents.",
        "Checkout fails with permission, host verification, or repository errors.",
        "The affected workspace may contain stale data.",
      ],
      likelyCauses: [
        "Incorrect Git installation or PATH.",
        "Credential binding is missing or unavailable.",
        "Repository URL or branch configuration differs.",
        "SSH host verification or network access fails.",
        "Workspace ownership or stale lock files cause errors.",
      ],
      diagnosticWorkflow: [
        {
          title: "Compare repository and runtime configuration",
          purpose: "Identify agent-specific checkout differences.",
          commands: [
            "git --version",
            "git rev-parse --show-toplevel",
            "git status --short",
            "git rev-parse HEAD",
            "Inspect the checkout stage's console log.",
          ],
          expectedEvidence: [
            "The Git version or repository path may differ.",
            "The failure may identify authentication, branch, DNS, host verification, or filesystem access.",
          ],
          decisionLogic: [
            "If authentication fails, inspect the Jenkins credential binding without printing secret values.",
            "If host verification fails, use the approved host-key trust process.",
            "If the workspace is corrupted, preserve needed evidence before using the approved cleanup process.",
          ],
          nextAction: "Correct the specific checkout failure and rerun the checkout in a controlled build.",
          risk: "low",
        },
      ],
      resolution: [
        "Install or configure the supported Git client.",
        "Correct repository and branch settings.",
        "Repair credential binding through Jenkins credential management.",
        "Correct workspace access or use the approved workspace cleanup procedure.",
      ],
      verification: [
        "Checkout retrieves the expected commit.",
        "The repository builds successfully on the affected agent.",
      ],
      prevention: [
        "Pin agent tool versions.",
        "Test checkout in agent-image CI.",
        "Use least-privilege credentials and managed host verification.",
      ],
    },
    {
      title: "Agent loses access to credentials",
      symptoms: [
        "A previously working pipeline fails during credential binding.",
        "Authentication to a registry or deployment target fails.",
        "A secret is missing from the expected stage.",
      ],
      likelyCauses: [
        "Credential ID changed or was removed.",
        "Credential scope does not include the job or folder.",
        "A credential binding step is misconfigured.",
        "The agent or container cannot reach the target service.",
        "A credential was rotated without updating dependent systems.",
      ],
      diagnosticWorkflow: [
        {
          title: "Inspect credential references safely",
          purpose: "Distinguish credential lookup from network or authorization failure.",
          commands: [
            "Inspect the Jenkinsfile credential ID and binding type.",
            "Inspect Jenkins credential scope and folder permissions.",
            "Inspect the exact authentication error in the console log.",
            "Check target endpoint reachability without printing secrets.",
          ],
          expectedEvidence: [
            "A missing credential ID differs from an invalid token or inaccessible target.",
            "Credential lookup may succeed while the remote service rejects authorization.",
          ],
          decisionLogic: [
            "If the credential cannot be resolved, correct the ID, scope, or approved binding.",
            "If the remote service rejects the credential, follow the authorized rotation or access review process.",
            "If connectivity fails, investigate DNS, network, proxy, and TLS separately.",
          ],
          nextAction: "Fix the identified credential or connectivity issue without exposing secret material.",
          risk: "medium",
        },
      ],
      resolution: [
        "Correct the credential reference and scope.",
        "Use the approved secret rotation process if compromise or expiry is confirmed.",
        "Verify target permissions and endpoint reachability.",
        "Do not place credentials in Jenkinsfiles, logs, shell output, or source control.",
      ],
      verification: [
        "The authorized operation succeeds.",
        "The pipeline log contains no exposed secret values.",
      ],
      prevention: [
        "Use managed Jenkins credentials or an approved external secret store.",
        "Audit credential scope and rotation procedures.",
        "Add secret scanning and credential-reference validation.",
      ],
    },
  ],

  incidentScenarios: [
    {
      title: "Production deployment pipeline suddenly has zero available agents",
      severity: "SEV-2 or SEV-1 depending on customer impact.",
      scenario:
        "A production release starts during a busy deployment window. The deployment jobs remain queued because the intended deployment-agent pool is offline or has no free executors.",
      impact: [
        "Production deployment is delayed.",
        "Urgent fixes may be blocked.",
        "Previously running deployment operations may have partially completed.",
        "Retrying without checking target state may cause duplicate or conflicting changes.",
      ],
      investigation: [
        "Confirm the controller, job, branch, environment, and intended agent label.",
        "Inspect queue causes and determine whether any online node matches the label.",
        "Check whether all matching executors are occupied or disconnected.",
        "Review the agent offline reason and the last successful build.",
        "Inspect controller and agent logs for the same incident timestamp.",
        "Check host availability, network connectivity, runtime, disk, and memory.",
        "Inspect recent changes to labels, credentials, agent images, plugins, and infrastructure.",
        "Check whether any production deployment already started and establish the actual target state.",
      ],
      rootCauseIsolation: [
        "Wrong label: compare the Jenkinsfile label expression with configured node labels.",
        "Agent host failure: confirm host health and service status.",
        "SSH failure: separate DNS, TCP connectivity, host verification, authentication, and remote runtime errors.",
        "Inbound connection failure: verify controller endpoint, required transport, TLS, and network policy.",
        "Executor exhaustion: confirm that matching agents are online but fully occupied.",
        "Provisioning failure: inspect Docker or Kubernetes agent launch events.",
        "Shared dependency: correlate failures across agents using the same network, image, host, or node pool.",
      ],
      recovery: [
        "Pause new release attempts if deployment state is uncertain.",
        "Preserve queue details, logs, and relevant build evidence.",
        "Restore the affected agent or provide approved compatible capacity.",
        "Validate the intended label and runtime using a non-production or low-risk test build.",
        "Check the target production environment before resuming a partially completed deployment.",
        "Resume through the approved deployment workflow.",
        "Use the service's rollback procedure if health checks or recovery criteria fail.",
      ],
      rollbackDecision:
        "An offline agent alone does not automatically require application rollback. Roll back when the deployment has caused an unhealthy or inconsistent target state, according to the service's approved recovery criteria. If the deployment never began, restore the pipeline and avoid unnecessary application changes.",
      verification: [
        "The required agent pool is online and correctly labeled.",
        "The production job leaves the queue and runs on an authorized agent.",
        "Deployment status is known and duplicate changes are avoided.",
        "Application health checks, error rates, and availability meet recovery criteria.",
        "The queue returns to a normal level.",
      ],
    },
    {
      title: "All SSH agents disconnect after a network change",
      severity: "SEV-2 when critical builds are blocked.",
      scenario:
        "A firewall or routing change is followed by simultaneous SSH agent launch failures across multiple hosts.",
      impact: [
        "Jobs requiring the affected pool remain queued.",
        "New builds cannot launch on those agents.",
        "In-flight builds may fail or lose connection.",
      ],
      investigation: [
        "Correlate the first failure time with the network change.",
        "Check DNS resolution and TCP connectivity to multiple affected hosts.",
        "Compare affected hosts with a known-good agent network path.",
        "Inspect Jenkins SSH launch logs and approved firewall change records.",
        "Confirm whether only SSH is affected or other services also lost connectivity.",
      ],
      rootCauseIsolation: [
        "If name resolution changed, investigate DNS and endpoint configuration.",
        "If DNS resolves correctly but TCP times out, investigate routing and firewall rules.",
        "If TCP succeeds but authentication fails, inspect SSH configuration separately.",
        "If SSH works manually but Jenkins launch fails, inspect service identity, remote Java, and launch configuration.",
      ],
      recovery: [
        "Restore the approved network path through the network change process.",
        "Validate connectivity to a representative agent.",
        "Reconnect agents using the supported Jenkins launch mechanism.",
        "Run a controlled validation build before restoring the full queue.",
      ],
      rollbackDecision:
        "Revert the network change only through the approved change process when evidence confirms it caused the outage and rollback is safe.",
      verification: [
        "SSH connectivity succeeds from the intended controller or launch environment.",
        "Agents stay online.",
        "Queued builds start successfully.",
        "No new authentication or host-verification failures appear.",
      ],
    },
    {
      title: "Kubernetes agent Pods stop launching after a cluster upgrade",
      severity: "SEV-2 when the build platform is unavailable.",
      scenario:
        "Jenkins continues to queue builds, but ephemeral agent Pods remain Pending or fail during startup after a Kubernetes cluster or agent-image change.",
      impact: [
        "Build capacity falls to zero for Kubernetes-backed jobs.",
        "Release pipelines and test stages are delayed.",
        "Repeated retries may increase cluster pressure.",
      ],
      investigation: [
        "Inspect agent Pod events and identify whether Pods are Pending, unschedulable, or failing after startup.",
        "Compare the current agent Pod template and image with the last known-good configuration.",
        "Inspect node capacity, taints, quotas, admission policies, and image registry access.",
        "Review cluster upgrade notes and the Jenkins Kubernetes plugin configuration.",
        "Check agent-to-controller DNS, TLS, and network connectivity.",
      ],
      rootCauseIsolation: [
        "FailedScheduling points toward resource, affinity, taint, quota, or storage constraints.",
        "ImagePullBackOff points toward image reference, registry access, or authentication.",
        "A running agent container with remoting errors points toward the controller connection path.",
        "Admission failures indicate policy or webhook problems before normal Pod execution.",
      ],
      recovery: [
        "Correct the proven Kubernetes or agent-template issue.",
        "Restore a compatible agent image or supported plugin configuration if required.",
        "Use the approved cluster or deployment change process.",
        "Run a small test job before restoring normal release traffic.",
      ],
      rollbackDecision:
        "Roll back the cluster, plugin, or agent-image change only through its approved recovery procedure and after checking compatibility and workload impact.",
      verification: [
        "Agent Pods start and become ready.",
        "Jenkins recognizes the agents and assigns builds.",
        "Representative build and checkout stages succeed.",
        "Cluster resource utilization and failure rates return to normal.",
      ],
    },
    {
      title: "Agent disk fills during a release build",
      severity: "SEV-2 if the release pipeline or shared host is affected.",
      scenario:
        "A large build exhausts the agent filesystem, causing checkout, artifact creation, and later builds to fail.",
      impact: [
        "The current build may be incomplete.",
        "Other builds sharing the filesystem may fail.",
        "Artifacts may be missing or incomplete.",
        "The release target may have received only part of the deployment.",
      ],
      investigation: [
        "Capture the failed build log and the exact filesystem error.",
        "Check disk and inode utilization.",
        "Identify whether the full filesystem is a workspace, artifact directory, container storage, or system partition.",
        "Inspect artifact retention, caches, and abandoned workspaces.",
        "Check whether a deployment began before the filesystem failure.",
      ],
      rootCauseIsolation: [
        "No space left on device with full disk usage indicates capacity exhaustion.",
        "Full inode usage with available bytes indicates a large file-count problem.",
        "A read-only filesystem points toward mount or storage failure.",
        "A single oversized artifact points toward output growth or retention configuration.",
      ],
      recovery: [
        "Follow the approved retention and cleanup policy.",
        "Preserve required logs, artifacts, and incident evidence.",
        "Restore filesystem capacity and verify write access.",
        "Check the production target before deciding whether the release should be retried.",
      ],
      rollbackDecision:
        "Rollback the application only if deployment state or application health requires it. Filesystem recovery alone does not prove that application rollback is necessary.",
      verification: [
        "Disk and inode headroom are restored.",
        "The agent can write to the workspace.",
        "A controlled build produces complete artifacts.",
        "The production release state is verified.",
      ],
    },
  ],

  commandReference: [
    {
      command: "java -version",
      purpose: "Inspect the Java runtime in the current shell.",
      interpretation: "Compare with the required runtime; the service may use a different Java executable.",
    },
    {
      command: "which java",
      purpose: "Identify the Java executable found through PATH.",
      interpretation: "Use service configuration to verify the runtime actually used by the agent.",
    },
    {
      command: "df -h",
      purpose: "Inspect filesystem capacity.",
      interpretation: "A full filesystem may prevent builds, checkout, logs, and temporary files.",
    },
    {
      command: "df -i",
      purpose: "Inspect inode utilization.",
      interpretation: "Inode exhaustion can block file creation even when bytes remain available.",
    },
    {
      command: "free -h",
      purpose: "Inspect Linux memory usage.",
      interpretation: "Use alongside process and operating-system evidence to investigate memory pressure.",
    },
    {
      command: "getent hosts <agent-host>",
      purpose: "Check host resolution through the configured name service.",
      interpretation: "Incorrect or missing results indicate a possible name-resolution problem.",
    },
    {
      command: "nc -vz <agent-host> 22",
      purpose: "Test TCP reachability to an SSH endpoint.",
      interpretation: "A failed connection can indicate a wrong endpoint, network block, or unavailable service.",
    },
    {
      command: "ssh -vvv -o BatchMode=yes <approved-agent-user>@<agent-host>",
      purpose: "Diagnose SSH connection and authentication behavior.",
      interpretation: "Use verbose output to distinguish transport, host verification, and authentication failures.",
    },
    {
      command: "systemctl status jenkins-agent",
      purpose: "Inspect a Linux systemd-managed agent service.",
      interpretation: "Use only when the agent is actually managed by this service.",
    },
    {
      command: "journalctl -u jenkins-agent --since '30 minutes ago'",
      purpose: "Inspect recent service logs.",
      interpretation: "Look for process exits, runtime errors, and launch failures.",
    },
    {
      command: "git --version",
      purpose: "Check Git availability.",
      interpretation: "A missing or incompatible tool may explain checkout failure.",
    },
    {
      command: "git rev-parse HEAD",
      purpose: "Identify the checked-out commit.",
      interpretation: "Compare against the expected commit and a successful build.",
    },
    {
      command: "docker version",
      purpose: "Inspect Docker client and server availability.",
      interpretation: "Client-only output does not prove that the daemon is reachable.",
    },
    {
      command: "docker info",
      purpose: "Inspect Docker daemon information.",
      interpretation: "Connection or permission errors point toward the configured endpoint or authorization.",
    },
    {
      command: "kubectl get pods -n <agent-namespace> -o wide",
      purpose: "Inspect Kubernetes-based Jenkins agent Pods.",
      interpretation: "Use Pod status and node assignment to choose the next diagnostic branch.",
    },
    {
      command: "kubectl describe pod <agent-pod> -n <agent-namespace>",
      purpose: "Inspect agent Pod conditions and events.",
      interpretation: "FailedScheduling, image-pull, mount, and startup errors require different fixes.",
    },
    {
      command: "kubectl get events -n <agent-namespace> --sort-by=.metadata.creationTimestamp",
      purpose: "Review recent agent namespace events.",
      interpretation: "Correlate provisioning failures with cluster changes and agent creation times.",
    },
    {
      command: "env | cut -d= -f1 | sort",
      purpose: "List environment variable names without printing their values.",
      interpretation: "Use it to inspect environment-variable presence without exposing potential secrets.",
    },
  ],

  recoveryRunbook: [
    "Declare the incident and assign an owner when the impact warrants it.",
    "Confirm controller, job, branch, target environment, and the intended agent pool.",
    "Establish whether a production deployment started or partially applied changes.",
    "Preserve queue details, console logs, node logs, and relevant system evidence.",
    "Determine whether the blocker is label matching, executor capacity, host availability, transport, runtime, workspace, or ephemeral-agent provisioning.",
    "Validate the root cause using read-only diagnostics.",
    "Select the smallest safe corrective action and obtain required approval.",
    "Apply the fix through the approved configuration or infrastructure workflow.",
    "Validate one representative agent before returning the entire pool to service.",
    "Run a controlled build that checks out the intended commit and executes a low-risk stage.",
    "Before retrying deployment, verify the actual target state and ensure duplicate changes will not occur.",
    "Resume the release through the approved pipeline.",
    "Use the service-specific rollback procedure if recovery criteria fail.",
    "Confirm queue drainage, agent stability, application health, and monitoring status.",
    "Document the timeline, confirmed cause, recovery, and preventive actions.",
  ],

  prevention: [
    "Manage agent definitions, labels, images, and launch settings as version-controlled configuration.",
    "Pin supported Java, Git, Docker, and build-tool versions.",
    "Test agent images before production rollout.",
    "Use immutable or reproducible agent images where practical.",
    "Use separate agent pools for deployment, untrusted pull requests, and privileged workloads.",
    "Apply least privilege to SSH accounts, credentials, containers, and deployment access.",
    "Monitor disk, inodes, memory, CPU, network, and agent process health.",
    "Set workspace and artifact retention policies.",
    "Use stage timeouts and safe retry strategies.",
    "Validate labels and queue constraints before merging pipeline changes.",
    "Test Kubernetes agent provisioning and recovery after cluster upgrades.",
    "Keep a known-good agent image and a documented recovery procedure.",
    "Use controlled concurrency to avoid exhausting shared resources.",
    "Test agent outage and reconnect scenarios in non-production environments.",
  ],

  monitoring: [
    "Alert when critical agents go offline.",
    "Track agent connection duration and repeated disconnects.",
    "Monitor queue age and queue length by label.",
    "Measure executor utilization and build duration by agent pool.",
    "Alert on agent host disk and inode exhaustion.",
    "Monitor memory pressure, process restarts, and host availability.",
    "Track SSH launch and inbound connection failure rates.",
    "Monitor Kubernetes agent Pod Pending duration and restart counts.",
    "Track image-pull, admission, and scheduling errors for ephemeral agents.",
    "Monitor controller health and relevant remoting errors.",
    "Track release pipeline success rate and deployment duration.",
    "Correlate alerts with agent-image, plugin, network, and infrastructure changes.",
  ],

  cicdValidation: [
    "Validate Jenkinsfile syntax and shared-library changes before merge.",
    "Check that referenced agent labels exist in the intended environment.",
    "Verify agent images contain the required Java and build tools.",
    "Test Git checkout using the approved repository and credential configuration.",
    "Validate Docker or Kubernetes dependencies in an isolated environment.",
    "Check workspace permissions and temporary directory availability.",
    "Use a smoke test after agent-image or runtime changes.",
    "Test queue behavior and safe concurrency under representative load.",
    "Add timeouts to network operations and long-running pipeline stages.",
    "Ensure deployment steps are idempotent or have a verified recovery path.",
    "Verify that secret values cannot leak into logs or artifacts.",
    "Run a low-risk validation build before restoring production release traffic.",
  ],

  incidentReportTemplate: [
    "Incident ID and incident owner",
    "Detection time and recovery time",
    "Affected Jenkins controller and agent pool",
    "Affected jobs, branches, labels, and environments",
    "Severity and business impact",
    "Queue length and oldest queued build",
    "Agent offline reason and connection method",
    "Console, controller, agent, host, and provisioning evidence",
    "Recent code, image, plugin, network, or infrastructure changes",
    "Confirmed root cause and evidence supporting it",
    "Corrective action and change approval",
    "Build validation and deployment verification",
    "Rollback decision and outcome",
    "Monitoring gaps and alerts added",
    "Preventive action, owner, and due date",
    "Lessons learned",
  ],

  labs: [
    {
      title: "Lab 1: Diagnose an offline Linux agent",
      objective:
        "Practice separating host, service, network, and Jenkins launch failures.",
      steps: [
        "Use a disposable Jenkins controller and test agent.",
        "Capture the agent's healthy state and logs.",
        "Stop the test agent service in the lab.",
        "Inspect Jenkins node status and the agent service logs.",
        "Restore the service and confirm reconnection.",
        "Run a harmless validation pipeline.",
      ],
    },
    {
      title: "Lab 2: Troubleshoot a label mismatch",
      objective:
        "Understand why a queued job cannot find a matching node.",
      steps: [
        "Create a test job that requests a dedicated test label.",
        "Verify the label is absent from the test agent.",
        "Inspect the queue cause.",
        "Correct the label in the test configuration.",
        "Verify the job starts on the intended agent.",
      ],
    },
    {
      title: "Lab 3: Reproduce a workspace capacity problem",
      objective:
        "Learn to identify disk and inode exhaustion safely.",
      steps: [
        "Use a disposable VM with a separate test filesystem.",
        "Capture df -h and df -i output.",
        "Reproduce a controlled capacity failure without touching production data.",
        "Identify the test files consuming capacity.",
        "Clean up using the lab's defined retention policy.",
        "Verify a test build can write to the workspace.",
      ],
    },
    {
      title: "Lab 4: Kubernetes ephemeral agent failure",
      objective:
        "Distinguish Pod scheduling failures from container and remoting failures.",
      steps: [
        "Configure a test Kubernetes agent template.",
        "Inspect the agent Pod and its events.",
        "Reproduce a label or resource mismatch in the isolated environment.",
        "Correct the test configuration.",
        "Verify the Pod starts and Jenkins assigns the agent.",
      ],
    },
    {
      title: "Lab 5: Safe deployment retry after agent loss",
      objective:
        "Practice verifying target state before retrying an interrupted deployment.",
      steps: [
        "Use a non-production application with a reversible test release.",
        "Record the current version and deployment state.",
        "Interrupt the test agent during a controlled release.",
        "Determine which steps completed from target-side evidence.",
        "Use the approved recovery logic to continue or roll back.",
        "Verify the final application version and health.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "What is a Jenkins agent?",
      answer:
        "A Jenkins agent executes build and pipeline work assigned by a Jenkins controller. Agents provide execution capacity and can run on VMs, physical hosts, containers, or Kubernetes Pods.",
    },
    {
      question: "What is the difference between a controller and an agent?",
      answer:
        "The controller coordinates Jenkins jobs, scheduling, configuration, and results. Agents execute assigned work in their configured environments.",
    },
    {
      question: "Why do Jenkins builds remain in the queue?",
      answer:
        "Common reasons include no matching online agent, exhausted executors, label mismatch, upstream dependencies, locks, throttling, or other queue blockers.",
    },
    {
      question: "How do you troubleshoot an agent that suddenly goes offline?",
      answer:
        "Inspect the Jenkins offline reason, controller and agent logs, host availability, network connectivity, process status, Java runtime, and resource pressure.",
    },
    {
      question: "How do you troubleshoot SSH launch failures?",
      answer:
        "Separate DNS resolution, TCP reachability, SSH host verification, authentication, remote permissions, Java runtime, and agent launch errors.",
    },
    {
      question: "Why can an agent work interactively but fail when launched as a service?",
      answer:
        "The service may use a different user, PATH, JAVA_HOME, working directory, environment, permissions, or mounted filesystem.",
    },
    {
      question: "What is an executor in Jenkins?",
      answer:
        "An executor represents a slot where Jenkins can run a build task on a node. More executors increase concurrency but can also increase resource contention.",
    },
    {
      question: "Should you increase executors whenever the queue grows?",
      answer:
        "No. First determine whether the queue is caused by executor saturation, label mismatch, resource limits, or another blocker. Extra executors can worsen resource pressure.",
    },
    {
      question: "What is the difference between SSH and inbound agents?",
      answer:
        "SSH agents are commonly launched by the controller connecting to the remote host. Inbound agents initiate their connection toward the configured controller endpoint using the supported agent transport.",
    },
    {
      question: "How do you troubleshoot Java incompatibility?",
      answer:
        "Inspect the actual runtime used by the agent service, compare it with the supported Jenkins and agent requirements, and examine the launch error before upgrading.",
    },
    {
      question: "Why does an agent report no space left on device?",
      answer:
        "The filesystem may be full, inodes may be exhausted, or a mounted filesystem may have become unavailable or read-only.",
    },
    {
      question: "How do you troubleshoot Docker access from an agent?",
      answer:
        "Check the Docker client, configured endpoint, daemon health, authorization, socket access, and storage. Do not grant unrestricted host privileges as a shortcut.",
    },
    {
      question: "How do you troubleshoot Kubernetes-based Jenkins agents?",
      answer:
        "Inspect the agent Pod status and events first, then follow the relevant branch for scheduling, image pulling, container startup, or Jenkins remoting connectivity.",
    },
    {
      question: "Why can a pipeline hang after an agent disconnects?",
      answer:
        "The agent may have lost communication while a subprocess or remote task continued, or the pipeline may be waiting on a dependency without a timeout.",
    },
    {
      question: "What should you do before retrying an interrupted production deployment?",
      answer:
        "Verify the actual target state, identify which deployment steps completed, and use an idempotent recovery or approved rollback procedure to avoid duplicate changes.",
    },
    {
      question: "How do you secure Jenkins agents?",
      answer:
        "Use least privilege, isolated pools, managed credentials, reproducible images, controlled network access, and separate untrusted build workloads from privileged deployment agents.",
    },
    {
      question: "What is the purpose of agent labels?",
      answer:
        "Labels allow jobs to request agents with appropriate capabilities or isolation. A job remains queued if no eligible online agent satisfies its label expression.",
    },
    {
      question: "How do you prevent repeated agent failures?",
      answer:
        "Monitor connection health, queue age, resource pressure, disk usage, and launch failures. Test agent images and runtime changes and keep a documented recovery runbook.",
    },
    {
      question: "What evidence should be collected during a Jenkins agent incident?",
      answer:
        "Capture timestamps, queue causes, console output, agent and controller logs, runtime details, host health, connection errors, recent changes, and the deployment's actual state.",
    },
    {
      question: "How do you prove that an agent recovery is complete?",
      answer:
        "Verify stable agent connectivity, correct labels and executors, a successful representative build, normal queue drainage, and the target application's health if a deployment was involved.",
    },
  ],

  references: [
    {
      title: "Jenkins Distributed Builds",
      url: "https://www.jenkins.io/doc/book/using/using-agents/",
    },
    {
      title: "Managing Nodes",
      url: "https://www.jenkins.io/doc/book/managing/nodes/",
    },
    {
      title: "Jenkins Pipeline Syntax",
      url: "https://www.jenkins.io/doc/book/pipeline/syntax/",
    },
    {
      title: "Jenkins Pipeline Steps Reference",
      url: "https://www.jenkins.io/doc/pipeline/steps/",
    },
    {
      title: "Jenkins System Administration",
      url: "https://www.jenkins.io/doc/book/system-administration/",
    },
    {
      title: "Jenkins Security",
      url: "https://www.jenkins.io/doc/book/security/",
    },
    {
      title: "Jenkins Kubernetes Plugin",
      url: "https://plugins.jenkins.io/kubernetes/",
    },
    {
      title: "Jenkins SSH Build Agents Plugin",
      url: "https://plugins.jenkins.io/ssh-slaves/",
    },
    {
      title: "Jenkins Java Support Policy",
      url: "https://www.jenkins.io/doc/book/platform-information/support-policy-java/",
    },
    {
      title: "Jenkins Troubleshooting",
      url: "https://www.jenkins.io/doc/book/troubleshooting/",
    },
  ],
};
