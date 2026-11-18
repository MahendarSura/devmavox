import Link from "next/link";
import type { FeatureDefinition, FeatureCategory } from "./feature-catalog";

const palettes = [
  { card: "from-amber-500 via-orange-600 to-amber-700", glow: "bg-amber-300/30", icon: "🚀", subtitle: "Core concepts and principles" },
  { card: "from-lime-500 via-green-600 to-emerald-700", glow: "bg-lime-300/25", icon: "🐧", subtitle: "Linux and OS fundamentals" },
  { card: "from-violet-600 via-purple-700 to-fuchsia-800", glow: "bg-violet-300/30", icon: "🌐", subtitle: "Network concepts and tools" },
  { card: "from-sky-500 via-blue-600 to-cyan-800", glow: "bg-sky-300/30", icon: "☁️", subtitle: "Cloud platforms and services" },
  { card: "from-green-500 via-emerald-600 to-lime-800", glow: "bg-green-300/25", icon: "🌿", subtitle: "Git and version control" },
  { card: "from-blue-600 via-blue-700 to-indigo-800", glow: "bg-blue-300/30", icon: "🐳", subtitle: "Docker and containerization" },
  { card: "from-teal-500 via-emerald-600 to-cyan-800", glow: "bg-teal-300/30", icon: "☸️", subtitle: "Kubernetes and beyond" },
  { card: "from-pink-600 via-rose-600 to-fuchsia-800", glow: "bg-pink-300/30", icon: "♾️", subtitle: "Build, test and deploy" },
  { card: "from-purple-600 via-violet-700 to-indigo-900", glow: "bg-purple-300/30", icon: "⚙️", subtitle: "Automate infrastructure" },
  { card: "from-lime-600 via-green-700 to-emerald-900", glow: "bg-lime-300/25", icon: "🦊", subtitle: "GitOps workflows" },
  { card: "from-orange-500 via-amber-600 to-orange-800", glow: "bg-orange-300/30", icon: "🛡️", subtitle: "Build resilient systems" },
  { card: "from-cyan-600 via-teal-700 to-sky-900", glow: "bg-cyan-300/30", icon: "📦", subtitle: "Operate at scale" },
];

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function countTopics(category: FeatureCategory) {
  return category.subcategories.reduce((total, item) => total + item.topics.length, 0);
}

export default function DevOpsKnowledgeHome({ feature }: { feature: FeatureDefinition }) {
  const totalTopics = feature.categories.reduce((total, category) => total + countTopics(category), 0);

  return (
    <main className="min-h-screen bg-[#070d1b] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-slate-400 transition hover:text-white">← DevMavox Home</Link>
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">▤ Engineering Knowledge Index</span>
        </div>

        <section className="relative mb-7 overflow-hidden rounded-[26px] border border-cyan-400/30 bg-gradient-to-br from-[#092b62] via-[#08224b] to-[#24133f] px-6 py-8 shadow-[0_20px_80px_rgba(14,116,220,0.12)] sm:px-10 sm:py-9">
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.35fr_.8fr]">
            <div>
              <p className="mb-2 text-sm font-semibold tracking-wide text-cyan-200">Engineering Knowledge Index</p>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">DevOps <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">Knowledge Base</span></h1>
              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-blue-100 sm:text-lg">Explore interconnected DevOps engineering concepts in depth.</p>
              <div className="mt-7 flex flex-wrap gap-7">
                <div className="flex items-center gap-3"><span className="text-3xl">📁</span><div><p className="text-2xl font-black text-white">{feature.categories.length}</p><p className="text-xs text-blue-100">Categories</p></div></div>
                <div className="flex items-center gap-3"><span className="text-3xl">📚</span><div><p className="text-2xl font-black text-white">{totalTopics}</p><p className="text-xs text-blue-100">Learning topics</p></div></div>
                <div className="flex items-center gap-3"><span className="text-3xl">▱</span><div><p className="text-2xl font-black text-white">3</p><p className="text-xs text-blue-100">Navigation levels</p></div></div>
              </div>
            </div>
            <div className="relative hidden min-h-[175px] items-center justify-center lg:flex">
              <div className="absolute h-44 w-72 rounded-full border-[22px] border-cyan-400/70 shadow-[0_0_45px_rgba(34,211,238,.22)]" />
              <div className="absolute h-44 w-72 rotate-[-34deg] rounded-full border-[22px] border-fuchsia-500/80 shadow-[0_0_45px_rgba(217,70,239,.22)]" />
              <div className="relative rounded-2xl border border-white/15 bg-slate-950/55 px-8 py-5 text-center backdrop-blur">
                <div className="text-4xl">♾️</div><p className="mt-1 text-2xl font-black text-white">Dev <span className="text-amber-300">Ops</span></p><p className="mt-1 text-xs tracking-widest text-blue-100">BUILD · DEPLOY · SCALE</p>
              </div>
              <span className="absolute right-2 top-0 text-3xl">🐧</span><span className="absolute left-4 top-3 text-3xl">☸️</span><span className="absolute bottom-0 right-8 text-3xl">🐳</span>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div><div className="flex items-center gap-3"><span className="grid h-8 w-8 grid-cols-2 gap-1"><i className="rounded-sm bg-cyan-400"/><i className="rounded-sm bg-blue-500"/><i className="rounded-sm bg-sky-500"/><i className="rounded-sm bg-indigo-500"/></span><h2 className="text-xl font-extrabold text-white">Explore Categories</h2></div><p className="ml-11 mt-1 text-sm text-slate-400">Choose a category to start your DevOps learning journey</p></div>
            <span className="hidden text-xs text-slate-500 sm:block">12 knowledge domains</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {feature.categories.map((category, index) => {
              const palette = palettes[index % palettes.length];
              const href = `/${feature.id}/${slugify(category.name)}`;
              const count = countTopics(category);
              return (
                <Link key={category.name} href={href} className={`group relative isolate flex min-h-[136px] overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br ${palette.card} p-4 shadow-lg transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl`}>
                  <div className={`pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full ${palette.glow} blur-2xl`} />
                  <div className="relative flex w-full items-center gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/15 text-4xl shadow-inner">{palette.icon}</div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 text-xs font-black text-white/90">{String(index + 1).padStart(2, "0")}</div>
                      <h3 className="text-base font-extrabold leading-tight text-white">{category.name}</h3>
                      <p className="mt-1 text-xs text-white/85">{palette.subtitle}</p>
                      <p className="mt-1.5 text-[11px] font-medium text-white/75">{category.subcategories.length} subcategories · {count} topics</p>
                      <span className="mt-2 inline-flex rounded-md bg-black/20 px-3 py-1 text-[11px] font-bold text-white transition group-hover:bg-black/35">Explore Category →</span>
                    </div>
                  </div>
                  <span className="pointer-events-none absolute -bottom-5 -right-1 text-7xl font-black text-white/10">{String(index + 1).padStart(2, "0")}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-2xl border border-amber-300/20 bg-gradient-to-r from-slate-900 to-slate-800/80 p-5">
            <div className="flex items-center gap-3"><span className="text-3xl">🏆</span><div><h2 className="font-extrabold text-white">Your Learning Sequence</h2><p className="text-xs text-slate-400">Follow the recommended path for a structured learning experience</p></div></div>
            <div className="mt-5 grid grid-cols-4 gap-2 text-center">
              {["DevOps Basics", "Tools & Ecosystem", "Hands-on Labs", "Production Ready"].map((step, index) => <div key={step} className="relative"><div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-black text-white shadow-lg shadow-blue-500/30">{index + 1}</div><p className="mx-auto mt-2 max-w-24 text-xs font-bold text-slate-200">{step}</p>{index < 3 && <span className="absolute right-[-9px] top-1 text-lg text-slate-400">→</span>}</div>)}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-fuchsia-400/30 bg-gradient-to-r from-violet-950/80 to-fuchsia-950/70 p-5">
            <div className="flex items-center gap-3"><span className="text-4xl">🚀</span><div><h2 className="font-extrabold text-amber-300">Start Learning Today!</h2><p className="mt-1 max-w-xs text-xs leading-5 text-slate-300">Build your skills step by step with practical examples and real-world scenarios.</p></div></div>
            <Link href={`/${feature.id}/${slugify(feature.categories[0]?.name ?? "devops-foundations")}`} className="rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:bg-amber-300">Begin Journey →</Link>
          </div>
        </section>
        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4 text-xs text-slate-500"><span>☁ DevMavox · Practical DevOps Learning</span><div className="flex gap-5"><Link href="/devops-glossary" className="hover:text-slate-300">Documentation</Link><Link href="/contact" className="hover:text-slate-300">Feedback</Link><a href="https://github.com/MahendarSura/devmavox" target="_blank" rel="noreferrer" className="hover:text-slate-300">GitHub</a></div></footer>
      </div>
    </main>
  );
}
