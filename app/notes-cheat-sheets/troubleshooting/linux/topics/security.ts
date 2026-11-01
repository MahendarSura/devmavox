import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Linux Security Administration and Production Hardening",
  description: "Practical Linux security guide covering system hardening, SSH, identity management, permissions, sudo, ACLs, SELinux, firewall, patching, vulnerability management, auditing, malware investigation, incident response, and production security troubleshooting.",

  sections: [
    {
      heading: "1. Introduction to Linux Security",
      explanation: "Linux security is the process of protecting operating systems, applications, users, network services, and business data from unauthorized access, misuse, modification, and disruption. Production security is based on multiple defensive layers: authentication, authorization, least privilege, patch management, network filtering, process isolation, logging, monitoring, backup, and incident response. Security is not a single package or command. It is a continuous operational practice. Administrators must understand which services are exposed, who can access the server, what permissions are granted, how secrets are stored, and how suspicious activity is detected. A secure server should have a documented baseline and a controlled change process.",
      steps: [
        "Identify critical servers, applications, and sensitive data.",
        "Inventory users, groups, services, packages, and listening ports.",
        "Apply a secure operating-system baseline.",
        "Restrict access using least privilege.",
        "Patch supported operating systems and applications.",
        "Configure firewall and security monitoring.",
        "Protect backups, credentials, and configuration files.",
        "Review security controls continuously."
      ],
      commands: [
        "cat /etc/os-release",
        "hostnamectl",
        "who",
        "w",
        "getent passwd",
        "ss -lntup",
        "systemctl --type=service --state=running",
        "sudo -l"
      ],
      problems: [
        {
          issue: "A production server exposes unnecessary services.",
          rootCause: "The server was deployed without reviewing its listening ports and enabled services.",
          solution: "Inventory listening sockets, identify service owners, disable only confirmed unnecessary services through change control, and verify application functionality."
        },
        {
          issue: "Multiple administrators share one root password.",
          rootCause: "Individual account management and privileged access controls are missing.",
          solution: "Create named accounts, use controlled sudo access, protect authentication, and audit privileged activity."
        }
      ]
    },
    {
      heading: "2. Linux Security Architecture and Defense in Depth",
      explanation: "Linux security is implemented across several layers. Physical and cloud infrastructure controls protect the host boundary. The kernel enforces process isolation, memory protection, capabilities, namespaces, and access controls. Users and groups determine identity. File permissions, ACLs, and mandatory access control determine resource access. Firewalls restrict network communication. Application security controls protect application-specific resources. Logging and auditing provide evidence for investigation. Defense in depth means that one failed control should not automatically expose the entire system. For example, a compromised web process should not automatically receive root privileges or unrestricted access to database files.",
      steps: [
        "Protect the cloud account or physical infrastructure.",
        "Harden the operating system and kernel configuration.",
        "Apply user, group, and privilege restrictions.",
        "Protect files and directories.",
        "Restrict inbound and outbound network access.",
        "Isolate application processes.",
        "Collect security events and audit records.",
        "Test controls and review exceptions."
      ],
      commands: [
        "uname -r",
        "sysctl -a",
        "id",
        "getfacl /etc",
        "getenforce",
        "ss -lntup",
        "nft list ruleset",
        "journalctl -p warning -b"
      ],
      problems: [
        {
          issue: "A compromised application account can access unrelated system files.",
          rootCause: "The application runs with excessive privileges or broad filesystem permissions.",
          solution: "Use a dedicated service account, restrict directory access, review capabilities, and enforce mandatory access controls."
        },
        {
          issue: "A firewall exists but sensitive application ports remain exposed.",
          rootCause: "Firewall policy, cloud security rules, and service binding addresses were not reviewed together.",
          solution: "Review host firewall rules, cloud network controls, listening sockets, and external reachability."
        }
      ]
    },
    {
      heading: "3. Production Server Security Hardening",
      explanation: "Server hardening reduces the attack surface by removing unnecessary software, disabling unused services, restricting network exposure, enforcing secure authentication, and applying supported security updates. A hardening baseline should be suitable for the server role. A database server and a public web server do not need identical firewall rules or installed packages. Administrators should test changes before applying them to production because an overly restrictive setting can interrupt legitimate business operations. Hardening must be documented, measurable, and periodically reviewed.",
      steps: [
        "Identify the server role and required services.",
        "Remove or disable unnecessary packages and services.",
        "Apply approved operating-system security updates.",
        "Restrict administrative access.",
        "Configure firewall rules for required traffic only.",
        "Set secure file and directory permissions.",
        "Enable appropriate auditing and monitoring.",
        "Validate application functionality after hardening."
      ],
      commands: [
        "systemctl --type=service --state=running",
        "systemctl list-unit-files --state=enabled",
        "ss -lntup",
        "rpm -qa",
        "dpkg -l",
        "getenforce",
        "sysctl -a",
        "sudo -l"
      ],
      problems: [
        {
          issue: "An application stops working after server hardening.",
          rootCause: "A required port, service, permission, or security policy was changed without dependency validation.",
          solution: "Review change history and application logs, identify the blocked dependency, and adjust the policy narrowly through an approved change."
        },
        {
          issue: "A server has many outdated packages.",
          rootCause: "Patch ownership, maintenance windows, and vulnerability tracking are not defined.",
          solution: "Establish patch management, prioritize security advisories, test updates, and maintain compliance reports."
        }
      ]
    },
    {
      heading: "4. User and Group Security Management",
      explanation: "Linux uses user and group identities to determine ownership and access. Each account has a UID, and each group has a GID. Production systems should use individual administrator accounts rather than shared identities. Applications should run under dedicated non-login service accounts where possible. Account lifecycle management includes creation, access approval, password or key configuration, periodic review, and removal when access is no longer required. Administrators should also inspect system accounts and ensure that privileged UID 0 access is restricted.",
      steps: [
        "Identify the business owner of each account.",
        "Review UID, GID, groups, and login shell.",
        "Create individual accounts for administrators.",
        "Use dedicated service accounts for applications.",
        "Grant only required supplementary groups.",
        "Review inactive and unnecessary accounts.",
        "Remove access when users leave or change roles.",
        "Audit privileged accounts regularly."
      ],
      commands: [
        "id username",
        "getent passwd username",
        "getent group",
        "who",
        "last",
        "sudo useradd -m username",
        "sudo usermod -aG developers username",
        "sudo passwd -l username",
        "sudo userdel username"
      ],
      problems: [
        {
          issue: "A user can access a production application without current approval.",
          rootCause: "Account reviews and access removal are not part of the employee lifecycle.",
          solution: "Confirm account ownership, disable unauthorized access, review group memberships, and introduce periodic access certification."
        },
        {
          issue: "A service runs using a human administrator account.",
          rootCause: "The application was deployed without a dedicated service identity.",
          solution: "Create a dedicated service account, migrate ownership and service configuration carefully, and verify application operation."
        }
      ]
    },
    {
      heading: "5. Password Policy and Authentication Security",
      explanation: "Authentication verifies the identity of a user or service. Linux authentication may involve local passwords, SSH keys, PAM modules, directory services, and multi-factor authentication through supported integrations. Production password policy should address password quality, failed login attempts, account lifecycle, privileged access, and secure secret storage. Password aging settings should follow organizational policy rather than arbitrary values. Password hashes belong in protected system files, and plaintext credentials must not be stored in scripts, command history, or source repositories.",
      steps: [
        "Review authentication methods and PAM configuration.",
        "Enforce organizational password requirements.",
        "Protect password hash files.",
        "Restrict privileged and remote authentication.",
        "Use MFA where supported.",
        "Monitor failed and unusual login attempts.",
        "Rotate exposed credentials immediately.",
        "Review service credentials and secret storage."
      ],
      commands: [
        "passwd -S username",
        "chage -l username",
        "getent shadow username",
        "sudo chmod 600 /etc/shadow",
        "grep -v '^#' /etc/pam.d/common-auth",
        "journalctl -u sshd",
        "lastb",
        "faillock --user username"
      ],
      problems: [
        {
          issue: "A user account experiences repeated failed login attempts.",
          rootCause: "A forgotten credential, automated brute-force attempt, or unauthorized access attempt may be occurring.",
          solution: "Inspect authentication logs, verify the user, apply approved account controls, and investigate the source of repeated failures."
        },
        {
          issue: "A password appears inside a deployment script.",
          rootCause: "Secrets were embedded directly in automation instead of using a secure secret-management mechanism.",
          solution: "Remove the exposed secret, rotate it, use an approved secret store, and prevent credentials from entering source control."
        }
      ]
    },
    {
      heading: "6. SSH Hardening and Secure Remote Access",
      explanation: "SSH provides encrypted remote administration and file transfer. Production SSH security requires controlled user access, key management, secure host verification, appropriate cryptographic settings, and monitoring. The sshd configuration can restrict root login, password authentication, allowed users, forwarding, and authentication attempts. Changes must be validated before reloading SSH because an incorrect configuration can lock administrators out. Always maintain an approved alternate access path or console before changing remote authentication settings on a production server.",
      steps: [
        "Identify authorized SSH administrators.",
        "Use protected SSH keys or approved authentication methods.",
        "Review root login and password authentication settings.",
        "Restrict allowed users or groups where appropriate.",
        "Validate SSH configuration syntax.",
        "Keep an existing session open during controlled changes.",
        "Reload SSH using the distribution's service name.",
        "Test a new connection before closing the existing session."
      ],
      commands: [
        "sshd -t",
        "sshd -T",
        "systemctl status sshd",
        "systemctl status ssh",
        "ssh -v username@server",
        "ssh-keygen -t ed25519",
        "chmod 700 ~/.ssh",
        "chmod 600 ~/.ssh/authorized_keys",
        "journalctl -u sshd"
      ],
      problems: [
        {
          issue: "SSH access fails after changing sshd_config.",
          rootCause: "A syntax error, invalid directive, incorrect permission, or authentication setting may prevent access.",
          solution: "Use console or an existing session, run sshd -t, correct the configuration, and test a new connection before ending the session."
        },
        {
          issue: "An SSH private key is rejected by the server.",
          rootCause: "Incorrect file permissions, wrong username, missing public key, or wrong key selection.",
          solution: "Check client verbose output, authorized_keys content, ownership, permissions, and server authentication logs."
        }
      ]
    },
    {
      heading: "7. File Permissions, Ownership, and Special Bits",
      explanation: "Linux file permissions control read, write, and execute access for the owner, group, and others. Ownership and permissions are fundamental security boundaries. Directories require execute permission for traversal, and write permission can allow creation or removal of entries. Special permission bits include setuid, setgid, and sticky bit. These features must be understood before changing permissions on production files. Broad commands such as chmod -R 777 can expose sensitive data and create serious security problems. Administrators should apply the minimum required permission and verify the result.",
      steps: [
        "Inspect file owner and group.",
        "Review symbolic and numeric permission values.",
        "Check parent directory traversal permissions.",
        "Identify special permission bits.",
        "Apply the narrowest required permission.",
        "Verify application access after changes.",
        "Review sensitive configuration and key files.",
        "Document permission exceptions."
      ],
      commands: [
        "ls -l /path/to/file",
        "stat /path/to/file",
        "namei -l /path/to/file",
        "chmod 640 /path/to/file",
        "chmod 750 /path/to/directory",
        "chown appuser:appgroup /path/to/file",
        "find /path -type f -perm -4000",
        "find /path -type f -perm -0002"
      ],
      problems: [
        {
          issue: "An application receives Permission denied while reading a configuration file.",
          rootCause: "File ownership, group membership, parent directory traversal, or security policy may block access.",
          solution: "Inspect the full path with namei -l, verify the service identity, and grant only the required access."
        },
        {
          issue: "Sensitive files are readable by every local user.",
          rootCause: "Overly broad permissions were applied during deployment or manual maintenance.",
          solution: "Identify the intended owner and readers, correct ownership and permissions, and audit similar files."
        }
      ]
    },
    {
      heading: "8. Sudo and Privileged Access Control",
      explanation: "sudo allows approved users to execute specific commands with elevated privileges. It provides a more controlled alternative to sharing the root password. The sudoers policy can define users, groups, command scope, and permitted target identities. Rules should be as narrow as possible. Avoid unrestricted passwordless sudo unless explicitly justified and approved. Use visudo to edit policy because it validates syntax before saving. Privileged command activity should be logged and periodically reviewed.",
      steps: [
        "Identify which administrative tasks require elevation.",
        "Create an appropriate administrative group.",
        "Grant only required commands and target identities.",
        "Use visudo for sudoers changes.",
        "Avoid unnecessary unrestricted privileges.",
        "Review sudo logs and command history.",
        "Remove access when responsibilities change.",
        "Test both permitted and denied commands."
      ],
      commands: [
        "sudo -l",
        "visudo",
        "visudo -c",
        "getent group sudo",
        "getent group wheel",
        "journalctl | grep sudo",
        "grep sudo /var/log/auth.log",
        "grep sudo /var/log/secure"
      ],
      problems: [
        {
          issue: "A user receives an error that they are not allowed to run sudo.",
          rootCause: "The user is not included in the approved administrative policy or the group membership has not been refreshed.",
          solution: "Verify identity and approval, review sudoers with visudo, and confirm group membership."
        },
        {
          issue: "A sudoers change prevents privileged commands from working.",
          rootCause: "Invalid policy syntax or an incorrect rule was introduced.",
          solution: "Use an existing root or recovery session, validate with visudo -c, and restore the last approved policy."
        }
      ]
    },
    {
      heading: "9. ACL and Advanced Filesystem Access",
      explanation: "Access Control Lists provide more detailed permissions than the standard owner-group-other model. ACLs can grant or deny practical access to specific users and groups without changing the primary group ownership. They are useful when multiple teams or services need controlled access to shared directories. Default ACLs can define permissions inherited by newly created objects. Administrators must understand the ACL mask because it limits the effective permissions of named users and groups. ACL changes should be checked using getfacl and tested using the actual service identity.",
      steps: [
        "Inspect existing ACL entries.",
        "Identify the users and groups requiring access.",
        "Grant the minimum necessary ACL permissions.",
        "Set default ACLs for shared directories when needed.",
        "Review ACL masks and effective permissions.",
        "Test access as the intended user.",
        "Document nonstandard access rules.",
        "Remove obsolete ACL entries."
      ],
      commands: [
        "getfacl /shared/project",
        "setfacl -m u:developer:rx /shared/project",
        "setfacl -m g:operations:rwX /shared/project",
        "setfacl -d -m g:developers:rwx /shared/project",
        "setfacl -x u:developer /shared/project",
        "setfacl -b /shared/project",
        "namei -l /shared/project",
        "sudo -u appuser test -r /shared/project/file"
      ],
      problems: [
        {
          issue: "A named user has an ACL entry but still cannot access a file.",
          rootCause: "The ACL mask, parent directory permissions, or mandatory access control may restrict effective access.",
          solution: "Inspect getfacl output, parent directory traversal, and SELinux policy; test with the actual user identity."
        },
        {
          issue: "New files in a shared directory do not receive expected group access.",
          rootCause: "Default ACLs or directory group inheritance are not configured correctly.",
          solution: "Review default ACLs and setgid behavior, then test file creation with the actual application account."
        }
      ]
    },
    {
      heading: "10. Firewall and Network Security",
      explanation: "A firewall controls which network connections are allowed or denied. Linux environments may use nftables, iptables compatibility tools, firewalld, or UFW depending on distribution and configuration. Cloud servers may also have security groups and network ACLs. Firewall policy should follow least privilege: allow only required sources, destinations, protocols, and ports. Administrators must understand existing rules before modifying them. Remote firewall changes can disconnect management access, so preserve a recovery path and test rules carefully.",
      steps: [
        "Inventory listening ports and service owners.",
        "Identify required application traffic.",
        "Review existing firewall rules.",
        "Allow required management and application sources.",
        "Avoid exposing unnecessary ports.",
        "Check cloud-level network controls.",
        "Validate access from expected and unexpected sources.",
        "Document firewall changes."
      ],
      commands: [
        "ss -lntup",
        "firewall-cmd --state",
        "firewall-cmd --list-all",
        "ufw status verbose",
        "nft list ruleset",
        "iptables -S",
        "ip route",
        "nc -vz server.example.com 443"
      ],
      problems: [
        {
          issue: "An application port is listening but remote clients cannot connect.",
          rootCause: "Host firewall, cloud security group, routing, or network ACL may block traffic.",
          solution: "Test the connection from both sides and inspect each network control without opening unnecessary ports."
        },
        {
          issue: "An administrator loses SSH access after firewall changes.",
          rootCause: "The management connection was not included in the updated policy.",
          solution: "Use console or approved out-of-band access, restore the required management rule, and introduce pre-change validation."
        }
      ]
    },
    {
      heading: "11. SELinux and Mandatory Access Control",
      explanation: "SELinux is a mandatory access control system that applies security policy beyond standard Linux permissions. It uses labels and policy rules to control how processes interact with files, ports, and other resources. SELinux can prevent a compromised or misconfigured service from accessing resources outside its allowed domain. Enforcing mode actively applies policy, permissive mode records policy violations without blocking them, and disabled mode turns SELinux off. Administrators should diagnose denials using audit logs and correct labels or policy rather than permanently disabling protection.",
      steps: [
        "Check current SELinux mode.",
        "Inspect file and process security contexts.",
        "Review AVC denial messages.",
        "Identify incorrect labels or port contexts.",
        "Use restorecon for default file contexts.",
        "Use semanage for supported policy changes.",
        "Test the application in enforcing mode.",
        "Document justified policy exceptions."
      ],
      commands: [
        "getenforce",
        "sestatus",
        "ls -Z /var/www/html",
        "ps -eZ",
        "ausearch -m AVC -ts recent",
        "restorecon -Rv /var/www/html",
        "semanage port -l",
        "getsebool -a"
      ],
      problems: [
        {
          issue: "A web server receives Permission denied despite correct Unix permissions.",
          rootCause: "SELinux context or policy may prevent the web process from accessing the content.",
          solution: "Inspect AVC denials and file contexts, apply the correct label, and verify the service under enforcing mode."
        },
        {
          issue: "An administrator disables SELinux to fix an application problem.",
          rootCause: "The underlying policy denial was not investigated.",
          solution: "Restore the approved SELinux mode, identify the denial, and correct labels or create a narrowly scoped policy exception."
        }
      ]
    },
    {
      heading: "12. Security Updates and Vulnerability Management",
      explanation: "Vulnerability management identifies, prioritizes, remediates, and verifies weaknesses in operating systems, packages, applications, and exposed services. Administrators should track vendor security advisories and understand severity, exploitability, business impact, and available fixes. Patching production systems requires testing, maintenance planning, backups where appropriate, and post-update validation. Not every vulnerability can be resolved immediately, so documented compensating controls may be necessary. Package updates alone do not replace application dependency scanning or infrastructure configuration review.",
      steps: [
        "Inventory installed packages and software versions.",
        "Review vendor security advisories.",
        "Identify affected and exposed components.",
        "Prioritize vulnerabilities based on risk.",
        "Test updates in a lower environment.",
        "Apply approved patches during a maintenance window.",
        "Verify package versions and service health.",
        "Track exceptions until remediation."
      ],
      commands: [
        "apt list --upgradable",
        "apt-get update",
        "dnf check-update",
        "dnf updateinfo list security",
        "rpm -qa --last | head",
        "dpkg -l",
        "uname -r",
        "systemctl --failed"
      ],
      problems: [
        {
          issue: "A critical vulnerability remains open on a production server.",
          rootCause: "Patch ownership, risk prioritization, or maintenance approval is unclear.",
          solution: "Assign an owner, assess exposure, schedule remediation, and apply temporary compensating controls where necessary."
        },
        {
          issue: "A security update breaks an application.",
          rootCause: "The update introduced a compatibility issue or changed a dependency.",
          solution: "Use tested rollback or recovery procedures, validate compatibility, and coordinate an approved remediation."
        }
      ]
    },
    {
      heading: "13. Linux Security Auditing and Monitoring",
      explanation: "Security auditing records important events such as authentication, privilege use, configuration changes, and access to sensitive resources. Linux auditd can record configured system events, while systemd journal and authentication logs provide additional evidence. Monitoring systems can detect unusual login patterns, changes to critical files, unexpected services, and abnormal process activity. Logs should be protected against unauthorized modification and retained according to policy. Auditing must balance visibility, storage usage, performance, and privacy requirements.",
      steps: [
        "Identify critical security events.",
        "Configure approved audit rules.",
        "Protect audit logs and permissions.",
        "Monitor authentication and sudo activity.",
        "Track changes to sensitive files.",
        "Forward relevant events to centralized logging.",
        "Review alerts and investigate anomalies.",
        "Test audit coverage periodically."
      ],
      commands: [
        "systemctl status auditd",
        "auditctl -s",
        "auditctl -l",
        "ausearch -m USER_LOGIN",
        "ausearch -m EXECVE",
        "aureport -au",
        "journalctl -p warning -b",
        "last -a"
      ],
      problems: [
        {
          issue: "A security investigation has no evidence of a privileged command.",
          rootCause: "Audit rules were missing, logs were not retained, or event forwarding failed.",
          solution: "Review audit configuration, validate event collection, protect logs, and introduce coverage testing."
        },
        {
          issue: "Audit logs consume excessive disk space.",
          rootCause: "Rules are too broad, event volume is high, or retention and rotation are misconfigured.",
          solution: "Review event requirements, tune rules carefully, configure retention, and ensure important evidence is preserved."
        }
      ]
    },
    {
      heading: "14. Malware, Suspicious Processes, and File Integrity",
      explanation: "Linux servers can be targeted by malicious scripts, compromised credentials, unauthorized binaries, cryptominers, web shells, and persistence mechanisms. Unusual CPU usage or an unknown process does not automatically prove malware, but it requires investigation. Administrators should preserve evidence, identify the process owner and executable path, inspect network connections, compare file integrity, and review recent authentication and service changes. Do not immediately delete suspicious files because that can destroy evidence. Follow the organization's security incident procedure and isolate affected systems when authorized.",
      steps: [
        "Record the alert time and affected host.",
        "Identify suspicious processes and parent processes.",
        "Inspect executable paths and file metadata.",
        "Review network connections and listening ports.",
        "Check recent logins and privileged commands.",
        "Compare critical files with trusted baselines.",
        "Preserve evidence and escalate to security responders.",
        "Rebuild or recover from trusted sources when required."
      ],
      commands: [
        "ps auxf",
        "pstree -ap",
        "ss -plant",
        "lsof -nP -i",
        "find /tmp /var/tmp -type f -mtime -2",
        "sha256sum /path/to/suspicious-file",
        "journalctl --since '1 hour ago'",
        "last -a"
      ],
      problems: [
        {
          issue: "An unknown process consumes most CPU on a production host.",
          rootCause: "It may be a legitimate workload, runaway process, cryptominer, or unauthorized executable.",
          solution: "Preserve evidence, inspect executable path and ownership, review network activity and logs, and escalate according to incident policy."
        },
        {
          issue: "A critical system binary has an unexpected checksum.",
          rootCause: "The file may have been modified by an update, administrator, corruption, or attacker.",
          solution: "Compare against a trusted package source or baseline, preserve evidence, and follow the security investigation process."
        }
      ]
    },
    {
      heading: "15. Kernel Security, sysctl, and Process Isolation",
      explanation: "The Linux kernel provides security features including memory protection, namespaces, capabilities, seccomp, and mandatory access control integration. Kernel parameters exposed through sysctl can influence networking, process behavior, and security posture. Changes must be based on supported guidance and tested because incorrect settings can affect application availability. Process isolation limits what a service can see or modify. systemd service sandboxing and container isolation can reduce the impact of a compromised application. Administrators should understand the difference between host-level kernel controls and application-specific security settings.",
      steps: [
        "Identify kernel version and supported security features.",
        "Review relevant sysctl configuration.",
        "Inspect process capabilities where appropriate.",
        "Use service sandboxing where compatible.",
        "Restrict writable paths and system access.",
        "Evaluate namespaces and seccomp for workloads.",
        "Test security changes in a lower environment.",
        "Monitor service behavior after deployment."
      ],
      commands: [
        "uname -r",
        "sysctl -a",
        "sysctl net.ipv4.ip_forward",
        "sysctl kernel.randomize_va_space",
        "capsh --print",
        "getcap -r /usr/bin",
        "systemctl cat application.service",
        "systemd-analyze security application.service"
      ],
      problems: [
        {
          issue: "A security parameter change disrupts application networking.",
          rootCause: "The parameter was changed without understanding routing or application requirements.",
          solution: "Review the previous value, validate the required network behavior, and apply a tested configuration through change control."
        },
        {
          issue: "A service has more operating-system privileges than it needs.",
          rootCause: "The service unit and process capabilities were not hardened.",
          solution: "Review required capabilities, systemd sandboxing options, writable paths, and service dependencies."
        }
      ]
    },
    {
      heading: "16. Application Secrets and Configuration Security",
      explanation: "Applications require credentials, API tokens, certificates, private keys, and connection strings. These secrets must not be embedded in source code, container images, public repositories, shell history, or unrestricted logs. Production systems should use an approved secret manager or protected configuration mechanism. File permissions and ownership should restrict access to the application identity. Secret rotation should be planned to avoid outages, and exposed credentials must be revoked or rotated promptly. Certificates should be monitored for expiration and private keys protected from unnecessary access.",
      steps: [
        "Inventory application credentials and certificates.",
        "Identify where each secret is stored and used.",
        "Remove secrets from source code and scripts.",
        "Use an approved secret-management solution.",
        "Restrict access to protected configuration files.",
        "Rotate credentials according to policy.",
        "Monitor certificate expiration.",
        "Audit logs and repositories for accidental exposure."
      ],
      commands: [
        "stat /etc/application/application.conf",
        "namei -l /etc/application/application.conf",
        "find /etc -type f -name '*.key' -o -name '*.pem'",
        "openssl x509 -in certificate.pem -noout -dates",
        "openssl x509 -in certificate.pem -noout -subject",
        "grep -RIl 'password=' /opt/application",
        "journalctl -u application.service",
        "systemctl status application.service"
      ],
      problems: [
        {
          issue: "An API token is accidentally committed to a Git repository.",
          rootCause: "Secrets are stored directly in source files and no secret scanning process exists.",
          solution: "Revoke or rotate the token, remove it from active code and repository history as appropriate, and use secure secret storage."
        },
        {
          issue: "An application cannot read its protected secret file.",
          rootCause: "Ownership, permissions, mount configuration, or service identity is incorrect.",
          solution: "Inspect the service account and full file path, then grant only the required read access."
        }
      ]
    },
    {
      heading: "17. Container and Cloud Linux Security",
      explanation: "Cloud and container environments introduce additional security boundaries. Cloud security groups, identity policies, instance roles, metadata services, storage permissions, and network controls affect the Linux host. Containers share the host kernel, so privileged containers and excessive capabilities can create significant risk. Images should come from trusted sources, use supported base images, and be scanned for vulnerabilities. Secrets should not be placed in image layers. Production containers should use non-root users where possible, restricted capabilities, resource limits, and controlled network access. Host and cloud controls must be reviewed together.",
      steps: [
        "Review cloud instance identity and permissions.",
        "Restrict inbound and outbound network access.",
        "Protect instance metadata access.",
        "Use trusted and scanned container images.",
        "Avoid privileged containers where possible.",
        "Run workloads as non-root users when supported.",
        "Restrict capabilities and writable filesystems.",
        "Monitor host and container security events."
      ],
      commands: [
        "docker ps",
        "docker inspect CONTAINER",
        "docker image ls",
        "docker exec CONTAINER id",
        "docker inspect --format '{{.HostConfig.Privileged}}' CONTAINER",
        "kubectl get pods -A",
        "kubectl describe pod POD",
        "ss -lntup"
      ],
      problems: [
        {
          issue: "A container runs with unnecessary privileged access.",
          rootCause: "The deployment configuration grants broad host capabilities.",
          solution: "Review workload requirements, remove unnecessary privileges, restrict capabilities, and test the updated container."
        },
        {
          issue: "A cloud server exposes an administrative port to the internet.",
          rootCause: "Cloud network policy was configured too broadly.",
          solution: "Restrict source ranges to approved management networks, review access logs, and validate connectivity."
        }
      ]
    },
    {
      heading: "18. Security Incident Response and Recovery",
      explanation: "A security incident may involve unauthorized access, credential theft, malware, data exposure, suspicious processes, or unexpected configuration changes. Response should follow a documented process involving security, infrastructure, application, and business owners. The team should preserve evidence, determine scope, contain the threat, remove the cause, recover services, and monitor for recurrence. Isolation or shutdown decisions must consider business impact and evidence preservation. After recovery, perform a root cause review and improve controls. Never assume that deleting one suspicious file proves a host is clean.",
      steps: [
        "Confirm the alert and identify affected assets.",
        "Record timestamps and preserve relevant evidence.",
        "Notify the designated security incident owner.",
        "Assess scope and possible data exposure.",
        "Contain the threat using approved procedures.",
        "Rotate affected credentials and revoke access.",
        "Recover from trusted images or verified backups.",
        "Monitor for recurrence and document lessons learned."
      ],
      commands: [
        "date -Is",
        "who",
        "last -a",
        "lastb",
        "ps auxf",
        "ss -plant",
        "journalctl --since '2 hours ago'",
        "sha256sum /path/to/evidence"
      ],
      problems: [
        {
          issue: "An administrator deletes suspicious files before collecting evidence.",
          rootCause: "Incident handling procedures and evidence preservation requirements are not understood.",
          solution: "Train responders to preserve relevant metadata, hashes, logs, and timelines before containment or cleanup when safe."
        },
        {
          issue: "A compromised server is returned to production without investigation.",
          rootCause: "Recovery focused only on service availability and did not establish trust in the host.",
          solution: "Follow security-led recovery, rebuild from trusted sources when required, rotate credentials, and validate the environment before release."
        }
      ]
    },
    {
      heading: "19. Real-World Production Security Project",
      explanation: "Consider a Linux web server hosting a customer application. Security monitoring detects repeated SSH authentication failures, an unfamiliar process, and unexpected outbound connections. The operations engineer records the time, identifies the host and service owner, reviews authentication logs, process ownership, executable paths, and network sockets. The engineer escalates to the security team, preserves evidence, and follows the approved containment procedure. The team determines whether credentials were exposed, checks for unauthorized changes, and restores the server from a trusted baseline if necessary. After recovery, SSH access is restricted, credentials are rotated, audit rules are improved, and monitoring alerts are tested.",
      steps: [
        "Record the security alert and affected host.",
        "Review SSH authentication and sudo activity.",
        "Identify unknown processes and parent processes.",
        "Inspect outbound connections and listening sockets.",
        "Preserve logs and relevant file metadata.",
        "Escalate to the security incident owner.",
        "Contain the affected host according to policy.",
        "Rotate exposed credentials and revoke access.",
        "Rebuild or recover using trusted sources when required.",
        "Validate security controls before production release."
      ],
      commands: [
        "journalctl -u sshd --since '1 hour ago'",
        "lastb",
        "last -a",
        "sudo -l",
        "ps auxf",
        "pstree -ap",
        "ss -plant",
        "lsof -nP -i",
        "getenforce",
        "systemctl --failed"
      ],
      problems: [
        {
          issue: "Repeated SSH failures are followed by a successful login from an unfamiliar source.",
          rootCause: "A credential may have been compromised or remote access policy may be too permissive.",
          solution: "Escalate the event, preserve logs, verify the account owner, restrict affected access, and rotate credentials through the incident process."
        },
        {
          issue: "An unknown process establishes outbound connections.",
          rootCause: "The process may be unauthorized, compromised, or a legitimate but undocumented application component.",
          solution: "Preserve process and network evidence, identify the executable and owner, correlate logs, and let security responders determine containment."
        }
      ]
    },
    {
      heading: "20. Linux Security Interview Questions and Answers",
      explanation: "Linux security interviews evaluate practical understanding of identity, access control, SSH, permissions, firewall, SELinux, auditing, patching, and incident response. A strong answer explains the security objective, diagnostic commands, likely causes, and safe remediation. Administrators should avoid broad permission changes, disabling security controls without investigation, or deleting suspicious evidence. Production security requires layered protection, documented exceptions, and continuous verification.",
      steps: [
        "Explain the security objective before selecting a command.",
        "Identify the affected user, process, file, or network path.",
        "Collect logs and configuration evidence.",
        "Apply least privilege and narrow remediation.",
        "Validate security and application functionality.",
        "Document the change and remaining risks.",
        "Escalate suspected compromise appropriately."
      ],
      commands: [
        "id",
        "sudo -l",
        "ss -lntup",
        "getenforce",
        "sestatus",
        "getfacl /path",
        "journalctl -u sshd",
        "auditctl -s"
      ],
      interviewQuestions: [
        {
          question: "1. What is Linux security?",
          answer: "Linux security protects users, processes, files, applications, and network services against unauthorized access and attacks using authentication, permissions, firewall, patching, auditing, and monitoring."
        },
        {
          question: "2. What is the principle of least privilege?",
          answer: "It means giving a user or service only the permissions required to perform its job. It reduces the damage caused by mistakes or compromised accounts."
        },
        {
          question: "3. What is the difference between authentication and authorization?",
          answer: "Authentication verifies identity. Authorization determines what that identity is allowed to access or perform."
        },
        {
          question: "4. How do you check user information in Linux?",
          answer: "I use id username, getent passwd username, and getent group to inspect UID, GID, group memberships, and account information."
        },
        {
          question: "5. Why should applications use dedicated service accounts?",
          answer: "Dedicated service accounts isolate application permissions and make ownership and auditing easier. They avoid running applications with unnecessary administrator privileges."
        },
        {
          question: "6. What is the purpose of /etc/shadow?",
          answer: "It stores local password hash and password-aging information. Access must be restricted because it contains sensitive authentication data."
        },
        {
          question: "7. How do you check password aging?",
          answer: "I use chage -l username to inspect password aging and expiration settings."
        },
        {
          question: "8. How do you secure SSH?",
          answer: "I restrict authorized users, use protected keys or approved authentication, review root and password login settings, validate sshd configuration, and monitor authentication logs."
        },
        {
          question: "9. Why should you run sshd -t before applying configuration changes?",
          answer: "It validates SSH configuration syntax. This helps prevent a configuration error from breaking remote administration."
        },
        {
          question: "10. What is sudo?",
          answer: "sudo allows approved users to execute authorized commands with elevated privileges without sharing the root password."
        },
        {
          question: "11. Why should visudo be used?",
          answer: "visudo safely edits sudoers policy and validates syntax before saving, reducing the risk of invalid privilege configuration."
        },
        {
          question: "12. What does chmod 640 mean?",
          answer: "The owner has read and write permissions, the group has read permission, and others have no permissions."
        },
        {
          question: "13. What is the difference between chmod and chown?",
          answer: "chmod changes file permissions. chown changes file ownership and optionally group ownership."
        },
        {
          question: "14. What is the setuid permission?",
          answer: "For executable files, setuid allows execution with the file owner's effective user identity, subject to system behavior and security controls."
        },
        {
          question: "15. What is an ACL?",
          answer: "An Access Control List provides additional user and group permissions beyond the standard owner, group, and others permission model."
        },
        {
          question: "16. How do you troubleshoot an ACL permission issue?",
          answer: "I inspect getfacl output, the ACL mask, parent directory permissions, the service identity, and any mandatory access control policy."
        },
        {
          question: "17. What is SELinux?",
          answer: "SELinux is a mandatory access control system that enforces security policies on processes and resources beyond standard Unix permissions."
        },
        {
          question: "18. What are SELinux enforcing and permissive modes?",
          answer: "Enforcing mode blocks policy violations and logs them. Permissive mode logs violations without enforcing the denial."
        },
        {
          question: "19. How do you investigate SELinux denials?",
          answer: "I inspect ausearch AVC messages, file contexts, process contexts, and relevant policy. I correct labels or create a narrow approved policy change."
        },
        {
          question: "20. What is the purpose of a Linux firewall?",
          answer: "A firewall controls network traffic based on rules. It reduces exposure by allowing only required communication."
        },
        {
          question: "21. How do you identify exposed listening ports?",
          answer: "I use ss -lntup to list listening TCP and UDP sockets and identify the processes using those ports."
        },
        {
          question: "22. What is vulnerability management?",
          answer: "It is the continuous process of identifying, prioritizing, remediating, and verifying security weaknesses in systems and applications."
        },
        {
          question: "23. Why is patch management important?",
          answer: "Security updates fix known vulnerabilities and improve system reliability. Updates should be prioritized, tested, approved, and verified."
        },
        {
          question: "24. What is auditd?",
          answer: "auditd is the Linux auditing daemon. It records configured security and system events for monitoring and investigation."
        },
        {
          question: "25. How do you investigate repeated failed SSH logins?",
          answer: "I review sshd journal entries, lastb, source addresses, account details, and successful login history. I escalate suspicious activity and apply approved access controls."
        },
        {
          question: "26. How do you investigate a suspicious Linux process?",
          answer: "I inspect PID, PPID, owner, executable path, open files, network connections, and related logs. I preserve evidence and follow the security incident process."
        },
        {
          question: "27. Why should secrets not be stored in shell scripts?",
          answer: "Scripts may be exposed through source control, backups, logs, or process inspection. Secrets should be stored in an approved protected secret-management system."
        },
        {
          question: "28. What is defense in depth?",
          answer: "It uses multiple independent security layers. If one control fails, other controls can still reduce the chance or impact of compromise."
        },
        {
          question: "29. What are the main stages of security incident response?",
          answer: "Preparation, detection, analysis, containment, eradication, recovery, and lessons learned. The exact process follows organizational policy."
        },
        {
          question: "30. What would you do if you suspected a production server was compromised?",
          answer: "I would preserve evidence, record the timeline, notify security responders, assess scope, contain the threat using approved procedures, rotate affected credentials, and recover from trusted sources when required."
        }
      ]
    }
  ]
};

export default data;
