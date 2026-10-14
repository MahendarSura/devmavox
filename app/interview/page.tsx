'use client';

import { useState } from 'react';
import Link from 'next/link';

interface QnA {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const interviewData: QnA[] = [
  {
    id: 1,
    category: 'AWS',
    question: 'What is the difference between AWS ALB and NLB?',
    answer: 'Application Load Balancer (ALB) operates at Layer 7 (HTTP/HTTPS) and is ideal for microservices and web traffic routing. Network Load Balancer (NLB) operates at Layer 4 (TCP/UDP/TLS) and handles millions of requests per second with ultra-low latency.',
  },
  {
    id: 2,
    category: 'Docker',
    question: 'Why do we use multi-stage builds in Docker?',
    answer: 'Multi-stage builds allow you to use multiple FROM instructions in your Dockerfile. Each FROM instruction starts a new base image with a fresh stage, allowing you to copy artifacts from previous stages and leave behind build-time dependencies, significantly reducing the final image size.',
  },
  {
    id: 3,
    category: 'Kubernetes',
    question: 'What is the role of kube-proxy in a Kubernetes cluster?',
    answer: 'kube-proxy is a network proxy that runs on each node in your cluster, maintaining network rules and allowing communication to Pods from network sessions inside or outside of your cluster using iptables or IPVS.',
  },
  {
    id: 4,
    category: 'Terraform',
    question: 'What is Terraform State and why is it important?',
    answer: 'Terraform State stores data about your managed infrastructure and configurations. It maps real-world resources to your configuration, tracks metadata, and improves performance for large deployments by caching resource attributes.',
  },
  {
    id: 5,
    category: 'CI/CD',
    question: 'What is GitOps and how does ArgoCD implement it?',
    answer: 'GitOps is an operational framework that takes DevOps best practices and applies them to container orchestration, using Git as a single source of truth for declarative infrastructure. ArgoCD continuously monitors the live Kubernetes cluster state and compares it with the desired state defined in Git repositories.',
  },
];

export default function InterviewPage() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-10">
      {/* Navbar */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-10 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-cyan-400">Devmavox Prep</h1>
          <p className="text-sm text-gray-400 mt-1">Top DevOps & Cloud Interview Questions & Answers</p>
        </div>
        <Link href="/" className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-xl transition border border-gray-700">
          ← Back to Home
        </Link>
      </div>

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {interviewData.map((item) => (
          <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl transition">
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800/40 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs bg-cyan-950 text-cyan-400 px-2.5 py-1 rounded-md border border-cyan-800/50 font-medium">
                  {item.category}
                </span>
                <h2 className="text-lg font-semibold text-white">{item.question}</h2>
              </div>
              <span className="text-cyan-400 font-bold text-lg">
                {openId === item.id ? '−' : '+'}
              </span>
            </button>

            {openId === item.id && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-800/60 bg-gray-950/40">
                <p className="text-gray-300 text-sm leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
