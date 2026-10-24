'use client';

import React from 'react';
import Link from 'next/link';

import { dockerRoadmap } from './dockerroadmap';
import { mavenRoadmap } from './mavenroadmap';
import { jenkinsRoadmap } from './jenkinsroadmap';
import { linuxRoadmap } from './linuxroadmap';
import { gitRoadmap } from './gitroadmap';
import { k8sRoadmap } from './k8sroadmap';
import { terraformRoadmap } from './terraformroadmap';
import { argocdRoadmap } from './argocdroadmap';
import { ansibleRoadmap } from './ansibleroadmap';
import { prometheusRoadmap } from './prometheusroadmap';
import { tomcatRoadmap } from './tomcatroadmap';
import { jiraRoadmap } from './jiraroadmap';
import { grafanaRoadmap } from './grafanaroadmap';
import { githubActionsRoadmap } from './githubactionsroadmap';
import { nexusRoadmap } from './nexusroadmap';
import { helmRoadmap } from './helmroadmap';
import { eksRoadmap } from './eksroadmap';

export const allToolRoadmaps = [
  linuxRoadmap,
  gitRoadmap,
  dockerRoadmap,
  k8sRoadmap,
  terraformRoadmap,
  jenkinsRoadmap,
  argocdRoadmap,
  ansibleRoadmap,
  prometheusRoadmap,
  tomcatRoadmap,
  jiraRoadmap,
  grafanaRoadmap,
  githubActionsRoadmap,
  nexusRoadmap,
  helmRoadmap,
  eksRoadmap,
  mavenRoadmap,
];

export function getRoadmapBySlug(slug: string) {
  return allToolRoadmaps.find((tool) => tool.slug === slug);
}

export default function RoadmapMainPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Back to Home */}
        <Link href="/" className="text-cyan-400 hover:underline mb-6 inline-block font-semibold">
          ← Back to Home
        </Link>

        {/* Header Section */}
        <div className="mb-10">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
            DevOps Learning Roadmap
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-3 mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Explore All 18 DevOps Tools
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            Click on any tool below to open its dedicated deep-dive guide loaded directly from its individual roadmap file.
          </p>
        </div>

        {/* 18 Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allToolRoadmaps.map((tool) => (
            <Link
              key={tool.slug}
              href={`/devops-learning-roadmap/${tool.slug}`}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold">
                    #{tool.id}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{tool.category}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2">
                  {tool.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                  {tool.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400">
                <span>Explore Deep Dive</span>
                <span className="transform group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
