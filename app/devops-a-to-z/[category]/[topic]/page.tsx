import Link from "next/link";
import { notFound } from "next/navigation";
import { findAtoZCategory, findAtoZTopic, slugifyAtoZ } from "../../data";
import { atoZLessons } from "../../lessons";

function ArchitectureDiagram({ diagram, topic }: { diagram?: { title: string; nodes: string[]; explanation: string }; topic: string }) {
  if (!diagram) return <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-sm leading-6 text-amber-100">Topic-specific architecture diagram is pending for this lesson; generic diagrams are not shown as a substitute.</div>;
  return <figure className="mt-6 rounded-2xl border border-cyan-500/20 bg-slate-950 p-5">
    <figcaption className="mb-4 text-sm font-bold uppercase tracking-wider text-cyan-300">{diagram.title}</figcaption>
    <div className="mx-auto max-w-2xl space-y-2">
      {diagram.nodes.map((node, index) => <div key={node} className="flex flex-col items-center">
        <div className="w-full rounded-xl border border-cyan-500/30 bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-slate-100">{node}</div>
        {index < diagram.nodes.length - 1 && <span className="py-1 text-cyan-400" aria-hidden="true">↓</span>}
      </div>)}
    </div>
    <p className="mt-4 text-sm leading-7 text-slate-300">{diagram.explanation}</p>
    <p className="mt-2 text-xs text-slate-500">Topic-specific architecture / workflow for {topic}.</p>
  </figure>;
}

export default async function DevOpsAtoZTopicPage({ params }: { params: Promise<{ category: string; topic: string }> }) {
  const { category: categorySlug, topic: topicSlug } = await params;
  const category = findAtoZCategory(categorySlug);
  const topic = findAtoZTopic(categorySlug, topicSlug);
  if (!category || !topic) notFound();
  const currentIndex = category.topics.findIndex((item) => slugifyAtoZ(item) === topicSlug);
  const previous = currentIndex > 0 ? category.topics[currentIndex - 1] : undefined;
  const next = currentIndex < category.topics.length - 1 ? category.topics[currentIndex + 1] : undefined;
  const lesson = atoZLessons[`${category.slug}/${topicSlug}`];
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-slate-100 sm:px-8">
      <article className="mx-auto max-w-4xl">
        <Link href="/devops-a-to-z" className="inline-flex text-sm font-semibold text-cyan-400 hover:text-cyan-300">← Back to DevOps A–Z – Detailed Telugu Explanation</Link>
        <div className="mt-7 rounded-3xl border border-slate-800 bg-slate-900 p-7 sm:p-10">
          <Link href={`/devops-a-to-z/${category.slug}`} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">← Back to {category.name} topics</Link>
          <p className="mt-7 text-sm font-bold uppercase tracking-widest text-cyan-400">{category.name} · Topic {currentIndex + 1} of {category.topics.length}</p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">{topic}</h1>
          {lesson ? <>
            <p className="mt-5 text-base leading-8 text-slate-300">{lesson.summary}</p>
            <ArchitectureDiagram diagram={lesson.diagram} topic={topic} />
            {lesson.sections.map((section, index) => <section key={section.heading} className="mt-9">
              <h2 className="text-xl font-extrabold text-cyan-300">{section.heading}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex} className="mt-3 leading-8 text-slate-300">{paragraph}</p>)}
              {section.bullets && <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-slate-300">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {section.code && <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-emerald-200"><code>{section.code}</code></pre>}
              {section.note && <p className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-6 text-amber-100">Important: {section.note}</p>}
            </section>)}
            <section className="mt-10 rounded-2xl border border-slate-700 bg-slate-950 p-5">
              <h2 className="text-xl font-extrabold text-cyan-300">Interview questions and answers</h2>
              {lesson.interview.map((item, index) => <div key={item.question} className="mt-5">
                <h3 className="font-bold text-slate-100">{index + 1}. {item.question}</h3>
                <p className="mt-2 leading-7 text-slate-300">{item.answer}</p>
              </div>)}
            </section>
            <section className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <h2 className="text-xl font-extrabold text-emerald-300">Hands-on practice tasks</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7 text-slate-200">{lesson.handsOn.map((task) => <li key={task}>{task}</li>)}</ol>
            </section>
          </> : <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
            <h2 className="font-bold text-amber-200">Detailed lesson content pending</h2>
            <p className="mt-2 leading-7 text-slate-300">Ee topic ki full lesson content next content batch lo add cheyyali. Complete lesson lo topic-specific definition, why and when to use, where it is used, architecture diagram, step-by-step workflow, real-time DevOps example, practical commands/configuration, expected output, advantages, limitations, comparison, interview Q&A and hands-on tasks untayi. Placeholder ni complete lesson ga consider cheyyakandi.</p>
          </div>}
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
