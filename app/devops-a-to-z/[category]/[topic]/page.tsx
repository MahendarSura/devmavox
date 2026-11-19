import Link from "next/link";
import { notFound } from "next/navigation";
import { findAtoZCategory, findAtoZTopic, slugifyAtoZ } from "../../data";

export default async function DevOpsAtoZTopicPage({ params }: { params: Promise<{ category: string; topic: string }> }) {
  const { category: categorySlug, topic: topicSlug } = await params;
  const category = findAtoZCategory(categorySlug);
  const topic = findAtoZTopic(categorySlug, topicSlug);
  if (!category || !topic) notFound();
  const currentIndex = category.topics.findIndex((item) => slugifyAtoZ(item) === topicSlug);
  const previous = currentIndex > 0 ? category.topics[currentIndex - 1] : undefined;
  const next = currentIndex < category.topics.length - 1 ? category.topics[currentIndex + 1] : undefined;
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-slate-100 sm:px-8">
      <article className="mx-auto max-w-4xl">
        <Link href="/devops-a-to-z" className="inline-flex text-sm font-semibold text-cyan-400 hover:text-cyan-300">← Back to DevOps A–Z – Detailed Telugu Explanation</Link>
        <div className="mt-7 rounded-3xl border border-slate-800 bg-slate-900 p-7 sm:p-10">
          <Link href={`/devops-a-to-z/${category.slug}`} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">← Back to {category.name} topics</Link>
          <p className="mt-7 text-sm font-bold uppercase tracking-widest text-cyan-400">{category.name} · Topic {currentIndex + 1} of {category.topics.length}</p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">{topic}</h1>
          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
            <h2 className="font-bold text-amber-200">Detailed Telugu lesson – content phase pending</h2>
            <p className="mt-2 leading-7 text-slate-300">ఈ topic కోసం detailed Telugu explanation ఇంకా add చేయలేదు. Navigation మరియు topic structure సిద్ధంగా ఉన్నాయి. Next content phaseలో beginner-friendly explanation, technical definition, step-by-step working, diagrams, real-time DevOps examples, commands, expected output, troubleshooting, best practices, hands-on tasks మరియు interview questions add చేయవచ్చు.</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {previous ? <Link href={`/devops-a-to-z/${category.slug}/${slugifyAtoZ(previous)}`} className="rounded-xl border border-slate-700 p-4 hover:border-cyan-500"><span className="block text-xs text-slate-500">Previous topic</span><span className="mt-1 block font-semibold text-slate-200">← {previous}</span></Link> : <div />}
            {next ? <Link href={`/devops-a-to-z/${category.slug}/${slugifyAtoZ(next)}`} className="rounded-xl border border-slate-700 p-4 text-right hover:border-cyan-500"><span className="block text-xs text-slate-500">Next topic</span><span className="mt-1 block font-semibold text-slate-200">{next} →</span></Link> : <div />}
          </div>
          <div className="mt-8 border-t border-slate-800 pt-6"><Link href="/devops-a-to-z" className="font-semibold text-cyan-400 hover:text-cyan-300">← Back to DevOps A–Z – Detailed Telugu Explanation</Link></div>
        </div>
      </article>
    </main>
  );
}
