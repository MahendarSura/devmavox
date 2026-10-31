import Link from "next/link";

const topics = [
  { title: "Error Messages", slug: "error-messages" },
  { title: "Root Causes", slug: "root-causes" },
  { title: "Troubleshooting Steps", slug: "troubleshooting-steps" },
];

export default function TroubleshootingPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/notes-cheat-sheets" className="text-sm text-cyan-300 hover:underline">← All Notes & Cheat Sheets</Link>
        <p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">Learning Notes</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Troubleshooting Notes</h1>
        <p className="mt-3 text-slate-400">Common DevOps errors, diagnostic commands, root causes and step-by-step fixes.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <Link key={topic.slug} href={`/notes-cheat-sheets/troubleshooting/${topic.slug}`}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5 text-lg font-semibold text-cyan-200 hover:border-cyan-500 hover:bg-slate-800">
              {topic.title} →
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
