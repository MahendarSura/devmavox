
export interface TopicQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const topicQuestions: TopicQuestion[] = [
  {
    id: "networking-dns-1",
    question: "What is the primary purpose of a computer network?",
    options: [
      "To connect devices so they can communicate and share resources",
      "To replace operating systems",
      "To store only application source code",
      "To prevent all hardware failures"
    ],
    answer: 0
  },
  {
    id: "networking-dns-2",
    question: "Which OSI layer is responsible for IP routing?",
    options: [
      "Application",
      "Network",
      "Session",
      "Presentation"
    ],
    answer: 1
  },
  {
    id: "networking-dns-3",
    question: "Which OSI layer is primarily associated with TCP and UDP?",
    options: [
      "Physical",
      "Data Link",
      "Transport",
      "Presentation"
    ],
    answer: 2
  },
  {
    id: "networking-dns-4",
    question: "What is the primary role of a MAC address?",
    options: [
      "Resolve public DNS names",
      "Encrypt HTTPS traffic",
      "Assign an application port",
      "Identify a network interface at the data-link layer"
    ],
    answer: 3
  },
  {
    id: "networking-dns-5",
    question: "What is the purpose of an IP address?",
    options: [
      "To identify a network interface for IP communication",
      "To store a website's HTML",
      "To authenticate every user",
      "To replace DNS in all situations"
    ],
    answer: 0
  },
  {
    id: "networking-dns-6",
    question: "Which of the following is a private IPv4 address?",
    options: [
      "8.8.8.8",
      "192.168.1.10",
      "1.1.1.1",
      "203.0.113.10"
    ],
    answer: 1
  },
  {
    id: "networking-dns-7",
    question: "What does the IPv4 loopback address 127.0.0.1 represent?",
    options: [
      "The default internet gateway",
      "A public DNS resolver",
      "The local host",
      "A broadcast address for every network"
    ],
    answer: 2
  },
  {
    id: "networking-dns-8",
    question: "How many bits are in an IPv4 address?",
    options: [
      "16",
      "64",
      "128",
      "32"
    ],
    answer: 3
  },
  {
    id: "networking-dns-9",
    question: "How many bits are in an IPv6 address?",
    options: [
      "128",
      "32",
      "48",
      "64"
    ],
    answer: 0
  },
  {
    id: "networking-dns-10",
    question: "What does the CIDR notation /24 indicate for IPv4?",
    options: [
      "24 hosts are available",
      "The first 24 bits are the network prefix",
      "The address has 24 octets",
      "The network supports only 24 ports"
    ],
    answer: 1
  },
  {
    id: "networking-dns-11",
    question: "How many usable host addresses are available in a typical IPv4 /24 subnet?",
    options: [
      "256",
      "128",
      "254",
      "252"
    ],
    answer: 2
  },
  {
    id: "networking-dns-12",
    question: "What is the purpose of a subnet mask?",
    options: [
      "Encrypt network packets",
      "Assign DNS names",
      "Choose an HTTP status code",
      "Separate the network prefix from the host portion of an IPv4 address"
    ],
    answer: 3
  },
  {
    id: "networking-dns-13",
    question: "What is the purpose of a default gateway?",
    options: [
      "Forward traffic destined for networks outside the local subnet",
      "Store container images",
      "Resolve every hostname without DNS",
      "Assign application usernames"
    ],
    answer: 0
  },
  {
    id: "networking-dns-14",
    question: "What does DHCP commonly provide to a client?",
    options: [
      "Application source code",
      "IP configuration such as an address, subnet mask, gateway, and DNS servers",
      "TLS certificates for every website",
      "Container registry credentials"
    ],
    answer: 1
  },
  {
    id: "networking-dns-15",
    question: "What is the purpose of ARP in a typical IPv4 local network?",
    options: [
      "Encrypt packets end to end",
      "Translate domain names into public IP addresses",
      "Resolve an IPv4 address to a link-layer address on the local network",
      "Assign TCP port numbers"
    ],
    answer: 2
  },
  {
    id: "networking-dns-16",
    question: "What is the main difference between TCP and UDP?",
    options: [
      "UDP always guarantees delivery",
      "TCP is used only for DNS",
      "UDP always encrypts traffic",
      "TCP provides a reliable ordered byte stream; UDP sends datagrams without those guarantees"
    ],
    answer: 3
  },
  {
    id: "networking-dns-17",
    question: "Which TCP mechanism establishes a connection?",
    options: [
      "The SYN, SYN-ACK, ACK handshake",
      "A DNS MX lookup",
      "An HTTP redirect",
      "A DHCP lease renewal"
    ],
    answer: 0
  },
  {
    id: "networking-dns-18",
    question: "What is the purpose of TCP's sequence numbers and acknowledgments?",
    options: [
      "Resolve domain names",
      "Support ordered delivery and detection or recovery of lost data",
      "Encrypt all packets",
      "Assign a private IP address"
    ],
    answer: 1
  },
  {
    id: "networking-dns-19",
    question: "What does a TCP connection reset commonly indicate?",
    options: [
      "DNS resolution succeeded",
      "The TLS certificate is always valid",
      "The connection was abruptly reset by an endpoint or an intermediate device",
      "The application returned HTTP 200"
    ],
    answer: 2
  },
  {
    id: "networking-dns-20",
    question: "What does a connection timeout generally mean?",
    options: [
      "The server definitely returned HTTP 404",
      "The DNS record is definitely correct",
      "The TLS certificate is definitely expired",
      "The expected connection or response did not arrive within the configured time"
    ],
    answer: 3
  },
  {
    id: "networking-dns-21",
    question: "What is the purpose of DNS?",
    options: [
      "Translate names such as example.com into DNS records, often including IP addresses",
      "Encrypt every network connection",
      "Replace all routers",
      "Build application binaries"
    ],
    answer: 0
  },
  {
    id: "networking-dns-22",
    question: "Which DNS record maps a hostname to an IPv4 address?",
    options: [
      "MX",
      "A",
      "TXT",
      "PTR"
    ],
    answer: 1
  },
  {
    id: "networking-dns-23",
    question: "Which DNS record maps a hostname to an IPv6 address?",
    options: [
      "CNAME",
      "MX",
      "AAAA",
      "SRV"
    ],
    answer: 2
  },
  {
    id: "networking-dns-24",
    question: "What is a CNAME record used for?",
    options: [
      "Set a TCP connection timeout",
      "Specify a mail server's IP directly in every case",
      "Create a firewall rule",
      "Alias one DNS name to another DNS name"
    ],
    answer: 3
  },
  {
    id: "networking-dns-25",
    question: "Which DNS record identifies mail servers for a domain?",
    options: [
      "MX",
      "AAAA",
      "PTR",
      "CAA"
    ],
    answer: 0
  },
  {
    id: "networking-dns-26",
    question: "What is the purpose of a TXT record?",
    options: [
      "Route packets between subnets",
      "Store text-based DNS data, commonly used for SPF, verification, and other policies",
      "Replace every A record",
      "Open a server's TCP port"
    ],
    answer: 1
  },
  {
    id: "networking-dns-27",
    question: "What does a DNS TTL control?",
    options: [
      "The number of TCP ports on a server",
      "The TLS encryption strength",
      "How long a DNS answer may be cached before it should be refreshed",
      "The maximum number of Kubernetes replicas"
    ],
    answer: 2
  },
  {
    id: "networking-dns-28",
    question: "What is a recursive DNS resolver responsible for?",
    options: [
      "Building Docker images",
      "Issuing TLS certificates for every domain",
      "Forwarding application HTTP requests to every backend",
      "Finding an answer for a client, using cache or querying other DNS servers"
    ],
    answer: 3
  },
  {
    id: "networking-dns-29",
    question: "What is the role of an authoritative DNS server?",
    options: [
      "Provide DNS records for the zones it serves",
      "Run the application's database",
      "Assign client MAC addresses",
      "Decrypt all HTTPS traffic"
    ],
    answer: 0
  },
  {
    id: "networking-dns-30",
    question: "What is a DNS NXDOMAIN response?",
    options: [
      "The TCP connection was reset",
      "The queried domain name does not exist according to the DNS response",
      "The TLS handshake succeeded",
      "The web server returned HTTP 503"
    ],
    answer: 1
  },
  {
    id: "networking-dns-31",
    question: "A website was moved to a new IP address, but some clients still use the old IP. What is a likely reason?",
    options: [
      "The MAC address changed",
      "The server's CPU is too fast",
      "Resolvers or clients may still have a cached DNS answer",
      "HTTP cannot use DNS"
    ],
    answer: 2
  },
  {
    id: "networking-dns-32",
    question: "Which command is commonly used to query DNS records on Linux?",
    options: [
      "chmod",
      "mkfs",
      "systemctl",
      "dig"
    ],
    answer: 3
  },
  {
    id: "networking-dns-33",
    question: "What does the Linux command getent hosts example.com help test?",
    options: [
      "Name resolution through the system's configured name-service mechanisms",
      "The disk's filesystem integrity",
      "The status of every Docker image",
      "The application's database schema"
    ],
    answer: 0
  },
  {
    id: "networking-dns-34",
    question: "What is a common purpose of the /etc/hosts file?",
    options: [
      "Configure a cloud load balancer",
      "Provide local static hostname-to-address mappings",
      "Store TCP retransmission logs",
      "Define Kubernetes resource limits"
    ],
    answer: 1
  },
  {
    id: "networking-dns-35",
    question: "What is split-horizon DNS?",
    options: [
      "A DNS server with no records",
      "A protocol that replaces IP addresses",
      "Returning different DNS answers depending on the querying network or context",
      "Encrypting all DNS traffic using HTTPS"
    ],
    answer: 2
  },
  {
    id: "networking-dns-36",
    question: "What is DNS propagation commonly used to describe?",
    options: [
      "A server's TCP handshake",
      "A router's firmware upgrade",
      "The time required to compile DNS configuration into an application",
      "The gradual visibility of DNS changes as cached records expire and authoritative data is queried"
    ],
    answer: 3
  },
  {
    id: "networking-dns-37",
    question: "What is the purpose of a PTR record?",
    options: [
      "Reverse DNS lookup, mapping an address to a name",
      "Map a hostname to an IPv6 address",
      "Identify an email server",
      "Define a Kubernetes Service"
    ],
    answer: 0
  },
  {
    id: "networking-dns-38",
    question: "What does DNSSEC help protect against?",
    options: [
      "All denial-of-service attacks",
      "DNS data forgery or tampering by providing data-origin authentication and integrity validation",
      "Every compromised endpoint",
      "All TLS certificate expiration"
    ],
    answer: 1
  },
  {
    id: "networking-dns-39",
    question: "Which statement about encrypted DNS is correct?",
    options: [
      "It makes every website safe",
      "It eliminates the need for IP routing",
      "DoT and DoH encrypt DNS transport, but do not by themselves encrypt all application traffic",
      "It prevents every DNS configuration error"
    ],
    answer: 2
  },
  {
    id: "networking-dns-40",
    question: "A hostname resolves correctly with dig but an application still cannot connect. What should you check next?",
    options: [
      "Only the DNS zone's display name",
      "Only the number of DNS records",
      "Only the Git branch name",
      "The resolved address, route, destination port, firewall rules, and application listener"
    ],
    answer: 3
  },
  {
    id: "networking-dns-41",
    question: "Which port is the default for HTTP?",
    options: [
      "80",
      "22",
      "53",
      "3306"
    ],
    answer: 0
  },
  {
    id: "networking-dns-42",
    question: "Which port is the default for HTTPS?",
    options: [
      "25",
      "443",
      "21",
      "161"
    ],
    answer: 1
  },
  {
    id: "networking-dns-43",
    question: "Which port is commonly used by SSH?",
    options: [
      "53",
      "80",
      "22",
      "143"
    ],
    answer: 2
  },
  {
    id: "networking-dns-44",
    question: "Which port is conventionally used for DNS queries?",
    options: [
      "110",
      "443",
      "8080",
      "53"
    ],
    answer: 3
  },
  {
    id: "networking-dns-45",
    question: "Which port is commonly used for PostgreSQL by default?",
    options: [
      "5432",
      "27017",
      "6379",
      "9200"
    ],
    answer: 0
  },
  {
    id: "networking-dns-46",
    question: "Which port is commonly used for MySQL?",
    options: [
      "5432",
      "3306",
      "5672",
      "9090"
    ],
    answer: 1
  },
  {
    id: "networking-dns-47",
    question: "Which command can show listening TCP and UDP sockets on modern Linux systems?",
    options: [
      "pwd",
      "grep",
      "ss -tulnp",
      "touch"
    ],
    answer: 2
  },
  {
    id: "networking-dns-48",
    question: "How can you test whether a TCP port is reachable from a Linux host?",
    options: [
      "Use chmod on the remote file",
      "Run df -h",
      "Read /etc/passwd",
      "Use nc -vz hostname port or an equivalent TCP connectivity test"
    ],
    answer: 3
  },
  {
    id: "networking-dns-49",
    question: "What does a firewall do?",
    options: [
      "Allow or deny network traffic according to configured rules",
      "Resolve every hostname",
      "Compile application source code",
      "Automatically repair broken certificates"
    ],
    answer: 0
  },
  {
    id: "networking-dns-50",
    question: "A service is listening only on 127.0.0.1:8080. Why may remote clients fail to connect?",
    options: [
      "The DNS TTL is too high",
      "The service is bound to loopback rather than an externally reachable interface",
      "The service uses too much disk",
      "TCP cannot connect to port 8080"
    ],
    answer: 1
  },
  {
    id: "networking-dns-51",
    question: "What is the purpose of TLS?",
    options: [
      "Assign private IP addresses",
      "Route traffic between VLANs",
      "Provide transport security such as encryption, integrity, and server authentication",
      "Replace all application authorization"
    ],
    answer: 2
  },
  {
    id: "networking-dns-52",
    question: "What is the purpose of a TLS certificate?",
    options: [
      "Allocate IP addresses to Pods",
      "Create a DNS A record automatically in every DNS provider",
      "Guarantee an application contains no bugs",
      "Bind an identity to a public key and support certificate-based authentication"
    ],
    answer: 3
  },
  {
    id: "networking-dns-53",
    question: "A browser reports a certificate hostname mismatch. What should you investigate?",
    options: [
      "Whether the certificate's subject alternative names cover the requested hostname",
      "The database table count",
      "The container's CPU request only",
      "The Git commit author"
    ],
    answer: 0
  },
  {
    id: "networking-dns-54",
    question: "A production HTTPS certificate has expired. What is the correct fix?",
    options: [
      "Disable certificate validation for all users",
      "Renew or replace the certificate, install the correct chain, and verify deployment",
      "Change the DNS TTL to zero only",
      "Open every firewall port"
    ],
    answer: 1
  },
  {
    id: "networking-dns-55",
    question: "What does HTTP status code 404 indicate?",
    options: [
      "The server is always overloaded",
      "TLS authentication succeeded",
      "The requested resource was not found, or the server chose not to disclose it",
      "The DNS server is unavailable"
    ],
    answer: 2
  },
  {
    id: "networking-dns-56",
    question: "What does HTTP status code 502 usually indicate?",
    options: [
      "The client used an invalid password in every case",
      "DNS always returned NXDOMAIN",
      "The browser's cache is full",
      "A gateway or proxy received an invalid response from an upstream server"
    ],
    answer: 3
  },
  {
    id: "networking-dns-57",
    question: "What does HTTP status code 503 usually indicate?",
    options: [
      "The service is temporarily unable to handle the request",
      "The resource was permanently moved",
      "The request succeeded",
      "The client must always clear its DNS cache"
    ],
    answer: 0
  },
  {
    id: "networking-dns-58",
    question: "What does HTTP status code 504 usually indicate?",
    options: [
      "The resource was not found",
      "A gateway or proxy timed out waiting for an upstream response",
      "The DNS record was signed",
      "The TLS certificate is necessarily expired"
    ],
    answer: 1
  },
  {
    id: "networking-dns-59",
    question: "What is the purpose of an HTTP reverse proxy?",
    options: [
      "Assign physical MAC addresses",
      "Replace DNS root servers",
      "Accept client requests and forward them to appropriate backend services",
      "Store Git commit history"
    ],
    answer: 2
  },
  {
    id: "networking-dns-60",
    question: "What is the purpose of a load balancer?",
    options: [
      "Encrypt every database field automatically",
      "Replace all backend health checks",
      "Create DNS records for every request",
      "Distribute incoming traffic across backend targets according to its configuration"
    ],
    answer: 3
  },
  {
    id: "networking-dns-61",
    question: "What is the difference between a Layer 4 and a Layer 7 load balancer?",
    options: [
      "Layer 4 operates on transport-level connections; Layer 7 can route using application data such as HTTP host or path",
      "Layer 4 only supports DNS and Layer 7 only supports SSH",
      "Layer 7 cannot use TLS",
      "There is no difference"
    ],
    answer: 0
  },
  {
    id: "networking-dns-62",
    question: "What is a health check used for in a load balancer?",
    options: [
      "To update Git branches",
      "To identify whether a backend is eligible to receive traffic",
      "To encrypt all application logs",
      "To change the DNS root zone"
    ],
    answer: 1
  },
  {
    id: "networking-dns-63",
    question: "What is session persistence in load balancing?",
    options: [
      "Deleting all connections after each packet",
      "Sending every request to a random region regardless of configuration",
      "Keeping a client's related requests associated with the same backend when supported and configured",
      "Storing TLS private keys in DNS"
    ],
    answer: 2
  },
  {
    id: "networking-dns-64",
    question: "What is round-robin load balancing?",
    options: [
      "Always selecting the backend with the highest CPU usage",
      "Sending traffic only to a permanently fixed server",
      "Blocking all traffic until a manual approval",
      "Distributing selections sequentially among eligible targets"
    ],
    answer: 3
  },
  {
    id: "networking-dns-65",
    question: "A load balancer returns 502 while backend Pods are running. What should you check?",
    options: [
      "Backend readiness, service endpoints, listening ports, protocol, network policies, and proxy logs",
      "Only the number of Git branches",
      "Only the frontend logo",
      "Only the DNS provider's billing plan"
    ],
    answer: 0
  },
  {
    id: "networking-dns-66",
    question: "Why might a reverse proxy return 504 even though the backend eventually completes its work?",
    options: [
      "The backend always returned HTTP 404",
      "The upstream response exceeded the proxy's configured timeout",
      "The DNS record contains an MX entry",
      "The backend uses a private IP address"
    ],
    answer: 1
  },
  {
    id: "networking-dns-67",
    question: "What is an important risk of terminating TLS at a load balancer?",
    options: [
      "DNS stops working by design",
      "Every request becomes a UDP packet",
      "Traffic from the load balancer to the backend may be unencrypted unless separately secured",
      "All certificates automatically expire"
    ],
    answer: 2
  },
  {
    id: "networking-dns-68",
    question: "What is SNI in TLS?",
    options: [
      "A DNS record type for email",
      "A Linux disk format",
      "A Kubernetes replica setting",
      "A TLS extension that lets a client indicate the requested hostname during the handshake"
    ],
    answer: 3
  },
  {
    id: "networking-dns-69",
    question: "Which command can inspect the TLS certificate and handshake details of a server?",
    options: [
      "openssl s_client -connect host:443 -servername host",
      "df -h",
      "chmod 644",
      "git status"
    ],
    answer: 0
  },
  {
    id: "networking-dns-70",
    question: "Which curl option displays response headers and useful request diagnostics?",
    options: [
      "curl --format-disk",
      "curl -v or curl -i, depending on the diagnostic needed",
      "curl --delete-dns",
      "curl --chmod"
    ],
    answer: 1
  },
  {
    id: "networking-dns-71",
    question: "What is a VPC in AWS?",
    options: [
      "A source-code repository",
      "A Docker image registry",
      "A logically isolated virtual network in AWS",
      "A TLS certificate format"
    ],
    answer: 2
  },
  {
    id: "networking-dns-72",
    question: "What is the purpose of a public subnet in a typical AWS VPC design?",
    options: [
      "Every resource in it must have a public IP",
      "It automatically exposes all ports to the internet",
      "It can only contain databases",
      "Its route table provides a route to an internet gateway; resources still need appropriate addressing and access rules"
    ],
    answer: 3
  },
  {
    id: "networking-dns-73",
    question: "What is the purpose of a NAT gateway in a common AWS design?",
    options: [
      "Allow eligible private-subnet resources to initiate outbound IPv4 internet connections without being directly internet-reachable",
      "Provide a public IP to every private instance",
      "Replace all security groups",
      "Resolve every internal hostname"
    ],
    answer: 0
  },
  {
    id: "networking-dns-74",
    question: "What is the difference between an AWS security group and a network ACL?",
    options: [
      "Both are identical stateless policies",
      "Security groups are stateful at the resource network interface; network ACLs are stateless subnet-level rules",
      "Network ACLs only manage DNS records",
      "Security groups replace route tables"
    ],
    answer: 1
  },
  {
    id: "networking-dns-75",
    question: "An EC2 instance has no internet connectivity. What should you check first?",
    options: [
      "Only the instance name",
      "Only the application's Git branch",
      "Subnet route table, gateway or NAT path, public addressing where required, security rules, and DNS",
      "Only the number of EBS volumes"
    ],
    answer: 2
  },
  {
    id: "networking-dns-76",
    question: "What is the role of an AWS Internet Gateway?",
    options: [
      "Store application secrets",
      "Replace all NAT gateways",
      "Automatically open every instance port",
      "Provide a target for eligible VPC routes to and from the internet"
    ],
    answer: 3
  },
  {
    id: "networking-dns-77",
    question: "What is Amazon Route 53 commonly used for?",
    options: [
      "DNS hosting and routing policies, including supported health-check-based routing",
      "Compiling Java code",
      "Running Linux package managers",
      "Replacing every VPC route table"
    ],
    answer: 0
  },
  {
    id: "networking-dns-78",
    question: "What does an AWS Application Load Balancer primarily support?",
    options: [
      "Only raw Layer 2 switching",
      "HTTP and HTTPS Layer 7 routing, including host- and path-based rules",
      "Only database backups",
      "Only static DNS storage"
    ],
    answer: 1
  },
  {
    id: "networking-dns-79",
    question: "What is the main purpose of an AWS Network Load Balancer?",
    options: [
      "Build container images",
      "Manage Git pull requests",
      "Provide Layer 4 load balancing for supported protocols and use cases",
      "Replace IAM policies"
    ],
    answer: 2
  },
  {
    id: "networking-dns-80",
    question: "An EC2 instance cannot connect to a database in another subnet. Which checks are relevant?",
    options: [
      "Only the database's display name",
      "Only the source code formatting",
      "Only the EC2 instance's CPU model",
      "Routes, security groups, network ACLs, DNS, database listener, and port"
    ],
    answer: 3
  },
  {
    id: "networking-dns-81",
    question: "What is a Kubernetes Service used for?",
    options: [
      "Provide a stable way to reach a logical group of Pods or another configured backend",
      "Store Git repository history",
      "Replace every container image",
      "Allocate a separate public IP to every Pod by default"
    ],
    answer: 0
  },
  {
    id: "networking-dns-82",
    question: "What is a ClusterIP Service?",
    options: [
      "A service exposed publicly by default",
      "A Service type normally reachable within the cluster through its cluster IP",
      "A container registry",
      "A DNS root server"
    ],
    answer: 1
  },
  {
    id: "networking-dns-83",
    question: "What is a NodePort Service?",
    options: [
      "A DNS record",
      "A persistent volume",
      "A Service that exposes a port on cluster nodes, subject to cluster networking and firewall rules",
      "A TLS certificate"
    ],
    answer: 2
  },
  {
    id: "networking-dns-84",
    question: "What is a LoadBalancer Service in Kubernetes commonly used for?",
    options: [
      "Store application logs",
      "Assign a Git commit hash",
      "Replace every Deployment",
      "Request external load-balancing integration from a supported cluster environment"
    ],
    answer: 3
  },
  {
    id: "networking-dns-85",
    question: "A Kubernetes Service has no endpoints. What should you investigate?",
    options: [
      "Service selectors, Pod labels, Pod readiness, and EndpointSlice resources",
      "Only the container image's size",
      "Only the Git repository's visibility",
      "Only the worker node's hostname"
    ],
    answer: 0
  },
  {
    id: "networking-dns-86",
    question: "A Pod cannot resolve a Kubernetes Service name. What should you check?",
    options: [
      "Only the Deployment's display name",
      "Pod DNS configuration, CoreDNS health, service name and namespace, and network connectivity",
      "Only the Dockerfile comments",
      "Only the container registry password"
    ],
    answer: 1
  },
  {
    id: "networking-dns-87",
    question: "What is the purpose of CoreDNS in many Kubernetes clusters?",
    options: [
      "Build Docker images",
      "Replace all Kubernetes Services",
      "Provide cluster DNS resolution and configured DNS forwarding",
      "Store persistent application data"
    ],
    answer: 2
  },
  {
    id: "networking-dns-88",
    question: "What is a Kubernetes Ingress commonly used for?",
    options: [
      "Manage Linux users",
      "Replace the cluster's DNS resolver",
      "Create a database backup",
      "Define HTTP or HTTPS routing rules implemented by an Ingress controller"
    ],
    answer: 3
  },
  {
    id: "networking-dns-89",
    question: "Two Pods in a cluster cannot communicate. Which check is useful?",
    options: [
      "NetworkPolicy rules, Pod addresses, CNI health, routing, and listening ports",
      "Only the Git commit message",
      "Only the container image tag",
      "Only the namespace description"
    ],
    answer: 0
  },
  {
    id: "networking-dns-90",
    question: "What does a Kubernetes NetworkPolicy control?",
    options: [
      "The order of Git commits",
      "Pod traffic allowed by selected ingress and egress rules, when supported by the network plugin",
      "Every external router in the world",
      "Container image build stages"
    ],
    answer: 1
  },
  {
    id: "networking-dns-91",
    question: "A service works inside a Pod but not through the public URL. What should you check?",
    options: [
      "Only the application's source-code indentation",
      "Only the number of namespaces",
      "Ingress or load balancer configuration, DNS, TLS, service endpoints, and firewall rules",
      "Only the Pod's creation timestamp"
    ],
    answer: 2
  },
  {
    id: "networking-dns-92",
    question: "Which command displays the route table on many Linux systems?",
    options: [
      "chmod -R",
      "git log",
      "docker build",
      "ip route"
    ],
    answer: 3
  },
  {
    id: "networking-dns-93",
    question: "What is traceroute or tracepath useful for?",
    options: [
      "Investigating network paths and identifying where responses or reachability appear to stop",
      "Creating DNS records",
      "Encrypting Git commits",
      "Managing Kubernetes replicas"
    ],
    answer: 0
  },
  {
    id: "networking-dns-94",
    question: "What is tcpdump used for?",
    options: [
      "Building container images",
      "Capturing and inspecting network packets for troubleshooting",
      "Editing DNS zones automatically",
      "Creating cloud IAM roles"
    ],
    answer: 1
  },
  {
    id: "networking-dns-95",
    question: "A server experiences intermittent connection failures. Which diagnostic approach is best?",
    options: [
      "Immediately disable every firewall",
      "Restart all production servers without collecting evidence",
      "Correlate timestamps, connection errors, packet captures, resource metrics, and network-device logs",
      "Change all IP addresses randomly"
    ],
    answer: 2
  },
  {
    id: "networking-dns-96",
    question: "What does MTU represent?",
    options: [
      "The DNS cache duration",
      "The number of users on a load balancer",
      "The TCP port range",
      "The maximum packet size a network interface or link can carry without fragmentation at that layer"
    ],
    answer: 3
  },
  {
    id: "networking-dns-97",
    question: "What can cause intermittent TLS or HTTPS connection failures after a deployment?",
    options: [
      "Incorrect certificate chain, hostname mismatch, TLS settings, or inconsistent proxy configuration",
      "Only an oversized Git repository",
      "Only a missing README",
      "Only the number of application branches"
    ],
    answer: 0
  },
  {
    id: "networking-dns-98",
    question: "An application connects to a backend by IP address but fails using its hostname. What should you investigate?",
    options: [
      "Only the application's CPU request",
      "DNS resolution, search domains, resolver configuration, and hostname or TLS expectations",
      "Only the number of GitHub contributors",
      "Only the filesystem permissions of unrelated files"
    ],
    answer: 1
  },
  {
    id: "networking-dns-99",
    question: "Users in one region experience high latency while other regions are normal. What should you compare?",
    options: [
      "Only the Git branch name",
      "Only the web page's font",
      "Regional routing, DNS answers, load balancer health, latency metrics, and backend capacity",
      "Only the number of deployment manifests"
    ],
    answer: 2
  },
  {
    id: "networking-dns-100",
    question: "A production website is down. What is the best initial troubleshooting sequence?",
    options: [
      "Delete DNS records and recreate the cluster immediately",
      "Disable TLS and every firewall rule",
      "Restart all servers before checking evidence",
      "Check DNS resolution, connectivity, ports, TLS, load balancer health, backend status, logs, and recent changes systematically"
    ],
    answer: 3
  }
];
