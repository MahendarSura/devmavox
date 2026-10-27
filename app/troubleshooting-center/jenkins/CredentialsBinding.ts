
export interface CredentialDiagnosticStep {
  id: string;
  title: string;
  purpose: string;
  commands: string[];
  expectedEvidence: string[];
  branches: {
    condition: string;
    nextAction: string;
  }[];
  safetyNote?: string;
}

export interface CredentialFailureCase {
  id: string;
  cause: string;
  symptoms: string[];
  evidence: string[];
  diagnosis: string[];
  fix: string[];
  validation: string[];
  prevention: string[];
}

export interface CredentialProductionIncident {
  title: string;
  severity: string;
  scenario: string;
  impact: string[];
  response: string[];
  recovery: string[];
  rollbackCriteria: string[];
}

export interface CredentialsBindingGuide {
  title: string;
  category: string;
  slug: string;
  overview: string;
  symptoms: string[];
  severityMatrix: {
    severity: string;
    condition: string;
    response: string;
  }[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: CredentialDiagnosticStep[];
  failureCases: CredentialFailureCase[];
  productionIncidents: CredentialProductionIncident[];
  commandReference: {
    purpose: string;
    command: string;
    interpretation: string;
  }[];
  recoveryRunbook: string[];
  secretExposureResponse: string[];
  rollbackPlan: string[];
  prevention: string[];
  monitoring: string[];
  cicdValidation: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    successCriteria: string[];
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  references: {
    title: string;
    url: string;
  }[];
}

export const credentialsBindingGuide: CredentialsBindingGuide = {
  title: "Jenkins Credentials Binding — Production Troubleshooting",
  category: "Jenkins",
  slug: "credentials-binding",

  overview: `
Jenkins Credentials Binding makes stored credentials available to pipeline
steps through supported bindings, such as environment variables or temporary
credential files.

A credentials-related pipeline failure can originate from:
- An incorrect or missing credential ID.
- Credentials stored in a different Jenkins folder or scope.
- Folder-level credential visibility or authorization restrictions.
- A missing or incorrectly configured credentials plugin.
- Incorrect username/password, token, SSH key, or certificate configuration.
- A credential binding used outside its intended scope.
- Incorrect shell quoting or environment-variable expansion.
- Expired, revoked, rotated, or insufficiently privileged credentials.
- A target service rejecting authentication or authorization.
- An agent unable to access a credential file or required executable.
- A credential provider or secret-management integration outage.
- A secret exposed in console output, artifacts, shell tracing, or process output.
- A deployment using the wrong credential for the target environment.

The goal is to identify the failure layer without exposing the secret,
restore the correct least-privilege credential, validate the integration,
and safely recover any interrupted deployment.
`,

  symptoms: [
    "Jenkins reports that a credential ID cannot be found.",
    "A withCredentials block fails before the command executes.",
    "A pipeline reports authentication failed or HTTP 401.",
    "A pipeline receives HTTP 403 despite successful authentication.",
    "SSH reports Permission denied (publickey).",
    "Docker login or image push fails with an authentication error.",
    "Git clone or checkout fails when using a private repository.",
    "AWS CLI reports an expired token or AccessDenied.",
    "A credential works in one Jenkins folder but not another.",
    "A credential works on one agent but fails on another.",
    "A secret file is missing or inaccessible in the agent workspace.",
    "A credential rotation breaks builds that use an old token.",
    "A pipeline unexpectedly uses a different identity in production.",
    "A secret appears in logs, archived artifacts, test output, or shell traces.",
    "A deployment stops after credentials were changed or revoked."
  ],

  severityMatrix: [
    {
      severity: "SEV-1",
      condition:
        "A privileged production secret is exposed, unauthorized access is suspected, or a credential incident is causing a major production security or availability impact.",
      response:
        "Activate the security incident process, restrict affected access using approved procedures, notify security and service owners, preserve evidence, and assess active sessions and actual production state."
    },
    {
      severity: "SEV-2",
      condition:
        "A critical production release is blocked by credential failures or the wrong environment identity may have been used.",
      response:
        "Pause unsafe releases, verify credential identity and target environment, coordinate with the credential owner, and restore access through the approved process."
    },
    {
      severity: "SEV-3",
      condition:
        "A non-production build or one application integration fails authentication.",
      response:
        "Identify the credential ID and scope, inspect sanitized errors, verify permissions, and validate the correction in a safe environment."
    },
    {
      severity: "SEV-4",
      condition:
        "An intermittent credential-provider or token-refresh issue affects a small number of builds.",
      response:
        "Collect timestamps and provider health evidence, investigate expiry and availability, and add monitoring for recurring failures."
    }
  ],

  safetyChecks: [
    "Confirm the Jenkins controller, folder, job, build number, branch, and target environment.",
    "Identify the credential ID without printing or copying the secret value.",
    "Confirm whether the credential is intended for development, staging, or production.",
    "Verify that the job is authorized to access the credential in its actual folder and context.",
    "Check whether the target service received a request before retrying a deployment.",
    "Never print credentials using echo, printenv, set, env, or shell tracing.",
    "Avoid enabling shell xtrace with set -x around secret-bearing commands.",
    "Do not paste secret values into tickets, chat, screenshots, incident reports, or build logs.",
    "Do not disable certificate verification or weaken host-key verification to bypass an error.",
    "Do not replace a least-privilege credential with an administrator credential as a shortcut.",
    "Do not rotate or revoke a production credential without checking dependencies and following the approved process.",
    "Use read-only identity and permission checks before changing production access.",
    "If a secret is exposed, treat it as potentially compromised even if Jenkins masks part of it.",
    "Remember that masking is a best-effort protection, not a guarantee against every output format or encoding."
  ],

  evidenceCollection: [
    "Jenkins job URL, build number, branch, commit SHA, and environment.",
    "Credential ID and credential type, but never the secret value.",
    "Jenkins folder and credential store where the credential is configured.",
    "Relevant Jenkinsfile lines and shared-library function names.",
    "The exact binding step and sanitized error message.",
    "Timestamp of the failure and recent credential or permission changes.",
    "Jenkins core, Credentials plugin, Credentials Binding plugin, and related integration versions.",
    "Agent name, operating environment, workspace path, and service account identity.",
    "Target hostname or service name and the authentication method.",
    "HTTP status, sanitized SSH error, or provider error code.",
    "Token expiry or rotation metadata from the authorized credential owner or provider.",
    "Target service audit events, request IDs, and authentication logs.",
    "Whether the operation was read-only, changed state, or partially completed.",
    "Any suspected secret exposure locations, access scope, and affected time window."
  ],

  diagnosticWorkflow: [
    {
      id: "step-1",
      title: "Classify the failure and establish incident scope",
      purpose:
        "Determine whether Jenkins cannot resolve a credential, cannot bind it, or the target service rejects it.",
      commands: [
        "Open Jenkins > Job > Build Number > Console Output.",
        "Record the first credential-related error and timestamp.",
        "Review the Jenkinsfile around the withCredentials or credential-binding step.",
        "Inspect recent changes to credential IDs, folder placement, permissions, plugins, and secret rotation."
      ],
      expectedEvidence: [
        "Credential lookup error versus binding error versus target authentication error.",
        "Whether the command started running.",
        "Which environment and target were involved.",
        "Whether the failure began after a known change."
      ],
      branches: [
        {
          condition: "Jenkins reports that the credential ID cannot be found.",
          nextAction: "Continue to step-2 and verify the credential ID, store, and scope."
        },
        {
          condition: "The credential binds but the target rejects authentication.",
          nextAction: "Continue to step-4 and investigate the target authentication response."
        },
        {
          condition: "The secret may have been exposed.",
          nextAction: "Start the secret exposure response immediately while preserving evidence."
        },
        {
          condition: "The binding succeeds but the command cannot read a file or environment variable.",
          nextAction: "Continue to step-5 and investigate agent execution and file handling."
        }
      ],
      safetyNote:
        "Do not reproduce the error by printing the secret. Use credential IDs, sanitized logs, and non-secret metadata."
    },
    {
      id: "step-2",
      title: "Verify credential ID, type, and scope",
      purpose:
        "Confirm that the pipeline references the intended credential in a store accessible to the job.",
      commands: [
        "Open the applicable Jenkins folder and inspect its Credentials configuration.",
        "Confirm the credential ID character-for-character against the Jenkinsfile.",
        "Confirm the credential type matches the binding type.",
        "Check whether the credential is global, folder-scoped, or supplied by an external provider.",
        "Inspect approved access controls and credential-provider status."
      ],
      expectedEvidence: [
        "The credential exists in the expected store.",
        "The ID matches exactly, including case and punctuation.",
        "The type matches the intended binding.",
        "The job is running in the folder and context expected by the credential configuration."
      ],
      branches: [
        {
          condition: "The ID is incorrect or references a removed credential.",
          nextAction: "Correct the reference or restore the approved credential configuration."
        },
        {
          condition: "The credential exists in another folder or scope.",
          nextAction: "Use the approved folder-level configuration or an explicitly authorized credential arrangement."
        },
        {
          condition: "The credential exists and the scope appears correct.",
          nextAction: "Continue to step-3 and validate the binding syntax and plugin behavior."
        }
      ],
      safetyNote:
        "Do not copy a production secret into a broader global scope merely to make a lookup succeed."
    },
    {
      id: "step-3",
      title: "Validate binding syntax and pipeline context",
      purpose:
        "Identify unsupported binding types, incorrect variable names, and scope errors.",
      commands: [
        "Review the Jenkinsfile withCredentials block.",
        "Check the credential type against the binding syntax supported by the installed plugin.",
        "Confirm that commands consuming bound variables execute inside the binding scope.",
        "Inspect the Pipeline Syntax Snippet Generator for the installed Jenkins configuration.",
        "Review relevant plugin compatibility and startup errors."
      ],
      expectedEvidence: [
        "Correct binding type and credential ID.",
        "The environment variable or file binding is used only within its intended scope.",
        "No variable-name mismatch exists between binding and shell command.",
        "The required plugin is installed and compatible."
      ],
      branches: [
        {
          condition: "The binding type or variable name is incorrect.",
          nextAction: "Correct the pipeline binding and validate the Jenkinsfile in a safe test job."
        },
        {
          condition: "The plugin is missing, disabled, or incompatible.",
          nextAction: "Follow the approved plugin change process and validate compatibility before rollout."
        },
        {
          condition: "The binding syntax is valid.",
          nextAction: "Continue to step-4 and test the target service's authentication response."
        }
      ],
      safetyNote:
        "Never add diagnostic statements that print the bound secret or all environment variables."
    },
    {
      id: "step-4",
      title: "Distinguish authentication from authorization",
      purpose:
        "Determine whether the target rejected the identity, the credential, or the requested operation.",
      commands: [
        "Capture the sanitized HTTP status or provider error code.",
        "For HTTP services, inspect the status and request ID without logging Authorization headers.",
        "For SSH, inspect the sanitized client error and approved server authentication logs.",
        "For AWS, use the approved identity check such as aws sts get-caller-identity when appropriate.",
        "Ask the target service owner to verify the identity and permission policy."
      ],
      expectedEvidence: [
        "401 commonly indicates missing or invalid authentication.",
        "403 commonly indicates a permission denial, but service-specific behavior varies.",
        "SSH public-key errors can indicate the wrong key, account, host, or authorized-key configuration.",
        "Cloud provider errors may identify an expired token, wrong role, wrong account, or denied action.",
        "A successful identity check does not prove permission to perform every operation."
      ],
      branches: [
        {
          condition: "Authentication fails or the token is expired or revoked.",
          nextAction: "Verify rotation and expiry metadata with the authorized owner, then update the approved credential."
        },
        {
          condition: "Authentication succeeds but the action is denied.",
          nextAction: "Inspect the least-privilege role and resource policy for the exact requested action."
        },
        {
          condition: "The target identity is not the expected identity.",
          nextAction: "Stop the operation and investigate credential selection and environment configuration."
        },
        {
          condition: "The service is unavailable or unreachable.",
          nextAction: "Continue to step-6 and inspect network and provider health."
        }
      ],
      safetyNote:
        "Do not test privileged operations against production unless the action is approved and its side effects are understood."
    },
    {
      id: "step-5",
      title: "Investigate agent environment and secret-file handling",
      purpose:
        "Find differences between agents, shell expansion problems, and file access issues without exposing secret content.",
      commands: [
        "id",
        "pwd",
        "git status --short",
        "command -v git",
        "command -v ssh",
        "command -v aws"
      ],
      expectedEvidence: [
        "The expected agent account and working directory.",
        "Required executable availability.",
        "Whether the command runs in the intended workspace.",
        "Whether the issue is an agent configuration problem rather than a credential problem."
      ],
      branches: [
        {
          condition: "The required executable is missing.",
          nextAction: "Install or provision the approved tool version through the agent image or configuration process."
        },
        {
          condition: "The working directory or environment is incorrect.",
          nextAction: "Correct workspace and environment selection, then retest safely."
        },
        {
          condition: "A secret file is missing or unreadable.",
          nextAction: "Verify file-binding scope, agent operating system, temporary directory permissions, and cleanup behavior without displaying file contents."
        },
        {
          condition: "The agent configuration is correct.",
          nextAction: "Continue to step-6 and investigate network or external credential-provider dependencies."
        }
      ],
      safetyNote:
        "Do not run cat, type, or other content-dumping commands against secret files. Avoid broad environment dumps."
    },
    {
      id: "step-6",
      title: "Check external provider, network, and time dependencies",
      purpose:
        "Determine whether a credential integration depends on an unavailable endpoint, incorrect clock, or external identity provider.",
      commands: [
        "date -u",
        "getent hosts <identity-provider-host>",
        "curl -sS -o /dev/null -w 'http=%{http_code} connect=%{time_connect} total=%{time_total}\\n' --connect-timeout 5 --max-time 20 https://<identity-provider-host>/",
        "Review approved provider health dashboards and sanitized integration logs."
      ],
      expectedEvidence: [
        "Unexpected host clock drift that may affect time-limited tokens.",
        "DNS resolution or TLS connectivity failures.",
        "Provider outage or elevated response latency.",
        "Identity federation, token exchange, or secret-manager errors."
      ],
      branches: [
        {
          condition: "DNS, TLS, or network connectivity fails.",
          nextAction: "Correct the verified network or certificate problem through the responsible infrastructure team."
        },
        {
          condition: "The host clock is inaccurate.",
          nextAction: "Restore approved time synchronization and retest token validity."
        },
        {
          condition: "The external provider is unhealthy.",
          nextAction: "Follow the provider incident process and avoid uncontrolled credential rotations."
        },
        {
          condition: "Connectivity and provider health are normal.",
          nextAction: "Continue to step-7 and verify the minimum required permissions."
        }
      ],
      safetyNote:
        "Use approved provider endpoints. Do not send secrets to test endpoints or disable TLS verification."
    },
    {
      id: "step-7",
      title: "Verify least-privilege authorization",
      purpose:
        "Identify the exact missing permission without granting excessive privileges.",
      commands: [
        "Record the denied action, resource identifier, environment, and request ID.",
        "Inspect the target service's audit log for the denied operation.",
        "Review the applicable role, policy, resource policy, and organization-level restrictions.",
        "For cloud access, confirm the account, role, region, and resource scope."
      ],
      expectedEvidence: [
        "Exact action and resource that were denied.",
        "Effective identity used by the pipeline.",
        "Relevant explicit deny, trust policy, resource policy, or organization restriction.",
        "Whether the permission failure began after a policy change."
      ],
      branches: [
        {
          condition: "The identity is correct but one permission is missing.",
          nextAction: "Request the narrowest approved permission for the required action and resource."
        },
        {
          condition: "The role trust or identity mapping is incorrect.",
          nextAction: "Correct the approved trust or identity configuration and verify the intended principal."
        },
        {
          condition: "The identity or environment is wrong.",
          nextAction: "Fix credential selection before changing any permissions."
        }
      ],
      safetyNote:
        "Do not attach broad administrator policies to bypass an authorization error."
    },
    {
      id: "step-8",
      title: "Determine whether the failed operation changed remote state",
      purpose:
        "Prevent duplicate deployment, release, or infrastructure operations after an authentication-related timeout or failure.",
      commands: [
        "Review the target service audit log for the build time window.",
        "Check deployment or operation IDs where available.",
        "Inspect the actual target revision and health.",
        "Confirm whether the request was rejected before execution or accepted before the client failed."
      ],
      expectedEvidence: [
        "Whether the remote service received the request.",
        "Whether a resource or release was changed.",
        "Whether an asynchronous operation is still running.",
        "Whether retrying the operation is safe."
      ],
      branches: [
        {
          condition: "No remote change occurred.",
          nextAction: "Correct the credential issue and retry under the normal approval process."
        },
        {
          condition: "The intended change completed successfully.",
          nextAction: "Reconcile pipeline status with verified remote state without blindly repeating the change."
        },
        {
          condition: "The remote state is partial or unhealthy.",
          nextAction: "Follow the approved recovery or rollback runbook."
        }
      ],
      safetyNote:
        "A client-side authentication or network error does not always prove that the remote operation had no effect."
    },
    {
      id: "step-9",
      title: "Perform controlled recovery and validation",
      purpose:
        "Prove that the correction works without exposing credentials or introducing duplicate changes.",
      commands: [
        "Run a safe authentication check that does not reveal credential contents.",
        "Verify the target identity using an approved identity endpoint or command.",
        "Run a minimal read-only permission check where supported.",
        "Execute the smallest representative pipeline stage in a non-production environment.",
        "Validate the intended artifact or deployment after any approved release."
      ],
      expectedEvidence: [
        "The expected credential ID and identity are used.",
        "Authentication and the required authorization both succeed.",
        "The relevant stage completes.",
        "No secret appears in console output or archived artifacts.",
        "The final remote state matches the intended release."
      ],
      branches: [
        {
          condition: "The test succeeds and the identity is correct.",
          nextAction: "Resume the approved pipeline and monitor subsequent runs."
        },
        {
          condition: "Authentication succeeds but the operation is still denied.",
          nextAction: "Return to step-7 and investigate the precise permission failure."
        },
        {
          condition: "A secret exposure is discovered.",
          nextAction: "Stop normal recovery and execute the secret exposure response."
        }
      ]
    }
  ],

  failureCases: [
    {
      id: "credential-id-not-found",
      cause: "The credential ID is incorrect, deleted, or not visible in the job's scope.",
      symptoms: [
        "Jenkins cannot find the requested credential.",
        "The pipeline fails before the consuming command runs."
      ],
      evidence: [
        "Credential lookup error.",
        "Jenkinsfile credential ID.",
        "Folder and store configuration."
      ],
      diagnosis: [
        "Compare the ID exactly.",
        "Inspect the correct folder and credential store.",
        "Verify whether the credential was renamed or deleted."
      ],
      fix: [
        "Correct the ID or restore the intended approved credential.",
        "Use the appropriate folder scope rather than copying secrets into a broad scope."
      ],
      validation: [
        "The binding resolves successfully.",
        "A safe test stage runs without printing the secret."
      ],
      prevention: [
        "Review credential references during code review.",
        "Document credential ownership and intended scope.",
        "Validate required credential IDs in release readiness checks."
      ]
    },
    {
      id: "wrong-binding-type",
      cause: "The pipeline uses a binding incompatible with the stored credential type.",
      symptoms: [
        "The binding step reports a configuration error.",
        "Expected environment variables or files are not available."
      ],
      evidence: [
        "Credential type.",
        "Jenkinsfile binding configuration.",
        "Installed plugin and supported binding syntax."
      ],
      diagnosis: [
        "Check the exact credential type.",
        "Compare with the installed Pipeline Syntax Snippet Generator.",
        "Check plugin startup and compatibility errors."
      ],
      fix: [
        "Use the supported binding for the credential type.",
        "Update plugin versions only through the approved compatibility process."
      ],
      validation: [
        "The binding executes successfully.",
        "The consuming command receives the expected non-secret metadata."
      ],
      prevention: [
        "Keep pipeline snippets under version control.",
        "Test plugin upgrades in a representative non-production controller."
      ]
    },
    {
      id: "expired-or-revoked-secret",
      cause: "The token, password, certificate, or SSH key is expired, revoked, or no longer accepted.",
      symptoms: [
        "Previously successful authentication starts failing.",
        "The target returns an invalid-token or authentication error."
      ],
      evidence: [
        "Provider error code.",
        "Credential rotation timeline.",
        "Authorized expiry metadata and service audit events."
      ],
      diagnosis: [
        "Check the credential owner and provider metadata.",
        "Confirm which credential version the job is using.",
        "Distinguish expiry from incorrect identity and permission denial."
      ],
      fix: [
        "Rotate or renew the credential through the approved owner and secret-management workflow.",
        "Update the intended credential reference and validate the consumer.",
        "Revoke the old value according to the rotation plan."
      ],
      validation: [
        "Authentication succeeds with the intended identity.",
        "The required operation succeeds with least privilege."
      ],
      prevention: [
        "Track expiry dates and rotation status.",
        "Test rotation before expiry.",
        "Avoid hard-coded secrets in repository files."
      ]
    },
    {
      id: "authentication-versus-authorization",
      cause: "The target authenticates the caller but denies the requested action.",
      symptoms: [
        "The identity check succeeds but deployment or artifact access fails.",
        "The service returns a permission-denied error."
      ],
      evidence: [
        "Effective principal or role.",
        "Denied action and resource.",
        "Target audit log and policy evaluation."
      ],
      diagnosis: [
        "Verify the intended identity first.",
        "Inspect the precise denied operation.",
        "Check trust, identity, resource, and organization-level policies."
      ],
      fix: [
        "Correct the identity if the wrong principal was selected.",
        "Request only the missing approved permission for the intended resource."
      ],
      validation: [
        "The identity matches expectations.",
        "Only the required action succeeds."
      ],
      prevention: [
        "Use least-privilege roles.",
        "Review access changes and audit denied operations.",
        "Test permissions in non-production."
      ]
    },
    {
      id: "shell-expansion-or-quoting",
      cause: "Shell quoting, variable expansion, or special characters change the command's interpretation.",
      symptoms: [
        "Authentication fails only for one shell or agent.",
        "A command behaves differently with special characters.",
        "The pipeline accidentally expands a variable before the intended shell."
      ],
      evidence: [
        "Sanitized command structure.",
        "Shell type and execution context.",
        "Binding variable names and quoting."
      ],
      diagnosis: [
        "Check whether Groovy or the shell expands the variable.",
        "Inspect quoting without displaying the secret.",
        "Compare execution behavior across supported shells."
      ],
      fix: [
        "Use safe shell quoting and let the intended shell expand the bound variable.",
        "Avoid embedding secrets directly into command strings.",
        "Use tool-supported authentication mechanisms where available."
      ],
      validation: [
        "The command works with a test credential.",
        "No secret appears in logs or process output."
      ],
      prevention: [
        "Review shell commands containing credentials.",
        "Avoid shell tracing around secret-bearing commands.",
        "Prefer standard credential-aware CLI integrations."
      ]
    },
    {
      id: "agent-file-permission",
      cause: "The agent cannot access a bound secret file or required executable.",
      symptoms: [
        "File-not-found or permission errors.",
        "The same job works on one agent but not another."
      ],
      evidence: [
        "Agent OS and account.",
        "Workspace and temporary-directory configuration.",
        "Executable availability and file-binding scope."
      ],
      diagnosis: [
        "Confirm the binding is active when the command runs.",
        "Check agent user and temporary-directory permissions.",
        "Verify the required executable is installed."
      ],
      fix: [
        "Correct the agent image or workspace configuration.",
        "Use the supported secret-file binding and file lifecycle.",
        "Do not broaden filesystem permissions unnecessarily."
      ],
      validation: [
        "The intended command can consume the file.",
        "Temporary credential material is cleaned up according to the supported binding behavior."
      ],
      prevention: [
        "Standardize agent images.",
        "Test secret-file use on each supported agent type.",
        "Avoid archiving workspaces that may contain sensitive temporary files."
      ]
    },
    {
      id: "external-secret-provider",
      cause: "An external secret manager, credential provider, or identity service is unavailable or misconfigured.",
      symptoms: [
        "Credential retrieval fails intermittently.",
        "Multiple jobs fail at similar times.",
        "Provider or token-exchange errors appear."
      ],
      evidence: [
        "Provider health and integration logs.",
        "DNS, TLS, and network metrics.",
        "Credential retrieval timestamps and sanitized request IDs."
      ],
      diagnosis: [
        "Determine whether multiple consumers are affected.",
        "Check provider health and network access.",
        "Verify identity federation and token exchange configuration."
      ],
      fix: [
        "Restore the provider or integration through the owning team.",
        "Use documented failover only if it is approved and safe.",
        "Do not create uncontrolled copies of secrets as a workaround."
      ],
      validation: [
        "Credential retrieval succeeds consistently.",
        "Consumers authenticate with the intended identity."
      ],
      prevention: [
        "Monitor provider health and retrieval latency.",
        "Document ownership and recovery procedures.",
        "Test approved failover and rotation workflows."
      ]
    },
    {
      id: "wrong-environment-identity",
      cause: "The pipeline selects a development, staging, or production credential inconsistent with the target environment.",
      symptoms: [
        "Unexpected permission errors.",
        "A deployment targets the wrong account or project.",
        "A successful operation affects an unintended environment."
      ],
      evidence: [
        "Pipeline parameters and environment mapping.",
        "Actual target account, project, cluster, or hostname.",
        "Authenticated identity and release audit records."
      ],
      diagnosis: [
        "Verify the target environment independently of the pipeline label.",
        "Check the effective identity before the change.",
        "Review shared-library defaults and credential selection logic."
      ],
      fix: [
        "Stop the operation if the identity or target is wrong.",
        "Correct the environment mapping and approvals.",
        "Assess unintended changes and follow the incident recovery process."
      ],
      validation: [
        "Identity and target both match the approved release.",
        "A read-only preflight succeeds before the change."
      ],
      prevention: [
        "Use explicit environment-to-credential mappings.",
        "Add target identity checks before deployment.",
        "Require approvals for production credentials and targets."
      ]
    },
    {
      id: "secret-leak",
      cause: "A secret is printed, archived, copied into a workspace, or otherwise exposed.",
      symptoms: [
        "A secret-like value appears in console output or an artifact.",
        "Shell tracing reveals command arguments.",
        "A workspace or test report contains sensitive data."
      ],
      evidence: [
        "Affected build logs and artifact inventory.",
        "Time window and access records.",
        "Secret owner and affected systems."
      ],
      diagnosis: [
        "Determine the exact secret and exposure window.",
        "Identify who or what could access the exposed location.",
        "Check for suspicious authentication or usage events."
      ],
      fix: [
        "Follow the secret exposure response and security escalation process.",
        "Restrict access to affected logs or artifacts where possible.",
        "Rotate or revoke the affected secret through its owner.",
        "Remove exposed copies according to retention and evidence-preservation policy."
      ],
      validation: [
        "The exposed credential is no longer usable where revocation is supported.",
        "Replacement credentials work with the intended identity.",
        "Exposure locations and access have been addressed."
      ],
      prevention: [
        "Never print secrets or enable shell tracing around them.",
        "Limit artifact and log access.",
        "Use short-lived credentials where possible.",
        "Test masking and secret-handling behavior without using real production secrets."
      ]
    },
    {
      id: "plugin-regression",
      cause: "A Jenkins or credential plugin update changes behavior or introduces a compatibility problem.",
      symptoms: [
        "Multiple jobs begin failing after a controller update.",
        "Binding or provider errors appear across unrelated repositories."
      ],
      evidence: [
        "Plugin and Jenkins core versions.",
        "Controller startup logs.",
        "Failure onset and update history."
      ],
      diagnosis: [
        "Compare affected jobs and plugin versions.",
        "Review release notes and compatibility requirements.",
        "Check whether the failure is isolated to a provider or binding type."
      ],
      fix: [
        "Follow the approved plugin recovery or rollback process.",
        "Restore a supported compatible version if the change is confirmed as causal.",
        "Validate representative credential consumers before broad rollout."
      ],
      validation: [
        "Affected credential types work in a safe test job.",
        "No regression appears in other credential consumers."
      ],
      prevention: [
        "Stage plugin upgrades.",
        "Maintain a controller backup and change record.",
        "Test shared credential integrations before production upgrades."
      ]
    },
    {
      id: "token-clock-skew",
      cause: "Clock drift or token issuance and expiry problems cause time-sensitive authentication to fail.",
      symptoms: [
        "Short-lived credentials fail intermittently.",
        "Token validation reports expired or not-yet-valid conditions."
      ],
      evidence: [
        "UTC timestamps from the agent and identity provider.",
        "Time synchronization status.",
        "Token expiry metadata from the authorized provider."
      ],
      diagnosis: [
        "Compare clocks and the token validity window.",
        "Check time synchronization and token issuance logs.",
        "Exclude incorrect audience, issuer, and role configuration."
      ],
      fix: [
        "Restore approved time synchronization.",
        "Correct token issuance or validation configuration through the owner."
      ],
      validation: [
        "Fresh tokens validate within the expected time window.",
        "Authentication is stable across supported agents."
      ],
      prevention: [
        "Monitor clock synchronization.",
        "Track token issuance and expiry failures.",
        "Document short-lived credential renewal behavior."
      ]
    }
  ],

  productionIncidents: [
    {
      title: "Production deployment fails after a credential rotation",
      severity: "SEV-2; escalate if service impact or security risk exists",
      scenario:
        "A deployment pipeline starts failing immediately after a token or password rotation. Some jobs may still reference an old credential or an outdated integration.",
      impact: [
        "Release pipeline is blocked.",
        "Different jobs may use different credential references.",
        "A partially completed deployment may require reconciliation."
      ],
      response: [
        "Identify the changed credential ID and rotation timestamp.",
        "Confirm the target environment and effective identity.",
        "Inspect sanitized authentication errors and target audit logs.",
        "Check whether the old secret was revoked and whether consumers were updated.",
        "Determine whether any deployment operation already changed remote state."
      ],
      recovery: [
        "Update the approved credential configuration.",
        "Validate authentication and minimum required permissions in a safe job.",
        "Resume the release through normal approvals.",
        "Verify the deployed revision and application health."
      ],
      rollbackCriteria: [
        "Rollback application changes only if the actual release is unhealthy or violates release criteria.",
        "Credential rotation itself is not a reason to roll back a healthy application.",
        "Follow the security owner's procedure if compromise or unintended access is suspected."
      ]
    },
    {
      title: "Jenkins cannot find a credential in one folder",
      severity: "SEV-3, or SEV-2 if a critical release is blocked",
      scenario:
        "The same credential ID is used by jobs in different folders, but one job fails to resolve it.",
      impact: [
        "Only a subset of jobs may fail.",
        "A workaround that broadens credential scope could increase exposure."
      ],
      response: [
        "Compare the folder and credential store used by the working and failing jobs.",
        "Check exact credential ID and type.",
        "Review folder permissions and provider configuration.",
        "Inspect shared-library behavior and the actual job execution context."
      ],
      recovery: [
        "Correct the reference or approved scope.",
        "Validate with a harmless read-only integration check.",
        "Confirm that unrelated folders did not gain unnecessary access."
      ],
      rollbackCriteria: [
        "No deployment rollback is needed if the deployment never ran.",
        "If another attempt changed remote state, reconcile it before retrying."
      ]
    },
    {
      title: "Credential appears in console output or archived artifacts",
      severity: "SEV-1 or SEV-2 according to exposure and access",
      scenario:
        "A debug statement or shell trace exposes a secret in build output, or an artifact contains sensitive configuration.",
      impact: [
        "Unauthorized users may gain access to an external service.",
        "Logs and artifacts may retain the value beyond the build.",
        "The exposure may affect multiple systems if the credential is reused."
      ],
      response: [
        "Stop the unsafe pipeline step and notify the security incident owner.",
        "Identify the credential, exposure window, and affected logs or artifacts.",
        "Restrict access and preserve required evidence.",
        "Review usage and authentication audit events.",
        "Coordinate revocation or rotation with the credential owner."
      ],
      recovery: [
        "Remove the unsafe logging or artifact behavior.",
        "Rotate or revoke the affected credential according to the incident process.",
        "Validate the replacement without printing it.",
        "Review other consumers and remove exposed copies where policy permits."
      ],
      rollbackCriteria: [
        "Stop or roll back the affected release if required by security incident policy.",
        "Do not assume deleting a log removes every copy or makes an exposed credential safe.",
        "Resume production activity only after the security owner approves recovery."
      ]
    },
    {
      title: "Credentials bind successfully but deployment receives AccessDenied",
      severity: "SEV-2 for a critical release; otherwise SEV-3",
      scenario:
        "Jenkins resolves and binds a cloud credential, but the cloud service denies a requested operation.",
      impact: [
        "Deployment or infrastructure changes are blocked.",
        "An incorrect workaround could grant excessive privileges."
      ],
      response: [
        "Verify the effective identity using an approved read-only identity command.",
        "Record the denied action, resource, account, and request ID.",
        "Inspect identity, trust, resource, and organization-level policy restrictions.",
        "Check whether the job selected the correct environment."
      ],
      recovery: [
        "Correct the identity mapping or request the smallest required permission.",
        "Run a read-only preflight and then a controlled deployment.",
        "Verify the actual resource state and intended change."
      ],
      rollbackCriteria: [
        "No rollback is needed if no remote changes occurred.",
        "If changes were partially applied, use the approved infrastructure or application recovery plan."
      ]
    }
  ],

  commandReference: [
    {
      purpose: "Verify the execution account",
      command: "id",
      interpretation:
        "Shows the current user and group IDs. It does not reveal whether a bound secret is correct."
    },
    {
      purpose: "Verify the working directory",
      command: "pwd",
      interpretation:
        "Helps confirm that the command is executing in the expected workspace."
    },
    {
      purpose: "Check Git executable availability",
      command: "command -v git",
      interpretation:
        "Identifies the Git executable available in the current PATH."
    },
    {
      purpose: "Check SSH executable availability",
      command: "command -v ssh",
      interpretation:
        "Confirms that an SSH client is available without displaying any private key."
    },
    {
      purpose: "Check AWS CLI availability",
      command: "command -v aws",
      interpretation:
        "Confirms CLI availability. It does not validate AWS permissions."
    },
    {
      purpose: "Check UTC clock",
      command: "date -u",
      interpretation:
        "Useful for comparing agent time with provider logs and token validity windows."
    },
    {
      purpose: "Resolve identity-provider hostname",
      command: "getent hosts <identity-provider-host>",
      interpretation:
        "Helps identify DNS resolution problems from the affected agent."
    },
    {
      purpose: "Measure an HTTPS endpoint without printing its body",
      command:
        "curl -sS -o /dev/null -w 'http=%{http_code} connect=%{time_connect} total=%{time_total}\\n' --connect-timeout 5 --max-time 20 https://<identity-provider-host>/",
      interpretation:
        "Shows HTTP status and timing. Use an approved endpoint and never put secrets in the URL or command."
    },
    {
      purpose: "Verify AWS caller identity where approved",
      command: "aws sts get-caller-identity",
      interpretation:
        "Reports the AWS account and caller identity for the active credentials. Do not run with untrusted credential sources; successful identity verification does not prove every action is authorized."
    },
    {
      purpose: "Inspect repository working-tree changes",
      command: "git status --short",
      interpretation:
        "Helps confirm the repository state without displaying credential contents."
    },
    {
      purpose: "Check current Git revision",
      command: "git rev-parse HEAD",
      interpretation:
        "Records the commit associated with the failing build."
    }
  ],

  recoveryRunbook: [
    "1. Record the job, build number, branch, commit, environment, and timestamp.",
    "2. Classify the error as credential lookup, binding, authentication, authorization, provider availability, or suspected exposure.",
    "3. Confirm the credential ID and intended scope without reading or printing the secret.",
    "4. Check recent rotation, expiry, permissions, plugin, and environment-mapping changes.",
    "5. Gather sanitized logs, request IDs, and target audit events.",
    "6. If exposure is suspected, start the security incident process immediately.",
    "7. Apply the smallest approved correction to the credential reference, binding, identity, or permission.",
    "8. Validate identity with a safe read-only operation where supported.",
    "9. Test the affected integration in non-production before resuming a critical release.",
    "10. Confirm whether the failed operation changed remote state before retrying.",
    "11. Execute the controlled retry under the required approvals.",
    "12. Verify the final artifact, deployed revision, service health, and secret-handling behavior.",
    "13. Record root cause, evidence, mitigation, prevention owner, and follow-up date."
  ],

  secretExposureResponse: [
    "Treat a secret that appeared in logs, artifacts, or process output as potentially compromised.",
    "Notify the security incident owner and credential owner according to policy.",
    "Stop the specific unsafe logging or publication path.",
    "Identify the secret type, affected systems, exposure window, and access scope.",
    "Preserve evidence required for incident investigation while restricting unnecessary access.",
    "Revoke or rotate the secret through the authorized owner and approved rotation process.",
    "Assess active sessions, tokens, access logs, and suspicious activity where supported.",
    "Identify copies in build logs, artifacts, caches, workspaces, reports, and external log systems.",
    "Remove or restrict exposed copies according to evidence-retention and security policy.",
    "Replace unsafe pipeline behavior and test it using a non-production credential.",
    "Validate the replacement credential without printing its value.",
    "Document affected consumers, actions taken, remaining risk, and security approval before normal release activity resumes."
  ],

  rollbackPlan: [
    "Determine whether the credential failure occurred before or after the remote operation began.",
    "Verify actual target state, release revision, operation ID, and health.",
    "If the wrong identity changed resources, stop further unsafe operations and notify the resource owner.",
    "Use the approved application or infrastructure rollback procedure if release health or integrity is compromised.",
    "Do not automatically roll back a healthy release solely because Jenkins could not authenticate after the operation completed.",
    "For credential compromise, follow the security response and assess access revocation separately from application rollback.",
    "Validate service health, effective identity, and the intended final state.",
    "Record authorization for recovery or rollback."
  ],

  prevention: [
    "Use Jenkins credential IDs rather than hard-coded secret values.",
    "Store credentials in the appropriate Jenkins credential store or approved external secret manager.",
    "Apply least-privilege access and keep production credentials scoped appropriately.",
    "Use separate identities for development, staging, and production.",
    "Prefer short-lived, workload-specific credentials where supported.",
    "Track token and certificate expiry and test rotation before deadlines.",
    "Never print secrets or enable shell tracing around secret-bearing commands.",
    "Avoid storing secrets in Git, Docker build contexts, test reports, artifacts, or cached workspaces.",
    "Use supported credential bindings and keep binding scope as narrow as practical.",
    "Review credential references and permissions during pull requests.",
    "Test credential rotation and provider outages in non-production.",
    "Use read-only identity preflight checks before privileged deployment actions.",
    "Keep Jenkins and related plugins on supported, tested versions.",
    "Document credential ownership, purpose, scope, rotation procedure, and emergency contacts.",
    "Make deployment steps safe to retry where possible and verify remote state after uncertain failures."
  ],

  monitoring: [
    "Credential lookup and binding failures by job and credential ID, without secret values.",
    "Authentication failures by target service and sanitized error category.",
    "Authorization denials and unusual privilege escalation requests.",
    "Credential expiry and rotation deadlines.",
    "External secret-manager and identity-provider availability and latency.",
    "Unexpected credential use across accounts, projects, or environments.",
    "Jenkins plugin errors and credential-provider failures.",
    "Agent connectivity, DNS, TLS, and time synchronization issues.",
    "Secret-scanning findings in repositories, artifacts, and approved log systems.",
    "Repeated authentication failures following a rotation or access-policy change.",
    "Access audit events for privileged production identities."
  ],

  cicdValidation: [
    "Review credential IDs and binding types in pull requests.",
    "Ensure secrets are not hard-coded in Jenkinsfiles, shared libraries, or repository configuration.",
    "Check that commands use bound variables only within the correct scope.",
    "Test shell quoting and credential-file handling with non-production values.",
    "Validate that diagnostic logging never prints secret values or authorization headers.",
    "Use a read-only identity check before production deployment where supported.",
    "Confirm environment-to-credential mappings and production approvals.",
    "Test credential expiry and rotation behavior in a safe environment.",
    "Verify artifact and workspace handling does not publish temporary secret files.",
    "Check that retry behavior cannot cause duplicate remote operations.",
    "Run a post-deployment health check and verify the intended target identity.",
    "Keep security review and secret exposure response procedures documented."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Jenkins job and build number:",
    "Repository and commit SHA:",
    "Affected environment and service:",
    "Severity and impact:",
    "Credential ID and type (never the value):",
    "Credential store and intended scope:",
    "Authentication method and target identity:",
    "Start time and detection time:",
    "Sanitized error and request ID:",
    "Recent rotation, policy, or plugin changes:",
    "Evidence collected:",
    "Root cause and supporting evidence:",
    "Was remote state changed?:",
    "Secret exposure suspected or confirmed?:",
    "Immediate mitigation:",
    "Credential rotation or revocation actions:",
    "Recovery validation:",
    "Rollback decision and approval:",
    "Prevention actions and owners:",
    "Security follow-up and due date:"
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Diagnose a missing credential ID",
      objective:
        "Learn to distinguish a credential lookup problem from a target authentication failure.",
      steps: [
        "Create a temporary non-production Jenkins job.",
        "Use a deliberately incorrect test credential ID.",
        "Record the sanitized lookup error.",
        "Correct the ID and rerun the harmless test.",
        "Verify that no secret value was printed."
      ],
      successCriteria: [
        "The error is classified as a lookup problem.",
        "The correct binding resolves.",
        "The logs contain no credential value."
      ]
    },
    {
      title: "Lab 2 — Distinguish authentication and authorization",
      objective:
        "Understand why successful authentication does not imply permission to perform an action.",
      steps: [
        "Use a non-production test identity with a harmless read-only permission.",
        "Verify the identity through an approved endpoint.",
        "Attempt an approved test action that the identity is intentionally not allowed to perform.",
        "Record the sanitized denial and request ID.",
        "Grant only the required test permission through the approved process and repeat."
      ],
      successCriteria: [
        "Identity and permission failures are distinguished.",
        "No administrator privilege is used as a workaround.",
        "The final test uses only the required permission."
      ]
    },
    {
      title: "Lab 3 — Test credential rotation safely",
      objective:
        "Practice identifying stale consumers after a test credential is rotated.",
      steps: [
        "Create a dedicated non-production credential.",
        "Use it in a harmless test integration.",
        "Rotate it using the documented procedure.",
        "Update the approved consumer configuration.",
        "Verify authentication and confirm the old value is no longer accepted where revocation is supported."
      ],
      successCriteria: [
        "The consumer works with the new credential.",
        "The old credential is handled according to the rotation policy.",
        "No secret appears in source control or logs."
      ]
    },
    {
      title: "Lab 4 — Prevent secret exposure",
      objective:
        "Verify that a pipeline avoids printing secret values and handles temporary credential files safely.",
      steps: [
        "Use a synthetic non-production secret.",
        "Bind it using the supported Jenkins mechanism.",
        "Run a command that consumes it without printing it.",
        "Inspect the console output and generated artifacts.",
        "Review workspace and temporary-file cleanup behavior."
      ],
      successCriteria: [
        "The secret value is absent from console output and artifacts.",
        "Temporary material is handled according to policy.",
        "The pipeline can still perform its intended test operation."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is Jenkins Credentials Binding?",
      answer:
        "It exposes a stored credential to a pipeline step through a supported binding, such as an environment variable or temporary file, without hard-coding the secret into the repository."
    },
    {
      question: "What is the difference between a credential ID and its secret value?",
      answer:
        "The credential ID is a reference used by Jenkins to select a stored credential. The secret value is the sensitive authentication material and must not be printed or committed."
    },
    {
      question: "Why can Jenkins fail to find a credential?",
      answer:
        "The ID may be incorrect or removed, the credential may be stored in a different scope, the job may lack the appropriate access, or a provider integration may be unavailable."
    },
    {
      question: "What is the difference between authentication and authorization?",
      answer:
        "Authentication establishes the caller's identity. Authorization determines whether that identity can perform the requested action on a particular resource."
    },
    {
      question: "What does HTTP 401 usually indicate?",
      answer:
        "It commonly indicates missing or invalid authentication. The exact interpretation depends on the target service and its authentication protocol."
    },
    {
      question: "What does HTTP 403 usually indicate?",
      answer:
        "It commonly indicates that the request is understood but the caller is not permitted to perform it. Check the effective identity and applicable policies rather than granting broad privileges."
    },
    {
      question: "Why should secrets never be printed during troubleshooting?",
      answer:
        "Console logs, artifacts, monitoring systems, and incident attachments may be accessible to more people or retained longer than the secret itself. Logging the value creates additional exposure."
    },
    {
      question: "Is Jenkins secret masking sufficient to protect credentials?",
      answer:
        "No. Masking is best effort and can fail with transformed values, encoded output, or certain command behaviors. Pipelines must avoid emitting secrets in the first place."
    },
    {
      question: "How should shell commands consume credentials?",
      answer:
        "Use supported bindings, safe quoting, and a narrowly scoped command. Avoid hard-coding secrets into command strings, shell traces, URLs, or repository files."
    },
    {
      question: "Why can a credential work in one folder but fail in another?",
      answer:
        "The jobs may use different credential stores, folder scopes, authorization contexts, or external provider configurations."
    },
    {
      question: "How do you handle an expired token?",
      answer:
        "Confirm expiry and identity through approved metadata, coordinate rotation with the credential owner, update the intended consumer, and validate access without printing the token."
    },
    {
      question: "What should happen when a secret is exposed in Jenkins logs?",
      answer:
        "Start the security incident process, identify exposure scope, restrict access, preserve required evidence, rotate or revoke the secret through the owner, investigate use, and remove exposed copies according to policy."
    },
    {
      question: "Why is least privilege important for Jenkins?",
      answer:
        "A compromised pipeline or credential should have the smallest possible access. Separate environment identities and narrow resource permissions reduce the potential impact."
    },
    {
      question: "How do you verify an AWS identity safely?",
      answer:
        "Where approved, use an identity command such as aws sts get-caller-identity and compare the returned account and principal with the expected environment. This does not prove all requested permissions."
    },
    {
      question: "How do you troubleshoot SSH public-key authentication?",
      answer:
        "Verify the intended username, host, credential binding, key acceptance, server-side authentication logs, and file or agent configuration. Never print or upload the private key."
    },
    {
      question: "What is a credential rotation incident?",
      answer:
        "It occurs when consumers continue using an old value, a new value is incorrectly configured, or permissions and integrations are not updated consistently after rotation."
    },
    {
      question: "What should you do if Jenkins times out during deployment after authentication succeeds?",
      answer:
        "Check the target platform's operation ID, audit logs, actual revision, and health before retrying. The remote operation may have continued after Jenkins stopped waiting."
    },
    {
      question: "How do you handle a missing permission without using administrator access?",
      answer:
        "Identify the exact denied action and resource, verify the intended principal, and request the smallest approved permission required."
    },
    {
      question: "Why can credentials fail only on one agent?",
      answer:
        "The agent may have different tools, environment variables, network access, clock synchronization, file permissions, trust configuration, or provider connectivity."
    },
    {
      question: "What evidence belongs in a credentials incident report?",
      answer:
        "Record the credential ID and type, scope, sanitized error, target identity, timestamps, relevant audit events, impact, root cause, remediation, validation, and prevention actions. Never include the secret value."
    }
  ],

  references: [
    {
      title: "Jenkins Credentials",
      url: "https://www.jenkins.io/doc/book/using/using-credentials/"
    },
    {
      title: "Credentials Binding Plugin",
      url: "https://plugins.jenkins.io/credentials-binding/"
    },
    {
      title: "Jenkins Pipeline Syntax",
      url: "https://www.jenkins.io/doc/book/pipeline/syntax/"
    },
    {
      title: "Jenkins Pipeline Steps Reference",
      url: "https://www.jenkins.io/doc/pipeline/steps/"
    },
    {
      title: "Jenkins Security",
      url: "https://www.jenkins.io/doc/book/security/"
    },
    {
      title: "AWS STS get-caller-identity",
      url: "https://docs.aws.amazon.com/cli/latest/reference/sts/get-caller-identity.html"
    },
    {
      title: "OWASP Secrets Management Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
    },
    {
      title: "OWASP Logging Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"
    }
  ]
};
