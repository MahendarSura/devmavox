
export interface PermissionErrorsGuide {
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

export const permissionErrorsGuide: PermissionErrorsGuide = {
  id: "linux-permission-errors",
  title: "Linux Permission Errors — Production Troubleshooting",
  category: "Linux / Security / Access Control / DevOps",

  severity: [
    "SEV-1: Critical production service unavailable due to an access-control failure, or unauthorized access is suspected.",
    "SEV-2: Deployment, database, application, or automation workflow is blocked across important services.",
    "SEV-3: A single host, user, directory, or non-critical workload is affected.",
    "SEV-4: A non-blocking permission warning or configuration issue is detected before production impact."
  ],

  overview: `
Linux permission errors occur when a process cannot perform an operation
because of Unix mode bits, ownership, ACLs, privilege restrictions, mount
options, security policies, identity mapping, or another access-control layer.

A "Permission denied" message does not automatically mean chmod is required.
The process may be running as the wrong user, a parent directory may lack
execute permission, an ACL may restrict access, sudo may not authorize the
operation, an SSH key may have unsafe permissions, or SELinux/AppArmor may
deny access despite apparently correct Unix permissions.

The correct production workflow is to reproduce the failure safely, identify
the effective identity, inspect every relevant path component and security
layer, determine the minimum required access, implement an approved correction,
and validate the original operation without broadening privileges unnecessarily.
`,

  symptoms: [
    "bash: ./script.sh: Permission denied",
    "Permission denied while reading, creating, modifying, or deleting a file.",
    "A deployment pipeline fails although the same command works manually.",
    "A systemd service cannot read a configuration file or write to a directory.",
    "SSH rejects a private key because its permissions are too open.",
    "An application cannot access a mounted volume or uploaded file.",
    "sudo reports that the user is not allowed to execute a command.",
    "A cron job fails while the same command works in an interactive shell.",
    "A container cannot read files mounted from the host.",
    "An NFS-mounted directory rejects writes despite apparently correct local permissions.",
    "A file is owned by root after deployment and the application user cannot update it.",
    "SELinux or AppArmor denies access even though chmod and chown appear correct.",
    "A script exists but execution fails because of missing execute permission or a noexec mount.",
    "A user can access a file directly but cannot traverse one of its parent directories."
  ],

  incidentScenario: `
At 09:20 AM, a production deployment fails while copying application
configuration files. The pipeline reports "Permission denied". The same
command appears to work when an engineer runs it interactively with sudo.

The team must establish:
1. Which command and file operation failed?
2. Which user, group, and effective identity ran the command?
3. Which path component or security layer denied access?
4. Is the failure limited to CI, cron, systemd, a container, or all access paths?
5. Did a recent deployment change ownership, ACLs, sudo rules, or mount options?
6. What is the least-privilege correction?
7. How can the change be validated and safely rolled back?
`,

  impactAssessment: [
    "Confirm the environment, hostname, account, application, and deployment release.",
    "Determine whether the issue affects reads, writes, file creation, deletion, execution, or privilege escalation.",
    "Identify whether one user, a service account, an automation agent, or multiple hosts are affected.",
    "Check whether production deployment stopped before changes, partially applied changes, or changed live permissions.",
    "Determine whether customer traffic or application availability is affected.",
    "Check whether the incident is a simple access-control failure or a possible unauthorized-access/security incident.",
    "Correlate the failure with recent releases, package updates, user/group changes, secret rotation, mount changes, or hardening policies.",
    "Check whether the same operation succeeds under the expected service identity.",
    "Determine whether rollback is safe and whether the previous release's ownership and permissions are known.",
    "Escalate potential privilege escalation, unexpected ownership changes, or suspicious permission modifications to the security team."
  ],

  safetyChecks: [
    "Verify the target host, environment, repository, release, and account before changing permissions.",
    "Obtain production approval for ownership, ACL, sudo, SSH, and security-policy changes.",
    "Never use chmod -R 777 as a general fix.",
    "Do not recursively chown system directories or application trees without verifying the intended ownership model.",
    "Do not disable SELinux or AppArmor just to make an application work.",
    "Do not add service accounts to sudo or privileged groups without a documented requirement.",
    "Do not copy private SSH keys into shared directories or loosen private-key permissions.",
    "Do not edit /etc/sudoers directly; use visudo and approved policy management.",
    "Capture current owner, group, mode, ACL, mount options, and security-policy evidence before making changes.",
    "Check whether a symlink points to a different file or mount than expected.",
    "Do not expose secrets, tokens, private keys, or sensitive environment variables in pipeline logs.",
    "Prefer a narrow, reversible permission correction over broad access changes.",
    "If unauthorized changes are suspected, preserve evidence and follow the security incident process."
  ],

  evidenceCollection: [
    "Record incident ID, timestamp, hostname, environment, release, and operator.",
    "Capture the exact failed command and its exit code.",
    "Record the user identity using id, whoami, and relevant process details.",
    "Record the absolute path, symlink target, owner, group, and mode of the failing object.",
    "Inspect every parent directory with namei -l.",
    "Capture ACLs using getfacl where available.",
    "Record relevant mount options using findmnt.",
    "Check sudo authorization and relevant authentication logs.",
    "Inspect systemd service identity and sandbox settings when a service is involved.",
    "Inspect SELinux AVC or AppArmor denial logs where applicable.",
    "For SSH, record verbose client output and server authentication logs without exposing private-key material.",
    "Compare the failed execution environment with a successful execution environment.",
    "Record the before-and-after state for every approved change."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Reproduce the exact failure",
      objective: "Determine the failing operation instead of assuming the entire application lacks access.",
      commands: [
        "date -Is",
        "hostname -f",
        "id",
        "whoami",
        "pwd",
        "printf 'Exit status: %s\\n' \"$?\"",
        "ls -ld /path/to/parent /path/to/file"
      ],
      interpretResults: [
        "Capture the actual error and command exit status immediately after reproducing the failure.",
        "A command may fail during directory traversal, file reading, writing, execution, or privilege escalation.",
        "A manual shell may use a different user, group membership, environment, or working directory than CI or systemd.",
        "Do not repeat a destructive command merely to reproduce the error."
      ],
      nextAction: [
        "Record the precise operation and target path.",
        "Confirm the expected service account and execution context.",
        "Continue with identity and path inspection."
      ]
    },
    {
      step: 2,
      title: "Verify the effective user and groups",
      objective: "Determine which identity Linux evaluates for the operation.",
      commands: [
        "id",
        "id <service-user>",
        "getent passwd <service-user>",
        "getent group <group-name>",
        "ps -eo user,group,pid,ppid,args",
        "sudo -l -U <username>"
      ],
      interpretResults: [
        "id shows the current process user's UID, primary GID, and supplementary groups.",
        "getent checks identity data through configured name-service sources.",
        "A service account may not have the supplementary groups expected for an interactive user.",
        "Group membership changes may require a new login or service restart before an existing process receives updated groups.",
        "sudo -l -U checks sudo policy where the operator has permission to inspect it; it does not mean the command should be run as root."
      ],
      nextAction: [
        "Compare the actual identity with the application's documented runtime identity.",
        "If the wrong user is running the command, fix the service or pipeline identity rather than broadening file permissions.",
        "If group membership is missing, confirm the least-privilege group and follow approved identity-management procedures."
      ]
    },
    {
      step: 3,
      title: "Inspect the full path and parent-directory permissions",
      objective: "Find the exact directory component preventing access.",
      commands: [
        "namei -l /path/to/failing/file",
        "stat /path/to/failing/file",
        "ls -ld /path /path/to /path/to/failing",
        "readlink -f /path/to/failing/file",
        "getfacl -p /path/to/failing/file"
      ],
      interpretResults: [
        "Directory execute permission is required to traverse a directory.",
        "A file may be readable but inaccessible because one parent directory blocks traversal.",
        "The resolved symlink target may have different ownership or permissions from the visible path.",
        "ACL entries can grant or restrict access beyond the basic owner/group/other mode bits.",
        "A missing path and an inaccessible path can sometimes appear similar to a caller with limited privileges."
      ],
      nextAction: [
        "Identify the first path component where the effective user lacks required access.",
        "Correct only the affected directory or file and only the required permission.",
        "If ACLs are involved, preserve existing entries and the ACL mask when planning the change."
      ]
    },
    {
      step: 4,
      title: "Understand Linux read, write, and execute permissions",
      objective: "Map the failed operation to the actual required permission.",
      commands: [
        "stat -c '%A %a %U:%G %n' /path/to/failing/file",
        "stat -c '%A %a %U:%G %n' /path/to/parent",
        "getfacl -p /path/to/failing/file",
        "findmnt -no TARGET,SOURCE,FSTYPE,OPTIONS -T /path/to/failing/file"
      ],
      interpretResults: [
        "For a regular file, read permits reading contents, write permits modifying contents, and execute permits executing the file when other execution requirements are met.",
        "For directories, read permits listing names, write permits modifying directory entries, and execute permits traversal/search.",
        "Creating or deleting a file normally requires write and execute permissions on its parent directory, not necessarily write permission on the file itself.",
        "The sticky bit can restrict deletion or renaming in shared directories.",
        "Setgid directories can influence group ownership of newly created entries.",
        "The setuid and setgid bits have security implications and should not be added casually."
      ],
      nextAction: [
        "Determine the minimum permission required by the specific operation.",
        "Check ACLs, mount options, quotas, and security modules before changing Unix mode bits.",
        "Use the existing ownership model as the baseline."
      ]
    },
    {
      step: 5,
      title: "Check ACLs and default ACL inheritance",
      objective: "Identify permissions that cannot be explained by mode bits alone.",
      commands: [
        "getfacl -p /path/to/failing/file",
        "getfacl -p /path/to/parent",
        "getfacl -d -p /path/to/parent",
        "setfacl --help"
      ],
      interpretResults: [
        "Named-user or named-group ACL entries may provide additional access.",
        "The ACL mask can limit the effective permissions of named users, named groups, and the owning group.",
        "Default ACLs on directories can influence permissions inherited by new files and directories.",
        "A recursive ACL change can unexpectedly affect many users or workloads."
      ],
      nextAction: [
        "Save the current ACL before modifying it.",
        "Add or adjust only the required ACL entry after approval.",
        "Validate effective access as the intended user.",
        "Avoid replacing all ACLs unless the intended policy has been reviewed."
      ]
    },
    {
      step: 6,
      title: "Check ownership and group ownership",
      objective: "Confirm whether deployment or application files are owned by the expected identity.",
      commands: [
        "stat -c '%U:%G %a %n' /path/to/failing/file",
        "find /path/to/application -maxdepth 2 -printf '%u:%g %m %p\\n' 2>/dev/null | head -100",
        "getent passwd <service-user>",
        "getent group <application-group>"
      ],
      interpretResults: [
        "A deployment executed with sudo may create root-owned files that a non-root service cannot update.",
        "Ownership mismatch can affect a subset of files after a partial deployment.",
        "The correct owner may differ between source code, runtime data, logs, secrets, and deployment artifacts."
      ],
      nextAction: [
        "Confirm the intended owner and group with the application deployment standard.",
        "Change ownership only on the specific affected paths.",
        "Avoid recursive ownership changes across directories containing secrets, sockets, database files, or mounted volumes."
      ]
    },
    {
      step: 7,
      title: "Investigate executable scripts and noexec mounts",
      objective: "Distinguish file execute permission from interpreter or mount restrictions.",
      commands: [
        "ls -l /path/to/script.sh",
        "file /path/to/script.sh",
        "head -n 1 /path/to/script.sh",
        "findmnt -no TARGET,FSTYPE,OPTIONS -T /path/to/script.sh",
        "namei -l /path/to/script.sh"
      ],
      interpretResults: [
        "A script invoked directly generally needs an appropriate execute bit and a valid interpreter line.",
        "A noexec mount can prevent direct execution even when the file mode includes execute permission.",
        "A missing interpreter, invalid shebang, or incompatible line endings may produce execution errors different from a simple permission denial.",
        "Running a script through an interpreter can behave differently from direct execution and should not be used to bypass an intentional security restriction."
      ],
      nextAction: [
        "Correct the file mode only if execution is intended.",
        "Validate the interpreter and script format.",
        "If noexec is intentional, move approved executable content to an appropriate controlled location rather than removing the security control."
      ]
    },
    {
      step: 8,
      title: "Check sudo policy and privilege escalation",
      objective: "Determine why an approved administrative operation is denied.",
      commands: [
        "sudo -l",
        "sudo -l -U <username>",
        "sudo visudo -c",
        "sudo journalctl --since '30 minutes ago' | grep -i sudo",
        "sudo grep -i sudo /var/log/auth.log 2>/dev/null | tail -50",
        "sudo grep -i sudo /var/log/secure 2>/dev/null | tail -50"
      ],
      interpretResults: [
        "The available log path varies by distribution and logging configuration.",
        "sudo policy may restrict the executable, arguments, target user, host, or command environment.",
        "A user having shell access does not imply that the user is authorized to run arbitrary commands as root.",
        "A valid sudoers file does not prove that a particular user or command is authorized."
      ],
      nextAction: [
        "Confirm the exact command and required administrative scope.",
        "Update policy through approved configuration management.",
        "Use visudo for sudoers edits and validate the policy before rollout.",
        "Do not grant unrestricted sudo merely to make a pipeline pass."
      ]
    },
    {
      step: 9,
      title: "Investigate SSH key and remote-login permissions",
      objective: "Diagnose SSH authentication failures related to key files or authorized_keys.",
      commands: [
        "ssh -vvv -i /path/to/private_key user@host",
        "stat -c '%A %a %U:%G %n' /path/to/private_key",
        "namei -l /home/<username>/.ssh/authorized_keys",
        "ls -ld /home/<username> /home/<username>/.ssh",
        "ls -l /home/<username>/.ssh/authorized_keys",
        "sudo journalctl -u ssh --since '30 minutes ago'",
        "sudo journalctl -u sshd --since '30 minutes ago'"
      ],
      interpretResults: [
        "SSH private keys that are accessible to other users may be rejected by the client.",
        "The server may reject authorized_keys because of ownership, directory permissions, account policy, or sshd configuration.",
        "The SSH service unit name differs across distributions.",
        "Verbose output can expose usernames, hostnames, and connection metadata; redact sensitive data before sharing it.",
        "Never display or paste the private-key contents into logs or chat."
      ],
      nextAction: [
        "Correct the private-key permissions for the intended owner, commonly 600, where appropriate.",
        "Verify .ssh directory and authorized_keys ownership and access according to the server's policy.",
        "Check sshd configuration and authentication logs before changing server-wide settings.",
        "Validate access using the intended account and key."
      ]
    },
    {
      step: 10,
      title: "Check systemd service identity and sandboxing",
      objective: "Explain why a service fails although an interactive shell can access the same path.",
      commands: [
        "systemctl status <service-name>",
        "systemctl cat <service-name>",
        "systemctl show <service-name> -p User -p Group -p SupplementaryGroups",
        "systemctl show <service-name> -p ProtectSystem -p ProtectHome -p ReadWritePaths -p ReadOnlyPaths",
        "sudo journalctl -u <service-name> --since '30 minutes ago'"
      ],
      interpretResults: [
        "The service may run as a dedicated user with different groups from the operator.",
        "systemd sandboxing can restrict filesystem access independently of ordinary file permissions.",
        "ProtectSystem, ProtectHome, ReadWritePaths, and related settings can make paths unavailable or read-only to a service.",
        "A service can fail because its runtime directory does not exist or has incorrect ownership."
      ],
      nextAction: [
        "Confirm the intended User= and Group= values.",
        "Correct the runtime directory using the service's documented mechanism, such as RuntimeDirectory= where suitable.",
        "Change sandboxing only when required by the application design and approved security policy.",
        "Restart or reload the service only through the established deployment procedure."
      ]
    },
    {
      step: 11,
      title: "Check SELinux denials",
      objective: "Identify mandatory access-control restrictions beyond Unix permissions.",
      commands: [
        "getenforce",
        "sestatus",
        "sudo ausearch -m AVC,USER_AVC -ts recent",
        "sudo journalctl --since '30 minutes ago' | grep -i 'avc:.*denied'",
        "ls -Z /path/to/failing/file",
        "matchpathcon /path/to/failing/file"
      ],
      interpretResults: [
        "SELinux may deny an operation even when Unix owner, group, and mode bits look correct.",
        "An AVC denial provides evidence about the source domain, target type, and denied operation.",
        "A file may have an incorrect security label after being copied or moved.",
        "Some tools may be unavailable if audit utilities are not installed or auditing is configured differently."
      ],
      nextAction: [
        "Use the denial evidence to determine the expected label or policy.",
        "Where a label is incorrect, consider the documented restorecon procedure after confirming the expected context.",
        "Use semanage fcontext for persistent custom labeling when appropriate.",
        "Do not disable SELinux or blindly apply generated allow rules without security review."
      ]
    },
    {
      step: 12,
      title: "Check AppArmor restrictions",
      objective: "Determine whether an AppArmor profile blocks the process.",
      commands: [
        "sudo aa-status",
        "sudo journalctl -k --since '30 minutes ago' | grep -i apparmor",
        "sudo dmesg -T | grep -i apparmor",
        "cat /proc/<PID>/attr/current"
      ],
      interpretResults: [
        "AppArmor can restrict file access based on the process profile.",
        "Kernel logs may identify the profile and path involved in a denial.",
        "The active profile may differ between hosts or package versions."
      ],
      nextAction: [
        "Confirm the relevant profile and denied operation.",
        "Update the profile through the approved policy process.",
        "Validate in a controlled environment before production rollout.",
        "Do not disable AppArmor globally to bypass a single denial."
      ]
    },
    {
      step: 13,
      title: "Check mount options and network filesystems",
      objective: "Investigate restrictions imposed by filesystems, NFS, or mount configuration.",
      commands: [
        "findmnt -T /path/to/failing/file",
        "findmnt -no SOURCE,FSTYPE,OPTIONS -T /path/to/failing/file",
        "mount | grep -E 'nfs|cifs|ro,|noexec'",
        "nfsstat -m",
        "id",
        "stat -c '%u:%g %a %n' /path/to/failing/file"
      ],
      interpretResults: [
        "A read-only mount prevents writes regardless of ordinary file mode bits.",
        "NFS permissions can depend on server-side ownership, numeric UID/GID mapping, export policy, and root squashing.",
        "CIFS/SMB mounts can use server credentials and mount options that affect effective access.",
        "A noexec mount can prevent direct execution.",
        "Mount-specific behavior must be distinguished from local Unix permissions."
      ],
      nextAction: [
        "Confirm the intended mount and server-side policy with the storage owner.",
        "Correct UID/GID mapping or export configuration through approved procedures.",
        "Do not disable root squashing or remount production storage read-write without a security and availability review."
      ]
    },
    {
      step: 14,
      title: "Investigate Docker bind mounts and container identity",
      objective: "Determine why a container cannot read or write a host-mounted path.",
      commands: [
        "docker inspect <container-name>",
        "docker exec <container-name> id",
        "docker exec <container-name> sh -c 'id; ls -ld /path/in/container'",
        "stat -c '%u:%g %a %n' /path/on/host",
        "namei -l /path/on/host",
        "docker inspect --format '{{json .Mounts}}' <container-name>"
      ],
      interpretResults: [
        "The container process may run as a non-root UID that does not match the host directory owner.",
        "Bind mounts expose host permissions to the container; the image's declared user may differ from the host account.",
        "Read-only mounts can prevent writes even if file modes allow them.",
        "Rootless Docker and user-namespace remapping can change how container IDs map to host IDs.",
        "SELinux labeling options may also matter on SELinux-enabled hosts."
      ],
      nextAction: [
        "Confirm the intended container UID/GID and whether the mount should be read-only.",
        "Use a deliberate ownership, group, ACL, or mount configuration that satisfies least privilege.",
        "Avoid running the container as root solely to bypass a permissions issue.",
        "Validate the actual operation inside the container."
      ]
    },
    {
      step: 15,
      title: "Compare CI/CD execution with manual execution",
      objective: "Find environment differences that explain deployment-only permission failures.",
      commands: [
        "id",
        "pwd",
        "umask",
        "env | cut -d= -f1 | sort",
        "git status --short",
        "git diff --stat",
        "stat -c '%U:%G %a %n' /path/to/workspace",
        "namei -l /path/to/deployment/target"
      ],
      interpretResults: [
        "CI agents may use a different user, group, workspace, umask, container image, or mounted filesystem.",
        "A pipeline may use sudo for one step and an unprivileged user for the next.",
        "Artifacts created as root can become inaccessible to the deployment user.",
        "The environment command shown here lists variable names only; avoid dumping secrets into CI logs.",
        "Git-tracked executable bits can differ from runtime filesystem permissions."
      ],
      nextAction: [
        "Compare identity, workspace path, ownership, umask, and mount options between successful and failed execution.",
        "Correct the runner configuration or deployment ownership model.",
        "Avoid making the entire workspace world-writable.",
        "Rerun the smallest safe stage before restarting the full production deployment."
      ]
    },
    {
      step: 16,
      title: "Investigate cron jobs and scheduled tasks",
      objective: "Explain why a command works interactively but fails on schedule.",
      commands: [
        "crontab -l",
        "sudo crontab -l -u <service-user>",
        "systemctl list-timers --all",
        "sudo journalctl --since '2 hours ago' | grep -i cron",
        "sudo journalctl -u <service-name> --since '2 hours ago'"
      ],
      interpretResults: [
        "Cron jobs often run with a different user, restricted environment, working directory, and PATH.",
        "A job may rely on files or directories accessible only to an interactive account.",
        "Scheduled jobs may also execute under a systemd timer rather than cron."
      ],
      nextAction: [
        "Verify the actual scheduled-task identity and absolute paths.",
        "Set the required working directory and environment explicitly.",
        "Redirect logs to an approved location with correct ownership and retention.",
        "Validate the job as its intended user in a controlled manner."
      ]
    },
    {
      step: 17,
      title: "Check immutable attributes and unusual filesystem restrictions",
      objective: "Identify cases where normal owner permissions are insufficient.",
      commands: [
        "lsattr /path/to/failing/file",
        "lsattr -d /path/to/failing/directory",
        "findmnt -no FSTYPE,OPTIONS -T /path/to/failing/file",
        "stat /path/to/failing/file"
      ],
      interpretResults: [
        "An immutable attribute can prevent modification or deletion even for privileged users.",
        "Filesystem-specific behavior, read-only mounts, and security policies can override expectations based on mode bits alone.",
        "Not all filesystems support the same attributes."
      ],
      nextAction: [
        "Confirm why the attribute or restriction was applied.",
        "Remove an attribute only with approval and after verifying the file's role.",
        "Check the underlying filesystem and security policy before attempting a workaround."
      ]
    },
    {
      step: 18,
      title: "Apply the smallest safe correction",
      objective: "Correct the proven cause without granting unnecessary access.",
      commands: [
        "stat -c '%U:%G %a %n' /path/to/failing/file",
        "getfacl -p /path/to/failing/file",
        "namei -l /path/to/failing/file",
        "findmnt -no TARGET,FSTYPE,OPTIONS -T /path/to/failing/file"
      ],
      interpretResults: [
        "Do not choose a chmod or chown command until the intended identity and required access are established.",
        "Different objects require different fixes: file mode, directory traversal, owner/group, ACL, sudo policy, security label, or mount configuration.",
        "A recursive change may break secrets, sockets, executable files, or other services."
      ],
      nextAction: [
        "Record the current state and approved target state.",
        "Apply one narrow change at a time.",
        "Validate the operation under the intended user or service identity.",
        "If the change causes unexpected effects, stop and use the documented rollback procedure."
      ]
    },
    {
      step: 19,
      title: "Validate service recovery and assess rollback",
      objective: "Confirm the original workflow succeeds and no access was broadened unnecessarily.",
      commands: [
        "id",
        "namei -l /path/to/failing/file",
        "stat -c '%U:%G %a %n' /path/to/failing/file",
        "getfacl -p /path/to/failing/file",
        "systemctl is-active <service-name>",
        "systemctl --failed"
      ],
      interpretResults: [
        "The original operation should succeed using the intended account, not only as root.",
        "Ownership, mode, ACL, and security labels should match the approved design.",
        "The service should be healthy and no new denials should appear.",
        "A successful chmod alone is not proof that the root cause is fixed."
      ],
      nextAction: [
        "Run an application smoke test and a controlled read/write or deployment test.",
        "Verify access to unrelated users and files remains restricted.",
        "Rollback the specific change if it breaks service behavior or violates policy.",
        "Monitor logs and audit events before closing the incident."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      cause: "Wrong process user or missing group membership",
      evidence: [
        "id shows an unexpected UID, GID, or supplementary groups.",
        "Manual execution succeeds while CI, cron, or systemd execution fails."
      ],
      resolution: [
        "Correct the execution identity or approved group membership.",
        "Restart the affected process only if necessary for updated credentials to take effect.",
        "Avoid broadening permissions as a substitute for correcting identity."
      ],
      prevention: [
        "Document service users and groups.",
        "Add identity checks to deployment diagnostics.",
        "Review group changes through configuration management."
      ]
    },
    {
      cause: "Incorrect file or directory mode",
      evidence: [
        "stat and namei identify the exact component lacking required access.",
        "The required operation conflicts with the existing mode bits."
      ],
      resolution: [
        "Apply the narrowest approved chmod change.",
        "For shared directories, review setgid and sticky-bit requirements.",
        "Verify the intended user can perform the original operation."
      ],
      prevention: [
        "Set permissions explicitly during deployment.",
        "Use secure defaults and configuration-management enforcement.",
        "Test file and directory access as the real service user."
      ]
    },
    {
      cause: "Incorrect owner or group after deployment",
      evidence: [
        "New files are root-owned while the application runs as a non-root account.",
        "Only recently deployed files fail."
      ],
      resolution: [
        "Correct ownership on the specific affected paths.",
        "Fix deployment steps that create files under the wrong identity.",
        "Avoid indiscriminate recursive chown."
      ],
      prevention: [
        "Use consistent deployment identities.",
        "Validate ownership before activating a release.",
        "Keep runtime data separate from immutable application artifacts."
      ]
    },
    {
      cause: "ACL entry or ACL mask",
      evidence: [
        "getfacl shows named-user/group entries or a restrictive mask.",
        "Basic mode bits do not explain the effective access."
      ],
      resolution: [
        "Save the current ACL and update the minimal required entry.",
        "Review default ACL inheritance on parent directories.",
        "Validate effective access after the change."
      ],
      prevention: [
        "Manage ACLs through versioned configuration.",
        "Document shared-directory access policies.",
        "Test ACL inheritance in staging."
      ]
    },
    {
      cause: "SELinux or AppArmor denial",
      evidence: [
        "Audit or kernel logs identify a denial for the process and target path.",
        "Unix permissions appear adequate."
      ],
      resolution: [
        "Use denial evidence to correct labels or approved security profiles.",
        "Test policy changes before production rollout.",
        "Do not disable mandatory access control as a generic workaround."
      ],
      prevention: [
        "Validate security labels after deployments.",
        "Test service profiles in staging.",
        "Monitor relevant audit events."
      ]
    },
    {
      cause: "Sudo policy restriction",
      evidence: [
        "sudo -l does not authorize the required command or target user.",
        "Authentication logs record a policy denial."
      ],
      resolution: [
        "Request a narrow approved sudo rule.",
        "Use visudo and validate configuration.",
        "Avoid unrestricted sudo privileges."
      ],
      prevention: [
        "Manage sudo policy as code.",
        "Review privileged access periodically.",
        "Audit changes and administrative command usage."
      ]
    },
    {
      cause: "SSH key or authorized_keys permissions",
      evidence: [
        "Verbose SSH output reports key rejection or authentication failure.",
        "Ownership or permissions of the private key or server-side SSH files violate expected policy."
      ],
      resolution: [
        "Correct client private-key access and server-side file ownership and permissions.",
        "Review sshd policy and authentication logs.",
        "Never expose or transmit private-key contents."
      ],
      prevention: [
        "Manage SSH keys through approved secret-management processes.",
        "Rotate compromised credentials.",
        "Test access using a dedicated automation account."
      ]
    },
    {
      cause: "Read-only, noexec, NFS, or container mount restriction",
      evidence: [
        "findmnt shows restrictive mount options or a different filesystem.",
        "Host and container access differ.",
        "NFS server ownership or export behavior conflicts with local expectations."
      ],
      resolution: [
        "Correct the mount or server-side policy only after approval.",
        "Verify UID/GID mapping and read-only requirements.",
        "Preserve intended security restrictions."
      ],
      prevention: [
        "Version mount configuration.",
        "Validate required mounts at startup.",
        "Test host/container access with production-like identities."
      ]
    },
    {
      cause: "systemd or scheduled-job execution context",
      evidence: [
        "The command works interactively but fails in a service, cron job, or timer.",
        "The service uses different credentials, paths, environment, or sandbox settings."
      ],
      resolution: [
        "Set the intended user, group, working directory, and required paths explicitly.",
        "Review systemd sandboxing and runtime-directory configuration.",
        "Test the job under the real execution identity."
      ],
      prevention: [
        "Use service-specific accounts.",
        "Keep unit files version controlled.",
        "Add scheduled-job health checks and useful logs."
      ]
    }
  ],

  recoveryRunbook: [
    {
      phase: "Phase 1 — Stabilize and preserve evidence",
      actions: [
        "Declare the incident and identify the service owner.",
        "Confirm host, environment, command, path, and effective identity.",
        "Capture stat, namei, ACL, mount, and relevant security-policy evidence.",
        "Pause a partially applied deployment if continuing it could worsen the incident.",
        "Escalate suspected unauthorized permission changes to security."
      ],
      validation: [
        "The failing operation and target object are known.",
        "The current permission state has been captured.",
        "A remediation owner and approval path are established."
      ]
    },
    {
      phase: "Phase 2 — Isolate the denying layer",
      actions: [
        "Check UID, GID, and supplementary groups.",
        "Inspect parent directories, symlinks, owner/group, mode, and ACL.",
        "Check sudo rules, mount options, and security-module logs as applicable.",
        "Compare CI, systemd, cron, container, or SSH execution context."
      ],
      validation: [
        "A specific cause is supported by evidence.",
        "The proposed correction is limited to that cause.",
        "No broad privilege escalation is required."
      ]
    },
    {
      phase: "Phase 3 — Apply an approved least-privilege fix",
      actions: [
        "Save the current state and configuration.",
        "Make one narrow change at a time.",
        "Use configuration management for durable production changes.",
        "Avoid recursive permission changes unless scope and target state are verified.",
        "Keep security controls enabled."
      ],
      validation: [
        "The intended user receives only the required access.",
        "Unrelated files and services retain their original protections.",
        "The change is documented and reversible."
      ]
    },
    {
      phase: "Phase 4 — Controlled recovery",
      actions: [
        "Repeat the original operation as the intended identity.",
        "Rerun only the smallest safe deployment stage first.",
        "Restart or reload a service only when required and approved.",
        "Validate the application and inspect relevant logs."
      ],
      validation: [
        "The original operation succeeds without unnecessary root access.",
        "The service is healthy.",
        "No new security denials or permission regressions appear."
      ]
    },
    {
      phase: "Phase 5 — Rollback and closure",
      actions: [
        "If the change breaks another workload, stop rollout and restore the saved configuration or permission state.",
        "Do not blindly restore a whole directory tree when ownership may have changed legitimately.",
        "Document root cause, evidence, remediation, and prevention actions.",
        "Assign owners and due dates for follow-up work."
      ],
      validation: [
        "The service meets its health criteria.",
        "The permission model matches the approved design.",
        "Monitoring and security checks remain healthy."
      ]
    }
  ],

  productionScenarios: [
    {
      scenario: "Scenario 1 — Deployment fails after sudo creates root-owned files",
      symptoms: [
        "The first deployment succeeds, but the next release cannot overwrite files.",
        "CI reports Permission denied.",
        "Recently generated artifacts are owned by root."
      ],
      investigation: [
        "Compare id and stat output for old and newly created files.",
        "Inspect the pipeline stages that use sudo.",
        "Check whether later stages execute as an unprivileged deployment user."
      ],
      resolution: [
        "Correct ownership on verified deployment artifacts.",
        "Adjust the deployment workflow so files are created by the intended account.",
        "Run a controlled deployment and validate rollback behavior."
      ],
      prevention: [
        "Avoid unnecessary sudo in build and deployment stages.",
        "Enforce ownership as part of release preparation.",
        "Test a second deployment, not only the initial release."
      ]
    },
    {
      scenario: "Scenario 2 — Script works manually but fails in cron",
      symptoms: [
        "An automation job fails with Permission denied.",
        "The same script works in an interactive terminal."
      ],
      investigation: [
        "Check the crontab owner and scheduled command.",
        "Inspect file permissions and parent-directory traversal.",
        "Compare working directory, PATH, groups, and environment."
      ],
      resolution: [
        "Use the correct scheduled-task identity.",
        "Use explicit paths and required environment settings.",
        "Correct only the specific file or directory access requirement."
      ],
      prevention: [
        "Test jobs under their real account.",
        "Capture output and exit status.",
        "Monitor scheduled-task failures."
      ]
    },
    {
      scenario: "Scenario 3 — systemd service cannot write to its runtime directory",
      symptoms: [
        "The service starts and immediately fails while creating a PID, socket, or state file.",
        "Manual execution under an administrator account succeeds."
      ],
      investigation: [
        "Inspect systemctl cat and systemctl show for User, Group, and sandbox settings.",
        "Inspect the directory owner and traversal permissions.",
        "Read journalctl output for the exact failing path."
      ],
      resolution: [
        "Create or configure the runtime directory using the unit's supported mechanism.",
        "Set appropriate owner and group.",
        "Adjust sandbox settings only if the application genuinely requires the access."
      ],
      prevention: [
        "Use dedicated service identities.",
        "Version-control systemd unit files.",
        "Test service startup after reboot in staging."
      ]
    },
    {
      scenario: "Scenario 4 — SSH automation key is rejected",
      symptoms: [
        "Ansible or a deployment job cannot connect to a host.",
        "SSH reports that the private key is too accessible or authentication failed."
      ],
      investigation: [
        "Run ssh -vvv with the intended identity and key.",
        "Inspect private-key mode and owner.",
        "Check server-side home, .ssh, authorized_keys permissions, and authentication logs."
      ],
      resolution: [
        "Apply the correct restrictive private-key permissions.",
        "Correct server-side ownership and permissions according to policy.",
        "Verify the account and key without exposing secret contents."
      ],
      prevention: [
        "Use a managed secret store or SSH agent.",
        "Validate key access in CI.",
        "Rotate exposed credentials and audit access."
      ]
    },
    {
      scenario: "Scenario 5 — Docker container cannot write to a bind mount",
      symptoms: [
        "The application works in a development container but fails in production.",
        "The container reports Permission denied on a mounted directory."
      ],
      investigation: [
        "Inspect container User and Mounts configuration.",
        "Run id inside the container.",
        "Compare container UID/GID with host directory ownership.",
        "Check read-only mounts, user namespaces, and SELinux labeling where relevant."
      ],
      resolution: [
        "Align ownership or group access with the intended container identity.",
        "Use a read-only mount if writes are not required.",
        "Avoid running as root as a quick workaround."
      ],
      prevention: [
        "Test production-like UID/GID mappings.",
        "Version-control container and volume configuration.",
        "Add writable-path checks to startup validation."
      ]
    },
    {
      scenario: "Scenario 6 — Correct mode bits but SELinux denies access",
      symptoms: [
        "File ownership and mode appear correct.",
        "The service still receives Permission denied.",
        "Audit logs show an AVC denial."
      ],
      investigation: [
        "Check getenforce and relevant audit logs.",
        "Inspect the file security context and expected path context.",
        "Confirm whether deployment copied files with an unexpected label."
      ],
      resolution: [
        "Restore the expected label or apply an approved persistent file-context rule.",
        "Validate service behavior with SELinux still enforcing.",
        "Have security review any custom policy requirement."
      ],
      prevention: [
        "Validate labels during deployment.",
        "Test security policies in staging.",
        "Alert on recurring denials."
      ]
    },
    {
      scenario: "Scenario 7 — NFS directory rejects writes",
      symptoms: [
        "A user can read but cannot create files on a shared mount.",
        "Local ownership appears correct.",
        "Different hosts may behave differently."
      ],
      investigation: [
        "Inspect findmnt and NFS mount options.",
        "Compare numeric UID/GID values across client and server.",
        "Ask the storage owner to verify export policy, ACLs, and root-squash behavior."
      ],
      resolution: [
        "Correct identity mapping or server-side permissions through approved procedures.",
        "Keep root squashing enabled unless an exceptional security design explicitly requires otherwise.",
        "Validate access from the affected client and account."
      ],
      prevention: [
        "Standardize identity management across clients.",
        "Document export policies.",
        "Monitor mount health and access failures."
      ]
    },
    {
      scenario: "Scenario 8 — Sudo policy change breaks production automation",
      symptoms: [
        "A pipeline suddenly cannot execute a privileged command.",
        "The error references sudo authorization or command restrictions."
      ],
      investigation: [
        "Inspect sudo -l for the automation account.",
        "Review recent sudoers changes and authentication logs.",
        "Validate sudoers syntax using visudo -c."
      ],
      resolution: [
        "Restore the approved narrow command authorization.",
        "Deploy policy through configuration management.",
        "Run a controlled pipeline stage before resuming the complete rollout."
      ],
      prevention: [
        "Review sudo policy changes.",
        "Test privileged commands in staging.",
        "Use explicit command allowlists rather than unrestricted sudo."
      ]
    }
  ],

  prevention: [
    "Use dedicated service accounts and explicit group membership.",
    "Apply least-privilege ownership and permissions.",
    "Keep application code, secrets, runtime state, logs, and database data in appropriately separated paths.",
    "Manage file ownership, ACLs, sudoers, SSH settings, and systemd units through configuration management.",
    "Test deployment under the actual CI or service identity.",
    "Validate parent-directory traversal and ACL inheritance.",
    "Preserve SELinux and AppArmor protections.",
    "Use secure secret storage for private keys and credentials.",
    "Avoid unnecessary sudo and privileged containers.",
    "Review recursive chmod/chown commands during code review.",
    "Test upgrades, rollback, and repeat deployments.",
    "Audit changes to privileged files and access-control configuration."
  ],

  monitoring: [
    "Repeated Permission denied errors in application and system logs.",
    "CI/CD job failure rates categorized by permission-related exit errors.",
    "SSH authentication and key rejection events.",
    "sudo authorization failures and privileged policy changes.",
    "SELinux AVC and AppArmor denial events.",
    "Unexpected owner, group, or mode changes to sensitive files.",
    "Service startup failures involving runtime directories.",
    "Container volume write failures.",
    "NFS access failures and mount errors.",
    "Unauthorized modifications to sudoers, SSH configuration, or security policy.",
    "Configuration-management drift in ownership and permissions."
  ],

  ciChecks: [
    "Run deployment tests as the actual deployment user.",
    "Validate expected ownership and mode on generated artifacts.",
    "Check that scripts requiring direct execution have the intended executable bit.",
    "Validate sudoers syntax with visudo -c in a safe test environment.",
    "Validate systemd unit configuration and service identity.",
    "Check required directories and mount paths before deployment.",
    "Use static analysis and secret scanning for privileged scripts and credentials.",
    "Test container filesystem writes with the configured runtime UID/GID.",
    "Check SELinux labels and AppArmor policy in representative staging environments.",
    "Fail safely when required permissions are missing instead of applying chmod 777 automatically.",
    "Test repeat deployment and rollback after permission changes.",
    "Redact secrets from diagnostic logs."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Environment, host, and affected service:",
    "Failed operation and exact error:",
    "Start time, detection time, mitigation time, and recovery time:",
    "Business impact and severity:",
    "Execution identity: UID, GID, groups, service account:",
    "Affected path and filesystem or mount:",
    "Evidence: stat, namei, ACL, mount, sudo, and security-policy output:",
    "Confirmed root cause and supporting evidence:",
    "Approved permission or configuration changes:",
    "Validation performed under the intended identity:",
    "Rollback result and security impact:",
    "Monitoring and prevention changes:",
    "Corrective actions, owners, and due dates:"
  ],

  handsOnLabs: [
    {
      lab: "Lab 1 — Parent-directory traversal failure",
      steps: [
        "Use a disposable Linux VM and create a test directory tree.",
        "Remove execute permission from one parent directory for the test user.",
        "Use namei -l and attempt access as that user.",
        "Restore the original permission and validate access."
      ],
      expectedLearning: "Understand why access can fail even when the final file appears readable."
    },
    {
      lab: "Lab 2 — ACL and ACL mask",
      steps: [
        "Create a test file and two unprivileged lab users.",
        "Inspect the file with getfacl.",
        "Add a narrow named-user ACL in the lab.",
        "Inspect the ACL mask and test access as both users.",
        "Restore the original ACL."
      ],
      expectedLearning: "Understand effective ACL permissions and why mode bits alone may not explain access."
    },
    {
      lab: "Lab 3 — CI-style ownership mismatch",
      steps: [
        "Create a disposable deployment directory.",
        "Create test artifacts under two different lab identities.",
        "Inspect ownership and reproduce a controlled write failure.",
        "Correct the ownership model and repeat the operation."
      ],
      expectedLearning: "Recognize root-owned artifacts and identity mismatches in deployment workflows."
    },
    {
      lab: "Lab 4 — systemd service identity",
      steps: [
        "Create a harmless test service in a disposable VM.",
        "Run it as a dedicated unprivileged user.",
        "Test writing to an intentionally inaccessible test directory.",
        "Inspect systemctl show and journalctl output.",
        "Apply a narrow fix and verify the service."
      ],
      expectedLearning: "Distinguish interactive-user access from service-user access."
    },
    {
      lab: "Lab 5 — Container bind-mount permissions",
      steps: [
        "Use a disposable Docker host and a test directory.",
        "Run a container as a non-root UID.",
        "Attempt a write to the bind mount.",
        "Compare container identity with host ownership.",
        "Correct the lab directory permissions and validate the write."
      ],
      expectedLearning: "Understand how container identity and host filesystem permissions interact."
    }
  ],

  interviewQuestions: [
    {
      question: "What do you do first when a Linux command returns Permission denied?",
      answer: "Capture the exact command and target path, confirm the effective identity with id, inspect the path using namei -l and stat, and then check ACLs, mount options, and security-policy logs as needed."
    },
    {
      question: "Why does chmod 777 not always solve Permission denied?",
      answer: "The failure may involve parent-directory traversal, ACLs, SELinux, AppArmor, a read-only or noexec mount, a remote filesystem, or a different execution identity. chmod 777 also creates unnecessary security exposure."
    },
    {
      question: "What is the difference between file and directory execute permission?",
      answer: "Execute permission on a regular file permits execution when other requirements are met. Execute permission on a directory permits traversal or searching for entries within it."
    },
    {
      question: "Why does an application work manually but fail in systemd?",
      answer: "The service may run under a different user or group, use a different environment, lack a runtime directory, or be restricted by systemd sandbox settings."
    },
    {
      question: "What is an ACL?",
      answer: "An access-control list provides additional user and group access entries beyond basic owner/group/other mode bits. The ACL mask can limit effective permissions."
    },
    {
      question: "How do you diagnose a path permission problem?",
      answer: "Use namei -l to inspect every path component, stat to inspect ownership and mode, readlink to resolve symlinks, and getfacl to inspect ACLs."
    },
    {
      question: "How do you fix root-owned files created by CI?",
      answer: "Confirm the intended deployment identity, correct ownership on the affected artifacts, and fix the pipeline so future files are created under the correct account."
    },
    {
      question: "How do you diagnose an SSH private-key permission error?",
      answer: "Use verbose SSH output and stat to inspect key ownership and mode. Apply restrictive permissions appropriate to the key and inspect server-side authentication logs without exposing key contents."
    },
    {
      question: "Why can SELinux deny access when chmod looks correct?",
      answer: "SELinux enforces mandatory access-control rules using process domains and object labels. Correct Unix mode bits do not override a policy denial."
    },
    {
      question: "What is the safest way to modify sudoers?",
      answer: "Use visudo, validate the policy, grant only the required command and scope, and deploy the change through approved configuration management."
    },
    {
      question: "How do Docker bind mounts cause permission errors?",
      answer: "The container process UID/GID may not match host directory ownership, or the mount may be read-only. User namespaces and SELinux labeling can also affect access."
    },
    {
      question: "How do you investigate an NFS permission problem?",
      answer: "Inspect the mount, compare numeric UID/GID values, and ask the storage owner to verify server-side permissions, ACLs, export policy, and root-squash behavior."
    },
    {
      question: "What does a noexec mount do?",
      answer: "It prevents direct execution of files from that mount. It should be treated as a security control, not casually removed to bypass an execution failure."
    },
    {
      question: "How do you validate a permission fix?",
      answer: "Repeat the original operation as the intended user, inspect the resulting ownership and permissions, verify the service, and confirm unrelated users still lack unauthorized access."
    },
    {
      question: "What should you never do during a production permission incident?",
      answer: "Do not blindly apply chmod 777, recursively change ownership, disable security controls, grant unrestricted sudo, or expose private keys. Identify the denying layer and make the smallest approved correction."
    }
  ],

  references: [
    "man chmod — change file mode bits.",
    "man chown — change file owner and group.",
    "man stat — inspect file metadata.",
    "man namei — inspect pathname components.",
    "man getfacl and man setfacl — inspect and modify ACLs.",
    "man sudo and man visudo — privilege escalation and sudo policy.",
    "man ssh and man sshd_config — SSH client and server configuration.",
    "systemd.exec documentation — service identity and filesystem sandboxing.",
    "SELinux documentation — labels, AVC denials, and policy troubleshooting.",
    "AppArmor documentation — profile status and access denials.",
    "Docker documentation — container users and bind mounts.",
    "NFS documentation — UID/GID mapping, export policy, and root squashing."
  ]
};
