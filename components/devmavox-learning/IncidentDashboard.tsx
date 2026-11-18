"use client";

import Link from "next/link";
import type { FeatureDefinition } from "./feature-catalog";

const workflow = [
  ["Detect", "Identify user impact from alerts and monitoring."],
  ["Triage", "Scope affected services and assign severity."],
  ["Investigate", "Collect logs, events, metrics and change evidence."],
  ["Mitigate", "Choose the narrowest safe recovery action."],
  ["Verify", "Retest the user journey and observe stability."],
  ["RCA", "Document timeline, cause and prevention owners."],
];

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function IncidentDashboard({ feature }: { feature: FeatureDefinition }) {
  const totalTopics = feature.categories.reduce((sum, category) => sum + category.subcategories.reduce((n, group) => n + group.topics.length, 0), 0);
  const totalGroups = feature.categories.reduce((sum, category) => sum + category.subcategories.length, 0);

  return (
    <main className="min-h-screen bg-[#080d18] text-slate-100">
      <div className="mx-auto max-w-[1800px]">
<section className="min-w-0 p-4 sm:p-6 lg:p-8">
          <header className="relative overflow-hidden rounded-3xl border border-rose-500/25 bg-gradient-to-br from-[#171a2c] via-[#111b2d] to-[#0b1220] p-6 sm:p-9">
            <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-rose-300"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" /> Incident operations workspace <span className="text-slate-600">/</span> Training mode</div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">Incident Response Center</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Practice real-world production incident response across infrastructure, cloud, applications, data platforms and observability. Follow evidence-led investigation and safe recovery workflows.</p>
              <div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-200">12 incident domains</span><span className="rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1.5 text-xs text-slate-300">Guided response workflow</span><span className="rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1.5 text-xs text-slate-300">Hands-on simulated labs</span></div>
            </div>
          </header>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[[String(feature.categories.length), "Incident domains"],[String(totalTopics), "Incident scenarios"],[String(totalGroups), "Incident groups"],["06", "Response workflow stages"]].map(([value,label], index) => <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4"><p className={`text-2xl font-black ${index === 0 ? "text-rose-300" : "text-white"}`}>{value}</p><p className="mt-1 text-xs text-slate-400">{label}</p></div>)}
          </div>

          <div className="mt-7 grid gap-5 2xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-rose-300">Choose an incident domain</p><h2 className="mt-1 text-xl font-bold text-white">Incident groups</h2></div><p className="text-xs text-slate-500">Select a category to open its response workspace</p></div>
              <div className="grid gap-3 md:grid-cols-2">
                {feature.categories.map((category, index) => {
                  const count = category.subcategories.reduce((n, group) => n + group.topics.length, 0);
                  return <Link key={category.name} href={`/${feature.id}/${slugify(category.name)}`} className="group rounded-xl border border-slate-700 bg-[#111b2d] p-4 transition hover:-translate-y-0.5 hover:border-rose-400/50 hover:bg-[#16243b]">
                    <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 font-mono text-sm font-black text-rose-300">{String(index + 1).padStart(2, "0")}</span><div><h3 className="font-bold text-white group-hover:text-rose-200">{category.name}</h3><p className="mt-1 text-[11px] text-slate-400">{category.subcategories.length} incident groups</p></div></div><span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] text-slate-300">{count} scenarios</span></div>
                    <div className="mt-4 flex flex-wrap gap-1.5">{category.subcategories.slice(0, 3).map(group => <span key={group.name} className="rounded-md border border-slate-700/80 bg-slate-950/40 px-2 py-1 text-[10px] text-slate-400">{group.name}</span>)}{category.subcategories.length > 3 && <span className="px-1 py-1 text-[10px] text-slate-500">+{category.subcategories.length - 3} more</span>}</div>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-700/70 pt-3 text-xs"><span className="text-slate-500">Open response area</span><span className="font-bold text-rose-300">Explore →</span></div>
                  </Link>;
                })}
              </div>
            </div>
            <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900/80 p-5 2xl:sticky 2xl:top-6">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-amber-300">Operational playbook</p><h2 className="mt-2 font-bold text-white">Response Workflow</h2>
              <ol className="mt-5 space-y-4">{workflow.map(([name, detail], index) => <li key={name} className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-400/40 bg-blue-600/20 text-xs font-bold text-blue-200">{index + 1}</span><div><p className="text-sm font-bold text-white">{name}</p><p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p></div></li>)}</ol>
              <div className="mt-5 rounded-xl border border-lime-500/20 bg-lime-500/10 p-3 text-xs leading-5 text-lime-200">✓ Isolated simulation · No production changes</div>
            </aside>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-4 text-xs text-slate-300"><strong className="text-amber-300">Practice capabilities</strong><span>› Terminal evidence</span><span>▥ Root-cause analysis</span><span>↶ Rollback decisions</span><span>▣ Incident communication</span></div>
          <footer className="mt-8 border-t border-slate-800 pt-5 text-xs text-slate-500">DevMavox · Practical DevOps Learning</footer>
        </section>
      </div>
    </main>
  );
}
