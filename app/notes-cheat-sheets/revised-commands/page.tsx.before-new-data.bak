"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { devOpsTools } from "../commands-data";

const levels = [
  "All Levels",
  "Basic",
  "Intermediate",
  "Advanced",
  "Troubleshooting",
];

export default function RevisedCommandsPage() {
  const [toolName, setToolName] = useState(devOpsTools[0]?.name ?? "");
  const [level, setLevel] = useState("All Levels");
  const [search, setSearch] = useState("");
  const [toolSearch, setToolSearch] = useState("");
  const [copied, setCopied] = useState("");
  const [copyError, setCopyError] = useState(false);

  const tool = devOpsTools.find((item) => item.name === toolName);

  const tools = devOpsTools.filter((item) =>
    item.name.toLowerCase().includes(toolSearch.toLowerCase())
  );

  const commands = useMemo(
    () =>
      (tool?.commands ?? []).filter(
        (item) =>
          (level === "All Levels" || item.level === level) &&
          `${item.command} ${item.english} ${item.telugu}`
            .toLowerCase()
            .includes(search.toLowerCase())
      ),
    [tool, level, search]
  );

  async function copyCommand(command: string) {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(command);
      setCopyError(false);
    } catch {
      setCopyError(true);
      setCopied("");
    }
  }

  function chooseTool(name: string) {
    setToolName(name);
    setLevel("All Levels");
    setSearch("");
    setCopied("");
    setCopyError(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/notes-cheat-sheets"
          className="text-sm text-cyan-300 hover:underline"
        >
          ← All Notes & Cheat Sheets
        </Link>

        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-cyan-300">
          Command Library
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Revised Commands List
        </h1>

        <p className="mt-3 text-slate-400">
          Choose a tool, filter by difficulty, search commands and copy them
          for practice.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <label
              htmlFor="toolSearch"
              className="mb-2 block text-sm font-semibold"
            >
              Search tools
            </label>

            <input
              id="toolSearch"
              value={toolSearch}
              onChange={(e) => setToolSearch(e.target.value)}
              placeholder="Linux, Docker, AWS..."
              className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm"
            />

            <div className="max-h-[60vh] space-y-2 overflow-y-auto">
              {tools.map((item) => (
                <button
                  key={item.name}
                  onClick={() => chooseTool(item.name)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                    toolName === item.name
                      ? "bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/40"
                      : "hover:bg-slate-800"
                  }`}
                >
                  {item.name}
                  <span className="float-right text-slate-500">
                    {item.commands.length}
                  </span>
                </button>
              ))}

              {tools.length === 0 && (
                <p className="text-sm text-slate-400">No tools found.</p>
              )}
            </div>
          </aside>

          <section className="min-w-0">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="text-2xl font-bold">
                {tool?.name ?? "No tool selected"}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {tool?.category} · {commands.length} matching commands
              </p>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search commands and explanations..."
                className="mt-5 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm"
              />

              <div className="mt-4 flex flex-wrap gap-2">
                {levels.map((item) => (
                  <button
                    key={item}
                    onClick={() => setLevel(item)}
                    className={`rounded-full border px-3 py-2 text-xs ${
                      level === item
                        ? "border-cyan-400 text-cyan-200"
                        : "border-slate-700 text-slate-400"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              {commands.map((item, index) => (
                <article
                  key={`${item.command}-${index}`}
                  className="border-b border-slate-800 py-4"
                >
                  <div className="grid grid-cols-1 items-start gap-x-4 gap-y-2 md:grid-cols-[260px_minmax(0,1fr)_125px]">
                    <code className="break-all font-mono text-sm text-emerald-300">
                      {item.command}
                    </code>

                    <div className="min-w-0">
                      <p className="text-sm leading-6 text-slate-300">
                        {item.english}
                      </p>

                      {item.telugu && (
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {item.telugu}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => copyCommand(item.command)}
                      className="w-fit whitespace-nowrap text-sm text-cyan-300 hover:text-cyan-200"
                    >
                      {copied === item.command ? "[Copied!]" : "[Copy command]"}
                    </button>
                  </div>

                  {copyError && (
                    <p role="alert" className="mt-2 text-sm text-amber-300">
                      Copy failed. Select the command and copy it manually.
                    </p>
                  )}
                </article>
              ))}

              {commands.length === 0 && (
                <p className="rounded-xl border border-slate-800 p-5 text-slate-400">
                  No commands match your filters.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
