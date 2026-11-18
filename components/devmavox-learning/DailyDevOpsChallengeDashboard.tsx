import Link from "next/link";
import { featureCatalog } from "./feature-catalog";

const feature = featureCatalog["daily-devops-challenge"];
const slugify = (value: string) =>
  value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const palette = [
  { icon: "⌘", tone: "from-sky-500/20 to-blue-950/70", border: "border-sky-400/25", accent: "text-sky-300", glow: "bg-sky-400" },
  { icon: "⑂", tone: "from-orange-500/20 to-orange-950/70", border: "border-orange-400/25", accent: "text-orange-300", glow: "bg-orange-400" },
  { icon: "▣", tone: "from-cyan-500/20 to-cyan-950/70", border: "border-cyan-400/25", accent: "text-cyan-300", glow: "bg-cyan-400" },
  { icon: "☸", tone: "from-violet-500/20 to-violet-950/70", border: "border-violet-400/25", accent: "text-violet-300", glow: "bg-violet-400" },
  { icon: "☁", tone: "from-amber-500/20 to-amber-950/70", border: "border-amber-400/25", accent: "text-amber-300", glow: "bg-amber-400" },
  { icon: "⇄", tone: "from-emerald-500/20 to-emerald-950/70", border: "border-emerald-400/25", accent: "text-emerald-300", glow: "bg-emerald-400" },
  { icon: "⌘", tone: "from-indigo-500/20 to-indigo-950/70", border: "border-indigo-400/25", accent: "text-indigo-300", glow: "bg-indigo-400" },
  { icon: "◉", tone: "from-lime-500/20 to-lime-950/70", border: "border-lime-400/25", accent: "text-lime-300", glow: "bg-lime-400" },
  { icon: "⬡", tone: "from-rose-500/20 to-rose-950/70", border: "border-rose-400/25", accent: "text-rose-300", glow: "bg-rose-400" },
  { icon: "▦", tone: "from-fuchsia-500/20 to-fuchsia-950/70", border: "border-fuchsia-400/25", accent: "text-fuchsia-300", glow: "bg-fuchsia-400" },
  { icon: "✦", tone: "from-purple-500/20 to-purple-950/70", border: "border-purple-400/25", accent: "text-purple-300", glow: "bg-purple-400" },
];

const topicCount = feature.categories.reduce(
  (total, category) => total + category.subcategories.reduce((sum, subcategory) => sum + subcategory.topics.length, 0),
  0,
);

const featuredHref = "/daily-devops-challenge/linux/linux-challenges/file-operations";

export default function DailyDevOpsChallengeDashboard() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070d19] text-slate-100">
      <div className="pointer-events-none fixed inset-0 opacity-40" aria-hidden="true">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-violet-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1480px] px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="DevMavox home">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-300 to-emerald-500 text-xl font-black text-slate-950 shadow-lg shadow-lime-500/20">D</span>
            <span>
              <span className="block text-xl font-black tracking-tight text-white">Dev<span className="text-lime-300">Mavox</span></span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Learn · Practice · Excel</span>
            </span>
          </Link>
          <nav aria-label="Daily challenge navigation" className="flex flex-wrap items-center gap-2 text-sm">
            <a href="#overview" className="rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 font-semibold text-lime-200">Overview</a>
            <a href="#categories" className="rounded-full px-4 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white">Challenges</a>
            <a href="#weekly" className="rounded-full px-4 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white">Production Week</a>
            <a href="#how-it-works" className="rounded-full px-4 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white">How it works</a>
          </nav>
          <Link href="/" className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white">← Home</Link>
        </header>

        <section id="overview" className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
          <div className="relative isolate overflow-hidden rounded-[28px] border border-cyan-400/20 bg-[radial-gradient(ellipse_at_75%_45%,rgba(6,182,212,.22),transparent_42%),linear-gradient(120deg,#101b32_0%,#092337_55%,#10251e_100%)] p-7 shadow-2xl shadow-cyan-950/30 sm:p-10">
            <div className="absolute -right-10 -top-16 -z-10 h-72 w-72 rounded-full border border-cyan-300/10" />
            <div className="absolute right-16 top-10 -z-10 h-52 w-52 rounded-full border border-cyan-300/10" />
            <div className="absolute bottom-0 right-0 -z-10 h-56 w-2/3 bg-gradient-to-l from-emerald-400/10 to-transparent blur-2xl" />
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1.5 text-xs font-bold text-lime-200">
                <span className="h-2 w-2 animate-pulse rounded-full bg-lime-300" /> DAILY DEVOPS CHALLENGE
              </span>
              <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl">Build real DevOps skills with <span className="text-lime-300">hands-on challenges.</span></h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">Practice commands, fix broken deployments, debug infrastructure and respond to production incidents — one challenge at a time.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={featuredHref} className="inline-flex items-center gap-2 rounded-xl bg-lime-300 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-lime-400/20 transition hover:-translate-y-0.5 hover:bg-lime-200">Start today&apos;s challenge <span aria-hidden="true">→</span></Link>
                <a href="#categories" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Explore all categories</a>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-7 right-8 hidden h-48 w-64 items-center justify-center lg:flex" aria-hidden="true">
              <div className="absolute h-40 w-40 rounded-full border border-cyan-300/20" />
              <div className="absolute h-32 w-32 rounded-full border border-dashed border-lime-300/40" />
              <div className="absolute flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-200/30 bg-slate-950/70 text-4xl shadow-[0_0_60px_rgba(34,211,238,.22)]">⌘</div>
              <span className="absolute right-3 top-4 rounded-xl border border-sky-300/20 bg-slate-950/80 px-3 py-2 text-lg text-sky-300">☸</span>
              <span className="absolute bottom-3 left-3 rounded-xl border border-orange-300/20 bg-slate-950/80 px-3 py-2 text-lg text-orange-300">⑂</span>
              <span className="absolute bottom-4 right-2 rounded-xl border border-lime-300/20 bg-slate-950/80 px-3 py-2 text-lg text-lime-300">∞</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-300 lg:mt-9">
              <span className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">⌘ Linux & Git</span>
              <span className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">☸ Containers & Kubernetes</span>
              <span className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">☁ Cloud & IaC</span>
              <span className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">◉ Production response</span>
            </div>
          </div>

          <aside className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[24px] border border-slate-700/80 bg-slate-900/80 p-5">
              <div className="mb-4 flex items-center justify-between"><h2 className="font-bold text-white">Challenge library</h2><span className="text-lg text-cyan-300">▦</span></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-950/50 p-4"><p className="text-3xl font-black text-white">{feature.categories.length}</p><p className="mt-1 text-xs text-violet-200">Categories</p></div>
                <div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-950/50 p-4"><p className="text-3xl font-black text-white">{topicCount}</p><p className="mt-1 text-xs text-emerald-200">Learning topics</p></div>
                <div className="rounded-2xl bg-gradient-to-br from-sky-500/20 to-sky-950/50 p-4"><p className="text-3xl font-black text-white">4</p><p className="mt-1 text-xs text-sky-200">Difficulty levels</p></div>
                <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-950/50 p-4"><p className="text-3xl font-black text-white">3</p><p className="mt-1 text-xs text-amber-200">Navigation levels</p></div>
              </div>
            </div>
            <div id="today" className="rounded-[24px] border border-amber-400/20 bg-gradient-to-br from-[#211b18] to-[#111827] p-5">
              <div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Today&apos;s featured task</p><span className="rounded-full bg-amber-300/10 px-2.5 py-1 text-[10px] font-bold text-amber-200">BEGINNER</span></div>
              <div className="mt-4 flex items-start gap-3"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950/70 text-2xl">⌘</span><div><h3 className="font-bold text-white">Linux permissions rescue</h3><p className="mt-1 text-xs leading-5 text-slate-400">Fix a deployment user&apos;s access to an application directory.</p></div></div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400"><span>◷ 15–20 min</span><span>Hands-on task</span></div>
              <Link href={featuredHref} className="mt-4 flex items-center justify-center rounded-xl bg-amber-300 px-4 py-2.5 text-sm font-extrabold text-slate-950 transition hover:bg-amber-200">Open challenge →</Link>
            </div>
          </aside>
        </section>

        <section id="categories" className="mt-9 scroll-mt-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Choose your battlefield</p><h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Explore DevOps challenge categories</h2><p className="mt-2 text-sm text-slate-400">Pick a tool or engineering domain and start solving practical tasks.</p></div>
            <span className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-300">{feature.categories.length} challenge tracks</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {feature.categories.map((category, index) => {
              const style = palette[index % palette.length];
              const topics = category.subcategories.reduce((sum, item) => sum + item.topics.length, 0);
              const href = `/daily-devops-challenge/${slugify(category.name)}`;
              return (
                <Link key={category.name} href={href} className={`group relative overflow-hidden rounded-2xl border ${style.border} bg-gradient-to-br ${style.tone} p-5 transition duration-200 hover:-translate-y-1 hover:border-white/30 hover:shadow-xl hover:shadow-black/20`}>
                  <div className={`absolute -right-7 -top-8 h-28 w-28 rounded-full ${style.glow} opacity-[0.07] blur-2xl transition group-hover:opacity-20`} />
                  <div className="relative flex items-start justify-between gap-3">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/50 text-2xl ${style.accent}`}>{style.icon}</span>
                    <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-bold text-slate-300">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="relative mt-5"><h3 className="text-lg font-extrabold text-white">{category.name}</h3><p className="mt-1.5 text-xs text-slate-400">{category.subcategories.length} challenge tracks · {topics} topics</p></div>
                  <div className={`relative mt-5 flex items-center justify-between text-xs font-bold ${style.accent}`}><span>Explore challenges</span><span className="transition group-hover:translate-x-1">→</span></div>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="weekly" className="mt-9 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
          <div className="overflow-hidden rounded-[24px] border border-rose-400/20 bg-gradient-to-r from-rose-950/50 via-slate-900 to-violet-950/40 p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-300">Production challenge of the week</span><span className="rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-1 text-[10px] font-bold text-rose-200">ADVANCED</span></div>
            <h2 className="mt-4 max-w-xl text-2xl font-black text-white">Recover a failed Kubernetes release without causing another outage.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Investigate unhealthy workloads, inspect rollout history, identify the bad change, restore service safely and document the root cause.</p>
            <Link href="/daily-devops-challenge/production/production-challenges/troubleshooting" className="mt-5 inline-flex rounded-xl border border-rose-300/30 bg-rose-300/10 px-4 py-2.5 text-sm font-bold text-rose-100 transition hover:bg-rose-300/20">Explore production scenarios →</Link>
          </div>
          <div id="how-it-works" className="rounded-[24px] border border-slate-700 bg-slate-900/80 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Challenge workflow</p>
            <h2 className="mt-3 text-xl font-black text-white">Learn by doing</h2>
            <ol className="mt-5 space-y-4">
              {[
                ["01", "Understand the incident", "Read the task, symptoms and environment."],
                ["02", "Investigate & solve", "Use commands, manifests and configuration."],
                ["03", "Validate & improve", "Check the result, review the solution and learn prevention."],
              ].map(([number, title, description]) => <li key={number} className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-xs font-black text-cyan-200">{number}</span><span><strong className="block text-sm text-white">{title}</strong><span className="mt-1 block text-xs leading-5 text-slate-400">{description}</span></span></li>)}
            </ol>
          </div>
        </section>

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-5 text-xs text-slate-500"><span>DevMavox · Daily DevOps Challenge</span><span>Practice safely. Think like an engineer. Ship with confidence.</span></footer>
      </div>
    </main>
  );
}
