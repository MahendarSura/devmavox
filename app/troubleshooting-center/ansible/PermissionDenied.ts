
export interface InventoryNotFoundDiagnosticStep {
  title: string;
  purpose: string;
  commands: string[];
  expectedEvidence: string[];
  interpretation: string[];
  nextAction: string[];
}

export interface InventoryNotFoundRootCause {
  cause: string;
  symptoms: string[];
  evidence: string[];
  diagnosis: string[];
  remediation: string[];
  validation: string[];
}

export interface InventoryNotFoundInterviewQuestion {
  question: string;
  answer: string;
  followUp: string;
}

export interface InventoryNotFoundGuide {
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

  diagnosticWorkflow: InventoryNotFoundDiagnosticStep[];

  rootCausePlaybooks: InventoryNotFoundRootCause[];

  inventoryConcepts: {
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

  interviewQuestions: InventoryNotFoundInterviewQuestion[];

  references: {
    title: string;
    url: string;
  }[];
}

export const inventoryNotFoundGuide: InventoryNotFoundGuide = {
  title: "Ansible Inventory Not Found — Real Production Troubleshooting Guide",
  slug: "inventory-not-found",
  category: "Ansible",
  difficulty: "Advanced",
  summary:
    "A production-focused troubleshooting guide covering missing inventory files, incorrect relative paths, CI/CD working-directory mismatches, INI and YAML parsing errors, Ansible configuration precedence, multiple inventory sources, dynamic inventory failures, cloud authentication, file permissions, host-pattern mismatches, empty inventories, controlled recovery, incident reporting, prevention, and interview preparation.",

  overview: {
    definition:
      "Ansible inventory defines the hosts and groups against which a playbook can operate. An inventory failure can mean that the source file cannot be found, the source cannot be parsed, a dynamic inventory plugin cannot retrieve hosts, or the loaded inventory does not match the playbook's host pattern. These are different failure modes and must be distinguished using evidence. An inventory file existing on disk does not prove that Ansible can parse it, and a successful inventory parse does not prove that the intended deployment hosts are selected.",

    concepts: [
      "Static inventory: a file containing hosts and groups, commonly expressed in INI or YAML format.",
      "Inventory source: a file, directory, executable script, or supported plugin configuration used to discover hosts.",
      "Relative inventory path: a path interpreted relative to the process working directory or the relevant configuration context. Verify the actual invocation rather than assuming a universal resolution rule.",
      "Absolute inventory path: an explicit filesystem path that can help avoid ambiguity between local development and CI execution.",
      "Inventory directory: a directory supplied as an inventory source may contain multiple inventory sources. Validate what Ansible actually loads from it.",
      "INI inventory: a text format using group headers and host entries. Group spelling, section placement, and variable syntax affect interpretation.",
      "YAML inventory: a structured inventory format that uses groups, hosts, children, and vars. Indentation and data types matter.",
      "Inventory group: a named collection of hosts or child groups used to select deployment targets.",
      "Parent and child groups: group relationships that allow a parent group to include hosts through child groups.",
      "Host pattern: the hosts expression in a playbook or command. It determines which discovered hosts are selected.",
      "Inventory precedence: multiple sources and variable definitions can influence the final inventory and host variables. Inspect the effective inventory instead of relying on one source file alone.",
      "ansible.cfg: the Ansible configuration file that can influence defaults such as inventory paths, plugin settings, and other execution behavior.",
      "ANSIBLE_CONFIG: an environment variable that can select an Ansible configuration file. Confirm the effective configuration with ansible --version.",
      "Dynamic inventory: a source that discovers hosts from an external system, such as a cloud API or inventory service.",
      "Inventory plugin: an Ansible component that reads a supported inventory source and constructs hosts, groups, and variables.",
      "Dynamic inventory cache: cached discovery results can be stale or inconsistent with the current cloud state. Investigate cache behavior before invalidating it.",
      "Cloud credentials: identities and permissions used by dynamic inventory to query a cloud API. Missing permissions can prevent host discovery.",
      "File permissions: the CI execution identity must be able to read the inventory file and traverse its parent directories.",
      "Case sensitivity: filenames that differ only by uppercase and lowercase characters may behave differently across operating systems and filesystems.",
      "Git-tracked inventory: a file committed to the repository. A file present on a developer machine may not exist in the checked-out commit.",
      "Generated inventory: an inventory created during a pipeline step. The generation stage and artifact handoff must complete successfully.",
      "Host limit: the --limit or -l argument narrows the host selection. A correct inventory can still produce an empty target set when the limit is wrong.",
      "Tags: tags control task selection, not inventory file discovery. A task-selection problem must not be misdiagnosed as a missing inventory.",
      "Vault-encrypted variables: encrypted variables may affect tasks or inventory plugins. Never expose vault passwords or decrypted secrets while collecting evidence.",
      "Execution environment: containers, virtual environments, CI runners, and automation controllers can have different filesystem layouts, installed collections, credentials, and configuration.",
      "Collection dependencies: a dynamic inventory plugin may require an installed collection and a compatible runtime.",
      "Inventory validation: read-only commands such as ansible-inventory --graph and ansible-playbook --list-hosts help establish what Ansible can discover and select."
    ],

    symptoms: [
      "Ansible reports that the inventory source could not be found.",
      "Ansible reports that an inventory source could not be parsed.",
      "The inventory graph does not contain expected groups or hosts.",
      "A deployment pipeline suddenly selects zero hosts.",
      "The same command works locally but fails in a CI runner.",
      "The inventory directory exists but contains no usable inventory source.",
      "A dynamic inventory plugin returns an empty host list.",
      "A cloud API request fails because of credentials, permissions, network access, or plugin configuration.",
      "A file permission error appears only when the pipeline runs as a different user.",
      "The playbook references a group that is absent from the loaded inventory.",
      "The inventory works after a manual step but fails during an unattended scheduled job.",
      "A repository refactor or filename change introduces an inventory path mismatch.",
      "The inventory loads successfully but the pipeline's --limit expression excludes every host."
    ],

    commonCauses: [
      "Incorrect inventory filename or path.",
      "Wrong pipeline working directory.",
      "Inventory file absent from the checked-out Git commit.",
      "Case-sensitive filename mismatch.",
      "Inventory file permissions or parent-directory permissions.",
      "Invalid INI or YAML syntax.",
      "Incorrect group names or group hierarchy.",
      "Ansible configuration points to an unexpected default inventory.",
      "A pipeline variable supplies an incorrect inventory argument.",
      "A dynamic inventory plugin is missing or misconfigured.",
      "Cloud credentials are expired, missing, or lack discovery permissions.",
      "Cloud API endpoints are unreachable from the runner.",
      "An inventory cache contains stale discovery data.",
      "A generated inventory step failed or its artifact was not transferred.",
      "The inventory source is correct but the playbook host pattern or limit is wrong."
    ]
  },

  incidentScenario: {
    title:
      "Production deployment suddenly runs against zero hosts because inventory discovery fails",

    timeline: [
      "T-30 minutes: The previous deployment completes against the approved production group.",
      "T+00 minutes: A new release pipeline starts using the expected repository and environment.",
      "T+02 minutes: The job reports an inventory path, parsing, discovery, or host-selection problem.",
      "T+04 minutes: The release owner pauses repeated attempts and records the run ID and commit SHA.",
      "T+07 minutes: The operator captures the working directory, effective Ansible configuration, exact inventory argument, and inventory graph.",
      "T+12 minutes: The team compares the failing run with the last successful run and identifies the first observable difference.",
      "T+18 minutes: The inventory owner confirms the intended target source and approves a narrowly scoped correction.",
      "T+25 minutes: The team validates inventory parsing and the exact playbook host list without applying changes.",
      "T+30 minutes: An authorized operator runs the deployment only after the selected hosts and change scope are confirmed.",
      "T+35 minutes: The release owner verifies application health, release version, and deployment records."
    ],

    impact: [
      "The intended release may not be deployed.",
      "A pipeline may be incorrectly marked successful if it lacks explicit target-count and release-version assertions.",
      "Earlier plays or stages may already have changed systems, so the team must inspect the entire run rather than assuming no changes occurred.",
      "Repeated retries can delay the release or overlap with other deployment activities.",
      "If the wrong inventory is selected, an otherwise successful deployment can target the wrong environment.",
      "Inventory changes can affect several applications when the source is shared."
    ],

    initialHypotheses: [
      "The inventory path resolves to a nonexistent file.",
      "The pipeline is running from a different working directory.",
      "The expected inventory file is absent from the selected commit.",
      "The file exists but contains invalid INI or YAML syntax.",
      "The inventory directory is loaded differently from the expected single file.",
      "A dynamic inventory plugin cannot retrieve hosts.",
      "The runner has insufficient filesystem or cloud API permissions.",
      "Ansible is loading an unexpected configuration file.",
      "The inventory is valid, but the playbook group or --limit does not match.",
      "The pipeline uses a different runtime or collection set from the last successful run."
    ],

    investigation: [
      "Preserve the failing run logs, exact command, timestamp, repository commit, and environment.",
      "Confirm the actual working directory and checkout revision.",
      "Check whether the exact inventory path exists and whether its source is tracked, generated, or externally provided.",
      "Run ansible --version and inspect the selected configuration file.",
      "Use ansible-inventory --graph and --list with the explicitly approved source.",
      "Run ansible-playbook --syntax-check and --list-hosts against the intended inventory.",
      "Compare inventory files, pipeline variables, configuration, plugin versions, and credentials setup with the last successful run.",
      "If the source is dynamic, inspect the plugin-specific error and verify the runner identity and required permissions.",
      "Distinguish a file-not-found error from a parsing error, empty discovery result, group mismatch, and limit mismatch.",
      "Document the evidence that confirms the root cause before changing production configuration."
    ],

    recovery: [
      "Confirm whether any earlier stage or play modified production systems.",
      "Fix only the demonstrated path, parsing, plugin, credential, or target-selection defect.",
      "Keep production restrictions and approval gates enabled.",
      "Revalidate the inventory graph and final playbook host list.",
      "Obtain the required release approval before the deployment rerun.",
      "Run the deployment using the verified target scope.",
      "Confirm the expected release version and service health.",
      "Use rollback procedures only when a harmful or incomplete change is confirmed and rollback is appropriate.",
      "Record the root cause, corrective action, validation evidence, and preventive follow-up."
    ]
  },

  impactAndSeverity: [
    {
      environment: "Production",
      impact:
        "The release may be blocked, or a wrong inventory may select an unintended target set.",
      severity: "SEV1 or SEV2 depending on business impact",
      response:
        "Pause unsafe retries, assess partial changes, preserve evidence, notify the release owner, and require approval before changing target scope."
    },
    {
      environment: "Staging",
      impact:
        "Release verification or acceptance testing is blocked.",
      severity: "SEV2 or SEV3 depending on release criticality",
      response:
        "Validate the staging inventory, compare with the last successful run, correct the proven cause, and rerun the read-only checks."
    },
    {
      environment: "Development",
      impact:
        "Developer deployment or local testing is blocked.",
      severity: "SEV3 or SEV4",
      response:
        "Check local paths, syntax, installed collections, and environment variables before changing shared configuration."
    },
    {
      environment: "Shared dynamic inventory service",
      impact:
        "Multiple environments or applications may lose host discovery.",
      severity: "SEV1 or SEV2 depending on scope",
      response:
        "Identify affected consumers, inspect provider health and permissions, and coordinate recovery with the inventory service owner."
    }
  ],

  safetyChecks: [
    "Confirm the repository, branch, commit SHA, and pipeline run ID.",
    "Confirm the intended environment and deployment window.",
    "Confirm the exact inventory source passed to Ansible.",
    "Confirm the expected group and approved target scope with the service owner.",
    "Capture whether earlier plays or stages already applied changes.",
    "Use read-only commands before attempting a deployment.",
    "Do not remove --limit simply because zero hosts were selected.",
    "Do not switch to another inventory unless its ownership and target scope are verified.",
    "Do not print access tokens, cloud credentials, private keys, vault passwords, or unredacted secret variables.",
    "Do not run destructive commands or modify production inventory without the required approval.",
    "Do not assume a syntax check proves that the runtime can authenticate to a dynamic inventory provider.",
    "Preserve original configuration and pipeline evidence before making a correction.",
    "Confirm the final target list before any command that can change systems.",
    "Ensure rollback plans and responsible operators are identified for high-impact changes."
  ],

  evidenceCollection: [
    {
      source: "Execution context",
      commands: [
        "pwd",
        "git rev-parse --show-toplevel",
        "git rev-parse HEAD",
        "ansible --version",
        "ansible-playbook --version"
      ],
      purpose:
        "Record the execution directory, repository revision, Ansible runtime, and selected configuration file.",
      cautions: [
        "Redact internal paths and hostnames before publishing logs externally.",
        "Do not dump the entire process environment.",
        "Ansible version output may reveal filesystem paths; share only with authorized responders."
      ]
    },
    {
      source: "Filesystem and Git",
      commands: [
        "ls -la",
        "ls -la ./inventory",
        "test -f ./inventory/production.ini && echo INVENTORY_PRESENT || echo INVENTORY_MISSING",
        "git ls-files -- inventory/",
        "git status --short",
        "git log -n 10 --oneline -- inventory/"
      ],
      purpose:
        "Determine whether the expected file exists, is tracked, has changed, and is available in the current checkout.",
      cautions: [
        "Replace example paths with the approved inventory path.",
        "A generated or securely mounted inventory may intentionally not be tracked by Git.",
        "Avoid posting confidential inventory contents to public issue trackers."
      ]
    },
    {
      source: "Inventory parsing and host discovery",
      commands: [
        "ansible-inventory -i ./inventory/production.ini --list",
        "ansible-inventory -i ./inventory/production.ini --graph",
        "ansible all -i ./inventory/production.ini --list-hosts",
        "ansible-playbook -i ./inventory/production.ini deploy.yml --list-hosts",
        "ansible-playbook -i ./inventory/production.ini deploy.yml --syntax-check"
      ],
      purpose:
        "Separate source-loading problems from group matching, host selection, and playbook syntax issues.",
      cautions: [
        "Use the same inventory argument as the failing pipeline.",
        "Host lists may reveal internal hostnames and must be handled according to operational policy.",
        "A successful syntax check does not verify runtime connectivity or cloud permissions."
      ]
    },
    {
      source: "Effective configuration",
      commands: [
        "ansible --version",
        "ansible-config dump --only-changed",
        "printf 'ANSIBLE_CONFIG=%s\\n' \"${ANSIBLE_CONFIG:-<unset>}\"",
        "printf 'ANSIBLE_INVENTORY=%s\\n' \"${ANSIBLE_INVENTORY:-<unset>}\""
      ],
      purpose:
        "Identify configuration selection and relevant environment overrides without exposing the full environment.",
      cautions: [
        "Do not assume every environment variable listed is consumed by every Ansible version or wrapper.",
        "Verify the actual command line and effective configuration.",
        "Do not include secret variables or credentials in evidence bundles."
      ]
    },
    {
      source: "Dynamic inventory",
      commands: [
        "ansible-inventory -i ./inventory/cloud.aws_ec2.yml --graph",
        "ansible-inventory -i ./inventory/cloud.aws_ec2.yml --list",
        "ansible-galaxy collection list"
      ],
      purpose:
        "Check the configured dynamic source, discovered groups, and installed collection dependencies.",
      cautions: [
        "The example filename is a placeholder and must match the configured plugin source.",
        "Use the plugin's documented authentication and diagnostic methods.",
        "Never paste cloud secrets or credential files into pipeline logs.",
        "Do not disable TLS verification as a workaround for provider connection errors."
      ]
    },
    {
      source: "Permissions and file access",
      commands: [
        "id",
        "namei -l ./inventory/production.ini",
        "test -r ./inventory/production.ini && echo INVENTORY_READABLE || echo INVENTORY_NOT_READABLE"
      ],
      purpose:
        "Check the effective runner identity and whether it can traverse parent directories and read the inventory.",
      cautions: [
        "namei may not be installed on every runner.",
        "Do not make files world-readable to resolve a permissions issue.",
        "Do not change ownership or permissions until the required access policy is confirmed."
      ]
    }
  ],

  diagnosticWorkflow: [
    {
      title: "1. Capture the original failure",
      purpose:
        "Establish the exact error and preserve the failing command before changing anything.",
      commands: [
        "Record the exact ansible-playbook command from the pipeline log.",
        "Record the pipeline run ID, timestamp, environment, and commit SHA.",
        "pwd",
        "ansible --version"
      ],
      expectedEvidence: [
        "Exact command and arguments are known.",
        "Working directory and commit SHA are recorded.",
        "The runtime version and configuration file are identified."
      ],
      interpretation: [
        "An explicit file-not-found error differs from an inventory parse failure.",
        "A no-hosts message may indicate host-pattern mismatch rather than a missing file.",
        "The exact first error is more useful than a final summary alone."
      ],
      nextAction: [
        "If the source path is incorrect, proceed to filesystem checks.",
        "If the source cannot be parsed, proceed to format and plugin diagnostics.",
        "If the inventory loads but the target list is empty, inspect patterns and limits."
      ]
    },
    {
      title: "2. Verify the inventory file and directory",
      purpose:
        "Prove whether the requested source exists at the path used by the failing process.",
      commands: [
        "pwd",
        "ls -la ./inventory",
        "test -f ./inventory/production.ini && echo PRESENT || echo MISSING",
        "git ls-files -- inventory/"
      ],
      expectedEvidence: [
        "The source exists at the expected location, or its absence is confirmed.",
        "The actual directory contents are known.",
        "Tracked files can be compared with the intended repository structure."
      ],
      interpretation: [
        "MISSING indicates that the exact path is absent from the current filesystem.",
        "A file missing from Git may still be supplied by a documented generation or artifact process.",
        "A case mismatch can cause platform-specific failures."
      ],
      nextAction: [
        "Correct the proven path or restore the intended source through the approved process.",
        "Check whether a prior generation or artifact-download stage failed.",
        "Rerun the inventory existence and parsing checks."
      ]
    },
    {
      title: "3. Validate the effective inventory",
      purpose:
        "Determine what Ansible actually discovers from the intended source.",
      commands: [
        "ansible-inventory -i ./inventory/production.ini --graph",
        "ansible-inventory -i ./inventory/production.ini --list",
        "ansible-playbook -i ./inventory/production.ini deploy.yml --list-hosts"
      ],
      expectedEvidence: [
        "The expected groups appear in the inventory graph.",
        "Expected hosts appear in the parsed inventory.",
        "The playbook selects the intended hosts."
      ],
      interpretation: [
        "An empty graph requires source-content or discovery investigation.",
        "A populated graph with an empty playbook target list points toward host-pattern or limit mismatch.",
        "A parsing error points toward the source format or plugin."
      ],
      nextAction: [
        "Inspect the specific parser error when parsing fails.",
        "Inspect group membership when expected groups are absent.",
        "Inspect playbook patterns and limits when the graph is correct but selection is empty."
      ]
    },
    {
      title: "4. Check the configuration and pipeline invocation",
      purpose:
        "Find overrides or arguments that cause Ansible to use a different inventory source.",
      commands: [
        "ansible --version",
        "ansible-config dump --only-changed",
        "printf 'ANSIBLE_CONFIG=%s\\n' \"${ANSIBLE_CONFIG:-<unset>}\"",
        "printf 'ANSIBLE_INVENTORY=%s\\n' \"${ANSIBLE_INVENTORY:-<unset>}\"",
        "git diff -- ansible.cfg inventory/"
      ],
      expectedEvidence: [
        "The selected configuration file is known.",
        "Relevant changed settings can be inspected.",
        "The exact inventory argument and effective pipeline values are recorded."
      ],
      interpretation: [
        "A configuration default may differ from the inventory explicitly supplied by the pipeline.",
        "Command-line arguments, configuration defaults, and environment-specific behavior must be evaluated in the context of the actual invocation.",
        "Do not assume a variable is active simply because it exists in the environment."
      ],
      nextAction: [
        "Identify the configuration or pipeline component that introduced the difference.",
        "Correct only the proven setting.",
        "Repeat the inventory graph and host-list checks."
      ]
    },
    {
      title: "5. Check dynamic inventory discovery",
      purpose:
        "Separate plugin, dependency, authentication, authorization, and provider connectivity failures.",
      commands: [
        "ansible-galaxy collection list",
        "ansible-inventory -i ./inventory/cloud.aws_ec2.yml --graph",
        "ansible-inventory -i ./inventory/cloud.aws_ec2.yml --list"
      ],
      expectedEvidence: [
        "Required plugin collections are installed.",
        "The plugin source is parsed and the provider query is attempted.",
        "Provider-specific errors, if present, are captured with secrets redacted."
      ],
      interpretation: [
        "A missing plugin or collection differs from a provider authentication failure.",
        "An access-denied response can indicate insufficient discovery permissions.",
        "A timeout may indicate network, DNS, endpoint, proxy, or provider availability problems.",
        "An empty result can also be legitimate if filters exclude all resources."
      ],
      nextAction: [
        "Use plugin-specific diagnostics to validate configuration and identity.",
        "Confirm required discovery permissions with the cloud or platform owner.",
        "Check filters, regions, accounts, and resource tags against the intended environment.",
        "Do not broaden filters until the approved target scope is understood."
      ]
    },
    {
      title: "6. Verify permissions and execution identity",
      purpose:
        "Check whether the runtime user can access the inventory and its parent directories.",
      commands: [
        "id",
        "test -r ./inventory/production.ini && echo READABLE || echo NOT_READABLE",
        "namei -l ./inventory/production.ini"
      ],
      expectedEvidence: [
        "The runtime identity is known.",
        "The file is readable or the permission failure is reproduced.",
        "Parent-directory traversal permissions can be reviewed where namei is available."
      ],
      interpretation: [
        "A readable file can still contain invalid inventory data.",
        "A permission problem may arise from a different CI user, container mount, or restrictive directory permissions.",
        "Changing permissions broadly can create a security incident."
      ],
      nextAction: [
        "Confirm the minimum required access with the file owner.",
        "Apply the approved least-privilege correction.",
        "Repeat the read-only inventory validation."
      ]
    },
    {
      title: "7. Confirm the final deployment scope",
      purpose:
        "Ensure that the corrected source selects exactly the intended targets before execution.",
      commands: [
        "ansible-playbook -i ./inventory/production.ini deploy.yml --list-hosts",
        "ansible-playbook -i ./inventory/production.ini deploy.yml --syntax-check"
      ],
      expectedEvidence: [
        "The expected hosts appear in the final host list.",
        "The playbook passes its syntax check.",
        "The selected targets match the approved environment and release scope."
      ],
      interpretation: [
        "Syntax success does not prove connectivity or application readiness.",
        "The host list is the critical pre-deployment check for inventory selection.",
        "If the target count or identities are unexpected, stop and investigate."
      ],
      nextAction: [
        "Obtain any required production approval.",
        "Run the deployment using the approved command and target scope.",
        "Verify application health and the deployed release version."
      ]
    }
  ],

  rootCausePlaybooks: [
    {
      cause: "Incorrect relative inventory path",
      symptoms: [
        "The file exists in the repository but is missing from the runtime working directory.",
        "The command works locally but fails in CI."
      ],
      evidence: [
        "pwd points to an unexpected directory.",
        "The inventory existence test fails for the supplied relative path.",
        "The file is present at a different verified path."
      ],
      diagnosis: [
        "Compare the exact pipeline command with the repository layout.",
        "Check the job's working-directory and checkout settings.",
        "Confirm the intended path with the inventory owner."
      ],
      remediation: [
        "Correct the working directory or inventory argument using a verified path.",
        "Keep the approved production source and target restrictions.",
        "Do not switch to a different environment's inventory as a workaround."
      ],
      validation: [
        "Run ansible-inventory --graph with the corrected source.",
        "Run the playbook with --list-hosts.",
        "Confirm the final target set with the release owner."
      ],
      rollbackConsiderations: [
        "Restore the previous pipeline path if the correction causes unintended selection.",
        "Do not rerun deployment until the expected targets are confirmed."
      ],
      prevention: [
        "Add a preflight check for the inventory path.",
        "Document the expected checkout layout.",
        "Test pipeline changes against the actual CI filesystem."
      ]
    },
    {
      cause: "Inventory file missing from the selected Git commit",
      symptoms: [
        "The path is absent from the checkout.",
        "The pipeline uses a commit that differs from the expected release revision."
      ],
      evidence: [
        "git rev-parse HEAD identifies an unexpected revision.",
        "git ls-files does not show the expected inventory file.",
        "The last successful commit contains a different inventory layout."
      ],
      diagnosis: [
        "Compare the failing revision with the last successful revision.",
        "Inspect relevant commits and repository changes.",
        "Confirm whether the inventory is intended to be tracked, generated, or supplied externally."
      ],
      remediation: [
        "Restore or select the approved inventory source through the repository's change process.",
        "Correct the checkout revision if the pipeline used the wrong commit.",
        "Avoid committing secrets or environment-specific credentials into the repository."
      ],
      validation: [
        "Confirm the intended file is available in the job workspace.",
        "Run inventory parsing and host-list validation.",
        "Confirm the selected revision is the intended release."
      ],
      rollbackConsiderations: [
        "If a release commit removed a required inventory file, consider reverting that change through the normal review process.",
        "Check whether other files in the same change are required before reverting the commit."
      ],
      prevention: [
        "Add CI checks for required inventory files.",
        "Review inventory path changes with pipeline owners.",
        "Validate generated and externally mounted inventories explicitly."
      ]
    },
    {
      cause: "Invalid INI or YAML inventory syntax",
      symptoms: [
        "The source exists but Ansible reports a parsing error.",
        "Groups or hosts are absent from the effective inventory."
      ],
      evidence: [
        "ansible-inventory reports a parser error or warning.",
        "The file changed shortly before the incident.",
        "The graph differs from the expected inventory structure."
      ],
      diagnosis: [
        "Inspect the parser's exact filename and line reference when available.",
        "Review recent changes to indentation, group headers, host entries, and variable definitions.",
        "Compare the source with a known-good version without exposing sensitive values."
      ],
      remediation: [
        "Correct the syntax error in the appropriate source file.",
        "Use the format expected by the configured inventory source.",
        "Avoid making broad structural changes during incident recovery."
      ],
      validation: [
        "Run ansible-inventory --list.",
        "Run ansible-inventory --graph.",
        "Run the playbook with --list-hosts."
      ],
      rollbackConsiderations: [
        "Restore the last known-good inventory version if the correction cannot be safely validated.",
        "Revalidate target scope after any rollback."
      ],
      prevention: [
        "Add inventory validation to CI.",
        "Require review for production inventory changes.",
        "Keep a known-good version and change history."
      ]
    },
    {
      cause: "Dynamic inventory plugin or collection unavailable",
      symptoms: [
        "Static inventory sources work but a dynamic source fails.",
        "The error references an unavailable plugin, collection, or unsupported source."
      ],
      evidence: [
        "The configured source uses a plugin that is not installed or cannot be loaded.",
        "The collection list differs between local and CI execution.",
        "The error identifies a plugin configuration or compatibility problem."
      ],
      diagnosis: [
        "Inspect the configured plugin source and the Ansible runtime version.",
        "Check installed collection versions.",
        "Compare the execution environment with the last successful run."
      ],
      remediation: [
        "Install or pin the documented dependency through the approved build process.",
        "Correct the plugin configuration using its supported schema.",
        "Avoid installing arbitrary latest versions during a production incident."
      ],
      validation: [
        "Run the dynamic inventory command with the intended source.",
        "Confirm expected groups and hosts are returned.",
        "Validate the final playbook host list."
      ],
      rollbackConsiderations: [
        "Restore the previous tested runtime or dependency lock if a new version introduced incompatibility.",
        "Do not switch production to an unverified static inventory without explicit approval."
      ],
      prevention: [
        "Pin and test Ansible and collection versions.",
        "Build repeatable execution environments.",
        "Validate dynamic inventory in CI before deployment."
      ]
    },
    {
      cause: "Dynamic inventory authentication or authorization failure",
      symptoms: [
        "The plugin loads but provider discovery fails.",
        "The response indicates unauthorized or forbidden access.",
        "Discovery works for one runner identity but fails for another."
      ],
      evidence: [
        "Provider-specific logs identify an authentication or permission failure.",
        "The runtime identity differs from the approved identity.",
        "Required discovery permissions are missing or have changed."
      ],
      diagnosis: [
        "Confirm the identity used by the inventory process through approved provider tooling.",
        "Check credential expiry and required read-only discovery permissions.",
        "Review provider audit logs when available."
      ],
      remediation: [
        "Restore the approved identity or credential delivery mechanism.",
        "Grant only the documented minimum discovery permissions through the normal access process.",
        "Never print, paste, or commit secret credentials to debug the failure."
      ],
      validation: [
        "Run inventory discovery using the approved identity.",
        "Confirm the expected resource set and groups.",
        "Run the playbook with --list-hosts."
      ],
      rollbackConsiderations: [
        "Revert unauthorized identity or policy changes through the approved security process.",
        "Do not bypass access controls by using a personal administrator credential."
      ],
      prevention: [
        "Use managed identities or approved short-lived credentials where supported.",
        "Monitor inventory authentication failures.",
        "Audit permission and credential changes."
      ]
    },
    {
      cause: "Inventory file permission or mount problem",
      symptoms: [
        "The file exists but the runner cannot read it.",
        "The issue occurs only inside a container or CI runner.",
        "The parent directory blocks traversal."
      ],
      evidence: [
        "The read test fails under the actual execution identity.",
        "File ownership or mount configuration differs from the expected setup.",
        "The error references permission denied or an inaccessible path."
      ],
      diagnosis: [
        "Inspect the runtime user and the file's access permissions.",
        "Check parent directory permissions and container mount settings.",
        "Compare with the approved runner configuration."
      ],
      remediation: [
        "Apply the minimum approved read and traversal permissions.",
        "Correct the mount or ownership configuration when that is the proven cause.",
        "Do not make secret files globally readable."
      ],
      validation: [
        "Repeat the file read test under the same runtime identity.",
        "Run inventory parsing and host-list checks.",
        "Confirm that no unintended users gained access."
      ],
      rollbackConsiderations: [
        "Revert an overly broad permission change immediately through the approved process.",
        "Revalidate access to sensitive inventory material."
      ],
      prevention: [
        "Use documented file ownership and permissions.",
        "Test container mounts in CI.",
        "Audit access changes for sensitive inventory sources."
      ]
    }
  ],

  inventoryConcepts: [
    {
      name: "Inventory path versus host pattern",
      explanation:
        "The inventory source tells Ansible where to discover hosts. The hosts expression tells the playbook which discovered hosts to target.",
      troubleshootingUse:
        "If the source cannot be loaded, investigate paths and parsing. If it loads but selects no hosts, investigate group names, host patterns, and limits."
    },
    {
      name: "Static versus dynamic inventory",
      explanation:
        "Static inventory reads declared hosts and groups, while dynamic inventory discovers resources through a supported source or plugin.",
      troubleshootingUse:
        "A static file-not-found error requires filesystem investigation; a dynamic source may require plugin, credential, permission, filter, or provider-connectivity investigation."
    },
    {
      name: "Explicit inventory versus configuration default",
      explanation:
        "An explicit -i argument and Ansible configuration defaults can influence which inventory source is used. The effective invocation determines what is actually loaded.",
      troubleshootingUse:
        "Capture the exact command and inspect ansible --version and relevant configuration before assuming the default inventory is active."
    },
    {
      name: "Inventory graph versus playbook target list",
      explanation:
        "The graph shows inventory group structure, while the playbook host list shows the hosts selected for each play.",
      troubleshootingUse:
        "Compare both outputs to distinguish discovery problems from host-pattern and limit mismatches."
    },
    {
      name: "Inventory cache versus current provider state",
      explanation:
        "Dynamic inventory plugins may cache discovered data according to plugin configuration and supported cache controls.",
      troubleshootingUse:
        "Compare cached and fresh discovery using documented plugin procedures. Invalidate cache only when evidence supports stale data."
    },
    {
      name: "Target count versus deployment success",
      explanation:
        "A nonempty target list proves host selection, not that connections succeed or tasks complete successfully.",
      troubleshootingUse:
        "After confirming the target list, separately validate connectivity, task execution, and application health."
    }
  ],

  decisionTree: [
    {
      symptom: "Ansible says the inventory file cannot be found.",
      evidence: "The exact file path is absent from the process working directory.",
      likelyCause: "Incorrect relative path, checkout layout, or missing artifact.",
      nextAction:
        "Confirm pwd and the approved source path; correct the path or restore the expected artifact."
    },
    {
      symptom: "The file exists but Ansible cannot parse it.",
      evidence: "The inventory command reports a parser or plugin error.",
      likelyCause: "Invalid syntax, wrong source format, or plugin configuration error.",
      nextAction:
        "Inspect the exact error, validate the source format, and correct the smallest proven defect."
    },
    {
      symptom: "The inventory graph is empty.",
      evidence: "The source is accepted but expected groups and hosts are absent.",
      likelyCause: "Empty source, discovery filters, plugin failure, or wrong source.",
      nextAction:
        "Confirm the source and inspect dynamic discovery, filters, and provider responses."
    },
    {
      symptom: "The graph contains hosts but the playbook selects zero.",
      evidence: "ansible-inventory --graph is populated while --list-hosts is empty.",
      likelyCause: "Host-pattern mismatch, wrong group name, or restrictive limit.",
      nextAction:
        "Compare the playbook hosts expression and effective limit with the graph."
    },
    {
      symptom: "Dynamic inventory returns access denied.",
      evidence: "Provider diagnostics show an authorization or authentication failure.",
      likelyCause: "Wrong identity, expired credential, or insufficient discovery permissions.",
      nextAction:
        "Verify the approved runtime identity and minimum required permissions without exposing credentials."
    },
    {
      symptom: "Inventory works locally but fails in CI.",
      evidence: "The file layout, runtime identity, configuration, or dependency set differs.",
      likelyCause: "Runner working directory, mount, permissions, dependency, or credential differences.",
      nextAction:
        "Compare the failing runtime against the last successful pipeline and isolate the first difference."
    }
  ],

  recoveryWorkflow: [
    {
      phase: "Phase 1 — Stabilize",
      actions: [
        "Pause unsafe retries when the intended target scope is uncertain.",
        "Record the failing run and determine whether any earlier stage changed systems.",
        "Notify the release owner and inventory owner as appropriate."
      ],
      successCriteria: [
        "Incident scope is understood.",
        "Logs and configuration evidence are preserved.",
        "An authorized owner is responsible for the recovery."
      ]
    },
    {
      phase: "Phase 2 — Isolate",
      actions: [
        "Check working directory and repository commit.",
        "Check the exact inventory path and file permissions.",
        "Validate the source with ansible-inventory.",
        "Inspect effective configuration and the final playbook host list.",
        "Investigate plugin and provider errors when dynamic discovery is involved."
      ],
      successCriteria: [
        "A specific root cause is supported by evidence.",
        "Alternative causes have been distinguished from the confirmed failure.",
        "The proposed fix is limited to the proven defect."
      ]
    },
    {
      phase: "Phase 3 — Correct",
      actions: [
        "Make the approved minimal correction.",
        "Keep access controls, environment boundaries, and deployment limits intact.",
        "Review the diff before the production rerun."
      ],
      successCriteria: [
        "The correction has the required review or approval.",
        "No unrelated configuration changes are included.",
        "The expected inventory source is preserved."
      ]
    },
    {
      phase: "Phase 4 — Validate",
      actions: [
        "Run inventory parsing and graph checks.",
        "Run playbook syntax and host-list checks.",
        "Compare the final host list against the approved target scope.",
        "Confirm the deployment command and release revision."
      ],
      successCriteria: [
        "The inventory loads successfully.",
        "The selected hosts match the intended scope.",
        "The deployment is authorized to proceed."
      ]
    },
    {
      phase: "Phase 5 — Recover and verify",
      actions: [
        "Execute the approved deployment command.",
        "Inspect the play recap and task failures.",
        "Verify the release version and application health.",
        "Use the documented rollback procedure if a harmful partial change is confirmed."
      ],
      successCriteria: [
        "The intended release is present.",
        "Application health checks pass.",
        "The incident owner records the outcome."
      ]
    }
  ],

  prevention: [
    {
      area: "CI/CD preflight",
      practices: [
        "Fail the pipeline if a required inventory source is absent.",
        "Run ansible-inventory --graph against the intended source.",
        "Run ansible-playbook --list-hosts before deployment.",
        "Assert that the expected production group contains the expected target set.",
        "Fail closed when the inventory is empty or the target count is unexpected."
      ]
    },
    {
      area: "Repository governance",
      practices: [
        "Review inventory path changes together with pipeline changes.",
        "Validate INI and YAML inventory changes in CI.",
        "Maintain clear ownership for shared inventory sources.",
        "Keep environment-specific inventory boundaries explicit.",
        "Avoid committing credentials or decrypted secrets."
      ]
    },
    {
      area: "Dynamic inventory reliability",
      practices: [
        "Pin tested Ansible and collection versions.",
        "Monitor provider discovery errors and authentication failures.",
        "Validate discovery filters, accounts, regions, and resource tags.",
        "Document supported cache behavior and recovery procedures.",
        "Use approved identities with minimum required discovery permissions."
      ]
    },
    {
      area: "Operational monitoring",
      practices: [
        "Alert when a production deployment unexpectedly selects zero hosts.",
        "Record the inventory source, commit SHA, environment, and selected target count.",
        "Distinguish 'no targets selected' from 'deployment completed successfully'.",
        "Retain enough logs to compare a failed run with the last successful run.",
        "Keep production approvals and change records auditable."
      ]
    }
  ],

  commonMistakes: [
    {
      mistake: "Removing --limit to force a deployment to run.",
      whyItFails:
        "It can expand the deployment to hosts that were never approved for the change.",
      betterApproach:
        "Validate the effective limit and intended target scope, then correct the exact mismatch."
    },
    {
      mistake: "Replacing the missing inventory with another environment's inventory.",
      whyItFails:
        "A successful run can change the wrong systems and create a cross-environment incident.",
      betterApproach:
        "Restore or locate the approved source and confirm the final host list before deployment."
    },
    {
      mistake: "Changing permissions to 777.",
      whyItFails:
        "It grants excessive access and may expose inventory data or credentials.",
      betterApproach:
        "Apply the minimum required file-read and parent-directory traversal permissions."
    },
    {
      mistake: "Assuming a syntax check proves deployment readiness.",
      whyItFails:
        "Syntax validation does not prove cloud authentication, host discovery, connectivity, or application health.",
      betterApproach:
        "Validate inventory parsing, final host selection, runtime prerequisites, and post-deployment health separately."
    },
    {
      mistake: "Printing the full environment to debug dynamic inventory.",
      whyItFails:
        "Environment dumps can leak tokens, passwords, and other credentials into persistent CI logs.",
      betterApproach:
        "Inspect only specific non-secret configuration values and use approved identity diagnostics."
    },
    {
      mistake: "Clearing all inventory caches immediately.",
      whyItFails:
        "It may remove useful state, create provider load, or obscure evidence without addressing the root cause.",
      betterApproach:
        "Establish whether stale cache data is responsible and follow the plugin's documented cache controls."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Incident title: Ansible inventory discovery or host-selection failure",
    "Environment:",
    "Affected application or service:",
    "Severity and business impact:",
    "Incident start time and detection time:",
    "Pipeline run ID:",
    "Repository and commit SHA:",
    "Ansible version and selected configuration:",
    "Exact inventory source and invocation:",
    "Observed error:",
    "Last successful run:",
    "Evidence collected:",
    "Confirmed root cause:",
    "Contributing factors:",
    "Corrective change and approver:",
    "Validation commands and results:",
    "Final target list reviewed by:",
    "Deployment result:",
    "Application health verification:",
    "Rollback decision and rationale:",
    "Prevention actions and owners:",
    "Follow-up due dates:"
  ],

  productionRunbook: [
    {
      phase: "Detect and triage",
      checklist: [
        "Record the failing pipeline run and exact error.",
        "Confirm the environment and release revision.",
        "Determine whether any earlier task or stage changed systems.",
        "Pause unsafe retries if the target scope is uncertain."
      ]
    },
    {
      phase: "Collect evidence",
      checklist: [
        "Record pwd, repository root, and commit SHA.",
        "Capture Ansible version and selected configuration.",
        "Verify the inventory source path and runtime permissions.",
        "Preserve the inventory graph, parser errors, and final host-list output.",
        "Redact sensitive values before sharing logs."
      ]
    },
    {
      phase: "Isolate root cause",
      checklist: [
        "Distinguish missing file from parse failure.",
        "Distinguish static inventory from dynamic discovery.",
        "Check required groups and parent-child membership.",
        "Inspect the playbook host pattern and effective limit.",
        "Compare the failing run with the last successful run."
      ]
    },
    {
      phase: "Recover safely",
      checklist: [
        "Obtain required approval for production configuration changes.",
        "Apply the smallest correction supported by evidence.",
        "Validate inventory parsing and the exact host list.",
        "Run only the approved deployment command.",
        "Verify release version, service health, and incident records."
      ]
    }
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Missing relative path",
      objective:
        "Learn to distinguish a wrong working directory from a missing inventory file.",
      steps: [
        "Create a test repository with an inventory directory.",
        "Place a valid inventory file in the expected directory.",
        "Run an inventory command from the repository root.",
        "Change into a nested directory and repeat using the same relative path.",
        "Compare pwd and file-existence results."
      ],
      expectedFinding:
        "The same relative path can resolve differently when the working directory changes.",
      solution: [
        "Use the intended working directory or a verified path.",
        "Validate the source with ansible-inventory --graph.",
        "Add a CI preflight check for the required file."
      ]
    },
    {
      title: "Lab 2 — Group mismatch",
      objective:
        "Distinguish a populated inventory from a playbook that selects no hosts.",
      steps: [
        "Create a test inventory with a group named web.",
        "Create a test playbook that targets a different group name.",
        "Run ansible-inventory --graph.",
        "Run ansible-playbook --list-hosts.",
        "Compare the graph with the playbook host pattern."
      ],
      expectedFinding:
        "The inventory can contain hosts while the playbook's pattern selects none.",
      solution: [
        "Correct the host pattern only after confirming the intended group.",
        "Repeat --list-hosts.",
        "Do not run a deployment until the selected targets are verified."
      ]
    },
    {
      title: "Lab 3 — Invalid inventory syntax",
      objective:
        "Learn to use parser evidence instead of guessing at the inventory format.",
      steps: [
        "Create a disposable INI inventory.",
        "Introduce an invalid group header or malformed entry.",
        "Run ansible-inventory --list.",
        "Capture the parser error.",
        "Correct the syntax and repeat the command."
      ],
      expectedFinding:
        "An existing file may still fail to load because its contents are invalid.",
      solution: [
        "Fix the specific syntax defect.",
        "Validate the inventory graph.",
        "Add the test to CI so future malformed changes are detected."
      ]
    },
    {
      title: "Lab 4 — Dynamic inventory permissions",
      objective:
        "Understand the difference between a plugin loading successfully and the provider authorizing discovery.",
      steps: [
        "Use a sandbox provider account and a documented inventory plugin.",
        "Run discovery using an approved least-privilege identity.",
        "Record the non-secret provider error when access is denied.",
        "Compare required permissions with the test identity's permissions.",
        "Correct the sandbox policy and repeat discovery."
      ],
      expectedFinding:
        "Plugin availability and provider authorization are separate prerequisites.",
      solution: [
        "Use the documented authentication method.",
        "Grant only required discovery permissions.",
        "Validate returned hosts and group membership."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is the difference between inventory not found and no hosts matched?",
      answer:
        "Inventory not found indicates that the intended source cannot be located or loaded. No hosts matched usually means the loaded inventory and the host pattern do not produce targets, although the exact error and Ansible version must be checked.",
      followUp:
        "Which commands would you use to separate these conditions? Start with ansible-inventory --graph and ansible-playbook --list-hosts."
    },
    {
      question: "Why does inventory work locally but fail in CI?",
      answer:
        "The environments can differ in working directory, checkout revision, mounts, file permissions, Ansible configuration, installed collections, cloud identity, or provider connectivity.",
      followUp:
        "How would you identify the first meaningful difference between the failing run and the last successful run?"
    },
    {
      question: "Does --syntax-check prove that the inventory is correct?",
      answer:
        "No. Syntax checking is not a substitute for validating the effective inventory source, host discovery, group matching, runtime credentials, or connectivity.",
      followUp:
        "Which additional read-only checks would you run before a production deployment?"
    },
    {
      question: "How would you troubleshoot an empty dynamic inventory?",
      answer:
        "Check the configured plugin source, installed collection, plugin configuration, provider identity, permissions, discovery filters, account or region selection, connectivity, and documented cache behavior.",
      followUp:
        "How would you distinguish a legitimate empty result from a permission failure?"
    },
    {
      question: "Why is removing --limit dangerous?",
      answer:
        "The limit may be an important safety boundary. Removing it can expand execution beyond the intended hosts and cause an unintended production change.",
      followUp:
        "How would you prove that a corrected limit selects only the approved target set?"
    },
    {
      question: "How do you safely recover a production inventory incident?",
      answer:
        "Preserve evidence, establish impact and partial changes, isolate the root cause, obtain approval, apply a minimal fix, validate the inventory and final host list, execute the approved deployment, and verify application health.",
      followUp:
        "What evidence would justify a rollback instead of another deployment attempt?"
    }
  ],

  references: [
    {
      title: "Ansible inventory guide",
      url: "https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html"
    },
    {
      title: "Ansible inventory plugins",
      url: "https://docs.ansible.com/ansible/latest/plugins/inventory.html"
    },
    {
      title: "Ansible configuration settings",
      url: "https://docs.ansible.com/ansible/latest/reference_appendices/config.html"
    },
    {
      title: "ansible-inventory command documentation",
      url: "https://docs.ansible.com/ansible/latest/cli/ansible-inventory.html"
    },
    {
      title: "ansible-playbook command documentation",
      url: "https://docs.ansible.com/ansible/latest/cli/ansible-playbook.html"
    },
    {
      title: "Ansible Galaxy collection documentation",
      url: "https://docs.ansible.com/ansible/latest/galaxy/user_guide.html"
    }
  ]
};
