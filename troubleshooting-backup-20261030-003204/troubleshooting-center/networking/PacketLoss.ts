
export const packetLossGuide = {
  title: "Packet Loss - Real Production Troubleshooting",
  filePath: "app/troubleshooting-center/networking/PacketLoss.ts",
  category: "Networking",
  difficulty: "Advanced",
  estimatedTime: "30-120 minutes depending on incident scope",

  overview: {
    problem:
      "Packets are lost, delayed, retransmitted, or dropped between a client, server, network device, cloud workload, or application endpoint.",
    objective:
      "Locate the loss domain, distinguish actual drops from ICMP rate limiting or endpoint behavior, prove the root cause with evidence, recover safely, and prevent recurrence.",
    keyPrinciples: [
      "Ping loss alone does not prove that production application traffic is being dropped.",
      "Compare measurements from multiple points along the same path.",
      "Compare counter deltas over time instead of relying only on lifetime counters.",
      "Separate packet loss, latency, jitter, TCP retransmissions, and application timeouts.",
      "Capture evidence before restarting services, resetting counters, or changing network configuration.",
      "Use one controlled change at a time and validate the actual business transaction."
    ],
    terminology: [
      {
        term: "Packet loss",
        meaning:
          "A transmitted packet fails to reach the expected receiving point."
      },
      {
        term: "TCP retransmission",
        meaning:
          "TCP retransmits data when delivery is not acknowledged as expected. Congestion, reordering, receiver behavior, and path issues can contribute."
      },
      {
        term: "Interface drops",
        meaning:
          "Packets are discarded at a particular interface or processing stage; the counter's meaning depends on the driver and platform."
      },
      {
        term: "ICMP rate limiting",
        meaning:
          "A device may limit ping replies even when ordinary application traffic continues to work."
      },
      {
        term: "Jitter",
        meaning:
          "Variation in packet delay; especially relevant to real-time voice, video, and interactive applications."
      },
      {
        term: "Asymmetric routing",
        meaning:
          "Forward and return traffic use different paths, so a capture on one path may not show both directions."
      }
    ]
  },

  productionIncident: {
    scenario:
      "An e-commerce API begins returning intermittent 502 responses. Monitoring reports 3-8% ICMP loss between application nodes and the database subnet. TCP retransmissions increase, but the database process remains healthy.",
    timeline: [
      "T+00: Alert fires for elevated API errors and network retransmissions.",
      "T+03: On-call engineer checks customer impact, affected regions, hosts, and recent changes.",
      "T+05: Engineer compares application health, TCP behavior, and packet loss from multiple observation points.",
      "T+10: Host interface counters, route selection, CPU pressure, and NIC/driver evidence are collected.",
      "T+20: Network, cloud, or platform teams compare switch, virtual network, and provider telemetry.",
      "T+30: Evidence identifies the affected hop or processing layer.",
      "Recovery: Apply the smallest approved corrective action and validate the real application transaction.",
      "After recovery: Monitor recurrence, restore redundancy, and document root cause and prevention."
    ],
    impactQuestions: [
      "Which application endpoints, hosts, regions, availability zones, or subnets are affected?",
      "Does loss occur in both directions or only one direction?",
      "Is the problem continuous, periodic, or correlated with traffic peaks?",
      "Are customer requests failing, or is only ICMP monitoring reporting loss?",
      "Are TCP retransmissions, connection resets, latency, or application timeouts increasing?",
      "Did a deployment, routing change, firewall update, NIC change, backup, batch job, or autoscaling event occur?",
      "Is redundant connectivity available, and is failover functioning?"
    ]
  },

  severity: [
    {
      level: "SEV-1",
      criteria:
        "Critical production traffic is failing across a major service or region, with no viable alternate path.",
      response:
        "Declare an incident, coordinate application/network/cloud owners, preserve evidence, and follow the approved failover procedure."
    },
    {
      level: "SEV-2",
      criteria:
        "Persistent loss degrades a production dependency, causes timeouts, or removes network redundancy.",
      response:
        "Start coordinated investigation, compare telemetry across layers, and prepare a tested recovery."
    },
    {
      level: "SEV-3",
      criteria:
        "Intermittent loss affects a limited workload without immediate critical impact.",
      response:
        "Collect time-correlated evidence, investigate under change control, and track remediation."
    }
  ],

  safetyChecks: [
    "Confirm the source host, destination, environment, route, interface, and expected protocol/port.",
    "Record the incident start time, last known-good time, and recent changes.",
    "Confirm whether troubleshooting traffic itself is permitted by security policy.",
    "Do not flood a production endpoint with high-rate ping, iperf, or packet-generation tests.",
    "Do not run an unapproved throughput test on a production link; it can worsen congestion.",
    "Avoid changing MTU, NIC offloads, congestion control, queue lengths, firewall rules, or routes without evidence.",
    "Do not restart network services or reboot a host as the first response.",
    "Keep packet captures short, filtered, access-controlled, and stored according to data retention policy.",
    "Do not expose packet payloads, authentication headers, tokens, or sensitive customer data.",
    "Confirm console access and rollback options before changing the management network.",
    "Use approved destinations and ports; do not scan unrelated systems.",
    "If the issue affects a router, firewall, storage network, Kubernetes node, or cluster heartbeat, follow its specific runbook."
  ],

  evidenceCollection: {
    incidentMetadata: [
      "date -Is",
      "hostnamectl",
      "uptime",
      "ip -br link",
      "ip -br address"
    ],
    interfaceCounters: [
      "ip -s link show dev <IFACE>",
      "ethtool <IFACE>",
      "ethtool -S <IFACE>",
      "cat /proc/net/softnet_stat"
    ],
    cpuAndResources: [
      "vmstat 1 5",
      "mpstat -P ALL 1 5",
      "sar -n DEV 1 5",
      "ss -s"
    ],
    routingAndNeighborState: [
      "ip route show table all",
      "ip rule show",
      "ip neigh show",
      "ip route get <DESTINATION_IP>"
    ],
    tcpAndApplication: [
      "ss -ti",
      "ss -s",
      "curl -sS -o /dev/null -w 'http=%{http_code} connect=%{time_connect} total=%{time_total}\\n' --connect-timeout 3 https://<TARGET_HOST>/health"
    ],
    kernelAndServiceLogs: [
      "journalctl -k --since '-30 min' --no-pager",
      "journalctl --since '-30 min' --no-pager",
      "systemctl --failed"
    ],
    packetCapture: [
      "sudo tcpdump -ni <IFACE> -c 200 host <DESTINATION_IP>",
      "sudo tcpdump -ni <IFACE> -c 200 'icmp or arp'",
      "sudo tcpdump -ni <IFACE> -s 128 -c 200 'host <DESTINATION_IP> and tcp port <PORT>'"
    ],
    evidenceRules: [
      "Capture timestamp, hostname, interface, command, and output.",
      "Take two counter snapshots separated by a short interval.",
      "Compare before/after values rather than assuming a high cumulative counter means the current incident.",
      "Synchronize timestamps across host, cloud, firewall, switch, and application logs.",
      "Record tool version and capture filter where packet-level evidence is used.",
      "Protect packet captures as sensitive operational data."
    ]
  },

  diagnosticSequence: [
    {
      step: 1,
      name: "Confirm whether production traffic is actually impacted",
      actions: [
        "Check service-level indicators: error rate, latency percentiles, request volume, and timeout counts.",
        "Run a low-rate, approved health check against the affected endpoint.",
        "Compare ICMP monitoring with TCP connection success and the real application transaction.",
        "Check whether the issue affects all clients or only one source network."
      ],
      decision:
        "If application transactions are healthy and only ping replies are missing, investigate ICMP filtering or rate limiting before declaring a data-plane outage.",
      commands: [
        "ping -c 20 -i 0.2 <DESTINATION_IP>",
        "curl -v --connect-timeout 3 https://<TARGET_HOST>/health",
        "nc -vz -w 3 <DESTINATION_IP> <PORT>"
      ],
      caution:
        "Use a lower probe rate if production policy requires it. ICMP results are not equivalent to TCP or application success."
    },
    {
      step: 2,
      name: "Establish a baseline and map the path",
      actions: [
        "Identify source IP, destination IP, protocol, port, interface, gateway, and expected path.",
        "Check whether traffic crosses NAT, VPN, overlay networking, a load balancer, or a firewall.",
        "Compare an affected host with a healthy host using the same destination and test window.",
        "Record the last known-good configuration and relevant change events."
      ],
      commands: [
        "ip route get <DESTINATION_IP>",
        "ip route show table all",
        "ip rule show",
        "ip neigh show"
      ],
      decision:
        "A different route, source IP, or network namespace can explain why two apparently similar hosts behave differently."
    },
    {
      step: 3,
      name: "Check host interface drops and errors",
      actions: [
        "Collect interface RX/TX packets, errors, dropped packets, overruns, and carrier-related counters.",
        "Take a second sample and calculate which counters are increasing.",
        "Inspect driver-specific counters for ring exhaustion, missed packets, or hardware errors.",
        "Compare the host counters with switch-port or virtual NIC counters."
      ],
      commands: [
        "ip -s link show dev <IFACE>",
        "ethtool -S <IFACE>",
        "ethtool <IFACE>",
        "sar -n DEV 1 5"
      ],
      decision:
        "Increasing RX drops may indicate receive-path pressure, driver or hardware issues, or other local processing limits. TX drops and errors need interpretation using the driver and platform documentation.",
      caution:
        "Counter names and meanings vary by driver. Do not reset counters before collecting evidence."
    },
    {
      step: 4,
      name: "Check CPU pressure and kernel networking backlog",
      actions: [
        "Look for CPU saturation, softirq pressure, memory pressure, and bursts of network traffic.",
        "Inspect /proc/net/softnet_stat across samples and use kernel documentation to interpret fields.",
        "Check whether packet drops align with application pauses, VM steal time, or scheduled workloads.",
        "Check socket and listen queues if application symptoms point to host processing."
      ],
      commands: [
        "vmstat 1 5",
        "mpstat -P ALL 1 5",
        "sar -n DEV 1 5",
        "cat /proc/net/softnet_stat",
        "ss -s",
        "ss -lnt"
      ],
      decision:
        "If loss coincides with CPU/softirq pressure or queue exhaustion, investigate capacity and packet-processing load before changing NIC or kernel tuning.",
      caution:
        "Do not increase kernel buffers or backlog limits blindly; larger queues may increase latency and conceal the real bottleneck."
    },
    {
      step: 5,
      name: "Check congestion and interface saturation",
      actions: [
        "Compare bytes per second and packets per second against link capacity.",
        "Look for traffic bursts, queue drops, microbursts, retransmissions, and application throughput changes.",
        "Check both host and switch/provider telemetry where available.",
        "Use an approved throughput test only in a controlled window or isolated environment."
      ],
      commands: [
        "sar -n DEV 1 10",
        "ip -s link show dev <IFACE>",
        "ethtool -S <IFACE>"
      ],
      decision:
        "A low average utilization value does not exclude short microbursts. Ask for queue-level telemetry when drops appear without sustained saturation."
    },
    {
      step: 6,
      name: "Inspect routing, neighbor discovery, and path changes",
      actions: [
        "Check route selection, policy rules, source address, gateway reachability, and neighbor state.",
        "Use tracepath or traceroute as supporting evidence, not as definitive proof of the exact loss location.",
        "Compare forward and return paths with the network team.",
        "Check whether a route change, VPN tunnel, NAT session expiry, or failover occurred."
      ],
      commands: [
        "ip route get <DESTINATION_IP>",
        "ip route show table all",
        "ip rule show",
        "ip neigh show",
        "tracepath <DESTINATION_IP>"
      ],
      decision:
        "A hop that fails to respond to traceroute probes may simply filter those probes. Confirm loss using endpoint traffic, counters, and captures."
    },
    {
      step: 7,
      name: "Check MTU and fragmentation symptoms",
      actions: [
        "Compare interface MTU, tunnel overhead, and expected path MTU.",
        "Check whether small requests succeed but large responses or uploads fail.",
        "Inspect ICMP fragmentation-needed or Packet Too Big messages where relevant.",
        "Use approved, size-controlled tests; do not reduce MTU as a speculative first fix."
      ],
      commands: [
        "ip link show dev <IFACE>",
        "tracepath <DESTINATION_IP>",
        "ping -c 3 -M do -s <PAYLOAD_SIZE> <DESTINATION_IP>"
      ],
      notes: [
        "The -M do option is Linux ping behavior and may not be available on every platform.",
        "For IPv4 ICMP, the IP packet size includes the IP header, ICMP header, and payload; for IPv6, header and extension behavior differs.",
        "Choose payload sizes appropriate to the path and account for encapsulation."
      ]
    },
    {
      step: 8,
      name: "Inspect TCP retransmissions and connection behavior",
      actions: [
        "Compare TCP retransmission indicators with application timeouts and network counter deltas.",
        "Inspect socket state, RTT, congestion window, and retransmission information where the kernel exposes them.",
        "Compare SYN/SYN-ACK behavior and packet timing in a short capture.",
        "Check whether a load balancer, firewall, NAT, or remote host is resetting or expiring sessions."
      ],
      commands: [
        "ss -ti",
        "ss -s",
        "sudo tcpdump -ni <IFACE> -s 128 -c 200 'host <DESTINATION_IP> and tcp port <PORT>'"
      ],
      decision:
        "Retransmissions indicate that acknowledgments or data are not being observed as expected; they do not independently prove a physical network fault."
    },
    {
      step: 9,
      name: "Capture packets at the correct observation points",
      actions: [
        "Capture a short, filtered sample at the source and destination where possible.",
        "Synchronize clocks and compare packet direction, sequence numbers, timestamps, and retransmission behavior.",
        "Ask network teams for firewall, load-balancer, switch, or cloud-side captures and counters.",
        "Consider asymmetric routing and capture limitations before interpreting missing packets."
      ],
      commands: [
        "sudo tcpdump -ni <IFACE> -c 200 host <DESTINATION_IP>",
        "sudo tcpdump -ni <IFACE> -s 128 -c 200 'host <DESTINATION_IP> and tcp port <PORT>'"
      ],
      interpretation: [
        "Packet seen leaving source but absent at destination: narrow the investigation to the intervening path, subject to capture-point limitations.",
        "Packet reaches destination but no expected response is sent: investigate destination stack, firewall, socket, CPU pressure, or application.",
        "Response leaves destination but is absent at source: investigate return routing, intermediate policy, NAT, or asymmetric paths.",
        "Packet visible in a host capture is not absolute proof that it reached the physical wire; offloads and capture placement can affect interpretation."
      ],
      caution:
        "Packet captures may contain sensitive payloads. Use strict filters, limited capture sizes, access controls, and approved retention."
    },
    {
      step: 10,
      name: "Inspect firewall, load balancer, cloud, and overlay layers",
      actions: [
        "Check security groups, ACLs, host firewall counters, load-balancer health, NAT/session limits, and connection tracking.",
        "Check cloud NIC metrics, route tables, flow logs, and provider service health.",
        "For Kubernetes, inspect CNI health, node conditions, pod events, and overlay/tunnel paths.",
        "For virtual machines, compare guest counters with hypervisor virtual-switch and physical-uplink telemetry."
      ],
      commands: [
        "nft list ruleset",
        "sudo conntrack -S",
        "kubectl get nodes -o wide",
        "kubectl get pods -A -o wide"
      ],
      caution:
        "Some commands require elevated privileges or optional tools. Collect read-only evidence first and follow platform-specific runbooks."
    },
    {
      step: 11,
      name: "Correlate all evidence and isolate the cause",
      actions: [
        "Align application errors, retransmissions, interface counters, kernel logs, cloud metrics, and network events by timestamp.",
        "Compare affected and unaffected hosts, paths, zones, and time windows.",
        "State which hop or layer is proven faulty and which hypotheses remain unconfirmed.",
        "Escalate with exact timestamps, source/destination, protocol/port, captures, and counter deltas."
      ],
      output:
        "A documented root-cause hypothesis supported by evidence, a confidence level, and a specific recovery action."
    },
    {
      step: 12,
      name: "Apply controlled recovery and validate",
      actions: [
        "Choose a fix that targets the confirmed cause, not merely the symptom.",
        "Obtain change approval and preserve the original configuration.",
        "Use a canary, redundant path, or limited rollout where possible.",
        "Validate with the same tests that demonstrated the original failure.",
        "Monitor application error rate, latency, retransmissions, drops, and redundancy during the agreed observation period."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Ping loss but application is healthy",
      likelyCauses: [
        "ICMP rate limiting",
        "Control-plane policing",
        "Probe destination behavior"
      ],
      confirmation:
        "Compare TCP/application health and monitoring from another vantage point."
    },
    {
      symptom: "RX drops increase on one host",
      likelyCauses: [
        "NIC/driver receive issues",
        "CPU or softirq pressure",
        "Receive queue exhaustion",
        "Virtual NIC or host-side drops"
      ],
      confirmation:
        "Driver-specific counters, softnet statistics, CPU data, and hypervisor/switch telemetry."
    },
    {
      symptom: "Loss appears during peak traffic",
      likelyCauses: [
        "Congestion",
        "Queue overflow",
        "Microbursts",
        "Capacity bottleneck"
      ],
      confirmation:
        "Time-correlated throughput, queue drops, interface counters, and traffic patterns."
    },
    {
      symptom: "Small packets work but large transfers stall",
      likelyCauses: [
        "MTU mismatch",
        "Path MTU discovery failure",
        "Tunnel overhead mismatch"
      ],
      confirmation:
        "Controlled packet-size tests, tracepath, and packet captures."
    },
    {
      symptom: "TCP retransmissions increase but interface counters look clean",
      likelyCauses: [
        "Intermediate network loss",
        "Remote endpoint pressure",
        "Asymmetric path",
        "Firewall/NAT state issues",
        "Capture/counter blind spots"
      ],
      confirmation:
        "Compare source and destination captures with network-device and application telemetry."
    },
    {
      symptom: "One subnet or availability zone is affected",
      likelyCauses: [
        "Route change",
        "Subnet ACL/security rule",
        "Zone-specific infrastructure issue",
        "Switch/uplink failure"
      ],
      confirmation:
        "Compare a healthy path, effective routes, provider events, and network device counters."
    },
    {
      symptom: "UDP or real-time traffic suffers but TCP looks acceptable",
      likelyCauses: [
        "Queue drops",
        "Jitter",
        "Traffic prioritization/QoS",
        "Receiver processing limitations"
      ],
      confirmation:
        "Application-level sequence/loss metrics, jitter measurements, queue counters, and synchronized captures."
    },
    {
      symptom: "Loss happens after idle periods",
      likelyCauses: [
        "NAT or firewall session expiry",
        "Idle connection handling",
        "Stale connection reuse",
        "Remote service behavior"
      ],
      confirmation:
        "Compare connection age, resets, first-packet behavior, and middlebox session logs."
    }
  ],

  recoveryPlaybook: [
    {
      condition: "Confirmed local resource or queue pressure",
      actions: [
        "Identify the saturated CPU, queue, socket, or resource.",
        "Reduce unnecessary traffic or restore capacity through an approved method.",
        "Validate whether drops and retransmissions decline after the change."
      ],
      avoid:
        "Blindly increasing buffer sizes or disabling offloads without measurements."
    },
    {
      condition: "Confirmed congested link",
      actions: [
        "Reduce nonessential traffic or shift load through an approved alternate path.",
        "Verify QoS and queue configuration with the network owner.",
        "Plan capacity expansion if sustained utilization or burst behavior exceeds design."
      ],
      avoid:
        "Running aggressive throughput tests during the outage or changing QoS policies without coordination."
    },
    {
      condition: "Confirmed MTU mismatch",
      actions: [
        "Correct the inconsistent MTU or tunnel configuration at the appropriate layer.",
        "Validate large and small transfers, both directions, and all relevant encapsulation paths.",
        "Record the original configuration and rollback."
      ],
      avoid:
        "Changing the MTU globally when only one tunnel or path is affected."
    },
    {
      condition: "Confirmed bad route or security policy",
      actions: [
        "Restore the last known-good route or rule using the supported management plane.",
        "Validate forward and return paths.",
        "Check for unintended impact on other workloads."
      ],
      avoid:
        "Flushing all routes, disabling the firewall, or opening broad network access."
    },
    {
      condition: "Confirmed physical or provider-side loss",
      actions: [
        "Open a network/datacenter/cloud-provider incident with timestamps and counter evidence.",
        "Use an approved redundant path if available.",
        "Track provider resolution and verify recovery independently."
      ],
      avoid:
        "Repeatedly restarting guest networking when the evidence points to an upstream fault."
    },
    {
      condition: "Confirmed remote application or receiver pressure",
      actions: [
        "Check receiver CPU, socket queues, application logs, and service limits.",
        "Scale or tune the receiver only after confirming the bottleneck.",
        "Validate the client transaction and server-side processing."
      ],
      avoid:
        "Blaming the network solely because client-side timeouts or retransmissions increased."
    }
  ],

  platformSpecificChecks: {
    linux: [
      "Compare ip -s link, ethtool -S, /proc/net/softnet_stat, CPU pressure, and ss -ti.",
      "Check driver/firmware messages in journalctl -k.",
      "Use tcpdump with a narrow filter and limited capture count.",
      "Check nftables or the platform's active firewall manager without flushing rules."
    ],
    windows: [
      "Inspect Get-NetAdapter and Get-NetAdapterStatistics.",
      "Use pktmon to capture packet behavior and local drop reasons.",
      "Use a short, approved netsh trace only when ordinary evidence is insufficient.",
      "Compare NIC counters with Windows performance counters and application errors."
    ],
    aws: [
      "Check EC2 instance status checks, ENI metrics where available, VPC route tables, security groups, and network ACLs.",
      "Use VPC Flow Logs and supported network diagnostics to compare accepted/rejected flows and path behavior.",
      "Remember that flow logs are not a packet-by-packet capture and have platform-specific visibility limits."
    ],
    azure: [
      "Check VM/NIC health, effective routes, NSG rules, and Network Watcher diagnostics.",
      "Use IP Flow Verify and Next Hop where appropriate.",
      "Use filtered Network Watcher packet capture for packet-level evidence and stop captures after the required window."
    ],
    gcp: [
      "Check VM interface metrics, VPC routes, firewall policy, and relevant network telemetry.",
      "Use Connectivity Tests where supported.",
      "Compare guest OS counters with cloud-side evidence and application metrics."
    ],
    kubernetes: [
      "Check kubectl get nodes -o wide and kubectl get pods -A -o wide.",
      "Inspect pod events, CNI health, node conditions, and relevant overlay interfaces.",
      "Compare pod-to-pod, pod-to-service, and node-to-external traffic independently.",
      "Do not delete CNI interfaces or restart all networking agents without a cluster-specific recovery plan."
    ],
    loadBalancersAndFirewalls: [
      "Check backend health, connection resets, session table pressure, packet-drop counters, and policy logs.",
      "Compare front-end and back-end connection metrics.",
      "Verify idle timeouts, NAT port allocation, and return-path symmetry where relevant.",
      "Do not disable production firewall rules as a diagnostic shortcut."
    ]
  },

  monitoringAndPrevention: {
    metrics: [
      "Interface RX/TX errors and drops",
      "TCP retransmissions and connection resets",
      "Packet loss and latency from multiple vantage points",
      "Application request error rate and latency percentiles",
      "Network throughput and packet rate",
      "CPU, softirq, socket queue, and memory pressure",
      "Cloud network metrics and flow-log findings",
      "Load-balancer backend health and connection failures",
      "Route changes, interface flaps, and provider events"
    ],
    alertingGuidance: [
      "Alert on sustained, service-relevant loss rather than one isolated ping failure.",
      "Set thresholds using service SLOs and measured baseline behavior.",
      "Separate ICMP probe failures from TCP and application health.",
      "Use independent probes from more than one network location.",
      "Correlate packet loss with retransmissions and application symptoms."
    ],
    preventiveActions: [
      "Capacity-plan for peak traffic and bursts, not only average bandwidth.",
      "Maintain supported NIC drivers and firmware.",
      "Test MTU and failover behavior after network changes.",
      "Review QoS and queueing for latency-sensitive workloads.",
      "Keep network changes version-controlled with staged rollout and rollback.",
      "Run regular incident exercises for provider, path, and host-level loss.",
      "Document capture filters, retention, access controls, and evidence handling."
    ]
  },

  incidentReportTemplate: {
    incidentId: "",
    detectedAt: "",
    lastKnownGoodAt: "",
    recoveredAt: "",
    environment: "",
    sourceAndDestination: "",
    protocolAndPort: "",
    affectedServices: [],
    customerImpact: "",
    severity: "",
    packetLossObserved: "",
    testMethodAndVantagePoints: [],
    interfaceCounterDeltas: [],
    tcpRetransmissionEvidence: "",
    latencyAndJitterEvidence: "",
    packetCaptureReferences: [],
    cloudNetworkEvidence: [],
    recentChanges: [],
    confirmedRootCause: "",
    contributingFactors: [],
    recoveryActions: [],
    rollbackPerformed: false,
    validationResults: [],
    preventionTasks: [],
    ownersAndDueDates: [],
    lessonsLearned: ""
  },

  handsOnLabs: [
    {
      name: "Lab 1 - Establish a low-rate baseline",
      environment: "Test VM or approved test endpoint",
      commands: [
        "ping -c 20 <DESTINATION_IP>",
        "ip route get <DESTINATION_IP>",
        "ip -s link show dev <IFACE>"
      ],
      objective:
        "Record baseline reachability, route selection, and interface counters without changing configuration."
    },
    {
      name: "Lab 2 - Compare counter deltas",
      environment: "Non-production Linux host",
      commands: [
        "ip -s link show dev <IFACE>",
        "sleep 10",
        "ip -s link show dev <IFACE>",
        "ethtool -S <IFACE>"
      ],
      objective:
        "Distinguish historical cumulative errors from counters that are increasing during the observation window."
    },
    {
      name: "Lab 3 - Capture a small traffic sample",
      environment: "Authorized test endpoint",
      commands: [
        "sudo tcpdump -ni <IFACE> -c 100 'host <DESTINATION_IP>'"
      ],
      objective:
        "Practice capturing a limited sample and matching packet timestamps to an application test.",
      warning:
        "Use a test environment or approved production capture procedure; protect the resulting file if payloads are captured."
    },
    {
      name: "Lab 4 - Compare small and large packets",
      environment: "Test network that permits the required probes",
      commands: [
        "tracepath <DESTINATION_IP>",
        "ping -c 3 -M do -s <PAYLOAD_SIZE> <DESTINATION_IP>"
      ],
      objective:
        "Investigate possible path MTU problems while accounting for headers, encapsulation, and platform-specific command support."
    },
    {
      name: "Lab 5 - Correlate loss with application health",
      environment: "Non-production application",
      commands: [
        "curl -sS -o /dev/null -w 'http=%{http_code} connect=%{time_connect} total=%{time_total}\\n' --connect-timeout 3 https://<TARGET_HOST>/health",
        "ss -ti",
        "ip -s link show dev <IFACE>"
      ],
      objective:
        "Compare application behavior, TCP indicators, and interface counters instead of treating ping as the only signal."
    }
  ],

  interviewQuestions: [
    {
      question: "Ping-lo 5% loss undi ante network fault confirm aa?",
      expectedAnswer:
        "Kaadu. ICMP rate limiting, endpoint response behavior, or probe-path differences undavachu. TCP/application metrics and multiple vantage points tho confirm cheyyali."
    },
    {
      question: "Interface RX drops perugutunnayi. Next em check chesthav?",
      expectedAnswer:
        "Driver-specific counters, CPU/softirq pressure, queue exhaustion, host virtualization, and switch/provider counters-ni same time window-lo compare chestha."
    },
    {
      question: "TCP retransmissions enduku peruguthayi?",
      expectedAnswer:
        "Packet loss, congestion, reordering, delayed acknowledgments, or endpoint/path behavior valla peragavachu. Retransmission okkate physical network failure proof kaadu."
    },
    {
      question: "Source capture-lo packet undi, destination capture-lo ledu. Meaning enti?",
      expectedAnswer:
        "Intermediate path loss possibility undi, kani capture placement, offloads, asymmetric routing, and timestamps verify chesaka next hop-ni isolate cheyyali."
    },
    {
      question: "Small requests work, large uploads fail. Em investigate chesthav?",
      expectedAnswer:
        "Path MTU, tunnel overhead, blocked ICMP Packet Too Big/fragmentation-needed messages, and packet captures investigate chestha."
    },
    {
      question: "Production-lo iperf3 run cheyyacha?",
      expectedAnswer:
        "Approval lekunda high-throughput test run cheyyanu. Itself congestion create cheyyachu; controlled test environment or agreed maintenance window use chestha."
    },
    {
      question: "How do you confirm recovery?",
      expectedAnswer:
        "Original failure test repeat chesi, application health, loss, latency, retransmissions, interface counters, and redundancy agreed observation period varaku monitor chestha."
    }
  ],

  finalChecklist: [
    "Customer and service impact confirmed",
    "Source, destination, protocol, port, and path documented",
    "ICMP results compared with TCP and application health",
    "Baseline and last known-good time recorded",
    "Interface counter deltas collected",
    "CPU, softirq, socket, and queue pressure reviewed",
    "Routes, neighbors, MTU, and return path checked",
    "Packet captures are filtered, short, and securely stored",
    "Firewall, load balancer, cloud, and overlay layers investigated",
    "Root cause supported by correlated evidence",
    "Smallest approved fix applied with rollback",
    "Application transactions and network metrics validated",
    "Redundancy restored and alerts reviewed",
    "Incident report and prevention owners assigned"
  ],

  references: [
    {
      title: "Linux ping manual",
      url: "https://man7.org/linux/man-pages/man8/ping.8.html"
    },
    {
      title: "Linux ip-link manual",
      url: "https://man7.org/linux/man-pages/man8/ip-link.8.html"
    },
    {
      title: "Linux tcpdump manual",
      url: "https://man7.org/linux/man-pages/man8/tcpdump.8.html"
    },
    {
      title: "Linux ss manual",
      url: "https://man7.org/linux/man-pages/man8/ss.8.html"
    },
    {
      title: "Linux kernel networking documentation",
      url: "https://docs.kernel.org/networking/"
    },
    {
      title: "Microsoft - Diagnose Packet Loss",
      url: "https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/diagnose-packet-loss"
    },
    {
      title: "Azure Network Watcher packet capture",
      url: "https://learn.microsoft.com/en-us/azure/network-watcher/packet-capture-overview"
    },
    {
      title: "AWS VPC troubleshooting",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/"
    },
    {
      title: "Kubernetes debugging applications",
      url: "https://kubernetes.io/docs/tasks/debug/"
    }
  ]
} as const;

export default packetLossGuide;
