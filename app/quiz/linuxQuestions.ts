export const linuxQuestions = [
  {
    question: 'Which command is used to check disk space usage in Linux?',
    options: ['ls', 'df -h', 'ps aux', 'top'],
    answer: 1
  },
  {
    question: 'Which permission code represents read, write, and execute for owner only (700)?',
    options: ['chmod 700', 'chmod 755', 'chmod 644', 'chmod 777'],
    answer: 0
  },
  {
    question: 'What command displays the current working directory path?',
    options: ['pwd', 'dir', 'path', 'cwd'],
    answer: 0
  },
  {
    question: 'How do you list all files including hidden files in a directory?',
    options: ['ls -la', 'ls -h', 'ls -hidden', 'listall'],
    answer: 0
  },
  {
    question: 'Which command creates a new empty file or updates its timestamp?',
    options: ['touch', 'create', 'new', 'make'],
    answer: 0
  },
  {
    question: 'How do you remove a non-empty directory recursively in Linux?',
    options: ['rm -rf', 'rmdir', 'delete -r', 'clear -all'],
    answer: 0
  },
  {
    question: 'Which command displays the manual page of any command?',
    options: ['man', 'help', 'info', 'doc'],
    answer: 0
  },
  {
    question: 'What command shows active network connections and listening ports?',
    options: ['netstat -tulnp', 'ip show', 'port status', 'network-list'],
    answer: 0
  },
  {
    question: 'How do you switch to the superuser (root) account?',
    options: ['sudo -i / su', 'root login', 'admin mode', 'su root -f'],
    answer: 0
  },
  {
    question: 'Which command finds the location of a binary executable file?',
    options: ['which', 'find', 'locate', 'search'],
    answer: 0
  },
  {
    question: 'How do you change the group ownership of a file?',
    options: ['chgrp', 'chown', 'chmod', 'groupmod'],
    answer: 0
  },
  {
    question: 'What command shows system uptime and load averages?',
    options: ['uptime', 'time', 'load', 'status'],
    answer: 0
  },
  {
    question: 'Which utility compresses files using the gzip algorithm?',
    options: ['gzip', 'zip', 'compress', 'tar -c'],
    answer: 0
  },
  {
    question: 'How do you extract a .tar.gz archive file?',
    options: ['tar -xzvf', 'tar -cvzf', 'unzip', 'extract'],
    answer: 0
  },
  {
    question: 'Which command searches for a specific string inside files recursively?',
    options: ['grep -r', 'find text', 'search', 'locate str'],
    answer: 0
  },
  {
    question: 'What environment variable stores system PATH directories?',
    options: ['PATH', 'SYSTEM_PATH', 'BIN_PATH', 'ENV_PATH'],
    answer: 0
  },
  {
    question: 'How do you check the running Linux kernel version?',
    options: ['uname -r', 'kernel version', 'cat /proc/version', 'sysinfo'],
    answer: 0
  },
  {
    question: 'Which command monitors real-time system resource usage interactively?',
    options: ['top / htop', 'ps aux', 'vmstat', 'sysstat'],
    answer: 0
  },
  {
    question: 'How do you change a user password in Linux?',
    options: ['passwd', 'chpasswd', 'password change', 'setpass'],
    answer: 0
  },
  {
    question: 'What command mounts a filesystem device to a target directory?',
    options: ['mount', 'attach', 'connect', 'link'],
    answer: 0
  },
  {
    question: 'How do you unmount a mounted filesystem?',
    options: ['umount', 'dismount', 'detach', 'disconnect'],
    answer: 0
  },
  {
    question: 'Which file contains system DNS name server IP addresses?',
    options: ['/etc/resolv.conf', '/etc/hosts', '/etc/dns.conf', '/etc/network'],
    answer: 0
  },
  {
    question: 'What command displays routing table entries in Linux?',
    options: ['route -n / ip route', 'netstat -r', 'router list', 'gateway show'],
    answer: 0
  },
  {
    question: 'How do you copy files or directories securely across network hosts?',
    options: ['scp', 'cp -net', 'ftp', 'rsync secure'],
    answer: 0
  },
  {
    question: 'Which command synchronizes files efficiently between local and remote directories?',
    options: ['rsync', 'scp', 'sync', 'cp --mirror'],
    answer: 0
  },
  {
    question: 'What command terminates a process gracefully using default SIGTERM signal?',
    options: ['kill <pid>', 'kill -9', 'stop', 'terminate'],
    answer: 0
  },
  {
    question: 'Which command forces termination of an unresponsive process immediately?',
    options: ['kill -9 <pid>', 'terminate!', 'stop -f', 'halt'],
    answer: 0
  },
  {
    question: 'How do you display block devices and their partition layouts?',
    options: ['lsblk', 'fdisk -l', 'blkid', 'df -b'],
    answer: 0
  },
  {
    question: 'What command creates a new user account in Linux?',
    options: ['useradd / adduser', 'newuser', 'createuser', 'accountadd'],
    answer: 0
  },
  {
    question: 'How do you delete an existing user account and home directory?',
    options: ['userdel -r', 'removeuser', 'deluser --all', 'dropuser'],
    answer: 0
  },
  {
    question: 'Which text editor is commonly installed by default in minimal Linux distributions?',
    options: ['nano / vi', 'notepad', 'gedit', 'vscode'],
    answer: 0
  },
  {
    question: 'How do you print the last 20 lines of a log file?',
    options: ['tail -n 20', 'head -n 20', 'last 20', 'cat tail 20'],
    answer: 0
  },
  {
    question: 'What command prints the first 10 lines of a file?',
    options: ['head', 'tail', 'first', 'top10'],
    answer: 0
  },
  {
    question: 'How do you count lines, words, and characters in a file?',
    options: ['wc', 'count', 'stat', 'len'],
    answer: 0
  },
  {
    question: 'Which command sorts lines of text files alphabetically or numerically?',
    options: ['sort', 'order', 'arrange', 'sorted'],
    answer: 0
  },
  {
    question: 'How do you remove duplicate adjacent lines from a sorted file?',
    options: ['uniq', 'distinct', 'nodup', 'unique'],
    answer: 0
  },
  {
    question: 'What command translates or deletes characters from standard input?',
    options: ['tr', 'translate', 'convert', 'replace'],
    answer: 0
  },
  {
    question: 'How do you display specific columns or fields from text files?',
    options: ['awk / cut', 'col', 'select', 'extract'],
    answer: 0
  },
  {
    question: 'Which command streams and processes text file streams pattern-based?',
    options: ['sed', 'stream', 'process', 'text-edit'],
    answer: 0
  },
  {
    question: 'What command creates symbolic links between files?',
    options: ['ln -s', 'link', 'symlink', 'shortcut'],
    answer: 0
  },
  {
    question: 'How do you check available shell history commands?',
    options: ['history', 'sh-history', 'commands', 'log shell'],
    answer: 0
  },
  {
    question: 'Which command displays current logged-in users?',
    options: ['who / w', 'users', 'active', 'logged'],
    answer: 0
  },
  {
    question: 'What command shows execution path of command interpreters?',
    options: ['which / type', 'whereis', 'pathof', 'locate bin'],
    answer: 0
  },
  {
    question: 'How do you check system architecture type (e.g., x86_64)?',
    options: ['arch / uname -m', 'sys arch', 'cpuinfo', 'machine'],
    answer: 0
  },
  {
    question: 'What command displays CPU hardware details in Linux?',
    options: ['lscpu', 'cpuinfo', 'processor', 'hwinfo cpu'],
    answer: 0
  },
  {
    question: 'How do you check RAM hardware specifications and slots?',
    options: ['lshw -C memory / free', 'meminfo', 'ramcheck', 'hardware mem'],
    answer: 0
  },
  {
    question: 'Which file system check command repairs corrupted partitions?',
    options: ['fsck', 'repair fs', 'chkdisk', 'fixfs'],
    answer: 0
  },
  {
    question: 'What command creates a new swap file space?',
    options: ['mkswap', 'swapon', 'createswap', 'swapinit'],
    answer: 0
  },
  {
    question: 'How do you activate a swap partition or file for use?',
    options: ['swapon', 'swapactive', 'mount swap', 'enable swap'],
    answer: 0
  },
  {
    question: 'Which command manages systemd services in modern Linux distributions?',
    options: ['systemctl', 'service', 'initctl', 'manage-sys'],
    answer: 0
  },
  {
    question: 'How do you enable a service to start automatically at boot time?',
    options: ['systemctl enable <service>', 'systemctl start <service>', 'chkconfig on', 'boot enable'],
    answer: 0
  },
  {
    question: 'How do you check the status of a specific systemd service?',
    options: ['systemctl status <service>', 'service check', 'system status', 'status service'],
    answer: 0
  },
  {
    question: 'What command reloads systemd manager configuration without rebooting?',
    options: ['systemctl daemon-reload', 'systemctl reload', 'init reload', 'daemon refresh'],
    answer: 0
  },
  {
    question: 'Where are system-wide configuration files typically stored in Linux directory hierarchy?',
    options: ['/etc', '/var', '/usr', '/bin'],
    answer: 0
  },
  {
    question: 'Where are variable data files like logs and spool files stored?',
    options: ['/var', '/etc', '/opt', '/tmp'],
    answer: 0
  },
  {
    question: 'Which directory contains essential binary executables for all users?',
    options: ['/bin', '/sbin', '/etc', '/boot'],
    answer: 0
  },
  {
    question: 'Which directory contains system binaries reserved for root administration?',
    options: ['/sbin', '/bin', '/home', '/usr/bin'],
    answer: 0
  },
  {
    question: 'What command changes file permission modes numerically or symbolically?',
    options: ['chmod', 'chown', 'chgrp', 'modperm'],
    answer: 0
  },
  {
    question: 'What special permission sets the effective user ID to the file owner during execution (SetUID)?',
    options: ['chmod u+s (4000)', 'chmod 777', 'sticky bit', 'exec flag'],
    answer: 0
  },
  {
    question: 'What permission flag prevents users from deleting files they don\'t own inside shared directories like /tmp (Sticky Bit)?',
    options: ['chmod +t (1000)', 'chmod 777', 'setgid', 'lock bit'],
    answer: 0
  },
  {
    question: 'How do you find all files modified in the last 2 days using find command?',
    options: ['find / -mtime -2', 'find modified 2', 'search days 2', 'locate -m 2'],
    answer: 0
  },
  {
    question: 'What command displays disk partition table structures in Linux?',
    options: ['fdisk -l / parted', 'lsblk -t', 'diskinfo', 'partition show'],
    answer: 0
  },
  {
    question: 'How do you create a compressed tar archive of a directory?',
    options: ['tar -czvf archive.tar.gz directory/', 'zip archive', 'compress dir', 'gzip pack'],
    answer: 0
  },
  {
    question: 'Which command tests network latency and packet loss using ICMP echo requests?',
    options: ['ping', 'traceroute', 'netstat', 'nslookup'],
    answer: 0
  },
  {
    question: 'What command traces the network packet route hops to a destination host?',
    options: ['traceroute / tracepath', 'ping -r', 'route trace', 'pathping'],
    answer: 0
  },
  {
    question: 'Which command queries DNS name servers for domain name resolution records?',
    options: ['nslookup / dig', 'dnsquery', 'host lookup', 'resolver'],
    answer: 0
  },
  {
    question: 'How do you display network interface IP addresses and configurations?',
    options: ['ip addr / ifconfig', 'netstat -i', 'network show', 'ifstatus'],
    answer: 0
  },
  {
    question: 'What command adds a static IP address route to the routing table?',
    options: ['ip route add', 'route create', 'netstat add', 'gateway new'],
    answer: 0
  },
  {
    question: 'Which configuration file defines static hostname settings in modern Linux?',
    options: ['/etc/hostname', '/etc/hosts', '/etc/network/interfaces', '/etc/sysconfig'],
    answer: 0
  },
  {
    question: 'How do you change the system hostname dynamically without rebooting?',
    options: ['hostnamectl set-hostname <name>', 'hostname <name>', 'sys hostname', 'set host'],
    answer: 0
  },
  {
    question: 'What file maps IP addresses to hostnames locally for name resolution?',
    options: ['/etc/hosts', '/etc/resolv.conf', '/etc/networks', '/etc/dns'],
    answer: 0
  },
  {
    question: 'Which command compresses files using the high-compression bzip2 algorithm?',
    options: ['bzip2', 'gzip', 'zip', 'compress'],
    answer: 0
  },
  {
    question: 'How do you extract a .tar.bz2 archive file?',
    options: ['tar -xjvf', 'tar -xzvf', 'unzip bz2', 'extract bzip'],
    answer: 0
  },
  {
    question: 'What command generates cryptographic checksum hashes (e.g., MD5/SHA256) for files?',
    options: ['sha256sum / md5sum', 'hashcheck', 'checksum', 'crypt verify'],
    answer: 0
  },
  {
    question: 'How do you schedule a one-time command execution at a specified future time?',
    options: ['at', 'cron', 'crontab', 'schedule'],
    answer: 0
  },
  {
    question: 'Which command edits or manages recurring cron jobs for a user?',
    options: ['crontab -e', 'cron edit', 'schedule -u', 'cronjob'],
    answer: 0
  },
  {
    question: 'What are the five time fields in a crontab schedule entry representing?',
    options: ['Minute, Hour, Day of Month, Month, Day of Week', 'Second, Minute, Hour, Day, Year', 'Hour, Minute, Month, Day, Week', 'Year, Month, Day, Hour, Minute'],
    answer: 0
  },
  {
    question: 'Where are system-wide cron jobs and scheduled task files located?',
    options: ['/etc/crontab and /etc/cron.d/', '/var/spool/cron', '/tmp/cron', '/usr/cron'],
    answer: 0
  },
  {
    question: 'Which command displays disk inode usage statistics for mounted filesystems?',
    options: ['df -i', 'df -h', 'du -i', 'inode show'],
    answer: 0
  },
  {
    question: 'How do you check the disk space consumed by a specific directory folder?',
    options: ['du -sh <directory>', 'df -sh', 'size <dir>', 'dirusage'],
    answer: 0
  },
  {
    question: 'What command displays environment variables currently set in the shell session?',
    options: ['printenv / env', 'showenv', 'vars', 'echo path'],
    answer: 0
  },
  {
    question: 'How do you set a temporary environment variable in Bash?',
    options: ['export VAR_NAME=value', 'set VAR=value', 'VAR=value', 'env VAR=value'],
    answer: 0
  },
  {
    question: 'Which shell configuration file is executed upon starting an interactive login shell in Bash?',
    options: ['~/.bash_profile / ~/.bashrc', '/etc/profile.conf', '~/.shell', '/bin/bash.conf'],
    answer: 0
  },
  {
    question: 'What command evaluates mathematical expressions or conditional tests in scripts?',
    options: ['expr / test / [[ ]]', 'calc', 'math', 'evaluate'],
    answer: 0
  },
  {
    question: 'How do you redirect both standard output and standard error to a log file in Bash?',
    options: ['> file.log 2>&1', '>> file.log', 'redirect all', 'out & err'],
    answer: 0
  },
  {
    question: 'What symbol is used to pipe standard output of one command into standard input of another?',
    options: ['|', '>', '<', '&'],
    answer: 0
  },
  {
    question: 'How do you run a command in the background detached from the terminal session?',
    options: ['command &', 'bg run', 'detach command', 'nohup &'],
    answer: 0
  },
  {
    question: 'What command keeps a background process running even after closing the terminal?',
    options: ['nohup', 'keepalive', 'persist', 'detach'],
    answer: 0
  },
  {
    question: 'How do you list jobs running in the background of the current shell session?',
    options: ['jobs', 'list bg', 'ps jobs', 'active jobs'],
    answer: 0
  },
  {
    question: 'What command brings a background job back to the foreground?',
    options: ['fg', 'bring', 'foreground', 'resume'],
    answer: 0
  },
  {
    question: 'Which system log file stores authentication attempts, sudo logs, and login events?',
    options: ['/var/log/auth.log or /var/log/secure', '/var/log/syslog', '/var/log/messages', '/var/log/access'],
    answer: 0
  },
  {
    question: 'What tool queries and displays systemd journal logs collected across services?',
    options: ['journalctl', 'syslog view', 'logread', 'dmesg log'],
    answer: 0
  },
  {
    question: 'Which command prints kernel ring buffer messages during system boot?',
    options: ['dmesg', 'kernel-log', 'bootlog', 'sysbuf'],
    answer: 0
  },
  {
    question: 'How do you check open files and network sockets associated with processes?',
    options: ['lsof', 'netstat', 'ps open', 'filelist'],
    answer: 0
  },
  {
    question: 'What command displays shared library dependencies of an executable binary?',
    options: ['ldd', 'libs', 'depend', 'shlibs'],
    answer: 0
  },
  {
    question: 'How do you install software packages on Debian/Ubuntu systems using APT?',
    options: ['apt install <package>', 'yum install', 'pacman -S', 'rpm -i'],
    answer: 0
  },
  {
    question: 'How do you install software packages on RHEL/CentOS/Rocky Linux using DNF/YUM?',
    options: ['yum / dnf install <package>', 'apt-get install', 'pacman install', 'install pkg'],
    answer: 0
  },
  {
    question: 'What command updates all installed packages on a Debian/Ubuntu system?',
    options: ['apt update && apt upgrade', 'apt refresh', 'update all', 'upgrade system'],
    answer: 0
  },
  {
    question: 'How do you search for available packages in APT repository database?',
    options: ['apt search <keyword>', 'apt find', 'query pkg', 'search package'],
    answer: 0
  },
  {
    question: 'Which command removes a package along with its configuration files on Ubuntu?',
    options: ['apt purge <package>', 'apt remove', 'apt delete', 'uninstall -f'],
    answer: 0
  }
];
