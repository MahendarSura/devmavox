
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
    title: 'Ansible Fundamentals',
    level: 'Beginner',
    duration: '1 day',
    topics: [
      'What is Ansible and why configuration management matters',
      'Configuration management vs orchestration vs provisioning',
      'Agentless architecture and SSH-based communication',
      'Control node, managed nodes, inventory and playbooks',
      'Ansible use cases in DevOps and enterprise environments',
    ],
    outcome: 'Explain Ansible architecture and identify where it fits in a DevOps workflow.',
  },
  {
    title: 'Linux and Networking Prerequisites',
    level: 'Beginner',
    duration: '1–2 days',
    topics: [
      'Linux files, directories, permissions and ownership',
      'Users, groups, sudo and process management',
      'SSH keys, SSH configuration and host verification',
      'DNS, IP addresses, ports, routing and firewalls',
      'Package managers: apt, dnf and yum',
    ],
    outcome: 'Prepare Linux servers and troubleshoot basic connectivity issues.',
  },
  {
    title: 'Installation and Ansible CLI',
    level: 'Beginner',
    duration: '1 day',
    topics: [
      'Install Ansible on a Linux control node',
      'Understand ansible-core and collection-based modules',
      'Explore ansible --version and ansible-config',
      'Use ansible-doc to discover module documentation',
      'Understand configuration precedence and environment variables',
    ],
    outcome: 'Install Ansible and confidently use its core command-line tools.',
  },
  {
    title: 'Inventory Management',
    level: 'Beginner',
    duration: '1 day',
    topics: [
      'Static inventory in INI and YAML formats',
      'Host groups, child groups and group hierarchy',
      'Host variables and group variables',
      'Default inventory and custom inventory paths',
      'Dynamic inventory concepts for cloud environments',
    ],
    outcome: 'Organize servers into reusable groups for different environments.',
  },
  {
    title: 'Ad-Hoc Commands',
    level: 'Beginner',
    duration: '1 day',
    topics: [
      'Run commands against one host or a group',
      'Use ping, command, shell, copy and service modules',
      'Limit execution with --limit',
      'Use --become for privilege escalation',
      'Understand forks, patterns and parallel execution',
    ],
    outcome: 'Perform basic administration across multiple servers from one command.',
  },
  {
    title: 'YAML and Playbook Structure',
    level: 'Beginner',
    duration: '1–2 days',
    topics: [
      'YAML indentation, lists, mappings and strings',
      'Playbook, play, task and module structure',
      'Hosts, become, name and task ordering',
      'Run playbooks using ansible-playbook',
      'Validate syntax with --syntax-check and inspect execution with --list-tasks',
    ],
    outcome: 'Write readable playbooks that automate repeatable server operations.',
  },
  {
    title: 'Core Ansible Modules',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Manage packages with package, apt and dnf',
      'Manage services with service and systemd',
      'Create files and directories with file',
      'Copy files and manage content with copy and template',
      'Manage users, groups, archives, cron jobs and scheduled tasks',
      'Prefer purpose-built modules over shell commands where possible',
    ],
    outcome: 'Automate common Linux administration using idempotent modules.',
  },
  {
    title: 'Variables, Facts and Precedence',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Define play, host, group and task-level variables',
      'Use vars_files and external variable files',
      'Gather facts and inspect ansible_facts',
      'Use register to capture task results',
      'Understand variable precedence and extra variables',
      'Use filters, default values and type conversions',
    ],
    outcome: 'Build reusable playbooks without hardcoding environment-specific values.',
  },
  {
    title: 'Conditionals, Loops and Task Control',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Use when conditions and Boolean expressions',
      'Loop over lists and dictionaries',
      'Use loop_control and meaningful loop labels',
      'Control execution with failed_when and changed_when',
      'Use block, rescue and always for structured error handling',
      'Understand retries, until and delay',
    ],
    outcome: 'Create flexible automation that responds to different server states.',
  },
  {
    title: 'Templates, Handlers and Tags',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Create Jinja2 templates for configuration files',
      'Use template variables, filters and conditional blocks',
      'Trigger handlers when configuration changes',
      'Understand handler execution and flush_handlers',
      'Tag tasks and plays for selective execution',
      'Keep configuration changes predictable and repeatable',
    ],
    outcome: 'Generate environment-specific configuration and restart services safely.',
  },
  {
    title: 'Roles and Reusable Project Structure',
    level: 'Intermediate',
    duration: '2–3 days',
    topics: [
      'Understand the standard Ansible role directory layout',
      'Organize tasks, handlers, templates, files and defaults',
      'Separate defaults from role variables',
      'Use dependencies and role parameters',
      'Split large playbooks into reusable components',
      'Design roles for NGINX, users, security and application deployment',
    ],
    outcome: 'Build maintainable automation that can be reused across projects.',
  },
  {
    title: 'Collections and Ansible Galaxy',
    level: 'Intermediate',
    duration: '1–2 days',
    topics: [
      'Understand collections, namespaces and fully qualified collection names',
      'Install collections and roles from trusted sources',
      'Use requirements.yml for dependencies',
      'Pin and manage collection versions',
      'Understand collection documentation and compatibility',
      'Create a repeatable dependency installation process',
    ],
    outcome: 'Manage reusable automation content and external module dependencies.',
  },
  {
    title: 'Secrets and Ansible Vault',
    level: 'Intermediate',
    duration: '1 day',
    topics: [
      'Encrypt files and individual values with Ansible Vault',
      'Create, edit, view and rekey encrypted content',
      'Use vault IDs and password files securely',
      'Pass secrets through CI/CD without exposing them in logs',
      'Avoid committing plaintext credentials to Git',
      'Understand when an external secrets manager is appropriate',
    ],
    outcome: 'Protect passwords, tokens and other sensitive configuration values.',
  },
  {
    title: 'Linux Server Configuration and Hardening',
    level: 'Advanced',
    duration: '2–3 days',
    topics: [
      'Create users and enforce SSH access policies',
      'Configure package updates and required services',
      'Manage firewall rules and approved listening ports',
      'Apply file permission and ownership policies',
      'Deploy audit and monitoring agents',
      'Use validation steps before restarting critical services',
    ],
    outcome: 'Create a repeatable baseline for secure Linux server configuration.',
  },
  {
    title: 'Application Deployment Automation',
    level: 'Advanced',
    duration: '2–3 days',
    topics: [
      'Deploy application artifacts from CI pipelines',
      'Configure application directories, ownership and permissions',
      'Manage service units and environment configuration',
      'Deploy NGINX reverse proxy configuration',
      'Implement health checks and post-deployment verification',
      'Plan rollback steps and reduce service interruption',
    ],
    outcome: 'Automate a complete application deployment from configuration to verification.',
  },
  {
    title: 'Cloud and Dynamic Infrastructure',
    level: 'Advanced',
    duration: '2–3 days',
    topics: [
      'Use dynamic inventory concepts with AWS and other cloud providers',
      'Understand required cloud collections and authentication methods',
      'Separate infrastructure provisioning from configuration management',
      'Configure newly provisioned virtual machines',
      'Manage development, staging and production inventories',
      'Use tags and limits to target safe groups of resources',
    ],
    outcome: 'Automate configuration across changing cloud infrastructure.',
  },
  {
    title: 'Ansible in CI/CD Pipelines',
    level: 'Advanced',
    duration: '2 days',
    topics: [
      'Integrate playbooks with Jenkins and GitHub Actions',
      'Run linting, syntax checks and validation before deployment',
      'Use protected credentials and environment approvals',
      'Pass build artifacts and version information to playbooks',
      'Separate test, staging and production deployment stages',
      'Publish logs and deployment results for auditing',
    ],
    outcome: 'Make Ansible automation part of a controlled CI/CD release process.',
  },
  {
    title: 'AWX and Automation Controller',
    level: 'Advanced',
    duration: '2 days',
    topics: [
      'Understand centralized automation and web-based job execution',
      'Explore projects, inventories, credentials and job templates',
      'Use surveys, schedules and execution environments',
      'Configure role-based access and team permissions',
      'Understand workflow jobs, approval steps and audit history',
      'Compare standalone Ansible, AWX and enterprise Automation Controller',
    ],
    outcome: 'Understand how teams manage and govern automation centrally.',
  },
  {
    title: 'Testing, Troubleshooting and Performance',
    level: 'Production',
    duration: '2–3 days',
    topics: [
      'Use -v verbosity levels and inspect failed task output',
      'Use --check and --diff where supported',
      'Validate YAML, syntax and role structure',
      'Use ansible-lint and automated testing practices',
      'Troubleshoot SSH, privilege escalation, Python and module errors',
      'Investigate unreachable hosts, timeouts and incorrect inventory',
      'Understand idempotency, serial execution, forks and throttling',
    ],
    outcome: 'Diagnose common failures and improve automation reliability and speed.',
  },
  {
    title: 'Production Governance and Interview Preparation',
    level: 'Production',
    duration: '2–3 days',
    topics: [
      'Design repository structure for multiple teams and environments',
      'Use code review, version control and change approval',
      'Apply least privilege and separate deployment credentials',
      'Plan logging, auditability, recovery and safe rollout strategies',
      'Explain idempotency, roles, handlers, Vault and variable precedence',
      'Prepare scenario-based troubleshooting and architecture answers',
    ],
    outcome: 'Explain production automation design choices and defend them in interviews.',
  },
];

const projects = [
  {
    title: 'Project 1 — Multi-Server Linux Setup',
    level: 'Beginner',
    details:
      'Create an inventory for three Linux servers. Automate package installation, user creation, directory setup and service checks.',
    deliverable: 'Inventory, playbook, variables file and execution notes.',
  },
  {
    title: 'Project 2 — Reusable NGINX Role',
    level: 'Intermediate',
    details:
      'Create an NGINX role with tasks, handlers, templates and defaults. Configure a reverse proxy and verify its service health.',
    deliverable: 'Reusable role with an environment-specific configuration.',
  },
  {
    title: 'Project 3 — Secure Application Deployment',
    level: 'Advanced',
    details:
      'Deploy an application artifact, configure its service, protect secrets with Vault and verify application health.',
    deliverable: 'Deployment playbook, encrypted variables and rollback procedure.',
  },
  {
    title: 'Project 4 — CI/CD Automation',
    level: 'Advanced',
    details:
      'Trigger Ansible deployment from Jenkins or GitHub Actions after build and test stages. Add validation and deployment reporting.',
    deliverable: 'Pipeline definition, Ansible repository and release evidence.',
  },
  {
    title: 'Project 5 — Production Configuration Baseline',
    level: 'Production',
    details:
      'Build a repeatable Linux baseline for users, SSH settings, packages, approved services and monitoring-agent configuration.',
    deliverable: 'Version-controlled roles, inventory strategy, validation and operational documentation.',
  },
];

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Production'] as const;

export default function AnsibleRoadmapPage() {
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
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/40 p-6 shadow-2xl sm:p-10">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-300">
              DEVOPS LEARNING ROADMAP
            </span>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              Beginner to Production
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Ansible Roadmap
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Learn configuration management, infrastructure automation, reusable
            roles, secure deployments and production automation workflows from
            the fundamentals to enterprise-level practices.
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
                  className="h-full rounded-full bg-orange-400 transition-all"
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
            <li>2. Practise each concept in your own lab environment.</li>
            <li>3. Mark modules complete as you finish learning them.</li>
            <li>4. Build the projects and keep your code in Git.</li>
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
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-orange-400 sm:w-64"
              />
              <select
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value as (typeof levels)[number])
                }
                aria-label="Filter modules by level"
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-orange-400"
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
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-400/10 font-bold text-orange-300">
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
                        className="rounded-lg border border-slate-700 px-3 py-2 text-sm transition hover:border-orange-400"
                      >
                        {isExpanded ? 'Hide topics' : 'View topics'}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-800 bg-slate-950/40 px-5 py-5 sm:pl-20">
                      <h4 className="text-sm font-semibold text-orange-300">
                        Concepts to cover
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex gap-3 text-sm leading-6 text-slate-300"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
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
                  className="mt-4 rounded-lg bg-orange-400 px-4 py-2 text-sm font-semibold text-slate-950"
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
                  <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-2.5 py-1 text-xs text-orange-300">
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

        <section className="mt-12 rounded-2xl border border-orange-400/20 bg-orange-400/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Interview preparation checklist</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Be ready to explain each concept with a real example, a failure
            scenario and the steps you would use to verify the result.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              'Ansible architecture and agentless execution',
              'Inventory, host groups and dynamic inventory',
              'Playbooks, modules and idempotency',
              'Variables, facts and precedence',
              'Loops, conditions, handlers and tags',
              'Roles, collections and Ansible Galaxy',
              'Ansible Vault and secret handling',
              'Check mode, diff mode and linting',
              'SSH, sudo and unreachable-host troubleshooting',
              'Jenkins or GitHub Actions integration',
              'AWX, job templates and role-based access',
              'Production rollout, rollback and auditability',
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-sm text-slate-300"
              >
                <span className="text-orange-300">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-10 border-t border-slate-800 pt-5 text-sm text-slate-500">
          DevMavox · Ansible Learning Roadmap · Learn, practise, automate and
          document.
        </footer>
      </div>
    </main>
  );
}
