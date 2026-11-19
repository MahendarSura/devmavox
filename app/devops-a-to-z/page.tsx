import Link from "next/link";
import { devOpsAtoZCategories } from "./data";

export default function DevOpsAtoZPage() {
  const totalTopics = devOpsAtoZCategories.reduce((total, category) => total + category.topics.length, 0);
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300">← Back to Home</Link>
        <header className="mb-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-7 sm:p-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">DevMavox Knowledge Library</p>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">DevOps A–Z – Detailed Telugu Explanation</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">DevOps tools and concepts arranged category-wise. Choose a category, then open any subtopic. Detailed Telugu-first lessons will be added in the next content phase.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-cyan-200">{devOpsAtoZCategories.length} categories</span>
            <span className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-slate-200">{totalTopics} subtopics</span>
            <span className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-slate-200">Beginner-friendly learning structure</span>
          </div>
        </header>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div><h2 className="text-2xl font-bold">Explore all categories</h2><p className="mt-1 text-sm text-slate-400">Select a tool or subject to see its complete topic list.</p></div>
          <span className="text-sm text-slate-500">A–Z Learning Index</span>
        </div>
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {devOpsAtoZCategories.map((category, index) => (
            <Link key={category.slug} href={`/devops-a-to-z/${category.slug}`} className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-500/60 hover:bg-slate-900">
              <div className="flex items-start justify-between"><span className="text-4xl">{category.icon}</span><span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span></div>
              <h2 className="mt-5 text-xl font-bold group-hover:text-cyan-300">{category.name}</h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{category.description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-sm"><span className="text-slate-400">{category.topics.length} subtopics</span><span className="font-bold text-cyan-400">Explore topics →</span></div>
            </Link>
          ))}
        </section>
        <footer className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">DevMavox · DevOps A–Z Telugu Learning Library</footer>
      </div>
    </main>
  );
}
