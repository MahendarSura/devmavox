
export interface DockerNetworkDiagnosticStep {
  title: string;
  purpose: string;
  commands: string[];
  expectedEvidence: string[];
  interpretation: string[];
  nextAction: string[];
}

export interface DockerNetworkRootCause {
  cause: string;
  symptoms: string[];
  evidence: string[];
  diagnosis: string[];
  remediation: string[];
  validation: string[];
}

export interface DockerNetworkInterviewQuestion {
  question: string;
  answer: string;
  followUp: string;
}

export interface DockerNetworkingGuide {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  summary: string;
  overview: {
    definition: string;
    concepts: string[];
    symptoms: string[];
    commonCauses: string[];
  };
  incidentScenario: {
    title: string;
    timeline: string[];
    impact: string[];
    initialHypotheses: string[];
    investigation: string[];
    recovery: string[];
  };
  impactAndSeverity: {
    environment: string;
    impact: string;
    severity: string;
    response: string;
  }[];
  safetyChecks: string[];
  evidenceCollection: {
    source: string;
    commands: string[];
    purpose: string;
    cautions: string[];
  }[];
  diagnosticWorkflow: DockerNetworkDiagnosticStep[];
  rootCausePlaybooks: DockerNetworkRootCause[];
  networkConcepts: {
    name: string;
    explanation: string;
    troubleshootingUse: string;
  }[];
  decisionTree: {
    symptom: string;
    evidence: string;
    likelyCause: string;
    nextAction: string;
  }[];
  recoveryWorkflow: {
    phase: string;
    actions: string[];
    successCriteria: string[];
  }[];
  prevention: {
    area: string;
    practices: string[];
  }[];
  commonMistakes: {
    mistake: string;
    whyItFails: string;
    betterApproach: string;
  }[];
  incidentReportTemplate: string[];
  productionRunbook: {
    phase: string;
    checklist: string[];
  }[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    expectedFinding: string;
    solution: string[];
  }[];
  interviewQuestions: DockerNetworkInterviewQuestion[];
  references: {
    title: string;
    url: string;
  }[];
}

export const dockerNetworkingGuide = {
  title: "Docker Networking — Real Production Troubleshooting Guide",
  slug: "networking",
  category: "Docker",
  difficulty: "Advanced",
  summary:
    "A production-focused guide to Docker DNS failures, bridge and custom networks, published ports, service discovery, routing, firewall rules, reverse proxies, connection timeouts, TLS errors, MTU problems, connection exhaustion, container-to-container communication, Compose networking, host networking, Kubernetes networking, controlled recovery, and incident prevention.",

  overview: {
    definition:
      "Docker networking connects containers to one another, the host, external services, and clients. Troubleshooting requires identifying the exact communication path and determining where packets or requests fail: application listener, container network namespace, Docker network, DNS resolver, routing, host firewall, NAT, published port, reverse proxy, load balancer, or remote dependency. A successful ping does not prove that an application port works, and a failed ping does not necessarily mean that the service is unavailable.",

    concepts: [
      "Network namespace: an isolated set of network interfaces, routes, sockets, and related networking state used by a container.",
      "Bridge network: a common Docker network type that connects containers through a virtual bridge. Containers on the same user-defined bridge can normally discover one another by name.",
      "Default bridge: Docker's default bridge network. Its name-resolution behavior differs from a user-defined bridge, so do not assume that container-name DNS works identically.",
      "User-defined bridge: a bridge network created by the operator. It supports automatic name resolution between attached containers and provides a useful boundary for application communication.",
      "Published port: a host port mapped to a container port. A service listening only inside a container is not automatically reachable from external clients.",
      "Container port: the port on which the application listens inside the container. Publishing a different port or listening on the wrong interface can make the service unreachable.",
      "DNS: translates service or hostnames into addresses. DNS resolution can fail even when the network route and application process are healthy.",
      "Routing: determines where packets travel. Incorrect routes, overlapping subnets, missing gateways, or asymmetric paths can cause failures.",
      "NAT and port mapping: translate addresses or ports between network boundaries. Host firewall and forwarding rules can affect published-port connectivity.",
      "Loopback: 127.0.0.1 inside a container refers to that container's own network namespace, not another container or the Docker host.",
      "Service discovery: allows applications to locate dependencies through DNS names, service names, or a discovery system rather than hard-coded IP addresses.",
      "Reverse proxy: receives requests and forwards them to an upstream service. A proxy-generated 502 can indicate upstream reachability, connection, or protocol problems.",
      "TLS: encrypts and authenticates connections. Certificate, hostname, trust-chain, and protocol errors are different from basic TCP connectivity failures.",
      "MTU: the maximum packet size for a network interface. Incorrect MTU or path-MTU behavior can cause intermittent failures, especially with tunnels and larger packets.",
      "Connection exhaustion: available sockets, ephemeral ports, file descriptors, or connection-tracking entries can be exhausted even when basic connectivity appears normal.",
      "Docker DNS: Docker provides name resolution for containers on supported user-defined networks. External DNS forwarding and host resolver behavior can affect name resolution.",
      "Network isolation: containers on different networks may not communicate directly unless an intentional and supported network path exists.",
      "Network driver: bridge, host, overlay, macvlan, and other drivers have different routing, isolation, and deployment implications.",
      "Overlay networking: connects workloads across hosts in supported orchestrators. It introduces additional routing, encapsulation, firewall, and control-plane considerations.",
      "Host networking: removes the normal isolated container network namespace on supported platforms. Port publishing behaves differently and must not be assumed to work as it does with bridge networking."
    ],

    symptoms: [
      "A container cannot reach another container by service name.",
      "A service works inside the container but cannot be reached from the host.",
      "An application is accessible from the host but not from an external client.",
      "Docker Compose services fail with temporary DNS resolution errors.",
      "A reverse proxy returns HTTP 502 or 504.",
      "Applications report connection refused, connection timed out, or no route to host.",
      "Connections fail intermittently after deployment or under load.",
      "A container can reach an IP address but cannot resolve the corresponding hostname.",
      "A service becomes unreachable after a Docker network or host configuration change.",
      "TLS handshakes fail even though TCP connections can be established.",
      "Large requests fail while small requests succeed.",
      "Several containers on one host lose connectivity at the same time.",
      "A published port is reachable from one network but not from another.",
      "Container-to-container communication fails after a service is recreated.",
      "Applications connect to a stale IP address after a dependency changes."
    ],

    commonCauses: [
      "Containers are attached to different networks without a valid route between them.",
      "An application listens on 127.0.0.1 instead of the intended container interface.",
      "The host port or container port is incorrect.",
      "The application process is not listening, or it has crashed.",
      "A Compose service uses the wrong DNS name or an obsolete container IP.",
      "External DNS servers or Docker's DNS forwarding path are failing.",
      "Host firewall, forwarding policy, cloud security rules, or network ACLs block traffic.",
      "The service uses HTTPS while the client or proxy expects HTTP, or vice versa.",
      "TLS certificates are expired, untrusted, or issued for another hostname.",
      "An IP subnet overlaps with a VPN, corporate network, host route, or another Docker network.",
      "MTU or path-MTU discovery problems affect larger packets.",
      "Connection pools, ephemeral ports, file descriptors, or conntrack resources are exhausted.",
      "A reverse proxy has the wrong upstream hostname, port, protocol, or network attachment.",
      "An overlay network has control-plane, firewall, encapsulation, or cross-host routing problems.",
      "A network change was applied manually and conflicts with the configuration source of truth.",
      "A deployment recreated a container and invalidated a hard-coded IP address.",
      "A dependency is slow or unavailable, causing retries and connection accumulation.",
      "The application health check tests a different path from the real client request."
    ]
  },

  incidentScenario: {
    title:
      "Production API begins returning 502 errors after a Docker Compose deployment",

    timeline: [
      "09:00 — The API, reverse proxy, and database are healthy.",
      "09:15 — A new application image is deployed through the approved release pipeline.",
      "09:17 — The reverse proxy begins returning intermittent HTTP 502 responses.",
      "09:18 — The API container reports as running, but its application readiness check is failing.",
      "09:20 — The on-call engineer acknowledges the incident and confirms customer impact.",
      "09:22 — The engineer records the Docker context, container IDs, image digests, Compose project, network membership, and recent deployment changes.",
      "09:25 — Proxy logs show upstream connection failures. The engineer checks whether the upstream service name and port match the deployed application.",
      "09:28 — DNS resolution and TCP connectivity are tested separately from the proxy and application network namespaces.",
      "09:32 — Evidence shows that the new application listens on a different port than the proxy's configured upstream port. This is an illustrative root cause, not a universal explanation for 502 errors.",
      "09:35 — The team verifies the intended port in the application configuration and checks whether the release configuration changed.",
      "09:40 — An approved configuration correction or compatible rollback is applied through the deployment pipeline.",
      "09:45 — The proxy can connect to the application, readiness checks pass, and the error rate declines.",
      "10:00 — The service owner confirms recovery using real requests, latency, error rates, and dependency health.",
      "After the incident — The team adds configuration validation and an end-to-end connectivity test to the release pipeline."
    ],

    impact: [
      "Customer requests may fail even though containers appear to be running.",
      "Retries can increase application and database load.",
      "Affected APIs may return 502, 503, or 504 responses.",
      "The incident can be isolated to one service or affect several applications sharing a host or network."
    ],

    initialHypotheses: [
      "The application is not listening on the expected port.",
      "The reverse proxy has an incorrect upstream target.",
      "Docker DNS cannot resolve the service name.",
      "The application and proxy are not attached to a common network.",
      "A firewall or route blocks the connection.",
      "The upstream is slow, causing connection timeouts rather than an immediate refusal."
    ],

    investigation: [
      "Inspect proxy error logs and identify the actual upstream hostname, port, and protocol.",
      "Confirm that the target application process is running and listening on the expected interface.",
      "Inspect network membership and DNS resolution from the relevant container.",
      "Test TCP connectivity separately from HTTP and TLS behavior.",
      "Compare the active configuration and image digest with the previous release.",
      "Correlate the first failure with deployment and network configuration timestamps."
    ],

    recovery: [
      "Preserve proxy logs, application logs, container IDs, and network configuration evidence.",
      "Correct the verified upstream or listener configuration, or use an approved compatible rollback.",
      "Validate DNS, TCP, HTTP, and TLS independently where applicable.",
      "Confirm healthy real requests and monitor error rates during the recovery window.",
      "Add a regression test that checks the actual proxy-to-application path."
    ]
  },

  impactAndSeverity: [
    {
      environment: "Development",
      impact:
        "A local service cannot connect to a dependency, or a developer cannot reach a published port.",
      severity: "SEV-4 / Low",
      response:
        "Confirm container status, network attachment, port mapping, service name, and listener configuration."
    },
    {
      environment: "Staging / QA",
      impact:
        "Integration tests, end-to-end tests, or release validation fail.",
      severity: "SEV-3 / Moderate",
      response:
        "Compare staging network and service configuration with the intended production design. Block promotion if connectivity is a release requirement."
    },
    {
      environment: "Production — one service affected",
      impact:
        "An API or worker cannot reach a dependency, and customer requests or background jobs fail.",
      severity: "SEV-2 / High",
      response:
        "Check service-level impact, healthy replicas, dependency reachability, retries, and available failover capacity."
    },
    {
      environment: "Production — shared network or multiple services affected",
      impact:
        "Several services become unreachable, ingress fails, or cross-host communication is disrupted.",
      severity: "SEV-1 / Critical",
      response:
        "Declare an incident, engage platform and network owners, preserve evidence, and use an approved mitigation that protects remaining service capacity."
    }
  ],

  safetyChecks: [
    "Verify the target environment, host, Docker context, Compose project, network, service, and container ID.",
    "Run docker context show before using Docker commands against a remote or production context.",
    "Confirm whether the workload is managed by standalone Docker, Docker Compose, Swarm, Kubernetes, or another orchestrator.",
    "Record image digests, deployment revision, container state, network IDs, IP addresses, and published ports.",
    "Check whether the affected traffic is client-to-host, host-to-container, container-to-container, container-to-external-service, or cross-host.",
    "Identify the actual failure stage: DNS lookup, TCP connection, TLS handshake, HTTP response, or application processing.",
    "Preserve logs and inspect network configuration before changing or recreating containers.",
    "Confirm the blast radius before changing shared Docker networks, host firewall rules, routes, DNS, or proxy configuration.",
    "Check production approval requirements before changing routing, firewall policy, network membership, or published ports.",
    "Do not expose credentials, authorization headers, cookies, private keys, or sensitive query parameters in logs or packet captures.",
    "Avoid publishing database, cache, administrative, or internal service ports publicly unless explicitly required and approved.",
    "Do not use host networking as a quick fix without reviewing port conflicts and isolation requirements.",
    "Do not disconnect a production container from a shared network until its dependencies and impact are understood.",
    "Do not delete and recreate a network as the first troubleshooting step. Existing endpoints may be disconnected and service availability affected.",
    "Avoid flushing iptables/nftables rules or disabling host firewalls as a diagnostic shortcut.",
    "Use packet captures only with authorization, a defined scope, and appropriate protection for sensitive traffic.",
    "Record the initial state, every change, the expected result, and the rollback method."
  ],

  evidenceCollection: [
    {
      source: "Docker context and container identity",
      commands: [
        "docker context show",
        "docker ps -a --no-trunc",
        "docker inspect --format '{{.Id}} {{.Name}} {{.Config.Image}} {{.Image}} {{.State.Status}}' CONTAINER",
        "docker inspect --format '{{json .NetworkSettings.Networks}}' CONTAINER"
      ],
      purpose:
        "Identify the target container, image digest, state, attached networks, and assigned addresses.",
      cautions: [
        "Replace CONTAINER with the verified name or ID.",
        "Container names and IP addresses may change after recreation.",
        "Do not assume that a running container has a healthy application listener."
      ]
    },
    {
      source: "Network topology",
      commands: [
        "docker network ls",
        "docker network inspect NETWORK",
        "docker inspect --format '{{json .HostConfig.NetworkMode}}' CONTAINER"
      ],
      purpose:
        "Inspect the network driver, subnet, gateway, connected endpoints, and container network mode.",
      cautions: [
        "Inspect the correct network ID, especially when several networks have similar names.",
        "Network output can contain internal topology information; sanitize it before sharing externally.",
        "Host and overlay networking require different troubleshooting steps from a local bridge network."
      ]
    },
    {
      source: "Published ports and listeners",
      commands: [
        "docker port CONTAINER",
        "docker inspect --format '{{json .NetworkSettings.Ports}}' CONTAINER",
        "docker exec CONTAINER sh -c 'ss -lntup || netstat -lntup'",
        "ss -lntup"
      ],
      purpose:
        "Compare host-to-container port mappings with the application's actual listening sockets.",
      cautions: [
        "The container must be running for docker exec to work.",
        "Minimal images may not contain ss or netstat.",
        "The host's listener list does not necessarily show every forwarding implementation used by Docker."
      ]
    },
    {
      source: "DNS and name resolution",
      commands: [
        "docker exec CONTAINER cat /etc/resolv.conf",
        "docker exec CONTAINER cat /etc/hosts",
        "docker exec CONTAINER getent hosts SERVICE",
        "docker exec CONTAINER nslookup SERVICE"
      ],
      purpose:
        "Check resolver configuration and service-name lookup from the relevant container.",
      cautions: [
        "The image may not include getent or nslookup.",
        "Use a controlled diagnostic container attached to the same network if tools are missing and policy allows it.",
        "Do not hard-code a temporary container IP as a permanent DNS fix."
      ]
    },
    {
      source: "Application and proxy logs",
      commands: [
        "docker logs --timestamps --tail 300 CONTAINER",
        "docker logs --timestamps --since 30m CONTAINER",
        "docker compose logs --timestamps --tail 300 SERVICE"
      ],
      purpose:
        "Identify upstream connection errors, DNS failures, connection refusals, TLS errors, and request timeouts.",
      cautions: [
        "Use the correct Compose project and service.",
        "Logs can contain tokens, credentials, personal information, and sensitive URLs.",
        "A proxy 502 is a symptom; use the upstream error message to narrow the failure."
      ]
    },
    {
      source: "Host routing and addresses",
      commands: [
        "ip -br addr",
        "ip route",
        "ip rule show",
        "ip route get DESTINATION_IP"
      ],
      purpose:
        "Inspect host interface addresses, routing rules, and the selected route toward a destination.",
      cautions: [
        "Linux host commands may not work in Docker Desktop or managed environments.",
        "Run route checks in the network namespace relevant to the failed traffic path.",
        "A host route result does not automatically prove that a container namespace has the same route."
      ]
    },
    {
      source: "Host firewall and forwarding",
      commands: [
        "sudo nft list ruleset",
        "sudo iptables -S",
        "sudo iptables -t nat -S",
        "sysctl net.ipv4.ip_forward"
      ],
      purpose:
        "Inspect host packet-filtering, NAT, and IPv4 forwarding configuration where applicable.",
      cautions: [
        "Use only read-only inspection initially.",
        "Firewall backends differ; Docker may interact with iptables or nftables depending on the host.",
        "Do not flush rules or change forwarding policy without approval and a rollback plan."
      ]
    },
    {
      source: "TCP, HTTP, and TLS",
      commands: [
        "curl -v --connect-timeout 3 --max-time 10 http://HOST:PORT/health",
        "curl -vk --connect-timeout 3 --max-time 10 https://HOST:PORT/health",
        "nc -vz -w 3 HOST PORT",
        "openssl s_client -connect HOST:PORT -servername HOSTNAME"
      ],
      purpose:
        "Separate TCP reachability, HTTP response behavior, and TLS handshake or certificate problems.",
      cautions: [
        "Replace HOST, PORT, and HOSTNAME with verified values.",
        "Use the correct scheme. Do not disable certificate validation in production to hide a trust problem.",
        "curl -k is only a temporary diagnostic for distinguishing some certificate-validation failures; it is not a production fix.",
        "A health endpoint must be safe to call and must not perform a destructive operation."
      ]
    },
    {
      source: "Compose configuration",
      commands: [
        "docker compose ps -a",
        "docker compose config --quiet",
        "docker compose logs --timestamps --tail 300 SERVICE"
      ],
      purpose:
        "Validate the Compose model, inspect service state, and review service logs.",
      cautions: [
        "Run commands in the intended project directory with the correct Compose files and environment.",
        "Configuration validation does not prove that the application is reachable.",
        "Resolved configuration can expose secrets; avoid publishing unredacted output."
      ]
    },
    {
      source: "Connections and host resource pressure",
      commands: [
        "ss -s",
        "ss -tan state established",
        "ss -tan state time-wait",
        "ulimit -n",
        "cat /proc/sys/net/ipv4/ip_local_port_range"
      ],
      purpose:
        "Investigate connection accumulation, socket state, process file-descriptor limits, and ephemeral port ranges.",
      cautions: [
        "The displayed ulimit applies to the shell where it is run, not automatically to the application process.",
        "TIME_WAIT is a normal TCP state; a high count alone does not prove exhaustion.",
        "Use process-specific and time-series evidence before changing kernel networking settings."
      ]
    },
    {
      source: "Packet-level investigation",
      commands: [
        "sudo tcpdump -ni any host DESTINATION_IP and port PORT",
        "sudo tcpdump -ni any -c 100 host DESTINATION_IP"
      ],
      purpose:
        "Determine whether traffic leaves an interface, receives a response, experiences retransmissions, or is blocked along the observed path.",
      cautions: [
        "Use a narrowly scoped capture with authorization and a time limit.",
        "Packet captures can contain sensitive application data.",
        "Capturing on any does not guarantee that all traffic paths or namespaces are visible.",
        "A packet seen on one host interface does not prove that it reaches the final destination."
      ]
    }
  ],

  diagnosticWorkflow: [
    {
      title: "Step 1 — Define the failed communication path",
      purpose:
        "Identify exactly which source cannot reach which destination and on what protocol and port.",
      commands: [
        "docker context show",
        "docker ps -a --no-trunc",
        "docker network ls"
      ],
      expectedEvidence: [
        "The source container, destination service, environment, network, and failure time.",
        "The error may be DNS failure, connection refused, timeout, TLS failure, or an application-level response.",
        "Other callers may still reach the destination successfully."
      ],
      interpretation: [
        "DNS failure means name resolution must be investigated before treating the problem as a routing failure.",
        "Connection refused commonly means a TCP connection was rejected or actively refused; check the listener and any intermediate proxy.",
        "A timeout suggests no timely response, but does not identify whether the cause is routing, filtering, congestion, or an unresponsive service."
      ],
      nextAction: [
        "Write down the source, destination, port, protocol, timestamp, and exact error.",
        "Identify whether the path crosses a host boundary, proxy, VPN, or cloud network."
      ]
    },
    {
      title: "Step 2 — Confirm the destination application is healthy",
      purpose:
        "Avoid debugging networking when the application is not listening or is unhealthy.",
      commands: [
        "docker ps -a --no-trunc",
        "docker logs --timestamps --tail 200 DESTINATION_CONTAINER",
        "docker inspect --format '{{.State.Status}} {{.State.ExitCode}}' DESTINATION_CONTAINER",
        "docker port DESTINATION_CONTAINER"
      ],
      expectedEvidence: [
        "The container may be stopped, restarting, unhealthy, or running.",
        "Logs may show a failed startup, bind error, or incorrect configured port.",
        "Published port mappings may differ from the application's actual port."
      ],
      interpretation: [
        "A running container does not guarantee that the application process is listening.",
        "A published port does not create a listener inside the container.",
        "If the process is healthy and listening, continue to DNS, network membership, and path checks."
      ],
      nextAction: [
        "Verify the expected listener port and bind address.",
        "Record the configured and actual ports before changing the proxy or network."
      ]
    },
    {
      title: "Step 3 — Inspect network membership",
      purpose:
        "Verify that the source and destination have a valid network path.",
      commands: [
        "docker network ls",
        "docker network inspect NETWORK",
        "docker inspect --format '{{json .NetworkSettings.Networks}}' SOURCE_CONTAINER",
        "docker inspect --format '{{json .NetworkSettings.Networks}}' DESTINATION_CONTAINER"
      ],
      expectedEvidence: [
        "Network names and IDs, drivers, subnets, gateways, and attached endpoints.",
        "The containers may share a user-defined bridge or use different networks.",
        "Host or overlay networking may require a different analysis."
      ],
      interpretation: [
        "Containers on separate bridge networks do not automatically gain direct connectivity simply because both are on the same Docker host.",
        "Containers attached to a shared network still need correct DNS, listener, and port configuration.",
        "Do not treat membership in the same network as proof that the application is reachable."
      ],
      nextAction: [
        "Confirm the intended network design and permitted communication paths.",
        "If a network attachment is missing, plan an approved change and evaluate its blast radius."
      ]
    },
    {
      title: "Step 4 — Test DNS separately",
      purpose:
        "Determine whether the service name resolves from the same network namespace as the failing client.",
      commands: [
        "docker exec SOURCE_CONTAINER cat /etc/resolv.conf",
        "docker exec SOURCE_CONTAINER getent hosts SERVICE",
        "docker exec SOURCE_CONTAINER nslookup SERVICE"
      ],
      expectedEvidence: [
        "The service name may resolve to an address or return a lookup error.",
        "The expected resolver configuration may differ between containers.",
        "A service recreation may have changed its current address."
      ],
      interpretation: [
        "If the service name does not resolve, inspect network attachment, resolver configuration, and the service name.",
        "If the name resolves, verify that the returned address is the intended destination.",
        "Successful resolution does not prove that a TCP connection can be established."
      ],
      nextAction: [
        "Correct the service name or network design if confirmed incorrect.",
        "Avoid hard-coding dynamic container IPs as a permanent workaround."
      ]
    },
    {
      title: "Step 5 — Test TCP reachability",
      purpose:
        "Determine whether a connection can be established independently of HTTP and TLS.",
      commands: [
        "nc -vz -w 3 SERVICE PORT",
        "curl -v --connect-timeout 3 --max-time 10 http://SERVICE:PORT/health"
      ],
      expectedEvidence: [
        "TCP may connect, be refused, or time out.",
        "An HTTP request may return a status code or fail before receiving an HTTP response.",
        "The service may accept connections but respond slowly."
      ],
      interpretation: [
        "Connection refused: verify listener address, port, process health, and intermediate rejection behavior.",
        "Timeout: check routes, firewall rules, destination health, and packet-level evidence.",
        "TCP success with HTTP failure points toward protocol, application, proxy, or request-path behavior."
      ],
      nextAction: [
        "Check the destination listener and selected route.",
        "If needed, compare results from the source container, host, and an authorized external client."
      ]
    },
    {
      title: "Step 6 — Validate port publishing and listener binding",
      purpose:
        "Find incorrect host-to-container port mappings or applications bound to loopback only.",
      commands: [
        "docker port CONTAINER",
        "docker inspect --format '{{json .NetworkSettings.Ports}}' CONTAINER",
        "docker exec CONTAINER sh -c 'ss -lntup || netstat -lntup'",
        "ss -lntup"
      ],
      expectedEvidence: [
        "The application may listen on 127.0.0.1, 0.0.0.0, or a specific interface.",
        "The published host port may map to an unexpected container port.",
        "Host and container listeners may differ."
      ],
      interpretation: [
        "An application bound only to container loopback is generally not reachable through the container's other interfaces.",
        "Host port 8080 mapped to container port 3000 means the application must listen on the appropriate container port.",
        "An internal-only service may not need a host-published port at all."
      ],
      nextAction: [
        "Correct the application bind address or port mapping in the source configuration.",
        "Publish only the ports that are intentionally required."
      ]
    },
    {
      title: "Step 7 — Check routing, firewall, and NAT",
      purpose:
        "Identify where packets are routed, filtered, or translated.",
      commands: [
        "ip route",
        "ip route get DESTINATION_IP",
        "sudo nft list ruleset",
        "sudo iptables -S",
        "sudo iptables -t nat -S"
      ],
      expectedEvidence: [
        "The selected route may use an unexpected interface or gateway.",
        "Firewall rules may block input, forwarding, or traffic to a published port.",
        "NAT and forwarding behavior may differ from the expected configuration."
      ],
      interpretation: [
        "A valid route does not prove that a firewall permits traffic.",
        "Docker's firewall integration varies with platform and configuration.",
        "Cloud security groups and network ACLs are separate from the host firewall."
      ],
      nextAction: [
        "Compare the intended path with read-only firewall and routing evidence.",
        "Ask the host or network owner to review a targeted rule change when required.",
        "Do not flush firewall rules or disable security controls to test a hypothesis."
      ]
    },
    {
      title: "Step 8 — Investigate reverse proxy and load balancer behavior",
      purpose:
        "Separate client-to-proxy connectivity from proxy-to-upstream connectivity.",
      commands: [
        "docker compose logs --timestamps --tail 300 PROXY_SERVICE",
        "docker inspect --format '{{json .NetworkSettings.Networks}}' PROXY_CONTAINER",
        "docker inspect --format '{{json .NetworkSettings.Networks}}' UPSTREAM_CONTAINER",
        "curl -v --connect-timeout 3 --max-time 10 http://UPSTREAM_HOST:PORT/health"
      ],
      expectedEvidence: [
        "Proxy logs may identify upstream resolution failures, connection refusals, timeouts, or TLS errors.",
        "The proxy and upstream may be attached to different networks.",
        "The upstream port or protocol may not match the active configuration."
      ],
      interpretation: [
        "A 502 usually means the proxy could not obtain a valid upstream response; inspect the exact proxy error.",
        "A 504 commonly indicates an upstream timeout, but the precise behavior depends on the proxy.",
        "If direct upstream access works but proxy access fails, compare proxy DNS, route, protocol, TLS, and timeout settings."
      ],
      nextAction: [
        "Verify the actual upstream name, port, protocol, and TLS configuration.",
        "Apply a reviewed proxy or application configuration change through the deployment process."
      ]
    },
    {
      title: "Step 9 — Investigate TLS and application protocol",
      purpose:
        "Identify certificate, hostname, trust, or HTTP/HTTPS mismatches after TCP connectivity succeeds.",
      commands: [
        "curl -v --connect-timeout 3 --max-time 10 https://HOST:PORT/health",
        "openssl s_client -connect HOST:PORT -servername HOSTNAME"
      ],
      expectedEvidence: [
        "The TCP connection may succeed while the TLS handshake fails.",
        "The certificate may be expired, untrusted, or issued for another hostname.",
        "The client and upstream may expect different protocols."
      ],
      interpretation: [
        "TLS failures are not automatically Docker network failures.",
        "A hostname mismatch can occur even when the destination IP is reachable.",
        "Successful TLS negotiation does not guarantee that the application route is healthy."
      ],
      nextAction: [
        "Check the certificate chain, hostname, expiry, trust configuration, and protocol expectations.",
        "Correct the trust or certificate configuration rather than permanently disabling validation."
      ]
    },
    {
      title: "Step 10 — Investigate intermittent failures",
      purpose:
        "Look for resource exhaustion, transient DNS issues, packet loss, MTU problems, and overloaded dependencies.",
      commands: [
        "ss -s",
        "ss -tan state time-wait",
        "ip -s link",
        "docker stats --no-stream",
        "docker events --since 30m"
      ],
      expectedEvidence: [
        "Connection counts may rise sharply or the interface may report packet errors.",
        "Container restarts or dependency latency may align with the failures.",
        "Large requests may fail while small requests succeed."
      ],
      interpretation: [
        "TIME_WAIT alone is not proof of port exhaustion.",
        "A large-packet failure pattern may justify a controlled MTU investigation.",
        "Intermittent DNS or dependency latency can cause application timeouts without a broken bridge network."
      ],
      nextAction: [
        "Correlate the failures with metrics and deployment timestamps.",
        "Use a scoped packet capture or controlled reproduction only when necessary and approved."
      ]
    },
    {
      title: "Step 11 — Correct the verified cause",
      purpose:
        "Apply a targeted fix while protecting other services and preserving a rollback path.",
      commands: [
        "docker network inspect NETWORK",
        "docker compose config --quiet",
        "docker compose ps -a"
      ],
      expectedEvidence: [
        "The expected network, port, service name, and configuration source are known.",
        "The proposed change is linked to the evidence.",
        "The rollback method and impact are documented."
      ],
      interpretation: [
        "A missing network attachment, incorrect listener, wrong port, and firewall block require different fixes.",
        "Recreating an entire network is not a safe default remediation.",
        "Configuration validation does not replace runtime connectivity testing."
      ],
      nextAction: [
        "Test the correction in staging or an approved controlled environment.",
        "Apply the change through the intended source of truth and obtain required production approval."
      ]
    },
    {
      title: "Step 12 — Verify end-to-end recovery",
      purpose:
        "Confirm the real communication path works from client to proxy to service and dependency.",
      commands: [
        "docker ps --no-trunc",
        "docker network inspect NETWORK",
        "curl -v --connect-timeout 3 --max-time 10 http://EXPECTED_HOST:PORT/health",
        "docker compose logs --timestamps --tail 100 SERVICE"
      ],
      expectedEvidence: [
        "DNS, TCP, application requests, and required dependencies work.",
        "Proxy error rates and request latency return to acceptable levels.",
        "No new network or service restart loop appears."
      ],
      interpretation: [
        "A successful test from the host does not prove that an external client can reach the published service.",
        "Test from the actual failing source and along the same network path.",
        "A single successful request is not sufficient to rule out an intermittent problem."
      ],
      nextAction: [
        "Monitor representative requests and network metrics during the agreed observation period.",
        "Record the confirmed root cause and add an automated regression test."
      ]
    }
  ],

  rootCausePlaybooks: [
    {
      cause: "Containers are not attached to a common intended network",
      symptoms: [
        "One container cannot resolve or reach another container by service name.",
        "A dependency works from the host but fails from the application container."
      ],
      evidence: [
        "docker network inspect shows the endpoints are on different networks.",
        "Network design confirms that direct communication should be allowed."
      ],
      diagnosis: [
        "Inspect the networks attached to both containers.",
        "Check the intended Compose service network declarations.",
        "Verify whether the services are expected to communicate directly or through a proxy."
      ],
      remediation: [
        "Correct the network declaration in the source configuration.",
        "Apply the change through the approved deployment workflow.",
        "Avoid connecting unrelated services to a shared network merely to make the error disappear."
      ],
      validation: [
        "The intended service name resolves from the source container.",
        "TCP and application requests succeed on the approved path.",
        "Network isolation requirements remain intact."
      ]
    },
    {
      cause: "Application listens on the wrong interface or port",
      symptoms: [
        "The container is running but connections are refused.",
        "The application works through an internal test but not through the expected network path."
      ],
      evidence: [
        "The listener uses an unexpected port or binds only to loopback.",
        "Published port mapping differs from the application listener."
      ],
      diagnosis: [
        "Inspect the process listener from the relevant namespace.",
        "Compare application configuration, Docker port mapping, and proxy upstream configuration.",
        "Check application startup logs for bind errors."
      ],
      remediation: [
        "Correct the listener interface or configured port.",
        "Update the published port or upstream setting if the mapping is wrong.",
        "Avoid publishing an internal service unnecessarily."
      ],
      validation: [
        "The application listens on the intended interface and port.",
        "The actual client path can establish a connection.",
        "Health checks and real requests succeed."
      ]
    },
    {
      cause: "Docker service-name DNS resolution fails",
      symptoms: [
        "Requests fail with a name-resolution error.",
        "A hard-coded IP may work temporarily while a service name fails."
      ],
      evidence: [
        "getent or nslookup fails from the relevant container.",
        "The service may not be attached to the expected user-defined network.",
        "The requested service name may be incorrect."
      ],
      diagnosis: [
        "Inspect /etc/resolv.conf and network membership.",
        "Check the actual Compose service name and any configured network aliases.",
        "Compare resolution from the source container with another container on the same network."
      ],
      remediation: [
        "Correct the service name, alias, or network attachment.",
        "Review custom DNS configuration if external lookups also fail.",
        "Avoid relying on a container IP that can change after recreation."
      ],
      validation: [
        "The name resolves to the expected current endpoint.",
        "TCP connectivity and the application protocol work.",
        "Service recreation does not require manual IP changes."
      ]
    },
    {
      cause: "Published port or external access failure",
      symptoms: [
        "The service works inside Docker but is unreachable from the host or external client.",
        "A host port is not reachable from the expected network."
      ],
      evidence: [
        "docker port and inspected mappings do not match the intended configuration.",
        "The application may listen on the wrong container port.",
        "Host firewall, cloud security rules, or upstream routing may block the path."
      ],
      diagnosis: [
        "Test the application listener inside the container.",
        "Test the published port from the host.",
        "Test from an authorized external client and review the relevant firewall layers."
      ],
      remediation: [
        "Correct the published port and bind address if necessary.",
        "Request a narrowly scoped firewall or cloud rule change when supported by evidence.",
        "Bind published ports to a specific host address when the intended exposure requires it."
      ],
      validation: [
        "Internal, host-level, and external tests succeed along the required path.",
        "Only intended interfaces and ports are exposed.",
        "Security controls remain enabled."
      ]
    },
    {
      cause: "Host firewall, NAT, or forwarding blocks traffic",
      symptoms: [
        "Name resolution works but connections time out.",
        "Published ports fail after a host security or networking change.",
        "Multiple services may be affected."
      ],
      evidence: [
        "Host route information looks valid but packet filtering or forwarding rules may block traffic.",
        "The incident correlates with a firewall or host configuration change.",
        "Packet capture may show requests without corresponding replies."
      ],
      diagnosis: [
        "Inspect the intended route and read-only firewall rules.",
        "Check the relevant Docker forwarding and NAT behavior for the host platform.",
        "Review cloud security groups, network ACLs, and host firewall rules separately."
      ],
      remediation: [
        "Ask the responsible network or platform owner to apply a targeted rule correction.",
        "Use the approved change process and preserve the previous rule state.",
        "Do not flush firewall rules or disable security controls as a shortcut."
      ],
      validation: [
        "The intended TCP path succeeds.",
        "Unrelated services remain reachable.",
        "The change passes security review and is documented."
      ]
    },
    {
      cause: "Reverse proxy uses the wrong upstream",
      symptoms: [
        "Clients receive HTTP 502 or 504.",
        "The application may be healthy when accessed directly.",
        "Proxy logs mention upstream resolution, connection, or TLS failures."
      ],
      evidence: [
        "The proxy's upstream hostname, port, or protocol differs from the application configuration.",
        "The proxy and upstream may not share the intended network.",
        "Direct and proxy-based requests behave differently."
      ],
      diagnosis: [
        "Read the exact proxy error log.",
        "Test upstream DNS and TCP connectivity from the proxy's network namespace.",
        "Compare the deployed proxy configuration with the intended application listener."
      ],
      remediation: [
        "Correct the upstream name, port, protocol, or network attachment.",
        "Validate the configuration before deployment.",
        "Use a controlled rollout or approved rollback if the change is release-related."
      ],
      validation: [
        "The proxy can reach the intended upstream.",
        "Client requests return the expected application response.",
        "502/504 rates and latency remain within acceptable limits."
      ]
    },
    {
      cause: "TLS certificate or protocol mismatch",
      symptoms: [
        "TCP connections succeed but HTTPS requests fail.",
        "Clients report certificate validation or handshake errors.",
        "A proxy may attempt HTTP against an HTTPS-only upstream or the reverse."
      ],
      evidence: [
        "curl or openssl reports certificate, hostname, trust, or handshake details.",
        "The upstream protocol differs from the proxy configuration.",
        "The error began after a certificate or configuration change."
      ],
      diagnosis: [
        "Check the hostname, certificate chain, expiry, and trust store.",
        "Verify the expected protocol on the actual destination port.",
        "Compare the client, proxy, and upstream TLS settings."
      ],
      remediation: [
        "Correct the certificate, hostname, trust configuration, or protocol mismatch.",
        "Use valid certificate verification in normal operation.",
        "Avoid permanently disabling TLS validation."
      ],
      validation: [
        "The TLS handshake succeeds with certificate validation enabled.",
        "The intended hostname and trust chain are correct.",
        "Application requests succeed over the expected secure path."
      ]
    },
    {
      cause: "Subnet overlap or incorrect routing",
      symptoms: [
        "A container cannot reach a destination across a VPN or corporate network.",
        "Traffic follows an unexpected interface or gateway.",
        "The issue appears after adding a Docker network or changing VPN configuration."
      ],
      evidence: [
        "Docker network subnets overlap with remote or host routes.",
        "ip route get selects an unexpected route.",
        "The failure affects specific destinations rather than all connectivity."
      ],
      diagnosis: [
        "Inspect Docker subnets, host routes, VPN routes, and routing policy.",
        "Compare the selected route from the relevant namespace.",
        "Confirm whether return traffic follows a compatible path."
      ],
      remediation: [
        "Plan non-overlapping address ranges through the network owner.",
        "Correct the authoritative network configuration and recreate affected resources only through an approved migration plan.",
        "Do not modify live routes without documenting a rollback."
      ],
      validation: [
        "The intended route is selected.",
        "Forward and return traffic work.",
        "Other networks and workloads retain connectivity."
      ]
    },
    {
      cause: "MTU or path-MTU problem",
      symptoms: [
        "Small requests work but large requests or TLS transfers stall.",
        "Connections fail intermittently across tunnels or overlay networks.",
        "Packet retransmissions or fragmentation-related symptoms appear."
      ],
      evidence: [
        "The issue correlates with packet size or a tunnel/overlay path.",
        "Interface and packet-level evidence suggests loss or fragmentation problems.",
        "A controlled test shows different behavior for small and large payloads."
      ],
      diagnosis: [
        "Inspect interface MTUs and the actual network path.",
        "Use authorized packet captures to investigate retransmissions or relevant ICMP messages.",
        "Reproduce with safe test payloads in a controlled environment."
      ],
      remediation: [
        "Correct the MTU or tunnel configuration through the network owner's approved process.",
        "Avoid arbitrary host-wide MTU changes.",
        "Verify the full path, including encapsulation and remote interfaces."
      ],
      validation: [
        "Small and representative large requests succeed.",
        "Retransmission and timeout patterns improve.",
        "Unrelated network paths remain healthy."
      ]
    },
    {
      cause: "Connection, socket, or conntrack exhaustion",
      symptoms: [
        "Intermittent connection failures occur under load.",
        "Connection counts rise or new connections fail while existing ones may continue.",
        "Applications show many retries or long-lived connections."
      ],
      evidence: [
        "Socket state, file-descriptor usage, process metrics, or conntrack metrics indicate pressure.",
        "The failure correlates with traffic volume or connection churn.",
        "TIME_WAIT or established connection counts may be elevated."
      ],
      diagnosis: [
        "Inspect socket state and application connection-pool behavior.",
        "Check process-specific file-descriptor limits and actual usage.",
        "Inspect conntrack capacity only when the host uses and exposes that subsystem."
      ],
      remediation: [
        "Correct connection leaks, unbounded retries, and inefficient connection reuse.",
        "Tune pool size and timeouts according to the application's load and dependency capacity.",
        "Change kernel resource limits only after measured evidence and an approved capacity review."
      ],
      validation: [
        "Connection counts stabilize under representative load.",
        "New connections succeed and latency remains acceptable.",
        "Resource exhaustion alerts no longer recur."
      ]
    },
    {
      cause: "External DNS or dependency connectivity failure",
      symptoms: [
        "Container-to-container requests work but external hostname lookups or requests fail.",
        "Applications show dependency timeouts or repeated DNS errors.",
        "Multiple containers may share the same external resolution problem."
      ],
      evidence: [
        "External hostname lookup fails or returns an unexpected address.",
        "Direct access to a verified address may behave differently from name-based access.",
        "Host resolver, upstream DNS, route, or remote dependency health may be implicated."
      ],
      diagnosis: [
        "Separate DNS lookup from TCP connectivity and application response.",
        "Check resolver configuration, outbound routes, and relevant egress policy.",
        "Correlate failures with DNS service and dependency monitoring."
      ],
      remediation: [
        "Correct the resolver, egress policy, route, or dependency configuration that the evidence identifies.",
        "Use bounded retries and backoff instead of uncontrolled retry loops.",
        "Avoid replacing DNS with a permanent hard-coded IP unless the architecture explicitly requires it."
      ],
      validation: [
        "External names resolve consistently.",
        "The dependency can be reached using the intended protocol.",
        "Retries and error rates return to normal."
      ]
    },
    {
      cause: "Overlay or cross-host networking failure",
      symptoms: [
        "Containers on the same host communicate but cross-host requests fail.",
        "Only overlay-connected services are affected.",
        "A host, firewall, or orchestrator change precedes the failure."
      ],
      evidence: [
        "The network uses an overlay driver or an orchestrator-managed network.",
        "Cross-host routes, encapsulation, required firewall ports, or control-plane status may be incorrect.",
        "Local and cross-host tests differ."
      ],
      diagnosis: [
        "Confirm the orchestrator and network driver.",
        "Inspect platform-specific overlay status, node health, routes, and firewall policy.",
        "Check the documented port and protocol requirements for the exact deployment mode."
      ],
      remediation: [
        "Engage the platform/network owner for cross-host changes.",
        "Correct the specific route, firewall, or overlay configuration.",
        "Do not apply standalone bridge-network assumptions to an overlay."
      ],
      validation: [
        "Cross-host service discovery and connectivity work.",
        "All intended nodes can exchange traffic.",
        "The fix survives the approved rollout or node replacement process."
      ]
    }
  ],

  networkConcepts: [
    {
      name: "Connection refused",
      explanation:
        "The connection attempt was actively refused or rejected along the path. This commonly happens when no process listens on the destination port, but a proxy or firewall can also reject connections.",
      troubleshootingUse:
        "Verify the destination listener, port mapping, service state, and intermediate rejection behavior."
    },
    {
      name: "Connection timed out",
      explanation:
        "No acceptable response arrived within the timeout. A timeout does not identify a single root cause.",
      troubleshootingUse:
        "Inspect routing, filtering, destination health, packet loss, dependency latency, and return-path behavior."
    },
    {
      name: "Temporary failure in name resolution",
      explanation:
        "The name lookup did not complete successfully. The cause may involve service discovery, resolver configuration, DNS availability, or the requested name.",
      troubleshootingUse:
        "Test name resolution from the actual source container and verify its network membership and resolver."
    },
    {
      name: "HTTP 502",
      explanation:
        "A gateway or proxy could not obtain a valid upstream response according to its behavior.",
      troubleshootingUse:
        "Inspect proxy logs and test upstream DNS, TCP, protocol, TLS, and application health."
    },
    {
      name: "HTTP 504",
      explanation:
        "A gateway or proxy timed out waiting for an upstream response in the relevant request path.",
      troubleshootingUse:
        "Investigate upstream latency, network delay, dependency health, and timeout configuration. Do not merely increase timeouts without understanding the delay."
    },
    {
      name: "DNS works but TCP fails",
      explanation:
        "The name resolves, but that does not prove the destination port is listening or reachable.",
      troubleshootingUse:
        "Test the destination port and inspect the route, firewall, listener, and network path."
    },
    {
      name: "TCP works but TLS fails",
      explanation:
        "The transport connection succeeds but secure session negotiation or validation does not.",
      troubleshootingUse:
        "Inspect certificate trust, hostname, expiry, protocol settings, and TLS configuration."
    },
    {
      name: "Host can connect but container cannot",
      explanation:
        "The host and container may use different DNS settings, routes, namespaces, and firewall paths.",
      troubleshootingUse:
        "Repeat the diagnostic from the source container's network namespace and compare the results."
    },
    {
      name: "Container can connect but external client cannot",
      explanation:
        "The internal service path may work while host publishing, external routing, or ingress policy is incorrect.",
      troubleshootingUse:
        "Check published ports, bind address, host firewall, cloud security controls, load balancer, and return path."
    }
  ],

  decisionTree: [
    {
      symptom: "Service name cannot be resolved",
      evidence:
        "getent/nslookup output, resolver configuration, network membership",
      likelyCause:
        "Incorrect service name, missing network attachment, or DNS resolver issue",
      nextAction:
        "Verify the actual service name and network. Fix DNS or network configuration only after confirming the source of failure."
    },
    {
      symptom: "Connection refused",
      evidence:
        "Destination listener, actual port, port mapping, application logs",
      likelyCause:
        "Wrong port, no listener, wrong bind address, or active rejection",
      nextAction:
        "Confirm the application listener and port mapping before changing routes or firewall rules."
    },
    {
      symptom: "Connection times out",
      evidence:
        "Routes, firewall rules, packet capture, destination health, dependency latency",
      likelyCause:
        "Packet filtering, missing route, packet loss, overload, or no timely response",
      nextAction:
        "Test the path in stages and locate where the request or response stops."
    },
    {
      symptom: "HTTP 502 from a reverse proxy",
      evidence:
        "Proxy error log, upstream name, port, protocol, direct upstream request",
      likelyCause:
        "Upstream connection, name resolution, TLS, or response failure",
      nextAction:
        "Test proxy-to-upstream connectivity and correct the verified upstream configuration."
    },
    {
      symptom: "HTTPS fails after TCP succeeds",
      evidence:
        "curl verbose output, openssl handshake details, certificate chain",
      likelyCause:
        "Certificate, hostname, trust, or protocol mismatch",
      nextAction:
        "Correct the TLS configuration and keep certificate validation enabled."
    },
    {
      symptom: "Only large requests fail",
      evidence:
        "Payload size correlation, interface MTU, packet retransmissions",
      likelyCause:
        "Possible MTU/path-MTU issue or application/proxy size constraints",
      nextAction:
        "Separate packet-path problems from application request-size limits using controlled tests."
    },
    {
      symptom: "Intermittent connection failures under load",
      evidence:
        "Socket counts, file descriptors, connection pools, host metrics, request rate",
      likelyCause:
        "Resource exhaustion, overload, retry storms, or transient dependency problems",
      nextAction:
        "Correlate metrics and tune the confirmed bottleneck; do not treat TIME_WAIT alone as proof."
    },
    {
      symptom: "Several services fail after a host networking change",
      evidence:
        "Docker events, route changes, firewall rules, host interface metrics",
      likelyCause:
        "Shared host route, firewall, forwarding, or runtime networking problem",
      nextAction:
        "Declare the correct incident severity, preserve evidence, and involve the platform/network owner."
    }
  ],

  recoveryWorkflow: [
    {
      phase: "1. Detect and acknowledge",
      actions: [
        "Acknowledge the alert and identify the incident owner.",
        "Identify affected endpoints, services, dependencies, and customer impact.",
        "Determine whether the issue is isolated to one container or shared infrastructure."
      ],
      successCriteria: [
        "Incident severity and blast radius are recorded.",
        "The failing source-to-destination path is known."
      ]
    },
    {
      phase: "2. Preserve evidence",
      actions: [
        "Record container IDs, image digests, network IDs, IPs, port mappings, and deployment revision.",
        "Capture timestamped application, proxy, Docker, and platform logs.",
        "Record DNS, TCP, TLS, and HTTP test results separately.",
        "Capture relevant routes, firewall evidence, and packet metrics before making changes."
      ],
      successCriteria: [
        "The initial state is documented.",
        "Evidence is preserved without exposing credentials or unnecessary payload data."
      ]
    },
    {
      phase: "3. Isolate the failing layer",
      actions: [
        "Check application health and listener configuration.",
        "Check network membership and DNS resolution.",
        "Test TCP reachability and the actual application protocol.",
        "Inspect routing, firewall, NAT, proxy, and TLS only where the evidence indicates they are relevant."
      ],
      successCriteria: [
        "The failure is narrowed to a specific layer or configuration boundary.",
        "The root-cause hypothesis is supported by observable evidence."
      ]
    },
    {
      phase: "4. Select a controlled mitigation",
      actions: [
        "Choose the smallest correction that restores the intended path.",
        "Check the blast radius of network, firewall, routing, or proxy changes.",
        "Obtain required production approval.",
        "Document rollback instructions and the expected validation result."
      ],
      successCriteria: [
        "The change addresses a verified cause.",
        "A safe rollback and owner are identified."
      ]
    },
    {
      phase: "5. Recover and validate",
      actions: [
        "Apply the change through the correct source of truth.",
        "Test from the actual source container or client path.",
        "Validate DNS, TCP, TLS, HTTP, and dependency behavior as applicable.",
        "Monitor request latency, error rates, logs, and connection behavior."
      ],
      successCriteria: [
        "The required end-to-end path succeeds.",
        "Service-level metrics recover and remain stable during the observation window."
      ]
    },
    {
      phase: "6. Close and prevent recurrence",
      actions: [
        "Confirm recovery with the service owner.",
        "Document the verified cause and impact.",
        "Add automated network or application connectivity checks.",
        "Update configuration validation, monitoring, and the runbook."
      ],
      successCriteria: [
        "The incident is closed with evidence.",
        "Preventive actions have owners and deadlines."
      ]
    }
  ],

  prevention: [
    {
      area: "Network design",
      practices: [
        "Use deliberate user-defined networks and explicit service boundaries.",
        "Document which services are allowed to communicate.",
        "Choose non-overlapping Docker subnets compatible with VPN and corporate networks.",
        "Avoid unnecessary public port publishing.",
        "Understand the differences between bridge, host, and overlay networking."
      ]
    },
    {
      area: "Application configuration",
      practices: [
        "Use service names or supported service discovery instead of hard-coded container IPs.",
        "Bind the application to the intended interface.",
        "Keep the application port, Docker mapping, and proxy upstream consistent.",
        "Use bounded retries, exponential backoff, and connection timeouts.",
        "Implement health checks that test meaningful application readiness."
      ]
    },
    {
      area: "Security",
      practices: [
        "Expose only required ports and interfaces.",
        "Use least-privilege firewall and network policies.",
        "Keep TLS certificate validation enabled.",
        "Redact secrets from logs and packet captures.",
        "Review network changes before production rollout."
      ]
    },
    {
      area: "CI/CD and configuration",
      practices: [
        "Validate Compose and proxy configuration in CI.",
        "Add integration tests that resolve service names and call actual service endpoints.",
        "Run a staged rollout with a rollback plan.",
        "Store network and firewall configuration in the appropriate source of truth.",
        "Detect configuration drift and unexpected changes."
      ]
    },
    {
      area: "Observability",
      practices: [
        "Monitor DNS errors, connection failures, HTTP 5xx responses, latency, and upstream health.",
        "Collect relevant host interface, connection, and Docker lifecycle metrics.",
        "Correlate network incidents with deployments and configuration changes.",
        "Keep timestamped logs across container replacement.",
        "Use alerts that distinguish broad outages from a single dependency failure."
      ]
    }
  ],

  commonMistakes: [
    {
      mistake: "Using ping as the only connectivity test",
      whyItFails:
        "ICMP reachability does not prove that the application port, TLS session, or HTTP route works. ICMP may also be blocked while TCP remains available.",
      betterApproach:
        "Test DNS, TCP, TLS, and the application endpoint independently."
    },
    {
      mistake: "Using a container IP as a permanent fix",
      whyItFails:
        "Container addresses may change after recreation or deployment.",
      betterApproach:
        "Use the intended service name or service-discovery mechanism."
    },
    {
      mistake: "Assuming a running container is reachable",
      whyItFails:
        "The application may not be listening, may use the wrong port, or may be unhealthy.",
      betterApproach:
        "Inspect the listener, application logs, network path, and actual endpoint."
    },
    {
      mistake: "Publishing every service port",
      whyItFails:
        "It unnecessarily exposes internal services and can increase attack surface.",
      betterApproach:
        "Publish only ports required by the intended client path and apply appropriate access controls."
    },
    {
      mistake: "Disabling the firewall to test connectivity",
      whyItFails:
        "It can expose services and affect unrelated workloads.",
      betterApproach:
        "Inspect rules read-only and request a narrow, approved change if evidence supports it."
    },
    {
      mistake: "Recreating a Docker network immediately",
      whyItFails:
        "It can disconnect several containers and cause an outage without correcting the actual cause.",
      betterApproach:
        "Inspect network membership, routes, and configuration before planning a controlled change."
    },
    {
      mistake: "Treating every 502 as a Docker DNS issue",
      whyItFails:
        "The upstream may be refusing connections, speaking the wrong protocol, failing TLS, or responding too slowly.",
      betterApproach:
        "Read the proxy error and test the exact upstream path."
    },
    {
      mistake: "Permanently using curl -k",
      whyItFails:
        "It disables certificate validation and can hide a security problem.",
      betterApproach:
        "Use it only as a limited diagnostic when appropriate, then correct the certificate or trust configuration."
    },
    {
      mistake: "Changing MTU without evidence",
      whyItFails:
        "An arbitrary MTU change can affect unrelated paths and introduce new network problems.",
      betterApproach:
        "Reproduce the packet-size-dependent failure and confirm the path before changing MTU."
    },
    {
      mistake: "Increasing timeouts without diagnosing latency",
      whyItFails:
        "It may hide a slow dependency and increase in-flight requests, resource use, and retry pressure.",
      betterApproach:
        "Find the slow layer and set timeouts according to measured service behavior."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Incident title: Docker Networking / Connectivity Failure",
    "Environment / region / host / cluster:",
    "Affected service, container IDs, and image digests:",
    "Source and destination:",
    "Protocol, hostname, port, and expected path:",
    "Severity and incident owner:",
    "Detection time / acknowledgement time / recovery time:",
    "Customer impact and affected endpoints:",
    "Exact error: DNS / refused / timeout / TLS / HTTP / other:",
    "Docker context and network IDs:",
    "Network driver, subnets, routes, and port mappings:",
    "Application listener and health status:",
    "Proxy and load-balancer evidence:",
    "Firewall, cloud network, and routing evidence:",
    "Recent deployment or network changes:",
    "Verified root cause and supporting evidence:",
    "Mitigation and production approval:",
    "Rollback plan and rollback result:",
    "End-to-end recovery tests:",
    "Error-rate and latency verification:",
    "Security review and exposed-port verification:",
    "Preventive actions / owners / deadlines:",
    "Runbook and monitoring updates:",
    "Incident closure approved by:"
  ],

  productionRunbook: [
    {
      phase: "Detect and acknowledge",
      checklist: [
        "Acknowledge the alert and assign an incident owner.",
        "Identify the exact source, destination, port, protocol, and customer impact.",
        "Determine whether the failure is local, cross-host, or external.",
        "Check whether the issue began after a deployment or network change."
      ]
    },
    {
      phase: "Collect evidence",
      checklist: [
        "Verify the Docker context, environment, container IDs, and image digests.",
        "Capture network membership, DNS output, published ports, and application listener information.",
        "Collect application, proxy, Docker, and relevant host logs.",
        "Record route and firewall evidence without modifying the system.",
        "Redact secrets and sensitive network data before sharing."
      ]
    },
    {
      phase: "Isolate root cause",
      checklist: [
        "Check application health before assuming a network failure.",
        "Test DNS, TCP, TLS, and HTTP independently.",
        "Inspect routing, firewall, proxy, and host resource evidence as needed.",
        "Compare current configuration with the approved source of truth.",
        "Confirm the root cause with evidence before changing shared infrastructure."
      ]
    },
    {
      phase: "Mitigate and recover",
      checklist: [
        "Choose the smallest targeted correction.",
        "Assess the blast radius of shared network, firewall, and routing changes.",
        "Obtain required production approval.",
        "Apply the correction through the appropriate deployment or infrastructure workflow.",
        "Test from the actual failing source path.",
        "Monitor service errors, latency, and network behavior."
      ]
    },
    {
      phase: "Close and prevent recurrence",
      checklist: [
        "Confirm end-to-end recovery with the service owner.",
        "Verify that only intended ports are exposed.",
        "Document the timeline, evidence, and verified root cause.",
        "Add automated connectivity and configuration checks.",
        "Assign preventive actions and update the runbook."
      ]
    }
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Inspect Docker bridge networking",
      objective:
        "Understand how containers attach to a user-defined bridge and discover one another.",
      steps: [
        "Create an isolated test network: docker network create net-lab",
        "Start a test web container: docker run -d --name web-lab --network net-lab nginx:alpine",
        "Inspect the network: docker network inspect net-lab",
        "Run a temporary diagnostic container: docker run --rm --network net-lab busybox nslookup web-lab",
        "Clean up the lab containers and network only after confirming that the names refer to these test resources."
      ],
      expectedFinding:
        "The diagnostic container can resolve the web-lab name on the user-defined network when the required image and network setup are available.",
      solution: [
        "Compare network membership and service names when resolution fails.",
        "Do not infer that a successful DNS lookup guarantees HTTP connectivity.",
        "Keep the lab isolated from production networks."
      ]
    },
    {
      title: "Lab 2 — Diagnose a wrong published port",
      objective:
        "Separate a container listener from the host port mapping.",
      steps: [
        "Start a disposable web container with a known published port.",
        "Inspect the mapping using docker port CONTAINER.",
        "Test the expected host port using curl.",
        "Inspect the container's listening port and compare it with the mapping.",
        "Correct the test configuration and repeat the request."
      ],
      expectedFinding:
        "A mapping that points to the wrong container port can prevent the intended request from reaching the application.",
      solution: [
        "Make the host-to-container mapping consistent with the application listener.",
        "Verify the listener's bind address.",
        "Do not expose the test service publicly unless required."
      ]
    },
    {
      title: "Lab 3 — Separate DNS from TCP",
      objective:
        "Identify whether a failure happens during name resolution or connection establishment.",
      steps: [
        "From a disposable source container, resolve the target service name.",
        "Record the resolved address.",
        "Test TCP connectivity to the expected port.",
        "Make an HTTP request if TCP succeeds.",
        "Compare each result with application logs."
      ],
      expectedFinding:
        "DNS success, TCP success, and HTTP success are different stages. Each can fail independently.",
      solution: [
        "Fix the first failing stage supported by evidence.",
        "Use the actual source network namespace.",
        "Avoid replacing service discovery with hard-coded IP addresses."
      ]
    },
    {
      title: "Lab 4 — Investigate a reverse proxy 502",
      objective:
        "Trace a client request from proxy to upstream.",
      steps: [
        "Inspect the proxy's error logs.",
        "Record the configured upstream hostname, port, and protocol.",
        "Test upstream name resolution and TCP connectivity from the proxy's network.",
        "Call the upstream health endpoint directly in the lab.",
        "Correct a deliberately mismatched test upstream setting and verify recovery."
      ],
      expectedFinding:
        "A 502 can result from an upstream connection, protocol, or response problem even when the proxy container is running.",
      solution: [
        "Use the exact proxy error to narrow the investigation.",
        "Validate the upstream settings before rollout.",
        "Test both direct upstream access and the full client-to-proxy path."
      ]
    },
    {
      title: "Lab 5 — Explore TLS validation failures",
      objective:
        "Distinguish TCP connectivity from certificate and TLS problems.",
      steps: [
        "Use a test HTTPS endpoint with a known certificate configuration.",
        "Inspect the connection using curl -v and openssl s_client.",
        "Check the hostname, certificate chain, expiry, and trust configuration.",
        "Correct the test certificate or trust settings.",
        "Verify the connection with normal certificate validation enabled."
      ],
      expectedFinding:
        "TCP can succeed while the TLS handshake or certificate validation fails.",
      solution: [
        "Correct the actual certificate or trust problem.",
        "Do not leave certificate validation disabled.",
        "Keep test certificates and keys isolated from production."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is the difference between Docker bridge and host networking?",
      answer:
        "Bridge networking gives the container its own network namespace and connects it through a Docker-managed bridge. Host networking uses the host network namespace on supported platforms, changing isolation and port behavior.",
      followUp:
        "What are the security and port-conflict implications of host networking?"
    },
    {
      question: "Why can two containers fail to communicate even when both are running?",
      answer:
        "They may be on different networks, use the wrong service name or port, have an unhealthy application listener, or encounter a routing or firewall problem.",
      followUp:
        "Which commands would you use to inspect their network attachments?"
    },
    {
      question: "What is the difference between connection refused and connection timed out?",
      answer:
        "Refused generally means the attempt was actively rejected. A timeout means no acceptable response arrived in time. Neither error alone identifies the complete root cause.",
      followUp:
        "How would your diagnostic sequence differ for each?"
    },
    {
      question: "Why should applications use service names instead of container IP addresses?",
      answer:
        "Container IPs can change after recreation. Supported service discovery allows applications to locate the current service endpoint without hard-coding a transient address.",
      followUp:
        "How does Docker name resolution behave on a user-defined bridge?"
    },
    {
      question: "What would you check if a container can access an IP but not a hostname?",
      answer:
        "I would inspect resolver configuration, service-name correctness, DNS availability, and network attachment. I would then separate DNS failure from TCP and application failures.",
      followUp:
        "How would you test DNS from the actual source container?"
    },
    {
      question: "Why does publishing a port not guarantee application access?",
      answer:
        "The mapping can point to the wrong container port, the application may not listen, it may bind only to loopback, or a firewall or external network rule may block the request.",
      followUp:
        "How do you verify the mapping and the actual listener?"
    },
    {
      question: "How would you troubleshoot HTTP 502 from NGINX or another reverse proxy?",
      answer:
        "I would inspect the exact proxy error, verify the upstream name, port, protocol, TLS settings, network attachment, and test direct upstream connectivity from the proxy's network namespace.",
      followUp:
        "What additional evidence would distinguish an upstream timeout from connection refusal?"
    },
    {
      question: "What is the role of Docker DNS?",
      answer:
        "Docker provides service or container name resolution on supported user-defined networks. External DNS forwarding and resolver configuration are also relevant for external hostnames.",
      followUp:
        "Why can DNS resolution succeed while the application remains unreachable?"
    },
    {
      question: "How do you investigate a Docker networking issue after deployment?",
      answer:
        "I correlate the incident with the release revision, inspect the active image and network configuration, test the actual request path in stages, and compare the deployed settings with the approved source of truth.",
      followUp:
        "When would you choose rollback instead of a forward fix?"
    },
    {
      question: "How can MTU issues appear in production?",
      answer:
        "Some small packets may work while larger transfers stall because of packet-size, encapsulation, or path-MTU problems. This must be confirmed with controlled tests and network evidence.",
      followUp:
        "Why is an arbitrary MTU change risky?"
    },
    {
      question: "How do firewall and NAT rules affect Docker published ports?",
      answer:
        "The host's filtering, forwarding, and translation behavior can determine whether traffic reaches a container. The exact implementation depends on the Docker host and firewall backend.",
      followUp:
        "Why should you inspect rules before modifying them?"
    },
    {
      question: "How do you distinguish DNS, TCP, TLS, and HTTP failures?",
      answer:
        "I test each layer separately: resolve the name, establish TCP, negotiate TLS if required, and then make the application request. Each stage provides different evidence.",
      followUp:
        "What does it mean when TCP succeeds but TLS fails?"
    },
    {
      question: "What would you investigate if connectivity fails only under load?",
      answer:
        "I would correlate failures with connection counts, file descriptors, application pools, host resources, retries, dependency latency, and packet metrics. TIME_WAIT alone is not proof of exhaustion.",
      followUp:
        "How would you identify whether the bottleneck is in the client or server?"
    },
    {
      question: "How do you validate a production network fix?",
      answer:
        "I test from the actual failing source, verify the full required protocol path, observe service-level metrics, check the blast radius, and document recovery evidence.",
      followUp:
        "Why is a successful curl from the Docker host not enough?"
    },
    {
      question: "How do you prevent Docker networking incidents?",
      answer:
        "I use deliberate network boundaries, service discovery, configuration validation, least-privilege exposure, staged deployment, end-to-end connectivity tests, and monitoring for DNS errors, timeouts, and proxy failures.",
      followUp:
        "Which connectivity checks would you automate in CI/CD?"
    }
  ],

  references: [
    {
      title: "Docker — Networking overview",
      url: "https://docs.docker.com/engine/network/"
    },
    {
      title: "Docker — Bridge network driver",
      url: "https://docs.docker.com/engine/network/drivers/bridge/"
    },
    {
      title: "Docker — Port publishing and mapping",
      url: "https://docs.docker.com/engine/network/port-publishing/"
    },
    {
      title: "Docker — Networking tutorials",
      url: "https://docs.docker.com/engine/network/tutorials/"
    },
    {
      title: "Docker Compose — Networking",
      url: "https://docs.docker.com/compose/how-tos/networking/"
    },
    {
      title: "Linux iproute2 — ip command manual",
      url: "https://man7.org/linux/man-pages/man8/ip.8.html"
    },
    {
      title: "Linux — ss command manual",
      url: "https://man7.org/linux/man-pages/man8/ss.8.html"
    },
    {
      title: "curl — Manual",
      url: "https://curl.se/docs/manpage.html"
    },
    {
      title: "OpenSSL — s_client documentation",
      url: "https://docs.openssl.org/master/man1/openssl-s_client/"
    },
    {
      title: "Kubernetes — Debugging DNS resolution",
      url: "https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/"
    }
  ]
} satisfies DockerNetworkingGuide;

export default dockerNetworkingGuide;
