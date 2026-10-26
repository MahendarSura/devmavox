
export interface PlaybookDiagnostic {
  step: number;
  title: string;
  purpose: string;
  commands: string[];
  expectedOutput: string;
  interpretation: string[];
  nextAction: string;
}

export interface PlaybookRootCause {
  cause: string;
  evidence: string[];
  correction: string[];
  verification: string[];
}

export const playbookFailuresGuide = {
  title: "Ansible Playbook Failures",
  slug: "playbook-failures",
  category: "Ansible",
  difficulty: "Intermediate to Advanced",
  severity: "High",
  estimatedTime: "45–75 minutes",

  summary:
    "Troubleshoot failed Ansible playbook executions in CI/CD pipelines and production environments. Learn how to investigate zero-host runs, YAML parsing errors, undefined variables, unreachable servers, failed tasks, privilege escalation problems, handler failures, partial deployments, and unsafe recovery attempts.",

  learningObjectives: [
    "Identify why an Ansible playbook exits with a failure status.",
    "Distinguish zero matched hosts from unreachable hosts and failed tasks.",
    "Investigate the exact pipeline run, working directory, inventory and configuration.",
    "Read Ansible recap statistics and identify the first meaningful failure.",
    "Separate syntax, variable, connectivity, privilege and application failures.",
    "Determine whether a failed run changed production systems before retrying.",
    "Perform a controlled recovery and verify the deployed application.",
    "Build preventive checks into CI/CD and operational runbooks.",
  ],

  incidentScenario: {
    title: "Production deployment fails after a successful build",

    timeline: [
      {
        time: "14:02",
        event: "CI pipeline builds and publishes a new application artifact.",
      },
      {
        time: "14:05",
        event:
          "The deployment job starts Ansible using an inventory selected by a pipeline variable.",
      },
      {
        time: "14:05",
        event:
          "The log reports that no hosts matched, or the playbook stops after a task failure.",
      },
      {
        time: "14:06",
        event:
          "The pipeline exits with a non-zero status and the deployment is marked failed.",
      },
      {
        time: "14:08",
        event:
          "The engineer checks the exact run, target environment, matched hosts and task results before deciding whether a retry is safe.",
      },
    ],

    symptoms: [
      "The pipeline is red even though compilation and artifact publication succeeded.",
      "The play recap reports zero hosts or unexpected skipped tasks.",
      "A task fails with a YAML, variable, connection or permission error.",
      "Some hosts report changed=1 before another host fails.",
      "The application version differs between servers after a partial deployment.",
    ],

    firstPrinciple:
      "A failed Ansible command does not automatically mean that nothing changed. Establish the execution scope and inspect completed tasks before retrying.",

    initialQuestions: [
      "Which pipeline run failed, and what commit was deployed?",
      "Which environment and inventory were selected?",
      "Did Ansible match any hosts?",
      "Did the playbook fail before executing tasks or after making changes?",
      "Which hosts changed, failed or became unreachable?",
      "Is the current application healthy?",
      "Is an approved rollback required?",
    ],
  },

  impactAndSeverity: {
    title: "Assess impact before debugging",

    checks: [
      {
        question: "Which environment is affected?",
        action:
          "Confirm the intended environment, deployment target and inventory source from the pipeline configuration.",
      },
      {
        question: "Did deployment stop before making changes?",
        action:
          "Inspect the task log and recap. Do not assume zero changes merely because the final status is failed.",
      },
      {
        question: "Did only some hosts update?",
        action:
          "Compare per-host task results and deployed application versions.",
      },
      {
        question: "Are users experiencing errors?",
        action:
          "Check application health endpoints, load balancer target health and service-level monitoring.",
      },
      {
        question: "Is production currently unstable?",
        action:
          "Stop additional deployment attempts, notify the incident owner and follow the approved incident procedure.",
      },
    ],

    severityGuide: [
      {
        severity: "Critical",
        condition:
          "Production outage, widespread failed deployment, or incompatible application versions affecting user traffic.",
        response:
          "Activate the incident process, stop rollout expansion and prioritize service restoration.",
      },
      {
        severity: "High",
        condition:
          "Production deployment failed on a subset of servers or a critical service cannot be verified.",
        response:
          "Pause further changes, identify affected hosts and prepare a controlled recovery.",
      },
      {
        severity: "Medium",
        condition:
          "Deployment is blocked before production changes, with the currently deployed version healthy.",
        response:
          "Investigate the configuration and correct the pipeline before resuming.",
      },
      {
        severity: "Low",
        condition:
          "A non-production validation run fails without affecting shared services.",
        response:
          "Reproduce safely and fix the underlying configuration or automation.",
      },
    ],
  },

  safetyChecks: {
    title: "Pre-flight safety checks",

    checks: [
      {
        check: "Correct repository and commit",
        commands: [
          "pwd",
          "git rev-parse --show-toplevel",
          "git rev-parse HEAD",
          "git status --short",
        ],
        reason:
          "Prevents debugging a different checkout or deploying an unexpected commit.",
      },
      {
        check: "Correct Ansible runtime",
        commands: [
          "ansible --version",
          "ansible-playbook --version",
        ],
        reason:
          "Shows the installed Ansible version, Python runtime and configuration file location where available.",
      },
      {
        check: "Correct environment and inventory",
        commands: [
          "printf 'Environment: %s\\n' \"$DEPLOY_ENV\"",
          "printf 'Inventory: %s\\n' \"$ANSIBLE_INVENTORY\"",
          "pwd",
          "git status --short",
        ],
        reason:
          "Confirms pipeline variables and current execution context. Replace variable names with those actually used by the project.",
      },
      {
        check: "Production authorization",
        commands: [
          "git diff --check",
          "git diff -- deployment/",
        ],
        reason:
          "Reviews relevant local changes. Confirm the production approval and change ticket separately in the deployment platform.",
      },
    ],

    rules: [
      "Never print secrets, private keys, access tokens or complete credential-bearing environment variables into CI logs.",
      "Do not run an unreviewed playbook against production just to see what happens.",
      "Do not use --force-handlers, --limit all or a broad inventory as an automatic recovery strategy.",
      "Do not delete the Ansible control-node cache or production state as a first troubleshooting step.",
      "Use a read-only investigation first, then validate the intended changes.",
      "Use approved credentials and the least-privilege account available.",
    ],
  },

  evidenceCollection: {
    title: "Collect evidence before changing anything",

    evidence: [
      {
        item: "Pipeline execution",
        collect: [
          "Pipeline run ID and job name",
          "Failure timestamp and timezone",
          "Commit SHA and artifact version",
          "Exact command executed by the job",
          "Exit code and complete relevant task output",
        ],
        why:
          "Connects the failure to a specific execution instead of relying on a later rerun.",
      },
      {
        item: "Execution context",
        collect: [
          "Working directory",
          "Ansible version",
          "Configuration file path",
          "Inventory path or dynamic inventory source",
          "Relevant non-secret pipeline variable values",
        ],
        why:
          "Detects relative-path problems, wrong configurations and environment-selection mistakes.",
      },
      {
        item: "Host and task results",
        collect: [
          "Matched hosts",
          "Failed task name",
          "Host-level failed, unreachable and changed results",
          "The first meaningful error before subsequent failures",
        ],
        why:
          "Identifies whether execution stopped during parsing, host selection, connection setup or task execution.",
      },
      {
        item: "Production state",
        collect: [
          "Current application version on affected hosts",
          "Service health and recent error rates",
          "Relevant deployment timestamps",
          "Changes completed before the failure",
        ],
        why:
          "Establishes whether the environment is unchanged, partially deployed or already unhealthy.",
      },
    ],
  },

  diagnostics: [
    {
      step: 1,
      title: "Reconstruct the exact failed command",
      purpose:
        "Find the real command from the failed pipeline rather than assuming the local command is identical.",

      commands: [
        "pwd",
        "git rev-parse --show-toplevel",
        "ansible-playbook --version",
        "ansible-config dump --only-changed",
      ],

      expectedOutput:
        "The commands show the current checkout, Ansible runtime and non-default configuration settings.",

      interpretation: [
        "If the repository root is unexpected, inspect the pipeline checkout and working-directory configuration.",
        "If the configuration file differs from the expected file, inspect ANSIBLE_CONFIG and the configuration discovery path.",
        "If the runtime differs from the approved environment, confirm compatibility before changing dependencies.",
      ],

      nextAction:
        "Record the exact failed command, inventory argument, playbook path, relevant flags and environment.",
    },

    {
      step: 2,
      title: "Validate the playbook syntax",
      purpose:
        "Find YAML or Ansible syntax errors before attempting a deployment.",

      commands: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
      ],

      expectedOutput:
        "playbook: site.yml",

      interpretation: [
        "A syntax error may identify a line and column where parsing failed.",
        "The error can originate in an imported task file, role, template expression or YAML indentation.",
        "A successful syntax check proves only that the playbook passes this syntax validation; it does not prove the hosts are reachable or tasks will succeed.",
      ],

      nextAction:
        "Fix the reported file and line, rerun the syntax check and review the changed diff.",
    },

    {
      step: 3,
      title: "Confirm the inventory actually contains hosts",
      purpose:
        "Investigate the common case where a playbook matches zero hosts.",

      commands: [
        "ansible-inventory -i inventory/staging.ini --graph",
        "ansible-inventory -i inventory/staging.ini --list",
        "ansible-playbook -i inventory/staging.ini site.yml --list-hosts",
      ],

      expectedOutput:
        "The inventory graph displays the expected groups and hosts. The playbook host listing shows the intended targets.",

      interpretation: [
        "An empty inventory can mean the wrong file, an empty group, a failed dynamic inventory source or incorrect inventory parsing.",
        "If the inventory contains hosts but --list-hosts reports none for a play, inspect that play's hosts expression and group membership.",
        "A misspelled group in hosts: can match zero hosts even when the inventory itself is populated.",
        "Ansible warnings about unmatched patterns or empty groups are clues, not proof of the exact cause.",
      ],

      nextAction:
        "Compare the intended environment group with the actual inventory group names. Do not broaden the target pattern just to make the run proceed.",
    },

    {
      step: 4,
      title: "Check variables and task references",
      purpose:
        "Find missing variables, incorrect variable names and unexpected values.",

      commands: [
        "grep -RInE 'vars_files:|include_vars:|host_vars|group_vars|lookup\\(' . --include='*.yml' --include='*.yaml'",
        "grep -RInE '\\{\\{[^}]+\\}\\}' roles/ playbooks/ --include='*.yml' --include='*.yaml'",
      ],

      expectedOutput:
        "The search identifies variable references and places where variable files or lookup plugins are used.",

      interpretation: [
        "These grep commands are search aids, not a full YAML parser and not proof that a variable is missing.",
        "A fatal undefined-variable error identifies a variable that Ansible could not resolve in the relevant execution context.",
        "Check whether the variable belongs in role defaults, group_vars, host_vars, vars_files or approved pipeline extra variables.",
        "Check spelling, nesting, precedence and environment-specific variable files.",
      ],

      nextAction:
        "Correct the variable source or name and validate against a safe test inventory. Never insert production secrets into source control.",
    },

    {
      step: 5,
      title: "Separate unreachable hosts from failed tasks",
      purpose:
        "Determine whether Ansible could connect to the target or connected but failed while executing work.",

      commands: [
        "ansible -i inventory/staging.ini app_servers -m ansible.builtin.ping",
        "ansible -i inventory/staging.ini app_servers -m ansible.builtin.ping -vv",
      ],

      expectedOutput:
        "A reachable Linux host typically returns a SUCCESS result with pong. Failures include connection errors, authentication errors or Python interpreter issues.",

      interpretation: [
        "UNREACHABLE usually indicates a connection or remote-execution setup problem.",
        "A task with FAILED may indicate that the connection worked but the module or command failed.",
        "The Ansible ping module checks Ansible connectivity and Python execution; it is not an ICMP network ping.",
        "Verbose output can contain sensitive operational details. Keep diagnostic logs access-controlled and redact secrets.",
      ],

      nextAction:
        "Check DNS, routing, SSH access, the selected user, approved key configuration, bastion routing and remote Python availability as applicable.",
    },

    {
      step: 6,
      title: "Inspect privilege escalation and file permissions",
      purpose:
        "Identify failures caused by sudo, become settings or insufficient permissions.",

      commands: [
        "ansible -i inventory/staging.ini app_servers -m ansible.builtin.command -a 'id'",
        "ansible -i inventory/staging.ini app_servers -m ansible.builtin.command -a 'whoami'",
      ],

      expectedOutput:
        "The output identifies the effective remote identity when the command is permitted.",

      interpretation: [
        "A normal remote identity does not prove that become will succeed.",
        "A sudo denial may indicate missing sudo permissions, an incorrect become user or a required interactive authentication method.",
        "A file permission error can also come from ownership, directory traversal permissions, ACLs or a read-only filesystem.",
        "Do not test privileged actions against production without the relevant authorization.",
      ],

      nextAction:
        "Review the approved become configuration and the remote account's least-privilege permissions. Verify using a safe, authorized test.",
    },

    {
      step: 7,
      title: "Inspect the first failed task and recap",
      purpose:
        "Find where the playbook stopped and whether other hosts changed successfully.",

      commands: [
        "ansible-playbook -i inventory/staging.ini site.yml --list-tasks",
        "ansible-playbook -i inventory/staging.ini site.yml --check --diff --limit app-canary-01",
      ],

      expectedOutput:
        "The task listing shows planned task names. Check mode may report tasks that would change, depending on module support.",

      interpretation: [
        "Start with the earliest meaningful fatal error; later errors can be consequences of the first failure.",
        "Review the recap for ok, changed, unreachable, failed, skipped and rescued results per host.",
        "Check mode is not a guaranteed simulation: some modules do not support it fully, and external side effects may not be represented.",
        "Diff output can expose configuration values or secrets. Use only with appropriate redaction and access controls.",
      ],

      nextAction:
        "Map each affected host to its completed tasks and actual application state before choosing a retry or rollback.",
    },

    {
      step: 8,
      title: "Check handler and partial-deployment behavior",
      purpose:
        "Determine whether a failed task prevented a notified service restart or left hosts on different versions.",

      commands: [
        "grep -RInE 'notify:|handlers:|listen:' roles/ playbooks/ --include='*.yml' --include='*.yaml'",
        "grep -RInE 'serial:|any_errors_fatal:|max_fail_percentage:|force_handlers:' . --include='*.yml' --include='*.yaml'",
      ],

      expectedOutput:
        "The searches identify handlers and rollout controls configured in the playbooks.",

      interpretation: [
        "Handlers normally run when notified at the appropriate point in the play.",
        "A later task failure can affect whether notified handlers execute, depending on playbook settings and failure handling.",
        "serial and failure thresholds affect rollout behavior and how many hosts may be changed before execution stops.",
        "A task may report changed even though a later health check fails.",
      ],

      nextAction:
        "Compare deployed versions and service health on all targeted hosts. Use the established recovery procedure rather than forcing handlers or rerunning the entire fleet.",
    },

    {
      step: 9,
      title: "Validate the proposed change before recovery",
      purpose:
        "Reduce the risk of repeating the same failure or introducing a second failure.",

      commands: [
        "git diff --check",
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/staging.ini site.yml --list-hosts",
        "ansible-playbook -i inventory/staging.ini site.yml --list-tasks",
      ],

      expectedOutput:
        "The changed files pass whitespace validation, syntax validation, target selection and task-list inspection.",

      interpretation: [
        "These checks do not establish that production will succeed.",
        "Use an approved staging or canary run to validate behavior where possible.",
        "Confirm the exact inventory, playbook, commit and artifact version before resuming.",
      ],

      nextAction:
        "Obtain required approval, execute the narrowest safe rollout and monitor each stage.",
    },
  ] satisfies PlaybookDiagnostic[],

  zeroHostsInvestigation: {
    title: "Special case: the pipeline reports zero hosts",

    symptom:
      "The deployment job finishes without changing any servers, but the pipeline behavior is confusing or the deployment is incorrectly considered successful.",

    decisionTree: [
      {
        condition: "The inventory graph is empty",
        investigate: [
          "Is the inventory file path correct relative to the actual working directory?",
          "Did the pipeline download or generate the inventory successfully?",
          "Did the dynamic inventory plugin run with the correct credentials and permissions?",
          "Did the inventory source return an empty host collection?",
        ],
        action:
          "Correct the inventory source or generation step. Fail the pipeline if the expected environment has no hosts.",
      },
      {
        condition: "Inventory has hosts but the play matches zero",
        investigate: [
          "Does the playbook hosts: pattern match the inventory group?",
          "Is the environment variable selecting the intended group?",
          "Are group names or host patterns misspelled?",
          "Are --limit or --tags excluding the expected work?",
        ],
        action:
          "Correct the host pattern or selection arguments and verify the resolved host list.",
      },
      {
        condition: "The inventory is dynamic",
        investigate: [
          "Did the inventory plugin authenticate successfully?",
          "Are the account, region, project and environment filters correct?",
          "Did the cloud API return the expected resources?",
          "Did the inventory plugin emit warnings or errors?",
        ],
        action:
          "Correct the plugin configuration or permissions. Confirm the expected hosts appear before deployment.",
      },
      {
        condition: "The play is skipped or all tasks are skipped",
        investigate: [
          "Are when conditions false?",
          "Are required tags excluded?",
          "Did an earlier task set a fact or variable differently than expected?",
        ],
        action:
          "Validate the condition and task selection against the intended environment.",
      },
    ],

    safeGuardExample: `- name: Deploy application
  hosts: app_servers
  gather_facts: false
  tasks:
    - name: Confirm that the play has selected hosts
      ansible.builtin.assert:
        that:
          - groups['app_servers'] | default([]) | length > 0
        fail_msg: "No app_servers hosts are defined in the inventory."`,

    guardExplanation:
      "This assertion checks whether the named inventory group contains hosts. It does not guarantee that the play's host pattern, --limit, dynamic inventory, connectivity or every task is valid. Also validate the resolved target list in CI before deployment.",
  },

  rootCauses: [
    {
      cause: "Wrong playbook or inventory path",

      evidence: [
        "The pipeline working directory differs from the assumed directory.",
        "The expected inventory file is absent at the resolved path.",
        "A local run works from the repository root but the CI job runs from a subdirectory.",
      ],

      correction: [
        "Use the correct repository root or an explicitly resolved path.",
        "Confirm the inventory artifact was generated or checked out.",
        "Fail early if the expected file does not exist.",
      ],

      verification: [
        "Repeat the inventory graph and --list-hosts checks.",
        "Confirm the target environment and exact host count.",
      ],
    },

    {
      cause: "Invalid YAML or Ansible syntax",

      evidence: [
        "The syntax check reports a parser error and often points to a file and line.",
        "Indentation, quoting, list structure or a module argument is malformed.",
      ],

      correction: [
        "Correct the actual reported syntax problem.",
        "Review imported tasks and role files as well as the top-level playbook.",
      ],

      verification: [
        "Run --syntax-check.",
        "Run CI linting if configured.",
        "Review the final diff before deployment.",
      ],
    },

    {
      cause: "Undefined or incorrect variable",

      evidence: [
        "The fatal task reports an undefined variable or an unexpected value.",
        "The expected group_vars, host_vars or vars_files entry is missing or incorrectly named.",
      ],

      correction: [
        "Fix the variable reference or restore the intended variable source.",
        "Use explicit validation for required deployment variables.",
        "Keep secrets in approved secret-management systems.",
      ],

      verification: [
        "Validate against the intended test inventory.",
        "Confirm the selected environment and artifact version.",
      ],
    },

    {
      cause: "Unreachable host or SSH failure",

      evidence: [
        "The recap records unreachable hosts.",
        "The error mentions authentication, connection timeout, name resolution or remote Python setup.",
      ],

      correction: [
        "Fix the relevant DNS, network route, SSH configuration, approved credentials or remote prerequisites.",
        "Check the bastion or proxy path if the environment requires one.",
      ],

      verification: [
        "Run an authorized Ansible connectivity check.",
        "Verify all intended targets are reachable before resuming deployment.",
      ],
    },

    {
      cause: "Privilege escalation or permissions failure",

      evidence: [
        "The connection succeeds but a privileged task fails.",
        "The error mentions sudo denial, become failure, permission denied or a read-only filesystem.",
      ],

      correction: [
        "Correct the authorized become configuration or least-privilege access.",
        "Check the target path's owner, permissions and filesystem state.",
      ],

      verification: [
        "Validate the required operation under the approved execution identity.",
        "Confirm permissions are no broader than necessary.",
      ],
    },

    {
      cause: "Application or deployment task failed",

      evidence: [
        "The task ran but returned a non-zero command status.",
        "The application health check failed after a file or package change.",
        "Only a subset of hosts reached the intended version.",
      ],

      correction: [
        "Inspect the task output and application logs.",
        "Correct the deployment-specific problem rather than suppressing the error.",
        "Choose a forward fix or rollback according to the incident plan.",
      ],

      verification: [
        "Check application health and version on every affected host.",
        "Confirm load balancer health and service-level indicators.",
      ],
    },

    {
      cause: "Pipeline used the wrong environment or target filter",

      evidence: [
        "The pipeline variable selects a different inventory or group than expected.",
        "The resolved host list conflicts with the approved change ticket.",
        "The command includes an unexpected --limit, --tags or extra-vars argument.",
      ],

      correction: [
        "Correct the pipeline's environment selection and target filters.",
        "Require explicit approval for production target selection.",
      ],

      verification: [
        "Review --list-hosts and the exact command.",
        "Confirm the target set with the deployment owner before making changes.",
      ],
    },
  ] satisfies PlaybookRootCause[],

  recoveryWorkflow: {
    title: "Fix, recover and verify safely",

    steps: [
      {
        step: 1,
        name: "Stop unsafe retries",
        details:
          "Pause automatic retries and prevent additional rollout stages while the production state is unknown.",
      },
      {
        step: 2,
        name: "Establish current state",
        details:
          "Identify the artifact version, completed tasks, changed hosts, failed hosts and current application health.",
      },
      {
        step: 3,
        name: "Correct the proven cause",
        details:
          "Fix the actual inventory, syntax, variable, connectivity, permission or application issue. Avoid unrelated changes.",
      },
      {
        step: 4,
        name: "Validate the correction",
        details:
          "Run syntax, inventory, host-list and task-list checks. Use staging or canary validation when practical.",
      },
      {
        step: 5,
        name: "Select a recovery strategy",
        details:
          "Choose a controlled retry, a forward fix or the approved rollback procedure based on the state of each host.",
      },
      {
        step: 6,
        name: "Resume a limited rollout",
        details:
          "Use the approved canary or batch strategy. Confirm the host selection and artifact version before expanding.",
      },
      {
        step: 7,
        name: "Verify service health",
        details:
          "Check application endpoints, service state, deployed version, load balancer health, error rates and logs.",
      },
      {
        step: 8,
        name: "Close the incident",
        details:
          "Record the cause, impact, timeline, corrective action, verification evidence and prevention work.",
      },
    ],

    exampleValidationCommands: [
      "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
      "ansible-inventory -i inventory/staging.ini --graph",
      "ansible-playbook -i inventory/staging.ini site.yml --list-hosts",
      "ansible-playbook -i inventory/staging.ini site.yml --list-tasks",
    ],

    rollbackDecision: [
      "Rollback is considered when the deployed version causes user impact, the service cannot be restored safely with a forward fix, and an approved rollback procedure exists.",
      "Check database schema compatibility, migrations, persistent data and artifact availability before reverting application code.",
      "Do not assume rerunning an older playbook automatically reverses all changes.",
      "Capture the current state and coordinate with the incident owner before a production rollback.",
    ],
  },

  productionPatterns: [
    {
      title: "Use canary deployments",
      explanation:
        "Deploy to a small, explicitly selected group first, verify health, and expand only when the canary succeeds.",
      example: `- name: Deploy application
  hosts: app_canary
  serial: 1
  tasks:
    - name: Verify application health
      ansible.builtin.uri:
        url: "http://127.0.0.1:8080/health"
        status_code: 200
      register: health_result
      retries: 5
      delay: 3
      until: health_result.status == 200`,
    warning:
      "Adapt the endpoint and host group to the actual application. The example assumes the endpoint is reachable from the managed host and that the URI module's connection behavior matches the deployment design.",
    },

    {
      title: "Fail early when required inputs are missing",
      explanation:
        "Validate deployment variables before changing services or application files.",
      example: `- name: Validate deployment inputs
  hosts: app_servers
  gather_facts: false
  tasks:
    - name: Require a release version
      ansible.builtin.assert:
        that:
          - release_version is defined
          - release_version | string | length > 0
        fail_msg: "release_version must be provided before deployment."`,
      warning:
        "The variable should also be validated against the approved artifact source and release policy.",
    },

    {
      title: "Make tasks idempotent",
      explanation:
        "Repeated execution should converge the system to the desired state instead of causing duplicate side effects.",
      example: `- name: Ensure application directory exists
  ansible.builtin.file:
    path: /opt/myapp
    state: directory
    owner: myapp
    group: myapp
    mode: "0755"`,
      warning:
        "Use appropriate ownership and paths for the real service. Avoid shell commands when a suitable idempotent Ansible module exists.",
    },
  ],

  prevention: {
    title: "Prevent recurring playbook failures",

    ciChecks: [
      {
        check: "Syntax validation",
        action:
          "Run ansible-playbook --syntax-check for the intended playbook and test inventory.",
      },
      {
        check: "Linting",
        action:
          "Run ansible-lint using the project's pinned version and agreed rules.",
      },
      {
        check: "Inventory validation",
        action:
          "Verify the inventory can be parsed and the expected environment group resolves to the intended hosts.",
      },
      {
        check: "Target safety",
        action:
          "Require explicit environment selection and protect production deployment stages with approval controls.",
      },
      {
        check: "Controlled execution",
        action:
          "Use staging or canary deployments, health checks and rollout limits appropriate to the application.",
      },
      {
        check: "Secret protection",
        action:
          "Use a secret manager or protected CI variables; avoid exposing secrets in logs and diffs.",
      },
      {
        check: "Recovery readiness",
        action:
          "Maintain a tested rollback or forward-recovery procedure and know which changes are reversible.",
      },
    ],

    monitoring: [
      "Alert on deployment failures and repeated failed retries.",
      "Record pipeline ID, commit, artifact version, environment and deployment result.",
      "Track deployment duration and per-host success rates.",
      "Alert when the intended host count is zero or unexpectedly differs from the approved target count.",
      "Monitor application health, latency, error rate and load balancer target health after deployment.",
      "Keep access-controlled logs long enough to investigate incidents.",
    ],

    commonMistakes: [
      "Rerunning a failed playbook before determining what already changed.",
      "Using a broad --limit or changing hosts: to include more machines without approval.",
      "Treating a successful syntax check as proof that deployment will succeed.",
      "Assuming check mode perfectly predicts real execution.",
      "Ignoring unreachable hosts or a partial rollout in the recap.",
      "Using ignore_errors to hide a real deployment failure.",
      "Printing credentials or sensitive variables while collecting verbose logs.",
      "Rolling back application code without checking database and persistent-data compatibility.",
      "Declaring success because the pipeline is green without verifying application health.",
    ],
  },

  incidentReportTemplate: {
    title: "Post-incident report",
    fields: [
      "Incident ID and severity",
      "Affected environment and services",
      "Start time, detection time and recovery time",
      "Pipeline run ID, commit SHA and artifact version",
      "Expected and actual target hosts",
      "First meaningful failure and supporting log evidence",
      "Root cause and contributing factors",
      "Changes completed before failure",
      "User impact and duration",
      "Recovery action and verification results",
      "Rollback decision and rationale",
      "Preventive actions, owners and due dates",
    ],
  },

  interviewQuestions: [
    {
      question: "What does a failed Ansible playbook mean?",
      answer:
        "It means execution reported a failure, but it does not establish whether no changes occurred. Inspect the failed task, host-level results and recap to determine the actual state.",
    },
    {
      question: "How do you troubleshoot zero hosts?",
      answer:
        "Check the inventory graph and list, the play's hosts pattern, --limit, tags, environment variables and dynamic inventory results. Compare the resolved target list with the approved deployment scope.",
    },
    {
      question: "What is the difference between FAILED and UNREACHABLE?",
      answer:
        "FAILED generally means a task execution failed. UNREACHABLE means Ansible could not establish or maintain the required connection to the host. Investigate the detailed error because connection and module issues can overlap.",
    },
    {
      question: "Does --syntax-check guarantee a successful deployment?",
      answer:
        "No. It checks playbook syntax but does not prove inventory correctness, host reachability, permissions, runtime values, application health or task success.",
    },
    {
      question: "What does changed=1 mean in the recap?",
      answer:
        "Ansible reported a change for that host. It does not guarantee that the overall deployment completed successfully or that the application is healthy.",
    },
    {
      question: "How do you handle a partial production deployment?",
      answer:
        "Pause rollout expansion, identify changed and unchanged hosts, check application health and version consistency, then choose a controlled forward fix or approved rollback.",
    },
    {
      question: "What is Ansible check mode?",
      answer:
        "Check mode asks supported modules to predict changes without applying their normal changes. Support varies by module, so it is not a perfect production simulation.",
    },
    {
      question: "How do you prevent the wrong inventory from being deployed?",
      answer:
        "Use explicit environment selection, inventory validation, host-list checks, expected-host safeguards, protected production approvals and auditable pipeline parameters.",
    },
    {
      question: "Why should ignore_errors not be used as a general fix?",
      answer:
        "It can allow a play to continue after a real failure and leave dependent tasks running against an invalid state. Handle only known, explicitly acceptable failures and verify the resulting state.",
    },
    {
      question: "How do you prove the incident is resolved?",
      answer:
        "Confirm the intended hosts reached the approved version, required tasks completed, service health checks passed, load balancer targets are healthy and monitoring shows recovery.",
    },
  ],

  runbookChecklist: [
    "Identify the failed pipeline run and exact commit.",
    "Confirm the correct repository, working directory and Ansible runtime.",
    "Confirm the target environment and production approval.",
    "Collect the failed command and relevant logs without exposing secrets.",
    "Run syntax validation.",
    "Inspect the inventory graph and resolved playbook hosts.",
    "Inspect variables, connection errors and privilege escalation as indicated by evidence.",
    "Read the first meaningful failure and per-host recap.",
    "Determine whether any hosts changed before the failure.",
    "Assess application health and version consistency.",
    "Correct the proven cause and validate the change.",
    "Execute a controlled recovery or approved rollback.",
    "Verify service health and deployment version.",
    "Document the incident and add preventive checks.",
  ],
};

export default playbookFailuresGuide;
