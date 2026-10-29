export interface VPCNetworkingGuide {
  title: string;
  category: string;
  severity: string[];
  overview: string;
  incidentScenario: {
    title: string;
    symptoms: string[];
    businessImpact: string[];
  };
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    interpretation: string[];
    nextAction: string[];
  }[];
  rootCauseMatrix: {
    symptom: string;
    likelyCauses: string[];
    verification: string[];
    resolution: string[];
  }[];
  recoveryProcedures: {
    scenario: string;
    steps: string[];
    validation: string[];
    rollback: string[];
  }[];
  advancedScenarios: {
    scenario: string;
    diagnosis: string[];
    remediation: string[];
  }[];
  monitoringAndPrevention: string[];
  incidentRunbook: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    expectedOutcome: string;
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

export const vpcNetworkingGuide: VPCNetworkingGuide = {
  title: "AWS VPC Networking — Real Production Troubleshooting",
  category: "AWS Networking, Cloud Infrastructure and Incident Response",

  severity: [
    "SEV-1: Production-wide outage, critical application unreachable, or major network isolation.",
    "SEV-2: A production service, Availability Zone, or important connectivity path is unavailable.",
    "SEV-3: Limited connectivity issue with a workaround and no major business interruption.",
    "SEV-4: Non-production issue, configuration drift, or preventive improvement."
  ],

  overview: `
AWS VPC networking troubleshooting is the systematic investigation of connectivity
between workloads, subnets, VPCs, on-premises networks, the internet, AWS services,
and external systems.

A successful ping or a healthy EC2 instance does not prove that the application path
works. Production engineers investigate the complete path:

Client
  -> DNS resolution
  -> source network
  -> route selection
  -> network ACL
  -> security group
  -> destination network interface
  -> operating-system firewall
  -> listening process
  -> application response

For return traffic, engineers also check the reverse route, stateful filtering,
NAT behavior, and any intermediate firewall or inspection appliance.

Important distinction:
- A route table determines where traffic is sent.
- A security group controls permitted traffic at the network interface.
- A network ACL controls traffic at the subnet boundary and is stateless.
- DNS resolves names to addresses; it does not establish connectivity.
- NAT Gateway enables eligible outbound connections from private subnets; it
  does not allow unsolicited inbound internet connections.
- An Internet Gateway alone does not make a private instance publicly reachable.
`,

  incidentScenario: {
    title: "Production application suddenly cannot connect to an upstream service",
    symptoms: [
      "An EC2 application times out when connecting to an external API.",
      "A private subnet workload loses outbound internet access.",
      "A public Application Load Balancer cannot reach application targets.",
      "An EKS pod cannot connect to a database or AWS service endpoint.",
      "A VPC peering connection is active, but instances cannot communicate.",
      "A site-to-site VPN reports an established tunnel while application traffic fails.",
      "A deployment succeeds in one subnet but fails in another Availability Zone.",
      "A change to a route table, security group, NACL, or DNS setting precedes the outage."
    ],
    businessImpact: [
      "Determine which application, account, Region, VPC, subnet, and Availability Zone are affected.",
      "Check whether the issue affects all traffic or only one destination, port, protocol, or source CIDR.",
      "Identify customer-facing failures, failed deployments, queue backlogs, and data-transfer interruptions.",
      "Determine whether the outage began after a Terraform apply, console change, firewall update, or deployment.",
      "Check whether existing connections work while newly established connections fail.",
      "Determine whether the issue is isolated to one Availability Zone or spans the entire Region.",
      "Assign severity according to customer impact and follow the organization's incident process."
    ]
  },

  safetyChecks: [
    "Confirm the AWS account, caller identity, Region, VPC ID, subnet ID, and affected resource before executing changes.",
    "Use an approved incident role with read-only permissions for initial diagnosis wherever possible.",
    "Never assume the AWS CLI default profile or Region points to the intended environment.",
    "Record the incident start time, last known good time, change window, and relevant deployment ID.",
    "Capture route tables, security groups, NACLs, ENI details, DNS settings, and VPN/TGW state before modifying anything.",
    "Check whether Terraform, CloudFormation, CDK, or another controller owns the configuration. Avoid console changes that will be overwritten.",
    "Do not replace a production route table, delete a NAT Gateway, detach an Internet Gateway, or recreate a VPN during initial investigation.",
    "Do not open security groups to 0.0.0.0/0 or ::/0 as a generic troubleshooting shortcut.",
    "Do not disable NACLs, firewall rules, TLS verification, or security controls to make a test pass.",
    "For production changes, obtain the required approval and assess blast radius, failover, rollback, and dependency impact.",
    "Avoid printing credentials, private keys, authorization headers, or sensitive application payloads in logs.",
    "Use synthetic requests, approved test instances, VPC Reachability Analyzer, and Flow Logs before disruptive changes."
  ],

  evidenceCollection: [
    "Incident ticket, severity, affected services, customer symptoms, timestamps, and business impact.",
    "AWS account ID, Region, VPC ID, subnet IDs, Availability Zones, ENI IDs, and resource IDs.",
    "Source and destination IP addresses, ports, protocol, DNS names, and expected network path.",
    "Route tables and subnet associations, including the most-specific matching routes.",
    "Internet Gateway, NAT Gateway, Elastic IP, Transit Gateway, peering, VPN, and VPC endpoint states.",
    "Security group inbound and outbound rules, rule IDs where available, and all associated security groups.",
    "Network ACL inbound/outbound rules and rule numbers, remembering that the first matching numbered rule applies.",
    "VPC Flow Logs with ACCEPT/REJECT records, timestamps, interface IDs, addresses, ports, and log-delivery health.",
    "Reachability Analyzer results and relevant network topology.",
    "CloudTrail events for route, security group, NACL, endpoint, peering, VPN, and gateway changes.",
    "DNS query results, resolver configuration, application logs, OS routing tables, firewall state, and socket information.",
    "Terraform plan/apply output, configuration diffs, state ownership, CI/CD logs, and the last known good configuration.",
    "For hybrid connectivity, BGP routes, tunnel state, customer gateway configuration, and on-premises firewall evidence.",
    "For AWS service connectivity, endpoint policies, DNS configuration, endpoint security groups, and the service's own IAM permissions."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm account, identity, and Region",
      objective: "Prevent investigating or modifying the wrong AWS environment.",
      commands: [
        "aws sts get-caller-identity",
        "aws configure list",
        "aws ec2 describe-vpcs --region ap-south-1 --query 'Vpcs[].{VpcId:VpcId,Cidr:CidrBlock,State:State}' --output table"
      ],
      interpretation: [
        "get-caller-identity identifies the account and principal used by the CLI.",
        "aws configure list shows the selected configuration sources; it does not prove the selected environment is correct.",
        "An empty VPC result can mean the wrong Region, wrong account, or insufficient permissions.",
        "AccessDenied during an inspection is an authorization problem and does not, by itself, prove the network is broken."
      ],
      nextAction: [
        "Set the intended profile and Region explicitly.",
        "Confirm the VPC ID from the incident ticket or infrastructure state.",
        "Continue with read-only collection before making any change."
      ]
    },
    {
      step: 2,
      title: "Identify the exact source and destination",
      objective: "Reduce a broad network incident to one reproducible traffic flow.",
      commands: [
        "aws ec2 describe-instances --region ap-south-1 --instance-ids i-REPLACE_WITH_INSTANCE_ID --query 'Reservations[].Instances[].{Id:InstanceId,State:State.Name,PrivateIP:PrivateIpAddress,PublicIP:PublicIpAddress,VpcId:VpcId,SubnetId:SubnetId,AZ:Placement.AvailabilityZone,SGs:SecurityGroups[].GroupId}' --output json",
        "aws ec2 describe-network-interfaces --region ap-south-1 --network-interface-ids eni-REPLACE_WITH_ENI_ID --output json"
      ],
      interpretation: [
        "Record the actual source private IP, destination IP, subnet, ENI, security groups, and Availability Zone.",
        "A public IP and a private IP are not interchangeable when checking routes or Flow Logs.",
        "For a pod, load balancer, NAT Gateway, or managed service, identify the relevant ENI and actual traffic source rather than assuming it is the EC2 instance.",
        "A healthy EC2 state check confirms only certain instance health conditions; it does not prove network connectivity."
      ],
      nextAction: [
        "Write down source IP, destination IP or DNS name, protocol, port, and direction.",
        "Test one failing flow and one known-good comparison flow if safe.",
        "Determine whether the failure is a timeout, connection refusal, DNS failure, TLS failure, or application error."
      ]
    },
    {
      step: 3,
      title: "Check the complete route-table path",
      objective: "Verify that the source and destination subnets have the required routes.",
      commands: [
        "aws ec2 describe-route-tables --region ap-south-1 --filters Name=vpc-id,Values=vpc-REPLACE_WITH_VPC_ID --output json",
        "aws ec2 describe-route-tables --region ap-south-1 --route-table-ids rtb-REPLACE_WITH_ROUTE_TABLE_ID --output json",
        "aws ec2 describe-subnets --region ap-south-1 --subnet-ids subnet-REPLACE_WITH_SUBNET_ID --query 'Subnets[].{Id:SubnetId,Cidr:CidrBlock,AZ:AvailabilityZone,MapPublicIpOnLaunch:MapPublicIpOnLaunch,VpcId:VpcId}' --output table"
      ],
      interpretation: [
        "Find the explicit route-table association for the subnet. If none exists, the VPC main route table applies.",
        "Route selection uses the most-specific matching destination prefix, not simply the first route shown in CLI output.",
        "A route with State blackhole indicates an unavailable target, such as a deleted gateway or other invalid target.",
        "For IPv4 internet access from a public subnet, the appropriate route commonly points 0.0.0.0/0 to an attached Internet Gateway.",
        "A private subnet commonly routes 0.0.0.0/0 to a NAT Gateway for outbound IPv4 internet access.",
        "A route to a Transit Gateway, peering connection, or virtual private gateway must match the intended destination CIDR and architecture.",
        "IPv6 traffic uses IPv6 routes and may require an egress-only Internet Gateway or other appropriate target."
      ],
      nextAction: [
        "Confirm the subnet's actual route-table association.",
        "Compare the route destination with the destination IP and longest-prefix match.",
        "Inspect the target state and the corresponding return route.",
        "If a route is missing or blackholed, identify the owning IaC configuration before proposing a correction."
      ]
    },
    {
      step: 4,
      title: "Validate Internet Gateway and public IPv4 connectivity",
      objective: "Determine whether an internet-facing workload has all required public-path components.",
      commands: [
        "aws ec2 describe-internet-gateways --region ap-south-1 --filters Name=attachment.vpc-id,Values=vpc-REPLACE_WITH_VPC_ID --output table",
        "aws ec2 describe-addresses --region ap-south-1 --output table",
        "aws ec2 describe-route-tables --region ap-south-1 --filters Name=vpc-id,Values=vpc-REPLACE_WITH_VPC_ID --output json"
      ],
      interpretation: [
        "A public subnet generally needs an Internet Gateway route for direct IPv4 internet access.",
        "The workload also needs a public IPv4 address or another appropriate public-addressing arrangement, compatible security-group and NACL rules, and a listening service.",
        "MapPublicIpOnLaunch affects automatic public IPv4 assignment for applicable newly launched instances; changing it does not automatically assign an address to existing instances.",
        "An Internet Gateway does not automatically assign public IP addresses.",
        "An Elastic IP allocation alone does not guarantee that it is associated with the intended resource."
      ],
      nextAction: [
        "Check the IGW attachment, route, public address association, and subnet configuration.",
        "Verify the destination service port is listening and permitted.",
        "For private workloads, prefer the designed NAT or private endpoint architecture rather than making the instance public."
      ]
    },
    {
      step: 5,
      title: "Investigate NAT Gateway and private-subnet egress",
      objective: "Find why private workloads cannot reach an external IPv4 destination.",
      commands: [
        "aws ec2 describe-nat-gateways --region ap-south-1 --filter Name=vpc-id,Values=vpc-REPLACE_WITH_VPC_ID --output table",
        "aws ec2 describe-route-tables --region ap-south-1 --filters Name=vpc-id,Values=vpc-REPLACE_WITH_VPC_ID --output json",
        "aws cloudwatch get-metric-statistics --region ap-south-1 --namespace AWS/NATGateway --metric-name ErrorPortAllocation --dimensions Name=NatGatewayId,Value=nat-REPLACE_WITH_NAT_ID --start-time 2026-10-25T00:00:00Z --end-time 2026-10-25T01:00:00Z --period 300 --statistics Sum"
      ],
      interpretation: [
        "Check NAT Gateway state, subnet, Elastic IP association, and the route table of its subnet.",
        "A public NAT Gateway normally needs a route to an Internet Gateway in its public subnet.",
        "The private subnet's default IPv4 route must point to the intended NAT Gateway.",
        "A NAT Gateway in another Availability Zone can introduce cross-AZ traffic and a larger failure dependency.",
        "ErrorPortAllocation can indicate NAT source-port allocation pressure. A zero or missing data point does not prove all NAT behavior is healthy.",
        "A NAT Gateway does not provide unsolicited inbound internet access to private instances.",
        "NAT is for network translation, not for granting IAM permissions to access AWS APIs."
      ],
      nextAction: [
        "Inspect NAT Gateway state and CloudWatch metrics over the incident window.",
        "Check whether affected workloads share one NAT Gateway or one Availability Zone.",
        "Verify route tables, return traffic, destination allowlists, and any downstream firewall.",
        "Use service-specific VPC endpoints where appropriate and evaluate multi-AZ NAT design for resilience."
      ]
    },
    {
      step: 6,
      title: "Check security-group rules",
      objective: "Verify that the source and destination ENIs allow the required flow.",
      commands: [
        "aws ec2 describe-security-groups --region ap-south-1 --group-ids sg-REPLACE_WITH_GROUP_ID --output json",
        "aws ec2 describe-network-interfaces --region ap-south-1 --network-interface-ids eni-REPLACE_WITH_ENI_ID --query 'NetworkInterfaces[].{Id:NetworkInterfaceId,PrivateIP:PrivateIpAddress,Groups:Groups[].GroupId,Description:Description}' --output json"
      ],
      interpretation: [
        "Security groups are stateful. Response traffic for an allowed connection is generally permitted automatically.",
        "Check both sides of a connection: source egress and destination ingress rules.",
        "Security groups have allow rules, not explicit deny rules.",
        "If rules reference another security group, confirm that the referenced group is attached to the relevant ENI and the architecture supports that reference.",
        "A correct security group cannot compensate for a missing route or a restrictive NACL.",
        "For an ALB-to-target connection, inspect the ALB security group's egress and the target security group's ingress on the actual target port."
      ],
      nextAction: [
        "Compare the exact protocol, port, source CIDR, or security-group reference with the failing flow.",
        "Make the smallest approved rule correction.",
        "Avoid broad CIDR rules and temporary unrestricted ingress."
      ]
    },
    {
      step: 7,
      title: "Check network ACLs and return traffic",
      objective: "Identify stateless subnet-level filtering and ephemeral-port failures.",
      commands: [
        "aws ec2 describe-network-acls --region ap-south-1 --filters Name=vpc-id,Values=vpc-REPLACE_WITH_VPC_ID --output json",
        "aws ec2 describe-network-acls --region ap-south-1 --filters Name=association.subnet-id,Values=subnet-REPLACE_WITH_SUBNET_ID --output json"
      ],
      interpretation: [
        "NACLs are stateless, so inbound and outbound traffic must be permitted independently.",
        "For a TCP connection to destination port 443, the response typically returns to an ephemeral client-side port. Verify the appropriate ephemeral-port range for the actual clients and OS.",
        "NACL rules are evaluated in ascending rule-number order; the first matching rule wins.",
        "An explicit DENY rule can block traffic even when a later ALLOW rule appears correct.",
        "Inspect NACLs on both source and destination subnets where applicable.",
        "Do not assume every environment uses the same ephemeral-port range; confirm the actual client behavior and security requirements."
      ],
      nextAction: [
        "Check the subnet association and the matching rule in both directions.",
        "Correlate the suspected block with Flow Logs and the exact source/destination ports.",
        "Change only the necessary rule and verify that unrelated traffic remains restricted."
      ]
    },
    {
      step: 8,
      title: "Validate DNS resolution",
      objective: "Separate name-resolution problems from IP-level connectivity problems.",
      commands: [
        "nslookup api.example.com",
        "dig api.example.com A",
        "dig api.example.com AAAA",
        "cat /etc/resolv.conf",
        "getent hosts api.example.com",
        "aws ec2 describe-vpc-attribute --region ap-south-1 --vpc-id vpc-REPLACE_WITH_VPC_ID --attribute enableDnsSupport",
        "aws ec2 describe-vpc-attribute --region ap-south-1 --vpc-id vpc-REPLACE_WITH_VPC_ID --attribute enableDnsHostnames"
      ],
      interpretation: [
        "Run the commands from the affected host, container, or pod where possible. Local machine DNS results may not match workload DNS.",
        "NXDOMAIN usually indicates that the queried name does not exist in the DNS view being used.",
        "SERVFAIL or timeout can indicate resolver reachability, forwarding, or upstream DNS issues.",
        "An incorrect A or AAAA record may direct traffic to an unreachable endpoint or an unexpected IPv6 path.",
        "VPC DNS attributes, private hosted zones, Route 53 Resolver rules, DHCP options, and custom DNS servers may all affect results.",
        "A successful DNS response does not prove the destination port is reachable."
      ],
      nextAction: [
        "Compare results from a healthy and failing workload.",
        "Check private hosted-zone associations, resolver endpoints, forwarding rules, and TTLs.",
        "Test the resolved IP separately without bypassing TLS hostname verification in production."
      ]
    },
    {
      step: 9,
      title: "Test TCP connectivity from the actual workload",
      objective: "Determine whether the network path reaches the intended destination port.",
      commands: [
        "curl -v --connect-timeout 5 https://api.example.com/health",
        "nc -vz -w 5 api.example.com 443",
        "timeout 5 bash -c '</dev/tcp/api.example.com/443'",
        "ip route",
        "ip addr",
        "ss -lntp",
        "sudo nft list ruleset"
      ],
      interpretation: [
        "Use only the commands supported by the host OS; the Bash TCP test is not a universal Windows or container command.",
        "A connection timeout can indicate filtering, a missing route, an unavailable destination, or a silent drop.",
        "Connection refused commonly means a reachable endpoint rejected the connection or no process is listening; a firewall can also actively reject.",
        "An HTTP 403 or 500 proves that some portion of the network and HTTP path is working, but application authorization or server-side failure may remain.",
        "A successful TCP handshake does not prove TLS negotiation, certificate validation, or application health.",
        "Check local host firewall and policy-routing configuration when AWS-side evidence looks correct.",
        "If a process is not listening on the expected port, fix the service rather than changing AWS routing."
      ],
      nextAction: [
        "Record the resolved IP and exact error from the affected workload.",
        "Compare a TCP test with the application request.",
        "Check host firewall, listener binding, TLS, proxy settings, and application logs."
      ]
    },
    {
      step: 10,
      title: "Use VPC Flow Logs to identify traffic behavior",
      objective: "Find accepted or rejected traffic at the monitored network interface or subnet.",
      commands: [
        "aws ec2 describe-flow-logs --region ap-south-1 --filter Name=resource-id,Values=vpc-REPLACE_WITH_VPC_ID --output json",
        "aws logs describe-log-groups --region ap-south-1 --log-group-name-prefix /aws/vpc/flowlogs",
        "aws logs filter-log-events --region ap-south-1 --log-group-name /aws/vpc/flowlogs --start-time 1792886400000 --filter-pattern 'REJECT' --limit 50"
      ],
      interpretation: [
        "Replace the example log group and timestamps with the actual configuration and incident window.",
        "Flow Logs are not packet captures. They provide aggregated flow metadata, and delivery may be delayed.",
        "REJECT can indicate security-group or NACL rejection, but the exact cause is not always identifiable from that field alone.",
        "ACCEPT means the monitored network interface accepted the traffic at the relevant observation point; it does not prove that the application processed it.",
        "No records may indicate the wrong interface, missing Flow Logs, wrong time range, delivery delay, or no matching traffic.",
        "Review the log format to ensure the queried fields and filter pattern match the configured format."
      ],
      nextAction: [
        "Filter by source IP, destination IP, protocol, ports, interface, and time window using the configured fields.",
        "Compare source and destination interface observations where available.",
        "Correlate the findings with route tables, security groups, NACLs, and application logs."
      ]
    },
    {
      step: 11,
      title: "Run VPC Reachability Analyzer",
      objective: "Analyze supported AWS network paths without repeatedly changing production rules.",
      commands: [
        "aws ec2 describe-network-insights-paths --region ap-south-1 --output table",
        "aws ec2 create-network-insights-path --region ap-south-1 --source eni-REPLACE_WITH_SOURCE_ENI --destination eni-REPLACE_WITH_DESTINATION_ENI --protocol tcp --destination-port 443",
        "aws ec2 start-network-insights-analysis --region ap-south-1 --network-insights-path-id nip-REPLACE_WITH_PATH_ID",
        "aws ec2 describe-network-insights-analyses --region ap-south-1 --network-insights-analysis-ids nia-REPLACE_WITH_ANALYSIS_ID --output json"
      ],
      interpretation: [
        "Use a supported source and destination type and the exact protocol and port being investigated.",
        "Reachability Analyzer performs static configuration analysis; it does not send live packets through the application path.",
        "An analyzed reachable path does not guarantee that the process is listening, DNS is correct, TLS succeeds, or the destination application is healthy.",
        "Unsupported path components or insufficient permissions can limit the analysis."
      ],
      nextAction: [
        "Review the analysis result and explanation for a blocking component.",
        "Correct the verified configuration issue rather than changing unrelated resources.",
        "Delete unneeded Network Insights paths and analyses according to your account's cleanup policy."
      ]
    },
    {
      step: 12,
      title: "Check VPC peering connectivity",
      objective: "Resolve traffic failures between two peered VPCs.",
      commands: [
        "aws ec2 describe-vpc-peering-connections --region ap-south-1 --output json",
        "aws ec2 describe-route-tables --region ap-south-1 --filters Name=vpc-id,Values=vpc-REPLACE_WITH_VPC_ID --output json",
        "aws ec2 describe-security-groups --region ap-south-1 --group-ids sg-REPLACE_WITH_GROUP_ID --output json"
      ],
      interpretation: [
        "The peering connection must be active and both VPCs must have routes for the intended remote CIDRs.",
        "The destination security group and NACL must allow the traffic.",
        "Overlapping CIDRs prevent normal routing between the overlapping address ranges.",
        "VPC peering is not transitive: traffic cannot automatically route from VPC A through VPC B to VPC C using peering alone.",
        "DNS resolution across peering requires the appropriate DNS options and resolver architecture."
      ],
      nextAction: [
        "Check routes in both VPCs and verify the exact destination prefix.",
        "Confirm non-overlapping CIDRs and appropriate DNS behavior.",
        "If transitive connectivity is required, evaluate Transit Gateway or another approved hub-and-spoke design."
      ]
    },
    {
      step: 13,
      title: "Check Transit Gateway routing",
      objective: "Investigate connectivity through a shared Transit Gateway.",
      commands: [
        "aws ec2 describe-transit-gateways --region ap-south-1 --output json",
        "aws ec2 describe-transit-gateway-vpc-attachments --region ap-south-1 --filters Name=transit-gateway-id,Values=tgw-REPLACE_WITH_TGW_ID --output json",
        "aws ec2 describe-transit-gateway-route-tables --region ap-south-1 --filters Name=transit-gateway-id,Values=tgw-REPLACE_WITH_TGW_ID --output json",
        "aws ec2 search-transit-gateway-routes --region ap-south-1 --transit-gateway-route-table-id tgw-rtb-REPLACE_WITH_ROUTE_TABLE_ID --filters Name=route-search.exact-match,Values=10.20.0.0/16 --output json"
      ],
      interpretation: [
        "An attachment must be available and associated with the intended Transit Gateway route table.",
        "Propagation and static routes determine which destination prefixes are available in that route table.",
        "A route present in one TGW route table may be absent from another.",
        "The VPC attachment subnet route tables still need routes to the Transit Gateway.",
        "The destination VPC must have a valid return route.",
        "Appliance mode, inspection VPC routing, and asymmetric routing can affect firewall-based architectures."
      ],
      nextAction: [
        "Inspect attachment state, route-table association, propagation, and the exact destination prefix.",
        "Validate forward and return paths across every participating VPC.",
        "Coordinate changes with the central network team when the TGW is shared."
      ]
    },
    {
      step: 14,
      title: "Investigate Site-to-Site VPN and BGP",
      objective: "Separate tunnel health from route advertisement and application reachability.",
      commands: [
        "aws ec2 describe-vpn-connections --region ap-south-1 --vpn-connection-ids vpn-REPLACE_WITH_VPN_ID --output json",
        "aws ec2 describe-vpn-gateways --region ap-south-1 --output json",
        "aws ec2 describe-route-tables --region ap-south-1 --filters Name=vpc-id,Values=vpc-REPLACE_WITH_VPC_ID --output json"
      ],
      interpretation: [
        "A VPN tunnel can be UP while traffic fails because routes, BGP advertisements, security controls, or on-premises return routes are incorrect.",
        "Check tunnel status, accepted route prefixes, customer gateway configuration, and on-premises firewall logs.",
        "For dynamic routing, compare the prefixes advertised and received on both sides.",
        "For static routing, verify the configured destination prefixes and the corresponding VPC routes.",
        "MTU and MSS issues may affect large packets while small connectivity tests succeed."
      ],
      nextAction: [
        "Capture tunnel and BGP evidence before resetting tunnels.",
        "Coordinate with the on-premises network team to validate both directions.",
        "Use controlled MTU/MSS tests and approved configuration changes if packet-size-related failures are suspected."
      ]
    },
    {
      step: 15,
      title: "Check VPC endpoints and private AWS service access",
      objective: "Diagnose workloads that cannot reach S3, DynamoDB, ECR, SSM, or other AWS APIs.",
      commands: [
        "aws ec2 describe-vpc-endpoints --region ap-south-1 --filters Name=vpc-id,Values=vpc-REPLACE_WITH_VPC_ID --output json",
        "aws ec2 describe-vpc-endpoint-services --region ap-south-1 --output table",
        "aws ec2 describe-route-tables --region ap-south-1 --filters Name=vpc-id,Values=vpc-REPLACE_WITH_VPC_ID --output json"
      ],
      interpretation: [
        "Gateway endpoints, such as supported S3 and DynamoDB endpoints, use route-table associations.",
        "Interface endpoints use endpoint ENIs and commonly require endpoint security-group inbound access from the workload.",
        "Private DNS settings, endpoint policies, service IAM permissions, resource policies, and DNS resolution can all affect access.",
        "A network timeout and an AWS AccessDenied response are different failure classes.",
        "Some AWS services require multiple service endpoints or supporting endpoints for a complete workflow, such as image pulls or Systems Manager sessions.",
        "An endpoint policy does not replace IAM authorization or the destination resource policy."
      ],
      nextAction: [
        "Confirm the endpoint type, service name, state, route-table associations, and private DNS configuration.",
        "Check security-group rules for interface endpoint ENIs.",
        "If the request reaches the service but returns AccessDenied, investigate IAM and resource policies separately."
      ]
    },
    {
      step: 16,
      title: "Investigate EKS pod and node networking",
      objective: "Determine whether a failure is in pod networking, node networking, cluster DNS, or AWS networking.",
      commands: [
        "kubectl get nodes -o wide",
        "kubectl get pods -A -o wide",
        "kubectl get events -A --sort-by=.lastTimestamp",
        "kubectl -n kube-system get pods -o wide",
        "kubectl -n kube-system logs deployment/coredns --tail=100",
        "kubectl describe pod -n REPLACE_WITH_NAMESPACE REPLACE_WITH_POD"
      ],
      interpretation: [
        "Check pod IPs, node placement, CNI health, CoreDNS, and Kubernetes events.",
        "A pod with no assigned IP may indicate CNI, subnet IP capacity, or ENI/IP allocation problems.",
        "A pod that resolves DNS but cannot connect may have a route, security-group, NACL, NetworkPolicy, firewall, or destination issue.",
        "Security groups for pods, where enabled, may change which security group applies to pod traffic.",
        "Private EKS nodes need a valid path to required AWS services, through NAT or appropriate VPC endpoints.",
        "A Kubernetes NetworkPolicy can block traffic even when AWS security groups permit it."
      ],
      nextAction: [
        "Compare a failing pod with a healthy pod on the same and a different node.",
        "Check VPC CNI logs, subnet free IP capacity, node ENIs, and relevant NetworkPolicies.",
        "Validate the complete destination path without exposing cluster credentials or application secrets."
      ]
    },
    {
      step: 17,
      title: "Investigate ALB or NLB target connectivity",
      objective: "Resolve load-balancer failures that appear to be VPC networking incidents.",
      commands: [
        "aws elbv2 describe-load-balancers --region ap-south-1 --names REPLACE_WITH_LOAD_BALANCER_NAME --output json",
        "aws elbv2 describe-target-groups --region ap-south-1 --load-balancer-arn REPLACE_WITH_LOAD_BALANCER_ARN --output json",
        "aws elbv2 describe-target-health --region ap-south-1 --target-group-arn REPLACE_WITH_TARGET_GROUP_ARN --output json"
      ],
      interpretation: [
        "Check load-balancer scheme, subnets, IP address type, listener configuration, and target group health.",
        "For ALB, confirm target security-group ingress permits the configured target port from the load balancer's security group.",
        "A target can be unhealthy because of the health-check path, port, protocol, expected status code, application readiness, or network filtering.",
        "For NLB, account for its network-interface and client-IP preservation behavior when determining the source seen by targets.",
        "A healthy target does not guarantee that the application is healthy for every request path."
      ],
      nextAction: [
        "Read target health reason codes and application logs.",
        "Test the target's health-check endpoint from an approved location.",
        "Verify routes, NACLs, security groups, and listener-to-target protocol compatibility."
      ]
    },
    {
      step: 18,
      title: "Review recent network changes in CloudTrail",
      objective: "Correlate the start of the outage with configuration changes.",
      commands: [
        "aws cloudtrail lookup-events --region ap-south-1 --lookup-attributes AttributeKey=EventName,AttributeValue=CreateRoute --max-results 50",
        "aws cloudtrail lookup-events --region ap-south-1 --lookup-attributes AttributeKey=EventName,AttributeValue=ReplaceRoute --max-results 50",
        "aws cloudtrail lookup-events --region ap-south-1 --lookup-attributes AttributeKey=EventName,AttributeValue=AuthorizeSecurityGroupIngress --max-results 50",
        "aws cloudtrail lookup-events --region ap-south-1 --lookup-attributes AttributeKey=EventName,AttributeValue=ReplaceNetworkAclEntry --max-results 50"
      ],
      interpretation: [
        "These commands search by event name and may return events unrelated to the affected VPC; inspect the event payload for resource IDs and time.",
        "Check additional relevant events such as DeleteRoute, ModifyNetworkInterfaceAttribute, CreateVpcEndpoint, ModifyVpcEndpoint, and changes to peering, TGW, VPN, or NACLs.",
        "CloudTrail event history has a limited retention window and regional scope; use the organization's trail or CloudTrail Lake for broader investigations.",
        "A change close to the outage is a lead, not proof of root cause. Correlate it with flow evidence and a reproducible test."
      ],
      nextAction: [
        "Identify the principal, event time, affected resource, and before/after values where available.",
        "Compare the configuration with the last known good version.",
        "Prepare a targeted rollback or forward fix after assessing dependencies."
      ]
    },
    {
      step: 19,
      title: "Check IPv6, dual-stack, and MTU-related failures",
      objective: "Investigate issues that affect only IPv6, large packets, or particular paths.",
      commands: [
        "ip -6 addr",
        "ip -6 route",
        "ping -6 REPLACE_WITH_IPV6_ADDRESS",
        "tracepath REPLACE_WITH_DESTINATION_HOST",
        "tracepath6 REPLACE_WITH_IPV6_ADDRESS"
      ],
      interpretation: [
        "A dual-stack hostname may resolve to both A and AAAA records; the client may prefer a path that is not configured correctly.",
        "IPv6 requires its own routing and security controls; an IPv4 route does not provide IPv6 connectivity.",
        "Public IPv6 egress may use an Internet Gateway with appropriate IPv6 routes, while private outbound-only IPv6 commonly uses an egress-only Internet Gateway.",
        "A failed ping is not definitive proof of an outage because ICMP may be filtered.",
        "Large-packet failures can indicate MTU, MSS, encapsulation, or path-MTU-discovery issues."
      ],
      nextAction: [
        "Test IPv4 and IPv6 separately and compare the results.",
        "Check IPv6 routes, security rules, DNS records, and destination support.",
        "Use approved packet-size tests and network-team evidence before changing MTU settings."
      ]
    },
    {
      step: 20,
      title: "Confirm the root cause and choose a controlled fix",
      objective: "Prevent speculative changes and recover service safely.",
      commands: [
        "git diff --",
        "terraform plan",
        "terraform validate",
        "aws ec2 describe-route-tables --region ap-south-1 --filters Name=vpc-id,Values=vpc-REPLACE_WITH_VPC_ID --output json",
        "aws ec2 describe-security-groups --region ap-south-1 --group-ids sg-REPLACE_WITH_GROUP_ID --output json"
      ],
      interpretation: [
        "git diff is relevant when infrastructure configuration is managed in Git; use the correct repository directory.",
        "terraform plan must use the intended workspace, backend, variables, and credentials.",
        "terraform validate checks configuration syntax and internal consistency; it does not prove that a deployment is safe or reachable.",
        "Do not apply a plan that includes unrelated production replacements or destroys without understanding the consequences.",
        "The AWS CLI commands above collect current state; compare the result with the approved desired state."
      ],
      nextAction: [
        "Document the evidence that identifies the specific blocking component.",
        "Choose the smallest safe correction with a clear owner and approval.",
        "Use a canary or limited-scope test where possible.",
        "Define rollback conditions before applying the change."
      ]
    },
    {
      step: 21,
      title: "Validate recovery and watch for recurrence",
      objective: "Prove that the real application flow has recovered.",
      commands: [
        "curl -v --connect-timeout 5 https://REPLACE_WITH_APPLICATION_HOST/health",
        "nc -vz -w 5 REPLACE_WITH_DESTINATION_HOST 443",
        "aws elbv2 describe-target-health --region ap-south-1 --target-group-arn REPLACE_WITH_TARGET_GROUP_ARN --output table",
        "aws cloudwatch get-metric-statistics --region ap-south-1 --namespace AWS/NATGateway --metric-name PacketsDropCount --dimensions Name=NatGatewayId,Value=nat-REPLACE_WITH_NAT_ID --start-time 2026-10-25T00:00:00Z --end-time 2026-10-25T01:00:00Z --period 300 --statistics Sum"
      ],
      interpretation: [
        "Replace the sample host, target group, NAT ID, and time range with the actual environment values.",
        "Check the user-facing request, not only a low-level network test.",
        "Confirm recovery across affected Availability Zones and representative workloads.",
        "Metrics can have delays or missing datapoints; inspect the correct time window and metric dimensions.",
        "Do not close the incident based on a single successful request."
      ],
      nextAction: [
        "Monitor error rates, latency, connection failures, and relevant network metrics for the agreed observation period.",
        "Verify that the change did not break other traffic or increase unintended exposure.",
        "Update the incident ticket, runbook, infrastructure code, and preventive monitoring."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Public EC2 instance is unreachable from the internet",
      likelyCauses: [
        "No public IPv4 address or valid public-addressing configuration.",
        "Missing Internet Gateway attachment or default route.",
        "Wrong subnet route-table association.",
        "Security group or NACL blocks the traffic.",
        "Host firewall blocks the port or the application is not listening."
      ],
      verification: [
        "Check the instance public/private IP, subnet, route table, and IGW attachment.",
        "Inspect inbound security-group rules and both NACL directions.",
        "Use Flow Logs, approved external tests, and OS listener checks."
      ],
      resolution: [
        "Correct the missing route or address configuration through the approved IaC workflow.",
        "Permit only the required source, protocol, and port.",
        "Start or repair the service if the network path is already valid."
      ]
    },
    {
      symptom: "Private EC2 instance cannot access the internet",
      likelyCauses: [
        "Missing or incorrect private-subnet default route.",
        "NAT Gateway unavailable or incorrectly routed.",
        "NAT public subnet lacks a valid Internet Gateway path.",
        "NACL blocks return traffic.",
        "DNS failure or destination-side filtering."
      ],
      verification: [
        "Inspect the private and NAT subnet route tables.",
        "Check NAT Gateway state, metrics, and Flow Logs.",
        "Test DNS resolution and TCP connectivity from the private workload."
      ],
      resolution: [
        "Restore the correct private-subnet route to a healthy NAT Gateway where NAT is the intended design.",
        "Repair the NAT subnet's IGW route or required addressing configuration.",
        "Fix DNS or filtering only when evidence identifies it as the cause."
      ]
    },
    {
      symptom: "Application returns connection timeout",
      likelyCauses: [
        "Missing forward or return route.",
        "Security-group or NACL filtering.",
        "Unavailable destination or silent downstream firewall drop.",
        "Incorrect destination address or port.",
        "Asymmetric routing through inspection appliances."
      ],
      verification: [
        "Record the actual resolved destination IP and port.",
        "Check both routing directions and relevant security controls.",
        "Compare Flow Logs and Reachability Analyzer results."
      ],
      resolution: [
        "Correct the specific missing route or filtering rule.",
        "Repair the destination listener or downstream firewall when confirmed.",
        "Fix routing symmetry in inspection architectures when evidence shows asymmetric paths."
      ]
    },
    {
      symptom: "Connection refused instead of timeout",
      likelyCauses: [
        "No listener on the destination port.",
        "Service bound only to localhost or the wrong interface.",
        "Host firewall actively rejects the connection.",
        "Incorrect target port or container port mapping."
      ],
      verification: [
        "Run ss -lntp or the platform-equivalent listener check.",
        "Inspect service logs, container ports, and host firewall rules.",
        "Compare the application port with the load balancer target group."
      ],
      resolution: [
        "Correct the listener binding or start the service.",
        "Correct the port mapping or target group configuration.",
        "Adjust host firewall rules only according to approved policy."
      ]
    },
    {
      symptom: "DNS name resolves to the wrong address or does not resolve",
      likelyCauses: [
        "Incorrect DNS record or stale cache.",
        "Missing private hosted-zone association.",
        "Resolver forwarding failure.",
        "Incorrect VPC DNS settings or DHCP options.",
        "Incorrect A/AAAA record for a dual-stack application."
      ],
      verification: [
        "Run dig or nslookup from the failing workload.",
        "Compare A and AAAA records with a known-good environment.",
        "Inspect Route 53 private hosted zones and Resolver rules."
      ],
      resolution: [
        "Correct the record or zone association.",
        "Repair resolver forwarding and validate TTL behavior.",
        "Keep IPv4 and IPv6 records aligned with the actual reachable service."
      ]
    },
    {
      symptom: "VPC peering is active but cross-VPC traffic fails",
      likelyCauses: [
        "Missing route in one VPC.",
        "Wrong route-table association.",
        "Security-group or NACL restriction.",
        "Overlapping CIDR blocks.",
        "Attempted transitive routing through peering."
      ],
      verification: [
        "Check peering state, CIDR ranges, both route tables, and destination rules.",
        "Check the return route and DNS configuration.",
        "Verify whether the design incorrectly assumes peering is transitive."
      ],
      resolution: [
        "Add the approved routes on both sides.",
        "Correct filtering and DNS configuration.",
        "Use Transit Gateway or another supported architecture if transitive routing is required."
      ]
    },
    {
      symptom: "Site-to-Site VPN is UP but applications cannot communicate",
      likelyCauses: [
        "Missing VPC or on-premises routes.",
        "BGP prefixes not advertised or accepted.",
        "Firewall or NACL restrictions.",
        "Incorrect customer gateway configuration.",
        "MTU/MSS problems."
      ],
      verification: [
        "Inspect VPN tunnel status, route propagation, BGP state, and on-premises logs.",
        "Check both forward and return routes.",
        "Compare small and large packet behavior."
      ],
      resolution: [
        "Repair the missing route or BGP advertisement.",
        "Correct approved firewall rules.",
        "Coordinate MTU/MSS adjustments with the network team."
      ]
    },
    {
      symptom: "VPC Flow Logs show REJECT",
      likelyCauses: [
        "Security-group rejection.",
        "NACL rejection.",
        "Incorrect source or destination port.",
        "A different interface or path than expected."
      ],
      verification: [
        "Inspect the complete configured Flow Logs record format.",
        "Correlate interface, IPs, ports, protocol, and timestamps.",
        "Check security groups and NACL rules at the observed endpoints."
      ],
      resolution: [
        "Change only the verified blocking rule.",
        "Re-test the same flow and confirm the expected ACCEPT behavior where applicable."
      ]
    },
    {
      symptom: "AWS API access times out from a private subnet",
      likelyCauses: [
        "No NAT path when the service endpoint is public and NAT is required.",
        "Missing interface or gateway endpoint.",
        "Private DNS misconfiguration.",
        "Endpoint security-group restriction.",
        "DNS, IAM, endpoint policy, or service resource-policy issue."
      ],
      verification: [
        "Inspect VPC endpoints and endpoint state.",
        "Test name resolution and TCP connectivity.",
        "Separate network timeout from an HTTP AccessDenied response."
      ],
      resolution: [
        "Restore the intended endpoint or outbound route.",
        "Correct endpoint security groups and private DNS.",
        "Investigate IAM and endpoint/resource policies when the request reaches the service."
      ]
    },
    {
      symptom: "EKS pods fail to reach destinations",
      likelyCauses: [
        "VPC CNI or pod-IP allocation issue.",
        "Subnet IP exhaustion.",
        "NetworkPolicy or security-group-for-pods restriction.",
        "DNS failure.",
        "Missing NAT or service endpoint."
      ],
      verification: [
        "Inspect pod events, node placement, CNI health, and subnet IP capacity.",
        "Test DNS and TCP from the affected pod.",
        "Check AWS routes, security groups, NACLs, and Kubernetes NetworkPolicies."
      ],
      resolution: [
        "Repair CNI or IP capacity problems.",
        "Correct the specific network policy or AWS filtering rule.",
        "Restore required outbound paths or endpoints."
      ]
    }
  ],

  recoveryProcedures: [
    {
      scenario: "Missing or incorrect route",
      steps: [
        "Identify the subnet's effective route table and the intended destination prefix.",
        "Confirm the correct route target and verify that it exists and is available.",
        "Review the IaC change and determine whether the route is managed by Terraform, CloudFormation, or another controller.",
        "Prepare a minimal route correction and obtain the required approval.",
        "Apply the change in a controlled manner and record the resource ID and change timestamp."
      ],
      validation: [
        "Confirm the route exists with the intended destination and target.",
        "Repeat the original source-to-destination test.",
        "Check reverse routing and observe Flow Logs and application metrics."
      ],
      rollback: [
        "Restore the last known good route only after verifying that the old target is still valid.",
        "Do not remove a default route without understanding which workloads depend on it.",
        "Avoid deleting gateways as a first-line recovery action."
      ]
    },
    {
      scenario: "Security group or NACL blocks valid application traffic",
      steps: [
        "Identify the exact protocol, destination port, source CIDR, and applicable ENIs.",
        "Determine whether the block is in a security group, NACL, host firewall, or Kubernetes NetworkPolicy.",
        "Create the smallest approved rule change.",
        "For NACLs, explicitly check both inbound and outbound traffic and the rule-number ordering.",
        "Apply the change through the owning configuration system."
      ],
      validation: [
        "Repeat the same connection test and inspect relevant Flow Logs.",
        "Confirm the expected service works without opening unrelated ports.",
        "Check other applications sharing the same subnet or security group."
      ],
      rollback: [
        "Revert the exact rule change if it creates unexpected exposure or breaks other traffic.",
        "Do not delete all rules or replace the NACL with an unrestricted policy.",
        "Keep the evidence and approval in the incident record."
      ]
    },
    {
      scenario: "NAT Gateway or outbound path failure",
      steps: [
        "Confirm NAT Gateway state, subnet, route target, Elastic IP association, and CloudWatch metrics.",
        "Verify the private subnet's default route and the NAT subnet's Internet Gateway path.",
        "Determine whether the issue is limited to one Availability Zone or shared NAT Gateway.",
        "Evaluate the approved standby or multi-AZ recovery design before changing routes.",
        "Check service endpoints as an alternative only when they support the affected service and workflow."
      ],
      validation: [
        "Test DNS and TCP from affected private workloads.",
        "Check the required outbound destination and application-level response.",
        "Observe NAT metrics and failure rates after recovery."
      ],
      rollback: [
        "Restore the previous route only if its target is healthy and the rollback is safe.",
        "Avoid switching multiple production subnets at once without a tested plan.",
        "Do not create a replacement NAT Gateway without reviewing costs, routes, and Elastic IP requirements."
      ]
    },
    {
      scenario: "DNS or Resolver failure",
      steps: [
        "Capture DNS results and resolver configuration from a failing workload.",
        "Compare the result with a healthy workload in the same VPC.",
        "Inspect hosted-zone associations, Resolver endpoints/rules, forwarding targets, and relevant DNS settings.",
        "Correct the specific record or forwarding path using the approved change process.",
        "Allow for TTL and resolver caching behavior during recovery."
      ],
      validation: [
        "Confirm the expected A/AAAA or private DNS answer.",
        "Test TCP and the actual application request after resolution.",
        "Monitor DNS error rate and application connection failures."
      ],
      rollback: [
        "Restore the last known good record or resolver rule when safe.",
        "Do not flush every production resolver cache or change shared DNS settings without assessing blast radius."
      ]
    },
    {
      scenario: "VPN or Transit Gateway routing failure",
      steps: [
        "Capture tunnel/attachment state and route tables before changing anything.",
        "Identify the exact missing prefix and the side that should advertise or propagate it.",
        "Coordinate with the central network or on-premises team.",
        "Apply the smallest route or propagation correction.",
        "Do not reset a healthy tunnel merely because application traffic is failing."
      ],
      validation: [
        "Confirm the expected routes exist on both forward and return paths.",
        "Test the original application flow.",
        "Monitor tunnel, BGP, and application metrics."
      ],
      rollback: [
        "Restore the prior route or propagation configuration if it is safe and the new change worsens connectivity.",
        "Avoid broad route advertisements or changes to shared TGW route tables without an impact review."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "One Availability Zone fails while another continues working",
      diagnosis: [
        "Compare subnet route tables, NAT Gateway placement, subnet IP capacity, NACLs, and endpoint availability across AZs.",
        "Check whether the application or node group has workloads in the affected AZ.",
        "Review load-balancer target health and AZ-specific error rates.",
        "Determine whether the design depends on a single-AZ NAT Gateway or another single-AZ network component."
      ],
      remediation: [
        "Restore the affected AZ's route or resource where evidence supports it.",
        "Use the approved multi-AZ design for resilient outbound connectivity.",
        "Validate that failover does not overload the remaining NAT Gateway, endpoint, or application capacity."
      ]
    },
    {
      scenario: "Traffic reaches the destination but response traffic fails",
      diagnosis: [
        "Inspect both directions using Flow Logs and the actual source and destination ports.",
        "Check NACL ephemeral-port rules and return routes.",
        "Inspect firewalls, TGW inspection paths, and asymmetric routing.",
        "Confirm whether NAT or load-balancer address translation changes the return path."
      ],
      remediation: [
        "Correct the specific return route or stateless filter.",
        "Restore symmetric routing where required by stateful inspection appliances.",
        "Re-test the original flow and check application error rates."
      ]
    },
    {
      scenario: "Intermittent connection failures under high traffic",
      diagnosis: [
        "Inspect NAT Gateway ErrorPortAllocation, packet-drop metrics, and connection volume.",
        "Check connection reuse, retry storms, ephemeral ports, DNS behavior, and application connection pools.",
        "Review firewall state-table limits and destination rate limits.",
        "Compare failures across source subnets and Availability Zones."
      ],
      remediation: [
        "Tune application connection reuse and retries to avoid retry amplification.",
        "Use approved scaling or network architecture changes where capacity evidence supports them.",
        "Add alarms for relevant metrics and validate under representative load."
      ]
    },
    {
      scenario: "Small requests work but large transfers fail",
      diagnosis: [
        "Check VPN or inspection-device encapsulation, MTU, MSS, and path-MTU discovery.",
        "Compare payload sizes and protocols without exposing sensitive data.",
        "Review host and network-device counters for fragmentation or dropped packets."
      ],
      remediation: [
        "Coordinate approved MTU/MSS changes with the network team.",
        "Retest representative payload sizes and TLS transfers.",
        "Do not globally lower MTU without confirming the affected path and consequences."
      ]
    },
    {
      scenario: "Security change causes sudden cross-service outage",
      diagnosis: [
        "Review CloudTrail for route, security-group, NACL, endpoint, or network-interface changes.",
        "Compare the current configuration with the last known good version.",
        "Identify all services sharing the modified security group, subnet, or route table.",
        "Use Flow Logs and a focused connection test to verify the suspected blocker."
      ],
      remediation: [
        "Roll back the specific change when it is confirmed as the cause and rollback is safe.",
        "If a forward fix is safer, apply the smallest approved correction.",
        "Add IaC review, policy checks, and staged rollout for shared network resources."
      ]
    },
    {
      scenario: "VPC endpoint exists but S3 or another AWS service remains unreachable",
      diagnosis: [
        "Confirm endpoint state, route-table association or endpoint ENIs, private DNS, and service name.",
        "Check the workload's resolved service address and network path.",
        "Distinguish network timeout from HTTP AccessDenied.",
        "Inspect IAM, resource policy, endpoint policy, and KMS permissions where applicable."
      ],
      remediation: [
        "Correct endpoint routing or security-group rules when the network path is blocked.",
        "Correct authorization policies only when the request reaches the service and the policy evidence identifies the denial.",
        "Avoid public bucket policies or broad IAM permissions as a network workaround."
      ]
    },
    {
      scenario: "VPC CIDR expansion or subnet exhaustion causes new workload failures",
      diagnosis: [
        "Check available subnet IP addresses and ENI/IP allocation errors.",
        "Inspect EC2 and EKS events for address allocation failures.",
        "Review overlapping CIDRs and routing implications before expansion.",
        "Check whether IP exhaustion is isolated to one subnet or affects multiple AZs."
      ],
      remediation: [
        "Use the approved CIDR and subnet expansion design.",
        "Distribute workloads across appropriately sized subnets.",
        "Validate IP capacity before scaling node groups or large deployment waves."
      ]
    },
    {
      scenario: "Infrastructure pipeline reports success but connectivity is broken",
      diagnosis: [
        "Inspect the exact Terraform plan, workspace, backend, variables, and applied commit.",
        "Compare intended routes and security controls with the actual AWS resource state.",
        "Check for manual drift and whether the pipeline targeted the correct account and Region.",
        "Verify application-level connectivity rather than treating successful resource creation as end-to-end validation."
      ],
      remediation: [
        "Reconcile drift through the approved IaC process.",
        "Add pre-apply plan review, account/Region guards, and post-deployment network tests.",
        "Avoid blind re-apply until the state and intended changes are understood."
      ]
    }
  ],

  monitoringAndPrevention: [
    "Enable VPC Flow Logs at the appropriate VPC, subnet, or ENI scope and ensure log delivery is monitored.",
    "Create CloudWatch alarms for relevant NAT Gateway metrics, including ErrorPortAllocation and packet-drop indicators, with thresholds based on workload behavior.",
    "Monitor VPN tunnel state, BGP route changes, Transit Gateway attachment health, and route propagation where applicable.",
    "Monitor ALB/NLB target health, HTTP 5xx, latency, connection errors, and application-level synthetic checks.",
    "Monitor EKS node and pod readiness, VPC CNI health, subnet free IP capacity, and CoreDNS errors.",
    "Use CloudTrail and infrastructure audit tooling to detect unexpected route, NACL, security-group, endpoint, and gateway changes.",
    "Manage network infrastructure through Terraform, CloudFormation, or an approved equivalent and review drift regularly.",
    "Use policy-as-code and CI checks to prevent unrestricted ingress, incorrect CIDRs, accidental route deletion, and unsafe shared-resource changes.",
    "Add pre-deployment tests for DNS resolution, TCP connectivity, application health, and the intended network path.",
    "Maintain subnet and IP-capacity forecasts for EC2, EKS, load balancers, interface endpoints, and scaling events.",
    "Use multi-AZ network designs where required by service availability objectives and budget.",
    "Document VPC CIDRs, route ownership, subnet purpose, gateway placement, DNS design, shared TGW routing, and escalation contacts.",
    "Review AWS networking costs, including NAT processing, cross-AZ data transfer, interface endpoint usage, and log ingestion.",
    "Run controlled game days for NAT failure, route mistakes, DNS failures, and VPN disruption in non-production environments.",
    "After incidents, update the runbook with the confirmed root cause, detection gap, recovery time, and preventive action owner."
  ],

  incidentRunbook: [
    "1. Declare the incident, assign an incident lead, and identify affected applications and environments.",
    "2. Record the incident start time, last known good state, recent changes, and customer impact.",
    "3. Confirm account, Region, VPC, subnets, source/destination, protocol, and port.",
    "4. Run read-only checks for route tables, gateway state, security groups, NACLs, DNS, and endpoint configuration.",
    "5. Collect Flow Logs, application errors, CloudTrail changes, and relevant CloudWatch metrics.",
    "6. Use Reachability Analyzer and focused workload tests to narrow the failure to a specific component.",
    "7. State the root-cause hypothesis and evidence before proposing a change.",
    "8. Obtain the required approval and select a minimal correction with a documented rollback.",
    "9. Apply the change through the owning infrastructure workflow and verify the actual AWS resource state.",
    "10. Test end-to-end connectivity from the real workload and confirm application health.",
    "11. Monitor for recurrence, confirm no unintended security exposure, and update the incident ticket.",
    "12. Complete a blameless post-incident review with timeline, root cause, detection gap, and assigned preventive actions."
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Diagnose a missing route",
      objective: "Learn how to identify an incorrect subnet route without changing production.",
      steps: [
        "Create a non-production VPC with a public subnet and a test instance.",
        "Inspect the subnet route-table association and Internet Gateway route.",
        "Use a controlled test to distinguish routing failure from a service-listener failure.",
        "Capture the route table and connectivity evidence.",
        "Correct the route in the lab and repeat the test."
      ],
      expectedOutcome: "You can explain how a subnet association, route destination, and route target affect connectivity."
    },
    {
      title: "Lab 2 — Diagnose private-subnet egress",
      objective: "Understand private-subnet routing through a NAT Gateway.",
      steps: [
        "Create a non-production private subnet and a separate public NAT subnet.",
        "Verify the NAT Gateway is available and the public subnet has the appropriate IGW route.",
        "Check the private subnet's default route.",
        "Test DNS and outbound HTTPS from a private workload.",
        "In a controlled lab, inspect the failure caused by an intentionally missing route, then restore the correct route."
      ],
      expectedOutcome: "You can trace private workload traffic through the NAT Gateway and identify the broken component."
    },
    {
      title: "Lab 3 — Security group versus NACL",
      objective: "Distinguish stateful security-group behavior from stateless NACL behavior.",
      steps: [
        "Create two non-production instances or endpoints and a simple TCP listener.",
        "Test a permitted connection and record the source and destination ports.",
        "Use a controlled security-group rule change to observe a connection failure.",
        "Restore the security-group rule, then test a narrowly scoped NACL rule change.",
        "Inspect Flow Logs and confirm the behavior after restoring the approved rules."
      ],
      expectedOutcome: "You can explain why a security-group rule and a NACL rule can cause different failure patterns."
    },
    {
      title: "Lab 4 — DNS versus network failure",
      objective: "Separate DNS resolution from TCP connectivity.",
      steps: [
        "Use a test hostname that resolves to a controlled lab endpoint.",
        "Run dig or nslookup and record the resolved address.",
        "Test TCP to the destination IP and expected port.",
        "Compare a deliberately incorrect test record with a network-level failure.",
        "Restore the correct record and verify the application request."
      ],
      expectedOutcome: "You can identify whether a failure occurs during name resolution or after resolution."
    },
    {
      title: "Lab 5 — VPC Flow Logs investigation",
      objective: "Use flow metadata to support a network root-cause hypothesis.",
      steps: [
        "Enable Flow Logs for a non-production test VPC or ENI.",
        "Generate an approved successful connection and a controlled rejected connection.",
        "Query the configured log group using the actual record format.",
        "Correlate source, destination, protocol, ports, interface, and timestamps.",
        "Correct the lab configuration and verify the new flow behavior."
      ],
      expectedOutcome: "You can correlate Flow Logs with security controls and explain the limits of flow metadata."
    },
    {
      title: "Lab 6 — VPC peering routing",
      objective: "Troubleshoot cross-VPC connectivity and return routes.",
      steps: [
        "Create two non-production VPCs with non-overlapping CIDRs.",
        "Establish a peering connection and add the approved routes in both VPCs.",
        "Test an allowed service between the lab instances.",
        "Remove a test route in the lab and record the failure.",
        "Restore the route and verify the full round-trip path."
      ],
      expectedOutcome: "You can explain why a peering connection alone does not create complete connectivity."
    },
    {
      title: "Lab 7 — Reachability Analyzer",
      objective: "Use static path analysis to identify supported AWS network blockers.",
      steps: [
        "Create a supported source and destination path in a non-production VPC.",
        "Run Reachability Analyzer for the required protocol and port.",
        "Review the analysis result and any identified blocking component.",
        "Correct the lab configuration and repeat the analysis.",
        "Remove unneeded lab resources and analysis artifacts according to the lab cleanup plan."
      ],
      expectedOutcome: "You can use path analysis to narrow configuration problems without repeatedly modifying live resources."
    },
    {
      title: "Lab 8 — Incident timeline and recovery",
      objective: "Practice evidence-based incident response.",
      steps: [
        "Use a non-production network configuration with a documented last known good state.",
        "Introduce one controlled routing or filtering error.",
        "Record the first symptom and collect configuration, flow, and application evidence.",
        "Identify the exact root cause and document a minimal fix and rollback.",
        "Apply the fix and verify end-to-end application health."
      ],
      expectedOutcome: "You can produce a reproducible incident timeline, root-cause statement, and recovery record."
    }
  ],

  interviewQuestions: [
    {
      question: "What is an AWS VPC?",
      answer: "A Virtual Private Cloud is a logically isolated virtual network in AWS where you define IP address ranges, subnets, routing, and network controls for your resources."
    },
    {
      question: "What is the difference between a public and a private subnet?",
      answer: "A subnet is commonly called public when its route table provides a path to an Internet Gateway. A private subnet generally does not provide direct inbound internet reachability. Actual reachability also depends on addressing, routes, security controls, and the destination service."
    },
    {
      question: "Does an Internet Gateway automatically make an EC2 instance public?",
      answer: "No. The VPC must have the appropriate IGW attachment and route, and the instance needs suitable public addressing and permitted traffic. The service must also be listening."
    },
    {
      question: "What is the difference between a NAT Gateway and an Internet Gateway?",
      answer: "An Internet Gateway provides a path between a VPC and the internet for appropriately routed and addressed traffic. A NAT Gateway enables eligible private-subnet workloads to initiate outbound IPv4 connections without exposing their private addresses directly."
    },
    {
      question: "Why is a private instance unable to access the internet even though the NAT Gateway is available?",
      answer: "Possible causes include a missing private-subnet route, an incorrect NAT-subnet route, filtering, DNS failure, or a destination problem. Verify the full path rather than relying only on NAT Gateway state."
    },
    {
      question: "What is the difference between a route table, a security group, and a NACL?",
      answer: "A route table selects the next hop for traffic. A security group is a stateful allow-list associated with network interfaces. A NACL is a stateless subnet-level filter with numbered inbound and outbound rules."
    },
    {
      question: "Why can a security group allow traffic while the connection still fails?",
      answer: "The route may be missing, a NACL may block traffic, the destination may not be listening, the host firewall may reject it, DNS may point to the wrong address, or the return path may be broken."
    },
    {
      question: "How do you troubleshoot a connection timeout?",
      answer: "Capture source, destination, protocol, port, and time; inspect forward and return routes, security groups, NACLs, Flow Logs, and the destination listener. Use Reachability Analyzer where supported."
    },
    {
      question: "How do you troubleshoot connection refused?",
      answer: "Check whether the destination is reachable and whether a process listens on the expected port. Inspect service binding, host firewall, container port mapping, and load-balancer target configuration."
    },
    {
      question: "Why are NACLs called stateless?",
      answer: "They evaluate inbound and outbound traffic independently. Response traffic must be permitted by the applicable rule in the reverse direction, including the required ephemeral ports."
    },
    {
      question: "What is VPC Flow Logs used for?",
      answer: "Flow Logs capture network-flow metadata for configured resources. They help correlate source and destination addresses, ports, protocol, interface, and accepted or rejected traffic. They are not a full packet capture."
    },
    {
      question: "What is VPC Reachability Analyzer?",
      answer: "It performs static analysis of supported AWS network configurations to determine whether a path can be established and can identify configuration blockers. It does not send live application packets."
    },
    {
      question: "What is VPC peering, and is it transitive?",
      answer: "VPC peering privately connects two VPCs. Peering is not transitive, so routing from one VPC through a peered VPC to another does not work automatically."
    },
    {
      question: "When would you use Transit Gateway?",
      answer: "Transit Gateway is useful for hub-and-spoke connectivity across many VPCs and supported hybrid networks. Its attachment associations, route-table propagation, routes, and return paths must be configured correctly."
    },
    {
      question: "A VPN tunnel is up, but application traffic fails. What do you check?",
      answer: "Check VPC routes, on-premises routes, BGP advertisements or static routes, firewalls, NACLs, security groups, return routing, and possible MTU/MSS issues."
    },
    {
      question: "Why can an AWS API request fail from a private subnet?",
      answer: "The workload may lack a NAT path or the required VPC endpoint. Endpoint routing, private DNS, endpoint security groups, endpoint policies, IAM permissions, and resource policies may also affect access."
    },
    {
      question: "How do you troubleshoot EKS pod networking?",
      answer: "Check pod events and IP assignment, VPC CNI health, node ENIs, subnet IP capacity, DNS, NetworkPolicies, security groups, NACLs, routes, and destination health."
    },
    {
      question: "How do you identify which network change caused an outage?",
      answer: "Correlate the incident start time with CloudTrail events, infrastructure pipeline logs, IaC diffs, current AWS configuration, Flow Logs, and a reproducible connectivity test."
    },
    {
      question: "How would you recover a production networking outage safely?",
      answer: "Assess impact, preserve evidence, identify the exact blocker, review dependencies and ownership, obtain approval, apply a minimal correction, define rollback conditions, and verify end-to-end recovery."
    },
    {
      question: "What is the difference between a network issue and an IAM issue?",
      answer: "Network issues commonly manifest as DNS failures, timeouts, or connection failures. IAM or resource-policy issues commonly return authorization errors after a request reaches the service. The exact evidence should determine the investigation path."
    },
    {
      question: "Why might small packets work while large transfers fail?",
      answer: "MTU, path-MTU discovery, encapsulation overhead, MSS, or filtering can affect larger packets differently. Validate packet-size behavior before changing MTU settings."
    },
    {
      question: "How do you prevent networking regressions in Terraform deployments?",
      answer: "Use reviewed plans, validate the intended account and workspace, apply policy-as-code checks, inspect destructive changes, use staged rollouts, and perform post-deployment DNS, TCP, and application health tests."
    }
  ],

  officialReferences: [
    {
      title: "Amazon VPC User Guide",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"
    },
    {
      title: "VPC Route Tables",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html"
    },
    {
      title: "Internet Gateways",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html"
    },
    {
      title: "NAT Gateways",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html"
    },
    {
      title: "Security Groups",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html"
    },
    {
      title: "Network ACLs",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html"
    },
    {
      title: "VPC Flow Logs",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html"
    },
    {
      title: "Reachability Analyzer",
      url: "https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html"
    },
    {
      title: "VPC Peering",
      url: "https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html"
    },
    {
      title: "Transit Gateway",
      url: "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html"
    },
    {
      title: "AWS Site-to-Site VPN",
      url: "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html"
    },
    {
      title: "VPC Endpoints",
      url: "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html"
    },
    {
      title: "Amazon EKS VPC Networking",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/eks-networking.html"
    },
    {
      title: "Elastic Load Balancing Target Health",
      url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html"
    },
    {
      title: "AWS CloudTrail Event History",
      url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html"
    }
  ]
};
