import Link from 'next/link';
import { useState, useMemo } from 'react';

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
    category: "Kubernetes (kubectl)",
    items: [
      {
        title: "Get Pods across all namespaces",
        command: "kubectl get pods -A",
        description: "Lists every running pod in all namespaces with their current status and node allocation."
      },
      {
        title: "Stream Pod Logs",
        command: "kubectl logs -f <pod-name> -n <namespace>",
        description: "Follows real-time logs for a specific container inside a pod for troubleshooting crash loops."
      },
      {
        title: "Describe failing resource",
        command: "kubectl describe pod <pod-name> -n <namespace>",
        description: "Inspects events, liveness probe failures, and image pull errors."
      }
    ]
  },
  {
    category: "Docker & BuildKit",
    items: [
      {
        title: "Prune unused containers & volumes",
        command: "docker system prune -a --volumes",
        description: "Frees up runner disk space by removing stopped containers, unused networks, and dangling images."
      },
      {
        title: "Build with plain progress",
        command: "docker build --progress=plain -t my-app:latest .",
        description: "Outputs full diagnostic build steps when investigating build failures or cache misses."
      }
    ]
  },
  {
    category: "Git & Version Control",
    items: [
      {
        title: "Interactive rebase last 3 commits",
        command: "git rebase -i HEAD~3",
        description: "Squashes or reorders commit history before opening a pull request."
      },
      {
        title: "Stash untracked files",
        command: "git stash -u",
        description: "Temporarily shelves uncommitted changes including new files without losing workspace state."
      }
    ]
  },
  {
    category: "Ansible Automation",
    items: [
      {
        title: "Run playbook syntax check",
        command: "ansible-playbook -i inventory/prod site.yml --syntax-check",
        description: "Validates playbook YAML syntax before executing deployment automation."
      },
      {
        title: "Test host connectivity",
        command: "ansible all -m ping -i inventory/prod",
        description: "Confirms SSH authentication and Python interpreter readiness across managed nodes."
      }
    ]
  }
];

export default function NotesCheatSheetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(cmd);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return cheatSheetData;
    const q = searchQuery.toLowerCase();
    return cheatSheetData.map(group => ({
      ...group,
      items: group.items.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.command.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      )
    })).filter(group => group.items.length > 0);
  }, [searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📝</span>
            <h1 className="text-3xl font-bold tracking-tight text-white">DevOps Notes & Cheat Sheets</h1>
          </div>
          <p className="text-zinc-400 text-lg">
            Essential production commands, quick references, and enterprise troubleshooting snippets.
          </p>
        </div>
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium rounded-lg transition self-start"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search commands, tools, or keywords (e.g. kubectl, git, prune)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition"
        />
      </div>

      {/* Content Groups */}
      <div className="space-y-12">
        {filteredData.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
            <p className="text-zinc-400 text-lg">No cheat sheet items found matching "{searchQuery}".</p>
          </div>
        ) : (
          filteredData.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {group.category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between hover:border-zinc-700 transition group"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-zinc-100 mb-2">{item.title}</h3>
                      <p className="text-zinc-400 text-xs mb-4 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 flex items-center justify-between gap-3">
                      <code className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-nowrap py-1">
                        {item.command}
                      </code>
                      <button
                        onClick={() => handleCopy(item.command)}
                        className="text-xs px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded transition shrink-0 font-medium"
                      >
                        {copiedCommand === item.command ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
