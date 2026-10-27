
"use client";

import { useMemo, useState } from "react";

const modules = [
  {
    title: "Linux Fundamentals",
    level: "Beginner",
    topics: [
      "Linux architecture and kernel",
      "Linux distributions: Ubuntu, Debian, RHEL, Amazon Linux",
      "Filesystem hierarchy: /etc, /var, /home, /opt, /usr",
      "Absolute and relative paths",
      "Shell, terminal, environment variables",
      "Man pages and command help",
    ],
    lab: "Install Linux in a VM and explore its filesystem and system information.",
  },
  {
    title: "Files and Directories",
    level: "Beginner",
    topics: [
      "pwd, ls, cd, mkdir, touch",
      "cp, mv, rm and safe file operations",
      "cat, less, head and tail",
      "find, locate and file",
      "tar, gzip and archive management",
      "Symbolic links and hard links",
    ],
    lab: "Create a project directory structure, manage files, and archive a backup.",
  },
  {
    title: "Users and Permissions",
    level: "Beginner",
    topics: [
      "Users, groups and /etc/passwd",
      "useradd, usermod and userdel",
      "groupadd, id and groups",
      "chmod and numeric permissions",
      "chown and chgrp",
      "sudo, umask, ACL and least privilege",
    ],
    lab: "Create a deployment user and securely configure access to an application directory.",
  },
  {
    title: "Linux Processes",
    level: "Beginner",
    topics: [
      "Processes, PID and parent processes",
      "ps, top and htop",
      "kill, pkill and process signals",
      "Foreground and background jobs",
      "nice and renice",
      "lsof and process troubleshooting",
    ],
    lab: "Find a resource-heavy process and stop it gracefully.",
  },
  {
    title: "Services and systemd",
    level: "Intermediate",
    topics: [
      "systemd and service units",
      "systemctl start, stop and restart",
      "Enable and disable services at boot",
      "Check failed services",
      "Inspect service dependencies",
      "Create a basic custom systemd service",
    ],
    lab: "Install Nginx, enable it at boot, and troubleshoot a failed service.",
  },
  {
    title: "Linux Networking",
    level: "Intermediate",
    topics: [
      "IP addresses, subnet masks and gateways",
      "ip addr and ip route",
      "DNS resolution and /etc/resolv.conf",
      "ss, netstat and listening ports",
      "ping, curl, wget and traceroute",
      "Network interface troubleshooting",
    ],
    lab: "Troubleshoot a web service that is running but cannot be reached.",
  },
  {
    title: "SSH and Remote Administration",
    level: "Intermediate",
    topics: [
      "SSH client and server configuration",
      "SSH key generation and authentication",
      "Authorized keys and known hosts",
      "SCP and SFTP file transfers",
      "SSH permissions and common connection errors",
      "Secure remote access and bastion hosts",
    ],
    lab: "Configure key-based SSH access between two Linux lab machines.",
  },
  {
    title: "Storage and Filesystems",
    level: "Intermediate",
    topics: [
      "df -h and du -sh",
      "Disks, partitions and lsblk",
      "Filesystem types and mount points",
      "mount and umount",
      "/etc/fstab and persistent mounts",
      "Inodes and disk-full troubleshooting",
    ],
    lab: "Identify a disk-space issue and safely determine which files consume space.",
  },
  {
    title: "Linux Memory and CPU",
    level: "Intermediate",
    topics: [
      "free -h and memory utilization",
      "vmstat and iostat basics",
      "CPU load average and utilization",
      "Swap space and memory pressure",
      "OOM killer and OOMKilled processes",
      "Resource bottleneck investigation",
    ],
    lab: "Investigate a simulated high-CPU or memory-pressure incident.",
  },
  {
    title: "Logs and Troubleshooting",
    level: "Intermediate",
    topics: [
      "Logs under /var/log",
      "journalctl and systemd logs",
      "tail -f and grep for error patterns",
      "Log rotation and retention",
      "Authentication and application logs",
      "Root-cause analysis and incident notes",
    ],
    lab: "Find the root cause of a failed service using logs and timestamps.",
  },
  {
    title: "Bash Scripting Fundamentals",
    level: "Intermediate",
    topics: [
      "Shebang and script execution",
      "Variables and command substitution",
      "Input, output and quoting",
      "if, elif, else and case",
      "for and while loops",
      "Functions and reusable scripts",
    ],
    lab: "Write a script that checks whether a required service is running.",
  },
  {
    title: "Advanced Bash Automation",
    level: "Advanced",
    topics: [
      "Exit codes and set -euo pipefail",
      "Argument parsing and input validation",
      "grep, awk, sed and regular expressions",
      "Pipes, process substitution and xargs",
      "Traps and cleanup handlers",
      "Logging, retries and error handling",
    ],
    lab: "Build a reusable automation script with validation, logs, and failure handling.",
  },
  {
    title: "Package Management",
    level: "Beginner",
    topics: [
      "apt and apt-get on Debian-based systems",
      "dnf and yum on RHEL-based systems",
      "Search, install, update and remove packages",
      "Repository configuration",
      "Package versions and dependency resolution",
      "Patch management and security updates",
    ],
    lab: "Install and update a web server, then verify the installed package version.",
  },
  {
    title: "Scheduling and Automation",
    level: "Intermediate",
    topics: [
      "cron and crontab syntax",
      "System cron directories",
      "at for one-time scheduled jobs",
      "Environment differences in cron",
      "Redirect scheduled-job output to logs",
      "Monitor failed scheduled tasks",
    ],
    lab: "Schedule a daily server health report and verify its output.",
  },
  {
    title: "Linux Security and Hardening",
    level: "Advanced",
    topics: [
      "Least privilege and sudo policies",
      "SSH hardening",
      "Firewall basics with ufw or firewalld",
      "Security patches and vulnerability fixes",
      "SELinux and AppArmor fundamentals",
      "Audit logs and secure configuration",
    ],
    lab: "Create a security checklist and harden a disposable Linux VM.",
  },
  {
    title: "Environment and System Configuration",
    level: "Intermediate",
    topics: [
      "Environment variables and export",
      "PATH and command lookup",
      "Shell profiles and startup files",
      "Hostname and timezone configuration",
      "Locale and time synchronization",
      "Configuration files and change backups",
    ],
    lab: "Configure an application environment and verify its settings after a new login.",
  },
  {
    title: "Web Servers on Linux",
    level: "Intermediate",
    topics: [
      "Install and configure Nginx",
      "Install and configure Apache HTTP Server",
      "Ports, virtual hosts and server blocks",
      "Document roots and file permissions",
      "TLS certificate and HTTPS concepts",
      "Web server logs and HTTP error troubleshooting",
    ],
    lab: "Host a test page and troubleshoot a simulated HTTP 403 or 502 response.",
  },
  {
    title: "Linux for Docker",
    level: "Advanced",
    topics: [
      "Processes, namespaces and cgroups concepts",
      "Linux users and container processes",
      "Container filesystem and mount basics",
      "Ports, bridges and network troubleshooting",
      "Disk, inode and container log pressure",
      "Inspect host resource limits",
    ],
    lab: "Investigate a container that cannot write to a mounted directory.",
  },
  {
    title: "Linux for Kubernetes and Cloud",
    level: "Advanced",
    topics: [
      "Linux worker-node resource checks",
      "Container runtime service checks",
      "Node disk pressure and memory pressure",
      "DNS, routing and connectivity diagnostics",
      "Cloud VM access and system logs",
      "Troubleshoot node services before escalating to Kubernetes",
    ],
    lab: "Diagnose a simulated worker-node issue using Linux commands and service logs.",
  },
  {
    title: "Production Operations and SRE",
    level: "Advanced",
    topics: [
      "Operational runbooks and incident response",
      "Health checks and service availability",
      "Capacity planning and resource trends",
      "Backup verification and restore testing",
      "Change management and rollback planning",
      "Post-incident reports and prevention actions",
    ],
    lab: "Simulate a production incident, restore service, and write a short postmortem.",
  },
];

const commandGroups = [
  {
    category: "Files",
    commands: "pwd, ls -lah, cd, find, cp, mv, mkdir, rm",
    example: "find /var/log -type f",
  },
  {
    category: "Permissions",
    commands: "chmod, chown, chgrp, id, groups, sudo",
    example: "chmod 640 app.conf",
  },
  {
    category: "Processes",
    commands: "ps aux, top, pgrep, kill, free -h",
    example: "ps aux --sort=-%cpu | head",
  },
  {
    category: "Services",
    commands: "systemctl, journalctl, service",
    example: "systemctl status nginx",
  },
  {
    category: "Storage",
    commands: "df -h, du -sh, lsblk, mount, findmnt",
    example: "df -h",
  },
  {
    category: "Networking",
    commands: "ip, ss, ping, curl, dig, traceroute",
    example: "ss -tulpn",
  },
  {
    category: "Logs",
    commands: "tail, less, grep, journalctl, awk",
    example: "journalctl -u nginx --since today",
  },
  {
    category: "Archives",
    commands: "tar, gzip, gunzip, zip, unzip",
    example: "tar -czf logs-backup.tar.gz /var/log",
  },
  {
    category: "Packages",
    commands: "apt, apt-get, dnf, yum, dpkg, rpm",
    example: "sudo apt install nginx",
  },
  {
    category: "Bash",
    commands: "bash, chmod, read, test, grep, sed, awk",
    example: "bash -n health-check.sh",
  },
];

const projects = [
  {
    title: "Linux Server Health-Check Toolkit",
    level: "Beginner",
    description:
      "Create a Bash script that checks CPU, memory, disk, service status, and recent errors.",
    deliverables: "Script, timestamped report, sample output, README",
  },
  {
    title: "Secure Application Server",
    level: "Intermediate",
    description:
      "Set up a Linux VM, deployment user, SSH keys, firewall rules, and a systemd-managed application.",
    deliverables: "Configuration notes, access matrix, service runbook",
  },
  {
    title: "Log Analysis and Alerting",
    level: "Intermediate",
    description:
      "Parse application logs, count error patterns, generate a daily summary, and schedule it with cron.",
    deliverables: "Parser script, scheduled job, sample report",
  },
  {
    title: "Automated Backup and Restore",
    level: "Advanced",
    description:
      "Build a backup script with validation, retention, logging, and a documented restore test.",
    deliverables: "Backup script, restore evidence, recovery procedure",
  },
  {
    title: "Production Incident Simulation",
    level: "Advanced",
    description:
      "Simulate a full disk, failed service, or networking issue; diagnose it and document recovery.",
    deliverables: "Incident timeline, root cause, remediation and prevention plan",
  },
];

const interviewQuestions = [
  {
    q: "What happens when a Linux system boots?",
    a: "Firmware starts the bootloader, the bootloader loads the kernel, and the kernel initializes hardware and starts the initial userspace process, commonly systemd.",
  },
  {
    q: "What is the difference between a process and a thread?",
    a: "A process has its own virtual address space and resources; threads are execution paths within a process that share many of its resources.",
  },
  {
    q: "Explain chmod 755 and chmod 644.",
    a: "755 gives the owner read/write/execute and group/others read/execute. 644 gives the owner read/write and group/others read-only.",
  },
  {
    q: "How do you investigate high CPU usage?",
    a: "Use top or ps to identify processes, inspect trends and logs, check workload changes, and validate the root cause before taking action.",
  },
  {
    q: "How do you troubleshoot a failed service?",
    a: "Check systemctl status, read journalctl logs, inspect configuration and dependencies, validate ports and permissions, then restart only after addressing the cause.",
  },
  {
    q: "How do you find which process is listening on a port?",
    a: "Use ss -lntup with appropriate privileges, then inspect the PID and owning service.",
  },
  {
    q: "What is the difference between df and du?",
    a: "df reports filesystem space usage; du estimates space used by files and directories.",
  },
  {
    q: "What is an inode?",
    a: "An inode stores file metadata and references to data blocks; a filesystem can run out of inodes even when byte capacity remains.",
  },
  {
    q: "How do you troubleshoot SSH connection failures?",
    a: "Check address and route, port reachability, sshd status, firewall rules, username, key permissions, server logs, and SSH client verbosity.",
  },
  {
    q: "What is the difference between soft and hard links?",
    a: "A hard link references the same inode; a symbolic link stores a path to another file and can cross filesystems.",
  },
  {
    q: "How do you schedule a recurring task?",
    a: "Use cron or a systemd timer, configure a reliable environment, log output, and verify the task's execution and exit status.",
  },
  {
    q: "Why might a script work manually but fail in cron?",
    a: "Cron has a limited environment and PATH, so use absolute paths, explicitly define required variables, and redirect output to logs.",
  },
  {
    q: "What is load average?",
    a: "It represents average runnable and uninterruptible tasks over 1, 5, and 15 minutes; interpret it alongside CPU count and other metrics.",
  },
  {
    q: "How do you investigate a disk-full incident?",
    a: "Check df -h and df -i, use du to locate large directories, inspect logs and deleted-open files, then clean or expand storage safely.",
  },
  {
    q: "What makes a Bash script safer for production?",
    a: "Validate inputs, quote variables, check exit codes, log actions, handle errors, use least privilege, and test rollback or recovery steps.",
  },
];

const levelStyles: Record<string, string> = {
  Beginner: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  Intermediate: "bg-amber-400/10 text-amber-300 border-amber-400/20",
  Advanced: "bg-rose-400/10 text-rose-300 border-rose-400/20",
};

export default function LinuxRoadmapPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [completed, setCompleted] = useState<string[]>([]);
  const [openModules, setOpenModules] = useState<string[]>([modules[0].title]);
  const [openAnswers, setOpenAnswers] = useState<number[]>([]);

  const allTopics = useMemo(
    () => modules.flatMap((module) => module.topics.map((topic) => `${module.title}::${topic}`)),
    []
  );

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return modules.filter((module) => {
      const matchesLevel = level === "All" || module.level === level;
      const matchesSearch =
        !query ||
        module.title.toLowerCase().includes(query) ||
        module.topics.some((topic) => topic.toLowerCase().includes(query)) ||
        module.lab.toLowerCase().includes(query);

      return matchesLevel && matchesSearch;
    });
  }, [search, level]);

  const progress = Math.round((completed.length / allTopics.length) * 100);

  function toggleTopic(topicId: string) {
    setCompleted((previous) =>
      previous.includes(topicId)
        ? previous.filter((item) => item !== topicId)
        : [...previous, topicId]
    );
  }

  function toggleModule(title: string) {
    setOpenModules((previous) =>
      previous.includes(title)
        ? previous.filter((item) => item !== title)
        : [...previous, title]
    );
  }

  function toggleAllModules() {
    setOpenModules((previous) =>
      previous.length === filteredModules.length
        ? []
        : filteredModules.map((module) => module.title)
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="overflow-hidden rounded-3xl border border-orange-400/20 bg-gradient-to-br from-orange-500/15 via-slate-900 to-slate-950 p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
            <span>DevMavox</span>
            <span className="text-slate-600">/</span>
            <span>DevOps Learning Roadmap</span>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Linux Engineering Roadmap
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Learn Linux from command-line fundamentals to production server
            administration, Bash automation, security, cloud infrastructure,
            container troubleshooting, and SRE operations.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Learning modules</p>
              <p className="mt-2 text-3xl font-bold">{modules.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Learning topics</p>
              <p className="mt-2 text-3xl font-bold">{allTopics.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Topics completed</p>
              <p className="mt-2 text-3xl font-bold">
                {completed.length}/{allTopics.length}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Your progress</p>
              <p className="mt-2 text-3xl font-bold">{progress}%</p>
              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <div
                  className="h-full rounded-full bg-orange-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Learning Path</h2>
              <p className="mt-2 text-slate-400">
                Study each module, practise its lab, and mark topics as complete.
              </p>
            </div>
            <button
              type="button"
              onClick={toggleAllModules}
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold hover:border-orange-400/50 hover:bg-slate-800"
            >
              {openModules.length === filteredModules.length
                ? "Collapse all"
                : "Expand all"}
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <label className="block">
              <span className="sr-only">Search modules and topics</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Linux topics, commands, labs..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-orange-400"
              />
            </label>
            <label className="block">
              <span className="sr-only">Filter by level</span>
              <select
                value={level}
                onChange={(event) => setLevel(event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-orange-400"
              >
                <option value="All">All levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label>
          </div>

          <p className="text-sm text-slate-500">
            Showing {filteredModules.length} of {modules.length} modules
          </p>

          <div className="space-y-4">
            {filteredModules.map((module, index) => {
              const isOpen = openModules.includes(module.title);
              const topicIds = module.topics.map(
                (topic) => `${module.title}::${topic}`
              );
              const moduleCompleted = topicIds.filter((id) =>
                completed.includes(id)
              ).length;
              const moduleProgress = Math.round(
                (moduleCompleted / topicIds.length) * 100
              );

              return (
                <article
                  key={module.title}
                  className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg shadow-black/10"
                >
                  <button
                    type="button"
                    onClick={() => toggleModule(module.title)}
                    aria-expanded={isOpen}
                    className="flex w-full flex-wrap items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-400/10 font-bold text-orange-300">
                        {String(modules.indexOf(module) + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold sm:text-xl">
                          {module.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {module.topics.length} topics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${levelStyles[module.level]}`}
                      >
                        {module.level}
                      </span>
                      <span className="text-lg text-slate-400">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                  </button>

                  <div className="px-5 pb-4 sm:px-6">
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-orange-400 transition-all"
                        style={{ width: `${moduleProgress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      {moduleCompleted}/{topicIds.length} topics completed
                    </p>
                  </div>

                  {isOpen && (
                    <div className="border-t border-slate-800 p-5 sm:p-6">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {module.topics.map((topic) => {
                          const topicId = `${module.title}::${topic}`;
                          const isCompleted = completed.includes(topicId);

                          return (
                            <label
                              key={topicId}
                              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                                isCompleted
                                  ? "border-emerald-500/20 bg-emerald-500/5"
                                  : "border-slate-800 bg-slate-950/50 hover:border-slate-700"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => toggleTopic(topicId)}
                                className="mt-1 h-4 w-4 accent-orange-400"
                              />
                              <span
                                className={
                                  isCompleted
                                    ? "text-sm text-slate-500 line-through"
                                    : "text-sm leading-6 text-slate-200"
                                }
                              >
                                {topic}
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      <div className="mt-5 rounded-xl border border-orange-400/20 bg-orange-400/5 p-4">
                        <p className="font-semibold text-orange-300">
                          Hands-on lab
                        </p>
                        <p className="mt-2 leading-6 text-slate-300">
                          {module.lab}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            {filteredModules.length === 0 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
                <p className="font-semibold">No matching Linux topics found</p>
                <p className="mt-2 text-sm text-slate-400">
                  Try another keyword or select All levels.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setLevel("All");
                  }}
                  className="mt-4 rounded-lg bg-orange-400 px-4 py-2 font-semibold text-slate-950 hover:bg-orange-300"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
          <div>
            <h2 className="text-2xl font-bold">Essential Linux Commands</h2>
            <p className="mt-2 text-slate-400">
              Learn what each command group is used for and practise in a lab.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {commandGroups.map((group) => (
              <div
                key={group.category}
                className="grid gap-2 rounded-xl border border-slate-800 bg-slate-950/50 p-4 sm:grid-cols-[150px_1fr]"
              >
                <p className="font-semibold text-orange-300">
                  {group.category}
                </p>
                <div>
                  <p className="text-sm leading-6 text-slate-300">
                    {group.commands}
                  </p>
                  <code className="mt-2 block overflow-x-auto rounded-lg bg-slate-900 px-3 py-2 text-xs text-emerald-300">
                    {group.example}
                  </code>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Commands that change files, permissions, services, or storage should
            be practised in a disposable lab first. Some commands require sudo.
          </p>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Real-Time DevOps Projects
            </h2>
            <p className="mt-2 text-slate-400">
              Build practical evidence for your portfolio and interviews.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-lg font-bold">
                    {String(index + 1).padStart(2, "0")}. {project.title}
                  </h3>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${levelStyles[project.level]}`}
                  >
                    {project.level}
                  </span>
                </div>
                <p className="mt-3 leading-6 text-slate-300">
                  {project.description}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  <span className="font-semibold text-orange-300">
                    Deliverables:
                  </span>{" "}
                  {project.deliverables}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
          <div>
            <h2 className="text-2xl font-bold">Linux Interview Preparation</h2>
            <p className="mt-2 text-slate-400">
              Review these 15 frequently useful Linux and production-support
              questions.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {interviewQuestions.map((item, index) => {
              const isOpen = openAnswers.includes(index);

              return (
                <article
                  key={item.q}
                  className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAnswers((previous) =>
                        previous.includes(index)
                          ? previous.filter((number) => number !== index)
                          : [...previous, index]
                      )
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left"
                  >
                    <span className="font-medium text-slate-200">
                      <span className="mr-2 text-orange-300">
                        Q{index + 1}.
                      </span>
                      {item.q}
                    </span>
                    <span className="shrink-0 text-slate-400">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-800 px-4 py-4 leading-7 text-slate-300">
                      {item.a}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-orange-400/20 bg-gradient-to-r from-orange-400/10 to-slate-900 p-5 sm:p-7">
          <h2 className="text-xl font-bold">Production Safety Checklist</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
            <li>• Test commands in a lab before production use.</li>
            <li>• Follow least privilege and approved access controls.</li>
            <li>• Back up important configuration before editing it.</li>
            <li>• Check logs and command exit codes after changes.</li>
            <li>• Plan rollback steps before risky operations.</li>
            <li>• Follow your organisation&apos;s change-management process.</li>
          </ul>
        </section>

        <footer className="border-t border-slate-800 pt-5 text-sm text-slate-500">
          DevMavox Linux Engineering Roadmap · Learn, practise, verify, and
          document every production change.
        </footer>
      </div>
    </main>
  );
}



