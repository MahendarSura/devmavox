'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type PdfFile = {
  name: string;
  url: string;
  folder: string;
};

type InterviewCategory = {
  name: string;
  files: PdfFile[];
};

export default function InterviewHubPage() {
  const [categories, setCategories] = useState<InterviewCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPdfs() {
      try {
        const response = await fetch('/api/interview-pdfs');
        if (!response.ok) {
          throw new Error('Failed to load PDFs');
        }
        const data: InterviewCategory[] = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setActiveCategory(data[0].name);
        }
      } catch {
        setError('PDFs load కాలేదు. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    loadPdfs();
  }, []);

  const currentCategory = categories.find(
    (category) => category.name === activeCategory
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900 p-5">
        <div className="mx-auto flex max-w-6xl justify-between">
          <Link href="/" className="text-2xl font-black text-cyan-400">
            Devmavox
          </Link>
          <Link href="/" className="text-cyan-400">
            ← Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-3 text-center text-4xl font-bold">
          Interview PDF Hub
        </h1>
        <p className="mb-10 text-center text-slate-400">
          Browse your interview preparation PDFs by category.
        </p>

        {loading ? (
          <p className="text-center">Loading PDFs...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-slate-400">
            No PDF categories found.
          </p>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`rounded-xl border p-5 text-left ${
                    activeCategory === category.name
                      ? 'border-cyan-400 bg-cyan-500/10'
                      : 'border-slate-800 bg-slate-900'
                  }`}
                >
                  <span className="font-bold">{category.name}</span>
                  <span className="mt-2 block text-sm text-slate-400">
                    {category.files.length} PDF files
                  </span>
                </button>
              ))}
            </div>

            {currentCategory && (
              <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-5 text-2xl font-bold text-cyan-400">
                  {currentCategory.name}
                </h2>
                <ul className="space-y-3">
                  {currentCategory.files.map((file) => (
                    <li key={file.url} className="rounded-lg border border-slate-800 p-4">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-words text-cyan-300 hover:underline"
                      >
                        📄 {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
