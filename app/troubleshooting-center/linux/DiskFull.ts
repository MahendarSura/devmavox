
export interface DiskFullGuide {
  id: string;
  title: string;
  category: string;
  severity: string[];
  overview: string;
  symptoms: string[];
  incidentScenario: string;
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    interpretResults: string[];
    nextAction: string[];
  }[];
  rootCauseMatrix: {
    cause: string;
    evidence: string[];
    resolution: string[];
    prevention: string[];
  }[];
  recoveryRunbook: {
    phase: string;
    actions: string[];
    validation: string[];
  }[];
  productionScenarios: {
    scenario: string;
    symptoms: string[];
    investigation: string[];
    resolution: string[];
    prevention: string[];
  }[];
  prevention: string[];
  monitoring: string[];
  ciChecks: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    lab: string;
    steps: string[];
    expectedLearning: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  references: string[];
}

export const diskFullGuide: DiskFullGuide = {
  id: "linux-disk-full",
  title: "Linux Disk Full — Production Troubleshooting",
  category: "Linux / Storage / Production Operations",

  severity: [
    "SEV-1: Critical production services unavailable, database writes failing, or multiple critical systems affected.",
    "SEV-2: Important application, deployment, logging, or database operations impaired.",
    "SEV-3: One host or non-critical filesystem affected with a viable workaround.",
    "SEV-4: Capacity warning with no current service impact."
  ],

  overview: `
A Linux disk-full incident occurs when a filesystem cannot allocate additional
blocks or inodes. Symptoms can include failed writes, application errors,
database failures, failed deployments, missing logs, container failures,
read-only filesystems, and services that cannot start.

Do not assume that a filesystem displaying 100% usage always needs file deletion.
The cause could be block exhaustion, inode exhaustion, reserved blocks, deleted
files still held open by processes, filesystem metadata problems, a mount failure,
container storage growth, a runaway log, or a volume that has reached its capacity.

The correct approach is to identify the affected mount, preserve evidence,
measure the source of consumption, determine the owning workload, and make the
smallest safe correction.
`,

  symptoms: [
    "df -h shows a filesystem at or near 100%.",
    "df -i shows IUse% at or near 100% although df -h shows free space.",
    "No space left on device errors during application writes.",
    "Applications fail to create temporary files, sockets, caches, or uploads.",
    "Database writes, transaction logs, checkpoints, or backups fail.",
    "CI/CD deployment fails while extracting packages or building artifacts.",
    "Docker image pulls, container starts, or image builds fail.",
    "System logs stop growing or log rotation fails.",
    "SSH sessions, shells, package managers, or system services behave unexpectedly.",
    "A filesystem changes to read-only mode after an I/O or filesystem error.",
    "A cloud volume has been expanded but the partition or filesystem still shows its old size.",
    "du reports less usage than df because deleted files remain open or files are hidden under mount points."
  ],

  incidentScenario: `
At 10:15 AM, a production API begins returning HTTP 500 errors.
The application log reports "No space left on device". The deployment team
also reports that a release cannot be unpacked. The host is still reachable
over SSH, and monitoring shows the root filesystem at 100%.

The engineer must determine:
1. Which mount is actually exhausted?
2. Is the problem blocks, inodes, reserved space, or a different storage layer?
3. Which directories, files, or processes account for the usage?
4. Did logs, temporary data, uploads, backups, container layers, or application
   artifacts grow unexpectedly?
5. Can the issue be corrected without deleting business data?
6. Which services require recovery or validation after space is restored?
`,

  impactAssessment: [
    "Confirm whether the affected environment is production, staging, development, or a disaster-recovery system.",
    "Identify the host, cloud instance, cluster, availability zone, and business owner.",
    "Determine which mount is affected: /, /var, /var/log, /tmp, /home, application data, database storage, or a separate volume.",
    "Identify affected applications, databases, queues, deployment agents, container runtimes, and monitoring agents.",
    "Determine whether reads still work while writes fail.",
    "Check whether the filesystem is completely full or simply above a configured alert threshold.",
    "Establish the incident start time and correlate it with deployments, traffic spikes, batch jobs, backup jobs, log rotation, and volume changes.",
    "Check whether one host, an entire autoscaling group, a Kubernetes node pool, or multiple availability zones are affected.",
    "Determine whether the system has redundant healthy instances and whether traffic can safely be shifted.",
    "Check whether data loss, failed transactions, incomplete backups, or failed database recovery could have occurred.",
    "Declare severity according to service impact and the organization's incident policy."
  ],

  safetyChecks: [
    "Verify the hostname, environment, cloud account, instance ID, and affected application before making changes.",
    "Check change-management requirements and obtain approval before production cleanup, volume modification, or service restarts.",
    "Capture current filesystem, inode, mount, process, and log evidence before cleanup.",
    "Do not run broad destructive commands such as rm -rf /var/*, rm -rf /tmp/*, find / -delete, or indiscriminate Docker pruning.",
    "Never delete database data files, database transaction logs, WAL files, object-store metadata, or backup chains simply because they consume space.",
    "Do not truncate active logs without confirming the owning process, retention requirements, and operational approval.",
    "Do not assume every large file is disposable. Identify the owner and purpose first.",
    "Confirm backups and recovery options before touching application data or database files.",
    "Check whether the affected filesystem is mounted read-only or has reported I/O errors. If so, investigate storage health before cleanup.",
    "Avoid running expensive recursive scans across busy production filesystems without assessing I/O impact.",
    "Prefer approved log rotation, retention cleanup, workload throttling, or a planned capacity expansion over arbitrary deletion.",
    "Keep commands read-only until the evidence supports a specific remediation."
  ],

  evidenceCollection: [
    "Record incident ID, UTC timestamp, local timestamp, hostname, environment, and operator.",
    "Save output from df -hT, df -i, findmnt, lsblk, and mount.",
    "Record relevant filesystem and mount options.",
    "Record the largest directories and files on the affected filesystem.",
    "Record open deleted files using lsof where available.",
    "Collect process, service, container, and deployment activity associated with the time of the increase.",
    "Inspect journal and application logs for ENOSPC, EDQUOT, I/O errors, and read-only filesystem messages.",
    "Record cloud block-volume size, filesystem size, and recent volume modifications where applicable.",
    "Record inode usage separately from block usage.",
    "Capture relevant Docker, containerd, Kubernetes, database, and log-rotation evidence if those systems are involved.",
    "Save command outputs to an approved incident evidence location with sufficient space on a different healthy filesystem."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the host and reproduce the symptom safely",
      objective: "Make sure the engineer is investigating the correct machine and incident.",
      commands: [
        "date -Is",
        "hostnamectl",
        "hostname -f",
        "uptime",
        "id",
        "df -hT",
        "df -i"
      ],
      interpretResults: [
        "df -hT shows filesystem type, total size, used space, available space, and mount point.",
        "A filesystem at 100% usage requires investigation, but a high percentage alone does not identify the cause.",
        "df -i shows inode consumption. IUse% at 100% can prevent creation of new files even when block space remains.",
        "Check whether the failure concerns a different mount from the one initially suspected."
      ],
      nextAction: [
        "Record the exact affected mount and filesystem type.",
        "If no filesystem is full, investigate user quotas, container ephemeral storage limits, temporary filesystem limits, or application-specific limits.",
        "Continue with block and inode checks before deleting anything."
      ]
    },
    {
      step: 2,
      title: "Identify the filesystem backing the failing path",
      objective: "Determine which device and mount serve the path where writes fail.",
      commands: [
        "findmnt -T /",
        "findmnt -T /var/log",
        "findmnt -T /tmp",
        "findmnt -T /var/lib/docker",
        "findmnt -T /var/lib/containerd",
        "findmnt -T /var/lib/kubelet",
        "findmnt -T /path/to/failing/directory",
        "lsblk -o NAME,TYPE,SIZE,FSTYPE,FSAVAIL,FSUSE%,MOUNTPOINTS",
        "df -hT /path/to/failing/directory"
      ],
      interpretResults: [
        "findmnt -T reports the mount that actually backs a path.",
        "A directory may be on a separate volume; root filesystem usage may be unrelated.",
        "Docker, containerd, kubelet, database data, and application uploads may use dedicated mounts.",
        "A path expected to be on a separate volume may actually be on root if the mount failed or was not configured."
      ],
      nextAction: [
        "Focus all further measurements on the filesystem backing the failing path.",
        "If an expected mount is missing, inspect mount and boot logs before creating or deleting files under that directory.",
        "Never blindly mount or format a device based only on a directory name."
      ]
    },
    {
      step: 3,
      title: "Distinguish block exhaustion from inode exhaustion",
      objective: "Determine what resource has been exhausted.",
      commands: [
        "df -hT /path/to/failing/directory",
        "df -i /path/to/failing/directory",
        "stat -f /path/to/failing/directory",
        "findmnt -no SOURCE,FSTYPE,OPTIONS -T /path/to/failing/directory"
      ],
      interpretResults: [
        "Blocks full and inodes available: investigate large files, logs, artifacts, container layers, backups, or data growth.",
        "Inodes full and blocks available: investigate directories containing huge numbers of small files, caches, mail queues, sessions, or temporary files.",
        "Both full: investigate both large-file consumption and small-file proliferation.",
        "Filesystem reports free capacity but the application still receives ENOSPC: inspect quotas, project quotas, tmpfs limits, overlay filesystems, and application-specific storage constraints."
      ],
      nextAction: [
        "For block exhaustion, proceed to directory and file accounting.",
        "For inode exhaustion, count files and identify directories generating them.",
        "If quotas may apply, ask the storage administrator to inspect the applicable user, group, or project quota."
      ]
    },
    {
      step: 4,
      title: "Find the largest directories on the affected filesystem",
      objective: "Attribute space consumption without accidentally crossing into other filesystems.",
      commands: [
        "sudo du -xhd1 / 2>/dev/null | sort -h",
        "sudo du -xhd1 /var 2>/dev/null | sort -h",
        "sudo du -xhd1 /var/log 2>/dev/null | sort -h",
        "sudo du -xhd1 /var/lib 2>/dev/null | sort -h",
        "sudo du -xhd1 /opt 2>/dev/null | sort -h",
        "sudo du -xhd1 /home 2>/dev/null | sort -h"
      ],
      interpretResults: [
        "du -x stays on the current filesystem and avoids traversing other mounted filesystems.",
        "The first scan identifies large top-level directories; repeat at the next level inside the largest directory.",
        "Permission errors can make totals incomplete. Use approved elevated access when necessary.",
        "du can be I/O intensive on large filesystems, so use a bounded scan during high-load incidents.",
        "A directory may appear small in du when space is held by deleted-but-open files or when files are hidden under a mount point."
      ],
      nextAction: [
        "Drill down into the largest relevant directory rather than scanning every directory repeatedly.",
        "Compare du totals with df totals.",
        "If df is much higher than du, inspect deleted-open files, reserved blocks, filesystem metadata, snapshots, and mount-point masking."
      ]
    },
    {
      step: 5,
      title: "Identify the largest individual files",
      objective: "Find specific candidates for investigation, not automatic deletion.",
      commands: [
        "sudo find /var -xdev -type f -size +500M -printf '%s %TY-%Tm-%Td %TH:%TM %p\\n' 2>/dev/null | sort -nr | head -50",
        "sudo find /var/log -xdev -type f -printf '%s %p\\n' 2>/dev/null | sort -nr | head -30",
        "sudo du -ahx /var/log 2>/dev/null | sort -h | tail -30",
        "sudo stat /path/to/suspected/file",
        "sudo file /path/to/suspected/file",
        "sudo lsof /path/to/suspected/file"
      ],
      interpretResults: [
        "find reports apparent file size; allocated disk blocks may differ for sparse files.",
        "A large file may be an active log, database file, backup, core dump, package cache, artifact, or legitimate application data.",
        "Check modification time and correlate growth with application or deployment activity.",
        "Do not assume an old file is unused or that a large file can safely be deleted."
      ],
      nextAction: [
        "Identify the file owner, owning process, retention policy, and business purpose.",
        "Use the relevant application or service's documented cleanup process.",
        "If no safe cleanup candidate exists, consider controlled capacity expansion or workload throttling."
      ]
    },
    {
      step: 6,
      title: "Investigate deleted files that still consume disk space",
      objective: "Find storage held by files that have been unlinked but remain open.",
      commands: [
        "sudo lsof +L1",
        "sudo lsof +L1 2>/dev/null | sort -k7,7n",
        "sudo lsof -nP +L1 | grep -E 'deleted|COMMAND'",
        "sudo ls -l /proc/<PID>/fd"
      ],
      interpretResults: [
        "A file marked deleted can continue consuming space while a process holds an open file descriptor.",
        "df may show a full filesystem while du cannot find the deleted file.",
        "lsof output includes process and file-descriptor information; check the size and owning service.",
        "Do not write to /proc/<PID>/fd/<FD> or forcibly kill a process as a generic fix."
      ],
      nextAction: [
        "Identify the owning service and confirm whether it supports safe log reopening or file-descriptor rotation.",
        "Use the service's documented reopen signal or log-rotation procedure when appropriate.",
        "Restart a service only when necessary, approved, and safe for its workload.",
        "Recheck df -hT after the process releases the descriptor."
      ]
    },
    {
      step: 7,
      title: "Check inode exhaustion and small-file proliferation",
      objective: "Find excessive file counts when available blocks are not the main problem.",
      commands: [
        "df -i",
        "sudo find /var -xdev -type d -print0 2>/dev/null | xargs -0 -r -n 1 sh -c 'printf \"%s \" \"$1\"; find \"$1\" -maxdepth 1 -type f 2>/dev/null | wc -l' sh | sort -k2,2n | tail -30",
        "sudo find /tmp -xdev -type f 2>/dev/null | wc -l",
        "sudo find /var/tmp -xdev -type f 2>/dev/null | wc -l",
        "sudo find /var/cache -xdev -type f 2>/dev/null | wc -l"
      ],
      interpretResults: [
        "A very large number of small files can exhaust inodes without consuming all data blocks.",
        "The sample directory-count command can be expensive because it traverses directories repeatedly; do not run it unbounded on a huge production filesystem.",
        "Common sources include runaway sessions, temporary files, mail queues, cache shards, package metadata, and application-generated fragments."
      ],
      nextAction: [
        "Identify the generating application or job.",
        "Use a bounded scan or a suitable file-counting tool for large filesystems.",
        "Remove only files confirmed to be disposable under the relevant retention policy.",
        "Fix the producer or retention policy so the inode exhaustion does not recur."
      ]
    },
    {
      step: 8,
      title: "Inspect system and application logs",
      objective: "Find the event that caused storage growth and detect secondary failures.",
      commands: [
        "sudo journalctl --disk-usage",
        "sudo journalctl -p warning..alert --since '2 hours ago'",
        "sudo journalctl -k --since '2 hours ago'",
        "sudo journalctl --since '2 hours ago' | grep -Ei 'no space left|ENOSPC|read-only file system|I/O error|quota exceeded'",
        "sudo logrotate -d /etc/logrotate.conf",
        "sudo systemctl status logrotate.timer",
        "sudo systemctl list-timers --all"
      ],
      interpretResults: [
        "Rapid log growth may indicate a retry loop, debug logging, a crash loop, or an unexpected traffic spike.",
        "ENOSPC indicates an allocation failure; EDQUOT commonly indicates a quota limit.",
        "Read-only remounts and I/O errors may indicate a filesystem or underlying storage problem rather than ordinary capacity growth.",
        "logrotate debug mode simulates processing and should not rotate files. Inspect configuration and permissions before any real rotation."
      ],
      nextAction: [
        "Identify the log source and the event that caused its growth.",
        "Use approved log retention or rotation to reclaim space safely.",
        "Correct runaway logging or repeated application failures.",
        "If I/O errors or read-only remounts are present, prioritize storage health investigation."
      ]
    },
    {
      step: 9,
      title: "Check journal, package caches, and temporary storage",
      objective: "Assess potentially reclaimable system-managed space.",
      commands: [
        "sudo journalctl --disk-usage",
        "sudo du -sh /var/cache/apt /var/cache/dnf /var/cache/yum 2>/dev/null",
        "sudo du -sh /tmp /var/tmp 2>/dev/null",
        "sudo du -sh /var/cache 2>/dev/null",
        "systemctl status systemd-tmpfiles-clean.timer"
      ],
      interpretResults: [
        "Package caches can sometimes be regenerated, but verify the package manager and local operational requirements.",
        "Temporary directories may contain active sockets, locks, uploads, or application state.",
        "Journal files are managed by journald; arbitrary deletion of active journal files is unsafe.",
        "A disabled cleanup timer may explain accumulation, but verify the system's intended configuration."
      ],
      nextAction: [
        "Use the supported package-manager cleanup command only after confirming its effects.",
        "Use journalctl vacuum options only with an approved retention target.",
        "Use systemd-tmpfiles policy for managed temporary files.",
        "Do not recursively delete /tmp or /var/tmp without identifying active application dependencies."
      ]
    },
    {
      step: 10,
      title: "Inspect Docker and container storage",
      objective: "Determine whether images, writable layers, build cache, or logs consume the host filesystem.",
      commands: [
        "docker system df",
        "docker ps -a --size",
        "docker image ls",
        "docker volume ls",
        "docker inspect <container>",
        "sudo du -xhd1 /var/lib/docker 2>/dev/null | sort -h",
        "sudo du -xhd1 /var/lib/containerd 2>/dev/null | sort -h"
      ],
      interpretResults: [
        "Docker image layers, build cache, container writable layers, and container logs can consume substantial storage.",
        "Container writable-layer growth may indicate that an application is writing persistent data into the container instead of a volume.",
        "Volumes may contain critical database or business data.",
        "The Docker storage path may be configured somewhere other than /var/lib/docker."
      ],
      nextAction: [
        "Confirm the runtime storage root and identify the specific container or image consuming space.",
        "Use application-approved retention and deployment procedures.",
        "Remove only confirmed-unused resources after checking dependencies.",
        "Never prune volumes indiscriminately or manually delete files under a live runtime storage directory.",
        "Configure container log rotation and persistent volumes for stateful applications."
      ]
    },
    {
      step: 11,
      title: "Investigate Kubernetes node and ephemeral-storage pressure",
      objective: "Determine whether node storage exhaustion is affecting pods or evictions.",
      commands: [
        "kubectl get nodes",
        "kubectl describe node <node-name>",
        "kubectl get pods -A -o wide",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get events -A --sort-by=.lastTimestamp",
        "kubectl get --raw='/metrics/resource' 2>/dev/null"
      ],
      interpretResults: [
        "Node conditions and events can show DiskPressure and pod eviction activity.",
        "Ephemeral-storage requests and limits influence scheduling and enforcement but do not automatically guarantee physical disk capacity.",
        "Container logs, writable layers, image cache, emptyDir volumes, and kubelet-managed data can contribute to node pressure.",
        "A pod can fail because of its own ephemeral-storage limit even when a different host filesystem has free space."
      ],
      nextAction: [
        "Identify the affected node, pod, namespace, and storage path.",
        "Use the approved node-access method to inspect df -hT, df -i, kubelet logs, and runtime storage.",
        "Follow the cluster's node-drain and replacement procedure if node remediation requires disruption.",
        "Do not manually delete kubelet or container-runtime internal directories.",
        "If a pod is evicted, fix the storage cause and validate the workload after rescheduling."
      ]
    },
    {
      step: 12,
      title: "Check mounts, LVM, partitions, and cloud volume capacity",
      objective: "Verify whether the underlying storage was expanded correctly or a mount is missing.",
      commands: [
        "lsblk -f",
        "findmnt",
        "sudo pvs",
        "sudo vgs",
        "sudo lvs",
        "sudo fdisk -l",
        "sudo dmesg -T | grep -Ei 'I/O error|EXT4-fs error|XFS.*error|read-only|buffer I/O'",
        "df -hT"
      ],
      interpretResults: [
        "A cloud volume can be larger than the partition, logical volume, or filesystem using it.",
        "LVM volume groups may have unallocated extents, but confirm the correct logical volume and filesystem first.",
        "A missing mount can cause data to be written to the underlying root directory instead of the intended volume.",
        "I/O errors or filesystem corruption require storage-health assessment before attempting repairs."
      ],
      nextAction: [
        "Compare cloud volume size, partition size, logical volume size, and filesystem size.",
        "Use the provider- and filesystem-specific expansion procedure with approval.",
        "Do not format a device or run filesystem repair against a mounted production filesystem without an approved recovery plan.",
        "If a mount is missing, confirm its source, UUID, mount options, and underlying directory contents before mounting it."
      ]
    },
    {
      step: 13,
      title: "Investigate quota and application-specific storage limits",
      objective: "Explain ENOSPC or write failures when the filesystem appears to have capacity.",
      commands: [
        "quota -s",
        "sudo repquota -a",
        "findmnt -no SOURCE,FSTYPE,OPTIONS -T /path/to/failing/directory",
        "df -hT /path/to/failing/directory",
        "df -i /path/to/failing/directory",
        "ulimit -a"
      ],
      interpretResults: [
        "User, group, or project quotas can restrict allocation before the filesystem is globally full.",
        "EDQUOT is a strong indication of quota enforcement.",
        "ulimit -a shows process resource limits but does not itself establish a disk-capacity problem.",
        "Container writable layers, ephemeral-storage limits, tmpfs size limits, and application-specific quotas can differ from host df output."
      ],
      nextAction: [
        "Ask the storage or platform owner to verify the applicable quota and usage.",
        "Increase a quota only after confirming the workload's legitimate requirement and policy.",
        "If tmpfs is involved, inspect its mount size and memory pressure before changing limits."
      ]
    },
    {
      step: 14,
      title: "Correlate growth with processes, deployments, and traffic",
      objective: "Find the producer rather than repeatedly cleaning up its output.",
      commands: [
        "ps -eo pid,ppid,user,%cpu,%mem,etime,cmd --sort=-%mem | head -30",
        "systemctl --failed",
        "systemctl list-units --type=service --state=running",
        "sudo journalctl --since '2 hours ago' --no-pager",
        "sudo lsof +D /path/to/suspected/directory"
      ],
      interpretResults: [
        "A recent deployment, scheduled job, backup, crash loop, or retry storm may correlate with rapid storage growth.",
        "lsof +D recursively walks a directory and may be expensive; restrict its use to a small, relevant path.",
        "Process lists are snapshots and may miss short-lived jobs.",
        "A high-memory process is not necessarily responsible for disk growth; use process and file evidence together."
      ],
      nextAction: [
        "Compare file timestamps, deployment timestamps, job schedules, and application metrics.",
        "Stop or throttle a confirmed runaway producer only through the approved operational procedure.",
        "Preserve logs and evidence needed for root-cause analysis before cleanup."
      ]
    },
    {
      step: 15,
      title: "Check filesystem errors and read-only remounts",
      objective: "Distinguish normal capacity exhaustion from storage or filesystem damage.",
      commands: [
        "findmnt -no TARGET,SOURCE,FSTYPE,OPTIONS -T /path/to/failing/directory",
        "sudo journalctl -k --since '4 hours ago' | grep -Ei 'I/O error|EXT4-fs error|XFS.*error|remount.*read-only|buffer I/O'",
        "sudo dmesg -T | tail -200",
        "lsblk -f"
      ],
      interpretResults: [
        "A read-only mount or repeated I/O errors may indicate a filesystem, device, network-storage, or cloud-volume problem.",
        "Ordinary file deletion does not repair filesystem corruption or an unhealthy storage device.",
        "Do not assume a read-only filesystem can safely be switched back to read-write."
      ],
      nextAction: [
        "Escalate to the storage/platform owner and follow the documented recovery procedure.",
        "Protect data and preserve diagnostic evidence.",
        "Use filesystem-specific checks or repairs only in the appropriate maintenance or recovery environment."
      ]
    },
    {
      step: 16,
      title: "Choose a safe recovery action",
      objective: "Reclaim capacity or add capacity without damaging data.",
      commands: [
        "df -hT",
        "df -i",
        "sudo journalctl --disk-usage",
        "docker system df"
      ],
      interpretResults: [
        "Select the remediation that matches the proven cause.",
        "A large active log, deleted-open file, inode explosion, quota limit, and undersized volume require different fixes.",
        "A cleanup that briefly frees space without stopping the growth source is not a complete recovery."
      ],
      nextAction: [
        "Use the root-cause matrix and recovery runbook below.",
        "Prefer reversible and narrowly scoped changes.",
        "After every remediation, recheck the affected filesystem and the application that originally failed."
      ]
    },
    {
      step: 17,
      title: "Validate recovery and determine whether to roll back",
      objective: "Prove that storage and the affected service have recovered.",
      commands: [
        "df -hT",
        "df -i",
        "findmnt -T /path/to/failing/directory",
        "sudo journalctl -p err --since '15 minutes ago'",
        "systemctl is-active <service-name>",
        "systemctl --failed"
      ],
      interpretResults: [
        "Free space should be sufficient for normal workload, not merely one successful write.",
        "Inode usage must also have safe headroom.",
        "The filesystem should be mounted correctly and should not continue reporting I/O errors.",
        "The application may need a controlled restart or recovery procedure if writes failed during the incident."
      ],
      nextAction: [
        "Run application-level smoke tests and controlled writes using approved test paths.",
        "Check database health, queue processing, deployment status, and monitoring.",
        "If the remediation worsened service health or data integrity, stop further changes and follow the rollback or recovery plan.",
        "Continue monitoring usage growth before declaring the incident resolved."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      cause: "Large logs or runaway logging",
      evidence: [
        "du identifies log directories as major consumers.",
        "Log file timestamps and size growth correlate with repeated errors or a deployment.",
        "Application logs show retry loops, debug logging, or repeated exceptions."
      ],
      resolution: [
        "Use the approved log rotation or application-specific cleanup procedure.",
        "If an active file was unlinked and remains open, safely reopen the file or restart the owning service only when approved.",
        "Correct the noisy error or debug configuration that caused the growth."
      ],
      prevention: [
        "Configure rotation, compression, retention, and size limits.",
        "Alert on log growth rate and filesystem capacity.",
        "Test log rotation against the actual service configuration."
      ]
    },
    {
      cause: "Deleted files still held open",
      evidence: [
        "df reports high usage while du cannot account for the missing space.",
        "lsof +L1 identifies deleted files with large sizes and an owning process."
      ],
      resolution: [
        "Use the service's documented log-reopen procedure where available.",
        "Schedule a controlled restart if necessary and safe.",
        "Verify that the process releases the file descriptor and free space returns."
      ],
      prevention: [
        "Use copy-truncate or reopen-based log rotation according to application requirements.",
        "Monitor deleted-open file usage and validate rotation behavior."
      ]
    },
    {
      cause: "Inode exhaustion",
      evidence: [
        "df -i shows IUse% near 100%.",
        "Filesystem blocks may still be available.",
        "A cache, session, spool, or temporary directory contains excessive small files."
      ],
      resolution: [
        "Identify the generating workload.",
        "Remove only confirmed disposable files through an approved retention policy.",
        "Fix the application or job generating excessive files."
      ],
      prevention: [
        "Set cache expiration and temporary-file cleanup policies.",
        "Monitor inode usage independently of block usage.",
        "Load-test file-count growth for high-volume workloads."
      ]
    },
    {
      cause: "Docker images, layers, or build cache",
      evidence: [
        "docker system df reports large image or build-cache usage.",
        "The runtime storage directory accounts for a large portion of the affected filesystem."
      ],
      resolution: [
        "Remove only confirmed-unused images or cache through approved runtime commands.",
        "Check whether images are needed for rollback before removal.",
        "Move persistent application data to appropriate volumes and review build-cache retention."
      ],
      prevention: [
        "Schedule controlled image and build-cache cleanup.",
        "Configure container log rotation.",
        "Monitor runtime storage and build-agent disk capacity."
      ]
    },
    {
      cause: "Backup or artifact accumulation",
      evidence: [
        "Large dated archives or build artifacts dominate the affected mount.",
        "File timestamps align with backup jobs, builds, or failed retention tasks."
      ],
      resolution: [
        "Confirm retention, replication, and recovery requirements.",
        "Delete or expire artifacts only through the approved backup or artifact-management workflow.",
        "Verify that at least the required recoverable copies remain."
      ],
      prevention: [
        "Enforce retention and lifecycle policies.",
        "Alert when backup or artifact jobs exceed expected output sizes.",
        "Track backup completion and repository capacity."
      ]
    },
    {
      cause: "Volume or filesystem not expanded",
      evidence: [
        "The cloud volume or block device is larger than the partition, logical volume, or filesystem.",
        "df shows the previous filesystem size after a capacity change."
      ],
      resolution: [
        "Verify the device, partition table, volume group, logical volume, and filesystem.",
        "Follow the platform-specific expansion procedure with approval.",
        "Validate filesystem size and application health after expansion."
      ],
      prevention: [
        "Automate capacity checks after volume modifications.",
        "Document the full block-device-to-filesystem expansion process.",
        "Alert on growth forecasts and low free capacity."
      ]
    },
    {
      cause: "Missing mount or failed mount at boot",
      evidence: [
        "findmnt does not show the expected mount.",
        "Files are accumulating in the directory underneath the intended mount point.",
        "Boot or system logs show mount failures."
      ],
      resolution: [
        "Confirm the intended device, UUID, and mount configuration.",
        "Inspect the underlying directory before mounting over it.",
        "Restore the mount through the approved procedure and safely migrate any files created in the wrong location."
      ],
      prevention: [
        "Use mount-dependency checks and boot-time monitoring.",
        "Alert when critical mounts are missing.",
        "Test fstab or systemd mount changes before production rollout."
      ]
    },
    {
      cause: "Quota or container storage limit",
      evidence: [
        "The filesystem has available space but the workload receives EDQUOT or storage-limit errors.",
        "Quota reports or container configuration show an enforced limit."
      ],
      resolution: [
        "Verify the correct user, group, project, container, or ephemeral-storage limit.",
        "Adjust the limit only when justified by workload requirements and policy.",
        "Recheck writes under the same identity and execution environment."
      ],
      prevention: [
        "Monitor quota utilization.",
        "Set realistic storage requests and limits.",
        "Alert before workloads approach enforced limits."
      ]
    },
    {
      cause: "Database or application data growth",
      evidence: [
        "Database, WAL, transaction-log, upload, or application-data directories dominate consumption.",
        "Growth aligns with workload volume, retention failure, or a stalled archival process."
      ],
      resolution: [
        "Use database-native retention, archival, compaction, or log-management procedures.",
        "Do not manually delete database files or transaction logs.",
        "Engage the database owner when recovery, replication, or data integrity may be affected."
      ],
      prevention: [
        "Monitor database storage and transaction-log growth.",
        "Validate archival and retention jobs.",
        "Forecast storage against traffic and data-retention requirements."
      ]
    },
    {
      cause: "Filesystem or storage-device problem",
      evidence: [
        "Kernel logs report I/O errors, filesystem errors, or read-only remounts.",
        "Storage latency or device health has deteriorated."
      ],
      resolution: [
        "Escalate to the storage/platform team.",
        "Protect data and follow the filesystem-specific recovery process.",
        "Do not attempt unplanned repair operations on a live production filesystem."
      ],
      prevention: [
        "Monitor storage health, latency, and kernel errors.",
        "Test backup restoration and recovery procedures.",
        "Maintain a documented storage incident escalation path."
      ]
    }
  ],

  recoveryRunbook: [
    {
      phase: "Phase 1 — Stabilize the incident",
      actions: [
        "Declare the incident and notify the service owner.",
        "Confirm the host, environment, filesystem, and business impact.",
        "Pause or throttle a confirmed runaway job if authorized.",
        "Preserve diagnostic evidence before making changes.",
        "If redundant healthy instances exist, consider approved traffic shifting."
      ],
      validation: [
        "The scope of affected hosts and services is known.",
        "No unapproved destructive cleanup has occurred.",
        "A responsible owner has approved the next remediation."
      ]
    },
    {
      phase: "Phase 2 — Reclaim safe capacity",
      actions: [
        "Select a cleanup target supported by the evidence.",
        "Use application-native retention, package-manager cleanup, journal vacuuming, or approved log rotation.",
        "For deleted-open files, use the owning service's supported file-reopen procedure.",
        "For capacity shortages, assess controlled volume expansion.",
        "For inode exhaustion, address excessive small-file generation."
      ],
      validation: [
        "df -hT shows usable free blocks.",
        "df -i shows usable free inodes.",
        "No important data, backups, or rollback artifacts were removed.",
        "The storage growth source has been stopped or controlled."
      ]
    },
    {
      phase: "Phase 3 — Recover affected services",
      actions: [
        "Check service state and logs.",
        "Follow application-specific recovery instructions for failed writes or interrupted transactions.",
        "Restart only services that require it and have an approved restart procedure.",
        "Validate database, queue, deployment agent, container runtime, and monitoring components as applicable."
      ],
      validation: [
        "The original failing operation succeeds.",
        "Service health checks pass.",
        "No new ENOSPC, EDQUOT, or I/O errors appear.",
        "The application can read and write its expected data."
      ]
    },
    {
      phase: "Phase 4 — Decide on rollback",
      actions: [
        "Compare current behavior with the pre-incident baseline.",
        "If a deployment or configuration change caused runaway writes, follow the release rollback policy.",
        "If storage expansion introduced a problem, stop further modifications and engage the storage owner.",
        "Do not roll back database or filesystem changes blindly."
      ],
      validation: [
        "The rollback restores service without introducing data loss.",
        "Database consistency and application state are verified.",
        "The rollback decision and evidence are documented."
      ]
    },
    {
      phase: "Phase 5 — Close and monitor",
      actions: [
        "Monitor filesystem blocks, inodes, growth rate, and service health.",
        "Record the incident timeline, root cause, remediation, and remaining risks.",
        "Create corrective actions for monitoring, retention, capacity, and automation.",
        "Update the runbook with verified commands and observed outputs."
      ],
      validation: [
        "Capacity has sufficient headroom for expected workload.",
        "The incident is stable over an agreed observation window.",
        "Follow-up actions have owners and due dates."
      ]
    }
  ],

  productionScenarios: [
    {
      scenario: "Scenario 1 — /var/log filled after an application retry storm",
      symptoms: [
        "df shows /var at 100%.",
        "A service log has grown rapidly.",
        "The application reports ENOSPC and restarts repeatedly."
      ],
      investigation: [
        "Check df -hT and df -i.",
        "Use du -xhd1 /var/log and inspect the largest log.",
        "Review journalctl and application logs for the first repeated error.",
        "Check logrotate configuration and whether the active log is held open."
      ],
      resolution: [
        "Control the retry storm using the service's approved procedure.",
        "Rotate or reduce logs safely according to the service's logging model.",
        "Release deleted-open files through the supported file-reopen procedure.",
        "Validate writes and application health."
      ],
      prevention: [
        "Set log retention and rotation limits.",
        "Alert on log growth rate.",
        "Add retry backoff and log-rate controls."
      ]
    },
    {
      scenario: "Scenario 2 — df shows full, but du cannot find the space",
      symptoms: [
        "Filesystem usage is high.",
        "Visible directory sizes do not explain the total.",
        "Large logs may have been deleted recently."
      ],
      investigation: [
        "Compare df -hT with du -xhd1 on the affected mount.",
        "Run lsof +L1 and identify large deleted-open files.",
        "Check mount points, snapshots, reserved blocks, and filesystem metadata where relevant."
      ],
      resolution: [
        "If deleted-open files are confirmed, release them through the owning process's safe reopen or restart procedure.",
        "If filesystem accounting or snapshots are involved, engage the storage owner.",
        "Confirm that capacity is released before further cleanup."
      ],
      prevention: [
        "Test log rotation end to end.",
        "Monitor deleted-open file consumption.",
        "Document the difference between df and du in the operational runbook."
      ]
    },
    {
      scenario: "Scenario 3 — Inodes exhausted by application cache files",
      symptoms: [
        "df -i shows 100% inode usage.",
        "Applications cannot create files despite available data blocks.",
        "A cache or session directory contains a huge file count."
      ],
      investigation: [
        "Identify the affected filesystem with findmnt and df -i.",
        "Inspect file counts in likely cache, session, and temporary directories.",
        "Correlate creation timestamps and application logs with the growth period."
      ],
      resolution: [
        "Use the application's supported cache or session cleanup procedure.",
        "Stop the source of unbounded file creation.",
        "Validate file creation and inode headroom."
      ],
      prevention: [
        "Set cache expiration.",
        "Add inode-capacity alerts.",
        "Test maximum file counts under expected load."
      ]
    },
    {
      scenario: "Scenario 4 — Docker build agent runs out of disk space",
      symptoms: [
        "CI builds fail during image extraction or layer creation.",
        "The agent's Docker storage directory is large.",
        "New containers or image pulls fail."
      ],
      investigation: [
        "Check the agent filesystem and docker system df.",
        "Inspect container sizes and build-cache usage.",
        "Check whether the agent retains old workspaces, artifacts, or images.",
        "Verify whether required rollback images are stored locally."
      ],
      resolution: [
        "Use approved build-cache and workspace cleanup.",
        "Remove only confirmed-unused resources.",
        "Increase or separate build-agent storage if justified.",
        "Rerun a controlled build and verify image publishing."
      ],
      prevention: [
        "Use ephemeral build agents where appropriate.",
        "Set cache and artifact retention.",
        "Monitor disk capacity before builds begin."
      ]
    },
    {
      scenario: "Scenario 5 — Cloud volume expanded but Linux still shows the old size",
      symptoms: [
        "Cloud console shows a larger volume.",
        "df still reports the old filesystem capacity.",
        "The application remains close to capacity."
      ],
      investigation: [
        "Inspect lsblk -f, findmnt, pvs, vgs, and lvs as applicable.",
        "Identify the exact partition, logical volume, and filesystem.",
        "Check the provider's volume-resize operation status."
      ],
      resolution: [
        "Follow the correct provider and filesystem expansion procedure.",
        "Expand the partition or logical volume only if applicable.",
        "Grow the filesystem with the correct tool for its filesystem type.",
        "Verify the new capacity with df -hT."
      ],
      prevention: [
        "Automate post-resize verification.",
        "Document filesystem-specific growth procedures.",
        "Forecast capacity and alert before emergency expansion is required."
      ]
    },
    {
      scenario: "Scenario 6 — Database storage is nearly full",
      symptoms: [
        "Database writes or checkpoints fail.",
        "Transaction logs or WAL files grow rapidly.",
        "The database service reports storage-related errors."
      ],
      investigation: [
        "Identify the exact data and log mounts.",
        "Inspect database-native storage and replication metrics.",
        "Check archival, replication-slot, checkpoint, backup, and retention status using database-specific tools.",
        "Engage the database owner before modifying database files."
      ],
      resolution: [
        "Use database-native log retention, archival, or capacity-management procedures.",
        "Expand storage using the approved database and infrastructure procedure if necessary.",
        "Validate database consistency, replication, and application writes."
      ],
      prevention: [
        "Monitor transaction-log growth and archival lag.",
        "Alert on data and log volume capacity.",
        "Test backup restoration and database recovery procedures."
      ]
    },
    {
      scenario: "Scenario 7 — A mount failure causes unexpected root filesystem growth",
      symptoms: [
        "Root filesystem usage increases unexpectedly.",
        "A dedicated application mount is missing.",
        "Files appear under a directory normally used as a mount point."
      ],
      investigation: [
        "Compare findmnt output with the expected mount configuration.",
        "Inspect boot logs and systemd mount-unit status.",
        "Carefully inspect the underlying mount-point directory before mounting over it."
      ],
      resolution: [
        "Restore the intended mount using the approved procedure.",
        "Safely migrate files written to the wrong filesystem after confirming their purpose.",
        "Revalidate application ownership, permissions, and mount persistence."
      ],
      prevention: [
        "Monitor critical mount availability.",
        "Add service dependencies for required mounts.",
        "Test reboot and mount-failure behavior."
      ]
    },
    {
      scenario: "Scenario 8 — Kubernetes node enters DiskPressure",
      symptoms: [
        "Node conditions report DiskPressure.",
        "Pods are evicted or cannot be scheduled.",
        "Container logs, images, or ephemeral storage consume the node disk."
      ],
      investigation: [
        "Inspect node conditions, pod events, and runtime storage.",
        "Identify whether root, image storage, kubelet storage, or a separate filesystem is exhausted.",
        "Review pod ephemeral-storage requests and limits.",
        "Check recent workload changes and log growth."
      ],
      resolution: [
        "Use the approved cluster procedure to reduce load, rotate logs, or replace/drain the node.",
        "Avoid manually deleting runtime-managed data.",
        "Restore node capacity and validate rescheduled workloads."
      ],
      prevention: [
        "Set realistic ephemeral-storage requests and limits.",
        "Monitor node filesystem capacity and eviction events.",
        "Manage image and container log retention."
      ]
    }
  ],

  prevention: [
    "Set warning and critical thresholds for filesystem blocks and inodes.",
    "Monitor free bytes and percentage free, not just percentage used.",
    "Forecast capacity using growth rate and expected retention.",
    "Use separate mounts for workloads with different growth and failure characteristics.",
    "Configure log rotation, compression, and retention for system and application logs.",
    "Use application-native cleanup for caches, sessions, uploads, and temporary data.",
    "Define backup, artifact, and build-cache retention policies.",
    "Configure container log limits and monitor Docker/containerd storage.",
    "Monitor database data files, transaction logs, WAL, and archival lag.",
    "Verify critical mounts after boot and after infrastructure changes.",
    "Validate cloud-volume expansion all the way through the filesystem.",
    "Use quotas or project limits where appropriate.",
    "Test restore, rollback, and storage-recovery procedures.",
    "Add storage checks to deployment readiness and maintenance runbooks.",
    "Assign an owner and remediation deadline to every capacity alert."
  ],

  monitoring: [
    "Filesystem free bytes and used percentage by mount.",
    "Filesystem inode free count and inode utilization.",
    "Filesystem growth rate and estimated time to exhaustion.",
    "Disk I/O latency, throughput, queue depth, and I/O errors.",
    "Read-only remounts and kernel filesystem errors.",
    "Deleted-open file sizes and long-running file descriptors.",
    "Container runtime image, writable-layer, build-cache, and log consumption.",
    "Kubernetes node DiskPressure, eviction counts, and ephemeral-storage usage.",
    "Database data-volume and transaction-log growth.",
    "Backup and artifact repository capacity.",
    "Critical mount availability.",
    "Application write failures, ENOSPC, EDQUOT, and failed deployments."
  ],

  ciChecks: [
    "Add a pre-deployment capacity check for hosts expected to receive large artifacts.",
    "Fail early when the target filesystem is below the organization's approved free-space threshold.",
    "Check available inodes when builds create large numbers of small files.",
    "Use bounded artifact retention and clean disposable workspaces between builds.",
    "Set build-agent disk quotas or capacity limits where supported.",
    "Validate container log rotation and storage settings in infrastructure configuration.",
    "Check required mounts before deployment or backup jobs start.",
    "Use monitoring and alerting rather than relying exclusively on deployment-time checks.",
    "Avoid automatic deletion of production data as a CI remediation."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Environment and affected hosts:",
    "Affected filesystem and mount point:",
    "Start time, detection time, mitigation time, and recovery time:",
    "Business and customer impact:",
    "Severity and incident commander:",
    "Initial evidence: df -hT, df -i, findmnt, and relevant logs:",
    "Confirmed root cause and supporting evidence:",
    "Why alerts or safeguards did not prevent the incident:",
    "Actions taken and approvals obtained:",
    "Data integrity, backup, and rollback assessment:",
    "Post-recovery validation results:",
    "Monitoring and capacity changes:",
    "Corrective action, owner, and due date:"
  ],

  handsOnLabs: [
    {
      lab: "Lab 1 — Simulate block exhaustion safely",
      steps: [
        "Use a disposable VM and a dedicated temporary test filesystem or loopback volume.",
        "Record df -hT and df -i before the test.",
        "Create a bounded test file using an explicitly limited amount of space.",
        "Observe the filesystem usage and the application's response to insufficient space.",
        "Remove the test file and verify recovery."
      ],
      expectedLearning: "Understand block exhaustion, filesystem-specific behavior, and capacity validation without risking production data."
    },
    {
      lab: "Lab 2 — Investigate inode exhaustion",
      steps: [
        "Use a disposable filesystem with a limited inode count.",
        "Create a controlled number of tiny files.",
        "Compare df -h with df -i.",
        "Remove only the lab files and confirm inode availability returns."
      ],
      expectedLearning: "Recognize that a filesystem can run out of inodes before it runs out of data blocks."
    },
    {
      lab: "Lab 3 — Reproduce a deleted-open file",
      steps: [
        "On a disposable Linux VM, create a test file and keep it open in a controlled test process.",
        "Record its size and filesystem usage.",
        "Unlink the file while the process still holds it open.",
        "Inspect lsof +L1 and compare df with du.",
        "Close the test process and confirm that the space is released."
      ],
      expectedLearning: "Understand why df and du can disagree and how open file descriptors retain storage."
    },
    {
      lab: "Lab 4 — Simulate a log-rotation problem",
      steps: [
        "Use a disposable service that writes to a test log.",
        "Configure rotation in a lab-only directory.",
        "Observe whether the process reopens the new log correctly.",
        "Check for deleted-open files and verify that storage is reclaimed."
      ],
      expectedLearning: "Validate the relationship between log rotation, application file descriptors, and disk recovery."
    },
    {
      lab: "Lab 5 — Simulate container storage growth",
      steps: [
        "Use a disposable Docker host.",
        "Create a test container that writes bounded data to its writable layer or a test volume.",
        "Compare docker system df with host filesystem usage.",
        "Remove only the lab resources and verify the capacity is reclaimed."
      ],
      expectedLearning: "Distinguish image layers, writable layers, build cache, and persistent volumes."
    }
  ],

  interviewQuestions: [
    {
      question: "What is the first command you run when a Linux server reports disk full?",
      answer: "Start with df -hT and df -i. Identify the affected filesystem and distinguish block exhaustion from inode exhaustion before choosing a cleanup action."
    },
    {
      question: "Why can df show 100% usage while du shows much less?",
      answer: "Possible causes include deleted files still held open by processes, filesystem metadata, reserved blocks, snapshots, or files hidden under mount points. Compare the outputs and investigate each possibility."
    },
    {
      question: "What does No space left on device mean?",
      answer: "It commonly indicates that the filesystem cannot allocate required blocks or inodes, but quotas, tmpfs limits, overlay storage, and other resource constraints must also be considered."
    },
    {
      question: "How do you find the largest directories safely?",
      answer: "Identify the affected mount with findmnt, then use a bounded du scan such as du -xhd1 on that filesystem. Drill down only into relevant directories and account for permissions and I/O impact."
    },
    {
      question: "What is inode exhaustion?",
      answer: "A filesystem has exhausted its available file metadata entries. New files may fail to be created even when data blocks remain free."
    },
    {
      question: "How do you investigate deleted files still consuming space?",
      answer: "Run lsof +L1, identify the owning process and file descriptor, and use the service's supported reopen or restart procedure when appropriate."
    },
    {
      question: "Is it safe to delete large log files directly?",
      answer: "Not automatically. Confirm ownership, retention, whether the file is active, and the application's logging model. Use approved rotation or cleanup procedures."
    },
    {
      question: "Why is rm -rf /var/log/* a dangerous incident response?",
      answer: "It destroys evidence and may remove active or required files without fixing the underlying cause. It can also leave deleted-open files consuming disk space."
    },
    {
      question: "What is the difference between df -h and df -i?",
      answer: "df -h reports filesystem block capacity in human-readable units. df -i reports inode capacity and consumption."
    },
    {
      question: "How do you troubleshoot Docker disk usage?",
      answer: "Use docker system df, inspect containers and images, and identify the runtime storage root. Check writable layers, build cache, logs, and volumes before removing confirmed-unused resources."
    },
    {
      question: "What does Kubernetes DiskPressure mean?",
      answer: "The node is under storage pressure according to its configured eviction signals. Inspect node conditions, events, runtime storage, logs, and ephemeral-storage usage."
    },
    {
      question: "What if the cloud volume is expanded but df still shows the old size?",
      answer: "Verify the device, partition, logical volume, and filesystem sizes. Follow the correct expansion procedure for the storage layout and filesystem, then confirm with df."
    },
    {
      question: "How do you handle a database volume reaching 100%?",
      answer: "Protect data integrity, involve the database owner, inspect database-native storage and logs, and use supported archival, retention, or expansion procedures. Never delete database files blindly."
    },
    {
      question: "How do you know the incident is truly resolved?",
      answer: "Verify block and inode headroom, correct mount state, absence of new storage errors, successful application writes, healthy services, and stable capacity over an observation window."
    },
    {
      question: "How do you prevent repeated disk-full incidents?",
      answer: "Combine capacity forecasting, filesystem and inode alerts, log and artifact retention, workload-specific cleanup, storage ownership, CI checks, and a tested incident runbook."
    }
  ],

  references: [
    "man df — filesystem capacity reporting.",
    "man du — file and directory space accounting.",
    "man findmnt — mounted filesystem inspection.",
    "man lsblk — block device inspection.",
    "man lsof — open file descriptors and deleted-open files.",
    "man journalctl — systemd journal inspection and retention management.",
    "man logrotate — log rotation configuration and behavior.",
    "man quota — filesystem quota inspection.",
    "Docker documentation — disk usage, image pruning, logging, and storage drivers.",
    "Kubernetes documentation — node-pressure eviction and ephemeral storage.",
    "Your cloud provider's documentation — block-volume resizing and filesystem expansion."
  ]
};
