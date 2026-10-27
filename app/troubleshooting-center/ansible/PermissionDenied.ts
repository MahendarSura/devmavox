
export interface AnsiblePermissionDiagnosticStep {
  title: string;
  purpose: string;
  commands: string[];
  expectedEvidence: string[];
  interpretation: string[];
  nextAction: string[];
}

export interface AnsiblePermissionRootCause {
  cause: string;
  symptoms: string[];
  evidence: string[];
  diagnosis: string[];
  remediation: string[];
  validation: string[];
}

export interface AnsiblePermissionInterviewQuestion {
  question: string;
  answer: string;
  followUp: string;
}

export interface AnsiblePermissionGuide {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  summary: string;

  overview: {
    definition: string;
    concepts: string[];
    symptoms: string[];
    commonCauses: string[];
  };

  incidentScenario: {
    title: string;
    timeline: string[];
    impact: string[];
    initialHypotheses: string[];
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

  diagnosticWorkflow: AnsiblePermissionDiagnosticStep[];

  rootCausePlaybooks: AnsiblePermissionRootCause[];

  permissionConcepts: {
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

  interviewQuestions: AnsiblePermissionInterviewQuestion[];

  references: {
    title: string;
    url: string;
  }[];
}

export const ansiblePermissionDeniedGuide: AnsiblePermissionGuide = {
  title: "Ansible Permission Denied — Real Production Troubleshooting Guide",
  slug: "permission-denied",
  category: "Ansible",
  difficulty: "Advanced",
  summary:
    "A production-focused guide to SSH authentication failures, Linux ownership and mode bits, remote-user configuration, become and sudo failures, sudoers policy, SSH key permissions, CI/CD credentials, SELinux and ACL restrictions, immutable files, read-only mounts, cloud IAM, Ansible Vault, temporary directory failures, service management privileges, controlled recovery, incident reporting, prevention, and interview preparation.",

  overview: {
    definition:
      "An Ansible Permission denied failure means an operation was rejected by an access-control mechanism. The rejection may occur before a connection is established, while authenticating over SSH, when reading or writing a remote file, during privilege escalation, when invoking a service manager, or while accessing a cloud API. The exact error, command, execution identity, and affected resource determine the correct investigation path. SSH authentication failure, Linux filesystem permission denial, sudo policy rejection, and cloud IAM denial are different failure modes and must not be treated as interchangeable.",

    concepts: [
      "SSH authentication: verifies that the remote login identity can authenticate using an approved key, certificate, password, or supported authentication method.",
      "SSH authorization: determines whether the authenticated identity is allowed to log in under the target account and applicable SSH policy.",
      "Remote user: the account Ansible uses to establish its connection. The account may be selected by inventory variables, playbook variables, command-line options, or configuration.",
      "become: Ansible's privilege-escalation mechanism, commonly used to execute a task as root or another permitted account.",
      "become_user: the account a task attempts to become. It is separate from the SSH login user.",
      "sudo policy: defines which commands a user may execute with elevated privileges and under which conditions.",
      "sudoers validation: visudo checks sudoers syntax. A syntax-valid policy can still deny the command that Ansible needs.",
      "Linux owner and group: filesystem ownership affects whether a process can read, write, execute, or traverse a resource.",
      "Mode bits: read, write, and execute permissions apply to owner, group, and other users. Directory execute permission controls traversal.",
      "POSIX ACL: additional access-control entries can grant or restrict access beyond the basic owner/group/other mode bits.",
      "SSH private key: a credential used by an approved SSH authentication method. It must be protected and never copied into public logs.",
      "SSH authorized_keys: the remote user's configured public-key authorization file. Correct key material does not help if the account or SSH policy rejects it.",
      "SSH agent: can supply keys to an SSH client. CI runners may not have an agent or may expose a different set of keys from a developer workstation.",
      "Host key verification: verifies the remote server identity. Host-key errors are distinct from permission denial and should not be bypassed blindly.",
      "Remote temporary directory: Ansible may need a writable remote temporary location to stage module code. Mount restrictions, permissions, or disk conditions can prevent access.",
      "Privilege-escalation method: sudo, su, or another supported method may be configured. Each method has distinct requirements and failure modes.",
      "Non-interactive execution: CI jobs cannot reliably answer interactive password prompts unless credentials are supplied through an approved mechanism.",
      "become password: a credential used for privilege escalation where required. It must be managed through an approved secret mechanism.",
      "Ansible Vault: protects encrypted Ansible data. A Vault decryption failure is different from a remote operating-system permission failure.",
      "SELinux: mandatory access control can deny an operation even when ordinary Unix mode bits appear to allow it.",
      "AppArmor: a profile can restrict process access to files, capabilities, and other resources.",
      "Read-only filesystem: a write can fail even when mode bits appear permissive because the underlying mount does not permit writes.",
      "Immutable attribute: a filesystem attribute can prevent changes to a file despite apparently sufficient ordinary permissions.",
      "Linux capabilities: processes can have selected privileges without full root access. A required capability may be absent.",
      "Container identity: a container's effective UID/GID and mount configuration can differ from the host's identity and permissions.",
      "User namespaces: container IDs may map to different host IDs, affecting file ownership and write access.",
      "Cloud IAM: a cloud API can reject an operation based on identity, resource policy, role assignment, or organization policy.",
      "Least privilege: grant only the access needed for the approved operation rather than using unrestricted root or administrator privileges.",
      "Idempotency: rerunning a task is safe only when its effects and current state are understood. A permission error does not prove that earlier tasks made no changes.",
      "Audit evidence: authentication logs, sudo logs, provider audit records, and Ansible task output can identify which identity was denied and what it attempted to access."
    ],

    symptoms: [
      "SSH reports Permission denied (publickey).",
      "SSH reports Permission denied (publickey,password) or another authentication-method combination.",
      "Ansible connects to the host but a task fails while reading or writing a file.",
      "A task fails with a message indicating that the operation requires elevated privileges.",
      "become fails because sudo requires a password or rejects the user.",
      "A service restart fails because the remote account cannot manage the service.",
      "A deployment works manually as root but fails under the approved automation account.",
      "A CI job fails while the same playbook works from a developer workstation.",
      "A remote temporary-file operation fails because the configured path is inaccessible.",
      "A file operation is denied despite apparently correct mode bits.",
      "Cloud inventory or deployment operations return an authorization error.",
      "A containerized runner cannot access a mounted key, configuration file, or workspace.",
      "A task fails after an operating-system policy or SSH hardening change.",
      "Ansible fails on one host while the same task succeeds on others."
    ],

    commonCauses: [
      "Incorrect SSH username.",
      "Missing, incorrect, or unavailable SSH private key.",
      "SSH public key absent from the target account's authorized_keys file.",
      "SSH server policy rejects the configured authentication method.",
      "Incorrect ownership or permissions on SSH key files.",
      "Remote login account is locked, expired, or disallowed by policy.",
      "File ownership or mode bits deny the task operation.",
      "Parent directory lacks traversal permission.",
      "Missing become configuration or incorrect become_user.",
      "Sudoers policy does not authorize the required command.",
      "Interactive sudo password prompt cannot be satisfied in CI.",
      "Remote temporary directory is not writable.",
      "SELinux, AppArmor, ACL, immutable attributes, or read-only mounts block the operation.",
      "Container UID/GID mapping causes unexpected ownership.",
      "Cloud identity lacks the required API permission.",
      "Ansible Vault data cannot be decrypted because the approved Vault credential is unavailable.",
      "A runtime or execution-environment change altered credentials, policy, or task behavior."
    ]
  },

  incidentScenario: {
    title:
      "Production deployment begins failing with Permission denied after a pipeline or access-policy change",

    timeline: [
      "T-30 minutes: The previous release succeeds using the approved automation identity.",
      "T+00 minutes: The next pipeline starts against the intended production inventory.",
      "T+02 minutes: SSH authentication or a remote task fails with a permission-related error.",
      "T+04 minutes: The operator pauses repeated retries and records the failed run ID, target host, and task name.",
      "T+07 minutes: The team determines whether the denial occurred during SSH authentication, privilege escalation, filesystem access, or a cloud API operation.",
      "T+12 minutes: The operator compares the failing identity and configuration with the last successful run.",
      "T+18 minutes: The platform or security owner confirms the relevant policy and approves any necessary access change.",
      "T+24 minutes: A narrowly scoped correction is applied in accordance with change policy.",
      "T+28 minutes: The team validates access using read-only checks or a safe, approved test operation.",
      "T+35 minutes: The deployment is retried against the verified production scope and application health is checked."
    ],

    impact: [
      "The deployment may be blocked before application changes occur.",
      "Some earlier tasks may have completed before a later task encountered the denial.",
      "A deployment may be partially applied if the failure occurred after file transfer or service modification.",
      "Repeated retries can generate additional authentication failures or duplicate operational changes.",
      "An overly broad permission change can create a security exposure.",
      "A shared automation identity failure can affect several applications or environments."
    ],

    initialHypotheses: [
      "The SSH login user is incorrect or no longer authorized.",
      "The required private key is missing from the runner.",
      "The SSH agent or credential binding differs from the last successful run.",
      "The remote account cannot access the requested file or directory.",
      "The task needs become but privilege escalation is not configured.",
      "Sudoers policy denies the required command.",
      "The remote temporary directory is not writable.",
      "SELinux, ACLs, mount flags, or container identity mapping affect access.",
      "A cloud API request is denied by IAM or resource policy.",
      "A recent hardening or access-policy change removed a required permission."
    ],

    investigation: [
      "Capture the exact error, task name, host, run ID, timestamp, and repository revision.",
      "Determine whether SSH authentication completed successfully.",
      "If SSH fails before a session is established, investigate the login identity and approved authentication mechanism.",
      "If SSH succeeds but a task fails, inspect the effective remote user and the specific resource operation.",
      "If become fails, examine the escalation method, target user, and approved sudo policy.",
      "If a cloud API call fails, inspect the provider's authorization error and audit records.",
      "Compare the failing run with the last successful run, focusing on identity, credentials binding, and access-policy changes.",
      "Check the minimum relevant filesystem ownership and access-control evidence.",
      "Avoid collecting private keys, decrypted secrets, or full environment dumps.",
      "Document the evidence that confirms the denial mechanism before changing permissions."
    ],

    recovery: [
      "Determine whether earlier tasks already changed production systems.",
      "Identify the exact identity and operation that were denied.",
      "Restore the approved identity or apply the minimum required authorization correction.",
      "Keep production access controls and approval gates enabled.",
      "Validate access using the same execution identity and runtime context as the pipeline.",
      "Review the final target scope and obtain required deployment approval.",
      "Rerun only the necessary deployment workflow.",
      "Verify application state and the release version.",
      "Use the documented rollback procedure if an unsafe partial deployment is confirmed.",
      "Record the root cause, access correction, approver, and preventive actions."
    ]
  },

  impactAndSeverity: [
    {
      environment: "Production application deployment",
      impact:
        "Release blocked or partially applied; recovery may require coordinated application and platform checks.",
      severity: "SEV1 or SEV2 depending on service impact",
      response:
        "Pause unsafe retries, inspect completed tasks, identify the denied operation, and obtain approval before changing production permissions."
    },
    {
      environment: "Staging",
      impact:
        "Release validation or integration testing is blocked.",
      severity: "SEV2 or SEV3 depending on release criticality",
      response:
        "Compare the staging runner identity with the last successful run, correct the proven issue, and rerun validation."
    },
    {
      environment: "Development",
      impact:
        "Developer automation or local test deployments are blocked.",
      severity: "SEV3 or SEV4",
      response:
        "Check local identity, key availability, file permissions, and privilege-escalation settings without weakening shared access controls."
    },
    {
      environment: "Shared automation identity",
      impact:
        "Multiple services or hosts may be unable to authenticate or perform approved administrative tasks.",
      severity: "SEV1 or SEV2 depending on scope",
      response:
        "Coordinate with the identity, security, and platform owners; preserve audit evidence and restore access through the approved process."
    }
  ],

  safetyChecks: [
    "Confirm the repository, branch, commit SHA, pipeline run ID, and environment.",
    "Confirm the target host and the exact task that failed.",
    "Determine whether failure occurred during SSH authentication, privilege escalation, filesystem access, or an API operation.",
    "Inspect whether previous tasks already changed production systems.",
    "Preserve the original error and timestamp before retrying.",
    "Use the same approved execution identity for diagnostic validation.",
    "Never solve a permission problem by granting unrestricted root access without an approved justification.",
    "Never use chmod 777 as a generic fix.",
    "Never copy private keys or passwords into source code or public pipeline logs.",
    "Do not disable host-key checking as a generic response to an SSH error.",
    "Do not disable SELinux or AppArmor without a documented, authorized security investigation.",
    "Do not change sudoers without validating syntax and following the approved review process.",
    "Use least-privilege access and environment-specific credentials.",
    "Confirm target scope and approval before production-changing commands.",
    "Define rollback criteria if earlier deployment tasks may have partially completed."
  ],

  evidenceCollection: [
    {
      source: "Ansible runtime and invocation",
      commands: [
        "pwd",
        "git rev-parse --show-toplevel",
        "git rev-parse HEAD",
        "ansible --version",
        "ansible-config dump --only-changed"
      ],
      purpose:
        "Capture the execution context, selected configuration, and relevant runtime differences.",
      cautions: [
        "Redact internal hostnames and paths before sharing externally.",
        "Do not dump all environment variables.",
        "Do not include credentials or decrypted Vault values."
      ]
    },
    {
      source: "SSH connectivity",
      commands: [
        "ssh -o BatchMode=yes -o ConnectTimeout=10 deploy-user@server.example.internal true",
        "ssh -G deploy-user@server.example.internal",
        "ansible target_group -i ./inventory/production.ini -m ping"
      ],
      purpose:
        "Determine whether the approved SSH identity can establish a session and whether Ansible connectivity succeeds.",
      cautions: [
        "Replace example usernames, hostnames, groups, and inventory paths with approved values.",
        "SSH -G displays effective client configuration and may expose internal paths or usernames.",
        "Do not add an unapproved private-key path or print key contents.",
        "The Ansible ping module tests Ansible connectivity; it is not simply an ICMP ping."
      ]
    },
    {
      source: "Remote user and filesystem access",
      commands: [
        "id",
        "whoami",
        "namei -l /opt/myapp",
        "stat /opt/myapp",
        "test -r /opt/myapp/config.yml && echo READABLE || echo NOT_READABLE",
        "test -w /opt/myapp && echo WRITABLE || echo NOT_WRITABLE"
      ],
      purpose:
        "Identify the effective user and inspect the relevant file or directory access.",
      cautions: [
        "Run remote checks through the approved access path.",
        "Replace sample paths with the exact resource named in the failure.",
        "A directory write test does not prove that every file operation will succeed.",
        "namei may not be installed on every system."
      ]
    },
    {
      source: "Privilege escalation",
      commands: [
        "ansible target_group -i ./inventory/production.ini -m command -a 'id' --become",
        "sudo -n -l",
        "sudo -n true"
      ],
      purpose:
        "Determine whether the approved user can perform the intended privilege escalation without an interactive prompt.",
      cautions: [
        "Only run against an approved test host or an authorized production target.",
        "sudo -l can disclose privileged command policy.",
        "sudo -n true verifies non-interactive sudo behavior but does not prove every required command is permitted.",
        "Do not expose become passwords in command-line arguments or logs."
      ]
    },
    {
      source: "SSH service and authentication logs",
      commands: [
        "journalctl -u sshd --since '30 minutes ago'",
        "journalctl -u ssh --since '30 minutes ago'",
        "sudo journalctl --since '30 minutes ago' | grep -Ei 'sshd|sudo|denied'"
      ],
      purpose:
        "Find authentication failures, account restrictions, sudo denials, and relevant policy events.",
      cautions: [
        "The service unit name varies by operating system.",
        "Log access may require authorization.",
        "Logs can contain usernames, addresses, and other sensitive operational data.",
        "Do not run broad privileged log collection when a narrower query is sufficient."
      ]
    },
    {
      source: "SELinux, ACL, and mount state",
      commands: [
        "getenforce",
        "ls -ldZ /opt/myapp",
        "getfacl /opt/myapp",
        "findmnt -T /opt/myapp"
      ],
      purpose:
        "Check whether mandatory access controls, ACL entries, or mount properties explain a denial.",
      cautions: [
        "Some utilities may not be installed.",
        "Use the exact path implicated by the failed operation.",
        "Do not disable security enforcement or remount filesystems merely to test a hypothesis.",
        "Review audit records with the security owner when SELinux or another mandatory control is implicated."
      ]
    },
    {
      source: "Ansible task diagnostics",
      commands: [
        "ansible-playbook -i ./inventory/production.ini deploy.yml --syntax-check",
        "ansible-playbook -i ./inventory/production.ini deploy.yml --list-hosts",
        "ansible-playbook -i ./inventory/production.ini deploy.yml --check --diff"
      ],
      purpose:
        "Validate playbook syntax, selected hosts, and supported check-mode behavior before an authorized deployment.",
      cautions: [
        "Check mode is not a universal guarantee that no changes will occur; modules may not support it fully.",
        "Diff output may expose secret values or sensitive file contents.",
        "Use --check --diff only where the playbook and modules support safe validation.",
        "Do not rerun a production-changing playbook merely to reproduce a permission error."
      ]
    }
  ],

  diagnosticWorkflow: [
    {
      title: "1. Capture the exact permission error",
      purpose:
        "Identify the failing layer before selecting a remediation.",
      commands: [
        "Record the exact failed task and error message from the pipeline.",
        "Record the host, remote user, run ID, timestamp, and commit SHA.",
        "ansible --version",
        "ansible-config dump --only-changed"
      ],
      expectedEvidence: [
        "The failing operation and target host are identified.",
        "The execution context and selected configuration are recorded.",
        "The original error is preserved without exposing secrets."
      ],
      interpretation: [
        "Permission denied (publickey) usually points to SSH public-key authentication.",
        "A remote file-operation denial points toward filesystem access, ACLs, mandatory controls, or mount restrictions.",
        "A become failure points toward privilege-escalation configuration or policy.",
        "An API authorization error points toward cloud identity or resource policy.",
        "A connection or host-key error is not necessarily a permission failure."
      ],
      nextAction: [
        "Route SSH failures to authentication checks.",
        "Route file-operation failures to remote identity and filesystem checks.",
        "Route become failures to approved sudo-policy diagnostics.",
        "Route provider API denials to the cloud or service owner."
      ]
    },
    {
      title: "2. Verify SSH authentication",
      purpose:
        "Determine whether Ansible can authenticate as the intended remote user.",
      commands: [
        "ssh -o BatchMode=yes -o ConnectTimeout=10 deploy-user@server.example.internal true",
        "ssh -G deploy-user@server.example.internal",
        "ansible target_group -i ./inventory/production.ini -m ping"
      ],
      expectedEvidence: [
        "The SSH command succeeds or returns a reproducible authentication error.",
        "Effective SSH client settings are known.",
        "The Ansible connectivity test confirms whether the approved connection path works."
      ],
      interpretation: [
        "A public-key denial may indicate an incorrect username, missing key, wrong authorized key, account restriction, or SSH policy.",
        "A command that works on a workstation but fails in CI suggests a runtime identity, agent, key-delivery, or configuration difference.",
        "Ansible ping tests the Ansible connection and module execution path rather than ICMP reachability."
      ],
      nextAction: [
        "Confirm the approved remote user.",
        "Verify that the intended credential is available to the runner without printing it.",
        "Check server-side authentication logs with the system owner.",
        "Do not bypass host-key verification to fix a public-key denial."
      ]
    },
    {
      title: "3. Identify the effective remote identity",
      purpose:
        "Establish which user is attempting the denied operation.",
      commands: [
        "ansible target_group -i ./inventory/production.ini -m command -a 'id'",
        "ansible target_group -i ./inventory/production.ini -m command -a 'whoami'"
      ],
      expectedEvidence: [
        "The commands return the effective remote identity where execution is permitted.",
        "The identity can be compared with the task's intended ownership and privilege requirements."
      ],
      interpretation: [
        "A different user from the expected account can explain a file-access denial.",
        "A successful identity check does not prove write access to the target resource.",
        "If identity checks fail before execution, return to SSH and connection diagnostics."
      ],
      nextAction: [
        "Compare the effective user with inventory and playbook connection settings.",
        "Check the target file's owner, group, mode bits, ACLs, and mount properties.",
        "Use become only where the operation legitimately requires elevated access."
      ]
    },
    {
      title: "4. Diagnose filesystem access",
      purpose:
        "Determine why the effective user cannot perform the specific file operation.",
      commands: [
        "namei -l /opt/myapp/config.yml",
        "stat /opt/myapp/config.yml",
        "getfacl /opt/myapp/config.yml",
        "findmnt -T /opt/myapp/config.yml"
      ],
      expectedEvidence: [
        "The path components, owner, group, and mode bits can be inspected.",
        "ACL entries are visible where the utility and filesystem support them.",
        "Mount properties can be reviewed for read-only or other restrictions."
      ],
      interpretation: [
        "A parent directory without traversal permission can block access to a file.",
        "A file can be readable but not writable by the effective user.",
        "ACLs may affect access beyond ordinary mode bits.",
        "A read-only mount can block writes even if mode bits appear permissive.",
        "SELinux or AppArmor may deny an operation despite apparently correct Unix permissions."
      ],
      nextAction: [
        "Identify the minimum access required by the failed task.",
        "Ask the resource owner to approve the narrowest corrective permission change.",
        "Review security audit evidence when mandatory access control is implicated.",
        "Repeat the specific read-only access checks after correction."
      ]
    },
    {
      title: "5. Diagnose privilege escalation",
      purpose:
        "Determine whether the task needs elevated privileges and whether the approved policy allows them.",
      commands: [
        "ansible target_group -i ./inventory/production.ini -m command -a 'id' --become",
        "sudo -n -l",
        "sudo -n true"
      ],
      expectedEvidence: [
        "The resulting identity indicates whether escalation occurred.",
        "The policy output shows whether the user is allowed the relevant commands.",
        "The non-interactive check identifies whether sudo requires an unavailable prompt."
      ],
      interpretation: [
        "If escalation fails before the task runs, inspect become settings and sudo policy.",
        "If escalation works but a specific command is denied, inspect command-specific restrictions.",
        "A generic sudo permission does not necessarily authorize every administrative command.",
        "A task that does not require elevated privileges should not be granted root access merely to suppress an error."
      ],
      nextAction: [
        "Confirm become and become_user settings.",
        "Review sudo policy with the authorized system administrator.",
        "Use an approved non-interactive credential mechanism if the policy requires authentication.",
        "Validate only the intended operation after the policy correction."
      ]
    },
    {
      title: "6. Investigate CI/CD credential differences",
      purpose:
        "Explain failures that occur in automation but not on a developer workstation.",
      commands: [
        "id",
        "pwd",
        "ansible --version",
        "ssh-add -l",
        "git rev-parse HEAD"
      ],
      expectedEvidence: [
        "The runner identity and repository revision are known.",
        "The Ansible runtime is identified.",
        "If an SSH agent is available, the listed key fingerprints can be compared with the approved setup."
      ],
      interpretation: [
        "ssh-add -l may fail when no agent is available; that alone does not prove no other approved authentication method exists.",
        "The runner may use a different credential binding, SSH configuration, or remote user than a workstation.",
        "A missing secret binding can look like a server-side authorization issue.",
        "Never print private-key contents or dump all environment variables."
      ],
      nextAction: [
        "Compare the runner's approved credential binding with the last successful job.",
        "Confirm that the expected key or identity is available to the job.",
        "Restore the approved secret-delivery configuration rather than embedding credentials in source code."
      ]
    },
    {
      title: "7. Validate the recovery before deployment",
      purpose:
        "Ensure that the approved identity can perform the required operation and the intended targets remain unchanged.",
      commands: [
        "ansible-playbook -i ./inventory/production.ini deploy.yml --syntax-check",
        "ansible-playbook -i ./inventory/production.ini deploy.yml --list-hosts",
        "ansible target_group -i ./inventory/production.ini -m ping"
      ],
      expectedEvidence: [
        "The playbook passes syntax validation.",
        "The final target list matches the approved deployment scope.",
        "The Ansible connection test succeeds for the intended hosts."
      ],
      interpretation: [
        "These checks do not prove that every deployment task will succeed.",
        "A successful connection test does not prove the task has the required filesystem or service-management permissions.",
        "The final deployment requires its normal approval and change controls."
      ],
      nextAction: [
        "Confirm the required operation is authorized.",
        "Run the approved deployment command.",
        "Inspect task results and verify the application version and service health."
      ]
    }
  ],

  rootCausePlaybooks: [
    {
      cause: "Incorrect SSH username or public-key authentication configuration",
      symptoms: [
        "SSH fails before a remote shell or Ansible module can run.",
        "The error contains Permission denied (publickey).",
        "The same target works with a different approved identity."
      ],
      evidence: [
        "The exact remote username is recorded.",
        "The runner's effective SSH configuration is known.",
        "Server-side authentication logs show the attempted identity and denial reason where available."
      ],
      diagnosis: [
        "Compare inventory and playbook connection settings with the approved remote account.",
        "Verify the intended key fingerprint without exposing private-key contents.",
        "Inspect account restrictions and SSH authentication policy with the server owner."
      ],
      remediation: [
        "Correct the username or approved credential reference.",
        "Restore the intended public-key authorization through the normal access process.",
        "Avoid using a personal or unrestricted administrator account as a workaround."
      ],
      validation: [
        "Test SSH using the approved identity.",
        "Run the Ansible connectivity check.",
        "Confirm the expected host list and deployment authorization."
      ]
    },
    {
      cause: "Remote file ownership or mode bits deny access",
      symptoms: [
        "SSH succeeds but a file task fails.",
        "The failure names a protected file or directory.",
        "The task works when executed by the resource owner."
      ],
      evidence: [
        "The effective remote user is known.",
        "File ownership and mode bits are recorded.",
        "Parent directory traversal permissions have been inspected."
      ],
      diagnosis: [
        "Inspect the exact file and every relevant parent directory.",
        "Check whether the task requires read, write, execute, or directory traversal access.",
        "Inspect ACLs and mount restrictions when basic mode bits do not explain the denial."
      ],
      remediation: [
        "Grant the minimum required access through the resource owner's approved process.",
        "Use become only when the task legitimately requires elevated privileges.",
        "Avoid blanket recursive ownership changes or chmod 777."
      ],
      validation: [
        "Repeat the specific access check as the intended identity.",
        "Run the approved task against a safe test resource where practical.",
        "Verify that unrelated files did not receive broader permissions."
      ]
    },
    {
      cause: "Privilege escalation or sudoers policy denies the operation",
      symptoms: [
        "SSH connection succeeds.",
        "The task fails during become or sudo execution.",
        "The error indicates that a password is required or the command is not permitted."
      ],
      evidence: [
        "The effective login user and become_user are known.",
        "The sudo error and relevant policy evidence are captured.",
        "The required command and its authorization requirements are documented."
      ],
      diagnosis: [
        "Confirm whether the task needs root or another elevated account.",
        "Check the configured escalation method and target account.",
        "Review the relevant sudo policy with the authorized administrator."
      ],
      remediation: [
        "Correct the approved become configuration.",
        "Grant the minimum required command permission through the normal sudoers review process.",
        "Validate sudoers syntax using visudo when a policy file is changed.",
        "Use approved non-interactive credential handling when required."
      ],
      validation: [
        "Confirm the intended identity after escalation.",
        "Test the required operation using an approved safe validation.",
        "Verify that the policy did not authorize unrelated commands."
      ]
    },
    {
      cause: "CI runner does not receive the intended credential",
      symptoms: [
        "A workstation succeeds while CI fails.",
        "The failure begins after a secret, service connection, or runner configuration change.",
        "The expected SSH agent or identity is unavailable."
      ],
      evidence: [
        "The job's effective identity and runtime are recorded.",
        "The approved credential binding and key fingerprint can be checked.",
        "The failing and successful runs differ in credential configuration."
      ],
      diagnosis: [
        "Compare the runner setup with the last successful run.",
        "Check secret availability and access policy without printing secret values.",
        "Confirm whether the job uses SSH agent forwarding, a key file, or another approved method."
      ],
      remediation: [
        "Restore the approved credential binding or secret-delivery mechanism.",
        "Rotate credentials if there is evidence they were exposed or compromised.",
        "Do not commit credentials or write them into permanent workspace files."
      ],
      validation: [
        "Confirm the intended identity is available to the job.",
        "Test SSH and Ansible connectivity.",
        "Verify that CI logs contain no credential material."
      ]
    },
    {
      cause: "SELinux, ACL, AppArmor, or mount policy blocks the operation",
      symptoms: [
        "Unix mode bits appear sufficient but the operation is still denied.",
        "The failure occurs on a specific host or mount.",
        "Security audit logs indicate a policy denial."
      ],
      evidence: [
        "Relevant access-control and mount state is recorded.",
        "Security audit evidence identifies the denied operation where available.",
        "The issue correlates with a policy or mount change."
      ],
      diagnosis: [
        "Inspect SELinux labels, ACL entries, AppArmor policy, and mount properties as appropriate.",
        "Consult the host or security owner for audit evidence.",
        "Determine which control actually denied the operation before changing policy."
      ],
      remediation: [
        "Correct the specific label, ACL, profile, or mount configuration through the approved process.",
        "Keep mandatory security enforcement enabled unless an authorized exception is explicitly approved.",
        "Do not disable security controls as a generic troubleshooting shortcut."
      ],
      validation: [
        "Repeat the intended access check.",
        "Confirm that the specific denial no longer occurs.",
        "Verify that the security boundary remains effective."
      ]
    },
    {
      cause: "Cloud IAM or resource policy denies an API operation",
      symptoms: [
        "The task reaches a cloud API but receives an authorization error.",
        "A role or service identity works in one environment but not another.",
        "The issue follows an IAM or resource-policy change."
      ],
      evidence: [
        "The provider's authorization error identifies the rejected operation where available.",
        "The runtime identity and resource scope are known.",
        "Provider audit records show the attempted action and decision."
      ],
      diagnosis: [
        "Confirm the identity used by the automation runner.",
        "Check the exact action, resource, and applicable identity or resource policy.",
        "Compare the current policy with the approved previous configuration."
      ],
      remediation: [
        "Restore the approved identity or minimum required permission.",
        "Apply policy changes through the normal review process.",
        "Avoid granting administrator access merely to bypass an authorization error."
      ],
      validation: [
        "Retry the specific read-only operation when supported.",
        "Verify the required action against the intended resource.",
        "Confirm that the identity still follows least-privilege requirements."
      ]
    }
  ],

  permissionConcepts: [
    {
      name: "SSH authentication versus remote filesystem permissions",
      explanation:
        "SSH authentication determines whether a remote session can be established. Filesystem permissions govern operations performed after the session is established.",
      troubleshootingUse:
        "If authentication fails before module execution, investigate SSH. If the task starts and then fails on a file operation, inspect the remote identity and access controls."
    },
    {
      name: "Remote user versus become_user",
      explanation:
        "The remote user establishes the connection, while become_user identifies the account used after privilege escalation.",
      troubleshootingUse:
        "Check both identities when a task fails even though SSH connectivity succeeds."
    },
    {
      name: "Mode bits versus ACLs and mandatory access controls",
      explanation:
        "Unix mode bits are only one part of access evaluation. ACLs, SELinux, AppArmor, capabilities, and mount restrictions can also affect an operation.",
      troubleshootingUse:
        "When owner, group, and mode appear correct, inspect the other controls rather than repeatedly changing chmod values."
    },
    {
      name: "Authentication versus authorization",
      explanation:
        "Authentication establishes identity; authorization decides what that identity is permitted to do.",
      troubleshootingUse:
        "A valid SSH key can authenticate successfully while sudo, filesystem access, or a cloud API operation remains unauthorized."
    },
    {
      name: "Ansible check mode versus a guaranteed dry run",
      explanation:
        "Check mode depends on module support and playbook behavior. It cannot guarantee that every action has no side effects.",
      troubleshootingUse:
        "Use check mode as one validation input, not as a replacement for production change controls."
    }
  ],

  decisionTree: [
    {
      symptom: "SSH reports Permission denied (publickey).",
      evidence: "No remote task runs; authentication logs show a login or key rejection.",
      likelyCause: "Wrong username, unavailable key, missing authorized key, or SSH policy.",
      nextAction:
        "Verify the approved identity and credential delivery, then inspect authentication logs with the server owner."
    },
    {
      symptom: "SSH succeeds but a file task fails.",
      evidence: "The failure identifies a file or directory operation.",
      likelyCause: "Ownership, mode bits, ACL, mandatory access control, or mount restrictions.",
      nextAction:
        "Inspect the exact resource and parent directories under the effective remote identity."
    },
    {
      symptom: "A task fails during become.",
      evidence: "The error identifies sudo, escalation, or a required password.",
      likelyCause: "Missing escalation configuration, non-interactive authentication issue, or sudoers restriction.",
      nextAction:
        "Validate become settings and the approved sudo policy without expanding privileges unnecessarily."
    },
    {
      symptom: "The task works locally but fails in CI.",
      evidence: "The runner uses a different identity, key source, runtime, or configuration.",
      likelyCause: "Credential binding or execution-environment difference.",
      nextAction:
        "Compare the failing runner with the last successful run and restore the approved credential setup."
    },
    {
      symptom: "Filesystem access fails despite permissive mode bits.",
      evidence: "ACL, audit, or mount information identifies another restriction.",
      likelyCause: "SELinux, AppArmor, ACL, read-only mount, immutable attribute, or container ID mapping.",
      nextAction:
        "Confirm the exact denying control and correct it through the resource or security owner."
    },
    {
      symptom: "A cloud API reports access denied.",
      evidence: "Provider error or audit log identifies an unauthorized action.",
      likelyCause: "Missing permission, wrong identity, resource policy, or organization policy.",
      nextAction:
        "Verify the approved identity and minimum required permission for the exact resource and action."
    }
  ],

  recoveryWorkflow: [
    {
      phase: "Phase 1 — Stabilize",
      actions: [
        "Pause unsafe retries when production state or authorization is uncertain.",
        "Determine whether previous tasks completed before the denial.",
        "Record the affected host, task, identity, and exact error.",
        "Notify the service, platform, or security owner as appropriate."
      ],
      successCriteria: [
        "The incident scope is understood.",
        "Evidence is preserved.",
        "The recovery owner and approval requirements are clear."
      ]
    },
    {
      phase: "Phase 2 — Isolate",
      actions: [
        "Determine whether the failure occurred during authentication, authorization, filesystem access, escalation, or an API call.",
        "Verify the effective remote identity.",
        "Inspect only the relevant file, policy, credential binding, or provider action.",
        "Compare the failing run with the last successful run."
      ],
      successCriteria: [
        "A specific denying control or configuration defect is identified.",
        "The proposed correction is supported by evidence.",
        "Unnecessary privilege expansion has been avoided."
      ]
    },
    {
      phase: "Phase 3 — Correct",
      actions: [
        "Obtain approval for production access or policy changes.",
        "Apply the smallest change that resolves the proven denial.",
        "Preserve least-privilege boundaries.",
        "Review policy diffs and relevant audit records."
      ],
      successCriteria: [
        "The change is authorized.",
        "No unrelated permissions are broadened.",
        "The original failure condition is addressed."
      ]
    },
    {
      phase: "Phase 4 — Validate",
      actions: [
        "Test the intended identity and operation.",
        "Confirm Ansible connectivity where relevant.",
        "Validate privilege escalation or file access through a safe test.",
        "Confirm the intended inventory and host scope."
      ],
      successCriteria: [
        "The required operation is permitted.",
        "Unrelated access remains restricted.",
        "The deployment is authorized to proceed."
      ]
    },
    {
      phase: "Phase 5 — Recover and verify",
      actions: [
        "Execute the approved deployment workflow.",
        "Review task results and any partial changes.",
        "Verify application version and health.",
        "Use documented rollback procedures if an unsafe partial change is confirmed.",
        "Record the incident outcome and follow-up actions."
      ],
      successCriteria: [
        "The release reaches the intended state.",
        "Application health checks pass.",
        "The corrective access change is documented and auditable."
      ]
    }
  ],

  prevention: [
    {
      area: "Identity and SSH",
      practices: [
        "Use approved automation identities rather than personal administrator accounts.",
        "Validate SSH connectivity in CI before deployment.",
        "Manage private keys and other credentials through an approved secret system.",
        "Monitor repeated authentication failures.",
        "Keep host-key verification enabled."
      ]
    },
    {
      area: "Privilege escalation",
      practices: [
        "Use become only for tasks that require elevated privileges.",
        "Maintain reviewed, least-privilege sudoers policies.",
        "Validate sudoers syntax with visudo when policy changes are made.",
        "Test non-interactive execution in a controlled environment.",
        "Avoid embedding passwords in command-line arguments or repository files."
      ]
    },
    {
      area: "Filesystem and operating-system policy",
      practices: [
        "Document expected ownership and access requirements for deployment directories.",
        "Validate permissions in staging before production rollout.",
        "Monitor SELinux, AppArmor, ACL, and mount-related denials where applicable.",
        "Avoid blanket recursive ownership changes.",
        "Review container mounts and UID/GID mapping in automation runners."
      ]
    },
    {
      area: "CI/CD controls",
      practices: [
        "Keep credential binding consistent across supported environments.",
        "Pin and test the Ansible execution environment.",
        "Fail the pipeline on unexpected authentication or authorization errors.",
        "Keep secrets out of logs and artifacts.",
        "Require approval for production access-policy changes."
      ]
    },
    {
      area: "Observability and incident response",
      practices: [
        "Record run IDs, timestamps, host identity, task name, and commit SHA.",
        "Preserve relevant authentication and authorization logs.",
        "Alert on repeated failures affecting shared automation identities.",
        "Track remediation owners and due dates.",
        "Include partial-change assessment in the incident review."
      ]
    }
  ],

  commonMistakes: [
    {
      mistake: "Using chmod 777 to make a deployment succeed.",
      whyItFails:
        "It can expose files to unintended users and does not solve SSH authentication, sudo policy, mandatory access control, or read-only mount problems.",
      betterApproach:
        "Identify the exact denied operation and apply the minimum required access."
    },
    {
      mistake: "Using root for every Ansible connection.",
      whyItFails:
        "It expands the impact of credential compromise and hides the real permission boundary.",
      betterApproach:
        "Use a dedicated automation identity and narrowly scoped privilege escalation."
    },
    {
      mistake: "Disabling host-key verification after an SSH failure.",
      whyItFails:
        "Host identity verification protects against connecting to an unintended or impersonated server; it does not fix an incorrect public key or remote filesystem permission.",
      betterApproach:
        "Diagnose the specific SSH error and validate host identity through the approved process."
    },
    {
      mistake: "Disabling SELinux or AppArmor to fix a denied file operation.",
      whyItFails:
        "It can weaken system security while leaving the actual path, label, profile, or mount defect unresolved.",
      betterApproach:
        "Use the relevant audit evidence and make a narrow, approved policy correction."
    },
    {
      mistake: "Putting passwords or private keys in the playbook.",
      whyItFails:
        "Secrets can persist in Git history, logs, artifacts, and backups.",
      betterApproach:
        "Use an approved secret manager, Ansible Vault, or another supported credential-delivery mechanism."
    },
    {
      mistake: "Assuming no production changes occurred because the final task failed.",
      whyItFails:
        "Earlier plays and tasks may already have modified files, services, or infrastructure.",
      betterApproach:
        "Review the entire play recap and execution timeline before retrying or rolling back."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Incident title: Ansible Permission Denied",
    "Affected environment:",
    "Affected service and hosts:",
    "Severity and business impact:",
    "Incident start and detection timestamps:",
    "Pipeline run ID:",
    "Repository, branch, and commit SHA:",
    "Ansible runtime and execution identity:",
    "Exact failed task and error:",
    "Failure layer: SSH, filesystem, become, operating-system policy, or cloud API:",
    "Evidence collected:",
    "Last successful run:",
    "Confirmed root cause:",
    "Access or policy change approved by:",
    "Corrective action:",
    "Validation evidence:",
    "Partial-change assessment:",
    "Deployment recovery result:",
    "Application health verification:",
    "Rollback decision and rationale:",
    "Prevention actions, owners, and due dates:"
  ],

  productionRunbook: [
    {
      phase: "Detect and triage",
      checklist: [
        "Capture the exact error and failing task.",
        "Identify the affected host and environment.",
        "Determine whether the denial occurred before or after SSH connection.",
        "Check whether earlier tasks completed or changed production state."
      ]
    },
    {
      phase: "Collect evidence",
      checklist: [
        "Record repository revision, run ID, timestamp, and Ansible version.",
        "Identify the effective remote user and become_user.",
        "Capture the relevant filesystem or authorization evidence.",
        "Inspect approved authentication or audit logs.",
        "Redact secrets before sharing evidence."
      ]
    },
    {
      phase: "Isolate root cause",
      checklist: [
        "Separate SSH authentication from remote authorization.",
        "Inspect file ownership, mode bits, ACLs, and parent-directory traversal.",
        "Inspect become configuration and sudo policy where applicable.",
        "Check mandatory access controls, mounts, or container identity only when relevant.",
        "Inspect cloud IAM or resource policy for API denials."
      ]
    },
    {
      phase: "Recover safely",
      checklist: [
        "Obtain required approval for production access changes.",
        "Apply the narrowest correction supported by evidence.",
        "Validate the exact operation under the approved identity.",
        "Confirm inventory and deployment target scope.",
        "Rerun the approved workflow and verify application health.",
        "Record rollback decisions and preventive follow-up."
      ]
    }
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Diagnose SSH public-key denial",
      objective:
        "Distinguish a missing credential from a remote filesystem permission problem.",
      steps: [
        "Use two disposable test VMs and a non-production automation account.",
        "Configure approved SSH access to the first VM.",
        "Attempt connection to the second VM using an identity that is not authorized there.",
        "Record the exact SSH error without exposing private-key material.",
        "Compare the effective SSH username and key fingerprint with the approved configuration."
      ],
      expectedFinding:
        "A public-key authentication denial occurs before the remote file operation can be evaluated.",
      solution: [
        "Correct the test identity or approved key authorization.",
        "Repeat the SSH test.",
        "Run the Ansible connectivity check."
      ]
    },
    {
      title: "Lab 2 — Diagnose a file ownership denial",
      objective:
        "Learn why a connected user may not be allowed to modify a protected file.",
      steps: [
        "Create a disposable test directory owned by a different test account.",
        "Set a restrictive but intentional permission on the test file.",
        "Connect using the automation user.",
        "Inspect id, stat, and namei output.",
        "Change only the test fixture's ownership or permissions to the documented expected state."
      ],
      expectedFinding:
        "Successful SSH access does not imply write access to every remote file.",
      solution: [
        "Identify the minimum required file operation.",
        "Apply the least-privilege correction to the test fixture.",
        "Repeat the exact access check."
      ]
    },
    {
      title: "Lab 3 — Diagnose become failure",
      objective:
        "Distinguish a missing privilege-escalation configuration from a filesystem permission failure.",
      steps: [
        "Use a disposable VM and a non-root automation account.",
        "Run an identity command without become.",
        "Run the same command with become in the test environment.",
        "Inspect the documented sudo policy and non-interactive behavior.",
        "Apply a reviewed test-only policy correction if required."
      ],
      expectedFinding:
        "SSH can work correctly while sudo denies privilege escalation.",
      solution: [
        "Correct the test playbook's become configuration when necessary.",
        "Review the test sudo policy.",
        "Confirm the effective identity after escalation."
      ]
    },
    {
      title: "Lab 4 — Diagnose a CI credential mismatch",
      objective:
        "Understand why a local playbook can succeed while the pipeline fails.",
      steps: [
        "Run a harmless connectivity test from a workstation.",
        "Run the same test from a disposable CI runner.",
        "Compare runtime identity, SSH configuration, key availability, and Ansible version.",
        "Inspect only approved, non-secret diagnostics.",
        "Correct the test runner's credential binding through the supported secret mechanism."
      ],
      expectedFinding:
        "The local and CI environments may use different identities or credential sources.",
      solution: [
        "Align the runner with the approved credential-delivery design.",
        "Repeat the connectivity test.",
        "Confirm that no credentials are printed in logs."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What does Permission denied mean in Ansible?",
      answer:
        "It means an access-control check rejected an operation. The denial can occur during SSH authentication, remote filesystem access, privilege escalation, operating-system security enforcement, or a cloud API request.",
      followUp:
        "Which part of the exact error tells you where to start the investigation?"
    },
    {
      question: "What is the difference between remote_user and become_user?",
      answer:
        "The remote user establishes the connection. become_user is the account used after privilege escalation.",
      followUp:
        "How would you confirm the effective identity before and after escalation?"
    },
    {
      question: "Why does SSH work but a file task fail?",
      answer:
        "Authentication establishes a session but does not grant unrestricted access to every file. Ownership, mode bits, ACLs, mandatory controls, and mount restrictions can still deny the task.",
      followUp:
        "Which commands help inspect a file's ownership and parent-directory access?"
    },
    {
      question: "How do you troubleshoot sudo failure in CI?",
      answer:
        "Check become settings, the target account, non-interactive authentication, and the approved sudo policy. Confirm the required command is permitted without exposing passwords or broadening privileges unnecessarily.",
      followUp:
        "Why is sudo -n -l not proof that every required command will work?"
    },
    {
      question: "Why is chmod 777 not a good fix?",
      answer:
        "It grants broad permissions, may expose sensitive files, and cannot resolve authentication, sudo, mandatory access control, or read-only mount failures.",
      followUp:
        "How would you identify the minimum permission required by the failed operation?"
    },
    {
      question: "What would you do if the task failed after earlier tasks completed?",
      answer:
        "Inspect the play recap and deployment timeline, identify completed changes, assess the resulting state, and decide whether a controlled retry or documented rollback is appropriate.",
      followUp:
        "What evidence is needed before declaring the environment safe?"
    },
    {
      question: "How do you distinguish filesystem permission denial from cloud IAM denial?",
      answer:
        "A filesystem failure identifies a local or remote file operation, while a cloud IAM failure is returned by the provider API and may be confirmed using provider audit records and the runtime identity.",
      followUp:
        "How would you validate the minimum required permission without granting administrator access?"
    }
  ],

  references: [
    {
      title: "Ansible connection plugins",
      url: "https://docs.ansible.com/ansible/latest/plugins/connection.html"
    },
    {
      title: "Ansible privilege escalation",
      url: "https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_privilege_escalation.html"
    },
    {
      title: "Ansible configuration settings",
      url: "https://docs.ansible.com/ansible/latest/reference_appendices/config.html"
    },
    {
      title: "Ansible Vault",
      url: "https://docs.ansible.com/ansible/latest/vault_guide/index.html"
    },
    {
      title: "OpenSSH manual pages",
      url: "https://www.openssh.com/manual.html"
    },
    {
      title: "Linux man-pages project",
      url: "https://www.kernel.org/doc/man-pages/"
    }
  ]
};
