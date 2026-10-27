export interface SnapshotUpdateErrorGuide {
  title: string;
  category: string;
  severity: string;
  overview: string;
  incidentScenario: string;
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    interpretOutput: string[];
    nextAction: string[];
  }[];
  rootCauseMatrix: {
    symptom: string;
    likelyCauses: string[];
    diagnostics: string[];
    resolution: string[];
  }[];
  advancedScenarios: {
    scenario: string;
    investigation: string[];
    recovery: string[];
    prevention: string[];
  }[];
  recoveryProcedures: {
    situation: string;
    procedure: string[];
    validation: string[];
    rollback: string[];
  }[];
  cicdTroubleshooting: string[];
  monitoringAndPrevention: string[];
  incidentRunbook: string[];
  handsOnLabs: {
    lab: string;
    objective: string;
    steps: string[];
    expectedResult: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  incidentReportTemplate: string[];
  officialReferences: string[];
}

export const snapshotUpdateErrorGuide: SnapshotUpdateErrorGuide = {
  title: "Maven SNAPSHOT Update Error — Production Troubleshooting",
  category:
    "Maven Dependency Management, Repository Managers, CI/CD and Release Engineering",
  severity:
    "SEV-3 by default. Escalate according to business impact when a critical release is blocked, multiple pipelines are affected, or an incorrect artifact has reached an environment.",

  overview: `
A Maven SNAPSHOT is a development version that can change while development
continues. Examples include:

com.example:payment-common:2.4.0-SNAPSHOT
com.example:customer-api:1.8.0-SNAPSHOT

A consumer project can depend on a SNAPSHOT published by another project.
Maven uses repository metadata to resolve timestamped SNAPSHOT artifacts.

For example, a repository may publish:

payment-common-2.4.0-20261027.103015-7.jar

The consumer still declares:

com.example:payment-common:2.4.0-SNAPSHOT

Repository metadata maps the logical SNAPSHOT version to the available
timestamped artifact.

Common symptoms:
- A new SNAPSHOT is published, but the consumer still uses older behavior.
- Maven reports that an artifact could not be transferred.
- A SNAPSHOT dependency is not found.
- Maven uses cached metadata or a previously resolved artifact.
- A Jenkins build passes on one agent but fails on another.
- A repository manager returns 401, 403, 404, 409, 429 or 5xx.
- Metadata is missing, stale, inconsistent or temporarily unavailable.
- Concurrent deployments interfere with snapshot metadata.
- A build uses the wrong repository, profile or settings.xml.

Important:
A SNAPSHOT update problem is not always a cache problem. It may be caused by
incorrect artifact coordinates, a failed upstream publication, repository
routing, permissions, metadata inconsistency, network failure or an incorrect
assumption about which artifact was published.

Production principle:
First prove which version was published, which repository contains it, which
metadata Maven sees and which artifact the consumer actually resolved. Then
apply the smallest safe correction.
`,

  incidentScenario: `
INCIDENT: A shared Java library was updated and published as a SNAPSHOT.
The downstream payment-service pipeline is expected to use the new behavior,
but the pipeline continues to behave as though the old library is installed.

The developer reruns the build, but the result remains unchanged.

Possible causes:
1. The new library was never successfully deployed.
2. The consumer uses a different repository or mirror.
3. The repository metadata does not reference the new timestamped artifact.
4. Maven's update policy has not triggered another metadata check.
5. A local cache or repository-manager cache contains stale information.
6. Jenkins uses a different Maven local repository or settings.xml.
7. The consumer is using a different groupId, artifactId or version.
8. The SNAPSHOT was published to a different repository or profile.
9. Concurrent publishers caused a metadata race or repository-side inconsistency.
10. The new artifact was downloaded, but the application code or test expectation
    does not demonstrate the change.

The on-call engineer must establish whether the failure is in publication,
repository metadata, resolution, compilation, testing or runtime behavior.

Do not assume that running mvn -U always solves the issue. It requests updated
snapshot and missing-release checks according to Maven's resolution behavior,
but it cannot repair a failed publication, incorrect coordinates or a broken
repository service.
`,

  impactAssessment: [
    "Identify the affected repository, branch, commit SHA, module and downstream application.",
    "Confirm whether the issue affects developer machines, one CI agent, every agent, one repository manager or multiple environments.",
    "Identify the exact SNAPSHOT coordinates: groupId, artifactId, version, classifier and packaging/type where applicable.",
    "Record the expected artifact publication time and the actual consumer build time.",
    "Determine whether the upstream publication completed successfully or only the source-code commit completed.",
    "Confirm whether the affected pipeline is blocked before packaging, after packaging, during artifact publication or during deployment.",
    "Determine whether the wrong artifact has only been built or has already been deployed to a test, staging or production environment.",
    "Check whether the SNAPSHOT is consumed by a release-critical application or only by a development branch.",
    "Compare the failed build with the last successful build and identify any repository, profile, settings or CI-image changes.",
    "Record the incident start time, last known-good artifact, pipeline URL and relevant repository-manager request IDs.",
    "Assess the risk of republishing, clearing caches, changing metadata or reverting to an older dependency before making changes."
  ],

  safetyChecks: [
    "Confirm the correct Git repository, branch, module and Maven working directory.",
    "Verify the exact dependency coordinates before changing versions or repository configuration.",
    "Confirm the intended repository and environment. Do not publish development snapshots into a production release repository.",
    "Check whether the repository uses a hosted snapshot repository, a release repository or a group/virtual repository.",
    "Confirm production change approval and artifact-promotion policies before changing deployment configuration.",
    "Preserve the failed build logs and repository-manager evidence before clearing local caches.",
    "Never disable TLS validation or checksum verification to make a download succeed.",
    "Do not manually edit maven-metadata.xml in a shared repository unless the repository vendor's documented recovery procedure and approval explicitly permit it.",
    "Do not copy an arbitrary JAR into a shared repository as a quick workaround.",
    "Do not delete the entire ~/.m2/repository directory as the first troubleshooting step.",
    "Do not expose repository credentials, tokens or private settings.xml contents in incident tickets.",
    "Do not assume -U forces a new deployment or publishes an upstream SNAPSHOT; it affects dependency update checks.",
    "Do not use an old cached SNAPSHOT as a production rollback without verifying its provenance, contents and approval.",
    "If the artifact has already been deployed, assess application health and deployment state independently of the Maven build result.",
    "Use a controlled, immutable release artifact for production wherever the release policy requires it."
  ],

  evidenceCollection: [
    "Capture the full Maven log from the start of dependency resolution through the final result.",
    "Record the exact SNAPSHOT coordinates and the dependency path that introduces the artifact.",
    "Record the upstream publishing pipeline URL, commit SHA, build number and publication status.",
    "Capture the repository-manager URL, repository ID, HTTP status, timestamp and request/correlation ID.",
    "Capture sanitized Maven effective settings and the relevant effective POM sections.",
    "Record mvn -version output and the Java runtime used by Maven.",
    "Record the local repository path and whether the build ran on a clean or reused workspace.",
    "Capture the relevant maven-metadata.xml from the repository when access is authorized.",
    "Record the metadata timestamp, snapshotVersions entries and the resolved timestamped artifact filename.",
    "Record artifact size, checksum and publication timestamp where the repository exposes them.",
    "Record whether the upstream publisher deployed the JAR, POM and metadata successfully.",
    "Compare the artifact checksum downloaded by the consumer with the checksum reported by the repository manager.",
    "Capture recent POM, parent POM, profile, settings.xml template and CI configuration changes.",
    "Record DNS, TLS, proxy, authentication and repository-health evidence when network or transfer errors occur.",
    "Preserve logs and evidence without exposing secrets or downloading untrusted artifacts into a production workspace."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the exact dependency and expected change",
      objective:
        "Prove which SNAPSHOT the consumer should use before troubleshooting caching.",
      commands: [
        "git rev-parse HEAD",
        "git status --short",
        "Select-String -Path .\\pom.xml -Pattern 'SNAPSHOT|payment-common|customer-api'",
        "mvn -B -ntp dependency:tree"
      ],
      interpretOutput: [
        "Replace the sample artifact names with the actual dependency.",
        "dependency:tree shows the resolved dependency graph when the dependency plugin and required artifacts are available.",
        "The dependency may be inherited from a parent POM or introduced transitively.",
        "The same artifact name in a different groupId or version is a different coordinate.",
        "A SNAPSHOT in the POM does not prove that a new artifact was published."
      ],
      nextAction: [
        "Record the exact groupId, artifactId, version and any classifier.",
        "Identify the direct or transitive path introducing the dependency.",
        "Confirm the upstream build published the expected commit and artifact.",
        "If the coordinates are wrong, correct the owning dependency declaration before investigating caches."
      ]
    },
    {
      step: 2,
      title: "Confirm Maven and Java versions",
      objective:
        "Establish which toolchain is performing dependency resolution.",
      commands: [
        "mvn -version",
        "java -version",
        "Get-Command mvn",
        "Get-Command java",
        "echo $env:JAVA_HOME"
      ],
      interpretOutput: [
        "mvn -version reports the Java runtime Maven is using.",
        "The Java executable on PATH may differ from the runtime Maven uses.",
        "Different Maven versions, user settings or CI images can cause different resolution behavior.",
        "A toolchain difference is evidence to investigate, not proof of a SNAPSHOT metadata defect."
      ],
      nextAction: [
        "Compare local and CI toolchains.",
        "Record the actual Maven local repository path and settings configuration.",
        "Reproduce the issue using the same approved toolchain as the failing pipeline."
      ]
    },
    {
      step: 3,
      title: "Inspect the effective POM and active profiles",
      objective:
        "Verify the dependency version and repository-related configuration Maven actually uses.",
      commands: [
        "mvn -B -ntp help:effective-pom -Doutput=effective-pom.xml",
        "mvn -B -ntp help:active-profiles",
        "Select-String -Path .\\effective-pom.xml -Pattern 'SNAPSHOT|repository|pluginRepository|payment-common'"
      ],
      interpretOutput: [
        "The effective POM includes inherited configuration and active-profile effects.",
        "A parent POM or active profile may supply a different version than expected.",
        "Dependency repositories and plugin repositories serve different purposes.",
        "The help plugin itself must resolve successfully; if it fails, use the original POM and approved repository diagnostics instead.",
        "Review generated files before sharing because they can expose internal repository information."
      ],
      nextAction: [
        "Confirm the actual dependency version and relevant repository declarations.",
        "Inspect dependencyManagement and profile activation.",
        "Check whether the build uses a different POM or profile in CI.",
        "Correct the owning source configuration rather than editing the generated effective POM."
      ]
    },
    {
      step: 4,
      title: "Inspect Maven settings and repository routing",
      objective:
        "Find the actual mirror, repository URL and authentication configuration.",
      commands: [
        "mvn -B -ntp help:effective-settings -Doutput=effective-settings.xml",
        "Get-Content .\\pom.xml",
        "Get-Content \"$HOME\\.m2\\settings.xml\""
      ],
      interpretOutput: [
        "A mirror may redirect requests to Nexus, Artifactory or another repository manager.",
        "A mirror with mirrorOf=* can affect both dependency and plugin repository access.",
        "A server credentials ID must match the repository or mirror ID that requires authentication.",
        "CI may inject a settings file that differs from the developer's local settings.",
        "Never print or upload an unredacted settings.xml file."
      ],
      nextAction: [
        "Identify the repository URL actually used by the build.",
        "Verify mirror selection, credentials ID and repository policy.",
        "Use approved repository-manager health checks to validate access.",
        "Do not bypass the corporate mirror without authorization."
      ]
    },
    {
      step: 5,
      title: "Check whether the upstream SNAPSHOT was published",
      objective:
        "Distinguish a consumer cache issue from an upstream deployment failure.",
      commands: [
        "Review the upstream publishing pipeline logs.",
        "Review the repository manager's artifact browse page for the exact coordinates.",
        "Check the upstream deployment result and artifact checksum."
      ],
      interpretOutput: [
        "A successful Git commit or local build does not prove repository publication succeeded.",
        "The publisher may have uploaded the JAR but failed to upload its POM or metadata.",
        "The artifact may have been published to a different repository than the consumer reads.",
        "A repository group may not include the hosted snapshot repository.",
        "An artifact visible in one repository does not prove it is available through the consumer's configured mirror."
      ],
      nextAction: [
        "Confirm the exact repository and timestamped artifact published by the upstream build.",
        "Inspect publisher logs for deployment and metadata errors.",
        "If publication failed, correct the publisher-side cause and republish through the approved pipeline.",
        "Do not attempt to fix a missing upstream artifact by repeatedly clearing the consumer cache."
      ]
    },
    {
      step: 6,
      title: "Inspect SNAPSHOT metadata",
      objective:
        "Determine which timestamped artifact the repository metadata advertises.",
      commands: [
        "Inspect the repository's maven-metadata.xml for the exact artifact version.",
        "Compare the metadata with the timestamped JAR and POM files in the same repository.",
        "Record the metadata last-modified time and the repository response."
      ],
      interpretOutput: [
        "For a timestamped SNAPSHOT, metadata can map the base version to a timestamped artifact.",
        "snapshotVersions entries may include different extensions or classifiers.",
        "The metadata may be stale, incomplete or inconsistent with the files present.",
        "Metadata can differ across hosted, proxy and group repositories.",
        "The artifact may exist even when the metadata served by the consumer's mirror does not advertise it."
      ],
      nextAction: [
        "Compare metadata at the authoritative hosted repository and the consumer-facing repository.",
        "Check whether the JAR, POM and metadata belong to the same publication.",
        "Ask the repository administrator to investigate inconsistent metadata when repository-side evidence supports that conclusion.",
        "Avoid manually rewriting shared metadata as a first-line repair."
      ]
    },
    {
      step: 7,
      title: "Force a controlled update check",
      objective:
        "Determine whether Maven's normal update policy or cached resolution state is involved.",
      commands: [
        "mvn -B -ntp -U -e clean verify"
      ],
      interpretOutput: [
        "-U requests updated SNAPSHOTs and checks for updated missing releases according to Maven's resolution behavior.",
        "If the new artifact is resolved, compare its checksum and behavior with the expected publication.",
        "If the same old artifact remains, inspect coordinates, repository routing, metadata and actual resolved files.",
        "If the request fails with a transfer error, investigate the repository or network rather than repeating -U indefinitely.",
        "-U does not publish an upstream artifact and cannot repair invalid repository metadata by itself."
      ],
      nextAction: [
        "Run this as a controlled diagnostic in the affected module or a disposable workspace.",
        "Capture the result and the artifact version or timestamp resolved.",
        "If the failure persists, continue with local cache and repository-manager diagnostics.",
        "Avoid unnecessary repeated builds against an overloaded repository service."
      ]
    },
    {
      step: 8,
      title: "Inspect the local Maven repository",
      objective:
        "Determine whether the local cache contains stale or incomplete SNAPSHOT state.",
      commands: [
        "Get-ChildItem \"$HOME\\.m2\\repository\" -Directory",
        "Get-ChildItem \"$HOME\\.m2\\repository\\com\\example\\payment-common\\2.4.0-SNAPSHOT\" -Force"
      ],
      interpretOutput: [
        "Replace the sample path with the actual groupId path, artifactId and version.",
        "Timestamped JARs, POM files, metadata and .lastUpdated markers can appear in the local version directory.",
        "The presence of an older timestamped file does not prove Maven is resolving it.",
        "A .lastUpdated file can record a previous unsuccessful transfer.",
        "The effective local repository path may differ from $HOME\\.m2\\repository."
      ],
      nextAction: [
        "Use Maven configuration and logs to confirm the local repository path.",
        "Compare local state with the authoritative repository metadata.",
        "If local corruption is supported by evidence, isolate or back up only the affected artifact/version directory.",
        "Prefer a fresh temporary local repository for a controlled comparison when sufficient disk space is available."
      ]
    },
    {
      step: 9,
      title: "Reproduce using an isolated local repository",
      objective:
        "Separate shared cache state from repository-side resolution problems.",
      commands: [
        "mvn -B -ntp -U -Dmaven.repo.local=target\\diagnostic-m2 -e clean verify"
      ],
      interpretOutput: [
        "This command uses a separate repository under target and may download many dependencies.",
        "Ensure adequate disk space and use an approved repository endpoint.",
        "If the isolated repository resolves the expected artifact while the usual local repository does not, local state becomes a stronger suspect.",
        "If both fail with the same HTTP status or missing metadata, investigate the repository, coordinates or network.",
        "The command can be expensive for a large project and is not intended to run repeatedly during an outage."
      ],
      nextAction: [
        "Compare resolved artifact timestamps and checksums.",
        "If the isolated build succeeds, repair only the affected local cache entry after preserving evidence.",
        "If it fails, collect repository and transfer evidence for the next diagnostic steps.",
        "Remove diagnostic files only after the evidence is no longer required and cleanup is approved."
      ]
    },
    {
      step: 10,
      title: "Check repository update policies",
      objective:
        "Understand when Maven checks remote metadata and artifacts again.",
      commands: [
        "Inspect repository and mirror policy in the effective settings and POM.",
        "Inspect repository-manager policies for snapshot updates and metadata caching."
      ],
      interpretOutput: [
        "Snapshot update behavior depends on repository policies and Maven's resolution state.",
        "A daily update policy can delay normal checks until the next eligible update interval.",
        "A never policy prevents automatic update checks under that repository policy.",
        "A repository manager may independently cache metadata or proxy responses.",
        "Maven client policy and repository-manager cache policy are separate layers."
      ],
      nextAction: [
        "Confirm the policy on both the client-facing repository and the authoritative hosted repository.",
        "Choose a policy appropriate to development speed and repository load.",
        "Use a controlled -U diagnostic when an immediate update check is justified.",
        "Do not set every repository to always-update without evaluating network load and build reproducibility."
      ]
    },
    {
      step: 11,
      title: "Investigate HTTP and repository-manager errors",
      objective:
        "Classify authentication, authorization, missing artifact, throttling and server failures.",
      commands: [
        "Record the exact HTTP status, repository URL, artifact coordinates and request timestamp from Maven logs.",
        "Check the approved Nexus or Artifactory health page and request logs."
      ],
      interpretOutput: [
        "401 usually indicates missing or invalid authentication.",
        "403 indicates forbidden access or a repository policy restriction.",
        "404 can indicate missing metadata, missing artifact, incorrect coordinates or an incorrect repository URL.",
        "409 can indicate a conflict or repository-specific deployment restriction; interpret it using server logs.",
        "429 can indicate rate limiting.",
        "5xx responses generally require investigation of the repository service, upstream proxy or server capacity.",
        "The exact meaning depends on the repository manager and its configuration."
      ],
      nextAction: [
        "Verify credentials and permissions using approved tools.",
        "Check whether the issue affects one artifact or all requests.",
        "Escalate repository-side errors with request IDs and timestamps.",
        "Do not disable authentication, TLS or checksum validation to get the build green."
      ]
    },
    {
      step: 12,
      title: "Check publication order and concurrent deployments",
      objective:
        "Detect races between publishers, metadata updates and consumer builds.",
      commands: [
        "Review upstream deployment timestamps and build numbers.",
        "Compare repository metadata modification times with artifact publication times.",
        "Inspect concurrent CI runs publishing the same SNAPSHOT coordinates."
      ],
      interpretOutput: [
        "Two builds publishing the same SNAPSHOT version can make the selected content difficult to reason about.",
        "A consumer may start before the upstream publication completes.",
        "A failed or interrupted publication can leave repository state that needs administrator investigation.",
        "A timestamped artifact can exist without the expected metadata being visible through every repository endpoint."
      ],
      nextAction: [
        "Ensure the upstream publication completes before triggering downstream builds.",
        "Serialize publication of shared SNAPSHOT coordinates when the repository workflow requires it.",
        "Investigate incomplete or conflicting metadata with the repository administrator.",
        "Avoid repeatedly overwriting shared snapshots as a release-management strategy."
      ]
    },
    {
      step: 13,
      title: "Check CI-specific configuration",
      objective:
        "Determine why Jenkins or another CI platform resolves a different SNAPSHOT than a developer machine.",
      commands: [
        "mvn -version",
        "git rev-parse HEAD",
        "git status --short",
        "mvn -B -ntp help:effective-pom -Doutput=effective-pom.xml"
      ],
      interpretOutput: [
        "The CI job may use a different Maven installation, JDK, settings.xml, mirror or active profile.",
        "A shared CI local repository may retain state from other jobs.",
        "The pipeline may use a different branch, module or commit than expected.",
        "A containerized agent may use an entirely different HOME directory and local repository.",
        "A successful local build is not evidence that CI used the same artifact."
      ],
      nextAction: [
        "Compare the sanitized effective configuration and toolchain.",
        "Confirm the CI commit, working directory and artifact repository.",
        "Use an isolated local repository for a controlled comparison if appropriate.",
        "Correct the pipeline configuration rather than hardcoding developer-specific paths."
      ]
    },
    {
      step: 14,
      title: "Verify the artifact actually resolved",
      objective:
        "Prove the consumer downloaded the intended content, not just a version label.",
      commands: [
        "mvn -B -ntp dependency:tree",
        "Get-ChildItem \"$HOME\\.m2\\repository\\com\\example\\payment-common\\2.4.0-SNAPSHOT\" -File",
        "Get-FileHash \"$HOME\\.m2\\repository\\com\\example\\payment-common\\2.4.0-SNAPSHOT\\payment-common-2.4.0-SNAPSHOT.jar\" -Algorithm SHA256"
      ],
      interpretOutput: [
        "The sample path and JAR filename must be replaced with the actual local artifact.",
        "A base-version SNAPSHOT file may not alone prove which timestamped artifact Maven resolved.",
        "Use Maven logs, metadata and repository records to identify the resolved timestamped artifact.",
        "Compare checksums only when both values refer to the same exact artifact bytes and algorithm.",
        "A changed checksum proves the bytes differ, not that the new artifact is correct or safe."
      ],
      nextAction: [
        "Correlate the resolved artifact with upstream publication logs and repository metadata.",
        "Validate the artifact's expected version, provenance and test results.",
        "If the artifact is correct but behavior remains old, inspect runtime classpath, packaging and deployment state.",
        "Do not assume a cache refresh fixes a code or runtime issue."
      ]
    },
    {
      step: 15,
      title: "Validate recovery and downstream behavior",
      objective:
        "Prove that the correct dependency was resolved and the application behaves as expected.",
      commands: [
        "mvn -B -ntp clean verify",
        "git diff --check",
        "git status --short"
      ],
      interpretOutput: [
        "clean verify runs the configured Maven lifecycle through verification, including the tests and gates bound in the project.",
        "git diff --check detects common whitespace errors but does not validate Maven resolution.",
        "A successful build does not prove that a deployment already running in an environment was updated.",
        "A green pipeline does not prove artifact provenance unless the published artifact is tied to the reviewed commit and build."
      ],
      nextAction: [
        "Confirm the expected SNAPSHOT was resolved and the relevant tests demonstrate the intended behavior.",
        "Confirm the artifact was built and published by the approved pipeline.",
        "Deploy through the controlled release process if deployment is required.",
        "Monitor application health and document the final root cause and preventive action."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "New SNAPSHOT is not reflected in the consumer build",
      likelyCauses: [
        "The upstream artifact was not published",
        "Stale metadata or local cache",
        "Different repository or mirror",
        "Incorrect dependency coordinates",
        "The consumer is using another transitive version"
      ],
      diagnostics: [
        "Inspect the upstream publishing job.",
        "Compare authoritative repository metadata with consumer-facing metadata.",
        "Inspect dependency:tree and effective POM.",
        "Use -U and, if justified, an isolated local repository for comparison."
      ],
      resolution: [
        "Fix upstream publication if it failed.",
        "Correct repository routing or dependency coordinates.",
        "Repair only the confirmed stale cache or repository metadata issue.",
        "Validate the exact resolved artifact and checksum."
      ]
    },
    {
      symptom: "Could not find artifact ... SNAPSHOT",
      likelyCauses: [
        "Artifact not deployed",
        "Wrong groupId, artifactId or version",
        "Wrong snapshot repository URL",
        "Repository group does not include the hosted snapshot repository",
        "Metadata missing or inconsistent"
      ],
      diagnostics: [
        "Inspect the exact artifact coordinates.",
        "Check the upstream deployment log and repository browse view.",
        "Check the consumer's effective settings and repository URL.",
        "Compare metadata and timestamped artifacts."
      ],
      resolution: [
        "Publish the intended artifact through the approved pipeline.",
        "Correct coordinates or repository routing.",
        "Have the repository administrator repair confirmed repository-side inconsistency.",
        "Rerun dependency resolution and clean verification."
      ]
    },
    {
      symptom: "Maven continues using cached or stale resolution",
      likelyCauses: [
        "Update policy interval has not elapsed",
        "Local metadata or artifact state is stale",
        "Repository manager caches metadata",
        "The build uses a shared CI cache",
        "The build is resolving a different dependency than expected"
      ],
      diagnostics: [
        "Run a controlled -U build.",
        "Inspect the exact local artifact directory.",
        "Compare normal and isolated Maven local repositories.",
        "Inspect repository-manager metadata cache behavior."
      ],
      resolution: [
        "Use a targeted update check.",
        "Repair only confirmed local cache state.",
        "Correct repository-manager caching through approved administration.",
        "Confirm the actual artifact resolved after the change."
      ]
    },
    {
      symptom: "Snapshot transfer fails with 401 or 403",
      likelyCauses: [
        "Expired credentials",
        "Incorrect settings server ID",
        "Insufficient read permissions",
        "Incorrect mirror or repository ID",
        "Repository policy denies the requested operation"
      ],
      diagnostics: [
        "Inspect the HTTP status and repository request logs.",
        "Compare sanitized effective settings.",
        "Confirm the credential source and matching ID.",
        "Verify read permission with approved repository tooling."
      ],
      resolution: [
        "Correct the secret binding or permissions.",
        "Use the approved repository endpoint.",
        "Retry after the access issue is fixed.",
        "Do not commit credentials or disable authentication."
      ]
    },
    {
      symptom: "Snapshot update fails with 429 or 5xx",
      likelyCauses: [
        "Repository throttling",
        "Repository-manager outage",
        "Upstream proxy failure",
        "Storage or capacity issue",
        "Excessive concurrent builds"
      ],
      diagnostics: [
        "Check repository service health and request logs.",
        "Compare failures across agents and artifacts.",
        "Check rate limits and repository capacity.",
        "Correlate errors with concurrent CI workloads."
      ],
      resolution: [
        "Restore repository health or reduce excessive request concurrency.",
        "Apply bounded retry/backoff only when the error is transient.",
        "Follow the approved fallback procedure if one exists.",
        "Do not use uncontrolled retry loops."
      ]
    },
    {
      symptom: "Checksum or metadata inconsistency",
      likelyCauses: [
        "Interrupted publication",
        "Repository-side metadata inconsistency",
        "Proxy cache inconsistency",
        "Artifact bytes differ from the expected publication",
        "Concurrent publishers using the same SNAPSHOT coordinates"
      ],
      diagnostics: [
        "Compare exact artifact coordinates and checksums.",
        "Review publication timestamps and server logs.",
        "Compare hosted repository and consumer-facing metadata.",
        "Check whether multiple jobs published the same coordinates."
      ],
      resolution: [
        "Stop promotion of the suspect artifact.",
        "Ask the repository administrator to investigate using documented recovery procedures.",
        "Republish through the approved pipeline if the publication is invalid and policy permits it.",
        "Validate the artifact and metadata before resuming downstream builds."
      ]
    },
    {
      symptom: "Local build works but Jenkins fails",
      likelyCauses: [
        "Different settings.xml",
        "Different Maven or JDK version",
        "Different local repository",
        "Different active profile or branch",
        "Network or credentials differences"
      ],
      diagnostics: [
        "Compare mvn -version and commit SHA.",
        "Compare sanitized effective settings and POM.",
        "Confirm the CI repository URL and agent environment.",
        "Use a temporary isolated repository for controlled comparison."
      ],
      resolution: [
        "Align approved toolchain and repository configuration.",
        "Correct secret binding or profile activation.",
        "Fix CI workspace and cache handling.",
        "Revalidate on the same agent configuration."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "Upstream publisher reports success but consumer cannot resolve the SNAPSHOT",
      investigation: [
        "Verify the publishing job's exact coordinates and target repository.",
        "Confirm both JAR and POM were deployed successfully.",
        "Inspect the timestamped artifact and version-level metadata.",
        "Confirm the consumer-facing group or virtual repository includes the hosted snapshot repository.",
        "Check whether repository permissions differ between publishing and reading."
      ],
      recovery: [
        "Correct repository routing or permissions.",
        "If publication is incomplete, follow the repository manager's documented recovery process.",
        "Rerun the consumer build only after the artifact is visible through the intended endpoint."
      ],
      prevention: [
        "Make publication success depend on the expected artifacts being available.",
        "Add a downstream smoke-resolution check for critical shared libraries.",
        "Record artifact coordinates and checksums in pipeline output."
      ]
    },
    {
      scenario: "JAR is new but the POM or metadata is stale",
      investigation: [
        "Inspect the JAR, POM and metadata in the authoritative repository.",
        "Compare timestamps and checksums with the publisher's logs.",
        "Check repository-manager metadata caching.",
        "Check whether concurrent publication caused an incomplete visible state."
      ],
      recovery: [
        "Stop downstream promotion until the repository state is understood.",
        "Use the repository administrator's supported metadata repair process.",
        "Republish only through the approved pipeline and only if allowed by repository policy.",
        "Validate resolution from the consumer endpoint."
      ],
      prevention: [
        "Avoid concurrent publishers for the same SNAPSHOT coordinates where unsafe.",
        "Add publication verification after deployment.",
        "Monitor repository metadata and artifact availability."
      ]
    },
    {
      scenario: "SNAPSHOT changes frequently and builds are not reproducible",
      investigation: [
        "Check whether multiple branches publish the same shared SNAPSHOT version.",
        "Record the timestamped artifact resolved by each CI build.",
        "Compare artifact checksums between successful and failed runs.",
        "Check whether a downstream build started before upstream publication completed."
      ],
      recovery: [
        "Coordinate publisher and consumer pipeline order.",
        "Use a distinct development version or branch-specific artifact strategy where appropriate.",
        "For production release, promote an immutable release artifact instead of relying on a moving SNAPSHOT."
      ],
      prevention: [
        "Define clear versioning and snapshot ownership rules.",
        "Record exact artifact provenance for every build.",
        "Use immutable release versions for production promotion."
      ]
    },
    {
      scenario: "Repository manager is healthy but a specific SNAPSHOT fails",
      investigation: [
        "Check exact groupId, artifactId, version, classifier and extension.",
        "Check whether the artifact exists in the repository that the consumer actually uses.",
        "Inspect permissions and repository content-selection rules.",
        "Compare the failed artifact with a known-good artifact in the same repository.",
        "Check whether the publishing job was interrupted."
      ],
      recovery: [
        "Correct the artifact coordinates or repository selection.",
        "Republish the intended artifact through the approved build if missing.",
        "Escalate a specific repository content or metadata issue with evidence."
      ],
      prevention: [
        "Validate expected artifact availability after publication.",
        "Keep repository IDs and version conventions consistent.",
        "Add tests for critical dependency-resolution paths."
      ]
    },
    {
      scenario: "The new dependency resolves but the application still behaves as before",
      investigation: [
        "Confirm the resolved dependency coordinates and timestamped artifact.",
        "Compare the downloaded artifact checksum with the upstream publication.",
        "Check the final JAR or WAR contents and runtime dependency tree.",
        "Check whether a shaded, packaged or container image contains an older library.",
        "Check whether the intended deployment actually replaced the running application."
      ],
      recovery: [
        "Rebuild and package with the correct dependency.",
        "Validate the final artifact contents and provenance.",
        "Deploy through the approved process and verify the running version.",
        "Roll back through the service runbook if the deployment causes a regression."
      ],
      prevention: [
        "Record dependency provenance in build metadata.",
        "Validate final packaged artifacts, not only the compile classpath.",
        "Expose application build/version information for operational verification."
      ]
    },
    {
      scenario: "Snapshot update causes a regression",
      investigation: [
        "Identify the exact timestamped dependency used by the failing release.",
        "Compare it with the last known-good dependency and build.",
        "Inspect source changes, tests and transitive dependency changes.",
        "Determine whether the issue is in the library or its integration."
      ],
      recovery: [
        "Stop further promotion of the suspect build.",
        "Select a known-good, approved dependency version or immutable release where available.",
        "Rebuild and test the consumer with the chosen version.",
        "If already deployed, follow the application's rollback process."
      ],
      prevention: [
        "Avoid moving SNAPSHOT dependencies in production releases.",
        "Promote immutable, verified artifacts.",
        "Add integration tests for shared-library contracts."
      ]
    },
    {
      scenario: "Multiple Jenkins jobs publish the same SNAPSHOT concurrently",
      investigation: [
        "Identify all publishing jobs and their commit SHAs.",
        "Compare publication timestamps and repository request logs.",
        "Check for overlapping writes to the same version-level metadata.",
        "Determine which artifact the consumer resolved."
      ],
      recovery: [
        "Pause conflicting publication jobs under the incident procedure.",
        "Coordinate a single approved publisher.",
        "Allow repository operations to complete and validate metadata.",
        "Re-run consumer verification after the authoritative artifact is available."
      ],
      prevention: [
        "Serialize publication for shared SNAPSHOT coordinates where required.",
        "Use unique branch-specific versions when appropriate.",
        "Prevent concurrent release promotion of unverified artifacts."
      ]
    },
    {
      scenario: "Maven fails after a repository-manager or CI configuration change",
      investigation: [
        "Compare the last successful and current repository URLs.",
        "Review mirror configuration and credential IDs.",
        "Check repository update policies and proxy behavior.",
        "Compare agent images and environment changes.",
        "Correlate the incident start with the infrastructure change."
      ],
      recovery: [
        "Restore the last known-good approved configuration if the change is confirmed responsible.",
        "Validate connectivity and artifact resolution.",
        "Re-run the original pipeline with the corrected configuration."
      ],
      prevention: [
        "Version repository and CI configuration.",
        "Test changes in a non-production pipeline.",
        "Maintain change records and a documented rollback path."
      ]
    }
  ],

  recoveryProcedures: [
    {
      situation: "The upstream SNAPSHOT was never published",
      procedure: [
        "Confirm the upstream build result and exact artifact coordinates.",
        "Inspect publication logs and repository permissions.",
        "Correct the upstream build or deployment configuration.",
        "Publish through the approved CI pipeline.",
        "Confirm the artifact and metadata are visible from the consumer-facing repository."
      ],
      validation: [
        "Confirm the expected artifact and POM exist.",
        "Check metadata and artifact checksums where available.",
        "Resolve the dependency in a clean or isolated consumer workspace.",
        "Run clean verify on the downstream project."
      ],
      rollback: [
        "If publication is invalid, stop downstream promotion.",
        "Use the repository administrator's documented correction procedure.",
        "Use a known-good dependency only when its provenance and approval are verified."
      ]
    },
    {
      situation: "The local Maven cache is confirmed stale or corrupt",
      procedure: [
        "Record the local repository path and exact affected artifact coordinates.",
        "Preserve diagnostic logs and the relevant local directory listing.",
        "Use a temporary isolated repository to verify whether the issue is local.",
        "Back up or remove only the affected artifact/version directory if the evidence supports it.",
        "Run a controlled update check against the approved repository."
      ],
      validation: [
        "Confirm the expected timestamped artifact is resolved.",
        "Compare checksums with the authoritative repository where available.",
        "Run the failing module's verification lifecycle.",
        "Confirm other dependencies remain resolvable."
      ],
      rollback: [
        "Restore the backed-up local artifact only if needed for investigation.",
        "Do not promote a suspect cached artifact.",
        "Remove the temporary diagnostic repository after retaining required evidence and confirming cleanup is safe."
      ]
    },
    {
      situation: "Repository metadata or proxy cache is inconsistent",
      procedure: [
        "Capture metadata from the authoritative repository and the consumer endpoint.",
        "Compare timestamps, snapshotVersions entries and available artifacts.",
        "Record request IDs and server timestamps.",
        "Escalate to the repository administrator.",
        "Apply only the repository vendor's documented cache or metadata repair process."
      ],
      validation: [
        "Confirm the metadata is consistent with the available artifact and POM.",
        "Resolve the SNAPSHOT from the normal consumer endpoint.",
        "Compare the resolved artifact with the intended publication.",
        "Run downstream tests before release."
      ],
      rollback: [
        "Restore the last known-good repository configuration if a change caused the inconsistency.",
        "Do not manually modify shared metadata without an approved procedure.",
        "Hold the release until artifact integrity is established."
      ]
    },
    {
      situation: "The SNAPSHOT causes a downstream application regression",
      procedure: [
        "Identify the exact dependency artifact used by the affected build.",
        "Stop promotion of the suspect artifact.",
        "Select an approved known-good version with verified provenance.",
        "Rebuild and test the consumer using the corrected dependency.",
        "Follow the normal deployment approval and rollback procedures."
      ],
      validation: [
        "Run unit, integration and contract tests.",
        "Verify the final artifact contains the intended dependency.",
        "Confirm the deployment uses the expected build and version.",
        "Monitor health checks and business-critical transactions."
      ],
      rollback: [
        "Revert to a known-good immutable dependency or application artifact where policy permits.",
        "Follow the application's deployment rollback runbook.",
        "Do not assume changing the POM restores a running service without rebuilding and redeploying."
      ]
    }
  ],

  cicdTroubleshooting: [
    "Record the upstream publishing pipeline URL, build number, commit SHA and publication result.",
    "Ensure the downstream pipeline starts only after required upstream publication validation completes.",
    "Record the exact artifact coordinates and repository endpoint in pipeline logs.",
    "Use the approved settings.xml and secret manager for repository authentication.",
    "Compare Maven and Java versions across successful and failing agents.",
    "Check whether agents share a local Maven repository and whether concurrent jobs can interfere.",
    "Use bounded retries only for verified transient network or repository failures.",
    "Do not automatically retry deterministic missing-artifact or invalid-coordinate errors indefinitely.",
    "Keep publication and consumption repositories clearly separated.",
    "Verify that hosted snapshot repositories are included in the consumer's configured repository group.",
    "Preserve sanitized effective POM, relevant metadata and dependency-resolution evidence.",
    "Do not log credentials, access tokens or secret environment-variable values.",
    "Validate checksums and artifact provenance when available.",
    "Run the full required verification lifecycle before publishing downstream release artifacts.",
    "Ensure a failed build cannot accidentally promote an artifact to production.",
    "Keep deployment, rollback and repository administration permissions appropriately separated.",
    "Monitor repository-manager errors, storage, metadata requests and upstream proxy health.",
    "Document a controlled process for investigating repository metadata inconsistencies."
  ],

  monitoringAndPrevention: [
    "Use immutable release versions for production promotion rather than moving SNAPSHOT dependencies.",
    "Define clear ownership and publication rules for shared SNAPSHOT coordinates.",
    "Pin Maven and plugin versions where reproducibility requires it.",
    "Keep Maven settings and repository configuration under controlled change management.",
    "Use a consistent CI JDK and Maven toolchain.",
    "Verify publication after the upstream deployment completes.",
    "Record artifact coordinates, commit SHA and checksum in build provenance.",
    "Monitor Nexus or Artifactory availability, storage, latency and HTTP error rates.",
    "Alert on sustained 401, 403, 429 and 5xx failures.",
    "Monitor snapshot metadata and artifact availability for critical shared libraries.",
    "Use bounded retry and backoff policies for transient failures.",
    "Avoid uncontrolled concurrent publishing of identical SNAPSHOT coordinates.",
    "Run clean verification in CI and avoid relying on undeclared local state.",
    "Use isolated repositories for diagnostic comparisons when justified.",
    "Review snapshot update policies and repository-manager caching behavior.",
    "Keep repository credentials in a secret manager.",
    "Create runbooks for missing artifacts, stale metadata, authentication failures and repository outages.",
    "Review incidents to identify recurring problems in publishing order, caching or versioning."
  ],

  incidentRunbook: [
    "1. Acknowledge the incident and identify the blocked pipeline and release.",
    "2. Confirm repository, branch, commit, module, environment and dependency coordinates.",
    "3. Determine whether any artifact has already been deployed or promoted.",
    "4. Preserve Maven logs and repository-manager evidence.",
    "5. Confirm whether the upstream SNAPSHOT publication succeeded.",
    "6. Inspect the consumer's effective POM, settings and repository routing.",
    "7. Compare authoritative repository metadata with the consumer-facing endpoint.",
    "8. Run a controlled -U update check when appropriate.",
    "9. Use an isolated local repository only when a cache comparison will help distinguish causes.",
    "10. Classify the failure as publication, metadata, cache, routing, authentication, network or incorrect coordinates.",
    "11. Obtain approval before changing shared repository configuration or production release policy.",
    "12. Apply the smallest fix supported by evidence.",
    "13. Validate the resolved artifact, provenance and checksum where available.",
    "14. Run clean verify and the required quality and security checks.",
    "15. Promote the verified artifact through the approved release process.",
    "16. Monitor downstream application behavior and follow the rollback runbook if required.",
    "17. Document root cause, evidence, corrective action, validation and prevention owners."
  ],

  handsOnLabs: [
    {
      lab: "Lab 1 — Understand SNAPSHOT metadata",
      objective:
        "Learn the relationship between a base SNAPSHOT version and timestamped artifacts.",
      steps: [
        "Create a disposable Maven library project with a version ending in -SNAPSHOT.",
        "Publish it to an approved local test repository.",
        "Inspect the version-level maven-metadata.xml generated by the repository.",
        "Publish another test iteration using the same base SNAPSHOT version.",
        "Compare metadata and timestamped artifacts."
      ],
      expectedResult:
        "You can identify the metadata entries and timestamped artifacts associated with the base SNAPSHOT version."
    },
    {
      lab: "Lab 2 — Reproduce a stale local resolution",
      objective:
        "Compare normal Maven cache behavior with a fresh diagnostic repository.",
      steps: [
        "Use a disposable library and consumer project.",
        "Publish a test SNAPSHOT version to an approved test repository.",
        "Build the consumer and record the resolved artifact.",
        "Publish a new library iteration.",
        "Compare a normal consumer build with a controlled -U build and an isolated local repository."
      ],
      expectedResult:
        "You can distinguish normal update-policy behavior from a repository or coordinate problem."
    },
    {
      lab: "Lab 3 — Diagnose a missing SNAPSHOT",
      objective:
        "Identify whether an artifact is missing from publication or merely unavailable to the consumer.",
      steps: [
        "Use an isolated test repository.",
        "Configure a consumer with an intentionally unavailable test SNAPSHOT coordinate.",
        "Run dependency resolution and record the failure.",
        "Check the upstream publication and repository metadata.",
        "Correct the coordinate or publish the intended test artifact through the approved workflow."
      ],
      expectedResult:
        "The consumer fails while the artifact is unavailable and resolves successfully after the actual cause is corrected."
    },
    {
      lab: "Lab 4 — Compare repository and mirror metadata",
      objective:
        "Understand how a repository group or proxy can present different metadata.",
      steps: [
        "Use an approved test repository setup with a hosted repository and consumer-facing group.",
        "Publish a test SNAPSHOT.",
        "Inspect the hosted repository metadata and consumer endpoint.",
        "Compare the visible artifact files and timestamps.",
        "Correct the test repository configuration if the group excludes the hosted repository."
      ],
      expectedResult:
        "You can explain the difference between authoritative hosted artifacts and the consumer-facing repository view."
    },
    {
      lab: "Lab 5 — Simulate a credentials failure",
      objective:
        "Recognize authentication failures without exposing real secrets.",
      steps: [
        "Use a disposable repository and test-only credentials.",
        "Configure an intentionally incorrect credential mapping.",
        "Attempt to resolve a test artifact.",
        "Inspect the HTTP status and repository request log.",
        "Correct the credential ID or permission in the test setup."
      ],
      expectedResult:
        "The failed request is traced to the access configuration and succeeds after the test credentials are corrected."
    },
    {
      lab: "Lab 6 — Validate artifact provenance",
      objective:
        "Confirm that a consumer resolved the intended SNAPSHOT bytes.",
      steps: [
        "Publish a test library from a known commit.",
        "Record the upstream build number and artifact checksum.",
        "Resolve the library in a disposable consumer.",
        "Compare the resolved artifact with the published artifact.",
        "Run a consumer test that exercises the expected library behavior."
      ],
      expectedResult:
        "The artifact provenance and behavior can be linked to the intended upstream publication."
    },
    {
      lab: "Lab 7 — Investigate concurrent publication",
      objective:
        "Understand risks when multiple jobs publish the same SNAPSHOT coordinates.",
      steps: [
        "Use an isolated test repository only.",
        "Run two controlled publishers using the same test SNAPSHOT coordinates.",
        "Record timestamps, publication results and metadata changes.",
        "Resolve the artifact from a separate consumer.",
        "Repeat with publication serialized."
      ],
      expectedResult:
        "You can identify publication ordering risks and explain why shared SNAPSHOT publishing needs coordination."
    },
    {
      lab: "Lab 8 — Write a production incident report",
      objective:
        "Practice evidence-based diagnosis, recovery and prevention.",
      steps: [
        "Use a simulated missing or stale SNAPSHOT incident.",
        "Record the impact, timeline, coordinates, logs and repository metadata.",
        "Identify the confirmed root cause.",
        "Document the smallest safe correction and validation results.",
        "Write prevention tasks with owners and completion criteria."
      ],
      expectedResult:
        "The report demonstrates the cause with evidence and provides an auditable recovery and prevention plan."
    }
  ],

  interviewQuestions: [
    {
      question: "1. What is a Maven SNAPSHOT?",
      answer:
        "A SNAPSHOT is a development version that may change while development continues. Maven can resolve the base SNAPSHOT version to a timestamped artifact using repository metadata."
    },
    {
      question: "2. What is the difference between a SNAPSHOT and a release version?",
      answer:
        "A SNAPSHOT can be updated during development. A release version is intended to identify a stable published artifact and should be treated as immutable according to the repository's release policy."
    },
    {
      question: "3. What is maven-metadata.xml used for with timestamped SNAPSHOTs?",
      answer:
        "It records metadata that allows Maven and repositories to map a base SNAPSHOT version to timestamped artifact versions and associated extensions or classifiers."
    },
    {
      question: "4. What does mvn -U do?",
      answer:
        "It forces Maven to check for updated SNAPSHOTs and updated missing releases according to Maven's resolution behavior. It does not publish artifacts or repair every repository issue."
    },
    {
      question: "5. Why does Maven continue using an older SNAPSHOT?",
      answer:
        "Possible reasons include update policy, local metadata, repository-manager caching, incorrect coordinates, a different mirror or a failed upstream publication. Each layer must be checked."
    },
    {
      question: "6. How do you confirm a SNAPSHOT was published?",
      answer:
        "Check the upstream deployment result, exact artifact coordinates, repository location, JAR and POM availability, metadata and publication logs."
    },
    {
      question: "7. What is a timestamped SNAPSHOT?",
      answer:
        "It is a repository artifact filename or version containing a timestamp and build number, representing a particular publication of a base SNAPSHOT version."
    },
    {
      question: "8. Why might a JAR exist but the dependency still fail to resolve?",
      answer:
        "The POM or metadata may be missing, the consumer may use a different repository, the coordinates may be wrong, or the repository group may not expose the hosted artifact."
    },
    {
      question: "9. What is the difference between a local cache issue and a repository issue?",
      answer:
        "An isolated local repository can help distinguish them. If the isolated build resolves successfully while the normal cache fails, local state is more likely. If both fail identically against the same endpoint, investigate repository, coordinates or network."
    },
    {
      question: "10. Should you delete the entire .m2 repository?",
      answer:
        "No. First identify the exact artifact and confirm local corruption. Prefer an isolated repository or a targeted repair of the affected version directory."
    },
    {
      question: "11. What causes a 401 during SNAPSHOT resolution?",
      answer:
        "It generally indicates missing or invalid authentication. Check credential provisioning and the matching repository or mirror ID."
    },
    {
      question: "12. What causes a 403?",
      answer:
        "The request is forbidden. The user may lack permission or the repository may enforce a policy that denies the requested access."
    },
    {
      question: "13. What does a 404 mean for a SNAPSHOT?",
      answer:
        "It may mean that the artifact or metadata is absent, coordinates are incorrect, or the request is going to the wrong repository endpoint."
    },
    {
      question: "14. How can Nexus or Artifactory affect SNAPSHOT updates?",
      answer:
        "Repository groups, proxy caching, hosted repository configuration, permissions and metadata handling can affect what the consumer sees."
    },
    {
      question: "15. Why can Jenkins fail while a local build succeeds?",
      answer:
        "The environments may use different settings.xml files, credentials, mirrors, Maven versions, local repositories, active profiles or network access."
    },
    {
      question: "16. What is the difference between a repository and a mirror?",
      answer:
        "A repository is a location that hosts or serves artifacts. A mirror redirects Maven repository requests to another configured endpoint."
    },
    {
      question: "17. What is the difference between snapshot update policy and repository-manager caching?",
      answer:
        "The Maven update policy controls client-side checks. A repository manager may separately cache metadata or proxy responses, so both layers can affect freshness."
    },
    {
      question: "18. Why is concurrent SNAPSHOT publishing risky?",
      answer:
        "Multiple publishers can overwrite the same base version and make metadata or selected content difficult to correlate with a specific commit. Coordinated publishing improves traceability."
    },
    {
      question: "19. How do you verify the correct SNAPSHOT was resolved?",
      answer:
        "Correlate Maven logs, metadata, timestamped artifact names, repository records and checksums. Then verify the dependency in the final package and test the expected behavior."
    },
    {
      question: "20. Does -U force the upstream project to publish a new SNAPSHOT?",
      answer:
        "No. It affects Maven's dependency update checks. The upstream project must publish the artifact separately through its approved deployment process."
    },
    {
      question: "21. How should you handle checksum errors?",
      answer:
        "Treat them as an integrity issue. Compare the exact artifact and repository records, investigate incomplete downloads or inconsistent publication, and never disable checksum validation merely to proceed."
    },
    {
      question: "22. Why are moving SNAPSHOTs risky in production?",
      answer:
        "The same declared version can resolve to different content at different times, reducing reproducibility and making rollback and provenance harder. Immutable releases are safer for production."
    },
    {
      question: "23. How do you investigate a regression after a SNAPSHOT update?",
      answer:
        "Identify the exact artifact resolved, compare it with the previous known-good artifact, run contract and integration tests, and use the approved release rollback procedure if required."
    },
    {
      question: "24. What is the safest production recovery strategy?",
      answer:
        "Confirm the cause, repair the responsible layer, verify artifact provenance and checksums, run required tests, promote only a validated artifact and monitor the deployment."
    },
    {
      question: "25. How can SNAPSHOT incidents be prevented?",
      answer:
        "Use clear version ownership, validated publication pipelines, consistent repository configuration, bounded retries, monitoring, artifact provenance and immutable release versions for production."
    },
    {
      question: "26. What should the incident report include?",
      answer:
        "Include impact, timestamps, coordinates, publisher and consumer build IDs, metadata evidence, confirmed root cause, corrective action, validation, rollback decision and preventive owners."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Affected application and module:",
    "Repository, branch and commit SHA:",
    "Upstream publishing pipeline URL:",
    "Downstream consumer pipeline URL:",
    "Environment affected:",
    "Incident start and recovery timestamps:",
    "Severity and business impact:",
    "Exact SNAPSHOT coordinates:",
    "Expected publication timestamp:",
    "Actual published artifact and checksum:",
    "Consumer-facing repository URL or ID:",
    "HTTP status and repository request ID:",
    "Relevant metadata evidence:",
    "Maven version and Java version:",
    "Local repository path and update policy:",
    "Confirmed root cause:",
    "Corrective action:",
    "Validation command and result:",
    "Artifact provenance verification:",
    "Was the artifact deployed or promoted?",
    "Rollback decision and outcome:",
    "Prevention tasks, owners and due dates:"
  ],

  officialReferences: [
    "Maven SNAPSHOT Guide: https://maven.apache.org/repositories/remote.html",
    "Maven POM Reference: https://maven.apache.org/pom.html",
    "Maven Settings Reference: https://maven.apache.org/settings.html",
    "Maven Dependency Plugin: https://maven.apache.org/plugins/maven-dependency-plugin/",
    "Maven CLI Reference: https://maven.apache.org/ref/current/maven-embedder/cli.html",
    "Maven Deploy Plugin: https://maven.apache.org/plugins/maven-deploy-plugin/",
    "Maven Repository Layout: https://maven.apache.org/repositories/layout.html",
    "Apache Maven Guides: https://maven.apache.org/guides/",
    "Sonatype Nexus Repository Documentation: https://help.sonatype.com/",
    "JFrog Artifactory Documentation: https://jfrog.com/help/r/jfrog-artifactory-documentation"
  ]
};
