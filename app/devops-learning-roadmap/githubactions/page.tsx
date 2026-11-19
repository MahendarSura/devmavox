"use client";

import Link from "next/link";
import { useState } from "react";

const modules = [
  { title: "01. GitHub Actions foundations", level: "Foundation", outcome: "Explain how workflow automation runs when repository events occur.", lessons: [
    ["CI/CD concepts and GitHub Actions", "Understand workflow automation, runners, jobs, steps, actions, events and the difference between CI, continuous delivery and deployment."],
    ["Workflow YAML structure", "Create .github/workflows/*.yml files and understand name, on, permissions, env, concurrency, jobs, runs-on, steps, uses and run."],
    ["Events and activity filters", "Configure push, pull_request, workflow_dispatch, schedule and workflow_call; restrict branches, paths and event types to avoid unnecessary runs."],
    ["Hosted and self-hosted runners", "Choose ubuntu-latest, windows-latest, macos-latest or controlled self-hosted runners; understand isolation, labels, capacity and runner security."]
  ]},
  { title: "02. Build and test automation", level: "Beginner", outcome: "Build repeatable CI checks that fail safely and provide useful evidence.", lessons: [
    ["Checkout and runtime setup", "Use actions/checkout and setup-node or setup-python; pin action versions and select a supported runtime version."],
    ["Dependencies and caching", "Install from lockfiles, use npm ci, configure dependency caches with correct keys and understand cache hit/miss behavior."],
    ["Build, lint and test jobs", "Run lint, type checks, unit tests and production builds; publish test reports and preserve exit codes so failed checks block delivery."],
    ["Artifacts and workflow outputs", "Upload build reports and packages with artifact actions; pass small values through step outputs and job outputs instead of rebuilding."]
  ]},
  { title: "03. Secure workflow design", level: "Intermediate", outcome: "Reduce token, supply-chain and untrusted-code risks.", lessons: [
    ["GITHUB_TOKEN permissions", "Set least-privilege permissions per workflow or job; use contents: read by default and grant write scopes only to the job that needs them."],
    ["Secrets and environments", "Store credentials in repository, organization or environment secrets; protect production environments with reviewers and never print secret values."],
    ["Pull request security", "Treat fork pull requests as untrusted; avoid exposing secrets to untrusted code and understand pull_request_target risks."],
    ["Action and dependency pinning", "Pin third-party actions to reviewed full commit SHAs, review release changes and keep dependencies updated."]
  ]},
  { title: "04. Deployment and release", level: "Intermediate", outcome: "Promote tested artifacts through controlled environments.", lessons: [
    ["Container image pipeline", "Build an image, tag it with immutable commit SHA, authenticate to a registry using short-lived credentials and push only after tests pass."],
    ["Deploy to cloud using OIDC", "Federate GitHub identity with a cloud IAM role; scope trust to the repository, branch or protected environment instead of storing long-lived cloud keys."],
    ["Environment approvals and concurrency", "Separate staging and production, require approvals for production, serialize deployments and prevent an older run overwriting a newer release."],
    ["Reusable workflows and composite actions", "Extract repeated CI logic into workflow_call templates or composite actions; define typed inputs, outputs and secrets explicitly."]
  ]},
  { title: "05. Troubleshooting and production operations", level: "Advanced", outcome: "Diagnose failed workflows and operate reliable release automation.", lessons: [
    ["Read workflow logs", "Find the failed job and step, inspect the first meaningful error, compare runner and tool versions, and reproduce the command locally."],
    ["Expression and context debugging", "Use github, env, vars, secrets, needs, steps and matrix contexts correctly; avoid assuming unavailable contexts exist at workflow parse time."],
    ["Matrix builds and conditional jobs", "Use strategy.matrix for supported runtime or platform combinations; control fail-fast, max-parallel and if conditions."],
    ["Workflow reliability", "Use timeouts, concurrency groups, retry only transient operations, retain diagnostic artifacts and make deployment steps idempotent."]
  ]},
  { title: "06. Hands-on production project", level: "Production", outcome: "Deliver a secure application pipeline with validation and rollback evidence.", lessons: [
    ["Create a Node.js CI workflow", "Build a workflow for pull requests and main-branch pushes: checkout, setup Node, npm ci, lint, test, typecheck and build."],
    ["Add Docker publishing", "Build and scan an image, tag it with the commit SHA, push to a test registry and verify the published digest."],
    ["Add protected deployment", "Deploy staging automatically and production only after environment approval; use OIDC and least-privilege cloud permissions."],
    ["Failure injection and recovery", "Intentionally break a test, inspect logs, correct the cause, rerun checks and document the rollback path."]
  ]}
];

export default function GitHubActionsRoadmapPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const total = modules.reduce((n, m) => n + m.lessons.length, 0);
  const toggle = (id: string) => setCompleted((old) => old.includes(id) ? old.filter((x) => x !== id) : [...old, id]);
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-6 text-sm text-slate-400"><Link href="/devops-learning-roadmap" className="hover:text-sky-300">DevOps Learning Roadmap</Link> / GitHub Actions</nav>
        <header className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-7 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-sky-300">CI/CD · Workflow automation</p>
          <h1 className="mt-3 text-3xl font-black sm:text-5xl">GitHub Actions Learning Roadmap</h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">Learn to automate build, test, security checks and deployments directly from GitHub. Progress from workflow YAML fundamentals to secure production releases using runners, environments, artifacts and OIDC.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm"><span className="rounded-full bg-slate-700 px-3 py-2">6 learning modules</span><span className="rounded-full bg-slate-700 px-3 py-2">{total} lessons</span><span className="rounded-full bg-slate-700 px-3 py-2">{completed.length}/{total} completed</span></div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700"><div className="h-full rounded-full bg-sky-400 transition-all" style={{ width: (completed.length / total * 100) + "%" }} /></div>
        </header>
        <section className="mt-8 space-y-5">
          {modules.map((module, index) => <article key={module.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-xs font-bold uppercase tracking-widest text-sky-300">Module {index + 1} · {module.level}</p><span className="text-xs text-slate-400">{module.lessons.filter(([title]) => completed.includes(module.title + title)).length}/{module.lessons.length} lessons</span></div>
            <h2 className="mt-2 text-xl font-extrabold">{module.title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{module.outcome}</p>
            <div className="mt-5 space-y-3">{module.lessons.map(([title, description]) => { const id = module.title + title; return <label key={id} className="flex cursor-pointer gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4"><input type="checkbox" checked={completed.includes(id)} onChange={() => toggle(id)} className="mt-1 h-4 w-4 accent-sky-400" /><span><span className="font-bold">{title}</span><span className="mt-1 block text-sm leading-6 text-slate-400">{description}</span></span></label>; })}</div>
          </article>)}
        </section>
        <section className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5"><h2 className="font-bold text-amber-200">Production safety checklist</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300"><li>Use least-privilege workflow and job permissions.</li><li>Never expose secrets to untrusted pull-request code.</li><li>Pin third-party actions to reviewed immutable commit SHAs.</li><li>Use protected environments and short-lived OIDC credentials for production.</li><li>Keep deployment steps idempotent and document rollback validation.</li></ul></section>
        <footer className="mt-8 flex flex-wrap gap-3"><Link href="/devops-learning-roadmap" className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-sky-400">← All roadmaps</Link><Link href="/devops-a-to-z" className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold hover:bg-slate-800">Explore DevOps A–Z</Link></footer>
        <p className="mt-5 text-xs text-slate-500">Checklist progress is held in this page session and resets on refresh. Validate workflow syntax and action versions against the current GitHub Actions documentation before production use.</p>
      </div>
    </main>
  );
}
