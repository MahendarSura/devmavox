export interface linuxtroubleshootingQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const linuxtroubleshootingQuestions: linuxtroubleshootingQuestion[] = [
  {
    id: "linux-troubleshooting-1",
    question: "Which command displays the current working directory?",
    options: ["ls", "pwd", "cd", "whoami"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-2",
    question: "Which command displays running processes interactively?",
    options: ["mkdir", "touch", "pwd", "top"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-3",
    question: "Which command shows filesystem disk usage in a human-readable format?",
    options: ["df -h", "free -m", "du -s", "uptime"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-4",
    question: "Which command checks memory usage?",
    options: ["df -h", "lsblk", "free -h", "hostname"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-5",
    question: "Which command shows the size of a directory and its contents?",
    options: ["chmod", "du -sh /path", "who", "uname"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-6",
    question: "Which command displays the last lines of a log file?",
    options: ["head", "wc", "cut", "tail"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-7",
    question: "How can you continuously follow new lines added to a log file?",
    options: ["tail -f /var/log/syslog", "head -f /var/log/syslog", "cat -r /var/log/syslog", "ls -f /var/log/syslog"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-8",
    question: "Which command searches for a text pattern inside a file?",
    options: ["mv", "cp", "grep", "mkdir"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-9",
    question: "Which command displays recent systemd journal messages?",
    options: ["journalctl --delete", "journalctl -xe", "systemctl --memory", "dmesg --clear"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-10",
    question: "Which command displays kernel ring-buffer messages?",
    options: ["passwd", "crontab", "date", "dmesg"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-11",
    question: "A Linux server is running slowly. What should you check first?",
    options: ["CPU, memory, disk I/O, load average, and running processes", "Delete all log files", "Reinstall every package", "Disable the firewall immediately"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-12",
    question: "Which command displays system load averages and uptime?",
    options: ["ls -l", "free -h", "uptime", "id"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-13",
    question: "What does a high load average generally indicate?",
    options: ["The system has no running processes", "Many tasks are runnable or waiting in uninterruptible states", "The disk is always empty", "The network is definitely disconnected"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-14",
    question: "Which command can display CPU and memory usage for processes?",
    options: ["mkdir", "mount", "hostname", "top"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-15",
    question: "Which command can list processes with detailed information?",
    options: ["ps aux", "pwd -a", "df aux", "free aux"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-16",
    question: "Which command sends a termination signal to a process by PID?",
    options: ["chmod", "chown", "kill PID", "mount PID"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-17",
    question: "What does SIGKILL do?",
    options: ["Requests a graceful application reload", "Forcefully terminates a process and cannot be caught or ignored", "Pauses the system clock", "Restarts the network"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-18",
    question: "Which signal is commonly used to request graceful process termination?",
    options: ["SIGSTOP", "SIGKILL", "SIGCONT", "SIGTERM"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-19",
    question: "Which command finds a process by its name or command line?",
    options: ["pgrep nginx", "df nginx", "free nginx", "mount nginx"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-20",
    question: "What is a zombie process?",
    options: ["A process using all CPU cores", "A process that has never started", "A terminated process whose exit status has not yet been collected by its parent", "A process that automatically restarts"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-21",
    question: "Which command checks the status of a systemd service?",
    options: ["journalctl start nginx", "systemctl status nginx", "service nginx compile", "ps status nginx"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-22",
    question: "Which command starts a systemd service?",
    options: ["systemctl list nginx", "systemctl inspect nginx", "systemctl showlog nginx", "systemctl start nginx"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-23",
    question: "Which command enables a service to start automatically at boot?",
    options: ["systemctl enable nginx", "systemctl status nginx", "systemctl cat nginx", "systemctl reload-daemon nginx"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-24",
    question: "A service fails to start. What is a good next troubleshooting step?",
    options: ["Delete /etc immediately", "Disable all security controls", "Check systemctl status and journalctl logs", "Change every file permission to 777"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-25",
    question: "Which command asks systemd to reload unit definitions after unit files change?",
    options: ["systemctl restart-system", "systemctl daemon-reload", "systemctl reload-kernel", "journalctl --reload"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-26",
    question: "What is the difference between restart and reload for a service?",
    options: ["They always perform exactly the same action", "Reload always reinstalls the package", "Restart only changes logs", "Restart stops and starts a service; reload asks it to reread configuration if supported"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-27",
    question: "Which command shows the current system hostname?",
    options: ["hostname", "hostpath", "uname -p hostname", "whoami --host"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-28",
    question: "Which command displays the Linux kernel version?",
    options: ["df -k", "free -k", "uname -r", "id -r"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-29",
    question: "Which command displays block devices and their partitions?",
    options: ["ps aux", "lsblk", "ip route", "who"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-30",
    question: "Which command displays mounted filesystems and their mount points?",
    options: ["top", "pwd", "uptime", "findmnt"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-31",
    question: "The root filesystem is 100% full. What should you do first?",
    options: ["Identify large files, logs, temporary files, and deleted-but-open files", "Delete random system directories", "Reboot repeatedly without checking", "Change the hostname"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-32",
    question: "Which command helps find large directories under /var?",
    options: ["free -h /var", "ps /var", "du -xhd1 /var", "who /var"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-33",
    question: "What can happen when a filesystem runs out of free space?",
    options: ["All services automatically become faster", "Applications may fail to write logs, temporary files, or application data", "Every process receives more memory", "Network routes are automatically repaired"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-34",
    question: "Which command displays inode usage for filesystems?",
    options: ["df -m", "du -h", "ls -i /etc", "df -i"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-35",
    question: "A filesystem has free space but cannot create new files. What could be the reason?",
    options: ["Inodes may be exhausted", "The hostname is too long", "The CPU has too many cores", "The system clock uses UTC"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-36",
    question: "What is a deleted-but-open file?",
    options: ["A file stored in Git", "A symbolic link", "A file whose directory entry was removed but which a process still has open", "A file with read-only permissions"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-37",
    question: "Which command can help identify processes holding deleted files open?",
    options: ["lsblk", "lsof +L1", "free -h", "hostnamectl"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-38",
    question: "Why might deleting a large log file fail to free disk space immediately?",
    options: ["Linux cannot delete log files", "The filesystem must always be reformatted", "The file is automatically copied to RAM", "A running process may still hold the deleted file open"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-39",
    question: "Which command displays file permissions and ownership?",
    options: ["ls -l", "pwd", "uptime", "free -h"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-40",
    question: "Which command changes file permissions?",
    options: ["chown", "usermod", "chmod", "passwd"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-41",
    question: "Which command changes file ownership?",
    options: ["chmod", "chown", "chgrpall", "owner"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-42",
    question: "What does permission mode 755 mean for a regular file?",
    options: ["Everyone has full read, write, and execute permissions", "Only the owner can read it", "The group has write permission but no read permission", "Owner has read/write/execute; group and others have read/execute"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-43",
    question: "Why is chmod 777 usually discouraged on production systems?",
    options: ["It can grant write and execute permissions too broadly", "It disables the network interface", "It always deletes the file", "It changes the file owner to root"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-44",
    question: "A script returns 'Permission denied' when executed. What should you check?",
    options: ["Only the hostname", "Only the system date", "Execute permissions, directory permissions, mount options, and security policies", "Only the number of CPU cores"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-45",
    question: "What does the execute bit on a directory allow?",
    options: ["Changing its owner automatically", "Traversing or accessing entries in the directory, subject to other permissions", "Running every file inside automatically", "Deleting the entire filesystem"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-46",
    question: "Which command shows the current user's identity and group memberships?",
    options: ["date", "df -h", "lsblk", "id"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-47",
    question: "Which command changes a user's password?",
    options: ["passwd", "chown", "chmod", "groupset"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-48",
    question: "Which command can add an existing user to an additional supplementary group?",
    options: ["chmod -G developers user", "passwd -a developers user", "usermod -aG developers user", "groupadd -u developers user"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-49",
    question: "What is the purpose of sudo?",
    options: ["To compress logs", "To run permitted commands with another user's privileges, commonly root", "To change the kernel version", "To create DNS records"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-50",
    question: "A user cannot access a directory despite having file read permission. What else should be checked?",
    options: ["Only the hostname", "Only the kernel version", "Only the system uptime", "Parent directory traversal permissions and ACLs"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-51",
    question: "Which command displays network interfaces and their IP addresses?",
    options: ["ip addr", "df -h", "ls -l", "free -m"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-52",
    question: "Which command displays the routing table?",
    options: ["ip link", "ip neigh", "ip route", "ip process"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-53",
    question: "Which command tests basic reachability using ICMP echo requests?",
    options: ["curl", "ping", "chmod", "journalctl"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-54",
    question: "Which command checks whether a TCP port is listening locally?",
    options: ["df -i", "lsblk", "uptime", "ss -lntp"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-55",
    question: "A website cannot be reached by hostname. What should you check?",
    options: ["DNS resolution, network route, firewall rules, service status, and listening port", "Only the file owner of /tmp", "Only the current user's shell", "Only the server's CPU model"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-56",
    question: "Which command can query DNS records from a resolver?",
    options: ["chmod", "ps", "dig", "mkfs"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-57",
    question: "Which file commonly contains local hostname-to-IP mappings?",
    options: ["/etc/passwd", "/etc/hosts", "/etc/fstab", "/etc/shadow"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-58",
    question: "What does connection refused commonly indicate?",
    options: ["DNS is always working perfectly", "The remote filesystem is full", "The server is always offline", "The destination was reachable but no service accepted the connection, or a firewall actively rejected it"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-59",
    question: "What does a connection timeout commonly indicate?",
    options: ["The connection did not complete within the configured time, possibly due to filtering, routing, or an unresponsive endpoint", "The request definitely succeeded", "The user password expired", "The disk inode count is zero"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-60",
    question: "Which command can test an HTTP endpoint and show response headers?",
    options: ["ls -lh", "free -h", "curl -v https://example.com", "chmod -v https://example.com"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-61",
    question: "Which command commonly manages firewall rules on systems using UFW?",
    options: ["iptables --systemctl", "ufw status", "firewall --grep", "netstat --ufw"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-62",
    question: "What is an important production precaution before changing firewall rules remotely?",
    options: ["Delete the default route first", "Disable all authentication", "Remove SSH packages", "Ensure management access will remain available and a recovery path exists"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-63",
    question: "Which command displays current TCP and UDP socket information?",
    options: ["ss -tuln", "du -sh", "ls -a", "whoami"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-64",
    question: "What can cause a service to fail when binding to a port?",
    options: ["The system uses UTC", "The log file is readable", "The port is already in use or the process lacks required privileges", "The server has too much disk space"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-65",
    question: "Which command shows the network path packets may take toward a destination?",
    options: ["chmod", "traceroute", "chown", "free"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-66",
    question: "Which command displays the system's current date and time?",
    options: ["uptime -t", "ls -t", "ip time", "date"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-67",
    question: "Which command displays and manages system time synchronization on many systemd systems?",
    options: ["timedatectl", "timesync chmod", "systemctl clock-reset", "journalctl --time-change"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-68",
    question: "Why can incorrect system time cause production problems?",
    options: ["It always corrupts the CPU", "It disables all file permissions", "It can affect TLS validation, logs, scheduled jobs, and distributed-system behavior", "It deletes DNS records automatically"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-69",
    question: "Which command lists scheduled jobs for the current user?",
    options: ["systemctl list-users", "crontab -l", "jobs --cron", "at -l -u"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-70",
    question: "A cron job fails but works in an interactive shell. What is a common cause?",
    options: ["Cron always runs with a full desktop environment", "Cron automatically uses every user's aliases", "Cron ignores executable permissions", "Cron may have a different PATH, environment, working directory, or permissions"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-71",
    question: "Which command displays kernel and system boot messages in the systemd journal?",
    options: ["journalctl -b", "journalctl --format=delete", "systemctl boot --erase", "ls -b /"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-72",
    question: "Which command shows the previous boot's journal when it is retained?",
    options: ["journalctl -b 0", "journalctl --last-file", "journalctl -b -1", "systemctl previous-boot"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-73",
    question: "Which command can display kernel messages related to device or driver issues?",
    options: ["who", "dmesg", "passwd", "crontab -l"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-74",
    question: "What is OOM in Linux troubleshooting?",
    options: ["Open Operating Module", "Original Output Mode", "Online Object Mapping", "Out Of Memory"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-75",
    question: "A process is killed by the Linux OOM killer. What should you investigate?",
    options: ["Memory pressure, process memory consumption, kernel logs, and workload limits", "Only the DNS search domain", "Only the file creation umask", "Only the system hostname"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-76",
    question: "What is swap space used for?",
    options: ["Storing permanent DNS records", "Replacing CPU caches completely", "Providing disk-backed space for memory pages under applicable conditions", "Saving executable permissions"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-77",
    question: "Which command can display disk I/O statistics and device utilization?",
    options: ["who", "iostat", "chmod", "hostname"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-78",
    question: "Which command can help identify processes performing heavy disk I/O?",
    options: ["ls -i", "date", "ip addr", "iotop"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-79",
    question: "What does a high disk utilization percentage indicate?",
    options: ["The storage device may be busy, but latency and workload metrics are needed for interpretation", "The disk is definitely healthy", "The server has no running processes", "The network firewall is disabled"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-80",
    question: "Which command can check filesystem integrity on supported filesystems?",
    options: ["fsck -r /", "chmod --repair /", "fsck", "grep --filesystem"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-81",
    question: "What is a key safety rule when running filesystem repair tools?",
    options: ["Run every repair tool against a mounted root filesystem without checking", "Use the appropriate tool and filesystem state; repair often requires the filesystem to be unmounted", "Delete the partition table first", "Always format the filesystem before checking it"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-82",
    question: "Which file commonly defines persistent filesystem mount configuration?",
    options: ["/etc/hosts", "/etc/group", "/etc/profile", "/etc/fstab"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-83",
    question: "A server fails to boot after an /etc/fstab change. What could help diagnose the issue?",
    options: ["Check mount entries, UUIDs, options, and boot logs using recovery access", "Delete all user accounts", "Rebuild every application image", "Disable all disks"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-84",
    question: "Which command displays UUIDs and filesystem types for block devices?",
    options: ["ps -ef", "ip route", "blkid", "who"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-85",
    question: "Which command shows file descriptors and open files for a process?",
    options: ["lsblk", "lsof", "uptime", "free"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-86",
    question: "What can happen when a process reaches its open-file descriptor limit?",
    options: ["Its CPU speed doubles", "The kernel automatically deletes its source code", "Its DNS entries are recreated", "It may fail to open files or sockets and return 'Too many open files'"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-87",
    question: "Which command displays a process's resource limits?",
    options: ["ulimit -a", "df -a", "ip -a", "chmod -a"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-88",
    question: "Which command can trace system calls made by a running process?",
    options: ["strace -d /etc", "traceproc --all", "strace -p PID", "ps --trace-network"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-89",
    question: "What is a possible use of strace during troubleshooting?",
    options: ["Automatically fixing all bugs", "Identifying failing system calls and their errors", "Increasing disk capacity", "Renewing TLS certificates"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-90",
    question: "Which command can inspect a process's environment variables on Linux when permissions allow?",
    options: ["df /proc/PID", "ip env PID", "chmod /proc/PID/environ", "tr '\\0' '\\n' < /proc/PID/environ"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-91",
    question: "A Linux server is unexpectedly rebooting. What should you investigate?",
    options: ["Previous boot logs, kernel errors, hardware events, OOM events, and cloud or hypervisor events", "Only the shell prompt color", "Only the Git branch name", "Only the DNS search suffix"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-92",
    question: "Which command displays currently logged-in users?",
    options: ["df -u", "free -u", "who", "ip user"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-93",
    question: "Which command shows recent login history on systems with the required accounting data?",
    options: ["last -c", "last", "history --users", "journalctl --login-only"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-94",
    question: "Why should production logs be monitored and rotated?",
    options: ["To guarantee there are never application errors", "To eliminate the need for backups", "To prevent all network traffic", "To aid troubleshooting and avoid uncontrolled log growth consuming disk space"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-95",
    question: "What is log rotation?",
    options: ["Rotating, archiving, and managing log files to control their size and retention", "Restarting the CPU after every request", "Changing every log line into JSON automatically", "Deleting the entire filesystem"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-96",
    question: "What should you do before making a risky production system change?",
    options: ["Disable monitoring and alerts", "Delete all backups", "Understand impact, verify backups or recovery, and prepare a rollback plan", "Apply the change to every server simultaneously without testing"],
    answer: 2
  },
  {
    id: "linux-troubleshooting-97",
    question: "A Linux server has high CPU usage after a deployment. What is the best initial approach?",
    options: ["Immediately kill every process", "Identify the top CPU-consuming processes, correlate with deployment changes, and inspect application logs", "Delete the package manager database", "Disable all system services"],
    answer: 1
  },
  {
    id: "linux-troubleshooting-98",
    question: "An application is unreachable even though its process is running. What should you verify?",
    options: ["Only the process name", "Only the user's password expiry", "Only the server's physical color", "Listening socket, bind address, firewall, routing, and application health"],
    answer: 3
  },
  {
    id: "linux-troubleshooting-99",
    question: "What is the value of correlating timestamps across system, application, and network logs?",
    options: ["It helps reconstruct the sequence of events during an incident", "It automatically fixes every failed service", "It removes the need for monitoring", "It makes all log files identical"],
    answer: 0
  },
  {
    id: "linux-troubleshooting-100",
    question: "During a production Linux incident, what is the best general troubleshooting approach?",
    options: ["Make multiple untracked changes at once", "Restart everything before collecting evidence", "Collect evidence, identify the failing layer, test a hypothesis, apply a controlled fix, and verify recovery", "Delete logs so the server has more disk space"],
    answer: 2
  }
];
