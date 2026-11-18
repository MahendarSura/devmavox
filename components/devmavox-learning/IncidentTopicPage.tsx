"use client";

import Link from "next/link";
import type { IncidentLesson } from "./incident-topic-content";

type Props = {
  content: IncidentLesson;
  featureId: string;
  categoryName: string;
  subcategoryName: string;
  categorySlug: string;
  subcategorySlug: string;
};

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-7">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 font-mono text-xs font-bold text-rose-300">{number}</span>
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function IncidentTopicPage({
  content,
  featureId,
  categoryName,
  subcategoryName,
  categorySlug,
  subcategorySlug,
}: Props) {
  const severityClass =
    content.severity === "SEV-1"
      ? "border-red-500/40 bg-red-500/10 text-red-200"
      : content.severity === "SEV-2"
        ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
        : "border-sky-500/40 bg-sky-500/10 text-sky-200";

  return (
    <main className="min-h-screen bg-[#080d18] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href={`/${featureId}`} className="text-sm text-slate-400 transition hover:text-white">← Incident Response Center</Link>

        <nav aria-label="Breadcrumb" className="my-6 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <Link href={`/${featureId}/${categorySlug}`} className="hover:text-white">{categoryName}</Link>
          <span className="text-slate-600">/</span>
          <Link href={`/${featureId}/${categorySlug}/${subcategorySlug}`} className="hover:text-white">{subcategoryName}</Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200">{content.title}</span>
        </nav>

        <header className="relative mb-7 overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-br from-slate-900 via-[#211323] to-[#0b1220] p-6 sm:p-9">
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-300">Production incident response · Learning scenario</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-4xl">{content.title}</h1>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base">{content.overview}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className={`rounded-full border px-3 py-1.5 text-xs font-bold ${severityClass}`}>{content.severity} · Suggested severity</span>
              <span className="rounded-full border border-slate-700 bg-slate-950/50 px-3 py-1.5 text-xs text-slate-300">12 response stages</span>
              <span className="rounded-full border border-slate-700 bg-slate-950/50 px-3 py-1.5 text-xs text-slate-300">Commands · RCA · Recovery · Practice</span>
            </div>
          </div>
        </header>

        <div className="mb-7 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-rose-300">Business impact</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">{content.impact}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-rose-300">Typical environment</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">{content.environment}</p>
          </div>
        </div>

        <div className="space-y-5">
          <Section number="01" title="Incident symptoms">
            <ul className="grid gap-2 sm:grid-cols-2">
              {content.symptoms.map((item) => <li key={item} className="rounded-lg border border-slate-800 bg-slate-950/50 p-3 text-sm leading-6 text-slate-300"><span className="mr-2 text-rose-300">●</span>{item}</li>)}
            </ul>
          </Section>

          <Section number="02" title="Investigation – commands and expected evidence">
            <p className="mb-4 text-sm leading-6 text-slate-400">Run commands only in the correct host, namespace or lab environment. Replace placeholders with verified values. Capture output and timestamps before remediation.</p>
            <div className="space-y-4">
              {content.investigation.map((item, index) => (
                <div key={item.command} className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70">
                  <div className="border-b border-slate-800 px-4 py-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-rose-300">Step {index + 1} · {item.purpose}</p>
                    <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-xs leading-6 text-emerald-200"><code>{item.command}</code></pre>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Expected evidence</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{item.expected}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section number="03" title="Root-cause hypotheses">
            <p className="mb-3 text-sm text-slate-400">Treat these as hypotheses to prove with evidence, not assumptions.</p>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-300">
              {content.rootCauses.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </Section>

          <Section number="04" title="Safe recovery procedure">
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-300">
              {content.recovery.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </Section>

          <Section number="05" title="Post-recovery verification">
            <ul className="space-y-2">
              {content.verification.map((item) => <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300"><span className="mt-1 text-emerald-400">✓</span><span>{item}</span></li>)}
            </ul>
          </Section>

          <Section number="06" title="Prevention and monitoring">
            <ul className="space-y-2">
              {content.prevention.map((item) => <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300"><span className="mt-1 text-cyan-300">→</span><span>{item}</span></li>)}
            </ul>
          </Section>

          <Section number="07" title="Hands-on incident simulation">
            <div className="mb-4 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 text-sm leading-6 text-amber-100">
              <strong>Safety boundary:</strong> Perform this exercise only in a disposable lab or isolated test namespace. Never reproduce an outage on production infrastructure.
            </div>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-300">
              {content.simulation.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </Section>

          <Section number="08" title="Incident commander checklist">
            <div className="grid gap-2 sm:grid-cols-2">
              {["Declare severity and assign an incident lead","Record start time, symptoms and affected services","Preserve logs, metrics, events and recent changes","Communicate customer impact and next update time","Choose the lowest-risk recovery action","Verify service health and watch for recurrence","Document timeline, root cause and follow-up owners","Close only after service owner confirms recovery"].map((item) => (
                <div key={item} className="rounded-lg border border-slate-800 bg-slate-950/50 p-3 text-sm leading-6 text-slate-300"><span className="mr-2 text-rose-300">□</span>{item}</div>
              ))}
            </div>
          </Section>

          <Section number="09" title="Interview questions and answers">
            <div className="space-y-4">
              {content.questions.map((item, index) => (
                <div key={item.question} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <p className="text-sm font-semibold leading-6 text-white">Q{index + 1}. {item.question}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section number="10" title="RCA and incident report template">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Incident summary","What failed and what users experienced"],
                ["Timeline","Detection, investigation, mitigation and recovery timestamps"],
                ["Root cause","The proven technical cause and contributing factors"],
                ["Resolution","Exact approved change that restored service"],
                ["Impact","Duration, affected users, services and transactions"],
                ["Follow-up actions","Owner, due date, prevention and validation evidence"],
              ].map(([label, detail]) => (
                <div key={label} className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-rose-300">{label}</p>
                  <p className="mt-1 text-sm text-slate-300">{detail}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-5">
          <Link href={`/${featureId}/${categorySlug}/${subcategorySlug}`} className="text-sm text-rose-300 hover:text-white">← Back to incident topics</Link>
          <Link href={`/${featureId}/${categorySlug}`} className="text-sm text-slate-400 hover:text-white">Back to {categoryName} →</Link>
        </div>
      </div>
    </main>
  );
}
