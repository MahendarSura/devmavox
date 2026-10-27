
import Link from 'next/link';

interface CheatItem {
  title: string;
  command: string;
  description: string;
}

interface CategoryGroup {
  category: string;
  items: CheatItem[];
}

const cheatSheetData: CategoryGroup[] = [
  {
    category: 'Docker Essentials',
    items: [
      { title: 'Build Image', command: 'docker build -t my-app:v1 .', description: 'Builds a Docker image from a Dockerfile.' },
      { title: 'Run Container', command: 'docker run -d -p 8080:80 my-app:v1', description: 'Runs container in detached mode mapping port 8080.' },
      { title: 'List Running Containers', command: 'docker ps', description: 'Shows active containers.' },
      { title: 'Clean System', command: 'docker system prune -a', description: 'Removes unused data, stopped containers, and images.' },
    ],
  },
  {
    category: 'Kubernetes (kubectl)',
    items: [
      { title: 'Get Pods', command: 'kubectl get pods -A', description: 'Lists all pods across all namespaces.' },
      { title: 'Describe Resource', command: 'kubectl describe pod <pod-name>', description: 'Shows detailed diagnostic info for a pod.' },
      { title: 'View Logs', command: 'kubectl logs -f <pod-name>', description: 'Streams container logs in real-time.' },
      { title: 'Apply Manifest', command: 'kubectl apply -f deployment.yaml', description: 'Creates or updates resources from a YAML file.' },
    ],
  },
  {
    category: 'Terraform Workflow',
    items: [
      { title: 'Initialize', command: 'terraform init', description: 'Initializes working directory and downloads providers.' },
      { title: 'Plan Execution', command: 'terraform plan', description: 'Previews the infrastructure changes to be made.' },
      { title: 'Apply Changes', command: 'terraform apply --auto-approve', description: 'Provisions or updates cloud infrastructure.' },
      { title: 'Destroy Infrastructure', command: 'terraform destroy', description: 'Deletes all resources managed by Terraform.' },
    ],
  },
  {
    category: 'Git & GitHub Workflow',
    items: [
      { title: 'Check Status', command: 'git status', description: 'Displays paths that have differences between index and commit.' },
      { title: 'Stage Changes', command: 'git add .', description: 'Adds all modified or new files to staging area.' },
      { title: 'Commit Changes', command: 'git commit -m "feat: added new feature"', description: 'Records changes to the repository.' },
      { title: 'Push to Remote', command: 'git push origin main', description: 'Uploads local commits to GitHub.' },
    ],
  },
];

export default function CheatSheetPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-10">
      {/* Navbar */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-10 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-cyan-400">Devmavox Cheat Sheet</h1>
          <p className="text-sm text-gray-400 mt-1">Handy Quick Reference Guide for DevOps & Cloud Commands</p>
        </div>
        <Link href="/" className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-xl transition border border-gray-700">
          ← Back to Home
        </Link>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto space-y-8">
        {cheatSheetData.map((group, idx) => (
          <div key={idx} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-lg font-bold text-cyan-400 mb-4 pb-2 border-b border-gray-800">
              {group.category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items.map((item, i) => (
                <div key={i} className="bg-gray-950/70 border border-gray-800/80 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400 mb-3">{item.description}</p>
                  </div>
                  <div className="bg-black/60 border border-gray-800 p-2.5 rounded-lg font-mono text-xs text-cyan-300 overflow-x-auto">
                    <code>{item.command}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
