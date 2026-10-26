
export interface VariableDiagnostic {
  step: number;
  title: string;
  purpose: string;
  commands: string[];
  expectedOutput: string;
  interpretation: string[];
  nextAction: string;
}

export interface VariableRootCause {
  cause: string;
  symptoms: string[];
  evidence: string[];
  fix: string[];
  verification: string[];
}

export const variableErrorsGuide = {
  title: "Ansible Variable Errors",
  slug: "variable-errors",
  category: "Ansible",
  difficulty: "Intermediate to Advanced",
  severity: "High",
  estimatedTime: "45–75 minutes",

  summary:
    "Troubleshoot undefined variables, incorrect variable precedence, inventory and group variable problems, host-specific configuration, YAML type mismatches, Jinja2 template errors, Ansible Vault issues and environment-specific values that cause production deployments to fail or configure services incorrectly.",

  learningObjectives: [
    "Identify where an Ansible variable is defined and how it reaches a task.",
    "Understand inventory, group_vars, host_vars, play vars, role defaults and role vars.",
    "Investigate undefined variables without hiding errors with unsafe defaults.",
    "Understand common variable precedence and override problems.",
    "Diagnose incorrect strings, integers, booleans, lists and dictionaries.",
    "Debug Jinja2 expressions and template rendering errors.",
    "Investigate encrypted variables and Ansible Vault failures.",
    "Compare staging and production variable resolution safely.",
    "Prevent incorrect configuration from reaching production.",
  ],

  incidentScenario: {
    title: "Production deployment fails after a configuration change",

    timeline: [
      {
        time: "09:00",
        event:
          "A pull request updates the application deployment role and changes a variable name.",
      },
      {
        time: "09:20",
        event:
          "The CI pipeline validates the playbook syntax but does not validate all required production variables.",
      },
      {
        time: "09:30",
        event:
          "The production deployment starts and fails with an undefined variable, or resolves a different value than expected.",
      },
      {
        time: "09:32",
        event:
          "Some earlier tasks may already have changed hosts, depending on task order and rollout strategy.",
      },
      {
        time: "09:35",
        event:
          "The engineer pauses rollout expansion, checks the failed task and resolves the variable source before attempting recovery.",
      },
    ],

    symptoms: [
      "The task fails with 'variable is undefined'.",
      "A Jinja2 template fails because a nested dictionary key is missing.",
      "A service receives the wrong port, hostname or environment name.",
      "Staging succeeds while production fails.",
      "A variable unexpectedly takes a value from the command line or inventory.",
      "A boolean or number behaves like a string.",
      "Ansible Vault reports that a password or encrypted variable cannot be decrypted.",
      "A role works independently but fails when called from the full playbook.",
    ],

    firstPrinciple:
      "A variable error can be a missing definition, an incorrect name, an unexpected override, a data-type mismatch or a bad assumption about the target host. Identify the resolved value and its intended source before editing the playbook.",

    initialQuestions: [
      "Which pipeline run, commit and environment failed?",
      "Which task and exact variable name appear in the error?",
      "Which host or group was being processed?",
      "Was the variable renamed, moved or overridden in the latest Git change?",
      "Does the variable exist in the expected inventory, group_vars, host_vars or role configuration?",
      "Does the problem affect every host or only one host group?",
      "Did any earlier tasks change production before the failure?",
      "Could the value contain a secret that must not appear in logs?",
    ],
  },

  impactAndSeverity: {
    title: "Assess impact before changing variables",

    checks: [
      {
        question: "Which environment is affected?",
        action:
          "Confirm the inventory, target environment, Git commit, pipeline run and selected hosts.",
      },
      {
        question: "Is the error blocking deployment or producing an incorrect configuration?",
        action:
          "Differentiate a task that stops safely from a task that writes an incorrect template or applies an incorrect service setting.",
      },
      {
        question: "Did earlier tasks already change hosts?",
        action:
          "Inspect the play recap, changed tasks and application health. Do not assume the failure happened before all changes.",
      },
      {
        question: "Is the value security-sensitive?",
        action:
          "Treat credentials, tokens and Vault values as secrets. Avoid printing them in debugging output.",
      },
      {
        question: "Is the problem isolated to a host?",
        action:
          "Compare the affected host's inventory membership, host_vars, group_vars and intended environment settings.",
      },
    ],

    severityGuide: [
      {
        severity: "Critical",
        condition:
          "Incorrect variables cause an active production outage, wrong database target, insecure configuration or widespread failed deployment.",
        response:
          "Pause rollout expansion, activate the incident process and prioritize safe restoration of the intended configuration.",
      },
      {
        severity: "High",
        condition:
          "Production deployment is blocked or hosts receive inconsistent configuration.",
        response:
          "Identify affected hosts, preserve evidence and validate the correction before resuming.",
      },
      {
        severity: "Medium",
        condition:
          "Staging deployment fails because a required variable is missing or malformed.",
        response:
          "Correct the source and add validation before production promotion.",
      },
      {
        severity: "Low",
        condition:
          "A development playbook has a reproducible variable naming or type issue.",
        response:
          "Fix the definition and add a regression test.",
      },
    ],
  },

  safetyChecks: {
    title: "Production safety checks",

    commands: [
      "pwd",
      "git rev-parse --show-toplevel",
      "git rev-parse HEAD",
      "git status --short",
      "ansible --version",
      "ansible-config dump --only-changed",
      "ansible-inventory -i inventory/production.ini --graph",
      "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
    ],

    rules: [
      "Confirm the repository, commit, inventory and environment before diagnosing values.",
      "Do not print all variables using broad debug output in production.",
      "Never print passwords, private keys, tokens or decrypted Vault contents.",
      "Do not replace a required variable with an arbitrary default just to make the playbook pass.",
      "Do not use production values in staging or staging values in production without explicit authorization.",
      "Check whether earlier tasks changed hosts before rerunning the playbook.",
      "Use read-only diagnostics before making changes.",
      "Verify production approval and the approved target list separately from local validation.",
    ],
  },

  evidenceCollection: {
    title: "Collect evidence before changing the code",

    evidence: [
      {
        item: "Pipeline evidence",
        collect: [
          "Pipeline run ID and job name",
          "Failure timestamp and timezone",
          "Commit SHA and artifact version",
          "Exact Ansible command and working directory",
          "Inventory source and selected host group",
          "Exact error text with secrets redacted",
        ],
        why:
          "Connects the error to the exact code version and execution context.",
      },
      {
        item: "Variable definition evidence",
        collect: [
          "Variable name used by the failed task",
          "Expected variable type and intended value",
          "Relevant play vars and role defaults",
          "Relevant inventory, group_vars and host_vars definitions",
          "Recent Git changes affecting the variable name or location",
        ],
        why:
          "Shows whether the variable is absent, misspelled or defined in a different scope.",
      },
      {
        item: "Resolution evidence",
        collect: [
          "Affected host and its inventory group membership",
          "Non-secret resolved values where safe",
          "Variable override sources",
          "Ansible version and relevant configuration",
          "Whether extra variables or CI parameters are supplied",
        ],
        why:
          "Helps determine why a host receives a different value than expected.",
      },
      {
        item: "Production state evidence",
        collect: [
          "Per-host task results and play recap",
          "Tasks that changed before failure",
          "Current service configuration and application health",
          "Whether the previous release remains usable",
        ],
        why:
          "Determines whether recovery requires a configuration correction, forward deployment or rollback.",
      },
    ],
  },

  diagnostics: [
    {
      step: 1,
      title: "Locate the first failing task",
      purpose:
        "Identify the exact expression or variable that caused the failure.",

      commands: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/staging.ini site.yml --list-hosts",
      ],

      expectedOutput:
        "Syntax validation reports parsing errors, if present. The host list shows the targets selected by the playbook.",

      interpretation: [
        "Syntax-check success does not prove that all runtime variables are defined.",
        "The host list confirms target selection but does not show whether all required values resolve correctly.",
        "Read the original failure log and identify the first failing task, variable name and affected host.",
        "If the failure is production-specific, do not substitute staging inventory and assume the problem is solved.",
      ],

      nextAction:
        "Record the exact variable name, task file, host and intended value type.",
    },

    {
      step: 2,
      title: "Search for the variable definition",
      purpose:
        "Find where the variable is declared, renamed or referenced.",

      commands: [
        "git grep -n 'app_port' -- '*.yml' '*.yaml' '*.j2'",
        "git diff -- '*.yml' '*.yaml' '*.j2'",
        "git status --short",
      ],

      expectedOutput:
        "The search lists matching definitions and references. The diff shows changes in tracked files.",

      interpretation: [
        "A variable referenced in a task but absent from the intended configuration may be missing.",
        "Different spellings such as app_port and application_port are distinct variable names.",
        "A recent rename may update a role but leave an inventory or template reference unchanged.",
        "The absence of a tracked-file match does not prove the variable is absent: it may come from untracked files, inventory plugins, CI extra variables or Vault files.",
      ],

      nextAction:
        "Trace the variable from the failed task to its intended source and confirm the correct name.",
    },

    {
      step: 3,
      title: "Inspect inventory and group membership",
      purpose:
        "Determine whether the affected host receives the expected group variables.",

      commands: [
        "ansible-inventory -i inventory/production.ini --graph",
        "ansible-inventory -i inventory/production.ini --list",
      ],

      expectedOutput:
        "The graph shows inventory groups and hosts. The list shows structured inventory data.",

      interpretation: [
        "A host missing from the expected group may not receive that group's variables.",
        "Inventory group names and playbook host patterns must match the intended design.",
        "Dynamic inventory can supply host data that differs from static inventory files.",
        "The --list output can contain sensitive information. Store it securely and do not paste it into public logs.",
      ],

      nextAction:
        "Confirm the host's intended group membership and inspect only the relevant non-secret configuration.",
    },

    {
      step: 4,
      title: "Check group_vars and host_vars",
      purpose:
        "Verify the configuration files that supply environment-wide and host-specific values.",

      commands: [
        "find inventory -type f \\( -name '*.yml' -o -name '*.yaml' \\)",
        "find . -type d \\( -name group_vars -o -name host_vars \\)",
        "git grep -n 'app_port' -- inventory",
      ],

      expectedOutput:
        "The commands list matching configuration paths and tracked references.",

      interpretation: [
        "group_vars commonly supplies values to inventory groups.",
        "host_vars supplies values for specific hosts.",
        "File placement and naming must match the inventory structure and Ansible's variable-loading rules.",
        "Ansible does not automatically load every arbitrary YAML file anywhere in the repository.",
        "A host-specific value may override a broader group-level value, depending on variable precedence and the configuration source.",
      ],

      nextAction:
        "Confirm the expected file is loaded for the affected host and that the variable is spelled correctly.",
    },

    {
      step: 5,
      title: "Inspect variable precedence",
      purpose:
        "Determine whether a higher-precedence source overrides the expected value.",

      commands: [
        "ansible-playbook -i inventory/staging.ini site.yml --list-hosts",
        "git grep -n 'app_port' -- '*.yml' '*.yaml' '*.j2'",
      ],

      expectedOutput:
        "The commands identify selected hosts and references. Use the failed run's invocation and configuration to identify additional variable sources.",

      interpretation: [
        "Ansible has defined variable precedence rules; the value in a role default may be overridden by inventory, play variables, task variables or extra variables.",
        "Extra variables supplied with -e generally have very high precedence.",
        "The exact winning source depends on the variable category and execution context.",
        "Do not assume that the first matching definition is the active value.",
        "Avoid dumping the entire production variable set to discover the winning value.",
      ],

      nextAction:
        "Trace the candidate sources in precedence order and compare the intended value with the value resolved for the affected host using a safe, non-secret diagnostic.",
    },

    {
      step: 6,
      title: "Validate required variables explicitly",
      purpose:
        "Fail early with a clear message when a required variable is missing or invalid.",

      commands: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/staging.ini site.yml --list-hosts",
      ],

      expectedOutput:
        "These commands validate syntax and host selection. A required-variable assertion runs only when the playbook executes the relevant task.",

      interpretation: [
        "Syntax validation alone cannot validate every runtime variable or external secret.",
        "Use assert tasks for required values, permitted ranges and expected data types.",
        "Avoid making required production values optional merely to suppress errors.",
        "Validation must occur before tasks that mutate infrastructure or application state.",
      ],

      nextAction:
        "Add an early assertion for each required non-secret variable and test it in a safe environment.",
    },

    {
      step: 7,
      title: "Check YAML data types",
      purpose:
        "Identify values that look correct but have an unexpected type.",

      commands: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "git diff -- '*.yml' '*.yaml'",
      ],

      expectedOutput:
        "The syntax check identifies parsing issues. The diff helps inspect recent type-related changes.",

      interpretation: [
        "A port should normally be an integer where the module expects a numeric value.",
        "YAML values such as true and false are booleans; quoted values like 'false' are strings.",
        "Lists and dictionaries must have the structure expected by the consuming module or template.",
        "A syntactically valid YAML file can still contain a semantically incorrect value.",
      ],

      nextAction:
        "Correct the value's type and add validation for allowed values or data structure.",
    },

    {
      step: 8,
      title: "Debug Jinja2 templates safely",
      purpose:
        "Find missing dictionary keys, invalid expressions and unexpected template values.",

      commands: [
        "git grep -n 'app_port' -- '*.j2' '*.yml' '*.yaml'",
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
      ],

      expectedOutput:
        "The search identifies template references. Syntax validation checks playbook parsing but may not fully render runtime templates.",

      interpretation: [
        "A template may reference a nested key that does not exist for a particular host.",
        "Filters such as int, bool, default and mandatory affect how values are interpreted.",
        "Using default values indiscriminately can hide missing configuration.",
        "For mandatory production settings, fail with a clear validation message instead of silently generating a different configuration.",
      ],

      nextAction:
        "Validate the required input structure, render the template in a safe environment and compare the generated configuration with the intended result.",
    },

    {
      step: 9,
      title: "Investigate Ansible Vault and CI variables",
      purpose:
        "Determine whether encrypted values or pipeline-supplied variables are missing.",

      commands: [
        "ansible --version",
        "ansible-config dump --only-changed",
        "git status --short",
      ],

      expectedOutput:
        "The output shows the Ansible runtime, non-default configuration and working-tree changes.",

      interpretation: [
        "Vault decryption errors may indicate the wrong Vault password, missing password source or a mismatched encrypted file.",
        "A CI secret may not be injected into the job or may use a different variable name.",
        "A local environment can have credentials that the CI runner does not possess.",
        "Do not print environment variables wholesale or reveal decrypted secrets during diagnosis.",
      ],

      nextAction:
        "Check the approved Vault credential source and CI secret mapping without exposing secret values.",
    },

    {
      step: 10,
      title: "Validate the corrected deployment",
      purpose:
        "Prove the fix works before applying it to production.",

      commands: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/staging.ini site.yml --list-hosts",
        "ansible-playbook -i inventory/staging.ini site.yml --check --diff",
      ],

      expectedOutput:
        "The commands validate syntax, show the intended targets and attempt a check-mode run with diff output.",

      interpretation: [
        "Check mode is a simulation, not a guarantee that the actual run will succeed.",
        "Some modules do not support check mode completely.",
        "Diff output may reveal credentials or sensitive configuration. Use it only where approved and redact sensitive data.",
        "Confirm the correct environment and values before changing the inventory to production.",
      ],

      nextAction:
        "After approval, deploy to a canary or small batch and verify the resulting service configuration and health.",
    },
  ] satisfies VariableDiagnostic[],

  rootCauses: [
    {
      cause: "Variable is undefined or misspelled",

      symptoms: [
        "The task reports that a variable is undefined.",
        "The error starts after a variable rename or role refactor.",
      ],

      evidence: [
        "The failed task references a name that is absent from the intended source.",
        "Git diff shows a rename that did not update every consumer.",
      ],

      fix: [
        "Correct the variable name at the source or update the relevant references.",
        "Define required values in the appropriate scope.",
        "Add an explicit assertion so future failures identify the missing value clearly.",
      ],

      verification: [
        "Run syntax validation.",
        "Validate the required variable in a safe environment.",
        "Run the deployment against the intended non-production targets.",
      ],
    },

    {
      cause: "Incorrect group membership or variable-file placement",

      symptoms: [
        "One host group works while another fails.",
        "A group-specific variable is missing for only some hosts.",
      ],

      evidence: [
        "The inventory graph shows the affected host in an unexpected group.",
        "The variable file is not loaded from the intended inventory structure.",
      ],

      fix: [
        "Correct inventory group membership.",
        "Move or rename variable files according to the intended inventory layout.",
        "Validate dynamic inventory output when applicable.",
      ],

      verification: [
        "Inspect the inventory graph and target list.",
        "Test the affected host group in a safe environment.",
      ],
    },

    {
      cause: "Higher-precedence value overrides the expected value",

      symptoms: [
        "The variable exists but contains an unexpected value.",
        "Local execution works while CI or production behaves differently.",
      ],

      evidence: [
        "The pipeline invocation includes extra variables.",
        "Inventory, play, role or task configuration supplies competing definitions.",
      ],

      fix: [
        "Identify the source that should own the value.",
        "Remove accidental overrides or correct the intended override.",
        "Avoid relying on a role default for a mandatory production setting.",
      ],

      verification: [
        "Compare the expected value with the safely resolved value for the affected host.",
        "Repeat validation with the same invocation used by CI.",
      ],
    },

    {
      cause: "Incorrect YAML type or structure",

      symptoms: [
        "A module rejects a value even though the variable exists.",
        "A condition behaves unexpectedly.",
        "A template renders a malformed configuration.",
      ],

      evidence: [
        "The YAML value is quoted or structured differently from the module's expected input.",
        "A list or dictionary lacks a required key or has an unexpected shape.",
      ],

      fix: [
        "Correct the YAML type and structure.",
        "Validate numeric ranges, boolean values and required dictionary keys.",
        "Add assertions for the expected input contract.",
      ],

      verification: [
        "Run syntax validation and safe configuration checks.",
        "Inspect the generated configuration without exposing secrets.",
      ],
    },

    {
      cause: "Jinja2 template references a missing key",

      symptoms: [
        "A template task fails for only some hosts.",
        "The error references an undefined expression or dictionary field.",
      ],

      evidence: [
        "The required nested key is missing for the affected host.",
        "The data structure differs between environments.",
      ],

      fix: [
        "Correct the source data or template expression.",
        "Use a default only if the value is genuinely optional.",
        "Use explicit required-value validation for mandatory configuration.",
      ],

      verification: [
        "Render the template in a safe environment.",
        "Validate the generated configuration with the relevant application tool.",
      ],
    },

    {
      cause: "Vault or CI secret injection failure",

      symptoms: [
        "A variable works locally but is unavailable in CI.",
        "An encrypted variable fails to decrypt.",
      ],

      evidence: [
        "The runner lacks the approved Vault password source.",
        "The CI secret mapping differs from the expected variable name.",
      ],

      fix: [
        "Restore the approved secret injection or Vault credential source.",
        "Correct the variable mapping and access permissions.",
        "Do not commit plaintext secrets to fix a missing credential.",
      ],

      verification: [
        "Confirm the job can decrypt or consume the required secret without printing it.",
        "Run the relevant task in a safe environment.",
      ],
    },

    {
      cause: "Role defaults or role variables are incorrectly designed",

      symptoms: [
        "A role behaves differently when included from different playbooks.",
        "A caller cannot override a value as expected.",
      ],

      evidence: [
        "A configurable value is defined in a higher-precedence role variable instead of a default.",
        "The role's documented inputs differ from the variables used by its tasks.",
      ],

      fix: [
        "Place intended user-overridable defaults in role defaults where appropriate.",
        "Use role vars for values intended to be more tightly controlled by the role.",
        "Document required role inputs and their types.",
      ],

      verification: [
        "Test the role with default values and explicit overrides.",
        "Run the role through the same playbook entry point used in production.",
      ],
    },
  ] satisfies VariableRootCause[],

  recoveryWorkflow: {
    title: "Safe recovery after a variable-related deployment failure",

    steps: [
      {
        step: 1,
        name: "Pause rollout expansion",
        details:
          "Stop additional deployment batches until the intended values and current host state are understood.",
      },
      {
        step: 2,
        name: "Preserve evidence",
        details:
          "Record the failed task, variable name, affected host, pipeline run, commit and sanitized error output.",
      },
      {
        step: 3,
        name: "Determine actual production state",
        details:
          "Inspect changed tasks, generated configuration, application health and host-level deployment versions.",
      },
      {
        step: 4,
        name: "Trace the variable",
        details:
          "Identify its source, scope, precedence, expected type and whether a CI or Vault source is missing.",
      },
      {
        step: 5,
        name: "Correct the proven cause",
        details:
          "Fix the definition, override, inventory structure, data type, template or credential source without adding arbitrary defaults.",
      },
      {
        step: 6,
        name: "Validate before production",
        details:
          "Run syntax checks, target-list validation, required-variable assertions and a safe test deployment.",
      },
      {
        step: 7,
        name: "Resume in a controlled way",
        details:
          "Use the approved canary or batch strategy and verify the resolved configuration before expanding.",
      },
      {
        step: 8,
        name: "Verify service health",
        details:
          "Validate application configuration, service status, health endpoints, logs and version consistency.",
      },
      {
        step: 9,
        name: "Document prevention",
        details:
          "Record the root cause, contributing factors, recovery and preventive test or monitoring change.",
      },
    ],

    rollbackGuidance: [
      "An undefined variable does not automatically require an application rollback.",
      "If no production changes occurred, correcting the variable source and safely rerunning may be sufficient.",
      "If incorrect configuration was applied, restore the last known-good configuration using the approved recovery process.",
      "If only some hosts changed, assess version and configuration consistency before choosing rollback or forward recovery.",
      "Never assume rerunning a playbook reverses earlier tasks.",
      "Confirm database, persistent-data and application-version compatibility before rolling back.",
    ],
  },

  productionPatterns: [
    {
      title: "Validate required variables before making changes",

      example: `- name: Validate deployment inputs
  hosts: app_servers
  gather_facts: false

  vars:
    required_app_port: "{{ app_port | default(none) }}"

  tasks:
    - name: Ensure application port is provided
      ansible.builtin.assert:
        that:
          - required_app_port is not none
          - (required_app_port | string) is match('^[0-9]+$')
          - (required_app_port | int) >= 1
          - (required_app_port | int) <= 65535
        fail_msg: >-
          app_port must be defined and must be a valid TCP port.
      no_log: false`,

      explanation:
        "This example validates that a port is present and within the valid TCP port range before later tasks use it.",

      warning:
        "Adapt the assertion to your variable contract. Do not use no_log: false on tasks that might expose secrets. This example validates the numeric representation; the original variable's type should also be checked if strict type enforcement is required.",
    },

    {
      title: "Validate an environment-specific configuration",

      example: `- name: Validate environment selection
  hosts: app_servers
  gather_facts: false

  tasks:
    - name: Require an approved environment
      ansible.builtin.assert:
        that:
          - deployment_environment is defined
          - deployment_environment in ['dev', 'staging', 'production']
        fail_msg: >-
          deployment_environment must be dev, staging or production.`,

      explanation:
        "The assertion rejects missing or unapproved environment names before the deployment proceeds.",

      warning:
        "Environment validation is not a substitute for production approval or a verified inventory target list.",
    },

    {
      title: "Use role defaults for configurable values",

      example: `# roles/webapp/defaults/main.yml
app_port: 8080
app_service_name: webapp

# In the role task:
- name: Configure application service
  ansible.builtin.template:
    src: webapp.conf.j2
    dest: /etc/webapp/webapp.conf
    owner: root
    group: root
    mode: "0644"
  notify: Restart webapp`,

      explanation:
        "Role defaults provide sensible starting values that callers can override when the role is designed to support configuration overrides.",

      warning:
        "Do not place mandatory secrets or environment-specific production destinations in generic defaults. Define and validate those through the approved configuration source.",
    },

    {
      title: "Use safe debugging for non-secret values",

      example: `- name: Show selected non-secret configuration
  ansible.builtin.debug:
    msg:
      - "Environment: {{ deployment_environment }}"
      - "Application port: {{ app_port }}"`,

      explanation:
        "A narrowly scoped debug task can help verify selected non-secret values during a controlled test.",

      warning:
        "Do not print passwords, tokens, private keys, Vault contents or entire variable dictionaries. Remove temporary debug tasks before production release where appropriate.",
    },
  ],

  prevention: {
    title: "Prevent recurring variable errors",

    ciChecks: [
      {
        check: "Syntax validation",
        action:
          "Run ansible-playbook --syntax-check against the intended playbook and configuration.",
      },
      {
        check: "Inventory validation",
        action:
          "Validate the intended environment, inventory group and target host list.",
      },
      {
        check: "Required-variable assertions",
        action:
          "Fail early when mandatory values are absent or outside approved ranges.",
      },
      {
        check: "Type and structure validation",
        action:
          "Validate ports, booleans, lists, dictionaries and required nested keys.",
      },
      {
        check: "Variable naming",
        action:
          "Use consistent names and search all consumers when renaming a variable.",
      },
      {
        check: "Precedence review",
        action:
          "Review extra variables, inventory overrides, role defaults and role variables.",
      },
      {
        check: "Secret handling",
        action:
          "Use an approved secret store or Ansible Vault and prevent secrets from appearing in CI logs.",
      },
      {
        check: "Environment isolation",
        action:
          "Keep development, staging and production configuration separate and validate the selected environment.",
      },
      {
        check: "Template validation",
        action:
          "Render templates in a safe environment and validate the resulting configuration with the application's own validator.",
      },
      {
        check: "Controlled rollout",
        action:
          "Use canary or small-batch deployments with health checks and a documented recovery plan.",
      },
    ],

    monitoring: [
      "Alert on repeated failed deployment jobs.",
      "Record the variable-validation failure and the affected environment.",
      "Monitor configuration deployment status and service health.",
      "Detect configuration drift where appropriate.",
      "Track which release and configuration version each host is running.",
      "Keep sanitized, access-controlled logs for incident investigation.",
    ],

    commonMistakes: [
      "Adding default('') to every variable until the error disappears.",
      "Assuming syntax-check success proves all variables exist.",
      "Dumping every variable in production logs.",
      "Ignoring variable precedence and extra variables.",
      "Assuming every YAML value is a string.",
      "Putting all host-specific values in one shared group.",
      "Hard-coding production secrets in role defaults.",
      "Using staging values to bypass production validation.",
      "Assuming a failed playbook changed nothing.",
      "Retrying deployment without checking the current state of each host.",
    ],
  },

  incidentReportTemplate: {
    title: "Post-incident report",

    fields: [
      "Incident ID and severity",
      "Affected environment, host groups and services",
      "Pipeline run ID, commit SHA and artifact version",
      "Detection time, failure time and recovery time",
      "Failed task and variable name",
      "Expected variable source, type and purpose",
      "Actual cause: missing definition, override, type, template or secret source",
      "Affected hosts and tasks already changed",
      "User impact and duration",
      "Recovery action and verification evidence",
      "Preventive CI validation or test",
      "Owner and due date for follow-up actions",
    ],
  },

  interviewQuestions: [
    {
      question: "How do you troubleshoot an undefined variable in Ansible?",
      answer:
        "Start from the failed task, find every relevant definition and reference, confirm the affected host's inventory and group membership, check the variable-loading context and validate the required value before deployment.",
    },
    {
      question: "What is Ansible variable precedence?",
      answer:
        "It is the set of rules that determines which value wins when the same variable is defined in multiple places. The winning value depends on the source and execution context.",
    },
    {
      question: "What is the difference between role defaults and role vars?",
      answer:
        "Role defaults are intended for configurable starting values and are relatively easy to override. Role vars generally have higher precedence and are used for values the role intends to control more tightly.",
    },
    {
      question: "Why does staging work while production fails?",
      answer:
        "The environments may have different inventory groups, host_vars, group_vars, extra variables, Vault credentials, dynamic inventory data or configuration values.",
    },
    {
      question: "Why is default('') not always a good fix?",
      answer:
        "It can hide missing mandatory configuration and cause a task to continue with an invalid value. Use defaults only for genuinely optional values and assertions for required values.",
    },
    {
      question: "Does ansible-playbook --syntax-check validate all variables?",
      answer:
        "No. It checks playbook syntax and parsing but does not guarantee every runtime variable, secret, external dependency or template value will be valid.",
    },
    {
      question: "How do you investigate a wrong variable value?",
      answer:
        "Trace all candidate definitions, inspect inventory membership, review the invocation and extra variables, apply precedence rules, and compare the intended value with a safe diagnostic for the affected host.",
    },
    {
      question: "How do you troubleshoot a Jinja2 undefined error?",
      answer:
        "Identify the expression and missing key, inspect the expected data structure, compare hosts and environments, and validate the template in a safe environment.",
    },
    {
      question: "How do you troubleshoot Ansible Vault errors?",
      answer:
        "Verify the correct encrypted file, approved Vault password source and CI secret mapping without printing decrypted values or committing plaintext credentials.",
    },
    {
      question: "How do you recover if an incorrect variable reached production?",
      answer:
        "Pause rollout expansion, assess which hosts changed, verify current service health, restore the last known-good configuration or apply a controlled forward fix, then validate all affected hosts.",
    },
  ],

  runbookChecklist: [
    "Identify the failed pipeline, commit and target environment.",
    "Record the first failing task and exact variable name.",
    "Confirm the repository, inventory and selected host list.",
    "Check recent Git changes and variable renames.",
    "Trace definitions in play vars, role defaults, role vars, inventory, group_vars and host_vars.",
    "Check dynamic inventory and CI-supplied variables where applicable.",
    "Review variable precedence and extra-variable inputs.",
    "Validate YAML data types and dictionary/list structure.",
    "Check Jinja2 template expressions and required nested keys.",
    "Verify Vault and CI secret sources without exposing secrets.",
    "Determine which production hosts already changed.",
    "Add required-variable assertions and validate in a safe environment.",
    "Run the approved canary deployment.",
    "Verify generated configuration and application health.",
    "Document the root cause and add a preventive test.",
  ],
};

export default variableErrorsGuide;
