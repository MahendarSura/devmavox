"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { devOpsTools } from "./devops-tools";

const sections = [
  {
    number: "01",
    title: "Revised Commands List",
    description:
      "Linux, Git, Docker, Kubernetes, AWS, Terraform and other DevOps tools with commands for daily practice.",
    details: [
      "Basic Commands",
      "Intermediate Commands",
      "Advanced Commands",
      "Troubleshooting Commands",
    ],
    href: "#revised-commands",
    icon: "⌘",
  },
  {
    number: "02",
    title: "Technical Concepts",
    description:
      "Understand important DevOps concepts with simple explanations and real-time examples.",
    details: ["How It Works", "Architecture & Flow", "Interview Questions"],
    href: "#technical-concepts",
    icon: "◈",
  },
  {
    number: "03",
    title: "YAML & Configuration Notes",
    description:
      "Quick references for Kubernetes YAML, Docker Compose, Jenkinsfiles, GitHub Actions and Terraform HCL.",
    details: ["YAML Files", "Configuration Examples", "Best Practices"],
    href: "#yaml-configuration",
    icon: "{}",
  },
  {
    number: "04",
    title: "Troubleshooting Notes",
    description:
      "Common DevOps errors, diagnostic commands, root causes and step-by-step fixes.",
    details: ["Error Messages", "Root Causes", "Troubleshooting Steps"],
    href: "#troubleshooting",
    icon: "⚙",
  },
  {
    number: "05",
    title: "Interview & Quick Revision Notes",
    description:
      "Revise important interview questions, key terms, comparisons and production scenarios.",
    details: ["Interview Q&A", "Quick Revision", "Important Comparisons"],
    href: "#interview-revision",
    icon: "▤",
  },
  {
    number: "06",
    title: "Real-Time Project Notes",
    description:
      "Follow practical DevOps workflows, deployment checklists, CI/CD pipelines, monitoring and rollback.",
    details: ["Project Workflows", "Deployment Checklists", "CI/CD & Rollback"],
    href: "#real-time-projects",
    icon: "⇧",
  },
];

const toolGroups = [
  { title: "Core", tools: ["Linux", "Bash", "Git", "GitHub"] },
  { title: "Containers", tools: ["Docker", "Docker Compose"] },
  { title: "Orchestration", tools: ["Kubernetes", "Helm", "EKS"] },
  { title: "Cloud & IaC", tools: ["AWS CLI", "Terraform"] },
  { title: "CI/CD", tools: ["Jenkins", "GitHub Actions", "Argo CD"] },
  {
    title: "Automation & Build",
    tools: ["Ansible", "Maven", "Gradle", "Nexus"],
  },
  {
    title: "Monitoring",
    tools: ["Prometheus", "Grafana", "Alertmanager"],
  },
  { title: "Web & Servers", tools: ["NGINX", "Apache Tomcat"] },
  {
    title: "Security",
    tools: ["Trivy", "SonarQube", "Snyk", "OWASP Dependency-Check"],
  },
  { title: "Collaboration", tools: ["Jira", "Slack"] },
];

const commandLevels = [
  "All Levels",
  "Basic",
  "Intermediate",
  "Advanced",
  "Troubleshooting",
] as const;

type LevelFilter = (typeof commandLevels)[number];

export default function NotesCheatSheetsPage() {
  const [selectedTool, setSelectedTool] = useState("Kubernetes");
  const [selectedLevel, setSelectedLevel] =
    useState<LevelFilter>("All Levels");
  const [toolSearch, setToolSearch] = useState("");
  const [commandSearch, setCommandSearch] = useState("");
  const [copiedCommand, setCopiedCommand] = useState("");
  const [copyError, setCopyError] = useState("");

  const availableTools = useMemo(
    () =>
      devOpsTools.filter((tool) =>
        tool.name.toLowerCase().includes(toolSearch.trim().toLowerCase()),
      ),
    [toolSearch],
  );

  const activeTool =
    availableTools.find((tool) => tool.name === selectedTool) ??
    devOpsTools.find((tool) => tool.name === selectedTool) ??
    availableTools[0] ??
    devOpsTools[0];

  const filteredCommands = useMemo(() => {
    if (!activeTool) return [];

    const query = commandSearch.trim().toLowerCase();

    return activeTool.commands.filter((item) => {
      const matchesLevel =
        selectedLevel === "All Levels" || item.level === selectedLevel;

      const matchesSearch =
        !query ||
        item.command.toLowerCase().includes(query) ||
        item.english.toLowerCase().includes(query) ||
        item.telugu.toLowerCase().includes(query);

      return matchesLevel && matchesSearch;
    });
  }, [activeTool, selectedLevel, commandSearch]);

  async function copyCommand(command: string) {
    setCopyError("");

    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(command);

      window.setTimeout(() => {
        setCopiedCommand((current) => (current === command ? "" : current));
      }, 1800);
    } catch {
      setCopyError(
        "Copy failed. Select the command and copy it manually.",
      );
    }
  }

  function chooseTool(name: string) {
    setSelectedTool(name);
    setSelectedLevel("All Levels");
    setCommandSearch("");
    setCopiedCommand("");
    setCopyError("");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <span aria-hidden="true">←</span> Back to Home
        </Link>

        <header className="relative mb-10 overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              DevMavox Learning Hub
            </span>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
              📝 Notes &amp; Cheat Sheets
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Practice DevOps commands, understand technical concepts, revise
              configuration files and learn practical project workflows.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm">
              <span className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2">
                06 Learning Sections
              </span>
              <span className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2">
                {devOpsTools.length} DevOps Tools
              </span>
              <span className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2">
                English + Telugu
              </span>
            </div>
          </div>
        </header>

        <section aria-labelledby="sections-heading">
          <div className="mb-5">
            <h2 id="sections-heading" className="text-2xl font-bold">
              Explore Notes
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Select a section to explore its learning resources.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {sections.map((section) => (
              <a
                key={section.number}
                href={section.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-slate-900 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-xl font-bold text-cyan-300">
                    {section.icon}
                  </span>
                  <span className="text-sm font-semibold tracking-widest text-slate-500">
                    {section.number}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold transition group-hover:text-cyan-300">
                  {section.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                  {section.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-slate-800 pt-4">
                  {section.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <span className="text-cyan-400" aria-hidden="true">
                        ✓
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between text-sm font-semibold text-cyan-300">
                  <span>Explore section</span>
                  <span
                    className="transition group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Revised Commands List */}
        <section
          id="revised-commands"
          className="mt-12 scroll-mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
                Command Reference
              </span>
              <h2 className="mt-2 text-2xl font-bold">
                Revised Commands List
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Select a tool, filter command levels and practice every day.
              </p>
            </div>

            <span className="w-fit rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400">
              Basic · Intermediate · Advanced · Troubleshooting
            </span>
          </div>

          <div className="mt-6">
            <label
              htmlFor="tool-search"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Search tools
            </label>

            <input
              id="tool-search"
              type="search"
              value={toolSearch}
              onChange={(event) => setToolSearch(event.target.value)}
              placeholder="Search Linux, Docker, Kubernetes, AWS..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <div className="mt-5 space-y-5">
            {toolGroups.map((group) => {
              const groupTools = group.tools.filter((name) =>
                availableTools.some((tool) => tool.name === name),
              );

              if (groupTools.length === 0) return null;

              return (
                <div
                  key={group.title}
                  className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
                >
                  <h3 className="font-semibold text-white">{group.title}</h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {groupTools.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => chooseTool(name)}
                        aria-pressed={activeTool?.name === name}
                        className={`rounded-lg border px-3 py-2 text-sm transition ${
                          activeTool?.name === name
                            ? "border-cyan-400 bg-cyan-400/15 text-cyan-200"
                            : "border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-400/50 hover:text-white"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {availableTools.length === 0 && (
            <p className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm text-amber-200">
              No tools match your search. Try another tool name.
            </p>
          )}

          {activeTool && (
            <div className="mt-7">
              <div className="flex flex-col gap-3 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-cyan-300">
                    {activeTool.name} Commands
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {activeTool.category} · {activeTool.commands.length} commands
                  </p>
                </div>

                <label className="flex flex-col gap-2 text-sm text-slate-300 sm:min-w-52">
                  Command level
                  <select
                    value={selectedLevel}
                    onChange={(event) =>
                      setSelectedLevel(event.target.value as LevelFilter)
                    }
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-cyan-400"
                  >
                    {commandLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="command-search"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Search commands and explanations
                </label>

                <input
                  id="command-search"
                  type="search"
                  value={commandSearch}
                  onChange={(event) => setCommandSearch(event.target.value)}
                  placeholder="Search a command or explanation..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>

              <p className="mt-4 text-sm text-slate-400">
                Showing {filteredCommands.length} of {activeTool.commands.length}{" "}
                commands
              </p>

              <div className="mt-4 space-y-4">
                {filteredCommands.map((item, index) => (
                  <article
                    key={`${activeTool.name}-${item.level}-${item.command}-${index}`}
                    className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                        {item.level}
                      </span>

                      <button
                        type="button"
                        onClick={() => copyCommand(item.command)}
                        className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
                      >
                        {copiedCommand === item.command
                          ? "✓ Copied"
                          : "Copy command"}
                      </button>
                    </div>

                    <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-800 bg-black/40 p-4 text-sm leading-6 text-emerald-300">
                      <code>{item.command}</code>
                    </pre>

                    <div className="mt-4 space-y-2">
                      <p className="text-sm leading-6 text-slate-300">
                        <span className="font-semibold text-cyan-300">
                          English:
                        </span>{" "}
                        {item.english}
                      </p>

                      <p className="text-sm leading-7 text-slate-300">
                        <span className="font-semibold text-amber-300">
                          తెలుగు:
                        </span>{" "}
                        {item.telugu}
                      </p>
                    </div>
                  </article>
                ))}

                {filteredCommands.length === 0 && (
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 text-center">
                    <p className="font-semibold text-slate-200">
                      No matching commands found.
                    </p>
                    <p className="mt-2 text-sm text-slate-400">
                      Change the level or search term to see more commands.
                    </p>
                  </div>
                )}
              </div>

              {copyError && (
                <p
                  role="alert"
                  className="mt-4 rounded-lg border border-amber-400/20 bg-amber-400/5 p-3 text-sm text-amber-200"
                >
                  {copyError}
                </p>
              )}
            </div>
          )}
        </section>

        {/* Technical Concepts */}
        <section
          id="technical-concepts"
          className="mt-6 scroll-mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-7"
        >
          <h2 className="text-xl font-bold">Technical Concepts</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Docker vs VM, Kubernetes architecture, CI/CD, Terraform state,
            GitOps, AWS VPC, IAM, and Blue-Green vs Canary deployment.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Concept notes and diagrams will be added next.
          </p>
        </section>

        {/* YAML and Configuration */}
        <section
          id="yaml-configuration"
          className="mt-6 scroll-mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-7"
        >
          <h2 className="text-xl font-bold">YAML &amp; Configuration Notes</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Kubernetes manifests, Docker Compose, Jenkinsfile, GitHub Actions,
            Ansible playbooks and Terraform HCL.
          </p>
        </section>

        {/* Troubleshooting */}
        <section
          id="troubleshooting"
          className="mt-6 scroll-mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-7"
        >
          <h2 className="text-xl font-bold">Troubleshooting Notes</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Common errors, error messages, diagnostic commands, root causes
            and step-by-step fixes.
          </p>
        </section>

        {/* Interview and Revision */}
        <section
          id="interview-revision"
          className="mt-6 scroll-mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-7"
        >
          <h2 className="text-xl font-bold">
            Interview &amp; Quick Revision Notes
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Important interview Q&amp;A, last-minute revision sheets,
            comparisons, key terms and production scenarios.
          </p>
        </section>

        {/* Real-Time Projects */}
        <section
          id="real-time-projects"
          className="mt-6 scroll-mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-7"
        >
          <h2 className="text-xl font-bold">Real-Time Project Notes</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            End-to-end DevOps workflows, commands used in projects, deployment
            checklists, CI/CD flow, monitoring and rollback.
          </p>
        </section>

        <footer className="py-10 text-center text-xs text-slate-500">
          DevMavox · Learn DevOps in Telugu &amp; English
        </footer>
      </div>
    </main>
  );
}
