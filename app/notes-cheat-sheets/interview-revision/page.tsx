import Link from "next/link";

const topics = [
  { title: "Interview Q&A", slug: "interview-qa" },
  { title: "Quick Revision", slug: "quick-revision" },
  { title: "Important Comparisons", slug: "important-comparisons" },
];

export default function InterviewRevisionPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/notes-cheat-sheets" className="text-sm text-cyan-300 hover:underline">← All Notes & Cheat Sheets</Link>
        <p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">Learning Notes</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Interview & Quick Revision Notes</h1>
        <p className="mt-3 text-slate-400">Interview questions, key terms, comparisons and production scenarios.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <Link key={topic.slug} href={`/notes-cheat-sheets/interview-revision/${topic.slug}`}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5 text-lg font-semibold text-cyan-200 hover:border-cyan-500 hover:bg-slate-800">
              {topic.title} →
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
