
export const providerErrorsGuide = {
  title: "Terraform Provider Errors",
  category: "Terraform",
  filePath: "app/troubleshooting-center/terraform/ProviderErrors.ts",
  difficulty: "Advanced / Production SRE",
  summary:
    "Diagnose Terraform provider installation, configuration, authentication, API, compatibility, runtime, state, and CI/CD failures using evidence-driven troubleshooting.",

  productionIncident: {
    scenario:
      "A production deployment pipeline that worked yesterday suddenly fails during terraform init, plan, or apply. Some runs fail before contacting the cloud API; others authenticate successfully but receive access denied, throttling, timeout, provider crash, or inconsistent state errors.",
    possibleSymptoms: [
      "Failed to query available provider packages",
      "Failed to install provider",
      "Provider configuration not present",
      "Provider produced inconsistent result after apply",
      "Error configuring Terraform AWS/AzureRM/Google provider",
      "ExpiredToken, InvalidClientTokenId, or authentication failure",
      "403 AccessDenied or authorization errors",
      "429 TooManyRequests or API throttling",
      "Request timeout, TLS handshake failure, or DNS resolution failure",
      "Provider plugin crashed or failed to start",
      "Required provider version does not match the lock file",
      "Plan succeeds locally but fails in CI/CD",
      "Resource was created but Terraform reports failure",
      "Provider upgrade causes a new plan or unexpected replacement",
    ],
    firstRule:
      "Classify the failure stage before changing configuration. A provider download failure, credential failure, API failure, and state consistency failure require different remediation.",
  },

  impactAndSeverity: {
    SEV1: [
      "Production changes are causing an outage or data loss",
      "A failed apply may have partially changed critical infrastructure",
      "State and actual infrastructure may disagree for critical resources",
    ],
    SEV2: [
      "Production deployments are blocked across multiple services",
      "Shared credentials, provider registry, or cloud API failures affect multiple teams",
    ],
    SEV3: [
      "One workspace, account, module, or non-production deployment is blocked",
    ],
    SEV4: [
      "A reproducible warning or isolated developer environment issue has no immediate impact",
    ],
    questions: [
      "Which account, subscription, project, region, workspace, and environment are affected?",
      "Did the failure occur during init, plan, apply, refresh, import, or destroy?",
      "Did Terraform make any changes before reporting the error?",
      "Is this a single resource, one module, one pipeline, or a fleet-wide failure?",
      "Is the same provider version failing for other teams?",
      "Is there an approved change window and incident owner?",
    ],
  },

  safetyChecks: {
    beforeRunningCommands: [
      "Confirm the repository, Git branch, commit SHA, working directory, and workspace.",
      "Confirm the intended cloud account, subscription, project, and region.",
      "Use the approved role and least-privilege identity; never paste credentials into logs.",
      "Check whether another pipeline or operator is modifying the same state.",
      "Preserve the failed run logs, timestamps, exit code, and redacted error message.",
      "Do not remove .terraform.lock.hcl to force a provider version change.",
      "Do not delete or manually edit the Terraform state to silence an error.",
      "Do not run force-unlock unless the lock is confirmed stale and the owner approves.",
      "Do not run destroy, replace, taint, or auto-approve as a diagnostic shortcut.",
      "Do not publish raw state files, crash logs, environment dumps, or plan files.",
    ],
    productionApproval:
      "Any action that can change or replace production resources must follow the organization's approval and change-management process.",
  },

  evidenceCollection: {
    capture: [
      "Incident ID, UTC timestamp, deployment run URL, stage, and exit code",
      "Repository, commit SHA, Terraform CLI version, OS, architecture, and runner image",
      "Provider source address, selected version, and lock-file checksums",
      "Relevant required_providers and provider configuration",
      "Sanitized terraform init/plan/apply error context",
      "Cloud request ID, correlation ID, HTTP status, and provider diagnostic details",
      "Identity ARN or principal ID where safe; never record secrets or tokens",
      "Network, DNS, proxy, certificate, registry, and endpoint status",
      "Recent provider, module, IAM, policy, backend, and CI image changes",
      "Terraform state lineage and serial from approved state metadata, if available",
    ],
    redaction:
      "Redact access tokens, client secrets, passwords, private keys, account-sensitive identifiers where required, and resource attributes that contain secrets.",
  },

  diagnosticDecisionTree: [
    {
      stage: "1. Terraform executable and runtime",
      symptoms: [
        "terraform command not found",
        "Unexpected CLI behavior",
        "Different results between workstation and runner",
      ],
      commands: [
        "terraform version",
        "terraform -help",
        "git status --short",
        "git rev-parse --show-toplevel",
        "git rev-parse HEAD",
      ],
      interpretation: [
        "If Terraform is missing, fix the runner image or tool installation first.",
        "If local and CI versions differ, compare the supported CLI and provider versions before changing infrastructure.",
        "If the wrong repository directory or commit is checked out, correct the pipeline checkout or working directory.",
      ],
    },
    {
      stage: "2. Provider initialization and installation",
      symptoms: [
        "Failed to query available provider packages",
        "Failed to install provider",
        "Could not retrieve the list of available versions",
        "Checksum verification failure",
      ],
      commands: [
        "terraform version",
        "terraform init -backend=false",
        "git diff -- .terraform.lock.hcl",
        "git status --short",
      ],
      interpretation: [
        "DNS, TLS, proxy, firewall, registry outage, or egress restrictions can block provider downloads.",
        "A provider mirror or private registry may be unavailable or incorrectly configured.",
        "Checksum errors require integrity investigation; do not bypass verification.",
        "A lock-file change may indicate an intentional dependency update or unexpected dependency resolution.",
      ],
      nextChecks: [
        "Read the exact hostname and URL from the error; confirm DNS and HTTPS connectivity using approved network tools.",
        "Check registry service status and internal mirror health.",
        "Inspect the CLI configuration for provider_installation, mirrors, and filesystem caches.",
        "Verify the lock file is committed and the runner uses the expected repository revision.",
        "Use terraform init -lockfile=readonly in CI where appropriate to detect unexpected lock-file changes.",
      ],
      caution:
        "terraform init -backend=false tests provider/module initialization without initializing the backend. It does not prove that remote state access works.",
    },
    {
      stage: "3. Required provider and version constraints",
      symptoms: [
        "No available releases match the given constraints",
        "Incompatible provider version",
        "Required provider configuration missing",
        "Provider selection differs between environments",
      ],
      commands: [
        "terraform providers",
        "terraform version",
        "git diff -- .terraform.lock.hcl",
        "git diff -- '*.tf'",
      ],
      interpretation: [
        "Compare required_providers constraints across root and child modules.",
        "Check whether the selected version satisfies every applicable constraint.",
        "Check whether a child module expects a provider alias that the root module does not pass.",
        "Do not assume the newest provider is automatically compatible with existing resources or modules.",
      ],
      safeFix: [
        "Choose a version that satisfies the declared constraints and organizational support policy.",
        "Review the provider changelog and upgrade guide.",
        "Run terraform init -upgrade only on a controlled branch when intentionally updating dependencies.",
        "Review the lock-file diff and full plan before merging.",
      ],
    },
    {
      stage: "4. Cloud identity and credentials",
      symptoms: [
        "ExpiredToken",
        "InvalidClientTokenId",
        "NoCredentialProviders",
        "Unable to authenticate",
        "Azure service principal authentication failure",
        "Google Application Default Credentials not found",
      ],
      commands: [
        "terraform version",
        "aws sts get-caller-identity",
        "az account show",
        "gcloud auth list",
        "gcloud config get-value project",
      ],
      interpretation: [
        "Run only the identity command for the cloud provider actually in use.",
        "These commands validate the identity visible to that CLI; Terraform may use a different credential chain or alias.",
        "Expired session credentials, missing CI workload identity federation, wrong tenant/account, or missing role assumption can cause failures.",
        "A successful identity check does not prove that the identity has permission for the target operation.",
      ],
      safeFix: [
        "Refresh the approved short-lived session or repair workload identity federation.",
        "Verify the intended role, tenant, subscription, project, and environment.",
        "Check provider-specific credential precedence and aliases.",
        "Prefer short-lived federated credentials over long-lived static secrets.",
        "Never print complete environment variables or credential files to diagnose identity.",
      ],
    },
    {
      stage: "5. IAM, RBAC, and authorization",
      symptoms: [
        "403 Forbidden",
        "AccessDenied",
        "AuthorizationFailed",
        "PERMISSION_DENIED",
        "Not authorized to perform operation",
      ],
      commands: [
        "aws sts get-caller-identity",
        "az account show",
        "gcloud auth list",
        "terraform providers",
      ],
      interpretation: [
        "Confirm the principal and target account before investigating policy.",
        "Separate authentication failure from authorization failure.",
        "Check the denied API action, target resource, scope, and relevant condition keys.",
        "Inspect permission boundaries, SCPs, resource policies, Azure role assignments, GCP IAM bindings, and organization policies as applicable.",
        "Check whether a provider alias uses a different identity from the default provider.",
      ],
      safeFix: [
        "Request the smallest permission required for the exact failed operation.",
        "Use the approved role and scope; do not grant administrator access merely to make the pipeline pass.",
        "Rerun a plan after authorization is corrected and review the resulting actions.",
      ],
    },
    {
      stage: "6. Network, DNS, TLS, and proxy",
      symptoms: [
        "Temporary failure in name resolution",
        "Connection reset",
        "TLS handshake timeout",
        "Certificate signed by unknown authority",
        "Proxy connection failed",
      ],
      commands: [
        "terraform version",
        "git config --get-regexp 'http\\..*proxy'",
      ],
      interpretation: [
        "Check the exact endpoint named in the error: provider registry, cloud API, identity endpoint, private endpoint, or internal mirror.",
        "A CLI proxy setting and the Terraform provider's runtime network behavior may differ.",
        "Private CA trust, corporate TLS inspection, DNS split-horizon, firewall rules, and egress restrictions may affect runners differently.",
        "Do not disable TLS verification as a workaround.",
      ],
      safeFix: [
        "Validate DNS, routing, firewall, proxy, certificate chain, and endpoint policy with the platform/network team.",
        "Install the approved CA certificate using the supported runner or provider configuration.",
        "Compare the failing runner with a known-good runner using the same endpoint and network path.",
      ],
    },
    {
      stage: "7. Cloud API throttling, quota, and service outage",
      symptoms: [
        "429 Too Many Requests",
        "RequestLimitExceeded",
        "Quota exceeded",
        "ServiceUnavailable",
        "Internal server error",
      ],
      commands: [
        "terraform plan",
        "terraform version",
      ],
      interpretation: [
        "Capture the exact API operation, HTTP status, request ID, region, and retry details.",
        "Check cloud service health, API quotas, and account-specific throttling.",
        "Large parallel plans or applies may increase pressure on APIs, but lowering parallelism is not a universal fix.",
        "A 5xx response can be transient, but it can also follow a partially completed operation.",
      ],
      safeFix: [
        "Follow provider and cloud-service retry guidance.",
        "If evidence supports concurrency-related throttling, test a lower -parallelism value in a controlled run.",
        "Avoid repeated blind apply retries when the previous request may have succeeded remotely.",
        "Review quotas and service health before rerunning.",
      ],
    },
    {
      stage: "8. Timeout and long-running operations",
      symptoms: [
        "Context deadline exceeded",
        "Operation timed out",
        "Still creating after a long wait",
        "Read operation failed after create",
      ],
      commands: [
        "terraform plan",
        "terraform state list",
      ],
      interpretation: [
        "Identify whether the timeout occurred during create, update, delete, refresh, or read-after-write.",
        "Check the cloud control-plane operation status and resource existence before retrying.",
        "A Terraform timeout does not prove the remote operation was rolled back.",
        "Resource-specific timeout settings may help only when the underlying operation is legitimately slow.",
      ],
      safeFix: [
        "Confirm remote operation status and actual resource configuration.",
        "If the resource exists but state does not reflect it, follow the provider-specific import or state-reconciliation procedure.",
        "Increase a resource timeout only with evidence, documented support, and a reviewed plan.",
      ],
    },
    {
      stage: "9. Provider plugin crash or inconsistent result",
      symptoms: [
        "The provider produced an unexpected error",
        "Plugin did not respond",
        "Plugin crashed",
        "Provider produced inconsistent result after apply",
      ],
      commands: [
        "terraform version",
        "terraform providers",
        "git status --short",
      ],
      interpretation: [
        "Capture the complete sanitized diagnostic and any crash log path reported by Terraform.",
        "Check provider version, CLI compatibility, runner architecture, memory pressure, and recent upgrades.",
        "An inconsistent result may indicate a provider defect, API normalization, eventual consistency, or an unexpected remote value.",
        "Do not treat a crash as proof that no remote changes occurred.",
      ],
      safeFix: [
        "Preserve evidence and check provider release notes and known issues.",
        "Reproduce in a disposable environment with the same versions and sanitized configuration.",
        "Test a supported provider patch version on a controlled branch.",
        "If necessary, open a provider issue with a minimal reproduction and sanitized logs.",
        "Inspect actual cloud resources and Terraform state before the next apply.",
      ],
    },
    {
      stage: "10. Provider configuration and aliases",
      symptoms: [
        "Provider configuration not present",
        "Module requires a provider configuration",
        "Resource targets the wrong account or region",
        "Child module uses the wrong provider alias",
      ],
      commands: [
        "terraform providers",
        "terraform validate",
        "git diff -- '*.tf'",
      ],
      interpretation: [
        "Inspect required_providers declarations and provider blocks separately.",
        "Check aliases, module providers mappings, and provider inheritance.",
        "Verify that every resource and module uses the intended account, project, subscription, and region.",
        "A successful default-provider identity check does not validate an aliased provider.",
      ],
      safeFix: [
        "Correct provider aliases and explicit module mappings.",
        "Run validation and review the plan for unintended cross-account or cross-region actions.",
        "Do not remove an old provider configuration from state-managed resources until dependent resources are safely migrated.",
      ],
    },
    {
      stage: "11. State refresh, drift, and resource identity",
      symptoms: [
        "Cannot read resource",
        "Resource already exists",
        "Object not found",
        "Unexpected replacement",
        "State refresh failed",
      ],
      commands: [
        "terraform state list",
        "terraform plan",
        "terraform providers",
      ],
      interpretation: [
        "Check whether the object exists remotely and whether the configured identifier matches it.",
        "Verify the provider version and read behavior for the resource type.",
        "Distinguish actual drift, deleted resources, wrong account/region, insufficient read permissions, and provider schema changes.",
        "A failed refresh can make a plan incomplete or misleading; do not treat it as a trustworthy change review.",
      ],
      safeFix: [
        "Resolve the identity, access, or API issue first.",
        "If an existing remote resource must be adopted, follow the supported import workflow.",
        "If the resource was intentionally removed, update configuration through the approved lifecycle.",
        "Never edit state JSON manually as a first-line repair.",
      ],
    },
    {
      stage: "12. Backend and lock-file confusion",
      symptoms: [
        "State lock acquisition failed",
        "Failed to load state",
        "Backend initialization error",
        "Different provider selections on different runners",
      ],
      commands: [
        "terraform version",
        "git diff -- .terraform.lock.hcl",
        "terraform providers",
      ],
      interpretation: [
        "The backend controls state storage and locking; the dependency lock file controls provider selections and checksums.",
        "A provider installation error and a backend state access error are separate failure classes even if both appear during init.",
        "A stale local .terraform directory may contain cached initialization data, but deleting it is not a substitute for understanding the error.",
      ],
      safeFix: [
        "Confirm backend configuration, state access, and lock ownership separately.",
        "Use the documented backend recovery procedure.",
        "Regenerate local initialization data only when justified and without deleting state or lock files.",
      ],
    },
    {
      stage: "13. CI/CD-only failures",
      symptoms: [
        "Works locally but fails in CI",
        "Provider version differs by runner",
        "Authentication works on workstation only",
        "Registry is reachable from one runner but not another",
      ],
      commands: [
        "terraform version",
        "terraform providers",
        "git rev-parse HEAD",
        "git status --short",
      ],
      interpretation: [
        "Compare runner image, architecture, Terraform version, lock file, CLI config, environment, proxy, network, identity, and working directory.",
        "Check whether CI uses a shallow or incorrect checkout or a different variable set.",
        "Do not compare secret values; compare credential source, role, expiry behavior, and identity metadata.",
      ],
      safeFix: [
        "Pin a supported Terraform CLI and provider selection.",
        "Use consistent runner images and committed dependency lock files.",
        "Configure CI with short-lived identity and least privilege.",
        "Fail fast on unexpected lock-file modifications and wrong target accounts.",
      ],
    },
  ],

  productionDiagnosticWorkflow: {
    step1: {
      name: "Capture the first failure",
      actions: [
        "Stop uncontrolled retries if an apply may have changed infrastructure.",
        "Save the full sanitized error, failing resource address, provider source, and run ID.",
        "Record the last successful deployment and the changes since then.",
      ],
    },
    step2: {
      name: "Identify the failure stage",
      actions: [
        "init failure: provider discovery, download, checksum, module, or backend initialization.",
        "validate failure: HCL syntax, provider schema, or configuration structure.",
        "plan failure: credentials, read API, permissions, data sources, state refresh, or provider logic.",
        "apply failure: write API, quota, timeout, provider crash, or partial infrastructure change.",
      ],
    },
    step3: {
      name: "Verify target and identity",
      actions: [
        "Confirm repository and commit.",
        "Confirm workspace and backend.",
        "Confirm account, subscription, project, and region.",
        "Confirm identity and role for the provider configuration involved.",
      ],
    },
    step4: {
      name: "Reproduce safely",
      actions: [
        "Use a non-production environment when possible.",
        "Use the same CLI and provider lock-file selections.",
        "Run read-only checks before planning or applying.",
        "Avoid concurrent operations against the same state.",
      ],
    },
    step5: {
      name: "Isolate the root cause",
      actions: [
        "Change one variable at a time.",
        "Use the exact error code, provider diagnostic, API request ID, and timestamp.",
        "Compare with a known-good run and recent changes.",
        "Document evidence that rules causes in or out.",
      ],
    },
    step6: {
      name: "Recover and validate",
      actions: [
        "Apply the smallest approved correction.",
        "Review a fresh plan and its replacement/deletion actions.",
        "Obtain required production approval.",
        "Apply once through the controlled pipeline.",
        "Verify remote resources, Terraform state, monitoring, and application health.",
      ],
    },
  },

  safeCommandSequence: {
    note:
      "Run from the correct root module. Cloud identity commands are provider-specific; execute only the applicable ones. A command that reads state or queries APIs may still expose sensitive metadata.",
    commands: [
      {
        command: "terraform version",
        purpose: "Confirm Terraform CLI version and platform.",
        risk: "Low",
      },
      {
        command: "git status --short",
        purpose: "Identify uncommitted changes.",
        risk: "Low",
      },
      {
        command: "git rev-parse HEAD",
        purpose: "Record the exact source revision.",
        risk: "Low",
      },
      {
        command: "terraform providers",
        purpose: "Inspect provider requirements across modules.",
        risk: "Low",
      },
      {
        command: "terraform validate",
        purpose: "Check configuration syntax and internal consistency after initialization.",
        risk: "Low; does not validate remote permissions or prove an apply will succeed.",
      },
      {
        command: "terraform plan",
        purpose: "Refresh and compare configuration with known infrastructure, subject to configuration and provider behavior.",
        risk: "Read-only with respect to intended resource changes, but may contact APIs and can have side effects in unusual data sources or external programs.",
      },
      {
        command: "terraform state list",
        purpose: "Inspect resource addresses recorded in the current state.",
        risk: "Read-only state inspection; verify the correct backend/workspace first.",
      },
    ],
    neverRunBlindly: [
      "terraform apply -auto-approve",
      "terraform destroy",
      "terraform force-unlock <LOCK_ID>",
      "terraform state rm <ADDRESS>",
      "terraform init -upgrade",
      "terraform state push <FILE>",
    ],
  },

  providerConfigurationExample: {
    description:
      "Illustrative AWS provider configuration. Pin a version range appropriate for the repository's tested compatibility policy; do not copy the example version without checking the project requirements.",
    code: `
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}
`,
    notes: [
      "The version range is an example, not a universal recommendation.",
      "The committed .terraform.lock.hcl records the selected provider version and checksums.",
      "Prefer CI workload identity or an approved short-lived role over static credentials.",
      "Do not hard-code secrets in provider blocks.",
    ],
  },

  rootCauseMatrix: [
    {
      symptom: "Provider package download fails",
      likelyCauses: [
        "Registry or mirror outage",
        "DNS/TLS/proxy/egress issue",
        "Incorrect provider source address",
      ],
      evidence: "Exact registry URL, runner network diagnostics, lock file, mirror configuration",
      resolution: "Repair the registry/network path or provider source; preserve checksum verification",
    },
    {
      symptom: "Version constraints cannot be satisfied",
      likelyCauses: [
        "Conflicting root/child module constraints",
        "Unsupported CLI/provider combination",
        "Provider version unavailable in the configured mirror",
      ],
      evidence: "terraform providers, required_providers blocks, lock-file diff",
      resolution: "Align constraints and test a supported version in a controlled branch",
    },
    {
      symptom: "ExpiredToken or authentication failure",
      likelyCauses: [
        "Expired short-lived credentials",
        "Broken role assumption or federation",
        "Wrong account, tenant, project, or credential source",
      ],
      evidence: "Identity command, role chain, token expiry metadata, provider alias",
      resolution: "Repair the approved identity flow; never expose the token",
    },
    {
      symptom: "403 or AccessDenied",
      likelyCauses: [
        "Missing action or scope",
        "Explicit deny, policy boundary, organization policy",
        "Wrong principal or provider alias",
      ],
      evidence: "Denied API action, principal, target resource, cloud audit logs",
      resolution: "Grant minimum required permissions or correct the target identity",
    },
    {
      symptom: "429 or quota error",
      likelyCauses: [
        "API throttling",
        "Account/service quota exhausted",
        "Excessive concurrent operations",
      ],
      evidence: "HTTP status, request IDs, quota metrics, concurrent run history",
      resolution: "Respect retry guidance, review quota, tune concurrency only when justified",
    },
    {
      symptom: "Timeout during apply",
      likelyCauses: [
        "Slow cloud operation",
        "Network interruption",
        "Service issue or insufficient resource timeout",
      ],
      evidence: "Remote operation status, resource existence, API request IDs",
      resolution: "Reconcile actual resource state before retrying",
    },
    {
      symptom: "Provider crash or inconsistent result",
      likelyCauses: [
        "Provider defect",
        "Unsupported version combination",
        "Unexpected API response or resource normalization",
      ],
      evidence: "Crash log, provider version, minimal reproduction, cloud resource details",
      resolution: "Test a supported patch version or follow provider-specific recovery guidance",
    },
    {
      symptom: "Unexpected resource replacement",
      likelyCauses: [
        "Provider schema/behavior change",
        "Configuration or immutable field changed",
        "Drift or changed resource identity",
      ],
      evidence: "Plan diff, provider upgrade history, state metadata, resource API details",
      resolution: "Understand replacement triggers; do not apply until replacement is approved",
    },
  ],

  recoveryAndRollback: {
    principle:
      "Terraform is not a transactional rollback engine. An apply may partially succeed, and reverting Git code alone does not undo remote infrastructure changes.",
    procedure: [
      "Stop duplicate applies and identify the last run that may have changed infrastructure.",
      "Check cloud audit logs and actual remote resources.",
      "Check Terraform state through the configured backend and workspace.",
      "Resolve the provider, identity, permission, or API issue before attempting another apply.",
      "Generate a fresh plan after the correction and inspect create, update, delete, and replacement actions.",
      "If a resource exists remotely but is missing from state, use the supported import/reconciliation workflow where appropriate.",
      "If state integrity is in doubt, preserve a protected backup and follow the backend's documented recovery procedure with an authorized owner.",
      "After approval, apply through the controlled pipeline and verify service health.",
    ],
    doNot: [
      "Do not assume an apply failure means nothing changed.",
      "Do not restore an old state snapshot without understanding the remote changes made since that snapshot.",
      "Do not force provider upgrades or downgrades in production as an experiment.",
      "Do not manually edit state JSON to remove an error.",
    ],
  },

  prevention: {
    ciCd: [
      "Pin Terraform CLI versions in runner images.",
      "Commit .terraform.lock.hcl and review lock-file changes.",
      "Run formatting, initialization, and validation in pull requests.",
      "Run security and policy checks before production approval.",
      "Use short-lived cloud identity and least-privilege roles.",
      "Verify expected account/project/region before plan and apply.",
      "Require plan review for destructive and replacement actions.",
      "Prevent concurrent applies to the same state using pipeline controls and backend locking.",
    ],
    operations: [
      "Monitor cloud API errors, throttling, quota, provider registry availability, and pipeline failure rates.",
      "Maintain a known-good runner image and tested provider upgrade process.",
      "Document provider-specific timeout, retry, import, and recovery procedures.",
      "Test provider upgrades in lower environments before production.",
      "Keep sanitized error examples and incident runbooks searchable.",
      "Define escalation paths for cloud IAM, network, platform, provider maintainers, and application owners.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    environment: "",
    repositoryAndCommit: "",
    terraformVersion: "",
    providerSourceAndVersion: "",
    failingStage: "",
    firstFailureUtc: "",
    impact: "",
    errorCodeAndRequestId: "",
    rootCause: "",
    evidence: [],
    actionsTaken: [],
    infrastructureChangesDuringFailure: "",
    recoveryAndValidation: "",
    preventionActions: [],
    ownerAndDueDate: "",
  },

  practicalLabs: [
    {
      title: "Provider registry or mirror failure",
      task: "Use a disposable environment to simulate an unreachable provider mirror.",
      expectedLearning:
        "Distinguish provider installation failure from backend initialization failure and verify that checksum validation remains enabled.",
    },
    {
      title: "Credential expiry",
      task: "Use a short-lived test identity in a sandbox and observe the failure after expiry.",
      expectedLearning:
        "Separate identity expiration from missing authorization and validate the actual provider credential chain.",
    },
    {
      title: "Insufficient permission",
      task: "Remove one narrowly scoped permission from a sandbox role.",
      expectedLearning:
        "Identify the denied operation from audit evidence and request only the permission required.",
    },
    {
      title: "API throttling",
      task: "Use a controlled test account or a mock endpoint to simulate throttling.",
      expectedLearning:
        "Capture status codes and request IDs, then test retry and concurrency behavior safely.",
    },
    {
      title: "Provider version change",
      task: "Compare plans produced with two supported provider versions in a disposable workspace.",
      expectedLearning:
        "Review schema/behavior differences and detect unexpected replacements before production.",
    },
    {
      title: "Partial apply",
      task: "Use a disposable resource and controlled failure to inspect remote resources and state after an interrupted operation.",
      expectedLearning:
        "Reconcile infrastructure and state instead of assuming an automatic rollback.",
    },
  ],

  interviewQuestions: [
    {
      question: "What is the difference between terraform init, validate, plan, and apply?",
      expectedAnswer:
        "Init prepares backend and dependencies; validate checks configuration structure; plan proposes changes; apply executes approved changes and can partially succeed.",
    },
    {
      question: "Why can terraform init fail in CI but work locally?",
      expectedAnswer:
        "Different CLI config, provider mirror, network, proxy, architecture, lock file, credentials, or runner image.",
    },
    {
      question: "Does AccessDenied mean the provider credentials are invalid?",
      expectedAnswer:
        "Not necessarily. Authentication may succeed while authorization for a specific action or resource is denied.",
    },
    {
      question: "What should you do after a provider timeout during apply?",
      expectedAnswer:
        "Inspect remote operation status, actual resource existence, state, and audit logs before retrying.",
    },
    {
      question: "Why should you not delete .terraform.lock.hcl to fix provider errors?",
      expectedAnswer:
        "It removes the recorded provider selection/checksums and may silently resolve a different version rather than fixing the underlying cause.",
    },
    {
      question: "Does a failed apply guarantee no changes occurred?",
      expectedAnswer:
        "No. Terraform can create or modify some resources before a later operation fails.",
    },
    {
      question: "When should terraform init -upgrade be used?",
      expectedAnswer:
        "During an intentional, reviewed dependency update, followed by lock-file review, compatibility testing, and plan review—not as a blind production fix.",
    },
    {
      question: "How do you investigate an unexpected replacement after a provider upgrade?",
      expectedAnswer:
        "Compare provider versions, release notes, schema/plan diff, changed configuration, remote values, and replacement triggers before approving any apply.",
    },
  ],

  completionChecklist: [
    "Correct repository, commit, working directory, workspace, and target account verified",
    "Failure stage and severity documented",
    "Logs and API request IDs captured with secrets redacted",
    "Provider source, version, lock file, and aliases checked",
    "Identity and authorization independently verified",
    "Network, registry, API health, throttling, and quotas evaluated",
    "Remote infrastructure and Terraform state reconciled after failures",
    "Root cause supported by evidence rather than assumption",
    "Fix tested in a safe environment and reviewed",
    "Fresh plan reviewed and required production approval obtained",
    "Recovery validated through cloud state, Terraform state, and application health",
    "Incident report and prevention actions assigned",
  ],
} as const;

export default providerErrorsGuide;
