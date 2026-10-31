
export type Problem = {
  issue: string;
  solution: string;
};

export type NoteSection = {
  heading: string;
  explanation: string;
  steps: string[];
  commands?: string;
  config?: string;
  problems: Problem[];
};

export type NoteData = {
  title: string;
  description: string;
  sections: NoteSection[];
};

const linuxTroubleshootingNotes: NoteData = {
  title: "Linux Troubleshooting – Complete DevOps Production Guide",

  description:
    "Complete practical Linux troubleshooting guide for DevOps engineers. Learn how Linux servers work, how real production issues occur, how to investigate system failures, understand logs, identify root causes, recover services, and prevent repeated incidents. Includes beginner-friendly explanations, real-world scenarios, diagnostic commands, configuration examples, and step-by-step solutions.",

  sections: [
    {
      heading: "1. Understanding Linux Troubleshooting in Real DevOps Environments",

      explanation:
        "Linux troubleshooting means finding why a Linux server, application, process, network connection, filesystem, or system service is not working correctly. A DevOps engineer does not randomly execute commands. First, the engineer understands the problem, collects evidence, checks system health, investigates logs, identifies the root cause, applies a safe fix, and verifies that the service works again.\n\nLinux servers are commonly used for hosting web applications, databases, Kubernetes worker nodes, CI/CD agents, monitoring systems, and cloud infrastructure. When a production Linux server has a problem, many applications and customers may be affected.\n\nFor example, imagine an online shopping application running on an AWS EC2 Linux server. Customers report that the website is very slow. The DevOps engineer must investigate CPU usage, memory, disk space, running processes, application logs, network connections, and backend dependencies. The engineer should not immediately restart the server because restarting may temporarily hide the actual problem.\n\nThe normal troubleshooting process is: understand the symptom, identify the affected component, collect system information, inspect logs, compare the current condition with normal behavior, identify the root cause, apply the smallest safe correction, verify recovery, and document the incident.\n\nA good troubleshooting engineer understands both the command and the reason for executing that command.",

      steps: [
        "Understand the complaint. Example: website is slow, SSH is unavailable, application is down, or disk space is full.",
        "Identify which server, environment, application, and users are affected.",
        "Check whether the problem is temporary, continuous, or happening only after a recent deployment.",
        "Check basic system health before changing anything.",
        "Collect CPU, memory, disk, process, network, and service information.",
        "Inspect relevant application and system logs.",
        "Identify the exact root cause instead of guessing.",
        "Apply a safe fix with the correct permissions and change procedure.",
        "Verify application health and user-facing functionality.",
        "Monitor the server after recovery and document the incident."
      ],

      commands:
        "hostnamectl\nuptime\ndate\nwhoami\nid\nuname -a\ncat /etc/os-release\nuptime\nfree -h\ndf -h\nlsblk\nps aux --sort=-%cpu | head\nsystemctl --failed\njournalctl -p err -n 50",

      config:
        "# Example: Basic Linux server health-check sequence\n\n# 1. Identify the server\nhostnamectl\n\n# 2. Check operating system\ncat /etc/os-release\n\n# 3. Check uptime and load\nuptime\n\n# 4. Check memory\nfree -h\n\n# 5. Check disk usage\ndf -h\n\n# 6. Check failed services\nsystemctl --failed\n\n# 7. Check recent system errors\njournalctl -p err -n 50",

      problems: [
        {
          issue:
            "An engineer immediately restarts a production server without checking why the application stopped.",

          solution:
            "First collect system information, inspect application and system logs, check failed services, and identify the root cause. Restart only when it is justified and safe. Capture important diagnostic information before restarting because some temporary evidence may disappear."
        },
        {
          issue:
            "The server is reachable, but the application is not responding.",

          solution:
            "Check the application process, listening ports, service status, application logs, reverse proxy, firewall, and backend dependencies. Server availability does not automatically mean application availability."
        }
      ]
    },

    {
      heading: "2. Linux Boot Failure and Server Startup Problems",

      explanation:
        "Linux booting is the process through which a computer starts the operating system and makes services available. Understanding the boot sequence helps DevOps engineers investigate servers that do not start correctly after maintenance, kernel updates, configuration changes, or unexpected shutdowns.\n\nA simplified Linux boot sequence is: BIOS or UEFI initializes hardware, the bootloader such as GRUB loads the Linux kernel, the kernel initializes hardware and mounts the initial filesystem, and the init system such as systemd starts the remaining services and reaches the configured target.\n\nIf any important stage fails, the server may not boot completely. For example, an incorrect GRUB configuration may prevent the kernel from loading. A filesystem problem may send the system into emergency mode. An incorrect /etc/fstab entry may cause boot delays or mount failures.\n\nReal production example: A DevOps engineer updates a Linux server and adds a new disk mount entry to /etc/fstab. The disk UUID is incorrect. During the next reboot, the system waits for the missing device and may enter emergency mode. The engineer needs console access through the cloud provider or hypervisor, inspect the boot error, correct the mount configuration, and reboot safely.\n\nCloud servers may require EC2 Serial Console, recovery mode, a rescue instance, or provider-specific console access when SSH is unavailable.",

      steps: [
        "Identify whether the server is completely unreachable or only SSH is unavailable.",
        "Check the cloud provider console, hypervisor console, or physical server display.",
        "Identify the failed boot stage: firmware, bootloader, kernel, filesystem, or systemd.",
        "Read the exact emergency-mode or boot error message.",
        "Check filesystem and mount configuration, especially /etc/fstab.",
        "Check failed systemd units when console access is available.",
        "Correct the identified configuration or filesystem issue.",
        "Validate the configuration before rebooting.",
        "Restart the server only after checking the recovery plan.",
        "Verify that the operating system and required application services start correctly."
      ],

      commands:
        "systemctl status\nsystemctl --failed\njournalctl -b\njournalctl -b -p err\njournalctl -b -1\nsystemctl list-units --type=target\nsystemctl get-default\ncat /etc/fstab\nfindmnt --verify\nlsblk -f\nblkid",

      config:
        "# Example: Incorrect /etc/fstab entry\n\nUUID=wrong-uuid /data ext4 defaults 0 2\n\n# Check actual disk UUID\nlsblk -f\nblkid\n\n# Example corrected entry using the actual UUID\nUUID=ACTUAL-DISK-UUID /data ext4 defaults,nofail 0 2\n\n# Validate mount configuration\nfindmnt --verify\n\n# Test mounting without rebooting\nmount -a\n\n# Confirm mount\nfindmnt /data\n\ndf -h /data\n\n# IMPORTANT:\n# Use nofail only when the application can safely operate\n# without this mount. Do not blindly apply it to critical data mounts.",

      problems: [
        {
          issue:
            "Linux server enters emergency mode after reboot.",

          solution:
            "Use console access to read the emergency-mode message. Check journalctl -xb, inspect /etc/fstab, compare UUID values with blkid and lsblk -f, and check filesystem health. Correct the invalid mount entry or repair the filesystem using the appropriate recovery procedure. Validate mounts before rebooting."
        },
        {
          issue:
            "Server does not complete boot after a kernel update.",

          solution:
            "Use the bootloader menu or recovery console to boot a previously working kernel if available. Inspect kernel and boot logs, check available disk space in /boot, verify initramfs and bootloader configuration, and apply the appropriate distribution-specific repair."
        },
        {
          issue:
            "SSH is unavailable after a successful server reboot.",

          solution:
            "Use cloud console access to check the network interface, IP configuration, sshd service, listening port, firewall rules, security groups, and authorized keys. A booted operating system can still have an SSH or network configuration problem."
        }
      ]
    },

    {
      heading: "3. SSH Connection Failures and Remote Server Access",

      explanation:
        "SSH stands for Secure Shell. It provides an encrypted connection between a client computer and a remote Linux server. DevOps engineers use SSH to manage cloud instances, deploy applications, inspect logs, execute commands, and troubleshoot production systems.\n\nFor example, an engineer connects from a laptop to an Ubuntu EC2 instance using an SSH private key. The client connects to the server IP and port 22. The server firewall and cloud security rules must allow the connection. The SSH service must be running, and the selected Linux user must have valid authentication permissions.\n\nSSH problems can happen at different stages. A timeout generally indicates a connectivity or filtering problem. Connection refused often means that the destination is reachable but no service is accepting connections on that port, or a firewall is actively rejecting it. Permission denied usually indicates an authentication or account permission problem.\n\nReal production scenario: A deployment pipeline cannot connect to a production EC2 instance after a security group change. The SSH private key is correct, but port 22 is no longer allowed from the deployment runner's IP. The engineer must investigate network access rather than regenerate keys unnecessarily.\n\nSSH private keys must be protected. Never paste private keys into tickets, Git repositories, screenshots, or public chat systems.",

      steps: [
        "Confirm the correct server IP address or DNS name.",
        "Check whether the server is running.",
        "Check the network route between the client and server.",
        "Check the cloud security group or network firewall for SSH access.",
        "Check whether the server is listening on the expected SSH port.",
        "Check the SSH daemon status using console access if remote SSH is unavailable.",
        "Verify the Linux username and correct private key.",
        "Check private-key permissions and authorized_keys configuration.",
        "Use verbose SSH output to identify the failure stage.",
        "Verify that login works and that the user has only the required privileges."
      ],

      commands:
        "# Connect to an Ubuntu server\nssh -i devops-key.pem ubuntu@SERVER_IP\n\n# Connect with verbose diagnostic information\nssh -vvv -i devops-key.pem ubuntu@SERVER_IP\n\n# Check SSH service on the server\nsudo systemctl status ssh\n\n# On distributions using sshd service name\nsudo systemctl status sshd\n\n# Check SSH listening port\nsudo ss -tlnp | grep ssh\n\n# Check server logs on Ubuntu/Debian\nsudo journalctl -u ssh -n 100\n\n# Check server logs on distributions using sshd\nsudo journalctl -u sshd -n 100\n\n# Check firewall\nsudo ufw status verbose\n\n# Check key permissions\nchmod 400 devops-key.pem\n\n# Test TCP connectivity\nnc -vz SERVER_IP 22",

      config:
        "# Example SSH server configuration\n# File: /etc/ssh/sshd_config\n\nPort 22\nPermitRootLogin no\nPubkeyAuthentication yes\nPasswordAuthentication no\n\n# Validate SSH configuration before reload\nsudo sshd -t\n\n# Reload SSH service after a valid configuration change\nsudo systemctl reload ssh\n\n# On distributions using sshd unit name\nsudo systemctl reload sshd\n\n# Check service status\nsudo systemctl status ssh\n\n# IMPORTANT:\n# Keep an existing working session open when changing SSH access.\n# Verify a second login before closing the original session.\n# Ensure alternative console access is available.",

      problems: [
        {
          issue:
            "ssh: connect to host SERVER_IP port 22: Connection timed out.",

          solution:
            "Check server state, routing, client network, cloud security group inbound rules, network ACLs, and server firewall. Confirm the SSH service is listening. Allow access only from the required trusted source IP or network."
        },
        {
          issue:
            "ssh: connect to host SERVER_IP port 22: Connection refused.",

          solution:
            "Confirm that the destination IP is correct and the server is reachable. Use console access to check whether sshd is running and listening on port 22. Inspect the service logs and firewall rejection rules. Start or repair the SSH service only after understanding why it stopped."
        },
        {
          issue:
            "Permission denied (publickey).",

          solution:
            "Verify the correct username, private key, public key entry, file permissions, home directory permissions, and ownership of ~/.ssh and authorized_keys. Inspect SSH authentication logs on the server. Do not disable authentication security as a shortcut."
        },
        {
          issue:
            "WARNING: UNPROTECTED PRIVATE KEY FILE!",

          solution:
            "Restrict the private key file permissions using chmod 400 key.pem or another appropriate owner-only permission. Confirm that the file belongs to the correct user and is stored securely."
        }
      ]
    },

    {
      heading: "4. High CPU Usage and Server Performance Problems",

      explanation:
        "CPU is the processing unit that executes application instructions and operating system tasks. When a Linux server experiences unusually high CPU usage, applications may become slow, requests may take longer, and health checks may fail.\n\nCommon causes include an infinite loop, excessive application threads, high traffic, expensive database queries, background jobs, compression workloads, or a process repeatedly retrying failed operations.\n\nLinux load average represents the average number of tasks running or waiting for CPU and certain uninterruptible resources over time. It must be interpreted together with the number of CPU cores and other metrics. A load average of 8 may be normal on a large server but problematic on a small two-core machine.\n\nReal production example: An e-commerce application receives a sudden traffic increase during a sale. A background report-generation process also starts running expensive calculations. CPU usage reaches 100%, application response time increases, and the load balancer reports unhealthy targets. The engineer identifies the process consuming CPU, investigates its purpose, and safely limits or corrects the workload.\n\nDo not kill a high-CPU process just because its CPU percentage is large. It may be a critical database, system, or application process.",

      steps: [
        "Confirm that CPU usage is actually high and identify the affected server.",
        "Check uptime and load average.",
        "Identify the number of available CPU cores.",
        "List processes sorted by CPU usage.",
        "Inspect the suspicious process and identify its owner and command.",
        "Check application logs and recent deployment or traffic changes.",
        "Determine whether the load comes from application work, system processes, or I/O waiting.",
        "Check whether CPU usage is temporary or continuous.",
        "Apply the correct fix: optimize the application, reduce unnecessary work, adjust concurrency, or scale capacity.",
        "Monitor CPU, load average, response time, and error rate after the fix."
      ],

      commands:
        "uptime\nnproc\nlscpu\ntop\nhtop\nps aux --sort=-%cpu | head -15\nmpstat -P ALL 1 5\nvmstat 1 5\npidstat -u 1 5\nps -p PROCESS_ID -o pid,ppid,user,%cpu,%mem,etime,cmd\nsystemctl status SERVICE_NAME",

      config:
        "# Example: Find the top CPU-consuming processes\nps -eo pid,ppid,user,%cpu,%mem,etime,cmd --sort=-%cpu | head -20\n\n# Example: Monitor CPU activity every second\ntop -d 1\n\n# Example: Check available CPU cores\nnproc\n\n# Example: Check CPU statistics\nmpstat -P ALL 1 5\n\n# Example: Inspect one process\nps -p 1234 -o pid,ppid,user,%cpu,%mem,etime,cmd\n\n# Example: Check a service's resource usage\nsystemctl status myapp.service\n\n# Safe response:\n# 1. Identify the process.\n# 2. Understand its function.\n# 3. Check its logs and workload.\n# 4. Apply an application or capacity fix.\n# 5. Verify service health.",

      problems: [
        {
          issue:
            "Linux server CPU usage remains at 100%.",

          solution:
            "Use top or ps to identify CPU-consuming processes. Inspect process ownership, command, logs, and application behavior. Check for traffic spikes, loops, stuck jobs, or expensive queries. Apply a targeted application or capacity fix and monitor the result."
        },
        {
          issue:
            "Application is slow even though CPU usage is low.",

          solution:
            "Check memory pressure, disk I/O, network latency, database response time, connection pools, and process wait states. Low CPU does not prove that the server is healthy."
        },
        {
          issue:
            "Load average is high after deployment.",

          solution:
            "Compare load average with CPU core count and inspect running and uninterruptible tasks. Check new application processes, background jobs, disk activity, and recent configuration changes. Roll back only if evidence indicates the deployment caused the incident and the rollback is safe."
        }
      ]
    },

    {
      heading: "5. Memory Problems, RAM Usage and OOM Killer",

      explanation:
        "RAM stores data that running processes need quickly. Linux uses memory for applications, kernel operations, filesystem cache, and buffers. High memory usage does not always mean that a server has a memory problem because Linux intentionally uses available RAM for caching.\n\nThe free command shows memory information, including available memory. The available column is more useful than looking only at the free column when estimating whether the server can start more workloads.\n\nWhen the system cannot satisfy memory requirements, Linux may invoke the Out Of Memory killer, commonly called the OOM killer. It selects a process to terminate based on kernel memory-management rules. An application may suddenly disappear even though nobody manually stopped it.\n\nReal production example: A Java application running on an EC2 server gradually consumes more memory because of a memory leak. Available RAM decreases. The kernel invokes the OOM killer and terminates the application process. Customers receive errors. The engineer checks memory usage, process details, kernel logs, Java heap settings, and application metrics to identify the problem.\n\nThe solution may involve fixing a memory leak, tuning heap size, reducing workload, adding memory, or changing application concurrency. Simply increasing swap does not necessarily solve a memory leak.",

      steps: [
        "Check total, used, available, and swap memory.",
        "Identify processes consuming the largest amount of RAM.",
        "Check whether memory usage grows continuously over time.",
        "Inspect kernel logs for out-of-memory events.",
        "Check application-specific memory metrics such as Java heap usage.",
        "Inspect container or service memory limits if applicable.",
        "Identify memory leaks, oversized caches, or excessive concurrency.",
        "Apply the appropriate application or capacity correction.",
        "Verify that available memory remains stable under normal workload.",
        "Add alerts for memory pressure and OOM events."
      ],

      commands:
        "free -h\nfree -m\ncat /proc/meminfo\nps aux --sort=-%mem | head -15\nvmstat 1 5\nswapon --show\nsudo dmesg -T | grep -i -E 'out of memory|killed process'\nsudo journalctl -k | grep -i -E 'oom|out of memory|killed process'\npidstat -r 1 5\nsystemctl status SERVICE_NAME",

      config:
        "# Example memory inspection\nfree -h\n\n# Find top memory-consuming processes\nps -eo pid,ppid,user,%mem,rss,cmd --sort=-%mem | head -20\n\n# Check OOM-related kernel messages\nsudo journalctl -k --since \"1 hour ago\" | grep -i -E 'oom|killed process'\n\n# Example: inspect swap\nswapon --show\n\n# Example systemd memory limit for an application\n# Use a value based on actual workload and server capacity.\n# File: /etc/systemd/system/myapp.service.d/resources.conf\n\n[Service]\nMemoryMax=2G\n\n# Apply the systemd configuration change\nsudo systemctl daemon-reload\n\n# Restart only during an approved maintenance or recovery window\nsudo systemctl restart myapp.service\n\n# Verify\nsystemctl show myapp.service -p MemoryCurrent -p MemoryMax\n\n# NOTE:\n# MemoryMax is an enforcement limit, not a memory leak fix.\n# Monitor the application before choosing a production limit.",

      problems: [
        {
          issue:
            "Application process is killed unexpectedly by Linux.",

          solution:
            "Check journalctl -k and dmesg for OOM-killer messages. Identify the killed process and its memory usage. Inspect application memory metrics, heap configuration, and workload. Fix memory leaks or excessive allocation before changing server capacity."
        },
        {
          issue:
            "free command shows very little free memory.",

          solution:
            "Check the available column in free -h. Linux may be using otherwise unused RAM for reclaimable filesystem cache. Investigate actual memory pressure, swap activity, and application performance before treating cached memory as a failure."
        },
        {
          issue:
            "Swap usage is continuously increasing.",

          solution:
            "Check memory-consuming processes, available RAM, page activity using vmstat, and application memory growth. Reduce excessive allocation or increase capacity where justified. Swap is not a replacement for sufficient RAM."
        }
      ]
    },

    {
      heading: "6. Disk Full, Inode Exhaustion and Storage Troubleshooting",

      explanation:
        "Linux applications need disk space to store logs, temporary files, databases, uploaded files, package data, and application output. When a filesystem becomes full, applications may fail to write files, databases may stop accepting writes, and system services may become unstable.\n\nDisk capacity and inode availability are different things. Disk space measures available storage capacity. Inodes represent filesystem objects such as files and directories. A filesystem can have free disk space but no available inodes if it contains a huge number of small files.\n\nFor example, a production application writes thousands of small log files. The filesystem reaches 100% inode usage even though df -h still shows available storage space. New files cannot be created, and the application reports errors such as No space left on device.\n\nAnother real scenario occurs when a log file is deleted while the application still has it open. The filename disappears from the directory, but the disk space may not be released until the process closes the file descriptor. lsof +L1 helps identify such deleted-but-open files.\n\nNever blindly delete database files, system files, or unknown application files to free disk space. First identify the filesystem, affected directory, file owner, and purpose of the data.",

      steps: [
        "Identify which filesystem is full.",
        "Check both disk usage and inode usage.",
        "Find large directories using du.",
        "Identify old logs, temporary files, caches, and deleted-but-open files.",
        "Check whether the application or log rotation process is behaving correctly.",
        "Determine whether the data is safe to archive, rotate, or remove.",
        "Take a backup where necessary and follow the organization's retention policy.",
        "Free space safely or expand the filesystem.",
        "Verify that disk and inode usage have decreased.",
        "Configure monitoring and log rotation to prevent recurrence."
      ],

      commands:
        "df -h\n\ndf -i\n\nlsblk -f\n\nsudo du -xhd1 /var 2>/dev/null | sort -h\n\nsudo du -xhd1 / 2>/dev/null | sort -h\n\nsudo find /var/log -type f -size +100M -exec ls -lh {} \\;\n\nsudo lsof +L1\n\nfindmnt\n\nsudo journalctl --disk-usage",

      config:
        "# Example: Check filesystem capacity\ndf -h\n\n# Example: Check inode usage\ndf -i\n\n# Example: Find large directories without crossing filesystems\nsudo du -xhd1 /var 2>/dev/null | sort -h\n\n# Example: Find large log files\nsudo find /var/log -type f -size +100M -exec ls -lh {} \\;\n\n# Example: Find deleted files still held open\nsudo lsof +L1\n\n# Example logrotate configuration\n# File: /etc/logrotate.d/myapp\n\n/var/log/myapp/*.log {\n    daily\n    rotate 14\n    compress\n    delaycompress\n    missingok\n    notifempty\n    create 0640 appuser appgroup\n    sharedscripts\n    postrotate\n        systemctl kill -s HUP myapp.service 2>/dev/null || true\n    endscript\n}\n\n# Validate logrotate configuration\nsudo logrotate -d /etc/logrotate.conf\n\n# IMPORTANT:\n# Confirm that the application supports the selected rotation signal.\n# Test the configuration before using forced rotation in production.",

      problems: [
        {
          issue:
            "Application reports No space left on device.",

          solution:
            "Run df -h and df -i to distinguish disk exhaustion from inode exhaustion. Find large directories, check logs and temporary files, and identify safe cleanup candidates. Follow retention and backup policies before removing files."
        },
        {
          issue:
            "Disk space remains full after deleting a large log file.",

          solution:
            "Check sudo lsof +L1 for deleted files that are still open. Identify the process holding the file descriptor and use the application's supported log-reopen or service-restart procedure. Verify disk usage after the descriptor is released."
        },
        {
          issue:
            "df -h shows free space but applications cannot create new files.",

          solution:
            "Check df -i. The filesystem may have exhausted inodes because of many small files. Find directories containing large numbers of files, inspect their purpose, and safely archive or remove unnecessary files according to retention rules."
        },
        {
          issue:
            "A production database stops writing because its data filesystem is full.",

          solution:
            "Treat this as a critical incident. Check database logs, storage usage, available capacity, and backup status. Do not delete database data files manually. Expand storage or perform database-supported cleanup using the database administrator's recovery procedure."
        }
      ]
    },

    {
      heading: "7. Linux File Permissions, Ownership and Access Denied Errors",

      explanation:
        "Linux uses users, groups, and permission bits to control who can read, write, or execute files and directories. Applications often run under dedicated service accounts rather than the root user.\n\nFor regular files, read permission allows content access, write permission allows modification, and execute permission allows execution. For directories, read permission allows listing entries, write permission allows creating or deleting entries when other required permissions are present, and execute permission allows traversal.\n\nThe permission display from ls -l shows the file type and permission groups for owner, group, and others. The ownership and permissions must match the application process requirements.\n\nReal production example: A Node.js application runs as user appuser. After a deployment, the release directory is created by root and contains files that appuser cannot read. The application fails to start with EACCES or Permission denied. The engineer checks the service account, file ownership, parent directory permissions, and deployment process.\n\nChanging everything to chmod 777 is not a safe solution. It grants unnecessary access and can create serious security problems.",

      steps: [
        "Read the exact permission-denied error from the application logs.",
        "Identify the Linux user running the application.",
        "Check file ownership and permission bits.",
        "Check parent directory traversal permissions.",
        "Check ACL entries if standard permissions appear correct.",
        "Check SELinux or AppArmor denials where enabled.",
        "Identify the minimum permission the application needs.",
        "Correct ownership or permissions without granting unnecessary access.",
        "Restart or reload the application if the change requires it.",
        "Verify access using the actual service account."
      ],

      commands:
        "whoami\nid\nls -l FILE_PATH\nstat FILE_PATH\nnamei -l /path/to/application/file\ngetfacl FILE_PATH\nps -eo user,pid,cmd | grep myapp\nsudo -u appuser test -r FILE_PATH && echo readable\nsudo -u appuser test -w FILE_PATH && echo writable\nsudo -u appuser test -x DIRECTORY_PATH && echo traversable\nsudo ausearch -m AVC -ts recent",

      config:
        "# Example: Inspect ownership\nls -ld /opt/myapp\nls -l /opt/myapp\n\n# Example: Assign ownership to the application service account\nsudo chown -R appuser:appgroup /opt/myapp\n\n# Example: Directory permissions\nsudo find /opt/myapp -type d -exec chmod 750 {} \\;\n\n# Example: Regular file permissions\nsudo find /opt/myapp -type f -exec chmod 640 {} \\;\n\n# Example: Executable application startup script\nsudo chmod 750 /opt/myapp/start.sh\n\n# Verify permissions using the service account\nsudo -u appuser test -r /opt/myapp/config.json\nsudo -u appuser test -x /opt/myapp/start.sh\n\n# IMPORTANT:\n# Choose ownership and permissions according to the application's needs.\n# Do not apply chmod -R 777 to application or system directories.",

      problems: [
        {
          issue:
            "Application shows Permission denied while reading its configuration file.",

          solution:
            "Check the service user with ps or systemctl show. Inspect file and parent directory permissions using namei -l and stat. Correct ownership or grant only the necessary read and traversal permissions. Test access as the service user."
        },
        {
          issue:
            "Application cannot execute a startup script.",

          solution:
            "Check whether the script has execute permission, whether its interpreter exists, whether the filesystem is mounted with noexec, and whether the service user can traverse the parent directories. Apply the minimum required correction."
        },
        {
          issue:
            "chmod 777 appears to fix an application permission issue.",

          solution:
            "Replace broad permissions with correct user/group ownership and restricted permissions. Identify the actual service account and provide only required read, write, and execute access."
        }
      ]
    },

    {
      heading: "8. Process Management, Zombie Processes and Stuck Applications",

      explanation:
        "A Linux process is a running instance of a program. Every process normally has a process ID called PID and a parent process ID called PPID. DevOps engineers inspect processes when an application stops responding, consumes too many resources, or refuses to shut down.\n\nA process may be running normally, sleeping while waiting for work, blocked on I/O, or consuming CPU. A zombie process is a process that has finished execution but whose parent has not yet collected its exit status. Zombies do not continue executing application work, but a large number can indicate a parent-process management issue.\n\nA stuck process may be waiting for disk or network I/O. Killing it may not immediately work if it is in an uninterruptible kernel sleep state. The process state can be inspected through ps and /proc.\n\nReal production example: A background report-generation service creates too many child processes. The server reaches its process limit, and new application workers cannot start. The engineer checks the process tree, parent process, process count, service configuration, and application logs before applying a correction.",

      steps: [
        "Identify the affected application or service.",
        "List running processes and identify the process ID.",
        "Check process state, owner, parent process, CPU, and memory usage.",
        "Inspect the parent-child process relationship.",
        "Check whether the process is actively working or stuck.",
        "Review application and system logs.",
        "Use the application's normal stop or restart procedure first.",
        "Send termination signals only when necessary and approved.",
        "Use forced termination only as a last resort after understanding the risk.",
        "Verify that the application starts correctly and no unwanted child processes remain."
      ],

      commands:
        "ps aux\nps -ef\nps -eo pid,ppid,state,user,%cpu,%mem,cmd --sort=-%cpu | head\npstree -ap\npgrep -a PROCESS_NAME\npidof PROCESS_NAME\ntop\nps -p PID -o pid,ppid,state,etime,cmd\ncat /proc/PID/status\nsystemctl status SERVICE_NAME\nkill -TERM PID\nkill -KILL PID",

      config:
        "# Find processes belonging to an application\npgrep -a myapp\n\n# Inspect a process\nps -p 1234 -o pid,ppid,state,user,%cpu,%mem,etime,cmd\n\n# Inspect its parent-child process tree\npstree -ap 1234\n\n# Request graceful termination\nkill -TERM 1234\n\n# Check whether the process stopped\nps -p 1234\n\n# Only after investigation and approval, if graceful termination fails:\nkill -KILL 1234\n\n# Check zombie processes\nps -eo pid,ppid,state,cmd | awk '$3 ~ /Z/ {print}'\n\n# Prefer managing systemd services through systemctl\nsudo systemctl stop myapp.service\nsudo systemctl status myapp.service",

      problems: [
        {
          issue:
            "Application process is running but does not respond to requests.",

          solution:
            "Inspect process state, threads, open files, CPU and memory usage. Check application logs and downstream dependencies. Use appropriate application diagnostics to determine whether it is blocked on a database, disk, network, or internal deadlock."
        },
        {
          issue:
            "Many zombie processes appear on the Linux server.",

          solution:
            "Identify their parent process IDs and inspect the parent application. Zombies have already exited; the parent needs to collect their exit status. Correct the parent process's child-management behavior or restart the affected service through an approved procedure."
        },
        {
          issue:
            "kill -9 does not immediately stop a process.",

          solution:
            "Check its process state using ps. A process in uninterruptible sleep may be waiting for a kernel operation such as disk I/O. Investigate the underlying storage or kernel issue rather than repeatedly sending signals."
        }
      ]
    },

    {
      heading: "9. Systemd Services, Application Startup and Service Failures",

      explanation:
        "systemd is a common Linux init and service-management system. It starts services during boot, manages dependencies, monitors service states, and provides commands to start, stop, restart, enable, disable, and inspect services.\n\nA DevOps engineer may deploy an application as a systemd service. For example, a Java application may run through a service unit that defines its user, working directory, environment variables, startup command, restart policy, and log behavior.\n\nA service can fail because the executable does not exist, the application exits with an error, a required environment variable is missing, a port is already occupied, file permissions are incorrect, or a dependent service is unavailable.\n\nReal production example: A Java application works when started manually but fails after server reboot. Investigation shows that the systemd service uses the wrong working directory and cannot locate its configuration file. Correcting the service unit and validating it fixes the startup failure.\n\nA service being active does not necessarily mean that the application is healthy. An application may start successfully but fail to serve requests. Use a health endpoint or application-level verification as well.",

      steps: [
        "Identify the service name.",
        "Check whether the service is active, failed, inactive, or repeatedly restarting.",
        "Read the service's recent journal logs.",
        "Inspect the service unit file and its drop-in configurations.",
        "Verify the executable, working directory, service user, environment variables, and dependencies.",
        "Check whether the required application port is already in use.",
        "Validate configuration changes before applying them.",
        "Reload systemd when unit definitions have changed.",
        "Restart the service using an approved procedure.",
        "Verify service state and application health separately."
      ],

      commands:
        "systemctl status myapp.service\nsystemctl is-active myapp.service\nsystemctl is-enabled myapp.service\nsystemctl list-units --type=service --state=failed\nsystemctl cat myapp.service\nsystemctl show myapp.service\njournalctl -u myapp.service -n 100\njournalctl -u myapp.service -f\nsystemd-analyze verify /etc/systemd/system/myapp.service\nsudo systemctl daemon-reload\nsudo systemctl restart myapp.service",

      config:
        "# Example systemd service\n# File: /etc/systemd/system/myapp.service\n\n[Unit]\nDescription=My Production Application\nAfter=network.target\nWants=network.target\n\n[Service]\nType=simple\nUser=appuser\nGroup=appgroup\nWorkingDirectory=/opt/myapp\nExecStart=/usr/bin/java -jar /opt/myapp/app.jar\nRestart=on-failure\nRestartSec=5\nEnvironmentFile=-/etc/myapp/myapp.env\n\n[Install]\nWantedBy=multi-user.target\n\n# Validate the service definition\nsudo systemd-analyze verify /etc/systemd/system/myapp.service\n\n# Reload systemd configuration\nsudo systemctl daemon-reload\n\n# Start service\nsudo systemctl start myapp.service\n\n# Enable service at boot\nsudo systemctl enable myapp.service\n\n# Verify service\nsudo systemctl status myapp.service\nsudo journalctl -u myapp.service -n 50",

      problems: [
        {
          issue:
            "systemctl status shows Failed to start myapp.service.",

          solution:
            "Read journalctl -u myapp.service -n 100. Inspect ExecStart, WorkingDirectory, User, Group, environment variables, permissions, and application startup logs. Fix the specific failure, validate the unit file, reload systemd if required, and restart."
        },
        {
          issue:
            "Service starts manually but fails during system boot.",

          solution:
            "Compare the manual execution environment with the systemd environment. Check working directory, PATH, service user, environment variables, network dependencies, file permissions, and unit ordering."
        },
        {
          issue:
            "Service keeps restarting repeatedly.",

          solution:
            "Check journalctl for the original application error and inspect the exit code. Identify whether the application crashes, loses a dependency, cannot bind its port, or fails configuration validation. Fix the underlying cause instead of only changing RestartSec."
        }
      ]
    },

    {
      heading: "10. Linux Networking, DNS and Port Connectivity Problems",

      explanation:
        "Linux networking allows applications and servers to communicate with other systems. A typical production application may receive user traffic through a load balancer, communicate with a database, download packages, call external APIs, and connect to monitoring systems.\n\nA network problem can happen at several layers. The network interface may be down, the IP address may be incorrect, a route may be missing, a firewall may block traffic, a DNS resolver may fail, or the application may not be listening on its expected port.\n\nFor example, an application can connect to a database by IP address but cannot connect using its hostname. This suggests a possible DNS resolution problem rather than a database outage. Another example is a service listening only on 127.0.0.1, making it inaccessible from other machines even though local curl requests succeed.\n\nReal production scenario: A new application deployment changes the listening address from 0.0.0.0 to 127.0.0.1. The application works locally, but the load balancer cannot reach it. The engineer inspects listening sockets and identifies the binding problem.\n\nNetwork diagnosis should proceed step by step: interface, address, route, DNS, TCP connectivity, firewall, listening service, and application response.",

      steps: [
        "Confirm the source and destination systems.",
        "Check the local network interfaces and IP addresses.",
        "Check the default route and destination route.",
        "Resolve the destination hostname using DNS tools.",
        "Check whether the destination TCP port is reachable.",
        "Check local listening ports and the process using each port.",
        "Inspect host firewall and cloud network rules.",
        "Check whether the application binds to the correct interface.",
        "Test the actual application endpoint.",
        "Monitor connectivity after correcting the network or application configuration."
      ],

      commands:
        "ip addr show\nip route\nip link show\nhostname -I\ngetent hosts example.com\nresolvectl status\nnslookup example.com\ndig example.com\nping -c 4 SERVER_IP\ntraceroute SERVER_IP\nss -tulpen\nsudo lsof -i :8080\nnc -vz SERVER_IP 8080\ncurl -v http://SERVER_IP:8080/health\nsudo ufw status verbose",

      config:
        "# Example: Check application listening address\nsudo ss -tlnp\n\n# Example: Local-only binding\n# 127.0.0.1:8080\n\n# Example: Network-accessible binding where intended\n# 0.0.0.0:8080\n\n# Example Node.js application\nconst server = app.listen(8080, \"0.0.0.0\");\n\n# Example DNS lookup\ndig example.com\ngetent hosts example.com\n\n# Example TCP test\nnc -vz SERVER_IP 8080\n\n# Example HTTP health check\ncurl -v http://SERVER_IP:8080/health\n\n# IMPORTANT:\n# Binding to 0.0.0.0 exposes the service on all available IPv4 interfaces.\n# Restrict access with appropriate firewall and network rules.\n# Do not expose internal services publicly without authorization.",

      problems: [
        {
          issue:
            "Application works on localhost but cannot be reached from another server.",

          solution:
            "Check ss -tlnp. If the application listens only on 127.0.0.1, it accepts local connections only. Configure the correct listening interface, then verify host firewall, cloud security rules, and application health."
        },
        {
          issue:
            "Could not resolve hostname.",

          solution:
            "Check DNS configuration using resolvectl status, dig, and getent hosts. Verify resolver availability, DNS records, search domains, and network connectivity to the configured DNS server."
        },
        {
          issue:
            "Connection refused when connecting to application port.",

          solution:
            "Check whether the application is running and listening on the expected address and port. Inspect service logs, port conflicts, and firewall rejection rules. Correct the service or network configuration."
        },
        {
          issue:
            "Connection times out even though the destination server is running.",

          solution:
            "Investigate routing, security groups, network ACLs, host firewall rules, intermediate network devices, and destination service availability. A running server does not guarantee network reachability."
        }
      ]
    },

    {
      heading: "11. Package Manager Problems – APT, DNF and YUM",

      explanation:
        "Linux package managers install, update, remove, and manage software packages and dependencies. Ubuntu and Debian commonly use APT. RHEL-based distributions commonly use DNF or YUM.\n\nPackage installation failures may occur because a repository is unavailable, DNS is broken, package metadata is outdated, a dependency cannot be resolved, a package database is locked, or insufficient disk space exists.\n\nReal production example: A CI/CD pipeline provisions a fresh Ubuntu server and runs apt install. The installation fails because another package-management process is holding the lock. The engineer checks the process, confirms whether a legitimate update is running, and allows it to finish rather than deleting lock files blindly.\n\nPackage managers must be used carefully on production systems because upgrading a system package may affect running applications, libraries, kernels, or service behavior.",

      steps: [
        "Identify the Linux distribution and package manager.",
        "Read the exact package installation error.",
        "Check network and DNS connectivity to the repository.",
        "Check repository configuration and package metadata.",
        "Check whether another package manager process is running.",
        "Check available disk space and inode availability.",
        "Inspect dependency conflicts and package versions.",
        "Apply the minimum required package correction.",
        "Validate the installed package version.",
        "Verify dependent services and application functionality."
      ],

      commands:
        "# Ubuntu / Debian\ncat /etc/os-release\nsudo apt update\napt list --upgradable\napt-cache policy PACKAGE_NAME\nsudo apt install PACKAGE_NAME\ndpkg -l PACKAGE_NAME\nsudo dpkg --audit\n\n# RHEL / Fedora / Rocky / AlmaLinux\nsudo dnf repolist\nsudo dnf check-update\nsudo dnf info PACKAGE_NAME\nsudo dnf install PACKAGE_NAME\nrpm -q PACKAGE_NAME\nsudo dnf check\n\n# Inspect package manager processes\nps aux | grep -E 'apt|dpkg|dnf|yum'\n\n# Check disk space\ndf -h",

      config:
        "# Example: Check Ubuntu package metadata\nsudo apt update\n\n# Inspect package candidate version\napt-cache policy nginx\n\n# Install a package\nsudo apt install nginx\n\n# Verify installation\nnginx -v\ndpkg -l nginx\n\n# Example: RHEL-family package operations\nsudo dnf repolist\nsudo dnf info nginx\nsudo dnf install nginx\nrpm -q nginx\n\n# IMPORTANT:\n# Review package changes before applying them to production.\n# Use approved repositories and versions.\n# Do not delete dpkg or apt lock files while package operations are running.",

      problems: [
        {
          issue:
            "E: Could not get lock /var/lib/dpkg/lock-frontend.",

          solution:
            "Check whether apt, dpkg, unattended-upgrades, or another package operation is running. Wait for a legitimate process to complete. Investigate a genuinely stuck operation using distribution-specific recovery procedures rather than deleting the lock file immediately."
        },
        {
          issue:
            "Unable to locate package.",

          solution:
            "Run apt update, inspect enabled repositories, verify the package name, and check whether the package is available for the current distribution version."
        },
        {
          issue:
            "Package dependency conflicts prevent installation.",

          solution:
            "Inspect the package versions and dependency requirements. Check repository consistency and package pinning. Use the package manager's supported repair process and test changes before applying them to production."
        }
      ]
    },

    {
      heading: "12. Linux Logs, journalctl and Log Investigation",

      explanation:
        "Logs are records of events produced by the Linux operating system, applications, and services. Logs are one of the most important sources of evidence during troubleshooting.\n\nA DevOps engineer uses logs to understand what happened before a failure, at the time of failure, and after a recovery. System logs may contain authentication events, kernel errors, service startup failures, device errors, and security events. Application logs contain application-specific information such as failed requests, database connection errors, and configuration problems.\n\nsystemd-based Linux systems commonly use journald to collect service and system logs. The journalctl command allows engineers to filter logs by service, boot, time, priority, and other fields.\n\nReal production example: A Java application becomes unavailable after a deployment. systemctl shows the service as failed. The engineer runs journalctl -u myapp.service and finds that the application cannot read its environment configuration file. The root cause is an incorrect file permission introduced during deployment.\n\nLogs should contain enough information to diagnose failures but should not expose passwords, API keys, access tokens, or other sensitive information. Production systems also need appropriate log rotation and retention.",

      steps: [
        "Identify which component produced the error.",
        "Find the relevant log source: journal, application log, authentication log, or kernel log.",
        "Select the correct time range around the incident.",
        "Search for the first meaningful error rather than only the final failure message.",
        "Compare events before and after the problem started.",
        "Correlate timestamps with deployment, configuration, traffic, or infrastructure changes.",
        "Check whether logs are missing because of rotation, storage exhaustion, or logging configuration.",
        "Identify sensitive information that must not be exposed.",
        "Correct the root cause and verify that new logs show successful behavior.",
        "Document the relevant evidence for the incident report."
      ],

      commands:
        "journalctl -n 100\njournalctl -f\njournalctl -p err\njournalctl -b\njournalctl -b -1\njournalctl -u nginx.service -n 100\njournalctl -u myapp.service --since \"1 hour ago\"\njournalctl --since \"2026-10-31 10:00:00\" --until \"2026-10-31 11:00:00\"\njournalctl -k -p warning\nsudo tail -f /var/log/syslog\nsudo tail -f /var/log/auth.log\nsudo tail -f /var/log/nginx/error.log",

      config:
        "# View the latest application service logs\nsudo journalctl -u myapp.service -n 100\n\n# Follow logs in real time\nsudo journalctl -u myapp.service -f\n\n# Show errors from the current boot\nsudo journalctl -b -p err\n\n# Check journal disk usage\nsudo journalctl --disk-usage\n\n# Example journald retention configuration\n# File: /etc/systemd/journald.conf\n\n[Journal]\nSystemMaxUse=500M\nMaxRetentionSec=30day\n\n# Validate and restart journald after an approved configuration change\nsudo systemd-analyze cat-config systemd/journald.conf\nsudo systemctl restart systemd-journald\n\n# Verify journal status\nsudo journalctl --disk-usage\n\n# IMPORTANT:\n# Select retention according to disk capacity, incident investigation needs,\n# compliance requirements, and organizational logging policy.",

      problems: [
        {
          issue:
            "journalctl does not show expected application logs.",

          solution:
            "Check the correct service unit name, time range, boot selection, and whether the application sends output to stdout/stderr or writes to separate files. Inspect the service unit and application logging configuration."
        },
        {
          issue:
            "Logs disappeared after reboot.",

          solution:
            "Check journald storage settings. If logs were stored only in volatile storage, they may not survive reboot. Configure persistent storage and appropriate retention according to operational requirements."
        },
        {
          issue:
            "Application logs contain passwords or access tokens.",

          solution:
            "Treat exposed credentials as a security incident. Restrict log access, rotate affected credentials, remove or redact sensitive values through approved processes, and fix application logging so secrets are never written."
        }
      ]
    },

    {
      heading: "13. Filesystem, Mount and Disk I/O Troubleshooting",

      explanation:
        "A Linux filesystem organizes data on storage devices. Common Linux filesystems include ext4 and XFS. Disks and partitions may be mounted into directories such as /data, /var, or /mnt/storage.\n\nA storage device can be present but not mounted. A mount may fail because the filesystem is damaged, the device UUID is incorrect, the disk is unavailable, or the mount configuration is invalid.\n\nDisk I/O problems are different from disk capacity problems. A disk may have sufficient free space but respond very slowly. This can cause applications and databases to wait for storage operations. The server may show high I/O wait even when CPU usage is not high.\n\nReal production example: A database runs on an attached cloud block-storage volume. Storage latency increases and database queries become slow. The engineer checks disk statistics, I/O wait, filesystem health, cloud volume metrics, and database logs. The issue may be caused by storage performance limits rather than CPU or RAM.\n\nFilesystem repair tools must be used with care. Filesystem checks often require the filesystem to be unmounted, and repairing a live production filesystem without a proper recovery plan can cause data loss.",

      steps: [
        "Identify the affected disk, partition, and mount point.",
        "Check device availability and filesystem type.",
        "Check whether the filesystem is mounted.",
        "Inspect /etc/fstab and device UUID configuration.",
        "Check disk capacity and inode availability.",
        "Inspect I/O statistics and application wait time.",
        "Review kernel logs for disk, controller, or filesystem errors.",
        "Check cloud volume health and performance metrics when using cloud storage.",
        "Use approved backup and recovery procedures before filesystem repair.",
        "Verify mount status, read/write operations, and application health after recovery."
      ],

      commands:
        "lsblk -f\nblkid\nfindmnt\nmount\ndf -h\ndf -i\niostat -xz 1 5\nvmstat 1 5\nsudo dmesg -T | grep -i -E 'disk|I/O error|filesystem|ext4|xfs'\nsudo journalctl -k -p err\ncat /etc/fstab\nfindmnt --verify\nsudo lsof +D /data",

      config:
        "# Inspect disks and filesystems\nlsblk -f\nblkid\n\n# Inspect current mounts\nfindmnt\ndf -h\n\n# Example mount configuration\n# File: /etc/fstab\nUUID=ACTUAL-UUID /data ext4 defaults 0 2\n\n# Validate configuration\nfindmnt --verify\n\n# Test configured mounts carefully\nsudo mount -a\n\n# Confirm the mount\nfindmnt /data\n\n# Check I/O statistics\nsudo iostat -xz 1 5\n\n# IMPORTANT:\n# Confirm the device and filesystem before mounting or formatting.\n# Never use mkfs on a production device unless creating a new filesystem\n# is explicitly intended and all required data is backed up.\n# Filesystem repair should follow the filesystem vendor's safe procedure.",

      problems: [
        {
          issue:
            "Disk is visible in lsblk but /data is not mounted.",

          solution:
            "Inspect the filesystem using lsblk -f and blkid. Check /etc/fstab for the correct UUID and mount options. Validate the configuration, then mount the intended device after confirming that it is the correct volume."
        },
        {
          issue:
            "Database queries are slow and Linux shows high I/O wait.",

          solution:
            "Use iostat and vmstat to inspect storage activity. Check kernel logs, cloud disk latency, throughput, queue depth, and database storage metrics. Identify whether the problem is the application workload, filesystem, or underlying storage."
        },
        {
          issue:
            "Filesystem reports errors after an unexpected shutdown.",

          solution:
            "Preserve data and inspect kernel and filesystem messages. Confirm backup availability and use the filesystem-specific repair procedure, usually from recovery mode or with the filesystem safely unmounted."
        }
      ]
    },

    {
      heading: "14. Linux Security, Firewall and User Account Troubleshooting",

      explanation:
        "Linux security controls who can access a system, which operations they can perform, and which network connections are allowed. Important security components include users, groups, sudo permissions, SSH authentication, host firewalls, SELinux, AppArmor, and file access controls.\n\nA DevOps engineer may investigate why a deployment user cannot execute a command, why a service cannot access a file, or why an application port is blocked.\n\nFirewalls control network traffic. Ubuntu commonly uses UFW as a simpler firewall management interface, while other distributions may use firewalld or nftables. Cloud security groups and network ACLs add another layer of network filtering.\n\nSELinux and AppArmor provide additional access-control enforcement. A process may be denied access even when standard Linux permission bits appear correct.\n\nReal production example: An application is deployed successfully, but it cannot bind to a protected port or access a restricted directory. The engineer checks user privileges, service configuration, firewall rules, and security audit logs rather than disabling all security controls.",

      steps: [
        "Identify the affected user, process, file, or network connection.",
        "Check the user's identity and group membership.",
        "Inspect sudo permissions and account status.",
        "Check standard file permissions and ACLs.",
        "Inspect firewall rules and listening ports.",
        "Check cloud network security controls separately.",
        "Check SELinux or AppArmor status and denial logs.",
        "Apply the smallest necessary security permission change.",
        "Test the intended operation using the affected service account.",
        "Document the access change and ensure it follows security policy."
      ],

      commands:
        "whoami\nid\ngetent passwd USERNAME\ngetent group GROUPNAME\nsudo -l -U USERNAME\nsudo ufw status verbose\nsudo nft list ruleset\nsudo firewall-cmd --list-all\ngetenforce\nsestatus\nsudo aa-status\ngetfacl FILE_PATH\nsudo ausearch -m AVC -ts recent\nss -tulpen",

      config:
        "# Example: Create a dedicated application user\nsudo useradd --system --create-home --shell /usr/sbin/nologin appuser\n\n# Inspect the account\nid appuser\ngetent passwd appuser\n\n# Example: Allow a required TCP port with UFW\nsudo ufw allow from TRUSTED_SOURCE_IP to any port 8080 proto tcp\n\n# Inspect firewall rules\nsudo ufw status numbered\n\n# Example: Check SELinux mode\ngetenforce\nsestatus\n\n# Inspect recent SELinux denials\nsudo ausearch -m AVC -ts recent\n\n# IMPORTANT:\n# Replace TRUSTED_SOURCE_IP with the actual authorized source.\n# Do not disable SELinux, AppArmor, or the firewall simply to make an\n# application work. Identify and correct the specific access requirement.",

      problems: [
        {
          issue:
            "A user receives sudo: user is not in the sudoers file.",

          solution:
            "Check the user's identity and group membership. Use the distribution's approved administrative procedure to grant only the required sudo privileges. Validate sudoers configuration using visudo before applying changes."
        },
        {
          issue:
            "Application traffic is blocked by the Linux firewall.",

          solution:
            "Inspect active firewall rules and confirm the actual listening port. Add a narrow rule for the required source and destination. Also inspect cloud security groups and network ACLs because host firewall rules are only one layer."
        },
        {
          issue:
            "Permission is denied even though chmod and chown appear correct.",

          solution:
            "Check ACLs, SELinux labels, AppArmor profiles, mount options, and parent directory access. Review audit logs to identify the actual security policy denial."
        }
      ]
    },

    {
      heading: "15. Linux Production Troubleshooting – Complete Real-World Incident",

      explanation:
        "This section combines the earlier troubleshooting concepts into a realistic production incident.\n\nScenario: An online shopping company hosts its application on an Ubuntu Linux server. Customers report that the website is slow. The load balancer shows that the application server is responding slowly. The monitoring system reports high disk usage, and application logs contain file-write errors.\n\nThe DevOps engineer receives the alert and starts an investigation. First, the engineer checks uptime, CPU, memory, disk capacity, and failed services. CPU and memory are within normal limits, but /var is almost full. The engineer then checks directory sizes and discovers that the application has created a large number of log files because log rotation is not working correctly.\n\nThe engineer checks the active log configuration, confirms which files are safe to archive, and verifies that the application does not depend on old log files. The engineer frees space according to the retention policy and fixes the log rotation configuration. The service is then checked for successful writes, application health, and response time.\n\nThis is a realistic incident pattern: a small logging configuration issue can eventually cause an application outage. The root cause is not necessarily the application code or server capacity. It may be the way the operating system and application manage logs.\n\nA professional incident response must also verify that the same condition does not return. The team should configure disk alerts, log retention, rotation monitoring, and an operational runbook.",

      steps: [
        "Incident detected: customer reports slow website and monitoring reports application latency.",
        "Acknowledge the alert and identify the affected server and application.",
        "Check uptime, CPU, memory, disk, and failed services.",
        "Discover that /var has reached critical disk usage.",
        "Run du to identify the largest directories.",
        "Find that application logs are growing without rotation.",
        "Inspect application logs and identify file-write failures.",
        "Confirm that old logs can be archived or removed under the retention policy.",
        "Recover sufficient disk capacity without touching database or application data files.",
        "Correct and validate the log rotation configuration.",
        "Verify that the application can write logs and serve requests.",
        "Monitor disk usage, latency, and error rate after recovery.",
        "Create a post-incident report and preventive monitoring."
      ],

      commands:
        "# Initial system health\nuptime\nfree -h\ndf -h\ndf -i\nsystemctl --failed\n\n# Find large directories\nsudo du -xhd1 /var 2>/dev/null | sort -h\n\n# Find large application logs\nsudo find /var/log/myapp -type f -size +100M -exec ls -lh {} \\;\n\n# Inspect application logs\nsudo journalctl -u myapp.service --since \"1 hour ago\"\n\n# Inspect log rotation configuration\nsudo logrotate -d /etc/logrotate.d/myapp\n\n# Verify filesystem after safe cleanup\ndf -h /var\n\n# Verify service\nsudo systemctl status myapp.service\n\n# Verify application endpoint\ncurl -f http://127.0.0.1:8080/health",

      config:
        "# Example production log rotation policy\n# File: /etc/logrotate.d/myapp\n\n/var/log/myapp/*.log {\n    daily\n    rotate 14\n    compress\n    delaycompress\n    missingok\n    notifempty\n    create 0640 appuser appgroup\n}\n\n# Validate without changing files\nsudo logrotate -d /etc/logrotate.conf\n\n# Verify application health\ncurl -f http://127.0.0.1:8080/health\n\n# Example incident verification checklist\n# 1. Disk usage is below the critical threshold.\n# 2. Application can create new log entries.\n# 3. Service is active.\n# 4. Health endpoint returns success.\n# 5. Load balancer reports healthy target.\n# 6. Customer-facing response time has recovered.\n# 7. Disk monitoring alerts are configured.",

      problems: [
        {
          issue:
            "The application is unavailable because its log filesystem is full.",

          solution:
            "Identify the full filesystem and the directories consuming space. Check whether logs are safe to archive or rotate. Preserve required evidence and follow retention policy. Restore enough capacity, fix log rotation, and verify application writes and health checks."
        },
        {
          issue:
            "Application becomes healthy temporarily after deleting logs but fails again later.",

          solution:
            "The cleanup addressed the symptom, not the root cause. Investigate why log rotation is failing, whether the application continuously produces excessive logs, and whether monitoring alerts are configured. Correct the logging lifecycle and monitor its behavior."
        }
      ]
    },

    {
      heading: "16. Production Troubleshooting Best Practices and Incident Prevention",

      explanation:
        "A strong DevOps engineer does not only fix production problems. The engineer also improves the system so that similar failures are detected earlier and happen less often.\n\nProduction troubleshooting should follow a safe, evidence-based process. Engineers should understand the impact, preserve diagnostic evidence, use approved access, avoid destructive commands, communicate during incidents, and verify recovery from the customer perspective.\n\nMonitoring should cover CPU, memory, disk usage, inode usage, filesystem availability, service health, network connectivity, application response time, and error rates. Monitoring thresholds must be based on actual workloads rather than arbitrary values.\n\nConfiguration management tools such as Ansible, Terraform, and cloud-init can help maintain consistent Linux configurations. Configuration changes should be reviewed, version controlled, and tested before production deployment.\n\nReal company practice: An organization maintains Linux server runbooks for SSH failures, disk exhaustion, failed systemd services, memory pressure, and network outages. During an incident, engineers use these runbooks to follow consistent investigation and recovery procedures.",

      steps: [
        "Maintain an inventory of Linux servers, operating systems, applications, and service owners.",
        "Configure centralized log collection and appropriate log retention.",
        "Monitor CPU, memory, disk, inodes, I/O, network, and application health.",
        "Create alerts for meaningful thresholds and sustained abnormal conditions.",
        "Maintain tested backups and recovery procedures.",
        "Use dedicated service users instead of running applications as root.",
        "Apply security patches through a controlled maintenance process.",
        "Use version-controlled configuration management.",
        "Test configuration changes in non-production environments first.",
        "Document known issues, recovery procedures, and escalation contacts.",
        "Perform post-incident reviews to identify preventive actions.",
        "Regularly test restoration and recovery procedures."
      ],

      commands:
        "# Basic health commands\nuptime\nfree -h\ndf -h\ndf -i\nlsblk -f\nsystemctl --failed\nss -tulpen\n\n# Log investigation\njournalctl -p err -n 100\n\n# Check system boot duration and services\nsystemd-analyze time\nsystemd-analyze blame\n\n# Check service configuration\nsystemctl cat myapp.service\n\n# Check system security updates using the appropriate package manager\nsudo apt list --upgradable\n\n# Check active processes\nps aux --sort=-%cpu | head",

      config:
        "# Example production monitoring checklist\n\nCPU:\n  metric: CPU utilization\n  purpose: Detect sustained processing pressure\n\nMemory:\n  metric: Available memory and swap activity\n  purpose: Detect memory pressure and possible OOM events\n\nDisk:\n  metric: Filesystem utilization\n  purpose: Detect storage exhaustion\n\nInodes:\n  metric: Inode utilization\n  purpose: Detect large numbers of small files\n\nDisk I/O:\n  metric: Latency, utilization, throughput\n  purpose: Detect storage bottlenecks\n\nServices:\n  metric: Service state and restart count\n  purpose: Detect failed or unstable services\n\nApplication:\n  metric: Health endpoint, response time, error rate\n  purpose: Verify actual user-facing application health\n\n# Thresholds must be based on workload, capacity, and SLOs.\n# Use sustained conditions and alert on symptoms that require action.",

      problems: [
        {
          issue:
            "The same Linux issue happens repeatedly on production servers.",

          solution:
            "Perform root cause analysis rather than repeatedly applying temporary fixes. Identify the triggering condition, missing monitoring, configuration weakness, or capacity issue. Add a permanent corrective action, assign an owner, and verify that the issue does not recur."
        },
        {
          issue:
            "Monitoring reports the server is healthy, but customers cannot use the application.",

          solution:
            "Add application-level health checks and synthetic tests. Monitor response time, error rates, backend connectivity, and important user journeys. Infrastructure availability alone is not sufficient to prove application health."
        },
        {
          issue:
            "An engineer runs destructive commands during an emergency without confirming the target.",

          solution:
            "Require explicit target verification, backup checks, change approval, and command review for destructive operations. Prefer read-only diagnostic commands first and use the smallest safe corrective action."
        }
      ]
    },

    {
      heading: "17. Linux Troubleshooting Interview and Practical Knowledge",

      explanation:
        "Linux troubleshooting interviews often test whether a candidate can investigate real production issues instead of simply memorizing commands. An interviewer may describe a server with high CPU usage, a full disk, an unavailable SSH connection, a failed service, or an application that cannot connect to a database.\n\nA good answer explains the investigation order, commands, expected evidence, possible root causes, corrective action, and verification. Candidates should also explain why a command is used and what its output means.\n\nFor example, if asked how to troubleshoot a Linux server with high CPU, explain that you first check uptime and load average, identify CPU cores, inspect top processes, investigate the responsible process, review application logs, and apply a safe correction. Then verify CPU usage and application response time.\n\nThe practical goal is to demonstrate structured thinking, operational safety, and the ability to explain a technical issue in simple language.",

      steps: [
        "Explain the symptom before selecting a command.",
        "Choose the correct diagnostic command.",
        "Explain what information the command provides.",
        "Interpret the important part of the output.",
        "Describe possible root causes.",
        "Explain how to confirm the actual cause.",
        "Describe a safe correction.",
        "Explain how to verify recovery.",
        "Mention how to prevent the problem from happening again.",
        "Connect the answer to a realistic production scenario."
      ],

      commands:
        "# Common Linux interview diagnostic commands\n\n# CPU and load\nuptime\ntop\nps aux --sort=-%cpu | head\n\n# Memory\nfree -h\nps aux --sort=-%mem | head\n\n# Disk and inodes\ndf -h\ndf -i\ndu -sh /var/log/*\n\n# Processes\nps -ef\npstree -ap\n\n# Services\nsystemctl status nginx\nsystemctl --failed\n\n# Logs\njournalctl -u nginx -n 100\njournalctl -p err -n 50\n\n# Network\nip addr\nip route\nss -tulpen\nnc -vz SERVER_IP 22\n\n# Filesystem\nlsblk -f\nfindmnt\n\n# Security\nid\nsudo -l\nufw status",

      config:
        "# Example interview answer: Production server is slow\n\n# Step 1: Check uptime and load\nuptime\n\n# Step 2: Check CPU cores\nnproc\n\n# Step 3: Inspect processes\ntop\n\n# Step 4: Check memory\nfree -h\n\n# Step 5: Check disk\n df -h\n\n# Step 6: Check I/O\n iostat -xz 1 5\n\n# Step 7: Check application logs\njournalctl -u myapp.service -n 100\n\n# Step 8: Identify root cause\n# Correlate resource metrics, logs, and recent changes.\n\n# Step 9: Apply a targeted fix\n# Use an approved application, configuration, or capacity change.\n\n# Step 10: Verify recovery\ncurl -f http://127.0.0.1:8080/health\n\n# Interview principle:\n# Explain what you are checking, why you are checking it,\n# what result you expect, and what you will do next.",

      problems: [
        {
          issue:
            "Interviewer asks: How do you troubleshoot a Linux server that is very slow?",

          solution:
            "Start with uptime and load average. Check CPU cores, top processes, memory availability, disk space, I/O wait, and network conditions. Inspect application logs and recent deployments. Identify the actual bottleneck, apply a targeted fix, and verify application response time."
        },
        {
          issue:
            "Interviewer asks: How do you troubleshoot a failed Linux service?",

          solution:
            "Run systemctl status SERVICE_NAME, inspect journalctl -u SERVICE_NAME, check the unit configuration, executable path, environment variables, service user, permissions, and port availability. Fix the actual failure, reload systemd if necessary, restart the service, and verify application health."
        },
        {
          issue:
            "Interviewer asks: What is the difference between df and du?",

          solution:
            "df reports filesystem-level used and available space. du calculates the space used by files and directories. Use df to identify a full filesystem and du to find which directories consume space."
        },
        {
          issue:
            "Interviewer asks: What is the difference between a process and a service?",

          solution:
            "A process is a running instance of a program. A service is a managed background application or system component, often controlled by systemd. A service usually runs one or more processes and may have startup, shutdown, restart, and dependency rules."
        },
        {
          issue:
            "Interviewer asks: How do you investigate Permission denied?",

          solution:
            "Identify the application user, inspect file ownership and permission bits, check parent directory traversal, inspect ACLs, and review SELinux or AppArmor denials. Apply only the required permission and test access as the actual service account."
        }
      ]
    }
  ]
};

export default linuxTroubleshootingNotes;
