
export const routingLoopGuide = {
  title: "Routing Loop - Real Production Troubleshooting",
  filePath: "app/troubleshooting-center/networking/RoutingLoop.ts",
  category: "Networking",
  difficulty: "Advanced",
  estimatedTime: "30-120 minutes depending on network scope",

  overview: {
    problem:
      "Packets repeatedly traverse routers because of inconsistent routes, incorrect next hops, routing protocol convergence problems, policy routing, or network topology/configuration errors.",
    objective:
      "Identify the forwarding loop, isolate the routers and route entries involved, apply a controlled correction, verify bidirectional reachability, and prevent recurrence.",
    symptoms: [
      "Application requests time out or become extremely slow.",
      "Traceroute shows repeating router addresses or a repeating hop pattern.",
      "TTL exceeded or Hop Limit exceeded messages appear.",
      "Router CPU, interface traffic, or packet drops rise unexpectedly.",
      "Only a specific destination subnet, protocol, source network, or availability zone is affected.",
      "Intermittent connectivity appears when multiple paths or ECMP next hops exist.",
      "A route advertisement or network change is followed by widespread reachability failures."
    ],
    keyDistinctions: [
      {
        condition: "Routing loop",
        meaning:
          "Packets are forwarded repeatedly between next hops instead of progressing to the destination."
      },
      {
        condition: "Routing black hole",
        meaning:
          "Packets are dropped because a route, next hop, or forwarding action leads nowhere useful."
      },
      {
        condition: "Traceroute timeout",
        meaning:
          "A hop did not respond to a probe. This alone does not prove a routing loop or packet loss."
      },
      {
        condition: "Asymmetric routing",
        meaning:
          "Forward and return traffic use different paths. This may be intentional, but can conflict with firewalls or stateful middleboxes."
      },
      {
        condition: "Route flapping",
        meaning:
          "A route repeatedly appears, disappears, or changes attributes, potentially causing intermittent forwarding problems."
      }
    ]
  },

  productionScenario: {
    scenario:
      "After a network configuration change, application servers in subnet A can no longer reach a service in subnet B. Traceroute from affected hosts repeatedly shows Router-A and Router-B. API latency and timeouts rise, while local services remain healthy.",
    timeline: [
      "T+00: Monitoring reports destination timeouts and elevated application errors.",
      "T+03: Incident commander confirms affected source/destination subnets and business impact.",
      "T+05: Engineers capture traceroute, routing table entries, next-hop addresses, and recent configuration changes.",
      "T+10: Router-A and Router-B forwarding decisions are compared for the exact destination prefix.",
      "T+20: Evidence identifies inconsistent static routes, a routing protocol issue, or a policy-routing mismatch.",
      "T+30: Approved minimal route correction or rollback is applied.",
      "Recovery: Validate the forwarding path in both directions and monitor for recurrence.",
      "Post-incident: Record route changes, root cause, prevention actions, and evidence."
    ],
    impactQuestions: [
      "Which source and destination prefixes are affected?",
      "Is the problem limited to one protocol or does all traffic fail?",
      "Does the loop occur in one direction or both directions?",
      "Which routers or cloud routing domains are involved?",
      "Did a static route, BGP, OSPF, VPN, firewall, NAT, or route-table change happen recently?",
      "Are there multiple next hops or ECMP paths?",
      "Is a production management route or cluster heartbeat path affected?",
      "Can traffic use a tested redundant path without creating another loop?"
    ]
  },

  severity: [
    {
      level: "SEV-1",
      criteria:
        "A routing loop disrupts critical production services across a major network segment or region.",
      response:
        "Declare an incident, engage network/platform/cloud owners, preserve evidence, and execute the approved rollback or failover plan."
    },
    {
      level: "SEV-2",
      criteria:
        "A production subnet, application dependency, or redundant path is unavailable or degraded.",
      response:
        "Investigate route decisions and recent changes; prepare a controlled correction with rollback."
    },
    {
      level: "SEV-3",
      criteria:
        "A limited non-production route or isolated destination is affected.",
      response:
        "Capture evidence, reproduce safely, and correct under change control."
    }
  ],

  safetyChecks: [
    "Confirm hostname/device identity, environment, VRF, source prefix, destination prefix, and affected protocol.",
    "Verify whether the management session uses the route being investigated.",
    "Use console or out-of-band access before modifying a production router's management route.",
    "Capture the current route table, routing protocol state, configuration, and relevant counters.",
    "Check change approval, maintenance window, HA state, and rollback procedure.",
    "Do not delete default routes or flush the routing table as a troubleshooting shortcut.",
    "Do not redistribute routes, change route metrics, or modify BGP/OSPF policy without understanding the wider impact.",
    "Do not assume a traceroute timeout means the router is dropping forwarded production packets.",
    "Do not change both ends of a path simultaneously unless the approved recovery procedure requires it.",
    "Use read-only commands first; use vendor-specific commands only on the correct platform.",
    "Protect network diagrams, device configurations, IP addressing, and packet captures according to security policy."
  ],

  evidenceCollection: {
    hostIdentity: [
      "date -Is",
      "hostnamectl",
      "ip -br address",
      "ip -br link"
    ],
    linuxRoutes: [
      "ip route show table all",
      "ip rule show",
      "ip route get <DESTINATION_IP>",
      "ip -6 route show table all",
      "ip -6 route get <DESTINATION_IPV6>"
    ],
    pathTests: [
      "traceroute -n <DESTINATION_IP>",
      "tracepath <DESTINATION_IP>",
      "ping -c 3 <DESTINATION_IP>",
      "mtr -n -r -c 10 <DESTINATION_IP>"
    ],
    packetAndKernelEvidence: [
      "ip -s link show dev <IFACE>",
      "journalctl -k --since '-30 min' --no-pager",
      "sudo tcpdump -ni <IFACE> -c 100 host <DESTINATION_IP>"
    ],
    routerEvidence: [
      "Routing table entry for the exact destination prefix",
      "Selected next hop and outgoing interface",
      "Routing protocol neighbor/adjacency state",
      "Route advertisement and withdrawal timestamps",
      "VRF and policy-routing context",
      "Interface errors, queue drops, CPU, and forwarding counters",
      "Recent configuration changes and commit history"
    ],
    cloudEvidence: [
      "Effective routes for the source and destination workloads",
      "VPC/VNet route tables and propagated routes",
      "VPN, transit gateway, peering, and virtual appliance routes",
      "Cloud flow logs and connectivity test results",
      "Relevant provider health and activity events"
    ],
    evidenceRules: [
      "Record timestamp, device identity, source/destination, VRF, command, and output.",
      "Capture the exact prefix and selected next hop; a default route may be relevant when no more-specific route exists.",
      "Compare evidence from both sides of the suspected loop.",
      "Save the last known-good configuration before changing routes.",
      "Redact credentials, secrets, and sensitive configuration before sharing evidence."
    ]
  },

  diagnosticDecisionTree: [
    {
      step: 1,
      question: "Does traceroute show repeating hop addresses?",
      ifYes:
        "Record the repeating pattern, probe type, source, destination, and timestamps. Inspect the forwarding table on the suspected routers.",
      ifNo:
        "Do not rule out a loop. Probe filtering, ECMP, asymmetric paths, or TTL handling can hide the pattern. Continue with route and forwarding evidence.",
      commands: [
        "traceroute -n <DESTINATION_IP>",
        "tracepath <DESTINATION_IP>"
      ]
    },
    {
      step: 2,
      question: "Does the source host select the expected route?",
      ifYes:
        "Inspect the selected gateway and continue to the next hop.",
      ifNo:
        "Check prefix length, policy rules, source-address selection, VRF, and recent route changes.",
      commands: [
        "ip route get <DESTINATION_IP>",
        "ip route show table all",
        "ip rule show"
      ]
    },
    {
      step: 3,
      question: "Do the suspected routers point the destination prefix toward each other?",
      ifYes:
        "Compare the exact destination route, next-hop recursion, route source, preference, and policy on both routers.",
      ifNo:
        "Investigate another hop, ECMP path, tunnel, NAT, or a return-path issue.",
      commands: [
        "Vendor-specific route lookup for <DESTINATION_PREFIX>",
        "Vendor-specific forwarding-table lookup for <DESTINATION_IP>",
        "Vendor-specific routing protocol status"
      ]
    },
    {
      step: 4,
      question: "Did a route or policy change precede the incident?",
      ifYes:
        "Compare the current configuration and route advertisements with the last known-good state. Roll back only the confirmed faulty change.",
      ifNo:
        "Investigate protocol convergence, route redistribution, next-hop reachability, stale state, and device health.",
      commands: [
        "Review configuration commit history",
        "Review routing protocol logs",
        "Review route advertisement and withdrawal events"
      ]
    },
    {
      step: 5,
      question: "Is the loop limited to one route, VRF, or source?",
      ifYes:
        "Check more-specific routes, policy routing, route leaking, source-dependent rules, and overlapping prefixes.",
      ifNo:
        "Check shared routing policy, core topology, route redistribution, and widespread protocol events."
    },
    {
      step: 6,
      question: "Does the return path also work correctly?",
      ifYes:
        "Validate application connectivity and monitor route stability.",
      ifNo:
        "Trace and inspect the reverse direction independently; do not assume symmetric routing."
    }
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      name: "Confirm the incident scope",
      actions: [
        "Identify affected services, source and destination prefixes, and protocols.",
        "Compare one affected host with one healthy host.",
        "Check whether failures began after a route, firewall, VPN, or cloud network change.",
        "Establish an alternate management path before changing production routes."
      ],
      successCriteria:
        "Affected scope, business impact, device ownership, and safe access are known."
    },
    {
      step: 2,
      name: "Capture the source route decision",
      commands: [
        "ip route get <DESTINATION_IP>",
        "ip rule show",
        "ip route show table all"
      ],
      actions: [
        "Record the chosen next hop, outgoing interface, source IP, and routing table.",
        "Check whether the destination matches a more-specific route.",
        "Repeat the lookup in the correct network namespace or VRF when relevant."
      ]
    },
    {
      step: 3,
      name: "Trace the path carefully",
      commands: [
        "traceroute -n <DESTINATION_IP>",
        "tracepath <DESTINATION_IP>",
        "mtr -n -r -c 10 <DESTINATION_IP>"
      ],
      actions: [
        "Look for repeating hop patterns and TTL-exceeded responses.",
        "Compare results from different affected and healthy source hosts.",
        "Repeat with a supported probe type when UDP/ICMP probes may be filtered.",
        "Use a modest probe count and avoid unnecessary diagnostic traffic."
      ],
      notes: [
        "Traceroute uses probes with increasing TTL or Hop Limit to discover responding hops.",
        "Asterisks can mean a device did not respond to the probe; they do not prove that ordinary forwarded traffic was dropped.",
        "ECMP and flow hashing can make different probes follow different paths."
      ]
    },
    {
      step: 4,
      name: "Inspect route decisions on each suspected router",
      actions: [
        "Look up the exact destination prefix on the first suspected router.",
        "Record the selected next hop, outgoing interface, route source, and preference.",
        "Repeat on the next hop and continue until the loop is confirmed or another cause is found.",
        "Check both the control-plane route table and forwarding table when the platform exposes both."
      ],
      decision:
        "A loop is strongly supported when the selected forwarding next hops repeatedly direct the same traffic back toward a previously visited router."
    },
    {
      step: 5,
      name: "Investigate static routes and route specificity",
      actions: [
        "Check prefix length and longest-prefix-match behavior.",
        "Check static route next-hop reachability and recursive resolution.",
        "Review route metrics or administrative preference according to the vendor platform.",
        "Check whether a default route sends traffic back to a router that has no more-specific route.",
        "Check for overlapping subnets, incorrect masks, and unintended route leaking."
      ],
      caution:
        "Do not assume every platform uses the same route preference or administrative-distance behavior."
    },
    {
      step: 6,
      name: "Investigate dynamic routing",
      actions: [
        "Check BGP neighbor status, advertised/received prefixes, next-hop reachability, and route policy.",
        "For OSPF, check neighbor state, LSDB consistency, area design, and route calculation.",
        "For other protocols, use the platform-specific route and adjacency commands.",
        "Review redistribution between static routes, BGP, OSPF, and other routing domains.",
        "Check whether a route withdrawal, flap, or convergence event aligns with the incident."
      ],
      caution:
        "Do not reset routing adjacencies or withdraw production prefixes without an approved recovery plan."
    },
    {
      step: 7,
      name: "Check policy routing, VRFs, NAT, and tunnels",
      actions: [
        "Verify source-based routing rules and packet marks.",
        "Confirm the route lookup occurs in the expected VRF or routing table.",
        "Check route leaking between VRFs and overlapping address spaces.",
        "Inspect VPN/tunnel route selection and the underlay path.",
        "Review NAT and stateful firewall behavior if forward and return paths differ."
      ],
      commands: [
        "ip rule show",
        "ip route show table all",
        "ip -d link show"
      ]
    },
    {
      step: 8,
      name: "Correlate packet and device telemetry",
      actions: [
        "Check interface counters and device CPU/forwarding health.",
        "Collect filtered packet captures at appropriate interfaces.",
        "Compare timestamps across routers and application hosts.",
        "Review cloud flow logs, firewall logs, and routing events.",
        "Distinguish a control-plane probe response issue from an actual data-plane forwarding loop."
      ],
      commands: [
        "ip -s link show dev <IFACE>",
        "journalctl -k --since '-30 min' --no-pager",
        "sudo tcpdump -ni <IFACE> -c 100 host <DESTINATION_IP>"
      ]
    },
    {
      step: 9,
      name: "Confirm the root cause before modifying routes",
      actions: [
        "Document the incorrect route, next-hop relationship, or policy.",
        "Compare against a known-good configuration or intended network design.",
        "Identify all affected prefixes and dependent services.",
        "Prepare the exact corrective change and rollback command/configuration.",
        "Get the required production approval."
      ],
      successCriteria:
        "The correction targets a specific, evidence-backed route or policy defect."
    },
    {
      step: 10,
      name: "Apply controlled recovery",
      actions: [
        "Use the approved vendor or cloud management interface.",
        "Change only the faulty route or policy where possible.",
        "Check that the corrected next hop is reachable and does not point back into the loop.",
        "Verify routing convergence and forwarding behavior.",
        "Avoid broad route flushes or simultaneous uncoordinated changes."
      ]
    },
    {
      step: 11,
      name: "Validate both directions",
      actions: [
        "Repeat traceroute and route lookup from the original source.",
        "Run a reverse-path test from the destination side.",
        "Validate the actual application protocol and port.",
        "Check that the route remains stable and that counters and errors are returning to baseline.",
        "Confirm the change did not break another subnet or management path."
      ]
    },
    {
      step: 12,
      name: "Close the incident and prevent recurrence",
      actions: [
        "Record timeline, evidence, root cause, change reference, and rollback decision.",
        "Add route validation to change review and automation.",
        "Create alerts for route flaps and reachability failures.",
        "Update topology diagrams and recovery runbooks.",
        "Assign prevention actions with owners and due dates."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Two routers repeatedly appear in traceroute",
      likelyCauses: [
        "Incorrect static routes",
        "Mutual default-route forwarding",
        "Incorrect route redistribution"
      ],
      confirmation:
        "Compare the exact destination route and selected next hop on both routers."
    },
    {
      symptom: "Loop starts after a routing policy change",
      likelyCauses: [
        "Incorrect prefix match",
        "Wrong route-map or policy",
        "Unintended route advertisement"
      ],
      confirmation:
        "Compare configuration history, received/advertised routes, and route selection."
    },
    {
      symptom: "Only one source subnet experiences a loop",
      likelyCauses: [
        "Policy-based routing",
        "VRF mismatch",
        "Source-specific route",
        "Overlapping subnet"
      ],
      confirmation:
        "Compare route lookups and policy rules for affected versus healthy sources."
    },
    {
      symptom: "Intermittent failures across multiple paths",
      likelyCauses: [
        "ECMP next-hop issue",
        "Route flapping",
        "Partial failure of one path",
        "Inconsistent forwarding state"
      ],
      confirmation:
        "Compare per-next-hop telemetry, routing events, and repeated controlled probes."
    },
    {
      symptom: "Traceroute stops but no repeating hops appear",
      likelyCauses: [
        "Probe filtering",
        "Missing route",
        "Firewall policy",
        "Return-path failure",
        "Device not generating ICMP errors"
      ],
      confirmation:
        "Inspect route tables, test approved application traffic, and check upstream logs."
    },
    {
      symptom: "Cloud subnet cannot reach another subnet",
      likelyCauses: [
        "Conflicting route-table entries",
        "Incorrect virtual appliance route",
        "Peering or transit route issue",
        "VPN route propagation problem"
      ],
      confirmation:
        "Inspect effective routes and supported cloud connectivity diagnostics."
    },
    {
      symptom: "Loop appears during failover",
      likelyCauses: [
        "Stale route",
        "Incorrect floating/static route",
        "Routing convergence issue",
        "Failover policy inconsistency"
      ],
      confirmation:
        "Correlate failover events, route updates, and next-hop state."
    }
  ],

  recoveryPlaybook: [
    {
      condition: "Confirmed incorrect static route",
      actions: [
        "Capture the current route and intended network design.",
        "Validate the correct next hop from the device that will use it.",
        "Apply the narrowest approved route correction.",
        "Verify route selection and forwarding after the change."
      ],
      avoid:
        "Deleting the default route or making a broad route change without confirming dependent destinations."
    },
    {
      condition: "Confirmed bad routing policy or advertisement",
      actions: [
        "Correct the specific prefix match or policy statement.",
        "Validate received and advertised routes before and after the change.",
        "Monitor convergence and reachability for dependent prefixes."
      ],
      avoid:
        "Resetting all BGP/OSPF neighbors or redistributing all routes as a quick fix."
    },
    {
      condition: "Confirmed cloud route-table problem",
      actions: [
        "Compare the affected route table with the intended network architecture.",
        "Correct the specific route through the cloud management plane.",
        "Run supported connectivity tests and validate the application path."
      ],
      avoid:
        "Changing multiple route tables simultaneously without a dependency map and rollback."
    },
    {
      condition: "Confirmed asymmetric routing and stateful firewall conflict",
      actions: [
        "Map forward and return paths.",
        "Correct routing or firewall architecture using the approved design.",
        "Validate session establishment and return traffic."
      ],
      avoid:
        "Disabling firewall state tracking or opening broad access to mask the routing defect."
    },
    {
      condition: "Routing protocol instability",
      actions: [
        "Preserve neighbor state, route advertisements, logs, and configuration.",
        "Identify the exact unstable adjacency, prefix, policy, or next-hop dependency.",
        "Use the vendor-supported recovery and escalation procedure."
      ],
      avoid:
        "Repeatedly clearing protocol state without understanding convergence and traffic impact."
    }
  ],

  platformSpecificChecks: {
    linuxHosts: [
      "Use ip route get <DESTINATION_IP> to inspect the selected route for a destination.",
      "Use ip route show table all and ip rule show to inspect routes and policy rules.",
      "Use traceroute -n or tracepath to investigate the path.",
      "Check IPv6 separately with ip -6 route and IPv6 traceroute where relevant.",
      "Remember that a host route lookup does not reveal every downstream router's forwarding decision."
    ],
    ciscoRouters: [
      "Use the platform's show ip route <DESTINATION_IP> command.",
      "Inspect the forwarding table with the platform-supported CEF/FIB lookup command.",
      "Check show ip protocols and relevant BGP/OSPF neighbor and route details.",
      "Use traceroute from the router with the appropriate source interface when supported.",
      "Follow the device's documented change and rollback procedures."
    ],
    juniperRouters: [
      "Use show route <DESTINATION_PREFIX> to inspect route selection.",
      "Inspect the forwarding table and routing instance for the destination.",
      "Check relevant protocol neighbor, route advertisement, and configuration commit history.",
      "Use the platform-supported trace route command and compare source interfaces."
    ],
    aws: [
      "Check VPC route tables, subnet associations, propagated routes, and routes to virtual appliances.",
      "Inspect Transit Gateway, peering, VPN, and relevant network interfaces.",
      "Use VPC Reachability Analyzer and Flow Logs where appropriate.",
      "Verify both source-to-destination and destination-to-source reachability."
    ],
    azure: [
      "Inspect effective routes on the affected NIC.",
      "Check user-defined routes, next-hop type, peering, VPN, and virtual network gateway paths.",
      "Use Network Watcher Next Hop and Connectivity Troubleshoot where supported.",
      "Verify the intended return path and network security controls."
    ],
    gcp: [
      "Inspect VPC routes, dynamic route propagation, peering, VPN, and Cloud Router state.",
      "Use Connectivity Tests to evaluate the configured path where supported.",
      "Compare route selection and firewall policy for affected and healthy workloads."
    ],
    kubernetes: [
      "Check node routes, pod routes, CNI health, overlay tunnels, and service routing.",
      "Inspect kubectl get nodes -o wide and relevant pod events.",
      "Compare pod-to-pod, pod-to-service, and node-to-external paths separately.",
      "Do not delete CNI routes or restart all networking components without a cluster-specific plan."
    ]
  },

  prevention: {
    controls: [
      "Keep network topology and intended route design version-controlled.",
      "Review static routes, route redistribution, and policy changes before production rollout.",
      "Validate route changes in a staging or canary environment.",
      "Use narrow prefix filters and explicit route-policy review.",
      "Monitor routing adjacency changes, route flaps, and unexpected next-hop changes.",
      "Alert on service reachability from multiple independent vantage points.",
      "Test failover paths and rollback procedures regularly.",
      "Document management access that must remain available during route changes."
    ],
    monitoring: [
      "Destination reachability and application transaction success",
      "Route changes and routing protocol neighbor state",
      "Router CPU, memory, interface errors, and queue drops",
      "TTL exceeded or Hop Limit exceeded observations",
      "Cloud effective-route changes and connectivity test failures",
      "Latency, packet loss, and route convergence time"
    ]
  },

  incidentReportTemplate: {
    incidentId: "",
    startTime: "",
    detectionTime: "",
    recoveryTime: "",
    environment: "",
    affectedSourcePrefixes: [],
    affectedDestinationPrefixes: [],
    affectedDevices: [],
    vrfOrRoutingInstance: "",
    businessImpact: "",
    severity: "",
    lastKnownGoodConfiguration: "",
    recentChanges: [],
    tracerouteEvidence: [],
    routeLookupEvidence: [],
    routingProtocolEvidence: [],
    confirmedLoopPath: [],
    rootCause: "",
    contributingFactors: [],
    recoveryActions: [],
    rollbackPerformed: false,
    forwardPathValidated: false,
    returnPathValidated: false,
    applicationValidation: "",
    preventionTasks: [],
    ownersAndDueDates: [],
    lessonsLearned: ""
  },

  handsOnLabs: [
    {
      name: "Lab 1 - Inspect routes without changing them",
      environment: "Linux test host",
      commands: [
        "ip route show table all",
        "ip rule show",
        "ip route get <DESTINATION_IP>",
        "traceroute -n <DESTINATION_IP>"
      ],
      objective:
        "Understand route selection and collect baseline path evidence."
    },
    {
      name: "Lab 2 - Identify a loop in a controlled router lab",
      environment: "Isolated virtual router lab only",
      actions: [
        "Create a disposable topology with at least two routers.",
        "Configure a deliberately incorrect route in the isolated lab.",
        "Use traceroute and each router's route lookup to identify the repeated next-hop pattern.",
        "Correct the route and verify that the path reaches the destination."
      ],
      objective:
        "Learn how forwarding decisions on adjacent routers combine to create a loop.",
      warning:
        "Do not reproduce a routing loop on a shared, home-production, corporate, or cloud production network."
    },
    {
      name: "Lab 3 - Compare forward and return routes",
      environment: "Two isolated test networks",
      commands: [
        "ip route get <DESTINATION_IP>",
        "ip route get <SOURCE_IP>"
      ],
      objective:
        "Compare endpoint route selection and understand why reverse-path validation must be performed independently."
    },
    {
      name: "Lab 4 - Simulate a route-change incident",
      environment: "Disposable virtual network",
      actions: [
        "Capture the initial route table and topology.",
        "Apply a controlled lab-only route change.",
        "Record traceroute, route lookup, and protocol state.",
        "Restore the known-good route and validate both directions."
      ],
      objective:
        "Practice evidence capture, controlled recovery, rollback, and incident documentation."
    }
  ],

  interviewQuestions: [
    {
      question: "Routing loop ante enti?",
      expectedAnswer:
        "Routers next-hop decisions valla packet repeated-ga same routers madhya forward avuthundi; TTL/Hop Limit expire ayye varaku destination ki reach avvakapovachu."
    },
    {
      question: "Traceroute-lo same two IPs repeat avuthunnayi. Next enti?",
      expectedAnswer:
        "A routers lo exact destination prefix route, selected next hop, forwarding table, and recent changes compare chesi loop confirm chestha."
    },
    {
      question: "Traceroute-lo stars kanipisthe routing loop confirm aa?",
      expectedAnswer:
        "Kaadu. Probe filtering, ICMP rate limiting, missing return path, or no ICMP response valla stars ravachu."
    },
    {
      question: "Static route loop ela create avuthundi?",
      expectedAnswer:
        "Two routers destination prefix kosam okariki okaru next hop-ga select cheskunte, packet destination badulu repeated-ga back-and-forth forward avvachu."
    },
    {
      question: "Routing loop and black hole difference enti?",
      expectedAnswer:
        "Loop-lo packet repeatedly forward avuthundi; black hole-lo packet usually discard avuthundi without useful forwarding."
    },
    {
      question: "Production route fix mundu em chesthav?",
      expectedAnswer:
        "Current config, exact prefix, next-hop reachability, dependencies, approval, alternate management path, and rollback plan confirm chestha."
    },
    {
      question: "Route fix ayyaka ela validate chesthav?",
      expectedAnswer:
        "Route lookup, traceroute, application test, forward and return paths, routing stability, and monitoring validate chestha."
    }
  ],

  finalChecklist: [
    "Affected source/destination prefixes and business impact confirmed",
    "Correct router, VRF, and environment confirmed",
    "Out-of-band access and rollback plan verified",
    "Traceroute and route lookup evidence collected",
    "Suspected routers' next-hop decisions compared",
    "Static routes, routing protocols, and policy routing checked",
    "Recent route advertisements and configuration changes reviewed",
    "Forward and return paths investigated independently",
    "Root cause confirmed before modifying production routes",
    "Minimal approved correction applied",
    "Routing convergence and application connectivity verified",
    "No unintended impact to dependent prefixes",
    "Incident evidence and prevention tasks recorded"
  ],

  references: [
    {
      title: "Linux ip-route manual",
      url: "https://man7.org/linux/man-pages/man8/ip-route.8.html"
    },
    {
      title: "Linux traceroute manual",
      url: "https://man7.org/linux/man-pages/man8/traceroute.8.html"
    },
    {
      title: "Cisco - Extended Ping and Traceroute",
      url: "https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13730-ext-ping-trace.html"
    },
    {
      title: "Cisco - Traceroute troubleshooting",
      url: "https://www.cisco.com/c/en/us/support/docs/ip/ip-routed-protocols/22826-traceroute.html"
    },
    {
      title: "Microsoft - Troubleshoot TCP/IP with TRACERT",
      url: "https://support.microsoft.com/en-us/windows/experience/how-to-use-tracert-to-troubleshoot-tcp-ip-problems-on-windows"
    },
    {
      title: "AWS VPC User Guide",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/"
    },
    {
      title: "Azure Network Watcher",
      url: "https://learn.microsoft.com/en-us/azure/network-watcher/"
    },
    {
      title: "Google Cloud Connectivity Tests",
      url: "https://cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/overview"
    },
    {
      title: "Kubernetes Debugging Applications",
      url: "https://kubernetes.io/docs/tasks/debug/"
    }
  ]
} as const;

export default routingLoopGuide;
