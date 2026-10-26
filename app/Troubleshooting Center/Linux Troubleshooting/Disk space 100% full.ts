
export interface DiskCommand {
  title: string;
  command: string;
  purpose: string;
  interpretation: string;
}

export interface DiskStep {
  step: number;
  title: string;
  objective: string;
  commands: string[];
  explanation: string;
  expectedResult: string;
}

const linuxDiskSpaceFull = {
  id: "linux-disk-space-100-full",
  title: "Linux Disk Space 100% Full",
  category: "Linux Troubleshooting",
  difficulty: "Intermediate to Advanced",
  estimatedTime: "30–60 minutes",

  environment: [
    "Ubuntu",
    "RHEL",
    "Amazon Linux",
    "Linux Virtual Machines",
    "Cloud Servers",
    "Docker Hosts",
    "Database Servers"
  ],

  summary:
    "Diagnose a full Linux filesystem, identify which files or workloads consumed storage, recover space safely, and prevent production incidents caused by disk exhaustion.",

  incident: {
    scenario:
      "A production server starts returning application errors. Logs cannot be written, deployments fail, databases report write errors, or services become unhealthy because a filesystem has run out of available space.",

    severity:
      "Assess severity based on affected mount points, customer impact, database or application health, and whether the filesystem contains critical production data.",

    customerImpact: [
      "Applications may fail to write files or logs.",
      "Database transactions may fail if required storage is unavailable.",
      "Deployments and package installations may fail.",
      "Services may crash or become unhealthy.",
      "Monitoring and logging agents may stop recording data.",
      "A full root filesystem may interfere with system operations."
    ],

    immediatePriorities: [
      "Identify the affected filesystem and mount point.",
      "Determine whether blocks or inodes are exhausted.",
      "Check whether critical services or databases are affected.",
      "Identify large files, logs, backups, or deleted-but-open files.",
      "Recover space without deleting critical application or database data."
    ]
  },

  symptoms: [
    {
      symptom: "Filesystem usage reaches 100%",
      explanation:
        "The filesystem has little or no allocatable space according to its reported capacity. Check the specific mount point rather than assuming the entire server is full."
    },
    {
      symptom: "No space left on device",
      explanation:
        "The operation may have failed because filesystem blocks or inodes are exhausted. Verify both with df -h and df -i."
    },
    {
      symptom: "Application cannot write logs or temporary files",
      explanation:
        "The relevant filesystem may be full, or permissions, quotas, or another storage constraint may prevent writes."
    },
    {
      symptom: "Database writes fail",
      explanation:
        "The database's data, log, temporary, or transaction-log filesystem may be full. Follow database-specific recovery procedures."
    },
    {
      symptom: "Disk usage does not decrease after deleting a file",
      explanation:
        "A process may still have the deleted file open, or the file may be on another mount point. Check open file descriptors and filesystem details."
    },
    {
      symptom: "Root filesystem fills unexpectedly",
      explanation:
        "Possible causes include growing logs, container images, application artifacts, temporary files, backups, or a workload writing to the wrong location."
    }
  ],

  rootCauses: [
    {
      cause: "Logs grow without rotation",
      indicators: [
        "Log directories consume a large portion of the filesystem.",
        "One or more application log files grow continuously.",
        "Log rotation is missing or failing."
      ],
      investigation:
        "Inspect log sizes, timestamps, rotation configuration, and application logging behavior before truncating or removing files."
    },
    {
      cause: "Application-generated files or uploads",
      indicators: [
        "Upload, cache, export, or temporary directories grow unexpectedly.",
        "Usage correlates with application traffic or a batch job."
      ],
      investigation:
        "Identify file ownership, retention requirements, application behavior, and whether files can safely be archived or removed."
    },
    {
      cause: "Backups or deployment artifacts accumulate",
      indicators: [
        "Old backups, release archives, or build artifacts consume substantial storage.",
        "Retention or cleanup jobs have stopped working."
      ],
      investigation:
        "Check retention policy, backup status, artifact ownership, and whether a valid external backup exists before removing anything."
    },
    {
      cause: "Docker images, containers, or logs consume disk",
      indicators: [
        "Container storage directories are large.",
        "Container JSON logs have grown significantly.",
        "Unused images or build cache accumulate."
      ],
      investigation:
        "Inspect Docker's storage summary and container logging configuration. Do not manually delete files under Docker's data directory."
    },
    {
      cause: "Deleted file remains open",
      indicators: [
        "df reports high usage but du cannot account for all of it.",
        "A process has a large deleted file open."
      ],
      investigation:
        "Use lsof to identify deleted-but-open files and determine which service owns them."
    },
    {
      cause: "Filesystem capacity is insufficient",
      indicators: [
        "Storage usage steadily grows under normal workload.",
        "Cleanup does not provide sufficient sustainable headroom.",
        "The volume is smaller than current workload requirements."
      ],
      investigation:
        "Review growth trends, storage architecture, volume capacity, filesystem type, and expansion options."
    }
  ],

  safetyRules: [
    "Never run rm -rf on an unfamiliar directory to free space.",
    "Never delete database files, transaction logs, or backups without understanding recovery requirements.",
    "Do not delete files directly from Docker's internal storage directories.",
    "Do not truncate an active log blindly; the application may need to reopen it or use log rotation.",
    "Before removing a file, verify its path, ownership, purpose, retention policy, and backup requirements.",
    "If the filesystem is read-only or the device reports I/O errors, investigate filesystem and storage health before cleanup.",
    "Use approved production change procedures for service restarts and storage expansion."
  ],

  diagnosticCommands: [
    {
      title: "Check filesystem capacity",
      command: "df -hT",
      purpose:
        "Display mounted filesystems, types, total size, used space, available space, and mount points.",
      interpretation:
        "Identify the exact filesystem with high usage. A full /var or /var/log filesystem may require a different fix from a full root filesystem."
    },
    {
      title: "Check inode availability",
      command: "df -i",
      purpose:
        "Determine whether the filesystem has exhausted available inodes.",
      interpretation:
        "If inode usage is 100%, deleting selected small files may be necessary even when some storage blocks remain available. Investigate both capacity and inode counts."
    },
    {
      title: "Inspect directory sizes",
      command: "sudo du -xhd1 / 2>/dev/null | sort -h",
      purpose:
        "Summarize top-level directory usage on the root filesystem without crossing into other filesystems.",
      interpretation:
        "The -x option stays on the same filesystem. Replace / with the affected mount point if appropriate. Some directories may require elevated privileges for accurate results."
    },
    {
      title: "Find large files on the affected filesystem",
      command:
        "sudo find / -xdev -type f -size +500M -printf '%s %p\\n' 2>/dev/null | sort -nr | head -30",
      purpose:
        "Locate files larger than 500 MiB on the filesystem containing /.",
      interpretation:
        "The command searches the root filesystem only. Change the starting directory to the affected mount point when required. Review every candidate before deleting or archiving it."
    },
    {
      title: "Check for deleted-but-open files",
      command: "sudo lsof +L1",
      purpose:
        "Identify open files whose directory entries have been deleted.",
      interpretation:
        "A process may continue consuming disk space until it closes the file descriptor. Use the PID and file details to determine the safest service-specific recovery action. Requires lsof."
    },
    {
      title: "Check directory usage under /var",
      command: "sudo du -xhd1 /var 2>/dev/null | sort -h",
      purpose:
        "Investigate whether logs, caches, container data, or application files under /var consume excessive space.",
      interpretation:
        "Large directories are investigation targets, not automatic deletion candidates. Follow the data owner's retention and recovery procedures."
    },
    {
      title: "Inspect journal disk usage",
      command: "journalctl --disk-usage",
      purpose:
        "Report storage consumed by systemd journal files.",
      interpretation:
        "If journal usage is excessive, review retention policy and the approved journal cleanup process."
    },
    {
      title: "Inspect Docker storage usage",
      command: "docker system df",
      purpose:
        "Show space consumed by Docker images, containers, volumes, and build cache.",
      interpretation:
        "Check whether the growth comes from logs, images, build cache, or volumes. Volumes may contain persistent production data."
    },
    {
      title: "Inspect mount points",
      command: "findmnt",
      purpose:
        "Show filesystem mount relationships and options.",
      interpretation:
        "Confirm the path being investigated belongs to the expected filesystem. Separate mounts can make disk usage appear different across directories."
    },
    {
      title: "Check storage and kernel errors",
      command: "journalctl -k --since '2 hours ago' --no-pager",
      purpose:
        "Review recent kernel messages for storage errors, filesystem problems, or device issues.",
      interpretation:
        "Look for I/O errors and filesystem warnings. If storage hardware or the filesystem is unhealthy, freeing files alone may not resolve the incident."
    }
  ] satisfies DiskCommand[],

  troubleshootingSteps: [
    {
      step: 1,
      title: "Identify the full filesystem",
      objective:
        "Confirm which mount point has exhausted its available storage.",

      commands: [
        "df -hT",
        "findmnt"
      ],

      explanation:
        "Record the filesystem, mount point, usage percentage, and available space. Determine whether the affected path is /, /var, /var/log, a database volume, or a separate data mount.",

      expectedResult:
        "The affected filesystem and its mount point are known."
    },
    {
      step: 2,
      title: "Determine whether blocks or inodes are exhausted",
      objective:
        "Distinguish a capacity problem from an inode exhaustion problem.",

      commands: [
        "df -h",
        "df -i"
      ],

      explanation:
        "If block usage is high, investigate large files and directory growth. If inode usage is high, investigate large numbers of small files. Both conditions can occur together.",

      expectedResult:
        "The investigation follows the correct storage-exhaustion path."
    },
    {
      step: 3,
      title: "Find the directories consuming space",
      objective:
        "Narrow down which directory or workload is responsible.",

      commands: [
        "sudo du -xhd1 / 2>/dev/null | sort -h",
        "sudo du -xhd1 /var 2>/dev/null | sort -h"
      ],

      explanation:
        "Run the command against the affected filesystem. The second command is useful when /var is implicated. Compare directory sizes and use deeper inspection only in the largest relevant branch.",

      expectedResult:
        "One or more candidate directories are identified for further investigation."
    },
    {
      step: 4,
      title: "Identify the files or workload responsible",
      objective:
        "Determine which files, logs, artifacts, or services account for the growth.",

      commands: [
        "sudo find / -xdev -type f -size +500M -printf '%s %p\\n' 2>/dev/null | sort -nr | head -30",
        "sudo lsof +L1",
        "journalctl --disk-usage",
        "docker system df"
      ],

      explanation:
        "Use only the relevant commands for the environment. Check deleted-but-open files when df reports much more usage than du can explain. Inspect Docker storage only if Docker is present.",

      expectedResult:
        "A likely cause is identified, with file ownership and operational purpose understood."
    },
    {
      step: 5,
      title: "Recover space safely",
      objective:
        "Restore sufficient filesystem headroom while preserving important data.",

      commands: [
        "df -hT"
      ],

      explanation:
        "Choose a targeted remediation. Examples include approved log rotation, removal of verified obsolete temporary files, cleanup of disposable build artifacts, or expansion of the affected volume. Do not delete unknown files. For an active log, use the application's supported rotation or reopen procedure.",

      expectedResult:
        "Available space increases and the affected application can perform its required writes."
    },
    {
      step: 6,
      title: "Expand storage when cleanup is insufficient",
      objective:
        "Provide sustainable capacity when the workload legitimately needs more storage.",

      commands: [
        "lsblk -f",
        "findmnt"
      ],

      explanation:
        "Confirm the disk, partition, volume, filesystem, and mount point before changing storage. Cloud-volume resizing, partition changes, LVM operations, and filesystem growth commands depend on the environment. Follow the platform-specific runbook and ensure a recovery plan exists.",

      expectedResult:
        "The storage expansion plan matches the actual device and filesystem layout."
    },
    {
      step: 7,
      title: "Verify service recovery",
      objective:
        "Confirm the filesystem has sufficient space and the original failures have stopped.",

      commands: [
        "df -hT",
        "df -i",
        "systemctl status <service-name> --no-pager"
      ],

      explanation:
        "Replace the service placeholder with the affected systemd service. Check available space, inode usage, application logs, health checks, and successful writes. Verify that the service recovered without creating new errors.",

      expectedResult:
        "The affected service is healthy and the filesystem has adequate headroom."
    },
    {
      step: 8,
      title: "Prevent the issue from recurring",
      objective:
        "Address the underlying growth pattern and detect future exhaustion early.",

      commands: [
        "journalctl --disk-usage",
        "docker system df"
      ],

      explanation:
        "Use these commands only when their respective storage areas are relevant. Configure suitable log rotation, retention, capacity alerts, artifact cleanup, and storage growth monitoring. Track the root cause rather than relying on repeated manual cleanup.",

      expectedResult:
        "A documented prevention plan with monitoring and clear ownership."
    }
  ] satisfies DiskStep[],

  remediationScenarios: [
    {
      title: "Scenario A: Application log file consumes the filesystem",

      indicators: [
        "A log directory accounts for most of the usage.",
        "One active log file grows continuously.",
        "Log rotation is missing or failing."
      ],

      actions: [
        "Identify the owning application and check its log-rotation configuration.",
        "Preserve required logs according to incident and retention policy.",
        "Use the supported rotation or log-reopen procedure.",
        "Verify that new logs are being written and filesystem usage has decreased."
      ],

      warning:
        "Deleting an active log may not release space until the process closes the file. Blindly truncating logs can also destroy evidence needed for investigation."
    },
    {
      title: "Scenario B: Deleted files still consume disk space",

      indicators: [
        "df reports high filesystem usage.",
        "du cannot account for the same amount of used space.",
        "lsof +L1 identifies large deleted files still held open."
      ],

      actions: [
        "Identify the process holding the file descriptor.",
        "Determine whether the file is a log, temporary file, or application data.",
        "Use the service's supported log-reopen, rotation, or restart procedure if appropriate.",
        "Recheck filesystem usage after the file descriptor is released."
      ],

      warning:
        "Do not terminate a critical process without understanding the service impact and approved recovery procedure."
    },
    {
      title: "Scenario C: Docker host runs out of disk space",

      indicators: [
        "Container storage directories are large.",
        "Docker reports substantial image, container, or build-cache usage.",
        "Container logs or writable layers have grown unexpectedly."
      ],

      actions: [
        "Run docker system df to inspect storage categories.",
        "Inspect container logging and retention settings.",
        "Remove only resources confirmed to be unused and disposable under your operational policy.",
        "Establish log rotation and storage monitoring."
      ],

      warning:
        "Avoid docker system prune -a --volumes as a blind cleanup command. It can remove resources or volumes that workloads depend on."
    },
    {
      title: "Scenario D: Cloud volume or filesystem capacity is insufficient",

      indicators: [
        "The filesystem repeatedly fills under expected workload.",
        "Approved cleanup provides only temporary relief.",
        "Storage growth is consistent with legitimate application demand."
      ],

      actions: [
        "Review storage growth trends and projected capacity needs.",
        "Identify the underlying volume and filesystem layout.",
        "Follow the cloud provider and filesystem-specific expansion procedure.",
        "Verify the new capacity and monitor the workload after expansion."
      ],

      warning:
        "Increasing a cloud disk does not always expand the partition or filesystem automatically. Device mapping, filesystem type, and storage configuration must be verified."
    }
  ],

  verificationChecklist: [
    "The affected filesystem has sufficient available space.",
    "Inode availability is healthy.",
    "The root cause of storage growth is understood.",
    "Affected services can create and write required files.",
    "Application and database health checks pass.",
    "Deleted-but-open files are no longer retaining unexpected space, if applicable.",
    "Docker and log storage are within expected limits, if applicable.",
    "Disk usage remains stable during the observation period."
  ],

  monitoringRecommendations: [
    {
      metric: "Filesystem usage percentage",
      purpose:
        "Alert when a mount point approaches its capacity threshold."
    },
    {
      metric: "Available filesystem bytes",
      purpose:
        "Estimate remaining storage headroom."
    },
    {
      metric: "Inode utilization",
      purpose:
        "Detect filesystems at risk of inode exhaustion."
    },
    {
      metric: "Disk growth rate",
      purpose:
        "Estimate when the filesystem may become full."
    },
    {
      metric: "Application log growth",
      purpose:
        "Identify runaway logs and broken rotation."
    },
    {
      metric: "Container storage usage",
      purpose:
        "Detect unexpected growth in images, writable layers, build cache, or container logs."
    }
  ],

  realTimeIncidentExample: {
    title: "Production application fails to write logs",

    timeline: [
      {
        time: "14:00",
        event:
          "Monitoring reports that the /var filesystem is nearly full."
      },
      {
        time: "14:05",
        event:
          "Application logs begin failing to write and the service reports errors."
      },
      {
        time: "14:10",
        event:
          "The engineer runs df -hT and df -i to identify the affected filesystem and rule out inode exhaustion."
      },
      {
        time: "14:15",
        event:
          "Directory inspection shows that an application log directory has grown unexpectedly."
      },
      {
        time: "14:20",
        event:
          "The engineer verifies the log owner and retention requirements, then follows the approved log-rotation procedure."
      },
      {
        time: "14:30",
        event:
          "Filesystem headroom and application health are checked. Monitoring remains active to confirm recovery."
      }
    ],

    rootCause:
      "Illustrative example: application log rotation failed and a log file grew until the filesystem was exhausted. Actual cause must be verified from system evidence.",

    resolution:
      "Restore space through an approved cleanup or rotation procedure, verify application writes, and correct the log-retention configuration.",

    lessonsLearned: [
      "Identify the affected mount point before cleanup.",
      "Use df and du together to understand storage usage.",
      "Check for deleted-but-open files when reported usage does not match directory sizes.",
      "Protect database data, backups, and persistent container volumes.",
      "Set filesystem and inode alerts before capacity becomes critical."
    ]
  },

  incidentReportTemplate: {
    incidentId: "INC-YYYY-NNNN",
    title: "Linux filesystem capacity exhausted",
    startTime: "Record incident start time and timezone",
    endTime: "Record recovery time and timezone",
    affectedMount: "Record the affected mount point",
    customerImpact: "Describe application or database impact",
    detection: "Alert, monitoring, or manual discovery",
    evidence: "Record df, du, inode, and relevant log findings",
    rootCause: "Record the verified reason for storage growth",
    mitigation: "Record the approved space-recovery action",
    permanentFix: "Record the retention, capacity, or application correction",
    verification: "Record free space and application health checks",
    prevention: "Record alerts and capacity-management changes",
    followUpOwner: "Assign an accountable owner"
  },

  importantNotes: [
    "Example incidents and timelines are illustrative, not captured from an actual production server.",
    "Command options can vary across Linux distributions and installed tools.",
    "The find command shown searches one filesystem and excludes other mounted filesystems.",
    "High df usage with lower du usage can have several explanations, including deleted-but-open files, filesystem metadata, and permissions.",
    "Do not remove files from a database data directory or container runtime storage without a validated recovery procedure.",
    "If kernel logs report I/O errors or filesystem corruption, investigate storage health before treating the problem as ordinary capacity exhaustion."
  ]
};

export default linuxDiskSpaceFull;
