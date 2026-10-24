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

        <section className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            22 Advanced DevOps Features
          </h2>
          <p className="mb-8 text-slate-400">
            Explore practical tools and resources to improve your DevOps skills.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              { title: "DevOps Learning Roadmap", desc: "Follow a structured DevOps learning path.", icon: "🗺️", link: "/devops-learning-roadmap" },
              { title: "Hands-on Labs", desc: "Practise Linux, Git, Docker and Kubernetes.", icon: "💻", link: "/hands-on-labs" },
              { title: "Real-Time Projects", desc: "Build practical cloud and CI/CD projects.", icon: "🚀", link: "/real-time-projects" },
              { title: "Troubleshooting Center", desc: "Learn to diagnose and fix common errors.", icon: "🔧", link: "/troubleshooting-center" },
              { title: "Notes & Cheat Sheets", desc: "Revise commands and technical concepts.", icon: "📝", link: "/notes-cheat-sheets" },
              { title: "DevOps Glossary", desc: "Understand DevOps terms with examples.", icon: "📖", link: "/devops-glossary" },
              { title: "CI/CD Pipeline Visualizer", desc: "Understand pipeline stages and deployments.", icon: "⚡", link: "/cicd-pipeline-visualizer" },
              { title: "Architecture Diagram Library", desc: "Explore cloud and DevOps architecture diagrams.", icon: "🏛️", link: "/architecture-diagram-library" },
              { title: "YAML Config Playground", desc: "Practise Kubernetes and pipeline YAML.", icon: "📄", link: "/yaml-config-playground" },
              { title: "Command Explorer", desc: "Explore Linux, Git, Docker and kubectl commands.", icon: "⌨️", link: "/command-explorer" },
              { title: "Incident Simulator", desc: "Practise responding to service incidents.", icon: "🚨", link: "/incident-simulator" },
              { title: "Cloud Cost Lab", desc: "Learn cloud cost optimization techniques.", icon: "💰", link: "/cloud-cost-lab" },
              { title: "Git Workflow Simulator", desc: "Practise branching, merging and conflict resolution.", icon: "🌿", link: "/git-workflow-simulator" },
              { title: "Monitoring Playground", desc: "Explore metrics, logs and alerts.", icon: "📈", link: "/monitoring-playground" },
              { title: "DevOps Knowledge Base", desc: "Find technical explanations and references.", icon: "📚", link: "/devops-knowledge-base" },
              { title: "Portfolio Builder", desc: "Organize your DevOps projects and achievements.", icon: "💼", link: "/portfolio-builder" },
              { title: "Study Planner & Progress Tracker", desc: "Plan learning goals and track progress.", icon: "📅", link: "/study-planner" },
              { title: "DevOps Career Center", desc: "Prepare for DevOps roles and interviews.", icon: "🧭", link: "/devops-career-center" },
              { title: "DevOps AI Assistant", desc: "Get help with concepts and troubleshooting.", icon: "🤖", link: "/devops-ai-assistant" },
              { title: "Daily DevOps Challenge", desc: "Practise a new DevOps task every day.", icon: "🏆", link: "/daily-devops-challenge" },
              { title: "Tech Version Compatibility", desc: "Review compatibility across DevOps tools.", icon: "🔗", link: "/tech-version-compatibility" },
              { title: "DevSecOps Security Lab", desc: "Learn IAM, secrets and container security.", icon: "🛡️", link: "/devsecops-security-lab" },
            ].map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className="group flex min-h-64 flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-8 transition-all hover:-translate-y-1 hover:border-cyan-500 hover:bg-slate-900"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-4xl">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold transition-all group-hover:text-cyan-400">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-7 text-slate-400">
                  {item.desc}
                </p>
                <div className="mt-5 border-t border-slate-800 pt-4 font-bold text-cyan-400">
                  Explore Feature ➔
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 py-8 text-center text-sm text-slate-500">
        <p>© 2026 Devmavox. Built with passion for learners.</p>
      </footer>
    </div>
  );
}


