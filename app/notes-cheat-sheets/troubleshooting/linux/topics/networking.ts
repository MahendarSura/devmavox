import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Linux Networking - Complete Practical Guide",
  description: "Complete Linux networking guide covering TCP/IP, IP addressing, interfaces, routing, DNS, ports, firewalls, SSH, troubleshooting, packet analysis, production networking and DevOps projects.",
  sections: [
    {
      heading: "1. Introduction to Linux Networking",
      explanation: `Linux networking allows servers, applications, containers and users to communicate with other systems through local networks and the internet. Networking is essential for web applications, databases, cloud infrastructure, Kubernetes clusters and distributed systems.

A Linux server uses network interfaces to connect to physical or virtual networks. Each interface may have an IP address, subnet mask or prefix, MAC address and routing configuration. The system uses routing tables to determine where packets should be sent.

Network communication commonly involves several layers. Applications use protocols such as HTTP, HTTPS, SSH and DNS. Transport protocols such as TCP and UDP carry application data. IP provides addressing and routing, while Ethernet and other link technologies move frames across the local network.

When a production application is unreachable, the issue may involve DNS, routing, firewall rules, port listening, network interfaces, packet loss or the application itself. Troubleshooting should move systematically from the local interface toward the remote service.

Linux provides tools such as ip, ss, ping, traceroute, dig, curl, tcpdump and ethtool to inspect and diagnose network behavior.`,
      steps: [
        "Identify the affected server and application.",
        "Inspect available network interfaces.",
        "Check IP addresses and subnet information.",
        "Inspect routing and DNS configuration.",
        "Verify connectivity to the gateway and destination.",
        "Check whether the required application port is listening.",
        "Review firewall rules and network logs."
      ],
      commands: [
        "ip addr show",
        "ip link show",
        "ip route show",
        "ss -tulpen",
        "ping -c 4 8.8.8.8",
        "cat /etc/resolv.conf"
      ],
      problems: [
        {
          issue: "A Linux server cannot access an external application.",
          rootCause: "The problem may be caused by an incorrect IP address, missing route, DNS failure, firewall restriction or unavailable destination.",
          solution: "Check interface status, routes, DNS resolution, destination connectivity and application port availability in that order."
        }
      ]
    },
    {
      heading: "2. Linux Network Architecture",
      explanation: `Linux networking consists of user-space applications, the socket interface, the kernel networking stack, network devices and external networks.

Applications such as browsers, web servers and database clients use sockets to communicate. The socket API passes data to the kernel networking stack. The kernel processes transport and network-layer information, applies routing decisions and sends packets through the selected network interface.

Incoming packets are received by the network interface and processed by the kernel. Firewall rules, connection tracking and routing decisions may affect how the packet reaches its destination application.

The kernel uses network interfaces represented by names such as eth0, ens33, enp0s3 and lo. The loopback interface allows communication within the same host using addresses such as 127.0.0.1.

Virtual interfaces, bridges, VLAN devices, tunnels and container interfaces extend the networking architecture. Cloud environments also include virtual network interfaces, security groups, route tables and network access controls.

Understanding the packet path helps distinguish application problems from kernel, interface, routing and firewall problems.`,
      steps: [
        "Identify the application socket.",
        "Inspect the transport connection.",
        "Check the kernel routing decision.",
        "Identify the outgoing network interface.",
        "Inspect firewall and connection-tracking behavior.",
        "Verify the remote endpoint response."
      ],
      commands: [
        "ip -br addr",
        "ip route get 8.8.8.8",
        "ss -s",
        "ss -tpn",
        "ip neigh show",
        "cat /proc/net/dev"
      ],
      problems: [
        {
          issue: "A packet reaches the server but the application does not receive the request.",
          rootCause: "Firewall rules, incorrect routing, socket binding or local network filtering may prevent delivery.",
          solution: "Inspect packet captures, socket listeners, firewall rules and the application's bind address."
        }
      ]
    },
    {
      heading: "3. IP Addressing and Subnetting",
      explanation: `An IP address identifies a device or network interface at the network layer. Linux commonly supports IPv4 and IPv6.

An IPv4 address contains 32 bits and is normally written as four decimal octets, such as 192.168.1.20. A subnet prefix determines which bits represent the network and which bits identify hosts. For example, /24 represents the subnet mask 255.255.255.0.

A server configured with 192.168.1.20/24 normally considers 192.168.1.0/24 its directly connected network. Traffic outside that subnet is generally sent through a gateway according to the routing table.

IPv6 uses 128-bit addresses and supports a much larger address space. A typical IPv6 address may look like 2001:db8::10. The loopback address is ::1.

Private IPv4 ranges include 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. These addresses are commonly used inside private networks and are not directly routable over the public internet.

Incorrect subnet configuration can cause local communication failures even when the interface appears active.`,
      steps: [
        "Inspect the current interface addresses.",
        "Identify the prefix length.",
        "Determine the connected subnet.",
        "Verify that the gateway belongs to the expected network.",
        "Check for duplicate IP address conflicts.",
        "Confirm IPv4 and IPv6 behavior separately."
      ],
      commands: [
        "ip -4 addr show",
        "ip -6 addr show",
        "ip addr show dev eth0",
        "ip route",
        "ipcalc 192.168.1.20/24",
        "ping -c 4 192.168.1.1"
      ],
      problems: [
        {
          issue: "Two servers in the same environment cannot communicate.",
          rootCause: "They may have incorrect subnet prefixes, duplicate addresses or incompatible network configuration.",
          solution: "Compare IP addresses and prefixes, verify the connected routes and check for duplicate address assignments."
        }
      ]
    },
    {
      heading: "4. Network Interfaces and Link Management",
      explanation: `A network interface connects a Linux system to a network. Physical interfaces use hardware such as Ethernet adapters, while virtual interfaces are created by software, hypervisors, containers and network management tools.

The ip link command displays interface state and properties. An interface can be administratively up but still have no carrier because the cable, virtual switch or upstream network is unavailable.

The MAC address identifies a network interface at the link layer. The MTU defines the maximum packet size supported by an interface without fragmentation at that layer. Ethernet commonly uses an MTU of 1500 bytes, although jumbo-frame environments may use larger values.

The ethtool utility provides information about supported link modes, negotiated speed, duplex and driver details for supported Ethernet devices.

Interface names vary by distribution and environment. Never assume the primary interface is named eth0. Use ip -br link to identify actual interface names before applying changes.`,
      steps: [
        "List network interfaces.",
        "Check administrative and operational state.",
        "Inspect MAC address and MTU.",
        "Check carrier and negotiated speed.",
        "Identify the interface driver when required.",
        "Apply configuration through the appropriate network manager."
      ],
      commands: [
        "ip -br link",
        "ip link show",
        "ip link show dev eth0",
        "ip link set eth0 up",
        "ip link set eth0 down",
        "ip link set dev eth0 mtu 1500",
        "ethtool eth0"
      ],
      problems: [
        {
          issue: "A network interface shows NO-CARRIER.",
          rootCause: "The physical connection, virtual switch connection or upstream network link may be unavailable.",
          solution: "Check cable or virtual network attachment, switch port status, hypervisor settings and interface driver information."
        }
      ]
    },
    {
      heading: "5. Routing Tables and Default Gateway",
      explanation: `Routing determines where Linux sends outgoing IP packets. The kernel maintains routing tables containing destination networks, gateways, interface names, route metrics and other attributes.

A connected route allows communication with a directly attached subnet. A default route is used when no more specific route matches the destination. It commonly points to the network gateway.

The ip route command displays and manages routes. The ip route get command is particularly useful because it shows the route the kernel would use for a particular destination.

A server may have multiple interfaces and multiple possible gateways. Route metrics and policy routing rules influence which route is selected.

Incorrect routing can produce one-way connectivity. A request may reach a remote system while the response follows a different path and is blocked by a firewall or network device.

In production environments, route changes should be coordinated with network administrators because an incorrect default route can disconnect the server.`,
      steps: [
        "Display the routing table.",
        "Identify the default gateway.",
        "Check the route selected for the destination.",
        "Verify gateway reachability.",
        "Inspect policy routing rules if multiple networks exist.",
        "Make persistent route changes through the correct network manager."
      ],
      commands: [
        "ip route show",
        "ip route get 8.8.8.8",
        "ip route show default",
        "ip rule show",
        "ip route add 10.20.0.0/16 via 192.168.1.1",
        "ip route del 10.20.0.0/16"
      ],
      problems: [
        {
          issue: "The server can reach local machines but cannot reach external networks.",
          rootCause: "The default gateway may be missing, incorrect or unreachable.",
          solution: "Inspect the default route, verify the gateway address and confirm that upstream routing and firewall policies allow the required traffic."
        }
      ]
    },
    {
      heading: "6. DNS Resolution and Name Services",
      explanation: `DNS translates domain names into IP addresses. Applications usually need DNS resolution before connecting to services using hostnames.

Linux name resolution can involve /etc/hosts, DNS servers, the Name Service Switch configuration in /etc/nsswitch.conf and local resolver services such as systemd-resolved.

The /etc/resolv.conf file commonly contains nameserver entries and resolver options. On systems using systemd-resolved, this file may be managed automatically or point to a local stub resolver.

The dig and nslookup commands query DNS servers. getent hosts checks name resolution through the system's configured name service path, which can behave differently from querying a DNS server directly.

DNS problems may affect only certain domains, only IPv6 records or only one server. Investigate the resolver configuration, search domains, DNS reachability and returned records.

In cloud environments, private DNS zones and internal service names are often important for communication between applications.`,
      steps: [
        "Check the resolver configuration.",
        "Inspect the system name service order.",
        "Query the domain using dig.",
        "Check resolution through getent.",
        "Test the configured DNS server.",
        "Compare A and AAAA records.",
        "Verify internal DNS zones and search domains."
      ],
      commands: [
        "cat /etc/resolv.conf",
        "cat /etc/nsswitch.conf",
        "dig example.com",
        "dig A example.com",
        "dig AAAA example.com",
        "nslookup example.com",
        "getent hosts example.com",
        "resolvectl status"
      ],
      problems: [
        {
          issue: "An application reports that a hostname cannot be resolved.",
          rootCause: "The DNS server may be unreachable, the record may be missing, or local resolver configuration may be incorrect.",
          solution: "Check /etc/resolv.conf, query the configured resolver with dig, inspect internal DNS records and verify system name-service configuration."
        }
      ]
    },
    {
      heading: "7. TCP, UDP and Network Ports",
      explanation: `TCP and UDP are transport-layer protocols used by applications to exchange data.

TCP provides connection-oriented communication with sequencing, acknowledgements, retransmission and flow control. It is commonly used by HTTP, HTTPS, SSH and database connections.

UDP is connectionless and has lower protocol overhead. It is used by DNS queries, streaming, voice applications and other protocols where the application manages reliability or latency requirements.

A port identifies an application endpoint on a host. Common ports include SSH 22, DNS 53, HTTP 80, HTTPS 443, SMTP 25 and PostgreSQL 5432. Actual service ports may be changed by administrators.

The ss command displays socket information and is preferred over the older netstat utility on modern Linux systems.

A port can be listening locally but inaccessible remotely because of host firewall rules, cloud security groups, network ACLs or upstream firewalls.`,
      steps: [
        "Identify the required application port.",
        "Check whether the service is listening.",
        "Identify the process that owns the socket.",
        "Test local connectivity.",
        "Test connectivity from another host.",
        "Inspect firewall and cloud network rules."
      ],
      commands: [
        "ss -tulpen",
        "ss -lntp",
        "ss -lunp",
        "ss -tan",
        "lsof -i :8080",
        "nc -vz 192.168.1.20 8080",
        "curl -v http://127.0.0.1:8080"
      ],
      problems: [
        {
          issue: "A remote client cannot connect to port 8080.",
          rootCause: "The service may not be listening, may be bound only to loopback, or traffic may be blocked by a firewall.",
          solution: "Use ss to inspect the listener, check its bind address, test locally and inspect host, cloud and upstream firewall rules."
        }
      ]
    },
    {
      heading: "8. Firewall Configuration with UFW and firewalld",
      explanation: `A firewall controls network traffic based on rules such as source address, destination address, protocol and port.

Linux firewalling commonly uses the netfilter framework in the kernel. Administrators interact with it through tools such as nftables, iptables, UFW and firewalld.

UFW is a simplified firewall management tool often used on Ubuntu systems. firewalld provides zone-based firewall management and is common on RHEL-family systems.

A firewall policy should allow only required traffic. For example, a public web server may need inbound TCP 80 and 443, while SSH should be restricted to trusted administrative sources.

Before enabling a firewall remotely, ensure that the management connection is permitted. Otherwise, the administrator may lock themselves out.

Cloud firewalls and security groups are separate controls from the operating system firewall. Both layers must be checked when diagnosing blocked connections.`,
      steps: [
        "Identify which firewall manager is installed.",
        "Inspect current rules before changing them.",
        "Identify the source and destination of required traffic.",
        "Allow only the required ports and protocols.",
        "Preserve administrative access.",
        "Test the connection from an external host.",
        "Document and persist the approved rules."
      ],
      commands: [
        "ufw status verbose",
        "ufw allow 22/tcp",
        "ufw allow 80/tcp",
        "ufw allow 443/tcp",
        "firewall-cmd --state",
        "firewall-cmd --list-all",
        "firewall-cmd --add-port=8080/tcp --permanent",
        "firewall-cmd --reload",
        "nft list ruleset"
      ],
      problems: [
        {
          issue: "An application port is listening but external clients cannot connect.",
          rootCause: "A host firewall, cloud security group or network ACL may block inbound traffic.",
          solution: "Inspect all firewall layers, add the narrowest required allow rule and test from the actual client network."
        }
      ]
    },
    {
      heading: "9. SSH Networking and Remote Access",
      explanation: `SSH provides encrypted remote shell access and secure file transfer between systems. It is widely used by Linux administrators, DevOps engineers and automation tools.

The SSH server daemon is commonly called sshd and listens on TCP port 22 by default. The server configuration is commonly stored in /etc/ssh/sshd_config and additional configuration files may be included.

SSH connectivity depends on DNS or IP reachability, routing, firewall rules, the SSH daemon, authentication configuration and user permissions.

Public-key authentication uses a private key on the client and a corresponding public key in the server user's authorized_keys file. Private keys must remain protected.

SSH troubleshooting should distinguish between network timeouts, connection refusal, host key warnings and authentication failures. Each indicates a different stage of the connection process.

Production servers should use secure authentication policies, controlled administrative access and appropriate audit logging.`,
      steps: [
        "Verify the target hostname or IP address.",
        "Check network reachability.",
        "Check whether TCP port 22 is accessible.",
        "Confirm that sshd is running.",
        "Validate SSH server configuration.",
        "Inspect authentication logs.",
        "Verify key permissions and authorized_keys entries."
      ],
      commands: [
        "systemctl status ssh",
        "systemctl status sshd",
        "ss -lntp | grep ':22'",
        "ssh -v user@192.168.1.20",
        "ssh-keygen -l -f ~/.ssh/id_rsa.pub",
        "sshd -t",
        "journalctl -u ssh -n 50",
        "journalctl -u sshd -n 50"
      ],
      problems: [
        {
          issue: "SSH connection times out.",
          rootCause: "The destination may be unreachable, port 22 may be filtered, or a route may be missing.",
          solution: "Check IP reachability, routing, firewall rules, cloud security controls and the SSH listener before investigating authentication."
        }
      ]
    },
    {
      heading: "10. Network Troubleshooting Commands",
      explanation: `Linux includes several utilities for diagnosing connectivity, routing, DNS, ports and packet behavior.

ping tests whether ICMP echo requests receive replies. A missing reply does not always mean a host is unavailable because firewalls may block ICMP.

traceroute or tracepath helps identify the network path toward a destination. Some routers do not respond to probes, so incomplete output does not always indicate a routing failure.

curl tests application-level HTTP and HTTPS communication. nc can test whether a TCP port accepts connections. dig investigates DNS records. ss shows local sockets and their states.

tcpdump captures packets and is useful when application logs and connection tests are insufficient. Packet captures should be filtered carefully because they may contain sensitive information.

No single command proves complete network health. Combine interface, route, DNS, port and application-level checks to identify the failing layer.`,
      steps: [
        "Check interface status and IP configuration.",
        "Ping the local gateway.",
        "Test external IP connectivity.",
        "Resolve the destination hostname.",
        "Inspect the route to the destination.",
        "Test the application port.",
        "Capture packets if the failure remains unclear."
      ],
      commands: [
        "ping -c 4 192.168.1.1",
        "tracepath example.com",
        "traceroute example.com",
        "curl -Iv https://example.com",
        "nc -vz example.com 443",
        "dig example.com",
        "ss -tulpen",
        "ip route get 1.1.1.1"
      ],
      problems: [
        {
          issue: "Ping succeeds but the application is unavailable.",
          rootCause: "ICMP connectivity does not prove that the application port, service process or application protocol is working.",
          solution: "Test the actual destination port with nc or curl, inspect the listening process and review application logs."
        }
      ]
    },
    {
      heading: "11. Network Packet Analysis with tcpdump",
      explanation: `tcpdump captures and displays packets traveling through selected network interfaces. It helps investigate connection failures, retransmissions, DNS requests, unexpected traffic and communication between hosts.

Packet capture filters can limit traffic by host, network, port and protocol. For example, administrators can capture TCP traffic for port 443 or DNS traffic on port 53.

The -i option selects the interface, -n disables name resolution, -c limits the number of packets and -w writes packets to a capture file for later analysis.

Packet captures can contain sensitive information, including internal addresses, metadata and unencrypted application data. Capture only what is necessary, restrict file access and follow organizational security policies.

For TLS traffic, tcpdump generally shows packet metadata and encrypted payload rather than readable application content. Wireshark can be used to analyze saved capture files in more detail.`,
      steps: [
        "Identify the interface carrying the traffic.",
        "Define the host, port and protocol filter.",
        "Capture a limited amount of traffic.",
        "Inspect packet direction and connection behavior.",
        "Save a capture when deeper analysis is required.",
        "Protect and remove capture files according to policy."
      ],
      commands: [
        "tcpdump -D",
        "tcpdump -i any -nn",
        "tcpdump -i eth0 -nn port 443",
        "tcpdump -i eth0 -nn host 192.168.1.10",
        "tcpdump -i eth0 -nn udp port 53",
        "tcpdump -i eth0 -nn -c 100",
        "tcpdump -i eth0 -w network-debug.pcap",
        "tcpdump -r network-debug.pcap"
      ],
      problems: [
        {
          issue: "A TCP connection repeatedly retransmits packets.",
          rootCause: "Packet loss, congestion, unstable links, firewall behavior or an overloaded destination may prevent acknowledgements.",
          solution: "Capture traffic at both endpoints when possible, compare retransmissions and acknowledgements, inspect interface errors and investigate network path health."
        }
      ]
    },
    {
      heading: "12. Network Performance and Packet Loss",
      explanation: `Network performance depends on bandwidth, latency, packet loss, jitter, congestion and endpoint processing capacity.

Latency measures the time required for data to travel between endpoints. Packet loss occurs when packets fail to reach their destination. Jitter describes variation in packet delay and is important for real-time communication.

A server may have high bandwidth but poor application performance because of latency, retransmissions, DNS delays or an overloaded application. Network troubleshooting must therefore include application-level measurements.

Interface counters can reveal dropped packets, errors and overruns. Tools such as ip -s link, ethtool, ping, mtr and ss provide useful diagnostic information.

TCP connection queues and retransmissions can also indicate that the server is overloaded or that the network path is unstable.

Compare measurements from healthy and affected servers before changing MTU, TCP settings or network hardware configuration.`,
      steps: [
        "Measure baseline latency.",
        "Check packet loss to the gateway and destination.",
        "Inspect interface error and drop counters.",
        "Review TCP connection states.",
        "Check path behavior using mtr where available.",
        "Compare application response time with network measurements."
      ],
      commands: [
        "ping -c 20 8.8.8.8",
        "mtr -rw example.com",
        "ip -s link",
        "ethtool -S eth0",
        "ss -s",
        "ss -ti",
        "sar -n DEV 1 5"
      ],
      problems: [
        {
          issue: "Application response time becomes slow during peak traffic.",
          rootCause: "Network congestion, packet loss, interface errors, high connection counts or application saturation may contribute.",
          solution: "Compare latency and loss measurements, inspect interface counters and socket statistics, then identify whether the bottleneck is in the network or application."
        }
      ]
    },
    {
      heading: "13. MTU, Fragmentation and Path MTU Discovery",
      explanation: `MTU is the maximum packet size that a network interface can transmit at its link layer without fragmentation at that layer. Standard Ethernet commonly uses an MTU of 1500 bytes.

When packets travel across networks with different MTUs, a packet that is too large may require fragmentation or may be dropped when fragmentation is not permitted.

Path MTU Discovery helps endpoints determine the largest packet size that can travel across a path. If required ICMP messages are blocked, some connections may hang or fail only when transferring larger amounts of data.

VPN tunnels, overlays, container networks and cloud networks may introduce additional encapsulation overhead. Their effective MTU can be smaller than the physical network MTU.

Do not change MTU values randomly. Confirm the actual path behavior and coordinate changes across connected interfaces and network devices.`,
      steps: [
        "Inspect interface MTU values.",
        "Identify tunnel or overlay encapsulation.",
        "Test different packet sizes where appropriate.",
        "Check for fragmentation-related messages.",
        "Compare behavior across affected and healthy paths.",
        "Apply a coordinated MTU adjustment only after confirming the cause."
      ],
      commands: [
        "ip link show",
        "ip link show dev eth0",
        "ping -M do -s 1472 -c 3 192.168.1.1",
        "tracepath example.com",
        "tracepath -n 192.168.1.1",
        "tcpdump -ni eth0 'icmp'"
      ],
      problems: [
        {
          issue: "Small requests work but large transfers hang.",
          rootCause: "A path MTU problem or blocked fragmentation-needed ICMP messages may prevent large packets from progressing.",
          solution: "Test path MTU, inspect tunnel overhead and firewall behavior, and apply an appropriate coordinated MTU or MSS adjustment."
        }
      ]
    },
    {
      heading: "14. NetworkManager and Persistent Network Configuration",
      explanation: `Linux network configuration may be managed by NetworkManager, systemd-networkd, Netplan or distribution-specific configuration files.

NetworkManager is common on desktop systems and many server installations. It manages connection profiles, interface activation, IP addresses, DNS settings and routes.

Ubuntu systems commonly use Netplan as a configuration layer that generates configuration for NetworkManager or systemd-networkd.

systemd-networkd manages network configuration through .network and .netdev files. The selected configuration method depends on the operating system and installation.

Temporary changes made using ip commands may disappear after reboot or when a network manager reapplies its profile. Persistent configuration should be implemented through the active network management system.

Before modifying remote server networking, arrange console access or a rollback plan. Incorrect gateway, address or DNS settings can disconnect remote administration.`,
      steps: [
        "Identify the active network manager.",
        "Inspect existing connection profiles.",
        "Back up the relevant configuration.",
        "Modify the correct configuration source.",
        "Validate configuration syntax.",
        "Apply changes during an approved maintenance window.",
        "Verify connectivity after applying the changes."
      ],
      commands: [
        "systemctl status NetworkManager",
        "nmcli device status",
        "nmcli connection show",
        "networkctl status",
        "netplan get",
        "netplan generate",
        "netplan try",
        "ip addr show"
      ],
      problems: [
        {
          issue: "A manually configured IP address disappears after reboot.",
          rootCause: "The change was applied temporarily using ip commands rather than saved in the active network manager configuration.",
          solution: "Identify the active network manager and create a persistent connection profile using its supported configuration method."
        }
      ]
    },
    {
      heading: "15. Linux Network Security and Hardening",
      explanation: `Network security protects Linux servers from unauthorized access, malicious traffic and service exposure.

A secure server should expose only required services. Administrators should restrict SSH access, use strong authentication, maintain firewall policies and monitor unexpected listening ports.

Network services should bind to the intended interfaces. A database intended for local application access should not accidentally listen on every public interface.

Use encrypted protocols such as HTTPS and SSH rather than sending sensitive information over plaintext protocols. Certificates should be validated and renewed before expiration.

Security monitoring should identify unexpected port exposure, unusual outbound connections, repeated authentication failures and changes to firewall rules.

Cloud security groups, network ACLs, host firewalls and application authentication are separate layers. A secure design checks all relevant layers rather than depending on one firewall.`,
      steps: [
        "Inventory listening network services.",
        "Remove or disable unnecessary services.",
        "Restrict administrative ports to trusted sources.",
        "Use secure authentication and encrypted protocols.",
        "Review firewall and cloud network policies.",
        "Monitor unexpected connections and security events.",
        "Document approved network exposure."
      ],
      commands: [
        "ss -tulpen",
        "systemctl --type=service --state=running",
        "ufw status verbose",
        "firewall-cmd --list-all",
        "nft list ruleset",
        "journalctl -u ssh --since today",
        "ip neigh show"
      ],
      problems: [
        {
          issue: "An internal database is unexpectedly reachable from the public network.",
          rootCause: "The database may bind to all interfaces and firewall or cloud security rules may permit external access.",
          solution: "Restrict the database bind address, apply source-restricted firewall rules, review cloud network policies and verify remote access is blocked."
        }
      ]
    },
    {
      heading: "16. Linux Networking in Docker and Containers",
      explanation: `Docker provides several networking modes that connect containers to each other and to external networks.

Bridge networking creates a virtual bridge on the host and connects containers through virtual Ethernet interfaces. Containers on the same user-defined bridge network can usually communicate using container names through Docker's embedded DNS.

Host networking shares the host network namespace and removes the usual network isolation between the container and host. None networking disables normal container networking.

Port publishing maps a host port to a container port. For example, publishing host port 8080 to container port 80 allows clients to reach the container through the host's published port.

Container networking failures may involve incorrect network membership, DNS resolution, published ports, host firewall rules or application bind addresses.

Use docker network inspect to understand network membership and gateway configuration. Do not expose container ports publicly unless the application requires it.`,
      steps: [
        "Inspect running containers and published ports.",
        "Identify the Docker network mode.",
        "Inspect bridge network configuration.",
        "Verify that containers share the intended network.",
        "Test container-to-container DNS and connectivity.",
        "Inspect host firewall and port publishing rules."
      ],
      commands: [
        "docker ps",
        "docker network ls",
        "docker network inspect bridge",
        "docker inspect container_name",
        "docker port container_name",
        "docker exec container_name ip addr",
        "docker exec container_name getent hosts other_container",
        "docker logs container_name"
      ],
      problems: [
        {
          issue: "One container cannot connect to another container by name.",
          rootCause: "The containers may be attached to different networks or may be using an unsuitable default network configuration.",
          solution: "Create or select the intended user-defined bridge network, attach both containers and verify embedded DNS resolution."
        }
      ]
    },
    {
      heading: "17. Linux Networking in Kubernetes",
      explanation: `Kubernetes networking enables communication between Pods, Services, nodes and external clients.

Every Pod receives an IP address through the cluster networking implementation. A Container Network Interface plugin such as Calico, Cilium or Flannel provides Pod connectivity and may enforce network policies.

Kubernetes Services provide stable virtual access to a group of Pods. ClusterIP is used for internal access, NodePort exposes a port on cluster nodes, and LoadBalancer integrates with supported external load-balancing infrastructure.

CoreDNS commonly provides DNS resolution for Kubernetes Services and Pods. A DNS failure may therefore affect service-to-service communication even when Pod IP connectivity works.

NetworkPolicy resources can restrict which Pods are allowed to communicate. Actual enforcement depends on the installed CNI implementation.

Troubleshooting should inspect Pod readiness, endpoints, Services, DNS, network policies and CNI health. A successful node-level ping does not prove that application traffic through a Kubernetes Service works.`,
      steps: [
        "Inspect Pod IP addresses and node placement.",
        "Check Service selectors and endpoints.",
        "Verify DNS resolution from an affected Pod.",
        "Test Pod-to-Pod communication.",
        "Inspect NetworkPolicy resources.",
        "Review CNI and CoreDNS health.",
        "Correlate network failures with application logs."
      ],
      commands: [
        "kubectl get pods -A -o wide",
        "kubectl get svc -A",
        "kubectl get endpoints -A",
        "kubectl get networkpolicy -A",
        "kubectl describe pod pod_name -n namespace",
        "kubectl logs -n kube-system deployment/coredns",
        "kubectl exec -it pod_name -n namespace -- nslookup kubernetes.default",
        "kubectl get nodes"
      ],
      problems: [
        {
          issue: "A Pod cannot connect to a Kubernetes Service.",
          rootCause: "The Service selector may not match the intended Pods, endpoints may be missing, DNS may fail or NetworkPolicy may block traffic.",
          solution: "Check Service selectors and endpoints, verify DNS, test direct Pod connectivity and inspect CNI and NetworkPolicy configuration."
        }
      ]
    },
    {
      heading: "18. Cloud Networking for Linux Servers",
      explanation: `Cloud networking connects virtual machines, managed services and private infrastructure through software-defined networks.

In AWS, an EC2 instance commonly uses an Elastic Network Interface inside a VPC subnet. Route tables determine network paths, security groups control stateful traffic and network ACLs provide subnet-level stateless filtering.

A private subnet commonly uses a NAT gateway or another approved egress path for outbound internet access. An internet-facing instance needs the correct public addressing and routing configuration in addition to permitted firewall rules.

Linux administrators must investigate both operating-system networking and cloud networking. A local firewall rule may permit traffic while a security group blocks it. Conversely, cloud security rules may allow traffic while the Linux host firewall rejects it.

Cloud networking also includes private DNS, load balancers, VPNs, peering, transit gateways and private service endpoints.

Troubleshooting should identify the complete path between the client and server, including both host-level and cloud-level controls.`,
      steps: [
        "Identify the cloud instance and network interface.",
        "Inspect private and public IP addresses.",
        "Check subnet route tables.",
        "Review security groups and network ACLs.",
        "Verify NAT or internet gateway paths.",
        "Inspect Linux firewall rules.",
        "Test connectivity from the actual source network."
      ],
      commands: [
        "ip addr show",
        "ip route show",
        "ip route get 1.1.1.1",
        "ss -tulpen",
        "curl -Iv https://example.com",
        "nc -vz destination 443",
        "traceroute destination",
        "journalctl -k -n 50"
      ],
      problems: [
        {
          issue: "An EC2 instance has no outbound internet connectivity.",
          rootCause: "The subnet route table may lack a valid egress route, the NAT or internet gateway may be missing, or security controls may block traffic.",
          solution: "Verify subnet routing, gateway configuration, source address assignment, security groups, network ACLs and the instance's local firewall."
        }
      ]
    },
    {
      heading: "19. Real-World DevOps Networking Projects",
      explanation: `Project 1 - Linux Web Server Networking: Deploy Nginx on a Linux server, configure its IP address and gateway, allow HTTP and HTTPS traffic, and test the application from another machine.

Project 2 - DNS Troubleshooting Lab: Configure a test resolver, inspect A and AAAA records, compare dig with getent, and diagnose a deliberately incorrect DNS entry.

Project 3 - Secure SSH Administration: Configure SSH access using keys, restrict administrative sources with firewall rules and inspect authentication logs.

Project 4 - Packet Capture Investigation: Generate test HTTP and DNS traffic, capture packets with tcpdump and identify connection establishment, retransmissions and DNS responses.

Project 5 - Docker Network Lab: Create a user-defined bridge network, deploy two containers, verify name resolution and test service connectivity.

Project 6 - Kubernetes Service Networking: Deploy two Pods, expose them using a ClusterIP Service, test DNS resolution and investigate selector or endpoint failures.

Project 7 - AWS VPC Connectivity: Deploy Linux instances in public and private subnets, configure routing and security groups, and verify controlled communication.

Project 8 - Production Incident Simulation: Introduce a controlled firewall restriction in a test environment, collect network evidence, identify the blocked path, restore connectivity and document the root cause.

Each project should include a network diagram, IP plan, route design, firewall policy, validation commands, expected results, troubleshooting evidence and rollback procedure. Use isolated lab environments for failure simulations.`,
      steps: [
        "Create an isolated Linux lab environment.",
        "Document the IP address and subnet design.",
        "Configure interfaces and routing.",
        "Apply least-privilege firewall policies.",
        "Deploy a test application.",
        "Validate DNS and port connectivity.",
        "Capture and analyze traffic.",
        "Document the failure and recovery procedure."
      ],
      commands: [
        "ip -br addr",
        "ip route",
        "ss -tulpen",
        "dig example.com",
        "curl -Iv http://server_address",
        "tcpdump -i any -nn",
        "docker network inspect bridge",
        "kubectl get svc -A"
      ],
      problems: [
        {
          issue: "A networking lab works internally but fails from an external client.",
          rootCause: "The external route, published address, firewall policy or load-balancer configuration may be incomplete.",
          solution: "Trace the complete client-to-server path, inspect every routing and firewall layer, verify the service listener and retest from the external network."
        }
      ]
    },
    {
      heading: "20. Linux Networking Interview Questions and Answers",
      explanation: `Interview Question 1: What is Linux networking?
Answer: Linux networking enables communication between applications, servers and external systems using network interfaces and protocols.

Interview Question 2: What is an IP address?
Answer: An IP address is a logical network-layer address used to identify an interface and route packets.

Interview Question 3: What is a subnet mask?
Answer: A subnet mask or prefix identifies the network portion of an IP address and separates it from the host portion.

Interview Question 4: What is a default gateway?
Answer: It is the router used when no more specific route matches the destination.

Interview Question 5: What is DNS?
Answer: DNS translates domain names into records such as IP addresses.

Interview Question 6: How do you check IP addresses in Linux?
Answer: Use ip addr show or the shorter ip -br addr command.

Interview Question 7: How do you check the routing table?
Answer: Use ip route show.

Interview Question 8: What is the difference between TCP and UDP?
Answer: TCP provides reliable connection-oriented transport. UDP provides connectionless transport with lower protocol overhead.

Interview Question 9: How do you check listening ports?
Answer: Use ss -tulpen or ss -lntp.

Interview Question 10: What is the purpose of ping?
Answer: Ping tests IP reachability using ICMP echo requests and replies.

Interview Question 11: Does a successful ping prove that an application is working?
Answer: No. The application port and application protocol must also be tested.

Interview Question 12: What is the purpose of traceroute?
Answer: It helps identify network hops along the path to a destination.

Interview Question 13: What is MTU?
Answer: MTU is the maximum packet size that an interface can transmit at its link layer without fragmentation at that layer.

Interview Question 14: What is the purpose of tcpdump?
Answer: tcpdump captures and displays network packets for troubleshooting and analysis.

Interview Question 15: What is the difference between a public and private IP?
Answer: A public IP is globally routable, while a private IP is intended for private network communication and normally requires address translation or another gateway for internet access.

Interview Question 16: What is a MAC address?
Answer: A MAC address is a link-layer identifier associated with a network interface.

Interview Question 17: What is the loopback interface?
Answer: It is a virtual interface used for communication within the same host, commonly using 127.0.0.1.

Interview Question 18: How do you troubleshoot a DNS issue?
Answer: Check resolver configuration, query records with dig, test the configured DNS server and verify system name-service configuration.

Interview Question 19: How do you troubleshoot a port connection failure?
Answer: Check the listening process, bind address, route, firewall rules and remote connectivity using ss and nc.

Interview Question 20: What is the difference between UFW and firewalld?
Answer: Both manage firewall rules. UFW provides a simplified rule interface, while firewalld uses zones and dynamic firewall management.

Interview Question 21: Why might SSH time out?
Answer: The host may be unreachable, a route may be missing or TCP port 22 may be filtered.

Interview Question 22: What is a Docker bridge network?
Answer: It is a virtual network that connects containers through a Linux bridge and virtual Ethernet interfaces.

Interview Question 23: What is a Kubernetes Service?
Answer: It provides a stable network endpoint for accessing a group of selected Pods.

Interview Question 24: What is a Kubernetes NetworkPolicy?
Answer: It defines rules controlling allowed Pod network traffic when supported and enforced by the cluster networking plugin.

Interview Question 25: What is packet loss?
Answer: Packet loss occurs when transmitted packets fail to reach their destination. It can cause retransmissions, delays and application failures.

Interview Question 26: What is the difference between latency and bandwidth?
Answer: Latency measures communication delay, while bandwidth describes the amount of data that can be transferred per unit of time.

Interview Question 27: How do you investigate a Linux server with no internet access?
Answer: Check interface state, IP address, default route, gateway connectivity, DNS, firewall rules and external connectivity.

Interview Question 28: Why can a service listen on localhost but remain inaccessible remotely?
Answer: The application may be bound only to the loopback interface instead of the required network interface.

Interview Question 29: What is connection tracking?
Answer: Connection tracking maintains information about network connections and is used by stateful firewall and NAT implementations.

Interview Question 30: What is a secure production networking strategy?
Answer: Use segmented networks, least-privilege firewall policies, secure protocols, restricted administrative access, monitoring and documented change procedures.`,
      steps: [
        "Explain how a packet travels from an application to a remote server.",
        "Demonstrate IP, route and DNS troubleshooting.",
        "Show how to identify a listening port.",
        "Explain how to investigate packet loss.",
        "Describe host and cloud firewall troubleshooting.",
        "Explain Docker and Kubernetes network connectivity.",
        "Present a real production incident and its root-cause analysis."
      ],
      commands: [
        "ip addr show",
        "ip route get 8.8.8.8",
        "dig example.com",
        "ss -tulpen",
        "nc -vz example.com 443",
        "tcpdump -i any -nn",
        "curl -Iv https://example.com"
      ],
      problems: [
        {
          issue: "An interview answer lists networking commands but cannot explain the troubleshooting sequence.",
          rootCause: "The candidate memorized commands without understanding interfaces, routes, DNS, ports and firewall behavior.",
          solution: "Explain the packet path, identify the failing layer, demonstrate the relevant command, interpret its output and describe a verified corrective action."
        }
      ]
    }
  ]
};

export default data;
