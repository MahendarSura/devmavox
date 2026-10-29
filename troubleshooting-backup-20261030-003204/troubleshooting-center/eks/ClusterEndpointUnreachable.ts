
export const clusterEndpointUnreachableGuide = {
  id: "eks-cluster-endpoint-unreachable",
  title: "Amazon EKS Cluster Endpoint Unreachable",
  category: "Amazon EKS",
  severity: "Critical",
  summary:
    "Diagnose and safely recover kubectl, CI/CD, and automation clients that cannot reach an Amazon EKS Kubernetes API endpoint.",

  metadata: {
    platform: "Amazon EKS",
    audience: [
      "SRE",
      "Platform Engineering",
      "Cloud Engineering",
      "DevOps",
      "Kubernetes Administrators",
      "Incident Commanders",
    ],
    symptoms: [
      "kubectl commands time out",
      "dial tcp: i/o timeout",
      "no such host",
      "Unable to connect to the server",
      "connection refused",
      "TLS handshake timeout",
      "Unauthorized",
      "Forbidden",
      "CI/CD runners cannot contact the Kubernetes API",
      "Private EKS endpoint is inaccessible from a workstation",
      "kubectl works locally but fails from a bastion or runner",
    ],
    prerequisites: [
      "AWS CLI v2",
      "kubectl compatible with the cluster Kubernetes version",
      "An authenticated AWS identity with permitted EKS read access",
      "The correct AWS account, region, cluster name, and kubeconfig context",
      "VPC, subnet, route-table, security-group and DNS visibility where authorized",
    ],
    placeholders: {
      cluster: "<cluster-name>",
      region: "<aws-region>",
      profile: "<aws-profile>",
      account: "<aws-account-id>",
      namespace: "<namespace>",
      runnerIp: "<runner-private-ip>",
      endpointHost: "<cluster-endpoint-hostname>",
      incidentId: "<incident-id>",
    },
  },

  productionWorkflow: {
    scenario:
      "A production deployment pipeline suddenly fails with a Kubernetes API timeout. The application was healthy before the deployment, but rollout automation can no longer communicate with the EKS control plane.",

    impactAssessment: [
      "Determine whether the failure affects one user, one runner, one VPC, one cluster, or multiple regions.",
      "Check whether existing workloads continue serving traffic. An unreachable API endpoint does not automatically mean the application data plane is down.",
      "Identify whether deployments, scaling operations, admission changes, incident automation, and node maintenance are blocked.",
      "Determine whether any earlier pipeline stage already changed resources before connectivity failed.",
      "Check for active customer impact, error-budget burn, failed health checks, and missed deployment deadlines.",
      "Assign an incident commander for a broad production outage and a technical owner for network/API investigation.",
      "Record the first observed failure, last known successful operation, deployment run ID, and relevant change window.",
    ],

    severityGuidance: [
      {
        severity: "SEV-1",
        condition:
          "Critical customer impact or multiple critical production clusters are inaccessible, with no safe operational workaround.",
        action:
          "Declare an incident, stop risky changes, engage platform/network/cloud owners, and follow the organization's incident command process.",
      },
      {
        severity: "SEV-2",
        condition:
          "A production cluster is inaccessible to its deployment or operations team, but workloads remain healthy and a controlled workaround exists.",
        action:
          "Freeze affected deployment automation and restore the approved management path.",
      },
      {
        severity: "SEV-3",
        condition:
          "One developer, one runner, or a nonproduction environment is affected.",
        action:
          "Isolate client, identity, DNS, and routing differences before making infrastructure changes.",
      },
    ],

    safetyChecks: [
      "Confirm the AWS account and region before running commands.",
      "Confirm the cluster name and kubeconfig context.",
      "Use read-only diagnostics before changing endpoint settings or networking.",
      "Do not disable endpoint authentication or widen public CIDRs as a quick fix.",
      "Do not expose a private Kubernetes API endpoint to the public internet.",
      "Do not replace route tables, security groups, NACLs, or cluster endpoint settings without an approved change.",
      "Do not restart all worker nodes to fix a management-plane connectivity issue.",
      "Preserve command output and timestamps while redacting tokens, credentials, account-sensitive information, and internal hostnames where required.",
      "Use a known-good administrative path if the primary workstation or runner is suspect.",
      "Check whether an incident or AWS service-health event is already open before changing infrastructure.",
    ],
  },

  diagnosticCommands: [
    {
      id: "01",
      title: "Verify the AWS execution identity",
      purpose:
        "Ensure diagnostics are being run with the expected credentials and account.",
      commands: [
        "aws sts get-caller-identity --profile <aws-profile>",
        "aws configure list --profile <aws-profile>",
        "aws --version",
        "kubectl version --client",
      ],
      interpret: [
        {
          output: "The account or ARN is unexpected.",
          meaning:
            "The shell, CI runner, SSO session, assumed role, or AWS profile may be targeting the wrong environment.",
          next:
            "Stop before making changes. Select the approved profile or role and repeat identity verification.",
        },
        {
          output: "ExpiredToken or an SSO credential error.",
          meaning:
            "AWS authentication failed before Kubernetes endpoint connectivity could be established.",
          next:
            "Refresh the approved AWS login/session, then verify identity again.",
        },
        {
          output: "Identity is correct.",
          meaning:
            "Proceed to cluster metadata and endpoint configuration.",
          next: "Run the cluster metadata commands.",
        },
      ],
      safety:
        "Never print or upload AWS secret keys, session tokens, kubeconfig bearer tokens, or complete environment dumps into incident tickets.",
    },

    {
      id: "02",
      title: "Read EKS cluster metadata",
      purpose:
        "Verify cluster existence, region, status, and configured endpoint access.",
      commands: [
        "aws eks describe-cluster --name <cluster-name> --region <aws-region> --profile <aws-profile> --query 'cluster.{name:name,status:status,version:version,endpoint:endpoint,certificateAuthorityData:certificateAuthority.data,resourcesVpcConfig:resourcesVpcConfig}' --output json",
      ],
      interpret: [
        {
          output: "ResourceNotFoundException",
          meaning:
            "The cluster name, region, account, or credentials may be incorrect; the cluster may also have been deleted.",
          next:
            "Verify the AWS identity, configured region, deployment variables, and inventory/source-of-truth record.",
        },
        {
          output: "AccessDeniedException",
          meaning:
            "The caller lacks permission to inspect cluster metadata.",
          next:
            "Request the minimum required read permission through the approved IAM process. Do not assume this is a network failure.",
        },
        {
          output: "status is CREATING, UPDATING, or DELETING",
          meaning:
            "The control plane may be undergoing a lifecycle operation.",
          next:
            "Inspect the relevant change and update history. Avoid competing updates until the operation's status is understood.",
        },
        {
          output: "ACTIVE with an endpoint",
          meaning:
            "The cluster exists and reports ACTIVE, but the client may still have a DNS, route, firewall, TLS, authentication, or authorization problem.",
          next:
            "Record the endpoint hostname, public/private access settings, VPC ID, and cluster security-group ID.",
        },
      ],
      note:
        "ACTIVE does not prove that every client network can reach the endpoint.",
    },

    {
      id: "03",
      title: "Verify kubeconfig and context",
      purpose:
        "Distinguish a stale or incorrect client configuration from a real endpoint outage.",
      commands: [
        "kubectl config current-context",
        "kubectl config get-contexts",
        "kubectl config view --minify",
        "kubectl cluster-info",
        "aws eks update-kubeconfig --name <cluster-name> --region <aws-region> --profile <aws-profile>",
        "kubectl config current-context",
      ],
      interpret: [
        {
          output: "The current context points to another cluster.",
          meaning:
            "The client may be targeting the wrong endpoint or environment.",
          next:
            "Use the approved cluster context and confirm the endpoint before retrying production operations.",
        },
        {
          output: "The kubeconfig contains an old endpoint.",
          meaning:
            "The local configuration may not match the current EKS metadata.",
          next:
            "Regenerate or repair the intended context with the approved AWS identity. Compare the resulting endpoint against describe-cluster.",
        },
        {
          output: "The context is correct but commands time out.",
          meaning:
            "The next investigation should focus on DNS, routing, TCP reachability, endpoint access, and security controls.",
          next: "Continue with DNS and transport checks.",
        },
      ],
      safety:
        "Treat kubeconfig output as sensitive. Avoid sharing raw configuration when it includes exec settings, embedded credentials, internal endpoints, or certificate material.",
    },

    {
      id: "04",
      title: "Check DNS resolution",
      purpose:
        "Determine whether the EKS endpoint hostname resolves from the failing client.",
      commands: [
        "getent ahosts <cluster-endpoint-hostname>",
        "nslookup <cluster-endpoint-hostname>",
        "dig +time=2 +tries=1 <cluster-endpoint-hostname>",
      ],
      interpret: [
        {
          output: "NXDOMAIN or no address returned",
          meaning:
            "The endpoint hostname may be incorrect, DNS forwarding may be broken, or the client may be using an incompatible resolver.",
          next:
            "Compare the hostname against describe-cluster, inspect the configured resolver, and test from an approved known-good host.",
        },
        {
          output: "DNS succeeds on a bastion but fails on a developer laptop",
          meaning:
            "The difference may involve VPN connectivity, split-horizon DNS, corporate DNS forwarding, or resolver policy.",
          next:
            "Compare VPN state, resolver configuration, and DNS forwarding paths without changing cluster configuration.",
        },
        {
          output: "DNS resolves to private addresses",
          meaning:
            "The client needs a valid network path to those private addresses.",
          next:
            "Check VPC connectivity, routes, security groups, NACLs, and return routing.",
        },
        {
          output: "DNS resolves successfully",
          meaning:
            "Resolution alone does not prove TCP connectivity.",
          next:
            "Test TCP reachability to port 443.",
        },
      ],
      note:
        "DNS answers depend on endpoint configuration and the client's network location. Do not hard-code a resolved IP as a permanent fix.",
    },

    {
      id: "05",
      title: "Test TCP reachability to the Kubernetes API",
      purpose:
        "Identify whether the failure occurs before the TLS and Kubernetes authentication layers.",
      commands: [
        "nc -vz -w 5 <cluster-endpoint-hostname> 443",
        "curl -sS -o /dev/null -w 'http_code=%{http_code}\\nconnect=%{time_connect}\\ntls=%{time_appconnect}\\n' --connect-timeout 5 --max-time 10 https://<cluster-endpoint-hostname>/",
      ],
      interpret: [
        {
          output: "Connection timed out",
          meaning:
            "Likely causes include missing routes, firewall drops, security-group restrictions, NACL rules, inaccessible private endpoint networking, or an intermediate network failure.",
          next:
            "Compare source network, destination, endpoint access mode, route path, and AWS network evidence.",
        },
        {
          output: "Connection refused",
          meaning:
            "The TCP connection was actively rejected somewhere along the path. Verify the actual destination, proxy settings, and network path; do not immediately assume an EKS control-plane outage.",
          next:
            "Confirm the hostname and port, test from an approved second source, and inspect network controls.",
        },
        {
          output: "TLS handshake fails",
          meaning:
            "TCP may be reachable, but TLS negotiation, proxy interception, client trust, or a network middlebox may be involved.",
          next:
            "Inspect verbose TLS output, system time, proxy configuration, and the endpoint certificate chain.",
        },
        {
          output: "HTTP 401 or 403",
          meaning:
            "The HTTP response demonstrates that the client reached an HTTP service, but it does not establish successful Kubernetes authentication or authorization.",
          next:
            "Continue with AWS token generation and Kubernetes authorization checks.",
        },
        {
          output: "HTTP 200 or another HTTP response",
          meaning:
            "The network path and HTTP service responded. The original kubectl failure may be in authentication, authorization, client configuration, or an intermittent layer.",
          next:
            "Inspect kubectl error output and identity mapping.",
        },
      ],
      safety:
        "Do not use insecure TLS flags as a permanent workaround. Do not publish the endpoint or expose port 443 to unrestricted internet sources.",
    },

    {
      id: "06",
      title: "Inspect endpoint access configuration",
      purpose:
        "Verify public/private endpoint settings and the configured public CIDR allowlist.",
      commands: [
        "aws eks describe-cluster --name <cluster-name> --region <aws-region> --profile <aws-profile> --query 'cluster.resourcesVpcConfig.{vpcId:vpcId,subnetIds:subnetIds,clusterSecurityGroupId:clusterSecurityGroupId,endpointPublicAccess:endpointPublicAccess,endpointPrivateAccess:endpointPrivateAccess,publicAccessCidrs:publicAccessCidrs}' --output json",
      ],
      interpret: [
        {
          output: "Private access is enabled and public access is disabled",
          meaning:
            "Clients need a valid private network path to the cluster endpoint.",
          next:
            "Verify VPN, Direct Connect, peering, Transit Gateway, routing, DNS, and the approved management network.",
        },
        {
          output: "Public access is enabled with a restricted CIDR list",
          meaning:
            "A client whose effective source IP is outside the allowlist may be unable to connect.",
          next:
            "Verify the actual egress IP and compare it with the configured CIDRs. Account for NAT, VPN, and corporate egress changes.",
        },
        {
          output: "Endpoint access settings differ from the approved baseline",
          meaning:
            "A recent configuration change or drift may explain the incident.",
          next:
            "Review change history and CloudTrail evidence. Restore the approved configuration through change control.",
        },
      ],
      caution:
        "Do not replace a restricted allowlist with 0.0.0.0/0 to make a test pass. If a CIDR correction is approved, use the narrowest necessary trusted range and validate the resulting access.",
    },

    {
      id: "07",
      title: "Validate private network routing",
      purpose:
        "Determine whether the source can route to the private endpoint and return traffic can reach the source.",
      commands: [
        "ip route",
        "ip route get <resolved-private-endpoint-ip>",
        "ip addr",
        "traceroute -T -p 443 <cluster-endpoint-hostname>",
        "tracepath <cluster-endpoint-hostname>",
      ],
      interpret: [
        {
          output: "No route to host or unreachable route",
          meaning:
            "The host lacks a suitable route, the VPN route is missing, or an intermediate gateway cannot forward the traffic.",
          next:
            "Inspect source subnet route tables, VPN route advertisements, Transit Gateway attachments, peering routes, and destination subnet associations.",
        },
        {
          output: "The route points to an unexpected interface or gateway",
          meaning:
            "The client may be using a stale VPN, incorrect routing policy, or overlapping network range.",
          next:
            "Compare against the approved network diagram and inspect route selection before modifying routes.",
        },
        {
          output: "Traceroute has no useful response",
          meaning:
            "Intermediate devices may suppress traceroute traffic. This is not sufficient proof that port 443 is unreachable.",
          next:
            "Use TCP connectivity tests and authorized VPC Flow Logs or network telemetry.",
        },
      ],
      awsEvidence: [
        "aws ec2 describe-route-tables --filters Name=vpc-id,Values=<vpc-id> --region <aws-region> --profile <aws-profile>",
        "aws ec2 describe-subnets --subnet-ids <subnet-id> --region <aws-region> --profile <aws-profile>",
        "aws ec2 describe-security-groups --group-ids <cluster-security-group-id> --region <aws-region> --profile <aws-profile>",
      ],
      note:
        "These commands may return substantial infrastructure metadata. Filter output to the relevant route table, subnet, and security group before attaching evidence to an incident.",
    },

    {
      id: "08",
      title: "Inspect security groups and network ACLs",
      purpose:
        "Check whether the effective source is permitted to reach the endpoint and whether return traffic is allowed.",
      checks: [
        "Identify the actual source IP or source security group.",
        "Inspect cluster security-group ingress rules for the required TCP 443 path.",
        "Inspect relevant source and destination subnet network ACL rules.",
        "Check ephemeral-port return traffic where stateless NACL behavior applies.",
        "Review corporate firewalls, proxies, host firewalls, and egress policies.",
        "Check VPC Flow Logs for ACCEPT or REJECT records where logging is enabled.",
      ],
      interpret: [
        {
          output: "A matching REJECT record exists",
          meaning:
            "The flow may be blocked by the recorded network control. Confirm the source, destination, port, timestamp, and flow direction.",
          next:
            "Identify the exact rule or control that caused the rejection and request the smallest approved correction.",
        },
        {
          output: "No matching flow record exists",
          meaning:
            "Logging may be disabled, the wrong log group may be queried, or the traffic may not reach the monitored interface.",
          next:
            "Confirm Flow Logs coverage, time window, source/destination addresses, and whether the request leaves the client network.",
        },
        {
          output: "Security-group rules appear correct but traffic still times out",
          meaning:
            "Routing, NACLs, corporate egress controls, DNS, or the return path may still be broken.",
          next:
            "Continue the path analysis instead of repeatedly changing security-group rules.",
        },
      ],
      safety:
        "Avoid broad ingress rules. Record the old and proposed rules, owner, expiry, approval, and rollback procedure for any emergency change.",
    },

    {
      id: "09",
      title: "Separate endpoint reachability from IAM authentication",
      purpose:
        "Determine whether the client can reach the API but cannot authenticate.",
      commands: [
        "aws eks get-token --cluster-name <cluster-name> --region <aws-region> --profile <aws-profile> > /dev/null",
        "kubectl --request-timeout=10s get --raw=/version",
        "kubectl --request-timeout=10s auth can-i get pods --namespace <namespace>",
        "kubectl --request-timeout=10s get pods -n <namespace>",
      ],
      interpret: [
        {
          output: "get-token fails with an AWS credential error",
          meaning:
            "The problem is with the caller's AWS session or credential chain rather than basic endpoint reachability.",
          next:
            "Verify the intended role, SSO session, credential provider, and region.",
        },
        {
          output: "The API responds with Unauthorized",
          meaning:
            "The endpoint is reachable, but the Kubernetes request is not authenticated as an accepted identity.",
          next:
            "Verify the token execution role, EKS access configuration, and the expected identity mapping.",
        },
        {
          output: "The API responds with Forbidden",
          meaning:
            "Authentication likely succeeded, but the identity may lack the required Kubernetes permissions.",
          next:
            "Inspect EKS access entries, associated access policies, or the legacy aws-auth mapping and Kubernetes RBAC bindings as applicable.",
        },
        {
          output: "The API request times out",
          meaning:
            "Authentication is not yet the leading hypothesis because the transport request did not complete.",
          next:
            "Return to DNS, routing, security controls, endpoint access mode, and network evidence.",
        },
      ],
      caution:
        "Do not print the output of aws eks get-token. It contains a bearer token that must be treated as a secret.",
    },

    {
      id: "10",
      title: "Compare working and failing clients",
      purpose:
        "Use differential diagnosis to isolate client-specific and network-specific causes.",
      comparisonMatrix: [
        {
          working: "Bastion succeeds",
          failing: "Developer laptop fails",
          likelyAreas: [
            "VPN connectivity",
            "Corporate DNS",
            "Laptop route selection",
            "Local firewall",
            "Different source CIDR",
          ],
          next:
            "Compare DNS results, routes, VPN state, effective egress IP, and TCP 443 reachability.",
        },
        {
          working: "Developer laptop succeeds",
          failing: "CI runner fails",
          likelyAreas: [
            "Runner subnet routes",
            "Runner security group",
            "Runner egress CIDR",
            "Private endpoint reachability",
            "Different IAM role",
          ],
          next:
            "Run the same read-only checks inside the runner's actual network and identity context.",
        },
        {
          working: "One runner succeeds",
          failing: "Another runner fails",
          likelyAreas: [
            "Different subnets",
            "Different security groups",
            "Different DNS resolvers",
            "Different proxy configuration",
            "Different role or kubeconfig",
          ],
          next:
            "Compare runner metadata and effective configuration instead of changing the cluster globally.",
        },
        {
          working: "All clients fail",
          failing: "All clients fail",
          likelyAreas: [
            "Shared network change",
            "Endpoint access configuration",
            "Control-plane lifecycle operation",
            "DNS or upstream network incident",
            "Incorrect shared configuration",
          ],
          next:
            "Check AWS Health, recent CloudTrail events, shared networking, and cluster status. Escalate to AWS Support if evidence indicates a service-side problem.",
        },
      ],
    },

    {
      id: "11",
      title: "Review recent changes using CloudTrail",
      purpose:
        "Identify whether endpoint settings or network infrastructure changed shortly before the incident.",
      commands: [
        "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventSource,AttributeValue=eks.amazonaws.com --region <aws-region> --profile <aws-profile> --max-results 50 --output json",
        "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventSource,AttributeValue=ec2.amazonaws.com --region <aws-region> --profile <aws-profile> --max-results 50 --output json",
      ],
      checks: [
        "Find UpdateClusterConfig and related EKS endpoint-access changes.",
        "Inspect security-group, route-table, NACL, subnet, Transit Gateway, and VPN changes.",
        "Correlate the event time with the first failing pipeline and the last successful request.",
        "Identify the principal, assumed role, automation run, change ticket, and request parameters.",
        "Determine whether the change affected only one cluster or a shared network path.",
      ],
      interpret: [
        {
          output: "A relevant change immediately precedes the incident",
          meaning:
            "The change is a strong candidate, but correlation alone does not prove causation.",
          next:
            "Compare the exact changed setting with failed traffic evidence and the approved baseline.",
        },
        {
          output: "No relevant event appears",
          meaning:
            "The event may be outside the lookup window, in another region/account, or unavailable due to logging or permissions.",
          next:
            "Verify trail coverage, time range, account, region, and log destination. Do not conclude that no change occurred.",
        },
      ],
      note:
        "CloudTrail LookupEvents is not a substitute for organization-wide trail analysis. Use the configured central audit log when required.",
    },

    {
      id: "12",
      title: "Use VPC Flow Logs and network telemetry",
      purpose:
        "Determine whether the connection reaches the expected network interfaces and where traffic is rejected.",
      investigationSteps: [
        "Confirm Flow Logs are enabled for the relevant VPC, subnet, or network interface.",
        "Identify the correct interface and its private IP using authorized AWS metadata.",
        "Query a narrow time range around the first failure.",
        "Filter on the actual source IP, destination IP, destination port 443, protocol, and action.",
        "Compare successful and failed attempts from the same client.",
        "Correlate records with VPN, firewall, proxy, Transit Gateway, and NAT telemetry where applicable.",
      ],
      sampleCloudWatchLogsInsights: [
        "fields @timestamp, @message",
        "| filter @message like /REJECT/",
        "| sort @timestamp desc",
        "| limit 100",
      ],
      limitations: [
        "The sample query is only a starting point; field extraction depends on the configured Flow Logs format.",
        "A missing record does not prove the network is healthy.",
        "Flow Logs do not explain every application-level failure.",
        "Use the smallest useful time window and approved log access.",
      ],
    },
  ],

  rootCauseIsolation: [
    {
      cause: "Incorrect AWS account or region",
      evidence: [
        "sts get-caller-identity shows the wrong account",
        "describe-cluster cannot find the expected cluster",
        "CI variables differ from the approved environment",
      ],
      remediation:
        "Correct the credential/profile/region selection and verify the cluster endpoint before restarting deployment automation.",
    },
    {
      cause: "Stale kubeconfig context",
      evidence: [
        "Current context points to a different cluster",
        "Kubeconfig server differs from describe-cluster output",
      ],
      remediation:
        "Regenerate or repair the intended context and validate it using read-only API requests.",
    },
    {
      cause: "Public endpoint CIDR mismatch",
      evidence: [
        "Endpoint public access is enabled",
        "The client egress IP falls outside publicAccessCidrs",
        "Approved network telemetry confirms the request source",
      ],
      remediation:
        "Apply a reviewed, narrow CIDR correction only if public access is required by the approved design. Prefer the intended private management path where applicable.",
    },
    {
      cause: "Private endpoint without a valid private route",
      evidence: [
        "Private endpoint access is enabled",
        "The client is outside the connected network",
        "The client has no valid route to the endpoint",
      ],
      remediation:
        "Restore the approved VPN, Direct Connect, peering, Transit Gateway, routing, or bastion path. Do not make the endpoint public as a shortcut.",
    },
    {
      cause: "DNS forwarding or split-horizon DNS failure",
      evidence: [
        "The same endpoint resolves on one network but not another",
        "Resolver errors coincide with the incident",
      ],
      remediation:
        "Repair the approved DNS forwarding or resolver configuration and verify name resolution from the actual failing client.",
    },
    {
      cause: "Security-group, NACL, or firewall rejection",
      evidence: [
        "Traffic is rejected by a relevant network control",
        "The effective source/destination tuple matches the failed request",
      ],
      remediation:
        "Correct the specific approved rule while preserving least privilege and return traffic.",
    },
    {
      cause: "AWS credentials or EKS token failure",
      evidence: [
        "AWS token generation fails",
        "Expired or invalid credentials are reported",
      ],
      remediation:
        "Refresh the approved credential chain and validate the assumed role. Never expose generated tokens.",
    },
    {
      cause: "EKS authentication or RBAC failure",
      evidence: [
        "The API responds with Unauthorized or Forbidden",
        "The error is not a TCP timeout",
      ],
      remediation:
        "Inspect EKS access entries, access policies, identity mapping, and Kubernetes RBAC. Grant only the required permissions.",
    },
    {
      cause: "Proxy or TLS interception",
      evidence: [
        "TLS errors occur only on a particular network",
        "Proxy configuration differs between working and failing clients",
      ],
      remediation:
        "Validate approved proxy bypass and TLS trust configuration. Do not disable certificate verification as a permanent workaround.",
    },
    {
      cause: "Shared AWS or upstream network incident",
      evidence: [
        "Multiple independent clients fail",
        "The failure spans shared network paths",
        "AWS Health or provider support evidence indicates a service-side issue",
      ],
      remediation:
        "Follow the incident process, preserve evidence, use only approved alternate management paths, and engage AWS Support where appropriate.",
    },
  ],

  recoveryPlan: {
    principle:
      "Change only the component demonstrated by evidence to be faulty. Prefer the smallest reversible correction and validate the path before resuming deployment automation.",

    beforeChange: [
      "Record the incident ID, current configuration, exact error, timestamps, and affected clients.",
      "Confirm the target AWS account, region, cluster, and change approval.",
      "Export relevant read-only metadata and preserve the approved baseline.",
      "Identify the exact rollback operation and responsible change owner.",
      "Ensure the proposed change will not expose the API publicly or weaken security controls.",
    ],

    recoveryByCause: [
      {
        condition: "Wrong context or region",
        action:
          "Correct the local or CI configuration, then repeat identity, metadata, and read-only API tests.",
        rollback:
          "Restore the prior configuration if the corrected context targets the wrong environment.",
      },
      {
        condition: "VPN or route failure",
        action:
          "Restore the approved network path and validate route selection and TCP 443 connectivity.",
        rollback:
          "Revert only the reviewed routing change if it introduces unexpected reachability or route conflicts.",
      },
      {
        condition: "Security-group or NACL rule failure",
        action:
          "Apply the smallest approved rule correction and verify the effective flow.",
        rollback:
          "Restore the captured prior rule set if the change causes unintended exposure or connectivity.",
      },
      {
        condition: "Public endpoint allowlist mismatch",
        action:
          "Verify the real egress CIDR and apply the approved narrow CIDR correction only when consistent with the security design.",
        rollback:
          "Restore the approved prior allowlist if the change does not resolve the issue or increases exposure.",
      },
      {
        condition: "IAM authentication or RBAC failure",
        action:
          "Repair the intended role/session or minimum required access mapping. Validate with a read-only Kubernetes request.",
        rollback:
          "Remove any temporary access grant after the approved recovery window and verify expected access boundaries.",
      },
      {
        condition: "Suspected AWS service issue",
        action:
          "Preserve evidence, check AWS Health, follow incident communications, and engage support as needed.",
        rollback:
          "Avoid speculative endpoint or network changes; revert only changes already demonstrated to be causal.",
      },
    ],

    validationGates: [
      "AWS caller identity matches the approved environment.",
      "EKS metadata reports the expected cluster and endpoint settings.",
      "DNS resolves from the previously failing client.",
      "TCP 443 and TLS negotiation succeed from the approved path.",
      "kubectl get --raw=/version succeeds where the identity is authorized.",
      "A read-only namespace-scoped request succeeds.",
      "The pipeline can perform its approved preflight checks.",
      "A canary deployment succeeds before broad rollout resumes.",
      "Application health, error rate, latency, and relevant SLOs remain acceptable.",
      "No temporary broad network rule or emergency privilege remains.",
    ],

    controlledRerun:
      "Resume only the failed deployment stage after verifying its previous stages and partial changes. Use a canary or smallest safe scope first. Do not blindly rerun an entire pipeline if earlier steps may have changed production resources.",

    rollbackDecision:
      "Roll back the deployment if application health regresses, the canary fails, or the recovery violates a safety gate. A network reachability incident alone does not automatically require rolling back healthy application workloads.",
  },

  prevention: {
    architecture: [
      "Choose public/private endpoint access according to the organization's threat model and management architecture.",
      "Keep production administrative access on approved network paths.",
      "Document VPC, subnet, route, DNS, VPN, Transit Gateway, security-group, and endpoint dependencies.",
      "Use dedicated CI runner subnets and narrowly scoped egress permissions where appropriate.",
      "Maintain an approved break-glass access procedure with auditing and expiry.",
      "Avoid overlapping network CIDRs and document cross-account and cross-region dependencies.",
    ],

    automation: [
      "Validate AWS account and region before production deployment.",
      "Verify the expected EKS cluster ARN or endpoint before applying changes.",
      "Run a DNS and TCP 443 preflight from the actual runner network.",
      "Use short, bounded timeouts and useful error messages in pipeline checks.",
      "Fail safely if the target environment does not match the release configuration.",
      "Keep IAM roles, kubeconfig generation, and deployment identity configuration under version control where appropriate.",
      "Require approvals for endpoint access, route, security-group, NACL, and public CIDR changes.",
      "Avoid automatic retries that conceal persistent connectivity failures.",
    ],

    monitoring: [
      "Alert on repeated deployment API timeouts and authentication failures.",
      "Track failed deployment counts by cluster, region, and runner pool.",
      "Monitor AWS Health and relevant control-plane/network telemetry.",
      "Retain CloudTrail and relevant network logs according to the organization's audit policy.",
      "Test the approved management path periodically without making destructive changes.",
      "Review endpoint configuration drift against the approved baseline.",
    ],

    ciPreflightExample: [
      "set -euo pipefail",
      "aws sts get-caller-identity --profile \"$AWS_PROFILE\"",
      "aws eks describe-cluster --name \"$EKS_CLUSTER\" --region \"$AWS_REGION\" --profile \"$AWS_PROFILE\" --query 'cluster.{name:name,status:status,endpoint:endpoint}' --output json",
      "kubectl config current-context",
      "kubectl --request-timeout=10s get --raw=/version",
    ],

    ciNotes: [
      "Set AWS_PROFILE, AWS_REGION, and EKS_CLUSTER explicitly in the runner environment.",
      "The example requires the relevant tools, credentials, and permissions to be configured.",
      "Run the preflight from the actual runner network, not only from a developer laptop.",
      "A successful preflight proves only the checks it performed; it does not prove that a deployment will succeed.",
      "Avoid echoing secrets or complete environment variables into CI logs.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "<incident-id>",
    startTimeUtc: "<timestamp>",
    detectionSource: "<pipeline-alert-user-report>",
    affectedClusters: ["<cluster-name>"],
    affectedEnvironments: ["<production-staging-development>"],
    customerImpact: "<measured-impact>",
    firstObservedError: "<exact-error>",
    lastKnownGoodTime: "<timestamp>",
    awsAccountAndRegion: "<approved-account-and-region>",
    failingClient: "<runner-workstation-bastion>",
    networkPath: "<source-to-endpoint-path>",
    endpointAccessMode: "<public-private-or-both>",
    rootCause: "<evidence-backed-cause>",
    contributingFactors: ["<factor>"],
    remediation: ["<approved-action>"],
    validationEvidence: ["<test-and-result>"],
    rollbackPerformed: false,
    temporaryControlsRemoved: false,
    preventionActions: [
      {
        action: "<specific-prevention>",
        owner: "<team-or-role>",
        dueDate: "<date>",
      },
    ],
    lessonsLearned: ["<lesson>"],
  },

  handsOnLabs: [
    {
      title: "Lab 1: Wrong kubeconfig context",
      objective:
        "Recognize a client configuration problem without changing the EKS control plane.",
      steps: [
        "Use an authorized nonproduction environment.",
        "Inspect the current kubeconfig context.",
        "Compare the configured cluster with describe-cluster output.",
        "Correct the context using the approved configuration workflow.",
        "Verify a read-only API request.",
      ],
      expectedLearning:
        "A wrong context can look like an endpoint failure even when the intended cluster is healthy.",
    },
    {
      title: "Lab 2: DNS failure versus TCP timeout",
      objective:
        "Separate name resolution failures from network reachability failures.",
      steps: [
        "Run getent or nslookup from an approved client.",
        "Record the DNS result and timestamp.",
        "Test TCP 443 only after confirming the hostname.",
        "Compare results from a known-good management host.",
        "Write a conclusion identifying which layer is supported by the evidence.",
      ],
      expectedLearning:
        "DNS success is not proof of TCP reachability; TCP failure alone does not identify which network control is responsible.",
    },
    {
      title: "Lab 3: Public CIDR allowlist review",
      objective:
        "Diagnose a public endpoint allowlist mismatch without broadening access.",
      steps: [
        "Read endpointPublicAccess and publicAccessCidrs.",
        "Determine the actual client egress IP using an approved method.",
        "Compare the egress address with the configured allowlist.",
        "Prepare a narrow proposed change and rollback plan.",
        "Obtain approval before applying any change.",
      ],
      expectedLearning:
        "A correct allowlist diagnosis must account for NAT, VPN, and the actual source address observed by the endpoint.",
    },
    {
      title: "Lab 4: Private endpoint access",
      objective:
        "Understand why an EKS private endpoint is not reachable from an arbitrary internet-connected workstation.",
      steps: [
        "Inspect endpointPrivateAccess and endpointPublicAccess.",
        "Check the approved VPN or bastion connection.",
        "Inspect routes and DNS from the intended management network.",
        "Test TCP 443 and document the result.",
        "Propose the smallest correction without making the endpoint public.",
      ],
      expectedLearning:
        "Private endpoint recovery normally requires restoring the approved private path, not weakening endpoint security.",
    },
    {
      title: "Lab 5: Timeout versus Unauthorized versus Forbidden",
      objective:
        "Distinguish transport, authentication, and authorization failures.",
      steps: [
        "Record the exact kubectl error.",
        "Check AWS identity and token generation without printing the token.",
        "Run a permitted read-only request.",
        "Classify the failure by the layer where evidence first diverges.",
        "Recommend a minimal fix and a validation test.",
      ],
      expectedLearning:
        "Network, IAM authentication, and Kubernetes RBAC require different remediation paths.",
    },
  ],

  interviewQuestions: [
    {
      question: "Does an EKS API timeout mean the cluster is down?",
      answer:
        "No. It may be a client-side DNS, routing, firewall, endpoint-access, proxy, or control-plane issue. Existing workloads may continue running while the API is inaccessible.",
    },
    {
      question: "How do you distinguish DNS failure from a routing failure?",
      answer:
        "First verify the configured hostname and resolver result. If name resolution fails, investigate DNS. If it resolves but TCP 443 times out, investigate routes, security controls, and the return path.",
    },
    {
      question: "What is the difference between a timeout and Unauthorized?",
      answer:
        "A timeout indicates the request did not complete at the transport or request layer. Unauthorized indicates an HTTP/API response associated with authentication failure. Investigate the layer supported by the observed error.",
    },
    {
      question: "How would you troubleshoot a private EKS endpoint?",
      answer:
        "Verify private endpoint access, DNS resolution from the intended network, VPN or Direct Connect connectivity, route tables, security groups, NACLs, and return routing.",
    },
    {
      question: "Why should you avoid opening the endpoint to 0.0.0.0/0?",
      answer:
        "It can expose the management endpoint broadly and violate security policy. Identify the actual cause and preserve the approved access model.",
    },
    {
      question: "What does an EKS cluster status of ACTIVE prove?",
      answer:
        "It indicates the cluster reports an active lifecycle state. It does not prove that every client has a working route, DNS path, authentication configuration, or Kubernetes permission.",
    },
    {
      question: "How do you identify a recent network regression?",
      answer:
        "Correlate the first failure with CloudTrail configuration events, network telemetry, source/destination flow evidence, deployment changes, and results from known-good clients.",
    },
    {
      question: "How do you safely recover a failed deployment pipeline?",
      answer:
        "Restore the demonstrated faulty layer, validate from the failing runner, check partial changes from earlier pipeline stages, then resume with a canary and explicit health gates.",
    },
    {
      question: "When would you contact AWS Support?",
      answer:
        "When independent clients and network paths fail despite verified configuration, or when AWS service health and evidence suggest a provider-side issue. Provide timestamps, region, cluster identity, exact errors, and sanitized diagnostics.",
    },
    {
      question: "What evidence belongs in the incident report?",
      answer:
        "Impact, timeline, exact errors, client identity, endpoint mode, DNS and TCP results, relevant CloudTrail and network evidence, confirmed root cause, recovery validation, rollback details, and prevention owners.",
    },
  ],

  completionChecklist: [
    "The correct AWS account, region, and cluster were confirmed.",
    "The failing client and affected scope were identified.",
    "DNS, TCP, TLS, authentication, and authorization were evaluated separately.",
    "Endpoint access settings and the approved network path were verified.",
    "The root cause is supported by evidence rather than guesswork.",
    "The fix was approved and limited to the faulty component.",
    "Read-only API validation succeeded from the original failing client.",
    "The deployment resumed through a controlled canary or equivalent gate.",
    "Application health and SLOs were checked.",
    "Temporary privileges and network changes were reviewed and removed where appropriate.",
    "An incident report and prevention actions have owners.",
  ],

  references: [
    {
      title: "Amazon EKS cluster endpoint access",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html",
    },
    {
      title: "Troubleshooting Amazon EKS",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html",
    },
    {
      title: "Grant IAM users access to Kubernetes",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/access-entries.html",
    },
    {
      title: "Amazon EKS cluster security groups",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html",
    },
    {
      title: "Amazon VPC Flow Logs",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html",
    },
    {
      title: "AWS CloudTrail event history",
      url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html",
    },
    {
      title: "Kubernetes API access and authentication",
      url: "https://kubernetes.io/docs/reference/access-authn-authz/authentication/",
    },
  ],
} as const;

export default clusterEndpointUnreachableGuide;
