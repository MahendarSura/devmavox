interview/page.tsx 

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function InterviewHubPage() {
  const [activeTab, setActiveTab] = useState('general');

  const options = [
    { id: 'general', title: 'Interview Q&A' },
    { id: 'realtime', title: 'Realtime Interview Q&A' },
    { id: 'short', title: 'Interview Short Answers' },
    { id: 'troubleshooting', title: 'Troubleshooting Interview Q&A' },
    { id: 'basic-level', title: 'Basic-level Q&A' },
    { id: 'aws-interview', title: 'Aws-interview Interview Q&A' },
    { id: 'projects', title: 'Projects Interview Q&A' },
    { id: 'realtime-telugu', title: 'Realtime telugu Interview Q&A' },
    { id: 'devops-workflow', title: 'Devops workflow Interview Q&A' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Devmavox
            </span>
            <span className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full font-medium">
              Interview Hub
            </span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-cyan-400 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">DevOps Interview Hub</h1>
          <p className="text-slate-400">Select any category below to start your preparation.</p>
        </div>

        {/* Main Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveTab(opt.id)}
              className={`p-6 rounded-2xl text-left font-bold text-lg transition-all border ${
                activeTab === opt.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.02]'
                  : 'bg-slate-900/80 text-slate-200 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900'
              }`}
            >
              {opt.title}
            </button>
          ))}
        </div>

        {/* Active Content Display */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            {options.find(o => o.id === activeTab)?.title}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Here you will find all the structured questions and answers related to <span className="text-slate-200 font-semibold">{options.find(o => o.id === activeTab)?.title}</span> across core DevOps tools.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-slate-500 text-sm mt-20">
        <p>© 2026 Devmavox. Built with passion for learners.</p>
      </footer>
    </div>
  );
}
