
  // Add these properties inside sshFailuresGuide, before runbookChecklist.

  failureSignatureMatrix: [
    {
      error: "Could not resolve hostname",
      layer: "DNS / inventory",
      likelyCauses: [
        "Hostname typo or stale inventory value",
        "Private DNS zone unavailable to the runner",
        "Resolver configuration or VPN issue",
        "Short hostname requires a search domain",
      ],
      diagnostics: [
        "getent ahosts app01.example.internal",
        "cat /etc/resolv.conf",
        "ansible-inventory -i inventory/production.ini --host app01",
      ],
      decision: "If resolution fails only in CI, compare runner DNS and network attachment with the approved deployment environment.",
      avoid: "Do not replace DNS names with arbitrary IP addresses without confirming the intended destination.",
    },
    {
      error: "Connection timed out",
      layer: "Network path / TCP",
      likelyCauses: [
        "Missing route or VPN connection",
        "Security group, network ACL, firewall or egress policy",
        "Wrong destination IP or port",
        "Bastion-to-target route failure",
        "Overloaded host or network device",
      ],
      diagnostics: [
        "ip route get 10.20.1.15",
        "nc -vz -w 5 app01.example.internal 22",
        "ssh -vvv -o ConnectTimeout=5 deployer@app01.example.internal true",
      ],
      decision: "Correlate the source IP, destination IP, port, route and firewall evidence at the incident timestamp. A timeout alone does not prove a firewall is responsible.",
      avoid: "Do not open port 22 to the public internet as a troubleshooting shortcut.",
    },
    {
      error: "Connection refused",
      layer: "TCP listener / active rejection",
      likelyCauses: [
        "SSH daemon is stopped",
        "SSH listens on a different port",
        "Host firewall actively rejects the connection",
        "The hostname resolves to the wrong machine",
      ],
      diagnostics: [
        "nc -vz -w 5 app01.example.internal 22",
        "ssh -G app01.example.internal",
        "sudo systemctl status sshd",
        "sudo ss -lntp",
      ],
      decision: "Run the server-side commands only through an approved alternate administrative channel. Confirm the configured listening port and destination host.",
      avoid: "Do not restart SSH remotely without preserving an alternate access path and validating the configuration.",
    },
    {
      error: "Permission denied (publickey)",
      layer: "SSH authentication",
      likelyCauses: [
        "Wrong remote username",
        "Wrong key selected by SSH",
        "Public key is not authorized for the account",
        "Account locked or restricted",
        "Server authentication policy rejects the key algorithm",
        "CI secret is missing, expired or mapped incorrectly",
      ],
      diagnostics: [
        "ssh -G app01.example.internal",
        "ssh-add -l",
        "ssh -vvv -o BatchMode=yes deployer@app01.example.internal true",
        "sudo journalctl -u sshd --since '-15 minutes'",
      ],
      decision: "Use verbose client output and authorized server logs to establish which account and authentication method were attempted. Redact logs before sharing.",
      avoid: "Do not regenerate keys or copy private keys between machines before confirming which identity is rejected.",
    },
    {
      error: "Host key verification failed",
      layer: "Server identity verification",
      likelyCauses: [
        "Legitimate server rebuild or host-key rotation",
        "Hostname or IP now points to a different machine",
        "Stale known_hosts data in the CI runner",
        "Unexpected host impersonation or DNS redirection",
      ],
      diagnostics: [
        "ssh-keygen -F app01.example.internal -f ~/.ssh/known_hosts",
        "ssh-keygen -F 10.20.1.15 -f ~/.ssh/known_hosts",
        "ssh-keyscan -t ed25519 app01.example.internal",
      ],
      decision: "Independently verify the fingerprint through a trusted infrastructure source. ssh-keyscan collects a key but does not prove that the key is authentic.",
      avoid: "Never automatically trust a newly scanned key or disable host-key verification to make a deployment pass.",
    },
    {
      error: "Too many authentication failures",
      layer: "SSH identity selection",
      likelyCauses: [
        "SSH agent contains too many identities",
        "Client offers unrelated keys before the intended key",
        "SSH configuration loads multiple identity files",
      ],
      diagnostics: [
        "ssh-add -l",
        "ssh -G app01.example.internal",
        "ssh -o IdentitiesOnly=yes -i ~/.ssh/deploy_key -o BatchMode=yes deployer@app01.example.internal true",
      ],
      decision: "Compare offered identities with the approved deployment identity and limit the connection to the intended key.",
      avoid: "Do not remove shared agent identities globally if other jobs depend on them.",
    },
    {
      error: "No matching key exchange method / host key type",
      layer: "SSH cryptographic negotiation",
      likelyCauses: [
        "Client and server algorithm policies do not overlap",
        "Old server software",
        "Recent SSH client or server hardening",
        "Unsupported or deprecated key type",
      ],
      diagnostics: [
        "ssh -V",
        "ssh -vvv -o BatchMode=yes deployer@app01.example.internal true",
        "sudo sshd -T",
      ],
      decision: "Identify the negotiated algorithm failure and align client and server with approved modern cryptographic policy. Use server-side commands only with authorized access.",
      avoid: "Do not enable obsolete algorithms globally as a quick fix. Any temporary compatibility exception requires security approval and a removal date.",
    },
    {
      error: "Connection reset / broken pipe",
      layer: "Network stability / session",
      likelyCauses: [
        "Intermittent network loss",
        "NAT, VPN or firewall session expiry",
        "Server overload or process termination",
        "Bastion instability",
        "SSH multiplexed connection became stale",
      ],
      diagnostics: [
        "ssh -vvv -o ConnectTimeout=10 deployer@app01.example.internal true",
        "journalctl -k --since '-15 minutes'",
        "sudo journalctl -u sshd --since '-15 minutes'",
        "ansible-playbook -i inventory/production.ini site.yml --limit app01 --check",
      ],
      decision: "Correlate failure timestamps across runner, bastion, network telemetry and server logs. Use check mode only when tasks support it; it is not a guarantee of zero side effects.",
      avoid: "Do not blindly retry a non-idempotent deployment after an interrupted connection.",
    },
    {
      error: "SSH succeeds but Ansible reports unreachable or module failure",
      layer: "Remote execution / Ansible configuration",
      likelyCauses: [
        "Different SSH arguments or credentials in Ansible",
        "Remote Python interpreter missing or misconfigured",
        "Restricted shell or command execution policy",
        "Privilege escalation failure",
        "Ansible connection plugin or variable override",
      ],
      diagnostics: [
        "ansible-config dump --only-changed",
        "ansible-inventory -i inventory/production.ini --host app01",
        "ansible app_servers -i inventory/production.ini -m ansible.builtin.ping -vvv --limit app01",
      ],
      decision: "Compare effective Ansible variables with the successful manual SSH session. Check the first failing task and the actual remote execution error.",
      avoid: "Do not assume that manual SSH success proves Ansible module execution will work.",
    },
  ],

  advancedProductionDiagnostics: [
    {
      step: 1,
      title: "Establish the actual execution identity",
      purpose: "Find which user, home directory, SSH client and Ansible runtime the failed job uses.",
      commands: [
        "whoami",
        "id",
        "printf 'HOME=%s\\n' \"$HOME\"",
        "pwd",
        "ansible --version",
        "ssh -V",
        "env | cut -d= -f1 | sort",
      ],
      interpretation: [
        "The job may run as a service account rather than the engineer's login account.",
        "SSH configuration and known_hosts may be under a different home directory.",
        "The final command lists environment variable names only; do not dump secret values into logs.",
      ],
      nextAction: "Repeat the remaining diagnostics in the same runner, container or execution environment as the failed job.",
    },
    {
      step: 2,
      title: "Inspect effective Ansible variables",
      purpose: "Detect inventory, group_vars, host_vars, play variables and command-line overrides.",
      commands: [
        "ansible-inventory -i inventory/production.ini --graph",
        "ansible-inventory -i inventory/production.ini --host app01",
        "ansible-config dump --only-changed",
        "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
      ],
      interpretation: [
        "Check ansible_host, ansible_user, ansible_port, ansible_ssh_private_key_file, ansible_ssh_common_args and connection settings.",
        "Inventory output can contain sensitive values; inspect locally and redact before sharing.",
        "The resolved target list is more reliable than assuming a group name means the expected hosts will be selected.",
      ],
      nextAction: "Record the approved host, user, port, identity reference and proxy route, without recording private key contents.",
    },
    {
      step: 3,
      title: "Test DNS and route from the controller",
      purpose: "Separate name resolution and route selection from SSH authentication.",
      commands: [
        "getent ahosts app01.example.internal",
        "ip route get 10.20.1.15",
        "nc -vz -w 5 app01.example.internal 22",
      ],
      interpretation: [
        "A DNS result confirms name resolution only.",
        "ip route get shows the local route selection; it does not prove every downstream network device permits traffic.",
        "A TCP connection test does not validate SSH keys or host identity.",
        "A test from a laptop is not equivalent to a test from a CI runner in another network.",
      ],
      nextAction: "If the route or TCP connection fails, correlate with cloud routes, security groups, network ACLs, firewalls, VPN and bastion telemetry.",
    },
    {
      step: 4,
      title: "Inspect authentication on the server",
      purpose: "Use server-side evidence to distinguish rejected credentials from client-side assumptions.",
      commands: [
        "sudo journalctl -u sshd --since '-15 minutes'",
        "sudo journalctl -u ssh --since '-15 minutes'",
        "sudo sshd -T",
        "sudo getent passwd deployer",
      ],
      interpretation: [
        "The SSH service unit may be named sshd or ssh depending on the operating system.",
        "Logs may identify account restrictions, rejected keys, rate limits or policy failures.",
        "sshd -T shows effective daemon configuration; access and output may be restricted by policy.",
        "Check the actual account shell and account status through approved administrative access.",
      ],
      nextAction: "Ask the server or identity owner to confirm account authorization and policy if server access is unavailable.",
    },
    {
      step: 5,
      title: "Investigate authentication rate limits",
      purpose: "Detect failures caused by repeated attempts or excessive parallel connections.",
      commands: [
        "sudo journalctl -u sshd --since '-15 minutes' | grep -Ei 'maxstartups|refused|failed|disconnect|rate'",
        "ansible-config dump --only-changed",
      ],
      interpretation: [
        "Server logs may indicate connection throttling, MaxStartups pressure or repeated failed authentication.",
        "A high Ansible fork count can create a burst of simultaneous SSH connections.",
        "Rate-limit symptoms must be correlated with server and network telemetry; grep results alone are not conclusive.",
      ],
      nextAction: "Reduce rollout concurrency under change control and test a small batch. Have the server owner assess capacity and approved SSH daemon limits.",
    },
    {
      step: 6,
      title: "Check connection multiplexing",
      purpose: "Investigate stale ControlMaster sessions or shared socket problems.",
      commands: [
        "ssh -G app01.example.internal | grep -Ei 'controlmaster|controlpath|controlpersist'",
        "ssh -vvv -o ControlMaster=no -o ControlPath=none deployer@app01.example.internal true",
      ],
      interpretation: [
        "A direct connection succeeding while the normal connection fails can indicate a multiplexing or socket problem.",
        "Control socket paths may be shared between jobs or become stale after a runner interruption.",
        "The test disables multiplexing for that invocation only; it does not change global configuration.",
      ],
      nextAction: "Review the approved ControlPath design and ensure concurrent jobs cannot collide on socket names.",
    },
    {
      step: 7,
      title: "Validate remote execution and Python separately",
      purpose: "Separate successful SSH login from Ansible module execution.",
      commands: [
        "ssh -o BatchMode=yes deployer@app01.example.internal 'id; command -v python3; python3 --version'",
        "ansible app01 -i inventory/production.ini -m ansible.builtin.ping -vvv",
      ],
      interpretation: [
        "The first command tests a small remote command; restricted shells may prohibit it.",
        "Ansible's ping module checks remote module execution and is not an ICMP ping.",
        "If SSH works but the Ansible ping fails, inspect interpreter discovery, Python availability, shell policy, connection variables and the first module error.",
      ],
      nextAction: "Fix the confirmed remote execution issue separately from the SSH network and authentication path.",
    },
    {
      step: 8,
      title: "Verify the entire bastion route",
      purpose: "Find which hop fails when private servers are reachable only through a jump host.",
      commands: [
        "ssh -G app01.example.internal | grep -Ei 'hostname|user|port|proxyjump|identityfile'",
        "ssh -o ConnectTimeout=5 bastion-user@bastion.example.com true",
        "ssh -J bastion-user@bastion.example.com -o ConnectTimeout=5 deployer@app01.example.internal true",
      ],
      interpretation: [
        "A reachable bastion does not prove it can reach the target subnet.",
        "Check the target's permitted source, the bastion's route table and both authentication paths.",
        "The final command must be run from the actual Ansible controller or runner.",
      ],
      nextAction: "Work with the network owner to fix the narrowest failing hop without exposing private hosts publicly.",
    },
    {
      step: 9,
      title: "Compare failures across hosts and time",
      purpose: "Determine whether the problem follows a subnet, host image, account, key or recent change.",
      commands: [
        "ansible app_servers -i inventory/production.ini -m ansible.builtin.ping --forks 5",
        "ansible-inventory -i inventory/production.ini --graph",
      ],
      interpretation: [
        "Run this only against an approved, bounded target set; start with a small subset during a production incident.",
        "Failures clustered by subnet suggest a shared network path; failures clustered by account or key suggest an authentication or policy issue.",
        "Intermittent results can reflect rate limiting, overloaded hosts or unstable connectivity.",
      ],
      nextAction: "Group failed hosts by subnet, availability zone, image version, access route and last successful deployment before choosing a fix.",
    },
    {
      step: 10,
      title: "Prove recovery from the real deployment runner",
      purpose: "Verify that the exact job environment can reach and execute on the intended hosts.",
      commands: [
        "ansible-playbook -i inventory/production.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
        "ansible app_servers -i inventory/production.ini -m ansible.builtin.ping --limit app01",
      ],
      interpretation: [
        "Syntax checking does not test connectivity.",
        "Listing hosts confirms target selection, not host reachability.",
        "A successful Ansible ping is a connectivity gate, not proof that the application deployment is healthy.",
      ],
      nextAction: "Proceed to a canary only after access, target scope, application state and production approval are confirmed.",
    },
  ],

  partialDeploymentDecisionMatrix: [
    {
      condition: "No hosts changed and all targets are unreachable",
      action: "Pause the deployment, repair the shared access path and validate one approved canary host before retrying.",
      rollback: "Application rollback is not automatically required if no application changes occurred; verify this from the run logs.",
    },
    {
      condition: "Some hosts changed and others are unreachable",
      action: "Freeze rollout expansion. Build a host-by-host state table with deployed version, task outcome, reachability and service health.",
      rollback: "Choose forward recovery or approved rollback based on service health, version compatibility and persistent-data compatibility.",
    },
    {
      condition: "SSH recovers but application health is failing",
      action: "Treat application health as a separate incident. Inspect service logs, load balancer health, dependencies and the deployed artifact.",
      rollback: "Use the application's approved rollback procedure if evidence and the incident owner indicate rollback is safer.",
    },
    {
      condition: "Only one host or subnet fails",
      action: "Compare routing, firewall rules, host state, DNS, SSH daemon health and access policy against a healthy peer.",
      rollback: "Do not roll back healthy hosts solely because another host is unreachable. Assess fleet consistency and user impact first.",
    },
    {
      condition: "SSH failures appear after key or host-key rotation",
      action: "Verify the intended key or server fingerprint through a trusted source and inspect rotation timing and CI secret distribution.",
      rollback: "Use the approved credential or host-key recovery procedure. Never disable identity verification as a shortcut.",
    },
  ],

  productionRecoveryGates: [
    {
      gate: "Gate 1 — Scope verified",
      requirements: [
        "Correct repository, commit, artifact and environment confirmed",
        "Resolved inventory target list reviewed",
        "Deployment approval and incident owner confirmed",
      ],
      passCriteria: "The target list matches the approved change.",
    },
    {
      gate: "Gate 2 — Failure understood",
      requirements: [
        "First failing connection stage identified",
        "Relevant client and server evidence captured",
        "Likely root cause supported by evidence",
      ],
      passCriteria: "The team can explain why the failure occurs and which change should address it.",
    },
    {
      gate: "Gate 3 — Access restored",
      requirements: [
        "Correct host identity verified",
        "Approved SSH authentication succeeds",
        "Ansible connectivity succeeds from the actual runner",
      ],
      passCriteria: "The target host passes the approved connectivity check without bypassing security controls.",
    },
    {
      gate: "Gate 4 — Canary healthy",
      requirements: [
        "One approved canary or smallest safe batch deployed",
        "Application health and logs checked",
        "No unexpected changes or new alerts",
      ],
      passCriteria: "The application meets its health criteria and the incident owner approves further rollout.",
    },
    {
      gate: "Gate 5 — Fleet consistent",
      requirements: [
        "All intended hosts accounted for",
        "Version consistency checked",
        "Load balancer health, error rates and service-level indicators verified",
      ],
      passCriteria: "Deployment is complete or a documented exception and recovery plan are accepted.",
    },
  ],

  advancedPrevention: {
    title: "Production-grade prevention and observability",
    controls: [
      {
        control: "Runner parity",
        implementation: "Run connectivity preflight from the same runner image, network and service account used for deployment.",
        evidence: "Pipeline logs include runner image/version, Ansible version, SSH version and a non-secret environment identifier.",
      },
      {
        control: "Credential lifecycle",
        implementation: "Use approved secret management, key rotation, access reviews and a documented emergency access process.",
        evidence: "Rotation events, expiry alerts and deployment credential references are auditable without exposing secret material.",
      },
      {
        control: "Trusted host identity",
        implementation: "Distribute verified host keys through a trusted provisioning process and preserve strict host-key verification.",
        evidence: "Unexpected fingerprint changes produce an alert and a reviewable security event.",
      },
      {
        control: "Network path monitoring",
        implementation: "Monitor bastion health, VPN state, relevant routes and approved SSH connectivity paths.",
        evidence: "Alerts identify the affected route or host group and include the time window.",
      },
      {
        control: "Concurrency control",
        implementation: "Choose Ansible forks and serial batch size based on fleet capacity, server limits and application availability requirements.",
        evidence: "Load testing and rollout records justify concurrency values; incident runbooks define how to reduce them safely.",
      },
      {
        control: "Inventory integrity",
        implementation: "Validate inventory syntax, required groups, host counts and environment boundaries in CI.",
        evidence: "A deployment cannot proceed with an unexpected or empty production target set.",
      },
      {
        control: "Partial-deployment safety",
        implementation: "Use canary deployment, health checks, bounded batches and explicit recovery decisions.",
        evidence: "Each deployment records per-host results, artifact version and application health status.",
      },
      {
        control: "Audit and alerting",
        implementation: "Alert on unusual authentication failures, repeated unreachable hosts, host-key changes and SSH availability degradation.",
        evidence: "Events are correlated with pipeline run IDs and timestamps without logging secrets.",
      },
    ],
    ciPreflightExample: `#!/usr/bin/env bash
set -euo pipefail

INVENTORY="inventory/staging.ini"
GROUP="app_servers"

echo "== Execution context =="
whoami
ansible --version
ssh -V

echo "== Inventory syntax and targets =="
ansible-inventory -i "$INVENTORY" --graph
ansible-playbook -i "$INVENTORY" site.yml --list-hosts

echo "== Bounded connectivity test =="
ansible "$GROUP" -i "$INVENTORY" \\
  -m ansible.builtin.ping \\
  --forks 5

echo "Preflight passed. Production deployment still requires its normal approval gate."`,
    ciPreflightWarnings: [
      "The example uses staging inventory intentionally. Substitute production inventory only within an approved production pipeline.",
      "The preflight is a gate, not a substitute for deployment approval, application health checks or change management.",
      "Do not echo private keys, secret environment variables or unredacted verbose SSH output.",
      "A preflight can pass and a later deployment can still fail due to changing network conditions, host load or credential rotation.",
    ],
  },

  handsOnProductionLabs: [
    {
      title: "Lab 1 — Wrong username or identity",
      setup: "In an isolated test VM, configure an incorrect Ansible remote username or select a non-authorized test key.",
      tasks: [
        "Capture the exact Ansible error and timestamp.",
        "Inspect the effective SSH username and identity.",
        "Run a bounded verbose SSH test.",
        "Correct the test configuration and verify Ansible connectivity.",
      ],
      successCriteria: "The learner distinguishes username/key selection from network reachability and records the evidence used to prove the cause.",
      safety: "Never experiment with production credentials or alter shared authorized_keys during the lab.",
    },
    {
      title: "Lab 2 — Private subnet and bastion",
      setup: "Use an isolated lab network with one bastion and one private VM.",
      tasks: [
        "Test bastion access independently.",
        "Test the complete ProxyJump path.",
        "Compare source restrictions and route tables.",
        "Restore the intended path and verify Ansible connectivity.",
      ],
      successCriteria: "The learner identifies which network hop fails without exposing the private VM to the public internet.",
      safety: "Use disposable lab resources and approved test credentials.",
    },
    {
      title: "Lab 3 — Host-key rotation",
      setup: "Rebuild a disposable VM or rotate its test host key using a documented lab procedure.",
      tasks: [
        "Capture the host-key verification error.",
        "Obtain the new fingerprint through the trusted lab console.",
        "Compare the trusted fingerprint with the presented key.",
        "Update only the confirmed stale test entry and reconnect.",
      ],
      successCriteria: "The learner restores access without globally disabling host-key verification.",
      safety: "Never trust ssh-keyscan output by itself or clear production known_hosts as a blanket fix.",
    },
    {
      title: "Lab 4 — Partial deployment simulation",
      setup: "Use disposable test hosts and a harmless idempotent playbook; make one test host unavailable before the run.",
      tasks: [
        "Capture the per-host Ansible recap.",
        "Record which hosts completed each change.",
        "Restore test connectivity.",
        "Verify host state before rerunning and compare resulting application versions.",
      ],
      successCriteria: "The learner proves that rerunning a playbook is based on observed host state rather than assumption.",
      safety: "Do not simulate partial failure by disconnecting real production hosts.",
    },
    {
      title: "Lab 5 — Connection pressure",
      setup: "In an isolated environment, compare small and larger Ansible concurrency values against disposable hosts.",
      tasks: [
        "Record connection success rate and latency.",
        "Inspect server logs for rate limits or connection pressure.",
        "Reduce concurrency and repeat the test.",
        "Document the tested safe concurrency range.",
      ],
      successCriteria: "The learner links connection pressure to measurable evidence and selects a controlled rollout size.",
      safety: "Do not stress-test production SSH services without an approved capacity test.",
    },
  ],

  additionalInterviewQuestions: [
    {
      question: "How do you distinguish DNS, TCP, SSH authentication and Ansible module failures?",
      answer: "Check in layers: resolve the hostname, test TCP reachability, inspect SSH negotiation and authentication, then run an Ansible connectivity test. Each stage proves only its own layer.",
    },
    {
      question: "Why can port 22 be reachable while SSH still fails?",
      answer: "TCP reachability does not prove host-key trust, algorithm compatibility, successful authentication, account authorization or remote command execution.",
    },
    {
      question: "What do you investigate when only one availability zone fails?",
      answer: "Compare route tables, security groups, network ACLs, DNS answers, source ranges, bastion paths and recent changes against a healthy zone.",
    },
    {
      question: "How do you safely investigate SSH failures caused by key rotation?",
      answer: "Confirm which client identity is being offered, correlate the rotation event, verify the expected public key or host fingerprint through a trusted channel and update only the approved configuration.",
    },
    {
      question: "What does an Ansible UNREACHABLE result tell you about task execution?",
      answer: "It indicates Ansible could not establish or use the required connection for that host at that point. It does not prove that other hosts were unchanged or that earlier tasks on the same host had no side effects.",
    },
    {
      question: "When is reducing forks useful?",
      answer: "When evidence indicates connection bursts, server limits, resource pressure or network constraints. Lower concurrency is a controlled mitigation, not a replacement for finding the underlying cause.",
    },
    {
      question: "Why should host-key checking not be disabled during an incident?",
      answer: "It protects server identity verification. Bypassing it can conceal a wrong destination or impersonation and turn an availability incident into a security incident.",
    },
    {
      question: "How do you decide between forward recovery and rollback after partial deployment?",
      answer: "Compare per-host versions, application health, dependency compatibility, persistent-data changes, user impact and the tested rollback procedure. SSH recovery alone does not decide application rollback.",
    },
    {
      question: "How do you prove that a fix works?",
      answer: "Repeat the test from the actual deployment runner, verify SSH authentication and Ansible connectivity, run a controlled canary, and confirm application health and fleet consistency.",
    },
    {
      question: "What should an incident report avoid recording?",
      answer: "Private-key contents, passwords, tokens, sensitive environment values and unnecessary personal data. Record secret references or fingerprints where appropriate, along with timestamps and redacted evidence.",
    },
  ],
