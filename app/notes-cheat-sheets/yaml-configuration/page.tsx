import Link from "next/link";

const examples = [
  { title: "Kubernetes Pod YAML", code: "apiVersion: v1\nkind: Pod\nmetadata:\n  name: demo-pod\nspec:\n  containers:\n    - name: nginx\n      image: nginx:stable", note: "Defines a Pod and the container image it runs. Review resource limits and security settings before production use." },
  { title: "Docker Compose", code: "services:\n  web:\n    image: nginx:stable\n    ports:\n      - \"8080:80\"", note: "Defines a service and maps host port 8080 to container port 80." },
  { title: "GitHub Actions workflow", code: "name: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo \"Add your test command\"", note: "A basic CI workflow trigger and job. Replace the example step with your actual build and test commands." },
];

export default function YAMLConfigurationPage() {
  return <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8"><div className="mx-auto max-w-5xl"><Link href="/notes-cheat-sheets" className="text-sm text-cyan-300 hover:underline">← All Notes & Cheat Sheets</Link><p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">Configuration Library</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">YAML & Configuration Notes</h1><p className="mt-3 text-slate-400">Starter examples for Kubernetes, Docker Compose and CI workflows.</p><div className="mt-8 space-y-5">{examples.map((x) => <article key={x.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><h2 className="text-xl font-bold">{x.title}</h2><pre className="mt-4 overflow-x-auto rounded-xl bg-black/50 p-4 text-sm text-emerald-300"><code>{x.code}</code></pre><p className="mt-3 text-sm leading-6 text-slate-400">{x.note}</p></article>)}</div><p className="mt-6 text-sm text-amber-300">Validate and adapt all configuration examples to your environment before deploying.</p></div></main>;
}
