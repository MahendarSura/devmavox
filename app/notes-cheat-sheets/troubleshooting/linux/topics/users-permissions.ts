import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Linux Users, Groups, Permissions and Access Management",
  description: "Complete Linux identity and access management guide covering users, groups, UID and GID, user lifecycle, ownership, permission models, symbolic and numeric permissions, special permissions, ACLs, umask, sudo, SSH access, service accounts, password policies, auditing, troubleshooting, production access management, and 30 interview questions.",

  sections: [
    {
      heading: "1. Linux User and Permission Management Introduction",
      explanation: "Linux is a multi-user operating system. Multiple users and services can access the same system while permissions control which resources they can read, modify, or execute. Each user has a unique user identifier called UID. Each group has a group identifier called GID. File ownership and permission bits determine access. Administrators use users, groups, sudo, ACLs, and authentication policies to enforce least privilege. Production access should be approved, documented, monitored, and periodically reviewed.",
      steps: [
        "Identify the user or service requiring access.",
        "Determine the resources and operations required.",
        "Check existing users, groups, and ownership.",
        "Assign the minimum required permissions.",
        "Use approved group membership or sudo rules.",
        "Test access using the intended identity.",
        "Record the access change.",
        "Review access periodically."
      ],
      commands: [
        "whoami",
        "id",
        "getent passwd",
        "getent group",
        "who",
        "w",
        "groups",
        "last"
      ],
      problems: [
        {
          issue: "A user cannot access an application directory.",
          rootCause: "The user may not belong to the required group or may lack directory traversal permission.",
          solution: "Inspect id, groups, namei -l, ownership, and directory permissions. Request the minimum approved access change."
        },
        {
          issue: "A user has more privileges than required.",
          rootCause: "Broad group membership, excessive sudo rules, or inherited permissions.",
          solution: "Review effective access, remove unnecessary privileges through an approved change, and audit the result."
        }
      ]
    },
    {
      heading: "2. Linux Identity Architecture: UID, GID and Account Databases",
      explanation: "Linux identifies users using numeric UIDs and groups using numeric GIDs. Account information is commonly resolved through the Name Service Switch configuration, which may use local files, LDAP, or other identity providers. /etc/passwd contains account records, while /etc/shadow stores protected password-related information. /etc/group defines local group records and /etc/gshadow contains protected group information. Applications should use standard identity lookup mechanisms rather than assuming every account is stored locally.",
      steps: [
        "Understand UID and GID values.",
        "Inspect the configured identity sources.",
        "Use getent to query resolved accounts.",
        "Inspect local account files carefully.",
        "Identify human, system, and service accounts.",
        "Check for duplicate or unexpected identities.",
        "Verify identity provider availability.",
        "Document the account resolution design."
      ],
      commands: [
        "id username",
        "getent passwd username",
        "getent group developers",
        "cat /etc/nsswitch.conf",
        "grep '^username:' /etc/passwd",
        "sudo getent shadow username",
        "getent passwd | wc -l",
        "getent group | wc -l"
      ],
      problems: [
        {
          issue: "A user exists in the identity provider but is not resolved on a server.",
          rootCause: "NSS configuration, LDAP connectivity, DNS, or identity-provider synchronization may be failing.",
          solution: "Check getent, NSS configuration, identity service health, network connectivity, and authentication logs."
        },
        {
          issue: "Two accounts appear to have conflicting ownership.",
          rootCause: "UID values may be duplicated or inconsistent across systems.",
          solution: "Compare numeric UIDs and identity-provider records. Correct the identity mapping through an approved change."
        }
      ]
    },
    {
      heading: "3. Creating and Managing Linux Users",
      explanation: "User lifecycle management includes creating, modifying, locking, unlocking, and removing accounts. useradd creates accounts, usermod changes account properties, and userdel removes accounts. The exact defaults vary by distribution and configuration. Administrators should specify the intended home directory, shell, primary group, and supplementary groups. Production accounts should have an owner, business purpose, expiration or review date where appropriate, and documented access approval.",
      steps: [
        "Confirm the account request and owner.",
        "Check whether the username already exists.",
        "Choose the correct primary group.",
        "Create the account with approved settings.",
        "Set or configure authentication according to policy.",
        "Assign only required supplementary groups.",
        "Verify home directory and shell.",
        "Record the account creation."
      ],
      commands: [
        "sudo useradd -m -s /bin/bash appuser",
        "sudo passwd appuser",
        "sudo usermod -c 'Application Support' appuser",
        "sudo usermod -s /bin/bash appuser",
        "sudo usermod -aG developers appuser",
        "sudo usermod -L appuser",
        "sudo usermod -U appuser",
        "getent passwd appuser"
      ],
      problems: [
        {
          issue: "useradd fails because the username already exists.",
          rootCause: "An account with the same name may already be defined by local files or an identity provider.",
          solution: "Check getent passwd username and confirm whether the existing account is the intended identity."
        },
        {
          issue: "A newly created user cannot log in.",
          rootCause: "The account may be locked, expired, have an invalid shell, or lack valid authentication configuration.",
          solution: "Check passwd -S, chage -l, the account shell, SSH policy, and authentication logs."
        }
      ]
    },
    {
      heading: "4. User Modification, Locking and Deletion",
      explanation: "Account changes must preserve ownership and application dependencies. Locking an account can prevent password-based authentication but does not necessarily terminate existing sessions or disable every authentication method. Removing an account can leave files owned by its numeric UID. Before deletion, identify running processes, scheduled jobs, service dependencies, SSH keys, and owned files. A controlled offboarding process should first revoke access, preserve required data, transfer ownership, and then remove the account according to retention policy.",
      steps: [
        "Confirm the account owner and offboarding approval.",
        "Identify running processes and scheduled tasks.",
        "Review SSH keys and authentication methods.",
        "Lock or disable access using the approved procedure.",
        "Terminate or review existing sessions.",
        "Identify files owned by the account.",
        "Preserve required data and transfer ownership.",
        "Remove the account only after validation."
      ],
      commands: [
        "sudo passwd -l username",
        "sudo passwd -u username",
        "sudo chage -l username",
        "ps -u username -f",
        "pgrep -a -u username",
        "sudo find /home -uid 1005 -ls",
        "sudo userdel username",
        "sudo userdel -r username"
      ],
      problems: [
        {
          issue: "Files show a numeric owner instead of a username after offboarding.",
          rootCause: "The account was removed while files still belonged to its UID.",
          solution: "Identify the numeric owner with find and stat, confirm ownership requirements, and transfer files through an approved process."
        },
        {
          issue: "A locked user still has access through an existing session or another authentication method.",
          rootCause: "Password locking alone does not necessarily terminate active sessions or revoke SSH keys and tokens.",
          solution: "Review active sessions, authorized keys, external identity-provider access, tokens, and running processes. Revoke access comprehensively."
        }
      ]
    },
    {
      heading: "5. Linux Groups and Group Membership",
      explanation: "Groups simplify access management by assigning permissions to a collection of users. A user has a primary group and may belong to multiple supplementary groups. Group-based access is generally easier to maintain than assigning permissions separately to every individual. Administrators should use role-based groups such as developers, operations, and monitoring rather than broad groups with excessive privileges. Group changes may require a new login session before applications recognize the updated membership.",
      steps: [
        "Identify the required access role.",
        "Check existing groups.",
        "Create a group when necessary.",
        "Add approved users to the group.",
        "Verify primary and supplementary groups.",
        "Set appropriate directory group ownership.",
        "Apply group permissions.",
        "Review membership periodically."
      ],
      commands: [
        "getent group",
        "groups username",
        "id username",
        "sudo groupadd developers",
        "sudo usermod -aG developers username",
        "sudo gpasswd -d username developers",
        "sudo groupmod -n engineering developers",
        "sudo groupdel oldgroup"
      ],
      problems: [
        {
          issue: "A user is added to a group but still cannot access a directory.",
          rootCause: "The current login session may not have refreshed supplementary groups, or directory permissions may still deny access.",
          solution: "Start a new session, verify id, inspect ownership and permissions, and check parent-directory traversal."
        },
        {
          issue: "A group cannot be deleted.",
          rootCause: "It may still be the primary group of one or more accounts.",
          solution: "Identify dependent users, migrate their primary group through an approved change, and then retry deletion."
        }
      ]
    },
    {
      heading: "6. Linux File Ownership and Basic Permission Model",
      explanation: "Each Linux filesystem object has an owner user and an associated group. Traditional permissions are divided into user, group, and others. Read permission allows viewing file content or listing a directory. Write permission allows modifying a file or creating and removing entries in a directory, subject to other controls. Execute permission allows executing a file or traversing a directory. Directory execute permission is essential for accessing entries beneath it. Ownership and permission decisions should be based on the application process identity.",
      steps: [
        "Identify the file or directory.",
        "Inspect its owner and group.",
        "Check user, group, and other permission bits.",
        "Inspect parent directory permissions.",
        "Identify the process account.",
        "Choose the required access level.",
        "Apply the approved ownership or permission change.",
        "Test access as the intended user."
      ],
      commands: [
        "ls -l /var/www",
        "ls -ld /var/www/html",
        "stat /var/www/html",
        "namei -l /var/www/html/index.html",
        "chown appuser:developers file.txt",
        "chmod 640 file.txt",
        "chmod 750 /opt/application",
        "sudo -u appuser test -r /var/www/html/index.html"
      ],
      problems: [
        {
          issue: "A user can read a file but cannot access its parent directory.",
          rootCause: "The user lacks execute permission on one of the parent directories.",
          solution: "Use namei -l to inspect every path component and grant the minimum required traversal permission."
        },
        {
          issue: "An application cannot write to a directory even though the file is writable.",
          rootCause: "Creating or removing entries depends on directory permissions, ownership, ACLs, and possibly security policies.",
          solution: "Inspect directory permissions, ACLs, mount options, and the actual service identity."
        }
      ]
    },
    {
      heading: "7. Numeric and Symbolic chmod Permissions",
      explanation: "chmod changes permission bits using symbolic or numeric notation. Numeric permissions use read as 4, write as 2, and execute as 1. The values are added for owner, group, and others. For example, 750 means owner read/write/execute, group read/execute, and others no permissions. Symbolic notation uses categories such as u, g, o, and a with operators +, -, and =. Administrators should avoid broad permissions such as 777 because they grant unnecessary access.",
      steps: [
        "Inspect the current permissions.",
        "Determine the required owner access.",
        "Determine the required group access.",
        "Determine whether others need access.",
        "Calculate numeric permission values.",
        "Apply chmod.",
        "Verify the resulting mode.",
        "Test with the application identity."
      ],
      commands: [
        "chmod 644 file.txt",
        "chmod 600 secret.conf",
        "chmod 640 application.conf",
        "chmod 750 deploy.sh",
        "chmod u+x deploy.sh",
        "chmod g-w file.txt",
        "chmod o-rwx secret.conf",
        "stat -c '%A %a %n' file.txt"
      ],
      problems: [
        {
          issue: "An executable script returns permission denied.",
          rootCause: "The execute bit is missing, filesystem options prevent execution, or directory traversal is denied.",
          solution: "Check chmod permissions, parent directories, mount options, and security policy before making a controlled change."
        },
        {
          issue: "Sensitive configuration files are readable by all users.",
          rootCause: "Permissions are broader than the application's access requirements.",
          solution: "Restrict access to the owner and approved group, verify service access, and audit the file for exposed secrets."
        }
      ]
    },
    {
      heading: "8. chown, chgrp and Recursive Ownership Management",
      explanation: "chown changes file ownership, while chgrp changes group ownership. Ownership management is important for application deployments, shared directories, backups, and service accounts. Recursive changes can affect thousands of files and may break operating system or application behavior when applied to the wrong path. Before recursive ownership changes, identify the exact directory, inspect a sample of files, and confirm the intended owner. Use targeted changes rather than changing ownership of entire system directories.",
      steps: [
        "Identify the exact target path.",
        "Inspect current ownership.",
        "Confirm the intended user and group.",
        "Review symbolic links and mounted filesystems.",
        "Preview affected files where possible.",
        "Apply a targeted ownership change.",
        "Verify representative files.",
        "Test application access."
      ],
      commands: [
        "sudo chown appuser file.txt",
        "sudo chown appuser:developers file.txt",
        "sudo chgrp developers shared.txt",
        "ls -l file.txt",
        "stat file.txt",
        "find /var/www -maxdepth 2 -printf '%u:%g %p\\n'",
        "sudo chown -R appuser:developers /opt/myapp",
        "sudo -u appuser test -r /opt/myapp/config.yml"
      ],
      problems: [
        {
          issue: "A deployment breaks after recursive chown.",
          rootCause: "The command changed ownership of files that require different service or system owners.",
          solution: "Review the change scope, restore expected ownership from configuration management or backup, and use a narrowly scoped deployment path."
        },
        {
          issue: "A file still shows unexpected ownership.",
          rootCause: "The file may be on a mounted filesystem, use an ACL, or be affected by an identity mapping.",
          solution: "Inspect stat, findmnt, numeric UID/GID values, and filesystem-specific ownership behavior."
        }
      ]
    },
    {
      heading: "9. Special Permissions: SUID, SGID and Sticky Bit",
      explanation: "Linux provides special permission bits that alter normal permission behavior. SUID on an executable causes it to run with the file owner's effective UID, subject to system and filesystem rules. SGID on an executable affects its effective group behavior, while SGID on a directory causes new entries to inherit the directory's group on common Linux filesystems. The sticky bit on a shared directory restricts removal of entries to the file owner, directory owner, or privileged user. Special permissions require careful auditing because they can increase privilege.",
      steps: [
        "Identify why special behavior is required.",
        "Inspect existing special bits.",
        "Confirm file ownership and trustworthiness.",
        "Apply only the required special bit.",
        "Verify the displayed permission notation.",
        "Review special-bit files periodically.",
        "Test expected behavior.",
        "Remove unnecessary special bits."
      ],
      commands: [
        "chmod u+s program",
        "chmod g+s shared-directory",
        "chmod +t /shared",
        "chmod 4750 program",
        "chmod 2770 shared-directory",
        "chmod 1777 /shared-temp",
        "find / -type f -perm -4000 2>/dev/null",
        "find / -type f -perm -2000 2>/dev/null"
      ],
      problems: [
        {
          issue: "A shared directory allows users to remove other users' files.",
          rootCause: "The directory lacks appropriate sticky-bit protection.",
          solution: "Review the shared-directory design and apply the sticky bit when that behavior is required."
        },
        {
          issue: "An unexpected privileged executable is discovered.",
          rootCause: "An unnecessary or unauthorized SUID or SGID bit may have been added.",
          solution: "Identify the package and owner, verify whether the bit is required, and remove unauthorized privilege through an approved change."
        }
      ]
    },
    {
      heading: "10. Access Control Lists (ACL)",
      explanation: "Traditional permission bits provide owner, group, and others access. ACLs allow more specific access for additional users and groups. They are useful when several teams need different access to the same directory without changing its primary ownership model. getfacl displays ACL entries and setfacl changes them. A directory default ACL can influence permissions inherited by newly created entries. ACL masks can limit effective permissions, so administrators must inspect the complete ACL rather than only one entry.",
      steps: [
        "Check whether the filesystem supports ACLs.",
        "Inspect the current ACL.",
        "Identify the required user or group access.",
        "Apply a targeted ACL entry.",
        "Review the ACL mask.",
        "Configure default ACLs when required.",
        "Verify effective permissions.",
        "Document and review exceptions."
      ],
      commands: [
        "getfacl /shared/project",
        "setfacl -m u:alice:rw- /shared/project/report.txt",
        "setfacl -m g:developers:rwx /shared/project",
        "setfacl -m d:g:developers:rwx /shared/project",
        "setfacl -x u:alice /shared/project/report.txt",
        "setfacl -b /shared/project/report.txt",
        "getfacl -R /shared/project",
        "mount | grep acl"
      ],
      problems: [
        {
          issue: "A user has an ACL entry but still cannot write.",
          rootCause: "The ACL mask may restrict effective permissions, or a parent directory may deny traversal.",
          solution: "Inspect getfacl output, the mask, and every parent directory. Verify access as the intended user."
        },
        {
          issue: "New files do not inherit the expected group access.",
          rootCause: "The directory may not have the required default ACL, or application creation modes may restrict permissions.",
          solution: "Review default ACLs, SGID directory behavior, umask, and the application's file creation mode."
        }
      ]
    },
    {
      heading: "11. umask and Default Permission Behavior",
      explanation: "umask controls which permission bits are removed from the permissions requested when new files and directories are created. A common umask of 022 normally results in files with 644 and directories with 755 when the application requests the usual 666 and 777 modes. A umask of 027 normally produces more restricted group and other access. Actual results also depend on the application creation mode and filesystem behavior. umask does not directly modify existing files.",
      steps: [
        "Inspect the current umask.",
        "Understand the requested creation mode.",
        "Choose an organization-approved default.",
        "Set umask in the appropriate execution environment.",
        "Create a test file and directory.",
        "Inspect resulting permissions.",
        "Check application-specific overrides.",
        "Document the security standard."
      ],
      commands: [
        "umask",
        "umask -S",
        "umask 022",
        "umask 027",
        "umask 077",
        "touch test-file",
        "mkdir test-directory",
        "stat -c '%a %n' test-file test-directory"
      ],
      problems: [
        {
          issue: "New application files are more accessible than expected.",
          rootCause: "The process umask is too permissive or the application explicitly requests broad modes.",
          solution: "Inspect the process environment and file creation logic, then apply the approved umask and verify actual output."
        },
        {
          issue: "Changing umask does not fix existing files.",
          rootCause: "umask affects newly created objects rather than retroactively changing existing permissions.",
          solution: "Use a controlled permission correction for existing files and validate the intended ownership and mode."
        }
      ]
    },
    {
      heading: "12. sudo and Privileged Access Management",
      explanation: "sudo allows an approved user to execute commands with another user's privileges, commonly root. It supports least privilege when rules are restricted to the required commands and targets. Administrators should avoid giving broad unrestricted sudo access unless explicitly required by policy. sudoers syntax must be validated with visudo, which protects against saving invalid configurations. Privileged activity should be logged and periodically reviewed. Root access should be granted through an approved and auditable process.",
      steps: [
        "Identify the privileged task.",
        "Determine the minimum required command.",
        "Identify the approved user or group.",
        "Configure the sudo policy using visudo.",
        "Validate the syntax.",
        "Test the exact permitted command.",
        "Review sudo logs.",
        "Remove temporary access after its approved period."
      ],
      commands: [
        "sudo -l",
        "sudo whoami",
        "sudo -u appuser whoami",
        "sudo visudo",
        "sudo visudo -c",
        "getent group sudo",
        "getent group wheel",
        "journalctl _COMM=sudo"
      ],
      problems: [
        {
          issue: "A user receives a sudoers syntax error.",
          rootCause: "A rule has invalid syntax or conflicting definitions.",
          solution: "Use visudo, inspect the reported line, correct the rule, and validate with visudo -c."
        },
        {
          issue: "A user can execute more commands than intended.",
          rootCause: "A broad sudo rule or inherited group membership grants excessive privileges.",
          solution: "Review sudo -l and included sudoers files, then narrow access to approved commands and arguments."
        }
      ]
    },
    {
      heading: "13. Password Policies and Account Expiration",
      explanation: "Password and account policies control authentication lifecycle. chage can inspect and configure password aging values for local accounts. PAM modules and distribution-specific security tools may enforce password complexity, history, lockout, and authentication requirements. Account expiration differs from password expiration. Policy changes should be coordinated with identity management and tested to avoid unexpected service-account failures. Service accounts should generally use non-interactive authentication rather than human-style passwords where appropriate.",
      steps: [
        "Identify the account type.",
        "Review the organization's password policy.",
        "Inspect current aging settings.",
        "Configure approved expiration requirements.",
        "Check PAM and distribution-specific policy.",
        "Avoid breaking service authentication.",
        "Test login behavior.",
        "Review expired and inactive accounts."
      ],
      commands: [
        "chage -l username",
        "sudo chage -M 90 username",
        "sudo chage -m 1 username",
        "sudo chage -W 14 username",
        "sudo chage -E 2027-01-31 username",
        "passwd -S username",
        "grep -E 'PASS_MAX_DAYS|PASS_MIN_DAYS' /etc/login.defs",
        "faillock --user username"
      ],
      problems: [
        {
          issue: "A user cannot authenticate because the password expired.",
          rootCause: "Password aging policy requires a password change.",
          solution: "Verify chage -l and account policy, then follow the approved password-reset process."
        },
        {
          issue: "An application service stops authenticating after a password policy change.",
          rootCause: "A service account depends on an authentication method or credential that was changed or expired.",
          solution: "Identify the service dependency, coordinate a controlled credential rotation, and validate service authentication."
        }
      ]
    },
    {
      heading: "14. SSH Authentication and Authorized Keys",
      explanation: "SSH provides encrypted remote access to Linux servers. Authentication can use passwords, public keys, certificates, or centrally managed identities. authorized_keys defines public keys permitted for a user's account. Private keys must remain protected on the client side. SSH server configuration controls authentication methods, root login, allowed users, and other access policies. Changes should be tested carefully because incorrect SSH configuration can lock administrators out. Keep an existing administrative session open while testing a second session after configuration changes.",
      steps: [
        "Identify approved remote users.",
        "Review the SSH server configuration.",
        "Use approved key-based authentication where appropriate.",
        "Protect private keys and authorized_keys.",
        "Restrict root and unnecessary remote access.",
        "Validate sshd configuration syntax.",
        "Reload or restart SSH carefully.",
        "Test a second connection before closing the existing session."
      ],
      commands: [
        "ssh -V",
        "sudo sshd -t",
        "sudo sshd -T",
        "ls -ld ~/.ssh",
        "ls -l ~/.ssh/authorized_keys",
        "chmod 700 ~/.ssh",
        "chmod 600 ~/.ssh/authorized_keys",
        "ssh -v user@server"
      ],
      problems: [
        {
          issue: "SSH authentication fails with public-key authentication.",
          rootCause: "Incorrect key, file permissions, account ownership, SSH configuration, or server-side authorization policy.",
          solution: "Inspect client verbose output, authorized_keys ownership and modes, sshd settings, and server authentication logs."
        },
        {
          issue: "An SSH configuration change prevents new connections.",
          rootCause: "A syntax error, incorrect authentication setting, or access restriction blocks login.",
          solution: "Use the existing session to validate sshd -t, correct the configuration, reload safely, and test a second session before closing the first."
        }
      ]
    },
    {
      heading: "15. Service Accounts and Application Permissions",
      explanation: "Applications should run under dedicated service accounts rather than a shared administrator identity. A service account should have only the permissions required to read configuration, write application data, and access approved resources. Non-interactive shells and restricted home directories can reduce unnecessary access. systemd unit files can specify User and Group to define the process identity. File ownership, secret access, log permissions, and runtime directories must match the service identity.",
      steps: [
        "Identify the application process.",
        "Create or select a dedicated service account.",
        "Choose a restricted login shell where appropriate.",
        "Set application directory ownership.",
        "Grant access only to required configuration and data.",
        "Configure the service identity.",
        "Verify runtime file access.",
        "Review service permissions periodically."
      ],
      commands: [
        "sudo useradd -r -s /usr/sbin/nologin appsvc",
        "id appsvc",
        "ps -eo user,pid,cmd",
        "systemctl cat myapp",
        "systemctl show myapp -p User -p Group",
        "sudo -u appsvc test -r /opt/myapp/config.yml",
        "sudo -u appsvc test -w /var/lib/myapp",
        "journalctl -u myapp"
      ],
      problems: [
        {
          issue: "An application fails after changing its service user.",
          rootCause: "The new identity lacks access to configuration, runtime directories, logs, sockets, or required data.",
          solution: "Inspect the service unit, process identity, file ownership, ACLs, and application logs. Grant only the required access."
        },
        {
          issue: "An application runs as root unnecessarily.",
          rootCause: "The service was configured without a dedicated least-privilege identity.",
          solution: "Identify required capabilities and resources, configure a dedicated service account, and test the application before production rollout."
        }
      ]
    },
    {
      heading: "16. Troubleshooting Permission Denied Errors",
      explanation: "Permission denied errors can originate from traditional mode bits, ownership, ACLs, parent directory traversal, SELinux, AppArmor, read-only mounts, or application security controls. Troubleshooting should start with the exact process identity and target path. namei -l reveals permissions along a path. getfacl reveals extended ACL entries. mount and findmnt reveal filesystem options. Security logs may identify policy denials. Avoid solving permission errors by applying broad 777 permissions because that creates security exposure and hides the actual cause.",
      steps: [
        "Capture the exact error and affected path.",
        "Identify the process user and group.",
        "Inspect ownership and permission bits.",
        "Check parent directory traversal.",
        "Inspect ACL entries and masks.",
        "Check mount options and filesystem state.",
        "Review SELinux or AppArmor denials.",
        "Apply the narrowest corrective change."
      ],
      commands: [
        "id appuser",
        "namei -l /opt/myapp/config.yml",
        "stat /opt/myapp/config.yml",
        "getfacl /opt/myapp/config.yml",
        "findmnt /opt/myapp",
        "sudo ausearch -m AVC -ts recent",
        "journalctl -k",
        "sudo -u appuser test -r /opt/myapp/config.yml"
      ],
      problems: [
        {
          issue: "An application receives permission denied despite apparently correct mode bits.",
          rootCause: "An ACL mask, parent directory, SELinux, AppArmor, or mount policy may deny access.",
          solution: "Inspect the complete access path and security logs. Correct the specific policy rather than broadening all permissions."
        },
        {
          issue: "A script works as root but fails as its service account.",
          rootCause: "Root has privileges that the service account does not possess.",
          solution: "Run the test as the service account and identify each missing resource permission or required capability."
        }
      ]
    },
    {
      heading: "17. User Auditing, Monitoring and Access Reviews",
      explanation: "Access auditing helps organizations identify stale accounts, excessive privileges, unexpected login activity, and configuration drift. Administrators can review account databases, group membership, sudo privileges, login history, authentication failures, and privileged file permissions. Centralized identity and logging platforms improve visibility across servers. Access reviews should be tied to account ownership and business purpose. Monitoring should alert on suspicious changes while avoiding excessive noise.",
      steps: [
        "List local and resolved accounts.",
        "Review interactive and service identities.",
        "Identify users with privileged group membership.",
        "Review sudo permissions.",
        "Inspect recent login history.",
        "Review authentication failures.",
        "Identify stale and expired accounts.",
        "Document remediation and approval."
      ],
      commands: [
        "getent passwd",
        "getent group sudo",
        "getent group wheel",
        "sudo -l -U username",
        "last -a",
        "lastb",
        "lastlog",
        "journalctl -u ssh"
      ],
      problems: [
        {
          issue: "An inactive account remains enabled for months.",
          rootCause: "No ownership, expiration, or periodic access-review process exists.",
          solution: "Identify the owner, validate business need, disable unused access through approval, and record the review."
        },
        {
          issue: "Unexpected privileged group membership is discovered.",
          rootCause: "An unauthorized or undocumented group change occurred.",
          solution: "Review audit records, identify the change source, validate the business requirement, and remediate through change control."
        }
      ]
    },
    {
      heading: "18. Production Access Management and Incident Response",
      explanation: "Production access management requires a controlled process for onboarding, role changes, emergency access, and offboarding. Access should be granted for a documented business purpose and limited to the required duration. Privileged operations should be auditable. During an access incident, preserve logs, identify affected identities, revoke compromised credentials, and verify application continuity. Emergency access should be documented and reviewed afterward. Avoid making untracked permission changes during an incident.",
      steps: [
        "Identify the incident and affected identities.",
        "Preserve authentication and audit logs.",
        "Determine the scope of access exposure.",
        "Obtain incident authorization.",
        "Revoke compromised keys or credentials.",
        "Review active sessions and privileged processes.",
        "Restore approved access boundaries.",
        "Document evidence and post-incident actions."
      ],
      commands: [
        "last -a",
        "lastb",
        "sudo -l -U username",
        "journalctl --since '1 hour ago'",
        "journalctl -u ssh --since today",
        "sudo passwd -l username",
        "sudo ss -tnp",
        "sudo ausearch -m USER_AUTH -ts recent"
      ],
      problems: [
        {
          issue: "A compromised user account continues to access production.",
          rootCause: "Only the password was changed while SSH keys, sessions, tokens, or external identity access remained active.",
          solution: "Follow incident response procedures to revoke all authentication paths, review active sessions, rotate affected secrets, and preserve evidence."
        },
        {
          issue: "Emergency access changes are not traceable.",
          rootCause: "Incident procedures did not require change records or post-incident review.",
          solution: "Record the approver, operator, time, commands, and scope. Perform a post-incident access review and remove temporary privileges."
        }
      ]
    },
    {
      heading: "19. Real-Time Production Project: Role-Based Linux Access",
      explanation: "Consider a production environment with developers, operations engineers, monitoring agents, and application services. Developers require access to selected deployment artifacts but not unrestricted server administration. Operations engineers require approved service-management permissions. Monitoring agents need read-only access to selected metrics. Applications run under dedicated service accounts. The design uses Linux groups, directory ownership, ACLs where necessary, sudo policy, SSH authentication, and periodic reviews. All access changes are documented and tested using the intended account.",
      steps: [
        "Create role-based groups for approved teams.",
        "Create or map individual user identities.",
        "Create a shared project directory with controlled ownership.",
        "Apply group permissions and SGID where required.",
        "Use ACLs for narrowly scoped exceptions.",
        "Configure restricted sudo permissions.",
        "Run applications under dedicated service identities.",
        "Configure approved SSH authentication.",
        "Test access for every role.",
        "Review logs and periodically recertify access."
      ],
      commands: [
        "sudo groupadd developers",
        "sudo groupadd operations",
        "sudo groupadd monitoring",
        "sudo mkdir -p /srv/projects",
        "sudo chown root:developers /srv/projects",
        "sudo chmod 2770 /srv/projects",
        "sudo usermod -aG developers alice",
        "getfacl /srv/projects",
        "sudo visudo -c",
        "id alice"
      ],
      problems: [
        {
          issue: "Developers can modify files outside their assigned project directory.",
          rootCause: "Group membership or directory permissions grant access beyond the intended scope.",
          solution: "Review all parent directories, shared groups, ACLs, and inherited permissions. Restrict access to approved project paths."
        },
        {
          issue: "Monitoring agents cannot read required metrics.",
          rootCause: "The service account lacks read access to selected metrics or runtime endpoints.",
          solution: "Identify the exact resources, create narrow read-only permissions, and validate access using the monitoring identity."
        }
      ]
    },
    {
      heading: "20. Linux Users and Permissions Interview Questions and Answers",
      explanation: "Linux access-management interviews cover identity databases, user lifecycle, groups, permissions, ownership, special bits, ACLs, umask, sudo, SSH, service identities, and security auditing. Strong answers explain how permissions are calculated, how to troubleshoot access failures, and how least privilege is enforced in production.",
      steps: [
        "Explain Linux UID and GID.",
        "Describe user and group management.",
        "Explain numeric and symbolic permissions.",
        "Demonstrate ownership and ACL troubleshooting.",
        "Describe sudo and SSH security.",
        "Explain service account design.",
        "Discuss auditing and offboarding.",
        "Connect the concepts to production access control."
      ],
      commands: [
        "id username",
        "getent passwd username",
        "groups username",
        "ls -l",
        "chmod 640 file",
        "chown user:group file",
        "getfacl file",
        "sudo -l"
      ],
      interviewQuestions: [
        {
          question: "1. What is a Linux user?",
          answer: "A Linux user is an identity used to authenticate and control access to system resources. Each user is associated with a UID."
        },
        {
          question: "2. What is UID?",
          answer: "UID stands for User Identifier. Linux uses it internally to identify user accounts."
        },
        {
          question: "3. What is GID?",
          answer: "GID stands for Group Identifier. It identifies a Linux group used for organizing permissions."
        },
        {
          question: "4. What is the purpose of /etc/passwd?",
          answer: "It contains local account information such as username, UID, primary GID, home directory, and login shell."
        },
        {
          question: "5. What is /etc/shadow?",
          answer: "It stores protected password-related information and account aging data for local accounts."
        },
        {
          question: "6. How do you create a Linux user?",
          answer: "I use useradd with appropriate options, such as useradd -m -s /bin/bash username, and configure authentication according to policy."
        },
        {
          question: "7. How do you create a group?",
          answer: "I use groupadd groupname and verify it with getent group groupname."
        },
        {
          question: "8. How do you add a user to a supplementary group?",
          answer: "I use usermod -aG groupname username. The -a option preserves existing supplementary memberships."
        },
        {
          question: "9. What is the difference between a primary and supplementary group?",
          answer: "The primary group is the account's default group identity. Supplementary groups provide additional group-based access."
        },
        {
          question: "10. What are Linux file permissions?",
          answer: "Linux permissions define read, write, and execute access for the file owner, group, and others."
        },
        {
          question: "11. Explain chmod 755.",
          answer: "The owner has read, write, and execute permissions. The group and others have read and execute permissions."
        },
        {
          question: "12. Explain chmod 644.",
          answer: "The owner has read and write permissions, while the group and others have read-only permissions."
        },
        {
          question: "13. What is the difference between chmod and chown?",
          answer: "chmod changes permission bits. chown changes file ownership and can also change group ownership."
        },
        {
          question: "14. What is the purpose of chgrp?",
          answer: "chgrp changes the group ownership of files and directories."
        },
        {
          question: "15. What is umask?",
          answer: "umask controls which permission bits are removed from the permissions requested when new files and directories are created."
        },
        {
          question: "16. What is SUID?",
          answer: "SUID is a special permission that causes an executable to run with the file owner's effective UID, subject to system rules."
        },
        {
          question: "17. What is SGID?",
          answer: "SGID affects executable group identity and causes new entries in an SGID directory to inherit the directory's group on common Linux filesystems."
        },
        {
          question: "18. What is the sticky bit?",
          answer: "The sticky bit on a shared directory restricts removal of entries to the file owner, directory owner, or privileged user."
        },
        {
          question: "19. What is an ACL?",
          answer: "An Access Control List provides more granular permissions for specific users and groups beyond traditional owner, group, and others bits."
        },
        {
          question: "20. Which commands are used to manage ACLs?",
          answer: "getfacl displays ACL entries and setfacl creates, modifies, or removes ACL entries."
        },
        {
          question: "21. What is sudo?",
          answer: "sudo allows an approved user to execute commands with another user's privileges, commonly root, according to sudoers policy."
        },
        {
          question: "22. Why should you use visudo?",
          answer: "visudo safely edits sudoers configuration and validates syntax before saving changes."
        },
        {
          question: "23. How do you check a user's sudo permissions?",
          answer: "I use sudo -l -U username as an administrator or sudo -l from the user's own session."
        },
        {
          question: "24. What is the difference between locking a password and disabling all access?",
          answer: "Password locking affects password authentication but may not revoke SSH keys, active sessions, external tokens, or other authentication methods."
        },
        {
          question: "25. How do you check password expiration?",
          answer: "I use chage -l username to inspect password aging and account expiration information."
        },
        {
          question: "26. What is a service account?",
          answer: "A service account is a dedicated identity used by an application or background service. It should have only the permissions required to operate."
        },
        {
          question: "27. How do you troubleshoot permission denied errors?",
          answer: "I identify the process user, inspect ownership and mode bits, check parent directories using namei, inspect ACLs, and review security and mount policies."
        },
        {
          question: "28. Why is chmod 777 not recommended?",
          answer: "It grants read, write, and execute permissions to everyone, increasing the risk of unauthorized modification and execution."
        },
        {
          question: "29. How do you audit Linux user access?",
          answer: "I review account records, group memberships, sudo rules, login history, authentication logs, special permissions, and stale accounts."
        },
        {
          question: "30. Explain a production Linux access-management project.",
          answer: "I would create role-based groups, assign individual identities, apply controlled directory permissions and ACLs, configure restricted sudo access, use dedicated service accounts, secure SSH authentication, and audit access regularly."
        }
      ]
    }
  ]
};

export default data;
