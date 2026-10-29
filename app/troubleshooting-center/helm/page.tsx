import Link from "next/link";
import fs from "node:fs";
import path from "node:path";

const directory = path.join(
  process.cwd(),
  "app",
  "troubleshooting-center",
  "helm"
);

function makeSlug(filename: string) {
  return filename
    .replace(/\.ts$/i, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export default function TroubleshootingToolPage() {
  const topics = fs.readdirSync(directory)
    .filter((file) => file.endsWith(".ts") && file !== "page.ts")
    .sort()
    .map((file) => ({
      file,
      slug: makeSlug(file),
      title: file
        .replace(/\.ts$/i, "")
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/[-_]+/g, " "),
    }));

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl">
        <Link href="/troubleshooting-center" className="text-cyan-600 hover:underline">
          ← Back to Troubleshooting Center
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Helm Troubleshooting</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Select a topic to open its troubleshooting file.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <Link
              key={topic.file}
              href={"/troubleshooting-center/helm/" + topic.slug}
              className="rounded-xl border border-slate-200 bg-white p-5 hover:border-cyan-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <h2 className="font-bold">{topic.title}</h2>
              <p className="mt-2 text-sm text-cyan-600">
                Open troubleshooting guide →
              </p>
            </Link>
          ))}
        </div>
        {topics.length === 0 && (
          <p className="mt-6">No topic files found in this category.</p>
        )}
      </div>
    </main>
  );
}
