
export interface DockerVolumeDiagnosticStep {
  title: string;
  purpose: string;
  commands: string[];
  expectedEvidence: string[];
  interpretation: string[];
  nextAction: string[];
}

export interface DockerVolumeRootCause {
  cause: string;
  symptoms: string[];
  evidence: string[];
  diagnosis: string[];
  remediation: string[];
  validation: string[];
}

export interface DockerVolumeInterviewQuestion {
  question: string;
  answer: string;
  followUp: string;
}

export interface DockerVolumesGuide {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  summary: string;
  overview: {
    definition: string;
    storageTypes: {
      name: string;
      explanation: string;
      suitableFor: string[];
      risks: string[];
    }[];
    symptoms: string[];
    commonCauses: string[];
  };
  incidentScenario: {
    title: string;
    timeline: string[];
    impact: string[];
    hypotheses: string[];
    investigation: string[];
    recovery: string[];
  };
  impactAndSeverity: {
    environment: string;
    impact: string;
    severity: string;
    response: string;
  }[];
  safetyChecks: string[];
  evidenceCollection: {
    source: string;
    commands: string[];
    purpose: string;
    cautions: string[];
  }[];
  diagnosticWorkflow: DockerVolumeDiagnosticStep[];
  rootCausePlaybooks: DockerVolumeRootCause[];
  storageConcepts: {
    name: string;
    explanation: string;
    troubleshootingUse: string;
  }[];
  decisionTree: {
    symptom: string;
    evidence: string;
    likelyCause: string;
    nextAction: string;
  }[];
  recoveryWorkflow: {
    phase: string;
    actions: string[];
    successCriteria: string[];
  }[];
  backupAndRestore: {
    scenario: string;
    procedure: string[];
    validation: string[];
    warnings: string[];
  }[];
  prevention: {
    area: string;
    practices: string[];
  }[];
  commonMistakes: {
    mistake: string;
    whyItFails: string;
    betterApproach: string;
  }[];
  incidentReportTemplate: string[];
  productionRunbook: {
    phase: string;
    checklist: string[];
  }[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    expectedFinding: string;
    solution: string[];
  }[];
  interviewQuestions: DockerVolumeInterviewQuestion[];
  references: {
    title: string;
    url: string;
  }[];
}

export const dockerVolumesGuide = {
  title: "Docker Volumes — Real Production Troubleshooting Guide",
  slug: "volumes",
  category: "Docker",
  difficulty: "Advanced",
  summary:
    "Production troubleshooting for Docker volumes, bind mounts, missing or stale data, mount configuration, permission errors, disk exhaustion, inode exhaustion, read-only filesystems, database persistence, backup and restore, storage drivers, SELinux, remote storage, and safe recovery.",

  overview: {
    definition:
      "Docker storage troubleshooting focuses on the relationship between container filesystems, writable container layers, named volumes, anonymous volumes, bind mounts, the host filesystem, and any remote storage backend. The first task is to identify where the application actually stores its data. A container being recreated, restarted, or deleted can have different consequences depending on the storage type and lifecycle. Never assume that a directory is persistent simply because it exists inside a container.",

    storageTypes: [
      {
        name: "Named volume",
        explanation:
          "A Docker-managed volume with an explicit name. Docker manages its lifecycle and stores its data in a location determined by the volume driver.",
        suitableFor: [
          "Persistent application data",
          "Database data when the database's consistency and backup requirements are met",
          "Shared storage between intentionally connected containers"
        ],
        risks: [
          "Deleting the volume can destroy its data.",
          "The volume may be mounted at a different container path than expected.",
          "A volume driver can introduce external storage dependencies."
        ]
      },
      {
        name: "Anonymous volume",
        explanation:
          "A volume created without an explicit reusable name. It can persist beyond a container's lifetime, but finding and managing it may be less convenient.",
        suitableFor: [
          "Workloads where the lifecycle is intentionally managed",
          "Applications that explicitly account for anonymous volume behavior"
        ],
        risks: [
          "It may be difficult to identify the correct volume during recovery.",
          "Cleanup behavior depends on the command and options used.",
          "Do not assume that a new container automatically reuses the previous anonymous volume."
        ]
      },
      {
        name: "Bind mount",
        explanation:
          "A host file or directory is mounted into the container at a specified destination path.",
        suitableFor: [
          "Development source-code mounts",
          "Configuration files",
          "Explicitly managed host directories",
          "Storage that must exist at a known host path"
        ],
        risks: [
          "A wrong or empty host path can hide expected container content.",
          "Host permissions, ownership, SELinux labels, and filesystem availability can block access.",
          "A host path can be accidentally exposed to the container."
        ]
      },
      {
        name: "Container writable layer",
        explanation:
          "The writable filesystem layer belonging to a container. Data written only here is not a reliable persistence mechanism across container replacement.",
        suitableFor: [
          "Temporary files",
          "Ephemeral runtime state",
          "Data that can be regenerated"
        ],
        risks: [
          "Container replacement can discard data in this layer.",
          "Writes can increase storage usage.",
          "Application data may be lost if persistence was never configured."
        ]
      },
      {
        name: "Remote or plugin-backed volume",
        explanation:
          "A volume backed by a storage plugin or remote system. Availability depends on the driver, credentials, network, mount service, and remote storage health.",
        suitableFor: [
          "Approved shared-storage architectures",
          "Workloads requiring external storage management",
          "Platform-managed storage integrations"
        ],
        risks: [
          "Network or authentication failures can prevent mounting.",
          "Driver behavior and backup procedures vary.",
          "Remote storage consistency and performance must be understood."
        ]
      }
    ],

    symptoms: [
      "Files disappear after a container is recreated.",
      "A database starts with an empty data directory.",
      "The application reports permission denied when writing files.",
      "Docker reports a mount or volume initialization error.",
      "A host directory appears empty inside the container.",
      "The host disk becomes full even when individual containers appear small.",
      "The filesystem reports no space left on device.",
      "A container sees stale or unexpected files.",
      "The application reports a read-only filesystem.",
      "Database startup fails because of ownership or data-directory errors.",
      "A bind mount behaves differently between a developer laptop and Linux production.",
      "Volume initialization unexpectedly copies or hides existing content.",
      "A remote volume fails after a credential, network, or storage-driver change.",
      "Backup files exist but cannot be restored or are inconsistent.",
      "Container cleanup removes storage that operators expected to keep."
    ],

    commonCauses: [
      "Persistent application data was written into the container writable layer.",
      "A different named volume was mounted after deployment.",
      "The host source path or container destination path is incorrect.",
      "A bind mount hides files that were previously present in the image.",
      "The application UID/GID does not have the required filesystem permissions.",
      "SELinux or another host security policy denies access.",
      "The host filesystem is full or has exhausted inodes.",
      "A volume is mounted read-only or the underlying filesystem was remounted read-only.",
      "Docker or the volume driver cannot mount the storage backend.",
      "A database was backed up while writes were still occurring.",
      "A backup contains files but not a consistent database state.",
      "A container was removed with an option that also removed an associated volume.",
      "A cleanup process deleted an unused volume that was still needed for recovery.",
      "A storage path was mounted over an existing directory and concealed its contents.",
      "The application changed its data-directory setting.",
      "The volume driver or remote storage has an availability or authentication problem.",
      "Filesystem corruption or storage I/O errors affect reads and writes.",
      "The storage configuration differs between staging and production."
    ]
  },

  incidentScenario: {
    title:
      "Production database starts with an empty data directory after a release",

    timeline: [
      "10:00 — The database is healthy and serves production requests.",
      "10:15 — A release pipeline recreates the database container as part of a deployment.",
      "10:17 — The application cannot find expected records and the database startup logs show a new or empty data directory.",
      "10:18 — The incident owner pauses further deployment and data cleanup operations.",
      "10:20 — The team verifies the Docker context, host, container ID, image digest, Compose project, volume configuration, and deployment revision.",
      "10:23 — docker inspect shows that the new container is attached to a different named volume from the previous container. This is an illustrative root cause, not a universal explanation.",
      "10:26 — The team identifies the previous volume using its name, labels, mount information, timestamps, and application records.",
      "10:30 — The team checks whether the original database container is still available and whether any writes occurred in the new instance.",
      "10:35 — The team preserves both volumes and captures the relevant configuration and logs.",
      "10:40 — The database owner determines which data source is authoritative and whether the new instance accepted writes.",
      "10:45 — With approval, the team plans a controlled recovery using the verified volume and a database-consistent recovery procedure.",
      "11:00 — The database is restored or reattached through the approved deployment configuration, and application writes are validated.",
      "11:15 — The service owner confirms data integrity, request success, and database health.",
      "After the incident — The team adds a volume identity check, backup restore testing, and a deployment guard that prevents accidental database-volume changes."
    ],

    impact: [
      "The application may report missing records or behave as if it has been newly initialized.",
      "New writes to the wrong volume may create divergent data.",
      "Deleting the previous volume could make recovery substantially harder.",
      "A wrong mount may affect one service or several services sharing the storage backend."
    ],

    hypotheses: [
      "The container is using a different named volume.",
      "The persistent volume was never configured and data lived in the writable layer.",
      "The host bind-mount path changed or is empty.",
      "The application data-directory setting changed.",
      "The volume is present but inaccessible because of permissions or mount failure.",
      "The filesystem is read-only or has storage I/O errors."
    ],

    investigation: [
      "Pause destructive cleanup and identify the authoritative data source.",
      "Compare the previous and current container mount configuration.",
      "Inspect volume names, labels, drivers, mount destinations, and host paths where available.",
      "Check database logs and determine whether the new instance accepted writes.",
      "Check disk capacity, inodes, filesystem health, and permissions.",
      "Determine whether a database-consistent backup or snapshot is available."
    ],

    recovery: [
      "Preserve the original volume and current state before changing mounts.",
      "Stop writes to an incorrect instance when approved and safe to do so.",
      "Choose the authoritative data source with the database owner.",
      "Restore or reattach through a reviewed configuration change.",
      "Use the database's supported consistency and recovery procedure.",
      "Verify record counts, critical queries, application writes, and service health.",
      "Add deployment validation that detects unintended volume identity changes."
    ]
  },

  impactAndSeverity: [
    {
      environment: "Development",
      impact:
        "Local test data disappears or a bind mount does not expose expected files.",
      severity: "SEV-4 / Low",
      response:
        "Inspect the source path, destination path, mount type, and test-data lifecycle."
    },
    {
      environment: "Staging / QA",
      impact:
        "Tests run against empty, stale, or incorrect persistent data.",
      severity: "SEV-3 / Moderate",
      response:
        "Verify the intended volume identity, initialization process, and test-data source before promotion."
    },
    {
      environment: "Production — application storage degraded",
      impact:
        "Uploads, sessions, logs, or application writes fail.",
      severity: "SEV-2 / High",
      response:
        "Check capacity, permissions, mount state, and application errors. Protect existing data and coordinate any write interruption."
    },
    {
      environment: "Production — database data missing or storage unavailable",
      impact:
        "Data integrity, transaction processing, or critical service availability may be affected.",
      severity: "SEV-1 / Critical",
      response:
        "Declare an incident, pause destructive operations, involve the database/storage owner, preserve recovery options, and use an approved restoration plan."
    }
  ],

  safetyChecks: [
    "Verify the correct Docker context, production host, Compose project, container ID, volume name, and mount destination.",
    "Identify whether the affected data lives in a named volume, anonymous volume, bind mount, container writable layer, or remote storage.",
    "Pause cleanup jobs, pruning, deployment retries, and other destructive operations when data loss is suspected.",
    "Do not run docker volume prune or docker system prune during a suspected data-loss incident.",
    "Do not use docker compose down -v as a troubleshooting shortcut; it can remove declared volumes.",
    "Do not delete, rename, or overwrite a suspected original volume before preserving the evidence and recovery plan.",
    "Do not assume an unused volume is unneeded. It may contain data from a stopped or previously replaced service.",
    "For databases, coordinate with the database owner before stopping, copying, attaching, or restoring data.",
    "Avoid copying live database files as if they were automatically a consistent backup.",
    "Check whether the filesystem is full or read-only before retrying write-heavy operations.",
    "Do not recursively change ownership or permissions on a production data directory without confirming the intended UID/GID and scope.",
    "Do not run chmod -R 777 as a generic permission fix.",
    "Check SELinux labels and host security policies before disabling security controls.",
    "Preserve volume inspect output, mount information, logs, timestamps, and configuration revisions.",
    "Redact secrets, credentials, database contents, and personal data from incident evidence.",
    "Confirm the backup's age, consistency, encryption, and restore procedure before relying on it.",
    "Record the expected impact, approval, rollback procedure, and recovery validation before making changes."
  ],

  evidenceCollection: [
    {
      source: "Container identity and mount configuration",
      commands: [
        "docker context show",
        "docker ps -a --no-trunc",
        "docker inspect --format '{{.Id}} {{.Name}} {{.Config.Image}} {{.State.Status}}' CONTAINER",
        "docker inspect --format '{{json .Mounts}}' CONTAINER"
      ],
      purpose:
        "Identify the container image and the actual mounts, source locations, destinations, and read/write settings.",
      cautions: [
        "Replace CONTAINER with the verified name or ID.",
        "Inspect the previous container too if it still exists.",
        "Do not assume that a mount destination corresponds to the application's configured data directory."
      ]
    },
    {
      source: "Docker volume inventory",
      commands: [
        "docker volume ls",
        "docker volume inspect VOLUME",
        "docker ps -a --filter volume=VOLUME"
      ],
      purpose:
        "Identify volume names, labels, drivers, mountpoints where available, and containers that reference the volume.",
      cautions: [
        "Driver-specific details vary.",
        "A volume may not be visible to a container if it is attached elsewhere or managed by a remote backend.",
        "Do not remove volumes as part of evidence collection."
      ]
    },
    {
      source: "Host filesystem capacity",
      commands: [
        "df -hT",
        "df -i",
        "docker system df -v",
        "docker info"
      ],
      purpose:
        "Inspect filesystem capacity, inode availability, Docker disk usage, and runtime storage configuration.",
      cautions: [
        "docker system df is not a complete measurement of every remote or bind-mounted storage backend.",
        "Check the filesystem that actually stores the data, not just the root filesystem.",
        "Do not delete files until their ownership and purpose are known."
      ]
    },
    {
      source: "Host path and mount state",
      commands: [
        "findmnt -T /HOST/PATH",
        "stat /HOST/PATH",
        "ls -ldn /HOST/PATH",
        "mount"
      ],
      purpose:
        "Verify the host filesystem containing a bind mount, its mount state, permissions, ownership, and whether the expected path exists.",
      cautions: [
        "Replace /HOST/PATH with the verified path.",
        "A mount path can exist while the intended remote filesystem is not mounted.",
        "Avoid dumping sensitive directory contents unnecessarily."
      ]
    },
    {
      source: "Application and database logs",
      commands: [
        "docker logs --timestamps --tail 300 CONTAINER",
        "docker logs --timestamps --since 30m CONTAINER",
        "docker compose logs --timestamps --tail 300 SERVICE"
      ],
      purpose:
        "Find mount errors, missing files, permission errors, database recovery failures, and storage I/O errors.",
      cautions: [
        "Logs may include sensitive paths, credentials, and application data.",
        "Correlate log timestamps with container recreation and storage changes.",
        "Do not assume every database startup message means the data is safe or consistent."
      ]
    },
    {
      source: "Container user and filesystem permissions",
      commands: [
        "docker inspect --format '{{.Config.User}}' CONTAINER",
        "docker exec CONTAINER id",
        "docker exec CONTAINER sh -c 'id; pwd; ls -ldn /DATA/PATH'",
        "docker exec CONTAINER sh -c 'test -w /DATA/PATH && echo writable || echo not-writable'"
      ],
      purpose:
        "Compare the application user with the mounted directory's ownership and permissions.",
      cautions: [
        "Replace /DATA/PATH with the actual mount destination.",
        "A write test can change data if it creates a file; use a safe application-approved test where possible.",
        "The image may not contain a shell or standard utilities."
      ]
    },
    {
      source: "Compose model and effective configuration",
      commands: [
        "docker compose ps -a",
        "docker compose config --quiet",
        "docker compose config --services"
      ],
      purpose:
        "Validate the Compose model and inspect the service definitions used for deployment.",
      cautions: [
        "Use the intended directory, Compose files, project name, and environment.",
        "Resolved configuration may contain secrets; avoid publishing unredacted output.",
        "A valid Compose model does not prove that the intended volume contains the correct data."
      ]
    },
    {
      source: "Kernel and storage errors",
      commands: [
        "dmesg --ctime | tail -n 150",
        "journalctl -k --since '30 minutes ago'",
        "findmnt -T /HOST/PATH"
      ],
      purpose:
        "Investigate filesystem errors, I/O failures, device issues, or a filesystem remounted read-only.",
      cautions: [
        "Permissions and log availability vary by host.",
        "Do not attempt filesystem repair on a mounted production filesystem without a storage-specific recovery plan.",
        "Preserve relevant logs before restarting or replacing infrastructure."
      ]
    },
    {
      source: "SELinux and host security context",
      commands: [
        "getenforce",
        "ls -Zd /HOST/PATH",
        "ausearch -m AVC -ts recent"
      ],
      purpose:
        "Check whether SELinux is enabled and whether access denials align with the affected path.",
      cautions: [
        "These commands are platform-specific and may not be installed.",
        "Do not disable SELinux as a generic fix.",
        "Any relabeling or policy change must follow the host security team's process."
      ]
    },
    {
      source: "Container writable-layer usage",
      commands: [
        "docker ps -s",
        "docker inspect --format '{{json .GraphDriver.Data}}' CONTAINER",
        "docker system df -v"
      ],
      purpose:
        "Identify whether container writable layers are growing and whether expected persistent data may have been written outside a volume.",
      cautions: [
        "Storage-driver fields vary by platform and driver.",
        "Do not edit Docker-managed internal storage directories directly.",
        "A container writable layer is not a substitute for a backup."
      ]
    }
  ],

  diagnosticWorkflow: [
    {
      title: "Step 1 — Define the data-loss or storage symptom",
      purpose:
        "Determine whether the problem is missing data, failed writes, mount failure, capacity exhaustion, or performance degradation.",
      commands: [
        "docker context show",
        "docker ps -a --no-trunc",
        "docker volume ls",
        "df -hT",
        "df -i"
      ],
      expectedEvidence: [
        "The affected service, container, data directory, volume, host filesystem, and first failure timestamp.",
        "The application may report missing files, permission denied, no space left, or read-only filesystem.",
        "The container may have been recreated shortly before the issue."
      ],
      interpretation: [
        "Missing data and failed writes are different incidents and may require different recovery procedures.",
        "Full disk capacity and exhausted inodes can both prevent new files from being created.",
        "A running container does not prove that its expected persistent volume is mounted."
      ],
      nextAction: [
        "Record the exact error and the affected data path.",
        "Pause destructive cleanup and identify the authoritative data source before changing anything."
      ]
    },
    {
      title: "Step 2 — Inspect the actual mounts",
      purpose:
        "Establish exactly which host path or volume is mounted at the application's data directory.",
      commands: [
        "docker inspect --format '{{json .Mounts}}' CONTAINER",
        "docker volume ls",
        "docker volume inspect VOLUME"
      ],
      expectedEvidence: [
        "Mount type, source, destination, and read/write mode.",
        "The source may be a named volume, host path, or driver-managed location.",
        "The actual destination may differ from the expected application data directory."
      ],
      interpretation: [
        "If the expected mount is absent, the application may be writing into the container writable layer.",
        "If the source differs from the previous release, the container may be using a different data store.",
        "If the mount is read-only, the application may be unable to persist changes."
      ],
      nextAction: [
        "Compare current mounts with the previous container and approved configuration.",
        "Preserve both old and new sources if volume identity is uncertain."
      ]
    },
    {
      title: "Step 3 — Check the application data path",
      purpose:
        "Verify that the application is reading and writing the intended directory.",
      commands: [
        "docker inspect --format '{{json .Config.Env}}' CONTAINER",
        "docker inspect --format '{{json .Mounts}}' CONTAINER",
        "docker logs --timestamps --tail 200 CONTAINER"
      ],
      expectedEvidence: [
        "The application may use an environment variable or command-line option to set its data directory.",
        "The configured path may differ from the mounted destination.",
        "Logs may show initialization of an empty directory."
      ],
      interpretation: [
        "A correct volume attached to the wrong destination does not persist the data the application expects.",
        "Mounting a host directory over an image directory can hide files that were previously visible there.",
        "Never assume that a newly initialized database contains the original production data."
      ],
      nextAction: [
        "Verify the authoritative application data-directory setting.",
        "Compare the intended path with the actual mount destination before changing the deployment."
      ]
    },
    {
      title: "Step 4 — Check host capacity and inodes",
      purpose:
        "Determine whether writes fail because the underlying filesystem has no available capacity or inodes.",
      commands: [
        "df -hT",
        "df -i",
        "docker system df -v",
        "findmnt -T /HOST/PATH"
      ],
      expectedEvidence: [
        "The relevant filesystem may have little or no free space.",
        "Inode usage may be exhausted even when byte capacity remains.",
        "The host root filesystem and the volume's actual filesystem may be different."
      ],
      interpretation: [
        "No space left on device can result from byte capacity or inode exhaustion.",
        "Docker's disk-usage report may not account for every remote or bind-mounted storage system.",
        "Deleting unrelated Docker images may not free space on the filesystem that is actually full."
      ],
      nextAction: [
        "Identify the specific filesystem and largest responsible consumers.",
        "Follow the approved cleanup or capacity expansion process without deleting application data blindly."
      ]
    },
    {
      title: "Step 5 — Check ownership and permissions",
      purpose:
        "Identify whether the application user can access the mounted path.",
      commands: [
        "docker inspect --format '{{.Config.User}}' CONTAINER",
        "docker exec CONTAINER id",
        "docker exec CONTAINER sh -c 'ls -ldn /DATA/PATH'",
        "docker exec CONTAINER sh -c 'test -w /DATA/PATH && echo writable || echo not-writable'"
      ],
      expectedEvidence: [
        "The application UID/GID may not match the directory ownership or permissions.",
        "The path may be mounted correctly but still be inaccessible.",
        "The container's configured user may differ from the expected runtime user."
      ],
      interpretation: [
        "Filesystem permissions and ownership must be interpreted together.",
        "Root inside a container does not automatically bypass host security policies.",
        "SELinux can deny access even when ordinary Unix permissions appear sufficient."
      ],
      nextAction: [
        "Confirm the expected application UID/GID and minimum required permissions.",
        "Use a targeted ownership, permission, or security-policy correction only after verifying the intended scope."
      ]
    },
    {
      title: "Step 6 — Check read-only mounts and filesystem state",
      purpose:
        "Distinguish an explicitly read-only mount from an underlying filesystem that has become read-only.",
      commands: [
        "docker inspect --format '{{json .Mounts}}' CONTAINER",
        "findmnt -T /HOST/PATH",
        "dmesg --ctime | tail -n 150",
        "journalctl -k --since '30 minutes ago'"
      ],
      expectedEvidence: [
        "The mount may be configured read-only.",
        "The host filesystem may have been remounted read-only following an error.",
        "Kernel logs may contain filesystem or storage I/O failures."
      ],
      interpretation: [
        "A read-only bind mount is different from an underlying filesystem remounted read-only.",
        "Kernel I/O errors may indicate a storage problem rather than a Docker configuration error.",
        "Repeatedly restarting the application will not repair an underlying storage failure."
      ],
      nextAction: [
        "Identify the layer that is read-only and involve the storage owner if kernel errors exist.",
        "Do not remount or repair a production filesystem without an approved recovery plan."
      ]
    },
    {
      title: "Step 7 — Check SELinux and other host access controls",
      purpose:
        "Investigate security-policy denials when a bind mount is present but access fails.",
      commands: [
        "getenforce",
        "ls -Zd /HOST/PATH",
        "ausearch -m AVC -ts recent"
      ],
      expectedEvidence: [
        "SELinux may be enforcing.",
        "Audit logs may show a denial associated with the path or container process.",
        "The behavior may differ between environments with different host security settings."
      ],
      interpretation: [
        "A policy denial is different from ordinary file ownership or mode bits.",
        "Do not disable security controls simply to see whether the application starts.",
        "Volume labeling options and supported behavior depend on the platform and workload."
      ],
      nextAction: [
        "Confirm the denial and expected access with the host security owner.",
        "Apply the documented, narrowly scoped labeling or policy correction."
      ]
    },
    {
      title: "Step 8 — Inspect Docker Compose and deployment changes",
      purpose:
        "Find mount path, volume name, project name, and configuration changes introduced by the release.",
      commands: [
        "docker compose ps -a",
        "docker compose config --quiet",
        "docker compose config --services",
        "docker inspect --format '{{json .Mounts}}' CONTAINER"
      ],
      expectedEvidence: [
        "The current Compose model may reference a different named volume or host path.",
        "The project name or environment may change the actual resource name.",
        "The deployment may recreate a container without reusing the previous volume."
      ],
      interpretation: [
        "A valid Compose configuration can still reference the wrong volume.",
        "Volume identity must be checked alongside the mount destination.",
        "The effective configuration depends on the actual Compose files, project name, and environment used by deployment."
      ],
      nextAction: [
        "Compare the current configuration with the last known-good release.",
        "Correct the configuration in the source of truth and validate it before rollout."
      ]
    },
    {
      title: "Step 9 — Check database consistency and backup readiness",
      purpose:
        "Determine whether the data can be safely restored or reattached.",
      commands: [
        "docker logs --timestamps --tail 300 DATABASE_CONTAINER",
        "docker inspect --format '{{json .Mounts}}' DATABASE_CONTAINER",
        "docker volume ls",
        "docker volume inspect DATABASE_VOLUME"
      ],
      expectedEvidence: [
        "The database may report recovery, corruption, missing files, or initialization.",
        "An older volume or backup may exist.",
        "The current instance may have accepted writes after the incident began."
      ],
      interpretation: [
        "A file-level copy of a live database directory may not be a consistent backup.",
        "A previous volume is not automatically the correct source of truth if new transactions were accepted.",
        "Restoring an older backup may discard transactions after its recovery point."
      ],
      nextAction: [
        "Coordinate with the database owner and preserve the candidate sources.",
        "Choose a database-supported recovery procedure based on consistency and recovery-point requirements."
      ]
    },
    {
      title: "Step 10 — Check remote volume driver or storage backend",
      purpose:
        "Determine whether a remote or plugin-backed storage dependency is unavailable.",
      commands: [
        "docker volume inspect VOLUME",
        "docker info",
        "docker logs --timestamps --tail 200 CONTAINER"
      ],
      expectedEvidence: [
        "The volume may use a non-local driver.",
        "Driver or mount errors may correlate with a storage service, credentials, or network incident.",
        "The host may have lost access to a remote storage endpoint."
      ],
      interpretation: [
        "Remote volume semantics and diagnostics depend on the driver.",
        "A local Docker mountpoint field may not represent the full remote data location.",
        "Recreating a volume can make a recovery situation worse if the existing backend contains important data."
      ],
      nextAction: [
        "Consult the driver and storage platform documentation.",
        "Verify credentials, backend health, network connectivity, and supported recovery procedures."
      ]
    },
    {
      title: "Step 11 — Choose a targeted and reversible recovery",
      purpose:
        "Restore the correct storage path without destroying data or creating conflicting writers.",
      commands: [
        "docker inspect --format '{{json .Mounts}}' CONTAINER",
        "docker volume inspect VOLUME",
        "docker compose config --quiet"
      ],
      expectedEvidence: [
        "The authoritative data source is identified.",
        "The current and intended volume mappings are known.",
        "The change, approvals, rollback plan, and validation criteria are documented."
      ],
      interpretation: [
        "Wrong volume, wrong path, permissions, full disk, and storage corruption require different remediations.",
        "Stopping or restarting a database can affect transactions and availability.",
        "A rollback must account for writes made after the release."
      ],
      nextAction: [
        "Use a reviewed deployment change or a database-specific recovery procedure.",
        "Preserve the old volume until recovery and data integrity are confirmed."
      ]
    },
    {
      title: "Step 12 — Validate recovery and data integrity",
      purpose:
        "Confirm that the application uses the intended storage and that data is correct.",
      commands: [
        "docker ps --no-trunc",
        "docker inspect --format '{{json .Mounts}}' CONTAINER",
        "docker logs --timestamps --tail 200 CONTAINER",
        "df -hT",
        "df -i"
      ],
      expectedEvidence: [
        "The expected volume is attached to the intended destination.",
        "Application and database logs show healthy operation.",
        "The filesystem has sufficient capacity and writes succeed.",
        "Critical records and application transactions pass approved checks."
      ],
      interpretation: [
        "A running container does not prove data integrity.",
        "A successful write test does not prove that previous records were recovered.",
        "Recovery is incomplete until the service owner validates the required data and workflows."
      ],
      nextAction: [
        "Monitor storage usage, write errors, latency, and application health.",
        "Document the root cause and add a test that detects unintended volume changes."
      ]
    }
  ],

  rootCausePlaybooks: [
    {
      cause: "Application data was stored only in the container writable layer",
      symptoms: [
        "Files disappear after container replacement.",
        "The new container has an empty data directory.",
        "No expected persistent mount appears in docker inspect."
      ],
      evidence: [
        "The previous container's mount list does not include the application's data path.",
        "The application configuration points to a directory inside the container filesystem.",
        "The previous container may still exist and retain its writable layer."
      ],
      diagnosis: [
        "Compare the old and new container mount configurations.",
        "Identify whether the old container or its writable layer still exists.",
        "Determine whether any cleanup or replacement operation has already removed the original data."
      ],
      remediation: [
        "Preserve any remaining original container and data before further cleanup.",
        "Recover data using an application-supported process.",
        "Configure a named volume or approved persistent storage for future deployments.",
        "Do not assume that deleting or recreating the container can restore missing data."
      ],
      validation: [
        "The recovered data passes application-level integrity checks.",
        "Future container replacement retains required persistent data.",
        "A tested backup exists for the relevant data."
      ]
    },
    {
      cause: "Wrong named volume attached after deployment",
      symptoms: [
        "The application starts with empty or stale data.",
        "The old volume still exists but is not mounted by the current container.",
        "A Compose project or volume name changed."
      ],
      evidence: [
        "docker inspect shows a different mount source from the previous deployment.",
        "Volume inventory identifies the original and current volume.",
        "Deployment configuration changes correlate with the first failure."
      ],
      diagnosis: [
        "Compare previous and current mount sources and destinations.",
        "Verify volume labels, project names, and deployment environment.",
        "Check whether the current volume accepted new writes."
      ],
      remediation: [
        "Preserve both volumes and establish the authoritative data source.",
        "Use an approved deployment change to restore the intended mount.",
        "If the wrong instance accepted writes, coordinate reconciliation with the data owner before switching back."
      ],
      validation: [
        "The intended volume is mounted at the expected application path.",
        "Data integrity is verified.",
        "A deployment check detects unexpected volume identity changes."
      ]
    },
    {
      cause: "Incorrect bind-mount source or destination",
      symptoms: [
        "A host directory appears empty in the container.",
        "The application cannot find configuration or data files.",
        "The application sees different content after deployment."
      ],
      evidence: [
        "docker inspect shows an unexpected source or destination.",
        "The expected host path is missing, empty, or on a different filesystem.",
        "The mount covers a directory that previously contained image files."
      ],
      diagnosis: [
        "Inspect the actual mount and host path.",
        "Use findmnt, stat, and directory ownership to verify the host source.",
        "Compare the container destination with the application's configured path."
      ],
      remediation: [
        "Correct the bind-mount source and destination in the deployment configuration.",
        "Confirm that the host filesystem is mounted before starting the service.",
        "Preserve existing host data before moving or replacing paths."
      ],
      validation: [
        "The container sees the intended files.",
        "The application can access the expected path.",
        "The service starts correctly after a controlled redeployment."
      ]
    },
    {
      cause: "Permission denied on a mounted volume",
      symptoms: [
        "Application writes fail with permission denied.",
        "The container starts but cannot create or modify required files.",
        "The issue occurs after a UID/GID or image change."
      ],
      evidence: [
        "The application runs as a different user than expected.",
        "Host directory ownership or permissions do not allow the required access.",
        "SELinux or another host security policy may deny access."
      ],
      diagnosis: [
        "Check the effective application UID/GID.",
        "Inspect numeric ownership and mode bits on the mounted path.",
        "Check relevant security audit logs if ordinary permissions appear correct."
      ],
      remediation: [
        "Correct the intended ownership or minimum required permissions after verifying the exact path.",
        "Apply the approved SELinux labeling or policy correction where applicable.",
        "Avoid chmod -R 777 and avoid blindly changing ownership of a database tree."
      ],
      validation: [
        "The application can perform the required operations.",
        "Ownership and access remain least-privilege.",
        "No unrelated files or services have been modified."
      ]
    },
    {
      cause: "Disk capacity or inode exhaustion",
      symptoms: [
        "Writes fail with no space left on device.",
        "Logs, uploads, database writes, or temporary files stop working.",
        "Disk usage or file counts have increased sharply."
      ],
      evidence: [
        "df -hT shows exhausted capacity on the relevant filesystem.",
        "df -i shows exhausted inodes.",
        "Large logs, temporary files, container layers, or application data consume space."
      ],
      diagnosis: [
        "Identify the filesystem that actually contains the volume.",
        "Measure the largest responsible consumers using approved tools.",
        "Determine whether byte capacity, inodes, quotas, or a remote storage limit is exhausted."
      ],
      remediation: [
        "Use an approved cleanup procedure for verified disposable data.",
        "Rotate or reduce excessive logs through the supported logging configuration.",
        "Expand storage or adjust capacity through the infrastructure owner where required.",
        "Avoid deleting unknown files from database directories or Docker-managed storage."
      ],
      validation: [
        "The relevant filesystem has adequate capacity and inodes.",
        "Application writes succeed.",
        "Capacity alerts and retention controls are in place."
      ]
    },
    {
      cause: "Read-only filesystem or storage I/O failure",
      symptoms: [
        "Writes fail with a read-only filesystem error.",
        "Kernel logs show filesystem or device errors.",
        "The application repeatedly fails despite correct volume permissions."
      ],
      evidence: [
        "Mount configuration or findmnt output shows read-only state.",
        "Kernel logs contain storage or filesystem errors.",
        "The issue may affect multiple workloads on the same storage."
      ],
      diagnosis: [
        "Separate a configured read-only mount from an underlying filesystem failure.",
        "Check host and storage health with the responsible owner.",
        "Preserve logs and identify the affected filesystem before restarting services."
      ],
      remediation: [
        "If the mount was intentionally read-only, correct the configuration only when writes are required and approved.",
        "If the underlying filesystem has errors, follow the platform's recovery process.",
        "Do not force a remount or run filesystem repair against a live production filesystem without a safe plan."
      ],
      validation: [
        "Storage health is confirmed by the responsible platform owner.",
        "Writes succeed where expected.",
        "Kernel and application errors no longer recur."
      ]
    },
    {
      cause: "Database volume copied or restored inconsistently",
      symptoms: [
        "The database reports recovery failures or corruption after restoration.",
        "Files exist but the database will not start correctly.",
        "Recent transactions may be missing."
      ],
      evidence: [
        "The backup was taken while the database was writing without a supported consistency mechanism.",
        "The backup does not include required transaction logs or metadata.",
        "The restore procedure or recovery point is uncertain."
      ],
      diagnosis: [
        "Identify the database engine and its documented backup requirements.",
        "Verify backup completion, consistency metadata, and available transaction logs.",
        "Determine the recovery point and possible loss of writes."
      ],
      remediation: [
        "Use the database's supported backup, restore, and recovery tooling.",
        "Coordinate recovery-point decisions with the data owner.",
        "Preserve the original volume and candidate backups until integrity is confirmed."
      ],
      validation: [
        "The database passes its supported integrity and recovery checks.",
        "Critical application queries and transaction flows succeed.",
        "The restore procedure is documented and tested."
      ]
    },
    {
      cause: "SELinux or host security policy blocks a bind mount",
      symptoms: [
        "The application receives permission errors despite apparently correct Unix permissions.",
        "The issue differs between Linux hosts.",
        "Audit logs show an access denial."
      ],
      evidence: [
        "SELinux is enforcing.",
        "Relevant audit records identify the path or process.",
        "The host directory has an unexpected security label."
      ],
      diagnosis: [
        "Confirm the access denial and intended security context.",
        "Inspect the volume declaration and host labels.",
        "Consult the host security policy and platform documentation."
      ],
      remediation: [
        "Apply the documented, narrowly scoped volume labeling or security-policy correction.",
        "Avoid disabling SELinux or weakening the host security posture as a quick fix.",
        "Validate the policy change with the host security owner."
      ],
      validation: [
        "The required access succeeds.",
        "Security enforcement remains enabled.",
        "No unnecessary access has been granted to unrelated workloads."
      ]
    },
    {
      cause: "Remote volume driver or storage backend is unavailable",
      symptoms: [
        "The container cannot mount the volume.",
        "Startup errors reference the driver, mount, credentials, or remote endpoint.",
        "Several workloads using the same backend may be affected."
      ],
      evidence: [
        "Volume inspection identifies a non-local driver or external storage dependency.",
        "Driver logs or platform telemetry show a mount or backend failure.",
        "The incident correlates with credentials, network, or storage changes."
      ],
      diagnosis: [
        "Identify the exact driver and supported troubleshooting procedure.",
        "Check backend health, authentication, network connectivity, and storage capacity.",
        "Compare the affected workload with healthy workloads using the same backend."
      ],
      remediation: [
        "Restore the verified backend dependency or correct its configuration.",
        "Preserve the existing volume identity and follow the driver's supported recovery steps.",
        "Avoid recreating the volume unless the storage owner confirms the consequences."
      ],
      validation: [
        "The volume mounts and performs expected reads and writes.",
        "Backend health and performance return to normal.",
        "Recovery and backup procedures are confirmed."
      ]
    }
  ],

  storageConcepts: [
    {
      name: "Named volume versus bind mount",
      explanation:
        "A named volume is managed by Docker or its configured driver. A bind mount maps an explicit host path into the container.",
      troubleshootingUse:
        "Inspect the actual mount type and source before assuming where the data is stored."
    },
    {
      name: "Container writable layer",
      explanation:
        "The container's writable layer is associated with the container and should not be used as the only persistence mechanism for important data.",
      troubleshootingUse:
        "Check the mount list when data disappears after container replacement."
    },
    {
      name: "Mount obscuring",
      explanation:
        "Mounting a host path or volume over a non-empty container directory hides the directory's previous contents for as long as the mount is present.",
      troubleshootingUse:
        "Investigate an empty or unexpected directory by comparing the mount source, destination, and image layout."
    },
    {
      name: "Read-only mount",
      explanation:
        "A read-only mount intentionally prevents writes through that mount. It is different from a filesystem that becomes read-only because of an error.",
      troubleshootingUse:
        "Inspect mount configuration and underlying filesystem state separately."
    },
    {
      name: "UID/GID and permissions",
      explanation:
        "The effective application user must have the required access to the mounted files, subject to host security controls.",
      troubleshootingUse:
        "Compare process identity, numeric ownership, mode bits, and security labels."
    },
    {
      name: "Disk capacity versus inodes",
      explanation:
        "Capacity limits bytes; inode limits constrain the number of filesystem objects. Either can prevent file creation.",
      troubleshootingUse:
        "Use df -hT and df -i on the filesystem containing the actual data."
    },
    {
      name: "Database consistency",
      explanation:
        "A database backup must satisfy the engine's consistency requirements. Copying a live data directory is not automatically safe.",
      troubleshootingUse:
        "Use supported backup and restore tooling, and confirm the recovery point with the data owner."
    },
    {
      name: "Volume lifecycle",
      explanation:
        "Container and volume lifecycles are separate. Removing a container does not always remove its volumes, and some cleanup commands can remove volumes.",
      troubleshootingUse:
        "Inspect container and volume identities before any removal or cleanup command."
    },
    {
      name: "Storage driver",
      explanation:
        "Docker storage drivers manage image and container filesystem layers; volume drivers manage volume storage. These are related but distinct mechanisms.",
      troubleshootingUse:
        "Identify whether the issue concerns the container writable layer or a volume backend."
    },
    {
      name: "Remote storage dependency",
      explanation:
        "A remote volume can depend on network connectivity, credentials, mount helpers, and backend availability.",
      troubleshootingUse:
        "Follow the specific driver's documentation rather than assuming local-volume behavior."
    }
  ],

  decisionTree: [
    {
      symptom: "Data disappears after container recreation",
      evidence:
        "Current mount list, previous container configuration, volume inventory, deployment revision",
      likelyCause:
        "Data lived in the writable layer or a different volume was attached",
      nextAction:
        "Preserve the previous state, identify the authoritative data source, and plan recovery before cleanup."
    },
    {
      symptom: "Application reports permission denied",
      evidence:
        "Process UID/GID, directory ownership, permissions, security labels, audit logs",
      likelyCause:
        "Incorrect ownership, permissions, or host security policy",
      nextAction:
        "Apply a targeted correction after verifying the expected user and exact mount path."
    },
    {
      symptom: "No space left on device",
      evidence:
        "df -hT, df -i, mount information, Docker storage usage",
      likelyCause:
        "Filesystem capacity, inode, quota, or backend capacity exhaustion",
      nextAction:
        "Identify the specific storage limit and follow the approved cleanup or capacity expansion procedure."
    },
    {
      symptom: "Volume mount fails during startup",
      evidence:
        "docker inspect, Docker events, daemon logs, volume driver logs",
      likelyCause:
        "Missing path, unavailable driver, invalid configuration, or inaccessible backend",
      nextAction:
        "Identify the mount layer and resolve the specific configuration or backend failure."
    },
    {
      symptom: "Directory is unexpectedly empty",
      evidence:
        "Mount source and destination, host path contents, application data-directory setting",
      likelyCause:
        "Wrong source path, wrong destination, or mount obscuring existing content",
      nextAction:
        "Compare the effective mount configuration with the expected path before moving any data."
    },
    {
      symptom: "Read-only filesystem error",
      evidence:
        "Mount configuration, findmnt, kernel logs, storage health",
      likelyCause:
        "Read-only mount or underlying filesystem/storage failure",
      nextAction:
        "Separate configuration from storage failure and follow the relevant recovery procedure."
    },
    {
      symptom: "Database fails after restoring files",
      evidence:
        "Database logs, backup metadata, recovery logs, transaction-log availability",
      likelyCause:
        "Inconsistent or incomplete backup, missing recovery artifacts, or corruption",
      nextAction:
        "Use database-supported recovery tooling and preserve original data sources."
    },
    {
      symptom: "Remote volume is unavailable",
      evidence:
        "Driver type, mount logs, backend health, credentials, network reachability",
      likelyCause:
        "Driver, authentication, network, or remote-storage failure",
      nextAction:
        "Follow the exact driver's recovery procedure and avoid creating a replacement volume blindly."
    }
  ],

  recoveryWorkflow: [
    {
      phase: "1. Detect and contain",
      actions: [
        "Acknowledge the alert and identify the affected application and storage path.",
        "Determine whether data is missing, inaccessible, corrupted, or merely not being written.",
        "Pause destructive cleanup and deployment retries where data-loss risk exists.",
        "For databases, coordinate write handling with the database owner."
      ],
      successCriteria: [
        "Incident severity and affected data are documented.",
        "No additional destructive cleanup is occurring."
      ]
    },
    {
      phase: "2. Preserve evidence",
      actions: [
        "Record container IDs, image digests, mount configuration, volume names, labels, and timestamps.",
        "Collect application, database, Docker, and host storage logs.",
        "Capture filesystem capacity, inode usage, and mount state.",
        "Identify existing backups and their consistency guarantees."
      ],
      successCriteria: [
        "The initial state is documented.",
        "Original recovery candidates are preserved."
      ]
    },
    {
      phase: "3. Isolate the storage layer",
      actions: [
        "Identify the actual storage type and data directory.",
        "Compare current and previous volume mappings.",
        "Check capacity, inodes, ownership, permissions, and read-only state.",
        "Investigate SELinux, storage-driver, and kernel errors only where relevant."
      ],
      successCriteria: [
        "The failure is narrowed to a specific mount, permission, capacity, or backend problem.",
        "The proposed root cause is supported by evidence."
      ]
    },
    {
      phase: "4. Plan safe recovery",
      actions: [
        "Identify the authoritative data source.",
        "Determine whether the current instance accepted new writes.",
        "Check backup consistency, recovery point, and expected data loss.",
        "Document the change, approval, rollback procedure, and validation criteria."
      ],
      successCriteria: [
        "The data owner approves the recovery source and method.",
        "The team understands the consequences of restoring or switching volumes."
      ]
    },
    {
      phase: "5. Recover and validate",
      actions: [
        "Apply a targeted mount, permission, capacity, or backend correction.",
        "Use supported application or database restore procedures.",
        "Validate the expected mount destination and actual data.",
        "Run approved integrity checks and representative application operations."
      ],
      successCriteria: [
        "The application can read and write as intended.",
        "Data integrity is verified by the appropriate owner.",
        "No unexpected destructive side effects have occurred."
      ]
    },
    {
      phase: "6. Prevent recurrence",
      actions: [
        "Add volume identity and mount-destination validation to deployment checks.",
        "Test backup restoration on a defined schedule.",
        "Alert on capacity, inode use, write failures, and storage latency.",
        "Document the incident and assign preventive actions."
      ],
      successCriteria: [
        "The recovery process is repeatable.",
        "Monitoring and preventive controls have owners."
      ]
    }
  ],

  backupAndRestore: [
    {
      scenario: "Back up a non-database application volume",
      procedure: [
        "Identify the exact named volume using docker volume inspect.",
        "Confirm the backup destination has enough capacity and appropriate access controls.",
        "Use an approved backup method that preserves required ownership, permissions, timestamps, and file metadata.",
        "For a simple local Docker volume, a controlled helper-container archive may be suitable, but only after confirming the volume driver and application consistency requirements.",
        "Store the backup outside the source volume and verify that the backup artifact is readable."
      ],
      validation: [
        "List and inspect the backup artifact.",
        "Restore into a separate test volume rather than overwriting the original.",
        "Verify expected files, metadata, and application behavior.",
        "Record backup time, source volume identity, and retention policy."
      ],
      warnings: [
        "A filesystem archive is not automatically a consistent backup of a live database.",
        "Remote volume drivers may require driver-specific backup tools.",
        "Do not store the only backup inside the volume being backed up."
      ]
    },
    {
      scenario: "Back up a live database",
      procedure: [
        "Identify the database engine and its supported backup method.",
        "Use the database's native backup, snapshot coordination, or documented consistency procedure.",
        "Include required transaction logs, metadata, and encryption keys according to the database recovery design.",
        "Record the backup completion status and recovery point.",
        "Protect the backup with appropriate access controls and retention."
      ],
      validation: [
        "Perform a restore test in an isolated environment.",
        "Run the database's supported integrity and recovery checks.",
        "Verify critical queries and representative application operations.",
        "Measure the actual recovery time and achievable recovery point."
      ],
      warnings: [
        "Do not assume that copying a live database directory produces a consistent backup.",
        "Do not restore over the production data directory without an approved recovery plan.",
        "Agree on acceptable data loss and recovery time with the data owner."
      ]
    },
    {
      scenario: "Restore a volume without overwriting the original",
      procedure: [
        "Identify the source backup and verify its integrity.",
        "Create a separate destination volume with a clearly identifiable name.",
        "Restore the backup into the new destination using the approved storage-specific process.",
        "Apply the required ownership, permissions, labels, and application configuration.",
        "Validate the restored data in an isolated test before planning a production switch."
      ],
      validation: [
        "The restore completes without errors.",
        "Required metadata and permissions are preserved.",
        "The application or database passes its supported integrity checks.",
        "The original volume remains available until recovery is accepted."
      ],
      warnings: [
        "Never use a production volume name for an experimental restore.",
        "A successful archive extraction does not prove application-level consistency.",
        "For a database, follow its documented restore and recovery procedure."
      ]
    }
  ],

  prevention: [
    {
      area: "Persistent storage design",
      practices: [
        "Store important application data outside the disposable container writable layer.",
        "Use explicitly named volumes where appropriate and document their ownership.",
        "Use bind mounts only when the host path is intentionally managed.",
        "Document the data directory and expected mount destination for every stateful service.",
        "Avoid unexpected changes to volume identity during deployment."
      ]
    },
    {
      area: "CI/CD and deployment validation",
      practices: [
        "Validate Compose configuration before deployment.",
        "Compare expected mount destinations and volume identities with the approved configuration.",
        "Add checks that detect an unexpected empty data directory before a stateful service accepts traffic.",
        "Use staged deployment and documented rollback decisions.",
        "Require explicit approval for destructive volume operations."
      ]
    },
    {
      area: "Capacity and monitoring",
      practices: [
        "Monitor bytes and inode consumption on the actual storage filesystem.",
        "Alert on storage I/O errors, read-only transitions, mount failures, and application write errors.",
        "Set log rotation and retention policies.",
        "Track storage growth and expected capacity under peak load.",
        "Include remote-storage availability and latency in service monitoring."
      ]
    },
    {
      area: "Permissions and security",
      practices: [
        "Run applications with the intended non-root identity where supported.",
        "Document required ownership and permissions.",
        "Keep SELinux and other host security controls enabled.",
        "Use least-privilege access to data directories and backups.",
        "Avoid broadly exposing host paths to containers."
      ]
    },
    {
      area: "Backup and recovery",
      practices: [
        "Define recovery-point and recovery-time objectives.",
        "Use application-consistent backup procedures for databases.",
        "Store backups separately from the source volume.",
        "Test restoration regularly in an isolated environment.",
        "Record restore results, data integrity checks, and recovery duration."
      ]
    }
  ],

  commonMistakes: [
    {
      mistake: "Running docker volume prune during a data-loss incident",
      whyItFails:
        "It can remove volumes considered unused by Docker even when they contain data that may be needed for recovery.",
      betterApproach:
        "Pause cleanup and inventory the candidate volumes before any removal."
    },
    {
      mistake: "Using docker compose down -v as a generic restart",
      whyItFails:
        "The -v option can remove declared named and anonymous volumes associated with the Compose application.",
      betterApproach:
        "Use a non-destructive lifecycle operation appropriate to the situation and verify the exact impact before executing it."
    },
    {
      mistake: "Assuming container recreation preserves writable-layer data",
      whyItFails:
        "The new container has a new writable layer unless data is preserved through an appropriate storage mechanism.",
      betterApproach:
        "Use persistent storage for required data and verify the mount configuration."
    },
    {
      mistake: "Fixing every permission error with chmod -R 777",
      whyItFails:
        "It weakens access controls, can alter large data trees, and may not resolve SELinux or other policy denials.",
      betterApproach:
        "Verify the process identity, exact path, required permissions, and host security policy before applying a narrow correction."
    },
    {
      mistake: "Copying a live database directory as the only backup",
      whyItFails:
        "Files may be captured at inconsistent points in a transaction or omit required recovery metadata.",
      betterApproach:
        "Use the database's documented backup and restore mechanisms."
    },
    {
      mistake: "Deleting an old volume because it is not currently attached",
      whyItFails:
        "The volume may contain the last known-good dataset or an earlier production state.",
      betterApproach:
        "Check its identity, contents, ownership, backup status, and recovery relevance before cleanup."
    },
    {
      mistake: "Assuming a valid Compose file proves the correct data is mounted",
      whyItFails:
        "A syntactically valid configuration can still reference the wrong volume or destination.",
      betterApproach:
        "Inspect the effective configuration and the actual runtime mounts."
    },
    {
      mistake: "Ignoring inode exhaustion",
      whyItFails:
        "A filesystem may reject new files even when free byte capacity remains.",
      betterApproach:
        "Check both df -hT and df -i on the filesystem containing the data."
    },
    {
      mistake: "Restarting repeatedly when the filesystem is read-only",
      whyItFails:
        "Repeated restarts do not repair an underlying filesystem or storage I/O failure.",
      betterApproach:
        "Inspect mount state and kernel logs, then follow the approved storage recovery procedure."
    },
    {
      mistake: "Restoring a backup directly over production without validation",
      whyItFails:
        "The backup may be incomplete, inconsistent, or older than the current data.",
      betterApproach:
        "Restore separately, validate integrity, confirm the recovery point, and obtain data-owner approval."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Incident title: Docker Volume / Persistent Storage Failure",
    "Environment / host / cluster:",
    "Affected application and container IDs:",
    "Storage type: named volume / anonymous volume / bind mount / writable layer / remote driver",
    "Volume name, driver, labels, and mount destination:",
    "Host filesystem or remote backend:",
    "Severity and incident owner:",
    "Detection time / acknowledgement time / recovery time:",
    "Customer impact and data-integrity risk:",
    "Exact error and first observed timestamp:",
    "Deployment revision and recent configuration changes:",
    "Current and previous container mount configuration:",
    "Disk capacity and inode evidence:",
    "Ownership, permissions, and security-label evidence:",
    "Kernel, Docker, and storage-driver logs:",
    "Backup identity, consistency, and recovery point:",
    "Verified root cause and supporting evidence:",
    "Data owner and production approval:",
    "Mitigation and rollback plan:",
    "Restore or recovery procedure performed:",
    "Application-level data-integrity validation:",
    "Recovery time and observed data loss, if any:",
    "Preventive actions / owners / deadlines:",
    "Runbook and backup-process updates:",
    "Incident closure approved by:"
  ],

  productionRunbook: [
    {
      phase: "Detect and protect data",
      checklist: [
        "Acknowledge the incident and identify the affected data path.",
        "Verify the Docker context, host, service, and volume.",
        "Pause destructive cleanup and deployment retries if data loss is possible.",
        "For databases, coordinate write handling with the database owner."
      ]
    },
    {
      phase: "Collect storage evidence",
      checklist: [
        "Capture container mount configuration and volume inventory.",
        "Record filesystem capacity, inode usage, and mount state.",
        "Collect application, Docker, database, and kernel logs.",
        "Record the current and previous deployment configuration.",
        "Identify available backups and their recovery points."
      ]
    },
    {
      phase: "Isolate the cause",
      checklist: [
        "Determine whether the data is in a volume, bind mount, remote backend, or writable layer.",
        "Verify the mount source, destination, and read/write mode.",
        "Check permissions, UID/GID, and security labels.",
        "Check disk, inode, filesystem, and storage-driver health.",
        "Compare the current state with the last known-good configuration."
      ]
    },
    {
      phase: "Recover safely",
      checklist: [
        "Identify the authoritative data source.",
        "Document the recovery plan and rollback path.",
        "Obtain required production and data-owner approval.",
        "Use an application-consistent restore method for databases.",
        "Preserve the original volume until recovery is accepted.",
        "Validate data integrity before declaring the service recovered."
      ]
    },
    {
      phase: "Prevent recurrence",
      checklist: [
        "Add mount identity checks to deployment validation.",
        "Set capacity and inode alerts.",
        "Test backup restoration regularly.",
        "Document volume ownership and lifecycle.",
        "Record the root cause and assign preventive actions."
      ]
    }
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Named volume persistence",
      objective:
        "Observe how a named volume retains data across container replacement.",
      steps: [
        "Create a test volume: docker volume create volume-lab",
        "Write a test file using a disposable container: docker run --rm -v volume-lab:/data alpine sh -c 'echo persistent-test > /data/test.txt'",
        "Read it from a new disposable container: docker run --rm -v volume-lab:/data alpine cat /data/test.txt",
        "Inspect the volume using docker volume inspect volume-lab",
        "Remove only the test volume after confirming it is not used by another workload."
      ],
      expectedFinding:
        "The file remains available to another container that mounts the same named volume.",
      solution: [
        "Check that both containers use the exact same volume name.",
        "Understand that the container writable layer and named volume have different lifecycles.",
        "Keep production volumes out of cleanup exercises."
      ]
    },
    {
      title: "Lab 2 — Compare writable-layer data with volume data",
      objective:
        "Understand why important files should not rely only on a container writable layer.",
      steps: [
        "Create a disposable container and write a test file outside any mounted volume.",
        "Inspect its mounts using docker inspect.",
        "Create another disposable container with a named volume mounted at a data directory.",
        "Write a test file into that mounted directory.",
        "Compare the storage configuration and lifecycle behavior without using production data."
      ],
      expectedFinding:
        "Data in the container writable layer is tied to that container's lifecycle, while a named volume can be reused by a replacement container.",
      solution: [
        "Move required persistent data to an intentionally managed storage location.",
        "Validate the volume destination and application data-directory setting.",
        "Do not delete production containers to test persistence."
      ]
    },
    {
      title: "Lab 3 — Diagnose a bind-mount path error",
      objective:
        "Find a mismatch between the host source directory and container destination.",
      steps: [
        "Create a temporary host directory containing a test file.",
        "Mount it into a disposable container at a known destination.",
        "Inspect the mount using docker inspect.",
        "Compare the source path and destination with the test application's expected path.",
        "Correct the test mapping and verify the expected file is visible."
      ],
      expectedFinding:
        "A valid container can show unexpected or missing files when the wrong host path or destination is mounted.",
      solution: [
        "Verify the exact source and destination.",
        "Check that the intended host filesystem is mounted.",
        "Avoid changing production host paths until the data owner confirms the correct source."
      ]
    },
    {
      title: "Lab 4 — Diagnose capacity and inode exhaustion",
      objective:
        "Learn to distinguish byte-capacity problems from inode exhaustion.",
      steps: [
        "Run df -hT and df -i in a controlled Linux environment.",
        "Identify the filesystem used by the test directory.",
        "Inspect test workload and temporary-file growth.",
        "Review how capacity and inode alerts would trigger.",
        "Clean up only known disposable test data."
      ],
      expectedFinding:
        "Free bytes and free inodes are separate resources; either can constrain file creation.",
      solution: [
        "Monitor both capacity and inode utilization.",
        "Identify the responsible filesystem before cleanup.",
        "Do not fill a production filesystem to reproduce the problem."
      ]
    },
    {
      title: "Lab 5 — Test backup restoration safely",
      objective:
        "Practice restoring data into a separate test volume without overwriting the source.",
      steps: [
        "Create a disposable named volume and add test files.",
        "Create a backup using a method suitable for the test data and volume driver.",
        "Create a second destination volume.",
        "Restore into the destination volume.",
        "Compare the expected files and metadata, then remove only the lab resources."
      ],
      expectedFinding:
        "A separate restore target lets an operator validate backup contents without destroying the source.",
      solution: [
        "Verify backup readability and completeness.",
        "Use application-consistent backup tooling for databases.",
        "Document restore duration and validation results."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is a Docker volume?",
      answer:
        "A Docker volume provides storage whose lifecycle is separate from a particular container. Docker or a configured volume driver manages the storage.",
      followUp:
        "How does a named volume differ from a bind mount?"
    },
    {
      question: "Why can data disappear after a container is recreated?",
      answer:
        "The application may have written data only to the container writable layer, or the replacement container may have attached a different volume.",
      followUp:
        "Which docker inspect output would you compare?"
    },
    {
      question: "What is the difference between a volume and a bind mount?",
      answer:
        "A volume is managed by Docker or a volume driver. A bind mount maps an explicit host path into the container.",
      followUp:
        "What host filesystem and security risks are relevant to bind mounts?"
    },
    {
      question: "How do you troubleshoot permission denied on a Docker volume?",
      answer:
        "I verify the application UID/GID, numeric directory ownership, mode bits, mount path, and relevant host security policies such as SELinux.",
      followUp:
        "Why is chmod -R 777 not a safe general fix?"
    },
    {
      question: "What is the risk of docker compose down -v?",
      answer:
        "The -v option can remove declared named and anonymous volumes associated with the Compose application, potentially deleting persistent data.",
      followUp:
        "What evidence should be collected before removing a volume?"
    },
    {
      question: "How do you investigate no space left on device?",
      answer:
        "I check df -hT and df -i on the filesystem that actually contains the data, then identify the responsible consumers and any relevant quota or backend limits.",
      followUp:
        "Can a filesystem run out of inodes while it still has free bytes?"
    },
    {
      question: "Why can a mounted directory appear empty?",
      answer:
        "The mount may reference an empty or incorrect host path, or the mount may obscure files previously present in the image directory.",
      followUp:
        "How would you verify the source and destination?"
    },
    {
      question: "How do you back up a live database stored in a Docker volume?",
      answer:
        "I use the database engine's supported consistent backup or snapshot procedure, preserve required recovery artifacts, and test restoration in an isolated environment.",
      followUp:
        "Why is copying live database files not always a consistent backup?"
    },
    {
      question: "How do you recover a database that starts with empty data?",
      answer:
        "I stop destructive cleanup, compare old and new mounts, identify the authoritative data source, preserve candidate volumes, and coordinate a database-supported recovery.",
      followUp:
        "What if the incorrect instance has already accepted writes?"
    },
    {
      question: "What is the difference between Docker storage drivers and volume drivers?",
      answer:
        "Storage drivers manage image and container filesystem layers. Volume drivers manage volume storage and can connect Docker to external storage systems.",
      followUp:
        "How does this distinction help isolate disk usage problems?"
    },
    {
      question: "What would you do if a volume becomes read-only?",
      answer:
        "I inspect mount configuration, filesystem state, and kernel logs to distinguish an intentionally read-only mount from a filesystem or storage failure.",
      followUp:
        "Why is a forced remount risky in production?"
    },
    {
      question: "How do you troubleshoot SELinux-related volume access failures?",
      answer:
        "I confirm the denial using audit evidence, inspect labels and mount configuration, and apply the approved targeted policy or labeling correction without disabling enforcement.",
      followUp:
        "Why might Unix mode bits alone not explain the denial?"
    },
    {
      question: "How do you verify a volume backup?",
      answer:
        "I verify the artifact, restore into a separate target, check required metadata, and validate the application or database using supported integrity checks.",
      followUp:
        "What is the difference between a successful backup job and a tested restore?"
    },
    {
      question: "How would you prevent accidental volume changes during deployment?",
      answer:
        "I validate the effective Compose configuration, compare expected volume identity and mount destination, protect destructive operations with approvals, and test recovery procedures.",
      followUp:
        "Which deployment guard would detect an unexpected database volume?"
    },
    {
      question: "What should be included in a production volume incident report?",
      answer:
        "It should include impact, timeline, volume and mount identity, capacity and permission evidence, root cause, recovery decisions, data-integrity validation, and preventive actions.",
      followUp:
        "How would you establish that no data was lost?"
    }
  ],

  references: [
    {
      title: "Docker — Volumes",
      url: "https://docs.docker.com/engine/storage/volumes/"
    },
    {
      title: "Docker — Bind mounts",
      url: "https://docs.docker.com/engine/storage/bind-mounts/"
    },
    {
      title: "Docker — Storage overview",
      url: "https://docs.docker.com/engine/storage/"
    },
    {
      title: "Docker — Prune unused objects",
      url: "https://docs.docker.com/engine/manage-resources/pruning/"
    },
    {
      title: "Docker Compose — Volumes",
      url: "https://docs.docker.com/reference/compose-file/volumes/"
    },
    {
      title: "Linux — df command manual",
      url: "https://man7.org/linux/man-pages/man1/df.1.html"
    },
    {
      title: "Linux — findmnt command manual",
      url: "https://man7.org/linux/man-pages/man8/findmnt.8.html"
    },
    {
      title: "PostgreSQL — Backup and Restore",
      url: "https://www.postgresql.org/docs/current/backup.html"
    },
    {
      title: "MySQL — Backup and Recovery",
      url: "https://dev.mysql.com/doc/refman/8.4/en/backup-and-recovery.html"
    }
  ]
} satisfies DockerVolumesGuide;

export default dockerVolumesGuide;
