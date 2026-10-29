import Link from "next/link";

const stages = [
  { title: "1. Source Control", tasks: ["Commit code with meaningful messages", "Review pull requests", "Protect the main branch"] },
  { title: "2. CI Pipeline", tasks: ["Install pinned dependencies", "Run linting and tests", "Build and scan the artifact"] },
  { title: "3. Release & Deploy", tasks: ["Publish a versioned image", "Deploy to a test environment", "Verify health checks before promotion"] },
  { title: "4. Monitor & Recover", tasks: ["Check logs, metrics and alerts", "Verify application health after release", "Use a tested rollback plan when needed"] },
];

export default function RealTimeProjectsPage() {
  return <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8"><div className="mx-auto max-w-5xl"><Link href="/notes-cheat-sheets" className="text-sm text-cyan-300 hover:underline">← All Notes & Cheat Sheets</Link><p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">Project Playbooks</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">Real-Time Project Notes</h1><p className="mt-3 text-slate-400">A practical checklist for delivering and operating a DevOps project.</p><div className="mt-8 grid gap-5 md:grid-cols-2">{stages.map((s) => <article key={s.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><h2 className="text-xl font-bold">{s.title}</h2><ul className="mt-4 space-y-3">{s.tasks.map((t) => <li key={t} className="flex gap-3 text-sm text-slate-300"><span className="text-cyan-300">✓</span><span>{t}</span></li>)}</ul></article>)}</div><p className="mt-6 text-sm text-amber-300">Use environment-specific approvals, secrets management and rollback procedures for production deployments.</p></div></main>;
}
