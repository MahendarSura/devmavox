import Link from "next/link";

export default function ProjectPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/real-time-projects" className="text-cyan-400 hover:text-cyan-300">
          ← Back to Real-Time Projects
        </Link>

        <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-900 p-8">
          <div className="text-6xl">☁️</div>
          <p className="mt-6 text-sm uppercase tracking-widest text-cyan-400">
            Project 1 of 10
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            AWS Cloud Infrastructure
          </h1>
          <p className="mt-5 leading-7 text-slate-300">
            Build cloud infrastructure using AWS services and secure networking.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Project Overview</h2>
          <p className="mt-3 leading-7 text-slate-300">
            This project page is ready for its detailed architecture,
            prerequisites, implementation steps, commands, and validation
            instructions to be added.
          </p>
        </div>
      </div>
    </main>
  );
}
