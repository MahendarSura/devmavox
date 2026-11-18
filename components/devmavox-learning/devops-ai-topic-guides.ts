export type AssistantTopicGuide = {
  purpose: string;
  context: string;
  deliverables: string;
  starterPrompt: string;
};

export const assistantTopicGuides: Record<string, AssistantTopicGuide> = {
  "Explain a DevOps Concept": {
    purpose: "Translate a DevOps concept into a clear mental model, explain why teams use it, and connect it to an end-to-end delivery workflow.",
    context: "Concept or term, current knowledge level, related tool, and the part that is confusing.",
    deliverables: "Plain-language explanation, analogy, architecture flow, trade-offs, example, and knowledge-check questions.",
    starterPrompt: "Explain [concept] for a beginner. Show where it fits in a real DevOps delivery lifecycle and give one practical example.",
  },
  "Telugu-English Learning": {
    purpose: "Explain engineering topics in simple English with optional Telugu-English phrasing while preserving accurate technical terms.",
    context: "Topic, preferred language mix, learner level, and any terms that need simpler wording.",
    deliverables: "Bilingual explanation, glossary, step sequence, practical analogy, and short recap.",
    starterPrompt: "Explain [topic] in simple Telugu-English with correct English technical terms and a practical workplace example.",
  },
  "Compare Technologies": {
    purpose: "Compare two or more tools or approaches against a specific engineering requirement rather than declaring a universal winner.",
    context: "Technologies, workload, team skills, scale, cloud/platform, constraints, and decision priorities.",
    deliverables: "Comparison matrix, strengths, limitations, operational burden, cost considerations, and conditional recommendation.",
    starterPrompt: "Compare [A] and [B] for [use case]. State assumptions, trade-offs, and when each is the better fit.",
  },
  "Learning Path Guidance": {
    purpose: "Recommend the next learning focus based on a target role and existing knowledge without duplicating the site's separate roadmap feature.",
    context: "Target role, current skills, experience, time available, and known gaps.",
    deliverables: "Prioritized next skills, prerequisite checks, measurable milestones, and suggested existing DevMavox feature links.",
    starterPrompt: "Given my target role [role] and current skills [skills], identify my next three highest-value learning priorities.",
  },
  "Linux Command Help": {
    purpose: "Construct safe Linux commands and explain flags, expected output, permissions, and destructive side effects.",
    context: "Distribution, shell, target path/process/service, desired outcome, permissions, and whether this is production.",
    deliverables: "Command options, flag-by-flag explanation, read-only first approach, expected output, and verification.",
    starterPrompt: "Help me perform [task] on [Linux distro]. Start with safe inspection commands and explain every flag.",
  },
  "Git Command Guidance": {
    purpose: "Choose Git commands for branching, history, conflict, or recovery tasks while protecting uncommitted work.",
    context: "Current branch, desired branch/state, git status, recent history, remote setup, and whether changes are pushed.",
    deliverables: "Safe command sequence, state before/after, recovery path, and warnings for reset/rebase/force-push.",
    starterPrompt: "My Git state is [state]. I need [goal]. Give the safest command sequence and explain data-loss risks.",
  },
  "Docker Command Builder": {
    purpose: "Build Docker CLI workflows for image, container, volume, network, and registry operations.",
    context: "Docker/Compose version, image/container names, runtime environment, ports, mounts, and target outcome.",
    deliverables: "Commands with explanations, expected state, cleanup implications, and validation steps.",
    starterPrompt: "Create Docker commands for [task]. Preserve persistent data and call out commands that remove resources.",
  },
  "kubectl and AWS CLI Help": {
    purpose: "Compose Kubernetes and AWS CLI commands with correct context, namespace, region, output filtering, and read-only safeguards.",
    context: "Cluster context, namespace, AWS profile/region, resource identifiers, permissions, and goal.",
    deliverables: "Read-only commands first, JSONPath/JQ examples where useful, expected output, and follow-up verification.",
    starterPrompt: "I need to [task] using kubectl/AWS CLI. Give read-only discovery commands first and explain context safeguards.",
  },
  "YAML Review": {
    purpose: "Review YAML syntax, schema shape, indentation, types, anchors, and likely parser or application errors.",
    context: "Full redacted YAML, target schema/tool, version, error message, and intended behavior.",
    deliverables: "Line-specific findings, corrected YAML, explanation of each change, and validation command.",
    starterPrompt: "Review this YAML for syntax and semantic errors. Preserve intent, identify exact lines, and return corrected YAML.",
  },
  "Kubernetes Manifest Review": {
    purpose: "Assess Kubernetes manifests for API compatibility, selectors, probes, resources, security context, and rollout safety.",
    context: "Manifest, Kubernetes version, namespace, workload intent, traffic pattern, and cluster policies.",
    deliverables: "Field-by-field findings, corrected manifest, rollout considerations, and kubectl validation commands.",
    starterPrompt: "Review this Kubernetes manifest for production risks and compatibility with [version]. Explain each recommendation.",
  },
  "Dockerfile Review": {
    purpose: "Improve Dockerfile security, reproducibility, caching, image size, and runtime behavior.",
    context: "Dockerfile, language/runtime, build command, base image constraints, app port, and deployment target.",
    deliverables: "Layer/caching review, safer multi-stage example, non-root guidance, image build/test commands.",
    starterPrompt: "Review this Dockerfile for security, image size and reproducibility. Provide a corrected multi-stage version if appropriate.",
  },
  "Terraform Configuration Review": {
    purpose: "Inspect Terraform for provider/version constraints, state safety, resource lifecycle, IAM exposure, and plan risks.",
    context: "Terraform files, Terraform/provider versions, backend type (never credentials), workspace, and sanitized plan.",
    deliverables: "Findings by severity, corrected HCL suggestions, state cautions, and plan/validate commands.",
    starterPrompt: "Review this Terraform configuration and sanitized plan. Identify destructive changes and state risks before suggesting edits.",
  },
  "AWS Architecture Guidance": {
    purpose: "Evaluate AWS service choices and architecture patterns against workload requirements and operational constraints.",
    context: "Workload, region, availability needs, data classification, traffic, RTO/RPO, budget, and team capability.",
    deliverables: "Service mapping, architecture narrative, trade-offs, failure modes, security boundaries, and cost drivers.",
    starterPrompt: "Recommend an AWS architecture for [workload] with [availability/security/budget] constraints and explain trade-offs.",
  },
  "EC2 and Networking Guidance": {
    purpose: "Reason about EC2 reachability, VPC routing, subnets, security groups, NACLs, DNS, and load balancer paths.",
    context: "Region, VPC/subnet layout, route tables, source/destination, ports, security-group rules, and sanitized symptoms.",
    deliverables: "Network path checklist, likely fault domains, read-only AWS CLI/OS checks, and verification sequence.",
    starterPrompt: "Troubleshoot [connectivity symptom] between [source] and [destination] in AWS. Trace the network path safely.",
  },
  "IAM Policy Review": {
    purpose: "Check IAM policies for least privilege, resource scoping, condition usage, trust relationships, and privilege escalation risks.",
    context: "Redacted policy JSON, intended principal/action/resource, service context, and access-denied message.",
    deliverables: "Risk findings, least-privilege policy example, policy simulator checks, and trust-policy considerations.",
    starterPrompt: "Review this redacted IAM policy for least privilege. Explain excessive permissions and propose a scoped alternative.",
  },
  "Infrastructure Recommendations": {
    purpose: "Compare infrastructure options for resilience, operations, scalability, governance, and lifecycle management.",
    context: "Current architecture, workload profile, growth forecast, compliance needs, recovery objectives, and budget.",
    deliverables: "Options matrix, recommendation with assumptions, migration stages, operational risks, and validation criteria.",
    starterPrompt: "Evaluate infrastructure options for [workload]. Recommend an approach and list assumptions, risks, and decision criteria.",
  },
  "Pod Diagnostics": {
    purpose: "Diagnose pod scheduling, startup, readiness, runtime, storage, and networking symptoms using Kubernetes evidence.",
    context: "Namespace, pod YAML/describe output, events, logs, node state, recent changes, and redacted image details.",
    deliverables: "Evidence-led hypotheses, read-only kubectl commands, decision tree, and safe next checks.",
    starterPrompt: "Diagnose this pod issue from the supplied events and logs. Separate confirmed facts from hypotheses.",
  },
  "Deployment Analysis": {
    purpose: "Analyze rollout status, ReplicaSets, probes, image versions, strategy, and availability during deployment changes.",
    context: "Deployment YAML, rollout history/status, events, pod states, application health, and release timeline.",
    deliverables: "Rollout diagnosis, likely causes, safe pause/rollback considerations, and post-change verification.",
    starterPrompt: "Analyze this Kubernetes deployment rollout. Identify why availability or progress is affected and suggest safe checks.",
  },
  "Service and Ingress Review": {
    purpose: "Review service selectors, ports, endpoints, ingress rules, DNS/TLS, and controller-specific behavior.",
    context: "Service/Ingress YAML, controller and version, DNS name, endpoints, backend port, and observed HTTP/TLS error.",
    deliverables: "Traffic-path explanation, manifest corrections, DNS/TLS checks, and curl/kubectl validation.",
    starterPrompt: "Review this Service and Ingress path. Trace client-to-pod traffic and identify configuration mismatches.",
  },
  "Cluster Health Guidance": {
    purpose: "Build an evidence-based cluster health assessment across nodes, control plane signals, workloads, capacity, and core add-ons.",
    context: "Cluster distribution/version, node conditions, system pod status, events, capacity snapshots, and symptoms.",
    deliverables: "Health checklist, prioritized risks, read-only checks, and escalation signals.",
    starterPrompt: "Assess this Kubernetes cluster snapshot. Prioritize risks and give read-only commands to confirm each finding.",
  },
  "Error Analysis": {
    purpose: "Interpret an error message or stack trace, identify its layer, and distinguish primary cause from downstream symptoms.",
    context: "Exact error, timestamp, component/version, operation, recent changes, and surrounding redacted logs.",
    deliverables: "Plain-language interpretation, likely causes ranked by evidence, missing data, and diagnostic next steps.",
    starterPrompt: "Analyze this error. Explain what it means, what it does not prove, and the next checks to narrow the cause.",
  },
  "Log Interpretation": {
    purpose: "Correlate logs by timestamp, request/correlation ID, severity, and component to identify failure sequences.",
    context: "Redacted log excerpt, timezone, service map, request ID, deployment timeline, and expected behavior.",
    deliverables: "Event timeline, signal/noise separation, candidate causes, and additional logs/metrics to collect.",
    starterPrompt: "Build a timeline from these logs and identify the earliest meaningful failure signal.",
  },
  "Root Cause Hypotheses": {
    purpose: "Create testable root-cause hypotheses and a structured evidence plan without presenting guesses as facts.",
    context: "Incident symptoms, impact, timeline, recent changes, metrics, logs, events, and mitigations already tried.",
    deliverables: "Hypothesis table with evidence for/against, confidence, discriminating tests, and data gaps.",
    starterPrompt: "Generate ranked root-cause hypotheses for this incident. Include evidence for and against each one.",
  },
  "Recovery Plan Review": {
    purpose: "Review a proposed recovery plan for safety, sequencing, blast radius, rollback, and verification.",
    context: "Incident severity, affected systems, proposed actions, dependencies, backups, approvals, and recovery objectives.",
    deliverables: "Risk review, safer order of operations, preconditions, rollback triggers, and success criteria.",
    starterPrompt: "Review this recovery plan. Flag risky or irreversible steps and add pre-checks, rollback, and verification.",
  },
  "Pipeline Design Review": {
    purpose: "Assess CI/CD stages, artifact flow, test gates, secrets, approvals, deployment strategy, and failure handling.",
    context: "Pipeline YAML, repository flow, build/test tools, artifact registry, deployment targets, and release policy.",
    deliverables: "Stage-by-stage review, bottlenecks, security gaps, caching suggestions, and release guardrails.",
    starterPrompt: "Review this CI/CD pipeline for reliability, security, speed and rollback readiness.",
  },
  "Jenkinsfile Review": {
    purpose: "Review Jenkins declarative/scripted pipeline structure, agents, credentials handling, stages, and post conditions.",
    context: "Jenkinsfile, Jenkins/core/plugin versions, agent labels, credential IDs (not values), and build logs.",
    deliverables: "Syntax/logic findings, safer Jenkinsfile example, agent requirements, and test steps.",
    starterPrompt: "Review this Jenkinsfile. Keep secrets external and identify agent, stage, and post-action risks.",
  },
  "GitHub Actions Review": {
    purpose: "Inspect workflow triggers, permissions, jobs, reusable workflows, caching, secrets, concurrency, and deployment environments.",
    context: "Workflow YAML, repository event flow, runner type, required permissions, and sanitized run error.",
    deliverables: "Least-privilege permissions, corrected workflow, job dependency explanation, and validation steps.",
    starterPrompt: "Review this GitHub Actions workflow for secure permissions and reliable execution.",
  },
  "Argo CD Sync Guidance": {
    purpose: "Analyze GitOps reconciliation, sync status, health, drift, repo access, rendering, and sync-wave behavior.",
    context: "Application YAML, Argo CD version, sync/health status, repo error, rendered diff, and recent Git commit.",
    deliverables: "Read-only Argo CD/kubectl checks, root-cause branches, safe sync options, and drift prevention.",
    starterPrompt: "Help diagnose this Argo CD sync/health issue. Start with status and diff evidence before proposing sync.",
  },
  "Architecture Recommendations": {
    purpose: "Translate functional and non-functional requirements into a clear system architecture with explicit trade-offs.",
    context: "Requirements, users/traffic, data flows, integrations, security, availability, latency, budget, and constraints.",
    deliverables: "Component view, request/data flow, technology options, failure domains, and decision record.",
    starterPrompt: "Design an architecture for [system]. State assumptions and explain major component choices and trade-offs.",
  },
  "High Availability Review": {
    purpose: "Evaluate redundancy, health checks, failover, quorum, dependency resilience, and single points of failure.",
    context: "Architecture diagram/description, AZ/region layout, dependency list, RTO/RPO, and failure scenarios.",
    deliverables: "Failure-mode table, availability gaps, resilience patterns, and failover test plan.",
    starterPrompt: "Review this architecture for single points of failure and propose proportionate HA improvements.",
  },
  "Scalability Assessment": {
    purpose: "Identify throughput bottlenecks and scaling limits across compute, database, queues, network, and application tiers.",
    context: "Traffic profile, latency/error metrics, resource utilization, architecture, data growth, and scaling constraints.",
    deliverables: "Bottleneck hypotheses, capacity model assumptions, scale-up/out options, and load-test plan.",
    starterPrompt: "Assess this system's scalability using the supplied metrics. Identify likely bottlenecks and tests.",
  },
  "Reliability and Cost Trade-offs": {
    purpose: "Compare reliability improvements against cost and operational complexity using measurable service objectives.",
    context: "SLOs, incident history, workload criticality, cloud bill categories, architecture, and budget limits.",
    deliverables: "Trade-off matrix, marginal reliability gains, cost drivers, and prioritized options.",
    starterPrompt: "Evaluate reliability versus cost options for this workload. Avoid unsupported savings estimates.",
  },
  "Technical Mock Interview": {
    purpose: "Run an adaptive technical interview for a target DevOps role and assess answers with constructive feedback.",
    context: "Target role, experience level, focus technologies, interview duration, and question difficulty.",
    deliverables: "One question at a time, scoring rubric, answer feedback, follow-up questions, and improvement plan.",
    starterPrompt: "Conduct a [level] DevOps technical mock interview for [role]. Ask one question at a time and score my answer.",
  },
  "Production Scenario Questions": {
    purpose: "Present realistic production scenarios and evaluate investigation, communication, prioritization, and safe action choices.",
    context: "Target role/level, technology area, scenario difficulty, and preferred interview format.",
    deliverables: "Scenario brief, clarifying prompts, candidate response evaluation, strong answer outline, and follow-up questions.",
    starterPrompt: "Give me a realistic production DevOps interview scenario about [area]. Do not reveal the solution until I answer.",
  },
  "Answer Evaluation": {
    purpose: "Evaluate a candidate's technical answer for correctness, completeness, clarity, evidence, and operational judgement.",
    context: "Interview question, candidate answer, role level, and expected technologies.",
    deliverables: "Score by criteria, missing points, inaccuracies, improved answer, and follow-up drill.",
    starterPrompt: "Evaluate my answer for this interview question. Be specific about technical gaps and how to improve it.",
  },
  "HR and Behavioural Practice": {
    purpose: "Prepare concise, credible STAR-format responses for teamwork, ownership, conflict, failure, and learning questions.",
    context: "Target role, genuine experience examples, strengths, challenges, and preferred answer length.",
    deliverables: "STAR outline, authenticity checks, polished response, and likely follow-up questions.",
    starterPrompt: "Help me structure a truthful STAR answer for [behavioral question] using this experience: [example].",
  },
  "Incident Triage": {
    purpose: "Structure the first minutes of an incident around severity, scope, customer impact, evidence, and communication.",
    context: "Alert details, affected service, start time, symptoms, dependencies, on-call context, and known changes.",
    deliverables: "Triage checklist, severity proposal, first read-only checks, communication cadence, and escalation triggers.",
    starterPrompt: "Help triage this incident. Prioritize impact and safe evidence collection; do not assume access to systems.",
  },
  "Impact Assessment": {
    purpose: "Estimate affected users, services, regions, data paths, and business processes from available evidence.",
    context: "Service map, alert scope, error/latency metrics, affected regions/tenants, timeline, and dependencies.",
    deliverables: "Impact statement, known/unknown split, blast-radius map, confidence, and stakeholder update.",
    starterPrompt: "Assess the likely blast radius from this incident evidence and list what must be confirmed.",
  },
  "Safe Mitigation Planning": {
    purpose: "Compare reversible mitigation options and define approval, preconditions, rollback, and validation before production action.",
    context: "Incident state, candidate mitigations, dependencies, change permissions, backup state, and rollback options.",
    deliverables: "Mitigation decision matrix, risk ranking, pre-flight checklist, rollback triggers, and verification plan.",
    starterPrompt: "Review safe mitigation options for this incident. Prefer reversible actions and require human approval.",
  },
  "Post-Incident Report Drafting": {
    purpose: "Turn a verified incident timeline into a blameless report with impact, contributing factors, response, and follow-up actions.",
    context: "Confirmed timeline, customer impact, detection source, actions taken, root cause evidence, and owners/dates.",
    deliverables: "Executive summary, timeline, root cause/contributors, what went well/poorly, and tracked action items.",
    starterPrompt: "Draft a blameless post-incident review from these confirmed facts. Clearly label unknowns and avoid blame.",
  },
};
