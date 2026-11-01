import Link from "next/link";

const categories = [
  { name: "Basic Interview Questions", slug: "basic", description: "Core concepts, architecture and fundamentals." },
  { name: "Intermediate Interview Questions", slug: "intermediate", description: "Practical implementation and daily engineering work." },
  { name: "Advanced Interview Questions", slug: "advanced", description: "Architecture, scale, security and optimization." },
  { name: "Real-Time Production Scenario Questions", slug: "production-scenarios", description: "Production workflows and real engineering situations." },
  { name: "Troubleshooting-Based Questions", slug: "troubleshooting", description: "Errors, logs, root-cause analysis and recovery." },
  { name: "Scenario-Based Practical Questions", slug: "practical-scenarios", description: "Hands-on tasks and solution approaches." },
  { name: "Frequently Asked Interview Questions", slug: "frequently-asked", description: "Commonly discussed interview topics." }
];

export default function InterviewQAPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <Link href="/notes-cheat-sheets/interview-revision" className="text-sm text-blue-600">← Back to Interview & Quick Revision Notes</Link>
      <h1 className="mt-5 text-3xl font-bold">Interview Q&A</h1>
      <p className="mt-2 text-gray-600">Choose a question category to explore all 17 DevOps tools.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} href={`/notes-cheat-sheets/interview-revision/interview-qa/${category.slug}`}
            className="rounded-xl border p-6 transition hover:border-blue-500 hover:shadow-md">
            <h2 className="text-lg font-semibold">{category.name}</h2>
            <p className="mt-2 text-sm text-gray-600">{category.description}</p>
            <p className="mt-5 text-sm font-medium text-blue-600">Explore tools →</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
