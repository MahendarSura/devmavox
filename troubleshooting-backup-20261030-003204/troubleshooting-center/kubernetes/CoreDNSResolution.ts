// app/troubleshooting-center/kubernetes/CoreDNSResolution.ts

export interface DNSDiagnosticStep {
  id: string;
  title: string;
  objective: string;
  commands: string[];
  expectedEvidence: string[];
  decisionPoints: string[];
  safetyNotes: string[];
}

export interface DNSRootCause {
  id: string;
  title: string;
  symptoms: string[];
  evidence: string[];
  diagnosis: string[];
  remediation: string[];
  verification: string[];
  prevention: string[];
}

export interface DNSIncidentScenario {
  id: string;
  title: string;
  severity: string;
  impact: string[];
  timeline: string[];
  investigation: string[];
  recovery: string[];
  successCriteria: string[];
}

export interface DNSInterviewQuestion {
  question: string;
  answer: string;
  productionExample: string;
}

export interface DNSLab {
  title: string;
  objective: string;
  steps: string[];
  expectedResult: string;
  cleanup: string[];
}

export interface CoreDNSResolutionGuide {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  summary: string;
  learningObjectives: string[];
  productionPrinciples: string[];
  failureTypes: {
    name: string;
    meaning: string;
    commonCauses: string[];
    nextChecks: string[];
  }[];
  severityMatrix: {
    severity: string;
    indicators: string[];
    response: string;
  }[];
  diagnosticWorkflow: DNSDiagnosticStep[];
  rootCauses: DNSRootCause[];
  incidentScenarios: DNSIncidentScenario[];
  commandReference: {
    purpose: string;
    command: string;
    interpretation: string;
  }[];
  productionChecklist: string[];
  prevention: string[];
  monitoring: string[];
  incidentReportTemplate: string[];
  labs: DNSLab[];
  interviewQuestions: DNSInterviewQuestion[];
  commonMistakes: string[];
  references: {
    title: string;
    url: string;
  }[];
}

export const coreDNSResolutionGuide: CoreDNSResolutionGuide = {
  title: "Kubernetes CoreDNS Resolution — Production Troubleshooting Runbook",
  slug: "coredns-resolution",
  category: "Kubernetes",
  difficulty: "Advanced",
  estimatedTime: "90–150 minutes",

  summary: `
This production runbook covers Kubernetes DNS failures from initial alert
through root-cause isolation, recovery and prevention.

It distinguishes DNS lookup failures from Service routing, application
connectivity, external DNS, network policy, node networking and upstream
resolver problems.

The investigation starts with the affected workload and exact query,
compares results from affected and healthy Pods, inspects resolv.conf,
CoreDNS health and logs, validates the kube-dns Service and EndpointSlices,
and then follows the evidence to the relevant layer.

Do not restart CoreDNS or change cluster-wide DNS settings simply because
an application reports a name-resolution error.
`,

  learningObjectives: [
    "Explain CoreDNS, kube-dns Service discovery and Pod DNS configuration.",
    "Distinguish NXDOMAIN, SERVFAIL, REFUSED, timeout and connection-refused errors.",
    "Troubleshoot internal Service names, namespaces and fully qualified domain names.",
    "Diagnose external DNS failures and upstream resolver problems.",
    "Inspect CoreDNS Pods, logs, Corefile configuration and EndpointSlices.",
    "Investigate UDP/TCP port 53 connectivity and NetworkPolicy restrictions.",
    "Understand ndots, search domains, retries and DNS query amplification.",
    "Investigate intermittent failures, node-specific failures and overloaded DNS Pods.",
    "Perform controlled recovery without creating a cluster-wide DNS outage.",
    "Build DNS monitoring, CI validation, incident reports and prevention checks."
  ],

  productionPrinciples: [
    "Confirm cluster context, namespace, affected application and exact hostname first.",
    "Record the first failure timestamp and correlate it with releases, node changes and DNS configuration changes.",
    "Test the same query from an affected Pod and a healthy Pod before assuming a cluster-wide failure.",
    "Separate name resolution from connection establishment: DNS success does not prove the destination is reachable.",
    "Distinguish NXDOMAIN from timeout and SERVFAIL because they indicate different failure classes.",
    "Inspect the Pod's actual /etc/resolv.conf instead of assuming cluster defaults.",
    "Use read-only diagnostics before changing CoreDNS or NetworkPolicy.",
    "Do not delete all CoreDNS Pods or replace the Corefile without a rollback plan.",
    "Make configuration changes through the cluster's actual source of truth, including Helm or GitOps when applicable.",
    "Verify both internal and external queries after recovery, along with customer-facing transactions."
  ],

  failureTypes: [
    {
      name: "NXDOMAIN",
      meaning: "The queried name does not exist according to the responding DNS server.",
      commonCauses: [
        "Incorrect Service name or namespace.",
        "Missing Service or headless Service record.",
        "Wrong search domain or incomplete hostname.",
        "A stale or incorrect application configuration."
      ],
      nextChecks: [
        "Check the hostname spelling and namespace.",
        "Query the full Service FQDN.",
        "Verify the Service exists.",
        "Check whether the application expects an external hostname."
      ]
    },
    {
      name: "SERVFAIL",
      meaning: "The DNS server could not successfully complete the query.",
      commonCauses: [
        "CoreDNS cannot resolve or forward the query upstream.",
        "Upstream DNS server failure.",
        "DNSSEC or upstream resolution problems.",
        "CoreDNS configuration or plugin errors."
      ],
      nextChecks: [
        "Inspect CoreDNS logs.",
        "Compare internal and external queries.",
        "Inspect the Corefile and upstream resolver health.",
        "Test the upstream DNS server from an approved diagnostic location."
      ]
    },
    {
      name: "DNS timeout",
      meaning: "No usable response arrived before the client's timeout.",
      commonCauses: [
        "NetworkPolicy or firewall blocking UDP/TCP 53.",
        "CoreDNS overload or unreachable endpoints.",
        "Node networking or packet loss.",
        "Upstream DNS server latency."
      ],
      nextChecks: [
        "Compare affected and healthy Pods.",
        "Inspect CoreDNS endpoints and resource metrics.",
        "Test UDP and TCP DNS behavior.",
        "Check node and network policy evidence."
      ]
    },
    {
      name: "Connection refused",
      meaning: "The attempted connection was actively refused.",
      commonCauses: [
        "Wrong DNS server IP or port.",
        "DNS process not listening on the expected endpoint.",
        "A local proxy or network component rejecting the connection."
      ],
      nextChecks: [
        "Inspect nameserver entries.",
        "Verify the kube-dns Service and endpoints.",
        "Check CoreDNS Pod health and listening configuration.",
        "Compare the behavior from another Pod."
      ]
    },
    {
      name: "Intermittent resolution",
      meaning: "Some DNS queries succeed while others fail or time out.",
      commonCauses: [
        "One unhealthy CoreDNS replica.",
        "Uneven node networking or NetworkPolicy behavior.",
        "High query volume or CPU saturation.",
        "Packet loss, upstream instability or connection tracking pressure."
      ],
      nextChecks: [
        "Compare all CoreDNS replicas and their nodes.",
        "Inspect per-replica logs and metrics.",
        "Repeat controlled queries and record latency.",
        "Correlate failures with load and deployment timestamps."
      ]
    }
  ],

  severityMatrix: [
    {
      severity: "SEV-1 / Critical",
      indicators: [
        "Most cluster workloads cannot resolve essential internal service names.",
        "CoreDNS has no healthy endpoints.",
        "Critical production transactions fail across multiple services."
      ],
      response:
        "Activate the incident process, identify the common failure layer, preserve evidence, coordinate platform/network teams and use the approved rollback or recovery procedure."
    },
    {
      severity: "SEV-2 / High",
      indicators: [
        "Several production namespaces experience intermittent DNS failures.",
        "External resolution is broadly broken.",
        "Service availability or latency is materially affected."
      ],
      response:
        "Compare internal versus external lookups, inspect CoreDNS health and upstream forwarding, and assess the remaining DNS capacity."
    },
    {
      severity: "SEV-3 / Moderate",
      indicators: [
        "One namespace or node experiences DNS failures.",
        "Only one application or hostname fails to resolve."
      ],
      response:
        "Compare the affected workload with a healthy control, inspect namespace policy and application configuration, and avoid cluster-wide changes until scope is confirmed."
    },
    {
      severity: "SEV-4 / Low",
      indicators: [
        "A development workload uses an incorrect hostname.",
        "A reproducible configuration issue has no customer impact."
      ],
      response:
        "Correct the hostname or configuration, validate it in CI and document the root cause."
    }
  ],

  diagnosticWorkflow: [
    {
      id: "dns-step-01",
      title: "Establish incident scope and confirm the cluster",
      objective:
        "Identify affected services, namespaces, nodes and query types before changing DNS infrastructure.",
      commands: [
        "kubectl config current-context",
        "kubectl get namespaces",
        "kubectl get pods -A -o wide",
        "kubectl -n <namespace> get deployment,service,endpointslice",
        "kubectl -n <namespace> get events --sort-by=.metadata.creationTimestamp"
      ],
      expectedEvidence: [
        "The current context identifies the intended cluster.",
        "The affected workload and its node placement are known.",
        "The hostname, timestamp and exact application error are recorded.",
        "The failure scope is identified: one Pod, one namespace, one node or the entire cluster."
      ],
      decisionPoints: [
        "If only one hostname fails, validate that record and application configuration first.",
        "If only one Pod fails, compare its resolver configuration and node with a healthy Pod.",
        "If multiple unrelated applications fail, investigate shared DNS infrastructure.",
        "If only external names fail, prioritize upstream forwarding and egress.",
        "If internal and external names both fail, inspect resolver reachability and CoreDNS health."
      ],
      safetyNotes: [
        "Do not change the Corefile until the scope is established.",
        "Do not paste secrets or sensitive application environment variables into incident tickets.",
        "Record recent releases, NetworkPolicy changes and cluster upgrades."
      ]
    },
    {
      id: "dns-step-02",
      title: "Reproduce the exact DNS query from the affected Pod",
      objective:
        "Confirm whether the failure is reproducible and capture the exact resolver error.",
      commands: [
        "kubectl -n <namespace> exec <pod> -c <container> -- cat /etc/resolv.conf",
        "kubectl -n <namespace> exec <pod> -c <container> -- nslookup <service>.<namespace>.svc.cluster.local",
        "kubectl -n <namespace> exec <pod> -c <container> -- nslookup kubernetes.default.svc.cluster.local",
        "kubectl -n <namespace> exec <pod> -c <container> -- nslookup example.com"
      ],
      expectedEvidence: [
        "The resolver IP, search domains and ndots setting are visible where the image includes a compatible resolver tool.",
        "The internal Kubernetes Service lookup provides a baseline for cluster DNS.",
        "The external hostname lookup tests a different path involving upstream DNS.",
        "The output shows success, NXDOMAIN, SERVFAIL, timeout or another specific error."
      ],
      decisionPoints: [
        "If nslookup is missing, use an approved diagnostic image or ephemeral debug container.",
        "If the Kubernetes Service lookup fails, inspect the resolver path and internal DNS.",
        "If internal names work but external names fail, inspect CoreDNS forwarding and upstream access.",
        "If all DNS queries work but application connections fail, move to service routing, TLS, firewall and application troubleshooting.",
        "If only one hostname fails, check the record, spelling, namespace and DNS search behavior."
      ],
      safetyNotes: [
        "A diagnostic container can have a different image, security context or network behavior from the application.",
        "Use the exact hostname and query type involved in the incident.",
        "Repeated query loops can amplify an existing DNS overload problem."
      ]
    },
    {
      id: "dns-step-03",
      title: "Inspect Pod resolver configuration",
      objective:
        "Determine which DNS server and search domains the workload actually uses.",
      commands: [
        "kubectl -n <namespace> exec <pod> -c <container> -- cat /etc/resolv.conf",
        "kubectl -n <namespace> get pod <pod> -o yaml",
        "kubectl -n <namespace> get pod <pod> -o jsonpath='{.spec.dnsPolicy}{\"\\n\"}{.spec.dnsConfig}{\"\\n\"}{.spec.hostNetwork}{\"\\n\"}'"
      ],
      expectedEvidence: [
        "The nameserver typically points to the cluster DNS Service for Pods using the ClusterFirst policy.",
        "Search domains commonly include the Pod namespace and cluster service domains.",
        "The Pod spec shows dnsPolicy, optional dnsConfig and hostNetwork settings."
      ],
      decisionPoints: [
        "If the nameserver is unexpected, inspect dnsPolicy, hostNetwork and dnsConfig.",
        "If search domains are missing or wrong, compare the workload with a known-good Pod.",
        "If ndots is high and short names cause excessive queries, test the fully qualified hostname.",
        "If hostNetwork is enabled, verify whether ClusterFirstWithHostNet or another intended DNS policy is configured."
      ],
      safetyNotes: [
        "Do not edit /etc/resolv.conf inside a running container as a permanent fix.",
        "Use the workload manifest or deployment configuration as the durable source of truth.",
        "Some operating systems and container runtimes impose resolver configuration limits."
      ]
    },
    {
      id: "dns-step-04",
      title: "Verify the kube-dns Service and DNS endpoints",
      objective:
        "Check whether the cluster DNS Service has the expected IP and healthy backend endpoints.",
      commands: [
        "kubectl -n kube-system get svc kube-dns -o wide",
        "kubectl -n kube-system describe svc kube-dns",
        "kubectl -n kube-system get endpoints kube-dns -o yaml",
        "kubectl -n kube-system get endpointslice -l kubernetes.io/service-name=kube-dns -o yaml",
        "kubectl -n kube-system get pods -o wide"
      ],
      expectedEvidence: [
        "The kube-dns Service exists and exposes the expected DNS ports.",
        "EndpointSlices identify the CoreDNS Pod addresses and endpoint conditions.",
        "CoreDNS Pods are scheduled and their readiness states are visible."
      ],
      decisionPoints: [
        "If the Service is missing, inspect the cluster's DNS installation and management method.",
        "If endpoints are empty, inspect Pod readiness, Service selectors and CoreDNS deployment status.",
        "If one backend is unhealthy, compare it with healthy CoreDNS replicas.",
        "If all backends are healthy but queries time out, investigate networking, policy and upstream dependencies."
      ],
      safetyNotes: [
        "The Service is commonly named kube-dns even when CoreDNS provides the DNS implementation.",
        "Do not manually replace the cluster DNS Service IP without understanding cluster networking and kubelet configuration.",
        "Do not assume every cluster uses the same DNS installation method."
      ]
    },
    {
      id: "dns-step-05",
      title: "Inspect CoreDNS health, logs and configuration",
      objective:
        "Find plugin errors, forwarding failures, crashes, resource pressure or configuration regressions.",
      commands: [
        "kubectl -n kube-system get deployment,pods -o wide",
        "kubectl -n kube-system describe deployment coredns",
        "kubectl -n kube-system logs deployment/coredns --all-pods=true --since=30m",
        "kubectl -n kube-system get configmap coredns -o yaml",
        "kubectl -n kube-system top pods --containers"
      ],
      expectedEvidence: [
        "CoreDNS replicas are available and not repeatedly restarting.",
        "Logs may identify upstream timeouts, plugin errors or malformed configuration.",
        "The Corefile shows the active DNS zones and forwarding behavior.",
        "Resource metrics can reveal CPU or memory pressure when metrics are available."
      ],
      decisionPoints: [
        "If the deployment name differs, discover the actual DNS deployment rather than assuming coredns.",
        "If configuration changed recently, compare the current Corefile with the last known good version.",
        "If logs show upstream timeouts, investigate upstream reachability before editing internal service discovery.",
        "If CoreDNS is overloaded, inspect query rate, replicas, resource requests and limits, and expensive query patterns.",
        "If CoreDNS is healthy but endpoints are unreachable from a particular node, investigate the network path."
      ],
      safetyNotes: [
        "The CoreDNS ConfigMap may be managed by a platform installer, Helm or another controller.",
        "Validate Corefile syntax and behavior before rollout.",
        "Do not delete every DNS Pod or replace the entire Corefile as a first response.",
        "Protect logs and configuration outputs that may expose internal topology."
      ]
    },
    {
      id: "dns-step-06",
      title: "Separate internal DNS from external DNS",
      objective:
        "Determine whether the failure affects Kubernetes service discovery, upstream forwarding or both.",
      commands: [
        "kubectl -n <namespace> exec <pod> -- nslookup kubernetes.default.svc.cluster.local",
        "kubectl -n <namespace> exec <pod> -- nslookup <service>.<namespace>.svc.cluster.local",
        "kubectl -n <namespace> exec <pod> -- nslookup example.com",
        "kubectl -n kube-system logs deployment/coredns --all-pods=true --since=15m"
      ],
      expectedEvidence: [
        "Internal Service lookups test cluster DNS records.",
        "External lookups test the configured upstream forwarding path.",
        "CoreDNS logs and metrics help distinguish record lookup failures from upstream failures."
      ],
      decisionPoints: [
        "If internal records work and external records fail, inspect the forward plugin, upstream resolver and DNS egress.",
        "If both fail, inspect the Pod resolver, kube-dns Service, endpoints and cluster network.",
        "If only a specific external domain fails, compare other domains and inspect authoritative DNS, forwarding and policy behavior.",
        "If external DNS works from a node but fails from Pods, inspect Pod network policy and the cluster DNS path."
      ],
      safetyNotes: [
        "Do not assume the node resolver and Pod resolver use the same DNS path.",
        "An external DNS failure may originate outside Kubernetes.",
        "Use approved tools and access controls when testing corporate or private DNS servers."
      ]
    },
    {
      id: "dns-step-07",
      title: "Investigate NetworkPolicy, firewalls and UDP/TCP port 53",
      objective:
        "Identify network restrictions between application Pods and DNS endpoints.",
      commands: [
        "kubectl get networkpolicy -A",
        "kubectl -n <namespace> describe networkpolicy",
        "kubectl -n kube-system get pods -o wide",
        "kubectl -n kube-system get svc kube-dns -o yaml",
        "kubectl get nodes -o wide"
      ],
      expectedEvidence: [
        "NetworkPolicy rules reveal whether egress to the cluster DNS service is allowed.",
        "The affected Pod and CoreDNS endpoints identify the network path.",
        "Firewall, CNI and node-level evidence may explain why packets are dropped."
      ],
      decisionPoints: [
        "If the namespace has default-deny egress, verify that the intended DNS traffic is explicitly allowed.",
        "If UDP queries fail but TCP succeeds, investigate UDP-specific restrictions, fragmentation or packet loss.",
        "If large responses fail, investigate UDP truncation and TCP fallback behavior.",
        "If only one node is affected, compare CNI state, routes, firewall rules and conntrack pressure with a healthy node."
      ],
      safetyNotes: [
        "Do not remove NetworkPolicies to test whether DNS starts working.",
        "Use a reviewed, narrowly scoped policy change if DNS egress is genuinely blocked.",
        "DNS normally uses UDP and may use TCP on port 53; permitting only one transport can break some queries.",
        "Cluster networking and node firewall checks may require platform-team access."
      ]
    },
    {
      id: "dns-step-08",
      title: "Investigate ndots, search domains and DNS query amplification",
      objective:
        "Determine whether short names generate excessive queries or unexpected search-path lookups.",
      commands: [
        "kubectl -n <namespace> exec <pod> -- cat /etc/resolv.conf",
        "kubectl -n <namespace> exec <pod> -- nslookup <service>.<namespace>.svc.cluster.local",
        "kubectl -n <namespace> exec <pod> -- nslookup <external-hostname>",
        "kubectl -n kube-system logs deployment/coredns --all-pods=true --since=15m"
      ],
      expectedEvidence: [
        "The resolver configuration shows ndots and search domains.",
        "Fully qualified names can be compared with short-name behavior.",
        "CoreDNS metrics or query logs, if enabled, can reveal unusually high query rates."
      ],
      decisionPoints: [
        "If a fully qualified name works but a short name fails, inspect the namespace and search suffix.",
        "If application traffic generates many search-suffix queries, evaluate the application's hostname format and resolver behavior.",
        "If query volume is high, inspect retry loops, client caching and application DNS behavior.",
        "Consider per-Pod dnsConfig changes only after measuring their effect and testing compatibility."
      ],
      safetyNotes: [
        "Search-domain behavior depends on the resolver implementation and ndots setting.",
        "Changing ndots globally can break applications that depend on existing search behavior.",
        "Do not enable verbose DNS query logging indiscriminately in a high-volume production cluster."
      ]
    },
    {
      id: "dns-step-09",
      title: "Investigate CoreDNS overload and intermittent failures",
      objective:
        "Find whether query volume, replica capacity or upstream latency is causing timeouts.",
      commands: [
        "kubectl -n kube-system top pods --containers",
        "kubectl -n kube-system get deployment coredns -o yaml",
        "kubectl -n kube-system get pods -o wide",
        "kubectl -n kube-system get events --sort-by=.metadata.creationTimestamp",
        "kubectl -n kube-system logs deployment/coredns --all-pods=true --since=30m"
      ],
      expectedEvidence: [
        "CoreDNS replica count, readiness and placement are visible.",
        "CPU and memory utilization can be compared with configured requests and limits.",
        "Logs, metrics and timestamps reveal whether failures correlate with query load or upstream delays."
      ],
      decisionPoints: [
        "If all replicas are overloaded, assess query volume, cache behavior and capacity before scaling.",
        "If only one replica fails, investigate that replica's node and recent lifecycle events.",
        "If CoreDNS is waiting on upstream DNS, fix the upstream path rather than merely adding replicas.",
        "If retries are amplifying load, address the client or application retry behavior."
      ],
      safetyNotes: [
        "Additional replicas do not automatically fix upstream failures or network policy problems.",
        "Scaling changes require capacity checks and should follow the platform's ownership model.",
        "Avoid simultaneous changes to replica count, Corefile and NetworkPolicy during the same incident."
      ]
    },
    {
      id: "dns-step-10",
      title: "Apply a targeted fix and verify recovery",
      objective:
        "Restore resolution while minimizing blast radius and confirming the actual customer impact is resolved.",
      commands: [
        "kubectl diff -f <reviewed-dns-change.yaml>",
        "kubectl apply --dry-run=server -f <reviewed-dns-change.yaml>",
        "kubectl apply -f <reviewed-dns-change.yaml>",
        "kubectl -n kube-system rollout status deployment/coredns --timeout=5m",
        "kubectl -n kube-system get pods -o wide",
        "kubectl -n kube-system get endpointslice -l kubernetes.io/service-name=kube-dns -o yaml",
        "kubectl -n <namespace> exec <pod> -- nslookup kubernetes.default.svc.cluster.local",
        "kubectl -n <namespace> exec <pod> -- nslookup example.com"
      ],
      expectedEvidence: [
        "The intended configuration is applied through the correct management path.",
        "CoreDNS Pods remain available and endpoint conditions are healthy.",
        "Internal and external lookups work from affected workloads.",
        "Customer-facing application requests recover and DNS error rates return to baseline."
      ],
      decisionPoints: [
        "If the rollout fails, stop further changes and inspect the new events and logs.",
        "If DNS resolves but connections fail, investigate routing, Service ports, firewall, TLS and application health.",
        "If the fix has a negative effect, use the approved rollback procedure.",
        "If resolution recovers only on some nodes, continue node-specific networking investigation."
      ],
      safetyNotes: [
        "Use the correct source of truth for the cluster's DNS deployment.",
        "Do not apply a guessed Corefile to a production cluster.",
        "Server-side dry-run validates the API request but does not prove runtime DNS behavior.",
        "Recovery requires both DNS checks and application-level verification."
      ]
    }
  ],

  rootCauses: [
    {
      id: "wrong-service-name",
      title: "Wrong Service name or namespace",
      symptoms: [
        "A particular internal name returns NXDOMAIN.",
        "Other Kubernetes Service names resolve successfully."
      ],
      evidence: [
        "The target Service does not exist in the expected namespace.",
        "The application uses a Service name from a different environment.",
        "The fully qualified DNS name differs from the configured hostname."
      ],
      diagnosis: [
        "Check kubectl get svc in the target namespace.",
        "Query the fully qualified Service name.",
        "Inspect application environment variables and ConfigMaps.",
        "Compare the intended environment and actual cluster context."
      ],
      remediation: [
        "Correct the Service name or namespace in the application configuration.",
        "Validate the hostname in deployment CI.",
        "Deploy through the approved release process."
      ],
      verification: [
        "The exact fully qualified Service name resolves.",
        "The application establishes a connection to the intended destination.",
        "Customer-facing requests succeed."
      ],
      prevention: [
        "Use environment-specific configuration validation.",
        "Add deployment smoke tests for required Service names.",
        "Avoid hard-coded hostnames across environments."
      ]
    },
    {
      id: "empty-dns-endpoints",
      title: "CoreDNS Service has no healthy endpoints",
      symptoms: [
        "DNS queries time out or fail across many workloads.",
        "The kube-dns Service exists but DNS backend endpoints are absent or unhealthy."
      ],
      evidence: [
        "EndpointSlice output has no usable backend addresses.",
        "CoreDNS Pods are Pending, NotReady or repeatedly restarting.",
        "The Service selector does not match the intended Pod labels."
      ],
      diagnosis: [
        "Inspect CoreDNS Deployment, ReplicaSets and Pods.",
        "Describe failing Pods and inspect their events.",
        "Check Service selectors and EndpointSlice conditions.",
        "Investigate image pull, scheduling, resource and configuration errors."
      ],
      remediation: [
        "Fix the actual scheduling, readiness, selector or configuration issue.",
        "Restore the intended number of healthy DNS replicas.",
        "Use the approved platform deployment process."
      ],
      verification: [
        "EndpointSlices contain usable DNS backends.",
        "CoreDNS replicas become ready.",
        "Queries succeed from multiple namespaces and nodes."
      ],
      prevention: [
        "Alert on unavailable CoreDNS replicas and missing endpoints.",
        "Validate DNS deployment health after cluster upgrades.",
        "Keep DNS component changes under version control."
      ]
    },
    {
      id: "upstream-failure",
      title: "CoreDNS cannot reach its upstream DNS server",
      symptoms: [
        "Internal Service records resolve but external hostnames fail.",
        "External lookups return SERVFAIL or time out."
      ],
      evidence: [
        "CoreDNS logs show forwarding timeouts or upstream errors.",
        "Upstream DNS servers are unreachable or slow.",
        "Network egress policy blocks DNS traffic."
      ],
      diagnosis: [
        "Inspect the Corefile forward configuration.",
        "Identify the configured upstream resolver.",
        "Check upstream health and reachability from the relevant network context.",
        "Inspect firewall, egress policy and node network changes."
      ],
      remediation: [
        "Restore upstream resolver availability or the permitted network path.",
        "Correct the forward configuration only after validating the intended resolver.",
        "Coordinate with the network or infrastructure team if the resolver is externally managed."
      ],
      verification: [
        "External queries succeed consistently.",
        "CoreDNS forwarding errors decline.",
        "Internal Service resolution remains healthy."
      ],
      prevention: [
        "Monitor upstream latency and failure rate.",
        "Document upstream resolver ownership and dependencies.",
        "Test external DNS after network and cluster upgrades."
      ]
    },
    {
      id: "network-policy",
      title: "NetworkPolicy blocks DNS egress",
      symptoms: [
        "Affected Pods time out on DNS queries.",
        "Workloads without the restrictive policy resolve names successfully."
      ],
      evidence: [
        "A default-deny egress policy exists.",
        "The policy does not permit DNS traffic to the relevant DNS endpoints.",
        "The failure began after a policy rollout."
      ],
      diagnosis: [
        "List policies in the affected namespace.",
        "Inspect pod selectors and egress rules.",
        "Confirm the actual DNS destination and both UDP and TCP requirements.",
        "Compare policy behavior with a healthy namespace."
      ],
      remediation: [
        "Add a reviewed, narrowly scoped DNS egress rule consistent with the cluster's network architecture.",
        "Test the policy in a non-production environment first when possible.",
        "Deploy through the normal policy management process."
      ],
      verification: [
        "Affected workloads resolve internal and external names as intended.",
        "The restrictive security posture remains in place.",
        "No unrelated egress access has been granted."
      ],
      prevention: [
        "Include DNS requirements in NetworkPolicy templates.",
        "Add policy validation and DNS tests to CI.",
        "Test default-deny scenarios before production rollout."
      ]
    },
    {
      id: "resolver-config",
      title: "Incorrect Pod DNS policy or resolver configuration",
      symptoms: [
        "One workload resolves names differently from other Pods.",
        "The nameserver or search domains are unexpected."
      ],
      evidence: [
        "The Pod uses an unintended dnsPolicy.",
        "A custom dnsConfig overrides expected search or resolver settings.",
        "hostNetwork is enabled without the intended DNS policy."
      ],
      diagnosis: [
        "Inspect /etc/resolv.conf inside the affected container.",
        "Inspect dnsPolicy, dnsConfig and hostNetwork in the Pod spec.",
        "Compare with a healthy workload using the same cluster setup.",
        "Review recent chart or manifest changes."
      ],
      remediation: [
        "Correct the Pod DNS settings in the source manifest.",
        "Validate the settings on a disposable test workload.",
        "Roll out the corrected configuration through the normal deployment path."
      ],
      verification: [
        "The new Pod receives the expected nameserver and search configuration.",
        "Internal and required external names resolve.",
        "The workload connects to its intended services."
      ],
      prevention: [
        "Validate DNS settings in reusable workload templates.",
        "Document intentional hostNetwork exceptions.",
        "Test resolver behavior after chart changes."
      ]
    },
    {
      id: "dns-overload",
      title: "High query volume overwhelms CoreDNS",
      symptoms: [
        "DNS latency and timeout rates rise during traffic spikes.",
        "CoreDNS CPU utilization increases.",
        "Many workloads experience intermittent resolution failures."
      ],
      evidence: [
        "Query volume rises sharply.",
        "CoreDNS resource utilization or latency increases.",
        "Applications repeatedly query the same names or retry aggressively."
      ],
      diagnosis: [
        "Inspect CoreDNS metrics and resource usage.",
        "Compare query volume with normal baseline.",
        "Investigate ndots, search domains, client retries and caching.",
        "Check whether upstream latency is the real bottleneck."
      ],
      remediation: [
        "Reduce unnecessary queries and retry amplification.",
        "Review cache behavior and CoreDNS capacity using platform guidance.",
        "Scale replicas only after evaluating node capacity and upstream limitations.",
        "Use measured resource changes and controlled rollout."
      ],
      verification: [
        "DNS latency and failure rate return to baseline.",
        "CoreDNS utilization stabilizes.",
        "Application request success improves."
      ],
      prevention: [
        "Alert on DNS query rate, latency and errors.",
        "Review resolver behavior in high-volume applications.",
        "Load-test DNS-dependent workloads before major traffic increases."
      ]
    },
    {
      id: "node-specific",
      title: "DNS failures occur only on one node",
      symptoms: [
        "Pods on one node fail while similar workloads on other nodes succeed.",
        "The incident affects multiple namespaces but shares node placement."
      ],
      evidence: [
        "Failures correlate with one node.",
        "Node conditions or network components show errors.",
        "The same query succeeds from a different node."
      ],
      diagnosis: [
        "Compare affected and healthy Pod placement.",
        "Inspect node readiness and pressure.",
        "Check CNI, routing, firewall and connection tracking evidence.",
        "Investigate kubelet and node runtime logs through approved access."
      ],
      remediation: [
        "Escalate node-level faults to the platform team.",
        "Cordon or drain only under the approved procedure and after capacity checks.",
        "Repair the node networking or runtime issue using the established operational process."
      ],
      verification: [
        "DNS queries succeed from workloads on the affected node.",
        "Node conditions recover.",
        "No new DNS failure pattern appears elsewhere."
      ],
      prevention: [
        "Monitor DNS failures by node.",
        "Test cluster networking during staged upgrades.",
        "Maintain node troubleshooting runbooks."
      ]
    },
    {
      id: "bad-corefile",
      title: "CoreDNS configuration regression",
      symptoms: [
        "DNS failures start immediately after a Corefile or chart update.",
        "CoreDNS logs report plugin, parsing or forwarding errors."
      ],
      evidence: [
        "The current Corefile differs from the last known good version.",
        "CoreDNS Pods restart or fail readiness after the change.",
        "The change altered zones, plugins or upstream forwarding."
      ],
      diagnosis: [
        "Inspect the deployed ConfigMap and CoreDNS logs.",
        "Compare the configuration with version control.",
        "Check the cluster's deployment mechanism and rendered manifests.",
        "Validate syntax and expected query behavior in a test environment."
      ],
      remediation: [
        "Roll back the invalid configuration or apply a reviewed correction.",
        "Use the supported deployment mechanism.",
        "Roll out in a controlled manner and monitor replica health."
      ],
      verification: [
        "CoreDNS Pods become ready.",
        "Internal and external test queries succeed.",
        "DNS errors and restart rates return to baseline."
      ],
      prevention: [
        "Version-control CoreDNS configuration.",
        "Add manifest and Corefile validation to CI.",
        "Require a rollback plan for cluster DNS changes."
      ]
    }
  ],

  incidentScenarios: [
    {
      id: "incident-01",
      title: "Production applications suddenly cannot resolve internal Services",
      severity: "SEV-1 if critical services are broadly affected",
      impact: [
        "Service-to-service requests fail.",
        "New application connections fail even when Pods remain Running.",
        "Retries increase latency and may overload dependent services."
      ],
      timeline: [
        "T+00: Alert reports name-resolution errors across services.",
        "T+03: Confirm cluster context, affected namespaces and customer impact.",
        "T+05: Run the same fully qualified Service query from affected and healthy Pods.",
        "T+10: Inspect kube-dns Service, EndpointSlices and CoreDNS health.",
        "T+15: Identify whether the issue is resolver configuration, DNS endpoints or networking.",
        "T+20: Apply the approved targeted recovery or rollback.",
        "T+30: Verify internal DNS, application connections and customer transactions."
      ],
      investigation: [
        "Record exact hostname, query type, error and timestamp.",
        "Inspect /etc/resolv.conf and DNS policy.",
        "Check CoreDNS Pod readiness, logs and endpoint conditions.",
        "Compare DNS behavior across namespaces and nodes.",
        "Inspect recent CoreDNS, CNI, NetworkPolicy and cluster upgrade changes."
      ],
      recovery: [
        "Fix the confirmed cause rather than restarting all CoreDNS Pods.",
        "Use the correct configuration owner and approved change path.",
        "Validate lookups from multiple namespaces and nodes.",
        "Verify application-level connections after DNS resolution recovers."
      ],
      successCriteria: [
        "Internal Service FQDNs resolve consistently.",
        "CoreDNS has healthy backends.",
        "Application error rate and latency recover.",
        "No new failure pattern appears across nodes."
      ]
    },
    {
      id: "incident-02",
      title: "Internal DNS works but external hostnames fail",
      severity: "SEV-2 or SEV-1 depending on external dependency impact",
      impact: [
        "Applications cannot reach external APIs by hostname.",
        "Package downloads, webhooks or integrations fail.",
        "Internal Kubernetes service discovery may remain healthy."
      ],
      timeline: [
        "T+00: External DNS failures are reported.",
        "T+03: Compare internal and external queries.",
        "T+07: Inspect CoreDNS forward configuration and logs.",
        "T+12: Test upstream resolver availability and egress policy.",
        "T+20: Restore the confirmed upstream or network path.",
        "T+30: Verify several required external hostnames and application requests."
      ],
      investigation: [
        "Verify internal cluster FQDNs still resolve.",
        "Inspect upstream timeout and SERVFAIL evidence.",
        "Review recent firewall, resolver or Corefile changes.",
        "Check whether only a particular external domain is affected."
      ],
      recovery: [
        "Restore upstream resolver access or correct the approved forwarding configuration.",
        "Coordinate with network/DNS owners when the upstream is externally managed.",
        "Confirm internal DNS behavior remains unchanged."
      ],
      successCriteria: [
        "Required external names resolve consistently.",
        "Forwarding errors decline.",
        "External integrations recover."
      ]
    },
    {
      id: "incident-03",
      title: "Intermittent DNS timeouts during peak traffic",
      severity: "SEV-2 or SEV-3 depending on service impact",
      impact: [
        "Applications intermittently fail to establish connections.",
        "Retry storms amplify load.",
        "Latency and error rate increase during traffic peaks."
      ],
      timeline: [
        "T+00: DNS timeout rate rises.",
        "T+05: Compare DNS failures with CoreDNS CPU and query volume.",
        "T+10: Check individual CoreDNS replicas and node placement.",
        "T+15: Inspect application resolver behavior, ndots and retry patterns.",
        "T+25: Apply the evidence-backed capacity or query-volume fix.",
        "T+40: Observe performance at representative load."
      ],
      investigation: [
        "Compare healthy and failing DNS backends.",
        "Correlate timeouts with query rate and upstream latency.",
        "Inspect resource metrics and network packet loss.",
        "Check for search-domain query amplification."
      ],
      recovery: [
        "Reduce unnecessary queries or retry amplification.",
        "Address upstream bottlenecks or CoreDNS capacity constraints.",
        "Make scaling or cache changes only through the approved platform process."
      ],
      successCriteria: [
        "DNS latency and timeout rate return to baseline.",
        "CoreDNS capacity remains sufficient.",
        "Application requests recover under load."
      ]
    },
    {
      id: "incident-04",
      title: "A single namespace cannot resolve names after a policy rollout",
      severity: "SEV-2 or SEV-3",
      impact: [
        "Applications in the affected namespace fail to discover services.",
        "Other namespaces continue resolving names normally."
      ],
      timeline: [
        "T+00: Namespace-specific DNS errors begin.",
        "T+03: Compare affected and healthy namespaces.",
        "T+08: Inspect NetworkPolicy selectors and egress rules.",
        "T+15: Validate the required DNS traffic and port behavior.",
        "T+20: Deploy the narrow approved policy correction.",
        "T+30: Test internal and external lookups and application traffic."
      ],
      investigation: [
        "Inspect the affected namespace's policies.",
        "Compare Pod labels and policy selectors.",
        "Confirm UDP/TCP DNS requirements and the actual cluster DNS path.",
        "Review the policy rollout timestamp."
      ],
      recovery: [
        "Correct the policy with a narrowly scoped DNS rule.",
        "Do not remove all security policies.",
        "Verify the application has only its intended network access."
      ],
      successCriteria: [
        "DNS works in the affected namespace.",
        "Other namespaces remain healthy.",
        "No unintended egress permissions are introduced."
      ]
    }
  ],

  commandReference: [
    {
      purpose: "Check the active cluster",
      command: "kubectl config current-context",
      interpretation:
        "Confirms the context before diagnostics or changes. Stop if it is not the intended cluster."
    },
    {
      purpose: "Inspect Pod DNS resolver configuration",
      command: "kubectl -n <namespace> exec <pod> -- cat /etc/resolv.conf",
      interpretation:
        "Shows nameserver, search domains and resolver options. Minimal images may not provide exec or cat."
    },
    {
      purpose: "Test an internal Service FQDN",
      command: "kubectl -n <namespace> exec <pod> -- nslookup <service>.<namespace>.svc.cluster.local",
      interpretation:
        "Tests resolution of the named Service. Replace the cluster domain if the cluster uses a different one."
    },
    {
      purpose: "Inspect DNS Service",
      command: "kubectl -n kube-system get svc kube-dns -o wide",
      interpretation:
        "Shows the cluster DNS Service and its ClusterIP. Some environments use a different namespace or management setup."
    },
    {
      purpose: "Inspect DNS backends",
      command: "kubectl -n kube-system get endpointslice -l kubernetes.io/service-name=kube-dns -o yaml",
      interpretation:
        "Shows DNS endpoint addresses and conditions. Empty or unhealthy endpoints require further investigation."
    },
    {
      purpose: "Inspect CoreDNS logs",
      command: "kubectl -n kube-system logs deployment/coredns --all-pods=true --since=30m",
      interpretation:
        "Look for forwarding failures, plugin errors and other evidence. Deployment names and kubectl capabilities vary."
    },
    {
      purpose: "Inspect CoreDNS configuration",
      command: "kubectl -n kube-system get configmap coredns -o yaml",
      interpretation:
        "Shows the Corefile when the ConfigMap is named coredns. Verify the actual resource name in your cluster."
    },
    {
      purpose: "Inspect CoreDNS resource usage",
      command: "kubectl -n kube-system top pods --containers",
      interpretation:
        "Shows current CPU and memory if Metrics Server is available; historical monitoring is needed for incident correlation."
    },
    {
      purpose: "List network policies",
      command: "kubectl get networkpolicy -A",
      interpretation:
        "Identifies candidate policies. Effective behavior also depends on the CNI implementation and cluster networking."
    },
    {
      purpose: "Inspect recent events",
      command: "kubectl -n kube-system get events --sort-by=.metadata.creationTimestamp",
      interpretation:
        "Helps reconstruct the event sequence, but events are not a permanent audit log."
    },
    {
      purpose: "Inspect node health",
      command: "kubectl describe node <node>",
      interpretation:
        "Shows readiness and pressure conditions. It does not replace detailed CNI or host-level diagnostics."
    },
    {
      purpose: "Review a proposed DNS configuration change",
      command: "kubectl diff -f <reviewed-dns-change.yaml",
      interpretation:
        "Shows a prospective difference where supported. Review the output before applying any change."
    },
    {
      purpose: "Validate a manifest against the API server",
      command: "kubectl apply --dry-run=server -f <reviewed-dns-change.yaml",
      interpretation:
        "Validates the request without persisting it. This does not prove that runtime DNS queries will succeed."
    }
  ],

  productionChecklist: [
    "Confirm context, namespace and affected cluster.",
    "Record the exact hostname, query type, error message and timestamp.",
    "Identify affected applications, nodes and customer impact.",
    "Compare a failing Pod with a healthy control.",
    "Inspect /etc/resolv.conf, dnsPolicy and dnsConfig.",
    "Test internal Service FQDNs separately from external names.",
    "Check kube-dns Service, EndpointSlices and CoreDNS readiness.",
    "Inspect CoreDNS logs, Corefile and recent configuration changes.",
    "Check NetworkPolicy, firewall, CNI and UDP/TCP port 53 behavior.",
    "Inspect upstream resolver health for external lookup failures.",
    "Check query volume, CoreDNS resource pressure and resolver retries.",
    "Identify the evidence-supported root cause before making changes.",
    "Use the correct Helm, GitOps or platform configuration source of truth.",
    "Review the diff and validate the proposed change.",
    "Verify internal and external resolution from affected workloads.",
    "Confirm application connectivity, customer transactions and monitoring recovery.",
    "Document the root cause, corrective action and preventive work."
  ],

  prevention: [
    "Include internal Service DNS checks in deployment smoke tests.",
    "Validate required hostnames and namespace names in CI.",
    "Version-control CoreDNS configuration and review changes.",
    "Validate Corefile and rendered manifests before rollout.",
    "Test NetworkPolicy changes with explicit DNS connectivity checks.",
    "Monitor DNS query rate, latency, SERVFAIL and timeout rates.",
    "Monitor CoreDNS replica readiness and endpoint availability.",
    "Track external upstream resolver health separately from internal DNS.",
    "Measure application query volume and resolver retry behavior.",
    "Review ndots and search-domain behavior for high-volume workloads.",
    "Test cluster DNS after CNI, node, firewall and Kubernetes upgrades.",
    "Maintain a tested rollback procedure for cluster-wide DNS changes.",
    "Run failure simulations in isolated test environments.",
    "Document DNS ownership, upstream dependencies and escalation paths."
  ],

  monitoring: [
    "CoreDNS availability and ready replica count.",
    "kube-dns Service and EndpointSlice health.",
    "DNS query rate and response latency.",
    "NXDOMAIN, SERVFAIL and timeout rates.",
    "CoreDNS CPU, memory and restart count.",
    "Upstream forwarding latency and failure rate.",
    "Application-level DNS resolution errors.",
    "Node-specific DNS failures and network packet loss.",
    "DNS failures correlated with deployment revisions.",
    "Synthetic internal Service and external hostname lookups.",
    "Customer-facing request success rate and latency."
  ],

  incidentReportTemplate: [
    "Incident ID and affected service:",
    "Cluster, environment and namespaces:",
    "Severity and customer impact:",
    "Incident start, detection and recovery timestamps:",
    "Affected hostnames and query types:",
    "Error evidence: NXDOMAIN, SERVFAIL, timeout or connection refused:",
    "Resolver configuration and DNS policy:",
    "CoreDNS Service, EndpointSlice and Pod health:",
    "CoreDNS logs, metrics and upstream evidence:",
    "NetworkPolicy, CNI, firewall or node evidence:",
    "Root cause supported by evidence:",
    "Recent changes and contributing factors:",
    "Corrective action and change reference:",
    "Rollback performed and reason:",
    "Verification: internal DNS, external DNS and application requests:",
    "Preventive actions, owners and due dates:",
    "Runbook and monitoring improvements:"
  ],

  labs: [
    {
      title: "Lab 1 — Diagnose an incorrect Service hostname",
      objective:
        "Distinguish NXDOMAIN caused by a wrong name from a cluster DNS outage.",
      steps: [
        "Create a disposable test namespace and a simple Service.",
        "Query the correct Service FQDN from a test Pod.",
        "Query a deliberately incorrect Service name.",
        "Compare the successful response with the NXDOMAIN result.",
        "Verify that the Service exists in the intended namespace.",
        "Correct the application hostname and rerun the lookup."
      ],
      expectedResult:
        "The correct FQDN resolves while the deliberately incorrect name fails. This demonstrates why a single NXDOMAIN does not prove CoreDNS is broken.",
      cleanup: [
        "Remove the lab namespace after verifying it contains only lab resources.",
        "Do not create deliberately broken production configuration."
      ]
    },
    {
      title: "Lab 2 — Compare internal and external DNS",
      objective:
        "Separate cluster Service discovery from upstream forwarding.",
      steps: [
        "Run an internal Kubernetes Service lookup.",
        "Run a lookup for a permitted external hostname.",
        "Record response time and result for each query.",
        "Inspect CoreDNS logs and forwarding configuration.",
        "Use a controlled test environment to simulate an upstream DNS failure.",
        "Restore the upstream path and verify both query types."
      ],
      expectedResult:
        "The learner can identify whether failures are limited to internal records or the external forwarding path.",
      cleanup: [
        "Restore the test resolver configuration.",
        "Remove temporary diagnostic resources."
      ]
    },
    {
      title: "Lab 3 — Understand DNS policy restrictions",
      objective:
        "Observe how egress restrictions can affect DNS queries.",
      steps: [
        "Create a dedicated test namespace.",
        "Deploy a test Pod and verify its DNS resolution.",
        "Apply a deliberately restrictive NetworkPolicy only in the isolated lab.",
        "Observe the lookup failure and inspect policy selectors.",
        "Add the required narrowly scoped DNS rule.",
        "Verify name resolution without granting unrelated egress access."
      ],
      expectedResult:
        "The learner can relate a DNS timeout to an actual policy restriction and restore only the required traffic.",
      cleanup: [
        "Delete the lab NetworkPolicy and workloads.",
        "Confirm no test policy remains in the shared environment."
      ]
    },
    {
      title: "Lab 4 — Investigate resolver search behavior",
      objective:
        "Understand search domains and ndots using controlled DNS lookups.",
      steps: [
        "Inspect /etc/resolv.conf in a test Pod.",
        "Query a short Service name and its fully qualified equivalent.",
        "Observe the different query behavior using an approved DNS diagnostic tool.",
        "Review how ndots and search domains affect the query path.",
        "Test a controlled dnsConfig adjustment in a disposable workload.",
        "Verify that internal and external hostnames continue to resolve."
      ],
      expectedResult:
        "The learner can explain why short names and fully qualified names may behave differently and why global resolver changes need testing.",
      cleanup: [
        "Restore the original test Pod DNS configuration.",
        "Remove the disposable workload."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is CoreDNS in Kubernetes?",
      answer:
        "CoreDNS is commonly used as the cluster DNS server. It resolves Kubernetes Service names and can forward queries for other domains to configured upstream resolvers.",
      productionExample:
        "A Pod resolves payments.production.svc.cluster.local through cluster DNS before connecting to the payments Service."
    },
    {
      question: "What is the kube-dns Service?",
      answer:
        "It is the common Kubernetes Service name used to expose cluster DNS, including in clusters where CoreDNS provides the implementation.",
      productionExample:
        "A Pod's resolver sends queries to the cluster DNS Service IP, which routes requests to available DNS backends."
    },
    {
      question: "What is the difference between NXDOMAIN and SERVFAIL?",
      answer:
        "NXDOMAIN indicates that the queried name does not exist according to the responding DNS server. SERVFAIL indicates that the server could not successfully complete the query.",
      productionExample:
        "A misspelled Service often produces NXDOMAIN, while an upstream resolver problem can produce SERVFAIL."
    },
    {
      question: "Why can internal DNS work while external DNS fails?",
      answer:
        "Internal Service records can be resolved by CoreDNS locally, while external queries depend on the configured upstream forwarding path.",
      productionExample:
        "Kubernetes Services resolve correctly, but outbound API hostnames fail because the upstream resolver is unreachable."
    },
    {
      question: "How do you troubleshoot a DNS timeout?",
      answer:
        "Confirm the exact query, inspect the Pod resolver, test a healthy control, inspect kube-dns endpoints and CoreDNS logs, and then investigate NetworkPolicy, CNI, upstream latency and resource pressure.",
      productionExample:
        "Only Pods in one namespace time out because a default-deny egress policy does not permit DNS."
    },
    {
      question: "What is the purpose of /etc/resolv.conf in a Pod?",
      answer:
        "It contains resolver settings such as nameservers, search domains and options that affect how applications resolve hostnames.",
      productionExample:
        "An unexpected nameserver or missing search domain explains why one workload resolves names differently from its peers."
    },
    {
      question: "What are DNS search domains?",
      answer:
        "They allow a resolver to try configured domain suffixes when resolving names that are not already fully qualified according to its rules.",
      productionExample:
        "A short name such as payments can resolve within a namespace because the resolver appends the appropriate service domain."
    },
    {
      question: "What does ndots control?",
      answer:
        "The ndots resolver option influences when a name is tried as absolute versus with configured search suffixes. Exact behavior depends on the resolver implementation.",
      productionExample:
        "A high ndots value and multiple search domains can produce additional DNS queries for external hostnames."
    },
    {
      question: "How can NetworkPolicy break DNS?",
      answer:
        "An egress policy can block DNS traffic from application Pods to the cluster DNS service or its actual DNS endpoints.",
      productionExample:
        "A new default-deny policy causes lookups to time out until a reviewed DNS egress rule is added."
    },
    {
      question: "Why might DNS use TCP as well as UDP?",
      answer:
        "DNS commonly uses UDP for queries but can use TCP for truncated responses and other DNS exchanges. Restricting one transport can cause failures in some cases.",
      productionExample:
        "Small queries succeed over UDP, but larger responses fail because TCP port 53 is blocked."
    },
    {
      question: "What should you check when kube-dns has no endpoints?",
      answer:
        "Inspect CoreDNS Pod readiness, selectors, labels, scheduling, restart state and EndpointSlice conditions.",
      productionExample:
        "Every CoreDNS Pod is unready after an invalid configuration rollout, leaving the DNS Service without usable backends."
    },
    {
      question: "Why should you not restart CoreDNS immediately?",
      answer:
        "Restarting can erase useful transient evidence, disrupt remaining capacity and fail to fix the actual cause, such as a blocked network path or bad hostname.",
      productionExample:
        "A namespace-specific NetworkPolicy blocks DNS; restarting CoreDNS changes nothing and adds operational risk."
    },
    {
      question: "How do you troubleshoot intermittent DNS failures?",
      answer:
        "Compare DNS backends, nodes and namespaces; inspect per-replica health, resource metrics, upstream latency, packet loss and query volume.",
      productionExample:
        "One CoreDNS replica on a problematic node produces timeouts while requests routed to other replicas succeed."
    },
    {
      question: "Does successful DNS resolution prove that the application can connect?",
      answer:
        "No. DNS resolves a name to an address. Routing, firewall rules, Service ports, TLS and application health can still prevent a connection.",
      productionExample:
        "A database hostname resolves correctly, but a NetworkPolicy blocks the TCP connection to the database port."
    },
    {
      question: "How do you distinguish a CoreDNS issue from an application issue?",
      answer:
        "Test the exact query from the affected Pod and a healthy control, then compare the result with application errors and actual connection behavior.",
      productionExample:
        "Both Pods resolve the same name, but one application uses a stale hostname from its environment configuration."
    },
    {
      question: "What should be monitored for production DNS?",
      answer:
        "Monitor DNS latency, failure codes, query volume, CoreDNS availability, endpoint health, resource utilization, upstream failures and application-level resolution errors.",
      productionExample:
        "A rising SERVFAIL rate combined with upstream latency triggers investigation before application errors become widespread."
    },
    {
      question: "How would you safely change CoreDNS configuration?",
      answer:
        "Identify the configuration owner, preserve the current version, validate the proposed change, review the diff, deploy through the supported mechanism and verify DNS behavior after rollout.",
      productionExample:
        "A forwarding correction is tested in staging, reviewed in Git, deployed through the platform pipeline and verified with internal and external queries."
    },
    {
      question: "What is your first response to a cluster-wide DNS outage?",
      answer:
        "Establish impact, preserve evidence, check resolver configuration and CoreDNS endpoints, compare internal and external queries, then isolate the failure layer before making a targeted recovery.",
      productionExample:
        "The team identifies that CoreDNS endpoints are unavailable after a configuration change and restores the last known good configuration through the approved procedure."
    }
  ],

  commonMistakes: [
    "Restarting all CoreDNS Pods before collecting evidence.",
    "Assuming every DNS error is a CoreDNS failure.",
    "Treating NXDOMAIN, SERVFAIL and timeout as equivalent errors.",
    "Testing only an external hostname and never testing an internal Service FQDN.",
    "Testing only one Pod when the failure may be node-specific.",
    "Ignoring the Pod's actual resolv.conf.",
    "Confusing DNS resolution with successful TCP connectivity.",
    "Removing NetworkPolicies to test a DNS hypothesis.",
    "Changing the cluster DNS Service IP without validating cluster networking.",
    "Replacing the Corefile without preserving the previous configuration.",
    "Scaling CoreDNS without investigating upstream failures or query amplification.",
    "Changing ndots globally without compatibility testing.",
    "Ignoring UDP/TCP port 53 requirements.",
    "Assuming a successful node lookup proves Pod DNS works.",
    "Using tools that are absent from the application image without an approved debug method.",
    "Declaring recovery after one successful query without checking application traffic.",
    "Making simultaneous changes to Corefile, NetworkPolicy and replica count.",
    "Failing to document evidence, rollback and preventive actions."
  ],

  references: [
    {
      title: "Kubernetes — DNS for Services and Pods",
      url: "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/"
    },
    {
      title: "Kubernetes — Debugging DNS Resolution",
      url: "https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/"
    },
    {
      title: "Kubernetes — Debugging Services",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/"
    },
    {
      title: "Kubernetes — Network Policies",
      url: "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
    },
    {
      title: "CoreDNS Documentation",
      url: "https://coredns.io/manual/toc/"
    },
    {
      title: "CoreDNS Forward Plugin",
      url: "https://coredns.io/plugins/forward/"
    }
  ]
};

export default coreDNSResolutionGuide;
