'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { generalQuestions } from '@/app/interview/generalInterviewData/general';
import { realtimeQuestions } from '@/app/interview/Realtime Interview Q&A/realtime';
import { shortQuestions } from '@/app/interview/Interview Short Answers/short';
import { troubleshootingQuestions } from '@/app/interview/Troubleshooting Interview Q&A/troubleshooting';
import { basicQuestions } from '@/app/interview/basic level Interview Q&A/basics';
import { awsQuestions } from '@/app/interview/aws Interview Q&A/aws';
import { projectsQuestions } from '@/app/interview/Projects Interview Q&A/projects';
import { realtimeTeluguQuestions } from '@/app/interview/Realtime telugu Interview Q&A/telugu';
import { devopsWorkflowQuestions } from '@/app/interview/Devops workflow Interview Q&A/devops workflow';

export default function InterviewHubPage() {
  const [activeTab, setActiveTab] = useState('general');

  const options = [
    {
      id: 'general',
      title: 'Interview Q&A',
      data: generalQuestions,
    },
    {
      id: 'realtime',
      title: 'Realtime Interview Q&A',
      data: realtimeQuestions,
    },
    {
      id: 'short',
      title: 'Interview Short Answers',
      data: shortQuestions,
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting Interview Q&A',
      data: troubleshootingQuestions,
    },
    {
      id: 'basic-level',
      title: 'Basic-level Q&A',
      data: basicQuestions,
    },
    {
      id: 'aws-interview',
      title: 'AWS Interview Q&A',
      data: awsQuestions,
    },
    {
      id: 'projects',
      title: 'Projects Interview Q&A',
      data: projectsQuestions,
    },
    {
      id: 'realtime-telugu',
      title: 'Realtime Telugu Interview Q&A',
      data: realtimeTeluguQuestions,
    },
    {
      id: 'devops-workflow',
      title: 'DevOps Workflow Interview Q&A',
      data: devopsWorkflowQuestions,
    },
  ];

  const currentOption = options.find(
    (option) => option.id === activeTab
  );

  const currentData = currentOption?.data ?? [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center space-x-3">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-black text-transparent">
              Devmavox
            </span>

            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400">
              Interview Hub
            </span>
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-cyan-400 hover:underline"
          >
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-extrabold md:text-5xl">
            DevOps Interview Hub
          </h1>

          <p className="text-slate-400">
            Select any category below to start your preparation.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveTab(option.id)}
              className={`rounded-2xl border p-6 text-left text-lg font-bold transition-all ${
                activeTab === option.id
                  ? 'scale-[1.02] border-cyan-400 bg-cyan-500 text-slate-950 shadow-xl shadow-cyan-500/20'
                  : 'border-slate-800 bg-slate-900/80 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-900'
              }`}
            >
              {option.title}
            </button>
          ))}
        </div>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl">
          <h2 className="mb-6 text-2xl font-bold text-cyan-400">
            {currentOption?.title}
          </h2>

          <div className="space-y-6">
            {currentData.length > 0 ? (
              currentData.map((item: any, index: number) => (
                <article
                  key={index}
                  className="border-b border-slate-800 pb-4 last:border-none"
                >
                  <h3 className="mb-2 text-lg font-semibold text-slate-200">
                    {index + 1}. {item.question || item.q || item.title}
                  </h3>

                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-400">
                    {item.answer || item.a || item.description}
                  </p>
                </article>
              ))
            ) : (
              <p className="text-sm leading-relaxed text-slate-400">
                No questions found in this category yet.
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-slate-900 py-8 text-center text-sm text-slate-500">
        <p>© 2026 Devmavox. Built with passion for learners.</p>
      </footer>
    </div>
  );
}
