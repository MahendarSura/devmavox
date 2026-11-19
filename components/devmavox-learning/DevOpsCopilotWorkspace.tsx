"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { FeatureDefinition } from "./feature-catalog";
import { assistantTopicGuides } from "./devops-ai-topic-guides";

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
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

type BrowserTextGenerator = {
  tokenizer: {
    apply_chat_template: (
      messages: Array<{ role: "system" | "user"; content: string }>,
      options: { tokenize: false; add_generation_prompt: true },
    ) => string;
  };
  (
    prompt: string,
    options: { max_new_tokens: number; do_sample: boolean; return_full_text: boolean },
  ): Promise<Array<{ generated_text: string }>>;
};

const LOCAL_MODEL_ID = "onnx-community/Qwen2.5-0.5B-Instruct";

type KnowledgeQuestion = { number?: number; question: string; answer: string };
type KnowledgeGroup = { tool: string; category: string; questions: KnowledgeQuestion[] };
let knowledgeDatasetPromise: Promise<KnowledgeGroup[]> | null = null;

async function retrieveDevMavoxKnowledge(query: string, category: string, topic: string) {
  if (!knowledgeDatasetPromise) {
    knowledgeDatasetPromise = fetch(
      "https://raw.githubusercontent.com/MahendarSura/devmavox/main/data/basic-interview-qa-aws-docker-kubernetes.json",
      { cache: "force-cache" },
    ).then(async (response) => {
      if (!response.ok) throw new Error("DevMavox learning knowledge could not be downloaded.");
      const parsed = await response.json();
      if (!Array.isArray(parsed)) throw new Error("DevMavox learning knowledge has an unexpected format.");
      return parsed as KnowledgeGroup[];
    }).catch((error) => {
      knowledgeDatasetPromise = null;
      throw error;
    });
  }

  const groups = await knowledgeDatasetPromise;
  const stopWords = new Set(["the", "and", "for", "with", "from", "that", "this", "what", "when", "where", "which", "how", "why", "can", "does", "into", "are", "you", "your", "about", "please", "help", "need", "want", "should"]);
  const terms = [...new Set((`${category} ${topic} ${query}`.toLowerCase().match(/[a-z0-9.+#_-]{3,}/g) || []).filter((term) => !stopWords.has(term)))];
  if (!terms.length) return [];

  const matches: Array<{ score: number; tool: string; category: string; question: string; answer: string }> = [];
  for (const group of groups) {
    const groupText = `${group.tool || ""} ${group.category || ""}`.toLowerCase();
    for (const item of group.questions || []) {
      if (!item.question || !item.answer) continue;
      const questionText = item.question.toLowerCase();
      const answerText = item.answer.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (questionText.includes(term)) score += 4;
        if (answerText.includes(term)) score += 1;
        if (groupText.includes(term)) score += 3;
      }
      if (score > 0) matches.push({ score, tool: group.tool, category: group.category, question: item.question, answer: item.answer });
    }
  }
  return matches.sort((a, b) => b.score - a.score).slice(0, 3);
}

export default function DevOpsChatGPTWorkspace({ feature, slug = [] }: { feature: FeatureDefinition; slug?: string[] }) {
  const [mode, setMode] = useState("Explain");
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [notice, setNotice] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modelStatus, setModelStatus] = useState<"not-loaded" | "loading" | "ready" | "unsupported">("not-loaded");
  const [modelProgress, setModelProgress] = useState("");
  const engineRef = useRef<BrowserTextGenerator | null>(null);
  const category = feature.categories.find((item) => slugify(item.name) === slug[0]);
  const subcategory = category?.subcategories.find((item) => slugify(item.name) === slug[1]);
  const topic = subcategory?.topics.find((item) => slugify(item) === slug[2]);
  const topicCount = useMemo(() => feature.categories.reduce((n, c) => n + c.subcategories.reduce((m, s) => m + s.topics.length, 0), 0), [feature]);
  const topicGuide = topic ? assistantTopicGuides[topic] : undefined;
  const root = "/devops-ai-assistant";
  async function getLocalEngine() {
    if (engineRef.current) return engineRef.current;
    setModelStatus("loading");
    setModelProgress("Loading the CPU-compatible AI runtime…");
    try {
      // Transformers.js runs quantized ONNX models through WebAssembly on the CPU.
      // This deliberately avoids requiring WebGPU or a compatible graphics card.
      // @ts-expect-error The browser ESM build is loaded from the official jsDelivr CDN.
      const transformers = await import(/* webpackIgnore: true */ "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4");
      const generator = await transformers.pipeline("text-generation", LOCAL_MODEL_ID, {
        device: "wasm",
        dtype: "q4",
        progress_callback: (progress: { status?: string; file?: string; progress?: number }) => {
          const percent = typeof progress.progress === "number" ? ` ${Math.round(progress.progress)}%` : "";
          setModelProgress(`${progress.status || "Downloading model"}${progress.file ? `: ${progress.file}` : ""}${percent}`);
        },
      }) as BrowserTextGenerator;
      engineRef.current = generator;
      setModelStatus("ready");
      setModelProgress("CPU AI model ready. The browser will cache downloaded model files where supported.");
      return generator;
    } catch (err) {
      setModelStatus("not-loaded");
      throw new Error(err instanceof Error ? err.message : "Could not load the CPU AI model. Check the network connection, browser storage and available memory, then retry.");
    }
  }

  async function submitRequest() {
    if (!question.trim() || loading) return;
    setLoading(true); setError(""); setAnswer(""); setNotice(false);
    try {
      setModelProgress("Searching the DevMavox interview knowledge base…");
      let references: Awaited<ReturnType<typeof retrieveDevMavoxKnowledge>> = [];
      try { references = await retrieveDevMavoxKnowledge(question, category?.name || "DevOps", topic || "General assistance"); }
      catch { setModelProgress("Using the local AI model; the optional DevMavox reference library could not be reached."); }
      const engine = await getLocalEngine();
      const referenceContext = references.length
        ? references.map((item, index) => `[Reference ${index + 1} | ${item.tool} | ${item.category}]\nQuestion: ${item.question}\nAnswer: ${item.answer.slice(0, 1800)}`).join("\\n\\n")
        : "No matching DevMavox Q&A references were retrieved. Answer from your model knowledge and clearly state uncertainty.";
      const messages = [
        {
          role: "system" as const,
          content: `You are DevMavox AI, a careful senior DevOps tutor. Explain in beginner-friendly English, with simple Telugu-English phrasing when useful. Help with AWS, Linux, Git, Docker, Kubernetes, Terraform, Ansible, CI/CD, GitOps, monitoring and production troubleshooting. Structure answers with a short summary, assumptions, step-by-step explanation, safe commands/examples, expected output, validation and risks. Explain important command flags. Prefer read-only diagnostics before changes. Never claim to inspect live systems or execute commands. Never request secrets. Flag destructive commands and require human review for production changes. Be honest when uncertain. Use the supplied DevMavox reference material as supporting context, but do not blindly copy it or invent facts. If references conflict with supplied versions or environment, explain the mismatch.

Selected topic guidance:
Purpose: ${topicGuide?.purpose || "General DevOps assistance"}
Context to request: ${topicGuide?.context || "Ask for versions, environment, expected and actual behavior, and redacted evidence."}
Expected deliverables: ${topicGuide?.deliverables || "Explanation, safe steps, commands, validation and risks."}`,
        },
        {
          role: "user" as const,
          content: `Capability: ${category?.name || "DevOps"}
Topic: ${topic || "General assistance"}
Mode: ${mode}
Environment context: ${context.trim() || "Not supplied"}

DevMavox knowledge references:
${referenceContext}

Request:
${question.trim()}`,
        },
      ];
      const prompt = engine.tokenizer.apply_chat_template(messages, {
        tokenize: false,
        add_generation_prompt: true,
      });
      setModelProgress("Generating your DevOps answer on this device…");
      const result = await engine(prompt, {
        max_new_tokens: 700,
        do_sample: false,
        return_full_text: false,
      });
      const generated = result[0]?.generated_text?.trim();
      if (!generated) throw new Error("The local AI model returned an empty response. Please try a shorter or clearer question.");
      setAnswer(generated);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to run the local AI model."); }
    finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#111411] text-[#f5f1e7]">
      <div className="pointer-events-none fixed inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 12% 8%, rgba(191,255,0,.12), transparent 26%), radial-gradient(circle at 88% 20%, rgba(255,112,82,.12), transparent 28%), linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)", backgroundSize: "auto, auto, 36px 36px, 36px 36px" }} />
      <div className="relative mx-auto max-w-[1440px] px-4 py-5 sm:px-7 lg:px-10">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
          <Link href="/" className="text-sm font-bold tracking-wide text-[#e8e6dc]">DEV<span className="text-[#c7ff43]">MAVOX</span><span className="ml-2 text-[10px] font-medium uppercase tracking-[.25em] text-white/35">/ AI ENGINEERING</span></Link>
          <div className="flex items-center gap-3 text-xs text-white/50"><Link href="/" className="hover:text-white">← Home</Link><span className="text-white/20">/</span><span className="text-[#c7ff43]">DevOps AI workspace</span></div>
        </nav>

        {slug.length === 0 ? (
          <>
            <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-[#c7ff43]/20 bg-[#1a2018] p-6 sm:p-10">
              <div className="absolute -right-8 -top-16 select-none font-black leading-none text-[17rem] text-[#c7ff43]/[0.045]">AI</div>
              <div className="relative grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c7ff43]/30 bg-[#c7ff43]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.22em] text-[#d5ff79]"><span className="h-2 w-2 rounded-full bg-[#c7ff43]" /> DevOps intelligence layer</div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[.28em] text-[#ff896d]">Ask. Inspect. Understand. Improve.</p>
                  <h1 className="max-w-3xl text-4xl font-black leading-[1.04] tracking-tight sm:text-6xl">Your DevOps workbench, <span className="text-[#c7ff43]">powered by DevMavox AI.</span></h1>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">A free, login-free local AI tutor that runs on the device CPU, with command guidance, configuration reviews, infrastructure decisions and production incident reasoning grounded in DevMavox interview Q&A.</p>
                  <div className="mt-7 flex flex-wrap gap-2 text-[11px] font-semibold"><span className="rounded-lg bg-[#c7ff43] px-3 py-2 text-[#171b13]">10 capability domains</span><span className="rounded-lg border border-white/15 px-3 py-2 text-white/65">{topicCount} specialist workflows</span><span className="rounded-lg border border-white/15 px-3 py-2 text-white/65">3-level navigation</span></div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0c100d]/80 p-5 shadow-2xl shadow-black/30">
                  <div className="mb-4 flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[.2em] text-white/45">AI response preview</span><span className="rounded-full bg-[#c7ff43]/10 px-2 py-1 text-[9px] text-[#d5ff79]">Free CPU AI · no account</span></div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-white/[.07] p-3 text-white/75">Why are my Kubernetes pods stuck in Pending?</div>
                    <div className="ml-auto max-w-[90%] rounded-xl rounded-tr-sm border border-[#c7ff43]/20 bg-[#c7ff43]/[.08] p-3 text-[#e6f8c7]">Inspect scheduling events, resource requests, node capacity and PVC binding. Start with <span className="text-[#c7ff43]">kubectl describe pod</span>.</div>
                    <div className="flex items-center gap-2 border-t border-white/10 pt-3 text-[10px] text-white/35"><span className="h-1.5 w-1.5 rounded-full bg-[#ff896d]" /> Illustrative preview · local model runs on the student device CPU</div>
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
          <div className="rounded-2xl border border-[#ff896d]/30 bg-[#ff896d]/10 p-6">Category not found. <Link className="underline" href={root}>Return to DevMavox AI home</Link></div>
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
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{subcategory.topics.map((item, i) => <Link key={item} href={root + "/" + slug[0] + "/" + slug[1] + "/" + slugify(item)} className="rounded-2xl border border-white/10 bg-[#1b211b] p-5 hover:border-[#c7ff43]/40"><p className="font-mono text-[10px] text-[#ff896d]">SPECIALIST_TOPIC_{String(i + 1).padStart(2, "0")}</p><h2 className="mt-3 font-bold">{item}</h2><p className="mt-4 text-[11px] text-white/40">Open AI workflow →</p></Link>)}</div>
          </>
        ) : !topic ? (
          <div className="rounded-2xl border border-[#ff896d]/30 bg-[#ff896d]/10 p-6">Topic not found. <Link className="underline" href={root + "/" + slug[0] + "/" + slug[1]}>Return to topics</Link></div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-white/40"><Link href={root}>DevMavox AI</Link><span>/</span><Link href={root + "/" + slug[0]}>{category.name}</Link><span>/</span><Link href={root + "/" + slug[0] + "/" + slug[1]}>{subcategory.name}</Link></div>
            <section className="mb-6 rounded-3xl border border-[#c7ff43]/20 bg-[#1a2018] p-7"><p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#c7ff43]">Specialist workflow</p><h1 className="mt-3 text-3xl font-black">{topic}</h1><p className="mt-2 text-sm text-white/50">{topicGuide?.purpose || "Provide a question and relevant engineering context. Review suggestions before applying them."}</p></section>
            {topicGuide && <section className="mb-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[.035] p-4"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#c7ff43]">Context to provide</p><p className="mt-2 text-xs leading-6 text-white/55">{topicGuide.context}</p></div>
              <div className="rounded-xl border border-white/10 bg-white/[.035] p-4"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#ff896d]">Expected output</p><p className="mt-2 text-xs leading-6 text-white/55">{topicGuide.deliverables}</p></div>
              <div className="rounded-xl border border-[#c7ff43]/20 bg-[#c7ff43]/[.045] p-4"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#c7ff43]">Starter prompt</p><p className="mt-2 text-xs leading-6 text-white/70">{topicGuide.starterPrompt}</p><button type="button" onClick={() => setQuestion(topicGuide.starterPrompt)} className="mt-3 rounded-lg bg-[#c7ff43] px-3 py-2 text-[10px] font-black text-[#151a12]">USE THIS PROMPT ↗</button></div>
            </section>}
            <section className="mb-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[.035] p-4"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#c7ff43]">01 / Context to provide</p><p className="mt-2 text-xs leading-6 text-white/55">Share tool and version, environment, expected behaviour, actual result and relevant redacted logs or configuration.</p></div>
              <div className="rounded-xl border border-white/10 bg-white/[.035] p-4"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#ff896d]">02 / What the AI returns</p><p className="mt-2 text-xs leading-6 text-white/55">A structured explanation, assumptions, recommended steps, example commands or configuration, and validation guidance.</p></div>
              <div className="rounded-xl border border-white/10 bg-white/[.035] p-4"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-cyan-200">03 / Verify before use</p><p className="mt-2 text-xs leading-6 text-white/55">Check versions and environment fit. Test in a safe environment and get human approval before production changes.</p></div>
            </section>
            <section className="grid gap-5 lg:grid-cols-[1fr_300px]">
              <div className="rounded-2xl border border-white/10 bg-[#1a201b] p-5 sm:p-7">
                <div className="mb-5 flex flex-wrap gap-2">{["Explain","Generate","Review","Troubleshoot"].map(item=><button key={item} onClick={()=>setMode(item)} className={`rounded-full px-4 py-2 text-xs font-bold ${mode===item?"bg-[#c7ff43] text-[#151a12]":"border border-white/10 text-white/55 hover:text-white"}`}>{item}</button>)}</div>
                <label className="mb-2 block text-xs font-semibold text-white/65">Your {mode.toLowerCase()} request</label>
                <textarea value={question} onChange={e=>setQuestion(e.target.value)} rows={6} placeholder="Describe the issue, paste a command, configuration or error message..." className="w-full resize-y rounded-xl border border-white/10 bg-[#0d110e] p-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#c7ff43]/50" />
                <label className="mb-2 mt-5 block text-xs font-semibold text-white/65">Environment context (optional)</label>
                <input value={context} onChange={e=>setContext(e.target.value)} placeholder="e.g. EKS 1.30 · Ubuntu 24.04 · Production (read-only analysis)" className="w-full rounded-xl border border-white/10 bg-[#0d110e] p-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#c7ff43]/50" />
                <button onClick={submitRequest} disabled={!question.trim() || loading} className="mt-5 rounded-xl bg-[#c7ff43] px-5 py-3 text-xs font-black text-[#151a12] disabled:cursor-not-allowed disabled:opacity-40">{loading ? "AI IS THINKING…" : "ASK DEVMAVOX AI ↗"}</button>
                {error && <p role="alert" className="mt-4 rounded-xl border border-[#ff896d]/25 bg-[#ff896d]/10 p-4 text-xs leading-6 text-[#ffc0b1]">{error}</p>}
                {answer && <div className="mt-6 rounded-xl border border-[#c7ff43]/25 bg-[#0d110e] p-5"><p className="mb-3 font-mono text-[10px] uppercase tracking-[.18em] text-[#c7ff43]">DevMavox AI response</p><div className="whitespace-pre-wrap text-sm leading-7 text-white/80">{answer}</div></div>}
              </div>
              <aside className="space-y-3">
                <div className="rounded-2xl border border-[#c7ff43]/25 bg-[#c7ff43]/[.05] p-5"><p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#d5ff79]">Free local CPU AI status</p><p className="mt-3 text-lg font-bold">{modelStatus === "ready" ? "AI model ready on this device" : modelStatus === "loading" ? "Preparing the AI model…" : modelStatus === "unsupported" ? "Browser AI unavailable" : "Free Qwen 0.5B AI · not loaded yet"}</p><p className="mt-2 text-xs leading-5 text-white/50">No student login, ChatGPT account, Copilot login, API key or server AI subscription is used. First use downloads a compact Qwen2.5 0.5B model and the public DevMavox Q&A reference library. It runs through WebAssembly on the device CPU, so a dedicated GPU and WebGPU are not required. First download may take time and generation can be slower on low-memory or older devices. Answers are generated locally and are not ChatGPT-level guaranteed.</p>{modelProgress && <p className="mt-3 text-[11px] leading-5 text-[#d5ff79]">{modelProgress}</p>}</div>
                <div className="rounded-2xl border border-white/10 bg-[#1a201b] p-5"><p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#c7ff43]">Safe-use checklist</p><ul className="mt-3 space-y-2 text-xs leading-5 text-white/55"><li>• Remove passwords and tokens</li><li>• Redact customer data</li><li>• Verify commands before execution</li><li>• Require human approval for production changes</li></ul></div>
              </aside>
            </section>
          </>
        )}
        <footer className="mt-14 border-t border-white/10 pt-5 text-[10px] tracking-wide text-white/30">DEVMAVOX / DEVOPS AI ASSISTANT · Human-reviewed operations only</footer>
      </div>
    </main>
  );
}
