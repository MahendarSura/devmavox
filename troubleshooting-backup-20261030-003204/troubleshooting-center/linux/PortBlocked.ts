
export interface PortBlockedGuide {
  id: string;
  title: string;
  category: string;
  severity: string[];
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
    interpretResults: string[];
    nextAction: string[];
  }[];
  rootCauseMatrix: {
    cause: string;
    evidence: string[];
    resolution: string[];
    prevention: string[];
  }[];
  recoveryRunbook: {
    phase: string;
    actions: string[];
    validation: string[];
  }[];
  productionScenarios: {
    scenario: string;
    symptoms: string[];
    investigation: string[];
    resolution: string[];
    prevention: string[];
  }[];
  prevention: string[];
  monitoring: string[];
  ciChecks: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    lab: string;
    steps: string[];
    expectedLearning: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  references: string[];
}

export const portBlockedGuide: PortBlockedGuide = {
  id: "linux-port-blocked",
  title: "Linux Port Blocked — Real Production Troubleshooting",
  category: "Linux / Networking / Firewall / DevOps",

  severity: [
    "SEV-1: A critical production service is unreachable across a major environment or region, causing a significant outage.",
    "SEV-2: A production application, deployment agent, database connection, or internal service is unavailable to an important workload.",
    "SEV-3: A specific host, subnet, integration, or non-critical service cannot connect.",
    "SEV-4: A non-production connectivity issue or warning has no current customer impact."
  ],

  overview: `
A port connectivity failure occurs when a client cannot establish the
expected connection to a service. The cause may be a stopped listener,
wrong bind address, host firewall, cloud firewall, network ACL, routing,
NAT, proxy, load balancer, container publishing rule, Kubernetes Service,
or a service that is listening on a different address or port.

A port number alone does not identify a service. TCP/443 and UDP/443 are
different endpoints. A successful local connection does not prove that
remote traffic can reach the host. A successful TCP handshake does not
prove that TLS, authentication, or the application protocol works.

The production workflow must trace the connection from the client to the
destination, inspect each relevant layer, correlate packet and service
evidence, make the smallest approved correction, and validate the complete
application path.
`,

  symptoms: [
    "Connection refused",
    "Connection timed out",
    "No route to host",
    "Network is unreachable",
    "Address already in use",
    "A service works on localhost but not from another host.",
    "A port appears to be listening but clients cannot connect.",
    "A firewall change does not restore connectivity.",
    "A deployment agent cannot connect to an application or database port.",
    "An EC2 instance is reachable over SSH but its application port is not.",
    "A Docker container is healthy internally but its published port is unreachable.",
    "A Kubernetes Service has no reachable endpoints.",
    "A load balancer returns 502 or 504 while the backend service is running.",
    "TCP works but the application fails during TLS negotiation.",
    "Only one subnet, availability zone, VPN, or office network is affected.",
    "UDP requests time out although TCP connections to the same numeric port work."
  ],

  incidentScenario: `
At 10:15 AM, an application deployment completes, but users cannot reach
the application on TCP/8080. The service process appears to be running.
The monitoring system reports connection timeouts from a different subnet.

The incident responder must establish:
1. Which source and destination are affected?
2. Which IP address, port, and protocol are expected?
3. Is the service actually listening on the intended interface?
4. Does the connection fail locally, within the host, or across the network?
5. Are host firewall, cloud security rules, NACLs, routing, NAT, or load-balancer
   health checks involved?
6. Is the problem limited to a source CIDR, a destination, or a network zone?
7. What is the smallest approved fix?
8. Does the full application path work after remediation?
`,

  impactAssessment: [
    "Confirm production, staging, development, or disaster-recovery environment.",
    "Identify the affected application, service owner, release, hostname, and destination port.",
    "Record the source host, source IP, source subnet, destination IP, destination port, and protocol.",
    "Determine whether all clients fail or only one host, subnet, region, VPN, or availability zone.",
    "Establish whether the service was recently deployed, restarted, migrated, or reconfigured.",
    "Determine whether the failure is connection refused, timeout, routing failure, TLS failure, or an application-level error.",
    "Check whether the incident affects customer traffic, internal APIs, databases, monitoring, backups, or deployment agents.",
    "Identify whether the service is exposed publicly or intended to be private.",
    "Check whether any firewall, route, load-balancer, or security-group changes were already applied.",
    "Determine whether a rollback is available and whether the previous configuration is known.",
    "Assess security implications before changing inbound or outbound access rules.",
    "Establish an incident timeline and communicate scope to the application and network teams."
  ],

  safetyChecks: [
    "Confirm the exact environment, hostname, destination IP, port, and TCP or UDP protocol.",
    "Obtain authorization before changing production firewall rules, cloud security groups, NACLs, routes, or load balancers.",
    "Do not disable firewalls globally to test connectivity.",
    "Do not expose database, SSH, administrative, or internal application ports to the entire internet.",
    "Prefer a narrowly scoped source CIDR and destination port.",
    "Save existing firewall and routing configuration before approved changes.",
    "Use a maintenance window when changes can interrupt established connections.",
    "Do not restart networking remotely without a recovery path; it may disconnect the administrative session.",
    "Do not flush iptables or nftables rules during an incident.",
    "Use packet captures only with appropriate authorization and avoid collecting unrelated sensitive traffic.",
    "Avoid scanning networks or ports outside the approved scope.",
    "Do not assume a successful ping proves that a TCP or UDP port is reachable.",
    "Do not assume a failed ping means the application port is blocked; ICMP may be filtered independently.",
    "Use change management and a documented rollback plan for production network modifications."
  ],

  evidenceCollection: [
    "Record the incident ID, timestamp, source host, destination host, IP addresses, port, and protocol.",
    "Capture the exact client error, command, exit status, and connection timestamp.",
    "Record the DNS resolution result for the destination hostname.",
    "Capture listening sockets with ss -lntup where permissions permit.",
    "Record the service status and recent service logs.",
    "Inspect the destination host's addresses and routes.",
    "Capture relevant nftables or iptables rules without modifying them.",
    "Check firewalld or UFW status where those tools manage the host firewall.",
    "Record cloud security-group, NACL, route-table, load-balancer, and target-health information where applicable.",
    "Check whether a container port is published and whether the application binds to the correct interface.",
    "Compare successful and failed source hosts.",
    "Capture firewall counters, VPC flow logs, or packet captures when available and authorized.",
    "Record all configuration changes made during remediation."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Define the exact connection",
      objective: "Avoid troubleshooting the wrong port, host, address, or protocol.",
      commands: [
        "date -Is",
        "hostname -f",
        "getent ahosts <destination-hostname>",
        "ip -br address",
        "ip route",
        "ip route get <destination-ip>"
      ],
      interpretResults: [
        "Confirm the expected destination IP and whether it changes between attempts.",
        "Check which local source address and route the operating system selects.",
        "A hostname may resolve to multiple IPv4 or IPv6 addresses.",
        "The client may be connecting to a different address than the one inspected on the server.",
        "A route lookup shows the local routing decision; it does not prove the remote path is healthy."
      ],
      nextAction: [
        "Write down the exact source IP, destination IP, port, and protocol.",
        "Repeat the test against a specific resolved address when DNS or load balancing may be involved.",
        "Proceed to inspect the destination listener."
      ]
    },
    {
      step: 2,
      title: "Classify the client error",
      objective: "Use the error to narrow the investigation without treating it as definitive proof.",
      commands: [
        "nc -vz -w 3 <destination-ip> <port>",
        "curl -v --connect-timeout 5 http://<destination-hostname>:<port>/",
        "curl -vk --connect-timeout 5 https://<destination-hostname>:<port>/"
      ],
      interpretResults: [
        "Connection refused often means a TCP RST was received because no listener accepted the connection or a device actively rejected it.",
        "A timeout means the connection did not complete within the allowed time; packet filtering, routing, packet loss, an overloaded service, or a silent device may be involved.",
        "No route to host can indicate a local routing problem or an unreachable response from a network device; inspect routes and packet evidence.",
        "An HTTP response proves that some HTTP-speaking endpoint was reached, but not necessarily the intended backend.",
        "TLS errors after connection establishment are different from a blocked TCP port.",
        "The -k curl option disables certificate verification and is for temporary diagnosis only; do not use it as a production security fix."
      ],
      nextAction: [
        "Record the exact error and elapsed time.",
        "Use the protocol-appropriate test; do not use a TCP test to conclude that UDP is reachable.",
        "Continue with the listener and host-local tests."
      ]
    },
    {
      step: 3,
      title: "Verify that the service is running",
      objective: "Determine whether the destination service process is healthy.",
      commands: [
        "systemctl status <service-name>",
        "systemctl is-active <service-name>",
        "sudo journalctl -u <service-name> --since '30 minutes ago'",
        "ps -ef | grep '[p]rocess-name'"
      ],
      interpretResults: [
        "A stopped or repeatedly restarting service can explain a connection refusal.",
        "An active systemd unit does not guarantee that the application is listening on the expected port.",
        "The application may start successfully but fail to initialize its network listener.",
        "Recent logs may reveal bind errors, configuration errors, certificate failures, or resource exhaustion."
      ],
      nextAction: [
        "Identify the correct service unit and process.",
        "Review logs before restarting the service.",
        "If the process is healthy, inspect listening sockets next."
      ]
    },
    {
      step: 4,
      title: "Inspect listening sockets",
      objective: "Verify the actual local address, protocol, and port.",
      commands: [
        "sudo ss -lntp",
        "sudo ss -lnup",
        "sudo ss -lntp '( sport = :8080 )'",
        "sudo lsof -nP -iTCP:8080 -sTCP:LISTEN",
        "sudo fuser -v 8080/tcp"
      ],
      interpretResults: [
        "Replace 8080 with the actual application port.",
        "A TCP listener is shown with LISTEN state; UDP sockets are checked separately.",
        "127.0.0.1:8080 accepts loopback connections only and is not a general external listener.",
        "0.0.0.0:8080 listens on all local IPv4 interfaces, subject to other network and security controls.",
        "[::]:8080 indicates an IPv6 wildcard listener; IPv4 behavior depends on the application's socket configuration and operating-system settings.",
        "No listener may mean the service is stopped, using a different port, bound in another network namespace, or listening only on UDP.",
        "Address already in use means another process may already own the address and port."
      ],
      nextAction: [
        "Compare the listener with the intended bind address and protocol.",
        "If there is no listener, inspect application configuration and logs.",
        "If the listener exists, test locally and then compare with remote connectivity."
      ]
    },
    {
      step: 5,
      title: "Test locally on the destination",
      objective: "Separate application/listener problems from network-path problems.",
      commands: [
        "nc -vz -w 3 127.0.0.1 8080",
        "nc -vz -w 3 <server-private-ip> 8080",
        "curl -v --connect-timeout 5 http://127.0.0.1:8080/",
        "curl -v --connect-timeout 5 http://<server-private-ip>:8080/"
      ],
      interpretResults: [
        "Loopback success but private-IP failure can indicate a loopback-only bind, local firewall rules, or address-specific listener behavior.",
        "Both local tests failing suggest a listener, application, or host-local issue.",
        "Local success with remote failure narrows the investigation to bind address, host firewall, routing, upstream filtering, NAT, or network policy.",
        "An HTTP 404 is not a TCP port-blocking error; the server may be reachable but the requested route may not exist."
      ],
      nextAction: [
        "Confirm the application is bound to the correct interface.",
        "If local access works, inspect the host firewall and packet path.",
        "Do not change firewall rules until the expected traffic path is understood."
      ]
    },
    {
      step: 6,
      title: "Inspect the host firewall",
      objective: "Identify whether local firewall rules drop or reject the traffic.",
      commands: [
        "sudo nft list ruleset",
        "sudo iptables -S",
        "sudo iptables -L -n -v",
        "sudo firewall-cmd --state",
        "sudo firewall-cmd --list-all",
        "sudo ufw status verbose"
      ],
      interpretResults: [
        "Use the commands relevant to the firewall manager installed on the host.",
        "A host may use nftables directly, firewalld, UFW, or compatibility layers; multiple commands can show overlapping views.",
        "Inspect INPUT, OUTPUT, and FORWARD behavior as appropriate to the traffic path.",
        "Check interface, source CIDR, destination port, protocol, connection state, rule order, and packet counters.",
        "A default DROP policy does not prove that the target port is blocked; an earlier allow rule may match.",
        "A firewall status summary alone may not show every effective rule."
      ],
      nextAction: [
        "Find the exact rule that matches the failing traffic.",
        "Confirm the expected source CIDR and destination port with the service owner.",
        "If a change is approved, add the narrow allow rule using the system's established firewall manager.",
        "Preserve the original rules and rollback procedure."
      ]
    },
    {
      step: 7,
      title: "Trace packets with tcpdump",
      objective: "Determine whether connection packets reach the destination and whether replies leave it.",
      commands: [
        "sudo tcpdump -ni any 'host <client-ip> and host <server-ip> and tcp port 8080'",
        "sudo tcpdump -ni any 'host <client-ip> and udp port 5353'",
        "sudo tcpdump -ni <interface> 'tcp port 8080'",
        "sudo ss -tnp"
      ],
      interpretResults: [
        "Run packet capture only on authorized systems and for a short, targeted period.",
        "SYN arrives but no SYN-ACK or RST is observed: inspect local filtering, listener state, routing, and whether the capture is on the correct interface.",
        "SYN arrives and the server sends RST: investigate the listener, bind address, and active rejection behavior.",
        "SYN arrives and SYN-ACK leaves but the client times out: investigate the return path, upstream ACLs, NAT, or client-side filtering.",
        "No SYN reaches the server: investigate the client route, intermediate firewalls, cloud rules, NAT, and load balancer.",
        "Packet captures can be affected by offload, namespace, interface, and capture-point selection."
      ],
      nextAction: [
        "Correlate packet timestamps with the client test.",
        "Capture at both source and destination when possible.",
        "Use the observed packet direction to decide which network layer to inspect next."
      ]
    },
    {
      step: 8,
      title: "Verify routing and return-path symmetry",
      objective: "Find missing routes or asymmetric traffic paths.",
      commands: [
        "ip -br address",
        "ip route show table all",
        "ip rule show",
        "ip route get <client-ip>",
        "ip neigh show",
        "tracepath <destination-ip>",
        "traceroute -T -p 8080 <destination-ip>"
      ],
      interpretResults: [
        "The server's route to the client may differ from the route used by the incoming connection.",
        "Policy routing can select different tables based on source addresses or marks.",
        "A missing default route or incorrect subnet route can prevent the response from reaching the client.",
        "Traceroute probes may be filtered; missing hops do not automatically prove a routing failure.",
        "Neighbor discovery is relevant to local links and does not diagnose every routed path."
      ],
      nextAction: [
        "Compare source and return paths.",
        "Inspect route tables and policy-routing rules with the network owner.",
        "Do not add a default route or alter production routing without validating the intended topology."
      ]
    },
    {
      step: 9,
      title: "Check cloud firewall and subnet controls",
      objective: "Inspect the cloud network controls that exist outside the Linux host.",
      commands: [
        "ip route",
        "ip -br address",
        "curl -sS --connect-timeout 3 http://169.254.169.254/ 2>/dev/null"
      ],
      interpretResults: [
        "Cloud security groups, network ACLs, route tables, gateways, and firewall appliances are configured outside the host.",
        "The metadata-service example above is not a port-connectivity test and is not required for troubleshooting; do not query metadata endpoints unless there is a specific authorized need.",
        "For AWS, verify the attached security groups, inbound and outbound rules, subnet NACLs, route tables, Internet Gateway or NAT path, and target architecture.",
        "Security groups are stateful; network ACLs are stateless and require appropriate rules in both directions.",
        "A public IP alone does not guarantee reachability.",
        "The exact controls and statefulness depend on the cloud provider and network architecture."
      ],
      nextAction: [
        "Inspect cloud configuration using the approved console, CLI, or infrastructure-as-code state.",
        "Confirm both forward and return traffic are allowed.",
        "Make only the necessary source, destination, port, and protocol change.",
        "Check for configuration drift if the problem began after a deployment."
      ]
    },
    {
      step: 10,
      title: "Check NAT, gateways, and outbound access",
      objective: "Investigate connectivity failures caused by translation or egress restrictions.",
      commands: [
        "ip route",
        "ip rule show",
        "sudo nft list ruleset",
        "sudo iptables -t nat -S",
        "sudo conntrack -L 2>/dev/null | head -100"
      ],
      interpretResults: [
        "NAT may translate addresses or ports; the client-visible endpoint may differ from the backend listener.",
        "A private subnet may require an approved NAT gateway or egress proxy for outbound connections.",
        "A missing or exhausted connection-tracking entry may affect some traffic, but do not assume conntrack exhaustion without counters and logs.",
        "A port-forwarding rule may target an old or incorrect backend address.",
        "Conntrack tools may be unavailable or require elevated privileges."
      ],
      nextAction: [
        "Verify translation rules, gateway health, and target addresses.",
        "Check connection-tracking counters and relevant kernel logs before considering resource changes.",
        "Avoid flushing NAT or conntrack state on a production host without a reviewed impact assessment."
      ]
    },
    {
      step: 11,
      title: "Verify DNS and address-family behavior",
      objective: "Determine whether clients are connecting to the expected IPv4 or IPv6 destination.",
      commands: [
        "getent ahosts <hostname>",
        "dig A <hostname>",
        "dig AAAA <hostname>",
        "curl -4 -v --connect-timeout 5 http://<hostname>:8080/",
        "curl -6 -v --connect-timeout 5 http://<hostname>:8080/"
      ],
      interpretResults: [
        "A hostname may resolve to a stale address or an endpoint that does not host the service.",
        "IPv4 success with IPv6 failure can indicate an IPv6 listener, route, firewall, or DNS configuration issue.",
        "A DNS resolution failure occurs before the intended destination connection can be established.",
        "A load-balanced hostname may resolve to multiple endpoints with different health states."
      ],
      nextAction: [
        "Compare DNS answers with the expected service endpoints.",
        "Test specific resolved addresses to isolate a failing backend.",
        "Correct DNS or address-family configuration only after verifying the intended network design."
      ]
    },
    {
      step: 12,
      title: "Check load balancer and reverse proxy health",
      objective: "Determine whether the client reaches a frontend but the backend connection fails.",
      commands: [
        "curl -v --connect-timeout 5 http://<load-balancer-host>/",
        "curl -v --connect-timeout 5 http://<backend-private-ip>:8080/",
        "sudo ss -lntp",
        "sudo journalctl -u <proxy-service> --since '30 minutes ago'"
      ],
      interpretResults: [
        "A reachable frontend with 502 or 504 responses may indicate a backend connectivity, health-check, timeout, or application issue.",
        "Check listener rules, backend target port, health-check protocol and path, and target health.",
        "A health check can fail because the service binds to localhost, the wrong port is configured, or the health-check source is not allowed.",
        "A proxy may use a different backend address or DNS result from the client."
      ],
      nextAction: [
        "Check frontend and backend connectivity separately.",
        "Compare health-check configuration with the actual service listener.",
        "Fix the incorrect target, rule, or access control rather than opening unrelated ports."
      ]
    },
    {
      step: 13,
      title: "Investigate Docker port publishing",
      objective: "Determine whether a container port is exposed and reachable from the host.",
      commands: [
        "docker ps",
        "docker port <container-name>",
        "docker inspect <container-name>",
        "docker exec <container-name> ss -lntp",
        "docker exec <container-name> ip -br address",
        "sudo ss -lntp"
      ],
      interpretResults: [
        "A process listening inside a container is not automatically exposed on the host.",
        "docker port and container inspection reveal published ports and bindings.",
        "A port published only on 127.0.0.1 is not generally reachable from remote clients.",
        "The application may bind only to the container's loopback interface instead of its container interface.",
        "Host firewall, Docker networking, userland proxy behavior, and network namespace rules can all affect reachability."
      ],
      nextAction: [
        "Verify the intended host-to-container port mapping.",
        "Check the application's bind address inside the container.",
        "Change publishing configuration through the deployment definition.",
        "Avoid exposing an internal container port publicly unless required and approved."
      ]
    },
    {
      step: 14,
      title: "Investigate Kubernetes Service connectivity",
      objective: "Distinguish a cluster networking problem from an application listener problem.",
      commands: [
        "kubectl get svc -A",
        "kubectl get endpoints -A",
        "kubectl get endpointslices -A",
        "kubectl get pods -A -o wide",
        "kubectl describe svc <service-name> -n <namespace>",
        "kubectl get svc <service-name> -n <namespace> -o yaml",
        "kubectl logs <pod-name> -n <namespace> --tail=100"
      ],
      interpretResults: [
        "Check Service type, port, targetPort, selector, and endpoints.",
        "A Service with no ready endpoints may not have healthy matching Pods.",
        "The container's listening port must match the intended targetPort.",
        "NetworkPolicy, CNI behavior, node firewall rules, and cloud security controls can affect traffic.",
        "A NodePort or LoadBalancer Service has a different access path from a ClusterIP Service.",
        "Commands may require cluster-specific permissions."
      ],
      nextAction: [
        "Confirm Pod readiness and endpoint membership.",
        "Verify Service port mapping and the application's actual listener.",
        "Inspect NetworkPolicy and CNI logs if the service mapping is correct.",
        "Use the appropriate in-cluster and external tests to identify the failing boundary."
      ]
    },
    {
      step: 15,
      title: "Check TCP versus UDP and application protocol",
      objective: "Ensure the test matches the actual service protocol.",
      commands: [
        "sudo ss -lntp",
        "sudo ss -lnup",
        "nc -vz -w 3 <host> <tcp-port>",
        "dig @<dns-server-ip> <record-name> A +time=2 +tries=1",
        "dig @<dns-server-ip> <record-name> A +tcp +time=2 +tries=1"
      ],
      interpretResults: [
        "A TCP listener does not prove a UDP service exists on the same numeric port.",
        "UDP does not establish a TCP-style connection; lack of a response may be ambiguous.",
        "For DNS, compare UDP and TCP behavior where relevant.",
        "A successful TCP connection does not prove that TLS, authentication, or the application protocol is healthy."
      ],
      nextAction: [
        "Confirm the protocol from application configuration.",
        "Use a protocol-aware health check.",
        "Inspect service logs and packet evidence when the transport connection succeeds but the application fails."
      ]
    },
    {
      step: 16,
      title: "Check resource pressure and connection limits",
      objective: "Identify cases where the port is open but the service cannot accept new connections.",
      commands: [
        "uptime",
        "free -h",
        "df -h",
        "sudo ss -s",
        "sudo ss -lntp",
        "sudo journalctl -k --since '30 minutes ago'",
        "sudo journalctl -u <service-name> --since '30 minutes ago'"
      ],
      interpretResults: [
        "High CPU, memory pressure, file-descriptor exhaustion, or application connection limits can resemble a network problem.",
        "A listening socket may exist while the application is overloaded or not accepting connections promptly.",
        "Look for explicit resource-limit errors and application metrics before increasing limits.",
        "A full filesystem can prevent logs, PID files, or sockets from being created."
      ],
      nextAction: [
        "Correlate failures with CPU, memory, file-descriptor, and application connection metrics.",
        "Check service-specific limits and logs.",
        "Address the proven resource bottleneck rather than opening additional firewall ports."
      ]
    },
    {
      step: 17,
      title: "Apply the minimal approved network correction",
      objective: "Fix the identified boundary without weakening unrelated controls.",
      commands: [
        "sudo nft list ruleset",
        "sudo firewall-cmd --list-all",
        "sudo ufw status verbose",
        "ip route get <client-ip>",
        "sudo ss -lntp"
      ],
      interpretResults: [
        "These commands collect current state; they do not apply a fix.",
        "Choose the correction based on evidence: listener configuration, host firewall, cloud rule, route, NAT, load balancer, container publishing, or Kubernetes policy.",
        "Use the firewall manager and change process already adopted by the host.",
        "An inbound allow rule alone may not resolve an incorrect listener, return path, or backend health issue."
      ],
      nextAction: [
        "Record the before-state and approved desired state.",
        "Apply one targeted change at the correct layer.",
        "Validate from the original source host.",
        "Keep a tested rollback procedure available."
      ]
    },
    {
      step: 18,
      title: "Validate end-to-end recovery",
      objective: "Prove that the intended client can reach the intended application.",
      commands: [
        "nc -vz -w 3 <destination-ip> <port>",
        "curl -v --connect-timeout 5 http://<destination-hostname>:<port>/health",
        "sudo ss -lntp",
        "systemctl is-active <service-name>",
        "sudo journalctl -u <service-name> --since '10 minutes ago'"
      ],
      interpretResults: [
        "Repeat tests from the originally affected source, not just from the destination host.",
        "Validate the expected protocol and application health endpoint.",
        "Confirm that all required backends are healthy.",
        "A successful TCP test is necessary for many TCP services but is not sufficient for application recovery."
      ],
      nextAction: [
        "Monitor error rates, latency, target health, and connection failures.",
        "Check unaffected services for unintended consequences.",
        "Document the confirmed cause and exact correction.",
        "Rollback if the change creates a security exposure or additional service impact."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      cause: "Service stopped or not listening",
      evidence: [
        "No expected listener in ss output.",
        "Service logs show startup, bind, or configuration errors."
      ],
      resolution: [
        "Correct the service configuration or startup failure.",
        "Confirm the intended port and protocol.",
        "Validate local and remote connectivity."
      ],
      prevention: [
        "Add service health checks.",
        "Monitor listener and application health.",
        "Validate deployment configuration before rollout."
      ]
    },
    {
      cause: "Service bound only to loopback",
      evidence: [
        "Listener shows 127.0.0.1 or ::1.",
        "Local tests succeed but remote tests fail."
      ],
      resolution: [
        "Configure the service to bind to the intended private interface or approved wildcard address.",
        "Keep firewall rules restrictive.",
        "Verify the change does not expose an internal-only service."
      ],
      prevention: [
        "Validate bind addresses during deployment.",
        "Review network exposure as part of service configuration."
      ]
    },
    {
      cause: "Host firewall blocks the traffic",
      evidence: [
        "The destination receives traffic but matching rules drop or reject it.",
        "Firewall counters or logs correlate with the failed connection."
      ],
      resolution: [
        "Add a narrow approved rule for the required source, destination, protocol, and port.",
        "Persist the rule using the established firewall manager.",
        "Verify the effective rules and repeat the original test."
      ],
      prevention: [
        "Manage firewall policy as code.",
        "Test firewall changes before rollout.",
        "Alert on policy drift."
      ]
    },
    {
      cause: "Cloud security group or network ACL",
      evidence: [
        "Host-local tests succeed but remote traffic fails.",
        "Cloud rules or flow logs indicate rejected or missing traffic."
      ],
      resolution: [
        "Correct the relevant inbound or outbound rule.",
        "For stateless ACLs, verify the required return traffic and ephemeral-port behavior.",
        "Validate route tables and gateway paths."
      ],
      prevention: [
        "Version-control cloud network rules.",
        "Run infrastructure policy checks.",
        "Monitor flow logs and configuration drift."
      ]
    },
    {
      cause: "Incorrect route or asymmetric return path",
      evidence: [
        "Client SYN reaches the destination but the reply cannot return.",
        "Route lookup or packet capture shows an incorrect path."
      ],
      resolution: [
        "Correct the approved subnet or policy route.",
        "Validate the route in both directions.",
        "Check VPN, NAT, and gateway configuration."
      ],
      prevention: [
        "Review route changes.",
        "Test connectivity across network zones.",
        "Monitor route and gateway health."
      ]
    },
    {
      cause: "NAT or port-forwarding mismatch",
      evidence: [
        "The frontend receives traffic but forwards to an incorrect or unavailable target.",
        "Translation rules point to a stale backend."
      ],
      resolution: [
        "Correct the approved translation or forwarding rule.",
        "Verify the backend address and port.",
        "Check return-path translation and connection tracking."
      ],
      prevention: [
        "Manage NAT configuration as code.",
        "Validate backend targets during deployment.",
        "Monitor gateway and connection-tracking metrics."
      ]
    },
    {
      cause: "Load balancer target unhealthy",
      evidence: [
        "Frontend responds but backend requests fail.",
        "Target health checks fail or target port mappings are wrong."
      ],
      resolution: [
        "Correct the target port, health-check path, protocol, or approved access rule.",
        "Ensure the backend listens on the expected interface.",
        "Validate the full frontend-to-backend request path."
      ],
      prevention: [
        "Monitor target health.",
        "Run health-check validation during deployment.",
        "Test rolling deployments and rollback."
      ]
    },
    {
      cause: "Docker port not published or wrong bind address",
      evidence: [
        "The process listens inside the container but the host port is absent.",
        "Container configuration shows an incorrect or loopback-only mapping."
      ],
      resolution: [
        "Correct the container port publishing and application bind configuration.",
        "Review host firewall and container networking.",
        "Keep exposure limited to required interfaces."
      ],
      prevention: [
        "Validate container port mappings.",
        "Use production-like container networking in tests."
      ]
    },
    {
      cause: "Kubernetes Service or NetworkPolicy",
      evidence: [
        "Service endpoints are empty or targetPort is incorrect.",
        "Pod-level access differs from Service-level or external access."
      ],
      resolution: [
        "Correct selectors, readiness, targetPort, or the relevant NetworkPolicy.",
        "Verify CNI and node networking if mappings are correct.",
        "Validate both internal and external traffic paths."
      ],
      prevention: [
        "Validate Service endpoints before rollout.",
        "Test NetworkPolicy changes in staging.",
        "Monitor endpoint readiness and service error rates."
      ]
    },
    {
      cause: "DNS points to an incorrect endpoint",
      evidence: [
        "Hostname resolution differs from the expected destination.",
        "Direct-IP testing works while hostname-based testing fails."
      ],
      resolution: [
        "Correct the record or service-discovery configuration after verifying the intended target.",
        "Check TTL and cached answers.",
        "Validate all returned endpoints."
      ],
      prevention: [
        "Automate DNS validation.",
        "Monitor endpoint health.",
        "Use staged DNS cutovers where appropriate."
      ]
    },
    {
      cause: "Resource exhaustion or application backlog",
      evidence: [
        "The listener exists but requests fail under load.",
        "Logs or metrics show resource limits, queue pressure, or process exhaustion."
      ],
      resolution: [
        "Identify the specific bottleneck and apply a measured correction.",
        "Scale or restart only through the approved incident procedure.",
        "Validate under realistic load."
      ],
      prevention: [
        "Monitor file descriptors, CPU, memory, queue depth, and connection errors.",
        "Load-test production-like configurations.",
        "Define capacity and alert thresholds."
      ]
    }
  ],

  recoveryRunbook: [
    {
      phase: "Phase 1 — Stabilize",
      actions: [
        "Declare the incident and identify the service and network owners.",
        "Confirm the source, destination, port, protocol, environment, and impact.",
        "Pause risky deployments or network changes when they could worsen the outage.",
        "Collect client error, service status, listener state, and current network configuration."
      ],
      validation: [
        "The affected traffic path is documented.",
        "The severity and customer impact are understood.",
        "A safe diagnostic and rollback plan exists."
      ]
    },
    {
      phase: "Phase 2 — Isolate the failure boundary",
      actions: [
        "Test name resolution and routing.",
        "Inspect service status and listening sockets.",
        "Test locally on the destination and remotely from the affected source.",
        "Inspect host firewall, cloud rules, packet flow, routing, NAT, and load balancers as relevant."
      ],
      validation: [
        "The failure is narrowed to a specific layer or set of layers.",
        "The suspected cause is supported by observable evidence.",
        "The team knows whether packets reach the destination and whether replies return."
      ]
    },
    {
      phase: "Phase 3 — Apply the approved correction",
      actions: [
        "Save the existing configuration.",
        "Change only the identified listener, firewall, route, NAT, proxy, or cloud rule.",
        "Keep administrative and database ports private unless an approved architecture requires otherwise.",
        "Apply the change through the standard configuration-management or change process."
      ],
      validation: [
        "The effective configuration matches the approved change.",
        "No unrelated services or networks were exposed.",
        "Rollback remains possible."
      ]
    },
    {
      phase: "Phase 4 — Verify recovery",
      actions: [
        "Repeat the test from the original client.",
        "Validate TCP or UDP as appropriate.",
        "Test TLS or the application health endpoint where relevant.",
        "Inspect backend health, service logs, firewall counters, and monitoring."
      ],
      validation: [
        "The expected client reaches the intended service.",
        "Application-level health checks succeed.",
        "The original errors no longer occur."
      ]
    },
    {
      phase: "Phase 5 — Close and prevent recurrence",
      actions: [
        "Record the root cause and packet or configuration evidence.",
        "Document the exact changes and rollback result.",
        "Add monitoring or configuration validation for the failure mode.",
        "Assign owners and due dates for preventive actions."
      ],
      validation: [
        "The service remains healthy during the agreed observation period.",
        "No unintended network exposure was introduced.",
        "The incident report contains reproducible evidence."
      ]
    }
  ],

  productionScenarios: [
    {
      scenario: "Scenario 1 — Application port works locally but not remotely",
      symptoms: [
        "curl to localhost succeeds.",
        "Remote clients time out or receive connection refused."
      ],
      investigation: [
        "Inspect ss -lntp for the actual bind address.",
        "Test the private IP locally.",
        "Capture traffic on the destination while a remote client connects.",
        "Inspect host firewall, cloud security rules, and routing."
      ],
      resolution: [
        "Correct a loopback-only bind if remote access is intended.",
        "Add only the approved firewall and cloud rules.",
        "Validate from the original client."
      ],
      prevention: [
        "Add remote reachability tests to deployment validation.",
        "Monitor listener and application health separately."
      ]
    },
    {
      scenario: "Scenario 2 — EC2 application port is unreachable",
      symptoms: [
        "SSH works but TCP/8080 cannot be reached.",
        "The application is running on the instance."
      ],
      investigation: [
        "Confirm the service listener and private IP.",
        "Check instance security groups and subnet NACLs.",
        "Verify route tables and whether the intended access path is public or private.",
        "Use VPC Flow Logs where available to identify accepted or rejected traffic."
      ],
      resolution: [
        "Correct the relevant security group, ACL, route, or host firewall rule.",
        "Restrict access to approved client CIDRs or security-group sources.",
        "Test using the intended endpoint."
      ],
      prevention: [
        "Use infrastructure as code for network rules.",
        "Add connectivity checks and drift detection."
      ]
    },
    {
      scenario: "Scenario 3 — Docker application is unreachable",
      symptoms: [
        "The container is running but the host port is not reachable.",
        "The application listens only on container loopback or the port is not published."
      ],
      investigation: [
        "Inspect docker ps, docker port, and container configuration.",
        "Inspect the application listener inside the container.",
        "Compare host port publishing with the expected external endpoint."
      ],
      resolution: [
        "Correct the application bind address and port mapping.",
        "Verify host firewall and container network rules.",
        "Avoid unnecessary public exposure."
      ],
      prevention: [
        "Add container port and health-check tests.",
        "Validate container networking in CI."
      ]
    },
    {
      scenario: "Scenario 4 — Kubernetes Service returns connection failures",
      symptoms: [
        "Pods appear to run but the Service cannot be reached.",
        "The Service has no endpoints or uses the wrong targetPort."
      ],
      investigation: [
        "Inspect Service, EndpointSlices, Pod readiness, selectors, and port mappings.",
        "Test from an authorized in-cluster diagnostic Pod.",
        "Inspect NetworkPolicy and CNI behavior."
      ],
      resolution: [
        "Correct selectors, readiness, targetPort, or the relevant policy.",
        "Verify internal and external access paths separately."
      ],
      prevention: [
        "Validate Service endpoints and readiness before release.",
        "Add synthetic service connectivity tests."
      ]
    },
    {
      scenario: "Scenario 5 — Load balancer reports 502 or 504",
      symptoms: [
        "The frontend is reachable but requests fail.",
        "Backend targets are unhealthy or requests time out."
      ],
      investigation: [
        "Inspect target health and health-check settings.",
        "Test backend connectivity from the appropriate network path.",
        "Compare backend port, protocol, timeout, and firewall rules."
      ],
      resolution: [
        "Correct the backend target, health-check, or approved access rule.",
        "Validate application-level health and end-to-end requests."
      ],
      prevention: [
        "Monitor target health and latency.",
        "Add deployment smoke tests and automated rollback criteria."
      ]
    },
    {
      scenario: "Scenario 6 — TCP connection succeeds but TLS fails",
      symptoms: [
        "nc succeeds but curl or the application reports TLS errors.",
        "The service is reachable but the secure connection does not complete."
      ],
      investigation: [
        "Run curl -v against the correct HTTPS endpoint.",
        "Use openssl s_client -connect <host>:443 -servername <hostname> to inspect the TLS handshake.",
        "Check certificate validity, SNI, protocol settings, and proxy configuration."
      ],
      resolution: [
        "Correct the certificate, SNI, trust chain, or TLS configuration as evidenced.",
        "Do not treat a TLS failure as a reason to open unrelated firewall ports."
      ],
      prevention: [
        "Monitor certificate expiry and TLS health.",
        "Test HTTPS endpoints in deployment pipelines."
      ]
    },
    {
      scenario: "Scenario 7 — Connection timeout after a firewall change",
      symptoms: [
        "The failure begins after a network policy update.",
        "Packets leave the client but do not complete the handshake."
      ],
      investigation: [
        "Compare the current firewall or cloud policy with the previous approved version.",
        "Capture packets at source and destination where authorized.",
        "Inspect stateful rules, stateless ACL return paths, route changes, and rule counters."
      ],
      resolution: [
        "Roll back or correct the specific faulty rule through change management.",
        "Verify the complete forward and return paths."
      ],
      prevention: [
        "Test network changes before production.",
        "Use peer review and automated policy checks."
      ]
    },
    {
      scenario: "Scenario 8 — Port already in use after deployment",
      symptoms: [
        "The service fails to start with Address already in use.",
        "An old or duplicate process may own the listener."
      ],
      investigation: [
        "Use ss -lntp and lsof to identify the process holding the port.",
        "Check service units, duplicate deployment processes, and container port mappings.",
        "Review recent restart and deployment logs."
      ],
      resolution: [
        "Determine whether the existing listener is legitimate.",
        "Correct duplicate service configuration or the intended port mapping.",
        "Stop a process only after confirming ownership and operational impact."
      ],
      prevention: [
        "Prevent duplicate service instances.",
        "Validate port allocation during deployment.",
        "Monitor service startup failures."
      ]
    }
  ],

  prevention: [
    "Maintain a service-to-port inventory with protocol, bind address, owner, and exposure level.",
    "Manage host firewall, cloud security groups, NACLs, routes, and load-balancer configuration as code.",
    "Use least-privilege network access and narrowly scoped source CIDRs.",
    "Keep administrative and database ports private.",
    "Monitor listener health separately from end-to-end application health.",
    "Test connectivity from the actual client network, not only localhost.",
    "Include IPv4 and IPv6 behavior in validation where both are supported.",
    "Validate Docker port mappings and Kubernetes Service endpoints before release.",
    "Use staged rollouts and automated rollback for high-risk network changes.",
    "Review firewall and routing drift regularly.",
    "Keep a tested recovery path for remote networking changes.",
    "Document expected ports and dependencies in the application runbook."
  ],

  monitoring: [
    "TCP connection failures categorized by source, destination, port, and error type.",
    "Application health-check failures and backend target health.",
    "Connection latency, timeouts, resets, and retransmissions.",
    "Host firewall drops and relevant packet counters.",
    "Cloud flow-log rejects and security-policy changes.",
    "Route, gateway, NAT, and VPN health.",
    "Listener availability and service restart frequency.",
    "Load-balancer 5xx responses and target response latency.",
    "Container and Kubernetes service connectivity failures.",
    "File-descriptor exhaustion, connection backlog pressure, and resource saturation.",
    "Unauthorized or unexpected exposure of sensitive ports."
  ],

  ciChecks: [
    "Validate service bind address and port configuration.",
    "Check for port conflicts in integration-test environments.",
    "Run health checks from a separate test host or network namespace.",
    "Validate firewall and cloud network policy as code.",
    "Check that only approved source CIDRs can reach sensitive services.",
    "Validate container port publishing and runtime listener configuration.",
    "Check Kubernetes Service selectors, targetPort, readiness, and NetworkPolicy.",
    "Test TLS and application health separately from TCP reachability.",
    "Run smoke tests after deployment and before traffic cutover.",
    "Use controlled canary tests and documented rollback criteria.",
    "Avoid tests that scan networks outside the authorized scope.",
    "Keep diagnostic logs free of credentials and sensitive payloads."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Environment and service owner:",
    "Start time, detection time, mitigation time, recovery time:",
    "Business impact and severity:",
    "Source hostname/IP/subnet:",
    "Destination hostname/IP/port/protocol:",
    "Exact client error and test command:",
    "DNS answers and route-selection evidence:",
    "Listener and service status:",
    "Host firewall, cloud policy, route, NAT, and load-balancer findings:",
    "Packet-capture or flow-log evidence:",
    "Confirmed root cause:",
    "Approved changes and rollback result:",
    "End-to-end validation results:",
    "Monitoring and prevention changes:",
    "Corrective actions, owners, and due dates:"
  ],

  handsOnLabs: [
    {
      lab: "Lab 1 — Listener versus firewall",
      steps: [
        "Use a disposable Linux VM and a non-sensitive test port.",
        "Start a simple test service bound to loopback.",
        "Test loopback and the VM's private IP separately.",
        "Change the test service bind address in the lab and compare results.",
        "If permitted, test a narrow host-firewall rule and then restore the original policy."
      ],
      expectedLearning: "Understand how a listener bind address differs from firewall reachability."
    },
    {
      lab: "Lab 2 — Trace a TCP connection",
      steps: [
        "Use two lab VMs on an authorized test network.",
        "Start a test listener on one VM.",
        "Run nc from the client.",
        "Capture the SYN, SYN-ACK, and final ACK using tcpdump.",
        "Repeat with a controlled test rule that drops the selected traffic, then restore the original configuration."
      ],
      expectedLearning: "Understand TCP handshake behavior and how packet evidence localizes a failure."
    },
    {
      lab: "Lab 3 — Docker port publishing",
      steps: [
        "Run a test web service in a disposable container.",
        "Inspect docker ps, docker port, and the container listener.",
        "Compare a loopback-only published port with a private-interface binding.",
        "Restore the intended safe configuration."
      ],
      expectedLearning: "Understand host-to-container port mapping and interface exposure."
    },
    {
      lab: "Lab 4 — Kubernetes Service debugging",
      steps: [
        "Deploy a test application in a disposable cluster.",
        "Inspect its Pod, Service, and EndpointSlices.",
        "Intentionally use an incorrect targetPort in the lab.",
        "Compare in-cluster direct Pod access with Service access.",
        "Correct the port mapping and validate the Service."
      ],
      expectedLearning: "Distinguish Pod readiness, targetPort, endpoint, and Service connectivity failures."
    },
    {
      lab: "Lab 5 — TLS versus TCP failure",
      steps: [
        "Run an HTTPS test service in a lab environment.",
        "Test the port using nc.",
        "Inspect the TLS handshake with curl -v and openssl s_client.",
        "Use a controlled invalid certificate in the lab and compare transport versus TLS errors.",
        "Restore the valid test certificate."
      ],
      expectedLearning: "Understand that an open TCP port does not guarantee successful TLS or application behavior."
    }
  ],

  interviewQuestions: [
    {
      question: "What is the first step when a port is reported as blocked?",
      answer: "Confirm source, destination, IP, port, protocol, environment, and the exact error. Then inspect the listener and test from both the destination and the original client."
    },
    {
      question: "What is the difference between Connection refused and Connection timed out?",
      answer: "Refused commonly means a reset or active rejection was received. A timeout means the expected connection did not complete; filtering, routing, packet loss, or an unresponsive endpoint may be involved."
    },
    {
      question: "Why does a service work on localhost but not remotely?",
      answer: "It may bind only to loopback, or host firewall, cloud network policy, routing, NAT, or another network layer may prevent remote access."
    },
    {
      question: "How do you check whether a Linux port is listening?",
      answer: "Use ss -lntp for TCP listeners and ss -lnup for UDP sockets. Confirm the local bind address and process."
    },
    {
      question: "How do you identify where a packet is dropped?",
      answer: "Correlate a client connection attempt with packet captures at the source and destination, firewall counters, and cloud flow logs. Check whether the SYN arrives and whether a reply leaves."
    },
    {
      question: "Does ping prove that a port is open?",
      answer: "No. Ping tests ICMP reachability, not whether a particular TCP or UDP service is listening and reachable."
    },
    {
      question: "What is the difference between a security group and a network ACL in AWS?",
      answer: "Security groups are stateful and apply to associated resources. Network ACLs are stateless subnet-level controls, so the required return traffic must also be allowed."
    },
    {
      question: "Why can a TCP connection succeed while the application fails?",
      answer: "The transport connection may work while TLS, authentication, routing at the application layer, HTTP paths, backend dependencies, or business logic fails."
    },
    {
      question: "How do you troubleshoot Docker port issues?",
      answer: "Inspect docker ps, docker port, container configuration, the listener inside the container, published host bindings, and host firewall rules."
    },
    {
      question: "How do you troubleshoot a Kubernetes Service port failure?",
      answer: "Check Service type, port, targetPort, selectors, EndpointSlices, Pod readiness, NetworkPolicy, CNI health, and the intended internal or external access path."
    },
    {
      question: "How do you troubleshoot Address already in use?",
      answer: "Use ss or lsof to identify the process holding the port, inspect service and container configuration, and stop or reconfigure a process only after confirming its ownership and impact."
    },
    {
      question: "How do you safely change a production firewall rule?",
      answer: "Capture the existing policy, obtain approval, add the narrowest required rule, validate from the original source, monitor for regressions, and keep a rollback plan."
    },
    {
      question: "What does a TCP handshake tell you?",
      answer: "A completed handshake confirms transport-level connection establishment to an endpoint. It does not prove that the intended application, TLS, or backend operation is healthy."
    },
    {
      question: "Why should you inspect the return path?",
      answer: "The initial packet may reach the destination while the response takes an incorrect route or is blocked by another control, resulting in a timeout."
    },
    {
      question: "How do you prove that a port incident is resolved?",
      answer: "Repeat the protocol-specific test from the originally affected client, verify the intended listener and application health, inspect logs and monitoring, and confirm that no unintended exposure was introduced."
    }
  ],

  references: [
    "man ss — inspect sockets and listening ports.",
    "man ip-route and man ip-rule — inspect routes and policy routing.",
    "man nft — inspect and manage nftables rules.",
    "iptables documentation — inspect legacy or compatibility firewall rules.",
    "tcpdump manual — capture and filter network packets.",
    "nc / netcat manual — test TCP connectivity where supported.",
    "curl documentation — inspect HTTP and HTTPS behavior.",
    "OpenSSL s_client documentation — inspect TLS handshakes.",
    "AWS documentation — security groups, network ACLs, VPC routing, and flow logs.",
    "Docker documentation — port publishing and container networking.",
    "Kubernetes documentation — Services, EndpointSlices, NetworkPolicy, and cluster networking."
  ]
};
