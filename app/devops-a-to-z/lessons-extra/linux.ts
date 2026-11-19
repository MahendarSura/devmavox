import type { AtoZLesson } from "../lessons";

// Complete topic-specific Linux lessons for the DevOps A–Z Telugu learning library.
export const linuxAtoZLessons: Record<string, AtoZLesson> = {
  "linux/users-and-groups": {
    "summary": "Users and Groups gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Linux lo user accounts individual identity ni, groups shared permissions ni represent chesthayi. User ID (UID), Group ID (GID), primary group and supplementary groups important.",
    "diagram": {
      "title": "Users and Groups workflow",
      "nodes": [
        "User/group database",
        "authentication",
        "group membership",
        "file/service permission check"
      ],
      "explanation": "Users and Groups process ni layer-by-layer ardham chesukovali: User/group database → authentication → group membership → file/service permission check."
    },
    "sections": [
      {
        "heading": "1. Users and Groups ante enti?",
        "paragraphs": [
          "Linux lo user accounts individual identity ni, groups shared permissions ni represent chesthayi. User ID (UID), Group ID (GID), primary group and supplementary groups important.",
          "Linux user accounts assign UID-based identities, while groups provide shared authorization for files and services; service accounts keep Jenkins and deployment automation separate from human logins."
        ],
        "bullets": [
          "UID identifies user",
          "GID identifies group",
          "/etc/passwd user metadata",
          "/etc/shadow password hashes",
          "/etc/group group membership."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Access ni person-wise and team-wise control cheyadaniki; Jenkins, deploy and monitoring service accounts ni separate cheyadaniki.",
          "A process starts with a UID and group list; the kernel compares those credentials with inode ownership and mode bits before allowing file access."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: User/group database → authentication → group membership → file/service permission check. A process starts with a UID and group list; the kernel compares those credentials with inode ownership and mode bits before allowing file access.",
          "UID, primary GID, supplementary groups, /etc/passwd, /etc/shadow and /etc/group describe identity and membership; NSS may also resolve directory-backed accounts."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "UID, primary GID, supplementary groups, /etc/passwd, /etc/shadow and /etc/group describe identity and membership; NSS may also resolve directory-backed accounts."
        ],
        "bullets": [
          "UID identifies user",
          "GID identifies group",
          "/etc/passwd user metadata",
          "/etc/shadow password hashes",
          "/etc/group group membership."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Use id and getent to inspect the effective identity and account database; after usermod -aG, start a new login session and verify id deployer."
        ],
        "code": "id; whoami; getent passwd; getent group; sudo useradd -m deployer; sudo passwd deployer; sudo groupadd developers; sudo usermod -aG developers deployer",
        "note": "Duplicate UID, missing home directory, or usermod without -a can cause access problems. Verify with id deployer; never share personal accounts."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Production lo deployer user ni create chesi developers group lo add chestham; shared deployment directory ki group access istham.",
          "Create a deployer account in a disposable VM, grant membership in only the approved deployment group, and prove that unrelated users cannot read its protected files."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Duplicate UID, missing home directory, or usermod without -a can cause access problems. Verify with id deployer; never share personal accounts.",
          "Create a deployer account in a disposable VM, grant membership in only the approved deployment group, and prove that unrelated users cannot read its protected files."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use least privilege, disable unused accounts, prefer sudo audit trails, and avoid direct root SSH login.",
          "Create a deployer account in a disposable VM, grant membership in only the approved deployment group, and prove that unrelated users cannot read its protected files."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "UID, primary GID, supplementary groups, /etc/passwd, /etc/shadow and /etc/group describe identity and membership; NSS may also resolve directory-backed accounts."
        ],
        "bullets": [
          "Question: What is Users and Groups in Linux?",
          "Answer: Linux lo user accounts individual identity ni, groups shared permissions ni represent chesthayi. User ID (UID), Group ID (GID), primary group and supplementary groups important. Access ni person-wise and team-wise control cheyadaniki; Jenkins, deploy and monitoring service accounts ni separate cheyadaniki.",
          "Question: How do you troubleshoot Users and Groups?",
          "Answer: Duplicate UID, missing home directory, or usermod without -a can cause access problems. Verify with id deployer; never share personal accounts. Use least privilege, disable unused accounts, prefer sudo audit trails, and avoid direct root SSH login."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "A new engineer needs read access to deployment logs but must not restart services. Create a named account, add only to approved read-only group, test effective access.",
          "Use id and getent to inspect the effective identity and account database; after usermod -aG, start a new login session and verify id deployer.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Users and Groups?",
        "answer": "Linux lo user accounts individual identity ni, groups shared permissions ni represent chesthayi. User ID (UID), Group ID (GID), primary group and supplementary groups important. Access ni person-wise and team-wise control cheyadaniki; Jenkins, deploy and monitoring service accounts ni separate cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Users and Groups in production?",
        "answer": "Production lo deployer user ni create chesi developers group lo add chestham; shared deployment directory ki group access istham. Duplicate UID, missing home directory, or usermod without -a can cause access problems. Verify with id deployer; never share personal accounts. Use least privilege, disable unused accounts, prefer sudo audit trails, and avoid direct root SSH login."
      }
    ],
    "handsOn": [
      "A new engineer needs read access to deployment logs but must not restart services. Create a named account, add only to approved read-only group, test effective access.",
      "Use id, getent and groups to verify the effective account identity and group membership.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/file-permissions": {
    "summary": "File Permissions gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Linux file permissions read (r), write (w), execute (x) ni owner, group, others ki separately set chesthayi. Directory execute permission ante traverse/search permission.",
    "diagram": {
      "title": "File Permissions workflow",
      "nodes": [
        "Process user/group identity",
        "inode permission bits",
        "access decision"
      ],
      "explanation": "File Permissions process ni layer-by-layer ardham chesukovali: Process user/group identity → inode permission bits → access decision."
    },
    "sections": [
      {
        "heading": "1. File Permissions ante enti?",
        "paragraphs": [
          "Linux file permissions read (r), write (w), execute (x) ni owner, group, others ki separately set chesthayi. Directory execute permission ante traverse/search permission.",
          "Linux permission bits decide whether the file owner, owning group and other users may read, write or execute a file; directory execute means traverse/search."
        ],
        "bullets": [
          "r=4, w=2, x=1",
          "owner/group/others",
          "symbolic mode",
          "octal mode",
          "umask default permission mask."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Sensitive files protect cheyadaniki and scripts/services ki minimum required access ivvadaniki.",
          "The kernel checks the process credentials against owner/group/other mode bits, then considers ACLs and mandatory access controls where enabled."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Process user/group identity → inode permission bits → access decision. The kernel checks the process credentials against owner/group/other mode bits, then considers ACLs and mandatory access controls where enabled.",
          "r=4, w=2 and x=1 form octal modes; umask removes default permission bits, while setuid, setgid and sticky bits add special behavior."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "r=4, w=2 and x=1 form octal modes; umask removes default permission bits, while setuid, setgid and sticky bits add special behavior."
        ],
        "bullets": [
          "r=4, w=2, x=1",
          "owner/group/others",
          "symbolic mode",
          "octal mode",
          "umask default permission mask."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Use stat and namei -l to inspect mode bits and every parent directory; choose chmod 640 for a private config rather than broad world access."
        ],
        "code": "ls -l; stat app.sh; chmod 640 config.yml; chmod u+x deploy.sh; chmod 750 deploy.sh; umask",
        "note": "chmod 777 quick fix kaadu; directory execute permission miss aithe file kanipinchina access fail avvachu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Application config file ni owner read/write, approved group read, others no access laga set chestham.",
          "Create a test config and script, apply 640 and 750 modes, then verify allowed and denied access as both owner and an unprivileged user."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "chmod 777 quick fix kaadu; directory execute permission miss aithe file kanipinchina access fail avvachu.",
          "Create a test config and script, apply 640 and 750 modes, then verify allowed and denied access as both owner and an unprivileged user."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Secrets files ki 600 or stricter, directories ki appropriate 700/750, service account ownership verify cheyyali.",
          "Create a test config and script, apply 640 and 750 modes, then verify allowed and denied access as both owner and an unprivileged user."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "r=4, w=2 and x=1 form octal modes; umask removes default permission bits, while setuid, setgid and sticky bits add special behavior."
        ],
        "bullets": [
          "Question: What is File Permissions in Linux?",
          "Answer: Linux file permissions read (r), write (w), execute (x) ni owner, group, others ki separately set chesthayi. Directory execute permission ante traverse/search permission. Sensitive files protect cheyadaniki and scripts/services ki minimum required access ivvadaniki.",
          "Question: How do you troubleshoot File Permissions?",
          "Answer: chmod 777 quick fix kaadu; directory execute permission miss aithe file kanipinchina access fail avvachu. Secrets files ki 600 or stricter, directories ki appropriate 700/750, service account ownership verify cheyyali."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Create a file, set 640, test access as owner, group member and unrelated user in a disposable VM.",
          "Use stat and namei -l to inspect mode bits and every parent directory; choose chmod 640 for a private config rather than broad world access.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is File Permissions?",
        "answer": "Linux file permissions read (r), write (w), execute (x) ni owner, group, others ki separately set chesthayi. Directory execute permission ante traverse/search permission. Sensitive files protect cheyadaniki and scripts/services ki minimum required access ivvadaniki."
      },
      {
        "question": "How do you use and troubleshoot File Permissions in production?",
        "answer": "Application config file ni owner read/write, approved group read, others no access laga set chestham. chmod 777 quick fix kaadu; directory execute permission miss aithe file kanipinchina access fail avvachu. Secrets files ki 600 or stricter, directories ki appropriate 700/750, service account ownership verify cheyyali."
      }
    ],
    "handsOn": [
      "Create a file, set 640, test access as owner, group member and unrelated user in a disposable VM.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/ownership-and-acl": {
    "summary": "Ownership and ACL gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Ownership lo each file ki user owner and group owner untaru. POSIX ACL standard owner/group/other bits kanna granular user/group permissions ivvagaladu.",
    "diagram": {
      "title": "Ownership and ACL workflow",
      "nodes": [
        "Filesystem inode ownership",
        "mode bits",
        "ACL evaluation"
      ],
      "explanation": "Ownership and ACL process ni layer-by-layer ardham chesukovali: Filesystem inode ownership → mode bits → ACL evaluation."
    },
    "sections": [
      {
        "heading": "1. Ownership and ACL ante enti?",
        "paragraphs": [
          "Ownership lo each file ki user owner and group owner untaru. POSIX ACL standard owner/group/other bits kanna granular user/group permissions ivvagaladu.",
          "Ownership maps each inode to a user and group; POSIX ACLs add named-user and named-group permissions when basic owner/group/other bits are insufficient."
        ],
        "bullets": [
          "chown changes owner",
          "chgrp changes group",
          "ACL named user/group entries",
          "mask limits effective group-class ACL rights",
          "default ACL inherited by new children."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Shared team directory lo file owner change cheyakunda multiple teams ki controlled access ivvadaniki.",
          "The filesystem evaluates owner, matching named-user ACL, matching group entries and other permissions; the ACL mask limits effective named-user and group rights."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Filesystem inode ownership → mode bits → ACL evaluation. The filesystem evaluates owner, matching named-user ACL, matching group entries and other permissions; the ACL mask limits effective named-user and group rights.",
          "chown changes ownership, chgrp changes group, getfacl reads ACL entries, setfacl modifies them, and the ACL mask caps effective permissions."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "chown changes ownership, chgrp changes group, getfacl reads ACL entries, setfacl modifies them, and the ACL mask caps effective permissions."
        ],
        "bullets": [
          "chown changes owner",
          "chgrp changes group",
          "ACL named user/group entries",
          "mask limits effective group-class ACL rights",
          "default ACL inherited by new children."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands Ownership and ACL ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "ls -l; chown deployer:developers app.log; chgrp developers shared/; getfacl shared/; setfacl -m u:auditor:rx shared/; getfacl -R shared/",
        "note": "ACL mask valla configured permission effective ga reduce avvachu; recursive ACL changes wide impact create chesthayi."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Application service owns logs; operations group ki write, auditor user ki read-only ACL grant chestham.",
          "Give a read-only deployment auditor access to one log directory with a named ACL, then confirm that write access remains denied."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "ACL mask valla configured permission effective ga reduce avvachu; recursive ACL changes wide impact create chesthayi.",
          "Give a read-only deployment auditor access to one log directory with a named ACL, then confirm that write access remains denied."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Grant only required ACL entries, review with getfacl, document default ACLs, avoid broad recursive chown in production.",
          "Give a read-only deployment auditor access to one log directory with a named ACL, then confirm that write access remains denied."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "chown changes ownership, chgrp changes group, getfacl reads ACL entries, setfacl modifies them, and the ACL mask caps effective permissions."
        ],
        "bullets": [
          "Question: What is Ownership and ACL in Linux?",
          "Answer: Ownership lo each file ki user owner and group owner untaru. POSIX ACL standard owner/group/other bits kanna granular user/group permissions ivvagaladu. Shared team directory lo file owner change cheyakunda multiple teams ki controlled access ivvadaniki.",
          "Question: How do you troubleshoot Ownership and ACL?",
          "Answer: ACL mask valla configured permission effective ga reduce avvachu; recursive ACL changes wide impact create chesthayi. Grant only required ACL entries, review with getfacl, document default ACLs, avoid broad recursive chown in production."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Create shared directory; grant one named user read-only ACL; verify getfacl and test as that user.",
          "Inspect with ls -l and getfacl; after setfacl, read the effective rights shown by getfacl and verify access as the target account.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Ownership and ACL?",
        "answer": "Ownership lo each file ki user owner and group owner untaru. POSIX ACL standard owner/group/other bits kanna granular user/group permissions ivvagaladu. Shared team directory lo file owner change cheyakunda multiple teams ki controlled access ivvadaniki."
      },
      {
        "question": "How do you use and troubleshoot Ownership and ACL in production?",
        "answer": "Application service owns logs; operations group ki write, auditor user ki read-only ACL grant chestham. ACL mask valla configured permission effective ga reduce avvachu; recursive ACL changes wide impact create chesthayi. Grant only required ACL entries, review with getfacl, document default ACLs, avoid broad recursive chown in production."
      }
    ],
    "handsOn": [
      "Create shared directory; grant one named user read-only ACL; verify getfacl and test as that user.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/linux-commands": {
    "summary": "Linux Commands gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Linux commands shell dwara files, processes, storage, networking and services ni inspect/manage chesthayi. Command options and exit codes automation lo critical.",
    "diagram": {
      "title": "Linux Commands workflow",
      "nodes": [
        "Shell parses command",
        "executable receives arguments",
        "kernel operations",
        "stdout/stderr and exit status"
      ],
      "explanation": "Linux Commands process ni layer-by-layer ardham chesukovali: Shell parses command → executable receives arguments → kernel operations → stdout/stderr and exit status."
    },
    "sections": [
      {
        "heading": "1. Linux Commands ante enti?",
        "paragraphs": [
          "Linux commands shell dwara files, processes, storage, networking and services ni inspect/manage chesthayi. Command options and exit codes automation lo critical.",
          "Linux commands are small programs that inspect or change system state; combining them lets an operator answer operational questions quickly."
        ],
        "bullets": [
          "absolute/relative path",
          "option",
          "argument",
          "stdin/stdout/stderr",
          "exit code",
          "man page",
          "command substitution."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Daily administration, incident triage and repeatable automation kosam.",
          "The shell parses a command line, resolves built-ins or executables through PATH, expands arguments, starts processes and reports exit status."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Shell parses command → executable receives arguments → kernel operations → stdout/stderr and exit status. The shell parses a command line, resolves built-ins or executables through PATH, expands arguments, starts processes and reports exit status.",
          "PATH, environment variables, arguments, stdin, stdout, stderr, exit status and manual pages are the core vocabulary for reliable command use."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "PATH, environment variables, arguments, stdin, stdout, stderr, exit status and manual pages are the core vocabulary for reliable command use."
        ],
        "bullets": [
          "absolute/relative path",
          "option",
          "argument",
          "stdin/stdout/stderr",
          "exit code",
          "man page",
          "command substitution."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Use command -v to locate a program, type to identify aliases or built-ins, and man or --help to confirm flags before running privileged commands."
        ],
        "code": "pwd; ls -lah; find /var/log -type f; df -h; free -h; ps aux; systemctl status ssh; echo $?",
        "note": "Destructive commands like rm, dd and find -delete ni path verify cheyakunda run cheyyakudadhu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Incident start lo hostname, uptime, disk, memory and failed services collect chesi evidence bundle prepare chestham.",
          "Collect hostname, uptime, disk and memory evidence from a test VM and save the output with timestamps for an incident record."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Destructive commands like rm, dd and find -delete ni path verify cheyakunda run cheyyakudadhu.",
          "Collect hostname, uptime, disk and memory evidence from a test VM and save the output with timestamps for an incident record."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Prefer read-only diagnostics first, quote paths, use sudo only when needed, and capture command output with timestamps.",
          "Collect hostname, uptime, disk and memory evidence from a test VM and save the output with timestamps for an incident record."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "PATH, environment variables, arguments, stdin, stdout, stderr, exit status and manual pages are the core vocabulary for reliable command use."
        ],
        "bullets": [
          "Question: What is Linux Commands in Linux?",
          "Answer: Linux commands shell dwara files, processes, storage, networking and services ni inspect/manage chesthayi. Command options and exit codes automation lo critical. Daily administration, incident triage and repeatable automation kosam.",
          "Question: How do you troubleshoot Linux Commands?",
          "Answer: Destructive commands like rm, dd and find -delete ni path verify cheyakunda run cheyyakudadhu. Prefer read-only diagnostics first, quote paths, use sudo only when needed, and capture command output with timestamps."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Run five read-only commands on a test VM and write what each output tells about the host.",
          "Use command -v to locate a program, type to identify aliases or built-ins, and man or --help to confirm flags before running privileged commands.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Linux Commands?",
        "answer": "Linux commands shell dwara files, processes, storage, networking and services ni inspect/manage chesthayi. Command options and exit codes automation lo critical. Daily administration, incident triage and repeatable automation kosam."
      },
      {
        "question": "How do you use and troubleshoot Linux Commands in production?",
        "answer": "Incident start lo hostname, uptime, disk, memory and failed services collect chesi evidence bundle prepare chestham. Destructive commands like rm, dd and find -delete ni path verify cheyakunda run cheyyakudadhu. Prefer read-only diagnostics first, quote paths, use sudo only when needed, and capture command output with timestamps."
      }
    ],
    "handsOn": [
      "Run five read-only commands on a test VM and write what each output tells about the host.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/text-processing": {
    "summary": "Text Processing gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Text processing tools logs and configuration files nundi relevant lines, columns and patterns extract, transform and summarize chesthayi.",
    "diagram": {
      "title": "Text Processing workflow",
      "nodes": [
        "Input stream/file",
        "filter or transform utility",
        "stdout/file",
        "next analysis step"
      ],
      "explanation": "Text Processing process ni layer-by-layer ardham chesukovali: Input stream/file → filter or transform utility → stdout/file → next analysis step."
    },
    "sections": [
      {
        "heading": "1. Text Processing ante enti?",
        "paragraphs": [
          "Text processing tools logs and configuration files nundi relevant lines, columns and patterns extract, transform and summarize chesthayi.",
          "Text-processing tools transform logs and configuration output into focused evidence without manually opening every line."
        ],
        "bullets": [
          "head/tail preview",
          "cut delimiter fields",
          "sort ordering",
          "uniq adjacent duplicates",
          "wc counts",
          "tr character mapping."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Large logs lo error pattern identify cheyadaniki and CI output analyze cheyadaniki.",
          "A pipeline sends one process's stdout to the next process's stdin; filters select, transform, count or format records while preserving the original source file."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Input stream/file → filter or transform utility → stdout/file → next analysis step. A pipeline sends one process's stdout to the next process's stdin; filters select, transform, count or format records while preserving the original source file.",
          "cut selects fields, sort orders records, uniq counts adjacent duplicates, wc counts lines/bytes, tr translates characters and column formats output."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "cut selects fields, sort orders records, uniq counts adjacent duplicates, wc counts lines/bytes, tr translates characters and column formats output."
        ],
        "bullets": [
          "head/tail preview",
          "cut delimiter fields",
          "sort ordering",
          "uniq adjacent duplicates",
          "wc counts",
          "tr character mapping."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Use journalctl -u nginx --since today | grep -i error to filter service logs; add timestamps and avoid destructive in-place edits until a backup exists."
        ],
        "code": "head -n 20 app.log; tail -f app.log; cut -d' ' -f1 access.log; sort names.txt; uniq -c; wc -l app.log; tr '[:lower:]' '[:upper:]' < input.txt",
        "note": "uniq mundu sort cheyyakapothe non-adjacent duplicates count miss avuthayi; delimiter assumptions validate cheyyali."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Nginx access log lo request counts extract chesi top endpoints identify chestham.",
          "Extract the most frequent HTTP status codes from a sample access log and compare the counts with the monitoring dashboard."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "uniq mundu sort cheyyakapothe non-adjacent duplicates count miss avuthayi; delimiter assumptions validate cheyyali.",
          "Extract the most frequent HTTP status codes from a sample access log and compare the counts with the monitoring dashboard."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Work on copied logs, preserve originals, handle spaces/encoding, and avoid exposing secrets in output.",
          "Extract the most frequent HTTP status codes from a sample access log and compare the counts with the monitoring dashboard."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "cut selects fields, sort orders records, uniq counts adjacent duplicates, wc counts lines/bytes, tr translates characters and column formats output."
        ],
        "bullets": [
          "Question: What is Text Processing in Linux?",
          "Answer: Text processing tools logs and configuration files nundi relevant lines, columns and patterns extract, transform and summarize chesthayi. Large logs lo error pattern identify cheyadaniki and CI output analyze cheyadaniki.",
          "Question: How do you troubleshoot Text Processing?",
          "Answer: uniq mundu sort cheyyakapothe non-adjacent duplicates count miss avuthayi; delimiter assumptions validate cheyyali. Work on copied logs, preserve originals, handle spaces/encoding, and avoid exposing secrets in output."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Take sample access log, count HTTP status codes with cut/sort/uniq, and explain each pipeline stage.",
          "Use journalctl -u nginx --since today | grep -i error to filter service logs; add timestamps and avoid destructive in-place edits until a backup exists.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Text Processing?",
        "answer": "Text processing tools logs and configuration files nundi relevant lines, columns and patterns extract, transform and summarize chesthayi. Large logs lo error pattern identify cheyadaniki and CI output analyze cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Text Processing in production?",
        "answer": "Nginx access log lo request counts extract chesi top endpoints identify chestham. uniq mundu sort cheyyakapothe non-adjacent duplicates count miss avuthayi; delimiter assumptions validate cheyyali. Work on copied logs, preserve originals, handle spaces/encoding, and avoid exposing secrets in output."
      }
    ],
    "handsOn": [
      "Take sample access log, count HTTP status codes with cut/sort/uniq, and explain each pipeline stage.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/grep-sed-and-awk": {
    "summary": "Grep, Sed and Awk gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. grep pattern matching, sed stream editing, awk field-based text processing kosam use chestham. Ee tools shell pipelines lo logs/configs analyze cheyadaniki core utilities.",
    "diagram": {
      "title": "Grep, Sed and Awk workflow",
      "nodes": [
        "Pattern selection",
        "optional stream transformation",
        "field extraction/aggregation"
      ],
      "explanation": "Grep, Sed and Awk process ni layer-by-layer ardham chesukovali: Pattern selection → optional stream transformation → field extraction/aggregation."
    },
    "sections": [
      {
        "heading": "1. Grep, Sed and Awk ante enti?",
        "paragraphs": [
          "grep pattern matching, sed stream editing, awk field-based text processing kosam use chestham. Ee tools shell pipelines lo logs/configs analyze cheyadaniki core utilities.",
          "grep finds matching lines, sed performs stream edits and awk processes records and fields; together they support fast log investigation."
        ],
        "bullets": [
          "regex",
          "-i case-insensitive",
          "-n line number",
          "sed substitution",
          "awk field separator FS",
          "$1 first field",
          "NR record count."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Errors filter, config values replace, and structured log fields aggregate cheyadaniki.",
          "grep applies patterns to input lines, sed applies editing commands to a stream, and awk splits records into fields before evaluating rules and actions."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Pattern selection → optional stream transformation → field extraction/aggregation. grep applies patterns to input lines, sed applies editing commands to a stream, and awk splits records into fields before evaluating rules and actions.",
          "Regular expressions describe patterns; grep -E enables extended syntax, sed substitution uses s/pattern/replacement/, and awk fields default to whitespace."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Regular expressions describe patterns; grep -E enables extended syntax, sed substitution uses s/pattern/replacement/, and awk fields default to whitespace."
        ],
        "bullets": [
          "regex",
          "-i case-insensitive",
          "-n line number",
          "sed substitution",
          "awk field separator FS",
          "$1 first field",
          "NR record count."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands Grep, Sed and Awk ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "grep -in 'error' app.log; grep -E '5[0-9][0-9]' access.log; sed -n '1,20p' app.log; sed 's/old/new/g' input.txt; awk '{print $1,$9}' access.log",
        "note": "Unescaped regex special characters and in-place sed edits can alter files unexpectedly; test on copy first."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Access log lo 500 errors count chesi source IP and status fields report chestham.",
          "Find 5xx responses in a sample Nginx log, print timestamp and request path with awk, and count the affected endpoints."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Unescaped regex special characters and in-place sed edits can alter files unexpectedly; test on copy first.",
          "Find 5xx responses in a sample Nginx log, print timestamp and request path with awk, and count the affected endpoints."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use grep to locate, sed to preview transformations, awk to extract columns; redact tokens and personal data.",
          "Find 5xx responses in a sample Nginx log, print timestamp and request path with awk, and count the affected endpoints."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Regular expressions describe patterns; grep -E enables extended syntax, sed substitution uses s/pattern/replacement/, and awk fields default to whitespace."
        ],
        "bullets": [
          "Question: What is Grep, Sed and Awk in Linux?",
          "Answer: grep pattern matching, sed stream editing, awk field-based text processing kosam use chestham. Ee tools shell pipelines lo logs/configs analyze cheyadaniki core utilities. Errors filter, config values replace, and structured log fields aggregate cheyadaniki.",
          "Question: How do you troubleshoot Grep, Sed and Awk?",
          "Answer: Unescaped regex special characters and in-place sed edits can alter files unexpectedly; test on copy first. Use grep to locate, sed to preview transformations, awk to extract columns; redact tokens and personal data."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Generate sample log; identify ERROR lines, replace a test string in a copy, and print first and ninth fields.",
          "Test patterns against copied log files first; use grep -n, sed -n and awk print statements to inspect exact matches before transforming production data.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Grep, Sed and Awk?",
        "answer": "grep pattern matching, sed stream editing, awk field-based text processing kosam use chestham. Ee tools shell pipelines lo logs/configs analyze cheyadaniki core utilities. Errors filter, config values replace, and structured log fields aggregate cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Grep, Sed and Awk in production?",
        "answer": "Access log lo 500 errors count chesi source IP and status fields report chestham. Unescaped regex special characters and in-place sed edits can alter files unexpectedly; test on copy first. Use grep to locate, sed to preview transformations, awk to extract columns; redact tokens and personal data."
      }
    ],
    "handsOn": [
      "Generate sample log; identify ERROR lines, replace a test string in a copy, and print first and ninth fields.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/pipes-and-redirection": {
    "summary": "Pipes and Redirection gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Pipe `|` oka command stdout ni next command stdin ki pampisthundi. Redirection stdout/stderr ni file or stream ki route chesthundi.",
    "diagram": {
      "title": "Pipes and Redirection workflow",
      "nodes": [
        "Producer stdout",
        "pipe buffer",
        "consumer stdin; redirection shell file descriptors ni set chesthundi"
      ],
      "explanation": "Pipes and Redirection process ni layer-by-layer ardham chesukovali: Producer stdout → pipe buffer → consumer stdin; redirection shell file descriptors ni set chesthundi."
    },
    "sections": [
      {
        "heading": "1. Pipes and Redirection ante enti?",
        "paragraphs": [
          "Pipe `|` oka command stdout ni next command stdin ki pampisthundi. Redirection stdout/stderr ni file or stream ki route chesthundi.",
          "Pipes and redirection connect command output to other commands or files, making repeatable evidence collection possible."
        ],
        "bullets": [
          "stdin=0",
          "stdout=1",
          "stderr=2",
          "> truncate",
          ">> append",
          "2>",
          "2>&1",
          "tee duplicates stream."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Small Unix tools combine chesi repeatable diagnostic pipelines build cheyadaniki.",
          "The shell opens redirected file descriptors before executing a command; a pipe connects stdout of the left process to stdin of the right process."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Producer stdout → pipe buffer → consumer stdin; redirection shell file descriptors ni set chesthundi. The shell opens redirected file descriptors before executing a command; a pipe connects stdout of the left process to stdin of the right process.",
          ">, >>, <, 2>, 2>&1 and | control stdout, append, stdin, stderr and pipelines; tee duplicates output to screen and file."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          ">, >>, <, 2>, 2>&1 and | control stdout, append, stdin, stderr and pipelines; tee duplicates output to screen and file."
        ],
        "bullets": [
          "stdin=0",
          "stdout=1",
          "stderr=2",
          "> truncate",
          ">> append",
          "2>",
          "2>&1",
          "tee duplicates stream."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands Pipes and Redirection ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "ps aux | grep nginx; command > output.txt; command >> output.txt; command 2> error.log; command > all.log 2>&1; tee result.txt",
        "note": "`>` existing file truncate chesthundi; command order of `2>&1` matters; pipe default ga only stdout pass chesthundi."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Disk usage command output ni tee tho terminal and evidence file rendu places lo save chestham.",
          "Capture a diagnostic command's stdout and stderr separately, then use tee to retain a timestamped copy while reviewing it."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "`>` existing file truncate chesthundi; command order of `2>&1` matters; pipe default ga only stdout pass chesthundi.",
          "Capture a diagnostic command's stdout and stderr separately, then use tee to retain a timestamped copy while reviewing it."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use `set -o pipefail` in scripts, protect output paths, and avoid logging secrets.",
          "Capture a diagnostic command's stdout and stderr separately, then use tee to retain a timestamped copy while reviewing it."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          ">, >>, <, 2>, 2>&1 and | control stdout, append, stdin, stderr and pipelines; tee duplicates output to screen and file."
        ],
        "bullets": [
          "Question: What is Pipes and Redirection in Linux?",
          "Answer: Pipe `|` oka command stdout ni next command stdin ki pampisthundi. Redirection stdout/stderr ni file or stream ki route chesthundi. Small Unix tools combine chesi repeatable diagnostic pipelines build cheyadaniki.",
          "Question: How do you troubleshoot Pipes and Redirection?",
          "Answer: `>` existing file truncate chesthundi; command order of `2>&1` matters; pipe default ga only stdout pass chesthundi. Use `set -o pipefail` in scripts, protect output paths, and avoid logging secrets."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Run a command with stdout and stderr separately redirected; use tee and explain exit status with pipefail.",
          "Use set -o pipefail in scripts so a failing command inside a pipeline is not hidden by the final command's success.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Pipes and Redirection?",
        "answer": "Pipe `|` oka command stdout ni next command stdin ki pampisthundi. Redirection stdout/stderr ni file or stream ki route chesthundi. Small Unix tools combine chesi repeatable diagnostic pipelines build cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Pipes and Redirection in production?",
        "answer": "Disk usage command output ni tee tho terminal and evidence file rendu places lo save chestham. `>` existing file truncate chesthundi; command order of `2>&1` matters; pipe default ga only stdout pass chesthundi. Use `set -o pipefail` in scripts, protect output paths, and avoid logging secrets."
      }
    ],
    "handsOn": [
      "Run a command with stdout and stderr separately redirected; use tee and explain exit status with pipefail.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/shell-scripting": {
    "summary": "Shell Scripting gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Shell script commands ni executable file lo sequence/logic ga organize chesi system administration tasks automate chesthundi.",
    "diagram": {
      "title": "Shell Scripting workflow",
      "nodes": [
        "Script interpreter",
        "variable/command evaluation",
        "control flow",
        "exit status"
      ],
      "explanation": "Shell Scripting process ni layer-by-layer ardham chesukovali: Script interpreter → variable/command evaluation → control flow → exit status."
    },
    "sections": [
      {
        "heading": "1. Shell Scripting ante enti?",
        "paragraphs": [
          "Shell script commands ni executable file lo sequence/logic ga organize chesi system administration tasks automate chesthundi.",
          "Shell scripts automate repeatable operating-system tasks and provide consistent checks during provisioning, deployment and incident response."
        ],
        "bullets": [
          "shebang",
          "executable bit",
          "positional arguments",
          "functions",
          "exit status",
          "strict mode",
          "idempotency."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Repeated deployments, backups, health checks and housekeeping tasks consistent ga run cheyadaniki.",
          "The interpreter reads commands in order, expands variables, evaluates conditions and loops, launches processes and returns an exit code to the caller."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Script interpreter → variable/command evaluation → control flow → exit status. The interpreter reads commands in order, expands variables, evaluates conditions and loops, launches processes and returns an exit code to the caller.",
          "Shebang, positional parameters, quoting, functions, exit codes, traps and set -euo pipefail determine script execution and failure handling."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Shebang, positional parameters, quoting, functions, exit codes, traps and set -euo pipefail determine script execution and failure handling."
        ],
        "bullets": [
          "shebang",
          "executable bit",
          "positional arguments",
          "functions",
          "exit status",
          "strict mode",
          "idempotency."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Use bash -n script.sh for syntax validation and shellcheck for static analysis; quote variables such as "$target" to prevent word splitting."
        ],
        "code": "#!/usr/bin/env bash; set -euo pipefail; echo \"Host: $(hostname)\"; date; df -h /; chmod +x health-check.sh; ./health-check.sh",
        "note": "Unquoted variables, unchecked commands and unsafe rm paths scripts ni dangerous ga chesthayi."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "CI runner deployment mundu disk, service and endpoint checks execute chesi failure aithe pipeline stop chestham.",
          "Write a script that checks disk usage and service health, returns nonzero on failure, and emits a clear message suitable for CI logs."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Unquoted variables, unchecked commands and unsafe rm paths scripts ni dangerous ga chesthayi.",
          "Write a script that checks disk usage and service health, returns nonzero on failure, and emits a clear message suitable for CI logs."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Quote variables, validate inputs, use absolute paths, trap cleanup, log actions and test in disposable environment.",
          "Write a script that checks disk usage and service health, returns nonzero on failure, and emits a clear message suitable for CI logs."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Shebang, positional parameters, quoting, functions, exit codes, traps and set -euo pipefail determine script execution and failure handling."
        ],
        "bullets": [
          "Question: What is Shell Scripting in Linux?",
          "Answer: Shell script commands ni executable file lo sequence/logic ga organize chesi system administration tasks automate chesthundi. Repeated deployments, backups, health checks and housekeeping tasks consistent ga run cheyadaniki.",
          "Question: How do you troubleshoot Shell Scripting?",
          "Answer: Unquoted variables, unchecked commands and unsafe rm paths scripts ni dangerous ga chesthayi. Quote variables, validate inputs, use absolute paths, trap cleanup, log actions and test in disposable environment."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Write a health-check script that checks disk threshold and exits non-zero when threshold is crossed.",
          "Use bash -n script.sh for syntax validation and shellcheck for static analysis; quote variables such as "$target" to prevent word splitting.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Shell Scripting?",
        "answer": "Shell script commands ni executable file lo sequence/logic ga organize chesi system administration tasks automate chesthundi. Repeated deployments, backups, health checks and housekeeping tasks consistent ga run cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Shell Scripting in production?",
        "answer": "CI runner deployment mundu disk, service and endpoint checks execute chesi failure aithe pipeline stop chestham. Unquoted variables, unchecked commands and unsafe rm paths scripts ni dangerous ga chesthayi. Quote variables, validate inputs, use absolute paths, trap cleanup, log actions and test in disposable environment."
      }
    ],
    "handsOn": [
      "Write a health-check script that checks disk threshold and exits non-zero when threshold is crossed.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/bash-variables": {
    "summary": "Bash Variables gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Bash variables shell session lo strings and command results store chesthayi. Environment variables child processes ki export chesthe inherit avuthayi.",
    "diagram": {
      "title": "Bash Variables workflow",
      "nodes": [
        "Assignment",
        "expansion",
        "optional export to child process",
        "command consumes value"
      ],
      "explanation": "Bash Variables process ni layer-by-layer ardham chesukovali: Assignment → expansion → optional export to child process → command consumes value."
    },
    "sections": [
      {
        "heading": "1. Bash Variables ante enti?",
        "paragraphs": [
          "Bash variables shell session lo strings and command results store chesthayi. Environment variables child processes ki export chesthe inherit avuthayi.",
          "Bash variables store values used by commands; environment variables are exported to child processes while ordinary shell variables remain local to the shell."
        ],
        "bullets": [
          "local variable",
          "environment variable",
          "export",
          "readonly",
          "positional parameter",
          "command substitution",
          "parameter expansion."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Reusable scripts, environment-specific configuration and secrets references manage cheyadaniki.",
          "The shell expands $NAME when parsing commands; export places a variable in the environment inherited by child processes, and quoting controls expansion behavior."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Assignment → expansion → optional export to child process → command consumes value. The shell expands $NAME when parsing commands; export places a variable in the environment inherited by child processes, and quoting controls expansion behavior.",
          "Local variables, exported environment variables, positional parameters, command substitution and readonly variables have different scope and lifetime."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Local variables, exported environment variables, positional parameters, command substitution and readonly variables have different scope and lifetime."
        ],
        "bullets": [
          "local variable",
          "environment variable",
          "export",
          "readonly",
          "positional parameter",
          "command substitution",
          "parameter expansion."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Use declare -p and env to inspect shell versus exported variables; quote expansions and avoid putting secrets in command-line arguments or logs."
        ],
        "code": "APP_ENV=staging; echo \"$APP_ENV\"; export APP_ENV; printf '%s\\n' \"$PATH\"; readonly REGION=ap-south-1; unset APP_ENV",
        "note": "Spaces unna values quote cheyyali; secrets shell history or process arguments lo leak avvakunda chusukovali."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Same deploy script dev/staging/prod lo APP_ENV and artifact version batti behavior select chesthundi.",
          "Pass a non-secret deployment environment name to a test script and verify that the child process receives it without exposing credentials."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Spaces unna values quote cheyyali; secrets shell history or process arguments lo leak avvakunda chusukovali.",
          "Pass a non-secret deployment environment name to a test script and verify that the child process receives it without exposing credentials."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Inject secrets from approved secret store, avoid hardcoding, set defaults safely with `${VAR:-default}`.",
          "Pass a non-secret deployment environment name to a test script and verify that the child process receives it without exposing credentials."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Local variables, exported environment variables, positional parameters, command substitution and readonly variables have different scope and lifetime."
        ],
        "bullets": [
          "Question: What is Bash Variables in Linux?",
          "Answer: Bash variables shell session lo strings and command results store chesthayi. Environment variables child processes ki export chesthe inherit avuthayi. Reusable scripts, environment-specific configuration and secrets references manage cheyadaniki.",
          "Question: How do you troubleshoot Bash Variables?",
          "Answer: Spaces unna values quote cheyyali; secrets shell history or process arguments lo leak avvakunda chusukovali. Inject secrets from approved secret store, avoid hardcoding, set defaults safely with `${VAR:-default}`."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Create a script that reads APP_ENV and ARTIFACT_VERSION, validates both, and prints deployment target.",
          "Use declare -p and env to inspect shell versus exported variables; quote expansions and avoid putting secrets in command-line arguments or logs.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Bash Variables?",
        "answer": "Bash variables shell session lo strings and command results store chesthayi. Environment variables child processes ki export chesthe inherit avuthayi. Reusable scripts, environment-specific configuration and secrets references manage cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Bash Variables in production?",
        "answer": "Same deploy script dev/staging/prod lo APP_ENV and artifact version batti behavior select chesthundi. Spaces unna values quote cheyyali; secrets shell history or process arguments lo leak avvakunda chusukovali. Inject secrets from approved secret store, avoid hardcoding, set defaults safely with `${VAR:-default}`."
      }
    ],
    "handsOn": [
      "Create a script that reads APP_ENV and ARTIFACT_VERSION, validates both, and prints deployment target.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/conditions-and-loops": {
    "summary": "Conditions and Loops gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Bash conditions decisions execute chesthayi; loops commands ni list or condition batti repeat chesthayi. Exit codes shell automation lo true/false decision ki common.",
    "diagram": {
      "title": "Conditions and Loops workflow",
      "nodes": [
        "Condition evaluates exit status/expression",
        "branch or loop body executes",
        "next iteration/exit"
      ],
      "explanation": "Conditions and Loops process ni layer-by-layer ardham chesukovali: Condition evaluates exit status/expression → branch or loop body executes → next iteration/exit."
    },
    "sections": [
      {
        "heading": "1. Conditions and Loops ante enti?",
        "paragraphs": [
          "Bash conditions decisions execute chesthayi; loops commands ni list or condition batti repeat chesthayi. Exit codes shell automation lo true/false decision ki common.",
          "Bash conditions and loops make scripts choose actions based on command results and repeat work over controlled input sets."
        ],
        "bullets": [
          "test/[ ]",
          "[[ ]]",
          "-eq numeric compare",
          "= string compare",
          "for",
          "while",
          "break",
          "continue."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Multiple servers/files process cheyadaniki and health status batti deployment continue/stop cheyadaniki.",
          "if evaluates a command's exit status, case matches patterns, and for/while loops iterate through lists or continue while a test succeeds."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Condition evaluates exit status/expression → branch or loop body executes → next iteration/exit. if evaluates a command's exit status, case matches patterns, and for/while loops iterate through lists or continue while a test succeeds.",
          "test brackets, [[ ]], numeric comparisons, string comparisons, case patterns, break and continue control branching and iteration."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "test brackets, [[ ]], numeric comparisons, string comparisons, case patterns, break and continue control branching and iteration."
        ],
        "bullets": [
          "test/[ ]",
          "[[ ]]",
          "-eq numeric compare",
          "= string compare",
          "for",
          "while",
          "break",
          "continue."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands Conditions and Loops ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "if systemctl is-active --quiet nginx; then echo active; else echo inactive; fi; for host in app1 app2; do echo \"$host\"; done; while read -r line; do echo \"$line\"; done < hosts.txt",
        "note": "`[ $VAR = x ]` empty value tho fail avvachu; use quotes or `[[ ]]`; infinite while loops avoid cheyyali."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Hosts inventory meeda SSH health check loop run chesi failed host list generate chestham.",
          "Loop through a small list of test services, check each with systemctl is-active, and report failed services without restarting them automatically."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "`[ $VAR = x ]` empty value tho fail avvachu; use quotes or `[[ ]]`; infinite while loops avoid cheyyali.",
          "Loop through a small list of test services, check each with systemctl is-active, and report failed services without restarting them automatically."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Validate input, quote expansions, add timeout/retry limits, and make loops safe for filenames with spaces.",
          "Loop through a small list of test services, check each with systemctl is-active, and report failed services without restarting them automatically."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "test brackets, [[ ]], numeric comparisons, string comparisons, case patterns, break and continue control branching and iteration."
        ],
        "bullets": [
          "Question: What is Conditions and Loops in Linux?",
          "Answer: Bash conditions decisions execute chesthayi; loops commands ni list or condition batti repeat chesthayi. Exit codes shell automation lo true/false decision ki common. Multiple servers/files process cheyadaniki and health status batti deployment continue/stop cheyadaniki.",
          "Question: How do you troubleshoot Conditions and Loops?",
          "Answer: `[ $VAR = x ]` empty value tho fail avvachu; use quotes or `[[ ]]`; infinite while loops avoid cheyyali. Validate input, quote expansions, add timeout/retry limits, and make loops safe for filenames with spaces."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Loop over test host list and report reachable/unreachable without making configuration changes.",
          "Use [[ -f "$file" ]] to test a file, and quote loop variables; avoid parsing ls output because filenames may contain spaces or newlines.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Conditions and Loops?",
        "answer": "Bash conditions decisions execute chesthayi; loops commands ni list or condition batti repeat chesthayi. Exit codes shell automation lo true/false decision ki common. Multiple servers/files process cheyadaniki and health status batti deployment continue/stop cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Conditions and Loops in production?",
        "answer": "Hosts inventory meeda SSH health check loop run chesi failed host list generate chestham. `[ $VAR = x ]` empty value tho fail avvachu; use quotes or `[[ ]]`; infinite while loops avoid cheyyali. Validate input, quote expansions, add timeout/retry limits, and make loops safe for filenames with spaces."
      }
    ],
    "handsOn": [
      "Loop over test host list and report reachable/unreachable without making configuration changes.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/processes-and-signals": {
    "summary": "Processes and Signals gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Process ante running program instance; PID unique process identifier. Signals process ki terminate, reload or control request pampisthayi.",
    "diagram": {
      "title": "Processes and Signals workflow",
      "nodes": [
        "Kernel creates process",
        "scheduler allocates CPU",
        "process handles signals",
        "exits or changes state"
      ],
      "explanation": "Processes and Signals process ni layer-by-layer ardham chesukovali: Kernel creates process → scheduler allocates CPU → process handles signals → exits or changes state."
    },
    "sections": [
      {
        "heading": "1. Processes and Signals ante enti?",
        "paragraphs": [
          "Process ante running program instance; PID unique process identifier. Signals process ki terminate, reload or control request pampisthayi.",
          "A process is a running program with a PID, credentials, open file descriptors and resource usage; signals request actions such as termination."
        ],
        "bullets": [
          "PID",
          "PPID",
          "foreground/background",
          "SIGTERM graceful request",
          "SIGKILL force kill",
          "SIGHUP reload convention",
          "zombie process."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "High CPU process identify cheyadaniki, stuck jobs stop cheyadaniki and services graceful reload cheyadaniki.",
          "The kernel schedules runnable processes; signals such as TERM request graceful shutdown, while KILL cannot be caught and should be a last resort."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Kernel creates process → scheduler allocates CPU → process handles signals → exits or changes state. The kernel schedules runnable processes; signals such as TERM request graceful shutdown, while KILL cannot be caught and should be a last resort.",
          "PID, PPID, process state, nice value, foreground/background jobs, SIGTERM, SIGKILL and zombie processes explain process lifecycle."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "PID, PPID, process state, nice value, foreground/background jobs, SIGTERM, SIGKILL and zombie processes explain process lifecycle."
        ],
        "bullets": [
          "PID",
          "PPID",
          "foreground/background",
          "SIGTERM graceful request",
          "SIGKILL force kill",
          "SIGHUP reload convention",
          "zombie process."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands Processes and Signals ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "ps -ef; top; pgrep -a nginx; pstree -p; kill -TERM 1234; kill -HUP 1234; nice -n 10 command; uptime",
        "note": "Blind `kill -9` data loss or interrupted writes cause cheyochu; PID reuse risk undi."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Memory leak unna worker identify chesi service manager dwara graceful restart plan chestham.",
          "Investigate a test worker consuming CPU, identify its parent and command line, then stop it gracefully and verify the service recovers."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Blind `kill -9` data loss or interrupted writes cause cheyochu; PID reuse risk undi.",
          "Investigate a test worker consuming CPU, identify its parent and command line, then stop it gracefully and verify the service recovers."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Identify owner and command before termination; prefer SIGTERM and service manager; capture logs and impact.",
          "Investigate a test worker consuming CPU, identify its parent and command line, then stop it gracefully and verify the service recovers."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "PID, PPID, process state, nice value, foreground/background jobs, SIGTERM, SIGKILL and zombie processes explain process lifecycle."
        ],
        "bullets": [
          "Question: What is Processes and Signals in Linux?",
          "Answer: Process ante running program instance; PID unique process identifier. Signals process ki terminate, reload or control request pampisthayi. High CPU process identify cheyadaniki, stuck jobs stop cheyadaniki and services graceful reload cheyadaniki.",
          "Question: How do you troubleshoot Processes and Signals?",
          "Answer: Blind `kill -9` data loss or interrupted writes cause cheyochu; PID reuse risk undi. Identify owner and command before termination; prefer SIGTERM and service manager; capture logs and impact."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Start a harmless sleep process, inspect PID/PPID, send TERM, and verify it exited.",
          "Inspect with ps, top and pgrep; send TERM first, verify shutdown, and use KILL only after confirming the exact PID and impact.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Processes and Signals?",
        "answer": "Process ante running program instance; PID unique process identifier. Signals process ki terminate, reload or control request pampisthayi. High CPU process identify cheyadaniki, stuck jobs stop cheyadaniki and services graceful reload cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Processes and Signals in production?",
        "answer": "Memory leak unna worker identify chesi service manager dwara graceful restart plan chestham. Blind `kill -9` data loss or interrupted writes cause cheyochu; PID reuse risk undi. Identify owner and command before termination; prefer SIGTERM and service manager; capture logs and impact."
      }
    ],
    "handsOn": [
      "Start a harmless sleep process, inspect PID/PPID, send TERM, and verify it exited.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/systemd-and-services": {
    "summary": "Systemd and Services gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. systemd Linux systems lo boot and service manager ga units ni start, stop, order, monitor chesthundi. Service unit application process lifecycle define chesthundi.",
    "diagram": {
      "title": "Systemd and Services workflow",
      "nodes": [
        "Boot target",
        "dependency ordering",
        "unit activation",
        "process supervision",
        "journal logging"
      ],
      "explanation": "Systemd and Services process ni layer-by-layer ardham chesukovali: Boot target → dependency ordering → unit activation → process supervision → journal logging."
    },
    "sections": [
      {
        "heading": "1. Systemd and Services ante enti?",
        "paragraphs": [
          "systemd Linux systems lo boot and service manager ga units ni start, stop, order, monitor chesthundi. Service unit application process lifecycle define chesthundi.",
          "systemd manages Linux services and system startup through unit files, dependencies, targets and journal logging."
        ],
        "bullets": [
          "unit",
          "service",
          "target",
          "enable vs start",
          "daemon-reload",
          "restart vs reload",
          "dependency."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Nginx, Docker, sshd lanti daemons boot time lo start avvadam and failures recover cheyadaniki.",
          "systemd loads unit definitions, resolves dependencies, starts requested units and supervises service processes according to restart and ordering policies."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Boot target → dependency ordering → unit activation → process supervision → journal logging. systemd loads unit definitions, resolves dependencies, starts requested units and supervises service processes according to restart and ordering policies.",
          "Unit types include service, target, socket, timer and mount; ExecStart, After, Wants, Requires and Restart shape service behavior."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Unit types include service, target, socket, timer and mount; ExecStart, After, Wants, Requires and Restart shape service behavior."
        ],
        "bullets": [
          "unit",
          "service",
          "target",
          "enable vs start",
          "daemon-reload",
          "restart vs reload",
          "dependency."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands Systemd and Services ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "systemctl status nginx; sudo systemctl start nginx; sudo systemctl enable nginx; sudo systemctl restart nginx; systemctl list-units --type=service; systemctl cat nginx",
        "note": "`enable` service ni immediate ga start cheyyadu; unit edit tarvatha daemon-reload required; restart downtime cause cheyochu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "New release taruvatha Nginx config test chesi controlled reload perform chestham.",
          "Create a harmless test service in a VM, enable it at boot, inspect its journal and validate restart behavior after a controlled failure."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "`enable` service ni immediate ga start cheyyadu; unit edit tarvatha daemon-reload required; restart downtime cause cheyochu.",
          "Create a harmless test service in a VM, enable it at boot, inspect its journal and validate restart behavior after a controlled failure."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Before restart inspect status/config, use reload when supported, define restart policy and monitor health.",
          "Create a harmless test service in a VM, enable it at boot, inspect its journal and validate restart behavior after a controlled failure."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Unit types include service, target, socket, timer and mount; ExecStart, After, Wants, Requires and Restart shape service behavior."
        ],
        "bullets": [
          "Question: What is Systemd and Services in Linux?",
          "Answer: systemd Linux systems lo boot and service manager ga units ni start, stop, order, monitor chesthundi. Service unit application process lifecycle define chesthundi. Nginx, Docker, sshd lanti daemons boot time lo start avvadam and failures recover cheyadaniki.",
          "Question: How do you troubleshoot Systemd and Services?",
          "Answer: `enable` service ni immediate ga start cheyyadu; unit edit tarvatha daemon-reload required; restart downtime cause cheyochu. Before restart inspect status/config, use reload when supported, define restart policy and monitor health."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Create a simple systemd service for a harmless script in a VM; start, enable, inspect and disable it.",
          "Use systemctl status and cat to inspect a unit, daemon-reload after editing unit files, and journalctl -u to inspect its logs.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Systemd and Services?",
        "answer": "systemd Linux systems lo boot and service manager ga units ni start, stop, order, monitor chesthundi. Service unit application process lifecycle define chesthundi. Nginx, Docker, sshd lanti daemons boot time lo start avvadam and failures recover cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Systemd and Services in production?",
        "answer": "New release taruvatha Nginx config test chesi controlled reload perform chestham. `enable` service ni immediate ga start cheyyadu; unit edit tarvatha daemon-reload required; restart downtime cause cheyochu. Before restart inspect status/config, use reload when supported, define restart policy and monitor health."
      }
    ],
    "handsOn": [
      "Create a simple systemd service for a harmless script in a VM; start, enable, inspect and disable it.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/package-management": {
    "summary": "Package Management gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Package manager software packages install, update, verify and remove chesthundi while dependencies and repository metadata manage chesthundi.",
    "diagram": {
      "title": "Package Management workflow",
      "nodes": [
        "Repository metadata",
        "dependency resolution",
        "package download/signature verification",
        "install scripts/files"
      ],
      "explanation": "Package Management process ni layer-by-layer ardham chesukovali: Repository metadata → dependency resolution → package download/signature verification → install scripts/files."
    },
    "sections": [
      {
        "heading": "1. Package Management ante enti?",
        "paragraphs": [
          "Package manager software packages install, update, verify and remove chesthundi while dependencies and repository metadata manage chesthundi.",
          "Package managers install, update, verify and remove software while tracking dependencies and package metadata."
        ],
        "bullets": [
          "package",
          "repository",
          "dependency",
          "package database",
          "signing key",
          "version pinning."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Servers lo supported, repeatable and auditable software installation kosam.",
          "The package client resolves requested packages against configured repositories, downloads signed metadata and packages, checks dependencies and invokes installation scripts."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Repository metadata → dependency resolution → package download/signature verification → install scripts/files. The package client resolves requested packages against configured repositories, downloads signed metadata and packages, checks dependencies and invokes installation scripts.",
          "Repositories, package indexes, dependencies, package signatures, holds and transaction history are essential for reproducible server maintenance."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Repositories, package indexes, dependencies, package signatures, holds and transaction history are essential for reproducible server maintenance."
        ],
        "bullets": [
          "package",
          "repository",
          "dependency",
          "package database",
          "signing key",
          "version pinning."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Use apt-cache policy or dnf info before installing; inspect pending changes and repository origin, then verify installed versions after the transaction."
        ],
        "code": "apt-cache policy nginx; apt list --installed; dnf info nginx; rpm -qi nginx; dpkg -l nginx; sudo apt install nginx",
        "note": "Unplanned major upgrades production compatibility break cheyochu; untrusted repositories supply-chain risk."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Golden image build lo approved Nginx version install chesi package inventory record chestham.",
          "Install a small diagnostic package on a disposable host, record its repository and version, then remove it using the package manager."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Unplanned major upgrades production compatibility break cheyochu; untrusted repositories supply-chain risk.",
          "Install a small diagnostic package on a disposable host, record its repository and version, then remove it using the package manager."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use approved repositories, pin/test versions, patch in maintenance windows and record package inventory.",
          "Install a small diagnostic package on a disposable host, record its repository and version, then remove it using the package manager."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Repositories, package indexes, dependencies, package signatures, holds and transaction history are essential for reproducible server maintenance."
        ],
        "bullets": [
          "Question: What is Package Management in Linux?",
          "Answer: Package manager software packages install, update, verify and remove chesthundi while dependencies and repository metadata manage chesthundi. Servers lo supported, repeatable and auditable software installation kosam.",
          "Question: How do you troubleshoot Package Management?",
          "Answer: Unplanned major upgrades production compatibility break cheyochu; untrusted repositories supply-chain risk. Use approved repositories, pin/test versions, patch in maintenance windows and record package inventory."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Identify package manager on Ubuntu and RHEL-like test VMs; inspect package version without installing.",
          "Use apt-cache policy or dnf info before installing; inspect pending changes and repository origin, then verify installed versions after the transaction.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Package Management?",
        "answer": "Package manager software packages install, update, verify and remove chesthundi while dependencies and repository metadata manage chesthundi. Servers lo supported, repeatable and auditable software installation kosam."
      },
      {
        "question": "How do you use and troubleshoot Package Management in production?",
        "answer": "Golden image build lo approved Nginx version install chesi package inventory record chestham. Unplanned major upgrades production compatibility break cheyochu; untrusted repositories supply-chain risk. Use approved repositories, pin/test versions, patch in maintenance windows and record package inventory."
      }
    ],
    "handsOn": [
      "Identify package manager on Ubuntu and RHEL-like test VMs; inspect package version without installing.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/apt-and-yum-dnf": {
    "summary": "APT and YUM/DNF gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. APT Debian/Ubuntu distributions lo `.deb` packages manage chesthundi; YUM/DNF RPM-based distributions lo packages manage chesthayi. Commands similar purpose serve chesthayi but repositories and package formats differ.",
    "diagram": {
      "title": "APT and YUM/DNF workflow",
      "nodes": [
        "Refresh repository metadata",
        "resolve dependencies",
        "download signed packages",
        "install/update"
      ],
      "explanation": "APT and YUM/DNF process ni layer-by-layer ardham chesukovali: Refresh repository metadata → resolve dependencies → download signed packages → install/update."
    },
    "sections": [
      {
        "heading": "1. APT and YUM/DNF ante enti?",
        "paragraphs": [
          "APT Debian/Ubuntu distributions lo `.deb` packages manage chesthundi; YUM/DNF RPM-based distributions lo packages manage chesthayi. Commands similar purpose serve chesthayi but repositories and package formats differ.",
          "APT is common on Debian/Ubuntu; DNF is used by Fedora and modern RHEL-family systems, while older systems may use YUM compatibility commands."
        ],
        "bullets": [
          "APT uses dpkg",
          "DNF uses RPM",
          "update refreshes metadata in APT",
          "upgrade applies package updates",
          "repo configuration controls sources."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Different Linux families lo correct patch/install workflow follow cheyadaniki.",
          "APT refreshes package indexes before resolving installs; DNF reads repository metadata, resolves dependencies and executes an RPM transaction."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Refresh repository metadata → resolve dependencies → download signed packages → install/update. APT refreshes package indexes before resolving installs; DNF reads repository metadata, resolves dependencies and executes an RPM transaction.",
          "apt update refreshes indexes, apt upgrade applies updates, dnf check-update checks availability, and dnf history records RPM transactions."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "apt update refreshes indexes, apt upgrade applies updates, dnf check-update checks availability, and dnf history records RPM transactions."
        ],
        "bullets": [
          "APT uses dpkg",
          "DNF uses RPM",
          "update refreshes metadata in APT",
          "upgrade applies package updates",
          "repo configuration controls sources."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands APT and YUM/DNF ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "sudo apt update; apt-cache policy nginx; sudo apt install nginx; sudo dnf check-update; dnf info nginx; sudo dnf install nginx; rpm -q nginx",
        "note": "Ubuntu commands RHEL host lo blindly run cheyyakudadhu; distro and major version first identify cheyyali."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Ubuntu CI runner lo apt, Amazon Linux/RHEL server lo dnf use chesi same approved package install chestham.",
          "Compare available security updates on Ubuntu and a RHEL-compatible test VM, then verify package versions and transaction history."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Ubuntu commands RHEL host lo blindly run cheyyakudadhu; distro and major version first identify cheyyali.",
          "Compare available security updates on Ubuntu and a RHEL-compatible test VM, then verify package versions and transaction history."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Check `/etc/os-release`, verify repository origin and package version, snapshot critical hosts before upgrades.",
          "Compare available security updates on Ubuntu and a RHEL-compatible test VM, then verify package versions and transaction history."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "apt update refreshes indexes, apt upgrade applies updates, dnf check-update checks availability, and dnf history records RPM transactions."
        ],
        "bullets": [
          "Question: What is APT and YUM/DNF in Linux?",
          "Answer: APT Debian/Ubuntu distributions lo `.deb` packages manage chesthundi; YUM/DNF RPM-based distributions lo packages manage chesthayi. Commands similar purpose serve chesthayi but repositories and package formats differ. Different Linux families lo correct patch/install workflow follow cheyadaniki.",
          "Question: How do you troubleshoot APT and YUM/DNF?",
          "Answer: Ubuntu commands RHEL host lo blindly run cheyyakudadhu; distro and major version first identify cheyyali. Check `/etc/os-release`, verify repository origin and package version, snapshot critical hosts before upgrades."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Compare `/etc/os-release` and package query commands on Ubuntu and Amazon Linux; document differences.",
          "Check OS release first, review the proposed transaction and repository source, and use apt or dnf consistently with the host distribution.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is APT and YUM/DNF?",
        "answer": "APT Debian/Ubuntu distributions lo `.deb` packages manage chesthundi; YUM/DNF RPM-based distributions lo packages manage chesthayi. Commands similar purpose serve chesthayi but repositories and package formats differ. Different Linux families lo correct patch/install workflow follow cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot APT and YUM/DNF in production?",
        "answer": "Ubuntu CI runner lo apt, Amazon Linux/RHEL server lo dnf use chesi same approved package install chestham. Ubuntu commands RHEL host lo blindly run cheyyakudadhu; distro and major version first identify cheyyali. Check `/etc/os-release`, verify repository origin and package version, snapshot critical hosts before upgrades."
      }
    ],
    "handsOn": [
      "Compare `/etc/os-release` and package query commands on Ubuntu and Amazon Linux; document differences.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/disk-and-partition-management": {
    "summary": "Disk and Partition Management gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Disk management block devices, partitions, filesystems and capacity ni configure/monitor chesthundi. Partition disk ni logical regions ga divide chesthundi.",
    "diagram": {
      "title": "Disk and Partition Management workflow",
      "nodes": [
        "Block device",
        "partition table",
        "filesystem creation",
        "mount point",
        "application writes"
      ],
      "explanation": "Disk and Partition Management process ni layer-by-layer ardham chesukovali: Block device → partition table → filesystem creation → mount point → application writes."
    },
    "sections": [
      {
        "heading": "1. Disk and Partition Management ante enti?",
        "paragraphs": [
          "Disk management block devices, partitions, filesystems and capacity ni configure/monitor chesthundi. Partition disk ni logical regions ga divide chesthundi.",
          "Disk management prepares block devices with partitions and filesystems, then mounts them so applications can store data persistently."
        ],
        "bullets": [
          "block device",
          "partition table GPT/MBR",
          "filesystem ext4/xfs",
          "UUID",
          "mount point",
          "inode."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Filesystem capacity plan cheyadaniki and new attached cloud volume safely prepare cheyadaniki.",
          "The kernel discovers block devices; partition tables define regions, filesystems organize files and mount points attach those filesystems into the directory tree."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Block device → partition table → filesystem creation → mount point → application writes. The kernel discovers block devices; partition tables define regions, filesystems organize files and mount points attach those filesystems into the directory tree.",
          "Block device, GPT/MBR, partition, filesystem, UUID, mount point and inode capacity describe different storage layers."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Block device, GPT/MBR, partition, filesystem, UUID, mount point and inode capacity describe different storage layers."
        ],
        "bullets": [
          "block device",
          "partition table GPT/MBR",
          "filesystem ext4/xfs",
          "UUID",
          "mount point",
          "inode."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands Disk and Partition Management ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "lsblk -f; sudo fdisk -l; df -hT; sudo blkid; sudo parted -l; du -xhd1 /var | sort -h",
        "note": "Wrong disk select chesi mkfs/partition commands run chesthe data permanently loss avvachu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "EC2 EBS volume attach ayyaka device identify chesi approved partition/filesystem plan follow chestham.",
          "Attach a disposable virtual disk, create a test partition and filesystem, mount it temporarily, and verify capacity and filesystem type."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Wrong disk select chesi mkfs/partition commands run chesthe data permanently loss avvachu.",
          "Attach a disposable virtual disk, create a test partition and filesystem, mount it temporarily, and verify capacity and filesystem type."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Confirm device serial/size, backup/snapshot, maintenance approval and never format mounted production volume.",
          "Attach a disposable virtual disk, create a test partition and filesystem, mount it temporarily, and verify capacity and filesystem type."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Block device, GPT/MBR, partition, filesystem, UUID, mount point and inode capacity describe different storage layers."
        ],
        "bullets": [
          "Question: What is Disk and Partition Management in Linux?",
          "Answer: Disk management block devices, partitions, filesystems and capacity ni configure/monitor chesthundi. Partition disk ni logical regions ga divide chesthundi. Filesystem capacity plan cheyadaniki and new attached cloud volume safely prepare cheyadaniki.",
          "Question: How do you troubleshoot Disk and Partition Management?",
          "Answer: Wrong disk select chesi mkfs/partition commands run chesthe data permanently loss avvachu. Confirm device serial/size, backup/snapshot, maintenance approval and never format mounted production volume."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Disposable loopback disk or VM disk meeda lsblk, blkid, df inspect cheyandi; destructive formatting optional and only disposable disk.",
          "Use lsblk -f, blkid, df -hT and findmnt before changes; never format a device until its identity and data-retention impact are confirmed.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Disk and Partition Management?",
        "answer": "Disk management block devices, partitions, filesystems and capacity ni configure/monitor chesthundi. Partition disk ni logical regions ga divide chesthundi. Filesystem capacity plan cheyadaniki and new attached cloud volume safely prepare cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Disk and Partition Management in production?",
        "answer": "EC2 EBS volume attach ayyaka device identify chesi approved partition/filesystem plan follow chestham. Wrong disk select chesi mkfs/partition commands run chesthe data permanently loss avvachu. Confirm device serial/size, backup/snapshot, maintenance approval and never format mounted production volume."
      }
    ],
    "handsOn": [
      "Disposable loopback disk or VM disk meeda lsblk, blkid, df inspect cheyandi; destructive formatting optional and only disposable disk.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/lvm": {
    "summary": "LVM gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Logical Volume Manager physical volumes (PV), volume groups (VG), logical volumes (LV) layers create chesi storage flexible ga allocate/extend cheyadaniki help chesthundi.",
    "diagram": {
      "title": "LVM workflow",
      "nodes": [
        "Disk/partition",
        "PV",
        "VG storage pool",
        "LV virtual block device",
        "filesystem"
      ],
      "explanation": "LVM process ni layer-by-layer ardham chesukovali: Disk/partition → PV → VG storage pool → LV virtual block device → filesystem."
    },
    "sections": [
      {
        "heading": "1. LVM ante enti?",
        "paragraphs": [
          "Logical Volume Manager physical volumes (PV), volume groups (VG), logical volumes (LV) layers create chesi storage flexible ga allocate/extend cheyadaniki help chesthundi.",
          "LVM adds a flexible storage layer by combining physical volumes into volume groups and allocating logical volumes that can be resized."
        ],
        "bullets": [
          "PV physical volume",
          "VG pooled capacity",
          "LV virtual partition",
          "PE physical extent",
          "`-r` filesystem resize helper."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Underlying disk space available unnapudu filesystem layout redesign cheyakunda logical volume expand cheyadaniki.",
          "Physical volumes contribute extents to a volume group; logical volumes allocate those extents and are formatted and mounted like block devices."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Disk/partition → PV → VG storage pool → LV virtual block device → filesystem. Physical volumes contribute extents to a volume group; logical volumes allocate those extents and are formatted and mounted like block devices.",
          "PV, VG, LV, physical extent, thin pool, snapshot and filesystem resize are distinct LVM concepts."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "PV, VG, LV, physical extent, thin pool, snapshot and filesystem resize are distinct LVM concepts."
        ],
        "bullets": [
          "PV physical volume",
          "VG pooled capacity",
          "LV virtual partition",
          "PE physical extent",
          "`-r` filesystem resize helper."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands LVM ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "sudo pvs; sudo vgs; sudo lvs; sudo pvdisplay; sudo vgdisplay; sudo lvdisplay; sudo lvextend -r -L +5G /dev/vgdata/lvapp",
        "note": "VG free space, filesystem support and backup verify cheyakunda LV resize cheyyakudadhu; shrink risky."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Application data volume usage perigite VG free extents unte LV and filesystem online extend chestham.",
          "Extend a test logical volume in a VM, grow its filesystem with the filesystem-appropriate tool, and validate the new capacity."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "VG free space, filesystem support and backup verify cheyakunda LV resize cheyyakudadhu; shrink risky.",
          "Extend a test logical volume in a VM, grow its filesystem with the filesystem-appropriate tool, and validate the new capacity."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Monitor VG free capacity, snapshot/backup, confirm filesystem type and follow vendor-supported resize procedure.",
          "Extend a test logical volume in a VM, grow its filesystem with the filesystem-appropriate tool, and validate the new capacity."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "PV, VG, LV, physical extent, thin pool, snapshot and filesystem resize are distinct LVM concepts."
        ],
        "bullets": [
          "Question: What is LVM in Linux?",
          "Answer: Logical Volume Manager physical volumes (PV), volume groups (VG), logical volumes (LV) layers create chesi storage flexible ga allocate/extend cheyadaniki help chesthundi. Underlying disk space available unnapudu filesystem layout redesign cheyakunda logical volume expand cheyadaniki.",
          "Question: How do you troubleshoot LVM?",
          "Answer: VG free space, filesystem support and backup verify cheyakunda LV resize cheyyakudadhu; shrink risky. Monitor VG free capacity, snapshot/backup, confirm filesystem type and follow vendor-supported resize procedure."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Lab VM lo two virtual disks tho PV/VG/LV create chesi mount and extend; cleanup only after unmount.",
          "Inspect with pvs, vgs and lvs; confirm free extents and filesystem type before extending, and back up data before storage changes.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is LVM?",
        "answer": "Logical Volume Manager physical volumes (PV), volume groups (VG), logical volumes (LV) layers create chesi storage flexible ga allocate/extend cheyadaniki help chesthundi. Underlying disk space available unnapudu filesystem layout redesign cheyakunda logical volume expand cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot LVM in production?",
        "answer": "Application data volume usage perigite VG free extents unte LV and filesystem online extend chestham. VG free space, filesystem support and backup verify cheyakunda LV resize cheyyakudadhu; shrink risky. Monitor VG free capacity, snapshot/backup, confirm filesystem type and follow vendor-supported resize procedure."
      }
    ],
    "handsOn": [
      "Lab VM lo two virtual disks tho PV/VG/LV create chesi mount and extend; cleanup only after unmount.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/mounting-and-fstab": {
    "summary": "Mounting and fstab gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Mount operation filesystem ni directory path ki attach chesthundi. `/etc/fstab` boot-time mount configuration store chesthundi.",
    "diagram": {
      "title": "Mounting and fstab workflow",
      "nodes": [
        "Device/UUID",
        "filesystem driver",
        "mount point",
        "process path access"
      ],
      "explanation": "Mounting and fstab process ni layer-by-layer ardham chesukovali: Device/UUID → filesystem driver → mount point → process path access."
    },
    "sections": [
      {
        "heading": "1. Mounting and fstab ante enti?",
        "paragraphs": [
          "Mount operation filesystem ni directory path ki attach chesthundi. `/etc/fstab` boot-time mount configuration store chesthundi.",
          "Mounting attaches a filesystem to a directory; /etc/fstab describes filesystems that should be mounted automatically or on demand."
        ],
        "bullets": [
          "mount point",
          "UUID",
          "filesystem type",
          "mount options",
          "nofail",
          "dump/pass fields",
          "findmnt."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Persistent disks, shared storage and application data paths reboot tarvatha kuda available ga undadaniki.",
          "The kernel exposes a filesystem at a mount point; systemd may generate mount units from fstab and enforce dependencies during boot."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Device/UUID → filesystem driver → mount point → process path access. The kernel exposes a filesystem at a mount point; systemd may generate mount units from fstab and enforce dependencies during boot.",
          "UUID, mount point, filesystem type, mount options, dump and fsck pass fields determine persistent mount behavior."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "UUID, mount point, filesystem type, mount options, dump and fsck pass fields determine persistent mount behavior."
        ],
        "bullets": [
          "mount point",
          "UUID",
          "filesystem type",
          "mount options",
          "nofail",
          "dump/pass fields",
          "findmnt."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands Mounting and fstab ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "lsblk -f; findmnt; sudo mount /dev/sdb1 /data; sudo umount /data; sudo blkid; sudo mount -a",
        "note": "Wrong fstab entry boot delay/emergency mode create cheyochu; device names can change across boots."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "EBS data volume UUID tho fstab lo configure chesi reboot tarvatha stable `/data` mount ensure chestham.",
          "Mount a test filesystem by UUID, add a safe fstab entry in a VM and verify both manual mount and reboot persistence."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Wrong fstab entry boot delay/emergency mode create cheyochu; device names can change across boots.",
          "Mount a test filesystem by UUID, add a safe fstab entry in a VM and verify both manual mount and reboot persistence."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use UUID not unstable device names, validate `mount -a` before reboot, keep console access and backup fstab.",
          "Mount a test filesystem by UUID, add a safe fstab entry in a VM and verify both manual mount and reboot persistence."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "UUID, mount point, filesystem type, mount options, dump and fsck pass fields determine persistent mount behavior."
        ],
        "bullets": [
          "Question: What is Mounting and fstab in Linux?",
          "Answer: Mount operation filesystem ni directory path ki attach chesthundi. `/etc/fstab` boot-time mount configuration store chesthundi. Persistent disks, shared storage and application data paths reboot tarvatha kuda available ga undadaniki.",
          "Question: How do you troubleshoot Mounting and fstab?",
          "Answer: Wrong fstab entry boot delay/emergency mode create cheyochu; device names can change across boots. Use UUID not unstable device names, validate `mount -a` before reboot, keep console access and backup fstab."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Create temporary filesystem mount in VM, add UUID entry to test fstab, validate and safely remove entry.",
          "Prefer UUID= entries, validate edits with findmnt --verify or mount -a in a maintenance window, and keep a console rollback path.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Mounting and fstab?",
        "answer": "Mount operation filesystem ni directory path ki attach chesthundi. `/etc/fstab` boot-time mount configuration store chesthundi. Persistent disks, shared storage and application data paths reboot tarvatha kuda available ga undadaniki."
      },
      {
        "question": "How do you use and troubleshoot Mounting and fstab in production?",
        "answer": "EBS data volume UUID tho fstab lo configure chesi reboot tarvatha stable `/data` mount ensure chestham. Wrong fstab entry boot delay/emergency mode create cheyochu; device names can change across boots. Use UUID not unstable device names, validate `mount -a` before reboot, keep console access and backup fstab."
      }
    ],
    "handsOn": [
      "Create temporary filesystem mount in VM, add UUID entry to test fstab, validate and safely remove entry.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/networking-commands": {
    "summary": "Networking Commands gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Linux networking commands interfaces, routes, DNS, sockets and connectivity ni inspect chesthayi. Different tools different layer diagnose chesthayi.",
    "diagram": {
      "title": "Networking Commands workflow",
      "nodes": [
        "Interface/IP",
        "route lookup",
        "DNS resolution",
        "TCP connection",
        "application response"
      ],
      "explanation": "Networking Commands process ni layer-by-layer ardham chesukovali: Interface/IP → route lookup → DNS resolution → TCP connection → application response."
    },
    "sections": [
      {
        "heading": "1. Networking Commands ante enti?",
        "paragraphs": [
          "Linux networking commands interfaces, routes, DNS, sockets and connectivity ni inspect chesthayi. Different tools different layer diagnose chesthayi.",
          "Linux networking commands inspect interfaces, addresses, routes, name resolution, sockets and packet reachability."
        ],
        "bullets": [
          "interface",
          "CIDR",
          "default route",
          "resolver",
          "socket",
          "LISTEN",
          "TCP handshake",
          "ICMP."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Application timeout DNS, route, firewall or listening port issue aa ani isolate cheyadaniki.",
          "Applications resolve names, select a route and source address, connect to a destination socket, then exchange packets through interfaces and network policy."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Interface/IP → route lookup → DNS resolution → TCP connection → application response. Applications resolve names, select a route and source address, connect to a destination socket, then exchange packets through interfaces and network policy.",
          "ip address, ip route, DNS resolver, TCP/UDP socket, listening port, MTU and connection state describe different network layers."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "ip address, ip route, DNS resolver, TCP/UDP socket, listening port, MTU and connection state describe different network layers."
        ],
        "bullets": [
          "interface",
          "CIDR",
          "default route",
          "resolver",
          "socket",
          "LISTEN",
          "TCP handshake",
          "ICMP."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Use ip -br address, ip route get, getent hosts, ss -lntup and curl -v to isolate name, route, port and application failures."
        ],
        "code": "ip addr; ip route; ss -tulpn; getent hosts example.com; resolvectl status; ping -c 4 8.8.8.8; curl -I https://example.com",
        "note": "Ping success HTTP success ani guarantee kaadu; ICMP blocked undochu; DNS cache/resolver config vary avuthayi."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Pod/VM nundi database endpoint reach avvatledu; route, DNS resolution and TCP port individually test chestham.",
          "Troubleshoot a test web service by checking DNS resolution, route selection, listening socket and HTTP response separately."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Ping success HTTP success ani guarantee kaadu; ICMP blocked undochu; DNS cache/resolver config vary avuthayi.",
          "Troubleshoot a test web service by checking DNS resolution, route selection, listening socket and HTTP response separately."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use layered tests, avoid changing routes/firewall during diagnosis, redact internal IPs in public reports.",
          "Troubleshoot a test web service by checking DNS resolution, route selection, listening socket and HTTP response separately."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "ip address, ip route, DNS resolver, TCP/UDP socket, listening port, MTU and connection state describe different network layers."
        ],
        "bullets": [
          "Question: What is Networking Commands in Linux?",
          "Answer: Linux networking commands interfaces, routes, DNS, sockets and connectivity ni inspect chesthayi. Different tools different layer diagnose chesthayi. Application timeout DNS, route, firewall or listening port issue aa ani isolate cheyadaniki.",
          "Question: How do you troubleshoot Networking Commands?",
          "Answer: Ping success HTTP success ani guarantee kaadu; ICMP blocked undochu; DNS cache/resolver config vary avuthayi. Use layered tests, avoid changing routes/firewall during diagnosis, redact internal IPs in public reports."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Diagnose one unreachable test service using ip, getent, ss and curl; record which layer fails.",
          "Use ip -br address, ip route get, getent hosts, ss -lntup and curl -v to isolate name, route, port and application failures.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Networking Commands?",
        "answer": "Linux networking commands interfaces, routes, DNS, sockets and connectivity ni inspect chesthayi. Different tools different layer diagnose chesthayi. Application timeout DNS, route, firewall or listening port issue aa ani isolate cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Networking Commands in production?",
        "answer": "Pod/VM nundi database endpoint reach avvatledu; route, DNS resolution and TCP port individually test chestham. Ping success HTTP success ani guarantee kaadu; ICMP blocked undochu; DNS cache/resolver config vary avuthayi. Use layered tests, avoid changing routes/firewall during diagnosis, redact internal IPs in public reports."
      }
    ],
    "handsOn": [
      "Diagnose one unreachable test service using ip, getent, ss and curl; record which layer fails.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/ssh-and-scp": {
    "summary": "SSH and SCP gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. SSH encrypted remote login and command execution protocol. SCP SSH transport use chesi files copy chesthundi; modern OpenSSH scp internally SFTP protocol use cheyagaladu.",
    "diagram": {
      "title": "SSH and SCP workflow",
      "nodes": [
        "Client resolves host",
        "TCP port 22",
        "key exchange/host verification",
        "user authentication",
        "encrypted session"
      ],
      "explanation": "SSH and SCP process ni layer-by-layer ardham chesukovali: Client resolves host → TCP port 22 → key exchange/host verification → user authentication → encrypted session."
    },
    "sections": [
      {
        "heading": "1. SSH and SCP ante enti?",
        "paragraphs": [
          "SSH encrypted remote login and command execution protocol. SCP SSH transport use chesi files copy chesthundi; modern OpenSSH scp internally SFTP protocol use cheyagaladu.",
          "SSH provides encrypted remote login and command execution; SCP transfers files over the authenticated SSH transport."
        ],
        "bullets": [
          "private/public key",
          "host key",
          "known_hosts",
          "authorized_keys",
          "agent",
          "port forwarding",
          "SFTP."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Secure remote server administration, CI deployment and file transfer kosam.",
          "The client resolves the host, negotiates cryptographic algorithms, verifies the server host key, authenticates the user and opens an encrypted session or transfer."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Client resolves host → TCP port 22 → key exchange/host verification → user authentication → encrypted session. The client resolves the host, negotiates cryptographic algorithms, verifies the server host key, authenticates the user and opens an encrypted session or transfer.",
          "Host key, known_hosts, public/private key pair, ssh-agent, authorized_keys, port forwarding and file permissions are core SSH terms."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Host key, known_hosts, public/private key pair, ssh-agent, authorized_keys, port forwarding and file permissions are core SSH terms."
        ],
        "bullets": [
          "private/public key",
          "host key",
          "known_hosts",
          "authorized_keys",
          "agent",
          "port forwarding",
          "SFTP."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands SSH and SCP ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "ssh-keygen -t ed25519; ssh-copy-id deployer@server; ssh -i ~/.ssh/id_ed25519 deployer@server; scp app.tar.gz deployer@server:/tmp/; scp deployer@server:/var/log/app.log .",
        "note": "Host key verification disable cheyyadam MITM risk; private key repo lo commit cheyyakudadhu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "CI runner SSH key use chesi approved deployment account tho artifact upload chesthundi.",
          "Configure key-based access between two disposable VMs, verify host identity and copy a deployment artifact without enabling passwordless root access."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Host key verification disable cheyyadam MITM risk; private key repo lo commit cheyyakudadhu.",
          "Configure key-based access between two disposable VMs, verify host identity and copy a deployment artifact without enabling passwordless root access."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use Ed25519 keys, passphrase/agent, pinned known_hosts, least-privilege deploy account and rotate keys.",
          "Configure key-based access between two disposable VMs, verify host identity and copy a deployment artifact without enabling passwordless root access."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Host key, known_hosts, public/private key pair, ssh-agent, authorized_keys, port forwarding and file permissions are core SSH terms."
        ],
        "bullets": [
          "Question: What is SSH and SCP in Linux?",
          "Answer: SSH encrypted remote login and command execution protocol. SCP SSH transport use chesi files copy chesthundi; modern OpenSSH scp internally SFTP protocol use cheyagaladu. Secure remote server administration, CI deployment and file transfer kosam.",
          "Question: How do you troubleshoot SSH and SCP?",
          "Answer: Host key verification disable cheyyadam MITM risk; private key repo lo commit cheyyakudadhu. Use Ed25519 keys, passphrase/agent, pinned known_hosts, least-privilege deploy account and rotate keys."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Create disposable VM SSH key login and SCP a harmless file; verify host key prompt and file checksum.",
          "Run ssh -vvv for client diagnostics, ssh -G to inspect effective settings and ssh-keygen -lf to verify fingerprints; protect private keys.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is SSH and SCP?",
        "answer": "SSH encrypted remote login and command execution protocol. SCP SSH transport use chesi files copy chesthundi; modern OpenSSH scp internally SFTP protocol use cheyagaladu. Secure remote server administration, CI deployment and file transfer kosam."
      },
      {
        "question": "How do you use and troubleshoot SSH and SCP in production?",
        "answer": "CI runner SSH key use chesi approved deployment account tho artifact upload chesthundi. Host key verification disable cheyyadam MITM risk; private key repo lo commit cheyyakudadhu. Use Ed25519 keys, passphrase/agent, pinned known_hosts, least-privilege deploy account and rotate keys."
      }
    ],
    "handsOn": [
      "Create disposable VM SSH key login and SCP a harmless file; verify host key prompt and file checksum.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/cron-and-scheduling": {
    "summary": "Cron and Scheduling gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. cron time-based scheduler; crontab entries minute, hour, day, month and weekday fields use chesi recurring jobs schedule chesthayi.",
    "diagram": {
      "title": "Cron and Scheduling workflow",
      "nodes": [
        "Cron daemon reads schedule",
        "launches command with limited environment",
        "records output/logs"
      ],
      "explanation": "Cron and Scheduling process ni layer-by-layer ardham chesukovali: Cron daemon reads schedule → launches command with limited environment → records output/logs."
    },
    "sections": [
      {
        "heading": "1. Cron and Scheduling ante enti?",
        "paragraphs": [
          "cron time-based scheduler; crontab entries minute, hour, day, month and weekday fields use chesi recurring jobs schedule chesthayi.",
          "Cron and systemd timers schedule commands for recurring maintenance, backups, cleanup and health checks."
        ],
        "bullets": [
          "five time fields",
          "user crontab",
          "system crontab",
          "PATH",
          "timezone",
          "stdout/stderr",
          "flock lock."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Log cleanup, backups, certificate checks and periodic health tasks automate cheyadaniki.",
          "The cron daemon reads user and system schedules and launches commands with a limited environment; systemd timers activate linked service units."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Cron daemon reads schedule → launches command with limited environment → records output/logs. The cron daemon reads user and system schedules and launches commands with a limited environment; systemd timers activate linked service units.",
          "Minute, hour, day-of-month, month, day-of-week, crontab environment, timer unit and persistent timer behavior define schedules."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Minute, hour, day-of-month, month, day-of-week, crontab environment, timer unit and persistent timer behavior define schedules."
        ],
        "bullets": [
          "five time fields",
          "user crontab",
          "system crontab",
          "PATH",
          "timezone",
          "stdout/stderr",
          "flock lock."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands Cron and Scheduling ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "crontab -l; crontab -e; systemctl status cron; journalctl -u cron; 15 2 * * * /usr/local/bin/backup.sh",
        "note": "Cron environment interactive shell la undadu; overlapping jobs and missed run windows possible."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Daily backup script 02:15 ki run ayi success/failure status monitoring ki publish chesthundi.",
          "Schedule a harmless report script in a VM, verify its timestamped log and confirm the job does not overlap when a prior run is delayed."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Cron environment interactive shell la undadu; overlapping jobs and missed run windows possible.",
          "Schedule a harmless report script in a VM, verify its timestamped log and confirm the job does not overlap when a prior run is delayed."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use absolute paths, explicit environment, locking, timeout, logs, alerting and backup verification.",
          "Schedule a harmless report script in a VM, verify its timestamped log and confirm the job does not overlap when a prior run is delayed."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Minute, hour, day-of-month, month, day-of-week, crontab environment, timer unit and persistent timer behavior define schedules."
        ],
        "bullets": [
          "Question: What is Cron and Scheduling in Linux?",
          "Answer: cron time-based scheduler; crontab entries minute, hour, day, month and weekday fields use chesi recurring jobs schedule chesthayi. Log cleanup, backups, certificate checks and periodic health tasks automate cheyadaniki.",
          "Question: How do you troubleshoot Cron and Scheduling?",
          "Answer: Cron environment interactive shell la undadu; overlapping jobs and missed run windows possible. Use absolute paths, explicit environment, locking, timeout, logs, alerting and backup verification."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Schedule a harmless script every minute in lab, capture output, then remove crontab entry.",
          "Use crontab -l and systemctl list-timers to inspect schedules; set absolute paths, redirect logs and define a safe lock to prevent overlapping runs.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Cron and Scheduling?",
        "answer": "cron time-based scheduler; crontab entries minute, hour, day, month and weekday fields use chesi recurring jobs schedule chesthayi. Log cleanup, backups, certificate checks and periodic health tasks automate cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Cron and Scheduling in production?",
        "answer": "Daily backup script 02:15 ki run ayi success/failure status monitoring ki publish chesthundi. Cron environment interactive shell la undadu; overlapping jobs and missed run windows possible. Use absolute paths, explicit environment, locking, timeout, logs, alerting and backup verification."
      }
    ],
    "handsOn": [
      "Schedule a harmless script every minute in lab, capture output, then remove crontab entry.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/logs-and-journalctl": {
    "summary": "Logs and journalctl gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Linux logs system events, kernel messages and service output ni record chesthayi. systemd journal structured metadata tho logs store chesthundi.",
    "diagram": {
      "title": "Logs and journalctl workflow",
      "nodes": [
        "Application/service writes stdout/stderr or syslog",
        "journald/log file",
        "query/filter by time, unit and priority"
      ],
      "explanation": "Logs and journalctl process ni layer-by-layer ardham chesukovali: Application/service writes stdout/stderr or syslog → journald/log file → query/filter by time, unit and priority."
    },
    "sections": [
      {
        "heading": "1. Logs and journalctl ante enti?",
        "paragraphs": [
          "Linux logs system events, kernel messages and service output ni record chesthayi. systemd journal structured metadata tho logs store chesthundi.",
          "Linux logs record kernel, authentication and service events; journald indexes structured records that operators can filter by unit, priority and time."
        ],
        "bullets": [
          "journal",
          "unit filter",
          "priority",
          "boot ID",
          "persistent vs volatile journal",
          "rotation",
          "syslog."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Incident timeline, failed service root cause and authentication events investigate cheyadaniki.",
          "Services write to stdout/stderr or syslog; journald collects records with metadata and journalctl queries them using time, unit, boot and priority filters."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Application/service writes stdout/stderr or syslog → journald/log file → query/filter by time, unit and priority. Services write to stdout/stderr or syslog; journald collects records with metadata and journalctl queries them using time, unit, boot and priority filters.",
          "Journal unit, priority, boot ID, timestamp, facility, persistent versus volatile journal and log rotation affect incident evidence."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Journal unit, priority, boot ID, timestamp, facility, persistent versus volatile journal and log rotation affect incident evidence."
        ],
        "bullets": [
          "journal",
          "unit filter",
          "priority",
          "boot ID",
          "persistent vs volatile journal",
          "rotation",
          "syslog."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands Logs and journalctl ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "journalctl -u nginx --since today; journalctl -p err; journalctl -f; journalctl -k; tail -n 100 /var/log/syslog; logger \"test event\"",
        "note": "Logs rotate or volatile storage reboot tarvatha disappear avvachu; timestamps/timezones align cheyyali."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Deployment taruvatha Nginx restart fail ayindi; exact timestamp range lo unit logs and config error inspect chestham.",
          "Trace a failed test service start by correlating systemd status, journal timestamps and the last configuration change."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Logs rotate or volatile storage reboot tarvatha disappear avvachu; timestamps/timezones align cheyyali.",
          "Trace a failed test service start by correlating systemd status, journal timestamps and the last configuration change."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Centralize important logs, set retention, restrict access and redact credentials/PII.",
          "Trace a failed test service start by correlating systemd status, journal timestamps and the last configuration change."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Journal unit, priority, boot ID, timestamp, facility, persistent versus volatile journal and log rotation affect incident evidence."
        ],
        "bullets": [
          "Question: What is Logs and journalctl in Linux?",
          "Answer: Linux logs system events, kernel messages and service output ni record chesthayi. systemd journal structured metadata tho logs store chesthundi. Incident timeline, failed service root cause and authentication events investigate cheyadaniki.",
          "Question: How do you troubleshoot Logs and journalctl?",
          "Answer: Logs rotate or volatile storage reboot tarvatha disappear avvachu; timestamps/timezones align cheyyali. Centralize important logs, set retention, restrict access and redact credentials/PII."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Generate logger event, find it with journalctl, filter by time and explain priority.",
          "Use journalctl -u service --since and -p err; preserve relevant time ranges before rotation and avoid clearing logs during incident response.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Logs and journalctl?",
        "answer": "Linux logs system events, kernel messages and service output ni record chesthayi. systemd journal structured metadata tho logs store chesthundi. Incident timeline, failed service root cause and authentication events investigate cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Logs and journalctl in production?",
        "answer": "Deployment taruvatha Nginx restart fail ayindi; exact timestamp range lo unit logs and config error inspect chestham. Logs rotate or volatile storage reboot tarvatha disappear avvachu; timestamps/timezones align cheyyali. Centralize important logs, set retention, restrict access and redact credentials/PII."
      }
    ],
    "handsOn": [
      "Generate logger event, find it with journalctl, filter by time and explain priority.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/memory-and-cpu-monitoring": {
    "summary": "Memory and CPU Monitoring gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. CPU monitoring utilization, load and process scheduling pressure ni measure chesthundi. Memory monitoring RAM, cache, swap and OOM behavior ni track chesthundi.",
    "diagram": {
      "title": "Memory and CPU Monitoring workflow",
      "nodes": [
        "Workload",
        "scheduler and memory manager",
        "system metrics",
        "process-level evidence"
      ],
      "explanation": "Memory and CPU Monitoring process ni layer-by-layer ardham chesukovali: Workload → scheduler and memory manager → system metrics → process-level evidence."
    },
    "sections": [
      {
        "heading": "1. Memory and CPU Monitoring ante enti?",
        "paragraphs": [
          "CPU monitoring utilization, load and process scheduling pressure ni measure chesthundi. Memory monitoring RAM, cache, swap and OOM behavior ni track chesthundi.",
          "CPU and memory monitoring identifies saturation, pressure, swapping and runaway processes that can slow applications or trigger OOM kills."
        ],
        "bullets": [
          "load average",
          "user/system/iowait CPU",
          "RSS",
          "page cache",
          "swap",
          "OOM killer",
          "pressure stall information."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Slow application CPU saturation, memory leak or OOM kill valla vachinda ani identify cheyadaniki.",
          "The scheduler allocates CPU time; virtual memory maps process pages, reclaim and swap handle pressure, while cgroups can impose workload limits."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Workload → scheduler and memory manager → system metrics → process-level evidence. The scheduler allocates CPU time; virtual memory maps process pages, reclaim and swap handle pressure, while cgroups can impose workload limits.",
          "Load average is not CPU percentage; RSS, cache, swap, PSI, OOM killer and cgroup limits describe different resource signals."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Load average is not CPU percentage; RSS, cache, swap, PSI, OOM killer and cgroup limits describe different resource signals."
        ],
        "bullets": [
          "load average",
          "user/system/iowait CPU",
          "RSS",
          "page cache",
          "swap",
          "OOM killer",
          "pressure stall information."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Kindha commands Memory and CPU Monitoring ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "top; uptime; mpstat 1; vmstat 1; free -h; ps -eo pid,comm,%cpu,%mem --sort=-%mem | head; cat /proc/meminfo; dmesg -T | grep -i oom",
        "note": "Linux free memory lo cache include avuthundi; free memory low ani alone memory failure conclude cheyyakudadhu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Java service high memory use chesthundi; heap metrics, RSS, swap and OOM logs compare chesi root cause isolate chestham.",
          "Diagnose a test application with rising memory use by comparing process RSS, container limits and OOM events before changing capacity."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Linux free memory lo cache include avuthundi; free memory low ani alone memory failure conclude cheyyakudadhu.",
          "Diagnose a test application with rising memory use by comparing process RSS, container limits and OOM events before changing capacity."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Correlate metrics over time, set realistic alerts, use cgroups limits and inspect application heap separately.",
          "Diagnose a test application with rising memory use by comparing process RSS, container limits and OOM events before changing capacity."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Load average is not CPU percentage; RSS, cache, swap, PSI, OOM killer and cgroup limits describe different resource signals."
        ],
        "bullets": [
          "Question: What is Memory and CPU Monitoring in Linux?",
          "Answer: CPU monitoring utilization, load and process scheduling pressure ni measure chesthundi. Memory monitoring RAM, cache, swap and OOM behavior ni track chesthundi. Slow application CPU saturation, memory leak or OOM kill valla vachinda ani identify cheyadaniki.",
          "Question: How do you troubleshoot Memory and CPU Monitoring?",
          "Answer: Linux free memory lo cache include avuthundi; free memory low ani alone memory failure conclude cheyyakudadhu. Correlate metrics over time, set realistic alerts, use cgroups limits and inspect application heap separately."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Run controlled CPU/memory test in VM and observe top, free, vmstat; stop test safely.",
          "Compare uptime, vmstat, free -h, ps and top over time; inspect cgroup limits and kernel OOM messages before resizing instances.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Memory and CPU Monitoring?",
        "answer": "CPU monitoring utilization, load and process scheduling pressure ni measure chesthundi. Memory monitoring RAM, cache, swap and OOM behavior ni track chesthundi. Slow application CPU saturation, memory leak or OOM kill valla vachinda ani identify cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Memory and CPU Monitoring in production?",
        "answer": "Java service high memory use chesthundi; heap metrics, RSS, swap and OOM logs compare chesi root cause isolate chestham. Linux free memory lo cache include avuthundi; free memory low ani alone memory failure conclude cheyyakudadhu. Correlate metrics over time, set realistic alerts, use cgroups limits and inspect application heap separately."
      }
    ],
    "handsOn": [
      "Run controlled CPU/memory test in VM and observe top, free, vmstat; stop test safely.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/linux-security": {
    "summary": "Linux Security gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Linux security users, permissions, authentication, patching, network exposure and audit controls combine chesi host protect chesthundi.",
    "diagram": {
      "title": "Linux Security workflow",
      "nodes": [
        "Identity verification",
        "authorization",
        "process isolation",
        "network filtering",
        "audit and patch cycle"
      ],
      "explanation": "Linux Security process ni layer-by-layer ardham chesukovali: Identity verification → authorization → process isolation → network filtering → audit and patch cycle."
    },
    "sections": [
      {
        "heading": "1. Linux Security ante enti?",
        "paragraphs": [
          "Linux security users, permissions, authentication, patching, network exposure and audit controls combine chesi host protect chesthundi.",
          "Linux host security combines identity, authentication, authorization, patching, network controls and audit evidence to reduce compromise risk."
        ],
        "bullets": [
          "least privilege",
          "sudoers",
          "PAM",
          "SSH hardening",
          "patching",
          "SELinux/AppArmor",
          "auditd",
          "file integrity."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Cloud VM and production worker nodes compromise risk reduce cheyadaniki.",
          "A login is authenticated, access is authorized through credentials and policy, processes run with privileges, network filters restrict exposure and audit tools record activity."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Identity verification → authorization → process isolation → network filtering → audit and patch cycle. A login is authenticated, access is authorized through credentials and policy, processes run with privileges, network filters restrict exposure and audit tools record activity.",
          "sudoers, PAM, SSH hardening, SELinux/AppArmor, auditd, patch cadence and least privilege protect different parts of the host."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "sudoers, PAM, SSH hardening, SELinux/AppArmor, auditd, patch cadence and least privilege protect different parts of the host."
        ],
        "bullets": [
          "least privilege",
          "sudoers",
          "PAM",
          "SSH hardening",
          "patching",
          "SELinux/AppArmor",
          "auditd",
          "file integrity."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Use sudo -l, sshd -T, getenforce or aa-status and audit logs to inspect controls; validate changes in a console-backed test host before reload."
        ],
        "code": "sudo -l; passwd -S user; ss -tulpn; sudo ufw status; last; lastb; sudo visudo; sudo sshd -T | grep permitrootlogin",
        "note": "Disabling security controls blindly can break services; lockout risk before SSH config reload."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Production EC2 baseline lo SSH key-only access, restricted sudo, security updates and audit logging enforce chestham.",
          "Audit a disposable VM for privileged accounts, SSH settings, listening ports and pending security updates; document each remediation."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Disabling security controls blindly can break services; lockout risk before SSH config reload.",
          "Audit a disposable VM for privileged accounts, SSH settings, listening ports and pending security updates; document each remediation."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use MFA/bastion where applicable, no shared root, patch cadence, tested backups and centralized audit logs.",
          "Audit a disposable VM for privileged accounts, SSH settings, listening ports and pending security updates; document each remediation."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "sudoers, PAM, SSH hardening, SELinux/AppArmor, auditd, patch cadence and least privilege protect different parts of the host."
        ],
        "bullets": [
          "Question: What is Linux Security in Linux?",
          "Answer: Linux security users, permissions, authentication, patching, network exposure and audit controls combine chesi host protect chesthundi. Cloud VM and production worker nodes compromise risk reduce cheyadaniki.",
          "Question: How do you troubleshoot Linux Security?",
          "Answer: Disabling security controls blindly can break services; lockout risk before SSH config reload. Use MFA/bastion where applicable, no shared root, patch cadence, tested backups and centralized audit logs."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Audit a disposable Linux VM: users, sudo rights, SSH settings, listening ports and pending updates.",
          "Use sudo -l, sshd -T, getenforce or aa-status and audit logs to inspect controls; validate changes in a console-backed test host before reload.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Linux Security?",
        "answer": "Linux security users, permissions, authentication, patching, network exposure and audit controls combine chesi host protect chesthundi. Cloud VM and production worker nodes compromise risk reduce cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Linux Security in production?",
        "answer": "Production EC2 baseline lo SSH key-only access, restricted sudo, security updates and audit logging enforce chestham. Disabling security controls blindly can break services; lockout risk before SSH config reload. Use MFA/bastion where applicable, no shared root, patch cadence, tested backups and centralized audit logs."
      }
    ],
    "handsOn": [
      "Audit a disposable Linux VM: users, sudo rights, SSH settings, listening ports and pending updates.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/firewall-basics": {
    "summary": "Firewall Basics gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Host firewall inbound/outbound packets ni policy rules prakaram allow or deny chesthundi. Linux lo nftables modern framework; ufw/firewalld management layers provide chesthayi.",
    "diagram": {
      "title": "Firewall Basics workflow",
      "nodes": [
        "Packet arrives",
        "interface/connection tracking",
        "ordered firewall rules",
        "accept/drop/reject"
      ],
      "explanation": "Firewall Basics process ni layer-by-layer ardham chesukovali: Packet arrives → interface/connection tracking → ordered firewall rules → accept/drop/reject."
    },
    "sections": [
      {
        "heading": "1. Firewall Basics ante enti?",
        "paragraphs": [
          "Host firewall inbound/outbound packets ni policy rules prakaram allow or deny chesthundi. Linux lo nftables modern framework; ufw/firewalld management layers provide chesthayi.",
          "A host firewall filters inbound and outbound packets using source, destination, protocol, port, interface and connection state."
        ],
        "bullets": [
          "inbound/outbound",
          "stateful",
          "rule order",
          "zone",
          "source CIDR",
          "TCP/UDP",
          "nftables",
          "ufw",
          "firewalld."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Only required ports expose cheyadaniki and lateral access restrict cheyadaniki.",
          "Packets traverse network hooks and ordered rules; the firewall accepts, drops or rejects traffic according to policy and connection tracking."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Packet arrives → interface/connection tracking → ordered firewall rules → accept/drop/reject. Packets traverse network hooks and ordered rules; the firewall accepts, drops or rejects traffic according to policy and connection tracking.",
          "nftables is the modern packet-filtering framework; ufw and firewalld manage rules through higher-level interfaces and zones."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "nftables is the modern packet-filtering framework; ufw and firewalld manage rules through higher-level interfaces and zones."
        ],
        "bullets": [
          "inbound/outbound",
          "stateful",
          "rule order",
          "zone",
          "source CIDR",
          "TCP/UDP",
          "nftables",
          "ufw",
          "firewalld."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Inspect nft list ruleset or firewall-cmd --list-all first; add a narrow allow rule before restrictive rules and retain console access to prevent SSH lockout."
        ],
        "code": "sudo ufw status verbose; sudo ufw allow 22/tcp; sudo ufw allow from 10.0.0.0/8 to any port 8080 proto tcp; sudo firewall-cmd --list-all; sudo nft list ruleset",
        "note": "Remote SSH session ki firewall rule change chesi port 22 block chesthe lockout avutharu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Application server lo load balancer subnet nundi 8080 allow chesi public internet access deny chestham.",
          "Allow a test application port only from a private subnet on a disposable VM and verify both permitted and blocked connections."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Remote SSH session ki firewall rule change chesi port 22 block chesthe lockout avutharu.",
          "Allow a test application port only from a private subnet on a disposable VM and verify both permitted and blocked connections."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Keep console/rollback path, add allow rule before deny, restrict source ranges and verify from external host.",
          "Allow a test application port only from a private subnet on a disposable VM and verify both permitted and blocked connections."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "nftables is the modern packet-filtering framework; ufw and firewalld manage rules through higher-level interfaces and zones."
        ],
        "bullets": [
          "Question: What is Firewall Basics in Linux?",
          "Answer: Host firewall inbound/outbound packets ni policy rules prakaram allow or deny chesthundi. Linux lo nftables modern framework; ufw/firewalld management layers provide chesthayi. Only required ports expose cheyadaniki and lateral access restrict cheyadaniki.",
          "Question: How do you troubleshoot Firewall Basics?",
          "Answer: Remote SSH session ki firewall rule change chesi port 22 block chesthe lockout avutharu. Keep console/rollback path, add allow rule before deny, restrict source ranges and verify from external host."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "In a disposable VM allow a test port only from a private subnet; verify allowed and denied connection.",
          "Inspect nft list ruleset or firewall-cmd --list-all first; add a narrow allow rule before restrictive rules and retain console access to prevent SSH lockout.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Firewall Basics?",
        "answer": "Host firewall inbound/outbound packets ni policy rules prakaram allow or deny chesthundi. Linux lo nftables modern framework; ufw/firewalld management layers provide chesthayi. Only required ports expose cheyadaniki and lateral access restrict cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Firewall Basics in production?",
        "answer": "Application server lo load balancer subnet nundi 8080 allow chesi public internet access deny chestham. Remote SSH session ki firewall rule change chesi port 22 block chesthe lockout avutharu. Keep console/rollback path, add allow rule before deny, restrict source ranges and verify from external host."
      }
    ],
    "handsOn": [
      "In a disposable VM allow a test port only from a private subnet; verify allowed and denied connection.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  },
  "linux/troubleshooting-linux": {
    "summary": "Troubleshooting Linux gurinchi ee lesson Linux server administration and DevOps operations perspective lo explain chesthundi. Linux troubleshooting evidence-first process: symptom define, scope identify, layers isolate, root cause verify, reversible fix and monitor.",
    "diagram": {
      "title": "Troubleshooting Linux workflow",
      "nodes": [
        "Alert/symptom",
        "host/service/resource/network evidence",
        "hypothesis",
        "safe test",
        "corrective change",
        "validation"
      ],
      "explanation": "Troubleshooting Linux process ni layer-by-layer ardham chesukovali: Alert/symptom → host/service/resource/network evidence → hypothesis → safe test → corrective change → validation."
    },
    "sections": [
      {
        "heading": "1. Troubleshooting Linux ante enti?",
        "paragraphs": [
          "Linux troubleshooting evidence-first process: symptom define, scope identify, layers isolate, root cause verify, reversible fix and monitor.",
          "Linux troubleshooting is an evidence-led process: define impact, identify the affected layer, test a hypothesis, make a reversible correction and validate recovery."
        ],
        "bullets": [
          "symptom",
          "impact",
          "timeline",
          "baseline",
          "hypothesis",
          "root cause",
          "mitigation",
          "rollback",
          "post-incident action."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Production incident lo guess-based changes avoid chesi downtime reduce cheyadaniki.",
          "Operators correlate application symptoms with process, service, resource, filesystem, network and kernel evidence before selecting a remediation."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Alert/symptom → host/service/resource/network evidence → hypothesis → safe test → corrective change → validation. Operators correlate application symptoms with process, service, resource, filesystem, network and kernel evidence before selecting a remediation.",
          "Timeline, blast radius, baseline, hypothesis, root cause, mitigation, rollback and post-incident action make troubleshooting auditable."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Timeline, blast radius, baseline, hypothesis, root cause, mitigation, rollback and post-incident action make troubleshooting auditable."
        ],
        "bullets": [
          "symptom",
          "impact",
          "timeline",
          "baseline",
          "hypothesis",
          "root cause",
          "mitigation",
          "rollback",
          "post-incident action."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Capture date, hostname, systemctl status, journal errors, disk, memory, sockets and kernel messages; change one variable at a time and retain command exit codes."
        ],
        "code": "date; hostname; uptime; systemctl --failed; journalctl -p err --since -1h; df -h; df -i; free -h; top; ss -tulpn; dmesg -T | tail -n 50",
        "note": "Random restarts/log deletion/permission 777 can hide evidence or worsen outage."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Website 502 issue lo Nginx status, upstream port, application logs, disk and recent deployment compare chestham.",
          "Simulate a stopped test service and a full temporary filesystem in a disposable VM; diagnose each without deleting logs or restarting unrelated services."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Random restarts/log deletion/permission 777 can hide evidence or worsen outage.",
          "Simulate a stopped test service and a full temporary filesystem in a disposable VM; diagnose each without deleting logs or restarting unrelated services."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Capture timestamps, preserve logs, check change history, make one change at a time and verify user-facing health.",
          "Simulate a stopped test service and a full temporary filesystem in a disposable VM; diagnose each without deleting logs or restarting unrelated services."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Timeline, blast radius, baseline, hypothesis, root cause, mitigation, rollback and post-incident action make troubleshooting auditable."
        ],
        "bullets": [
          "Question: What is Troubleshooting Linux in Linux?",
          "Answer: Linux troubleshooting evidence-first process: symptom define, scope identify, layers isolate, root cause verify, reversible fix and monitor. Production incident lo guess-based changes avoid chesi downtime reduce cheyadaniki.",
          "Question: How do you troubleshoot Troubleshooting Linux?",
          "Answer: Random restarts/log deletion/permission 777 can hide evidence or worsen outage. Capture timestamps, preserve logs, check change history, make one change at a time and verify user-facing health."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable Linux VM/WSL lo ee tasks complete cheyyandi. Production system lo experiments cheyyakandi."
        ],
        "bullets": [
          "Simulate stopped test service and full temporary filesystem in disposable lab; diagnose without deleting evidence.",
          "Capture date, hostname, systemctl status, journal errors, disk, memory, sockets and kernel messages; change one variable at a time and retain command exit codes.",
          "Write a short runbook with pre-check, action, validation and rollback steps."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Troubleshooting Linux?",
        "answer": "Linux troubleshooting evidence-first process: symptom define, scope identify, layers isolate, root cause verify, reversible fix and monitor. Production incident lo guess-based changes avoid chesi downtime reduce cheyadaniki."
      },
      {
        "question": "How do you use and troubleshoot Troubleshooting Linux in production?",
        "answer": "Website 502 issue lo Nginx status, upstream port, application logs, disk and recent deployment compare chestham. Random restarts/log deletion/permission 777 can hide evidence or worsen outage. Capture timestamps, preserve logs, check change history, make one change at a time and verify user-facing health."
      }
    ],
    "handsOn": [
      "Simulate stopped test service and full temporary filesystem in disposable lab; diagnose without deleting evidence.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  }
};
