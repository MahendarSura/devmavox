"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { FeatureDefinition } from "./feature-catalog";

type LearningCard = { icon: string; title: string; detail: string; prompt: string; tone: string };

const makePrompt = (title: string, detail: string) =>
  `Act as my experienced DevOps and AI engineering trainer. Teach me ${title}. ${detail} Start from my selected level, explain every new technical term, show a simple architecture or flow diagram, give a realistic industry example, provide commands or configuration with line-by-line explanations, show expected output, give me a safe hands-on exercise, explain common failures and troubleshooting, cover security and production considerations, then quiz me. Teach one step at a time and wait for my response before moving on.`;

const promptCards: LearningCard[] = [
  { icon: "⌕", title: "Error debugging", detail: "Read stack traces, logs and events; identify evidence, root cause, safe remediation and verification.", prompt: makePrompt("DevOps error debugging", "Teach me how to investigate logs, stack traces, Kubernetes events, CI failures and infrastructure errors without guessing. Start with read-only diagnostics and explain rollback."), tone: "from-rose-500/25 to-orange-500/10 border-rose-300/25" },
  { icon: "{ }", title: "YAML & configuration generator", detail: "Create Kubernetes manifests, Docker Compose, Helm values, Terraform and pipeline configuration.", prompt: makePrompt("DevOps YAML and configuration generation", "Generate a correct example for my use case, explain every field, validate assumptions, point out security risks and show how to test it safely."), tone: "from-cyan-500/25 to-blue-500/10 border-cyan-300/25" },
  { icon: "⌘", title: "Architecture explainer", detail: "Break down cloud, Kubernetes, CI/CD, networking and end-to-end platform workflows.", prompt: makePrompt("DevOps architecture", "Explain the architecture using a text diagram, components, request/data flow, dependencies, failure points, scaling, security and a realistic production example."), tone: "from-violet-500/25 to-fuchsia-500/10 border-violet-300/25" },
  { icon: "▤", title: "Code & IaC assistant", detail: "Draft and understand shell scripts, Python, Terraform, Dockerfiles and Kubernetes code.", prompt: makePrompt("DevOps coding and Infrastructure as Code", "Help me write and understand code/IaC. Explain design choices, variables, modules, state, testing, linting, security scanning and safe deployment."), tone: "from-blue-500/25 to-indigo-500/10 border-blue-300/25" },
  { icon: "✓", title: "Review assistant", detail: "Review scripts, manifests, Dockerfiles, Terraform plans and CI/CD workflows for risks.", prompt: makePrompt("DevOps configuration and code review", "Review the code or configuration I provide. Check correctness, maintainability, security, secrets, permissions, resource limits, reliability and version compatibility. Explain findings by severity."), tone: "from-emerald-500/25 to-teal-500/10 border-emerald-300/25" },
  { icon: "⇄", title: "CI/CD assistant", detail: "Design build, test, scan, release, deployment and rollback pipelines.", prompt: makePrompt("CI/CD pipeline engineering", "Teach me to design a pipeline from commit to production with stages, artifacts, tests, security gates, approvals, deployment strategies, rollback and observability."), tone: "from-orange-500/25 to-amber-500/10 border-orange-300/25" },
  { icon: "◉", title: "Monitoring & SRE assistant", detail: "Understand metrics, logs, traces, alerts, SLOs, incident response and reliability.", prompt: makePrompt("DevOps monitoring and SRE", "Teach me metrics, logs, traces, Prometheus, Grafana, OpenTelemetry, alert design, SLIs, SLOs, error budgets and incident postmortems with practical examples."), tone: "from-sky-500/25 to-cyan-500/10 border-sky-300/25" },
  { icon: "▧", title: "Documentation & runbook assistant", detail: "Create operational runbooks, deployment guides, incident timelines and handover notes.", prompt: makePrompt("DevOps documentation and runbooks", "Show me how to write useful architecture docs, deployment runbooks, troubleshooting guides, incident reports, rollback procedures and operational checklists."), tone: "from-fuchsia-500/25 to-purple-500/10 border-fuchsia-300/25" },
];

const learningCards: LearningCard[] = [
  { icon: "⌨", title: "AI-assisted labs", detail: "Practise commands, build sample environments and learn from guided exercises.", prompt: makePrompt("hands-on DevOps labs", "Create a safe lab with prerequisites, architecture, files, commands, expected output, checkpoints, troubleshooting and cleanup. Give me one task at a time."), tone: "from-cyan-500/20 to-blue-500/10 border-cyan-300/25" },
  { icon: "◫", title: "Concept breakdown", detail: "Understand difficult concepts with analogies, diagrams and step-by-step examples.", prompt: makePrompt("a DevOps concept I find difficult", "First explain it in plain English with an analogy, then a diagram, internals, real use case, commands, common mistakes and a small quiz. Ask me what I want to learn."), tone: "from-violet-500/20 to-fuchsia-500/10 border-violet-300/25" },
  { icon: "✦", title: "New DevOps & MLOps skills", detail: "Explore AIOps, LLMOps, MLOps, AI agents, platform engineering and intelligent automation.", prompt: makePrompt("modern DevOps, AIOps and MLOps skills", "Create a beginner-to-advanced learning path covering AI-assisted DevOps, AIOps, MLOps, LLMOps, platform engineering, agentic workflows, governance and practical projects."), tone: "from-amber-500/20 to-orange-500/10 border-amber-300/25" },
  { icon: "▣", title: "Project builder", detail: "Build portfolio projects that connect source control, cloud, containers, delivery and monitoring.", prompt: makePrompt("an end-to-end portfolio DevOps project", "Design an industry-style project with requirements, architecture, repo structure, milestones, implementation, security, monitoring, failure testing and acceptance criteria. Guide me milestone by milestone."), tone: "from-emerald-500/20 to-teal-500/10 border-emerald-300/25" },
  { icon: "◎", title: "Interview & career coach", detail: "Practise technical interviews, production scenarios and clear engineering explanations.", prompt: makePrompt("DevOps engineering interview preparation", "Assess my current level, then ask one question at a time across tools, architecture, troubleshooting and production scenarios. Evaluate my answer and track weak areas."), tone: "from-pink-500/20 to-rose-500/10 border-pink-300/25" },
  { icon: "⚑", title: "Production incident simulator", detail: "Investigate realistic outages, choose diagnostics and practise incident communication.", prompt: makePrompt("a realistic production DevOps incident simulation", "Act as an incident commander and simulator. Give me a realistic incident with symptoms and partial evidence. Let me investigate using safe diagnostic reasoning, then reveal new evidence based on my decisions."), tone: "from-red-500/20 to-orange-500/10 border-red-300/25" },
];

const assistantCards: LearningCard[] = [
  { icon: "▤", title: "Learning assistant", detail: "Teach fundamentals, advanced topics and prerequisites.", prompt: makePrompt("DevOps learning assistant", "Build a sequenced curriculum, identify prerequisites and teach interactively.") , tone: "from-blue-500/20 to-cyan-500/10 border-blue-300/25" },
  { icon: "</>", title: "Code assistant", detail: "Write and explain scripts, application code, Dockerfiles and YAML.", prompt: makePrompt("DevOps code assistant", "Help me create, explain, test and improve DevOps code and configuration."), tone: "from-cyan-500/20 to-teal-500/10 border-cyan-300/25" },
  { icon: "✓", title: "Review assistant", detail: "Check code, configuration, security and operational readiness.", prompt: makePrompt("DevOps review assistant", "Review my pasted code/configuration for correctness, security and production readiness."), tone: "from-emerald-500/20 to-green-500/10 border-emerald-300/25" },
  { icon: "⌕", title: "Troubleshooting assistant", detail: "Read logs, events and errors; guide evidence-based root-cause analysis.", prompt: makePrompt("DevOps troubleshooting assistant", "Guide me through evidence collection, hypotheses, diagnosis, remediation, rollback and validation."), tone: "from-rose-500/20 to-orange-500/10 border-rose-300/25" },
  { icon: "⇄", title: "CI/CD assistant", detail: "Design pipelines, deployment strategies, gates and rollback.", prompt: makePrompt("CI/CD assistant", "Design or debug my build, test, scan, release and deployment pipeline."), tone: "from-orange-500/20 to-amber-500/10 border-orange-300/25" },
  { icon: "▧", title: "Documentation assistant", detail: "Write runbooks, architecture notes, change records and incident reports.", prompt: makePrompt("DevOps documentation assistant", "Create clear operational documentation from my system details and requirements."), tone: "from-violet-500/20 to-purple-500/10 border-violet-300/25" },
  { icon: "⌘", title: "Architecture assistant", detail: "Compare design choices, dependencies, scaling and resilience.", prompt: makePrompt("DevOps architecture assistant", "Help me design and compare architectures with diagrams, trade-offs, failure domains and security."), tone: "from-indigo-500/20 to-blue-500/10 border-indigo-300/25" },
  { icon: "◉", title: "Cloud & cost assistant", detail: "Understand cloud services, IAM, cost drivers and FinOps choices.", prompt: makePrompt("cloud engineering and FinOps assistant", "Explain cloud architecture, IAM, cost estimation, rightsizing and cost-risk trade-offs."), tone: "from-amber-500/20 to-yellow-500/10 border-amber-300/25" },
];

const lifecycle = [
  { title: "Plan", icon: "☷", agent: "Planning agent", desc: "Turn goals into requirements, work items and delivery plans.", prompt: "Teach me AI-assisted DevOps planning: requirements, backlog refinement, risk analysis, architecture decisions and human approval." },
  { title: "Code", icon: "</>", agent: "Code agent", desc: "Assist implementation, code explanation, pull-request summaries and reviews.", prompt: "Teach me safe AI code agents for DevOps: repository context, code generation, pull-request review, tests and permissions." },
  { title: "Test", icon: "⚗", agent: "Test agent", desc: "Generate test ideas, analyse failures and improve coverage.", prompt: "Teach me AI-assisted testing: unit, integration, security, infrastructure and end-to-end tests, test data and quality gates." },
  { title: "Deploy", icon: "⇧", agent: "Deployment agent", desc: "Assess releases, deployment health, progressive delivery and rollback.", prompt: "Teach me AI-assisted deployment: release risk, canary, blue-green, GitOps, health checks, approvals and rollback." },
  { title: "Operate", icon: "⌁", agent: "SRE / operations agent", desc: "Correlate telemetry, support incident triage and reliability work.", prompt: "Teach me AI-assisted operations: observability, anomaly detection, incident triage, SLOs, remediation suggestions and human approval." },
];

const agentIdeas = [
  ["01", "Incident response agent", "Correlates alerts, logs and events; proposes investigation steps and remediation for human approval.", "Teach me to design a read-only incident response agent with telemetry context, evidence citations, permissions, audit logs and approval gates."],
  ["02", "CI/CD pipeline agent", "Explains failed jobs, spots recurring patterns and suggests pipeline fixes.", "Teach me to build a CI/CD assistant that analyses pipeline logs, identifies failed stages and proposes a reviewed fix."],
  ["03", "Cloud cost optimization agent", "Finds idle resources, explains cost drivers and recommends rightsizing opportunities.", "Teach me a cloud FinOps agent that analyses cost data, estimates savings and never changes resources without approval."],
  ["04", "Security & compliance agent", "Reviews vulnerabilities, policy violations, misconfigurations and supply-chain risks.", "Teach me a DevSecOps agent for vulnerability triage, policy checks, SBOM, secrets detection and human-reviewed remediation."],
];

const toolGroups = [
  { title: "AI navigators & general assistants", tools: "ChatGPT · Claude · Gemini · Microsoft Copilot · Perplexity", desc: "Research, explain concepts, compare approaches and plan engineering work.", prompt: "Compare AI research and assistant tools for DevOps learning. Explain strengths, limitations, privacy and verification." },
  { title: "AI buddies & platform copilots", tools: "GitHub Copilot · Azure DevOps AI integrations · cloud provider assistants", desc: "Get contextual help inside development and cloud workflows.", prompt: "Explain AI coding buddies and cloud/platform copilots for DevOps, with safe usage examples and limitations." },
  { title: "IDE & coding extensions", tools: "VS Code assistants · code completion · chat-based code review", desc: "Generate, explain, refactor and test code close to the editor.", prompt: "Show how to use AI assistants in VS Code for shell, Terraform, Kubernetes YAML and CI/CD safely." },
  { title: "Infrastructure design & IaC", tools: "Terraform · Pulumi · policy-as-code · architecture assistants", desc: "Explore infrastructure patterns, modules, plans and policy checks.", prompt: "Teach AI-assisted infrastructure design and IaC review with Terraform or Pulumi, including state, security and plan review." },
  { title: "Deployment & release intelligence", tools: "GitOps · progressive delivery · release risk analysis", desc: "Understand deployment health, release strategies and rollback decisions.", prompt: "Explain AI-assisted deployment intelligence, GitOps, canary releases, blue-green deployment and rollback." },
  { title: "Monitoring & observability", tools: "Prometheus · Grafana · OpenTelemetry · Datadog · Dynatrace", desc: "Use AI to investigate signals, anomalies, alerts and incident context.", prompt: "Compare AI-assisted observability approaches using metrics, logs and traces. Include Prometheus, Grafana and OpenTelemetry." },
  { title: "Security & governance", tools: "SAST · DAST · SBOM · secrets scanning · policy-as-code", desc: "Use AI to help triage security findings while preserving approval and audit controls.", prompt: "Teach AI in DevSecOps: SAST, DAST, SBOM, secrets scanning, policy-as-code, false positives and governance." },
  { title: "Agent frameworks & integrations", tools: "MCP · tool calling · agent orchestration · workflow engines", desc: "Connect assistants to approved tools with scoped permissions and audit trails.", prompt: "Teach me MCP, tool calling and DevOps agents from basics to a safe read-only lab. Explain permissions, trust boundaries and audit logs." },
];

const impacts = [
  ["01", "Automated CI/CD", "Analyse pipeline failures, suggest fixes, optimise build and deployment flow."],
  ["02", "Monitoring & observability", "Detect anomalies in metrics, logs and traces; improve alert context."],
  ["03", "Incident response", "Summarise incidents, correlate evidence and recommend safe next actions."],
  ["04", "Security at scale", "Prioritise vulnerabilities, review policies and identify configuration risks."],
  ["05", "Deployment & release", "Assess release risk, compare rollout strategies and validate health."],
  ["06", "Cost & capacity", "Explain spend patterns, utilisation and optimisation trade-offs."],
];

const tracks = [
  ["01", "Foundations", "Linux · Networking · Git · Shell", "Understand servers, networks, source control and software delivery."],
  ["02", "Cloud & infrastructure", "AWS · Azure · Terraform · Ansible", "Provision, secure and automate infrastructure."],
  ["03", "Containers & orchestration", "Docker · Kubernetes · Helm · EKS", "Package, deploy, scale and operate workloads."],
  ["04", "CI/CD & GitOps", "Jenkins · GitHub Actions · Argo CD", "Build, test and release applications safely."],
  ["05", "Observability & SRE", "Prometheus · Grafana · OpenTelemetry", "Monitor systems, respond to incidents and improve reliability."],
  ["06", "Security & governance", "DevSecOps · SBOM · Policy as Code", "Protect code, dependencies, infrastructure and runtime."],
  ["07", "Platform & cloud-native", "Platform Engineering · Service Mesh · FinOps", "Build internal platforms and operate cloud-native services."],
  ["08", "AI-native DevOps", "AIOps · MLOps · LLMOps · Agents · MCP", "Use AI-assisted engineering with guardrails and human oversight."],
];

export default function DevOpsCopilotWorkspace({ feature: _feature, slug: _slug = [] }: { feature: FeatureDefinition; slug?: string[] }) {
  const [question, setQuestion] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [copied, setCopied] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const allCards = useMemo(() => [...promptCards, ...learningCards, ...assistantCards], []);
  const filteredCards = useMemo(() => activeTab === "All" ? allCards : allCards.filter((card) => {
    if (activeTab === "Learn") return learningCards.some((item) => item.title === card.title);
    if (activeTab === "Assist") return assistantCards.some((item) => item.title === card.title);
    return promptCards.some((item) => item.title === card.title);
  }), [activeTab, allCards]);

  function askAI(prompt: string) {
    const prepared = `My current level is ${level}. Teach me in simple English, step by step. Explain technical words, use practical DevOps examples, show diagrams where useful, give hands-on tasks and check my understanding. Do not assume I have a trainer.\n\n${prompt}`;
    window.open(`https://chatgpt.com/?q=${encodeURIComponent(prepared)}`, "_blank", "noopener,noreferrer");
  }

  async function copyPrompt(prompt: string, title: string) {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(title);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("Clipboard unavailable");
    }
  }

  const CardGrid = ({ cards }: { cards: LearningCard[] }) => (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <article key={card.title} className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${card.tone} p-5 shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-1 hover:shadow-xl`}>
          <div className="flex items-start justify-between gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-slate-950/50 text-lg font-bold text-white">{card.icon}</span>
            <span className="rounded-full border border-white/10 bg-slate-950/30 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.18em] text-slate-300">AI guided</span>
          </div>
          <h3 className="mt-4 text-base font-extrabold text-white">{card.title}</h3>
          <p className="mt-2 min-h-[3rem] text-xs leading-6 text-slate-300">{card.detail}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => askAI(card.prompt)} className="rounded-lg bg-gradient-to-r from-cyan-300 to-violet-300 px-4 py-2.5 text-xs font-black text-slate-950 shadow-md shadow-cyan-950/20 transition hover:brightness-110">Ask AI ↗</button>
            <button type="button" onClick={() => copyPrompt(card.prompt, card.title)} className="rounded-lg border border-white/20 bg-slate-950/25 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-950/50">{copied === card.title ? "Copied ✓" : "Copy prompt"}</button>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#081326] text-slate-100">
      <div className="pointer-events-none fixed inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 10% 0%, rgba(34,211,238,.16), transparent 35%), radial-gradient(ellipse at 90% 15%, rgba(168,85,247,.16), transparent 35%), linear-gradient(rgba(148,163,184,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.025) 1px, transparent 1px)", backgroundSize: "auto, auto, 34px 34px, 34px 34px" }} />
      <div className="relative mx-auto max-w-[1440px] px-4 py-5 sm:px-7 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <Link href="/" className="text-sm font-black tracking-wider">DEV<span className="text-cyan-300">MAVOX</span><span className="ml-2 text-[10px] font-semibold tracking-[.2em] text-slate-400">/ AI DEVOPS ASSIST</span></Link>
          <div className="flex items-center gap-2"><span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-bold text-emerald-200">AI-guided learning</span><Link href="/" className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5">← Home</Link></div>
        </header>

        <section className="relative py-8 sm:py-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-cyan-200"><span className="h-2 w-2 rounded-full bg-emerald-400" /> DevMavox · AI engineering workspace</p>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">AI DevOps Assist</h1>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">Empower your DevOps journey with AI-driven insights, practical engineering workflows and self-paced learning.</p>
            <div className="mt-7 rounded-2xl border border-cyan-300/50 bg-gradient-to-r from-[#142b48] via-[#172640] to-[#272044] p-2 shadow-[0_0_35px_rgba(34,211,238,.12)] sm:flex sm:items-center sm:gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <span className="text-xl text-cyan-200">⌕</span>
                <input value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && question.trim()) askAI(question.trim()); }} placeholder="Ask your DevOps or troubleshooting question..." className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-400" aria-label="Ask your DevOps question" />
              </div>
              <button type="button" disabled={!question.trim()} onClick={() => askAI(question.trim())} className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 px-5 py-3 text-xs font-black text-slate-950 shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 sm:mt-0 sm:w-auto">Ask AI on ChatGPT ↗<span className="block text-[9px] font-semibold">Opens in a new tab</span></button>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <label className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-[11px] text-slate-300">Learning level <select value={level} onChange={(event) => setLevel(event.target.value)} className="bg-transparent font-bold text-white outline-none"><option className="bg-slate-900">Beginner</option><option className="bg-slate-900">Intermediate</option><option className="bg-slate-900">Advanced</option></select></label>
              {["Explain a concept","Debug an error","Generate Kubernetes YAML","Design architecture"].map((item) => <button key={item} type="button" onClick={() => setQuestion(item)} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-[10px] text-slate-300 transition hover:border-cyan-300/40 hover:text-white">{item}</button>)}
            </div>
            <p className="mt-3 text-[10px] leading-5 text-slate-500">ChatGPT opens externally. Sign-in and usage availability are controlled by ChatGPT; DevMavox cannot bypass provider restrictions.</p>
          </div>
        </section>
        <section className="py-7">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-cyan-300">Prompt mastery cards</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Start with what you need</h2><p className="mt-2 text-sm text-slate-400">Every card has its own Ask AI action. You do not need to invent the prompt.</p></div>
            <div className="flex flex-wrap gap-1 rounded-xl border border-white/10 bg-slate-900/70 p-1">{["All","Ask","Learn","Assist"].map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`rounded-lg px-3 py-2 text-xs font-bold transition ${activeTab === tab ? "bg-gradient-to-r from-cyan-300 to-violet-300 text-slate-950" : "text-slate-400 hover:text-white"}`}>{tab}</button>)}</div>
          </div>
          <CardGrid cards={filteredCards} />
        </section>

        <section className="border-t border-white/10 py-9">
          <div className="mb-5"><p className="text-[10px] font-black uppercase tracking-[.22em] text-violet-300">Self-paced deep learning</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Learn without waiting for a trainer</h2><p className="mt-2 text-sm text-slate-400">Concepts, labs, projects and career practice — each with a direct AI learning prompt.</p></div>
          <CardGrid cards={learningCards} />
        </section>

        <section className="border-t border-white/10 py-9">
          <div className="mb-5"><p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-300">AI assistants for DevOps</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Eight ways AI can support engineering work</h2></div>
          <CardGrid cards={assistantCards} />
        </section>

        <section className="border-t border-white/10 py-9">
          <div className="mb-6"><p className="text-[10px] font-black uppercase tracking-[.22em] text-emerald-300">AI in DevOps</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Where AI helps across the delivery lifecycle</h2><p className="mt-2 text-sm text-slate-400">Learn what AI can analyse, what it can recommend and where a human must approve the action.</p></div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{impacts.map(([n,title,desc],i) => <article key={n} className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/90 to-slate-900/80 p-5"><div className="flex items-center justify-between"><span className="font-mono text-xs font-black text-cyan-300">{n}</span><span className="text-lg">{["⇄","◉","⌕","⬡","⇧","$"][i]}</span></div><h3 className="mt-3 font-bold">{title}</h3><p className="mt-2 min-h-12 text-xs leading-6 text-slate-400">{desc}</p><button type="button" onClick={() => askAI(makePrompt(title,desc))} className="mt-4 rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-xs font-bold text-cyan-200 hover:bg-cyan-300/20">Ask AI about this ↗</button></article>)}</div>
        </section>

        <section className="border-t border-white/10 py-9">
          <div className="mb-6"><p className="text-[10px] font-black uppercase tracking-[.22em] text-orange-300">AI-native software delivery</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Plan → Code → Test → Deploy → Operate</h2><p className="mt-2 text-sm text-slate-400">Understand agent roles, tools, checkpoints and human approvals at every stage.</p></div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{lifecycle.map((stage,i) => <article key={stage.title} className="relative rounded-2xl border border-white/10 bg-[#101d31] p-4"><span className="text-[10px] font-mono font-bold text-orange-300">STAGE 0{i+1}</span><div className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-300/20 to-cyan-300/10 text-xl font-black text-cyan-100">{stage.icon}</div><h3 className="mt-3 text-lg font-black">{stage.title}</h3><p className="mt-1 text-xs font-bold text-violet-200">{stage.agent}</p><p className="mt-3 min-h-16 text-xs leading-5 text-slate-400">{stage.desc}</p><button type="button" onClick={() => askAI(makePrompt(stage.title,stage.prompt))} className="mt-4 rounded-lg bg-gradient-to-r from-cyan-300 to-violet-300 px-3 py-2 text-xs font-black text-slate-950">Ask AI ↗</button>{i<4 && <span className="absolute -right-3 top-1/2 z-10 hidden text-lg text-cyan-300 xl:block">›</span>}</article>)}</div>
        </section>

        <section className="border-t border-white/10 py-9">
          <div className="mb-5"><p className="text-[10px] font-black uppercase tracking-[.22em] text-rose-300">AI agents you can build</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Practical agent ideas for DevOps engineers</h2></div>
          <div className="grid gap-3 md:grid-cols-2">{agentIdeas.map(([n,title,desc,prompt]) => <article key={n} className="flex gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-slate-800/90 to-slate-900/80 p-5"><span className="font-mono text-lg font-black text-cyan-300">{n}</span><div className="min-w-0 flex-1"><h3 className="font-bold">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-400">{desc}</p><button type="button" onClick={() => askAI(prompt)} className="mt-3 rounded-lg border border-violet-300/30 bg-violet-300/10 px-3 py-2 text-xs font-bold text-violet-200 hover:bg-violet-300/20">Ask AI to teach me ↗</button></div></article>)}</div>
        </section>

        <section className="border-t border-white/10 py-9">
          <div className="mb-5"><p className="text-[10px] font-black uppercase tracking-[.22em] text-fuchsia-300">AI tools & ecosystem</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Explore the tools shaping AI-powered DevOps</h2><p className="mt-2 text-sm text-slate-400">Learn categories and use cases, not just product names. Availability and features vary by provider.</p></div>
          <div className="grid gap-3 md:grid-cols-2">{toolGroups.map((group) => <article key={group.title} className="rounded-2xl border border-white/10 bg-[#111d31] p-5"><h3 className="font-bold text-white">{group.title}</h3><p className="mt-2 text-xs font-semibold leading-5 text-cyan-200">{group.tools}</p><p className="mt-3 text-xs leading-6 text-slate-400">{group.desc}</p><button type="button" onClick={() => askAI(group.prompt)} className="mt-4 rounded-lg bg-gradient-to-r from-cyan-300 to-violet-300 px-3 py-2 text-xs font-black text-slate-950">Ask AI about tools ↗</button></article>)}</div>
        </section>

        <section className="border-t border-white/10 py-9">
          <div className="mb-5"><p className="text-[10px] font-black uppercase tracking-[.22em] text-amber-300">DevOps learning roadmap</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Build skills in the right order</h2><p className="mt-2 text-sm text-slate-400">Select any stage and ask AI to teach every topic from fundamentals to production practice.</p></div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{tracks.map(([n,title,tools,desc]) => <article key={n} className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-4"><span className="font-mono text-xs font-black text-amber-300">{n} / LEARNING STAGE</span><h3 className="mt-3 font-extrabold">{title}</h3><p className="mt-2 text-[11px] font-bold leading-5 text-cyan-200">{tools}</p><p className="mt-2 min-h-12 text-xs leading-5 text-slate-400">{desc}</p><button type="button" onClick={() => askAI(makePrompt(title, `Teach these areas: ${tools}. ${desc} Include a topic-by-topic curriculum, hands-on labs, checkpoints and projects.`))} className="mt-4 rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-xs font-bold text-amber-200 hover:bg-amber-300/20">Ask AI to teach this stage ↗</button></article>)}</div>
        </section>

        <section className="mb-8 rounded-3xl border border-emerald-300/20 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 p-6 sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-emerald-200">Learn safely · Think independently</p><h2 className="mt-2 text-2xl font-black">AI suggests. You understand. You verify. You decide.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Use read-only diagnostics first. Never paste passwords, tokens or customer data. Test generated commands and configurations in a safe lab. Require human review and approval before production changes.</p></div><button type="button" onClick={() => askAI("Create a personal 12-week DevOps learning plan for me. Start by assessing my current skills, available study time and computer/lab access. Include weekly goals, hands-on labs, projects, revision and assessments.")} className="rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-5 py-3 text-sm font-black text-slate-950">Create my AI learning plan ↗</button></div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 text-[10px] text-slate-500"><span>DEVMAVOX · AI DEVOPS ASSIST</span><span>Learn · Code · Review · Troubleshoot · Automate · Improve</span><Link href="/" className="hover:text-white">Back to DevMavox Home ↑</Link></footer>
      </div>
    </main>
  );
}
