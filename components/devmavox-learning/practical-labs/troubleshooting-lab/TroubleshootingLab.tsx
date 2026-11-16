"use client";
import { validatePracticalLabYaml } from "../semanticYamlValidation";


import { useMemo, useState } from "react";
import { TL01InvalidContainerImageTag as Lab1 } from "./labs/TL01InvalidContainerImageTag";
import { TL02ContainerExitsImmediately as Lab2 } from "./labs/TL02ContainerExitsImmediately";
import { TL03SecretExposedInManifest as Lab3 } from "./labs/TL03SecretExposedInManifest";

type Lab = {
  id: string;
  title: string;
  severity: string;
  businessImpact: string;
  incident: string;
  brokenYaml: string;
  fixedYaml: string;
  commands: readonly { command: string; purpose: string; output: string }[];
  rootCause: string;
  validation: readonly string[];
  recovery: string;
  prevention: readonly string[];
  assessment: readonly string[];
};

const LABS: Lab[] = [Lab1, Lab2, Lab3];

export default function TroubleshootingLab() {
  const [selected, setSelected] = useState(0);
  const [yaml, setYaml] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [executed, setExecuted] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [report, setReport] = useState(false);
  const lab = LABS[selected];

  const score = useMemo(() => {
    const cause = rootCause.toLowerCase();
    const keywords = ["selector", "label", "configmap", "reference", "mismatch", "namespace", "image", "command", "secret", "validation", "replica", "drift", "git", "helm"];
    const matches = keywords.filter(word => cause.includes(word)).length;
    return Math.min(100, (started ? 10 : 0) + Math.min(30, executed.length * 10) + Math.min(30, matches * 10) + (validated ? 30 : 0));
  }, [rootCause, executed, started, validated]);

  function reset() {
    setStarted(false);
    setYaml("");
    setRootCause("");
    setExecuted([]);
    setValidated(false);
    setReport(false);
  }

  function startLab() {
    setYaml(lab.brokenYaml);
    setRootCause("");
    setExecuted([]);
    setStarted(true);
    setValidated(false);
    setReport(false);
  }

  function validate() {
    /* DEVMAVOX_SHARED_SEMANTIC_VALIDATION */
    setValidated(
      validatePracticalLabYaml(yaml, lab.brokenYaml, lab.fixedYaml)
    );
  }

  return (
    <main className="space-y-6 p-4 md:p-6">
      <header>
        <p className="text-sm font-semibold text-blue-600">DEVOPS PRACTICAL WORKSPACE</p>
        <h1 className="text-2xl font-bold">Troubleshooting Lab</h1>
        <p className="mt-2 text-sm text-amber-700">LOCAL SIMULATION ONLY — commands do not execute against a real cluster, CI runner, Helm installation, or Argo CD server.</p>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        {LABS.map((item, index) => (
          <button type="button" key={item.id} onClick={() => { setSelected(index); reset(); }}
            className={`rounded-xl border p-4 text-left ${selected === index ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}>
            <span className="text-xs font-semibold">{item.id}</span>
            <h2 className="mt-2 font-bold">{item.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{item.severity} severity</p>
          </button>
        ))}
      </section>

      <section className="space-y-3 rounded-xl border p-5">
        <h2 className="text-xl font-bold">{lab.title}</h2>
        <p>{lab.incident}</p>
        <p className="text-sm text-gray-600">Business impact: {lab.businessImpact}</p>
        <button type="button" onClick={startLab} className="rounded-lg bg-blue-600 px-4 py-2 text-white">Start / Reproduce Incident</button>
      </section>

      {started && <>
        <section className="space-y-3 rounded-xl border p-5">
          <h2 className="font-bold">1. Broken configuration editor</h2>
          <textarea value={yaml} onChange={event => { setYaml(event.target.value); setValidated(false); }}
            spellCheck={false} className="min-h-80 w-full rounded-lg border bg-gray-950 p-4 font-mono text-sm text-green-300" />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => { setYaml(lab.fixedYaml); setValidated(false); }} className="rounded-lg border px-4 py-2">Load reference repair</button>
            <button type="button" onClick={validate} className="rounded-lg bg-green-700 px-4 py-2 text-white">Validate repair</button>
          </div>
          {validated && <p className="text-green-700">Exercise validation passed.</p>}
          {!validated && <p className="text-sm text-gray-500">Correct the incident-specific configuration before validating.</p>}
        </section>

        <section className="space-y-4 rounded-xl border p-5">
          <h2 className="font-bold">2. Incident investigation terminal</h2>
          {lab.commands.map((step, index) => (
            <div key={step.command} className="rounded-lg border p-3">
              <p className="font-semibold">{step.purpose}</p>
              <code className="my-2 block overflow-x-auto rounded bg-gray-950 p-3 text-sm text-green-300">{step.command}</code>
              <button type="button" onClick={() => setExecuted(old => old.includes(index) ? old : [...old, index])}
                className="rounded bg-slate-800 px-3 py-2 text-sm text-white">Execute simulated command</button>
              {executed.includes(index) && <pre className="mt-3 whitespace-pre-wrap rounded bg-gray-100 p-3 text-sm">{step.output}</pre>}
            </div>
          ))}
        </section>

        <section className="space-y-3 rounded-xl border p-5">
          <h2 className="font-bold">3. Root cause analysis</h2>
          <p className="text-sm text-gray-600">Explain what failed, why it failed, and how you identified the issue.</p>
          <textarea value={rootCause} onChange={event => setRootCause(event.target.value)}
            className="min-h-28 w-full rounded-lg border p-3" placeholder="Write your root cause analysis..." />
          <details>
            <summary className="cursor-pointer font-semibold">Show reference explanation</summary>
            <p className="mt-2">{lab.rootCause}</p>
          </details>
        </section>

        <section className="space-y-3 rounded-xl border p-5">
          <h2 className="font-bold">4. Recovery and prevention</h2>
          <p>{lab.recovery}</p>
          <h3 className="font-semibold">Prevention checklist</h3>
          {lab.prevention.map(item => <p key={item}>• {item}</p>)}
        </section>

        <section className="space-y-3 rounded-xl border p-5">
          <h2 className="font-bold">5. Practical assessment</h2>
          {lab.assessment.map((item, index) => <p key={item}>{index + 1}. {item}</p>)}
          <p className="font-bold">Progress score: {score}/100</p>
          <div className="h-3 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full bg-blue-600" style={{ width: `${score}%` }} />
          </div>
          <p className="text-sm text-gray-500">Practice score based on incident reproduction, commands, root cause keywords, and repair validation.</p>
          <button type="button" onClick={() => setReport(true)} className="rounded-lg bg-indigo-600 px-4 py-2 text-white">Generate incident report</button>
        </section>

        {report && <section className="space-y-2 rounded-xl border border-green-500 p-5">
          <h2 className="font-bold">Incident report</h2>
          <p>Incident: {lab.title}</p>
          <p>Severity: {lab.severity}</p>
          <p>Commands executed: {executed.length}/{lab.commands.length}</p>
          <p>Repair validation: {validated ? "Passed" : "Not passed"}</p>
          <p>Assessment score: {score}/100</p>
          <p>Root cause: {rootCause || "Not provided"}</p>
          <button type="button" onClick={() => {
            const content = `Incident: ${lab.title}\nSeverity: ${lab.severity}\nCommands: ${executed.length}/${lab.commands.length}\nValidation: ${validated}\nScore: ${score}/100\nRoot cause: ${rootCause}`;
            void navigator.clipboard?.writeText(content);
          }} className="rounded-lg border px-4 py-2">Copy report</button>
        </section>}
      </>}

      <footer className="flex flex-wrap gap-2">
        <button type="button" onClick={reset} className="rounded-lg border px-4 py-2">Reset lab</button>
        <button type="button" onClick={() => { setSelected(current => (current + 1) % LABS.length); reset(); }}
          className="rounded-lg bg-slate-800 px-4 py-2 text-white">Next lab</button>
      </footer>
    </main>
  );
}