
export const componentDeleteErrorGuide = {
  title: "Nexus Repository Component Delete Error",
  fileName: "ComponentDeleteError.ts",
  technology: "Sonatype Nexus Repository",
  category: "Nexus",
  severity: ["SEV-2", "SEV-3", "SEV-4"],

  overview: {
    summary:
      "Troubleshoot Nexus Repository component deletion failures without deleting unintended artifacts, breaking production builds, or causing irreversible blob-store changes.",

    incidentScenario: `
A production maintenance pipeline tries to delete an obsolete Maven component
from Nexus Repository, but the API returns 401, 403, 404, or 5xx. In another
case, the API returns 204, but the team still sees unexpected storage usage,
or a dependent deployment fails because a required artifact was removed.

The incident may involve incorrect component IDs, insufficient privileges,
repository type restrictions, stale search results, reverse proxies, cleanup
tasks, or blob-store behavior.
`,

    businessImpact: [
      "Release pipeline blocked because artifact cleanup failed.",
      "Production builds fail because a required artifact was deleted.",
      "Storage pressure continues even after components are removed.",
      "Cleanup automation deletes more artifacts than intended.",
      "Repository metadata, Docker tags, or shared assets cause confusion.",
      "Repeated delete retries obscure the original failure and audit trail.",
    ],

    guidingPrinciple:
      "Identify the exact repository and component, capture evidence, determine the deletion mechanism, then make one approved and narrowly scoped change.",
  },

  incidentManagement: {
    severityGuidance: [
      {
        level: "SEV-1",
        when:
          "Widespread production releases are blocked, critical artifacts are missing, or an ongoing cleanup operation threatens major artifact loss.",
        response:
          "Activate incident command, stop unsafe deletion automation, preserve evidence, and coordinate Nexus/platform/release owners.",
      },
      {
        level: "SEV-2",
        when:
          "A critical repository or release pipeline is significantly affected, but a limited workaround exists.",
        response:
          "Assign an owner, identify affected repositories and consumers, and restore a safe release path.",
      },
      {
        level: "SEV-3",
        when:
          "A component deletion fails for a limited artifact or a scheduled maintenance task.",
        response:
          "Investigate the exact component and correct the verified cause.",
      },
      {
        level: "SEV-4",
        when:
          "A non-production cleanup request fails without material service impact.",
        response:
          "Document the cause and correct it through the normal change process.",
      },
    ],

    incidentRoles: [
      "Incident commander: owns severity, communication, and change approval.",
      "Nexus administrator: verifies API, repository, privileges, tasks, and storage.",
      "Pipeline owner: verifies automation inputs and deployment dependencies.",
      "Application/release owner: confirms whether the artifact is safe to remove.",
      "Security or IAM owner: investigates authentication and authorization failures.",
    ],

    immediateActions: [
      "Pause the specific failing destructive job if it may continue deleting artifacts.",
      "Do not disable all Nexus authentication or grant administrator access as a workaround.",
      "Do not repeat DELETE requests blindly.",
      "Record the incident start time, request ID, actor, repository, component coordinates, and response.",
      "Check whether the component is referenced by active releases, deployments, or rollback plans.",
      "Use the organization's change approval and evidence-retention process.",
    ],
  },

  safetyChecks: [
    {
      check: "Confirm Nexus endpoint",
      action:
        "Verify the production hostname, base URL, TLS certificate, and environment against the approved configuration.",
    },
    {
      check: "Confirm repository identity",
      action:
        "Verify the exact repository name and whether it is hosted, proxy, or group.",
    },
    {
      check: "Confirm component identity",
      action:
        "Record format, group or namespace, name, version, asset paths, and component ID from a trusted lookup.",
    },
    {
      check: "Confirm deletion scope",
      action:
        "Determine whether the request targets one component, one asset, a cleanup policy, or a broad automation loop.",
    },
    {
      check: "Confirm artifact dependencies",
      action:
        "Check release manifests, build files, image references, rollback requirements, and consumer usage.",
    },
    {
      check: "Confirm authorization",
      action:
        "Verify the intended service account and repository-specific delete privileges without expanding access unnecessarily.",
    },
    {
      check: "Confirm recovery options",
      action:
        "Check backups, blob-store protections, artifact re-publication options, and restore procedures before deletion.",
    },
  ],

  evidenceCollection: {
    collect: [
      "Incident ID and timestamps with timezone.",
      "Nexus Repository version, deployment type, and database type if known.",
      "Repository format, name, and repository type.",
      "Component coordinates, component ID, and affected asset paths.",
      "HTTP method, sanitized URL, HTTP status, response body, and request/correlation ID.",
      "Pipeline run ID, commit SHA, job parameters, and service-account identity.",
      "Nexus application and request logs for the relevant time window.",
      "Reverse-proxy or ingress logs if the request passes through a gateway.",
      "Relevant role, privilege, content selector, and authentication configuration changes.",
      "Cleanup task history, policy configuration, and task timestamps if cleanup is involved.",
      "Blob-store status, disk usage, and storage alerts.",
      "Recent deployments, Nexus upgrades, credential rotations, and network changes.",
    ],

    redactionRules: [
      "Never paste passwords, bearer tokens, cookies, or private keys into incident tickets.",
      "Avoid printing Authorization headers or enabling verbose HTTP tracing that exposes secrets.",
      "Use approved secret stores and short-lived credentials where supported.",
      "Preserve relevant logs according to the organization's retention policy.",
    ],
  },

  diagnosticSequence: [
    {
      step: 1,
      title: "Define the exact failure",
      purpose:
        "Distinguish a failed DELETE request from a successful deletion, a stale UI result, or an unrelated storage issue.",
      actions: [
        "Capture the HTTP status and sanitized response body.",
        "Identify whether deletion was started manually, by CI/CD, or by a scheduled cleanup task.",
        "Determine whether one component or many components are affected.",
        "Check if the issue began after a role change, credential rotation, proxy change, or Nexus upgrade.",
      ],
      decisionBranches: [
        {
          condition: "Only one component fails",
          next:
            "Validate its repository, component ID, format, permissions, and lifecycle requirements.",
        },
        {
          condition: "All components fail",
          next:
            "Check shared authentication, privileges, gateway behavior, Nexus health, and automation configuration.",
        },
        {
          condition: "API reports success but UI appears unchanged",
          next:
            "Re-query the component, confirm the response endpoint, and investigate stale results or the wrong repository.",
        },
        {
          condition: "Unexpected components are being removed",
          next:
            "Stop the relevant destructive job or task and investigate the target-selection logic before any further deletion.",
        },
      ],
    },

    {
      step: 2,
      title: "Validate Nexus availability and API route",
      purpose:
        "Separate application availability, routing, TLS, and API failures.",
      commands: [
        {
          name: "Check Nexus status endpoint",
          command:
            'curl --silent --show-error --output /dev/null --write-out "HTTP %{http_code}\\n" "https://nexus.example.com/service/rest/v1/status"',
          notes:
            "Replace the hostname with the approved endpoint. This is a read-only connectivity check; status endpoint availability and semantics depend on the installed version and configuration.",
        },
        {
          name: "Inspect API documentation endpoint",
          command:
            'curl --silent --show-error --output /dev/null --write-out "HTTP %{http_code}\\n" "https://nexus.example.com/service/rest/swagger.json"',
          notes:
            "Use the instance's published API specification to confirm supported endpoints and parameters. A failed request alone does not prove Nexus is down.",
        },
      ],
      decisionBranches: [
        {
          condition: "DNS resolution or connection fails",
          next:
            "Check DNS, routing, firewall rules, load balancer health, service endpoints, and TLS.",
        },
        {
          condition: "Gateway returns 502, 503, or 504",
          next:
            "Correlate proxy logs with Nexus application health and upstream connection errors.",
        },
        {
          condition: "API documentation responds but DELETE fails",
          next:
            "Continue with endpoint, authorization, target identity, and request semantics.",
        },
      ],
    },

    {
      step: 3,
      title: "Verify the installed API contract",
      purpose:
        "Avoid assuming an endpoint, parameter, or response is identical across all Nexus versions.",
      actions: [
        "Open the API reference supplied by the actual Nexus instance.",
        "Locate the component DELETE endpoint and any relevant asset endpoints.",
        "Verify the supported HTTP method, path parameters, permissions, and expected response.",
        "Check release notes if behavior changed after an upgrade.",
      ],
      reference:
        "https://help.sonatype.com/en/api-reference.html",
      warning:
        "Do not substitute a repository DELETE endpoint for a component DELETE endpoint. Deleting a repository is a much broader destructive operation.",
    },

    {
      step: 4,
      title: "Validate component coordinates and ID",
      purpose:
        "Ensure the pipeline is targeting the intended component rather than an incorrect or stale identifier.",
      actions: [
        "Search for the component using its exact repository, name, namespace/group, and version.",
        "Inspect the returned component ID and associated asset paths.",
        "Check whether the search result is paginated or whether the automation selected the wrong match.",
        "Confirm the component belongs to the intended repository, not a similarly named repository.",
        "Regenerate the target ID using a supported API response instead of manually editing an encoded ID.",
      ],
      example:
        "For Maven, verify repository, groupId, artifactId, and version. For npm or Docker, verify package namespace/name and version or tag, as applicable.",
      decisionBranches: [
        {
          condition: "Component lookup returns no matching result",
          next:
            "Re-check coordinates, repository type, spelling, encoding, pagination, and whether the component already disappeared.",
        },
        {
          condition: "Multiple results match",
          next:
            "Add exact repository and version filters and require a single verified target before deletion.",
        },
        {
          condition: "The component ID came from an old pipeline run",
          next:
            "Re-query the current component and validate its identity before proceeding.",
        },
      ],
    },

    {
      step: 5,
      title: "Investigate 401 Unauthorized",
      purpose:
        "Identify missing, expired, invalid, or incorrectly forwarded credentials.",
      checks: [
        "Verify the expected service-account identity.",
        "Check whether the secret was rotated or expired.",
        "Check whether the pipeline uses the correct credential binding and Nexus endpoint.",
        "Verify that reverse-proxy authentication forwarding has not changed.",
        "Check Nexus and identity-provider logs at the exact request timestamp.",
      ],
      decisionBranches: [
        {
          condition: "Browser login works but pipeline receives 401",
          next:
            "Compare the pipeline's service identity and credential source; do not assume browser and CI identities are equivalent.",
        },
        {
          condition: "Failure started after secret rotation",
          next:
            "Validate the new secret in the approved secret manager and update the pipeline binding through change control.",
        },
        {
          condition: "All identities receive 401",
          next:
            "Investigate shared authentication, realm, proxy, or identity-provider issues.",
        },
      ],
      fix:
        "Correct the credential source or authentication configuration after verifying the evidence. Never place credentials directly in scripts or logs.",
    },

    {
      step: 6,
      title: "Investigate 403 Forbidden",
      purpose:
        "Distinguish successful authentication from insufficient delete authorization.",
      checks: [
        "Verify repository-specific delete privileges for the intended format and repository.",
        "Inspect the service account's effective roles and group membership.",
        "Check content selectors and other applicable authorization restrictions.",
        "Confirm the account is not accidentally using a read-only role.",
        "Compare the failing request with an approved, authorized request to the same repository.",
      ],
      decisionBranches: [
        {
          condition: "Read and browse work but delete fails",
          next:
            "Investigate delete-specific privilege and authorization restrictions.",
        },
        {
          condition: "Only one repository returns 403",
          next:
            "Compare its privileges, selectors, and configuration with a known-good repository of the same type.",
        },
        {
          condition: "Permissions changed recently",
          next:
            "Review the audit/change history and restore only the intended least-privilege access.",
        },
      ],
      fix:
        "Grant the narrowest approved repository delete privilege required by the workflow. Do not grant broad administrator privileges merely to make the error disappear.",
    },

    {
      step: 7,
      title: "Investigate 404 Not Found",
      purpose:
        "Determine whether the target, endpoint, path, or routing is incorrect.",
      checks: [
        "Verify the endpoint path and HTTP method against the installed API documentation.",
        "Confirm the component ID was returned by the same Nexus instance.",
        "Check whether the component was already deleted or changed between lookup and deletion.",
        "Verify URL encoding and reverse-proxy path rewriting.",
        "Inspect the request path and upstream response in gateway logs.",
      ],
      decisionBranches: [
        {
          condition: "Component lookup also returns no result",
          next:
            "Investigate target identity, repository filters, and prior deletion.",
        },
        {
          condition: "Component lookup succeeds but DELETE returns 404",
          next:
            "Compare IDs, endpoint paths, URL encoding, instance routing, permissions, and version-specific API behavior.",
        },
        {
          condition: "Only requests through the gateway fail",
          next:
            "Compare direct internal routing, where permitted, with gateway path rewriting and access rules.",
        },
      ],
      caution:
        "A 404 does not by itself prove the component never existed. Some routing and authorization configurations can affect what a client observes.",
    },

    {
      step: 8,
      title: "Investigate 400, 405, and malformed requests",
      purpose:
        "Find incorrect request construction or unsupported HTTP methods.",
      checks: [
        "Confirm the API path and HTTP method.",
        "Check whether a component ID or repository name is being URL-encoded correctly.",
        "Inspect shell quoting and environment-variable expansion in the pipeline.",
        "Confirm the request is not sending an unnecessary body or malformed query parameters.",
        "Review Nexus upgrade notes for stricter URL parsing behavior.",
      ],
      decisionBranches: [
        {
          condition: "Manual request works but pipeline request fails",
          next:
            "Compare the exact sanitized method, URL, headers, and parameter construction.",
        },
        {
          condition: "Failures began after an upgrade",
          next:
            "Validate request encoding and route behavior against the new API contract.",
        },
      ],
      reference:
        "https://help.sonatype.com/en/automation.html",
    },

    {
      step: 9,
      title: "Investigate 409, 429, and 5xx responses",
      purpose:
        "Separate target-state conflicts, throttling, and server-side failures.",
      checks: [
        "Capture the full sanitized response body and request/correlation ID.",
        "Check whether another cleanup job or pipeline is operating on the same target.",
        "Check reverse-proxy rate limits and upstream timeouts where applicable.",
        "Review Nexus application logs, task activity, disk usage, and database health.",
        "Check whether the response came from Nexus or an intermediary gateway.",
      ],
      decisionBranches: [
        {
          condition: "429 Too Many Requests",
          next:
            "Reduce concurrency and follow documented retry guidance. Use bounded backoff only for operations known to be safe to retry.",
        },
        {
          condition: "5xx occurs across many endpoints",
          next:
            "Investigate Nexus availability, resource saturation, storage, database, and gateway health before retrying.",
        },
        {
          condition: "Failure affects only one component",
          next:
            "Investigate component-specific state, concurrent operations, and request construction.",
        },
      ],
      retryPolicy:
        "Do not automatically retry destructive requests without verifying the current component state and retry semantics. Record each attempt and avoid uncontrolled retry loops.",
    },

    {
      step: 10,
      title: "Validate repository type and format behavior",
      purpose:
        "Confirm the target repository supports the intended component deletion workflow.",
      checks: [
        "Identify whether the repository is hosted, proxy, or group.",
        "Confirm the component is stored in the expected repository rather than merely visible through a group repository.",
        "Use the supported delete operation for the installed Nexus version and format.",
        "Check whether assets are shared across components.",
        "For Docker, distinguish image tags, manifests, layers, and shared content.",
      ],
      decisionBranches: [
        {
          condition: "Component is visible only through a group repository",
          next:
            "Find the underlying member repository that actually contains the component and verify its deletion rules.",
        },
        {
          condition: "Docker image deletion leaves storage usage unchanged",
          next:
            "Check shared layers, manifests, blob cleanup, and compaction status; do not assume deletion failed solely because storage did not shrink.",
        },
        {
          condition: "The repository type does not support the expected delete operation",
          next:
            "Use the documented workflow for that repository type or reassess whether deletion is appropriate.",
        },
      ],
      reference:
        "https://help.sonatype.com/en/viewing-component-information.html",
    },

    {
      step: 11,
      title: "Investigate cleanup policies and scheduled tasks",
      purpose:
        "Distinguish manual component deletion from policy-driven cleanup.",
      checks: [
        "Inspect the cleanup policy attached to the affected repository.",
        "Review the configured age, usage, release-type, and asset-matching criteria.",
        "Preview the cleanup candidates before changing or rerunning a production cleanup.",
        "Check task history, execution timestamps, and task errors.",
        "Verify whether the policy affects more repositories or components than expected.",
        "Check whether another automation process is deleting the same targets.",
      ],
      decisionBranches: [
        {
          condition: "Manual deletion succeeds but cleanup removes unexpected components",
          next:
            "Inspect policy criteria, regex semantics, repository assignments, and preview results.",
        },
        {
          condition: "Components disappear from the UI but storage usage remains",
          next:
            "Investigate soft deletion, unused-asset cleanup, blob-store compaction, and storage accounting.",
        },
        {
          condition: "Cleanup task fails",
          next:
            "Read the task error and Nexus logs, verify task permissions and repository health, and correct the specific cause.",
        },
      ],
      important:
        "Cleanup policies may soft-delete components. Blob-store compaction is a separate operation and can permanently remove data. Confirm retention and recovery requirements before running it.",
      references: [
        "https://help.sonatype.com/en/cleanup-policies.html",
        "https://help.sonatype.com/en/tasks.html",
      ],
    },

    {
      step: 12,
      title: "Inspect reverse proxy, ingress, and TLS",
      purpose:
        "Identify failures introduced between the client and Nexus.",
      checks: [
        "Compare client-visible status with gateway and Nexus upstream logs.",
        "Verify path-prefix rewriting and request routing.",
        "Check TLS certificate validity, hostname, and trust chain.",
        "Check request filtering, authentication forwarding, and rate limits.",
        "Look for timeouts or connection resets that interrupt requests.",
      ],
      decisionBranches: [
        {
          condition: "Gateway returns an error but Nexus has no corresponding request",
          next:
            "Investigate gateway routing, authentication, request filtering, and upstream connectivity.",
        },
        {
          condition: "Nexus logs the request and returns the error",
          next:
            "Continue with the Nexus-side response, permissions, repository state, and application logs.",
        },
      ],
    },

    {
      step: 13,
      title: "Inspect application, database, and blob-store health",
      purpose:
        "Find infrastructure causes that can affect deletion operations.",
      checks: [
        "Review Nexus application logs around the exact request time.",
        "Check free disk space, inode availability, filesystem health, and blob-store reachability.",
        "Review database connectivity, pool exhaustion, and relevant errors.",
        "Check JVM heap, garbage collection, CPU, and memory pressure where available.",
        "Check for long-running tasks, queue buildup, or repository-wide latency.",
        "Verify storage backend health and the status of any relevant maintenance tasks.",
      ],
      safety:
        "Use approved monitoring and supported diagnostic interfaces. Do not edit Nexus database tables, manually delete blob files, or alter internal storage metadata to force a deletion.",
      decisionBranches: [
        {
          condition: "Disk or blob-store errors are present",
          next:
            "Stabilize the storage backend and follow the approved Nexus recovery procedure before retrying.",
        },
        {
          condition: "Database or application health is degraded",
          next:
            "Escalate to the Nexus/platform owner and restore service health before repeating destructive actions.",
        },
        {
          condition: "Infrastructure is healthy and only authorization fails",
          next:
            "Return to identity, effective privileges, and repository authorization checks.",
        },
      ],
    },

    {
      step: 14,
      title: "Correct the pipeline's target-selection logic",
      purpose:
        "Prevent a technically valid DELETE request from targeting the wrong artifact.",
      checks: [
        "Verify repository and component coordinates come from explicit pipeline inputs.",
        "Confirm search results are filtered by exact repository and component identity.",
        "Check pagination and whether the script silently selects the first result.",
        "Reject empty, ambiguous, or unexpected component IDs.",
        "Require a dry-run report and approval for production deletion.",
        "Log the exact target identity and change/ticket ID without exposing secrets.",
      ],
      decisionBranches: [
        {
          condition: "The script selects multiple matches",
          next:
            "Fail closed and require explicit target disambiguation.",
        },
        {
          condition: "The target list is unexpectedly large or empty",
          next:
            "Abort the run, inspect filters and environment variables, and require review before retrying.",
        },
      ],
    },

    {
      step: 15,
      title: "Perform controlled recovery",
      purpose:
        "Restore the intended state without creating additional artifact loss.",
      actions: [
        "Confirm the root cause with request evidence and logs.",
        "Obtain the required production approval.",
        "Correct only the verified issue: credentials, privileges, endpoint, target ID, policy, or infrastructure.",
        "Re-query the exact component and confirm it is still an approved deletion target.",
        "Run a single controlled operation against the approved target.",
        "Record the HTTP result and verify the component state using a supported read/search operation.",
        "Validate affected build and deployment workflows.",
        "Escalate to the artifact owner if a deleted artifact must be republished or restored.",
      ],
      stopConditions: [
        "The component identity cannot be confirmed.",
        "The target is used by an active release or rollback plan.",
        "Unexpected deletion candidates appear.",
        "Nexus or its storage backend is unhealthy.",
        "The required approval is missing.",
        "The result is ambiguous and another destructive attempt could increase impact.",
      ],
    },

    {
      step: 16,
      title: "Validate recovery and close the incident",
      purpose:
        "Confirm the repository and its consumers are back in the expected state.",
      validation: [
        "Confirm the intended component is absent when deletion was expected.",
        "Confirm unrelated components remain available.",
        "Check affected CI/CD pipelines and representative consumer builds.",
        "Verify Docker tags, manifests, and image pulls where relevant.",
        "Check cleanup task completion and blob-store status if storage cleanup was involved.",
        "Confirm storage metrics separately; immediate disk-space reduction is not guaranteed.",
        "Monitor for repeat failures and review the incident with the relevant owners.",
      ],
      exitCriteria: [
        "Root cause is documented with supporting evidence.",
        "No unintended artifact deletion is observed.",
        "The approved deletion outcome is verified.",
        "Dependent release/build workflows are healthy.",
        "Corrective and preventive actions have owners and due dates.",
      ],
    },
  ],

  apiExamples: {
    baseUrl:
      "https://nexus.example.com",

    warning:
      "Illustrative examples only. Replace the host and component ID with values verified from the actual instance. Use a secured credential mechanism approved by your organization. Do not run DELETE commands until the target, authorization, dependency impact, and approval have been checked.",

    readOnlyLookup: {
      purpose:
        "Search the exact component before deciding whether to delete it.",
      command:
        'curl --fail-with-body --silent --show-error --user "$NEXUS_USER" "https://nexus.example.com/service/rest/v1/search?repository=maven-releases&group=org.example&name=sample-library&version=1.2.3"',
      notes: [
        "The example assumes a Maven repository and uses illustrative coordinates.",
        "Supply the password through a secure interactive or secret-manager mechanism compatible with curl; do not put it in source control.",
        "Inspect all pages when the API returns a continuation token.",
        "Verify the returned repository and coordinates, not only the component ID.",
      ],
    },

    deleteComponent: {
      purpose:
        "Delete one previously verified component using the documented component endpoint.",
      command:
        'curl --silent --show-error --output /tmp/nexus-delete-response.txt --write-out "HTTP %{http_code}\\n" --user "$NEXUS_USER" --request DELETE "https://nexus.example.com/service/rest/v1/components/REPLACE_WITH_VERIFIED_COMPONENT_ID"',
      expected:
        "A successful component deletion commonly returns HTTP 204 No Content, according to the documented endpoint.",
      safety: [
        "This command is destructive.",
        "Replace the example ID only after confirming the exact target.",
        "Use an approved secure credential mechanism.",
        "Do not include the command in an unattended production job without safeguards.",
        "A response alone is not the complete recovery validation; re-query the target and test affected consumers.",
      ],
    },

    safeCommandPractices: [
      "Prefer read-only diagnostics until the target and failure mechanism are known.",
      "Avoid printing environment variables that may contain credentials.",
      "Avoid disabling TLS verification to work around certificate failures.",
      "Do not use a broad wildcard or delete an entire repository to solve a single-component issue.",
      "Treat command output and API response bodies as evidence, not as proof of the root cause by themselves.",
    ],
  },

  rootCauseMatrix: [
    {
      symptom: "401 Unauthorized",
      likelyCauses:
        "Expired or incorrect credentials, wrong service identity, authentication forwarding problem.",
      evidence:
        "Sanitized response, identity-provider logs, pipeline secret version, Nexus request logs.",
      remediation:
        "Correct the credential source or authentication configuration.",
    },
    {
      symptom: "403 Forbidden",
      likelyCauses:
        "Missing repository delete privilege, role/group change, applicable authorization restriction.",
      evidence:
        "Effective role membership, privilege configuration, repository-specific access comparison.",
      remediation:
        "Grant the minimum approved privilege required for the intended repository.",
    },
    {
      symptom: "404 Not Found",
      likelyCauses:
        "Wrong ID, wrong instance, missing component, incorrect path, URL encoding, gateway rewrite.",
      evidence:
        "Current component lookup, request path, API specification, gateway logs.",
      remediation:
        "Correct the endpoint or target identity; do not repeat the delete blindly.",
    },
    {
      symptom: "400 or 405",
      likelyCauses:
        "Malformed request, wrong HTTP method, unsupported endpoint, incorrect parameter encoding.",
      evidence:
        "Sanitized request, API reference, Nexus version and upgrade history.",
      remediation:
        "Use the documented endpoint and valid request format.",
    },
    {
      symptom: "429 Too Many Requests",
      likelyCauses:
        "Rate limiting, excessive parallel cleanup, gateway throttling.",
      evidence:
        "Response headers, gateway policy, pipeline concurrency, request rate.",
      remediation:
        "Reduce concurrency and use bounded, documented retry behavior.",
    },
    {
      symptom: "5xx or timeout",
      likelyCauses:
        "Nexus application issue, database/storage problems, resource pressure, gateway timeout.",
      evidence:
        "Application logs, request IDs, storage/database monitoring, gateway logs.",
      remediation:
        "Restore service health before controlled retry.",
    },
    {
      symptom: "204 but UI still shows the component",
      likelyCauses:
        "Stale view, wrong repository, concurrent publish, wrong target, delayed observation.",
      evidence:
        "Fresh API lookup, repository identity, task logs, publish history.",
      remediation:
        "Verify the exact target and current state; do not delete a second matching result automatically.",
    },
    {
      symptom: "Component gone but storage has not reduced",
      likelyCauses:
        "Soft deletion, shared blobs, pending compaction, storage accounting behavior.",
      evidence:
        "Cleanup and compaction task history, blob-store metrics, format-specific behavior.",
      remediation:
        "Follow the documented retention and storage-maintenance workflow.",
    },
    {
      symptom: "Unexpected components deleted",
      likelyCauses:
        "Broad filters, pagination bug, incorrect environment, regex mismatch, overbroad cleanup policy.",
      evidence:
        "Target list, pipeline logs, policy preview, change history.",
      remediation:
        "Stop destructive automation and investigate the target-selection logic before resuming.",
    },
  ],

  prevention: {
    pipelineControls: [
      "Use separate read and delete identities where practical.",
      "Require an explicit repository, component name, and version for destructive requests.",
      "Fail closed when a lookup returns zero or multiple unexpected targets.",
      "Generate a dry-run list before production deletion.",
      "Require approval for production repositories and large target sets.",
      "Limit parallel deletes and implement controlled retry behavior.",
      "Record target coordinates, request IDs, actor, and change ticket.",
      "Run automated tests for pagination, filters, and environment selection.",
      "Never store credentials in Git or expose them in build logs.",
    ],

    nexusControls: [
      "Apply least-privilege repository permissions.",
      "Review cleanup policies and their repository assignments.",
      "Preview cleanup candidates before a policy change or production run.",
      "Monitor task failures, disk capacity, blob-store health, and database health.",
      "Document artifact retention and restoration requirements.",
      "Test restore and artifact re-publication procedures in a safe environment.",
      "Review Nexus upgrade notes and API compatibility before automation changes.",
    ],

    observability: [
      "Alert on sudden increases in deletion failures.",
      "Alert on unusual deletion volume or changes outside approved windows.",
      "Track cleanup task duration and failure counts.",
      "Monitor disk space, inode usage, blob-store health, and application errors.",
      "Correlate Nexus requests with CI/CD run IDs and change records.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    startTime: "",
    detectionTime: "",
    resolutionTime: "",
    environment: "",
    nexusVersion: "",
    repositoryName: "",
    repositoryType: "",
    componentCoordinates: "",
    componentId: "",
    httpMethod: "",
    httpStatus: "",
    requestId: "",
    impact: "",
    evidenceCollected: [],
    rootCause: "",
    correctiveAction: "",
    recoveryValidation: [],
    preventionActions: [],
    actionOwners: [],
  },

  handsOnLabs: [
    {
      name: "Lab 1 - Wrong component ID",
      objective:
        "Understand why a stale or incorrect component ID can fail.",
      tasks: [
        "Create a disposable test component in a non-production repository.",
        "Find it using the supported search API.",
        "Compare the returned ID and coordinates.",
        "In a safe test, use a deliberately invalid ID and capture the response.",
        "Document the difference between target lookup and deletion.",
      ],
    },
    {
      name: "Lab 2 - Authentication versus authorization",
      objective:
        "Distinguish invalid credentials from insufficient delete privileges.",
      tasks: [
        "Use a test account with read-only permissions.",
        "Verify that read access works where expected.",
        "Attempt an approved deletion only against a disposable test component.",
        "Record the observed status and relevant server-side evidence.",
        "Grant the minimum test privilege and verify the controlled result.",
      ],
    },
    {
      name: "Lab 3 - Cleanup policy preview",
      objective:
        "Understand policy-driven cleanup and candidate selection.",
      tasks: [
        "Create disposable test artifacts.",
        "Configure a narrowly scoped test cleanup policy.",
        "Preview the affected components.",
        "Compare the preview with the intended retention rules.",
        "Run the approved test cleanup and observe soft-delete behavior.",
      ],
    },
    {
      name: "Lab 4 - Pipeline target safety",
      objective:
        "Prevent an automation script from deleting ambiguous targets.",
      tasks: [
        "Create test fixtures with multiple component versions.",
        "Implement exact repository/name/version matching.",
        "Test empty results, multiple matches, and pagination.",
        "Make the script abort on unexpected target counts.",
        "Add dry-run output and a test approval gate.",
      ],
    },
    {
      name: "Lab 5 - Storage versus component deletion",
      objective:
        "Understand why deletion and disk-space reclamation may occur at different times.",
      tasks: [
        "Inspect a disposable component and its associated assets.",
        "Delete only the approved test component.",
        "Re-query component visibility and inspect storage metrics.",
        "Review the documented unused-asset cleanup and compaction tasks.",
        "Run maintenance only in an approved test environment and compare the results.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question:
        "What is the difference between 401 and 403 during a Nexus component deletion?",
      expectedAnswer:
        "401 generally indicates an authentication problem; 403 generally indicates that the authenticated identity is not permitted to perform the operation. Confirm using response details, effective privileges, and server logs.",
    },
    {
      question:
        "Why might DELETE return 204 while storage usage remains unchanged?",
      expectedAnswer:
        "Component metadata deletion does not necessarily reclaim blob-store space immediately. Soft deletion, shared assets, cleanup tasks, compaction, and storage accounting can affect the observed result.",
    },
    {
      question:
        "Why should a pipeline verify a component ID immediately before deletion?",
      expectedAnswer:
        "Search results can be stale or ambiguous, components can change between lookup and deletion, and an incorrect ID may target the wrong artifact.",
    },
    {
      question:
        "What should you check if deleting through a group repository fails?",
      expectedAnswer:
        "Determine which underlying member repository stores the component and verify the documented deletion behavior, permissions, and target identity.",
    },
    {
      question:
        "Why is granting administrator privileges not a good first fix for a 403?",
      expectedAnswer:
        "It expands access unnecessarily and may enable broader destructive actions. Identify the missing privilege and grant only the approved minimum access.",
    },
    {
      question:
        "How do you troubleshoot unexpected cleanup-policy deletions?",
      expectedAnswer:
        "Stop the affected automation, inspect policy criteria and repository assignments, review preview results and logs, and verify matching behavior before resuming.",
    },
    {
      question:
        "What is the difference between deleting a component and deleting a repository?",
      expectedAnswer:
        "Component deletion targets an individual component and its associated assets according to format behavior. Repository deletion removes the repository itself and has a much broader impact.",
    },
    {
      question:
        "What evidence is required before closing a production deletion incident?",
      expectedAnswer:
        "Verified target identity, sanitized request/response evidence, root cause, confirmed intended repository state, consumer validation, and documented preventive actions.",
    },
  ],

  completionChecklist: [
    "Incident severity and affected repositories are documented.",
    "The exact component identity and deletion mechanism are confirmed.",
    "Credentials and privileges are verified without exposing secrets.",
    "HTTP response and relevant logs are captured.",
    "Repository type and format-specific behavior are understood.",
    "Cleanup policies and tasks are checked where relevant.",
    "The verified root cause is corrected with approval.",
    "Recovery and dependent build/deployment workflows are validated.",
    "No unintended artifact loss is observed.",
    "Prevention actions, owners, and follow-up dates are recorded.",
  ],

  officialReferences: [
    {
      title: "Nexus Repository API Reference",
      url: "https://help.sonatype.com/en/api-reference.html",
    },
    {
      title: "Components API",
      url: "https://help.sonatype.com/en/components-api.html",
    },
    {
      title: "Viewing Component Information",
      url: "https://help.sonatype.com/en/viewing-component-information.html",
    },
    {
      title: "Cleanup Policies",
      url: "https://help.sonatype.com/en/cleanup-policies.html",
    },
    {
      title: "Tasks",
      url: "https://help.sonatype.com/en/tasks.html",
    },
    {
      title: "Automation",
      url: "https://help.sonatype.com/en/automation.html",
    },
    {
      title: "Repository Management",
      url: "https://help.sonatype.com/en/repository-management.html",
    },
  ],
} as const;

export default componentDeleteErrorGuide;
