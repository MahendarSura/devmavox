
'use client';

import { useMemo, useState } from 'react';

type Module = {
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Production';
  duration: string;
  topics: string[];
  outcome: string;
};

const modules: Module[] = [
  {
    title: 'Jira Fundamentals',
    level: 'Beginner',
    duration: '1 day',
    topics: [
      'What Jira is and how DevOps teams use it',
      'Understand projects, issues, boards and workflows',
      'Learn epics, stories, tasks, bugs and subtasks',
      'Understand assignees, reporters, priorities and statuses',
      'Explore Jira Software and Jira Service Management at a high level',
    ],
    outcome: 'Understand Jira terminology and how work is tracked.',
  },
  {
    title: 'Projects, Issues and Navigation',
    level: 'Beginner',
    duration: '1 day',
    topics: [
      'Navigate Jira projects and project settings',
      'Create and update issues',
      'Set descriptions, priorities, assignees and due dates',
      'Use labels, components and versions',
      'Understand issue keys and issue history',
    ],
    outcome: 'Create and manage work items with consistent information.',
  },
  {
    title: 'Issue Types and Work Breakdown',
    level: 'Beginner',
    duration: '1 day',
    topics: [
      'Understand epics, stories, tasks, bugs and subtasks',
      'Break large requirements into smaller work items',
      'Link related and dependent issues',
      'Use acceptance criteria and definition of done',
      'Organize work for development and operations teams',
    ],
    outcome: 'Structure work so teams can plan and track delivery.',
  },
  {
    title: 'Scrum Boards and Agile Planning',
    level: 'Beginner',
    duration: '1–2 days',
    topics: [
      'Understand Scrum roles, events and artifacts',
      'Create and manage a product backlog',
      'Plan sprints and estimate work',
      'Move issues through a sprint board',
      'Track sprint goals, burndown and completed work',
    ],
    outcome: 'Use Jira to support sprint planning and delivery.',
  },
  {
    title: 'Kanban Boards and Flow Management',
    level: 'Beginner',
    duration: '1 day',
    topics: [
      'Understand Kanban principles and continuous flow',
      'Configure board columns and issue mappings',
      'Understand work-in-progress limits',
      'Track cycle time and throughput',
      'Identify blocked work and bottlenecks',
    ],
    outcome: 'Visualize and improve the flow of work across a team.',
  },
  {
    title: 'JQL — Jira Query Language',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Search issues using project, status and assignee',
      'Use AND, OR, NOT and parentheses',
      'Filter by priority, labels and issue type',
      'Use operators such as IN, WAS and ORDER BY',
      'Understand relative date searches and supported functions',
      'Save filters for dashboards and team reporting',
    ],
    outcome: 'Build precise searches for operational and project reporting.',
  },
  {
    title: 'Workflows and Status Transitions',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Understand workflow statuses and transitions',
      'Design workflows for development and incident work',
      'Configure transition conditions and validators',
      'Understand workflow rules and post-functions',
      'Map board columns to workflow statuses',
      'Test workflow changes before rolling them out',
    ],
    outcome: 'Design workflows that reflect how teams actually work.',
  },
  {
    title: 'Screens, Fields and Issue Configuration',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Understand system and custom fields',
      'Configure screens and field layouts where supported',
      'Use field contexts and options appropriately',
      'Understand field configuration schemes',
      'Make required fields useful rather than excessive',
      'Avoid breaking existing workflows with configuration changes',
    ],
    outcome: 'Create consistent issue forms without unnecessary complexity.',
  },
  {
    title: 'Permissions, Roles and Access Control',
    level: 'Intermediate',
    duration: '1–2 days',
    topics: [
      'Understand project roles and permission schemes',
      'Manage browse, edit and transition permissions',
      'Understand issue security levels',
      'Apply least-privilege access',
      'Review access when teams or responsibilities change',
      'Avoid exposing sensitive incident or customer information',
    ],
    outcome: 'Control who can view and modify work items.',
  },
  {
    title: 'Automation Rules',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Understand triggers, conditions and actions',
      'Automatically assign issues based on rules',
      'Update fields during workflow transitions',
      'Send notifications and create linked issues',
      'Use scheduled rules for routine maintenance',
      'Inspect rule audit logs and prevent automation loops',
    ],
    outcome: 'Reduce repetitive work with controlled Jira automation.',
  },
  {
    title: 'Dashboards, Filters and Reports',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Create and share saved filters',
      'Build dashboards with relevant gadgets',
      'Understand sprint, velocity and burndown reports',
      'Track unresolved bugs and overdue work',
      'Report blockers and workload trends',
      'Choose metrics that help decisions instead of vanity metrics',
    ],
    outcome: 'Create useful views of delivery progress and operational work.',
  },
  {
    title: 'Releases, Versions and Components',
    level: 'Intermediate',
    duration: '1–2 days',
    topics: [
      'Organize work with components and versions',
      'Track issues targeted for a release',
      'Understand release readiness and unresolved work',
      'Connect deployment references to relevant issues',
      'Use fix versions consistently',
      'Document release notes and known issues',
    ],
    outcome: 'Track work across application versions and release milestones.',
  },
  {
    title: 'Jira for DevOps and Incident Management',
    level: 'Advanced',
    duration: '2 days',
    topics: [
      'Track incidents, defects and operational improvements',
      'Link incidents to problems and follow-up tasks',
      'Create post-incident action items',
      'Track root-cause analysis and corrective actions',
      'Use severity and priority consistently',
      'Build dashboards for incident trends and remediation',
    ],
    outcome: 'Connect operational incidents to accountable follow-up work.',
  },
  {
    title: 'Jira Integration with Git and CI/CD',
    level: 'Advanced',
    duration: '2–3 days',
    topics: [
      'Connect Jira with supported Git hosting platforms',
      'Reference issue keys in branches, commits and pull requests',
      'Understand development panels and linked development activity',
      'Integrate deployment information where supported',
      'Use Jira issues to coordinate CI/CD work',
      'Protect tokens and follow integration permissions',
    ],
    outcome: 'Connect development activity and delivery tracking to Jira issues.',
  },
  {
    title: 'REST APIs and Integration Concepts',
    level: 'Advanced',
    duration: '2 days',
    topics: [
      'Understand REST API resources and HTTP methods',
      'Read API documentation for the Jira deployment type',
      'Query issues and retrieve selected fields',
      'Understand authentication, scopes and permissions',
      'Handle pagination, errors and rate limits',
      'Avoid exposing API tokens in scripts and logs',
    ],
    outcome: 'Understand how Jira can exchange information with other tools.',
  },
  {
    title: 'Atlassian Ecosystem and Confluence',
    level: 'Advanced',
    duration: '1–2 days',
    topics: [
      'Understand Jira and Confluence use cases',
      'Link requirements, technical documentation and issues',
      'Maintain runbooks and decision records',
      'Connect documentation with project work',
      'Understand app integrations and Marketplace considerations',
      'Review app permissions, data access and compatibility',
    ],
    outcome: 'Connect work tracking with documentation and team knowledge.',
  },
  {
    title: 'Jira Administration and Governance',
    level: 'Advanced',
    duration: '2–3 days',
    topics: [
      'Understand project configuration and shared schemes',
      'Manage workflows, permissions and notification settings',
      'Standardize issue types and naming conventions',
      'Review configuration changes and their impact',
      'Understand audit logs and administrative responsibilities',
      'Plan migrations and configuration changes carefully',
    ],
    outcome: 'Maintain consistent Jira configuration as teams grow.',
  },
  {
    title: 'Jira Service Management and Change Processes',
    level: 'Advanced',
    duration: '2 days',
    topics: [
      'Understand service projects, requests and queues',
      'Explore incident, problem and change management concepts',
      'Understand request types and service-level agreements',
      'Coordinate change approvals and deployment windows',
      'Link service requests with engineering issues',
      'Understand which capabilities depend on product plan or configuration',
    ],
    outcome: 'Understand how service operations and engineering work can be coordinated.',
  },
  {
    title: 'Troubleshooting and Performance',
    level: 'Production',
    duration: '2 days',
    topics: [
      'Troubleshoot permission and workflow transition errors',
      'Investigate incorrect board filters and missing issues',
      'Diagnose automation rules that fail or run repeatedly',
      'Troubleshoot Git and CI/CD integration issues',
      'Understand API errors, authentication failures and rate limits',
      'Collect relevant evidence before escalating an issue',
    ],
    outcome: 'Resolve common Jira usage, configuration and integration problems.',
  },
  {
    title: 'Production Practices and Interview Preparation',
    level: 'Production',
    duration: '2 days',
    topics: [
      'Design project structures for multiple teams',
      'Create maintainable workflows and access policies',
      'Explain Scrum, Kanban, JQL and automation with examples',
      'Build reports that support delivery and incident decisions',
      'Discuss Jira integrations in a DevOps release pipeline',
      'Practise scenario-based administration and troubleshooting questions',
    ],
    outcome: 'Explain practical Jira usage and administration decisions confidently.',
  },
];

const projects = [
  {
    title: 'Project 1 — Agile Sprint Board',
    level: 'Beginner',
    details:
      'Create a sample project, organize an epic and stories, plan a sprint and track work through a board.',
    deliverable: 'Issue hierarchy, sprint board and completed sprint summary.',
  },
  {
    title: 'Project 2 — JQL Operations Dashboard',
    level: 'Intermediate',
    details:
      'Create filters for open bugs, overdue tasks, blocked work and work assigned to a team.',
    deliverable: 'Saved JQL filters and a dashboard with relevant reports.',
  },
  {
    title: 'Project 3 — Automated Issue Workflow',
    level: 'Intermediate',
    details:
      'Design a workflow and automation rules for assignment, notifications and follow-up task creation.',
    deliverable: 'Workflow diagram, rule configuration and test cases.',
  },
  {
    title: 'Project 4 — DevOps Delivery Tracking',
    level: 'Advanced',
    details:
      'Coordinate a sample CI/CD release using Jira issues linked to branches, commits, pull requests and deployment records.',
    deliverable: 'Release board, issue traceability and deployment checklist.',
  },
  {
    title: 'Project 5 — Incident and Change Management',
    level: 'Production',
    details:
      'Model an incident, record investigation actions, track corrective work and document a controlled change process.',
    deliverable: 'Incident workflow, follow-up issues and operational runbook.',
  },
];

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Production'] as const;

export default function JiraRoadmapPage() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<(typeof levels)[number]>('All');
  const [completed, setCompleted] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<number[]>([0]);

  const filteredModules = useMemo(() => {
    const q = query.trim().toLowerCase();

    return modules
      .map((module, index) => ({ ...module, index }))
      .filter((module) => level === 'All' || module.level === level)
      .filter(
        (module) =>
          !q ||
          module.title.toLowerCase().includes(q) ||
          module.topics.some((topic) => topic.toLowerCase().includes(q)) ||
          module.outcome.toLowerCase().includes(q),
      );
  }, [query, level]);

  const toggleCompleted = (index: number) => {
    setCompleted((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const toggleExpanded = (index: number) => {
    setExpanded((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const progress = Math.round((completed.length / modules.length) * 100);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 p-6 shadow-2xl sm:p-10">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
              DEVOPS LEARNING ROADMAP
            </span>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              Beginner to Production
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Jira Roadmap
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Learn Agile project management, Scrum and Kanban boards, JQL,
            workflows, automation, dashboards, DevOps integrations and
            production governance through a structured learning path.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Learning modules</p>
              <p className="mt-1 text-3xl font-bold">{modules.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Portfolio projects</p>
              <p className="mt-1 text-3xl font-bold">{projects.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Your progress</p>
              <p className="mt-1 text-3xl font-bold">{progress}%</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
          <h2 className="text-xl font-bold">How to use this roadmap</h2>
          <ol className="mt-3 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
            <li>1. Follow the modules in order, from fundamentals to production.</li>
            <li>2. Practise using a test project or sandbox Jira workspace.</li>
            <li>3. Mark modules complete as you finish learning them.</li>
            <li>4. Build the projects and document your workflows and reports.</li>
          </ol>
          <p className="mt-3 text-sm text-slate-400">
            Progress is held in the current page session and may reset when you
            refresh or leave the page.
          </p>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Learning path</h2>
              <p className="mt-1 text-sm text-slate-400">
                Search concepts or filter by skill level.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search topics..."
                aria-label="Search roadmap topics"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400 sm:w-64"
              />
              <select
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value as (typeof levels)[number])
                }
                aria-label="Filter modules by level"
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
              >
                {levels.map((item) => (
                  <option key={item} value={item}>
                    {item === 'All' ? 'All levels' : item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {filteredModules.map((module) => {
              const isExpanded = expanded.includes(module.index);
              const isCompleted = completed.includes(module.index);

              return (
                <article
                  key={module.title}
                  className={`overflow-hidden rounded-2xl border bg-slate-900/80 transition ${
                    isCompleted
                      ? 'border-emerald-700/70'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
                    <div className="flex flex-1 gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 font-bold text-blue-300">
                        {String(module.index + 1).padStart(2, '0')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold">{module.title}</h3>
                          <span className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-300">
                            {module.level}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-400">
                          Suggested time: {module.duration}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {module.outcome}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={() => toggleCompleted(module.index)}
                          className="h-4 w-4 accent-emerald-500"
                        />
                        Done
                      </label>
                      <button
                        type="button"
                        onClick={() => toggleExpanded(module.index)}
                        aria-expanded={isExpanded}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-sm transition hover:border-blue-400"
                      >
                        {isExpanded ? 'Hide topics' : 'View topics'}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-800 bg-slate-950/40 px-5 py-5 sm:pl-20">
                      <h4 className="text-sm font-semibold text-blue-300">
                        Concepts to cover
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex gap-3 text-sm leading-6 text-slate-300"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}

            {filteredModules.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
                <p className="font-semibold">No matching modules</p>
                <p className="mt-2 text-sm text-slate-400">
                  Try another search term or select All levels.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setLevel('All');
                  }}
                  className="mt-4 rounded-lg bg-blue-400 px-4 py-2 text-sm font-semibold text-slate-950"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-12">
          <div>
            <h2 className="text-2xl font-bold">Portfolio projects</h2>
            <p className="mt-1 text-sm text-slate-400">
              Build these after learning the related modules.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold">{project.title}</h3>
                  <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-2.5 py-1 text-xs text-blue-300">
                    {project.level}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {project.details}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  <span className="font-semibold text-slate-200">
                    Deliverable:
                  </span>{' '}
                  {project.deliverable}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-blue-400/20 bg-blue-400/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Interview preparation checklist</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Practise explaining each concept with a practical example and a
            realistic team or delivery scenario.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              'Jira projects, issues and issue types',
              'Scrum vs Kanban boards',
              'Epics, stories, tasks and subtasks',
              'JQL filters and saved searches',
              'Workflow statuses and transitions',
              'Custom fields and screen configuration',
              'Permission schemes and issue security',
              'Automation rules and audit logs',
              'Dashboards, filters and Agile reports',
              'Git and CI/CD integration concepts',
              'REST API authentication and pagination',
              'Incident, change and release tracking',
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-sm text-slate-300"
              >
                <span className="text-blue-300">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-10 border-t border-slate-800 pt-5 text-sm text-slate-500">
          DevMavox · Jira Learning Roadmap · Plan, track, collaborate and improve.
        </footer>
      </div>
    </main>
  );
}
