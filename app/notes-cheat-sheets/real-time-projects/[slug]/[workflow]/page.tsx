import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const workflows = {
  "docker-compose": {
    title: "Docker Compose",
    subtitle: "Application Architecture",
    file: "docker-compose-workflow.md",
    number: "01",
  },
  kubernetes: {
    title: "Kubernetes",
    subtitle: "Application Delivery",
    file: "kubernetes-workflow.md",
    number: "02",
  },
  monitoring: {
    title: "Monitoring",
    subtitle: "Incident Response",
    file: "monitoring-workflow.md",
    number: "03",
  },
};

export function generateStaticParams() {
  return Object.keys(workflows).map((workflow) => ({
    slug: "project-workflows",
    workflow,
  }));
}

const markdownComponents = {
  h2: ({ children }: any) => (
    <h2 className="mb-5 mt-2 border-b border-cyan-500/30 pb-4 text-2xl font-bold tracking-tight text-cyan-300 sm:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="mb-3 mt-8 flex items-center gap-2 text-lg font-bold text-white">
      <span className="h-5 w-1 rounded-full bg-cyan-400" />
      {children}
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="my-3 text-sm leading-8 text-slate-300 sm:text-base">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="my-4 list-disc space-y-3 pl-6 text-sm leading-7 text-slate-300 sm:text-base">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="my-4 list-decimal space-y-3 pl-6 text-sm leading-7 text-slate-300 marker:font-bold marker:text-cyan-400 sm:text-base">
      {children}
    </ol>
  ),
  li: ({ children }: any) => <li className="pl-1">{children}</li>,
  pre: ({ children }: any) => (
    <pre className="my-5 overflow-x-auto rounded-xl border border-slate-700 bg-[#080d18] p-4 text-sm leading-7 text-green-300 shadow-inner sm:p-5">
      {children}
    </pre>
  ),
  code: ({ children, className }: any) => (
    <code className={`${className ?? ""} rounded text-cyan-200`}>
      {children}
    </code>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="my-5 rounded-r-xl border-l-4 border-amber-400 bg-amber-400/10 p-4 text-sm leading-7 text-amber-100">
      {children}
    </blockquote>
  ),
  strong: ({ children }: any) => (
    <strong className="font-bold text-white">{children}</strong>
  ),
  hr: () => <hr className="my-8 border-slate-700" />,
};

export default async function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ slug: string; workflow: string }>;
}) {
  const { slug, workflow } = await params;

  if (slug !== "project-workflows") notFound();

  const item = workflows[workflow as keyof typeof workflows];
  if (!item) notFound();

  const markdownPath = path.join(
    process.cwd(),
    "docs",
    "real-time-projects",
    item.file
  );

  if (!fs.existsSync(markdownPath)) {
    throw new Error(`Workflow content file not found: ${item.file}`);
  }

  const markdown = fs.readFileSync(markdownPath, "utf8");

  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const documentTitle = titleMatch?.[1] ?? item.title;
  const contentWithoutTitle = markdown.replace(/^#\s+.+\r?\n?/, "");
  const parts = contentWithoutTitle.split(/(?=^##\s)/m);
  const introduction = parts[0]?.trim() ?? "";
  const sections = parts.slice(1).filter((part) => part.trim().length > 0);

  return (
    <main className="min-h-screen bg-[#080d18] px-4 py-10 text-slate-100 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-slate-800 pb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            Real-Time Projects / Workflow {item.number}
          </p>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            {item.title}
          </h1>

          <p className="mt-3 text-lg font-semibold text-cyan-300">
            {item.subtitle}
          </p>

          <div className="mt-4 h-1 w-24 rounded-full bg-cyan-400" />

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
            {introduction}
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-slate-700 bg-slate-900 p-5">
          <p className="text-sm font-bold text-cyan-400">
            WORKFLOW {item.number}
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">
            {documentTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Detailed implementation guide with practical steps, commands,
            configuration examples and production troubleshooting.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <article
              key={index}
              className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-xl sm:p-8"
            >
              <div className="mb-5 inline-flex rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
                Section {String(index + 1).padStart(2, "0")}
              </div>

              <div className="project-markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {section.trim()}
                </ReactMarkdown>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-slate-700 bg-slate-900 p-5 text-center">
          <p className="text-sm leading-7 text-slate-400">
            Follow the workflow step by step, validate each stage and document
            production changes.
          </p>
          <a
            href="/notes-cheat-sheets/real-time-projects/project-workflows"
            className="mt-4 inline-flex rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
          >
            ← Back to All Workflows
          </a>
        </div>
      </div>
    </main>
  );
}
