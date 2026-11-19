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
      "explanation": "Users and Groups process ni layer-by-layer ardham chesukovali: User/group database → authentication → group membership → file/service permission check. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Users and Groups ante enti?",
        "paragraphs": [
          "Linux lo user accounts individual identity ni, groups shared permissions ni represent chesthayi. User ID (UID), Group ID (GID), primary group and supplementary groups important.",
          "Simple ga cheppalante, Users and Groups anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: User/group database → authentication → group membership → file/service permission check. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Kindha commands Users and Groups ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "id; whoami; getent passwd; getent group; sudo useradd -m deployer; sudo passwd deployer; sudo groupadd developers; sudo usermod -aG developers deployer",
        "note": "Duplicate UID, missing home directory, or usermod without -a can cause access problems. Verify with id deployer; never share personal accounts."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Production lo deployer user ni create chesi developers group lo add chestham; shared deployment directory ki group access istham.",
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Duplicate UID, missing home directory, or usermod without -a can cause access problems. Verify with id deployer; never share personal accounts.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use least privilege, disable unused accounts, prefer sudo audit trails, and avoid direct root SSH login.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Users and Groups and explain each output field.",
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
      "explanation": "File Permissions process ni layer-by-layer ardham chesukovali: Process user/group identity → inode permission bits → access decision. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. File Permissions ante enti?",
        "paragraphs": [
          "Linux file permissions read (r), write (w), execute (x) ni owner, group, others ki separately set chesthayi. Directory execute permission ante traverse/search permission.",
          "Simple ga cheppalante, File Permissions anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Process user/group identity → inode permission bits → access decision. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Kindha commands File Permissions ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "ls -l; stat app.sh; chmod 640 config.yml; chmod u+x deploy.sh; chmod 750 deploy.sh; umask",
        "note": "chmod 777 quick fix kaadu; directory execute permission miss aithe file kanipinchina access fail avvachu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Application config file ni owner read/write, approved group read, others no access laga set chestham.",
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "chmod 777 quick fix kaadu; directory execute permission miss aithe file kanipinchina access fail avvachu.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Secrets files ki 600 or stricter, directories ki appropriate 700/750, service account ownership verify cheyyali.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for File Permissions and explain each output field.",
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
      "explanation": "Ownership and ACL process ni layer-by-layer ardham chesukovali: Filesystem inode ownership → mode bits → ACL evaluation. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Ownership and ACL ante enti?",
        "paragraphs": [
          "Ownership lo each file ki user owner and group owner untaru. POSIX ACL standard owner/group/other bits kanna granular user/group permissions ivvagaladu.",
          "Simple ga cheppalante, Ownership and ACL anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Filesystem inode ownership → mode bits → ACL evaluation. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "ACL mask valla configured permission effective ga reduce avvachu; recursive ACL changes wide impact create chesthayi.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Grant only required ACL entries, review with getfacl, document default ACLs, avoid broad recursive chown in production.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Ownership and ACL and explain each output field.",
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
      "explanation": "Linux Commands process ni layer-by-layer ardham chesukovali: Shell parses command → executable receives arguments → kernel operations → stdout/stderr and exit status. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Linux Commands ante enti?",
        "paragraphs": [
          "Linux commands shell dwara files, processes, storage, networking and services ni inspect/manage chesthayi. Command options and exit codes automation lo critical.",
          "Simple ga cheppalante, Linux Commands anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Shell parses command → executable receives arguments → kernel operations → stdout/stderr and exit status. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Kindha commands Linux Commands ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "pwd; ls -lah; find /var/log -type f; df -h; free -h; ps aux; systemctl status ssh; echo $?",
        "note": "Destructive commands like rm, dd and find -delete ni path verify cheyakunda run cheyyakudadhu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Incident start lo hostname, uptime, disk, memory and failed services collect chesi evidence bundle prepare chestham.",
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Destructive commands like rm, dd and find -delete ni path verify cheyakunda run cheyyakudadhu.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Prefer read-only diagnostics first, quote paths, use sudo only when needed, and capture command output with timestamps.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Linux Commands and explain each output field.",
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
      "explanation": "Text Processing process ni layer-by-layer ardham chesukovali: Input stream/file → filter or transform utility → stdout/file → next analysis step. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Text Processing ante enti?",
        "paragraphs": [
          "Text processing tools logs and configuration files nundi relevant lines, columns and patterns extract, transform and summarize chesthayi.",
          "Simple ga cheppalante, Text Processing anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Input stream/file → filter or transform utility → stdout/file → next analysis step. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Kindha commands Text Processing ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "head -n 20 app.log; tail -f app.log; cut -d' ' -f1 access.log; sort names.txt; uniq -c; wc -l app.log; tr '[:lower:]' '[:upper:]' < input.txt",
        "note": "uniq mundu sort cheyyakapothe non-adjacent duplicates count miss avuthayi; delimiter assumptions validate cheyyali."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Nginx access log lo request counts extract chesi top endpoints identify chestham.",
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "uniq mundu sort cheyyakapothe non-adjacent duplicates count miss avuthayi; delimiter assumptions validate cheyyali.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Work on copied logs, preserve originals, handle spaces/encoding, and avoid exposing secrets in output.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Text Processing and explain each output field.",
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
      "explanation": "Grep, Sed and Awk process ni layer-by-layer ardham chesukovali: Pattern selection → optional stream transformation → field extraction/aggregation. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Grep, Sed and Awk ante enti?",
        "paragraphs": [
          "grep pattern matching, sed stream editing, awk field-based text processing kosam use chestham. Ee tools shell pipelines lo logs/configs analyze cheyadaniki core utilities.",
          "Simple ga cheppalante, Grep, Sed and Awk anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Pattern selection → optional stream transformation → field extraction/aggregation. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Unescaped regex special characters and in-place sed edits can alter files unexpectedly; test on copy first.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use grep to locate, sed to preview transformations, awk to extract columns; redact tokens and personal data.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Grep, Sed and Awk and explain each output field.",
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
      "explanation": "Pipes and Redirection process ni layer-by-layer ardham chesukovali: Producer stdout → pipe buffer → consumer stdin; redirection shell file descriptors ni set chesthundi. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Pipes and Redirection ante enti?",
        "paragraphs": [
          "Pipe `|` oka command stdout ni next command stdin ki pampisthundi. Redirection stdout/stderr ni file or stream ki route chesthundi.",
          "Simple ga cheppalante, Pipes and Redirection anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Producer stdout → pipe buffer → consumer stdin; redirection shell file descriptors ni set chesthundi. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "`>` existing file truncate chesthundi; command order of `2>&1` matters; pipe default ga only stdout pass chesthundi.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use `set -o pipefail` in scripts, protect output paths, and avoid logging secrets.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Pipes and Redirection and explain each output field.",
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
      "explanation": "Shell Scripting process ni layer-by-layer ardham chesukovali: Script interpreter → variable/command evaluation → control flow → exit status. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Shell Scripting ante enti?",
        "paragraphs": [
          "Shell script commands ni executable file lo sequence/logic ga organize chesi system administration tasks automate chesthundi.",
          "Simple ga cheppalante, Shell Scripting anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Script interpreter → variable/command evaluation → control flow → exit status. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Kindha commands Shell Scripting ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "#!/usr/bin/env bash; set -euo pipefail; echo \"Host: $(hostname)\"; date; df -h /; chmod +x health-check.sh; ./health-check.sh",
        "note": "Unquoted variables, unchecked commands and unsafe rm paths scripts ni dangerous ga chesthayi."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "CI runner deployment mundu disk, service and endpoint checks execute chesi failure aithe pipeline stop chestham.",
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Unquoted variables, unchecked commands and unsafe rm paths scripts ni dangerous ga chesthayi.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Quote variables, validate inputs, use absolute paths, trap cleanup, log actions and test in disposable environment.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Shell Scripting and explain each output field.",
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
      "explanation": "Bash Variables process ni layer-by-layer ardham chesukovali: Assignment → expansion → optional export to child process → command consumes value. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Bash Variables ante enti?",
        "paragraphs": [
          "Bash variables shell session lo strings and command results store chesthayi. Environment variables child processes ki export chesthe inherit avuthayi.",
          "Simple ga cheppalante, Bash Variables anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Assignment → expansion → optional export to child process → command consumes value. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Kindha commands Bash Variables ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "APP_ENV=staging; echo \"$APP_ENV\"; export APP_ENV; printf '%s\\n' \"$PATH\"; readonly REGION=ap-south-1; unset APP_ENV",
        "note": "Spaces unna values quote cheyyali; secrets shell history or process arguments lo leak avvakunda chusukovali."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Same deploy script dev/staging/prod lo APP_ENV and artifact version batti behavior select chesthundi.",
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Spaces unna values quote cheyyali; secrets shell history or process arguments lo leak avvakunda chusukovali.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Inject secrets from approved secret store, avoid hardcoding, set defaults safely with `${VAR:-default}`.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Bash Variables and explain each output field.",
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
      "explanation": "Conditions and Loops process ni layer-by-layer ardham chesukovali: Condition evaluates exit status/expression → branch or loop body executes → next iteration/exit. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Conditions and Loops ante enti?",
        "paragraphs": [
          "Bash conditions decisions execute chesthayi; loops commands ni list or condition batti repeat chesthayi. Exit codes shell automation lo true/false decision ki common.",
          "Simple ga cheppalante, Conditions and Loops anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Condition evaluates exit status/expression → branch or loop body executes → next iteration/exit. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "`[ $VAR = x ]` empty value tho fail avvachu; use quotes or `[[ ]]`; infinite while loops avoid cheyyali.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Validate input, quote expansions, add timeout/retry limits, and make loops safe for filenames with spaces.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Conditions and Loops and explain each output field.",
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
      "explanation": "Processes and Signals process ni layer-by-layer ardham chesukovali: Kernel creates process → scheduler allocates CPU → process handles signals → exits or changes state. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Processes and Signals ante enti?",
        "paragraphs": [
          "Process ante running program instance; PID unique process identifier. Signals process ki terminate, reload or control request pampisthayi.",
          "Simple ga cheppalante, Processes and Signals anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Kernel creates process → scheduler allocates CPU → process handles signals → exits or changes state. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Blind `kill -9` data loss or interrupted writes cause cheyochu; PID reuse risk undi.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Identify owner and command before termination; prefer SIGTERM and service manager; capture logs and impact.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Processes and Signals and explain each output field.",
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
      "explanation": "Systemd and Services process ni layer-by-layer ardham chesukovali: Boot target → dependency ordering → unit activation → process supervision → journal logging. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Systemd and Services ante enti?",
        "paragraphs": [
          "systemd Linux systems lo boot and service manager ga units ni start, stop, order, monitor chesthundi. Service unit application process lifecycle define chesthundi.",
          "Simple ga cheppalante, Systemd and Services anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Boot target → dependency ordering → unit activation → process supervision → journal logging. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "`enable` service ni immediate ga start cheyyadu; unit edit tarvatha daemon-reload required; restart downtime cause cheyochu.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Before restart inspect status/config, use reload when supported, define restart policy and monitor health.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Systemd and Services and explain each output field.",
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
      "explanation": "Package Management process ni layer-by-layer ardham chesukovali: Repository metadata → dependency resolution → package download/signature verification → install scripts/files. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Package Management ante enti?",
        "paragraphs": [
          "Package manager software packages install, update, verify and remove chesthundi while dependencies and repository metadata manage chesthundi.",
          "Simple ga cheppalante, Package Management anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Repository metadata → dependency resolution → package download/signature verification → install scripts/files. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Kindha commands Package Management ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "apt-cache policy nginx; apt list --installed; dnf info nginx; rpm -qi nginx; dpkg -l nginx; sudo apt install nginx",
        "note": "Unplanned major upgrades production compatibility break cheyochu; untrusted repositories supply-chain risk."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Golden image build lo approved Nginx version install chesi package inventory record chestham.",
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Unplanned major upgrades production compatibility break cheyochu; untrusted repositories supply-chain risk.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use approved repositories, pin/test versions, patch in maintenance windows and record package inventory.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Package Management and explain each output field.",
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
      "explanation": "APT and YUM/DNF process ni layer-by-layer ardham chesukovali: Refresh repository metadata → resolve dependencies → download signed packages → install/update. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. APT and YUM/DNF ante enti?",
        "paragraphs": [
          "APT Debian/Ubuntu distributions lo `.deb` packages manage chesthundi; YUM/DNF RPM-based distributions lo packages manage chesthayi. Commands similar purpose serve chesthayi but repositories and package formats differ.",
          "Simple ga cheppalante, APT and YUM/DNF anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Refresh repository metadata → resolve dependencies → download signed packages → install/update. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Ubuntu commands RHEL host lo blindly run cheyyakudadhu; distro and major version first identify cheyyali.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Check `/etc/os-release`, verify repository origin and package version, snapshot critical hosts before upgrades.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for APT and YUM/DNF and explain each output field.",
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
      "explanation": "Disk and Partition Management process ni layer-by-layer ardham chesukovali: Block device → partition table → filesystem creation → mount point → application writes. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Disk and Partition Management ante enti?",
        "paragraphs": [
          "Disk management block devices, partitions, filesystems and capacity ni configure/monitor chesthundi. Partition disk ni logical regions ga divide chesthundi.",
          "Simple ga cheppalante, Disk and Partition Management anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Block device → partition table → filesystem creation → mount point → application writes. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Wrong disk select chesi mkfs/partition commands run chesthe data permanently loss avvachu.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Confirm device serial/size, backup/snapshot, maintenance approval and never format mounted production volume.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Disk and Partition Management and explain each output field.",
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
      "explanation": "LVM process ni layer-by-layer ardham chesukovali: Disk/partition → PV → VG storage pool → LV virtual block device → filesystem. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. LVM ante enti?",
        "paragraphs": [
          "Logical Volume Manager physical volumes (PV), volume groups (VG), logical volumes (LV) layers create chesi storage flexible ga allocate/extend cheyadaniki help chesthundi.",
          "Simple ga cheppalante, LVM anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Disk/partition → PV → VG storage pool → LV virtual block device → filesystem. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "VG free space, filesystem support and backup verify cheyakunda LV resize cheyyakudadhu; shrink risky.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Monitor VG free capacity, snapshot/backup, confirm filesystem type and follow vendor-supported resize procedure.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for LVM and explain each output field.",
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
      "explanation": "Mounting and fstab process ni layer-by-layer ardham chesukovali: Device/UUID → filesystem driver → mount point → process path access. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Mounting and fstab ante enti?",
        "paragraphs": [
          "Mount operation filesystem ni directory path ki attach chesthundi. `/etc/fstab` boot-time mount configuration store chesthundi.",
          "Simple ga cheppalante, Mounting and fstab anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Device/UUID → filesystem driver → mount point → process path access. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Wrong fstab entry boot delay/emergency mode create cheyochu; device names can change across boots.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use UUID not unstable device names, validate `mount -a` before reboot, keep console access and backup fstab.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Mounting and fstab and explain each output field.",
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
      "explanation": "Networking Commands process ni layer-by-layer ardham chesukovali: Interface/IP → route lookup → DNS resolution → TCP connection → application response. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Networking Commands ante enti?",
        "paragraphs": [
          "Linux networking commands interfaces, routes, DNS, sockets and connectivity ni inspect chesthayi. Different tools different layer diagnose chesthayi.",
          "Simple ga cheppalante, Networking Commands anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Interface/IP → route lookup → DNS resolution → TCP connection → application response. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Kindha commands Networking Commands ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "ip addr; ip route; ss -tulpn; getent hosts example.com; resolvectl status; ping -c 4 8.8.8.8; curl -I https://example.com",
        "note": "Ping success HTTP success ani guarantee kaadu; ICMP blocked undochu; DNS cache/resolver config vary avuthayi."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Pod/VM nundi database endpoint reach avvatledu; route, DNS resolution and TCP port individually test chestham.",
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Ping success HTTP success ani guarantee kaadu; ICMP blocked undochu; DNS cache/resolver config vary avuthayi.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use layered tests, avoid changing routes/firewall during diagnosis, redact internal IPs in public reports.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Networking Commands and explain each output field.",
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
      "explanation": "SSH and SCP process ni layer-by-layer ardham chesukovali: Client resolves host → TCP port 22 → key exchange/host verification → user authentication → encrypted session. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. SSH and SCP ante enti?",
        "paragraphs": [
          "SSH encrypted remote login and command execution protocol. SCP SSH transport use chesi files copy chesthundi; modern OpenSSH scp internally SFTP protocol use cheyagaladu.",
          "Simple ga cheppalante, SSH and SCP anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Client resolves host → TCP port 22 → key exchange/host verification → user authentication → encrypted session. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Host key verification disable cheyyadam MITM risk; private key repo lo commit cheyyakudadhu.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use Ed25519 keys, passphrase/agent, pinned known_hosts, least-privilege deploy account and rotate keys.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for SSH and SCP and explain each output field.",
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
      "explanation": "Cron and Scheduling process ni layer-by-layer ardham chesukovali: Cron daemon reads schedule → launches command with limited environment → records output/logs. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Cron and Scheduling ante enti?",
        "paragraphs": [
          "cron time-based scheduler; crontab entries minute, hour, day, month and weekday fields use chesi recurring jobs schedule chesthayi.",
          "Simple ga cheppalante, Cron and Scheduling anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Cron daemon reads schedule → launches command with limited environment → records output/logs. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Cron environment interactive shell la undadu; overlapping jobs and missed run windows possible.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use absolute paths, explicit environment, locking, timeout, logs, alerting and backup verification.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Cron and Scheduling and explain each output field.",
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
      "explanation": "Logs and journalctl process ni layer-by-layer ardham chesukovali: Application/service writes stdout/stderr or syslog → journald/log file → query/filter by time, unit and priority. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Logs and journalctl ante enti?",
        "paragraphs": [
          "Linux logs system events, kernel messages and service output ni record chesthayi. systemd journal structured metadata tho logs store chesthundi.",
          "Simple ga cheppalante, Logs and journalctl anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Application/service writes stdout/stderr or syslog → journald/log file → query/filter by time, unit and priority. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Logs rotate or volatile storage reboot tarvatha disappear avvachu; timestamps/timezones align cheyyali.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Centralize important logs, set retention, restrict access and redact credentials/PII.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Logs and journalctl and explain each output field.",
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
      "explanation": "Memory and CPU Monitoring process ni layer-by-layer ardham chesukovali: Workload → scheduler and memory manager → system metrics → process-level evidence. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Memory and CPU Monitoring ante enti?",
        "paragraphs": [
          "CPU monitoring utilization, load and process scheduling pressure ni measure chesthundi. Memory monitoring RAM, cache, swap and OOM behavior ni track chesthundi.",
          "Simple ga cheppalante, Memory and CPU Monitoring anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Workload → scheduler and memory manager → system metrics → process-level evidence. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Linux free memory lo cache include avuthundi; free memory low ani alone memory failure conclude cheyyakudadhu.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Correlate metrics over time, set realistic alerts, use cgroups limits and inspect application heap separately.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Memory and CPU Monitoring and explain each output field.",
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
      "explanation": "Linux Security process ni layer-by-layer ardham chesukovali: Identity verification → authorization → process isolation → network filtering → audit and patch cycle. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Linux Security ante enti?",
        "paragraphs": [
          "Linux security users, permissions, authentication, patching, network exposure and audit controls combine chesi host protect chesthundi.",
          "Simple ga cheppalante, Linux Security anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Identity verification → authorization → process isolation → network filtering → audit and patch cycle. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Kindha commands Linux Security ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "sudo -l; passwd -S user; ss -tulpn; sudo ufw status; last; lastb; sudo visudo; sudo sshd -T | grep permitrootlogin",
        "note": "Disabling security controls blindly can break services; lockout risk before SSH config reload."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Production EC2 baseline lo SSH key-only access, restricted sudo, security updates and audit logging enforce chestham.",
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Disabling security controls blindly can break services; lockout risk before SSH config reload.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use MFA/bastion where applicable, no shared root, patch cadence, tested backups and centralized audit logs.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Linux Security and explain each output field.",
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
      "explanation": "Firewall Basics process ni layer-by-layer ardham chesukovali: Packet arrives → interface/connection tracking → ordered firewall rules → accept/drop/reject. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Firewall Basics ante enti?",
        "paragraphs": [
          "Host firewall inbound/outbound packets ni policy rules prakaram allow or deny chesthundi. Linux lo nftables modern framework; ufw/firewalld management layers provide chesthayi.",
          "Simple ga cheppalante, Firewall Basics anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Packet arrives → interface/connection tracking → ordered firewall rules → accept/drop/reject. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Kindha commands Firewall Basics ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "sudo ufw status verbose; sudo ufw allow 22/tcp; sudo ufw allow from 10.0.0.0/8 to any port 8080 proto tcp; sudo firewall-cmd --list-all; sudo nft list ruleset",
        "note": "Remote SSH session ki firewall rule change chesi port 22 block chesthe lockout avutharu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Application server lo load balancer subnet nundi 8080 allow chesi public internet access deny chestham.",
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Remote SSH session ki firewall rule change chesi port 22 block chesthe lockout avutharu.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Keep console/rollback path, add allow rule before deny, restrict source ranges and verify from external host.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Firewall Basics and explain each output field.",
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
      "explanation": "Troubleshooting Linux process ni layer-by-layer ardham chesukovali: Alert/symptom → host/service/resource/network evidence → hypothesis → safe test → corrective change → validation. Ee flow lo command output and system state verify cheyyadam important."
    },
    "sections": [
      {
        "heading": "1. Troubleshooting Linux ante enti?",
        "paragraphs": [
          "Linux troubleshooting evidence-first process: symptom define, scope identify, layers isolate, root cause verify, reversible fix and monitor.",
          "Simple ga cheppalante, Troubleshooting Linux anedi Linux host ni predictable ga operate cheyadaniki use ayye core concept. Technical terms ni command output tho connect chesi chudali."
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
          "DevOps engineer incident response, server provisioning, deployment automation and security review lo ee concept ni apply chesthadu."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Basic flow: Alert/symptom → host/service/resource/network evidence → hypothesis → safe test → corrective change → validation. Prati stage lo current state ni inspect chesi next action decide chestham.",
          "Command run chesinappudu output, exit code and target host context verify cheyyali; same command every distribution lo identical behavior ivvakapovachu."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo frequently use ayye terms ni clear ga understand cheskovali."
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
          "Kindha commands Troubleshooting Linux ni inspect/practice cheyadaniki. First read-only commands run chesi output ardham chesukondi; privileged or modifying commands ni disposable lab lo matrame test cheyyandi."
        ],
        "code": "date; hostname; uptime; systemctl --failed; journalctl -p err --since -1h; df -h; df -i; free -h; top; ss -tulpn; dmesg -T | tail -n 50",
        "note": "Random restarts/log deletion/permission 777 can hide evidence or worsen outage."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Website 502 issue lo Nginx status, upstream port, application logs, disk and recent deployment compare chestham.",
          "Production lo change mundu approval, backup/rollback and monitoring plan ready ga undali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Random restarts/log deletion/permission 777 can hide evidence or worsen outage.",
          "Troubleshooting lo exact timestamp, host, user, command exit status and relevant logs capture chesi one hypothesis at a time test cheyyali."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Capture timestamps, preserve logs, check change history, make one change at a time and verify user-facing health.",
          "Least privilege, auditable changes, secret protection and tested rollback ee topic ki mandatory operational habits."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition cheppadam tho aagakunda, enduku use chestham, workflow, practical command and production risk explain cheyyali."
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
          "Run the read-only inspection commands and record expected versus actual output.",
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
      "Execute safe inspection commands for Troubleshooting Linux and explain each output field.",
      "Document one failure symptom, evidence, safe correction, validation and rollback."
    ]
  }
};
