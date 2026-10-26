// File: app/troubleshootingcentre/Linux Troubleshooting/Permission denied errors.ts

export interface PermissionCommand {
  title: string;
  command: string;
  purpose: string;
  expectedOutput: string;
  interpretation: string;
}

export interface PermissionTroubleshootingStep {
  step: number;
  title: string;
  objective: string;
  actions: string[];
  commands?: string[];
  expectedResult: string;
  precautions?: string[];
}

export interface PermissionRootCause {
  cause: string;
  symptoms: string[];
  investigation: string[];
  resolution: string[];
}

export interface PermissionIncidentScenario {
  environment: string;
  incident: string;
  impact: string[];
  investigation: string[];
  rootCause: string;
  resolution: string[];
  prevention: string[];
}

export interface LinuxPermissionDeniedRunbook {
  id: string;
  title: string;
  category: string;
  severity: string;
  summary: string;
  objective: string;
  symptoms: string[];
  businessImpact: string[];
  linuxPermissionBasics: {
    filePermissions: string[];
    directoryPermissions: string[];
    permissionTypes: string[];
    importantFacts: string[];
  };
  rootCauses: string[];
  diagnosticCommands: PermissionCommand[];
  troubleshootingSteps: PermissionTroubleshootingStep[];
  rootCauseScenarios: PermissionRootCause[];
  incidentScenario: PermissionIncidentScenario;
  verification: string[];
  prevention: string[];
  monitoring: string[];
  safetyRules: string[];
  incidentReportTemplate: string[];
  troubleshootingChecklist: string[];
}

export const linuxPermissionDenied: LinuxPermissionDeniedRunbook = {
  id: "linux-permission-denied-errors",
  title: "Linux Permission Denied Errors",
  category: "Linux Troubleshooting",
  severity: "Medium / High / Critical",

  summary:
    "A Linux Permission denied error occurs when a user, process, or service does not " +
    "have the required access to a file, directory, executable, socket, or other protected resource. " +
    "The cause may involve Unix permissions, ownership, ACLs, service identity, mount options, " +
    "or security controls such as SELinux.",

  objective:
    "Identify which process is denied access, determine the exact resource and required operation, " +
    "find the access-control rule responsible, apply the smallest safe correction, and verify recovery.",

  symptoms: [
    "A command returns Permission denied.",
    "An application cannot read its configuration file.",
    "A deployment script cannot execute.",
    "A service cannot write to its log, cache, upload, or runtime directory.",
    "An SSH private key is rejected because its permissions are too open.",
    "A web application cannot access uploaded files.",
    "A script works when run manually but fails under systemd or cron.",
    "A container cannot read or write a mounted host directory.",
    "A user can access a file but cannot enter its parent directory.",
    "An operation fails even though ls -l appears to show sufficient permissions.",
  ],

  businessImpact: [
    "Application requests may fail.",
    "Deployments and scheduled jobs may stop.",
    "Services may fail during startup.",
    "Users may be unable to upload, download, or modify files.",
    "Logs or generated reports may not be written.",
    "Incorrect permission changes can create security vulnerabilities.",
  ],

  linuxPermissionBasics: {
    filePermissions: [
      "r — read file contents.",
      "w — modify file contents.",
      "x — execute a file, subject to other execution requirements.",
    ],

    directoryPermissions: [
      "r — list directory entries, subject to other access controls.",
      "w — create, remove, or rename directory entries, generally combined with execute permission.",
      "x — traverse or search the directory.",
    ],

    permissionTypes: [
      "User/owner permissions apply to the file owner.",
      "Group permissions apply to matching group access, subject to the full permission-selection rules.",
      "Other permissions apply when the owner and applicable group class do not match.",
      "POSIX ACLs can grant or restrict additional user and group access.",
      "SELinux and other security controls can deny operations even when ordinary mode bits permit them.",
    ],

    importantFacts: [
      "Access to a file also depends on permissions for every parent directory in its path.",
      "Running a command with sudo changes the execution identity and may hide the actual service-user problem.",
      "The executable bit alone does not guarantee that a script can run.",
      "A filesystem mounted with noexec can prevent execution from that mount.",
      "A read-only mount can prevent writes even when file mode bits allow them.",
      "ACL masks can restrict the effective permissions of named users and groups.",
      "Changing ownership or permissions recursively can damage services and weaken security.",
    ],
  },

  rootCauses: [
    "Incorrect file or directory ownership.",
    "Missing read, write, or execute permissions.",
    "Missing execute/search permission on a parent directory.",
    "Application running as the wrong user or group.",
    "Incorrect umask causing new files to receive unexpected permissions.",
    "POSIX ACL rules or ACL masks restricting access.",
    "SELinux policy denial.",
    "A filesystem mounted read-only or with noexec.",
    "SSH private-key permissions rejected by the SSH client.",
    "Container UID/GID mismatch on a bind-mounted directory.",
    "A script uses a missing interpreter or invalid shebang, producing a misleading execution failure.",
    "A security policy or service sandbox prevents access to a path.",
  ],

  diagnosticCommands: [
    {
      title: "1. Inspect file ownership and mode bits",
      command: "ls -l /var/www/html/index.html",
      purpose:
        "Check the file owner, group, and ordinary Unix permissions.",
      expectedOutput:
        "-rw-r----- 1 root www-data 2048 Oct 25 10:00 /var/www/html/index.html",
      interpretation:
        "Illustrative output. The owner has read/write permission, the group has read permission, " +
        "and other users have no permissions. Confirm the identity of the process trying to access it.",
    },
    {
      title: "2. Inspect every parent directory",
      command: "namei -l /var/www/html/index.html",
      purpose:
        "Inspect ownership and permissions along the complete path.",
      expectedOutput:
        "f: /var/www/html/index.html\n" +
        "drwxr-xr-x root root /\n" +
        "drwxr-xr-x root root var\n" +
        "drwxr-xr-x root root www\n" +
        "drwxr-xr-x root root html\n" +
        "-rw-r----- root www-data index.html",
      interpretation:
        "Illustrative output. Look for a directory that the service user cannot traverse. " +
        "A file's permissions alone do not establish that the full path is accessible.",
    },
    {
      title: "3. Identify the current user and groups",
      command: "id",
      purpose:
        "Check the current shell user's UID, primary group, and supplementary groups.",
      expectedOutput:
        "uid=1001(deploy) gid=1001(deploy) groups=1001(deploy),27(sudo)",
      interpretation:
        "Illustrative output. This describes the current shell, not necessarily the user running a service or cron job.",
    },
    {
      title: "4. Inspect systemd's service identity",
      command:
        "systemctl show myapp.service -p User -p Group -p SupplementaryGroups",
      purpose:
        "Inspect the identity configured for a systemd service.",
      expectedOutput:
        "User=myapp\nGroup=myapp",
      interpretation:
        "Illustrative output. If User or Group is unset, systemd may use defaults. Inspect the unit and its documentation.",
    },
    {
      title: "5. Inspect POSIX ACLs",
      command: "getfacl -p /var/www/html/index.html",
      purpose:
        "Check access-control lists and effective permissions.",
      expectedOutput:
        "# file: /var/www/html/index.html\n" +
        "user::rw-\n" +
        "group::r--\n" +
        "other::---",
      interpretation:
        "Illustrative output. Named users/groups and the mask may affect effective permissions. " +
        "The getfacl utility may need to be installed.",
    },
    {
      title: "6. Check SELinux status",
      command: "getenforce",
      purpose:
        "Determine whether SELinux is enforcing, permissive, or disabled.",
      expectedOutput: "Enforcing",
      interpretation:
        "Illustrative output. If enforcing, investigate relevant audit denials when ordinary permissions look correct. " +
        "Do not disable SELinux as a routine workaround.",
    },
    {
      title: "7. Inspect recent SELinux denial messages",
      command: "sudo ausearch -m AVC,USER_AVC -ts recent",
      purpose:
        "Look for SELinux access denials associated with the failing operation.",
      expectedOutput:
        "AVC denial records identifying a source process and target resource",
      interpretation:
        "Output depends on the audit configuration and available records. No results do not conclusively prove " +
        "that SELinux is not involved. ausearch may not be installed on every distribution.",
    },
    {
      title: "8. Check filesystem mount options",
      command: "findmnt -T /opt/myapp/script.sh",
      purpose:
        "Inspect the mount containing the target path and relevant mount options.",
      expectedOutput:
        "TARGET SOURCE    FSTYPE OPTIONS\n" +
        "/opt   /dev/sdb1 ext4   rw,nosuid,nodev,noexec",
      interpretation:
        "Illustrative output. A noexec option can prevent direct execution from that mount. " +
        "Check the actual options and security requirements before changing them.",
    },
    {
      title: "9. Inspect the script and its interpreter",
      command: "file /opt/myapp/script.sh && head -n 1 /opt/myapp/script.sh",
      purpose:
        "Check the file type and the interpreter specified in the shebang.",
      expectedOutput:
        "POSIX shell script, ASCII text executable\n" +
        "#!/bin/bash",
      interpretation:
        "Illustrative output. Verify that the interpreter exists and that the script has the required execution permissions. " +
        "A missing interpreter can cause execution to fail even when mode bits appear correct.",
    },
    {
      title: "10. Inspect SSH key permissions",
      command: "ls -ld ~/.ssh && ls -l ~/.ssh/id_ed25519",
      purpose:
        "Check the SSH directory and private-key file permissions.",
      expectedOutput:
        "drwx------ 2 user user 4096 .ssh\n" +
        "-rw------- 1 user user 464 id_ed25519",
      interpretation:
        "Illustrative output. SSH clients commonly reject private keys that are accessible to other users. " +
        "Confirm the key's ownership and the SSH client's error message.",
    },
    {
      title: "11. Inspect application logs",
      command:
        "sudo journalctl -u myapp.service --since '-30 min' --no-pager",
      purpose:
        "Find the exact file path and operation that triggered the denial.",
      expectedOutput:
        "Error: Permission denied: /var/lib/myapp/cache/item.tmp",
      interpretation:
        "Illustrative output. Identify whether the denied operation is reading, writing, creating, deleting, " +
        "or executing a resource.",
    },
    {
      title: "12. Check for read-only mounts",
      command: "findmnt -no TARGET,OPTIONS -T /var/lib/myapp",
      purpose:
        "Check whether the filesystem containing the application path is mounted read-only.",
      expectedOutput:
        "/var rw,relatime",
      interpretation:
        "Illustrative output. An rw mount allows filesystem writes in principle; other permissions or controls may still deny them. " +
        "If ro appears, investigate why the filesystem became read-only.",
    },
  ],

  troubleshootingSteps: [
    {
      step: 1,
      title: "Capture the exact error",
      objective:
        "Determine which resource and operation are being denied.",
      actions: [
        "Record the complete error message and timestamp.",
        "Identify the filename, directory, socket, or executable mentioned.",
        "Determine whether the operation is read, write, create, delete, or execute.",
        "Identify the affected application, user, and environment.",
      ],
      commands: [
        "systemctl status myapp.service --no-pager -l",
        "journalctl -u myapp.service --since '-30 min' --no-pager",
      ],
      expectedResult:
        "The failing operation and target resource are identified.",
      precautions: [
        "Redact passwords, tokens, private keys, and other secrets before sharing logs.",
      ],
    },
    {
      step: 2,
      title: "Identify the real process identity",
      objective:
        "Find the account and groups used by the failing process.",
      actions: [
        "Check the service unit's User and Group settings.",
        "Inspect the process identity if the service is running.",
        "For cron failures, identify which account owns the scheduled job.",
        "Compare the actual execution identity with the expected identity.",
      ],
      commands: [
        "systemctl show myapp.service -p User -p Group -p SupplementaryGroups",
        "ps -eo user,group,pid,comm,args",
        "id myapp",
      ],
      expectedResult:
        "The process identity and expected access are understood.",
      precautions: [
        "Do not assume the logged-in administrator and the application process have the same permissions.",
        "Protect command output that may contain sensitive process arguments.",
      ],
    },
    {
      step: 3,
      title: "Inspect file and directory permissions",
      objective:
        "Find ordinary Unix permission or ownership problems.",
      actions: [
        "Inspect the target file with ls -l.",
        "Inspect every parent directory with namei -l.",
        "Confirm the process user can traverse parent directories.",
        "Check whether the required read, write, or execute permission is present.",
      ],
      commands: [
        "ls -l /var/lib/myapp/config.json",
        "namei -l /var/lib/myapp/config.json",
      ],
      expectedResult:
        "The specific file or directory permission preventing access is identified.",
      precautions: [
        "Replace example paths with the actual failing path.",
        "Do not change permissions on an entire directory tree without understanding its contents.",
      ],
    },
    {
      step: 4,
      title: "Check ACLs and security policies",
      objective:
        "Investigate access restrictions that are not obvious from ls -l.",
      actions: [
        "Inspect ACL entries and the ACL mask.",
        "Check SELinux status and relevant audit records when applicable.",
        "Review systemd sandboxing and other mandatory access controls if configured.",
        "Correlate denials with the exact failure timestamp.",
      ],
      commands: [
        "getfacl -p /var/lib/myapp/config.json",
        "getenforce",
        "sudo ausearch -m AVC,USER_AVC -ts recent",
        "systemctl cat myapp.service",
      ],
      expectedResult:
        "Any additional access-control rule contributing to the denial is identified.",
      precautions: [
        "Do not disable SELinux or remove security controls to make the error disappear.",
        "Use distribution-specific security tools and procedures.",
      ],
    },
    {
      step: 5,
      title: "Check mounts and execution requirements",
      objective:
        "Rule out filesystem and executable restrictions.",
      actions: [
        "Inspect mount options for the target path.",
        "Check whether the filesystem is read-only.",
        "If execution fails, inspect the file type, shebang, and interpreter path.",
        "Check whether the service runs inside a restricted systemd sandbox or container.",
      ],
      commands: [
        "findmnt -T /opt/myapp/script.sh",
        "file /opt/myapp/script.sh",
        "head -n 1 /opt/myapp/script.sh",
      ],
      expectedResult:
        "Mount restrictions, missing interpreters, or execution constraints are confirmed or ruled out.",
      precautions: [
        "Do not remount a production filesystem with broader permissions without approval.",
        "Do not remove noexec or other mount protections without evaluating the security impact.",
      ],
    },
    {
      step: 6,
      title: "Choose the smallest safe correction",
      objective:
        "Fix only the confirmed access-control problem.",
      actions: [
        "Confirm the intended owner and group with the application owner.",
        "Grant only the permissions required for the operation.",
        "Use a specific group or ACL when shared access is required and supported by policy.",
        "Preserve restrictive permissions on secrets and private keys.",
        "Document the change before applying it to production.",
      ],
      commands: [
        "stat /var/lib/myapp/config.json",
        "getfacl -p /var/lib/myapp/config.json",
      ],
      expectedResult:
        "The access rule is corrected without unnecessarily exposing data or weakening the host.",
      precautions: [
        "Do not use chmod -R 777.",
        "Do not run recursive chown commands on system directories without a verified ownership plan.",
        "Back up relevant configuration and follow production change control.",
      ],
    },
    {
      step: 7,
      title: "Verify access as the intended user",
      objective:
        "Confirm that the actual service identity can perform the required operation.",
      actions: [
        "Use an approved test or application health check.",
        "For a simple file-read issue, test access using the intended service account where appropriate.",
        "For write issues, use an approved temporary location rather than production data files.",
        "Review logs to confirm the original denial is no longer occurring.",
      ],
      commands: [
        "sudo -u myapp test -r /var/lib/myapp/config.json && echo 'Readable'",
        "sudo -u myapp test -x /opt/myapp/script.sh && echo 'Executable'",
      ],
      expectedResult:
        "The intended user passes the relevant access check.",
      precautions: [
        "These examples test basic access only; they do not prove that all application operations will succeed.",
        "Do not create or overwrite files in production directories just to test permissions.",
      ],
    },
    {
      step: 8,
      title: "Restore and monitor the application",
      objective:
        "Confirm the service or workflow recovers after the permission fix.",
      actions: [
        "Restart the service only if necessary and approved.",
        "Check service status and recent logs.",
        "Run an application-level health check.",
        "Confirm the affected workflow succeeds.",
        "Monitor for repeated permission errors.",
      ],
      commands: [
        "systemctl status myapp.service --no-pager -l",
        "journalctl -u myapp.service --since '-10 min' --no-pager",
      ],
      expectedResult:
        "The service operates normally without recurring access-denied errors.",
    },
    {
      step: 9,
      title: "Prevent recurrence",
      objective:
        "Make permissions predictable across deployments and environments.",
      actions: [
        "Define expected file ownership and modes in deployment automation.",
        "Use dedicated service accounts and least-privilege access.",
        "Validate mounted paths and container UID/GID mappings.",
        "Test scheduled jobs using the correct execution identity.",
        "Add checks for critical configuration and runtime paths.",
      ],
      expectedResult:
        "Future releases and service restarts preserve the intended access rules.",
    },
  ],

  rootCauseScenarios: [
    {
      cause: "Incorrect ownership of application files",
      symptoms: [
        "The service cannot read or modify a file.",
        "The file owner differs from the documented deployment or runtime owner.",
      ],
      investigation: [
        "Inspect the target file's owner and group.",
        "Check the service's execution identity.",
        "Review how the deployment process created or replaced the file.",
      ],
      resolution: [
        "Restore the documented owner and group for the specific path.",
        "Grant only the required access.",
        "Fix deployment automation so future releases preserve ownership.",
      ],
    },
    {
      cause: "Missing execute permission or parent-directory traversal",
      symptoms: [
        "A script cannot be executed.",
        "A user cannot access a file despite the file itself having read permission.",
      ],
      investigation: [
        "Inspect the file mode.",
        "Use namei -l to examine each directory in the path.",
        "Check the script's interpreter and filesystem mount options.",
      ],
      resolution: [
        "Add only the necessary execute or traversal permission.",
        "Verify the interpreter exists.",
        "Retain least-privilege directory access.",
      ],
    },
    {
      cause: "ACL or SELinux denial",
      symptoms: [
        "The ordinary file mode appears correct but access still fails.",
        "Audit records or ACL entries indicate additional restrictions.",
      ],
      investigation: [
        "Inspect ACL entries and effective permissions.",
        "Check relevant SELinux audit records.",
        "Confirm whether a policy or file-label mismatch exists.",
      ],
      resolution: [
        "Correct the specific ACL or approved security-policy configuration.",
        "Use supported label-restoration tools where a label mismatch is confirmed.",
        "Do not disable security enforcement as the default fix.",
      ],
    },
    {
      cause: "SSH private key has overly permissive modes",
      symptoms: [
        "SSH rejects a private key and may report that permissions are too open.",
        "Authentication fails before the expected public-key login occurs.",
      ],
      investigation: [
        "Inspect the private key's owner and mode.",
        "Check permissions on the .ssh directory.",
        "Read the SSH client's exact diagnostic output.",
      ],
      resolution: [
        "Restrict access to the private key and SSH directory according to OpenSSH requirements.",
        "Ensure the key belongs to the intended user.",
        "Retry authentication and verify the server-side account configuration.",
      ],
    },
    {
      cause: "Container UID/GID mismatch",
      symptoms: [
        "An application inside a container cannot write to a bind-mounted directory.",
        "The host directory appears writable to a different user.",
      ],
      investigation: [
        "Check the UID and GID used inside the container.",
        "Inspect host directory ownership and mount configuration.",
        "Review user namespace mappings and security options.",
      ],
      resolution: [
        "Align the container identity and storage permissions according to the deployment design.",
        "Use a dedicated group or approved ownership strategy.",
        "Avoid broad permission changes on the host.",
      ],
    },
    {
      cause: "Read-only mount or noexec option",
      symptoms: [
        "Writes fail even when mode bits permit writing.",
        "A script cannot execute directly from a protected mount.",
      ],
      investigation: [
        "Inspect mount options with findmnt.",
        "Check system logs for filesystem errors if a mount became read-only unexpectedly.",
        "Confirm whether noexec is an intentional security setting.",
      ],
      resolution: [
        "Investigate and repair the cause of an unexpected read-only mount.",
        "Change mount policy only with authorization and a documented security review.",
        "Keep noexec where required by the system's security design.",
      ],
    },
  ],

  incidentScenario: {
    environment:
      "Illustrative scenario: an application runs as the myapp Linux service account and writes generated reports to /var/lib/myapp/reports.",

    incident:
      "After a deployment, report generation fails with Permission denied.",

    impact: [
      "New reports are not generated.",
      "A background worker repeatedly logs write errors.",
      "Users cannot retrieve the latest reports.",
    ],

    investigation: [
      "The engineer identifies the failing report directory from the application log.",
      "The service identity is confirmed using the systemd unit.",
      "The directory owner and mode are inspected.",
      "The directory is found to be owned by the deployment account with permissions that prevent the service account from writing.",
      "The team verifies that the deployment changed directory ownership.",
    ],

    rootCause:
      "The deployment process created the report directory with the wrong owner and did not apply the documented runtime permissions.",

    resolution: [
      "The application owner confirms the intended ownership model.",
      "The team corrects ownership and permissions for the specific report directory only.",
      "A controlled write test is performed using the service identity.",
      "The report-generation workflow is tested.",
      "Deployment automation is updated to enforce the expected directory ownership.",
    ],

    prevention: [
      "Validate runtime directory ownership during deployment.",
      "Add a post-deployment health check for report generation.",
      "Use a dedicated service account and least-privilege permissions.",
      "Monitor application logs for recurring permission failures.",
    ],
  },

  verification: [
    "The original operation succeeds under the intended user identity.",
    "The service is active and application-level health checks pass.",
    "The original error no longer appears in recent logs.",
    "File ownership and permissions match the approved design.",
    "ACLs and security policy remain in the intended state.",
    "No unnecessary access has been granted to other users.",
    "The fix persists after a deployment or service restart where applicable.",
  ],

  prevention: [
    "Use dedicated service users instead of running applications as root.",
    "Manage ownership and permissions through version-controlled deployment automation.",
    "Document required access for configuration, logs, uploads, cache, and runtime directories.",
    "Test cron and systemd jobs under their actual execution identities.",
    "Use least privilege for files containing credentials and private keys.",
    "Review ACL and SELinux changes through the standard security process.",
    "Validate container volume ownership and UID/GID mappings.",
    "Check mount options when diagnosing unexpected access failures.",
  ],

  monitoring: [
    "Collect application logs containing permission-related errors.",
    "Alert on repeated failures of critical jobs and services.",
    "Monitor service health checks after deployments.",
    "Record permission and ownership changes for sensitive paths.",
    "Audit unexpected access-denied events where supported.",
    "Include the host, service, target path, and timestamp in incident alerts.",
  ],

  safetyRules: [
    "Never use chmod -R 777 as a general fix.",
    "Never recursively change ownership without confirming the intended ownership model.",
    "Do not disable SELinux to bypass a denial.",
    "Do not make private keys or secret files readable by other users.",
    "Do not assume sudo reproduces the permissions of the failing service.",
    "Check parent-directory traversal permissions as well as the target file.",
    "Inspect mount options and ACLs when ordinary permissions look correct.",
    "Back up configuration and follow change control on production systems.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Date and time detected:",
    "Hostname and environment:",
    "Affected service or user:",
    "Target file or directory:",
    "Denied operation:",
    "Original error message:",
    "Process UID/GID:",
    "Original ownership and permissions:",
    "ACL or security-policy findings:",
    "Root cause:",
    "Corrective change:",
    "Verification result:",
    "Security review:",
    "Preventive action and owner:",
  ],

  troubleshootingChecklist: [
    "Captured the exact Permission denied message.",
    "Identified the target resource and denied operation.",
    "Confirmed the actual process or service identity.",
    "Checked file ownership and mode bits.",
    "Checked parent-directory traversal permissions.",
    "Inspected ACLs and security-policy denials where applicable.",
    "Checked mount options and execution requirements.",
    "Applied the smallest approved correction.",
    "Verified access using the intended identity.",
    "Confirmed application health and absence of recurring errors.",
    "Documented the root cause and preventive action.",
  ],
};

export default linuxPermissionDenied;
