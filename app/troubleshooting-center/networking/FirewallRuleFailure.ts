
export const firewallRuleFailureGuide = {
  id: "networking-firewall-rule-failure",
  title: "Firewall Rule Failure",
  filePath: "app/troubleshooting-center/networking/FirewallRuleFailure.ts",
  category: "Networking",
  difficulty: "Advanced",
  estimatedTime: "60-120 minutes",
  tags: [
    "firewall",
    "network-security",
    "iptables",
    "nftables",
    "AWS",
    "Azure",
    "GCP",
    "Kubernetes",
    "packet-capture",
    "incident-response",
  ],

  overview: {
    summary:
      "Diagnose firewall rules that unexpectedly block required traffic or allow traffic that should be denied. Identify the exact filtering layer, collect evidence, implement the smallest approved correction, and verify the real application path.",
    objectives: [
      "Identify the exact source, destination, protocol, and port for a failed connection.",
      "Distinguish firewall drops from DNS, routing, NAT, TLS, service-listener, and application failures.",
      "Understand rule ordering, matching criteria, connection tracking, and return-path behavior.",
      "Use packet captures, counters, flow logs, cloud diagnostics, and Kubernetes policy inspection.",
      "Apply controlled fixes with an approved rollback plan.",
      "Validate both connectivity recovery and security boundaries after the fix.",
    ],
    assumptions: [
      "Linux commands apply to Linux systems and require suitable permissions.",
      "Cloud commands require the relevant CLI, authenticated account, correct subscription/project, and read permissions.",
      "Kubernetes commands require access to the correct cluster and namespace.",
      "Examples use documentation-only IP addresses and placeholder resource names.",
      "Firewall implementations differ: do not assume that AWS security groups, AWS network ACLs, Linux nftables, and cloud firewall policies have identical evaluation semantics.",
    ],
  },

  incidentScenario: {
    title: "Production incident: application suddenly cannot connect to its backend",
    timeline: [
      {
        time: "T+00 min",
        event:
          "Users report HTTP 502/504 errors. Application logs show backend connection timeouts.",
      },
      {
        time: "T+05 min",
        event:
          "The deployment team identifies a recent firewall-policy change. The change may have affected TCP 8443 between application and backend subnets.",
      },
      {
        time: "T+10 min",
        event:
          "Engineers verify the correct source IP, destination IP, destination port, protocol, route, and firewall policy attachment.",
      },
      {
        time: "T+15 min",
        event:
          "Cloud diagnostics and packet captures identify whether traffic is blocked before reaching the backend or on the return path.",
      },
      {
        time: "T+25 min",
        event:
          "The team implements a narrow, approved correction, tests a new connection, and checks application-level health.",
      },
    ],
    symptoms: [
      "Connection attempts time out after a firewall or network-policy change.",
      "One subnet or environment fails while another remains healthy.",
      "A port works from a bastion host but fails from an application server.",
      "Inbound traffic succeeds but outbound traffic or replies fail.",
      "New connections fail while existing connections temporarily continue working.",
      "A load balancer reports unhealthy backends.",
      "A container can reach another container in one namespace but not another.",
      "An overly permissive rule unexpectedly exposes a service.",
    ],
    businessImpact: [
      "Customer-facing requests fail or become slow.",
      "Deployments, health checks, and service-to-service communication fail.",
      "Administrative access or monitoring becomes unavailable.",
      "Unauthorized network access may occur if a deny rule is ineffective.",
    ],
  },

  impactAndSeverity: {
    questions: [
      "Which environment is affected: production, staging, or development?",
      "Which source systems and destination services are affected?",
      "Is the failure inbound, outbound, or bidirectional?",
      "Does it affect all clients or only a particular subnet, node, region, or IP range?",
      "Did a firewall, route, DNS, NAT, deployment, or security-policy change occur immediately before the incident?",
      "Are there signs of unauthorized access or an unexpectedly open port?",
      "Is a customer-facing service or a critical security boundary affected?",
    ],
    levels: [
      {
        severity: "SEV-1",
        condition:
          "Widespread production outage, critical network isolation, or confirmed exposure of a sensitive service.",
        action:
          "Declare the incident, engage network/security/on-call owners, preserve evidence, and follow the emergency change process.",
      },
      {
        severity: "SEV-2",
        condition:
          "Major service degradation, a critical dependency unavailable, or multiple production workloads affected.",
        action:
          "Prioritize evidence collection and a narrow, approved mitigation.",
      },
      {
        severity: "SEV-3",
        condition:
          "Limited workload impact with a documented workaround.",
        action:
          "Investigate through the normal change process and track corrective actions.",
      },
    ],
    note:
      "Severity depends on actual business impact and security risk, not just the number of firewall rules involved.",
  },

  safetyChecks: [
    {
      check: "Confirm the environment",
      actions: [
        "Verify account, subscription, cloud project, region, VPC/VNet, subnet, host, and namespace.",
        "Confirm that the destination IP belongs to the intended workload.",
        "Check IPv4 versus IPv6 and private versus public addressing.",
      ],
    },
    {
      check: "Protect production access",
      actions: [
        "Confirm the approved change ticket and change owner.",
        "Ensure an independent management path or out-of-band console is available before changing SSH, RDP, VPN, or administrative access rules.",
        "Do not modify a production rule based only on a single timeout.",
      ],
    },
    {
      check: "Preserve evidence",
      actions: [
        "Record UTC timestamps, observed source and destination, rule IDs, current configuration, and relevant logs.",
        "Export or snapshot the applicable configuration using supported mechanisms.",
        "Keep audit logs and packet captures according to security and privacy policy.",
      ],
    },
    {
      check: "Avoid dangerous shortcuts",
      actions: [
        "Never flush all firewall rules to test connectivity.",
        "Never disable the host firewall or allow all inbound traffic as a quick fix.",
        "Do not open SSH, RDP, databases, or administrative ports to 0.0.0.0/0 or ::/0 without a formally approved and justified requirement.",
        "Do not overwrite cloud-managed or Kubernetes-managed firewall rules directly on individual nodes.",
        "Do not capture payloads or authentication secrets unnecessarily.",
      ],
    },
  ],

  incidentEvidence: {
    requiredFields: [
      "Incident ID and change ticket",
      "First observed failure timestamp and timezone",
      "Source hostname, IP, subnet, and workload identity",
      "Destination hostname, IP, subnet, and service",
      "Protocol and destination port",
      "Expected traffic direction",
      "Actual error and application request ID",
      "Firewall rule IDs, priorities, actions, and attachment points",
      "Routing, NAT, load-balancer, and security-policy configuration",
      "Relevant logs and packet-capture timestamps",
      "Last known successful connection and last known configuration change",
    ],
    correlation:
      "Correlate events using the same time window and five-tuple wherever possible: source IP, source port, destination IP, destination port, and protocol. NAT may change addresses or ports, so correlate pre-NAT and post-NAT observations separately.",
  },

  diagnosticCommands: [
    {
      title: "1. Confirm host identity and network addresses",
      commands: [
        "hostname -f",
        "date -u",
        "ip -br address",
        "ip route",
        "ip -6 route",
      ],
      interpretation: [
        "A wrong host, address, subnet, or address family can make a correct firewall rule appear ineffective.",
        "Verify whether the application connects to an IP address or a DNS name.",
        "Use the actual interface and address discovered on the host; do not assume the interface is eth0.",
      ],
    },
    {
      title: "2. Confirm the route and source address",
      commands: [
        "ip route get 10.20.30.40",
        "ip -6 route get 2001:db8::40",
      ],
      interpretation: [
        "Replace the example destination with the real destination IP.",
        "The result helps identify the selected route, egress interface, and source address.",
        "A wrong route, VPN path, or asymmetric return route can cause failures even when a firewall rule is correct.",
      ],
    },
    {
      title: "3. Check whether the destination service is listening",
      commands: [
        "sudo ss -lntup",
        "sudo ss -lntp '( sport = :8443 )'",
      ],
      interpretation: [
        "If no process is listening on the expected port, investigate the service before changing firewall rules.",
        "A service bound only to 127.0.0.1 may be unavailable through the host's external or private IP.",
        "A listener does not prove that traffic can traverse the entire network path.",
      ],
    },
    {
      title: "4. Inspect Linux firewall configuration",
      commands: [
        "sudo nft list ruleset",
        "sudo iptables -S",
        "sudo iptables -L -n -v --line-numbers",
        "sudo ip6tables -S",
        "sudo ip6tables -L -n -v --line-numbers",
      ],
      interpretation: [
        "Identify the firewall backend actually in use before making changes.",
        "Inspect input, output, forward, and relevant custom chains.",
        "Check default policies, explicit drops, counters, connection-state matches, and rule ordering.",
        "iptables may use the nftables backend on some systems; do not assume that every displayed command represents a separate independent firewall.",
      ],
      caution:
        "These commands are for inspection. Do not run flush, reset, or broad ACCEPT commands during an incident.",
    },
    {
      title: "5. Check the host's firewall management service",
      commands: [
        "sudo systemctl status nftables --no-pager",
        "sudo systemctl status firewalld --no-pager",
        "sudo ufw status verbose",
      ],
      interpretation: [
        "Use the command relevant to the distribution and installed firewall manager.",
        "A missing unit or command may simply mean that the tool is not installed.",
        "A running service alone does not prove that the intended rules are loaded.",
      ],
    },
    {
      title: "6. Test the TCP connection",
      commands: [
        "nc -vz -w 3 10.20.30.40 8443",
        "curl -vk --connect-timeout 3 https://10.20.30.40:8443/health",
      ],
      interpretation: [
        "Replace the sample IP and port with the approved test target.",
        "A timeout can indicate packet drops, routing issues, return-path problems, or an unresponsive endpoint.",
        "Connection refused usually indicates an active rejection or that the target is not listening, but packet-level evidence is needed to distinguish them.",
        "A successful TCP connection followed by TLS or HTTP failure points to a later layer.",
        "Use -k only as a temporary diagnostic to separate certificate validation from connectivity; do not treat it as a production fix.",
      ],
    },
    {
      title: "7. Capture a short, narrowly filtered packet trace",
      commands: [
        "sudo timeout 30 tcpdump -ni any -nn -c 200 'host 10.20.30.40 and tcp port 8443'",
      ],
      interpretation: [
        "Run on the source and, if authorized, the destination host.",
        "Repeated outbound SYN packets with no reply suggest a drop or missing return path somewhere after the source capture point.",
        "A SYN arriving at the destination but no SYN-ACK returning points toward the destination listener, host firewall, kernel, or reply path.",
        "A completed TCP handshake followed by TLS alerts or HTTP errors suggests that the failure is above the basic TCP-connectivity layer.",
        "No packets at the source capture point may indicate the application is not attempting the connection, the wrong host/interface was captured, or a local path issue.",
      ],
      caution:
        "Packet capture can expose sensitive metadata. Limit duration, packet count, scope, access, and retention.",
    },
    {
      title: "8. Check kernel and connection-tracking evidence",
      commands: [
        "sudo journalctl -k --since '15 minutes ago'",
        "sudo dmesg --ctime",
        "sudo conntrack -S",
      ],
      interpretation: [
        "Look for firewall drops, connection-tracking table exhaustion, interface errors, or relevant kernel messages.",
        "conntrack is optional and may not be installed or permitted.",
        "A high connection-tracking count is not proof of exhaustion; compare with limits, failed allocations, and time-correlated symptoms.",
      ],
    },
    {
      title: "9. Inspect DNS separately",
      commands: [
        "getent ahosts api.example.com",
        "dig +time=2 +tries=1 api.example.com",
      ],
      interpretation: [
        "Compare the resolved addresses with the intended destination.",
        "Check A and AAAA records separately when IPv4 works but IPv6 fails.",
        "DNS resolution failure is not automatically a firewall-rule failure.",
      ],
    },
  ],

  diagnosticSequence: [
    {
      step: 1,
      name: "Define the exact failing flow",
      actions: [
        "Record source IP, destination IP, destination port, protocol, direction, and timestamp.",
        "Identify the process and exact error: timeout, refusal, reset, TLS failure, or HTTP error.",
        "Compare one failing source with one known-good source.",
      ],
      branch: {
        timeout:
          "Continue to packet captures, firewall decisions, routes, and return-path checks.",
        refused:
          "Verify the listener and look for an active reject or reset.",
        tlsOrHttpError:
          "Verify the TCP handshake first, then inspect TLS, certificates, proxy settings, and application logs.",
        onlyOneSourceFails:
          "Compare the source subnet, identity, route, egress policy, NAT address, and applicable rule scope.",
      },
    },
    {
      step: 2,
      name: "Check recent changes",
      actions: [
        "Inspect firewall audit logs, cloud activity logs, Git commits, IaC plans, and deployment timestamps.",
        "Identify rule creation, deletion, priority changes, target changes, source-range changes, and policy attachment changes.",
        "Determine whether the failure began immediately after a specific change.",
      ],
      branch:
        "If the timeline aligns, compare the exact before-and-after rule configuration. Temporal correlation alone is not sufficient proof of root cause.",
    },
    {
      step: 3,
      name: "Verify the application and endpoint",
      actions: [
        "Confirm the destination IP is correct.",
        "Check the service listener and application health.",
        "Test from the destination itself where appropriate.",
        "Check load-balancer backend health and whether the application listens on the expected interface.",
      ],
      branch:
        "If the destination service is not listening, fix the service or deployment rather than broadening the firewall.",
    },
    {
      step: 4,
      name: "Verify route and return route",
      actions: [
        "Inspect the source route and destination subnet route.",
        "Check route tables, VPNs, peering, transit gateways, NAT gateways, proxies, and network appliances.",
        "Verify the return path, especially in multi-homed or hybrid networks.",
      ],
      branch:
        "If the route is missing or asymmetric, follow the network change process. Do not add an unrelated allow rule to compensate for a routing fault.",
    },
    {
      step: 5,
      name: "Find the actual enforcement layer",
      actions: [
        "Check endpoint host firewall rules.",
        "Check cloud security groups, subnet ACLs, cloud firewall policies, and security appliances.",
        "Check load-balancer access controls and egress controls.",
        "Check Kubernetes NetworkPolicy and the CNI implementation when containers are involved.",
      ],
      branch:
        "Identify each enforcement layer on the path. A rule in one layer does not override a drop in another layer.",
    },
    {
      step: 6,
      name: "Evaluate rule matching",
      actions: [
        "Check ingress versus egress.",
        "Check source and destination CIDRs, protocol, port, address family, target selectors, service identity, and rule priority.",
        "Check implicit defaults, explicit deny rules, shadowed rules, and higher-level policy inheritance.",
        "Check whether the actual source IP changed because of NAT, a proxy, or a load balancer.",
      ],
      branch:
        "If a rule does not match the observed five-tuple or the target resource, correct the specific mismatch rather than allowing a wider range.",
    },
    {
      step: 7,
      name: "Collect decision evidence",
      actions: [
        "Inspect rule counters and firewall logs.",
        "Inspect cloud flow logs and policy audit logs.",
        "Run provider connectivity diagnostics.",
        "Capture packets at the source and destination when the evidence is still ambiguous.",
      ],
      branch:
        "A provider configuration analyzer may simulate the path without proving that live application packets traverse that path. Correlate it with live evidence.",
    },
    {
      step: 8,
      name: "Check connection state and return traffic",
      actions: [
        "Determine whether the firewall is stateful or stateless.",
        "Check established-connection tracking and whether the failure affects only new connections.",
        "For stateless filters, validate the required return direction and ephemeral-port behavior.",
        "Inspect NAT translations and connection-tracking capacity where applicable.",
      ],
      branch:
        "Do not assume that a successful inbound allow automatically permits replies on every firewall platform.",
    },
    {
      step: 9,
      name: "Check for policy propagation and configuration drift",
      actions: [
        "Compare the live configuration with the approved IaC or policy source.",
        "Check whether the new rule is attached to the correct subnet, interface, resource, namespace, or workload.",
        "Allow for provider-specific propagation delays before repeating configuration analysis.",
        "Check for controllers that may overwrite manual changes.",
      ],
      branch:
        "If a controller owns the policy, correct the source configuration and reconcile through the supported workflow.",
    },
    {
      step: 10,
      name: "Implement the smallest safe correction",
      actions: [
        "Document the intended source, destination, protocol, port, direction, and business justification.",
        "Obtain required approval.",
        "Change only the confirmed rule or policy attachment.",
        "Keep the change reversible and record the previous configuration.",
      ],
      branch:
        "If the change does not match the expected behavior, stop and roll back rather than adding progressively broader rules.",
    },
    {
      step: 11,
      name: "Validate recovery",
      actions: [
        "Test a new connection from the actual affected source.",
        "Confirm the relevant allow/deny log or rule counter.",
        "Validate application health, error rates, latency, and load-balancer health.",
        "Verify that unauthorized source ranges and unrelated ports remain blocked.",
      ],
      branch:
        "If the rule appears correct but traffic still fails, revisit routing, host firewall, return path, service health, and policy propagation.",
    },
    {
      step: 12,
      name: "Close the incident and prevent recurrence",
      actions: [
        "Record root cause and supporting evidence.",
        "Document the exact configuration change and rollback result.",
        "Add an automated connectivity or policy regression test.",
        "Assign owners and deadlines for monitoring, IaC validation, and documentation updates.",
      ],
    },
  ],

  ruleSemantics: {
    general: [
      "Ingress means traffic entering the protected target; egress means traffic leaving it. Verify the provider's exact perspective.",
      "Priority conventions differ. In Google Cloud VPC firewall rules, a lower numerical priority means higher priority. Other systems have different evaluation models.",
      "An allow rule is useful only when its direction, protocol, port, source/destination, and target all match the actual traffic.",
      "Some systems stop at the first matching rule; others combine allow rules or use stateful connection tracking.",
      "IPv4 and IPv6 policies must be examined independently where both are enabled.",
      "A cloud firewall allow does not guarantee connectivity if the host firewall, route, application listener, or another policy blocks the traffic.",
    ],
    aws: {
      securityGroups:
        "AWS security groups are stateful and allow rules only; responses to allowed traffic are automatically permitted by connection tracking.",
      networkAcls:
        "AWS network ACLs are stateless and evaluate numbered rules in order. Return traffic must be permitted independently.",
      check:
        "Inspect both the security groups attached to the network interface and the network ACLs associated with the relevant subnets.",
      reference:
        "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html",
    },
    azure: {
      check:
        "Use Network Watcher IP flow verify or NSG diagnostics to identify whether traffic is allowed or denied and which applicable rule is responsible. Check subnet and NIC-level NSGs and applicable security-admin policies.",
      reference:
        "https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-network/virtual-network-troubleshoot-nsg-blocking-traffic",
      note:
        "For new deployments, use Azure VNet flow logs where appropriate. Azure NSG flow logs are being retired, with new creation disabled since June 30, 2025 and retirement scheduled for September 30, 2027.",
    },
    googleCloud: {
      check:
        "Inspect firewall direction, priority, action, target tags or service accounts, source/destination ranges, enforcement state, and logging. A higher-priority matching rule can determine the result before a lower-priority rule.",
      reference:
        "https://docs.cloud.google.com/firewall/docs/firewalls",
      note:
        "Connectivity Tests analyzes configuration and may perform live data-plane analysis in supported scenarios. Configuration results alone do not prove that the application path is healthy.",
    },
    kubernetes: {
      check:
        "Inspect namespace and pod labels, ingress/egress policyTypes, peer selectors, ports, service endpoints, and CNI support.",
      commands: [
        "kubectl get networkpolicy -A",
        "kubectl describe networkpolicy -n <namespace> <policy-name>",
        "kubectl get pods -n <namespace> --show-labels",
        "kubectl get endpointslices -n <namespace>",
      ],
      note:
        "NetworkPolicy behavior depends on a network plugin that implements it. Kubernetes NetworkPolicy does not provide arbitrary Layer 7 TLS filtering by itself.",
      reference:
        "https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    },
  },

  cloudDiagnostics: {
    aws: {
      tool: "VPC Reachability Analyzer",
      useWhen:
        "You need to identify a configuration component blocking connectivity between supported VPC resources.",
      workflow: [
        "Select the exact source and destination resources.",
        "Specify the intended protocol and destination port.",
        "Run the analysis and inspect the hop-by-hop path.",
        "Check the reported security group, network ACL, route table, or other blocking component.",
        "Compare the analysis with flow logs and live application tests.",
      ],
      limitation:
        "Reachability Analyzer analyzes network configuration; it is not a general end-to-end application health test.",
      reference:
        "https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html",
    },
    azure: {
      tool: "Network Watcher IP flow verify",
      example: [
        "az network watcher test-ip-flow --resource-group <resource-group> --vm <vm-name> --direction Inbound --protocol TCP --local <destination-ip>:8443 --remote <source-ip>:*",
      ],
      workflow: [
        "Confirm the correct subscription, region, VM, and NIC.",
        "Test the actual flow direction, protocol, local port, and remote IP.",
        "Read the allow/deny decision and matching rule.",
        "Use Connection troubleshoot and Next Hop if routing or another hop may be involved.",
      ],
      reference:
        "https://learn.microsoft.com/en-us/azure/network-watcher/diagnose-vm-network-traffic-filtering-problem",
    },
    googleCloud: {
      tool: "Network Intelligence Center Connectivity Tests",
      example: [
        "gcloud network-management connectivity-tests list",
      ],
      workflow: [
        "Use the Connectivity Tests UI or supported CLI/API workflow to define the exact source and destination.",
        "Check protocol, destination port, route, firewall evaluation, and the reported path.",
        "Inspect firewall logs and flow logs where enabled.",
        "Rerun the analysis after configuration changes have propagated.",
      ],
      note:
        "The list command only lists existing tests; it does not itself create or execute a test for the failing flow.",
      reference:
        "https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/how-to/running-connectivity-tests",
    },
  },

  evidenceDecisionMatrix: [
    {
      evidence:
        "No SYN leaves the source host during a reproducible connection attempt",
      likelyAreas: [
        "Application not initiating the connection",
        "Wrong destination or address family",
        "Local routing or local host policy",
        "Capture on the wrong host or interface",
      ],
      nextAction:
        "Confirm the process, destination, route, socket state, and capture location before changing a network firewall.",
    },
    {
      evidence:
        "SYN leaves the source but never reaches the destination capture point",
      likelyAreas: [
        "Network firewall or ACL drop",
        "Missing route",
        "NAT or network-appliance issue",
        "Wrong destination IP",
      ],
      nextAction:
        "Correlate cloud firewall decisions, flow logs, route analysis, and captures at successive supported observation points.",
    },
    {
      evidence:
        "SYN reaches the destination but no SYN-ACK is returned",
      likelyAreas: [
        "No listener",
        "Host firewall drop",
        "Service bind-address problem",
        "Kernel or return-route issue",
      ],
      nextAction:
        "Check listener state, host firewall counters, kernel logs, and the destination's return route.",
    },
    {
      evidence:
        "SYN-ACK leaves the destination but does not reach the source",
      likelyAreas: [
        "Return-path routing",
        "Stateless ACL missing return rule",
        "NAT or stateful-device issue",
        "Asymmetric path",
      ],
      nextAction:
        "Inspect the reverse path and applicable stateless rules; compare pre-NAT and post-NAT packet observations.",
    },
    {
      evidence:
        "TCP handshake succeeds but the application request fails",
      likelyAreas: [
        "TLS or certificate validation",
        "HTTP proxy or application configuration",
        "Authentication or authorization",
        "Backend dependency failure",
      ],
      nextAction:
        "Inspect TLS negotiation, HTTP response, application logs, and dependency health instead of broadening the network rule.",
    },
    {
      evidence:
        "Only newly created connections fail",
      likelyAreas: [
        "New rule evaluation",
        "Connection tracking",
        "NAT allocation",
        "Policy change affecting new flows",
      ],
      nextAction:
        "Compare new and existing flow behavior and provider-specific connection-tracking semantics.",
    },
    {
      evidence:
        "Rule counter increases for matching denied traffic",
      likelyAreas: [
        "Confirmed matching deny rule",
        "Unexpected source or destination range",
        "Wrong priority or policy attachment",
      ],
      nextAction:
        "Verify the logged five-tuple and rule ID before making a narrow approved correction.",
    },
    {
      evidence:
        "Cloud connectivity analyzer says reachable but application still fails",
      likelyAreas: [
        "Guest OS firewall",
        "Application listener or TLS failure",
        "Different actual data path",
        "Return-path or transient data-plane issue",
      ],
      nextAction:
        "Perform a real connection test and correlate packet captures, application logs, and live telemetry.",
    },
  ],

  rootCauseMatrix: [
    {
      cause: "Incorrect source CIDR",
      evidence:
        "Observed client or NAT address does not fall within the intended rule source range.",
      fix:
        "Correct the source range to the approved, smallest necessary network or identity scope.",
      prevention:
        "Document source ownership and validate CIDR changes in code review.",
    },
    {
      cause: "Incorrect port or protocol",
      evidence:
        "The application uses a different destination port or UDP/TCP protocol than the rule specifies.",
      fix:
        "Confirm the application's actual protocol and listener, then correct the narrow rule.",
      prevention:
        "Maintain a service-to-port inventory and automated connectivity tests.",
    },
    {
      cause: "Wrong direction",
      evidence:
        "The relevant rule applies to ingress while the failing traffic is egress, or vice versa.",
      fix:
        "Update the correct directional policy after validating the required flow.",
      prevention:
        "Represent source, destination, direction, and port explicitly in IaC.",
    },
    {
      cause: "Rule priority or shadowing",
      evidence:
        "An earlier or higher-priority matching rule determines the result, or a rule is shadowed.",
      fix:
        "Correct the precedence or scope of the specific rule, following the platform's evaluation model.",
      prevention:
        "Run policy analysis and regression tests before deployment.",
    },
    {
      cause: "Policy attached to wrong resource",
      evidence:
        "The expected rule exists but does not apply to the VM, NIC, subnet, tag, service account, or pod.",
      fix:
        "Correct the policy attachment or target selector.",
      prevention:
        "Validate effective rules on the deployed resource, not just the rule definition.",
    },
    {
      cause: "Stateless return traffic blocked",
      evidence:
        "The request reaches the destination but response packets are denied by a stateless ACL.",
      fix:
        "Permit only the required return traffic according to the platform's supported rule model.",
      prevention:
        "Test both directions and document ephemeral-port requirements.",
    },
    {
      cause: "Host firewall blocks traffic",
      evidence:
        "Traffic reaches the host but host firewall counters, logs, or policy show a drop.",
      fix:
        "Apply the smallest approved host-level rule using the host's managed firewall workflow.",
      prevention:
        "Manage host policies centrally and monitor rule drift.",
    },
    {
      cause: "Kubernetes policy selector mismatch",
      evidence:
        "Pod labels or namespace selectors do not match the expected policy peer.",
      fix:
        "Correct the labels or policy selector after verifying the intended workload boundary.",
      prevention:
        "Test policy changes with representative pod identities and namespaces.",
    },
    {
      cause: "Route or NAT issue",
      evidence:
        "Packet capture or route analysis shows an unexpected next hop or translated address.",
      fix:
        "Correct the routing or NAT configuration through the approved network workflow.",
      prevention:
        "Add path checks and monitor NAT and route changes.",
    },
  ],

  fixAndRecovery: {
    workflow: [
      "1. Capture the current policy and identify the exact rule or enforcement layer responsible.",
      "2. Compare the actual five-tuple with the intended application flow.",
      "3. Prepare the smallest configuration change that restores the required access.",
      "4. Obtain the required security and production approval.",
      "5. Record the previous state and define the rollback trigger.",
      "6. Apply the change through the authoritative system: cloud console/API, version-controlled IaC, configuration management, or Kubernetes manifests.",
      "7. Wait for the relevant control plane and data plane to reflect the change.",
      "8. Test a new connection from the actual affected source.",
      "9. Confirm the intended rule decision and application health.",
      "10. Test that unrelated and unauthorized traffic remains blocked.",
      "11. Roll back if unexpected exposure or broader impact occurs.",
      "12. Attach evidence and close the incident only after service and security validation.",
    ],
    exampleChange: {
      scenario:
        "An application subnet must reach a backend on TCP 8443, but the current approved rule references an obsolete source CIDR.",
      safeApproach: [
        "Confirm the source address seen by the enforcement layer, including any NAT or proxy translation.",
        "Confirm the backend listener and the applicable deny/allow decision.",
        "Update only the source range on the intended rule, keeping the destination and TCP port restricted.",
        "Use the organization's normal cloud/IaC workflow and review the resulting plan or diff.",
        "Validate connectivity from the affected application workload and verify unrelated sources remain denied.",
      ],
      avoid:
        "Do not create a global allow rule or disable the firewall just to prove that a firewall is involved.",
    },
    rollbackTriggers: [
      "The change exposes an unintended source range or administrative port.",
      "The change causes additional production failures.",
      "The observed rule decision does not match the expected result.",
      "A policy controller repeatedly reverts the change, indicating the authoritative configuration was not updated.",
    ],
    rollback:
      "Restore the recorded previous configuration through the same supported management mechanism. Revalidate both service recovery and security controls. Avoid improvised console edits that conflict with infrastructure-as-code ownership.",
  },

  validationChecklist: [
    "The original failing request succeeds from the real source workload.",
    "The destination service is healthy and listening on the expected address and port.",
    "The applicable firewall rule or policy is confirmed by logs, counters, or provider diagnostics.",
    "The return path is verified.",
    "Application error rate and latency return to the expected baseline.",
    "Load-balancer health checks and relevant service probes pass.",
    "Unauthorized source ranges remain denied.",
    "Unrelated ports and protocols remain restricted.",
    "IPv4 and IPv6 behavior is checked where applicable.",
    "No unintended rule, route, NAT, or policy changes remain.",
    "The final configuration matches the approved source of truth.",
    "Evidence, change ticket, rollback outcome, and root cause are recorded.",
  ],

  prevention: {
    policyDesign: [
      "Use least privilege: narrow sources, destinations, protocols, and ports.",
      "Avoid unrestricted administrative access from the public internet.",
      "Use meaningful rule names, owners, justifications, and expiry dates for temporary exceptions.",
      "Review duplicated, shadowed, stale, and unused rules.",
      "Document stateful versus stateless behavior and return-path requirements.",
      "Review both IPv4 and IPv6 policy coverage.",
    ],
    automation: [
      "Validate firewall policy syntax and IaC plans in CI.",
      "Run policy linting and security checks before deployment.",
      "Use staged rollout and approval for production rule changes.",
      "Add synthetic connectivity tests for critical service dependencies.",
      "Test both expected allowed flows and expected denied flows.",
      "Detect out-of-band configuration drift.",
    ],
    observability: [
      "Enable targeted firewall logging where supported and account for log volume and cost.",
      "Monitor denied-flow spikes, unexpected allowed flows, connection failures, and rule changes.",
      "Alert on critical dependency connectivity failures.",
      "Preserve cloud audit logs and configuration history.",
      "Use packet captures only when needed and keep them short and narrowly scoped.",
    ],
    changeManagement: [
      "Require peer review for production policy changes.",
      "Include expected source/destination flows, risk, validation, and rollback in each change request.",
      "Maintain a tested break-glass access path.",
      "Run post-change verification and periodic access reviews.",
    ],
  },

  monitoringSignals: [
    {
      signal: "Firewall deny count increases",
      meaning:
        "May indicate a new policy block, a changed client address, or unwanted scanning.",
      action:
        "Correlate denied flows with recent changes and the exact source/destination tuple.",
    },
    {
      signal: "Connection timeout rate increases",
      meaning:
        "Could indicate packet drops, routing issues, return-path failures, or an unhealthy endpoint.",
      action:
        "Correlate application metrics with flow logs and packet evidence.",
    },
    {
      signal: "Unexpected allowed traffic",
      meaning:
        "May indicate an overly broad rule or unintended policy attachment.",
      action:
        "Investigate as a potential security incident and preserve audit evidence.",
    },
    {
      signal: "Repeated policy drift",
      meaning:
        "A controller or automated deployment may be overwriting manual corrections.",
      action:
        "Fix the authoritative policy source and reconcile through the supported process.",
    },
  ],

  incidentReportTemplate: {
    incidentId: "",
    environment: "",
    service: "",
    severity: "",
    startTimeUtc: "",
    detectionSource: "",
    affectedSource: "",
    affectedDestination: "",
    protocolAndPort: "",
    userImpact: "",
    recentChanges: [],
    evidenceCollected: [],
    enforcementLayer: "",
    rootCause: "",
    remediation: "",
    rollbackPerformed: false,
    recoveryValidation: [],
    securityValidation: [],
    preventionActions: [],
    actionOwners: [],
    closureTimeUtc: "",
  },

  practicalLabs: [
    {
      title: "Lab 1: Wrong TCP port",
      goal:
        "Learn to distinguish a missing listener from a firewall drop.",
      tasks: [
        "Create two disposable test VMs in an isolated lab.",
        "Run a test service on an agreed non-production port.",
        "Test connectivity before and after a deliberately narrow lab-only policy change.",
        "Inspect listener state, firewall counters, and packet captures.",
        "Restore the original lab configuration.",
      ],
      successCriteria:
        "Explain whether the failure was caused by the listener, the policy, or another path component using evidence.",
    },
    {
      title: "Lab 2: Rule precedence",
      goal:
        "Understand how policy ordering affects a matching flow.",
      tasks: [
        "Create an isolated test policy with a deliberate conflict between two rules.",
        "Use the platform's documented evaluation semantics to predict the outcome.",
        "Run a provider diagnostic and inspect logs.",
        "Correct the policy without adding a broad allow rule.",
      ],
      successCriteria:
        "Identify the rule responsible for the decision and explain its precedence.",
    },
    {
      title: "Lab 3: Stateless return path",
      goal:
        "Understand why allowing inbound traffic may not be enough with a stateless ACL.",
      tasks: [
        "Use disposable resources and a documented TCP test.",
        "Inspect the request and response paths separately.",
        "Use flow logs or packet captures to identify the missing return permission.",
        "Apply a narrowly scoped correction and test again.",
      ],
      successCriteria:
        "Demonstrate the difference between stateful security-group behavior and stateless network ACL behavior.",
    },
    {
      title: "Lab 4: Kubernetes NetworkPolicy",
      goal:
        "Identify a selector or egress-policy mismatch.",
      tasks: [
        "Create a test namespace with a client pod and a backend pod.",
        "Record pod labels and current service endpoints.",
        "Apply a lab-only NetworkPolicy and test the intended connection.",
        "Inspect the policy, selectors, and CNI implementation.",
        "Restore the original lab state.",
      ],
      successCriteria:
        "Explain which policy selector or traffic direction caused the result.",
    },
    {
      title: "Lab 5: Cloud connectivity analysis",
      goal:
        "Use cloud-native diagnostics instead of guessing.",
      tasks: [
        "Create a test environment using the chosen cloud provider.",
        "Run the provider's supported reachability or IP-flow diagnostic.",
        "Compare the reported configuration path with a real TCP test.",
        "Document any differences between configuration analysis and live behavior.",
      ],
      successCriteria:
        "Produce an evidence-backed root cause and a safe recovery plan.",
    },
  ],

  interviewQuestions: [
    {
      question: "A TCP connection times out. Does that prove the firewall is blocking it?",
      answer:
        "No. A timeout can result from firewall drops, routing, NAT, return-path failures, host policy, or an unresponsive endpoint. Use a real connection attempt, packet captures, route inspection, and firewall decision logs to isolate the failure.",
    },
    {
      question: "What is the difference between a stateful firewall and a stateless ACL?",
      answer:
        "A stateful firewall tracks connections and normally permits response traffic for an allowed connection. A stateless ACL evaluates packets independently, so the required return direction must also be permitted.",
    },
    {
      question: "Why can an allow rule exist but still not permit traffic?",
      answer:
        "The rule may have the wrong direction, source range, destination, port, protocol, target selector, priority, or attachment. Another enforcement layer may also block the flow.",
    },
    {
      question: "How do you distinguish a firewall drop from a service-not-listening issue?",
      answer:
        "Check the listener, capture traffic at the destination, inspect host firewall counters and logs, and compare the TCP handshake. No listener or a service bound to the wrong interface can cause failure even when the network path permits traffic.",
    },
    {
      question: "Why can a cloud reachability test succeed while the application fails?",
      answer:
        "The tool may analyze configuration rather than the exact live application path. Host firewall rules, application listeners, TLS, dynamic routing, return-path issues, and unsupported paths can still cause failures.",
    },
    {
      question: "What should be verified after changing a production firewall rule?",
      answer:
        "Verify the actual connection from the intended source, the applicable rule decision, application health, the return path, and that unauthorized traffic remains blocked.",
    },
    {
      question: "How do you safely troubleshoot a suspected firewall issue?",
      answer:
        "Define the exact flow, preserve evidence, inspect effective rules and logs, use provider diagnostics and packet captures, make a minimal approved change, and validate both availability and security.",
    },
  ],

  completionChecklist: [
    "Incident impact and severity are documented.",
    "Source, destination, direction, protocol, port, and timestamp are confirmed.",
    "Recent changes and audit history are reviewed.",
    "The service listener and DNS resolution are checked.",
    "Routing, NAT, and return-path behavior are checked.",
    "All relevant firewall enforcement layers are inspected.",
    "Rule matching and precedence are confirmed.",
    "Evidence supports the root cause.",
    "The correction is approved, narrow, and reversible.",
    "Real application connectivity is restored.",
    "Security boundaries are revalidated.",
    "Monitoring and preventive actions are assigned.",
    "The incident report is complete.",
  ],

  officialReferences: [
    {
      title: "AWS Security Group Rules",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html",
    },
    {
      title: "AWS Network ACLs",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html",
    },
    {
      title: "AWS VPC Reachability Analyzer",
      url: "https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html",
    },
    {
      title: "Azure: Troubleshoot NSG blocking traffic",
      url: "https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-network/virtual-network-troubleshoot-nsg-blocking-traffic",
    },
    {
      title: "Azure: Network Watcher IP Flow Verify",
      url: "https://learn.microsoft.com/en-us/azure/network-watcher/diagnose-vm-network-traffic-filtering-problem",
    },
    {
      title: "Google Cloud VPC Firewall Rules",
      url: "https://docs.cloud.google.com/firewall/docs/firewalls",
    },
    {
      title: "Google Cloud Connectivity Tests",
      url: "https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/how-to/running-connectivity-tests",
    },
    {
      title: "Google Cloud Firewall Rules Logging",
      url: "https://docs.cloud.google.com/firewall/docs/vpc-firewall-rules-logging-overview",
    },
    {
      title: "Kubernetes NetworkPolicy",
      url: "https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    },
    {
      title: "tcpdump Manual",
      url: "https://man7.org/linux/man-pages/man8/tcpdump.8.html",
    },
    {
      title: "Linux nftables / iptables interoperability",
      url: "https://man7.org/linux/man-pages/man8/xtables-nft.8.html",
    },
  ],
} as const;

export default firewallRuleFailureGuide;
