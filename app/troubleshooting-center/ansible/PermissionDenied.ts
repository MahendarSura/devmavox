
export interface PermissionDiagnostic {
  title: string;
  command: string;
  purpose: string;
  expectedOutput: string;
  failureOutput: string;
  interpretation: string;
  nextAction: string;
}

export interface PermissionRootCause {
  cause: string;
  symptoms: string[];
  confirmation: string[];
  fix: string[];
  verification: string[];
}

export const permissionDeniedGuide = {
  id: "ansible-permission-denied",
  title: "Ansible Permission Denied",
  category: "Ansible",
  difficulty: "Intermediate",
  estimatedTime: "30–60 minutes",

  summary:
    "Diagnose Ansible permission failures affecting SSH access, remote " +
    "file operations, privileged tasks, managed directories, and CI/CD jobs. " +
    "Identify the exact failing operation before changing permissions.",

  learningObjectives: [
    "Distinguish controller-side permissions from remote-server permissions.",
    "Understand SSH authentication versus operating-system authorization.",
    "Diagnose sudo and become failures.",
    "Investigate file ownership, directory permissions, and ACLs.",
    "Apply least-privilege fixes based on evidence.",
    "Verify recovery without weakening production security."
  ],

  incident: {
    title: "Production deployment fails with Permission denied",

    scenario:
      "A previously successful Ansible deployment starts failing after a " +
      "server change, account rotation, directory permission change, or " +
      "pipeline runner update. The job reports Permission denied, but the " +
      "message alone does not identify which account or operation failed.",

    exampleLog:
      "fatal: [app01]: FAILED! => {\n" +
      '  "msg": "Permission denied"\n' +
      "}",

    importantNote:
      "This is an illustrative shortened message. Real Ansible output may " +
      "identify SSH authentication, a remote path, sudo/become, or a module " +
      "operation. Preserve the complete task output before diagnosing.",

    possibleImpacts: [
      "A deployment may stop before updating application files.",
      "Configuration management may fail on only some hosts.",
      "A service restart or protected file operation may not execute.",
      "A pipeline may remain blocked until permissions are corrected.",
      "An incorrect broad permission change can expose sensitive files."
    ],

    immediateActions: [
      "Identify the affected hosts, environment, task, and pipeline run.",
      "Determine whether the failure occurred on the controller or remote host.",
      "Check whether any earlier tasks already changed the system.",
      "Pause the rollout if the intended changes or host scope are uncertain.",
      "Do not use chmod 777 or disable security controls as a quick fix."
    ]
  },

  sections: [
    {
      title: "1. Understand the error",

      explanation:
        "Permission denied means an operation was rejected because the " +
        "current identity or security policy does not permit it. In Ansible, " +
        "the operation may happen on the control node, during SSH access, " +
        "while executing a remote task, or when using privilege escalation.",

      permissionLayers: [
        {
          layer: "Control-node permissions",
          explanation:
            "The user running Ansible may not be allowed to read the playbook, " +
            "inventory, private key, configuration, or required local files."
        },
        {
          layer: "SSH authentication",
          explanation:
            "The remote account may reject the supplied key or authentication method. " +
            "This is different from authenticating successfully but lacking file access."
        },
        {
          layer: "Remote operating-system permissions",
          explanation:
            "The authenticated remote account may not have read, write, or execute " +
            "permission on the target file or directory."
        },
        {
          layer: "Privilege escalation",
          explanation:
            "A task requiring elevated privileges may fail because become is not " +
            "enabled, sudo is unavailable, or the account is not authorized."
        },
        {
          layer: "Security policy or ACL",
          explanation:
            "ACLs, SELinux, AppArmor, mounted filesystems, or other controls may " +
            "deny an operation even when ordinary permission bits appear correct."
        }
      ],

      commonSymptoms: [
        "SSH reports Permission denied (publickey).",
        "A task cannot write to a protected directory.",
        "A copy or template task fails on one host.",
        "A task using become fails while ordinary tasks succeed.",
        "The same playbook succeeds locally but fails in CI.",
        "Only a subset of servers reports permission errors."
      ],

      keyRule:
        "Identify the exact failing operation, user, host, and path first. " +
        "Do not assume every Permission denied error requires sudo."
    },

    {
      title: "2. Identify the impact",

      investigation: [
        {
          question: "Which hosts are affected?",
          action:
            "Inspect the failed host list and determine whether the problem affects " +
            "one machine, a host group, or the entire environment."
        },
        {
          question: "Which task failed?",
          action:
            "Read the failed task name and full error message. Identify whether it " +
            "was an SSH connection, file transfer, template, command, or service task."
        },
        {
          question: "Did earlier tasks succeed?",
          action:
            "Review the task timeline and changed results. Establish whether the " +
            "system is partially configured or whether a rollout has already begun."
        },
        {
          question: "Is this a production system?",
          action:
            "Confirm environment, change approval, and service impact before " +
            "attempting privileged operations."
        }
      ],

      severityGuidance: [
        "Low: a non-production task fails before making changes.",
        "Medium: a release or configuration update is blocked.",
        "High: production deployment is partially complete or multiple hosts are affected.",
        "Critical: a live outage is occurring or a proposed permission change could expose sensitive systems."
      ],

      evidenceToPreserve: [
        "Pipeline run ID and timestamp.",
        "Failed task name and full sanitized output.",
        "Target host and remote username.",
        "Inventory source and relevant Git commit.",
        "Recent account, key, ownership, or permission changes.",
        "Successful and failed host comparison."
      ]
    },

    {
      title: "3. Run diagnostics",

      safety:
        "Start with read-only checks. Run controller-side commands on the " +
        "Ansible control node and remote-side commands on the affected server. " +
        "Do not expose private keys, passwords, tokens, or secret task variables.",

      commands: [
        {
          title: "Inspect the Ansible execution identity",
          command: "whoami",
          purpose:
            "Identify the operating-system user running the current shell.",
          expectedOutput: "runner",
          failureOutput:
            "The command returns a user different from the expected runner.",
          interpretation:
            "The shell may be running under another account or execution context.",
          nextAction:
            "Compare the identity with the CI job configuration and the location of required files."
        },
        {
          title: "Check local playbook and inventory access",
          command: "ls -l ansible.cfg inventory.ini deploy.yml",
          purpose:
            "Inspect ownership and ordinary permissions for these local files.",
          expectedOutput:
            "-rw-r--r-- 1 runner runner 900 ansible.cfg",
          failureOutput:
            "Permission denied or No such file or directory",
          interpretation:
            "The current user may lack access, or the specified path may be incorrect.",
          nextAction:
            "Confirm the working directory and inspect the specific inaccessible file."
        },
        {
          title: "Inspect the failing task",
          command:
            "ansible-playbook -i inventory.ini deploy.yml --list-hosts",
          purpose:
            "Preview the intended target hosts without executing the playbook tasks.",
          expectedOutput:
            "play #1 (appservers):\n  hosts (2):\n    app01\n    app02",
          failureOutput:
            "The inventory cannot be parsed or the expected hosts are not selected.",
          interpretation:
            "Resolve inventory or target selection issues separately before investigating task permissions.",
          nextAction:
            "Confirm the correct inventory and target hosts."
        },
        {
          title: "Check remote account and identity",
          command:
            "ansible app01 -i inventory.ini -m command -a 'id' -u deploy",
          purpose:
            "Check which account the SSH connection uses and inspect its identity.",
          expectedOutput:
            "uid=1001(deploy) gid=1001(deploy) groups=1001(deploy)",
          failureOutput:
            "Permission denied (publickey)",
          interpretation:
            "The SSH connection may be failing before the remote command executes. If the command succeeds, investigate the failing task's specific operation.",
          nextAction:
            "Confirm the intended remote user and approved SSH authentication configuration."
        },
        {
          title: "Inspect a protected target path",
          command:
            "ansible app01 -i inventory.ini -m command -a 'ls -ld /opt/myapp' -u deploy",
          purpose:
            "Inspect the target directory's owner, group, and ordinary permission bits.",
          expectedOutput:
            "drwxr-xr-x 4 root root 4096 Oct 26 10:00 /opt/myapp",
          failureOutput:
            "ls: cannot open directory '/opt/myapp': Permission denied",
          interpretation:
            "The remote user cannot perform the requested directory operation. The directory's parent permissions and ACLs may also matter.",
          nextAction:
            "Inspect the exact operation required and check path permissions on the remote server."
        },
        {
          title: "Check remote identity and privilege escalation",
          command:
            "ansible app01 -i inventory.ini -m command -a 'id' -b",
          purpose:
            "Test whether the approved become configuration allows the task to run with elevated privileges.",
          expectedOutput:
            "uid=0(root) gid=0(root) groups=0(root)",
          failureOutput:
            "Missing sudo password, not in sudoers, or another become error",
          interpretation:
            "Privilege escalation may not be configured or authorized for the account.",
          nextAction:
            "Check the approved become settings and sudo policy. Do not bypass the access-control policy."
        },
        {
          title: "Inspect directory traversal permissions",
          command:
            "namei -l /opt/myapp/releases/current",
          purpose:
            "Inspect the permissions and ownership of each component in the path.",
          expectedOutput:
            "A listing of path components with owner, group, and permission bits.",
          failureOutput:
            "A parent component lacks the required execute/search permission.",
          interpretation:
            "Access can fail because a parent directory cannot be traversed, even if the final file appears readable.",
          nextAction:
            "Identify the exact parent component and determine the least-privilege correction."
        },
        {
          title: "Inspect ACLs when supported",
          command:
            "getfacl /opt/myapp",
          purpose:
            "Inspect additional access-control entries on the target path.",
          expectedOutput:
            "Owner, group, mode, and any applicable ACL entries.",
          failureOutput:
            "The tool is unavailable or access is denied.",
          interpretation:
            "Ordinary permission bits may not explain the entire access decision.",
          nextAction:
            "Use the platform's approved ACL inspection method and involve the system owner if necessary."
        }
      ],

      diagnosticBranches: [
        {
          condition: "SSH returns Permission denied (publickey).",
          next:
            "Investigate username, key selection, authorized_keys, SSH server policy, and account status. Do not start by changing application-directory permissions."
        },
        {
          condition: "SSH succeeds, but a file operation fails.",
          next:
            "Inspect the exact file path, remote identity, ownership, parent-directory traversal, ACLs, and required access mode."
        },
        {
          condition: "Only become tasks fail.",
          next:
            "Inspect become configuration, sudo policy, required authentication, and the command that needs elevated privileges."
        },
        {
          condition: "The failure happens only in CI.",
          next:
            "Compare runner identity, workspace permissions, SSH key configuration, environment, and execution context with a successful run."
        },
        {
          condition: "Only one host fails.",
          next:
            "Compare that host's user, group membership, directory ownership, ACLs, security policy, and recent configuration changes with a healthy host."
        }
      ]
    },

    {
      title: "4. Understand the output",

      interpretations: [
        {
          output: "Permission denied (publickey)",
          meaning:
            "SSH public-key authentication was not accepted.",
          check:
            "Verify the intended remote username, selected key, authorized_keys configuration, and SSH server logs."
        },
        {
          output: "Permission denied while opening a file",
          meaning:
            "The process cannot perform the requested operation on that path.",
          check:
            "Inspect the remote identity, file permissions, parent directories, ACLs, and applicable security policy."
        },
        {
          output: "Missing sudo password",
          meaning:
            "The become operation requires authentication that was not supplied through the configured mechanism.",
          check:
            "Verify the approved privilege-escalation configuration and secret-management setup."
        },
        {
          output: "User is not in the sudoers file",
          meaning:
            "The account is not authorized by the applicable sudo policy.",
          check:
            "Request the required least-privilege access through the system owner. Do not grant unrestricted root access as a workaround."
        },
        {
          output: "Read-only file system",
          meaning:
            "The filesystem does not permit writes in its current state.",
          check:
            "Inspect mount state and filesystem health. Changing file mode bits will not resolve a read-only mount."
        },
        {
          output: "Operation not permitted",
          meaning:
            "The operation is prohibited by the operating system, capabilities, mount settings, or another security control.",
          check:
            "Identify the exact operation and applicable policy before changing permissions."
        }
      ],

      interpretationRules: [
        "The identity that runs Ansible locally may differ from the remote user.",
        "Successful SSH authentication does not guarantee write access to every remote path.",
        "A directory needs execute/search permission for path traversal.",
        "A successful become test does not prove every task is correctly configured.",
        "A permission error can be caused by ACLs or security policy, not only chmod bits."
      ]
    },

    {
      title: "5. Find the root cause",

      rootCauses: [
        {
          cause: "Wrong remote username or SSH key",
          symptoms: [
            "SSH authentication fails.",
            "The problem occurs before the remote task starts."
          ],
          confirmation: [
            "The failing host uses a different remote user or key configuration.",
            "SSH server logs show authentication rejection."
          ],
          fix: [
            "Correct the approved remote username or key reference.",
            "Verify the public key is installed for the intended account.",
            "Check account status and SSH policy with the server administrator.",
            "Keep private keys in the approved secret store."
          ],
          verification: [
            "Run a controlled Ansible connectivity test.",
            "Confirm the intended remote account with id.",
            "Re-run the original task only after authentication succeeds."
          ]
        },
        {
          cause: "Remote directory ownership or mode is incorrect",
          symptoms: [
            "Connection succeeds, but the task cannot write to its target.",
            "The failure concerns a specific application directory or file."
          ],
          confirmation: [
            "The remote identity lacks the access required by the operation.",
            "Ownership and permission inspection identifies the relevant path component."
          ],
          fix: [
            "Determine the intended owner and group from the deployment design.",
            "Request or apply the smallest approved ownership or mode correction.",
            "Use a narrowly scoped Ansible file task if configuration management is responsible for the directory.",
            "Avoid recursively changing permissions without reviewing the full impact."
          ],
          verification: [
            "Recheck ownership and permissions.",
            "Verify the intended account can perform the required operation.",
            "Confirm unrelated users and files did not gain additional access."
          ]
        },
        {
          cause: "Privilege escalation is missing or unauthorized",
          symptoms: [
            "Ordinary tasks succeed but protected operations fail.",
            "The error refers to sudo or become."
          ],
          confirmation: [
            "The failed task requires privileges unavailable to the remote user.",
            "The approved sudo policy does not authorize the requested command or account."
          ],
          fix: [
            "Enable become only for tasks that genuinely require elevated privileges.",
            "Request a narrowly scoped sudo policy from the system owner.",
            "Configure any required become credentials through the approved secret-management mechanism.",
            "Do not store plaintext passwords in the playbook or repository."
          ],
          verification: [
            "Test the approved become configuration.",
            "Verify the task runs with only the required privileges.",
            "Confirm unrelated tasks continue to run as the ordinary deployment user."
          ]
        },
        {
          cause: "CI runner cannot read a required local file",
          symptoms: [
            "The playbook works on a developer machine but fails in CI.",
            "The error concerns an inventory, key file, artifact, or workspace path."
          ],
          confirmation: [
            "The CI process uses a different operating-system identity.",
            "The file is absent or inaccessible in the runner workspace."
          ],
          fix: [
            "Correct the workspace path or checkout configuration.",
            "Grant the runner only the access required to read the intended file.",
            "Use the CI platform's secret store for private keys and credentials.",
            "Ensure secret files are not included in build artifacts or logs."
          ],
          verification: [
            "Run the same read-only validation in the CI environment.",
            "Confirm the file is available to the correct process.",
            "Re-run the pipeline and verify the target hosts."
          ]
        },
        {
          cause: "ACL or security policy blocks access",
          symptoms: [
            "Mode bits appear correct, but the operation remains denied.",
            "The issue affects a specific file, directory, or security context."
          ],
          confirmation: [
            "ACL inspection or system audit logs identify an additional restriction.",
            "The failure is reproducible under the same identity and security context."
          ],
          fix: [
            "Ask the system owner to review the applicable ACL or security policy.",
            "Apply only the approved change for the intended identity and path.",
            "Preserve mandatory security controls unless a documented change is approved."
          ],
          verification: [
            "Repeat the specific operation as the intended account.",
            "Review access-control entries after the change.",
            "Confirm the security policy remains enabled and effective."
          ]
        }
      ]
    },

    {
      title: "6. Fix and verify",

      recoveryWorkflow: [
        "Stop the rollout if the affected task could leave production partially configured.",
        "Identify the exact failing command, host, user, and target path.",
        "Determine whether the denial is local, SSH-related, remote filesystem-related, or caused by privilege escalation.",
        "Collect read-only evidence and confirm the root cause.",
        "Obtain required approval for access-control or production changes.",
        "Apply the smallest change that corrects the identified cause.",
        "Re-run relevant read-only checks before retrying the deployment.",
        "Run a limited validation against the approved target host or test environment.",
        "Re-run the failed task or deployment using the approved procedure.",
        "Confirm service health and review all hosts for partial changes."
      ],

      exampleSafeChecks: [
        {
          situation: "The remote user cannot write to an application directory.",
          guidance:
            "Confirm the required owner, group, and write access with the service owner. " +
            "Do not assume root ownership or world-writable access is appropriate."
        },
        {
          situation: "A task needs elevated privileges.",
          guidance:
            "Use the approved become configuration for that task or play. " +
            "Do not enable privilege escalation globally without reviewing the consequences."
        },
        {
          situation: "The CI runner cannot read an SSH key.",
          guidance:
            "Correct the secret binding or protected-file permissions. " +
            "Never print the private key or copy it into a public repository."
        }
      ],

      verificationChecklist: [
        "The correct remote account can authenticate.",
        "The intended path is accessible for the required operation.",
        "Privilege escalation works only where authorized.",
        "The original Ansible task completes successfully.",
        "No unrelated files have broader permissions than intended.",
        "The application service and health checks are normal.",
        "The deployment log confirms the expected hosts and final status."
      ],

      rollbackConsiderations: [
        "Preserve the previous reviewed configuration before making changes.",
        "If an access-control change increases exposure, restore the approved prior policy.",
        "If a deployment partially completed, assess changed hosts before rerunning it.",
        "Use the application's documented rollback procedure when application changes cause impact.",
        "Do not blindly reverse ownership or permissions without checking their intended state."
      ],

      safetyWarnings: [
        "Never use chmod -R 777 as a general solution.",
        "Do not disable SELinux or AppArmor simply to bypass a denial.",
        "Do not grant unrestricted sudo access to solve a single task failure.",
        "Do not expose secrets in debug logs.",
        "Do not repeat a production deployment until its target and partial state are understood."
      ]
    },

    {
      title: "7. Prevent recurrence",

      prevention: [
        "Use dedicated deployment accounts with least-privilege access.",
        "Manage directory ownership and modes declaratively where appropriate.",
        "Validate SSH credentials and protected file access in CI.",
        "Keep private keys and passwords in approved secret stores.",
        "Use become only for tasks that need elevated privileges.",
        "Monitor repeated SSH and authorization failures.",
        "Test permission changes in a non-production environment.",
        "Document the intended owner, group, and access policy for critical paths.",
        "Review access changes and incident outcomes periodically."
      ],

      monitoring: [
        {
          signal: "Repeated SSH authentication failures",
          response:
            "Check the affected account, host, key rotation, and authentication logs."
        },
        {
          signal: "Repeated become failures",
          response:
            "Check sudo policy changes, credential configuration, and the failing task."
        },
        {
          signal: "Permission failures on one host only",
          response:
            "Compare ownership, ACLs, account configuration, and recent changes with a healthy host."
        },
        {
          signal: "CI-only permission failures",
          response:
            "Check runner identity, workspace access, protected-file handling, and secret bindings."
        }
      ],

      commonMistakes: [
        "Using chmod 777 without understanding the access requirement.",
        "Assuming every permission failure needs root privileges.",
        "Changing permissions recursively across an entire application directory.",
        "Confusing SSH authentication failures with remote file authorization failures.",
        "Ignoring parent-directory traversal permissions.",
        "Sharing unredacted debug logs containing secrets.",
        "Retrying a partially completed production deployment without checking its state."
      ],

      interviewQuestions: [
        {
          question: "What does Permission denied mean in Ansible?",
          answer:
            "An operation was rejected by an access-control mechanism. " +
            "The cause may be local file access, SSH authentication, remote " +
            "permissions, privilege escalation, ACLs, or security policy."
        },
        {
          question: "How do you distinguish SSH failure from a remote file permission failure?",
          answer:
            "Inspect the complete error and test connectivity. If SSH authentication " +
            "fails, investigate the account and key. If SSH succeeds, inspect the " +
            "specific remote operation, identity, path, and permissions."
        },
        {
          question: "When should you use become?",
          answer:
            "Use it only when the task requires elevated privileges and the account " +
            "is authorized under the organization's policy."
        },
        {
          question: "Why is chmod 777 dangerous?",
          answer:
            "It grants read, write, and execute permissions to everyone, potentially " +
            "allowing unauthorized modification or execution."
        },
        {
          question: "Why can a permission failure happen only in CI?",
          answer:
            "The runner may use a different user, workspace, SSH key, secret binding, " +
            "environment, or filesystem permissions."
        },
        {
          question: "What should you do before retrying a failed production deployment?",
          answer:
            "Confirm the root cause, intended target hosts, partial changes, approved " +
            "fix, and rollback plan before rerunning the job."
        }
      ],

      runbookChecklist: [
        "Record the incident and failed task.",
        "Confirm the environment and target hosts.",
        "Identify the local or remote identity.",
        "Inspect the exact failed operation and path.",
        "Collect sanitized logs and permission evidence.",
        "Determine whether SSH, filesystem, become, or policy caused the denial.",
        "Apply the approved least-privilege correction.",
        "Validate access and rerun the controlled task.",
        "Verify service health and deployment completion.",
        "Document root cause and preventive action."
      ]
    }
  ]
};

export default permissionDeniedGuide;

