export interface RoutingLoopGuide {
  title: string;
  slug: string;
  category: string;
  severity: string;
  estimatedTime: string;
  overview: string;
  symptoms: string[];
  incidentScenario: string;
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    interpretOutput: string[];
    nextActions: string[];
  }[];
  rootCauseMatrix: {
    symptom: string;
    likelyCause: string;
    verification: string;
    resolution: string;
  }[];
  advancedScenarios: {
    scenario: string;
    evidence: string[];
    fix: string[];
    validation: string[];
  }[];
  recoveryWorkflow: string[];
  rollbackPlan: string[];
  prevention: string[];
  alerting: string[];
  cicdValidation: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    successCriteria: string[];
  }[];
  incidentRunbook: string[];
  incidentReportTemplate: string[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  officialReferences: {
    title: string;
    url: string;
  }[];
}

export const routingLoopGuide: RoutingLoopGuide = {
  title: "Routing Loop Troubleshooting",
  slug: "routing-loop",
  category: "Networking",
  severity: "Critical / High",
  estimatedTime: "30–120 minutes",

  overview: `
A routing loop occurs when packets repeatedly travel between routers or
gateways instead of progressing toward their destination.

Example:
Client -> Router A -> Router B -> Router A -> Router B

Routers decrease the IPv4 TTL or IPv6 Hop Limit as packets are forwarded.
When the value expires, the packet is discarded. A router may return an ICMP
Time Exceeded message.

Common causes include incorrect static routes, routing-policy errors,
BGP/OSPF redistribution mistakes, cloud transit route conflicts, overlapping
CIDRs, incorrect Kubernetes CNI routing, and network automation errors.

Distinguish the following before making changes:

- Routing loop: traffic repeatedly traverses a circular forwarding path.
- Black hole: traffic is discarded or sent toward an unusable next hop.
- Route convergence: routers temporarily have inconsistent routes following
  a topology or configuration change.
- Asymmetric routing: forward and return paths differ; stateful firewalls may
  reject the return traffic.
- MTU failure: larger packets fail while smaller packets may succeed.
- Application failure: routing can be healthy while the application is down.

A repeating traceroute pattern is evidence, not definitive proof. ECMP,
load balancing, ICMP filtering, rate limiting, and tunnels can influence
traceroute output. Confirm the suspected loop with routing tables, forwarding
decisions, packet captures, and tests from multiple sources.
`,

  symptoms: [
    "Production applications suddenly experience network timeouts.",
    "Traceroute repeatedly shows the same gateway addresses.",
    "ICMP Time Exceeded responses increase.",
    "One subnet cannot reach a destination while another subnet can.",
    "TCP SYN packets are retransmitted without a successful handshake.",
    "A network change is followed by widespread packet loss.",
    "BGP routes flap or the selected path changes unexpectedly.",
    "OSPF neighbors repeatedly lose and re-establish adjacency.",
    "VPN users cannot access private application subnets.",
    "Kubernetes Pods on different nodes cannot communicate.",
    "AWS VPC-to-VPC connectivity fails after a route update.",
    "Network monitoring reports increased latency and failed health checks.",
    "Only return traffic fails because the reverse path is incorrect.",
    "A specific destination fails while other destinations remain reachable.",
    "The problem returns after every infrastructure deployment."
  ],

  incidentScenario: `
Production incident: Users cannot access an internal application after a
network route change.

14:02 - A static route is changed.
14:04 - Application health checks begin failing.
14:06 - Users from one office subnet report timeouts.
14:08 - Another subnet can still reach the application.
14:10 - Traceroute shows repeating gateway addresses.
14:12 - The incident commander declares a high-severity incident.

Initial hypothesis:
Gateway A forwards the destination prefix to Gateway B, but Gateway B routes
the same prefix back toward Gateway A.

The team must verify the forwarding decisions on both gateways before fixing
the route. Restarting application servers will not correct a routing loop.

Treat this as a diagnostic workflow, not a predetermined root cause. If
evidence instead points to filtering, MTU, DNS, or an application failure,
follow that evidence rather than forcing the routing-loop hypothesis.
`,

  impactAssessment: [
    "Identify affected applications, source IPs, destination IPs, ports, and protocols.",
    "Determine whether production, staging, development, or all environments are affected.",
    "Identify affected subnets, VPCs, VPNs, offices, availability zones, and Kubernetes nodes.",
    "Compare affected clients with known-good clients.",
    "Determine whether existing sessions fail or only new connections fail.",
    "Estimate affected users, business operations, and SLO violations.",
    "Check whether a route, firewall, VPN, CNI, or infrastructure deployment preceded the incident.",
    "Determine whether the issue affects one destination prefix or a shared gateway.",
    "Check whether a failover path exists and whether it is healthy.",
    "Assign an incident commander and network, cloud, and application investigators.",
    "Record the incident start time, current symptoms, and mitigation actions.",
    "Communicate business impact and updates using the incident process."
  ],

  safetyChecks: [
    "Confirm the correct host, account, region, VPC, cluster, and network device.",
    "Verify source and destination IP addresses instead of relying only on DNS names.",
    "Confirm the affected port and protocol.",
    "Use read-only commands during initial diagnosis.",
    "Capture the current routing configuration before modifying it.",
    "Verify production change approval and incident authorization.",
    "Do not flush the routing table or delete default routes as a test.",
    "Do not restart every gateway or network service without understanding the blast radius.",
    "Do not disable firewalls broadly to make connectivity work.",
    "Prepare a rollback command and expected route state before applying a fix.",
    "Check whether the current management session uses the route being modified.",
    "Preserve timestamps, logs, configuration versions, and packet captures.",
    "Use approved maintenance windows or emergency-change procedures.",
    "Protect packet captures and redact credentials or sensitive data.",
    "Validate both forward and return paths before declaring recovery."
  ],

  evidenceCollection: [
    "Incident ID, severity, start time, reporter, and business impact.",
    "Source IP, destination IP, source subnet, destination subnet, port, and protocol.",
    "Traceroute or tracepath output from affected and unaffected sources.",
    "Linux route tables, policy-routing rules, and neighbor entries.",
    "Router forwarding tables and selected next hops.",
    "BGP neighbor state, received routes, selected paths, and advertisements.",
    "OSPF adjacency state, route information, and relevant logs.",
    "Cloud VPC route tables, transit gateway routes, VPN routes, and flow logs.",
    "Kubernetes node addresses, Pod CIDRs, routes, and CNI status.",
    "Firewall logs, NAT translations, security policies, and interface counters.",
    "Short, filtered packet captures from relevant interfaces where authorized.",
    "Monitoring alerts, deployment timestamps, Git commits, and audit logs.",
    "Last known good route configuration and last successful connectivity test.",
    "Change approvals and the identity of the system that applied the change.",
    "A timeline of tests, observations, changes, and recovery results."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm scope and reproduce the issue",
      objective: "Establish a reliable baseline and isolate the affected traffic.",
      commands: [
        "date -Is",
        "hostname -f",
        "ip -br address",
        "ip route get <destination-ip>",
        "ping -c 4 -W 2 <destination-ip>",
        "nc -vz -w 3 <destination-ip> <port>",
        "curl -v --connect-timeout 5 http://<destination-ip>:<port>/health"
      ],
      interpretOutput: [
        "date and hostname record the test time and source machine.",
        "ip -br address identifies local interfaces and addresses.",
        "ip route get shows the locally selected route, next hop, interface, and usually source address.",
        "Ping failure does not prove a routing failure because ICMP may be filtered.",
        "A successful TCP connection with a failed HTTP request points toward an application or protocol issue.",
        "If only one source subnet fails, investigate source-specific routing, NAT, ACLs, and return paths."
      ],
      nextActions: [
        "Record the exact source, destination, protocol, and port.",
        "Repeat the test from an unaffected source.",
        "Compare routes and source addresses between the two sources.",
        "Continue with path tracing and route inspection before changing configuration."
      ]
    },
    {
      step: 2,
      title: "Inspect Linux routes and policy routing",
      objective: "Identify the route and routing table used for the failing destination.",
      commands: [
        "ip route show",
        "ip -6 route show",
        "ip rule show",
        "ip route show table all",
        "ip route get <destination-ip>",
        "ip route get <destination-ip> from <source-ip>",
        "ip neigh show"
      ],
      interpretOutput: [
        "A route such as 10.20.0.0/16 via 10.1.0.1 dev eth0 sends matching traffic to that next hop.",
        "The most specific matching prefix normally wins within the selected routing table.",
        "Policy-routing rules may select a different table based on source, mark, or other selectors.",
        "An unexpected default route may send traffic toward the wrong gateway.",
        "INCOMPLETE neighbor entries can indicate Layer 2 neighbor resolution problems; they do not prove a routing loop.",
        "A different source address may lead to a different return path."
      ],
      nextActions: [
        "Identify the effective route and routing table.",
        "Compare the result with the approved network design.",
        "Check policy rules, packet marks, and source-based routes.",
        "Save the output before any modification."
      ]
    },
    {
      step: 3,
      title: "Trace the path and distinguish a loop from a black hole",
      objective: "Identify repeated hops, missing responses, and path-specific failures.",
      commands: [
        "traceroute -n -m 20 -w 2 <destination-ip>",
        "traceroute -n -I -m 20 -w 2 <destination-ip>",
        "traceroute -n -T -p <port> -m 20 -w 2 <destination-ip>",
        "tracepath <destination-ip>",
        "mtr -n -r -c 20 <destination-ip>"
      ],
      interpretOutput: [
        "Repeated gateway addresses at successive hops may indicate a forwarding loop.",
        "Asterisks mean probes did not receive responses; filtering or rate limiting may be responsible.",
        "A trace that stops at one hop without repeated addresses may indicate a silent drop or filtering.",
        "TCP traceroute can help when UDP or ICMP probes are filtered.",
        "Different addresses at the same hop can occur with ECMP or load balancing.",
        "Compare results from multiple sources before concluding that a loop exists."
      ],
      nextActions: [
        "Record the last known good hop and repeated gateway sequence.",
        "Run the same trace from another source subnet.",
        "Request route lookups from the suspected gateways.",
        "If no loop is demonstrated, investigate filtering, return routing, MTU, and application behavior."
      ]
    },
    {
      step: 4,
      title: "Inspect each suspected router's forwarding decision",
      objective: "Locate the point where traffic is sent back toward a previous hop.",
      commands: [
        "ip route get <destination-ip>",
        "ip route show",
        "ip neigh show",
        "sudo tcpdump -ni <interface> 'host <destination-ip>'",
        "sudo tcpdump -ni <interface> 'icmp or icmp6'"
      ],
      interpretOutput: [
        "A source-host route only shows the local forwarding decision.",
        "Intermediate routers may use different VRFs, policy tables, or ECMP paths.",
        "ICMP Time Exceeded responses may identify routers where probe TTL expires.",
        "Traffic leaving one gateway and returning through another interface can support a loop hypothesis.",
        "No packets in a capture may mean another interface, namespace, or forwarding path was used."
      ],
      nextActions: [
        "Record ingress interface, destination prefix, selected next hop, and egress interface.",
        "Compare the decisions on both suspected gateways.",
        "Check both forward and return paths.",
        "Escalate to the network device owner if access is restricted."
      ]
    },
    {
      step: 5,
      title: "Validate static routes and subnet masks",
      objective: "Find incorrect next hops, prefixes, or default routes.",
      commands: [
        "ip route show",
        "ip -6 route show",
        "ip route get <destination-ip>",
        "ip route show table all"
      ],
      interpretOutput: [
        "Gateway A may forward a prefix to Gateway B while Gateway B forwards the same prefix back to Gateway A.",
        "An incorrect subnet mask can make a remote network appear directly connected.",
        "An unexpected more-specific prefix may override the intended route.",
        "A missing specific route may send traffic through an unsuitable default route.",
        "A Linux host's routes do not reveal the complete configuration of external routers."
      ],
      nextActions: [
        "Compare the prefix and next hop against the IP address plan.",
        "Inspect both sides of a suspected reciprocal route.",
        "Determine whether a static route conflicts with a dynamic route.",
        "Correct only the verified faulty route through an approved change."
      ]
    },
    {
      step: 6,
      title: "Investigate BGP route selection and redistribution",
      objective: "Find incorrect advertisements, next hops, or routing-policy decisions.",
      commands: [
        "vtysh -c 'show ip bgp summary'",
        "vtysh -c 'show ip bgp <destination-prefix>'",
        "vtysh -c 'show ip route <destination-ip>'",
        "vtysh -c 'show running-config'"
      ],
      interpretOutput: [
        "These are FRRouting examples; vendor syntax differs.",
        "An Established BGP session does not guarantee that the selected route is correct.",
        "Inspect received, accepted, best, and advertised routes.",
        "Review next hop, AS path, local preference, communities, and route policies.",
        "Route flapping is evidence of instability but is not proof of a forwarding loop."
      ],
      nextActions: [
        "Compare the selected route with the intended topology.",
        "Inspect redistribution between BGP and other routing protocols.",
        "Review recent prefix filters, route maps, and communities.",
        "Apply a reviewed policy correction and confirm convergence."
      ]
    },
    {
      step: 7,
      title: "Investigate OSPF convergence",
      objective: "Identify adjacency instability or incorrect route selection.",
      commands: [
        "vtysh -c 'show ip ospf neighbor'",
        "vtysh -c 'show ip ospf route'",
        "vtysh -c 'show ip route ospf'",
        "vtysh -c 'show ip route <destination-ip>'"
      ],
      interpretOutput: [
        "These are FRRouting examples; use equivalent commands on other platforms.",
        "Repeated neighbor state changes can indicate link, timer, MTU, or configuration issues.",
        "A Full adjacency does not prove that every destination has the correct route.",
        "Check route redistribution, area boundaries, summarization, and metrics.",
        "Topology instability can temporarily produce inconsistent forwarding."
      ],
      nextActions: [
        "Capture adjacency state and routing logs.",
        "Compare route selection on the affected routers.",
        "Inspect recent interface, metric, area, and redistribution changes.",
        "Avoid clearing all adjacencies as an initial troubleshooting action."
      ]
    },
    {
      step: 8,
      title: "Inspect AWS routes and transit connectivity",
      objective: "Identify incorrect VPC, peering, transit gateway, or VPN routes.",
      commands: [
        "aws sts get-caller-identity",
        "aws ec2 describe-route-tables --region <region>",
        "aws ec2 describe-transit-gateway-route-tables --region <region>",
        "aws ec2 describe-vpn-connections --region <region>",
        "aws ec2 describe-vpc-peering-connections --region <region>"
      ],
      interpretOutput: [
        "Confirm the AWS account and region before examining resources.",
        "Inspect destination CIDR, route target, route state, and subnet association.",
        "Check whether the target is a transit gateway, peering connection, VPN gateway, or network interface.",
        "An active route does not guarantee correct end-to-end connectivity.",
        "VPC peering is not automatically transitive.",
        "Correlate route tables with security groups, network ACLs, flow logs, and return routes."
      ],
      nextActions: [
        "Identify route tables associated with the source and destination subnets.",
        "Inspect transit gateway associations and route propagation.",
        "Check VPN advertisements and on-premises return routes.",
        "Review flow logs and recent infrastructure changes.",
        "Change only the route or association proven to be incorrect."
      ]
    },
    {
      step: 9,
      title: "Troubleshoot Kubernetes Pod and node routing",
      objective: "Separate CNI, Pod routing, node routing, and external network problems.",
      commands: [
        "kubectl get nodes -o wide",
        "kubectl get pods -A -o wide",
        "kubectl get events -A --sort-by=.lastTimestamp",
        "kubectl get daemonsets -A",
        "kubectl get networkpolicies -A",
        "kubectl describe node <node-name>",
        "ip route show",
        "ip route get <pod-ip>"
      ],
      interpretOutput: [
        "Compare Pod CIDRs and node IPs between affected and healthy nodes.",
        "Same-node connectivity working while cross-node connectivity fails points toward the node network or CNI path.",
        "NetworkPolicy can block traffic but should not automatically be assumed to cause a router-level loop.",
        "A CNI rollout immediately before the incident is a lead, not proof.",
        "Collect route output from the actual affected node."
      ],
      nextActions: [
        "Compare same-node Pod traffic with cross-node Pod traffic.",
        "Inspect CNI logs, IPAM allocations, overlay tunnels, and route programming.",
        "Check overlapping Pod, node, and corporate CIDRs.",
        "Review recent CNI and cluster-network configuration changes.",
        "Use the CNI-supported recovery or rollback procedure."
      ]
    },
    {
      step: 10,
      title: "Inspect firewall, NAT, and asymmetric routing",
      objective: "Distinguish a routing loop from stateful firewall drops and incorrect return paths.",
      commands: [
        "sudo nft list ruleset",
        "sudo iptables -S",
        "sudo iptables -t nat -S",
        "sudo conntrack -L",
        "sudo tcpdump -ni <interface> 'host <destination-ip> and (tcp or icmp)'"
      ],
      interpretOutput: [
        "Use commands appropriate to the host's firewall implementation.",
        "iptables output may not fully represent systems using a different firewall backend.",
        "A TCP SYN reaching the destination without a SYN-ACK may indicate a listener, route, firewall, or return-path issue.",
        "NAT can change the source address and affect the return path.",
        "Do not flush conntrack or disable all firewall rules as a diagnostic shortcut."
      ],
      nextActions: [
        "Capture the flow on both sides of the suspected firewall where authorized.",
        "Inspect session state, NAT translations, rule counters, and deny logs.",
        "Compare forward and return routes.",
        "Apply a narrow, approved correction after identifying the actual failure."
      ]
    },
    {
      step: 11,
      title: "Verify packet behavior with tcpdump",
      objective: "Correlate packet direction, TTL, timestamps, and gateway responses.",
      commands: [
        "sudo tcpdump -ni <interface> -vv 'host <destination-ip>'",
        "sudo tcpdump -ni <interface> -vv 'icmp or icmp6'",
        "sudo tcpdump -ni <interface> -w /tmp/routing-loop.pcap 'host <destination-ip>'",
        "tcpdump -nn -r /tmp/routing-loop.pcap"
      ],
      interpretOutput: [
        "IPv4 TTL and IPv6 Hop Limit values help identify packet expiration.",
        "Traceroute intentionally sends probes with low TTL values; distinguish these from ordinary application traffic.",
        "Repeated packets on one interface do not independently prove a loop.",
        "ICMP Time Exceeded responses may reveal where probes expire.",
        "Captures can miss traffic because of offloading, hardware forwarding, namespaces, or capture placement."
      ],
      nextActions: [
        "Use a short capture with a narrow host or flow filter.",
        "Compare ingress and egress captures on the suspected gateways.",
        "Synchronize timestamps across systems where possible.",
        "Protect captures because they may contain sensitive data."
      ]
    },
    {
      step: 12,
      title: "Check MTU and tunnel overhead",
      objective: "Rule out packet-size problems that resemble connectivity failures.",
      commands: [
        "ip link show",
        "tracepath -n <destination-ip>",
        "ping -M do -s 1200 -c 3 <destination-ip>",
        "ping -M do -s 1400 -c 3 <destination-ip>"
      ],
      interpretOutput: [
        "The ping options shown are Linux IPv4 examples.",
        "Small packets succeeding while larger packets fail can indicate an MTU or Path MTU Discovery issue.",
        "Blocked ICMP can hide fragmentation-needed or Packet Too Big messages.",
        "An MTU problem is not proof of a routing loop."
      ],
      nextActions: [
        "Compare interface MTUs and tunnel overhead.",
        "Inspect ICMP fragmentation-needed and Packet Too Big messages.",
        "Test representative packet sizes and application protocols.",
        "Adjust MTU or MSS only when measurements support the change."
      ]
    },
    {
      step: 13,
      title: "Correlate routes with Git and infrastructure changes",
      objective: "Identify the change that introduced the incorrect forwarding decision.",
      commands: [
        "git log --oneline -15",
        "git diff --stat <last-known-good-commit>..<current-commit>",
        "git diff <last-known-good-commit>..<current-commit>",
        "terraform plan",
        "terraform state list"
      ],
      interpretOutput: [
        "Git history shows repository changes, not proof that a change reached production.",
        "Terraform plan shows proposed changes against the refreshed state; inspect the plan before applying.",
        "terraform state list inventories managed resources but does not validate route correctness.",
        "Correlate commits with pipeline logs, approvals, audit logs, and actual device configuration.",
        "Temporal proximity alone does not prove causation."
      ],
      nextActions: [
        "Find the last known good configuration.",
        "Compare intended and deployed routes.",
        "Identify the smallest reversible correction.",
        "Obtain required approval before changing production."
      ]
    },
    {
      step: 14,
      title: "Validate recovery",
      objective: "Prove the intended route works and application traffic succeeds in both directions.",
      commands: [
        "ip route get <destination-ip>",
        "traceroute -n <destination-ip>",
        "mtr -n -r -c 20 <destination-ip>",
        "nc -vz -w 3 <destination-ip> <port>",
        "curl -fsS --connect-timeout 5 http://<destination-ip>:<port>/health"
      ],
      interpretOutput: [
        "The selected next hop should match the approved design.",
        "The confirmed circular forwarding pattern should no longer occur.",
        "Traceroute asterisks alone do not prove recovery failure because routers may suppress responses.",
        "A successful transport test and healthy application response provide stronger evidence than ping alone.",
        "Test from affected and unaffected source networks."
      ],
      nextActions: [
        "Repeat the original failing test matrix.",
        "Check application latency, packet loss, and route stability.",
        "Monitor for recurrence during the agreed observation period.",
        "Record the fix, verification results, and remaining risks."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Traceroute repeatedly shows the same gateway addresses.",
      likelyCause: "Reciprocal static routes or inconsistent dynamic routing.",
      verification: "Inspect forwarding decisions and selected next hops on the suspected routers.",
      resolution: "Correct the route or policy that sends traffic back toward the previous hop."
    },
    {
      symptom: "Traceroute stops at one hop without repeated addresses.",
      likelyCause: "Filtering, rate limiting, missing route, or silent packet drop.",
      verification: "Use transport tests, route lookups, device logs, and packet captures.",
      resolution: "Fix the verified drop or missing route; do not assume a loop."
    },
    {
      symptom: "Only one source subnet fails.",
      likelyCause: "Policy routing, source-specific routes, NAT, ACLs, or an asymmetric return path.",
      verification: "Compare source-specific route lookups, firewall logs, and return routes.",
      resolution: "Correct the verified route or policy without weakening network segmentation."
    },
    {
      symptom: "Failure begins after a static route update.",
      likelyCause: "Incorrect next hop, prefix length, or default route.",
      verification: "Compare deployed routes with the last known good configuration.",
      resolution: "Restore or correct the specific route through an approved change."
    },
    {
      symptom: "BGP routes flap or select an unexpected path.",
      likelyCause: "Incorrect route policy, redistribution, next hop, or unstable peer.",
      verification: "Inspect received, selected, and advertised routes and neighbor logs.",
      resolution: "Correct the policy or underlying peer issue and verify convergence."
    },
    {
      symptom: "OSPF adjacency repeatedly changes state.",
      likelyCause: "Link instability, MTU mismatch, timers, or topology changes.",
      verification: "Inspect neighbor state, interface counters, and routing logs.",
      resolution: "Correct the underlying link or configuration problem."
    },
    {
      symptom: "Same-node Pods work but cross-node Pods fail.",
      likelyCause: "CNI, overlay tunnel, IPAM, node route, or firewall issue.",
      verification: "Compare Pod CIDRs, node routes, CNI logs, and cross-node traffic.",
      resolution: "Use the documented CNI recovery or rollback procedure."
    },
    {
      symptom: "AWS workloads lose reachability after a route change.",
      likelyCause: "Incorrect VPC, transit gateway, peering, VPN, or return route.",
      verification: "Inspect route tables, associations, targets, flow logs, and reverse paths.",
      resolution: "Correct the specific route or attachment configuration."
    },
    {
      symptom: "Small packets work but larger packets fail.",
      likelyCause: "MTU, fragmentation, tunnel overhead, or blocked Path MTU Discovery.",
      verification: "Compare MTUs and test packet sizes with packet captures.",
      resolution: "Correct the verified MTU or MSS configuration."
    },
    {
      symptom: "Traffic reaches the destination but replies do not return.",
      likelyCause: "Asymmetric routing, firewall state, NAT, or an incorrect reverse route.",
      verification: "Capture both directions and inspect return routing.",
      resolution: "Restore the intended return path or correct the approved firewall/NAT design."
    },
    {
      symptom: "The issue returns after each infrastructure deployment.",
      likelyCause: "Configuration drift or incorrect infrastructure-as-code definitions.",
      verification: "Compare source-controlled configuration with actual deployed routes.",
      resolution: "Fix the source of truth and validate the deployment pipeline."
    },
    {
      symptom: "Traceroute succeeds but the application still times out.",
      likelyCause: "Port filtering, application listener, TLS, DNS, proxy, or load balancer.",
      verification: "Test the actual protocol and port; inspect application and load-balancer logs.",
      resolution: "Fix the proven transport or application issue."
    }
  ],

  advancedScenarios: [
    {
      scenario: "Static route loop between two gateways",
      evidence: [
        "Traceroute repeats Gateway A and Gateway B.",
        "Gateway A forwards the destination prefix to Gateway B.",
        "Gateway B forwards that same prefix back to Gateway A.",
        "The failure started after a route change."
      ],
      fix: [
        "Capture the route configuration on both gateways.",
        "Verify the intended destination prefix and next hop.",
        "Identify the incorrect reciprocal route.",
        "Correct the narrowest faulty route through an approved change.",
        "Do not delete default routes or restart both gateways."
      ],
      validation: [
        "Confirm the selected next hop on both gateways.",
        "Repeat traceroute from affected and unaffected subnets.",
        "Test the actual application port.",
        "Monitor packet loss and route stability."
      ]
    },
    {
      scenario: "BGP and static route redistribution creates an unexpected path",
      evidence: [
        "A prefix is learned through one routing protocol and re-advertised through another.",
        "The selected next hop points toward the router that supplied the route.",
        "Route advertisements change after a policy update.",
        "The BGP session can remain Established while the data path is incorrect."
      ],
      fix: [
        "Inspect route redistribution policies and prefix filters.",
        "Review route tags, communities, AS path, and next-hop attributes.",
        "Identify why the prefix is reintroduced into the wrong routing domain.",
        "Apply a reviewed redistribution-policy correction.",
        "Use the supported vendor procedure for route refresh or convergence."
      ],
      validation: [
        "Compare received, selected, and advertised routes.",
        "Confirm the path matches the intended topology.",
        "Verify the prefix is not incorrectly reintroduced.",
        "Monitor routing updates and application reachability."
      ]
    },
    {
      scenario: "AWS transit gateway route sends traffic toward the wrong attachment",
      evidence: [
        "Traffic from VPC A is sent to a transit gateway.",
        "The transit route table directs the destination to an unexpected attachment.",
        "A receiving appliance or VPC forwards the destination back toward the transit gateway.",
        "Flow logs show traffic but the application connection fails."
      ],
      fix: [
        "Confirm the AWS account, region, VPC, and transit gateway.",
        "Inspect route-table associations, propagation, destination CIDRs, and targets.",
        "Check for overlapping CIDRs and incorrect appliance routes.",
        "Correct the route or association responsible for the bad path.",
        "Preserve the last known good configuration."
      ],
      validation: [
        "Verify effective routes for source and destination subnets.",
        "Inspect flow logs for accepted and rejected traffic.",
        "Test the application from each affected VPC.",
        "Confirm return routing and monitor the transit path."
      ]
    },
    {
      scenario: "Kubernetes cross-node traffic fails after a CNI upgrade",
      evidence: [
        "Same-node Pod communication works but cross-node traffic fails.",
        "The issue starts after a CNI or cluster-network change.",
        "Node routes or overlay tunnel state differ between healthy and affected nodes.",
        "Pod CIDRs, node addresses, or tunnel settings may be incorrect."
      ],
      fix: [
        "Capture node routes, Pod addresses, CNI logs, and daemon-set status.",
        "Compare affected nodes with healthy nodes.",
        "Check CNI version compatibility and documented upgrade requirements.",
        "Correct the configuration or roll back using the supported procedure.",
        "Do not manually delete CNI-managed routes unless the vendor documents that recovery method."
      ],
      validation: [
        "Test same-node and cross-node Pod communication.",
        "Test Service IP and external destination connectivity.",
        "Check CNI health and node readiness.",
        "Monitor packet drops and Pod restarts."
      ]
    },
    {
      scenario: "Asymmetric routing causes firewall session drops",
      evidence: [
        "The forward path reaches the destination.",
        "The return path uses a different firewall or gateway.",
        "Firewall logs show missing session state or rejected packets.",
        "The issue affects only some source networks."
      ],
      fix: [
        "Capture the flow on both sides of the firewall.",
        "Inspect forward and reverse route selection.",
        "Review NAT and stateful inspection requirements.",
        "Restore the intended symmetric path or implement a supported stateful design.",
        "Avoid disabling stateful inspection globally."
      ],
      validation: [
        "Verify the return path.",
        "Establish new TCP sessions.",
        "Review firewall counters and logs.",
        "Test affected source subnets and application health."
      ]
    },
    {
      scenario: "IPv4 works but IPv6 fails",
      evidence: [
        "IPv4 traceroute and TCP connectivity succeed.",
        "IPv6 traceroute fails or reaches unexpected routers.",
        "IPv6 routes or neighbor discovery differ from IPv4.",
        "The application resolves both A and AAAA records."
      ],
      fix: [
        "Inspect IPv6 routes, default gateway, neighbor discovery, and ICMPv6 handling.",
        "Check IPv6 route advertisements and prefix configuration.",
        "Verify IPv6 firewall and return-path rules.",
        "Correct the IPv6-specific configuration instead of changing working IPv4 routes."
      ],
      validation: [
        "Run IPv4 and IPv6 tests separately.",
        "Check application behavior with each address family.",
        "Confirm correct IPv6 next hops and return routes.",
        "Monitor IPv6-specific alerts."
      ]
    },
    {
      scenario: "A black hole is mistaken for a routing loop",
      evidence: [
        "Traceroute stops responding at a particular hop.",
        "No repeated gateway sequence is demonstrated.",
        "The next hop may be unreachable or traffic may be filtered.",
        "Packet captures show packets disappearing without a return response."
      ],
      fix: [
        "Check route selection and neighbor resolution.",
        "Inspect firewall logs and interface counters.",
        "Verify the next hop and destination route.",
        "Correct the confirmed drop or missing route."
      ],
      validation: [
        "Confirm packets reach the next expected hop.",
        "Test transport connectivity.",
        "Repeat the trace from another source.",
        "Check whether the route is stable."
      ]
    },
    {
      scenario: "Overlapping CIDRs across VPN-connected networks",
      evidence: [
        "Two connected networks use the same or overlapping private address ranges.",
        "Traffic for a remote destination is treated as local or follows the wrong route.",
        "Only some remote destinations are affected.",
        "VPN route advertisements and local routes disagree."
      ],
      fix: [
        "Compare the local, remote, and Pod CIDR inventories.",
        "Inspect the most-specific matching route.",
        "Coordinate a documented renumbering, translation, or supported routing design.",
        "Avoid adding arbitrary more-specific routes without understanding the overlap."
      ],
      validation: [
        "Test each overlapping destination from both sides.",
        "Verify forward and return routes.",
        "Check DNS and NAT behavior where applicable.",
        "Document the address-space ownership."
      ]
    },
    {
      scenario: "Routing configuration drifts after Terraform deployment",
      evidence: [
        "The repository defines a different route from the deployed route table.",
        "A pipeline applies a change shortly before the incident.",
        "The issue recurs after redeployment.",
        "Manual changes are overwritten by automation."
      ],
      fix: [
        "Compare the committed configuration, Terraform plan, and actual route table.",
        "Identify whether the error is in the module, variable, environment file, or dependency.",
        "Correct the source-controlled configuration.",
        "Review the plan and obtain the required approval.",
        "Apply through the normal deployment process."
      ],
      validation: [
        "Review the final Terraform plan.",
        "Verify the deployed route table.",
        "Run the connectivity test suite.",
        "Confirm subsequent plans do not recreate the faulty route."
      ]
    },
    {
      scenario: "ECMP or load balancing resembles a routing loop",
      evidence: [
        "Traceroute shows different gateway addresses at the same hop.",
        "Different probes appear to take different paths.",
        "The path varies with source, protocol, or flow.",
        "Forwarding tables contain multiple equal-cost next hops."
      ],
      fix: [
        "Compare repeated traces using consistent source and protocol.",
        "Inspect the actual ECMP next-hop set.",
        "Check whether one next hop is invalid or misconfigured.",
        "Correct only the faulty member or routing policy when evidence supports it."
      ],
      validation: [
        "Test multiple flows and source networks.",
        "Confirm all selected next hops lead to a valid destination.",
        "Monitor path consistency and loss.",
        "Do not remove ECMP merely because traceroute output varies."
      ]
    }
  ],

  recoveryWorkflow: [
    "1. Confirm the incident scope and assign an incident commander.",
    "2. Preserve the last known good route configuration and current evidence.",
    "3. Identify the precise source, destination, prefix, protocol, and affected path.",
    "4. Prove whether the failure is a loop, black hole, asymmetric path, MTU issue, or another fault.",
    "5. Locate the exact faulty route, routing policy, or infrastructure change.",
    "6. Select the smallest safe correction that restores the intended path.",
    "7. Review the expected impact and rollback procedure.",
    "8. Obtain required approval or follow the documented emergency-change process.",
    "9. Apply the change on the intended device or through the source-of-truth automation.",
    "10. Recheck route selection and forwarding decisions.",
    "11. Test both directions and the actual application protocol.",
    "12. Repeat the original failing test from affected and unaffected sources.",
    "13. Monitor latency, loss, route stability, and application health.",
    "14. Keep heightened monitoring active for the agreed observation period.",
    "15. Record the change, validation evidence, and remaining risks."
  ],

  rollbackPlan: [
    "Identify the exact change that introduced the failure.",
    "Retrieve the last known good route configuration from an approved source.",
    "Confirm that restoring it will not remove newer, valid network dependencies.",
    "Prepare the rollback commands or reviewed infrastructure-as-code change.",
    "Obtain required approval and verify the target device or account.",
    "Apply the smallest necessary rollback.",
    "Verify route selection and forwarding behavior immediately afterward.",
    "Test connectivity from the original failing sources.",
    "Confirm application health and return-path behavior.",
    "If rollback fails, stop additional unplanned changes and escalate to the network owner.",
    "Document the rollback and preserve the failed configuration for root-cause analysis."
  ],

  prevention: [
    "Maintain a documented IP address plan for subnets, VPCs, Pod CIDRs, and VPN networks.",
    "Review static routes for reciprocal next hops and incorrect prefix lengths.",
    "Use explicit route ownership and change approval.",
    "Validate BGP filters, route maps, communities, and redistribution policies.",
    "Monitor OSPF neighbor stability and route changes.",
    "Avoid overlapping CIDRs across connected networks.",
    "Use infrastructure as code as the source of truth for cloud routing.",
    "Review Terraform plans before production changes.",
    "Run route and connectivity validation after network deployments.",
    "Use staged rollout and canary validation for high-risk changes.",
    "Maintain a last known good configuration and tested rollback procedure.",
    "Monitor route flaps, packet loss, ICMP Time Exceeded responses, and application reachability.",
    "Test cross-node Kubernetes networking after CNI upgrades.",
    "Validate IPv4 and IPv6 paths independently.",
    "Review network diagrams and dependencies after architecture changes.",
    "Conduct incident postmortems and convert findings into automated tests."
  ],

  alerting: [
    "Alert on sustained packet loss to critical destinations.",
    "Alert when application health checks fail across multiple sources.",
    "Monitor latency and connection failures against service-level objectives.",
    "Track BGP neighbor changes and route flapping.",
    "Track OSPF adjacency instability.",
    "Alert on unexpected route-table modifications.",
    "Monitor cloud flow logs for abnormal rejects and traffic drops.",
    "Monitor Kubernetes CNI health, node networking, and cross-node connectivity.",
    "Detect route changes outside approved deployment windows.",
    "Correlate network alerts with infrastructure deployment events.",
    "Use multiple probes so one filtered ICMP path does not trigger misleading alerts.",
    "Include affected prefix, source, destination, region, and last known good timestamp in alerts."
  ],

  cicdValidation: [
    "Store routing configuration in version control.",
    "Require peer review for production route and network-policy changes.",
    "Run syntax and configuration validation for the relevant network tooling.",
    "Run Terraform fmt, validate, and plan checks when Terraform is used.",
    "Inspect plans for route deletions, broad CIDRs, unexpected targets, and replacement operations.",
    "Validate route definitions against the approved IP address plan.",
    "Detect overlapping CIDRs in connected network inventories.",
    "Test changes in development or staging before production rollout.",
    "Require production approval for high-risk network modifications.",
    "Run post-deployment route and application connectivity checks.",
    "Stop rollout when the expected route or connectivity checks fail.",
    "Keep the previous known good configuration available for rollback.",
    "Store deployment ID, Git commit, approver, change time, and validation results.",
    "Never place cloud credentials or private keys in repository files or pipeline logs."
  ],

  handsOnLabs: [
    {
      title: "Lab 1: Understand TTL and traceroute",
      objective: "Learn how traceroute identifies intermediate hops.",
      steps: [
        "Use a permitted test destination in a non-production environment.",
        "Run traceroute or tracepath.",
        "Compare the hop sequence and response times.",
        "Repeat with ICMP and TCP probes where supported.",
        "Record which hops respond and which do not.",
        "Explain why an asterisk does not automatically mean a routing loop."
      ],
      successCriteria: [
        "Explain the role of TTL and Hop Limit.",
        "Distinguish a missing probe response from a confirmed loop.",
        "Record the source, destination, and protocol used."
      ]
    },
    {
      title: "Lab 2: Inspect routes on a Linux host",
      objective: "Understand route selection and policy routing.",
      steps: [
        "Run ip route show.",
        "Run ip rule show.",
        "Run ip route get <destination-ip>.",
        "Compare the selected next hop with the expected network path.",
        "Repeat with a source address where the system supports it.",
        "Document how the chosen route affects the outgoing interface."
      ],
      successCriteria: [
        "Identify the matching route and next hop.",
        "Explain the difference between a routing table and a policy rule.",
        "Avoid making unnecessary route changes."
      ]
    },
    {
      title: "Lab 3: Diagnose a simulated loop",
      objective: "Practice identifying reciprocal routes without touching production.",
      steps: [
        "Use an isolated virtual network or approved network simulator.",
        "Create a test topology with two routers and a destination prefix.",
        "Observe the intended path before making changes.",
        "Introduce a controlled reciprocal route in the lab.",
        "Capture traceroute and forwarding-table evidence.",
        "Correct the faulty route and repeat the tests."
      ],
      successCriteria: [
        "Identify the reciprocal next-hop configuration.",
        "Explain why packets circulate between the routers.",
        "Restore the intended route and demonstrate recovery."
      ]
    },
    {
      title: "Lab 4: AWS route-table investigation",
      objective: "Learn how to inspect cloud routing safely.",
      steps: [
        "Use a non-production AWS account and a read-only role.",
        "Confirm the account with aws sts get-caller-identity.",
        "Inspect relevant VPC route tables.",
        "Map each destination CIDR to its target.",
        "Compare the route with the approved network diagram.",
        "Document the correction that would be required; do not modify production."
      ],
      successCriteria: [
        "Identify route-table associations and targets.",
        "Explain why active route state does not prove end-to-end connectivity.",
        "Describe how flow logs and return routing contribute evidence."
      ]
    },
    {
      title: "Lab 5: Kubernetes cross-node networking",
      objective: "Separate Pod, node, CNI, and external network failures.",
      steps: [
        "Use a disposable Kubernetes cluster.",
        "Deploy test Pods on different nodes.",
        "Record Pod IPs, node IPs, and Pod CIDRs.",
        "Test same-node and cross-node connectivity.",
        "Inspect node routes and CNI logs.",
        "Document the recovery procedure before performing any disruptive experiment."
      ],
      successCriteria: [
        "Identify whether the failure is node-specific or cross-node.",
        "Collect relevant CNI and route evidence.",
        "Explain how to validate recovery safely."
      ]
    }
  ],

  incidentRunbook: [
    "Declare the incident and record the start time.",
    "Confirm affected environments, source networks, destination networks, and application ports.",
    "Identify a known-good source and destination for comparison.",
    "Capture route tables, traceroute, monitoring data, and recent changes.",
    "Determine whether evidence supports a loop, black hole, filtering, asymmetry, or MTU issue.",
    "Inspect the exact next-hop decisions on suspected gateways.",
    "Identify the smallest verified corrective change.",
    "Obtain approval and prepare rollback.",
    "Apply the change using the approved process.",
    "Validate routes, transport connectivity, application health, and return traffic.",
    "Monitor for recurrence and communicate recovery.",
    "Attach evidence and configuration changes to the incident record.",
    "Create follow-up actions for automated prevention and alerting."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Incident title:",
    "Severity:",
    "Environment and region:",
    "Affected applications:",
    "Incident start time and recovery time:",
    "Business impact:",
    "Affected source and destination networks:",
    "Observed symptoms:",
    "Timeline of events:",
    "Last known good configuration:",
    "Evidence collected:",
    "Root cause confirmed:",
    "Contributing factors:",
    "Corrective action:",
    "Rollback decision:",
    "Validation performed:",
    "Monitoring after recovery:",
    "Customer or stakeholder communication:",
    "Preventive action items:",
    "Action owner and due date:",
    "Lessons learned:"
  ],

  interviewQuestions: [
    {
      question: "What is a routing loop?",
      answer: "A routing loop occurs when packets repeatedly pass between routers instead of progressing toward their destination. TTL or Hop Limit eventually expires and the packet is discarded."
    },
    {
      question: "How do you identify a routing loop in production?",
      answer: "Confirm the affected source and destination, run traceroute from multiple sources, inspect route tables and forwarding decisions on suspected routers, and correlate packet captures or ICMP Time Exceeded responses."
    },
    {
      question: "Does traceroute showing asterisks prove a routing loop?",
      answer: "No. Asterisks indicate that probes did not receive responses. Filtering, rate limiting, missing routes, or packet drops can produce the same result."
    },
    {
      question: "What is the difference between a routing loop and a black hole?",
      answer: "A loop forwards packets repeatedly along a circular path. A black hole discards traffic or directs it toward an unusable next hop without successful delivery."
    },
    {
      question: "How can a static route create a loop?",
      answer: "Two gateways can have reciprocal routes for the same destination prefix, causing each gateway to forward packets back to the other."
    },
    {
      question: "What does ip route get do?",
      answer: "It shows the locally selected route for a destination and can reveal the chosen next hop, interface, and source address."
    },
    {
      question: "How can BGP contribute to a routing loop?",
      answer: "Incorrect route policies, redistribution, or next-hop handling can create an unintended forwarding path. BGP route advertisements and the actual data-plane path must be inspected."
    },
    {
      question: "Can an Established BGP session still have a routing problem?",
      answer: "Yes. Session health does not guarantee correct route selection, next-hop reachability, advertisement policy, or end-to-end forwarding."
    },
    {
      question: "How would you troubleshoot a routing issue after an AWS change?",
      answer: "Confirm account and region, inspect VPC and transit gateway routes, associations and propagation, review flow logs, and verify forward and return paths."
    },
    {
      question: "How do you investigate Kubernetes cross-node traffic failure?",
      answer: "Compare same-node and cross-node communication, inspect Pod and node CIDRs, routes, CNI logs, overlay tunnels, firewall policies, and recent network changes."
    },
    {
      question: "What is asymmetric routing?",
      answer: "Forward and return packets use different paths. It is not automatically a routing loop, but it can cause stateful firewall or NAT session failures."
    },
    {
      question: "How do you distinguish an MTU problem from a routing loop?",
      answer: "Test different packet sizes, inspect MTU and Path MTU Discovery behavior, and capture packets. Small packets working while large packets fail suggests an MTU issue."
    },
    {
      question: "Why should production routes not be changed immediately?",
      answer: "A wrong change can expand the outage or remove management connectivity. Collect evidence, establish the affected path, prepare rollback, and follow approval procedures first."
    },
    {
      question: "What is the purpose of packet capture?",
      answer: "It helps verify packet direction, TTL or Hop Limit, ICMP responses, retransmissions, and where traffic disappears. Capture placement and offloading limitations must be considered."
    },
    {
      question: "How do you prevent routing loops from recurring?",
      answer: "Use reviewed infrastructure as code, route validation, IPAM and CIDR checks, controlled rollouts, monitoring, configuration backups, tested rollback procedures, and incident postmortems."
    },
    {
      question: "What do you do after restoring connectivity?",
      answer: "Repeat the original failure tests, validate forward and return paths, check application health, monitor for recurrence, document the change, and create preventive action items."
    }
  ],

  officialReferences: [
    {
      title: "Linux ip-route manual",
      url: "https://man7.org/linux/man-pages/man8/ip-route.8.html"
    },
    {
      title: "Linux ip-rule manual",
      url: "https://man7.org/linux/man-pages/man8/ip-rule.8.html"
    },
    {
      title: "Linux traceroute manual",
      url: "https://man7.org/linux/man-pages/man8/traceroute.8.html"
    },
    {
      title: "tcpdump manual",
      url: "https://www.tcpdump.org/manpages/tcpdump.1.html"
    },
    {
      title: "AWS VPC route tables",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html"
    },
    {
      title: "AWS Transit Gateway routing",
      url: "https://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html"
    },
    {
      title: "Kubernetes cluster networking",
      url: "https://kubernetes.io/docs/concepts/cluster-administration/networking/"
    },
    {
      title: "Kubernetes NetworkPolicy",
      url: "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
    },
    {
      title: "FRRouting documentation",
      url: "https://docs.frrouting.org/"
    },
    {
      title: "RFC 1812 - Requirements for IP Version 4 Routers",
      url: "https://www.rfc-editor.org/rfc/rfc1812"
    },
    {
      title: "RFC 4271 - Border Gateway Protocol 4",
      url: "https://www.rfc-editor.org/rfc/rfc4271"
    },
    {
      title: "RFC 2328 - OSPF Version 2",
      url: "https://www.rfc-editor.org/rfc/rfc2328"
    }
  ]
};
