
export const inodeExhaustionGuide = {
  id: "networking-inode-exhaustion",
  title: "Inode Exhaustion",
  filePath: "app/troubleshooting-center/networking/InodeExhaustion.ts",
  category: "Networking",
  difficulty: "Advanced",
  estimatedTime: "60-120 minutes",
  tags: [
    "inode",
    "linux",
    "filesystem",
    "disk-capacity",
    "kubernetes",
    "docker",
    "production-incident",
    "monitoring",
    "incident-response",
  ],

  overview: {
    summary:
      "Diagnose filesystem inode exhaustion that prevents files, directories, temporary files, sockets, logs, or application runtime artifacts from being created. Distinguish inode exhaustion from byte capacity, quotas, read-only filesystems, deleted-but-open files, and container storage constraints.",
    objectives: [
      "Identify the affected mount, filesystem, host, container, and workload.",
      "Use df -i and related commands to confirm inode pressure.",
      "Find directories containing excessive numbers of files without overwhelming production systems.",
      "Distinguish inode exhaustion from disk-space exhaustion and other filesystem errors.",
      "Recover safely without deleting live application data or damaging container and Kubernetes storage.",
      "Prevent recurrence with capacity monitoring, retention policies, workload changes, and alerts.",
    ],
    assumptions: [
      "Examples use Linux commands and common Linux filesystems.",
      "Commands must be adapted to the actual mount, filesystem, distribution, and workload.",
      "Root privileges may be needed for some diagnostics.",
      "Container and Kubernetes storage layouts differ between runtimes and distributions.",
      "This file is stored under the networking directory because that is the requested repository path; inode exhaustion is primarily a filesystem/storage-capacity incident, although it can cause network-facing services to fail.",
    ],
  },

  incidentScenario: {
    title: "Production incident: services fail to create files despite free disk space",
    timeline: [
      {
        time: "T+00 min",
        event:
          "Monitoring reports API errors, failed log writes, temporary-file creation failures, or new pod startup failures.",
      },
      {
        time: "T+05 min",
        event:
          "The on-call engineer checks disk usage and sees free capacity in GB, but df -i reports 100% inode utilization on a critical filesystem.",
      },
      {
        time: "T+10 min",
        event:
          "The team identifies the affected mount and checks whether logs, sessions, caches, temporary files, or container artifacts created excessive file counts.",
      },
      {
        time: "T+15 min",
        event:
          "Engineers identify the responsible directory or workload, preserve evidence, and confirm which data is safe to remove or regenerate.",
      },
      {
        time: "T+25 min",
        event:
          "An approved targeted cleanup or workload correction frees inodes, and application writes and health checks are verified.",
      },
    ],
    symptoms: [
      "touch or application file creation returns No space left on device.",
      "Disk usage in df -h appears acceptable while df -i shows 100% usage.",
      "Applications cannot create PID files, temporary files, session files, or log files.",
      "New pods, containers, or deployments fail because required filesystem operations fail.",
      "Web servers return 500 errors or health checks fail after temporary-file creation errors.",
      "Package managers, CI agents, or build jobs fail when creating many small files.",
      "Monitoring agents stop writing state or metrics.",
      "A shared filesystem becomes unhealthy for multiple workloads at once.",
    ],
    businessImpact: [
      "Customer requests fail because applications cannot create temporary or session files.",
      "Deployment and automation pipelines fail.",
      "Logs and monitoring data may stop being written.",
      "New workloads may fail to start even when CPU, memory, and byte capacity look healthy.",
      "If the affected filesystem contains runtime or security state, the incident may have broader impact.",
    ],
  },

  impactAndSeverity: {
    questions: [
      "Which environment is affected: production, staging, or development?",
      "Which host, mount point, filesystem, container, node, or PVC is affected?",
      "Does df -i show 100% inode use or a rapidly increasing inode count?",
      "Is df -h also full, or is byte capacity still available?",
      "Which operations fail: log writes, temporary files, uploads, deployments, sockets, or pod creation?",
      "Did a release, log rotation change, cache change, batch job, or container rollout happen shortly before the incident?",
      "Is the affected mount shared by multiple applications?",
      "Is there evidence of runaway file creation, unexpected data, or a possible security event?",
    ],
    levels: [
      {
        severity: "SEV-1",
        condition:
          "Critical production services are unavailable across multiple systems, or the exhausted filesystem prevents essential recovery operations.",
        action:
          "Declare the incident, engage platform/storage/application owners, preserve evidence, and coordinate an approved recovery.",
      },
      {
        severity: "SEV-2",
        condition:
          "A major production service or deployment platform is degraded, or a critical shared filesystem is near exhaustion.",
        action:
          "Identify the responsible workload, prevent further growth, and execute a narrow recovery plan.",
      },
      {
        severity: "SEV-3",
        condition:
          "A limited workload is affected and a safe workaround is available.",
        action:
          "Resolve through the normal change process and add capacity alerts or workload corrections.",
      },
    ],
    note:
      "Choose severity based on actual service impact, data risk, recovery options, and the number of affected workloads.",
  },

  safetyChecks: [
    {
      check: "Confirm the target",
      actions: [
        "Verify hostname, environment, cloud account, cluster, namespace, node, and mount point.",
        "Use findmnt to confirm which filesystem backs the affected directory.",
        "Check whether the path is a bind mount, overlay filesystem, persistent volume, network filesystem, or container writable layer.",
      ],
    },
    {
      check: "Preserve evidence",
      actions: [
        "Record UTC timestamps, df -h, df -i, findmnt output, and relevant application errors.",
        "Capture inode utilization and file-count trends before cleanup where practical.",
        "Record the top suspected directories and responsible processes or workloads.",
      ],
    },
    {
      check: "Protect data",
      actions: [
        "Determine whether the files are authoritative data, regeneratable cache, temporary files, logs, or runtime state.",
        "Confirm retention, backup, legal, and security requirements before removing files.",
        "Prefer application-supported cleanup and retention mechanisms.",
        "Use a maintenance or change window when cleanup could disrupt active workloads.",
      ],
    },
    {
      check: "Avoid dangerous shortcuts",
      actions: [
        "Never run rm -rf against an unverified path or a broad system directory.",
        "Do not delete files directly from Docker or containerd internal storage directories.",
        "Do not delete live database files, Kubernetes state, application uploads, or unknown files to free inodes.",
        "Do not reboot as the first response: a reboot may not free inodes if the files still exist on disk.",
        "Do not resize a filesystem or volume before confirming filesystem and platform support.",
      ],
    },
  ],

  evidenceCollection: {
    requiredFields: [
      "Incident ID and change ticket",
      "UTC time of first failure",
      "Hostname, cluster, namespace, and affected workload",
      "Mount point and filesystem type",
      "Total, used, and available bytes",
      "Total, used, and available inodes",
      "Application error messages and failed operation",
      "Top directories by file count",
      "Recent releases, jobs, configuration changes, and retention changes",
      "Open deleted files, if present",
      "Current cleanup, recovery, and validation actions",
    ],
    commands: [
      {
        title: "Identify the host and time",
        commands: [
          "hostname -f",
          "date -u",
          "uptime",
        ],
        purpose:
          "Correlate the failure with monitoring alerts, releases, and system logs.",
      },
      {
        title: "Compare byte and inode capacity",
        commands: [
          "df -hT",
          "df -i",
          "df -hT /var",
          "df -i /var",
        ],
        purpose:
          "Replace /var with the actual affected path. The path-specific commands identify the filesystem that backs that directory.",
        interpretation: [
          "Use% near 100% in df -i indicates inode exhaustion or severe inode pressure.",
          "Use% near 100% in df -hT indicates byte-capacity pressure.",
          "Both can be full simultaneously.",
          "A large amount of free disk space does not prove that inodes are available.",
        ],
      },
      {
        title: "Identify mount and filesystem",
        commands: [
          "findmnt -T /var",
          "findmnt -t ext4,xfs,overlay,tmpfs",
          "lsblk -f",
        ],
        purpose:
          "Determine the backing filesystem and whether the path resides on a separate mount.",
        interpretation: [
          "Do not assume /var, /tmp, /var/log, and container storage share the same filesystem.",
          "A tmpfs mount has different capacity characteristics from a persistent disk.",
          "Overlay and network filesystems may require runtime-specific or server-side investigation.",
        ],
      },
      {
        title: "Check inode pressure across mounts",
        commands: [
          "df -iT",
          "df -hT",
        ],
        purpose:
          "Identify other filesystems approaching exhaustion and determine whether the incident is isolated or systemic.",
      },
      {
        title: "Check system errors",
        commands: [
          "sudo journalctl -k --since '30 minutes ago'",
          "sudo journalctl --since '30 minutes ago' | grep -Ei 'no space left|read-only|I/O error|inode'",
          "sudo dmesg --ctime",
        ],
        purpose:
          "Look for filesystem errors, read-only remounts, I/O failures, and application-visible ENOSPC errors.",
        caution:
          "Logs may be restricted or rotated. Absence of a message does not prove the filesystem is healthy.",
      },
    ],
  },

  diagnosticSequence: [
    {
      step: 1,
      name: "Confirm the exact failure",
      actions: [
        "Capture the original application or system error.",
        "Determine whether file creation, directory creation, rename, write, or log rotation is failing.",
        "Identify the exact path used by the failing process.",
        "Reproduce with a controlled, harmless operation only if approved.",
      ],
      branch: {
        "No space left on device":
          "Check both df -h and df -i for the filesystem containing the failing path.",
        "Permission denied":
          "Inspect ownership, mode bits, ACLs, and process identity; do not assume inode exhaustion.",
        "Read-only file system":
          "Investigate filesystem state and kernel errors before attempting any write or remount.",
        "Too many open files":
          "Check process file-descriptor limits separately; this is not the same as inode exhaustion.",
      },
    },
    {
      step: 2,
      name: "Locate the affected filesystem",
      actions: [
        "Use findmnt -T on the exact failing directory.",
        "Compare df -hT and df -i for that mount.",
        "Check whether the application is running on the host, inside a container, or on a Kubernetes node.",
      ],
      branch:
        "If the host filesystem has capacity but the container writable layer or tmpfs is exhausted, investigate the container-specific mount and limits.",
    },
    {
      step: 3,
      name: "Determine whether the problem is inode or byte capacity",
      actions: [
        "Record total, used, and available inodes.",
        "Record total, used, and available bytes.",
        "Check filesystem quotas and container ephemeral-storage limits where applicable.",
      ],
      branch: {
        "Inodes exhausted, bytes available":
          "Find excessive numbers of small files, directories, sessions, cache entries, or other filesystem objects.",
        "Bytes exhausted, inodes available":
          "Investigate large files, logs, artifacts, and byte-capacity growth instead.",
        "Both exhausted":
          "Prioritize service recovery while identifying both the file-count and byte-capacity contributors.",
        "Neither exhausted":
          "Check quotas, read-only state, permissions, mount availability, file descriptors, and application-specific limits.",
      },
    },
    {
      step: 4,
      name: "Find directories with excessive file counts",
      actions: [
        "Start with the application's known cache, session, temporary, log, spool, and upload directories.",
        "Measure file counts on the affected filesystem.",
        "Use bounded, scoped searches and avoid traversing unrelated mounts.",
        "Identify which process or workload owns the files.",
      ],
      branch:
        "If one directory dominates the file count, inspect its naming pattern, timestamps, ownership, and application lifecycle before cleanup.",
    },
    {
      step: 5,
      name: "Check deleted-but-open files",
      actions: [
        "Use lsof +L1 when lsof is installed and permissions allow.",
        "Identify the process holding deleted files open.",
        "Determine whether the issue is byte capacity, inode retention, or both.",
      ],
      branch:
        "Unlinked files normally stop consuming directory entries, but remain allocated while open references exist. Restart or reload the owning service only through an approved procedure; this issue is often a byte-capacity problem rather than the cause of inode exhaustion.",
    },
    {
      step: 6,
      name: "Check application and scheduled-job behavior",
      actions: [
        "Inspect recent deployment changes and application logs.",
        "Check temporary-file cleanup, session expiry, cache eviction, and log rotation.",
        "Inspect cron jobs, timers, batch jobs, build agents, and retry loops.",
        "Check for one file per request, unbounded session files, or millions of tiny cache entries.",
      ],
      branch:
        "If file growth continues during the investigation, mitigate the generating workload through an approved rate limit, feature flag, queue pause, or job-control mechanism.",
    },
    {
      step: 7,
      name: "Inspect container and Kubernetes storage",
      actions: [
        "Check node inode capacity and container runtime storage.",
        "Inspect pod events and node conditions.",
        "Check ephemeral-storage usage and configured limits.",
        "Identify whether the files belong to a container writable layer, emptyDir, PVC, or hostPath.",
      ],
      branch:
        "Do not clean the node's container runtime directories manually. Use supported runtime and orchestration operations.",
    },
    {
      step: 8,
      name: "Choose the safest recovery",
      actions: [
        "Confirm data ownership and retention policy.",
        "Select targeted application-supported cleanup, correction of runaway file generation, or a supported capacity change.",
        "Record the expected inode and service impact.",
        "Obtain production approval and prepare rollback or recovery steps.",
      ],
      branch:
        "If the files cannot be confidently classified, stop destructive cleanup and involve the application or data owner.",
    },
    {
      step: 9,
      name: "Validate recovery",
      actions: [
        "Run df -i and df -hT on the affected mount.",
        "Perform an approved application-level write test.",
        "Check error rates, pod events, log writes, and deployment health.",
        "Verify inode utilization is stable rather than immediately climbing again.",
      ],
      branch:
        "If inode use rises quickly after recovery, the generating workload or retention defect has not been resolved.",
    },
    {
      step: 10,
      name: "Prevent recurrence",
      actions: [
        "Add inode utilization and inode-growth monitoring.",
        "Fix unbounded file creation or missing cleanup.",
        "Introduce appropriate retention and cache eviction.",
        "Document the incident, evidence, recovery, and ownership.",
      ],
    },
  ],

  fileCountInvestigation: {
    note:
      "Run these commands only on the affected mount or an approved subtree. Large recursive scans can create significant I/O and CPU load on production systems.",
    commands: [
      {
        title: "Count regular files and directories under a known application path",
        command:
          "sudo find /var/lib/myapp -xdev -type f -printf '.' | wc -c",
        explanation:
          "Replace the example path. This counts regular files, not every filesystem object. It may take time on very large trees.",
      },
      {
        title: "Count directories under a known application path",
        command:
          "sudo find /var/lib/myapp -xdev -type d -printf '.' | wc -c",
        explanation:
          "Directories also consume inodes on common Linux filesystems. The root of the searched tree is included.",
      },
      {
        title: "Inspect recent files in a known directory",
        command:
          "sudo find /var/lib/myapp -xdev -type f -mmin -60 -printf '%TY-%Tm-%Td %TH:%TM %u %p\\n' | head -200",
        explanation:
          "Use this to find possible recent file growth. It is not a complete file-count report and may still traverse many entries.",
      },
      {
        title: "Find likely high-count directories with an explicit depth limit",
        command:
          "sudo find /var/lib/myapp -xdev -mindepth 1 -maxdepth 2 -type d -print",
        explanation:
          "Review likely directories before running a deeper scan. This lists candidate directories rather than ranking them by count.",
      },
      {
        title: "Inspect directory metadata",
        command:
          "sudo stat /var/lib/myapp",
        explanation:
          "Check ownership, permissions, and filesystem metadata. A directory's size is not a reliable count of all files below it.",
      },
    ],
    interpretation: [
      "A filesystem inode is associated with a filesystem object; directory entries and hard links do not each require a separate inode for the same underlying file.",
      "A single directory containing many entries can be a hotspot even when total bytes are small.",
      "find -xdev helps avoid crossing into other mounted filesystems, but does not make a full scan free or instant.",
      "Do not run broad recursive scans repeatedly during an active outage without considering their resource cost.",
      "Use available filesystem-specific tools and monitoring to narrow the search before expensive traversal.",
    ],
  },

  rootCauseMatrix: [
    {
      cause: "Runaway application temporary files",
      evidence:
        "A temporary directory's file count increases continuously and application logs show creation without matching cleanup.",
      fix:
        "Apply a supported cleanup process after confirming ownership and retention requirements; correct the application's temporary-file lifecycle.",
      prevention:
        "Use bounded temporary storage, guaranteed cleanup, and monitoring for file-count growth.",
    },
    {
      cause: "Unbounded session files",
      evidence:
        "Session directory file count grows with requests or users and expired sessions remain present.",
      fix:
        "Use the application's supported session-expiry or cleanup mechanism.",
      prevention:
        "Configure session TTLs, cleanup jobs, and session-store monitoring.",
    },
    {
      cause: "Cache creates one file per key",
      evidence:
        "Cache entries dominate inode use and cache size grows without an effective eviction policy.",
      fix:
        "Use supported cache eviction or clear only regeneratable entries after confirming the application impact.",
      prevention:
        "Configure entry limits, TTLs, and cache monitoring.",
    },
    {
      cause: "Log rotation creates excessive files",
      evidence:
        "Many small rotated logs or application-generated per-request logs remain on the filesystem.",
      fix:
        "Correct the rotation and retention configuration and remove only approved obsolete logs.",
      prevention:
        "Use bounded retention, compression, centralized logging, and alerting.",
    },
    {
      cause: "Container writable-layer growth",
      evidence:
        "Container storage or node inode use increases alongside application-generated files.",
      fix:
        "Correct the workload's write path and use supported container lifecycle and storage management.",
      prevention:
        "Use persistent volumes for appropriate data and monitor node filesystem and ephemeral-storage capacity.",
    },
    {
      cause: "Build agent or package cache explosion",
      evidence:
        "CI workspaces, dependency caches, or extracted build artifacts contain very large file counts.",
      fix:
        "Apply the CI platform's supported workspace and cache cleanup after verifying no active build depends on the data.",
      prevention:
        "Use workspace TTLs, cache quotas, isolated runners, and scheduled cleanup.",
    },
    {
      cause: "Filesystem inode capacity is insufficient",
      evidence:
        "The workload has a legitimate, sustained number of small files and inode exhaustion recurs despite proper cleanup.",
      fix:
        "Evaluate supported filesystem or volume migration, recreation, or expansion options with backups and an approved maintenance plan.",
      prevention:
        "Capacity-plan inode consumption as well as byte consumption.",
    },
    {
      cause: "Deleted-but-open files",
      evidence:
        "lsof +L1 shows processes holding unlinked files open, often contributing to unexpectedly high byte usage.",
      fix:
        "Use an approved service reload or restart after verifying the process and impact.",
      prevention:
        "Fix log rotation and application file-handle lifecycle.",
    },
    {
      cause: "Quota or container limit",
      evidence:
        "The filesystem reports available inodes but the user, project, container, or workload still receives capacity errors.",
      fix:
        "Inspect applicable quotas and platform limits; change them only through the approved capacity workflow.",
      prevention:
        "Monitor quota utilization and workload-level storage limits.",
    },
  ],

  filesystemCapacityNotes: {
    ext4:
      "In ext4, inode capacity is commonly established when the filesystem is created. Do not assume that adding bytes to an underlying block device automatically increases the inode count. Check the filesystem's actual capabilities and supported resize options.",
    xfs:
      "XFS allocates inodes dynamically from filesystem space, subject to filesystem and metadata constraints. Check the actual filesystem and free-space state before concluding that a fixed inode table is exhausted.",
    tmpfs:
      "tmpfs has memory and inode-related limits that can be relevant to temporary files and runtime state. Check the actual mount options and available capacity.",
    networkFilesystems:
      "NFS and other network filesystems may report capacity and inode information from the server or export. Diagnose the backing server, quota, and export rather than assuming the client can fix it locally.",
    caution:
      "Do not blindly run mkfs, tune2fs, xfs_admin, resize commands, or remount operations during an incident. Filesystem-specific changes require a verified target, a supported procedure, backups where appropriate, and a recovery plan.",
  },

  fixAndRecovery: {
    priorityOrder: [
      {
        priority: 1,
        action: "Stop uncontrolled growth",
        details:
          "If a confirmed runaway job or application is generating files, use an approved pause, rate limit, feature flag, or workload control. Avoid abruptly killing critical processes without understanding their recovery behavior.",
      },
      {
        priority: 2,
        action: "Identify safe-to-remove data",
        details:
          "Classify files by owner, purpose, retention policy, and whether they can be regenerated. Preserve evidence and check active users before cleanup.",
      },
      {
        priority: 3,
        action: "Use supported cleanup",
        details:
          "Prefer application cache eviction, session expiration, log retention, CI workspace cleanup, or the platform's documented garbage-collection mechanism.",
      },
      {
        priority: 4,
        action: "Correct the cause",
        details:
          "Fix missing cleanup, uncontrolled file generation, cache growth, log rotation, or container write-path design.",
      },
      {
        priority: 5,
        action: "Expand or migrate capacity if justified",
        details:
          "If legitimate inode demand exceeds the filesystem design, evaluate supported storage expansion or migration. Byte expansion alone may not increase inode capacity on every filesystem.",
      },
      {
        priority: 6,
        action: "Verify and monitor",
        details:
          "Confirm inode availability, application writes, service health, and stable inode consumption after the corrective action.",
      },
    ],
    cleanupRules: [
      "Never remove files based only on a matching filename pattern without validating ownership and retention.",
      "Never delete database files, live queue data, upload content, or container runtime internals as an inode shortcut.",
      "Use a dry-run or listing phase before destructive cleanup whenever the tool supports it.",
      "Record the target directory, selection criteria, expected count, approval, and recovery implications.",
      "If the correct data owner cannot be identified, stop and escalate rather than guessing.",
    ],
    exampleSafeInvestigation: {
      scenario:
        "A known application cache directory contains millions of regeneratable files.",
      steps: [
        "Confirm that the directory is on the exhausted filesystem using findmnt -T.",
        "Confirm with the application owner that the cache is regeneratable and not authoritative state.",
        "Check whether the application provides a supported eviction or clear-cache command.",
        "Estimate the number of entries affected and the expected service impact.",
        "Obtain approval and perform the cleanup through the supported mechanism.",
        "Check df -i and application error rates.",
        "Fix cache TTL, eviction, or entry limits so the directory does not grow without bound.",
      ],
    },
    rollback:
      "File deletion is not automatically reversible. Before cleanup, determine whether backups or regeneration are available. For storage expansion or configuration changes, record the previous configuration and follow the platform's tested rollback procedure.",
  },

  kubernetesTroubleshooting: {
    commands: [
      {
        title: "Inspect node conditions",
        command:
          "kubectl describe node <node-name>",
        purpose:
          "Look for DiskPressure, node events, and capacity-related warnings.",
      },
      {
        title: "Inspect pods and recent events",
        command:
          "kubectl get pods -A -o wide",
        purpose:
          "Find affected workloads, restarts, and pod placement.",
      },
      {
        title: "Inspect events",
        command:
          "kubectl get events -A --sort-by=.metadata.creationTimestamp",
        purpose:
          "Look for scheduling, mount, image, ephemeral-storage, and container startup failures.",
      },
      {
        title: "Inspect a pod",
        command:
          "kubectl describe pod <pod-name> -n <namespace>",
        purpose:
          "Review events, mounts, container state, and resource limits.",
      },
      {
        title: "Inspect persistent volumes and claims",
        command:
          "kubectl get pvc,pv -A",
        purpose:
          "Identify whether the affected path is backed by persistent storage.",
      },
      {
        title: "Inspect container ephemeral-storage configuration",
        command:
          "kubectl get pod <pod-name> -n <namespace> -o yaml",
        purpose:
          "Review emptyDir, volume mounts, ephemeral-storage requests and limits, and workload configuration.",
      },
    ],
    workflow: [
      "Identify the node and the exact mount that is exhausted.",
      "Distinguish node filesystem inode exhaustion from PVC/server-side filesystem exhaustion and container writable-layer limits.",
      "Inspect node conditions and Kubernetes events.",
      "Check whether a workload writes excessive files into emptyDir, hostPath, or the container writable layer.",
      "Use the container runtime's supported inspection and cleanup operations.",
      "Apply the fix to the owning Deployment, StatefulSet, DaemonSet, or storage configuration.",
      "Validate pod readiness, node conditions, and inode trends.",
    ],
    cautions: [
      "A pod restart does not necessarily remove files from a persistent volume.",
      "Deleting a pod may disrupt availability and does not guarantee that node-level inode pressure is resolved.",
      "Do not manually delete files from kubelet or container runtime internal directories.",
      "Kubernetes ephemeral-storage limits primarily govern storage consumption and do not replace node-level inode monitoring.",
      "Node filesystem pressure and kubelet eviction behavior depend on the actual filesystem layout and cluster configuration.",
    ],
    officialReference:
      "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
  },

  prevention: {
    monitoring: [
      "Alert on inode utilization by filesystem and mount point.",
      "Monitor free inodes as well as free bytes.",
      "Alert on inode consumption growth rate and estimated time to exhaustion.",
      "Track file counts in known high-risk cache, session, temporary, and spool directories.",
      "Monitor Kubernetes node DiskPressure and storage-related events.",
      "Track container writable-layer and ephemeral-storage usage where supported.",
      "Monitor failed file creation, log-write failures, and application errors.",
    ],
    applicationDesign: [
      "Use bounded cache entries and explicit TTLs.",
      "Remove temporary files after successful processing and handle cleanup on failure paths.",
      "Use centralized logging and appropriate retention.",
      "Avoid creating one permanent file per request or event when a database, object store, or bounded queue is more appropriate.",
      "Use lifecycle policies for sessions, build workspaces, and temporary artifacts.",
      "Load-test workloads that generate many small files.",
    ],
    capacityPlanning: [
      "Estimate peak inode demand, not just total data size.",
      "Include deployment rollouts, temporary duplication, caches, logs, and batch workloads in capacity models.",
      "Test inode monitoring and alert thresholds before production rollout.",
      "Document filesystem-specific expansion and migration procedures.",
      "Keep recovery access and storage runbooks available even when the affected filesystem is full.",
    ],
    suggestedAlertThresholds: [
      {
        threshold: "Warning",
        condition:
          "Inode utilization reaches 75%, or projected exhaustion falls within the team's warning window.",
        action:
          "Investigate growth rate and identify the dominant directories.",
      },
      {
        threshold: "Critical",
        condition:
          "Inode utilization reaches 90%, or projected exhaustion is imminent.",
        action:
          "Engage the owner and prepare an approved recovery before new file creation fails.",
      },
      {
        threshold: "Emergency",
        condition:
          "Inode utilization reaches 98-100% or critical writes are failing.",
        action:
          "Declare the appropriate incident severity and prioritize controlled recovery.",
      },
    ],
    note:
      "These are example thresholds, not universal defaults. Tune them to the filesystem, growth rate, criticality, and response time.",
  },

  incidentReportTemplate: {
    incidentId: "",
    environment: "",
    hostOrCluster: "",
    namespaceOrWorkload: "",
    affectedMount: "",
    filesystemType: "",
    startTimeUtc: "",
    severity: "",
    userImpact: "",
    dfHOutput: "",
    dfIOutput: "",
    mountDetails: "",
    topFileCountDirectories: [],
    suspectedWorkload: "",
    recentChanges: [],
    rootCause: "",
    evidence: [],
    remediation: "",
    filesRemovedOrRetained: "",
    backupOrRegenerationPlan: "",
    recoveryValidation: [],
    preventionActions: [],
    actionOwners: [],
    closureTimeUtc: "",
  },

  practicalLabs: [
    {
      title: "Lab 1: Reproduce inode exhaustion safely",
      goal:
        "Understand the difference between free bytes and available inodes.",
      tasks: [
        "Use a disposable Linux VM and a dedicated test filesystem or small test mount.",
        "Record df -hT and df -i before creating test files.",
        "Create a controlled number of small files only inside the test directory.",
        "Observe inode and byte utilization.",
        "Remove the lab files and verify recovery.",
      ],
      successCriteria:
        "Explain why a filesystem can have free bytes but insufficient inodes. Never perform this lab on a production filesystem.",
    },
    {
      title: "Lab 2: Find a high-file-count directory",
      goal:
        "Practice narrowing an inode hotspot without scanning the entire host unnecessarily.",
      tasks: [
        "Create several test directories with different numbers of small files.",
        "Inspect the test mount with df -i.",
        "Use find with -xdev and a bounded depth to locate candidates.",
        "Count files under the relevant directories.",
        "Explain the performance cost of recursive scans.",
      ],
      successCriteria:
        "Identify the test directory responsible for the highest file count and document the evidence.",
    },
    {
      title: "Lab 3: Distinguish inode, byte, and quota failures",
      goal:
        "Understand why capacity errors may have different root causes.",
      tasks: [
        "Observe df -hT and df -i on a disposable environment.",
        "Where supported, configure an isolated test quota or limited filesystem.",
        "Record the different error conditions.",
        "Restore the original lab configuration.",
      ],
      successCriteria:
        "Produce a decision tree that distinguishes byte capacity, inode capacity, and quota limits.",
    },
    {
      title: "Lab 4: Kubernetes ephemeral storage",
      goal:
        "Investigate file growth in a disposable Kubernetes namespace.",
      tasks: [
        "Deploy a test workload that writes a bounded number of files to a dedicated emptyDir.",
        "Inspect pod configuration, node conditions, and events.",
        "Compare the container path with the backing node filesystem.",
        "Remove the test workload and verify the environment is clean.",
      ],
      successCriteria:
        "Explain the difference between container ephemeral storage, node inode capacity, and persistent-volume capacity.",
    },
    {
      title: "Lab 5: Monitoring and incident response",
      goal:
        "Build an early-warning process for inode growth.",
      tasks: [
        "Collect inode utilization at regular intervals in a test environment.",
        "Configure warning and critical thresholds.",
        "Simulate increasing file counts on the test mount.",
        "Trigger the alert and follow the incident checklist.",
        "Document recovery and prevention actions.",
      ],
      successCriteria:
        "Demonstrate an alert before exhaustion and produce a completed incident report.",
    },
  ],

  interviewQuestions: [
    {
      question: "What is an inode?",
      answer:
        "An inode stores filesystem metadata about a file or directory, such as ownership, permissions, and references to file data. Directory entries map names to filesystem objects. Exact implementation details vary by filesystem.",
    },
    {
      question: "Why can a disk have free GBs but still return No space left on device?",
      answer:
        "The filesystem may have exhausted its available inodes, so it cannot allocate another inode for a new filesystem object. Quotas and other capacity constraints can also produce related failures, so both df -h and df -i should be checked.",
    },
    {
      question: "What is the difference between df -h and df -i?",
      answer:
        "df -h reports byte capacity in human-readable units. df -i reports inode capacity and utilization for filesystems that expose inode statistics.",
    },
    {
      question: "Does deleting one large file always solve inode exhaustion?",
      answer:
        "No. A large file generally consumes one inode regardless of its size. Removing it may free bytes but usually frees only one file inode. A large number of safe-to-remove small files may be more relevant to inode pressure.",
    },
    {
      question: "Can a directory itself consume an inode?",
      answer:
        "Yes. Directories are filesystem objects and normally consume inodes on common Linux filesystems. Large numbers of directories can contribute to inode exhaustion.",
    },
    {
      question: "Does deleting an open file immediately free all its resources?",
      answer:
        "Unlinking removes its directory entry, but the file's data and inode remain allocated while open references exist. This commonly contributes to byte-capacity problems; it should not be assumed to explain inode exhaustion without evidence.",
    },
    {
      question: "How do you find the directory responsible for inode exhaustion?",
      answer:
        "Identify the affected mount first, then inspect known application directories and run scoped file-count searches using tools such as find with -xdev. Account for the performance cost of large recursive scans.",
    },
    {
      question: "Will increasing disk size fix inode exhaustion?",
      answer:
        "Not necessarily. Some filesystems establish inode capacity at creation, while others allocate inodes dynamically. Confirm the filesystem type and supported capacity operations before choosing expansion or migration.",
    },
    {
      question: "Why might restarting a pod fail to fix inode exhaustion?",
      answer:
        "The files may remain on a persistent volume, hostPath, node filesystem, or another shared mount. A restart can also recreate the same files if the workload's cleanup defect remains.",
    },
    {
      question: "What should be validated after cleanup?",
      answer:
        "Check available inodes and bytes, verify that the actual failing write succeeds, inspect application and node health, and monitor whether inode usage stabilizes.",
    },
  ],

  completionChecklist: [
    "Incident impact and severity are documented.",
    "The exact host, mount, and filesystem are confirmed.",
    "df -hT and df -i evidence are collected.",
    "Quota, read-only, and file-descriptor issues are considered.",
    "High-file-count directories are identified with scoped diagnostics.",
    "The responsible workload or growth pattern is supported by evidence.",
    "Data ownership and retention are verified before cleanup.",
    "The remediation is approved and reversible where possible.",
    "Application writes and health checks are restored.",
    "Inode utilization remains stable after recovery.",
    "Monitoring and alert thresholds are reviewed.",
    "The incident report and prevention actions are complete.",
  ],

  officialReferences: [
    {
      title: "Linux df manual",
      url: "https://man7.org/linux/man-pages/man1/df.1.html",
    },
    {
      title: "Linux find manual",
      url: "https://man7.org/linux/man-pages/man1/find.1.html",
    },
    {
      title: "Linux findmnt manual",
      url: "https://man7.org/linux/man-pages/man8/findmnt.8.html",
    },
    {
      title: "Linux lsof manual",
      url: "https://man7.org/linux/man-pages/man8/lsof.8.html",
    },
    {
      title: "Linux filesystem documentation",
      url: "https://docs.kernel.org/filesystems/",
    },
    {
      title: "Red Hat: Managing file systems",
      url: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/",
    },
    {
      title: "Kubernetes: Resource management for Pods and containers",
      url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    },
    {
      title: "Kubernetes: Node-pressure eviction",
      url: "https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/",
    },
    {
      title: "Docker: Storage drivers",
      url: "https://docs.docker.com/engine/storage/drivers/",
    },
  ],
} as const;

export default inodeExhaustionGuide;
