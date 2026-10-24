'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center space-x-3">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-black text-transparent">
              Devmavox
            </span>
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400">
              Beta
            </span>
          </Link>

          <nav className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/" className="text-sm font-semibold text-cyan-400">
              Home
            </Link>
            <Link href="/explore-courses" className="text-sm font-semibold text-slate-400 transition-all hover:text-white">
              Explore Courses
            </Link>
            <Link
              href="/quiz"
              className="rounded-lg bg-cyan-500 px-4 py-1.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400"
            >
              Quiz Practice
            </Link>
          </nav>
        </div>
      </header>

      <main className="pb-20">
        <section className="relative mx-auto max-w-7xl overflow-hidden px-6 py-20 text-center">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent blur-3xl" />

          <div className="mb-4 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
            🚀 Android App Coming Soon!
          </div>

          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Learn DevOps in Telugu &amp; English
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
            Master AWS, Linux, Docker, Kubernetes, Jenkins, Terraform, Ansible, and more step-by-step. Practical labs and courses designed for beginners.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/explore-courses"
              className="rounded-xl bg-cyan-500 px-8 py-3.5 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400"
            >
              Explore Courses
            </Link>

            <Link
              href="/quiz"
              className="rounded-xl border border-slate-700 bg-slate-900 px-8 py-3.5 text-center font-bold text-slate-100 shadow-lg transition-all hover:border-cyan-500"
            >
              Quiz Practice ➔
            </Link>

            <Link
              href="/interview"
              className="rounded-xl border border-slate-700 bg-slate-900 px-8 py-3.5 text-center font-bold text-cyan-400 shadow-lg transition-all hover:border-cyan-500 hover:bg-slate-800"
            >
              Interview Q&amp;A ➔
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 py-8 text-center text-sm text-slate-500">
        <p>© 2026 Devmavox. Built with passion for learners.</p>
      </footer>
    </div>
  );
}
