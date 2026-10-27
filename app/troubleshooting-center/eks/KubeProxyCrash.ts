
/**
 * File: app/troubleshooting-center/eks/KubeProxyCrash.ts
 *
 * Amazon EKS — kube-proxy Crash / Service Networking Failure
 *
 * Purpose:
 * Production-grade troubleshooting runbook for kube-proxy crashes,
 * stale Service rules, ClusterIP failures, NodePort failures, DNS symptoms,
 * node-specific networking failures, conntrack pressure, add-on rollouts,
 * and safe recovery.
 *
 * Safety:
 * - Diagnostic commands are preferred before any mutation.
 * - Do not flush iptables/nftables rules on production nodes.
 * - Do not reboot or drain nodes without checking workload availability.
 * - Do not restart kube-proxy cluster-wide as the first diagnostic action.
 * - Confirm whether kube-proxy is actually the Service proxy implementation.
 * - Adapt commands to the cluster version, node OS, and proxy mode.
 *
 * Official references:
 * https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/
 * https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/
 * https://kubernetes.io/docs/reference/instrumentation/metrics/
 * https://docs.aws.amazon.com/eks/latest/best-practices/
 */

export const kubeProxyCrashGuide = {
  metadata: {
    id: "eks-kube-proxy-crash",
    title: "Amazon EKS — kube-proxy Crash and Service Networking Failures",
    category: "EKS Troubleshooting",
    file: "KubeProxyCrash.ts",
    difficulty: "Advanced",
    audience: [
      "SRE",
      "DevOps Engineer",
      "Platform Engineer",
      "Kubernetes Administrator",
      "Cloud Operations Engineer",
    ],
    tags: [
      "Amazon EKS",
      "kube-proxy",
      "CrashLoopBackOff",
      "ClusterIP",
      "NodePort",
      "iptables",
      "IPVS",
      "nftables",
      "conntrack",
      "CoreDNS",
      "CNI",
      "DaemonSet",
      "incident-response",
    ],
    estimatedDuration: "60–180 minutes for a complex production incident",
    lastReviewed: "2026-10",
    disclaimer:
      "Validate all commands and recovery steps against the actual EKS version, " +
      "node operating system, networking implementation, and organizational change policy.",
  },

  overview: {
    whatIsKubeProxy:
      "kube-proxy is normally deployed as a DaemonSet and configures node-level " +
      "networking rules used to implement Kubernetes Services. Depending on the " +
      "configured proxy mode, it manages iptables, IPVS, or nftables rules. " +
      "It is not the application proxy and is not the same component as the AWS VPC CNI.",

    whyFailureMatters: [
      "ClusterIP requests can time out or reach no usable backend.",
      "NodePort traffic may fail on affected nodes.",
      "Some Services may work while others fail.",
      "New Service or EndpointSlice changes may not be reflected in node rules.",
      "A kube-proxy Pod crash may affect only the node hosting that Pod.",
      "Existing connections can behave differently from new connections.",
      "DNS failures can be a symptom of Service networking failure rather than a CoreDNS crash.",
    ],

    importantDistinction:
      "A kube-proxy Pod being unhealthy does not automatically mean all cluster traffic " +
      "will stop. Existing node rules may remain in place, while updates to Services " +
      "and endpoints may no longer be synchronized. Prove the affected traffic path.",

    notAlwaysKubeProxy: [
      "A Service has no ready endpoints.",
      "The application container is not listening on the target port.",
      "NetworkPolicy or another network security layer blocks traffic.",
      "AWS security groups, NACLs, or route tables block the traffic path.",
      "VPC CNI IP allocation or Pod routing is broken.",
      "CoreDNS itself is unhealthy.",
      "The cluster uses a different Service proxy implementation, such as an eBPF dataplane.",
    ],
  },

  incidentScenario: {
    title: "Production incident: checkout requests intermittently time out",

    timeline: [
      {
        time: "T+00",
        event: "Monitoring reports a rise in HTTP 5xx and request timeouts.",
      },
      {
        time: "T+03",
        event:
          "The application team confirms that direct Pod IP requests work, " +
          "but some ClusterIP requests fail.",
      },
      {
        time: "T+06",
        event:
          "The platform engineer discovers kube-proxy CrashLoopBackOff on two nodes.",
      },
      {
        time: "T+10",
        event:
          "Investigation finds a recent node image rollout and a change to networking configuration.",
      },
      {
        time: "T+15",
        event:
          "The team compares healthy and affected nodes before choosing a targeted recovery.",
      },
    ],

    exampleEnvironment: {
      cluster: "production-eks",
      namespace: "payments",
      service: "checkout-api",
      port: 8080,
      proxyNamespace: "kube-system",
      proxyDaemonSet: "kube-proxy",
      exampleOnly:
        "Names and values are illustrative. Replace them with the actual incident details.",
    },

    impactQuestions: [
      "Is the failure affecting every node or only specific nodes?",
      "Do direct Pod IP requests work from the same source?",
      "Does the ClusterIP fail from one node or from all nodes?",
      "Are new connections failing while established connections still work?",
      "Are internal Service calls failing, or only external load-balancer traffic?",
      "Did the incident begin after an EKS upgrade, add-on update, node replacement, or policy change?",
      "Are production deployments or customer transactions affected?",
      "Are retries increasing load or causing duplicate business operations?",
    ],

    severityGuidance: [
      {
        severity: "SEV-1",
        condition:
          "Critical production traffic is broadly unavailable, or a major customer-facing path is down.",
        response:
          "Declare the incident, engage the incident commander and platform/network owners, " +
          "and prioritize customer-impact mitigation.",
      },
      {
        severity: "SEV-2",
        condition:
          "A subset of nodes, services, or availability zones is degraded.",
        response:
          "Identify the affected scope, preserve healthy capacity, and perform a targeted recovery.",
      },
      {
        severity: "SEV-3",
        condition:
          "A kube-proxy Pod is restarting but Service traffic remains healthy.",
        response:
          "Investigate with normal change controls and verify that no latent networking failure exists.",
      },
    ],
  },

  firstFiveMinutes: {
    objective:
      "Establish scope and collect evidence before changing cluster networking.",

    commands: [
      {
        purpose: "Confirm the current Kubernetes context",
        command: "kubectl config current-context",
        interpretation:
          "Confirm that the context points to the intended production cluster.",
      },
      {
        purpose: "Confirm cluster identity",
        command:
          "aws sts get-caller-identity && aws eks describe-cluster --name \"$CLUSTER_NAME\" --region \"$AWS_REGION\" --query 'cluster.{name:name,status:status,version:version,endpoint:endpoint}'",
        interpretation:
          "Verify the AWS identity, region, cluster name, status, and Kubernetes version.",
      },
      {
        purpose: "Check kube-proxy Pod status",
        command:
          "kubectl get pods -n kube-system -l k8s-app=kube-proxy -o wide",
        interpretation:
          "Identify CrashLoopBackOff, Error, Pending, missing Pods, restart counts, and affected nodes.",
      },
      {
        purpose: "Check DaemonSet rollout",
        command:
          "kubectl get ds kube-proxy -n kube-system -o wide",
        interpretation:
          "Compare desired, current, ready, and available Pod counts.",
      },
      {
        purpose: "Check node health",
        command:
          "kubectl get nodes -o wide",
        interpretation:
          "Look for NotReady nodes, recently replaced nodes, and concentration by failure domain.",
      },
      {
        purpose: "Inspect recent events",
        command:
          "kubectl get events -n kube-system --sort-by=.metadata.creationTimestamp",
        interpretation:
          "Look for image pull failures, sandbox errors, mount errors, scheduling failures, and probe failures.",
      },
    ],

    safetyChecks: [
      "Confirm the cluster and AWS account before running any mutation.",
      "Record the incident start time and last known good time.",
      "Capture current Pod, DaemonSet, node, and add-on status.",
      "Check whether a deployment or infrastructure change is still in progress.",
      "Confirm that the proposed action has the required production approval.",
      "Avoid broad restarts until the failure scope is known.",
    ],
  },

  evidenceCollection: {
    kubernetesSnapshot: [
      "kubectl config current-context",
      "kubectl get nodes -o wide",
      "kubectl get ds kube-proxy -n kube-system -o yaml",
      "kubectl get pods -n kube-system -l k8s-app=kube-proxy -o wide",
      "kubectl describe ds kube-proxy -n kube-system",
      "kubectl get events -A --sort-by=.metadata.creationTimestamp",
    ],

    awsSnapshot: [
      "aws sts get-caller-identity",
      "aws eks describe-cluster --name \"$CLUSTER_NAME\" --region \"$AWS_REGION\"",
      "aws eks list-addons --cluster-name \"$CLUSTER_NAME\" --region \"$AWS_REGION\"",
      "aws eks describe-addon --cluster-name \"$CLUSTER_NAME\" --addon-name kube-proxy --region \"$AWS_REGION\"",
      "aws eks list-updates --name \"$CLUSTER_NAME\" --region \"$AWS_REGION\"",
    ],

    podLogs: [
      "kubectl logs -n kube-system \"$KPROXY_POD\" --timestamps",
      "kubectl logs -n kube-system \"$KPROXY_POD\" --previous --timestamps",
      "kubectl describe pod -n kube-system \"$KPROXY_POD\"",
    ],

    recordTheseFields: [
      "Incident ID and severity",
      "Cluster name, AWS account, and region",
      "Kubernetes version and node OS/image",
      "kube-proxy image tag and add-on version",
      "Affected nodes and availability zones",
      "Pod restart counts and previous container termination reason",
      "First observed error timestamp",
      "Recent add-on, node, CNI, security, or routing changes",
      "Service name, ClusterIP, port, EndpointSlices, and target Pod IPs",
      "Proxy mode: iptables, IPVS, nftables, or other dataplane",
      "Results from healthy-node versus affected-node comparisons",
    ],

    redaction:
      "Do not paste AWS credentials, tokens, kubeconfig secrets, private keys, " +
      "or sensitive customer payloads into incident notes or public tickets.",
  },

  diagnosticWorkflow: [
    {
      step: 1,
      name: "Verify the cluster and AWS identity",
      commands: [
        "kubectl config current-context",
        "aws sts get-caller-identity",
        "aws eks describe-cluster --name \"$CLUSTER_NAME\" --region \"$AWS_REGION\" --query 'cluster.{status:status,version:version}'",
      ],
      decision:
        "If the identity, context, or region is unexpected, stop. Do not modify the cluster.",
      next:
        "Continue only after confirming that all commands target the intended environment.",
    },

    {
      step: 2,
      name: "Determine whether kube-proxy is actually crashing",
      commands: [
        "kubectl get pods -n kube-system -l k8s-app=kube-proxy -o wide",
        "kubectl get ds kube-proxy -n kube-system",
        "kubectl describe ds kube-proxy -n kube-system",
      ],
      inspect: [
        "CrashLoopBackOff",
        "Error",
        "ImagePullBackOff",
        "CreateContainerConfigError",
        "Pending",
        "Missing DaemonSet Pod on an expected node",
        "Desired count versus ready count",
      ],
      decision:
        "If Pods are healthy, investigate stale proxy rules and Service connectivity. " +
        "If Pods are crashing, collect current and previous logs before changing anything.",
    },

    {
      step: 3,
      name: "Read current and previous container logs",
      commands: [
        "kubectl logs -n kube-system \"$KPROXY_POD\" --timestamps",
        "kubectl logs -n kube-system \"$KPROXY_POD\" --previous --timestamps",
        "kubectl describe pod -n kube-system \"$KPROXY_POD\"",
      ],
      interpret: [
        {
          signature: "previous container logs contain a fatal configuration error",
          meaning:
            "The process may be exiting before it can synchronize Service rules.",
          action:
            "Inspect the exact error, mounted configuration, arguments, and image version.",
        },
        {
          signature: "permission denied or operation not permitted",
          meaning:
            "The process may lack required privileges or kernel capabilities.",
          action:
            "Compare the DaemonSet security context and node configuration with a healthy node.",
        },
        {
          signature: "failed to create or initialize proxier",
          meaning:
            "The selected proxy mode, kernel support, or configuration may be incompatible.",
          action:
            "Check the configured mode and the specific initialization error.",
        },
        {
          signature: "cannot contact Kubernetes API",
          meaning:
            "The process may be unable to receive Services or EndpointSlices.",
          action:
            "Inspect API connectivity, node networking, RBAC, and service-account configuration.",
        },
        {
          signature: "no previous logs available",
          meaning:
            "The container may not have restarted on that node, or previous logs may no longer be retained.",
          action:
            "Use Pod events, node logs, monitoring history, and the current container logs.",
        },
      ],
    },

    {
      step: 4,
      name: "Identify the failure scope",
      commands: [
        "kubectl get pods -n kube-system -l k8s-app=kube-proxy -o wide",
        "kubectl get nodes -L topology.kubernetes.io/zone",
        "kubectl get pods -A -o wide",
      ],
      compare: [
        "All nodes versus one node",
        "One availability zone versus multiple zones",
        "Old nodes versus newly launched nodes",
        "One node group versus every node group",
        "One Service versus all ClusterIP Services",
      ],
      decision:
        "A node-local pattern points toward that node's kernel, rules, runtime, or local configuration. " +
        "A cluster-wide pattern raises suspicion of a shared configuration, rollout, or compatibility issue.",
    },

    {
      step: 5,
      name: "Inspect the affected Service and EndpointSlices",
      commands: [
        "kubectl get service -n \"$APP_NAMESPACE\" \"$SERVICE_NAME\" -o yaml",
        "kubectl get endpointslice -n \"$APP_NAMESPACE\" -l kubernetes.io/service-name=\"$SERVICE_NAME\" -o wide",
        "kubectl describe service -n \"$APP_NAMESPACE\" \"$SERVICE_NAME\"",
        "kubectl get pods -n \"$APP_NAMESPACE\" -o wide",
      ],
      inspect: [
        "Service type and ClusterIP",
        "Port, targetPort, and protocol",
        "EndpointSlice addresses and ports",
        "Endpoint readiness and serving conditions",
        "Application Pod readiness",
        "Named targetPort resolution",
      ],
      decision:
        "If there are no ready endpoints, investigate selectors, readiness probes, and application health first. " +
        "A healthy kube-proxy cannot route traffic to a backend that does not exist or is not ready.",
    },

    {
      step: 6,
      name: "Test the same request through different paths",
      commands: [
        "kubectl run net-debug --rm -it --restart=Never --image=curlimages/curl -- curl -sv --connect-timeout 3 \"http://$SERVICE_IP:$SERVICE_PORT/health\"",
        "kubectl run pod-debug --rm -it --restart=Never --image=curlimages/curl -- curl -sv --connect-timeout 3 \"http://$POD_IP:$TARGET_PORT/health\"",
      ],
      safety:
        "Use an approved diagnostic image and namespace. Confirm that temporary Pods are allowed by policy. " +
        "Use an existing approved debug Pod if ephemeral Pod creation is prohibited.",
      interpret: [
        {
          result: "Pod IP succeeds; ClusterIP fails",
          meaning:
            "The Service path is suspect, including kube-proxy rules or an alternative Service dataplane.",
        },
        {
          result: "Both Pod IP and ClusterIP fail",
          meaning:
            "Investigate application health, CNI, Pod routing, policy, and network reachability.",
        },
        {
          result: "Both succeed inside the cluster; external traffic fails",
          meaning:
            "Investigate load balancer target health, security groups, NACLs, NodePort, and external traffic policy.",
        },
      ],
    },

    {
      step: 7,
      name: "Inspect kube-proxy mode and configuration",
      commands: [
        "kubectl get ds kube-proxy -n kube-system -o yaml",
        "kubectl get configmap -n kube-system",
        "kubectl get configmap kube-proxy-config -n kube-system -o yaml",
      ],
      inspect: [
        "Container image and image tag",
        "Container arguments",
        "Configuration file path",
        "Volume mounts",
        "Host mounts",
        "Security context",
        "Proxy mode",
        "NodePort address configuration",
        "Recent ConfigMap or DaemonSet changes",
      ],
      caveat:
        "The kube-proxy-config ConfigMap is not guaranteed to exist under that name in every deployment. " +
        "Inspect the actual Pod arguments and mounts before assuming a configuration source.",
    },

    {
      step: 8,
      name: "Check the EKS add-on state and compatibility",
      commands: [
        "aws eks list-addons --cluster-name \"$CLUSTER_NAME\" --region \"$AWS_REGION\"",
        "aws eks describe-addon --cluster-name \"$CLUSTER_NAME\" --addon-name kube-proxy --region \"$AWS_REGION\"",
        "aws eks describe-addon-versions --kubernetes-version \"$K8S_VERSION\" --addon-name kube-proxy --region \"$AWS_REGION\"",
        "aws eks list-updates --name \"$CLUSTER_NAME\" --region \"$AWS_REGION\"",
      ],
      inspect: [
        "Add-on status",
        "Add-on version",
        "Health issues",
        "Update history",
        "Kubernetes minor version compatibility",
        "Whether the add-on is managed or self-managed",
        "Configuration values and conflict-resolution history",
      ],
      decision:
        "If the failure started after an add-on change, compare the previous and current versions and configuration. " +
        "Do not blindly overwrite add-on configuration to force a rollout.",
    },

    {
      step: 9,
      name: "Inspect node kernel and networking prerequisites",
      commands: [
        "uname -r",
        "ip -br address",
        "ip route",
        "ip rule",
        "sudo iptables-save",
        "sudo ip6tables-save",
        "sudo nft list ruleset",
        "sudo lsmod | grep -E 'ip_vs|nf_conntrack|nf_tables'",
      ],
      caveat:
        "Run node commands only through approved access such as SSM or the organization's node-debug workflow. " +
        "Some commands may not be installed or permitted on minimal node images.",
      decision:
        "Compare a failing node with a healthy node of the same OS, kernel, and node-group configuration. " +
        "Do not infer that a missing optional module is the cause without confirming the configured proxy mode.",
    },

    {
      step: 10,
      name: "Inspect Service rules for the configured proxy mode",
      modes: [
        {
          mode: "iptables",
          commands: [
            "sudo iptables -t nat -S",
            "sudo iptables-save | grep -E 'KUBE-SERVICES|KUBE-SVC|KUBE-SEP'",
          ],
          inspect:
            "Check whether the Service VIP has rules and whether endpoint DNAT rules reference the expected Pod IPs.",
        },
        {
          mode: "IPVS",
          commands: [
            "sudo ipvsadm -Ln",
            "sudo ipvsadm -Ln --stats",
          ],
          inspect:
            "Check whether the expected virtual Service and real backend servers are present.",
        },
        {
          mode: "nftables",
          commands: [
            "sudo nft list ruleset",
          ],
          inspect:
            "Inspect the actual nftables tables and chains used by the deployed proxy version.",
        },
      ],
      decision:
        "Use the rules appropriate to the active proxy mode. Do not switch proxy modes during an incident " +
        "as an improvised fix. Avoid assuming that every cluster uses legacy iptables chains.",
    },

    {
      step: 11,
      name: "Check conntrack pressure and node resource pressure",
      commands: [
        "free -h",
        "df -h",
        "uptime",
        "sudo conntrack -S",
        "sudo sysctl net.netfilter.nf_conntrack_count",
        "sudo sysctl net.netfilter.nf_conntrack_max",
      ],
      inspect: [
        "Memory pressure or OOM kills",
        "Disk pressure affecting container runtime",
        "CPU saturation",
        "Conntrack table usage and insert/drop counters",
        "Kernel messages reporting connection-tracking exhaustion",
      ],
      caveat:
        "conntrack commands and counters vary by OS and kernel. If conntrack is absent, use available kernel metrics and logs.",
      decision:
        "A high connection count alone does not prove exhaustion. Correlate table utilization, drop counters, kernel logs, " +
        "and application connection patterns before changing limits.",
    },

    {
      step: 12,
      name: "Inspect CNI, policy, and AWS networking",
      commands: [
        "kubectl get pods -n kube-system -o wide",
        "kubectl get daemonsets -n kube-system",
        "kubectl logs -n kube-system -l k8s-app=aws-node --since=30m",
        "kubectl get networkpolicy -A",
      ],
      inspect: [
        "aws-node health",
        "Pod IP allocation failures",
        "CNI initialization errors",
        "NetworkPolicy changes",
        "Node security-group rules",
        "Subnet NACLs and route tables",
        "Cross-node and cross-AZ reachability",
      ],
      caveat:
        "The aws-node label is common for the Amazon VPC CNI, but labels and implementation may differ. " +
        "Use the actual DaemonSet and Pod labels in the cluster.",
      decision:
        "If direct Pod-to-Pod connectivity fails, do not limit the investigation to kube-proxy. " +
        "Separate node-local Service translation from Pod routing and AWS network controls.",
    },

    {
      step: 13,
      name: "Validate the fix and decide whether to recover or roll back",
      checks: [
        "The affected kube-proxy Pod remains Running without repeated restarts.",
        "DaemonSet ready count matches the expected node count.",
        "The Service has ready EndpointSlices.",
        "ClusterIP requests succeed from affected and unaffected nodes.",
        "Direct Pod IP requests continue to succeed.",
        "NodePort or load-balancer traffic succeeds where applicable.",
        "CoreDNS and critical internal Services are healthy.",
        "Application error rates and latency return to baseline.",
      ],
      decision:
        "Keep the incident open until both component health and customer-facing traffic are verified.",
    },
  ],

  failureSignatureMatrix: [
    {
      symptom: "CrashLoopBackOff on every node",
      likelyCauses: [
        "Invalid shared configuration",
        "Incompatible image or add-on rollout",
        "Missing required kernel support for configured mode",
        "Shared API connectivity or authorization problem",
      ],
      proveItWith: [
        "Compare previous logs from multiple nodes",
        "Inspect DaemonSet image, arguments, and mounts",
        "Check add-on health and recent updates",
      ],
      avoid:
        "Restarting every Pod repeatedly without identifying the shared failure.",
    },
    {
      symptom: "CrashLoopBackOff on one node",
      likelyCauses: [
        "Node-specific kernel or OS issue",
        "Resource exhaustion",
        "Node-local rules or permissions",
        "Node image or bootstrap drift",
      ],
      proveItWith: [
        "Compare node image and kernel with a healthy peer",
        "Inspect node events and container termination state",
        "Compare local proxy rules and available kernel modules",
      ],
      avoid:
        "Changing cluster-wide configuration for a failure isolated to one node.",
    },
    {
      symptom: "kube-proxy is Running but ClusterIP times out",
      likelyCauses: [
        "Stale or incomplete proxy rules",
        "No ready Service endpoints",
        "Incorrect targetPort",
        "Alternative Service dataplane issue",
        "Policy or node networking failure",
      ],
      proveItWith: [
        "Inspect EndpointSlices",
        "Compare direct Pod IP and ClusterIP tests",
        "Inspect the active proxy-mode rules",
      ],
      avoid:
        "Assuming a Running Pod proves that Service rules are correct.",
    },
    {
      symptom: "Only DNS lookups fail",
      likelyCauses: [
        "CoreDNS Pod or Service health",
        "kube-dns Service rule issue",
        "UDP/TCP 53 connectivity issue",
        "NetworkPolicy or node-local DNS configuration",
      ],
      proveItWith: [
        "Inspect CoreDNS Pods and logs",
        "Inspect kube-dns Service and EndpointSlices",
        "Test DNS by Service IP and from a known healthy Pod",
      ],
      avoid:
        "Restarting CoreDNS without first checking the DNS Service path.",
    },
    {
      symptom: "Only NodePort traffic fails",
      likelyCauses: [
        "NodePort address restriction",
        "Host firewall or nftables interaction",
        "Security group or NACL restrictions",
        "External traffic policy behavior",
        "Load balancer target health issue",
      ],
      proveItWith: [
        "Inspect Service YAML",
        "Check nodePort and traffic policy",
        "Test from an allowed network location",
        "Inspect target health and network controls",
      ],
      avoid:
        "Opening all inbound ports as a troubleshooting shortcut.",
    },
    {
      symptom: "New connections fail; established connections behave differently",
      likelyCauses: [
        "Stale or changed NAT state",
        "Conntrack pressure",
        "Recent proxy-rule changes",
        "Application or client connection reuse behavior",
      ],
      proveItWith: [
        "Compare new and established connection tests",
        "Inspect conntrack metrics and kernel logs",
        "Correlate failures with rule changes and rollout time",
      ],
      avoid:
        "Flushing conntrack state globally without understanding the connection impact.",
    },
    {
      symptom: "Failure begins immediately after a node rollout",
      likelyCauses: [
        "Node OS or kernel change",
        "Different networking packages or modules",
        "Bootstrap configuration drift",
        "Proxy image or configuration mismatch",
      ],
      proveItWith: [
        "Compare old and new node groups",
        "Review launch template and AMI history",
        "Compare kube-proxy image and local networking state",
      ],
      avoid:
        "Replacing every node before testing a controlled, isolated recovery.",
    },
  ],

  detailedTroubleshooting: {
    crashLoopBackOff: {
      symptoms: [
        "Pod restart count increases continuously.",
        "Pod repeatedly enters CrashLoopBackOff.",
        "The container exits soon after starting.",
      ],
      commands: [
        "kubectl describe pod -n kube-system \"$KPROXY_POD\"",
        "kubectl logs -n kube-system \"$KPROXY_POD\" --previous --timestamps",
        "kubectl get pod -n kube-system \"$KPROXY_POD\" -o yaml",
      ],
      process: [
        "Record the last termination reason and exit code.",
        "Check whether the process exits due to configuration, permissions, or initialization failure.",
        "Check whether the crash occurs on one node or many nodes.",
        "Compare the failing Pod spec with the DaemonSet template.",
        "Check whether the image was recently changed.",
        "Correlate the first failure with deployment and infrastructure events.",
      ],
      fix:
        "Correct the evidenced configuration, compatibility, permission, or node-level cause. " +
        "Use the approved add-on or GitOps workflow for managed resources.",
    },

    imagePullFailure: {
      symptoms: [
        "ImagePullBackOff",
        "ErrImagePull",
        "Registry timeout or authorization error",
      ],
      commands: [
        "kubectl describe pod -n kube-system \"$KPROXY_POD\"",
        "kubectl get ds kube-proxy -n kube-system -o jsonpath='{.spec.template.spec.containers[*].image}'",
      ],
      investigate: [
        "Incorrect image tag",
        "Registry reachability",
        "Private registry credentials where applicable",
        "Node egress and DNS",
        "Recent image or mirror changes",
      ],
      fix:
        "Restore a known-good compatible image reference through the approved deployment mechanism. " +
        "Do not pull an arbitrary kube-proxy image that does not match the cluster version.",
    },

    apiConnectivity: {
      symptoms: [
        "Logs show repeated Kubernetes API connection failures.",
        "Service and EndpointSlice updates stop arriving.",
      ],
      investigate: [
        "Node-to-API endpoint connectivity",
        "Cluster endpoint access mode",
        "Security groups and routes",
        "DNS resolution for the API endpoint",
        "Service account and RBAC configuration",
        "Recent endpoint or network policy changes",
      ],
      commands: [
        "kubectl get pods -n kube-system -o wide",
        "kubectl describe pod -n kube-system \"$KPROXY_POD\"",
        "aws eks describe-cluster --name \"$CLUSTER_NAME\" --region \"$AWS_REGION\" --query 'cluster.resourcesVpcConfig'",
      ],
      fix:
        "Correct the proven API reachability or authorization issue. Avoid exposing a private cluster endpoint publicly merely to work around a node connectivity problem.",
    },

    iptablesSyncFailure: {
      symptoms: [
        "kube-proxy logs report iptables restore or synchronization failures.",
        "Service rules are missing or stale.",
        "A Service has endpoints but its VIP does not route correctly.",
      ],
      investigate: [
        "Active proxy mode and iptables backend",
        "Kernel and netfilter support",
        "Concurrent firewall-management agents",
        "Rule-set changes made by host automation",
        "Rule synchronization error messages",
        "Differences between healthy and affected nodes",
      ],
      commands: [
        "sudo iptables --version",
        "sudo iptables-save",
        "sudo iptables -t nat -S",
        "sudo nft list ruleset",
      ],
      fix:
        "Correct the underlying compatibility or conflicting-rule issue and then verify synchronization. " +
        "Never use iptables -F or broad rule deletion as a generic repair.",
    },

    ipvsInitializationFailure: {
      symptoms: [
        "Proxy initialization reports IPVS errors.",
        "Expected virtual servers or backend servers are absent.",
      ],
      investigate: [
        "Whether IPVS mode is actually configured",
        "Kernel support and required modules",
        "Node OS image differences",
        "Configuration mismatch between add-on and node",
      ],
      commands: [
        "sudo ipvsadm -Ln",
        "sudo lsmod | grep -E 'ip_vs|nf_conntrack'",
        "kubectl get ds kube-proxy -n kube-system -o yaml",
      ],
      fix:
        "Use the supported node image and configuration for the selected mode. " +
        "Do not switch the whole cluster to IPVS solely because the command output is empty.",
    },

    nftablesInteraction: {
      symptoms: [
        "NodePort behavior differs after a node OS or firewall change.",
        "The cluster has nftables rules but expected traffic still fails.",
      ],
      investigate: [
        "Configured proxy mode",
        "Host firewall manager",
        "NodePort address configuration",
        "Packet path and rule counters",
        "Differences between node images",
      ],
      fix:
        "Align firewall and proxy configuration using the supported design for the cluster. " +
        "Do not delete unrelated nftables tables or chains.",
    },

    conntrackPressure: {
      symptoms: [
        "New connections intermittently time out.",
        "Kernel logs report conntrack table exhaustion.",
        "Drops or insertion failures increase during traffic spikes.",
      ],
      investigate: [
        "Current conntrack count and maximum",
        "Drop and insertion-failure counters",
        "Connection churn and short-lived connection volume",
        "Application retry storms",
        "NAT and connection reuse patterns",
      ],
      fix:
        "Address the confirmed source of connection pressure. Evaluate capacity and kernel settings through a reviewed change. " +
        "Increasing the maximum without assessing memory and connection behavior may shift rather than solve the problem.",
    },
  },

  serviceNetworkingInvestigation: {
    sequence: [
      {
        question: "Does the Service have a ClusterIP?",
        command:
          "kubectl get svc -n \"$APP_NAMESPACE\" \"$SERVICE_NAME\" -o wide",
        ifNo:
          "Check whether the Service is headless, whether the name is correct, and whether the application uses the intended Service.",
      },
      {
        question: "Are there ready endpoints?",
        command:
          "kubectl get endpointslice -n \"$APP_NAMESPACE\" -l kubernetes.io/service-name=\"$SERVICE_NAME\" -o yaml",
        ifNo:
          "Check Service selectors, Pod labels, readiness probes, and endpoint readiness conditions.",
      },
      {
        question: "Can the client reach a backend Pod IP?",
        command:
          "curl -sv --connect-timeout 3 \"http://$POD_IP:$TARGET_PORT/health\"",
        ifNo:
          "Investigate Pod routing, application listener, NetworkPolicy, CNI, and node-level networking.",
      },
      {
        question: "Can the client reach the ClusterIP?",
        command:
          "curl -sv --connect-timeout 3 \"http://$SERVICE_IP:$SERVICE_PORT/health\"",
        ifNo:
          "Inspect proxy rules or the alternative Service dataplane, then compare a healthy node.",
      },
      {
        question: "Does the failure occur from every source node?",
        command:
          "kubectl get pods -A -o wide",
        ifNo:
          "Compare the affected node's proxy Pod, rules, kernel, CNI state, and node image with a healthy peer.",
      },
    ],

    importantNotes: [
      "A TCP timeout and a connection refused error indicate different failure patterns.",
      "An HTTP 500 usually means a request reached an application or intermediary that returned an error.",
      "A DNS failure should be tested separately from raw IP connectivity.",
      "A successful test from one Pod does not prove that every node's Service rules are correct.",
      "Use the same source location and protocol when comparing tests.",
    ],
  },

  nodeGroupInvestigation: {
    compare: [
      "AMI or node image ID",
      "Kernel version",
      "Kubernetes kubelet version",
      "kube-proxy image and configuration",
      "Container runtime version",
      "Subnet and availability zone",
      "Security group attachments",
      "Bootstrap and user-data scripts",
      "CNI version and configuration",
      "Local firewall state",
      "Node allocatable resources and pressure conditions",
    ],

    commands: [
      "kubectl get nodes -o wide",
      "kubectl describe node \"$NODE_NAME\"",
      "kubectl get pods -n kube-system -o wide",
      "aws eks describe-nodegroup --cluster-name \"$CLUSTER_NAME\" --nodegroup-name \"$NODEGROUP_NAME\" --region \"$AWS_REGION\"",
    ],

    decision:
      "If only newly launched nodes fail, stop further rollout expansion and compare the new node image, bootstrap, and networking configuration against a healthy node group.",

    nodeDrainWarning:
      "Do not drain a node solely because kube-proxy is crashing. First establish workload availability, PodDisruptionBudgets, " +
      "replacement capacity, local storage constraints, and the operational reason a drain is required.",
  },

  recoveryAndRollback: {
    principles: [
      "Preserve logs and configuration before remediation.",
      "Prefer the smallest change that addresses the confirmed cause.",
      "Change one variable at a time when practical.",
      "Use managed EKS add-on operations for managed add-ons.",
      "Use the source-of-truth repository or GitOps workflow for declarative resources.",
      "Confirm whether a restart will affect active connections or trigger a broad rollout.",
      "Record the owner, approval, start time, and rollback criteria.",
    ],

    recoveryOptions: [
      {
        option: "Correct a configuration error",
        useWhen:
          "Logs or a config diff identify an invalid or incompatible value.",
        steps: [
          "Capture the current configuration.",
          "Compare against the last known-good version.",
          "Validate the corrected configuration.",
          "Apply through the approved management path.",
          "Observe rollout status and traffic behavior.",
        ],
      },
      {
        option: "Recover an EKS managed add-on",
        useWhen:
          "The managed kube-proxy add-on reports an error or a bad update.",
        steps: [
          "Inspect describe-addon output and update history.",
          "Confirm a supported version for the cluster Kubernetes version.",
          "Review configuration values and conflicts.",
          "Use the approved add-on update or rollback procedure.",
          "Verify Pod readiness and Service traffic.",
        ],
        warning:
          "Do not copy a version from an unrelated cluster or Kubernetes minor version. " +
          "The correct rollback path depends on the current and previous add-on state.",
      },
      {
        option: "Targeted kube-proxy restart",
        useWhen:
          "Evidence indicates a recoverable stale synchronization state and a restart is approved.",
        command:
          "kubectl rollout restart daemonset/kube-proxy -n kube-system",
        precautions: [
          "This affects the DaemonSet rollout, not just one Pod.",
          "Review rollout strategy and cluster capacity first.",
          "Preserve logs before the restart.",
          "Monitor node-by-node readiness and Service traffic.",
          "Stop or reassess if errors increase or the rollout fails.",
        ],
      },
      {
        option: "Isolate an unhealthy node",
        useWhen:
          "A node-specific issue causes material impact and healthy capacity is available.",
        steps: [
          "Confirm workload replicas and available capacity.",
          "Assess PodDisruptionBudgets and local storage.",
          "Follow the organization's cordon or drain approval process.",
          "Preserve node diagnostics before replacement if possible.",
          "Replace or repair the node using the supported node-group workflow.",
          "Verify traffic before restoring normal scheduling.",
        ],
      },
    ],

    dangerousShortcuts: [
      {
        command: "sudo iptables -F",
        reason:
          "Can remove firewall and Service rules, causing broad network disruption.",
      },
      {
        command: "sudo iptables -t nat -F",
        reason:
          "Can remove NAT and Service translation rules across the node.",
      },
      {
        command: "sudo conntrack -F",
        reason:
          "Can disrupt tracked connections and does not fix the underlying cause.",
      },
      {
        command: "kubectl delete pods -n kube-system -l k8s-app=kube-proxy",
        reason:
          "Can trigger simultaneous restarts and destroy useful evidence.",
      },
      {
        command: "sudo reboot",
        reason:
          "Can evict workloads, reduce capacity, and hide node-level evidence.",
      },
    ],
  },

  monitoringAndObservability: {
    signals: [
      {
        signal: "kube-proxy Pod restart count",
        purpose: "Detect recurring crashes or unstable rollouts.",
      },
      {
        signal: "DaemonSet desired versus ready count",
        purpose: "Detect nodes without a healthy kube-proxy Pod.",
      },
      {
        signal: "kube-proxy logs",
        purpose: "Detect proxy initialization and synchronization errors.",
      },
      {
        signal: "Service request failure rate",
        purpose: "Correlate component health with customer impact.",
      },
      {
        signal: "Node conntrack utilization and drops",
        purpose: "Detect connection-tracking pressure.",
      },
      {
        signal: "EndpointSlice changes",
        purpose: "Correlate backend membership changes with routing behavior.",
      },
      {
        signal: "CoreDNS error and latency",
        purpose: "Detect DNS symptoms that may accompany Service networking issues.",
      },
    ],

    usefulMetrics: [
      "kubeproxy_sync_proxy_rules_duration_seconds",
      "kubeproxy_sync_proxy_rules_iptables_total",
      "kubeproxy_sync_proxy_rules_iptables_restore_failures_total",
      "kubeproxy_sync_proxy_rules_iptables_partial_restore_failures_total",
      "kubeproxy_sync_proxy_rules_endpoint_changes_total",
    ],

    metricCaveat:
      "Metric availability and stability depend on Kubernetes version and proxy mode. " +
      "Confirm the metrics exposed by the running version before building alerts. " +
      "Do not assume an iptables-specific metric exists or behaves identically in IPVS or nftables mode.",

    alertExamples: [
      {
        name: "KubeProxyDaemonSetNotReady",
        condition:
          "The ready kube-proxy Pod count is lower than the expected count for a sustained interval.",
        response:
          "Identify affected nodes, collect previous logs, and assess Service traffic impact.",
      },
      {
        name: "KubeProxyRestartSpike",
        condition:
          "Restart counts increase rapidly over a short interval.",
        response:
          "Correlate restart timestamps with add-on, node, and configuration changes.",
      },
      {
        name: "ServiceErrorRateIncrease",
        condition:
          "Critical Service request failures exceed the application SLO threshold.",
        response:
          "Run the Pod IP versus ClusterIP test and identify the affected node scope.",
      },
      {
        name: "ConntrackPressure",
        condition:
          "Conntrack utilization is high and corroborating drops or kernel errors are present.",
        response:
          "Investigate connection churn, capacity, and node kernel evidence.",
      },
    ],
  },

  automationAndShellChecks: {
    description:
      "Read-only preflight commands for an incident. Run them individually and preserve output. " +
      "This is not an automated repair script.",

    commands: [
      "set -o pipefail",
      "kubectl config current-context",
      "kubectl get ds kube-proxy -n kube-system -o wide",
      "kubectl get pods -n kube-system -l k8s-app=kube-proxy -o wide",
      "kubectl get nodes -o wide",
      "kubectl get events -n kube-system --sort-by=.metadata.creationTimestamp",
    ],

    optionalBashCapture: `#!/usr/bin/env bash
set -u

: "\${CLUSTER_NAME:?Set CLUSTER_NAME}"
: "\${AWS_REGION:?Set AWS_REGION}"

echo "=== Timestamp ==="
date -Is

echo "=== Kubernetes context ==="
kubectl config current-context || exit 1

echo "=== AWS identity ==="
aws sts get-caller-identity || exit 1

echo "=== EKS cluster ==="
aws eks describe-cluster \\
  --name "$CLUSTER_NAME" \\
  --region "$AWS_REGION" \\
  --query 'cluster.{name:name,status:status,version:version}' || exit 1

echo "=== kube-proxy DaemonSet ==="
kubectl get ds kube-proxy -n kube-system -o wide || exit 1

echo "=== kube-proxy Pods ==="
kubectl get pods -n kube-system \\
  -l k8s-app=kube-proxy -o wide || exit 1

echo "=== Nodes ==="
kubectl get nodes -o wide || exit 1

echo "=== Recent kube-system events ==="
kubectl get events -n kube-system \\
  --sort-by=.metadata.creationTimestamp || exit 1

echo "Preflight collection completed. No resources were changed."
`,

    cautions: [
      "The script performs read-only collection only.",
      "The AWS CLI and kubectl must be installed and configured.",
      "The caller must have permission to read the specified cluster.",
      "Protect captured output according to internal data-handling policy.",
    ],
  },

  changeManagement: {
    beforeChange: [
      "Confirm the target account, cluster, region, and node group.",
      "Capture the current DaemonSet and add-on configuration.",
      "Collect current and previous logs.",
      "Record the suspected root cause and supporting evidence.",
      "Check active deployments and concurrent infrastructure changes.",
      "Confirm application redundancy and traffic capacity.",
      "Obtain production approval where required.",
    ],

    afterChange: [
      "Verify rollout completion.",
      "Verify kube-proxy readiness across expected nodes.",
      "Test Service connectivity from affected nodes.",
      "Verify direct Pod IP and ClusterIP behavior separately.",
      "Verify critical DNS and application dependencies.",
      "Observe customer-facing error rate and latency.",
      "Record the final configuration and change identifier.",
    ],

    rollbackCriteria: [
      "More nodes become unhealthy.",
      "Critical Service error rate rises further.",
      "The add-on rollout stops making progress.",
      "A new configuration error appears.",
      "The change causes a broader networking regression.",
    ],

    rollbackRule:
      "Rollback only to a known-compatible state using the supported management path. " +
      "Do not assume that reverting a Kubernetes or add-on version is always safe or supported.",
  },

  rootCauseAnalysis: {
    method: [
      "Define the first observable failure, not just the time the alert fired.",
      "Separate symptoms from causes.",
      "Compare a failing node with a healthy peer.",
      "Correlate the first failure with configuration, add-on, node image, and traffic changes.",
      "Use logs, rule state, endpoints, and reproducible tests to validate the hypothesis.",
      "Change one relevant variable and rerun the same test.",
      "Document alternative hypotheses and why they were excluded.",
    ],

    example: {
      observation:
        "ClusterIP calls fail from two newly launched nodes, while direct Pod IP calls succeed.",
      evidence: [
        "The Service has ready EndpointSlices.",
        "The application responds on the Pod IP.",
        "kube-proxy logs show rule initialization errors on the affected nodes.",
        "Healthy nodes have a different kernel and node image.",
      ],
      rootCause:
        "The evidence points to a node-image or proxy initialization compatibility issue. " +
        "The exact cause must be confirmed by comparing the configuration and kernel requirements.",
      remediation:
        "Pause expansion of the affected node rollout, restore a supported node configuration, " +
        "and validate the Service path before proceeding.",
      prevention:
        "Add node-image compatibility checks and Service-path smoke tests to the rollout pipeline.",
    },
  },

  prevention: {
    releasePreflight: [
      "Confirm kube-proxy add-on compatibility with the target Kubernetes version.",
      "Review the EKS upgrade and add-on update sequence.",
      "Test the intended node image and kernel in a staging environment.",
      "Verify that the selected proxy mode is supported by the node image.",
      "Validate Service and EndpointSlice behavior before and after rollout.",
      "Run critical ClusterIP, DNS, and NodePort smoke tests where applicable.",
      "Define rollout stop conditions and rollback ownership.",
    ],

    ciChecks: [
      "Validate Kubernetes manifests and DaemonSet configuration.",
      "Review image-tag changes and version compatibility.",
      "Detect unexpected changes to proxy mode and host mounts.",
      "Require approval for production networking changes.",
      "Run post-deployment health checks against critical Services.",
    ],

    operationalReadiness: [
      "Maintain a kube-proxy incident runbook.",
      "Document node access and evidence collection procedures.",
      "Maintain dashboards for DaemonSet readiness and application network errors.",
      "Practice a controlled node-specific failure drill.",
      "Document how to recover managed and self-managed add-ons.",
      "Keep a known-good node image and configuration history.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "",
    startTimeUTC: "",
    detectionTimeUTC: "",
    recoveryTimeUTC: "",
    severity: "",
    cluster: "",
    region: "",
    kubernetesVersion: "",
    kubeProxyVersion: "",
    affectedNodes: [],
    affectedServices: [],
    customerImpact: "",
    symptoms: [],
    recentChanges: [],
    evidence: [],
    rootCause: "",
    contributingFactors: [],
    mitigation: "",
    permanentFix: "",
    validationResults: [],
    rollbackPerformed: false,
    preventionActions: [
      {
        action: "",
        owner: "",
        dueDate: "",
        status: "open",
      },
    ],
  },

  handsOnLabs: [
    {
      title: "Lab 1 — Detect an unhealthy kube-proxy DaemonSet",
      objective:
        "Learn to distinguish a crashing Pod from a healthy DaemonSet.",
      tasks: [
        "Inspect the kube-proxy Pods and DaemonSet.",
        "Record restart counts and node placement.",
        "Describe a failing Pod and inspect its previous logs.",
        "Compare the failure with events from the affected node.",
      ],
      successCriteria:
        "Produce a concise diagnosis supported by logs and Pod status.",
    },
    {
      title: "Lab 2 — Diagnose ClusterIP versus Pod IP",
      objective:
        "Separate application or Pod routing failures from Service translation failures.",
      tasks: [
        "Choose a test Service with known ready endpoints.",
        "Test the backend Pod IP from an approved debug Pod.",
        "Test the Service ClusterIP from the same source.",
        "Repeat from a different node if permitted.",
        "Record which path fails and the next hypothesis.",
      ],
      successCriteria:
        "Explain why a successful direct Pod IP test does not prove ClusterIP routing is healthy.",
    },
    {
      title: "Lab 3 — Investigate missing Service rules",
      objective:
        "Understand how the active proxy mode represents Services and endpoints.",
      tasks: [
        "Identify the configured proxy mode.",
        "Inspect the corresponding rules or virtual servers on an approved test node.",
        "Compare the rule state with Service and EndpointSlice data.",
        "Avoid mutating the rules during the exercise.",
      ],
      successCriteria:
        "Identify whether the expected Service and backend entries exist.",
    },
    {
      title: "Lab 4 — Simulate a safe configuration rollback",
      objective:
        "Practice a reviewed change workflow without improvising production fixes.",
      tasks: [
        "Use a non-production cluster.",
        "Capture the current add-on or DaemonSet configuration.",
        "Introduce a controlled, reversible test change.",
        "Observe the impact and collect logs.",
        "Restore the known-good configuration using the supported workflow.",
        "Verify Service connectivity after restoration.",
      ],
      successCriteria:
        "Produce a before-and-after diff, recovery evidence, and a short incident report.",
    },
    {
      title: "Lab 5 — Build a node-level comparison",
      objective:
        "Find node-specific networking drift.",
      tasks: [
        "Select one healthy and one test node.",
        "Compare kernel version, image, proxy Pod state, and rules.",
        "Compare CNI health and node events.",
        "List confirmed differences separately from assumptions.",
      ],
      successCriteria:
        "Produce an evidence-based root-cause hypothesis and a safe next step.",
    },
  ],

  interviewQuestions: [
    {
      question: "What does kube-proxy do in an EKS cluster?",
      answer:
        "It normally maintains node-level rules that implement Kubernetes Service forwarding. " +
        "The exact mechanism depends on proxy mode and the cluster's networking implementation.",
    },
    {
      question: "Does kube-proxy crashing immediately stop all traffic?",
      answer:
        "Not necessarily. Existing rules may continue to handle some traffic, but Service-rule synchronization can stop. " +
        "Impact depends on the rule state, traffic pattern, and dataplane.",
    },
    {
      question: "How do you separate ClusterIP and Pod networking failures?",
      answer:
        "Compare direct Pod IP access with ClusterIP access from the same source, " +
        "then inspect endpoints, proxy rules, CNI, and policies.",
    },
    {
      question: "What is the first command for a kube-proxy CrashLoopBackOff?",
      answer:
        "Start with kubectl describe pod and inspect current and previous logs. " +
        "The exact cause should be determined from the exit reason and error messages.",
    },
    {
      question: "Why inspect EndpointSlices?",
      answer:
        "They show the backend addresses and readiness information that Service routing is expected to use.",
    },
    {
      question: "How do you diagnose a node-specific failure?",
      answer:
        "Compare the affected node with a healthy peer for kernel, node image, proxy configuration, " +
        "local rules, CNI state, and node events.",
    },
    {
      question: "When would you restart the kube-proxy DaemonSet?",
      answer:
        "Only after evidence supports a recoverable synchronization issue and the rollout has been assessed and approved.",
    },
    {
      question: "Why is flushing iptables dangerous?",
      answer:
        "It can remove Service translation and host firewall rules, causing wider disruption than the original incident.",
    },
    {
      question: "How can conntrack affect Service connectivity?",
      answer:
        "Connection-tracking pressure or related kernel errors can disrupt new connections. " +
        "Confirm counters and kernel evidence rather than assuming high utilization alone is the root cause.",
    },
    {
      question: "What should be validated after recovery?",
      answer:
        "Pod and DaemonSet health, ready endpoints, ClusterIP connectivity, direct Pod IP connectivity, " +
        "DNS, external traffic where applicable, and customer-facing error rates.",
    },
  ],

  completionChecklist: [
    "Correct cluster, AWS identity, and region verified",
    "Incident severity and customer impact documented",
    "Affected nodes and Services identified",
    "Current and previous kube-proxy logs captured",
    "DaemonSet and add-on state checked",
    "Service and EndpointSlice state checked",
    "Pod IP versus ClusterIP behavior compared",
    "Active proxy mode identified",
    "Relevant kernel rules inspected safely",
    "CNI and AWS network controls considered",
    "Root cause supported by evidence",
    "Approved remediation applied",
    "Rollback criteria documented",
    "Critical Service paths validated",
    "Monitoring returned to baseline",
    "Incident report and prevention actions recorded",
  ],

  references: [
    {
      title: "Kubernetes — Debug Services",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/",
      use:
        "Service endpoints, kube-proxy logs, and proxy-rule troubleshooting.",
    },
    {
      title: "Kubernetes — kube-proxy command-line reference",
      url: "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/",
      use:
        "Proxy modes and supported command-line options.",
    },
    {
      title: "Kubernetes — Metrics reference",
      url: "https://kubernetes.io/docs/reference/instrumentation/metrics/",
      use:
        "Available Kubernetes component metrics.",
    },
    {
      title: "AWS — Configure IPVS kube-proxy mode in Amazon EKS",
      url: "https://repost.aws/knowledge-center/eks-configure-ipvs-kube-proxy",
      use:
        "IPVS prerequisites and EKS add-on configuration considerations.",
    },
    {
      title: "AWS — Troubleshoot unhealthy load balancer targets in EKS",
      url: "https://www.repost.aws/knowledge-center/eks-troubleshoot-unhealthy-targets-nlb",
      use:
        "Load balancer and Service traffic troubleshooting.",
    },
    {
      title: "Amazon EKS Best Practices Guide",
      url: "https://docs.aws.amazon.com/eks/latest/best-practices/",
      use:
        "Operational best practices for EKS networking and cluster management.",
    },
  ],
} as const;

export default kubeProxyCrashGuide;
