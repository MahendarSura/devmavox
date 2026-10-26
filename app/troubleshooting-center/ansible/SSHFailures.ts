
export interface SSHDiagnostic {
  step: number;
  title: string;
  purpose: string;
  commands: string[];
  expectedOutput: string;
  interpretation: string[];
  nextAction: string;
}

export interface SSHRootCause {
  cause: string;
  symptoms: string[];
  evidence: string[];
  fix: string[];
  verification: string[];
}

export const sshFailuresGuide = {
  title: "Ansible SSH Connection Failures",
  slug: "ssh-failures",
  category: "Ansible",
  difficulty: "Intermediate to Advanced",
  severity: "High",
  estimatedTime: "45–75 minutes",

  summary:
    "Troubleshoot Ansible SSH connectivity failures across Linux servers, cloud VMs, private subnets, bastion hosts and CI/CD pipelines. Diagnose timeouts, DNS failures, authentication errors, incorrect usernames, private-key permissions, SSH host-key verification failures, firewall rules, routing issues and partial production deployments.",

  learningObjectives: [
    "Understand how Ansible establishes SSH connections to managed Linux hosts.",
    "Differentiate DNS, routing, timeout, authentication and remote execution failures.",
    "Investigate Permission denied (publickey), UNREACHABLE and connection timeout errors.",
    "Verify SSH usernames, key selection, file permissions and SSH configuration.",
    "Troubleshoot private-subnet access through a bastion or jump host.",
    "Investigate CI/CD SSH failures that do not reproduce locally.",
    "Determine whether a failed connection happened before or after production changes.",
    "Recover safely and prevent recurring SSH failures.",
  ],

  incidentScenario: {
    title: "Production deployment suddenly cannot connect to servers",

    timeline: [
      {
        time: "10:00",
        event:
          "A deployment pipeline completes the application build and publishes the release artifact.",
      },
      {
        time: "10:03",
        event:
          "The Ansible deployment stage starts using the production inventory and SSH credentials.",
      },
      {
        time: "10:04",
        event:
          "Ansible reports UNREACHABLE for several hosts. Some hosts connect successfully while others time out.",
      },
      {
        time: "10:06",
        event:
          "The deployment stops or becomes partially complete, depending on the rollout strategy and which hosts were reached.",
      },
      {
        time: "10:08",
        event:
          "The engineer checks connectivity, credentials, target scope and completed tasks before selecting a recovery action.",
      },
    ],

    symptoms: [
      "UNREACHABLE! with a connection timeout.",
      "Permission denied (publickey).",
      "Could not resolve hostname.",
      "Connection refused on TCP port 22.",
      "Host key verification failed.",
      "SSH works from a laptop but fails in the CI runner.",
      "A bastion host is reachable but private servers are not.",
      "Some production hosts update while other hosts remain unchanged.",
    ],

    firstPrinciple:
      "A connection failure is not automatically an Ansible playbook bug. Identify whether the failure occurs during name resolution, network connectivity, SSH negotiation, host verification, authentication or remote command execution.",

    initialQuestions: [
      "Which exact pipeline run, commit and environment failed?",
      "Is the failure affecting one host, a subnet or the entire fleet?",
      "Can the controller resolve the hostname and reach the SSH port?",
      "Is the correct SSH username and identity being selected?",
      "Does the target require a bastion or VPN?",
      "Did the SSH key, runner image, firewall or server configuration change recently?",
      "Did any hosts complete deployment before the failure?",
      "Is the application currently healthy?",
    ],
  },

  impactAndSeverity: {
    title: "Assess impact before troubleshooting",

    checks: [
      {
        question: "Which environment is affected?",
        action:
          "Confirm the inventory, target environment, pipeline run, repository, commit SHA and intended hosts.",
      },
      {
        question: "Is the failure isolated or widespread?",
        action:
          "Compare failed hosts by subnet, availability zone, operating system, security group and SSH route.",
      },
      {
        question: "Did deployment make changes?",
        action:
          "Inspect the original task log and per-host recap. A connection failure on one host does not prove that all other hosts remained unchanged.",
      },
      {
        question: "Are users affected?",
        action:
          "Check application health, load balancer target status, error rates and the current deployed version.",
      },
      {
        question: "Is access blocked by a security control?",
        action:
          "Check authorized firewall, network ACL, security group, VPN and bastion configuration with the relevant infrastructure owner.",
      },
    ],

    severityGuide: [
      {
        severity: "Critical",
        condition:
          "An active production outage or a partial deployment has caused significant service degradation.",
        response:
          "Activate the incident process, pause rollout expansion and prioritize service restoration.",
      },
      {
        severity: "High",
        condition:
          "A production deployment is blocked across critical hosts or server versions are inconsistent.",
        response:
          "Stop unsafe retries, establish host-level state and restore approved access.",
      },
      {
        severity: "Medium",
        condition:
          "A staging deployment is blocked by SSH access or authentication failures.",
        response:
          "Investigate the access path and validate the correction before production use.",
      },
      {
        severity: "Low",
        condition:
          "A development host has a reproducible SSH configuration problem.",
        response:
          "Correct the configuration and add automated validation.",
      },
    ],
  },

  safetyChecks: {
    title: "Production safety checks",

    checks: [
      {
        check: "Confirm the execution context",
        commands: [
          "pwd",
          "git rev-parse --show-toplevel",
          "git rev-parse HEAD",
          "git status --short",
          "ansible --version",
        ],
        reason:
          "Ensures that the intended repository, commit and Ansible runtime are being investigated.",
      },
      {
        check: "Confirm the target inventory",
        commands: [
          "ansible-inventory -i inventory/production.ini --graph",
          "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
        ],
        reason:
          "Prevents testing or deploying against an unintended group or environment.",
      },
      {
        check: "Protect credentials",
        commands: [
          "ssh -V",
          "ssh-add -l",
        ],
        reason:
          "Checks the SSH client version and, where an agent is available, lists loaded key fingerprints. It does not print private key contents.",
      },
      {
        check: "Confirm authorization",
        commands: [
          "git diff --check",
        ],
        reason:
          "Performs a local whitespace check; production approval must be verified separately in the deployment platform.",
      },
    ],

    rules: [
      "Never paste private keys, passwords, access tokens or unredacted secrets into incident reports.",
      "Do not disable StrictHostKeyChecking globally to bypass a host-key error.",
      "Do not open SSH to 0.0.0.0/0 as a quick fix.",
      "Do not regenerate or replace a production SSH key before checking which identity is actually being used.",
      "Do not restart SSH or change firewall rules on production without authorization and an access-preserving plan.",
      "Use read-only diagnostics before making changes.",
      "Check whether previous tasks changed production hosts before rerunning a playbook.",
    ],
  },

  evidenceCollection: {
    title: "Evidence to collect before changing anything",

    evidence: [
      {
        item: "Pipeline evidence",
        collect: [
          "Pipeline run ID and job name",
          "Failure timestamp and timezone",
          "Commit SHA and artifact version",
          "Exact Ansible command",
          "Target inventory and relevant non-secret variables",
          "Full relevant error and exit code",
        ],
        why:
          "Links the failure to the actual deployment attempt and its target scope.",
      },
      {
        item: "Connection evidence",
        collect: [
          "Target hostname and resolved address",
          "SSH port",
          "SSH username",
          "Selected identity-file path or key fingerprint",
          "Whether a bastion or proxy is required",
          "Whether the error is timeout, refused connection or authentication failure",
        ],
        why:
          "Separates network reachability from SSH authentication and remote execution.",
      },
      {
        item: "Infrastructure evidence",
        collect: [
          "Recent security group or firewall changes",
          "Route table and network ACL changes",
          "VPN or bastion availability",
          "Server-side SSH authentication logs where authorized",
          "Recent server rebuilds or host-key rotations",
        ],
        why:
          "Helps establish whether the problem is caused by infrastructure, credentials or a changed server identity.",
      },
      {
        item: "Production state",
        collect: [
          "Per-host Ansible recap",
          "Hosts that changed, failed or became unreachable",
          "Application versions on affected hosts",
          "Service health and load balancer target status",
        ],
        why:
          "Determines whether a retry is safe and whether rollback or forward recovery is needed.",
      },
    ],
  },

  diagnostics: [
    {
      step: 1,
      title: "Confirm the exact target and resolved hosts",
      purpose:
        "Ensure the investigation is testing the same host selected by the failed pipeline.",

      commands: [
        "ansible-inventory -i inventory/production.ini --graph",
        "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
        "getent hosts app01.example.internal",
      ],

      expectedOutput:
        "The inventory commands show the intended production group and target hosts. getent may return the hostname's resolved IP address.",

      interpretation: [
        "If no hosts are listed, investigate inventory selection and the play's hosts pattern before SSH.",
        "If getent returns no address, check DNS configuration, hostname spelling and the correct private DNS view.",
        "A resolved IP address does not prove that the network route or SSH service is reachable.",
        "Run DNS checks from the actual Ansible controller or CI runner because local DNS results may differ.",
      ],

      nextAction:
        "Record the intended hostname, resolved address, SSH port and inventory group.",
    },

    {
      step: 2,
      title: "Check network reachability to SSH",
      purpose:
        "Determine whether the controller can establish a TCP connection to the target SSH port.",

      commands: [
        "nc -vz -w 5 app01.example.internal 22",
        "ssh -o ConnectTimeout=5 -o BatchMode=yes deployer@app01.example.internal true",
      ],

      expectedOutput:
        "A successful TCP test commonly reports that the connection succeeded. The SSH command exits successfully only if the connection, authentication and remote command all work.",

      interpretation: [
        "Connection timed out often indicates a routing, firewall, security group, network ACL or unreachable target issue, but the message alone does not prove which one.",
        "Connection refused usually means the address is reachable but the port is not accepting connections, or an intermediate device actively rejects it.",
        "Permission denied indicates the connection reached the SSH authentication stage but the offered authentication was not accepted.",
        "If nc is unavailable, use an approved equivalent TCP connectivity test.",
        "A successful TCP test does not prove that the SSH username or key is correct.",
      ],

      nextAction:
        "If TCP fails, investigate the approved network path. If TCP succeeds, move to SSH negotiation and authentication.",
    },

    {
      step: 3,
      title: "Inspect SSH configuration safely",
      purpose:
        "See which host, port, username, identity and proxy settings the SSH client resolves.",

      commands: [
        "ssh -G app01.example.internal",
        "ssh -V",
      ],

      expectedOutput:
        "ssh -G prints effective client configuration, while ssh -V displays the SSH client version.",

      interpretation: [
        "Inspect user, hostname, port, identityfile, proxyjump and stricthostkeychecking.",
        "An unexpected username or port can cause failures even when the server is healthy.",
        "SSH configuration can include multiple files and host-specific rules.",
        "Review the output before sharing it because it may disclose internal hostnames, usernames or paths.",
      ],

      nextAction:
        "Compare the resolved SSH settings with the approved deployment configuration.",
    },

    {
      step: 4,
      title: "Verify the selected identity",
      purpose:
        "Identify whether the correct SSH key is available to the current user or CI job.",

      commands: [
        "ssh-add -l",
        "ssh -o IdentitiesOnly=yes -o BatchMode=yes -o ConnectTimeout=5 -i ~/.ssh/deploy_key deployer@app01.example.internal true",
      ],

      expectedOutput:
        "ssh-add -l lists loaded key fingerprints if an agent is available. A successful SSH command returns exit code 0.",

      interpretation: [
        "An empty agent does not prove that no usable key exists; SSH can use an identity file directly.",
        "The explicit -i option tests the specified identity. Replace the path and username with the authorized values.",
        "IdentitiesOnly=yes limits authentication to configured identities for this connection, which helps diagnose the wrong-key problem.",
        "Permission denied can also result from a wrong username, a missing authorized_keys entry, account restrictions or server policy.",
      ],

      nextAction:
        "Confirm the intended public key is authorized for the correct account using the approved access-management process.",
    },

    {
      step: 5,
      title: "Check private-key file permissions",
      purpose:
        "Detect key files that are missing or have permissions rejected by the SSH client.",

      commands: [
        "ls -l ~/.ssh",
        "stat -c '%a %U %n' ~/.ssh/deploy_key",
      ],

      expectedOutput:
        "The output shows the key file's permissions, owner and path on Linux.",

      interpretation: [
        "A private key should not be readable by unauthorized users.",
        "A common private-key permission setting is 600, but ownership and the surrounding directory permissions also matter.",
        "The path must refer to the key available to the user running Ansible, which may differ from the interactive login user.",
        "On Windows or non-Linux systems, use the appropriate file-permission inspection tool.",
      ],

      nextAction:
        "If evidence confirms incorrect local key permissions, correct them according to organizational policy. Do not change permissions blindly on shared credential files.",
    },

    {
      step: 6,
      title: "Run focused SSH diagnostics",
      purpose:
        "Find the exact stage where SSH fails.",

      commands: [
        "ssh -vvv -o ConnectTimeout=5 -o BatchMode=yes deployer@app01.example.internal true",
      ],

      expectedOutput:
        "Verbose output shows name resolution, connection establishment, host-key checks, offered identities, authentication and remote command execution.",

      interpretation: [
        "No route or timeout before SSH negotiation suggests a network path problem.",
        "A host-key verification failure means the server identity does not match the client's trusted host-key data.",
        "Offering a key followed by rejection suggests checking username, public-key authorization and server authentication policy.",
        "Successful authentication followed by command failure points to remote command restrictions, account policy or shell configuration.",
        "Verbose logs can disclose internal hostnames, usernames and paths. Store and share them only through approved channels.",
      ],

      nextAction:
        "Capture the smallest relevant section of the log and investigate the first failing stage.",
    },

    {
      step: 7,
      title: "Check host-key verification",
      purpose:
        "Investigate known_hosts mismatches without weakening server identity verification.",

      commands: [
        "ssh-keygen -F app01.example.internal -f ~/.ssh/known_hosts",
        "ssh-keygen -F 10.20.1.15 -f ~/.ssh/known_hosts",
      ],

      expectedOutput:
        "The command displays matching known_hosts entries if they exist.",

      interpretation: [
        "A mismatch may occur after a legitimate server rebuild or SSH host-key rotation.",
        "It may also indicate that the target IP or hostname now points to a different server.",
        "Never assume the mismatch is harmless; host-key checking helps prevent connecting to an impersonated host.",
        "If the host is accessed through multiple aliases, inspect the hostname and address entries relevant to the connection.",
      ],

      nextAction:
        "Verify the new host-key fingerprint through a trusted infrastructure channel. Update only the confirmed stale entry using the approved process.",
    },

    {
      step: 8,
      title: "Investigate bastion and private-subnet access",
      purpose:
        "Check whether Ansible must pass through a jump host to reach a private server.",

      commands: [
        "ssh -G app01.example.internal",
        "ssh -o ConnectTimeout=5 bastion-user@bastion.example.com true",
        "ssh -J bastion-user@bastion.example.com deployer@app01.example.internal true",
      ],

      expectedOutput:
        "The bastion test verifies access to the jump host. The ProxyJump test attempts the complete route to the private target.",

      interpretation: [
        "If the bastion works but the target does not, inspect the bastion-to-target route, destination port, security rules and target SSH service.",
        "If the bastion fails, investigate its DNS, access rules and credentials first.",
        "ProxyJump must be supported and configured correctly by the SSH client used in the deployment environment.",
        "Do not expose private hosts publicly to avoid configuring a bastion.",
      ],

      nextAction:
        "Confirm the approved network path and correct the narrowest failing hop.",
    },

    {
      step: 9,
      title: "Compare CI/CD and interactive environments",
      purpose:
        "Find differences between a successful laptop session and a failed automation runner.",

      commands: [
        "whoami",
        "pwd",
        "ssh -V",
        "ssh-add -l",
        "ssh -G app01.example.internal",
      ],

      expectedOutput:
        "The output identifies the current user, directory, SSH version, agent identities and resolved SSH configuration where available.",

      interpretation: [
        "The CI job may run under a different user with a different home directory and known_hosts file.",
        "The runner may not have the required SSH agent, private-key file or ProxyJump configuration.",
        "Environment variables and mounted credentials can differ from an interactive session.",
        "A successful local connection is not proof that the CI runner can reach the same network or use the same identity.",
      ],

      nextAction:
        "Correct the runner's approved credential injection, network access and SSH configuration without printing secret contents.",
    },

    {
      step: 10,
      title: "Test Ansible connectivity and inspect the recap",
      purpose:
        "Confirm the corrected connection works through Ansible and determine the state of the failed deployment.",

      commands: [
        "ansible -i inventory/production.ini app_servers -m ansible.builtin.ping",
        "ansible-playbook -i inventory/production.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
      ],

      expectedOutput:
        "Reachable hosts commonly return SUCCESS with pong. The other commands validate syntax and show intended targets.",

      interpretation: [
        "A successful Ansible ping checks Ansible remote execution, not merely ICMP reachability.",
        "Syntax validation does not prove SSH authentication or production task success.",
        "Review the original run's recap to establish which hosts changed before the connection failure.",
        "Check the application version and service health on all affected hosts before resuming.",
      ],

      nextAction:
        "Use a controlled canary or batch rollout only after the connection and current application state are understood.",
    },
  ] satisfies SSHDiagnostic[],

  rootCauses: [
    {
      cause: "DNS resolution failure",

      symptoms: [
        "Could not resolve hostname.",
        "The hostname resolves on one machine but not from the CI runner.",
      ],

      evidence: [
        "getent hosts returns no result from the Ansible controller.",
        "The inventory hostname differs from the approved DNS name.",
      ],

      fix: [
        "Correct the hostname or approved DNS configuration.",
        "Check private DNS access and resolver configuration from the controller.",
        "Do not hard-code an IP address unless the deployment design explicitly requires it.",
      ],

      verification: [
        "Resolve the hostname from the actual controller.",
        "Run the authorized TCP test against the intended destination.",
      ],
    },

    {
      cause: "Network timeout or firewall restriction",

      symptoms: [
        "SSH connection times out.",
        "Only a particular subnet or availability zone is affected.",
      ],

      evidence: [
        "TCP connectivity to port 22 fails from the controller.",
        "Recent security group, route, firewall or network ACL changes align with the incident.",
      ],

      fix: [
        "Confirm the route and source/destination security rules with the infrastructure owner.",
        "Allow only the approved source and destination path.",
        "Check whether a VPN, private route or bastion is required.",
      ],

      verification: [
        "Repeat the TCP test from the intended controller.",
        "Confirm SSH negotiation and authentication after network access is restored.",
      ],
    },

    {
      cause: "Incorrect username or rejected SSH key",

      symptoms: [
        "Permission denied (publickey).",
        "SSH reaches the server but authentication does not succeed.",
      ],

      evidence: [
        "Verbose output shows which identity was offered.",
        "The effective username or identity differs from the approved deployment configuration.",
      ],

      fix: [
        "Correct the username and selected identity.",
        "Verify the public key is authorized for the intended account.",
        "Confirm account restrictions and server authentication policy with the administrator.",
      ],

      verification: [
        "Run a focused SSH test with the approved identity.",
        "Run the Ansible connectivity test before restarting deployment.",
      ],
    },

    {
      cause: "Private-key permissions or key path is wrong",

      symptoms: [
        "SSH ignores a key or reports that its permissions are too open.",
        "The pipeline cannot find a key that exists on the engineer's workstation.",
      ],

      evidence: [
        "The key path is absent for the CI user.",
        "The key owner or permissions do not satisfy SSH client requirements.",
      ],

      fix: [
        "Use the approved credential-injection mechanism.",
        "Correct local key permissions and ownership where authorized.",
        "Keep private keys out of source control and build artifacts.",
      ],

      verification: [
        "Confirm the key is accessible to the actual pipeline user.",
        "Repeat the SSH test without printing or exposing the key contents.",
      ],
    },

    {
      cause: "Host-key verification failure",

      symptoms: [
        "Host key verification failed.",
        "SSH warns that the remote host identification has changed.",
      ],

      evidence: [
        "The known_hosts fingerprint differs from the host's independently verified fingerprint.",
        "A server rebuild, IP reassignment or host-key rotation occurred.",
      ],

      fix: [
        "Verify the new fingerprint through a trusted infrastructure source.",
        "Update the relevant known_hosts entry only after verification.",
        "Investigate possible host impersonation if the change is unexpected.",
      ],

      verification: [
        "Confirm SSH accepts the verified host key.",
        "Keep host-key verification enabled in production.",
      ],
    },

    {
      cause: "Bastion or jump-host route failure",

      symptoms: [
        "The bastion is reachable but private servers time out.",
        "The deployment works from an internal network but fails from an external runner.",
      ],

      evidence: [
        "The jump-host connection succeeds while the complete ProxyJump connection fails.",
        "The bastion cannot route to the target or the target does not allow the bastion as a source.",
      ],

      fix: [
        "Verify the approved bastion configuration and route.",
        "Correct the narrowest relevant network rule.",
        "Confirm the correct username, port and identity for each connection hop.",
      ],

      verification: [
        "Test bastion access and target access separately.",
        "Run Ansible connectivity from the actual deployment controller.",
      ],
    },

    {
      cause: "SSH service or server-side policy problem",

      symptoms: [
        "Connection refused.",
        "Authentication is rejected even when the intended identity is offered.",
      ],

      evidence: [
        "The server's SSH service is stopped or listening on a different port.",
        "Authorized server logs show authentication or account-policy rejection.",
      ],

      fix: [
        "Use an approved server-side access path to inspect SSH service status and logs.",
        "Correct the service or account configuration through change control.",
        "Preserve an existing administrative session and alternate access method before modifying SSH on a remote production server.",
      ],

      verification: [
        "Confirm the approved SSH port accepts connections.",
        "Validate the intended account can authenticate and execute the required remote command.",
      ],
    },

    {
      cause: "CI/CD credentials or environment drift",

      symptoms: [
        "The laptop can connect but the pipeline fails.",
        "The issue begins after a runner image, secret or deployment configuration change.",
      ],

      evidence: [
        "The CI user has a different home directory, SSH configuration or identity set.",
        "The agent has no required key or cannot access the approved network.",
      ],

      fix: [
        "Restore the approved secret injection and SSH configuration.",
        "Pin or validate the runner environment.",
        "Ensure private network access and ProxyJump settings match the deployment design.",
      ],

      verification: [
        "Test connectivity from the actual runner.",
        "Run the Ansible ping and target-list checks before production deployment.",
      ],
    },
  ] satisfies SSHRootCause[],

  recoveryWorkflow: {
    title: "Safe recovery after SSH failure",

    steps: [
      {
        step: 1,
        name: "Pause rollout expansion",
        details:
          "Stop automatic retries and additional deployment stages until the affected host state is known.",
      },
      {
        step: 2,
        name: "Preserve logs and execution details",
        details:
          "Record the exact command, target host, username, selected identity, connection stage and pipeline run ID. Redact sensitive data.",
      },
      {
        step: 3,
        name: "Determine actual production state",
        details:
          "Inspect per-host results, application versions, service health and completed changes.",
      },
      {
        step: 4,
        name: "Correct the proven failure",
        details:
          "Fix DNS, network path, authentication, host-key verification, bastion configuration or server-side policy based on evidence.",
      },
      {
        step: 5,
        name: "Validate access",
        details:
          "Test the TCP path, focused SSH command and Ansible connectivity from the actual deployment controller.",
      },
      {
        step: 6,
        name: "Resume in a controlled way",
        details:
          "Use the approved canary or batch strategy and verify the target list before expanding.",
      },
      {
        step: 7,
        name: "Verify service health",
        details:
          "Confirm application versions, endpoints, load balancer health and error rates on all relevant hosts.",
      },
      {
        step: 8,
        name: "Document and prevent recurrence",
        details:
          "Record the root cause, impact, recovery evidence and preventive actions.",
      },
    ],

    rollbackGuidance: [
      "An SSH failure by itself does not mean application rollback is necessary.",
      "If the application is healthy and no incompatible partial changes occurred, restoring SSH access may be sufficient.",
      "If some hosts deployed and others did not, assess version consistency and user impact before choosing forward recovery or rollback.",
      "Use the approved application rollback process and verify database or persistent-data compatibility.",
      "Never assume rerunning Ansible reverses tasks that already completed.",
    ],
  },

  productionPatterns: [
    {
      title: "Use explicit SSH configuration for a private host",

      example: `Host app01.example.internal
  HostName 10.20.1.15
  User deployer
  Port 22
  IdentityFile ~/.ssh/deploy_key
  IdentitiesOnly yes
  ProxyJump bastion-user@bastion.example.com
  StrictHostKeyChecking yes`,

      explanation:
        "This example defines an explicit user, identity, destination and jump host while preserving host-key verification.",

      warning:
        "Replace example values with approved configuration. Confirm the host-key trust process and credential paths before use.",
    },

    {
      title: "Use a controlled rollout",

      example: `- name: Deploy application
  hosts: app_servers
  serial: 1
  tasks:
    - name: Verify application health
      ansible.builtin.uri:
        url: "http://127.0.0.1:8080/health"
        status_code: 200
      register: health_result
      retries: 5
      delay: 3
      until: health_result.status == 200`,

      explanation:
        "A small batch limits the number of hosts affected before health is checked.",

      warning:
        "The example assumes the health endpoint is valid on the managed host. Select batch size and failure behavior according to the application's availability requirements.",
    },

    {
      title: "Fail the pipeline if no deployment hosts are selected",

      example: `- name: Validate deployment inventory
  hosts: app_servers
  gather_facts: false
  tasks:
    - name: Assert that the inventory group is populated
      ansible.builtin.assert:
        that:
          - groups['app_servers'] | default([]) | length > 0
        fail_msg: "No app_servers hosts are defined."`,

      explanation:
        "This guard detects an empty inventory group before the deployment tasks begin.",

      warning:
        "It does not replace the resolved --list-hosts check and does not prove that hosts are reachable. Validate the final target set in CI.",
    },
  ],

  prevention: {
    title: "Prevent recurring SSH failures",

    ciChecks: [
      {
        check: "Inventory validation",
        action:
          "Verify the intended environment group and host list before deployment.",
      },
      {
        check: "Connectivity validation",
        action:
          "Test SSH connectivity from the same network and runner used by the deployment job.",
      },
      {
        check: "Credential management",
        action:
          "Use approved secret stores or protected CI credentials and avoid long-lived unmanaged private keys.",
      },
      {
        check: "Host-key trust",
        action:
          "Provision trusted host keys through an approved process and keep verification enabled.",
      },
      {
        check: "Bastion validation",
        action:
          "Test the complete jump-host path and ensure only approved network routes are permitted.",
      },
      {
        check: "Controlled rollout",
        action:
          "Deploy in canary or small batches with health checks and explicit production approvals.",
      },
      {
        check: "Reproducible runner",
        action:
          "Pin or validate SSH client versions, runner images, configuration and credential injection.",
      },
      {
        check: "Recovery readiness",
        action:
          "Document how to recover access without locking out administrators and how to handle partial deployments.",
      },
    ],

    monitoring: [
      "Alert on repeated SSH failures and rising unreachable-host counts.",
      "Record deployment environment, pipeline run ID and target host identifiers.",
      "Monitor bastion availability and private-network connectivity.",
      "Track server SSH service health using approved monitoring.",
      "Alert on unexpected host-key changes and authentication anomalies.",
      "Verify application health and version consistency after deployment.",
      "Keep access-controlled logs for incident analysis.",
    ],

    commonMistakes: [
      "Opening port 22 to the entire internet to fix a timeout.",
      "Disabling host-key verification to suppress a warning.",
      "Regenerating SSH keys without identifying the rejected identity.",
      "Assuming every timeout is a firewall problem.",
      "Assuming Permission denied always means the private key is invalid.",
      "Testing from a laptop when the real deployment controller is a CI runner.",
      "Ignoring bastion-to-target connectivity.",
      "Sharing unredacted SSH verbose logs or private-key contents.",
      "Restarting SSH remotely without an alternate recovery path.",
      "Retrying the whole production playbook before checking completed changes.",
    ],
  },

  incidentReportTemplate: {
    title: "Post-incident report",

    fields: [
      "Incident ID and severity",
      "Affected environment, hosts and services",
      "Pipeline run ID, commit SHA and artifact version",
      "Detection time, failure time and recovery time",
      "Exact SSH error and failure stage",
      "Resolved hostname, target port and connection path",
      "SSH username and identity reference, without secret contents",
      "Network, DNS, firewall or bastion changes",
      "Affected, changed, failed and unreachable hosts",
      "User impact and duration",
      "Root cause and contributing factors",
      "Recovery action and application verification",
      "Preventive action, owner and target date",
    ],
  },

  interviewQuestions: [
    {
      question: "How do you troubleshoot Ansible UNREACHABLE?",
      answer:
        "Inspect the exact connection error, resolve the hostname from the controller, test the SSH TCP path, validate the effective SSH configuration and authenticate with the intended identity. Then test Ansible connectivity.",
    },
    {
      question: "What is the difference between connection timed out and connection refused?",
      answer:
        "A timeout means the connection did not complete within the allowed time. Connection refused indicates that the connection was actively rejected. Neither message alone identifies the exact root cause.",
    },
    {
      question: "What does Permission denied (publickey) mean?",
      answer:
        "The server did not accept the offered public-key authentication for the selected account. Investigate username, key selection, authorized keys, account restrictions and server policy.",
    },
    {
      question: "Why can SSH work locally but fail in CI?",
      answer:
        "The runner may use different credentials, a different home directory, SSH configuration, known_hosts data, network access, agent state or ProxyJump settings.",
    },
    {
      question: "Why should StrictHostKeyChecking remain enabled?",
      answer:
        "It helps ensure the client connects to the expected server and protects against impersonation. Unexpected key changes should be independently verified.",
    },
    {
      question: "How do you troubleshoot a bastion connection?",
      answer:
        "Test the bastion connection first, then test the complete ProxyJump route. Check routing, destination port, source restrictions and the authentication required at each hop.",
    },
    {
      question: "Does successful SSH prove the Ansible playbook will work?",
      answer:
        "No. SSH proves that the tested connection and command succeeded. Ansible tasks can still fail because of Python, permissions, dependencies, variables or application problems.",
    },
    {
      question: "How do you recover from partial deployment after SSH failures?",
      answer:
        "Pause rollout expansion, inspect per-host results, compare application versions and health, restore the failing access path, then use a controlled forward fix or approved rollback.",
    },
    {
      question: "How can you avoid SSH failures in production?",
      answer:
        "Use explicit inventory validation, approved credential management, trusted host keys, tested bastion paths, runner consistency, canary deployments and monitoring.",
    },
    {
      question: "How do you prove SSH recovery is complete?",
      answer:
        "Verify the actual deployment controller can authenticate to the intended hosts, Ansible connectivity succeeds, the rollout completes and application health is confirmed.",
    },
  ],

  runbookChecklist: [
    "Identify the failed pipeline, commit and target environment.",
    "Confirm the inventory and resolved host list.",
    "Determine which hosts are affected and whether any tasks changed production.",
    "Resolve the hostname from the actual Ansible controller.",
    "Test TCP reachability to the intended SSH port.",
    "Inspect the effective SSH configuration.",
    "Verify the username and selected identity.",
    "Check local key path, ownership and permissions.",
    "Investigate host-key verification without disabling security controls.",
    "Test the bastion and private-host path when required.",
    "Compare CI runner configuration with a known-good environment.",
    "Run the Ansible connectivity test.",
    "Correct the proven cause and validate before resuming.",
    "Use a controlled rollout and approved recovery plan.",
    "Verify application versions, service health and monitoring.",
    "Document the incident and implement preventive actions.",
  ],
};

export default sshFailuresGuide;
