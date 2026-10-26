// File: app/troubleshootingcentre/Linux Troubleshooting/Inode exhaustion.ts

export interface InodeCommand {
  title: string;
  command: string;
  purpose: string;
  expectedOutput: string;
  interpretation: string;
}

export interface InodeTroubleshootingStep {
  step: number;
  title: string;
  objective: string;
  actions: string[];
  commands?: string[];
  expectedResult: string;
  precautions?: string[];
}

export interface InodeRootCause {
  cause: string;
  symptoms: string[];
  investigation: string[];
  resolution: string[];
}

export interface InodeIncidentScenario {
  environment: string;
  incident: string;
  impact: string[];
  investigation: string[];
  rootCause: string;
  resolution: string[];
  prevention: string[];
}

export interface LinuxInodeExhaustionRunbook {
  id: string;
  title: string;
  category: string;
  severity: string;
  estimatedResolutionTime: string;
  summary: string;
  objective: string;
  symptoms: string[];
  businessImpact: string[];
  inodeConcept: {
    definition: string;
    relationship: string;
    importantFacts: string[];
  };
  rootCauses: string[];
  diagnosticCommands: InodeCommand[];
  troubleshootingSteps: InodeTroubleshootingStep[];
  rootCauseScenarios: InodeRootCause[];
  incidentScenario: InodeIncidentScenario;
  verification: string[];
  prevention: string[];
  monitoring: string[];
  safetyRules: string[];
  incidentReportTemplate: string[];
  troubleshootingChecklist: string[];
}

export const linuxInodeExhaustion: LinuxInodeExhaustionRunbook = {
  id: "linux-inode-exhaustion",
  title: "Linux Inode Exhaustion",
  category: "Linux Troubleshooting",
  severity: "High / Critical",
  estimatedResolutionTime: "30 minutes to several hours, depending on the root cause",

  summary:
    "Linux inode exhaustion occurs when a filesystem runs out of available inodes. " +
    "The filesystem may still have free disk space, but applications can fail to " +
    "create files, directories, temporary files, sockets, or other filesystem objects.",

  objective:
    "Identify which filesystem has exhausted its inodes, find the directories " +
    "containing excessive numbers of files, safely remove or archive only verified " +
    "unneeded files, restore service, and implement long-term prevention.",

  symptoms: [
    "Applications fail to create new files even though df -h shows free disk space.",
    "Errors such as No space left on device appear during file creation.",
    "Web applications fail to upload files or create temporary files.",
    "Logging agents cannot create new log files.",
    "Applications fail to create PID files, lock files, or cache entries.",
    "Package installation or deployment fails while creating files.",
    "Monitoring agents report filesystem inode utilization at or near 100%.",
    "A service may fail because it cannot create required runtime files.",
    "The problem affects one mount point while other filesystems remain healthy.",
  ],

  businessImpact: [
    "Production deployments may fail.",
    "Web requests and file uploads may return errors.",
    "Background jobs may stop processing files.",
    "Applications may fail to start or restart.",
    "Logging and monitoring may become unreliable.",
    "A shared filesystem may affect multiple applications or teams.",
  ],

  inodeConcept: {
    definition:
      "An inode is a filesystem data structure that stores metadata about a file, " +
      "such as ownership, permissions, timestamps, and references to data blocks. " +
      "A filename is stored as a directory entry that refers to an inode.",

    relationship:
      "Disk capacity and inode capacity are different resources. df -h reports " +
      "filesystem block usage, while df -i reports inode usage. A filesystem can " +
      "have free bytes but no free inodes.",

    importantFacts: [
      "Every ordinary file and directory normally consumes an inode.",
      "A very large number of tiny files can exhaust inodes without consuming much disk space.",
      "Filesystem inode allocation depends on the filesystem type and its configuration.",
      "Deleting a filename does not necessarily free storage immediately if a process still has the file open.",
      "The df -i command is the primary starting point for inode utilization.",
      "The du command measures disk usage, not inode consumption.",
      "Do not assume that increasing disk capacity will automatically increase inode capacity.",
    ],
  },

  rootCauses: [
    "Applications generate millions of small cache files.",
    "Temporary files are created but never cleaned up.",
    "A session directory accumulates expired application sessions.",
    "Mail queues contain excessive small files.",
    "Monitoring, logging, or security agents generate too many files.",
    "Container overlay filesystems accumulate excessive small files.",
    "A failed batch job repeatedly creates files.",
    "Application retry logic generates duplicate temporary files.",
    "A backup or synchronization job creates excessive metadata or file copies.",
    "The filesystem was created with an inode layout unsuitable for the workload.",
  ],

  diagnosticCommands: [
    {
      title: "1. Check filesystem inode utilization",
      command: "df -i",
      purpose:
        "Identify mounted filesystems that have exhausted or nearly exhausted their inodes.",
      expectedOutput:
        "Filesystem  Inodes  IUsed  IFree  IUse%  Mounted on\n" +
        "/dev/sda2   2000000 1998000 2000  100%   /var",
      interpretation:
        "Illustrative output only. If IUse% is 100% or IFree is zero, the filesystem " +
        "cannot allocate additional inodes. Check the affected mount point before " +
        "investigating directories.",
    },
    {
      title: "2. Check block capacity separately",
      command: "df -hT",
      purpose:
        "Compare filesystem type and disk-space utilization with inode utilization.",
      expectedOutput:
        "Filesystem Type Size Used Avail Use% Mounted on\n" +
        "/dev/sda2   ext4  50G  12G   38G  24%  /var",
      interpretation:
        "Illustrative output only. A low block-usage percentage combined with 100% " +
        "inode usage strongly suggests an excessive number of small files rather " +
        "than ordinary disk-capacity exhaustion.",
    },
    {
      title: "3. Find the affected mount point",
      command: "findmnt -T /var",
      purpose:
        "Confirm which filesystem contains the affected directory.",
      expectedOutput:
        "TARGET SOURCE    FSTYPE OPTIONS\n" +
        "/var   /dev/sda2 ext4   rw,relatime",
      interpretation:
        "Use the actual affected path instead of assuming that /var is the problem. " +
        "A directory may reside on a separate mount or bind mount.",
    },
    {
      title: "4. Count files in a candidate directory",
      command:
        "find /var -xdev -type f -printf '.' | wc -c",
      purpose:
        "Estimate the number of regular files beneath /var without crossing into other filesystems.",
      expectedOutput: "1850000",
      interpretation:
        "Illustrative output. A very high count may indicate a file accumulation problem. " +
        "This command scans the directory tree and may cause additional I/O on a busy server.",
    },
    {
      title: "5. Compare top-level directory file counts",
      command:
        "for d in /var/*; do [ -d \"$d\" ] && printf '%s ' \"$d\" && find \"$d\" -xdev -type f -printf '.' 2>/dev/null | wc -c; done",
      purpose:
        "Compare regular-file counts under top-level directories to identify likely hotspots.",
      expectedOutput:
        "/var/cache  12000\n" +
        "/var/lib    1800000\n" +
        "/var/log    22000",
      interpretation:
        "Illustrative output only. If /var/lib contains most files, narrow the investigation " +
        "to the responsible application subdirectory. A high count alone does not prove " +
        "that those files are safe to delete.",
    },
    {
      title: "6. Count files in a specific directory",
      command:
        "find /var/lib/myapp/cache -xdev -type f -printf '.' | wc -c",
      purpose:
        "Measure the number of regular files in a suspected application cache.",
      expectedOutput: "1750000",
      interpretation:
        "Replace the example path with the actual directory. Verify ownership, file " +
        "purpose, application documentation, and retention policy before cleanup.",
    },
    {
      title: "7. Inspect directories with many entries",
      command: "find /var/lib/myapp -xdev -type d -print",
      purpose:
        "List directories for further targeted file-count analysis.",
      expectedOutput:
        "/var/lib/myapp\n/var/lib/myapp/cache\n/var/lib/myapp/sessions",
      interpretation:
        "Use this list to narrow the search. Listing every directory can itself produce " +
        "substantial output on a large tree; redirect output to a protected incident file if needed.",
    },
    {
      title: "8. Inspect ownership and timestamps",
      command: "find /var/lib/myapp/cache -xdev -type f -printf '%u %TY-%Tm-%Td %p\\n' | head -50",
      purpose:
        "Review sample file owners, timestamps, and paths.",
      expectedOutput:
        "myapp 2026-10-20 /var/lib/myapp/cache/item-001\n" +
        "myapp 2026-10-21 /var/lib/myapp/cache/item-002",
      interpretation:
        "Illustrative output. Use representative samples to understand the data and identify " +
        "whether files are stale, actively used, or part of application state.",
    },
    {
      title: "9. Check services after inode exhaustion",
      command: "systemctl --failed",
      purpose:
        "Identify systemd services that failed during the incident.",
      expectedOutput:
        "UNIT            LOAD   ACTIVE SUB    DESCRIPTION\n" +
        "myapp.service   loaded failed failed My Application",
      interpretation:
        "A failed service may be a consequence of inode exhaustion rather than the root cause. " +
        "Inspect its logs and restart it only after the underlying condition is addressed.",
    },
    {
      title: "10. Inspect application logs",
      command: "journalctl -u myapp.service --since '-30 min' --no-pager",
      purpose:
        "Find file-creation errors and determine when the incident began.",
      expectedOutput:
        "Error: No space left on device",
      interpretation:
        "Search for the first failure timestamp and correlate it with deployments, scheduled jobs, " +
        "traffic changes, and cache or session growth.",
    },
  ],

  troubleshootingSteps: [
    {
      step: 1,
      title: "Confirm the incident and its scope",
      objective:
        "Determine whether inode exhaustion is real and which mounted filesystem is affected.",
      actions: [
        "Check the application error and capture its timestamp.",
        "Run inode and block-capacity checks.",
        "Identify the exact mount point containing the failing path.",
        "Check whether one service, multiple services, or the whole host is affected.",
      ],
      commands: [
        "df -i",
        "df -hT",
        "findmnt -T /var/lib/myapp",
      ],
      expectedResult:
        "The affected filesystem and the relevant application path are known.",
      precautions: [
        "Do not start deleting files before identifying the affected filesystem.",
        "Do not assume that free disk space means the filesystem is healthy.",
      ],
    },
    {
      step: 2,
      title: "Check recent errors and operational changes",
      objective:
        "Establish when the problem started and what changed before the first failures.",
      actions: [
        "Review application and system logs.",
        "Check recent releases and configuration changes.",
        "Review cron jobs, batch jobs, cache generation, and session creation.",
        "Check whether a retry loop is repeatedly generating files.",
      ],
      commands: [
        "journalctl --since '-30 min' --no-pager",
        "systemctl --failed",
        "crontab -l",
      ],
      expectedResult:
        "A likely time window and one or more candidate workloads are identified.",
      precautions: [
        "Run crontab -l as the relevant service account when checking that account's jobs.",
        "Do not edit production cron entries until the owner and impact are understood.",
      ],
    },
    {
      step: 3,
      title: "Locate directories containing excessive files",
      objective:
        "Find the smallest relevant directory tree with abnormal file counts.",
      actions: [
        "Start from the affected mount point.",
        "Compare file counts across likely directories.",
        "Narrow the search to application cache, sessions, temporary files, mail queues, or container data.",
        "Use -xdev to avoid unintentionally traversing into other mounted filesystems.",
        "Check sample filenames, ownership, age, and file types.",
      ],
      commands: [
        "find /var -xdev -type f -printf '.' | wc -c",
        "find /var/lib/myapp/cache -xdev -type f -printf '.' | wc -c",
        "find /var/lib/myapp/cache -xdev -type f -printf '%TY-%Tm-%Td %u %p\\n' | head -50",
      ],
      expectedResult:
        "One or more directories explain the excessive inode consumption.",
      precautions: [
        "Large filesystem scans can consume CPU, I/O, and time.",
        "Use the actual mount point and narrow the search where possible.",
        "Directory counts can include files that the application still needs.",
      ],
    },
    {
      step: 4,
      title: "Identify the files' purpose and owner",
      objective:
        "Decide whether files are temporary, reproducible, retained records, or active application data.",
      actions: [
        "Confirm which application owns the directory.",
        "Review application documentation and retention policies.",
        "Check whether the files are referenced by active processes or workflows.",
        "Ask the service owner to approve cleanup if the data purpose is uncertain.",
      ],
      expectedResult:
        "The team knows which files, if any, are eligible for safe cleanup.",
      precautions: [
        "Never delete database files, user uploads, sessions, mail queues, or application state solely because there are many of them.",
        "A file's age alone does not prove it is safe to delete.",
      ],
    },
    {
      step: 5,
      title: "Stop the source of uncontrolled file creation",
      objective:
        "Prevent new files from consuming available inodes while recovery is in progress.",
      actions: [
        "Disable or pause the specific faulty job if approved.",
        "Correct an application retry loop or runaway cache generator.",
        "Coordinate with the application owner before stopping a production service.",
        "Confirm whether the workload is still generating files.",
      ],
      commands: [
        "systemctl status myapp.service",
        "journalctl -u myapp.service --since '-15 min' --no-pager",
      ],
      expectedResult:
        "The rate of new file creation is reduced or controlled.",
      precautions: [
        "Stopping a service can interrupt users or data processing.",
        "Do not kill processes blindly; understand their role and recovery requirements.",
      ],
    },
    {
      step: 6,
      title: "Perform approved cleanup",
      objective:
        "Recover inodes without deleting required production data.",
      actions: [
        "Prefer the application's supported cache cleanup or retention mechanism.",
        "If files are confirmed disposable, use a reviewed and narrowly scoped cleanup procedure.",
        "For large cleanup operations, use a controlled batch and monitor inode recovery.",
        "Retain required audit logs and records according to policy.",
        "Record the cleanup scope and the person who approved it.",
      ],
      commands: [
        "df -i /var",
        "find /var/lib/myapp/cache -xdev -type f -mtime +7 -print | head -50",
      ],
      expectedResult:
        "The approved disposable files are removed and the filesystem begins recovering inodes.",
      precautions: [
        "The example find command is inspection-only; it does not delete files.",
        "Do not turn a preview command into a recursive delete without validating every predicate and the exact target path.",
        "Do not run rm -rf against broad system directories.",
        "Check whether application-supported cleanup is required to preserve consistency.",
      ],
    },
    {
      step: 7,
      title: "Recover and validate affected services",
      objective:
        "Confirm the filesystem has free inodes and the application can create required files.",
      actions: [
        "Check inode usage again.",
        "Review the original application error.",
        "Check service status and application health.",
        "Test a safe, application-approved operation that creates a file.",
        "Restart a service only if required and after confirming its prerequisites.",
      ],
      commands: [
        "df -i",
        "systemctl status myapp.service",
        "journalctl -u myapp.service --since '-10 min' --no-pager",
      ],
      expectedResult:
        "Inode capacity is available, file creation works, and the application returns to a healthy state.",
      precautions: [
        "Do not create arbitrary test files in production data directories.",
        "Use an approved temporary directory and remove the test file after verification.",
      ],
    },
    {
      step: 8,
      title: "Prevent recurrence",
      objective:
        "Remove the underlying cause and ensure the team detects inode pressure early.",
      actions: [
        "Implement cache, session, and temporary-file retention policies.",
        "Fix faulty file-generation or retry logic.",
        "Add inode utilization alerts.",
        "Review inode growth trends and filesystem sizing.",
        "Document the incident and assign follow-up owners.",
      ],
      expectedResult:
        "The file growth rate is controlled and inode alerts provide advance warning.",
    },
  ],

  rootCauseScenarios: [
    {
      cause: "Application cache contains millions of small files",
      symptoms: [
        "df -i shows near-100% inode usage.",
        "The cache directory contains far more files than expected.",
        "Block usage may remain relatively low.",
      ],
      investigation: [
        "Count files in the configured cache path.",
        "Review cache TTL, cleanup settings, and the file-generation rate.",
        "Check whether the cache can be safely rebuilt.",
      ],
      resolution: [
        "Use the application's supported cache eviction mechanism.",
        "Remove only approved, reproducible cache entries.",
        "Fix missing expiration or cleanup behavior.",
      ],
    },
    {
      cause: "Temporary files are never removed",
      symptoms: [
        "A temporary directory grows continuously.",
        "Jobs create files but do not remove them after success or failure.",
        "Inode utilization increases over time.",
      ],
      investigation: [
        "Inspect the configured temporary directory.",
        "Check file age, owner, naming pattern, and the job that creates them.",
        "Review application cleanup paths for failed and interrupted jobs.",
      ],
      resolution: [
        "Fix cleanup logic for both successful and failed jobs.",
        "Introduce a documented retention policy.",
        "Use a scheduled cleanup only after verifying which files are safe to remove.",
      ],
    },
    {
      cause: "Session files accumulate",
      symptoms: [
        "An application session directory contains a very high file count.",
        "Old session files remain after users log out or sessions expire.",
      ],
      investigation: [
        "Confirm whether sessions are stored on the local filesystem.",
        "Check the session lifetime and garbage-collection configuration.",
        "Determine whether the application has active sessions that must be preserved.",
      ],
      resolution: [
        "Correct session expiration and garbage collection.",
        "Use application-approved cleanup.",
        "Consider a managed session store if the architecture supports it.",
      ],
    },
    {
      cause: "Container or container-runtime storage accumulates small files",
      symptoms: [
        "The host filesystem or a container-related mount has high inode utilization.",
        "Container workloads show unexpected growth in file counts.",
        "Deployments or container writes fail.",
      ],
      investigation: [
        "Inspect df -i and findmnt on the host.",
        "Review container runtime storage statistics and the affected workload.",
        "Identify writable-layer growth, build cache, logs, and temporary files.",
      ],
      resolution: [
        "Use the runtime's supported cleanup procedures.",
        "Remove only confirmed-unused resources after reviewing dependencies.",
        "Correct application behavior and configure appropriate log rotation.",
      ],
    },
    {
      cause: "Filesystem inode capacity is unsuitable for the workload",
      symptoms: [
        "The filesystem repeatedly exhausts inodes despite correct retention and cleanup.",
        "The workload legitimately requires a very large number of small files.",
      ],
      investigation: [
        "Identify the filesystem type and how it was created.",
        "Measure normal and peak file counts and their growth rate.",
        "Review filesystem-specific inode allocation rules and supported migration options.",
      ],
      resolution: [
        "Plan a suitable filesystem or storage redesign.",
        "Consider separating high-file-count workloads onto a dedicated filesystem.",
        "Evaluate filesystem recreation or migration only with tested backups and an approved maintenance plan.",
      ],
    },
  ],

  incidentScenario: {
    environment:
      "Illustrative production scenario: a Linux application server stores generated cache entries under /var/lib/myapp/cache.",

    incident:
      "The application starts returning file-creation errors even though the filesystem has substantial free disk space.",

    impact: [
      "Some requests fail when cache entries cannot be created.",
      "Background workers repeatedly retry failed tasks.",
      "A deployment is delayed because the service cannot create temporary files.",
    ],

    investigation: [
      "The on-call engineer runs df -hT and sees low block usage.",
      "The engineer runs df -i and discovers that the /var filesystem has exhausted its inodes.",
      "A targeted file count identifies an unusually large number of cache files.",
      "Application logs show that cache cleanup has not run successfully.",
      "The team confirms the cache is reproducible and identifies the responsible application job.",
    ],

    rootCause:
      "The application's cache expiration process was misconfigured, causing large numbers of small cache files to accumulate.",

    resolution: [
      "The team pauses the faulty cache-generation job with application-owner approval.",
      "The service owner confirms the cache contents are disposable.",
      "The team runs an approved, narrowly scoped cache cleanup procedure.",
      "The team verifies inode availability and performs an application health check.",
      "The cache expiration configuration is corrected before the job is resumed.",
    ],

    prevention: [
      "Monitor inode utilization and file-count growth.",
      "Test cache expiration during deployment validation.",
      "Alert on abnormal cache growth.",
      "Document safe cache cleanup and service recovery procedures.",
    ],
  },

  verification: [
    "Run df -i and confirm the affected filesystem has available inodes.",
    "Run df -hT to ensure block capacity is also healthy.",
    "Confirm the identified directory's file count is within expected limits.",
    "Verify the source of uncontrolled file creation has been fixed.",
    "Confirm the affected service is active and healthy.",
    "Review application logs for recurring No space left on device errors.",
    "Perform an approved application operation that creates a file.",
    "Observe inode utilization for a suitable period to ensure it is not immediately rising again.",
  ],

  prevention: [
    "Define cache and session expiration policies.",
    "Ensure temporary files are cleaned up after both successful and failed jobs.",
    "Monitor the number of files in high-growth application directories.",
    "Review file creation rates after deployments.",
    "Avoid creating one file per event when a more suitable storage model is available.",
    "Separate high-file-count workloads from unrelated system directories where appropriate.",
    "Capacity-plan inode requirements using real workload measurements.",
    "Test cleanup procedures in a staging environment before production use.",
  ],

  monitoring: [
    "Alert when inode utilization reaches a warning threshold such as 80%.",
    "Create a critical alert when inode utilization approaches 95% or exceeds the organization's threshold.",
    "Monitor both inode utilization and block utilization.",
    "Track inode utilization growth rate, not just a single snapshot.",
    "Monitor file counts in application cache, session, spool, and temporary directories.",
    "Include filesystem mount point, host, severity, and current IUse% in alert messages.",
    "Tune thresholds to the workload and leave sufficient time for safe remediation.",
  ],

  safetyRules: [
    "Never assume high file count means the files are disposable.",
    "Never use broad recursive deletion commands without a reviewed scope.",
    "Never delete database, user-upload, mail-queue, or application-state files without explicit authorization and a recovery plan.",
    "Confirm the mount point before running cleanup commands.",
    "Remember that find -xdev prevents crossing filesystem device boundaries, but it does not make a deletion safe.",
    "Check the command's target path and filters before executing it.",
    "For critical production systems, follow change management and obtain the relevant service owner's approval.",
    "Use tested backups or supported recovery procedures when deleting non-reproducible data.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Date and time detected:",
    "Hostname / environment:",
    "Affected filesystem and mount point:",
    "Initial inode utilization:",
    "Initial block utilization:",
    "Affected application or service:",
    "Business impact:",
    "First observed error and timestamp:",
    "Root cause:",
    "Directory responsible for excessive file count:",
    "Approved remediation performed:",
    "Inode utilization after remediation:",
    "Service health after recovery:",
    "Monitoring and prevention changes:",
    "Follow-up owner and due date:",
  ],

  troubleshootingChecklist: [
    "Confirmed inode exhaustion with df -i.",
    "Checked block utilization with df -hT.",
    "Identified the affected mount point with findmnt.",
    "Located the directory with excessive file counts.",
    "Reviewed representative files and confirmed their purpose.",
    "Identified and controlled the source of new file creation.",
    "Received approval for any production cleanup.",
    "Recovered inode capacity without deleting required data.",
    "Verified application and service health.",
    "Implemented monitoring and a permanent fix.",
    "Documented the incident and follow-up actions.",
  ],
};

export default linuxInodeExhaustion;
