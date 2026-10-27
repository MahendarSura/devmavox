
export const storageExhaustedGuide = {
  title: "Nexus Repository Storage Exhausted",
  technology: "Sonatype Nexus Repository",
  category: "Nexus",
  severity: "Critical",
  summary:
    "Investigate and recover Nexus Repository storage exhaustion across " +
    "filesystem volumes, blob stores, databases, container volumes, and cloud storage.",

  incidentScenario: {
    title: "Production Nexus storage reaches 100%",
    symptoms: [
      "Artifact uploads fail with No space left on device.",
      "Nexus starts returning HTTP 500 or 503 errors.",
      "Build pipelines fail while resolving or publishing dependencies.",
      "Repository writes fail or the database becomes read-only.",
      "Nexus startup or maintenance tasks fail because storage is unavailable.",
      "The blob store reports a failed state or a low-space warning.",
      "Filesystem usage is high even after components were deleted.",
      "Nexus UI storage metrics disagree with operating-system disk usage."
    ],
    businessImpact: [
      "Production deployments may be blocked by missing dependencies.",
      "Artifact publishing and release promotion may fail.",
      "Repository metadata and write operations may become unavailable.",
      "An affected shared blob store may impact multiple repositories.",
      "Repeated retries can increase load without resolving the capacity problem.",
      "Unsafe cleanup can permanently remove required release artifacts."
    ],
    firstQuestions: [
      "Which exact filesystem or storage backend is full?",
      "Is the Nexus application directory, data directory, blob store, or database affected?",
      "Is the issue limited to one repository or shared by multiple repositories?",
      "Did growth follow a large upload, Docker image push, retention change, or upgrade?",
      "Were components deleted recently, and was blob-store compaction run afterward?",
      "Is the filesystem full in bytes, inodes, or both?",
      "Is storage local, network-mounted, container-backed, or object storage?",
      "Are writes failing while reads still work?"
    ]
  },

  severityAndImpact: {
    guidance: [
      {
        severity: "SEV-1",
        condition:
          "Critical shared Nexus storage is exhausted and production delivery or recovery operations are broadly blocked."
      },
      {
        severity: "SEV-2",
        condition:
          "A critical blob store or database cannot safely accept writes, or multiple important repositories are affected."
      },
      {
        severity: "SEV-3",
        condition:
          "One repository or non-production environment is affected and a safe workaround exists."
      },
      {
        severity: "SEV-4",
        condition:
          "Capacity is approaching a threshold but service remains healthy and mitigation is available."
      }
    ],
    note:
      "Follow organizational incident policy. Treat imminent storage exhaustion as an incident before it reaches 100%."
  },

  storageLayers: [
    {
      layer: "Application filesystem",
      examples: [
        "Nexus installation files",
        "Logs and temporary files",
        "Multiple old installation directories"
      ],
      checks: [
        "Application and log volume usage",
        "Unexpected log growth",
        "Deleted files still held open by processes"
      ]
    },
    {
      layer: "Nexus data directory",
      examples: [
        "Database files",
        "Configuration",
        "Blob-store directories",
        "Temporary and task log data"
      ],
      checks: [
        "Identify the actual configured data directory",
        "Check each underlying filesystem",
        "Avoid deleting database or internal files manually"
      ]
    },
    {
      layer: "File-based blob store",
      examples: [
        "Hosted artifacts",
        "Cached proxy artifacts",
        "Soft-deleted blobs",
        "Temporary upload content"
      ],
      checks: [
        "Blob-store path and state",
        "Filesystem bytes and inodes",
        "Temporary files and soft-deleted content",
        "Compaction task history"
      ]
    },
    {
      layer: "Database",
      examples: [
        "Embedded database where supported",
        "External PostgreSQL",
        "Database volume and transaction logs"
      ],
      checks: [
        "Database filesystem capacity",
        "Database health and writable state",
        "Transaction log or WAL growth",
        "Database-specific capacity and retention policies"
      ]
    },
    {
      layer: "Container or orchestration storage",
      examples: [
        "Kubernetes PersistentVolumeClaim",
        "Docker bind mount or volume",
        "Container ephemeral storage"
      ],
      checks: [
        "Mounted filesystem usage",
        "PVC capacity and expansion support",
        "Pod events and volume mount state",
        "Underlying storage provider health"
      ]
    },
    {
      layer: "Cloud or network storage",
      examples: [
        "S3-compatible object storage",
        "Cloud blob storage",
        "NFS or supported network filesystem"
      ],
      checks: [
        "Quota and service limits",
        "Credentials and permissions",
        "Network connectivity and latency",
        "Provider-side lifecycle or deletion behavior"
      ]
    }
  ],

  safetyChecks: [
    "Confirm the exact Nexus instance, environment, data directory, and affected blob store.",
    "Identify every repository sharing the affected blob store.",
    "Capture current usage, error timestamps, logs, and task history before changes.",
    "Obtain production approval for cleanup, volume expansion, restarts, and repository deletion.",
    "Do not delete files directly from a blob-store content directory.",
    "Do not manually remove Nexus database files, lock files, or database transaction logs.",
    "Do not run broad rm commands against nexus-data, content, db, or blob-store paths.",
    "Do not assume deleted components immediately release physical disk space.",
    "Do not run database or blob-store repair tasks merely because storage is full.",
    "Do not assume a soft quota prevents writes; it may only raise warnings.",
    "Verify backup and restore coverage before irreversible cleanup.",
    "For cloud storage, verify the provider's retention, versioning, and deletion behavior.",
    "If the filesystem is critically full, prioritize safe capacity relief over expensive diagnostics.",
    "Do not restart or stop production Nexus until the operational impact and recovery plan are understood."
  ],

  evidenceCollection: {
    collect: [
      "Incident start time and last known healthy time.",
      "Nexus version and deployment model.",
      "Filesystem mount, total capacity, used capacity, and free capacity.",
      "Inode usage and mount read/write state.",
      "Nexus data directory and blob-store path.",
      "Blob-store state and available-space metrics.",
      "Database backend, database volume capacity, and health.",
      "Container image, pod restarts, PVC events, or volume expansion events.",
      "Large artifact uploads, recent releases, and repository growth.",
      "Cleanup-policy execution and compact blob-store task history.",
      "Nexus application logs, task logs, and operating-system logs.",
      "Cloud storage quota, provider errors, and lifecycle settings.",
      "Recent upgrades, configuration changes, retention changes, and maintenance."
    ],
    commands: [
      {
        purpose: "Check filesystem capacity",
        command: "df -hT",
        interpretation:
          "Identify full filesystems, filesystem types, and mount points. Check the actual Nexus and blob-store paths."
      },
      {
        purpose: "Check inode exhaustion",
        command: "df -i",
        interpretation:
          "A filesystem may have free bytes but no free inodes for new files."
      },
      {
        purpose: "Check mount details",
        command: "findmnt",
        interpretation:
          "Confirm expected mounts are present and identify the backing filesystem."
      },
      {
        purpose: "Check top-level directory sizes",
        command: "du -xhd1 /path/to/nexus-data 2>/dev/null | sort -h",
        interpretation:
          "Run with appropriate permissions. Replace the path with the actual data directory. GNU du supports these options; use platform-specific equivalents when necessary."
      },
      {
        purpose: "Check blob-store directory usage",
        command: "du -sh /path/to/blobstore",
        interpretation:
          "Compares physical filesystem usage with Nexus-reported usage. Use the actual file-based blob-store path."
      },
      {
        purpose: "Check deleted files still held open",
        command: "sudo lsof +L1",
        interpretation:
          "A deleted log or file may continue consuming disk space until its file handle is released. Review the owning process before taking action."
      },
      {
        purpose: "Find large files without deleting anything",
        command: "find /path/to/nexus-data -xdev -type f -size +1G -print",
        interpretation:
          "Read-only inventory of large files on the selected filesystem. Do not treat a large file as safe to delete."
      },
      {
        purpose: "Inspect recent Nexus storage errors",
        command: "grep -Ei 'no space left|blobstore|disk full|read-only|IOException|database|I/O error' /path/to/nexus-data/log/nexus.log | tail -n 200",
        interpretation:
          "Use the actual log path. Correlate matches with the incident time and preserve surrounding context."
      },
      {
        purpose: "Check system service state",
        command: "systemctl status nexus --no-pager",
        interpretation:
          "Use only for a systemd-managed service named nexus. Container deployments require container-specific checks."
      }
    ],
    caution:
      "Commands in this section are diagnostic examples, not universal paths. Run them against the correct host or container and redact sensitive output."
  },

  diagnosticSequence: [
    {
      step: 1,
      title: "Confirm the incident and affected scope",
      actions: [
        "Capture one failed upload or download with timestamp and HTTP response.",
        "Identify affected repository names and package formats.",
        "Check whether all repositories fail or only those sharing a particular blob store.",
        "Compare a read request with a write request when safe.",
        "Review pipeline failures and whether deployments are blocked."
      ],
      decisions: [
        {
          if: "All repositories and Nexus health endpoints fail.",
          then:
            "Check shared storage, database, service health, and infrastructure before focusing on a single repository."
        },
        {
          if: "Only repositories sharing one blob store fail.",
          then:
            "Prioritize that blob store, its mount, and its capacity."
        },
        {
          if: "Only artifact uploads fail.",
          then:
            "Investigate writable readiness, free space, permissions, and database or blob-store write errors."
        },
        {
          if: "Only one client fails.",
          then:
            "Check client permissions, credentials, request paths, and client-side behavior."
        }
      ]
    },
    {
      step: 2,
      title: "Check bytes, inodes, and the actual mount",
      actions: [
        "Run df -hT and df -i.",
        "Identify the filesystem containing the data directory.",
        "Identify each file-based blob-store mount.",
        "Check whether the mount is missing, read-only, or unexpectedly replaced.",
        "Check for filesystem I/O errors and storage provider events."
      ],
      decisions: [
        {
          if: "Available bytes are near zero.",
          then:
            "Find the responsible storage consumer and arrange safe capacity relief or expansion."
        },
        {
          if: "Inodes are exhausted but bytes remain.",
          then:
            "Investigate excessive small files and temporary-file growth. Do not delete files indiscriminately."
        },
        {
          if: "The expected mount is missing.",
          then:
            "Stop writes to the affected path and restore the correct mount through the approved procedure."
        },
        {
          if: "The filesystem is read-only or reports I/O errors.",
          then:
            "Engage the storage or operating-system owner. Avoid write-heavy cleanup until filesystem health is understood."
        }
      ]
    },
    {
      step: 3,
      title: "Find which directory is consuming capacity",
      actions: [
        "Use du against the correct data directory.",
        "Compare application, log, database, and blob-store usage.",
        "Inspect task logs and temporary directories.",
        "Check whether old installation directories or unrelated files share the same volume.",
        "Check for deleted files still held open by running processes."
      ],
      decisions: [
        {
          if: "Blob store dominates disk usage.",
          then:
            "Continue with blob-store usage, cleanup policies, soft-deleted content, and capacity planning."
        },
        {
          if: "Logs dominate disk usage.",
          then:
            "Inspect log rotation and the cause of log growth. Use the approved log-retention procedure."
        },
        {
          if: "Database or transaction logs dominate.",
          then:
            "Engage the database owner and follow backend-specific maintenance procedures."
        },
        {
          if: "du reports less than df.",
          then:
            "Investigate deleted-but-open files, filesystem reservations, snapshots, and mount boundaries."
        }
      ],
      caution:
        "Do not run recursive size scans across a very large production filesystem without considering I/O impact."
    },
    {
      step: 4,
      title: "Inspect Nexus blob-store health",
      actions: [
        "Open Settings > Blob Stores.",
        "Record each affected blob store's name, type, state, and reported usage.",
        "Identify repositories attached to the affected blob store.",
        "Check soft-quota warnings and available-space indicators.",
        "Inspect logs for blob-store initialization, write, or I/O errors."
      ],
      decisions: [
        {
          if: "Blob store state is Failed.",
          then:
            "Resolve the storage configuration, mount, credentials, or backend issue before resuming writes."
        },
        {
          if: "Blob store metrics appear stale.",
          then:
            "Compare with operating-system or provider metrics and investigate when the UI last refreshed. Do not assume the displayed state is current."
        },
        {
          if: "Several repositories share the same failed store.",
          then:
            "Assess the shared impact and coordinate a single storage recovery plan."
        }
      ]
    },
    {
      step: 5,
      title: "Check whether deleted artifacts still occupy disk",
      actions: [
        "Review cleanup-policy and cleanup-task results.",
        "Check whether cleanup only soft-deleted components.",
        "Review Admin - Compact blob store task history for the relevant store.",
        "Compare the physical directory size with Nexus blob-store metrics.",
        "Inspect temporary-file growth where supported."
      ],
      decisions: [
        {
          if: "Cleanup completed but physical usage did not decrease.",
          then:
            "Determine whether compaction is pending, the wrong blob store was selected, or storage-provider deletion is delayed."
        },
        {
          if: "Temporary files are unusually large.",
          then:
            "Use the supported Admin - Delete blobstore temporary files task when applicable, after confirming version support and operational safety."
        },
        {
          if: "There are no eligible soft-deleted blobs.",
          then:
            "Compaction may reclaim little or no space. Focus on capacity expansion or an approved retention plan."
        }
      ],
      caution:
        "Cleanup policies usually mark content for removal first. Physical space recovery may require a compact blob-store task. Follow the installed version's documentation."
    },
    {
      step: 6,
      title: "Check database health and writable readiness",
      actions: [
        "Query the supported Nexus status and writable-status endpoints.",
        "Inspect nexus.log for database connection, transaction, read-only, and migration errors.",
        "For PostgreSQL, inspect database capacity, connectivity, transaction logs, and database-side errors.",
        "For embedded database deployments, follow the exact version's supported storage and recovery guidance.",
        "Check whether the database volume is separate from the blob-store volume."
      ],
      decisions: [
        {
          if: "Nexus is not writable and database errors are present.",
          then:
            "Resolve database or data-volume health before retrying artifact uploads."
        },
        {
          if: "Blob store is full but database remains healthy.",
          then:
            "Prioritize blob-store capacity and write-path validation."
        },
        {
          if: "Both database and blob-store volumes are exhausted.",
          then:
            "Coordinate a dependency-ordered recovery plan rather than cleaning one layer blindly."
        }
      ],
      caution:
        "Some Nexus versions can enter a database read-only mode when free disk space falls below a safety threshold. Confirm the exact behavior for the installed version."
    },
    {
      step: 7,
      title: "Check Docker, Kubernetes, and persistent volumes",
      actions: [
        "Identify whether Nexus runs on a VM, Docker, or Kubernetes.",
        "Check the actual mount from inside the Nexus runtime.",
        "For Kubernetes, inspect the PVC, PV, storage class, pod events, and volume expansion support.",
        "For Docker, inspect mounted volumes and the host filesystem rather than relying only on container root usage.",
        "Verify storage expansion prerequisites and whether filesystem expansion is automatic.",
        "Review storage-provider limits and expansion events."
      ],
      exampleCommands: [
        "kubectl get pvc -n <namespace>",
        "kubectl describe pvc <pvc-name> -n <namespace>",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl exec -n <namespace> <pod-name> -- df -hT",
        "docker inspect <nexus-container>",
        "docker exec <nexus-container> df -hT"
      ],
      decisions: [
        {
          if: "PVC is full and expansion is supported.",
          then:
            "Follow the platform's approved PVC expansion process and verify filesystem capacity inside the running workload."
        },
        {
          if: "PVC expansion is unsupported or pending.",
          then:
            "Coordinate with the storage administrator and choose a supported migration or expansion plan."
        },
        {
          if: "Container ephemeral storage is exhausted.",
          then:
            "Identify temporary files, logs, and container limits; do not assume the persistent blob-store volume is responsible."
        }
      ]
    },
    {
      step: 8,
      title: "Check object storage and network storage",
      actions: [
        "Identify the exact backend type and cloud region or endpoint.",
        "Check provider-side quota, capacity, throttling, and service health.",
        "Verify credentials and read/write permissions.",
        "Inspect network connectivity, latency, and provider errors.",
        "Review lifecycle policies, object versioning, and delayed deletion behavior.",
        "For network filesystems, check mount health, latency, and supported protocol/version."
      ],
      decisions: [
        {
          if: "Object-store quota or provider-side limits are reached.",
          then:
            "Coordinate quota or capacity remediation with the storage provider or cloud owner."
        },
        {
          if: "Credentials or permissions fail.",
          then:
            "Restore least-privilege access using the approved secret-management process."
        },
        {
          if: "Network storage is unreachable.",
          then:
            "Restore storage connectivity and validate the mounted backend before writes resume."
        }
      ],
      caution:
        "Object stores may not expose a conventional filesystem free-space value. Use provider metrics and Nexus-supported status information."
    },
    {
      step: 9,
      title: "Inspect growth patterns and capacity forecasts",
      actions: [
        "Compare storage metrics over the last hours, days, and weeks.",
        "Correlate growth with Docker image pushes, Maven snapshots, npm packages, and CI artifact retention.",
        "Inspect duplicate release publishing, temporary uploads, and abandoned test artifacts.",
        "Estimate daily growth and time remaining before the next critical threshold.",
        "Check whether cleanup policies cover the affected repositories and formats."
      ],
      decisions: [
        {
          if: "Growth is a sudden spike.",
          then:
            "Correlate with deployments, upload storms, runaway publishing, or unexpected artifacts."
        },
        {
          if: "Growth is steady and expected.",
          then:
            "Implement a capacity plan and conservative retention policies."
        },
        {
          if: "Usage grows after cleanup runs.",
          then:
            "Inspect cleanup scope, task results, new incoming artifacts, and whether compaction is completing."
        }
      ]
    },
    {
      step: 10,
      title: "Establish the root cause",
      actions: [
        "Build a timeline using Nexus logs, task logs, storage metrics, and deployment events.",
        "Distinguish byte exhaustion from inode exhaustion and backend unavailability.",
        "Identify whether physical usage comes from active artifacts, soft-deleted content, temporary files, logs, or database files.",
        "Confirm which repositories and services share the affected volume.",
        "Document the evidence supporting the selected corrective action."
      ],
      exitCriteria: [
        "The full or unhealthy storage layer is identified.",
        "The cause is supported by logs, metrics, or reproducible checks.",
        "The recovery action has an owner and rollback plan.",
        "Data deletion risks and affected repositories are understood."
      ]
    }
  ],

  recoveryPlan: {
    immediateContainment: [
      "Declare the incident and notify affected build and release teams.",
      "Pause nonessential large uploads or runaway publishers when approved.",
      "Preserve diagnostic evidence before making changes.",
      "If capacity is critically low, arrange safe expansion or approved space relief.",
      "Do not repeatedly retry failed uploads while the underlying storage is exhausted."
    ],

    cleanupWorkflow: [
      "Confirm that the proposed artifacts are eligible for removal under the organization's retention policy.",
      "Check backups and recovery requirements for important release artifacts.",
      "Create or validate a conservative cleanup policy for the correct repository.",
      "Preview the policy where supported and review the intended deletion scope.",
      "Run the supported cleanup task during an appropriate operational window.",
      "Run Admin - Compact blob store for the affected file-based blob store when eligible soft-deleted content needs physical removal.",
      "Monitor task status, task logs, Nexus logs, and available space.",
      "For object storage, confirm the provider-specific deletion and lifecycle behavior."
    ],

    capacityExpansionWorkflow: [
      "Identify the exact filesystem, PVC, disk, or object-store quota requiring expansion.",
      "Confirm the storage backend supports expansion and record current capacity.",
      "Obtain approval and coordinate with the infrastructure or cloud owner.",
      "Expand the underlying capacity using the supported platform procedure.",
      "If required, expand the partition or filesystem according to the operating system and storage documentation.",
      "Verify the new capacity from the Nexus runtime itself.",
      "Confirm the mount remains correct and writable.",
      "Recheck Nexus and blob-store health before resuming normal traffic."
    ],

    restartGuidance: [
      "Do not restart Nexus as the default response to a full filesystem.",
      "First restore enough safe capacity and investigate database and blob-store health.",
      "Restart only if the recovery procedure or evidence requires it and approval is obtained.",
      "For Kubernetes, do not delete pods as a substitute for resolving a full persistent volume.",
      "After any restart, verify service readiness, writable readiness, blob-store health, and repository access."
    ],

    stopConditions: [
      "Storage is reporting I/O errors or a read-only filesystem.",
      "Database integrity is uncertain.",
      "The proposed cleanup may delete required release artifacts.",
      "The affected blob store is shared by critical repositories and impact is not understood.",
      "Capacity expansion could affect another production workload.",
      "The recovery procedure requires bypassing access controls or disabling TLS verification."
    ]
  },

  rootCauseMatrix: [
    {
      symptom: "Filesystem reaches 100%",
      possibleCauses: [
        "Artifact growth",
        "Large Docker images",
        "Unbounded snapshots",
        "Logs or temporary files",
        "Soft-deleted blobs still present"
      ],
      evidence: [
        "df -hT",
        "df -i",
        "du directory inventory",
        "Cleanup and compaction task logs"
      ],
      fix:
        "Address the actual storage consumer through approved retention, compaction, log rotation, or capacity expansion."
    },
    {
      symptom: "Disk has free bytes but writes fail",
      possibleCauses: [
        "Inode exhaustion",
        "Read-only filesystem",
        "Permission problems",
        "I/O errors",
        "Database or blob-store failure"
      ],
      evidence: [
        "df -i",
        "findmnt",
        "Operating-system logs",
        "Nexus exceptions",
        "Database and blob-store health"
      ],
      fix:
        "Resolve the specific filesystem, permission, database, or backend issue before retrying writes."
    },
    {
      symptom: "Deleted artifacts do not free space",
      possibleCauses: [
        "Soft-deleted blobs remain",
        "Compaction has not run",
        "Wrong blob store selected",
        "Object-store deletion is delayed",
        "Deleted files remain open"
      ],
      evidence: [
        "Cleanup task logs",
        "Compact blob store task status",
        "Nexus versus filesystem metrics",
        "Provider-side storage metrics",
        "lsof output where available"
      ],
      fix:
        "Use the supported cleanup and compaction process and validate the actual storage backend's deletion behavior."
    },
    {
      symptom: "Nexus database becomes read-only",
      possibleCauses: [
        "Insufficient free space",
        "Database volume exhaustion",
        "Database connectivity or transaction failures"
      ],
      evidence: [
        "Writable status",
        "Nexus logs",
        "Database logs",
        "Database volume capacity"
      ],
      fix:
        "Restore database and filesystem health, then follow the version-specific procedure for writable recovery."
    },
    {
      symptom: "Nexus UI usage differs from df output",
      possibleCauses: [
        "Soft-deleted content",
        "Temporary files",
        "Filesystem overhead or reserved blocks",
        "Deleted-but-open files",
        "Stale metrics"
      ],
      evidence: [
        "Blob-store UI",
        "du output",
        "df output",
        "lsof output",
        "Task logs"
      ],
      fix:
        "Reconcile the metrics using supported maintenance tasks and platform-specific storage diagnostics."
    }
  ],

  prevention: {
    capacityManagement: [
      "Set warning and critical thresholds well before capacity exhaustion.",
      "Forecast daily and weekly storage growth.",
      "Maintain headroom appropriate to artifact growth, upload bursts, and maintenance needs.",
      "Separate application, database, and blob-store capacity where appropriate.",
      "Review large-artifact and Docker image retention regularly.",
      "Document storage expansion procedures and responsible owners."
    ],
    nexusMaintenance: [
      "Configure cleanup policies for appropriate repositories.",
      "Schedule Admin - Compact blob store for relevant file-based blob stores.",
      "Review temporary-file cleanup support for the installed version.",
      "Monitor cleanup task success and actual space reclaimed.",
      "Use soft quotas for warnings while recognizing they do not necessarily block writes.",
      "Never manipulate blob-store contents directly."
    ],
    monitoring: [
      "Alert on filesystem bytes and inode usage.",
      "Monitor blob-store state and available capacity.",
      "Monitor database volume and transaction-log growth.",
      "Monitor PVC usage, storage-provider quotas, and I/O errors.",
      "Alert on repeated No space left on device errors.",
      "Track storage growth by repository or blob store where supported.",
      "Monitor cleanup and compaction task failures."
    ]
  },

  incidentReportTemplate: {
    incidentId: "",
    startTimeUtc: "",
    detectionTimeUtc: "",
    recoveryTimeUtc: "",
    affectedEnvironment: "",
    nexusVersion: "",
    deploymentModel: "",
    affectedRepositories: [],
    affectedBlobStores: [],
    affectedFilesystems: [],
    capacityBefore: "",
    capacityAfter: "",
    inodeUsage: "",
    customerAndPipelineImpact: "",
    timeline: [],
    rootCause: "",
    evidence: [],
    cleanupActions: [],
    capacityExpansionActions: [],
    dataIntegrityValidation: [],
    recoveryValidation: [],
    preventionActions: [],
    actionOwners: [],
    followUpDates: []
  },

  handsOnLabs: [
    {
      title: "Lab 1: Filesystem byte exhaustion",
      objective: "Learn to identify a full filesystem safely.",
      tasks: [
        "Use a disposable Linux VM and a small test filesystem.",
        "Observe df -hT and df -i.",
        "Identify the largest directories without deleting data.",
        "Practice a documented capacity expansion or cleanup procedure."
      ]
    },
    {
      title: "Lab 2: Inode exhaustion",
      objective: "Distinguish inode exhaustion from byte exhaustion.",
      tasks: [
        "Use a disposable test filesystem.",
        "Create a controlled number of small test files.",
        "Observe inode metrics and write failures.",
        "Clean up only the test files and verify recovery."
      ]
    },
    {
      title: "Lab 3: Cleanup versus compaction",
      objective: "Understand soft deletion and physical storage reclamation.",
      tasks: [
        "Use a disposable Nexus repository.",
        "Publish test artifacts and record storage usage.",
        "Apply a test cleanup policy.",
        "Inspect cleanup results and run the supported compact task.",
        "Compare Nexus and filesystem usage."
      ]
    },
    {
      title: "Lab 4: Kubernetes PVC capacity",
      objective: "Investigate persistent volume exhaustion.",
      tasks: [
        "Use a disposable Kubernetes namespace and test PVC.",
        "Compare PVC capacity with df output inside the pod.",
        "Inspect PVC events and storage-class expansion support.",
        "Practice an approved test-volume expansion."
      ]
    },
    {
      title: "Lab 5: Incident response",
      objective: "Build an evidence-based recovery plan.",
      tasks: [
        "Use synthetic Nexus errors and storage metrics.",
        "Create a timestamped incident timeline.",
        "Identify the full storage layer and supporting evidence.",
        "Write a recovery plan, stop conditions, and validation checklist."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "Why might deleting components not free disk space immediately?",
      answer:
        "Nexus can soft-delete content first. A supported compact blob-store task may be required to physically remove eligible files."
    },
    {
      question: "What is the difference between df and du?",
      answer:
        "df reports filesystem-level usage, while du totals reachable files under a directory. Deleted-but-open files and filesystem accounting can explain differences."
    },
    {
      question: "How can writes fail when free disk bytes remain?",
      answer:
        "Inodes may be exhausted, the filesystem may be read-only, permissions may be wrong, or the database or blob store may be unhealthy."
    },
    {
      question: "Should you manually delete large files inside a Nexus blob store?",
      answer:
        "No. Nexus manages blob content and metadata together. Use supported cleanup, compaction, or recovery procedures."
    },
    {
      question: "What should be checked before expanding a Kubernetes PVC?",
      answer:
        "The actual full mount, storage class capabilities, current PVC and PV state, filesystem expansion behavior, approvals, and the rollback or recovery plan."
    },
    {
      question: "Why check both Nexus UI usage and operating-system usage?",
      answer:
        "The values can differ because of soft-deleted blobs, temporary files, filesystem overhead, deleted-open files, and metrics refresh timing."
    },
    {
      question: "When should Nexus be restarted during a storage incident?",
      answer:
        "Only when evidence and the approved recovery procedure justify it, after addressing the storage and database conditions that caused the incident."
    },
    {
      question: "How do you prove recovery is complete?",
      answer:
        "Verify real free capacity, inode headroom, database and blob-store health, successful repository reads and writes, and stable monitoring."
    }
  ],

  completionChecklist: [
    "Incident severity and affected teams are documented.",
    "Correct Nexus instance and storage backend are confirmed.",
    "Filesystem bytes, inodes, and mounts are checked.",
    "Blob-store state and repository dependencies are documented.",
    "Database health and writable readiness are checked.",
    "Cleanup and compaction history is reviewed.",
    "Container, PVC, or cloud storage is checked where relevant.",
    "Root cause is supported by evidence.",
    "Cleanup scope or capacity expansion is approved.",
    "No direct blob-store or database file deletion was performed.",
    "Actual capacity recovery is verified.",
    "Repository reads and writes are validated safely.",
    "Monitoring confirms stable recovery.",
    "Incident report and prevention actions have owners."
  ],

  officialReferences: [
    {
      title: "Nexus Repository System Requirements",
      url:
        "https://help.sonatype.com/en/sonatype-nexus-repository-system-requirements.html"
    },
    {
      title: "Nexus Repository Blob Stores",
      url: "https://help.sonatype.com/en/blob-stores.html"
    },
    {
      title: "Nexus Repository Storage Guide",
      url: "https://help.sonatype.com/en/storage-guide.html"
    },
    {
      title: "Cleanup Policies",
      url: "https://help.sonatype.com/en/cleanup-policies.html"
    },
    {
      title: "Nexus Repository Tasks",
      url: "https://help.sonatype.com/en/tasks.html"
    },
    {
      title: "Keeping Disk Usage Low",
      url: "https://help.sonatype.com/en/keeping-disk-usage-low.html"
    },
    {
      title: "What to Do When the Blobstore Is Out of Disk Space",
      url:
        "https://support.sonatype.com/hc/en-us/articles/360000096228-What-to-Do-When-the-Blobstore-is-Out-of-Disk-Space"
    },
    {
      title: "Understanding Blob Store Size Discrepancies",
      url:
        "https://support.sonatype.com/hc/en-us/articles/38856850788627-Understanding-File-Blob-Store-Size-Discrepancies-UI-vs-Disk-vs-Repository-Calculations"
    }
  ]
} as const;

export default storageExhaustedGuide;
