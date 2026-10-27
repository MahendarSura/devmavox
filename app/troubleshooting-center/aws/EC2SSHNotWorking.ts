export interface EC2SSHNotWorkingGuide {
  title: string;
  slug: string;
  category: string;
  severity: string[];
  overview: string;
  incidentScenario: string;
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    interpretation: string[];
    nextAction: string;
  }[];
  rootCauseMatrix: {
    symptom: string;
    likelyCause: string;
    evidence: string;
    resolution: string;
  }[];
  recoveryProcedures: {
    scenario: string;
    steps: string[];
    validation: string[];
  }[];
  advancedScenarios: {
    scenario: string;
    investigation: string[];
    resolution: string[];
  }[];
  prevention: string[];
  monitoringAndAlerting: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    lab: string;
    steps: string[];
    expectedResult: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  officialReferences: {
    title: string;
    url: string;
  }[];
}

export const ec2SSHNotWorkingGuide: EC2SSHNotWorkingGuide = {
  title: "AWS EC2 SSH Connection Not Working — Production Troubleshooting",
  slug: "ec2-ssh-not-working",
  category: "AWS / EC2 / Linux / Network Troubleshooting",

  severity: [
    "SEV-1: Critical production access is lost during an active outage, and no approved alternate recovery path exists.",
    "SEV-2: Production administration or deployment is blocked across important instances.",
    "SEV-3: One non-critical EC2 instance is inaccessible, but application health and alternate access remain available.",
    "SEV-4: Development or test instance access issue with limited operational impact."
  ],

  overview: `
EC2 SSH troubleshooting means identifying why an administrator or automation
system cannot establish a secure SSH session to a Linux EC2 instance.

SSH connectivity depends on multiple independent layers:

1. Correct AWS account, Region, instance ID, and instance state.
2. EC2 system status and instance reachability checks.
3. Correct destination IP, DNS name, and network route.
4. Internet Gateway, NAT/VPN, Transit Gateway, or bastion path as applicable.
5. Security group inbound and outbound rules.
6. Network ACL inbound and outbound rules.
7. Operating system firewall and listening SSH service.
8. Correct username, private key, public-key installation, and SSH configuration.
9. Operating system resources, disk space, memory, and boot health.
10. IAM and Systems Manager configuration when using Session Manager or
    EC2 Instance Connect.

A timeout, connection refused, host-key warning, and public-key
authentication failure are different symptoms. They must not be treated as
the same root cause.

Security rule:
Never solve SSH problems by opening port 22 to 0.0.0.0/0 as a permanent fix,
disabling host-key verification, sharing private keys, or weakening production
access controls.
`,

  incidentScenario: `
INCIDENT:
A production EC2 instance was accessible yesterday. Today, engineers and the
deployment pipeline cannot connect over SSH.

Reported errors may include:

- ssh: connect to host ... port 22: Connection timed out
- ssh: connect to host ... port 22: Connection refused
- Permission denied (publickey)
- No route to host
- Connection closed by remote host
- WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED
- Instance status checks failed
- The instance has no public IPv4 address
- A bastion host cannot reach the private instance

Production objective:

Restore authorized access without exposing the instance to the internet,
changing the wrong security group, rebooting unnecessarily, or interrupting
the application.

First establish whether the problem is network reachability, SSH service
availability, authentication, or operating system health.
`,

  impactAssessment: [
    "Identify the exact AWS account, Region, EC2 instance ID, environment, and owner.",
    "Determine whether one instance, an entire subnet, one Availability Zone, or multiple instances are affected.",
    "Check whether the application is healthy even though SSH is unavailable.",
    "Determine whether deployments, patching, incident response, backup verification, or administration are blocked.",
    "Record the incident start time, last successful login, source network, client IP, and exact SSH error.",
    "Confirm whether the instance has a public IPv4 address, Elastic IP, private IP, DNS name, or private-only access path.",
    "Identify whether engineers connect directly, through a VPN, through a bastion host, through EC2 Instance Connect, or through Systems Manager Session Manager.",
    "Check whether security groups, NACLs, routes, IAM policies, key rotation, operating system updates, or network architecture changed recently.",
    "Review EC2 system and instance status checks before restarting or replacing the instance.",
    "Determine whether production traffic can be shifted to a healthy instance if recovery requires disruptive operations."
  ],

  safetyChecks: [
    "Run aws sts get-caller-identity and confirm the expected account before making changes.",
    "Confirm the AWS Region explicitly. A correct instance ID in the wrong operational context can lead to confusion.",
    "Confirm the instance ID, VPC, subnet, security groups, private IP, and public IP before editing network rules.",
    "Use read-only AWS API calls for initial diagnosis.",
    "Do not expose port 22 to 0.0.0.0/0 or ::/0 as a routine troubleshooting step.",
    "Prefer a trusted VPN CIDR, approved bastion security group, or Session Manager according to the architecture.",
    "Do not overwrite an existing SSH private key or copy private keys into tickets, chat, logs, or Git repositories.",
    "Do not disable host-key verification to suppress a host identity warning.",
    "Do not reboot, stop, terminate, detach root volumes, or modify production firewall rules without impact assessment and required approval.",
    "Before changing security groups or NACLs, record the original configuration and confirm all application dependencies.",
    "Check whether the instance uses an Auto Scaling Group, instance-store volumes, local caches, or stateful workloads before stop/start operations.",
    "If using a bastion host, verify both the client-to-bastion connection and the bastion-to-target connection separately.",
    "For production changes, follow the organization's change-management and rollback procedures."
  ],

  evidenceCollection: [
    "Incident ID, timestamps, affected environment, instance ID, Region, and AWS account.",
    "Exact SSH command with private key paths and sensitive values omitted.",
    "Exact SSH error message and verbose SSH output with secrets and sensitive host details redacted.",
    "Client operating system, SSH client version, source IP, VPN status, and network location.",
    "EC2 instance state, public and private IP addresses, subnet, VPC, and attached security groups.",
    "System status check and instance status check results.",
    "Subnet route table, Internet Gateway association, NACL rules, and relevant security group rules.",
    "Bastion or VPN health and route information when the instance is private.",
    "Recent changes to IAM, security groups, NACLs, route tables, instance networking, SSH configuration, and operating system packages.",
    "EC2 console output, boot diagnostics, and system logs where available.",
    "SSM managed-instance status, agent health, IAM instance profile, and endpoint connectivity where applicable.",
    "CloudTrail evidence for relevant API configuration changes, subject to account logging and retention settings.",
    "Application health, load balancer target health, and deployment status to establish whether the issue is access-only or service-impacting."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm AWS identity, account, Region, and instance",
      objective:
        "Prevent troubleshooting the wrong instance or changing resources in the wrong account.",
      commands: [
        "aws sts get-caller-identity",
        "aws configure list",
        "aws ec2 describe-instances --region ap-south-1 --instance-ids i-INSTANCEID --query 'Reservations[].Instances[].{ID:InstanceId,State:State.Name,Type:InstanceType,AZ:Placement.AvailabilityZone,VPC:VpcId,Subnet:SubnetId,PrivateIP:PrivateIpAddress,PublicIP:PublicIpAddress,SGs:SecurityGroups[].GroupId}' --output table",
        "aws ec2 describe-instance-status --region ap-south-1 --instance-ids i-INSTANCEID --include-all-instances --output table"
      ],
      interpretation: [
        "Replace ap-south-1 and i-INSTANCEID with the actual Region and instance ID.",
        "If get-caller-identity fails, resolve AWS CLI authentication or profile selection before proceeding.",
        "If the instance is stopped, SSH cannot connect until it is running; determine why it stopped before starting it.",
        "If PublicIP is empty, direct internet SSH will not work unless another supported access path exists.",
        "If the instance ID is not found, check the Region and account before concluding the instance was deleted.",
        "If system status checks fail, investigate underlying AWS infrastructure health.",
        "If instance status checks fail, investigate operating system, networking, boot, or resource issues."
      ],
      nextAction:
        "Record the instance state, IP addresses, status checks, VPC, subnet, and attached security group IDs."
    },
    {
      step: 2,
      title: "Classify the SSH error",
      objective:
        "Select the correct diagnostic path based on the observed failure.",
      commands: [
        "ssh -vvv -o ConnectTimeout=10 -i ~/.ssh/production-key.pem ec2-user@EC2_HOST",
        "ssh -G -i ~/.ssh/production-key.pem ec2-user@EC2_HOST",
        "nc -vz -w 5 EC2_HOST 22",
        "Test-NetConnection EC2_HOST -Port 22"
      ],
      interpretation: [
        "Run the commands appropriate for the client operating system. Test-NetConnection is for Windows PowerShell; nc is common on Linux and macOS.",
        "Use the correct username, key path, and destination for the AMI and architecture.",
        "A timeout usually indicates dropped traffic, a route problem, a filtering rule, an unreachable destination, or an unresponsive host.",
        "Connection refused generally means the destination is reachable but no service accepts the connection, or a firewall actively rejects it.",
        "Permission denied (publickey) usually means network connectivity and the SSH server were reached, but public-key authentication failed.",
        "No route to host can indicate a routing issue, local network restriction, or an explicit network rejection.",
        "A host-key mismatch is a server identity verification problem and must be investigated separately.",
        "Verbose output can reveal usernames, paths, addresses, and configuration details. Redact sensitive information before sharing."
      ],
      nextAction:
        "Use the error class to decide whether to investigate networking, sshd, authentication, or host identity."
    },
    {
      step: 3,
      title: "Verify the destination address and access architecture",
      objective:
        "Ensure the client is connecting to the correct public or private endpoint.",
      commands: [
        "aws ec2 describe-instances --region ap-south-1 --instance-ids i-INSTANCEID --query 'Reservations[].Instances[].{PublicIP:PublicIpAddress,PrivateIP:PrivateIpAddress,PublicDNS:PublicDnsName,Subnet:SubnetId,VPC:VpcId}' --output table",
        "nslookup EC2_HOST",
        "dig +short EC2_HOST"
      ],
      interpretation: [
        "A public DNS name or public IPv4 address can change after a stop/start unless an Elastic IP or another stable endpoint is used.",
        "A private IP normally requires connectivity through a VPC-connected network, VPN, Direct Connect, bastion, or another approved private access mechanism.",
        "A DNS answer that points to an old IP can send the client to the wrong destination.",
        "If the instance is private-only, assigning a public IP is not automatically the correct fix.",
        "For IPv6 access, confirm that the instance, subnet, routes, security groups, NACLs, client network, and SSH client all support the intended path."
      ],
      nextAction:
        "Confirm the actual destination and use the approved network path for that instance."
    },
    {
      step: 4,
      title: "Check EC2 status checks and infrastructure health",
      objective:
        "Determine whether the instance or underlying infrastructure is unhealthy.",
      commands: [
        "aws ec2 describe-instance-status --region ap-south-1 --instance-ids i-INSTANCEID --include-all-instances --query 'InstanceStatuses[].{State:InstanceState.Name,System:SystemStatus.Status,Instance:InstanceStatus.Status,Checks:InstanceStatus.Details}' --output json",
        "aws ec2 get-console-output --region ap-south-1 --instance-id i-INSTANCEID --latest --output text"
      ],
      interpretation: [
        "System status check failure can indicate an issue with the AWS host or underlying infrastructure.",
        "Instance status check failure can indicate OS boot problems, a broken network configuration, exhausted resources, or other guest-level issues.",
        "Console output may contain boot messages, filesystem errors, service failures, or kernel problems.",
        "Console output is not guaranteed to contain every useful log and may be empty or delayed.",
        "A status check failure should not automatically trigger a reboot without checking workload impact and recovery options."
      ],
      nextAction:
        "If system checks fail, review AWS Health and the appropriate AWS support path. If instance checks fail, inspect guest-level evidence and approved recovery methods."
    },
    {
      step: 5,
      title: "Check the security group attached to the instance",
      objective:
        "Confirm that TCP port 22 is allowed from the actual approved source.",
      commands: [
        "aws ec2 describe-instances --region ap-south-1 --instance-ids i-INSTANCEID --query 'Reservations[].Instances[].SecurityGroups' --output table",
        "aws ec2 describe-security-groups --region ap-south-1 --group-ids sg-SECURITYGROUPID --output json"
      ],
      interpretation: [
        "Check inbound TCP/22 from the actual client public IP or approved VPN/bastion source.",
        "A security group is stateful, so response traffic for an allowed connection is tracked automatically.",
        "Security groups attached to the instance, not a similarly named group elsewhere, determine the effective instance rules.",
        "A bastion design may allow port 22 from the bastion security group rather than from the internet.",
        "Check outbound rules if the instance initiates other required connections; do not assume inbound SSH is the only relevant network dependency.",
        "A correct security group cannot compensate for a missing route, restrictive NACL, host firewall, or stopped sshd service."
      ],
      nextAction:
        "If evidence proves a missing rule, request the smallest approved change from the correct source CIDR or security group."
    },
    {
      step: 6,
      title: "Check subnet route table and internet/private connectivity",
      objective:
        "Verify that traffic has a valid path to and from the instance.",
      commands: [
        "aws ec2 describe-route-tables --region ap-south-1 --filters Name=association.subnet-id,Values=subnet-SUBNETID --output json",
        "aws ec2 describe-internet-gateways --region ap-south-1 --filters Name=attachment.vpc-id,Values=vpc-VPCID --output table",
        "aws ec2 describe-subnets --region ap-south-1 --subnet-ids subnet-SUBNETID --query 'Subnets[].{Subnet:SubnetId,VPC:VpcId,AZ:AvailabilityZone,PublicIP:MapPublicIpOnLaunch,CIDR:CidrBlock}' --output table"
      ],
      interpretation: [
        "A subnet is not public merely because its name contains the word public.",
        "For direct IPv4 internet access, the instance needs an appropriate public IPv4 address or Elastic IP, a route to an attached Internet Gateway, and matching network/security rules.",
        "MapPublicIpOnLaunch controls automatic public IPv4 assignment for launches; it does not prove an existing instance currently has a public address.",
        "A private subnet generally requires an approved private route such as VPN, Direct Connect, Transit Gateway, or a bastion access path.",
        "A NAT Gateway is primarily for outbound connectivity from private subnets; it does not by itself provide unsolicited inbound SSH access to a private instance.",
        "Check the most specific matching route and the actual subnet association."
      ],
      nextAction:
        "Correct the proven routing or access-path issue through the approved network change process."
    },
    {
      step: 7,
      title: "Inspect network ACL rules in both directions",
      objective:
        "Identify subnet-level stateless filtering that can block SSH or response traffic.",
      commands: [
        "aws ec2 describe-network-acls --region ap-south-1 --filters Name=association.subnet-id,Values=subnet-SUBNETID --output json"
      ],
      interpretation: [
        "Network ACLs are stateless, so both request and response directions must be allowed.",
        "Check inbound TCP/22 from the approved client source and outbound ephemeral response ports appropriate to the client connection.",
        "Rules are evaluated in rule-number order, and the first matching rule determines the result.",
        "A restrictive NACL can block traffic even when the security group is correct.",
        "Do not broadly allow all traffic as a quick fix; identify the exact source, destination, protocol, and port requirement."
      ],
      nextAction:
        "If the NACL is responsible, propose the narrowest rule change consistent with the network security policy."
    },
    {
      step: 8,
      title: "Check the client network, VPN, and bastion path",
      objective:
        "Determine whether the problem originates from the engineer's network or a shared access component.",
      commands: [
        "Test-NetConnection EC2_HOST -Port 22",
        "traceroute EC2_HOST",
        "tracepath EC2_HOST",
        "ssh -vvv -J bastion-user@BASTION_HOST -i ~/.ssh/production-key.pem ec2-user@PRIVATE_IP"
      ],
      interpretation: [
        "Use the commands supported by the client's operating system and network policy.",
        "Traceroute may be incomplete because intermediate devices filter probe traffic; missing hops alone do not prove the route is broken.",
        "If all engineers fail, investigate shared infrastructure such as VPN, bastion, routing, or security rules.",
        "If only one engineer fails, compare source IP, VPN state, local firewall, key selection, and SSH configuration.",
        "For a ProxyJump connection, validate client-to-bastion and bastion-to-instance connectivity independently.",
        "Do not expose private IPs, internal DNS names, or network diagrams in public incident reports."
      ],
      nextAction:
        "Compare a known-good access path with the failing path and isolate the first network boundary where connectivity fails."
    },
    {
      step: 9,
      title: "Verify the SSH username and AMI-specific defaults",
      objective:
        "Eliminate incorrect operating system usernames as the cause of authentication failure.",
      commands: [
        "ssh -vvv -i ~/.ssh/production-key.pem USERNAME@EC2_HOST",
        "ssh -G -i ~/.ssh/production-key.pem USERNAME@EC2_HOST"
      ],
      interpretation: [
        "Common defaults include ec2-user for Amazon Linux, ubuntu for Ubuntu, and different users for other distributions or custom images.",
        "The actual username depends on the AMI and image configuration; verify it from the image documentation or build standard.",
        "A wrong username can produce Permission denied (publickey) even when the private key is correct.",
        "SSH configuration files may override the expected user, identity file, proxy, or hostname.",
        "Do not assume every image uses ec2-user or ubuntu."
      ],
      nextAction:
        "Confirm the account name from the actual AMI and retry only with the approved identity."
    },
    {
      step: 10,
      title: "Validate private-key selection and client file permissions",
      objective:
        "Confirm that the SSH client is using the intended private key securely.",
      commands: [
        "ssh-add -l",
        "ssh -vvv -o IdentitiesOnly=yes -i ~/.ssh/production-key.pem USERNAME@EC2_HOST",
        "chmod 400 ~/.ssh/production-key.pem",
        "icacls $env:USERPROFILE\\.ssh\\production-key.pem"
      ],
      interpretation: [
        "ssh-add -l lists keys currently loaded in the agent; an empty agent does not necessarily indicate failure when -i is used.",
        "IdentitiesOnly=yes helps prevent SSH from offering unrelated agent keys.",
        "chmod 400 is appropriate for a private key on Unix-like systems, but it is not a Windows PowerShell command.",
        "On Windows, inspect and restrict file ACLs using the organization's approved method. Do not blindly replace ACLs on a shared key file.",
        "Never paste the private key contents into a terminal transcript, ticket, or chat.",
        "If the selected key is not the key associated with the instance's authorized public key, changing file permissions will not fix authentication."
      ],
      nextAction:
        "Verify the expected key fingerprint and account mapping. If the key is wrong or lost, use an approved recovery path."
    },
    {
      step: 11,
      title: "Investigate SSH host-key warnings safely",
      objective:
        "Distinguish a legitimate host replacement from a possible security incident.",
      commands: [
        "ssh-keygen -F EC2_HOST",
        "ssh-keyscan -T 5 -t ed25519,rsa EC2_HOST"
      ],
      interpretation: [
        "ssh-keygen -F looks up a host entry in the known_hosts file.",
        "ssh-keyscan collects a presented host key but does not independently prove that the key belongs to the intended server.",
        "A changed host key may result from instance replacement, DNS changes, a rebuilt operating system, or a security threat.",
        "Do not delete the known_hosts entry and reconnect without independently verifying the new host-key fingerprint through a trusted channel.",
        "Host-key verification protects against connecting to an impostor."
      ],
      nextAction:
        "Verify the host identity with trusted infrastructure records or the approved administrator, then update the known_hosts entry according to policy."
    },
    {
      step: 12,
      title: "Use Session Manager as an alternate access path when configured",
      objective:
        "Recover administrative access without opening SSH to the internet.",
      commands: [
        "aws ssm describe-instance-information --region ap-south-1 --filters Key=InstanceIds,Values=i-INSTANCEID --output table",
        "aws ssm start-session --region ap-south-1 --target i-INSTANCEID"
      ],
      interpretation: [
        "The instance must be configured as a managed node and satisfy Systems Manager prerequisites.",
        "The operator needs the required IAM permissions, and the instance needs an appropriate instance profile or supported credentials configuration.",
        "The SSM Agent must be installed and running, and the instance needs network connectivity to the required Systems Manager endpoints.",
        "Private instances may need VPC interface endpoints or another approved path to Systems Manager.",
        "If the instance does not appear in describe-instance-information, investigate registration, agent health, IAM permissions, and endpoint connectivity.",
        "A successful Session Manager connection provides an alternate investigation path; it does not prove that port 22 is healthy."
      ],
      nextAction:
        "If the session starts, inspect sshd, operating system logs, firewall rules, disk space, and resource pressure without exposing SSH publicly."
    },
    {
      step: 13,
      title: "Inspect the SSH daemon from an approved alternate session",
      objective:
        "Determine whether sshd is running, listening, and configured correctly.",
      commands: [
        "sudo systemctl status sshd --no-pager",
        "sudo systemctl status ssh --no-pager",
        "sudo ss -lntp | grep ':22'",
        "sudo sshd -t",
        "sudo journalctl -u sshd --since '-30 minutes' --no-pager",
        "sudo journalctl -u ssh --since '-30 minutes' --no-pager"
      ],
      interpretation: [
        "Amazon Linux commonly uses the sshd service name; Ubuntu commonly uses ssh. Check the actual distribution.",
        "A failed systemctl status can indicate that the service is stopped or that the unit name is different.",
        "ss -lntp shows listening TCP sockets; verify whether the SSH service listens on the expected interface and port.",
        "sshd -t checks the SSH daemon configuration syntax. Review the output before making configuration changes.",
        "Journal logs may reveal invalid configuration, authentication failures, host-key problems, or startup errors.",
        "Do not restart sshd blindly if configuration validation fails; preserve the current session and fix the proven issue first."
      ],
      nextAction:
        "Correct the demonstrated service or configuration issue, validate sshd configuration, and restart or reload only when safe."
    },
    {
      step: 14,
      title: "Check operating system firewall rules",
      objective:
        "Identify host-level filtering that blocks TCP/22.",
      commands: [
        "sudo ufw status verbose",
        "sudo firewall-cmd --state",
        "sudo firewall-cmd --list-all",
        "sudo nft list ruleset",
        "sudo iptables -S"
      ],
      interpretation: [
        "Run only commands supported by the installed firewall stack.",
        "Ubuntu may use UFW, while other distributions may use firewalld, nftables, or iptables.",
        "A host firewall can block SSH even when security groups and NACLs allow it.",
        "Review existing rules and management policy before adding a rule.",
        "Do not flush the firewall ruleset; that can expose services or break application networking.",
        "If the host firewall is controlled by configuration management, fix the source configuration to prevent the rule from returning."
      ],
      nextAction:
        "Make a narrow, approved host-firewall correction and validate access from the intended source network."
    },
    {
      step: 15,
      title: "Investigate disk, memory, CPU, and inode exhaustion",
      objective:
        "Find operating system resource exhaustion that may prevent SSH login or service startup.",
      commands: [
        "df -h",
        "df -i",
        "free -m",
        "uptime",
        "top -b -n 1 | head -30",
        "sudo journalctl -p err --since '-60 minutes' --no-pager",
        "sudo dmesg -T | tail -100"
      ],
      interpretation: [
        "A filesystem at 100% capacity can prevent logs, temporary files, or user sessions from being created.",
        "An inode-exhausted filesystem can fail to create files even when free disk space remains.",
        "High memory pressure or CPU saturation can cause severe login delays or timeouts.",
        "Kernel messages may indicate out-of-memory kills, filesystem errors, or device problems.",
        "Use read-only inspection first. Do not delete logs, application files, or database files blindly.",
        "For a full filesystem, identify the actual space consumer and follow the approved cleanup or expansion procedure."
      ],
      nextAction:
        "Resolve the demonstrated resource bottleneck safely, then retest SSH and application health."
    },
    {
      step: 16,
      title: "Inspect authentication logs and account restrictions",
      objective:
        "Determine why the SSH server rejects a connection after network reachability succeeds.",
      commands: [
        "sudo journalctl -u sshd --since '-60 minutes' --no-pager",
        "sudo journalctl -u ssh --since '-60 minutes' --no-pager",
        "sudo grep -E '^(AllowUsers|AllowGroups|DenyUsers|DenyGroups|PubkeyAuthentication|PasswordAuthentication|AuthorizedKeysFile|PermitRootLogin)' /etc/ssh/sshd_config",
        "sudo sshd -T"
      ],
      interpretation: [
        "The grep command inspects common global settings, but Match blocks, included configuration files, and distribution-specific configuration may also affect the effective result.",
        "sshd -T reports effective configuration; use supported options and inspect Match-specific behavior where relevant.",
        "Check whether the account is locked, the home directory has correct ownership, and .ssh/authorized_keys is readable by the account.",
        "Verify the public key corresponds to the private key being offered by the client.",
        "Do not enable root login or password authentication just to bypass a public-key issue.",
        "Treat repeated unexpected authentication attempts as a security signal and follow the incident response procedure."
      ],
      nextAction:
        "Correct the exact account, key, ownership, or SSH policy problem without weakening the access baseline."
    },
    {
      step: 17,
      title: "Investigate cloud-init, boot, and configuration-management changes",
      objective:
        "Identify a recent boot or automation change that altered SSH access.",
      commands: [
        "sudo cloud-init status --long",
        "sudo journalctl -u cloud-init --since '-2 hours' --no-pager",
        "sudo journalctl -b --no-pager | grep -Ei 'ssh|sshd|cloud-init|network|firewall|error'",
        "sudo grep -RniE 'Port|ListenAddress|AllowUsers|PubkeyAuthentication' /etc/ssh/sshd_config /etc/ssh/sshd_config.d 2>/dev/null"
      ],
      interpretation: [
        "A startup script or configuration-management run may have changed the SSH service, firewall, user account, or key file.",
        "Cloud-init may have completed with errors even though the instance reached the running state.",
        "Included SSH configuration files can override assumptions based on the main sshd_config file.",
        "The grep output may contain internal configuration details; redact them before sharing externally.",
        "Do not rerun an entire configuration-management playbook on production until its impact and idempotency are understood."
      ],
      nextAction:
        "Identify the configuration change and correct its source so the same failure is not recreated on the next boot."
    },
    {
      step: 18,
      title: "Check VPC Flow Logs and CloudTrail evidence",
      objective:
        "Correlate network traffic and AWS configuration changes with the incident timeline.",
      commands: [
        "aws ec2 describe-flow-logs --region ap-south-1 --filter Name=resource-id,Values=vpc-VPCID --output table",
        "aws cloudtrail lookup-events --region ap-south-1 --lookup-attributes AttributeKey=EventName,AttributeValue=AuthorizeSecurityGroupIngress --max-results 20",
        "aws cloudtrail lookup-events --region ap-south-1 --lookup-attributes AttributeKey=EventName,AttributeValue=RevokeSecurityGroupIngress --max-results 20",
        "aws cloudtrail lookup-events --region ap-south-1 --lookup-attributes AttributeKey=EventName,AttributeValue=ModifyNetworkInterfaceAttribute --max-results 20"
      ],
      interpretation: [
        "VPC Flow Logs must already be configured and retained for the relevant traffic to be available.",
        "Flow Logs can show accepted or rejected traffic depending on configuration, but they do not by themselves explain every application-level failure.",
        "CloudTrail lookup-events searches available management event history; account-level logging configuration and retention determine what evidence is accessible.",
        "An absent event is not proof that no change occurred, especially if the event is outside the available history or logging scope.",
        "Inspect the event timestamp, principal, resource IDs, and request parameters with appropriate access controls.",
        "Avoid sharing complete CloudTrail payloads publicly because they can contain sensitive infrastructure details."
      ],
      nextAction:
        "Correlate network evidence and configuration-change events with the exact incident start time before selecting a remediation."
    },
    {
      step: 19,
      title: "Review EC2 Instance Connect prerequisites if that is the access method",
      objective:
        "Check whether the selected temporary-key access method is correctly configured.",
      commands: [
        "aws ec2 describe-instances --region ap-south-1 --instance-ids i-INSTANCEID --query 'Reservations[].Instances[].{State:State.Name,Subnet:SubnetId,VPC:VpcId,SecurityGroups:SecurityGroups[].GroupId}' --output json",
        "aws ec2-instance-connect send-ssh-public-key help"
      ],
      interpretation: [
        "EC2 Instance Connect has specific IAM, network, instance, and operating system prerequisites.",
        "For direct EC2 Instance Connect, the client needs a valid path to the instance and port 22 must be reachable from the appropriate source.",
        "For private instances, use the supported private access architecture rather than assuming the browser-based connection bypasses networking.",
        "A successful temporary public-key push does not fix a stopped sshd service, an incorrect route, or a host firewall drop.",
        "Check the actual AMI and Region support requirements before changing the access method."
      ],
      nextAction:
        "Validate the documented prerequisites for the selected EC2 Instance Connect path and correct the specific missing requirement."
    },
    {
      step: 20,
      title: "Perform a controlled recovery and verify application health",
      objective:
        "Restore access without causing a second incident.",
      commands: [
        "aws ec2 describe-instance-status --region ap-south-1 --instance-ids i-INSTANCEID --include-all-instances --output table",
        "aws ec2 describe-instances --region ap-south-1 --instance-ids i-INSTANCEID --query 'Reservations[].Instances[].{State:State.Name,PrivateIP:PrivateIpAddress,PublicIP:PublicIpAddress}' --output table",
        "ssh -o ConnectTimeout=10 -i ~/.ssh/production-key.pem USERNAME@EC2_HOST",
        "curl -fsS https://APPLICATION_HEALTH_ENDPOINT"
      ],
      interpretation: [
        "The final curl command must use the real approved application health endpoint; do not assume every application exposes a public health URL.",
        "If SSH is restored, confirm that it works from the approved network and with the intended identity.",
        "Check application health separately; successful SSH does not prove the service is healthy.",
        "If access still fails, revisit the evidence instead of repeating disruptive operations.",
        "Before a reboot or stop/start, review workload impact, recovery procedures, instance-store data, static IP behavior, and Auto Scaling ownership."
      ],
      nextAction:
        "Confirm access, application health, security posture, and incident evidence before declaring the incident resolved."
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Connection timed out",
      likelyCause:
        "Security group, NACL, route, client network, VPN, public IP, host firewall, or an unresponsive guest",
      evidence:
        "TCP/22 connectivity test, attached security group, route table, NACL, Flow Logs, and instance status checks",
      resolution:
        "Fix the first proven blocking layer using the approved source, route, or firewall change."
    },
    {
      symptom: "Connection refused",
      likelyCause:
        "sshd is stopped, not listening on the expected port/interface, or a host/network device actively rejects the connection",
      evidence:
        "TCP connection reaches a rejecting endpoint; alternate session shows service status or listening sockets",
      resolution:
        "Validate SSH configuration and service state, then restore the intended listener safely."
    },
    {
      symptom: "Permission denied (publickey)",
      likelyCause:
        "Wrong username, wrong private key, missing public key, incorrect authorized_keys permissions, or SSH policy restrictions",
      evidence:
        "Verbose client output, authentication logs, effective sshd configuration, and account/key mapping",
      resolution:
        "Use the correct user and approved key or restore authorized public-key access through an approved recovery path."
    },
    {
      symptom: "No route to host",
      likelyCause:
        "Missing route, unreachable private network, local network restriction, or explicit network rejection",
      evidence:
        "Route table, VPN/bastion state, TCP test, and network diagnostics",
      resolution:
        "Restore the intended network path or use the approved private access method."
    },
    {
      symptom: "Public SSH works for one engineer but not another",
      likelyCause:
        "Source IP restrictions, VPN differences, client firewall, SSH agent/key selection, or local SSH configuration",
      evidence:
        "Compare source addresses, VPN status, verbose SSH output, and client configuration",
      resolution:
        "Correct the individual client's approved access path without widening global inbound rules."
    },
    {
      symptom: "SSH fails after stop/start",
      likelyCause:
        "Public IP changed, Elastic IP not attached, DNS stale, or an address-based allowlist no longer matches",
      evidence:
        "Current and previous instance addressing, DNS resolution, and security group source restrictions",
      resolution:
        "Use a stable approved endpoint or update the relevant DNS/allowlist configuration through change control."
    },
    {
      symptom: "Instance status checks fail",
      likelyCause:
        "OS boot problem, guest networking failure, resource exhaustion, filesystem issue, or underlying infrastructure problem",
      evidence:
        "System/instance status checks, console output, boot logs, and AWS Health evidence",
      resolution:
        "Choose a recovery action based on whether the failure is infrastructure-level or guest-level."
    },
    {
      symptom: "SSH works but login is slow or hangs",
      likelyCause:
        "High CPU, memory pressure, full disk, DNS/PAM delays, overloaded authentication services, or shell startup problems",
      evidence:
        "Resource metrics, journal logs, disk/inode usage, authentication logs, and connection timing",
      resolution:
        "Fix the demonstrated resource or authentication delay and retest a normal login."
    },
    {
      symptom: "Host identification has changed",
      likelyCause:
        "Instance replacement, legitimate host rebuild, DNS pointing to another host, or possible interception",
      evidence:
        "Trusted host-key fingerprint, instance identity, DNS history, and change records",
      resolution:
        "Verify the new identity through a trusted channel before updating known_hosts."
    },
    {
      symptom: "Private instance cannot be reached directly",
      likelyCause:
        "No public endpoint or no route from the client to the private subnet",
      evidence:
        "Private IP, subnet routes, VPN connectivity, bastion reachability, and SSM managed-node status",
      resolution:
        "Use the approved VPN, bastion, EC2 Instance Connect Endpoint, or Session Manager architecture."
    },
    {
      symptom: "Session Manager cannot connect",
      likelyCause:
        "Missing managed-node registration, agent problem, IAM permissions, or missing endpoint/network connectivity",
      evidence:
        "describe-instance-information result, agent logs, instance profile, IAM policy, and endpoint reachability",
      resolution:
        "Restore the documented Systems Manager prerequisites without exposing SSH publicly."
    },
    {
      symptom: "SSH fails after a configuration-management run",
      likelyCause:
        "Firewall or sshd configuration changed, authorized_keys was overwritten, or the service was stopped",
      evidence:
        "Configuration-management logs, Git history, sshd configuration diff, and authentication logs",
      resolution:
        "Correct the source configuration and apply a reviewed, controlled repair."
    }
  ],

  recoveryProcedures: [
    {
      scenario: "SSH times out but the application is healthy",
      steps: [
        "Confirm the application and load balancer remain healthy.",
        "Identify the actual client source IP and intended access path.",
        "Check instance addressing, security groups, NACLs, routes, VPN, and bastion connectivity.",
        "Use Flow Logs if available to distinguish rejected traffic from traffic not reaching the subnet.",
        "Apply the narrowest approved network correction.",
        "Retest from the original authorized client network."
      ],
      validation: [
        "SSH works from the approved source.",
        "No unrestricted public SSH rule was introduced.",
        "Application traffic remains healthy.",
        "The network change is documented and reviewed."
      ]
    },
    {
      scenario: "Public-key authentication fails",
      steps: [
        "Verify the AMI-specific username.",
        "Use verbose SSH output to confirm which key is offered.",
        "Check whether the key is the approved key for the intended instance and account.",
        "Use Session Manager or another approved access path to inspect sshd logs and authorized_keys.",
        "Correct account ownership, file permissions, or key installation only after evidence confirms the problem.",
        "If the private key is lost, follow the approved access recovery and credential rotation process."
      ],
      validation: [
        "The intended user can authenticate using the approved key.",
        "Root login and unnecessary password authentication remain disabled.",
        "Key material is not exposed in logs, chat, or source control.",
        "Authentication failures and unexpected access attempts are reviewed."
      ]
    },
    {
      scenario: "sshd is stopped or configuration is invalid",
      steps: [
        "Establish an alternate administrative session before changing SSH configuration if possible.",
        "Inspect service status, listening sockets, journal logs, and the relevant configuration files.",
        "Back up the configuration using the organization's approved procedure.",
        "Run sshd -t and correct the reported configuration problem.",
        "Restart or reload the SSH service only after validation and impact review.",
        "Keep the alternate session open while testing a new SSH connection."
      ],
      validation: [
        "sshd is active and listening on the intended interface and port.",
        "A new session can authenticate from the authorized network.",
        "Existing administrative access remains available.",
        "The configuration is managed so the failure is not recreated."
      ]
    },
    {
      scenario: "The instance is private and has no direct SSH path",
      steps: [
        "Confirm that the private-only design is intentional.",
        "Check approved VPN, Direct Connect, Transit Gateway, bastion, or Session Manager connectivity.",
        "Verify security groups and routes between the client or bastion and the target.",
        "Use Session Manager if the node and operator are properly configured.",
        "If a bastion is required, validate both SSH hops separately.",
        "Do not assign a public IP solely to bypass the intended access architecture."
      ],
      validation: [
        "The instance is reachable through the approved private access path.",
        "No unnecessary public exposure was added.",
        "Access permissions are least-privilege and auditable."
      ]
    },
    {
      scenario: "The instance is unhealthy or has a boot/resource failure",
      steps: [
        "Inspect EC2 status checks, console output, and AWS Health.",
        "Determine whether the failure is at the AWS infrastructure layer or inside the guest operating system.",
        "Check application redundancy and workload impact before disruptive recovery.",
        "Use an approved alternate access method to inspect disk, memory, services, and boot logs when available.",
        "Consider reboot, recovery workflows, volume diagnostics, or replacement only according to the documented recovery plan.",
        "Before stop/start or volume operations, verify data persistence, backups, IP behavior, and Auto Scaling ownership."
      ],
      validation: [
        "EC2 status checks return healthy.",
        "SSH and required operating system services work.",
        "Application health checks pass.",
        "Data integrity and the expected deployed version are verified."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "SSH is blocked after a security group change",
      investigation: [
        "Identify the exact security group attached to the affected network interface.",
        "Review inbound TCP/22 source ranges and rule history.",
        "Check whether the source IP changed because the engineer disconnected from VPN or changed networks.",
        "Inspect NACLs and routing before concluding the security group is responsible.",
        "Correlate CloudTrail events with the incident start time."
      ],
      resolution: [
        "Restore the approved source rule through change control.",
        "Use a bastion security group reference or approved VPN range where appropriate.",
        "Avoid permanent 0.0.0.0/0 SSH access.",
        "Add configuration review and alerting for risky inbound rules."
      ]
    },
    {
      scenario: "SSH is unavailable after an OS patch",
      investigation: [
        "Check EC2 status checks and console output.",
        "Inspect boot and system journal logs using an alternate recovery path.",
        "Check SSH package updates, sshd configuration, firewall changes, disk capacity, and service startup errors.",
        "Determine whether the instance is still passing application health checks.",
        "Compare the patch window with the first failure."
      ],
      resolution: [
        "Correct the failed service or configuration using the approved recovery process.",
        "Use a tested rollback or image-recovery plan if the OS cannot be safely repaired in place.",
        "Validate a representative test instance before patching additional production instances.",
        "Add SSH health checks and post-patch validation."
      ]
    },
    {
      scenario: "SSH stops working after an IP or DNS change",
      investigation: [
        "Query the current EC2 public/private addresses.",
        "Resolve the hostname from the same network used by the client.",
        "Check whether a stop/start or replacement changed the public IPv4 address.",
        "Verify whether a static allowlist or bastion configuration still references an old address.",
        "Confirm the destination host identity before authenticating."
      ],
      resolution: [
        "Use a stable endpoint strategy where justified, such as an Elastic IP for appropriate public-facing designs or private DNS for private access.",
        "Update dependent allowlists and records through change control.",
        "Use host-key verification to confirm the intended server.",
        "Document which address types are stable and which can change."
      ]
    },
    {
      scenario: "A key was deleted, lost, or may be compromised",
      investigation: [
        "Determine whether the private key is missing, incorrect, or suspected to be exposed.",
        "Identify which users, automation systems, and instances depend on that key.",
        "Check available alternate access, such as Session Manager or the approved break-glass procedure.",
        "Review authentication logs and access history for suspicious use.",
        "Do not request or copy the private key from another person's workstation."
      ],
      resolution: [
        "Generate and distribute a replacement key through the approved secure process.",
        "Install the corresponding public key using an authorized recovery method.",
        "Remove the compromised public key from affected accounts and systems when safe.",
        "Update automation credentials and validate access.",
        "Record the rotation and review possible unauthorized use."
      ]
    },
    {
      scenario: "SSH works from the bastion but not from the engineer's laptop",
      investigation: [
        "Test laptop-to-bastion TCP/22 separately.",
        "Test bastion-to-instance TCP/22 separately.",
        "Compare the security group source rules for each hop.",
        "Inspect VPN routing, local firewall, DNS, proxy, and SSH client configuration.",
        "Use the same intended username and key identity when comparing results."
      ],
      resolution: [
        "Repair the failing hop only.",
        "Keep private instances private and use the approved bastion or VPN path.",
        "Use ProxyJump or the organization's approved connection manager.",
        "Document the expected access path and required source ranges."
      ]
    },
    {
      scenario: "Session Manager is unavailable during an SSH incident",
      investigation: [
        "Check whether the instance is registered as a managed node.",
        "Inspect the instance profile, required IAM permissions, SSM Agent status, and network endpoint reachability.",
        "Check whether the instance resides in a private subnet without the required endpoint connectivity.",
        "Determine whether the failure affects one instance or all managed nodes in the environment.",
        "Review organization-level policies that restrict Systems Manager access."
      ],
      resolution: [
        "Restore the missing documented prerequisite or use the approved break-glass access path.",
        "Do not assume that installing an agent alone fixes IAM and networking problems.",
        "Test Session Manager in a non-production environment before relying on it as the only recovery mechanism.",
        "Monitor managed-node registration and session availability."
      ]
    },
    {
      scenario: "SSH connections are slow because the host is overloaded",
      investigation: [
        "Check CPU, memory, disk capacity, inodes, load average, and kernel logs.",
        "Review authentication service and DNS delays.",
        "Determine whether the issue began after a deployment, scheduled job, backup, or traffic spike.",
        "Check whether multiple users experience the same delay.",
        "Inspect application health before terminating processes or changing instance size."
      ],
      resolution: [
        "Address the measured bottleneck and follow the approved resource-recovery plan.",
        "Avoid killing processes based only on high CPU usage without identifying their role.",
        "Consider capacity changes or workload redistribution only after impact review.",
        "Add resource and login-latency monitoring where appropriate."
      ]
    },
    {
      scenario: "A private key works on one instance but not another",
      investigation: [
        "Confirm that the instances were launched from images with the expected key configuration.",
        "Check the username, public key installation, account state, and sshd policy on each instance.",
        "Review whether configuration management overwrote authorized_keys.",
        "Compare instance identity, AMI, launch template, and bootstrap logs.",
        "Do not assume the EC2 key pair metadata automatically repairs an already-running guest's authorized_keys file."
      ],
      resolution: [
        "Correct the account/key configuration through the approved method.",
        "Repair the launch template or configuration-management source if it caused inconsistent instances.",
        "Test a newly launched non-production instance before broad rollout.",
        "Document how key access is provisioned and rotated."
      ]
    }
  ],

  prevention: [
    "Prefer Session Manager or a private bastion/VPN design over unrestricted public SSH.",
    "Restrict SSH source addresses to approved networks and review changes regularly.",
    "Use least-privilege IAM permissions for EC2, Systems Manager, and network administration.",
    "Keep private keys out of Git repositories, chat, tickets, and application logs.",
    "Use an approved key lifecycle, rotation, and emergency access process.",
    "Maintain tested Session Manager or break-glass recovery for critical instances.",
    "Monitor EC2 system and instance status checks.",
    "Monitor disk usage, inode consumption, memory pressure, CPU, and application health.",
    "Validate SSH configuration with sshd -t before applying changes.",
    "Use configuration management to keep sshd, host firewall, user accounts, and authorized_keys consistent.",
    "Test operating system patching and bootstrap changes in a representative non-production environment.",
    "Use stable DNS and endpoint strategies where operationally appropriate.",
    "Enable and retain VPC Flow Logs and CloudTrail according to security and operational requirements.",
    "Alert on risky security group changes that expose SSH broadly.",
    "Document public versus private instance access paths and AMI-specific usernames.",
    "Include SSH and alternate-access validation in instance build and post-patch checks.",
    "Review Auto Scaling, launch template, and AMI configuration to prevent repeated access failures.",
    "Run periodic recovery exercises to verify that the documented access path actually works."
  ],

  monitoringAndAlerting: [
    "Alert when EC2 system or instance status checks fail.",
    "Monitor CPU, memory where an agent is available, disk usage, inode usage, and application health.",
    "Monitor SSM managed-node availability for instances that rely on Session Manager.",
    "Alert on unexpected security group rules that expose TCP/22 broadly.",
    "Review repeated SSH authentication failures through approved operating system and security logging.",
    "Correlate network access failures with security group, route, NACL, and instance changes.",
    "Track the number of affected instances, time to restore access, and whether application availability was impacted.",
    "Do not expose usernames, private IPs, hostnames, authentication logs, or credentials in public alert channels.",
    "Use CloudWatch, AWS Config, CloudTrail, and approved security monitoring tools according to the account's architecture.",
    "Create a runbook that maps timeout, refused connection, public-key denial, host-key warning, and failed status checks to distinct diagnostic paths."
  ],

  incidentReportTemplate: [
    "Incident title: EC2 SSH connectivity failure",
    "Incident ID:",
    "AWS account and Region:",
    "Instance ID and environment:",
    "Incident start and detection time:",
    "Affected users, instances, and services:",
    "Exact SSH error:",
    "Client source network and access method:",
    "Instance state and EC2 status checks:",
    "Security group, route, NACL, and host firewall findings:",
    "SSH service and authentication findings:",
    "Relevant CloudTrail or Flow Logs evidence:",
    "Evidence-backed root cause:",
    "Corrective action and approval:",
    "Recovery method:",
    "SSH validation result:",
    "Application health validation:",
    "Security validation and exposed-access review:",
    "Recovery duration:",
    "Prevention action, owner, and due date:"
  ],

  handsOnLabs: [
    {
      lab: "Lab 1 — Diagnose a security group source mismatch",
      steps: [
        "Use a disposable EC2 instance in a test VPC.",
        "Record the instance ID, public/private IP, and attached security group.",
        "Restrict inbound SSH to an approved test source.",
        "Attempt access from the approved and an unapproved source.",
        "Inspect the TCP test, security group, and available Flow Logs.",
        "Restore the intended test rule and verify access."
      ],
      expectedResult:
        "You can distinguish a source-rule mismatch from a generic SSH failure without opening port 22 to everyone."
    },
    {
      lab: "Lab 2 — Diagnose public-key authentication failure",
      steps: [
        "Use a non-production instance and a test key pair.",
        "Try the wrong username or wrong test key.",
        "Capture the SSH error and verbose client evidence.",
        "Use an approved alternate session to inspect authentication logs.",
        "Restore the correct test account/key configuration.",
        "Verify that authentication succeeds without enabling unnecessary password or root access."
      ],
      expectedResult:
        "You can distinguish an authentication problem from a network timeout."
    },
    {
      lab: "Lab 3 — Recover through Session Manager",
      steps: [
        "Configure a disposable instance as a Systems Manager managed node.",
        "Verify instance profile, agent health, IAM access, and endpoint connectivity.",
        "Start an SSM session.",
        "Inspect sshd status, configuration syntax, and operating system resources.",
        "Make a controlled test correction and verify SSH from the approved network."
      ],
      expectedResult:
        "You can use an approved alternate access path to investigate an SSH problem without exposing the instance publicly."
    },
    {
      lab: "Lab 4 — Simulate a production-style incident",
      steps: [
        "Use a test environment and document the known-good network and SSH configuration.",
        "Introduce one controlled fault, such as an incorrect test security group source or stopped test SSH service.",
        "Record the exact symptom and timestamp.",
        "Follow the diagnostic workflow in order and capture evidence at each step.",
        "Apply only the correction supported by the evidence.",
        "Validate SSH, application health, security posture, and the rollback plan.",
        "Write an incident report and identify one prevention improvement."
      ],
      expectedResult:
        "You can isolate the failing layer, restore access safely, and document evidence-backed root cause and prevention."
    }
  ],

  interviewQuestions: [
    {
      question: "What are the first checks when SSH to EC2 fails?",
      answer:
        "I confirm the AWS account, Region, instance state, destination IP, status checks, and exact SSH error. Then I distinguish network reachability from authentication and service failures."
    },
    {
      question: "What is the difference between a timeout and Permission denied (publickey)?",
      answer:
        "A timeout generally indicates that a connection could not complete because of filtering, routing, or an unresponsive endpoint. Permission denied (publickey) usually means the SSH server was reached but did not accept the offered key for that account."
    },
    {
      question: "What is required for direct SSH to a public IPv4 EC2 instance?",
      answer:
        "The instance needs an appropriate public endpoint, a route through an attached Internet Gateway, matching security group and NACL rules, a reachable SSH service, and valid authentication."
    },
    {
      question: "Can a NAT Gateway provide inbound SSH to a private EC2 instance?",
      answer:
        "No. A NAT Gateway is primarily for outbound connectivity from private subnets. Use an approved private access path such as VPN, bastion, or Session Manager."
    },
    {
      question: "What is the difference between a security group and a network ACL?",
      answer:
        "Security groups are stateful and attached to network interfaces. Network ACLs are stateless subnet-level filters, so both inbound and outbound rules must allow the relevant traffic."
    },
    {
      question: "How do you troubleshoot Connection refused?",
      answer:
        "I confirm the endpoint, then inspect the SSH listener, service status, host firewall, and service logs using an approved alternate session."
    },
    {
      question: "How do you troubleshoot Permission denied (publickey)?",
      answer:
        "I verify the AMI-specific username, selected key, public key installation, authorized_keys ownership and permissions, effective sshd configuration, and authentication logs."
    },
    {
      question: "What is the benefit of AWS Systems Manager Session Manager?",
      answer:
        "It can provide auditable instance access without requiring a public SSH endpoint, provided IAM, managed-node, agent, and network prerequisites are satisfied."
    },
    {
      question: "What do EC2 system and instance status checks indicate?",
      answer:
        "System checks assess the underlying AWS infrastructure, while instance checks assess the guest instance's health and reachability. They help determine whether to investigate infrastructure or operating system problems."
    },
    {
      question: "Would you open SSH to 0.0.0.0/0 to fix a timeout?",
      answer:
        "No. I identify the blocking layer and use the smallest approved source range or private access path. Unrestricted public SSH increases exposure and does not fix route, host firewall, or service problems."
    },
    {
      question: "What do you do if an SSH host key changes unexpectedly?",
      answer:
        "I stop and verify the host identity through a trusted channel. I do not disable host-key verification or blindly remove the known_hosts entry."
    },
    {
      question: "When should you reboot an inaccessible instance?",
      answer:
        "Only after reviewing status checks, console evidence, application impact, data persistence, redundancy, and the approved recovery plan. Rebooting without diagnosis can worsen an incident."
    },
    {
      question: "How do you investigate SSH failure after an operating system patch?",
      answer:
        "I compare the patch timeline with status checks, boot logs, sshd configuration, service state, firewall rules, disk capacity, and resource metrics. I repair or roll back based on evidence."
    },
    {
      question: "How do you prove that a security group caused the failure?",
      answer:
        "I verify the group attached to the target interface, compare its effective inbound rule with the real source, and corroborate with connectivity tests or available Flow Logs. I also check routes, NACLs, and host-level filtering."
    },
    {
      question: "What evidence belongs in an EC2 SSH incident report?",
      answer:
        "The instance and account, timestamp, exact error, source network, status checks, network and SSH findings, evidence-backed cause, corrective action, access validation, application health, and prevention owner."
    }
  ],

  officialReferences: [
    {
      title: "Troubleshoot connecting to your Linux instance",
      url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/TroubleshootingInstancesConnecting.html"
    },
    {
      title: "EC2 instance status checks",
      url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-system-instance-status-check.html"
    },
    {
      title: "Security groups for your VPC",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html"
    },
    {
      title: "Network ACLs for your VPC",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html"
    },
    {
      title: "AWS Systems Manager Session Manager",
      url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html"
    },
    {
      title: "EC2 Instance Connect",
      url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-connect-methods.html"
    },
    {
      title: "VPC Flow Logs",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html"
    },
    {
      title: "AWS CloudTrail lookup-events",
      url: "https://docs.aws.amazon.com/cli/latest/reference/cloudtrail/lookup-events.html"
    }
  ]
};
