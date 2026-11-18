import Link from "next/link";
import type { FeatureCategory, FeatureDefinition } from "./feature-catalog";

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\\u0300-\\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const categoryVisuals: Record<string, { icon: string; accent: string; tint: string; description: string }> = {
  "linux-incidents": { icon: "🐧", accent: "text-sky-300", tint: "from-sky-500/20", description: "Diagnose host resource pressure, failed system services and operating-system availability." },
  "docker-incidents": { icon: "🐳", accent: "text-cyan-300", tint: "from-cyan-500/20", description: "Investigate container lifecycle failures, OOM events, image problems and container networking." },
  "kubernetes-incidents": { icon: "☸", accent: "text-blue-300", tint: "from-blue-500/20", description: "Troubleshoot workload scheduling, pod startup, node health and cluster service disruptions." },
  "ci-cd-incidents": { icon: "∞", accent: "text-violet-300", tint: "from-violet-500/20", description: "Restore delivery pipelines, build agents and deployment workflows while preserving release safety." },
  "aws-incidents": { icon: "aws", accent: "text-amber-300", tint: "from-amber-500/20", description: "Investigate cloud infrastructure reachability, managed Kubernetes and identity permission failures." },
  "networking-incidents": { icon: "⌘", accent: "text-teal-300", tint: "from-teal-500/20", description: "Trace DNS, connectivity, routing and port reachability failures across service dependencies." },
  "application-incidents": { icon: "⚙", accent: "text-emerald-300", tint: "from-emerald-500/20", description: "Diagnose HTTP errors, upstream failures, database connectivity and application availability." },
  "security-incidents": { icon: "🛡", accent: "text-rose-300", tint: "from-rose-500/20", description: "Practice defensive incident handling for exposed secrets, unauthorized access and suspicious activity." },
  "database-incidents": { icon: "🗄️", accent: "text-indigo-300", tint: "from-indigo-500/20", description: "Investigate database availability, query performance, connection pressure, replication and recovery failures." },
  "storage-backup-incidents": { icon: "💾", accent: "text-orange-300", tint: "from-orange-500/20", description: "Troubleshoot block, file and object storage, backup jobs, restore validation and capacity incidents." },
  "monitoring-observability-incidents": { icon: "📈", accent: "text-fuchsia-300", tint: "from-fuchsia-500/20", description: "Restore metrics, dashboards, alert delivery, log ingestion and distributed tracing visibility." },
  "messaging-integration-incidents": { icon: "📨", accent: "text-lime-300", tint: "from-lime-500/20", description: "Resolve broker availability, consumer lag, queue backlogs, cache connectivity and event delivery failures." },
};

const workflow = [
  ["Detect", "Identify the incident from alerts and monitoring"],
  ["Triage", "Assess customer impact and severity"],
  ["Investigate", "Collect evidence and isolate the cause"],
  ["Mitigate", "Apply the safest approved recovery action"],
  ["Verify", "Confirm service health and stability"],
  ["RCA", "Document causes and prevention actions"],
];

export default function IncidentCategoryPage({ feature, category }: { feature: FeatureDefinition; category: FeatureCategory }) {
  const categorySlug = slugify(category.name);
  const visual = categoryVisuals[categorySlug] ?? { icon: "⚡", accent: "text-rose-300", tint: "from-rose-500/20", description: "Investigate production symptoms, gather evidence and restore service safely." };
  const topics = category.subcategories.flatMap((group) => group.topics.map((topic) => ({ topic, group: group.name, groupSlug: slugify(group.name) })));
  const categoryLinks = feature.categories.map((item) => ({ item, slug: slugify(item.name), count: item.subcategories.reduce((n, group) => n + group.topics.length, 0) }));

  return (
    <main className="min-h-screen bg-[#080d18] text-slate-100">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-slate-800 bg-[#0d1525] p-5 lg:min-h-screen lg:border-b-0 lg:border-r">
          <Link href={`/${feature.id}`} className="text-xs text-slate-400 hover:text-white">← Incident Response Center</Link>
          <div className="mt-7 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-2xl">🛡️</span>
            <div><p className="font-bold text-white">Incident Response Center</p><p className="text-xs text-slate-400">Production incident training</p></div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">Explore production incident scenarios and response workflows.</p>
          <div className="mt-7 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500"><span>{feature.categories.length} Categories</span><span>{topics.length} topics here</span></div>
          <nav className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {categoryLinks.map(({ item, slug, count }, index) => (
              <Link key={slug} href={`/${feature.id}/${slug}`} aria-current={slug === categorySlug ? "page" : undefined} className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-3 text-sm transition ${slug === categorySlug ? "border-blue-400/50 bg-blue-600/25 text-white shadow-lg shadow-blue-950/30" : "border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900"}`}>
                <span className="flex min-w-0 items-center gap-2"><span>{categoryVisuals[slug]?.icon === "aws" ? "☁️" : categoryVisuals[slug]?.icon ?? "⚡"}</span><span className="truncate">{item.name}</span></span>
                <span className="text-xs text-slate-500">({count})</span>
              </Link>
            ))}
          </nav>
          <div className="mt-7 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/80 to-slate-900 p-4">
            <p className="font-bold text-white">🚀 Be Ready for Real-World Incidents</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">Learn · Investigate · Recover · Improve</p>
          </div>
        </aside>

        <section className="min-w-0 p-4 sm:p-6 lg:p-7">
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-slate-500"><Link href={`/${feature.id}`} className="hover:text-white">Incident Response Center</Link><span>›</span><span className="text-slate-200">{category.name}</span></nav>
          <header className={`relative overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-br ${visual.tint} via-slate-900 to-[#0b1220] p-6 sm:p-8`}>
            <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative flex flex-wrap items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-slate-950/50 text-6xl">{visual.icon === "aws" ? <span className="text-3xl font-black text-amber-300">aws</span> : visual.icon}</div>
              <div className="min-w-0 flex-1"><p className={`text-xs font-bold uppercase tracking-[0.2em] ${visual.accent}`}>Incident Response Workspace</p><h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">{category.name.replace(" Incidents", " Incident Response")}</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{visual.description}</p></div>
            </div>
          </header>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              [String(topics.length), "Scenarios"],
              ["SEV-1 to SEV-3", "Severity range"],
              ["Guided", "Investigation"],
              ["Hands-on", "Practice"],
            ].map(([value, label], index) => <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4"><p className={`text-xl font-black ${index === 1 ? "text-rose-300" : "text-white"}`}>{value}</p><p className="mt-1 text-xs text-slate-400">{label}</p></div>)}
          </div>

          <div className="mt-7 grid gap-5 2xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <div className="mb-4 flex items-center gap-3"><span className="text-xl text-blue-400">▦</span><h2 className="text-xl font-bold text-white">Incident groups</h2></div>
              <div className="space-y-5">
                {category.subcategories.map((group, groupIndex) => (
                  <section key={group.name} className="overflow-hidden rounded-2xl border border-blue-500/50 bg-slate-900/80 shadow-xl shadow-blue-950/10">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 bg-gradient-to-r from-blue-950/70 to-slate-900 px-5 py-4">
                      <div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/30 text-2xl">▣</span><div><h3 className="font-bold text-white">{group.name}</h3><p className="mt-1 text-xs text-slate-400">Investigate symptoms, identify root causes and restore service safely.</p></div></div>
                      <span className="rounded-full bg-blue-600/70 px-3 py-1.5 text-xs font-bold text-white">{group.topics.length} Topics</span>
                    </div>
                    <div className="grid gap-3 p-4 md:grid-cols-2">
                      {group.topics.map((topic, index) => {
                        const topicSlug = slugify(topic);
                        const severity = ["SEV-2", "SEV-1", "SEV-2", "SEV-1", "SEV-3"][index % 5];
                        return <Link key={topic} href={`/${feature.id}/${categorySlug}/${slugify(group.name)}/${topicSlug}`} className="group rounded-xl border border-slate-700 bg-[#111b2d] p-4 transition hover:-translate-y-0.5 hover:border-blue-400/70 hover:bg-[#16243b]">
                          <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-xl">{["⌁", "◉", "▤", "⚙"][index % 4]}</span><div><h4 className="font-bold text-white group-hover:text-blue-200">{topic}</h4><p className="mt-1 text-xs text-slate-400">Guided production incident scenario</p></div></div><span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${severity === "SEV-1" ? "bg-red-500/20 text-red-300" : severity === "SEV-2" ? "bg-amber-500/20 text-amber-300" : "bg-sky-500/20 text-sky-300"}`}>{severity}</span></div>
                          <span className="mt-4 block rounded-lg bg-blue-700/70 px-3 py-2 text-center text-xs font-bold text-white transition group-hover:bg-blue-600">Open incident →</span>
                        </Link>;
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900/80 p-5 2xl:sticky 2xl:top-6">
              <h2 className="flex items-center gap-2 font-bold text-white"><span className="text-amber-300">ϟ</span> Response Workflow</h2>
              <ol className="mt-5 space-y-4">
                {workflow.map(([name, detail], index) => <li key={name} className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-400/40 bg-blue-600/30 text-sm font-bold text-blue-200">{index + 1}</span><div><p className="text-sm font-bold text-white">{name}</p><p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p></div></li>)}
              </ol>
              <div className="mt-5 rounded-xl border border-lime-500/20 bg-lime-500/10 p-3 text-xs leading-5 text-lime-200">🛡 Simulated learning environment · No production changes</div>
            </aside>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-4 text-xs text-slate-300"><strong className="text-amber-300">💡 What you&apos;ll practice:</strong><span>› Terminal evidence</span><span>▥ Root-cause analysis</span><span>↶ Rollback decisions</span><span>▣ Incident communication</span></div>
          <footer className="mt-8 border-t border-slate-800 pt-5 text-xs text-slate-500">DevMavox · Practical DevOps Learning</footer>
        </section>
      </div>
    </main>
  );
}
