import Link from "next/link";
import { glossaryCategories } from "./glossary-data";

export default function DevOpsGlossaryPage() {
  const totalTerms = glossaryCategories.reduce(
    (total, category) => total + category.terms.length, 0
  );

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <header className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          DevMavox Learning Center
        </p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
          DevOps Glossary
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          Learn DevOps concepts, tools and technologies through simple
          explanations, real-world project examples, workflows and practical guidance.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {glossaryCategories.length} Categories
          </span>
          <span className="rounded-full bg-gray-100 px-4 py-2 dark:bg-gray-800">
            {totalTerms} Concepts
          </span>
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-bold">Explore DevOps Categories</h2>
        <p className="mt-2 mb-7 text-gray-600 dark:text-gray-400">
          Choose a category to explore its individual concepts.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {glossaryCategories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/devops-glossary/${category.slug}`}
              className="group rounded-2xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-blue-600">
                  CATEGORY {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-xl text-gray-400 group-hover:text-blue-600">→</span>
              </div>
              <h3 className="mt-5 text-xl font-bold group-hover:text-blue-600">
                {category.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
              <div className="mt-5 flex justify-between border-t border-gray-100 pt-4 text-sm dark:border-gray-700">
                <span>{category.terms.length} Concepts</span>
                <span className="font-semibold text-blue-600">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
