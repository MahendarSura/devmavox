"use client";

import Link from "next/link";
import { useState } from "react";
import type { FeatureDefinition } from "./feature-catalog";

const CHATGPT_URL = "https://chatgpt.com/";

const learningStages = [
  {
    number: "01",
    title: "DevOps foundations",
    level: "Start here",
    topics: ["What DevOps means and why teams use it", "SDLC, Agile, collaboration and feedback loops", "Linux basics, shell, processes and permissions", "Networking: IP, DNS, HTTP, TLS, ports and load balancers"],
    outcome: "Understand how an application moves from a developer's laptop to production.",
  },
  {
    number: "02",
    title: "Source control and collaboration",
    level: "Beginner",
    topics: ["Git fundamentals, commits, branches and merges", "GitHub repositories, pull requests and reviews", "Merge conflicts, tags, releases and branching strategies"],
    outcome: "Work safely with team code and understand the change-review process.",
  },
  {
    number: "03",
    title: "Cloud and infrastructure",
    level: "Beginner → Intermediate",
    topics: ["AWS fundamentals: IAM, VPC, EC2, S3 and load balancing", "Compute, networking, storage, identity and security basics", "Terraform: providers, resources, state, modules and remote backends", "Ansible: inventory, variables, playbooks, roles and idempotency"],
    outcome: "Understand and provision repeatable infrastructure instead of relying only on manual setup.",
  },
  {
    number: "04",
    title: "Containers and orchestration",
    level: "Intermediate",
    topics: ["Docker images, containers, registries, volumes and networks", "Dockerfiles, Compose, image security and multi-stage builds", "Kubernetes architecture, Pods, Deployments, Services and ConfigMaps", "Probes, requests and limits, storage, RBAC, ingress and Helm"],
    outcome: "Package applications and deploy, scale and operate them on Kubernetes.",
  },
  {
    number: "05",
    title: "CI/CD and GitOps",
    level: "Intermediate",
    topics: ["Jenkins pipelines, agents, stages, artifacts and credentials", "Build, test, scan, package and deployment workflows", "GitHub Actions and reusable workflow concepts", "Argo CD, GitOps reconciliation, rollout and rollback strategies"],
    outcome: "Build a repeatable delivery pipeline and understand how code reaches environments.",
  },
  {
    number: "06",
    title: "Observability and reliability",
    level: "Intermediate → Advanced",
    topics: ["Prometheus metrics, exporters, PromQL and alert rules", "Grafana dashboards, panels and alerting", "Logs, metrics, traces and OpenTelemetry fundamentals", "SLI, SLO, error budgets, capacity and disaster recovery"],
    outcome: "Measure service health, detect problems and reason about reliability.",
  },
  {
    number: "07",
    title: "Production engineering",
    level: "Advanced",
    topics: ["Incident response, triage, evidence and root-cause analysis", "High availability, scaling, resilience and performance", "DevSecOps, secrets, least privilege and software supply-chain security", "FinOps, cost visibility, policy as code and platform engineering"],
    outcome: "Investigate production issues and make safer engineering decisions.",
  },
  {
    number: "08",
    title: "Modern AI for DevOps",
    level: "Emerging skills",
    topics: ["AI copilots for code, scripts, Terraform and Kubernetes manifests", "AIOps: anomaly detection, alert correlation and incident summaries", "AI agents, tool calling, guardrails and human approval", "MCP: connecting assistants to approved tools and live engineering context"],
    outcome: "Understand where AI can assist the lifecycle, and where human review is essential.",
  },
];

const learningPrompts = [
  {
    tag: "I am a complete beginner",
    title: "Start learning DevOps from zero",
    prompt: "Act as my patient DevOps trainer. I am a complete beginner. First assess what I know, then teach DevOps from zero in a clear sequence. Use simple English, explain every technical word, give relatable analogies, draw text-based diagrams where useful, show one practical example, ask me a short question, and wait for my answer before moving to the next lesson. Do not skip prerequisites.",
  },
  {
    tag: "Understand a topic deeply",
    title: "Teach me any DevOps concept in depth",
    prompt: "Teach me [TOPIC] from beginner to advanced. Explain what it is, why it exists, the problem it solves, how it works internally, its architecture and components, where companies use it, a realistic end-to-end example, important commands/configuration with line-by-line explanations, expected outputs, common mistakes, troubleshooting, security considerations, and interview questions. Check my understanding after each major section. Do not assume prior knowledge.",
  },
  {
    tag: "I do not know what to search",
    title: "Help me ask the right questions",
    prompt: "I want to learn [TOOL OR TOPIC] but I do not know what questions to ask. Create a beginner-friendly question map in the right learning order. Start with prerequisites and fundamentals, then architecture, components, installation, configuration, commands, hands-on practice, real production use, troubleshooting, security, advanced concepts and interview preparation. Explain why each stage matters and teach one stage at a time.",
  },
  {
    tag: "Practise hands-on",
    title: "Give me a guided practical lab",
    prompt: "Act as my DevOps lab instructor for [TOOL/TOPIC]. Give me a realistic hands-on lab with objective, prerequisites, safe setup, exact steps, commands, sample files, expected output and verification. Do not reveal all solutions immediately. Give me one task at a time, wait for my result, then guide me. Include cleanup steps and warn me before any destructive command.",
  },
  {
    tag: "Fix an error",
    title: "Troubleshoot step by step",
    prompt: "Act as a senior DevOps incident mentor. Help me troubleshoot this issue: [PASTE ERROR]. First ask for missing context. Start with safe read-only diagnostic commands. Explain what each command checks and how to interpret possible output. Build a hypothesis from evidence, identify the likely root cause, propose the safest fix, explain rollback and give verification steps. Do not invent logs or claim you accessed my system.",
  },
  {
    tag: "Build a real project",
    title: "Create an end-to-end DevOps project",
    prompt: "Design a realistic portfolio-grade DevOps project using [TOOLS]. Teach me as if I have no trainer. Show the architecture, requirements, repository structure, infrastructure, application packaging, CI/CD, deployment, monitoring, security, failure testing and documentation. Break it into milestones with tasks and acceptance criteria. Let me complete each milestone before giving the next.",
  },
  {
    tag: "Prepare for interviews",
    title: "Practise like a real DevOps interview",
    prompt: "Act as a technical interviewer for a [BEGINNER/INTERMEDIATE/ADVANCED] DevOps Engineer role. Ask one question at a time across Linux, networking, Git, AWS, Docker, Kubernetes, CI/CD, Terraform, Ansible, monitoring and production incidents. Wait for my answer, evaluate correctness, explain gaps, show a strong answer and track topics I should revise. Include practical and scenario-based questions.",
  },
  {
    tag: "Explore new AI skills",
    title: "Learn AI-assisted DevOps and MCP",
    prompt: "Teach me modern AI for DevOps from fundamentals to practical use: AI copilots, coding and IaC assistance, AIOps, incident agents, tool calling, MCP servers, permissions, guardrails, audit logs and human approval. Give real DevOps examples, a safe beginner lab and explain what AI can and cannot do. Never imply an agent has accessed or changed infrastructure unless a real integration is configured.",
  },
];

const aiUseCases = [
  ["Explain", "Turn unfamiliar terms into simple explanations, analogies, architecture walkthroughs and examples."],
  ["Plan", "Create a learning roadmap, break a large goal into milestones and identify missing prerequisites."],
  ["Generate", "Draft sample shell commands, Dockerfiles, Kubernetes YAML, Terraform and CI/CD examples."],
  ["Review", "Ask for line-by-line explanations, likely errors, security concerns and version compatibility checks."],
  ["Troubleshoot", "Interpret redacted logs and error messages, then guide evidence-based diagnosis."],
  ["Practise", "Run quizzes, mock interviews, guided labs, flashcards and project reviews."],
];

const modernSkills = [
  "AI-assisted coding and infrastructure as code",
  "AIOps and intelligent incident triage",
  "AI agents with approved tool access",
  "Model Context Protocol (MCP) integrations",
  "Platform engineering and internal developer platforms",
  "DevSecOps and software supply-chain security",
  "GitOps and progressive delivery",
  "FinOps, policy as code and reliability engineering",
];

export default function DevOpsChatGPTWorkspace({ feature: _feature, slug: _slug = [] }: { feature: FeatureDefinition; slug?: string[] }) {
  const [copiedPrompt, setCopiedPrompt] = useState("");
  const [expandedStage, setExpandedStage] = useState("01");

  async function copyPrompt(title: string, prompt: string) {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(title);
      window.setTimeout(() => setCopiedPrompt(""), 2200);
    } catch {
      setCopiedPrompt("Copy unavailable — select and copy the prompt text.");
    }
  }

  return (
    <main className="min-h-screen bg-[#080d1c] text-slate-100">
      <div className="pointer-events-none fixed inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 12% 5%, rgba(34,211,238,.18), transparent 28%), radial-gradient(circle at 88% 18%, rgba(139,92,246,.17), transparent 30%), linear-gradient(rgba(148,163,184,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.035) 1px, transparent 1px)", backgroundSize: "auto, auto, 34px 34px, 34px 34px" }} />
      <div className="relative mx-auto max-w-[1440px] px-4 py-5 sm:px-7 lg:px-10">
        <nav className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
          <Link href="/" className="text-sm font-black tracking-wide">DEV<span className="text-cyan-300">MAVOX</span><span className="ml-2 text-[10px] font-medium uppercase tracking-[.22em] text-white/35">/ AI LEARNING</span></Link>
          <div className="flex items-center gap-4 text-xs text-white/55"><Link href="/" className="hover:text-white">← Back to Home</Link><a href={CHATGPT_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 font-bold text-cyan-100 hover:bg-cyan-300/20">Open ChatGPT ↗</a></div>
        </nav>

        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-[#10254a] via-[#111a38] to-[#251747] p-6 shadow-2xl shadow-cyan-950/20 sm:p-10">
          <div className="absolute -right-8 -top-12 select-none text-[13rem] font-black leading-none text-cyan-200/[.045]">AI</div>
          <div className="relative grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-cyan-100"><span className="h-2 w-2 rounded-full bg-emerald-400"/> Your self-paced DevOps trainer</span>
              <p className="mt-5 font-mono text-xs uppercase tracking-[.25em] text-violet-200">Learn clearly · Practise deeply · Grow independently</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[1.04] sm:text-6xl">Learn DevOps step by step with <span className="text-cyan-300">AI guidance.</span></h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200/75 sm:text-base">A guided learning map for students who do not have a personal trainer. Understand concepts, learn tools, practise commands, build projects, investigate failures and explore modern AI-powered DevOps.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={CHATGPT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-200">Start learning with ChatGPT <span>↗</span></a>
                <a href="#learning-roadmap" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white/85 hover:bg-white/10">Explore learning roadmap ↓</a>
              </div>
              <p className="mt-3 max-w-2xl text-[11px] leading-5 text-slate-300/65">ChatGPT opens in a new tab. Logged-out access is available in supported regions, but OpenAI may ask some visitors to sign in and applies usage limits. DevMavox cannot bypass those requirements.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-slate-950/45 p-5 backdrop-blur">
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-cyan-200/70">A learning loop that works</p>
              <div className="mt-4 space-y-3">
                {["Understand the idea", "See a real engineering example", "Practise with guided steps", "Break it safely and troubleshoot", "Explain it back and test yourself"].map((item, index) => <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.045] p-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-300/15 text-xs font-black text-cyan-200">{index + 1}</span><span className="text-sm text-slate-100/85">{item}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-cyan-200">Learn</p><h2 className="mt-2 text-lg font-bold">From zero to advanced</h2><p className="mt-2 text-sm leading-6 text-slate-300/65">Build prerequisites first, then connect each tool to the full software delivery lifecycle.</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-violet-200">Practise</p><h2 className="mt-2 text-lg font-bold">Do real engineering work</h2><p className="mt-2 text-sm leading-6 text-slate-300/65">Use labs, sample repositories, commands, configuration files and safe failure scenarios.</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-200">Become job-ready</p><h2 className="mt-2 text-lg font-bold">Think like an engineer</h2><p className="mt-2 text-sm leading-6 text-slate-300/65">Learn diagnosis, trade-offs, security, production operations and interview communication.</p></div>
        </section>

        <section id="learning-roadmap" className="mt-12 scroll-mt-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-[.22em] text-cyan-200">Your curriculum map</p><h2 className="mt-2 text-3xl font-black">What should I learn, and in what order?</h2></div><p className="max-w-xl text-xs leading-5 text-slate-400">Open each stage to see the topics and the practical outcome. Learn foundations before jumping into advanced tools.</p></div>
          <div className="grid gap-3 lg:grid-cols-2">
            {learningStages.map((stage) => {
              const open = expandedStage === stage.number;
              return <article key={stage.number} className={`overflow-hidden rounded-2xl border ${open ? "border-cyan-300/35 bg-cyan-300/[.055]" : "border-white/10 bg-white/[.035]"}`}>
                <button type="button" onClick={() => setExpandedStage(open ? "" : stage.number)} aria-expanded={open} className="flex w-full items-center gap-4 p-5 text-left">
                  <span className="font-mono text-xl font-black text-cyan-200/75">{stage.number}</span>
                  <span className="min-w-0 flex-1"><span className="block text-base font-bold">{stage.title}</span><span className="mt-1 block text-[10px] uppercase tracking-[.14em] text-slate-400">{stage.level}</span></span>
                  <span className="text-xl text-cyan-200">{open ? "−" : "+"}</span>
                </button>
                {open && <div className="border-t border-white/10 px-5 pb-5 pt-4"><ul className="space-y-2">{stage.topics.map((topic) => <li key={topic} className="flex gap-2 text-sm leading-6 text-slate-200/80"><span className="text-cyan-300">•</span>{topic}</li>)}</ul><p className="mt-4 rounded-xl bg-slate-950/45 p-3 text-xs leading-5 text-emerald-100/80"><strong>After this stage:</strong> {stage.outcome}</p><a href={CHATGPT_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-lg bg-cyan-300/15 px-3 py-2 text-xs font-bold text-cyan-100 hover:bg-cyan-300/25">Study this stage with ChatGPT ↗</a></div>}
              </article>;
            })}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-5"><p className="font-mono text-[10px] uppercase tracking-[.22em] text-violet-200">How AI helps you learn</p><h2 className="mt-2 text-3xl font-black">Use AI as your explainer, lab guide and reviewer</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">You do not need to know the perfect question. Tell AI your level and goal; ask it to teach one step at a time.</p></div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {aiUseCases.map(([title, description], index) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><span className="font-mono text-xs text-violet-200">0{index + 1}</span><h3 className="mt-3 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-300/65">{description}</p></div>)}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-5"><p className="font-mono text-[10px] uppercase tracking-[.22em] text-cyan-200">Prompt starter library</p><h2 className="mt-2 text-3xl font-black">Not sure what to ask? Start here.</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Copy a ready-made learning prompt, replace the bracketed words and paste it into ChatGPT. Ask follow-up questions until the idea is clear.</p></div>
          <div className="grid gap-3 md:grid-cols-2">
            {learningPrompts.map((item) => <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[.035] p-5">
              <span className="rounded-full bg-violet-300/10 px-3 py-1 text-[10px] font-bold text-violet-100">{item.tag}</span>
              <h3 className="mt-3 text-base font-bold">{item.title}</h3>
              <p className="mt-3 line-clamp-4 whitespace-pre-wrap text-xs leading-6 text-slate-400">{item.prompt}</p>
              <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => copyPrompt(item.title, item.prompt)} className="rounded-lg border border-white/15 px-3 py-2 text-xs font-bold text-white/80 hover:bg-white/10">{copiedPrompt === item.title ? "Copied ✓" : "Copy prompt"}</button><a href={CHATGPT_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-cyan-300 px-3 py-2 text-xs font-black text-slate-950 hover:bg-cyan-200">Open ChatGPT ↗</a></div>
            </article>)}
          </div>
          {copiedPrompt && copiedPrompt !== "Copy unavailable — select and copy the prompt text." && <p role="status" className="mt-3 text-xs text-emerald-300">Prompt copied. Open ChatGPT and paste it into the message box.</p>}
          {copiedPrompt === "Copy unavailable — select and copy the prompt text." && <p role="status" className="mt-3 text-xs text-amber-200">{copiedPrompt}</p>}
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-[1fr_.85fr]">
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[.045] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-emerald-200">Beyond traditional DevOps</p>
            <h2 className="mt-2 text-2xl font-black">New skills to explore next</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300/65">The DevOps field keeps evolving. Learn the fundamentals first, then explore these emerging practices.</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">{modernSkills.map((skill) => <li key={skill} className="flex gap-2 text-sm text-slate-200/80"><span className="text-emerald-300">✦</span>{skill}</li>)}</ul>
          </div>
          <div className="rounded-2xl border border-amber-200/20 bg-amber-200/[.045] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-amber-100">Learn safely and independently</p>
            <h2 className="mt-2 text-2xl font-black">A good student workflow</h2>
            <ol className="mt-5 space-y-3 text-sm leading-6 text-slate-200/80">{["Ask AI to explain the topic in simple words.", "Ask for an architecture diagram and a real company-style example.", "Recreate the example in a safe lab; do not just copy commands.", "Share redacted errors and your observations for guided troubleshooting.", "Explain the solution back in your own words and take a quiz.", "Build a small project and document what you learned."].map((step, index) => <li key={step} className="flex gap-3"><span className="font-mono text-amber-200">0{index + 1}</span>{step}</li>)}</ol>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-cyan-200/25 bg-gradient-to-r from-cyan-300/10 via-blue-400/10 to-violet-400/10 p-7 text-center sm:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[.22em] text-cyan-100">Your next step</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Start with one question. Keep learning until you can do it yourself.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300/70">DevMavox gives you the learning path and prompt guidance. ChatGPT provides the external AI conversation. Verify technical answers against official documentation and practise in a safe environment.</p>
          <a href={CHATGPT_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-xl bg-cyan-300 px-7 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-cyan-950/30 hover:bg-cyan-200">Open ChatGPT and start learning ↗</a>
        </section>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-[10px] tracking-wide text-slate-500"><span>DEVMAVOX / DEVOPS AI LEARNING ASSISTANT</span><span>Learn · Practise · Troubleshoot · Build · Grow</span><Link href="/" className="hover:text-white">Back to DevMavox Home ↑</Link></footer>
      </div>
    </main>
  );
}
