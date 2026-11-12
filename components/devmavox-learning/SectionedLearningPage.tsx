"use client";

import { useState } from "react";

type FeatureConfig = {
  title: string;
  purpose: string;
  sections: readonly string[];
};

export function SectionedLearningPage({
  config
}: {
  config: FeatureConfig;
}) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(0);

  const sections = config.sections.map((title, index) => ({
    id: `section-${index + 1}`,
    number: String(index + 1).padStart(2, "0"),
    title
  }));

  function navigateToSection(index: number) {
    setActive(index);
    setExpanded(index);

    document.getElementById(`section-${index + 1}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <header className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            DevMavox Production Learning Lab
          </p>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
            {config.title}
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300">
            {config.purpose}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              `${sections.length} Learning Sections`,
              "Production Learning Structure",
              "Practical Engineering Focus",
              "Hands-on Learning Path"
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-200"
              >
                {item}
              </span>
            ))}
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [String(sections.length), "Learning sections"],
            ["Production", "Learning focus"],
            ["Phase 1", "Section structure"]
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <p className="text-2xl font-black text-cyan-300">{value}</p>
              <p className="mt-1 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-4 lg:sticky lg:top-5">
            <h2 className="px-2 pb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Course Navigation
            </h2>

            <nav className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => navigateToSection(index)}
                  className={`rounded-lg px-3 py-2 text-left text-xs transition ${
                    active === index
                      ? "bg-cyan-400/15 font-bold text-cyan-200"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="mr-2 text-cyan-400">
                    {section.number}
                  </span>
                  {section.title}
                </button>
              ))}
            </nav>
          </aside>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <section
                id={section.id}
                key={section.id}
                className="scroll-mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80"
              >
                <button
                  onClick={() => {
                    setExpanded(expanded === index ? null : index);
                    setActive(index);
                  }}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="rounded-xl border border-cyan-500/30 bg-cyan-400/10 px-3 py-2 text-sm font-black text-cyan-300">
                      {section.number}
                    </span>

                    <div>
                      <h2 className="text-lg font-bold text-white sm:text-xl">
                        {section.title}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Explore the concepts, engineering workflow and
                        production considerations covered by this section.
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-xl text-cyan-300">
                    {expanded === index ? "−" : "+"}
                  </span>
                </button>

                {expanded === index && (
                  <div className="border-t border-slate-800 px-5 pb-6 pt-5 sm:px-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                      Section learning scope
                    </h3>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {[
                        "Core concepts and terminology",
                        "Architecture and component understanding",
                        "Workflow and practical engineering usage",
                        "Production considerations and best practices"
                      ].map((topic, topicIndex) => (
                        <div
                          key={topic}
                          className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3"
                        >
                          <span className="text-xs font-bold text-cyan-400">
                            {String(topicIndex + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm leading-6 text-slate-300">
                            {topic}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                        Practical learning outcome
                      </p>

                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Build an understanding of {section.title} and how it
                        contributes to real-world DevOps engineering.
                      </p>
                    </div>

                    <p className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs leading-6 text-amber-200/80">
                      Phase 1: Section structure created. Detailed explanations,
                      examples, commands, configurations, diagrams and
                      interactive exercises will be added in the next content
                      development phase.
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </section>

        <footer className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-white">
            {config.title} – Learning Roadmap
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            This page establishes the complete section structure. Detailed
            technical content will be developed section by section in the
            next phase.
          </p>
        </footer>
      </div>
    </main>
  );
}
