
export interface DNSDiagnosticStep {
  id: string;
  title: string;
  purpose: string;
  commands: string[];
  interpret: string[];
  nextDecision: string[];
  safety: string;
}

export interface DNSFailureCase {
  id: string;
  scenario: string;
  symptoms: string[];
  likelyCauses: string[];
  diagnostics: string[];
  interpretation: string[];
  remediation: string[];
  verification: string[];
  prevention: string[];
}

export interface DNSProductionIncident {
  id: string;
  title: string;
  severity: string;
  impact: string[];
  timeline: string[];
  investigation: string[];
  rootCause: string;
  recovery: string[];
  validation: string[];
  followUp: string[];
}

export interface DNSIssuesGuide {
  slug: string;
  title: string;
  category: string;
  description: string;
  overview: string[];
  severityMatrix: {
    severity: string;
    criteria: string[];
    response: string;
  }[];
  symptoms: string[];
  safetyChecks: string[];
  diagnosticWorkflow: DNSDiagnosticStep[];
  failureCases: DNSFailureCase[];
  productionIncidents: DNSProductionIncident[];
  recoveryRunbook: string[];
  preventionChecklist: string[];
  monitoring: {
    metric: string;
    investigateWhen: string;
    usefulLabels: string[];
    alertGuidance: string;
  }[];
  ciCdChecks: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    expectedLearning: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  references: string[];
}

export const dnsIssuesGuide: DNSIssuesGuide = {
  slug: "dns-issues",
  title: "Linux DNS Issues: Real Production Troubleshooting",
  category: "Linux",
  description:
    "An evidence-driven runbook for DNS resolution failures, timeouts, incorrect records, resolver configuration, caching, authoritative DNS, Kubernetes CoreDNS, service discovery, and production deployment failures.",

  overview: [
    "DNS translates names such as api.example.com into resource records, commonly IP addresses. Applications depend on DNS for HTTP services, databases, message brokers, identity providers, cloud endpoints, and internal service discovery.",
    "A DNS incident can originate from the client, local resolver, recursive resolver, network path, authoritative nameserver, DNS zone, cache, search domain, or application runtime. Diagnose each layer rather than changing DNS records immediately.",
    "The Linux /etc/resolv.conf file commonly identifies configured DNS resolvers and search options. It may be generated or managed by NetworkManager, systemd-resolved, DHCP, a VPN client, a container runtime, or Kubernetes.",
    "A successful ping does not prove DNS is healthy: the command may use a cached address, a numeric IP, or a hostname resolved through a different path. Likewise, ping failure does not automatically prove DNS failure.",
    "A successful dig query does not guarantee that the application uses the same resolver or DNS library. NSS configuration, application caches, JVM behavior, containers, proxies, and runtime-specific resolvers can change the observed result.",
    "NXDOMAIN means the queried name does not exist according to the responding DNS authority or resolver. SERVFAIL indicates that the server could not complete resolution. REFUSED means the server refused the query. A timeout means no usable response arrived within the client's wait period; it does not by itself identify the cause.",
    "A DNS response can be technically valid but operationally wrong. Examples include a stale IP, missing record, wrong split-horizon answer, incorrect search suffix, unintended wildcard record, or an endpoint that resolves but is unreachable.",
    "DNS caching is distributed. Local caches, recursive resolvers, application runtimes, proxies, and browsers may retain different answers. TTLs and negative caching affect how quickly changes become visible.",
    "Use the affected host, container, pod, or network namespace for diagnostics. Testing from an administrator laptop may follow a completely different DNS path.",
    "The recovery objective is to restore correct and reliable name resolution while preserving evidence, limiting blast radius, and validating actual application connectivity."
  ],

  severityMatrix: [
    {
      severity: "SEV-1 / Critical",
      criteria: [
        "A widespread DNS failure makes critical production services unreachable.",
        "CoreDNS or shared recursive resolvers fail across a large part of the production environment.",
        "Multiple critical applications cannot resolve required dependencies."
      ],
      response:
        "Declare the incident, engage platform/network/DNS owners, establish scope, preserve resolver and query evidence, and execute the approved failover or recovery plan. Avoid uncoordinated resolver changes across the fleet."
    },
    {
      severity: "SEV-2 / High",
      criteria: [
        "One critical application or production region has widespread resolution failures.",
        "Deployment, authentication, database connectivity, or service discovery is failing.",
        "DNS timeouts or incorrect answers materially affect customer-facing latency."
      ],
      response:
        "Isolate the failing resolution layer, compare affected and healthy hosts, and coordinate a targeted correction with the DNS or service owner."
    },
    {
      severity: "SEV-3 / Medium",
      criteria: [
        "Intermittent lookup failures affect a subset of workloads.",
        "One namespace, container, host group, or private network has incorrect resolution.",
        "DNS changes have not propagated as expected but service impact is limited."
      ],
      response:
        "Capture the exact query, resolver, response code, TTL, source network, and timestamp. Fix the smallest confirmed scope and monitor for recurrence."
    },
    {
      severity: "SEV-4 / Low",
      criteria: [
        "A non-production hostname or isolated record has an incorrect answer.",
        "A DNS warning occurs without material service impact."
      ],
      response:
        "Validate the record, owner, intended scope, TTL, and downstream use. Correct configuration through normal change management."
    }
  ],

  symptoms: [
    "Temporary failure in name resolution.",
    "Name or service not known.",
    "Could not resolve host.",
    "NXDOMAIN, SERVFAIL, REFUSED, or DNS query timeout.",
    "A deployment pipeline cannot download dependencies or contact a deployment target.",
    "A service resolves correctly on one server but fails on another.",
    "An internal hostname resolves to a public IP instead of a private address.",
    "A DNS record was updated, but clients continue using an old IP address.",
    "Applications intermittently fail while direct queries to one DNS server succeed.",
    "Kubernetes pods cannot resolve cluster services or external hostnames.",
    "CoreDNS pods are healthy but queries fail, time out, or return unexpected records.",
    "Short hostnames work from one environment but fail from another due to search-domain differences.",
    "DNS works from the host but fails inside a container or pod.",
    "A hostname resolves successfully, but HTTP, TLS, or TCP connectivity still fails.",
    "Only IPv6 or only IPv4 resolution appears to work.",
    "Deployment failures occur after a network, VPN, VPC, resolver, firewall, or DNS-zone change.",
    "Applications experience slow first connections even though subsequent connections work.",
    "A DNS outage appears after a resolver restart, nameserver change, or cache change."
  ],

  safetyChecks: [
    "Confirm the affected host, environment, application, cluster, namespace, region, and exact hostname.",
    "Record the fully qualified domain name (FQDN), query type, expected answer, observed answer, resolver IP, response code, TTL, and timestamp.",
    "Confirm whether the issue affects production, staging, a specific network, a VPN-connected host, or only one application.",
    "Identify recent changes to DNS zones, records, resolvers, DHCP, VPN, firewall rules, VPC DNS settings, Kubernetes configuration, or application deployment.",
    "Use read-only commands first: getent, dig, resolvectl status, cat /etc/resolv.conf, ip route, and approved logs.",
    "Do not replace /etc/resolv.conf blindly. It may be a symlink managed by systemd-resolved, NetworkManager, DHCP, a container runtime, or Kubernetes.",
    "Do not point production workloads to a public resolver as an unapproved workaround. This can break private DNS, internal service names, split-horizon behavior, and security controls.",
    "Do not flush caches or restart resolver services until you have recorded the existing answer, TTL, resolver configuration, and the reason for the proposed action.",
    "Do not modify authoritative records or lower TTLs during an incident without confirming record ownership, intended value, impact, and approval.",
    "Do not expose sensitive internal domains, query payloads, internal IP ranges, or customer-specific names in public incident tickets.",
    "If the application resolves a hostname through a proxy, service mesh, or custom DNS library, include that path in the investigation.",
    "Before making a DNS change, record the current value and define a rollback plan. DNS caching means rollback may not be immediately visible everywhere.",
    "Confirm whether DNSSEC validation, private hosted zones, split-horizon zones, or conditional forwarding are required for the affected domain."
  ],

  diagnosticWorkflow: [
    {
      id: "step-01",
      title: "Establish incident scope and timeline",
      purpose:
        "Determine exactly which names, clients, networks, and services are affected and correlate the incident with changes.",
      commands: [
        "date -Is",
        "hostnamectl",
        "ip -brief address",
        "ip route",
        "cat /etc/os-release",
        "journalctl --since '-30 min' --no-pager | tail -200"
      ],
      interpret: [
        "Record the host identity, active interfaces, routes, and timestamp.",
        "Capture the exact hostname and error from the failing application or deployment log.",
        "Compare the first failure with DNS record changes, resolver changes, VPN connections, firewall updates, releases, and infrastructure changes.",
        "Determine whether all clients fail, only one subnet fails, only containers fail, or only one application fails."
      ],
      nextDecision: [
        "If multiple services and hosts fail together, investigate shared resolvers, network paths, and zone changes.",
        "If only one host fails, inspect its resolver configuration, routing, local cache, and host-specific policy.",
        "If the host works but a container or pod fails, move the investigation into that container or pod's DNS context.",
        "If only one application fails, compare its resolver library, proxy, runtime cache, and connection behavior with a working diagnostic client."
      ],
      safety:
        "Do not modify records or restart resolver services before establishing the affected scope and recording the observed behavior."
    },
    {
      id: "step-02",
      title: "Test the exact name using the operating system resolver path",
      purpose:
        "Determine whether normal host name resolution succeeds, not merely whether a DNS server answers a direct query.",
      commands: [
        "getent ahosts api.example.com",
        "getent hosts api.example.com",
        "getent ahostsv4 api.example.com",
        "getent ahostsv6 api.example.com",
        "grep '^hosts:' /etc/nsswitch.conf"
      ],
      interpret: [
        "Replace api.example.com with the exact affected hostname.",
        "getent uses the system name-service path, which may include files, DNS, and other configured NSS sources.",
        "If getent succeeds but the application fails, compare the application runtime, cache, proxy, container context, and actual hostname.",
        "If IPv4 lookup succeeds but IPv6 lookup fails, determine whether the application requires IPv6 or whether IPv6 failure is expected.",
        "A hostname in /etc/hosts may resolve even when DNS is broken."
      ],
      nextDecision: [
        "If getent fails, inspect resolver configuration and run direct DNS queries.",
        "If getent succeeds but the application fails, reproduce the lookup from the application's actual runtime or network namespace.",
        "If only one address family fails, check AAAA/A records, routing, and application connection preferences."
      ],
      safety:
        "Do not edit /etc/hosts to hide an unresolved DNS issue unless a temporary, approved override has an owner and expiry plan."
    },
    {
      id: "step-03",
      title: "Inspect resolver configuration",
      purpose:
        "Find which resolvers, search suffixes, and resolver options the affected system uses.",
      commands: [
        "cat /etc/resolv.conf",
        "ls -l /etc/resolv.conf",
        "grep -E '^(hosts|networks):' /etc/nsswitch.conf",
        "resolvectl status",
        "resolvectl statistics",
        "nmcli device show"
      ],
      interpret: [
        "Nameserver entries identify configured resolver addresses, but the file may be generated by another service.",
        "Search domains can cause a short name such as api to be expanded into one or more domain names.",
        "Options such as ndots, timeout, attempts, and rotate can influence query behavior.",
        "On systemd-resolved systems, /etc/resolv.conf may point to a local stub resolver. In that case, 127.0.0.53 is a local service, not the upstream DNS server.",
        "Commands such as resolvectl or nmcli may not exist on minimal systems or containers."
      ],
      nextDecision: [
        "If the configured resolver is unexpected, identify the service or configuration manager that generated it.",
        "If a local stub is configured, inspect systemd-resolved status and upstream servers.",
        "If search suffixes or options differ from a healthy peer, verify the intended configuration before changing it.",
        "If the file is generated by DHCP, VPN, cloud-init, or NetworkManager, fix the source configuration instead of editing a generated file directly."
      ],
      safety:
        "Do not overwrite /etc/resolv.conf without understanding its ownership, symlink target, upstream resolver requirements, and rollback procedure."
    },
    {
      id: "step-04",
      title: "Query the configured DNS resolver directly",
      purpose:
        "Separate operating system name-service behavior from the DNS response received from a particular resolver.",
      commands: [
        "dig api.example.com A",
        "dig api.example.com AAAA",
        "dig api.example.com CNAME",
        "dig api.example.com A +noall +answer +comments",
        "dig @<resolver-ip> api.example.com A +time=2 +tries=1",
        "dig @<resolver-ip> api.example.com AAAA +time=2 +tries=1"
      ],
      interpret: [
        "NOERROR with an answer indicates the query succeeded and returned records.",
        "NOERROR with no answer can indicate NODATA: the name may exist but have no record of the requested type.",
        "NXDOMAIN means the queried name does not exist according to the responding DNS system.",
        "SERVFAIL means the resolver could not complete the query. Investigate upstream reachability, authoritative responses, DNSSEC validation, and resolver logs.",
        "REFUSED means the server refused the request, potentially because of access policy or recursion settings.",
        "A timeout means no usable response was received. Check routing, firewall policy, server health, packet loss, and whether the queried server is reachable.",
        "The ANSWER SECTION shows returned records and TTLs. The status and flags in the header provide important context.",
        "A successful direct query does not prove the application uses the same server or resolver path."
      ],
      nextDecision: [
        "If one resolver fails and another approved resolver succeeds, compare resolver health and configuration before changing clients.",
        "If every configured resolver fails, check local routing, network policy, and the shared DNS service.",
        "If the response is successful but contains an incorrect IP, investigate authoritative records, split-horizon behavior, and caches.",
        "If only one record type fails, investigate the A, AAAA, CNAME, or other record specifically."
      ],
      safety:
        "Use approved resolver IPs only. Do not send internal production query names to an unrelated public resolver if doing so would expose private names."
    },
    {
      id: "step-05",
      title: "Distinguish DNS failure from network connectivity failure",
      purpose:
        "Check whether the resolver is reachable and whether the returned application address can be reached.",
      commands: [
        "ip route get <resolver-ip>",
        "ip route get <resolved-ip>",
        "ip -brief address",
        "ip neigh",
        "nc -vz <resolved-ip> <port>",
        "curl -sv --connect-timeout 5 https://api.example.com/health"
      ],
      interpret: [
        "ip route get shows the route and source address selected for a destination.",
        "DNS commonly uses UDP port 53 and can also use TCP port 53. Large responses, truncation, or some resolver behaviors may require TCP.",
        "A timeout to a DNS server can result from routing, firewall rules, ACLs, packet loss, or a server that is not listening.",
        "If DNS succeeds but TCP connectivity fails, investigate the resolved IP, application port, security groups, firewall rules, listener health, and routing.",
        "curl can fail due to DNS, TCP, TLS, HTTP, proxy, or application errors. Read the exact failure stage instead of labelling every curl failure as DNS."
      ],
      nextDecision: [
        "If the resolver IP is unreachable, investigate routing and network policy.",
        "If DNS resolves but the application port is unreachable, investigate service connectivity rather than changing DNS records.",
        "If TCP connects but TLS fails, investigate certificates, SNI, trust chains, and system time.",
        "If the connection works from one network only, compare source subnet, VPN, route tables, and security policies."
      ],
      safety:
        "Use approved destination IPs and ports. Do not disable firewalls or security groups as a diagnostic shortcut."
    },
    {
      id: "step-06",
      title: "Check UDP/TCP DNS behavior and firewall policy",
      purpose:
        "Identify transport-specific failures that can make DNS appear intermittent or response-size dependent.",
      commands: [
        "dig @<resolver-ip> api.example.com A +notcp +time=2 +tries=1",
        "dig @<resolver-ip> api.example.com A +tcp +time=2 +tries=1",
        "ss -lunp",
        "ss -ltnp",
        "sudo tcpdump -ni any 'port 53' -c 100"
      ],
      interpret: [
        "If UDP queries fail but TCP succeeds, inspect UDP filtering, NAT, packet loss, and resolver policy.",
        "If TCP queries fail but UDP succeeds, inspect TCP/53 filtering and resolver listeners.",
        "If requests leave the host but no response returns, inspect the return route, firewall, ACL, and upstream resolver.",
        "If a response returns but the client still times out, investigate packet matching, local firewall rules, resolver behavior, or response handling.",
        "Some managed resolvers do not expose conventional listeners to the client host, so ss output alone cannot prove whether the remote DNS service is healthy."
      ],
      nextDecision: [
        "If only one transport fails, engage the network or DNS team with timestamps, source/destination IPs, protocol, and query results.",
        "If packets do not leave the host, inspect local routing and firewall policy.",
        "If packets leave but responses are absent, compare with a healthy host on the same network and investigate upstream policy."
      ],
      safety:
        "Packet captures can expose internal query names. Restrict capture duration, output location, and access. Use sudo only when authorized."
    },
    {
      id: "step-07",
      title: "Trace the DNS delegation and authoritative records",
      purpose:
        "Determine whether the intended records exist in the authoritative zone and whether delegation is correct.",
      commands: [
        "dig example.com NS",
        "dig example.com SOA",
        "dig +trace api.example.com A",
        "dig @<authoritative-ns> api.example.com A",
        "dig @<authoritative-ns> api.example.com AAAA"
      ],
      interpret: [
        "NS records identify nameservers for a zone; SOA records provide zone metadata.",
        "A trace can show the delegation path from the root toward the authoritative servers, but it may be blocked or unavailable in restricted networks.",
        "Querying an authoritative server directly can help distinguish an authoritative-data problem from a recursive-cache problem.",
        "A missing A record does not necessarily mean the hostname is absent; it may be a CNAME, AAAA-only record, or a name with another record type.",
        "If different authoritative servers return different answers unexpectedly, investigate zone synchronization, delegation, and authoritative service health."
      ],
      nextDecision: [
        "If the intended record is missing from authoritative data, verify the zone, owner, record name, record type, and change history.",
        "If authoritative answers are correct but recursive answers differ, investigate caching, forwarding, DNSSEC validation, and resolver policy.",
        "If delegation is incorrect, involve the zone owner and domain registrar or DNS provider through the approved change process."
      ],
      safety:
        "Do not modify authoritative DNS or registrar nameservers without owner approval and a documented rollback plan."
    },
    {
      id: "step-08",
      title: "Investigate stale caches and negative caching",
      purpose:
        "Explain why clients may continue seeing an old or negative DNS answer after a record change.",
      commands: [
        "dig api.example.com A +noall +answer +comments",
        "dig @<resolver-ip> api.example.com A +noall +answer +comments",
        "resolvectl statistics",
        "resolvectl query api.example.com",
        "getent ahosts api.example.com"
      ],
      interpret: [
        "Compare answers and TTLs from the affected client, configured recursive resolver, and authoritative server.",
        "A resolver may legitimately return a cached record until its TTL expires.",
        "Negative answers such as NXDOMAIN can also be cached, subject to DNS negative-caching behavior and the zone's SOA settings.",
        "Application runtimes may cache answers independently of the operating system resolver.",
        "Restarting a service or flushing one local cache may not clear upstream recursive caches or application-specific caches."
      ],
      nextDecision: [
        "If authoritative data is correct but a resolver has a stale cached answer, confirm TTL and caching policy with the resolver owner.",
        "If only the application has a stale answer, inspect its runtime or client cache configuration.",
        "If negative caching persists, verify whether the previous query was for a nonexistent name and whether the negative TTL has expired.",
        "If different networks see different answers, investigate split-horizon DNS and resolver paths before assuming propagation failure."
      ],
      safety:
        "Do not repeatedly flush caches as a substitute for identifying the layer that holds the stale answer."
    },
    {
      id: "step-09",
      title: "Investigate split-horizon DNS and private zones",
      purpose:
        "Check whether the hostname intentionally resolves differently in public and private networks.",
      commands: [
        "dig @<internal-resolver-ip> api.example.com A",
        "dig @<approved-public-resolver-ip> api.example.com A",
        "ip route",
        "resolvectl status",
        "getent ahosts api.example.com"
      ],
      interpret: [
        "Private hosted zones and split-horizon DNS can intentionally return private addresses internally and public addresses externally.",
        "A public answer is not automatically wrong; the expected answer depends on the client's network and DNS view.",
        "VPN connection state, conditional forwarding, resolver rules, and source subnet can change the DNS view.",
        "Internal names may intentionally be unavailable from public resolvers."
      ],
      nextDecision: [
        "If a private client receives a public answer unexpectedly, verify private-zone association and resolver forwarding rules.",
        "If a remote or VPN client receives no internal answer, verify VPN routes, DNS settings, and conditional forwarding.",
        "If only one subnet receives the wrong view, compare resolver endpoints and zone associations for that subnet."
      ],
      safety:
        "Do not expose private records or change private/public zone associations without reviewing the security and routing consequences."
    },
    {
      id: "step-10",
      title: "Check systemd-resolved and local resolver behavior",
      purpose:
        "Determine whether a local stub resolver or per-link DNS configuration is causing the issue.",
      commands: [
        "systemctl status systemd-resolved --no-pager",
        "resolvectl status",
        "resolvectl query api.example.com",
        "resolvectl statistics",
        "ls -l /etc/resolv.conf",
        "journalctl -u systemd-resolved --since '-30 min' --no-pager"
      ],
      interpret: [
        "systemd-resolved may use per-interface DNS servers, routing domains, and a local stub address.",
        "A working direct query to an upstream server alongside a failed local resolver query points toward local resolver configuration, cache, or service behavior.",
        "A failed systemd-resolved command may mean the service is not installed or not used on that system.",
        "NetworkManager, DHCP, VPN, and other network managers can alter DNS settings as links change."
      ],
      nextDecision: [
        "If systemd-resolved is unhealthy, inspect service logs and configured upstreams before restarting it.",
        "If the wrong per-link resolver is active, fix the responsible NetworkManager, DHCP, VPN, or systemd configuration.",
        "If the system does not use systemd-resolved, inspect its actual resolver manager instead."
      ],
      safety:
        "Restarting the local resolver can interrupt lookups for many services. Use a change window or incident-approved action when the impact warrants it."
    },
    {
      id: "step-11",
      title: "Troubleshoot DNS from inside a Docker container",
      purpose:
        "Find differences between host DNS and container DNS configuration.",
      commands: [
        "docker exec <container> cat /etc/resolv.conf",
        "docker exec <container> getent hosts api.example.com",
        "docker exec <container> sh -c 'command -v nslookup || command -v dig || true'",
        "docker inspect <container>",
        "docker network inspect <network>"
      ],
      interpret: [
        "Container DNS settings may differ from the host's settings. Docker may provide an embedded resolver for container networks.",
        "A minimal image may not include dig or nslookup. Use getent where available or a controlled diagnostic container attached to the same network.",
        "A container can fail to resolve internal names because of network attachment, custom DNS settings, search suffixes, or an unavailable upstream resolver.",
        "Host success does not prove container success because the network namespace and resolver path may differ."
      ],
      nextDecision: [
        "If host DNS succeeds and container DNS fails, compare container resolver settings and Docker network configuration.",
        "If all containers fail, investigate shared runtime DNS settings and upstream resolver reachability.",
        "If only one container fails, compare its network attachment and configuration with a healthy peer."
      ],
      safety:
        "Do not recreate production containers or change daemon-wide DNS settings without confirming impact, deployment ownership, and rollback."
    },
    {
      id: "step-12",
      title: "Troubleshoot Kubernetes DNS and CoreDNS",
      purpose:
        "Separate pod-level DNS configuration, CoreDNS health, cluster networking, and upstream resolution failures.",
      commands: [
        "kubectl get pods -n kube-system -o wide",
        "kubectl get svc,endpoints,endpointslices -n kube-system",
        "kubectl get configmap coredns -n kube-system -o yaml",
        "kubectl logs -n kube-system -l k8s-app=kube-dns --since=30m",
        "kubectl describe pod <pod> -n <namespace>",
        "kubectl exec -n <namespace> <pod> -- cat /etc/resolv.conf",
        "kubectl exec -n <namespace> <pod> -- getent hosts kubernetes.default.svc",
        "kubectl exec -n <namespace> <pod> -- getent hosts api.example.com"
      ],
      interpret: [
        "Check whether CoreDNS pods are ready and whether the kube-dns service has usable endpoints.",
        "Inspect the pod's resolver configuration, including nameserver, search suffixes, and ndots.",
        "A failed kubernetes.default.svc lookup suggests a cluster DNS or service-discovery problem; a successful cluster lookup but failed external lookup points toward upstream forwarding or egress.",
        "CoreDNS logs can reveal forwarding failures, plugin errors, refused queries, or upstream timeouts.",
        "A pod image may not include getent, dig, or nslookup. Use an approved diagnostic image in the same namespace and network policy context.",
        "A CoreDNS configuration change can affect every pod. Validate syntax and expected forwarding behavior before applying it."
      ],
      nextDecision: [
        "If CoreDNS pods are unhealthy, inspect resource pressure, scheduling, logs, readiness, and recent configuration changes.",
        "If CoreDNS is healthy but the service has no endpoints, inspect service selectors and endpoint discovery.",
        "If cluster names resolve but external names fail, inspect CoreDNS forwarding, upstream resolver reachability, and egress policy.",
        "If only one namespace or pod fails, inspect its DNS policy, network policies, node, and pod-specific configuration."
      ],
      safety:
        "Do not delete all CoreDNS pods or replace the Corefile as a first response. Preserve the existing ConfigMap, deployment state, and approved rollback configuration."
    },
    {
      id: "step-13",
      title: "Investigate search domains, ndots, and short-name resolution",
      purpose:
        "Identify cases where a short hostname generates unexpected or excessive DNS queries.",
      commands: [
        "cat /etc/resolv.conf",
        "getent hosts api",
        "getent hosts api.example.com",
        "dig api.example.com A",
        "kubectl exec -n <namespace> <pod> -- cat /etc/resolv.conf"
      ],
      interpret: [
        "Search domains allow short names to be expanded into candidate domain names.",
        "The ndots option controls when a name is considered sufficiently qualified before search-list processing; behavior depends on the resolver implementation.",
        "In Kubernetes, search lists and ndots settings can cause extra queries for external FQDNs.",
        "A short name may resolve to an unintended internal hostname if a search suffix matches a different record."
      ],
      nextDecision: [
        "If the wrong suffix is applied, use the intended FQDN or correct the approved resolver configuration.",
        "If query volume is excessive, measure actual resolver traffic and review ndots/search configuration before changing it.",
        "If only one application is affected, verify how its runtime handles search domains."
      ],
      safety:
        "Changing ndots or search domains fleet-wide can change service discovery behavior. Test changes in a controlled environment."
    },
    {
      id: "step-14",
      title: "Investigate DNSSEC validation and SERVFAIL",
      purpose:
        "Determine whether a resolver is rejecting records because of DNSSEC validation or a broken delegation chain.",
      commands: [
        "dig api.example.com A",
        "dig api.example.com A +dnssec",
        "dig @<resolver-ip> api.example.com A +dnssec",
        "dig +trace api.example.com A",
        "dig example.com DNSKEY",
        "dig example.com DS"
      ],
      interpret: [
        "A SERVFAIL response may be caused by DNSSEC validation failure, but it can also result from upstream timeouts, delegation errors, or resolver problems.",
        "The presence of DNSSEC-related records does not prove that validation succeeds.",
        "Compare a validating resolver's response with authoritative data and resolver logs.",
        "A public diagnostic resolver may use different policy and network paths from the production resolver."
      ],
      nextDecision: [
        "If DNSSEC validation is implicated, involve the zone owner and resolver operator to validate DS, DNSKEY, signatures, and expiry.",
        "If delegation or authoritative service is broken, correct the source configuration through the approved process.",
        "If upstream reachability is the problem, investigate network and resolver health rather than changing DNSSEC settings."
      ],
      safety:
        "Do not disable DNSSEC validation globally as a quick fix. It can weaken security and conceal a zone-signing or delegation defect."
    },
    {
      id: "step-15",
      title: "Separate DNS from TLS, HTTP, proxy, and application failures",
      purpose:
        "Confirm the failure stage after a name resolves.",
      commands: [
        "getent ahosts api.example.com",
        "curl -sv --connect-timeout 5 https://api.example.com/health",
        "curl -sv --resolve api.example.com:443:<expected-ip> https://api.example.com/health",
        "openssl s_client -connect api.example.com:443 -servername api.example.com",
        "env | grep -iE '^(http_proxy|https_proxy|no_proxy)='"
      ],
      interpret: [
        "If DNS resolves but TCP fails, investigate routes, firewalls, security groups, and listener health.",
        "If TCP connects but TLS fails, investigate certificates, SNI, trust stores, system time, and TLS policy.",
        "curl --resolve bypasses normal DNS for that specific curl request while preserving the hostname for HTTP/TLS. Use only a verified intended IP.",
        "A proxy may resolve the destination hostname on the proxy side rather than on the client.",
        "HTTP 4xx or 5xx responses prove that the request reached an HTTP-speaking endpoint, but they do not establish that the endpoint is the intended backend."
      ],
      nextDecision: [
        "If --resolve succeeds but normal lookup fails, focus on the DNS resolution path.",
        "If both fail at connection time, inspect network reachability and listener health.",
        "If TLS fails, resolve the certificate or trust problem without modifying DNS unnecessarily.",
        "If a proxy is involved, repeat diagnostics through the same proxy path as the application."
      ],
      safety:
        "Do not disable TLS verification with insecure flags as a production fix. Redact proxy credentials and sensitive environment values."
    },
    {
      id: "step-16",
      title: "Apply a controlled fix and validate recovery",
      purpose:
        "Restore the intended resolution path and confirm real application behavior.",
      commands: [
        "date -Is",
        "getent ahosts api.example.com",
        "dig api.example.com A +noall +answer +comments",
        "dig api.example.com AAAA +noall +answer +comments",
        "curl -fsS --connect-timeout 5 https://api.example.com/health",
        "journalctl --since '-10 min' --no-pager | tail -200"
      ],
      interpret: [
        "Repeat the same queries and application checks that failed at the start of the incident.",
        "Confirm that the returned record matches the intended DNS view and that the endpoint is reachable.",
        "Compare DNS response times, response codes, TTLs, application latency, and error rate before and after the change.",
        "A successful single query is not enough if failures were intermittent. Sample over a representative interval and from affected client locations.",
        "DNS changes can remain temporarily inconsistent while cached positive or negative answers expire."
      ],
      nextDecision: [
        "If recovery is confirmed, monitor affected clients and resolvers for recurrence and document remaining cache-expiry expectations.",
        "If only some clients recover, compare their resolver paths, cache state, network, and DNS view.",
        "If DNS succeeds but the application still fails, continue with TCP, TLS, HTTP, and dependency diagnostics.",
        "If the fix increases blast radius, execute the approved rollback and notify the incident owner."
      ],
      safety:
        "Make one approved change at a time where practical. Record the previous configuration and retain a rollback plan."
    }
  ],

  failureCases: [
    {
      id: "case-01",
      scenario: "Temporary failure in name resolution",
      symptoms: [
        "curl reports Could not resolve host.",
        "Applications fail to contact a dependency.",
        "The failure may be intermittent."
      ],
      likelyCauses: [
        "Configured resolver unavailable.",
        "Routing or firewall issue.",
        "Local resolver malfunction.",
        "Intermittent upstream DNS failure.",
        "Incorrect container or pod DNS settings."
      ],
      diagnostics: [
        "getent ahosts api.example.com",
        "cat /etc/resolv.conf",
        "dig api.example.com A",
        "dig @<resolver-ip> api.example.com A +time=2 +tries=1",
        "ip route get <resolver-ip>",
        "resolvectl status"
      ],
      interpretation: [
        "Determine whether system resolution and direct DNS queries both fail.",
        "Compare configured resolver addresses with a healthy peer.",
        "Check whether packets can reach the resolver and whether responses return."
      ],
      remediation: [
        "Restore the approved resolver or network path.",
        "Fix the resolver configuration at its source if it was generated incorrectly.",
        "Use a documented, approved failover resolver if one exists."
      ],
      verification: [
        "Repeated lookups succeed from affected clients.",
        "Application requests recover.",
        "DNS timeout rates return to baseline."
      ],
      prevention: [
        "Monitor resolver reachability and query failure rates.",
        "Document primary and secondary resolver behavior.",
        "Test resolver failover and network changes."
      ]
    },
    {
      id: "case-02",
      scenario: "NXDOMAIN for an expected hostname",
      symptoms: [
        "dig returns NXDOMAIN.",
        "A service name is reported as nonexistent.",
        "Only a recently created or changed record may be affected."
      ],
      likelyCauses: [
        "Incorrect hostname or domain suffix.",
        "Missing record in the authoritative zone.",
        "Wrong zone or DNS view.",
        "Cached negative response.",
        "Incorrect delegation."
      ],
      diagnostics: [
        "dig api.example.com A",
        "dig example.com SOA",
        "dig example.com NS",
        "dig +trace api.example.com A",
        "dig @<authoritative-ns> api.example.com A"
      ],
      interpretation: [
        "Verify the exact spelling, trailing domain, and record type.",
        "Compare authoritative data with the recursive resolver response.",
        "Determine whether the client is querying the intended public or private zone."
      ],
      remediation: [
        "Create or correct the record in the correct authoritative zone after owner approval.",
        "Correct the hostname in application configuration if the query name is wrong.",
        "Account for negative caching after the record is created."
      ],
      verification: [
        "The authoritative server returns the intended answer.",
        "The affected recursive resolver eventually returns the intended answer.",
        "The application resolves and connects to the expected endpoint."
      ],
      prevention: [
        "Validate required DNS records during release readiness.",
        "Use explicit FQDNs where appropriate.",
        "Document record ownership and DNS-zone boundaries."
      ]
    },
    {
      id: "case-03",
      scenario: "SERVFAIL from a recursive resolver",
      symptoms: [
        "dig returns SERVFAIL.",
        "Some names fail while others work.",
        "The application reports intermittent resolution errors."
      ],
      likelyCauses: [
        "Authoritative server unavailable.",
        "Broken delegation.",
        "DNSSEC validation failure.",
        "Forwarder timeout.",
        "Recursive resolver overload."
      ],
      diagnostics: [
        "dig api.example.com A",
        "dig @<resolver-ip> api.example.com A +time=2 +tries=1",
        "dig +trace api.example.com A",
        "dig api.example.com A +dnssec",
        "journalctl --since '-30 min' --no-pager"
      ],
      interpretation: [
        "Check whether the failure is limited to one resolver or one domain.",
        "Use authoritative queries and resolver logs to distinguish delegation, DNSSEC, and reachability issues.",
        "Do not assume SERVFAIL means that the record itself is missing."
      ],
      remediation: [
        "Correct the identified delegation, signing, forwarding, or resolver-health issue.",
        "Use an approved healthy resolver path if the incident procedure provides one.",
        "Coordinate changes with the DNS zone owner."
      ],
      verification: [
        "The affected resolver returns correct answers repeatedly.",
        "Resolver SERVFAIL rates decline.",
        "Applications recover without relying on unsafe bypasses."
      ],
      prevention: [
        "Monitor response codes by resolver and domain.",
        "Validate DNSSEC and delegation changes.",
        "Maintain resolver redundancy and tested failover."
      ]
    },
    {
      id: "case-04",
      scenario: "DNS query timeout",
      symptoms: [
        "dig waits and returns a timeout.",
        "Application connection attempts fail intermittently.",
        "A resolver works from some subnets but not others."
      ],
      likelyCauses: [
        "UDP or TCP port 53 blocked.",
        "Route or return-path failure.",
        "Packet loss or resolver overload.",
        "Incorrect resolver address.",
        "Network ACL or firewall change."
      ],
      diagnostics: [
        "ip route get <resolver-ip>",
        "dig @<resolver-ip> api.example.com A +time=2 +tries=1",
        "dig @<resolver-ip> api.example.com A +tcp +time=2 +tries=1",
        "ss -s",
        "sudo tcpdump -ni any 'port 53' -c 100"
      ],
      interpretation: [
        "Compare UDP and TCP behavior.",
        "Determine whether the request leaves the client and whether a response returns.",
        "Compare source IP, route, and policy with a healthy peer."
      ],
      remediation: [
        "Correct the confirmed route, firewall, ACL, or resolver availability issue.",
        "Restore the approved network path or use approved DNS failover.",
        "Do not disable network security controls broadly."
      ],
      verification: [
        "Queries succeed consistently over the expected transport.",
        "Application resolution latency returns to normal.",
        "No unintended firewall exposure was introduced."
      ],
      prevention: [
        "Monitor DNS query latency and timeout rate.",
        "Include UDP and TCP DNS behavior in network validation.",
        "Review firewall changes for DNS dependencies."
      ]
    },
    {
      id: "case-05",
      scenario: "DNS resolves to an incorrect or stale IP",
      symptoms: [
        "Hostname resolves but connections reach the wrong endpoint.",
        "Different clients receive different addresses.",
        "The issue follows a record change."
      ],
      likelyCauses: [
        "Wrong authoritative record.",
        "Stale recursive or application cache.",
        "Split-horizon DNS.",
        "Unexpected CNAME chain.",
        "Incorrect private-zone association."
      ],
      diagnostics: [
        "dig api.example.com A +noall +answer +comments",
        "dig api.example.com CNAME",
        "dig @<resolver-ip> api.example.com A",
        "dig @<authoritative-ns> api.example.com A",
        "getent ahosts api.example.com"
      ],
      interpretation: [
        "Compare authoritative and recursive answers.",
        "Inspect TTLs and CNAME chains.",
        "Compare answers from the affected network and a known-good network."
      ],
      remediation: [
        "Correct the authoritative record after confirming the intended endpoint.",
        "Repair the incorrect DNS view or private-zone association.",
        "Allow cached answers to expire according to policy or follow the resolver owner's approved cache procedure."
      ],
      verification: [
        "Affected networks receive the intended answer.",
        "The endpoint responds on the expected port and hostname.",
        "No unrelated records or networks were changed."
      ],
      prevention: [
        "Review DNS record changes and use controlled rollout where supported.",
        "Document intended public and private answers.",
        "Monitor critical records and endpoint health."
      ]
    },
    {
      id: "case-06",
      scenario: "DNS works on the host but fails inside a container",
      symptoms: [
        "Host getent succeeds.",
        "Application container cannot resolve the same hostname.",
        "Container logs show resolution errors."
      ],
      likelyCauses: [
        "Different container resolver configuration.",
        "Docker network or embedded resolver issue.",
        "Incorrect custom DNS configuration.",
        "Container network policy or egress problem."
      ],
      diagnostics: [
        "cat /etc/resolv.conf",
        "docker exec <container> cat /etc/resolv.conf",
        "docker exec <container> getent hosts api.example.com",
        "docker inspect <container>",
        "docker network inspect <network>"
      ],
      interpretation: [
        "Compare host and container nameserver and search settings.",
        "Check container network attachment and embedded DNS behavior.",
        "Use a diagnostic image on the same network if the application image lacks DNS tools."
      ],
      remediation: [
        "Correct the container DNS or network configuration at its managed source.",
        "Restore upstream resolver reachability.",
        "Redeploy only through the approved workflow if container configuration must change."
      ],
      verification: [
        "The affected container resolves the intended name.",
        "Application requests succeed.",
        "Other containers remain healthy."
      ],
      prevention: [
        "Test DNS from within representative containers.",
        "Version-control container network and DNS settings.",
        "Include internal and external name-resolution checks in deployment validation."
      ]
    },
    {
      id: "case-07",
      scenario: "Kubernetes pods cannot resolve service names",
      symptoms: [
        "Pods cannot resolve kubernetes.default.svc.",
        "Service discovery fails in one or more namespaces.",
        "Applications report name-resolution timeouts."
      ],
      likelyCauses: [
        "CoreDNS unavailable or overloaded.",
        "Missing CoreDNS service endpoints.",
        "Incorrect pod DNS policy.",
        "Cluster networking or NetworkPolicy issue.",
        "Incorrect CoreDNS configuration."
      ],
      diagnostics: [
        "kubectl get pods -n kube-system -o wide",
        "kubectl get svc,endpoints,endpointslices -n kube-system",
        "kubectl logs -n kube-system -l k8s-app=kube-dns --since=30m",
        "kubectl describe pod <pod> -n <namespace>",
        "kubectl exec -n <namespace> <pod> -- cat /etc/resolv.conf",
        "kubectl exec -n <namespace> <pod> -- getent hosts kubernetes.default.svc"
      ],
      interpretation: [
        "Confirm CoreDNS pod readiness and service endpoint availability.",
        "Check whether cluster-local names fail while external names work, or vice versa.",
        "Inspect pod DNS policy and CoreDNS forwarding rules.",
        "Determine whether failures are cluster-wide, node-specific, or namespace-specific."
      ],
      remediation: [
        "Restore CoreDNS health or endpoints using the cluster runbook.",
        "Correct DNS policy, network policy, or forwarding configuration when evidence identifies it.",
        "Roll back a bad CoreDNS configuration change if approved and supported by evidence."
      ],
      verification: [
        "Cluster-local service names resolve.",
        "Required external names resolve from affected pods.",
        "CoreDNS error and latency metrics return toward baseline."
      ],
      prevention: [
        "Monitor CoreDNS availability, query latency, error rate, and upstream failures.",
        "Validate CoreDNS configuration before applying changes.",
        "Run cluster DNS smoke tests after networking or cluster upgrades."
      ]
    },
    {
      id: "case-08",
      scenario: "Internal hostname resolves publicly instead of privately",
      symptoms: [
        "An internal service hostname resolves to a public address.",
        "Private endpoint connectivity fails.",
        "Only VPN or cloud-network clients are affected."
      ],
      likelyCauses: [
        "Private zone not associated with the network.",
        "Conditional forwarding missing.",
        "VPN DNS configuration incorrect.",
        "Wrong resolver selected for the interface."
      ],
      diagnostics: [
        "resolvectl status",
        "cat /etc/resolv.conf",
        "dig @<internal-resolver-ip> api.example.com A",
        "dig @<approved-public-resolver-ip> api.example.com A",
        "ip route"
      ],
      interpretation: [
        "Compare answers from the intended private and public DNS views.",
        "Check VPN status, route selection, conditional forwarding, and zone associations.",
        "Verify that the expected private record exists."
      ],
      remediation: [
        "Correct private-zone association or conditional forwarding through the responsible owner.",
        "Restore the approved VPN DNS settings.",
        "Avoid hardcoding private IPs into application code as a permanent workaround."
      ],
      verification: [
        "Internal clients receive the intended private answer.",
        "Public DNS behavior remains correct.",
        "The application connects using the intended network path."
      ],
      prevention: [
        "Document private/public DNS architecture.",
        "Test name resolution from each network boundary.",
        "Include VPN and private-zone changes in release validation."
      ]
    },
    {
      id: "case-09",
      scenario: "DNS works but HTTPS requests fail",
      symptoms: [
        "The hostname returns an IP address.",
        "curl fails during connection or TLS negotiation.",
        "Application logs incorrectly report a general endpoint failure."
      ],
      likelyCauses: [
        "TCP connectivity failure.",
        "Incorrect listener or target health.",
        "Certificate or SNI mismatch.",
        "Proxy configuration issue.",
        "Application error."
      ],
      diagnostics: [
        "getent ahosts api.example.com",
        "nc -vz <resolved-ip> 443",
        "curl -sv --connect-timeout 5 https://api.example.com/health",
        "openssl s_client -connect api.example.com:443 -servername api.example.com"
      ],
      interpretation: [
        "Identify whether failure occurs during resolution, TCP connection, TLS negotiation, or HTTP handling.",
        "Verify that the resolved address belongs to the intended service.",
        "Inspect certificate validity, SNI, and listener health if TCP succeeds."
      ],
      remediation: [
        "Fix the network, listener, certificate, proxy, or application issue identified by evidence.",
        "Change DNS only if the record itself is incorrect.",
        "Do not disable TLS verification to suppress the symptom."
      ],
      verification: [
        "The expected hostname resolves correctly.",
        "TCP and TLS negotiation succeed.",
        "The application health endpoint returns the expected status."
      ],
      prevention: [
        "Monitor DNS, TCP, TLS, and HTTP health as separate stages.",
        "Use synthetic checks from relevant network locations.",
        "Validate certificate and endpoint changes before release."
      ]
    },
    {
      id: "case-10",
      scenario: "IPv4 works but IPv6 connections fail",
      symptoms: [
        "A record lookup succeeds.",
        "AAAA lookup returns an address or fails unexpectedly.",
        "Applications using IPv6 experience timeouts."
      ],
      likelyCauses: [
        "Incorrect AAAA record.",
        "Missing IPv6 route.",
        "Firewall or security-group policy.",
        "Application address-selection behavior."
      ],
      diagnostics: [
        "dig api.example.com A",
        "dig api.example.com AAAA",
        "ip -6 address",
        "ip -6 route",
        "curl -4 -sv https://api.example.com/health",
        "curl -6 -sv https://api.example.com/health"
      ],
      interpretation: [
        "Compare IPv4 and IPv6 records and connectivity independently.",
        "Verify that the AAAA record points to an intended, reachable endpoint.",
        "Check whether the application prefers IPv6 or retries IPv4 after IPv6 failure."
      ],
      remediation: [
        "Correct an invalid AAAA record or restore the intended IPv6 route and policy.",
        "If IPv6 is not intended, follow the DNS owner's approved record-removal process.",
        "Do not disable IPv6 globally to conceal a service-specific defect."
      ],
      verification: [
        "Each published address family behaves as intended.",
        "Applications connect using their supported address-selection behavior.",
        "No unintended impact is introduced to IPv6-dependent services."
      ],
      prevention: [
        "Test both A and AAAA records.",
        "Monitor IPv4 and IPv6 connectivity independently.",
        "Include address-family validation in endpoint changes."
      ]
    },
    {
      id: "case-11",
      scenario: "External DNS queries fail from Kubernetes but cluster-local queries work",
      symptoms: [
        "kubernetes.default.svc resolves.",
        "External hostnames fail from pods.",
        "Applications cannot reach public dependencies by name."
      ],
      likelyCauses: [
        "CoreDNS forwarder failure.",
        "Upstream resolver unreachable.",
        "Egress firewall or NetworkPolicy.",
        "Incorrect upstream configuration."
      ],
      diagnostics: [
        "kubectl logs -n kube-system -l k8s-app=kube-dns --since=30m",
        "kubectl get configmap coredns -n kube-system -o yaml",
        "kubectl exec -n <namespace> <pod> -- getent hosts kubernetes.default.svc",
        "kubectl exec -n <namespace> <pod> -- getent hosts example.com",
        "kubectl get networkpolicy -A"
      ],
      interpretation: [
        "Cluster-local success indicates part of the cluster DNS path is functioning but does not prove upstream forwarding is healthy.",
        "Look for upstream timeouts, blocked egress, and differences between node and pod network paths.",
        "Confirm whether the cluster uses a managed resolver, private DNS forwarder, or custom upstream."
      ],
      remediation: [
        "Restore upstream resolver reachability or correct the forwarding configuration.",
        "Adjust egress policy only after confirming the required destinations and approval.",
        "Use the documented cluster DNS rollback procedure if a recent configuration change caused the failure."
      ],
      verification: [
        "Cluster-local and required external lookups succeed.",
        "CoreDNS forwarding errors fall.",
        "External application dependencies become reachable."
      ],
      prevention: [
        "Monitor internal and external DNS queries separately.",
        "Test DNS forwarding after cluster or VPC networking changes.",
        "Document the upstream resolver dependency."
      ]
    },
    {
      id: "case-12",
      scenario: "DNS query volume and latency increase after a deployment",
      symptoms: [
        "Resolver query volume increases.",
        "Application startup or request latency rises.",
        "The issue correlates with a new release."
      ],
      likelyCauses: [
        "Excessive lookups due to search domains or ndots.",
        "Short cache lifetime or disabled caching.",
        "Increased connection creation.",
        "Repeated retries or hostname lookups in a hot path."
      ],
      diagnostics: [
        "cat /etc/resolv.conf",
        "kubectl exec -n <namespace> <pod> -- cat /etc/resolv.conf",
        "dig api.example.com A",
        "journalctl -u <service> --since '-30 min' --no-pager",
        "kubectl logs <pod> -n <namespace> --since=30m"
      ],
      interpretation: [
        "Compare DNS query rate, lookup latency, request rate, connection churn, and release time.",
        "Check whether external FQDNs trigger additional search-list queries.",
        "Confirm whether each request performs new DNS lookups because of runtime or connection-pool behavior."
      ],
      remediation: [
        "Fix excessive lookups or connection churn in the application.",
        "Review resolver settings with controlled tests.",
        "Use appropriate connection pooling and caching only where the application's correctness and freshness requirements allow it."
      ],
      verification: [
        "DNS query rate and latency return toward baseline.",
        "Application startup and request latency recover.",
        "Record freshness requirements remain satisfied."
      ],
      prevention: [
        "Track DNS query rate and latency by service.",
        "Test search-domain behavior in containers.",
        "Review connection reuse and DNS caching behavior during performance testing."
      ]
    }
  ],

  productionIncidents: [
    {
      id: "incident-01",
      title: "Production deployment fails because the dependency hostname cannot resolve",
      severity: "SEV-2",
      impact: [
        "Deployment jobs fail while downloading dependencies or contacting a deployment endpoint.",
        "The production release is delayed.",
        "The underlying application may remain healthy if no deployment was applied."
      ],
      timeline: [
        "T+00: Pipeline reports a hostname-resolution error.",
        "T+05: The operator confirms the failing hostname, runner, environment, and whether deployment changes have already been applied.",
        "T+10: The operator tests getent and dig from the same runner context.",
        "T+15: Resolver configuration and recent network/DNS changes are compared with a healthy runner.",
        "T+25: The team confirms whether the cause is resolver reachability, incorrect DNS data, or a runner-specific configuration.",
        "T+35: A targeted correction is applied and the deployment is rerun under controlled conditions."
      ],
      investigation: [
        "Capture the pipeline job URL or ID, timestamp, runner identity, working environment, exact hostname, and complete relevant error.",
        "Run getent ahosts and dig from the failing runner or its equivalent network context.",
        "Compare /etc/resolv.conf, routes, resolver addresses, and query response codes with a healthy runner.",
        "Check whether the job runs in a container, private subnet, VPN, or isolated build network.",
        "Confirm whether any deployment step already changed production resources before retrying."
      ],
      rootCause:
        "Example hypothesis: the runner uses a resolver that cannot resolve an internal dependency hostname. Confirm the actual resolver path and response before changing DNS configuration.",
      recovery: [
        "Stop repeated retries if they could cause duplicate deployment actions.",
        "Preserve logs and the last known deployment state.",
        "Fix the resolver or network configuration at its managed source.",
        "Validate the required hostname and endpoint from the same runner context.",
        "Rerun the deployment only after checking idempotency and partial-application risk."
      ],
      validation: [
        "The runner resolves the intended hostname repeatedly.",
        "The dependency endpoint is reachable and healthy.",
        "The controlled deployment completes and post-deployment health checks pass.",
        "No duplicate or partial resource changes remain."
      ],
      followUp: [
        "Add DNS smoke tests to runner readiness checks.",
        "Document required internal and external DNS dependencies.",
        "Add an incident step to inspect partial deployment state before retry."
      ]
    },
    {
      id: "incident-02",
      title: "Kubernetes external service resolution fails",
      severity: "SEV-2",
      impact: [
        "Pods cannot reach external APIs or registries by hostname.",
        "Internal cluster service names may still resolve.",
        "Requests fail or deployments stall while the cluster remains partially operational."
      ],
      timeline: [
        "T+00: External dependency failures rise.",
        "T+05: The team tests a cluster-local service name and an external FQDN from an affected pod.",
        "T+10: CoreDNS readiness, endpoints, and logs are inspected.",
        "T+15: The team identifies forwarding errors or upstream resolver reachability problems.",
        "T+25: An approved forwarding, network, or resolver correction is applied.",
        "T+35: Internal and external DNS tests pass and application requests recover."
      ],
      investigation: [
        "Check CoreDNS pod readiness, service endpoints, logs, and recent configuration changes.",
        "Inspect the affected pod's /etc/resolv.conf and DNS policy.",
        "Compare cluster-local and external hostname lookups.",
        "Investigate upstream resolver addresses, node routing, egress policy, and network ACLs.",
        "Check whether the issue is limited to a node, namespace, or cluster."
      ],
      rootCause:
        "Example hypothesis: CoreDNS can answer cluster-local records but cannot reach its configured upstream resolver. Confirm with logs and resolver/network evidence.",
      recovery: [
        "Preserve the current CoreDNS configuration and deployment state.",
        "Apply the approved forwarding or network correction.",
        "Use the documented rollback if a recent configuration change is responsible.",
        "Avoid deleting all DNS pods as a substitute for finding the failed layer."
      ],
      validation: [
        "Cluster-local and external lookups succeed from affected pods.",
        "CoreDNS error and latency metrics recover.",
        "Application dependencies become reachable.",
        "No unexpected public/private DNS view changes occur."
      ],
      followUp: [
        "Add separate internal and external DNS synthetic checks.",
        "Alert on upstream forwarding failures.",
        "Test CoreDNS configuration changes in a representative environment."
      ]
    },
    {
      id: "incident-03",
      title: "A DNS record change sends clients to the wrong endpoint",
      severity: "SEV-1 or SEV-2 depending on customer impact",
      impact: [
        "Some clients connect to an old, wrong, or unreachable IP.",
        "Application errors vary by network because of caching or split-horizon behavior.",
        "A rollback may not be instantly visible to all clients."
      ],
      timeline: [
        "T+00: Connection failures begin after a DNS change.",
        "T+05: The DNS owner confirms the changed record and intended answer.",
        "T+10: Authoritative and recursive answers are compared from affected and healthy networks.",
        "T+15: The team identifies the incorrect record, DNS view, or stale-cache layer.",
        "T+25: An approved correction is applied.",
        "T+35: Client resolution and application connectivity are monitored as cached answers expire."
      ],
      investigation: [
        "Capture the record name, type, old and new values, TTL, change time, and change owner.",
        "Query the authoritative server and configured recursive resolver.",
        "Compare answers from internal, external, VPN, and affected client networks.",
        "Check CNAME chains and whether the returned endpoint is healthy.",
        "Estimate the impact of existing positive and negative cache entries."
      ],
      rootCause:
        "Example hypothesis: a record was updated in the wrong DNS view or points to an unintended endpoint. Confirm against the change record and authoritative data.",
      recovery: [
        "Correct the record after owner approval.",
        "Restore the known-good value if rollback is the approved action.",
        "Communicate expected cache-expiry behavior.",
        "Avoid repeated record changes that make the effective state harder to determine."
      ],
      validation: [
        "Authoritative answers match the intended configuration.",
        "Recursive answers converge as expected.",
        "Affected clients connect to the intended endpoint.",
        "Application health and error rates recover."
      ],
      followUp: [
        "Add peer review for critical record changes.",
        "Validate public and private DNS views before release.",
        "Document TTL, rollback, and cache-expiry expectations."
      ]
    },
    {
      id: "incident-04",
      title: "DNS queries time out on one production subnet",
      severity: "SEV-2",
      impact: [
        "Workloads on one subnet experience intermittent or total name-resolution failures.",
        "Other subnets continue resolving the same hostname.",
        "Services that depend on DNS show connection failures."
      ],
      timeline: [
        "T+00: Monitoring or application logs show lookup failures.",
        "T+05: The team compares the affected subnet with a healthy subnet.",
        "T+10: Resolver IP, route, UDP/TCP behavior, and firewall path are compared.",
        "T+20: Network evidence identifies a route, ACL, or resolver-access problem.",
        "T+30: The responsible team restores the approved DNS network path.",
        "T+40: Repeated lookups and application requests are validated."
      ],
      investigation: [
        "Record source IP, destination resolver IP, protocol, timestamp, and query name.",
        "Run the same dig query from affected and healthy hosts.",
        "Check ip route get and compare resolver configuration.",
        "Use an approved packet capture to determine whether queries and responses traverse the path.",
        "Review recent subnet, route, firewall, NAT, and ACL changes."
      ],
      rootCause:
        "Example hypothesis: a network policy or route change prevents DNS traffic or its return path for one subnet. Confirm using flow logs, firewall evidence, or packet capture.",
      recovery: [
        "Coordinate the targeted network correction with the network owner.",
        "Do not open broad network access to all destinations.",
        "Use an approved alternate resolver only if it supports the same required DNS view and security policy."
      ],
      validation: [
        "Affected clients receive DNS responses consistently.",
        "UDP/TCP behavior matches the intended network policy.",
        "Application resolution and connection errors return to baseline."
      ],
      followUp: [
        "Add DNS connectivity tests per network boundary.",
        "Include resolver traffic in firewall-change validation.",
        "Document source networks and approved resolver endpoints."
      ]
    }
  ],

  recoveryRunbook: [
    "1. Declare or update the incident and record severity, impact, hostname, query type, affected environment, source client, resolver, and start time.",
    "2. Determine whether the failure is global, network-specific, host-specific, container-specific, or application-specific.",
    "3. Capture resolver configuration, getent output, dig response code, answer section, TTL, timestamps, and relevant logs.",
    "4. Check whether the query reaches the configured resolver and whether a response returns.",
    "5. Compare the affected resolver's answer with an approved healthy resolver and authoritative data where appropriate.",
    "6. Distinguish NXDOMAIN, NODATA, SERVFAIL, REFUSED, timeout, stale answer, and successful resolution followed by connection failure.",
    "7. Check recent DNS, network, VPN, deployment, resolver, private-zone, and Kubernetes configuration changes.",
    "8. Form a root-cause hypothesis and require evidence that distinguishes it from plausible alternatives.",
    "9. Select the smallest approved correction: resolver reachability, authoritative record, forwarding rule, client configuration, network policy, or application behavior.",
    "10. Record the current configuration and rollback plan before changing production DNS.",
    "11. Apply one controlled change and retest from the same client/network context that originally failed.",
    "12. Verify DNS answer correctness, endpoint connectivity, TLS behavior, application health, and customer-facing metrics.",
    "13. Account for positive and negative cache TTLs. Do not declare full recovery based on one successful query.",
    "14. Monitor across affected clients and network boundaries, then document the root cause and preventive actions."
  ],

  preventionChecklist: [
    "Maintain an inventory of critical hostnames, record owners, record types, expected DNS views, and dependent services.",
    "Monitor resolver availability, query latency, response codes, and timeout rate.",
    "Monitor CoreDNS health, request volume, error rate, and upstream forwarding failures in Kubernetes.",
    "Validate critical A, AAAA, CNAME, and required service records before production releases.",
    "Document which resolver owns each DNS view and how private DNS forwarding works.",
    "Review record changes, TTLs, zone ownership, and rollback values before applying changes.",
    "Test DNS from representative hosts, containers, Kubernetes pods, private subnets, and VPN-connected clients.",
    "Validate DNS behavior after network, VPC, cluster, VPN, firewall, or resolver changes.",
    "Use fully qualified names when appropriate to avoid unexpected search-domain behavior.",
    "Avoid hardcoded IPs as a permanent workaround for DNS defects.",
    "Ensure applications distinguish resolution failures from TCP, TLS, and HTTP failures.",
    "Keep persistent or centralized logs for resolver and CoreDNS failures.",
    "Test primary/secondary resolver behavior and documented failover procedures.",
    "Review DNSSEC and delegation health for zones that use DNSSEC validation.",
    "Add DNS checks to deployment readiness and post-deployment health validation.",
    "Document cache behavior, negative TTL implications, and expected convergence time.",
    "Ensure incident runbooks specify safe evidence collection and approved change owners."
  ],

  monitoring: [
    {
      metric: "DNS query failure rate",
      investigateWhen:
        "NXDOMAIN, SERVFAIL, REFUSED, or timeout rates change materially from the expected baseline.",
      usefulLabels: ["resolver", "zone", "record_type", "environment", "response_code"],
      alertGuidance:
        "Separate expected NXDOMAIN traffic from unexpected production failures. Alert on sustained changes and critical hostname failures."
    },
    {
      metric: "DNS query latency",
      investigateWhen:
        "Lookup latency increases and correlates with application connection delays.",
      usefulLabels: ["resolver", "zone", "environment", "client_network"],
      alertGuidance:
        "Use percentiles and compare internal versus external resolution paths where supported."
    },
    {
      metric: "Resolver availability",
      investigateWhen:
        "Health checks or synthetic lookups fail against the configured resolver.",
      usefulLabels: ["resolver", "region", "subnet", "environment"],
      alertGuidance:
        "Check from multiple network locations and validate the actual required DNS view."
    },
    {
      metric: "CoreDNS readiness and restarts",
      investigateWhen:
        "CoreDNS replicas become unavailable, restart repeatedly, or lose service endpoints.",
      usefulLabels: ["cluster", "namespace", "pod", "node"],
      alertGuidance:
        "Correlate readiness with CPU/memory pressure, logs, configuration changes, and service endpoint availability."
    },
    {
      metric: "CoreDNS forwarding errors",
      investigateWhen:
        "Upstream failures or forwarding latency increase.",
      usefulLabels: ["cluster", "resolver", "response_code"],
      alertGuidance:
        "Separate cluster-local query success from external forwarding health."
    },
    {
      metric: "Critical hostname synthetic checks",
      investigateWhen:
        "A required internal or external name fails to resolve from a representative client.",
      usefulLabels: ["service", "environment", "region", "network"],
      alertGuidance:
        "Check both the expected answer and endpoint connectivity. A resolvable but incorrect IP can still be an outage."
    },
    {
      metric: "DNS record change audit",
      investigateWhen:
        "A critical record or zone configuration changes near the start of an incident.",
      usefulLabels: ["zone", "record", "owner", "change_id"],
      alertGuidance:
        "Correlate record changes with query answers and customer impact. Keep the change history and previous values accessible."
    }
  ],

  ciCdChecks: [
    "Validate critical service hostnames from the same runner network used by deployment jobs.",
    "Run getent or a controlled DNS query for required internal and external dependencies before deployment.",
    "Check required DNS records and expected DNS views in the appropriate test environment.",
    "Verify application health after deployment using the intended hostname, not only a direct IP.",
    "Separate DNS lookup, TCP connection, TLS handshake, and HTTP health checks so failures identify the correct layer.",
    "Validate CoreDNS configuration and cluster DNS behavior before applying cluster-wide DNS changes.",
    "Test DNS from a pod or container when the production workload runs in that environment.",
    "Review record name, record type, target, TTL, zone, and owner before critical DNS changes.",
    "Use controlled rollout and rollback procedures for changes to critical records or resolver settings.",
    "Do not publish private hostnames or internal DNS data in public CI logs.",
    "Verify that deployment retries are safe and that partial deployment state is checked before rerunning.",
    "Store DNS diagnostics, timestamps, release IDs, and affected environment in incident artifacts with appropriate access controls."
  ],

  incidentReportTemplate: [
    "Incident ID and severity:",
    "Affected environment, region, host, pod, and application:",
    "Affected hostname, record type, resolver, and expected answer:",
    "Customer impact and service-level impact:",
    "Incident start, detection, mitigation, and resolution timestamps:",
    "Exact DNS response code, answer, TTL, and query result:",
    "Resolver configuration and network path:",
    "Authoritative answer and recursive resolver comparison:",
    "Relevant DNS, network, VPN, deployment, or configuration changes:",
    "Evidence supporting the confirmed root cause:",
    "Contributing factors and hypotheses ruled out:",
    "Approved recovery action and rollback plan:",
    "Post-fix DNS, TCP, TLS, HTTP, and application validation:",
    "Cache-expiry expectations and monitoring period:",
    "Detection or response gaps:",
    "Corrective actions, owners, and due dates:"
  ],

  handsOnLabs: [
    {
      title: "Lab 1: Diagnose a DNS lookup failure",
      objective:
        "Distinguish system resolver behavior from a direct DNS response.",
      steps: [
        "Use a non-production Linux host and select a hostname you are authorized to query.",
        "Run getent ahosts <hostname> and record the result.",
        "Run dig <hostname> A and record the response code and answer section.",
        "Inspect /etc/resolv.conf and identify the configured resolver.",
        "Compare the result with an approved resolver if one is available.",
        "Explain which layer is most likely responsible based on the evidence."
      ],
      expectedLearning:
        "System name resolution and direct DNS queries can follow different paths."
    },
    {
      title: "Lab 2: Understand TTL and cached answers",
      objective:
        "Observe why a DNS answer may differ between a recursive resolver and authoritative data.",
      steps: [
        "Choose a public or lab-owned hostname with permission to inspect it.",
        "Run dig and record the answer and TTL.",
        "Compare recursive and authoritative responses when the zone permits it.",
        "Observe how TTL changes across repeated queries.",
        "Document why changing a record does not guarantee immediate convergence for all clients."
      ],
      expectedLearning:
        "Caching is distributed and TTL behavior matters during both rollout and rollback."
    },
    {
      title: "Lab 3: Separate DNS from HTTPS connectivity",
      objective:
        "Identify whether a failed request is caused by resolution, TCP, TLS, or HTTP.",
      steps: [
        "Use an authorized test endpoint.",
        "Run getent ahosts <hostname>.",
        "Run nc -vz <resolved-ip> 443 if permitted.",
        "Run curl -sv --connect-timeout 5 https://<hostname>/health.",
        "Classify the failure stage from the actual output.",
        "Write the next diagnostic step without disabling TLS verification."
      ],
      expectedLearning:
        "A DNS lookup and an HTTPS request test different layers of the connection."
    },
    {
      title: "Lab 4: Test Kubernetes DNS",
      objective:
        "Verify cluster-local and external name resolution from a non-production pod.",
      steps: [
        "Use an approved test namespace and diagnostic image.",
        "Inspect the pod's /etc/resolv.conf.",
        "Test kubernetes.default.svc.",
        "Test an approved external hostname.",
        "Inspect CoreDNS pod readiness, service endpoints, and logs if a lookup fails.",
        "Determine whether the issue is cluster-local DNS or upstream forwarding."
      ],
      expectedLearning:
        "Successful cluster-local DNS does not prove that external forwarding works."
    },
    {
      title: "Lab 5: Simulate a production DNS incident report",
      objective:
        "Practice evidence-based incident isolation and recovery planning.",
      steps: [
        "Use a recorded incident or a controlled lab failure.",
        "Capture the hostname, resolver, query type, response code, answer, TTL, and timestamp.",
        "List at least three plausible causes.",
        "For each cause, record evidence that supports or rejects it.",
        "Select the smallest safe correction and define a rollback plan.",
        "Define post-fix DNS and application validation checks."
      ],
      expectedLearning:
        "A useful incident report records the evidence, confirmed cause, recovery, and prevention rather than just the error message."
    }
  ],

  interviewQuestions: [
    {
      question: "What happens when a Linux application resolves a hostname?",
      answer:
        "The application uses its resolver implementation, which may consult runtime caches and the operating system name-service path. Depending on configuration, resolution can involve /etc/hosts, NSS, a local stub resolver, recursive DNS, and authoritative nameservers. The exact path depends on the application and system configuration."
    },
    {
      question: "What is the difference between NXDOMAIN and SERVFAIL?",
      answer:
        "NXDOMAIN indicates that the queried name does not exist according to the responding DNS system. SERVFAIL indicates that the server could not complete the resolution. SERVFAIL can be caused by upstream failures, delegation problems, DNSSEC validation, or resolver issues."
    },
    {
      question: "What does a DNS timeout mean?",
      answer:
        "A usable DNS response did not arrive within the client's wait period. It does not prove the DNS server itself is down. Investigate routing, firewall policy, packet loss, UDP/TCP behavior, server health, and the response path."
    },
    {
      question: "Why can dig work while an application still fails to resolve a hostname?",
      answer:
        "The application may use another resolver path, a runtime cache, a proxy, a different network namespace, or different search-domain behavior. Reproduce the lookup from the actual application environment and compare the exact hostname."
    },
    {
      question: "What is the purpose of /etc/resolv.conf?",
      answer:
        "It commonly contains nameserver addresses, search domains, and resolver options. It may be generated or managed by systemd-resolved, NetworkManager, DHCP, a VPN, a container runtime, or Kubernetes, so identify its owner before editing it."
    },
    {
      question: "What is a DNS TTL?",
      answer:
        "TTL indicates how long a DNS record can be cached by a resolver. It affects how quickly record changes become visible, but applications and other layers may have additional caching behavior."
    },
    {
      question: "Why might a DNS change not appear immediately?",
      answer:
        "Recursive resolvers may retain cached answers until their TTL expires. Negative answers can also be cached. Different clients may use different resolvers or caches, so compare authoritative data, recursive answers, and application behavior."
    },
    {
      question: "How do you troubleshoot DNS in Kubernetes?",
      answer:
        "Inspect the affected pod's resolver configuration, test cluster-local and external names, check CoreDNS readiness and service endpoints, read CoreDNS logs, and investigate upstream forwarding and network policy. Distinguish pod-specific issues from cluster-wide failures."
    },
    {
      question: "Why can a hostname resolve correctly but the application still fail?",
      answer:
        "DNS only provides an answer. The resolved endpoint may be unreachable, the port may be closed, TLS may fail, a proxy may be misconfigured, or the application may return an error. Test DNS, TCP, TLS, and HTTP as separate stages."
    },
    {
      question: "What is split-horizon DNS?",
      answer:
        "Split-horizon DNS returns different answers depending on the client's network or DNS view. It is commonly used to return private addresses internally and public addresses externally. Troubleshooting must use the intended client network and resolver."
    },
    {
      question: "How would you investigate a production deployment that suddenly cannot resolve its dependency hostname?",
      answer:
        "Confirm the failing runner and exact hostname, check whether changes were partially applied, test getent and dig from the runner context, inspect resolver configuration and routing, compare with a healthy runner, identify the failed layer, apply an approved targeted fix, then validate dependency access and rerun safely."
    },
    {
      question: "How do you determine whether UDP or TCP port 53 is blocked?",
      answer:
        "Compare dig queries using UDP and TCP against the approved resolver. Use route inspection and an authorized packet capture to see whether requests leave and responses return. Correlate with firewall, ACL, and resolver logs."
    },
    {
      question: "What can cause SERVFAIL when DNSSEC is enabled?",
      answer:
        "Possible causes include invalid or expired signatures, a broken DS/DNSKEY chain, delegation problems, upstream reachability, or resolver faults. Confirm with authoritative data, DNSSEC-aware queries, and resolver logs before changing security settings."
    },
    {
      question: "What is the difference between A and AAAA records?",
      answer:
        "An A record provides an IPv4 address, while an AAAA record provides an IPv6 address. Test each address family independently and verify that published addresses have working routes and service listeners."
    },
    {
      question: "How do you prove the root cause of a DNS incident?",
      answer:
        "Build a timeline, record the exact query and resolver, compare affected and healthy clients, inspect authoritative and recursive answers, correlate changes, and use a controlled test to confirm the suspected cause. Do not label a hypothesis as confirmed without supporting evidence."
    }
  ],

  references: [
    "BIND dig manual: https://bind9.readthedocs.io/en/latest/manpages.html",
    "Linux getent manual: https://man7.org/linux/man-pages/man1/getent.1.html",
    "Linux resolver configuration: https://man7.org/linux/man-pages/man5/resolv.conf.5.html",
    "Linux NSS configuration: https://man7.org/linux/man-pages/man5/nsswitch.conf.5.html",
    "systemd-resolved documentation: https://www.freedesktop.org/software/systemd/man/latest/systemd-resolved.service.html",
    "Kubernetes DNS for Services and Pods: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
    "CoreDNS documentation: https://coredns.io/manual/toc/",
    "Docker networking: https://docs.docker.com/engine/network/",
    "RFC 1034 - Domain Names: Concepts and Facilities: https://www.rfc-editor.org/rfc/rfc1034",
    "RFC 1035 - Domain Names: Implementation and Specification: https://www.rfc-editor.org/rfc/rfc1035",
    "RFC 2308 - Negative Caching of DNS Queries: https://www.rfc-editor.org/rfc/rfc2308",
    "RFC 4033 - DNS Security Introduction and Requirements: https://www.rfc-editor.org/rfc/rfc4033"
  ]
};
