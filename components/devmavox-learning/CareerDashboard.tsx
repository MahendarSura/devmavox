import Link from "next/link";
import type { FeatureDefinition, FeatureCategory } from "./feature-catalog";

const palettes = [
  { card: "from-blue-100 to-sky-50 border-blue-300", icon: "text-blue-700 bg-blue-200", button: "bg-blue-600 hover:bg-blue-700" },
  { card: "from-emerald-100 to-green-50 border-emerald-300", icon: "text-emerald-700 bg-emerald-200", button: "bg-emerald-600 hover:bg-emerald-700" },
  { card: "from-violet-100 to-purple-50 border-violet-300", icon: "text-violet-700 bg-violet-200", button: "bg-violet-600 hover:bg-violet-700" },
  { card: "from-amber-100 to-orange-50 border-amber-300", icon: "text-amber-700 bg-amber-200", button: "bg-orange-600 hover:bg-orange-700" },
  { card: "from-pink-100 to-rose-50 border-pink-300", icon: "text-pink-700 bg-pink-200", button: "bg-pink-600 hover:bg-pink-700" },
  { card: "from-cyan-100 to-sky-50 border-cyan-300", icon: "text-cyan-700 bg-cyan-200", button: "bg-cyan-600 hover:bg-cyan-700" },
  { card: "from-lime-100 to-green-50 border-lime-300", icon: "text-lime-800 bg-lime-200", button: "bg-lime-600 hover:bg-lime-700" },
  { card: "from-orange-100 to-amber-50 border-orange-300", icon: "text-orange-700 bg-orange-200", button: "bg-orange-600 hover:bg-orange-700" },
  { card: "from-teal-100 to-emerald-50 border-teal-300", icon: "text-teal-700 bg-teal-200", button: "bg-teal-600 hover:bg-teal-700" },
  { card: "from-indigo-100 to-violet-50 border-indigo-300", icon: "text-indigo-700 bg-indigo-200", button: "bg-indigo-600 hover:bg-indigo-700" },
];
const symbols = ["↗", "⌁", "⚙", "⌖", "▤", "◎", "▣", "⌘", "⌕", "★"];
const descriptions = [
  "Explore DevOps roles and career opportunities",
  "Understand expectations from fresher to senior",
  "Assess practical skills across key engineering domains",
  "Follow structured, role-based learning paths",
  "Build a strong resume and professional presence",
  "Prepare for technical, scenario and HR interviews",
  "Design reliable, scalable engineering systems",
  "Build portfolio projects with real delivery evidence",
  "Find relevant roles and manage job applications",
  "Measure job readiness and plan career growth",
];
export default function CareerDashboard({ feature }: { feature: FeatureDefinition }) {
  const total = feature.categories.reduce((sum, category) => sum + category.subcategories.reduce((n, sub) => n + sub.topics.length, 0), 0);
  return (
    <main className="min-h-screen bg-[#f4f6ff] text-slate-950">
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#06183e] via-[#111b59] to-[#4b21b5] px-5 py-4 text-white shadow-lg">
          <div className="flex items-center gap-3"><div className="text-3xl text-cyan-300">∞</div><div><div className="text-xl font-black">DevMavox</div><div className="text-xs text-blue-100">Learn DevOps in Telugu</div></div></div>
          <div className="flex items-center gap-5 text-sm font-bold"><Link href="/" className="hover:text-cyan-200">⌂ Home</Link><span className="rounded-xl bg-cyan-500/20 px-4 py-2 ring-1 ring-cyan-300/40">Career Pathways</span></div>
          <div className="text-xs font-semibold italic text-blue-100">Plan · Learn · Practice · Achieve</div>
        </div>
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
          <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#0755bd] via-[#142c91] to-[#4c16b9] p-6 text-white shadow-xl sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="max-w-3xl"><div className="mb-3 text-sm font-bold uppercase tracking-[.22em] text-cyan-200">Career Pathways</div><h1 className="text-3xl font-black tracking-tight sm:text-5xl">DevOps <span className="text-amber-300">Career Center</span></h1><p className="mt-3 text-lg font-semibold text-blue-50">Build your skills. Grow your career. Get job-ready!</p><p className="mt-2 text-sm text-blue-100">Explore career paths, prepare for interviews and build evidence employers can evaluate.</p><div className="mt-6 flex flex-wrap gap-3">{[[feature.categories.length,"Categories"],[total,"Learning Topics"],[3,"Navigation Levels"]].map(([n,label])=><div key={label} className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15"><div className="text-2xl font-black">{n}</div><div className="text-xs text-blue-100">{label}</div></div>)}</div></div>
              <div className="hidden text-center lg:block"><div className="text-8xl">🚀</div><div className="mt-2 text-sm font-black italic text-amber-200">Your DevOps career starts here!</div></div>
            </div>
          </section>
          <aside className="rounded-3xl border border-indigo-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-extrabold">📊 Career Readiness</h2><p className="mt-2 text-sm text-slate-500">Build evidence across the skills employers look for.</p>
            <div className="mt-5 space-y-4">{[["Technical skills","Linux, cloud and tools"],["Projects","Hands-on portfolio"],["Interview","Technical and scenarios"],["Job search","Resume and applications"]].map(([a,b],i)=><div key={a}><div className="flex justify-between text-sm font-bold"><span>{a}</span><span className="text-slate-500">Track progress</span></div><p className="text-xs text-slate-500">{b}</p><div className="mt-2 h-2 rounded-full bg-slate-100"><div className={["w-3/4 bg-blue-500","w-2/3 bg-emerald-500","w-1/2 bg-violet-500","w-1/3 bg-orange-500"][i]+" h-2 rounded-full"}/></div></div>)}</div>
            <div className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">🏆 Focus on practical proof, not just tool names.</div>
          </aside>
        </div>
        <div className="mt-7 flex flex-wrap items-end justify-between gap-2"><div><h2 className="text-2xl font-black">▦ Career Categories</h2><p className="mt-1 text-sm text-slate-600">Choose a category to explore its sections, topics and practical career content.</p></div><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">10 career development areas</span></div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {feature.categories.map((category: FeatureCategory,index:number)=>{const p=palettes[index%palettes.length];const count=category.subcategories.reduce((n,s)=>n+s.topics.length,0);const href="/"+feature.id+"/"+category.name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");return <Link key={category.name} href={href} className={"group flex min-h-44 flex-col justify-between rounded-2xl border bg-gradient-to-br p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg "+p.card}><div className="flex items-start gap-3"><span className={"flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl font-black "+p.icon}>{symbols[index]}</span><div><h3 className="text-base font-extrabold leading-tight">{category.name}</h3><p className="mt-2 text-xs leading-5 text-slate-700">{descriptions[index]}</p></div></div><div className="mt-4 flex items-center justify-between"><span className="text-xs font-bold text-slate-700">▣ {count} topics · {category.subcategories.length} section</span><span className={"rounded-full px-4 py-2 text-xs font-bold text-white "+p.button}>Explore →</span></div></Link>})}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
          <section className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm"><h3 className="font-extrabold">🧭 Your Career Journey</h3><div className="mt-5 flex items-center justify-between text-center text-xs font-bold text-slate-600"><span>Learn<br/>Skills</span><span className="text-blue-500">→</span><span>Build<br/>Projects</span><span className="text-blue-500">→</span><span>Prepare<br/>Resume</span><span className="text-blue-500">→</span><span>Interview</span><span className="text-blue-500">→</span><span>Get<br/>Hired</span></div></section>
          <section className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm"><h3 className="font-extrabold">⚡ Quick Actions</h3><div className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold"><Link className="rounded-xl bg-blue-50 p-3 text-blue-800" href={"/"+feature.id+"/career-learning-roadmaps"}>View Roadmap</Link><Link className="rounded-xl bg-emerald-50 p-3 text-emerald-800" href={"/"+feature.id+"/skills-competency-matrix"}>Check Skills</Link><Link className="rounded-xl bg-pink-50 p-3 text-pink-800" href={"/"+feature.id+"/resume-professional-profile"}>Build Resume</Link><Link className="rounded-xl bg-orange-50 p-3 text-orange-800" href={"/"+feature.id+"/job-search-applications"}>Find Jobs</Link></div></section>
          <section className="rounded-2xl bg-gradient-to-r from-violet-700 to-fuchsia-600 p-5 text-white shadow-sm"><h3 className="text-lg font-black">Dream Big. Prepare Well!</h3><p className="mt-2 text-sm text-violet-100">DevOps skills + real project evidence + interview practice = career confidence.</p><div className="mt-3 text-4xl">🏆 🚀</div></section>
        </div>
        <footer className="mt-8 border-t border-indigo-100 pt-4 text-xs text-slate-500">DevMavox · Practical DevOps Learning</footer>
      </div>
    </main>
  );
}
