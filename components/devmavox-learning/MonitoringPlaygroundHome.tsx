import Link from "next/link";
import type { FeatureDefinition } from "./feature-catalog";

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const palettes = [
  { border: "border-cyan-400/60", glow: "from-cyan-500/30", icon: "text-cyan-300", chip: "bg-cyan-400/15 text-cyan-200", action: "bg-cyan-400 text-slate-950", surface: "from-cyan-950/90 to-slate-950" },
  { border: "border-orange-400/60", glow: "from-orange-500/30", icon: "text-orange-300", chip: "bg-orange-400/15 text-orange-200", action: "bg-orange-400 text-slate-950", surface: "from-orange-950/90 to-slate-950" },
  { border: "border-emerald-400/60", glow: "from-emerald-500/30", icon: "text-emerald-300", chip: "bg-emerald-400/15 text-emerald-200", action: "bg-emerald-400 text-slate-950", surface: "from-emerald-950/90 to-slate-950" },
  { border: "border-fuchsia-400/60", glow: "from-fuchsia-500/30", icon: "text-fuchsia-300", chip: "bg-fuchsia-400/15 text-fuchsia-200", action: "bg-fuchsia-400 text-slate-950", surface: "from-fuchsia-950/90 to-slate-950" },
  { border: "border-amber-400/60", glow: "from-amber-500/30", icon: "text-amber-300", chip: "bg-amber-400/15 text-amber-200", action: "bg-amber-400 text-slate-950", surface: "from-amber-950/90 to-slate-950" },
  { border: "border-yellow-300/60", glow: "from-yellow-400/30", icon: "text-yellow-200", chip: "bg-yellow-300/15 text-yellow-100", action: "bg-yellow-300 text-slate-950", surface: "from-yellow-950/90 to-slate-950" },
  { border: "border-lime-400/60", glow: "from-lime-500/30", icon: "text-lime-300", chip: "bg-lime-400/15 text-lime-200", action: "bg-lime-400 text-slate-950", surface: "from-lime-950/90 to-slate-950" },
  { border: "border-pink-400/60", glow: "from-pink-500/30", icon: "text-pink-300", chip: "bg-pink-400/15 text-pink-200", action: "bg-pink-400 text-slate-950", surface: "from-pink-950/90 to-slate-950" },
  { border: "border-teal-400/60", glow: "from-teal-500/30", icon: "text-teal-300", chip: "bg-teal-400/15 text-teal-200", action: "bg-teal-400 text-slate-950", surface: "from-teal-950/90 to-slate-950" },
];

const symbols = ["⌁", "◉", "⬡", "⌕", "◈", "♧", "⬢", "▣", "✦"];

export default function MonitoringPlaygroundHome({ feature }: { feature: FeatureDefinition }) {
  const totalTopics = feature.categories.reduce((sum, category) => sum + category.subcategories.reduce((n, sub) => n + sub.topics.length, 0), 0);
  const totalSubcategories = feature.categories.reduce((sum, category) => sum + category.subcategories.length, 0);
  const quickLinks = [
    { label: "Metrics fundamentals", category: "Monitoring Fundamentals", subcategory: "Observability Signals", topic: "Metrics", color: "text-cyan-300" },
    { label: "Prometheus setup", category: "Prometheus", subcategory: "Prometheus Platform", topic: "Installation", color: "text-orange-300" },
    { label: "Write PromQL queries", category: "PromQL", subcategory: "Query Language", topic: "Practical Queries", color: "text-fuchsia-300" },
    { label: "Build Grafana dashboards", category: "Grafana", subcategory: "Dashboard Platform", topic: "Dashboards", color: "text-amber-300" },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#090b13] px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <Link href="/" className="text-xl font-black tracking-tight text-white"><span className="mr-2 text-orange-400">◆</span>DevMavox</Link>
          <div className="hidden min-w-[260px] flex-1 rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-sm text-slate-500 md:block">⌕　Search observability workflows, services, commands, topics...</div>
          <div className="flex items-center gap-3 text-sm text-slate-400"><span>Observability Console</span><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-300">Workspace</span></div>
        </header>

        <section className="relative mb-8 overflow-hidden rounded-[28px] border border-orange-400/30 bg-gradient-to-r from-[#351328] via-[#17132d] to-[#082b2a] p-6 shadow-[0_25px_90px_rgba(0,0,0,.35)] sm:p-9">
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[.28em] text-orange-300">Observability Console · Learn / Practice / Improve</p>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">Monitoring <span className="bg-gradient-to-r from-orange-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">Playground</span></h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Explore metrics, logs, Prometheus, Grafana and observability. Move from core concepts to production monitoring workflows with guided practice.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#monitoring-categories" className="rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 px-6 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5">Start learning　→</a>
                <a href="#quick-start" className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">Explore hands-on topics　↗</a>
              </div>
            </div>
            <Link href="/monitoring-playground/hands-on-labs" className="group block w-full max-w-[440px] rounded-2xl border border-emerald-300/35 bg-slate-950/50 p-4 shadow-xl shadow-emerald-950/20 transition hover:-translate-y-1 hover:border-emerald-300/70 hover:bg-slate-900/80 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/15 text-2xl text-emerald-300">⌘</span>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200">6 interactive labs</span>
              </div>
              <h2 className="mt-4 text-xl font-black text-white">Monitoring Playground – Hands-on Labs</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">Open production-style practice environments for metrics, PromQL, dashboards, logs, traces, alerts and Kubernetes monitoring.</p>
              <span className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-sm font-bold text-emerald-300">Open lab workspace <span className="text-xl transition group-hover:translate-x-1">→</span></span>
            </Link>
          </div>
          <div className="relative mt-8 grid grid-cols-2 gap-2 border-t border-white/10 pt-5 text-xs text-slate-300 sm:grid-cols-4">
            <span>◉ Metrics & monitoring</span><span>▤ Logs & events</span><span>⌁ Distributed traces</span><span>♧ Alerts & reliability</span>
          </div>
        </section>

        <section id="monitoring-categories" className="scroll-mt-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-bold uppercase tracking-[.24em] text-emerald-300">Choose your learning path</p><h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Explore Monitoring Categories</h2><p className="mt-2 text-sm text-slate-400">Open a category to view its subcategories, topics and guided learning sections.</p></div>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-400">9 learning domains</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {feature.categories.map((category, index) => {
              const palette = palettes[index % palettes.length];
              const count = category.subcategories.reduce((n, item) => n + item.topics.length, 0);
              return (
                <Link key={category.name} href={`/${feature.id}/${slugify(category.name)}`} className={`group relative overflow-hidden rounded-2xl border ${palette.border} bg-gradient-to-br ${palette.surface} p-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30`}>
                  <div className={`pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${palette.glow} to-transparent blur-2xl transition group-hover:scale-125`} />
                  <div className="relative flex items-start justify-between gap-3">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-3xl ${palette.icon}`}>{symbols[index % symbols.length]}</span>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${palette.chip}`}>{String(index + 1).padStart(2, "0")} / 09</span>
                  </div>
                  <h3 className="relative mt-5 text-lg font-extrabold text-white">{category.name}</h3>
                  <p className="relative mt-2 min-h-10 text-sm leading-6 text-slate-400">{[
                    "Understand monitoring signals and observability foundations.",
                    "Collect, store and query time-series metrics.",
                    "Expose infrastructure and service metrics for scraping.",
                    "Build expressive queries and investigate metric patterns.",
                    "Create dashboards and turn data into useful insight.",
                    "Define alert rules and route actionable notifications.",
                    "Observe cluster, node, pod and container health.",
                    "Measure application performance and service behavior.",
                    "Apply tracing, reliability indicators and SLO practices.",
                  ][index] ?? "Explore monitoring workflows and production practices."}</p>
                  <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs text-slate-400">{category.subcategories.length} subcategories <span className="mx-1 text-slate-600">·</span> {count} topics</span>
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full ${palette.action} text-lg font-black transition group-hover:translate-x-1`}>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="quick-start" className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-2xl border border-orange-400/25 bg-gradient-to-br from-orange-950/40 to-slate-950 p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-orange-300">Jump straight in</p><h2 className="mt-2 text-xl font-black text-white">Quick Start Topics</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {quickLinks.map((item) => (
                <Link key={item.label} href={`/monitoring-playground/${slugify(item.category)}/${slugify(item.subcategory)}/${slugify(item.topic)}`} className="rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-white/25 hover:bg-white/5">
                  <span className={`text-xs font-bold ${item.color}`}>GUIDED TOPIC</span><p className="mt-2 text-sm font-bold text-white">{item.label}</p><p className="mt-2 text-xs text-slate-500">Open topic workspace →</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-400/25 bg-gradient-to-br from-emerald-950/40 to-slate-950 p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-emerald-300">Learning sequence</p><h2 className="mt-2 text-xl font-black text-white">Build your observability skills</h2>
            <ol className="mt-5 space-y-4">
              {["Understand metrics, logs and traces", "Configure Prometheus and exporters", "Query metrics with PromQL", "Visualize service health in Grafana", "Create alerts and measure reliability"].map((step, index) => <li key={step} className="flex items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-xs font-black text-emerald-300">{index + 1}</span><span className="text-sm text-slate-300">{step}</span></li>)}
            </ol>
          </div>
        </section>

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-5 text-xs text-slate-500"><Link href="/" className="font-bold text-slate-300 hover:text-white">← Back to DevMavox Home</Link><span>DevMavox · Learn · Practice · Build Better</span></footer>
      </div>
    </main>
  );
}
