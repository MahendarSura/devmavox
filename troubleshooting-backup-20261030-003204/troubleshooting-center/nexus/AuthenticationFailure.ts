
export const authenticationFailureGuide = {
  title: "Nexus Repository Authentication Failure — Production Troubleshooting",
  fileName: "AuthenticationFailure.ts",
  category: "nexus",
  difficulty: "advanced",
  estimatedTime: "90–180 minutes",

  description:
    "An evidence-driven production runbook for Sonatype Nexus Repository authentication and authorization failures affecting CI/CD pipelines, Maven, npm, Docker/OCI, NuGet, PyPI, LDAP/SSO, and repository clients.",

  objectives: [
    "Identify whether a failure is authentication, authorization, repository routing, or network related.",
    "Determine which users, service accounts, clients, repositories, and formats are affected.",
    "Correlate HTTP responses with Nexus, identity-provider, reverse-proxy, and CI/CD logs.",
    "Diagnose credentials, tokens, realms, LDAP/SSO, permissions, and client-specific configuration.",
    "Restore access using least privilege without exposing secrets or disabling security controls.",
    "Validate recovery with read-only and controlled upload/download tests.",
    "Prevent recurring authentication failures with monitoring, credential lifecycle controls, and runbooks.",
  ],

  incidentScenario: {
    title: "Production CI/CD pipelines suddenly fail to download artifacts",
    timeline: [
      {
        time: "10:00 UTC",
        event:
          "Builds successfully download dependencies from Nexus Repository.",
      },
      {
        time: "10:05 UTC",
        event:
          "A scheduled credential rotation or identity-provider change occurs.",
      },
      {
        time: "10:07 UTC",
        event:
          "Multiple pipelines begin reporting 401 responses while resolving dependencies.",
      },
      {
        time: "10:10 UTC",
        event:
          "Some teams report 403 responses when publishing artifacts; other repositories remain accessible.",
      },
      {
        time: "10:15 UTC",
        event:
          "The on-call engineer correlates client errors with Nexus request logs, user/role configuration, realm state, and recent changes.",
      },
      {
        time: "10:25 UTC",
        event:
          "The responsible owner applies a narrowly scoped correction and validates access using a controlled client request.",
      },
    ],
    possibleCauses: [
      "Incorrect, expired, revoked, or rotated credentials.",
      "A stale token or wrong credential reference in CI/CD secrets.",
      "The user is authenticated but lacks the required repository privilege.",
      "A Nexus authentication realm was disabled, reordered, or misconfigured.",
      "LDAP or an external identity provider is unavailable or rejecting authentication.",
      "An SSO session or access token has expired.",
      "A reverse proxy or gateway strips, rewrites, or incorrectly forwards authentication headers.",
      "A client uses the wrong Nexus base URL, repository endpoint, or credential profile.",
      "A Docker, Maven, npm, NuGet, or PyPI client is using a different credential configuration than expected.",
      "Anonymous access or content selector policies changed.",
      "A service account was disabled, deleted, or had its role changed.",
      "Clock skew, TLS trust, DNS, network policy, or proxy settings interfere with authentication.",
      "Nexus is unhealthy, overloaded, or unable to contact its identity provider.",
      "An upstream repository or proxy repository fails after authentication succeeds.",
    ],
    principle:
      "An authentication error is not automatically a bad password. Establish the failing request, identity, endpoint, client, and authorization decision before changing credentials or permissions.",
  },

  severityAndImpact: {
    note:
      "These levels are illustrative. Follow the organization's incident classification and security incident response policy.",
    levels: [
      {
        severity: "SEV1",
        criteria:
          "Production artifact access is broadly unavailable, critical releases are blocked, or evidence suggests unauthorized access or credential compromise.",
        actions: [
          "Declare an incident and involve Nexus, platform, identity, and security owners as appropriate.",
          "Assess release impact and whether existing deployments are affected.",
          "Preserve relevant security and audit evidence.",
          "If compromise is suspected, follow the security incident process for containment and credential rotation.",
        ],
      },
      {
        severity: "SEV2",
        criteria:
          "Multiple critical pipelines, teams, or repositories are blocked.",
        actions: [
          "Identify affected repositories, client types, and identities.",
          "Correlate errors with recent credential, realm, permission, or proxy changes.",
          "Coordinate an approved least-privilege recovery.",
        ],
      },
      {
        severity: "SEV3",
        criteria:
          "One team, service account, or repository operation is affected.",
        actions: [
          "Isolate the failing client and compare with a known-good client.",
          "Correct the specific credential or privilege issue.",
        ],
      },
      {
        severity: "SEV4",
        criteria:
          "A noncritical client has an isolated authentication configuration problem.",
        actions: [
          "Document the issue and correct client configuration through normal change controls.",
        ],
      },
    ],
    impactQuestions: [
      "Are users unable to log in, or are only API and package requests failing?",
      "Are downloads failing, uploads failing, or both?",
      "Which repository formats are affected: Maven, npm, Docker/OCI, NuGet, PyPI, or others?",
      "Are all users affected or only one service account or identity group?",
      "Does the problem affect direct Nexus access and proxied access equally?",
      "Did a credential rotation, realm change, LDAP change, proxy update, or permission change occur?",
      "Are existing deployments impacted, or only new builds and releases?",
      "Could the event indicate credential compromise or unexpected access attempts?",
    ],
  },

  rolesAndResponsibilities: [
    {
      role: "Incident Commander",
      responsibility:
        "Coordinates severity, customer impact, approvals, and the recovery timeline.",
    },
    {
      role: "Nexus Administrator",
      responsibility:
        "Checks repository configuration, users, roles, privileges, realms, and server health.",
    },
    {
      role: "CI/CD Owner",
      responsibility:
        "Checks pipeline identity, secret references, client configuration, and artifact operations.",
    },
    {
      role: "Identity / IAM Owner",
      responsibility:
        "Investigates LDAP, SSO, identity-provider, group membership, and token lifecycle issues.",
    },
    {
      role: "Security Owner",
      responsibility:
        "Assesses suspicious access, credential exposure, and containment requirements.",
    },
    {
      role: "Scribe",
      responsibility:
        "Records timestamps, sanitized errors, affected identities, changes, approvals, and recovery evidence.",
    },
  ],

  safetyChecks: [
    "Confirm the correct Nexus instance, environment, hostname, and repository.",
    "Use an approved account and verify that the diagnostic action is authorized.",
    "Never paste passwords, access tokens, API keys, private keys, or Authorization headers into incident notes.",
    "Avoid shell tracing such as set -x around credential-bearing commands.",
    "Do not place credentials directly in shell command arguments where they can appear in process listings or shell history.",
    "Do not disable TLS certificate verification to work around authentication errors.",
    "Do not enable anonymous access globally as an emergency workaround.",
    "Do not grant broad administrator privileges to a build account just to make a pipeline pass.",
    "Do not disable authentication realms or security controls without a documented plan and approval.",
    "Capture relevant logs and audit evidence before changing permissions or rotating credentials, when safe.",
    "Use a dedicated test artifact and repository for upload validation.",
    "If credentials may be compromised, follow the organization's security incident and rotation procedures.",
  ],

  errorClassification: [
    {
      signal: "HTTP 401 Unauthorized",
      interpretation:
        "The request was not accepted as authenticated, but the exact cause depends on the endpoint, authentication mechanism, and intermediary components.",
      investigate: [
        "Credential validity and correct secret reference.",
        "Token expiration, revocation, and expected authentication scheme.",
        "Nexus authentication realm and identity-provider status.",
        "Client credential profile and URL matching.",
        "Reverse proxy handling of the Authorization header.",
      ],
    },
    {
      signal: "HTTP 403 Forbidden",
      interpretation:
        "The request was refused. It may indicate insufficient authorization, policy restrictions, or another endpoint-specific security decision.",
      investigate: [
        "Authenticated identity and mapped roles.",
        "Repository view, read, add, edit, or delete privileges as relevant.",
        "Content selector privileges and repository policy.",
        "Endpoint-specific permissions and reverse-proxy rules.",
      ],
    },
    {
      signal: "HTTP 404 Not Found",
      interpretation:
        "The URL, repository path, artifact coordinate, or endpoint may be wrong. Some systems may also conceal resource existence.",
      investigate: [
        "Repository URL and format-specific endpoint.",
        "Artifact coordinates, path, and repository routing.",
        "Whether the requested component exists.",
        "Reverse-proxy path rewriting.",
      ],
    },
    {
      signal: "HTTP 429 Too Many Requests",
      interpretation:
        "A rate limit or gateway policy may be limiting requests; confirm which layer generated the response.",
      investigate: [
        "Request volume and retry behavior.",
        "Gateway and identity-provider rate limits.",
        "Client retry configuration.",
      ],
    },
    {
      signal: "HTTP 5xx or gateway error",
      interpretation:
        "The request may be failing at Nexus, the reverse proxy, or an upstream dependency.",
      investigate: [
        "Nexus health and logs.",
        "Identity-provider or LDAP connectivity.",
        "Reverse-proxy upstream health and timeout settings.",
        "Repository-specific upstream failures.",
      ],
    },
    {
      signal: "TLS, DNS, or connection error",
      interpretation:
        "The client may not be reaching the intended Nexus authentication endpoint at all.",
      investigate: [
        "Hostname resolution and routing.",
        "Certificate validity and trust chain.",
        "Proxy environment variables and network access.",
        "Clock synchronization and endpoint configuration.",
      ],
    },
  ],

  evidenceCollection: {
    clientEvidence: [
      "Exact timestamp and timezone of the failure.",
      "Sanitized HTTP status, response message, and request/correlation ID if available.",
      "Nexus hostname and repository endpoint, with sensitive query parameters removed.",
      "Client type and version: Maven, npm, Docker, NuGet, PyPI, curl, or CI/CD plugin.",
      "Whether the operation was login, metadata lookup, download, upload, or deletion.",
      "Whether the same identity worked previously and when the last success occurred.",
      "The secret reference or credential profile name, not its secret value.",
    ],
    nexusEvidence: [
      "Request/access logs for the affected time window.",
      "Server/application logs relevant to authentication and authorization.",
      "User status, role mapping, repository privileges, and relevant security configuration changes.",
      "Authentication realm and identity-provider health.",
      "Audit events for user, role, privilege, and realm modifications where available.",
      "Repository health and server resource utilization.",
    ],
    identityEvidence: [
      "LDAP/SSO availability and authentication errors.",
      "Identity-provider audit logs and relevant token lifecycle events.",
      "Group membership and mapping changes.",
      "Service account status and credential rotation timeline.",
      "Clock skew between the client, Nexus, and identity provider where relevant.",
    ],
    pipelineEvidence: [
      "Pipeline run ID and failing step.",
      "Build agent identity and environment.",
      "Credential binding or secret reference name.",
      "Maven settings, npm registry configuration, Docker registry target, or other client configuration with secrets redacted.",
      "Changes to secret names, variable scopes, repository URLs, and deployment templates.",
      "Whether a retry, a fresh build agent, or an approved known-good client reproduces the failure.",
    ],
    collectionRules: [
      "Use the same timestamp window across client, proxy, Nexus, and identity-provider logs.",
      "Sanitize usernames or identifiers in shared reports according to internal policy.",
      "Do not share raw settings files if they contain credentials.",
      "Do not assume a client-side 401 was generated by Nexus; check the proxy or gateway response where possible.",
      "Distinguish the first failing request from later retries.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the failing operation and blast radius",
      actions: [
        "Identify the exact repository, endpoint, client, operation, and environment.",
        "Determine whether login, download, upload, or all operations fail.",
        "Compare affected users with unaffected users using approved test identities.",
        "Record the first failure and compare it with recent changes.",
        "Check whether direct Nexus access and access through a reverse proxy behave differently.",
      ],
      decisions: [
        {
          if: "All clients and users fail against the same Nexus instance",
          then:
            "Investigate server health, realm configuration, reverse proxy, identity-provider connectivity, and broad security changes.",
        },
        {
          if: "Only one service account fails",
          then:
            "Prioritize credential rotation, account status, secret binding, and role changes.",
        },
        {
          if: "Only one client type fails",
          then:
            "Inspect client-specific credential configuration, authentication scheme, and repository URL.",
        },
        {
          if: "Only uploads fail",
          then:
            "Check deploy/add/edit privileges and repository write policy separately from read access.",
        },
        {
          if: "Only one repository fails",
          then:
            "Inspect that repository's privileges, content selector rules, format, and routing.",
        },
      ],
    },

    {
      step: 2,
      title: "Confirm Nexus availability and the correct endpoint",
      actions: [
        "Verify the hostname and repository URL against the approved configuration.",
        "Check whether the response originates from Nexus or an upstream proxy.",
        "Check DNS, TLS certificate trust, routing, and connectivity.",
        "Use an approved health endpoint or the instance's monitoring system.",
        "Compare a safe known-good read request with the failing operation.",
      ],
      commands: [
        {
          command:
            "curl --silent --show-error --output /dev/null --write-out 'http=%{http_code} dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} total=%{time_total}\\n' https://<nexus-host>/",
          purpose:
            "Measures connectivity and returns an HTTP status without printing the response body.",
          caution:
            "This checks the root endpoint, not necessarily the repository API or authentication decision. Use the approved hostname and retain TLS verification.",
        },
        {
          command:
            "curl --silent --show-error --output /dev/null --write-out 'http=%{http_code} total=%{time_total}\\n' https://<nexus-host>/service/rest/v1/status",
          purpose:
            "Checks the response from a commonly available Nexus Repository 3 status endpoint.",
          caution:
            "Endpoint availability and response semantics vary by product version and deployment. A successful status response does not prove authenticated repository access works.",
        },
      ],
      decisions: [
        {
          if: "DNS, TLS, or connection setup fails",
          then:
            "Resolve the connection path before changing credentials.",
        },
        {
          if: "The proxy returns an error but Nexus logs show no corresponding request",
          then:
            "Investigate proxy routing, authentication middleware, and upstream connectivity.",
        },
        {
          if: "Nexus is healthy but the repository request fails",
          then:
            "Continue to identity, client configuration, and authorization checks.",
        },
      ],
    },

    {
      step: 3,
      title: "Reproduce safely with the correct identity",
      actions: [
        "Use an approved test or service identity with the expected minimum permissions.",
        "Confirm the credential reference used by the failing client without revealing its value.",
        "Check that the credential is being sent to the intended Nexus hostname and path.",
        "Compare an unauthenticated request with an authenticated request only where the endpoint and policy make that comparison safe.",
        "Record the HTTP response code, timestamp, and correlation ID.",
      ],
      safeTest: {
        command:
          "curl --silent --show-error --output /dev/null --write-out 'http=%{http_code}\\n' --user \"$NEXUS_USER\" --url 'https://<nexus-host>/repository/<repository>/<known-artifact-path>'",
        requirements: [
          "Set NEXUS_USER in the approved environment without printing it.",
          "Supply the password only through curl's interactive prompt when supported by the installed curl version and command syntax.",
          "Use an approved read-only artifact path.",
          "Never place the password in the URL or paste credentials into the command.",
          "Do not enable shell tracing or verbose output that could expose authentication headers.",
        ],
        caution:
          "This is an illustrative safe-test pattern, not a universal Nexus login command. Confirm the authentication method and endpoint for the deployed Nexus version. Token authentication may require a different client configuration.",
      },
      decisions: [
        {
          if: "The approved identity fails in multiple independent clients",
          then:
            "Investigate credential validity, account status, realm configuration, and identity-provider behavior.",
        },
        {
          if: "The identity works in a controlled test but not in CI",
          then:
            "Investigate pipeline secret binding, build-agent configuration, client settings, and target URL.",
        },
        {
          if: "The read request succeeds but publishing fails",
          then:
            "Investigate repository write privileges and deployment configuration.",
        },
      ],
    },

    {
      step: 4,
      title: "Inspect credentials, tokens, and rotation",
      actions: [
        "Confirm that the intended credential was rotated in the secret manager.",
        "Verify that the pipeline references the correct secret name, scope, and version.",
        "Check whether the service account is active and whether its credentials were revoked or expired.",
        "Confirm that token format and authentication method match the client and Nexus configuration.",
        "Check for stale credentials cached by build agents or long-running workers.",
        "Review rotation audit events and the first failed request timestamp.",
      ],
      decisions: [
        {
          if: "Failure starts immediately after secret rotation",
          then:
            "Check secret propagation, secret version, overlapping rollout timing, and client restart requirements.",
        },
        {
          if: "Only one build agent fails",
          then:
            "Compare its environment, cached configuration, and secret binding with a healthy agent.",
        },
        {
          if: "The token is expired or revoked",
          then:
            "Issue or rotate a replacement through the approved identity and secret-management process.",
        },
        {
          if: "Unexpected credential use or exposure is suspected",
          then:
            "Escalate to security, preserve audit evidence, and follow the credential-compromise response process.",
        },
      ],
      caution:
        "Do not repeatedly rotate credentials without identifying the consuming identity and propagation path. A rotation can create additional failures if clients still use the previous secret.",
    },

    {
      step: 5,
      title: "Check Nexus authentication realms",
      actions: [
        "Inspect the enabled authentication realms in the Nexus administration interface.",
        "Confirm that the expected realm is enabled and that the configuration matches the supported authentication method.",
        "Check whether LDAP, SSO, or other identity integrations changed recently.",
        "Review relevant Nexus logs for authentication-provider errors.",
        "Confirm that realm changes did not unintentionally affect local users, service accounts, or API clients.",
      ],
      investigate: [
        "Local Nexus authentication versus external identity authentication.",
        "LDAP connectivity, bind configuration, group search, and user lookup.",
        "SSO or identity-provider token validation.",
        "Realm enablement, order, and supported behavior for the deployed version.",
        "Reverse-proxy authentication middleware and forwarded identity headers.",
      ],
      decisions: [
        {
          if: "Local users work but LDAP users fail",
          then:
            "Focus on LDAP connectivity, bind credentials, user lookup, group mapping, and the LDAP realm.",
        },
        {
          if: "UI login works but API or package-client requests fail",
          then:
            "Inspect client authentication support, API endpoint behavior, token format, and reverse-proxy handling.",
        },
        {
          if: "Realm changes coincide with failures across multiple clients",
          then:
            "Review the change and restore a known-good realm configuration through the approved process.",
        },
      ],
      caution:
        "Do not disable realms experimentally during production incidents. The impact may include locking out administrators or service accounts.",
    },

    {
      step: 6,
      title: "Distinguish authentication from authorization",
      actions: [
        "Establish which identity Nexus recognizes for the request, using approved logs or administrative views.",
        "Check the roles and privileges assigned to that identity.",
        "Check the repository and operation involved.",
        "Review content selector privileges and repository-specific policy where configured.",
        "Compare the required operation with the minimum intended privileges.",
      ],
      permissionExamples: [
        {
          operation: "Browse or download",
          checks: [
            "Repository view/read privileges.",
            "Content selector constraints.",
            "Correct repository and component path.",
          ],
        },
        {
          operation: "Upload or publish",
          checks: [
            "Required add/edit privileges for the repository.",
            "Deployment policy and repository type.",
            "Correct publish endpoint and client configuration.",
          ],
        },
        {
          operation: "Delete a component",
          checks: [
            "Explicit delete privileges and approved change controls.",
            "Repository policy and retention requirements.",
          ],
        },
        {
          operation: "Administrative API action",
          checks: [
            "The endpoint's required administrative privilege.",
            "Whether the operation is allowed for the service identity.",
          ],
        },
      ],
      decisions: [
        {
          if: "Authentication succeeds but the requested operation is denied",
          then:
            "Correct the narrowly scoped role or privilege after confirming the intended business access.",
        },
        {
          if: "The role appears correct but access is denied",
          then:
            "Check group mapping, effective identity, content selectors, endpoint requirements, and policy changes.",
        },
        {
          if: "The user has excessive privileges already",
          then:
            "Do not grant more permissions. Inspect repository policy, identity mismatch, endpoint, and proxy behavior.",
        },
      ],
      caution:
        "Nexus privilege names and UI/API details vary by version and configuration. Confirm the exact requirement for the deployed product rather than guessing a permission name.",
    },

    {
      step: 7,
      title: "Investigate client-specific authentication",
      clients: [
        {
          client: "Maven",
          checks: [
            "Confirm that the repository URL matches the server ID in the effective settings.xml.",
            "Check user/global settings, active profiles, mirrors, and repository configuration.",
            "Confirm that the secret is injected into the intended settings entry.",
            "Check whether dependency resolution and deployment use different endpoints.",
          ],
          diagnosticCommand:
            "mvn help:effective-settings",
          caution:
            "The effective settings output may expose credentials or sensitive configuration depending on plugins and configuration. Do not print or share it unredacted in CI logs.",
        },
        {
          client: "npm",
          checks: [
            "Confirm the configured registry URL and repository path.",
            "Check the active .npmrc configuration and token scope.",
            "Verify that the token applies to the exact registry hostname/path.",
            "Check whether a global configuration overrides the project configuration.",
          ],
          diagnosticCommand:
            "npm config get registry",
          caution:
            "Do not print authentication configuration or dump the complete .npmrc into build logs.",
        },
        {
          client: "Docker / OCI",
          checks: [
            "Confirm the registry hostname and port match the credential entry.",
            "Check whether the client is using the expected Docker configuration directory.",
            "Verify the registry endpoint and image naming convention.",
            "Check token or credential-helper behavior.",
          ],
          diagnosticCommand:
            "docker info",
          caution:
            "Review output before sharing. Avoid commands that print Docker credentials or the complete Docker configuration file.",
        },
        {
          client: "NuGet",
          checks: [
            "Confirm the package source URL and source name.",
            "Inspect the credential provider and source-specific authentication configuration.",
            "Check the identity used by the build agent.",
          ],
          diagnosticCommand:
            "dotnet nuget list source",
          caution:
            "Review source configuration before sharing output; private source URLs may be sensitive.",
        },
        {
          client: "PyPI / pip",
          checks: [
            "Confirm the configured index URL and whether it points to the intended Nexus repository.",
            "Inspect approved credential-provider or secret configuration.",
            "Check whether an environment variable overrides the intended index.",
          ],
          diagnosticCommand:
            "python -m pip config list",
          caution:
            "Configuration output may expose sensitive URLs or credentials. Use an approved redaction process before sharing it.",
        },
      ],
      decisions: [
        {
          if: "The client URL differs from the intended repository",
          then:
            "Correct the URL and verify credential scope for that exact host and path.",
        },
        {
          if: "A new build agent fails while an old one succeeds",
          then:
            "Compare configuration source, credential injection, client version, and secret propagation without copying secrets between agents.",
        },
        {
          if: "Metadata download succeeds but artifact upload fails",
          then:
            "Inspect the publishing endpoint and write privileges rather than changing download permissions.",
        },
      ],
    },

    {
      step: 8,
      title: "Inspect reverse proxy, gateway, and network behavior",
      actions: [
        "Correlate the client request with proxy access logs and Nexus request logs.",
        "Confirm the expected Host and forwarded headers reach the application.",
        "Check whether authentication headers are removed or rewritten by proxy rules.",
        "Review path prefixes, URL rewriting, TLS termination, and upstream configuration.",
        "Compare the approved direct path and proxy path when direct access is permitted.",
        "Inspect gateway authentication policies and rate limits.",
      ],
      decisions: [
        {
          if: "The proxy returns 401 but Nexus receives no request",
          then:
            "Investigate proxy authentication middleware, routing, and upstream connectivity.",
        },
        {
          if: "Nexus receives the request but rejects the identity",
          then:
            "Investigate credential format, realm, identity mapping, and authentication logs.",
        },
        {
          if: "Direct access works but proxy access fails",
          then:
            "Focus on proxy routing, forwarded authentication data, URL rewriting, and gateway policy.",
        },
      ],
      caution:
        "Never log raw Authorization headers to diagnose proxy behavior. Use safe metadata, redacted logs, and approved tracing.",
    },

    {
      step: 9,
      title: "Investigate LDAP, SSO, and identity-provider failures",
      actions: [
        "Check the identity provider's health and incident timeline.",
        "Review authentication failures for the affected identity and timestamp.",
        "Check group membership and mapping changes.",
        "Verify TLS trust, DNS, connectivity, and service-account permissions for the integration.",
        "Check time synchronization when tokens or certificates appear invalid.",
        "Confirm whether the issue affects all users or only one group.",
      ],
      decisions: [
        {
          if: "All LDAP-backed users fail but local authentication works",
          then:
            "Focus on the LDAP integration and group/identity mapping.",
        },
        {
          if: "Only one group loses access",
          then:
            "Inspect directory membership, group search configuration, and mapped Nexus roles.",
        },
        {
          if: "Tokens are rejected despite successful login",
          then:
            "Check token audience, issuer, expiry, clock skew, and the client authentication flow supported by the deployment.",
        },
      ],
      caution:
        "Avoid changing the global identity-provider configuration until the failure scope and recovery path are established.",
    },

    {
      step: 10,
      title: "Check Nexus server and repository health",
      actions: [
        "Review application logs and supported monitoring for the incident window.",
        "Check disk space, memory, CPU, thread utilization, and connection health.",
        "Look for repeated authentication-provider errors or request-processing failures.",
        "Check repository-specific health and upstream availability.",
        "Determine whether the problem is authentication itself or a later artifact retrieval failure.",
      ],
      decisions: [
        {
          if: "Nexus has broad 5xx errors or is resource constrained",
          then:
            "Investigate server health and capacity before changing user permissions.",
        },
        {
          if: "Authentication succeeds but a proxy repository cannot fetch upstream artifacts",
          then:
            "Investigate the upstream repository, outbound connectivity, and repository-specific configuration.",
        },
        {
          if: "Only one repository fails while other repositories work",
          then:
            "Compare repository-specific privileges, format, routing, and upstream status.",
        },
      ],
    },

    {
      step: 11,
      title: "Apply the smallest safe correction",
      corrections: [
        {
          cause: "Stale CI/CD secret",
          fix:
            "Update the intended secret reference or rotate the service credential through the approved secret-management process.",
          verify:
            "Run a controlled read request from the affected client and confirm that the new credential is actually being used.",
        },
        {
          cause: "Missing repository privilege",
          fix:
            "Grant only the required repository and operation privileges through the approved role-management process.",
          verify:
            "Confirm the intended operation succeeds and unrelated repositories remain restricted.",
        },
        {
          cause: "Wrong client configuration",
          fix:
            "Correct the registry URL, Maven server ID, credential scope, or approved configuration source.",
          verify:
            "Run a controlled request against the intended endpoint.",
        },
        {
          cause: "Realm or identity-provider failure",
          fix:
            "Restore the known-good integration configuration or repair the failed dependency through its owner.",
          verify:
            "Test an approved identity from the affected authentication path and review server logs.",
        },
        {
          cause: "Reverse-proxy misconfiguration",
          fix:
            "Correct the specific routing or authentication-forwarding rule under change control.",
          verify:
            "Compare proxy and Nexus logs for the same controlled request.",
        },
        {
          cause: "Credential compromise",
          fix:
            "Follow the security incident process to contain exposure, revoke/rotate affected credentials, and investigate access history.",
          verify:
            "Confirm old credentials no longer work where expected and legitimate service access is restored with new credentials.",
        },
      ],
      rules: [
        "Change one relevant setting at a time where practical.",
        "Record the previous state and approved change.",
        "Avoid broad administrator grants and global anonymous access.",
        "Do not disable TLS verification or authentication controls.",
        "Check whether a client restart or secret refresh is required by its configuration.",
      ],
    },

    {
      step: 12,
      title: "Validate recovery and close the incident",
      actions: [
        "Repeat the original failed operation using an approved identity.",
        "Confirm the HTTP response and Nexus-side logs match the expected outcome.",
        "Validate artifact download and, if required, a controlled upload to a dedicated test repository.",
        "Confirm that unrelated identities and repositories retain their intended restrictions.",
        "Check that pipelines complete and downstream deployment stages are healthy.",
        "Observe error rates and authentication failure alerts for recurrence.",
        "Record the root cause, recovery evidence, and preventive actions.",
      ],
      successCriteria: [
        "The intended identity can perform its approved operation.",
        "The correct Nexus endpoint and repository are being used.",
        "No secrets appear in diagnostic output.",
        "Least-privilege controls remain in effect.",
        "CI/CD operations succeed without broad security exceptions.",
        "Logs and monitoring show no continuing authentication failure spike.",
      ],
    },
  ],

  rootCauseMatrix: [
    {
      cause: "Expired or rotated credential",
      evidence:
        "Failure begins after rotation and is limited to clients using a stale secret.",
      correction:
        "Fix secret propagation and rotate through the approved credential process.",
    },
    {
      cause: "Missing permission",
      evidence:
        "Identity is recognized, but the specific repository operation is denied.",
      correction:
        "Grant the minimum required privilege after confirming the intended access.",
    },
    {
      cause: "Incorrect client URL or credential scope",
      evidence:
        "The client sends credentials to a different host/path or uses the wrong registry configuration.",
      correction:
        "Correct the endpoint and client-specific credential mapping.",
    },
    {
      cause: "Realm or LDAP/SSO problem",
      evidence:
        "Multiple identities using the same authentication path fail while another path works.",
      correction:
        "Repair the relevant realm or identity integration using the approved change procedure.",
    },
    {
      cause: "Proxy strips or changes authentication",
      evidence:
        "The proxy path fails while a permitted direct path works, or proxy logs show a denial before Nexus.",
      correction:
        "Correct the specific proxy policy and validate both proxy and Nexus logs.",
    },
    {
      cause: "Repository-specific policy",
      evidence:
        "Only a particular repository or operation fails for an otherwise valid identity.",
      correction:
        "Review repository privileges, content selectors, and repository configuration.",
    },
    {
      cause: "Nexus or identity-provider health issue",
      evidence:
        "Failures coincide with server errors, resource pressure, or identity-provider outages.",
      correction:
        "Restore service health and validate authentication after the dependency recovers.",
    },
    {
      cause: "Credential compromise",
      evidence:
        "Unexpected credential use, suspicious source addresses, unauthorized changes, or unexplained access patterns.",
      correction:
        "Escalate to security, preserve evidence, revoke/rotate affected credentials, and follow incident response.",
    },
  ],

  prevention: {
    credentialManagement: [
      "Use a secrets manager or approved CI/CD secret store.",
      "Use separate service identities for distinct pipelines and environments.",
      "Rotate credentials with a documented propagation and verification procedure.",
      "Monitor expiration and revocation events where supported.",
      "Avoid long-lived credentials where supported short-lived mechanisms meet the requirement.",
      "Remove unused service accounts and obsolete credentials through change control.",
    ],
    accessControl: [
      "Apply least privilege at repository and operation level.",
      "Separate read-only dependency resolution from artifact publishing identities.",
      "Review role and privilege changes.",
      "Avoid shared administrator accounts for CI/CD.",
      "Audit anonymous access and external identity mappings.",
    ],
    pipelineReliability: [
      "Validate repository URLs and credential references before production use.",
      "Add a safe authentication smoke test using a dedicated read-only artifact.",
      "Add a separate controlled publishing test when upload permissions are required.",
      "Fail pipelines clearly on unexpected 401/403 responses.",
      "Redact secrets from build logs and artifacts.",
      "Avoid infinite retries for authentication failures.",
      "Document how to refresh secrets on persistent build agents.",
    ],
    monitoring: [
      "Alert on unusual increases in 401 and 403 responses.",
      "Separate authentication failures from repository upstream and server errors.",
      "Monitor LDAP/SSO health and relevant integration errors.",
      "Track failed artifact downloads and uploads by client type and repository.",
      "Record credential and permission changes through approved audit mechanisms.",
      "Maintain a documented recovery and escalation path.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    nexusInstance: "",
    environment: "production",
    affectedRepositories: [],
    affectedFormats: [],
    affectedClientTypes: [],
    affectedIdentitiesOrGroups: [],
    firstFailureUtc: "",
    detectionUtc: "",
    recoveryUtc: "",
    operationAffected: "",
    sanitizedHttpStatusAndError: "",
    requestCorrelationIds: [],
    clientAndVersion: "",
    recentCredentialChanges: "",
    recentRealmOrIdentityChanges: "",
    recentPermissionChanges: "",
    reverseProxyFindings: "",
    nexusLogFindings: "",
    identityProviderFindings: "",
    rootCause: "",
    customerAndPipelineImpact: "",
    mitigationApplied: "",
    securityCompromiseSuspected: false,
    securityEscalationReference: "",
    recoveryVerification: [],
    accessControlReview: "",
    whatWorked: [],
    whatDidNotWork: [],
    correctiveActions: [
      {
        action: "",
        owner: "",
        priority: "",
        dueDate: "",
        measurableSuccessCriteria: "",
      },
    ],
    blamelessSummary:
      "Explain the credential, configuration, policy, or dependency failure and which safeguards would prevent recurrence. Focus on system improvements rather than individual blame.",
  },

  handsOnLabs: [
    {
      lab: 1,
      title: "Distinguish authentication and authorization failures",
      environment: "Disposable Nexus test instance",
      tasks: [
        "Create a dedicated test identity with limited repository access.",
        "Test an allowed read operation.",
        "Test an operation that the identity is not permitted to perform.",
        "Compare the client response with Nexus logs and configured privileges.",
        "Restore the lab to its original state.",
      ],
      success:
        "Explain the difference between invalid authentication and a valid identity lacking the required privilege.",
    },
    {
      lab: 2,
      title: "Diagnose a stale CI/CD credential",
      environment: "Non-production pipeline and secret store",
      tasks: [
        "Configure a test pipeline with a dedicated read-only identity.",
        "Rotate its test credential using the approved lab procedure.",
        "Observe the failure while the client uses the stale value.",
        "Update the secret reference and verify access.",
        "Confirm that logs do not expose credential values.",
      ],
      success:
        "Identify secret propagation as the root cause without printing or copying the credential.",
    },
    {
      lab: 3,
      title: "Investigate a client-specific repository URL",
      environment: "Test Nexus repositories",
      tasks: [
        "Configure one client with an intentionally incorrect test URL.",
        "Capture the sanitized response and client configuration.",
        "Correct the URL and verify the intended repository is used.",
        "Compare the behavior of Maven, npm, or another available client.",
      ],
      success:
        "Explain how client configuration can create authentication-looking failures even when credentials are valid.",
    },
    {
      lab: 4,
      title: "Build an authentication failure dashboard",
      environment: "Test monitoring stack",
      tasks: [
        "Collect sanitized authentication failure metrics.",
        "Separate 401, 403, server errors, and upstream failures.",
        "Add a bounded alert for an unusual failure-rate increase.",
        "Test the alert using synthetic events.",
      ],
      success:
        "Detect an authentication incident without logging passwords or tokens.",
    },
    {
      lab: 5,
      title: "Write an evidence-based incident report",
      environment: "Synthetic incident timeline",
      tasks: [
        "Correlate client, proxy, Nexus, and identity-provider timestamps.",
        "Identify the first failure and the affected identity scope.",
        "Document the cause, correction, and verification evidence.",
        "Create preventive actions with owners and measurable criteria.",
      ],
      success:
        "Produce a blameless report that distinguishes confirmed cause from unverified hypotheses.",
    },
  ],

  interviewQuestions: [
    {
      question: "What is the difference between HTTP 401 and 403?",
      answer:
        "401 commonly indicates the request was not accepted as authenticated. 403 commonly indicates the request was refused. Exact semantics depend on the endpoint and intermediaries, so inspect logs and identity state.",
    },
    {
      question: "Why can a valid Nexus login still fail to upload an artifact?",
      answer:
        "The identity may lack repository add/edit privileges, use the wrong publishing endpoint, or be blocked by repository policy.",
    },
    {
      question: "How do you troubleshoot a Nexus authentication failure in CI/CD?",
      answer:
        "Confirm the endpoint and operation, capture sanitized status and timestamps, check the secret reference, compare a controlled client request, inspect Nexus and identity logs, and verify roles and repository privileges.",
    },
    {
      question: "How can credential rotation break builds?",
      answer:
        "A pipeline may still use an old secret, a build agent may cache configuration, or the new credential may not be valid for the expected authentication method.",
    },
    {
      question: "What is the role of authentication realms?",
      answer:
        "They enable supported authentication mechanisms. Incorrect realm configuration can affect which identities and client authentication flows work.",
    },
    {
      question: "How do you investigate LDAP-specific failures?",
      answer:
        "Compare local and LDAP-backed authentication, inspect LDAP connectivity and lookup errors, verify group mapping, and correlate identity-provider logs with the failing request.",
    },
    {
      question: "Why should an administrator avoid granting broad privileges as a quick fix?",
      answer:
        "It expands blast radius, may permit unauthorized publishing or deletion, and can hide the real cause. Grant only the privilege needed for the operation.",
    },
    {
      question: "How do you troubleshoot a reverse-proxy authentication issue?",
      answer:
        "Compare sanitized proxy and Nexus logs, confirm the request reaches the intended endpoint, and inspect routing and authentication-forwarding rules without exposing authorization headers.",
    },
    {
      question: "How can Maven authentication fail when credentials appear correct?",
      answer:
        "The repository URL may not match the settings.xml server ID, a mirror or profile may override the target, or the client may use a different settings file or secret binding.",
    },
    {
      question: "How do you verify that authentication recovery is safe?",
      answer:
        "Confirm the original operation succeeds, the intended identity is used, least-privilege restrictions remain intact, and no secrets appear in logs.",
    },
    {
      question: "What should you do if credential compromise is suspected?",
      answer:
        "Escalate to security, preserve audit evidence, contain and rotate affected credentials under the incident process, investigate access history, and validate legitimate access.",
    },
  ],

  completionChecklist: [
    "Incident severity and affected operations are recorded.",
    "The correct Nexus endpoint and repository are confirmed.",
    "Client type, version, identity scope, and first failure time are identified.",
    "The HTTP response is correlated with proxy and Nexus logs where available.",
    "Credential values are never exposed in diagnostics.",
    "Authentication and authorization are distinguished.",
    "Credential rotation, realm, LDAP/SSO, and client configuration are checked as applicable.",
    "Repository privileges and content selector rules are reviewed.",
    "The smallest safe correction is approved and applied.",
    "A controlled client operation confirms recovery.",
    "Read and write operations are tested separately where required.",
    "Least-privilege restrictions remain in place.",
    "Security concerns are escalated when indicated.",
    "Preventive actions and incident evidence are documented.",
  ],

  officialReferences: [
    {
      title: "Sonatype Nexus Repository Documentation",
      url: "https://help.sonatype.com/en/sonatype-nexus-repository.html",
    },
    {
      title: "Sonatype Documentation — Security",
      url: "https://help.sonatype.com/en/security.html",
    },
    {
      title: "Sonatype Documentation — User Authentication",
      url: "https://help.sonatype.com/en/user-authentication.html",
    },
    {
      title: "Sonatype Documentation — User and Role Management",
      url: "https://help.sonatype.com/en/user-management.html",
    },
    {
      title: "Sonatype Nexus Repository — REST API",
      url: "https://help.sonatype.com/en/rest-apis.html",
    },
    {
      title: "Apache Maven — Settings Reference",
      url: "https://maven.apache.org/settings.html",
    },
    {
      title: "npm — .npmrc Configuration",
      url: "https://docs.npmjs.com/cli/v10/configuring-npm/npmrc",
    },
    {
      title: "Docker — docker login",
      url: "https://docs.docker.com/reference/cli/docker/login/",
    },
    {
      title: "curl — Manual",
      url: "https://curl.se/docs/manpage.html",
    },
    {
      title: "OWASP — Secrets Management Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
    },
    {
      title: "OWASP — Logging Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html",
    },
  ],

  notes: [
    "Nexus Repository version, edition, enabled realms, and identity integration affect available behavior and endpoints.",
    "HTTP status codes alone do not prove the exact root cause.",
    "A successful status endpoint does not prove repository authentication and authorization are working.",
    "Avoid sharing unredacted Maven settings, npm configuration, Docker configuration, or identity-provider logs.",
    "Use product documentation for the deployed version before changing security configuration.",
    "This runbook is a diagnostic framework and does not authorize bypassing production security controls.",
  ],
} as const;

export default authenticationFailureGuide;
