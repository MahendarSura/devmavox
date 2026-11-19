
"use client";

type LinuxTopicGuide = { explanation: string; example: string; commands: string[]; expected: string; troubleshooting: string; lab: string };
function getLinuxTopicGuide(topic: string, moduleTitle: string): LinuxTopicGuide {
 const t=topic.toLowerCase();
 if(/file|director|path|filesystem|symbolic|hard link|tar|gzip/.test(t)) return {explanation:topic+" is a Linux filesystem concept. Linux exposes files, directories and devices through one tree; paths and permissions control how users and processes access them.",example:"A deployment script stores versioned releases under /opt/myapp and updates a controlled symlink to the active version.",commands:["pwd","ls -lah <directory>","find /var/log -type f -name '*.log' -mtime -1","df -hT","du -sh <directory>"],expected:"pwd shows the current path, ls shows metadata, find lists matching files, df reports filesystem capacity and du reports directory usage.",troubleshooting:"Check the exact path, mount state, permissions, inode usage and free space. Verify the target before destructive file operations.",lab:"Create a project directory tree, add sample files, archive it with tar, extract it elsewhere and compare the contents."};
 if(/user|group|permission|chmod|chown|sudo|umask|acl|passwd/.test(t)) return {explanation:topic+" controls Linux identity and file access. Processes run with user/group IDs; owner, group, other bits and ACLs determine allowed operations.",example:"A systemd service runs as a dedicated deploy user that can read application files but cannot change system configuration.",commands:["id <user>","getent passwd <user>","ls -l <path>","namei -l <path>","getfacl <path>"],expected:"id shows UID/GID, ls shows mode and owner, namei checks each path component and getfacl shows extended ACL entries.",troubleshooting:"Check parent-directory execute permission, effective UID/GID, ACL masks, SELinux/AppArmor and sudo rules. Avoid chmod 777 as a general fix.",lab:"Create a deploy group and user, grant group access to a test directory, verify allowed access and confirm access is denied elsewhere."};
 if(/process|pid|kill|signal|top|htop|nice|renice|lsof|cpu|memory|oom|load average/.test(t)) return {explanation:topic+" is part of Linux process and resource management. The kernel schedules processes and accounts for CPU and memory use.",example:"During an API slowdown, an engineer checks process CPU, memory and open files to identify a runaway worker before restarting only the affected service.",commands:["ps aux --sort=-%cpu | head","top -b -n 1 | head -20","free -h","uptime","lsof -p <pid>"],expected:"ps/top show process IDs and usage, free reports memory/swap, uptime shows load averages and lsof lists open files.",troubleshooting:"Correlate load with CPU count, inspect memory pressure and OOM logs, identify process ownership and use graceful termination before SIGKILL.",lab:"Run a harmless CPU-intensive test process in a VM, identify its PID, lower its priority, stop it gracefully and verify it exited."};
 if(/systemd|service|systemctl|unit|boot|journalctl/.test(t)) return {explanation:topic+" describes Linux service management. systemd unit files define startup, stop, restart and dependency behavior; systemctl controls units and journalctl reads logs.",example:"An NGINX service is enabled at boot and monitored by systemd; its logs are used to investigate failed starts.",commands:["systemctl status <service>","systemctl is-enabled <service>","systemctl list-units --failed","journalctl -u <service> -n 100 --no-pager"],expected:"status shows active state and logs, is-enabled reports boot configuration, failed units lists failures and journalctl shows service events.",troubleshooting:"Check unit syntax, executable paths, permissions, environment files, port conflicts and dependencies. Reload systemd after editing unit files.",lab:"Install NGINX in a VM, enable and start it, inspect its journal, introduce an invalid test configuration, diagnose and restore service."};
 if(/network|ip addr|ip route|dns|ss |netstat|ping|curl|wget|traceroute|port|firewall/.test(t)) return {explanation:topic+" is a Linux network diagnostic or configuration concept. Interfaces, routes, DNS and firewall rules determine how the host reaches remote systems and exposes services.",example:"An engineer checks whether a web process listens on the expected address and port, then verifies routing, DNS and firewall rules.",commands:["ip -br addr","ip route","ss -lntup","getent hosts <hostname>","curl -v http://<host>:<port>/health"],expected:"ip shows interface addresses/routes, ss lists sockets, getent shows resolver results and curl reports connection and HTTP status.",troubleshooting:"Separate DNS, routing, TCP, TLS and application failures. Confirm bind address, host firewall and upstream security rules.",lab:"Run a local web server on a test port, verify it with ss/curl, block the port in a test firewall rule, diagnose and restore access."};
 if(/ssh|scp|sftp|authorized_keys|known_hosts|bastion/.test(t)) return {explanation:topic+" covers secure remote administration. SSH public-key authentication verifies the private key while the server checks the matching authorized public key and account policy.",example:"A deployment runner connects to a private VM through an approved bastion using a dedicated key and restricted user.",commands:["ssh -vvv <user>@<host>","ssh-keygen -t ed25519 -C 'devmavox-lab'","ssh -o BatchMode=yes <user>@<host> 'hostname && id'","scp <file> <user>@<host>:/tmp/"],expected:"Verbose SSH output identifies authentication or host-verification failures; a successful remote command prints hostname and identity.",troubleshooting:"Check reachability, port policy, sshd, username, key permissions, authorized_keys ownership/mode, known_hosts fingerprint and server logs.",lab:"Use two disposable VMs, configure a test user's SSH key, verify access, transfer a harmless file and revoke the test key."};
 if(/storage|disk|partition|mount|fstab|inode|lvm/.test(t)) return {explanation:topic+" covers Linux block storage and filesystems. Disks are partitioned, formatted and mounted; inode exhaustion can occur even when byte capacity remains.",example:"A disk alert fires; the engineer checks df, du and inode usage, then identifies old application logs before applying retention.",commands:["lsblk -f","df -hT","df -ih","du -xhd1 /var 2>/dev/null | sort -h","findmnt"],expected:"lsblk shows devices, df reports space and inode use, du ranks directory usage and findmnt shows mount sources.",troubleshooting:"Check block and inode capacity, deleted-but-open files with lsof +L1, read-only mounts and filesystem errors. Never format production storage without verified backup and approval.",lab:"Attach a disposable virtual disk, create a filesystem, mount under /mnt/lab, inspect it and safely unmount the test disk."};
 if(/bash|script|shell|variable|loop|function|awk|sed|grep|pipe|exit code|trap|cron/.test(t)) return {explanation:topic+" is part of Linux shell automation. Bash combines commands, variables, conditions, loops, functions and exit codes for repeatable operations.",example:"A pre-check script validates disk space and service state, writes timestamped logs and exits non-zero when a required condition fails.",commands:["bash --version","bash -n <script.sh","shellcheck <script.sh","bash -x <script.sh","echo $?"],expected:"bash -n checks syntax, ShellCheck reports common defects, bash -x traces execution and echo $? shows the prior exit code.",troubleshooting:"Quote expansions, validate inputs, handle missing commands and paths, use meaningful exit codes and understand pipeline failures. set -euo pipefail still requires careful design.",lab:"Write a script that checks a service and disk threshold, logs results, validates arguments and returns non-zero when a check fails."};
 if(/package|apt|yum|dnf|rpm|repository|patch|install|update/.test(t)) return {explanation:topic+" covers Linux package management. Package managers resolve dependencies and install software from configured repositories.",example:"During a patch window, approved security packages are updated and versions are recorded before required services are restarted.",commands:["cat /etc/os-release","apt-cache policy <package>","dpkg -l <package>","dnf info <package>","rpm -qi <package>"],expected:"os-release identifies the distribution; package queries show available/installed versions and metadata.",troubleshooting:"Check repository reachability, package locks, GPG signatures, version conflicts and disk space. Review service impact before production patching.",lab:"In a disposable VM, identify the package manager, inspect a web-server package, install/update it and verify package and service state."};
 if(/log|journal|rotate|auth|troubleshoot|incident/.test(t)) return {explanation:topic+" is a Linux observability and incident-response practice. System and application logs provide timestamped evidence about authentication, services and application errors.",example:"An API returns HTTP 500 after a release; correlate application logs, systemd journal and proxy logs using the incident time window.",commands:["journalctl -p err -S '1 hour ago' --no-pager","tail -n 100 /var/log/syslog","grep -iE 'error|failed|denied' /var/log/<app>.log","systemctl status <service>"],expected:"journalctl and log files show timestamped events. File names differ by distribution and service.",troubleshooting:"Check time synchronization, log rotation, permissions, retention and service unit. Preserve evidence before remediation.",lab:"Stop a test service, locate the failure in journalctl, restart it and document timeline, root cause and prevention."};
 if(/cron|schedule|automation|timer/.test(t)) return {explanation:topic+" schedules recurring Linux work. Cron runs commands by time expression; systemd timers integrate scheduling with service dependencies.",example:"A maintenance script runs nightly under a dedicated account, logs output and prevents overlapping runs with a lock.",commands:["crontab -l","systemctl list-timers --all","journalctl -u cron -n 50 --no-pager","date"],expected:"crontab lists schedules, list-timers shows next/last activation and scheduler logs show job launches.",troubleshooting:"Check timezone, PATH, absolute paths, executable bit, user permissions, output redirection and scheduler service state.",lab:"Schedule a harmless script to append a timestamp in a test VM, verify execution and remove the temporary schedule."};
 if(/security|selinux|apparmor|firewall|hardening|audit/.test(t)) return {explanation:topic+" is a Linux host-security control. Hardening combines least privilege, patching, service minimization, firewall policy, mandatory access controls and audit evidence.",example:"A production VM exposes only HTTPS, runs its app as non-root and records privileged access.",commands:["getenforce","aa-status","ss -lntup","sudo -l -U <user>","sudo ufw status verbose"],expected:"Commands report SELinux/AppArmor mode, listening sockets, sudo privileges and firewall status; availability varies by distribution.",troubleshooting:"Inspect audit denials and service logs before changing enforcement. Do not disable SELinux/AppArmor or flush firewall rules as a first fix.",lab:"Audit a disposable VM's ports, sudo access and mandatory access-control status, apply one low-risk hardening change and verify the app."};
 if(/kernel|distribution|architecture|boot|systemd|init/.test(t)) return {explanation:topic+" explains the Linux startup and operating-system layer. Firmware loads a bootloader, the bootloader starts the kernel, and the kernel initializes hardware before launching the init system and userspace services.",example:"After a VM reboot, an engineer checks kernel version, boot target and failed systemd units to determine why the application service did not return.",commands:["uname -r","cat /etc/os-release","systemctl get-default","systemctl --failed","journalctl -b -p err --no-pager"],expected:"The commands identify the running kernel and distribution, default target, failed units and errors from the current boot.",troubleshooting:"Compare the current boot with the previous one, inspect failed unit dependencies and kernel messages, and confirm whether the issue is a missing mount, driver, configuration or service dependency.",lab:"In a disposable VM, inspect boot state, create a harmless failing test service, locate its error in the current boot journal, fix the unit and verify it starts."};
 if(/environment|variable|path|shell|terminal|bash|script|quoting|loop|function|pipe|awk|sed/.test(t)) return {explanation:topic+" is part of the Linux shell and automation environment. Shells expand variables, resolve commands through PATH, pass arguments to processes and return exit statuses that scripts must check.",example:"A deployment script sets an explicit PATH, validates required variables, uses quoted arguments and exits non-zero when a health check fails so CI cannot report a false success.",commands:["printf 'PATH=%s\\n' \"$PATH\"","command -v bash","bash -n <script.sh>","shellcheck <script.sh>","echo $?"],expected:"The commands show the effective PATH, resolved shell, syntax-check result, static-analysis findings and last command exit status.",troubleshooting:"Check shebang, executable bit, interpreter path, quoting, unset variables, PATH differences and pipeline exit handling. Reproduce with the same user and environment as the scheduler or CI runner.",lab:"Write a small health-check script with validated input, quoted variables, logging and explicit exit codes; run bash -n and ShellCheck before testing success and failure cases."};
 if(/web server|nginx|apache|http|tls|https|certificate/.test(t)) return {explanation:topic+" covers hosting HTTP services on Linux. A web server binds a socket, maps requests to a virtual host or server block, reads content with its service identity and writes access/error logs.",example:"A reverse proxy terminates TLS on port 443 and forwards requests to an application on localhost:3000; the engineer validates the config before reloading Nginx.",commands:["sudo nginx -t","sudo systemctl status nginx","ss -lntp | grep -E ':80|:443'","curl -I http://127.0.0.1","tail -n 50 /var/log/nginx/error.log"],expected:"nginx -t reports syntax success, systemctl shows service state, ss shows listening sockets, curl returns HTTP headers and the error log records request failures.",troubleshooting:"Check config syntax, server_name matching, upstream health, bind conflicts, file permissions, firewall rules and certificate chain/expiry. Inspect 403, 404, 502 and TLS errors separately.",lab:"Configure a test Nginx virtual host, deliberately point its upstream to a stopped local service, diagnose the 502 from logs and curl, restore the upstream and verify HTTP 200."};
 return {explanation:topic+" belongs to "+moduleTitle+". Identify the Linux subsystem, configuration file, process or kernel interface that owns the behavior, then validate it with commands that expose the live state rather than relying on a configuration file alone.",example:"An engineer reproduces this topic in a disposable VM, changes one relevant setting, captures the before-and-after command output and verifies the effect on the target service before documenting a rollback.",commands:["uname -a","systemctl status <service>","journalctl -u <service> -n 50 --no-pager","ss -lntup","df -h"],expected:"The output identifies kernel/host state, service status and recent logs, listening sockets and filesystem capacity. Use the command relevant to the topic and note distribution-specific differences.",troubleshooting:"Record the command, exit code and timestamp; inspect the owning service, journal, permissions, dependencies, sockets and resource limits. Avoid destructive cleanup or broad permission changes before confirming the cause.",lab:"Build a small reproducible test for this topic in a disposable Linux VM, capture baseline output, trigger one controlled fault, diagnose it, apply the narrow fix and verify recovery."};
}



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
                          const topicId = module.title + "::" + topic;
                          const isCompleted = completed.includes(topicId);
                          const guide = getLinuxTopicGuide(topic, module.title);
                          return (
                            <div key={topicId} className="rounded-xl border border-slate-200 bg-white p-4 text-slate-800">
                              <label className="flex cursor-pointer items-start gap-3">
                                <input type="checkbox" checked={isCompleted} onChange={() => toggleTopic(topicId)} className="mt-1 h-4 w-4 accent-orange-500" />
                                <span className={isCompleted ? "font-semibold text-slate-500 line-through" : "font-semibold text-slate-900"}>{topic}</span>
                              </label>
                              <div className="mt-3 grid gap-3 border-t border-slate-100 pt-3 text-sm leading-6 md:grid-cols-2">
                                <div><p className="font-semibold text-blue-700">Explanation</p><p>{guide.explanation}</p></div>
                                <div><p className="font-semibold text-blue-700">Practical example</p><p>{guide.example}</p></div>
                                <div className="md:col-span-2"><p className="font-semibold text-emerald-700">Commands and expected output</p>{guide.commands.map((command) => <pre key={command} className="mt-1 overflow-x-auto rounded bg-slate-950 p-2 text-xs text-emerald-300"><code>{command}</code></pre>)}<p className="mt-2 text-slate-600">{guide.expected}</p></div>
                                <div><p className="font-semibold text-rose-700">Troubleshooting</p><p>{guide.troubleshooting}</p></div>
                                <div><p className="font-semibold text-amber-700">Hands-on task</p><p>{guide.lab}</p></div>
                              </div>
                            </div>
                          );
                        })}                      </div>

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



