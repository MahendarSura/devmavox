export interface ArtifactDownloadFailureGuide {
  title: string;
  category: string;
  severity: string[];
  overview: string;
  incidentScenario: {
    title: string;
    symptoms: string[];
    businessImpact: string[];
  };
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    interpretation: string[];
    nextAction: string[];
  }[];
  rootCauseMatrix: {
    symptom: string;
    likelyCauses: string[];
    verification: string[];
    resolution: string[];
  }[];
  recoveryProcedures: {
    scenario: string;
    steps: string[];
    validation: string[];
    rollback: string[];
  }[];
  advancedScenarios: {
    scenario: string;
    diagnosis: string[];
    remediation: string[];
  }[];
  monitoringAndPrevention: string[];
  incidentRunbook: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    expectedOutcome: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  officialReferences: {
    title: string;
    url: string;
  }[];
}

export const artifactDownloadFailureGuide: ArtifactDownloadFailureGuide = {
  title: "Maven Artifact Download Failure — Production Troubleshooting",
  category: "Maven, Java Build Engineering, Nexus, Artifactory and CI/CD",

  severity: [
    "SEV-1: A critical release or production hotfix is blocked across multiple teams, with no approved workaround.",
    "SEV-2: A production deployment is blocked because required build artifacts cannot be downloaded.",
    "SEV-3: A single pipeline, repository, dependency, or development environment is affected.",
    "SEV-4: Intermittent downloads, slow dependency resolution, cache inefficiency, or a non-blocking warning."
  ],

  overview: `
Maven artifact download failures happen when Maven cannot resolve, authenticate to,
download, validate, or use a required dependency or plugin from a configured repository.

A typical dependency resolution path is:

Developer or CI agent
  -> Maven Wrapper or installed Maven
  -> effective POM and dependency graph
  -> settings.xml profiles and mirrors
  -> DNS and proxy
  -> HTTPS/TLS connection
  -> Nexus / Artifactory / Maven Central
  -> artifact metadata and repository path
  -> downloaded JAR/POM/checksum
  -> local Maven repository
  -> compilation, tests and packaging

A failure at any layer can produce a build error. The message "Could not transfer artifact"
does not automatically mean Maven Central is down.

Production engineers distinguish:
- DNS or TCP connectivity failures.
- HTTP 401/403 authentication or authorization failures.
- HTTP 404 missing artifacts or incorrect repository paths.
- HTTP 429 rate limits.
- HTTP 5xx repository or upstream failures.
- TLS certificate and proxy problems.
- Incorrect dependency coordinates or repository configuration.
- Corrupted local cache or incomplete downloads.
- SNAPSHOT metadata and version-resolution problems.
- Dependency convergence, checksum and supply-chain issues.

The correct fix depends on the actual error, repository URL, artifact coordinates,
HTTP response, effective Maven configuration, and whether the failure is local or shared.
`,

  incidentScenario: {
    title: "CI pipeline suddenly fails while downloading a Maven dependency",
    symptoms: [
      "A previously successful Maven build fails during dependency resolution.",
      "The build reports Could not resolve dependencies or Could not transfer artifact.",
      "Maven returns HTTP 401, 403, 404, 429, 500, 502, or 503.",
      "A build works on a developer laptop but fails on Jenkins, GitHub Actions, or another CI agent.",
      "The same dependency downloads from one repository but fails through Nexus or Artifactory.",
      "A clean Docker build fails even though an existing developer build succeeds.",
      "Maven reports PKIX path building failed or a TLS handshake error.",
      "A release is blocked after repository credentials, proxy settings, or repository configuration changed."
    ],
    businessImpact: [
      "Identify the affected application, branch, commit, build number, dependency, and environment.",
      "Determine whether only one artifact fails or all artifact downloads are affected.",
      "Check whether the issue blocks compilation, unit tests, packaging, container creation, or deployment.",
      "Identify whether the dependency is required for a production hotfix or scheduled release.",
      "Determine whether all agents fail or only one agent, network, region, or build container.",
      "Check whether the repository is shared by other teams and whether a wider outage exists.",
      "Record the last successful build and the first failed build to establish the incident timeline."
    ]
  },

  safetyChecks: [
    "Confirm the correct repository, branch, commit, Maven module, CI job, build number, and target environment.",
    "Record the complete error and failed artifact coordinates before changing configuration.",
    "Do not paste passwords, access tokens, private keys, or credential-bearing repository URLs into incident tickets.",
    "Never disable TLS certificate validation or use insecure transport as a permanent fix.",
    "Do not delete the entire ~/.m2/repository directory as the first troubleshooting step.",
    "Avoid changing shared Maven settings.xml or repository-manager configuration without checking other teams' dependencies.",
    "Do not replace a failed dependency version with an arbitrary version in production without compatibility and security review.",
    "Do not publish guessed or fabricated artifacts to Maven Central, Nexus, or Artifactory.",
    "Check whether a dependency is internal, third-party, licensed, restricted, or approved for use.",
    "Use the approved secret manager or CI credential store; do not hardcode credentials in pom.xml or source code.",
    "Before retrying a release deployment, determine whether any downstream deployment or publication step already completed.",
    "Use approved repository mirrors and dependency sources; do not bypass organizational supply-chain controls merely to make a build pass.",
    "Prefer read-only diagnostics before repository deletion, cache invalidation, credential rotation, or shared-server changes."
  ],

  evidenceCollection: [
    "Exact Maven command, working directory, Maven version, Java version, operating system, and build timestamp.",
    "Complete error message including groupId, artifactId, version, classifier, packaging type, repository ID, and requested URL.",
    "HTTP response status and sanitized server response body, where available.",
    "CI job URL, build number, agent name, workspace path, container image, and commit SHA.",
    "Relevant pom.xml files, parent POM, dependencyManagement, active profiles, and repository definitions.",
    "Effective POM and effective settings output, with credentials and sensitive values removed before sharing.",
    "User or CI identity, credential source, repository permissions, token expiration, and secret-rotation timeline.",
    "Maven mirror configuration, repository IDs, proxy settings, DNS resolution, and TLS certificate chain.",
    "Local Maven repository path, lastUpdated marker files, cached POM/JAR files, and disk-space availability.",
    "Nexus or Artifactory request logs, repository health, upstream proxy status, storage capacity, and audit logs.",
    "Maven Central or upstream status evidence when a public repository is involved.",
    "Recent changes to dependency versions, parent POMs, plugins, mirrorOf rules, Java runtime, Maven version, and CI container images.",
    "Checksums or signatures for artifacts when supported by the repository and release process.",
    "Whether the failure reproduces on a second approved agent and whether a previously successful build still works."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Capture the exact failure",
      objective: "Identify the failing artifact and avoid guessing at the root cause.",
      commands: [
        "mvn -version",
        "java -version",
        "mvn -B -ntp -e clean verify",
        "mvn -B -ntp -X dependency:tree"
      ],
      interpretation: [
        "mvn -version reports the Maven installation and the Java runtime used by Maven.",
        "java -version shows the Java available on PATH, but Maven's own output is the stronger evidence for the JVM running Maven.",
        "-e prints exception details. -X enables extensive debug output and may reveal sensitive environment or configuration details; keep raw logs restricted.",
        "-B runs Maven in batch mode and -ntp disables transfer-progress output, which makes CI logs easier to read.",
        "dependency:tree helps inspect dependency resolution but can itself fail if required plugins or dependencies cannot be downloaded.",
        "clean verify executes lifecycle phases and may run tests; confirm that the selected project and command are appropriate before using it in a sensitive pipeline."
      ],
      nextAction: [
        "Capture the first meaningful transfer or resolution error, not just the final BUILD FAILURE line.",
        "Record the exact groupId, artifactId, version, repository ID, URL, and HTTP status.",
        "Determine whether the failing item is a dependency, parent POM, Maven plugin, plugin dependency, or metadata file."
      ]
    },
    {
      step: 2,
      title: "Confirm project and Maven configuration",
      objective: "Verify that Maven is using the expected project, POM, and settings.",
      commands: [
        "pwd",
        "git status --short",
        "git rev-parse --show-toplevel",
        "mvn help:effective-pom -Doutput=effective-pom.xml",
        "mvn help:effective-settings -Doutput=effective-settings.xml"
      ],
      interpretation: [
        "On Windows PowerShell, use Get-Location instead of pwd if you prefer the native command.",
        "Confirm the working directory contains the intended pom.xml and that the CI job checks out the expected commit.",
        "The effective POM includes inherited and profile-derived configuration, but generating it may require downloading Maven Help Plugin dependencies.",
        "The effective settings reveal active mirrors, proxies, profiles, and repository configuration.",
        "Effective settings and debug logs may expose internal hostnames, usernames, or credential-related configuration. Do not publish them without sanitization.",
        "A mirror can redirect requests away from the repository declared in a POM, so the configured URL may not be the URL Maven actually uses."
      ],
      nextAction: [
        "Compare the failing build's POM, settings, profiles, and Maven version with a known-good build.",
        "Identify whether configuration comes from the project, user settings, global settings, a CI template, or command-line arguments.",
        "If the Help Plugin cannot download, use the existing Maven logs and inspect the source POM and settings directly."
      ]
    },
    {
      step: 3,
      title: "Identify the repository and artifact coordinates",
      objective: "Verify the exact artifact location and repository selected by Maven.",
      commands: [
        "mvn -B -ntp -U -e validate",
        "mvn -B -ntp dependency:get -Dartifact=org.slf4j:slf4j-api:2.0.16",
        "mvn -B -ntp dependency:get -Dartifact=REPLACE_GROUP_ID:REPLACE_ARTIFACT_ID:REPLACE_VERSION"
      ],
      interpretation: [
        "The first dependency:get command is an example using a public artifact coordinate; it still requires the configured repositories and plugin dependencies to be available.",
        "Replace the REPLACE_* values with the exact coordinates from the failing build.",
        "dependency:get invokes a Maven plugin, so it may fail independently if that plugin cannot be resolved.",
        "The -U option forces checks for updated snapshots and missing releases, but it is not a universal cache repair and can increase repository traffic.",
        "Check whether the artifact is expected in Maven Central, an internal release repository, a snapshot repository, or a third-party repository.",
        "A release version that was never published cannot be fixed by repeatedly retrying the download."
      ],
      nextAction: [
        "Verify the artifact and version exist in the intended repository using the approved repository UI or API.",
        "Check whether the requested repository ID matches the server credentials ID in settings.xml.",
        "If the artifact is internal, contact the owning publishing pipeline rather than substituting an unrelated public artifact."
      ]
    },
    {
      step: 4,
      title: "Test repository DNS and HTTPS connectivity",
      objective: "Separate repository network failures from Maven configuration and authorization failures.",
      commands: [
        "nslookup REPLACE_REPOSITORY_HOST",
        "curl -I --connect-timeout 5 https://REPLACE_REPOSITORY_HOST/",
        "curl -v --connect-timeout 5 https://REPLACE_REPOSITORY_HOST/REPLACE_ARTIFACT_PATH",
        "Test-NetConnection REPLACE_REPOSITORY_HOST -Port 443"
      ],
      interpretation: [
        "Replace the hostname and path with the actual repository host and artifact path.",
        "Test-NetConnection is a Windows PowerShell command. On Linux, use an approved alternative such as nc -vz HOST 443.",
        "A successful DNS lookup only proves that a name resolved; it does not prove that the repository service is healthy.",
        "A TCP timeout may indicate routing, firewall, proxy, DNS, or service availability issues.",
        "An HTTP 401 or 403 means an HTTP server or intermediary responded; investigate authentication and authorization before assuming a network outage.",
        "A 404 may indicate an incorrect path or missing artifact. Some repository systems also use authorization behavior that conceals resource existence.",
        "A HEAD request may be treated differently from GET by some servers. If HEAD fails, verify using an approved GET request without exposing sensitive data.",
        "Do not place passwords or tokens in curl command arguments, shell history, or shared logs."
      ],
      nextAction: [
        "Run the test from the actual failing CI agent or build container.",
        "Compare the same host and port from a known-good agent if permitted.",
        "If the repository is behind a proxy, verify the intended proxy path and bypass rules.",
        "If connectivity works but Maven fails, continue with Maven mirrors, credentials, metadata, and TLS checks."
      ]
    },
    {
      step: 5,
      title: "Diagnose HTTP 401 authentication errors",
      objective: "Determine whether Maven is using the correct repository credentials.",
      commands: [
        "mvn -B -ntp -e -DskipTests package",
        "mvn help:effective-settings -Doutput=effective-settings.xml",
        "git grep -n -E 'distributionManagement|repositories|pluginRepositories|mirrorOf' -- '*.xml'"
      ],
      interpretation: [
        "HTTP 401 commonly indicates missing, invalid, expired, or incorrectly selected credentials.",
        "The repository ID used for a download must align with the matching server ID in Maven settings when that repository requires credentials.",
        "For a mirror, credentials are commonly selected using the mirror's ID, not necessarily the original repository ID.",
        "A download uses repository access credentials; publishing credentials under distributionManagement are a separate concern.",
        "The effective settings command may itself require the Help Plugin to be available.",
        "Do not print the contents of server password elements or dump CI secret environment variables."
      ],
      nextAction: [
        "Identify the actual repository or mirror ID shown in Maven logs.",
        "Check the matching server entry and the CI secret binding without exposing secret values.",
        "Verify token expiration, repository-user status, and read permission.",
        "Rotate credentials only when evidence indicates compromise or expiration, and update the approved secret store."
      ]
    },
    {
      step: 6,
      title: "Diagnose HTTP 403 authorization errors",
      objective: "Distinguish valid credentials with insufficient access from other failures.",
      commands: [
        "mvn -B -ntp -e -DskipTests package",
        "git status --short",
        "git diff -- pom.xml"
      ],
      interpretation: [
        "HTTP 403 often means the identity is recognized but the requested operation is not allowed; exact semantics depend on the repository server.",
        "A repository may deny read access to a group, project, namespace, release, or snapshot repository.",
        "The artifact may be blocked by repository policy, license policy, content filtering, or a proxy rule.",
        "A mirror may direct Maven to a repository where the identity lacks access.",
        "Do not assume a 403 is solved by generating a new token; confirm the permission and repository selection."
      ],
      nextAction: [
        "Verify the identity, repository, namespace, and required read permission.",
        "Check repository-manager audit logs and policy rejection details.",
        "Request the minimum required permission from the repository administrator.",
        "Avoid granting administrator access to the CI identity."
      ]
    },
    {
      step: 7,
      title: "Investigate HTTP 404 and missing artifacts",
      objective: "Verify whether the requested artifact and version actually exist.",
      commands: [
        "mvn -B -ntp -e -DskipTests package",
        "curl -I --connect-timeout 5 https://REPLACE_REPOSITORY_HOST/REPLACE_ARTIFACT_PATH",
        "git grep -n -E '<groupId>|<artifactId>|<version>' -- 'pom.xml' '**/pom.xml'"
      ],
      interpretation: [
        "Maven repository paths are derived from groupId, artifactId, version, classifier, and extension.",
        "A groupId such as com.example.platform maps to a path like com/example/platform.",
        "A missing artifact, wrong version, classifier mismatch, incorrect repository path, or incomplete publication can cause 404.",
        "A parent POM or Maven plugin may be missing even when the main application dependency exists.",
        "Some repositories deliberately return 404 for unauthorized artifacts, so confirm the server's policy behavior.",
        "A snapshot version can require metadata resolution and timestamped artifact selection."
      ],
      nextAction: [
        "Verify the artifact coordinates against the producing project's published POM and release record.",
        "Check the repository URL and version path.",
        "If an internal artifact was never published, repair the producer pipeline and publish the approved artifact.",
        "Do not upload a fabricated JAR or silently substitute a different version."
      ]
    },
    {
      step: 8,
      title: "Investigate HTTP 429 and rate limiting",
      objective: "Find whether the repository or upstream service is throttling requests.",
      commands: [
        "mvn -B -ntp -e -DskipTests package",
        "curl -sS -D - -o /dev/null --connect-timeout 5 https://REPLACE_REPOSITORY_HOST/REPLACE_ARTIFACT_PATH"
      ],
      interpretation: [
        "HTTP 429 generally indicates rate limiting, but inspect server response headers and repository logs for the actual policy.",
        "Many parallel builds, repeated clean builds, uncached Docker builds, or aggressive retries can amplify download traffic.",
        "A repository manager may be rate-limited by an upstream service even when the internal repository is reachable.",
        "The curl example is intended for Linux-like shells and may need adjustment for Windows PowerShell.",
        "Do not implement unlimited retry loops; they can worsen throttling."
      ],
      nextAction: [
        "Inspect Retry-After or equivalent server guidance when provided.",
        "Use bounded retries with backoff and jitter where supported.",
        "Improve dependency caching and coordinate with the repository administrator.",
        "Check whether a repository-manager proxy or approved mirror can reduce duplicate upstream downloads."
      ]
    },
    {
      step: 9,
      title: "Investigate HTTP 500, 502, 503, and 504",
      objective: "Determine whether the repository manager, reverse proxy, or upstream repository is unhealthy.",
      commands: [
        "curl -sS -D - -o /dev/null --connect-timeout 5 https://REPLACE_REPOSITORY_HOST/",
        "mvn -B -ntp -e -DskipTests package"
      ],
      interpretation: [
        "500 usually indicates a server-side failure.",
        "502 and 504 often indicate a gateway or upstream communication problem.",
        "503 commonly indicates temporary unavailability or overload.",
        "The actual cause may be a repository manager, reverse proxy, storage backend, upstream repository, or network path.",
        "If multiple teams fail against the same repository at the same time, investigate shared service health before changing individual projects.",
        "A successful homepage request does not prove the exact artifact repository or storage backend is healthy."
      ],
      nextAction: [
        "Check Nexus or Artifactory health, server logs, storage capacity, upstream proxy status, and service metrics.",
        "Compare timestamps and failed paths across affected pipelines.",
        "Use bounded retries only for transient errors and follow repository service incident guidance.",
        "Escalate a shared repository outage with sanitized logs and representative artifact coordinates."
      ]
    },
    {
      step: 10,
      title: "Troubleshoot Maven mirror and repository selection",
      objective: "Determine why Maven is downloading from an unexpected repository.",
      commands: [
        "mvn help:effective-settings -Doutput=effective-settings.xml",
        "mvn help:effective-pom -Doutput=effective-pom.xml",
        "git grep -n -E 'mirrorOf|<mirrors>|<repositories>|<pluginRepositories>|distributionManagement' -- '*.xml'"
      ],
      interpretation: [
        "A mirror in settings.xml can redirect repository requests to a different host.",
        "The mirrorOf pattern controls which repository IDs are mirrored; broad patterns can redirect more repositories than intended.",
        "Dependency repositories and plugin repositories are related but distinct resolution paths.",
        "The parent POM and active profiles may introduce repositories that are not obvious from the child POM alone.",
        "An incorrect mirror can cause 401, 403, 404, or upstream resolution errors even when the original repository is healthy."
      ],
      nextAction: [
        "Identify the repository ID requested and the mirror selected by Maven.",
        "Compare the effective settings with the organization's approved repository configuration.",
        "Correct mirrorOf or repository configuration in its owning configuration source.",
        "Validate both dependency and plugin resolution after the correction."
      ]
    },
    {
      step: 11,
      title: "Fix PKIX and TLS certificate failures",
      objective: "Determine whether Maven's Java trust configuration rejects the repository certificate.",
      commands: [
        "mvn -version",
        "keytool -list -cacerts",
        "curl -Iv --connect-timeout 5 https://REPLACE_REPOSITORY_HOST"
      ],
      interpretation: [
        "PKIX path building failed often indicates that Java cannot build a trusted certificate chain for the server.",
        "curl may use a different trust store from the Java runtime, so curl success does not prove Maven's TLS trust is correct.",
        "Corporate TLS inspection proxies may present a certificate issued by an organization-specific CA.",
        "An expired certificate, incomplete chain, hostname mismatch, incorrect system clock, or outdated trust store can cause TLS errors.",
        "keytool -list -cacerts may use the trust store associated with the selected Java installation; verify which Java Maven actually uses.",
        "Do not use insecure TLS flags or disable certificate verification to bypass the error."
      ],
      nextAction: [
        "Inspect the certificate chain and hostname with the approved network/security team.",
        "Confirm the repository certificate is valid and the expected CA is trusted by the actual Maven JVM.",
        "Import only the verified, approved CA certificate using the organization's trust-store procedure.",
        "Retest from the same CI agent and Java runtime."
      ]
    },
    {
      step: 12,
      title: "Troubleshoot proxy configuration",
      objective: "Check whether Maven uses the intended outbound proxy.",
      commands: [
        "mvn help:effective-settings -Doutput=effective-settings.xml",
        "curl -Iv --connect-timeout 5 https://REPLACE_REPOSITORY_HOST",
        "Test-NetConnection REPLACE_REPOSITORY_HOST -Port 443"
      ],
      interpretation: [
        "Maven commonly obtains proxy settings from settings.xml; a browser or curl environment may use different proxy configuration.",
        "A proxy can return its own 407 authentication response, block a repository, or fail to connect to an upstream host.",
        "A nonProxyHosts mismatch can cause internal repositories to be routed through the wrong proxy.",
        "Proxy credentials must be handled through the approved secret mechanism.",
        "Direct connectivity may be prohibited by organizational policy even if it appears to work from one workstation."
      ],
      nextAction: [
        "Confirm the intended proxy host, port, authentication, and bypass rules.",
        "Check proxy logs for the failing destination and timestamp.",
        "Update the approved Maven settings or CI configuration.",
        "Retest from the actual build environment."
      ]
    },
    {
      step: 13,
      title: "Investigate corrupted local Maven cache",
      objective: "Repair a specific incomplete or corrupted local artifact without deleting the whole cache.",
      commands: [
        "mvn -version",
        "mvn -B -ntp -U -e -DskipTests package",
        "mvn -B -ntp dependency:get -Dartifact=REPLACE_GROUP_ID:REPLACE_ARTIFACT_ID:REPLACE_VERSION"
      ],
      interpretation: [
        "Maven stores downloaded artifacts in its local repository, usually ~/.m2/repository unless configured otherwise.",
        "A .lastUpdated marker can record a previous failed resolution. It does not by itself prove the artifact file is corrupt.",
        "A partial JAR, incomplete POM, checksum mismatch, or stale snapshot metadata can produce different symptoms.",
        "-U requests updated snapshots and checks for missing releases; it is not a guarantee that every local file will be deleted or redownloaded.",
        "If all agents fail for the same artifact, suspect the shared repository or published artifact before blaming one local cache.",
        "Check disk space and file permissions if downloads stop midway or files cannot be written."
      ],
      nextAction: [
        "Identify the exact affected artifact directory in the configured local repository.",
        "Preserve logs and inspect the artifact files before removing anything.",
        "If approved, remove only the affected artifact/version cache directory and rerun the build.",
        "If the same artifact fails again, investigate the upstream repository, publication, or checksum."
      ]
    },
    {
      step: 14,
      title: "Investigate SNAPSHOT metadata and version resolution",
      objective: "Determine whether timestamped snapshot metadata or stale cached metadata is causing resolution failure.",
      commands: [
        "mvn -B -ntp -U -e -DskipTests package",
        "mvn -B -ntp help:effective-pom -Doutput=effective-pom.xml",
        "mvn -B -ntp dependency:tree"
      ],
      interpretation: [
        "Maven SNAPSHOT dependencies may resolve through metadata to timestamped artifacts.",
        "A missing maven-metadata.xml, incomplete publication, stale cache, or repository cleanup can break snapshot resolution.",
        "A release repository may reject snapshot artifacts, and a snapshot repository may have different retention and permission rules.",
        "The -U option can force Maven to check for updated snapshots and missing releases.",
        "A SNAPSHOT dependency is mutable and can reduce build reproducibility if its contents change without a controlled release process."
      ],
      nextAction: [
        "Check that the producer published the snapshot and its metadata completely.",
        "Confirm that the consuming POM uses the intended snapshot repository.",
        "Coordinate with the repository administrator before cleaning shared snapshot metadata.",
        "For production releases, prefer immutable versioned artifacts where appropriate."
      ]
    },
    {
      step: 15,
      title: "Troubleshoot parent POM and Maven plugin downloads",
      objective: "Determine whether the failure is in the project dependency graph or the build tooling itself.",
      commands: [
        "mvn -B -ntp -e validate",
        "mvn -B -ntp -e help:effective-pom",
        "mvn -B -ntp -e dependency:tree"
      ],
      interpretation: [
        "A missing parent POM can prevent Maven from constructing the effective project model before normal dependency resolution starts.",
        "Maven plugins are downloaded from plugin repositories and may fail even when application dependencies are available.",
        "The parent POM may define dependencyManagement, repositories, pluginManagement, and properties that affect resolution.",
        "A plugin version that does not exist or is unavailable in the configured repository cannot be repaired by changing application dependency versions.",
        "A plugin command may itself be unavailable when plugin resolution is the root problem."
      ],
      nextAction: [
        "Identify whether the first failed coordinate is a parent POM, build plugin, plugin dependency, or application dependency.",
        "Verify the parent POM and plugin versions in the intended repository.",
        "Check the configured pluginRepositories and mirror behavior.",
        "Use a known approved Maven version and plugin version for a controlled reproduction."
      ]
    },
    {
      step: 16,
      title: "Check checksum failures and artifact integrity",
      objective: "Determine whether the downloaded artifact is incomplete, inconsistent, or rejected by repository policy.",
      commands: [
        "mvn -B -ntp -e -DskipTests package",
        "sha256sum REPLACE_WITH_DOWNLOADED_ARTIFACT.jar",
        "certutil -hashfile REPLACE_WITH_DOWNLOADED_ARTIFACT.jar SHA256"
      ],
      interpretation: [
        "sha256sum is commonly available on Linux; certutil is available on Windows.",
        "Calculate a checksum only for an artifact that actually exists and compare it with a trusted checksum from the approved source.",
        "A checksum mismatch may indicate an incomplete download, repository corruption, incorrect upstream metadata, or a publishing problem.",
        "Do not treat a checksum generated from the same untrusted downloaded file as independent proof of integrity.",
        "Signature verification, where supported by the artifact's release process, provides additional provenance evidence."
      ],
      nextAction: [
        "Verify the checksum or signature against a trusted source.",
        "Inspect repository logs and upstream content for corruption or an incomplete publish.",
        "Remove a specific corrupt cache entry only after collecting evidence.",
        "Do not disable checksum enforcement to force a production build to pass."
      ]
    },
    {
      step: 17,
      title: "Diagnose Maven failures in Jenkins or another CI agent",
      objective: "Identify differences between local and CI build environments.",
      commands: [
        "mvn -version",
        "git rev-parse HEAD",
        "git status --short",
        "mvn -B -ntp -e -DskipTests package"
      ],
      interpretation: [
        "Confirm the CI agent uses the expected commit, Maven version, Java runtime, working directory, settings file, and container image.",
        "A developer's local ~/.m2 cache may hide an unavailable or incorrectly configured repository.",
        "A clean CI agent can expose missing parent POMs, unpublished artifacts, expired credentials, or incorrect mirrors.",
        "Concurrent builds may compete for disk, network, repository bandwidth, or a shared writable Maven cache.",
        "Credential bindings can be missing from one pipeline stage even when another stage can download dependencies."
      ],
      nextAction: [
        "Reproduce with the same Maven command and approved settings on a clean test agent.",
        "Compare the failing agent with a known-good agent without exposing secrets.",
        "Check CI secret injection, agent egress, disk space, and cache configuration.",
        "Use a controlled rerun after the cause is identified; do not repeatedly rerun a deterministic configuration error."
      ]
    },
    {
      step: 18,
      title: "Troubleshoot Docker builds and BuildKit cache behavior",
      objective: "Understand why a container image build cannot download dependencies.",
      commands: [
        "docker build --progress=plain -t REPLACE_IMAGE_NAME:debug .",
        "docker image inspect REPLACE_IMAGE_NAME:debug",
        "docker system df",
        "mvn -B -ntp -e -DskipTests package"
      ],
      interpretation: [
        "A Docker build runs within its build environment, which may have different DNS, proxy, CA trust, credentials, and cache state than the host.",
        "BuildKit may reuse a cached layer, so a successful cached build does not prove that a clean dependency download works.",
        "A build using --no-cache can help reproduce a cache-related issue but may increase network load and rebuild time.",
        "Do not print build arguments or environment variables that contain credentials.",
        "The final Maven command must run in the same or an equivalent environment to be a valid comparison."
      ],
      nextAction: [
        "Identify the exact Docker build stage that runs Maven.",
        "Check the base image's Java trust store, DNS, proxy, Maven settings, and secret mounts.",
        "Use BuildKit secret mounts or an approved secret mechanism rather than baking credentials into image layers.",
        "Rebuild with a controlled cache strategy and verify the resulting image."
      ]
    },
    {
      step: 19,
      title: "Investigate repository-manager health and storage",
      objective: "Determine whether Nexus or Artifactory is failing across multiple projects.",
      commands: [
        "curl -I --connect-timeout 5 https://REPLACE_REPOSITORY_HOST/",
        "mvn -B -ntp -e -DskipTests package",
        "df -h",
        "df -i"
      ],
      interpretation: [
        "df commands are Linux host diagnostics and must be run on the repository server only by authorized operators.",
        "Repository managers may fail because of full disks, inode exhaustion, storage latency, database problems, proxy-cache failures, or upstream outages.",
        "A repository landing page can work while artifact downloads fail because the storage backend or a specific repository is unhealthy.",
        "Repository administrator access is not required for a consumer to collect the initial Maven-side evidence.",
        "Do not run host-level storage commands on managed SaaS services where the operator has no server access."
      ],
      nextAction: [
        "Correlate failures across teams, artifacts, repositories, and time.",
        "Escalate server-side checks to the repository owner with sanitized request evidence.",
        "Inspect storage, upstream proxy, service logs, and repository health using the approved operational tooling.",
        "Follow the repository service's recovery procedure rather than restarting shared infrastructure without diagnosis."
      ]
    },
    {
      step: 20,
      title: "Check dependency conflicts and transitive resolution",
      objective: "Determine whether the requested artifact is unavailable or the dependency graph is inconsistent.",
      commands: [
        "mvn -B -ntp dependency:tree -Dverbose",
        "mvn -B -ntp -DskipTests dependency:analyze",
        "mvn -B -ntp -DskipTests verify"
      ],
      interpretation: [
        "dependency:tree -Dverbose shows transitive dependencies and some omitted-for-conflict decisions.",
        "A dependency conflict is not the same as an HTTP download failure, although resolving the graph can reveal an unavailable transitive version.",
        "dependency:analyze is a diagnostic plugin and may itself need to be downloaded.",
        "Dependency mediation, exclusions, BOM imports, and dependencyManagement can affect which version Maven selects.",
        "Changing a transitive version may break runtime compatibility even if the build succeeds."
      ],
      nextAction: [
        "Find the first unresolved coordinate and trace which dependency introduces it.",
        "Review BOMs, dependencyManagement, exclusions, and supported versions.",
        "Apply a reviewed version alignment or dependency correction.",
        "Run tests and compatibility checks before promoting the result."
      ]
    },
    {
      step: 21,
      title: "Validate recovery and restore the pipeline",
      objective: "Prove that the artifact can be resolved and the intended build succeeds.",
      commands: [
        "mvn -B -ntp -U -e -DskipTests package",
        "mvn -B -ntp clean verify",
        "git diff --check",
        "git status --short"
      ],
      interpretation: [
        "The package command verifies dependency resolution and packaging while skipping tests; it is not a substitute for the full validation suite.",
        "clean verify runs the lifecycle through verification, including configured tests and checks.",
        "The -U option is useful when refreshed snapshot or missing-release checks are needed, but it is not necessary for every retry.",
        "A successful local build does not prove that the production CI agent has the same settings, credentials, network, or Java environment.",
        "Confirm that no unintended POM, repository, plugin, or dependency changes were introduced during troubleshooting."
      ],
      nextAction: [
        "Rerun the failed job on the intended CI agent and confirm the same artifact resolves.",
        "Verify unit tests, integration tests, packaging, image creation, and deployment gates as applicable.",
        "Observe repository health and pipeline failure rate after recovery.",
        "Record the root cause, recovery action, and prevention owner in the incident report."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Could not transfer artifact",
      likelyCauses: [
        "Repository unreachable or upstream unavailable.",
        "DNS, proxy, firewall, or TLS failure.",
        "Invalid credentials or insufficient permissions.",
        "Incorrect repository URL or artifact coordinates.",
        "Corrupted or incomplete download."
      ],
      verification: [
        "Capture the full error, URL, repository ID, coordinates, HTTP status, and first nested exception.",
        "Test connectivity from the failing CI agent.",
        "Compare with a known-good agent and inspect repository logs."
      ],
      resolution: [
        "Correct the verified network, repository, credential, or artifact issue.",
        "Use a targeted cache repair only when local corruption is supported by evidence.",
        "Rerun the original build and verify the resulting artifact."
      ]
    },
    {
      symptom: "HTTP 401 Unauthorized",
      likelyCauses: [
        "Missing server credentials in settings.xml.",
        "Incorrect server ID after mirror selection.",
        "Expired or rotated token.",
        "Wrong credential binding in CI."
      ],
      verification: [
        "Identify the repository or mirror ID from Maven logs.",
        "Inspect sanitized effective settings.",
        "Check token validity and repository audit logs."
      ],
      resolution: [
        "Correct the matching server entry or CI secret binding.",
        "Refresh the approved token when required.",
        "Never store credentials in source-controlled POM files."
      ]
    },
    {
      symptom: "HTTP 403 Forbidden",
      likelyCauses: [
        "Missing read permission.",
        "Repository content policy denial.",
        "Incorrect repository or namespace.",
        "Corporate proxy restriction."
      ],
      verification: [
        "Check repository identity and permissions.",
        "Review repository-manager audit and policy logs.",
        "Compare the exact artifact path and selected mirror."
      ],
      resolution: [
        "Request least-privilege read access.",
        "Correct the repository selection or approved policy.",
        "Do not grant administrator access to fix a consumer download."
      ]
    },
    {
      symptom: "HTTP 404 Not Found",
      likelyCauses: [
        "Artifact version does not exist.",
        "Incorrect groupId, artifactId, classifier, or extension.",
        "Incorrect repository URL.",
        "Parent POM or plugin was not published.",
        "Repository policy conceals inaccessible artifacts."
      ],
      verification: [
        "Check the artifact in the approved repository interface.",
        "Compare the requested coordinates with the producer's release record.",
        "Inspect the effective POM and repository configuration."
      ],
      resolution: [
        "Correct the coordinates or repository path.",
        "Publish the missing approved artifact through the producer pipeline.",
        "Use the intended repository for release or snapshot artifacts."
      ]
    },
    {
      symptom: "HTTP 429 Too Many Requests",
      likelyCauses: [
        "Repository or upstream rate limit.",
        "Excessive parallel builds.",
        "Repeated retry loops.",
        "Insufficient dependency caching."
      ],
      verification: [
        "Inspect response headers and repository logs.",
        "Compare concurrent build count with the incident window.",
        "Check upstream proxy status."
      ],
      resolution: [
        "Use bounded retries with backoff.",
        "Improve approved dependency caching and concurrency control.",
        "Coordinate capacity or rate-limit changes with the repository owner."
      ]
    },
    {
      symptom: "HTTP 500, 502, 503, or 504",
      likelyCauses: [
        "Repository manager or upstream service failure.",
        "Reverse proxy or gateway timeout.",
        "Storage or database pressure.",
        "Network connectivity between repository components."
      ],
      verification: [
        "Check whether multiple projects and agents are affected.",
        "Inspect server-side health, logs, storage, and upstream status.",
        "Compare the request timestamp and failing artifact path."
      ],
      resolution: [
        "Follow the repository service's incident procedure.",
        "Use bounded retries for confirmed transient errors.",
        "Avoid changing individual POM files to work around a shared repository outage."
      ]
    },
    {
      symptom: "PKIX path building failed",
      likelyCauses: [
        "Untrusted CA certificate.",
        "Expired or incomplete certificate chain.",
        "Corporate TLS inspection.",
        "Wrong Java trust store or system time."
      ],
      verification: [
        "Check Maven's Java runtime and certificate chain.",
        "Compare Java behavior with curl without assuming both use the same trust store.",
        "Review approved proxy and certificate configuration."
      ],
      resolution: [
        "Repair the server certificate chain or install the verified approved CA.",
        "Use the correct Java trust store.",
        "Never disable certificate verification as a permanent workaround."
      ]
    },
    {
      symptom: "Build works locally but fails in CI",
      likelyCauses: [
        "Different Maven or Java version.",
        "Missing CI credentials.",
        "Different settings.xml, mirror, proxy, or CA trust.",
        "Local cache masks an unavailable artifact.",
        "Wrong commit, workspace, or container image."
      ],
      verification: [
        "Compare Maven and Java versions, commit SHA, effective settings, and artifact URL.",
        "Reproduce on a clean approved agent.",
        "Inspect CI secret bindings and egress connectivity."
      ],
      resolution: [
        "Align the build environment and approved settings.",
        "Fix the repository or artifact publication problem.",
        "Add reproducible CI diagnostics and cache health checks."
      ]
    },
    {
      symptom: "Checksum or corrupted artifact error",
      likelyCauses: [
        "Interrupted download.",
        "Corrupted repository cache.",
        "Incomplete artifact publication.",
        "Incorrect or untrusted checksum metadata."
      ],
      verification: [
        "Inspect the exact artifact file and repository metadata.",
        "Compare its checksum with a trusted source.",
        "Check repository server logs and disk health."
      ],
      resolution: [
        "Repair the producer publication or repository cache.",
        "Remove only the confirmed corrupt local artifact when approved.",
        "Keep integrity verification enabled."
      ]
    },
    {
      symptom: "SNAPSHOT dependency cannot be resolved",
      likelyCauses: [
        "Missing or stale metadata.",
        "Snapshot was not published completely.",
        "Wrong repository configuration.",
        "Snapshot retention cleanup."
      ],
      verification: [
        "Inspect the snapshot repository and metadata.",
        "Check the producer pipeline and publication timestamps.",
        "Verify the consuming POM and effective settings."
      ],
      resolution: [
        "Complete or republish the approved snapshot.",
        "Correct the repository selection.",
        "Refresh snapshot metadata in a controlled manner."
      ]
    }
  ],

  recoveryProcedures: [
    {
      scenario: "Repository authentication failure",
      steps: [
        "Capture the failing repository ID, mirror ID, HTTP status, and artifact coordinates.",
        "Determine which settings.xml file and credential source Maven actually uses.",
        "Check the credential binding and repository identity without printing secret values.",
        "Verify token expiration and minimum required read permission.",
        "Correct the approved CI secret binding or settings configuration."
      ],
      validation: [
        "Retry the exact failing artifact resolution.",
        "Run the original Maven build on the intended CI agent.",
        "Verify that no secret appears in logs or generated artifacts."
      ],
      rollback: [
        "Restore the last known good non-secret configuration if the new configuration breaks other repositories.",
        "Revoke a newly exposed or compromised credential immediately through the approved incident process.",
        "Do not restore an expired or compromised credential just to recover a build."
      ]
    },
    {
      scenario: "Missing or unpublished artifact",
      steps: [
        "Verify the exact groupId, artifactId, version, classifier, and extension.",
        "Confirm the intended release or snapshot repository.",
        "Check the producer pipeline and publication record.",
        "Publish the approved artifact through the owning release process if it is genuinely missing.",
        "Confirm the artifact and its POM are available before rerunning consumer builds."
      ],
      validation: [
        "Resolve the artifact using the intended repository and credentials.",
        "Verify checksum or signature according to the release process.",
        "Run the consuming project's tests and packaging."
      ],
      rollback: [
        "If the published artifact is invalid, follow the repository's approved quarantine or correction process.",
        "Do not overwrite immutable release artifacts unless the repository's governance explicitly permits it.",
        "Do not silently change the production dependency version to an unreviewed alternative."
      ]
    },
    {
      scenario: "Repository manager outage",
      steps: [
        "Determine whether failures are shared across teams, repositories, and agents.",
        "Capture representative error messages, artifact paths, timestamps, and request IDs.",
        "Escalate to the Nexus or Artifactory owner and inspect service, upstream, and storage health.",
        "Use an approved alternate repository or mirror only if it is authorized and has the required artifacts.",
        "Apply bounded retry and queueing strategies according to the incident plan."
      ],
      validation: [
        "Verify that artifact downloads succeed after the repository owner confirms recovery.",
        "Run representative builds from more than one approved agent.",
        "Monitor repository errors and upstream failures."
      ],
      rollback: [
        "Restore the original repository routing when the alternate path is no longer needed.",
        "Avoid bypassing approved repository controls or exposing internal artifacts to public repositories.",
        "Remove temporary routing only after verifying that dependent pipelines are healthy."
      ]
    },
    {
      scenario: "Corrupted local Maven cache",
      steps: [
        "Identify the configured local repository path.",
        "Locate the exact failing groupId/artifactId/version directory.",
        "Preserve logs and inspect the JAR, POM, checksum, and .lastUpdated files.",
        "Confirm the upstream artifact is healthy before deleting local files.",
        "Remove only the affected artifact/version directory under the approved procedure."
      ],
      validation: [
        "Retry resolution and confirm a complete artifact is downloaded.",
        "Run the original build and tests.",
        "Compare the downloaded artifact checksum with the trusted repository metadata where supported."
      ],
      rollback: [
        "Restore any required cached artifacts from an approved backup if needed.",
        "If the download fails again, stop repeated deletion and investigate the upstream cause.",
        "Avoid deleting the entire local repository on shared CI agents."
      ]
    },
    {
      scenario: "TLS or proxy failure",
      steps: [
        "Confirm the Maven JVM, repository hostname, certificate chain, and actual proxy path.",
        "Inspect the failure from the affected agent and compare it with a known-good environment.",
        "Have the approved security or network owner verify the certificate and proxy policy.",
        "Update the trust store or proxy configuration through the controlled process.",
        "Keep certificate validation enabled."
      ],
      validation: [
        "Confirm a valid TLS handshake from the Maven JVM.",
        "Resolve the exact artifact using Maven.",
        "Run the original build and ensure unrelated external repository access remains correct."
      ],
      rollback: [
        "Restore the previous approved proxy or trust configuration if the new change causes wider failures.",
        "Never roll back to an insecure certificate-verification bypass.",
        "Escalate suspected certificate compromise or unexpected interception immediately."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "Maven Central works from a laptop but fails from a corporate CI agent",
      diagnosis: [
        "Compare DNS, proxy, outbound firewall, TLS trust, Maven settings, and Java runtime from both environments.",
        "Determine whether corporate policy requires all Maven traffic to pass through Nexus or Artifactory.",
        "Inspect the actual URL selected after mirror resolution.",
        "Check whether the CI environment can reach the repository host and whether a proxy returns the error."
      ],
      remediation: [
        "Use the organization's approved repository mirror and proxy.",
        "Correct the agent's CA trust or egress configuration where confirmed.",
        "Avoid bypassing organizational repository controls to restore a single pipeline."
      ]
    },
    {
      scenario: "All projects fail to download artifacts at the same time",
      diagnosis: [
        "Check whether affected projects share a repository manager, proxy, DNS resolver, or credential service.",
        "Compare errors and timestamps across unrelated artifact coordinates.",
        "Inspect shared repository health and upstream status.",
        "Determine whether a common token rotation, network change, or CA update occurred."
      ],
      remediation: [
        "Escalate as a shared service incident when evidence supports a common dependency.",
        "Repair the shared service or configuration rather than editing every project POM.",
        "Add service health monitoring and a documented repository outage procedure."
      ]
    },
    {
      scenario: "One artifact fails while other dependencies download successfully",
      diagnosis: [
        "Check whether the failing artifact is in a different repository, group, namespace, or version.",
        "Verify the exact artifact path and publication record.",
        "Check repository content policies and artifact-specific authorization.",
        "Determine whether the dependency is a parent POM, plugin, classifier, or snapshot."
      ],
      remediation: [
        "Correct the exact coordinate, publication, repository, or permission problem.",
        "Do not rotate all CI credentials or change shared network settings without evidence.",
        "Validate the specific artifact and then rerun the complete build."
      ]
    },
    {
      scenario: "A dependency download starts but stops midway",
      diagnosis: [
        "Check connection resets, proxy timeouts, repository logs, and file-system capacity.",
        "Inspect whether the same artifact repeatedly fails at a similar size.",
        "Check agent disk space, inodes on Linux, file permissions, and concurrent writes.",
        "Determine whether the problem affects only one agent or the repository service."
      ],
      remediation: [
        "Repair the confirmed network, storage, permission, or upstream issue.",
        "Remove only a confirmed incomplete artifact cache entry when approved.",
        "Use bounded retries for transient failures and monitor repeat occurrences."
      ]
    },
    {
      scenario: "Docker build succeeds from cache but fails on a clean build",
      diagnosis: [
        "Identify the Maven build stage and whether dependency layers are reused.",
        "Check network, proxy, CA trust, and Maven credentials inside the build environment.",
        "Verify whether the dependency was downloaded previously but is no longer available upstream.",
        "Check whether credentials were improperly embedded in an image layer."
      ],
      remediation: [
        "Use approved BuildKit secret mounts and controlled dependency caching.",
        "Ensure required artifacts are available from the approved repository.",
        "Test a clean build in a controlled environment before promoting the image."
      ]
    },
    {
      scenario: "A Maven release build is non-reproducible",
      diagnosis: [
        "Inspect mutable SNAPSHOT dependencies, version ranges, parent POM changes, plugin versions, and repository metadata.",
        "Compare dependency trees and effective POMs from successful and failed builds.",
        "Check whether the same coordinates return different bytes or metadata over time."
      ],
      remediation: [
        "Pin approved dependency and plugin versions.",
        "Prefer immutable release artifacts and controlled repository policies.",
        "Record dependency provenance and checksums according to the organization's supply-chain controls."
      ]
    },
    {
      scenario: "Repository storage or cache corruption affects selected artifacts",
      diagnosis: [
        "Check repository health, storage capacity, backend errors, and artifact-specific logs.",
        "Compare the artifact against a trusted upstream or published checksum.",
        "Determine whether the issue is confined to a proxy cache or affects hosted artifacts."
      ],
      remediation: [
        "Have the repository owner repair or invalidate only the affected cache entry using supported procedures.",
        "Republish internal artifacts through the approved producer pipeline if required.",
        "Preserve release integrity and audit evidence."
      ]
    },
    {
      scenario: "CI retries increase load during a repository outage",
      diagnosis: [
        "Inspect job retry policies, parallelism, and repeated dependency resolution.",
        "Correlate request volume with repository errors and rate-limit responses.",
        "Check whether every failed build immediately launches another identical build."
      ],
      remediation: [
        "Use bounded retries with exponential backoff and jitter.",
        "Prevent retry storms and coordinate concurrency limits.",
        "Fail fast for deterministic configuration errors such as invalid coordinates or unauthorized access."
      ]
    },
    {
      scenario: "An internal artifact is unavailable after a release",
      diagnosis: [
        "Verify the producer pipeline's publication stage and repository target.",
        "Check whether the POM and all required artifacts were published successfully.",
        "Inspect release repository immutability and permissions.",
        "Confirm the consumer is using the intended release repository and version."
      ],
      remediation: [
        "Repair the producer publication through the approved release process.",
        "Add a publish-then-consume verification stage.",
        "Avoid manually uploading incomplete or unverified artifacts."
      ]
    }
  ],

  monitoringAndPrevention: [
    "Monitor repository-manager availability, response latency, HTTP 4xx/5xx rates, upstream proxy errors, and storage capacity.",
    "Alert on sustained download failures, rate limiting, and repository health degradation.",
    "Track build failure rates by repository, artifact coordinate, CI agent, Java version, and Maven version.",
    "Use approved repository mirrors to provide centralized governance, caching, and auditability.",
    "Configure bounded retries with backoff and jitter for transient repository failures.",
    "Avoid retrying deterministic errors such as invalid coordinates, expired credentials, or missing release versions indefinitely.",
    "Pin Maven plugin versions and use dependency and plugin management consistently.",
    "Prefer immutable release dependencies for production builds and minimize mutable SNAPSHOT usage.",
    "Use Maven Wrapper where appropriate to standardize Maven versions across developers and CI.",
    "Keep Java and Maven versions supported and update trust stores through the approved maintenance process.",
    "Store repository credentials in CI secret stores or approved secret managers, never in source-controlled POM files.",
    "Use least-privilege read permissions for build consumers and separate publishing identities from download identities.",
    "Do not expose credentials in debug logs, build arguments, generated effective settings, or container layers.",
    "Use controlled Maven dependency caches and measure their effectiveness before changing cache retention.",
    "Run periodic clean-build tests to detect dependencies that are available only in stale local caches.",
    "Validate published artifacts by resolving them from the intended repository in a downstream smoke-test job.",
    "Use dependency vulnerability scanning, license policy checks, checksum validation, and provenance controls where required.",
    "Document the repository owner, escalation route, service status dashboard, and recovery procedure.",
    "Keep a known-good build and artifact provenance record for release rollback and incident investigation.",
    "Conduct post-incident reviews and add automated checks for every confirmed recurring failure."
  ],

  incidentRunbook: [
    "1. Declare the build or release incident and identify the affected project, branch, commit, and environment.",
    "2. Determine whether the failure affects one artifact, one agent, one repository, or multiple teams.",
    "3. Capture the first transfer error, HTTP status, artifact coordinates, repository ID, and requested URL.",
    "4. Confirm Maven and Java versions, working directory, effective POM, and sanitized effective settings.",
    "5. Test DNS and HTTPS connectivity from the actual failing agent.",
    "6. Check authentication, authorization, repository selection, proxy, TLS, metadata, and local cache in that order where appropriate to the evidence.",
    "7. Review repository-manager logs and recent credential, network, certificate, or repository changes.",
    "8. State the root-cause hypothesis and supporting evidence before modifying configuration.",
    "9. Select the smallest safe correction, obtain required approval, and document rollback conditions.",
    "10. Apply the correction through the owning project, CI, security, or repository-management workflow.",
    "11. Re-resolve the exact artifact, rerun tests and packaging, and verify the original CI job.",
    "12. Confirm that credentials remain protected and that dependency integrity controls remain enabled.",
    "13. Monitor for recurrence and update the incident ticket with timeline, impact, root cause, and recovery.",
    "14. Add prevention actions with an owner and due date."
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Diagnose a missing dependency",
      objective: "Identify incorrect artifact coordinates or a missing version.",
      steps: [
        "Create a disposable Maven project in a test directory.",
        "Run mvn -B -ntp -e validate and capture the first error.",
        "Add a deliberately incorrect dependency version only in the disposable lab.",
        "Inspect the exact groupId, artifactId, and version in the failure.",
        "Restore the valid version and run the build again."
      ],
      expectedOutcome: "You can distinguish an invalid or unavailable coordinate from a general repository outage."
    },
    {
      title: "Lab 2 — Inspect effective Maven configuration",
      objective: "Understand repository, mirror, profile, and settings selection.",
      steps: [
        "Use a test project and an approved Maven installation.",
        "Generate the effective POM and effective settings if the required plugins are available.",
        "Inspect repository IDs, mirrors, active profiles, and plugin repository configuration.",
        "Remove or redact sensitive information before saving the evidence.",
        "Compare the configuration with a known-good project."
      ],
      expectedOutcome: "You can identify where Maven obtains its effective repository configuration."
    },
    {
      title: "Lab 3 — Simulate a local cache issue",
      objective: "Learn targeted cache recovery without deleting the entire Maven repository.",
      steps: [
        "Use a disposable local Maven repository directory with a test project.",
        "Download a known public test dependency.",
        "Inspect the corresponding artifact directory and files.",
        "In the disposable repository only, remove the test artifact directory.",
        "Resolve the dependency again and verify the downloaded file."
      ],
      expectedOutcome: "You can safely reproduce a cache refresh and explain why broad cache deletion is unnecessary."
    },
    {
      title: "Lab 4 — Maven build in CI",
      objective: "Compare local and CI dependency resolution.",
      steps: [
        "Create a test pipeline that prints Maven and Java versions.",
        "Record the checked-out commit and build working directory.",
        "Run a batch Maven build with transfer progress disabled.",
        "Compare sanitized settings and repository URLs between the local and CI environments.",
        "Run the build on a clean test agent and record the result."
      ],
      expectedOutcome: "You can identify differences in runtime, credentials, settings, network access, and cache state."
    },
    {
      title: "Lab 5 — HTTP error classification",
      objective: "Learn how repository response codes change the troubleshooting path.",
      steps: [
        "Use an authorized test repository or local mock service.",
        "Generate controlled successful, unauthorized, forbidden, missing-path, and transient-error responses.",
        "Capture sanitized Maven and HTTP logs.",
        "Map each response to authentication, authorization, coordinate, or server-health checks.",
        "Document the next diagnostic step for each response."
      ],
      expectedOutcome: "You can avoid applying the same fix to fundamentally different repository failures."
    },
    {
      title: "Lab 6 — TLS trust troubleshooting",
      objective: "Understand the difference between operating-system and Java certificate trust.",
      steps: [
        "Use a disposable test environment with a controlled HTTPS endpoint.",
        "Compare curl behavior with the Maven JVM's certificate validation.",
        "Inspect the certificate chain and hostname.",
        "Correct the approved test CA configuration in the disposable environment.",
        "Repeat the download with certificate verification enabled."
      ],
      expectedOutcome: "You can diagnose Java TLS trust problems without disabling certificate validation."
    },
    {
      title: "Lab 7 — Docker clean build",
      objective: "Investigate dependencies that are hidden by cached Docker layers.",
      steps: [
        "Create a disposable Maven project and a test Dockerfile.",
        "Build the image once and record which build layers are reused.",
        "Run a controlled clean build in the test environment.",
        "Compare the Maven runtime, DNS, proxy, CA trust, and dependency cache.",
        "Verify that no credentials were embedded in the final image or its layers."
      ],
      expectedOutcome: "You can explain why a cached image build may succeed when a clean build fails."
    },
    {
      title: "Lab 8 — End-to-end incident simulation",
      objective: "Practice a complete production-style artifact download incident in a safe environment.",
      steps: [
        "Create a disposable project with a known dependency.",
        "Introduce one controlled configuration issue, such as an incorrect repository URL.",
        "Capture the initial failure, environment, coordinates, and timestamp.",
        "Use the diagnostic workflow to prove the root cause.",
        "Apply the smallest correction and rerun the original build.",
        "Write a short incident report with impact, evidence, recovery, and prevention."
      ],
      expectedOutcome: "You can complete an evidence-based troubleshooting workflow from initial failure to verified recovery."
    }
  ],

  interviewQuestions: [
    {
      question: "What is a Maven artifact?",
      answer: "A Maven artifact is a build output or dependency identified by coordinates such as groupId, artifactId, version, packaging, and optionally classifier."
    },
    {
      question: "What does Could not transfer artifact mean?",
      answer: "Maven failed to retrieve an artifact from a configured repository. The cause may be network connectivity, HTTP authorization, a missing artifact, TLS, a proxy, repository health, or a corrupted transfer."
    },
    {
      question: "What is the difference between HTTP 401 and 403?",
      answer: "401 generally indicates missing or invalid authentication, while 403 generally indicates that access is forbidden. Repository implementations may vary, so verify the server response and audit logs."
    },
    {
      question: "What does HTTP 404 mean during Maven dependency resolution?",
      answer: "The requested path or artifact may not exist, the coordinates may be incorrect, or the repository may conceal an authorization failure. Verify the actual repository and artifact coordinates."
    },
    {
      question: "What is settings.xml used for?",
      answer: "Maven settings.xml configures user or environment-specific settings such as mirrors, proxies, credentials, profiles, and the local repository location."
    },
    {
      question: "What is a Maven mirror?",
      answer: "A mirror redirects requests for matching repositories to another repository endpoint, often an internal Nexus or Artifactory service."
    },
    {
      question: "How do Maven server IDs relate to credentials?",
      answer: "Maven selects server credentials by repository or mirror ID. The ID must match the repository Maven actually uses, which may be the mirror ID."
    },
    {
      question: "What is the difference between dependency repositories and plugin repositories?",
      answer: "Dependency repositories provide project dependencies, while plugin repositories provide Maven build plugins and their dependencies. They can follow different resolution paths."
    },
    {
      question: "What does PKIX path building failed mean?",
      answer: "Java could not build a trusted certificate chain for the HTTPS connection. Investigate certificate validity, CA trust, hostname, proxy interception, and the JVM trust store."
    },
    {
      question: "Why can curl work while Maven fails?",
      answer: "curl and Java may use different trust stores, proxies, DNS behavior, or credentials. Compare the actual execution environment and TLS configuration."
    },
    {
      question: "What is the Maven local repository?",
      answer: "It is the local cache of downloaded artifacts and metadata, commonly stored under ~/.m2/repository unless configured otherwise."
    },
    {
      question: "What does Maven -U do?",
      answer: "-U forces Maven to check for updated snapshots and missing release artifacts. It does not guarantee that all cached files are deleted or repaired."
    },
    {
      question: "What is a SNAPSHOT dependency?",
      answer: "A SNAPSHOT represents a development version that can change over time. Maven may use repository metadata to select timestamped snapshot artifacts."
    },
    {
      question: "How do you troubleshoot a Maven build that works locally but fails in Jenkins?",
      answer: "Compare the commit, working directory, Maven and Java versions, effective settings, credentials, proxy, certificate trust, repository URL, and local cache state."
    },
    {
      question: "Why is deleting the complete .m2 repository not a good first step?",
      answer: "It removes unrelated cached artifacts, increases network load, slows builds, and may hide the original issue. Diagnose and repair the specific affected artifact when cache corruption is proven."
    },
    {
      question: "How do you troubleshoot HTTP 429?",
      answer: "Inspect rate-limit headers and repository logs, reduce retry storms, use bounded backoff, and improve approved dependency caching or repository capacity."
    },
    {
      question: "What is Nexus or Artifactory used for?",
      answer: "These repository managers host internal artifacts and can proxy or cache external dependencies, enforce policies, manage access, and provide audit and operational visibility."
    },
    {
      question: "How can a Docker build hide a dependency problem?",
      answer: "A cached build layer may contain dependencies from an earlier successful download. A clean build can expose missing artifacts, incorrect credentials, or unavailable repositories."
    },
    {
      question: "How do you troubleshoot checksum mismatch?",
      answer: "Compare the artifact against a trusted checksum or signature, inspect repository and transfer logs, and investigate corruption or incomplete publication. Do not disable integrity checks."
    },
    {
      question: "What should be included in a production artifact-download incident report?",
      answer: "Include impact, timeline, failing coordinates, repository and HTTP response, evidence, root cause, recovery action, validation, rollback decision, and prevention owners."
    },
    {
      question: "How do you prevent dependency-download outages?",
      answer: "Use approved mirrors, repository monitoring, controlled retries, reproducible versions, protected credentials, clean-build validation, artifact integrity checks, and documented recovery procedures."
    },
    {
      question: "How do you distinguish a network issue from an IAM or repository permission issue?",
      answer: "Network problems commonly appear as DNS errors, connection failures, or timeouts. HTTP 401/403 indicates that a server or intermediary responded, so investigate identity and policy while still verifying the actual request path."
    }
  ],

  officialReferences: [
    {
      title: "Maven Introduction to Repositories",
      url: "https://maven.apache.org/guides/introduction/introduction-to-repositories.html"
    },
    {
      title: "Maven Settings Reference",
      url: "https://maven.apache.org/settings.html"
    },
    {
      title: "Maven POM Reference",
      url: "https://maven.apache.org/pom.html"
    },
    {
      title: "Maven Dependency Plugin",
      url: "https://maven.apache.org/plugins/maven-dependency-plugin/"
    },
    {
      title: "Maven Help Plugin",
      url: "https://maven.apache.org/plugins/maven-help-plugin/"
    },
    {
      title: "Maven Dependency Mechanism",
      url: "https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html"
    },
    {
      title: "Maven Wrapper",
      url: "https://maven.apache.org/wrapper/"
    },
    {
      title: "Apache Maven Release and Snapshot Repository Guide",
      url: "https://maven.apache.org/repositories/"
    },
    {
      title: "Sonatype Nexus Repository Documentation",
      url: "https://help.sonatype.com/"
    },
    {
      title: "JFrog Artifactory Documentation",
      url: "https://jfrog.com/help/"
    },
    {
      title: "Docker Build Secrets",
      url: "https://docs.docker.com/build/building/secrets/"
    },
    {
      title: "Java Keytool Documentation",
      url: "https://docs.oracle.com/en/java/javase/21/docs/specs/man/keytool.html"
    }
  ]
};
