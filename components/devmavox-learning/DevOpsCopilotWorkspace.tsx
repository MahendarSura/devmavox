"use client";

import Link from "next/link";
import { useState } from "react";
import type { FeatureDefinition } from "./feature-catalog";

const chatUrl = (prompt: string) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;

const starters = [
  { icon: "◈", title: "Teach me from zero", detail: "Start with the basics. Assume I am a beginner.", prompt: "I am a complete beginner. Teach me DevOps from zero in a structured order. Explain every technical term in simple English, use practical examples and diagrams, give me a small exercise after each lesson, and do not move forward until I understand." },
  { icon: "⌘", title: "Explain a DevOps tool", detail: "Understand what it is, why it is used and how it works.", prompt: "Teach me [TOOL] from beginner to advanced: what it is, why it is needed, architecture, components, how it works internally, real company use cases, commands with line-by-line explanations, practical examples, common mistakes, security and interview questions. Teach one topic at a time." },
  { icon: "⚙", title: "Practise commands", detail: "Learn by doing with guided terminal exercises.", prompt: "Create a safe, beginner-friendly hands-on lab for [TOOL]. Give me one task at a time, exact commands, explain each command, show expected output and ask me to share my result before continuing. Include verification and cleanup." },
  { icon: "⌕", title: "Fix an error", detail: "Understand logs, find root cause and verify the fix.", prompt: "Help me troubleshoot this DevOps issue: [PASTE ERROR AND REDACTED LOGS]. Ask for missing context first. Start with read-only diagnostic commands, explain expected results, identify root cause from evidence, then give a safe fix, rollback and verification steps." },
  { icon: "▤", title: "Build a real project", detail: "Connect tools into an end-to-end delivery workflow.", prompt: "Guide me through a portfolio-grade end-to-end DevOps project using [TOOLS]. Show architecture, repository structure, infrastructure, Docker, CI/CD, Kubernetes deployment, monitoring, security and documentation. Divide it into milestones and wait for me to finish each one." },
  { icon: "◎", title: "Prepare for interviews", detail: "Practise technical, practical and production questions.", prompt: "Act as my DevOps interviewer for a [LEVEL] role. Ask one question at a time across Linux, networking, Git, AWS, Docker, Kubernetes, CI/CD, Terraform, Ansible and monitoring. Evaluate my answer, explain gaps and give a strong sample answer." },
];

const tracks = [
  { n: "01", title: "Foundations", tools: "Linux · Networking · Git · Shell", result: "Understand servers, networks, source control and the software delivery lifecycle." },
  { n: "02", title: "Cloud & Infrastructure", tools: "AWS · Terraform · Ansible", result: "Create and automate repeatable cloud infrastructure." },
  { n: "03", title: "Containers & Kubernetes", tools: "Docker · Kubernetes · Helm", result: "Package, deploy, scale and operate applications." },
  { n: "04", title: "CI/CD & GitOps", tools: "Jenkins · GitHub Actions · Argo CD", result: "Build, test and release software through automated pipelines." },
  { n: "05", title: "Monitoring & Reliability", tools: "Prometheus · Grafana · OpenTelemetry", result: "Observe systems, respond to incidents and improve reliability." },
  { n: "06", title: "Production & Modern DevOps", tools: "DevSecOps · SRE · Platform Engineering · AIOps · AI agents · MCP", result: "Apply security, reliability and AI-assisted engineering responsibly." },
];

export default function DevOpsCopilotWorkspace({ feature: _feature, slug: _slug = [] }: { feature: FeatureDefinition; slug?: string[] }) {
  const [question, setQuestion] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [copied, setCopied] = useState("");

  function openChat(prompt: string) {
    const prepared = `My current level: ${level}. Please teach me step by step in simple English, explain technical words, give practical DevOps examples and check my understanding.\n\n${prompt}`;
    window.open(chatUrl(prepared), "_blank", "noopener,noreferrer");
  }

  async function copyPrompt(prompt: string, title: string) {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(title);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("Select the prompt text and copy it.");
    }
  }

  return (
    <main className="min-h-screen bg-[#080d18] text-slate-100">
      <div className="pointer-events-none fixed inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,.15), transparent 48%), linear-gradient(rgba(148,163,184,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.035) 1px, transparent 1px)", backgroundSize: "auto, 36px 36px, 36px 36px" }} />
      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-7 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-4">
          <Link href="/" className="text-sm font-black tracking-wider">DEV<span className="text-cyan-300">MAVOX</span><span className="ml-2 text-[10px] font-medium tracking-[.2em] text-slate-500">/ DEVOPS AI</span></Link>
          <Link href="/" className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5">← Home</Link>
        </header>

        <section className="grid gap-8 py-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-cyan-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Your AI-guided DevOps classroom</div>
            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight sm:text-6xl">Learn DevOps.<br/><span className="text-cyan-300">Build real skills.</span></h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">No trainer beside you? Use this page as your learning guide. Choose what you want to understand, ask AI, practise in a lab and build projects from beginner to production level.</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-300"><span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Learn step by step</span><span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Hands-on practice</span><span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Real production scenarios</span></div>
          </div>
          <div className="rounded-3xl border border-cyan-200/20 bg-[#101c2d]/90 p-5 shadow-2xl shadow-cyan-950/30 sm:p-7">
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-cyan-200">Ask your DevOps question</p>
            <h2 className="mt-2 text-xl font-bold">What do you want to learn today?</h2>
            <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={4} placeholder="Example: What is Kubernetes? Explain Pods, Deployments and Services with a real example..." className="mt-4 w-full resize-y rounded-xl border border-white/10 bg-[#080f1b] p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/60" />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-400">My level <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-lg border border-white/10 bg-[#080f1b] px-2 py-2 text-xs text-white"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
              <button type="button" disabled={!question.trim()} onClick={() => openChat(question.trim())} className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40">Ask ChatGPT ↗</button>
            </div>
            <p className="mt-3 text-[10px] leading-5 text-slate-500">Opens ChatGPT with your question in a new tab. ChatGPT may require sign-in or apply usage limits depending on its current access rules. DevMavox does not bypass them.</p>
          </div>
        </section>

        <section className="border-t border-white/10 py-10">
          <div className="mb-6"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-cyan-300">Choose a starting point</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">You don't need to know what to ask.</h2><p className="mt-2 text-sm text-slate-400">Pick a learning task. We prepare the question; ChatGPT helps you explore it.</p></div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {starters.map((item) => <article key={item.title} className="group rounded-2xl border border-white/10 bg-white/[.035] p-5 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/[.045]">
              <div className="flex items-start justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-xl text-cyan-200">{item.icon}</span><span className="text-[10px] font-mono text-slate-600">AI GUIDE / 0{starters.indexOf(item)+1}</span></div>
              <h3 className="mt-4 text-base font-bold">{item.title}</h3><p className="mt-2 min-h-10 text-xs leading-5 text-slate-400">{item.detail}</p>
              <div className="mt-4 flex gap-2"><button type="button" onClick={() => openChat(item.prompt)} className="rounded-lg bg-cyan-300 px-3 py-2 text-xs font-black text-slate-950 hover:bg-cyan-200">Start with AI ↗</button><button type="button" onClick={() => copyPrompt(item.prompt,item.title)} className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5">{copied===item.title ? "Copied ✓" : "Copy prompt"}</button></div>
            </article>)}
          </div>
          {copied && copied !== "Select the prompt text and copy it." && <p role="status" className="mt-3 text-xs text-emerald-300">Prompt copied to clipboard.</p>}
          {copied === "Select the prompt text and copy it." && <p role="status" className="mt-3 text-xs text-amber-300">{copied}</p>}
        </section>

        <section className="border-t border-white/10 py-10">
          <div className="mb-6"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-violet-300">Your learning path</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">From first command to production engineering</h2><p className="mt-2 text-sm text-slate-400">Follow this order. Each stage builds on the skills from the previous one.</p></div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {tracks.map((track) => <article key={track.n} className="rounded-2xl border border-white/10 bg-[#101827] p-5"><div className="flex items-center justify-between"><span className="font-mono text-xs font-bold text-cyan-300">{track.n}</span><span className="h-px w-16 bg-gradient-to-r from-cyan-300/60 to-transparent" /></div><h3 className="mt-4 text-lg font-bold">{track.title}</h3><p className="mt-2 text-xs font-semibold leading-5 text-violet-200">{track.tools}</p><p className="mt-3 text-xs leading-6 text-slate-400">{track.result}</p></article>)}
          </div>
        </section>

        <section className="grid gap-5 border-t border-white/10 py-10 lg:grid-cols-[1.1fr_.9fr]">
          <div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-emerald-300">Beyond traditional DevOps</p><h2 className="mt-2 text-2xl font-black">What can you learn with AI in modern DevOps?</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">Explore AI-assisted coding and infrastructure, AIOps incident analysis, agents that use approved tools, MCP integrations, platform engineering, DevSecOps and FinOps. Learn the fundamentals first; use AI as an assistant, not as an unchecked production operator.</p></div>
          <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[.045] p-5"><h3 className="font-bold text-emerald-100">The student learning cycle</h3><div className="mt-4 grid grid-cols-2 gap-2 text-xs">{["Understand the concept","See architecture and examples","Practise in a safe lab","Troubleshoot a failure","Build a mini project","Explain and self-assess"].map((x,i)=><div key={x} className="rounded-lg border border-white/10 bg-black/15 p-3"><span className="mr-2 font-mono text-emerald-300">0{i+1}</span>{x}</div>)}</div></div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 text-[10px] text-slate-500"><span>DEVMAVOX · DEVOPS AI LEARNING</span><span>Learn · Practise · Build · Troubleshoot</span><Link href="/" className="hover:text-white">Back to Home ↑</Link></footer>
      </div>
    </main>
  );
}
