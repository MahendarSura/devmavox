export interface CloudCostOptimizationQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const cloudCostOptimizationQuestions: CloudCostOptimizationQuestion[] = [
  {
    id: "cloud-cost-optimization-1",
    question: "A production team wants to reduce cloud spend without weakening its availability target. What should it do first?",
    options: [
      "Review billing and usage data, tag resources, and identify cost drivers before changing capacity",
      "Delete all resources with the highest monthly bill immediately",
      "Disable backups and monitoring across production",
      "Move every workload to the smallest instance type"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-2",
    question: "A virtual machine has stayed below 5% CPU utilization for several weeks and has no known peak-time load. What is the most appropriate cost action?",
    options: [
      "Validate memory, network, and peak metrics, then right-size or schedule the instance based on evidence",
      "Double its CPU size to create more headroom",
      "Delete its monitoring data before deciding",
      "Assume low CPU proves the VM is unused and terminate it immediately"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-3",
    question: "What does cloud resource right-sizing mean?",
    options: [
      "Matching resource capacity to measured workload requirements while preserving performance and reliability",
      "Always selecting the largest available instance",
      "Moving every workload to a different cloud provider",
      "Disabling autoscaling to keep capacity fixed"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-4",
    question: "Why should cost optimization begin with accurate resource tagging?",
    options: [
      "Tags help allocate spend by team, application, environment, owner, and business purpose",
      "Tags automatically lower provider prices",
      "Tags replace budgets and billing reports",
      "Tags guarantee unused resources are deleted safely"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-5",
    question: "A cost report shows a large amount of spending with no application or team owner. What is a useful next step?",
    options: [
      "Identify the resources, enforce ownership tags or metadata, and assign responsibility for review",
      "Ignore the spending because it cannot be attributed",
      "Delete the entire account",
      "Disable billing exports"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-6",
    question: "Which metric is most useful for comparing cloud cost efficiency across releases of an API service?",
    options: [
      "Cost per successful request, evaluated alongside latency and reliability",
      "Total number of Git branches",
      "Number of engineers in the organization only",
      "The color of the cost dashboard"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-7",
    question: "Why is reducing the monthly bill alone an incomplete measure of optimization success?",
    options: [
      "Savings may come at the expense of reliability, performance, security, or customer outcomes",
      "Monthly spend has no relationship to infrastructure",
      "Cost optimization always requires more spending",
      "Reliability and performance cannot be measured"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-8",
    question: "What is a cloud budget alert primarily designed to do?",
    options: [
      "Notify responsible people when actual or forecast spend approaches defined thresholds",
      "Automatically guarantee the final bill stays below budget",
      "Replace all access-control policies",
      "Stop every production workload at the start of a billing period"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-9",
    question: "A budget alert fires at 80% of the monthly budget halfway through the month. What should the team do?",
    options: [
      "Inspect spend trends and forecasts, identify unexpected drivers, and take proportionate corrective action",
      "Wait until the month ends because alerts are only historical",
      "Delete billing records to reduce the displayed spend",
      "Turn off every production service without impact analysis"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-10",
    question: "What is the difference between actual cost and forecast cost in a cloud billing tool?",
    options: [
      "Actual cost reflects recorded charges to date; forecast cost estimates likely future charges based on available data",
      "Actual cost is always a prediction and forecast cost is always final",
      "Both mean the exact same thing",
      "Forecast cost includes only staff salaries"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-11",
    question: "Why should teams review cost anomalies soon after they occur?",
    options: [
      "Early investigation can identify accidental provisioning, traffic spikes, misconfiguration, or abuse before costs accumulate",
      "Anomalies always resolve themselves without intervention",
      "Cloud providers never charge for unexpected usage",
      "Cost anomalies cannot be caused by technical changes"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-12",
    question: "A developer accidentally launches dozens of large test instances. Which control helps prevent similar overspend?",
    options: [
      "Use quotas, approved instance policies, budgets, and automated cleanup for temporary environments",
      "Give every developer unrestricted administrator access",
      "Disable all usage reporting",
      "Make test instances permanent by default"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-13",
    question: "What is the purpose of cloud quotas and service limits from a cost perspective?",
    options: [
      "They can constrain runaway provisioning and help keep resource usage within approved boundaries",
      "They guarantee that every resource is free",
      "They replace application performance tests",
      "They automatically choose the cheapest architecture"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-14",
    question: "Why are non-production environments good candidates for scheduled shutdown?",
    options: [
      "Development and test systems often do not need to run continuously outside working or testing hours",
      "They must always run at full capacity to remain secure",
      "Shutdown schedules reduce production availability",
      "All non-production systems contain no data worth protecting"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-15",
    question: "A development VM is needed only 8 hours each weekday. What should be considered?",
    options: [
      "Automate start/stop schedules and verify that dependencies, persistence, and user workflows support them",
      "Keep it running 24/7 because stopped VMs cost exactly the same in every service",
      "Delete its persistent data every night",
      "Disable identity and access controls during work hours"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-16",
    question: "Which cost behavior is common when a cloud VM is stopped but its attached storage is retained?",
    options: [
      "Compute charges may stop or decrease, while storage and some associated charges can continue",
      "Every charge in the account stops automatically",
      "Storage becomes free permanently",
      "The VM's data is automatically copied to another region at no cost"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-17",
    question: "Why should idle resource cleanup be automated carefully?",
    options: [
      "Automation should verify ownership, age, environment, and exceptions to avoid deleting active or recovery-critical resources",
      "Every resource with low CPU should be deleted immediately",
      "Automation cannot delete resources",
      "Cleanup policies make audit logs unnecessary"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-18",
    question: "What is orphaned cloud infrastructure?",
    options: [
      "Resources left behind without an active workload or clear owner, such as unattached volumes or unused load balancers",
      "Infrastructure that has more than one owner",
      "Any resource running in a production environment",
      "A resource that has a valid backup"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-19",
    question: "Which example is most likely to create avoidable cloud cost?",
    options: [
      "An unattached high-capacity disk retained indefinitely after its instance was removed",
      "A monitored production database sized to meet an approved SLO",
      "A tested backup kept according to retention policy",
      "A load balancer serving active production traffic"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-20",
    question: "How should teams handle unattached disks before deleting them?",
    options: [
      "Check ownership, snapshots, retention requirements, and recent activity, then remove only after validation",
      "Delete all unattached disks without review",
      "Attach every disk to a random server",
      "Make every disk publicly accessible"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-21",
    question: "What is the main difference between on-demand pricing and a committed-use discount?",
    options: [
      "On-demand offers flexible usage pricing; a commitment can reduce rates in exchange for a term or usage commitment",
      "On-demand always requires a three-year contract",
      "Commitments guarantee that unused capacity is refunded",
      "They are identical pricing models"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-22",
    question: "When is a compute reservation or savings commitment most appropriate?",
    options: [
      "For predictable baseline usage that is likely to remain in place throughout the commitment period",
      "For a short-lived experiment whose usage is highly uncertain",
      "For a resource scheduled to be deleted tomorrow",
      "Whenever a team has not measured its workload"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-23",
    question: "What is a major risk of buying too much committed cloud capacity?",
    options: [
      "The organization may pay for committed usage it does not consume or cannot match to eligible resources",
      "The commitment always makes workloads faster",
      "Unused commitments automatically become cash refunds in every program",
      "It removes the need to forecast demand"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-24",
    question: "How should a team estimate the right size of a cloud savings commitment?",
    options: [
      "Analyze historical usage, expected growth, service eligibility, flexibility rules, and the risk of changing architecture",
      "Choose the largest available commitment without reviewing usage",
      "Use only one unusually busy hour as the forecast",
      "Ignore the contract duration"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-25",
    question: "What is spot or preemptible compute generally best suited for?",
    options: [
      "Fault-tolerant, interruptible workloads that can checkpoint, retry, or move to replacement capacity",
      "A single irreplaceable database primary with no failover",
      "Workloads that must never be interrupted and cannot recover",
      "A service with no retry or recovery design"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-26",
    question: "Why can spot instances reduce cost?",
    options: [
      "They use provider-defined spare capacity offered at a lower price but may be interrupted",
      "They are guaranteed to run forever at a fixed price",
      "They include unlimited storage and network traffic at no cost",
      "They remove the need for capacity planning"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-27",
    question: "How should an application prepare to use interruptible compute safely?",
    options: [
      "Make work restartable, handle interruption notices where available, checkpoint progress, and maintain fallback capacity",
      "Store all progress only in local ephemeral memory",
      "Disable retries and checkpointing",
      "Assume interruptions never happen"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-28",
    question: "Which workload is usually a good candidate for spot capacity?",
    options: [
      "A distributed batch-processing job that can retry failed tasks",
      "A single-node legacy application with no recovery path",
      "A payment database that cannot fail over",
      "A critical service with strict uninterrupted execution requirements and no redundancy"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-29",
    question: "What is autoscaling intended to improve in cost management?",
    options: [
      "Align active capacity with demand while respecting performance objectives and scaling limits",
      "Keep every possible instance running at all times",
      "Remove all resource monitoring",
      "Guarantee the lowest possible bill regardless of latency"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-30",
    question: "Why can aggressive scale-in cause customer impact?",
    options: [
      "It may remove capacity before traffic falls safely or terminate instances handling important work",
      "Scale-in always improves reliability",
      "Instances never handle requests while scaling in",
      "It cannot affect response time"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-31",
    question: "What is a good practice when configuring autoscaling thresholds?",
    options: [
      "Use workload-relevant signals, stabilization windows, minimum and maximum capacity, and load-test results",
      "Scale on a random metric with no limits",
      "Set maximum capacity to infinity",
      "Scale down whenever a single sample drops slightly"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-32",
    question: "A queue-based worker service experiences bursts. Which scaling signal may be more useful than CPU alone?",
    options: [
      "Queue depth or oldest-message age, combined with processing capacity and latency objectives",
      "The number of source-code comments",
      "The color of the worker dashboard",
      "The count of inactive Git branches"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-33",
    question: "Why might adding more application servers fail to reduce costs or improve throughput?",
    options: [
      "A database or downstream dependency may already be the bottleneck, so more servers can increase contention and spend",
      "Every bottleneck is solved by adding web servers",
      "Application servers never call other services",
      "Cloud costs are unrelated to instance count"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-34",
    question: "What is the purpose of load testing before a major rightsizing change?",
    options: [
      "Confirm that reduced capacity still meets expected traffic and service objectives under realistic conditions",
      "Prove that the application has no security vulnerabilities",
      "Replace all production monitoring",
      "Ensure every resource can be removed"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-35",
    question: "What is unit economics in cloud cost management?",
    options: [
      "Relating infrastructure or cloud spend to a business unit of output, such as cost per order or customer",
      "Measuring only the number of virtual machines",
      "Tracking employee attendance",
      "Calculating the color distribution of a dashboard"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-36",
    question: "Why should a cost-per-transaction metric be interpreted with reliability and latency?",
    options: [
      "A cheaper transaction may be unacceptable if it fails more often or becomes much slower",
      "Latency has no effect on customer outcomes",
      "Cost per transaction always captures every business concern",
      "Reliability cannot be measured alongside cost"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-37",
    question: "What is showback in FinOps?",
    options: [
      "Reporting cloud costs to teams or business units so they can understand their consumption without necessarily charging them internally",
      "Deleting resources based on their names",
      "Giving every team unrestricted billing-admin access",
      "Hiding shared costs from stakeholders"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-38",
    question: "What is chargeback in cloud cost management?",
    options: [
      "Allocating or billing cloud costs to the teams or business units responsible for consumption",
      "Charging cloud providers for their own services",
      "Turning off all budget alerts",
      "Replacing tagging with manual guesses"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-39",
    question: "Why should shared platform costs be allocated transparently?",
    options: [
      "Teams need a reasonable view of direct and shared spend to make informed design and usage decisions",
      "Shared costs never affect team decisions",
      "All shared costs must be assigned randomly",
      "Transparent allocation makes cloud resources free"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-40",
    question: "Which tagging strategy is most useful for cost allocation?",
    options: [
      "Use a consistent required schema for owner, application, environment, and cost center, with validation",
      "Let each team invent unrelated tag names for the same concept",
      "Put credentials in tags for convenience",
      "Avoid tags because billing exports can never use them"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-41",
    question: "How can an organization find resources that violate its tagging policy?",
    options: [
      "Use policy checks, billing queries, inventory reports, and remediation workflows for missing or invalid tags",
      "Wait for a monthly invoice and guess the owner",
      "Disable resource inventory",
      "Make all tags optional and undocumented"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-42",
    question: "What is FinOps primarily concerned with?",
    options: [
      "Building a collaborative operating practice that balances cloud cost, business value, engineering choices, and accountability",
      "Reducing all cloud spend to zero regardless of outcomes",
      "Moving all finance work to developers",
      "Replacing architecture design with invoices"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-43",
    question: "Which groups should typically collaborate in a FinOps practice?",
    options: [
      "Engineering, finance, product, and business stakeholders who influence or consume cloud resources",
      "Only the cloud provider's sales team",
      "Only developers with no access to usage data",
      "Only auditors after the year ends"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-44",
    question: "Why should cost optimization be a continuous practice rather than a one-time project?",
    options: [
      "Usage patterns, prices, architecture, and business needs change over time",
      "Cloud resource prices and demand never change",
      "A one-time cleanup guarantees permanent optimal spend",
      "Continuous reviews prevent all technical incidents"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-45",
    question: "What is a cost anomaly detection system useful for?",
    options: [
      "Flagging unexpected spending patterns for investigation before they become large recurring costs",
      "Guaranteeing every charge is incorrect",
      "Automatically replacing architecture reviews",
      "Preventing all resource creation"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-46",
    question: "A storage bill suddenly doubles even though application traffic is stable. What should be checked first?",
    options: [
      "Storage growth, retention settings, snapshots, replication, request charges, and recent configuration changes",
      "Only the color of the billing dashboard",
      "Delete every bucket without checking its contents",
      "Increase compute capacity immediately"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-47",
    question: "Why can data egress charges be significant?",
    options: [
      "Moving data out of a cloud region or provider, or to certain destinations, may incur transfer charges",
      "All network traffic is always free",
      "Egress charges apply only to source-code downloads in every cloud",
      "Egress cost is determined only by CPU utilization"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-48",
    question: "Which architecture choice can reduce repeated cross-region data transfer costs when appropriate?",
    options: [
      "Place frequently communicating components closer together while preserving resilience and data-governance needs",
      "Send every internal request through a distant region",
      "Replicate every byte to every region regardless of use",
      "Disable network measurements"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-49",
    question: "Why should cross-region replication not be disabled solely to save money?",
    options: [
      "It may be required for recovery, availability, latency, or compliance objectives",
      "Replication always costs more than any possible outage",
      "Replication has no reliability benefit",
      "Disabling replication automatically improves data durability"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-50",
    question: "How can a CDN help reduce some cloud costs?",
    options: [
      "It can serve cacheable content near users and reduce repeated origin requests and some data-transfer load",
      "It eliminates every database query",
      "It guarantees all dynamic requests are cached",
      "It replaces authentication and authorization"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-51",
    question: "What should be reviewed before increasing a CDN cache TTL?",
    options: [
      "Content freshness requirements, invalidation behavior, personalization, and security implications",
      "Only the number of developers in the team",
      "The color of the CDN logo",
      "Whether source code uses tabs or spaces"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-52",
    question: "What is a potential cost benefit of caching database query results?",
    options: [
      "It can reduce repeated database work and may allow smaller database capacity when cache hit rates are effective",
      "It guarantees data is always current without invalidation",
      "It removes the need for database backups",
      "It makes every query free under every pricing model"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-53",
    question: "Why should cache hit ratio be tracked during optimization?",
    options: [
      "It helps show whether the cache is actually reducing origin requests enough to justify its cost and complexity",
      "It directly measures employee productivity",
      "It replaces latency and error metrics",
      "A 100% hit ratio is required for every workload"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-54",
    question: "What is a potential cost risk of caching too much data?",
    options: [
      "Memory usage and cache infrastructure cost may exceed the value of avoided origin work",
      "Caches never have operating costs",
      "More cached data always reduces latency for every request",
      "Cache size has no relationship to hit ratio"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-55",
    question: "Which storage tier is usually suitable for frequently accessed, latency-sensitive objects?",
    options: [
      "An appropriate hot or standard tier selected according to access frequency and retrieval requirements",
      "The slowest archive tier regardless of retrieval delay",
      "A tier with no durability guarantees",
      "An offline tape service for every API request"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-56",
    question: "When is an archive or cold storage tier a reasonable choice?",
    options: [
      "For data accessed infrequently when retrieval delay and minimum retention or retrieval charges are acceptable",
      "For every file required on every web request",
      "For data that must be read instantly with no retrieval delay",
      "For temporary files that must be deleted within seconds"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-57",
    question: "Why should storage lifecycle policies be tested before broad deployment?",
    options: [
      "They may transition or delete objects unexpectedly if prefixes, ages, versions, or retention rules are wrong",
      "Lifecycle policies cannot change data",
      "They only affect billing labels",
      "Testing always increases storage usage permanently"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-58",
    question: "What is object versioning useful for, and what cost trade-off can it create?",
    options: [
      "It can help recover earlier object versions but increases storage use until old versions are expired or removed",
      "It guarantees unlimited storage at no cost",
      "It replaces every backup policy",
      "It prevents accidental overwrites by deleting all previous versions"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-59",
    question: "Why should log retention be aligned with operational and compliance requirements?",
    options: [
      "Keeping logs longer than needed can raise storage costs, while deleting them too soon can impair investigations or violate obligations",
      "Logs should always be kept forever regardless of policy",
      "Logs never have storage charges",
      "Retention affects only the dashboard layout"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-60",
    question: "What is a sensible way to optimize observability costs?",
    options: [
      "Reduce unnecessary high-cardinality telemetry, sample appropriate traces, and set retention by data value while preserving critical signals",
      "Disable all monitoring in production",
      "Drop every error log first",
      "Store every request body forever"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-61",
    question: "Why can high-cardinality metric labels increase costs?",
    options: [
      "They create many distinct time series, increasing ingestion, storage, and query work",
      "They automatically reduce data volume",
      "They improve every query with no downside",
      "They affect only log colors"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-62",
    question: "When is trace sampling appropriate?",
    options: [
      "When trace volume is high and a deliberate sampling policy preserves enough data for important diagnosis and error analysis",
      "When all traces are legally required to be retained without sampling",
      "When tracing is not enabled",
      "When the team wants to hide all failures"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-63",
    question: "What is the risk of sampling away every rare error trace?",
    options: [
      "Important low-frequency failures may become difficult to diagnose or correlate",
      "Rare errors become impossible in production",
      "Sampling guarantees complete visibility",
      "The trace backend becomes strongly consistent"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-64",
    question: "Why should backup retention be optimized carefully?",
    options: [
      "Older backups may have declining recovery value but can still be required by recovery, legal, or business policy",
      "The cheapest policy is always to delete all backups",
      "Backups never consume storage",
      "Retention has no effect on recovery capability"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-65",
    question: "What is a useful way to lower backup costs without losing required recovery protection?",
    options: [
      "Use policy-based retention, appropriate storage tiers, deduplication where supported, and regular restore validation",
      "Disable all backups and rely on live replicas only",
      "Keep every backup on the most expensive tier forever",
      "Store the only backup in the same deletion boundary as production"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-66",
    question: "Why do snapshots need lifecycle management?",
    options: [
      "Snapshots can accumulate and incur ongoing storage charges even after the original workload has been removed",
      "Snapshots automatically expire immediately",
      "Snapshots never store data",
      "Lifecycle rules make restores impossible"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-67",
    question: "What is a major difference between a backup and a live replica?",
    options: [
      "A replica supports continuity with current data, while a backup preserves recoverable historical points and can protect against some logical damage",
      "A replica always protects against accidental deletion better than any backup",
      "A backup is always online and writable by the application",
      "They are interchangeable for every recovery scenario"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-68",
    question: "Why is disaster recovery cost planning important?",
    options: [
      "Standby capacity, replicated data, network transfer, and testing can create ongoing costs that must be balanced against recovery objectives",
      "Disaster recovery infrastructure is always free",
      "Recovery objectives do not affect architecture",
      "A documented plan eliminates all cloud charges"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-69",
    question: "What is a warm standby in disaster recovery?",
    options: [
      "A reduced-capacity environment that is running or prepared enough to scale and take over within the required recovery target",
      "A completely nonexistent recovery environment",
      "A backup file that has never been tested",
      "A second name for a developer laptop"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-70",
    question: "How does a pilot-light recovery design typically reduce cost?",
    options: [
      "It keeps only essential core components running and provisions or scales other capacity during recovery",
      "It runs the full production fleet at maximum capacity in every region",
      "It disables backups until an outage",
      "It guarantees zero recovery time with no trade-offs"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-71",
    question: "What is the cost trade-off of active-active multi-region deployment?",
    options: [
      "It may improve regional resilience and latency but requires duplicate capacity, data coordination, and more operational effort",
      "It always costs less than a single-region deployment",
      "It eliminates all replication charges",
      "It removes the need for monitoring"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-72",
    question: "Why should a disaster recovery drill include cost and quota checks?",
    options: [
      "Failover may need extra resources or exceed regional limits, creating both availability and spending risks",
      "Cost has no relationship to failover",
      "Quotas are always unlimited during outages",
      "A drill should test only the login screen"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-73",
    question: "What is a common benefit of containers for cost management?",
    options: [
      "They can improve workload density and consistency when resource requests, limits, and node utilization are managed well",
      "They guarantee each application uses less CPU than any VM",
      "They eliminate the need for a host operating system",
      "They make orchestration and monitoring unnecessary"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-74",
    question: "Why can Kubernetes clusters become more expensive than expected?",
    options: [
      "Overprovisioned node pools, low workload density, idle replicas, oversized requests, and unneeded add-ons can waste capacity",
      "Kubernetes has no infrastructure costs",
      "Pods never request resources",
      "Every cluster automatically scales to zero"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-75",
    question: "What is bin packing in cluster scheduling and cost optimization?",
    options: [
      "Placing workloads efficiently on available nodes while respecting resource requests, constraints, and resilience requirements",
      "Compressing container image layers into one text file",
      "Packing all workloads on one node regardless of availability",
      "Deleting workloads when the cluster is full"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-76",
    question: "Why should Kubernetes resource requests be based on measured workload behavior?",
    options: [
      "Requests influence scheduling and utilization, so inaccurate values can waste capacity or cause contention",
      "Requests have no effect on scheduling",
      "Requests automatically measure business value",
      "Requests replace all runtime limits"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-77",
    question: "What can happen when pod CPU or memory requests are set much higher than typical needs?",
    options: [
      "The scheduler may require more nodes than necessary, reducing workload density and increasing cost",
      "The cluster always becomes cheaper",
      "The application automatically gets unlimited memory",
      "The pods no longer need health checks"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-78",
    question: "What can happen when resource requests are set too low?",
    options: [
      "Nodes may become overpacked, causing contention, throttling, memory pressure, or evictions",
      "The workload always runs faster",
      "Cloud providers refund the difference automatically",
      "It removes the need for load testing"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-79",
    question: "How can cluster autoscaling help manage Kubernetes compute cost?",
    options: [
      "Add nodes when pending workloads need capacity and remove eligible underused nodes when workloads can be rescheduled safely",
      "Keep every node running even when no workloads exist",
      "Guarantee that stateful workloads can always move instantly",
      "Replace pod resource requests"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-80",
    question: "Why can cluster scale-down be blocked even when nodes look underused?",
    options: [
      "Pod disruption budgets, local storage, affinity rules, or non-evictable workloads may prevent safe rescheduling",
      "Underused nodes cannot be measured",
      "Scale-down requires all workloads to be deleted permanently",
      "Kubernetes never moves pods"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-81",
    question: "What is a node pool strategy useful for?",
    options: [
      "Separating workloads with different CPU, memory, architecture, accelerator, or availability needs onto appropriate node types",
      "Forcing every workload onto the most expensive instance family",
      "Disabling scheduling decisions",
      "Replacing cloud billing reports"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-82",
    question: "Why might a GPU node pool be a poor fit for general web services?",
    options: [
      "GPU capacity is expensive and may be underutilized when workloads do not need acceleration",
      "GPUs cannot run containers",
      "General web services always require GPUs",
      "GPU nodes have no compute cost"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-83",
    question: "What is container image size optimization mainly intended to improve?",
    options: [
      "Reduce image transfer and storage overhead and potentially improve pull and startup times",
      "Guarantee that application memory usage becomes zero",
      "Replace dependency security scanning",
      "Increase the number of unused image layers"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-84",
    question: "Why should unused container images and old registry artifacts be cleaned up by policy?",
    options: [
      "They can accumulate storage charges and clutter the registry, but retention rules must preserve required rollback artifacts",
      "Every old image is safe to delete without review",
      "Registries do not charge for storage",
      "Deleting images automatically rolls back deployments"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-85",
    question: "What is a useful approach to reducing CI/CD cloud cost?",
    options: [
      "Use right-sized runners, cache dependencies carefully, cancel obsolete jobs, and avoid redundant builds while preserving test quality",
      "Skip every test to make pipelines faster",
      "Run every pipeline on the largest machine",
      "Keep idle self-hosted runners powered on forever"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-86",
    question: "Why should build cache correctness be verified?",
    options: [
      "Incorrect cache keys or stale artifacts can cause unreliable builds, invalid results, or hard-to-debug failures",
      "Caching never affects build output",
      "A cache removes the need for version control",
      "Cache correctness is unrelated to deployment safety"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-87",
    question: "When is it sensible to cancel a CI job automatically?",
    options: [
      "When a newer commit supersedes an obsolete, non-required job and cancellation will not interrupt a critical release action",
      "Whenever a production deployment has started",
      "For every security scan before it finishes",
      "Only after the monthly bill is finalized"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-88",
    question: "What is a risk of running all test suites on every tiny change without a tiered strategy?",
    options: [
      "Feedback can become slow and expensive, encouraging teams to bypass checks or consume excessive runner capacity",
      "More tests always reduce total cost under every condition",
      "Test suites do not use compute resources",
      "It guarantees every bug is found"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-89",
    question: "How can a team reduce CI compute while keeping useful quality gates?",
    options: [
      "Run fast targeted checks early and retain required broader tests at appropriate stages or schedules",
      "Delete all integration and security tests",
      "Ignore flaky tests indefinitely",
      "Use production credentials in every pull request job"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-90",
    question: "Why can ephemeral CI runners improve cost and security when designed well?",
    options: [
      "They can be created for jobs and destroyed afterward, reducing idle capacity and limiting persistence between builds",
      "They must stay running permanently",
      "They guarantee that no secret can leak",
      "They remove the need for runner access controls"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-91",
    question: "What should be considered before moving builds to cheaper or spot runners?",
    options: [
      "Job interruption tolerance, retry behavior, artifact persistence, queue delay, and total cost per successful build",
      "Only the advertised hourly rate",
      "The color of the runner icon",
      "Whether the repository has a README"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-92",
    question: "What is cost-aware architecture review?",
    options: [
      "A review that evaluates expected usage and cost drivers alongside security, performance, reliability, and maintainability",
      "A review that approves the cheapest option without requirements",
      "A review that removes all monitoring",
      "A billing review performed only after an outage"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-93",
    question: "Why should engineering teams estimate cost before launching a new service?",
    options: [
      "Early design choices influence data transfer, storage, compute, and managed-service costs and are often easier to change before launch",
      "Costs cannot be estimated at all",
      "Cloud cost starts only after the first invoice arrives",
      "An estimate guarantees the final bill exactly"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-94",
    question: "What is the purpose of a cloud pricing calculator?",
    options: [
      "Estimate likely charges using selected services, regions, quantities, and usage assumptions",
      "Guarantee a binding final invoice for every workload",
      "Automatically tune a production cluster",
      "Replace actual billing analysis after deployment"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-95",
    question: "Why should cost estimates include assumptions and ranges?",
    options: [
      "Actual demand, traffic shape, discounts, transfer, and operational behavior may differ from the model",
      "A single estimate always predicts exact usage",
      "Ranges make cost estimates unusable",
      "Assumptions have no effect on architecture"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-96",
    question: "How can managed services affect total cost of ownership?",
    options: [
      "They may reduce operational labor and maintenance while carrying service charges, usage limits, and possible vendor dependency",
      "They are always cheaper than self-managed systems",
      "They have no operational benefit",
      "They remove every need for architecture decisions"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-97",
    question: "When might a managed database be worth a higher direct service price?",
    options: [
      "When automated maintenance, backups, patching, monitoring, and availability features reduce operational burden or risk",
      "When no one needs database reliability",
      "When the service lacks required security controls",
      "When the team wants to avoid measuring cost"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-98",
    question: "What is a risk of self-managing infrastructure only to reduce its hourly price?",
    options: [
      "Engineering effort, patching, outages, backup operations, and recovery work can outweigh the apparent savings",
      "Self-managed services never need staff time",
      "Operational effort has no business cost",
      "Self-managed systems automatically have better availability"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-99",
    question: "Why should licensing costs be included in cloud optimization?",
    options: [
      "Software licenses can be a major part of total workload cost and may depend on cores, hosts, users, or usage",
      "Licenses are always included free with compute",
      "Licensing is unrelated to architecture",
      "Cloud billing tools always include every third-party contract"
    ],
    answer: 0
  },
  {
    id: "cloud-cost-optimization-100",
    question: "How can architecture choices affect software licensing cost?",
    options: [
      "Instance size, core count, deployment topology, and license terms can change the number or type of required licenses",
      "Architecture never affects licensing",
      "More replicas always reduce license cost",
      "Licenses depend only on resource tags"
    ],
    answer: 0
  }
];
