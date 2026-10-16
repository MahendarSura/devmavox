'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { generalQuestions } from '@/app/interview/generalInterviewData/general';
import { basicQuestions } from '@/app/interview/basic level Interview Q&A/basics';
import { awsQuestions } from '@/app/interview/aws Interview Q&A/aws';
import { devopsWorkflowQuestions } from '@/app/interview/Devops workflow Interview Q&A/workflow';
import { projectsQuestions } from '@/app/interview/Projects Interview Q&A/projects';
import { realtimeQuestions } from '@/app/interview/Realtime Interview Q&A/realtime';
import { realtimeTeluguQuestions } from '@/app/interview/Realtime telugu Interview Q&A/telugu';
import { shortQuestions } from '@/app/interview/Interview Short Answers/short';
import { troubleshootingQuestions } from '@/app/interview/Troubleshooting Interview Q&A/troubleshooting';

export default function InterviewHubPage() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const folders = [
    { id: 'general', title: 'generalInterviewData', data: generalQuestions || [] },
    { id: 'basic', title: 'basic level Interview Q&A', data: basicQuestions || [] },
    { id: 'aws', title: 'aws interview Q&A', data: awsQuestions || [] },
    { id: 'workflow', title: 'Devops workflow Interview Q&A', data: devopsWorkflowQuestions || [] },
    { id: 'projects', title: 'Projects Interview Q&A', data: projectsQuestions || [] },
    { id: 'realtime', title: 'Realtime Interview Q&A', data: realtimeQuestions || [] },
    { id: 'telugu', title: 'Realtime telugu Interview Q&A', data: realtimeTeluguQuestions || [] },
    { id: 'short', title: 'Interview Short Answers', data: shortQuestions || [] },
    { id: 'troubleshooting', title: 'Troubleshooting Interview Q&A', data: troubleshootingQuestions || [] },
  ];

  const currentFolderObj = folders.find((f) => f.id === selectedFolder);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
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
          <Link href="/" className="text-sm font-semibold text-cyan-400 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16 flex-grow w-full">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-extrabold md:text-5xl">
            DevOps Interview Hub
          </h1>
          <p className="text-slate-400">
            {!selectedFolder
              ? "Select any folder below to explore its Q&A notes."
              : `Viewing files inside: ${currentFolderObj?.title}`}
          </p>
        </div>

        {!selectedFolder ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-left transition-all cursor-pointer hover:border-cyan-500 hover:scale-[1.02] shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="text-3xl mb-3">📁</div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition mb-2">
                    {folder.title}
                  </h3>
                  <p className="text-slate-400 text-xs">
                    {folder.data.length} Questions available
                  </p>
                </div>
                <div className="mt-6 text-xs font-semibold text-cyan-400 flex items-center gap-1">
                  Open Folder &rarr;
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
              <button
                onClick={() => setSelectedFolder(null)}
                className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
              >
                &larr; Back to Folders
              </button>
              <span className="rounded-md bg-cyan-950 px-3 py-1 text-xs font-medium text-cyan-400 border border-cyan-800/50">
                {currentFolderObj?.title}
              </span>
            </div>

            <div className="space-y-6">
              {currentFolderObj?.data && currentFolderObj.data.length > 0 ? (
                currentFolderObj.data.map((item: any, index: number) => (
                  <article key={index} className="border-b border-slate-800 pb-6 last:border-none">
                    <h3 className="mb-2 text-lg font-semibold text-slate-200">
                      {index + 1}. {item.question || item.q || item.title || "Question"}
                    </h3>
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-400">
                      {item.answer || item.a || item.description || "Answer coming soon."}
                    </p>
                  </article>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400 text-base mb-2">
                    Ee folder lo questions inka load avvaledu.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-900 py-8 text-center text-sm text-slate-500">
        <p>© 2026 Devmavox. Built with passion for learners.</p>
      </footer>
    </div>
  );
}
