'use client';

import Link from 'next/link';

interface Project {
  title: string;
  category: string;
  description: string;
  techStack: string[];
  impact: string;
}

const projectsList: Project[] = [
  {
    title: 'AWS SRE Automated Remediation Engine',
    category: 'Cloud Automation & SRE',
    description: 'Designed an autonomous incident remediation platform on AWS utilizing Terraform, EventBridge, Lambda, Step Functions, and Prometheus.',
    techStack: ['AWS Lambda', 'Terraform', 'Prometheus', 'Step Functions'],
    impact: 'Reduced Mean Time to Resolution (MTTR) by 75% for critical infrastructure alerts.',
  },
  {
    title: 'Kubernetes Zero-Trust Security Platform',
    category: 'Cloud Security & K8s',
    description: 'Built a hardened Kubernetes security platform on Amazon EKS using Cilium network policies, Kyverno admission controls, Falco, and Trivy.',
    techStack: ['Amazon EKS', 'Cilium', 'Kyverno', 'Falco', 'Cosign'],
    impact: 'Achieved 100% compliance with automated vulnerability scanning and runtime threat detection.',
  },
  {
    title: 'Microservices GitOps Delivery Pipeline',
    category: 'CI/CD & GitOps',
    description: 'Constructed an automated microservices platform integrating GitHub Actions CI/CD workflows and ArgoCD for declarative GitOps continuous delivery.',
    techStack: ['Docker', 'Helm', 'GitHub Actions', 'ArgoCD', 'Kubernetes'],
    impact: 'Streamlined release cycles from hours to under 5 minutes with zero downtime deployments.',
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-10">
      {/* Navbar */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-10 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-cyan-400">Devmavox Showcase</h1>
          <p className="text-sm text-gray-400 mt-1">Enterprise-Grade DevOps & Cloud Engineering Projects</p>
        </div>
        <Link href="/" className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-xl transition border border-gray-700">
          ← Back to Home
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="max-w-4xl mx-auto space-y-6">
        {projectsList.map((proj, idx) => (
          <div key={idx} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl hover:border-cyan-500/50 transition">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
              <span className="text-xs bg-cyan-950 text-cyan-400 px-3 py-1 rounded-md border border-cyan-800/50 font-medium">
                {proj.category}
              </span>
              <span className="text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/50">
                {proj.impact}
              </span>
            </div>

            <h2 className="text-xl font-semibold mb-2 text-white">{proj.title}</h2>
            <p className="text-gray-300 text-sm mb-4">{proj.description}</p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800">
              {proj.techStack.map((tech, i) => (
                <span key={i} className="text-xs font-mono bg-black/60 text-cyan-300 px-2.5 py-1 rounded-lg border border-gray-800">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
