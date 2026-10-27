export interface BandwidthSaturationGuide {
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

export const bandwidthSaturationGuide: BandwidthSaturationGuide = {
  title: "Network Bandwidth Saturation Troubleshooting",
  slug: "bandwidth-saturation",
  category: "Networking",
  severity: "High / Critical",
  estimatedTime: "30–120 minutes",

  overview: `
Network bandwidth saturation occurs when traffic demand approaches or exceeds
the usable capacity of a network link, network interface, VPN tunnel, gateway,
load balancer, or cloud networking resource.

Typical consequences include increased latency, packet drops, TCP retransmits,
slow application responses, timeouts, and unstable connections.

Bandwidth saturation is not always caused by a single large download. It can
result from many small flows, replication jobs, backups, container image pulls,
log forwarding, software updates, cross-region traffic, or an unexpected traffic
spike.

Important distinctions:

- Bandwidth saturation: available link capacity is being consumed.
- Packet loss: packets are dropped; congestion is one possible cause.
- High latency: may result from congestion, queuing, routing, or application
  processing.
- High CPU: a router or firewall may be unable to process traffic even when
  the physical link is not full.
- Interface errors: physical or driver issues can cause drops independently
  of bandwidth usage.
- Cloud throttling: a service or instance may have a bandwidth allowance or
  performance limit separate from the apparent interface speed.

A production diagnosis must compare traffic rates, link capacity, packet drops,
interface errors, latency, retransmits, and the actual application symptoms.

Do not conclude that a network is saturated from a single high CPU reading,
a single speed-test result, or one interface counter. Establish where the
bottleneck exists and whether it is persistent, intermittent, or traffic-specific.
`,

  symptoms: [
    "Application response times increase during busy periods.",
    "Users report slow downloads, uploads, or file transfers.",
    "TCP retransmissions and connection timeouts increase.",
    "Monitoring shows network utilization approaching the configured capacity.",
    "Packet drops or transmit queue drops increase under load.",
    "VPN connections become slow when large transfers start.",
    "Database replication or backup jobs take much longer than expected.",
    "Kubernetes workloads experience slow image pulls or cross-node traffic.",
    "Cloud applications experience throughput lower than expected.",
    "Video calls, interactive sessions, or remote administration become unstable.",
    "A single host consumes most of a shared link's capacity.",
    "Network utilization increases immediately after a deployment or scheduled job.",
    "The physical link is not fully utilized, but a firewall, CPU, or service limit is reached.",
    "Latency increases sharply during large file transfers.",
    "The issue affects one direction more than the other."
  ],

  incidentScenario: `
Production incident:

09:00 - A scheduled backup starts transferring a large dataset.
09:05 - Application latency begins increasing.
09:08 - Users report slow responses and intermittent timeouts.
09:10 - Network monitoring shows high outbound utilization on a shared interface.
09:12 - TCP retransmissions and queue drops increase.
09:15 - The database team reports delayed replication.
09:18 - The incident commander opens a high-severity incident.

Initial hypothesis:
A backup workload is consuming bandwidth needed by latency-sensitive production
traffic.

The team must establish whether the bottleneck is the source interface, switch
uplink, firewall, VPN, cloud gateway, destination interface, or remote network.

Do not immediately terminate every large transfer. First identify the affected
link, business-critical flows, approved traffic priorities, and available
mitigation options.

A high utilization percentage alone is insufficient. Compare actual throughput,
link capacity, drops, latency, direction, and service-specific performance.
`,

  impactAssessment: [
    "Identify the affected production applications and business functions.",
    "Determine whether production, staging, development, or all environments are affected.",
    "Identify the source and destination hosts, subnets, regions, and network links.",
    "Determine whether inbound, outbound, or both traffic directions are affected.",
    "Identify affected ports, protocols, and high-volume traffic classes.",
    "Estimate the number of affected users and the duration of degradation.",
    "Check whether database replication, backups, deployments, or data pipelines are delayed.",
    "Determine whether the problem affects one interface, an uplink, a VPN, a gateway, or an entire region.",
    "Compare the current rate with the expected peak and the usable link capacity.",
    "Check whether packet drops, latency, retransmissions, or errors increased at the same time.",
    "Identify scheduled jobs or recent deployments that correlate with the incident.",
    "Assign incident ownership to networking, cloud, platform, and application teams as needed.",
    "Communicate the impact and expected update interval to stakeholders."
  ],

  safetyChecks: [
    "Confirm the correct host, environment, cloud account, region, interface, and network device.",
    "Use read-only commands to establish the initial baseline.",
    "Do not assume a 1 Gbps interface can always deliver 1 Gbps of application throughput.",
    "Confirm whether the interface rate is physical capacity, a virtual limit, or a cloud performance allowance.",
    "Check production change approvals before modifying QoS, routing, firewall, or interface settings.",
    "Do not disable firewall inspection or security controls to improve throughput without an approved risk assessment.",
    "Do not terminate backup, replication, or business-critical transfers without confirming ownership and impact.",
    "Avoid restarting network interfaces remotely when doing so could disconnect administrative access.",
    "Record interface counters before and after each measurement interval.",
    "Use bounded packet captures and avoid collecting unrelated sensitive traffic.",
    "Check whether the monitoring system reports bits per second or bytes per second.",
    "Verify whether utilization is measured per direction or across a full-duplex interface.",
    "Prepare rollback steps before changing QoS, traffic shaping, or bandwidth settings.",
    "Use controlled tests against authorized endpoints.",
    "Preserve timestamps, metrics, commands, configuration versions, and change records."
  ],

  evidenceCollection: [
    "Incident ID, severity, start time, and business impact.",
    "Affected application, source host, destination host, and network path.",
    "Interface name, link speed, negotiated speed, and full/half-duplex state where applicable.",
    "Inbound and outbound throughput samples with timestamps.",
    "Interface packet counters, drops, errors, overruns, and carrier errors.",
    "TCP retransmissions, connection failures, and application latency.",
    "Switch port utilization, queue drops, and interface errors where available.",
    "Firewall CPU, connection count, throughput, and drop counters.",
    "VPN tunnel throughput, packet loss, and tunnel health.",
    "Cloud monitoring metrics, network flow logs, and applicable instance performance metrics.",
    "Kubernetes node, Pod, CNI, and cross-node traffic metrics.",
    "Top talkers, flow records, or approved packet captures.",
    "Scheduled backups, replication jobs, deployments, and bulk transfers.",
    "QoS policies, traffic shaping configuration, and recent configuration changes.",
    "Last known good measurements and the expected capacity baseline."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the symptoms and establish a baseline",
      objective: "Identify the affected source, destination, direction, and application.",
      commands: [
        "date -Is",
        "hostname -f",
        "ip -br address",
        "ip route get <destination-ip>",
        "ping -c 10 <destination-ip>",
        "curl -sS -o /dev/null -w 'connect=%{time_connect} total=%{time_total}\\n' --connect-timeout 5 http://<destination-host>/health"
      ],
      interpretOutput: [
        "The timestamp and hostname establish where the measurement was taken.",
        "Interface and route information identify the source network path.",
        "Ping latency and loss provide useful evidence only when ICMP is permitted.",
        "A successful ping does not prove that application throughput is healthy.",
        "The curl timing example measures one HTTP request; it is not a bandwidth benchmark.",
        "If only one application is slow, compare its path with a known-good service before blaming the network."
      ],
      nextActions: [
        "Record the affected source and destination.",
        "Identify the actual interface used by the traffic.",
        "Collect a baseline from an unaffected host if available.",
        "Continue to interface measurements and application-level tests."
      ]
    },
    {
      step: 2,
      title: "Inspect interface speed, counters, and link state",
      objective: "Check the physical or virtual interface for capacity, errors, and drops.",
      commands: [
        "ip -s link show",
        "ip -br link",
        "ethtool <interface>",
        "ethtool -S <interface>",
        "cat /proc/net/dev"
      ],
      interpretOutput: [
        "ip -s link shows packet and byte counters along with some drop and error counters.",
        "ethtool may show negotiated speed, duplex, and link state for supported physical devices.",
        "Virtual cloud interfaces may not expose a conventional physical link speed.",
        "CRC, carrier, or physical-layer errors can indicate a cable, transceiver, switch port, or driver issue.",
        "RX/TX drops can be caused by congestion, queue limits, driver problems, or other resource constraints.",
        "Cumulative counters should be compared over time; a nonzero lifetime counter does not prove a current incident."
      ],
      nextActions: [
        "Record counters at the beginning and end of a fixed interval.",
        "Calculate the rate of change rather than relying on lifetime totals.",
        "Compare the interface's reported capabilities with the intended design.",
        "If physical errors increase, inspect the switch port and physical path."
      ]
    },
    {
      step: 3,
      title: "Calculate actual bandwidth utilization",
      objective: "Measure throughput over a known interval and compare it with usable capacity.",
      commands: [
        "sar -n DEV 1 10",
        "ifstat 1 10",
        "ip -s link show dev <interface>",
        "cat /sys/class/net/<interface>/statistics/rx_bytes",
        "cat /sys/class/net/<interface>/statistics/tx_bytes"
      ],
      interpretOutput: [
        "sar and ifstat report interface activity over time when the relevant tools are installed.",
        "sysfs byte counters are cumulative; subtract two readings to calculate bytes transferred during the interval.",
        "Bytes per second multiplied by eight gives bits per second.",
        "For a known full-duplex interface, inbound and outbound capacities are generally considered separately.",
        "A high average can hide short traffic bursts, so inspect the sampling interval and peak behavior.",
        "The usable capacity may be lower than nominal link speed due to protocol overhead, shaping, or service limits."
      ],
      nextActions: [
        "Measure RX and TX separately.",
        "Compare measured throughput with the actual link or service allowance.",
        "Repeat measurements during the reported slow period.",
        "Check whether saturation correlates with latency and drops."
      ]
    },
    {
      step: 4,
      title: "Check packet drops, retransmissions, and socket behavior",
      objective: "Determine whether congestion or host-level resource limits are affecting traffic.",
      commands: [
        "nstat -az",
        "ss -s",
        "ss -ti",
        "netstat -s",
        "ip -s link show"
      ],
      interpretOutput: [
        "nstat exposes kernel network counters where supported.",
        "TCP retransmission counters increasing during the incident can indicate packet loss or severe congestion, but other causes are possible.",
        "ss -s summarizes socket state and can reveal an unusual number of sockets.",
        "ss -ti can display TCP information such as retransmission and congestion-control details for supported connections.",
        "Counters should be compared across time windows because they may be cumulative.",
        "Host-level drops can occur before packets reach the physical interface."
      ],
      nextActions: [
        "Capture the initial and final counter values.",
        "Correlate retransmissions with throughput, latency, and interface drops.",
        "Check whether the bottleneck occurs on the source, destination, or an intermediate device.",
        "Avoid changing TCP kernel parameters before locating the bottleneck."
      ]
    },
    {
      step: 5,
      title: "Identify high-volume traffic and top talkers",
      objective: "Find which workloads or flows consume the available capacity.",
      commands: [
        "sudo nethogs <interface>",
        "sudo iftop -i <interface>",
        "sudo tcpdump -ni <interface> -c 200 'host <destination-ip>'",
        "sudo ss -tpn"
      ],
      interpretOutput: [
        "nethogs can associate traffic with processes where the operating system and permissions permit.",
        "iftop summarizes traffic between hosts and may not identify the originating application.",
        "tcpdump captures packets matching the filter; a small sample is not a complete traffic accounting system.",
        "Encrypted traffic usually prevents application payload inspection, although endpoint and flow metadata may remain visible.",
        "A single high-volume flow may be legitimate, such as a backup or replication transfer."
      ],
      nextActions: [
        "Identify the owner and business purpose of high-volume flows.",
        "Correlate flows with scheduled jobs, deployments, and backup windows.",
        "Use approved flow telemetry or network monitoring for longer-term analysis.",
        "Do not terminate a flow until its impact and owner are understood."
      ]
    },
    {
      step: 6,
      title: "Inspect switch ports, uplinks, and queue drops",
      objective: "Determine whether the bottleneck is beyond the host interface.",
      commands: [
        "ip -s link show",
        "ethtool -S <interface>",
        "show interfaces",
        "show interfaces counters errors",
        "show interfaces queue"
      ],
      interpretOutput: [
        "The final three commands are generic examples; actual syntax depends on the switch vendor and model.",
        "A host interface may be below capacity while an upstream shared uplink is saturated.",
        "Queue drops can indicate congestion or a configured queue limit.",
        "CRC errors and physical-layer errors suggest a different problem from ordinary capacity saturation.",
        "Compare both ends of the link and the relevant upstream ports."
      ],
      nextActions: [
        "Request read-only switch metrics from the network team.",
        "Trace the path from host access port through uplinks to the gateway.",
        "Identify the first link or queue showing sustained congestion or errors.",
        "Check whether traffic can use an approved alternate path."
      ]
    },
    {
      step: 7,
      title: "Investigate firewall, NAT, and VPN bottlenecks",
      objective: "Determine whether security appliances or encrypted tunnels limit throughput.",
      commands: [
        "ip -s link show",
        "ss -s",
        "sudo tcpdump -ni <interface> 'host <destination-ip>'",
        "ip route get <destination-ip>"
      ],
      interpretOutput: [
        "A firewall can become CPU-bound or hit connection-table limits before the physical link reaches capacity.",
        "VPN throughput may be constrained by encryption CPU, tunnel capacity, packet size, or the remote endpoint.",
        "A growing connection count does not independently prove that a firewall is saturated.",
        "Captures on both sides can show whether packets arrive and leave the appliance.",
        "Do not assume that a low host interface rate means the entire path has spare capacity."
      ],
      nextActions: [
        "Collect appliance throughput, CPU, connection count, and drop metrics.",
        "Compare VPN tunnel counters with host-side traffic.",
        "Check tunnel MTU and packet fragmentation if symptoms suggest packet-size problems.",
        "Escalate to the appliance owner with timestamps and affected flows."
      ]
    },
    {
      step: 8,
      title: "Inspect AWS network performance",
      objective: "Check cloud interface metrics, traffic volume, and applicable performance limits.",
      commands: [
        "aws sts get-caller-identity",
        "aws ec2 describe-instances --instance-ids <instance-id> --region <region>",
        "aws ec2 describe-network-interfaces --network-interface-ids <eni-id> --region <region>",
        "aws cloudwatch list-metrics --namespace AWS/EC2 --region <region>"
      ],
      interpretOutput: [
        "Confirm the account, region, and target instance before collecting data.",
        "Describe commands reveal resource configuration, not a direct measurement of current throughput.",
        "CloudWatch metric availability and names depend on the resource and monitoring configuration.",
        "Compare instance type capabilities and relevant performance documentation with measured traffic.",
        "Check the full path, including load balancers, NAT gateways, transit gateways, and VPNs.",
        "A cloud service's published maximum is not a guarantee that every individual flow will achieve that rate."
      ],
      nextActions: [
        "Inspect available CloudWatch network metrics for the resource.",
        "Review flow logs and relevant gateway metrics.",
        "Check instance network performance characteristics and burst behavior where applicable.",
        "Determine whether the bottleneck is the instance, a gateway, a shared route, or the destination."
      ]
    },
    {
      step: 9,
      title: "Investigate Kubernetes network consumption",
      objective: "Identify noisy Pods, cross-node traffic, image pulls, or node-level bottlenecks.",
      commands: [
        "kubectl get nodes -o wide",
        "kubectl top nodes",
        "kubectl top pods -A",
        "kubectl get pods -A -o wide",
        "kubectl get events -A --sort-by=.lastTimestamp",
        "ip -s link show"
      ],
      interpretOutput: [
        "kubectl top reports resource metrics when the metrics pipeline is available; it is not a complete network bandwidth monitor.",
        "Pod placement and node addresses help identify cross-node traffic patterns.",
        "A node with high traffic may be serving multiple workloads or acting as a network gateway.",
        "Image pulls, backups, log forwarding, and service-to-service traffic can compete for shared capacity.",
        "NetworkPolicy defines traffic permissions but does not itself measure bandwidth."
      ],
      nextActions: [
        "Identify high-traffic workloads using supported CNI or network telemetry.",
        "Compare node-level metrics with application and Pod activity.",
        "Inspect image-pull bursts and deployment timing.",
        "Apply workload-specific limits or scheduling changes only when supported and tested."
      ]
    },
    {
      step: 10,
      title: "Test throughput in a controlled environment",
      objective: "Measure achievable throughput without causing another production incident.",
      commands: [
        "iperf3 -s",
        "iperf3 -c <test-server-ip> -t 10",
        "iperf3 -c <test-server-ip> -t 10 -R",
        "iperf3 -c <test-server-ip> -t 10 -P 4"
      ],
      interpretOutput: [
        "Run the server and client only on authorized test systems.",
        "The standard command starts an iperf3 server; run it on the designated test endpoint.",
        "The reverse test measures traffic in the opposite direction.",
        "Parallel streams can change the achieved throughput and should not be used as an unapproved production load test.",
        "A test result measures the test path under those conditions, not the guaranteed capacity of every application flow."
      ],
      nextActions: [
        "Obtain approval and a suitable maintenance or test window.",
        "Use a controlled duration and agreed traffic ceiling.",
        "Test each direction separately.",
        "Compare the result with interface metrics, packet drops, and application behavior."
      ]
    },
    {
      step: 11,
      title: "Check QoS, shaping, and traffic policing",
      objective: "Determine whether a configured bandwidth policy limits the affected traffic.",
      commands: [
        "tc -s qdisc show dev <interface>",
        "tc -s class show dev <interface>",
        "tc filter show dev <interface>",
        "ip -s link show dev <interface>"
      ],
      interpretOutput: [
        "tc output shows Linux traffic-control queues, classes, filters, and statistics where configured.",
        "Queue drops can indicate congestion or a shaping policy.",
        "A configured rate limit may be intentional and lower than physical link speed.",
        "A traffic class can be constrained even when other traffic classes have spare capacity.",
        "Not all cloud networking controls are visible through Linux tc."
      ],
      nextActions: [
        "Compare the effective policy with the approved QoS design.",
        "Identify the affected traffic class and its configured rate.",
        "Check whether a recent change altered shaping or policing.",
        "Change the policy only with approval and a rollback plan."
      ]
    },
    {
      step: 12,
      title: "Correlate the incident with recent changes",
      objective: "Find whether a deployment, backup, or network configuration change introduced the problem.",
      commands: [
        "git log --oneline -15",
        "git diff --stat <last-known-good-commit>..<current-commit>",
        "git diff <last-known-good-commit>..<current-commit>",
        "terraform plan",
        "terraform state list"
      ],
      interpretOutput: [
        "Git history shows repository changes but does not prove that changes reached production.",
        "Terraform plan should be reviewed before any apply operation.",
        "Terraform state list inventories managed resources and does not measure throughput.",
        "Correlate commits with pipeline logs, deployment events, audit logs, and network telemetry.",
        "A scheduled backup can correlate with saturation even if no network configuration changed."
      ],
      nextActions: [
        "Identify the last known good measurement and configuration.",
        "Compare traffic patterns before and during the incident.",
        "Determine whether the cause is traffic volume, policy, capacity, or a device limitation.",
        "Select the least disruptive mitigation that addresses the confirmed cause."
      ]
    },
    {
      step: 13,
      title: "Apply a controlled mitigation",
      objective: "Restore critical service while preserving network security and business-critical workloads.",
      commands: [
        "tc -s qdisc show dev <interface>",
        "ip -s link show dev <interface>",
        "ss -s"
      ],
      interpretOutput: [
        "These are verification commands, not automatic remediation commands.",
        "If a known bulk transfer consumes the link, a workload owner may be able to reschedule or throttle it.",
        "If QoS is misconfigured, the policy owner must verify the intended class and rate.",
        "If a physical link is faulty, changing application concurrency will not repair the underlying errors.",
        "If a cloud performance limit is reached, the remedy depends on the specific resource and service limits."
      ],
      nextActions: [
        "Choose a mitigation based on the confirmed bottleneck.",
        "Obtain the necessary approval and notify workload owners.",
        "Apply a bounded traffic reduction, corrected QoS policy, or approved capacity change.",
        "Measure the effect immediately and be ready to roll back."
      ]
    },
    {
      step: 14,
      title: "Validate recovery and monitor for recurrence",
      objective: "Prove that critical application performance has recovered.",
      commands: [
        "sar -n DEV 1 10",
        "ip -s link show",
        "nstat -az",
        "ss -s",
        "curl -fsS --connect-timeout 5 http://<destination-host>/health"
      ],
      interpretOutput: [
        "Compare throughput and interface counters with the pre-incident baseline.",
        "Check whether packet drops and retransmissions are still increasing.",
        "Confirm application health and latency from representative clients.",
        "A reduction in utilization is not a success if important traffic is still failing.",
        "Use the same measurement intervals before and after the change."
      ],
      nextActions: [
        "Repeat the original failing application tests.",
        "Validate critical traffic in both directions.",
        "Monitor utilization, drops, retransmits, and latency during the observation period.",
        "Record the recovery evidence and close the incident only when acceptance criteria are met."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Interface utilization stays near usable capacity.",
      likelyCause: "Traffic demand exceeds available link capacity.",
      verification: "Measure RX/TX rates over time and compare them with link capacity and drops.",
      resolution: "Reduce or reschedule non-critical traffic, apply approved QoS, or increase capacity."
    },
    {
      symptom: "Latency rises during backups or replication.",
      likelyCause: "Bulk traffic competes with latency-sensitive application flows.",
      verification: "Correlate job timing, interface rates, queue drops, and application latency.",
      resolution: "Schedule bulk jobs appropriately or apply a reviewed traffic policy."
    },
    {
      symptom: "Throughput is low but the interface is not saturated.",
      likelyCause: "Remote endpoint limits, TCP behavior, CPU constraints, loss, or an intermediate bottleneck.",
      verification: "Measure both endpoints, inspect retransmits, CPU, path metrics, and controlled throughput tests.",
      resolution: "Fix the proven endpoint, loss, path, or resource limitation."
    },
    {
      symptom: "RX/TX drop counters increase.",
      likelyCause: "Queue congestion, driver limits, ring-buffer pressure, or device resource exhaustion.",
      verification: "Compare interface counters, driver statistics, queue metrics, and packet rates.",
      resolution: "Correct the confirmed congestion or host/device resource problem."
    },
    {
      symptom: "CRC or carrier errors increase.",
      likelyCause: "Cable, transceiver, switch port, duplex, or physical-layer fault.",
      verification: "Compare counters on both ends and inspect physical link state.",
      resolution: "Repair the physical path or correct the link configuration."
    },
    {
      symptom: "One host consumes most of the shared link.",
      likelyCause: "Backup, replication, large download, image pull, or unexpected workload.",
      verification: "Inspect approved flow telemetry, process-level tools, and scheduled jobs.",
      resolution: "Coordinate with the workload owner and apply a controlled schedule or rate limit."
    },
    {
      symptom: "VPN throughput is lower than expected.",
      likelyCause: "Encryption CPU, tunnel MTU, remote capacity, or tunnel service limits.",
      verification: "Compare tunnel counters, CPU, packet loss, MTU, and both endpoint rates.",
      resolution: "Correct the verified limitation or use an approved capacity upgrade."
    },
    {
      symptom: "AWS traffic slows while the host interface appears healthy.",
      likelyCause: "Instance performance characteristics, gateway capacity, path bottleneck, or service limits.",
      verification: "Inspect CloudWatch, flow logs, instance configuration, and gateway metrics.",
      resolution: "Correct the bottleneck or choose a suitable supported resource configuration."
    },
    {
      symptom: "Kubernetes node bandwidth spikes during deployments.",
      likelyCause: "Concurrent image pulls, workload startup, logging, or cross-node transfers.",
      verification: "Correlate deployment events, node traffic, Pod placement, and CNI telemetry.",
      resolution: "Control rollout concurrency or tune workload scheduling using a tested policy."
    },
    {
      symptom: "High retransmissions occur without high interface utilization.",
      likelyCause: "Packet loss, intermittent link errors, receiver problems, or congestion elsewhere.",
      verification: "Compare TCP statistics, interface errors, packet captures, and intermediate device metrics.",
      resolution: "Fix the verified loss point or endpoint issue."
    },
    {
      symptom: "One direction is slow while the other is healthy.",
      likelyCause: "Directional congestion, asymmetric capacity, policing, or remote endpoint limits.",
      verification: "Measure both directions independently and inspect policies at each hop.",
      resolution: "Correct the directional bottleneck or traffic policy."
    },
    {
      symptom: "QoS queue drops rise for application traffic.",
      likelyCause: "Traffic class limits, queue congestion, or incorrect classification.",
      verification: "Inspect tc statistics or vendor-specific QoS counters and policy.",
      resolution: "Correct classification or rate settings after review and approval."
    },
    {
      symptom: "Network utilization rises immediately after a change.",
      likelyCause: "Unexpected replication, deployment traffic, misconfiguration, or a workload change.",
      verification: "Correlate deployment records, traffic flows, and interface metrics.",
      resolution: "Correct the source of excess traffic or roll back the verified harmful change."
    }
  ],

  advancedScenarios: [
    {
      scenario: "A backup job saturates the production uplink",
      evidence: [
        "Interface utilization increases at the backup start time.",
        "A known backup host becomes a top talker.",
        "Application latency and queue drops increase at the same time.",
        "Utilization decreases when the approved backup window ends."
      ],
      fix: [
        "Confirm the backup owner and business deadline.",
        "Determine whether the backup can be rescheduled or throttled.",
        "Use the backup tool's supported bandwidth controls where available.",
        "Apply an approved QoS policy if workload scheduling alone is insufficient.",
        "Avoid terminating the backup without assessing recovery and data-protection requirements."
      ],
      validation: [
        "Verify that application latency returns to its target.",
        "Confirm backup completion and data integrity.",
        "Check interface utilization and queue drops.",
        "Monitor the next scheduled backup for recurrence."
      ]
    },
    {
      scenario: "A large number of Kubernetes image pulls overloads node networking",
      evidence: [
        "Network usage spikes during a deployment rollout.",
        "Many Pods are pulling large images simultaneously.",
        "Node-level throughput and registry traffic increase.",
        "Application startup time increases."
      ],
      fix: [
        "Review rollout concurrency and deployment strategy.",
        "Check image sizes, registry performance, and node placement.",
        "Use an approved image caching or registry-mirroring approach where appropriate.",
        "Limit rollout concurrency if the service can safely tolerate a slower rollout.",
        "Do not alter cluster networking without evidence of a CNI or route fault."
      ],
      validation: [
        "Monitor node throughput during the next rollout.",
        "Confirm new Pods become ready within the expected time.",
        "Verify application availability during rollout.",
        "Check registry errors and image-pull durations."
      ]
    },
    {
      scenario: "AWS NAT gateway or transit path becomes a bottleneck",
      evidence: [
        "Workloads experience connection latency or throughput degradation.",
        "Traffic concentrates through a shared gateway or network path.",
        "Cloud monitoring shows changing traffic rates or relevant gateway metrics.",
        "Flow logs identify a common path for affected connections."
      ],
      fix: [
        "Confirm the exact AWS account, region, resource, and affected path.",
        "Inspect gateway metrics, route tables, flow logs, and workload traffic patterns.",
        "Check the current service documentation for resource-specific limits and metrics.",
        "Review approved architecture options for traffic distribution or capacity.",
        "Apply infrastructure changes only after reviewing the plan and expected impact."
      ],
      validation: [
        "Verify throughput and latency across affected subnets.",
        "Check gateway and flow metrics.",
        "Confirm security controls and routing remain correct.",
        "Monitor for recurring concentration on the same network path."
      ]
    },
    {
      scenario: "VPN throughput collapses during large transfers",
      evidence: [
        "Traffic over the tunnel increases while application response times worsen.",
        "Tunnel counters show drops or throughput constraints.",
        "Endpoint CPU usage may rise during encryption.",
        "Large packets may fail even when smaller packets work."
      ],
      fix: [
        "Measure throughput at both tunnel endpoints.",
        "Inspect tunnel health, device CPU, packet loss, and MTU.",
        "Check the supported VPN performance characteristics.",
        "Correct MTU or MSS only when packet evidence supports it.",
        "Evaluate an approved capacity or tunnel architecture change if the limit is confirmed."
      ],
      validation: [
        "Test both traffic directions.",
        "Verify representative application transactions.",
        "Compare tunnel counters and endpoint CPU before and after.",
        "Confirm that no security policy was weakened."
      ]
    },
    {
      scenario: "Network interface errors are mistaken for saturation",
      evidence: [
        "Throughput is below the expected link capacity.",
        "CRC, carrier, or driver error counters increase.",
        "Packet loss occurs even when utilization is moderate.",
        "The switch port may report similar errors."
      ],
      fix: [
        "Capture counters on both ends of the link.",
        "Check cable, transceiver, switch port, driver, and negotiated settings.",
        "Coordinate physical-layer troubleshooting with the network team.",
        "Replace or reconfigure components only after confirming the fault."
      ],
      validation: [
        "Confirm error counters stop increasing.",
        "Verify packet loss and latency return to normal.",
        "Repeat an approved throughput test.",
        "Monitor the link under normal workload."
      ]
    },
    {
      scenario: "A noisy workload affects latency-sensitive applications",
      evidence: [
        "One workload uses a disproportionate amount of shared bandwidth.",
        "Latency-sensitive flows slow during bulk transfers.",
        "Queue metrics show congestion or drops.",
        "The issue follows workload activity rather than a route change."
      ],
      fix: [
        "Identify the workload owner and required service levels.",
        "Define traffic classes and priorities according to the approved design.",
        "Use supported QoS, shaping, or workload scheduling controls.",
        "Validate that throttling does not break business deadlines or data integrity.",
        "Document the agreed bandwidth allocation."
      ],
      validation: [
        "Test both bulk and latency-sensitive workloads.",
        "Compare application latency and queue drops.",
        "Verify fairness and expected bulk-transfer completion time.",
        "Monitor the policy during peak usage."
      ]
    },
    {
      scenario: "A cloud instance performs below expected network throughput",
      evidence: [
        "The instance interface does not appear fully utilized.",
        "Throughput varies by instance type, traffic direction, or workload.",
        "CPU, packet-processing, or service-level metrics may show a bottleneck.",
        "A controlled test differs from the published capability."
      ],
      fix: [
        "Verify the exact instance type and its documented network characteristics.",
        "Check available cloud metrics and any applicable performance limits.",
        "Compare the source and destination resources and the entire path.",
        "Use a controlled test with a supported tool and bounded duration.",
        "Consider a suitable resource change only after identifying the actual limit."
      ],
      validation: [
        "Repeat the same controlled test before and after the change.",
        "Compare both directions and multiple representative flows.",
        "Check cost, availability, and architecture impact.",
        "Monitor the production application rather than relying only on benchmark results."
      ]
    }
  ],

  recoveryWorkflow: [
    "Declare the incident and assign an incident commander.",
    "Identify the affected applications, network path, interface, direction, and time window.",
    "Capture baseline throughput, latency, drops, errors, and retransmissions.",
    "Identify top talkers and determine whether the traffic is legitimate.",
    "Locate the first confirmed bottleneck along the path.",
    "Distinguish link capacity limits from device CPU, physical errors, QoS, and remote endpoint limits.",
    "Select the smallest safe mitigation that protects critical production traffic.",
    "Confirm workload ownership and obtain required approval.",
    "Prepare and document the rollback procedure.",
    "Apply a bounded and reversible mitigation.",
    "Measure its immediate impact using the original baseline.",
    "Validate application health and critical traffic in both directions.",
    "Monitor throughput, packet loss, latency, and drops for recurrence.",
    "Communicate recovery status to stakeholders.",
    "Record the root cause, mitigation, validation evidence, and preventive actions."
  ],

  rollbackPlan: [
    "Record the current configuration and the exact change applied.",
    "Identify the last known good QoS, shaping, or infrastructure configuration.",
    "Check whether rollback could reintroduce the original saturation or disrupt critical traffic.",
    "Prepare a reviewed rollback before changing production.",
    "Obtain required approval or follow the emergency-change procedure.",
    "Restore only the affected policy or resource setting.",
    "Verify that traffic is classified and routed as intended.",
    "Measure throughput, latency, packet drops, and application health.",
    "Confirm security controls remain enabled.",
    "If rollback fails, stop further speculative changes and escalate to the network owner.",
    "Document the rollback result and retain the evidence."
  ],

  prevention: [
    "Establish baseline throughput and latency for critical network paths.",
    "Monitor inbound and outbound utilization separately.",
    "Track interface drops, errors, queue drops, and TCP retransmissions.",
    "Identify scheduled backups, replication, and large data transfers.",
    "Define QoS and bandwidth allocation for critical traffic where supported.",
    "Review network capacity before introducing high-volume workloads.",
    "Measure VPN, gateway, and cloud network performance against documented capabilities.",
    "Use controlled rollout concurrency for deployments that generate large traffic bursts.",
    "Review image sizes and registry performance in Kubernetes environments.",
    "Use traffic-flow telemetry to identify top talkers.",
    "Test network changes in staging or a controlled environment.",
    "Keep QoS and network configuration in version control where appropriate.",
    "Require review and approval for production network-policy changes.",
    "Document rollback and post-change validation steps.",
    "Review incidents and update capacity plans after significant traffic growth."
  ],

  alerting: [
    "Alert when interface utilization stays above an agreed threshold for a defined interval.",
    "Monitor peak utilization as well as longer-term averages.",
    "Alert on rising packet drops, queue drops, and interface errors.",
    "Monitor TCP retransmissions and application latency together.",
    "Track VPN throughput, tunnel health, and packet loss.",
    "Monitor cloud gateway and instance network metrics where available.",
    "Alert on abnormal traffic increases after deployments.",
    "Track Kubernetes node network usage and CNI health.",
    "Detect unexpected top talkers or sustained bulk transfers.",
    "Monitor latency-sensitive applications separately from bulk-transfer workloads.",
    "Include interface, direction, source, destination, and timestamp in alerts.",
    "Avoid alerting on a single short utilization spike without considering workload and service impact."
  ],

  cicdValidation: [
    "Keep network infrastructure and QoS configuration in version control.",
    "Require peer review for changes that affect production bandwidth allocation.",
    "Run formatting and syntax checks for the applicable infrastructure tooling.",
    "Run terraform fmt -check and terraform validate where Terraform is used.",
    "Review terraform plan for unexpected gateway, route, or network-resource changes.",
    "Validate resource types and documented performance characteristics.",
    "Run controlled connectivity tests after network infrastructure changes.",
    "Check application health and network metrics after deployment.",
    "Use canary rollout or staged deployment when supported.",
    "Avoid running unbounded iperf3 or other load tests against production.",
    "Require approval for changes to traffic shaping, policing, or QoS policies.",
    "Record deployment IDs, Git commits, approvals, and validation results.",
    "Keep a reviewed rollback plan for production networking changes.",
    "Do not store cloud credentials or sensitive packet data in pipeline logs."
  ],

  handsOnLabs: [
    {
      title: "Lab 1: Measure Linux interface throughput",
      objective: "Calculate network rates from interface counters.",
      steps: [
        "Use a test Linux host.",
        "Run ip -s link show dev <interface> and record RX/TX bytes.",
        "Wait for a fixed interval while authorized test traffic runs.",
        "Collect the counters again.",
        "Subtract the earlier counters from the later counters.",
        "Convert bytes per second into bits per second.",
        "Compare the rate with the expected interface capacity."
      ],
      successCriteria: [
        "Calculate RX and TX throughput independently.",
        "Explain why cumulative counters must be compared over time.",
        "Record the test duration and traffic conditions."
      ]
    },
    {
      title: "Lab 2: Identify top talkers",
      objective: "Find which traffic sources consume the available capacity.",
      steps: [
        "Use a test host and an approved network interface.",
        "Run iftop or an approved flow-monitoring tool.",
        "Identify the largest observed flows.",
        "Correlate them with the relevant process or workload where possible.",
        "Record whether the traffic is expected.",
        "Avoid terminating traffic without confirming ownership."
      ],
      successCriteria: [
        "Identify high-volume flows.",
        "Distinguish observed traffic from confirmed process ownership.",
        "Document a safe mitigation option."
      ]
    },
    {
      title: "Lab 3: Run a controlled iperf3 test",
      objective: "Measure throughput in both directions in a test environment.",
      steps: [
        "Choose two authorized test hosts.",
        "Start iperf3 -s on the designated server.",
        "Run iperf3 -c <test-server-ip> -t 10 from the client.",
        "Run the reverse test with -R.",
        "Record throughput, duration, CPU usage, and packet loss if available.",
        "Repeat only within the approved traffic limits."
      ],
      successCriteria: [
        "Compare forward and reverse throughput.",
        "Explain why a benchmark result is not a guaranteed production rate.",
        "Avoid generating unapproved load against production."
      ]
    },
    {
      title: "Lab 4: Investigate QoS counters",
      objective: "Understand queue statistics and rate-limiting behavior.",
      steps: [
        "Use a disposable Linux test environment.",
        "Run tc -s qdisc show dev <interface>.",
        "Run tc -s class show dev <interface> where classes are configured.",
        "Record packet and drop counters.",
        "Compare counters before and after approved test traffic.",
        "Document how the configured policy affects the test flow."
      ],
      successCriteria: [
        "Identify the relevant queue or traffic class.",
        "Explain what a drop counter indicates and what it cannot prove alone.",
        "Document a safe rollback approach for policy changes."
      ]
    },
    {
      title: "Lab 5: Correlate traffic with a deployment",
      objective: "Identify whether a rollout or scheduled job creates a traffic burst.",
      steps: [
        "Use a staging environment.",
        "Record network metrics before deployment.",
        "Deploy a test workload with known traffic behavior.",
        "Observe interface rates, application latency, and errors.",
        "Compare the measurements with deployment timestamps.",
        "Document an appropriate rollout-concurrency or scheduling adjustment."
      ],
      successCriteria: [
        "Correlate workload events with measured network behavior.",
        "Separate correlation from confirmed causation.",
        "Propose a measurable preventive action."
      ]
    }
  ],

  incidentRunbook: [
    "1. Declare the incident and record its start time.",
    "2. Identify affected applications, source networks, destination networks, and traffic directions.",
    "3. Capture interface rates, capacity, drops, errors, latency, and retransmissions.",
    "4. Compare affected and unaffected sources.",
    "5. Identify top talkers and recent scheduled workloads.",
    "6. Inspect the first confirmed bottleneck along the path.",
    "7. Distinguish capacity saturation from physical errors, QoS limits, and device CPU limits.",
    "8. Agree on a minimal, approved mitigation.",
    "9. Prepare rollback before changing production.",
    "10. Apply the mitigation and immediately measure its effect.",
    "11. Validate critical application traffic and service health.",
    "12. Monitor for recurrence and communicate recovery.",
    "13. Attach metrics, commands, timestamps, and configuration changes to the incident record.",
    "14. Create follow-up actions for monitoring, capacity planning, and prevention."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Incident title:",
    "Severity:",
    "Environment and region:",
    "Affected applications:",
    "Incident start and recovery time:",
    "Business impact:",
    "Affected hosts and interfaces:",
    "Expected and observed bandwidth:",
    "Traffic direction:",
    "Packet drops and interface errors:",
    "Latency and TCP retransmission evidence:",
    "Top talkers or identified workload:",
    "Timeline of events:",
    "Recent deployments or scheduled jobs:",
    "Confirmed root cause:",
    "Contributing factors:",
    "Mitigation applied:",
    "Rollback decision:",
    "Validation results:",
    "Monitoring after recovery:",
    "Preventive actions:",
    "Action owner and due date:",
    "Lessons learned:"
  ],

  interviewQuestions: [
    {
      question: "What is bandwidth saturation?",
      answer: "Bandwidth saturation occurs when traffic demand approaches or exceeds the usable capacity of a network link or resource, causing congestion, queueing, latency, or packet drops."
    },
    {
      question: "How do you troubleshoot slow networking in production?",
      answer: "Establish scope, measure interface throughput, inspect drops and errors, check latency and retransmissions, identify high-volume flows, trace the bottleneck, and validate a controlled mitigation."
    },
    {
      question: "How do you calculate bandwidth from interface counters?",
      answer: "Subtract the earlier byte counter from the later counter, divide by the elapsed seconds to get bytes per second, then multiply by eight to obtain bits per second."
    },
    {
      question: "What is the difference between bandwidth and throughput?",
      answer: "Bandwidth describes available or nominal capacity. Throughput is the rate actually achieved by the traffic under current conditions."
    },
    {
      question: "Can high latency occur without bandwidth saturation?",
      answer: "Yes. Routing problems, long-distance paths, CPU constraints, retransmissions, application processing, and queueing can increase latency without fully saturating the interface."
    },
    {
      question: "What do RX and TX drops indicate?",
      answer: "They indicate packets were dropped at a particular receive or transmit point. The cause may be queue congestion, driver limitations, resource pressure, or another device-specific issue."
    },
    {
      question: "How do you find the top talker on a Linux host?",
      answer: "Use approved tools such as iftop or nethogs, or flow telemetry. Correlate the observed flow with a process or workload before taking action."
    },
    {
      question: "Why is a speed test not sufficient for production diagnosis?",
      answer: "A speed test measures one path under specific conditions and may not represent other traffic, directions, shared links, application behavior, or service limits."
    },
    {
      question: "How can backups affect production applications?",
      answer: "Bulk backup traffic can consume shared capacity and increase queueing and packet loss, delaying latency-sensitive application traffic."
    },
    {
      question: "How would you investigate a VPN throughput problem?",
      answer: "Measure both endpoints, inspect tunnel counters, CPU, packet loss, MTU, and remote capacity, then validate the suspected bottleneck with a controlled test."
    },
    {
      question: "How do you investigate AWS network throughput limits?",
      answer: "Confirm the resource and region, inspect available cloud metrics and flow logs, review documented instance or gateway capabilities, and measure the complete network path."
    },
    {
      question: "How can Kubernetes deployments cause bandwidth spikes?",
      answer: "Concurrent image pulls, workload initialization, cross-node traffic, and log forwarding can create bursts. Correlate node traffic with rollout events and CNI telemetry."
    },
    {
      question: "What is QoS?",
      answer: "Quality of Service classifies traffic and can prioritize, shape, or police flows according to policy. Misconfiguration can limit critical traffic or create queue drops."
    },
    {
      question: "Should you terminate a high-bandwidth process immediately?",
      answer: "No. Identify the process owner, business purpose, and impact first. Prefer an approved, bounded throttle or schedule adjustment when appropriate."
    },
    {
      question: "How do you prove recovery after a bandwidth incident?",
      answer: "Repeat the original tests, compare throughput and latency with baseline, check drops and retransmissions, verify application health, and monitor for recurrence."
    }
  ],

  officialReferences: [
    {
      title: "Linux ip-link manual",
      url: "https://man7.org/linux/man-pages/man8/ip-link.8.html"
    },
    {
      title: "Linux sar manual",
      url: "https://man7.org/linux/man-pages/man1/sar.1.html"
    },
    {
      title: "Linux ss manual",
      url: "https://man7.org/linux/man-pages/man8/ss.8.html"
    },
    {
      title: "Linux traffic control documentation",
      url: "https://man7.org/linux/man-pages/man8/tc.8.html"
    },
    {
      title: "tcpdump documentation",
      url: "https://www.tcpdump.org/manpages/tcpdump.1.html"
    },
    {
      title: "iperf3 documentation",
      url: "https://iperf.fr/iperf-doc.php"
    },
    {
      title: "AWS EC2 network performance",
      url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-network-bandwidth.html"
    },
    {
      title: "Amazon CloudWatch documentation",
      url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"
    },
    {
      title: "AWS VPC Flow Logs",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html"
    },
    {
      title: "Kubernetes cluster networking",
      url: "https://kubernetes.io/docs/concepts/cluster-administration/networking/"
    },
    {
      title: "Prometheus documentation",
      url: "https://prometheus.io/docs/introduction/overview/"
    },
    {
      title: "Linux network statistics documentation",
      url: "https://www.kernel.org/doc/html/latest/networking/"
    }
  ]
};
