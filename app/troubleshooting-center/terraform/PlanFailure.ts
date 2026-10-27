
export const planFailureGuide = {
  id: "terraform-plan-failure",
  title: "Terraform Plan Failure",
  category: "Terraform",
  summary:
    "Troubleshoot Terraform planning failures across configuration, providers, " +
    "remote state, authentication, data sources, drift, quotas, and policy checks.",

  incidentScenario: {
    title: "Infrastructure deployment pipeline suddenly fails at terraform plan",
    symptoms: [
      "CI pipeline fails before approval or apply",
      "Terraform reports missing variables or invalid configuration",
      "Provider authentication or backend initialization fails",
      "Data sources cannot read existing cloud resources",
      "Plan fails after a provider, module, or Terraform version upgrade",
      "A dependency cycle or invalid resource reference appears",
      "Policy-as-code checks reject the generated plan",
      "A previously successful plan now reports unexpected drift or replacements",
    ],
    possibleTriggers: [
      "Incorrect working directory or root module",
      "Missing, renamed, or incorrectly typed variables",
      "Wrong workspace, backend key, account, subscription, or region",
      "Expired credentials or insufficient provider permissions",
      "Backend network, encryption, permissions, or locking failure",
      "Provider schema or module interface change",
      "Unavailable data source, missing resource, or API throttling",
      "Dependency cycle or invalid reference",
      "Cloud quota, service health, DNS, or network issue",
      "Unreviewed infrastructure changes made outside Terraform",
      "Sentinel, OPA, Checkov, or custom policy gate failure",
      "Different variable files, environment variables, or tool versions in CI",
    ],
  },

  impactAndSeverity: {
    assess: [
      "Which environment, root module, workspace, and backend key failed?",
      "Is only the pipeline blocked, or is an active production incident also occurring?",
      "Did the failure happen during init, validate, refresh, plan, or a policy gate?",
      "Was any earlier apply partially completed?",
      "Are urgent production changes or disaster recovery actions blocked?",
      "Does the plan indicate unintended deletion or replacement?",
      "Are multiple teams affected by a shared provider or backend problem?",
    ],
    severity: {
      SEV1:
        "Critical production recovery is blocked or an immediate security/data risk exists.",
      SEV2:
        "Important production infrastructure changes are blocked or service recovery is delayed.",
      SEV3:
        "Non-production planning failure without significant customer impact.",
    },
    rule:
      "Classify severity using real service impact, security risk, and recovery urgency—not just the Terraform exit code.",
  },

  safetyChecks: [
    "Confirm repository, commit SHA, working directory, root module, and Terraform version.",
    "Verify cloud account, region, identity, workspace, and remote backend.",
    "Capture the first meaningful error and complete pipeline logs.",
    "Check whether another apply is active against the same state.",
    "Use the same approved variable inputs and environment as the failed pipeline.",
    "Do not apply a plan with unexplained destructive or replacement actions.",
    "Do not disable validation, security policies, or state locking just to pass CI.",
    "Do not delete state files or manually modify state to bypass a plan error.",
    "Treat plan files, state, logs, and environment dumps as potentially sensitive.",
    "Use read-only diagnostics first and follow production approval requirements.",
  ],

  evidenceCollection: {
    capture: [
      "Full error output and failing pipeline stage",
      "Commit SHA, branch, pull request, and recent Git changes",
      "Terraform CLI and provider versions",
      "Module sources and .terraform.lock.hcl changes",
      "Working directory and selected workspace",
      "Backend type and non-secret backend identifiers",
      "Variable source names and required input names",
      "Provider identity and relevant cloud audit event",
      "Data source names, API errors, request IDs, and timestamps",
      "Policy check output and policy version",
      "Recent cloud changes and state-backend health",
    ],
    commands: [
      "terraform version",
      "terraform workspace show",
      "terraform providers",
      "git rev-parse HEAD",
      "git status --short",
      "git diff --check",
      "git diff --stat",
    ],
    caution:
      "Do not use env, printenv, or unredacted debug logs as routine evidence collection; " +
      "they may expose credentials and secret variables.",
  },

  diagnosticSequence: [
    {
      step: 1,
      name: "Confirm the target and pipeline context",
      commands: [
        "terraform version",
        "terraform workspace show",
        "git rev-parse HEAD",
        "git status --short",
      ],
      checks: [
        "Correct repository and commit",
        "Correct root module and working directory",
        "Correct cloud account, subscription, region, and workspace",
        "Correct variable files and pipeline identity",
        "No competing apply is active against the same state",
      ],
      interpretation: {
        wrongTarget:
          "Stop and correct the pipeline target before any state-changing operation.",
        unexpectedVersion:
          "Compare the installed Terraform and provider versions with the approved toolchain.",
        wrongDirectory:
          "Run commands from the intended root module, not an unrelated repository directory.",
      },
    },
    {
      step: 2,
      name: "Classify the exact failing stage",
      stages: [
        {
          stage: "Initialization",
          signatures: [
            "Backend initialization required",
            "Provider installation failure",
            "Registry or module download error",
            "State backend access denied",
          ],
          investigate:
            "Backend configuration, credentials, network connectivity, provider lock file, and module sources.",
        },
        {
          stage: "Formatting or validation",
          signatures: [
            "Invalid HCL syntax",
            "Unsupported argument",
            "Missing required argument",
            "Invalid reference or type mismatch",
          ],
          investigate:
            "HCL syntax, module inputs, provider schemas, resource arguments, and expression types.",
        },
        {
          stage: "Refresh or planning",
          signatures: [
            "Error retrieving resource",
            "Data source read failure",
            "Unauthorized or forbidden API",
            "Dependency cycle",
            "Timeout or API throttling",
          ],
          investigate:
            "Provider identity, cloud API, network, resource existence, dependency graph, and service health.",
        },
        {
          stage: "Policy or approval",
          signatures: [
            "Policy violation",
            "Disallowed resource configuration",
            "Plan rejected by governance rules",
          ],
          investigate:
            "Policy output, violated rule, approved exception process, and the actual proposed change.",
        },
      ],
    },
    {
      step: 3,
      name: "Run formatting and static validation",
      commands: [
        "terraform fmt -check -recursive",
        "terraform validate",
      ],
      interpretation: {
        fmtFailure:
          "Review formatting differences and apply formatting to intended Terraform files.",
        validateFailure:
          "Fix syntax, type, reference, or provider-schema errors before investigating cloud API issues.",
        validatePass:
          "Continue to initialization, identity, backend, and plan diagnostics; validation success does not prove a plan will succeed.",
      },
      note:
        "terraform validate requires an initialized working directory. Initialize providers and modules using the repository's approved process.",
    },
    {
      step: 4,
      name: "Inspect variables and inputs",
      checks: [
        "Are all required input variables supplied?",
        "Do variable names match the module declarations?",
        "Are object types, lists, maps, and nullable values correct?",
        "Is CI using the intended tfvars file?",
        "Are TF_VAR environment variables set by the approved secret mechanism?",
        "Are environment-specific inputs missing or accidentally inherited?",
        "Are sensitive values being passed without appearing in logs?",
      ],
      commands: [
        "terraform plan -input=false -var-file=ENVIRONMENT.tfvars",
      ],
      caution:
        "Replace the variable file placeholder with the approved file. This command may still fail and is not an instruction to apply changes. Do not put secrets directly on the command line.",
    },
    {
      step: 5,
      name: "Verify provider identity and cloud permissions",
      awsCommands: [
        "aws sts get-caller-identity",
        "aws configure get region",
      ],
      checks: [
        "The identity is the one used by the pipeline",
        "The correct account and region are selected",
        "The role has permissions to read resources used during refresh and data-source evaluation",
        "Trust policies, permission boundaries, SCPs, and resource policies allow required actions",
        "Credentials have not expired",
        "Provider aliases point to the intended account or region",
      ],
      interpretation: {
        wrongIdentity:
          "Correct the provider or CI identity before retrying the plan.",
        accessDenied:
          "Identify the exact denied API action and resource before requesting a narrow permission change.",
        providerAliasMismatch:
          "Trace provider aliases through module configuration and confirm each module uses the intended provider.",
      },
      note:
        "AWS commands are examples for AWS providers. Use equivalent identity and permission checks for Azure, GCP, or other providers.",
    },
    {
      step: 6,
      name: "Check backend and remote state access",
      checks: [
        "Is the configured backend reachable?",
        "Are backend credentials separate from provider credentials where required?",
        "Are object storage permissions and encryption/KMS permissions correct?",
        "Is the state lock owned by an active run?",
        "Has the backend key, workspace mapping, or configuration changed?",
        "Are state object versions or backups available?",
      ],
      commands: [
        "terraform init -lockfile=readonly",
        "terraform workspace show",
        "terraform state list",
      ],
      interpretation: {
        initFailure:
          "Resolve backend or provider initialization issues before planning.",
        stateReadFailure:
          "Restore safe state access before further state-changing operations.",
        lockContention:
          "Confirm the lock owner and active-run status. Do not force-unlock blindly.",
      },
      caution:
        "terraform init -lockfile=readonly is useful where the lock file is expected to remain unchanged; follow the repository's initialization process if provider installation or lock-file updates are intentionally required.",
    },
    {
      step: 7,
      name: "Investigate data source and cloud API failures",
      checks: [
        "Does the referenced cloud resource exist in the intended account and region?",
        "Does the pipeline identity have permission to read it?",
        "Is the data source name, filter, identifier, or region correct?",
        "Did the resource change outside Terraform?",
        "Is the service experiencing an outage, rate limit, or eventual-consistency delay?",
        "Does the error include a request ID that can be correlated with audit logs?",
      ],
      interpretation: {
        notFound:
          "Verify the identifier, filters, account, region, and whether the resource was deleted.",
        throttled:
          "Use bounded retries/backoff where supported and reduce excessive concurrency if appropriate.",
        timeout:
          "Check network reachability and remote service status; a timeout does not always mean the request had no effect.",
      },
    },
    {
      step: 8,
      name: "Investigate provider and module version drift",
      commands: [
        "terraform providers",
        "git diff -- .terraform.lock.hcl",
        "git diff -- '*.tf'",
      ],
      checks: [
        "Provider version changed unexpectedly",
        "A module source or version changed",
        "An argument was removed or changed in the provider schema",
        "A module output or input type changed",
        "A resource lifecycle or replacement rule changed",
        "CI and developer environments use different tool versions",
      ],
      recovery:
        "Pin or revert a version only when evidence identifies the compatibility issue. Review the resulting plan before approval.",
    },
    {
      step: 9,
      name: "Check dependency graph and configuration references",
      commands: [
        "terraform graph -type=plan > dependency-graph.dot",
        "grep -RInE 'depends_on|for_each|count' --include='*.tf' .",
      ],
      checks: [
        "Circular references between resources",
        "Invalid module input/output relationships",
        "Data sources depending on resources that depend on those data sources",
        "Invalid collection keys or conditional expressions",
        "Unnecessary or contradictory depends_on declarations",
      ],
      note:
        "Use the graph as a diagnostic aid. Preserve the complete Terraform error and inspect actual HCL expressions and module sources.",
    },
    {
      step: 10,
      name: "Inspect drift and planned resource actions",
      commands: [
        "terraform plan -out=tfplan",
        "terraform show tfplan",
      ],
      checks: [
        "Unexpected delete or replacement actions",
        "Resources changed outside Terraform",
        "Differences between current state and remote infrastructure",
        "Unexpected provider defaults or computed values",
        "Changes to IAM, network rules, encryption, databases, or DNS",
      ],
      caution:
        "A saved plan may contain sensitive values. Protect the file and its output. Do not apply it until all actions are reviewed and approved.",
    },
    {
      step: 11,
      name: "Review policy and CI gate failures",
      checks: [
        "Which policy rule failed?",
        "Does the finding identify a real security or compliance issue?",
        "Is the policy using the expected plan artifact and version?",
        "Was a policy or exception changed recently?",
        "Does the organization's approved exception process apply?",
      ],
      rule:
        "Fix the configuration or use an authorized exception workflow. Do not disable policy gates merely to obtain a green build.",
    },
    {
      step: 12,
      name: "Compare with the last-known-good run",
      commands: [
        "git log --oneline -10",
        "git diff LAST_GOOD_COMMIT..HEAD -- '*.tf'",
      ],
      compare: [
        "HCL changes",
        "Provider and module versions",
        "Variable and backend changes",
        "IAM and data source changes",
        "CI runner image and environment changes",
        "Policy and validation configuration",
      ],
      rule:
        "A change that occurred before the failure is a lead, not proof. Confirm it using the exact error and supporting evidence.",
    },
  ],

  rootCauseMatrix: [
    {
      symptom: "Missing required variable",
      causes: ["Missing tfvars entry", "Wrong variable name", "CI environment mismatch"],
      evidence: ["Variable declaration", "Pipeline arguments", "Redacted input-source metadata"],
      fix: "Supply the correct typed input through the approved configuration or secret mechanism.",
    },
    {
      symptom: "Invalid argument or unsupported attribute",
      causes: ["HCL error", "Provider schema change", "Module interface mismatch"],
      evidence: ["validate output", "Provider lock file", "Module source and version"],
      fix: "Correct the configuration or use a reviewed compatible module/provider version.",
    },
    {
      symptom: "AccessDenied or Unauthorized",
      causes: ["Wrong identity", "Missing read permission", "Policy restriction"],
      evidence: ["Pipeline identity", "Cloud audit log", "Exact denied API action"],
      fix: "Correct the identity or grant only the required permission.",
    },
    {
      symptom: "Backend initialization or state read failure",
      causes: ["Backend outage", "Wrong key/workspace", "Credentials or KMS issue"],
      evidence: ["Backend error", "Workspace", "Backend health and access logs"],
      fix: "Restore correct backend access and confirm state integrity before retrying.",
    },
    {
      symptom: "Data source returns NotFound",
      causes: ["Wrong region/account", "Incorrect identifier", "Resource removed"],
      evidence: ["Data source filters", "Identity", "Read-only cloud resource lookup"],
      fix: "Correct the identifier or intended resource dependency after verification.",
    },
    {
      symptom: "Dependency cycle",
      causes: ["Circular resource references", "Module cycle", "Contradictory depends_on"],
      evidence: ["Complete cycle error", "HCL references", "Dependency graph"],
      fix: "Redesign the dependency relationship without removing required ordering.",
    },
    {
      symptom: "QuotaExceeded or API throttling",
      causes: ["Quota exhausted", "API request rate too high", "Regional service constraint"],
      evidence: ["Provider error", "Quota usage", "Request ID and audit events"],
      fix: "Resolve the specific capacity or rate-limit issue before a controlled retry.",
    },
    {
      symptom: "Unexpected resource replacement",
      causes: ["Immutable attribute changed", "Provider behavior changed", "Drift"],
      evidence: ["Plan diff", "Version changes", "Remote resource configuration"],
      fix: "Understand replacement semantics and downtime/data risk before approving the plan.",
    },
    {
      symptom: "Policy check fails",
      causes: ["Security violation", "Compliance rule", "Unexpected plan artifact"],
      evidence: ["Policy report", "Plan artifact identity", "Policy version"],
      fix: "Correct the violation or follow the authorized exception process.",
    },
  ],

  recoveryPlan: {
    sequence: [
      "Preserve the original error, pipeline metadata, and relevant logs.",
      "Confirm the correct environment, identity, workspace, and backend.",
      "Fix the specific proven configuration, permission, or service issue.",
      "Run formatting and validation checks.",
      "Generate a fresh plan using the correct environment inputs.",
      "Review every create, update, delete, and replacement action.",
      "Validate security, networking, IAM, encryption, and data-retention impact.",
      "Obtain required production approval.",
      "Apply only the approved plan through the normal pipeline.",
      "Verify real infrastructure, Terraform state, and application health.",
    ],
    rollback:
      "A plan failure alone generally does not require infrastructure rollback. If an earlier apply or another operator changed resources, assess those changes separately. Reverting code does not automatically reverse completed cloud operations.",
    neverDo: [
      "Do not use -target as a routine workaround for an unexplained plan failure.",
      "Do not use -refresh=false to hide drift or bypass a provider error without a justified diagnostic purpose.",
      "Do not disable state locking or security policy checks to make CI pass.",
      "Do not delete or manually edit remote state as a generic fix.",
      "Do not apply a plan with unexplained destructive changes.",
      "Do not expose state files, saved plans, credentials, or secret environment values.",
    ],
  },

  postRecoveryValidation: [
    "The intended pipeline run completes init, validate, plan, and policy checks.",
    "The plan contains only intended infrastructure actions.",
    "No unexpected replacement or deletion remains.",
    "Terraform state and real infrastructure are consistent.",
    "IAM, network access, encryption, and security policies remain correct.",
    "Critical application endpoints and health checks pass after any approved apply.",
    "Cloud audit logs contain no unexpected changes.",
    "The environment remains stable through the agreed monitoring window.",
  ],

  prevention: [
    "Pin Terraform, provider, and module versions.",
    "Commit and review .terraform.lock.hcl changes.",
    "Run terraform fmt -check and terraform validate in CI.",
    "Use consistent root modules, workspaces, and variable inputs across environments.",
    "Use remote state with appropriate locking, encryption, access control, and versioning.",
    "Serialize applies against the same state.",
    "Use least-privilege identities and short-lived credentials.",
    "Add policy-as-code and security scanning before production approval.",
    "Monitor backend errors, cloud API throttling, quota limits, and provider failures.",
    "Test provider and module upgrades in non-production environments.",
    "Keep sensitive plan and state artifacts access-controlled and short-lived.",
    "Maintain a runbook for backend recovery, imports, drift, and partial apply incidents.",
  ],

  incidentReportTemplate: {
    title: "Terraform Plan Failure Incident",
    fields: [
      "Incident ID, severity, owner, and timestamps",
      "Environment, account/subscription, region, workspace, and root module",
      "Repository, commit SHA, Terraform version, provider versions",
      "Failing stage and complete error message",
      "Affected resources and deployment/customer impact",
      "Backend, identity, data source, and policy findings",
      "Recent changes and root cause evidence",
      "Configuration correction and reviewed plan summary",
      "Approval and deployment outcome",
      "Post-recovery validation",
      "Preventive actions, owners, and due dates",
    ],
  },

  handsOnLabs: [
    {
      title: "Missing variable in CI",
      task:
        "Create a disposable Terraform root module with a required variable and omit it from the test pipeline.",
      expected:
        "Identify the missing input and fix the pipeline without exposing secrets.",
    },
    {
      title: "Provider identity mismatch",
      task:
        "Use a non-production test environment to simulate a wrong provider region or identity.",
      expected:
        "Identify the target mismatch before making any infrastructure changes.",
    },
    {
      title: "Dependency cycle",
      task:
        "Create a small circular reference in a disposable module and inspect the error and graph.",
      expected:
        "Explain the dependency loop and implement an acyclic design.",
    },
    {
      title: "Unexpected replacement",
      task:
        "Modify an immutable attribute in a disposable resource configuration and inspect the plan.",
      expected:
        "Identify the replacement and explain its potential downtime or data impact.",
    },
    {
      title: "Policy gate failure",
      task:
        "Run an approved test policy against a disposable plan with a known violation.",
      expected:
        "Identify the violated rule and correct the configuration rather than bypassing the gate.",
    },
  ],

  interviewQuestions: [
    {
      question: "Does terraform plan modify infrastructure?",
      answer:
        "Plan normally proposes changes without applying them, but it can refresh remote objects and call provider APIs.",
    },
    {
      question: "What is the difference between init, validate, and plan?",
      answer:
        "Init prepares the working directory and backend/providers, validate checks configuration consistency, and plan evaluates proposed changes against current information.",
    },
    {
      question: "Why can plan fail even if validate succeeds?",
      answer:
        "Plan may need credentials, backend access, remote resource reads, data sources, provider API calls, and a valid dependency graph.",
    },
    {
      question: "How do you troubleshoot AccessDenied during planning?",
      answer:
        "Verify the pipeline identity, exact denied API action, resource scope, audit logs, and policy restrictions.",
    },
    {
      question: "What does an unexpected replacement mean?",
      answer:
        "Terraform proposes replacing a resource, often because of an immutable argument or provider behavior. Review downtime, data, and dependency impact before approval.",
    },
    {
      question: "Why is -refresh=false not a universal fix?",
      answer:
        "It can omit refreshed information about remote changes and hide useful drift evidence; it does not fix the underlying issue.",
    },
    {
      question: "How should you handle a plan that fails after a provider upgrade?",
      answer:
        "Compare versions and lock-file changes, reproduce safely, identify the incompatibility, and review a plan after the approved correction.",
    },
    {
      question: "How do you prove a plan failure is resolved?",
      answer:
        "Confirm the correct environment, successful validation and plan, reviewed actions, policy compliance, and post-apply health where an apply was required.",
    },
  ],
} as const;

export default planFailureGuide;
