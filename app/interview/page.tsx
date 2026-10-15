'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function InterviewHubPage() {
  const [activeTab, setActiveTab] = useState('general');

  const categories = [
    { id: 'general', title: 'Interview Q&A', desc: 'Core foundational questions and conceptual answers.' },
    { id: 'realtime', title: 'Realtime Interview Q&A', desc: 'Scenario-based production and deployment challenges.' },
    { id: 'short', title: 'Interview Short Answers', desc: 'Quick revision points and one-liner definitions.' },
    { id: 'troubleshooting', title: 'Troubleshooting Interview Q&A', desc: 'Debugging failures, logs, and error fixes.' }
  ];

  const sampleQuestions: { [key: string]: { q: string; a: string }[] } = {
    general: [
      { q: "What is DevOps and why is it important?", a: "DevOps is a cultural and technical approach that bridges software development (Dev) and IT operations (Ops) to shorten the systems development lifecycle and deliver high-quality software continuously." },
      { q: "Explain the core phases of CI/CD lifecycle.", a: "Continuous Integration involves code commits, automated builds, and testing. Continuous Delivery/Deployment automates release pipelines to staging and production environments." }
    ],
    realtime: [
      { q: "How do you handle a production outage caused by a failed deployment?", a: "Immediately initiate a rollback to the previous stable release version, analyze container or service logs to identify the root cause, fix the bug in a hotfix branch, and test thoroughly before re-deploying." },
      { q: "How do you manage secrets securely in multi-environment clusters?", a: "Store secrets in encrypted secret managers like AWS Secrets Manager, HashiCorp Vault, or Kubernetes Secrets, and inject them at runtime without hardcoding in code repositories." }
    ],
    short: [
      { q: "What is an Ingress controller in Kubernetes?", a: "A component that manages external access to services in a cluster, typically HTTP/HTTPS routing." },
      { q: "What command checks free disk space in Linux?", a: "df -h" }
    ],
    troubleshooting: [
      { q: "How do you troubleshoot high CPU usage on an EC2 instance?", a: "Use top or htop to identify resource-heavy processes, check system logs in /var/log/, and examine CloudWatch metrics for traffic spikes." },
      { q: "What to do when a Docker container fails to start due to port binding conflict?", a: "Check if another container or local service is already using that port using netstat or docker ps, and map to a different host port." }
    ]
  };

  const currentQuestions = sampleQuestions[activeTab] || [];

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

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">DevOps Interview Q&A Hub</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Select any category below to explore focused questions and answers.
          </p>
        </div>

        {/* 4 Main Options Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`p-6 rounded-2xl text-left border transition-all ${
                activeTab === cat.id
                  ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-xl shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:bg-slate-900'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
              <p className="text-xs text-slate-400">{cat.desc}</p>
            </button>
          ))}
        </div>

        {/* Display Section */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 capitalize border-b border-slate-800 pb-3">
            {categories.find(c => c.id === activeTab)?.title}
          </h2>

          <div className="space-y-6">
            {currentQuestions.map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-950 border border-slate-800/80">
                <h4 className="font-bold text-base text-slate-100 mb-2 flex items-start gap-2">
                  <span className="text-cyan-400">Q:</span>
                  <span>{item.q}</span>
                </h4>
                <div className="text-slate-300 text-sm leading-relaxed pl-6 border-l-2 border-cyan-500/40 py-1">
                  <span className="font-semibold text-cyan-400 mr-2">Answer:</span>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-slate-500 text-sm mt-20">
        <p>© 2026 Devmavox. Built with passion for learners.</p>
      </footer>
    </div>
  );
}
