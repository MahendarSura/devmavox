import Link from "next/link";
import { notFound } from "next/navigation";
import { troubleshootingGuides } from "../../guideRegistry";
import type { ReactNode } from "react";

function makeSlug(filename: string) {
  return filename
    .replace(/\.ts$/i, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function displayName(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2");
}

function humanizeKey(value: string) {
  return displayName(value)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

function renderValue(value: unknown, key: string): ReactNode {
  if (value === null || value === undefined || typeof value === "boolean") {
    return null;
  }

  if (typeof value === "string" || typeof value === "number") {
    if (/^https?:\/\//i.test(String(value))) {
      return (
        <a
          href={String(value)}
          target="_blank"
          rel="noreferrer"
          className="break-all text-cyan-700 underline dark:text-cyan-300"
        >
          {String(value)}
        </a>
      );
    }

    return <span className="whitespace-pre-wrap break-words">{String(value)}</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return null;

    const primitiveList = value.every(
      (item) => typeof item === "string" || typeof item === "number"
    );

    if (primitiveList) {
      return (
        <ul className="list-disc space-y-2 pl-6">
          {value.map((item, index) => (
            <li key={`${key}-${index}`}>{renderValue(item, `${key}-${index}`)}</li>
          ))}
        </ul>
      );
    }

    return (
      <div className="space-y-4">
        {value.map((item, index) => (
          <div
            key={`${key}-${index}`}
            className="rounded-lg border border-slate-200 p-4 dark:border-slate-700"
          >
            {renderValue(item, `${key}-${index}`)}
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, item]) => item !== undefined && item !== null
    );

    return (
      <div className="space-y-4">
        {entries.map(([childKey, childValue]) => (
          <section key={`${key}-${childKey}`} className="space-y-2">
            <h3 className="font-semibold capitalize text-slate-800 dark:text-slate-100">
              {humanizeKey(childKey)}
            </h3>
            <div className="text-sm leading-7 text-slate-700 dark:text-slate-300">
              {renderValue(childValue, `${key}-${childKey}`)}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return null;
}

function getGuide(moduleData: Record<string, unknown>) {
  if (moduleData.default && typeof moduleData.default === "object") {
    return moduleData.default as Record<string, unknown>;
  }

  const values = Object.entries(moduleData).filter(
    ([, value]) => value !== null && typeof value === "object"
  );

  const preferred = values.find(([name, value]) => {
    if (Array.isArray(value)) return false;
    const objectValue = value as Record<string, unknown>;
    return (
      typeof objectValue.title === "string" ||
      typeof objectValue.overview === "string" ||
      typeof objectValue.description === "string"
    );
  });

  const selected = preferred ?? values.find(([, value]) => !Array.isArray(value)) ?? values[0];
  return selected?.[1] as Record<string, unknown> | undefined;
}

export default async function TroubleshootingTopicPage({
  params,
}: {
  params: Promise<{ tool: string; topic: string[] }>;
}) {
  const { tool, topic } = await params;

  const registry = troubleshootingGuides as Record<string, Record<string, unknown>>;

  const toolModules = Object.keys(registry).filter(
    (key) => key.startsWith(`${tool}/`)
  );

  const selectedKey = toolModules.find(
    (key) => makeSlug(`${key.split("/").pop()}.ts`) === topic.join("/")
  );

  if (!selectedKey) notFound();

  const moduleData = registry[selectedKey];
  const guide = getGuide(moduleData);

  if (!guide) notFound();

  const fileName = selectedKey.split("/").pop() ?? topic.join("/");
  const title =
    typeof guide.title === "string" ? guide.title : displayName(fileName);

  const description =
    typeof guide.description === "string" ? guide.description : null;

  const contentEntries = Object.entries(guide).filter(
    ([key, value]) =>
      !["title", "slug", "category", "description"].includes(key) &&
      value !== undefined &&
      value !== null
  );

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/troubleshooting-center/${tool}`}
          className="text-cyan-700 hover:underline dark:text-cyan-300"
        >
          ← Back to {displayName(tool)} Troubleshooting
        </Link>

        <header className="mt-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
            {typeof guide.category === "string" ? guide.category : displayName(tool)}
          </p>
          <h1 className="mt-2 text-3xl font-bold">{title}</h1>
          {description && (
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              {description}
            </p>
          )}
        </header>

        <div className="mt-6 space-y-5">
          {contentEntries.map(([key, value]) => (
            <section
              key={key}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
            >
              <h2 className="mb-4 text-xl font-bold capitalize">
                {humanizeKey(key)}
              </h2>
              {renderValue(value, key)}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

