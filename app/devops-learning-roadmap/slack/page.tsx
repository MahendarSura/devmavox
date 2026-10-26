
'use client';

import { useMemo, useState } from 'react';

type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'Production';

type Module = {
  id: number;
  title: string;
  level: Level;
  duration: string;
  topics: string[];
  task: string;
};

const modules: Module[] = [
  {
    id: 1,
    title: 'Slack Fundamentals',
    level: 'Beginner',
    duration: '1 hour',
    topics: ['What is Slack?', 'Workspaces and channels', 'Direct messages', 'Threads and replies', 'Slack vs email'],
    task: 'Create a sample workspace layout for a DevOps team.',
  },
  {
    id: 2,
    title: 'Workspace and Team Setup',
    level: 'Beginner',
    duration: '1 hour',
    topics: ['Workspace settings', 'Member roles', 'User profiles', 'Channel naming conventions', 'Team communication guidelines'],
    task: 'Design a workspace structure for development, operations and security teams.',
  },
  {
    id: 3,
    title: 'Channels for DevOps Teams',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['Public and private channels', 'Project channels', 'Environment-specific channels', 'Incident channels', 'Channel descriptions and topics'],
    task: 'Plan channels such as #devops-alerts, #deployments, #incidents and #engineering.',
  },
  {
    id: 4,
    title: 'Messaging and Collaboration',
    level: 'Beginner',
    duration: '1 hour',
    topics: ['Mentions and notifications', 'Threads', 'Message formatting', 'File sharing', 'Bookmarks and saved items'],
    task: 'Write a clear deployment update with status, impact, owner and next steps.',
  },
  {
    id: 5,
    title: 'Notifications and Focus',
    level: 'Beginner',
    duration: '1 hour',
    topics: ['Notification preferences', 'Keywords and mentions', 'Do Not Disturb', 'Notification schedules', 'Reducing alert fatigue'],
    task: 'Create a notification policy that prioritizes production incidents over routine messages.',
  },
  {
    id: 6,
    title: 'Slack Workflow Builder',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Workflow concepts', 'Workflow triggers', 'Forms and input collection', 'Workflow steps', 'Approvals and limitations'],
    task: 'Design a workflow for collecting deployment requests from team members.',
  },
  {
    id: 7,
    title: 'Slack Apps and Integrations',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Slack app directory', 'App permissions', 'Adding integrations', 'Managing installed apps', 'Security review'],
    task: 'Prepare an approved integration list for source control, CI/CD and monitoring.',
  },
  {
    id: 8,
    title: 'GitHub Notifications in Slack',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['GitHub app integration', 'Repository subscriptions', 'Pull request notifications', 'Issue notifications', 'Filtering noisy updates'],
    task: 'Design a channel workflow for pull requests, reviews and release announcements.',
  },
  {
    id: 9,
    title: 'Jenkins and CI/CD Notifications',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Build status messages', 'Pipeline failure notifications', 'Deployment announcements', 'Build links', 'Notification routing'],
    task: 'Define a notification format for successful and failed pipeline runs.',
  },
  {
    id: 10,
    title: 'AWS and Cloud Notifications',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['CloudWatch alert delivery concepts', 'AWS notification integrations', 'Incident routing', 'Environment labels', 'Avoiding duplicate alerts'],
    task: 'Design an alert-routing plan for development, staging and production environments.',
  },
  {
    id: 11,
    title: 'Prometheus and Grafana Alerts',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['Alert notification concepts', 'Grafana contact points', 'Alert routing', 'Alert severity levels', 'Runbook links'],
    task: 'Design a Slack alert message with severity, affected service, dashboard and runbook.',
  },
  {
    id: 12,
    title: 'Incident Management in Slack',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['Incident channel creation', 'Incident roles', 'Status updates', 'Escalation procedures', 'Incident timeline'],
    task: 'Create a simulated incident communication plan for a production outage.',
  },
  {
    id: 13,
    title: 'On-Call and Escalation',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['On-call communication', 'Escalation channels', 'Acknowledgement practices', 'Handover notes', 'Integration with on-call tools'],
    task: 'Write an on-call handover template containing open incidents and pending actions.',
  },
  {
    id: 14,
    title: 'Slack API Fundamentals',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Slack API overview', 'Web API concepts', 'API methods and scopes', 'Authentication tokens', 'Rate limits'],
    task: 'Read the official API documentation and identify the minimum scopes for a test integration.',
  },
  {
    id: 15,
    title: 'Incoming Webhooks',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['Webhook concepts', 'Creating an approved webhook', 'JSON payloads', 'Message formatting', 'Secret protection'],
    task: 'Plan a test webhook notification without committing the webhook URL to source control.',
  },
  {
    id: 16,
    title: 'Custom Slack Bot Basics',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Bot users', 'App configuration', 'Event subscriptions', 'Message posting', 'Secure credential storage'],
    task: 'Design a bot that posts deployment summaries to a designated test channel.',
  },
  {
    id: 17,
    title: 'CI/CD Automation Patterns',
    level: 'Production',
    duration: '3 hours',
    topics: ['GitHub Actions integration', 'Jenkins notification steps', 'Build and release summaries', 'Conditional notifications', 'Failure handling'],
    task: 'Document a pipeline notification design with success, failure and rollback messages.',
  },
  {
    id: 18,
    title: 'Security and Governance',
    level: 'Production',
    duration: '2 hours',
    topics: ['Least-privilege app access', 'Token rotation', 'Secret redaction', 'Workspace policies', 'Audit and retention settings'],
    task: 'Create a security checklist for Slack integrations used by a production DevOps team.',
  },
  {
    id: 19,
    title: 'Troubleshooting Integrations',
    level: 'Production',
    duration: '2 hours',
    topics: ['Missing notifications', 'Invalid authentication', 'Insufficient scopes', 'Rate limits and retries', 'Webhook and payload errors'],
    task: 'Create a troubleshooting runbook for failed CI/CD notifications.',
  },
  {
    id: 20,
    title: 'Production Communication Strategy',
    level: 'Production',
    duration: '2 hours',
    topics: ['Channel ownership', 'Incident communication standards', 'Alert noise reduction', 'Post-incident reviews', 'Continuous improvement'],
    task: 'Design a complete Slack communication strategy for a DevOps team operating production services.',
  },
];

const projects = [
  {
    title: 'Project 1 — DevOps Workspace',
    level: 'Beginner',
    tools: 'Slack',
    details: 'Plan channels, team roles, naming conventions and communication guidelines.',
  },
  {
    title: 'Project 2 — GitHub Notifications',
    level: 'Intermediate',
    tools: 'Slack, GitHub',
    details: 'Configure an approved integration for pull requests, issues and release updates.',
  },
  {
    title: 'Project 3 — CI/CD Notification Design',
    level: 'Intermediate',
    tools: 'Slack, Jenkins or GitHub Actions',
    details: 'Design pipeline success, failure and deployment notification messages.',
  },
  {
    title: 'Project 4 — Monitoring Alert Routing',
    level: 'Advanced',
    tools: 'Slack, Grafana, Prometheus',
    details: 'Plan severity-based alert delivery with dashboard and runbook references.',
  },
  {
    title: 'Project 5 — Incident Communication',
    level: 'Production',
    tools: 'Slack, CI/CD and monitoring tools',
    details: 'Build an incident channel template with ownership, updates, escalation and review steps.',
  },
];

const interviewQuestions = [
  'Why do DevOps teams use Slack?',
  'How do channels and threads improve collaboration?',
  'How would you organize Slack channels for a production team?',
  'How can GitHub notifications be delivered to Slack?',
  'How can Jenkins send pipeline notifications to Slack?',
  'How do you reduce unnecessary notification noise?',
  'What is Slack Workflow Builder?',
  'What are Slack apps and integrations?',
  'What is an incoming webhook?',
  'How should Slack API tokens be protected?',
  'How can Grafana alerts be routed to Slack?',
  'How would you communicate a production incident?',
  'How do you troubleshoot missing Slack notifications?',
  'Why are API scopes and least privilege important?',
  'What information belongs in a deployment notification?',
];

const levels: Array<'All' | Level> = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Production',
];

export default function SlackRoadmapPage() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState<'All' | Level>('All');
  const [expanded, setExpanded] = useState<number[]>([1]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [showProjects, setShowProjects] = useState(true);
  const [showInterview, setShowInterview] = useState(false);

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return modules.filter((module) => {
      const matchesLevel = level === 'All' || module.level === level;
      const searchableText = [
        module.title,
        module.level,
        ...module.topics,
        module.task,
      ]
        .join(' ')
        .toLowerCase();

      return matchesLevel && searchableText.includes(query);
    });
  }, [search, level]);

  const progress = Math.round((completed.length / modules.length) * 100);

  function toggleExpanded(id: number) {
    setExpanded((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function toggleCompleted(id: number) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-3xl border border-purple-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/40 p-6 shadow-2xl sm:p-10">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative">
            <span className="inline-flex rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-purple-300">
              DevOps Learning Roadmap
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
              Master <span className="text-purple-400">Slack</span>
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              Learn team communication, workflow automation, GitHub and CI/CD
              notifications, monitoring alerts, incident coordination, Slack
              APIs and secure production integrations.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ['20', 'Learning Modules'],
                ['5', 'Practical Projects'],
                ['15', 'Interview Questions'],
                ['4', 'Learning Levels'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-3xl font-black text-purple-300">{value}</p>
                  <p className="mt-1 text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Your Learning Progress</h2>
              <p className="mt-1 text-sm text-slate-400">
                Mark modules complete as you learn and practise.
              </p>
            </div>
            <span className="text-2xl font-black text-purple-300">
              {progress}%
            </span>
          </div>

          <div
            className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Learning progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-300 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {completed.length} of {modules.length} modules completed. Progress
            is held only in the current page session.
          </p>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-black sm:text-3xl">
                Learning Modules
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Start with workspace basics and progress to production automation.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search modules or topics..."
                aria-label="Search modules"
                className="min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none transition focus:border-purple-400 sm:w-72"
              />

              <select
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value as 'All' | Level)
                }
                aria-label="Filter by level"
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-purple-400"
              >
                {levels.map((item) => (
                  <option key={item} value={item}>
                    {item === 'All' ? 'All Levels' : item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {filteredModules.map((module) => {
              const isExpanded = expanded.includes(module.id);
              const isCompleted = completed.includes(module.id);

              return (
                <article
                  key={module.id}
                  className={`overflow-hidden rounded-2xl border transition ${
                    isCompleted
                      ? 'border-emerald-500/30 bg-emerald-950/10'
                      : 'border-slate-800 bg-slate-900'
                  }`}
                >
                  <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <button
                      type="button"
                      onClick={() => toggleExpanded(module.id)}
                      aria-expanded={isExpanded}
                      className="flex min-w-0 flex-1 items-start gap-4 text-left"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                          isCompleted
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-purple-400/10 text-purple-300'
                        }`}
                      >
                        {isCompleted ? '✓' : String(module.id).padStart(2, '0')}
                      </span>

                      <span className="min-w-0">
                        <span className="block font-bold text-slate-100">
                          {module.title}
                        </span>
                        <span className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">
                            {module.level}
                          </span>
                          <span className="text-slate-500">
                            {module.duration}
                          </span>
                        </span>
                      </span>
                    </button>

                    <div className="flex items-center gap-3 sm:pl-4">
                      <button
                        type="button"
                        onClick={() => toggleCompleted(module.id)}
                        className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                          isCompleted
                            ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {isCompleted ? 'Completed' : 'Mark Complete'}
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleExpanded(module.id)}
                        aria-label={
                          isExpanded ? 'Collapse module' : 'Expand module'
                        }
                        className="rounded-lg px-2 py-2 text-lg text-slate-400 hover:bg-slate-800 hover:text-white"
                      >
                        {isExpanded ? '−' : '+'}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-800 px-5 py-5 sm:px-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300">
                        Topics to Learn
                      </h3>

                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex items-start gap-2 text-sm leading-6 text-slate-300"
                          >
                            <span className="mt-0.5 text-purple-400">•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 rounded-xl border border-purple-400/15 bg-purple-400/5 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-purple-300">
                          Hands-on Task
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {module.task}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            {filteredModules.length === 0 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
                <h3 className="font-bold">No modules found</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Try another search term or choose a different level.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setLevel('All');
                  }}
                  className="mt-4 rounded-xl bg-purple-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-purple-400"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <button
            type="button"
            onClick={() => setShowProjects((value) => !value)}
            aria-expanded={showProjects}
            className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
          >
            <span>
              <span className="block text-2xl font-black">Practical Projects</span>
              <span className="mt-1 block text-sm text-slate-400">
                Apply Slack in real DevOps communication workflows.
              </span>
            </span>
            <span className="text-2xl text-purple-300">
              {showProjects ? '−' : '+'}
            </span>
          </button>

          {showProjects && (
            <div className="grid gap-4 border-t border-slate-800 p-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                    {project.level}
                  </span>
                  <h3 className="mt-3 font-bold leading-6">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {project.details}
                  </p>
                  <p className="mt-4 border-t border-slate-800 pt-3 text-xs leading-5 text-slate-500">
                    Tools: {project.tools}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <button
            type="button"
            onClick={() => setShowInterview((value) => !value)}
            aria-expanded={showInterview}
            className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
          >
            <span>
              <span className="block text-2xl font-black">
                Interview Preparation
              </span>
              <span className="mt-1 block text-sm text-slate-400">
                Prepare for DevOps collaboration and Slack integration questions.
              </span>
            </span>
            <span className="text-2xl text-purple-300">
              {showInterview ? '−' : '+'}
            </span>
          </button>

          {showInterview && (
            <ol className="space-y-3 border-t border-slate-800 p-5 sm:p-6">
              {interviewQuestions.map((question, index) => (
                <li
                  key={question}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-400/10 text-xs font-bold text-purple-300">
                    {index + 1}
                  </span>
                  {question}
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="mt-8 rounded-2xl border border-purple-400/20 bg-gradient-to-r from-purple-950/30 to-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-black">
            Ready to Use Slack in DevOps?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Practise team communication, CI/CD notifications, monitoring
            alerts and incident coordination. Use approved integrations,
            protect tokens and avoid sharing sensitive production information
            in public channels.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setCompleted([]);
                setExpanded([1]);
                setSearch('');
                setLevel('All');
              }}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-purple-400/50"
            >
              Reset Learning Progress
            </button>
            <button
              type="button"
              onClick={() => {
                setCompleted(modules.map((module) => module.id));
                setExpanded([]);
              }}
              className="rounded-xl bg-purple-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-purple-400"
            >
              Mark All Complete
            </button>
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-slate-500">
          DevMavox · Slack Learning Roadmap · Communicate, Automate, Collaborate
        </footer>
      </div>
    </main>
  );
}
