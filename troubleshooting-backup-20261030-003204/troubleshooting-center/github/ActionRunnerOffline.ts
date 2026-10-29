
export interface ActionRunnerOfflineGuide {
  title: string;
  slug: string;
  category: string;
  overview: string;
  incidentScenario: string;
  impactAndSeverity: {
    severity: string;
    conditions: string[];
    response: string;
  }[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    interpretation: string[];
    nextActions: string[];
  }[];
  rootCauseMatrix: {
    symptom: string;
    possibleCause: string;
    verification: string[];
    fix: string[];
  }[];
  recoveryProcedure: string[];
  githubHostedRunnerTroubleshooting: string[];
  selfHostedRunnerTroubleshooting: string[];
  networkAndSecurityChecks: string[];
  prevention: string[];
  monitoringAndAlerting: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    expectedOutcome: string;
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

export const actionRunnerOfflineGuide: ActionRunnerOfflineGuide = {
  title: "GitHub Actions Runner Offline — Production Troubleshooting",
  slug: "github-actions-runner-offline",
  category: "GitHub Actions",

  overview: `
A GitHub Actions runner executes jobs from GitHub Actions workflows.
A runner marked Offline cannot currently receive jobs through the normal
runner scheduling mechanism.

This issue is particularly important for self-hosted runners, where the
runner process, host machine, network connectivity, registration, service,
permissions, and maintenance procedures are managed by the organization.

GitHub-hosted runners are managed by GitHub. Their availability must be
investigated differently from self-hosted runner hosts.

Typical production symptoms:
- Jobs remain queued waiting for a runner.
- A self-hosted runner shows Offline in repository or organization settings.
- A runner service has stopped or the host has rebooted.
- The runner cannot reach GitHub endpoints.
- A runner has lost registration or has a configuration problem.
- A job requests labels that no available runner satisfies.
- Multiple jobs are blocked because an entire runner pool is unavailable.

Important distinction:
A queued job does not always mean the runner is offline. Incorrect labels,
workflow concurrency, approval requirements, unavailable capacity, and
environment protection rules can also prevent a job from starting.
`,

  incidentScenario: `
At 09:30 UTC, the production deployment workflow begins queueing jobs.
The workflow normally runs on a self-hosted Linux runner group. No eligible
runner is accepting the jobs, and the deployment team reports that the
pipeline is effectively blocked.

The on-call engineer must establish whether the issue affects GitHub-hosted
or self-hosted runners, determine the affected repository and runner group,
inspect runner status and host health, verify network access and registration,
and restore capacity safely.

Before rerunning the deployment, the engineer must determine whether a
previous attempt already changed production resources.
`,

  impactAndSeverity: [
    {
      severity: "SEV-1 — Critical",
      conditions: [
        "A critical production deployment is blocked across the organization.",
        "A deployment partially completed and the current production state is uncertain.",
        "No approved alternate runner capacity exists for a business-critical service.",
      ],
      response:
        "Activate incident response, assign an owner, protect in-progress changes, and coordinate with the platform and deployment owners.",
    },
    {
      severity: "SEV-2 — High",
      conditions: [
        "Multiple production workflows or repositories are blocked.",
        "An entire self-hosted runner group is unavailable.",
        "Release delivery is significantly delayed.",
      ],
      response:
        "Investigate the runner pool, host availability, and shared network or infrastructure dependencies.",
    },
    {
      severity: "SEV-3 — Moderate",
      conditions: [
        "One repository or one runner is affected.",
        "Other eligible runners can execute the workflow.",
        "A controlled workaround is available.",
      ],
      response:
        "Investigate the individual runner and restore capacity without disturbing healthy runners.",
    },
    {
      severity: "SEV-4 — Low",
      conditions: [
        "A non-critical scheduled or reporting workflow is delayed.",
        "No production service or critical delivery process is affected.",
      ],
      response:
        "Record the issue, restore service through the normal maintenance process, and review preventive actions.",
    },
  ],

  safetyChecks: [
    "Confirm the correct organization, repository, workflow, runner group, and environment.",
    "Determine whether the runner is GitHub-hosted or self-hosted.",
    "Record the workflow run ID, queued job name, runner name, labels, and UTC timestamps.",
    "Check whether the job is queued, waiting for approval, blocked by concurrency, or genuinely unable to find a runner.",
    "Do not reboot, deregister, or reinstall a runner before capturing evidence.",
    "Do not stop healthy runners that are executing production deployments.",
    "Confirm whether the affected runner is ephemeral, autoscaled, or a persistent host.",
    "Verify that the host is approved for production workloads.",
    "Check whether any job completed deployment steps before becoming unavailable.",
    "Do not disable security controls or expose runner registration tokens.",
    "Use approved administrative access and change procedures.",
    "Avoid printing secrets from runner configuration files or workflow environments.",
  ],

  evidenceCollection: [
    "Incident start time and last known successful job.",
    "Repository, organization, workflow run ID, job name, and commit SHA.",
    "Runner name, runner group, labels, and online/offline status.",
    "Runner type: GitHub-hosted or self-hosted.",
    "Host uptime, CPU, memory, disk usage, and service status for self-hosted runners.",
    "Runner diagnostic logs and service logs, with secrets redacted.",
    "Network connectivity and DNS resolution results.",
    "Proxy, firewall, DNS, and outbound TLS changes.",
    "Recent host reboots, operating system updates, or infrastructure changes.",
    "Runner registration, configuration, and service startup errors.",
    "Workflow runs waiting for capacity and the labels they require.",
    "Autoscaling controller and cloud instance status, if applicable.",
    "Recent changes to runner groups, access policies, labels, or workflow YAML.",
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the affected workflow and queued job",
      objective:
        "Establish whether the problem is a runner outage or another scheduling restriction.",
      commands: [
        "gh run list --repo OWNER/REPO --limit 20",
        "gh run view RUN_ID --repo OWNER/REPO",
        "gh run view RUN_ID --repo OWNER/REPO --json status,conclusion,jobs",
      ],
      interpretation: [
        "A job waiting for a runner indicates that scheduling or capacity should be investigated.",
        "A job waiting for approval may be blocked by environment protection rules instead.",
        "A job waiting because of a concurrency group may be blocked by another run.",
        "A completed job with a failed step is not the same as a runner being offline.",
        "The exact fields available from gh run view --json can vary by CLI version; inspect supported fields if a command rejects one.",
      ],
      nextActions: [
        "Record the run ID and affected job.",
        "Inspect the job's requested runner labels.",
        "Check the runner status in repository or organization settings.",
        "Determine whether the problem affects one runner or an entire pool.",
      ],
    },
    {
      step: 2,
      title: "Determine the runner type",
      objective:
        "Select the correct diagnostic path for GitHub-hosted or self-hosted runners.",
      commands: [
        "gh api repos/OWNER/REPO/actions/runners",
        "gh api orgs/ORG/actions/runners",
      ],
      interpretation: [
        "The repository endpoint lists repository-level self-hosted runners when the caller has sufficient access.",
        "The organization endpoint lists organization-level self-hosted runners when the caller has sufficient access.",
        "An authorization error may mean that the token lacks administrative permissions; it does not prove that no runners exist.",
        "These endpoints do not provide a general inventory of GitHub-hosted runner instances.",
      ],
      nextActions: [
        "For self-hosted runners, inspect runner inventory and host health.",
        "For GitHub-hosted runners, check GitHub service status and the job's runner configuration.",
        "If the runner inventory is inaccessible, request approved read access from the administrator.",
      ],
    },
    {
      step: 3,
      title: "Check runner status and labels",
      objective:
        "Verify that the intended runner is online and eligible for the job.",
      commands: [
        "gh api repos/OWNER/REPO/actions/runners --jq '.runners[] | {name, status, busy, labels: [.labels[].name]}'",
        "gh api orgs/ORG/actions/runners --jq '.runners[] | {name, status, busy, labels: [.labels[].name]}'",
      ],
      interpretation: [
        "A self-hosted runner with status offline cannot accept jobs through normal scheduling.",
        "A busy runner may be healthy but already executing another job.",
        "A runner can be online yet ineligible if the workflow requests labels it does not have.",
        "The organization endpoint requires appropriate organization-level access.",
        "Do not assume an API permission error means the runner is offline.",
      ],
      nextActions: [
        "Compare the workflow's runs-on labels with the runner's labels.",
        "Check whether enough eligible runners are available.",
        "Investigate the individual runner host if the status is offline.",
      ],
    },
    {
      step: 4,
      title: "Check the self-hosted host",
      objective:
        "Determine whether the host is down, overloaded, or unable to run the agent.",
      commands: [
        "hostname",
        "date -u",
        "uptime",
        "free -h",
        "df -h",
        "ps -ef | grep '[R]unner.Listener'",
      ],
      interpretation: [
        "Unexpected hostname or environment information may indicate access to the wrong machine.",
        "High load, memory pressure, or a full filesystem can prevent reliable runner operation.",
        "A missing Runner.Listener process suggests the agent may not be running, but service configuration must also be checked.",
        "A process listing alone does not establish whether the runner is registered or connected.",
      ],
      nextActions: [
        "Confirm the correct host and runner installation directory.",
        "Check service status and logs.",
        "Inspect disk, memory, CPU, and recent host events.",
        "Avoid deleting runner files or job workspaces before preserving relevant evidence.",
      ],
    },
    {
      step: 5,
      title: "Inspect the runner service",
      objective:
        "Determine whether the runner service is stopped, repeatedly restarting, or failing to initialize.",
      commands: [
        "systemctl list-units --type=service | grep -i runner",
        "systemctl status ACTIONS_RUNNER_SERVICE",
        "journalctl -u ACTIONS_RUNNER_SERVICE --since '30 minutes ago' --no-pager",
      ],
      interpretation: [
        "Replace ACTIONS_RUNNER_SERVICE with the actual service unit name.",
        "An inactive service suggests the runner process is not currently being supervised as expected.",
        "Restart loops may indicate configuration errors, permissions problems, or host resource pressure.",
        "Permission-denied messages may indicate ownership or service-account configuration issues.",
        "Some installations use different service managers or service names.",
      ],
      nextActions: [
        "Capture service logs and the exact failure reason.",
        "Check recent service and operating system changes.",
        "Correct the underlying issue before restarting the service.",
        "Restart only the affected service after confirming no critical job is running.",
      ],
    },
    {
      step: 6,
      title: "Inspect runner diagnostic logs",
      objective:
        "Find connection errors, configuration problems, and agent startup failures.",
      commands: [
        "find ./_diag -maxdepth 1 -type f -name '*.log' -printf '%T@ %p\\n' | sort -nr | head",
        "grep -iE 'error|failed|offline|connect|timeout|permission' ./_diag/*.log | tail -n 100",
      ],
      interpretation: [
        "Run these commands from the actual runner installation directory.",
        "Recent connection failures may indicate network, proxy, DNS, or TLS problems.",
        "Configuration or permission errors may indicate a local installation issue.",
        "An empty result does not prove that the runner is healthy; logs may be elsewhere or rotated.",
        "Runner logs can contain sensitive operational details and must be sanitized before sharing.",
      ],
      nextActions: [
        "Match the log timestamps to the incident timeline.",
        "Correlate errors with host events and network changes.",
        "Preserve the relevant logs before cleanup or reinstallation.",
      ],
    },
    {
      step: 7,
      title: "Check DNS and outbound connectivity",
      objective:
        "Determine whether the runner can resolve and reach the required GitHub endpoints.",
      commands: [
        "getent hosts github.com",
        "curl -sS -o /dev/null -w 'HTTP %{http_code}\\n' --connect-timeout 10 https://github.com/",
        "curl -sS -o /dev/null -w 'HTTP %{http_code}\\n' --connect-timeout 10 https://api.github.com/",
      ],
      interpretation: [
        "DNS lookup failure suggests a resolver or network configuration issue.",
        "Connection timeout may indicate routing, firewall, proxy, or egress restrictions.",
        "An HTTP response confirms some connectivity to that endpoint but does not prove every runner service endpoint is reachable.",
        "A 401 or 403 from an API endpoint can still demonstrate network reachability; inspect the response in context.",
        "Runner communication may require additional GitHub domains and services beyond these examples.",
      ],
      nextActions: [
        "Check proxy variables, firewall rules, DNS changes, and outbound TLS inspection.",
        "Consult the official GitHub Actions network requirements for the runner type.",
        "Make only approved network changes.",
        "Retest the exact failing endpoint after the change.",
      ],
    },
    {
      step: 8,
      title: "Check registration and configuration",
      objective:
        "Identify an invalid runner configuration or a registration problem.",
      commands: [
        "systemctl status ACTIONS_RUNNER_SERVICE",
        "find . -maxdepth 2 -type f \\( -name 'config.sh' -o -name 'run.sh' \\) -print",
      ],
      interpretation: [
        "Run file checks from the known runner installation directory.",
        "A missing expected file may indicate an incorrect working directory or incomplete installation.",
        "A runner can lose connectivity without losing its registration.",
        "Do not assume that every offline runner needs re-registration.",
        "Registration tokens are sensitive and must never be copied into incident logs.",
      ],
      nextActions: [
        "Review the configuration and service startup logs.",
        "Verify repository or organization registration scope.",
        "Use the approved registration procedure only if evidence indicates registration is invalid.",
        "Avoid removing a healthy runner registration while investigating a different failure.",
      ],
    },
    {
      step: 9,
      title: "Check runner labels, groups, and access policies",
      objective:
        "Determine whether the workflow is requesting an unavailable or unauthorized runner.",
      commands: [
        "gh api repos/OWNER/REPO/actions/runners --jq '.runners[] | {name, status, labels: [.labels[].name]}'",
        "gh api orgs/ORG/actions/runner-groups",
      ],
      interpretation: [
        "A runner may be online but not match the labels requested by runs-on.",
        "Organization runner groups can restrict which repositories may use a runner.",
        "The runner-groups endpoint requires appropriate organization permissions.",
        "A policy restriction can block job scheduling even when the runner host is healthy.",
      ],
      nextActions: [
        "Compare runs-on labels with the available runner labels.",
        "Verify runner-group repository access.",
        "Change labels or group access only through the approved review process.",
        "Do not route production secrets to an untrusted or unapproved runner.",
      ],
    },
    {
      step: 10,
      title: "Investigate autoscaling and cloud infrastructure",
      objective:
        "Determine whether ephemeral runner instances are failing to launch or register.",
      commands: [
        "kubectl get pods -n RUNNER_NAMESPACE",
        "kubectl get events -n RUNNER_NAMESPACE --sort-by=.lastTimestamp",
        "kubectl describe pod RUNNER_POD -n RUNNER_NAMESPACE",
      ],
      interpretation: [
        "Use these commands only when the runner platform is Kubernetes-based.",
        "Pending pods may indicate insufficient cluster capacity or scheduling constraints.",
        "Image pull failures may prevent runner controller or runner pods from starting.",
        "Cloud instance launch failures require checking the relevant cloud provider's instance and autoscaling events.",
        "These commands do not apply to every self-hosted runner architecture.",
      ],
      nextActions: [
        "Check autoscaler/controller logs and cloud events.",
        "Verify capacity, quotas, service accounts, image availability, and scheduling constraints.",
        "Correct the underlying infrastructure issue before scaling further.",
        "Avoid repeatedly creating instances when registration or networking is the actual problem.",
      ],
    },
    {
      step: 11,
      title: "Apply the correction and validate recovery",
      objective:
        "Restore runner availability safely and verify that production jobs can execute.",
      commands: [
        "systemctl status ACTIONS_RUNNER_SERVICE",
        "gh api repos/OWNER/REPO/actions/runners --jq '.runners[] | {name, status, busy}'",
        "gh run list --repo OWNER/REPO --limit 10",
      ],
      interpretation: [
        "A healthy service is useful evidence but does not alone prove that GitHub sees the runner as online.",
        "Verify runner status and job scheduling after a recovery action.",
        "Check whether the workflow requires a particular label or group.",
        "Confirm the production deployment's actual state before retrying.",
      ],
      nextActions: [
        "Restart the affected runner service only when safe and approved.",
        "Restore or replace a failed host using the standard provisioning procedure.",
        "Run a minimal non-production test job when feasible.",
        "Resume production workloads gradually and verify their results.",
      ],
    },
  ],

  rootCauseMatrix: [
    {
      symptom: "Runner host is unreachable",
      possibleCause: "VM shutdown, host crash, infrastructure failure, or network outage.",
      verification: [
        "Check cloud instance state or virtualization console.",
        "Check host monitoring and recent infrastructure events.",
        "Compare the host outage time with the runner offline time.",
      ],
      fix: [
        "Restore the host through the approved infrastructure process.",
        "If the host is unrecoverable, provision a replacement using the standard runner setup.",
        "Validate registration and job execution after recovery.",
      ],
    },
    {
      symptom: "Runner.Listener process is absent",
      possibleCause: "Runner service stopped, crashed, or failed to start.",
      verification: [
        "Inspect service status and recent journal entries.",
        "Inspect the runner's diagnostic logs.",
        "Check host resource pressure and filesystem capacity.",
      ],
      fix: [
        "Correct the service startup or resource problem.",
        "Restart the affected service after checking that no critical job is active.",
        "Verify that the runner reconnects and becomes online.",
      ],
    },
    {
      symptom: "Runner process exists but GitHub reports Offline",
      possibleCause: "Network connectivity issue, stalled agent, proxy failure, or service communication problem.",
      verification: [
        "Inspect runner diagnostic logs around the failure time.",
        "Check DNS, outbound connectivity, proxy, and TLS configuration.",
        "Compare with other runners using the same network.",
      ],
      fix: [
        "Restore the required outbound connectivity.",
        "Correct the proxy or DNS configuration.",
        "Restart the agent only after evidence collection and safety checks.",
      ],
    },
    {
      symptom: "Runner is online but job stays queued",
      possibleCause: "Label mismatch, runner-group restrictions, unavailable capacity, or scheduling restrictions.",
      verification: [
        "Compare runs-on labels with runner labels.",
        "Check runner-group repository access.",
        "Inspect job status, concurrency, and environment approval requirements.",
      ],
      fix: [
        "Correct the approved label or access configuration.",
        "Restore capacity when all eligible runners are busy.",
        "Resolve the actual scheduling restriction rather than reinstalling the runner.",
      ],
    },
    {
      symptom: "Runner repeatedly restarts",
      possibleCause: "Configuration failure, resource exhaustion, permissions issue, or host-level instability.",
      verification: [
        "Inspect service logs and runner diagnostic logs.",
        "Check memory, CPU, disk space, and host events.",
        "Review recent service or operating system changes.",
      ],
      fix: [
        "Correct the underlying configuration or resource issue.",
        "Restore adequate disk and memory capacity.",
        "Validate service stability before accepting production workloads.",
      ],
    },
    {
      symptom: "Ephemeral runners do not appear online",
      possibleCause: "Autoscaling, provisioning, registration, or bootstrap failure.",
      verification: [
        "Inspect autoscaler and controller logs.",
        "Inspect cloud instance events or Kubernetes events.",
        "Check image availability, network access, and registration setup.",
      ],
      fix: [
        "Correct the provisioning or bootstrap failure.",
        "Confirm the replacement runner registers and matches the required labels.",
        "Avoid creating unlimited replacement instances during an ongoing failure.",
      ],
    },
    {
      symptom: "Runner cannot reach GitHub endpoints",
      possibleCause: "DNS, firewall, proxy, routing, or outbound TLS problem.",
      verification: [
        "Test DNS resolution and HTTPS connectivity.",
        "Inspect network and proxy configuration.",
        "Compare affected and healthy hosts on the same network.",
      ],
      fix: [
        "Restore the required outbound connectivity.",
        "Apply approved firewall or proxy changes.",
        "Validate the complete required endpoint set against official documentation.",
      ],
    },
    {
      symptom: "Runner registration or authentication errors appear",
      possibleCause: "Invalid configuration, removed registration, or incorrect setup procedure.",
      verification: [
        "Inspect configuration and startup logs.",
        "Confirm the intended repository or organization scope.",
        "Check whether the runner was intentionally removed or replaced.",
      ],
      fix: [
        "Use the official registration procedure if re-registration is proven necessary.",
        "Keep registration tokens out of logs and source control.",
        "Verify online status after registration.",
      ],
    },
    {
      symptom: "Only one repository cannot use the runner",
      possibleCause: "Repository access restriction or runner-group policy.",
      verification: [
        "Inspect runner-group access settings.",
        "Check repository permissions and organization policy.",
        "Compare the affected repository with one that can use the runner.",
      ],
      fix: [
        "Apply the approved runner-group access change.",
        "Retest with a minimal workflow.",
        "Preserve production isolation and least privilege.",
      ],
    },
  ],

  recoveryProcedure: [
    "1. Assign an incident owner and determine business and deployment impact.",
    "2. Confirm the affected repository, workflow, runner group, labels, and runner type.",
    "3. Capture runner status, host health, logs, and relevant timestamps.",
    "4. Determine whether the issue is host availability, service health, connectivity, registration, capacity, or scheduling.",
    "5. Preserve logs before restarting, deregistering, or replacing a runner.",
    "6. Correct the proven cause using the approved operational procedure.",
    "7. Restart only the affected service when safe and approved.",
    "8. If the host is irrecoverable, replace it using the standard provisioning process.",
    "9. Verify that GitHub reports the runner as online and that labels and access policies are correct.",
    "10. Run a minimal validation job before returning the runner to critical production workloads.",
    "11. Confirm whether previous deployment steps already completed before rerunning a production job.",
    "12. Resume queued workloads gradually and verify successful completion.",
    "13. Reconcile partial deployments, failed status updates, and delayed jobs.",
    "14. Record root cause, recovery time, evidence, and preventive actions.",
  ],

  githubHostedRunnerTroubleshooting: [
    "Do not attempt to SSH into or restart the underlying GitHub-hosted VM; the infrastructure is managed by GitHub.",
    "Inspect the queued job, workflow YAML, runner type, and requested runs-on labels.",
    "Check GitHub service status for relevant Actions incidents.",
    "Check whether the workflow is waiting for environment approval or a concurrency slot.",
    "Inspect job logs after a runner becomes available.",
    "Verify that the workflow uses a supported runner image and compatible actions.",
    "If a specific runner image or platform is unavailable, assess whether an approved alternative is suitable.",
    "Do not switch to an untrusted self-hosted runner merely to bypass a hosted-runner issue.",
    "If the issue appears to be on GitHub's infrastructure, collect timestamps and run IDs for escalation.",
  ],

  selfHostedRunnerTroubleshooting: [
    "Check whether the host is running and reachable.",
    "Check the runner service and Runner.Listener process.",
    "Inspect the _diag directory and operating system service logs.",
    "Check CPU, memory, disk space, filesystem permissions, and host uptime.",
    "Check DNS, outbound HTTPS, proxy, firewall, and TLS connectivity.",
    "Inspect runner labels, runner-group access, and repository eligibility.",
    "Check registration and service configuration without exposing registration tokens.",
    "For autoscaled runners, inspect controller, bootstrap, cloud, or Kubernetes events.",
    "Confirm that persistent runner workspaces do not contain unsafe leftovers from previous jobs.",
    "Keep runner software updated using the organization's approved maintenance process.",
    "Use ephemeral runners for appropriate workloads when isolation and operational design support them.",
    "Do not run untrusted pull-request code on a privileged production runner without appropriate isolation.",
  ],

  networkAndSecurityChecks: [
    "Review the official GitHub Actions network requirements for the relevant runner type.",
    "Check DNS resolution for required GitHub endpoints.",
    "Verify outbound HTTPS connectivity through the approved network path.",
    "Inspect proxy configuration and any recent proxy or firewall changes.",
    "Check system time and certificate trust if TLS failures occur.",
    "Avoid disabling TLS verification as a workaround.",
    "Do not expose credentials or registration tokens in shell history or diagnostic logs.",
    "Restrict runner-group access to trusted repositories.",
    "Use least privilege for runner service accounts and cloud credentials.",
    "Keep production secrets away from untrusted pull-request workflows.",
    "Review host hardening and runner isolation before restoring production workloads.",
  ],

  prevention: [
    "Monitor runner online status and queued-job duration.",
    "Alert when all eligible runners are offline or a runner group loses capacity.",
    "Maintain enough capacity for critical workloads without creating uncontrolled autoscaling.",
    "Use approved autoscaling and replacement procedures for ephemeral runners.",
    "Track host health, disk, CPU, memory, and service restarts.",
    "Keep runner software and host images maintained.",
    "Validate runner labels and access policies when workflows change.",
    "Use concurrency controls to avoid unnecessary overlapping deployment runs.",
    "Document runner ownership, escalation paths, and recovery steps.",
    "Use ephemeral runners where suitable to improve isolation and reduce workspace contamination.",
    "Test runner replacement and recovery procedures periodically.",
    "Separate critical production workloads from untrusted or non-production jobs.",
    "Keep a known-good fallback plan that preserves production security requirements.",
  ],

  monitoringAndAlerting: [
    "Track online and offline runner counts by organization, group, and label.",
    "Alert when a critical runner group has no eligible online capacity.",
    "Track queued-job duration and the oldest waiting job.",
    "Monitor runner service restarts and host resource pressure.",
    "Monitor DNS and outbound connectivity for self-hosted runner hosts.",
    "Track autoscaler errors, failed instance launches, and failed runner registrations.",
    "Monitor repeated workflow queueing and deployment delays.",
    "Correlate alerts with GitHub service status and infrastructure changes.",
    "Record workflow run IDs and UTC timestamps in incident evidence.",
    "Do not send registration tokens, secrets, or sensitive environment values to monitoring systems.",
  ],

  incidentReportTemplate: [
    "Incident ID and severity:",
    "Incident owner:",
    "Start time and recovery time in UTC:",
    "Affected organization and repositories:",
    "Affected workflow runs and jobs:",
    "Runner name, type, group, and labels:",
    "Business impact and deployment impact:",
    "Last known successful run:",
    "Runner status and host health evidence:",
    "Relevant service and diagnostic log findings:",
    "Network, DNS, proxy, or firewall findings:",
    "Scheduling, label, or access-policy findings:",
    "Confirmed root cause and supporting evidence:",
    "Immediate mitigation:",
    "Recovery and validation steps:",
    "Partial deployments or duplicate operations reconciled:",
    "Preventive actions, owners, and due dates:",
    "Lessons learned:",
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Inspect self-hosted runner status",
      objective:
        "Find offline runners and compare their labels with job requirements.",
      steps: [
        "Use an approved GitHub CLI identity with read access.",
        "Run gh api repos/OWNER/REPO/actions/runners.",
        "Inspect runner name, status, busy state, and labels.",
        "Compare the results with the workflow's runs-on declaration.",
        "Record the findings without sharing sensitive configuration.",
      ],
      expectedOutcome:
        "You can distinguish an offline runner from an online runner that does not match the requested labels.",
    },
    {
      title: "Lab 2 — Diagnose a stopped Linux runner service",
      objective:
        "Practice service and log diagnosis on a non-production self-hosted runner.",
      steps: [
        "Confirm the correct host and runner installation.",
        "Inspect the actual runner service unit.",
        "Review service status and recent journal entries.",
        "Inspect the runner's _diag logs.",
        "Determine whether the cause is service configuration, host resources, or connectivity.",
        "Restore the service through the approved process.",
      ],
      expectedOutcome:
        "You can identify the service failure and verify that the runner reconnects without reinstalling it unnecessarily.",
    },
    {
      title: "Lab 3 — Simulate network failure",
      objective:
        "Distinguish DNS failures from HTTPS connectivity failures.",
      steps: [
        "Use a non-production test host.",
        "Check DNS resolution for github.com.",
        "Test HTTPS connectivity to github.com and api.github.com.",
        "Review the result alongside runner diagnostic logs.",
        "Use a controlled network fault simulation if permitted.",
        "Restore connectivity and repeat the tests.",
      ],
      expectedOutcome:
        "You can identify whether the simulated failure occurs at DNS resolution or outbound connectivity.",
    },
    {
      title: "Lab 4 — Recover an autoscaled runner",
      objective:
        "Trace an ephemeral runner failure from provisioning through registration.",
      steps: [
        "Inspect the runner controller or autoscaler logs.",
        "Inspect cloud instance or Kubernetes events.",
        "Check image availability, capacity, networking, and bootstrap errors.",
        "Correct the proven issue in a test environment.",
        "Verify that the replacement runner registers with the expected labels.",
        "Execute a minimal validation job.",
      ],
      expectedOutcome:
        "You can distinguish provisioning failure from runner registration and scheduling problems.",
    },
  ],

  interviewQuestions: [
    {
      question: "What does an offline GitHub Actions runner mean?",
      answer:
        "It means the runner is not currently available to accept jobs through normal scheduling. For self-hosted runners, investigate the host, service, connectivity, and registration. GitHub-hosted infrastructure is managed by GitHub.",
    },
    {
      question: "Does every queued job mean the runner is offline?",
      answer:
        "No. Label mismatches, runner-group restrictions, capacity, concurrency, and environment approvals can also prevent a job from starting.",
    },
    {
      question: "How do you check self-hosted runner status?",
      answer:
        "Use the repository or organization runners API with appropriate access, or inspect the runner settings in GitHub. Then compare status, busy state, labels, and the job's requirements.",
    },
    {
      question: "How do you troubleshoot a runner service failure?",
      answer:
        "Inspect the actual service unit, service logs, runner diagnostic logs, host resources, and recent configuration changes. Correct the cause before restarting the service.",
    },
    {
      question: "How do you distinguish a network problem from a stopped service?",
      answer:
        "Check process and service status, then test DNS and outbound HTTPS connectivity. Correlate those results with the runner's diagnostic logs.",
    },
    {
      question: "Why can a runner be online but unable to execute a job?",
      answer:
        "The job may request different labels, the runner may be busy, the runner group may not allow the repository, or another scheduling restriction may apply.",
    },
    {
      question: "How do you troubleshoot ephemeral runner failures?",
      answer:
        "Trace the process from autoscaler decision through host or pod creation, bootstrap, registration, and job assignment. Inspect controller logs and infrastructure events.",
    },
    {
      question: "Can you restart a GitHub-hosted runner?",
      answer:
        "You do not manage the underlying GitHub-hosted VM. Investigate the workflow, runner configuration, job queue, service status, and GitHub service status instead.",
    },
    {
      question: "What should you check before rerunning a production deployment?",
      answer:
        "Determine whether earlier steps already changed production resources. Verify the actual deployment state and resume or rerun only through the approved recovery procedure.",
    },
    {
      question: "How do you prevent recurring runner outages?",
      answer:
        "Monitor runner availability, queue duration, host health, and autoscaling; maintain capacity, use approved replacement procedures, validate labels, and document incident recovery.",
    },
  ],

  references: [
    {
      title: "Monitoring the status of your self-hosted runners",
      url: "https://docs.github.com/en/actions/hosting-your-own-runners/monitoring-and-troubleshooting-self-hosted-runners",
    },
    {
      title: "Self-hosted runners",
      url: "https://docs.github.com/en/actions/hosting-your-own-runners",
    },
    {
      title: "GitHub Actions runner groups",
      url: "https://docs.github.com/en/actions/hosting-your-own-runners/managing-access-to-self-hosted-runners-using-groups",
    },
    {
      title: "GitHub Actions workflow syntax",
      url: "https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions",
    },
    {
      title: "GitHub CLI — gh run",
      url: "https://cli.github.com/manual/gh_run",
    },
    {
      title: "GitHub status",
      url: "https://www.githubstatus.com/",
    },
  ],
};

