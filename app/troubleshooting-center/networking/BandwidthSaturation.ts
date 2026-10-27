
export const bandwidthSaturationGuide = {
  title: "Network Bandwidth Saturation",
  technology: "Linux Networking, TCP/IP, Cloud Networking",
  category: "Networking",
  severity: "High",
  summary:
    "Diagnose network throughput saturation, packet drops, microbursts, " +
    "interface congestion, cloud bandwidth limits, and downstream bottlenecks.",

  incidentScenario: {
    title: "Production traffic saturates a network link",
    symptoms: [
      "API latency increases during peak traffic.",
      "Application requests time out intermittently.",
      "Deployment pipelines cannot download artifacts or container images.",
      "File transfers become unexpectedly slow.",
      "TCP retransmissions and packet drops increase.",
      "Network interfaces approach their configured throughput limit.",
      "One VM, pod, node, or network path is slower than others.",
      "Cloud networking metrics report bandwidth or packet-per-second allowance drops.",
      "Average bandwidth looks normal, but short bursts still cause packet loss."
    ],
    businessImpact: [
      "Customer-facing APIs may violate latency SLOs.",
      "CI/CD pipelines and release delivery may be delayed.",
      "Database replication and inter-service traffic may lag.",
      "Requests may queue, time out, and trigger retries.",
      "Retries can amplify traffic and create cascading failures.",
      "Cross-zone and internet egress costs may increase."
    ],
    firstQuestions: [
      "Is ingress, egress, or both directions saturated?",
      "Which host, interface, subnet, route, or network hop is affected?",
      "Is the issue continuous or a short-lived traffic burst?",
      "Is bandwidth high, or is packets-per-second capacity the bottleneck?",
      "Are packet drops, TCP retransmissions, or interface errors increasing?",
      "Is one application generating the traffic or is traffic distributed?",
      "Is the bottleneck on the source, destination, link, firewall, NAT, or cloud instance?",
      "Did a deployment, backup, image pull, data transfer, or traffic shift happen recently?",
      "Are all users affected or only a particular region, route, or service?"
    ]
  },

  severityAndImpact: {
    guidance: [
      {
        severity: "SEV-1",
        condition:
          "Critical production traffic is broadly unavailable or a network bottleneck is causing widespread outage."
      },
      {
        severity: "SEV-2",
        condition:
          "A critical service has sustained packet loss, severe latency, or throughput degradation."
      },
      {
        severity: "SEV-3",
        condition:
          "One service, node, or environment is degraded with an approved workaround."
      },
      {
        severity: "SEV-4",
        condition:
          "Capacity is approaching a threshold but customer impact remains limited."
      }
    ],
    assessImpact: [
      "Identify affected services, customers, regions, and environments.",
      "Check latency percentiles, error rate, throughput, and saturation.",
      "Determine whether deployments or database replication are delayed.",
      "Check whether the bottleneck affects shared infrastructure.",
      "Estimate whether the incident is increasing egress cost or retry volume."
    ],
    note:
      "Use the organization's incident policy and SLOs. High utilization alone does not prove an incident if performance and packet delivery remain healthy."
  },

  safetyChecks: [
    "Confirm the affected host, network interface, route, region, and environment.",
    "Identify whether the network is physical, virtual, containerized, or cloud-managed.",
    "Capture baseline metrics before changing configuration.",
    "Obtain approval before modifying routes, MTU, QoS, firewall rules, shaping, or interface settings.",
    "Do not run uncontrolled throughput tests on production links.",
    "Use iperf3 only between authorized endpoints with a bounded test duration and rate.",
    "Do not capture application payloads unnecessarily; packet captures can contain sensitive information.",
    "Use least privilege and redact IP addresses or customer data where required.",
    "Do not disable firewalls, security groups, TLS, or network policies to improve throughput.",
    "Do not increase MTU without verifying every relevant hop supports the path MTU.",
    "Do not restart network interfaces or change routes remotely without out-of-band access or a rollback plan.",
    "Do not assume a cloud VM can achieve its advertised maximum bandwidth in every traffic pattern.",
    "Avoid packet-capture filters that omit the traffic needed to diagnose the actual issue."
  ],

  evidenceCollection: {
    collect: [
      "Incident start time, timezone, and last known healthy time.",
      "Source and destination IPs, ports, protocol, and network path.",
      "Ingress and egress bytes per second and packets per second.",
      "Interface capacity, link speed, duplex, and negotiated settings where applicable.",
      "Interface RX/TX errors, drops, overruns, and missed packets.",
      "TCP retransmissions, RTT, congestion window, and connection state.",
      "CPU, softirq, memory, NIC queues, and application-level throughput.",
      "Switch port, firewall, load balancer, NAT, and router metrics.",
      "Cloud instance network allowance and packet-per-second metrics.",
      "Flow logs and top talkers where available.",
      "Recent deployments, backups, replication changes, and traffic shifts.",
      "Latency percentiles, request rate, errors, and queue depth."
    ],
    commands: [
      {
        purpose: "Identify interfaces and IP addresses",
        command: "ip -br address",
        interpretation:
          "Find the actual interface and assigned addresses before collecting per-interface metrics."
      },
      {
        purpose: "Inspect link counters",
        command: "ip -s -s link show dev eth0",
        interpretation:
          "Inspect RX/TX bytes, packets, errors, and drops. Replace eth0 with the actual interface."
      },
      {
        purpose: "Measure traffic over time",
        command: "sar -n DEV 1 10",
        interpretation:
          "Shows per-interface traffic samples when sysstat is installed. Compare samples during the incident rather than relying on a single counter."
      },
      {
        purpose: "Inspect negotiated link settings",
        command: "ethtool eth0",
        interpretation:
          "On supported physical or virtual interfaces, inspect speed, duplex, and link status. Cloud virtual NICs may not expose meaningful physical-link speed."
      },
      {
        purpose: "Inspect driver and hardware counters",
        command: "ethtool -S eth0",
        interpretation:
          "Counter names vary by driver. Compare before-and-after deltas and focus on counters increasing during the incident."
      },
      {
        purpose: "Inspect TCP and IP statistics",
        command: "nstat -az",
        interpretation:
          "Capture TCP retransmission and protocol counters. Take repeated snapshots to distinguish historical totals from incident-time increases."
      },
      {
        purpose: "Inspect active connections",
        command: "ss -s",
        interpretation:
          "Summarizes socket states. A high connection count may indicate workload pressure but does not prove bandwidth saturation."
      },
      {
        purpose: "Identify routes",
        command: "ip route get 203.0.113.10",
        interpretation:
          "Replace the documentation-only destination IP with the real authorized target. Shows the selected route and source address."
      },
      {
        purpose: "Inspect socket memory and TCP state",
        command: "ss -tin",
        interpretation:
          "Inspect available per-socket TCP details, including retransmission and RTT information where supported."
      },
      {
        purpose: "Inspect CPU and softirq pressure",
        command: "mpstat -P ALL 1 5",
        interpretation:
          "Requires sysstat. High CPU or softirq load can limit packet processing even when the physical link is not fully utilized."
      },
      {
        purpose: "Observe top network flows",
        command: "sudo iftop -i eth0 -n -P",
        interpretation:
          "Requires iftop and suitable privileges. Use a brief, approved observation window; encrypted payloads are not decoded by this tool."
      },
      {
        purpose: "Inspect traffic by process",
        command: "sudo nethogs eth0",
        interpretation:
          "Where supported, helps identify process-level network use. Containerized and virtual networking can complicate process attribution."
      }
    ],
    rateCalculation: {
      formula:
        "Mbps = (delta_bytes * 8) / elapsed_seconds / 1,000,000",
      example:
        "If an interface transmits 125,000,000 additional bytes in 10 seconds, its average transmit rate is 100 Mbps.",
      cautions: [
        "Calculate rates from counter deltas, not lifetime cumulative totals.",
        "Use the same interface and direction for both samples.",
        "Account for sampling intervals and counter resets.",
        "Compare application throughput with interface throughput because protocol overhead and unrelated traffic differ."
      ]
    }
  },

  diagnosticSequence: [
    {
      step: 1,
      title: "Confirm user impact and traffic direction",
      actions: [
        "Capture the affected service, source, destination, and time window.",
        "Compare request latency, errors, throughput, and saturation.",
        "Identify whether RX, TX, or both directions are affected.",
        "Check whether the incident is regional, host-specific, or service-wide.",
        "Compare a healthy endpoint or path when available."
      ],
      decisions: [
        {
          if: "Latency and errors increase across many services.",
          then:
            "Investigate shared network infrastructure, routers, firewalls, NAT, gateways, and upstream links."
        },
        {
          if: "Only one host or pod is affected.",
          then:
            "Investigate its NIC, CPU, queues, container networking, and workload."
        },
        {
          if: "Only one destination or route is affected.",
          then:
            "Investigate that path, destination capacity, routing, and intermediate network devices."
        },
        {
          if: "Bandwidth is high but service latency remains healthy.",
          then:
            "Check headroom and burst patterns before declaring a customer-impacting incident."
        }
      ]
    },
    {
      step: 2,
      title: "Establish actual bandwidth and PPS utilization",
      actions: [
        "Identify the interface's effective capacity and applicable cloud limits.",
        "Sample RX/TX byte rates and packet rates over the incident window.",
        "Compare sustained utilization with configured link or instance limits.",
        "Check both average and short-duration peak measurements.",
        "Inspect packets per second, not only bits per second."
      ],
      decisions: [
        {
          if: "Traffic is close to the known capacity for a sustained period.",
          then:
            "Identify top traffic sources and evaluate approved traffic reduction, shaping, or capacity expansion."
        },
        {
          if: "Average traffic is low but drops or allowance counters increase.",
          then:
            "Investigate microbursts, packet-per-second limits, and measurement granularity."
        },
        {
          if: "Traffic is below capacity and drops are absent.",
          then:
            "Investigate latency, CPU, packet processing, TCP behavior, and downstream bottlenecks."
        }
      ],
      caution:
        "Cloud bandwidth limits may be per instance, per flow, per direction, or subject to packet-rate limits. Verify the exact platform and machine type."
    },
    {
      step: 3,
      title: "Inspect interface errors and drops",
      actions: [
        "Capture ip -s -s link output twice with a known interval.",
        "Compare RX errors, TX errors, RX drops, TX drops, overruns, and missed packets.",
        "Inspect driver-specific ethtool counters where available.",
        "Check switch-port errors, discards, queue drops, and link events.",
        "Correlate counter changes with latency and throughput."
      ],
      decisions: [
        {
          if: "CRC, framing, or physical-link errors increase.",
          then:
            "Engage the network or hardware owner to inspect cable, optics, transceiver, port, and negotiated settings."
        },
        {
          if: "RX missed or overrun counters increase.",
          then:
            "Investigate receive-queue pressure, CPU/softirq load, burst traffic, and NIC resource constraints."
        },
        {
          if: "TX queue drops increase.",
          then:
            "Inspect egress congestion, qdisc behavior, queue limits, and downstream capacity."
        },
        {
          if: "Host counters are clean but service metrics show loss.",
          then:
            "Inspect upstream devices, firewall drops, load balancers, virtual switches, and cloud network telemetry."
        }
      ],
      caution:
        "Counters can have driver-specific meanings. Increasing deltas during the incident are more useful than a nonzero lifetime total."
    },
    {
      step: 4,
      title: "Identify top talkers and unexpected traffic",
      actions: [
        "Use approved flow logs, interface monitors, or short-lived flow inspection.",
        "Identify high-volume source/destination pairs and ports.",
        "Correlate traffic with backups, replication, artifact pulls, container image downloads, and bulk exports.",
        "Check whether traffic shifted to a single node after a deployment or failover.",
        "Verify whether an unexpected process or workload is consuming the bandwidth."
      ],
      decisions: [
        {
          if: "One legitimate workload dominates traffic.",
          then:
            "Assess scheduling, concurrency, transfer windows, caching, and traffic shaping."
        },
        {
          if: "Unexpected or unauthorized traffic is present.",
          then:
            "Follow the security incident process and preserve relevant evidence before containment."
        },
        {
          if: "Traffic is distributed across many sources.",
          then:
            "Inspect aggregate link capacity, shared egress, fan-in/fan-out patterns, and downstream chokepoints."
        }
      ],
      caution:
        "Do not terminate processes or block IPs solely because they are high-volume. Confirm ownership and business purpose first."
    },
    {
      step: 5,
      title: "Check TCP retransmissions and latency",
      actions: [
        "Take repeated nstat snapshots during the incident.",
        "Inspect ss -tin for affected TCP connections.",
        "Measure latency and loss to the specific destination.",
        "Compare sender-side and receiver-side observations where authorized.",
        "Inspect application timeout rates and connection reuse."
      ],
      exampleCommands: [
        "nstat -az",
        "ss -tin",
        "ping -c 10 <destination>",
        "tracepath <destination>"
      ],
      decisions: [
        {
          if: "Retransmissions rise with packet loss.",
          then:
            "Investigate congestion, drops, path issues, and receiver capacity."
        },
        {
          if: "RTT rises while drops remain low.",
          then:
            "Investigate queueing delay, route changes, distance, and downstream processing latency."
        },
        {
          if: "Ping succeeds but application traffic fails.",
          then:
            "Check the actual TCP port, TLS handshake, firewall policy, and application endpoint. ICMP success does not prove application connectivity."
        }
      ],
      caution:
        "Do not interpret a cumulative retransmission counter as an incident-specific rate without a baseline and elapsed time."
    },
    {
      step: 6,
      title: "Investigate microbursts and queue saturation",
      actions: [
        "Compare high-resolution interface and queue telemetry where available.",
        "Inspect NIC RX/TX queue drops and driver-specific counters.",
        "Inspect switch egress queue drops and buffer telemetry.",
        "Compare sub-minute monitoring with one-minute cloud averages.",
        "Check whether many sources send bursts toward one receiver or link."
      ],
      decisions: [
        {
          if: "Short spikes correlate with drops but average bandwidth is moderate.",
          then:
            "Investigate microbursts and use higher-resolution queue or provider metrics."
        },
        {
          if: "Many ingress flows converge on one egress interface.",
          then:
            "Investigate fan-in congestion, egress shaping, and downstream capacity."
        },
        {
          if: "No burst or queue evidence is found.",
          then:
            "Continue with host CPU, PPS limits, firewall, routing, and application-level checks."
        }
      ],
      caution:
        "Ordinary one-minute averages can hide very short bursts. Use available high-resolution telemetry rather than inferring that bursts definitely occurred."
    },
    {
      step: 7,
      title: "Check CPU, softirq, and NIC processing",
      actions: [
        "Inspect per-core CPU and softirq utilization.",
        "Check whether one CPU core is saturated while other cores remain idle.",
        "Inspect NIC queue counts, interrupt distribution, and driver counters.",
        "Review container CPU limits and host scheduling pressure.",
        "Check packet-processing features and offload settings without changing them during initial diagnosis."
      ],
      decisions: [
        {
          if: "CPU or softirq saturation coincides with drops.",
          then:
            "Investigate packet-processing capacity, queue distribution, workload placement, and supported driver settings."
        },
        {
          if: "CPU is healthy but the interface is saturated.",
          then:
            "Focus on link capacity, traffic demand, shaping, and upstream/downstream congestion."
        },
        {
          if: "One queue or core is disproportionately busy.",
          then:
            "Inspect RSS/queue distribution and workload flow patterns with the network platform owner."
        }
      ]
    },
    {
      step: 8,
      title: "Inspect routing, MTU, and path behavior",
      actions: [
        "Check the selected route and source address.",
        "Compare the route from affected and healthy hosts.",
        "Inspect interface MTU and any tunnel or overlay encapsulation.",
        "Use tracepath or approved path diagnostics to investigate path MTU.",
        "Check for route changes, asymmetric paths, and network policy changes."
      ],
      decisions: [
        {
          if: "Path MTU discovery indicates a mismatch.",
          then:
            "Correct the verified MTU or path configuration across the relevant path using a tested change plan."
        },
        {
          if: "Routes differ unexpectedly.",
          then:
            "Review routing tables, policy routing, gateway health, and recent network changes."
        },
        {
          if: "Path diagnostics are inconclusive.",
          then:
            "Correlate endpoint, router, firewall, and provider telemetry rather than treating traceroute output as definitive."
        }
      ],
      caution:
        "Do not blindly enable jumbo frames or change MTU on a remote production interface."
    },
    {
      step: 9,
      title: "Investigate firewall, NAT, load balancer, and gateway bottlenecks",
      actions: [
        "Inspect firewall throughput, connection counts, session-table utilization, and drop counters.",
        "Check NAT port allocation, translation errors, and connection churn.",
        "Inspect load-balancer throughput, backend distribution, and connection limits.",
        "Check VPN, Direct Connect, ExpressRoute, transit gateway, or egress gateway health where applicable.",
        "Inspect interface utilization on both sides of the suspected bottleneck."
      ],
      decisions: [
        {
          if: "NAT or session allocation limits are reached.",
          then:
            "Follow the platform-specific remediation plan and investigate connection reuse and port consumption."
        },
        {
          if: "A gateway or firewall link is saturated.",
          then:
            "Reduce nonessential traffic where approved or expand capacity through the network change process."
        },
        {
          if: "The network device is healthy but the destination is slow.",
          then:
            "Investigate destination capacity, application queues, and service dependencies."
        }
      ]
    },
    {
      step: 10,
      title: "Check cloud-specific bandwidth limits",
      actions: [
        "Confirm the VM instance type and documented bandwidth characteristics.",
        "Inspect cloud metrics for bytes, packets, drops, and network allowance violations.",
        "Check per-flow and per-instance throughput limitations.",
        "Review regional egress, NAT gateway, load-balancer, and service quotas.",
        "Inspect high-resolution metrics when short bursts may be hidden by averages."
      ],
      providerChecks: [
        {
          provider: "AWS",
          checks: [
            "EC2 instance network bandwidth characteristics.",
            "ENA allowance metrics such as bandwidth and PPS allowance exceeded counters where supported.",
            "CloudWatch NetworkIn and NetworkOut, plus suitable higher-resolution telemetry.",
            "NAT Gateway, Transit Gateway, load balancer, and egress path metrics."
          ]
        },
        {
          provider: "Google Cloud",
          checks: [
            "Machine-type bandwidth limits and traffic direction.",
            "Network packet totals, packet size, and connection metrics.",
            "VM-level drops, CPU pressure, and path-specific network performance.",
            "VPC, firewall, and external egress limits."
          ]
        },
        {
          provider: "Azure",
          checks: [
            "VM size networking limits and accelerated networking support.",
            "NIC and VM metrics, effective routes, and Network Watcher diagnostics.",
            "Load balancer, NAT Gateway, and gateway capacity.",
            "Network security rules and path changes."
          ]
        }
      ],
      decisions: [
        {
          if: "A documented instance or service limit is reached.",
          then:
            "Evaluate a suitable capacity tier, supported network configuration, traffic distribution, or workload redesign."
        },
        {
          if: "Allowance exceeded counters rise despite low average usage.",
          then:
            "Investigate microbursts, packet rate, and the granularity of available metrics."
        },
        {
          if: "Cloud network limits are not implicated.",
          then:
            "Continue with host, application, route, and downstream analysis."
        }
      ]
    },
    {
      step: 11,
      title: "Inspect Kubernetes and container networking",
      actions: [
        "Identify affected pods, nodes, services, and namespaces.",
        "Compare per-pod and per-node traffic where observability supports it.",
        "Inspect CNI health, NetworkPolicy, service routing, and node NIC metrics.",
        "Check pod CPU limits and node-level packet-processing pressure.",
        "Inspect ingress controllers, service meshes, and overlay encapsulation overhead.",
        "Compare direct pod-to-pod, service VIP, and external access paths where appropriate."
      ],
      exampleCommands: [
        "kubectl get pods -n <namespace> -o wide",
        "kubectl get nodes",
        "kubectl get events -n <namespace> --sort-by=.lastTimestamp",
        "kubectl top pods -n <namespace>",
        "kubectl top nodes"
      ],
      decisions: [
        {
          if: "One node shows elevated drops or traffic.",
          then:
            "Investigate node NIC capacity, CNI, pod placement, and uneven traffic distribution."
        },
        {
          if: "Traffic fails only through a service or ingress.",
          then:
            "Inspect load balancing, service endpoints, ingress throughput, and policy configuration."
        },
        {
          if: "Pod traffic is healthy but node egress is saturated.",
          then:
            "Investigate aggregate node traffic and the downstream network path."
        }
      ],
      caution:
        "kubectl top reports resource usage, not complete network throughput. Use network telemetry for traffic and drops."
    },
    {
      step: 12,
      title: "Perform a controlled throughput test if needed",
      actions: [
        "Choose authorized source and destination endpoints.",
        "Confirm that the test will not disrupt production traffic.",
        "Use a short, bounded test window and record baseline metrics.",
        "Test one direction first and compare sender and receiver throughput.",
        "Stop immediately if loss, latency, or service errors increase.",
        "Compare the result with application traffic and provider limits."
      ],
      exampleCommands: [
        "iperf3 -s",
        "iperf3 -c <authorized-test-server> -t 10",
        "iperf3 -c <authorized-test-server> -t 10 -R"
      ],
      decisions: [
        {
          if: "Both endpoints achieve expected throughput in the test environment.",
          then:
            "Investigate production-specific traffic patterns, shared congestion, application behavior, or microbursts."
        },
        {
          if: "Throughput is low and retransmissions are high.",
          then:
            "Investigate packet loss, queues, path quality, and receiver processing."
        },
        {
          if: "Throughput is consistently capped at a known limit.",
          then:
            "Verify interface, VM, per-flow, gateway, or service capacity limits."
        }
      ],
      caution:
        "iperf3 can generate substantial traffic. Do not run it between production endpoints without explicit approval and a defined test budget."
    },
    {
      step: 13,
      title: "Identify the confirmed bottleneck",
      actions: [
        "Correlate application latency, interface rates, drops, TCP behavior, and infrastructure metrics.",
        "Identify the narrowest constrained link or processing layer.",
        "Distinguish sustained capacity exhaustion from short bursts and packet-rate limitations.",
        "Confirm the suspected cause with a controlled comparison or repeatable evidence.",
        "Document facts separately from hypotheses."
      ],
      exitCriteria: [
        "The affected direction and traffic path are identified.",
        "The bottleneck is supported by counter deltas, flow evidence, or provider telemetry.",
        "The impact on critical workloads is documented.",
        "A low-risk mitigation and rollback plan are ready."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Interface utilization stays near capacity",
      possibleCauses: [
        "Legitimate workload growth",
        "Large transfers or backups",
        "Insufficient link capacity",
        "Traffic concentration"
      ],
      evidence: [
        "Interface throughput samples",
        "Flow logs and top talkers",
        "Switch or provider link metrics"
      ],
      fix:
        "Schedule or shape noncritical traffic, distribute workload, optimize transfers, or expand capacity through an approved change."
    },
    {
      symptom: "Low average bandwidth but packet drops increase",
      possibleCauses: [
        "Microbursts",
        "PPS limits",
        "NIC queue pressure",
        "Switch egress buffer pressure"
      ],
      evidence: [
        "High-resolution metrics",
        "NIC queue counters",
        "Cloud allowance counters",
        "Switch queue telemetry"
      ],
      fix:
        "Address the confirmed burst, packet-rate, queue, or provider limit rather than relying only on average bandwidth."
    },
    {
      symptom: "TCP retransmissions and latency increase",
      possibleCauses: [
        "Packet loss",
        "Congestion",
        "Route degradation",
        "Receiver or sender processing pressure"
      ],
      evidence: [
        "nstat deltas",
        "ss -tin",
        "Path-specific latency",
        "Interface and device drop counters"
      ],
      fix:
        "Correct the identified loss or congestion point and validate end-to-end TCP behavior."
    },
    {
      symptom: "One application consumes most bandwidth",
      possibleCauses: [
        "Backup or replication burst",
        "Runaway download",
        "Retry storm",
        "Unexpected traffic"
      ],
      evidence: [
        "Flow logs",
        "Process-level observations",
        "Deployment and scheduler history",
        "Application logs"
      ],
      fix:
        "Apply approved rate limits or scheduling, correct retry behavior, and preserve evidence if activity is suspicious."
    },
    {
      symptom: "Cloud VM cannot achieve expected throughput",
      possibleCauses: [
        "Instance bandwidth ceiling",
        "Per-flow limit",
        "PPS limit",
        "Microbursts",
        "CPU or NIC driver bottleneck"
      ],
      evidence: [
        "Instance-type documentation",
        "Provider network metrics",
        "CPU/softirq metrics",
        "Controlled throughput tests"
      ],
      fix:
        "Correct the confirmed resource or workload limit and validate under the real traffic pattern."
    },
    {
      symptom: "Only Kubernetes workloads on one node are affected",
      possibleCauses: [
        "Node NIC saturation",
        "CNI or overlay overhead",
        "Uneven workload placement",
        "Node CPU pressure",
        "Policy or service-routing issue"
      ],
      evidence: [
        "Node and pod metrics",
        "CNI logs",
        "NIC counters",
        "Service endpoints and policy state"
      ],
      fix:
        "Correct the node, networking, or scheduling bottleneck using the platform's approved procedure."
    }
  ],

  recoveryPlan: {
    immediateContainment: [
      "Declare the incident and notify service and network owners.",
      "Preserve baseline counters, flow evidence, and timestamps.",
      "Identify critical traffic and protect it from unnecessary disruption.",
      "Pause or reschedule noncritical transfers only after confirming ownership and impact.",
      "Reduce uncontrolled retries and duplicate transfers where the application owner approves.",
      "Avoid broad firewall changes or interface resets."
    ],
    correctiveActions: [
      "For sustained demand, consider capacity expansion or traffic distribution.",
      "For backup bursts, use approved schedules and rate limits.",
      "For retry storms, fix retry budgets, exponential backoff, and timeout behavior.",
      "For queue drops, correct the confirmed congestion point and evaluate supported QoS or queue configuration.",
      "For cloud bandwidth limits, evaluate instance type, flow characteristics, and documented provider limits.",
      "For faulty physical links, coordinate cable, optic, transceiver, or switch-port remediation.",
      "For routing or MTU problems, use a reviewed change with a tested rollback plan."
    ],
    validation: [
      "Verify interface throughput is within expected capacity.",
      "Confirm error and drop counter deltas have stabilized.",
      "Confirm TCP retransmissions and latency have returned to acceptable levels.",
      "Check API latency percentiles and error rates.",
      "Verify deployment downloads, replication, and other critical workflows.",
      "Monitor the affected path through at least one representative peak period.",
      "Confirm no unintended effect on neighboring services."
    ],
    stopConditions: [
      "The proposed action may interrupt remote management access.",
      "A change could break routing, security policy, or connectivity for unrelated services.",
      "A throughput test could affect customer traffic.",
      "The suspected bottleneck is not supported by evidence.",
      "A production configuration change lacks approval or a rollback plan."
    ]
  },

  prevention: {
    monitoring: [
      "Alert on sustained interface utilization and capacity headroom.",
      "Monitor RX/TX packet rates and interface drop/error deltas.",
      "Track TCP retransmissions, latency, and packet loss.",
      "Monitor NIC queue drops and CPU/softirq pressure.",
      "Use higher-resolution metrics where microbursts are a concern.",
      "Monitor cloud bandwidth and PPS allowance counters.",
      "Track firewall, NAT, gateway, and load-balancer capacity.",
      "Correlate network metrics with application latency and request rate."
    ],
    operationalControls: [
      "Maintain documented capacity baselines for critical network paths.",
      "Load-test with approved test plans before major traffic changes.",
      "Schedule large backups and transfers to avoid peak customer periods.",
      "Use bounded retries, exponential backoff, and connection reuse.",
      "Review traffic distribution after deployments and failovers.",
      "Maintain network diagrams, ownership, escalation paths, and rollback procedures.",
      "Review capacity growth and network quotas periodically.",
      "Document interface, route, MTU, QoS, and cloud networking changes."
    ]
  },

  incidentReportTemplate: {
    incidentId: "",
    startTimeUtc: "",
    detectionTimeUtc: "",
    recoveryTimeUtc: "",
    affectedEnvironment: "",
    affectedServices: [],
    sourceAndDestination: [],
    interfaceAndDirection: "",
    linkOrInstanceCapacity: "",
    peakThroughput: "",
    packetRate: "",
    packetDropsAndErrors: [],
    retransmissionsAndLatency: [],
    providerOrDeviceMetrics: [],
    recentChanges: [],
    customerImpact: "",
    timeline: [],
    rootCause: "",
    supportingEvidence: [],
    correctiveAction: "",
    rollbackPlan: "",
    recoveryValidation: [],
    preventionActions: [],
    actionOwners: [],
    followUpDates: []
  },

  handsOnLabs: [
    {
      title: "Lab 1: Interface utilization",
      objective: "Calculate throughput from interface counter deltas.",
      tasks: [
        "Use a disposable Linux VM.",
        "Capture ip -s -s link output twice.",
        "Calculate RX and TX rates over a known interval.",
        "Compare the result with sar -n DEV output."
      ]
    },
    {
      title: "Lab 2: Controlled iperf3 test",
      objective: "Measure TCP throughput between authorized test endpoints.",
      tasks: [
        "Create two disposable test VMs.",
        "Record baseline CPU and network metrics.",
        "Run a short bounded test in each direction.",
        "Compare sender and receiver throughput.",
        "Stop the test and document its effect on the test link."
      ]
    },
    {
      title: "Lab 3: Packet drops and retransmissions",
      objective: "Correlate counter changes with connection performance.",
      tasks: [
        "Collect nstat and interface counters.",
        "Record latency and retransmission deltas.",
        "Use a controlled test environment to introduce a limited impairment if supported.",
        "Identify which evidence changes and how it narrows the diagnosis."
      ]
    },
    {
      title: "Lab 4: Top talkers and traffic bursts",
      objective: "Identify the source of unexpected network demand.",
      tasks: [
        "Generate approved test traffic in a lab.",
        "Observe interface and flow metrics.",
        "Compare average throughput with short peak behavior.",
        "Write a safe mitigation plan."
      ]
    },
    {
      title: "Lab 5: Cloud network limits",
      objective: "Distinguish link saturation from instance or PPS limits.",
      tasks: [
        "Review the selected cloud VM's networking limits.",
        "Inspect provider network metrics.",
        "Compare average bandwidth, packet rate, and drops.",
        "Document the appropriate capacity or workload correction."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "How do you calculate network throughput from interface counters?",
      answer:
        "Take the byte-counter delta over a known interval, multiply by eight, and divide by elapsed seconds. Convert to Mbps or Gbps using decimal units."
    },
    {
      question: "Does high bandwidth utilization always mean a network incident?",
      answer:
        "No. It must be correlated with capacity headroom, packet loss, latency, drops, and application impact."
    },
    {
      question: "What is a microburst?",
      answer:
        "A very short burst of traffic that can overflow queues even when longer-window average utilization appears moderate."
    },
    {
      question: "Why inspect PPS as well as bandwidth?",
      answer:
        "Small packets can exhaust packet-processing capacity before the bit-rate limit is reached."
    },
    {
      question: "What do increasing TCP retransmissions indicate?",
      answer:
        "They can indicate packet loss or congestion, but must be correlated with path telemetry and endpoint behavior."
    },
    {
      question: "How do you distinguish a host bottleneck from a network-path bottleneck?",
      answer:
        "Compare CPU/softirq, NIC counters, socket metrics, and traffic observations at both endpoints and intermediate devices."
    },
    {
      question: "Why can a cloud VM deliver less throughput than its advertised maximum?",
      answer:
        "The effective limit can depend on instance type, traffic direction, per-flow constraints, packet size, PPS, CPU, and network congestion."
    },
    {
      question: "When is iperf3 appropriate in production?",
      answer:
        "Only with explicit authorization, known endpoints, a bounded test duration and traffic budget, and monitoring for customer impact."
    },
    {
      question: "How do you prove the incident is resolved?",
      answer:
        "Validate stable throughput, drop and error deltas, retransmissions, latency, and critical application workflows under representative traffic."
    }
  ],

  completionChecklist: [
    "Incident severity and customer impact are documented.",
    "Affected host, interface, traffic direction, and network path are identified.",
    "Baseline and incident-time throughput are measured.",
    "Packet rate and capacity limits are checked.",
    "Interface errors, drops, and queue counters are inspected.",
    "TCP retransmissions and latency are correlated.",
    "Top talkers and recent workload changes are investigated.",
    "CPU, softirq, and NIC processing are checked.",
    "Routing, MTU, firewall, NAT, and load-balancer metrics are reviewed.",
    "Cloud or Kubernetes-specific limits are checked where relevant.",
    "Root cause is supported by evidence.",
    "Mitigation is approved and has a rollback plan.",
    "Critical applications pass recovery validation.",
    "Monitoring confirms stable performance.",
    "Incident report and prevention actions have owners."
  ],

  officialReferences: [
    {
      title: "Linux Kernel - Interface Statistics",
      url: "https://docs.kernel.org/networking/statistics.html"
    },
    {
      title: "iproute2 Documentation",
      url: "https://www.kernel.org/pub/linux/utils/net/iproute2/"
    },
    {
      title: "ethtool Manual",
      url: "https://man7.org/linux/man-pages/man8/ethtool.8.html"
    },
    {
      title: "iperf3 Documentation",
      url: "https://iperf.fr/iperf-doc.php"
    },
    {
      title: "AWS EC2 Instance Network Bandwidth",
      url:
        "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-network-bandwidth.html"
    },
    {
      title: "AWS Networking Best Practices - Observability",
      url:
        "https://aws.github.io/aws-networking-best-practices/observability/service-monitoring/"
    },
    {
      title: "Google Cloud - Network Bandwidth",
      url: "https://docs.cloud.google.com/compute/docs/network-bandwidth"
    },
    {
      title: "Google Cloud - Troubleshoot VM Network Performance",
      url:
        "https://docs.cloud.google.com/compute/docs/troubleshooting/troubleshooting-performance"
    },
    {
      title: "Google Cloud - Troubleshoot VM-to-VM Connectivity",
      url: "https://docs.cloud.google.com/vpc/docs/ts-vm-vm-internal"
    },
    {
      title: "Google Kubernetes Engine - Network Observability Troubleshooting",
      url:
        "https://docs.cloud.google.com/kubernetes-engine/docs/troubleshooting/network-observability"
    }
  ]
} as const;

export default bandwidthSaturationGuide;
