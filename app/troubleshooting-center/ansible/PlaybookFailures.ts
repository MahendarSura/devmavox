
export interface AnsiblePlaybookFailureDiagnosticStep {
  title: string;
  purpose: string;
  commands: string[];
  expectedEvidence: string[];
  interpretation: string[];
  nextAction: string[];
  safetyNotes: string[];
}

export interface AnsiblePlaybookFailureRootCause {
  id: string;
  title: string;
  symptoms: string[];
  evidence: string[];
  diagnosticCommands: string[];
  interpretation: string[];
  remediation: string[];
  validation: string[];
  prevention: string[];
  severity: "Critical" | "High" | "Medium" | "Low";
}

export interface AnsiblePlaybookFailureScenario {
  title: string;
  symptom: string;
  productionImpact: string[];
  investigation: string[];
  fix: string[];
  validation: string[];
  prevention: string[];
}

export interface AnsiblePlaybookFailureInterviewQuestion {
  question: string;
  answer: string;
  productionExample: string;
  followUp: string;
}

export interface AnsiblePlaybookFailureGuide {
  title: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  severity: string;
  estimatedResolutionTime: string;
  tags: string[];
  symptoms: string[];
  incidentScenario: {
    title: string;
    situation: string;
    businessImpact: string[];
    firstResponse: string[];
    successCriteria: string[];
  };
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: AnsiblePlaybookFailureDiagnosticStep[];
  rootCauses: AnsiblePlaybookFailureRootCause[];
  productionScenarios: AnsiblePlaybookFailureScenario[];
  decisionTree: {
    condition: string;
    action: string;
    nextStep: string;
  }[];
  recoveryProcedure: string[];
  rollbackGuidance: string[];
  preventionChecklist: string[];
  ciCdRecommendations: string[];
  observabilityRecommendations: string[];
  commonMistakes: string[];
  incidentReportTemplate: string[];
  productionChecklist: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    setup: string[];
    procedure: string[];
    expectedResult: string[];
    learningPoints: string[];
  }[];
  interviewQuestions: AnsiblePlaybookFailureInterviewQuestion[];
  references: {
    title: string;
    url: string;
    purpose: string;
  }[];
}

export const ansiblePlaybookFailuresGuide: AnsiblePlaybookFailureGuide = {
  title: "Ansible Playbook Failures — Production Troubleshooting",
  slug: "ansible-playbook-failures",
  category: "Ansible",
  summary:
    "A production-oriented runbook for diagnosing failed Ansible playbooks, " +
    "isolating root causes from execution evidence, recovering safely, and " +
    "preventing repeated deployment failures.",
  description:
    "Covers YAML and task errors, undefined variables, unreachable hosts, " +
    "SSH and become failures, role and collection dependencies, handlers, " +
    "conditional execution, partial deployments, CI/CD problems, and " +
    "post-recovery verification.",
  severity: "Context-dependent: Critical to Low",
  estimatedResolutionTime:
    "15 minutes to several hours depending on impact, root cause, and recovery risk.",
  tags: [
    "ansible",
    "playbook",
    "production",
    "deployment",
    "yaml",
    "ssh",
    "become",
    "inventory",
    "ci-cd",
    "rollback",
    "incident-response",
    "idempotency",
  ],

  symptoms: [
    "ansible-playbook exits with a non-zero status.",
    "One or more tasks report FAILED!.",
    "A host reports UNREACHABLE!.",
    "The playbook stops before completing all plays.",
    "A task is unexpectedly skipped.",
    "The playbook reports success, but the application is unhealthy.",
    "A handler does not run after a configuration change.",
    "A deployment changes some hosts but fails on others.",
    "A playbook works locally but fails in CI/CD.",
    "A role or module cannot be resolved.",
    "An undefined variable or template error appears.",
    "A command succeeds manually but fails under Ansible.",
    "The run hangs, times out, or waits indefinitely.",
    "A retry causes duplicate changes or another failure.",
  ],

  incidentScenario: {
    title: "Production deployment fails halfway through an Ansible run",

    situation:
      "A CI/CD deployment starts against 60 application servers. The first " +
      "batch receives a configuration update, but subsequent tasks fail on " +
      "several hosts because of an unexpected variable value and a service " +
      "restart error. The pipeline is marked failed. Some hosts may already " +
      "have changed, so blindly rerunning the playbook could increase the outage.",

    businessImpact: [
      "Some application instances may run the new configuration while others run the old configuration.",
      "Traffic may be distributed across inconsistent application versions.",
      "A failed migration or restart may leave a service unavailable.",
      "Repeated retries may restart services or repeat non-idempotent operations.",
      "The pipeline status alone does not establish the actual state of every target.",
      "The incident may affect production availability, data consistency, or deployment deadlines.",
    ],

    firstResponse: [
      "Pause automatic retries and additional deployments if they could compound the incident.",
      "Identify the exact failed job, commit, environment, inventory, playbook, and target hosts.",
      "Read the first meaningful failure and its preceding task output.",
      "Determine which tasks reported changed before the failure.",
      "Check application health and host state using approved read-only checks.",
      "Notify the incident owner and follow the production change approval process.",
      "Choose a fix only after separating the original failure from any resulting service impact.",
    ],

    successCriteria: [
      "The original root cause is supported by reproducible evidence.",
      "The target environment and host scope are confirmed.",
      "The intended configuration is present on all required hosts.",
      "Application health and deployment invariants pass.",
      "No unresolved failed or unreachable hosts remain without an explicit disposition.",
      "The pipeline exit status agrees with independently verified system health.",
      "The incident report records the cause, remediation, and preventive actions.",
    ],
  },

  impactAssessment: [
    "Determine whether the failure affects development, staging, or production.",
    "Identify the business service and customer-facing functionality involved.",
    "Record the pipeline run ID, repository commit, start time, failure time, and operator.",
    "Determine whether the playbook failed before making changes or after partially changing the environment.",
    "Identify hosts that succeeded, failed, became unreachable, or were skipped.",
    "Check whether the playbook performed package upgrades, service restarts, firewall changes, database migrations, or other high-risk operations.",
    "Check whether a handler, asynchronous task, reboot, or external command may still be running.",
    "Determine whether a previous or concurrent deployment is modifying the same hosts.",
    "Assess whether rollback is safe and whether rollback itself could destroy newer state.",
    "Assign incident severity based on customer impact, blast radius, recoverability, and data risk—not merely the Ansible exit code.",
  ],

  safetyChecks: [
    "Confirm the current Git repository and branch.",
    "Confirm the commit SHA used by the failed deployment.",
    "Confirm the playbook path and current working directory.",
    "Confirm the inventory source and intended environment.",
    "Confirm the target hosts before executing any write operation.",
    "Use approved read-only diagnostics first.",
    "Do not print Vault passwords, private keys, tokens, or secret variable values into logs.",
    "Check whether production approval is required before changing configuration or rerunning deployment.",
    "Avoid using --limit, --tags, or --start-at-task without understanding their effect on prerequisites and handlers.",
    "Avoid blindly using --force-handlers: a handler may restart a service after a prerequisite task failed.",
    "Avoid globally setting ignore_errors or ignore_unreachable to make a red pipeline appear green.",
    "Never assume that failed means unchanged; inspect the tasks that ran before the failure.",
    "Do not run a production rollback until the rollback target, data compatibility, and recovery plan are understood.",
    "Do not use --check as proof that every real-world side effect is safe or fully predicted.",
  ],

  evidenceCollection: [
    "Capture the complete failed task output, including the task name and host.",
    "Capture the play recap and process exit code.",
    "Record the exact Ansible version and Python runtime.",
    "Record the active configuration file and changed configuration settings.",
    "Record the inventory path or inventory plugin configuration.",
    "Record the working directory and relevant non-secret environment variables.",
    "Record the repository commit, changed files, and dependency lock files.",
    "Record the execution environment or container image digest when applicable.",
    "Record the failed task's variables and types, after redacting secrets.",
    "Record whether a task returned changed, failed, skipped, or unreachable.",
    "Capture service health, application health, and deployment version before recovery.",
    "Preserve logs before rerunning, because a new execution can obscure the original failure.",
    "Use timestamps from the controller, CI runner, and target systems to correlate events.",
  ],

  diagnosticWorkflow: [
    {
      title: "1. Freeze risky retries and establish the incident boundary",
      purpose:
        "Prevent automated or manual retries from making a partial deployment worse.",
      commands: [
        "date -Is",
        "git rev-parse --show-toplevel",
        "git rev-parse HEAD",
        "git status --short",
        "ansible --version",
      ],
      expectedEvidence: [
        "Current timestamp and repository root.",
        "Commit SHA and uncommitted repository changes.",
        "Ansible executable, core version, Python version, and configuration-file path.",
      ],
      interpretation: [
        "A commit mismatch means the local source may not match the failed pipeline.",
        "Uncommitted changes may explain why local reproduction differs from CI.",
        "A different Ansible version can change module behavior, templating, or plugin compatibility.",
      ],
      nextAction: [
        "Preserve the failed pipeline logs.",
        "Switch to the exact deployed commit in an isolated workspace if reproduction is required.",
        "Confirm the deployment environment before any remediation.",
      ],
      safetyNotes: [
        "Do not reset or overwrite a shared working tree during an active incident.",
        "Do not rerun deployment just to obtain better logs.",
      ],
    },
    {
      title: "2. Find the first meaningful failure",
      purpose:
        "Identify the original failing task rather than treating every later symptom as an independent root cause.",
      commands: [
        "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
        "ansible-playbook -i inventory/production.ini site.yml --list-tasks",
      ],
      expectedEvidence: [
        "The hosts selected by the playbook.",
        "The task sequence that Ansible plans to execute.",
        "The actual failed task and host from the preserved original log.",
      ],
      interpretation: [
        "The list commands inspect planned scope and tasks; they do not reproduce the original task failure.",
        "A later service-health failure may be a consequence of an earlier configuration failure.",
        "A task may fail on only one host because of host-specific state or variables.",
      ],
      nextAction: [
        "Locate the first FAILED!, UNREACHABLE!, fatal parser error, or unexpected skipped task.",
        "Read the surrounding log lines and identify the immediately preceding successful changes.",
        "Build a list of hosts that may have changed before failure.",
      ],
      safetyNotes: [
        "Use the same approved inventory source and configuration as the failed run.",
        "Inventory plugins can contact external systems even when resolving hosts; understand plugin behavior.",
      ],
    },
    {
      title: "3. Inspect effective Ansible configuration",
      purpose:
        "Find differences in configuration, plugin paths, privilege escalation, SSH settings, and execution context.",
      commands: [
        "ansible-config view",
        "ansible-config dump --only-changed",
        "ansible --version",
        "ansible-inventory -i inventory/production.ini --graph",
      ],
      expectedEvidence: [
        "Active ansible.cfg and non-default settings.",
        "Configured inventory, roles, collections, connection, and privilege-escalation settings.",
        "Inventory group hierarchy.",
      ],
      interpretation: [
        "A different active configuration file may explain a local-versus-CI mismatch.",
        "Unexpected inventory groups may indicate the wrong inventory or group naming.",
        "Missing hosts may indicate inventory parsing, filtering, or dynamic inventory problems.",
      ],
      nextAction: [
        "Compare effective settings with a known-good pipeline run.",
        "Verify inventory source and intended group membership.",
        "Inspect plugin-specific settings when dynamic inventory is involved.",
      ],
      safetyNotes: [
        "Review output for sensitive paths or environment-specific information before sharing it.",
        "Dynamic inventory execution may require credentials or access to external systems.",
      ],
    },
    {
      title: "4. Validate syntax and task structure",
      purpose:
        "Separate parsing, playbook structure, and task-definition errors from remote execution failures.",
      commands: [
        "ansible-playbook -i inventory/production.ini site.yml --syntax-check",
        "ansible-lint site.yml",
        "ansible-doc ansible.builtin.copy",
        "ansible-doc ansible.builtin.template",
      ],
      expectedEvidence: [
        "Syntax-check result.",
        "Lint findings and rule identifiers.",
        "Module documentation for the task that failed.",
      ],
      interpretation: [
        "A syntax-check failure points to playbook parsing or structural problems.",
        "Lint warnings may reveal unsafe patterns but do not necessarily explain the original runtime failure.",
        "An unsupported parameter may indicate a typo, wrong module, or incompatible collection version.",
      ],
      nextAction: [
        "Correct the specific syntax or schema error.",
        "Verify module fully qualified collection names and installed versions.",
        "Rerun validation before attempting deployment.",
      ],
      safetyNotes: [
        "Syntax checking does not establish connectivity, permissions, or application health.",
        "Lint results should be evaluated against the repository's pinned tool version and policy.",
      ],
    },
    {
      title: "5. Validate connection and privilege escalation",
      purpose:
        "Determine whether failures occur before task execution or during a privileged operation.",
      commands: [
        "ansible production -i inventory/production.ini -m ansible.builtin.ping",
        "ansible production -i inventory/production.ini -m ansible.builtin.command -a 'id'",
        "ansible production -i inventory/production.ini -b -m ansible.builtin.command -a 'id'",
      ],
      expectedEvidence: [
        "Connection success or UNREACHABLE output.",
        "Remote execution identity.",
        "Effective identity after privilege escalation.",
      ],
      interpretation: [
        "A connection failure points toward DNS, routing, SSH, credentials, or connection-plugin configuration.",
        "A successful unprivileged command with a failed become command points toward privilege escalation.",
        "A successful ping module does not prove that a service restart or application deployment will succeed.",
      ],
      nextAction: [
        "Inspect SSH authentication and target-side authentication logs.",
        "Validate become policy and approved privilege-escalation credentials.",
        "Test the exact required operation on an approved non-production host.",
      ],
      safetyNotes: [
        "These commands execute against selected hosts; confirm scope first.",
        "Do not expose passwords or private-key material.",
        "Do not use broad ad-hoc commands against production without change authorization.",
      ],
    },
    {
      title: "6. Inspect variables, templates, and task inputs",
      purpose:
        "Prove whether a failure comes from missing data, an incorrect type, precedence, or invalid template output.",
      commands: [
        "ansible-inventory -i inventory/production.ini --host app01",
        "ansible-playbook -i inventory/production.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/production.ini site.yml --list-tasks",
      ],
      expectedEvidence: [
        "Resolved inventory variables, subject to inventory and plugin support.",
        "Task structure and variable references in the source.",
        "The failed task's variable names and expected types.",
      ],
      interpretation: [
        "An undefined-variable error may be caused by missing group_vars, host_vars, role defaults, or a misspelled variable.",
        "A value defined in one environment but absent in another points toward environment-specific input.",
        "A string supplied where a list or mapping is expected may fail later during templating or module argument validation.",
      ],
      nextAction: [
        "Trace the variable from its source to the consuming task.",
        "Compare variable names, types, and precedence across environments.",
        "Validate generated configuration before applying it.",
      ],
      safetyNotes: [
        "Inventory host output can contain credentials or sensitive configuration.",
        "Do not paste unredacted variables into tickets or public logs.",
      ],
    },
    {
      title: "7. Inspect dependency and execution-environment drift",
      purpose:
        "Identify missing roles, collections, Python libraries, or differences in the runner image.",
      commands: [
        "ansible-galaxy collection list",
        "ansible-galaxy role list",
        "python --version",
        "ansible-doc -t module ansible.builtin.service",
      ],
      expectedEvidence: [
        "Installed collection and role versions.",
        "Python runtime and module availability.",
        "Module documentation accessible in the current environment.",
      ],
      interpretation: [
        "A missing fully qualified module may indicate an absent collection or incorrect collection search path.",
        "A failure only in CI may indicate a different execution image or unpinned dependency.",
        "A Python import error may indicate a dependency missing from the controller or target, depending on the module.",
      ],
      nextAction: [
        "Compare the failed runner with the last successful runner.",
        "Install dependencies from the approved requirements and lock process.",
        "Rebuild and validate the execution environment in CI.",
      ],
      safetyNotes: [
        "Do not install arbitrary latest dependencies during a production incident.",
        "Pin and review dependency versions before changing a shared runner image.",
      ],
    },
    {
      title: "8. Determine partial-change scope",
      purpose:
        "Establish whether the system is safe to retry, needs targeted repair, or requires rollback.",
      commands: [
        "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
        "ansible-playbook -i inventory/production.ini site.yml --list-tasks",
      ],
      expectedEvidence: [
        "Intended target set and task order.",
        "Original run's per-host recap and changed-task output.",
        "Independent service and configuration health checks.",
      ],
      interpretation: [
        "A failed recap does not automatically mean no changes were made.",
        "A host marked changed may have completed a state change before a later task failed.",
        "A host marked unreachable may have received changes before connectivity was lost.",
      ],
      nextAction: [
        "Build a per-host deployment-state matrix.",
        "Verify actual state using approved read-only checks.",
        "Choose a targeted retry, repair, or rollback based on evidence.",
      ],
      safetyNotes: [
        "The list commands do not recover or roll back a deployment.",
        "Do not assume that rerunning the whole playbook is harmless.",
      ],
    },
    {
      title: "9. Validate the fix before production execution",
      purpose:
        "Test the smallest meaningful correction without expanding the incident blast radius.",
      commands: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-lint site.yml",
        "ansible-playbook -i inventory/staging.ini site.yml --check --diff",
      ],
      expectedEvidence: [
        "Syntax and lint results.",
        "Check-mode task results and supported diffs.",
        "Expected service and configuration state in staging.",
      ],
      interpretation: [
        "A successful check-mode run is useful evidence but cannot predict every real change.",
        "Some modules do not fully support check mode.",
        "A diff may expose secrets if the task is not configured to protect sensitive output.",
      ],
      nextAction: [
        "Test the exact fix in a representative environment.",
        "Review any planned change with the service owner.",
        "Prepare verification and rollback steps before production execution.",
      ],
      safetyNotes: [
        "Do not expose secrets in diff output.",
        "Do not use check mode as the sole production safety control.",
      ],
    },
    {
      title: "10. Perform a controlled recovery and verify outcomes",
      purpose:
        "Restore a consistent state and prove the deployment is healthy after the corrective run.",
      commands: [
        "ansible-playbook -i inventory/production.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
      ],
      expectedEvidence: [
        "Validated playbook and intended target set.",
        "Approved change window and rollback plan.",
        "Post-deployment health checks and a complete play recap.",
      ],
      interpretation: [
        "A successful process exit is necessary but may not prove application health.",
        "Unexpected changed counts may reveal hidden drift or non-idempotent tasks.",
        "Remaining unreachable hosts require explicit investigation rather than being silently excluded.",
      ],
      nextAction: [
        "Execute only the approved production command and scope.",
        "Monitor service health during rollout.",
        "Verify the application, configuration, and required hosts independently.",
        "Record the final state and close the incident only after success criteria are met.",
      ],
      safetyNotes: [
        "Do not invent or improvise a production command during an active incident.",
        "A rollback must be chosen based on application and data compatibility.",
      ],
    },
  ],

  rootCauses: [
    {
      id: "yaml-syntax",
      title: "Invalid YAML or playbook structure",
      severity: "Medium",
      symptoms: [
        "Parser error with a line or column reference.",
        "A task is interpreted at the wrong indentation level.",
        "A playbook fails before reaching remote hosts.",
      ],
      evidence: [
        "The syntax check fails before task execution.",
        "The error points to malformed YAML or an invalid play structure.",
      ],
      diagnosticCommands: [
        "ansible-playbook -i inventory/production.ini site.yml --syntax-check",
        "ansible-lint site.yml",
      ],
      interpretation: [
        "YAML indentation is structural; a task placed outside tasks may change playbook meaning.",
        "The displayed line may be near, but not always exactly at, the underlying malformed structure.",
      ],
      remediation: [
        "Correct indentation, quoting, list markers, or mapping structure.",
        "Check the diff for accidental whitespace changes.",
        "Run syntax check and lint before execution.",
      ],
      validation: [
        "Syntax check succeeds.",
        "Task listing matches the intended execution plan.",
        "Staging execution behaves as expected.",
      ],
      prevention: [
        "Run syntax checks in pull requests.",
        "Use YAML-aware editor support.",
        "Require review for changes to shared roles and playbooks.",
      ],
    },
    {
      id: "undefined-variable",
      title: "Undefined or incorrectly typed variable",
      severity: "High",
      symptoms: [
        "Ansible reports that a variable is undefined.",
        "A template fails to render.",
        "A module rejects a parameter value or type.",
      ],
      evidence: [
        "The failing task references the reported variable.",
        "The value is absent, misspelled, or has an unexpected type in the target environment.",
      ],
      diagnosticCommands: [
        "ansible-inventory -i inventory/production.ini --host app01",
        "ansible-playbook -i inventory/production.ini site.yml --syntax-check",
      ],
      interpretation: [
        "The source may be inventory variables, group_vars, host_vars, role defaults, extra vars, or a lookup.",
        "A variable available in staging may not exist in production.",
      ],
      remediation: [
        "Correct the variable name or define the required default.",
        "Validate type and allowed values before using the variable.",
        "Review variable precedence and environment-specific inputs.",
      ],
      validation: [
        "The variable resolves to the expected type.",
        "The generated template matches the intended configuration.",
        "Staging deployment and application checks pass.",
      ],
      prevention: [
        "Validate required variables early.",
        "Document required variable types and allowed values.",
        "Add representative inventory fixtures to CI.",
      ],
    },
    {
      id: "ssh-unreachable",
      title: "Target is unreachable",
      severity: "High",
      symptoms: [
        "UNREACHABLE! appears in task output.",
        "SSH connection times out or authentication fails.",
        "Several hosts fail at the same time.",
      ],
      evidence: [
        "Connection error, timeout, DNS failure, or authentication error.",
        "Controller-side connectivity checks or target authentication logs identify the failing layer.",
      ],
      diagnosticCommands: [
        "ansible production -i inventory/production.ini -m ansible.builtin.ping",
        "ssh -o BatchMode=yes -o ConnectTimeout=5 app01 true",
      ],
      interpretation: [
        "A connection timeout suggests routing, firewall, DNS, host availability, or SSH service issues.",
        "Permission denied suggests authentication or account authorization rather than YAML syntax.",
        "If all hosts fail together, investigate shared infrastructure and credentials first.",
      ],
      remediation: [
        "Restore the correct network route or approved firewall access.",
        "Correct SSH user, key selection, or account access.",
        "Verify the SSH service and target availability through the approved access path.",
      ],
      validation: [
        "Connectivity works for the intended hosts.",
        "The correct remote account is used.",
        "A non-destructive Ansible connectivity test passes.",
      ],
      prevention: [
        "Monitor controller-to-target connectivity.",
        "Rotate credentials using a controlled process.",
        "Keep connection timeouts and concurrency appropriate for the environment.",
      ],
    },
    {
      id: "become-failure",
      title: "Privilege escalation failed",
      severity: "High",
      symptoms: [
        "A task fails with a sudo or become error.",
        "Unprivileged commands work but privileged operations fail.",
        "A target user cannot perform the required operation.",
      ],
      evidence: [
        "The task output identifies privilege escalation as the failing stage.",
        "A controlled identity check shows the expected privileged identity was not obtained.",
      ],
      diagnosticCommands: [
        "ansible production -i inventory/production.ini -m ansible.builtin.command -a 'id'",
        "ansible production -i inventory/production.ini -b -m ansible.builtin.command -a 'id'",
      ],
      interpretation: [
        "The issue may be sudo policy, become method, become user, or missing authorization.",
        "A successful SSH login does not prove that privilege escalation is permitted.",
      ],
      remediation: [
        "Verify the approved sudo policy and become settings.",
        "Correct the intended become user or method.",
        "Use the approved secret source for become credentials.",
      ],
      validation: [
        "The expected effective identity is confirmed.",
        "The exact privileged operation succeeds in staging.",
      ],
      prevention: [
        "Test privilege escalation in CI where feasible.",
        "Document which roles require elevated privileges.",
        "Audit privilege changes and avoid unnecessary root execution.",
      ],
    },
    {
      id: "module-parameter",
      title: "Invalid module parameter or unavailable module",
      severity: "Medium",
      symptoms: [
        "An unsupported parameter is rejected.",
        "A module or action cannot be resolved.",
        "A role fails only after a dependency update.",
      ],
      evidence: [
        "The failure identifies a parameter, action, or module name.",
        "Installed Ansible and collection versions differ from the expected dependency set.",
      ],
      diagnosticCommands: [
        "ansible --version",
        "ansible-galaxy collection list",
        "ansible-doc ansible.builtin.copy",
      ],
      interpretation: [
        "The task may use the wrong module name or an unsupported parameter.",
        "The collection may be missing or incompatible with the current execution environment.",
      ],
      remediation: [
        "Use the correct module and fully qualified collection name.",
        "Check documentation for the installed version.",
        "Pin and install the approved collection version.",
      ],
      validation: [
        "The module is resolved in the execution environment.",
        "The task arguments match the installed module schema.",
        "CI and staging validation pass.",
      ],
      prevention: [
        "Pin collections in requirements files.",
        "Run dependency installation from a reproducible build.",
        "Test dependency upgrades separately from production deployments.",
      ],
    },
    {
      id: "template-rendering",
      title: "Template rendering or configuration validation failure",
      severity: "High",
      symptoms: [
        "A template task fails.",
        "A service rejects the generated configuration.",
        "The file changes but the application fails to start.",
      ],
      evidence: [
        "The rendered output contains a missing, malformed, or unexpected value.",
        "The application configuration validator identifies a syntax or semantic error.",
      ],
      diagnosticCommands: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/staging.ini site.yml --check --diff",
      ],
      interpretation: [
        "A syntactically valid Jinja template can still generate invalid application configuration.",
        "The application may require a separate configuration validation command.",
      ],
      remediation: [
        "Correct the source template or variable.",
        "Validate generated configuration before reloading or restarting the service.",
        "Use a safe deployment pattern such as validated temporary output followed by an approved replacement.",
      ],
      validation: [
        "The generated file matches the intended state.",
        "The application configuration test passes.",
        "The service is healthy after the controlled rollout.",
      ],
      prevention: [
        "Add configuration validation to the deployment workflow.",
        "Use template fixtures and representative environment variables.",
        "Avoid printing secret-bearing templates in logs.",
      ],
    },
    {
      id: "dependency-drift",
      title: "CI runner, Python, role, or collection dependency drift",
      severity: "Medium",
      symptoms: [
        "The playbook works locally but fails in CI.",
        "A previously available module cannot be found.",
        "A Python import or plugin initialization error occurs.",
      ],
      evidence: [
        "Runner image, Ansible version, Python version, or collection versions differ.",
        "The last successful run used a different execution environment.",
      ],
      diagnosticCommands: [
        "ansible --version",
        "python --version",
        "ansible-galaxy collection list",
        "ansible-galaxy role list",
      ],
      interpretation: [
        "Ansible controller dependencies and target-side Python dependencies are different failure domains.",
        "An execution image update can introduce failures without a playbook code change.",
      ],
      remediation: [
        "Restore the approved known-good execution environment if permitted.",
        "Install pinned dependencies.",
        "Rebuild the image and test the complete deployment path.",
      ],
      validation: [
        "The expected versions are present.",
        "The same test suite passes in CI and staging.",
      ],
      prevention: [
        "Use versioned execution-environment images.",
        "Pin roles and collections.",
        "Record image digests and tool versions in deployment logs.",
      ],
    },
    {
      id: "partial-deployment",
      title: "Partial deployment or inconsistent host state",
      severity: "Critical",
      symptoms: [
        "Some hosts report changed while others fail.",
        "The application behaves differently across instances.",
        "A deployment fails after a service restart or configuration replacement.",
      ],
      evidence: [
        "Per-host recap and original task output show different execution states.",
        "Independent health checks reveal mixed application versions or configuration.",
      ],
      diagnosticCommands: [
        "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
        "ansible-playbook -i inventory/production.ini site.yml --list-tasks",
      ],
      interpretation: [
        "A failed playbook may have already changed files, packages, or services.",
        "A retry can be safe only when the tasks are appropriately idempotent and the current state is understood.",
      ],
      remediation: [
        "Pause rollout expansion and assess host-by-host state.",
        "Choose targeted repair, controlled retry, or rollback using an approved plan.",
        "Restore service health and consistency before continuing deployment.",
      ],
      validation: [
        "All required hosts have the intended release and configuration.",
        "Health checks and application smoke tests pass.",
        "No unaccounted failed or unreachable hosts remain.",
      ],
      prevention: [
        "Use staged rollout and explicit health gates.",
        "Design tasks for idempotency.",
        "Keep a tested rollback plan for high-risk changes.",
      ],
    },
    {
      id: "handler-not-run",
      title: "Expected handler did not run",
      severity: "High",
      symptoms: [
        "A configuration file changes but the service keeps its old configuration.",
        "A notified restart handler does not execute.",
        "A later task fails before the expected handler runs.",
      ],
      evidence: [
        "The task that should notify the handler did not report changed.",
        "The handler name, notification relationship, or execution order is incorrect.",
        "A subsequent task failure may have prevented normal handler execution.",
      ],
      diagnosticCommands: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/staging.ini site.yml --list-tasks",
      ],
      interpretation: [
        "Handlers normally run when notified and are scheduled according to Ansible handler semantics.",
        "A task can notify a handler only if its change result and notification configuration support it.",
      ],
      remediation: [
        "Correct the notify and handler names.",
        "Ensure the configuration task reports changes correctly.",
        "Use deliberate handler flushing only when ordering requirements are understood.",
      ],
      validation: [
        "The handler executes when the configuration changes.",
        "The service validates configuration and reaches a healthy state.",
      ],
      prevention: [
        "Add tests for configuration change and service reload behavior.",
        "Keep handler names consistent and explicit.",
        "Avoid forcing handlers to run after failed prerequisites without a safety review.",
      ],
    },
    {
      id: "conditional-skip",
      title: "Unexpected task skip or incorrect condition",
      severity: "Medium",
      symptoms: [
        "A required task is skipped.",
        "A deployment appears successful but the expected artifact is missing.",
        "Behavior differs by host or environment.",
      ],
      evidence: [
        "Task output shows skipping and may include a conditional evaluation message.",
        "Registered variable values or variable types differ across hosts.",
      ],
      diagnosticCommands: [
        "ansible-playbook -i inventory/staging.ini site.yml --list-tasks",
        "ansible-inventory -i inventory/staging.ini --host app01",
      ],
      interpretation: [
        "A skipped task may be expected or may indicate a false condition.",
        "String-versus-boolean mismatches or undefined registered variables can alter condition behavior.",
      ],
      remediation: [
        "Review the when expression and its input values.",
        "Use explicit boolean conversion where appropriate.",
        "Make required deployment conditions fail clearly when prerequisites are missing.",
      ],
      validation: [
        "The intended hosts execute the task.",
        "Hosts that should skip do so for a documented reason.",
      ],
      prevention: [
        "Test conditions with representative inputs.",
        "Document intentional skips.",
        "Add assertions for required prerequisites.",
      ],
    },
    {
      id: "vault-failure",
      title: "Vault decryption or secret resolution failure",
      severity: "High",
      symptoms: [
        "An encrypted variable cannot be decrypted.",
        "A pipeline fails while loading credentials.",
        "A secret lookup returns an empty or unauthorized result.",
      ],
      evidence: [
        "The error identifies Vault decryption or secret lookup.",
        "The configured credential source or authorization differs from the known-good run.",
      ],
      diagnosticCommands: [
        "ansible --version",
        "ansible-config dump --only-changed",
      ],
      interpretation: [
        "The failure may be a wrong Vault password, wrong encrypted file, missing secret, or access-policy change.",
        "A Vault decryption error and a remote SSH authentication error are separate problems.",
      ],
      remediation: [
        "Verify the approved Vault credential source.",
        "Check secret-store permissions and credential rotation history.",
        "Restore the expected secret reference without printing the secret.",
      ],
      validation: [
        "The required encrypted data loads in a controlled test.",
        "Credentials remain redacted in CI logs.",
      ],
      prevention: [
        "Use managed secret storage and least-privilege access.",
        "Test credential availability before deployment.",
        "Monitor secret expiry and rotation events.",
      ],
    },
    {
      id: "timeout",
      title: "Timeout, long-running task, or asynchronous operation failure",
      severity: "High",
      symptoms: [
        "A task appears to hang.",
        "A command times out.",
        "The controller loses contact while a remote operation continues.",
      ],
      evidence: [
        "Logs show timeout, connection loss, or asynchronous job polling errors.",
        "Target-side process and service state indicate whether work is still running.",
      ],
      diagnosticCommands: [
        "ansible --version",
        "ansible-config dump --only-changed",
      ],
      interpretation: [
        "A timeout does not prove the remote operation stopped.",
        "Increasing timeouts may conceal a slow dependency or a blocked process.",
      ],
      remediation: [
        "Check target-side process and service state before retrying.",
        "Set an appropriate timeout based on measured operation duration.",
        "Use async and polling only when the task's behavior and recovery semantics are understood.",
      ],
      validation: [
        "The operation completes within the defined service objective.",
        "Repeated execution does not create duplicate jobs or corrupt state.",
      ],
      prevention: [
        "Monitor execution duration and timeout rates.",
        "Use explicit readiness and completion checks.",
        "Document which tasks are safe to retry.",
      ],
    },
    {
      id: "false-success",
      title: "Pipeline appears successful despite an incomplete deployment",
      severity: "Critical",
      symptoms: [
        "The pipeline exits successfully but the application is unhealthy.",
        "Failures were ignored or handled without a final failure signal.",
        "Some hosts were skipped or unreachable without a deployment gate.",
      ],
      evidence: [
        "The process exit status conflicts with the intended deployment outcome.",
        "The recap, application health, or required host coverage indicates incomplete work.",
      ],
      diagnosticCommands: [
        "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
        "ansible-playbook -i inventory/production.ini site.yml --list-tasks",
      ],
      interpretation: [
        "ignore_errors, rescue blocks, and custom CI logic can alter how failures are surfaced.",
        "A green pipeline does not independently prove that all application invariants hold.",
      ],
      remediation: [
        "Make critical task failures visible to the deployment orchestration.",
        "Add explicit assertions and health gates.",
        "Define which failures are recoverable and how recovered failures affect release status.",
      ],
      validation: [
        "Critical failures return an appropriate non-zero pipeline result.",
        "Application and host coverage checks pass before release promotion.",
      ],
      prevention: [
        "Test failure-handling paths.",
        "Require explicit health checks and deployment completion criteria.",
        "Review rescue and ignore_errors usage in critical roles.",
      ],
    },
  ],

  productionScenarios: [
    {
      title: "Scenario 1 — Playbook stops after a configuration task fails",
      symptom:
        "The configuration file is updated on some hosts, but a later validation or restart task fails.",
      productionImpact: [
        "Mixed configuration state.",
        "Service outage or partial traffic failure.",
      ],
      investigation: [
        "Identify the first failing task from the original logs.",
        "Check the recap for changed and failed hosts.",
        "Validate the generated configuration on an affected host.",
        "Check service health before retrying.",
      ],
      fix: [
        "Correct the configuration input or template.",
        "Validate the output before restarting the service.",
        "Roll out to a small approved batch before expanding.",
      ],
      validation: [
        "Configuration validation succeeds.",
        "Service health and application smoke tests pass.",
        "Every intended host is verified.",
      ],
      prevention: [
        "Validate templates before service reload.",
        "Use staged rollout and automatic health gates.",
      ],
    },
    {
      title: "Scenario 2 — One host fails but other hosts succeed",
      symptom:
        "Most hosts complete the play, but one host fails due to permissions, disk capacity, or local drift.",
      productionImpact: [
        "One instance may serve a different release.",
        "Load balancer health and capacity may be affected.",
      ],
      investigation: [
        "Identify the exact host and failing task.",
        "Compare its OS, disk, package, and service state with a healthy peer.",
        "Check whether the task is safe to rerun.",
      ],
      fix: [
        "Repair the host-specific issue through the approved procedure.",
        "Re-run only the justified scope after validating prerequisites.",
      ],
      validation: [
        "The affected host matches the intended configuration.",
        "The load balancer and application report healthy status.",
      ],
      prevention: [
        "Add host preflight checks.",
        "Monitor disk, service health, and configuration drift.",
      ],
    },
    {
      title: "Scenario 3 — CI succeeds locally but fails in the runner",
      symptom:
        "A developer's playbook works, but CI reports a missing collection, missing environment variable, or different path.",
      productionImpact: [
        "Release pipeline is blocked.",
        "Repeated unreviewed environment changes may destabilize builds.",
      ],
      investigation: [
        "Compare Ansible and Python versions.",
        "Compare execution image digests and installed collections.",
        "Check the runner working directory and secret references.",
        "Compare the failed run with the last successful run.",
      ],
      fix: [
        "Pin dependencies and restore the intended execution environment.",
        "Correct the CI path or secret reference.",
        "Run the same validation steps in the runner image.",
      ],
      validation: [
        "The pipeline passes from a clean runner.",
        "The resulting deployment behavior matches staging.",
      ],
      prevention: [
        "Use reproducible execution environments.",
        "Pin dependencies and log non-secret tool versions.",
      ],
    },
    {
      title: "Scenario 4 — A retry could repeat a dangerous operation",
      symptom:
        "The failed task performs a migration, creates an external resource, or restarts a critical service.",
      productionImpact: [
        "Duplicate resource creation.",
        "Data inconsistency or extended downtime.",
      ],
      investigation: [
        "Determine whether the original operation completed remotely.",
        "Inspect the actual system state and external operation records.",
        "Check idempotency and retry semantics.",
      ],
      fix: [
        "Do not rerun until completion state is known.",
        "Use an idempotent repair or compensating operation approved by the service owner.",
      ],
      validation: [
        "Exactly the intended operation has completed.",
        "Data and service invariants are satisfied.",
      ],
      prevention: [
        "Design retry-safe tasks.",
        "Use explicit completion checks and external operation identifiers.",
      ],
    },
    {
      title: "Scenario 5 — A handler fails after tasks report success",
      symptom:
        "Tasks update configuration, but the notified handler fails while reloading or restarting the service.",
      productionImpact: [
        "New configuration may be on disk but not active.",
        "The service may remain unavailable or use stale settings.",
      ],
      investigation: [
        "Inspect the handler failure and service logs.",
        "Validate the configuration independently.",
        "Check whether the service is still running and whether the change was applied.",
      ],
      fix: [
        "Correct the invalid configuration or service dependency.",
        "Use the approved service recovery procedure.",
        "Avoid blindly forcing handlers to run.",
      ],
      validation: [
        "Service is active and application health checks pass.",
        "Runtime configuration matches the intended state.",
      ],
      prevention: [
        "Validate configuration before notifying a handler.",
        "Add service readiness checks after reload.",
      ],
    },
    {
      title: "Scenario 6 — Deployment fails after a reboot",
      symptom:
        "A host reboots during the play and the controller loses its connection.",
      productionImpact: [
        "Deployment may be incomplete.",
        "A host may be unavailable or still booting.",
      ],
      investigation: [
        "Check the original task order and reboot task semantics.",
        "Confirm host boot state through the approved monitoring channel.",
        "Determine whether the reboot completed and whether the application started.",
      ],
      fix: [
        "Wait for the host to become reachable according to the runbook.",
        "Verify service and deployment state before resuming.",
        "Use the documented reboot-and-wait pattern where appropriate.",
      ],
      validation: [
        "Host connectivity is restored.",
        "Required services and application checks pass.",
      ],
      prevention: [
        "Use explicit reboot completion checks.",
        "Plan rolling reboots with health gates and capacity limits.",
      ],
    },
  ],

  decisionTree: [
    {
      condition: "The playbook fails before any task starts.",
      action: "Check syntax, playbook path, module resolution, configuration, and dependency availability.",
      nextStep: "Run syntax validation and inspect the first parser or loader error.",
    },
    {
      condition: "The first meaningful result is UNREACHABLE!.",
      action: "Investigate DNS, routing, firewall, SSH, credentials, and connection-plugin configuration.",
      nextStep: "Prove connectivity with an approved non-destructive check.",
    },
    {
      condition: "SSH succeeds but a privileged task fails.",
      action: "Inspect become configuration, sudo policy, effective identity, and authorization.",
      nextStep: "Validate the required privileged operation in staging.",
    },
    {
      condition: "The error reports an undefined variable.",
      action: "Trace the variable source, precedence, spelling, type, and environment-specific value.",
      nextStep: "Add or correct the required input and validate template output.",
    },
    {
      condition: "The error reports an unsupported parameter or unknown module.",
      action: "Check the module name, fully qualified collection name, and installed versions.",
      nextStep: "Align dependencies and validate the task schema.",
    },
    {
      condition: "Some hosts changed before the playbook failed.",
      action: "Build a per-host state matrix and assess whether retry or rollback is safe.",
      nextStep: "Perform targeted recovery and verify all required hosts.",
    },
    {
      condition: "The playbook exits successfully but the service is unhealthy.",
      action: "Inspect ignored errors, rescue behavior, handler execution, and application health gates.",
      nextStep: "Fix success criteria so pipeline status reflects required deployment outcomes.",
    },
    {
      condition: "The task timed out or the controller disconnected.",
      action: "Inspect target-side process and operation state before retrying.",
      nextStep: "Choose a retry strategy based on task idempotency and verified completion state.",
    },
  ],

  recoveryProcedure: [
    "Declare the incident owner and establish a single recovery coordinator.",
    "Pause conflicting deployment jobs and automated retries where safe.",
    "Preserve the original logs, commit SHA, inventory source, and task recap.",
    "Confirm the target environment, host scope, and approval requirements.",
    "Determine the first meaningful failure and distinguish cause from downstream symptoms.",
    "Build a per-host state matrix: unchanged, changed, failed, unreachable, skipped, and verified healthy.",
    "Choose a root-cause-specific remediation instead of applying generic fixes.",
    "Validate the change using syntax checks, lint, staging, and supported check mode where appropriate.",
    "Prepare explicit success criteria and rollback conditions before production execution.",
    "Run the smallest approved scope that can safely validate the correction.",
    "Monitor the application, host health, and deployment output during the run.",
    "Expand the rollout only after the initial scope passes health checks.",
    "Verify all intended hosts, application behavior, service status, and configuration state.",
    "Check the final process exit code and ensure critical failures were not hidden.",
    "Document residual risks, skipped hosts, unresolved issues, and follow-up owners.",
  ],

  rollbackGuidance: [
    "Rollback is a separate change with its own risk assessment; it is not automatically the correct response to every failed playbook.",
    "Determine whether the failure changed files, packages, services, firewall rules, database schemas, or external resources.",
    "Check whether newer writes or releases have occurred since the failed deployment.",
    "Use a known-good artifact or configuration revision where available.",
    "Confirm data compatibility before rolling back application versions or database changes.",
    "For schema migrations, determine whether rollback is supported and whether data transformations are reversible.",
    "Prefer restoring service safely over repeatedly executing a failed deployment.",
    "Verify the rolled-back application and infrastructure independently.",
    "Record exactly which hosts were rolled back and which remain on the new version.",
    "Escalate when recovery could cause data loss, security exposure, or a wider outage.",
  ],

  preventionChecklist: [
    "Run ansible-playbook --syntax-check in CI.",
    "Run ansible-lint with a pinned version and reviewed rules.",
    "Pin Ansible, collections, roles, and execution-environment images.",
    "Validate required variables before changing target systems.",
    "Validate generated configuration before service reloads.",
    "Use explicit target inventories and environment approval gates.",
    "Add connectivity and privilege-escalation preflight checks.",
    "Design tasks to be idempotent and retries to be safe.",
    "Use staged rollout, serial batches, and health checks for critical services.",
    "Make important failures visible to the CI/CD process.",
    "Monitor unreachable hosts, failed tasks, execution duration, and changed-host counts.",
    "Redact secrets in callback output and CI logs.",
    "Keep a documented rollback and recovery plan.",
    "Test rescue, handler, reboot, timeout, and partial-deployment paths.",
    "Review incidents and track preventive actions to completion.",
  ],

  ciCdRecommendations: [
    "Use a clean, reproducible execution environment.",
    "Install dependencies from reviewed requirements files rather than floating versions.",
    "Record the repository commit SHA and execution-image digest for each run.",
    "Validate playbook syntax and dependencies before deployment approval.",
    "Separate read-only preflight checks from write operations.",
    "Require environment-specific approvals before production changes.",
    "Keep secrets in an approved secret store and avoid logging their values.",
    "Publish logs, recap, and a non-secret deployment manifest as pipeline artifacts.",
    "Fail the pipeline when critical deployment invariants are not met.",
    "Add a post-deployment health gate before release promotion.",
    "Do not automatically retry non-idempotent tasks without a verified retry policy.",
    "Make concurrency controls prevent overlapping deployments to the same service.",
  ],

  observabilityRecommendations: [
    "Capture playbook start time, end time, duration, and exit status.",
    "Record the commit SHA, environment, inventory source identifier, and runner image digest.",
    "Track failed, unreachable, changed, skipped, and rescued task outcomes.",
    "Alert on unexpected failure-rate increases and prolonged deployment duration.",
    "Correlate Ansible events with service logs, metrics, and deployment events.",
    "Monitor application availability during rolling updates.",
    "Record per-host deployment state without collecting unnecessary sensitive information.",
    "Keep incident logs long enough to support the organization's audit and investigation requirements.",
    "Use structured callback output or an approved event system when the team needs searchable execution history.",
  ],

  commonMistakes: [
    "Rerunning the entire playbook without checking what already changed.",
    "Treating every FAILED! result as a YAML problem.",
    "Changing SSH settings before proving the connection layer is responsible.",
    "Disabling host-key checking globally to work around an authentication issue.",
    "Using ignore_errors to hide a critical failure.",
    "Using --force-handlers without understanding which handlers will execute.",
    "Assuming check mode predicts every real operation.",
    "Installing the newest collection during an incident without compatibility review.",
    "Dumping all variables to logs and exposing credentials.",
    "Treating an unreachable host as successfully deployed.",
    "Ignoring application health because the Ansible process exited with code zero.",
    "Changing multiple unrelated variables at once and losing root-cause evidence.",
    "Rolling back a database or application without checking data compatibility.",
    "Retrying a timed-out remote command without checking whether it is still running.",
    "Closing the incident before verifying every required target.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Service and environment:",
    "Severity and customer impact:",
    "Start time and detection time:",
    "Repository and commit SHA:",
    "Pipeline run ID:",
    "Ansible version and execution environment:",
    "Inventory source and target host count:",
    "First failing task:",
    "First meaningful error:",
    "Confirmed root cause and supporting evidence:",
    "Hosts changed before failure:",
    "Hosts failed, unreachable, or skipped:",
    "Immediate containment:",
    "Corrective action:",
    "Rollback decision and rationale:",
    "Post-recovery verification:",
    "Remaining risks:",
    "Preventive actions and owners:",
    "Follow-up due dates:",
  ],

  productionChecklist: [
    "The first failure is identified from preserved logs.",
    "The environment, commit, inventory, and target hosts are confirmed.",
    "The impact and partial-change scope are documented.",
    "The root cause is supported by evidence rather than guesswork.",
    "The remediation has been reviewed and validated.",
    "Production approval and rollback criteria are confirmed.",
    "The controlled rerun uses the intended scope.",
    "Application health and host-level state are independently verified.",
    "The final play recap and exit status are reviewed.",
    "Unreachable, failed, skipped, and rescued hosts have explicit dispositions.",
    "Secrets are redacted from incident artifacts.",
    "The incident report and preventive actions are assigned.",
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Reproduce and fix a YAML syntax error",
      objective:
        "Learn to separate parser failures from remote execution failures.",
      setup: [
        "Use an isolated local or disposable Linux environment.",
        "Create a test playbook with deliberately incorrect indentation.",
        "Use localhost or a disposable test inventory.",
      ],
      procedure: [
        "Run ansible-playbook --syntax-check against the test playbook.",
        "Read the parser error and inspect the nearby YAML structure.",
        "Correct indentation and rerun syntax validation.",
        "Run the playbook only after the syntax check passes.",
      ],
      expectedResult: [
        "The invalid playbook fails before task execution.",
        "The corrected playbook passes syntax validation.",
      ],
      learningPoints: [
        "Syntax errors and runtime failures require different investigation paths.",
        "Line references are clues; inspect the surrounding YAML structure.",
      ],
    },
    {
      title: "Lab 2 — Diagnose an undefined variable",
      objective:
        "Trace a variable from inventory or group variables to the task that consumes it.",
      setup: [
        "Create a disposable playbook with a required variable.",
        "Provide one test inventory with the variable and another without it.",
      ],
      procedure: [
        "Run syntax validation on both cases.",
        "Execute the playbook in the isolated environment.",
        "Observe the undefined-variable failure.",
        "Add the required variable and validate its type.",
        "Rerun the test and verify the expected result.",
      ],
      expectedResult: [
        "The missing-variable case fails with useful evidence.",
        "The corrected case completes successfully.",
      ],
      learningPoints: [
        "Syntax checks do not prove all variables will resolve at runtime.",
        "Environment-specific inventory data is a common source of drift.",
      ],
    },
    {
      title: "Lab 3 — Distinguish connection failure from become failure",
      objective:
        "Separate SSH connectivity from privilege-escalation authorization.",
      setup: [
        "Use a disposable Linux VM and a non-production test account.",
        "Configure a controlled case where SSH works but the requested privileged operation is not authorized.",
      ],
      procedure: [
        "Run a non-destructive ping-module check.",
        "Run a command that reports the remote identity.",
        "Run the same identity check with become enabled.",
        "Compare the results and inspect the test VM's sudo policy.",
        "Correct the test configuration and validate again.",
      ],
      expectedResult: [
        "Connectivity and privilege escalation produce distinguishable evidence.",
        "The corrected account policy permits only the intended operation.",
      ],
      learningPoints: [
        "A successful connection does not prove privilege escalation works.",
        "Privilege changes should follow least-privilege principles.",
      ],
    },
    {
      title: "Lab 4 — Investigate a partial deployment",
      objective:
        "Practice recovery decisions when some hosts change and others fail.",
      setup: [
        "Use two disposable VMs or simulated hosts.",
        "Create a harmless idempotent file-management task.",
        "Introduce a controlled failure on one test host.",
      ],
      procedure: [
        "Run the playbook and capture the recap.",
        "Record each host's result.",
        "Inspect the actual file state on both hosts.",
        "Fix the test condition and rerun only after checking the current state.",
        "Verify the final state on every intended host.",
      ],
      expectedResult: [
        "The recap and actual system state are compared.",
        "Recovery produces a consistent final state without blind retries.",
      ],
      learningPoints: [
        "A failed run may still have made changes.",
        "Idempotency and per-host verification improve recovery safety.",
      ],
    },
    {
      title: "Lab 5 — Detect CI dependency drift",
      objective:
        "Identify why a playbook works in one environment but fails in another.",
      setup: [
        "Create an isolated virtual environment or disposable execution container.",
        "Use a pinned test collection dependency.",
      ],
      procedure: [
        "Record the Ansible, Python, and collection versions.",
        "Run the same validation in two controlled environments.",
        "Compare missing modules or incompatible parameters.",
        "Pin the intended dependency versions.",
        "Rebuild the test environment and rerun validation.",
      ],
      expectedResult: [
        "The dependency difference is identified.",
        "The reproducible environment passes the same tests.",
      ],
      learningPoints: [
        "Environment drift can cause failures without playbook source changes.",
        "Dependency pinning makes incidents easier to reproduce.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "What is your first step when an Ansible playbook fails in production?",
      answer:
        "I first contain risky retries, preserve the original logs, confirm the environment and target scope, and identify the first meaningful failure. I then assess whether any hosts changed before the failure.",
      productionExample:
        "A configuration task changes 10 hosts, then a service restart fails on two. I verify the state of all 10 before choosing a targeted repair or rollback.",
      followUp:
        "Why should you not immediately rerun the entire playbook?",
    },
    {
      question: "How do you distinguish FAILED! from UNREACHABLE!?",
      answer:
        "FAILED! generally means a task executed or was evaluated and returned a failure. UNREACHABLE! indicates Ansible could not establish or maintain the required connection to the host. The exact underlying reason must be read from the error.",
      productionExample:
        "A module parameter error requires task correction, while an SSH timeout requires connectivity investigation.",
      followUp:
        "What if a host becomes unreachable after earlier tasks changed it?",
    },
    {
      question: "Does --syntax-check prove that a playbook will work?",
      answer:
        "No. It validates playbook syntax and structure but does not prove target connectivity, credentials, remote permissions, application health, or every runtime variable and side effect.",
      productionExample:
        "A playbook passes syntax validation but fails on a missing production-only variable or an unavailable remote package repository.",
      followUp:
        "Which other validation layers would you add to CI?",
    },
    {
      question: "How do you investigate an undefined variable?",
      answer:
        "I locate the consuming task, trace the variable's source and precedence, compare environment-specific inputs, and verify the variable's expected type without exposing secrets.",
      productionExample:
        "A production group lacks a required service port that exists in staging group_vars.",
      followUp:
        "How can you detect this before production execution?",
    },
    {
      question: "What does idempotency mean in Ansible troubleshooting?",
      answer:
        "An idempotent task converges the target toward the desired state without producing unintended additional changes when run again under equivalent conditions. It makes retries safer, but it does not make every operation safe to repeat.",
      productionExample:
        "A file-management task may be safely repeatable, while a database migration or external API operation may need explicit completion tracking.",
      followUp:
        "How would you design a retry-safe external operation?",
    },
    {
      question: "How do you diagnose a become failure?",
      answer:
        "I separate SSH authentication from privilege escalation, verify the intended remote identity, inspect the become configuration and authorization policy, and test the required operation in a controlled environment.",
      productionExample:
        "The SSH user can log in but cannot reload a protected system service.",
      followUp:
        "Why is globally granting passwordless root access a poor fix?",
    },
    {
      question: "How do you troubleshoot an unknown module or invalid parameter?",
      answer:
        "I verify the module name, fully qualified collection name, installed collection version, and module documentation for the execution environment. I then validate the task arguments.",
      productionExample:
        "A CI image upgrade removes a collection that was available on the developer's workstation.",
      followUp:
        "How do you prevent this class of dependency drift?",
    },
    {
      question: "What is the risk of ignore_errors?",
      answer:
        "It can allow execution to continue after a failed task, potentially hiding a critical deployment failure. It should be limited to explicitly understood and recoverable cases with a clear follow-up assertion or handling path.",
      productionExample:
        "A failed configuration validation is ignored and a later handler restarts the service with an invalid file.",
      followUp:
        "How would you make the pipeline accurately report the final deployment status?",
    },
    {
      question: "When should you use --check and --diff?",
      answer:
        "They can help preview supported changes during validation. Their results are not a complete guarantee of real execution behavior, and diff output must be reviewed for sensitive values.",
      productionExample:
        "A configuration change is previewed in staging before a controlled production rollout.",
      followUp:
        "Why might a task behave differently in check mode?",
    },
    {
      question: "How do you handle a partial production deployment?",
      answer:
        "I pause rollout expansion, preserve evidence, determine the actual state of each host, and choose a targeted retry, repair, or rollback based on idempotency and service risk.",
      productionExample:
        "Half the application instances run the new configuration while the rest still run the old one.",
      followUp:
        "Which health checks must pass before continuing the rollout?",
    },
    {
      question: "Why can a playbook succeed while the application remains unhealthy?",
      answer:
        "Ansible task success does not necessarily prove application-level correctness. Errors may be ignored or rescued, tasks may be skipped, and the service may fail after configuration changes.",
      productionExample:
        "A configuration file is written successfully, but the service rejects it during reload.",
      followUp:
        "Which post-deployment gates would you implement?",
    },
    {
      question: "How do you troubleshoot a handler that did not run?",
      answer:
        "I check whether the notifying task reported changed, whether the notification and handler names match, and whether task ordering or an earlier failure affected handler execution.",
      productionExample:
        "The template task reports unchanged even though an operator expected a reload.",
      followUp:
        "Why should force_handlers not be enabled blindly?",
    },
    {
      question: "How do you troubleshoot a CI-only Ansible failure?",
      answer:
        "I compare the exact commit, working directory, effective configuration, Ansible and Python versions, installed dependencies, secret references, and execution-image digest.",
      productionExample:
        "The local workstation has a collection installed globally, but the clean runner does not.",
      followUp:
        "How would you make the failure reproducible?",
    },
    {
      question: "How do you determine whether a timed-out task is safe to retry?",
      answer:
        "I check target-side process and operation state, inspect logs or external operation records, and establish whether the operation completed. I only retry after understanding its idempotency and completion semantics.",
      productionExample:
        "The controller times out while a remote database migration may still be running.",
      followUp:
        "What additional protection would you use for a non-idempotent operation?",
    },
    {
      question: "What evidence belongs in a production incident report?",
      answer:
        "The timeline, environment, commit, pipeline run, Ansible version, inventory scope, first failure, supporting evidence, partial-change state, remediation, rollback decision, post-recovery verification, and preventive actions.",
      productionExample:
        "The report identifies a missing production variable and adds an automated preflight validation.",
      followUp:
        "How do you make sure preventive actions are completed?",
    },
  ],

  references: [
    {
      title: "Ansible Playbook Guide",
      url: "https://docs.ansible.com/ansible/latest/playbook_guide/index.html",
      purpose: "Playbook structure, execution behavior, variables, handlers, and task semantics.",
    },
    {
      title: "Ansible Error Handling",
      url: "https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_error_handling.html",
      purpose: "Failure handling, unreachable hosts, blocks, rescue, and always behavior.",
    },
    {
      title: "Ansible Debugging",
      url: "https://docs.ansible.com/ansible/latest/reference_appendices/debugging.html",
      purpose: "Debugging techniques and execution output.",
    },
    {
      title: "Ansible Configuration",
      url: "https://docs.ansible.com/ansible/latest/reference_appendices/config.html",
      purpose: "Configuration settings and configuration-file behavior.",
    },
    {
      title: "Ansible Inventory Guide",
      url: "https://docs.ansible.com/ansible/latest/inventory_guide/index.html",
      purpose: "Inventory sources, host selection, groups, and inventory inspection.",
    },
    {
      title: "Ansible Collections",
      url: "https://docs.ansible.com/ansible/latest/collections_guide/index.html",
      purpose: "Collection installation, module namespaces, and dependency management.",
    },
    {
      title: "Ansible Lint",
      url: "https://ansible.readthedocs.io/projects/lint/",
      purpose: "Static analysis and playbook quality checks.",
    },
  ],
};
