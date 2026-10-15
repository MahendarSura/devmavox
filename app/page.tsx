'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  const courses = [
    { title: "Linux & Shell Scripting", desc: "OS fundamentals, file systems, bash scripting.", icon: "🐧" },
    { title: "Git & GitHub", desc: "Version control, branching, merge conflicts, workflows.", icon: "🌿" },
    { title: "Docker & Containers", desc: "Containerization, Dockerfile, image management.", icon: "🐳" },
    { title: "Kubernetes (EKS)", desc: "Cluster architecture, pods, deployments, services.", icon: "☸️" },
    { title: "AWS Cloud", desc: "EC2, S3, IAM, VPC, real-world cloud infrastructure.", icon: "☁️" },
    { title: "Terraform & IaC", desc: "Infrastructure as Code, automation, state management.", icon: "🏗️" },
    { title: "Jenkins CI/CD", desc: "Pipeline automation, build triggers, plugins, agents.", icon: "⚙️" },
    { title: "ArgoCD (GitOps)", desc: "Declarative continuous delivery for Kubernetes.", icon: "🐙" },
    { title: "Ansible", desc: "Configuration management, playbooks, automation.", icon: "📜" },
    { title: "Prometheus & Grafana", desc: "Monitoring, alerting, metrics collection, dashboards.", icon: "📊" },
    { title: "Apache Tomcat", desc: "Java application server deployment and management.", icon: "☕" },
    { title: "Jira & Agile", desc: "Issue tracking, sprint planning, project management.", icon: "📋" },
    { title: "Slack & Collaboration", desc: "CI/CD webhook notifications and alerts integration.", icon: "💬" }
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
              Beta
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/" className="text-sm font-semibold text-cyan-400 transition-all">
              Home
            </Link>
            <a href="#courses" className="text-sm font-semibold text-slate-400 hover:text-white transition-all">
              Courses
            </a>
            <Link 
              href="/quiz" 
              className="text-sm font-semibold px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all font-bold shadow-lg shadow-cyan-500/20"
            >
              Quiz Practice
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none blur-3xl"></div>
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            🚀 Android App Coming Soon!
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Learn DevOps in Telugu & English
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Master AWS, Linux, Docker, Kubernetes, Jenkins, Terraform, Ansible, and more step-by-step. Practical labs and courses designed for beginners.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#courses"
              className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/20"
            >
              Explore Courses
            </a>
            <Link
              href="/quiz"
              className="px-8 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-100 font-bold transition-all shadow-lg text-center"
            >
              Quiz Practice ➔
            </Link>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-900 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Core DevOps Courses & Tools</h2>
            <p className="text-slate-400">From absolute zero to production-ready engineer. Explore our video courses below!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all group hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl mb-4 p-3 bg-slate-800/80 w-fit rounded-xl border border-slate-700/50 group-hover:scale-110 transition-transform">
                    {course.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {course.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 Devmavox. Built with passion for learners.</p>
      </footer>
    </div>
  );
}
