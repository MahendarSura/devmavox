
export const interfaceDownGuide = {
  title: "Network Interface Down - Production Troubleshooting",
  filePath: "app/troubleshooting-center/networking/InterfaceDown.ts",
  category: "Networking",
  difficulty: "Advanced",
  estimatedTime: "30-90 minutes; hardware or cloud escalation may take longer",

  overview: {
    problem:
      "Linux server network interface DOWN, NO-CARRIER, missing IP, intermittent link, or unable to pass traffic.",
    goal:
      "Identify whether the failure is administrative, physical, driver/firmware, NetworkManager, IP configuration, L2/L3, cloud networking, virtualization, or orchestration related.",
    corePrinciple:
      "Observe first, compare against a known-good baseline, isolate one layer at a time, and make the smallest approved change.",
    importantDistinctions: [
      {
        state: "DOWN",
        meaning:
          "Interface may be administratively down or otherwise not operational. Inspect flags, device manager, and link state."
      },
      {
        state: "UP but LOWERLAYERDOWN",
        meaning:
          "A lower-layer dependency is down; inspect the parent interface, tunnel, bridge, bond, or virtual device."
      },
      {
        state: "UP but NO-CARRIER",
        meaning:
          "Administrative state may be enabled, but physical or virtual carrier is absent. Check cable, switch port, hypervisor, and provider."
      },
      {
        state: "UP and LOWER_UP",
        meaning:
          "Link-layer carrier is present; IP addressing, routes, ARP/neighbor discovery, firewall, MTU, and application connectivity may still fail."
      },
      {
        state: "Interface absent",
        meaning:
          "Investigate device enumeration, driver binding, PCI/USB hardware, VM hot-plug, namespace, or interface rename."
      },
      {
        state: "Interface UP but no IP",
        meaning:
          "Investigate DHCP, static address configuration, NetworkManager profile, VLAN, cloud-init, or address conflicts."
      }
    ]
  },

  productionScenario: {
    scenario:
      "A production Linux VM suddenly becomes unreachable. Monitoring reports host-down, SSH times out, and applications behind the server return 502 or connection errors.",
    timeline: [
      "T+00: Alert fires for host reachability and application errors.",
      "T+03: On-call engineer confirms affected hosts, traffic scope, and recent changes.",
      "T+05: Engineer uses cloud console or out-of-band access instead of repeatedly restarting networking.",
      "T+10: Interface flags, carrier state, addresses, routes, kernel logs, and NetworkManager status are collected.",
      "T+20: Evidence points to the correct layer: local interface, physical switch, hypervisor, cloud NIC, or IP configuration.",
      "T+30: Approved minimal recovery is applied and connectivity is validated from multiple locations.",
      "After recovery: Incident evidence, root cause, monitoring, and preventive work are recorded."
    ],
    impactQuestions: [
      "Is one host, one rack, one subnet, one availability zone, or the entire service affected?",
      "Are both inbound and outbound connections failing?",
      "Is the management interface also affected?",
      "Did a deployment, OS patch, driver update, reboot, cable move, firewall change, or cloud NIC change occur?",
      "Is this a primary interface, standby bond member, cluster heartbeat link, storage network, or Kubernetes node interface?",
      "Is there a redundant path that is healthy and carrying traffic?"
    ]
  },

  severity: [
    {
      level: "SEV-1",
      criteria:
        "Critical service unavailable, multiple production nodes disconnected, or no safe alternate management path.",
      action:
        "Declare incident, engage network/platform/cloud owners, preserve access, and follow approved failover or recovery procedures."
    },
    {
      level: "SEV-2",
      criteria:
        "Single production node or network path unavailable with degraded capacity or redundancy.",
      action:
        "Start incident tracking, verify redundancy, and coordinate a controlled recovery."
    },
    {
      level: "SEV-3",
      criteria:
        "Non-production host or redundant interface failure with no immediate service impact.",
      action:
        "Collect evidence, open a change or problem record, and repair in a controlled window."
    }
  ],

  safetyChecks: [
    "Confirm hostname, environment, cloud account/subscription/project, region, VM identity, and interface name.",
    "Verify whether the shell is local console, serial console, bastion, or SSH through the interface being investigated.",
    "Confirm out-of-band recovery access before changing a remote management interface.",
    "Capture current interface flags, addresses, routes, NetworkManager profile, and bond/bridge membership.",
    "Check maintenance windows, change approvals, HA status, and traffic-drain requirements.",
    "Do not bounce all NICs, restart networking blindly, flush routes, or delete connection profiles.",
    "Do not change production MTU, VLAN, MAC, IP, or duplex settings without evidence and an approved rollback.",
    "Never assume eth0 exists; modern systems often use names such as ens192, enp1s0, or cloud-specific names.",
    "Redact public IPs, MAC addresses, tokens, private keys, and sensitive topology before sharing logs.",
    "If the host is a firewall, router, Kubernetes control-plane node, storage node, or cluster heartbeat node, use its specific change procedure."
  ],

  evidenceCollection: {
    timestampAndIdentity: [
      "date -Is",
      "hostnamectl",
      "uname -a",
      "uptime",
      "ip -br link",
      "ip -br address"
    ],
    deviceAndLink: [
      "ip -details link show",
      "ip -s link show dev <IFACE>",
      "ethtool <IFACE>",
      "ethtool -i <IFACE>",
      "ethtool -S <IFACE>",
      "lspci -nnk",
      "lsusb"
    ],
    addressingAndRouting: [
      "ip address show dev <IFACE>",
      "ip route show table all",
      "ip rule show",
      "ip neigh show",
      "ip route get <DESTINATION_IP>"
    ],
    networkManager: [
      "systemctl is-active NetworkManager",
      "nmcli device status",
      "nmcli -f GENERAL,IP4,IP6 device show <IFACE>",
      "nmcli connection show",
      "journalctl -u NetworkManager --since '-30 min' --no-pager"
    ],
    kernelAndServices: [
      "journalctl -k --since '-30 min' --no-pager",
      "dmesg -T",
      "systemctl --failed",
      "systemctl status systemd-networkd --no-pager"
    ],
    virtualizationAndCloud: [
      "ip -d link show",
      "bridge link",
      "bridge vlan show",
      "cat /proc/net/bonding/<BOND_NAME>",
      "cloud provider console: NIC attachment, port state, security policy, route table, and recent activity"
    ],
    evidenceRules: [
      "Save the command, timestamp, host identity, output, and operator/change reference.",
      "Capture counters twice with a short interval to determine whether errors are increasing.",
      "Use a time window aligned with the alert and the last known-good event.",
      "Do not install missing diagnostic packages during an outage unless approved."
    ]
  },

  diagnosticDecisionTree: [
    {
      step: 1,
      question: "Does the interface appear in ip -br link?",
      ifYes:
        "Continue with administrative state, carrier state, and device details.",
      ifNo:
        "Check lspci -nnk, lsusb, journalctl -k, driver binding, VM NIC attachment, interface renaming, and network namespace.",
      commands: [
        "ip -br link",
        "lspci -nnk",
        "journalctl -k --since '-30 min' --no-pager"
      ]
    },
    {
      step: 2,
      question: "Is the interface administratively DOWN?",
      ifYes:
        "Check whether a supported connection manager, boot configuration, automation, or operator change intentionally disabled it. Confirm the correct interface before enabling it.",
      ifNo:
        "Continue to carrier and lower-layer checks.",
      commands: [
        "ip -details link show dev <IFACE>",
        "nmcli device status",
        "journalctl -u NetworkManager --since '-30 min' --no-pager"
      ]
    },
    {
      step: 3,
      question: "Is carrier present?",
      ifYes:
        "Investigate IP addresses, routes, neighbor discovery, packet counters, firewall, and application-level connectivity.",
      ifNo:
        "Inspect cable/transceiver, switch port, hypervisor vNIC, cloud attachment, parent interface, and driver logs.",
      commands: [
        "ethtool <IFACE>",
        "ip -s link show dev <IFACE>",
        "journalctl -k --since '-30 min' --no-pager"
      ]
    },
    {
      step: 4,
      question: "Is a valid expected IP address assigned?",
      ifYes:
        "Compare prefix, gateway, policy routing, and source address with the known-good baseline.",
      ifNo:
        "Check the intended NetworkManager profile, DHCP lease/client logs, static configuration, VLAN, and cloud-init.",
      commands: [
        "ip address show dev <IFACE>",
        "ip route show table all",
        "nmcli connection show"
      ]
    },
    {
      step: 5,
      question: "Can the host reach its expected next hop?",
      ifYes:
        "Move outward through the destination path, security rules, DNS, and application listener.",
      ifNo:
        "Check VLAN tagging, subnet/prefix, ARP/neighbor state, gateway availability, route selection, and L2 switching.",
      commands: [
        "ip neigh show",
        "ip route get <DESTINATION_IP>",
        "ping -c 3 <GATEWAY_IP>"
      ]
    },
    {
      step: 6,
      question: "Are link errors or drops increasing?",
      ifYes:
        "Compare driver counters, switch-port counters, duplex/speed, MTU, queue drops, and physical-path evidence.",
      ifNo:
        "Investigate routing, policy, firewall, remote endpoint, DNS, or application behavior.",
      commands: [
        "ip -s link show dev <IFACE>",
        "ethtool -S <IFACE>",
        "ethtool <IFACE>"
      ]
    },
    {
      step: 7,
      question: "Did a recent change correlate with the failure?",
      ifYes:
        "Compare the exact diff and revert only the responsible setting through the supported management plane.",
      ifNo:
        "Investigate hardware, provider events, intermittent carrier, driver/firmware, and recurring scheduled automation.",
      commands: [
        "journalctl -k --since '-2 hours' --no-pager",
        "journalctl -u NetworkManager --since '-2 hours' --no-pager",
        "systemctl --failed"
      ]
    }
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      name: "Confirm scope and access",
      actions: [
        "Identify all affected nodes and whether they share a rack, switch, subnet, region, image, or recent change.",
        "Check service health from an independent monitoring location.",
        "Establish console or alternate management access before touching the primary NIC."
      ],
      successCriteria:
        "Affected scope, business impact, incident owner, and recovery access are known."
    },
    {
      step: 2,
      name: "Capture the current state",
      commands: [
        "date -Is",
        "hostnamectl",
        "ip -br link",
        "ip -br address",
        "ip -details link show dev <IFACE>",
        "ip -s link show dev <IFACE>"
      ],
      decision:
        "Do not make changes until the exact device and state are identified, except where the incident commander authorizes immediate containment."
    },
    {
      step: 3,
      name: "Determine administrative versus physical state",
      commands: [
        "ethtool <IFACE>",
        "cat /sys/class/net/<IFACE>/operstate",
        "cat /sys/class/net/<IFACE>/carrier"
      ],
      notes: [
        "The sysfs carrier file may be unavailable or unreadable for some virtual devices or drivers.",
        "UP and LOWER_UP usually indicate administrative enablement and lower-layer carrier; they do not prove end-to-end connectivity.",
        "For virtual links, inspect the parent or peer device as well."
      ]
    },
    {
      step: 4,
      name: "Inspect device, driver, and firmware",
      commands: [
        "ethtool -i <IFACE>",
        "lspci -nnk",
        "journalctl -k --since '-60 min' --no-pager"
      ],
      lookFor: [
        "Driver initialization failures",
        "Firmware crash or reset messages",
        "Repeated link up/down events",
        "PCI errors or device disappearance",
        "Unsupported driver/firmware combinations",
        "Interface rename or device re-enumeration"
      ],
      action:
        "Compare the exact driver, firmware, kernel version, and hardware model with the vendor-supported baseline before changing or updating anything."
    },
    {
      step: 5,
      name: "Inspect network manager and desired configuration",
      commands: [
        "systemctl is-active NetworkManager",
        "nmcli device status",
        "nmcli -f GENERAL,IP4,IP6 device show <IFACE>",
        "nmcli connection show",
        "networkctl status <IFACE>"
      ],
      notes: [
        "Use commands relevant to the active manager; NetworkManager and systemd-networkd may not both manage the same interface.",
        "Check unmanaged devices, autoconnect settings, profile-to-device matching, DHCP, static addresses, and recent configuration changes.",
        "Do not print or share secrets embedded in connection profiles."
      ]
    },
    {
      step: 6,
      name: "Check L2, VLAN, bond, bridge, and virtual dependencies",
      commands: [
        "ip -d link show",
        "bridge link",
        "bridge vlan show",
        "cat /proc/net/bonding/<BOND_NAME>"
      ],
      lookFor: [
        "Bond member down or incorrectly selected active member",
        "Bridge port disabled or blocked",
        "VLAN ID or tagging mismatch",
        "Parent/peer veth or tunnel down",
        "Switch port err-disabled or administratively disabled",
        "Hypervisor virtual NIC disconnected"
      ],
      action:
        "Ask the network or virtualization team to compare both ends of the link and provide switch-port or virtual-port counters."
    },
    {
      step: 7,
      name: "Validate IP, routes, and neighbor discovery",
      commands: [
        "ip address show dev <IFACE>",
        "ip route show table all",
        "ip rule show",
        "ip neigh show",
        "ip route get <DESTINATION_IP>"
      ],
      lookFor: [
        "Missing or unexpected address",
        "Incorrect subnet prefix or default route",
        "Unexpected source IP or policy-routing rule",
        "Incomplete or failed neighbor entry",
        "Duplicate IP address evidence",
        "Unexpected VRF or network namespace"
      ]
    },
    {
      step: 8,
      name: "Test the path with controlled probes",
      commands: [
        "ping -c 3 <GATEWAY_IP>",
        "tracepath <DESTINATION_IP>",
        "nc -vz -w 3 <DESTINATION_IP> <PORT>",
        "curl -v --connect-timeout 3 https://<TARGET_HOST>/health"
      ],
      notes: [
        "ICMP may be filtered; failed ping alone does not prove the interface is broken.",
        "Use an approved destination and port; do not scan unrelated systems.",
        "A successful TCP connection does not prove the application is healthy.",
        "Check DNS separately from IP reachability."
      ]
    },
    {
      step: 9,
      name: "Collect packet-level evidence when necessary",
      commands: [
        "tcpdump -ni <IFACE> -c 100 host <DESTINATION_IP>",
        "tcpdump -ni <IFACE> -c 100 'arp or icmp'"
      ],
      interpretation: [
        "No outbound packet: check route selection, local policy, socket/application, namespace, or capture point.",
        "Outbound packet but no response: investigate return route, remote host, security policy, and upstream network.",
        "ARP requests without replies: investigate VLAN, L2 path, target availability, or address configuration.",
        "Packets visible on the host do not prove they reached the physical wire or remote endpoint."
      ],
      safety:
        "Keep captures short, use filters, protect captured payloads, and follow privacy/security policy."
    },
    {
      step: 10,
      name: "Correlate counters and recent changes",
      commands: [
        "ip -s link show dev <IFACE>",
        "ethtool -S <IFACE>",
        "journalctl -k --since '-2 hours' --no-pager",
        "journalctl -u NetworkManager --since '-2 hours' --no-pager"
      ],
      actions: [
        "Take two counter snapshots separated by a short interval.",
        "Compare interface counters with switch-port and cloud monitoring counters.",
        "Correlate timestamps with deployments, reboots, config-management runs, cloud events, and maintenance.",
        "Do not reset counters before recording the original values."
      ]
    },
    {
      step: 11,
      name: "Choose the smallest safe recovery",
      actions: [
        "Correct only the confirmed fault through its supported owner or management plane.",
        "Use a tested alternate path or failover where available.",
        "For remote network changes, maintain console access and a rollback procedure.",
        "If the issue is physical, escalate to the datacenter/provider instead of repeatedly bouncing the NIC."
      ]
    },
    {
      step: 12,
      name: "Validate, monitor, and close",
      actions: [
        "Confirm interface flags and carrier.",
        "Confirm expected IP addresses, routes, and neighbor entries.",
        "Test gateway, destination TCP port, and application health.",
        "Check packet errors/drops and application latency.",
        "Monitor through the agreed observation period and verify redundancy is restored.",
        "Attach evidence and a timeline to the incident record."
      ]
    }
  ],

  recoveryPlaybook: [
    {
      condition: "Confirmed accidental administrative DOWN",
      prerequisites: [
        "Correct interface confirmed",
        "Change approved",
        "No maintenance or intentional isolation",
        "Out-of-band access or safe alternate path available"
      ],
      action: "ip link set dev <IFACE> up",
      validation: [
        "ip -details link show dev <IFACE>",
        "ip -br address",
        "ip route show",
        "ethtool <IFACE>"
      ],
      caution:
        "This changes the live link state but may not restore its IP configuration or persist across reboot. The network manager may also reapply its configured state."
    },
    {
      condition: "NetworkManager connection is disconnected",
      prerequisites: [
        "Correct profile identified",
        "Profile reviewed for intended address, route, VLAN, and interface",
        "Console access and approval confirmed"
      ],
      action:
        "Use nmcli connection show to identify the intended profile, then activate only that profile with nmcli connection up <PROFILE> if appropriate.",
      caution:
        "Profile activation can change addresses and routes and may disconnect the current management session. Do not blindly restart NetworkManager."
    },
    {
      condition: "Physical link has no carrier",
      action:
        "Verify cable, optics, transceiver compatibility, switch port, speed/duplex negotiation, hypervisor vNIC state, or cloud NIC attachment.",
      caution:
        "Do not force speed/duplex or replace optics without vendor compatibility and switch-side evidence."
    },
    {
      condition: "Driver or firmware failure",
      action:
        "Collect kernel logs, driver version, firmware version, hardware model, and vendor diagnostics; follow the supported driver/firmware recovery procedure.",
      caution:
        "Do not unload a production NIC driver or reboot the host without a tested management path and an approved maintenance plan."
    },
    {
      condition: "Wrong IP, route, or VLAN configuration",
      action:
        "Compare the intended configuration with the last known-good version and revert only the proven incorrect setting through the configuration manager.",
      caution:
        "Do not flush all addresses or routes, change the default gateway speculatively, or overwrite network configuration files without a backup."
    },
    {
      condition: "Cloud or hypervisor NIC failure",
      action:
        "Verify virtual NIC attachment, subnet, route table, security controls, host status, and provider-side events using the provider console.",
      caution:
        "Do not detach/recreate a production NIC unless the provider-specific procedure, IP preservation, and rollback are confirmed."
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Interface absent",
      likelyCauses: [
        "NIC not enumerated",
        "Driver missing or failed",
        "VM NIC detached",
        "Interface rename",
        "Wrong network namespace"
      ],
      evidence:
        "lspci -nnk, lsusb, kernel logs, VM device inventory, namespace inventory"
    },
    {
      symptom: "DOWN without carrier",
      likelyCauses: [
        "Administrative shutdown",
        "Network manager profile issue",
        "Cable or switch port issue",
        "Virtual NIC disconnected"
      ],
      evidence:
        "ip link details, ethtool, NetworkManager logs, switch/hypervisor port state"
    },
    {
      symptom: "UP but NO-CARRIER",
      likelyCauses: [
        "Physical signal absent",
        "Switch-side port disabled",
        "Virtual parent or peer down",
        "Transceiver or cable failure"
      ],
      evidence:
        "ethtool, driver counters, switch port counters, hypervisor/provider telemetry"
    },
    {
      symptom: "UP and carrier but no IP",
      likelyCauses: [
        "DHCP failure",
        "Incorrect profile",
        "Static address removed",
        "VLAN mismatch",
        "NetworkManager unmanaged state"
      ],
      evidence:
        "ip address, nmcli device/profile status, DHCP logs, switch VLAN configuration"
    },
    {
      symptom: "IP exists but gateway unreachable",
      likelyCauses: [
        "Wrong prefix",
        "Wrong VLAN",
        "Gateway down",
        "ARP/neighbor issue",
        "Duplicate address"
      ],
      evidence:
        "ip route, ip neigh, packet capture, switch VLAN and gateway state"
    },
    {
      symptom: "Link flaps repeatedly",
      likelyCauses: [
        "Cable or optics degradation",
        "Driver/firmware reset",
        "Power or thermal issue",
        "Switch port instability",
        "Automation changing interface state"
      ],
      evidence:
        "Timestamped kernel logs, ethtool counters, switch events, automation audit logs"
    },
    {
      symptom: "Only large packets fail",
      likelyCauses: [
        "MTU mismatch",
        "Path MTU discovery blocked",
        "Tunnel overhead mismatch"
      ],
      evidence:
        "tracepath, interface MTU, tunnel configuration, approved packet-size tests"
    }
  ],

  cloudAndPlatformChecks: {
    aws: [
      "Check EC2 instance status checks and attached ENIs.",
      "Verify subnet route table, security groups, network ACLs, and relevant VPC reachability evidence.",
      "Compare instance-side interface configuration with expected ENI addresses and routes.",
      "Use AWS console or supported diagnostics before modifying or detaching an ENI."
    ],
    azure: [
      "Check VM resource health and NIC provisioning/attachment.",
      "Verify private IP configuration, subnet NSG, effective routes, and next-hop behavior.",
      "Use Network Watcher IP flow verification or connection troubleshooting where supported.",
      "Do not recreate a NIC without verifying IP configuration and resource dependencies."
    ],
    gcp: [
      "Check VM status, attached network interfaces, subnet, VPC routes, and firewall rules.",
      "Use Connectivity Tests and relevant network intelligence tools where supported.",
      "Inspect guest OS logs alongside cloud-side evidence."
    ],
    vmwareAndVirtualization: [
      "Verify virtual NIC is connected and configured to connect at power-on where intended.",
      "Check port group, VLAN, distributed switch, host uplink, and physical switch path.",
      "Confirm whether the guest interface is connected to the expected virtual network."
    ],
    kubernetes: [
      "Check node Ready state and node conditions.",
      "Inspect CNI plugin health, pod events, node routes, and relevant interfaces.",
      "For a node-wide network failure, use approved out-of-band node access.",
      "Do not delete CNI interfaces or restart networking components blindly."
    ],
    containersAndNamespaces: [
      "Compare host and container network namespaces.",
      "Inspect ip netns list and ip -n <NAMESPACE> link where applicable.",
      "Check veth peers, bridge ports, CNI state, and parent interface.",
      "Do not assume a container interface failure means the physical host NIC is down."
    ]
  },

  commandsByPurpose: {
    interfaceState: [
      "ip -br link",
      "ip -details link show dev <IFACE>",
      "cat /sys/class/net/<IFACE>/operstate"
    ],
    hardware: [
      "ethtool <IFACE>",
      "ethtool -i <IFACE>",
      "lspci -nnk",
      "journalctl -k --since '-30 min' --no-pager"
    ],
    networkManager: [
      "nmcli device status",
      "nmcli device show <IFACE>",
      "nmcli connection show"
    ],
    routesAndNeighbors: [
      "ip route show table all",
      "ip rule show",
      "ip neigh show",
      "ip route get <DESTINATION_IP>"
    ],
    packetDiagnostics: [
      "ping -c 3 <GATEWAY_IP>",
      "tracepath <DESTINATION_IP>",
      "nc -vz -w 3 <DESTINATION_IP> <PORT>",
      "tcpdump -ni <IFACE> -c 100 host <DESTINATION_IP>"
    ]
  },

  prevention: {
    monitoring: [
      "Alert on interface state changes and repeated link flaps.",
      "Monitor RX/TX errors, drops, carrier changes, and driver resets.",
      "Monitor node reachability separately from application health.",
      "Track bond redundancy and failover events.",
      "Alert on DHCP failures and missing expected addresses.",
      "Correlate interface state changes with config-management and deployment events."
    ],
    changeManagement: [
      "Review network configuration changes before production rollout.",
      "Test NIC, kernel, driver, firmware, and MTU changes in a representative environment.",
      "Maintain a known-good network configuration and tested rollback steps.",
      "Keep cloud serial console, hypervisor console, or another management path available.",
      "Test failover and recovery procedures during planned exercises."
    ],
    automation: [
      "Validate interface names and intended profile mapping before applying changes.",
      "Use staged rollouts and canary nodes for network changes.",
      "Make automation idempotent and record previous values.",
      "Require explicit approval for destructive network changes.",
      "Verify post-change reachability before declaring success."
    ]
  },

  incidentReportTemplate: {
    incidentId: "",
    startTime: "",
    detectionTime: "",
    recoveryTime: "",
    environment: "",
    affectedHosts: [],
    affectedInterfaces: [],
    customerImpact: "",
    severity: "",
    lastKnownGood: "",
    recentChanges: [],
    evidenceCollected: [],
    confirmedRootCause: "",
    contributingFactors: [],
    recoveryActions: [],
    validationResults: [],
    rollbackUsed: false,
    preventionTasks: [],
    ownersAndDueDates: [],
    lessonsLearned: ""
  },

  handsOnLabs: [
    {
      name: "Lab 1 - Identify interface state",
      environment: "Disposable Linux VM only",
      commands: [
        "ip -br link",
        "ip -br address",
        "ip -details link show"
      ],
      objective:
        "Identify administrative flags, operational state, and assigned addresses without changing anything."
    },
    {
      name: "Lab 2 - Practice safe recovery",
      environment: "Disposable VM with console access and a non-management test interface",
      commands: [
        "ip link show dev <TEST_IFACE>",
        "sudo ip link set dev <TEST_IFACE> down",
        "ip link show dev <TEST_IFACE>",
        "sudo ip link set dev <TEST_IFACE> up"
      ],
      objective:
        "Observe the effect of changing administrative state and verify that interface UP does not guarantee IP connectivity.",
      warning:
        "Never use the primary remote management interface for this exercise."
    },
    {
      name: "Lab 3 - Compare link and IP state",
      environment: "Disposable VM",
      commands: [
        "ethtool <IFACE>",
        "ip address show dev <IFACE>",
        "ip route show",
        "ip neigh show"
      ],
      objective:
        "Distinguish carrier problems from address, route, and neighbor-discovery problems."
    },
    {
      name: "Lab 4 - Simulate incident evidence collection",
      environment: "Non-production Linux host",
      commands: [
        "date -Is",
        "ip -s link show dev <IFACE>",
        "journalctl -k --since '-30 min' --no-pager",
        "ethtool -S <IFACE>"
      ],
      objective:
        "Create a timestamped evidence bundle and compare counters across two observations."
    }
  ],

  interviewQuestions: [
    {
      question: "Interface DOWN and NO-CARRIER madhya difference enti?",
      expectedAnswer:
        "DOWN administrative state-ni indicate cheyyavachu. NO-CARRIER ante enabled interface ki lower-layer carrier ledu. Exact interpretation kosam flags, driver, and device type chudali."
    },
    {
      question: "Interface UP unna application enduku unreachable avvachu?",
      expectedAnswer:
        "IP/prefix, route, neighbor discovery, firewall, DNS, MTU, remote endpoint, or application listener problem undavachu."
    },
    {
      question: "Production SSH interface DOWN ayithe first em chesthav?",
      expectedAnswer:
        "Scope and impact confirm chestha, alternate console access verify chestha, evidence collect chestha, change approval and rollback plan lekunda interface bounce cheyyanu."
    },
    {
      question: "ethtool Link detected: no ante?",
      expectedAnswer:
        "Ethernet link carrier detect kaaledani artham. Cable/optics, switch port, virtual NIC, parent device, and driver logs verify cheyyali."
    },
    {
      question: "ip link set up chesina tarvatha connectivity enduku raakapovachu?",
      expectedAnswer:
        "Administrative state maatrame marchindi; IP, DHCP, route, VLAN, NetworkManager profile, gateway, and upstream path inka fail avvachu."
    },
    {
      question: "How do you prove the root cause?",
      expectedAnswer:
        "Timestamp correlation, interface and driver counters, kernel logs, packet capture, switch/provider telemetry, and a controlled validation test tho."
    }
  ],

  finalChecklist: [
    "Correct host, environment, and interface confirmed",
    "Incident scope and business impact recorded",
    "Out-of-band access and rollback verified",
    "Interface flags and carrier state captured",
    "Driver, firmware, and kernel logs reviewed",
    "Network manager and desired configuration checked",
    "Bond, bridge, VLAN, virtual parent, and cloud NIC checked",
    "IP address, routes, policy rules, and neighbors checked",
    "Packet counters and targeted connectivity tests collected",
    "Root cause supported by evidence",
    "Smallest approved fix applied",
    "Application and network paths validated",
    "Redundancy and monitoring restored",
    "Incident report and preventive tasks assigned"
  ],

  references: [
    {
      title: "Linux ip-link manual",
      url: "https://man7.org/linux/man-pages/man8/ip-link.8.html"
    },
    {
      title: "Linux ip manual",
      url: "https://man7.org/linux/man-pages/man8/ip.8.html"
    },
    {
      title: "Red Hat Networking documentation",
      url: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/configuring_and_managing_networking/"
    },
    {
      title: "Red Hat network interface packet drops",
      url: "https://access.redhat.com/solutions/21301"
    },
    {
      title: "NetworkManager documentation",
      url: "https://networkmanager.dev/docs/"
    },
    {
      title: "AWS VPC troubleshooting",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/ troubleshooting.html"
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
      title: "Kubernetes cluster troubleshooting",
      url: "https://kubernetes.io/docs/tasks/debug/"
    }
  ]
} as const;

export default interfaceDownGuide;
