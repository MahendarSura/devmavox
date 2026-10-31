import type { DevOpsTool } from "./command-types";

export const linuxTool: DevOpsTool = {
    name: "Linux",
    category: "Core",
    commands: [
      { command: "pwd", level: "Basic", english: "to print the current directory", telugu: "ప్రస్తుత directory పేరు చూడటానికి." },
      { command: "ls -lah", level: "Basic", english: "to list files with details", telugu: "Files వివరాలు, size, permissions చూడటానికి." },
      { command: "cat /etc/os-release", level: "Intermediate", english: "to identify the Linux distribution", telugu: "Linux distribution వివరాలు తెలుసుకోవటానికి." },
      { command: "find /var/log -type f", level: "Advanced", english: "to find log files under /var/log", telugu: "/var/log లో log files వెతకటానికి." },
      { command: "df -h", level: "Troubleshooting", english: "to check filesystem disk usage", telugu: "Disk space ఎంత ఉపయోగించబడిందో చూడటానికి." },
      { command: "free -h", level: "Troubleshooting", english: "to check memory usage", telugu: "RAM usage తెలుసుకోవటానికి." },
      { command: "systemctl --failed", level: "Troubleshooting", english: "to list failed system services", telugu: "Fail అయిన system services చూడటానికి." },
      {
        command: "du -sh /var/log",
        level: "Basic",
        english: "Show the total size of the log directory.",
        telugu: "Log directory total size telusukovadaniki.",
      },
      {
        command: "uptime",
        level: "Basic",
        english: "Show system uptime and load averages.",
        telugu: "System entha sepu run avutundo, load entho chudataniki.",
      },
      {
        command: "ps aux",
        level: "Basic",
        english: "List running processes.",
        telugu: "Run avutunna processes list chudataniki.",
      },
      {
        command: "top",
        level: "Basic",
        english: "Monitor processes and resource usage interactively.",
        telugu: "Processes mariyu CPU/RAM usage live ga monitor cheyyataniki.",
      },
      {
        command: "ip addr show",
        level: "Basic",
        english: "Display network interfaces and IP addresses.",
        telugu: "Network interfaces, IP addresses chudataniki.",
      },
      {
        command: "ss -tulpn",
        level: "Intermediate",
        english: "List listening TCP/UDP sockets and associated processes.",
        telugu: "Listening ports, services identify cheyyataniki; permissions avasaram kavachu.",
      },
      {
        command: "journalctl -p err -b",
        level: "Intermediate",
        english: "Show system errors from the current boot.",
        telugu: "Current boot lo system errors chudataniki.",
      },
      {
        command: "systemctl status <service>",
        level: "Basic",
        english: "Check the status of a service.",
        telugu: "Service status check cheyyataniki.",
      },
      {
        command: "systemctl restart <service>",
        level: "Intermediate",
        english: "Restart a system service.",
        telugu: "Service restart cheyyataniki; production impact mundu assess cheyyali.",
      },
      {
        command: "find /var/log -type f -mtime -1",
        level: "Intermediate",
        english: "Find log files modified in the last day.",
        telugu: "Last 24 hours lo modify ayina log files vetakataniki.",
      },
      {
        command: "grep -Rni 'error' /var/log/myapp/",
        level: "Intermediate",
        english: "Search application logs for error text.",
        telugu: "Application logs lo error messages search cheyyataniki.",
      },
      {
        command: "lsof -i :8080",
        level: "Troubleshooting",
        english: "Identify processes using port 8080.",
        telugu: "Port 8080 ni ye process use chestundo telusukovadaniki.",
      },
      {
        command: "curl -I https://example.com",
        level: "Basic",
        english: "Check HTTP response headers.",
        telugu: "Website HTTP response headers verify cheyyataniki.",
      },
      {
        command: "dig example.com",
        level: "Basic",
        english: "Query DNS records for a domain.",
        telugu: "Domain DNS resolution test cheyyataniki.",
      },
      {
        command: "tar -czf logs.tar.gz /var/log/myapp/",
        level: "Intermediate",
        english: "Create a compressed archive of application logs.",
        telugu: "Logs ni compressed archive ga backup cheyyataniki; sensitive logs permissions check cheyyali.",
      },
      {
        command: "df -i",
        level: "Troubleshooting",
        english: "Check filesystem inode usage.",
        telugu: "Disk space undi kuda files create avvakapothe inode usage check cheyyataniki.",
      },
      {
        command: "vmstat 1 5",
        level: "Advanced",
        english: "Sample memory, process, and CPU statistics five times.",
        telugu: "Performance troubleshooting kosam system statistics collect cheyyataniki.",
      },
    
      {
        command: "whoami",
        level: "Basic",
        english: "Show current user",
        telugu: "Current user telusukovadaniki"
      },
      {
        command: "id",
        level: "Basic",
        english: "Show user and group IDs",
        telugu: "User and group IDs chudataniki"
      },
      {
        command: "uname -a",
        level: "Basic",
        english: "Show kernel and system information",
        telugu: "Kernel details chudataniki"
      },
      {
        command: "hostname",
        level: "Basic",
        english: "Show system hostname",
        telugu: "System hostname chudataniki"
      },
      {
        command: "date",
        level: "Basic",
        english: "Show current date and time",
        telugu: "Date time chudataniki"
      },
      {
        command: "cal",
        level: "Basic",
        english: "Display a calendar",
        telugu: "Calendar chudataniki"
      },
      {
        command: "history",
        level: "Basic",
        english: "Show shell command history",
        telugu: "Command history chudataniki"
      },
      {
        command: "clear",
        level: "Basic",
        english: "Clear terminal screen",
        telugu: "Terminal screen clear cheyadaniki"
      },
      {
        command: "which bash",
        level: "Basic",
        english: "Locate the Bash executable",
        telugu: "Bash executable path telusukovadaniki"
      },
      {
        command: "type ls",
        level: "Intermediate",
        english: "Identify how a command is resolved",
        telugu: "Command type telusukovadaniki"
      },
      {
        command: "whereis bash",
        level: "Intermediate",
        english: "Find binary and manual locations",
        telugu: "Binary, manual paths chudataniki"
      },
      {
        command: "file /etc/passwd",
        level: "Basic",
        english: "Identify a file's type",
        telugu: "File type telusukovadaniki"
      },
      {
        command: "stat /etc/passwd",
        level: "Intermediate",
        english: "Show file metadata",
        telugu: "File metadata chudataniki"
      },
      {
        command: "readlink -f /bin/sh",
        level: "Intermediate",
        english: "Resolve a symbolic link",
        telugu: "Symbolic link target telusukovadaniki"
      },
      {
        command: "realpath .",
        level: "Basic",
        english: "Print an absolute path",
        telugu: "Absolute path chudataniki"
      },
      {
        command: "tree -L 2",
        level: "Basic",
        english: "Display directories as a tree",
        telugu: "Directory tree chudataniki"
      },
      {
        command: "find . -maxdepth 2 -type f",
        level: "Intermediate",
        english: "Find files two levels deep",
        telugu: "Rendu levels lopala files vetakadaniki"
      },
      {
        command: "find /tmp -type f -mtime +7",
        level: "Intermediate",
        english: "Find old files in temporary storage",
        telugu: "Paatha temporary files vetakadaniki"
      },
      {
        command: "find . -type f -size +100M",
        level: "Advanced",
        english: "Find files larger than 100 MB",
        telugu: "100 MB kanna pedda files vetakadaniki"
      },
      {
        command: "find . -type f -empty",
        level: "Basic",
        english: "Find empty files",
        telugu: "Empty files vetakadaniki"
      },
      {
        command: "find . -type d -empty",
        level: "Basic",
        english: "Find empty directories",
        telugu: "Empty directories vetakadaniki"
      },
      {
        command: "du -sh .",
        level: "Basic",
        english: "Show current directory size",
        telugu: "Current directory size chudataniki"
      },
      {
        command: "du -ah . | sort -h | tail -20",
        level: "Advanced",
        english: "Show the 20 largest paths",
        telugu: "Pedda files/directories chudataniki"
      },
      {
        command: "df -hT",
        level: "Basic",
        english: "Show filesystem space and type",
        telugu: "Filesystem space, type chudataniki"
      },
      {
        command: "lsblk -f",
        level: "Intermediate",
        english: "List block devices and filesystems",
        telugu: "Disks, filesystems chudataniki"
      },
      {
        command: "blkid",
        level: "Advanced",
        english: "Show block-device identifiers",
        telugu: "Disk identifiers telusukovadaniki"
      },
      {
        command: "mount | column -t",
        level: "Intermediate",
        english: "Display mounted filesystems",
        telugu: "Mounted filesystems chudataniki"
      },
      {
        command: "findmnt",
        level: "Intermediate",
        english: "Display mount hierarchy",
        telugu: "Mount hierarchy chudataniki"
      },
      {
        command: "ps aux --sort=-%mem | head",
        level: "Intermediate",
        english: "Show top memory-consuming processes",
        telugu: "Ekkuva RAM vadutunna processes chudataniki"
      },
      {
        command: "ps -eo pid,ppid,stat,cmd",
        level: "Intermediate",
        english: "List process IDs and states",
        telugu: "Process IDs, states chudataniki"
      },
      {
        command: "pgrep -a sshd",
        level: "Basic",
        english: "Find SSH daemon processes",
        telugu: "SSH processes vetakadaniki"
      },
      {
        command: "pstree -p",
        level: "Intermediate",
        english: "Show process tree with PIDs",
        telugu: "Process tree chudataniki"
      },
      {
        command: "nice -n 10 sleep 60",
        level: "Advanced",
        english: "Start a process with adjusted priority",
        telugu: "Priority marchi process run cheyadaniki"
      },
      {
        command: "renice 5 -p <PID>",
        level: "Advanced",
        english: "Change a running process priority",
        telugu: "Running process priority marchadaniki"
      },
      {
        command: "kill -TERM <PID>",
        level: "Intermediate",
        english: "Request graceful process termination",
        telugu: "Process ni graceful-ga stop cheyadaniki"
      },
      {
        command: "kill -KILL <PID>",
        level: "Troubleshooting",
        english: "Forcefully terminate a process",
        telugu: "Respond avvani process ni force stop cheyadaniki"
      },
      {
        command: "ip route show",
        level: "Intermediate",
        english: "Display routing table",
        telugu: "Routing table chudataniki"
      },
      {
        command: "ip neigh show",
        level: "Intermediate",
        english: "Display neighbor cache",
        telugu: "Neighbor IP/MAC entries chudataniki"
      },
      {
        command: "ping -c 4 127.0.0.1",
        level: "Basic",
        english: "Test local network stack",
        telugu: "Local network stack test cheyadaniki"
      },
      {
        command: "getent hosts example.com",
        level: "Intermediate",
        english: "Resolve a hostname using system databases",
        telugu: "Hostname resolution test cheyadaniki"
      },
      {
        command: "curl -sS -o /dev/null -w '%{http_code}\n' https://example.com",
        level: "Intermediate",
        english: "Print HTTP status code",
        telugu: "HTTP status code telusukovadaniki"
      },
      {
        command: "traceroute example.com",
        level: "Intermediate",
        english: "Trace network path to a host",
        telugu: "Network route trace cheyadaniki"
      },
      {
        command: "resolvectl status",
        level: "Intermediate",
        english: "Show system DNS configuration",
        telugu: "DNS configuration chudataniki"
      },
      {
        command: "timedatectl status",
        level: "Basic",
        english: "Show time and clock settings",
        telugu: "System time settings chudataniki"
      },
      {
        command: "timedatectl list-timezones",
        level: "Basic",
        english: "List available time zones",
        telugu: "Time zones list chudataniki"
      },
      {
        command: "journalctl -b",
        level: "Intermediate",
        english: "Show current boot logs",
        telugu: "Current boot logs chudataniki"
      },
      {
        command: "journalctl -u <service> --since today",
        level: "Intermediate",
        english: "Show today's service logs",
        telugu: "Service today's logs chudataniki"
      },
      {
        command: "dmesg -T | tail -50",
        level: "Intermediate",
        english: "Show recent kernel messages",
        telugu: "Recent kernel messages chudataniki"
      },
      {
        command: "systemctl is-active <service>",
        level: "Basic",
        english: "Check whether a service is active",
        telugu: "Service active ga undo chudataniki"
      },
      {
        command: "systemctl list-units --type=service",
        level: "Intermediate",
        english: "List loaded service units",
        telugu: "Loaded services chudataniki"
      },
      {
        command: "systemctl list-unit-files --state=enabled",
        level: "Intermediate",
        english: "List enabled service definitions",
        telugu: "Enabled services chudataniki"
      },
      {
        command: "sudo systemctl restart <service>",
        level: "Troubleshooting",
        english: "Restart a service",
        telugu: "Service restart cheyadaniki"
      },
      {
        command: "sudo systemctl reload <service>",
        level: "Intermediate",
        english: "Reload service configuration",
        telugu: "Service configuration reload cheyadaniki"
      },
      {
        command: "sudo systemctl enable <service>",
        level: "Intermediate",
        english: "Enable a service at boot",
        telugu: "Boot appudu service start avvadaniki"
      },
      {
        command: "sudo systemctl disable <service>",
        level: "Intermediate",
        english: "Disable automatic service startup",
        telugu: "Automatic startup disable cheyadaniki"
      },
      {
        command: "chmod 640 <file>",
        level: "Basic",
        english: "Set owner and group file permissions",
        telugu: "File permissions set cheyadaniki"
      },
      {
        command: "chmod u+x <script>",
        level: "Basic",
        english: "Make a script executable for its owner",
        telugu: "Script execute permission ivvadaniki"
      },
      {
        command: "chown <user>:<group> <file>",
        level: "Intermediate",
        english: "Change file ownership",
        telugu: "File owner/group marchadaniki"
      },
      {
        command: "umask 027",
        level: "Advanced",
        english: "Set default permission mask",
        telugu: "Default permissions control cheyadaniki"
      },
      {
        command: "getfacl <file>",
        level: "Advanced",
        english: "Display access control lists",
        telugu: "ACL permissions chudataniki"
      },
      {
        command: "setfacl -m u:<user>:r <file>",
        level: "Advanced",
        english: "Grant a user read access using ACL",
        telugu: "User ki ACL read access ivvadaniki"
      },
      {
        command: "id <user>",
        level: "Basic",
        english: "Show another user's identity and groups",
        telugu: "User groups telusukovadaniki"
      },
      {
        command: "getent passwd <user>",
        level: "Intermediate",
        english: "Look up a user account",
        telugu: "User account details chudataniki"
      },
      {
        command: "getent group <group>",
        level: "Intermediate",
        english: "Look up a group",
        telugu: "Group details chudataniki"
      },
      {
        command: "sudo useradd -m <user>",
        level: "Intermediate",
        english: "Create a user with a home directory",
        telugu: "Home directory tho user create cheyadaniki"
      },
      {
        command: "sudo usermod -aG <group> <user>",
        level: "Intermediate",
        english: "Add a user to a supplementary group",
        telugu: "User ni group lo add cheyadaniki"
      },
      {
        command: "sudo passwd -l <user>",
        level: "Advanced",
        english: "Lock a user password",
        telugu: "User password lock cheyadaniki"
      },
      {
        command: "getent hosts localhost",
        level: "Basic",
        english: "Check localhost name resolution",
        telugu: "Localhost name resolution chudataniki"
      },
      {
        command: "tar -czf archive.tar.gz <directory>",
        level: "Basic",
        english: "Create a gzip-compressed tar archive",
        telugu: "Directory ni compress cheyadaniki"
      },
      {
        command: "tar -tzf archive.tar.gz",
        level: "Basic",
        english: "List archive contents",
        telugu: "Archive contents chudataniki"
      },
      {
        command: "tar -xzf archive.tar.gz",
        level: "Basic",
        english: "Extract a gzip-compressed tar archive",
        telugu: "Archive extract cheyadaniki"
      },
      {
        command: "gzip -k <file>",
        level: "Basic",
        english: "Compress a file and keep the original",
        telugu: "Original file unchi compress cheyadaniki"
      },
      {
        command: "xz -T0 <file>",
        level: "Advanced",
        english: "Compress using available CPU threads",
        telugu: "CPU threads use chesi compress cheyadaniki"
      },
      {
        command: "zip -r archive.zip <directory>",
        level: "Basic",
        english: "Create a ZIP archive",
        telugu: "ZIP archive create cheyadaniki"
      },
      {
        command: "unzip -l archive.zip",
        level: "Basic",
        english: "List ZIP archive contents",
        telugu: "ZIP contents chudataniki"
      },
      {
        command: "rsync -avh <source>/ <destination>/",
        level: "Intermediate",
        english: "Synchronize directory contents",
        telugu: "Directories sync cheyadaniki"
      },
      {
        command: "rsync -av --dry-run <source>/ <destination>/",
        level: "Advanced",
        english: "Preview an rsync operation",
        telugu: "Sync mundu changes preview cheyadaniki"
      },
      {
        command: "scp <file> <user>@<host>:/tmp/",
        level: "Intermediate",
        english: "Copy a file to a remote host",
        telugu: "Remote server ki file copy cheyadaniki"
      },
      {
        command: "sftp <user>@<host>",
        level: "Intermediate",
        english: "Start an interactive SFTP session",
        telugu: "Secure file transfer session start cheyadaniki"
      },
      {
        command: "sha256sum <file>",
        level: "Basic",
        english: "Calculate a SHA-256 checksum",
        telugu: "File checksum verify cheyadaniki"
      },
      {
        command: "sha256sum -c checksums.txt",
        level: "Intermediate",
        english: "Verify checksums from a file",
        telugu: "Checksum file verify cheyadaniki"
      },
      {
        command: "md5sum <file>",
        level: "Basic",
        english: "Calculate an MD5 digest",
        telugu: "MD5 digest calculate cheyadaniki"
      },
      {
        command: "diff -u <old-file> <new-file>",
        level: "Basic",
        english: "Compare two text files",
        telugu: "Rendu files differences chudataniki"
      },
      {
        command: "cmp <file1> <file2>",
        level: "Intermediate",
        english: "Compare files byte by byte",
        telugu: "Files byte-level compare cheyadaniki"
      },
      {
        command: "sort <file>",
        level: "Basic",
        english: "Sort lines in a file",
        telugu: "File lines sort cheyadaniki"
      },
      {
        command: "sort <file> | uniq -c",
        level: "Intermediate",
        english: "Count repeated adjacent sorted lines",
        telugu: "Repeated lines count cheyadaniki"
      },
      {
        command: "grep -Rni 'error' /var/log",
        level: "Intermediate",
        english: "Search logs for error text",
        telugu: "Logs lo errors vetakadaniki"
      },
      {
        command: "grep -E 'WARN|ERROR' <file>",
        level: "Basic",
        english: "Match warning or error lines",
        telugu: "Warning/error lines filter cheyadaniki"
      },
      {
        command: "awk '{print $1}' <file>",
        level: "Intermediate",
        english: "Print the first whitespace-delimited field",
        telugu: "First field print cheyadaniki"
      },
      {
        command: "sed -n '1,20p' <file>",
        level: "Basic",
        english: "Print the first 20 lines",
        telugu: "First 20 lines chudataniki"
      },
      {
        command: "cut -d: -f1 /etc/passwd",
        level: "Intermediate",
        english: "Extract usernames from passwd file",
        telugu: "Usernames extract cheyadaniki"
      },
      {
        command: "wc -l <file>",
        level: "Basic",
        english: "Count lines in a file",
        telugu: "File lines count cheyadaniki"
      },
      {
        command: "head -n 20 <file>",
        level: "Basic",
        english: "Show the first 20 lines",
        telugu: "First 20 lines chudataniki"
      },
      {
        command: "tail -n 50 <file>",
        level: "Basic",
        english: "Show the last 50 lines",
        telugu: "Last 50 lines chudataniki"
      },
      {
        command: "tail -F /var/log/syslog",
        level: "Troubleshooting",
        english: "Follow a log file as it changes",
        telugu: "Log live-ga monitor cheyadaniki"
      },
      {
        command: "watch -n 2 df -h",
        level: "Intermediate",
        english: "Refresh disk usage every two seconds",
        telugu: "Disk usage periodic-ga chudataniki"
      },
      {
        command: "env",
        level: "Basic",
        english: "Print environment variables",
        telugu: "Environment variables chudataniki"
      },
      {
        command: "printenv PATH",
        level: "Basic",
        english: "Display the PATH variable",
        telugu: "PATH value chudataniki"
      },
      {
        command: "export APP_ENV=production",
        level: "Basic",
        english: "Set an environment variable for child processes",
        telugu: "Environment variable set cheyadaniki"
      },
      {
        command: "ulimit -a",
        level: "Advanced",
        english: "Show resource limits",
        telugu: "Process resource limits chudataniki"
      },
      {
        command: "sysctl -a 2>/dev/null | head",
        level: "Advanced",
        english: "Preview kernel parameters",
        telugu: "Kernel parameters chudataniki"
      },
      {
        command: "sysctl net.ipv4.ip_forward",
        level: "Advanced",
        english: "Read IPv4 forwarding setting",
        telugu: "IP forwarding setting chudataniki"
      },
      {
        command: "cat /proc/cpuinfo",
        level: "Intermediate",
        english: "Read CPU information",
        telugu: "CPU details chudataniki"
      },
      {
        command: "lscpu",
        level: "Basic",
        english: "Summarize CPU architecture",
        telugu: "CPU architecture chudataniki"
      },
      {
        command: "lsmem",
        level: "Advanced",
        english: "List memory ranges",
        telugu: "Memory ranges chudataniki"
      },
      {
        command: "lspci",
        level: "Intermediate",
        english: "List PCI devices",
        telugu: "PCI devices chudataniki"
      },
      {
        command: "lsusb",
        level: "Basic",
        english: "List USB devices",
        telugu: "USB devices chudataniki"
      },
      {
        command: "sensors",
        level: "Intermediate",
        english: "Read hardware sensor values",
        telugu: "Hardware temperature sensors chudataniki"
      },
      {
        command: "smartctl -H /dev/sda",
        level: "Troubleshooting",
        english: "Check disk SMART health",
        telugu: "Disk health check cheyadaniki"
      },
      {
        command: "sudo fsck -N /dev/<device>",
        level: "Advanced",
        english: "Preview filesystem check command",
        telugu: "Filesystem check command preview cheyadaniki"
      },
      {
        command: "mountpoint -q /mnt/data",
        level: "Basic",
        english: "Check whether a path is a mount point",
        telugu: "Mount point undho check cheyadaniki"
      },
      {
        command: "fuser -v <file>",
        level: "Advanced",
        english: "Show processes using a file",
        telugu: "File vadutunna processes chudataniki"
      },
      {
        command: "lsof <file>",
        level: "Advanced",
        english: "List open handles for a file",
        telugu: "File open chesina processes chudataniki"
      },
      {
        command: "flock -n /tmp/job.lock true",
        level: "Advanced",
        english: "Test non-blocking file lock acquisition",
        telugu: "File lock availability test cheyadaniki"
      },
      {
        command: "crontab -l",
        level: "Basic",
        english: "List current user's scheduled jobs",
        telugu: "Cron jobs chudataniki"
      },
      {
        command: "systemctl list-timers",
        level: "Intermediate",
        english: "List systemd timers",
        telugu: "Scheduled systemd timers chudataniki"
      },
      {
        command: "atq",
        level: "Intermediate",
        english: "List pending one-time jobs",
        telugu: "Pending at jobs chudataniki"
      },
      {
        command: "logger -t devops-test 'test message'",
        level: "Basic",
        english: "Write a message to the system log",
        telugu: "System log ki test message rayadaniki"
      },
      {
        command: "logger -p user.warning 'check service'",
        level: "Intermediate",
        english: "Write a warning-level log entry",
        telugu: "Warning log entry create cheyadaniki"
      },
      {
        command: "last -n 10",
        level: "Intermediate",
        english: "Show recent login sessions",
        telugu: "Recent login sessions chudataniki"
      },
      {
        command: "lastlog",
        level: "Intermediate",
        english: "Show last login information",
        telugu: "Last login details chudataniki"
      },
      {
        command: "who",
        level: "Basic",
        english: "Show logged-in users",
        telugu: "Logged-in users chudataniki"
      },
      {
        command: "w",
        level: "Basic",
        english: "Show logged-in users and their activity",
        telugu: "User activity chudataniki"
      },
      {
        command: "tty",
        level: "Basic",
        english: "Print the current terminal device",
        telugu: "Current terminal device chudataniki"
      },
      {
        command: "stty -a",
        level: "Advanced",
        english: "Display terminal settings",
        telugu: "Terminal settings chudataniki"
      },
      {
        command: "printf 'Linux\n'",
        level: "Basic",
        english: "Print formatted text",
        telugu: "Formatted text print cheyadaniki"
      },
      {
        command: "seq 1 10",
        level: "Basic",
        english: "Generate a sequence of numbers",
        telugu: "Number sequence generate cheyadaniki"
      },
      {
        command: "xargs -n1 echo < list.txt",
        level: "Intermediate",
        english: "Run a command for each input item",
        telugu: "Input items meeda command run cheyadaniki"
      },
      {
        command: "parallel echo ::: one two three",
        level: "Advanced",
        english: "Run independent tasks in parallel with GNU Parallel",
        telugu: "Tasks parallel-ga run cheyadaniki"
      },
      {
        command: "timeout 10s <command>",
        level: "Advanced",
        english: "Limit a command's runtime",
        telugu: "Command runtime limit cheyadaniki"
      },
      {
        command: "time <command>",
        level: "Basic",
        english: "Measure command execution time",
        telugu: "Command execution time measure cheyadaniki"
      },
      {
        command: "nohup <command> >job.log 2>&1 &",
        level: "Intermediate",
        english: "Run a command immune to hangup signals",
        telugu: "Session close ayina command run avvadaniki"
      },
      {
        command: "disown",
        level: "Advanced",
        english: "Remove a job from shell job control",
        telugu: "Shell job control nunchi job remove cheyadaniki"
      },
      {
        command: "jobs -l",
        level: "Basic",
        english: "List shell background jobs",
        telugu: "Background jobs chudataniki"
      },
      {
        command: "bg %1",
        level: "Intermediate",
        english: "Resume a stopped job in the background",
        telugu: "Stopped job background lo resume cheyadaniki"
      },
      {
        command: "fg %1",
        level: "Intermediate",
        english: "Bring a job to the foreground",
        telugu: "Job foreground ki teesukuravadaniki"
      },
      {
        command: "command -v python3",
        level: "Basic",
        english: "Find the command resolution for Python",
        telugu: "Python command path chudataniki"
      },
      {
        command: "ldd /bin/ls",
        level: "Advanced",
        english: "Show shared library dependencies",
        telugu: "Binary library dependencies chudataniki"
      },
      {
        command: "strings <binary> | head",
        level: "Advanced",
        english: "Display printable strings in a binary",
        telugu: "Binary lo readable strings chudataniki"
      },
      {
        command: "readelf -h <binary>",
        level: "Advanced",
        english: "Inspect ELF binary header",
        telugu: "ELF binary header chudataniki"
      },
      {
        command: "objdump -d <binary> | head",
        level: "Advanced",
        english: "Preview disassembled machine code",
        telugu: "Binary disassembly preview cheyadaniki"
      },
      {
        command: "nm -D <binary>",
        level: "Advanced",
        english: "List dynamic symbols",
        telugu: "Dynamic symbols chudataniki"
      },
      {
        command: "strace -c <command>",
        level: "Advanced",
        english: "Summarize system calls made by a command",
        telugu: "System calls summary chudataniki"
      },
      {
        command: "strace -f -o trace.log <command>",
        level: "Troubleshooting",
        english: "Trace system calls into a log file",
        telugu: "System calls log cheyadaniki"
      },
      {
        command: "ltrace <command>",
        level: "Advanced",
        english: "Trace dynamic library calls",
        telugu: "Library calls trace cheyadaniki"
      },
      {
        command: "perf stat <command>",
        level: "Advanced",
        english: "Collect performance counter statistics",
        telugu: "Performance counters collect cheyadaniki"
      },
      {
        command: "sar -u 1 5",
        level: "Intermediate",
        english: "Sample CPU utilization",
        telugu: "CPU utilization observe cheyadaniki"
      },
      {
        command: "sar -r 1 5",
        level: "Intermediate",
        english: "Sample memory utilization",
        telugu: "Memory utilization observe cheyadaniki"
      },
      {
        command: "iostat -xz 1 3",
        level: "Advanced",
        english: "Inspect disk I/O statistics",
        telugu: "Disk I/O statistics chudataniki"
      },
      {
        command: "iotop -o",
        level: "Advanced",
        english: "Show processes performing disk I/O",
        telugu: "Disk I/O chestunna processes chudataniki"
      },
      {
        command: "pidstat 1 5",
        level: "Advanced",
        english: "Sample per-process resource usage",
        telugu: "Process-wise resource usage chudataniki"
      },
      {
        command: "mpstat -P ALL 1 3",
        level: "Advanced",
        english: "Show per-CPU statistics",
        telugu: "Prati CPU statistics chudataniki"
      },
      {
        command: "numastat",
        level: "Advanced",
        english: "Show NUMA memory statistics",
        telugu: "NUMA memory statistics chudataniki"
      },
      {
        command: "taskset -pc <PID>",
        level: "Advanced",
        english: "Display CPU affinity for a process",
        telugu: "Process CPU affinity chudataniki"
      },
      {
        command: "chrt -p <PID>",
        level: "Advanced",
        english: "Display scheduling policy for a process",
        telugu: "Process scheduling policy chudataniki"
      },
      {
        command: "lsns",
        level: "Advanced",
        english: "List namespaces",
        telugu: "Linux namespaces chudataniki"
      },
      {
        command: "unshare --mount true",
        level: "Advanced",
        english: "Run a command in a new mount namespace",
        telugu: "New mount namespace lo command run cheyadaniki"
      },
      {
        command: "nsenter -t <PID> -m -- mount",
        level: "Advanced",
        english: "Inspect mounts in another process namespace",
        telugu: "Vere process namespace mounts chudataniki"
      },
      {
        command: "findmnt --verify",
        level: "Troubleshooting",
        english: "Verify mount table configuration",
        telugu: "Mount configuration verify cheyadaniki"
      },
      {
        command: "namei -l <path>",
        level: "Troubleshooting",
        english: "Show permissions along a path",
        telugu: "Path lo prati level permissions chudataniki"
      },
      {
        command: "getent ahosts example.com",
        level: "Intermediate",
        english: "Resolve host addresses using system databases",
        telugu: "Host addresses resolve cheyadaniki"
      },
      {
        command: "ip -s link",
        level: "Intermediate",
        english: "Show network interface counters",
        telugu: "Network interface counters chudataniki"
      },
      {
        command: "ethtool <interface>",
        level: "Advanced",
        english: "Inspect network interface settings",
        telugu: "Network interface settings chudataniki"
      },
      {
        command: "nmcli device status",
        level: "Intermediate",
        english: "Show NetworkManager device status",
        telugu: "NetworkManager devices chudataniki"
      },
      {
        command: "tcpdump -i any -c 20",
        level: "Advanced",
        english: "Capture a small sample of network packets",
        telugu: "Konni network packets capture cheyadaniki"
      },
      {
        command: "openssl s_client -connect example.com:443 -servername example.com",
        level: "Advanced",
        english: "Inspect a TLS connection",
        telugu: "TLS connection inspect cheyadaniki"
      },
      {
        command: "openssl x509 -in cert.pem -noout -dates",
        level: "Troubleshooting",
        english: "Show certificate validity dates",
        telugu: "Certificate expiry dates chudataniki"
      },
      {
        command: "ssh -v <user>@<host>",
        level: "Troubleshooting",
        english: "Debug SSH connection setup",
        telugu: "SSH connection debug cheyadaniki"
      },
      {
        command: "ssh-keygen -lf ~/.ssh/id_ed25519.pub",
        level: "Intermediate",
        english: "Show an SSH public-key fingerprint",
        telugu: "SSH key fingerprint chudataniki"
      },
      {
        command: "ssh-add -l",
        level: "Intermediate",
        english: "List keys loaded in the SSH agent",
        telugu: "SSH agent keys chudataniki"
      },
      {
        command: "sudo visudo -c",
        level: "Troubleshooting",
        english: "Validate sudoers syntax",
        telugu: "Sudoers syntax validate cheyadaniki"
      },
      {
        command: "sudo -l",
        level: "Intermediate",
        english: "List commands allowed through sudo",
        telugu: "Sudo permissions chudataniki"
      },
      {
        command: "getenforce",
        level: "Advanced",
        english: "Check SELinux enforcement mode",
        telugu: "SELinux mode chudataniki"
      },
      {
        command: "sestatus",
        level: "Advanced",
        english: "Show SELinux status",
        telugu: "SELinux status chudataniki"
      },
      {
        command: "aa-status",
        level: "Advanced",
        english: "Show AppArmor status",
        telugu: "AppArmor status chudataniki"
      },
      {
        command: "restorecon -nRv <path>",
        level: "Advanced",
        english: "Preview SELinux context corrections",
        telugu: "SELinux context changes preview cheyadaniki"
      },
      {
        command: "journalctl --disk-usage",
        level: "Intermediate",
        english: "Show journal disk usage",
        telugu: "Journal logs disk usage chudataniki"
      },
      {
        command: "sudo journalctl --vacuum-time=7d",
        level: "Troubleshooting",
        english: "Remove journal entries older than seven days",
        telugu: "7 days kanna paatha journal logs clean cheyadaniki"
      },
      {
        command: "coredumpctl list",
        level: "Advanced",
        english: "List recorded core dumps",
        telugu: "Core dumps chudataniki"
      },
      {
        command: "coredumpctl info <PID>",
        level: "Advanced",
        english: "Inspect a recorded core dump",
        telugu: "Core dump details chudataniki"
      },
      {
        command: "systemd-analyze blame",
        level: "Troubleshooting",
        english: "Show slow system startup units",
        telugu: "Boot slow services chudataniki"
      },
      {
        command: "systemd-analyze critical-chain",
        level: "Advanced",
        english: "Show critical startup dependency chain",
        telugu: "Boot critical chain chudataniki"
      },
      {
        command: "systemd-analyze verify <unit-file>",
        level: "Troubleshooting",
        english: "Verify a systemd unit file",
        telugu: "Systemd unit file validate cheyadaniki"
      },
      {
        command: "loginctl list-sessions",
        level: "Intermediate",
        english: "List login sessions",
        telugu: "Login sessions chudataniki"
      },
      {
        command: "loginctl session-status <session>",
        level: "Intermediate",
        english: "Show a login session's status",
        telugu: "Login session status chudataniki"
      },
      {
        command: "ulimit -n",
        level: "Intermediate",
        english: "Show the open-file descriptor limit",
        telugu: "Open files limit chudataniki"
      },
      {
        command: "prlimit --pid <PID>",
        level: "Advanced",
        english: "Show resource limits for a process",
        telugu: "Process resource limits chudataniki"
      },
      {
        command: "getconf PAGE_SIZE",
        level: "Advanced",
        english: "Show the system memory page size",
        telugu: "Memory page size chudataniki"
      },
      {
        command: "getconf LONG_BIT",
        level: "Basic",
        english: "Show the user-space word size",
        telugu: "32-bit/64-bit word size chudataniki"
      },
      {
        command: "locale",
        level: "Basic",
        english: "Show locale settings",
        telugu: "Locale settings chudataniki"
      },
      {
        command: "localectl status",
        level: "Intermediate",
        english: "Show system locale and keyboard settings",
        telugu: "System locale, keyboard settings chudataniki"
      },
      {
        command: "iconv -f UTF-8 -t ASCII//TRANSLIT <file>",
        level: "Advanced",
        english: "Convert text character encoding",
        telugu: "Text encoding convert cheyadaniki"
      },
      {
        command: "dos2unix <file>",
        level: "Basic",
        english: "Convert Windows line endings to Unix",
        telugu: "Windows line endings convert cheyadaniki"
      },
      {
        command: "unix2dos <file>",
        level: "Basic",
        english: "Convert Unix line endings to Windows",
        telugu: "Unix line endings convert cheyadaniki"
      },
      {
        command: "split -l 1000 <file> part-",
        level: "Intermediate",
        english: "Split a file into 1000-line chunks",
        telugu: "File ni 1000 lines chunks ga split cheyadaniki"
      },
      {
        command: "join <file1> <file2>",
        level: "Advanced",
        english: "Join sorted files on a common field",
        telugu: "Common field tho files join cheyadaniki"
      },
    ],
  };
