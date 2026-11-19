import Link from "next/link";
import { notFound } from "next/navigation";
import { findAtoZCategory, slugifyAtoZ } from "../data";

export default async function DevOpsAtoZCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = findAtoZCategory(categorySlug);
  if (!category) notFound();
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/devops-a-to-z" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300">← Back to DevOps A–Z – Detailed Telugu Explanation</Link>
        <header className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-7 sm:p-9">
          <div className="text-5xl">{category.icon}</div><p className="mt-5 text-sm font-bold uppercase tracking-widest text-cyan-400">Category learning path</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">{category.name}</h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-400">{category.description}</p>
          <p className="mt-5 text-sm text-slate-300">{category.topics.length} subtopics available</p>
        </header>
        <h2 className="mb-5 text-2xl font-bold">All {category.name} subtopics</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {category.topics.map((topic, index) => (
            <Link key={topic} href={`/devops-a-to-z/${category.slug}/${slugifyAtoZ(topic)}`} className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4 transition hover:border-cyan-500/60 hover:bg-slate-900">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-cyan-300">{String(index + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-semibold text-slate-200 group-hover:text-cyan-300">{topic}</span><span className="text-cyan-400">→</span>
            </Link>
          ))}
        </div>
        <div className="mt-10"><Link href="/devops-a-to-z" className="inline-flex rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-cyan-300 hover:border-cyan-500">← Back to DevOps A–Z – Detailed Telugu Explanation</Link></div>
      </div>
    </main>
  );
}
