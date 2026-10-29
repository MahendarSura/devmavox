
export const eksUpgradeFailureGuide = {
  id: "eks-upgrade-failure",
  title: "Amazon EKS Upgrade Failure",
  category: "Amazon EKS",
  severity: "High",
  summary:
    "Production troubleshooting for failed or stalled EKS Kubernetes control-plane upgrades, managed and self-managed node upgrades, add-on compatibility, API removals, admission webhooks, capacity, and post-upgrade regressions.",

  metadata: {
    platform: "Amazon EKS",
    audience: [
      "SRE",
      "DevOps Engineers",
      "Platform Engineers",
      "Cloud Engineers",
      "Kubernetes Administrators",
      "Incident Commanders",
    ],
    symptoms: [
      "EKS UpdateClusterVersion fails",
      "Cluster remains UPDATING",
      "Upgrade update status is Failed",
      "Deprecated Kubernetes API usage detected",
      "Managed node group update fails",
      "Nodes remain on an older Kubernetes version",
      "EKS add-on becomes DEGRADED",
      "CoreDNS or kube-proxy fails after upgrade",
      "VPC CNI pods fail or networking degrades",
      "Pods remain Pending during node replacement",
      "PodDisruptionBudget blocks eviction",
      "Admission webhook requests time out",
      "Applications fail after the control plane upgrade",
      "Deployment pipelines fail because API schemas changed",
      "Cluster health degrades during a rolling node update",
    ],
    placeholders: {
      cluster: "<cluster-name>",
      region: "<aws-region>",
      profile: "<aws-profile>",
      account: "<aws-account-id>",
      sourceVersion: "<current-kubernetes-version>",
      targetVersion: "<target-kubernetes-version>",
      nodegroup: "<managed-nodegroup-name>",
      addon: "<addon-name>",
      namespace: "<namespace>",
      incidentId: "<incident-id>",
    },
    principles: [
      "An EKS control-plane version upgrade is not the same operation as a node or add-on upgrade.",
      "EKS does not automatically upgrade managed node groups or EKS add-ons merely because the control plane was upgraded.",
      "Upgrade one Kubernetes minor version at a time, following the supported EKS upgrade path.",
      "Do not assume that an in-place control-plane downgrade is available.",
      "Treat production upgrades as staged infrastructure changes with explicit validation gates.",
      "Never use force, delete workloads, or relax disruption safeguards as the first response to an upgrade failure.",
    ],
  },

  productionIncident: {
    title: "Production cluster upgrade fails during a release window",
    scenario:
      "The platform team begins an EKS minor-version upgrade during an approved maintenance window. The control-plane update reports an error, or the control plane succeeds but node replacement stalls. Some workloads are healthy, while other workloads experience Pending pods, unavailable replicas, DNS failures, or deployment errors.",

    impactAssessment: [
      "Identify the exact cluster, AWS account, region, environment, and target version.",
      "Determine whether the control plane, managed node groups, self-managed nodes, or add-ons are failing.",
      "Check whether customer-facing workloads are degraded or only administrative operations are affected.",
      "Record the last successful deployment, the first failing operation, and the update ID.",
      "Identify workloads already rescheduled, nodes already replaced, and add-ons already changed.",
      "Determine whether the upgrade has affected all availability zones or only a subset.",
      "Check whether the deployment pipeline has already applied application changes before the upgrade failure.",
      "Pause further upgrade stages when the next action could increase the blast radius.",
      "Assign a technical owner and incident commander when production impact warrants it.",
    ],

    severity: [
      {
        level: "SEV-1",
        condition:
          "Critical customer traffic is broadly unavailable, multiple production workloads are failing, or the cluster has lost critical service capacity.",
        action:
          "Declare an incident, freeze unrelated changes, stabilize the data plane, and engage the responsible application, network, and cloud teams.",
      },
      {
        level: "SEV-2",
        condition:
          "Production upgrade is blocked or a subset of important workloads is degraded, but most customer traffic remains available.",
        action:
          "Pause the upgrade, preserve update evidence, and establish a safe recovery plan.",
      },
      {
        level: "SEV-3",
        condition:
          "Nonproduction upgrade fails without material customer impact.",
        action:
          "Reproduce the failure in a controlled environment and remediate before scheduling production.",
      },
    ],

    safetyChecks: [
      "Verify AWS identity with sts get-caller-identity.",
      "Verify cluster name, account, region, source version, and intended target version.",
      "Read the current cluster status and recent update history before retrying.",
      "Do not start a second conflicting cluster update while another update is active.",
      "Do not assume an EKS control-plane downgrade is possible.",
      "Do not force-delete Pods to bypass a PDB without a reviewed availability decision.",
      "Do not update every add-on and every node group simultaneously.",
      "Do not drain all nodes in an availability zone at once.",
      "Do not delete the cluster to recover a failed in-place upgrade.",
      "Confirm that backups and application recovery procedures are current.",
      "Confirm capacity exists to place replacement Pods before evicting healthy replicas.",
      "Keep emergency IAM grants narrow, audited, and time-bound.",
      "Preserve timestamps, update IDs, events, and sanitized command output.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm AWS identity and execution context",
      objective:
        "Prevent troubleshooting the wrong cluster or account.",
      commands: [
        "aws sts get-caller-identity --profile <aws-profile>",
        "aws configure list --profile <aws-profile>",
        "aws --version",
        "kubectl version --client",
      ],
      interpret: [
        {
          output: "The AWS account or assumed role is unexpected.",
          meaning:
            "The shell, SSO session, CI credentials, or profile is targeting a different environment.",
          next:
            "Stop all mutation commands. Select the approved identity and repeat verification.",
        },
        {
          output: "ExpiredToken or SSO authentication failure.",
          meaning:
            "The credential chain failed before cluster-level diagnosis.",
          next:
            "Refresh the approved session and confirm the resulting caller identity.",
        },
        {
          output: "Identity is correct.",
          meaning:
            "Proceed to cluster metadata and update history.",
          next: "Run the read-only EKS metadata commands.",
        },
      ],
      evidence: [
        "Incident ID",
        "AWS account ID",
        "Region",
        "Assumed role ARN",
        "Pipeline execution ID",
        "Timestamp in UTC",
      ],
    },

    {
      step: 2,
      title: "Capture cluster version and health",
      objective:
        "Establish whether the control plane has changed and whether the cluster is active.",
      commands: [
        "aws eks describe-cluster --name <cluster-name> --region <aws-region> --profile <aws-profile> --query 'cluster.{name:name,status:status,version:version,platformVersion:platformVersion,endpoint:endpoint,createdAt:createdAt,health:health}' --output json",
        "kubectl config current-context",
        "kubectl get --raw=/version",
        "kubectl get nodes -o wide",
        "kubectl get pods -A",
      ],
      interpret: [
        {
          output: "Cluster status is UPDATING.",
          meaning:
            "An update is in progress or the cluster reports an update state that needs investigation.",
          next:
            "Inspect update history and update details. Avoid initiating a conflicting version change.",
        },
        {
          output: "Cluster status is ACTIVE and version equals the target.",
          meaning:
            "The control-plane version change may have completed; node and add-on compatibility still require validation.",
          next:
            "Inspect nodes, add-ons, events, and workload health.",
        },
        {
          output: "kubectl cannot connect, but describe-cluster succeeds.",
          meaning:
            "AWS control-plane metadata access works, while the Kubernetes API client path may be broken.",
          next:
            "Separate endpoint connectivity, authentication, and authorization from the upgrade lifecycle.",
        },
        {
          output: "The Kubernetes API responds but workloads are degraded.",
          meaning:
            "The incident may be a post-upgrade compatibility or data-plane problem rather than an unfinished control-plane update.",
          next:
            "Inspect node readiness, add-on health, events, admission webhooks, and application metrics.",
        },
      ],
    },

    {
      step: 3,
      title: "Inspect EKS update history",
      objective:
        "Find the failed operation and its specific error.",
      commands: [
        "aws eks list-updates --name <cluster-name> --region <aws-region> --profile <aws-profile> --max-results 20 --output json",
        "aws eks describe-update --name <cluster-name> --region <aws-region> --update-id <update-id> --profile <aws-profile> --output json",
      ],
      interpret: [
        {
          output: "Update status is Failed.",
          meaning:
            "The update object contains the most useful initial failure evidence, including errors and update parameters.",
          next:
            "Record the update ID and every error code/message. Map the message to the matching diagnostic branch.",
        },
        {
          output: "Update status is InProgress.",
          meaning:
            "The update has not reached a terminal state.",
          next:
            "Poll at a reasonable interval, inspect the latest status, and avoid launching a duplicate update.",
        },
        {
          output: "The update ID cannot be found.",
          meaning:
            "The wrong cluster, region, or update ID may have been supplied, or the operation history was not captured correctly.",
          next:
            "Recheck the cluster identity and list-updates output.",
        },
        {
          output: "No recent version update appears.",
          meaning:
            "The failing operation may instead be an add-on, node group, infrastructure, or application rollout update.",
          next:
            "Inspect the pipeline stage and query the relevant node-group or add-on update history.",
        },
      ],
      safety:
        "Do not rerun the update simply because the pipeline step failed. First determine whether the AWS operation is still active or has already completed.",
    },

    {
      step: 4,
      title: "Review EKS upgrade insights",
      objective:
        "Identify API usage, health, or compatibility findings that may affect the target version.",
      commands: [
        "aws eks list-insights --cluster-name <cluster-name> --region <aws-region> --profile <aws-profile> --output json",
        "aws eks list-insights --cluster-name <cluster-name> --region <aws-region> --profile <aws-profile> --filter categories=UPGRADE_READINESS,statuses=ERROR --output json",
      ],
      followUp:
        "For an individual finding, use aws eks describe-insight with the cluster name, region, and returned insight ID.",
      interpret: [
        {
          output: "An upgrade insight reports ERROR.",
          meaning:
            "A specific upgrade-readiness issue requires investigation before proceeding.",
          next:
            "Read the finding, affected resource, API details, and remediation recommendation. Confirm the issue in the cluster or manifests.",
        },
        {
          output: "An insight reports WARNING.",
          meaning:
            "The finding may require planning or remediation even if it is not currently blocking the update.",
          next:
            "Assess whether the target version removes or changes the relevant API or behavior.",
        },
        {
          output: "An insight reports UNKNOWN.",
          meaning:
            "The check could not determine a conclusive state.",
          next:
            "Investigate the underlying API usage or compatibility directly. Do not treat UNKNOWN as proof of safety.",
        },
        {
          output: "No issue is reported.",
          meaning:
            "The checks did not detect the specific problems they cover; this is not a guarantee that all workloads are compatible.",
          next:
            "Continue static manifest analysis, integration testing, and add-on compatibility verification.",
        },
      ],
      note:
        "Insight data refreshes periodically. After fixing a finding, request a refresh where supported and verify the updated finding before relying on it.",
    },

    {
      step: 5,
      title: "Detect deprecated and removed API usage",
      objective:
        "Find manifests, controllers, Helm charts, and clients that call APIs unavailable in the target Kubernetes version.",
      commands: [
        "kubectl api-resources",
        "kubectl get --raw /metrics | grep -E 'apiserver_requested_deprecated_apis|apiserver_request_total'",
        "kubectl get events -A --sort-by=.lastTimestamp",
        "helm list -A",
        "grep -R -nE 'apiVersion: (extensions/v1beta1|apps/v1beta1|apps/v1beta2|policy/v1beta1|networking.k8s.io/v1beta1)' ./",
      ],
      tools: [
        "Use a version-aware manifest scanner such as kubent or Pluto where appropriate.",
        "Render Helm charts before scanning them.",
        "Inspect Kustomize output, generated manifests, and operator-managed resources.",
        "Review API audit logs when enabled and available.",
        "Inspect controllers and CI clients that may submit removed API versions.",
      ],
      interpret: [
        {
          output: "A manifest uses an API removed by the target version.",
          meaning:
            "The resource may fail to apply after the upgrade even if the control-plane upgrade itself succeeds.",
          next:
            "Migrate the manifest and client to the supported API, then validate schema and behavior in a compatible test cluster.",
        },
        {
          output: "The grep command returns no matches.",
          meaning:
            "The search covered only the listed patterns and the current directory; generated manifests and external clients may still use removed APIs.",
          next:
            "Scan rendered release artifacts, charts, operator manifests, and audit evidence.",
        },
        {
          output: "Deprecated API metrics are unavailable.",
          meaning:
            "The metrics endpoint may be restricted or the metric may not be exposed in the current version or configuration.",
          next:
            "Use EKS upgrade insights, supported metrics endpoints, static scans, and audit logs instead of assuming there is no deprecated API usage.",
        },
      ],
      safety:
        "Do not bulk-rewrite apiVersion strings without checking schema and behavior changes. Some APIs require field migrations, not just a version substitution.",
    },

    {
      step: 6,
      title: "Verify version compatibility and lifecycle",
      objective:
        "Ensure the target version and upgrade sequence are supported.",
      commands: [
        "aws eks describe-cluster --name <cluster-name> --region <aws-region> --profile <aws-profile> --query 'cluster.{version:version,status:status}' --output json",
        "aws eks describe-nodegroup --cluster-name <cluster-name> --nodegroup-name <managed-nodegroup-name> --region <aws-region> --profile <aws-profile> --query 'nodegroup.{version:version,status:status,amiType:amiType,releaseVersion:releaseVersion,capacityType:capacityType,scalingConfig:scalingConfig}' --output json",
        "aws eks describe-addon-versions --kubernetes-version <target-kubernetes-version> --region <aws-region> --profile <aws-profile> --output json",
      ],
      checks: [
        "Confirm that the target Kubernetes version is supported in the selected AWS region.",
        "Confirm the upgrade path follows EKS requirements, including one minor version at a time.",
        "Review source and target Kubernetes release notes.",
        "Check kubelet version skew and supported node version relationships.",
        "Check the compatibility of VPC CNI, CoreDNS, kube-proxy, CSI drivers, and other add-ons.",
        "Check custom controllers, admission webhooks, operators, service meshes, monitoring agents, and security agents.",
        "Check node AMI family, architecture, bootstrap configuration, and launch-template changes.",
      ],
      interpret: [
        {
          output: "The target version is unsupported or the upgrade path is invalid.",
          meaning:
            "The requested change is incompatible with the current lifecycle or service requirements.",
          next:
            "Choose a supported intermediate version and plan a staged upgrade.",
        },
        {
          output: "Control plane is newer than the nodes.",
          meaning:
            "This can occur during a staged upgrade, but the node versions and duration of skew must remain within supported limits.",
          next:
            "Complete the planned node upgrade and validate compatibility.",
        },
        {
          output: "An add-on has no compatible target version.",
          meaning:
            "The current add-on release may not support the intended Kubernetes version.",
          next:
            "Review supported add-on versions, upgrade order, and any required configuration migration before continuing.",
        },
      ],
    },

    {
      step: 7,
      title: "Check managed node group health",
      objective:
        "Determine whether node replacement, scaling, or EC2 capacity is preventing completion.",
      commands: [
        "aws eks list-nodegroups --cluster-name <cluster-name> --region <aws-region> --profile <aws-profile>",
        "aws eks describe-nodegroup --cluster-name <cluster-name> --nodegroup-name <managed-nodegroup-name> --region <aws-region> --profile <aws-profile> --output json",
        "kubectl get nodes -o wide",
        "kubectl describe nodes",
        "kubectl get pods -A --field-selector=status.phase=Pending",
        "kubectl get events -A --sort-by=.lastTimestamp",
      ],
      interpret: [
        {
          output: "Node group status is DEGRADED or an update failed.",
          meaning:
            "The node group may have encountered an EC2 launch, health, bootstrap, drain, or replacement issue.",
          next:
            "Inspect node-group health issues, update history, Auto Scaling activity, EC2 status checks, and kubelet bootstrap logs.",
        },
        {
          output: "Pods are Pending with insufficient CPU or memory.",
          meaning:
            "Replacement nodes may not provide enough schedulable capacity for the current workload requests.",
          next:
            "Calculate resource requests, available capacity, topology constraints, and approved scaling options.",
        },
        {
          output: "Nodes are NotReady after replacement.",
          meaning:
            "Investigate node bootstrap, kubelet, container runtime, CNI, IAM, DNS, and control-plane connectivity.",
          next:
            "Inspect node conditions, node-group health, instance status, and relevant system logs.",
        },
        {
          output: "The node group is healthy but application Pods are not ready.",
          meaning:
            "The issue may be an application readiness, scheduling, admission, storage, or dependency failure.",
          next:
            "Inspect Pod events, probes, volumes, image pulls, and application logs.",
        },
      ],
      safety:
        "Do not drain or terminate healthy nodes until replacement capacity, PDB behavior, storage attachment, and workload recovery have been verified.",
    },

    {
      step: 8,
      title: "Investigate PodDisruptionBudgets and drain failures",
      objective:
        "Identify whether voluntary disruption constraints are blocking node replacement.",
      commands: [
        "kubectl get pdb -A",
        "kubectl describe pdb -n <namespace> <pdb-name>",
        "kubectl get pods -n <namespace> -o wide",
        "kubectl get deployment,statefulset -n <namespace>",
        "kubectl get events -n <namespace> --sort-by=.lastTimestamp",
      ],
      interpret: [
        {
          output: "Allowed disruptions is zero.",
          meaning:
            "The PDB currently does not permit another voluntary disruption under its selected Pods and current availability.",
          next:
            "Check healthy replica count, readiness, selector correctness, replica configuration, and whether failed Pods are preventing availability.",
        },
        {
          output: "A workload has only one replica.",
          meaning:
            "A single-replica workload may have no safe disruption path during a drain.",
          next:
            "Evaluate temporary capacity or a reviewed replica increase before retrying the drain.",
        },
        {
          output: "PDB selector matches no intended Pods or too many Pods.",
          meaning:
            "The disruption policy may not reflect the actual workload topology.",
          next:
            "Correct the selector and availability policy through reviewed manifest changes.",
        },
      ],
      recovery:
        "Prefer restoring healthy replicas and capacity before attempting eviction again. Do not bypass PDB safeguards blindly in production.",
    },

    {
      step: 9,
      title: "Validate add-on versions and health",
      objective:
        "Separate Kubernetes upgrade success from add-on rollout success.",
      commands: [
        "aws eks list-addons --cluster-name <cluster-name> --region <aws-region> --profile <aws-profile>",
        "aws eks describe-addon --cluster-name <cluster-name> --addon-name <addon-name> --region <aws-region> --profile <aws-profile> --output json",
        "kubectl get pods -n kube-system -o wide",
        "kubectl get daemonsets,deployments -n kube-system",
        "kubectl get events -n kube-system --sort-by=.lastTimestamp",
      ],
      focusAreas: [
        {
          addon: "VPC CNI",
          checks: [
            "aws-node DaemonSet availability",
            "CNI configuration and IAM permissions",
            "Subnet IP availability and prefix delegation configuration where applicable",
            "Pod IP allocation failures",
            "Node networking and security-group behavior",
          ],
        },
        {
          addon: "CoreDNS",
          checks: [
            "Deployment availability and rollout status",
            "DNS query failures from representative workloads",
            "CPU and memory saturation",
            "Scheduling and affinity constraints",
            "Upstream resolver reachability",
          ],
        },
        {
          addon: "kube-proxy",
          checks: [
            "DaemonSet readiness on eligible nodes",
            "Service ClusterIP connectivity",
            "iptables or IPVS behavior as configured",
            "Node-local network failures",
            "Version compatibility with the target cluster",
          ],
        },
        {
          addon: "CSI drivers",
          checks: [
            "Controller and node plugin health",
            "Volume attach and mount errors",
            "StorageClass and topology compatibility",
            "IAM and cloud API permissions",
            "Stateful workload recovery",
          ],
        },
      ],
      interpret: [
        {
          output: "Add-on status is DEGRADED.",
          meaning:
            "The add-on has reported health issues that require detailed investigation.",
          next:
            "Inspect health issues, Kubernetes events, relevant logs, and the current versus target add-on version.",
        },
        {
          output: "The add-on version is incompatible with the target cluster.",
          meaning:
            "The add-on may need a compatible version or a configuration migration.",
          next:
            "Review the supported versions and upgrade order before updating.",
        },
        {
          output: "Add-on reports ACTIVE but system Pods are failing.",
          meaning:
            "The managed add-on status alone does not prove every Pod and function is healthy.",
          next:
            "Check actual DaemonSet/Deployment readiness and representative functional tests.",
        },
      ],
    },

    {
      step: 10,
      title: "Inspect admission webhooks and controllers",
      objective:
        "Find webhook or controller incompatibilities that block API writes after the upgrade.",
      commands: [
        "kubectl get validatingwebhookconfigurations",
        "kubectl get mutatingwebhookconfigurations",
        "kubectl get pods -A",
        "kubectl get events -A --sort-by=.lastTimestamp",
        "kubectl get --raw=/readyz",
      ],
      checks: [
        "Webhook service endpoints and readiness",
        "Webhook TLS certificate validity and expiry",
        "Webhook service DNS and network reachability",
        "TimeoutSeconds and failurePolicy settings",
        "Controller image and Kubernetes API compatibility",
        "Whether the webhook intercepts resources required for recovery",
      ],
      interpret: [
        {
          output: "Failed calling webhook or context deadline exceeded.",
          meaning:
            "The API request may be blocked by a webhook that is unreachable, slow, or unable to process the new request schema.",
          next:
            "Inspect webhook Pods, service endpoints, logs, TLS, DNS, and controller compatibility.",
        },
        {
          output: "The webhook rejects a new resource schema.",
          meaning:
            "The controller or policy may not support the API version or fields submitted by the client.",
          next:
            "Upgrade or migrate the controller and policy using its supported compatibility guidance.",
        },
        {
          output: "Readiness checks succeed but resource writes fail.",
          meaning:
            "The API server can be healthy while a specific admission or authorization path remains broken.",
          next:
            "Reproduce with a safe nonproduction resource and capture the exact admission error.",
        },
      ],
      safety:
        "Do not delete all webhook configurations to restore deployments. Use a reviewed, scoped remediation that preserves required security policies.",
    },

    {
      step: 11,
      title: "Validate workload health after upgrade",
      objective:
        "Confirm that the platform is safe before resuming broad deployment activity.",
      commands: [
        "kubectl get deployments,statefulsets,daemonsets -A",
        "kubectl get pods -A --field-selector=status.phase!=Running",
        "kubectl get events -A --sort-by=.lastTimestamp",
        "kubectl top nodes",
        "kubectl top pods -A",
      ],
      checks: [
        "Deployment available replicas match expected replicas.",
        "Stateful workloads have healthy members and attached storage.",
        "Readiness and liveness probes are succeeding.",
        "Ingress, service discovery, and external traffic paths work.",
        "DNS resolves required internal and external names.",
        "Representative Service ClusterIP connections succeed.",
        "Autoscaling, metrics, logs, and alerts are functional.",
        "Error rates, latency, saturation, and business KPIs remain within SLOs.",
      ],
      interpret: [
        {
          output: "All Kubernetes objects appear healthy but customer errors remain high.",
          meaning:
            "The failure may be outside the basic Kubernetes readiness signals, such as application behavior, ingress, downstream dependencies, or data compatibility.",
          next:
            "Trace requests end to end and compare application metrics with the pre-upgrade baseline.",
        },
        {
          output: "Only one availability zone has unhealthy nodes.",
          meaning:
            "The issue may involve subnet IP capacity, EC2 capacity, route differences, or zone-specific infrastructure.",
          next:
            "Compare node groups, subnets, instance launch failures, and workload topology across zones.",
        },
      ],
    },
  ],

  failureSignatureMatrix: [
    {
      symptom: "UpdateClusterVersion fails immediately",
      likelyCauses: [
        "Unsupported target version or upgrade path",
        "Concurrent update",
        "Insufficient IAM permissions",
        "Upgrade insight finding",
        "Invalid cluster state",
      ],
      firstChecks: [
        "describe-cluster",
        "list-updates",
        "describe-update",
        "list-insights",
      ],
      recovery:
        "Resolve the specific error and verify the cluster's actual state before retrying.",
    },
    {
      symptom: "Upgrade appears stuck",
      likelyCauses: [
        "Update still in progress",
        "Control-plane operation taking longer than expected",
        "An update is waiting on a service-side operation",
        "The pipeline timed out while the AWS operation continued",
      ],
      firstChecks: [
        "describe-cluster",
        "list-updates",
        "describe-update",
        "CloudTrail and AWS Health",
      ],
      recovery:
        "Poll status with bounded intervals and preserve the update ID. Do not launch conflicting updates or assume the operation failed solely because a CI job timed out.",
    },
    {
      symptom: "Deprecated API insight",
      likelyCauses: [
        "Old manifest or Helm chart",
        "Controller using a removed API",
        "Operator-managed resource",
        "Client still submitting an old API version",
      ],
      firstChecks: [
        "list-insights",
        "describe-insight",
        "Rendered manifest scan",
        "API audit logs where enabled",
      ],
      recovery:
        "Migrate the manifest, controller, or client and validate schema and behavior before the upgrade.",
    },
    {
      symptom: "Managed node group update fails",
      likelyCauses: [
        "EC2 capacity or quota issue",
        "Insufficient subnet IP capacity",
        "PDB blocks eviction",
        "Node bootstrap or IAM issue",
        "Launch-template incompatibility",
        "Unhealthy existing nodes",
      ],
      firstChecks: [
        "describe-nodegroup",
        "list-updates",
        "describe-update for the node group",
        "Auto Scaling activity",
        "kubectl get nodes",
        "kubectl get pdb -A",
      ],
      recovery:
        "Resolve the confirmed capacity, health, disruption, or configuration issue before retrying node replacement.",
    },
    {
      symptom: "Add-on becomes DEGRADED",
      likelyCauses: [
        "Incompatible add-on version",
        "Invalid configuration override",
        "Insufficient IAM permissions",
        "Scheduling or image-pull failure",
        "API or configuration behavior change",
      ],
      firstChecks: [
        "describe-addon",
        "describe-addon-versions",
        "kubectl get pods -n kube-system",
        "kubectl logs",
        "kubectl describe pod",
      ],
      recovery:
        "Select a compatible add-on release and validate configuration. Preserve custom settings when updating managed add-ons.",
    },
    {
      symptom: "Pods fail after successful upgrade",
      likelyCauses: [
        "Removed API or changed schema",
        "Webhook incompatibility",
        "Probe or scheduling behavior",
        "Storage driver issue",
        "CNI or DNS regression",
        "Application dependency incompatibility",
      ],
      firstChecks: [
        "kubectl get events -A",
        "kubectl describe pod",
        "kubectl logs",
        "kubectl get nodes",
        "Application metrics and traces",
      ],
      recovery:
        "Identify the failing layer and deploy a targeted fix or revert the application release if the application itself is the regression source.",
    },
  ],

  nodeGroupInvestigation: {
    commands: [
      "aws eks describe-nodegroup --cluster-name <cluster-name> --nodegroup-name <managed-nodegroup-name> --region <aws-region> --profile <aws-profile> --output json",
      "aws eks list-updates --name <cluster-name> --nodegroup-name <managed-nodegroup-name> --region <aws-region> --profile <aws-profile>",
      "kubectl get nodes -o wide",
      "kubectl describe nodes",
      "kubectl get pods -A --field-selector=status.phase=Pending",
      "kubectl get pdb -A",
    ],

    additionalChecks: [
      "Check the managed node group's health.issues field.",
      "Check the Auto Scaling group's scaling activities and launch failures.",
      "Check EC2 instance status checks and instance launch errors.",
      "Verify subnet IP capacity and availability across the configured subnets.",
      "Verify the node instance role and required bootstrap permissions.",
      "Inspect launch-template version changes, user data, AMI family, and architecture.",
      "Check whether replacement nodes can pull required images and reach the control plane.",
      "Check node labels, taints, affinity, topology spread, and resource requests.",
      "Check local ephemeral storage, memory pressure, and PID pressure.",
      "Confirm that replacement capacity is available before voluntary disruption.",
    ],

    rollbackDecision:
      "Managed node group rollback is not equivalent to downgrading the EKS control plane. Depending on the failure, recovery may require correcting the launch template, restoring compatible node configuration, adding temporary capacity, or replacing the node group using a reviewed migration plan.",
  },

  addonsAndCompatibility: {
    commands: [
      "aws eks list-addons --cluster-name <cluster-name> --region <aws-region> --profile <aws-profile>",
      "aws eks describe-addon --cluster-name <cluster-name> --addon-name <addon-name> --region <aws-region> --profile <aws-profile>",
      "aws eks describe-addon-versions --kubernetes-version <target-kubernetes-version> --region <aws-region> --profile <aws-profile>",
      "kubectl get daemonsets,deployments -n kube-system",
      "kubectl get pods -n kube-system -o wide",
    ],

    upgradeOrderGuidance: [
      "Inventory all managed and self-managed add-ons before changing the cluster.",
      "Review AWS-supported versions and the compatibility matrix for the target Kubernetes version.",
      "Review custom configuration and resolve conflicts before changing a managed add-on.",
      "Upgrade one critical add-on at a time where practical, then run a functional test.",
      "Validate networking and DNS before moving to the next production rollout stage.",
      "Treat third-party operators and service meshes as separate compatibility workstreams.",
    ],

    caution:
      "Do not overwrite managed add-on configuration without understanding the existing settings and conflict-resolution behavior. Save the current configuration and prepare a reviewed recovery path.",
  },

  recoveryAndRollback: {
    criticalPrinciple:
      "Amazon EKS control-plane Kubernetes version upgrades do not provide a routine in-place downgrade path. Treat control-plane recovery as forward remediation or a separately planned migration to another cluster, not as a simple version rollback.",

    beforeRecovery: [
      "Confirm the failed operation has reached a known state.",
      "Record the exact EKS update ID and failure reasons.",
      "Determine whether the control plane is still updating or has reached the target version.",
      "Identify node groups and add-ons already changed.",
      "Preserve the current node-group configuration, add-on configuration, and relevant manifests.",
      "Check application backups and database recovery procedures.",
      "Determine whether the failure is platform-wide or isolated to a workload.",
      "Obtain the appropriate production change approval.",
    ],

    recoveryBranches: [
      {
        condition: "Control-plane update failed before changing the version",
        action:
          "Read the failed update details, remediate the reported blocker, verify cluster health, and retry only after confirming the update is terminal and the cause is fixed.",
        validate:
          "Cluster status, update history, upgrade insights, and read-only API requests.",
      },
      {
        condition: "Control plane reached the target version but the pipeline reports failure",
        action:
          "Reconcile actual AWS state with pipeline state. Do not repeat the control-plane upgrade just because the job was marked failed.",
        validate:
          "describe-cluster version, update history, Kubernetes API response, and release-stage records.",
      },
      {
        condition: "Node-group replacement is blocked",
        action:
          "Resolve the evidenced capacity, PDB, node-health, launch-template, or bootstrap issue. Add temporary capacity only through an approved plan.",
        validate:
          "Node readiness, workload replica counts, eviction behavior, and managed node-group health.",
      },
      {
        condition: "An add-on becomes unhealthy",
        action:
          "Review the compatible release and existing configuration, then perform a targeted add-on correction. Avoid changing all system add-ons at once.",
        validate:
          "Add-on status, system Pod readiness, network and DNS functional checks.",
      },
      {
        condition: "Application regressions appear after the upgrade",
        action:
          "Isolate whether the issue is a Kubernetes API migration, workload release, admission policy, networking, or storage regression. Roll back the application release when that is the confirmed and safe correction.",
        validate:
          "Customer traffic, SLOs, application health, data integrity, and deployment status.",
      },
      {
        condition: "The current cluster cannot be safely restored to the desired operational state",
        action:
          "Evaluate a replacement-cluster migration or disaster-recovery procedure, including traffic shifting, data consistency, identity, secrets, and persistent storage.",
        validate:
          "A rehearsed migration plan, tested restore, health checks, and an approved traffic cutover.",
      },
    ],

    rollbackGates: [
      "The rollback target is technically supported.",
      "The operation does not assume an unsupported control-plane downgrade.",
      "Data consistency and stateful workload behavior are understood.",
      "Required backup or restore evidence exists.",
      "The blast radius and traffic-routing effects are documented.",
      "The responsible team and approval are recorded.",
      "The success criteria and abort criteria are explicit.",
    ],

    controlledRerun:
      "Resume the upgrade only after the failing layer is understood, the actual cluster state is reconciled with pipeline state, and the preflight checks pass. Use staged node-group and add-on changes with explicit health gates. Never blindly rerun every pipeline stage.",
  },

  prevention: {
    preUpgradeChecklist: [
      "Confirm the target Kubernetes version is supported in the intended region.",
      "Review the EKS version lifecycle and release notes.",
      "Review Upgrade Insights and remediate relevant findings.",
      "Scan rendered manifests and Helm output for deprecated or removed APIs.",
      "Test operators, admission webhooks, controllers, service meshes, and CSI drivers.",
      "Confirm managed node-group and add-on compatibility.",
      "Validate PDBs, replica counts, capacity, topology spread, and autoscaling.",
      "Check subnet IP capacity and EC2 capacity requirements.",
      "Verify monitoring, logging, backups, and application recovery procedures.",
      "Test the complete upgrade in a representative nonproduction cluster.",
      "Document the upgrade sequence, health gates, rollback decisions, and owners.",
    ],

    ciChecks: [
      "Pin the intended source and target Kubernetes versions in release metadata.",
      "Fail if the pipeline targets the wrong account, region, or cluster.",
      "Run version-aware manifest and Helm-render checks.",
      "Validate Kubernetes schemas and policy constraints.",
      "Test critical workloads against the target Kubernetes version.",
      "Verify PDBs and sufficient replicas for planned node replacement.",
      "Verify add-on compatibility before starting the production window.",
      "Use bounded waits and capture the AWS update ID in pipeline logs.",
      "Reconcile actual AWS state when a pipeline stage times out.",
      "Require approval for production control-plane and node-group updates.",
      "Prevent parallel upgrades of the same cluster.",
    ],

    monitoring: [
      "Alert on failed EKS updates and degraded node groups.",
      "Alert on NotReady nodes and prolonged Pending Pods.",
      "Monitor CoreDNS, VPC CNI, kube-proxy, and CSI driver health.",
      "Monitor API error rates, admission webhook timeouts, and application SLOs.",
      "Track node replacement duration and capacity pressure.",
      "Retain CloudTrail and relevant Kubernetes audit evidence according to policy.",
      "Track Kubernetes versions and support lifecycle across all clusters.",
      "Review upgrade findings before each scheduled maintenance window.",
    ],

    samplePreflight: [
      "set -euo pipefail",
      "aws sts get-caller-identity",
      "aws eks describe-cluster --name \"$EKS_CLUSTER\" --region \"$AWS_REGION\" --query 'cluster.{name:name,status:status,version:version}' --output json",
      "aws eks list-updates --name \"$EKS_CLUSTER\" --region \"$AWS_REGION\" --output json",
      "kubectl config current-context",
      "kubectl get nodes -o wide",
      "kubectl get pdb -A",
      "kubectl get pods -A",
    ],

    preflightNotes: [
      "Run preflight from the approved administrative environment.",
      "Ensure the AWS and Kubernetes identities have only the required permissions.",
      "Review output manually or through validated policy checks before authorizing mutation.",
      "The sample is a starting point; it does not prove compatibility or guarantee an upgrade will succeed.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "<incident-id>",
    cluster: "<cluster-name>",
    environment: "<production-staging-development>",
    region: "<aws-region>",
    sourceVersion: "<source-version>",
    targetVersion: "<target-version>",
    firstFailureUtc: "<timestamp>",
    lastKnownGoodUtc: "<timestamp>",
    awsUpdateId: "<update-id>",
    affectedComponents: [
      "<control-plane-nodegroup-addon-application>",
    ],
    customerImpact: "<measured-impact>",
    firstObservedError: "<exact-error>",
    upgradeInsights: ["<finding-and-status>"],
    apiCompatibilityFindings: ["<finding>"],
    nodeGroupHealth: ["<finding>"],
    addonHealth: ["<finding>"],
    confirmedRootCause: "<evidence-backed-cause>",
    contributingFactors: ["<factor>"],
    remediationActions: ["<action>"],
    validationEvidence: ["<test-and-result>"],
    rollbackOrMigrationDecision: "<decision-and-reason>",
    customerRecoveryTimeUtc: "<timestamp>",
    preventionActions: [
      {
        action: "<specific-action>",
        owner: "<team-or-role>",
        dueDate: "<date>",
      },
    ],
    lessonsLearned: ["<lesson>"],
  },

  handsOnLabs: [
    {
      title: "Lab 1: Upgrade-readiness review",
      objective:
        "Practice identifying version and API compatibility risks before a control-plane upgrade.",
      steps: [
        "Use a nonproduction EKS cluster.",
        "Capture the current cluster version and update history.",
        "Review upgrade insights and record every relevant finding.",
        "Render application Helm charts and scan the resulting manifests.",
        "Create a remediation plan for each incompatible API or controller.",
        "Repeat the checks after remediation.",
      ],
      expectedLearning:
        "A successful readiness review requires both service insights and application-level compatibility testing.",
    },
    {
      title: "Lab 2: Managed node group update failure",
      objective:
        "Diagnose a failed node-group update without deleting healthy nodes.",
      steps: [
        "Inspect node-group status and update history.",
        "Review health issues and Auto Scaling activity.",
        "Inspect node readiness, Pending Pods, and PDBs.",
        "Calculate replacement capacity before any drain.",
        "Prepare a scoped recovery and validation plan.",
      ],
      expectedLearning:
        "Node-group failures often require capacity, disruption, bootstrap, or launch-configuration analysis rather than another control-plane update.",
    },
    {
      title: "Lab 3: Add-on compatibility",
      objective:
        "Validate system add-ons after a Kubernetes version change.",
      steps: [
        "Inventory current add-on versions.",
        "Review target-version compatibility.",
        "Inspect custom configuration and managed add-on health.",
        "Upgrade a compatible nonproduction add-on through the approved workflow.",
        "Run network, DNS, and workload health tests.",
      ],
      expectedLearning:
        "An add-on's reported status should be supplemented by actual functional validation.",
    },
    {
      title: "Lab 4: PDB blocks drain",
      objective:
        "Understand how disruption constraints affect managed node group replacement.",
      steps: [
        "Create a nonproduction workload with multiple replicas.",
        "Inspect the PDB and available disruption count.",
        "Simulate a controlled maintenance operation.",
        "Observe eviction behavior and workload health.",
        "Adjust replica capacity or the PDB through a reviewed manifest change.",
      ],
      expectedLearning:
        "Safe node replacement requires sufficient healthy replicas and a valid disruption strategy.",
    },
    {
      title: "Lab 5: Post-upgrade application regression",
      objective:
        "Separate platform health from application health.",
      steps: [
        "Record application SLOs before the test upgrade.",
        "Upgrade a representative test cluster.",
        "Run readiness, API compatibility, DNS, networking, storage, and application tests.",
        "Compare errors and latency against the baseline.",
        "Decide whether the appropriate correction is an application rollback, add-on fix, or platform remediation.",
      ],
      expectedLearning:
        "Recovery decisions should follow measured evidence and supported rollback paths, not the assumption that every upgrade can be reversed.",
    },
  ],

  interviewQuestions: [
    {
      question: "Can an EKS control-plane version be downgraded after an upgrade?",
      answer:
        "Do not plan on an in-place control-plane downgrade. Prepare forward remediation or a separately rehearsed replacement-cluster migration if the target state cannot be recovered safely.",
    },
    {
      question: "Do managed node groups upgrade automatically with the control plane?",
      answer:
        "No. Plan and execute node-group upgrades separately, respecting Kubernetes version compatibility and workload availability.",
    },
    {
      question: "What are EKS Upgrade Insights?",
      answer:
        "They are AWS-managed checks that identify potential issues affecting Kubernetes version upgrades. They are useful evidence, but they do not replace application and manifest compatibility testing.",
    },
    {
      question: "Why can a control-plane upgrade succeed while workloads fail?",
      answer:
        "The control plane may accept the new version while applications, removed APIs, admission webhooks, add-ons, storage drivers, or node configurations remain incompatible.",
    },
    {
      question: "How do you investigate a failed managed node group update?",
      answer:
        "Inspect node-group status, update errors, Auto Scaling activity, EC2 capacity, subnet IPs, PDBs, workload resource requests, bootstrap configuration, and node readiness.",
    },
    {
      question: "How can PDBs affect node replacement?",
      answer:
        "A PDB can prevent voluntary eviction when disruption would violate the configured availability budget. Restore healthy replicas or add capacity before attempting another drain.",
    },
    {
      question: "What is the risk of upgrading all add-ons simultaneously?",
      answer:
        "Multiple simultaneous changes make it difficult to isolate the cause of networking, DNS, proxy, or storage regressions and can increase the blast radius.",
    },
    {
      question: "What should happen when a CI job times out during an EKS update?",
      answer:
        "Inspect the actual AWS update status and ID. The AWS operation may still be running or may already have completed even if the pipeline timed out.",
    },
    {
      question: "How do you detect removed API usage?",
      answer:
        "Combine EKS upgrade insights, version-aware scanning of rendered manifests, Helm charts, controller compatibility checks, and Kubernetes audit evidence where available.",
    },
    {
      question: "How do you decide whether to roll back?",
      answer:
        "First identify whether the regression is in the application, node group, add-on, or control plane. Use supported recovery paths, protect data consistency, and do not assume control-plane downgrades are available.",
    },
    {
      question: "How do you prove the upgrade is complete?",
      answer:
        "Verify actual cluster and node versions, node-group and add-on health, workload availability, DNS and network functions, storage behavior, application SLOs, and the absence of unresolved critical findings.",
    },
  ],

  completionChecklist: [
    "Correct AWS account, region, cluster, and target version confirmed.",
    "The actual control-plane update state and update ID captured.",
    "Upgrade insights and API compatibility reviewed.",
    "Managed and self-managed node versions assessed.",
    "Add-on versions and health validated.",
    "Node capacity and subnet IP capacity verified.",
    "PDBs and workload replica availability reviewed.",
    "Admission webhooks and controllers validated.",
    "Representative application and platform tests passed.",
    "Rollback assumptions and recovery options reviewed.",
    "Controlled rollout gates passed before broad deployment resumed.",
    "Incident report and prevention actions assigned to owners.",
  ],

  references: [
    {
      title: "Update an existing Amazon EKS cluster",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/update-cluster.html",
    },
    {
      title: "Amazon EKS cluster insights",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/cluster-insights.html",
    },
    {
      title: "View EKS cluster insights",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/view-cluster-insights.html",
    },
    {
      title: "Amazon EKS cluster upgrade best practices",
      url: "https://docs.aws.amazon.com/eks/latest/best-practices/cluster-upgrades.html",
    },
    {
      title: "Update a managed node group",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/update-managed-node-group.html",
    },
    {
      title: "Kubernetes API deprecation guide",
      url: "https://kubernetes.io/docs/reference/using-api/deprecation-guide/",
    },
    {
      title: "Kubernetes PodDisruptionBudgets",
      url: "https://kubernetes.io/docs/tasks/run-application/configure-pdb/",
    },
  ],
} as const;

export default eksUpgradeFailureGuide;
