import Link from "next/link";
import fs from "node:fs";
import path from "node:path";

export default function TroubleshootingToolPage() {
  const directory = path.join(process.cwd(), "app", "troubleshooting-center", "networking");
  const topics = fs.readdirSync(directory)
    .filter((file) => file.endsWith(".ts") && file !== "page.ts")
    .sort();

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl">
        <Link href="/troubleshooting-center" className="font-bold text-cyan-600 hover:underline">
          ← Back to Troubleshooting Center
        </Link>

        <h1 className="mt-6 text-3xl font-black sm:text-4xl">
          Networking Troubleshooting
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Browse troubleshooting topics for Networking.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((file) => (
            <article key={file} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-bold">{file.replace(/\.ts$/, "").replace(/([a-z])([A-Z])/g, " ")}</h2>
              <p className="mt-2 text-sm text-slate-500">Troubleshooting guide</p>
            </article>
          ))}
        </div>

        {topics.length === 0 && (
          <p className="mt-6">No topic files found in this category.</p>
        )}
      </div>
    </main>
  );
}
