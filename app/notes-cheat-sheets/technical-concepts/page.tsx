import Link from "next/link";

const concepts = [
  { title: "How It Works", text: "Learn how common DevOps tools and workflows operate, step by step.", examples: ["CI/CD pipeline stages", "Docker image and container lifecycle", "Kubernetes deployment flow"] },
  { title: "Architecture & Flow", text: "Understand how components connect and how requests or deployments move through a system.", examples: ["Developer → Git → CI pipeline → Registry → Deployment", "Load balancer → Application → Database", "Monitoring → Alerting → Incident response"] },
  { title: "Real-Time Examples", text: "Connect DevOps concepts to practical scenarios encountered in projects.", examples: ["Deploying a web application", "Scaling an application in Kubernetes", "Investigating a failed production deployment"] },
];

export default function TechnicalConceptsPage() {
  return <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8"><div className="mx-auto max-w-5xl"><Link href="/notes-cheat-sheets" className="text-sm text-cyan-300 hover:underline">← All Notes & Cheat Sheets</Link><p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">Learning Notes</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">Technical Concepts</h1><p className="mt-3 text-slate-400">Understand the why, how and practical use of DevOps technologies.</p><div className="mt-8 grid gap-5 md:grid-cols-2">{concepts.map((c) => <article key={c.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-xl font-bold text-cyan-200">{c.title}</h2><p className="mt-3 text-sm leading-6 text-slate-300">{c.text}</p><ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-400">{c.examples.map((e) => <li key={e}>{e}</li>)}</ul></article>)}</div></div></main>;
}
