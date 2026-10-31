import Link from "next/link";
import howItWorks from "./how-it-works";
import architectureFlow from "./Architecture & Flow";
import realTimeExamples from "./Real-Time Examples";

const topics = [
  { id: "how-it-works", title: "How It Works", data: howItWorks },
  { id: "architecture-flow", title: "Architecture & Flow", data: architectureFlow },
  { id: "real-time-examples", title: "Real-Time Examples", data: realTimeExamples },
];

export default function TechnicalConceptsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/notes-cheat-sheets" className="text-sm text-cyan-300 hover:underline">
          ← All Notes & Cheat Sheets
        </Link>

        <p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">Learning Notes</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Technical Concepts</h1>
        <p className="mt-3 text-slate-400">
          Practical explanations of DevOps concepts, architecture, commands,
          configuration examples and real-world workflows.
        </p>

        <nav className="mt-8 flex flex-wrap gap-3">
          {topics.map((topic) => (
            <a
              key={topic.id}
              href={`#${topic.id}`}
              className="rounded-lg border border-cyan-800 px-4 py-2 text-sm text-cyan-200 hover:bg-slate-800"
            >
              {topic.title}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-10">
          {topics.map((topic) => (
            <section key={topic.id} id={topic.id} className="scroll-mt-8">
              <h2 className="border-b border-slate-700 pb-3 text-2xl font-bold text-cyan-200">
                {topic.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-300">{topic.data.description}</p>

              {topic.data.sections.map((section) => (
                <article key={section.heading} className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <h3 className="text-xl font-semibold text-white">{section.heading}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{section.explanation}</p>

                  <h4 className="mt-5 font-semibold text-cyan-200">Workflow / Steps</h4>
                  <ol className="mt-3 list-decimal space-y-2 pl-6 leading-7 text-slate-300">
                    {section.steps.map((step) => <li key={step}>{step}</li>)}
                  </ol>

                  {section.commands && (
                    <>
                      <h4 className="mt-5 font-semibold text-cyan-200">Commands</h4>
                      <pre className="mt-3 overflow-x-auto rounded-xl bg-black p-4 text-sm leading-6 text-green-300">
                        <code>{section.commands}</code>
                      </pre>
                    </>
                  )}

                  {section.config && (
                    <>
                      <h4 className="mt-5 font-semibold text-cyan-200">Configuration Example</h4>
                      <pre className="mt-3 overflow-x-auto rounded-xl bg-black p-4 text-sm leading-6 text-sky-200">
                        <code>{section.config}</code>
                      </pre>
                    </>
                  )}

                  {section.problems.length > 0 && (
                    <>
                      <h4 className="mt-5 font-semibold text-cyan-200">Common Issues and Solutions</h4>
                      <div className="mt-3 space-y-3">
                        {section.problems.map((problem) => (
                          <div key={problem.issue} className="rounded-lg border border-slate-700 bg-slate-950 p-4">
                            <p className="font-semibold text-amber-300">{problem.issue}</p>
                            <p className="mt-2 text-sm leading-6 text-slate-300">{problem.solution}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </article>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
