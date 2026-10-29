
export const proxyCacheMissGuide = {
  title: "Nexus Repository Proxy Cache Miss",
  fileName: "ProxyCacheMiss.ts",
  technology: "Sonatype Nexus Repository",
  category: "Nexus",
  severity: ["SEV-2", "SEV-3", "SEV-4"],

  overview: {
    summary:
      "Troubleshoot proxy repository cache misses, upstream fetch failures, negative caching, stale metadata, incorrect remote URLs, authentication, throttling, DNS/TLS failures, and CI/CD dependency resolution problems.",

    incidentScenario: `
A production build suddenly fails to download a dependency from Nexus.
The same artifact may download successfully from the upstream public registry,
but the Nexus proxy returns 404, 502, 503, or a timeout.

Another common scenario is that a package version was published recently,
but Nexus continues to return a previous not-found result or stale metadata.
In other cases, previously cached artifacts work, but uncached artifacts fail
because the upstream repository is unavailable or Nexus cannot reach it.

The incident may involve negative cache TTL, metadata age, wrong remote storage,
an auto-blocked proxy, upstream authentication, rate limits, TLS, DNS,
network egress, format-specific URL paths, or incorrect group repository routing.
`,

    businessImpact: [
      "CI/CD builds fail while resolving uncached dependencies.",
      "New package versions are unavailable to developers.",
      "Production releases are delayed by missing artifacts.",
      "Builds become inconsistent across agents with different local caches.",
      "Upstream outages affect all dependencies not already cached.",
      "Excessive cache invalidation can increase outbound traffic and trigger rate limits.",
      "Incorrect proxy configuration can route requests to the wrong upstream repository.",
    ],

    keyConcepts: [
      {
        term: "Cache hit",
        explanation:
          "The requested content can be served from the proxy repository's local cache.",
      },
      {
        term: "Cache miss",
        explanation:
          "The requested content is not available as a usable cached result, so Nexus may need to query the remote repository.",
      },
      {
        term: "Negative cache",
        explanation:
          "Nexus temporarily remembers a not-found result to avoid repeatedly requesting a component that the remote repository does not have.",
      },
      {
        term: "Metadata cache",
        explanation:
          "Metadata such as version lists or package indexes can have a refresh schedule separate from individual component files.",
      },
      {
        term: "Remote storage",
        explanation:
          "The upstream repository URL configured for a proxy repository.",
      },
      {
        term: "Group repository",
        explanation:
          "A combined endpoint that exposes multiple member repositories. The requested artifact may be available through a different member than the one initially investigated.",
      },
    ],

    corePrinciple:
      "First determine whether the component is genuinely absent upstream, temporarily hidden by a negative cache, stale in metadata, or unreachable because of an upstream/network/configuration failure. Do not clear caches as the default first action.",
  },

  incidentManagement: {
    severityGuidance: [
      {
        severity: "SEV-2",
        condition:
          "Critical production builds cannot resolve uncached dependencies across multiple repositories or teams.",
        response:
          "Coordinate Nexus, network, and CI/CD owners; identify whether the upstream or shared proxy path is failing.",
      },
      {
        severity: "SEV-3",
        condition:
          "A specific package, format, repository, or release pipeline is affected.",
        response:
          "Investigate the exact artifact path, cache behavior, upstream response, and repository routing.",
      },
      {
        severity: "SEV-4",
        condition:
          "A non-production dependency is missing or a recently published package is temporarily not visible.",
        response:
          "Validate metadata and negative cache settings, then make a controlled correction if required.",
      },
    ],

    immediateActions: [
      "Capture the exact artifact coordinates and full requested path.",
      "Identify the affected Nexus proxy repository and any group repository used by the client.",
      "Determine whether the failure affects one artifact, one format, or all uncached artifacts.",
      "Compare a known cached artifact with the failing uncached artifact.",
      "Check whether the upstream repository is reachable from Nexus itself.",
      "Preserve sanitized client output and relevant Nexus logs before making changes.",
      "Avoid repeated cache invalidation, repository recreation, and mass dependency retries.",
    ],

    roles: [
      "Incident commander: owns severity, communication, and production change approvals.",
      "Nexus administrator: checks proxy configuration, cache behavior, tasks, and request logs.",
      "Network/platform engineer: investigates DNS, TLS, outbound proxy, firewall, and egress.",
      "CI/CD owner: validates dependency coordinates, client configuration, and pipeline impact.",
      "Upstream service owner: investigates availability, authentication, and rate limits at the remote registry.",
    ],
  },

  safetyChecks: [
    {
      check: "Confirm environment and repository",
      action:
        "Verify production/non-production, Nexus hostname, proxy repository name, and group repository URL.",
    },
    {
      check: "Confirm exact artifact identity",
      action:
        "Record format, group/namespace, artifact/package name, version, classifier or architecture if applicable, and exact path.",
    },
    {
      check: "Confirm upstream remote URL",
      action:
        "Compare the configured remote storage URL with the official or approved upstream endpoint for that format.",
    },
    {
      check: "Check repository state",
      action:
        "Inspect whether the proxy is ready, remotely available, manually blocked, auto-blocked, or offline.",
    },
    {
      check: "Check the blast radius",
      action:
        "Determine whether one package, a repository, an entire format, or all uncached dependencies are affected.",
    },
    {
      check: "Protect credentials",
      action:
        "Redact remote registry tokens, Authorization headers, passwords, and secret-bearing configuration values.",
    },
    {
      check: "Plan cache changes",
      action:
        "Understand that invalidation can increase upstream requests. Review rate limits, traffic volume, and approval requirements first.",
    },
  ],

  evidenceCollection: {
    clientEvidence: [
      "Timestamp and timezone of the failing request.",
      "Sanitized HTTP status, error message, and full artifact path.",
      "Build ID, agent identity, commit SHA, and package-manager version.",
      "Repository URL configured in Maven, Gradle, npm, Docker, NuGet, pip, or another client.",
      "Whether the same dependency succeeds from another client or environment.",
      "Whether the dependency is cached in a local developer/build-agent cache.",
    ],

    nexusEvidence: [
      "Nexus version and deployment type.",
      "Proxy repository name, format, remote storage URL, and repository status.",
      "Maximum Component Age and Maximum Metadata Age.",
      "Negative-cache enabled setting and not-found cache TTL.",
      "Remote authentication configuration, with credentials redacted.",
      "Application logs for the request time.",
      "Repository or HTTP request metrics, if available.",
      "Cache invalidation history and recent configuration changes.",
      "Relevant task failures and service health.",
    ],

    upstreamEvidence: [
      "Upstream hostname and expected repository path.",
      "DNS resolution from the Nexus runtime environment.",
      "TLS certificate and trust-chain result.",
      "HTTP status returned by the upstream endpoint.",
      "Rate-limit response headers or authentication challenges, if present.",
      "Upstream outage or maintenance notices where available.",
    ],

    redactionRules: [
      "Never paste registry tokens, passwords, or full authorization headers into the incident report.",
      "Do not dump the complete process environment to debug a proxy failure.",
      "Use approved secure mechanisms for credentials and diagnostic access.",
      "Keep the original response, timestamp, and request correlation data in an access-controlled location.",
    ],
  },

  diagnosticSequence: [
    {
      step: 1,
      title: "Reproduce the exact dependency request",
      purpose:
        "Make sure the investigation targets the actual missing artifact rather than a similar package or repository path.",
      actions: [
        "Copy the sanitized failing URL from the client logs.",
        "Identify the package format and exact version.",
        "Record whether the request uses a proxy repository directly or a group repository.",
        "Capture the first failure timestamp and any retry timestamps.",
        "Check whether other versions of the same package work.",
      ],
      decisionBranches: [
        {
          condition: "Only one version fails",
          next:
            "Check exact version availability, publication timing, negative caching, metadata freshness, and upstream path.",
        },
        {
          condition: "Every new artifact fails but previously cached artifacts work",
          next:
            "Prioritize upstream reachability, proxy state, remote URL, outbound authentication, and rate limiting.",
        },
        {
          condition: "Many unrelated packages fail",
          next:
            "Investigate shared proxy configuration, DNS, TLS, outbound network, upstream availability, and service health.",
        },
        {
          condition: "Only one build agent fails",
          next:
            "Check its repository URL, package-manager configuration, local cache, DNS, TLS trust, and credentials.",
        },
      ],
    },

    {
      step: 2,
      title: "Separate client-side cache from Nexus proxy cache",
      purpose:
        "Determine which cache layer is involved before changing server configuration.",
      actions: [
        "Check whether the package manager has a local cached copy.",
        "Compare a request from a clean or disposable test environment with the affected agent.",
        "Use the same approved Nexus endpoint and exact artifact coordinates.",
        "Check whether the failure occurs before the request reaches Nexus.",
        "Avoid clearing all build-agent caches unless there is evidence that the client cache is responsible.",
      ],
      decisionBranches: [
        {
          condition: "Only one client fails and other clients succeed",
          next:
            "Investigate local package-manager state, client configuration, proxy settings, and trust store.",
        },
        {
          condition: "Multiple clients fail through the same Nexus URL",
          next:
            "Investigate the shared proxy repository and upstream request path.",
        },
        {
          condition: "A direct upstream request succeeds but Nexus fails",
          next:
            "Compare Nexus outbound DNS, TLS, authentication, remote URL, cache state, and upstream response.",
        },
      ],
      caution:
        "Direct upstream access from a developer workstation does not prove Nexus can reach the same upstream. Network egress and credentials can differ.",
    },

    {
      step: 3,
      title: "Inspect the Nexus proxy repository state",
      purpose:
        "Check whether Nexus is allowed to contact the upstream repository.",
      actions: [
        "Open the configured proxy repository in Nexus administration.",
        "Confirm the repository is online.",
        "Check the remote storage URL and repository format.",
        "Inspect whether the repository is manually blocked.",
        "Check whether auto-blocking is enabled and the repository is marked remotely unavailable.",
        "Review recent changes to repository settings and credentials.",
      ],
      decisionBranches: [
        {
          condition: "Repository is manually blocked",
          next:
            "Determine who blocked it and why. Unblock only after confirming the upstream is safe and reachable.",
        },
        {
          condition: "Repository is auto-blocked and remote unavailable",
          next:
            "Investigate the underlying upstream connectivity or response problem before attempting recovery.",
        },
        {
          condition: "Repository is ready but requests still fail",
          next:
            "Continue with DNS/TLS, authentication, exact path, cache TTL, and logs.",
        },
        {
          condition: "Repository is offline",
          next:
            "Confirm whether the offline state is intentional and restore online access only through approved change control.",
        },
      ],
      reference:
        "https://help.sonatype.com/en/repository-management.html",
    },

    {
      step: 4,
      title: "Validate the exact upstream artifact URL",
      purpose:
        "Distinguish an incorrect remote URL or path from a genuine cache problem.",
      actions: [
        "Compare the proxy Remote Storage URL with the upstream repository's documented base URL.",
        "Append the expected artifact path only for a read-only diagnostic request.",
        "Check case sensitivity, path segments, version, filename, and URL encoding.",
        "Check whether the upstream uses a different API path for metadata and artifact files.",
        "For Docker, inspect registry and index configuration as separate concerns.",
        "For npm, check whether the configured registry URL is the intended endpoint.",
      ],
      decisionBranches: [
        {
          condition: "The exact artifact does not exist upstream",
          next:
            "Confirm the package coordinates with its publisher; do not try to force the proxy to cache a nonexistent artifact.",
        },
        {
          condition: "The artifact exists upstream at a different path",
          next:
            "Correct the remote URL or client coordinates through change control, then test one request.",
        },
        {
          condition: "The artifact exists and direct access works",
          next:
            "Test upstream access from Nexus's network path and inspect authentication, TLS, and cache behavior.",
        },
      ],
    },

    {
      step: 5,
      title: "Test DNS, TCP, and TLS from the Nexus environment",
      purpose:
        "Prove whether Nexus can reach the remote registry, rather than relying only on client-side connectivity.",
      commands: [
        {
          name: "Resolve upstream hostname",
          command: "getent hosts repo.maven.apache.org",
          notes:
            "Illustrative Maven Central hostname. Replace it with the hostname in the configured remote storage URL.",
        },
        {
          name: "Test upstream HTTPS response",
          command:
            'curl --silent --show-error --output /dev/null --write-out "HTTP %{http_code} connect=%{time_connect}s tls=%{time_appconnect}s total=%{time_total}s\\n" "https://repo.maven.apache.org/maven2/"',
          notes:
            "Run from an approved environment that shares the Nexus outbound network path. A base URL response may differ from a specific artifact path.",
        },
        {
          name: "Inspect TLS certificate chain",
          command:
            "openssl s_client -connect repo.maven.apache.org:443 -servername repo.maven.apache.org </dev/null",
          notes:
            "Replace the hostname and port with the actual upstream values.",
        },
      ],
      decisionBranches: [
        {
          condition: "DNS resolution fails from Nexus",
          next:
            "Check resolver configuration, outbound network, DNS policy, and upstream hostname.",
        },
        {
          condition: "TCP connection times out or is refused",
          next:
            "Check firewall rules, egress policy, outbound proxy, routing, and upstream availability.",
        },
        {
          condition: "TLS certificate validation fails",
          next:
            "Check certificate expiry, hostname, certificate chain, TLS inspection, and Nexus trust configuration.",
        },
        {
          condition: "Connectivity works but Nexus still fails",
          next:
            "Investigate remote authentication, exact request path, negative cache, metadata freshness, and application logs.",
        },
      ],
      safety:
        "Do not disable TLS verification as a workaround. Correct the trust configuration or certificate chain.",
    },

    {
      step: 6,
      title: "Interpret upstream and client HTTP statuses",
      purpose:
        "Determine whether the problem is a missing artifact, authorization, throttling, or upstream availability.",
      statusGuide: [
        {
          status: "404 Not Found",
          interpretation:
            "The exact path may not exist, or Nexus may be returning a previously cached not-found result.",
          checks:
            "Verify upstream existence, exact URL, negative-cache settings, and request logs.",
        },
        {
          status: "401 Unauthorized",
          interpretation:
            "The upstream may require valid credentials or the configured credentials may have expired.",
          checks:
            "Remote repository authentication, token rotation, and upstream authentication logs.",
        },
        {
          status: "403 Forbidden",
          interpretation:
            "The upstream may deny access because of permissions, policy, or access restrictions.",
          checks:
            "Account permissions, upstream policy, IP allowlist, and sanitized response details.",
        },
        {
          status: "429 Too Many Requests",
          interpretation:
            "The upstream may be rate limiting requests.",
          checks:
            "Request concurrency, retry storms, shared egress IP, and upstream rate-limit headers.",
        },
        {
          status: "5xx",
          interpretation:
            "The upstream or an intermediary may be experiencing a service problem.",
          checks:
            "Upstream health, outbound proxy logs, Nexus logs, and retry behavior.",
        },
        {
          status: "000 from curl",
          interpretation:
            "No usable HTTP response was obtained by curl.",
          checks:
            "DNS, TCP, TLS, timeout, proxy configuration, and curl error output.",
        },
      ],
      caution:
        "The HTTP response visible to a client may be generated by Nexus or another intermediary. Correlate the response with Nexus and upstream evidence.",
    },

    {
      step: 7,
      title: "Investigate negative caching",
      purpose:
        "Determine whether Nexus is temporarily remembering that the requested artifact was not found.",
      explanation:
        "When Not Found Cache is enabled, Nexus can cache negative lookup results for the configured TTL. If an artifact is published shortly after a failed lookup, the earlier not-found result may continue to affect requests until the cache expires or is invalidated.",

      checks: [
        "Confirm the artifact now exists at the exact upstream path.",
        "Inspect whether Not Found Cache is enabled.",
        "Record the configured Not Found Cache TTL.",
        "Check when the failing lookup first occurred.",
        "Verify that the failing client is using the intended proxy repository.",
        "Check whether the request is being routed through a group or another proxy node.",
      ],

      decisionBranches: [
        {
          condition: "The artifact does not exist upstream",
          next:
            "Resolve the publication or coordinates issue; cache invalidation will not create the missing artifact.",
        },
        {
          condition: "The artifact now exists and negative caching is enabled",
          next:
            "Consider a narrowly scoped cache invalidation after assessing outbound request volume and approval requirements.",
        },
        {
          condition: "Negative caching is disabled but the miss persists",
          next:
            "Investigate upstream reachability, metadata, repository path, authentication, and logs.",
        },
        {
          condition: "Only some nodes continue returning a miss",
          next:
            "Inspect node-specific routing and cache behavior. Do not assume all nodes share identical cache state.",
        },
      ],

      fix:
        "Invalidate the affected proxy cache through the supported mechanism if the evidence shows a stale not-found result. Adjust TTL only when the publication frequency and upstream traffic justify it.",

      caution:
        "Disabling negative cache can increase outbound requests substantially. Avoid making that a blanket production change.",
    },

    {
      step: 8,
      title: "Check metadata age and component age",
      purpose:
        "Diagnose stale version lists and components that are not being revalidated when expected.",
      checks: [
        "Inspect Maximum Component Age.",
        "Inspect Maximum Metadata Age.",
        "Confirm whether the missing artifact is a newly published version or a previously cached file.",
        "Review the package format's metadata/index behavior.",
        "Check the timing of the last successful metadata refresh.",
        "Confirm whether a group repository or client-side metadata cache is also involved.",
      ],

      decisionBranches: [
        {
          condition: "A newly published version is missing from the version list",
          next:
            "Investigate metadata age, format-specific index caching, and negative caching.",
        },
        {
          condition: "An existing artifact file can be requested directly but is absent from metadata",
          next:
            "Investigate metadata refresh and package-manager index behavior.",
        },
        {
          condition: "The component age is configured to avoid remote checks",
          next:
            "Verify whether the setting is intentional and whether upstream artifacts are expected to be immutable.",
        },
      ],

      remediation:
        "Choose cache ages according to artifact publication patterns and acceptable outbound traffic. Lowering the age increases upstream checks; do not set all cache ages to zero by default.",

      reference:
        "https://help.sonatype.com/en/configurable-repository-fields.html",
    },

    {
      step: 9,
      title: "Validate authentication and rate limits",
      purpose:
        "Find upstream access failures that can masquerade as a cache miss.",
      checks: [
        "Verify whether the upstream requires authentication.",
        "Check the proxy repository's configured remote credentials.",
        "Review credential rotation and expiration history.",
        "Inspect upstream 401/403/429 responses where available.",
        "Check whether the remote repository allows the Nexus egress IP.",
        "Review client retry volume and parallel build activity.",
      ],

      decisionBranches: [
        {
          condition: "Upstream returns 401",
          next:
            "Correct the remote credential configuration using the approved secret-management process.",
        },
        {
          condition: "Upstream returns 403",
          next:
            "Verify permissions, policy, and network/IP restrictions with the upstream owner.",
        },
        {
          condition: "Upstream returns 429",
          next:
            "Reduce concurrency and retry pressure, then coordinate with the upstream owner if required.",
        },
      ],

      safety:
        "Do not place tokens in remote URLs, source code, shell history, or diagnostic logs.",
    },

    {
      step: 10,
      title: "Check outbound HTTP proxy and timeout configuration",
      purpose:
        "Investigate whether Nexus's egress path or HTTP request configuration is causing failed fetches.",
      checks: [
        "Review whether Nexus must use an outbound HTTP/HTTPS proxy.",
        "Check proxy host, port, authentication, and bypass rules.",
        "Review configured connection/socket timeout and request timeout values.",
        "Check retry attempts and their effect on total request duration.",
        "Inspect proxy logs for rejected requests, DNS errors, or upstream timeouts.",
        "Verify whether a firewall or TLS inspection change coincides with the incident.",
      ],

      decisionBranches: [
        {
          condition: "Nexus cannot reach the upstream through the configured egress proxy",
          next:
            "Correct the approved proxy route or credentials and verify connectivity from the Nexus runtime.",
        },
        {
          condition: "Requests consistently time out",
          next:
            "Measure actual upstream latency and investigate the slow dependency before tuning timeouts.",
        },
        {
          condition: "Retries amplify traffic during an outage",
          next:
            "Use a controlled retry strategy and reduce concurrency while the upstream recovers.",
        },
      ],

      reference:
        "https://help.sonatype.com/en/http-request-and-proxy-settings.html",
    },

    {
      step: 11,
      title: "Check repository groups and format-specific behavior",
      purpose:
        "Verify that the request is reaching the correct member repository and path.",
      checks: [
        "Identify the exact repository URL used by the client.",
        "Inspect the group member list and order where applicable.",
        "Check whether the expected proxy is included in the group.",
        "Confirm that the remote URL matches the expected format-specific upstream path.",
        "Inspect format-specific metadata/index behavior.",
        "Compare direct proxy access with the normal group endpoint where authorized.",
      ],

      formatSpecificChecks: [
        {
          format: "Maven",
          checks: [
            "Verify groupId path segments, artifactId, version, classifier, and extension.",
            "Check maven-metadata.xml freshness when resolving dynamic versions or version lists.",
            "Inspect whether the client requests a snapshot, release, or metadata file.",
            "Confirm that the Maven settings.xml mirror points to the intended Nexus endpoint.",
          ],
        },
        {
          format: "npm",
          checks: [
            "Verify the configured registry and package scope.",
            "Check the package metadata/packument and exact tarball URL.",
            "Inspect whether the npm client uses the intended group or proxy endpoint.",
            "Review remote URL changes carefully; use the documented repository migration procedure rather than casually changing a proxy's remote URL.",
          ],
        },
        {
          format: "Docker / OCI",
          checks: [
            "Verify registry hostname, repository path, image name, and tag or digest.",
            "Check registry and index configuration.",
            "Distinguish manifest lookup from layer download failures.",
            "Inspect upstream authentication, rate limits, and multi-platform manifest behavior.",
          ],
        },
        {
          format: "NuGet",
          checks: [
            "Verify package ID, version, protocol version, and configured source.",
            "Check metadata query caching and package content URL behavior.",
            "Compare the client source URL with the intended Nexus endpoint.",
          ],
        },
        {
          format: "PyPI",
          checks: [
            "Verify the simple-index URL and exact package/version file.",
            "Check metadata freshness and package filename/platform compatibility.",
            "Inspect upstream index access and artifact download responses separately.",
          ],
        },
      ],

      caution:
        "Format-specific URL structures and API behavior differ. Use the documentation for the installed Nexus version and repository format.",
    },

    {
      step: 12,
      title: "Inspect Nexus logs and service health",
      purpose:
        "Correlate the client-visible cache miss with the server-side upstream request.",
      actions: [
        "Find the request timestamp and sanitized artifact path.",
        "Inspect relevant application/request logs.",
        "Look for upstream status codes, DNS failures, TLS exceptions, timeouts, and authentication errors.",
        "Check whether Nexus attempted to contact the upstream.",
        "Check whether a negative-cache result was served without a fresh upstream request.",
        "Review CPU, memory, disk, database, and blob-store health if the problem affects many requests.",
      ],

      exampleCommands: [
        {
          name: "Search a known Nexus log",
          command:
            'grep -Ei "ERROR|WARN|timeout|SSL|certificate|proxy|repository|404|429" /path/to/nexus.log | tail -n 200',
          notes:
            "Replace the path with the actual log location. This is a starting filter, not proof that every relevant event uses those terms.",
        },
        {
          name: "Inspect systemd service logs",
          command:
            "journalctl -u nexus --since '30 minutes ago' --no-pager",
          notes:
            "Applicable only when systemd manages a service with that unit name.",
        },
      ],

      decisionBranches: [
        {
          condition: "Logs show an upstream 404",
          next:
            "Verify the exact remote artifact path and whether the miss is being negatively cached.",
        },
        {
          condition: "Logs show TLS or DNS errors",
          next:
            "Investigate the Nexus outbound network and trust configuration.",
        },
        {
          condition: "Logs show 401/403/429",
          next:
            "Investigate remote credentials, authorization, egress restrictions, and rate limits.",
        },
        {
          condition: "No new upstream request appears",
          next:
            "Check negative cache, component/metadata age, request routing, and whether the request reached the expected proxy.",
        },
      ],
    },

    {
      step: 13,
      title: "Check rate limiting and dependency retry storms",
      purpose:
        "Prevent a temporary upstream problem from turning into a larger production incident.",
      checks: [
        "Check the number of concurrent builds requesting the same dependencies.",
        "Inspect package-manager retry behavior.",
        "Look for repeated metadata requests across many agents.",
        "Check upstream rate-limit headers and shared egress IP behavior.",
        "Identify whether a cache invalidation caused a burst of upstream fetches.",
      ],

      decisionBranches: [
        {
          condition: "429 increases with build concurrency",
          next:
            "Reduce concurrency, use bounded backoff, and coordinate with the upstream service owner.",
        },
        {
          condition: "Repeated misses target the same nonexistent artifact",
          next:
            "Correct dependency coordinates or publication ordering and review negative-cache behavior.",
        },
        {
          condition: "An upstream outage causes retries across many pipelines",
          next:
            "Pause or queue noncritical builds safely and avoid unbounded retry loops.",
        },
      ],
    },

    {
      step: 14,
      title: "Perform a controlled cache invalidation",
      purpose:
        "Refresh cache state only after evidence points to stale metadata or a stale not-found result.",
      preconditions: [
        "The exact proxy repository and artifact are confirmed.",
        "The artifact is verified to exist upstream, or there is another documented reason to refresh cache state.",
        "The upstream is reachable and expected to serve the artifact.",
        "The team has considered rate limits and the additional outbound traffic.",
        "Production change approval is obtained where required.",
      ],

      supportedOptions: [
        {
          option: "Nexus UI",
          action:
            "Open Settings → Repository → Repositories, select the intended proxy repository, and use Invalidate Cache if available for that repository.",
          effect:
            "Expires cached component/metadata age and clears not-found cache entries. It does not delete cached component files.",
        },
        {
          option: "Repository REST API",
          action:
            "Use the documented POST cache-invalidation endpoint for the installed Nexus version and the exact repository name.",
          endpoint:
            "POST /service/rest/v1/repositories/{repositoryName}/invalidate-cache",
          effect:
            "Schedules or performs the supported cache invalidation behavior for the selected proxy or group repository, according to the installed version.",
        },
      ],

      exampleCommand:
        'curl --silent --show-error --user "$NEXUS_USER" --request POST "https://nexus.example.com/service/rest/v1/repositories/REPLACE_WITH_EXACT_REPOSITORY_NAME/invalidate-cache"',

      commandSafety: [
        "This changes repository cache state; it is not a read-only request.",
        "Confirm the endpoint and required privileges in the API documentation for the installed version.",
        "Replace the host and repository name with verified values.",
        "Use a secure credential mechanism; do not place passwords or tokens directly in the command.",
        "Review the effect on group members before invalidating a group repository.",
        "Do not invalidate every proxy repository as a blanket troubleshooting step.",
      ],

      decisionBranches: [
        {
          condition: "The exact artifact is now available after invalidation",
          next:
            "Record the stale cache state as a likely cause, then review why the TTL or publication workflow produced the incident.",
        },
        {
          condition: "The miss persists after invalidation",
          next:
            "Stop repeating invalidation and investigate upstream path, network, authentication, format-specific behavior, and logs.",
        },
      ],

      reference:
        "https://help.sonatype.com/en/repository-actions.html",
    },

    {
      step: 15,
      title: "Correct the verified root cause",
      purpose:
        "Apply the smallest change that addresses the actual failure.",
      remediationOptions: [
        {
          cause: "Incorrect remote storage URL",
          action:
            "Correct the remote URL through change control and validate a single artifact request. For npm proxy repositories, consult the format-specific guidance before changing the remote URL; creating a replacement proxy may be safer.",
        },
        {
          cause: "Artifact not published upstream",
          action:
            "Correct the publishing workflow or dependency coordinates; do not repeatedly invalidate cache.",
        },
        {
          cause: "Stale negative cache",
          action:
            "Invalidate the narrowly scoped repository cache and verify the artifact request.",
        },
        {
          cause: "Metadata is stale",
          action:
            "Refresh the appropriate cache and review metadata age settings based on release frequency and upstream traffic.",
        },
        {
          cause: "Expired upstream credentials",
          action:
            "Rotate/update the remote credential using the approved secret-management process.",
        },
        {
          cause: "TLS trust failure",
          action:
            "Correct the certificate chain or trusted certificate configuration.",
        },
        {
          cause: "DNS or egress failure",
          action:
            "Restore the intended outbound network route and verify resolution from the Nexus runtime.",
        },
        {
          cause: "Upstream rate limit",
          action:
            "Reduce request concurrency, use bounded backoff, and coordinate with the upstream provider.",
        },
        {
          cause: "Proxy repository manually or automatically blocked",
          action:
            "Resolve the underlying reason for the blocked state before unblocking.",
        },
        {
          cause: "Wrong group membership",
          action:
            "Correct the group configuration through review and validate the client-facing endpoint.",
        },
      ],

      decisionRules: [
        "Change one causal factor at a time when practical.",
        "Preserve the previous configuration for rollback.",
        "Do not disable TLS validation or remote authentication to make a request succeed.",
        "Avoid setting all metadata ages to zero.",
        "Avoid disabling negative caching globally.",
        "Do not delete the proxy repository or blob-store files as a cache repair technique.",
      ],
    },

    {
      step: 16,
      title: "Validate recovery end to end",
      purpose:
        "Verify that the exact missing artifact is retrievable through the same path used by production consumers.",
      validationSteps: [
        "Request the exact artifact through the intended Nexus endpoint.",
        "Confirm the returned status and content are expected.",
        "Check Nexus logs to confirm the request followed the expected path.",
        "Verify that the request no longer fails because of a stale not-found result.",
        "Run a representative Maven/npm/Docker/NuGet/pip dependency operation as applicable.",
        "Run one controlled CI/CD pipeline using the normal repository configuration.",
        "Check for new upstream 429/5xx responses and proxy auto-blocking.",
        "Monitor request volume, latency, and error rate after the change.",
        "Confirm unrelated artifacts and repositories remain healthy.",
      ],

      exitCriteria: [
        "The exact artifact can be retrieved through Nexus.",
        "The upstream path and authentication behavior are understood.",
        "Representative builds can resolve the dependency.",
        "No unintended increase in upstream traffic or rate limiting is observed.",
        "Root cause and prevention actions are documented.",
      ],
    },
  ],

  rootCauseMatrix: [
    {
      symptom: "404 after a package was just published",
      likelyCauses:
        "Negative cache, stale metadata, publication delay, or wrong coordinates.",
      evidence:
        "Upstream exact-path request, cache TTL, metadata age, first failure timestamp.",
      remediation:
        "Verify publication, then refresh the appropriate cache only if evidence supports it.",
    },
    {
      symptom: "All uncached artifacts fail",
      likelyCauses:
        "Upstream unavailable, outbound proxy failure, DNS/TLS error, or proxy blocked.",
      evidence:
        "Proxy status, Nexus outbound connectivity, application logs, upstream response.",
      remediation:
        "Restore the verified upstream access path.",
    },
    {
      symptom: "Cached artifacts work but new versions fail",
      likelyCauses:
        "Upstream connectivity, stale metadata, negative cache, or upstream authentication.",
      evidence:
        "Direct artifact URL, metadata response, cache settings, outbound logs.",
      remediation:
        "Correct the upstream/cache issue without clearing all cached content.",
    },
    {
      symptom: "401 from upstream",
      likelyCauses:
        "Expired or incorrect remote credentials.",
      evidence:
        "Sanitized upstream response, credential rotation history, upstream auth logs.",
      remediation:
        "Update credentials securely and validate a single request.",
    },
    {
      symptom: "403 from upstream",
      likelyCauses:
        "Access restrictions, permissions, IP allowlist, or policy enforcement.",
      evidence:
        "Upstream authorization response, egress IP, account permissions.",
      remediation:
        "Correct approved access or network policy.",
    },
    {
      symptom: "429 from upstream",
      likelyCauses:
        "Rate limit, excessive build concurrency, repeated metadata requests.",
      evidence:
        "Rate-limit headers, request volume, retry patterns.",
      remediation:
        "Reduce concurrency and use bounded backoff.",
    },
    {
      symptom: "TLS or connection error",
      likelyCauses:
        "Certificate trust, DNS, firewall, proxy, or outbound network failure.",
      evidence:
        "TLS diagnostics, DNS results, network/proxy logs.",
      remediation:
        "Restore the verified connection path and trust configuration.",
    },
    {
      symptom: "Proxy repository shows auto-blocked",
      likelyCauses:
        "Remote repository was unavailable or repeated outbound requests failed.",
      evidence:
        "Repository status, upstream availability, Nexus logs.",
      remediation:
        "Resolve the upstream failure and then follow the supported unblock/retest procedure.",
    },
    {
      symptom: "Direct proxy works but group endpoint fails",
      likelyCauses:
        "Incorrect group membership, routing, client URL, or group-specific metadata behavior.",
      evidence:
        "Group members, direct proxy request, client endpoint, format-specific logs.",
      remediation:
        "Correct the group/client configuration and retest the standard endpoint.",
    },
    {
      symptom: "Cache invalidation causes more failures",
      likelyCauses:
        "Upstream outage, rate limiting, or a burst of new remote requests.",
      evidence:
        "Request-rate increase, upstream 429/5xx, cache invalidation time.",
      remediation:
        "Stop repeated invalidation, stabilize upstream access, and manage traffic safely.",
    },
  ],

  prevention: {
    repositoryConfiguration: [
      "Use the correct official remote URL for each proxy repository.",
      "Document the intended repository and group routing.",
      "Set component age, metadata age, and negative-cache TTL based on publication patterns.",
      "Avoid unnecessarily short TTLs that create excessive outbound traffic.",
      "Monitor repository online/blocked state and upstream availability.",
      "Manage remote credentials through approved secret management.",
      "Document format-specific proxy requirements and migration procedures.",
    ],

    pipelineControls: [
      "Use consistent Nexus endpoints across build agents.",
      "Validate dependency coordinates and repository configuration before releases.",
      "Avoid unbounded retries and excessive concurrent metadata requests.",
      "Use controlled retries with backoff when appropriate.",
      "Log the package identity, repository URL, timestamp, and status without exposing secrets.",
      "Test newly published packages through the intended proxy before relying on them in a release.",
    ],

    monitoring: [
      "Monitor cache hit/miss rates where metrics are available.",
      "Track upstream request failures and latency.",
      "Alert on sustained 404, 401, 403, 429, and 5xx patterns by repository.",
      "Monitor auto-blocked and manually blocked proxy states.",
      "Track outbound network, DNS, and TLS errors.",
      "Monitor CI/CD dependency resolution failure rates.",
      "Correlate cache invalidation events with upstream request spikes.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    startTime: "",
    affectedEnvironment: "",
    nexusVersion: "",
    proxyRepository: "",
    groupRepository: "",
    repositoryFormat: "",
    remoteStorageUrl: "",
    artifactCoordinates: "",
    exactRequestPath: "",
    clientHttpStatus: "",
    upstreamHttpStatus: "",
    negativeCacheEnabled: "",
    negativeCacheTtl: "",
    maximumComponentAge: "",
    maximumMetadataAge: "",
    proxyRepositoryState: "",
    evidence: [],
    rootCause: "",
    correctiveAction: "",
    cacheInvalidationPerformed: "",
    recoveryValidation: [],
    preventionActions: [],
    actionOwners: [],
  },

  handsOnLabs: [
    {
      name: "Lab 1 - Simulate a missing component",
      objective:
        "Understand the difference between a genuinely missing upstream artifact and a stale negative cache.",
      tasks: [
        "Use a disposable non-production proxy repository.",
        "Request a test artifact path that does not exist.",
        "Publish or identify an approved test artifact at the upstream location.",
        "Observe negative-cache behavior and configured TTL.",
        "Use a supported cache invalidation action and verify the result.",
      ],
    },
    {
      name: "Lab 2 - Diagnose upstream connectivity",
      objective:
        "Separate DNS, TLS, authentication, and upstream availability failures.",
      tasks: [
        "Use a non-production proxy and approved upstream endpoint.",
        "Capture DNS, TLS, and HTTP diagnostic results.",
        "Compare client-side connectivity with Nexus-runtime connectivity.",
        "Review server logs and identify the failing layer.",
        "Document the evidence supporting the root cause.",
      ],
    },
    {
      name: "Lab 3 - Test metadata freshness",
      objective:
        "Understand how cache age affects newly published versions.",
      tasks: [
        "Publish a disposable test version in a controlled upstream.",
        "Observe metadata through the proxy.",
        "Record configured metadata and component age settings.",
        "Test a narrowly scoped cache refresh.",
        "Measure the effect on upstream requests and build behavior.",
      ],
    },
    {
      name: "Lab 4 - Investigate upstream throttling",
      objective:
        "Learn how parallel builds and retries can amplify a cache-miss incident.",
      tasks: [
        "Use a controlled test registry or simulated rate limit.",
        "Measure request volume and retry behavior.",
        "Reduce concurrency and introduce bounded backoff.",
        "Observe whether the error rate improves.",
        "Document safe retry limits and escalation steps.",
      ],
    },
    {
      name: "Lab 5 - Validate the full CI/CD path",
      objective:
        "Prove that a repaired proxy works for the actual consumer.",
      tasks: [
        "Choose a disposable package in a non-production repository.",
        "Request it through the normal Nexus group URL.",
        "Run the relevant package-manager operation.",
        "Run a representative test pipeline.",
        "Record status, latency, cache behavior, and final validation evidence.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "What is a Nexus proxy cache miss?",
      expectedAnswer:
        "It occurs when the requested content is not available as a usable cached result, so Nexus may need to retrieve it from the configured upstream repository.",
    },
    {
      question: "What is negative caching?",
      expectedAnswer:
        "Nexus temporarily caches a not-found result to avoid repeatedly querying an upstream for a component that is absent.",
    },
    {
      question:
        "Why might a newly published package still return 404?",
      expectedAnswer:
        "The artifact may not be available at the requested upstream path, or Nexus may have cached an earlier not-found result or stale metadata.",
    },
    {
      question:
        "What is the difference between cache invalidation and deleting cached content?",
      expectedAnswer:
        "Cache invalidation resets relevant cache freshness and negative-cache state. It does not itself delete the cached component files.",
    },
    {
      question:
        "Why can direct upstream access work while Nexus fails?",
      expectedAnswer:
        "Nexus may use a different DNS/network path, outbound proxy, trust store, credentials, egress IP, or repository URL.",
    },
    {
      question:
        "Why should negative caching not be disabled globally?",
      expectedAnswer:
        "It can increase repeated upstream requests, create traffic spikes, and contribute to rate limiting during missing-artifact or upstream incidents.",
    },
    {
      question:
        "How do you troubleshoot an auto-blocked proxy?",
      expectedAnswer:
        "Check the remote availability, outbound connection errors, TLS, credentials, and repository status; resolve the underlying cause before unblocking.",
    },
    {
      question:
        "How do you prove that a cache-miss incident is resolved?",
      expectedAnswer:
        "Verify the exact artifact through the intended Nexus endpoint, run a representative package-manager/CI operation, and monitor upstream errors and request volume.",
    },
  ],

  completionChecklist: [
    "Incident scope and affected artifact are documented.",
    "Client-side cache and Nexus proxy cache are distinguished.",
    "Proxy repository and group routing are verified.",
    "The exact upstream artifact path is checked.",
    "DNS, TLS, egress, authentication, and rate limits are investigated.",
    "Negative cache and metadata-age settings are reviewed.",
    "Repository status and Nexus logs are correlated.",
    "Cache invalidation is performed only when justified.",
    "The exact artifact and representative pipeline are validated.",
    "Prevention actions, owners, and follow-up dates are recorded.",
  ],

  officialReferences: [
    {
      title: "Repository Types",
      url: "https://help.sonatype.com/en/repository-types.html",
    },
    {
      title: "Configurable Repository Fields",
      url: "https://help.sonatype.com/en/configurable-repository-fields.html",
    },
    {
      title: "Repository Actions - Invalidate Cache",
      url: "https://help.sonatype.com/en/repository-actions.html",
    },
    {
      title: "HTTP Request and Proxy Settings",
      url: "https://help.sonatype.com/en/http-request-and-proxy-settings.html",
    },
    {
      title: "Repository Management",
      url: "https://help.sonatype.com/en/repository-management.html",
    },
    {
      title: "Docker Proxy Repository",
      url: "https://help.sonatype.com/en/proxy-repository-for-docker.html",
    },
    {
      title: "Nexus Repository API Reference",
      url: "https://help.sonatype.com/en/api-reference.html",
    },
  ],
} as const;

export default proxyCacheMissGuide;
