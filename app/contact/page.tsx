'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-10 flex flex-col justify-between">
      {/* Navbar */}
      <div className="max-w-3xl mx-auto w-full flex justify-between items-center pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-xl font-bold tracking-wider text-cyan-400">Devmavox Support</h1>
        </div>
        <Link href="/" className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-xl transition border border-gray-700">
          ← Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto w-full py-10">
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-3 text-white">Connect with Devmavox Community 🚀</h2>
          <p className="text-gray-300 text-sm mb-8">
            Got questions about DevOps, AWS, or Kubernetes? Join our community or drop a message to get direct support!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href="https://whatsapp.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
            >
              💬 Join WhatsApp Group
            </a>
            <a
              href="https://telegram.org" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2"
            >
              ✈️ Join Telegram Channel
            </a>
          </div>

          <div className="border-t border-gray-800 pt-6 text-left">
            <h3 className="text-sm font-semibold text-cyan-400 mb-2 uppercase tracking-wider">Quick Note:</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              If you want to update your WhatsApp group link, you can easily replace <code className="text-cyan-300 bg-gray-950 px-1.5 py-0.5 rounded">https://whatsapp.com</code> in this file with your actual group invite link anytime!
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pb-4">
        © 2026 Devmavox. Built for DevOps Engineers & Students.
      </div>
    </div>
  );
}
