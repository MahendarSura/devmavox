'use client';

import { useState } from 'react';
import Link from 'next/link';

const topics = [
  'Linux', 'Git & GitHub', 'Docker', 'Kubernetes',
  'AWS', 'Terraform', 'Jenkins', 'ArgoCD',
  'Ansible', 'Prometheus & Grafana', 'Apache Tomcat',
  'Jira & Agile', 'Slack'
];

export default function QuizPage() {
  const [selectedTopic, setSelectedTopic] = useState('');

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <header className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-cyan-400">
          Devmavox
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-slate-700 px-4 py-2 hover:border-cyan-400"
        >
          ← Main Menu
        </Link>
      </header>

      <section className="mx-auto max-w-5xl py-12">
        <h1 className="mb-3 text-center text-4xl font-bold">
          Quiz Practice
        </h1>
        <p className="mb-10 text-center text-slate-400">
          Choose a topic to start your DevOps practice.
        </p>

        {selectedTopic ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">{selectedTopic}</h2>
            <p className="mb-6 text-slate-300">
              {selectedTopic} quiz selected. Your practice section is ready.
            </p>
            <button
              onClick={() => setSelectedTopic('')}
              className="rounded-lg bg-cyan-500 px-5 py-3 font-bold text-slate-950"
            >
              ← All Topics
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-left transition hover:border-cyan-400"
              >
                <h2 className="mb-3 text-lg font-bold">{topic}</h2>
                <span className="text-sm text-cyan-400">Practice Quiz →</span>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
