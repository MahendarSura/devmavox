import Link from "next/link";

const revisions = [
  { title: "CI vs CD", text: "Continuous Integration frequently merges and tests code. Continuous Delivery keeps changes ready for release; Continuous Deployment automatically releases validated changes." },
  { title: "Image vs Container", text: "A Docker image is a packaged, versioned template. A container is a running or stopped instance created from an image." },
  { title: "Deployment vs StatefulSet", text: "A Kubernetes Deployment suits interchangeable replicas of stateless applications. A StatefulSet provides stable identities and ordered behavior for stateful workloads." },
  { title: "Readiness vs Liveness probe", text: "Readiness controls whether a Pod should receive traffic. Liveness helps Kubernetes decide whether to restart a container." },
  { title: "Rolling vs Canary deployment", text: "Rolling updates gradually replace old instances. Canary releases expose a new version to a limited portion of traffic before broader rollout." },
];

export default function InterviewRevisionPage() {
  return <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8"><div className="mx-auto max-w-5xl"><Link href="/notes-cheat-sheets" className="text-sm text-cyan-300 hover:underline">← All Notes & Cheat Sheets</Link><p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">Quick Revision</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">Interview & Quick Revision Notes</h1><p className="mt-3 text-slate-400">Short explanations and comparisons for quick review. Interview question banks remain separate.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{revisions.map((r) => <article key={r.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><h2 className="text-lg font-bold text-cyan-200">{r.title}</h2><p className="mt-3 text-sm leading-6 text-slate-300">{r.text}</p></article>)}</div></div></main>;
}
