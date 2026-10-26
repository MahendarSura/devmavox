
"use client";

import { useState } from "react";

const modules = [
  {
    title: "1. Linux Fundamentals",
    level: "Beginner",
    topics: [
      "Linux architecture and distributions",
      "Filesystem hierarchy: /etc, /var, /home, /opt",
      "Absolute and relative paths",
      "Files and directories",
      "Package management"
    ],
    lab: "Install Linux in a VM and explore the filesystem."
  },
  {
    title: "2. Users and Permissions",
    level: "Beginner",
    topics: [
      "Users, groups and sudo",
      "File ownership with chown",
      "Permissions with chmod",
      "umask and special permissions",
      "SSH key-based authentication"
    ],
    lab: "Create a deployment user with restricted access."
  },
  {
    title: "3. Processes and Services",
    level: "Intermediate",
    topics: [
      "Processes, PIDs and signals",
      "ps, top, htop and kill",
      "systemd and systemctl",
      "Boot troubleshooting",
      "Cron jobs and scheduled tasks"
    ],
    lab: "Install Nginx and configure it to start automatically."
  },
  {
    title: "4. Networking and Security",
    level: "Intermediate",
    topics: [
      "IP addresses, routes and DNS",
      "Ports, sockets and firewalls",
      "SSH, SCP and file transfers",
      "curl, ping, dig and ss",
      "Patch management and server hardening"
    ],
    lab: "Diagnose a service that is running but unreachable."
  },
  {
    title: "5. Storage and Monitoring",
    level: "Intermediate",
    topics: [
      "df, du and disk capacity",
      "Mounts and filesystems",
      "free, vmstat and iostat",
      "Logs in /var/log",
      "journalctl and log rotation"
    ],
    lab: "Find a disk-space issue and identify which files consume space."
  },
  {
    title: "6. Bash Automation",
    level: "Advanced",
    topics: [
      "Variables, conditions and loops",
      "Functions and exit codes",
      "grep, awk, sed and pipes",
      "Input validation and error handling",
      "Cron-based automation"
    ],
    lab: "Write a server health-check script that generates a daily report."
  },
  {
    title: "7. Production Troubleshooting",
    level: "Advanced",
    topics: [
      "High CPU and memory usage",
      "Disk-full incidents",
      "Failed systemd services",
      "DNS and connectivity failures",
      "Log-based root-cause analysis"
    ],
    lab: "Simulate a failed web service, identify the root cause and document recovery."
  }
];

const commands = [
  ["Files", "ls -lah, pwd, find, cp, mv"],
  ["Permissions", "chmod, chown, id, sudo"],
  ["Processes", "ps aux, top, kill, free -h"],
  ["Services", "systemctl status nginx, journalctl -u nginx"],
  ["Storage", "df -h, du -sh, lsblk"],
  ["Networking", "ip addr, ss -tulpn, curl -I, dig"],
  ["Logs", "tail -f, grep, less"]
];

export default function LinuxRoadmapPage() {
  const [completed, setCompleted] = useState<string[]>([]);

  const total = modules.reduce(
    (sum, module) => sum + module.topics.length,
    0
  );

  const progress = Math.round((completed.length / total) * 100);

  function toggleTopic(topic: string) {
    setCompleted((previous) =>
      previous.includes(topic)
        ? previous.filter((item) => item !== topic)
        : [...previous, topic]
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="rounded-3xl border border-orange-400/30 bg-gradient-to-br from-orange-500/20 via-slate-900 to-slate-950 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
            DevMavox • DevOps Learning Path
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Linux Engineering Roadmap
          </h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            Learn Linux from the command line to production server
            administration, automation, monitoring and incident response.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-900/80 p-4">
              <p className="text-sm text-slate-400">Learning modules</p>
              <p className="mt-1 text-3xl font-bold">{modules.length}</p>
            </div>
            <div className="rounded-xl bg-slate-900/80 p-4">
              <p className="text-sm text-slate-400">Topics completed</p>
              <p className="mt-1 text-3xl font-bold">
                {completed.length}/{total}
              </p>
            </div>
            <div className="rounded-xl bg-slate-900/80 p-4">
              <p className="text-sm text-slate-400">Your progress</p>
              <p className="mt-1 text-3xl font-bold">{progress}%</p>
              <div className="mt-3 h-2 rounded-full bg-slate-700">
                <div
                  className="h-2 rounded-full bg-orange-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-bold">Learning Path</h2>
          <p className="mt-2 text-slate-400">
            Complete each module in order and practise every lab on a test
            machine before applying changes to production servers.
          </p>

          <div className="mt-6 space-y-5">
            {modules.map((module) => (
              <article
                key={module.title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{module.title}</h3>
                  <span className="rounded-full bg-orange-400/10 px-3 py-1 text-sm text-orange-300">
                    {module.level}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {module.topics.map((topic) => (
                    <label
                      key={topic}
                      className="flex cursor-pointer items-start gap-3 rounded-lg bg-slate-800/70 p-3"
                    >
                      <input
                        type="checkbox"
                        checked={completed.includes(topic)}
                        onChange={() => toggleTopic(topic)}
                        className="mt-1 accent-orange-400"
                      />
                      <span
                        className={
                          completed.includes(topic)
                            ? "text-slate-500 line-through"
                            : "text-slate-200"
                        }
                      >
                        {topic}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-orange-400/20 bg-orange-400/5 p-4">
                  <p className="font-semibold text-orange-300">
                    Hands-on lab
                  </p>
                  <p className="mt-2 text-slate-300">{module.lab}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Essential Commands</h2>
          <div className="mt-5 space-y-3">
            {commands.map(([category, list]) => (
              <div
                key={category}
                className="grid gap-2 border-b border-slate-800 pb-3 sm:grid-cols-[150px_1fr]"
              >
                <p className="font-semibold text-orange-300">{category}</p>
                <code className="text-sm leading-7 text-slate-300">
                  {list}
                </code>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">Real-Time Project</h2>
            <p className="mt-3 text-slate-300">
              Build a Linux server health-check toolkit. Check disk, memory,
              CPU, service status and recent errors. Save a timestamped report,
              return meaningful exit codes and schedule the script with cron.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              Deliverables: Bash script, sample report, cron configuration and
              troubleshooting README.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">Interview Preparation</h2>
            <ul className="mt-3 list-disc space-y-3 pl-5 text-slate-300">
              <li>How do you investigate high CPU or memory usage?</li>
              <li>Explain chmod 755 versus chmod 644.</li>
              <li>How do you troubleshoot a failed Linux service?</li>
              <li>How do you identify which process uses a port?</li>
              <li>What steps do you take when a filesystem is full?</li>
            </ul>
          </article>
        </section>

        <footer className="rounded-xl border border-slate-800 p-5 text-sm text-slate-400">
          <strong className="text-slate-200">Production safety:</strong>{" "}
          practise destructive commands, permission changes and service
          restarts in a lab first. Follow your organisation&apos;s access,
          backup and change-management procedures.
        </footer>
      </div>
    </main>
  );
}
