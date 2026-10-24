export interface LinuxQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const linuxQuestions: LinuxQuestion[] = [
  {
    question: "1. Which command displays the current working directory?",
    options: [
      "ls",
      "pwd",
      "cd",
      "whoami"
    ],
    answer: 1
  },
  {
    question: "2. Which command lists hidden files?",
    options: [
      "ls -h",
      "ls -r",
      "ls -la",
      "ls -t"
    ],
    answer: 2
  },
  {
    question: "3. Which command displays running processes?",
    options: [
      "ps aux",
      "mkdir",
      "touch",
      "pwd"
    ],
    answer: 0
  },
  {
    question: "4. Which command monitors CPU and memory interactively?",
    options: [
      "df -h",
      "du -sh",
      "uname -r",
      "top"
    ],
    answer: 3
  },
  {
    question: "5. Which command displays filesystem disk usage?",
    options: [
      "free -h",
      "df -h",
      "ps aux",
      "uptime"
    ],
    answer: 1
  },
  {
    question: "6. Which command checks directory size?",
    options: [
      "free -m",
      "whoami",
      "du -sh /var/log",
      "ip addr"
    ],
    answer: 2
  },
  {
    question: "7. Which command displays available RAM and swap?",
    options: [
      "free -h",
      "df -i",
      "lsblk",
      "chmod"
    ],
    answer: 0
  },
  {
    question: "8. Which command displays system uptime and load average?",
    options: [
      "mount",
      "whoami",
      "cat /etc/passwd",
      "uptime"
    ],
    answer: 3
  },
  {
    question: "9. Which command follows a log file continuously?",
    options: [
      "head -f app.log",
      "tail -f app.log",
      "grep -f app.log",
      "cat -f app.log"
    ],
    answer: 1
  },
  {
    question: "10. Which command searches for ERROR in a log file?",
    options: [
      "find ERROR app.log",
      "chmod ERROR app.log",
      "grep 'ERROR' app.log",
      "touch ERROR app.log"
    ],
    answer: 2
  },
  {
    question: "11. Which command checks inode usage?",
    options: [
      "df -i",
      "free -h",
      "uptime",
      "ip route"
    ],
    answer: 0
  },
  {
    question: "12. Which command sends a signal to a process?",
    options: [
      "pwd",
      "lsblk",
      "mount",
      "kill"
    ],
    answer: 3
  },
  {
    question: "13. Which signal requests graceful process termination?",
    options: [
      "SIGKILL",
      "SIGTERM",
      "SIGSTOP",
      "SIGCONT"
    ],
    answer: 1
  },
  {
    question: "14. What does kill -9 send to a process?",
    options: [
      "SIGTERM",
      "SIGHUP",
      "SIGKILL",
      "SIGCONT"
    ],
    answer: 2
  },
  {
    question: "15. Which command displays listening network ports?",
    options: [
      "ss -lntup",
      "df -h",
      "free -m",
      "ls -la"
    ],
    answer: 0
  },
  {
    question: "16. Port 8080 is already in use. What should you do first?",
    options: [
      "Reinstall Linux",
      "Delete all logs",
      "Change every file permission",
      "Identify the process listening on port 8080"
    ],
    answer: 3
  },
  {
    question: "17. Which command checks a systemd service status?",
    options: [
      "service-list nginx",
      "systemctl status nginx",
      "ps status nginx",
      "chmod status nginx"
    ],
    answer: 1
  },
  {
    question: "18. Which command starts a service immediately?",
    options: [
      "systemctl list nginx",
      "systemctl enable nginx",
      "systemctl start nginx",
      "systemctl disable nginx"
    ],
    answer: 2
  },
  {
    question: "19. What does systemctl enable do?",
    options: [
      "Configures a service to start automatically at boot",
      "Deletes a service",
      "Displays CPU usage",
      "Immediately stops the service"
    ],
    answer: 0
  },
  {
    question: "20. Which command displays logs for a systemd service?",
    options: [
      "chmod -u nginx",
      "df -u nginx",
      "ps -u nginx",
      "journalctl -u nginx"
    ],
    answer: 3
  },
  {
    question: "21. A service fails to start. What should you check first?",
    options: [
      "Reboot immediately",
      "Service status, logs, and configuration",
      "Delete all system logs",
      "Disable the firewall permanently"
    ],
    answer: 1
  },
  {
    question: "22. Which command displays the kernel version?",
    options: [
      "free -h",
      "df -h",
      "uname -r",
      "whoami"
    ],
    answer: 2
  },
  {
    question: "23. Which command displays network interface IP addresses?",
    options: [
      "ip addr",
      "lsblk",
      "du -sh",
      "journalctl"
    ],
    answer: 0
  },
  {
    question: "24. Which command displays the routing table?",
    options: [
      "df -h",
      "ps aux",
      "free -m",
      "ip route"
    ],
    answer: 3
  },
  {
    question: "25. Which command tests basic network connectivity?",
    options: [
      "chmod server",
      "ping server",
      "mkdir server",
      "touch server"
    ],
    answer: 1
  },
  {
    question: "26. Which command checks HTTP response headers?",
    options: [
      "ls -l https://example.com",
      "df https://example.com",
      "curl -I https://example.com",
      "chmod https://example.com"
    ],
    answer: 2
  },
  {
    question: "27. A hostname cannot be resolved. What should you investigate?",
    options: [
      "DNS configuration and name resolution",
      "File ownership only",
      "CPU temperature only",
      "Disk partition size only"
    ],
    answer: 0
  },
  {
    question: "28. Which file maps hostnames to IP addresses locally?",
    options: [
      "/etc/fstab",
      "/etc/shadow",
      "/etc/group",
      "/etc/hosts"
    ],
    answer: 3
  },
  {
    question: "29. Which command tests whether a remote TCP port is reachable?",
    options: [
      "du -sh server",
      "nc -vz server 443",
      "chmod 443",
      "mkdir 443"
    ],
    answer: 1
  },
  {
    question: "30. An IP works but its hostname does not. What is likely wrong?",
    options: [
      "The disk is full",
      "The CPU is overloaded",
      "DNS or hostname resolution",
      "The file lacks execute permission"
    ],
    answer: 2
  },
  {
    question: "31. What permissions does chmod 755 file.sh assign?",
    options: [
      "Owner rwx, group r-x, others r-x",
      "Owner rw-, group rw-, others rw-",
      "Everyone read-only",
      "Everyone has rwx"
    ],
    answer: 0
  },
  {
    question: "32. What permissions does chmod 644 config.txt assign?",
    options: [
      "Everyone has full access",
      "Owner has execute only",
      "Group has write access",
      "Owner rw-, group r--, others r--"
    ],
    answer: 3
  },
  {
    question: "33. A script returns Permission denied when executed. What is a common fix?",
    options: [
      "Run df -h",
      "Use chmod +x script.sh when appropriate",
      "Run ip route",
      "Run systemctl enable script.sh"
    ],
    answer: 1
  },
  {
    question: "34. Which command changes file ownership?",
    options: [
      "chmod",
      "chgrp",
      "chown",
      "umask"
    ],
    answer: 2
  },
  {
    question: "35. Which command changes a file's group ownership?",
    options: [
      "chgrp",
      "passwd",
      "whoami",
      "touch"
    ],
    answer: 0
  },
  {
    question: "36. Which file contains local user account information?",
    options: [
      "/etc/hosts",
      "/etc/fstab",
      "/etc/group",
      "/etc/passwd"
    ],
    answer: 3
  },
  {
    question: "37. Which command creates a user on many Linux distributions?",
    options: [
      "userlist",
      "useradd",
      "newusergroup",
      "chmoduser"
    ],
    answer: 1
  },
  {
    question: "38. Which command changes a user's password?",
    options: [
      "chown",
      "usermod -d",
      "passwd",
      "groupadd"
    ],
    answer: 2
  },
  {
    question: "39. Which command displays UID, GID, and group membership?",
    options: [
      "id username",
      "pwd username",
      "df username",
      "ip username"
    ],
    answer: 0
  },
  {
    question: "40. What is the purpose of /etc/sudoers?",
    options: [
      "DNS configuration",
      "Filesystem mounting",
      "Application logging",
      "Configuring sudo privileges"
    ],
    answer: 3
  },
  {
    question: "41. Which command safely edits sudoers configuration?",
    options: [
      "nano /etc/shadow",
      "visudo",
      "chmod 777 /etc/sudoers",
      "rm /etc/sudoers"
    ],
    answer: 1
  },
  {
    question: "42. What does umask control?",
    options: [
      "Network routes",
      "CPU usage",
      "Default permissions removed during file creation",
      "Kernel version"
    ],
    answer: 2
  },
  {
    question: "43. Which command lists block devices and partitions?",
    options: [
      "lsblk",
      "ps aux",
      "free -h",
      "journalctl"
    ],
    answer: 0
  },
  {
    question: "44. Which file stores persistent filesystem mount definitions?",
    options: [
      "/etc/hosts",
      "/etc/passwd",
      "/etc/group",
      "/etc/fstab"
    ],
    answer: 3
  },
  {
    question: "45. Which command displays mounted filesystems and mount points?",
    options: [
      "who",
      "findmnt",
      "top",
      "passwd"
    ],
    answer: 1
  },
  {
    question: "46. Disk usage remains high after deleting a large log. What could explain this?",
    options: [
      "Missing DNS records",
      "Incorrect shell prompt",
      "A process still holds the deleted file open",
      "Too many user accounts"
    ],
    answer: 2
  },
  {
    question: "47. Which command helps find deleted files still held open by processes?",
    options: [
      "lsof +L1",
      "chmod +L1",
      "free +L1",
      "uname +L1"
    ],
    answer: 0
  },
  {
    question: "48. A filesystem is full. What is a sensible first step?",
    options: [
      "Delete all system files",
      "Reformat immediately",
      "Restart without checking",
      "Use df -h and du to identify the affected filesystem and large directories"
    ],
    answer: 3
  },
  {
    question: "49. Which command checks available swap and RAM?",
    options: [
      "df -h",
      "free -h",
      "ls -la",
      "ip link"
    ],
    answer: 1
  },
  {
    question: "50. A server is running out of memory. What should you investigate?",
    options: [
      "Only /etc/hosts",
      "Only file names",
      "Process memory, kernel logs, and OOM events",
      "Only the system date"
    ],
    answer: 2
  },
  {
    question: "51. What is a zombie process?",
    options: [
      "A terminated process whose exit status has not been collected by its parent",
      "A process consuming all disk space",
      "A service listening on a port",
      "A process that automatically reboots Linux"
    ],
    answer: 0
  },
  {
    question: "52. What can a high load average indicate?",
    options: [
      "DNS is always down",
      "The disk is always full",
      "No processes are running",
      "Many runnable tasks or tasks waiting in uninterruptible states"
    ],
    answer: 3
  },
  {
    question: "53. Which command displays recent kernel messages?",
    options: [
      "chmod",
      "dmesg",
      "mkdir",
      "whoami"
    ],
    answer: 1
  },
  {
    question: "54. Which command displays the last lines of a file?",
    options: [
      "head",
      "cut",
      "tail",
      "sort"
    ],
    answer: 2
  },
  {
    question: "55. Which command displays the first ten lines of a file by default?",
    options: [
      "head",
      "tail",
      "wc",
      "uniq"
    ],
    answer: 0
  },
  {
    question: "56. Which command counts lines, words, and bytes?",
    options: [
      "grep",
      "sed",
      "awk",
      "wc"
    ],
    answer: 3
  },
  {
    question: "57. Which command searches for files by name in a directory tree?",
    options: [
      "grep",
      "find",
      "chmod",
      "mount"
    ],
    answer: 1
  },
  {
    question: "58. Which command searches text using patterns?",
    options: [
      "mkdir",
      "touch",
      "grep",
      "chown"
    ],
    answer: 2
  },
  {
    question: "59. Which command replaces text in a stream using expressions?",
    options: [
      "sed",
      "ls",
      "free",
      "uptime"
    ],
    answer: 0
  },
  {
    question: "60. Which command is commonly used for column-based text processing?",
    options: [
      "mount",
      "passwd",
      "kill",
      "awk"
    ],
    answer: 3
  },
  {
    question: "61. Which command sorts lines alphabetically by default?",
    options: [
      "uniq",
      "sort",
      "wc",
      "cut"
    ],
    answer: 1
  },
  {
    question: "62. Which command removes adjacent duplicate lines?",
    options: [
      "grep",
      "sed",
      "uniq",
      "find"
    ],
    answer: 2
  },
  {
    question: "63. What does the pipe symbol | do in a shell command?",
    options: [
      "Passes one command's standard output to another command's standard input",
      "Deletes the current directory",
      "Changes file ownership",
      "Reboots the machine"
    ],
    answer: 0
  },
  {
    question: "64. What is the purpose of ~/.ssh/known_hosts?",
    options: [
      "Store the user's password in plaintext",
      "Store CPU performance data",
      "Configure systemd services",
      "Record SSH server host keys to help detect unexpected host identity changes"
    ],
    answer: 3
  },
  {
    question: "65. Which command connects to a remote server using SSH?",
    options: [
      "ftp username@server",
      "ssh username@server",
      "ping username@server",
      "mount username@server"
    ],
    answer: 1
  },
  {
    question: "66. Which command generates an SSH key pair?",
    options: [
      "ssh-connect",
      "ssh-login",
      "ssh-keygen",
      "ssh-status"
    ],
    answer: 2
  },
  {
    question: "67. Which file typically contains a user's public SSH keys for login?",
    options: [
      "~/.ssh/authorized_keys",
      "~/.ssh/known_hosts",
      "/etc/fstab",
      "/var/log/syslog"
    ],
    answer: 0
  },
  {
    question: "68. SSH key authentication fails. What should you check?",
    options: [
      "Only the hostname color",
      "Only the shell prompt",
      "Only CPU temperature",
      "Username, key selection, permissions, sshd settings, and server logs"
    ],
    answer: 3
  },
  {
    question: "69. Which command copies files securely between hosts over SSH?",
    options: [
      "chmod",
      "scp",
      "passwd",
      "free"
    ],
    answer: 1
  },
  {
    question: "70. Which command synchronizes files and can transfer them over SSH?",
    options: [
      "ps",
      "top",
      "rsync",
      "uname"
    ],
    answer: 2
  },
  {
    question: "71. Which command schedules recurring tasks for a user?",
    options: [
      "crontab -e",
      "systemctl reboot",
      "passwd -l",
      "lsblk"
    ],
    answer: 0
  },
  {
    question: "72. Which log location commonly contains cron execution messages?",
    options: [
      "/etc/hosts",
      "/etc/fstab",
      "/etc/group",
      "System logs or the systemd journal, depending on the distribution"
    ],
    answer: 3
  },
  {
    question: "73. A cron job works manually but fails on schedule. What should you check?",
    options: [
      "Only the desktop wallpaper",
      "Environment variables, absolute paths, permissions, and job logs",
      "Only the monitor resolution",
      "Only the keyboard layout"
    ],
    answer: 1
  },
  {
    question: "74. Which command displays environment variables?",
    options: [
      "lsblk",
      "mount",
      "printenv",
      "mkfs"
    ],
    answer: 2
  },
  {
    question: "75. Which command displays the current user's identity?",
    options: [
      "whoami",
      "df -h",
      "ip route",
      "lsblk"
    ],
    answer: 0
  },
  {
    question: "76. Which command changes the current directory?",
    options: [
      "pwd",
      "ls",
      "touch",
      "cd"
    ],
    answer: 3
  },
  {
    question: "77. Which command creates a directory?",
    options: [
      "rmdir",
      "mkdir",
      "rm",
      "cat"
    ],
    answer: 1
  },
  {
    question: "78. Which command creates an empty file if it does not exist?",
    options: [
      "mkdir",
      "rmdir",
      "touch",
      "mount"
    ],
    answer: 2
  },
  {
    question: "79. Which command copies a file?",
    options: [
      "cp",
      "mv",
      "rm",
      "pwd"
    ],
    answer: 0
  },
  {
    question: "80. Which command moves or renames a file?",
    options: [
      "cp",
      "cat",
      "touch",
      "mv"
    ],
    answer: 3
  },
  {
    question: "81. Which command removes a file?",
    options: [
      "pwd",
      "rm",
      "cp",
      "cat"
    ],
    answer: 1
  },
  {
    question: "82. Which command extracts a gzip-compressed tar archive?",
    options: [
      "tar -cvf archive.tar directory",
      "gzip -l archive.tar.gz",
      "tar -xzf archive.tar.gz",
      "chmod archive.tar.gz"
    ],
    answer: 2
  },
  {
    question: "83. Which command creates a gzip-compressed tar archive?",
    options: [
      "tar -czf backup.tar.gz directory/",
      "tar -xzf backup.tar.gz",
      "unzip backup.tar.gz",
      "find backup.tar.gz"
    ],
    answer: 0
  },
  {
    question: "84. Which command displays the size of a file in a readable format?",
    options: [
      "free -h",
      "ip addr",
      "whoami",
      "ls -lh filename"
    ],
    answer: 3
  },
  {
    question: "85. Which command displays filesystem type and free space information?",
    options: [
      "ps aux",
      "df -hT",
      "whoami",
      "uname -r"
    ],
    answer: 1
  },
  {
    question: "86. A newly attached disk is visible but not mounted. What should you do?",
    options: [
      "Immediately run mkfs without checking",
      "Delete /etc/fstab",
      "Identify the device and filesystem, then mount it safely",
      "Kill all running processes"
    ],
    answer: 2
  },
  {
    question: "87. Which command displays the system's hostname?",
    options: [
      "hostname",
      "df -h",
      "free -m",
      "chmod"
    ],
    answer: 0
  },
  {
    question: "88. Which command changes the system hostname on systemd-based systems?",
    options: [
      "passwd",
      "useradd",
      "ip route",
      "hostnamectl set-hostname new-name"
    ],
    answer: 3
  },
  {
    question: "89. Which command displays the current date and time?",
    options: [
      "uptime",
      "date",
      "uname",
      "ls"
    ],
    answer: 1
  },
  {
    question: "90. Which command displays time synchronization status on many systemd systems?",
    options: [
      "lsblk",
      "free -h",
      "timedatectl",
      "chmod"
    ],
    answer: 2
  },
  {
    question: "91. Which command checks whether a package is installed on Debian-based systems?",
    options: [
      "dpkg -l",
      "rpm -qa",
      "systemctl status",
      "ip addr"
    ],
    answer: 0
  },
  {
    question: "92. Which command installs a package on Ubuntu or Debian?",
    options: [
      "yum install package",
      "rpm -e package",
      "systemctl install package",
      "sudo apt install package"
    ],
    answer: 3
  },
  {
    question: "93. Which command lists installed RPM packages?",
    options: [
      "apt list --installed",
      "rpm -qa",
      "dpkg -r",
      "journalctl -k"
    ],
    answer: 1
  },
  {
    question: "94. A package installation fails because of dependency issues. What is a good first step on Ubuntu?",
    options: [
      "Delete /usr/bin",
      "Format the root filesystem",
      "Review the package error and repository configuration, then repair dependencies appropriately",
      "Disable all security controls"
    ],
    answer: 2
  },
  {
    question: "95. Which command displays failed systemd units?",
    options: [
      "systemctl --failed",
      "df --failed",
      "chmod --failed",
      "ip --failed"
    ],
    answer: 0
  },
  {
    question: "96. Which command displays kernel and system messages from the journal?",
    options: [
      "passwd -k",
      "mkdir -k",
      "touch -k",
      "journalctl -k"
    ],
    answer: 3
  },
  {
    question: "97. An application returns HTTP 502. What should a DevOps engineer investigate?",
    options: [
      "Only file naming conventions",
      "Reverse proxy logs, upstream health, application logs, and connectivity",
      "Only user passwords",
      "Only filesystem labels"
    ],
    answer: 1
  },
  {
    question: "98. A server becomes unreachable after a firewall change. What should you check?",
    options: [
      "Only the application source code",
      "Only available RAM",
      "Firewall rules, routing, listening ports, and network access",
      "Only file timestamps"
    ],
    answer: 2
  },
  {
    question: "99. A Linux server reboots unexpectedly. Which evidence should you inspect?",
    options: [
      "Previous boot journal, kernel logs, system events, and cloud or hardware events",
      "Only the current working directory",
      "Only hidden filenames",
      "Only the user's shell history"
    ],
    answer: 0
  },
  {
    question: "100. What is the safest general approach when troubleshooting a production Linux server?",
    options: [
      "Run destructive commands immediately",
      "Disable security and monitoring",
      "Reboot before gathering evidence",
      "Check symptoms and logs, assess impact, make controlled changes, and verify recovery"
    ],
    answer: 3
  }
];
