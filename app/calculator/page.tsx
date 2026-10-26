'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CalculatorPage() {
  const [nodes, setNodes] = useState(3);
  const [storage, setStorage] = useState(50); // in GB
  const [includeMonitoring, setIncludeMonitoring] = useState(true);

  // Simple pricing logic calculation
  const nodeCost = nodes * 35; // $35 per EKS node/month approx
  const storageCost = storage * 0.10; // $0.10 per GB
  const monitoringCost = includeMonitoring ? 25 : 0; // $25 flat for Prometheus/Grafana
  const totalCost = (nodeCost + storageCost + monitoringCost).toFixed(2);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-10">
      {/* Navbar */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-10 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-cyan-400">Devmavox Estimator</h1>
          <p className="text-sm text-gray-400 mt-1">Cloud Infrastructure & Kubernetes Cluster Cost Calculator</p>
        </div>
        <Link href="/" className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-xl transition border border-gray-700">
          ← Back to Home
        </Link>
      </div>

      {/* Main Calculator Card */}
      <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl space-y-8">
        {/* Node Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-200">EKS Worker Nodes (t3.medium or equivalent):</label>
            <span className="text-cyan-400 font-mono font-bold text-lg">{nodes} Nodes</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            value={nodes}
            onChange={(e) => setNodes(Number(e.target.value))}
            className="w-full accent-cyan-500 bg-gray-800 rounded-lg h-2 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 Node</span>
            <span>20 Nodes</span>
          </div>
        </div>

        {/* Storage Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-200">Persistent Storage (EBS / S3 in GB):</label>
            <span className="text-cyan-400 font-mono font-bold text-lg">{storage} GB</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={storage}
            onChange={(e) => setStorage(Number(e.target.value))}
            className="w-full accent-cyan-500 bg-gray-800 rounded-lg h-2 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10 GB</span>
            <span>500 GB</span>
          </div>
        </div>

        {/* Checkbox for Monitoring */}
        <div className="bg-gray-950/60 border border-gray-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Include Prometheus & Grafana Stack</h3>
            <p className="text-xs text-gray-400">Advanced metrics collection and system observability ($25/mo)</p>
          </div>
          <input
            type="checkbox"
            checked={includeMonitoring}
            onChange={(e) => setIncludeMonitoring(e.target.checked)}
            className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
          />
        </div>

        {/* Total Cost Display */}
        <div className="bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-800/50 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">Estimated Monthly Cost</h3>
            <p className="text-xs text-gray-400">Calculated based on average AWS cloud pricing benchmarks.</p>
          </div>
          <div className="text-3xl font-extrabold font-mono text-cyan-300">
            ${totalCost} <span className="text-xs text-gray-400 font-normal">/ month</span>
          </div>
        </div>
      </div>
    </div>
  );
}
