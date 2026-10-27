
  symptoms: [
    "The Ansible task fails with 'No module named ...'.",
    "A managed host reports that Python could not be found.",
    "Ansible selects an unexpected Python interpreter.",
    "A module works on one host but fails on another.",
    "A Python library exists for one user but is missing for another.",
    "A playbook works on a developer laptop but fails in a CI runner.",
    "A package installation fails because the OS Python environment is externally managed.",
    "A Python upgrade breaks system utilities or existing automation.",
    "A task fails with a Python syntax or compatibility error.",
    "A collection requires a newer Python or Ansible version than the environment provides.",
    "The remote module fails even though SSH connectivity succeeds.",
    "A deployment partially completes before a Python-related failure.",
  ],

  incidentScenario: {
    title: "Production rollout fails after a managed host's Python environment changes",
    situation:
      "A configuration-management pipeline deploys to a fleet of Linux hosts. " +
      "The controller can connect over SSH, but module execution fails on a subset " +
      "of hosts after an OS image update. The failures mention Python interpreter " +
      "discovery and a missing dependency. Some earlier tasks have already changed state.",
    impact: [
      "The deployment is incomplete and hosts may have inconsistent configuration.",
      "Application instances may run different releases.",
      "A controller-side dependency failure could block every target in the environment.",
      "Changing the system Python blindly could break OS package tools or other automation.",
      "A repeated deployment could repeat operations that already completed.",
    ],
    firstResponse: [
      "Pause conflicting deployment runs and uncontrolled automatic retries.",
      "Preserve the original task output and full play recap.",
      "Identify whether the error occurred on the controller or on a managed host.",
      "Record the commit, runner image, Ansible version, Python version, and affected hosts.",
      "Inspect the state of hosts that reported changed before the failure.",
      "Use read-only checks before modifying interpreters or installing packages.",
      "Follow the production approval and incident escalation process.",
    ],
    successCriteria: [
      "The failure domain is identified with evidence.",
      "The selected Python runtime is compatible with the required Ansible modules.",
      "Required dependencies are available in the correct execution environment.",
      "All intended hosts reach the desired state.",
      "Application health checks pass after recovery.",
      "The final play recap and CI/CD result accurately reflect the outcome.",
      "Preventive actions are documented and assigned.",
    ],
  },

  safetyChecks: [
    "Confirm the current repository, branch, and deployed commit.",
    "Confirm the controller or execution-container identity.",
    "Confirm the inventory source and target host scope.",
    "Confirm the active Ansible configuration file.",
    "Distinguish controller Python from managed-host Python before changing anything.",
    "Do not upgrade or replace system Python during an incident without an approved compatibility plan.",
    "Do not delete virtual environments or package directories to fix an unexplained import error.",
    "Do not install arbitrary latest package versions on production systems.",
    "Do not expose environment variables, Vault passwords, tokens, or private keys in logs.",
    "Check whether the failed run already changed files, packages, services, or external resources.",
    "Use the organization's approved package manager and dependency source.",
    "Test interpreter changes on a disposable host or staging environment first.",
    "Do not assume that a successful SSH connection proves Python module execution will work.",
  ],

  evidenceCollection: [
    "Capture the full Python traceback and the Ansible task name.",
    "Record whether the error is reported locally by the controller or remotely by the target.",
    "Record ansible --version output.",
    "Record Python executable paths and versions in the relevant execution context.",
    "Record the active virtual environment and package installation context.",
    "Record the installed Ansible collections and roles.",
    "Record the managed operating system and image version.",
    "Record the selected interpreter from Ansible output where available.",
    "Record the first failing task and per-host recap.",
    "Compare affected hosts with a healthy peer using the same approved read-only checks.",
    "Capture the runner image digest, dependency lock files, and recent pipeline changes.",
    "Record package-manager and system logs relevant to the failure.",
    "Redact secrets, credentials, personal data, and sensitive environment values before sharing logs.",
  ],

  diagnosticWorkflow: [
    {
      title: "1. Identify the failure domain",
      purpose:
        "Determine whether the error originates in the controller, execution environment, or managed host.",
      commands: [
        "ansible --version",
        "python --version",
        "python3 --version",
        "pwd",
        "git rev-parse HEAD",
        "git status --short",
      ],
      expectedEvidence: [
        "Ansible version and the Python runtime used by the Ansible installation.",
        "Available Python commands in the current shell.",
        "Current working directory, commit, and local changes.",
      ],
      interpretation: [
        "The Python version printed by a shell may not be the interpreter used by Ansible.",
        "Ansible may run inside a container or virtual environment different from the interactive shell.",
        "A traceback from the controller indicates a different investigation path from a remote module traceback.",
      ],
      nextAction: [
        "Read the complete traceback and identify where it was generated.",
        "Inspect the runner or execution-container configuration.",
        "Continue with controller-side or managed-host checks as appropriate.",
      ],
      safetyNotes: [
        "These commands are intended for local diagnostics.",
        "Do not publish complete environment dumps because they can contain credentials.",
      ],
    },
    {
      title: "2. Verify Ansible and its Python runtime",
      purpose:
        "Check which executable and runtime actually launch Ansible.",
      commands: [
        "command -v ansible",
        "command -v python",
        "command -v python3",
        "ansible --version",
        "python3 -m pip --version",
      ],
      expectedEvidence: [
        "Resolved executable paths.",
        "Ansible's reported Python interpreter.",
        "The pip installation context for the selected Python executable.",
      ],
      interpretation: [
        "Ansible and pip can refer to different Python environments.",
        "Installing a package with one pip does not guarantee it is available to the Python runtime running Ansible.",
        "An unexpected executable path may indicate PATH ordering or a virtual-environment activation issue.",
      ],
      nextAction: [
        "Use the interpreter path reported by Ansible as the starting point for controller-side investigation.",
        "Check the approved virtual environment or execution image.",
        "Reproduce the issue in an isolated environment before changing dependencies.",
      ],
      safetyNotes: [
        "Do not use sudo pip to modify a system-managed Python installation as a general fix.",
        "Do not replace system symlinks to force a different Python version.",
      ],
    },
    {
      title: "3. Verify managed-host Python availability",
      purpose:
        "Determine whether a target host has a compatible Python interpreter available.",
      commands: [
        "ansible app_servers -i inventory/staging.ini -m ansible.builtin.raw -a 'command -v python3 || command -v python || true'",
        "ansible app_servers -i inventory/staging.ini -m ansible.builtin.raw -a 'cat /etc/os-release'",
      ],
      expectedEvidence: [
        "Python executable path, if present.",
        "Operating system identification from the target.",
        "Differences between affected and healthy hosts.",
      ],
      interpretation: [
        "The raw module is useful for bootstrapping or inspecting hosts when Python-based module execution is not yet available.",
        "An absent Python executable can prevent many normal Ansible modules from running.",
        "The correct interpreter and installation method depend on the target OS and policy.",
      ],
      nextAction: [
        "Confirm the target OS and approved Python package.",
        "Use an approved bootstrap process if Python is genuinely missing.",
        "Retest normal Ansible module execution after the interpreter is available.",
      ],
      safetyNotes: [
        "The raw module bypasses normal Python module execution; its commands still execute on target hosts.",
        "Confirm inventory and scope before running commands against any environment.",
        "Do not install packages on production hosts without approval.",
      ],
    },
    {
      title: "4. Check the selected interpreter",
      purpose:
        "Identify incorrect interpreter discovery or an unsuitable configured interpreter.",
      commands: [
        "ansible-inventory -i inventory/staging.ini --host app01",
        "ansible-config dump --only-changed",
        "ansible staging -i inventory/staging.ini -m ansible.builtin.setup -a 'filter=ansible_python*'",
      ],
      expectedEvidence: [
        "Inventory variables that may set ansible_python_interpreter.",
        "Relevant Ansible configuration overrides.",
        "Interpreter facts for hosts where fact gathering succeeds.",
      ],
      interpretation: [
        "A hard-coded interpreter path can become invalid after an OS image change.",
        "Interpreter discovery can select a different Python than expected.",
        "Facts may be unavailable when interpreter startup fails, so absence of a fact is not proof of a specific root cause.",
      ],
      nextAction: [
        "Compare the selected interpreter with the actual executable on the target.",
        "Inspect group_vars, host_vars, inventory plugins, and play-level variables.",
        "Set an explicit interpreter only when the environment requires it and the path is verified.",
      ],
      safetyNotes: [
        "Inventory output can expose sensitive variables; redact before sharing.",
        "Do not hard-code one interpreter path across dissimilar operating systems without validating it.",
      ],
    },
    {
      title: "5. Reproduce the smallest failing operation",
      purpose:
        "Separate Python module execution from the application task that originally failed.",
      commands: [
        "ansible staging -i inventory/staging.ini -m ansible.builtin.ping",
        "ansible staging -i inventory/staging.ini -m ansible.builtin.setup -a 'filter=ansible_python*'",
      ],
      expectedEvidence: [
        "Whether a basic Ansible module executes.",
        "Whether interpreter facts can be collected.",
        "The exact host and error for any failure.",
      ],
      interpretation: [
        "If ping fails with a Python traceback, investigate the module runtime before debugging the application task.",
        "If ping succeeds but one module fails, investigate that module's dependencies and arguments.",
        "If only one host fails, compare its OS image, interpreter path, permissions, and installed packages with a healthy peer.",
      ],
      nextAction: [
        "Classify the issue as general module execution, module-specific dependency, or application-task failure.",
        "Use the traceback and installed module requirements to narrow the next check.",
        "Avoid rerunning the entire deployment just to reproduce a basic execution problem.",
      ],
      safetyNotes: [
        "Use staging or a disposable target where possible.",
        "The ping module tests Ansible module execution, not ICMP reachability or application health.",
      ],
    },
    {
      title: "6. Diagnose missing Python packages",
      purpose:
        "Determine which environment needs a dependency and whether it is a controller-side or target-side dependency.",
      commands: [
        "python3 -m pip show Jinja2",
        "python3 -m pip list",
        "ansible-galaxy collection list",
        "ansible-doc ansible.builtin.template",
      ],
      expectedEvidence: [
        "Package version and installation location for the selected Python environment.",
        "Installed collections and module documentation.",
        "The dependency requirement of the failing feature or plugin.",
      ],
      interpretation: [
        "A package missing from the controller environment may affect plugins, filters, lookups, or Ansible itself.",
        "A module may require a library on the managed host instead.",
        "A package can be installed but unavailable because it belongs to a different interpreter or virtual environment.",
      ],
      nextAction: [
        "Identify the dependency's execution side from the traceback and module documentation.",
        "Install the pinned dependency in the correct environment through the approved process.",
        "Rebuild the execution image when dependencies are managed immutably.",
      ],
      safetyNotes: [
        "Do not install packages into the wrong Python environment.",
        "Avoid unreviewed dependency upgrades during an incident.",
      ],
    },
    {
      title: "7. Investigate virtual-environment and PATH drift",
      purpose:
        "Find differences between interactive shells, CI jobs, containers, and scheduled automation.",
      commands: [
        "command -v ansible",
        "command -v python3",
        "python3 -m pip --version",
        "env | grep -E '^(PATH|VIRTUAL_ENV|PYTHONPATH)='",
      ],
      expectedEvidence: [
        "Executable resolution and virtual-environment context.",
        "Relevant non-secret path variables.",
        "Differences between successful and failing execution contexts.",
      ],
      interpretation: [
        "A CI step may not activate the same virtual environment as a developer shell.",
        "PYTHONPATH can cause unexpected imports or shadow packages.",
        "PATH order can select an unexpected Ansible executable.",
      ],
      nextAction: [
        "Make the intended environment activation explicit in CI.",
        "Remove accidental path overrides after confirming their origin.",
        "Rebuild a clean environment and rerun the validation suite.",
      ],
      safetyNotes: [
        "Do not print all environment variables in CI logs.",
        "Review path values before sharing them outside the team.",
      ],
    },
    {
      title: "8. Check Python and collection compatibility",
      purpose:
        "Determine whether the selected Python runtime satisfies the versions required by Ansible and its collections.",
      commands: [
        "ansible --version",
        "python3 --version",
        "ansible-galaxy collection list",
        "ansible-doc -t module ansible.builtin.command",
      ],
      expectedEvidence: [
        "Ansible core version and its controller Python runtime.",
        "Installed collection versions.",
        "Documentation and support information for the relevant module.",
      ],
      interpretation: [
        "Controller-side Python requirements can differ from managed-host Python requirements.",
        "A collection or plugin may have a narrower compatibility range than the Ansible core installation.",
        "A runtime upgrade can expose incompatibilities in custom plugins or dependencies.",
      ],
      nextAction: [
        "Compare installed versions with official support requirements.",
        "Select a compatible, tested version combination.",
        "Pin versions and validate them in a reproducible environment.",
      ],
      safetyNotes: [
        "Do not assume the latest versions are compatible with the existing playbooks.",
        "Use official compatibility documentation rather than guessing version requirements.",
      ],
    },
    {
      title: "9. Inspect OS package-management constraints",
      purpose:
        "Diagnose package installation errors without damaging the operating system's Python environment.",
      commands: [
        "cat /etc/os-release",
        "python3 --version",
        "python3 -m pip --version",
      ],
      expectedEvidence: [
        "OS distribution and version.",
        "Python version and pip context.",
        "Whether the environment is managed by the OS package manager or an isolated virtual environment.",
      ],
      interpretation: [
        "Some distributions restrict direct pip installation into system-managed Python environments.",
        "A missing package may be supplied by an OS package rather than a pip package.",
        "The appropriate remediation depends on whether the dependency belongs to the controller, target, or isolated application environment.",
      ],
      nextAction: [
        "Follow the distribution's supported package-management approach.",
        "Use a virtual environment for application or tooling dependencies when appropriate.",
        "Validate the package source and version before installing.",
      ],
      safetyNotes: [
        "Do not force installation into an externally managed system Python without an approved exception.",
        "Avoid removing OS-managed Python packages to resolve a local dependency conflict.",
      ],
    },
    {
      title: "10. Assess partial changes and recover safely",
      purpose:
        "Avoid creating a second incident while fixing the Python execution environment.",
      commands: [
        "ansible-playbook -i inventory/staging.ini site.yml --syntax-check",
        "ansible-playbook -i inventory/staging.ini site.yml --list-hosts",
        "ansible-playbook -i inventory/staging.ini site.yml --list-tasks",
      ],
      expectedEvidence: [
        "Syntax validation and intended task sequence.",
        "Target host scope.",
        "Original failed-run recap and independent current-state checks.",
      ],
      interpretation: [
        "These commands help validate the plan but do not reveal every change from the original failed execution.",
        "The original recap and independent host inspection are required to understand partial deployment state.",
        "A Python fix may restore task execution but does not itself prove application recovery.",
      ],
      nextAction: [
        "Use original logs to determine what changed.",
        "Test the Python correction on a representative staging host.",
        "Execute the approved, smallest safe recovery scope.",
        "Verify application health and all intended hosts before closing the incident.",
      ],
      safetyNotes: [
        "Do not run a production recovery based solely on a successful syntax check.",
        "Do not assume a failed task made no changes.",
      ],
    },
  ],

  rootCauses: [
    {
      id: "controller-python-mismatch",
      title: "Controller Python mismatch",
      severity: "High",
      symptoms: [
        "Ansible fails during startup or plugin loading.",
        "A package import fails before remote tasks execute.",
        "A local run works only after activating a particular virtual environment.",
      ],
      evidence: [
        "ansible --version identifies a different Python interpreter from the one expected.",
        "The traceback originates on the controller or execution container.",
      ],
      diagnosticCommands: [
        "command -v ansible",
        "ansible --version",
        "python3 -m pip --version",
      ],
      interpretation: [
        "The package may be installed into a different Python environment.",
        "The controller runtime may have changed after an image or package update.",
      ],
      remediation: [
        "Restore or rebuild the approved virtual environment.",
        "Install pinned dependencies into the Python environment used by Ansible.",
        "Avoid modifying the system Python to compensate for an incorrectly configured environment.",
      ],
      validation: [
        "Ansible launches using the intended interpreter.",
        "Required plugins and collections load successfully.",
        "Staging tests pass from a clean execution environment.",
      ],
      prevention: [
        "Pin Python and Ansible versions.",
        "Use reproducible runner images.",
        "Log non-secret tool versions in each pipeline run.",
      ],
    },
    {
      id: "remote-python-missing",
      title: "Python missing on managed host",
      severity: "High",
      symptoms: [
        "A target reports that the Python interpreter cannot be found.",
        "Normal Python-based modules fail on a newly provisioned host.",
        "A raw command succeeds while a normal module fails.",
      ],
      evidence: [
        "A raw command confirms that the expected interpreter is absent.",
        "The host OS and image indicate Python was not installed or is located elsewhere.",
      ],
      diagnosticCommands: [
        "ansible app_servers -i inventory/staging.ini -m ansible.builtin.raw -a 'command -v python3 || command -v python || true'",
        "ansible app_servers -i inventory/staging.ini -m ansible.builtin.raw -a 'cat /etc/os-release'",
      ],
      interpretation: [
        "Interpreter discovery cannot select an executable that is not present.",
        "Minimal images may intentionally omit Python.",
      ],
      remediation: [
        "Use the approved OS package or image-building process to provide a compatible interpreter.",
        "Use raw only for necessary bootstrap operations.",
        "Rerun a basic module test once Python is available.",
      ],
      validation: [
        "The interpreter path exists and executes.",
        "Ansible ping and setup modules succeed.",
      ],
      prevention: [
        "Install required runtime dependencies when building images.",
        "Add a host bootstrap check before application configuration.",
      ],
    },
    {
      id: "wrong-interpreter",
      title: "Incorrect ansible_python_interpreter setting",
      severity: "Medium",
      symptoms: [
        "Ansible selects a nonexistent or incompatible interpreter.",
        "Only one group or host fails after an image change.",
        "A hard-coded path appears in inventory variables.",
      ],
      evidence: [
        "The configured path differs from the interpreter available on the host.",
        "The failure aligns with a group_vars, host_vars, or inventory change.",
      ],
      diagnosticCommands: [
        "ansible-config dump --only-changed",
        "ansible-inventory -i inventory/staging.ini --host app01",
        "ansible staging -i inventory/staging.ini -m ansible.builtin.setup -a 'filter=ansible_python*'",
      ],
      interpretation: [
        "A stale interpreter path may override otherwise successful discovery.",
        "A variable can be defined at multiple precedence levels.",
      ],
      remediation: [
        "Correct the path after verifying the target executable.",
        "Remove unnecessary hard-coded overrides when automatic discovery is appropriate.",
        "Test all affected OS groups before rollout.",
      ],
      validation: [
        "Ansible uses the expected runtime on representative hosts.",
        "The basic module suite passes.",
      ],
      prevention: [
        "Keep interpreter settings OS-specific when necessary.",
        "Test inventory changes in CI.",
      ],
    },
    {
      id: "missing-dependency",
      title: "Required Python package missing",
      severity: "High",
      symptoms: [
        "A traceback contains ModuleNotFoundError or ImportError.",
        "A plugin, filter, lookup, or task works in one environment but not another.",
      ],
      evidence: [
        "The traceback names the missing import.",
        "Package inspection confirms the dependency is missing from the relevant runtime.",
      ],
      diagnosticCommands: [
        "python3 -m pip show Jinja2",
        "python3 -m pip --version",
        "ansible-galaxy collection list",
      ],
      interpretation: [
        "The missing dependency may belong to the controller or target.",
        "The package could be installed in a different interpreter's site-packages.",
      ],
      remediation: [
        "Identify the correct execution side and documented dependency.",
        "Install the approved pinned version in that environment.",
        "Rebuild immutable runner images instead of hot-patching shared runners.",
      ],
      validation: [
        "The relevant import succeeds in the intended environment.",
        "The failed module or plugin passes a controlled test.",
      ],
      prevention: [
        "Maintain dependency manifests.",
        "Test clean builds and plugin imports in CI.",
      ],
    },
    {
      id: "version-incompatibility",
      title: "Python, Ansible, or collection version incompatibility",
      severity: "High",
      symptoms: [
        "A syntax error occurs in a dependency.",
        "An API or module parameter is unavailable.",
        "A recent runtime upgrade causes failures without a playbook change.",
      ],
      evidence: [
        "The failing version falls outside the dependency's supported compatibility range.",
        "A comparison with the last successful build reveals version drift.",
      ],
      diagnosticCommands: [
        "ansible --version",
        "python3 --version",
        "ansible-galaxy collection list",
      ],
      interpretation: [
        "A dependency may support a narrower version range than the overall application.",
        "Controller and target runtimes may have separate requirements.",
      ],
      remediation: [
        "Choose a tested compatible version set.",
        "Pin the execution image and dependencies.",
        "Validate upgrades in a separate pipeline before rollout.",
      ],
      validation: [
        "All supported environments pass the regression suite.",
        "The original failing task succeeds in staging.",
      ],
      prevention: [
        "Use dependency constraints and automated compatibility tests.",
        "Review runtime upgrades as controlled changes.",
      ],
    },
    {
      id: "virtualenv-path",
      title: "Virtual environment or PATH mismatch",
      severity: "Medium",
      symptoms: [
        "A command works interactively but fails in CI.",
        "Ansible resolves to an unexpected installation.",
        "A package appears missing despite having been installed.",
      ],
      evidence: [
        "Executable paths or virtual-environment settings differ between successful and failing runs.",
        "The package is installed under a different interpreter.",
      ],
      diagnosticCommands: [
        "command -v ansible",
        "command -v python3",
        "python3 -m pip --version",
        "env | grep -E '^(PATH|VIRTUAL_ENV|PYTHONPATH)='",
      ],
      interpretation: [
        "The CI job may run in a fresh shell without the expected activation.",
        "A path override may load an unintended package.",
      ],
      remediation: [
        "Make environment activation explicit.",
        "Remove unintended path overrides after verifying their source.",
        "Use a clean, reproducible execution environment.",
      ],
      validation: [
        "Executable and package paths match the intended environment.",
        "The pipeline succeeds from a clean runner.",
      ],
      prevention: [
        "Keep CI setup explicit and repeatable.",
        "Avoid relying on shell state from previous steps.",
      ],
    },
    {
      id: "system-python-conflict",
      title: "OS-managed Python conflicts with pip installation",
      severity: "High",
      symptoms: [
        "pip refuses a system-level installation.",
        "An upgrade changes behavior of system utilities.",
        "Packages conflict with the OS package manager.",
      ],
      evidence: [
        "The OS identifies a system-managed Python installation.",
        "The error indicates externally managed environment restrictions or package conflicts.",
      ],
      diagnosticCommands: [
        "cat /etc/os-release",
        "python3 --version",
        "python3 -m pip --version",
      ],
      interpretation: [
        "The OS package manager may own the system Python packages.",
        "Forcing pip into that environment can create difficult-to-recover package conflicts.",
      ],
      remediation: [
        "Use a virtual environment for tooling dependencies where appropriate.",
        "Use approved OS packages for system-level requirements.",
        "Revert unintended package changes through the supported package-management process.",
      ],
      validation: [
        "System package tools work normally.",
        "Ansible uses a compatible isolated runtime.",
      ],
      prevention: [
        "Document supported installation methods.",
        "Avoid unreviewed system Python changes.",
      ],
    },
    {
      id: "partial-deployment",
      title: "Python failure after partial deployment",
      severity: "Critical",
      symptoms: [
        "Some hosts completed tasks while others failed during module execution.",
        "A rollout has mixed versions or configuration.",
        "The play recap shows changed hosts before the failure.",
      ],
      evidence: [
        "Original task logs show successful state changes before the first Python error.",
        "Independent checks confirm different states across hosts.",
      ],
      diagnosticCommands: [
        "ansible-playbook -i inventory/staging.ini site.yml --list-hosts",
        "ansible-playbook -i inventory/staging.ini site.yml --list-tasks",
      ],
      interpretation: [
        "Fixing Python restores automation capability but does not automatically reconcile previously changed hosts.",
        "A blind rerun can repeat non-idempotent operations.",
      ],
      remediation: [
        "Pause rollout expansion.",
        "Determine per-host state and whether any remote operation is still running.",
        "Repair or roll back through an approved, state-aware procedure.",
      ],
      validation: [
        "All intended hosts converge to the desired state.",
        "Application and service health checks pass.",
      ],
      prevention: [
        "Use staged rollouts and health gates.",
        "Design retry-safe tasks and retain deployment state evidence.",
      ],
    },
  ],

  productionScenarios: [
    {
      title: "Scenario 1 — Python missing after a new server image rollout",
      symptom:
        "Newly provisioned hosts fail normal Ansible modules, while older hosts still work.",
      impact: [
        "Configuration rollout stops on the new host group.",
        "New application capacity may remain unconfigured.",
      ],
      investigation: [
        "Use a raw command to inspect Python executable availability.",
        "Identify the OS and image version.",
        "Compare with a healthy host built from the previous image.",
      ],
      recovery: [
        "Correct the image or follow the approved bootstrap process.",
        "Verify Python availability and run a basic Ansible module test.",
        "Resume rollout only after the target group passes preflight checks.",
      ],
      validation: [
        "Normal Ansible modules execute successfully.",
        "Application configuration and health checks pass.",
      ],
      prevention: [
        "Add interpreter checks to image qualification.",
        "Require a bootstrap test before an image becomes production-ready.",
      ],
    },
    {
      title: "Scenario 2 — Controller import error after a runner upgrade",
      symptom:
        "The pipeline fails before connecting to hosts with a Python import traceback.",
      impact: [
        "All deployments using the affected runner image may be blocked.",
        "A hotfix on target servers will not solve a controller-side import failure.",
      ],
      investigation: [
        "Read ansible --version and identify the controller runtime.",
        "Inspect the traceback and the dependency that cannot be imported.",
        "Compare the runner image and dependency set with the last successful build.",
      ],
      recovery: [
        "Restore the approved execution image if rollback is permitted.",
        "Otherwise rebuild with a reviewed compatible dependency set.",
        "Run the pipeline validation suite before production promotion.",
      ],
      validation: [
        "Ansible and required plugins load in a clean runner.",
        "Staging deployment succeeds.",
      ],
      prevention: [
        "Pin runner image digests and Python dependencies.",
        "Run clean-image smoke tests before rollout.",
      ],
    },
    {
      title: "Scenario 3 — One host uses the wrong interpreter",
      symptom:
        "Most hosts succeed, but one host reports interpreter errors.",
      impact: [
        "One instance remains on an older configuration.",
        "Deployment consistency may be compromised.",
      ],
      investigation: [
        "Compare the affected host's interpreter path with a healthy peer.",
        "Inspect inventory and host-specific variables.",
        "Confirm the executable exists and can run.",
      ],
      recovery: [
        "Correct the host-specific configuration or approved interpreter installation.",
        "Run a basic module test on that host.",
        "Apply the missing configuration only after checking its current state.",
      ],
      validation: [
        "The host passes the same module tests as its peers.",
        "The application joins the healthy pool.",
      ],
      prevention: [
        "Validate interpreter variables in inventory CI.",
        "Use OS-specific group settings where necessary.",
      ],
    },
    {
      title: "Scenario 4 — A package exists but Ansible cannot import it",
      symptom:
        "An operator confirms a package is installed, but the failing task still reports ModuleNotFoundError.",
      impact: [
        "Deployment remains blocked despite apparently correct package installation.",
        "Repeated installations may introduce dependency conflicts.",
      ],
      investigation: [
        "Determine whether the traceback originates on the controller or managed host.",
        "Inspect the exact Python executable and its pip context.",
        "Compare package installation paths with the runtime that executes the code.",
      ],
      recovery: [
        "Install the dependency into the correct isolated environment.",
        "Use a clean runner build or controlled target-side package update as appropriate.",
        "Rerun the smallest reproducible test.",
      ],
      validation: [
        "The package imports successfully from the intended interpreter.",
        "The original Ansible operation succeeds.",
      ],
      prevention: [
        "Use python -m pip with the intended interpreter in tooling setup.",
        "Keep controller and target dependency requirements documented.",
      ],
    },
    {
      title: "Scenario 5 — System Python was modified during troubleshooting",
      symptom:
        "After a package upgrade, OS tools or other automation fail.",
      impact: [
        "The issue expands beyond the original Ansible playbook.",
        "Host maintenance or recovery tasks may be affected.",
      ],
      investigation: [
        "Record package-manager history and recent changes.",
        "Identify which OS-managed packages or interpreter links changed.",
        "Assess host health and the availability of approved recovery channels.",
      ],
      recovery: [
        "Stop further package changes.",
        "Follow the distribution's supported repair or image-replacement procedure.",
        "Move automation dependencies into a supported isolated environment where appropriate.",
      ],
      validation: [
        "OS package tools and system utilities work.",
        "Ansible uses a supported interpreter and dependencies.",
      ],
      prevention: [
        "Prohibit ad hoc system Python upgrades in production.",
        "Document supported runtime installation methods.",
      ],
    },
  ],

  decisionTree: [
    {
      condition: "The error appears before any host connection is attempted.",
      action: "Investigate controller Python, Ansible installation, plugin imports, and the runner environment.",
      nextStep: "Compare the current runner with the last known-good image.",
    },
    {
      condition: "SSH works but Python-based Ansible modules fail on a host.",
      action: "Check remote interpreter availability and selection.",
      nextStep: "Use approved raw diagnostics, then test the ping and setup modules.",
    },
    {
      condition: "Only one host fails.",
      action: "Compare interpreter path, OS image, variables, packages, and permissions with a healthy peer.",
      nextStep: "Apply a targeted correction after confirming the host's current state.",
    },
    {
      condition: "The traceback reports ModuleNotFoundError.",
      action: "Identify the missing import and whether it is needed on the controller or target.",
      nextStep: "Verify the package is installed in the correct runtime and at a compatible version.",
    },
    {
      condition: "The issue started after a runner or dependency update.",
      action: "Compare Python, Ansible, collection, and execution-image versions.",
      nextStep: "Restore a known-good compatible set or test a reviewed upgrade.",
    },
    {
      condition: "pip refuses to modify the system environment.",
      action: "Check the OS distribution and supported package-management model.",
      nextStep: "Use an approved OS package or isolated virtual environment.",
    },
    {
      condition: "Some hosts changed before Python execution failed.",
      action: "Pause rollout expansion and determine actual per-host state.",
      nextStep: "Perform state-aware recovery and verify application health.",
    },
  ],

  recoveryProcedure: [
    "Assign an incident owner and pause conflicting deployments.",
    "Preserve logs and record the commit, runner image, Ansible version, and Python versions.",
    "Determine whether the traceback is controller-side or target-side.",
    "Identify the exact missing interpreter, dependency, or compatibility requirement.",
    "Compare the affected environment with a healthy reference.",
    "Check the original recap and identify hosts that changed before failure.",
    "Choose a root-cause-specific correction and test it in an isolated environment.",
    "Validate syntax, dependencies, interpreter selection, and basic module execution.",
    "Obtain required production approval.",
    "Execute the smallest approved recovery scope.",
    "Monitor task output and application health.",
    "Verify the intended configuration and release on all required hosts.",
    "Check the final play recap, exit status, and any unreachable hosts.",
    "Record root cause, recovery evidence, remaining risks, and preventive actions.",
  ],

  rollbackGuidance: [
    "Do not assume changing Python back is sufficient if the deployment also changed application state.",
    "Determine whether package installation or interpreter changes affected OS-managed dependencies.",
    "Prefer restoring a known-good execution image for controller-side regressions when appropriate.",
    "For target-side runtime problems, use the supported OS package or image-recovery procedure.",
    "Check whether the original deployment changed application files, packages, services, or data.",
    "Avoid reverting application state without checking whether newer changes depend on it.",
    "For high-risk host changes, use the approved image replacement or recovery process where appropriate.",
    "Verify both automation capability and application health after recovery.",
  ],

  preventionChecklist: [
    "Pin the Ansible and Python versions used by the controller.",
    "Use reproducible execution-environment images.",
    "Declare and pin collection and role dependencies.",
    "Test clean runner builds in CI.",
    "Validate managed-host Python availability during bootstrap.",
    "Validate interpreter overrides against actual target executables.",
    "Separate controller-side and target-side dependency requirements.",
    "Avoid unapproved changes to system-managed Python.",
    "Add host preflight checks and environment-specific inventory tests.",
    "Test representative OS versions and image variants.",
    "Keep failure logs and play recaps available for incident investigation.",
    "Redact credentials and sensitive variables from diagnostics.",
    "Use staged rollout and application health gates.",
    "Test recovery procedures in non-production environments.",
  ],

  ciCdRecommendations: [
    "Use a pinned execution-environment image rather than relying on runner-global packages.",
    "Record Python, Ansible, and collection versions in the build output.",
    "Install dependencies from reviewed manifests.",
    "Run syntax checks and lint before deployment.",
    "Run controller-side import checks for required custom plugins.",
    "Use representative test hosts to verify managed-host interpreter compatibility.",
    "Add an explicit preflight stage before write operations.",
    "Fail early when the required runtime or dependencies are unavailable.",
    "Preserve full, redacted task logs and the play recap as build artifacts.",
    "Require approval for production interpreter or OS package changes.",
    "Prevent concurrent deployments from modifying the same target fleet.",
  ],

  commonMistakes: [
    "Assuming every Python error comes from the managed host.",
    "Assuming the Python command in the current shell is the one used by Ansible.",
    "Installing a dependency using pip from the wrong interpreter.",
    "Upgrading system Python during an incident without compatibility review.",
    "Forcing pip to modify a system-managed environment.",
    "Using raw commands for all tasks instead of fixing the interpreter setup.",
    "Changing inventory variables without checking precedence.",
    "Assuming a successful SSH login proves module execution works.",
    "Installing the latest versions of all collections to fix one missing import.",
    "Ignoring the possibility of partial deployment.",
    "Dumping secrets while investigating environment variables.",
    "Treating a successful basic ping test as proof of application health.",
    "Rerunning a non-idempotent task without checking whether it already completed.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Service and environment:",
    "Severity and customer impact:",
    "Detection and resolution timestamps:",
    "Repository and commit SHA:",
    "Pipeline run ID:",
    "Execution image digest:",
    "Ansible version:",
    "Controller Python version and path:",
    "Managed-host OS and Python version:",
    "First failing task:",
    "Traceback and sanitized error:",
    "Confirmed failure domain:",
    "Root cause and supporting evidence:",
    "Affected hosts:",
    "Hosts changed before failure:",
    "Containment action:",
    "Corrective action:",
    "Rollback decision:",
    "Post-recovery verification:",
    "Preventive actions and owners:",
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Identify the active controller interpreter",
      objective:
        "Learn to distinguish the Python executable running Ansible from the default shell Python.",
      procedure: [
        "Run ansible --version in an isolated environment.",
        "Record the reported Python interpreter.",
        "Compare it with command -v python3 and python3 -m pip --version.",
        "Activate a test virtual environment and repeat the checks.",
        "Document the differences.",
      ],
      expectedResult: [
        "The active Ansible runtime is identified.",
        "The pip environment is not assumed to match without evidence.",
      ],
      learningPoints: [
        "Executable resolution matters.",
        "Virtual environments isolate dependencies only when commands use them.",
      ],
    },
    {
      title: "Lab 2 — Bootstrap a host without Python",
      objective:
        "Understand why raw is useful for initial diagnostics on a host that lacks Python.",
      procedure: [
        "Create a disposable minimal Linux VM.",
        "Confirm Python availability using an approved raw command.",
        "Install Python using the VM's supported package-management procedure.",
        "Run the Ansible ping and setup modules.",
        "Record which operation requires remote Python.",
      ],
      expectedResult: [
        "Raw diagnostics work before Python-based modules are available.",
        "Normal modules succeed after the supported runtime is installed.",
      ],
      learningPoints: [
        "The raw module does not require normal remote Python module execution.",
        "Bootstrap changes should be explicit and repeatable.",
      ],
    },
    {
      title: "Lab 3 — Reproduce a dependency mismatch",
      objective:
        "Demonstrate how a package can be installed but unavailable to the runtime that needs it.",
      procedure: [
        "Create two disposable virtual environments.",
        "Install a harmless test package in only one environment.",
        "Run an import check with each environment's Python.",
        "Run a test script using the environment that lacks the package.",
        "Install the pinned dependency in the correct environment and retest.",
      ],
      expectedResult: [
        "The import failure is reproducible and explained by the environment difference.",
        "The corrected environment imports the package successfully.",
      ],
      learningPoints: [
        "Package installation location matters.",
        "Using the intended interpreter with pip reduces ambiguity.",
      ],
    },
    {
      title: "Lab 4 — Compare affected and healthy hosts",
      objective:
        "Practice targeted diagnostics without changing production systems.",
      procedure: [
        "Create two disposable VMs with different Python availability or paths.",
        "Run approved read-only raw diagnostics against both.",
        "Compare OS information and interpreter paths.",
        "Correct the test VM through the documented bootstrap process.",
        "Run a basic module test on both VMs.",
      ],
      expectedResult: [
        "The failing host's runtime difference is demonstrated.",
        "Both test hosts pass the same basic module test after correction.",
      ],
      learningPoints: [
        "Comparing healthy peers can narrow the failure domain.",
        "A targeted fix is preferable to fleet-wide changes without evidence.",
      ],
    },
    {
      title: "Lab 5 — Simulate a partial deployment failure",
      objective:
        "Practice identifying changed hosts before retrying a failed playbook.",
      procedure: [
        "Use two disposable hosts and a harmless idempotent file task.",
        "Introduce a controlled Python execution failure on one host.",
        "Capture the play recap and actual file state.",
        "Restore the test runtime.",
        "Rerun the test and verify the final state on both hosts.",
      ],
      expectedResult: [
        "The recap and actual host state are compared.",
        "Recovery reaches the intended state without assuming that the first run made no changes.",
      ],
      learningPoints: [
        "A failed run can have partial effects.",
        "Idempotency and state verification make recovery safer.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "What is the difference between controller Python and managed-host Python?",
      answer:
        "Controller Python runs Ansible and its controller-side plugins. Managed-host Python is commonly used to execute Ansible modules on remote targets. Their requirements and failure symptoms can differ.",
      productionExample:
        "A missing controller-side plugin dependency can block the pipeline before any host is contacted, while missing target Python can break module execution on specific hosts.",
      followUp:
        "How do you identify which side produced a traceback?",
    },
    {
      question: "Why can Ansible connect over SSH but still fail to execute a module?",
      answer:
        "SSH establishes a remote connection, but many Ansible modules also require a usable Python interpreter and compatible dependencies on the target.",
      productionExample:
        "A minimal server image allows SSH login but does not include Python.",
      followUp:
        "Which Ansible mechanism can help inspect or bootstrap such a host?",
    },
    {
      question: "What does ansible_python_interpreter control?",
      answer:
        "It specifies the Python interpreter Ansible should use on a managed host. A stale or incorrect value can cause module execution failures.",
      productionExample:
        "An image update changes the interpreter path, but inventory still specifies the old location.",
      followUp:
        "When would you use automatic interpreter discovery instead?",
    },
    {
      question: "Why does installing a package not always fix ModuleNotFoundError?",
      answer:
        "The package may have been installed into a different Python environment from the one executing the failing code, or the dependency may be needed on the other side of the connection.",
      productionExample:
        "A package is installed into a user's virtual environment, but CI launches Ansible from a separate environment.",
      followUp:
        "How do you verify the installation context?",
    },
    {
      question: "How would you troubleshoot a Python error that occurs only in CI?",
      answer:
        "I compare the exact execution image, executable paths, Python and Ansible versions, dependencies, environment activation, and secret references with a successful run.",
      productionExample:
        "The developer machine has a global dependency that is absent from the clean runner.",
      followUp:
        "How would you make the CI environment reproducible?",
    },
    {
      question: "Why is upgrading system Python a risky troubleshooting step?",
      answer:
        "OS utilities and package-managed software may depend on the distribution's supported Python runtime. An unplanned upgrade can break unrelated tools or create package conflicts.",
      productionExample:
        "A forced pip or interpreter upgrade causes system maintenance utilities to fail.",
      followUp:
        "What safer isolation options are available?",
    },
    {
      question: "When would you use the raw module?",
      answer:
        "Raw is useful for simple remote commands when normal Python-based module execution is unavailable, such as checking for an interpreter on a minimal host.",
      productionExample:
        "A new VM needs an interpreter installed before normal configuration modules can run.",
      followUp:
        "Why should raw not replace normal Ansible modules for routine configuration?",
    },
    {
      question: "What should you do if Python fails halfway through a production deployment?",
      answer:
        "Pause rollout expansion, preserve the recap, identify changed hosts, fix the execution issue in a controlled way, and recover based on actual state rather than blindly rerunning everything.",
      productionExample:
        "Some servers have a new configuration while others failed during interpreter startup.",
      followUp:
        "How do you verify that the fleet is consistent again?",
    },
    {
      question: "What is the value of a reproducible execution environment?",
      answer:
        "It keeps the Python runtime, Ansible version, collections, and dependencies consistent, which improves repeatability and makes incidents easier to reproduce.",
      productionExample:
        "A versioned execution image prevents a runner upgrade from silently changing a collection dependency.",
      followUp:
        "Which versions and identifiers would you record for each deployment?",
    },
    {
      question: "Does a successful Ansible ping prove the deployment is healthy?",
      answer:
        "No. It proves that a basic Ansible module executed successfully against the selected host. It does not prove that application configuration, service health, or business-level checks pass.",
      productionExample:
        "The host is reachable and Python works, but the application service fails after a configuration update.",
      followUp:
        "Which post-deployment checks would you add?",
    },
  ],

  references: [
    {
      title: "Ansible Interpreter Discovery",
      url: "https://docs.ansible.com/ansible/latest/reference_appendices/interpreter_discovery.html",
      purpose: "How Ansible selects Python interpreters on managed hosts.",
    },
    {
      title: "Ansible Installation Guide",
      url: "https://docs.ansible.com/ansible/latest/installation_guide/index.html",
      purpose: "Supported installation and execution environment concepts.",
    },
    {
      title: "Ansible Configuration Settings",
      url: "https://docs.ansible.com/ansible/latest/reference_appendices/config.html",
      purpose: "Interpreter-related settings and effective configuration.",
    },
    {
      title: "Ansible Raw Module",
      url: "https://docs.ansible.com/ansible/latest/collections/ansible/builtin/raw_module.html",
      purpose: "Remote command execution without normal remote Python module requirements.",
    },
    {
      title: "Ansible FAQ",
      url: "https://docs.ansible.com/ansible/latest/reference_appendices/faq.html",
      purpose: "Common Ansible execution and troubleshooting questions.",
    },
    {
      title: "Python Virtual Environments",
      url: "https://docs.python.org/3/library/venv.html",
      purpose: "Python environment isolation and dependency management.",
    },
    {
      title: "Python Packaging User Guide",
      url: "https://packaging.python.org/en/latest/",
      purpose: "Python package installation and environment management practices.",
    },
  ],
};
