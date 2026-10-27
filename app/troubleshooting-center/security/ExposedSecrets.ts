
export const exposedSecretsGuide = {
  title: "Exposed Secrets - Production Troubleshooting",
  category: "Security",
  severity: ["SEV-1", "SEV-2", "SEV-3"],
  summary:
    "Investigate exposed credentials, determine compromise scope, contain access, rotate secrets safely, validate recovery, and prevent recurrence.",

  incidentScenario: {
    title: "Production API credential exposed in a public GitHub repository",
    symptoms: [
      "GitHub secret-scanning alert reports a leaked credential.",
      "A developer accidentally commits an .env file.",
      "Cloud billing increases unexpectedly.",
      "Unknown API calls appear in audit logs.",
      "An application starts receiving 401 or 403 errors after a credential is revoked.",
      "A secret is found in a Git commit, CI log, container image, Terraform state, or support ticket.",
    ],
    businessImpact: [
      "Unauthorized access to cloud resources, databases, customer data, or third-party APIs.",
      "Data exfiltration, resource abuse, fraudulent transactions, or unexpected cloud costs.",
      "Production outage when shared credentials are rotated without dependency mapping.",
      "Compliance, privacy, contractual, and customer-notification obligations.",
      "Potential compromise of other systems if the same password or token was reused.",
    ],
    firstPrinciple:
      "Treat a valid credential exposed outside its intended trust boundary as potentially compromised. Removing the visible text does not invalidate a credential or prove that nobody used it.",
  },

  severityAssessment: {
    sev1: [
      "Privileged production cloud credentials or organization-wide administrator tokens are exposed.",
      "Evidence of unauthorized access, data exfiltration, persistence, or destructive activity exists.",
      "A signing key, production database administrator credential, or critical shared secret is compromised.",
    ],
    sev2: [
      "A production credential is exposed but no malicious use has yet been confirmed.",
      "A token has broad access to production data or deployment infrastructure.",
      "Credential rotation may interrupt important production services.",
    ],
    sev3: [
      "A confirmed test-only credential is exposed, is independently scoped, and cannot access production.",
      "A scanner reports a likely false positive and the finding is being verified.",
    ],
    classificationRules: [
      "Severity depends on privilege, environment, exposure duration, exploitability, data sensitivity, and evidence of misuse.",
      "Absence of suspicious audit events is not proof that a credential was never copied or used.",
      "Escalate immediately to the security incident commander when compromise is suspected.",
    ],
  },

  incidentCommand: {
    roles: [
      "Incident commander: coordinates severity, approvals, communications, and decisions.",
      "Security responder: scopes exposure, preserves evidence, and investigates suspicious activity.",
      "Credential owner: revokes or rotates the affected credential with the provider.",
      "Service owner: maps dependencies, deploys replacements, and validates application health.",
      "Cloud or platform team: investigates audit logs, IAM changes, infrastructure, and persistence.",
      "Compliance or privacy team: determines reporting and notification obligations when applicable.",
    ],
    timeline:
      "Record detection time, earliest known exposure, first containment action, credential revocation time, last suspicious event, and recovery completion time in UTC.",
  },

  safetyChecks: [
    "Confirm the correct GitHub organization, repository, cloud account, subscription, project, and environment.",
    "Confirm whether the credential is production, staging, development, test-only, or unknown.",
    "Identify the credential owner, provider, credential type, creation date, permissions, expiry, and dependencies.",
    "Use approved incident channels and a trusted workstation; do not paste the secret into tickets, chat, commands, or this guide.",
    "Preserve relevant audit events, alert metadata, commit identifiers, timestamps, and evidence before routine cleanup.",
    "Coordinate disruptive rotation with service owners, but do not delay urgent revocation of a high-risk credential while waiting for a normal deployment window.",
    "Check whether the credential is shared by multiple applications, scheduled jobs, agents, or deployment pipelines.",
    "Do not execute an untrusted repository script or downloaded incident artifact on a privileged workstation.",
    "Use a separate, trusted administrative identity for containment if the exposed credential may control the same account.",
  ],

  immediateResponse: {
    priorityOrder: [
      {
        step: 1,
        action: "Declare and record the incident",
        detail:
          "Open a restricted incident record. Record the alert ID, repository, affected environment, timestamps, owner, and severity without copying the secret value.",
      },
      {
        step: 2,
        action: "Identify the credential safely",
        detail:
          "Determine the provider, credential type, account, principal, privilege level, expiry, and resource scope from trusted metadata.",
      },
      {
        step: 3,
        action: "Contain the credential",
        detail:
          "Revoke, deactivate, or rotate it through the provider's trusted control plane. If immediate revocation risks an outage, use the incident commander's risk-based decision and a narrowly scoped emergency containment plan.",
      },
      {
        step: 4,
        action: "Preserve and investigate evidence",
        detail:
          "Record relevant logs, commit SHA, alert metadata, access-key identifier where applicable, and audit-event timestamps. Never include secret values in evidence exports.",
      },
      {
        step: 5,
        action: "Scope the blast radius",
        detail:
          "Identify permissions, resources, dependent services, other copies of the credential, related secrets, and possible unauthorized activity.",
      },
      {
        step: 6,
        action: "Recover services securely",
        detail:
          "Issue a replacement credential where needed, store it in an approved secrets manager, update consumers, and validate service health.",
      },
      {
        step: 7,
        action: "Eradicate and prevent recurrence",
        detail:
          "Remove unintended copies, review Git history and artifacts, add preventive controls, and document lessons learned.",
      },
    ],
    caution:
      "If a signing key or shared root credential is compromised, rotation can require coordinated key rollover, overlapping trust periods, session invalidation, or re-issuance of dependent tokens. Follow the relevant provider and application runbook.",
  },

  evidenceCollection: {
    github: [
      "Repository owner/name and public/private visibility at the time of exposure.",
      "Secret-scanning alert number, alert creation time, detected secret type, and affected paths.",
      "Commit SHA, branch, pull request, first detected location, and known exposure interval.",
      "Whether push protection was bypassed and who approved the bypass.",
      "Relevant organization audit events and repository access changes.",
    ],
    cloud: [
      "Cloud account, principal identity, access-key identifier or service-account identity.",
      "Audit events around the exposure window, including source IP, region, API operation, and result.",
      "IAM policy changes, new principals, role trust changes, access grants, and credential creation events.",
      "New compute resources, unusual storage access, network changes, snapshots, and billing anomalies.",
    ],
    ciCd: [
      "Workflow run ID, job name, commit SHA, actor, runner type, and start/end times.",
      "Whether the credential was present in logs, artifacts, caches, build arguments, or environment dumps.",
      "Workflow permission scope, deployment environment approvals, and external action versions.",
      "Whether untrusted pull requests could access privileged secrets.",
    ],
    application: [
      "Authentication failures, authorization decisions, unusual request volume, and API usage anomalies.",
      "Database logins, query audit events, role grants, and unusual exports.",
      "Secret retrieval events from the secrets manager and application deployment timestamps.",
      "Service health and error-rate changes after rotation.",
    ],
    evidenceHandling: [
      "Use access-controlled storage and preserve original timestamps and identifiers.",
      "Redact credential values and personal data before sharing evidence.",
      "Calculate hashes for exported evidence where required by the incident process.",
      "Record who collected evidence, when, from which system, and any transformations applied.",
      "Do not close the incident solely because the scanner alert disappeared.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      name: "Confirm the finding",
      checks: [
        "Open the secret-scanning alert from the repository Security tab.",
        "Confirm the detected credential type and first known location.",
        "Check whether the finding is an actual credential, a test fixture, a documented placeholder, or an unsupported pattern.",
        "Verify validity only through an approved provider workflow or trusted metadata; never test a suspected credential by making unauthorized API calls.",
      ],
      commands: [
        "git status --short",
        "git log -1 --format='%H %cI %s'",
        "gh secret-scanning alert list --repo OWNER/REPO",
      ],
      decision:
        "If the credential is real or its status is unknown and it crossed a trust boundary, contain it first. Investigate false-positive status without publishing the value.",
      note:
        "GitHub CLI command availability and flags vary by version. Check `gh secret-scanning alert list --help` and use a sufficiently authorized identity. Do not request or print secret values in command output.",
    },
    {
      step: 2,
      name: "Determine exposure scope",
      checks: [
        "Was the repository public or private during the exposure window?",
        "Was the credential included in a pushed commit, pull request, issue, discussion, release, or Git tag?",
        "Was it copied into forks, mirrors, CI artifacts, container layers, caches, logs, or developer backups?",
        "Was the credential also stored in another repository or shared configuration?",
      ],
      commands: [
        "git log --all --oneline --decorate -n 30",
        "git branch -a",
        "git tag --list",
        "git remote -v",
      ],
      decision:
        "If Git history or artifacts contain the credential, treat them as separate exposure locations. Removing the current file alone does not clean all copies.",
      note:
        "Review commit metadata and file paths without printing secret-bearing file contents into a terminal transcript or support ticket.",
    },
    {
      step: 3,
      name: "Determine privilege and blast radius",
      checks: [
        "Identify the principal or service account that owns the credential.",
        "List effective permissions, resource scope, environment access, and trust relationships.",
        "Check whether it can create new users, access keys, tokens, roles, or deployment workflows.",
        "Find other applications or environments that use the same credential.",
      ],
      decision:
        "Broad administrative permissions, cross-account trust, production data access, or signing capability increases urgency. Restrict or remove excess permissions where immediate full revocation is not feasible.",
    },
    {
      step: 4,
      name: "Investigate actual usage",
      checks: [
        "Search provider audit logs for the relevant principal or access-key identifier.",
        "Compare activity with expected source IPs, regions, schedules, and service operations.",
        "Look for unusual data reads, exports, role assumptions, new credentials, policy changes, or compute resources.",
        "Correlate events with repository visibility, commit time, CI runs, and deployment changes.",
      ],
      decision:
        "Unexpected activity means the incident may extend beyond secret exposure. Preserve evidence and investigate persistence, data access, and affected systems before declaring containment complete.",
    },
    {
      step: 5,
      name: "Trace every copy",
      checks: [
        "Repository files and Git history.",
        "CI/CD variables, workflow logs, artifacts, and caches.",
        "Docker build arguments, image layers, registries, and build output.",
        "Kubernetes manifests, Helm values, Secret objects, and deployment environment variables.",
        "Terraform state, plan files, crash logs, and saved artifacts.",
        "Application logs, tracing attributes, crash dumps, and support bundles.",
        "Developer laptops, shared folders, package archives, and third-party integrations.",
      ],
      decision:
        "Remove or restrict copies using approved procedures, but prioritize invalidating the credential itself. Rebuild and republish images or artifacts if they contain the exposed value.",
    },
    {
      step: 6,
      name: "Rotate without causing a second incident",
      checks: [
        "Create a replacement using the provider's approved workflow.",
        "Store it in the secrets manager with narrow read permissions.",
        "Update every known consumer and deployment mechanism.",
        "Validate authentication, authorization, connection health, and critical business transactions.",
        "Revoke the old credential and invalidate related sessions or tokens where supported.",
      ],
      decision:
        "If the provider supports safe overlap, use a controlled rotation window. If compromise is active, immediate revocation may take precedence over overlap; coordinate recovery explicitly.",
    },
    {
      step: 7,
      name: "Verify recovery and closure",
      checks: [
        "Old credential is revoked, disabled, expired, or otherwise unusable.",
        "New credential works only for intended principals and resources.",
        "Production health checks and representative transactions succeed.",
        "No unexplained activity continues in audit logs.",
        "Known copies and dependencies are addressed, with unresolved items assigned an owner.",
        "Secret-scanning alerts have accurate resolution reasons and the incident report is complete.",
      ],
      decision:
        "Keep the incident open if compromise scope is unknown, suspicious activity continues, or dependent systems have not been validated.",
    },
  ],

  rootCauseIsolation: [
    {
      cause: "Credential hardcoded in source code",
      evidence: "Secret-scanning alert identifies a tracked source file or commit.",
      fix:
        "Rotate the credential, replace hardcoding with runtime secret retrieval, and add push protection and CI scanning.",
    },
    {
      cause: "Secret removed from the latest commit but remains in history",
      evidence: "The current file is clean, but an older commit or tag still contains the credential.",
      fix:
        "Revoke or rotate first. Evaluate history rewriting, coordinate affected collaborators, and address forks and mirrors where possible.",
    },
    {
      cause: "CI/CD log or artifact leakage",
      evidence: "Workflow output, debug logs, build artifacts, or caches contain secret material.",
      fix:
        "Rotate the credential, restrict or delete exposed artifacts under the retention policy, disable unsafe debug output, and review runner access.",
    },
    {
      cause: "Container image leakage",
      evidence: "Credential is found in image layers, build output, or a registry artifact.",
      fix:
        "Rotate it, build a clean image without secrets in layers, republish it, and assess access to the old image and registry.",
    },
    {
      cause: "Terraform state or plan file leakage",
      evidence: "A state snapshot, saved plan, or artifact includes sensitive values.",
      fix:
        "Restrict access to state and plan storage, rotate exposed credentials, inspect downstream copies, and review state handling and encryption.",
    },
    {
      cause: "Excessive credential privileges",
      evidence: "The principal can access unrelated environments or perform unnecessary administrative actions.",
      fix:
        "Use least privilege, separate environment identities, short-lived federation, and narrowly scoped policies.",
    },
    {
      cause: "Credential reuse across environments",
      evidence: "One leaked token authenticates to multiple applications or environments.",
      fix:
        "Rotate every affected copy, issue distinct credentials per workload/environment, and investigate cross-environment access.",
    },
    {
      cause: "Developer workstation or third-party compromise",
      evidence: "Credential appears in shell history, editor backups, browser extensions, shared folders, or external integration logs.",
      fix:
        "Follow endpoint or vendor incident procedures, revoke relevant sessions, investigate the device or integration, and rotate any related credentials.",
    },
    {
      cause: "False positive or inactive credential",
      evidence: "Provider metadata and authorized validation establish that the value is a placeholder or no longer valid.",
      fix:
        "Document the evidence, remove misleading test data where appropriate, and resolve the alert using the correct reason. Do not assume inactive means there was never a compromise.",
    },
  ],

  githubInvestigation: {
    commands: [
      {
        purpose: "Review recent commit metadata",
        command: "git log --all --date=iso-strict --format='%H %cI %an %s' -n 50",
        caution:
          "Review author and commit metadata. Do not dump suspected secret-bearing file contents into logs.",
      },
      {
        purpose: "Check working tree changes",
        command: "git status --short",
        caution:
          "Do not accidentally stage or commit forensic evidence containing secret material.",
      },
      {
        purpose: "List repository remotes",
        command: "git remote -v",
        caution:
          "Verify that remote URLs do not contain embedded credentials.",
      },
      {
        purpose: "List GitHub secret-scanning alerts",
        command: "gh secret-scanning alert list --repo OWNER/REPO",
        caution:
          "Requires suitable permissions and a compatible GitHub CLI version. Keep output redacted and restricted.",
      },
      {
        purpose: "Check available CLI options",
        command: "gh secret-scanning alert list --help",
        caution:
          "Use the command syntax supported by the installed CLI version.",
      },
    ],
    historyCleanup: [
      "Do not rewrite Git history as the first containment action.",
      "First revoke or rotate the exposed credential and investigate its use.",
      "If history rewriting is justified, agree on a maintenance window and coordinate with all collaborators.",
      "Use an approved history-cleaning tool and verify the resulting branches and tags.",
      "Coordinate force-pushes, stale clones, forks, mirrors, cached artifacts, and references in pull requests.",
      "History rewriting does not guarantee that every external copy has been erased.",
    ],
    alertResolution:
      "Resolve an alert only after the credential is revoked or the finding is demonstrably a false positive, with an accurate resolution reason and incident reference.",
  },

  cloudAudit: {
    aws: {
      objective:
        "Identify use of the exposed principal or access key, unauthorized API calls, and persistence changes.",
      commands: [
        "aws sts get-caller-identity",
        "aws cloudtrail lookup-events --lookup-attributes AttributeKey=AccessKeyId,AttributeValue=AKIAEXAMPLE --max-results 50",
        "aws iam get-access-key-last-used --access-key-id AKIAEXAMPLE",
      ],
      notes: [
        "Replace example identifiers with approved metadata from the incident; never put the secret access-key value into a command.",
        "Run diagnostics using a trusted, authorized investigation identity, not the potentially compromised credential.",
        "CloudTrail lookup-events covers a limited event history and event types; use the configured trail, CloudTrail Lake, or SIEM for broader investigations.",
        "Check for unexpected IAM users, access keys, policies, role trust changes, compute resources, storage access, and security-group modifications.",
        "If compromise is suspected, deactivate the affected access key and follow AWS's compromised-key response guidance.",
      ],
      officialDocs: [
        "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html",
        "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html",
        "https://repost.aws/knowledge-center/manage-iam-access-keys-securely",
      ],
    },
    azure: {
      objective:
        "Correlate the exposed service principal, application credential, or managed identity with sign-in and resource activity.",
      checks: [
        "Review Microsoft Entra service-principal sign-in logs and relevant audit logs.",
        "Inspect application credentials, federated identity settings, role assignments, and consent grants.",
        "Review Azure Activity Log and resource-specific diagnostic logs.",
        "Remove or rotate the affected credential and validate dependent applications.",
      ],
      officialDocs: [
        "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins",
        "https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log",
      ],
    },
    gcp: {
      objective:
        "Trace service-account key use, IAM changes, and access to cloud resources.",
      checks: [
        "Review Cloud Audit Logs for the affected principal and relevant time window.",
        "Inspect service-account keys, IAM bindings, workload identity configuration, and newly granted permissions.",
        "Investigate unusual resource creation, storage reads, and changes to logging or security controls.",
        "Disable or delete the exposed key according to the approved response procedure and validate replacement authentication.",
      ],
      officialDocs: [
        "https://cloud.google.com/iam/docs/keys-create-delete",
        "https://cloud.google.com/logging/docs/audit",
      ],
    },
  },

  credentialRotation: {
    awsAccessKey: [
      "Identify the IAM user or workload that owns the exposed key.",
      "Use a trusted administrative identity to inspect permissions and recent usage.",
      "Create a replacement only if required, update all consumers securely, and verify them.",
      "Deactivate the exposed key promptly; delete it after investigation and recovery requirements permit.",
      "Review CloudTrail and IAM changes for unauthorized use.",
      "Prefer workload roles and short-lived credentials over long-lived access keys where possible.",
    ],
    databasePassword: [
      "Determine whether the credential is shared by applications, jobs, replicas, and administrators.",
      "Create a controlled replacement or use the database's supported rotation procedure.",
      "Update the secret store and restart or reload consumers in a controlled order.",
      "Verify connections, privileges, transactions, replication, and connection-pool health.",
      "Revoke the old password or user credential and review database audit logs.",
    ],
    apiToken: [
      "Identify token scopes, owner, expiry, linked applications, and revocation behavior.",
      "Create a narrowly scoped replacement if overlap is supported.",
      "Deploy the new token through the approved secret store.",
      "Validate API requests and rate-limit behavior.",
      "Revoke the old token and investigate unexpected usage.",
    ],
    signingKey: [
      "Treat compromise as a high-risk cryptographic incident.",
      "Determine whether the key signs JWTs, cookies, certificates, packages, or other trust-bearing artifacts.",
      "Follow the protocol-specific key rollover procedure and publish updated verification material where applicable.",
      "Invalidate or expire tokens and sessions signed with the compromised key when the system supports it.",
      "Assess certificates, signatures, and artifacts created during the compromise window.",
      "Never simply replace a signing key without checking how existing tokens and consumers will behave.",
    ],
    sshPrivateKey: [
      "Identify systems, accounts, authorized_keys entries, automation, and agents that trust the key.",
      "Revoke the associated public key from affected systems and services.",
      "Deploy a new key using the approved secret distribution workflow.",
      "Review authentication logs and investigate unexpected sessions.",
      "Check agent forwarding, bastions, CI runners, and copied private-key files.",
    ],
    tlsCertificateOrPrivateKey: [
      "Determine whether the private key itself was exposed, rather than only a public certificate.",
      "Follow the issuing CA's revocation and re-issuance procedures where applicable.",
      "Deploy the replacement certificate and private key securely.",
      "Validate certificate chains, hostname, expiry, trust stores, and dependent clients.",
      "Review logs for unauthorized use and assess systems that shared the same key.",
    ],
    generalRule:
      "Credential rotation is not complete until the old credential is unusable, every known consumer is updated, and dependent services have been validated.",
  },

  storageAndArtifacts: {
    .envFiles: [
      "Keep real .env files out of version control.",
      "Commit only a .env.example containing placeholder values.",
      "Check ignore rules, tracked files, editor backups, and deployment bundles.",
      "Do not rely on .gitignore to remove a file that is already tracked.",
    ],
    terraform: [
      "Treat state and saved plan files as potentially sensitive even when fields are marked sensitive.",
      "Restrict backend access, enforce encryption, and review state versioning and artifact retention.",
      "Never upload state or plan files to public repositories or unrestricted CI artifacts.",
      "Follow the state backend's documented recovery process if a sensitive artifact was exposed.",
    ],
    containers: [
      "Do not pass secrets through Docker build arguments or persist them in image layers.",
      "Use supported build secret mounts and runtime secret injection.",
      "Inspect image history and build provenance with approved tools without printing secret values.",
      "Rebuild and republish clean images, then assess old registry versions and deployment nodes.",
    ],
    kubernetes: [
      "Restrict Kubernetes Secret read access with RBAC and namespace boundaries.",
      "Enable encryption at rest for Secret data in the cluster's supported configuration.",
      "Review audit logs and identify workloads that consumed the secret.",
      "Rotate the credential in its source system and update the Kubernetes Secret through the approved deployment process.",
      "Restart or reload consumers only as required by the application's secret-refresh behavior.",
      "Remember that base64 encoding is not encryption and deleting a Secret object does not revoke the underlying credential.",
    ],
    logs: [
      "Remove secret logging at its source and restrict access to existing logs.",
      "Apply retention and deletion procedures while preserving necessary incident evidence.",
      "Check traces, crash dumps, support bundles, monitoring labels, and error-reporting systems.",
      "Use allowlisted logging fields and redaction before data reaches log aggregation.",
    ],
  },

  secretScanning: {
    tools: [
      {
        name: "GitHub Secret Scanning",
        purpose:
          "Detect supported credential patterns across repository content and Git history.",
        reference: "https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning",
      },
      {
        name: "GitHub Push Protection",
        purpose:
          "Block supported secret patterns before they are pushed to a protected repository.",
        reference:
          "https://docs.github.com/en/code-security/concepts/secret-security/push-protection",
      },
      {
        name: "Gitleaks",
        purpose:
          "Scan repositories and commits for likely secret patterns.",
        reference: "https://github.com/gitleaks/gitleaks",
      },
      {
        name: "TruffleHog",
        purpose:
          "Search supported sources for exposed secrets and, when configured, verify credentials.",
        reference: "https://github.com/trufflesecurity/trufflehog",
      },
    ],
    safeCommands: [
      {
        purpose: "Scan the repository working tree with redacted findings",
        command: "gitleaks dir . --redact",
        note:
          "Confirm the installed Gitleaks version and its supported syntax. Run on an authorized checkout and protect scan reports.",
      },
      {
        purpose: "Scan Git history with redacted findings",
        command: "gitleaks git . --redact",
        note:
          "Use a supported version and review its help output. Scan reports and exit codes should be handled in CI without echoing credential values.",
      },
    ],
    pipelineControls: [
      "Run secret scanning on pull requests and default-branch changes.",
      "Enable GitHub secret scanning and push protection where available.",
      "Fail CI on confirmed findings using redacted output and a documented exception process.",
      "Scan repository history periodically and scan build artifacts where appropriate.",
      "Limit bypass permissions and audit every push-protection bypass.",
      "Keep scanner rules and versions maintained; scanners can miss unsupported, transformed, or novel secret formats.",
      "Never assume a clean scan proves that no credential is exposed.",
    ],
  },

  prevention: {
    architecture: [
      "Use a centralized secrets manager such as AWS Secrets Manager, Azure Key Vault, or Google Secret Manager.",
      "Prefer workload identity federation and short-lived credentials over long-lived static keys.",
      "Give each application and environment its own identity and narrowly scoped permissions.",
      "Rotate credentials based on risk, provider support, policy, and suspected compromise.",
      "Avoid reusing production credentials in development, test, CI, or personal workstations.",
    ],
    development: [
      "Use .gitignore for local secret files and commit only safe example templates.",
      "Add pre-commit scanning, pull-request scanning, and push protection.",
      "Review scripts for shell tracing, environment dumps, and unsafe debug logging.",
      "Prevent secrets from entering command-line arguments, build layers, test fixtures, and crash reports.",
      "Teach developers to report a leak immediately rather than hiding it or waiting for the next release.",
    ],
    ciCd: [
      "Use narrowly scoped workflow permissions and protected deployment environments.",
      "Pin third-party workflow actions according to the organization's supply-chain policy.",
      "Avoid exposing production secrets to untrusted pull requests or forked code.",
      "Restrict runner access, artifact access, and workflow log retention.",
      "Use OIDC federation where supported instead of storing long-lived cloud credentials.",
      "Separate build and deployment identities, and require approval for production releases.",
    ],
    monitoring: [
      "Alert on secret-scanning findings and push-protection bypasses.",
      "Monitor cloud audit logs for unusual principals, regions, API operations, and privilege changes.",
      "Alert on unexpected key creation, new users, role changes, data exports, and suspicious billing.",
      "Track credential age, ownership, scope, last use, expiry, and rotation status.",
      "Run periodic incident-response exercises that include secret rotation and dependent-service recovery.",
    ],
  },

  recoveryValidation: [
    "The exposed credential is revoked, disabled, expired, or otherwise unusable.",
    "All known services authenticate using the approved replacement or an approved alternative.",
    "Authorization is limited to the required resources and actions.",
    "Production health checks, representative transactions, and critical integrations pass.",
    "No unexplained authentication, API, database, or cloud activity continues.",
    "Known copies in repositories, artifacts, images, logs, and caches are handled.",
    "Relevant sessions, tokens, keys, and derived credentials are invalidated where required.",
    "Secret scanning and CI controls pass without unsafe bypasses.",
    "Outstanding uncertainty, follow-up work, owners, and deadlines are documented.",
  ],

  commonMistakes: [
    "Deleting the secret from the current file without rotating it.",
    "Making the repository private and assuming the exposed credential is safe.",
    "Assuming no suspicious audit event means no one copied the secret.",
    "Printing a suspected credential while debugging or testing it.",
    "Rewriting Git history before preserving evidence or revoking the credential.",
    "Rotating a shared credential without identifying every consumer.",
    "Leaving old cloud access keys, sessions, signing keys, or tokens valid after deployment.",
    "Deleting logs before investigating possible unauthorized activity.",
    "Assuming base64-encoded Kubernetes Secret data is encrypted.",
    "Assuming scanner success guarantees that all secret types and locations were covered.",
    "Marking an alert resolved before verifying revocation and recovery.",
  ],

  rootCauseReport: {
    fields: [
      "Incident ID and severity",
      "Detection time and earliest known exposure time",
      "Affected repository, branch, commit, provider, account, and environment",
      "Credential type and owner; never include the secret value",
      "Permissions and potential blast radius",
      "Evidence sources and suspicious activity findings",
      "Containment action and revocation timestamp",
      "Dependent systems updated and recovery validation results",
      "Repository history and artifact cleanup status",
      "Root cause and contributing control failures",
      "Customer, compliance, and notification assessment",
      "Preventive actions, owners, due dates, and verification criteria",
    ],
    closureCriteria: [
      "Credential exposure is contained.",
      "The investigation has assessed unauthorized use and documented remaining uncertainty.",
      "Affected services are recovered and monitored.",
      "Evidence is preserved under the incident process.",
      "Corrective actions have owners and deadlines.",
      "Security incident leadership approves closure.",
    ],
  },

  handsOnLabs: [
    {
      title: "Lab 1 - Simulate a safe secret-scanning finding",
      tasks: [
        "Create a disposable local test repository.",
        "Use a clearly fake placeholder that cannot authenticate to any real service.",
        "Run an approved secret scanner with redacted output.",
        "Verify CI fails safely and logs do not reveal the placeholder or any real secret.",
      ],
      success:
        "The finding is detected, output is protected, and no usable credential is created or exposed.",
    },
    {
      title: "Lab 2 - Practice the incident timeline",
      tasks: [
        "Create a mock alert with a fake credential identifier.",
        "Record detection, containment, rotation, validation, and closure timestamps.",
        "Build an evidence list without including secret values.",
        "Map every hypothetical copy to an owner and remediation step.",
      ],
      success:
        "The responder can explain the exposure window, evidence sources, containment decision, and unresolved risks.",
    },
    {
      title: "Lab 3 - Test credential rotation",
      tasks: [
        "Use a sandbox account and a disposable test credential.",
        "Practice replacement, consumer update, health-check validation, and old-credential revocation.",
        "Simulate a consumer that was missed during the first update.",
        "Document how monitoring identifies the failure and how recovery proceeds.",
      ],
      success:
        "All consumers use the new credential, the old one fails as expected, and service health remains acceptable.",
    },
    {
      title: "Lab 4 - Investigate a mock cloud audit trail",
      tasks: [
        "Use sanitized sample audit events rather than real customer data.",
        "Identify expected and suspicious principals, regions, actions, and timestamps.",
        "Find simulated privilege changes and unauthorized resource creation.",
        "Write a concise incident conclusion with evidence and confidence level.",
      ],
      success:
        "The investigation distinguishes confirmed activity from hypotheses and identifies follow-up evidence needed.",
    },
  ],

  interviewQuestions: [
    {
      question: "A production API key is committed to a public GitHub repository. What do you do first?",
      answer:
        "Assess the credential and its privileges, promptly revoke or rotate it through the trusted provider workflow, preserve alert metadata, and investigate usage. Removing the text from Git is not containment.",
    },
    {
      question: "Why is removing a secret from the latest commit insufficient?",
      answer:
        "Earlier commits, branches, tags, forks, mirrors, caches, and artifacts may retain it. The credential remains usable until invalidated.",
    },
    {
      question: "How do you distinguish exposure from confirmed compromise?",
      answer:
        "Exposure proves that the secret crossed a trust boundary. Compromise evidence comes from audit logs, unusual authentication, unauthorized API calls, data access, or persistence. Lack of evidence does not prove non-use.",
    },
    {
      question: "What if rotating the secret could cause production downtime?",
      answer:
        "Map dependencies, assess the risk of ongoing misuse, coordinate an approved rotation plan, and use overlapping credentials only when supported and safe. Active high-risk compromise may require immediate revocation.",
    },
    {
      question: "Why is a sensitive Terraform variable still a risk?",
      answer:
        "Marking a value sensitive mainly affects display behavior; sensitive values can still be present in state or saved plan files. Storage and access controls remain essential.",
    },
    {
      question: "How do you investigate a leaked AWS access key?",
      answer:
        "Identify the principal and access-key ID, deactivate the compromised key, examine CloudTrail events, review IAM changes and unexpected resources, and follow AWS incident guidance.",
    },
    {
      question: "What is the difference between secret scanning and push protection?",
      answer:
        "Secret scanning detects supported exposed patterns. Push protection blocks supported patterns before a push reaches the repository, although coverage and bypass rules have limitations.",
    },
    {
      question: "Why can rotating a signing key be more complex than rotating an API token?",
      answer:
        "Other systems may trust the public verification key, and existing tokens or signatures may remain valid. Rotation can require key rollover, token invalidation, and coordinated trust updates.",
    },
    {
      question: "When can a secret-scanning alert be closed?",
      answer:
        "After the credential is confirmed revoked or the finding is demonstrated to be a false positive, with the correct resolution reason, evidence, and incident tracking.",
    },
  ],

  officialReferences: [
    {
      title: "GitHub Secret Scanning",
      url: "https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning",
    },
    {
      title: "GitHub Push Protection",
      url: "https://docs.github.com/en/code-security/concepts/secret-security/push-protection",
    },
    {
      title: "GitHub Secret Scanning REST API",
      url: "https://docs.github.com/en/rest/secret-scanning/secret-scanning",
    },
    {
      title: "OWASP Secrets Management Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
    },
    {
      title: "AWS Secure IAM Access Keys",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html",
    },
    {
      title: "AWS CloudTrail Event History",
      url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html",
    },
    {
      title: "Gitleaks",
      url: "https://github.com/gitleaks/gitleaks",
    },
    {
      title: "TruffleHog",
      url: "https://github.com/trufflesecurity/trufflehog",
    },
    {
      title: "Azure Entra Sign-in Logs",
      url: "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins",
    },
    {
      title: "Google Cloud Audit Logs",
      url: "https://cloud.google.com/logging/docs/audit",
    },
  ],

  completionChecklist: [
    "Incident severity and owner assigned",
    "Exposed credential identified without copying its value",
    "Containment completed and old credential invalidated",
    "Exposure locations and affected environments mapped",
    "Audit logs reviewed for unauthorized usage",
    "Related identities, permissions, and persistence investigated",
    "Replacement credential securely deployed",
    "All dependent services validated",
    "Git history, artifacts, images, logs, and caches addressed",
    "Secret scanning and push protection reviewed",
    "Root cause and corrective actions documented",
    "Incident closure approved by the responsible security lead",
  ],
} as const;

export default exposedSecretsGuide;
