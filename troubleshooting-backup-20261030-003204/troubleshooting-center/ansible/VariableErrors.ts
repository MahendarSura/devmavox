
export const variableErrorsProductionAddendum = {
  productionIncidentScenario: {
    title: "Production deployment selected the wrong database endpoint",
    severity: "SEV-1 or SEV-2 depending on actual customer impact",
    scenario:
      "A deployment that normally targets the production database suddenly renders a staging endpoint. The playbook succeeds on some hosts but application health deteriorates after rollout.",
    symptoms: [
      "Deployment output shows successful templating but unexpected endpoint values.",
      "One inventory group resolves to a different environment.",
      "A recent CI change added an extra-vars argument.",
      "Some hosts render different configuration from others.",
      "The service starts but cannot reach the intended dependency.",
    ],
    immediateActions: [
      "Pause rollout expansion and notify the incident owner.",
      "Confirm whether any configuration was already applied.",
      "Preserve pipeline logs, commit SHA, artifact version and deployment timestamp.",
      "Identify hosts changed before the incident was detected.",
      "Do not print credentials or dump every variable into CI logs.",
      "Require production approval before any corrective write operation.",
    ],
    impactAssessment: [
      "Which environment and service are affected?",
      "Which hosts received the incorrect configuration?",
      "Did the application restart or reload the incorrect configuration?",
      "Is customer traffic affected?",
      "Can the service safely continue with its current configuration?",
      "Are database schema changes or irreversible migrations involved?",
    ],
    recoveryPrinciple:
      "First establish the effective value and its source. Then correct the narrowest responsible variable source, validate the rendered configuration, deploy to a canary and confirm application health before resuming the rollout.",
  },

  variableFailureSignatureMatrix: [
    {
      symptom: "AnsibleUndefinedVariable / undefined variable",
      likelyCauses: [
        "Typo in variable name",
        "Missing group_vars or host_vars file",
        "Incorrect vars_files path",
        "Variable defined only for another environment",
        "Conditional task or include never ran",
        "Incorrect dictionary key or nested structure",
      ],
      diagnostics: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-inventory -i inventory/staging.ini --graph",
        "ansible-inventory -i inventory/staging.ini --host app01",
        "grep -RIn --exclude-dir=.git 'database_host' group_vars host_vars roles playbooks",
      ],
      interpretation: [
        "Syntax validation does not guarantee every runtime variable is defined.",
        "Inventory output helps establish inventory-derived variables but may not show task-level overrides.",
        "A text search finds candidate definitions; it does not prove which definition wins.",
      ],
      fix: "Correct the variable name or load path, or define a validated required value at the intended scope.",
    },
    {
      symptom: "Variable exists but the value is unexpected",
      likelyCauses: [
        "Extra vars override the expected inventory value",
        "Host-level value overrides group-level assumptions",
        "Role or task variables introduce another value",
        "A set_fact task changes the value",
        "A CI template injects an unexpected parameter",
      ],
      diagnostics: [
        "ansible-config dump --only-changed",
        "ansible-inventory -i inventory/production.ini --host app01",
        "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
        "git diff -- group_vars host_vars roles playbooks .github",
      ],
      interpretation: [
        "ansible-config describes Ansible configuration, not the complete variable precedence chain.",
        "Inventory output does not establish every final task-scoped value.",
        "Review the actual pipeline command, especially -e / --extra-vars arguments.",
      ],
      fix: "Remove or correct the unintended override at its source. Do not blindly move all variables into higher-precedence locations.",
    },
    {
      symptom: "String, boolean, integer or list type mismatch",
      likelyCauses: [
        "YAML quoting changed a value's type",
        "CI passed a string instead of a typed value",
        "A comma-separated string was expected to be a list",
        "An empty string was treated as a valid configuration",
        "A boolean-like string was interpreted unexpectedly",
      ],
      diagnostics: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/staging.ini site.yml --check --diff",
        "ansible-lint",
      ],
      interpretation: [
        "Syntax checks do not validate every business-level type constraint.",
        "Check mode and diff may still expose sensitive rendered values; use a safe test environment and review output handling.",
        "A quoted value such as 'false' is a string, not necessarily a boolean false.",
      ],
      fix: "Validate types explicitly and convert only where conversion is intentional and unambiguous.",
    },
    {
      symptom: "Nested expression fails, such as app.database.host",
      likelyCauses: [
        "Parent dictionary is undefined",
        "Expected nested key is absent",
        "The structure changed from a dictionary to a list",
        "A variable file uses a different schema",
      ],
      diagnostics: [
        "ansible-inventory -i inventory/staging.ini --host app01",
        "grep -RIn --exclude-dir=.git 'database:' group_vars host_vars roles",
      ],
      interpretation: [
        "Confirm each level of the expected structure rather than only checking the final key.",
        "Do not print entire dictionaries when they may contain credentials.",
      ],
      fix: "Restore the expected data structure and add schema-like assertions for required keys.",
    },
    {
      symptom: "vars_files or include_vars does not load expected values",
      likelyCauses: [
        "Wrong relative path or filename",
        "Environment selector resolves incorrectly",
        "File is absent from the deployment artifact",
        "Alphabetical loading order changes values",
        "Conditional include did not execute",
      ],
      diagnostics: [
        "pwd",
        "git status --short",
        "find group_vars host_vars vars -maxdepth 3 -type f 2>/dev/null",
        "git diff -- group_vars host_vars vars playbooks roles",
      ],
      interpretation: [
        "Relative paths must be evaluated in the context Ansible actually uses.",
        "When loading a directory, include_vars processes files alphabetically.",
        "A file being present in the repository does not prove it is included at runtime.",
      ],
      fix: "Correct the path or include condition, document file ordering, and validate environment-specific loading in CI.",
    },
    {
      symptom: "Registered result has no stdout or expected field",
      likelyCauses: [
        "The command task was skipped",
        "The task failed before producing the expected result",
        "The module returns a different structure",
        "A loop produces a list of results rather than a single result",
      ],
      diagnostics: [
        "Review the registered task's result and the immediately preceding task.",
        "Inspect the condition controlling the task.",
        "Use a redacted debug statement for only the required result fields in staging.",
      ],
      interpretation: [
        "A registered variable may exist even when a task is skipped or fails.",
        "A registered loop result commonly has a results collection.",
        "Do not assume stdout exists for every module.",
      ],
      fix: "Handle skipped, failed and loop-result states explicitly before consuming the result.",
    },
    {
      symptom: "Vault or CI secret variable missing",
      likelyCauses: [
        "Wrong Vault password source",
        "Secret unavailable to the branch or deployment environment",
        "Secret name changed in the CI platform",
        "Vault identity or permission failure",
        "Variable scope differs between local and CI execution",
      ],
      diagnostics: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-config dump --only-changed",
        "Review the CI secret reference and permission configuration without printing its value.",
      ],
      interpretation: [
        "A missing secret reference and an invalid secret value are different failure classes.",
        "Vault decryption errors should be investigated separately from undefined variables.",
      ],
      fix: "Restore the approved secret reference or access policy. Never paste secret values into logs or incident reports.",
    },
    {
      symptom: "A cached or registered value appears stale",
      likelyCauses: [
        "Fact cache retains older facts",
        "set_fact is scoped to a host or play unexpectedly",
        "A later task overwrites the intended value",
        "A deployment is using a different inventory or execution context",
      ],
      diagnostics: [
        "ansible-config dump --only-changed",
        "Review fact-cache configuration and cache backend.",
        "Inspect the task order and set_fact usage.",
        "Compare effective values for a healthy host and a failed host without revealing secrets.",
      ],
      interpretation: [
        "Cached facts, registered variables and ordinary inventory variables have different lifetimes and scopes.",
        "Do not clear a shared cache until its users and recovery impact are understood.",
      ],
      fix: "Correct the data source or task ordering and invalidate only the affected cache entries through the approved process.",
    },
  ],

  productionDiagnosticWorkflow: [
    {
      step: 1,
      name: "Contain and establish impact",
      commands: [
        "git rev-parse HEAD",
        "git status --short",
        "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
      ],
      investigate: [
        "Record incident start time and last known good deployment.",
        "Determine whether the playbook already changed any hosts.",
        "Compare the current commit with the last known good commit.",
        "Confirm the intended environment and deployment approval.",
      ],
      passCriteria:
        "The team knows the deployment scope, affected hosts and whether changes have already been applied.",
    },
    {
      step: 2,
      name: "Capture the execution context",
      commands: [
        "pwd",
        "whoami",
        "ansible --version",
        "ansible-config dump --only-changed",
      ],
      investigate: [
        "Confirm the working directory and configuration file.",
        "Check the Ansible version used by CI versus local development.",
        "Review command-line overrides and environment-specific pipeline parameters.",
      ],
      passCriteria:
        "The investigation reproduces the same execution context as the failed run.",
    },
    {
      step: 3,
      name: "Confirm target selection",
      commands: [
        "ansible-inventory -i inventory/production.ini --graph",
        "ansible-inventory -i inventory/production.ini --host app01",
        "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
      ],
      investigate: [
        "Verify expected host groups and environment membership.",
        "Inspect inventory-side values relevant to the failure.",
        "Confirm that the target set matches the approved deployment.",
      ],
      passCriteria:
        "The intended hosts and inventory-side variables are confirmed.",
    },
    {
      step: 4,
      name: "Locate variable definitions",
      commands: [
        "grep -RIn --exclude-dir=.git 'database_host' group_vars host_vars vars roles playbooks",
        "git diff -- group_vars host_vars vars roles playbooks",
        "git log -n 10 --oneline -- group_vars host_vars vars roles playbooks",
      ],
      investigate: [
        "Search defaults, inventory variables, vars_files, role variables and set_fact tasks.",
        "Identify recently changed definitions.",
        "Inspect conditional includes and templated filenames.",
      ],
      passCriteria:
        "The plausible variable sources and recent changes are documented.",
    },
    {
      step: 5,
      name: "Determine the effective value safely",
      commands: [
        "ansible-inventory -i inventory/production.ini --host app01",
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
      ],
      investigate: [
        "Use inventory output for inventory-level evidence only.",
        "Use a temporary staging-only diagnostic task to validate the exact variable consumed by the failing task.",
        "Redact sensitive values and log only the minimum required fields.",
      ],
      passCriteria:
        "The effective value at the relevant execution point is known without leaking secrets.",
    },
    {
      step: 6,
      name: "Validate the data contract",
      commands: [
        "ansible-lint",
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
      ],
      investigate: [
        "Check required keys, data types, allowed values, ranges and relationships.",
        "Validate the rendered configuration in a disposable environment.",
        "Check that required secret references exist without displaying secret contents.",
      ],
      passCriteria:
        "The value meets the application's expected schema and business constraints.",
    },
    {
      step: 7,
      name: "Apply the smallest correction",
      investigate: [
        "Fix the source that introduced the incorrect value.",
        "Avoid a broad variable rename or precedence change during an incident unless required.",
        "Review the change diff and obtain production approval.",
      ],
      passCriteria:
        "The fix is minimal, reviewed and linked to the observed root cause.",
    },
    {
      step: 8,
      name: "Validate and recover gradually",
      commands: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/staging.ini site.yml --check --diff",
      ],
      investigate: [
        "Use staging for functional validation.",
        "Check mode is not a guarantee that every task is side-effect free.",
        "Protect diff output because rendered configuration may contain secrets.",
        "Deploy to a production canary only after the approved release gate passes.",
      ],
      passCriteria:
        "The rendered configuration is correct and the canary meets application health criteria.",
    },
    {
      step: 9,
      name: "Reconcile partial deployment",
      investigate: [
        "Create a per-host table of old version, new version, task outcome and service health.",
        "Identify hosts that were skipped, failed or changed before the pipeline stopped.",
        "Decide between forward recovery and rollback based on application compatibility and actual state.",
      ],
      passCriteria:
        "Every intended host has a known state and an approved recovery action.",
    },
    {
      step: 10,
      name: "Close with evidence",
      investigate: [
        "Verify deployed versions and application health.",
        "Confirm no unexpected environment values remain.",
        "Record root cause, contributing factors, corrective action and prevention owner.",
        "Remove temporary diagnostics and verify logs do not retain sensitive output.",
      ],
      passCriteria:
        "Service health and fleet consistency meet the team's documented exit criteria.",
    },
  ],

  variablePrecedenceInvestigation: {
    title: "Find which definition wins",
    sourcesToInspect: [
      "Role defaults",
      "Inventory group variables",
      "Inventory host variables",
      "Play vars and vars_files",
      "Role and block variables",
      "Task variables",
      "Registered variables and set_fact",
      "Extra vars passed with -e / --extra-vars",
    ],
    commands: [
      "ansible-config dump --only-changed",
      "ansible-inventory -i inventory/staging.ini --host app01",
      "ansible-playbook -i inventory/staging.ini site.yml --list-hosts",
      "git diff -- inventory group_vars host_vars vars roles playbooks",
    ],
    method: [
      "Write down the variable name and expected value.",
      "List every source defining that variable.",
      "Record which sources apply to the affected host and task.",
      "Inspect pipeline arguments for extra vars and environment selectors.",
      "Use a staging diagnostic task to assert the exact value consumed by the relevant task.",
      "Change the narrowest unintended override and rerun validation.",
    ],
    warning:
      "Do not assume inventory output is the final value in every task context. Variable precedence depends on the source and execution context; use official precedence documentation for the Ansible version in use.",
  },

  safeDiagnosticPlaybook: `---
- name: Validate required deployment variables
  hosts: app_servers
  gather_facts: false

  vars:
    required_variable_names:
      - app_environment
      - app_port
      - app_config_path

  tasks:
    - name: Require mandatory deployment variables
      ansible.builtin.assert:
        that:
          - app_environment is defined
          - app_port is defined
          - app_config_path is defined
        fail_msg: >-
          Required deployment variables are missing.
          Check the approved inventory and environment configuration.
        quiet: true

    - name: Validate environment allowlist
      ansible.builtin.assert:
        that:
          - app_environment in ['development', 'staging', 'production']
        fail_msg: "app_environment is not an approved environment."
        quiet: true

    - name: Validate port range
      ansible.builtin.assert:
        that:
          - app_port is number
          - app_port | int >= 1
          - app_port | int <= 65535
        fail_msg: "app_port must be a valid TCP/UDP port number."
        quiet: true

    - name: Validate configuration path
      ansible.builtin.assert:
        that:
          - app_config_path is string
          - app_config_path | length > 0
        fail_msg: "app_config_path must be a non-empty string."
        quiet: true`,

  safeDiagnosticPlaybookNotes: [
    "Treat this as a template; adjust the variable names and type requirements to match the application.",
    "The example intentionally avoids printing the actual variable values.",
    "For production, ensure the environment allowlist and host targeting reflect the approved deployment policy.",
    "An assertion validates the stated conditions only; it does not prove that a database, service or endpoint is healthy.",
    "Do not use a default value for a required production endpoint merely to suppress an undefined-variable error.",
  ],

  secretLeakPrevention: {
    rules: [
      "Never debug-print Vault passwords, tokens, private keys, passwords or complete secret dictionaries.",
      "Prefer ansible.builtin.no_log: true for tasks whose arguments or results contain secrets.",
      "Remember that no_log suppresses normal output but does not make unsafe debugging or every external logging system risk-free.",
      "Do not enable persistent verbose debugging of secret-bearing tasks in production.",
      "Inspect rendered configuration and CI artifacts for accidental secret exposure.",
      "If a credential was exposed, treat it as compromised and follow the approved rotation and incident-response process.",
    ],
    example: `- name: Configure service credential
  ansible.builtin.template:
    src: service.conf.j2
    dest: /etc/example/service.conf
    owner: root
    group: example
    mode: "0640"
  no_log: true`,
    warning:
      "Use no_log only where appropriate and preserve enough redacted operational evidence for troubleshooting. Confirm ownership, permissions and secret handling with the service's security requirements.",
  },

  preventionAndCi: {
    requiredControls: [
      "Validate playbook syntax and run ansible-lint in CI.",
      "Validate inventory groups and required variables before production approval.",
      "Maintain separate environment variable files and explicit environment selection.",
      "Use assertions for required values, allowed environments and type/range constraints.",
      "Review changes to group_vars, host_vars, role defaults, vars_files and extra-vars arguments.",
      "Prevent unexpected production target sets with an explicit pre-deployment gate.",
      "Use a staging rendered-configuration test for high-risk variables.",
      "Use Vault or an approved secret manager for sensitive values.",
      "Ensure CI logs and artifacts do not expose rendered secrets.",
      "Document variable ownership and the authoritative source for each critical setting.",
      "Test rollback and forward recovery for configuration changes.",
      "Record per-host deployment state and application health.",
    ],
    ciExample: `#!/usr/bin/env bash
set -euo pipefail

INVENTORY="inventory/staging.ini"
PLAYBOOK="site.yml"

echo "== Syntax validation =="
ansible-playbook -i "$INVENTORY" "$PLAYBOOK" --syntax-check

echo "== Inventory validation =="
ansible-inventory -i "$INVENTORY" --graph

echo "== Target preview =="
ansible-playbook -i "$INVENTORY" "$PLAYBOOK" --list-hosts

echo "== Lint =="
ansible-lint

echo "Preflight complete. Deployment approval remains mandatory."`,
    limitations: [
      "This CI example uses staging inventory deliberately.",
      "Syntax checks and inventory previews do not prove that all runtime variables are correct.",
      "A production deployment still needs its normal approval and health-check gates.",
      "Avoid adding a debug task that dumps all variables to make CI diagnostics easier.",
    ],
  },

  decisionTree: [
    {
      symptom: "Variable undefined",
      next: "Check spelling, required-key assertions, inventory membership, vars_files paths and conditional include execution.",
    },
    {
      symptom: "Variable defined but wrong",
      next: "Enumerate sources, inspect extra-vars and recent Git changes, then validate the effective task-level value in staging.",
    },
    {
      symptom: "Variable has wrong type",
      next: "Check YAML quoting, CI parameter types, input schema and module argument requirements.",
    },
    {
      symptom: "Only some hosts fail",
      next: "Compare host_vars, group membership, inventory source, facts, environment and task conditions between healthy and failing hosts.",
    },
    {
      symptom: "Secret is missing or invalid",
      next: "Check secret reference, access policy, Vault configuration and CI environment mapping without printing secret values.",
    },
    {
      symptom: "Playbook succeeds but service fails",
      next: "Inspect the rendered configuration, service logs, dependency connectivity and application health; successful templating alone is not success.",
    },
  ],

  rollbackAndRecovery: {
    beforeRecovery: [
      "Confirm the failed deployment's exact commit and artifact.",
      "Identify every host that may have received the incorrect value.",
      "Determine whether the configuration has already been loaded by the application.",
      "Check whether data migrations or irreversible changes occurred.",
      "Get approval for production recovery.",
    ],
    forwardRecovery: [
      "Correct the authoritative variable source.",
      "Validate syntax, inventory and required variable assertions.",
      "Render and inspect configuration safely in staging.",
      "Deploy to a canary and validate application health.",
      "Resume with bounded batches and monitor each batch.",
    ],
    rollback: [
      "Restore the last known good variable configuration or approved artifact.",
      "Confirm compatibility with the currently deployed application version.",
      "Do not blindly revert a variable file if doing so would undo an unrelated security fix.",
      "Verify application health, dependency connectivity and host-version consistency after rollback.",
    ],
    completionCriteria: [
      "Correct environment values are verified.",
      "All intended hosts are accounted for.",
      "Application health meets documented service-level criteria.",
      "Secrets remain protected in logs and artifacts.",
      "Incident evidence and prevention actions are recorded.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "",
    startTimeUtc: "",
    detectionSource: "",
    severityAndBusinessImpact: "",
    affectedEnvironmentsAndHosts: "",
    lastKnownGoodCommit: "",
    failedCommitAndPipelineRun: "",
    expectedVariableAndSource: "",
    observedVariableAndExecutionContext: "",
    evidenceAndRedactedLogs: "",
    rootCause: "",
    contributingFactors: "",
    correctiveAction: "",
    recoveryOrRollbackDecision: "",
    validationAndHealthResults: "",
    securityOrSecretExposureAssessment: "",
    preventionActions: [
      {
        action: "Add required-variable assertions",
        owner: "",
        dueDate: "",
        status: "open",
      },
      {
        action: "Add environment-specific CI validation",
        owner: "",
        dueDate: "",
        status: "open",
      },
    ],
  },

  handsOnLabs: [
    {
      title: "Undefined variable",
      setup: "In a disposable staging inventory, remove a required variable from a test host.",
      tasks: [
        "Capture the exact undefined-variable error.",
        "Inspect inventory membership and variable file paths.",
        "Add an assertion for the required input.",
        "Restore the correct test variable and validate.",
      ],
      successCriteria:
        "The learner proves which required definition was missing and adds a test that prevents the same failure.",
    },
    {
      title: "Variable precedence conflict",
      setup: "Define a harmless test variable at two different scopes and pass a third value through a staging-only extra-vars argument.",
      tasks: [
        "Record each definition and its intended scope.",
        "Inspect inventory-derived values.",
        "Observe the value used by a controlled test task.",
        "Remove the unintended override and retest.",
      ],
      successCriteria:
        "The learner explains the effective value using evidence rather than guessing from a single file.",
    },
    {
      title: "Wrong type or nested structure",
      setup: "Provide an invalid test port or remove a required nested dictionary key.",
      tasks: [
        "Reproduce the failure in staging.",
        "Add type, range and required-key assertions.",
        "Test valid and invalid inputs.",
      ],
      successCriteria:
        "Invalid inputs fail early with a useful, non-sensitive error message.",
    },
    {
      title: "Secret-safe diagnostics",
      setup: "Use a disposable secret reference in a test environment.",
      tasks: [
        "Review tasks that handle the test secret.",
        "Suppress sensitive task output where appropriate.",
        "Inspect pipeline logs and artifacts for exposure.",
        "Document the approved response if exposure occurs.",
      ],
      successCriteria:
        "Troubleshooting evidence remains useful without disclosing the secret.",
    },
    {
      title: "Partial rollout and recovery",
      setup: "Use disposable test hosts and an idempotent configuration playbook.",
      tasks: [
        "Simulate a variable error affecting one host.",
        "Record per-host state and the last successful task.",
        "Correct the source and validate the rendered configuration.",
        "Resume gradually and verify service health.",
      ],
      successCriteria:
        "The learner reconciles actual host state before resuming instead of blindly rerunning the whole deployment.",
    },
  ],

  advancedInterviewQuestions: [
    {
      question: "Why does ansible-inventory --host not always reveal the final value used by a task?",
      answer:
        "It reports inventory-derived host variables. Play, role, block and task variables, registered values, set_fact and extra vars can change the effective value in the actual execution context.",
    },
    {
      question: "Why is default('') risky for a required production endpoint?",
      answer:
        "It can hide a missing required value and let an invalid configuration progress further. Required inputs should fail early with an explicit assertion.",
    },
    {
      question: "How would you investigate a variable that is correct locally but wrong in CI?",
      answer:
        "Compare the runner identity, working directory, Ansible version, inventory source, configuration, secret references, environment selectors and command-line extra vars. Reproduce using the same approved CI context.",
    },
    {
      question: "How do you distinguish a missing variable from an incorrect secret?",
      answer:
        "Inspect the variable reference and secret-provider access separately. A missing mapping, decryption error, denied access and invalid credential have different evidence and fixes.",
    },
    {
      question: "What is the risk of dumping hostvars during a production incident?",
      answer:
        "Host variables may contain passwords, tokens, private endpoints or other sensitive data. Broad debug output can expose secrets in CI logs and artifacts.",
    },
    {
      question: "What should happen if only some hosts received the incorrect configuration?",
      answer:
        "Pause rollout expansion, reconcile each host's actual version and configuration, determine service impact, then choose approved forward recovery or rollback.",
    },
    {
      question: "Does --check guarantee that a playbook will not change production?",
      answer:
        "No. Check mode depends on task and module support and does not guarantee every task is side-effect free. Use it as one validation signal, not a safety guarantee.",
    },
    {
      question: "How do you prevent wrong-environment deployments?",
      answer:
        "Separate environment configuration, validate allowed environment values, verify the resolved target set, review extra-vars, and enforce production approval and canary gates.",
    },
  ],

  officialReferences: [
    {
      title: "Ansible variable precedence",
      url: "https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_variables.html",
      purpose:
        "Use the documentation matching the installed Ansible version when investigating variable precedence and scope.",
    },
    {
      title: "Inventory guide",
      url: "https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html",
      purpose:
        "Understand inventory sources, groups, host variables and inventory organization.",
    },
    {
      title: "include_vars module",
      url: "https://docs.ansible.com/ansible/latest/collections/ansible/builtin/include_vars_module.html",
      purpose:
        "Review runtime variable-file loading and directory loading behavior.",
    },
    {
      title: "Variables lookup",
      url: "https://docs.ansible.com/ansible/latest/collections/ansible/builtin/vars_lookup.html",
      purpose:
        "Understand how to look up variables and handle missing names.",
    },
    {
      title: "Ansible Vault",
      url: "https://docs.ansible.com/ansible/latest/vault_guide/index.html",
      purpose:
        "Review approved handling of encrypted variable data and secrets.",
    },
  ],
};
