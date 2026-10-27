export const pythonError = {
  title: "Ansible Python Errors and Production Troubleshooting",
  slug: "python-error",
  category: "Ansible",
  severity: "High",
  estimatedTime: "30–90 minutes",
  description:
    "Diagnose and resolve Ansible Python interpreter, dependency, module execution, " +
    "inventory, permissions, and CI/CD execution failures using a safe production workflow.",

  symptoms: [
    "Ansible reports No module named ...",
    "Python interpreter cannot be discovered on a managed host.",
    "Ansible modules fail even though SSH connectivity succeeds.",
    "A playbook works locally but fails in the CI/CD runner.",
    "Python dependencies are installed for a different interpreter.",
    "Ansible reports a syntax error or incompatible Python version.",
    "Only a subset of managed hosts fails.",
    "A deployment pipeline suddenly reports zero hosts.",
    "Dynamic inventory returns no hosts or fails to load.",
    "The playbook runs against the wrong inventory or environment.",
    "A task fails with Permission denied or become-related errors.",
    "A package upgrade breaks a previously working playbook.",
    "A task succeeds on one host but fails on another.",
    "A deployment partially completes before Python execution fails.",
  ],

  incidentScenario: {
    title: "Production deployment suddenly fails across managed hosts",

    situation:
      "A CI/CD pipeline starts an Ansible deployment. The pipeline was successful " +
      "in earlier runs, but the current run either targets zero hosts or fails during " +
      "Python module execution. Some tasks may already have changed production state.",

    businessImpact: [
      "Application deployment is delayed.",
      "Production hosts may have inconsistent configurations.",
      "A release may be partially deployed.",
      "Repeated retries may repeat changes or increase the outage.",
      "A controller-side Python issue may block multiple environments.",
      "A wrong inventory may cause changes to unintended hosts.",
    ],

    initialActions: [
      "Pause repeated deployment attempts until the failure is understood.",
      "Identify the affected application, environment, pipeline, and release.",
      "Determine whether any production changes already occurred.",
      "Save the complete job log and the first failing task.",
      "Confirm the approved incident severity and escalation process.",
      "Assign an incident owner and communicate the deployment status.",
      "Do not replace system Python or modify production packages blindly.",
    ],

    successCriteria: [
      "The actual failure domain is identified.",
      "The correct repository, inventory, and environment are confirmed.",
      "The root cause is supported by evidence.",
      "The smallest safe correction is validated.",
      "The deployment is rerun in a controlled manner.",
      "Application health checks pass.",
      "The incident report and preventive actions are recorded.",
    ],
  },

  impactAssessment: {
    questions: [
      "Is the failure limited to development, staging, or production?",
      "Is the entire deployment blocked or only a subset of hosts?",
      "Does the inventory contain the expected host count?",
      "Did the playbook change any hosts before failing?",
      "Is the application currently healthy?",
      "Did the runner image, Python version, collection, or dependency change?",
      "Could a rerun repeat database, service, or infrastructure changes?",
      "Is rollback required, or is forward recovery safer?",
    ],

    severityGuidance: [
      {
        level: "SEV-1",
        condition:
          "A critical production service is unavailable or widespread impact is occurring.",
        response:
          "Follow the organization's emergency incident process and involve the service owner immediately.",
      },
      {
        level: "SEV-2",
        condition:
          "A critical deployment is blocked or production hosts have inconsistent state.",
        response:
          "Stop uncontrolled changes, assess impact, and coordinate a controlled recovery.",
      },
      {
        level: "SEV-3",
        condition:
          "A non-critical environment or limited group of hosts is affected.",
        response:
          "Investigate with normal incident procedures and validate the fix before rerunning.",
      },
    ],
  },

  safetyChecks: [
    "Confirm the current repository and Git branch.",
    "Confirm the commit or release being deployed.",
    "Confirm the working directory used by the pipeline.",
    "Confirm the active Ansible configuration file.",
    "Confirm the intended inventory and target environment.",
    "Confirm the actual host count before running changes.",
    "Confirm the CI/CD runner or execution-container identity.",
    "Distinguish controller Python from managed-host Python.",
    "Check whether any tasks already reported changed.",
    "Use approved production access and change approvals.",
    "Use --check only where the relevant modules support check mode correctly.",
    "Use --diff cautiously because it can expose sensitive configuration values.",
    "Never print Vault passwords, private keys, tokens, or full secret-bearing environments.",
    "Do not upgrade system Python without an approved compatibility and rollback plan.",
    "Do not run an unrestricted production playbook just to test connectivity.",
  ],

  evidenceCollection: {
    collect: [
      "Complete CI/CD job logs and timestamps.",
      "The first failing task and full traceback.",
      "Repository commit, branch, and changed files.",
      "Pipeline working directory and command-line arguments.",
      "Ansible version and active configuration path.",
      "Inventory source and expected target count.",
      "Python executable and version on the controller.",
      "Python executable and version on affected managed hosts.",
      "Ansible collection and role versions.",
      "Runner image or execution-environment version.",
      "Operating system and image version on affected hosts.",
      "Relevant package-manager logs.",
      "Per-host PLAY RECAP output.",
      "Recent dependency, inventory, runner, or playbook changes.",
    ],

    protect: [
      "Redact passwords, tokens, private keys, and secret values.",
      "Do not upload unredacted production logs to public issue trackers.",
      "Keep evidence in the organization's approved incident system.",
      "Record timestamps with the relevant timezone.",
      "Compare an affected host with a healthy host using approved read-only checks.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the controller and repository context",

      objective:
        "Verify that the pipeline is executing from the expected repository and commit.",

      commands: [
        "pwd",
        "git rev-parse --show-toplevel",
        "git rev-parse HEAD",
        "git branch --show-current",
        "git status --short",
        "ansible --version",
      ],

      interpret: [
        {
          evidence: "The repository root or commit is unexpected.",
          meaning: "The pipeline may be using the wrong checkout or working directory.",
          action:
            "Correct the checkout, working directory, or release reference and rerun validation.",
        },
        {
          evidence: "Ansible uses a different Python interpreter than expected.",
          meaning:
            "The shell's Python command may not be the interpreter used by Ansible.",
          action:
            "Inspect the virtual environment, runner image, and Ansible installation.",
        },
        {
          evidence: "Unexpected local modifications exist.",
          meaning:
            "The pipeline or workspace may contain uncommitted changes.",
          action:
            "Review the changes before using the workspace for a deployment.",
        },
      ],
    },

    {
      step: 2,
      title: "Investigate a pipeline targeting zero hosts",

      objective:
        "Find out whether the problem is caused by inventory selection, host patterns, or dynamic inventory.",

      commands: [
        "ansible-inventory -i inventory/production.ini --graph",
        "ansible-inventory -i inventory/production.ini --list",
        "ansible all -i inventory/production.ini --list-hosts",
      ],

      important:
        "Replace inventory/production.ini with the exact inventory source used by your pipeline. " +
        "Do not assume that this example path exists in your repository.",

      interpret: [
        {
          evidence: "The inventory graph is empty.",
          meaning:
            "The inventory source may be empty, incorrectly parsed, unavailable, or returning no hosts.",
          action:
            "Check the actual inventory path, inventory plugin, source credentials, and dynamic inventory output.",
        },
        {
          evidence: "Hosts appear in the inventory, but the playbook matches none.",
          meaning:
            "The play's hosts pattern or command-line limit may exclude the available hosts.",
          action:
            "Compare the play's hosts value, --limit, inventory groups, and pipeline variables.",
        },
        {
          evidence: "The inventory command fails.",
          meaning:
            "An inventory parser, plugin, credential, dependency, or source-access issue may exist.",
          action:
            "Read the exact error and test the inventory source using the same approved execution environment.",
        },
        {
          evidence: "The inventory contains the wrong environment.",
          meaning:
            "The pipeline may be using an incorrect variable, inventory file, or environment mapping.",
          action:
            "Stop the deployment and correct environment selection before any modifying task runs.",
        },
      ],

      safety:
        "Do not run the deployment until the target host list is confirmed to match the intended environment.",
    },

    {
      step: 3,
      title: "Validate the playbook before execution",

      objective:
        "Catch syntax, inventory, and variable issues before making changes.",

      commands: [
        "ansible-playbook -i inventory/production.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/production.ini site.yml --list-hosts",
        "ansible-playbook -i inventory/production.ini site.yml --list-tasks",
      ],

      interpret: [
        {
          evidence: "Syntax check fails.",
          meaning: "The playbook or one of its referenced files may contain invalid syntax.",
          action:
            "Fix the reported file and line, then rerun syntax validation.",
        },
        {
          evidence: "The host list is empty or unexpected.",
          meaning: "Inventory or host selection is incorrect.",
          action:
            "Correct the inventory, group, hosts pattern, or limit.",
        },
        {
          evidence: "Unexpected tasks appear in the task list.",
          meaning:
            "The wrong playbook, role, tags, or imported task file may be selected.",
          action:
            "Confirm the intended release entry point and task selection.",
        },
      ],

      note:
        "Replace site.yml and the inventory path with your repository's real paths. " +
        "A successful syntax check does not guarantee that every runtime dependency or target is correct.",
    },

    {
      step: 4,
      title: "Check controller-side Python",

      objective:
        "Identify whether the Ansible controller or execution environment has a Python dependency problem.",

      commands: [
        "python --version",
        "python3 --version",
        "python -m pip --version",
        "python -m pip check",
        "ansible --version",
      ],

      interpret: [
        {
          evidence: "The Python command is missing.",
          meaning: "The expected Python executable may not be installed or on PATH.",
          action:
            "Inspect the runner image and approved Python installation procedure.",
        },
        {
          evidence: "pip reports broken dependencies.",
          meaning: "Installed packages may have incompatible dependency requirements.",
          action:
            "Compare the lock file and installed packages with the last known-good execution environment.",
        },
        {
          evidence: "The shell Python and Ansible Python differ.",
          meaning:
            "Packages may have been installed into a different interpreter environment.",
          action:
            "Use the approved virtual environment or rebuild the pinned execution environment.",
        },
      ],

      warning:
        "Run these commands inside the same container or virtual environment that runs Ansible. " +
        "The output from a separate interactive shell may not represent the pipeline environment.",
    },

    {
      step: 5,
      title: "Check Python on the managed host",

      objective:
        "Determine whether the target host has a usable and compatible interpreter.",

      commands: [
        "ansible affected_hosts -i inventory/production.ini -m ansible.builtin.raw -a 'command -v python3 || command -v python'",
        "ansible affected_hosts -i inventory/production.ini -m ansible.builtin.raw -a 'python3 --version'",
      ],

      interpret: [
        {
          evidence: "No Python executable is found.",
          meaning:
            "The host may be a minimal image or may not have the expected interpreter installed.",
          action:
            "Use the organization's approved bootstrap process for that operating system.",
        },
        {
          evidence: "Python exists but is too old for the module or collection.",
          meaning:
            "The target runtime may be incompatible with the selected Ansible content.",
          action:
            "Check the compatibility matrix and select a supported runtime or compatible collection version.",
        },
        {
          evidence: "The command works on healthy hosts but not affected hosts.",
          meaning:
            "The issue may be limited to the affected image, PATH, permissions, or interpreter configuration.",
          action:
            "Compare the affected and healthy hosts before making changes.",
        },
      ],

      note:
        "The raw module can execute commands without the normal Python module transport on many Unix-like hosts. " +
        "It still requires working connectivity and a usable remote shell. Adapt the command for the target OS.",

      safety:
        "Keep the target pattern narrow. Do not use all hosts for an initial production investigation.",
    },

    {
      step: 6,
      title: "Inspect interpreter discovery and configuration",

      objective:
        "Verify which Python interpreter Ansible selects for the managed host.",

      commands: [
        "ansible affected_hosts -i inventory/production.ini -m ansible.builtin.setup -a 'filter=ansible_python*'",
        "ansible-config dump --only-changed",
        "ansible-inventory -i inventory/production.ini --host affected_host",
      ],

      interpret: [
        {
          evidence: "The selected interpreter points to a missing executable.",
          meaning:
            "A host variable or configuration may reference an invalid interpreter path.",
          action:
            "Correct the interpreter setting after verifying the real executable path.",
        },
        {
          evidence: "A group or host variable overrides the expected interpreter.",
          meaning:
            "Inventory variables may be selecting a different runtime.",
          action:
            "Review host_vars, group_vars, inventory plugin data, and command-line extra variables.",
        },
        {
          evidence: "Interpreter discovery fails only on new images.",
          meaning:
            "The image may have changed its installed Python path or package layout.",
          action:
            "Update the image configuration and test it in staging.",
        },
      ],

      exampleConfiguration: [
        "[linux_servers:vars]",
        "ansible_python_interpreter=/usr/bin/python3",
      ],

      configurationWarning:
        "The example path must exist and be supported on the target hosts. " +
        "Do not copy it blindly to hosts with a different operating system or Python layout.",
    },

    {
      step: 7,
      title: "Resolve missing Python modules and dependencies",

      objective:
        "Determine which package is missing, which interpreter needs it, and where it must be installed.",

      commands: [
        "python -m pip show PACKAGE_NAME",
        "python -m pip check",
        "python -c 'import PACKAGE_NAME; print(PACKAGE_NAME.__file__)'",
      ],

      interpret: [
        {
          evidence: "The import fails in the controller environment.",
          meaning: "The controller-side dependency is missing or installed in another environment.",
          action:
            "Install the approved pinned dependency in the execution environment that actually runs Ansible.",
        },
        {
          evidence: "The import succeeds locally but fails in CI.",
          meaning:
            "The runner image, virtual environment, dependency installation, or cache differs.",
          action:
            "Rebuild the runner using the repository's dependency lock and verify the same interpreter is used.",
        },
        {
          evidence: "A remote module reports a missing import.",
          meaning:
            "The dependency may be required on the managed host rather than on the controller.",
          action:
            "Check the module documentation and install the dependency in the correct host environment if required.",
        },
      ],

      important:
        "Replace PACKAGE_NAME with the real import or package name. " +
        "Python import names and package-manager names are not always identical.",

      prevention: [
        "Pin tested dependencies.",
        "Maintain a requirements file or approved execution-environment definition.",
        "Build immutable runner images.",
        "Test upgrades in staging before production.",
        "Avoid unpinned latest package installations in production pipelines.",
      ],
    },

    {
      step: 8,
      title: "Check SSH, privilege escalation, and permissions",

      objective:
        "Separate Python errors from connectivity and authorization failures.",

      commands: [
        "ansible affected_hosts -i inventory/production.ini -m ansible.builtin.ping -vv",
        "ansible affected_hosts -i inventory/production.ini -m ansible.builtin.command -a 'id'",
      ],

      interpret: [
        {
          evidence: "SSH authentication fails.",
          meaning: "The issue is connectivity or authentication, not necessarily Python.",
          action:
            "Verify the approved account, key access, SSH configuration, host reachability, and security controls.",
        },
        {
          evidence: "Ping succeeds but a privileged task fails.",
          meaning:
            "Privilege escalation, sudo policy, or target permissions may be incorrect.",
          action:
            "Review become configuration and approved privilege policy.",
        },
        {
          evidence: "Permission denied occurs for a file or directory.",
          meaning:
            "The remote account may not have the required access.",
          action:
            "Inspect ownership, permissions, and intended execution identity before changing them.",
        },
      ],

      note:
        "Ansible's ping module is not the same as ICMP ping. For typical POSIX targets, " +
        "the Ansible ping module verifies connectivity and Python-based module execution.",
    },

    {
      step: 9,
      title: "Inspect CI/CD differences",

      objective:
        "Find differences between a successful local run and a failed pipeline.",

      compare: [
        "Runner image and image digest.",
        "Working directory.",
        "Repository commit.",
        "Ansible version.",
        "Python version and executable path.",
        "Installed collections and roles.",
        "Dependency lock files.",
        "Inventory source and credentials.",
        "Environment variables and command-line options.",
        "Network access to package repositories.",
        "File permissions and case-sensitive paths.",
        "Cache contents and dependency installation order.",
      ],

      commands: [
        "ansible --version",
        "python --version",
        "git rev-parse HEAD",
        "git status --short",
      ],

      actions: [
        "Run diagnostics inside the same CI job or execution container.",
        "Compare with a known-good pipeline run.",
        "Rebuild from pinned dependencies if the runner environment is inconsistent.",
        "Do not print secret values while comparing environment configuration.",
        "Do not depend on packages installed manually on a long-lived runner.",
      ],
    },

    {
      step: 10,
      title: "Use a controlled validation run",

      objective:
        "Validate the intended hosts and tasks before attempting a production recovery.",

      commands: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/staging.ini site.yml --list-hosts",
        "ansible-playbook -i inventory/staging.ini site.yml --check --limit affected_hosts",
      ],

      safetyNotes: [
        "Replace example paths and host patterns with approved values.",
        "Check mode is not supported or fully predictive for every module.",
        "Check mode does not prove that external systems will accept the changes.",
        "Review the planned changes with the service owner.",
        "Use staging or a disposable host whenever possible.",
      ],
    },
  ],

  rootCauseIsolation: [
    {
      cause: "Wrong working directory",
      evidence:
        "Relative inventory or playbook paths fail, or a different repository file is loaded.",
      fix:
        "Set the pipeline working directory explicitly and use verified paths.",
      prevention:
        "Add a preflight step that prints the repository root and verifies required files.",
    },
    {
      cause: "Inventory returns zero hosts",
      evidence:
        "The inventory graph is empty or the selected play pattern matches no hosts.",
      fix:
        "Correct the inventory source, host pattern, group membership, or limit.",
      prevention:
        "Validate expected host count and environment selection before deployment.",
    },
    {
      cause: "Dynamic inventory failure",
      evidence:
        "The inventory plugin reports authentication, parsing, dependency, or API errors.",
      fix:
        "Repair the plugin configuration, approved credentials, dependency, or source permissions.",
      prevention:
        "Monitor inventory freshness and validate dynamic inventory in CI.",
    },
    {
      cause: "Python missing on a managed host",
      evidence:
        "A remote interpreter check shows that the expected executable is unavailable.",
      fix:
        "Use the approved OS-specific bootstrap process and configure the verified interpreter.",
      prevention:
        "Build and test machine images with required runtime prerequisites.",
    },
    {
      cause: "Wrong Python interpreter",
      evidence:
        "Ansible selects a nonexistent path or a path with incompatible dependencies.",
      fix:
        "Correct the host or group interpreter setting after verifying the actual executable.",
      prevention:
        "Test interpreter configuration on every supported image family.",
    },
    {
      cause: "Missing dependency",
      evidence:
        "An import fails in the exact runtime that executes the affected module.",
      fix:
        "Install the approved dependency into the correct controller or target environment.",
      prevention:
        "Pin dependencies and build reproducible execution environments.",
    },
    {
      cause: "Python or Ansible version incompatibility",
      evidence:
        "The installed version is outside the documented compatibility requirements.",
      fix:
        "Choose a tested compatible version combination and validate it in staging.",
      prevention:
        "Maintain a compatibility matrix and controlled upgrade process.",
    },
    {
      cause: "Privilege escalation or file permissions",
      evidence:
        "Connectivity works but privileged commands or file operations fail.",
      fix:
        "Correct the approved become configuration or intended file ownership and permissions.",
      prevention:
        "Test access policies and least-privilege permissions in CI.",
    },
    {
      cause: "Runner drift",
      evidence:
        "A previous runner succeeds while the current image or dependency set differs.",
      fix:
        "Restore the known-good execution environment or release a tested runner image.",
      prevention:
        "Use immutable runner images and pinned dependencies.",
    },
    {
      cause: "Partial deployment",
      evidence:
        "Some hosts report changed before another host fails.",
      fix:
        "Assess actual state and follow an approved forward-recovery or rollback plan.",
      prevention:
        "Use staged rollouts, health checks, and safe rerun design.",
    },
  ],

  recoveryPlan: {
    phase1: {
      title: "Contain",
      actions: [
        "Stop uncontrolled retries.",
        "Prevent concurrent deployments from changing the same targets.",
        "Confirm the affected host list and environment.",
        "Preserve logs and identify completed changes.",
      ],
    },

    phase2: {
      title: "Correct the confirmed cause",
      actions: [
        "Fix the verified inventory, path, interpreter, dependency, or permission issue.",
        "Keep the change narrow and reviewable.",
        "Avoid unrelated upgrades or cleanup during incident recovery.",
        "Validate configuration and syntax before deployment.",
      ],
    },

    phase3: {
      title: "Validate",
      actions: [
        "Run diagnostics against a limited test target.",
        "Verify interpreter discovery and required imports.",
        "Validate the inventory host count.",
        "Run the playbook in staging or an approved check-mode workflow.",
        "Confirm expected changes with the service owner.",
      ],
    },

    phase4: {
      title: "Recover",
      actions: [
        "Obtain required production approval.",
        "Rerun against the explicitly confirmed host pattern.",
        "Use staged batches where appropriate.",
        "Monitor the first hosts before continuing.",
        "Inspect the complete play recap.",
        "Validate application endpoints, services, logs, and health checks.",
      ],
    },

    phase5: {
      title: "Rollback or forward recovery",
      actions: [
        "Determine whether the failed run changed production state.",
        "Use the application's documented rollback or forward-recovery procedure.",
        "Restore configuration from a known-good version if approved and appropriate.",
        "Do not assume that rerunning the playbook reverses prior changes.",
        "Confirm service health after the recovery.",
        "Record the recovery decision and evidence.",
      ],
    },
  },

  productionRunbook: [
    {
      stage: "Detect",
      tasks: [
        "Identify the failed pipeline and release.",
        "Find the first failing task and affected hosts.",
        "Record the incident start time.",
      ],
    },
    {
      stage: "Triage",
      tasks: [
        "Determine severity and business impact.",
        "Check whether deployment changes were partially applied.",
        "Confirm the environment and expected host count.",
      ],
    },
    {
      stage: "Diagnose",
      tasks: [
        "Check repository and working directory.",
        "Inspect Ansible version and active configuration.",
        "Inspect inventory and host selection.",
        "Check controller and managed-host Python separately.",
        "Check dependencies, permissions, and recent changes.",
      ],
    },
    {
      stage: "Fix",
      tasks: [
        "Document the evidence-supported root cause.",
        "Prepare the smallest safe correction.",
        "Review the correction with the responsible engineer.",
        "Validate it in staging or a limited test environment.",
      ],
    },
    {
      stage: "Recover",
      tasks: [
        "Obtain production approval.",
        "Rerun with explicit inventory and target limits.",
        "Monitor task results and application health.",
        "Assess rollback if the recovery does not meet success criteria.",
      ],
    },
    {
      stage: "Close",
      tasks: [
        "Confirm service health and deployment completion.",
        "Save sanitized logs and final evidence.",
        "Write the incident timeline and root-cause summary.",
        "Create preventive engineering tasks with owners and due dates.",
      ],
    },
  ],

  prevention: {
    ciChecks: [
      "Run Ansible syntax checks on every relevant change.",
      "Validate inventory sources and expected host counts.",
      "Run linting using the team's approved Ansible lint configuration.",
      "Pin Ansible, Python, collections, roles, and required dependencies.",
      "Build immutable execution environments.",
      "Test supported Python and operating system combinations.",
      "Validate that required inventory and playbook paths exist.",
      "Fail the pipeline when a production inventory unexpectedly resolves to zero hosts.",
      "Require approval for production deployment jobs.",
      "Keep staging and production inventory selection explicit.",
      "Add integration tests for critical roles and modules.",
      "Use controlled rollout batches and post-deployment health checks.",
    ],

    monitoring: [
      "Alert on repeated deployment failures.",
      "Track failure rate by environment and target group.",
      "Track inventory host count changes.",
      "Monitor runner image and dependency changes.",
      "Record play recap statistics for every deployment.",
      "Alert when deployment completion or health checks exceed expected time.",
    ],

    engineeringPractices: [
      "Keep a known-good runner image available.",
      "Maintain a tested dependency lock file.",
      "Document interpreter paths for each supported operating system.",
      "Review Python and Ansible upgrades before rollout.",
      "Use least-privilege accounts.",
      "Keep credentials in an approved secret manager.",
      "Use idempotent tasks wherever possible.",
      "Maintain a rollback or forward-recovery runbook.",
      "Review incidents and turn repeated failures into automated checks.",
    ],
  },

  incidentReportTemplate: {
    title: "Ansible Python or Inventory Failure",

    fields: [
      "Incident ID",
      "Incident owner",
      "Start time and recovery time",
      "Affected application and environment",
      "Severity and business impact",
      "Pipeline URL or job identifier",
      "Repository, branch, and commit",
      "Ansible version and execution environment",
      "Inventory source and expected host count",
      "First failing task",
      "Evidence collected",
      "Root cause and supporting evidence",
      "Immediate mitigation",
      "Recovery steps",
      "Rollback decision and reason",
      "Validation and service-health results",
      "Preventive actions",
      "Action owners and due dates",
    ],
  },

  interviewQuestions: [
    {
      question: "Why can SSH succeed while Ansible module execution fails?",
      answer:
        "SSH proves that a connection and authentication path work. Many Ansible modules " +
        "also require a compatible Python interpreter and dependencies on the managed host.",
    },
    {
      question: "How do you troubleshoot a playbook that targets zero hosts?",
      answer:
        "Inspect the exact inventory source, inventory graph, play hosts pattern, group membership, " +
        "--limit arguments, and dynamic inventory output. Do not run production changes until the target list is verified.",
    },
    {
      question: "How do you distinguish controller Python from managed-host Python?",
      answer:
        "Check ansible --version and the controller execution environment, then inspect interpreter " +
        "discovery and Python availability on the managed host separately.",
    },
    {
      question: "Why might a Python package be installed but still not import?",
      answer:
        "It may have been installed for a different Python executable, virtual environment, operating-system user, " +
        "or machine. Verify the interpreter that performs the import.",
    },
    {
      question: "What should you do if a production playbook fails after changing some hosts?",
      answer:
        "Stop uncontrolled retries, determine which changes completed, assess service health, and use an approved " +
        "forward-recovery or rollback procedure. Do not assume a rerun reverses changes.",
    },
    {
      question: "How do you troubleshoot a CI-only Ansible failure?",
      answer:
        "Compare the runner image, working directory, commit, Python and Ansible versions, dependencies, inventory, " +
        "credentials, and environment variables with a known-good run.",
    },
    {
      question: "When would you use the Ansible raw module?",
      answer:
        "It can help bootstrap or diagnose hosts where the normal Python-based module transport is unavailable, " +
        "provided connectivity and a usable remote shell exist.",
    },
    {
      question: "Does Ansible check mode guarantee that production is safe?",
      answer:
        "No. Module support varies, external effects may not be fully predicted, and check mode cannot replace " +
        "change review, staging validation, and an approved recovery plan.",
    },
    {
      question: "How do you prevent dependency drift?",
      answer:
        "Pin dependencies, maintain lock files, build immutable execution environments, and test upgrades before production.",
    },
    {
      question: "What evidence should be included in an incident report?",
      answer:
        "Include timestamps, affected hosts, pipeline and commit identifiers, the first failure, sanitized logs, " +
        "root cause, recovery actions, validation results, and assigned preventive actions.",
    },
  ],

  references: [
    {
      title: "Ansible Documentation",
      url: "https://docs.ansible.com/",
    },
    {
      title: "Ansible Interpreter Discovery",
      url: "https://docs.ansible.com/ansible/latest/reference_appendices/interpreter_discovery.html",
    },
    {
      title: "Ansible Inventory Guide",
      url: "https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html",
    },
    {
      title: "Ansible Playbook Guide",
      url: "https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_intro.html",
    },
  ],
};

export default pythonError;