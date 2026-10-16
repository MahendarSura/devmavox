'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { generalQuestions } from '@/app/interview/generalInterviewData/general'; 
import { realtimeQuestions } from '@/app/interview/realtimeInterviewData/realtime';
import { shortQuestions } from '@/app/interview/shortInterviewData/short';
import { troubleshootingQuestions } from '@/app/interview/troubleshooting/troubleshoot';
import { basicQuestions } from '@/app/interview/basic-level/basics';
import { awsQuestions } from '@/app/interview/aws-interview/aws';
import { projectsQuestions } from '@/app/interview/projects/projects';
import { realtimeTeluguQuestions } from '@/app/interview/realtime-telugu/telugu';
import { devopsWorkflowQuestions } from '@/app/interview/devops-workflow/workflow';

export default function InterviewHubPage() {
  const [activeTab, setActiveTab] = useState('general');

  const options = [
    { id: 'general', title: 'Interview Q&A', data: generalQuestions },
    { id: 'realtime', title: 'Realtime Interview Q&A', data: realtimeQuestions },
    { id: 'short', title: 'Interview Short Answers', data: shortQuestions },
    { id: 'troubleshooting', title: 'Troubleshooting Interview Q&A', data: troubleshootingQuestions },
    { id: 'basic-level', title: 'Basic-level Q&A', data: basicQuestions },
    { id: 'aws-interview', title: 'Aws Interview Q&A', data: awsQuestions },
    { id: 'projects', title: 'Projects Interview Q&A', data: projectsQuestions },
    { id: 'realtime-telugu', title: 'Realtime telugu Interview Q&A', data: realtimeTeluguQuestions },
    { id: 'devops-workflow', title: 'Devops workflow Interview Q&A', data: devopsWorkflowQuestions },
  ];

  const currentOption = options.find(o => o.id === activeTab);
  const currentData = currentOption ? currentOption.data : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
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

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            {currentOption?.title}
          </h2>
          
          <div className="space-y-6">
            {currentData && currentData.length > 0 ? (
              currentData.map((item: any, index: number) => (
                <div key={index} className="border-b border-slate-800 pb-4 last:border-none">
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">
                    {index + 1}. {item.question || item.q || item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                    {item.answer || item.a || item.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-sm leading-relaxed">
                No questions found in this category yet.
              </p>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 py-8 text-center text-slate-500 text-sm mt-20">
        <p>© 2026 Devmavox. Built with passion for learners.</p>
      </footer>
    </div>
  );
}
