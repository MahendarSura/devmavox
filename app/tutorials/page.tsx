'use client';

import Link from 'next/link';

interface Tutorial {
  id: number;
  title: string;
  category: string;
  description: string;
  readTime: string;
  steps: string[];
}

const tutorialsList: Tutorial[] = [
  {
    id: 1,
    title: 'AWS EKS Cluster Setup with Terraform',
    category: 'AWS & Kubernetes',
    description: 'Learn how to provision a production-grade Amazon EKS cluster using Infrastructure as Code (Terraform).',
    readTime: '10 min read',
    steps: [
      'Install Terraform and AWS CLI on your local machine.',
      'Configure IAM roles and security groups for EKS nodes.',
      'Write main.tf and VPC module configurations.',
      'Run `terraform init` and `terraform apply` to provision the cluster.',
      'Update kubeconfig to connect via `kubectl`.'
    ],
  },
  {
    id: 2,
    title: 'GitHub Actions CI/CD Pipeline for Docker',
    category: 'CI/CD & DevOps',
    description: 'Automate building and pushing Docker images to Amazon ECR using GitHub Actions workflows.',
    readTime: '8 min read',
    steps: [
      'Create a workflow YAML file under .github/workflows/deploy.yml.',
      'Configure AWS credentials as GitHub Repository Secrets.',
      'Add steps to checkout code and login to Amazon ECR.',
      'Build the Docker image and push it with a unique tag.',
      'Trigger the action on every push to the main branch.'
    ],
  },
  {
    id: 3,
    title: 'Zero-Trust Security Hardening with Kyverno',
    category: 'Security & K8s',
    description: 'Enforce security policies and best practices inside an Amazon EKS cluster using Kyverno admission controls.',
    readTime: '12 min read',
    steps: [
      'Install Kyverno on your Kubernetes cluster using Helm charts.',
      'Write custom ClusterPolicies to disallow running root containers.',
      'Enforce mandatory resource limits and labels on all Namespaces.',
      'Test policies by deploying dry-run sample pods.',
      'Monitor policy violation reports via Kubernetes dashboard.'
    ],
  },
];

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-10 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-cyan-400">Devmavox Labs</h1>
          <p className="text-sm text-gray-400 mt-1">Real-World DevOps & Cloud Engineering Tutorials</p>
        </div>
        <Link href="/" className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-xl transition border border-gray-700">
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {tutorialsList.map((item) => (
          <div key={item.id} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl hover:border-cyan-500/50 transition">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
              <span className="text-xs bg-cyan-950 text-cyan-400 px-3 py-1 rounded-md border border-cyan-800/50 font-medium">
                {item.category}
              </span>
              <span className="text-xs text-gray-400">{item.readTime}</span>
            </div>

            <h2 className="text-xl font-semibold mb-2 text-white">{item.title}</h2>
            <p className="text-gray-300 text-sm mb-4">{item.description}</p>

            <div className="bg-gray-950/60 p-4 rounded-xl border border-gray-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">Implementation Steps:</h4>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-300">
                {item.steps.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">{step}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
