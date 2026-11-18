export type CareerTopicContent = {
  overview: string;
  outcomes: string[];
  skills: string[];
  workflow: string[];
  practice: string[];
  evidence: string[];
  interview: string[];
  checklist: string[];
};

const shared = {
  outcomes: ["Explain the concept clearly and connect it to a real engineering responsibility", "Choose suitable tools and justify the trade-offs", "Demonstrate the workflow with a practical example", "Communicate impact, risks and measurable outcomes"],
  workflow: ["Understand the business requirement and constraints", "Design a secure, repeatable implementation", "Build, test and document the solution", "Monitor results, handle failure paths and improve"],
  checklist: ["I can explain the purpose and key terminology", "I can demonstrate the workflow without copying blindly", "I can troubleshoot a common failure and explain the root cause", "I have saved evidence that can be discussed in an interview"],
};

const records: Record<string, CareerTopicContent> = {
  "DevOps Engineer": {
    overview: "Own the flow from code commit to reliable production delivery. A DevOps engineer improves collaboration between development and operations through automation, CI/CD, infrastructure as code, observability and safe release practices.",
    outcomes: ["Describe the software delivery lifecycle and DevOps culture", "Build and maintain CI/CD pipelines", "Automate infrastructure and operational tasks", "Improve deployment reliability using monitoring and feedback"],
    skills: ["Linux and networking", "Git and CI/CD", "Cloud fundamentals", "Docker and Kubernetes", "Terraform or Ansible", "Monitoring, scripting and incident response"],
    workflow: ["Review a change and its acceptance criteria", "Run source control, build, test and security checks", "Provision or update infrastructure through reviewed automation", "Deploy progressively, observe service health and roll back safely when needed"],
    practice: ["Build a Git-triggered pipeline that tests and packages a sample application", "Containerize the application and deploy it to a test environment", "Add health checks, logs and a documented rollback procedure"],
    evidence: ["Pipeline definition and successful run", "Infrastructure code and deployment diagram", "README with architecture, verification and rollback steps"],
    interview: ["How would you design a safe CI/CD pipeline?", "A deployment passed but the service is unhealthy. How do you investigate?"],
    checklist: shared.checklist,
  },
  "Cloud Engineer": {
    overview: "Design, provision and operate cloud infrastructure that meets availability, security, performance and cost requirements.",
    outcomes: ["Translate workload requirements into cloud services", "Design network, identity, compute and storage foundations", "Automate provisioning and operational controls", "Explain availability, recovery and cost trade-offs"],
    skills: ["VPC/VNet and routing", "IAM and least privilege", "Compute, storage and managed databases", "Infrastructure as code", "Cloud monitoring and cost management"],
    workflow: ["Gather workload, compliance and recovery requirements", "Design account/project boundaries, network and identity", "Provision version-controlled infrastructure", "Validate security, resilience, monitoring and cost"],
    practice: ["Deploy a two-tier sample workload in a private/public network design", "Apply least-privilege roles and infrastructure tagging", "Create a backup and recovery test with documented results"],
    evidence: ["Architecture diagram", "IaC repository and plan/apply evidence", "Security and cost review checklist"],
    interview: ["How would you isolate public and private workloads?", "How do you balance availability and cloud cost?"],
    checklist: shared.checklist,
  },
  "Site Reliability Engineer (SRE)": {
    overview: "Apply software engineering to operations, using service-level objectives, automation and incident learning to keep services reliable.",
    outcomes: ["Define SLIs, SLOs and error budgets", "Use observability to detect user-impacting failures", "Lead structured incident response and postmortems", "Prioritize toil reduction and reliability improvements"],
    skills: ["Linux and distributed systems", "Metrics, logs and traces", "Prometheus/Grafana or equivalents", "Incident management", "Automation and capacity planning"],
    workflow: ["Identify critical user journeys and service indicators", "Set realistic SLOs and alert on actionable symptoms", "Respond using roles, timelines and mitigation steps", "Run blameless review and track corrective actions"],
    practice: ["Define an availability and latency SLO for a sample API", "Create symptom-based alerts and a service dashboard", "Simulate an outage and write a blameless postmortem"],
    evidence: ["SLI/SLO specification", "Dashboard and alert rules", "Incident timeline and action-item register"],
    interview: ["What is the difference between an SLI, SLO and SLA?", "How would you reduce alert noise during an incident?"],
    checklist: shared.checklist,
  },
  "Platform Engineer": {
    overview: "Build internal platforms that let product teams provision infrastructure and deliver software through secure, supported self-service workflows.",
    outcomes: ["Identify developer friction and platform capabilities", "Design reusable templates and paved roads", "Operate Kubernetes and platform services", "Measure adoption, reliability and developer experience"],
    skills: ["Kubernetes", "Infrastructure as code", "CI/CD and GitOps", "Developer portals and templates", "Policy, secrets and observability"],
    workflow: ["Interview service teams and map common delivery needs", "Create a supported golden path and reusable templates", "Automate provisioning, policy and deployment", "Measure onboarding time, adoption and platform SLOs"],
    practice: ["Create a starter service template with CI and deployment manifests", "Add policy checks and a self-service environment workflow", "Document platform support boundaries and service ownership"],
    evidence: ["Template repository", "Platform architecture and onboarding guide", "Adoption and reliability measures"],
    interview: ["How do you decide what belongs in an internal platform?", "How would you prevent a platform becoming a bottleneck?"],
    checklist: shared.checklist,
  },
  "DevSecOps Engineer": {
    overview: "Integrate security into the software delivery lifecycle so risks are identified early and production systems remain protected.",
    outcomes: ["Map security controls to the delivery lifecycle", "Select and interpret SAST, DAST, dependency and image scans", "Manage secrets and software supply-chain risks", "Define risk-based exception and remediation workflows"],
    skills: ["Secure SDLC", "IAM and secrets management", "Container and dependency scanning", "Pipeline policy as code", "Vulnerability triage and compliance"],
    workflow: ["Threat-model the application and delivery path", "Add fast security checks to pull requests", "Gate releases on risk-based policy and reviewed exceptions", "Track remediation, provenance and runtime findings"],
    practice: ["Add dependency and container scanning to a demo pipeline", "Replace hard-coded credentials with a secret manager", "Create a vulnerability triage policy with severity and SLA"],
    evidence: ["Pipeline security configuration", "Sample scan report and remediation PR", "Threat model and exception record"],
    interview: ["How do you avoid overwhelming developers with security findings?", "What controls protect secrets in CI/CD?"],
    checklist: shared.checklist,
  },
};

const topicSpecific: Record<string, Partial<CareerTopicContent>> = {
  "DevOps Fresher": { overview: "Build a job-ready foundation before specializing: Linux, networking, Git, scripting, cloud basics, containers and a small portfolio.", skills: ["Linux CLI and file permissions", "Networking fundamentals", "Git and GitHub", "Basic shell or Python", "Docker fundamentals", "One cloud provider foundation"], practice: ["Create a Linux administration lab and document commands", "Build and publish a simple container image", "Create a small CI pipeline and explain every stage"] },
  "Junior DevOps Engineer": { overview: "Develop confidence in routine delivery and operations tasks under team guidance, with careful change control and clear escalation.", skills: ["Pipeline maintenance", "Cloud resource operations", "Container troubleshooting", "Monitoring and ticket handling", "Scripting and documentation"], practice: ["Fix a broken pipeline in a sample repository", "Investigate a pod restart using events and logs", "Write a safe change plan and handover note"] },
  "Mid-Level DevOps Engineer": { overview: "Own services and delivery improvements independently, make sound design choices and lead troubleshooting across teams.", skills: ["Production deployment ownership", "IaC modules and reviews", "Kubernetes operations", "Observability and incident analysis", "Security and cost trade-offs"], practice: ["Design a reusable Terraform module", "Implement progressive delivery with rollback", "Lead a simulated incident and write an RCA"] },
  "Senior / Lead DevOps Engineer": { overview: "Set engineering direction, manage technical risk and mentor teams while improving platform reliability, delivery performance and cost.", skills: ["Architecture and technical strategy", "Reliability and capacity planning", "Governance and security", "Technical leadership", "Mentoring and stakeholder communication"], practice: ["Write an architecture decision record for a platform migration", "Define platform SLOs and operational ownership", "Create a 90-day reliability improvement roadmap"] },
};

const defaults = (topic: string): CareerTopicContent => ({
  overview: `${topic} is a core part of a practical DevOps career. Learn how it is used by engineering teams, what good implementation looks like, and how to demonstrate the skill with evidence rather than listing it as a keyword.`,
  outcomes: shared.outcomes,
  skills: ["Understand the underlying concepts and terminology", "Know the relevant tools and their operational purpose", "Apply the workflow in a controlled lab", "Diagnose common failures and communicate trade-offs"],
  workflow: shared.workflow,
  practice: [`Create a small lab demonstrating ${topic.toLowerCase()} from setup through verification`, "Record a failure case, collect evidence and explain the root cause", "Write a concise README with architecture, commands, validation and lessons learned"],
  evidence: ["Working repository with clear README", "Screenshots or logs proving successful validation", "A short explanation of decisions, failure handling and measurable result"],
  interview: [`Explain ${topic.toLowerCase()} to an engineering interviewer using a real example`, "Describe a failure you might encounter and how you would troubleshoot it"],
  checklist: shared.checklist,
});

export function getCareerTopicContent(topic: string): CareerTopicContent {
  const base = records[topic] ?? defaults(topic);
  const specific = topicSpecific[topic] ?? {};
  return { ...base, ...specific } as CareerTopicContent;
}
