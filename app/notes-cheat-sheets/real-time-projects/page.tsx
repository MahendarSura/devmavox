import NotesRenderer from "../NotesRenderer";
import projectworkflows from "./project-workflows";
import deploymentchecklists from "./deployment-checklists";
import cicdrollback from "./cicd-rollback";

const topics = [
  { title: "Project Workflows", anchor: "project-workflows", data: projectworkflows },
  { title: "Deployment Checklists", anchor: "deployment-checklists", data: deploymentchecklists },
  { title: "CI/CD & Rollback", anchor: "cicd-rollback", data: cicdrollback },
];

export default function NotesSectionPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <a href="/notes-cheat-sheets" className="text-sm text-cyan-300 hover:underline">
          ← All Notes & Cheat Sheets
        </a>
        <p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">Learning Notes</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Real-Time Project Notes</h1>
        <p className="mt-3 text-slate-400">Follow practical DevOps workflows, deployment checklists, CI/CD pipelines, monitoring and rollback.</p>

        <nav className="mt-8 flex flex-wrap gap-3">
          {topics.map((topic) => (
            <a key={topic.anchor} href={"#" + topic.anchor} className="rounded-lg border border-cyan-800 px-4 py-2 text-sm text-cyan-200 hover:bg-slate-800">
              {topic.title}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-12">
          {topics.map((topic) => (
            <section key={topic.anchor} id={topic.anchor} className="scroll-mt-8">
              <h2 className="mb-5 border-b border-slate-700 pb-3 text-2xl font-bold text-cyan-200">
                {topic.title}
              </h2>
              <NotesRenderer data={topic.data} />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

