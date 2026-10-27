'use client';

import Link from "next/link";
import { useState, useMemo } from 'react';

type Level = "Beginner" | "Intermediate" | "Advanced";

type Lab = {
  id?: string;
  title: string;
  category: string;
  level: Level;
  duration: string;
  summary: string;
  skills: string[];
  outcome: string;
  commands?: string[];
};

const categories = [
  { name: "Linux", description: "Commands, permissions, processes and logs." },
  { name: "Git & GitHub", description: "Branches, merges and conflict resolution." },
  { name: "Shell Scripting", description: "Automate repetitive tasks." },
  { name: "Networking", description: "DNS, ports, HTTP and connectivity." },
  { name: "Docker", description: "Images, containers and troubleshooting." },
  { name: "Kubernetes", description: "Deploy and troubleshoot workloads." },
  { name: "AWS", description: "Cloud, IAM, networking and compute." },
  { name: "Terraform", description: "Infrastructure as code and state." },
  { name: "CI/CD", description: "Build, test and deploy applications." },
  { name: "Ansible", description: "Configuration automation." },
  { name: "Monitoring & SRE", description: "Metrics, dashboards and alerts." },
  { name: "DevSecOps", description: "Security checks in delivery pipelines." },
];

const labs: Lab[] = [
  {
    title: "Linux: Investigate a Service That Will Not Start",
    category: "Linux", level: "Beginner", duration: "25–35 min",
    summary: "Use service status and logs to investigate a failed service.",
    skills: ["systemctl", "journalctl", "Log analysis"],
    outcome: "Identify the cause and verify service health.",
    commands: ["systemctl status <service>", "journalctl -u <service> --since today"],
  },
  {
    title: "Git: Resolve a Merge Conflict",
    category: "Git & GitHub", level: "Beginner", duration: "20–30 min",
    summary: "Inspect conflicting changes and complete a merge.",
    skills: ["Branches", "Merge", "Conflict resolution"],
    outcome: "Finish with a verified merge and clean working tree.",
  },
  {
    title: "Docker: Build and Run a Web Application",
    category: "Docker", level: "Beginner", duration: "35–50 min",
    summary: "Build an image, publish a port and inspect the container.",
    skills: ["Dockerfile", "Images", "Ports", "Logs"],
    outcome: "Run the application and understand images versus containers.",
    commands: ["docker --version", "docker build -t sample-web:local .", "docker run --rm -p 8080:80 sample-web:local"],
  },
  {
    title: "Docker: Diagnose a Container That Exits",
    category: "Docker", level: "Intermediate", duration: "25–40 min",
    summary: "Investigate exit status, logs, commands and environment.",
    skills: ["docker ps -a", "docker logs", "Exit codes"],
    outcome: "Find the root cause and verify corrected behavior.",
    commands: ["docker ps -a", "docker logs <container>", "docker inspect <container>"],
  },
  {
    title: "Kubernetes: Diagnose CrashLoopBackOff",
    category: "Kubernetes", level: "Intermediate", duration: "35–50 min",
    summary: "Inspect Pod status, events, logs and configuration.",
    skills: ["kubectl describe", "Logs", "Events", "Probes"],
    outcome: "Resolve the failure and verify a stable workload.",
    commands: ["kubectl get pods", "kubectl describe pod <pod-name>", "kubectl logs <pod-name> --previous"],
  },
  {
    title: "Kubernetes: Service Cannot Reach Pods",
    category: "Kubernetes", level: "Intermediate", duration: "30–45 min",
    summary: "Check labels, selectors, endpoints and ports.",
    skills: ["Services", "Selectors", "Endpoints"],
    outcome: "Verify that the Service routes traffic to healthy Pods.",
    commands: ["kubectl get svc", "kubectl get endpoints", "kubectl get pods --show-labels"],
  },
  {
    title: "AWS: Troubleshoot an Unreachable EC2 Instance",
    category: "AWS", level: "Intermediate", duration: "35–50 min",
    summary: "Review instance status, security groups, routes and access.",
    skills: ["EC2", "Security groups", "Route tables"],
    outcome: "Create a safe diagnostic checklist without exposing credentials.",
  },
  {
    title: "Terraform: Review a Plan Before Applying",
    category: "Terraform", level: "Intermediate", duration: "30–45 min",
    summary: "Format, validate and inspect infrastructure changes.",
    skills: ["fmt", "validate", "plan", "State"],
    outcome: "Explain proposed changes and identify when not to apply.",
    commands: ["terraform fmt -check", "terraform validate", "terraform plan"],
  },
  {
    title: "CI/CD: Investigate a Failed Pipeline Stage",
    category: "CI/CD", level: "Intermediate", duration: "30–45 min",
    summary: "Trace errors through logs, dependencies and test output.",
    skills: ["Pipeline logs", "Build stages", "Tests"],
    outcome: "Identify the root cause and document a verified fix.",
  },
  {
    title: "Monitoring: Investigate a Down Target",
    category: "Monitoring & SRE", level: "Intermediate", duration: "30–45 min",
    summary: "Check endpoint reachability, scrape configuration and health.",
    skills: ["Prometheus", "Metrics", "Alerts"],
    outcome: "Restore metrics collection and explain the alert.",
  },
  {
    title: "DevSecOps: Add a Security Check to CI",
    category: "DevSecOps", level: "Advanced", duration: "45–60 min",
    summary: "Add a dependency or container image scan to a sample pipeline.",
    skills: ["Dependency scanning", "Image scanning", "Security gates"],
    outcome: "Interpret findings and understand remediation and secret handling.",
  },
];

const learningLevels = [
  {
    id: "foundation",
    number: "01",
    title: "Foundation Labs",
    level: "Beginner",
    summary: "Build the core skills needed for everyday DevOps work.",
    topics: ["Linux", "Git & GitHub", "Networking", "Shell Scripting", "Docker"],
    outcomes: [
      "Manage Linux files, permissions and processes.",
      "Create branches, commits and pull requests.",
      "Investigate DNS, ports, HTTP and connectivity.",
      "Write basic scripts and build container images.",
    ],
    color: "border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/30",
  },
  {
    id: "workflows",
    number: "02",
    title: "Real DevOps Workflows",
    level: "Intermediate",
    summary: "Connect tools into delivery and infrastructure workflows.",
    topics: ["CI/CD", "AWS", "Terraform", "Kubernetes", "Ansible", "Helm", "Argo CD", "Monitoring", "DevSecOps"],
    outcomes: [
      "Build and troubleshoot CI/CD pipelines.",
      "Plan cloud infrastructure changes with Terraform.",
      "Deploy workloads with Kubernetes, Helm and GitOps.",
      "Automate configuration and add monitoring and security checks.",
    ],
    color: "border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/30",
  },
  {
    id: "production",
    number: "03",
    title: "Production-Style Practice",
    level: "Advanced",
    summary: "Investigate realistic incidents and validate solutions.",
    topics: ["Troubleshooting", "Expected Outputs", "Root Cause Analysis", "Validation", "Cleanup", "Capstone Projects"],
    outcomes: [
      "Collect evidence before changing a system.",
      "Identify and explain root causes.",
      "Verify fixes using tests, logs, metrics and outputs.",
      "Document rollback, risks and cleanup procedures.",
    ],
    color: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30",
  },
];

const scenarios = [
  {
    title: "Application returns HTTP 502",
    tag: "Networking / Operations",
    detail: "Check proxy logs, upstream health, ports and application logs.",
  },
  {
    title: "Terraform proposes an unexpected replacement",
    tag: "Infrastructure as Code",
    detail: "Inspect the plan, configuration, lifecycle settings and state before applying.",
  },
  {
    title: "CI pipeline passes locally but fails in CI",
    tag: "CI/CD",
    detail: "Compare runtime versions, environment, secrets and dependencies.",
  },
  {
    title: "Kubernetes Pod stays Pending",
    tag: "Kubernetes",
    detail: "Inspect events, resource requests, node capacity, taints and scheduling.",
  },
];

const capstones = [
  ["01", "Dockerized app + CI/CD", "Build, test and publish an application."],
  ["02", "AWS with Terraform", "Plan and provision cloud infrastructure safely."],
  ["03", "Kubernetes deployment", "Deploy with probes, resources and rollback."],
  ["04", "GitOps with Argo CD", "Manage deployment state through Git."],
  ["05", "Monitoring & alerting", "Create metrics, dashboards and useful alerts."],
  ["06", "DevSecOps pipeline", "Add security checks to software delivery."],
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
      {children}
    </span>
  );
}

export default function HandsOnLabsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [expandedLab, setExpandedLab] = useState<string | null>(labs[0].title);
  const [expandedLevel, setExpandedLevel] = useState<string | null>("foundation");
  const [copied, setCopied] = useState<string | null>(null);

  const filteredLabs = useMemo(() => {
    const q = query.trim().toLowerCase();

    return labs.filter((lab) => {
      const matchesCategory = category === "All" || lab.category === category;
      const matchesLevel = level === "All" || lab.level === level;
      const text = [
        lab.title,
        lab.category,
        lab.summary,
        lab.skills.join(" "),
        lab.outcome,
      ].join(" ").toLowerCase();

      return matchesCategory && matchesLevel && (!q || text.includes(q));
    });
  }, [query, category, level]);

  async function copyCommand(command: string) {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(command);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* BACK TO HOME */}
      <div className="mx-auto max-w-7xl px-5 pt-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white transition hover:bg-cyan-700"
        >
          ← Back to Home
        </Link>
      </div>

      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-sm font-bold text-cyan-800 dark:border-cyan-900 dark:bg-cyan-950 dark:text-cyan-200">
              DEVMAVOX PRACTICE PLATFORM
            </p>
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
              Learn by doing
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              DevOps Hands-on <span className="text-cyan-600 dark:text-cyan-400">Labs</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Practise like a DevOps engineer: perform tasks, inspect outputs,
              troubleshoot failures, verify fixes and build real-world projects.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#labs" className="rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white hover:bg-cyan-700">
                Explore all labs →
              </a>
              <a href="#learning-levels" className="rounded-xl border border-slate-300 px-5 py-3 font-bold dark:border-slate-700">
                View learning levels
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Guided practice</Pill>
              <Pill>Expected results</Pill>
              <Pill>Troubleshooting</Pill>
              <Pill>Project-based learning</Pill>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 p-6 text-white">
            <p className="text-sm text-slate-400">THE ENGINEER WORKFLOW</p>
            <h2 className="mt-2 text-2xl font-bold">Learn → Build → Verify</h2>
            {[
              ["01", "Understand the task", "Know the scenario and success criteria."],
              ["02", "Run and investigate", "Use commands, configurations and logs."],
              ["03", "Verify the outcome", "Compare results with expected behavior."],
              ["04", "Troubleshoot and reflect", "Find the root cause and document the fix."],
            ].map(([n, title, detail]) => (
              <div key={n} className="mt-3 flex gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
                <span className="font-mono text-cyan-300">{n}</span>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label="Hands-on Labs navigation" className="mx-auto flex max-w-7xl flex-wrap gap-3 px-5 py-5 sm:px-8">
        <a href="#learning-levels" className="rounded-lg border px-4 py-2 font-semibold">Learning Levels</a>
        <a href="#categories" className="rounded-lg border px-4 py-2 font-semibold">Lab Categories</a>
        <a href="#labs" className="rounded-lg border px-4 py-2 font-semibold">Explore Labs</a>
        <a href="#scenarios" className="rounded-lg border px-4 py-2 font-semibold">Troubleshooting Scenarios</a>
        <a href="#capstones" className="rounded-lg border px-4 py-2 font-semibold">Capstone Projects</a>
      </nav>

      {/* THREE LEARNING LEVELS */}
      <section id="learning-levels" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-14 sm:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
            Your complete DevOps journey
          </p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">Your DevOps Learning Path</h2>
          <p className="mx-auto mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-400">
            Start with fundamentals, connect tools into real workflows, then
            practise production-style troubleshooting and projects.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {learningLevels.map((item) => {
            const isExpanded = expandedLevel === item.id;
            return (
              <article key={item.id} className={`rounded-2xl border p-6 shadow-sm ${item.color}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white font-bold dark:border-slate-700 dark:bg-slate-950">{item.number}</span>
                  <Pill>{item.level}</Pill>
                </div>
                <h3 className="mt-5 text-xl font-extrabold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.summary}</p>
                <h4 className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">Topics covered</h4>
                <div className="mt-3 flex flex-wrap gap-2">{item.topics.map((topic) => <Pill key={topic}>{topic}</Pill>)}</div>
                <button
                  type="button"
                  onClick={() => setExpandedLevel(isExpanded ? null : item.id)}
                  aria-expanded={isExpanded}
                  className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  {isExpanded ? "Hide learning outcomes −" : "Explore this level +"}
                </button>
                {isExpanded && (
                  <div className="mt-5 border-t border-slate-300 pt-5 dark:border-slate-700">
                    <h4 className="font-bold">By the end, you can:</h4>
                    <ul className="mt-3 space-y-3">
                      {item.outcomes.map((outcome) => <li key={outcome} className="flex gap-2 text-sm leading-6"><span className="font-bold text-emerald-600">✓</span><span>{outcome}</span></li>)}
                    </ul>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setCategory("All");
                        setLevel(item.level);
                        document.getElementById("labs")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-5 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-bold text-white hover:bg-cyan-700"
                    >
                      Explore {item.level.toLowerCase()} labs →
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-slate-500">
          Lab availability depends on the exercises implemented below. Use authorized
          test environments and clean up cloud resources after each exercise.
        </p>
      </section>

      {/* RECOMMENDED LEARNING PATHS */}
      <section className="border-y border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-3xl font-black">Recommended Learning Paths</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {[
              ["01", "Foundations", "Linux · Git · Networking · Shell basics"],
              ["02", "Containers & Automation", "Docker · CI/CD · Ansible"],
              ["03", "Cloud & Infrastructure", "AWS · Terraform · IAM"],
              ["04", "Kubernetes & GitOps", "Kubernetes · Helm · Argo CD"],
              ["05", "Production Engineering", "Monitoring · SRE · DevSecOps"],
            ].map(([number, title, detail]) => (
              <a key={number} href="#labs" className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-cyan-400 dark:border-slate-800">
                <span className="font-mono text-sm text-slate-500">{number}</span>
                <h3 className="mt-3 font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{detail}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-14 sm:px-8">
        <h2 className="text-3xl font-black">Lab Categories</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
          Select a technology to filter the available hands-on exercises.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                setCategory(item.name);
                document.getElementById("labs")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-cyan-400 dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="font-bold">{item.name}</h3>
              <p className="mt-2 text-sm leading-5 text-slate-600 dark:text-slate-400">{item.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* SEARCHABLE LAB CATALOGUE */}
      <section id="labs" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-14 sm:px-8">
        <h2 className="text-3xl font-black">Explore Hands-on Labs</h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">Search by problem, filter by technology and difficulty, then expand a lab.</p>
        <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_220px_190px]">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search labs, skills or problems..." aria-label="Search labs" className="rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900" />
          <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter category" className="rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <option value="All">All categories</option>
            {categories.map((item) => <option key={item.name}>{item.name}</option>)}
          </select>
          <select value={level} onChange={(event) => setLevel(event.target.value)} aria-label="Filter difficulty" className="rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <option value="All">All levels</option>
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">{filteredLabs.length} sample labs shown</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("All"); setLevel("All"); }} className="text-sm font-bold text-cyan-700 hover:underline dark:text-cyan-300">Clear filters</button>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {filteredLabs.map((lab: any) => {
            const open = expandedLab === lab.title;
            return (
              <article key={lab.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <button type="button" onClick={() => setExpandedLab(open ? null : lab.title)} aria-expanded={open} className="w-full p-5 text-left sm:p-6">
                  <div className="flex flex-wrap gap-2"><Pill>{lab.category}</Pill><Pill>{lab.level}</Pill><Pill>{lab.duration}</Pill></div>
                  <div className="mt-3 flex items-start justify-between gap-3"><h3 className="text-lg font-extrabold">{lab.title}</h3><span className="text-xl text-cyan-700">{open ? "−" : "+"}</span></div>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{lab.summary}</p>
                </button>
                {open && (
                  <div className="border-t border-slate-200 px-5 pb-5 pt-4 dark:border-slate-800 sm:px-6">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500">Skills practised</h4>
                    <div className="mt-2 flex flex-wrap gap-2">{lab.skills.map((skill: string) => <Pill key={skill}>{skill}</Pill>)}</div>
                    <h4 className="mt-5 text-sm font-bold uppercase tracking-wide text-slate-500">Success criteria</h4>
                    <p className="mt-2 text-sm leading-6">{lab.outcome}</p>
                    {lab.commands && (
                      <>
                        <h4 className="mt-5 text-sm font-bold uppercase tracking-wide text-slate-500">Starter commands</h4>
                        <div className="mt-2 space-y-2">
                          {lab.commands.map((command: string) => (
                            <div key={command} className="flex items-center justify-between gap-3 rounded-xl bg-slate-950 px-3 py-2.5 text-sm text-white">
                              <code className="overflow-x-auto whitespace-nowrap">{command}</code>
                              <button type="button" onClick={() => void copyCommand(command)} className="shrink-0 rounded-lg border border-slate-700 px-2 py-1 text-xs font-semibold hover:bg-slate-800">{copied === command ? "Copied" : "Copy"}</button>
                            </div>
                          ))}
                        </div>
                        <p className="mt-3 text-xs leading-5 text-amber-700 dark:text-amber-300">
                          Use authorized environments. Replace placeholders such as &lt;service&gt; or &lt;pod-name&gt; with actual values.
                        </p>
                      </>
                    )}
                    <div className="mt-5 rounded-xl bg-cyan-50 p-4 text-sm leading-6 text-cyan-950 dark:bg-cyan-950/40 dark:text-cyan-100">
                      <strong>Lab workflow:</strong> Read the scenario → Perform the task → Inspect output and logs → Find the root cause → Verify the fix → Record what you learned.
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        {filteredLabs.length === 0 && (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <h3 className="text-lg font-bold">No labs match these filters</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Try another search or clear the filters.</p>
            <button type="button" onClick={() => { setQuery(""); setCategory("All"); setLevel("All"); }} className="mt-4 rounded-xl bg-cyan-600 px-4 py-2 font-bold text-white">Show all labs</button>
          </div>
        )}
      </section>

      {/* PRODUCTION TROUBLESHOOTING */}
      <section id="scenarios" className="border-y border-slate-200 bg-white py-14 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-3xl font-black">Real-world Troubleshooting Scenarios</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">Practise a repeatable investigation method instead of guessing at fixes.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {scenarios.map((scenario) => (
              <article key={scenario.title} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">{scenario.tag}</p>
                <h3 className="mt-2 text-lg font-extrabold">{scenario.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{scenario.detail}</p>
                <p className="mt-4 text-sm font-semibold">Observe → Investigate → Fix → Verify → Prevent</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CAPSTONE PROJECTS */}
      <section id="capstones" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-14 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-300">Build your portfolio</p>
            <h2 className="mt-2 text-3xl font-black">Go Beyond Individual Commands</h2>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
              Combine tools into end-to-end workflows. Each project should include a repository,
              architecture, setup guide, validation, troubleshooting notes and cleanup instructions.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {capstones.map(([number, title, detail]) => (
              <article key={number} className="flex gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <span className="font-mono text-sm font-bold text-cyan-700 dark:text-cyan-300">{number}</span>
                <div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">{detail}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT STEP */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="rounded-3xl bg-slate-950 px-6 py-10 text-white sm:px-10">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-300">Your next step</p>
          <h2 className="mt-2 text-3xl font-black">Practise. Verify. Troubleshoot. Repeat.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            Start with a beginner lab, note the errors you encounter, and explain every fix in your own words.
          </p>
          <a href="#labs" className="mt-6 inline-flex rounded-xl bg-cyan-500 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-400">Start practising →</a>
          <p className="mt-8 border-t border-slate-800 pt-5 text-xs leading-5 text-slate-400">
            This page provides guided examples, not a live terminal or cloud sandbox.
            Protect credentials, review cloud costs, use authorized environments, and clean up resources after exercises.
          </p>
          <Link href="/" className="mt-5 inline-flex rounded-xl border border-slate-600 px-5 py-3 font-bold text-white hover:bg-slate-800">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}





