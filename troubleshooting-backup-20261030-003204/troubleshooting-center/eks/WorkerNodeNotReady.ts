
export const workerNodeNotReadyGuide = {
  id: "eks-worker-node-not-ready",
  title: "EKS Worker Node NotReady",
  category: "Amazon EKS",
  severity: ["SEV-1", "SEV-2", "SEV-3"],
  summary:
    "Diagnose and safely recover EKS worker nodes that report " +
    "NotReady or Unknown without causing avoidable workload disruption.",

  productionWorkflow: {
    incidentScenario: {
      title: "Node group suddenly loses healthy workers",
      symptoms: [
        "kubectl get nodes reports one or more NotReady nodes",
        "Pods remain Pending or are evicted",
        "Deployment replicas become unavailable",
        "Node group reports health issues or replacement instances fail",
        "Application latency, errors, or capacity alerts increase",
      ],
      possibleTriggers: [
        "Recent EKS, AMI, node group, or add-on upgrade",
        "Security group, route table, NACL, DNS, or proxy change",
        "Amazon VPC CNI configuration or IAM permission change",
        "Disk exhaustion, memory pressure, CPU saturation, or PID exhaustion",
        "Kubelet or container runtime failure",
        "Subnet IP exhaustion or EC2 instance capacity problems",
        "Bad launch template, bootstrap configuration, or custom AMI",
      ],
    },

    impactAndSeverity: {
      assess: [
        "Which cluster, region, account, and environment are affected?",
        "How many nodes are NotReady compared with total nodes?",
        "Are nodes from one node group, one Availability Zone, or all groups affected?",
        "Are customer-facing replicas available and passing health checks?",
        "Are StatefulSets, databases, or local-storage workloads on affected nodes?",
        "Are deployments blocked, autoscaling, or evictions still in progress?",
      ],
      severityGuide: {
        SEV1:
          "Customer-facing service unavailable, broad capacity loss, " +
          "or critical stateful workloads at risk.",
        SEV2:
          "Significant capacity reduction, elevated errors, or " +
          "deployment and scaling impaired.",
        SEV3:
          "Isolated node issue with sufficient healthy capacity and " +
          "no observed customer impact.",
      },
      rule:
        "Use the organization's incident policy. Severity depends on actual " +
        "service impact, not simply the number of NotReady nodes.",
    },

    safetyChecks: [
      "Verify AWS account, role, region, cluster, node group, and kube context.",
      "Check whether a change freeze or incident approval is required.",
      "Capture current node, pod, event, and node-group state before changes.",
      "Check remaining capacity, PodDisruptionBudgets, and replica health.",
      "Identify StatefulSets, local PVs, DaemonSets, and single-replica workloads.",
      "Do not reboot, drain, terminate, or replace nodes before understanding impact.",
      "Do not delete aws-node, kube-proxy, or critical system pods indiscriminately.",
      "Never expose kubeconfigs, tokens, credentials, or unredacted secret values.",
    ],
  },

  diagnosticSequence: [
    {
      step: 1,
      name: "Confirm the target",
      commands: [
        "aws sts get-caller-identity",
        "aws configure get region",
        "kubectl config current-context",
        "kubectl cluster-info",
        "kubectl get nodes -o wide",
      ],
      interpretation: {
        unexpectedAccountOrContext:
          "Stop. Correct the target before running any changes.",
        multipleNotReadyNodes:
          "Check for a shared cause such as networking, IAM, upgrades, or an AZ issue.",
        singleNotReadyNode:
          "Compare that instance with healthy nodes in the same node group.",
      },
    },
    {
      step: 2,
      name: "Read the exact node conditions",
      commands: [
        "kubectl describe node NODE_NAME",
        "kubectl get node NODE_NAME -o yaml",
        "kubectl get events -A --sort-by=.metadata.creationTimestamp",
        "kubectl get pods -A -o wide",
      ],
      inspect: [
        "Ready condition status, reason, message, and transition time",
        "MemoryPressure, DiskPressure, PIDPressure, NetworkUnavailable",
        "InternalIP, providerID, capacity, allocatable, and taints",
        "Node lease / heartbeat freshness where available",
        "Recent scheduling failures, evictions, and container errors",
      ],
      interpretation: {
        readyFalse:
          "The kubelet has reported that the node is unhealthy.",
        readyUnknown:
          "The control plane has not received a recent healthy node status; " +
          "investigate connectivity, host availability, and kubelet.",
        diskMemoryOrPidPressure:
          "Investigate the specific resource signal before restarting services.",
      },
    },
    {
      step: 3,
      name: "Determine blast radius",
      commands: [
        "kubectl get nodes -o wide",
        "kubectl get pods -A --field-selector spec.nodeName=NODE_NAME -o wide",
        "kubectl get pdb -A",
        "kubectl get deploy,statefulset -A",
      ],
      compare: [
        "One node versus entire node group",
        "One Availability Zone versus multiple AZs",
        "New nodes versus existing nodes",
        "Affected workload replicas versus healthy replicas",
        "Incident start time versus deployment or infrastructure changes",
      ],
    },
    {
      step: 4,
      name: "Inspect the EKS node group and EC2 instance",
      commands: [
        "aws eks describe-nodegroup --cluster-name CLUSTER --nodegroup-name NODEGROUP --region REGION",
        "aws eks describe-cluster --name CLUSTER --region REGION",
        "aws ec2 describe-instances --instance-ids INSTANCE_ID --region REGION",
        "aws autoscaling describe-auto-scaling-groups --region REGION",
      ],
      inspect: [
        "Node group health issues and scaling configuration",
        "EC2 instance state, status checks, subnet, and Availability Zone",
        "AMI ID, launch template version, instance type, and instance profile",
        "Desired, minimum, and maximum Auto Scaling capacity",
        "Recent scaling activities and failed instance launches",
      ],
      interpretation: {
        instanceStoppedOrFailedChecks:
          "Investigate EC2 state and system/instance status checks.",
        nodeGroupHealthIssue:
          "Use the reported health issue to select the next diagnostic branch.",
        repeatedReplacementFailure:
          "Investigate shared bootstrap, IAM, AMI, subnet IP, and endpoint access.",
      },
    },
    {
      step: 5,
      name: "Check system DaemonSets and CNI",
      commands: [
        "kubectl get pods -n kube-system -o wide",
        "kubectl get daemonset -n kube-system",
        "kubectl describe daemonset aws-node -n kube-system",
        "kubectl describe daemonset kube-proxy -n kube-system",
        "kubectl get pods -n kube-system -l k8s-app=aws-node -o wide",
      ],
      inspect: [
        "Is aws-node present and healthy on the affected node?",
        "Is kube-proxy present and healthy where expected?",
        "Are system pods Pending, CrashLoopBackOff, or repeatedly restarting?",
        "Do logs show IPAMD, IP allocation, permissions, or network errors?",
        "Are add-on versions compatible with the cluster version?",
      ],
      logCommands: [
        "kubectl logs -n kube-system AWS_NODE_POD --all-containers --since=30m",
        "kubectl logs -n kube-system KUBE_PROXY_POD --all-containers --since=30m",
      ],
      note:
        "Replace placeholders with actual pod names. Check the previous container " +
        "logs with --previous if a container restarted. Not every NotReady cause " +
        "is a CNI issue; correlate logs with node conditions.",
    },
    {
      step: 6,
      name: "Verify control-plane connectivity",
      fromWorkerNode: [
        "getent hosts CLUSTER_ENDPOINT_HOSTNAME",
        "nc -vz CLUSTER_ENDPOINT_HOSTNAME 443",
        "ip route",
        "ip address",
        "cat /etc/resolv.conf",
      ],
      verify: [
        "The endpoint hostname resolves correctly",
        "The worker can reach the configured API endpoint on TCP 443",
        "Private endpoint access, routes, security groups, and NACLs are correct",
        "Proxy settings do not block or misroute API traffic",
        "DHCP options and DNS configuration are appropriate",
      ],
      note:
        "Run host commands through an approved SSM Session Manager session or " +
        "authorized SSH. A successful TCP connection alone does not prove that " +
        "TLS, authentication, or Kubernetes authorization is working.",
    },
    {
      step: 7,
      name: "Inspect kubelet and container runtime",
      commands: [
        "sudo systemctl status kubelet --no-pager",
        "sudo journalctl -u kubelet --since '30 minutes ago' --no-pager",
        "sudo systemctl status containerd --no-pager",
        "sudo journalctl -u containerd --since '30 minutes ago' --no-pager",
        "sudo crictl info",
        "sudo crictl ps -a",
      ],
      inspect: [
        "Kubelet service failures, repeated restarts, or registration errors",
        "Container runtime socket or CRI communication failures",
        "PLEG not healthy and slow container operations",
        "Authentication, certificate, DNS, or API timeout messages",
        "Recent AMI, bootstrap, systemd, or configuration changes",
      ],
      caution:
        "Use the runtime service name present on the actual AMI. Do not assume " +
        "all EKS images have identical service units or bootstrap mechanisms.",
    },
    {
      step: 8,
      name: "Check disk, memory, CPU, and PID pressure",
      commands: [
        "df -h",
        "df -i",
        "free -m",
        "uptime",
        "ps -eo pid,comm,%cpu,%mem --sort=-%cpu | head",
        "sudo journalctl -k --since '30 minutes ago' --no-pager",
      ],
      inspect: [
        "Root and container filesystem free space",
        "Inode exhaustion even when disk bytes remain available",
        "OOM-killer messages and memory saturation",
        "High load, CPU starvation, or slow disk I/O",
        "Excessive processes or PID exhaustion",
        "Container image growth, logs, and ephemeral storage usage",
      ],
      caution:
        "Do not blindly delete container directories, logs, or runtime state. " +
        "Identify the owner and use the supported cleanup process.",
    },
    {
      step: 9,
      name: "Verify node IAM and bootstrap",
      checks: [
        "Confirm the EC2 instance profile and intended node IAM role.",
        "Review EKS access entries or aws-auth mapping as applicable.",
        "Inspect kubelet logs for Unauthorized, Forbidden, or registration errors.",
        "Check the node role's required permissions and recent policy changes.",
        "Check cloud-init, user-data, nodeadm, or bootstrap logs as applicable.",
        "Confirm cluster endpoint, CA data, DNS, and node registration settings.",
      ],
      commands: [
        "aws ec2 describe-iam-instance-profile-associations --filters Name=instance-id,Values=INSTANCE_ID --region REGION",
        "aws eks list-access-entries --cluster-name CLUSTER --region REGION",
        "sudo cloud-init status --long",
        "sudo journalctl -u cloud-init --since '2 hours ago' --no-pager",
      ],
      note:
        "Access-entry commands depend on the cluster's authentication mode. " +
        "Use the appropriate supported mapping method and never print credentials.",
    },
    {
      step: 10,
      name: "Check subnet IPs and VPC CNI capacity",
      checks: [
        "Review subnet AvailableIpAddressCount.",
        "Review ENI and per-instance network limits.",
        "Inspect VPC CNI warm IP / prefix delegation settings.",
        "Check aws-node logs for IPAMD and address allocation errors.",
        "Compare Pod IP assignment failures with the incident timeline.",
      ],
      commands: [
        "aws ec2 describe-subnets --subnet-ids SUBNET_ID --region REGION",
        "aws ec2 describe-network-interfaces --filters Name=attachment.instance-id,Values=INSTANCE_ID --region REGION",
      ],
      note:
        "Do not change CNI environment variables or IAM policies blindly. " +
        "Validate the actual failure signature, subnet design, and add-on configuration.",
    },
    {
      step: 11,
      name: "Correlate recent changes",
      compare: [
        "EKS control-plane or node group upgrade",
        "AMI or launch template change",
        "Security group, route, NACL, or DNS change",
        "IAM policy or EKS authentication change",
        "VPC CNI or kube-proxy add-on update",
        "Cluster autoscaler or Karpenter changes",
      ],
      principle:
        "A change that precedes the incident is a lead, not proof. " +
        "Confirm it with logs, condition messages, and a healthy-node comparison.",
    },
  ],

  rootCauseMatrix: [
    {
      symptom: "Ready=Unknown; heartbeat stale",
      likelyCauses: [
        "Instance unavailable",
        "Kubelet stopped or hung",
        "Node-to-control-plane connectivity lost",
      ],
      nextChecks: [
        "EC2 status checks",
        "SSM reachability",
        "Kubelet logs",
        "DNS, endpoint, route, and security groups",
      ],
    },
    {
      symptom: "Ready=False; NetworkUnavailable or CNI errors",
      likelyCauses: [
        "VPC CNI unhealthy",
        "IP allocation failure",
        "Network configuration problem",
      ],
      nextChecks: [
        "aws-node logs",
        "Subnet IP availability",
        "CNI IAM permissions",
        "Routes and security groups",
      ],
    },
    {
      symptom: "PLEG is not healthy",
      likelyCauses: [
        "Container runtime stalled",
        "High CPU or I/O latency",
        "Memory pressure or excessive container churn",
      ],
      nextChecks: [
        "kubelet and containerd logs",
        "Kernel OOM messages",
        "CPU, memory, and disk metrics",
      ],
    },
    {
      symptom: "DiskPressure=True",
      likelyCauses: [
        "Filesystem full",
        "Inode exhaustion",
        "Excessive images, logs, or ephemeral storage",
      ],
      nextChecks: [
        "df -h and df -i",
        "Container and application log growth",
        "Ephemeral-storage requests and limits",
      ],
    },
    {
      symptom: "New instances launch but never join",
      likelyCauses: [
        "Invalid bootstrap or AMI",
        "Incorrect node IAM/authentication",
        "API endpoint unreachable",
        "DNS or cluster configuration mismatch",
      ],
      nextChecks: [
        "Node group health issues",
        "cloud-init or nodeadm logs",
        "Instance profile and authentication mode",
        "Endpoint reachability",
      ],
    },
    {
      symptom: "Only one AZ or subnet affected",
      likelyCauses: [
        "Subnet IP exhaustion",
        "AZ-specific capacity issue",
        "Subnet route or NACL difference",
      ],
      nextChecks: [
        "Subnet available IPs",
        "EC2 launch failures",
        "Route and NACL comparison",
      ],
    },
  ],

  recoveryPlan: {
    beforeAnyChange: [
      "Record the original node conditions, events, pods, and timestamps.",
      "Confirm healthy capacity and the availability of replacement capacity.",
      "Identify PDBs, local storage, StatefulSets, and critical DaemonSets.",
      "Get incident/change approval when required.",
    ],
    decisionRules: [
      {
        finding: "Transient kubelet failure; host otherwise healthy",
        action:
          "After evidence collection, consider a controlled kubelet restart " +
          "under the approved runbook and monitor node registration.",
      },
      {
        finding: "Container runtime unhealthy",
        action:
          "Determine why the runtime failed. Restart only through an approved " +
          "procedure after assessing impact to workloads on that host.",
      },
      {
        finding: "CNI or subnet IP exhaustion",
        action:
          "Correct the proven IP capacity, IAM, or CNI configuration issue; " +
          "validate with a controlled Pod networking test.",
      },
      {
        finding: "Disk pressure",
        action:
          "Identify and safely clean supported sources of consumption, or " +
          "replace/resize capacity through the approved node lifecycle process.",
      },
      {
        finding: "Bad AMI, launch template, or bootstrap rollout",
        action:
          "Stop further rollout and use the reviewed last-known-good configuration " +
          "or controlled node replacement strategy.",
      },
      {
        finding: "Instance unhealthy or root cause not safely recoverable",
        action:
          "Verify replacement capacity, drain safety, and workload redundancy " +
          "before replacing the instance or node.",
      },
    ],
    drainSafety: [
      "Check PodDisruptionBudgets and whether eviction is permitted.",
      "Check local PVs, emptyDir data, StatefulSets, and singleton workloads.",
      "Do not assume force deletion makes the underlying workload safe.",
      "Use the organization's approved drain and node replacement procedure.",
      "For unreachable hosts, account for the possibility that workloads may still run.",
    ],
    rollback:
      "Rollback the specific recent infrastructure, AMI, add-on, or configuration " +
      "change only after confirming that it caused the incident and that the " +
      "previous version is compatible with the current cluster.",
  },

  postRecoveryValidation: [
    "kubectl get nodes -o wide shows the expected Ready nodes.",
    "Node conditions no longer report active pressure or network failure.",
    "aws-node and kube-proxy are healthy on affected nodes where applicable.",
    "Previously affected Pods are healthy and application replicas are available.",
    "Service endpoints, application health checks, and error rates recover.",
    "Autoscaling and node group desired/actual capacity are stable.",
    "No repeated kubelet restarts, evictions, or NotReady transitions occur.",
    "Monitor for an agreed observation window before closing the incident.",
  ],

  prevention: [
    "Alert on NodeNotReady, node condition transitions, and node group health issues.",
    "Monitor node CPU, memory, disk, inode, PID, and network metrics.",
    "Monitor subnet IP availability and Pod IP allocation failures.",
    "Test node AMI, bootstrap, and add-on changes in a staging environment.",
    "Use rolling node replacement with capacity and disruption safeguards.",
    "Keep node IAM permissions and EKS authentication mappings under review.",
    "Maintain tested SSM access and a documented node debugging runbook.",
    "Review PDBs, replica counts, topology spread, and multi-AZ resilience.",
    "Retain useful kubelet, container runtime, and control-plane logs.",
  ],

  incidentReportTemplate: {
    title: "EKS Worker Node NotReady Incident",
    fields: [
      "Incident ID / severity / incident commander",
      "AWS account alias / region / cluster / node group",
      "First detected time / recovery time / total duration",
      "Affected nodes / AZs / services / customer impact",
      "Node conditions and relevant event messages",
      "Evidence and timeline of recent changes",
      "Confirmed root cause and supporting evidence",
      "Mitigation and recovery steps",
      "Validation results and monitoring window",
      "Preventive actions / owner / due date",
    ],
  },

  interviewQuestions: [
    {
      question: "What is the difference between Ready=False and Ready=Unknown?",
      answer:
        "False indicates that the node reports unhealthy status. Unknown indicates " +
        "the control plane has not received a recent status update.",
    },
    {
      question: "How do you troubleshoot a NotReady node without SSH?",
      answer:
        "Start with kubectl describe node, events, system pods, EC2 state, node " +
        "group health, and available logs. Use SSM if configured and authorized.",
    },
    {
      question: "Why can aws-node affect node readiness or Pod networking?",
      answer:
        "The VPC CNI manages Pod networking and IP allocation. Its health and " +
        "permissions can affect Pod networking and, depending on the failure, node readiness.",
    },
    {
      question: "What does PLEG is not healthy suggest?",
      answer:
        "Investigate kubelet/container runtime responsiveness, CPU, memory, I/O, " +
        "and container churn instead of assuming a network-only issue.",
    },
    {
      question: "Would you immediately drain a NotReady node?",
      answer:
        "No. First assess workload health, remaining capacity, PDBs, local storage, " +
        "and whether the host is reachable. Then follow the approved recovery process.",
    },
    {
      question: "How do you distinguish a node issue from a subnet issue?",
      answer:
        "Compare affected nodes across AZs and subnets, inspect available IPs, " +
        "EC2 launch errors, CNI allocation logs, and network configuration.",
    },
    {
      question: "What proves the incident is resolved?",
      answer:
        "Healthy node conditions alone are insufficient. Verify workloads, networking, " +
        "service health, capacity, and stable behavior over an observation window.",
    },
  ],
} as const;

export default workerNodeNotReadyGuide;
