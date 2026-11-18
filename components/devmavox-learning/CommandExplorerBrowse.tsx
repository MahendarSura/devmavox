import Link from "next/link";
import { featureCatalog, type FeatureCategory, type FeatureSubcategory } from "./feature-catalog";

function slug(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function Shell({ children, eyebrow, title, description }: { children: React.ReactNode; eyebrow: string; title: string; description: string }) {
  return <main className="min-h-screen bg-[#070d16] text-slate-100"><div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><Link href="/command-explorer" className="text-sm text-slate-400 hover:text-white">← Command Explorer</Link><span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-emerald-200">DevOps command workbench</span></div>
    <header className="mb-5 rounded-2xl border border-slate-800 bg-gradient-to-br from-[#132432] via-[#101d2a] to-[#0b1420] p-5 sm:p-7"><p className="font-mono text-[11px] font-bold uppercase tracking-[.22em] text-emerald-300">{eyebrow}</p><h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{description}</p></header>
    {children}<footer className="mt-8 border-t border-slate-800 pt-4 text-[11px] text-slate-500">DevMavox · Command reference and safe practice workspace</footer>
  </div></main>;
}

export default function CommandExplorerBrowse({ category, subcategory }: { category: string; subcategory?: string }) {
  const categories = featureCatalog["command-explorer"].categories;
  const selectedCategory = categories.find((item: FeatureCategory) => item.name === category);
  if (!selectedCategory) return <Shell eyebrow="Command library" title="Category not found" description="Return to the command library and select a technology."><Link className="text-emerald-300" href="/command-explorer">Back to Command Explorer</Link></Shell>;
  const selectedSubcategory = subcategory ? selectedCategory.subcategories.find((item: FeatureSubcategory) => item.name === subcategory) : undefined;
  if (subcategory && !selectedSubcategory) return <Shell eyebrow={selectedCategory.name} title="Command group not found" description="Choose a valid command group."><Link className="text-emerald-300" href={`/command-explorer/${slug(selectedCategory.name)}`}>Back to {selectedCategory.name}</Link></Shell>;

  return <Shell eyebrow={subcategory ? selectedCategory.name + " / Command group" : "Technology library"} title={subcategory || selectedCategory.name} description={subcategory ? `Operational commands and task-focused references in ${subcategory}. Select a topic to open its complete command workbench.` : `Browse ${selectedCategory.subcategories.length} operational command groups and ${selectedCategory.subcategories.reduce((n, item) => n + item.topics.length, 0)} topics in ${selectedCategory.name}. Choose a group to find the exact task or incident workflow.`}>
    <div className="grid items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="rounded-2xl border border-slate-800 bg-[#101a26] p-4 lg:sticky lg:top-5"><h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-slate-300">Technology library</h2><nav className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">{categories.map((item: FeatureCategory) => <Link key={item.name} href={`/command-explorer/${slug(item.name)}`} className={`rounded-lg px-3 py-2 text-xs transition ${item.name === selectedCategory.name ? "bg-emerald-400/15 text-emerald-200" : "bg-[#182635] text-slate-300 hover:bg-[#26394b]"}`}>{item.name}</Link>)}</nav></aside>
      <section className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-emerald-300">{subcategory ? "Select an operational topic" : "Browse command groups"}</p><h2 className="mt-1 text-lg font-bold text-white">{subcategory ? selectedSubcategory!.topics.length + " topics" : selectedCategory.subcategories.length + " command groups"}</h2></div><Link href="/command-explorer" className="text-xs text-emerald-300 hover:text-white">All technologies →</Link></div>
        {subcategory ? <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{selectedSubcategory!.topics.map((topic, index) => <Link key={topic} href={`/command-explorer/${slug(selectedCategory.name)}/${slug(selectedSubcategory!.name)}/${slug(topic)}`} className="group rounded-xl border border-slate-800 bg-[#111d2a] p-4 transition hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-[#142535]"><div className="mb-3 flex items-center justify-between"><span className="font-mono text-[10px] text-emerald-300">TOPIC {String(index + 1).padStart(2, "0")}</span><span className="text-xs text-slate-500">Open ↗</span></div><h3 className="text-sm font-semibold text-slate-100 group-hover:text-emerald-200">{topic}</h3><p className="mt-3 text-[11px] text-slate-500">Command builder · sample output · safe practice</p></Link>)}</div> : <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{selectedCategory.subcategories.map((group: FeatureSubcategory, index: number) => <Link key={group.name} href={`/command-explorer/${slug(selectedCategory.name)}/${slug(group.name)}`} className="group rounded-xl border border-slate-800 bg-[#111d2a] p-4 transition hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-[#142535]"><div className="mb-3 flex items-center justify-between"><span className="font-mono text-[10px] text-emerald-300">GROUP {String(index + 1).padStart(2, "0")}</span><span className="rounded-md bg-slate-800 px-2 py-1 text-[10px] text-slate-300">{group.topics.length} topics</span></div><h3 className="text-sm font-semibold text-slate-100 group-hover:text-emerald-200">{group.name}</h3><p className="mt-3 text-xs text-emerald-300">Explore operational topics →</p></Link>)}</div>}
      </section>
    </div>
  </Shell>;
}
