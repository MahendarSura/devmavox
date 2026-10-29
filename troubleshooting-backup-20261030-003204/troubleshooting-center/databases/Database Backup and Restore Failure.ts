const guide = {
  title: 'Database Backup and Restore Failure',
  summary: 'Troubleshoot failed backups, incomplete archives, permissions, and restore errors.',
  category: "databases",
  sections: [
    {
      heading: "Symptoms and impact",
      content: [
        'Troubleshoot failed backups, incomplete archives, permissions, and restore errors.',
        "Record the exact error message, timestamp, affected endpoint or task, recent deployments, and whether the failure affects all users or only one environment.",
        "Assess production impact first. Preserve logs and relevant evidence before restarting services or changing configuration."
      ]
    },
    {
      heading: "Immediate safety checks",
      content: [
        "Confirm the affected environment, recent releases, health checks, available disk space, CPU, memory, and relevant service status.",
        "Avoid deleting data, clearing production state, disabling security controls, or applying unreviewed configuration changes.",
        "If this started immediately after a deployment, compare the current release with the last known healthy release and follow the approved rollback procedure when necessary."
      ]
    },
    {
      heading: "Diagnosis commands",
      content: [
        'Check command exit status and backup logs; inspect available disk space; PostgreSQL: pg_restore --list backup.dump; verify backup checksums.',
        "Run commands in the correct host, container, CI runner, or application environment. Replace example hosts, ports, paths, and artifact names with actual values.",
        "Capture exit codes and timestamps. Redact passwords, tokens, private keys, connection strings, and other secrets before sharing logs."
      ]
    },
    {
      heading: "Likely root causes",
      content: [
        'Disk space is exhausted; backup credentials lack privileges; the archive is incomplete; versions or extensions differ; or restore dependencies are missing.',
        "Check recent configuration changes, version upgrades, DNS changes, firewall rules, credentials, resource limits, and external dependency health.",
        "Do not assume the first visible error is the root cause. Follow the earliest relevant error in the logs and correlate it with metrics."
      ]
    },
    {
      heading: "Step-by-step remediation",
      content: [
        "1. Reproduce the issue safely and identify the exact failing request, process, query, task, or configuration entry.",
        "2. Inspect the relevant service logs and metrics around the failure timestamp.",
        "3. Compare the current configuration with a known-good version and validate all referenced paths, versions, ports, and permissions.",
        'Preserve the original backup, verify integrity and compatibility, correct permissions and storage capacity, restore to an isolated test database, and validate row counts and application behavior.',
        "5. Apply one reviewed change at a time. Validate syntax or configuration before restarting, reloading, deploying, or restoring anything.",
        "6. If the issue persists, revert the last change when safe and continue with the next evidence-supported hypothesis."
      ]
    },
    {
      heading: "Verification",
      content: [
        "Repeat the original failing operation and confirm the expected success status or task result.",
        "Check service health, logs, latency, resource use, and dependent components. A successful command alone does not prove the complete application path works.",
        "Run relevant automated tests or a smoke test and confirm that no new errors were introduced."
      ]
    },
    {
      heading: "Prevention",
      content: [
        "Add health checks, actionable alerts, structured logs, and dashboards for the failure signals identified during diagnosis.",
        "Document supported versions, configuration ownership, recovery steps, and rollback procedures.",
        "Test changes in a non-production environment and use peer review for production-impacting changes.",
        "Create a regression test or monitoring check that detects this failure before users report it."
      ]
    },
    {
      heading: "Production incident checklist",
      content: [
        "Record incident start time, affected services, customer impact, recent changes, and mitigation owner.",
        "Preserve logs and metrics, communicate status through the approved incident channel, and prefer reversible mitigations.",
        "After recovery, document root cause, contributing factors, corrective actions, owners, and due dates."
      ]
    },
    {
      heading: "Practice exercise",
      content: [
        "Reproduce the failure in a disposable development environment using a controlled configuration change.",
        "Collect evidence before changing anything, explain the root cause, apply the smallest safe fix, and verify recovery.",
        "Write a short incident report with symptoms, commands used, root cause, resolution, and prevention."
      ]
    },
    {
      heading: "Interview review",
      content: [
        "Explain the difference between a symptom and a root cause, and describe how you would investigate this issue without guessing.",
        "Discuss how logs, metrics, configuration validation, controlled changes, and rollback reduce recovery time.",
        "Describe what evidence you would collect before declaring the incident resolved."
      ]
    }
  ]
};

export default guide;
