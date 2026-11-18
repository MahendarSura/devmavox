import Link from "next/link";
import type { FeatureDefinition, FeatureCategory } from "./feature-catalog";

const palettes = [
  { card: "from-blue-100 to-sky-50 border-blue-300", icon: "text-blue-700 bg-blue-200", button: "bg-blue-600 hover:bg-blue-700", symbol: "🪧" },
  { card: "from-emerald-100 to-green-50 border-emerald-300", icon: "text-emerald-700 bg-emerald-200", button: "bg-emerald-600 hover:bg-emerald-700", symbol: "📈" },
  { card: "from-violet-100 to-purple-50 border-violet-300", icon: "text-violet-700 bg-violet-200", button: "bg-violet-600 hover:bg-violet-700", symbol: "⚙️" },
  { card: "from-amber-100 to-orange-50 border-amber-300", icon: "text-amber-700 bg-amber-200", button: "bg-orange-600 hover:bg-orange-700", symbol: "🗺️" },
  { card: "from-pink-100 to-rose-50 border-pink-300", icon: "text-pink-700 bg-pink-200", button: "bg-pink-600 hover:bg-pink-700", symbol: "📄" },
  { card: "from-cyan-100 to-sky-50 border-cyan-300", icon: "text-cyan-700 bg-cyan-200", button: "bg-cyan-600 hover:bg-cyan-700", symbol: "🧑‍💻" },
  { card: "from-lime-100 to-green-50 border-lime-300", icon: "text-lime-800 bg-lime-200", button: "bg-lime-600 hover:bg-lime-700", symbol: "🤝" },
  { card: "from-orange-100 to-amber-50 border-orange-300", icon: "text-orange-700 bg-orange-200", button: "bg-orange-600 hover:bg-orange-700", symbol: "🚀" },
];
const descriptions = [
  "Explore career directions, role choices and opportunities",
  "Understand job titles, responsibilities and employer expectations",
  "Present your experience and professional profile clearly",
  "Prepare for technical, scenario and behavioral interview stages",
  "Find suitable openings and manage your job search",
  "Evaluate compensation, benefits and employment offers",
  "Prepare for joining a team and succeeding in your first 90 days",
  "Plan long-term progression, leadership and specialization",
];
const slugify = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function CareerDashboard({ feature }: { feature: FeatureDefinition }) {
  const total = feature.categories.reduce((sum, category) => sum + category.subcategories.reduce((n, sub) => n + sub.topics.length, 0), 0);
  const totalSections = feature.categories.reduce((n, category) => n + category.subcategories.length, 0);
  const quickLinks = [
    ["🧭", "Explore Career Roles", "/career-direction-role-selection", "bg-blue-100 text-blue-800"],
    ["📄", "Resume Guidance", "/resume-personal-branding", "bg-emerald-100 text-emerald-800"],
    ["🎤", "Interview Strategy", "/interview-strategy", "bg-violet-100 text-violet-800"],
    ["💼", "Job Search", "/job-search-application-management", "bg-orange-100 text-orange-800"],
  ];
  return (
    <main className="min-h-screen bg-[#f5f6ff] text-slate-950">
      <div className="mx-auto max-w-[1680px] px-4 py-3 sm:px-6 lg:px-7">
        <header className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-b-xl bg-gradient-to-r from-[#03183e] via-[#111b59] to-[#5124bb] px-5 py-3 text-white shadow-lg">
          <div className="flex items-center gap-3"><div className="text-4xl font-black text-cyan-300">∞</div><div><div className="text-xl font-black">DevMavox</div><div className="text-xs text-blue-100">Learn DevOps in Telugu</div></div></div>
          <nav className="flex items-center gap-3 text-sm font-bold"><Link href="/" className="rounded-xl px-4 py-2 hover:bg-white/10">⌂ Home</Link><span className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 shadow-lg">▣ Career Pathways</span></nav>
          <div className="text-xs font-bold italic text-blue-100">Plan · Learn · Practice · Achieve　 👤</div>
        </header>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section className="relative isolate min-h-[215px] overflow-hidden rounded-2xl bg-gradient-to-r from-[#0876cf] via-[#142d91] to-[#5117b9] px-6 py-6 text-white shadow-xl sm:px-9">
            <div className="pointer-events-none absolute -right-10 -top-20 -z-10 h-72 w-72 rounded-full border-[28px] border-cyan-300/10" />
            <div className="pointer-events-none absolute right-40 top-8 -z-10 h-44 w-44 rounded-full bg-blue-300/10 blur-2xl" />
            <div className="grid h-full items-center gap-4 lg:grid-cols-[1fr_230px]">
              <div><p className="text-xs font-black uppercase tracking-[.22em] text-cyan-200">Career Pathways</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">DevOps <span className="text-amber-300">Career Center</span></h1><p className="mt-2 text-lg font-extrabold text-blue-50">Build your skills. Grow your career. Get job-ready!</p><p className="mt-1 max-w-3xl text-sm text-blue-100">Explore career choices, prepare for interviews and plan your professional journey.</p>
                <div className="mt-5 flex flex-wrap gap-2">{[[feature.categories.length,"Categories","💼"],[total,"Learning Topics","🎓"],[3,"Navigation Levels","🧭"]].map(([n,label,icon])=><div key={String(label)} className="flex items-center gap-2 rounded-xl bg-[#061b62]/60 px-3 py-2 ring-1 ring-white/15"><span className="text-xl">{icon}</span><div><div className="text-xl font-black leading-none">{n}</div><div className="text-[11px] text-blue-100">{label}</div></div></div>)}</div>
              </div>
              <div className="hidden text-center lg:block"><div className="text-8xl drop-shadow-xl">🚀</div><div className="mt-1 text-lg font-black italic leading-tight text-amber-200">Your Dream<br/>DevOps Career<br/>Starts Here!</div></div>
            </div>
          </section>

          <aside className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
            <h2 className="text-base font-black">📊 Career Readiness Progress</h2>
            <div className="mt-3 flex items-center gap-4"><div className="grid h-28 w-28 shrink-0 place-items-center rounded-full" style={{background:"conic-gradient(#0bb6b0 0deg 259deg,#dbeafe 259deg 360deg)"}}><div className="grid h-20 w-20 place-items-center rounded-full bg-white text-center"><div><div className="text-2xl font-black">72%</div><div className="text-[10px] font-semibold">Overall Ready</div></div></div></div><div className="min-w-0 flex-1 space-y-3 text-xs font-semibold">{[["Skills","85%","bg-emerald-500"],["Experience","70%","bg-blue-500"],["Interview","65%","bg-violet-500"],["Resume","75%","bg-orange-500"]].map(([name,value,color])=><div key={name} className="flex items-center justify-between gap-2"><span className="flex items-center gap-2"><i className={"h-2.5 w-2.5 rounded-full "+color}/>{name}</span><b>{value}</b></div>)}</div></div>
            <div className="mt-3 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-100 p-3"><div className="font-extrabold text-emerald-950">🏆 Great Progress!</div><p className="mt-1 text-xs text-emerald-900">Build a strong career story with clear evidence and preparation.</p></div>
          </aside>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section>
            <div className="mb-3 flex flex-wrap items-center gap-3"><h2 className="text-xl font-black">▦ Career Categories</h2><span className="text-sm text-slate-600">│ Choose a category to explore detailed content</span></div>
            <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
              {feature.categories.map((category: FeatureCategory,index:number)=>{const p=palettes[index%palettes.length];const count=category.subcategories.reduce((n,s)=>n+s.topics.length,0);const href="/"+feature.id+"/"+slugify(category.name);return <Link key={category.name} href={href} className={"group flex min-h-[164px] flex-col justify-between rounded-2xl border bg-gradient-to-br p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg "+p.card}><div className="flex items-start gap-3"><span className={"grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl shadow-sm "+p.icon}>{p.symbol}</span><div><h3 className="text-sm font-black leading-snug">{category.name}</h3><p className="mt-2 text-xs leading-5 text-slate-700">{descriptions[index] || "Explore practical career guidance and professional development."}</p></div></div><div className="mt-3 flex items-center justify-between gap-2"><span className="text-xs font-bold text-slate-700">▣ {count} Topics</span><span className={"rounded-full px-4 py-2 text-xs font-black text-white "+p.button}>Explore →</span></div></Link>})}
            </div>
          </section>
          <aside className="space-y-3">
            <section className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-black">🎯 Career Focus Areas</h2><span className="text-xs font-bold text-blue-600">Your checklist</span></div><div className="mt-3 space-y-3">{[["Role clarity","Choose the right career direction","bg-emerald-500","w-[85%]"],["Resume story","Show measurable contributions","bg-blue-500","w-[72%]"],["Interview confidence","Explain decisions with clarity","bg-violet-500","w-[65%]"],["Job search","Apply consistently and follow up","bg-orange-500","w-[58%]"]].map(([title,desc,color,width])=><div key={title}><div className="flex justify-between text-xs font-bold"><span>{title}</span><span className="text-slate-500">{width==="w-[85%]"?"85%":width==="w-[72%]"?"72%":width==="w-[65%]"?"65%":"58%"}</span></div><p className="text-[11px] text-slate-500">{desc}</p><div className="mt-1.5 h-2 rounded-full bg-slate-100"><div className={"h-2 rounded-full "+color+" "+width}/></div></div>)}</div></section>
            <section className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm"><h2 className="font-black">⚡ Quick Actions</h2><div className="mt-3 grid grid-cols-2 gap-2">{quickLinks.map(([icon,label,pathName,style])=><Link key={label} href={"/"+feature.id+pathName} className={"rounded-xl p-3 text-center text-xs font-extrabold transition hover:brightness-95 "+style}><span className="block text-xl">{icon}</span>{label}</Link>)}</div></section>
          </aside>
        </div>

        <div className="mt-4 grid gap-3 xl:grid-cols-[1.1fr_1.3fr_1fr]">
          <section className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-black">◷ Recent Activity</h2><span className="text-xs font-bold text-blue-600">Career checklist</span></div><div className="mt-3 space-y-3 text-xs"><div className="flex items-center gap-2 border-b border-slate-100 pb-2"><span className="text-emerald-600">●</span><b>Review your target role and responsibilities</b></div><div className="flex items-center gap-2 border-b border-slate-100 pb-2"><span className="text-blue-600">▶</span><b>Prepare achievement-based resume points</b></div><div className="flex items-center gap-2"><span className="text-amber-500">🏆</span><b>Practise explaining one career example</b></div></div></section>
          <section className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-black">⭐ Career Milestones</h2><span className="text-xs font-bold text-blue-600">Career journey</span></div><div className="mt-5 flex items-center justify-between text-center">{[["✓","Choose Role"],["✓","Build Evidence"],["●","Prepare Resume"],["○","Ace Interviews"],["○","Get Hired"]].map(([mark,label],i)=><div key={label} className="flex min-w-0 flex-1 flex-col items-center"><span className={"grid h-8 w-8 place-items-center rounded-full text-sm font-black text-white "+(i<2?"bg-emerald-500":i===2?"bg-blue-600":"bg-slate-300")}>{mark}</span><span className="mt-2 text-[10px] font-bold leading-tight text-slate-700">{label}</span></div>)}</div><div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 w-3/5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"/></div><p className="mt-1 text-right text-[11px] font-bold text-slate-600">Career journey illustration</p></section>
          <section className="flex min-h-32 flex-col justify-center rounded-2xl bg-gradient-to-r from-violet-700 via-indigo-700 to-fuchsia-600 p-5 text-white shadow-sm"><div className="text-3xl">🏆 ✨</div><h2 className="mt-2 text-xl font-black text-amber-200">Dream Big. Prepare Well!</h2><p className="mt-1 text-sm text-violet-100">Your DevOps career is within reach. Take the next step today.</p></section>
        </div>
        <footer className="mt-5 border-t border-indigo-100 pt-4 text-xs text-slate-500">DevMavox · Practical DevOps Learning</footer>
      </div>
    </main>
  );
}
