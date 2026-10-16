
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
          throw new Error('Unable to load interview PDFs.');
        }

        const data: InterviewCategory[] = await response.json();
        setCategories(data);

        if (data.length > 0) {
          setActiveCategory(data[0].name);
        }
      } catch {
        setError('PDF files load కాలేదు. Please refresh and try again.');
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
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-2xl font-black text-cyan-400">
            Devmavox
          </Link>
          <Link href="/" className="text-sm font-semibold text-cyan-400">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-3xl font-extrabold md:text-5xl">
            Interview Q&A
          </h1>
          <p className="text-slate-400">
            Select a category to browse and open your interview PDFs.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-slate-400">Loading PDF files...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : (
          <>
            <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`rounded-xl border p-5 text-left transition ${
                    activeCategory === category.name
                      ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
                      : 'border-slate-800 bg-slate-900 hover:border-cyan-500/50'
                  }`}
                >
                  <span className="block font-bold">{category.name}</span>
                  <span className="mt-2 block text-sm text-slate-400">
                    {category.files.length} PDF files
                  </span>
                </button>
              ))}
            </div>

            {currentCategory && (
              <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
                <h2 className="mb-6 text-2xl font-bold text-cyan-400">
                  {currentCategory.name}
                </h2>

                {currentCategory.files.length === 0 ? (
                  <p className="text-slate-400">No PDF files found.</p>
                ) : (
                  <ul className="space-y-3">
                    {currentCategory.files.map((file) => (
                      <li
                        key={file.url}
                        className="rounded-lg border border-slate-800 p-4 hover:border-cyan-500/50"
                      >
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 text-cyan-300 hover:text-cyan-200"
                        >
                          <span aria-hidden="true">📄</span>
                          <span className="break-words">{file.name}</span>
                          <span className="ml-auto shrink-0 text-sm">↗</span>
                        </a>
                        {file.folder && (
                          <p className="mt-2 pl-8 text-xs text-slate-500">
                            {file.folder}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}
          </>
        )}
      </main>

      <footer className="mt-16 border-t border-slate-900 py-8 text-center text-sm text-slate-500">
        © 2026 Devmavox. Built with passion for learners.
      </footer>
    </div>
  );
}
