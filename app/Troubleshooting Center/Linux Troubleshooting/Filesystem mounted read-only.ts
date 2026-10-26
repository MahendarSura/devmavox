
export interface ReadOnlyCommand {
  title: string;
  command: string;
  purpose: string;
  interpretation: string;
}

export interface ReadOnlyStep {
  step: number;
  title: string;
  objective: string;
  actions: string[];
  commands?: string[];
  expectedResult: string;
  precautions?: string[];
}

export interface ReadOnlyRootCause {
  cause: string;
  symptoms: string[];
  investigation: string[];
  resolution: string[];
}

export interface ReadOnlyIncident {
  environment: string;
  incident: string;
  impact: string[];
  investigation: string[];
  rootCause: string;
  resolution: string[];
  prevention: string[];
}

export interface LinuxReadOnlyRunbook {
  id: string;
  title: string;
  category: string;
  severity: string;
  summary: string;
  objective: string;
  symptoms: string[];
  businessImpact: string[];
  rootCauses: string[];
  diagnosticCommands: ReadOnlyCommand[];
  troubleshootingSteps: ReadOnlyStep[];
  rootCauseScenarios: ReadOnlyRootCause[];
  incidentScenario: ReadOnlyIncident;
  verification: string[];
  prevention: string[];
  monitoring: string[];
  safetyRules: string[];
  incidentReportTemplate: string[];
  troubleshootingChecklist: string[];
}

export const linuxFilesystemReadOnly: LinuxReadOnlyRunbook = {
  id: "linux-filesystem-read-only",
  title: "Linux Filesystem Mounted Read-Only",
  category: "Linux Troubleshooting",
  severity: "Medium / High / Critical",

  summary:
    "A read-only filesystem allows read operations but rejects modifications. Linux may mount " +
    "a filesystem read-only because of explicit mount configuration, filesystem errors, " +
    "storage problems, or an administrative action. Some filesystems may remount themselves " +
    "read-only after detecting serious errors to protect data.",

  objective:
    "Identify the affected mount, determine why it is read-only, protect data, restore safe " +
    "write access when appropriate, and prevent recurrence.",

  symptoms: [
    "Applications fail to create or update files.",
    "Commands return 'Read-only file system'.",
    "Logs cannot be written to the affected mount.",
    "Database writes fail or transactions cannot complete.",
    "Temporary-file creation fails.",
    "A service fails to start because it cannot write to its data directory.",
    "A Linux server or virtual machine becomes partially unavailable.",
    "A filesystem unexpectedly changes from read-write to read-only.",
  ],

  businessImpact: [
    "Applications may stop accepting new transactions.",
    "Databases may become unavailable for writes.",
    "Logs, temporary files, and application state may not be updated.",
    "Deployment and configuration changes may fail.",
    "Services that depend on the affected mount may fail or restart repeatedly.",
    "Attempting unsafe recovery can increase data-loss or corruption risk.",
  ],

  rootCauses: [
    "Filesystem metadata errors or corruption.",
    "Underlying disk or storage device errors.",
    "Explicit read-only mount configuration.",
    "An administrator or automation system remounted the filesystem read-only.",
    "A virtual machine disk or cloud storage volume has an underlying problem.",
    "A network filesystem is unavailable or has server-side issues.",
    "A container bind mount or volume was intentionally configured read-only.",
    "Boot-time filesystem checks or mount configuration selected read-only mode.",
    "Kernel-detected filesystem errors triggered protective behavior.",
  ],

  diagnosticCommands: [
    {
      title: "1. Identify the affected filesystem",
      command: "findmnt",
      purpose:
        "Display mounted filesystems, mount points, filesystem types, and mount options.",
      interpretation:
        "Find the affected mount and inspect its options. A mount option containing ro indicates read-only mode; rw indicates read-write mode.",
    },
    {
      title: "2. Inspect the affected mount",
      command: "findmnt -T /var/lib/myapp -o TARGET,SOURCE,FSTYPE,OPTIONS",
      purpose:
        "Determine which filesystem contains a particular application path.",
      interpretation:
        "Replace /var/lib/myapp with the affected path. Check the source device, filesystem type, and whether the mount uses ro or rw.",
    },
    {
      title: "3. Check filesystem capacity",
      command: "df -hT",
      purpose:
        "Check disk space and filesystem types.",
      interpretation:
        "A full filesystem can also prevent writes, but disk-full errors differ from read-only filesystem errors. Investigate both when appropriate.",
    },
    {
      title: "4. Check inode availability",
      command: "df -i",
      purpose:
        "Check whether the filesystem has available inodes.",
      interpretation:
        "Inode exhaustion commonly causes file-creation failures, but it is not the same as a read-only mount.",
    },
    {
      title: "5. Review kernel messages",
      command: "sudo journalctl -k --since '-60 min' --no-pager",
      purpose:
        "Look for filesystem errors, I/O failures, device resets, and remount messages.",
      interpretation:
        "Correlate messages with the first observed write failure. Kernel logs often provide the strongest evidence of a protective remount.",
    },
    {
      title: "6. Inspect recent system logs",
      command: "sudo journalctl --since '-60 min' --no-pager",
      purpose:
        "Find service failures and mount-related events around the incident.",
      interpretation:
        "Look for application write errors, mount failures, storage errors, and recent administrative changes.",
    },
    {
      title: "7. Check block devices",
      command: "lsblk -f",
      purpose:
        "Inspect block devices, filesystem types, UUIDs, and mount points.",
      interpretation:
        "Use the output to identify the actual device. Do not assume the root filesystem is on a particular device name.",
    },
    {
      title: "8. Inspect filesystem configuration",
      command: "cat /etc/fstab",
      purpose:
        "Review persistent mount configuration.",
      interpretation:
        "Look for an explicit ro option, incorrect mount definitions, or configuration changes. The file may contain environment-specific details.",
    },
    {
      title: "9. Inspect mount details",
      command: "cat /proc/mounts",
      purpose:
        "Read the kernel's current mount table.",
      interpretation:
        "Confirm the active mount options. Current runtime options may differ from intended configuration in /etc/fstab.",
    },
    {
      title: "10. Check service state",
      command: "systemctl status myapp.service --no-pager -l",
      purpose:
        "Determine whether the application is failing because it cannot write to a path.",
      interpretation:
        "Replace myapp.service with the actual unit. Check recent error messages and whether the affected path resides on the read-only mount.",
    },
    {
      title: "11. Check disk and device health",
      command: "sudo journalctl -k --since '-60 min' --no-pager | grep -Ei 'I/O error|buffer I/O|EXT4-fs error|XFS.*error|nvme.*error|read-only|remount'",
      purpose:
        "Filter recent kernel logs for common storage and filesystem error messages.",
      interpretation:
        "The search is illustrative and may not match every kernel or filesystem message. Review surrounding log entries and identify the underlying device.",
    },
    {
      title: "12. Test writing safely",
      command: "touch /path/on/affected-mount/.readonly-check",
      purpose:
        "Test whether a designated directory accepts writes.",
      interpretation:
        "Use only an approved, noncritical test directory. If the filesystem is read-only, the command should fail. If it succeeds, remove the test file after confirming its exact path and ownership.",
    },
  ],

  troubleshootingSteps: [
    {
      step: 1,
      title: "Confirm the write failure",
      objective:
        "Establish whether the error is caused by read-only mode rather than permissions or lack of disk space.",
      actions: [
        "Record the exact application error message.",
        "Identify the path that the application cannot modify.",
        "Check whether the message explicitly says 'Read-only file system'.",
        "Check available disk space and inode usage.",
        "Determine which services and users are affected.",
      ],
      commands: [
        "df -hT",
        "df -i",
        "findmnt -T /path/to/affected-directory",
      ],
      expectedResult:
        "The affected path and its filesystem are identified.",
    },
    {
      step: 2,
      title: "Confirm active mount options",
      objective:
        "Determine whether the filesystem is currently mounted read-only.",
      actions: [
        "Inspect the affected mount using findmnt.",
        "Check whether the active options include ro or rw.",
        "Identify the source device and filesystem type.",
        "Determine whether only one mount or multiple mounts are affected.",
      ],
      commands: [
        "findmnt -T /path/to/affected-directory -o TARGET,SOURCE,FSTYPE,OPTIONS",
        "cat /proc/mounts",
      ],
      expectedResult:
        "The active mount mode and filesystem type are confirmed.",
      precautions: [
        "Do not attempt to remount a filesystem before investigating why it became read-only.",
      ],
    },
    {
      step: 3,
      title: "Investigate kernel and storage errors",
      objective:
        "Find evidence of filesystem corruption or an underlying storage failure.",
      actions: [
        "Review kernel messages from before and during the incident.",
        "Look for filesystem errors, I/O failures, device resets, or remount events.",
        "Correlate errors with cloud-volume events or virtual-machine storage alerts where applicable.",
        "Determine whether the filesystem contains critical application or database data.",
      ],
      commands: [
        "sudo journalctl -k --since '-60 min' --no-pager",
        "lsblk -f",
      ],
      expectedResult:
        "The investigation identifies whether the read-only mode is protective or intentional.",
      precautions: [
        "If storage or filesystem errors are present, prioritize data protection and investigate before enabling writes.",
      ],
    },
    {
      step: 4,
      title: "Check whether read-only mode is intentional",
      objective:
        "Determine whether system configuration or an administrative action caused the condition.",
      actions: [
        "Inspect /etc/fstab for mount options.",
        "Review recent configuration management or deployment changes.",
        "Check whether the filesystem is a read-only container volume.",
        "For network filesystems, investigate server-side export and connectivity state.",
        "Confirm the expected mount mode with the system owner.",
      ],
      commands: [
        "cat /etc/fstab",
        "findmnt",
      ],
      expectedResult:
        "An intentional configuration or an unexpected runtime state is identified.",
      precautions: [
        "Do not change persistent mount configuration just to hide an unresolved storage problem.",
      ],
    },
    {
      step: 5,
      title: "Protect data and plan recovery",
      objective:
        "Prevent additional damage while determining the safest recovery method.",
      actions: [
        "Assess whether the affected mount contains databases or other critical data.",
        "Check available backups, snapshots, and recovery procedures.",
        "Notify the service owner if writes are unavailable.",
        "Preserve relevant logs and storage diagnostics.",
        "For suspected corruption or device failure, follow the filesystem and storage vendor's recovery guidance.",
      ],
      expectedResult:
        "A recovery plan is chosen based on the filesystem type, device health, and data criticality.",
      precautions: [
        "Do not force a read-write remount when kernel or storage errors suggest corruption.",
        "Do not run filesystem repair tools against a mounted, active filesystem unless the tool and procedure explicitly support it.",
      ],
    },
    {
      step: 6,
      title: "Recover an intentionally read-only mount",
      objective:
        "Restore the intended mode when evidence confirms that read-only mode is expected or incorrectly configured.",
      actions: [
        "Confirm the source device, filesystem type, and mount point.",
        "Confirm with the service owner that read-write access is required.",
        "Review the approved configuration or mount procedure.",
        "Apply the minimal corrective change through change control.",
        "For a supported local filesystem with no unresolved storage errors, use the documented remount procedure if authorized.",
      ],
      commands: [
        "findmnt -T /path/to/mount",
        "sudo mount -o remount,rw /path/to/mount",
      ],
      expectedResult:
        "The mount returns to the intended mode only after the cause and risks have been assessed.",
      precautions: [
        "The remount command is conditional guidance, not a universal fix.",
        "Replace the placeholder with the actual mount point.",
        "Do not use this procedure to bypass a protective remount caused by filesystem or device errors.",
        "For root filesystems, production databases, and clustered storage, use the platform-specific recovery procedure.",
      ],
    },
    {
      step: 7,
      title: "Repair filesystem or storage problems",
      objective:
        "Address confirmed filesystem damage or underlying device issues safely.",
      actions: [
        "Identify the filesystem and its actual backing device.",
        "Consult filesystem-specific recovery guidance.",
        "Arrange a maintenance window or recovery environment if required.",
        "Ensure backups or snapshots are available where possible.",
        "Run repair tools only under the filesystem's documented conditions, commonly with the filesystem unmounted.",
        "Resolve underlying disk, virtual-disk, or cloud-volume problems before returning the workload to service.",
      ],
      expectedResult:
        "The underlying problem is repaired or the affected volume is replaced or restored through an approved recovery process.",
      precautions: [
        "Never guess the device name for a repair command.",
        "Do not run fsck against a mounted, active filesystem unless the specific filesystem and tool explicitly support that operation.",
        "XFS and other filesystems have different repair tools and requirements; use the correct procedure.",
      ],
    },
    {
      step: 8,
      title: "Verify filesystem recovery",
      objective:
        "Confirm that the filesystem has the intended mode and the application can safely write.",
      actions: [
        "Inspect the active mount options again.",
        "Check disk space and inode availability.",
        "Perform an approved write test in a designated directory.",
        "Verify application logs and service health.",
        "Check for new filesystem or storage errors.",
      ],
      commands: [
        "findmnt -T /path/to/affected-directory -o TARGET,SOURCE,FSTYPE,OPTIONS",
        "df -hT",
        "df -i",
        "systemctl status myapp.service --no-pager -l",
      ],
      expectedResult:
        "The filesystem is in its intended state, writes succeed where permitted, and the application recovers.",
    },
    {
      step: 9,
      title: "Prevent recurrence",
      objective:
        "Reduce the chance of future unexpected read-only mounts.",
      actions: [
        "Resolve recurring storage and filesystem errors.",
        "Monitor kernel logs and storage health.",
        "Review persistent mount configuration.",
        "Test backup and restore procedures.",
        "Document recovery steps for the specific filesystem type.",
        "Add alerts for failed writes and unexpected mount-mode changes.",
      ],
      expectedResult:
        "The system has clear recovery procedures and monitoring for recurrence.",
    },
  ],

  rootCauseScenarios: [
    {
      cause: "Filesystem errors triggered protective read-only mode",
      symptoms: [
        "The filesystem unexpectedly changes from rw to ro.",
        "Kernel logs contain filesystem errors.",
        "Application writes fail across multiple directories on the same mount.",
      ],
      investigation: [
        "Inspect kernel logs around the first failure.",
        "Identify the filesystem type and backing device.",
        "Check for related storage errors.",
      ],
      resolution: [
        "Protect critical data and arrange filesystem-specific recovery.",
        "Use the documented offline or maintenance recovery process when required.",
        "Investigate and correct any underlying storage issue.",
      ],
    },
    {
      cause: "Disk or underlying storage failure",
      symptoms: [
        "I/O errors appear in kernel logs.",
        "The device resets or disappears.",
        "Read and write operations become unreliable.",
      ],
      investigation: [
        "Review kernel and platform storage logs.",
        "Identify the actual backing device.",
        "Check cloud-volume or hypervisor storage health where applicable.",
      ],
      resolution: [
        "Escalate to the storage owner or cloud provider when appropriate.",
        "Restore or replace the affected volume through the approved process.",
        "Validate recovered data before returning the application to service.",
      ],
    },
    {
      cause: "Explicit read-only mount configuration",
      symptoms: [
        "The mount consistently appears with ro options.",
        "The condition occurs after boot or deployment.",
        "Kernel logs do not show an associated filesystem failure.",
      ],
      investigation: [
        "Inspect the active mount options.",
        "Review /etc/fstab and automation configuration.",
        "Confirm the intended mount mode with the system owner.",
      ],
      resolution: [
        "Correct the configuration only after confirming the intended access mode.",
        "Apply the change through approved procedures.",
        "Verify runtime and persistent configuration agree.",
      ],
    },
    {
      cause: "Read-only container or network volume",
      symptoms: [
        "Writes fail only inside a container or on a specific remote mount.",
        "The host filesystem may remain writable.",
        "Container or remote-filesystem configuration indicates restricted access.",
      ],
      investigation: [
        "Inspect container volume and mount settings.",
        "Check remote filesystem health and server-side export settings.",
        "Compare the host mount with the application-visible mount.",
      ],
      resolution: [
        "Correct the volume configuration if writable access is required and authorized.",
        "Resolve remote storage availability or server-side problems.",
        "Retain read-only access when it is an intentional security control.",
      ],
    },
  ],

  incidentScenario: {
    environment:
      "Illustrative scenario: a Linux VM hosts an application whose data directory is on a local filesystem.",

    incident:
      "The application suddenly fails to update files and reports a read-only filesystem error.",

    impact: [
      "New application records cannot be written.",
      "The service begins returning errors for write operations.",
      "Read operations may continue to work.",
    ],

    investigation: [
      "The engineer identifies the affected application data path.",
      "findmnt confirms that the corresponding filesystem is mounted read-only.",
      "Kernel logs reveal filesystem errors near the time writes stopped.",
      "The engineer checks the backing device and storage health before attempting recovery.",
    ],

    rootCause:
      "In this illustrative scenario, filesystem errors caused Linux to protect the filesystem by switching it to read-only mode.",

    resolution: [
      "The team stops unsafe write attempts and protects the available data.",
      "The backing storage and filesystem are investigated.",
      "Recovery is performed using the correct filesystem-specific procedure.",
      "The mount and application are verified before normal traffic resumes.",
    ],

    prevention: [
      "Monitor kernel filesystem errors and storage health.",
      "Maintain tested backups and recovery procedures.",
      "Alert on unexpected mount-mode changes.",
      "Review storage capacity, reliability, and maintenance events.",
    ],
  },

  verification: [
    "The affected mount point and backing device are known.",
    "The mount has the intended ro or rw mode.",
    "Disk space and inode availability are acceptable.",
    "An approved write test succeeds when writable access is expected.",
    "The application can perform its required write operations.",
    "Kernel logs show no continuing storage or filesystem errors.",
    "Data integrity has been validated where required.",
    "Monitoring remains stable after recovery.",
  ],

  prevention: [
    "Monitor kernel logs for filesystem and device errors.",
    "Alert on unexpected read-only remounts.",
    "Monitor filesystem capacity and inode usage.",
    "Maintain reliable backups and test recovery procedures.",
    "Review /etc/fstab and mount automation changes.",
    "Use storage-health monitoring appropriate to the platform.",
    "Document filesystem-specific repair and recovery procedures.",
    "Keep critical data on reliable storage with tested recovery options.",
  ],

  monitoring: [
    "Filesystem mount mode and unexpected ro transitions.",
    "Kernel filesystem errors and block-device I/O errors.",
    "Disk capacity and inode utilization.",
    "Cloud-volume or virtual-disk health metrics.",
    "Application write failures and database errors.",
    "Service availability and write-request error rates.",
    "Backup completion and restore-test results.",
  ],

  safetyRules: [
    "Read-only mode may be a protective response to filesystem or storage errors.",
    "Do not blindly remount a damaged filesystem as read-write.",
    "Never guess a device name when running filesystem repair commands.",
    "Do not repair an active mounted filesystem unless the tool explicitly supports it.",
    "Filesystem repair procedures differ by filesystem type.",
    "Preserve logs and protect critical data before recovery.",
    "Use approved maintenance and rollback procedures.",
    "Do not make a security-sensitive read-only mount writable without authorization.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Date and time detected:",
    "Affected host:",
    "Affected mount point:",
    "Backing device or volume:",
    "Filesystem type:",
    "Observed mount options:",
    "Application impact:",
    "Kernel or storage errors:",
    "Confirmed root cause:",
    "Recovery procedure:",
    "Data-integrity verification:",
    "Service recovery verification:",
    "Preventive actions:",
    "Owner and target date:",
  ],

  troubleshootingChecklist: [
    "Recorded the exact read-only error.",
    "Identified the affected path and mount point.",
    "Checked active mount options.",
    "Checked disk space and inode availability.",
    "Reviewed kernel and storage errors.",
    "Determined whether read-only mode is intentional or protective.",
    "Protected data and selected the correct recovery procedure.",
    "Avoided unsafe remounts and repair operations.",
    "Verified mount mode and application write operations.",
    "Documented the root cause and preventive actions.",
  ],
};

export default linuxFilesystemReadOnly;
