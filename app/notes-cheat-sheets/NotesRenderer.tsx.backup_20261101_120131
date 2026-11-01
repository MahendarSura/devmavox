type Problem = {
  issue: string;
  solution: string;
};

type NoteSection = {
  heading: string;
  explanation: string;
  steps: string[];
  commands?: string;
  config?: string;
  problems: Problem[];
};

type NoteData = {
  title: string;
  description: string;
  sections: NoteSection[];
};

type NotesRendererProps = {
  data: NoteData;
  backHref?: string;
  backLabel?: string;
};

export default function NotesRenderer({
  data,
  backHref = "/notes-cheat-sheets",
  backLabel = "All Notes & Cheat Sheets",
}: NotesRendererProps) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center gap-5">
          <a href={backHref} className="text-sm text-cyan-300 hover:underline">
            ← Back to {backLabel}
          </a>
          <a href="/notes-cheat-sheets" className="text-sm text-cyan-300 hover:underline">
            ← All Notes & Cheat Sheets
          </a>
        </div>

        <p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">
          Learning Notes
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{data.title}</h1>
        <p className="mt-4 leading-7 text-slate-300">{data.description}</p>

        <div className="mt-8 space-y-8">
          {data.sections.map((section) => (
            <article key={section.heading} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-bold text-cyan-200">{section.heading}</h2>
              <p className="mt-4 leading-7 text-slate-300">{section.explanation}</p>

              <h3 className="mt-6 font-semibold text-white">Practical Steps</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-6 leading-7 text-slate-300">
                {section.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>

              {section.commands && (
                <>
                  <h3 className="mt-6 font-semibold text-white">Commands</h3>
                  <pre className="mt-3 overflow-x-auto rounded-xl bg-black p-4 text-sm leading-6 text-green-300">
                    <code>{section.commands}</code>
                  </pre>
                </>
              )}

              {section.config && (
                <>
                  <h3 className="mt-6 font-semibold text-white">Configuration Example</h3>
                  <pre className="mt-3 overflow-x-auto rounded-xl bg-black p-4 text-sm leading-6 text-cyan-200">
                    <code>{section.config}</code>
                  </pre>
                </>
              )}

              {section.problems.length > 0 && (
                <>
                  <h3 className="mt-6 font-semibold text-white">Common Issues and Solutions</h3>
                  <div className="mt-3 space-y-3">
                    {section.problems.map((problem) => (
                      <div key={problem.issue} className="rounded-xl border border-slate-700 bg-slate-950 p-4">
                        <p className="font-semibold text-amber-300">{problem.issue}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{problem.solution}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}


