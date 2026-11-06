import Link from "next/link";
import { notFound } from "next/navigation";
import { glossaryCategories } from "../glossary-data";

function makeSlug(value: string) {
  return value.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateStaticParams() {
  return glossaryCategories.map((category) => ({
    category: category.slug,
  }));
}

export default async function GlossaryCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = glossaryCategories.find((item) => item.slug === slug);

  if (!category) notFound();

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <Link href="/devops-glossary" className="text-sm font-semibold text-blue-600 hover:underline">
        ← Back to DevOps Glossary
      </Link>

      <header className="mb-10 mt-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Glossary Category
        </p>
        <h1 className="mt-3 text-4xl font-bold">{category.title}</h1>
        <p className="mt-4 max-w-3xl leading-8 text-gray-600 dark:text-gray-300">
          {category.description}
        </p>
        <div className="mt-6 rounded-xl bg-gray-50 p-5 dark:bg-gray-900">
          <h2 className="font-bold">Why this category matters</h2>
          <p className="mt-2 leading-7 text-gray-600 dark:text-gray-300">
            {category.purpose}
          </p>
        </div>
        <p className="mt-5 text-sm text-gray-500">
          {category.terms.length} concepts in this category
        </p>
      </header>

      <h2 className="mb-5 text-2xl font-bold">Explore Concepts</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.terms.map((term, index) => (
          <Link
            key={`${term.name}-${index}`}
            href={`/devops-glossary/${category.slug}/${makeSlug(term.name)}`}
            className="group rounded-xl border border-gray-200 p-5 transition hover:border-blue-500 hover:shadow-md dark:border-gray-700"
          >
            <span className="text-xs font-semibold text-gray-400">
              CONCEPT {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg font-bold group-hover:text-blue-600">
              {term.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {term.definition}
            </p>
            <p className="mt-4 text-sm font-semibold text-blue-600">
              Read Concept →
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
