import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Linux Production Administration and Troubleshooting",
  description: "Complete practical guide to Linux production operations, architecture, deployments, service availability, process management, resource utilization, incident response, monitoring, security, backup, disaster recovery, root cause analysis, and real-world production support.",

  sections: [
    {
      heading: "1. Introduction to Linux Production Environments",
      explanation: "A production environment is the live infrastructure that serves real users and business applications. Linux production servers commonly run web applications, APIs, databases, reverse proxies, message brokers, background workers, monitoring agents, and scheduled jobs. Production administration requires more than knowing commands. An administrator must understand application dependencies, server capacity, security, deployment procedures, backups, monitoring, and recovery plans. Every production change should have a purpose, an owner, a validation method, and a rollback plan. The primary goals are availability, reliability, security, performance, and data integrity.",
      steps: [
        "Identify the application owner and business purpose.",
        "Understand the server role and application architecture.",
        "List application dependencies and communication ports.",
        "Review CPU, memory, disk, and network capacity.",
        "Check service health and recent alerts.",
        "Understand backup and recovery procedures.",
        "Follow the approved change process.",
        "Document all production changes and results."
      ],
      commands: [
        "hostnamectl",
        "uptime",
        "uname -a",
        "cat /etc/os-release",
        "df -h",
        "free -h",
        "systemctl --failed",
        "ip address"
      ],
      problems: [
        {
          issue: "An administrator changes a production server without understanding its role.",
          rootCause: "Infrastructure documentation, application ownership, and dependency information are missing.",
          solution: "Identify the service owner, dependencies, deployment method, and rollback procedure before making changes."
        },
        {
          issue: "A production application becomes unavailable after a configuration change.",
          rootCause: "The change was not validated against the running application and its dependencies.",
          solution: "Restore the previous known-good configuration, validate the service, and introduce pre-change testing."
        }
      ]
    },
    {
      heading: "2. Production Server Architecture",
      explanation: "A typical production application contains multiple layers. Users access a domain through DNS. Traffic reaches a load balancer, firewall, or reverse proxy and is forwarded to application servers. Applications communicate with databases, caches, storage systems, queues, and external APIs. Linux provides process scheduling, memory management, filesystems, networking, and security. Monitoring and logging systems collect information from all layers. A failure in DNS, routing, a proxy, an application process, or a database can cause the same visible symptom: the application is unavailable. Troubleshooting must therefore follow the complete request path.",
      steps: [
        "Identify DNS records and the public endpoint.",
        "Identify firewall and load-balancer components.",
        "Map reverse proxies and application instances.",
        "Identify database, cache, and storage dependencies.",
        "Document ports and network paths.",
        "Identify monitoring and centralized logging systems.",
        "Check each layer independently during an incident.",
        "Maintain an architecture and dependency diagram."
      ],
      commands: [
        "ip route",
        "ss -lntup",
        "getent hosts example.com",
        "curl -I https://example.com",
        "systemctl status nginx",
        "systemctl status application.service",
        "dig example.com",
        "traceroute example.com"
      ],
      problems: [
        {
          issue: "The application process is running but users cannot access the website.",
          rootCause: "DNS, firewall, load balancer, reverse proxy, or routing may be failing.",
          solution: "Test DNS, public connectivity, proxy health, listening sockets, and the application endpoint separately."
        },
        {
          issue: "The application returns database connection errors.",
          rootCause: "The database may be unavailable, unreachable, overloaded, or rejecting connections.",
          solution: "Check database health, connectivity, connection limits, authentication, and database logs."
        }
      ]
    },
    {
      heading: "3. Production Readiness and Server Baseline",
      explanation: "A production-ready Linux server needs a supported operating system, approved security updates, controlled access, time synchronization, sufficient capacity, monitoring, logging, backup coverage, and documented recovery procedures. The baseline should record CPU, memory, filesystem usage, inode usage, process limits, open file limits, network configuration, and required services. Unnecessary packages and exposed ports increase operational and security risk. Baseline measurements help administrators recognize unusual behavior. Before deployment, validate that the server has enough resources and that all required dependencies are available.",
      steps: [
        "Confirm operating-system version and support status.",
        "Apply approved security updates.",
        "Verify timezone and time synchronization.",
        "Review administrator accounts and SSH access.",
        "Check disk space, inodes, memory, and CPU.",
        "Validate firewall rules and listening ports.",
        "Configure monitoring, logging, and backups.",
        "Record baseline measurements and ownership."
      ],
      commands: [
        "cat /etc/os-release",
        "timedatectl",
        "uptime",
        "lscpu",
        "free -h",
        "df -h",
        "df -i",
        "ss -lntup",
        "systemctl --failed"
      ],
      problems: [
        {
          issue: "Deployment fails because the server has insufficient disk space.",
          rootCause: "Capacity was not checked and logs, packages, or temporary files consumed the filesystem.",
          solution: "Identify large directories, clean only approved files, expand storage when needed, and configure disk alerts."
        },
        {
          issue: "Scheduled jobs execute at unexpected times.",
          rootCause: "The system timezone or time synchronization is incorrectly configured.",
          solution: "Inspect timedatectl, correct the timezone where appropriate, and verify the time synchronization service."
        }
      ]
    },
    {
      heading: "4. Production Service Management with systemd",
      explanation: "systemd is the service manager used by many modern Linux distributions. It starts and supervises services, handles dependencies, records service state, and supports restart policies and resource restrictions. A unit file defines the executable, user, group, working directory, environment, startup dependencies, and shutdown behavior. Production administrators should use systemctl instead of manually killing service processes. An active service does not always mean the application is ready to serve requests. Combine service state with application health checks and logs.",
      steps: [
        "Identify the correct service unit.",
        "Inspect its current state.",
        "Review the unit file and dependencies.",
        "Validate configuration before restarting.",
        "Use reload when supported by the application.",
        "Restart only when required.",
        "Inspect journal entries after the operation.",
        "Verify application readiness."
      ],
      commands: [
        "systemctl status nginx",
        "systemctl start nginx",
        "systemctl stop nginx",
        "systemctl restart nginx",
        "systemctl reload nginx",
        "systemctl enable nginx",
        "systemctl cat nginx",
        "systemctl daemon-reload",
        "journalctl -u nginx -n 100"
      ],
      problems: [
        {
          issue: "A service repeatedly fails during startup.",
          rootCause: "Invalid configuration, missing executable, incorrect permissions, unavailable dependency, or port conflict.",
          solution: "Inspect systemctl status and journalctl output, validate configuration, correct the root cause, and restart."
        },
        {
          issue: "A service works manually but does not start after reboot.",
          rootCause: "The service may not be enabled or its startup dependencies may be incomplete.",
          solution: "Inspect the unit file, enable the service where appropriate, and test startup in a controlled environment."
        }
      ]
    },
    {
      heading: "5. Production Deployment Workflow",
      explanation: "A production deployment moves a validated application release into the live environment. A reliable workflow includes artifact creation, testing, approval, deployment, configuration validation, health checks, monitoring, and rollback readiness. Artifacts may arrive through a CI/CD pipeline, package repository, container registry, or controlled file transfer. The deployment must preserve required permissions, configuration, secrets, and directory ownership. Avoid replacing a running application without understanding its startup and shutdown behavior. Use rolling, blue-green, or canary deployment strategies when supported by the architecture.",
      steps: [
        "Confirm release version and change approval.",
        "Validate the artifact and checksum.",
        "Check disk capacity and dependencies.",
        "Back up required configuration and data.",
        "Deploy to the planned target.",
        "Validate configuration and file ownership.",
        "Start or reload the application safely.",
        "Run smoke tests and monitor the release."
      ],
      commands: [
        "sha256sum application.tar.gz",
        "df -h",
        "tar -tzf application.tar.gz",
        "install -d -o appuser -g appgroup /opt/application",
        "systemctl status application.service",
        "systemctl restart application.service",
        "curl -fsS http://127.0.0.1:8080/health",
        "journalctl -u application.service -n 100"
      ],
      problems: [
        {
          issue: "The new release fails immediately after deployment.",
          rootCause: "The artifact, runtime, configuration, permissions, or dependency versions may be incompatible.",
          solution: "Inspect startup logs, compare with the previous release, and roll back using the approved procedure."
        },
        {
          issue: "Deployment succeeds but users still receive the previous version.",
          rootCause: "A load balancer, cache, reverse proxy, or another instance may still serve the old release.",
          solution: "Check every backend instance, proxy configuration, cache behavior, and deployment completion status."
        }
      ]
    },
    {
      heading: "6. Production Process Management",
      explanation: "Production applications use processes and threads to handle requests, background jobs, and scheduled work. Administrators must monitor process count, CPU consumption, memory usage, thread growth, open file descriptors, and process states. A process may be active but overloaded, blocked on I/O, or repeatedly restarting. Excessive worker processes can indicate a traffic spike or application defect. Resource limits should be based on measured workload and host capacity. Never terminate a process only because its CPU usage is high; identify its role and supervisor first.",
      steps: [
        "Identify application processes and owners.",
        "Inspect PID, PPID, process state, and command.",
        "Measure CPU and memory usage.",
        "Check thread count and open file descriptors.",
        "Inspect process limits and cgroup settings.",
        "Correlate resource usage with traffic and logs.",
        "Apply a controlled recovery action.",
        "Verify resource usage after recovery."
      ],
      commands: [
        "ps aux --sort=-%cpu | head",
        "ps aux --sort=-%mem | head",
        "ps -eLf",
        "top -H -p PID",
        "pidstat -u -r 1",
        "cat /proc/PID/limits",
        "ls /proc/PID/fd | wc -l",
        "pstree -ap"
      ],
      problems: [
        {
          issue: "Application worker count increases continuously.",
          rootCause: "The application may leak child processes, create excessive workers, or fail to reap completed children.",
          solution: "Inspect the process tree, worker configuration, parent-child relationships, and application logs."
        },
        {
          issue: "The server becomes slow when application processes consume high CPU.",
          rootCause: "A traffic spike, inefficient query, busy loop, or excessive thread activity may consume CPU.",
          solution: "Identify hot processes and threads, inspect recent changes, profile the workload, and fix the actual bottleneck."
        }
      ]
    },
    {
      heading: "7. Production Memory Management and OOM",
      explanation: "Linux memory is used by processes, the kernel, and filesystem cache. Low free memory alone does not prove a memory problem because reclaimable cache is useful. Administrators should inspect available memory, swap activity, process resident memory, memory pressure, and cgroup limits. An Out Of Memory event can cause the kernel to terminate a process when memory cannot be allocated. Containerized applications can hit their memory limit even when the host still has free RAM. Memory troubleshooting requires correlating application behavior with host and container metrics.",
      steps: [
        "Check total, used, free, and available memory.",
        "Identify processes using the most resident memory.",
        "Inspect swap usage and activity.",
        "Review kernel OOM messages.",
        "Check service and container memory limits.",
        "Correlate memory growth with traffic.",
        "Identify leaks or excessive caching.",
        "Apply a measured fix and monitor trends."
      ],
      commands: [
        "free -h",
        "vmstat 1 10",
        "ps aux --sort=-%mem | head",
        "cat /proc/meminfo",
        "dmesg -T | grep -i -E 'oom|killed process'",
        "journalctl -k | grep -i oom",
        "cat /sys/fs/cgroup/memory.current",
        "cat /sys/fs/cgroup/memory.max"
      ],
      problems: [
        {
          issue: "The application is killed during peak traffic.",
          rootCause: "Memory consumption may exceed host RAM or a container memory limit.",
          solution: "Inspect OOM logs, process memory, traffic, and cgroup limits; optimize the application or resize capacity."
        },
        {
          issue: "Swap activity increases and response times become slow.",
          rootCause: "The host may be under memory pressure and moving pages between RAM and swap.",
          solution: "Inspect vmstat and memory usage, identify large consumers, and address memory demand."
        }
      ]
    },
    {
      heading: "8. Production CPU and Performance Troubleshooting",
      explanation: "CPU incidents occur when runnable work exceeds processing capacity or application code consumes excessive CPU. Linux load average includes runnable tasks and tasks in uninterruptible sleep, so it is not a direct CPU percentage. Tools such as top, mpstat, pidstat, and vmstat help identify system-wide and per-process behavior. CPU saturation can increase request latency, queue depth, and deployment duration. Performance analysis should compare current behavior with a known baseline and inspect per-thread usage, context switching, CPU affinity, and container quotas.",
      steps: [
        "Record load average and CPU utilization.",
        "Identify processes with high CPU consumption.",
        "Inspect individual threads where needed.",
        "Check CPU pressure and context switching.",
        "Review recent deployments and traffic changes.",
        "Inspect request latency and profiling data.",
        "Apply a targeted optimization.",
        "Compare performance after the change."
      ],
      commands: [
        "uptime",
        "top",
        "mpstat -P ALL 1 5",
        "pidstat -u 1 5",
        "vmstat 1 10",
        "ps -eo pid,ni,psr,%cpu,comm --sort=-%cpu | head",
        "lscpu",
        "sar -u 1 5"
      ],
      problems: [
        {
          issue: "Load average is high but CPU utilization is not high.",
          rootCause: "Tasks may be waiting in uninterruptible I/O sleep or blocked on storage.",
          solution: "Inspect D-state processes, iostat, storage latency, and kernel logs."
        },
        {
          issue: "One application thread consumes an entire CPU core.",
          rootCause: "A busy loop, inefficient code path, or single-threaded workload may be responsible.",
          solution: "Identify the thread using top -H, collect profiling data, and correct the application bottleneck."
        }
      ]
    },
    {
      heading: "9. Production Disk and Filesystem Management",
      explanation: "Production storage contains application binaries, logs, databases, temporary files, backups, and persistent data. Disk exhaustion can prevent services from starting, stop databases from writing, and cause logging failures. Both filesystem capacity and inode availability must be monitored. Storage latency can make applications slow even when CPU utilization is low. Administrators should identify the affected filesystem, locate large directories, inspect deleted-but-open files, and understand mount dependencies before deleting data. Database and application data must never be removed without an approved retention or recovery procedure.",
      steps: [
        "Check filesystem capacity and inode availability.",
        "Identify the affected mount point.",
        "Locate large directories and files.",
        "Inspect log growth and retention.",
        "Check deleted files still held open.",
        "Measure storage latency and utilization.",
        "Clean only approved data.",
        "Verify application writes after recovery."
      ],
      commands: [
        "df -hT",
        "df -i",
        "du -xhd1 /var",
        "du -sh /var/log/*",
        "find /var/log -type f -size +500M",
        "lsof +L1",
        "lsblk -f",
        "iostat -xz 1 5"
      ],
      problems: [
        {
          issue: "A production application fails because the filesystem is full.",
          rootCause: "Logs, backups, temporary data, or application files consumed available capacity.",
          solution: "Identify the largest consumers, follow retention policy, archive approved data, and expand storage if required."
        },
        {
          issue: "Disk space does not return after deleting a large log.",
          rootCause: "A running process may still hold the deleted file open.",
          solution: "Use lsof +L1 to identify the process and perform a controlled log reopen or service restart."
        }
      ]
    },
    {
      heading: "10. Production Network and Connectivity",
      explanation: "Production applications depend on DNS, routing, firewall rules, listening sockets, TLS, and upstream connectivity. A process can be healthy while clients cannot reach it because the network path is broken. Administrators should inspect local interfaces, routes, DNS resolution, socket listeners, connection states, and firewall rules. For HTTPS services, certificate expiry and TLS configuration must also be checked. Network troubleshooting should test from the server and from an external client to distinguish local application failures from network-path failures.",
      steps: [
        "Inspect interface addresses and link status.",
        "Verify default and application-specific routes.",
        "Resolve required DNS names.",
        "Check listening ports and connection states.",
        "Test local application connectivity.",
        "Test remote connectivity from a client network.",
        "Inspect firewall, proxy, and TLS configuration.",
        "Correlate failures with application logs."
      ],
      commands: [
        "ip address",
        "ip route",
        "ip link",
        "ss -lntup",
        "ss -s",
        "getent hosts example.com",
        "dig example.com",
        "curl -Iv https://example.com",
        "nc -vz server.example.com 443"
      ],
      problems: [
        {
          issue: "The application works locally but external clients cannot connect.",
          rootCause: "Firewall rules, routing, security groups, network ACLs, or reverse proxy configuration may block traffic.",
          solution: "Compare local and remote tests, inspect listening addresses, firewall rules, cloud policies, and proxy logs."
        },
        {
          issue: "Requests fail intermittently because of DNS.",
          rootCause: "Resolver configuration, DNS server availability, caching, or incorrect records may cause inconsistent resolution.",
          solution: "Inspect resolver configuration, compare DNS answers, and verify record values and TTLs."
        }
      ]
    },
    {
      heading: "11. Production Logging and Incident Evidence",
      explanation: "Logs are essential for diagnosing production failures. Linux administrators use the systemd journal, application logs, authentication logs, reverse proxy logs, database logs, and kernel messages. Useful logs contain timestamps, severity, request identifiers, and error context. Centralized logging helps correlate events across multiple hosts. During an incident, preserve the relevant time window and avoid deleting evidence. Sensitive information such as passwords, access tokens, and personal data should not be written to unrestricted logs.",
      steps: [
        "Record the incident start time and affected service.",
        "Inspect systemd journal entries.",
        "Read application and proxy logs.",
        "Check kernel and authentication messages.",
        "Correlate timestamps across hosts.",
        "Find the earliest relevant error.",
        "Preserve evidence according to retention policy.",
        "Protect sensitive information in operational reports."
      ],
      commands: [
        "journalctl -xe",
        "journalctl -u application.service --since '1 hour ago'",
        "journalctl -p err -b",
        "dmesg -T | tail -100",
        "tail -f /var/log/nginx/error.log",
        "grep -iE 'error|failed|timeout|fatal' /var/log/application.log",
        "last -x",
        "ausearch -m AVC -ts recent"
      ],
      problems: [
        {
          issue: "The team cannot determine when a failure started.",
          rootCause: "Logs are spread across systems, timestamps are inconsistent, or retention is insufficient.",
          solution: "Use synchronized time, centralized logging, consistent timestamps, and suitable retention."
        },
        {
          issue: "Logs contain credentials or sensitive values.",
          rootCause: "Application logging includes request headers, environment values, or secrets.",
          solution: "Mask sensitive fields, restrict log access, rotate exposed credentials, and correct application logging."
        }
      ]
    },
    {
      heading: "12. Production Incident Response and Escalation",
      explanation: "Incident response is a structured process for restoring service and reducing business impact. Initial priorities are understanding scope, protecting data, communicating impact, and stabilizing the service. Administrators should establish a timeline, identify an incident owner, collect evidence, and coordinate recovery actions. High-risk operations such as database restoration, filesystem repair, or broad process termination require explicit approval and a tested procedure. Escalate to application, database, network, cloud, or security teams when evidence points outside the Linux host.",
      steps: [
        "Acknowledge the alert and record the incident time.",
        "Determine affected users, services, and regions.",
        "Assign an incident owner.",
        "Collect system and application evidence.",
        "Identify the highest-impact failure.",
        "Choose a safe mitigation or rollback.",
        "Communicate status and recovery progress.",
        "Complete a post-incident review."
      ],
      commands: [
        "date -Is",
        "uptime",
        "systemctl --failed",
        "journalctl -p err --since '30 minutes ago'",
        "df -h",
        "free -h",
        "ss -s",
        "ps aux --sort=-%cpu | head"
      ],
      problems: [
        {
          issue: "Multiple teams perform conflicting recovery actions.",
          rootCause: "There is no clear incident owner or shared record of actions.",
          solution: "Assign an incident commander, record decisions, coordinate changes, and maintain one incident timeline."
        },
        {
          issue: "A recovery action creates data loss.",
          rootCause: "The action was performed without checking data dependencies or recovery requirements.",
          solution: "Stop destructive activity, preserve evidence, involve the data owner, and follow the approved restore procedure."
        }
      ]
    },
    {
      heading: "13. Production Backup and Disaster Recovery",
      explanation: "Backups protect production data against accidental deletion, hardware failure, corruption, ransomware, and operational mistakes. A backup strategy defines protected data, frequency, retention, encryption, offsite copies, access control, and restore testing. A successful backup command does not prove that data can be restored. Recovery Point Objective describes acceptable data loss. Recovery Time Objective describes acceptable recovery duration. Database backups must use database-consistent methods. Disaster recovery plans should document dependencies, credentials, network configuration, DNS changes, and application validation.",
      steps: [
        "Identify critical application and database data.",
        "Define RPO and RTO with business owners.",
        "Choose a consistent backup method.",
        "Encrypt backups and restrict access.",
        "Store copies outside the primary failure domain.",
        "Monitor backup completion and retention.",
        "Perform regular restore tests.",
        "Document recovery steps and ownership."
      ],
      commands: [
        "tar -czf application-backup.tar.gz /opt/application",
        "rsync -avh /data/ /backup/data/",
        "sha256sum application-backup.tar.gz",
        "df -h",
        "find /backup -type f -mtime +30",
        "systemctl status backup.service",
        "journalctl -u backup.service -n 100"
      ],
      problems: [
        {
          issue: "A backup job succeeds but restoration fails.",
          rootCause: "The backup may be incomplete, corrupted, inconsistent, or missing required metadata.",
          solution: "Validate checksums, test restores regularly, include configuration and dependencies, and verify application consistency."
        },
        {
          issue: "Disaster recovery takes longer than the business target.",
          rootCause: "Recovery steps, transfer capacity, infrastructure provisioning, or dependencies were not tested.",
          solution: "Run timed recovery exercises, automate repeatable steps, and revise capacity and recovery objectives."
        }
      ]
    },
    {
      heading: "14. Production Security and Access Management",
      explanation: "Production servers contain sensitive data and critical services. Access should follow least privilege, individual accounts, controlled SSH authentication, audited privilege escalation, patch management, and network restrictions. Root access should be limited and monitored. Services should run with dedicated accounts and only required permissions. Firewall rules should expose only necessary ports. Security monitoring should detect suspicious authentication, unexpected privileged processes, unauthorized file changes, and unusual network activity. Suspected compromise must be handled through the security incident process while preserving evidence.",
      steps: [
        "Use individual administrator accounts.",
        "Restrict SSH access to approved sources.",
        "Use secure authentication methods.",
        "Apply least privilege through sudo rules.",
        "Run applications as dedicated service users.",
        "Patch supported packages and operating systems.",
        "Review firewall rules and listening ports.",
        "Monitor authentication and privileged activity."
      ],
      commands: [
        "ss -lntup",
        "sshd -T",
        "sudo -l",
        "last -a",
        "lastb",
        "journalctl -u sshd",
        "getent passwd",
        "systemctl status firewalld",
        "getenforce"
      ],
      problems: [
        {
          issue: "An unknown login appears on a production server.",
          rootCause: "Credentials may have been compromised or access controls may be too permissive.",
          solution: "Follow the security incident process, preserve authentication logs, restrict affected access, rotate credentials, and investigate."
        },
        {
          issue: "An application requires root privileges to access one directory.",
          rootCause: "Directory ownership or permissions were configured incorrectly.",
          solution: "Correct ownership and grant the service account only the required access instead of running it as root."
        }
      ]
    },
    {
      heading: "15. Production Capacity Planning and Scaling",
      explanation: "Capacity planning ensures infrastructure can handle normal and peak workloads. Administrators track CPU, memory, storage, network throughput, process counts, connection pools, and application latency over time. A single snapshot cannot reveal growth trends or seasonal demand. Capacity decisions should use historical metrics, expected traffic, performance tests, and failure headroom. Scaling may involve increasing instance size, adding application replicas, optimizing database access, or separating background workers. Scaling without identifying the bottleneck can increase cost without improving performance.",
      steps: [
        "Collect historical resource utilization.",
        "Identify peak and average workload patterns.",
        "Measure application latency and throughput.",
        "Find the current infrastructure bottleneck.",
        "Estimate expected traffic growth.",
        "Define safe utilization and failure headroom.",
        "Test scaling options under representative load.",
        "Review capacity regularly."
      ],
      commands: [
        "sar -u",
        "sar -r",
        "sar -d",
        "uptime",
        "free -h",
        "df -h",
        "iostat -xz 1 5",
        "ss -s"
      ],
      problems: [
        {
          issue: "A server performs well normally but fails during traffic peaks.",
          rootCause: "Capacity planning did not account for peak concurrency, resource contention, or dependency limits.",
          solution: "Use historical metrics and load tests, identify the bottleneck, and scale or optimize the constrained layer."
        },
        {
          issue: "Adding application servers does not improve performance.",
          rootCause: "The bottleneck may be a shared database, connection pool, network dependency, or external API.",
          solution: "Trace the complete request path and optimize the actual constrained dependency."
        }
      ]
    },
    {
      heading: "16. Production Automation and Scheduled Operations",
      explanation: "Automation reduces repetitive manual work and improves operational consistency. Linux production environments use shell scripts, cron, systemd timers, configuration management, and CI/CD pipelines. Automated tasks may rotate logs, collect metrics, verify backups, clean approved temporary files, or perform health checks. Automation must use safe paths, validated inputs, controlled permissions, logging, locking, and clear exit codes. Destructive cleanup jobs should have dry-run or review modes. A scheduled task existing does not prove that it completed successfully.",
      steps: [
        "Identify a repeatable operational task.",
        "Write and review the automation script.",
        "Validate input paths and permissions.",
        "Add logging and meaningful exit codes.",
        "Prevent overlapping executions where necessary.",
        "Schedule using cron or systemd timers.",
        "Monitor job completion and failures.",
        "Test recovery behavior."
      ],
      commands: [
        "crontab -l",
        "systemctl list-timers",
        "systemctl status backup.timer",
        "journalctl -u backup.service",
        "bash -n maintenance.sh",
        "chmod 750 maintenance.sh",
        "flock -n /var/lock/maintenance.lock command",
        "logger 'Production maintenance started'"
      ],
      problems: [
        {
          issue: "A scheduled script works manually but fails under cron.",
          rootCause: "Cron has a limited environment, different PATH, working directory, and permissions.",
          solution: "Use absolute paths, define required environment variables, set the working directory, and capture output."
        },
        {
          issue: "A cleanup script deletes files still needed by an application.",
          rootCause: "The cleanup logic has no ownership validation, retention policy, or safe scope.",
          solution: "Restrict deletion paths, implement dry-run output, validate file age and ownership, and obtain approval."
        }
      ]
    },
    {
      heading: "17. Production Monitoring, Alerting, and Observability",
      explanation: "Monitoring measures infrastructure and service health. Observability combines metrics, logs, and traces to explain system behavior. Linux production monitoring commonly tracks CPU, memory, disk, filesystem inodes, network traffic, process count, service availability, and application response time. Prometheus and exporters can collect metrics, Grafana can display dashboards, and alerting systems can notify responders. Alerts should be actionable, have clear severity, and link to a runbook. Monitoring should detect both infrastructure saturation and application-level failures such as increased error rates or slow requests.",
      steps: [
        "Define service-level indicators and objectives.",
        "Collect host and application metrics.",
        "Centralize logs with consistent timestamps.",
        "Add request tracing where appropriate.",
        "Create dashboards for critical dependencies.",
        "Configure actionable alert thresholds.",
        "Link alerts to diagnostic runbooks.",
        "Test alert delivery and escalation."
      ],
      commands: [
        "systemctl is-active application.service",
        "uptime",
        "free -h",
        "df -h",
        "ss -s",
        "pidstat 1",
        "journalctl -p warning -b",
        "curl -fsS http://127.0.0.1:8080/health"
      ],
      problems: [
        {
          issue: "Monitoring reports healthy while customers experience errors.",
          rootCause: "The check verifies only that a process exists and not that the application can serve requests.",
          solution: "Add readiness and dependency checks, monitor error rate and latency, and test the customer request path."
        },
        {
          issue: "Alert fatigue causes responders to ignore notifications.",
          rootCause: "Thresholds are noisy, duplicated, or lack severity and useful context.",
          solution: "Tune evaluation windows, group related alerts, assign severity, and include runbook instructions."
        }
      ]
    },
    {
      heading: "18. Production Change Management and Rollback",
      explanation: "Change management controls modifications to production infrastructure and applications. A change record should identify purpose, scope, owner, expected impact, implementation steps, validation criteria, maintenance window, and rollback plan. Changes should be tested in a lower environment whenever possible. Configuration files should be backed up or managed through version control. During implementation, operators should monitor service health and stop when failure conditions occur. Rollback must restore a known working state without damaging persistent data. Emergency changes should also be documented and reviewed afterward.",
      steps: [
        "Create a change record with scope and owner.",
        "Assess risk and customer impact.",
        "Test the change in a lower environment.",
        "Back up configuration and required data.",
        "Define success and rollback criteria.",
        "Apply the change during the approved window.",
        "Validate service and business functionality.",
        "Document results and unexpected behavior."
      ],
      commands: [
        "cp -a /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup",
        "nginx -t",
        "systemctl reload nginx",
        "systemctl status nginx",
        "journalctl -u nginx --since '10 minutes ago'",
        "diff -u /etc/nginx/nginx.conf.backup /etc/nginx/nginx.conf",
        "curl -fsS http://127.0.0.1/health"
      ],
      problems: [
        {
          issue: "A production change causes repeated service failures.",
          rootCause: "The change introduced an incompatible setting or dependency.",
          solution: "Stop further rollout, restore the last known-good configuration, validate health, and investigate the change."
        },
        {
          issue: "Rollback restores application files but the application still fails.",
          rootCause: "Database schema, persistent data, secrets, or external dependencies were not rolled back or remain incompatible.",
          solution: "Use a coordinated rollback plan that accounts for application version, schema compatibility, configuration, and dependencies."
        }
      ]
    },
    {
      heading: "19. Real-World Production Project and Troubleshooting Runbook",
      explanation: "Consider a production Linux application hosted behind NGINX with multiple application instances and a database. Customers report slow responses and occasional HTTP 502 errors. The operations engineer first records the incident time and scope. The engineer checks NGINX errors, application service state, process count, CPU, memory, disk, network connectivity, and database reachability. Logs reveal that application workers are restarting because memory usage exceeds a configured limit. The team compares the current release with the previous release, confirms the memory increase, and rolls back according to the deployment plan. Health checks and customer requests are tested. The incident review identifies missing memory alerts and insufficient load testing.",
      steps: [
        "Record the incident ID, time, symptoms, and affected users.",
        "Check NGINX status and HTTP response codes.",
        "Inspect application service state and restart history.",
        "Check CPU, memory, disk, and process count.",
        "Inspect application logs and kernel OOM messages.",
        "Check database and upstream connectivity.",
        "Compare recent releases and configuration changes.",
        "Apply the approved mitigation or rollback.",
        "Run health checks and customer-path tests.",
        "Document root cause and preventive actions."
      ],
      commands: [
        "systemctl status nginx",
        "journalctl -u nginx --since '30 minutes ago'",
        "systemctl status application.service",
        "journalctl -u application.service --since '30 minutes ago'",
        "free -h",
        "ps aux --sort=-%mem | head",
        "dmesg -T | grep -i -E 'oom|killed process'",
        "df -h",
        "ss -lntup",
        "curl -I http://127.0.0.1"
      ],
      problems: [
        {
          issue: "NGINX returns HTTP 502 while the server itself responds to SSH.",
          rootCause: "The application upstream may be stopped, restarting, overloaded, or listening on the wrong port.",
          solution: "Check the upstream service, listening socket, application logs, proxy configuration, and recent deployment."
        },
        {
          issue: "The application becomes healthy after restart but fails again under traffic.",
          rootCause: "A memory leak, resource limit, connection exhaustion, or workload-dependent defect may remain.",
          solution: "Collect metrics during load, inspect process growth and application profiles, and fix the underlying defect rather than repeatedly restarting."
        }
      ]
    },
    {
      heading: "20. Linux Production Interview Questions and Answers",
      explanation: "Production support interviews evaluate practical troubleshooting, service management, incident response, monitoring, performance, deployment, backup, security, and communication. Answers should explain the diagnostic sequence, the evidence required, the safe corrective action, and how the engineer verifies recovery. Avoid saying that every problem can be fixed by restarting a service. A strong production engineer identifies the root cause, protects data, follows change procedures, communicates clearly, and introduces preventive monitoring or automation.",
      steps: [
        "Explain the production architecture before troubleshooting.",
        "Start with impact, scope, and incident timeline.",
        "Use logs and metrics to identify evidence.",
        "Distinguish symptoms from root causes.",
        "Choose safe and reversible recovery actions.",
        "Verify recovery through health checks.",
        "Document the incident and preventive actions."
      ],
      commands: [
        "uptime",
        "systemctl --failed",
        "journalctl -p err -b",
        "free -h",
        "df -h",
        "ss -lntup",
        "ps aux --sort=-%cpu | head",
        "curl -fsS http://127.0.0.1/health"
      ],
      interviewQuestions: [
        {
          question: "1. What is a Linux production environment?",
          answer: "It is the live infrastructure that runs applications and services for real users. It requires controlled changes, monitoring, security, backups, and reliable recovery procedures."
        },
        {
          question: "2. What are your first steps when a production server is reported down?",
          answer: "I confirm the impact and affected systems, check reachability, uptime, service state, resource utilization, and logs. I communicate with the incident owner and follow the recovery procedure."
        },
        {
          question: "3. How do you check failed systemd services?",
          answer: "I use systemctl --failed to list failed units. Then I inspect the relevant service with systemctl status and journalctl -u to identify the failure reason."
        },
        {
          question: "4. What is the difference between restart and reload?",
          answer: "Restart stops and starts a service. Reload asks a service to reread configuration without a full stop when the application supports it."
        },
        {
          question: "5. How do you troubleshoot a service that fails to start?",
          answer: "I inspect service status, journal logs, configuration syntax, executable paths, permissions, dependencies, and port conflicts. I fix the identified cause before starting it again."
        },
        {
          question: "6. How do you identify high CPU processes?",
          answer: "I use top, ps aux --sort=-%cpu, mpstat, and pidstat. I inspect the process and its threads, then correlate usage with traffic and application logs."
        },
        {
          question: "7. What does Linux load average indicate?",
          answer: "It represents average system load over one, five, and fifteen minutes. It includes runnable tasks and tasks in uninterruptible sleep, so it must be interpreted with CPU and I/O metrics."
        },
        {
          question: "8. How do you troubleshoot high memory usage?",
          answer: "I check free -h, process memory, swap activity, cgroup limits, and kernel OOM logs. I identify the process causing growth before deciding whether optimization or capacity changes are required."
        },
        {
          question: "9. What is an OOM killer?",
          answer: "The Linux kernel may invoke its Out Of Memory mechanism when memory allocation cannot be satisfied. It selects a process to terminate to protect system stability."
        },
        {
          question: "10. How do you troubleshoot a full filesystem?",
          answer: "I use df -h and df -i, then locate large directories with du. I inspect log retention and deleted-but-open files. I remove only approved data or request storage expansion."
        },
        {
          question: "11. Why does disk space not return after deleting a file?",
          answer: "A running process may still hold the deleted file open. I use lsof +L1 to identify it and arrange a safe log reopen or service restart."
        },
        {
          question: "12. How do you troubleshoot HTTP 502 errors?",
          answer: "I inspect reverse proxy logs, upstream service status, listening ports, application logs, network connectivity, and recent deployments. A 502 often means the proxy cannot obtain a valid upstream response."
        },
        {
          question: "13. What is a production deployment workflow?",
          answer: "It includes artifact validation, approval, backup, deployment, configuration validation, health checks, monitoring, and rollback readiness."
        },
        {
          question: "14. What is a rollback plan?",
          answer: "It is a tested procedure to restore the previous known-good application or configuration when a release fails. It must consider data and database compatibility."
        },
        {
          question: "15. What is the difference between blue-green and canary deployment?",
          answer: "Blue-green maintains two environments and switches traffic between them. Canary gradually sends a small portion of traffic to the new release before increasing exposure."
        },
        {
          question: "16. How do you investigate an application that keeps restarting?",
          answer: "I inspect systemd restart history, application logs, exit codes, dependencies, resource limits, and kernel messages. I look for the original failure instead of repeatedly restarting it."
        },
        {
          question: "17. What is a process leak?",
          answer: "A process leak occurs when an application creates processes or threads without properly releasing them. It can increase resource usage and eventually affect service stability."
        },
        {
          question: "18. What is a zombie process?",
          answer: "A zombie is a terminated child process whose exit status has not yet been collected by its parent. I inspect the parent process and application behavior rather than trying to kill the zombie directly."
        },
        {
          question: "19. What is a D-state process?",
          answer: "A D-state process is in uninterruptible sleep, commonly while waiting for I/O. I investigate storage, filesystem, network filesystem, and kernel issues."
        },
        {
          question: "20. How do you troubleshoot DNS problems?",
          answer: "I use getent hosts and dig, inspect resolver configuration, compare answers, and test connectivity to the resolved address. I also verify DNS records and TTL."
        },
        {
          question: "21. What is the purpose of centralized logging?",
          answer: "It collects logs from multiple systems in one searchable location. It helps correlate events, investigate incidents, monitor patterns, and preserve operational evidence."
        },
        {
          question: "22. What is the difference between monitoring and observability?",
          answer: "Monitoring detects known conditions using metrics and alerts. Observability uses metrics, logs, and traces to help explain unknown system behavior."
        },
        {
          question: "23. What are RPO and RTO?",
          answer: "RPO is the maximum acceptable amount of data loss measured in time. RTO is the target time to restore a service after disruption."
        },
        {
          question: "24. Why must backups be tested?",
          answer: "A completed backup does not prove that data can be restored. Restore tests verify integrity, completeness, recovery steps, and actual recovery duration."
        },
        {
          question: "25. What is least privilege?",
          answer: "It means giving users and services only the permissions required for their tasks. It reduces the impact of mistakes and compromised accounts."
        },
        {
          question: "26. How do you troubleshoot a port conflict?",
          answer: "I use ss -lntup to identify the process listening on the port. I inspect its service configuration and resolve the conflict through an approved change."
        },
        {
          question: "27. What should a production incident report contain?",
          answer: "It should contain impact, timeline, affected services, detection method, root cause, recovery actions, communication, and preventive follow-up tasks."
        },
        {
          question: "28. What is capacity planning?",
          answer: "It uses historical utilization, workload forecasts, performance tests, and service objectives to ensure sufficient resources for expected traffic and failure headroom."
        },
        {
          question: "29. How do you verify that a production issue is resolved?",
          answer: "I check service state, application health endpoints, logs, resource metrics, dependency connectivity, and real user-path tests. I continue monitoring for recurrence."
        },
        {
          question: "30. What makes a good Linux production support engineer?",
          answer: "Strong troubleshooting, Linux knowledge, monitoring, security awareness, safe change management, clear communication, documentation, automation, and root cause analysis."
        }
      ]
    }
  ]
};

export default data;
