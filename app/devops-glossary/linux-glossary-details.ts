import type { GlossaryTerm } from "./glossary-data";

export const linuxGlossaryDetails: Record<string, Partial<GlossaryTerm>> = {
  "linux-process": {
    purpose: "A Linux process is a running instance of a program. The kernel assigns it a Process ID (PID), memory space, execution state, user identity, open file descriptors, and other resources. Processes allow the operating system to run applications and background services independently.",
    project: "In a DevOps environment, a Linux server may run Nginx, a Node.js application, a monitoring agent, and deployment scripts at the same time. If the application process consumes excessive CPU or memory, engineers identify its PID, inspect resource usage, and determine whether the issue is caused by the application or the host.",
    workflow: [
      "A user or service starts a program through a shell, systemd, or another process.",
      "The kernel creates a process, assigns a PID, and allocates the resources needed for execution.",
      "The process executes instructions and may create child processes or open files and network connections.",
      "The scheduler shares CPU time among runnable processes.",
      "The process exits normally or is terminated, and the operating system releases its resources."
    ],
    commands: [
      "ps aux: List processes with users, CPU, memory, and command information.",
      "ps -ef: Display processes in a full-format listing.",
      "top: Monitor live CPU and memory usage by process.",
      "pgrep -af nginx: Find Nginx processes by name and show their commands.",
      "kill -TERM <PID>: Request graceful process termination.",
      "kill -KILL <PID>: Force termination only when graceful shutdown fails.",
      "systemctl status nginx: Inspect a systemd-managed service."
    ],
    mistakes: [
      "Killing a process without checking its owner, purpose, or production impact.",
      "Using kill -9 as the first response instead of allowing graceful shutdown.",
      "Confusing a process ID with a thread ID or a service name.",
      "Assuming that restarting a process fixes the underlying memory leak or application defect."
    ],
    configuration: [
      "Use systemd unit files to define service startup, restart behavior, users, and dependencies.",
      "Configure resource limits through systemd properties such as MemoryMax and CPUQuota where appropriate.",
      "Use environment files and dedicated service accounts instead of embedding secrets in process command arguments.",
      "Configure application health checks and meaningful log output so process failures can be investigated."
    ],
    troubleshooting: [
      "For high CPU, inspect top or ps output and correlate the process with application logs and traffic.",
      "For high memory usage, inspect RSS, application metrics, and possible memory growth over time.",
      "For repeated restarts, check systemctl status, journalctl -u service, and the service exit code.",
      "For a process that will not stop, inspect its state and blocked I/O before considering forced termination."
    ],
    bestPractices: [
      "Manage long-running production applications with systemd, containers, or an orchestrator.",
      "Use graceful shutdown handling so applications can finish requests and close connections.",
      "Monitor process availability, CPU, memory, restart counts, and exit codes.",
      "Investigate recurring process failures instead of repeatedly restarting services."
    ],
    securityConsiderations: [
      "Run services with least-privilege dedicated users rather than root whenever possible.",
      "Restrict access to process inspection and termination on sensitive production hosts.",
      "Avoid exposing passwords, tokens, and other secrets in process command-line arguments.",
      "Review unexpected processes and parent-child relationships during security investigations."
    ]
  },

  "thread": {
    purpose: "A thread is an execution path within a process. Threads in the same process share its address space and many resources, while each thread has its own execution state and stack. Multithreading allows applications to perform concurrent work without creating a separate process for every task.",
    project: "A Java application running on a Linux server may use separate threads to process HTTP requests, execute background jobs, and communicate with databases. If request latency increases, engineers inspect thread counts, thread dumps, CPU usage, and blocked threads to identify contention or deadlocks.",
    workflow: [
      "The application creates a process and initializes its runtime.",
      "The runtime or application creates one or more threads for concurrent tasks.",
      "The operating system schedules runnable threads for CPU execution.",
      "Threads coordinate through shared memory, locks, queues, and synchronization mechanisms.",
      "Threads complete their tasks or remain active while the application is running."
    ],
    commands: [
      "ps -eLf: Display processes and their threads.",
      "ps -T -p <PID>: List threads belonging to a process.",
      "top -H -p <PID>: Monitor individual threads of a process.",
      "pidstat -t -p <PID> 1: Observe per-thread CPU statistics when sysstat is installed.",
      "jcmd <PID> Thread.print: Capture a Java thread dump when supported and authorized.",
      "kill -3 <PID>: Request a JVM thread dump on many HotSpot JVM configurations; verify runtime behavior first."
    ],
    mistakes: [
      "Assuming that a high thread count always means high CPU consumption.",
      "Confusing application threads with independent operating-system processes.",
      "Ignoring thread pools and allowing applications to create unlimited threads.",
      "Taking a thread dump without correlating it with the time and symptoms of an incident."
    ],
    configuration: [
      "Set application thread-pool sizes according to workload, CPU capacity, and downstream limits.",
      "Configure queue capacities, timeouts, and rejection policies for background task execution.",
      "Use runtime-specific settings to control worker threads and request concurrency.",
      "Document thread-dump procedures for production JVM and other application runtimes."
    ],
    troubleshooting: [
      "For high thread counts, inspect ps -eLf and identify which process owns the threads.",
      "For high CPU, use top -H -p PID and correlate busy threads with application diagnostics.",
      "For Java deadlocks or blocked requests, capture thread dumps and inspect lock ownership and stack traces.",
      "For thread exhaustion, inspect pool limits, blocked I/O, queue growth, and downstream response times."
    ],
    bestPractices: [
      "Use bounded thread pools instead of creating unlimited workers.",
      "Set appropriate timeouts for network, database, and external service operations.",
      "Monitor active threads, queue depth, rejected tasks, and thread-pool saturation.",
      "Use thread dumps and profiling data as evidence before changing concurrency settings."
    ],
    securityConsiderations: [
      "Avoid placing credentials or sensitive customer information in thread names or diagnostic output.",
      "Restrict access to thread dumps because stack traces may expose internal application details.",
      "Prevent untrusted workloads from exhausting resources through uncontrolled thread creation.",
      "Protect diagnostic endpoints and runtime management interfaces with authentication and network restrictions."
    ]
  },

  "linux-permissions": {
    purpose: "Linux permissions control who can read, write, or execute files and directories. The traditional permission model uses owner, group, and others, with read (r), write (w), and execute (x) bits. Ownership and special permissions help administrators control access to system resources.",
    project: "In a CI/CD deployment, a pipeline user may need to read application files and execute deployment scripts without receiving unrestricted root access. Correct ownership, group membership, and directory permissions allow the deployment to work while limiting access to production configuration and secrets.",
    workflow: [
      "A file or directory is created with an owner and group.",
      "The system evaluates the requesting user's identity and applicable permission bits.",
      "The kernel checks whether the requested read, write, or execute operation is allowed.",
      "Administrators adjust ownership or permission bits when access requirements change.",
      "Access is tested using the actual service or deployment account."
    ],
    commands: [
      "ls -l: Inspect file ownership and permission bits.",
      "stat <file>: Display detailed file metadata and permissions.",
      "chmod 640 config.yml: Give owner read/write, group read, and others no access.",
      "chmod u+x deploy.sh: Add execute permission for the owner.",
      "chown appuser:appgroup <path>: Change ownership and group.",
      "id <user>: Display user and group membership.",
      "getfacl <path>: Inspect ACL permissions when ACL tools are available."
    ],
    mistakes: [
      "Using chmod 777 to solve access problems without understanding the required access.",
      "Changing ownership recursively on system directories and breaking services.",
      "Forgetting that directories require execute permission for traversal.",
      "Assuming that file permissions alone explain access when ACLs, SELinux, or AppArmor may also apply."
    ],
    configuration: [
      "Choose restrictive permissions for application configuration and secret files.",
      "Use dedicated service users and groups to share only the required resources.",
      "Set a suitable umask for files created by deployment and application processes.",
      "Use ACLs when controlled access for additional users or groups is required."
    ],
    troubleshooting: [
      "For Permission denied, inspect every parent directory with namei -l <path>.",
      "Compare the current account's groups using id and verify ownership with ls -l.",
      "Inspect ACL entries using getfacl and review SELinux or AppArmor denials where enabled.",
      "Test access as the real service user instead of relying only on an administrator account."
    ],
    bestPractices: [
      "Apply least privilege and avoid broad world-writable permissions.",
      "Keep application code, writable runtime directories, and secret files under separate ownership and permission policies.",
      "Review permission changes in deployment scripts and configuration management.",
      "Audit sensitive files periodically and document required access."
    ],
    securityConsiderations: [
      "Protect private keys, tokens, and configuration secrets with restrictive ownership and permissions.",
      "Avoid setuid and setgid permissions unless there is a reviewed operational requirement.",
      "Monitor unexpected permission changes on critical system and application files.",
      "Use mandatory access controls such as SELinux or AppArmor as an additional security layer."
    ]
  },

  "ssh": {
    purpose: "SSH (Secure Shell) is a protocol used to securely access remote systems and execute commands over an encrypted connection. It supports password and public-key authentication, remote command execution, secure file transfer, and tunneling.",
    project: "A DevOps engineer uses SSH to access a Linux VM, investigate a failed deployment, or allow a controlled automation runner to connect to a target server. Public-key authentication and restricted accounts reduce the need for interactive passwords in deployment workflows.",
    workflow: [
      "The SSH client connects to the server's configured address and port.",
      "The client and server negotiate cryptographic algorithms and establish an encrypted session.",
      "The client verifies the server host key against known_hosts or another trusted host-key source.",
      "The user authenticates using an approved method such as a private key.",
      "The server authorizes the account and provides a shell, command, or file-transfer session."
    ],
    commands: [
      "ssh user@server: Connect to a remote host using the default SSH port.",
      "ssh -i ~/.ssh/id_ed25519 user@server: Authenticate with a specified private key.",
      "ssh -p 2222 user@server: Connect using a non-default port.",
      "ssh -v user@server: Enable verbose client diagnostics.",
      "ssh-keygen -t ed25519: Generate an SSH key pair.",
      "ssh-copy-id user@server: Install a public key when the server permits this method.",
      "scp file.txt user@server:/tmp/: Copy a file securely."
    ],
    mistakes: [
      "Sharing private keys between engineers or committing them to source control.",
      "Disabling host-key verification to bypass connection warnings.",
      "Opening SSH to the entire internet without network restrictions.",
      "Changing SSH configuration without validating syntax or keeping an existing administrative session."
    ],
    configuration: [
      "Use /etc/ssh/sshd_config for server-side SSH settings and validate changes with sshd -t.",
      "Use key-based authentication and disable password authentication where operationally appropriate.",
      "Restrict login users or groups and use dedicated automation accounts.",
      "Configure firewall rules, bastion access, and key rotation according to the environment."
    ],
    troubleshooting: [
      "For Connection timed out, verify routing, firewall rules, server availability, and the destination port.",
      "For Connection refused, confirm that sshd is running and listening on the expected address and port.",
      "For Permission denied (publickey), inspect the selected key, authorized_keys, account permissions, and server authentication logs.",
      "For host-key warnings, verify the server identity through a trusted channel before updating known_hosts."
    ],
    bestPractices: [
      "Use unique keys for people, automation systems, and environments.",
      "Protect private keys with appropriate filesystem permissions and passphrases.",
      "Use a bastion or controlled access gateway for sensitive production networks.",
      "Keep SSH server packages patched and review authentication logs."
    ],
    securityConsiderations: [
      "Never share private keys or store them in public repositories.",
      "Limit SSH exposure using security groups, firewalls, VPNs, or zero-trust access controls.",
      "Use MFA or an approved identity-aware access layer where supported.",
      "Remove obsolete keys and accounts promptly and monitor suspicious login attempts."
    ]
  },

  "dns": {
    purpose: "DNS (Domain Name System) translates human-readable domain names into records such as IP addresses. It also supports record types for aliases, mail routing, service discovery, and domain verification. Applications depend on DNS to locate services without hardcoding their network addresses.",
    project: "A Kubernetes-hosted application calls an internal database using a service DNS name rather than a fixed IP address. If the application cannot connect after a deployment, engineers inspect DNS resolution, CoreDNS health, search domains, and network policies before changing application configuration.",
    workflow: [
      "An application requests resolution for a hostname.",
      "The system resolver checks local configuration and applicable caches.",
      "A recursive resolver obtains the required record from authoritative DNS infrastructure if it is not cached.",
      "The resolver returns the record and its time-to-live information.",
      "The application uses the returned address to establish a network connection."
    ],
    commands: [
      "dig example.com: Query DNS records and display the response.",
      "dig A example.com: Query IPv4 address records.",
      "dig AAAA example.com: Query IPv6 address records.",
      "dig MX example.com: Inspect mail exchanger records.",
      "nslookup example.com: Perform a basic DNS lookup.",
      "getent hosts example.com: Test resolution through the system name-service configuration.",
      "cat /etc/resolv.conf: Inspect configured resolver information."
    ],
    mistakes: [
      "Assuming that successful DNS resolution proves the destination application is reachable.",
      "Ignoring DNS caching and record TTL during migration or failover.",
      "Using an incorrect search domain or resolver configuration.",
      "Changing records without checking authoritative nameservers and propagation behavior."
    ],
    configuration: [
      "Manage public DNS records through the approved DNS provider and use appropriate TTL values.",
      "Configure internal resolvers and search domains according to the operating environment.",
      "Use service discovery records for internal applications where supported.",
      "Monitor authoritative DNS health and recursive resolver availability."
    ],
    troubleshooting: [
      "For NXDOMAIN, verify the hostname, zone, record, and authoritative DNS response.",
      "For SERVFAIL, inspect resolver logs, DNSSEC validation, delegation, and upstream availability.",
      "For intermittent failures, compare multiple resolvers and inspect TTL and caching behavior.",
      "In Kubernetes, inspect CoreDNS pods, service endpoints, and DNS-related network policies."
    ],
    bestPractices: [
      "Use meaningful DNS names instead of embedding changing IP addresses in application configuration.",
      "Choose TTL values that balance caching efficiency and change-management needs.",
      "Automate DNS record changes through reviewed infrastructure workflows.",
      "Monitor resolution latency, failure rates, and authoritative zone health."
    ],
    securityConsiderations: [
      "Restrict who can modify public and internal DNS records.",
      "Use DNSSEC where supported and appropriate to protect record authenticity.",
      "Protect internal DNS zones from unintended public exposure.",
      "Monitor suspicious DNS changes and unusual query patterns."
    ]
  },

  "tcp-ip": {
    purpose: "TCP/IP is the core networking protocol suite used to communicate across connected systems. IP handles addressing and packet routing, while TCP provides connection-oriented, reliable, ordered data delivery. Other protocols, such as UDP, provide different transport behavior for workloads that need it.",
    project: "When a microservice calls another service in a production environment, engineers investigate the complete communication path: IP routing, transport connectivity, firewall policy, and application response. Understanding TCP states helps distinguish connection failures from application-level errors.",
    workflow: [
      "The application creates data for transmission.",
      "The transport layer divides data into TCP segments or UDP datagrams.",
      "The IP layer adds source and destination addressing information.",
      "Routers forward packets toward the destination network.",
      "The receiving system processes the packets and delivers data to the appropriate application socket."
    ],
    commands: [
      "ip addr: Display network interfaces and IP addresses.",
      "ip route: Inspect the routing table.",
      "ip route get 8.8.8.8: Check the selected route to a destination.",
      "ss -tan: Inspect TCP sockets and connection states.",
      "ping -c 4 <host>: Test basic IP reachability where ICMP is permitted.",
      "traceroute <host>: Investigate the network path when the tool is installed and permitted.",
      "tcpdump -ni any host <IP>: Capture matching packets with appropriate privileges."
    ],
    mistakes: [
      "Treating ping failure as proof that a server or application is down.",
      "Confusing a routing problem with a TCP port or application problem.",
      "Ignoring MTU, packet loss, retransmissions, or asymmetric routing.",
      "Capturing traffic without limiting scope or considering sensitive packet contents."
    ],
    configuration: [
      "Configure addresses, routes, DNS, and interface settings using the host's network-management system.",
      "Use approved subnet ranges and avoid overlapping address spaces.",
      "Configure MTU consistently across interfaces, tunnels, and network paths.",
      "Document routing and firewall dependencies for application environments."
    ],
    troubleshooting: [
      "Check interface state and addresses using ip addr.",
      "Inspect the selected route with ip route get and verify the expected gateway.",
      "Use ss to inspect socket states and tcpdump to investigate packet-level behavior.",
      "Correlate retransmissions, packet loss, and connection resets with host and network metrics."
    ],
    bestPractices: [
      "Document IP ranges, gateways, routes, and dependencies for each environment.",
      "Use monitoring for packet loss, interface errors, connection states, and network throughput.",
      "Apply network changes through reviewed configuration management.",
      "Capture only the traffic needed to diagnose an incident and store evidence securely."
    ],
    securityConsiderations: [
      "Segment networks and restrict traffic between application tiers.",
      "Use encryption such as TLS for sensitive application communication.",
      "Restrict packet-capture privileges and protect captured traffic as sensitive data.",
      "Monitor unexpected connections, spoofing indicators, and unusual traffic patterns."
    ]
  },

  "http-and-https": {
    purpose: "HTTP is an application-layer protocol used for communication between clients and web servers. HTTPS is HTTP protected by TLS encryption, which provides confidentiality, integrity, and server authentication. HTTP methods, status codes, headers, and request bodies define how web applications exchange information.",
    project: "A browser or API client sends an HTTPS request to an application behind a load balancer. During a production incident, engineers inspect TLS certificates, response codes, headers, reverse-proxy behavior, and application logs to determine whether the failure occurs at the edge or inside the service.",
    workflow: [
      "A client resolves the server hostname and establishes a network connection.",
      "For HTTPS, the client and server negotiate a TLS session and validate the certificate.",
      "The client sends an HTTP request containing a method, path, headers, and optional body.",
      "The server or proxy routes the request to the appropriate application handler.",
      "The server returns a status code, response headers, and optional response body."
    ],
    commands: [
      "curl -I https://example.com: Inspect response headers.",
      "curl -v https://example.com: Display connection, TLS, request, and response diagnostics.",
      "curl -X GET https://example.com/health: Test an application health endpoint.",
      "curl -o /dev/null -s -w '%{http_code} %{time_total}\\n' https://example.com: Inspect HTTP status and total request time.",
      "openssl s_client -connect example.com:443 -servername example.com: Inspect a TLS handshake and certificate.",
      "curl -H 'Content-Type: application/json' -d '{\"status\":\"test\"}' https://example.com/api: Send a sample JSON request only to an approved test endpoint."
    ],
    mistakes: [
      "Assuming every HTTP 5xx response is caused by the web server rather than an upstream application.",
      "Ignoring TLS certificate expiration, hostname mismatch, or incomplete certificate chains.",
      "Sending sensitive data over plain HTTP.",
      "Using unsafe retry behavior for non-idempotent operations such as payment or order creation."
    ],
    configuration: [
      "Configure HTTPS listeners and certificates on the application gateway, load balancer, or web server.",
      "Use appropriate TLS versions and approved cipher suites.",
      "Configure reverse-proxy headers, request-size limits, and upstream timeouts.",
      "Use health endpoints and access logs that expose useful request identifiers without leaking secrets."
    ],
    troubleshooting: [
      "For 4xx responses, inspect authentication, authorization, request format, and route behavior.",
      "For 5xx responses, correlate proxy logs, upstream health, application exceptions, and dependency failures.",
      "For TLS errors, inspect certificate dates, hostname, trust chain, and server-name configuration.",
      "For slow requests, compare DNS, connection, TLS, server-processing, and total response times."
    ],
    bestPractices: [
      "Use HTTPS throughout production traffic paths wherever possible.",
      "Choose correct HTTP methods and status codes and implement safe timeout and retry policies.",
      "Add request IDs and structured access logs for end-to-end troubleshooting.",
      "Monitor latency percentiles, error rates, TLS expiry, and upstream health."
    ],
    securityConsiderations: [
      "Never expose passwords, access tokens, or sensitive personal data in URLs or logs.",
      "Enforce TLS and validate certificates rather than disabling verification.",
      "Apply authentication, authorization, input validation, and rate limiting.",
      "Use secure cookie attributes and appropriate security headers for browser applications."
    ]
  },

  "port": {
    purpose: "A network port is a logical endpoint used by transport protocols such as TCP and UDP to direct incoming traffic to an application or service. IP addresses identify hosts, while port numbers help identify the relevant application endpoint on those hosts.",
    project: "A Dockerized application listens on port 3000 inside its container, while a reverse proxy accepts HTTPS traffic on port 443. Engineers must distinguish the container listening port, host-published port, and load-balancer listener when diagnosing connectivity failures.",
    workflow: [
      "An application binds a socket to a local IP address and port.",
      "A client sends traffic to the destination host and port.",
      "The operating system checks whether a matching socket is listening.",
      "Firewall and network rules determine whether the traffic is allowed.",
      "The application accepts and processes the connection."
    ],
    commands: [
      "ss -lntup: List listening TCP and UDP sockets with process information where permitted.",
      "ss -tan: Display TCP connection states.",
      "lsof -i :8080: Find processes using port 8080 when lsof is installed.",
      "nc -vz server 443: Test TCP connectivity to a destination port.",
      "sudo fuser -v 8080/tcp: Identify processes using a TCP port.",
      "curl http://localhost:8080/health: Test a local HTTP service."
    ],
    mistakes: [
      "Confusing a service's internal container port with its published host port.",
      "Assuming that a listening port is automatically reachable from another machine.",
      "Starting multiple services on the same IP and port combination.",
      "Opening unnecessary ports to every network source."
    ],
    configuration: [
      "Configure application bind addresses and listening ports explicitly.",
      "Document service ports, protocol types, and allowed source networks.",
      "Configure container port publishing and load-balancer listeners consistently.",
      "Use environment-specific configuration instead of hardcoding ports throughout application code."
    ],
    troubleshooting: [
      "For Address already in use, identify the existing listener using ss or lsof.",
      "For Connection refused, check whether the application is listening on the expected address and port.",
      "For timeouts, inspect firewalls, routing, security groups, and upstream network paths.",
      "For container access issues, verify container port, host mapping, service configuration, and network policy."
    ],
    bestPractices: [
      "Maintain an approved service-port inventory.",
      "Expose only the ports required by application dependencies and users.",
      "Monitor unexpected listeners and changes to network exposure.",
      "Use service discovery and load balancing for dynamic application environments."
    ],
    securityConsiderations: [
      "Restrict inbound ports using host firewalls and cloud network security rules.",
      "Avoid exposing database and administrative ports publicly.",
      "Bind internal-only services to private interfaces where appropriate.",
      "Review listening services regularly and remove unused network endpoints."
    ]
  },

  "firewall": {
    purpose: "A firewall controls network traffic using rules based on attributes such as source, destination, protocol, port, and connection state. Linux systems may use nftables, iptables compatibility tools, firewalld, or UFW to manage host-level traffic filtering.",
    project: "A production application server accepts HTTPS requests from an approved load balancer but should not accept direct public database connections. Firewall rules enforce the allowed traffic paths while deployment and monitoring systems retain only their required access.",
    workflow: [
      "A packet reaches a host or network firewall.",
      "The firewall evaluates the packet against configured rules and policies.",
      "Matching rules allow, reject, or drop the traffic.",
      "Connection tracking may allow related return traffic for established connections.",
      "Administrators review logs and counters to validate that policy works as intended."
    ],
    commands: [
      "sudo ufw status verbose: Inspect UFW status and configured rules.",
      "sudo ufw allow 443/tcp: Allow HTTPS traffic through UFW.",
      "sudo ufw deny 23/tcp: Deny Telnet traffic through UFW.",
      "sudo nft list ruleset: Inspect nftables rules.",
      "sudo iptables -L -n -v: Inspect iptables rules and counters where applicable.",
      "sudo firewall-cmd --list-all: Inspect the active firewalld zone when installed.",
      "sudo ss -lntup: Compare firewall policy with actual listening services."
    ],
    mistakes: [
      "Applying a default-deny policy remotely without allowing the current administrative access path.",
      "Mixing firewall managers and creating conflicting rules.",
      "Opening broad source ranges when only a specific subnet is required.",
      "Assuming a host firewall replaces cloud security groups or upstream network controls."
    ],
    configuration: [
      "Choose one supported firewall management approach for the host and document ownership.",
      "Define default policies and narrowly scoped allow rules.",
      "Use persistent configuration and verify rules after reboot.",
      "Plan rollback access before changing production firewall policy."
    ],
    troubleshooting: [
      "For blocked connections, inspect firewall rules, counters, logs, and connection-tracking state.",
      "Check both host firewall rules and cloud or network firewall policies.",
      "Verify the application is listening before changing firewall configuration.",
      "Use controlled packet captures to determine whether packets reach the host."
    ],
    bestPractices: [
      "Apply least-privilege network access and review rules periodically.",
      "Manage firewall changes through version-controlled configuration.",
      "Test changes in a non-production environment and maintain a rollback procedure.",
      "Monitor denied traffic and unexpected changes to firewall policy."
    ],
    securityConsiderations: [
      "Do not disable the firewall as a routine troubleshooting shortcut.",
      "Restrict administrative ports to approved management networks.",
      "Log relevant denied traffic without overwhelming storage or exposing sensitive information.",
      "Review emergency exceptions and remove them after the incident."
    ]
  },

  "proxy": {
    purpose: "A proxy is an intermediary that receives requests from clients and forwards them to another destination. A forward proxy typically acts on behalf of clients, while a reverse proxy receives requests on behalf of backend services and can provide TLS termination, routing, caching, and load balancing.",
    project: "A DevOps platform may place Nginx or another reverse proxy in front of multiple application instances. The proxy terminates HTTPS, routes requests by hostname or path, and forwards traffic to healthy upstream services. A corporate forward proxy may separately control outbound internet access from build agents.",
    workflow: [
      "A client sends a request to the proxy endpoint.",
      "The proxy evaluates routing rules, access policy, and request metadata.",
      "For a reverse proxy, the request is forwarded to a selected backend; for a forward proxy, it is forwarded toward the requested destination.",
      "The proxy receives the upstream response and returns it to the client.",
      "Logs and metrics record request status, latency, and upstream behavior."
    ],
    commands: [
      "curl -I -x http://proxy.example:8080 https://example.com: Test an approved forward proxy.",
      "curl -v https://application.example: Inspect proxy and TLS-related connection details.",
      "nginx -t: Validate Nginx configuration when Nginx is installed.",
      "nginx -T: Display the effective Nginx configuration with appropriate privileges.",
      "systemctl status nginx: Check reverse-proxy service status.",
      "journalctl -u nginx -n 100: Inspect recent Nginx service logs."
    ],
    mistakes: [
      "Overwriting the original client IP without preserving trusted forwarding headers.",
      "Configuring incorrect upstream addresses or health-check paths.",
      "Trusting X-Forwarded-For from arbitrary clients.",
      "Using proxy environment variables incorrectly in build agents or application containers."
    ],
    configuration: [
      "Define explicit upstream services, routing rules, and connection timeouts.",
      "Configure TLS termination and secure communication to backends where required.",
      "Set trusted proxy ranges before accepting forwarded client-IP headers.",
      "Manage proxy environment variables such as HTTP_PROXY and NO_PROXY carefully in automation."
    ],
    troubleshooting: [
      "For 502 Bad Gateway, inspect backend availability, DNS, connection failures, and upstream logs.",
      "For 504 Gateway Timeout, inspect backend response time and proxy timeout settings.",
      "For incorrect client IPs, review trusted forwarding-header configuration and proxy topology.",
      "For outbound access failures, verify proxy address, authentication, certificate trust, and NO_PROXY entries."
    ],
    bestPractices: [
      "Use health checks and meaningful upstream failure handling.",
      "Keep proxy configuration in version control and validate it before reload.",
      "Set appropriate request, connection, and response timeouts.",
      "Monitor proxy error rates, upstream latency, and backend availability."
    ],
    securityConsiderations: [
      "Do not trust client-supplied forwarding headers unless they come through trusted proxies.",
      "Protect proxy administration interfaces and configuration secrets.",
      "Restrict which destinations clients may access through forward proxies.",
      "Use TLS and carefully control request headers to prevent information leakage."
    ]
  },

  "bash": {
    purpose: "Bash is a command-line shell and scripting language commonly used on Linux systems. It executes commands, manages variables, processes arguments, handles conditions and loops, and connects utilities through pipelines. Bash scripts automate repeatable operational and deployment tasks.",
    project: "A CI/CD pipeline can use Bash to validate deployment inputs, check service health, package artifacts, and execute controlled maintenance tasks on Linux runners. Reliable scripts make automation repeatable and provide clear failure messages when a deployment step cannot complete.",
    workflow: [
      "The shell reads a script or command and processes its syntax.",
      "Variables, arguments, conditions, and functions determine which commands run.",
      "External programs execute and exchange data through standard input, output, and error streams.",
      "Exit codes indicate whether commands succeeded or failed.",
      "The script exits with a status that the pipeline or calling process can evaluate."
    ],
    commands: [
      "bash script.sh: Execute a Bash script.",
      "bash -n script.sh: Check Bash syntax without executing the script.",
      "bash -x script.sh: Trace command execution for debugging; avoid exposing secrets.",
      "chmod +x script.sh: Make a script executable when its permissions allow.",
      "set -euo pipefail: Enable common strict-mode behaviors with care for command semantics.",
      "grep -n 'ERROR' application.log: Search a log file for matching lines.",
      "find /var/log -type f -name '*.log': Find log files by name."
    ],
    mistakes: [
      "Failing to quote variables and unintentionally splitting paths or expanding wildcard characters.",
      "Ignoring exit codes and allowing failed commands to appear successful.",
      "Using set -e without understanding its exceptions in conditionals, pipelines, and functions.",
      "Embedding secrets in scripts or enabling verbose tracing around sensitive commands."
    ],
    configuration: [
      "Use a clear shebang such as #!/usr/bin/env bash for portable Bash scripts.",
      "Validate required inputs and define safe defaults for optional arguments.",
      "Use functions to separate validation, execution, and cleanup responsibilities.",
      "Set environment variables explicitly and keep secrets in approved secret stores."
    ],
    troubleshooting: [
      "For syntax errors, run bash -n and inspect the reported line.",
      "For unexpected variable values, use controlled diagnostic output and check quoting.",
      "For pipeline failures, inspect PIPESTATUS and command exit codes.",
      "For permission or interpreter errors, verify the shebang, file permissions, line endings, and available shell."
    ],
    bestPractices: [
      "Use quoted variables, meaningful names, and small reusable functions.",
      "Validate inputs before running destructive commands.",
      "Use explicit error handling, cleanup traps, and clear exit statuses.",
      "Test scripts with representative inputs before adding them to production pipelines."
    ],
    securityConsiderations: [
      "Never hardcode passwords, tokens, or private keys in scripts.",
      "Avoid unsafe eval usage and validate data before passing it to shell commands.",
      "Use least-privilege accounts and restrict write access to executable scripts.",
      "Protect logs and debug output from revealing secrets or sensitive environment variables."
    ]
  },

  "cron": {
    purpose: "Cron is a time-based job scheduler used on Unix-like systems to run commands or scripts automatically at configured times or intervals. It is commonly used for backups, cleanup, reporting, certificate checks, and recurring maintenance tasks.",
    project: "A Linux production server may run a scheduled backup script every night and a cleanup job once a week. Engineers verify the schedule, execution account, environment variables, logs, and exit status to ensure recurring operations complete reliably.",
    workflow: [
      "An administrator defines a cron expression and command in a user's crontab or a system cron location.",
      "The cron service evaluates schedules against the system time.",
      "When a schedule matches, the command starts under its configured user context.",
      "The job executes with its configured environment and permissions.",
      "Output and exit status are captured or reported according to the system's logging configuration."
    ],
    commands: [
      "crontab -l: List the current user's cron jobs.",
      "crontab -e: Edit the current user's crontab.",
      "crontab -u appuser -l: Inspect another user's crontab with appropriate privileges.",
      "systemctl status cron: Check the cron service on Debian-based systems.",
      "systemctl status crond: Check the cron service on many RHEL-based systems.",
      "journalctl -u cron: Inspect cron service logs where journald integration is available.",
      "date: Check the system's current date and time."
    ],
    mistakes: [
      "Assuming cron inherits the same PATH and environment as an interactive terminal.",
      "Using incorrect cron fields or forgetting that the system crontab includes a user field.",
      "Failing to capture job output and errors.",
      "Scheduling overlapping jobs that modify the same files or database records."
    ],
    configuration: [
      "Use crontab -e for user-specific schedules and the appropriate system cron locations for system jobs.",
      "Use absolute executable and file paths in scheduled commands.",
      "Set required environment variables explicitly and redirect output to managed logs.",
      "Use flock or another locking mechanism when jobs must not overlap."
    ],
    troubleshooting: [
      "For a job that does not run, verify cron service status, schedule syntax, user permissions, and system time.",
      "Run the command manually as the scheduled user to reproduce environment and permission problems.",
      "Inspect cron logs and redirected standard output and error.",
      "For duplicate or overlapping runs, inspect execution duration and add suitable locking."
    ],
    bestPractices: [
      "Keep scheduled scripts idempotent so safe retries do not create duplicate side effects.",
      "Use absolute paths, explicit environments, and clear logging.",
      "Monitor job success, failure, duration, and missed executions.",
      "Use systemd timers or an orchestration platform when more advanced dependency and retry management is required."
    ],
    securityConsiderations: [
      "Run each scheduled job under the least-privileged account that can perform its task.",
      "Protect crontabs and scripts from unauthorized modification.",
      "Do not place secrets directly in cron command lines.",
      "Audit privileged scheduled jobs and remove obsolete schedules."
    ]
  }
};
