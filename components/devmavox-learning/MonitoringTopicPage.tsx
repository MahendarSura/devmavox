"use client";

import Link from "next/link";
import { useState } from "react";
import type { MonitoringLesson } from "./monitoring-topic-content";

type Props = {
  lesson: MonitoringLesson;
  featureId: string;
  categoryName: string;
  subcategoryName: string;
  categorySlug: string;
  subcategorySlug: string;
};

export default function MonitoringTopicPage({ lesson, featureId, categoryName, subcategoryName, categorySlug, subcategorySlug }: Props) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<number[]>([]);
  const toggle = (step: string) => setCompleted((current) => current.includes(step) ? current.filter((item) => item !== step) : [...current, step]);
  const progress = Math.round((completed.length / Math.max(lesson.lab.length, 1)) * 100);

  return (
    <main className="min-h-screen bg-[#090b13] px-4 py-7 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link href={`/${featureId}`} className="text-sm text-slate-400 hover:text-white">← Monitoring Playground</Link>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">Topic learning workspace</span>
        </div>
        <nav className="mb-5 flex flex-wrap gap-2 text-xs text-slate-400">
          <Link href={`/${featureId}/${categorySlug}`} className="hover:text-white">{categoryName}</Link><span>/</span>
          <Link href={`/${featureId}/${categorySlug}/${subcategorySlug}`} className="hover:text-white">{subcategoryName}</Link><span>/</span>
          <span className="text-slate-200">{lesson.title}</span>
        </nav>
        <header className="relative overflow-hidden rounded-3xl border border-orange-400/25 bg-gradient-to-br from-[#351328] via-[#17132d] to-[#082b2a] p-6 sm:p-9">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <p className="relative text-xs font-bold uppercase tracking-[.25em] text-orange-300">{categoryName} · {subcategoryName}</p>
          <h1 className="relative mt-3 text-3xl font-black text-white sm:text-4xl">{lesson.title}</h1>
          <p className="relative mt-4 max-w-3xl text-sm leading-7 text-slate-300">{lesson.purpose}</p>
          <div className="relative mt-6 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-fuchsia-400/15 px-3 py-2 text-fuchsia-200">Concepts</span>
            <span className="rounded-full bg-emerald-400/15 px-3 py-2 text-emerald-200">Commands</span>
            <span className="rounded-full bg-amber-400/15 px-3 py-2 text-amber-200">Hands-on lab</span>
            <span className="rounded-full bg-pink-400/15 px-3 py-2 text-pink-200">Production scenario</span>
          </div>
        </header>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
          <article className="rounded-2xl border border-fuchsia-400/20 bg-slate-900/70 p-5 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-fuchsia-300">01 · Learn the concepts</p>
            <h2 className="mt-2 text-xl font-bold text-white">How it works</h2>
            <div className="mt-5 space-y-4">
              {lesson.explanation.map((paragraph, index) => <div key={index} className="flex gap-3"><span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fuchsia-400/10 text-xs font-bold text-fuchsia-200">{index + 1}</span><p className="text-sm leading-7 text-slate-300">{paragraph}</p></div>)}
            </div>
          </article>
          <aside className="rounded-2xl border border-teal-400/20 bg-gradient-to-br from-teal-950/50 to-slate-950 p-5">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-teal-300">Learning progress</p>
            <p className="mt-3 text-4xl font-black text-white">{progress}%</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-lime-400 to-teal-400 transition-all" style={{ width: `${progress}%` }} /></div>
            <p className="mt-3 text-xs text-slate-400">{completed.length} of {lesson.lab.length} lab steps completed on this page.</p>
            <div className="mt-6 border-t border-white/10 pt-4"><p className="text-xs font-bold text-teal-200">Production mindset</p><p className="mt-2 text-sm leading-6 text-slate-300">Use a test environment, validate each change, preserve evidence and never expose monitoring endpoints or credentials publicly.</p></div>
          </aside>
        </section>

        <section className="mt-5 rounded-2xl border border-emerald-400/20 bg-slate-900/70 p-5 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">02 · Commands and queries</p>
          <h2 className="mt-2 text-xl font-bold text-white">Practical command reference</h2>
          <div className="mt-5 grid gap-4">
            {lesson.commands.map((command, index) => <div key={command.label} className="overflow-hidden rounded-xl border border-white/10 bg-[#070d16]">
              <div className="border-b border-white/10 px-4 py-3 text-sm font-semibold text-emerald-200">{index + 1}. {command.label}</div>
              <pre className="overflow-x-auto p-4 text-xs leading-6 text-lime-200"><code>{command.code}</code></pre>
              <p className="border-t border-white/10 px-4 py-3 text-xs leading-6 text-slate-400"><span className="font-bold text-slate-200">Expected:</span> {command.expected}</p>
            </div>)}
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-amber-400/20 bg-slate-900/70 p-5 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-300">03 · Hands-on practice</p><h2 className="mt-2 text-xl font-bold text-white">Guided lab</h2></div>
            <span className="rounded-full bg-amber-400/10 px-3 py-2 text-xs text-amber-200">{completed.length}/{lesson.lab.length} complete</span>
          </div>
          <div className="mt-5 space-y-3">
            {lesson.lab.map((item, index) => <label key={item.step} className="flex cursor-pointer gap-3 rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-amber-400/30">
              <input type="checkbox" checked={completed.includes(item.step)} onChange={() => toggle(item.step)} className="mt-1 h-4 w-4 accent-amber-400" />
              <span className="min-w-0"><span className="block text-sm font-bold text-white">{index + 1}. {item.step}</span><span className="mt-2 block text-sm leading-6 text-slate-300">{item.action}</span><span className="mt-2 block text-xs leading-6 text-emerald-200"><strong>Verify:</strong> {item.verify}</span></span>
            </label>)}
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-rose-400/20 bg-gradient-to-br from-rose-950/30 to-slate-950 p-5 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-rose-300">04 · Production application</p>
          <h2 className="mt-2 text-xl font-bold text-white">Real-world scenario</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">{lesson.productionScenario}</p>
        </section>

        <section className="mt-5 rounded-2xl border border-violet-400/20 bg-slate-900/70 p-5 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-violet-300">05 · Troubleshooting</p>
          <h2 className="mt-2 text-xl font-bold text-white">Common failures and recovery</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {lesson.failureModes.map((failure) => <article key={failure.symptom} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="font-bold text-rose-200">{failure.symptom}</h3>
              <p className="mt-3 text-xs leading-6 text-slate-400"><strong className="text-slate-200">Investigate:</strong> {failure.checks}</p>
              <p className="mt-2 text-xs leading-6 text-emerald-200"><strong>Recovery:</strong> {failure.fix}</p>
            </article>)}
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-pink-400/20 bg-slate-900/70 p-5 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-pink-300">06 · Knowledge check</p>
          <h2 className="mt-2 text-xl font-bold text-white">Check your understanding</h2>
          <div className="mt-5 space-y-3">
            {lesson.knowledgeCheck.map((item, index) => <div key={item.question} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-semibold text-white">{index + 1}. {item.question}</p>
              <button type="button" onClick={() => setRevealed((current) => current.includes(index) ? current.filter((value) => value !== index) : [...current, index])} className="mt-3 text-xs font-bold text-pink-300 hover:text-pink-200">{revealed.includes(index) ? "Hide answer ↑" : "Reveal answer ↓"}</button>
              {revealed.includes(index) && <p className="mt-3 rounded-lg bg-emerald-400/10 p-3 text-sm leading-6 text-emerald-100">{item.answer}</p>}
            </div>)}
          </div>
        </section>

        <footer className="mt-8 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-sm">
          <Link href={`/${featureId}/${categorySlug}/${subcategorySlug}`} className="text-slate-400 hover:text-white">← Back to {subcategoryName}</Link>
          <Link href={`/${featureId}/${categorySlug}`} className="font-semibold text-emerald-300 hover:text-emerald-200">Explore {categoryName} →</Link>
        </footer>
      </div>
    </main>
  );
}
