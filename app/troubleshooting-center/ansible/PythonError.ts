
export interface PythonDiagnostic {
  step: number;
  title: string;
  purpose: string;
  commands: string[];
  expectedOutput: string;
  interpretation: string[];
  nextAction: string;
}

export interface PythonRootCause {
  cause: string;
  symptoms: string[];
  evidence: string[];
  fix: string[];
  verification: string[];
}

export const pythonErrorGuide = {
  title: "Ansible Python Errors",
  slug: "python-error",
  category: "Ansible",
  difficulty: "Intermediate to Advanced",
  severity: "High",
  estimatedTime: "45–75 minutes",

  summary:
    "Troubleshoot Python interpreter failures affecting Ansible control nodes, managed Linux servers, CI/CD agents and automation modules. Diagnose missing interpreters, unsupported Python versions, virtual environment conflicts, missing libraries, interpreter discovery issues, privilege escalation differences and partial production deployments.",

  learningObjectives: [
    "Distinguish control-node Python failures from managed-host Python failures.",
    "Identify the interpreter Ansible actually uses.",
    "Diagnose missing Python, incompatible versions and broken executable paths.",
    "Understand Python virtual environments and CI agent differences.",
    "Investigate missing Python libraries and module dependency failures.",
    "Troubleshoot interpreter selection under become and sudo.",
    "Recover safely when a deployment fails after some hosts have changed.",
    "Add interpreter and dependency checks to CI/CD pipelines.",
  ],

  incidentScenario: {
    title: "Production deployment fails after the automation image changes",

    timeline: [
      {
        time: "09:00",
        event:
          "The CI platform updates or replaces a deployment runner image.",
      },
      {
        time: "09:05",
        event:
          "The application build and artifact publication complete successfully.",
      },
      {
        time: "09:07",
        event:
          "Ansible begins deployment but reports a Python interpreter error on some managed hosts.",
      },
      {
        time: "09:08",
        event:
          "Some tasks fail with interpreter discovery, module execution or missing-library errors.",
      },
      {
        time: "09:10",
        event:
          "The deployment stops. The engineer determines which hosts changed and whether the application remains healthy before retrying.",
      },
    ],

    symptoms: [
      "Ansible reports that Python could not be found on a managed host.",
      "A module fails because its remote Python interpreter cannot execute it.",
      "A task works locally but fails inside the CI/CD runner.",
      "Only older operating-system hosts fail while newer hosts succeed.",
      "A Python package is installed but Ansible still reports that it is missing.",
      "The playbook works as the SSH user but fails after privilege escalation.",
      "The pipeline exits with a non-zero status after updating some hosts.",
    ],

    firstPrinciple:
      "Do not reinstall Python across the fleet immediately. First establish whether the failure is on the control node, managed host, interpreter path, Python dependency or execution identity.",

    initialQuestions: [
      "Is the error printed before Ansible connects or after it reaches a managed host?",
      "Which host, task and module produced the first meaningful failure?",
      "Did the CI runner image or Python environment change recently?",
      "Which Python executable is Ansible selecting?",
      "Does that executable exist for the remote execution user?",
      "Does the module require a library unavailable to that interpreter?",
      "Did any hosts change before the deployment failed?",
    ],
  },

  impactAndSeverity: {
    title: "Assess impact and severity",

    checks: [
      {
        question: "Which environment is affected?",
        action:
          "Identify the inventory, environment, pipeline run, commit and intended target hosts.",
      },
      {
        question: "Is the failure limited to one host?",
        action:
          "Compare interpreter paths, operating-system versions and Ansible results across healthy and failing hosts.",
      },
      {
        question: "Did deployment make changes?",
        action:
          "Inspect the per-host task results and recap. A Python failure on a later task does not mean earlier changes were rolled back.",
      },
      {
        question: "Is the application healthy?",
        action:
          "Check the application version, service state, health endpoints, load balancer status and recent error rates.",
      },
      {
        question: "Did the automation runtime change?",
        action:
          "Compare the current runner image, Python version, dependency lock file and previous successful pipeline.",
      },
    ],

    severityGuide: [
      {
        severity: "Critical",
        condition:
          "A production incident is active, service health is degraded, or the failed rollout leaves incompatible application versions across servers.",
        response:
          "Stop rollout expansion, notify the incident owner and follow the approved service recovery procedure.",
      },
      {
        severity: "High",
        condition:
          "A production deployment is blocked or partially applied because Ansible cannot execute required modules.",
        response:
          "Pause retries, identify changed hosts and validate the interpreter issue using an approved diagnostic path.",
      },
      {
        severity: "Medium",
        condition:
          "A staging or test deployment is blocked but production remains healthy.",
        response:
          "Reproduce the failure in the affected environment and correct the runtime or dependency configuration.",
      },
      {
        severity: "Low",
        condition:
          "A development environment has a reproducible interpreter configuration problem.",
        response:
          "Fix the configuration and add automated validation before promoting it.",
      },
    ],
  },

  safetyChecks: {
    title: "Production safety checks",

    rules: [
      "Confirm the correct repository, branch, commit, pipeline run and inventory.",
      "Verify the approved production change or deployment ticket before changing managed hosts.",
      "Do not upgrade or replace Python on production servers merely to remove an error message.",
      "Do not replace the operating system's system Python without understanding package-manager and operating-system dependencies.",
      "Do not install arbitrary Python packages globally on a managed server as an initial troubleshooting step.",
      "Never print credentials, private keys, secret variables or sensitive environment values into pipeline logs.",
      "Use read-only checks first and the least-privileged approved account.",
      "Before recovery, establish whether previous tasks changed files, services or application versions.",
    ],

    evidenceToPreserve: [
      "Pipeline run ID, failure timestamp and commit SHA.",
      "The complete relevant error, including the first traceback or interpreter discovery warning.",
      "Control-node and managed-host Python versions.",
      "Ansible version and active configuration file.",
      "Resolved inventory and host list.",
      "The selected remote interpreter path.",
      "The first failed task and per-host recap.",
      "Current application version and health on affected hosts.",
    ],
  },

  diagnostics: [
    {
      step: 1,
      title: "Identify where Python is failing",
      purpose:
        "Separate a controller-side Python problem from a managed-host interpreter problem.",

      commands: [
        "pwd",
        "ansible --version",
        "ansible-playbook --version",
        "python3 --version",
        "python --version",
      ],

      expectedOutput:
        "The output shows the current execution directory, Ansible runtime details and any available local Python commands.",

      interpretation: [
        "If Ansible itself cannot start, investigate the control node or CI runner before troubleshooting remote Python.",
        "If Ansible starts but a remote task fails, inspect the host-specific error and interpreter selection.",
        "The command python may be absent even when python3 exists; this alone does not prove that the Ansible runtime is broken.",
        "The Python version printed by the shell is not necessarily the version used by Ansible or a particular virtual environment.",
      ],

      nextAction:
        "Record the controller's Ansible version and Python runtime, then identify the first managed host that reports an error.",
    },

    {
      step: 2,
      title: "Confirm the inventory and target hosts",
      purpose:
        "Ensure the investigation is using the intended environment rather than an empty or incorrect inventory.",

      commands: [
        "ansible-inventory -i inventory/staging.ini --graph",
        "ansible-playbook -i inventory/staging.ini site.yml --list-hosts",
      ],

      expectedOutput:
        "The inventory graph and host listing show the expected staging group and target hosts.",

      interpretation: [
        "If the host list is empty, investigate inventory selection or the play's hosts pattern before debugging Python.",
        "If the expected hosts are present but only some fail, compare their operating systems, Python paths and recent changes.",
        "Dynamic inventory failures can make the target list incomplete even if the playbook itself is valid.",
      ],

      nextAction:
        "Confirm the resolved target list with the approved deployment scope before running further checks.",
    },

    {
      step: 3,
      title: "Test Ansible connectivity",
      purpose:
        "Check whether Ansible can execute a basic module on the target host.",

      commands: [
        "ansible -i inventory/staging.ini app_servers -m ansible.builtin.ping",
        "ansible -i inventory/staging.ini app_servers -m ansible.builtin.ping -vv",
      ],

      expectedOutput:
        "A working Linux target commonly returns SUCCESS with pong. A failure may show SSH connectivity, authentication, interpreter or module execution errors.",

      interpretation: [
        "The Ansible ping module is not an ICMP ping; it exercises Ansible's remote execution path.",
        "If the host is UNREACHABLE, investigate SSH, DNS, routing and credentials first.",
        "If SSH succeeds but module execution fails because Python is unavailable, inspect the remote interpreter.",
        "Verbose logs can reveal sensitive paths or operational details, so keep them access-controlled.",
      ],

      nextAction:
        "Classify the result as connection failure, interpreter failure or module-specific failure before changing anything.",
    },

    {
      step: 4,
      title: "Inspect Python on the managed host",
      purpose:
        "Find which Python executables exist and whether the selected executable can run.",

      commands: [
        "ansible -i inventory/staging.ini app_servers -m ansible.builtin.raw -a 'command -v python3 || command -v python || true'",
        "ansible -i inventory/staging.ini app_servers -m ansible.builtin.raw -a 'python3 --version'",
      ],

      expectedOutput:
        "The first command may show a path such as /usr/bin/python3. The second prints a version if that command exists and can execute.",

      interpretation: [
        "The raw module does not require the usual remote Python module execution path, making it useful for bootstrap diagnostics.",
        "If the first command prints no interpreter path, Python may be absent or unavailable in that user's PATH.",
        "If python3 exists but the configured interpreter points somewhere else, investigate interpreter selection.",
        "The second command can fail on systems where python3 is not installed; that failure is evidence, not a reason to run an uncontrolled installation.",
      ],

      nextAction:
        "Confirm the supported Python package and interpreter path for the target operating system before selecting a bootstrap or remediation procedure.",
    },

    {
      step: 5,
      title: "Check interpreter discovery and configuration",
      purpose:
        "Determine whether Ansible is selecting an unexpected remote interpreter.",

      commands: [
        "ansible-config dump --only-changed",
        "grep -RInE 'ansible_python_interpreter|interpreter_python' inventory/ group_vars/ host_vars/ ansible.cfg",
      ],

      expectedOutput:
        "The output identifies non-default Ansible configuration and any explicit interpreter settings found in the searched paths.",

      interpretation: [
        "Ansible may discover a remote interpreter automatically, depending on version, configuration and target operating system.",
        "An explicit ansible_python_interpreter setting overrides automatic discovery for the relevant host or group.",
        "A hard-coded path may be correct on one distribution but absent on another.",
        "The grep command is a search aid. It may report missing directories or miss settings stored in a different repository location.",
        "Ansible's configuration source and inventory variable precedence must be considered when multiple settings exist.",
      ],

      nextAction:
        "Compare the effective host configuration with the interpreter path that actually exists on the target.",
    },

    {
      step: 6,
      title: "Inspect the selected interpreter directly",
      purpose:
        "Check whether the configured executable exists and can start.",

      commands: [
        "ansible -i inventory/staging.ini app_servers -m ansible.builtin.raw -a 'test -x /usr/bin/python3 && /usr/bin/python3 --version'",
      ],

      expectedOutput:
        "A working executable returns a Python version. A missing or non-executable path causes the command to fail.",

      interpretation: [
        "Replace /usr/bin/python3 with the interpreter path reported by the error or configured for the target.",
        "A successful version check confirms that the executable starts; it does not prove that every required Python library is installed.",
        "If the file exists but cannot execute, inspect permissions, architecture compatibility, broken symlinks and operating-system restrictions.",
        "If the interpreter path is incorrect, fix the host or group variable rather than installing another Python version unnecessarily.",
      ],

      nextAction:
        "Use the validated interpreter path in the correct inventory scope and test it against a non-production host first.",
    },

    {
      step: 7,
      title: "Check Python compatibility and module dependencies",
      purpose:
        "Determine whether the Python version or required libraries are incompatible with the installed Ansible collection or module.",

      commands: [
        "ansible-galaxy collection list",
        "python3 -m pip --version",
        "python3 -m pip check",
      ],

      expectedOutput:
        "The commands show installed Ansible collections, pip availability for the selected local Python and dependency conflicts in that Python environment.",

      interpretation: [
        "The local pip commands inspect the controller environment, not the managed server's Python environment.",
        "A module may require a supported remote Python version or a remote library that is missing.",
        "A successful pip check does not prove that every Ansible collection or remote module dependency is valid.",
        "Do not install a package into an arbitrary global environment to see whether the error disappears.",
      ],

      nextAction:
        "Identify the exact module and the environment where its dependency is required. Consult the collection and module requirements for the installed versions.",
    },

    {
      step: 8,
      title: "Investigate virtual environment and CI runner differences",
      purpose:
        "Detect cases where a shell, local machine and pipeline are using different Python environments.",

      commands: [
        "which ansible",
        "which python3",
        "python3 -c 'import sys; print(sys.executable)'",
        "python3 -m pip show ansible-core",
      ],

      expectedOutput:
        "The output reveals executable paths and package information for the Python selected by the current shell.",

      interpretation: [
        "If ansible and python3 come from different environments, verify which environment installed the executable and its dependencies.",
        "A virtual environment can contain a different Python package set from the operating system's Python.",
        "CI jobs may use a different PATH or runner image from an interactive SSH session.",
        "These commands only inspect the current controller environment; they do not identify the remote interpreter by themselves.",
      ],

      nextAction:
        "Pin the runner image and dependency versions, activate the intended environment explicitly and compare with the last successful pipeline.",
    },

    {
      step: 9,
      title: "Check privilege escalation effects",
      purpose:
        "Investigate cases where a task fails after switching to another user.",

      commands: [
        "ansible -i inventory/staging.ini app_servers -m ansible.builtin.raw -a 'id'",
        "ansible -i inventory/staging.ini app_servers -m ansible.builtin.raw -a 'command -v python3'",
      ],

      expectedOutput:
        "The commands show the effective remote identity and the Python path visible to that execution context.",

      interpretation: [
        "The SSH user and become user can have different PATH values and filesystem permissions.",
        "An interpreter may be available to one user but inaccessible to another.",
        "Privilege escalation can also fail independently because of sudo configuration or authorization.",
        "Do not expose credentials or enable unsafe password logging while testing become.",
      ],

      nextAction:
        "Verify the approved become settings and interpreter accessibility under the intended execution identity.",
    },

    {
      step: 10,
      title: "Inspect the failed task and partial changes",
      purpose:
        "Find out whether the Python failure happened before changes or during a partially completed deployment.",

      commands: [
        "ansible-playbook -i inventory/staging.ini site.yml --list-tasks",
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/staging.ini site.yml --check --diff --limit app-canary-01",
      ],

      expectedOutput:
        "The first commands list tasks and validate syntax. Check mode may predict supported task changes for the selected canary.",

      interpretation: [
        "The syntax check does not prove remote Python compatibility.",
        "Check mode has limitations and is not a guaranteed simulation of all side effects.",
        "Diff output can expose sensitive values; restrict access and redact logs.",
        "Review the original failed run's recap to establish which hosts changed before the error.",
      ],

      nextAction:
        "Determine whether a controlled retry, forward fix or approved rollback is safest for the actual production state.",
    },
  ] satisfies PythonDiagnostic[],

  rootCauses: [
    {
      cause: "Python is missing on a managed host",

      symptoms: [
        "Ansible reports that Python cannot be found.",
        "The remote module fails before its task logic executes.",
      ],

      evidence: [
        "The raw-module interpreter lookup returns no usable Python path.",
        "The operating system package inventory confirms the required interpreter is absent.",
      ],

      fix: [
        "Confirm the supported Python package for the operating system.",
        "Use the organization's approved bootstrap process or an authorized package-management task.",
        "If bootstrapping with raw commands is necessary, keep it narrow, reviewed and distribution-specific.",
        "Do not modify system Python blindly on production hosts.",
      ],

      verification: [
        "Confirm the interpreter executable exists and starts.",
        "Run an authorized Ansible connectivity test.",
        "Validate the intended playbook on a canary host before expanding.",
      ],
    },

    {
      cause: "Ansible selected the wrong interpreter",

      symptoms: [
        "The error references a nonexistent Python path.",
        "Some operating-system groups work while another group fails.",
      ],

      evidence: [
        "The configured ansible_python_interpreter differs from the path available on the host.",
        "A raw command confirms that the configured path is absent or not executable.",
      ],

      fix: [
        "Correct the interpreter setting at the appropriate host or group scope.",
        "Avoid one hard-coded path for heterogeneous operating systems unless it is guaranteed to exist.",
        "Use automatic discovery when appropriate, or explicitly configure a validated interpreter.",
      ],

      verification: [
        "Inspect the effective inventory variables.",
        "Test the interpreter and Ansible ping on representative hosts.",
      ],
    },

    {
      cause: "Unsupported Python or Ansible compatibility",

      symptoms: [
        "Ansible or a collection fails with compatibility or syntax errors.",
        "The issue began after a Python, Ansible or collection upgrade.",
      ],

      evidence: [
        "The runtime versions differ from the last successful pipeline.",
        "The installed Ansible core or collection has requirements incompatible with the selected runtime.",
      ],

      fix: [
        "Compare the installed versions with the supported compatibility matrix for the actual release.",
        "Pin a supported Python and Ansible combination.",
        "Test upgrades in CI and staging before production rollout.",
      ],

      verification: [
        "Run the approved test suite in the pinned environment.",
        "Validate both controller startup and remote module execution.",
      ],
    },

    {
      cause: "Python package installed in the wrong environment",

      symptoms: [
        "A package appears installed, but the Ansible task still reports that it is missing.",
        "The interactive shell works while the pipeline fails.",
      ],

      evidence: [
        "The pip executable and Python executable belong to different environments.",
        "The CI runner uses a different virtual environment or PATH.",
      ],

      fix: [
        "Use python -m pip with the intended Python executable.",
        "Use a pinned virtual environment or immutable runner image.",
        "Keep controller dependencies separate from managed-host dependencies.",
      ],

      verification: [
        "Confirm sys.executable and package information in the actual pipeline environment.",
        "Re-run CI validation with the same runtime used for deployment.",
      ],
    },

    {
      cause: "Required library missing on the managed host",

      symptoms: [
        "A specific module reports ImportError or ModuleNotFoundError.",
        "Basic connectivity works but one module fails.",
      ],

      evidence: [
        "The traceback names a missing library.",
        "The module documentation identifies the dependency and where it must be installed.",
      ],

      fix: [
        "Identify whether the dependency is needed on the controller or managed host.",
        "Install the supported package using the approved package manager or dependency-management process.",
        "Avoid unreviewed global pip installations on production systems.",
      ],

      verification: [
        "Confirm the dependency is available to the exact Python interpreter used by the failing module.",
        "Test the specific task in staging or on a canary host.",
      ],
    },

    {
      cause: "Python is unavailable under the become execution context",

      symptoms: [
        "A task works without become but fails when privilege escalation is enabled.",
        "The error points to a different interpreter path or permission issue.",
      ],

      evidence: [
        "The execution identity or PATH differs after escalation.",
        "The selected interpreter is inaccessible or incorrectly configured for the task context.",
      ],

      fix: [
        "Correct the authorized become configuration and interpreter path.",
        "Check filesystem permissions and remote execution policy.",
        "Preserve least privilege rather than granting unrestricted sudo as a workaround.",
      ],

      verification: [
        "Test the relevant operation using the approved execution identity.",
        "Confirm the playbook succeeds on a canary host.",
      ],
    },

    {
      cause: "CI runner image or dependency drift",

      symptoms: [
        "A previously successful pipeline begins failing without an obvious playbook change.",
        "Local runs succeed but CI fails.",
      ],

      evidence: [
        "The runner image, PATH, Python version or package versions changed.",
        "The pipeline dependency installation is unpinned or non-reproducible.",
      ],

      fix: [
        "Pin the runner image and Python dependencies.",
        "Use a lock file or approved constraints file where appropriate.",
        "Review runner-image changes and test them before production deployment.",
      ],

      verification: [
        "Compare the new pipeline with the last successful run.",
        "Re-run the deployment checks in a clean, reproducible runner.",
      ],
    },
  ] satisfies PythonRootCause[],

  recoveryWorkflow: {
    title: "Controlled production recovery",

    steps: [
      {
        step: 1,
        name: "Pause rollout expansion",
        details:
          "Stop automatic retries and further rollout stages while the affected host state is unknown.",
      },
      {
        step: 2,
        name: "Preserve evidence",
        details:
          "Save the relevant error, pipeline run, commit, interpreter path, Ansible version and host-level recap without exposing secrets.",
      },
      {
        step: 3,
        name: "Establish actual application state",
        details:
          "Identify changed hosts, current artifact versions, service health and any configuration changes completed before the failure.",
      },
      {
        step: 4,
        name: "Correct the proven Python problem",
        details:
          "Fix the missing interpreter, incorrect path, unsupported runtime, missing dependency or CI environment mismatch supported by evidence.",
      },
      {
        step: 5,
        name: "Validate safely",
        details:
          "Run syntax and inventory checks, then validate connectivity and the affected task on staging or a canary host.",
      },
      {
        step: 6,
        name: "Choose the recovery action",
        details:
          "Resume with a controlled retry or forward fix when safe. Use rollback only when needed and supported by the approved recovery plan.",
      },
      {
        step: 7,
        name: "Verify application health",
        details:
          "Confirm the intended version on each affected host, service health, load balancer status and error rates.",
      },
      {
        step: 8,
        name: "Document and prevent recurrence",
        details:
          "Record the root cause, recovery evidence, runtime versions and preventive CI/CD changes.",
      },
    ],

    rollbackGuidance: [
      "A Python interpreter error does not itself prove that application rollback is necessary.",
      "If the application remains healthy and no incompatible changes occurred, fixing the automation runtime may be sufficient.",
      "If a partial deployment caused user impact, coordinate the recovery decision with the incident owner.",
      "Check database migrations, persistent state and artifact availability before reverting application code.",
      "Do not assume rerunning a playbook or installing Python reverses previously completed changes.",
    ],
  },

  productionExamples: [
    {
      title: "Example A: interpreter path is wrong",

      configuration: `# Example inventory setting
[legacy_servers:vars]
ansible_python_interpreter=/usr/bin/python`,

      problem:
        "The target has /usr/bin/python3 but does not have /usr/bin/python.",

      investigation: [
        "Use the raw module to locate available Python executables.",
        "Inspect the effective inventory variable for the affected host.",
        "Compare the path with the operating system's supported Python installation.",
      ],

      resolution:
        "Update the interpreter setting to the verified path or use appropriate automatic discovery, then test the affected play on a canary.",

      lesson:
        "A path copied from another operating system is not automatically valid across every host group.",
    },

    {
      title: "Example B: controller dependency is missing",

      configuration: `python3 -c 'import sys; print(sys.executable)'
python3 -m pip show ansible-core`,

      problem:
        "The pipeline cannot start a required automation component after a runner image update.",

      investigation: [
        "Check whether Ansible is installed in the expected environment.",
        "Inspect the active Python executable and dependency installation logs.",
        "Compare the current runner image with the previous successful build.",
      ],

      resolution:
        "Restore the supported, pinned controller environment and validate it in CI before enabling deployment.",

      lesson:
        "Installing a remote server package will not repair a controller-side Python environment failure.",
    },

    {
      title: "Example C: partial rollout after a Python failure",

      configuration:
        "The first two application hosts updated successfully, but the third host failed during module execution.",

      problem:
        "The pipeline is marked failed while different hosts may now run different versions.",

      investigation: [
        "Inspect the recap for each host.",
        "Check the actual application version and health on all rollout targets.",
        "Identify whether the failure affects all hosts with the same operating system or interpreter configuration.",
      ],

      resolution:
        "Pause expansion, correct the common interpreter issue, validate the fix on a canary, then follow the approved forward-recovery or rollback plan.",

      lesson:
        "A red pipeline is an execution result, not a complete description of production state.",
    },
  ],

  prevention: {
    title: "Prevent Python errors in future deployments",

    ciChecks: [
      {
        check: "Pin the controller runtime",
        action:
          "Use a maintained runner image and a supported, tested Python and Ansible combination.",
      },
      {
        check: "Validate dependencies",
        action:
          "Install controller packages reproducibly and run dependency checks in CI.",
      },
      {
        check: "Validate inventory",
        action:
          "Confirm the expected hosts and environment groups resolve before deployment.",
      },
      {
        check: "Validate interpreters",
        action:
          "Test representative managed-host operating systems and verify their selected Python executable.",
      },
      {
        check: "Test Ansible connectivity",
        action:
          "Run authorized connectivity checks before starting a production rollout.",
      },
      {
        check: "Use canaries",
        action:
          "Deploy to a small approved target group, verify service health and expand in controlled batches.",
      },
      {
        check: "Protect secrets",
        action:
          "Redact credentials and sensitive data from verbose output, pipeline artifacts and diagnostic reports.",
      },
      {
        check: "Maintain rollback readiness",
        action:
          "Document the application recovery strategy and verify that required artifacts remain available.",
      },
    ],

    monitoring: [
      "Alert on repeated Ansible interpreter and module failures.",
      "Record the runner image, Ansible version and Python version for each deployment.",
      "Track deployment failures by operating-system group and target host.",
      "Alert when the resolved host count is zero or unexpectedly changes.",
      "Monitor application health and version consistency after deployment.",
      "Preserve access-controlled logs and the relevant pipeline metadata for incident analysis.",
    ],

    commonMistakes: [
      "Confusing the control-node Python version with the managed-host Python version.",
      "Assuming the local shell uses the same virtual environment as CI.",
      "Changing every host's interpreter path before identifying the failing host.",
      "Upgrading system Python without checking operating-system compatibility.",
      "Installing packages globally to hide a dependency-management problem.",
      "Treating ansible.builtin.ping as an ICMP network ping.",
      "Assuming --syntax-check verifies Python dependencies or connectivity.",
      "Ignoring changed hosts after a failed deployment.",
      "Retrying the full production playbook before checking the current application state.",
      "Printing secrets while using verbose diagnostics.",
    ],
  },

  incidentReportTemplate: {
    title: "Post-incident report",

    fields: [
      "Incident ID and severity",
      "Affected environment and services",
      "Pipeline run ID, commit SHA and artifact version",
      "Detection time, failure time and recovery time",
      "Controller Python and Ansible versions",
      "Managed-host operating systems and interpreter paths",
      "First meaningful error and supporting evidence",
      "Affected, changed, failed and unreachable hosts",
      "User impact and duration",
      "Root cause and contributing factors",
      "Recovery action and application health verification",
      "Preventive action, owner and target date",
    ],
  },

  interviewQuestions: [
    {
      question: "Why does Ansible need Python?",
      answer:
        "Many Ansible modules execute Python code on managed hosts. Some operations and the raw module can work without the usual remote Python module path, but requirements depend on the module and connection type.",
    },
    {
      question: "What is the difference between controller Python and remote Python?",
      answer:
        "Controller Python runs the Ansible automation environment. Remote Python executes supported modules on managed hosts. A problem in one environment is not automatically fixed by changing the other.",
    },
    {
      question: "How do you troubleshoot a missing remote Python interpreter?",
      answer:
        "Inspect the host-specific error, use the raw module for a narrow interpreter lookup where supported, check interpreter variables and verify the operating-system package state before applying an approved fix.",
    },
    {
      question: "What does ansible_python_interpreter do?",
      answer:
        "It specifies the Python executable Ansible should use for a managed host. An incorrect explicit path can prevent module execution.",
    },
    {
      question: "What is the Ansible raw module useful for?",
      answer:
        "It runs a raw command over the supported connection without requiring the normal remote Python module execution path, making it useful for limited bootstrap and diagnostic tasks.",
    },
    {
      question: "Why can a task work locally but fail in CI?",
      answer:
        "CI may use a different runner image, Python executable, virtual environment, PATH, dependency versions or environment variables.",
    },
    {
      question: "How do you investigate ModuleNotFoundError?",
      answer:
        "Read the traceback and determine whether the missing library is required on the controller or managed host. Identify the exact interpreter and install the dependency through the approved environment-management process.",
    },
    {
      question: "Why is changing system Python risky?",
      answer:
        "Operating-system tools and packages can depend on the distribution's Python runtime. Replacing it without compatibility checks can break system management and automation.",
    },
    {
      question: "How do you handle a partial deployment?",
      answer:
        "Pause rollout expansion, inspect per-host task results, verify application versions and health, fix the proven cause and resume with a controlled recovery or approved rollback.",
    },
    {
      question: "How do you prove the issue is resolved?",
      answer:
        "Verify the selected interpreter, run the relevant Ansible checks, confirm successful task execution and ensure the intended application version is healthy on every required host.",
    },
  ],

  runbookChecklist: [
    "Identify the failed pipeline and exact command.",
    "Confirm repository, commit, environment and target inventory.",
    "Determine whether the error is on the controller or a managed host.",
    "Record Ansible and Python versions without exposing secrets.",
    "Check the inventory graph and resolved host list.",
    "Test Ansible connectivity on an authorized target.",
    "Inspect the available remote Python executable using a safe diagnostic.",
    "Review interpreter configuration and variable precedence.",
    "Check runtime compatibility and module dependency requirements.",
    "Investigate virtual environments, PATH and privilege escalation if indicated.",
    "Identify hosts and tasks that changed before failure.",
    "Correct the proven cause and validate on staging or a canary.",
    "Resume deployment in a controlled manner or follow the approved rollback plan.",
    "Verify application version, service health and monitoring.",
    "Document the incident and add preventive automation.",
  ],
};

export default pythonErrorGuide;
