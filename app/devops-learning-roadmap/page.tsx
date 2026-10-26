'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { dockerRoadmap } from './dockerroadmap';
import { mavenRoadmap } from './mavenroadmap';
import { jenkinsRoadmap } from './jenkinsroadmap';
import { linuxRoadmap } from './linuxroadmap';
import { gitRoadmap } from './gitroadmap';
import { k8sRoadmap } from './k8sroadmap';
import { terraformRoadmap } from './terraformroadmap';
import { argocdRoadmap } from './argocdroadmap';
import { ansibleRoadmap } from './ansibleroadmap';
import { prometheusRoadmap } from './prometheusroadmap';
import { tomcatRoadmap } from './tomcatroadmap';
import { jiraRoadmap } from './jiraroadmap';
import { grafanaRoadmap } from './grafanaroadmap';
import { githubActionsRoadmap } from './githubactionsroadmap';
import { nexusRoadmap } from './nexusroadmap';
import { helmRoadmap } from './helmroadmap';
import { eksRoadmap } from './eksroadmap';

export const allToolRoadmaps = [
  linuxRoadmap, gitRoadmap, dockerRoadmap, k8sRoadmap, terraformRoadmap,
  jenkinsRoadmap, argocdRoadmap, ansibleRoadmap, prometheusRoadmap,
  tomcatRoadmap, jiraRoadmap, grafanaRoadmap, githubActionsRoadmap,
  nexusRoadmap, helmRoadmap, eksRoadmap, mavenRoadmap,
];

export function getRoadmapBySlug(slug: string) {
  return allToolRoadmaps.find((tool) => tool.slug === slug);
}

type RoadmapCard = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  level: string;
};

const visualMeta: Record<string, { icon: string; category: string; level: string; description: string }> = {
  linux: { icon: '🐧', category: 'Operating Systems', level: 'Foundation', description: 'Linux commands, processes, permissions, services and practical system troubleshooting.' },
  git: { icon: '🔀', category: 'Version Control', level: 'Foundation', description: 'Build confidence with commits, branches, merges, pull requests and conflict resolution.' },
  docker: { icon: '🐳', category: 'Containers', level: 'Foundation → Advanced', description: 'Build optimized images, run containers, configure networks and storage, secure workloads and practice production operations.' },
  kubernetes: { icon: '☸️', category: 'Orchestration', level: 'Intermediate → Advanced', description: 'Understand workloads, Services, configuration, storage, scheduling, scaling and cluster troubleshooting.' },
  terraform: { icon: '🏗️', category: 'Infrastructure as Code', level: 'Intermediate → Advanced', description: 'Provision infrastructure with reusable modules, remote state, safe plans and repeatable workflows.' },
  jenkins: { icon: '🔧', category: 'CI/CD', level: 'Intermediate', description: 'Create pipelines, configure agents and credentials, publish artifacts and diagnose build failures.' },
  argocd: { icon: '🚀', category: 'GitOps', level: 'Intermediate → Advanced', description: 'Deploy from Git, understand sync and health states, and build reliable GitOps workflows.' },
  ansible: { icon: '🧩', category: 'Configuration Management', level: 'Intermediate', description: 'Automate configuration using inventories, playbooks, roles, variables and safe repeatable runs.' },
  prometheus: { icon: '📈', category: 'Observability', level: 'Intermediate', description: 'Collect metrics, write queries, configure alert rules and investigate service health.' },
  tomcat: { icon: '🐱', category: 'Application Runtime', level: 'Foundation → Intermediate', description: 'Deploy Java applications and investigate runtime, port, log and configuration issues.' },
  jira: { icon: '📋', category: 'Team Workflows', level: 'Foundation', description: 'Organize work, track incidents and connect delivery tasks with team workflows.' },
  grafana: { icon: '📊', category: 'Observability', level: 'Intermediate', description: 'Create useful dashboards, explore metrics and make operational signals easy to interpret.' },
  githubactions: { icon: '⚙️', category: 'CI/CD', level: 'Intermediate', description: 'Automate tests, builds, image scans and controlled release workflows with GitHub Actions.' },
  nexus: { icon: '📦', category: 'Artifact Management', level: 'Intermediate', description: 'Understand artifact repositories, publishing, versioning and dependency distribution.' },
  helm: { icon: '⎈', category: 'Kubernetes Packaging', level: 'Intermediate → Advanced', description: 'Package Kubernetes applications with charts, values, releases and environment-specific configuration.' },
  eks: { icon: '☁️', category: 'AWS Kubernetes', level: 'Advanced', description: 'Explore managed Kubernetes concepts, worker nodes, access, networking and operational readiness.' },
  maven: { icon: '🪶', category: 'Build Engineering', level: 'Foundation → Intermediate', description: 'Understand Java project structure, dependencies, lifecycle phases, tests and build troubleshooting.' },
};

function getCard(tool: (typeof allToolRoadmaps)[number]): RoadmapCard {
  const item = tool as unknown as Record<string, unknown>;
  const slug = String(item.slug ?? '');
  const normalized = slug.toLowerCase().replace(/[^a-z]/g, '');
  const meta = visualMeta[normalized] ?? { icon: '🛠️', category: 'DevOps Engineering', level: 'All levels', description: 'Follow the learning steps, practice the examples and validate your understanding with hands-on work.' };
  return {
    slug,
    title: String(item.title ?? item.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())),
    description: String(item.description ?? item.summary ?? meta.description),
    icon: String(item.icon ?? meta.icon),
    level: String(item.level ?? meta.level),
  };
}

const stages = [
  { n: '01', title: 'Build the foundation', text: 'Learn Linux, Git, networking and how applications run.', color: 'from-sky-500 to-blue-600' },
  { n: '02', title: 'Package applications', text: 'Practice Docker, image building, storage and container networking.', color: 'from-cyan-500 to-teal-600' },
  { n: '03', title: 'Automate delivery', text: 'Build CI/CD pipelines, infrastructure as code and configuration automation.', color: 'from-violet-500 to-indigo-600' },
  { n: '04', title: 'Deploy at scale', text: 'Work with Kubernetes, Helm, EKS and GitOps delivery patterns.', color: 'from-orange-500 to-rose-600' },
  { n: '05', title: 'Operate reliably', text: 'Add monitoring, dashboards, alerting, security and incident response.', color: 'from-emerald-500 to-green-600' },
];

export default function RoadmapMainPage() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All levels');
  const cards = useMemo(() => allToolRoadmaps.map(getCard), []);
  const filtered = cards.filter((card) => {
    const text = `${card.title} ${card.description} ${card.level}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase().trim());
    const matchesLevel = level === 'All levels' || card.level.toLowerCase().includes(level.toLowerCase());
    return matchesQuery && matchesLevel;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
          <Link href="/" className="rounded-lg px-3 py-2 font-semibold hover:bg-white hover:text-blue-600 dark:hover:bg-slate-900">← Home</Link>
          <span>/</span><span className="font-semibold text-slate-800 dark:text-slate-200">DevOps Learning Roadmap</span>
          <Link href="/hands-on-labs" className="ml-auto rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">Open Hands-on Labs →</Link>
        </nav>

        <section className="relative isolate overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14">
          <div className="absolute -right-16 -top-24 -z-10 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 -z-10 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Learning path · Practical engineering</div>
          <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">DevOps Learning Roadmap</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">Go from fundamentals to production-minded DevOps engineering. Learn one tool at a time, understand why it is used, practise real workflows, troubleshoot failures and build evidence of your skills.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[['17', 'Tool roadmaps'], ['5 stages', 'Suggested journey'], ['Learn', 'Concepts + examples'], ['Practise', 'Hands-on validation']].map(([value, label]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"><div className="text-xl font-black text-white">{value}</div><div className="mt-1 text-xs text-slate-400">{label}</div></div>)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3"><a href="#learning-path" className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400">Explore the learning path ↓</a><a href="#tool-roadmaps" className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Browse all tools</a></div>
        </section>

        <section id="learning-path" className="scroll-mt-6 py-12">
          <div className="mb-6"><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">A sensible order</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">How to learn DevOps step by step</h2><p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-400">You do not need to master every tool on day one. Build the fundamentals first, then connect the tools into a delivery workflow. Revisit earlier stages whenever a lab exposes a knowledge gap.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{stages.map((stage) => <article key={stage.n} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className={`h-1.5 bg-gradient-to-r ${stage.color}`} /><div className="p-5"><div className="text-xs font-black tracking-widest text-slate-400">STAGE {stage.n}</div><h3 className="mt-3 text-lg font-extrabold">{stage.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{stage.text}</p></div></article>)}</div>
        </section>

        <section className="mb-12 rounded-3xl border border-blue-100 bg-blue-50/80 p-6 dark:border-blue-900/60 dark:bg-blue-950/30 sm:p-8"><h2 className="text-xl font-black">Use every roadmap like a real engineering task</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['01 · Understand', 'Read the concept and identify the problem the tool solves.'], ['02 · Build', 'Follow the example and type commands in a safe lab environment.'], ['03 · Break & debug', 'Inspect logs, events, configuration and error messages.'], ['04 · Prove it works', 'Run validation checks and write down what you learned.']].map(([title, body]) => <div key={title} className="rounded-2xl bg-white p-4 dark:bg-slate-900"><h3 className="font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{body}</p></div>)}</div></section>

        <section id="tool-roadmaps" className="scroll-mt-6 pb-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Choose your next skill</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Explore all tool roadmaps</h2><p className="mt-2 text-slate-600 dark:text-slate-400">Open a roadmap to study the topics and practical steps in more depth.</p></div><div className="text-sm font-semibold text-slate-500">{filtered.length} of {cards.length} roadmaps</div></div>
          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_220px]"><label className="block"><span className="sr-only">Search roadmaps</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tools, topics or skills…" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900" /></label><label className="block"><span className="sr-only">Filter by level</span><select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900"><option>All levels</option><option>Foundation</option><option>Intermediate</option><option>Advanced</option></select></label></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((card) => <Link key={card.slug} href={`/devops-learning-roadmap/${card.slug}`} className="group flex min-h-56 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-950/5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"><div className="flex items-start justify-between gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl dark:bg-slate-800">{card.icon}</div><span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">{card.level}</span></div><h3 className="mt-4 text-lg font-extrabold group-hover:text-blue-700 dark:group-hover:text-blue-300">{card.title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{card.description}</p><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm dark:border-slate-800"><span className="font-semibold text-slate-500">Open roadmap</span><span className="font-black text-blue-600 transition group-hover:translate-x-1 dark:text-blue-400">Explore →</span></div></Link>)}</div>
          {filtered.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700"><p className="font-bold">No matching roadmap found</p><p className="mt-2 text-sm text-slate-500">Try another tool name or choose “All levels”.</p><button onClick={() => { setQuery(''); setLevel('All levels'); }} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500">Clear filters</button></div>}
        </section>
        <footer className="flex flex-col gap-3 border-t border-slate-200 py-7 text-sm text-slate-500 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between"><p>Learn the concept. Build the workflow. Troubleshoot the failure. Validate the result.</p><div className="flex gap-4"><Link href="/hands-on-labs" className="font-bold text-blue-600 hover:underline dark:text-blue-400">Hands-on Labs</Link><Link href="/" className="font-bold hover:text-blue-600">Back to Home ↑</Link></div></footer>
      </div>
    </main>
  );
}
