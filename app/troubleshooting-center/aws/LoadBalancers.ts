export interface LoadBalancersGuide {
  title: string;
  category: string;
  severity: string;
  estimatedTime: string;
  overview: string;
  incidentScenario: string;
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    purpose: string;
    commands: string[];
    interpretOutput: string[];
    nextAction: string;
  }[];
  errorMatrix: {
    symptom: string;
    likelyCauses: string[];
    verification: string[];
    resolution: string[];
  }[];
  recoveryProcedures: {
    scenario: string;
    procedure: string[];
    validation: string[];
    rollback: string[];
  }[];
  advancedScenarios: {
    title: string;
    symptoms: string[];
    investigation: string[];
    resolution: string[];
  }[];
  prevention: string[];
  monitoringAndAlerting: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    successCriteria: string[];
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  references: {
    title: string;
    url: string;
  }[];
}

export const loadBalancersGuide: LoadBalancersGuide = {
  title: "AWS Load Balancers — Real Production Troubleshooting",
  category: "AWS Networking, ELB, ALB, NLB, Target Groups",
  severity: "SEV-1 to SEV-3 depending on customer impact",
  estimatedTime: "15–60 minutes for initial isolation; complex networking incidents may take longer",

  overview: `
AWS Elastic Load Balancing distributes incoming traffic across registered targets.
Application Load Balancers operate at Layer 7 and support HTTP/HTTPS routing.
Network Load Balancers operate at Layer 4 and support TCP, TLS, UDP, and other
supported transport configurations. Gateway Load Balancers serve appliance
insertion use cases.

A load balancer incident may originate in DNS, listeners, listener rules,
certificates, security groups, network ACLs, route tables, target registration,
health checks, application readiness, connection handling, deployment changes,
or downstream dependencies.

The load balancer can be healthy while the application is failing. A target can
be registered but unhealthy. A successful health check does not prove that every
business endpoint works. Troubleshooting must identify the failing layer before
making production changes.
`,

  incidentScenario: `
At 10:15 AM, users report intermittent 502 and 503 errors after a deployment.
The AWS ALB exists and its DNS name resolves. Some requests succeed, but others
fail. CloudWatch shows a rise in HTTPCode_ELB_5XX_Count, and several targets
appear unhealthy.

The on-call engineer must determine whether the failure is caused by listener
rules, target health checks, a failed application deployment, security-group
changes, exhausted connections, overloaded targets, incorrect protocol settings,
or a downstream service.

Do not immediately recreate the load balancer or disable health checks. Preserve
the incident timeline, identify the affected target group, compare healthy and
unhealthy targets, and restore service through a controlled recovery.
`,

  impactAssessment: [
    "Confirm the affected application, environment, AWS account, Region, load balancer, listener, and target group.",
    "Determine whether all users are affected or only one path, hostname, availability zone, target group, or client network.",
    "Identify the exact symptom: DNS failure, TLS error, HTTP 4xx, HTTP 502, HTTP 503, HTTP 504, timeout, or connection reset.",
    "Check whether the incident started after a deployment, listener-rule change, certificate renewal, security-group change, scaling event, or DNS update.",
    "Compare current error rate, request volume, target response time, healthy host count, and latency with the normal baseline.",
    "Check whether traffic is failing at the load balancer, target, application, or a downstream dependency.",
    "Determine whether the deployment is still running and whether any infrastructure changes have already been applied.",
    "Set severity based on customer impact, affected endpoints, business criticality, and availability of a safe workaround.",
    "If an outage is active, coordinate incident ownership and parallelize independent investigations without making conflicting changes.",
  ],

  safetyChecks: [
    "Confirm AWS account and Region before running diagnostic commands.",
    "Identify the correct load balancer ARN, listener ARN, target group ARN, and application environment.",
    "Use read-only investigation first and follow the production change approval process.",
    "Do not disable health checks or register unhealthy targets just to make the healthy-target count appear normal.",
    "Do not open security groups to 0.0.0.0/0 unless the approved architecture explicitly requires it.",
    "Do not delete or recreate a production load balancer as an initial troubleshooting step.",
    "Avoid changing several listeners, security groups, target ports, and deployment settings at the same time.",
    "Before changing listener rules, capture the existing rule priority, conditions, actions, and default action.",
    "Before draining or deregistering targets, verify remaining healthy capacity and availability-zone distribution.",
    "Check whether a rollback will restore application compatibility with the current target group, health-check path, and listener configuration.",
    "Do not paste authorization headers, session cookies, private keys, or sensitive query strings into incident tickets.",
    "Treat production traffic tests as real requests; use approved test endpoints and avoid duplicate payments, writes, or destructive operations.",
  ],

  evidenceCollection: [
    "Incident start time, timezone, affected hostname, URL path, client location, and exact HTTP status or TLS error.",
    "Load balancer ARN, type, scheme, DNS name, listener ports, target group ARN, target type, and configured protocol.",
    "Target health state, reason code, description, target IP/port, availability zone, and last state transition.",
    "CloudWatch metrics including RequestCount, TargetResponseTime, HTTPCode_ELB_4XX_Count, HTTPCode_ELB_5XX_Count, HTTPCode_Target_4XX_Count, HTTPCode_Target_5XX_Count, HealthyHostCount, UnHealthyHostCount, and relevant connection metrics.",
    "Relevant ALB access logs or NLB logs where configured and supported, with sensitive request data handled appropriately.",
    "Application logs, container logs, ingress-controller logs, deployment events, and target-side health endpoint output.",
    "Listener rules, priorities, host/path conditions, target-group forwarding actions, stickiness, and weighted forwarding settings.",
    "Target registration and deregistration events, Auto Scaling activity, ECS service events, or Kubernetes endpoint changes.",
    "Security-group rules, network ACLs, route tables, DNS records, TLS certificate details, and relevant VPC endpoint or proxy configuration.",
    "Recent infrastructure-as-code changes, deployment commit, image digest, target port, application startup time, and rollback history.",
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm account, Region, and load balancer identity",
      purpose:
        "Avoid troubleshooting the wrong environment or a similarly named resource.",
      commands: [
        "aws sts get-caller-identity --output json",
        "aws elbv2 describe-load-balancers --region ap-south-1 --output table",
        "aws elbv2 describe-load-balancers --region ap-south-1 --names production-alb --output json",
      ],
      interpretOutput: [
        "Replace ap-south-1 and production-alb with the actual approved Region and load balancer name.",
        "Verify the account ID and load balancer ARN before inspecting or changing resources.",
        "The output identifies the load balancer type, scheme, DNS name, state, VPC, and availability zones where returned.",
        "A load balancer in an unexpected account or Region may be an environment-selection issue rather than an infrastructure outage.",
        "A name lookup failure may mean the name is wrong or the resource is in a different Region. It does not prove that the production load balancer is deleted.",
      ],
      nextAction:
        "Record the exact load balancer ARN and DNS name. Use that identity consistently in subsequent commands.",
    },
    {
      step: 2,
      title: "Reproduce the symptom from the client perspective",
      purpose:
        "Determine whether the issue is DNS, TLS, HTTP routing, or backend connectivity.",
      commands: [
        "nslookup app.example.com",
        "curl -sS -D - -o /dev/null https://app.example.com/health",
        "curl -v --connect-timeout 5 --max-time 15 https://app.example.com/health",
        "curl -sS -o /dev/null -w 'status=%{http_code} dns=%{time_namelookup}s connect=%{time_connect}s tls=%{time_appconnect}s ttfb=%{time_starttransfer}s total=%{time_total}s\\n' https://app.example.com/health",
      ],
      interpretOutput: [
        "Replace app.example.com and /health with the actual hostname and approved diagnostic path.",
        "DNS failure or an unexpected destination points toward DNS records, resolver behavior, or the wrong hostname.",
        "A certificate verification error suggests investigating certificate validity, hostname coverage, trust chain, or TLS configuration.",
        "A 404 can indicate the wrong host/path rule or an application route that does not exist.",
        "A 502, 503, or 504 must be correlated with target health, load balancer metrics, and application logs before assigning a root cause.",
        "Long connect time can indicate network or connection establishment issues. Long time-to-first-byte may indicate slow target processing or a downstream dependency.",
        "A single successful request does not rule out intermittent failures or failures affecting only other paths or availability zones.",
      ],
      nextAction:
        "Capture status code and timings for repeated requests over a short approved window. Compare a failing path with a known-good path.",
    },
    {
      step: 3,
      title: "Inspect listeners and listener rules",
      purpose:
        "Verify that traffic reaches the intended protocol, port, and target group.",
      commands: [
        "aws elbv2 describe-listeners --load-balancer-arn LOAD_BALANCER_ARN --region ap-south-1 --output table",
        "aws elbv2 describe-rules --listener-arn LISTENER_ARN --region ap-south-1 --output json",
      ],
      interpretOutput: [
        "Replace LOAD_BALANCER_ARN and LISTENER_ARN with real ARNs.",
        "Verify listener protocol and port, default action, certificate association, and target group referenced by forwarding actions.",
        "ALB rules are evaluated by priority. An earlier matching host or path rule may route traffic to an unexpected target group.",
        "Check host-header and path-pattern conditions, redirects, fixed responses, authentication actions, and weighted forwarding.",
        "Confirm that a recent rule change did not send traffic to a new target group with zero healthy targets.",
        "For an NLB, inspect supported listener and target-group protocols and do not assume ALB-style host/path routing is available.",
      ],
      nextAction:
        "Compare the active configuration with the last known-good deployment or infrastructure plan. Identify the exact routing decision for the failing request.",
    },
    {
      step: 4,
      title: "Identify the target group selected by the listener",
      purpose:
        "Connect the external request to the backend targets that should receive it.",
      commands: [
        "aws elbv2 describe-target-groups --load-balancer-arn LOAD_BALANCER_ARN --region ap-south-1 --output table",
        "aws elbv2 describe-target-groups --target-group-arns TARGET_GROUP_ARN --region ap-south-1 --output json",
      ],
      interpretOutput: [
        "Verify target type: instance, ip, lambda, or another supported target type.",
        "Confirm target protocol, port, VPC, health-check protocol, health-check port, and health-check path.",
        "A target group can exist without any registered targets.",
        "A target group can have registered targets but no healthy targets.",
        "Check that the target group is associated with the intended load balancer and listener.",
        "If a weighted forwarding action references multiple target groups, inspect every group and its configured weight.",
      ],
      nextAction:
        "Record the target group ARN and its protocol, port, health-check configuration, and target type before inspecting target health.",
    },
    {
      step: 5,
      title: "Inspect registered target health and reason codes",
      purpose:
        "Determine why the load balancer considers each backend healthy or unhealthy.",
      commands: [
        "aws elbv2 describe-target-health --target-group-arn TARGET_GROUP_ARN --region ap-south-1 --output table",
        "aws elbv2 describe-target-health --target-group-arn TARGET_GROUP_ARN --region ap-south-1 --output json",
      ],
      interpretOutput: [
        "healthy means the target currently passes the configured health check; it does not prove all application endpoints work.",
        "initial may indicate registration or health checks are still in progress.",
        "unused can indicate that the target is not registered, its Availability Zone is not enabled for the load balancer, or another target-group eligibility condition is not met.",
        "unhealthy commonly requires inspection of Target.Timeout, Target.ResponseCodeMismatch, Target.FailedHealthChecks, or other returned reason codes.",
        "draining indicates deregistration is in progress; investigate deployment or scaling activity if requests are being terminated unexpectedly.",
        "The exact reason code depends on target type and service behavior. Use the actual returned code rather than assuming all targets fail for the same reason.",
        "A healthy target count of zero may cause ALB to fail open in certain target-health situations; this behavior is not a safe substitute for healthy capacity.",
      ],
      nextAction:
        "Group targets by reason code, port, availability zone, and deployment version. Investigate one representative failed target and compare it with a healthy target.",
    },
    {
      step: 6,
      title: "Verify the application health endpoint locally",
      purpose:
        "Separate a target application failure from a load balancer routing failure.",
      commands: [
        "curl -v --connect-timeout 3 --max-time 10 http://127.0.0.1:8080/health",
        "ss -lntp",
        "ps -ef",
        "journalctl -u myapp --since '30 minutes ago' --no-pager",
      ],
      interpretOutput: [
        "Run these commands on an approved target host or inside the correct container. Replace port, path, and service name.",
        "Connection refused commonly indicates no process is listening on the expected address/port, or the connection is being actively rejected.",
        "A timeout can indicate an unresponsive application, local firewall, overloaded process, or incorrect network path.",
        "A 404 or unexpected response indicates the configured health-check path may not exist or the request is reaching the wrong virtual host or application.",
        "A 500 response suggests the health endpoint or an application dependency is failing.",
        "A process listening only on 127.0.0.1 may not accept connections arriving through the target's private IP.",
        "A successful local health check does not prove that the load balancer can reach the target through the VPC network.",
      ],
      nextAction:
        "Fix the confirmed application startup, bind address, endpoint, or dependency problem. Then validate the same endpoint from an appropriate network location.",
    },
    {
      step: 7,
      title: "Validate security groups and network paths",
      purpose:
        "Verify that traffic can travel from the load balancer to the targets on the configured port.",
      commands: [
        "aws elbv2 describe-load-balancers --load-balancer-arn LOAD_BALANCER_ARN --region ap-south-1 --query 'LoadBalancers[0].SecurityGroups' --output json",
        "aws elbv2 describe-target-health --target-group-arn TARGET_GROUP_ARN --region ap-south-1 --output json",
        "aws ec2 describe-security-groups --group-ids sg-LOADBALANCER sg-TARGET --region ap-south-1 --output json",
        "aws ec2 describe-network-acls --filters Name=vpc-id,Values=vpc-EXAMPLE --region ap-south-1 --output json",
        "aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-EXAMPLE --region ap-south-1 --output json",
      ],
      interpretOutput: [
        "Replace example IDs with real IDs and use valid command arguments. For the security-group command, supply actual security-group IDs.",
        "For an ALB, verify that the load balancer security group permits inbound client traffic on the listener port and outbound traffic to target ports.",
        "Verify that the target security group allows inbound traffic from the load balancer security group on the target and health-check ports.",
        "For an NLB, security-group availability and behavior depend on the NLB configuration. Do not apply ALB assumptions blindly.",
        "Network ACLs are stateless; required return traffic must also be allowed.",
        "For instance targets, verify VPC routes and target reachability. For IP targets, confirm that the target IP is reachable from the load balancer network.",
        "Do not assume that opening the instance security group to the internet is a valid fix.",
      ],
      nextAction:
        "Identify the exact blocked direction and port. Propose the smallest network rule correction and obtain approval before changing production rules.",
    },
    {
      step: 8,
      title: "Inspect load balancer and target CloudWatch metrics",
      purpose:
        "Correlate error spikes with target health, latency, and request volume.",
      commands: [
        "aws cloudwatch get-metric-statistics --namespace AWS/ApplicationELB --metric-name RequestCount --dimensions Name=LoadBalancer,Value=app/production-alb/EXAMPLE --start-time 2026-10-27T09:00:00Z --end-time 2026-10-27T10:00:00Z --period 60 --statistics Sum --region ap-south-1",
        "aws cloudwatch get-metric-statistics --namespace AWS/ApplicationELB --metric-name HTTPCode_ELB_5XX_Count --dimensions Name=LoadBalancer,Value=app/production-alb/EXAMPLE --start-time 2026-10-27T09:00:00Z --end-time 2026-10-27T10:00:00Z --period 60 --statistics Sum --region ap-south-1",
        "aws cloudwatch get-metric-statistics --namespace AWS/ApplicationELB --metric-name TargetResponseTime --dimensions Name=LoadBalancer,Value=app/production-alb/EXAMPLE --start-time 2026-10-27T09:00:00Z --end-time 2026-10-27T10:00:00Z --period 60 --statistics Average --region ap-south-1",
      ],
      interpretOutput: [
        "Replace timestamps, Region, and metric dimensions with the actual incident window and load balancer dimension value.",
        "The sample timestamps are illustrative; use a valid UTC time range matching the incident.",
        "ALB CloudWatch dimension values generally use the load balancer resource suffix rather than the full ARN. Confirm the exact dimension format for the metric.",
        "HTTPCode_ELB_5XX_Count represents server errors generated by the load balancer; HTTPCode_Target_5XX_Count represents target-generated server errors.",
        "TargetResponseTime measures target response timing for relevant ALB metrics. Compare average and percentile statistics where available.",
        "A sudden drop in RequestCount can mean traffic stopped reaching the load balancer, DNS changed, or clients are failing before the request arrives.",
        "Check HealthyHostCount and UnHealthyHostCount using the correct target-group and load-balancer dimensions; some metrics require multiple dimensions.",
        "Metric absence can reflect incorrect dimensions, unsupported metrics, low request volume, or publication behavior. It is not proof of zero failures.",
      ],
      nextAction:
        "Align metric timestamps with deployment and target-health events. Use the resulting pattern to distinguish routing failures, target failures, and increased backend latency.",
    },
    {
      step: 9,
      title: "Distinguish ALB-generated errors from target-generated errors",
      purpose:
        "Avoid fixing the application when the load balancer generated the response, or vice versa.",
      commands: [
        "aws cloudwatch get-metric-statistics --namespace AWS/ApplicationELB --metric-name HTTPCode_ELB_502_Count --dimensions Name=LoadBalancer,Value=app/production-alb/EXAMPLE --start-time 2026-10-27T09:00:00Z --end-time 2026-10-27T10:00:00Z --period 60 --statistics Sum --region ap-south-1",
        "aws cloudwatch get-metric-statistics --namespace AWS/ApplicationELB --metric-name HTTPCode_Target_5XX_Count --dimensions Name=LoadBalancer,Value=app/production-alb/EXAMPLE --start-time 2026-10-27T09:00:00Z --end-time 2026-10-27T10:00:00Z --period 60 --statistics Sum --region ap-south-1",
      ],
      interpretOutput: [
        "Use the exact supported metric names and dimensions for the load balancer type and Region.",
        "An ALB-generated 502 can be associated with target connection failures, resets, invalid responses, or protocol mismatches; inspect access logs and target logs for evidence.",
        "Target-generated 5xx responses indicate the target returned an error response. Investigate application exceptions, dependencies, resource pressure, and release changes.",
        "An ALB-generated 503 can occur when no suitable target is available for a request or other load-balancer-specific conditions apply.",
        "A 504 often points toward a target response timeout or a network path that prevents a timely response. Confirm using timing data and logs.",
        "Do not assume that every 502 is caused by an unhealthy target or that every 503 means the entire load balancer is down.",
      ],
      nextAction:
        "Use metrics and access logs to identify who generated the response, then correlate the request with target and application logs.",
    },
    {
      step: 10,
      title: "Check TLS certificates and HTTPS listener configuration",
      purpose:
        "Investigate handshake failures, hostname mismatch, expired certificates, and TLS configuration issues.",
      commands: [
        "aws elbv2 describe-listeners --load-balancer-arn LOAD_BALANCER_ARN --region ap-south-1 --output json",
        "aws acm describe-certificate --certificate-arn CERTIFICATE_ARN --region ap-south-1 --output json",
        "openssl s_client -connect app.example.com:443 -servername app.example.com </dev/null",
        "curl -Iv https://app.example.com/",
      ],
      interpretOutput: [
        "Confirm that the certificate is issued or otherwise in the expected state, covers the requested hostname, and is attached to the intended HTTPS listener.",
        "For an ALB HTTPS listener, verify listener certificate associations and TLS security policy.",
        "For an NLB TLS listener, verify the NLB listener configuration and its supported TLS settings.",
        "A certificate can be valid but still not cover a particular hostname.",
        "A certificate in the wrong Region cannot be associated with a regional load balancer where ACM certificate requirements apply.",
        "TLS termination at the load balancer and TLS from the load balancer to the target are separate connections. Validate both when target HTTPS is configured.",
      ],
      nextAction:
        "Correct the certificate association, hostname, listener configuration, or target-side TLS setup that evidence identifies. Validate with a fresh TLS handshake.",
    },
    {
      step: 11,
      title: "Check DNS, Route 53, and hostname routing",
      purpose:
        "Determine whether users are resolving to the intended load balancer.",
      commands: [
        "dig app.example.com",
        "dig +short app.example.com",
        "aws route53 list-hosted-zones-by-name --dns-name example.com --output json",
        "aws route53 list-resource-record-sets --hosted-zone-id ZONE_ID --output json",
      ],
      interpretOutput: [
        "Replace the hostname, domain, and hosted-zone ID with actual values.",
        "Verify that the alias or DNS record points to the intended load balancer and that the hostname is correct.",
        "Compare results from the affected client network and an approved independent resolver.",
        "DNS caching and TTL can cause different clients to observe old and new records during a change.",
        "If DNS resolves correctly but HTTP routing fails, investigate listeners and target groups rather than changing DNS repeatedly.",
        "Check whether a failover or weighted DNS configuration is intentionally routing traffic to multiple destinations.",
      ],
      nextAction:
        "Correct the DNS record only if the record is proven wrong. Allow for caching and validate resolution and application behavior from multiple relevant client locations.",
    },
    {
      step: 12,
      title: "Inspect ALB access logs and application logs",
      purpose:
        "Correlate individual failed requests with the load balancer's routing and target behavior.",
      commands: [
        "aws elbv2 describe-load-balancer-attributes --load-balancer-arn LOAD_BALANCER_ARN --region ap-south-1 --output json",
        "aws s3 ls s3://approved-alb-access-logs/ --recursive",
        "grep -E ' 502 | 503 | 504 ' application.log",
      ],
      interpretOutput: [
        "Access logs must be enabled and correctly configured before historical log files are available.",
        "The S3 bucket and log prefix must be replaced with the approved destination. Do not assume logs exist just because the feature is supported.",
        "ALB access-log records include request, target, response, and timing fields that can help distinguish target connection errors from target responses.",
        "NLB logging capabilities differ from ALB access logging. Verify the supported logging type for the deployed load balancer and configuration.",
        "The grep command is an illustrative application-log search. Actual log formats and status fields vary by application.",
        "Correlate request time, target IP, target status, load balancer status, and request path. Redact sensitive query parameters and headers.",
      ],
      nextAction:
        "Use a small sample of failing and successful requests to determine whether failures share a target, path, host, deployment version, or time window.",
    },
    {
      step: 13,
      title: "Investigate ECS and containerized workloads",
      purpose:
        "Find target registration, port mapping, task health, and deployment issues.",
      commands: [
        "aws ecs describe-services --cluster production-cluster --services production-service --region ap-south-1 --output json",
        "aws ecs list-tasks --cluster production-cluster --service-name production-service --desired-status RUNNING --region ap-south-1 --output json",
        "aws ecs describe-tasks --cluster production-cluster --tasks TASK_ARN --region ap-south-1 --output json",
        "aws ecs describe-task-definition --task-definition production-task --region ap-south-1 --output json",
      ],
      interpretOutput: [
        "Replace cluster, service, task ARN, and task-definition values with actual identifiers.",
        "Inspect service events, desired/running counts, task health, task ENI, container port mappings, and target group configuration.",
        "Verify that the registered target port matches the container's actual listening port.",
        "A container can be running while its application is not ready to serve traffic.",
        "Review health-check grace periods, deployment circuit breakers, minimum healthy percent, and maximum percent where applicable.",
        "Do not increase grace periods blindly if the application is actually crashing or stuck.",
      ],
      nextAction:
        "Correct the verified port, health, or deployment configuration issue. Check ECS service events and target health before initiating another rollout.",
    },
    {
      step: 14,
      title: "Investigate EKS and Kubernetes ingress traffic",
      purpose:
        "Separate load balancer target issues from Kubernetes Service, EndpointSlice, pod, and ingress issues.",
      commands: [
        "kubectl get ingress -A",
        "kubectl get svc -A",
        "kubectl get endpointslices -A",
        "kubectl get pods -A -o wide",
        "kubectl describe ingress -n production production-ingress",
        "kubectl describe svc -n production production-service",
        "kubectl get events -n production --sort-by=.lastTimestamp",
      ],
      interpretOutput: [
        "Use the correct cluster context and namespace. Verify the context before making changes.",
        "Check whether the Service has ready endpoints and whether the expected pods are ready.",
        "Confirm the Service port, targetPort, pod container port, and ingress or load-balancer target-group configuration.",
        "With AWS Load Balancer Controller, inspect controller logs and events when reconciliation or target registration appears incorrect.",
        "For IP target mode, verify that pod IPs are registered and reachable. For instance target mode, inspect node and NodePort behavior.",
        "A Kubernetes Ingress resource does not guarantee that the controller successfully provisioned or configured an ALB.",
      ],
      nextAction:
        "Identify the failing layer—Ingress, controller, Service, EndpointSlice, pod, or AWS target group—and correct that layer without restarting every workload.",
    },
    {
      step: 15,
      title: "Check target saturation and application capacity",
      purpose:
        "Determine whether healthy targets are overloaded or connections are being exhausted.",
      commands: [
        "top",
        "free -m",
        "uptime",
        "ss -s",
        "ss -ant",
        "journalctl -u myapp --since '30 minutes ago' --no-pager",
      ],
      interpretOutput: [
        "Run commands on the approved target host or in the appropriate container or node context.",
        "High CPU, memory pressure, repeated restarts, or a growing queue can increase target response time.",
        "Large numbers of connections in unusual states may indicate connection handling problems, but interpret them against the application's architecture and normal baseline.",
        "Check thread pools, connection pools, file descriptors, database connections, request queues, and downstream latency using application-specific telemetry.",
        "Increasing the load balancer idle timeout is not a universal fix for slow targets or exhausted connection pools.",
      ],
      nextAction:
        "If capacity is the proven issue, use the approved scaling or load-shedding strategy and investigate why the demand or resource consumption changed.",
    },
    {
      step: 16,
      title: "Validate Auto Scaling and availability-zone distribution",
      purpose:
        "Determine whether targets are missing, overloaded, or unevenly distributed across zones.",
      commands: [
        "aws autoscaling describe-auto-scaling-groups --region ap-south-1 --output table",
        "aws autoscaling describe-scaling-activities --auto-scaling-group-name production-asg --region ap-south-1 --output json",
        "aws elbv2 describe-load-balancers --load-balancer-arn LOAD_BALANCER_ARN --region ap-south-1 --query 'LoadBalancers[0].AvailabilityZones' --output json",
      ],
      interpretOutput: [
        "Replace the Auto Scaling group and load balancer values with the actual resources.",
        "Check desired, minimum, maximum, and current capacity, failed scaling activities, launch-template changes, and instance health.",
        "Verify that required Availability Zones are enabled and that targets are registered in the intended zones.",
        "A healthy-target count can vary during scaling or deployment. Interpret it with capacity and traffic metrics.",
        "Do not increase maximum capacity without checking quotas, subnet IP availability, resource cost, and application dependencies.",
      ],
      nextAction:
        "Restore the intended capacity and zone distribution using the approved scaling policy. Verify healthy targets before declaring recovery.",
    },
    {
      step: 17,
      title: "Review deployment changes and rollback eligibility",
      purpose:
        "Determine whether a recent release introduced the failure.",
      commands: [
        "git log -5 --oneline",
        "git diff --stat",
        "git diff --",
        "aws ecs describe-services --cluster production-cluster --services production-service --region ap-south-1 --output json",
      ],
      interpretOutput: [
        "Run Git commands in the correct repository and deployment commit context.",
        "Compare target ports, health-check path, application startup behavior, listener rules, environment variables, and image digest with the last known-good release.",
        "A deployment can change the application without changing the load balancer, or change routing without changing the application.",
        "For ECS, inspect deployment status and recent service events before choosing a rollback.",
        "For EC2 Auto Scaling or EKS, use the environment's established rollback mechanism rather than manually terminating targets.",
      ],
      nextAction:
        "If a release is the evidence-backed cause and a known-good version is compatible with the current infrastructure, follow the approved rollback process and validate the result.",
    },
    {
      step: 18,
      title: "Run controlled post-fix validation",
      purpose:
        "Prove that the service is recovering and that the fix did not introduce another failure.",
      commands: [
        "curl -sS -o /dev/null -w 'status=%{http_code} total=%{time_total}s\\n' https://app.example.com/health",
        "aws elbv2 describe-target-health --target-group-arn TARGET_GROUP_ARN --region ap-south-1 --output table",
        "aws cloudwatch get-metric-statistics --namespace AWS/ApplicationELB --metric-name RequestCount --dimensions Name=LoadBalancer,Value=app/production-alb/EXAMPLE --start-time 2026-10-27T09:00:00Z --end-time 2026-10-27T10:00:00Z --period 60 --statistics Sum --region ap-south-1",
      ],
      interpretOutput: [
        "Replace sample hostnames, ARNs, dimensions, and timestamps with actual values.",
        "Confirm that the approved health endpoint returns the expected status and latency.",
        "Confirm that targets are healthy and that the healthy-target count matches the intended deployment capacity.",
        "Check ELB-generated and target-generated 5xx metrics, target latency, request volume, and application error rates.",
        "Test important business endpoints as well as the health endpoint, using safe test requests.",
        "Observe the service for an appropriate period before closing the incident. One successful request is not enough.",
      ],
      nextAction:
        "Document validation results, confirm application and customer impact have returned to normal, and hand off any remaining preventive work.",
    },
  ],

  errorMatrix: [
    {
      symptom: "HTTP 502 Bad Gateway",
      likelyCauses: [
        "Target connection reset or connection failure.",
        "Target returned an invalid or unexpected response.",
        "HTTP/HTTPS protocol or port mismatch.",
        "Application process crashed or closed a connection unexpectedly.",
        "TLS handshake failure between the load balancer and target where HTTPS is configured.",
      ],
      verification: [
        "Compare HTTPCode_ELB_502_Count and HTTPCode_Target_5XX_Count.",
        "Inspect ALB access logs, target health, target response timing, and application logs.",
        "Test the target's configured protocol and port from an approved network location.",
        "Review deployment and application restart events around the first failure.",
      ],
      resolution: [
        "Correct the target protocol, port, listener action, or application response behavior that evidence identifies.",
        "Restore application health or roll back the faulty release when appropriate.",
        "Validate successful requests and confirm that 502 metrics return toward baseline.",
      ],
    },
    {
      symptom: "HTTP 503 Service Unavailable",
      likelyCauses: [
        "No suitable healthy targets are available for the request.",
        "Listener rules forward to a target group with no healthy capacity.",
        "Target registration or deployment has failed.",
        "Application capacity or a service-specific condition prevents requests from being served.",
      ],
      verification: [
        "Inspect target health and reason codes.",
        "Inspect listener rules and every target group used by weighted forwarding.",
        "Check ECS, EKS, or Auto Scaling events and healthy capacity.",
        "Compare RequestCount, HealthyHostCount, and error metrics.",
      ],
      resolution: [
        "Restore sufficient healthy capacity and correct registration or routing.",
        "Fix the underlying health-check or application failure rather than disabling health checks.",
        "Validate that every production listener routes to an intended target group.",
      ],
    },
    {
      symptom: "HTTP 504 Gateway Timeout",
      likelyCauses: [
        "The target did not respond before the applicable timeout.",
        "Network path or target connectivity delays.",
        "Slow application processing or blocked worker threads.",
        "Slow database, API, DNS, or other downstream dependency.",
      ],
      verification: [
        "Inspect TargetResponseTime and ALB access-log timing fields.",
        "Compare the target health endpoint with the slow business endpoint.",
        "Inspect application traces, request queues, database latency, and downstream error rates.",
        "Verify network reachability and relevant timeout settings.",
      ],
      resolution: [
        "Correct the slow dependency, connection problem, or application bottleneck.",
        "Adjust timeout settings only when the workload requires it and the change is safe.",
        "Use bounded retries, timeouts, and circuit breakers where appropriate.",
      ],
    },
    {
      symptom: "HTTP 404 or unexpected redirect",
      likelyCauses: [
        "Host-header or path-pattern rule does not match.",
        "Higher-priority rule routes traffic to the wrong target group.",
        "Application route does not exist.",
        "Redirect action has an incorrect hostname, path, or protocol.",
      ],
      verification: [
        "Inspect listener rule priority and conditions.",
        "Test the intended hostname and path.",
        "Inspect application routing and access logs.",
      ],
      resolution: [
        "Correct the rule condition, priority, action, or application route based on evidence.",
        "Validate both the affected path and other paths sharing the listener.",
      ],
    },
    {
      symptom: "Targets are unhealthy with Target.ResponseCodeMismatch",
      likelyCauses: [
        "Health-check path returns an unexpected status code.",
        "Authentication, redirect, or host-based routing interferes with the health request.",
        "Application readiness endpoint reports unhealthy.",
      ],
      verification: [
        "Inspect target-group health-check path and matcher.",
        "Test the endpoint locally and from an appropriate network location.",
        "Inspect application and target logs for the health request.",
      ],
      resolution: [
        "Use a stable health endpoint with an intentional response contract.",
        "Configure an appropriate matcher only when the returned status is genuinely healthy.",
        "Do not broaden accepted status codes simply to hide an unhealthy application.",
      ],
    },
    {
      symptom: "Targets are unhealthy with Target.Timeout",
      likelyCauses: [
        "The target is unreachable on the health-check port.",
        "Security groups or network ACLs block traffic.",
        "Application response is too slow or the process is not listening.",
        "The health-check protocol or port is incorrect.",
      ],
      verification: [
        "Inspect target health details and health-check configuration.",
        "Verify process listening address and port.",
        "Inspect target and load balancer security-group relationships and network ACLs.",
      ],
      resolution: [
        "Restore the required network path or correct the application bind address and port.",
        "Adjust health-check timeout only when the application behavior justifies it.",
      ],
    },
    {
      symptom: "DNS resolves, but the site is unavailable",
      likelyCauses: [
        "Wrong alias or stale DNS result.",
        "Listener does not accept the requested port.",
        "TLS certificate or SNI mismatch.",
        "Routing rule or target group is unhealthy.",
      ],
      verification: [
        "Inspect DNS answers and certificate handshake.",
        "Check listener protocol and port.",
        "Inspect target health and listener rules.",
      ],
      resolution: [
        "Fix the layer proven to be wrong rather than repeatedly changing DNS.",
        "Validate from multiple relevant client networks after changes.",
      ],
    },
    {
      symptom: "Intermittent errors after deployment",
      likelyCauses: [
        "Only some targets have the new broken release.",
        "A rolling deployment temporarily has insufficient healthy capacity.",
        "Weighted forwarding sends requests to a broken target group.",
        "Application startup time exceeds readiness behavior.",
      ],
      verification: [
        "Group failed requests by target IP, target group, availability zone, and release version.",
        "Inspect target registration, deployment events, and target-health transitions.",
        "Compare errors with deployment timestamps.",
      ],
      resolution: [
        "Stop or roll back the faulty rollout using the established deployment mechanism.",
        "Restore sufficient healthy capacity and verify each active target group.",
      ],
    },
  ],

  recoveryProcedures: [
    {
      scenario: "ALB returns 502 after a new deployment",
      procedure: [
        "Confirm the first failure timestamp and identify the target group receiving the request.",
        "Compare ELB-generated 502 metrics with target-generated 5xx metrics.",
        "Inspect target health and ALB access-log details.",
        "Test the affected application port and endpoint on a representative target.",
        "If a release is proven faulty, stop the rollout and follow the approved rollback mechanism.",
        "If the cause is a protocol or port mismatch, restore the intended listener and target-group configuration through the normal change process.",
      ],
      validation: [
        "Targets pass the configured health checks.",
        "The affected hostname and path return the expected application response.",
        "ELB-generated 502 and target-generated 5xx metrics trend toward baseline.",
        "Application logs show no new startup, connection, or dependency errors.",
      ],
      rollback: [
        "Restore the last known-good application release or listener configuration when the approved rollback plan applies.",
        "Avoid rolling back unrelated networking changes without evidence.",
        "Verify that the restored release is compatible with current database and infrastructure changes.",
      ],
    },
    {
      scenario: "All targets become unhealthy",
      procedure: [
        "Check whether the target group has registered targets and record every health reason code.",
        "Test the health endpoint and listener port on a representative target.",
        "Verify security groups, network ACLs, routes, and the actual health-check port.",
        "Inspect recent application deployments, scaling events, and target registration changes.",
        "Restore the confirmed application or network fault through an approved change.",
      ],
      validation: [
        "HealthyHostCount returns to the expected range.",
        "Target-health output shows healthy targets across the intended availability zones.",
        "External health checks and business endpoints succeed.",
        "No security group or health-check workaround has weakened the intended security posture.",
      ],
      rollback: [
        "Revert the specific health-check or network change if it caused the outage.",
        "If the application release is responsible, restore the known-good release using the standard deployment process.",
        "Do not mark all targets healthy by weakening health checks without proving that the application is ready.",
      ],
    },
    {
      scenario: "503 caused by zero healthy targets",
      procedure: [
        "Inspect listener actions and all target groups receiving traffic.",
        "Check registration, deployment state, scaling activity, and target-health reason codes.",
        "Determine whether the cause is an application failure, port mismatch, network restriction, or unavailable capacity.",
        "Restore valid targets or redirect traffic only to a known-good and approved target group.",
        "Avoid sending traffic to a target group with no verified healthy capacity.",
      ],
      validation: [
        "Every active forwarding destination has the intended healthy capacity.",
        "RequestCount and response metrics match the expected traffic pattern.",
        "The application responds successfully from the public or private entry point appropriate to the service.",
      ],
      rollback: [
        "Restore the previous known-good listener rule or deployment configuration if the latest change introduced the issue.",
        "Preserve the existing load balancer resource and unrelated listener rules unless a separate approved change is required.",
      ],
    },
    {
      scenario: "HTTPS certificate or listener change causes an outage",
      procedure: [
        "Verify hostname, certificate status, certificate association, and listener protocol.",
        "Capture the current listener and certificate configuration.",
        "Identify whether the failure occurs during client-to-load-balancer TLS or load-balancer-to-target TLS.",
        "Restore the previous valid certificate or listener configuration through the approved process.",
      ],
      validation: [
        "A new TLS handshake succeeds for each intended hostname.",
        "The certificate covers the hostname and has a valid trust chain.",
        "The listener forwards requests to the expected target group.",
      ],
      rollback: [
        "Restore the previous known-good certificate association or listener setting.",
        "Do not disable TLS verification in clients as a production workaround.",
      ],
    },
  ],

  advancedScenarios: [
    {
      title: "ALB forwards traffic to the wrong service",
      symptoms: [
        "One hostname works but another returns 404 or a different application.",
        "The deployment completed successfully, but traffic reaches an unexpected target group.",
      ],
      investigation: [
        "Inspect listener rule priorities and host-header/path-pattern conditions.",
        "Compare the requested hostname and path with the matching rule.",
        "Inspect weighted target-group forwarding and recent IaC changes.",
        "Correlate access-log records with the selected target and application response.",
      ],
      resolution: [
        "Correct the specific condition, priority, or forwarding action through the approved infrastructure workflow.",
        "Test all hostnames and critical paths that share the listener.",
      ],
    },
    {
      title: "Target port mismatch after container deployment",
      symptoms: [
        "Tasks or pods are running but health checks fail.",
        "Connection attempts to the registered target port time out or are refused.",
      ],
      investigation: [
        "Inspect the target-group port and the actual registered target port.",
        "Inspect ECS port mappings or Kubernetes Service targetPort and pod container ports.",
        "Confirm the application listens on the expected interface and port.",
        "Check whether dynamic host-port mapping is in use.",
      ],
      resolution: [
        "Align the service, container, target-group, and health-check ports with the intended architecture.",
        "Redeploy or reconcile through the normal service controller instead of manually editing managed targets unnecessarily.",
      ],
    },
    {
      title: "ALB health checks pass but users still see failures",
      symptoms: [
        "HealthyHostCount appears normal.",
        "A business endpoint returns 5xx while the health endpoint returns success.",
      ],
      investigation: [
        "Compare the health-check path with the failing business endpoint.",
        "Inspect application traces, downstream service latency, and request-specific errors.",
        "Compare target-generated errors with ELB-generated errors.",
        "Check whether the health endpoint is too shallow and reports success while critical dependencies are unavailable.",
      ],
      resolution: [
        "Keep liveness and readiness semantics intentional and stable.",
        "Improve readiness checks only for dependencies that must be available before serving traffic.",
        "Add business-level synthetic checks and alerts for critical endpoints.",
      ],
    },
    {
      title: "Intermittent failures limited to one Availability Zone",
      symptoms: [
        "Some users report errors while others succeed.",
        "Target health or latency differs by zone.",
      ],
      investigation: [
        "Group target health, errors, latency, and application logs by availability zone.",
        "Check enabled load-balancer zones, target registration, subnet IP capacity, routes, and security controls.",
        "Inspect scaling and deployment activity for the affected zone.",
      ],
      resolution: [
        "Restore target capacity and network reachability in the affected zone.",
        "Use approved traffic-shifting or failover controls if the architecture supports them.",
        "Do not disable an entire zone without verifying remaining capacity and application dependencies.",
      ],
    },
    {
      title: "Slow responses cause 504 errors",
      symptoms: [
        "TargetResponseTime increases before HTTP 504 errors rise.",
        "The health endpoint works but complex API calls time out.",
      ],
      investigation: [
        "Trace slow requests through the application and its database or downstream APIs.",
        "Check request queues, thread pools, connection pools, CPU, memory, and database connection limits.",
        "Compare load-balancer timeout settings with application and downstream timeouts.",
      ],
      resolution: [
        "Fix the slow dependency or resource bottleneck.",
        "Use bounded retries and timeouts to prevent cascading failure.",
        "Change timeout values only after validating the request's expected duration and capacity implications.",
      ],
    },
    {
      title: "ECS deployment creates healthy tasks but traffic fails",
      symptoms: [
        "ECS tasks are running but ALB target health is unhealthy.",
        "Deployment stalls or old tasks drain before new tasks are ready.",
      ],
      investigation: [
        "Inspect ECS service events and deployment configuration.",
        "Verify target-group association, container name, container port, health-check path, and task security group.",
        "Check startup time and readiness behavior.",
        "Review deployment minimum healthy percent, maximum percent, and circuit-breaker settings.",
      ],
      resolution: [
        "Correct the port mapping, health endpoint, or target-group association.",
        "Use a suitable startup/readiness design and rollout strategy.",
        "Roll back through ECS's approved deployment mechanism if the new revision is faulty.",
      ],
    },
    {
      title: "EKS ingress or AWS Load Balancer Controller reconciliation fails",
      symptoms: [
        "Ingress exists but the ALB listener or target group is missing or incorrect.",
        "Targets are not registered or traffic reaches a default backend.",
      ],
      investigation: [
        "Check Kubernetes events and AWS Load Balancer Controller logs.",
        "Inspect ingress annotations, ingress class, Service ports, target type, and subnet discovery.",
        "Verify controller IAM permissions and AWS API errors.",
        "Compare Kubernetes desired state with the actual AWS load balancer resources.",
      ],
      resolution: [
        "Correct the resource configuration or controller permission that evidence identifies.",
        "Let the controller reconcile managed resources rather than manually modifying them in a way that conflicts with its desired state.",
        "Verify listener rules, target health, and application response after reconciliation.",
      ],
    },
    {
      title: "NLB connection failures or unexpected client IP behavior",
      symptoms: [
        "TCP connections fail even though the target application is listening.",
        "The target observes a different source address than expected.",
      ],
      investigation: [
        "Confirm NLB listener protocol, target type, target-group protocol, and health-check settings.",
        "Inspect the NLB security-group configuration where supported, target security groups, routes, and network ACLs.",
        "Verify client-IP preservation and proxy protocol settings against the application.",
        "Inspect TCP resets, connection errors, target health, and relevant supported metrics or logs.",
      ],
      resolution: [
        "Align listener and target protocols with the application.",
        "Correct the required network path and source-address handling.",
        "Enable proxy protocol only when the target application or proxy explicitly supports and expects it.",
      ],
    },
    {
      title: "TLS works from some clients but fails from others",
      symptoms: [
        "A hostname works from one client but fails certificate verification from another.",
        "Failures appear after certificate or TLS-policy changes.",
      ],
      investigation: [
        "Compare the requested hostname, SNI, certificate chain, client trust store, and TLS capabilities.",
        "Inspect the certificate associated with the actual listener reached by the client.",
        "Check DNS answers and whether multiple destinations serve different certificate configurations.",
      ],
      resolution: [
        "Correct certificate coverage, chain, DNS destination, or listener configuration.",
        "Use supported TLS policies compatible with the required client population and security standard.",
        "Do not instruct clients to bypass certificate validation.",
      ],
    },
  ],

  prevention: [
    "Define health checks that accurately reflect application readiness without depending on unstable or irrelevant checks.",
    "Use deployment strategies that preserve sufficient healthy capacity during rollout.",
    "Test listener rules, certificates, target-group ports, and health-check paths in non-production before production changes.",
    "Manage load balancers, listeners, target groups, security groups, DNS records, and certificates through reviewed infrastructure-as-code.",
    "Use version control and change review for routing and network changes.",
    "Keep target security groups restricted to approved load-balancer traffic where supported by the architecture.",
    "Use autoscaling based on appropriate demand and saturation signals, not CPU alone where that is insufficient.",
    "Maintain capacity across the intended Availability Zones and monitor subnet IP capacity.",
    "Add application-level tracing and structured logs with request correlation IDs.",
    "Enable and protect the appropriate load-balancer logs and CloudTrail management-event history.",
    "Use synthetic tests for critical hostnames, health paths, login paths, and business endpoints.",
    "Test rollback procedures regularly and document the conditions that trigger a rollback.",
    "Validate that health checks, deployment settings, and timeout values match the application's startup and request behavior.",
    "Review certificates before expiration and monitor renewal and listener association.",
    "Document load-balancer ownership, escalation contacts, architecture diagrams, and last-known-good configuration.",
  ],

  monitoringAndAlerting: [
    "Monitor HTTPCode_ELB_5XX_Count and HTTPCode_Target_5XX_Count separately.",
    "Monitor TargetResponseTime, RequestCount, HealthyHostCount, and UnHealthyHostCount.",
    "Monitor relevant connection errors, resets, rejected connections, and TLS-related metrics supported by the load balancer type.",
    "Alert on zero healthy targets for a critical target group and sustained loss of expected healthy capacity.",
    "Use latency and error-rate alarms with appropriate periods and evaluation windows to avoid unnecessary alert noise.",
    "Create synthetic monitoring for important URLs and business flows.",
    "Monitor ECS deployment failures, EKS controller reconciliation errors, and Auto Scaling activities where applicable.",
    "Track certificate expiration and validate renewal and listener association.",
    "Monitor DNS changes, listener-rule changes, target-group changes, and security-group changes through the approved audit system.",
    "Correlate load-balancer metrics with application, database, and downstream dependency metrics.",
    "Keep dashboards for each environment with account, Region, load balancer, target group, and deployment version clearly identified.",
    "Test alarm delivery and incident routing rather than assuming that a configured alarm will page the on-call engineer.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Incident start, detection, and recovery time:",
    "Severity and customer impact:",
    "Affected hostname, URL path, load balancer, listener, and target group:",
    "AWS account and Region:",
    "Observed status codes and client-side timings:",
    "Target-health states and reason codes:",
    "Relevant CloudWatch metrics and timestamps:",
    "Relevant access logs and application traces:",
    "Last successful deployment and first failing deployment:",
    "Confirmed root cause:",
    "Remediation and approved change reference:",
    "Rollback decision and partial deployment status:",
    "Post-fix validation and observation window:",
    "Security or availability risks discovered:",
    "Preventive actions, owners, and due dates:",
    "Runbook and monitoring improvements:",
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Investigate an unhealthy ALB target",
      objective:
        "Learn to diagnose health-check failures without disabling the health check.",
      steps: [
        "Use a dedicated non-production AWS account and a test ALB.",
        "Register a test target with an intentionally incorrect health-check path.",
        "Run describe-target-health and record the reason code.",
        "Test the endpoint directly from the target environment.",
        "Correct the path and confirm that the target becomes healthy.",
        "Verify the application through the ALB DNS name.",
      ],
      successCriteria: [
        "The learner identifies the health-check failure from evidence.",
        "The learner fixes the endpoint configuration and verifies healthy target status.",
      ],
    },
    {
      title: "Lab 2 — Diagnose 502 and 504 errors",
      objective:
        "Distinguish target response failures from target timeouts.",
      steps: [
        "Use a sandbox application behind an ALB.",
        "Capture baseline RequestCount, TargetResponseTime, and 5xx metrics.",
        "In a controlled lab, create a target protocol or application-response mismatch.",
        "Inspect metrics, target health, and available access logs.",
        "Restore the correct protocol and application behavior.",
        "Use a controlled slow endpoint to observe timeout behavior and compare timings.",
      ],
      successCriteria: [
        "The learner distinguishes ELB-generated and target-generated errors.",
        "The learner correlates the failure with target behavior and timing evidence.",
      ],
    },
    {
      title: "Lab 3 — Fix a listener-rule mismatch",
      objective:
        "Understand host-based and path-based routing.",
      steps: [
        "Create two non-production target groups serving different test responses.",
        "Configure a listener with a host or path rule.",
        "Send requests for the intended hostnames and paths.",
        "Inspect listener rules and observe which target group receives traffic.",
        "Correct a deliberately incorrect rule priority or condition.",
        "Verify all required hostnames and paths.",
      ],
      successCriteria: [
        "The learner identifies the matching rule and forwarding destination.",
        "The learner corrects routing without affecting unrelated paths.",
      ],
    },
    {
      title: "Lab 4 — Troubleshoot a container port mismatch",
      objective:
        "Connect ECS or Kubernetes port mappings to load-balancer target ports.",
      steps: [
        "Use a sandbox ECS service or Kubernetes deployment.",
        "Record the container port, service port, target port, and health-check port.",
        "Observe the controlled failure caused by an incorrect port configuration.",
        "Inspect target health and service or controller events.",
        "Correct the mapping and allow the platform to reconcile target registration.",
      ],
      successCriteria: [
        "The learner identifies the incorrect port or target registration.",
        "The learner validates the service through the load balancer after recovery.",
      ],
    },
    {
      title: "Lab 5 — Build an ALB incident dashboard",
      objective:
        "Correlate traffic, latency, health, and error metrics.",
      steps: [
        "Create a CloudWatch dashboard for a non-production ALB.",
        "Add RequestCount, TargetResponseTime, ELB 5xx, target 5xx, and target-health metrics where supported.",
        "Create a test alarm for sustained elevated error rate or zero healthy targets.",
        "Generate controlled test traffic and observe the dashboard.",
        "Verify alarm notification delivery and document the runbook response.",
      ],
      successCriteria: [
        "The learner can identify the start of a failure from metric trends.",
        "The learner can explain which metric distinguishes a load-balancer error from a target error.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "What is the difference between ALB and NLB?",
      answer:
        "An Application Load Balancer primarily operates at Layer 7 and supports HTTP/HTTPS routing features such as host and path rules. A Network Load Balancer operates at Layer 4 and supports transport-level load balancing for supported protocols. Choose based on protocol, routing, latency, source-address, and application requirements.",
    },
    {
      question: "How do you troubleshoot an ALB returning 502?",
      answer:
        "I identify the affected listener and target group, inspect target-health reason codes, compare ELB-generated and target-generated 5xx metrics, review access logs, test the target protocol and port, and correlate the failure with application logs and deployment events. I fix the proven cause rather than assuming every 502 is an unhealthy-target problem.",
    },
    {
      question: "What causes an ALB to return 503?",
      answer:
        "One common cause is that no suitable healthy targets are available for the request. Other causes depend on routing and load-balancer conditions. I inspect the selected target group, registered targets, health reasons, listener rules, and service deployment state.",
    },
    {
      question: "How do you troubleshoot 504 Gateway Timeout?",
      answer:
        "I inspect target response timing, access-log timing fields, target reachability, application traces, and downstream dependencies. I determine whether the target is slow or unreachable before considering timeout changes.",
    },
    {
      question: "What is the difference between ELB 5xx and target 5xx metrics?",
      answer:
        "ELB 5xx metrics count server errors generated by the load balancer, while target 5xx metrics count server errors returned by targets. Comparing them helps identify whether to focus on load-balancer-to-target behavior or application-side failures.",
    },
    {
      question: "Why can a target be unhealthy even when the application works locally?",
      answer:
        "The load balancer may use a different path, port, protocol, or network route. Security groups, network ACLs, the bind address, virtual-host routing, or the expected health-check response may also differ from a local request.",
    },
    {
      question: "How do security groups affect an ALB?",
      answer:
        "The ALB security group controls permitted client traffic and outbound connections. The target security group must allow the intended traffic from the load balancer on the target and health-check ports. The exact requirements depend on the target type and architecture.",
    },
    {
      question: "Why should health checks not be disabled to fix an outage?",
      answer:
        "Health checks prevent traffic from being sent to targets that fail the configured readiness criteria. Disabling or weakening them can send customer traffic to broken targets and hide the real failure. Fix the health endpoint, application, port, or network path instead.",
    },
    {
      question: "How do you troubleshoot ALB with ECS?",
      answer:
        "I inspect ECS service events, task health, target-group association, container port mappings, task networking, security groups, health-check path, and deployment settings. I verify both the container's readiness and the registered target's health.",
    },
    {
      question: "How do you troubleshoot ALB with EKS?",
      answer:
        "I inspect Ingress and Service configuration, EndpointSlices, pod readiness, AWS Load Balancer Controller events and logs, target type, ports, subnet discovery, and target health. I distinguish Kubernetes configuration problems from AWS-side listener or target-group problems.",
    },
    {
      question: "What is the purpose of a target group?",
      answer:
        "A target group defines the backend targets, protocol, port, health checks, and related routing behavior used by supported load balancer listeners or rules. It allows the load balancer to route requests to an intended group of targets.",
    },
    {
      question: "What is deregistration delay?",
      answer:
        "Deregistration delay allows in-flight requests or connections to finish according to the target-group configuration when a target is deregistered. Incorrect settings or application shutdown behavior can cause interrupted requests during deployments.",
    },
    {
      question: "How do you troubleshoot certificate errors on an ALB?",
      answer:
        "I verify the hostname, certificate status, certificate coverage, listener association, TLS policy, and client SNI. If TLS is also used between the load balancer and targets, I investigate that separate connection independently.",
    },
    {
      question: "How do you troubleshoot intermittent load-balancer failures?",
      answer:
        "I correlate failed requests by time, target IP, target group, Availability Zone, path, and release version. I compare metrics, access logs, target health, scaling events, and application logs to isolate whether only a subset of targets or routes is affected.",
    },
    {
      question: "What is your production recovery approach for an ALB outage?",
      answer:
        "I confirm scope and impact, collect evidence, identify the failing layer, and make the smallest approved correction. If a deployment is the proven cause, I use the established rollback procedure. I validate target health, critical endpoints, latency, error metrics, and customer impact before closing the incident.",
    },
  ],

  references: [
    {
      title: "Elastic Load Balancing documentation",
      url: "https://docs.aws.amazon.com/elasticloadbalancing/",
    },
    {
      title: "Application Load Balancer troubleshooting",
      url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html",
    },
    {
      title: "ALB target health checks",
      url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html",
    },
    {
      title: "ALB CloudWatch metrics",
      url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-cloudwatch-metrics.html",
    },
    {
      title: "ALB access logs",
      url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html",
    },
    {
      title: "Network Load Balancer documentation",
      url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/network/",
    },
    {
      title: "AWS Certificate Manager documentation",
      url: "https://docs.aws.amazon.com/acm/",
    },
    {
      title: "Amazon ECS load balancing",
      url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html",
    },
    {
      title: "AWS Load Balancer Controller for Kubernetes",
      url: "https://kubernetes-sigs.github.io/aws-load-balancer-controller/",
    },
  ],
};
