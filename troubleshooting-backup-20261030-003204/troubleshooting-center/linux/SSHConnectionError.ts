
export interface SSHConnectionErrorGuide {
  title: string;
  filePath: string;
  severity: {
    levels: { level: string; criteria: string; response: string }[];
  };
  incidentScenario: string;
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  troubleshootingWorkflow: {
    step: number;
    title: string;
    purpose: string;
    commands: string[];
    interpretation: string[];
    nextAction: string;
  }[];
  rootCauseMatrix: {
    symptom: string;
    likelyCauses: string[];
    confirmation: string;
    correctiveAction: string;
  }[];
  recoveryRunbook: string[];
  rollbackPlan: string[];
  prevention: string[];
  monitoringAndAlerting: string[];
  ciCdChecks: string[];
  incidentReportTemplate: string[];
  handsOnLabs: { scenario: string; tasks: string[] }[];
  interviewQuestions: { question: string; answer: string }[];
  operationalChecklist: string[];
  references: string[];
}

export const sshConnectionErrorGuide: SSHConnectionErrorGuide = {
  title: "Linux SSH Connection Errors — Production Troubleshooting Runbook",
  filePath: "app/troubleshooting-center/linux/SSHConnectionError.ts",

  severity: {
    levels: [
      {
        level: "SEV-1 / Critical",
        criteria:
          "Production fleet is unreachable, critical service recovery is blocked, or an active outage has no usable administrative access path.",
        response:
          "Declare the incident, engage the on-call infrastructure and security teams, preserve evidence, and use an approved alternate access path."
      },
      {
        level: "SEV-2 / High",
        criteria:
          "A production host, deployment group, or critical bastion is inaccessible, but service remains partially available.",
        response:
          "Identify the affected host group, compare with healthy hosts, and restore access using the approved recovery procedure."
      },
      {
        level: "SEV-3 / Medium",
        criteria:
          "A developer, automation account, or non-critical environment cannot connect through SSH.",
        response:
          "Investigate client configuration, identity, DNS, routing, access policy, and authentication logs."
      },
      {
        level: "SEV-4 / Low",
        criteria:
          "An isolated connection attempt fails with an understood, non-production impact.",
        response:
          "Document the cause and correct the configuration through the normal change process."
      }
    ]
  },

  incidentScenario:
    "At 10:15 AM, a production deployment fails because SSH connections to several Linux hosts time out. The hosts were reachable earlier. Engineers must determine whether the issue is client-side, DNS, network routing, a firewall/security-group change, a stopped SSH daemon, authentication, a bastion failure, or a host-level resource problem. Restore access without weakening production security or making unverified changes.",

  impactAssessment: [
    "Identify the exact hostname, IP address, cloud account, region, environment, and affected host group.",
    "Determine whether one host, one subnet, one availability zone, one bastion, or the entire fleet is affected.",
    "Check whether application traffic is still healthy even though administrative SSH access is unavailable.",
    "Identify deployments, patching, firewall changes, key rotations, DNS changes, reboots, and infrastructure changes around the incident start time.",
    "Determine whether existing SSH sessions work while only new sessions fail.",
    "Check whether Ansible, CI/CD, backup, monitoring, or other automation is also failing to connect.",
    "Establish incident severity, customer impact, recovery objectives, and the responsible incident owner.",
    "Record the first failure timestamp and compare it with the last known successful connection."
  ],

  safetyChecks: [
    "Confirm the intended host, IP address, cloud account, region, environment, and change ticket before running commands.",
    "Use an approved administrative account and approved access path.",
    "Do not disable the firewall, open SSH to the entire internet, enable root login, or weaken authentication as a quick fix.",
    "Do not delete known_hosts entries blindly. A changed host key may indicate a legitimate rebuild or a security incident.",
    "Never paste private keys, passwords, tokens, or unredacted authentication logs into incident tickets.",
    "Preserve logs and configuration evidence before making changes when practical.",
    "Check whether another engineer is changing networking, SSH configuration, keys, or the host at the same time.",
    "Before restarting sshd or changing firewall rules, establish an alternate access path such as a second approved session, cloud serial console, or managed session service.",
    "Validate SSH configuration before reloading it and retain the existing session until a new connection has been tested.",
    "Use approved change control for production modifications and define a rollback condition before executing them."
  ],

  evidenceCollection: [
    "Client hostname, operating system, SSH client version, source IP, VPN state, and network location.",
    "Destination hostname, resolved IP addresses, port, username, SSH identity path, proxy/jump-host configuration, and authentication method.",
    "Exact error message and timestamp, including timezone.",
    "Verbose SSH output from ssh -vvv with secrets and sensitive host information redacted.",
    "DNS answers, TCP connectivity test, routing results, and VPN or proxy status.",
    "Cloud security-group, network ACL, route-table, host firewall, and bastion configuration changes.",
    "On-host sshd service status, listening sockets, configuration validation, disk and memory pressure, and relevant system logs.",
    "Authentication failures, account lockouts, key permissions, authorized_keys permissions, and centralized identity-provider status.",
    "Deployment logs, inventory, automation user, and changes made immediately before the first failure.",
    "Known-good comparison host results from the same network and environment."
  ],

  troubleshootingWorkflow: [
    {
      step: 1,
      title: "Capture the exact failure",
      purpose:
        "Different SSH errors indicate different failure stages. Preserve the original message before changing anything.",
      commands: [
        "ssh -V",
        "ssh -vvv -o ConnectTimeout=10 user@server.example.com",
        "date -Is"
      ],
      interpretation: [
        "'Could not resolve hostname' points toward name resolution or a hostname typo.",
        "'Connection timed out' commonly indicates packet filtering, routing, an unreachable host, or a silent network drop.",
        "'Connection refused' usually means the destination is reachable but nothing is accepting the connection on that address and port, or a firewall actively rejects it.",
        "'Permission denied (publickey)' means the connection reached SSH authentication but the offered credentials were not accepted.",
        "'Host key verification failed' means the server identity does not match the client's trusted host-key record.",
        "'No route to host' may indicate routing failure or an explicit network rejection; verify the network path rather than assuming the cause."
      ],
      nextAction:
        "Classify the failure stage, record the timestamp, and proceed to the matching network, server, identity, or trust investigation."
    },
    {
      step: 2,
      title: "Verify hostname and DNS",
      purpose:
        "Confirm that the client is resolving the intended server to the expected address.",
      commands: [
        "getent ahosts server.example.com",
        "dig server.example.com A",
        "dig server.example.com AAAA",
        "cat /etc/resolv.conf",
        "grep -n 'server.example.com' /etc/hosts"
      ],
      interpretation: [
        "No answer may indicate a DNS record, resolver, search-domain, or split-DNS problem.",
        "An unexpected address can indicate a stale record, wrong environment, or incorrect DNS view.",
        "An IPv6 address may be selected even though the client network has no working IPv6 route.",
        "Different answers from VPN and non-VPN networks may be intentional; confirm the expected DNS view."
      ],
      nextAction:
        "Compare answers with a healthy client and the authoritative record. Use an approved known IP for a diagnostic comparison without permanently bypassing DNS."
    },
    {
      step: 3,
      title: "Test TCP reachability",
      purpose:
        "Determine whether the client can establish a TCP connection to the intended SSH endpoint.",
      commands: [
        "nc -vz -w 5 server.example.com 22",
        "timeout 8 bash -c '</dev/tcp/server.example.com/22'",
        "ssh -o ConnectTimeout=8 user@server.example.com"
      ],
      interpretation: [
        "A successful TCP connection shows that the TCP handshake succeeded; it does not prove authentication or command execution will work.",
        "A timeout suggests a dropped packet, routing problem, unreachable destination, or security policy.",
        "A refusal suggests the destination was reached but the connection was rejected or no service was listening.",
        "If only one source network fails, compare VPN, corporate egress, NAT, and source-IP allowlists."
      ],
      nextAction:
        "If TCP fails, investigate routes and filtering. If TCP succeeds, continue to SSH protocol negotiation and authentication."
    },
    {
      step: 4,
      title: "Inspect client routing and VPN",
      purpose:
        "Verify the route selected by the client and determine whether a VPN or gateway changed the path.",
      commands: [
        "ip route get <server-ip>",
        "ip route",
        "ip addr",
        "traceroute -T -p 22 server.example.com",
        "tracepath server.example.com"
      ],
      interpretation: [
        "A route through an unexpected interface or gateway can reveal a VPN or route-policy issue.",
        "A trace stopping at an intermediate hop is not conclusive because routers may suppress probe responses.",
        "A changed source address can cause a source-IP allowlist to reject the connection.",
        "A missing route to a private address commonly indicates a VPN, peering, or route-table problem."
      ],
      nextAction:
        "Compare the route and source address with a working client. Correct routing through the approved network change process."
    },
    {
      step: 5,
      title: "Check bastion or jump-host connectivity",
      purpose:
        "Separate a target-host failure from a broken intermediate access path.",
      commands: [
        "ssh -vvv -J jumpuser@bastion.example.com appuser@private-server",
        "ssh -G private-server",
        "nc -vz -w 5 bastion.example.com 22"
      ],
      interpretation: [
        "If the bastion is unreachable, investigate its DNS, network path, security policy, and sshd service first.",
        "If the bastion is reachable but the target is not, inspect bastion-to-target routing and target-side rules.",
        "If direct SSH is prohibited by policy, do not bypass the bastion to test access.",
        "Check ProxyJump, ProxyCommand, and per-host configuration for unexpected overrides."
      ],
      nextAction:
        "Test each approved connection hop independently and identify the first failing boundary."
    },
    {
      step: 6,
      title: "Check cloud network controls",
      purpose:
        "Determine whether cloud networking or access policy blocks the intended path.",
      commands: [
        "ip route",
        "sudo nft list ruleset",
        "sudo ufw status verbose",
        "sudo firewall-cmd --list-all"
      ],
      interpretation: [
        "Run host commands only when authorized and only on the intended host.",
        "Use the cloud provider console or approved CLI to inspect the instance security group, subnet route table, network ACL, load balancer or bastion path, and source-IP restrictions.",
        "Security groups are commonly stateful, while network ACLs are commonly stateless; verify both directions where applicable.",
        "A missing route to an internet gateway, VPN, transit gateway, or peering connection can break access to private or public hosts.",
        "A recent security-group change may explain a fleet-wide failure if several hosts share that group."
      ],
      nextAction:
        "Compare the effective rules with the approved network design. Change only the specific missing or incorrect rule after confirming the source, destination, port, and change authorization."
    },
    {
      step: 7,
      title: "Confirm that sshd is running and listening",
      purpose:
        "Use an existing session, cloud console, or approved management channel to inspect the server when SSH itself is unavailable.",
      commands: [
        "sudo systemctl status sshd --no-pager",
        "sudo systemctl status ssh --no-pager",
        "sudo ss -lntp | grep -E '(:22|sshd)'",
        "sudo pgrep -a sshd",
        "sudo journalctl -u sshd --since '-30 min' --no-pager",
        "sudo journalctl -u ssh --since '-30 min' --no-pager"
      ],
      interpretation: [
        "The service unit is commonly named sshd on RHEL-family distributions and ssh on Debian/Ubuntu; confirm the actual unit.",
        "A stopped service requires investigation of the reason it stopped, not just a blind restart.",
        "A listener bound only to 127.0.0.1 or the wrong interface cannot accept connections on the intended address.",
        "A custom SSH port means port 22 may correctly be closed; inspect the effective configuration.",
        "Missing logs do not prove sshd was healthy; confirm the logging destination and time range."
      ],
      nextAction:
        "If sshd is stopped, inspect the configuration and logs before restarting. If it listens correctly, continue to server filtering and authentication."
    },
    {
      step: 8,
      title: "Validate SSH server configuration",
      purpose:
        "Detect invalid syntax, incorrect listen addresses, port changes, authentication restrictions, or included configuration overrides.",
      commands: [
        "sudo sshd -t",
        "sudo sshd -T | grep -Ei '^(port|listenaddress|permitrootlogin|pubkeyauthentication|passwordauthentication|allowusers|allowgroups|denyusers|denygroups|authorizedkeysfile|authenticationmethods)'",
        "sudo grep -RniE '^(Port|ListenAddress|PermitRootLogin|PubkeyAuthentication|PasswordAuthentication|AllowUsers|AllowGroups|DenyUsers|DenyGroups|AuthorizedKeysFile|AuthenticationMethods|Include)' /etc/ssh/sshd_config /etc/ssh/sshd_config.d 2>/dev/null"
      ],
      interpretation: [
        "A failing sshd -t identifies configuration problems before a reload or restart.",
        "Included configuration files and distribution-specific defaults may affect the effective settings.",
        "sshd -T shows effective settings for the tested context; Match rules can make settings user- or address-dependent.",
        "An unexpected Port or ListenAddress can make the service unavailable at the address and port clients use."
      ],
      nextAction:
        "Make a minimal, reviewed configuration correction, run sshd -t again, then reload using the correct service unit only after confirming an alternate recovery path."
    },
    {
      step: 9,
      title: "Inspect host firewall and packet flow",
      purpose:
        "Determine whether the host receives SSH packets and whether local rules allow them.",
      commands: [
        "sudo nft list ruleset",
        "sudo iptables -S",
        "sudo ufw status numbered",
        "sudo tcpdump -ni any 'tcp port 22'"
      ],
      interpretation: [
        "Use the firewall tool actually managing the host; nftables, iptables compatibility layers, UFW, and firewalld may interact.",
        "No incoming packets during a controlled test suggests the problem may be upstream or that the tested interface/address is wrong.",
        "Incoming SYN packets without a successful handshake suggest local filtering, no listener, or a return-path problem.",
        "A successful handshake followed by authentication rejection points away from basic TCP reachability.",
        "Packet captures may contain sensitive metadata; restrict access and retention."
      ],
      nextAction:
        "Identify the exact rule or packet-flow failure. Do not flush firewall rules or disable filtering as a troubleshooting shortcut."
    },
    {
      step: 10,
      title: "Check user identity and account state",
      purpose:
        "Distinguish a network problem from an account, group, or authentication-policy rejection.",
      commands: [
        "getent passwd appuser",
        "id appuser",
        "sudo passwd -S appuser",
        "sudo chage -l appuser",
        "sudo faillock --user appuser",
        "sudo grep -Ei 'AllowUsers|AllowGroups|DenyUsers|DenyGroups|AuthenticationMethods' /etc/ssh/sshd_config"
      ],
      interpretation: [
        "An absent user may indicate the wrong username, failed directory integration, or a provisioning problem.",
        "An expired or locked account may be rejected even when the key is correct.",
        "PAM and account-lockout commands vary by Linux distribution; verify the installed authentication stack.",
        "AllowUsers, AllowGroups, DenyUsers, DenyGroups, PAM, and identity-provider policies can reject access."
      ],
      nextAction:
        "Confirm the intended account and authorization policy. Restore the approved account state or identity integration without bypassing access controls."
    },
    {
      step: 11,
      title: "Verify SSH key selection and client permissions",
      purpose:
        "Determine which key the client offers and whether the server accepts that identity.",
      commands: [
        "ssh-add -l",
        "ssh -vvv -o IdentitiesOnly=yes -i ~/.ssh/id_ed25519 appuser@server.example.com",
        "stat -c '%a %U:%G %n' ~/.ssh ~/.ssh/id_ed25519 ~/.ssh/config",
        "ssh-keygen -lf ~/.ssh/id_ed25519.pub"
      ],
      interpretation: [
        "An empty agent or missing identity may explain why the expected key is not offered.",
        "IdentitiesOnly can isolate key selection when an agent contains many keys.",
        "Private keys should be readable only by the owner, commonly mode 600, and the ~/.ssh directory is commonly mode 700.",
        "Do not print or upload the private key. Fingerprints are safer for comparing public-key identity.",
        "An encrypted key may require an approved agent or interactive passphrase entry."
      ],
      nextAction:
        "Select the intended key explicitly, verify its fingerprint, and confirm that its matching public key is authorized for the intended account."
    },
    {
      step: 12,
      title: "Verify authorized_keys and server-side permissions",
      purpose:
        "Identify missing keys, wrong ownership, incorrect paths, or permissions that cause public-key rejection.",
      commands: [
        "sudo namei -l /home/appuser/.ssh/authorized_keys",
        "sudo stat -c '%a %U:%G %n' /home/appuser /home/appuser/.ssh /home/appuser/.ssh/authorized_keys",
        "sudo sshd -T -C user=appuser,host=server.example.com,addr=<client-ip> | grep -Ei '^(authorizedkeysfile|pubkeyauthentication|strictmodes)'"
      ],
      interpretation: [
        "The authorized_keys file must contain the correct public key for the intended account.",
        "With StrictModes enabled, unsafe ownership or permissions on the home directory, .ssh directory, or authorized_keys may cause rejection.",
        "The home directory may be elsewhere, and AuthorizedKeysFile may point to a custom location; confirm with getent and the effective configuration.",
        "SELinux contexts can also affect access on enforcing systems."
      ],
      nextAction:
        "Correct only the specific path, ownership, mode, key, or security-context issue. Preserve unrelated authorized keys and follow the organization's key-management policy."
    },
    {
      step: 13,
      title: "Read authentication and security logs",
      purpose:
        "Find the server-side reason for a connection or authentication rejection.",
      commands: [
        "sudo journalctl -u sshd --since '-30 min' --no-pager",
        "sudo journalctl -u ssh --since '-30 min' --no-pager",
        "sudo tail -n 200 /var/log/auth.log",
        "sudo tail -n 200 /var/log/secure",
        "sudo ausearch -m AVC -ts recent"
      ],
      interpretation: [
        "Ubuntu/Debian commonly use /var/log/auth.log; RHEL-family systems commonly use /var/log/secure, but journald or centralized logging may be used instead.",
        "Messages such as invalid user, failed publickey, account locked, or bad ownership narrow the cause.",
        "SELinux AVC denials can indicate access blocked by security policy; do not disable SELinux as a shortcut.",
        "If no events appear, verify the timestamp, log destination, host identity, and whether packets reached the host."
      ],
      nextAction:
        "Correlate client and server timestamps and act on the exact rejection reason. Redact usernames, addresses, and other sensitive details before sharing logs."
    },
    {
      step: 14,
      title: "Check disk, memory, CPU, and process limits",
      purpose:
        "Detect host pressure that prevents logins, key processing, PAM, or new processes from starting.",
      commands: [
        "df -hT",
        "df -i",
        "free -h",
        "uptime",
        "ps -eo pid,comm,%cpu,%mem --sort=-%mem | head",
        "sudo journalctl -k --since '-30 min' --no-pager | grep -Ei 'oom|out of memory|I/O error|read-only'"
      ],
      interpretation: [
        "A full filesystem or exhausted inodes can prevent logs, temporary files, or user sessions from being created.",
        "Memory exhaustion or OOM kills may affect sshd, PAM, or supporting identity services.",
        "A read-only filesystem or underlying disk I/O error may require storage recovery rather than SSH configuration changes.",
        "High load alone does not prove it caused the failure; correlate timing and system evidence."
      ],
      nextAction:
        "Restore host health using the appropriate capacity or storage runbook, preserve evidence, and avoid deleting files without confirming their purpose."
    },
    {
      step: 15,
      title: "Investigate DNS, LDAP, PAM, and identity-provider dependencies",
      purpose:
        "Identify authentication delays or failures caused by remote identity services.",
      commands: [
        "getent passwd appuser",
        "getent group ssh-access",
        "systemctl --type=service --state=running",
        "sudo journalctl --since '-30 min' --no-pager | grep -Ei 'pam|sssd|ldap|kerberos|timeout|authentication'"
      ],
      interpretation: [
        "A local account may work while centrally managed accounts fail if SSSD, LDAP, Kerberos, or a directory service is unavailable.",
        "Slow name service lookups can make SSH appear to hang after the TCP connection succeeds.",
        "A broad service listing is only a starting point; identify the actual dependency and inspect its service-specific status and logs.",
        "Do not change PAM files or authentication policy without a tested recovery path."
      ],
      nextAction:
        "Restore the failing dependency or apply the approved fallback policy. Verify both successful authentication and continued enforcement of access controls."
    },
    {
      step: 16,
      title: "Check fail2ban, rate limits, and source-IP blocks",
      purpose:
        "Determine whether repeated login failures or automated security controls are blocking a legitimate client.",
      commands: [
        "sudo fail2ban-client status",
        "sudo fail2ban-client status sshd",
        "sudo journalctl --since '-30 min' --no-pager | grep -Ei 'ban|blocked|rate limit|maximum authentication attempts'"
      ],
      interpretation: [
        "These commands apply only if fail2ban or a comparable control is installed.",
        "A changed VPN or NAT egress IP can make a legitimate user appear to be a new or suspicious source.",
        "A rate-limit or ban event should be confirmed in the relevant control's logs.",
        "Do not disable the security control globally to restore one user's access."
      ],
      nextAction:
        "Follow the approved unban or allowlisting procedure for the verified source and investigate why the failed attempts occurred."
    },
    {
      step: 17,
      title: "Check SSH host-key trust",
      purpose:
        "Resolve host identity verification errors without creating a man-in-the-middle risk.",
      commands: [
        "ssh-keygen -F server.example.com",
        "ssh-keygen -F <server-ip>",
        "ssh-keyscan -T 5 server.example.com"
      ],
      interpretation: [
        "A host-key mismatch can be caused by a rebuild, DNS pointing to a different host, a changed key, or a possible interception attempt.",
        "ssh-keyscan retrieves a presented key but does not independently prove that it is authentic.",
        "Verify the fingerprint using the trusted console, configuration-management inventory, or another approved out-of-band source.",
        "Do not accept a changed host key merely because SSH suggests removing the old entry."
      ],
      nextAction:
        "Only after verifying the new fingerprint, update the relevant known_hosts entry through the approved procedure and record why the identity changed."
    },
    {
      step: 18,
      title: "Investigate recent changes and compare a healthy host",
      purpose:
        "Narrow the failure to a recent deployment, configuration drift, or shared dependency.",
      commands: [
        "sudo journalctl --since '-2 hours' --no-pager",
        "sudo systemctl --failed",
        "sudo ss -lntp",
        "git diff -- /path/to/managed/ssh/config",
        "git log -5 --oneline"
      ],
      interpretation: [
        "Use Git commands only in the relevant configuration repository; they do not automatically reveal changes made outside Git.",
        "Compare the affected host with a healthy host of the same role, distribution, image, and policy.",
        "Correlate configuration-management runs, cloud audit events, package updates, reboots, and network policy changes.",
        "A simultaneous failure across hosts sharing one security group or identity service suggests a shared dependency."
      ],
      nextAction:
        "Build a timeline, identify the smallest change that explains the evidence, and use the relevant team to approve the correction or rollback."
    },
    {
      step: 19,
      title: "Restore access through a controlled recovery path",
      purpose:
        "Apply the minimum correction and verify that the access path works end to end.",
      commands: [
        "sudo sshd -t",
        "sudo systemctl reload sshd",
        "sudo systemctl reload ssh",
        "ssh -o ConnectTimeout=10 appuser@server.example.com",
        "sudo journalctl --since '-10 min' --no-pager"
      ],
      interpretation: [
        "Run only the service command appropriate for the host and only when the service exists.",
        "Do not run both reload commands indiscriminately; choose the correct unit after validating the configuration.",
        "If reload is unsupported or the service is stopped, follow the distribution-specific recovery procedure from the approved console.",
        "A successful login from one client does not prove all networks, accounts, and automation paths have recovered."
      ],
      nextAction:
        "Validate with a new session, the intended account, the approved source network, and the required automation workflow. Keep the alternate session open until validation succeeds."
    },
    {
      step: 20,
      title: "Prove recovery and close the incident",
      purpose:
        "Confirm service restoration, check for residual failures, and record the evidence.",
      commands: [
        "ssh -o BatchMode=yes -o ConnectTimeout=10 appuser@server.example.com 'hostname; id; uptime'",
        "nc -vz -w 5 server.example.com 22",
        "sudo systemctl is-active sshd",
        "sudo systemctl is-active ssh"
      ],
      interpretation: [
        "BatchMode=yes is useful for automation checks but fails if an interactive password or passphrase is required.",
        "The remote command verifies more than TCP reachability: it confirms that authentication and command execution worked for that account.",
        "A successful check of sshd does not prove the network path from every client is healthy.",
        "Recheck monitoring, automation, affected hosts, and the original business workflow."
      ],
      nextAction:
        "Document the confirmed root cause, corrective action, validation results, residual risk, owner, and prevention tasks before closing the incident."
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Could not resolve hostname",
      likelyCauses: [
        "Typo or wrong hostname",
        "Missing DNS record",
        "VPN or split-DNS failure",
        "Resolver configuration problem"
      ],
      confirmation:
        "Compare getent and dig results with the expected DNS record and a healthy client.",
      correctiveAction:
        "Correct the hostname or approved DNS/resolver configuration and verify the expected address."
    },
    {
      symptom: "Connection timed out",
      likelyCauses: [
        "Security group or firewall silently drops traffic",
        "Missing route or VPN failure",
        "Incorrect destination address",
        "Host is unreachable"
      ],
      confirmation:
        "Test TCP reachability, inspect the selected route, compare source IP, and inspect cloud and host network rules.",
      correctiveAction:
        "Correct the specific route or filtering rule through change control and retest from the affected network."
    },
    {
      symptom: "Connection refused",
      likelyCauses: [
        "sshd is stopped",
        "SSH listens on a different port",
        "sshd is bound to another address",
        "An active reject rule returns a refusal"
      ],
      confirmation:
        "Use an approved console to inspect sshd status, effective port, listening sockets, and firewall rules.",
      correctiveAction:
        "Correct the listener or approved policy, validate configuration, and restore the correct service."
    },
    {
      symptom: "Permission denied (publickey)",
      likelyCauses: [
        "Wrong username or key",
        "Public key missing from authorized_keys",
        "Incorrect home or .ssh permissions",
        "Account or authentication policy rejects access"
      ],
      confirmation:
        "Inspect ssh -vvv output, server authentication logs, account state, key fingerprints, and effective sshd configuration.",
      correctiveAction:
        "Restore the approved public key, permissions, or account authorization without enabling insecure authentication."
    },
    {
      symptom: "Host key verification failed",
      likelyCauses: [
        "Host was rebuilt",
        "DNS points to another host",
        "Known host key is stale",
        "Possible interception or identity compromise"
      ],
      confirmation:
        "Verify the presented fingerprint using a trusted out-of-band source and confirm the host's identity.",
      correctiveAction:
        "Update the trusted host-key record only after verification; escalate suspicious changes to security."
    },
    {
      symptom: "SSH hangs after connecting",
      likelyCauses: [
        "Slow reverse DNS lookup",
        "PAM or directory-service delay",
        "Resource exhaustion",
        "Network middlebox or session policy"
      ],
      confirmation:
        "Use verbose client logs and timestamp-correlated server logs to identify the stage where progress stops.",
      correctiveAction:
        "Correct the confirmed dependency or resource issue and verify login latency after the fix."
    },
    {
      symptom: "Only one user or automation job fails",
      likelyCauses: [
        "Wrong credential or username",
        "Expired or locked account",
        "Changed source IP",
        "Different SSH config or identity selection"
      ],
      confirmation:
        "Compare the failing identity, client configuration, source address, and server-side rejection with a working account.",
      correctiveAction:
        "Fix the account, credential, source policy, or job configuration without broadening access for everyone."
    },
    {
      symptom: "Many hosts fail at the same time",
      likelyCauses: [
        "Shared security-group or firewall change",
        "Bastion outage",
        "VPN or routing failure",
        "Central identity-provider outage",
        "Shared key rotation or configuration deployment"
      ],
      confirmation:
        "Group failures by subnet, security group, access path, identity provider, and change timestamp.",
      correctiveAction:
        "Restore the shared dependency or revert the confirmed harmful change through the incident/change process."
    }
  ],

  recoveryRunbook: [
    "1. Declare and scope the incident; identify the first failure and affected hosts.",
    "2. Preserve the original SSH error, client debug output, relevant timestamps, and recent change history.",
    "3. Determine the failure stage: DNS, routing/TCP, SSH protocol, host identity, authentication, or remote session creation.",
    "4. Use a healthy comparison host and an approved alternate access channel if the target is unreachable.",
    "5. Confirm the evidence-based root cause before changing configuration.",
    "6. Select the smallest reversible correction and obtain the required production approval.",
    "7. Validate configuration syntax, access rules, and security implications before applying the change.",
    "8. Apply the change using the approved console, configuration-management process, or cloud control plane.",
    "9. Test a new SSH session from the original source and with the original intended identity.",
    "10. Verify command execution, automation access, monitoring, and all affected host groups.",
    "11. Keep temporary access changes time-bound, documented, and removed after recovery.",
    "12. Record the cause, fix, validation evidence, rollback status, and prevention owners."
  ],

  rollbackPlan: [
    "Define a clear rollback trigger, such as failed sshd configuration validation, loss of the new test session, or a broader authentication failure.",
    "Keep a working administrative session or approved out-of-band console available before modifying SSH configuration.",
    "Back up the exact file or managed configuration revision before editing it; protect backups because they may contain sensitive settings.",
    "If a new configuration fails validation, do not reload it. Restore the last known-good revision through the approved process.",
    "If a validated configuration causes a failure after reload, use the alternate console or session to restore the prior revision and revalidate it.",
    "For network changes, revert only the identified change using the provider's change history and approved infrastructure workflow.",
    "Do not reboot a production host or flush firewall rules merely to test whether access returns.",
    "After rollback, test both a new interactive session and the required automation path, then document the final configuration."
  ],

  prevention: [
    "Manage sshd configuration and firewall policy through version-controlled configuration management or infrastructure as code.",
    "Validate sshd configuration syntax before deployment and perform staged rollouts to a canary host first.",
    "Test access through the real production path, including VPN, bastion, security groups, and the intended identity.",
    "Use short-lived certificates or centrally managed keys where supported; rotate keys through a documented overlap and rollback process.",
    "Audit public-key access, stale accounts, authorized_keys changes, sudo access, and host-key changes.",
    "Keep at least one approved recovery channel independent of the SSH path being modified.",
    "Use policy-as-code to detect broad SSH exposure, unauthorized ports, and prohibited authentication settings.",
    "Test firewall and routing changes in non-production before rollout.",
    "Monitor disk capacity, inode use, memory pressure, sshd availability, authentication failures, and identity-provider health.",
    "Maintain an access recovery runbook with distribution-specific service names, console procedures, escalation contacts, and approval requirements.",
    "Use configuration drift detection and alert on unexpected changes to sshd_config, authorized_keys, firewall rules, and cloud network policy.",
    "Run periodic recovery exercises so the team can restore administrative access without disabling security controls."
  ],

  monitoringAndAlerting: [
    "Monitor sshd service availability and whether the expected TCP port is listening on the intended interface.",
    "Run synthetic connection checks from approved monitoring networks; distinguish TCP success from successful authentication.",
    "Alert on a sustained rise in SSH authentication failures, repeated invalid-user attempts, and unexpected root-login attempts.",
    "Monitor bastion reachability, VPN health, route changes, security-group changes, and central identity-provider availability.",
    "Monitor authentication latency and correlate spikes with DNS, PAM, LDAP, SSSD, and Kerberos dependencies.",
    "Alert on disk-full, inode exhaustion, OOM events, and repeated sshd service failures.",
    "Send logs to a protected central logging platform with synchronized timestamps and appropriate retention.",
    "Use severity thresholds based on affected production hosts, criticality, duration, and the availability of alternative administrative access.",
    "Do not alert only on port 22 reachability; pair network checks with controlled end-to-end checks using a dedicated, least-privileged monitoring identity."
  ],

  ciCdChecks: [
    "Validate SSH client configuration and host aliases in the pipeline.",
    "Use an approved secret manager or short-lived identity; never commit private keys or passwords to Git.",
    "Verify that the intended inventory or target list is non-empty and belongs to the correct environment.",
    "Test DNS and the approved access path before a deployment begins.",
    "Use strict host-key verification with a trusted, managed known_hosts source.",
    "Set connection timeouts and bounded retries; avoid unlimited retry loops that hide a broken dependency.",
    "Check that the automation identity has the required permissions without granting unnecessary sudo or root access.",
    "Run a canary connectivity check before parallel deployment to the full fleet.",
    "Stop safely when the required number of hosts is unavailable instead of silently reporting a successful deployment.",
    "Capture redacted connection diagnostics and deployment identifiers in the job logs.",
    "Make production deployments require the appropriate approval and preserve a tested rollback path.",
    "After a change, verify remote command execution and the application health check, not merely that SSH accepted a connection."
  ],

  incidentReportTemplate: [
    "Incident ID and title:",
    "Severity and incident commander:",
    "Environment, cloud account, region, and affected hosts:",
    "Start time, detection time, mitigation time, and recovery time with timezone:",
    "Customer and operational impact:",
    "Exact client-side error and relevant server log evidence:",
    "Timeline of deployments, network changes, key changes, and authentication changes:",
    "Diagnostic steps performed and the evidence each step produced:",
    "Confirmed root cause and contributing factors:",
    "Corrective action and approved change reference:",
    "Validation results from a new SSH session, automation, and monitoring:",
    "Rollback performed, or reason rollback was unnecessary:",
    "Security review and any temporary access exceptions:",
    "Preventive actions, owners, and due dates:",
    "Lessons learned and runbook updates:"
  ],

  handsOnLabs: [
    {
      scenario: "Lab 1 — DNS failure",
      tasks: [
        "Use a disposable VM or test hostname.",
        "Capture getent and dig results before changing a test DNS record.",
        "Compare the failure with direct connectivity to the verified test IP.",
        "Restore the record and confirm name resolution and SSH connectivity."
      ]
    },
    {
      scenario: "Lab 2 — SSH daemon stopped",
      tasks: [
        "Use a disposable VM with console access.",
        "Stop sshd in the lab and observe the client error.",
        "Use the console to inspect service status and logs.",
        "Start the service and verify a new session without rebooting the VM."
      ]
    },
    {
      scenario: "Lab 3 — Public-key authentication failure",
      tasks: [
        "Create a test user and a dedicated test key pair.",
        "Attempt access with the wrong key and collect redacted verbose logs.",
        "Inspect the test account's authorized_keys and file permissions.",
        "Correct the test configuration and verify the intended key works."
      ]
    },
    {
      scenario: "Lab 4 — Firewall rule failure",
      tasks: [
        "Use an isolated VM or lab network, never a production host.",
        "Add a narrowly scoped test rule that blocks the lab SSH connection.",
        "Compare TCP timeout/refusal behavior and inspect the lab packet flow.",
        "Remove the test rule and verify the approved connection path."
      ]
    },
    {
      scenario: "Lab 5 — Bastion and private-host failure",
      tasks: [
        "Create two disposable lab hosts with an approved jump-host path.",
        "Test the bastion and target separately.",
        "Introduce a lab-only route or access-rule fault.",
        "Use hop-by-hop evidence to locate the first failed boundary and restore it."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is the difference between Connection timed out and Connection refused?",
      answer:
        "A timeout usually means no successful response was received, often due to packet filtering or routing. Refused generally means the destination actively rejected the connection or no service was listening on that port. Both require verification rather than an assumption."
    },
    {
      question: "How do you troubleshoot Permission denied (publickey)?",
      answer:
        "Verify the username, key offered by the client, server authentication logs, authorized_keys contents, file ownership and permissions, account state, effective sshd configuration, and any PAM or identity-provider restrictions."
    },
    {
      question: "Why should you not disable the firewall during troubleshooting?",
      answer:
        "It removes a security boundary, can expose production services, and may hide the actual faulty rule. Identify the relevant packet path and change only the specific authorized rule."
    },
    {
      question: "What does sshd -t do?",
      answer:
        "It checks the SSH daemon configuration for errors without starting a new daemon or applying a reload. Run it before a configuration reload or restart."
    },
    {
      question: "Why might an SSH connection hang after the TCP handshake?",
      answer:
        "Possible causes include SSH negotiation, reverse DNS lookups, PAM or directory-service delays, resource exhaustion, and network middleboxes. Correlate verbose client output with server-side timestamps."
    },
    {
      question: "How do you troubleshoot SSH when the server is completely unreachable?",
      answer:
        "Scope the failure, test DNS and TCP from the client, inspect routes and cloud network controls, and use an approved serial console, managed session service, or other out-of-band path to inspect the server."
    },
    {
      question: "What is the role of a bastion host?",
      answer:
        "A bastion provides a controlled administrative entry point to private hosts. Troubleshoot the client-to-bastion and bastion-to-target paths separately."
    },
    {
      question: "How do you safely fix a host-key mismatch?",
      answer:
        "Confirm the host's identity and fingerprint through a trusted out-of-band source, investigate unexpected changes, and update the known_hosts entry only after verification."
    },
    {
      question: "Why can SSH fail even when port 22 is reachable?",
      answer:
        "TCP reachability does not guarantee successful SSH negotiation, host-key verification, authentication, account authorization, or remote session creation."
    },
    {
      question: "How do you prevent SSH access outages during a configuration rollout?",
      answer:
        "Use version control, syntax validation, a canary rollout, an alternate recovery path, staged changes, new-session validation, monitoring, and a tested rollback procedure."
    },
    {
      question: "What would you investigate if SSH failed across an entire fleet?",
      answer:
        "Look for shared dependencies such as bastions, VPNs, routing, security groups, central identity services, common configuration deployments, and key rotation events. Correlate failure times and compare host groups."
    },
    {
      question: "How do you prove that an SSH incident is resolved?",
      answer:
        "Establish a new session through the original approved path, authenticate as the intended identity, execute a harmless remote command, verify automation and application workflows, and confirm monitoring has returned to normal."
    }
  ],

  operationalChecklist: [
    "Incident scope and severity recorded",
    "Exact error and timestamps captured",
    "Correct host, environment, identity, and access path confirmed",
    "DNS and TCP reachability tested",
    "Routing, VPN, bastion, cloud controls, and host firewall checked as applicable",
    "sshd status, listening port, and configuration validated",
    "Authentication logs, account state, keys, and permissions checked",
    "Resource pressure and identity dependencies checked where indicated",
    "Root cause supported by evidence",
    "Production change approved and rollback path defined",
    "New SSH session and remote command tested",
    "Automation, affected hosts, and monitoring validated",
    "Temporary access changes removed",
    "Incident report and prevention actions assigned"
  ],

  references: [
    "OpenSSH client manual: https://man.openbsd.org/ssh",
    "OpenSSH server manual: https://man.openbsd.org/sshd",
    "OpenSSH server configuration: https://man.openbsd.org/sshd_config",
    "OpenSSH key management: https://man.openbsd.org/ssh-keygen",
    "Linux systemd journal: https://www.freedesktop.org/software/systemd/man/latest/journalctl.html",
    "Linux nftables documentation: https://netfilter.org/projects/nftables/"
  ]
};
