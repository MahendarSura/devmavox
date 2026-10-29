export interface DependencyResolutionFailureGuide {
  title: string;
  category: string;
  severity: string;
  overview: string;
  incidentScenario: string[];
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
    likelyCause: string;
    confirmation: string;
    resolution: string;
  }[];
  recoveryProcedures: {
    scenario: string;
    steps: string[];
    validation: string[];
    rollback: string[];
  }[];
  advancedScenarios: {
    scenario: string;
    investigation: string[];
    resolution: string[];
    prevention: string[];
  }[];
  monitoringAndPrevention: string[];
  incidentRunbook: string[];
  handsOnLabs: {
    title: string;
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

export const dependencyResolutionFailureGuide: DependencyResolutionFailureGuide = {
  title: "Maven Dependency Resolution Failure — Production Troubleshooting",
  category: "Maven / Java / Build Engineering / CI-CD",
  severity: "SEV-2 or SEV-3 depending on production impact",

  overview: `
Maven dependency resolution failure occurs when Maven cannot construct a complete,
compatible dependency graph for a project or cannot obtain a required artifact.

Typical errors include:
- Could not resolve dependencies for project
- Failed to collect dependencies
- Could not find artifact
- Dependency convergence errors
- Version conflicts between transitive dependencies
- Non-resolvable parent POM
- Failed to read artifact descriptor
- No versions available for dependency
- Could not transfer artifact
- Missing artifact or invalid POM
- Snapshot metadata resolution failures
- Enforcer rule violations
- Different dependency trees on developer laptops and CI agents

Important distinction:
1. Dependency collection failure: Maven cannot build the dependency graph.
2. Dependency resolution failure: Maven knows which artifacts it needs but cannot
   obtain or use them.
3. Dependency convergence failure: Multiple dependency paths introduce different
   versions of the same artifact.
4. Compilation failure: Dependencies may resolve successfully, but source code
   cannot compile against the selected versions.
5. Runtime failure: The build may succeed while the application fails because of
   incompatible APIs, classpath conflicts, or missing runtime dependencies.

Do not immediately upgrade every dependency, delete the entire local Maven cache,
disable TLS validation, or force a production deployment. First establish the
exact failing coordinate, dependency path, repository, and environmental difference.
`,

  incidentScenario: [
    "A previously green Jenkins pipeline starts failing during mvn clean verify.",
    "The error reports that a dependency cannot be resolved after a library version was upgraded.",
    "One module builds locally but another module fails in CI.",
    "A transitive dependency introduces a newer logging, HTTP, JSON, or security library.",
    "A repository manager is reachable, but a particular artifact or POM returns an error.",
    "A new BOM or dependencyManagement entry changes the effective version selected by Maven.",
    "A deployment release is waiting because the application cannot produce a validated artifact."
  ],

  impactAssessment: [
    "Identify the affected repository, branch, commit SHA, module, environment, and pipeline run.",
    "Determine whether the failure affects one module, one branch, one repository, or all projects using the same repository manager.",
    "Check whether the failure is limited to clean builds, one CI agent, one Maven version, or all environments.",
    "Determine whether the application artifact was built, published, deployed, or partially promoted.",
    "Check whether a dependency change affects security, compatibility, licensing, or production runtime behavior.",
    "Assess release deadlines and identify the last known-good build and artifact digest.",
    "Stop promotion of unvalidated artifacts. Do not roll back a running application solely because a new build failed unless the incident requires it."
  ],

  safetyChecks: [
    "Confirm the exact repository, branch, commit SHA, module, Maven version, Java version, and target environment.",
    "Confirm the active Maven settings file and repository mirror configuration.",
    "Check whether settings.xml contains credentials or server identifiers that must remain confidential.",
    "Confirm whether the dependency or repository change has code-review and production approval.",
    "Do not print passwords, access tokens, private keys, or complete secret-bearing settings files into CI logs.",
    "Do not disable certificate verification or use insecure TLS options to bypass a repository failure.",
    "Do not use broad wildcard exclusions to suppress dependency conflicts without impact analysis.",
    "Do not blindly upgrade or downgrade a transitive dependency. Check compatibility and security advisories first.",
    "Avoid deleting the entire ~/.m2/repository cache. Preserve evidence and isolate the affected artifact directory when justified.",
    "Do not force-release a partially validated artifact. Preserve the last known-good artifact and digest."
  ],

  evidenceCollection: [
    "Record the exact Maven error, including the first failing groupId, artifactId, version, classifier, extension, and repository URL.",
    "Capture the pipeline run ID, timestamp, commit SHA, agent hostname or label, exit code, and failed Maven goal.",
    "Record mvn -version, java -version, and the relevant Maven wrapper version.",
    "Capture the POM changes, parent POM version, imported BOMs, dependencyManagement changes, exclusions, profiles, and repository definitions.",
    "Capture the relevant dependency tree and effective POM when those Maven goals can run successfully.",
    "Record whether the issue reproduces on another agent, in a clean workspace, and with the same commit.",
    "Record repository manager health, HTTP status codes, proxy details, DNS resolution, TLS errors, and relevant server-side request IDs.",
    "Preserve logs before retrying. Repeated retries may change cache state or obscure a transient repository incident.",
    "Use redacted logs and sanitized configuration snippets for incident reports."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Identify the exact failure and coordinate",
      objective:
        "Separate dependency graph failures from repository transport, compilation, and runtime errors.",
      commands: [
        "mvn -B -ntp -e clean verify",
        "mvn -B -ntp -pl <module-name> -am verify"
      ],
      interpretOutput: [
        "Could not resolve dependencies usually indicates dependency collection or artifact resolution.",
        "Could not find artifact often points to a missing coordinate, wrong repository, unavailable version, or unpublished artifact.",
        "Could not transfer artifact indicates a transport, authentication, repository, or network issue.",
        "Compilation errors after successful resolution indicate a different failure class.",
        "A reactor build may reveal that a required internal module was not built or installed."
      ],
      nextAction: [
        "Record the first meaningful Caused by section, not just the final BUILD FAILURE line.",
        "Write down the complete failing dependency coordinate and repository.",
        "Continue to repository and dependency graph checks before modifying versions."
      ]
    },
    {
      step: 2,
      title: "Verify Java, Maven, wrapper, and environment",
      objective:
        "Find toolchain differences between local development and CI.",
      commands: [
        "mvn -version",
        "java -version",
        "git rev-parse HEAD",
        "git status --short",
        "./mvnw -version"
      ],
      interpretOutput: [
        "mvn -version identifies the Maven installation and Java runtime Maven actually uses.",
        "java -version shows the Java selected by the shell, but Maven may use a different JAVA_HOME.",
        "The Maven Wrapper can pin a different Maven distribution from the globally installed Maven.",
        "Different commits or uncommitted POM changes invalidate a local-versus-CI comparison."
      ],
      nextAction: [
        "Use the repository's Maven Wrapper when the project standardizes on it.",
        "Compare JDK, Maven, wrapper distribution, profiles, environment variables, and commit SHA.",
        "Check toolchains.xml if the build selects a compiler JDK separately from the runtime."
      ]
    },
    {
      step: 3,
      title: "Inspect the dependency declaration",
      objective:
        "Confirm that the requested artifact and version are valid and intentional.",
      commands: [
        "git diff -- pom.xml",
        "git diff -- '**/pom.xml'",
        "git grep -n -E 'groupId|artifactId|version|dependencyManagement|exclusions' -- '**/pom.xml'"
      ],
      interpretOutput: [
        "A version placeholder may be undefined or overridden by a profile.",
        "A typo in groupId or artifactId can produce a valid-looking but nonexistent coordinate.",
        "A version may exist in dependencyManagement but still need an explicit dependency declaration.",
        "A dependency may be declared in a child module while the intended version is managed by the parent."
      ],
      nextAction: [
        "Compare the changed declaration with the last successful commit.",
        "Check whether the dependency is direct or transitive.",
        "Confirm the artifact exists in the intended repository before changing the POM."
      ]
    },
    {
      step: 4,
      title: "Inspect the effective POM",
      objective:
        "Discover the actual dependency versions and repository settings after inheritance and profile activation.",
      commands: [
        "mvn help:effective-pom -Doutput=effective-pom.xml",
        "mvn help:active-profiles"
      ],
      interpretOutput: [
        "The effective POM combines parent configuration, profiles, properties, and dependencyManagement.",
        "An unexpected version may come from a parent POM, imported BOM, active profile, or property override.",
        "If the Help Plugin itself cannot download, this command can fail because of the original repository problem."
      ],
      nextAction: [
        "Inspect effective-pom.xml locally and avoid publishing sensitive configuration.",
        "Compare active profiles and effective POM output between a working environment and the failing agent.",
        "If the Help Plugin cannot resolve, inspect the source POMs and Maven debug logs instead."
      ]
    },
    {
      step: 5,
      title: "Inspect the dependency tree",
      objective:
        "Find the path that introduces the failing artifact and determine which version Maven selects.",
      commands: [
        "mvn dependency:tree",
        "mvn dependency:tree -Dverbose",
        "mvn dependency:tree -Dincludes=<groupId>:<artifactId>"
      ],
      interpretOutput: [
        "A dependency tree shows direct and transitive dependency paths.",
        "Verbose output can show versions omitted because of dependency mediation.",
        "The same library may arrive through several frameworks or internal modules.",
        "The Dependency Plugin may itself be unavailable during a repository outage."
      ],
      nextAction: [
        "Identify the shortest paths from the project to the conflicting artifact.",
        "Compare the selected version against framework and vendor compatibility requirements.",
        "If the goal cannot run, inspect dependency declarations and the cached POM files, or use a working environment with the same commit."
      ]
    },
    {
      step: 6,
      title: "Understand Maven version mediation",
      objective:
        "Determine why Maven selects a version different from the one expected.",
      commands: [
        "mvn dependency:tree -Dverbose",
        "mvn help:effective-pom"
      ],
      interpretOutput: [
        "Maven generally chooses the nearest dependency definition when versions conflict.",
        "At equal depth, declaration order can influence the selected version.",
        "dependencyManagement controls versions for matching dependencies but does not automatically add every managed dependency.",
        "A BOM import can manage a family of related library versions.",
        "Maven selecting a version does not prove that the selected version is binary-compatible."
      ],
      nextAction: [
        "Use a deliberate dependencyManagement entry or compatible BOM when centralizing versions.",
        "Validate that the selected version is supported by the parent framework.",
        "Run tests for API compatibility, serialization, logging, security, and runtime linkage."
      ]
    },
    {
      step: 7,
      title: "Validate direct and transitive dependency paths",
      objective:
        "Distinguish a broken direct dependency from a failure introduced by another library.",
      commands: [
        "mvn dependency:tree -Dverbose",
        "mvn dependency:analyze"
      ],
      interpretOutput: [
        "A direct dependency is declared by the current project.",
        "A transitive dependency is introduced by another dependency.",
        "A dependency may be present at compile time but absent from the runtime classpath.",
        "dependency:analyze can report false positives for reflection, generated code, or framework-managed usage."
      ],
      nextAction: [
        "Identify which dependency path introduces the failing artifact.",
        "Add an exclusion only at the relevant dependency edge when it is technically justified.",
        "If the application uses reflection or framework scanning, manually verify any dependency reported as unused."
      ]
    },
    {
      step: 8,
      title: "Check parent POM and imported BOM resolution",
      objective:
        "Identify inheritance or dependency-management failures before investigating child dependencies.",
      commands: [
        "mvn -B -ntp validate",
        "mvn help:effective-pom"
      ],
      interpretOutput: [
        "Non-resolvable parent POM indicates that Maven cannot load a required parent model.",
        "An imported BOM may be missing, incorrectly versioned, or unavailable from configured repositories.",
        "relativePath can cause Maven to look for a local parent POM before resolving it remotely.",
        "A child module may inherit dependency versions from a parent that changed unexpectedly."
      ],
      nextAction: [
        "Verify parent groupId, artifactId, version, and relativePath.",
        "Verify that the intended parent POM or BOM was published and is accessible.",
        "Restore the last known-good parent or BOM version if a confirmed incompatible change caused the incident."
      ]
    },
    {
      step: 9,
      title: "Check repository configuration and mirrors",
      objective:
        "Ensure Maven is querying the intended repository rather than an incorrect or unavailable endpoint.",
      commands: [
        "mvn -X -B -ntp validate",
        "mvn help:effective-settings -Doutput=effective-settings.xml"
      ],
      interpretOutput: [
        "A mirrorOf setting may redirect all repository requests to Nexus or Artifactory.",
        "An internal repository may not proxy Maven Central or may not contain the internal artifact.",
        "An unexpected URL may come from parent POMs, profiles, settings.xml, or repository-manager policy.",
        "Debug logs can contain sensitive URLs or configuration details; redact before sharing."
      ],
      nextAction: [
        "Confirm the intended mirror and repository IDs.",
        "Verify proxy and group-repository membership with the repository administrator.",
        "Do not bypass an organization's approved repository manager without authorization."
      ]
    },
    {
      step: 10,
      title: "Validate credentials and authorization",
      objective:
        "Distinguish missing credentials from insufficient repository permissions.",
      commands: [
        "mvn -B -ntp -X validate"
      ],
      interpretOutput: [
        "HTTP 401 commonly indicates missing or invalid authentication.",
        "HTTP 403 commonly indicates denied authorization or repository policy.",
        "The repository ID used by the POM or mirror must match the relevant server ID in settings.xml.",
        "Credentials may work locally but be missing or expired in the CI credential store."
      ],
      nextAction: [
        "Check the server ID, credential binding, token expiry, and repository permissions.",
        "Use the CI platform's secret store rather than hardcoding credentials.",
        "Rotate a compromised token and review audit logs when exposure is suspected.",
        "Never paste unredacted settings.xml or debug logs into tickets."
      ]
    },
    {
      step: 11,
      title: "Inspect repository and network response",
      objective:
        "Determine whether the failure is caused by DNS, proxy, TLS, throttling, or repository availability.",
      commands: [
        "nslookup <repository-host>",
        "curl -I https://<repository-host>/<repository-path>",
        "curl -v https://<repository-host>/<repository-path>"
      ],
      interpretOutput: [
        "DNS failures indicate a name-resolution problem.",
        "Connection timeouts can indicate firewall, routing, proxy, or server availability problems.",
        "HTTP 429 suggests rate limiting or throttling.",
        "HTTP 5xx suggests a repository, proxy, or upstream server problem.",
        "HTTP 200 from a repository root does not prove that the specific artifact and POM are accessible.",
        "A HEAD request may be unsupported; use an authorized GET request to verify the exact artifact when necessary."
      ],
      nextAction: [
        "Test the exact artifact URL and compare results from a working machine and CI agent.",
        "Check proxy variables, firewall rules, DNS records, and repository service health.",
        "Use bounded retries only for confirmed transient failures.",
        "Do not expose authentication headers or tokens while collecting verbose network output."
      ]
    },
    {
      step: 12,
      title: "Investigate dependency convergence",
      objective:
        "Identify conflicting versions of the same artifact introduced by different dependency paths.",
      commands: [
        "mvn dependency:tree -Dverbose",
        "mvn enforcer:enforce"
      ],
      interpretOutput: [
        "A convergence rule can fail when multiple paths request different versions.",
        "A convergence failure may be a policy violation even when Maven could otherwise select one version.",
        "The Enforcer Plugin may not run if its own artifacts cannot be resolved."
      ],
      nextAction: [
        "Use a compatible BOM or dependencyManagement entry to establish a consistent version.",
        "Inspect framework compatibility and known breaking changes.",
        "Exclude a transitive dependency only when another compatible version is intentionally supplied.",
        "Do not disable convergence rules merely to make the pipeline green."
      ]
    },
    {
      step: 13,
      title: "Check exclusions and optional dependencies",
      objective:
        "Determine whether a required transitive dependency was removed or is not being included.",
      commands: [
        "mvn dependency:tree -Dverbose",
        "git diff -- pom.xml"
      ],
      interpretOutput: [
        "An exclusion applies to a specific dependency edge, not globally to every path.",
        "A library can still appear through another path after one exclusion is added.",
        "Optional dependencies are not automatically propagated to downstream consumers in the same way as normal transitive dependencies."
      ],
      nextAction: [
        "Trace every path that introduces the library.",
        "Remove an accidental exclusion or add an explicit compatible dependency when required.",
        "Run unit, integration, packaging, and runtime smoke tests."
      ]
    },
    {
      step: 14,
      title: "Investigate classifiers, packaging, and artifact coordinates",
      objective:
        "Confirm that Maven is requesting the correct artifact variant.",
      commands: [
        "mvn -B -ntp -e validate",
        "mvn -X -B -ntp validate"
      ],
      interpretOutput: [
        "An artifact may publish a main JAR, sources JAR, tests JAR, native classifier, or platform-specific variant.",
        "A wrong classifier, type, extension, or version can produce a missing-artifact error.",
        "The POM may exist while a requested classified artifact was never published."
      ],
      nextAction: [
        "Verify the coordinates against the artifact publisher's metadata.",
        "Remove an unnecessary classifier or publish the intended artifact variant.",
        "Check whether the dependency should be a JAR, POM, WAR, or another supported type."
      ]
    },
    {
      step: 15,
      title: "Inspect local Maven cache safely",
      objective:
        "Find incomplete or stale cached metadata without destroying useful evidence.",
      commands: [
        "mvn -version",
        "mvn -B -ntp -U -pl <module-name> -am verify"
      ],
      interpretOutput: [
        "Maven stores downloaded artifacts and metadata in the local repository, normally ~/.m2/repository.",
        "A failed transfer can leave marker files or cached failure information.",
        "-U requests checks for updated snapshots and missing releases, but it is not a universal cache reset.",
        "A successful clean-cache build can indicate cache inconsistency, but does not prove the remote repository is healthy."
      ],
      nextAction: [
        "Capture the original error before retrying.",
        "Retry the exact build with -U when stale metadata is a plausible cause.",
        "If corruption is confirmed, isolate and back up the specific artifact directory before removing only the affected cached files.",
        "Avoid deleting the entire local repository unless an approved, evidence-based recovery plan requires it."
      ]
    },
    {
      step: 16,
      title: "Investigate snapshots and mutable metadata",
      objective:
        "Determine whether timestamped snapshots or metadata are inconsistent.",
      commands: [
        "mvn -U -B -ntp -pl <module-name> -am verify",
        "mvn -X -B -ntp verify"
      ],
      interpretOutput: [
        "Snapshot coordinates can resolve through metadata to timestamped artifacts.",
        "A repository may have stale metadata or an incomplete snapshot publication.",
        "A locally cached snapshot can differ from the latest remote snapshot."
      ],
      nextAction: [
        "Check snapshot repository policy and metadata consistency.",
        "Republish the snapshot correctly if the publisher created an incomplete publication.",
        "Prefer immutable release versions for production releases.",
        "Do not assume -U fixes an incorrectly published artifact."
      ]
    },
    {
      step: 17,
      title: "Inspect multi-module reactor order",
      objective:
        "Find internal dependencies that are missing, incorrectly versioned, or built out of order.",
      commands: [
        "mvn -pl <module-name> -am verify",
        "mvn -pl <module-name> -amd verify"
      ],
      interpretOutput: [
        "-am also builds required projects in the reactor.",
        "-amd selects projects that depend on the specified project.",
        "A module may fail when built alone if its sibling artifact was never installed or published.",
        "Different module versions can cause Maven to look for an artifact that does not exist."
      ],
      nextAction: [
        "Confirm the reactor contains all required modules.",
        "Check internal artifact versions and parent-child relationships.",
        "Use the correct module selector and reactor build order.",
        "Avoid relying on an unrelated developer's local Maven cache."
      ]
    },
    {
      step: 18,
      title: "Compare local and CI dependency graphs",
      objective:
        "Identify environment-dependent dependency selection or repository behavior.",
      commands: [
        "mvn -version",
        "mvn help:active-profiles",
        "mvn dependency:tree -Dverbose"
      ],
      interpretOutput: [
        "Different active profiles can change dependencies and repository configuration.",
        "Different JDKs or Maven versions may change plugin behavior or build compatibility.",
        "Different settings.xml files can select different mirrors and credentials.",
        "A warm local cache can hide a repository outage or missing publication."
      ],
      nextAction: [
        "Compare the same commit, Maven Wrapper, JDK, profiles, and sanitized settings.",
        "Run a clean, isolated CI build when feasible.",
        "Check whether dependency versions are pinned or depend on mutable snapshots or ranges.",
        "Do not treat a successful laptop build as proof that the CI environment is correctly configured."
      ]
    },
    {
      step: 19,
      title: "Check dependency and plugin repository separation",
      objective:
        "Find cases where application dependencies resolve but build plugins do not.",
      commands: [
        "mvn -X -B -ntp validate",
        "mvn -B -ntp clean verify"
      ],
      interpretOutput: [
        "Maven build plugins and project dependencies may be obtained through different effective configuration paths.",
        "A plugin prefix or plugin version may fail even when application dependencies resolve.",
        "A plugin repository can be missing from a mirror or blocked by repository policy."
      ],
      nextAction: [
        "Identify whether the failing coordinate belongs to a build plugin or a project dependency.",
        "Pin supported plugin versions in pluginManagement when appropriate.",
        "Verify repository-manager proxy and allowlist policies for plugin artifacts.",
        "Avoid changing dependencyManagement to fix a plugin-resolution error unless the actual coordinates justify it."
      ]
    },
    {
      step: 20,
      title: "Validate the proposed dependency fix",
      objective:
        "Ensure the correction fixes resolution without introducing incompatible versions.",
      commands: [
        "mvn -B -ntp -pl <module-name> -am validate",
        "mvn -B -ntp -pl <module-name> -am test",
        "mvn -B -ntp clean verify"
      ],
      interpretOutput: [
        "validate checks project structure and configuration but does not prove the entire application works.",
        "test executes configured tests, while verify runs lifecycle phases up to verification.",
        "A successful build does not automatically establish runtime compatibility or security compliance."
      ],
      nextAction: [
        "Run the focused module first, then the full reactor build.",
        "Run integration tests and application smoke tests where applicable.",
        "Review the final dependency tree and generated artifact.",
        "Verify license, vulnerability, and compatibility policies before release."
      ]
    },
    {
      step: 21,
      title: "Recover the pipeline and preserve rollback options",
      objective:
        "Restore a trustworthy build and prevent an unverified artifact from reaching production.",
      commands: [
        "git diff --check",
        "git status --short",
        "mvn -B -ntp clean verify"
      ],
      interpretOutput: [
        "A clean build validates the current workspace rather than relying only on previously generated outputs.",
        "A passing build must still correspond to the intended commit and approved dependency versions.",
        "A successful rerun should be linked to its artifact digest and pipeline run."
      ],
      nextAction: [
        "Publish the artifact only after required quality and security checks pass.",
        "Promote the verified artifact through the normal release process.",
        "If the change remains unsafe, revert the specific dependency change or restore the last known-good dependency set.",
        "Document the root cause, recovery, and prevention work."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Could not find artifact",
      likelyCause: "Incorrect coordinates, unavailable version, missing publication, or wrong repository.",
      confirmation: "Check the exact groupId, artifactId, version, classifier, extension, and artifact URL.",
      resolution: "Correct the coordinates, publish the artifact, or configure the authorized repository that contains it."
    },
    {
      symptom: "Failed to collect dependencies",
      likelyCause: "An invalid or unavailable transitive dependency, parent POM, or dependency descriptor.",
      confirmation: "Inspect the first failing dependency path and its POM descriptor.",
      resolution: "Fix the originating dependency declaration, parent, BOM, or publication."
    },
    {
      symptom: "Different version selected than expected",
      likelyCause: "Nearest-definition mediation, dependencyManagement, BOM import, or active profile.",
      confirmation: "Inspect the effective POM and verbose dependency tree.",
      resolution: "Centralize the compatible version and validate affected consumers."
    },
    {
      symptom: "Dependency convergence rule fails",
      likelyCause: "Different paths request different versions of the same artifact.",
      confirmation: "Use dependency:tree -Dverbose and identify all paths.",
      resolution: "Use a compatible BOM or dependencyManagement entry and test for binary compatibility."
    },
    {
      symptom: "Non-resolvable parent POM",
      likelyCause: "Wrong parent coordinates, invalid relativePath, unavailable repository, or authentication failure.",
      confirmation: "Check the parent POM path, effective repositories, and repository response.",
      resolution: "Correct the parent coordinates or relativePath and restore authorized repository access."
    },
    {
      symptom: "HTTP 401",
      likelyCause: "Missing, invalid, or expired credentials.",
      confirmation: "Compare the repository ID with the matching server ID in settings.xml and inspect credential binding.",
      resolution: "Restore the approved credential binding or rotate the expired token."
    },
    {
      symptom: "HTTP 403",
      likelyCause: "Insufficient permissions, repository policy, or access restrictions.",
      confirmation: "Review repository permissions and server-side audit logs.",
      resolution: "Request the required least-privilege permission or correct the repository policy."
    },
    {
      symptom: "HTTP 404 for a dependency",
      likelyCause: "Artifact is unpublished, coordinates are incorrect, or the repository does not proxy the required location.",
      confirmation: "Check the exact artifact and POM URL and verify publication status.",
      resolution: "Publish the correct artifact or correct the repository routing and coordinates."
    },
    {
      symptom: "HTTP 429",
      likelyCause: "Repository throttling or excessive parallel requests.",
      confirmation: "Check server response headers, repository logs, and concurrent build activity.",
      resolution: "Use bounded retries, caching, and approved concurrency limits."
    },
    {
      symptom: "PKIX path building failed",
      likelyCause: "Untrusted certificate chain, missing CA certificate, or TLS interception.",
      confirmation: "Inspect the certificate chain and Java truststore used by Maven.",
      resolution: "Install the approved CA certificate or correct the server certificate chain."
    },
    {
      symptom: "Works locally but fails in CI",
      likelyCause: "Different JDK, Maven version, profile, settings, credentials, or local cache.",
      confirmation: "Compare tool versions, commit SHA, effective configuration, and repository access.",
      resolution: "Standardize the wrapper, toolchain, profile activation, and CI secret configuration."
    },
    {
      symptom: "Snapshot dependency is stale or missing",
      likelyCause: "Stale metadata or incomplete snapshot publication.",
      confirmation: "Inspect snapshot metadata and timestamped artifact availability.",
      resolution: "Correct publication and metadata; use -U for appropriate update checks."
    },
    {
      symptom: "Build passes but runtime throws NoSuchMethodError",
      likelyCause: "Binary-incompatible library versions or runtime classpath conflict.",
      confirmation: "Inspect the selected dependency tree and the packaged runtime libraries.",
      resolution: "Align compatible versions and run integration and runtime smoke tests."
    },
    {
      symptom: "Internal module dependency cannot be found",
      likelyCause: "Missing reactor module, incorrect version, or unpublished internal artifact.",
      confirmation: "Inspect reactor membership and run the build with -am.",
      resolution: "Correct module relationships or publish the required internal artifact."
    },
    {
      symptom: "Plugin cannot be resolved",
      likelyCause: "Plugin repository configuration, unavailable plugin version, or mirror policy.",
      confirmation: "Inspect the failing plugin coordinates and debug output.",
      resolution: "Configure the approved plugin repository and pin a supported plugin version."
    },
    {
      symptom: "Checksum validation failure",
      likelyCause: "Corrupt transfer, inconsistent publication, or repository integrity issue.",
      confirmation: "Compare artifact checksum with trusted publisher or repository metadata.",
      resolution: "Re-download after investigation and repair the publication or repository cache if corruption is confirmed."
    }
  ],

  recoveryProcedures: [
    {
      scenario: "A transitive dependency introduces an incompatible version",
      steps: [
        "Capture the failing dependency tree and identify the path that introduces the version.",
        "Confirm the version required by the framework and the supported compatibility range.",
        "Prefer an approved BOM or dependencyManagement entry to align the dependency family.",
        "Use a targeted exclusion only when the alternative dependency is explicitly supplied and supported.",
        "Review the POM diff before committing."
      ],
      validation: [
        "Run the focused module build and complete reactor build.",
        "Inspect the resulting dependency tree.",
        "Run unit tests, integration tests, packaging tests, and relevant runtime smoke tests.",
        "Run vulnerability and license checks."
      ],
      rollback: [
        "Revert the specific dependency or BOM change if validation fails.",
        "Restore the last known-good dependency set.",
        "Do not promote an artifact whose dependency graph has not passed required checks."
      ]
    },
    {
      scenario: "The repository manager returns 401 or 403",
      steps: [
        "Identify the repository ID and exact artifact URL.",
        "Compare the repository ID with the server entry configured in settings.xml.",
        "Check CI secret availability, token expiry, and repository permissions.",
        "Ask the repository administrator to review access logs.",
        "Restore the approved least-privilege credential or policy."
      ],
      validation: [
        "Retry the exact failed resolution.",
        "Verify that the intended artifact and its POM can be retrieved.",
        "Confirm that no credentials were exposed in pipeline logs."
      ],
      rollback: [
        "Revoke exposed credentials immediately.",
        "Restore the last approved repository configuration if an unauthorized change caused the issue.",
        "Hold release promotion until access and artifact integrity are confirmed."
      ]
    },
    {
      scenario: "A stale or corrupt local artifact is suspected",
      steps: [
        "Save the complete failure log and identify the affected coordinate.",
        "Confirm whether the same artifact resolves from a clean, isolated workspace.",
        "Retry with -U when stale update metadata is a plausible cause.",
        "If corruption is confirmed, back up and isolate only the affected artifact directory.",
        "Check the repository copy and checksum before retrying the build."
      ],
      validation: [
        "Resolve the specific dependency again.",
        "Run the original failing Maven goal.",
        "Compare the artifact checksum and the dependency tree."
      ],
      rollback: [
        "Restore the isolated cache directory if the recovery worsens the situation.",
        "Do not remove the entire Maven local repository as an initial action.",
        "Keep the previous verified build artifact available."
      ]
    },
    {
      scenario: "A dependency update breaks CI or runtime compatibility",
      steps: [
        "Identify the commit that introduced the version change.",
        "Compare the previous and current dependency trees.",
        "Check the upstream compatibility matrix and release notes.",
        "Revert or pin the last known-good compatible version when appropriate.",
        "Add regression tests for the failure mode."
      ],
      validation: [
        "Run a clean build using the standard Maven Wrapper and JDK.",
        "Run relevant integration and application startup tests.",
        "Inspect packaged libraries and run security checks.",
        "Verify the artifact digest before release promotion."
      ],
      rollback: [
        "Revert the targeted dependency update.",
        "Redeploy the previously approved artifact if a deployment has already occurred and rollback is approved.",
        "Preserve the failed build and incident evidence for follow-up."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "Dependency works in one module but fails in another",
      investigation: [
        "Compare both modules' effective POMs and active profiles.",
        "Inspect their parent POMs and imported BOM versions.",
        "Check reactor order, module version alignment, and repository definitions.",
        "Compare dependency scopes and exclusions."
      ],
      resolution: [
        "Correct the parent or BOM configuration at the appropriate level.",
        "Build required modules with -am where applicable.",
        "Ensure internal artifacts use consistent versions."
      ],
      prevention: [
        "Use a common parent POM and approved BOM.",
        "Add multi-module CI verification.",
        "Review dependency-management changes across all affected modules."
      ]
    },
    {
      scenario: "A framework upgrade causes NoSuchMethodError or ClassNotFoundException",
      investigation: [
        "Capture the exact missing class or method and the failing runtime stack trace.",
        "Inspect the resolved dependency tree and packaged application libraries.",
        "Check whether different versions of the same library are selected by different dependency paths.",
        "Review framework compatibility documentation."
      ],
      resolution: [
        "Align the dependency family to a supported version set.",
        "Remove accidental duplicate or incompatible runtime libraries.",
        "Rebuild and test the packaged artifact, not just the source module."
      ],
      prevention: [
        "Use supported BOMs and version constraints.",
        "Add application startup and integration tests.",
        "Inspect dependency convergence and vulnerability reports during CI."
      ]
    },
    {
      scenario: "Nexus or Artifactory has inconsistent artifact metadata",
      investigation: [
        "Capture the exact artifact URL, HTTP response, timestamp, and repository request ID.",
        "Check whether the POM and binary are both present.",
        "Inspect snapshot metadata or the repository's cached proxy state.",
        "Compare the artifact checksum with the trusted publisher."
      ],
      resolution: [
        "Ask the repository administrator to repair the affected cached artifact or metadata using the supported procedure.",
        "Republish an incomplete internal artifact through the approved publishing pipeline.",
        "Avoid manual changes to repository storage without administrator approval."
      ],
      prevention: [
        "Monitor repository health, storage capacity, proxy failures, and upstream latency.",
        "Use immutable release artifacts.",
        "Add publication verification before consumers depend on a new release."
      ]
    },
    {
      scenario: "Maven Central throttling or intermittent network failure",
      investigation: [
        "Correlate HTTP 429 or 5xx responses with pipeline start times and concurrent builds.",
        "Compare repository response from multiple authorized agents.",
        "Check proxy, DNS, firewall, and repository manager metrics.",
        "Distinguish transient transport failures from an actually unpublished artifact."
      ],
      resolution: [
        "Use the organization's approved repository manager and caching proxy.",
        "Apply bounded retries with backoff where supported.",
        "Reduce excessive parallel downloads if the evidence shows request saturation."
      ],
      prevention: [
        "Cache approved dependencies through a managed repository proxy.",
        "Alert on error rate, latency, throttling, and cache failures.",
        "Avoid infinite retry loops that overload an unhealthy repository."
      ]
    },
    {
      scenario: "A new dependency introduces a security vulnerability",
      investigation: [
        "Identify the vulnerable coordinate and all dependency paths.",
        "Determine whether the dependency is used at runtime, test time, or build time.",
        "Review the advisory, affected versions, exploitability, and vendor fix guidance.",
        "Check whether a transitive dependency brings in the vulnerable version."
      ],
      resolution: [
        "Upgrade to a supported fixed version or compatible BOM.",
        "Use a targeted exclusion only when the replacement is valid and tested.",
        "Escalate if no safe compatible version is available."
      ],
      prevention: [
        "Run dependency vulnerability scanning in CI.",
        "Generate and retain a software bill of materials where required.",
        "Set remediation SLAs and block releases according to risk policy."
      ]
    },
    {
      scenario: "Build fails after a release repository cleanup",
      investigation: [
        "Identify whether the missing coordinate is a release, snapshot, parent POM, or plugin.",
        "Check repository retention and cleanup policies.",
        "Verify whether a required internal artifact was removed or never promoted.",
        "Check downstream projects that still reference the artifact."
      ],
      resolution: [
        "Restore the artifact through the approved repository recovery process if available.",
        "Publish a corrected release using the organization's versioning policy.",
        "Update consumers only after compatibility is confirmed."
      ],
      prevention: [
        "Protect release repositories with retention rules.",
        "Audit artifact deletion and promotion events.",
        "Avoid overwriting released versions with different content."
      ]
    },
    {
      scenario: "Build succeeds on a warm cache but fails on a fresh CI agent",
      investigation: [
        "Compare the local cache with the actual configured repositories.",
        "Check whether an internal dependency was installed locally but never published.",
        "Check whether a snapshot, mutable version range, or unpinned plugin is involved.",
        "Reproduce in an isolated workspace with the same commit."
      ],
      resolution: [
        "Publish required artifacts to the approved repository.",
        "Replace mutable or ambiguous version declarations with approved fixed versions.",
        "Correct repository and mirror configuration."
      ],
      prevention: [
        "Test clean builds regularly.",
        "Do not depend on manually installed artifacts in developer workstations.",
        "Pin plugin versions and standardize the Maven Wrapper."
      ]
    }
  ],

  monitoringAndPrevention: [
    "Standardize Java and Maven versions using the Maven Wrapper and documented toolchains.",
    "Use a controlled Nexus or Artifactory repository manager where the organization requires it.",
    "Monitor repository availability, HTTP errors, upstream latency, throttling, disk capacity, and cache hit ratio.",
    "Pin Maven plugin versions and manage dependency versions through a supported parent POM or BOM.",
    "Use dependency convergence rules where appropriate, but investigate exceptions instead of blindly suppressing them.",
    "Run unit, integration, packaging, and application startup tests after dependency upgrades.",
    "Scan dependencies for known vulnerabilities and maintain a software bill of materials when required.",
    "Avoid mutable dependency versions for production release builds.",
    "Use checksums and repository integrity controls to detect corrupt or inconsistent artifacts.",
    "Keep CI secrets in the platform's credential store and use least-privilege repository access.",
    "Add bounded retries for transient repository failures; do not hide persistent failures with unlimited retries.",
    "Test builds on clean agents so cached dependencies do not conceal missing publications.",
    "Retain build logs, commit SHA, dependency reports, artifact digests, and release provenance.",
    "Use dependency update pull requests with compatibility tests and code review.",
    "Document the owner and escalation path for internal libraries and repository-manager incidents."
  ],

  incidentRunbook: [
    "1. Acknowledge the build or release incident and record the pipeline URL and timestamp.",
    "2. Identify the exact failed Maven goal, module, artifact coordinate, and first causal error.",
    "3. Freeze release promotion if the intended artifact cannot be validated.",
    "4. Verify the commit, JDK, Maven Wrapper, profiles, and effective repository configuration.",
    "5. Inspect the dependency tree and determine whether the failure is graph-related or transport-related.",
    "6. Check parent POMs, BOMs, version mediation, exclusions, classifiers, and internal artifact publication.",
    "7. Check repository health, authentication, authorization, network, TLS, and metadata.",
    "8. Apply the smallest evidence-supported correction.",
    "9. Run focused validation, complete reactor verification, and required security checks.",
    "10. Verify the produced artifact and digest, then follow normal approval and promotion procedures.",
    "11. If validation fails, revert the targeted change or retain the last known-good artifact.",
    "12. Record the root cause, recovery, timeline, impact, and preventive action owners."
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Reproduce an invalid dependency coordinate",
      objective: "Understand how Maven reports an unavailable dependency.",
      steps: [
        "Create a disposable branch or test project.",
        "Use a deliberately invalid artifact version in that test project only.",
        "Run mvn -B -ntp validate or the appropriate dependency-resolution goal.",
        "Record the failing coordinate and repository response.",
        "Restore the valid coordinate and rerun the build."
      ],
      expectedResult:
        "The learner identifies the exact missing coordinate and distinguishes a bad version from a repository outage."
    },
    {
      title: "Lab 2 — Trace a transitive dependency",
      objective: "Find which dependency introduces a library.",
      steps: [
        "Choose a project with multiple direct dependencies.",
        "Run mvn dependency:tree -Dverbose.",
        "Inspect the paths to a chosen transitive library.",
        "Compare the selected version with the versions requested by each path.",
        "Document a compatible dependency-management correction in a test branch."
      ],
      expectedResult:
        "The learner can explain the dependency path and Maven's selected version."
    },
    {
      title: "Lab 3 — Demonstrate dependency convergence",
      objective: "Understand why multiple paths can introduce different versions.",
      steps: [
        "Use an isolated test project with two libraries that request different versions of a shared dependency.",
        "Inspect the dependency tree.",
        "Run an approved Enforcer convergence rule if the plugin is available.",
        "Align versions through a compatible BOM or dependencyManagement entry.",
        "Run tests and inspect the final dependency tree."
      ],
      expectedResult:
        "The learner resolves a version-policy conflict without simply disabling the rule."
    },
    {
      title: "Lab 4 — Compare effective POMs",
      objective: "Identify profile and parent inheritance differences.",
      steps: [
        "Generate effective-pom.xml in two controlled environments.",
        "Compare active profiles, properties, dependencyManagement, and repository configuration.",
        "Find the first unexpected version difference.",
        "Correct the intended configuration in a test branch.",
        "Regenerate and compare the effective POM."
      ],
      expectedResult:
        "The learner identifies which inherited setting or profile changes dependency selection."
    },
    {
      title: "Lab 5 — Simulate local cache differences",
      objective: "Understand why warm caches can hide dependency publication problems.",
      steps: [
        "Use a disposable project and isolated Maven local repository.",
        "Build the project once with a valid, published dependency.",
        "Use a controlled test coordinate that is unavailable from the configured repository.",
        "Compare warm-cache and isolated-cache behavior.",
        "Restore the valid configuration and rerun the build."
      ],
      expectedResult:
        "The learner understands cache effects without deleting the normal developer cache."
    },
    {
      title: "Lab 6 — Diagnose a repository authentication failure",
      objective: "Differentiate authentication problems from missing artifacts.",
      steps: [
        "Use an authorized test repository and a temporary test credential.",
        "Run a dependency resolution with the correct server ID.",
        "Repeat using an intentionally invalid test credential.",
        "Compare the sanitized error responses and repository logs.",
        "Restore the valid credential through the approved secret store."
      ],
      expectedResult:
        "The learner recognizes authentication failure and avoids exposing credentials."
    },
    {
      title: "Lab 7 — Reproduce a multi-module resolution issue",
      objective: "Understand reactor builds and internal module relationships.",
      steps: [
        "Use a disposable multi-module Maven project.",
        "Make one module depend on another internal module.",
        "Run the dependent module without building its required module.",
        "Run the appropriate build with -pl and -am.",
        "Compare the results and document the reactor relationship."
      ],
      expectedResult:
        "The learner explains why a reactor build can resolve an internal module that is unavailable from the local or remote repository."
    },
    {
      title: "Lab 8 — Create a CI dependency validation stage",
      objective: "Build a repeatable dependency-resolution gate.",
      steps: [
        "Create a test pipeline that checks out a fixed commit.",
        "Select the project Maven Wrapper and approved JDK.",
        "Run dependency resolution, tests, and the full verification lifecycle.",
        "Publish sanitized dependency reports and logs.",
        "Ensure release promotion depends on successful required checks."
      ],
      expectedResult:
        "The learner creates a repeatable CI validation stage with traceable build evidence."
    }
  ],

  interviewQuestions: [
    {
      question: "1. What is Maven dependency resolution?",
      answer:
        "It is the process of building the project's dependency graph, selecting versions, and obtaining the required artifact files and metadata."
    },
    {
      question: "2. What is the difference between dependency collection and dependency resolution?",
      answer:
        "Collection builds the dependency graph and reads dependency descriptors. Resolution obtains the required artifacts and related data. Errors can overlap, so inspect the first causal exception."
    },
    {
      question: "3. What is a transitive dependency?",
      answer:
        "A dependency introduced through another dependency rather than declared directly in the current project."
    },
    {
      question: "4. How does Maven choose between conflicting versions?",
      answer:
        "Maven generally uses nearest-definition mediation; at equal depth, declaration order can matter. dependencyManagement can establish an intentional managed version."
    },
    {
      question: "5. What is dependencyManagement?",
      answer:
        "It defines managed dependency attributes, especially versions, for matching dependencies. It does not automatically add every dependency listed there."
    },
    {
      question: "6. What is a BOM?",
      answer:
        "A Bill of Materials is a POM that centrally manages a compatible set of dependency versions, commonly imported through dependencyManagement."
    },
    {
      question: "7. How do you find which dependency introduced a library?",
      answer:
        "Run mvn dependency:tree -Dverbose and inspect the paths to the artifact. If the plugin cannot resolve, inspect the POMs and cached descriptors or use a working diagnostic environment."
    },
    {
      question: "8. Why does a build work locally but fail in Jenkins?",
      answer:
        "Possible causes include different Java or Maven versions, profiles, settings.xml, credentials, repository access, commit state, and local cache contents."
    },
    {
      question: "9. What does HTTP 401 mean for Maven?",
      answer:
        "It commonly indicates missing, invalid, or expired credentials. Check the repository ID, server configuration, and CI secret binding."
    },
    {
      question: "10. What does HTTP 403 mean?",
      answer:
        "It commonly indicates denied access or a repository policy restriction. Check authorization and server-side audit logs."
    },
    {
      question: "11. What is the purpose of settings.xml?",
      answer:
        "It configures Maven user or machine settings such as mirrors, servers, proxies, profiles, and local repository behavior. Credentials must be protected."
    },
    {
      question: "12. What does mirrorOf do?",
      answer:
        "It specifies which repositories a mirror replaces. A broad mirror can redirect dependency requests to an internal repository manager."
    },
    {
      question: "13. How do you troubleshoot a missing artifact?",
      answer:
        "Verify coordinates, version, classifier, repository URL, publication status, authentication, and whether the repository proxies the required upstream."
    },
    {
      question: "14. What is dependency convergence?",
      answer:
        "It is a policy that checks whether different dependency paths request inconsistent versions of the same artifact. It can be enforced with suitable Maven Enforcer rules."
    },
    {
      question: "15. Should you exclude every conflicting dependency?",
      answer:
        "No. Exclusions are scoped to dependency edges and can remove required runtime classes. Confirm the dependency paths, supply a compatible alternative, and test the result."
    },
    {
      question: "16. What does -U do?",
      answer:
        "It asks Maven to check for updated snapshots and missing releases. It can help with stale metadata but cannot repair an unpublished artifact or broken repository."
    },
    {
      question: "17. Why should you avoid deleting the entire .m2 repository?",
      answer:
        "It destroys useful cached artifacts, increases download load, wastes time, and may remove evidence. Investigate first and isolate only the affected cache entries when justified."
    },
    {
      question: "18. What is a non-resolvable parent POM?",
      answer:
        "Maven cannot load the required parent model. Check its coordinates, relativePath, repository access, authentication, and publication."
    },
    {
      question: "19. What causes NoSuchMethodError after a successful build?",
      answer:
        "A runtime classpath may contain a binary-incompatible version or conflicting libraries even though compilation and dependency resolution succeeded."
    },
    {
      question: "20. How do you troubleshoot a SNAPSHOT dependency?",
      answer:
        "Inspect repository policy, snapshot metadata, timestamped artifact availability, and cached state. Use -U where appropriate and correct incomplete publication."
    },
    {
      question: "21. What is the difference between a project dependency and a Maven plugin?",
      answer:
        "Project dependencies are used by the application or tests. Maven plugins execute build tasks and have their own coordinates and resolution requirements."
    },
    {
      question: "22. How do you troubleshoot a TLS certificate error?",
      answer:
        "Inspect the certificate chain and truststore used by the Java runtime running Maven. Install the approved CA or correct the server chain instead of disabling certificate validation."
    },
    {
      question: "23. Why can a dependency tree command fail during an incident?",
      answer:
        "The Dependency Plugin itself may need to be downloaded. If it cannot resolve, use the original debug logs, POM declarations, cached descriptors, or a working controlled environment."
    },
    {
      question: "24. What is the purpose of the Maven Wrapper?",
      answer:
        "It standardizes the Maven distribution used by a project and reduces differences between developer workstations and CI agents."
    },
    {
      question: "25. How do you safely recover a dependency incident?",
      answer:
        "Capture evidence, identify the precise cause, apply the smallest correction, run focused and full verification, inspect the final dependency graph, and preserve rollback options."
    },
    {
      question: "26. What is the role of Nexus or Artifactory?",
      answer:
        "They can proxy remote repositories, host internal artifacts, cache dependencies, enforce repository policies, and provide access and audit controls."
    },
    {
      question: "27. How do you prevent dependency supply-chain risks?",
      answer:
        "Use approved repositories, immutable releases, checksums, vulnerability scanning, version governance, access controls, and artifact provenance."
    },
    {
      question: "28. What should you include in an incident report?",
      answer:
        "Impact, timeline, failed coordinate, root cause, evidence, fix, validation, rollback decision, affected releases, and preventive actions with owners."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Date and time detected:",
    "Affected repository and module:",
    "Affected branch and commit SHA:",
    "Environment and CI pipeline run:",
    "Java version / Maven Wrapper version:",
    "Failed Maven goal:",
    "Failing dependency coordinate:",
    "Repository URL and HTTP response:",
    "Customer or release impact:",
    "Severity and incident owner:",
    "Evidence collected:",
    "Root cause confirmed by:",
    "Corrective change and reviewer:",
    "Validation commands and results:",
    "Artifact version and digest:",
    "Rollback or recovery decision:",
    "Security and supply-chain assessment:",
    "Preventive actions, owners, and deadlines:"
  ],

  officialReferences: [
    "Maven dependency mechanism: https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html",
    "Maven dependency tree goal: https://maven.apache.org/plugins/maven-dependency-plugin/tree-mojo.html",
    "Maven dependency management: https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html#dependency-management",
    "Maven settings reference: https://maven.apache.org/settings.html",
    "Maven POM reference: https://maven.apache.org/pom.html",
    "Maven Enforcer Plugin: https://maven.apache.org/enforcer/maven-enforcer-plugin/",
    "Maven Wrapper: https://maven.apache.org/wrapper/",
    "Maven repository layout: https://maven.apache.org/repositories/layout.html",
    "Maven lifecycle reference: https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html",
    "OWASP Dependency-Check: https://owasp.org/www-project-dependency-check/"
  ]
};
