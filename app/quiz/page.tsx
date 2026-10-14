'use client';

import Link from 'next/link';

interface FeatureCard {
  title: string;
  description: string;
  href: string;
  icon: string;
  badge: string;
}

const features: FeatureCard[] = [
  {
    title: 'DevOps Tutorials',
    description: 'Step-by-step guides for AWS EKS, Terraform, and CI/CD pipelines.',
    href: '/tutorials',
    icon: '📚',
    badge: 'Guides',
  },
  {
    title: 'Interview Q&A',
    description: 'Top DevOps & Cloud engineering interview questions and expert answers.',
    href: '/interview',
    icon: '💡',
    badge: 'Prep',
  },
  {
    title: 'Commands Cheat Sheet',
    description: 'Handy quick reference guide for Docker, Kubernetes, and Git commands.',
    href: '/cheatsheet',
    icon: '⚡',
    badge: 'Reference',
  },
  {
    title: 'Interactive Quiz',
    description: 'Test your cloud architecture and DevOps knowledge with a quick quiz.',
    href: '/quiz',
    icon: '🎯',
    badge: 'Assessment',
  },
  {
    title: 'Project Showcase',
    description: 'Explore enterprise-grade real-world DevOps and automation projects.',
    href: '/projects',
    icon: '🚀',
    badge: 'Portfolio',
  },
  {
    title: 'Cost Estimator',
    description: 'Calculate monthly AWS cloud and Kubernetes cluster expenses easily.',
    href: '/calculator',
    icon: '📊',
    badge: 'Tool',
  },
  {
    title: 'System Health Status',
    description: 'Monitor real-time infrastructure and CI/CD pipeline operational uptime.',
    href: '/status',
    icon: '🟢',
    badge: 'Live',
  },
  {
    title: 'Community & Contact',
    description: 'Join our WhatsApp & Telegram groups for direct technical support.',
    href: '/contact',
    icon: '💬',
    badge: 'Support',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-12 flex flex-col justify-between">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto w-full text-center py-10">
        <span className="text-xs bg-cyan-950 text-cyan-400 px-3 py-1 rounded-full border border-cyan-800/50 font-medium tracking-wider uppercase inline-block mb-4">
          Devmavox Platform 2026
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          Master Modern <span className="text-cyan-400">DevOps & Cloud</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Your ultimate hub for enterprise cloud engineering tutorials, interview prep, automation tools, and real-world architectures.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="bg-gray-900 border border-gray-800 hover:border-cyan-500/50 p-6 rounded-2xl shadow-xl transition flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs bg-gray-950 text-gray-400 px-2.5 py-1 rounded-md border border-gray-800 font-medium group-hover:text-cyan-400 transition">
                  {item.badge}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition">{item.title}</h2>
              <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-6 text-xs font-semibold text-cyan-400 flex items-center gap-1">
              Explore Now →
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full text-center border-t border-gray-800/80 pt-6 text-xs text-gray-500">
        © 2026 Devmavox. Built for Cloud & DevOps Engineers. All rights reserved.
      </div>
    </div>
  );
}
