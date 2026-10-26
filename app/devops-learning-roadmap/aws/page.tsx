
"use client";

import { useMemo, useState } from "react";

type Module = {
  title: string;
  topics: string[];
  outcome: string;
};

type Level = {
  id: string;
  title: string;
  description: string;
  modules: Module[];
};

const levels: Level[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Build strong AWS cloud fundamentals.",
    modules: [
      {
        title: "1. Cloud Computing Fundamentals",
        topics: [
          "Cloud computing and AWS overview",
          "Regions, Availability Zones and edge locations",
          "Public, private and hybrid cloud",
          "Shared Responsibility Model",
        ],
        outcome: "Explain how AWS infrastructure works.",
      },
      {
        title: "2. AWS Account and IAM",
        topics: [
          "Root account security and MFA",
          "IAM users, groups and roles",
          "Policies and least privilege",
          "IAM role versus access keys",
        ],
        outcome: "Secure AWS access using least privilege.",
      },
      {
        title: "3. AWS Global Infrastructure",
        topics: [
          "Choosing a Region",
          "Availability Zone design",
          "High availability fundamentals",
          "Regional versus global services",
        ],
        outcome: "Choose suitable infrastructure locations.",
      },
      {
        title: "4. Amazon EC2",
        topics: [
          "AMI and instance types",
          "Key pairs and security groups",
          "Launching and connecting to an instance",
          "User data and instance lifecycle",
          "EBS volumes and snapshots",
        ],
        outcome: "Understand virtual servers and their storage.",
      },
      {
        title: "5. Amazon S3",
        topics: [
          "Buckets and objects",
          "Bucket policies and IAM access",
          "Versioning and lifecycle rules",
          "Encryption and storage classes",
          "Static website hosting concepts",
        ],
        outcome: "Choose secure object storage configurations.",
      },
      {
        title: "6. VPC Networking Basics",
        topics: [
          "VPC and CIDR",
          "Public and private subnets",
          "Route tables",
          "Internet Gateway",
          "Security groups versus network ACLs",
        ],
        outcome: "Explain how an EC2 instance reaches a network.",
      },
      {
        title: "7. AWS CLI",
        topics: [
          "Installing and configuring AWS CLI",
          "Profiles and regions",
          "sts get-caller-identity",
          "Listing EC2 and S3 resources",
          "CLI permissions and credential safety",
        ],
        outcome: "Use the CLI to inspect AWS resources.",
      },
      {
        title: "8. CloudWatch Basics",
        topics: [
          "Metrics and dashboards",
          "EC2 monitoring",
          "CloudWatch Logs",
          "Alarms and notifications",
        ],
        outcome: "Understand basic AWS monitoring.",
      },
    ],
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "Connect AWS services into application infrastructure.",
    modules: [
      {
        title: "1. Advanced VPC Networking",
        topics: [
          "NAT Gateway and outbound internet",
          "Private subnet routing",
          "VPC endpoints",
          "VPC peering",
          "VPC Flow Logs",
        ],
        outcome: "Design private application networking.",
      },
      {
        title: "2. Elastic Load Balancing",
        topics: [
          "Application Load Balancer",
          "Network Load Balancer",
          "Listeners and listener rules",
          "Target groups",
          "Health checks and HTTP 502 troubleshooting",
        ],
        outcome: "Distribute application traffic safely.",
      },
      {
        title: "3. Auto Scaling",
        topics: [
          "Launch templates",
          "Auto Scaling Groups",
          "Desired, minimum and maximum capacity",
          "Scaling policies",
          "Instance replacement and health checks",
        ],
        outcome: "Build scalable compute capacity.",
      },
      {
        title: "4. RDS and Databases",
        topics: [
          "RDS engine selection",
          "DB subnet groups",
          "Multi-AZ versus read replicas",
          "Backups and restoration",
          "Secrets and database connectivity",
        ],
        outcome: "Plan managed relational database infrastructure.",
      },
      {
        title: "5. Route 53 and DNS",
        topics: [
          "Hosted zones and DNS records",
          "A, AAAA, CNAME and alias records",
          "Routing policies",
          "Domain-to-load-balancer mapping",
          "DNS troubleshooting",
        ],
        outcome: "Route users to application endpoints.",
      },
      {
        title: "6. CloudWatch and CloudTrail",
        topics: [
          "Logs, metrics and alarms",
          "CloudWatch Agent",
          "CloudTrail event history",
          "Event-driven notifications",
          "Troubleshooting failed AWS API calls",
        ],
        outcome: "Investigate application and account issues.",
      },
      {
        title: "7. ECR and ECS",
        topics: [
          "Container images in ECR",
          "ECS clusters and services",
          "Task definitions",
          "Fargate versus EC2 launch options",
          "Load balancer integration",
        ],
        outcome: "Understand AWS container deployment.",
      },
      {
        title: "8. AWS Security Essentials",
        topics: [
          "KMS encryption",
          "Secrets Manager",
          "Systems Manager Session Manager",
          "IAM role-based access",
          "Security auditing and least privilege",
        ],
        outcome: "Reduce exposed credentials and access risks.",
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "Build secure, automated and resilient cloud systems.",
    modules: [
      {
        title: "1. Terraform on AWS",
        topics: [
          "Providers and resource blocks",
          "Variables, outputs and modules",
          "Remote state and state locking",
          "Plan, apply and destroy workflow",
          "Drift detection and environment separation",
        ],
        outcome: "Manage AWS infrastructure as code.",
      },
      {
        title: "2. CI/CD with AWS",
        topics: [
          "Source, build, test and deploy stages",
          "Jenkins or GitHub Actions integration",
          "ECR image publishing",
          "IAM roles for pipelines",
          "Deployment approval and rollback strategy",
        ],
        outcome: "Automate repeatable application delivery.",
      },
      {
        title: "3. Amazon EKS",
        topics: [
          "EKS control plane and worker nodes",
          "Node groups and networking",
          "IAM and workload access",
          "ECR image deployments",
          "Load balancer integration and monitoring",
        ],
        outcome: "Understand Kubernetes on AWS.",
      },
      {
        title: "4. High Availability and Disaster Recovery",
        topics: [
          "Multi-AZ architecture",
          "Backup and restore",
          "Recovery Point Objective and Recovery Time Objective",
          "Cross-Region recovery patterns",
          "Failover planning and testing",
        ],
        outcome: "Plan for failures and recovery.",
      },
      {
        title: "5. AWS Security Architecture",
        topics: [
          "Least privilege and role separation",
          "Private subnet architecture",
          "Encryption at rest and in transit",
          "AWS Config and security auditing",
          "CloudTrail investigation",
        ],
        outcome: "Design security into cloud infrastructure.",
      },
      {
        title: "6. Serverless Architecture",
        topics: [
          "Lambda functions",
          "API Gateway",
          "EventBridge and SQS",
          "Retries and dead-letter queues",
          "Execution roles and observability",
        ],
        outcome: "Choose event-driven compute patterns.",
      },
      {
        title: "7. AWS Cost Optimization",
        topics: [
          "Cost Explorer and budgets",
          "Rightsizing EC2",
          "S3 lifecycle policies",
          "Compute Savings Plans concepts",
          "NAT Gateway and data-transfer cost awareness",
        ],
        outcome: "Identify and control avoidable cloud costs.",
      },
      {
        title: "8. Production Troubleshooting",
        topics: [
          "EC2 status check failures",
          "IAM AccessDenied errors",
          "ALB 502 and unhealthy targets",
          "Private subnet internet connectivity",
          "EKS nodes failing to join",
          "Logs, metrics and root-cause analysis",
        ],
        outcome: "Follow a structured incident investigation.",
      },
    ],
  },
  {
    id: "realtime",
    title: "Real-Time Projects",
    description: "Follow realistic end-to-end production delivery workflows.",
    modules: [
      {
        title: "1. Three-Tier Web Application",
        topics: [
          "Architecture: Route 53 → ALB → EC2",
          "Application servers in private subnets",
          "RDS in isolated database subnets",
          "Security group traffic flow",
          "CloudWatch alarms and backups",
        ],
        outcome: "Explain a secure three-tier architecture.",
      },
      {
        title: "2. Terraform-Based AWS Platform",
        topics: [
          "Create VPC and subnet resources",
          "Provision route tables and gateways",
          "Deploy EC2 and load balancer resources",
          "Use remote Terraform state",
          "Review plan and manage changes safely",
        ],
        outcome: "Reproduce infrastructure through code.",
      },
      {
        title: "3. CI/CD Deployment to AWS",
        topics: [
          "Commit application code to Git",
          "Run pipeline tests and build",
          "Build and push container to ECR",
          "Deploy to ECS or EKS",
          "Validate health and roll back failures",
        ],
        outcome: "Trace code from commit to deployment.",
      },
      {
        title: "4. Highly Available Application",
        topics: [
          "Deploy across multiple Availability Zones",
          "Configure ALB health checks",
          "Set up Auto Scaling",
          "Configure monitoring and alerts",
          "Test instance failure and recovery",
        ],
        outcome: "Understand availability and recovery behavior.",
      },
      {
        title: "5. Production Incident Scenario",
        topics: [
          "Application returns HTTP 502",
          "Check ALB target health",
          "Inspect security groups and routes",
          "Review application and system logs",
          "Identify root cause and document remediation",
        ],
        outcome: "Practice a production-style incident workflow.",
      },
    ],
  },
];

const interviewQuestions = [
  {
    q: "What is the difference between a Region and an Availability Zone?",
    a: "A Region is a geographic AWS area. An Availability Zone is an isolated location within a Region.",
  },
  {
    q: "What is the difference between a security group and a network ACL?",
    a: "Security groups are stateful and attached to network interfaces. Network ACLs are stateless and apply at the subnet boundary.",
  },
  {
    q: "Why use an IAM role instead of access keys?",
    a: "Roles provide temporary credentials and avoid embedding long-lived access keys in applications.",
  },
  {
    q: "What does an Application Load Balancer do?",
    a: "It distributes HTTP and HTTPS requests across registered targets using listener rules and health checks.",
  },
  {
    q: "What is the difference between Multi-AZ and a read replica in RDS?",
    a: "Multi-AZ primarily supports availability and failover. Read replicas primarily support read scaling and can support certain recovery strategies.",
  },
  {
    q: "Why does an EC2 instance in a public subnet have no internet access?",
    a: "Check its public IPv4 address, route to an Internet Gateway, security group, network ACL and host firewall.",
  },
  {
    q: "What is the purpose of NAT Gateway?",
    a: "It lets resources in private subnets initiate supported outbound IPv4 connections without accepting unsolicited inbound connections.",
  },
  {
    q: "What is the difference between S3 and EBS?",
    a: "S3 is object storage. EBS provides block storage volumes for supported compute workloads.",
  },
  {
    q: "What is Terraform state used for?",
    a: "It maps Terraform configuration to managed resources and tracks resource attributes.",
  },
  {
    q: "How would you investigate an ALB 502 error?",
    a: "Check target health, listener and target-group configuration, application logs, target ports, protocol settings and connectivity.",
  },
  {
    q: "What is CloudTrail used for?",
    a: "It records AWS account activity and API events for auditing and investigation.",
  },
  {
    q: "What is the difference between ECS and EKS?",
    a: "ECS is AWS's container orchestration service. EKS is AWS's managed Kubernetes service.",
  },
  {
    q: "How do you avoid storing secrets in application code?",
    a: "Use services such as Secrets Manager or Parameter Store with IAM-controlled access and rotation where appropriate.",
  },
  {
    q: "How would you troubleshoot EKS nodes that fail to join?",
    a: "Check node IAM permissions, network connectivity, cluster endpoint access, bootstrap configuration and node logs.",
  },
  {
    q: "How do you reduce AWS costs safely?",
    a: "Review usage and billing data, rightsize resources, remove unused assets, select appropriate storage tiers and monitor changes.",
  },
];

export default function AWSRoadmapPage() {
  const [activeLevel, setActiveLevel] = useState("basic");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>("0");
  const [completed, setCompleted] = useState<string[]>([]);
  const [showInterviews, setShowInterviews] = useState(false);

  const level = levels.find((item) => item.id === activeLevel)!;

  const visibleModules = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return level.modules;

    return level.modules.filter((module) =>
      [module.title, module.outcome, ...module.topics]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [level, search]);

  const totalModules = levels.reduce(
    (total, item) => total + item.modules.length,
    0,
  );
  const progress = Math.round((completed.length / totalModules) * 100);

  function toggleComplete(key: string) {
    setCompleted((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-950/60 via-slate-900 to-slate-950 p-6 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-400">
            DevMavox · Cloud Engineering
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            AWS Learning Roadmap
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Learn AWS from cloud fundamentals to production architecture,
            infrastructure as code, security, CI/CD and incident troubleshooting.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4">
              <p className="text-2xl font-black text-orange-400">4</p>
              <p className="text-sm text-slate-400">Learning paths</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4">
              <p className="text-2xl font-black text-orange-400">
                {totalModules}
              </p>
              <p className="text-sm text-slate-400">Roadmap modules</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4">
              <p className="text-2xl font-black text-orange-400">15</p>
              <p className="text-sm text-slate-400">Interview questions</p>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Your roadmap progress</h2>
              <p className="mt-1 text-sm text-slate-400">
                Mark modules complete as you study them.
              </p>
            </div>
            <span className="text-xl font-black text-orange-400">
              {completed.length}/{totalModules}
            </span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-orange-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-400">{progress}% completed</p>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Choose your learning path</h2>
            <p className="mt-2 text-slate-400">
              Follow the levels in order, or revisit a topic whenever needed.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {levels.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveLevel(item.id);
                  setExpanded(null);
                  setSearch("");
                }}
                className={`rounded-2xl border p-5 text-left transition ${
                  activeLevel === item.id
                    ? "border-orange-400 bg-orange-500/10 ring-1 ring-orange-400/30"
                    : "border-slate-800 bg-slate-900 hover:border-slate-600"
                }`}
              >
                <span className="text-sm font-bold text-orange-400">
                  PATH 0{index + 1}
                </span>
                <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-slate-300">
                  {item.modules.length} modules
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-orange-400">
              Current path
            </p>
            <h2 className="mt-1 text-2xl font-bold">{level.title} AWS Roadmap</h2>
            <p className="mt-2 text-slate-400">{level.description}</p>
          </div>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search modules, services or topics..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-orange-400"
          />

          <div className="space-y-3">
            {visibleModules.map((module) => {
              const originalIndex = level.modules.indexOf(module);
              const key = `${level.id}-${originalIndex}`;
              const isExpanded = expanded === key;
              const isCompleted = completed.includes(key);

              return (
                <article
                  key={key}
                  className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
                >
                  <div className="flex items-start gap-3 p-4 sm:p-5">
                    <button
                      onClick={() => toggleComplete(key)}
                      aria-label={
                        isCompleted ? "Mark incomplete" : "Mark complete"
                      }
                      className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-sm ${
                        isCompleted
                          ? "border-emerald-500 bg-emerald-500 text-slate-950"
                          : "border-slate-600 text-slate-400"
                      }`}
                    >
                      {isCompleted ? "✓" : ""}
                    </button>

                    <button
                      onClick={() => setExpanded(isExpanded ? null : key)}
                      className="flex min-w-0 flex-1 items-start justify-between gap-4 text-left"
                    >
                      <span>
                        <span
                          className={`block font-bold ${
                            isCompleted ? "text-emerald-300" : "text-slate-100"
                          }`}
                        >
                          {module.title}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-slate-400">
                          {module.outcome}
                        </span>
                      </span>
                      <span className="text-xl text-orange-400">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-800 px-5 py-5 sm:ml-9">
                      <h3 className="font-semibold text-orange-300">
                        Topics to learn
                      </h3>
                      <ul className="mt-3 space-y-3">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex gap-3 text-sm leading-6 text-slate-300"
                          >
                            <span className="text-orange-400">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-400">
                        <span className="font-semibold text-slate-200">
                          Learning goal:{" "}
                        </span>
                        {module.outcome}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}

            {visibleModules.length === 0 && (
              <p className="rounded-xl border border-slate-800 p-6 text-center text-slate-400">
                No matching modules. Try another search term.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
          <h2 className="text-2xl font-bold">Recommended learning order</h2>
          <div className="mt-5 space-y-3">
            {[
              "Learn IAM, EC2, S3 and networking fundamentals.",
              "Understand load balancing, Auto Scaling, databases and monitoring.",
              "Learn Terraform, cloud security, EKS and deployment automation.",
              "Study production architecture, reliability and incident response.",
            ].map((step, index) => (
              <div key={step} className="flex gap-4 rounded-xl bg-slate-950 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/15 font-bold text-orange-400">
                  {index + 1}
                </span>
                <p className="leading-6 text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <button
            onClick={() => setShowInterviews(!showInterviews)}
            className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-7"
          >
            <span>
              <h2 className="text-2xl font-bold">AWS Interview Preparation</h2>
              <p className="mt-2 text-sm text-slate-400">
                15 questions with concise answers for revision.
              </p>
            </span>
            <span className="text-2xl text-orange-400">
              {showInterviews ? "−" : "+"}
            </span>
          </button>

          {showInterviews && (
            <div className="space-y-3 border-t border-slate-800 p-5 sm:p-7">
              {interviewQuestions.map((item, index) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-slate-800 bg-slate-950 p-4"
                >
                  <summary className="cursor-pointer font-semibold leading-6 text-slate-200">
                    <span className="mr-2 text-orange-400">
                      Q{index + 1}.
                    </span>
                    {item.q}
                  </summary>
                  <p className="mt-3 pl-8 text-sm leading-7 text-slate-400">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          )}
        </section>

        <footer className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
          <h2 className="font-bold text-orange-300">Roadmap completion goal</h2>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Be able to explain AWS architecture, justify service choices,
            troubleshoot common failures, secure workloads and describe how
            infrastructure moves from code to production.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Progress checkboxes currently use page state and reset on refresh.
            Persistent progress requires storage or a database.
          </p>
        </footer>
      </div>
    </main>
  );
}
