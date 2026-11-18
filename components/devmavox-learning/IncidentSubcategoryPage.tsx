"use client";

import Link from "next/link";
import type { FeatureCategory, FeatureDefinition, FeatureSubcategory } from "./feature-catalog";

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\\u0300-\\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function IncidentSubcategoryPage({ feature, category, subcategory }: { feature: FeatureDefinition; category: FeatureCategory; subcategory: FeatureSubcategory }) {
  const categorySlug = slugify(category.name);
  const subcategorySlug = slugify(subcategory.name);
  return <main className="min-h-screen bg-[#080d18] px-4 py-7 text-slate-100 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
    <Link href={`/${feature.id}/${categorySlug}`} className="text-sm text-slate-400 hover:text-white">← {category.name}</Link>
    <header className="mt-5 mb-7 rounded-3xl border border-blue-500/25 bg-gradient-to-br from-slate-900 via-[#111d32] to-[#0b1220] p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-blue-300">Incident group · Guided response scenarios</p><h1 className="mt-3 text-3xl font-black text-white">{subcategory.name}</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Select an incident scenario to investigate symptoms, gather command evidence, test root-cause hypotheses, recover safely and document the incident.</p><div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full border border-slate-700 bg-slate-950/50 px-3 py-1.5 text-xs text-slate-300">{subcategory.topics.length} scenarios</span><span className="rounded-full border border-lime-500/20 bg-lime-500/5 px-3 py-1.5 text-xs text-lime-200">Safe simulated practice</span></div></header>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{subcategory.topics.map((topic,index)=><Link key={topic} href={`/${feature.id}/${categorySlug}/${subcategorySlug}/${slugify(topic)}`} className="group rounded-xl border border-slate-700 bg-[#111b2d] p-5 transition hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-[#16243b]"><div className="flex items-center justify-between"><span className="rounded-lg bg-blue-500/10 px-3 py-2 font-mono text-xs font-bold text-blue-200">INC-{String(index+1).padStart(2,"0")}</span><span className="text-xs text-slate-500">Scenario</span></div><h2 className="mt-4 font-bold text-white group-hover:text-blue-200">{topic}</h2><p className="mt-2 text-xs leading-5 text-slate-400">Open guided investigation, recovery and RCA lab.</p><div className="mt-4 border-t border-slate-700 pt-3 text-xs font-bold text-blue-300">Open incident lab →</div></Link>)}</div>
    <div className="mt-7 rounded-xl border border-lime-500/20 bg-lime-500/5 p-4 text-xs leading-6 text-lime-100">Safety notice: reproduce failures only in an isolated disposable lab with synthetic data. Do not run fault-injection steps against production systems.</div>
  </div></main>;
}
