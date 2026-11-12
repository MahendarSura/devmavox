import Link from "next/link";
import { notFound } from "next/navigation";
import { glossaryCategories } from "../../glossary-data";

function makeSlug(value: string) {
  return value.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateStaticParams() {
  return glossaryCategories.flatMap((category) =>
    category.terms.map((term) => ({
      category: category.slug,
      term: makeSlug(term.name),
    }))
  );
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ category: string; term: string }>;
}) {
  const { category: categorySlug, term: termSlug } = await params;

  const category = glossaryCategories.find(
    (item) => item.slug === categorySlug
  );

  if (!category) notFound();

  const term = category.terms.find(
    (item) => makeSlug(item.name) === termSlug
  );

  if (!term) notFound();

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <nav className="mb-8 flex flex-wrap gap-2 text-sm">
        <Link href="/devops-glossary" className="text-blue-600 hover:underline">
          Glossary
        </Link>
        <span>/</span>
        <Link href={`/devops-glossary/${category.slug}`} className="text-blue-600 hover:underline">
          {category.title}
        </Link>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          DevOps Concept
        </p>
        <h1 className="mt-3 text-4xl font-bold">{term.name}</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">
          {term.definition}
        </p>
      </header>

      <div className="space-y-7">
        <section className="rounded-2xl border p-6 dark:border-gray-700">
          <h2 className="text-xl font-bold">Purpose – Why Is It Used?</h2>
          <p className="mt-3 leading-8 text-gray-600 dark:text-gray-300">{term.purpose}</p>
        </section>

        <section className="rounded-2xl border p-6 dark:border-gray-700">
          <h2 className="text-xl font-bold">Real-Time Project Example</h2>
          <p className="mt-3 leading-8 text-gray-600 dark:text-gray-300">{term.project}</p>
        </section>

        <section className="rounded-2xl border p-6 dark:border-gray-700">
          <h2 className="text-xl font-bold">How It Works – Workflow</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 leading-7 text-gray-600 dark:text-gray-300">
            {term.workflow.map((step, index) => <li key={index}>{step}</li>)}
          </ol>
        </section>

        <section className="rounded-2xl border p-6 dark:border-gray-700">
          <h2 className="text-xl font-bold">Practical Commands</h2>
          {term.commands.length > 0 ? (
            <div className="mt-4 space-y-3">
              {term.commands.map((command, index) => (
                <pre key={index} className="overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm text-green-300">
                  <code>{command}</code>
                </pre>
              ))}
            </div>
          ) : (
            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
              No specific command is currently provided for this concept.
              Practical commands can be added where applicable.
            </p>
          )}
        </section>

        <section className="rounded-2xl border p-6 dark:border-gray-700">
          <h2 className="text-xl font-bold">Common Mistakes</h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-gray-600 dark:text-gray-300">
            {term.mistakes.map((mistake, index) => <li key={index}>{mistake}</li>)}
          </ul>
        </section>


        {term.configuration && term.configuration.length > 0 && (
          <section className="rounded-2xl border p-6 dark:border-gray-700">
            <h2 className="text-xl font-bold">Configuration Examples</h2>
            <div className="mt-4 space-y-4">
              {term.configuration.map((item, index) => (
                <pre key={index} className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-gray-950 p-4 text-sm leading-7 text-green-300">
                  <code>{item}</code>
                </pre>
              ))}
            </div>
          </section>
        )}

        {term.troubleshooting && term.troubleshooting.length > 0 && (
          <section className="rounded-2xl border p-6 dark:border-gray-700">
            <h2 className="text-xl font-bold">Troubleshooting</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-gray-600 dark:text-gray-300">
              {term.troubleshooting.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {term.bestPractices && term.bestPractices.length > 0 && (
          <section className="rounded-2xl border p-6 dark:border-gray-700">
            <h2 className="text-xl font-bold">Best Practices</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-gray-600 dark:text-gray-300">
              {term.bestPractices.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {term.securityConsiderations && term.securityConsiderations.length > 0 && (
          <section className="rounded-2xl border p-6 dark:border-gray-700">
            <h2 className="text-xl font-bold">Security Considerations</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-gray-600 dark:text-gray-300">
              {term.securityConsiderations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}
        <section className="rounded-2xl border p-6 dark:border-gray-700">
          <h2 className="text-xl font-bold">Related Concepts</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {term.related.map((related) => (
              <span key={related} className="rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                {related}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-10 border-t pt-6 dark:border-gray-700">
        <Link href={`/devops-glossary/${category.slug}`} className="font-semibold text-blue-600 hover:underline">
          ← Back to {category.title}
        </Link>
      </div>
    </main>
  );
}

