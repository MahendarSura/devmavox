
export interface DiagnosticCommand {
  title: string;
  command: string;
  purpose: string;
  expectedOutput: string;
  failureOutput: string;
  interpretation: string;
  nextAction: string;
  risk: "Read-only" | "Low" | "Change required";
}

export interface RootCause {
  cause: string;
  symptoms: string[];
  confirmation: string[];
  fix: string[];
  verification: string[];
}

export interface InterviewQuestion {
  question: string;
  answer: string;
}

export const inventoryNotFoundGuide = {
  id: "ansible-inventory-not-found",
  title: "Ansible Inventory Not Found",
  category: "Ansible",
  difficulty: "Intermediate",
  estimatedTime: "20–45 minutes",

  summary:
    "A production deployment fails because Ansible cannot locate, " +
    "parse, or correctly interpret its inventory. This guide follows " +
    "a structured incident investigation from initial alert to recovery.",

  learningObjectives: [
    "Understand how Ansible inventory selection works.",
    "Identify the inventory source used by a local command or CI pipeline.",
    "Distinguish a missing file from a parsing or host-selection problem.",
    "Use diagnostic output to identify the actual root cause.",
    "Restore the intended inventory without targeting the wrong servers.",
    "Verify recovery and prevent the incident from recurring."
  ],

  incident: {
    title: "Deployment pipeline unexpectedly selects zero hosts",

    environment: [
      "Ansible controls a group of application servers.",
      "The deployment runs through a CI/CD pipeline.",
      "The pipeline worked during the previous deployment.",
      "A recent repository change or pipeline configuration change is suspected."
    ],

    alert:
      "The deployment log reports that no inventory was successfully parsed, " +
      "or the playbook reports that no hosts matched the requested pattern.",

    impact:
      "The deployment may fail or skip intended servers. The release can be " +
      "delayed. If the wrong inventory is selected, an automation run could " +
      "target an unintended environment.",

    severity:
      "Assess severity from user impact, release urgency, environment, and " +
      "whether any changes have already been applied. Do not automatically " +
      "classify every inventory error as a production outage.",

    immediateActions: [
      "Pause the affected deployment if the intended target hosts are uncertain.",
      "Identify whether production, staging, or development is affected.",
      "Preserve the failed pipeline logs and the relevant commit identifier.",
      "Check whether the playbook executed any tasks before failing.",
      "Do not substitute an arbitrary inventory file to make the pipeline pass."
    ]
  },

  sections: [
    {
      title: "1. Understand the error",

      explanation:
        "An Ansible inventory defines the hosts and groups managed by Ansible. " +
        "It can be a static INI file, a YAML file, or a dynamic inventory source. " +
        "Ansible must locate and interpret the inventory before it can reliably " +
        "select the intended hosts for a playbook.",

      howItWorks: [
        "The operator or CI job invokes ansible-playbook or ansible-inventory.",
        "Ansible determines which inventory source to use from command-line " +
          "arguments, configuration, or applicable defaults.",
        "The inventory source is loaded and parsed.",
        "Ansible constructs its host and group information.",
        "The playbook's hosts pattern is matched against that information.",
        "Tasks execute only for the hosts selected by the play and applicable conditions."
      ],

      importantDistinction:
        "Inventory file missing, inventory parsing failure, an empty inventory, " +
        "and a valid inventory with an unmatched host pattern are different " +
        "problems. Identify which one is happening before applying a fix.",

      symptoms: [
        "Ansible cannot locate the specified inventory file.",
        "Ansible reports that no inventory source was successfully parsed.",
        "The expected hosts or groups are absent from inventory output.",
        "The playbook reports that no hosts matched the requested pattern.",
        "The local command works but the CI pipeline fails."
      ]
    },

    {
      title: "2. Identify the impact",

      investigation: [
        {
          question: "Which environment is affected?",
          action:
            "Identify the intended account, environment, inventory path, " +
            "and deployment target from the approved release configuration."
        },
        {
          question: "Did the playbook execute any tasks?",
          action:
            "Inspect the complete job log and task results. Determine whether " +
            "the failure happened before execution or after some hosts changed."
        },
        {
          question: "Did the inventory recently change?",
          action:
            "Check the latest commit, pipeline variables, workspace path, " +
            "inventory rename, and configuration changes."
        },
        {
          question: "Could the wrong hosts be selected?",
          action:
            "Compare the selected hosts with the approved deployment target list. " +
            "Stop if the environment or target list is uncertain."
        }
      ],

      severityGuidance: [
        "Low: a development run fails before any changes occur.",
        "Medium: a release is blocked or staging deployment is delayed.",
        "High: a production release is blocked or the intended fleet is unavailable.",
        "Critical: an active outage or unintended changes create immediate risk."
      ],

      evidenceToPreserve: [
        "Timestamp and pipeline run ID.",
        "Ansible version and relevant configuration.",
        "Inventory path and source revision.",
        "Complete error output and selected host list.",
        "Recent changes to the pipeline or inventory."
      ]
    },

    {
      title: "3. Run diagnostics",

      safety:
        "Begin with read-only checks. Run commands in the same repository and " +
        "execution environment as the failed job. Redact secrets, tokens, private " +
        "hostnames, and sensitive inventory data before sharing logs.",

      commands: [
        {
          title: "Check the working directory",
          command: "pwd",
          purpose:
            "Establish the current directory because relative inventory paths " +
            "depend on the execution context.",
          expectedOutput:
            "/workspace/deployment",
          failureOutput:
            "The output shows a directory different from the expected project directory.",
          interpretation:
            "The job may be executing from another directory or workspace.",
          nextAction:
            "Compare the output with the CI job configuration and repository layout.",
          risk: "Read-only"
        },
        {
          title: "Check the Ansible version",
          command: "ansible --version",
          purpose:
            "Identify the installed version and the configuration file Ansible reports.",
          expectedOutput:
            "ansible [core ...]\n  config file = /workspace/deployment/ansible.cfg",
          failureOutput:
            "ansible: command not found",
          interpretation:
            "Ansible may not be installed in this shell, container, or runner.",
          nextAction:
            "Check the job image, virtual environment, and PATH before investigating inventory syntax.",
          risk: "Read-only"
        },
        {
          title: "Check the inventory file",
          command: "ls -l ./inventory.ini",
          purpose:
            "Verify the expected file exists at the specified path.",
          expectedOutput:
            "-rw-r--r-- 1 runner runner 120 Oct 26 10:30 inventory.ini",
          failureOutput:
            "ls: cannot access './inventory.ini': No such file or directory",
          interpretation:
            "The file is absent at this path. This alone does not prove the file is missing from the repository.",
          nextAction:
            "Check the repository layout, filename case, checkout contents, and configured inventory path.",
          risk: "Read-only"
        },
        {
          title: "Inspect inventory-related configuration",
          command: "ansible-config dump --only-changed",
          purpose:
            "Inspect configuration values that differ from Ansible defaults.",
          expectedOutput:
            "A list of changed settings, possibly including DEFAULT_HOST_LIST.",
          failureOutput:
            "The command is unavailable or the output does not show an inventory override.",
          interpretation:
            "The absence of an override does not prove a configuration problem. An explicit -i argument can select another source.",
          nextAction:
            "Inspect the exact command used by the failed pipeline and the applicable ansible.cfg.",
          risk: "Read-only"
        },
        {
          title: "List inventory hosts",
          command:
            "ansible-inventory -i ./inventory.ini --list",
          purpose:
            "Parse the specified inventory and display its host and group data.",
          expectedOutput:
            '{\n  "_meta": {\n    "hostvars": {}\n  },\n  "all": {\n    "children": ["ungrouped", "webservers"]\n  },\n  "webservers": {\n    "hosts": ["web01", "web02"]\n  }\n}',
          failureOutput:
            "ERROR! Unable to parse ... inventory source",
          interpretation:
            "Successful output indicates that the source can be parsed. A parser error requires investigation of the actual source and diagnostic message.",
          nextAction:
            "If parsing succeeds, inspect the groups and the playbook's hosts pattern next.",
          risk: "Read-only"
        },
        {
          title: "Inspect inventory groups",
          command:
            "ansible-inventory -i ./inventory.ini --graph",
          purpose:
            "Show the inventory hierarchy in a readable format.",
          expectedOutput:
            "@all:\n  |--@ungrouped:\n  |--@webservers:\n  |  |--web01\n  |  |--web02",
          failureOutput:
            "The expected webservers group or its hosts are absent.",
          interpretation:
            "The inventory may be valid but contain different group names or host entries.",
          nextAction:
            "Compare the actual group names with the hosts pattern in the playbook.",
          risk: "Read-only"
        },
        {
          title: "Preview playbook target hosts",
          command:
            "ansible-playbook -i ./inventory.ini deploy.yml --list-hosts",
          purpose:
            "Show which hosts the playbook would target without running its tasks.",
          expectedOutput:
            "play #1 (webservers):\n  hosts (2):\n    web01\n    web02",
          failureOutput:
            "The play selects zero hosts or reports that the pattern did not match.",
          interpretation:
            "The inventory may parse successfully while the playbook targets a nonexistent group or host pattern.",
          nextAction:
            "Inspect the playbook's hosts value and compare it with the inventory graph.",
          risk: "Read-only"
        }
      ],

      additionalChecks: [
        {
          scenario: "The local machine succeeds but CI fails.",
          checks: [
            "Compare the exact command and working directory.",
            "Check whether the inventory is included in the CI checkout.",
            "Check the runner's filesystem and file permissions.",
            "Compare relevant configuration and environment variables.",
            "Verify that the CI job uses the expected branch and commit."
          ]
        },
        {
          scenario: "The inventory uses a dynamic source.",
          checks: [
            "Identify the inventory plugin or script.",
            "Check required dependencies and authentication configuration.",
            "Inspect the plugin's errors without printing credentials.",
            "Confirm the expected hosts are returned by the source."
          ]
        }
      ]
    },

    {
      title: "4. Understand the output",

      interpretations: [
        {
          output: "No such file or directory",
          meaning:
            "The specified path cannot be opened in the current execution environment.",
          investigation:
            "Check the working directory, file path, filename case, and checkout contents."
        },
        {
          output: "Unable to parse inventory source",
          meaning:
            "Ansible could not interpret the source as a usable inventory.",
          investigation:
            "Read the full parser message. Check syntax, format, plugin configuration, and source-specific errors."
        },
        {
          output: "No inventory was parsed",
          meaning:
            "No usable inventory source was loaded successfully.",
          investigation:
            "Confirm the source path and inspect the errors for every intended inventory source."
        },
        {
          output: "No hosts matched",
          meaning:
            "The playbook's host pattern did not select the expected inventory hosts.",
          investigation:
            "Compare the playbook's hosts pattern against ansible-inventory --graph."
        },
        {
          output: "Expected group is missing",
          meaning:
            "The inventory does not contain the group name expected by the playbook, or the selected source is different.",
          investigation:
            "Inspect the group definitions and confirm that the command uses the intended inventory."
        }
      ],

      importantRule:
        "Do not treat every inventory warning as the same failure. Record the exact message, confirm the failing stage, and select the next diagnostic check based on evidence."
    },

    {
      title: "5. Find the root cause",

      rootCauses: [
        {
          cause: "Incorrect relative path",
          symptoms: [
            "The file exists in the repository but cannot be found by the job."
          ],
          confirmation: [
            "The working directory differs from the directory assumed by the command.",
            "The inventory is present at another known path."
          ],
          fix: [
            "Use the verified repository-relative or absolute path.",
            "Update the pipeline working directory only if that is the intended design.",
            "Keep environment-specific inventory selection explicit."
          ],
          verification: [
            "Run ansible-inventory against the corrected path.",
            "Inspect the resulting groups and hosts.",
            "Preview the playbook host list."
          ]
        },
        {
          cause: "Inventory file missing from the CI workspace",
          symptoms: [
            "The inventory exists on a developer machine but not on the runner."
          ],
          confirmation: [
            "The checked-out workspace does not contain the expected file.",
            "The pipeline uses the wrong repository, branch, or generated-artifact path."
          ],
          fix: [
            "Restore the intended tracked file or correct the checkout step.",
            "If the inventory is generated, fix the approved generation step.",
            "Do not commit secrets or sensitive production host data to a public repository."
          ],
          verification: [
            "Confirm the expected file exists in the runner workspace.",
            "Parse the inventory in the same job environment.",
            "Preview the target hosts before deployment."
          ]
        },
        {
          cause: "Invalid inventory syntax",
          symptoms: [
            "Ansible reports a parser error against the selected source."
          ],
          confirmation: [
            "The full parser output identifies a syntax or formatting problem.",
            "The failing section can be reproduced with the same Ansible environment."
          ],
          fix: [
            "Correct the specific invalid INI or YAML syntax.",
            "Preserve valid host and group definitions.",
            "Review the diff before accepting the change."
          ],
          verification: [
            "Run ansible-inventory --list.",
            "Run ansible-inventory --graph.",
            "Check that expected host variables and groups remain present."
          ]
        },
        {
          cause: "Playbook host pattern does not match",
          symptoms: [
            "Inventory parsing succeeds, but the play selects no intended hosts."
          ],
          confirmation: [
            "The inventory graph shows different group names or host entries.",
            "The playbook's hosts value does not match the intended inventory group."
          ],
          fix: [
            "Correct the inventory group or playbook host pattern based on the approved design.",
            "Avoid changing the pattern merely to make the run select more hosts."
          ],
          verification: [
            "Run ansible-playbook with --list-hosts.",
            "Compare the target list with the release plan.",
            "Obtain required approval before a production execution."
          ]
        },
        {
          cause: "Dynamic inventory source failure",
          symptoms: [
            "Static inventory works but a cloud or plugin-based source fails."
          ],
          confirmation: [
            "The source-specific diagnostic reports authentication, dependency, or API errors.",
            "The dynamic source returns no expected hosts."
          ],
          fix: [
            "Correct the identified dependency, authentication configuration, or plugin settings.",
            "Use approved credentials and the intended cloud account.",
            "Do not bypass access controls by switching to an unapproved inventory."
          ],
          verification: [
            "Run the inventory source again.",
            "Confirm expected hosts and groups appear.",
            "Verify the intended account and environment before execution."
          ]
        },
        {
          cause: "Wrong inventory selected",
          symptoms: [
            "The command succeeds but lists an unexpected set of hosts."
          ],
          confirmation: [
            "The effective command, configuration, or pipeline variable points to another inventory.",
            "The returned host list does not match the release target."
          ],
          fix: [
            "Correct the explicit inventory argument or the responsible configuration.",
            "Keep environment selection visible and auditable.",
            "Stop deployment until the correct target list is confirmed."
          ],
          verification: [
            "Re-run the inventory graph.",
            "Re-run --list-hosts.",
            "Compare hosts and environment against the approved deployment request."
          ]
        }
      ]
    },

    {
      title: "6. Fix and verify",

      recoveryProcedure: [
        {
          step: 1,
          action:
            "Pause the affected deployment while the target environment or hosts are uncertain."
        },
        {
          step: 2,
          action:
            "Identify the root cause from diagnostic evidence. Do not apply fixes based only on the error title."
        },
        {
          step: 3,
          action:
            "Make the smallest approved correction to the path, inventory source, syntax, group, or configuration."
        },
        {
          step: 4,
          action:
            "Review the change in version control and validate it in a non-production environment when appropriate."
        },
        {
          step: 5,
          action:
            "Run ansible-inventory --list and --graph against the corrected source."
        },
        {
          step: 6,
          action:
            "Run ansible-playbook with --list-hosts and compare the result against the intended target list."
        },
        {
          step: 7,
          action:
            "Run an approved connectivity test if needed. Use a limited, known target group rather than an unrestricted fleet."
        },
        {
          step: 8,
          action:
            "Execute the deployment only after target verification and required approvals."
        },
        {
          step: 9,
          action:
            "Review task results, application health, and deployment logs after the run."
        }
      ],

      exampleConnectivityCommand:
        "ansible webservers -i ./inventory.ini -m ping",

      connectivityExplanation:
        "The ping module checks Ansible connectivity and remote Python/module execution; " +
        "it is not an ICMP network ping. Run it only against the verified host group.",

      successCriteria: [
        "The intended inventory source loads successfully.",
        "Expected groups and hosts appear in the inventory graph.",
        "The playbook target list matches the approved deployment scope.",
        "Connectivity checks succeed where required.",
        "The deployment completes and application health checks pass.",
        "No unintended hosts or environments were modified."
      ],

      rollbackPlan: [
        "If the inventory change selects unintended hosts, stop the rollout immediately.",
        "Restore the previous reviewed inventory or configuration version if appropriate.",
        "If deployment tasks already changed systems, assess those changes separately.",
        "Use the service's approved rollback procedure if application changes caused impact.",
        "Re-validate the target list before attempting another deployment."
      ],

      safetyWarnings: [
        "Do not run a production playbook until its target list is verified.",
        "Do not use --limit as a substitute for understanding a wrong inventory.",
        "Do not print secrets from environment variables or configuration files into logs.",
        "Do not assume --check prevents every possible side effect.",
        "Follow change approval and incident procedures for production systems."
      ]
    },

    {
      title: "7. Prevent recurrence",

      prevention: [
        "Keep inventory paths and environment selection explicit in CI/CD.",
        "Validate inventory sources in pull requests.",
        "Run an inventory parsing check before deployment jobs.",
        "Use separate, clearly named inventories for development, staging, and production.",
        "Add a pre-deployment check that rejects an unexpected empty host list.",
        "Review inventory changes and target hosts as part of change approval.",
        "Pin and test Ansible versions and required inventory plugins.",
        "Keep secrets in approved secret-management systems.",
        "Record the root cause and update the runbook after incidents."
      ],

      monitoringAndAutomation: [
        {
          control: "Inventory validation",
          description:
            "Fail the pipeline if the intended inventory cannot be parsed."
        },
        {
          control: "Target validation",
          description:
            "Compare the selected host count and environment against expected deployment parameters."
        },
        {
          control: "Pipeline alerting",
          description:
            "Notify the responsible team when inventory validation blocks a release."
        },
        {
          control: "Audit trail",
          description:
            "Record the inventory revision, pipeline run, target scope, and approval."
        }
      ],

      commonMistakes: [
        "Fixing the path without checking which environment it selects.",
        "Treating a valid inventory with a mismatched group as a parsing failure.",
        "Ignoring the complete parser error.",
        "Using a local inventory file that is absent from the CI runner.",
        "Running a full production playbook to test inventory syntax.",
        "Exposing credentials while collecting debug output."
      ],

      runbookChecklist: [
        "Identify the affected environment.",
        "Preserve the failed job logs.",
        "Confirm the working directory and Ansible version.",
        "Identify the effective inventory source.",
        "Validate inventory parsing.",
        "Inspect groups and hosts.",
        "Preview the playbook's target list.",
        "Confirm the root cause with evidence.",
        "Apply the approved correction.",
        "Verify connectivity and deployment results.",
        "Confirm application health.",
        "Record prevention actions."
      ],

      interviewQuestions: [
        {
          question: "What is an Ansible inventory?",
          answer:
            "It defines the hosts and groups that Ansible can manage. " +
            "Inventory can be static or generated dynamically."
        },
        {
          question: "How do you inspect inventory groups?",
          answer:
            "Use ansible-inventory -i inventory.ini --graph."
        },
        {
          question: "How do you see which hosts a playbook will target?",
          answer:
            "Use ansible-playbook -i inventory.ini playbook.yml --list-hosts."
        },
        {
          question: "What is the difference between an inventory parsing error and no hosts matched?",
          answer:
            "A parsing error means the source could not be loaded correctly. " +
            "No hosts matched means the selected host pattern did not select " +
            "the intended hosts from the available inventory."
        },
        {
          question: "Why can an inventory work locally but fail in CI?",
          answer:
            "The runner may use a different working directory, checkout, " +
            "configuration, credentials, dependency set, or inventory path."
        },
        {
          question: "Should you immediately run the playbook again after fixing the path?",
          answer:
            "No. First inspect the inventory graph and playbook target list. " +
            "Confirm the intended environment and obtain required approval."
        }
      ]
    }
  ]
};

export default inventoryNotFoundGuide;
