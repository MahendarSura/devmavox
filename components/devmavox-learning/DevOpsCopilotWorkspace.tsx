"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { FeatureDefinition } from "./feature-catalog";

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\\u0300-\\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const accents = [
  "border-lime-300/30 bg-lime-300/[0.07] text-lime-200",
  "border-orange-300/30 bg-orange-300/[0.07] text-orange-200",
  "border-cyan-300/30 bg-cyan-300/[0.07] text-cyan-200",
  "border-fuchsia-300/30 bg-fuchsia-300/[0.07] text-fuchsia-200",
  "border-amber-300/30 bg-amber-300/[0.07] text-amber-200",
  "border-rose-300/30 bg-rose-300/[0.07] text-rose-200",
  "border-sky-300/30 bg-sky-300/[0.07] text-sky-200",
  "border-violet-300/30 bg-violet-300/[0.07] text-violet-200",
  "border-emerald-300/30 bg-emerald-300/[0.07] text-emerald-200",
  "border-pink-300/30 bg-pink-300/[0.07] text-pink-200",
];

const glyphs = ["✳", ">_", "{ }", "⌘", "◉", "⌁", "⇄", "◇", "◎", "⚑"];

export default function DevOpsChatGPTWorkspace({ feature, slug = [] }: { feature: FeatureDefinition; slug?: string[] }) {
  const [mode, setMode] = useState("Explain");
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [notice, setNotice] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const category = feature.categories.find((item) => slugify(item.name) === slug[0]);
  const subcategory = category?.subcategories.find((item) => slugify(item.name) === slug[1]);
  const topic = subcategory?.topics.find((item) => slugify(item) === slug[2]);
  const topicCount = useMemo(() => feature.categories.reduce((n, c) => n + c.subcategories.reduce((m, s) => m + s.topics.length, 0), 0), [feature]);
  const root = "/devops-ai-assistant";
  async function submitRequest() {
    if (!question.trim() || loading) return;
    setLoading(true); setError(""); setAnswer(""); setNotice(false);
    try {
      const response = await fetch("/api/devops-chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode, question, context, category: category?.name, topic }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "ChatGPT request failed.");
      setAnswer(data.answer);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to reach ChatGPT."); }
    finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#111411] text-[#f5f1e7]">
      <div className="pointer-events-none fixed inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 12% 8%, rgba(191,255,0,.12), transparent 26%), radial-gradient(circle at 88% 20%, rgba(255,112,82,.12), transparent 28%), linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)", backgroundSize: "auto, auto, 36px 36px, 36px 36px" }} />
      <div className="relative mx-auto max-w-[1440px] px-4 py-5 sm:px-7 lg:px-10">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
          <Link href="/" className="text-sm font-bold tracking-wide text-[#e8e6dc]">DEV<span className="text-[#c7ff43]">MAVOX</span><span className="ml-2 text-[10px] font-medium uppercase tracking-[.25em] text-white/35">/ AI ENGINEERING</span></Link>
          <div className="flex items-center gap-3 text-xs text-white/50"><Link href="/" className="hover:text-white">← Home</Link><span className="text-white/20">/</span><span className="text-[#c7ff43]">ChatGPT workspace</span></div>
        </nav>

        {slug.length === 0 ? (
          <>
            <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-[#c7ff43]/20 bg-[#1a2018] p-6 sm:p-10">
              <div className="absolute -right-8 -top-16 select-none font-black leading-none text-[17rem] text-[#c7ff43]/[0.045]">AI</div>
              <div className="relative grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c7ff43]/30 bg-[#c7ff43]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.22em] text-[#d5ff79]"><span className="h-2 w-2 rounded-full bg-[#c7ff43]" /> DevOps intelligence layer</div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[.28em] text-[#ff896d]">Ask. Inspect. Understand. Improve.</p>
                  <h1 className="max-w-3xl text-4xl font-black leading-[1.04] tracking-tight sm:text-6xl">Your DevOps workbench, <span className="text-[#c7ff43]">powered by ChatGPT.</span></h1>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">A focused engineering workspace for command guidance, configuration reviews, infrastructure decisions and production incident reasoning.</p>
                  <div className="mt-7 flex flex-wrap gap-2 text-[11px] font-semibold"><span className="rounded-lg bg-[#c7ff43] px-3 py-2 text-[#171b13]">10 capability domains</span><span className="rounded-lg border border-white/15 px-3 py-2 text-white/65">{topicCount} specialist workflows</span><span className="rounded-lg border border-white/15 px-3 py-2 text-white/65">3-level navigation</span></div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0c100d]/80 p-5 shadow-2xl shadow-black/30">
                  <div className="mb-4 flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[.2em] text-white/45">ChatGPT session preview</span><span className="rounded-full bg-[#ff896d]/10 px-2 py-1 text-[9px] text-[#ff9b83]">OpenAI API setup required</span></div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-white/[.07] p-3 text-white/75">Why are my Kubernetes pods stuck in Pending?</div>
                    <div className="ml-auto max-w-[90%] rounded-xl rounded-tr-sm border border-[#c7ff43]/20 bg-[#c7ff43]/[.08] p-3 text-[#e6f8c7]">Inspect scheduling events, resource requests, node capacity and PVC binding. Start with <span className="text-[#c7ff43]">kubectl describe pod</span>.</div>
                    <div className="flex items-center gap-2 border-t border-white/10 pt-3 text-[10px] text-white/35"><span className="h-1.5 w-1.5 rounded-full bg-[#ff896d]" /> Illustrative preview · not a live model response</div>
                  </div>
                </div>
              </div>
            </section>

            <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-[.24em] text-[#ff896d]">Capability map / 01—10</p><h2 className="mt-2 text-2xl font-black tracking-tight">Choose your engineering lane</h2></div><p className="max-w-md text-xs leading-5 text-white/45">Each domain opens a dedicated workflow with its own sub-section and specialist topics.</p></div>
            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {feature.categories.map((cat, i) => {
                const count = cat.subcategories.reduce((n, s) => n + s.topics.length, 0);
                return <Link key={cat.name} href={root + "/" + slugify(cat.name)} className={`group relative min-h-[190px] overflow-hidden rounded-2xl border p-5 transition duration-200 hover:-translate-y-1 hover:bg-white/[.08] ${accents[i % accents.length]}`}>
                  <div className="flex items-start justify-between"><span className="font-mono text-[10px] opacity-55">DOMAIN_{String(i + 1).padStart(2, "0")}</span><span className="text-3xl font-black opacity-80">{glyphs[i % glyphs.length]}</span></div>
                  <h3 className="mt-7 max-w-[15rem] text-lg font-extrabold leading-tight text-[#f5f1e7]">{cat.name}</h3>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-semibold opacity-65"><span>{cat.subcategories.length} workflow · {count} topics</span><span className="text-base transition group-hover:translate-x-1">↗</span></div>
                </Link>;
              })}
            </section>
            <section className="mt-8 grid gap-3 lg:grid-cols-3">
              {[
                ["01 / Ask with context","Describe the task, paste an error or provide a configuration snippet."],
                ["02 / Inspect the reasoning","Review assumptions, evidence, risks and recommended validation."],
                ["03 / Apply safely","Run commands yourself, verify the outcome and keep production changes under human control."],
              ].map(([title, desc]) => <div key={title} className="rounded-xl border border-white/10 bg-white/[.035] p-5"><p className="font-mono text-[10px] tracking-[.18em] text-[#c7ff43]">{title}</p><p className="mt-2 text-sm leading-6 text-white/55">{desc}</p></div>)}
            </section>
          </>
        ) : !category ? (
          <div className="rounded-2xl border border-[#ff896d]/30 bg-[#ff896d]/10 p-6">Category not found. <Link className="underline" href={root}>Return to ChatGPT home</Link></div>
        ) : slug.length === 1 ? (
          <>
            <Link href={root} className="text-xs text-white/45 hover:text-white">← All capability domains</Link>
            <section className="my-6 rounded-3xl border border-[#c7ff43]/20 bg-[#1a2018] p-7 sm:p-10"><p className="font-mono text-[10px] uppercase tracking-[.24em] text-[#c7ff43]">Capability domain / {category.name}</p><h1 className="mt-3 text-4xl font-black">{category.name}</h1><p className="mt-3 text-sm text-white/55">Choose a workflow to open its specialist topic collection.</p></section>
            <div className="grid gap-3 md:grid-cols-2">{category.subcategories.map((sub, i) => <Link key={sub.name} href={root + "/" + slug[0] + "/" + slugify(sub.name)} className="rounded-2xl border border-white/10 bg-[#1b211b] p-6 transition hover:border-[#c7ff43]/40"><span className="font-mono text-[10px] text-[#ff896d]">WORKFLOW_{String(i + 1).padStart(2, "0")}</span><h2 className="mt-3 text-xl font-bold">{sub.name}</h2><p className="mt-2 text-xs text-white/45">{sub.topics.length} specialist topics</p><p className="mt-5 text-xs font-bold text-[#c7ff43]">OPEN WORKFLOW ↗</p></Link>)}</div>
          </>
        ) : !subcategory ? (
          <div className="rounded-2xl border border-[#ff896d]/30 bg-[#ff896d]/10 p-6">Workflow not found. <Link className="underline" href={root + "/" + slug[0]}>Return to category</Link></div>
        ) : slug.length === 2 ? (
          <>
            <Link href={root + "/" + slug[0]} className="text-xs text-white/45 hover:text-white">← {category.name}</Link>
            <h1 className="my-6 text-3xl font-black">{subcategory.name}</h1>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{subcategory.topics.map((item, i) => <Link key={item} href={root + "/" + slug[0] + "/" + slug[1] + "/" + slugify(item)} className="rounded-2xl border border-white/10 bg-[#1b211b] p-5 hover:border-[#c7ff43]/40"><p className="font-mono text-[10px] text-[#ff896d]">SPECIALIST_TOPIC_{String(i + 1).padStart(2, "0")}</p><h2 className="mt-3 font-bold">{item}</h2><p className="mt-4 text-[11px] text-white/40">Open ChatGPT workflow →</p></Link>)}</div>
          </>
        ) : !topic ? (
          <div className="rounded-2xl border border-[#ff896d]/30 bg-[#ff896d]/10 p-6">Topic not found. <Link className="underline" href={root + "/" + slug[0] + "/" + slug[1]}>Return to topics</Link></div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-white/40"><Link href={root}>ChatGPT</Link><span>/</span><Link href={root + "/" + slug[0]}>{category.name}</Link><span>/</span><Link href={root + "/" + slug[0] + "/" + slug[1]}>{subcategory.name}</Link></div>
            <section className="mb-6 rounded-3xl border border-[#c7ff43]/20 bg-[#1a2018] p-7"><p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#c7ff43]">Specialist workflow</p><h1 className="mt-3 text-3xl font-black">{topic}</h1><p className="mt-2 text-sm text-white/50">Provide a question and relevant engineering context. Review suggestions before applying them.</p></section>
            <section className="grid gap-5 lg:grid-cols-[1fr_300px]">
              <div className="rounded-2xl border border-white/10 bg-[#1a201b] p-5 sm:p-7">
                <div className="mb-5 flex flex-wrap gap-2">{["Explain","Generate","Review","Troubleshoot"].map(item=><button key={item} onClick={()=>setMode(item)} className={`rounded-full px-4 py-2 text-xs font-bold ${mode===item?"bg-[#c7ff43] text-[#151a12]":"border border-white/10 text-white/55 hover:text-white"}`}>{item}</button>)}</div>
                <label className="mb-2 block text-xs font-semibold text-white/65">Your {mode.toLowerCase()} request</label>
                <textarea value={question} onChange={e=>setQuestion(e.target.value)} rows={6} placeholder="Describe the issue, paste a command, configuration or error message..." className="w-full resize-y rounded-xl border border-white/10 bg-[#0d110e] p-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#c7ff43]/50" />
                <label className="mb-2 mt-5 block text-xs font-semibold text-white/65">Environment context (optional)</label>
                <input value={context} onChange={e=>setContext(e.target.value)} placeholder="e.g. EKS 1.30 · Ubuntu 24.04 · Production (read-only analysis)" className="w-full rounded-xl border border-white/10 bg-[#0d110e] p-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#c7ff43]/50" />
                <button onClick={submitRequest} disabled={!question.trim() || loading} className="mt-5 rounded-xl bg-[#c7ff43] px-5 py-3 text-xs font-black text-[#151a12] disabled:cursor-not-allowed disabled:opacity-40">{loading ? "CHATGPT IS THINKING…" : "ASK CHATGPT ↗"}</button>
                {error && <p role="alert" className="mt-4 rounded-xl border border-[#ff896d]/25 bg-[#ff896d]/10 p-4 text-xs leading-6 text-[#ffc0b1]">{error}</p>}
                {answer && <div className="mt-6 rounded-xl border border-[#c7ff43]/25 bg-[#0d110e] p-5"><p className="mb-3 font-mono text-[10px] uppercase tracking-[.18em] text-[#c7ff43]">ChatGPT response</p><div className="whitespace-pre-wrap text-sm leading-7 text-white/80">{answer}</div></div>}
              </div>
              <aside className="space-y-3">
                <div className="rounded-2xl border border-[#ff896d]/25 bg-[#ff896d]/[.06] p-5"><p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#ff9a83]">Connection status</p><p className="mt-3 text-lg font-bold">OpenAI API not connected</p><p className="mt-2 text-xs leading-5 text-white/45">Requests use a server-side endpoint. Add OPENAI_API_KEY in Vercel environment variables to activate ChatGPT. No key is exposed in the browser.</p></div>
                <div className="rounded-2xl border border-white/10 bg-[#1a201b] p-5"><p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#c7ff43]">Safe-use checklist</p><ul className="mt-3 space-y-2 text-xs leading-5 text-white/55"><li>• Remove passwords and tokens</li><li>• Redact customer data</li><li>• Verify commands before execution</li><li>• Require human approval for production changes</li></ul></div>
              </aside>
            </section>
          </>
        )}
        <footer className="mt-14 border-t border-white/10 pt-5 text-[10px] tracking-wide text-white/30">DEVMAVOX / CHATGPT DEVOPS ASSISTANT · Human-reviewed operations only</footer>
      </div>
    </main>
  );
}
