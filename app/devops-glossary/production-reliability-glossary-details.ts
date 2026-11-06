import type { GlossaryTerm } from "./glossary-data";

export const productionReliabilityGlossaryDetails: Record<string, Partial<GlossaryTerm>> = {
  "scalability": {
    purpose: "Scalability is the ability of an application or infrastructure to handle increased workload by adding resources while maintaining acceptable performance. Vertical scaling increases the capacity of an existing server, while horizontal scaling adds more instances. Teams use scaling policies, load balancing, metrics, and capacity planning to prevent resource saturation during traffic growth.",
    project: "An e-commerce application experiences heavy traffic during a festival sale. The team runs multiple application instances behind a load balancer and configures an autoscaling group based on CPU utilization and request volume. When demand increases, new instances join the target group; when traffic falls, excess instances are removed while minimum capacity is preserved.",
    workflow: [
      "Measure baseline traffic, CPU, memory, latency, queue depth, and database utilization.",
      "Identify the bottleneck and decide whether vertical or horizontal scaling is appropriate.",
      "Make application instances stateless or externalize sessions and shared files.",
      "Place instances behind a load balancer and configure health checks.",
      "Define minimum, desired, and maximum capacity with metric-based scaling policies.",
      "Load-test expected peak traffic and verify database and downstream service capacity.",
      "Monitor scaling events, errors, latency, and cost; adjust thresholds from observed behavior."
    ],
    commands: [
      "kubectl get hpa -A",
      "kubectl describe hpa <hpa-name> -n <namespace>",
      "kubectl top nodes",
      "kubectl top pods -n <namespace>",
      "kubectl scale deployment <deployment-name> --replicas=5 -n <namespace>",
      "aws autoscaling describe-auto-scaling-groups"
    ],
    mistakes: [
      "Increasing application replicas without checking database connection limits.",
      "Using CPU alone when the real bottleneck is memory, queue depth, or external API latency.",
      "Scaling stateful workloads without a safe storage and replication design.",
      "Setting aggressive scaling thresholds that cause repeated scale-out and scale-in events.",
      "Ignoring startup time, readiness probes, and warm-up requirements."
    ],
    configuration: [
      "Configure Kubernetes requests and limits so the scheduler can place replicas reliably.",
      "Define HPA minimum and maximum replicas and select a metric that reflects workload demand.",
      "Configure load-balancer health checks and readiness probes before sending traffic.",
      "Set autoscaling cooldown or stabilization windows to reduce unnecessary fluctuations.",
      "Use connection pooling, caching, queue-based buffering, and database capacity limits.",
      "Document capacity thresholds, expected peak load, and scaling cost limits."
    ],
    troubleshooting: [
      "If replicas do not increase, inspect HPA conditions, metrics-server health, and configured maximum replicas.",
      "If new pods remain Pending, inspect node capacity, quotas, affinity rules, and scheduling events.",
      "If latency remains high after scaling, inspect database saturation, network calls, and shared dependencies.",
      "If pods repeatedly restart, inspect memory limits, OOMKilled events, and application startup logs.",
      "If scaling oscillates, review metric thresholds, stabilization windows, and workload patterns."
    ],
    bestPractices: [
      "Load-test before major releases and seasonal traffic events.",
      "Use horizontal scaling for independently deployable stateless application replicas.",
      "Set realistic resource requests and monitor actual utilization.",
      "Scale critical dependencies along with application capacity.",
      "Use dashboards and alerts for saturation, latency, error rate, and scaling activity.",
      "Review performance and cloud cost after every major capacity change."
    ],
    securityConsiderations: [
      "Use least-privilege IAM or workload identities for autoscaling components.",
      "Keep secrets outside container images and avoid exposing them in startup logs.",
      "Apply network policies and security groups to newly created instances.",
      "Ensure every scaled instance receives the same approved security patches and baseline configuration.",
      "Protect metrics and orchestration endpoints from unauthorized access."
    ]
  },
  "fault-tolerance": {
    purpose: "Fault tolerance is the ability of a system to continue providing an acceptable level of service when individual components fail. It is achieved through redundancy, health checks, replication, failover, isolation, retries, and graceful degradation. The objective is to prevent a single component failure from causing a complete service outage.",
    project: "A payment platform runs application replicas across multiple availability zones. If one node or zone becomes unavailable, the load balancer routes requests to healthy replicas in another zone. The database uses a supported high-availability configuration, and monitoring alerts the operations team about the failed component.",
    workflow: [
      "Identify critical services, dependencies, failure modes, and acceptable service degradation.",
      "Remove single points of failure from application, network, compute, and data layers.",
      "Deploy redundant instances across independent failure domains.",
      "Configure health checks, automated failover, and bounded retry behavior.",
      "Use timeouts, circuit breakers, and bulkheads to contain dependency failures.",
      "Test node, instance, zone, and dependency failures in a controlled environment.",
      "Review recovery time, data consistency, and customer impact after each test."
    ],
    commands: [
      "kubectl get nodes -o wide",
      "kubectl get pods -o wide -n <namespace>",
      "kubectl get endpoints -n <namespace>",
      "kubectl describe pod <pod-name> -n <namespace>",
      "kubectl rollout status deployment/<deployment-name> -n <namespace>",
      "kubectl get events -n <namespace> --sort-by=.lastTimestamp"
    ],
    mistakes: [
      "Running all replicas in one availability zone or on one physical failure domain.",
      "Retrying failed requests indefinitely and creating retry storms.",
      "Treating replica count as proof of high availability without testing failover.",
      "Ignoring data consistency and split-brain risks during recovery.",
      "Failing to monitor the health of standby components."
    ],
    configuration: [
      "Spread replicas across nodes and availability zones using topology spread constraints or anti-affinity.",
      "Configure readiness and liveness probes according to actual application behavior.",
      "Set request timeouts, retry limits, exponential backoff, and circuit-breaker thresholds.",
      "Use health-checked load balancing and documented failover policies.",
      "Configure replicated data services with tested consistency and promotion procedures.",
      "Define graceful shutdown and connection-draining behavior for replaced instances."
    ],
    troubleshooting: [
      "If traffic is not failing over, inspect load-balancer health checks and target registration.",
      "If all replicas fail together, check shared dependencies, common configuration, and deployment changes.",
      "If failover causes errors, inspect DNS propagation, connection pools, and application retry behavior.",
      "If duplicate processing occurs, verify idempotency and message acknowledgement design.",
      "If standby capacity is unavailable, inspect replication lag, health status, and resource reservations."
    ],
    bestPractices: [
      "Design for independent failure domains rather than simply increasing replica count.",
      "Test failover regularly using controlled failure exercises.",
      "Use idempotent operations for requests that may be retried.",
      "Set clear recovery objectives for every critical dependency.",
      "Document manual fallback procedures when automation fails.",
      "Review fault-tolerance tests after infrastructure and application architecture changes."
    ],
    securityConsiderations: [
      "Apply identical security controls to primary and standby resources.",
      "Encrypt replicated data in transit and at rest.",
      "Restrict failover permissions to approved automation identities and operators.",
      "Audit failover events and protect administrative endpoints.",
      "Verify that backup and standby environments do not bypass production access controls."
    ]
  },
  "disaster-recovery": {
    purpose: "Disaster recovery is the planned process of restoring applications, infrastructure, and data after a major disruptive event such as a regional outage, cyberattack, or data-center failure. A DR strategy defines recovery objectives, alternate environments, backup protection, failover steps, communication responsibilities, and validation procedures.",
    project: "A business-critical application runs in one primary cloud region and maintains encrypted backups in a separate region. The operations team documents how to provision infrastructure from code, restore databases, update traffic routing, validate application health, and communicate service restoration during a regional outage.",
    workflow: [
      "Classify applications and identify business-critical services and dependencies.",
      "Perform a business impact analysis and define RTO and RPO for each service.",
      "Choose a recovery strategy such as backup-and-restore, pilot light, warm standby, or active-active.",
      "Replicate or back up data to a protected recovery location.",
      "Maintain infrastructure definitions, configuration, secrets recovery, and runbooks.",
      "Declare a disaster using authorized incident procedures and assess the recovery environment.",
      "Restore infrastructure and data, validate integrity, and redirect traffic.",
      "Communicate status, record recovery times, and conduct a post-recovery review."
    ],
    commands: [
      "aws s3 ls s3://<backup-bucket>/<backup-prefix>/",
      "aws s3api get-bucket-versioning --bucket <backup-bucket>",
      "kubectl get nodes -o wide",
      "kubectl get deployments,services -n <namespace>",
      "terraform plan -out=dr-recovery.plan",
      "terraform apply dr-recovery.plan"
    ],
    mistakes: [
      "Keeping backups only in the same account, region, or failure domain as production.",
      "Assuming successful backup jobs prove that restoration will work.",
      "Using recovery infrastructure that has not been patched or tested.",
      "Forgetting DNS, certificates, secrets, identity providers, and external dependencies.",
      "Failing to define who can declare a disaster and authorize failover."
    ],
    configuration: [
      "Document application-specific RTO and RPO and map them to a recovery architecture.",
      "Use cross-region or otherwise isolated backup storage with versioning and retention controls.",
      "Maintain infrastructure as code and tested deployment artifacts for the recovery environment.",
      "Store recovery credentials and encryption keys using a separately protected access process.",
      "Define DNS or traffic-routing changes and validate their expected propagation behavior.",
      "Maintain a versioned recovery runbook with owners, prerequisites, and verification steps."
    ],
    troubleshooting: [
      "If restoration fails, verify backup integrity, encryption keys, permissions, and required dependencies.",
      "If the recovery environment cannot start, inspect infrastructure state, quotas, images, and network configuration.",
      "If restored data is outdated, check backup timestamps, replication lag, and the selected recovery point.",
      "If users cannot reach the recovered service, inspect DNS, certificates, firewall rules, and load-balancer targets.",
      "If recovery exceeds the target, identify manual bottlenecks and unavailable capacity."
    ],
    bestPractices: [
      "Run scheduled recovery exercises and record measured RTO and RPO.",
      "Keep recovery procedures independent of systems that may fail during the disaster.",
      "Use immutable or logically isolated backups for critical data.",
      "Automate repeatable infrastructure provisioning and restoration steps.",
      "Test application behavior and data integrity before declaring recovery complete.",
      "Update runbooks after every test, architecture change, or real incident."
    ],
    securityConsiderations: [
      "Protect recovery credentials separately from normal production credentials.",
      "Encrypt backup data and restrict access using least privilege.",
      "Use immutable retention or deletion protection against ransomware and accidental removal.",
      "Audit cross-region replication, restore, and failover operations.",
      "Validate data residency, regulatory, and retention requirements in recovery locations."
    ]
  },
  "rto": {
    purpose: "Recovery Time Objective (RTO) is the maximum acceptable time between a service disruption and restoration of that service. It is a business-driven recovery target, not a guarantee that recovery will finish within that duration. Architecture, automation, staffing, dependency readiness, and recovery testing determine whether the target is achievable.",
    project: "A customer-facing order service has an RTO of 60 minutes. The recovery plan specifies the time required to provision application infrastructure, restore the database, validate transactions, and redirect traffic. Quarterly exercises measure actual restoration time and reveal whether the target is realistic.",
    workflow: [
      "Identify the business service and the impact of its unavailability.",
      "Agree on the maximum acceptable outage duration with business owners.",
      "Document the RTO and dependencies for each recovery component.",
      "Choose a recovery design capable of meeting the target.",
      "Estimate detection, decision, provisioning, restoration, and validation time.",
      "Run recovery exercises and measure actual end-to-end restoration time.",
      "Improve bottlenecks and obtain approval for any revised objective."
    ],
    commands: [
      "date -u",
      "aws rds describe-db-instances",
      "aws s3 ls s3://<backup-bucket>/<backup-prefix>/",
      "kubectl get pods -n <namespace>",
      "kubectl rollout status deployment/<deployment-name> -n <namespace>",
      "date -u"
    ],
    mistakes: [
      "Confusing RTO with RPO; RTO measures restoration time, while RPO measures acceptable data loss.",
      "Choosing a target without business impact analysis.",
      "Measuring only server startup and ignoring data restoration and validation.",
      "Assuming an architecture meets its RTO without an actual recovery exercise.",
      "Setting an aggressive target without funding the required standby capacity."
    ],
    configuration: [
      "Record approved RTO values in service continuity documentation.",
      "Map each service objective to infrastructure, database, identity, and network dependencies.",
      "Automate provisioning and recovery steps to reduce manual execution time.",
      "Maintain recovery capacity and tested access to required artifacts.",
      "Capture timestamps for detection, declaration, restoration, and service validation.",
      "Define escalation thresholds when recovery progress threatens the target."
    ],
    troubleshooting: [
      "If measured RTO is too high, break the timeline into detection, decision, provisioning, restore, and validation stages.",
      "If infrastructure provisioning is slow, review automation, quotas, images, and dependencies.",
      "If database recovery dominates, review backup frequency, restore performance, and replication strategy.",
      "If service starts but remains unavailable, inspect DNS, certificates, routing, and readiness checks.",
      "If teams disagree about the RTO, confirm the business-approved definition and measurement start point."
    ],
    bestPractices: [
      "Set RTO based on business impact rather than technical preference.",
      "Measure end-to-end service restoration, including user-facing validation.",
      "Test recovery under realistic staffing and access conditions.",
      "Prioritize automation for the longest and most error-prone recovery steps.",
      "Review objectives whenever business criticality or architecture changes."
    ],
    securityConsiderations: [
      "Ensure emergency access is controlled, audited, and tested before a disaster.",
      "Do not weaken authentication or network controls to meet a recovery deadline.",
      "Protect recovery artifacts and credentials from unauthorized modification.",
      "Include security validation before returning a restored service to production."
    ]
  },
  "rpo": {
    purpose: "Recovery Point Objective (RPO) is the maximum acceptable amount of data loss measured in time after a disruption. It defines how far back in time restored data may be relative to the incident. A smaller RPO generally requires more frequent backups, continuous replication, or synchronous data protection and may increase cost and complexity.",
    project: "An order-management system has an RPO of 15 minutes. The team configures database log backups or replication so a recovery point is available within that window. During a recovery exercise, operators verify the timestamp of the latest consistent data and compare it with the incident time.",
    workflow: [
      "Identify which business records must be protected and their acceptable loss window.",
      "Agree on an RPO with business owners and data owners.",
      "Choose backup or replication technology that can meet the target.",
      "Configure backup frequency, log shipping, or replication monitoring.",
      "Track the timestamp and consistency of available recovery points.",
      "Restore a representative recovery point and validate application data.",
      "Measure actual data loss during exercises and adjust the protection design."
    ],
    commands: [
      "aws s3 ls s3://<backup-bucket>/<backup-prefix>/",
      "aws rds describe-db-instances",
      "aws rds describe-db-snapshots --db-instance-identifier <db-instance>",
      "kubectl get cronjobs,jobs -n <namespace>",
      "kubectl get events -n <namespace> --sort-by=.lastTimestamp"
    ],
    mistakes: [
      "Confusing RPO with RTO.",
      "Assuming backup frequency equals achieved RPO without checking job completion and consistency.",
      "Ignoring replication lag during peak workload.",
      "Backing up application files while excluding critical databases or persistent volumes.",
      "Failing to test point-in-time restoration."
    ],
    configuration: [
      "Document the approved RPO for each data store and business service.",
      "Configure backup schedules and retention to support the required recovery points.",
      "Monitor replication lag, backup completion time, and backup integrity.",
      "Enable point-in-time recovery where supported and appropriate.",
      "Protect backup copies in separate failure domains.",
      "Record recovery-point timestamps and validation status."
    ],
    troubleshooting: [
      "If the available recovery point is older than expected, inspect failed jobs and backup schedules.",
      "If replication lag increases, check network throughput, source load, and destination health.",
      "If point-in-time restore is unavailable, verify retention settings and transaction-log coverage.",
      "If restored data is inconsistent, follow database-specific consistency and recovery procedures.",
      "If backup files are missing, inspect lifecycle policies, access permissions, and storage replication."
    ],
    bestPractices: [
      "Set RPO according to the business cost of losing recent transactions.",
      "Monitor actual recovery-point age rather than relying only on backup job success.",
      "Test point-in-time restoration and application-level consistency.",
      "Use different protection levels for data with different criticality.",
      "Review replication and backup costs against the approved data-loss tolerance."
    ],
    securityConsiderations: [
      "Encrypt backups and replication traffic.",
      "Restrict deletion and modification of recovery points.",
      "Audit backup access and restoration operations.",
      "Keep recovery credentials separate from ordinary application credentials.",
      "Validate restored data for unauthorized changes or malware before production use."
    ]
  },
  "root-cause-analysis": {
    purpose: "Root Cause Analysis (RCA) is a structured investigation used to identify the underlying technical and organizational factors that caused an incident. It goes beyond the visible symptom and examines contributing conditions, detection gaps, and control failures. A useful RCA produces evidence-based corrective actions that reduce the chance or impact of recurrence.",
    project: "After a Kubernetes deployment causes intermittent API failures, the team reviews deployment timestamps, pod events, application logs, metrics, and configuration changes. The investigation finds that a new connection-pool setting exhausted database connections. The team documents the cause, contributing factors, and preventive actions.",
    workflow: [
      "Stabilize the service and preserve relevant logs, metrics, events, and deployment records.",
      "Build an accurate incident timeline using synchronized timestamps.",
      "Describe the observed impact and distinguish symptoms from confirmed causes.",
      "Compare recent changes with known-good behavior.",
      "Use evidence-based techniques such as five whys, fault-tree analysis, or causal graphs.",
      "Identify technical causes and contributing process or monitoring gaps.",
      "Create corrective actions with owners, priorities, and due dates.",
      "Verify that actions reduce recurrence risk and share the findings."
    ],
    commands: [
      "kubectl get events -A --sort-by=.lastTimestamp",
      "kubectl describe pod <pod-name> -n <namespace>",
      "kubectl logs <pod-name> -n <namespace> --since=2h",
      "git log --oneline --decorate -20",
      "journalctl -u <service-name> --since '2 hours ago'",
      "systemctl status <service-name>"
    ],
    mistakes: [
      "Blaming an individual instead of examining system conditions and controls.",
      "Declaring a root cause based on correlation without supporting evidence.",
      "Stopping at the first visible error instead of tracing the failure chain.",
      "Failing to preserve logs and timestamps before they expire.",
      "Writing corrective actions without owners, deadlines, or verification."
    ],
    configuration: [
      "Centralize application, infrastructure, and audit logs with synchronized timestamps.",
      "Retain deployment history and configuration change records.",
      "Attach trace IDs or request IDs to related logs across services.",
      "Maintain dashboards for latency, traffic, errors, and saturation.",
      "Use an incident template that captures impact, timeline, evidence, cause, and actions.",
      "Track corrective actions in an owned issue or problem-management system."
    ],
    troubleshooting: [
      "If evidence is incomplete, identify missing telemetry and recover records from available system sources.",
      "If multiple causes appear possible, test each hypothesis against the incident timeline.",
      "If logs disagree, check time synchronization, timezone conversion, and correlation identifiers.",
      "If the issue cannot be reproduced, compare production configuration and traffic conditions with test environments.",
      "If actions do not prevent recurrence, reopen the analysis with new evidence."
    ],
    bestPractices: [
      "Use blameless, evidence-driven investigations.",
      "Separate trigger, root cause, and contributing factors.",
      "Prioritize actions that remove systemic failure paths.",
      "Assign every corrective action an owner and measurable completion criteria.",
      "Share concise findings with engineering and operations teams.",
      "Review repeat incidents to identify common patterns."
    ],
    securityConsiderations: [
      "Restrict access to sensitive logs and incident evidence.",
      "Redact credentials, tokens, and personal data before sharing reports.",
      "Preserve audit evidence with appropriate retention and integrity controls.",
      "Avoid publishing exploitable security details outside authorized channels.",
      "Include security and compliance teams when incidents involve suspected compromise."
    ]
  },
  "incident-management": {
    purpose: "Incident Management is the coordinated process of detecting, declaring, prioritizing, responding to, communicating, and resolving service disruptions. It establishes clear roles, escalation paths, timelines, and decision-making so teams can reduce customer impact while maintaining accurate records and learning from incidents.",
    project: "A production API begins returning elevated HTTP 5xx errors. Monitoring opens an alert, the on-call engineer declares an incident, and an incident lead coordinates application, database, and platform responders. The team mitigates the issue, communicates status, verifies recovery, and schedules a post-incident review.",
    workflow: [
      "Detect an alert or receive a verified report of service impact.",
      "Assess severity, affected services, customer impact, and incident scope.",
      "Declare the incident and assign an incident lead and technical responders.",
      "Start a shared timeline and establish an approved communication channel.",
      "Investigate safely and apply the lowest-risk mitigation that restores service.",
      "Verify service health and customer-facing functionality before resolution.",
      "Communicate closure and record the incident timeline and impact.",
      "Conduct a review and track follow-up actions to completion."
    ],
    commands: [
      "kubectl get pods -A",
      "kubectl get events -A --sort-by=.lastTimestamp",
      "kubectl top nodes",
      "kubectl top pods -A",
      "journalctl -u <service-name> --since '30 minutes ago'",
      "systemctl status <service-name>"
    ],
    mistakes: [
      "Starting uncoordinated changes without assigning an incident lead.",
      "Failing to communicate impact and status to stakeholders.",
      "Declaring resolution before validating the customer-facing service.",
      "Making risky production changes without recording them.",
      "Allowing incident actions to remain open without ownership."
    ],
    configuration: [
      "Define severity levels using customer impact, service criticality, and scope.",
      "Maintain on-call schedules, escalation contacts, and backup responders.",
      "Create incident channels and templates for status updates and timelines.",
      "Connect monitoring alerts to the approved incident-management workflow.",
      "Document rollback, failover, and emergency-change authorization procedures.",
      "Define closure criteria and post-incident review expectations."
    ],
    troubleshooting: [
      "If no responder acknowledges an alert, inspect on-call routing and escalation configuration.",
      "If severity is disputed, use the documented impact criteria and reassess as evidence changes.",
      "If responders work at cross purposes, establish one incident lead and a shared action log.",
      "If communication is delayed, use the approved fallback communication channel.",
      "If service health is unclear, validate synthetic checks, real user requests, and dependency status."
    ],
    bestPractices: [
      "Prioritize service restoration and customer safety over premature fault attribution.",
      "Use clear roles and concise, timestamped updates.",
      "Keep mitigation actions reversible whenever practical.",
      "Record decisions and production changes during the incident.",
      "Run blameless reviews and track improvement actions.",
      "Practice incident response through simulations and on-call exercises."
    ],
    securityConsiderations: [
      "Use approved access-controlled incident channels.",
      "Do not share passwords, tokens, or sensitive customer data in incident messages.",
      "Require authorized approval for emergency privileged access.",
      "Preserve audit logs and evidence when a security incident is suspected.",
      "Follow breach notification and regulatory escalation procedures where applicable."
    ]
  },
  "mttr": {
    purpose: "Mean Time to Recovery (MTTR) is an operational metric representing the average time required to restore service after failures. Organizations should define precisely which timestamps are used, such as incident start and service restoration. MTTR helps teams evaluate incident response, recovery automation, and the effectiveness of reliability improvements.",
    project: "A platform team reviews the recovery duration of production incidents over a quarter. By comparing detection, acknowledgement, mitigation, and restoration timestamps, the team discovers that manual database failover is the largest delay. It automates approved failover steps and measures the metric again.",
    workflow: [
      "Define the incident population and the exact MTTR measurement boundaries.",
      "Capture incident start and verified service-restoration timestamps.",
      "Calculate each incident duration using a consistent unit.",
      "Calculate the mean across the selected incident set.",
      "Segment results by service, severity, and failure type.",
      "Identify delays in detection, diagnosis, approval, mitigation, and validation.",
      "Implement improvements and compare MTTR over equivalent reporting periods."
    ],
    commands: [
      "date -u",
      "kubectl get events -A --sort-by=.lastTimestamp",
      "kubectl rollout history deployment/<deployment-name> -n <namespace>",
      "kubectl rollout status deployment/<deployment-name> -n <namespace>",
      "journalctl -u <service-name> --since '1 hour ago'"
    ],
    mistakes: [
      "Using inconsistent start and end timestamps across incidents.",
      "Mixing repair time and recovery time without defining the metric.",
      "Treating a lower MTTR as success when incident frequency or impact is increasing.",
      "Excluding long incidents and creating a misleading average.",
      "Comparing services with different criticality and incident definitions without context."
    ],
    configuration: [
      "Record incident timestamps in a common timezone and consistent format.",
      "Capture detection, acknowledgement, mitigation, and restoration as separate milestones.",
      "Use incident-management reports to calculate averages over defined periods.",
      "Segment MTTR by service, severity, and incident category.",
      "Document whether the organization uses MTTR to mean mean time to recovery, repair, or resolve.",
      "Pair MTTR with incident frequency, error budget, and customer-impact metrics."
    ],
    troubleshooting: [
      "If MTTR values appear incorrect, verify timezone conversion and incident timestamp definitions.",
      "If the average changes sharply, inspect incident count and unusually long incidents.",
      "If restoration timestamps are missing, improve incident closure and monitoring integration.",
      "If MTTR is high, separate detection delay from diagnosis and recovery delay.",
      "If the metric improves but customer impact does not, review severity and impact measurement."
    ],
    bestPractices: [
      "Publish the metric definition alongside every report.",
      "Use consistent data collection and review trends rather than isolated values.",
      "Reduce detection and recovery delays through actionable alerts and tested runbooks.",
      "Track the distribution and longest incidents in addition to the mean.",
      "Avoid incentives that encourage premature incident closure."
    ],
    securityConsiderations: [
      "Restrict incident reports containing sensitive operational details.",
      "Preserve trustworthy timestamps and audit records.",
      "Avoid exposing customer identifiers in reliability dashboards.",
      "Ensure emergency recovery actions remain authorized and traceable."
    ]
  },
  "backup": {
    purpose: "A backup is a separate copy of data or system state that can be used to restore information after deletion, corruption, hardware failure, or malicious activity. Backup strategies define what is protected, how frequently copies are created, where they are stored, how long they are retained, and how restoration is verified.",
    project: "A team protects a production database using scheduled automated backups and point-in-time recovery. Encrypted backup copies are stored in a separate account or recovery location. The team periodically restores a backup into an isolated environment and validates application records before approving the backup process.",
    workflow: [
      "Inventory critical databases, files, persistent volumes, and configuration.",
      "Define backup frequency, retention, encryption, and recovery objectives.",
      "Select full, incremental, snapshot, or application-consistent backup methods.",
      "Automate backup jobs and monitor their completion and integrity.",
      "Copy critical backups to an isolated or separate failure domain.",
      "Perform scheduled restore tests and validate recovered data.",
      "Review retention, storage costs, and coverage after infrastructure changes."
    ],
    commands: [
      "aws s3 ls s3://<backup-bucket>/<backup-prefix>/",
      "aws s3api get-bucket-versioning --bucket <backup-bucket>",
      "aws rds describe-db-snapshots --db-instance-identifier <db-instance>",
      "kubectl get cronjobs,jobs -n <namespace>",
      "kubectl get pvc -n <namespace>",
      "tar -czf backup-$(date +%F).tar.gz <directory>"
    ],
    mistakes: [
      "Assuming a successful backup job guarantees a usable restore.",
      "Storing all copies in the same failure domain as production.",
      "Forgetting persistent volumes, configuration, encryption keys, or application dependencies.",
      "Using retention settings that delete required recovery points too early.",
      "Allowing backup credentials to be controlled by the same compromised production identity."
    ],
    configuration: [
      "Define backup policies for each data type and business criticality level.",
      "Configure scheduled backups, retention periods, and lifecycle policies.",
      "Enable encryption and versioning or immutability where supported.",
      "Separate backup administration from normal production administration.",
      "Monitor backup age, job status, storage capacity, and integrity checks.",
      "Document restore order and dependencies between application components."
    ],
    troubleshooting: [
      "If a backup job fails, inspect logs, permissions, quotas, network access, and storage capacity.",
      "If backup files are missing, check lifecycle rules, object versioning, and destination paths.",
      "If restore fails, verify format compatibility, encryption keys, and required database versions.",
      "If backup duration increases, inspect data growth, throughput, and scheduling overlap.",
      "If recovered data is inconsistent, use application-consistent or database-supported recovery procedures."
    ],
    bestPractices: [
      "Follow the 3-2-1 principle where appropriate: multiple copies, different media or systems, and an off-site copy.",
      "Test restoration regularly and record measured recovery results.",
      "Use immutable or protected backups for critical systems.",
      "Monitor backup completion and recovery-point age with alerts.",
      "Keep backup documentation and recovery credentials available during outages.",
      "Align retention with business and legal requirements."
    ],
    securityConsiderations: [
      "Encrypt backups at rest and in transit.",
      "Use least-privilege identities dedicated to backup operations.",
      "Protect backups against unauthorized deletion and ransomware.",
      "Audit access, retention changes, and restore activity.",
      "Apply data classification and retention requirements to backup copies."
    ]
  },
  "recovery": {
    purpose: "Recovery is the process of returning a failed or disrupted service, system, or data set to a known operational state. It can include restarting workloads, rolling back a release, restoring backups, rebuilding infrastructure, or failing over to another environment. A safe recovery verifies data integrity, security controls, and service behavior before normal operations resume.",
    project: "A new application release causes production errors. The on-call engineer checks the deployment history, rolls back to the last healthy version, verifies readiness and API responses, and monitors error rates. The team then investigates the failed release and prepares a corrected deployment.",
    workflow: [
      "Confirm the incident scope and select the appropriate recovery strategy.",
      "Preserve evidence and record the current system state before making changes.",
      "Choose rollback, restart, failover, rebuild, or data restoration based on the failure.",
      "Obtain required approvals and communicate the recovery plan.",
      "Execute the documented recovery steps in the correct dependency order.",
      "Validate application health, data consistency, security, and user-facing functionality.",
      "Monitor the restored service and communicate the recovery status.",
      "Document the outcome and update the recovery runbook."
    ],
    commands: [
      "kubectl rollout history deployment/<deployment-name> -n <namespace>",
      "kubectl rollout undo deployment/<deployment-name> -n <namespace>",
      "kubectl rollout status deployment/<deployment-name> -n <namespace>",
      "kubectl get pods,services -n <namespace>",
      "systemctl restart <service-name>",
      "systemctl status <service-name>"
    ],
    mistakes: [
      "Restarting services repeatedly without identifying the failure condition.",
      "Restoring data before confirming the correct recovery point.",
      "Rolling back application code while leaving incompatible database changes in place.",
      "Declaring recovery without testing real application transactions.",
      "Failing to preserve evidence or document emergency changes."
    ],
    configuration: [
      "Maintain tested rollback and restore procedures for critical services.",
      "Keep known-good application artifacts and deployment manifests available.",
      "Define recovery permissions and approval requirements.",
      "Document database migration compatibility and recovery ordering.",
      "Configure health checks and synthetic tests for post-recovery validation.",
      "Record recovery timestamps, actions, and verification results."
    ],
    troubleshooting: [
      "If rollback fails, inspect deployment history, image availability, and immutable configuration changes.",
      "If pods start but requests fail, inspect service endpoints, probes, dependencies, and application logs.",
      "If restored data is inconsistent, stop writes and follow the approved data-reconciliation procedure.",
      "If recovery causes repeated failures, verify that the underlying fault has been removed.",
      "If users still experience errors, inspect DNS, caches, sessions, and downstream services."
    ],
    bestPractices: [
      "Choose recovery actions based on evidence and documented failure scenarios.",
      "Prefer reversible changes and preserve a known-good state.",
      "Validate end-to-end behavior, not only process or pod status.",
      "Practice rollback and restoration before production incidents occur.",
      "Keep recovery runbooks current with application and infrastructure releases.",
      "Review recovery outcomes and improve automation where safe."
    ],
    securityConsiderations: [
      "Use approved privileged access and record emergency actions.",
      "Verify restored artifacts and images come from trusted sources.",
      "Rotate credentials if compromise is suspected.",
      "Validate restored data and configuration for unauthorized changes.",
      "Do not bypass security checks simply to restore service faster."
    ]
  }
};
