"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Props = { category: string; section: string; topic: string; categorySlug: string; sectionSlug: string };

const commandSets: Record<string, string[]> = {
  Linux: ["whoami && id", "df -h && free -h", "ps aux --sort=-%cpu | head", "systemctl status <service>", "journalctl -u <service> --since '15 minutes ago'"],
  Git: ["git status --short --branch", "git log --oneline --decorate -8", "git diff --stat", "git diff --check", "git status"],
  Docker: ["docker ps -a", "docker logs --tail 100 <container>", "docker inspect <container>", "docker stats --no-stream", "docker compose ps"],
  Kubernetes: ["kubectl get pods -A -o wide", "kubectl describe pod <pod> -n <namespace>", "kubectl get events -n <namespace> --sort-by=.lastTimestamp", "kubectl logs <pod> -n <namespace> --previous", "kubectl rollout status deployment/<name> -n <namespace>"],
  AWS: ["aws sts get-caller-identity", "aws ec2 describe-instances", "aws cloudwatch describe-alarms", "aws cloudtrail lookup-events --max-results 10", "aws configure list"],
  "CI/CD": ["git status --short", "npm ci", "npm test -- --runInBand", "npm run build", "git log -5 --oneline"],
  IaC: ["terraform fmt -check -recursive", "terraform validate", "terraform plan -out=tfplan", "terraform show tfplan", "ansible-playbook --syntax-check site.yml"],
  Monitoring: ["promtool check rules rules.yml", "curl -s http://localhost:9090/-/healthy", "curl -s http://localhost:9090/api/v1/targets", "systemctl status prometheus", "journalctl -u prometheus -n 100 --no-pager"],
  Security: ["git grep -nE '(AKIA[0-9A-Z]{16}|BEGIN PRIVATE KEY)' -- .", "docker image ls", "kubectl auth can-i --list -n <namespace>", "aws iam get-account-summary", "git status --short"],
  "GitOps & Automation": ["argocd app get <app>", "argocd app diff <app>", "argocd app history <app>", "helm lint ./chart", "helm template <release> ./chart"],
  Production: ["date -Is", "uptime", "df -h", "free -m", "journalctl --since '-15 minutes' -p warning"],
  Interview: ["Explain the symptom and customer impact", "State the first three read-only checks", "Identify the safest mitigation", "Describe how you would verify recovery", "Name the evidence required for an RCA"],
};

function titleCase(value: string) { return value.replace(/([A-Z])/g, " $1").replace(/\s+/g, " ").trim(); }

export default function DailyChallengeWorkspace({ category, section, topic, categorySlug, sectionSlug }: Props) {
  const commands = commandSets[category] ?? commandSets.Production;
  const [completed, setCompleted] = useState<number[]>([]);
  const [hint, setHint] = useState(0);
  const [validated, setValidated] = useState(false);
  const [notes, setNotes] = useState("");
  const percent = Math.round((completed.length / 5) * 100);
  const checks = useMemo(() => [
    "I reproduced or clearly documented the reported symptom.",
    "I collected evidence before changing the system.",
    "I isolated the likely root cause and ruled out alternatives.",
    "I applied the smallest safe corrective action in a lab or approved window.",
    "I verified service health and recorded prevention actions.",
  ], []);
  const steps = [
    { title: "Establish impact and scope", body: "Identify the affected service, environment, start time, customer impact and whether the issue is isolated or widespread. Record a baseline before making changes." },
    { title: "Collect evidence safely", body: "Run the read-only diagnostic commands below. Capture timestamps, exit codes, relevant logs and resource or deployment state. Redact credentials and personal data." },
    { title: "Form and test a root-cause hypothesis", body: "Compare the observed state with the expected state. Change one variable at a time in a disposable lab, and use the result to confirm or reject the hypothesis." },
    { title: "Recover with a controlled change", body: "Choose the smallest reversible fix. Confirm ownership, blast radius, backup or rollback path, and approval before applying any production change." },
    { title: "Validate and prevent recurrence", body: "Verify user-facing health, metrics, logs and dependent services. Record the final state, follow-up actions, alert improvements and a concise incident timeline." },
  ];
  const hints = [
    "Start with scope and a timestamp. Avoid restarting services or deleting resources before you have captured evidence.",
    "Use the category's read-only commands first. Compare healthy and unhealthy instances, recent changes and event timelines.",
    "A useful root-cause explanation connects a specific configuration or dependency to the observed symptom and explains why the evidence supports it.",
  ];
  return (
    <main className="min-h-screen bg-[#080d18] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href={`/daily-devops-challenge/${categorySlug}/${sectionSlug}`} className="text-sm text-lime-300 hover:text-white">← Back to {section}</Link>
        <header className="mt-5 overflow-hidden rounded-3xl border border-lime-400/25 bg-gradient-to-br from-[#18251c] via-[#111d2b] to-[#20152a] p-6 sm:p-9">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-lime-300"><span>{category}</span><span className="text-slate-500">/</span><span>{section}</span><span className="text-slate-500">/</span><span>Daily challenge</span></div>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">{titleCase(topic)}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">A practical DevOps exercise: investigate the scenario, gather evidence, choose a safe fix, and prove the system is healthy again. Use a disposable lab unless you have explicit production authorization.</p>
          <div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-200">Intermediate</span><span className="rounded-full bg-sky-400/10 px-3 py-1 text-xs text-sky-200">30–45 minutes</span><span className="rounded-full bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-200">Scenario-based</span></div>
        </header>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-rose-300">Challenge brief</p>
            <h2 className="mt-2 text-xl font-bold text-white">A service has become unhealthy after a recent operational change</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">The on-call engineer reports that <strong className="text-white">{topic.toLowerCase()}</strong> is affecting a workload in the {category} environment. Your task is to identify the failure domain, use evidence to establish the root cause, recover safely, and document how to prevent a repeat incident.</p>
            <div className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/5 p-4 text-sm text-slate-300"><strong className="text-rose-200">Symptoms to investigate:</strong> unexpected failures, a recent change, incomplete health signals, and uncertainty about whether dependent services are affected. Do not assume the first visible error is the root cause.</div>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-lime-300">Your progress</p>
            <div className="mt-3 text-4xl font-black tabular-nums text-white">{percent}%</div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-lime-400 transition-all" style={{ width: percent + "%" }} /></div>
            <p className="mt-2 text-xs text-slate-400">{completed.length} of 5 investigation stages checked off</p>
            <button onClick={() => { setCompleted([]); setValidated(false); setHint(0); }} className="mt-4 text-xs text-slate-400 underline hover:text-white">Reset this attempt</button>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-700 bg-slate-900/80 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Investigation workflow</p><h2 className="mt-1 text-xl font-bold text-white">Work through the incident</h2></div><span className="text-xs text-slate-400">Check each stage as you complete it</span></div>
          <div className="mt-5 space-y-3">{steps.map((step, index) => <label key={step.title} className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${completed.includes(index) ? "border-lime-400/30 bg-lime-400/5" : "border-slate-700 bg-slate-950/50"}`}><input type="checkbox" checked={completed.includes(index)} onChange={(event) => setCompleted((old) => event.target.checked ? [...old, index] : old.filter((n) => n !== index))} className="mt-1 h-4 w-4 accent-lime-400" /><span><strong className="text-sm text-white">{index + 1}. {step.title}</strong><span className="mt-1 block text-sm leading-6 text-slate-400">{step.body}</span></span></label>)}</div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-sky-300">Diagnostic terminal</p><h2 className="mt-1 text-lg font-bold text-white">Start with read-only checks</h2><p className="mt-2 text-xs leading-5 text-slate-400">Replace placeholders with your lab resource names. Review commands before execution; some cloud CLI commands may incur charges or reveal sensitive metadata.</p>
            <div className="mt-4 space-y-2">{commands.map((command) => <div key={command} className="flex items-center justify-between gap-2 rounded-lg border border-slate-700 bg-[#070b12] px-3 py-3"><code className="min-w-0 break-all text-xs text-emerald-200">{command}</code><button onClick={() => navigator.clipboard?.writeText(command)} className="shrink-0 rounded-md border border-slate-600 px-2 py-1 text-[10px] text-slate-300 hover:bg-slate-800">Copy</button></div>)}</div>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Progressive hints</p><h2 className="mt-1 text-lg font-bold text-white">Need a nudge?</h2><p className="mt-2 text-sm text-slate-400">Reveal one hint at a time. Try to reason through the evidence before opening the next one.</p>
            <div className="mt-4 space-y-3">{hints.slice(0, hint).map((item, index) => <div key={item} className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4"><p className="text-xs font-bold text-amber-200">HINT {index + 1}</p><p className="mt-2 text-sm leading-6 text-slate-300">{item}</p></div>)}</div>
            <button disabled={hint >= hints.length} onClick={() => setHint((n) => Math.min(hints.length, n + 1))} className="mt-4 rounded-lg bg-amber-300 px-4 py-2 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">{hint >= hints.length ? "All hints revealed" : "Reveal next hint"}</button>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-violet-400/20 bg-violet-400/5 p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-300">Solution framework</p><h2 className="mt-1 text-xl font-bold text-white">What a strong resolution should contain</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[{t:"Evidence",d:"Commands, timestamps, events and logs that support the diagnosis."},{t:"Root cause",d:"The precise failure mechanism, not just the visible symptom."},{t:"Recovery",d:"A minimal, reversible action with an explicit rollback path."},{t:"Prevention",d:"A guardrail, alert, test or runbook update that reduces recurrence."}].map((x) => <div key={x.t} className="rounded-xl border border-violet-300/15 bg-slate-950/40 p-4"><strong className="text-sm text-violet-200">{x.t}</strong><p className="mt-2 text-xs leading-5 text-slate-400">{x.d}</p></div>)}</div>
          <p className="mt-4 text-sm leading-6 text-slate-300">There is no safe universal fix for every environment. Choose the remediation only after confirming the cause and checking its blast radius. Avoid destructive commands, broad permission changes, blind restarts and unreviewed infrastructure applies.</p>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-700 bg-slate-900/80 p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Validation and review</p><h2 className="mt-1 text-xl font-bold text-white">Prove the system is healthy</h2>
          <div className="mt-4 space-y-3">{checks.map((check) => <div key={check} className="flex items-start gap-3 text-sm text-slate-300"><span className="mt-0.5 text-emerald-300">✓</span>{check}</div>)}</div>
          <label className="mt-5 block text-xs font-semibold text-slate-300">Your incident notes / root-cause summary<textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={5} placeholder="Symptoms → evidence → root cause → safe recovery → verification → prevention..." className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none focus:border-lime-400" /></label>
          <button onClick={() => setValidated(true)} disabled={completed.length !== 5 || notes.trim().length < 30} className="mt-4 rounded-xl bg-emerald-300 px-5 py-3 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">Validate my attempt</button>
          {validated && <p role="status" className="mt-3 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm text-emerald-200">Attempt checklist complete. Review your evidence and ensure the fix was tested safely before considering the incident resolved.</p>}
        </section>
        <footer className="mt-8 flex flex-wrap justify-between gap-3 border-t border-slate-800 pt-5 text-xs text-slate-500"><span>DevMavox · Daily DevOps Challenge</span><Link href={`/daily-devops-challenge/${categorySlug}`} className="text-lime-300 hover:text-white">Explore more {category} challenges →</Link></footer>
      </div>
    </main>
  );
}
