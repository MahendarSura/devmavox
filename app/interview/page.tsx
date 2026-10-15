'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Import all 18 tool interview data files
import { linuxInterviewData } from './linuxInterview';
import { gitInterviewData } from './gitInterview';
import { dockerInterviewData } from './dockerInterview';
import { kubernetesInterviewData } from './kubernetesInterview';
import { awsInterviewData } from './awsInterview';
import { terraformInterviewData } from './terraformInterview';
import { jenkinsInterviewData } from './jenkinsInterview';
import { argocdInterviewData } from './argocdInterview';
import { ansibleInterviewData } from './ansibleInterview';
import { prometheusInterviewData } from './prometheusInterview';
import { grafanaInterviewData } from './grafanaInterview';
import { tomcatInterviewData } from './tomcatInterview';
import { jiraInterviewData } from './jiraInterview';
import { slackInterviewData } from './slackInterview';
import { githubActionsInterviewData } from './githubActionsInterview';
import { nexusInterviewData } from './nexusInterview';
import { helmInterviewData } from './helmInterview';
import { sonarqubeInterviewData } from './sonarqubeInterview';

export default function InterviewHubPage() {
  // 4 main categories without numbers in code logic/display
  const [activeTab, setActiveTab] = useState<'general' | 'realtime' | 'short' | 'troubleshooting'>('general');
  const [selectedToolId, setSelectedToolId] = useState('linux');

  // Map tool ids to their corresponding imported data objects
  const interviewDataMap: { [key: string]: any } = {
    linux: linuxInterviewData,
    git: gitInterviewData,
    docker: dockerInterviewData,
    kubernetes: kubernetesInterviewData,
    aws: awsInterviewData,
    terraform: terraformInterviewData,
    jenkins: jenkinsInterviewData,
    argocd: argocdInterviewData,
    ansible: ansibleInterviewData,
    prometheus: prometheusInterviewData,
    grafana: grafanaInterviewData,
    tomcat: tomcatInterviewData,
    jira: jiraInterviewData,
    slack: slackInterviewData,
    'github-actions': githubActionsInterviewData,
    nexus: nexusInterviewData,
    helm: helmInterviewData,
    sonarqube: sonarqubeInterviewData,
  };

  const toolList = [
    { id: 'linux', name: 'Linux & Shell Scripting', icon: '🐧' },
    { id: 'git', name: 'Git & GitHub', icon: '🌿' },
    { id: 'docker', name: 'Docker & Containers', icon: '🐳' },
    { id: 'kubernetes', name: 'Kubernetes (EKS)', icon: '☸️' },
    { id: 'aws', name: 'AWS Cloud', icon: '☁️' },
    { id: 'terraform', name: 'Terraform & IaC', icon: '🏗️' },
    { id: 'jenkins', name: 'Jenkins CI/CD', icon: '⚙️' },
    { id: 'argocd', name: 'ArgoCD (GitOps)', icon: '🐙' },
    { id: 'ansible', name: 'Ansible', icon: '📜' },
    { id: 'prometheus', name: 'Prometheus', icon: '📈' },
    { id: 'grafana', name: 'Grafana', icon: '📊' },
    { id: 'tomcat', name: 'Apache Tomcat', icon: '☕' },
    { id: 'jira', name: 'Jira & Agile', icon: '📋' },
    { id: 'slack', name: 'Slack & Collaboration', icon: '💬' },
    { id: 'github-actions', name: 'GitHub Actions', icon: '⚡' },
    { id: 'nexus', name: 'Sonatype Nexus', icon: '📦' },
    { id: 'helm', name: 'Helm', icon: '⛵' },
    { id: 'sonarqube', name: 'SonarQube', icon: '🔍' },
  ];

  const currentToolData = interviewDataMap[selectedToolId] || linuxInterviewData;
  const currentQuestionsList = currentToolData[activeTab] || [];

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

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">DevOps Interview Preparation Hub</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore comprehensive interview questions, real-time scenarios, short answers, and troubleshooting guides across all core DevOps tools.
          </p>
        </div>

        {/* 4 Main Options / Tabs (No Numbers) */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'general'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50'
            }`}
          >
            Interview Q&A
          </button>
          <button
            onClick={() => setActiveTab('realtime')}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'realtime'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50'
            }`}
          >
            Realtime Interview Q&A
          </button>
          <button
            onClick={() => setActiveTab('short')}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'short'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50'
            }`}
          >
            Interview Short Answers
          </button>
          <button
            onClick={() => setActiveTab('troubleshooting')}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'troubleshooting'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50'
            }`}
          >
            Troubleshooting Interview Q&A
          </button>
        </div>

        {/* 18 Tools Selector Grid */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-slate-400 mb-4 text-center">Select DevOps Tool:</h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-6xl mx-auto">
            {toolList.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedToolId(tool.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                  selectedToolId === tool.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-cyan-500/40'
                }`}
              >
                <span>{tool.icon}</span>
                <span>{tool.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Questions and Answers Display Container */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-cyan-400">
              {currentToolData.tool} - {activeTab === 'general' && 'Interview Q&A'}
              {activeTab === 'realtime' && 'Realtime Interview Q&A'}
              {activeTab === 'short' && 'Interview Short Answers'}
              {activeTab === 'troubleshooting' && 'Troubleshooting Interview Q&A'}
            </h2>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 font-medium">
              {currentQuestionsList.length} Questions Available
            </span>
          </div>

          <div className="space-y-6">
            {currentQuestionsList.map((item: any, idx: number) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
                <h4 className="font-bold text-lg text-slate-100 mb-3 flex items-start gap-3">
                  <span className="text-cyan-400">Q:</span>
                  <span>{item.q}</span>
                </h4>
                <div className="text-slate-300 text-sm leading-relaxed pl-7 border-l-2 border-cyan-500/40 py-1">
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
