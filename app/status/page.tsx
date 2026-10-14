'use client';

import Link from 'next/link';

interface ServiceStatus {
  name: string;
  type: string;
  status: 'Operational' | 'Degraded' | 'Maintenance';
  latency: string;
}

const services: ServiceStatus[] = [
  { name: 'AWS EKS Production Cluster', type: 'Kubernetes / Cloud', status: 'Operational', latency: '42ms' },
  { name: 'Amazon ECR Image Registry', type: 'Container Registry', status: 'Operational', latency: '28ms' },
  { name: 'GitHub Actions CI/CD Pipelines', type: 'Automation', status: 'Operational', latency: '1.2s' },
  { name: 'ArgoCD GitOps Sync Engine', type: 'Deployment Controller', status: 'Operational', latency: '15ms' },
  { name: 'Prometheus & Grafana Monitoring', type: 'Observability', status: 'Operational', latency: '35ms' },
  { name: 'Devmavox Edge CDN & Web App', type: 'Vercel Hosting', status: 'Operational', latency: '18ms' },
];

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-10">
      {/* Navbar */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-10 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-cyan-400">Devmavox Status</h1>
          <p className="text-sm text-gray-400 mt-1">Real-Time Infrastructure & Services Health Dashboard</p>
        </div>
        <Link href="/" className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-xl transition border border-gray-700">
          ← Back to Home
        </Link>
      </div>

      {/* Main Status Container */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Overall Status Banner */}
        <div className="bg-emerald-950/40 border border-emerald-800/60 p-6 rounded-2xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <h2 className="text-base font-bold text-emerald-400">All Systems Operational</h2>
              <p className="text-xs text-emerald-300/80">All DevOps pipelines and cloud clusters are running smoothly.</p>
            </div>
          </div>
          <span className="text-xs bg-emerald-900/60 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-700/50 font-mono">
            100% Uptime
          </span>
        </div>

        {/* Services List */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 bg-gray-950/60 border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider flex justify-between items-center">
            <span>Core Infrastructure Component</span>
            <span>Status / Latency</span>
          </div>

          <div className="divide-y divide-gray-800/60">
            {services.map((srv, idx) => (
              <div key={idx} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-gray-800/30 transition">
                <div>
                  <h3 className="text-sm font-semibold text-white">{srv.name}</h3>
                  <p className="text-xs text-gray-400">{srv.type}</p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs font-mono text-gray-400 bg-black/40 px-2.5 py-1 rounded border border-gray-800">
                    {srv.latency}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {srv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
