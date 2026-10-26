
// File: app/troubleshootingcentre/Linux Troubleshooting/SSH connection refused or timed out.ts

export interface SSHCommand {
  title: string;
  command: string;
  purpose: string;
  expectedOutput: string;
  interpretation: string;
}

export interface SSHTroubleshootingStep {
  step: number;
  title: string;
  objective: string;
  actions: string[];
  commands?: string[];
  expectedResult: string;
  precautions?: string[];
}

export interface SSHRootCause {
  cause: string;
  symptoms: string[];
  investigation: string[];
  resolution: string[];
}

export interface SSHIncidentScenario {
  environment: string;
  incident: string;
  impact: string[];
  investigation: string[];
  rootCause: string;
  resolution: string[];
  prevention: string[];
}

export interface LinuxSSHTroubleshootingRunbook {
  id: string;
  title: string;
  category: string;
  severity: string;
  summary: string;
  objective: string;
  symptoms: string[];
  businessImpact: string[];
  errorTypes: {
    error: string;
    meaning: string;
    likelyCauses: string[];
  }[];
  rootCauses: string[];
  diagnosticCommands: SSHCommand[];
  troubleshootingSteps: SSHTroubleshootingStep[];
  rootCauseScenarios: SSHRootCause[];
  incidentScenario: SSHIncidentScenario;
  verification: string[];
  prevention: string[];
  monitoring: string[];
  safetyRules: string[];
  incidentReportTemplate: string[];
  troubleshootingChecklist: string[];
}

export const linuxSSHConnectionTroubleshooting: LinuxSSHTroubleshootingRunbook = {
  id: "linux-ssh-connection-refused-timeout",
  title: "SSH Connection Refused or Timed Out",
  category: "Linux Troubleshooting",
  severity: "High / Critical",

  summary:
    "SSH connection failures can occur because the SSH daemon is stopped, the server is unreachable, " +
    "the destination port is blocked, firewall rules reject traffic, routing is broken, or the server " +
    "is listening on a different address or port. Authentication failures are a separate stage and " +
    "must be diagnosed using the actual SSH error.",

  objective:
    "Restore secure SSH access by identifying whether the failure is caused by network reachability, " +
    "TCP connection handling, sshd configuration, firewall policy, or authentication. Preserve existing " +
    "access and avoid locking administrators out while making changes.",

  symptoms: [
    "SSH hangs and eventually reports Connection timed out.",
    "SSH immediately reports Connection refused.",
    "SSH reports Permission denied (publickey).",
    "SSH reports No route to host.",
    "SSH connects from one network but fails from another.",
    "SSH works through a private IP but fails through a public IP.",
    "A server becomes unreachable after a firewall or network change.",
    "A Linux VM becomes inaccessible after reboot.",
    "SSH works on port 2222 but not on port 22, or vice versa.",
    "Automated deployments fail because the remote SSH connection cannot be established.",
    "An SSH connection drops after a long idle period.",
  ],

  businessImpact: [
    "Administrators may lose remote server access.",
    "Production incident response may be delayed.",
    "Deployment pipelines may fail.",
    "Scheduled automation may be unable to reach target hosts.",
    "A network or firewall misconfiguration may affect multiple servers.",
    "Incorrect remediation can expose SSH publicly or lock out all administrators.",
  ],

  errorTypes: [
    {
      error: "Connection refused",
      meaning:
        "The TCP connection attempt was actively rejected, often because no process is listening on the target port or a firewall/network device is rejecting the connection.",
      likelyCauses: [
        "sshd is stopped.",
        "sshd listens on another port or address.",
        "A firewall explicitly rejects the connection.",
        "The client is connecting to the wrong host or port.",
      ],
    },
    {
      error: "Connection timed out",
      meaning:
        "The client did not receive a timely response to the connection attempt.",
      likelyCauses: [
        "A firewall or cloud security rule silently drops traffic.",
        "Routing or VPN connectivity is broken.",
        "The destination host is unavailable.",
        "The source IP is not permitted.",
        "The server or network path is experiencing a serious problem.",
      ],
    },
    {
      error: "Permission denied (publickey)",
      meaning:
        "The SSH server was reached, but public-key authentication was not accepted.",
      likelyCauses: [
        "The wrong username or private key was supplied.",
        "The public key is missing from authorized_keys.",
        "Home-directory or SSH-file permissions are incorrect.",
        "The account or SSH authentication policy blocks access.",
      ],
    },
    {
      error: "No route to host",
      meaning:
        "The operating system or network path reports that the destination cannot currently be reached.",
      likelyCauses: [
        "Missing or incorrect routing.",
        "VPN or private-network connectivity is unavailable.",
        "A host or network is unreachable.",
        "A firewall may be returning an unreachable response.",
      ],
    },
    {
      error: "Host key verification failed",
      meaning:
        "The host key presented by the destination does not match the client's trusted record.",
      likelyCauses: [
        "The server was legitimately rebuilt or its host keys were rotated.",
        "The client is reaching a different server than expected.",
        "A DNS or routing change redirected the connection.",
        "A possible interception or impersonation attempt needs investigation.",
      ],
    },
  ],

  rootCauses: [
    "OpenSSH server package is missing.",
    "The sshd service is stopped or failed.",
    "The daemon listens on a different port or IP address.",
    "The SSH configuration contains invalid directives.",
    "The host firewall blocks incoming SSH traffic.",
    "Cloud security groups, network ACLs, or firewall policies block the connection.",
    "The client is using an incorrect public IP, private IP, hostname, or port.",
    "Routing, VPN, subnet, or gateway configuration is incorrect.",
    "The source IP is not allowlisted.",
    "The server is overloaded or unavailable.",
    "The client uses the wrong username, key, or authentication method.",
    "SSH directory, private-key, or authorized_keys permissions are incorrect.",
    "Fail2ban or another security control blocks the source.",
    "DNS resolves the hostname to an unexpected address.",
  ],

  diagnosticCommands: [
    {
      title: "1. Test SSH with verbose client logging",
      command: "ssh -vvv -o ConnectTimeout=10 user@server.example.com",
      purpose:
        "Identify the connection stage where SSH fails.",
      expectedOutput:
        "OpenSSH debug messages showing name resolution, connection attempts, key exchange, and authentication",
      interpretation:
        "Illustrative description. If it fails before TCP connection, investigate networking and the destination port. " +
        "If authentication begins, investigate usernames, keys, and server authentication policy.",
    },
    {
      title: "2. Test TCP port reachability",
      command: "nc -vz -w 5 server.example.com 22",
      purpose:
        "Check whether a TCP connection to the expected SSH port can be established.",
      expectedOutput:
        "Connection to server.example.com 22 port [tcp/ssh] succeeded!",
      interpretation:
        "Illustrative output. Success proves TCP connectivity to that endpoint at that time, not successful SSH authentication. " +
        "nc may not be installed on every system.",
    },
    {
      title: "3. Check the server's IP addresses",
      command: "ip -br address",
      purpose:
        "Confirm the server has the expected network interfaces and IP addresses.",
      expectedOutput:
        "lo       UNKNOWN 127.0.0.1/8\n" +
        "ens160   UP      192.0.2.10/24",
      interpretation:
        "Illustrative output using a documentation-only IP range. Confirm the actual server address and interface state.",
    },
    {
      title: "4. Inspect routing",
      command: "ip route",
      purpose:
        "Check the server's routes and default gateway.",
      expectedOutput:
        "default via 192.0.2.1 dev ens160\n" +
        "192.0.2.0/24 dev ens160 proto kernel scope link",
      interpretation:
        "Illustrative output. A missing or incorrect route can break reachability. Check both the client-side and server-side paths.",
    },
    {
      title: "5. Check the SSH daemon",
      command: "sudo systemctl status sshd --no-pager -l",
      purpose:
        "Determine whether the SSH daemon is active and inspect recent failure messages.",
      expectedOutput:
        "sshd.service - OpenSSH server daemon\n" +
        "Active: active (running)",
      interpretation:
        "Some distributions use ssh.service rather than sshd.service. Use the service name appropriate for the host.",
    },
    {
      title: "6. Inspect listening TCP sockets",
      command: "sudo ss -ltnp",
      purpose:
        "Check whether sshd is listening on the expected port and address.",
      expectedOutput:
        "LISTEN 0 128 0.0.0.0:22 0.0.0.0:* users:((\"sshd\",pid=1234,fd=3))",
      interpretation:
        "Illustrative output. A listener bound only to loopback may not accept external connections. " +
        "A custom port or IPv6-only listener may also explain the result.",
    },
    {
      title: "7. Validate SSH server configuration",
      command: "sudo sshd -t",
      purpose:
        "Validate the server's SSH daemon configuration before applying a change or restarting the service.",
      expectedOutput:
        "No output when the configuration is valid",
      interpretation:
        "If the command reports an error, correct the indicated issue before restarting sshd. " +
        "The command may need the full path /usr/sbin/sshd on some systems.",
    },
    {
      title: "8. Inspect effective SSH configuration",
      command: "sudo sshd -T | grep -E '^(port|listenaddress|permitrootlogin|pubkeyauthentication|passwordauthentication) '",
      purpose:
        "Display selected effective SSH settings.",
      expectedOutput:
        "port 22\nlistenaddress 0.0.0.0:22\npubkeyauthentication yes",
      interpretation:
        "Illustrative output. Actual settings depend on the daemon configuration and supported directives. " +
        "Match blocks can affect effective settings for specific connections.",
    },
    {
      title: "9. Inspect host firewall rules with UFW",
      command: "sudo ufw status verbose",
      purpose:
        "Check UFW status and configured rules on systems that use UFW.",
      expectedOutput:
        "Status: active\n22/tcp ALLOW IN Anywhere",
      interpretation:
        "Illustrative output. If UFW is not installed or is not the active firewall manager, inspect the firewall system actually used by the host.",
    },
    {
      title: "10. Inspect firewalld rules",
      command: "sudo firewall-cmd --state && sudo firewall-cmd --list-all",
      purpose:
        "Inspect firewalld state and active-zone rules on systems using firewalld.",
      expectedOutput:
        "running\nservices: ssh",
      interpretation:
        "Illustrative output. Verify the active zone and interface assignment. Do not assume UFW and firewalld are both used.",
    },
    {
      title: "11. Inspect server authentication logs",
      command: "sudo journalctl -u sshd --since '-30 min' --no-pager",
      purpose:
        "Find authentication failures and daemon-side connection messages.",
      expectedOutput:
        "Failed publickey for user from 198.51.100.20 port 54321 ssh2",
      interpretation:
        "Illustrative output using a documentation-only IP range. The service unit or log destination may differ by distribution.",
    },
    {
      title: "12. Check DNS resolution from the client",
      command: "getent ahosts server.example.com",
      purpose:
        "Check which addresses the operating system resolves for the hostname.",
      expectedOutput:
        "192.0.2.10 STREAM server.example.com",
      interpretation:
        "Illustrative output. Compare the resolved address with the intended host. Check split DNS, VPN DNS, and stale records where relevant.",
    },
    {
      title: "13. Check system resource pressure",
      command: "uptime && free -h && df -hT",
      purpose:
        "Check whether high load, memory pressure, or exhausted storage may be affecting the server.",
      expectedOutput:
        "System load, memory availability, and filesystem capacity",
      interpretation:
        "These commands provide supporting evidence; they do not establish the root cause by themselves.",
    },
  ],

  troubleshootingSteps: [
    {
      step: 1,
      title: "Capture the exact SSH error",
      objective:
        "Classify the failure before changing the server.",
      actions: [
        "Record the client hostname, destination hostname/IP, port, username, and timestamp.",
        "Capture the exact error message.",
        "Run the SSH client with verbose logging.",
        "Determine whether the failure occurs during TCP connection, key exchange, or authentication.",
      ],
      commands: [
        "ssh -vvv -o ConnectTimeout=10 user@server.example.com",
      ],
      expectedResult:
        "The incident is classified as a connectivity, daemon, or authentication problem.",
      precautions: [
        "Do not share private keys or authentication secrets.",
        "Verbose logs may expose usernames, hostnames, and network addresses; redact sensitive details.",
      ],
    },
    {
      step: 2,
      title: "Verify destination and port",
      objective:
        "Ensure the client is connecting to the correct host and SSH port.",
      actions: [
        "Confirm the server's intended public or private IP.",
        "Resolve the hostname and compare it with the expected address.",
        "Confirm whether SSH uses port 22 or a documented custom port.",
        "Check whether a VPN or bastion host is required.",
      ],
      commands: [
        "getent ahosts server.example.com",
        "nc -vz -w 5 server.example.com 22",
      ],
      expectedResult:
        "The correct endpoint and intended SSH port are known.",
      precautions: [
        "Do not assume that a private IP is reachable from the public internet.",
        "Use approved network access paths for production hosts.",
      ],
    },
    {
      step: 3,
      title: "Check client-side network reachability",
      objective:
        "Determine whether routing, VPN, or local network restrictions block access.",
      actions: [
        "Confirm the client has the expected network connection.",
        "Check VPN status if the server is private.",
        "Inspect local routing and DNS resolution.",
        "Compare connectivity from an approved second host or network.",
      ],
      commands: [
        "ip route",
        "nc -vz -w 5 server.example.com 22",
      ],
      expectedResult:
        "The client has a viable route to the destination or the network issue is isolated.",
      precautions: [
        "ICMP ping failure alone does not prove that SSH is unavailable.",
        "Do not bypass corporate network security controls.",
      ],
    },
    {
      step: 4,
      title: "Use console access if SSH is unavailable",
      objective:
        "Inspect the server directly when remote access cannot be established.",
      actions: [
        "Use an approved cloud serial console, hypervisor console, physical console, or out-of-band management method.",
        "Confirm the server is powered on and the operating system has booted.",
        "Check network interfaces and addresses.",
        "Inspect SSH service state and server logs.",
      ],
      commands: [
        "ip -br address",
        "ip route",
        "systemctl status sshd --no-pager -l",
      ],
      expectedResult:
        "The server's operating state and SSH daemon status can be inspected independently of the failed remote connection.",
      precautions: [
        "Do not assume the SSH session itself is available to repair SSH.",
        "Use authorized console access and follow the provider's recovery procedure.",
      ],
    },
    {
      step: 5,
      title: "Verify the SSH daemon",
      objective:
        "Check whether the daemon is installed, running, and listening on the expected port.",
      actions: [
        "Check the service state.",
        "Review daemon logs.",
        "Inspect listening sockets.",
        "Verify the configured port and listen addresses.",
      ],
      commands: [
        "systemctl status sshd --no-pager -l",
        "sudo ss -ltnp",
        "sudo journalctl -u sshd -b --no-pager -n 100",
      ],
      expectedResult:
        "The daemon is healthy and listening on the intended interface and port.",
      precautions: [
        "On Debian or Ubuntu, the service may be named ssh rather than sshd.",
        "Do not change the port without updating relevant network and firewall rules.",
      ],
    },
    {
      step: 6,
      title: "Check host and cloud firewalls",
      objective:
        "Identify network rules that reject or drop incoming SSH traffic.",
      actions: [
        "Inspect the host firewall manager and active rules.",
        "Review cloud security groups or equivalent virtual firewall rules.",
        "Check network ACLs, route tables, and subnet policies where applicable.",
        "Confirm the allowed source IP and destination port.",
      ],
      commands: [
        "sudo ufw status verbose",
        "sudo firewall-cmd --list-all",
      ],
      expectedResult:
        "The relevant host and network policies allow SSH from the intended administrative source.",
      precautions: [
        "Use only the firewall tool that applies to the host.",
        "Do not expose SSH to all internet addresses unless explicitly justified and approved.",
        "Preserve existing administrative access before applying firewall changes.",
      ],
    },
    {
      step: 7,
      title: "Validate SSH configuration safely",
      objective:
        "Find invalid directives or incorrect listener settings.",
      actions: [
        "Inspect sshd_config and any included configuration files.",
        "Check the configured port and listen addresses.",
        "Validate the configuration before reloading or restarting.",
        "Keep the existing session open while testing a new connection.",
      ],
      commands: [
        "sudo sshd -t",
        "sudo sshd -T | grep -E '^(port|listenaddress|pubkeyauthentication|passwordauthentication) '",
      ],
      expectedResult:
        "The configuration is valid and matches the intended access policy.",
      precautions: [
        "A change to Port or ListenAddress can immediately disrupt remote access.",
        "Use the service's supported reload procedure where possible.",
        "Never close the last working administrative session until a new connection is verified.",
      ],
    },
    {
      step: 8,
      title: "Troubleshoot authentication failures",
      objective:
        "Resolve login problems when the TCP connection and SSH handshake succeed.",
      actions: [
        "Confirm the username and intended identity file.",
        "Use verbose client output to identify which keys are offered.",
        "Check the server user's authorized_keys file and home-directory permissions.",
        "Review server authentication logs and account policy.",
      ],
      commands: [
        "ssh -vvv -i ~/.ssh/id_ed25519 user@server.example.com",
        "ls -ld ~/.ssh",
        "ls -l ~/.ssh/authorized_keys",
      ],
      expectedResult:
        "The correct account and authentication method are used, and the server accepts the intended credentials.",
      precautions: [
        "Never copy a private key into authorized_keys; that file should contain public keys.",
        "Do not weaken authentication policy as a quick workaround.",
        "Do not overwrite an existing authorized_keys file without preserving required entries.",
      ],
    },
    {
      step: 9,
      title: "Apply the smallest approved fix",
      objective:
        "Correct the confirmed network, daemon, firewall, or authentication issue.",
      actions: [
        "Change one confirmed cause at a time.",
        "Validate configuration before applying daemon changes.",
        "Update firewall or cloud network rules only for the intended source and port.",
        "Document the change and maintain a rollback plan.",
      ],
      expectedResult:
        "The underlying cause is corrected without weakening unrelated security controls.",
      precautions: [
        "Do not disable the firewall entirely to test SSH.",
        "Do not enable root login or password authentication without a security review.",
      ],
    },
    {
      step: 10,
      title: "Verify remote access and service health",
      objective:
        "Confirm that SSH access is restored and remains secure.",
      actions: [
        "Open a new SSH connection from the original approved client.",
        "Confirm the expected user and host identity.",
        "Verify the service remains healthy after any configuration change.",
        "Check logs for recurring connection or authentication failures.",
        "Update monitoring and the incident record.",
      ],
      commands: [
        "ssh -o ConnectTimeout=10 user@server.example.com",
        "sudo systemctl status sshd --no-pager -l",
      ],
      expectedResult:
        "A new authorized SSH connection succeeds and the server remains reachable.",
      precautions: [
        "Use the correct service name for the Linux distribution.",
        "Keep a recovery console available until access is confirmed.",
      ],
    },
  ],

  rootCauseScenarios: [
    {
      cause: "SSH daemon is stopped",
      symptoms: [
        "Connection attempts are refused.",
        "The expected SSH port has no listener.",
        "The SSH service is inactive or failed.",
      ],
      investigation: [
        "Check the service status.",
        "Review startup logs.",
        "Validate the daemon configuration.",
      ],
      resolution: [
        "Correct the underlying configuration or package issue.",
        "Start the daemon through the approved service manager.",
        "Verify the expected port is listening.",
      ],
    },
    {
      cause: "Cloud security group or firewall blocks SSH",
      symptoms: [
        "The connection times out from a remote network.",
        "The instance appears healthy in the cloud console.",
        "SSH may work from a permitted network but fail from another.",
      ],
      investigation: [
        "Check inbound rules for the instance or network interface.",
        "Verify the source IP, destination port, subnet, and routing.",
        "Inspect network ACLs and host firewall rules.",
      ],
      resolution: [
        "Add or correct the minimum required rule for the approved administrative source.",
        "Confirm return routing and any stateless ACL requirements.",
        "Retest from the authorized client.",
      ],
    },
    {
      cause: "SSH daemon listens on a different port",
      symptoms: [
        "Port 22 refuses connections but another configured port responds.",
        "The daemon is active but no listener appears on port 22.",
      ],
      investigation: [
        "Inspect the effective SSH configuration.",
        "Check listening sockets.",
        "Review firewall and cloud rules for the configured port.",
      ],
      resolution: [
        "Connect using the documented port or restore the intended configuration.",
        "Update all relevant firewall rules consistently.",
        "Validate the new connection before ending the recovery session.",
      ],
    },
    {
      cause: "Incorrect key or username",
      symptoms: [
        "The server is reachable but authentication fails.",
        "The client reports Permission denied (publickey).",
      ],
      investigation: [
        "Confirm the username and identity file.",
        "Use verbose SSH output to inspect key offering.",
        "Check authorized_keys and server-side authentication logs.",
      ],
      resolution: [
        "Use the correct account and private key.",
        "Restore the intended public key entry if authorized.",
        "Correct restrictive file permissions where needed.",
      ],
    },
    {
      cause: "Routing or VPN failure",
      symptoms: [
        "Private hosts time out from outside the VPN.",
        "Several hosts in the same subnet become unreachable.",
      ],
      investigation: [
        "Check VPN status and client routes.",
        "Inspect server and network route tables.",
        "Check gateway and subnet configuration.",
      ],
      resolution: [
        "Restore the approved VPN or routing configuration.",
        "Confirm bidirectional reachability.",
        "Retest SSH through the intended access path.",
      ],
    },
    {
      cause: "DNS resolves to the wrong server",
      symptoms: [
        "The hostname reaches an unexpected IP address.",
        "SSH works when connecting to the correct IP directly.",
        "Host-key warnings appear after a DNS or infrastructure change.",
      ],
      investigation: [
        "Resolve the hostname from the affected client.",
        "Compare the result with the authoritative server address.",
        "Review DNS changes and network routing.",
      ],
      resolution: [
        "Correct the DNS record or client configuration through the approved process.",
        "Verify the destination's host key through a trusted channel.",
        "Retest the hostname after DNS propagation.",
      ],
    },
  ],

  incidentScenario: {
    environment:
      "Illustrative scenario: a Linux virtual machine hosts a production application in a private cloud subnet.",

    incident:
      "The operations team cannot SSH to the server after a network security change.",

    impact: [
      "Administrators cannot access the VM remotely.",
      "A planned deployment is delayed.",
      "Incident response is slowed until an alternative access method is available.",
    ],

    investigation: [
      "The engineer captures the client-side Connection timed out error.",
      "The team confirms that the instance is running and has the expected private IP.",
      "The engineer uses the approved cloud console to inspect the host.",
      "The SSH daemon is active and listening on port 22.",
      "The team reviews cloud security rules and discovers that the administrative source range was removed.",
    ],

    rootCause:
      "A network rule change unintentionally blocked SSH traffic from the approved administrative network.",

    resolution: [
      "The change owner reviews the affected network policy.",
      "The approved administrative source range is restored for TCP port 22.",
      "The team confirms the route and host firewall remain correct.",
      "A new SSH session succeeds from the approved client.",
      "The network change is documented and the rule is added to configuration review.",
    ],

    prevention: [
      "Review network changes for administrative access impact.",
      "Keep approved console or out-of-band recovery access.",
      "Monitor SSH reachability from an authorized management network.",
      "Use infrastructure as code and peer review for cloud firewall rules.",
    ],
  },

  verification: [
    "The correct hostname resolves to the expected address.",
    "The intended TCP port is reachable from the approved client.",
    "The SSH daemon is active and listening on the intended address and port.",
    "Host and cloud firewall policies allow the approved connection.",
    "A new SSH session succeeds with the intended account and authentication method.",
    "The destination host key is verified through a trusted method.",
    "The original access problem no longer appears in relevant logs.",
    "Administrative access remains restricted to approved sources.",
  ],

  prevention: [
    "Use infrastructure as code for security groups and network ACLs.",
    "Document the intended SSH port and administrative source ranges.",
    "Monitor daemon health and reachability from an approved management network.",
    "Keep a tested recovery console or out-of-band access path.",
    "Validate SSH configuration before applying changes.",
    "Maintain secure public-key authentication and least-privilege accounts.",
    "Review DNS and routing changes before production rollout.",
    "Keep firewall changes under version control and peer review.",
    "Test remote access after planned reboots and network changes.",
  ],

  monitoring: [
    "Monitor SSH daemon state and listener availability.",
    "Run TCP reachability checks from an approved management network.",
    "Alert on repeated SSH authentication failures where appropriate.",
    "Monitor changes to cloud security groups and host firewall rules.",
    "Correlate access failures with DNS, routing, VPN, and deployment changes.",
    "Avoid exposing administrative access more broadly than necessary.",
  ],

  safetyRules: [
    "Never disable the firewall entirely as a routine troubleshooting step.",
    "Never expose SSH to all internet addresses without explicit approval and risk assessment.",
    "Do not enable root login or weaker authentication merely to bypass an access problem.",
    "Keep an existing working session open while changing SSH configuration.",
    "Run sshd -t before applying server configuration changes.",
    "Investigate host-key changes through a trusted channel before accepting them.",
    "Do not share private keys, passwords, or sensitive verbose logs.",
    "Use authorized console access when network-based SSH is unavailable.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Date and time detected:",
    "Affected host and environment:",
    "Client source network:",
    "Destination hostname and IP:",
    "SSH port:",
    "Exact error message:",
    "Failure stage: DNS / routing / TCP / SSH handshake / authentication:",
    "Daemon status and listening address:",
    "Host firewall findings:",
    "Cloud network rule findings:",
    "Root cause:",
    "Corrective action:",
    "Successful reconnection timestamp:",
    "Preventive action and owner:",
  ],

  troubleshootingChecklist: [
    "Captured the exact SSH error.",
    "Confirmed destination hostname, IP, port, and username.",
    "Checked DNS and network reachability.",
    "Used console access if SSH was completely unavailable.",
    "Checked SSH daemon status and listening sockets.",
    "Validated sshd configuration.",
    "Reviewed host firewall and cloud network rules.",
    "Checked routing, VPN, and source-IP restrictions.",
    "Investigated authentication only after connectivity was confirmed.",
    "Applied the smallest approved fix.",
    "Verified a new SSH connection and secure access policy.",
    "Documented the incident and preventive actions.",
  ],
};

export default linuxSSHConnectionTroubleshooting;
