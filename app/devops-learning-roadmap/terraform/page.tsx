"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Lesson = {
  title: string;
  topics: string[];
  purpose: string;
};

type Module = {
  title: string;
  level: "Foundation" | "Beginner" | "Intermediate" | "Advanced" | "Production";
  duration: string;
  description: string;
  lessons: Lesson[];
};

const modules: Module[] = [
  {
    title: "01. Infrastructure as Code (IaC) & Terraform Foundations",
    level: "Foundation",
    duration: "2-3 days",
    description: "Understand the transition from manual cloud provisioning (ClickOps) to declarative Infrastructure as Code and HashiCorp Configuration Language (HCL).",
    lessons: [
      {
        title: "Introduction to Infrastructure as Code",
        purpose: "Understand why modern DevOps teams refuse manual infrastructure setup and rely on code.",
        topics: [
          "What is Infrastructure as Code (IaC) and why it matters in modern tech",
          "Manual provisioning (ClickOps) versus automated provisioning",
          "Imperative versus Declarative IaC workflows",
          "What is Terraform and its core architecture",
          "Terraform lifecycle: Write, Plan, Apply",
          "Comparison: Terraform versus AWS CloudFormation, Pulumi, and Ansible",
          "Benefits, risks, and limitations of using Terraform in enterprise environments",
          "Understanding the HashiCorp Configuration Language (HCL) syntax basics"
        ]
      },
      {
        title: "Terraform Providers and Registry",
        purpose: "Learn how Terraform communicates with cloud APIs and third-party SaaS tools.",
        topics: [
          "What is a Terraform Provider? (AWS, Azure, GCP, Kubernetes, GitHub, Docker)",
          "The Terraform Registry and official, verified, and community providers",
          "Provider configuration blocks, authentication, and region mapping",
          "Provider version constraints and locking mechanisms (~>, >=, =)",
          "Terraform initialization (`terraform init`) and local plugin storage (.terraform)",
          "Handling multiple providers and provider aliases in a single configuration",
          "Authentication strategies: Environment variables, IAM roles, and CLI profiles",
          "Troubleshooting provider download errors and network timeouts"
        ]
      }
    ]
  },
  {
    title: "02. Core HCL Syntax, Resources, and Data Sources",
    level: "Beginner",
    duration: "3-4 days",
    description: "Master writing robust HCL configurations, managing resources, and querying existing cloud environments.",
    lessons: [
      {
        title: "Resources and Data Sources in Depth",
        purpose: "Learn how to declare infrastructure and dynamically query existing cloud components.",
        topics: [
          "Defining `resource` blocks (Resource Type, Local Name, Arguments)",
          "Resource lifecycle meta-arguments (`create_before_destroy`, `prevent_destroy`, `ignore_changes`)",
          "Handling resource dependencies: Implicit vs Explicit (`depends_on`)",
          "Using `data` sources to fetch existing infrastructure metadata (VPCs, AMIs, Subnets)",
          "Targeted applies (`terraform apply -target`) and resource refreshing",
          "Importing unmanaged cloud resources into Terraform state",
          "Common resource creation errors and debugging syntax issues"
        ]
      },
      {
        title: "Variables, Outputs, and Expressions",
        purpose: "Build reusable, dynamic, and clean infrastructure code using variables and logic.",
        topics: [
          "Input variables (`variable`, types, descriptions, validation rules, defaults)",
          "Local values (`locals`) for complex calculations and reducing code duplication",
          "Output values (`output`, sensitive outputs, cross-module communication)",
          "Conditionals, ternary operators, and expression syntax",
          "Loops and iteration using `count` and `for_each` meta-arguments",
          "Dynamic blocks for generating nested configuration structures (e.g., security group rules)",
          "Type constraints: strings, numbers, bools, lists, maps, objects, and tuples"
        ]
      },
      {
        title: "The Terraform State Mechanics",
        purpose: "Understand state management, tracking, and how Terraform maps config to reality.",
        topics: [
          "What is `terraform.tfstate` and why Terraform requires it",
          "Local state file structure and JSON format",
          "State locking and preventing concurrent modifications",
          "State inspection commands (`terraform show`, `terraform state list`, `terraform state show`)",
          "State manipulation operations (`terraform state mv`, `terraform state rm`)",
          "Handling corrupted or desynchronized state files",
          "Best practices for keeping sensitive data out of state files"
        ]
      }
    ]
  },
  {
    title: "03. Remote State and Team Collaboration",
    level: "Intermediate",
    duration: "3 days",
    description: "Scale from local individual testing to secure, shared remote backends with state locking.",
    lessons: [
      {
        title: "Remote Backends and Workspaces",
        purpose: "Collaborate safely across engineering teams using cloud storage backends.",
        topics: [
          "Introduction to remote backends (AWS S3 + DynamoDB, Terraform Cloud, Azure Blob)",
          "Configuring S3 backend with state locking and encryption at rest",
          "Backend migration (`terraform init -migrate-state`)",
          "Terraform Workspaces for managing multiple environments (dev, staging, prod)",
          "Workspace limitations and when to use directory-based isolation instead",
          "Securing backend credentials and IAM permissions in corporate networks"
        ]
      }
    ]
  },
  {
    title: "04. Terraform Modules and Reusability",
    level: "Intermediate",
    duration: "3-4 days",
    description: "Encapsulate infrastructure patterns into reusable, versioned modules for enterprise standardization.",
    lessons: [
      {
        title: "Building and Consuming Modules",
        purpose: "Structure clean code repositories using root and child modules.",
        topics: [
          "Root modules versus child modules structure",
          "Passing inputs into child modules and returning outputs",
          "Module sources (Local file paths, Git repositories, Private/Public Terraform Registry)",
          "Versioning remote modules using Git tags and semantic versioning",
          "Building an enterprise-grade VPC or EKS cluster module from scratch",
          "Writing clear documentation and README files for custom modules",
          "Refactoring monolithic configurations into modular architectures"
        ]
      }
    ]
  },
  {
    title: "05. Advanced Terraform Patterns & Automated Testing",
    level: "Advanced",
    duration: "4 days",
    description: "Implement complex data manipulation, policy enforcement, and automated IaC testing frameworks.",
    lessons: [
      {
        title: "Advanced Expressions and Refactoring",
        purpose: "Handle complex data transformations and large infrastructure restructuring.",
        topics: [
          "Advanced collection functions (`lookup`, `merge`, `zipmap`, `templatefile`)",
          "Provider aliases for multi-region and multi-account setups",
          "Splitting large states safely without downtime using state commands",
          "Using `terraform plan -out` to ensure immutable, predictable applies",
          "Handling circular dependencies and resource refactoring"
        ]
      },
      {
        title: "Testing and Policy-as-Code",
        purpose: "Validate infrastructure configurations before deploying to production.",
        topics: [
          "Built-in Terraform test framework (`*.tftest.hcl`)",
          "Static code analysis tools (TFLint, Checkov, tfsec, Trivy)",
          "Policy-as-Code with Sentinel and Open Policy Agent (OPA)",
          "Mocking providers and outputs in automated tests",
          "Integrating compliance checks into development workflows"
        ]
      }
    ]
  },
  {
    title: "06. Terraform in CI/CD and GitOps Workflows",
    level: "Advanced",
    duration: "3-4 days",
    description: "Automate Terraform plans and applies securely within GitHub Actions, GitLab CI, or Terraform Cloud.",
    lessons: [
      {
        title: "CI/CD Pipeline Automation",
        purpose: "Transform manual CLI applies into secure, reviewable pull request workflows.",
        topics: [
          "Designing a secure CI/CD pipeline for Terraform (PR validation -> Plan comment -> Approval -> Apply)",
          "Managing cloud credentials and API tokens securely in GitHub Actions / GitLab CI",
          "Handling pipeline concurrency, locking, and parallel runs",
          "Automated plan commenting on GitHub pull requests",
          "Drift detection pipelines running on scheduled cron jobs"
        ]
      }
    ]
  },
  {
    title: "07. Production Troubleshooting, Drift, and Operations",
    level: "Production",
    duration: "Ongoing learning",
    description: "Diagnose configuration drifts, stuck state locks, provider bugs, and failed deployments.",
    lessons: [
      {
        title: "Debugging and Incident Management",
        purpose: "Build a systematic approach to resolving production IaC incidents.",
        topics: [
          "Identifying and resolving configuration drift (manual changes vs code)",
          "Fixing stuck state locks (`terraform force-unlock`)",
          "Handling API rate limits, transient cloud errors, and provider bugs",
          "Enabling deep debug logs (`TF_LOG=DEBUG` and `TF_LOG_PATH`)",
          "Emergency state file recovery and manual JSON patching",
          "Handling destroyed resources and recreating dangling cloud objects"
        ]
      }
    ]
  },
  {
    title: "08. Terraform Interview & Career Readiness",
    level: "Production",
    duration: "Ongoing revision",
    description: "Master architectural design discussions, scenario questions, and enterprise best practices.",
    lessons: [
      {
        title: "Interview Questions and Architectural Trade-offs",
        purpose: "Articulate design decisions and troubleshoot real-world production scenarios.",
        topics: [
          "How state locking works and why it prevents race conditions",
          "Modules vs Copy-Paste: Architectural trade-offs and best practices",
          "How to securely handle database passwords and API keys in Terraform",
          "Zero-downtime strategies for updating immutable cloud resources",
          "Scenario: How do you recover when someone deletes the state file?",
          "HashiCorp Certified Terraform Associate exam preparation guide"
        ]
      }
    ]
  }
];

const levelStyles: Record<Module["level"], string> = {
  Foundation: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  Beginner: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  Intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
  Advanced: "bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300",
  Production: "bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300",
};

export default function TerraformRoadmapPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [expanded, setExpanded] = useState<number[]>([0, 1]);
  const [completed, setCompleted] = useState<string[]>([]);

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return modules
      .map((module, index) => ({ ...module, originalIndex: index }))
      .filter((module) => level === "All" || module.level === level)
      .map((module) => ({
        ...module,
        lessons: module.lessons.filter((lesson) => {
          const text = [
            lesson.title,
            lesson.purpose,
            ...lesson.topics,
            module.title,
            module.description,
          ]
            .join(" ")
            .toLowerCase();

          return !query || text.includes(query);
        }),
      }))
      .filter((module) => module.lessons.length > 0);
  }, [search, level]);

  const allLessons = modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      id: `${moduleIndex}-${lessonIndex}`,
      module: module.title,
      lesson: lesson.title,
    })),
  );

  const progress = Math.round(
    (completed.length / allLessons.length) * 100,
  );

  function toggleModule(index: number) {
    setExpanded((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  function toggleLesson(id: string) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
          <Link href="/devops-learning-roadmap" className="rounded-lg px-3 py-2 font-semibold hover:bg-white hover:text-purple-600 dark:hover:bg-slate-900">← Back to Roadmaps</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">Terraform Roadmap</span>
        </nav>

        <section className="relative isolate overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14">
          <div className="absolute -right-16 -top-24 -z-10 h-80 w-80 rounded-full bg-purple-500/25 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 -z-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-purple-200">Infrastructure as Code · Enterprise DevOps</div>
          <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">Terraform Learning Roadmap</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">Master HashiCorp Terraform from core HCL syntax and state management to remote backends, reusable modules, CI/CD pipeline automation, and production troubleshooting.</p>
          
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["8", "Comprehensive modules"],
              ["5", "Learning proficiency levels"],
              ["HCL & State", "Core foundation"],
              ["Production", "Operations & Career"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <div className="text-xl font-black text-white">{value}</div>
                <div className="mt-1 text-xs text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto mt-10 grid max-w-7xl gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-bold">Your learning progress</h2>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Topics completed</span>
                <span className="font-bold">{completed.length}/{allLessons.length}</span>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full rounded-full bg-purple-600 transition-all dark:bg-purple-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{progress}% of roadmap modules finished</p>
              <button type="button" onClick={() => setCompleted([])} className="mt-4 text-sm font-semibold text-purple-600 hover:text-purple-800 dark:text-purple-400">Reset progress</button>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-bold">Recommended Learning Order</h2>
              <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                <li>1. IaC philosophy & Providers</li>
                <li>2. HCL resources & State mechanics</li>
                <li>3. Remote state & S3 backends</li>
                <li>4. Reusable modules & Git repos</li>
                <li>5. Automated testing & CI/CD</li>
                <li>6. Production drift & troubleshooting</li>
              </ol>
            </section>
          </aside>

          <section className="min-w-0">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black sm:text-3xl">Complete Learning Path</h2>
                <p className="mt-1 text-slate-600 dark:text-slate-400">Explore modules, learning objectives, and detailed subtopics below.</p>
              </div>
              <div className="text-sm font-semibold text-slate-500">{filteredModules.length} of {modules.length} modules shown</div>
            </div>

            <div className="mb-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_190px]">
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Terraform topics..." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 dark:border-slate-700 dark:bg-slate-900" />
              <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-900">
                {["All", "Foundation", "Beginner", "Intermediate", "Advanced", "Production"].map((item) => (
                  <option key={item} value={item}>{item === "All" ? "All levels" : item}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {filteredModules.map((module) => {
                const index = module.originalIndex;
                const isExpanded = expanded.includes(index);

                return (
                  <article key={module.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <button type="button" onClick={() => toggleModule(index)} aria-expanded={isExpanded} className="flex w-full items-start gap-4 p-5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/50 sm:p-6">
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-base font-bold sm:text-lg">{module.title}</span>
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${levelStyles[module.level]}`}>{module.level}</span>
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-slate-600 dark:text-slate-400">{module.description}</span>
                        <span className="mt-3 block text-xs font-medium text-slate-500 dark:text-slate-400">{module.lessons.length} lessons · {module.duration}</span>
                      </span>
                      <span aria-hidden="true" className="shrink-0 text-xl text-slate-400">{isExpanded ? "−" : "+"}</span>
                    </button>

                    {isExpanded && (
                      <div className="space-y-4 border-t border-slate-100 p-4 dark:border-slate-800 sm:p-6">
                        {module.lessons.map((lesson) => {
                          const lessonIndex = modules[index].lessons.findIndex((item) => item.title === lesson.title);
                          const id = `${index}-${lessonIndex}`;
                          const isComplete = completed.includes(id);

                          return (
                            <section key={lesson.title} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-950 sm:p-5">
                              <label className="flex cursor-pointer items-start gap-3">
                                <input type="checkbox" checked={isComplete} onChange={() => toggleLesson(id)} className="mt-1 h-4 w-4 accent-purple-600" />
                                <span className="min-w-0 flex-1">
                                  <span className={`block font-bold ${isComplete ? "text-slate-400 line-through dark:text-slate-600" : "text-slate-900 dark:text-slate-100"}`}>{lesson.title}</span>
                                  <span className="mt-2 block text-sm leading-6 text-slate-600 dark:text-slate-400">{lesson.purpose}</span>
                                </span>
                              </label>

                              <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Topics to understand</h3>
                                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                                  {lesson.topics.map((topic) => (
                                    <li key={topic} className="flex items-start gap-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                      <span className="mt-0.5 text-purple-600 dark:text-purple-400">•</span>
                                      <span>{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </section>
                          );
                        })}
                      </div>
                    )}
                  </article>
                );
              })}

              {filteredModules.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
                  <p className="font-bold">No matching modules found</p>
                  <p className="mt-2 text-sm text-slate-500">Try another search term or select “All levels”.</p>
                  <button onClick={() => { setSearch(""); setLevel("All"); }} className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-sm font-bold text-white hover:bg-purple-500">Clear filters</button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
