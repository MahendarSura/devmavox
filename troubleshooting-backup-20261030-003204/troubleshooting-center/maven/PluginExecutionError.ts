export interface PluginExecutionErrorGuide {
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
  pluginFailureMatrix: {
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
  ciCdTroubleshooting: string[];
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

export const pluginExecutionErrorGuide: PluginExecutionErrorGuide = {
  title: "Maven PluginExecutionError — Real-World Production Troubleshooting",
  category: "Maven, Java Build Engineering, CI/CD and Release Reliability",
  severity:
    "SEV-2 or SEV-3 depending on release impact. Escalate to SEV-1 only when the failure causes a major production outage or similarly critical business impact.",

  overview: `
A Maven PluginExecutionError means a Maven plugin goal failed while Maven was
executing a build lifecycle or an explicitly invoked goal.

Examples:
- maven-compiler-plugin:compile fails.
- maven-surefire-plugin:test fails.
- maven-failsafe-plugin:integration-test fails.
- maven-resources-plugin:resources fails.
- maven-clean-plugin:clean fails.
- maven-jar-plugin:jar fails.
- maven-war-plugin:war fails.
- maven-dependency-plugin:copy-dependencies fails.
- maven-checkstyle-plugin:check fails.
- jacoco-maven-plugin:report fails.
- maven-antrun-plugin:run fails.
- SonarQube analysis fails during sonar:sonar.

Important distinction:
A Maven plugin execution failure is the visible failure category, not necessarily
the actual root cause.

The actual root cause may be:
1. Java compilation errors.
2. Failed unit or integration tests.
3. Incorrect plugin configuration.
4. Incompatible Maven, JDK or plugin versions.
5. Missing plugin dependencies.
6. Repository authentication or network problems.
7. Incorrect working directory or module configuration.
8. Filesystem permissions or disk exhaustion.
9. Memory exhaustion or JVM crashes.
10. Quality-gate violations.
11. Environment-specific configuration.
12. External services, test containers or database failures.

Production rule:
Identify the first meaningful failure in the logs. Do not automatically assume
that the last ERROR line is the root cause.
`,

  incidentScenario: `
INCIDENT: A production release pipeline that worked yesterday suddenly fails
during Maven package execution.

Example log:

[INFO] --- maven-compiler-plugin:3.13.0:compile (default-compile) @ payment-service ---
[ERROR] Failed to execute goal
org.apache.maven.plugins:maven-compiler-plugin:3.13.0:compile
Compilation failure

A different pipeline may report:

[ERROR] Failed to execute goal
org.apache.maven.plugins:maven-surefire-plugin:3.5.2:test
There are test failures.

Another pipeline may show:

[ERROR] Plugin org.apache.maven.plugins:maven-war-plugin:3.4.0
or one of its dependencies could not be resolved.

These are three different incidents:
- Compiler failure: investigate source code, generated sources and JDK settings.
- Test failure: investigate assertions, test reports and test environment.
- Plugin resolution failure: investigate repositories, network, authentication
  and plugin dependency availability.

The on-call engineer must identify the failed goal, affected module, first
underlying exception, recent changes, business impact and safe recovery path.

Do not rerun a production deployment blindly. A build failure can occur after
an earlier pipeline stage has already changed infrastructure or deployed another
component.
`,

  impactAssessment: [
    "Confirm whether the failure affects local development, one CI agent, one repository, one module, one environment or every release pipeline.",
    "Identify the failed Maven project, module, plugin artifact, plugin version, goal and execution ID.",
    "Check whether the build failed during validate, compile, test, package, verify, install, deploy or a custom goal.",
    "Determine whether the artifact was created, whether it passed verification and whether it was published to the artifact repository.",
    "Determine whether a deployment stage already ran before the Maven failure.",
    "Check whether the release is blocking a security patch, critical defect fix, customer delivery or scheduled deployment.",
    "Check whether the last successful build used the same commit, JDK, Maven version, plugin version and CI image.",
    "Check whether the problem affects every branch or only a particular commit.",
    "Determine whether the failure is deterministic or intermittent.",
    "Record the incident start time, last successful build, build URL, commit SHA, environment and release owner.",
    "Assign severity using organizational incident policy and business impact rather than the log level alone."
  ],

  safetyChecks: [
    "Confirm the correct Git repository, branch, commit SHA and working directory before running Maven commands.",
    "Confirm the correct module and environment. A command executed from the wrong directory may build a different project.",
    "Review pending Git changes before changing pom.xml, Maven settings or plugin versions.",
    "Inspect the effective POM before overriding inherited plugin configuration.",
    "Confirm that the selected JDK is approved for the application and deployment platform.",
    "Check production change approval requirements before deploying, modifying repositories or changing release configuration.",
    "Do not print passwords, access tokens, private keys, complete credential files or secret environment variables in logs.",
    "Redact credentials from Maven debug output before sharing it with others.",
    "Do not disable tests, Checkstyle, SpotBugs, security scans or quality gates merely to make a build green.",
    "Do not delete the entire local Maven repository as the first troubleshooting action.",
    "Do not change a shared plugin version without assessing all affected projects and running regression tests.",
    "Do not use -U, -X, -DskipTests or -Dmaven.test.skip=true as generic fixes. Each has a specific effect and should be used only when justified.",
    "Do not publish a failed, incomplete or unverified artifact to a production repository.",
    "Before changing shared CI agents, repository-manager configuration or production deployment settings, capture evidence and obtain required approval.",
    "Preserve the original logs and failed build reports before cleaning temporary files."
  ],

  evidenceCollection: [
    "Capture the complete Maven console log from the start of the build through the final BUILD FAILURE.",
    "Record the first plugin failure, failed goal, execution ID, module name and full exception chain.",
    "Capture mvn -version output and the actual Java executable used by the build.",
    "Record the Maven command, active profiles and non-secret build parameters.",
    "Record the Git commit, branch, changed files and recent merges.",
    "Collect the effective POM for the affected module.",
    "Collect relevant sections of the parent POM and child module POM.",
    "Collect Maven Surefire or Failsafe reports if tests were involved.",
    "Record the CI agent name, container image, operating system, architecture and workspace path.",
    "Record the plugin and dependency versions used by the last successful build.",
    "Capture relevant repository-manager status, HTTP response codes and request timestamps.",
    "Record disk space, available memory, process limits and filesystem permissions when relevant.",
    "Check whether a generated source file, test fixture, configuration file or environment variable is missing.",
    "Compare the failed build with the last successful build without exposing secrets.",
    "Store evidence in the incident ticket with timestamps and redacted logs."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Identify the first real failure",
      objective:
        "Determine the plugin, goal and underlying exception instead of guessing from the final error.",
      commands: [
        "mvn -B -ntp clean verify",
        "mvn -B -ntp -e verify",
        "Select-String -Path .\\build.log -Pattern 'Failed to execute goal|Caused by:|BUILD FAILURE|Compilation failure|There are test failures|OutOfMemoryError'"
      ],
      interpretOutput: [
        "Failed to execute goal identifies the plugin coordinate and goal that Maven could not complete.",
        "Caused by may reveal the underlying compiler error, assertion failure, missing artifact, permission problem or external service error.",
        "BUILD FAILURE is a summary, not the root cause.",
        "If the first failed goal is compile, later package and test goals may never execute.",
        "If the first failed goal is a quality gate, the application may compile successfully but still be correctly blocked."
      ],
      nextAction: [
        "Record the plugin groupId, artifactId, version, goal, execution ID and module.",
        "Read upward from the first failure and correlate the exception with the plugin's execution.",
        "Use the targeted diagnostic step below that matches the failure category.",
        "Avoid repeating a clean build if deleting outputs would destroy useful evidence."
      ]
    },
    {
      step: 2,
      title: "Confirm the working directory and Maven project",
      objective:
        "Make sure the build is running against the intended project and module.",
      commands: [
        "Get-Location",
        "Get-ChildItem -Force",
        "git status --short",
        "git rev-parse --show-toplevel",
        "git rev-parse HEAD",
        "mvn -B -ntp -N help:evaluate -Dexpression=project.artifactId -DforceStdout"
      ],
      interpretOutput: [
        "The current directory should be the intended repository or Maven module.",
        "git rev-parse --show-toplevel identifies the Git repository root.",
        "A wrong module or missing pom.xml may cause unexpected plugin configuration or lifecycle behavior.",
        "The help:evaluate command depends on Maven's help plugin being resolvable; its failure alone does not prove the application POM is invalid."
      ],
      nextAction: [
        "Change to the intended directory or explicitly select the correct POM with -f.",
        "For a multi-module project, verify that the expected module is included in the reactor.",
        "Do not change the POM until the working directory and module are confirmed."
      ]
    },
    {
      step: 3,
      title: "Verify Maven, Java and toolchain versions",
      objective:
        "Detect a JDK mismatch, unexpected Maven installation or changed CI image.",
      commands: [
        "mvn -version",
        "java -version",
        "javac -version",
        "Get-Command mvn",
        "Get-Command java",
        "echo $env:JAVA_HOME"
      ],
      interpretOutput: [
        "mvn -version reports the Java runtime Maven itself is using.",
        "java -version reports the Java executable found on PATH, which may not be the same executable Maven uses.",
        "A compiler toolchain can select a different JDK from the one running Maven.",
        "A plugin can require a newer Java runtime even when the application source targets an older Java release.",
        "A CI image update can change the default JDK without any source-code change."
      ],
      nextAction: [
        "Compare actual runtime, compiler toolchain and project requirements.",
        "Check maven.compiler.release, source, target, toolchains.xml and CI configuration.",
        "Use an approved compatible JDK and repeat the targeted build.",
        "Do not downgrade Java blindly; check plugin and dependency compatibility first."
      ]
    },
    {
      step: 4,
      title: "Inspect the exact failed plugin execution",
      objective:
        "Locate the plugin configuration inherited from parent POMs and profiles.",
      commands: [
        "mvn -B -ntp help:effective-pom -Doutput=effective-pom.xml",
        "Select-String -Path .\\effective-pom.xml -Pattern 'maven-compiler-plugin|maven-surefire-plugin|maven-failsafe-plugin|maven-war-plugin|maven-jar-plugin|checkstyle|jacoco|spotbugs'",
        "mvn -B -ntp help:active-profiles"
      ],
      interpretOutput: [
        "The effective POM includes inherited and profile-specific configuration.",
        "A plugin may be configured in the parent POM, pluginManagement, a child module or an active profile.",
        "pluginManagement can define versions and configuration but does not by itself execute every plugin.",
        "The effective POM command can fail if the help plugin or its dependencies cannot be resolved."
      ],
      nextAction: [
        "Find the actual plugin configuration used by the failing module.",
        "Compare plugin versions, executions, goals, configuration and active profiles.",
        "Correct the source POM or profile that owns the incorrect setting rather than editing generated effective-pom.xml.",
        "Do not share effective POM output without checking for sensitive configuration."
      ]
    },
    {
      step: 5,
      title: "Separate compilation errors from plugin errors",
      objective:
        "Determine whether the compiler plugin failed because the Java source cannot compile.",
      commands: [
        "mvn -B -ntp -pl :payment-service -DskipTests compile",
        "mvn -B -ntp -pl :payment-service -DskipTests -e compile"
      ],
      interpretOutput: [
        "Replace payment-service with the actual module artifactId.",
        "A cannot find symbol error often means a missing import, dependency, generated source or incorrect API version.",
        "A package does not exist error can indicate a missing dependency or generated-source issue.",
        "An unsupported release error usually indicates a JDK/compiler configuration mismatch.",
        "An annotation processing error may involve Lombok, MapStruct or another processor.",
        "If the module depends on sibling modules, use -am when required to build upstream reactor modules."
      ],
      nextAction: [
        "Fix the first compiler diagnostic, not every cascading error.",
        "Check generated sources, annotation processors, module dependency versions and compiler release settings.",
        "Re-run compilation and then the full verification lifecycle.",
        "Remember that -DskipTests skips test execution, not compilation of production source; test compilation behavior depends on the lifecycle and plugin configuration."
      ]
    },
    {
      step: 6,
      title: "Investigate unit-test execution failures",
      objective:
        "Separate application test failures from test-runner or test-environment failures.",
      commands: [
        "mvn -B -ntp test",
        "Get-ChildItem -Recurse -File -Filter 'TEST-*.xml'",
        "Get-ChildItem -Recurse -File -Filter '*.dump'",
        "Get-ChildItem -Recurse -File -Filter '*.dumpstream'"
      ],
      interpretOutput: [
        "Assertion failures indicate a test expectation did not match actual behavior.",
        "No tests executed can indicate discovery patterns, provider configuration, test naming or test framework mismatch.",
        "Forked JVM termination may indicate memory pressure, a native crash, System.exit or a test-runner issue.",
        "Flaky tests may depend on timing, shared state, test order, ports or external services.",
        "Reports commonly appear under target/surefire-reports, but custom configuration can change the directory."
      ],
      nextAction: [
        "Read the failing test report and stack trace.",
        "Reproduce the specific test or test class using the configured Surefire provider.",
        "Check test discovery, dependency versions, test fixtures and environment-dependent assumptions.",
        "Fix the test or application defect; do not silently suppress failing tests."
      ]
    },
    {
      step: 7,
      title: "Investigate integration-test failures",
      objective:
        "Find failures caused by databases, APIs, containers, test fixtures or environment dependencies.",
      commands: [
        "mvn -B -ntp verify",
        "Get-ChildItem -Recurse -File -Filter 'TEST-*.xml'",
        "Get-ChildItem Env: | Where-Object { $_.Name -match 'CI|JAVA|MAVEN|TEST|PROFILE' } | Select-Object Name"
      ],
      interpretOutput: [
        "Failsafe commonly runs integration-test and verify goals; the exact lifecycle depends on the POM.",
        "Connection refused suggests the target service is not listening or the endpoint/port is wrong.",
        "Authentication failures can indicate missing or expired test credentials.",
        "Container startup failures can result from unavailable container runtimes, registry access or insufficient resources.",
        "Environment-variable names can be collected, but secret values must not be printed."
      ],
      nextAction: [
        "Inspect Failsafe reports and the earliest failed integration test.",
        "Check service readiness, DNS, network policy, credentials and test data.",
        "Use approved test environments and synthetic data.",
        "Repeat integration tests after restoring dependencies and confirm the verify phase succeeds."
      ]
    },
    {
      step: 8,
      title: "Investigate plugin and plugin-dependency resolution",
      objective:
        "Determine whether Maven cannot download the plugin or one of its own dependencies.",
      commands: [
        "mvn -B -ntp -e validate",
        "mvn -B -ntp -U -e validate",
        "mvn -B -ntp help:effective-settings -Doutput=effective-settings.xml"
      ],
      interpretOutput: [
        "Could not resolve plugin or PluginResolutionException indicates a plugin resolution problem.",
        "Could not transfer artifact may indicate DNS, proxy, TLS, authentication, authorization or repository availability.",
        "A 401 usually indicates missing or invalid authentication; a 403 indicates access is forbidden.",
        "A 404 may mean the requested artifact/version is unavailable from that repository, or that the repository URL/path is wrong.",
        "A 429 or 5xx response can indicate rate limiting or a repository-side problem.",
        "-U forces Maven to check for updated snapshots and missing releases according to repository policies; it does not repair a broken repository or an invalid plugin version.",
        "Effective settings can reveal mirrors and profiles but must be checked for sensitive information."
      ],
      nextAction: [
        "Check the exact artifact coordinates, configured mirror and repository-manager health.",
        "Verify credentials are associated with the matching repository or mirror ID.",
        "Check proxy and TLS configuration.",
        "Use -U only when stale update metadata or cached missing-artifact state is a plausible cause.",
        "Escalate repository-side failures with timestamps, artifact coordinates and HTTP status."
      ]
    },
    {
      step: 9,
      title: "Check Maven settings, mirrors and credentials safely",
      objective:
        "Identify incorrect repository routing or authentication configuration.",
      commands: [
        "mvn -B -ntp help:effective-settings -Doutput=effective-settings.xml",
        "Get-Content .\\pom.xml",
        "Get-Content \"$HOME\\.m2\\settings.xml\""
      ],
      interpretOutput: [
        "A mirror with mirrorOf=* can route dependency and plugin requests through a repository manager.",
        "A server credentials ID must match the repository or mirror ID used for authentication.",
        "A profile may define pluginRepositories separately from repositories.",
        "A settings file may be injected by CI and differ from the local user settings.",
        "Do not paste settings.xml into public logs or tickets; it can contain credentials or internal infrastructure details."
      ],
      nextAction: [
        "Compare the repository ID, mirror ID, URL and credentials source.",
        "Validate access using the organization's approved repository health check.",
        "Use the CI secret manager to correct credentials rather than hardcoding them into a POM.",
        "Do not bypass an approved corporate mirror without authorization."
      ]
    },
    {
      step: 10,
      title: "Diagnose corrupted or stale local repository state",
      objective:
        "Test whether a cached artifact or plugin download is incomplete or marked unavailable.",
      commands: [
        "mvn -B -ntp -U -e validate",
        "Get-ChildItem \"$HOME\\.m2\\repository\\org\\apache\\maven\\plugins\" -Directory"
      ],
      interpretOutput: [
        "A .lastUpdated file may indicate a previous failed download.",
        "Checksum errors can indicate an incomplete download, repository inconsistency or artifact integrity issue.",
        "A local cache issue is more likely when the same exact artifact resolves successfully on another clean agent.",
        "A cache issue is less likely when all agents fail with the same repository HTTP status."
      ],
      nextAction: [
        "Identify the exact plugin artifact directory and version involved.",
        "If evidence supports local corruption, back up or remove only that specific artifact/version cache directory and retry.",
        "Prefer a clean, isolated Maven local repository for diagnosis when disk space permits.",
        "Do not delete the entire shared cache or change repository checksum policy to hide an integrity problem."
      ]
    },
    {
      step: 11,
      title: "Investigate resources and generated files",
      objective:
        "Detect missing configuration files, filtering failures and generated-source issues.",
      commands: [
        "mvn -B -ntp process-resources",
        "Get-ChildItem -Recurse -File .\\src",
        "Get-ChildItem -Recurse -File .\\target"
      ],
      interpretOutput: [
        "A missing resource may be caused by an incorrect resources directory, filename case, profile or packaging configuration.",
        "Filtering can change placeholders or produce unexpected configuration values.",
        "Generated source files may be produced by annotation processors or code-generation plugins.",
        "A clean build can remove stale generated files that previously masked a missing generation step."
      ],
      nextAction: [
        "Verify resource declarations, filtering delimiters and profile activation.",
        "Confirm the generation plugin executes before compilation.",
        "Compare case-sensitive path behavior between Windows and Linux CI agents.",
        "Avoid manually editing generated files as a permanent fix."
      ]
    },
    {
      step: 12,
      title: "Investigate packaging failures",
      objective:
        "Identify why JAR, WAR, shaded or assembly artifacts cannot be created.",
      commands: [
        "mvn -B -ntp -DskipTests package",
        "Get-ChildItem -Recurse -File -Path .\\target",
        "Get-PSDrive"
      ],
      interpretOutput: [
        "Duplicate files, invalid archive configuration or missing main-class metadata may break packaging.",
        "Disk exhaustion can prevent archive creation or temporary-file writes.",
        "Shade or assembly configuration may conflict with service descriptors, signatures or dependency inclusion.",
        "The target directory may contain a partial artifact even when packaging fails."
      ],
      nextAction: [
        "Inspect the first packaging exception and plugin configuration.",
        "Check disk space and write permissions.",
        "Verify manifest entries, archive filters and duplicate-resource handling.",
        "Treat an artifact from a failed build as untrusted until the complete build and validation succeed."
      ]
    },
    {
      step: 13,
      title: "Check filesystem permissions and disk space",
      objective:
        "Identify failures caused by read-only workspaces, file locks or exhausted storage.",
      commands: [
        "Get-PSDrive",
        "Get-Item .\\target | Format-List FullName,Attributes",
        "Get-ChildItem .\\target -Force",
        "whoami"
      ],
      interpretOutput: [
        "Access denied can indicate filesystem permissions, file ownership or endpoint protection.",
        "A full disk or exhausted container ephemeral storage can cause writes and archive creation to fail.",
        "Files locked by another process can prevent cleanup or replacement.",
        "Windows and Linux agents may differ in path case sensitivity and file locking."
      ],
      nextAction: [
        "Confirm the agent identity and workspace ownership.",
        "Free space only through approved cleanup of disposable files.",
        "Stop conflicting processes only after identifying their owner and impact.",
        "Do not recursively change permissions on shared workspaces as a quick fix."
      ]
    },
    {
      step: 14,
      title: "Diagnose memory exhaustion and JVM crashes",
      objective:
        "Separate Java heap failures, native memory pressure and forked test JVM crashes.",
      commands: [
        "mvn -version",
        "Get-Process java -ErrorAction SilentlyContinue | Select-Object Id,CPU,WorkingSet64,Path",
        "Get-ChildItem -Recurse -File -Filter 'hs_err_pid*.log'",
        "Get-ChildItem -Recurse -File -Filter '*.dump'"
      ],
      interpretOutput: [
        "Java heap space indicates heap exhaustion in the affected JVM.",
        "GC overhead limit exceeded indicates the JVM spends excessive time reclaiming memory.",
        "Native memory allocation failures can occur even when Java heap settings appear reasonable.",
        "Forked JVM crashes may be caused by native libraries, container limits or external process termination.",
        "Increasing -Xmx without checking the container memory limit can make the incident worse."
      ],
      nextAction: [
        "Identify whether the Maven JVM, compiler fork or test fork failed.",
        "Check container memory limits, heap settings, process count and GC evidence.",
        "Capture a heap dump only when storage, privacy and operational impact are understood.",
        "Tune memory based on measured demand and the available container or host memory."
      ]
    },
    {
      step: 15,
      title: "Investigate Checkstyle, SpotBugs and static-analysis failures",
      objective:
        "Determine whether a quality plugin failed operationally or correctly detected violations.",
      commands: [
        "mvn -B -ntp checkstyle:check",
        "mvn -B -ntp spotbugs:check"
      ],
      interpretOutput: [
        "A rule violation is different from a plugin execution error caused by a missing rules file or incompatible plugin dependency.",
        "A missing configuration file can result from an incorrect path or inactive profile.",
        "A new plugin version may change default rules or analysis behavior.",
        "An operational failure can arise from memory pressure, missing bytecode or incompatible Java versions."
      ],
      nextAction: [
        "Identify whether the failure is a quality violation or an execution/runtime problem.",
        "Review the exact rule, source location and approved project baseline.",
        "Fix genuine violations or obtain an approved, documented exception where policy permits.",
        "Do not disable the quality gate solely to pass a release."
      ]
    },
    {
      step: 16,
      title: "Investigate JaCoCo and coverage-gate failures",
      objective:
        "Separate missing coverage data from a genuine coverage threshold failure.",
      commands: [
        "mvn -B -ntp verify",
        "Get-ChildItem -Recurse -File -Filter 'jacoco.exec'",
        "Get-ChildItem -Recurse -File -Filter 'jacoco.xml'"
      ],
      interpretOutput: [
        "A missing execution-data file may mean tests did not run, the agent was not attached or the output path differs.",
        "A report-generation failure can indicate mismatched class files, missing data or plugin configuration.",
        "A coverage threshold failure means measured coverage is below policy; it is not automatically a JaCoCo runtime defect.",
        "Multi-module builds may require aggregation configuration."
      ],
      nextAction: [
        "Check the prepare-agent and report executions and their phase bindings.",
        "Confirm test execution, report paths and class-file consistency.",
        "Check aggregate report configuration for multi-module projects.",
        "Add meaningful tests rather than manipulating thresholds without approval."
      ]
    },
    {
      step: 17,
      title: "Investigate SonarQube and quality-gate failures",
      objective:
        "Identify whether analysis failed during scanner execution or the server-side quality gate.",
      commands: [
        "mvn -B -ntp verify",
        "mvn -B -ntp sonar:sonar"
      ],
      interpretOutput: [
        "Scanner startup errors may indicate authentication, server connectivity or Java compatibility problems.",
        "A quality-gate failure can indicate coverage, duplication, reliability or security conditions.",
        "A successful scanner upload does not necessarily mean the quality gate passed.",
        "Scanner logs may contain internal URLs or sensitive project details."
      ],
      nextAction: [
        "Inspect the analysis task and quality-gate result in the approved SonarQube instance.",
        "Check server availability, token validity and scanner compatibility.",
        "Address the actual gate condition or follow the formal exception process.",
        "Never put tokens directly into committed POM files or shell history."
      ]
    },
    {
      step: 18,
      title: "Investigate multi-module reactor failures",
      objective:
        "Identify missing upstream builds, module ordering problems or partial reactor failures.",
      commands: [
        "mvn -B -ntp validate",
        "mvn -B -ntp -pl :payment-service -am verify"
      ],
      interpretOutput: [
        "-pl selects projects in the reactor.",
        "-am also builds required projects in the reactor.",
        "A sibling dependency may be missing if the selected module relies on an artifact that has not been installed or included in the reactor.",
        "Reactor summaries show which modules succeeded, failed or were skipped."
      ],
      nextAction: [
        "Read the reactor summary and identify the first failed module.",
        "Confirm parent and sibling module coordinates and versions.",
        "Use -pl and -am to reproduce the relevant dependency path.",
        "Do not assume that a downstream skipped module has an independent defect."
      ]
    },
    {
      step: 19,
      title: "Check Maven lifecycle and goal ordering",
      objective:
        "Determine whether a plugin runs at the correct phase and has the required inputs.",
      commands: [
        "mvn -B -ntp validate",
        "mvn -B -ntp compile",
        "mvn -B -ntp test",
        "mvn -B -ntp package",
        "mvn -B -ntp verify"
      ],
      interpretOutput: [
        "validate, compile, test, package and verify execute progressively more of the default lifecycle.",
        "A plugin goal invoked directly may not run earlier lifecycle steps automatically.",
        "A custom execution bound to the wrong phase may run before its input files exist.",
        "A successful package does not prove that integration tests or verification gates passed."
      ],
      nextAction: [
        "Inspect execution IDs, lifecycle phase bindings and required generated files.",
        "Use the narrowest lifecycle command that reproduces the problem.",
        "Run the full verify lifecycle before considering the artifact release-ready.",
        "Avoid manually invoking a goal as a substitute for the configured CI lifecycle."
      ]
    },
    {
      step: 20,
      title: "Investigate reproducibility and intermittent failures",
      objective:
        "Distinguish deterministic code/configuration defects from transient infrastructure problems.",
      commands: [
        "mvn -B -ntp verify",
        "mvn -B -ntp -T 1 verify",
        "git diff -- pom.xml",
        "git log -5 --oneline"
      ],
      interpretOutput: [
        "A failure that consistently occurs on the same module and commit is more likely deterministic.",
        "A failure only under parallel builds may indicate shared files, race conditions or unsafe plugin configuration.",
        "A failure only on one agent suggests differences in JDK, Maven, network, filesystem or cached artifacts.",
        "A failure that appears only after a recent dependency update may indicate an upstream compatibility change."
      ],
      nextAction: [
        "Compare successful and failed agent environments.",
        "Use serial execution only as a diagnostic comparison, not as proof that parallel execution is inherently wrong.",
        "Pin and review plugin and dependency versions where reproducibility requires it.",
        "Keep retry policies bounded and record every retry."
      ]
    },
    {
      step: 21,
      title: "Validate the fix and release safely",
      objective:
        "Prove that the original failure is resolved and that the artifact is safe to promote.",
      commands: [
        "mvn -B -ntp clean verify",
        "git diff --check",
        "git status --short"
      ],
      interpretOutput: [
        "clean verify should complete the configured lifecycle and verification checks.",
        "git diff --check detects common whitespace errors but does not validate Maven configuration.",
        "git status --short reveals uncommitted changes that must be reviewed.",
        "A green local build alone does not prove that the CI pipeline, security gates and release approval succeeded."
      ],
      nextAction: [
        "Run the same approved command and profile used by CI.",
        "Confirm tests, quality gates, artifact coordinates and checksums.",
        "Promote the verified artifact through the approved release process.",
        "Monitor deployment health and keep the rollback decision ready.",
        "Document the root cause, fix, validation evidence and prevention action."
      ]
    }
  ],

  pluginFailureMatrix: [
    {
      symptom: "maven-compiler-plugin fails during compile",
      likelyCauses: [
        "Java source compilation errors",
        "Incorrect maven.compiler.release setting",
        "Wrong JDK or toolchain",
        "Missing generated source",
        "Annotation processor incompatibility"
      ],
      diagnostics: [
        "mvn -version",
        "mvn -B -ntp -DskipTests compile",
        "Inspect the first compiler diagnostic and effective POM."
      ],
      resolution: [
        "Correct the source error or missing dependency.",
        "Align compiler release and approved JDK.",
        "Correct annotation processor and generated-source configuration.",
        "Run clean verify."
      ]
    },
    {
      symptom: "maven-surefire-plugin fails",
      likelyCauses: [
        "Failing unit tests",
        "Test discovery configuration",
        "JUnit or TestNG provider mismatch",
        "Forked JVM crash",
        "Test environment instability"
      ],
      diagnostics: [
        "mvn -B -ntp test",
        "Inspect target/surefire-reports.",
        "Inspect forked JVM dumps and test configuration."
      ],
      resolution: [
        "Fix the failing test or application defect.",
        "Correct provider and test discovery configuration.",
        "Investigate JVM crashes and resource limits.",
        "Re-run tests without suppressing failures."
      ]
    },
    {
      symptom: "maven-failsafe-plugin fails during verify",
      likelyCauses: [
        "Integration-test assertion failure",
        "Unavailable database or API",
        "Container startup failure",
        "Incorrect test endpoint or credentials",
        "Failsafe execution not bound correctly"
      ],
      diagnostics: [
        "mvn -B -ntp verify",
        "Inspect target/failsafe-reports.",
        "Check test service readiness and endpoint configuration."
      ],
      resolution: [
        "Restore the test dependency or correct its configuration.",
        "Fix the integration test or application defect.",
        "Validate the failsafe lifecycle bindings.",
        "Repeat the complete verify lifecycle."
      ]
    },
    {
      symptom: "maven-resources-plugin fails",
      likelyCauses: [
        "Missing resource files",
        "Incorrect resource path",
        "Filtering problems",
        "Permission or disk issues",
        "Filename case mismatch"
      ],
      diagnostics: [
        "mvn -B -ntp process-resources",
        "Inspect resources configuration in pom.xml.",
        "Check the source resource and generated output paths."
      ],
      resolution: [
        "Correct resource paths and profile activation.",
        "Validate filtering delimiters and required properties.",
        "Fix filesystem permissions or disk capacity.",
        "Test on the same operating system used by CI."
      ]
    },
    {
      symptom: "maven-clean-plugin fails",
      likelyCauses: [
        "File lock",
        "Permission denial",
        "Read-only workspace",
        "Endpoint protection interference",
        "Filesystem problem"
      ],
      diagnostics: [
        "Get-Location",
        "Get-Item .\\target | Format-List FullName,Attributes",
        "Get-ChildItem .\\target -Force"
      ],
      resolution: [
        "Identify the process or owner blocking cleanup.",
        "Use an approved disposable workspace.",
        "Correct the specific permission issue.",
        "Do not recursively change permissions across a shared agent."
      ]
    },
    {
      symptom: "maven-jar-plugin or maven-war-plugin fails",
      likelyCauses: [
        "Invalid archive configuration",
        "Missing manifest entries",
        "Duplicate or conflicting resources",
        "Insufficient disk space",
        "Missing compiled classes or resources"
      ],
      diagnostics: [
        "mvn -B -ntp -DskipTests package",
        "Inspect the first archive-related exception.",
        "Inspect target output and filesystem capacity."
      ],
      resolution: [
        "Correct archive and manifest configuration.",
        "Fix duplicate resource handling.",
        "Restore missing build inputs.",
        "Verify the resulting artifact before publishing."
      ]
    },
    {
      symptom: "maven-dependency-plugin fails",
      likelyCauses: [
        "Missing dependency",
        "Incorrect artifact coordinates",
        "Repository authentication failure",
        "Dependency convergence or scope mistake",
        "Incorrect output directory"
      ],
      diagnostics: [
        "mvn -B -ntp dependency:tree",
        "mvn -B -ntp help:effective-settings -Doutput=effective-settings.xml",
        "Inspect dependency-plugin configuration."
      ],
      resolution: [
        "Correct coordinates, version, scope or repository routing.",
        "Validate artifact access and credentials.",
        "Confirm output path permissions.",
        "Do not manually download unverified binaries into the build."
      ]
    },
    {
      symptom: "Checkstyle or SpotBugs fails",
      likelyCauses: [
        "Actual code-quality violations",
        "Missing rules configuration",
        "Plugin incompatibility",
        "Missing bytecode or incorrect analysis inputs"
      ],
      diagnostics: [
        "mvn -B -ntp checkstyle:check",
        "mvn -B -ntp spotbugs:check",
        "Inspect the exact rule violation or execution exception."
      ],
      resolution: [
        "Fix genuine violations.",
        "Restore configuration files and compatible plugin versions.",
        "Review approved exceptions through the quality process.",
        "Keep quality gates enabled."
      ]
    },
    {
      symptom: "JaCoCo report or coverage check fails",
      likelyCauses: [
        "Missing execution data",
        "Tests did not run",
        "Inconsistent class files",
        "Incorrect report paths",
        "Coverage threshold not met"
      ],
      diagnostics: [
        "mvn -B -ntp verify",
        "Search for jacoco.exec and jacoco.xml.",
        "Inspect prepare-agent and report execution configuration."
      ],
      resolution: [
        "Correct execution order and report paths.",
        "Ensure tests produce coverage data.",
        "Align analyzed classes and execution data.",
        "Improve meaningful test coverage when the gate is genuinely unmet."
      ]
    },
    {
      symptom: "SonarQube Maven goal fails",
      likelyCauses: [
        "Invalid or expired token",
        "SonarQube unavailable",
        "Scanner compatibility issue",
        "Quality gate violation",
        "Network or TLS failure"
      ],
      diagnostics: [
        "mvn -B -ntp sonar:sonar",
        "Inspect scanner logs and analysis task status.",
        "Review the server-side quality-gate result."
      ],
      resolution: [
        "Correct token provisioning and connectivity.",
        "Use a compatible scanner and supported Java runtime.",
        "Resolve the actual quality-gate conditions.",
        "Never commit tokens into source control."
      ]
    },
    {
      symptom: "Plugin fails only in Jenkins",
      likelyCauses: [
        "Different JDK or Maven version",
        "Different settings.xml",
        "Workspace permissions",
        "Missing environment variables",
        "Network restrictions or resource limits"
      ],
      diagnostics: [
        "mvn -version",
        "git rev-parse HEAD",
        "Compare sanitized effective settings and effective POM.",
        "Inspect agent identity, workspace and container limits."
      ],
      resolution: [
        "Align the approved toolchain and configuration.",
        "Correct CI secret bindings and environment configuration.",
        "Fix agent capacity or workspace permissions.",
        "Repeat the pipeline on the intended agent."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "Plugin version changed without a direct POM edit",
      investigation: [
        "Inspect parent POM changes and dependency-management updates.",
        "Inspect active profiles and pluginManagement inheritance.",
        "Compare effective POMs from successful and failed commits.",
        "Check whether an unpinned plugin prefix resolved to a different version.",
        "Identify changes in the CI image or Maven distribution."
      ],
      recovery: [
        "Pin a tested plugin version in the appropriate parent POM when reproducibility requires it.",
        "Restore the last known-good configuration through code review.",
        "Run tests and quality gates against the selected version."
      ],
      prevention: [
        "Manage plugin versions centrally.",
        "Review plugin updates as code changes.",
        "Use controlled dependency and plugin update automation.",
        "Keep build images versioned and reproducible."
      ]
    },
    {
      scenario: "Build passes locally but fails in Linux CI",
      investigation: [
        "Compare mvn -version and Java runtime details.",
        "Check case-sensitive paths and filenames.",
        "Check file executable permissions and line endings.",
        "Check environment variables and profile activation.",
        "Check whether local caches contain artifacts missing from the approved repository."
      ],
      recovery: [
        "Reproduce the build in a clean environment matching CI.",
        "Fix path, permissions, environment or dependency configuration.",
        "Run clean verify in the same operating-system environment."
      ],
      prevention: [
        "Build in a pinned CI image.",
        "Use clean, repeatable builds.",
        "Add Linux-based validation when Linux is the deployment platform.",
        "Avoid relying on undeclared local machine state."
      ]
    },
    {
      scenario: "Maven plugin crashes after a JDK upgrade",
      investigation: [
        "Confirm the Java runtime used by Maven and any forked process.",
        "Check the plugin's supported runtime requirements.",
        "Review stack traces for reflective-access or class-version errors.",
        "Check annotation processor and test provider compatibility.",
        "Compare the JDK vendor and patch level where relevant."
      ],
      recovery: [
        "Use a supported plugin version or approved JDK combination.",
        "Update incompatible processors or providers after regression testing.",
        "Rebuild and verify on the target CI image."
      ],
      prevention: [
        "Test JDK upgrades in a non-production pipeline.",
        "Maintain a supported Java/Maven/plugin compatibility matrix.",
        "Pin CI toolchains and schedule controlled upgrades."
      ]
    },
    {
      scenario: "Build fails intermittently during parallel execution",
      investigation: [
        "Compare normal execution with mvn -T 1 verify.",
        "Check whether multiple modules write to the same directory.",
        "Inspect generated-file ownership and plugin thread-safety warnings.",
        "Check tests that share databases, ports or mutable external state.",
        "Inspect memory and CPU pressure on the agent."
      ],
      recovery: [
        "Remove shared mutable output paths or correct module isolation.",
        "Fix unsafe plugin configuration or race-prone tests.",
        "Temporarily serialize the affected build only as a controlled mitigation."
      ],
      prevention: [
        "Use module-specific output paths.",
        "Validate plugin thread-safety before enabling parallel builds.",
        "Make tests isolated and deterministic.",
        "Re-enable parallelism only after repeatable validation."
      ]
    },
    {
      scenario: "Plugin fails with NoSuchMethodError or ClassNotFoundException",
      investigation: [
        "Identify the exact missing class or method and the first stack-trace frame.",
        "Check the plugin's own dependencies and classloader context.",
        "Inspect plugin dependencies, extensions and build extensions.",
        "Check for conflicting versions introduced by custom plugin dependencies.",
        "Compare the failure with the last successful plugin version."
      ],
      recovery: [
        "Align compatible plugin and extension versions.",
        "Remove unsupported custom plugin dependencies after impact review.",
        "Use a supported plugin release and rerun the failing goal."
      ],
      prevention: [
        "Avoid overriding plugin internals without a documented need.",
        "Test extensions with each planned Maven or JDK upgrade.",
        "Keep build tooling dependencies under change control."
      ]
    },
    {
      scenario: "Repository manager returns 401, 403, 404, 429 or 5xx",
      investigation: [
        "Record the artifact coordinate, timestamp, repository ID and HTTP status.",
        "Check repository-manager health and relevant request logs.",
        "Verify credentials and role permissions using approved tooling.",
        "Determine whether only one artifact or all artifacts are affected.",
        "Check whether the repository proxy or upstream repository is failing."
      ],
      recovery: [
        "Correct secret binding or repository permissions when confirmed.",
        "Restore the repository service or proxy path.",
        "Use an approved alternate repository only through the documented process.",
        "Do not disable TLS or checksum validation."
      ],
      prevention: [
        "Monitor repository availability, latency, storage and error rates.",
        "Alert on sustained authentication and upstream failures.",
        "Document repository escalation contacts and fallback procedures.",
        "Use controlled caching without bypassing integrity checks."
      ]
    },
    {
      scenario: "Plugin fails after a clean build but passed before",
      investigation: [
        "Check whether generated files or ignored files were present before the clean build.",
        "Inspect generation-plugin lifecycle bindings.",
        "Check whether an undeclared local artifact was installed in ~/.m2.",
        "Compare clean and incremental build behavior.",
        "Review case-sensitive paths and missing source-controlled resources."
      ],
      recovery: [
        "Declare the missing input or correct generation order.",
        "Use a clean CI workspace to verify the correction.",
        "Do not rely on manually created target files."
      ],
      prevention: [
        "Require clean builds in CI.",
        "Track required files in source control or generate them deterministically.",
        "Avoid undeclared dependencies on local machine state."
      ]
    },
    {
      scenario: "Plugin fails due to proxy, DNS or TLS errors",
      investigation: [
        "Inspect the earliest network exception and the target host.",
        "Check DNS resolution and connectivity using approved diagnostic tools.",
        "Inspect proxy settings and TLS trust configuration.",
        "Check certificate expiry and corporate trust-store changes.",
        "Compare affected agents without exposing internal credentials."
      ],
      recovery: [
        "Restore DNS, proxy routing or approved trust-store configuration.",
        "Renew or correct certificates through the responsible team.",
        "Retry only after network and TLS health are restored."
      ],
      prevention: [
        "Monitor repository endpoint and certificate health.",
        "Document proxy and trust-store ownership.",
        "Avoid disabling certificate verification as a workaround.",
        "Use consistent network configuration across build agents."
      ]
    },
    {
      scenario: "Quality gate blocks an urgent release",
      investigation: [
        "Confirm that the quality gate, rather than plugin startup, caused the failure.",
        "Identify the specific vulnerability, coverage condition or quality threshold.",
        "Assess the business urgency and the risk of bypassing the gate.",
        "Check whether the finding is new, existing, confirmed or disputed."
      ],
      recovery: [
        "Fix the violation when practical.",
        "For a permitted emergency exception, obtain documented approval and set an expiry or follow-up action.",
        "Maintain auditability and verify the final artifact."
      ],
      prevention: [
        "Run quality checks earlier in the development lifecycle.",
        "Prioritize remediation by risk.",
        "Use a documented exception process rather than permanent gate suppression."
      ]
    },
    {
      scenario: "CI build is killed by the operating system or container runtime",
      investigation: [
        "Check agent or container termination reason and exit code.",
        "Review memory limits, process limits, OOM events and host pressure.",
        "Check forked test JVMs and parallel build settings.",
        "Compare actual resource demand with the configured limits."
      ],
      recovery: [
        "Adjust resource requests and limits based on evidence.",
        "Reduce unnecessary concurrency if the agent is overloaded.",
        "Retry after confirming the underlying capacity problem is addressed."
      ],
      prevention: [
        "Monitor agent memory, disk and CPU utilization.",
        "Set sensible concurrency limits.",
        "Track build duration and resource usage over time."
      ]
    }
  ],

  recoveryProcedures: [
    {
      situation: "The failure is caused by an incorrect plugin configuration",
      procedure: [
        "Identify the owning POM, parent POM or active profile.",
        "Compare the effective configuration with the last known-good build.",
        "Change only the relevant plugin version, goal, parameter or phase binding.",
        "Review the diff and confirm the change follows project conventions.",
        "Run the narrow diagnostic goal followed by clean verify."
      ],
      validation: [
        "Confirm the original error no longer occurs.",
        "Confirm tests and quality gates execute as expected.",
        "Confirm the artifact contents and metadata are correct."
      ],
      rollback: [
        "Revert the configuration change if regression tests fail.",
        "Restore the last known-good plugin version or configuration through source control.",
        "Do not restore a vulnerable version without a security review."
      ]
    },
    {
      situation: "The failure is caused by repository access or artifact resolution",
      procedure: [
        "Capture the exact failed artifact coordinates and repository response.",
        "Confirm repository health, mirror routing, permissions and credentials.",
        "Restore the correct credentials or repository service.",
        "If local cache corruption is confirmed, repair only the affected cache entry.",
        "Retry the original build using the approved repository configuration."
      ],
      validation: [
        "Confirm the plugin and its dependencies resolve successfully.",
        "Confirm checksums and repository integrity validation succeed.",
        "Run the full verify lifecycle."
      ],
      rollback: [
        "Revert an unapproved repository configuration change.",
        "Return to the approved mirror or repository configuration.",
        "Never substitute an unverified binary for a missing artifact."
      ]
    },
    {
      situation: "The failure is caused by tests or a quality gate",
      procedure: [
        "Inspect the exact failed test or rule and identify the underlying defect.",
        "Fix application code, test assumptions or configuration as appropriate.",
        "For an external test dependency, restore the service or correct the test endpoint.",
        "Run the failing test or gate first, then execute the full verification lifecycle.",
        "Follow the documented emergency exception process if a critical release requires an approved exception."
      ],
      validation: [
        "Confirm the previously failing test or gate passes for the right reason.",
        "Confirm no other tests or quality checks were skipped.",
        "Confirm the final artifact is built from the reviewed commit."
      ],
      rollback: [
        "Revert the application or test change if it introduces regressions.",
        "Cancel promotion of an unverified artifact.",
        "Use the approved previous release if the deployment itself must be rolled back."
      ]
    },
    {
      situation: "The failure is caused by memory, disk or agent instability",
      procedure: [
        "Capture the process termination reason, disk capacity and resource limits.",
        "Identify whether Maven, a forked compiler or test JVM was affected.",
        "Free only approved disposable storage or adjust capacity after impact assessment.",
        "Reduce concurrency only when resource contention is supported by evidence.",
        "Re-run the failed stage on a healthy agent."
      ],
      validation: [
        "Confirm the agent is healthy and sufficient resources remain available.",
        "Repeat the failed stage and the full verification lifecycle.",
        "Check that resource use remains within approved limits."
      ],
      rollback: [
        "Revert an ineffective or unsafe resource configuration change.",
        "Return the agent to its previous configuration if new limits destabilize other workloads.",
        "Do not remove unrelated build caches or logs without approval."
      ]
    }
  ],

  ciCdTroubleshooting: [
    "Record the exact Maven command used by Jenkins, GitHub Actions or another CI system.",
    "Compare the CI JDK and Maven runtime with the last successful pipeline.",
    "Confirm the correct POM and module are being built.",
    "Check pipeline environment variables by name only; never dump secret values.",
    "Verify that CI settings.xml is mounted or generated at the intended path.",
    "Check credential IDs, secret binding scope and expiration.",
    "Confirm the agent can access the repository manager and any external test dependencies.",
    "Review the workspace ownership and cleanup behavior.",
    "Check whether a shared cache or workspace is being written by concurrent builds.",
    "Review the first failing stage and the status of earlier deployment or publishing stages.",
    "Preserve Surefire, Failsafe, scanner and plugin reports as CI artifacts where policy permits.",
    "Use bounded retries for transient infrastructure failures, not for deterministic compilation or quality failures.",
    "Ensure retries do not publish duplicate releases or repeat unsafe deployment actions.",
    "Publish artifacts only after all required verification and security checks succeed.",
    "Use immutable artifact coordinates and record the commit SHA associated with each artifact.",
    "Test pipeline changes on a non-production branch before rollout."
  ],

  monitoringAndPrevention: [
    "Pin Maven plugin versions in a central parent POM where practical.",
    "Use a supported Maven and JDK combination.",
    "Maintain a documented Java, Maven, plugin and CI-image compatibility matrix.",
    "Run clean verify on every pull request or merge request.",
    "Run unit tests, integration tests and required quality gates before artifact publication.",
    "Monitor repository-manager availability, response latency, storage and HTTP error rates.",
    "Monitor CI agent disk, memory, CPU and process termination events.",
    "Use reproducible build configuration and controlled dependency updates.",
    "Avoid snapshots for production release dependencies unless the release process explicitly permits them.",
    "Maintain repository credentials through a secret manager.",
    "Add a clear reactor summary and retain test reports in CI.",
    "Track plugin failure rates by plugin, goal, module, agent image and error category.",
    "Alert on repeated failures across multiple agents or repositories.",
    "Use clean disposable workspaces to identify hidden local-state dependencies.",
    "Document the last known-good plugin versions and the approved rollback process.",
    "Review suppressed tests, ignored rules and quality-gate exceptions regularly.",
    "Create runbooks for frequent plugin failures and assign ownership for shared build infrastructure.",
    "Perform post-incident reviews for repeated or high-impact failures."
  ],

  incidentRunbook: [
    "1. Acknowledge the alert and identify the affected pipeline, application and release.",
    "2. Confirm the repository, commit, branch, environment and working directory.",
    "3. Check whether the failure occurred before or after any deployment or publication stage.",
    "4. Preserve the complete console log and relevant test or plugin reports.",
    "5. Identify the first failed goal, plugin version, module and underlying exception.",
    "6. Classify the incident as configuration, compilation, tests, repository access, quality gate, resources or infrastructure.",
    "7. Compare the failed build with the last known-good build.",
    "8. Run the narrowest safe diagnostic command that can distinguish the likely causes.",
    "9. Change one relevant variable at a time and record each change.",
    "10. Obtain approval before changing shared infrastructure, production configuration or release policy.",
    "11. Validate the fix with the failing goal and the full required verification lifecycle.",
    "12. Confirm artifact integrity, quality gates, commit identity and publication status.",
    "13. Promote the artifact through the approved deployment process.",
    "14. Monitor health checks, application logs, error rates and business-critical transactions.",
    "15. If deployment health deteriorates, follow the service rollback runbook.",
    "16. Record the timeline, root cause, evidence, corrective action and prevention tasks.",
    "17. Close the incident only after recovery and ownership of follow-up actions are confirmed."
  ],

  handsOnLabs: [
    {
      lab: "Lab 1 — Reproduce a compiler-plugin failure",
      objective: "Learn to identify the first compiler diagnostic.",
      steps: [
        "Create a disposable Java Maven project or use a test branch.",
        "Introduce a temporary compilation error in a Java source file.",
        "Run mvn -B -ntp compile.",
        "Identify the compiler goal and first source-level error.",
        "Correct the source and run mvn -B -ntp clean verify."
      ],
      expectedResult:
        "The initial build fails at compilation. After the source correction, compilation and required verification succeed."
    },
    {
      lab: "Lab 2 — Investigate a failing unit test",
      objective: "Distinguish a test assertion failure from a plugin startup failure.",
      steps: [
        "Create a disposable test with an intentionally incorrect assertion.",
        "Run mvn -B -ntp test.",
        "Read the Surefire report and identify the failing assertion.",
        "Correct the test or implementation.",
        "Run the tests again and verify the report."
      ],
      expectedResult:
        "The report identifies the failing test. The corrected test run completes successfully."
    },
    {
      lab: "Lab 3 — Inspect effective plugin configuration",
      objective: "Understand inherited plugin versions and settings.",
      steps: [
        "Use a test project with a parent POM and a child module.",
        "Define a plugin version or configuration in the parent.",
        "Run mvn help:effective-pom -Doutput=effective-pom.xml.",
        "Inspect the effective plugin section.",
        "Change the test configuration and compare the effective POM."
      ],
      expectedResult:
        "The effective POM reveals the configuration actually used by the module."
    },
    {
      lab: "Lab 4 — Reproduce a missing plugin artifact",
      objective: "Understand plugin resolution errors without damaging a real repository.",
      steps: [
        "Use an isolated disposable Maven project and test repository configuration.",
        "Configure an intentionally unavailable plugin version in that test project.",
        "Run a lifecycle command that requires the plugin.",
        "Capture the plugin coordinates and resolution error.",
        "Restore a valid plugin version and repeat the build."
      ],
      expectedResult:
        "The invalid configuration produces a resolution failure; restoring a valid version allows the build to proceed when the repository is healthy."
    },
    {
      lab: "Lab 5 — Diagnose a generated-source problem",
      objective: "Understand why clean builds can expose missing generation steps.",
      steps: [
        "Use a disposable project with a source-generation plugin.",
        "Confirm generated source exists after the normal build.",
        "Temporarily disable generation in the test branch.",
        "Run mvn clean compile.",
        "Restore the generation execution and verify the lifecycle order."
      ],
      expectedResult:
        "The build exposes the missing generated source and succeeds after generation is restored."
    },
    {
      lab: "Lab 6 — Investigate a quality-gate failure",
      objective: "Separate code-quality violations from plugin execution errors.",
      steps: [
        "Use an approved disposable project with Checkstyle or another configured quality plugin.",
        "Introduce a test violation.",
        "Run the configured quality goal.",
        "Inspect the exact rule and reported source location.",
        "Correct the violation and rerun the gate."
      ],
      expectedResult:
        "The quality gate blocks the violation and passes after the code is corrected."
    },
    {
      lab: "Lab 7 — Compare local and CI toolchains",
      objective: "Find environment differences behind a plugin failure.",
      steps: [
        "Record mvn -version and java -version locally.",
        "Capture the same information from a CI job.",
        "Compare JDK, Maven, OS, environment configuration and plugin versions.",
        "Reproduce the build using the approved CI toolchain.",
        "Document and correct the relevant mismatch."
      ],
      expectedResult:
        "The comparison identifies whether a toolchain or environment difference explains the failure."
    },
    {
      lab: "Lab 8 — Write a production incident report",
      objective: "Practice evidence-based root-cause analysis and safe recovery.",
      steps: [
        "Use a failed test build or another disposable build incident.",
        "Record impact, timeline, first failure, root cause and supporting evidence.",
        "Document the minimal fix and validation results.",
        "Write a rollback decision and prevention plan.",
        "Review the report with another engineer."
      ],
      expectedResult:
        "The incident report explains the cause, recovery evidence, rollback criteria and prevention actions."
    }
  ],

  interviewQuestions: [
    {
      question: "1. What is a Maven PluginExecutionError?",
      answer:
        "It is a build failure in which a Maven plugin goal could not complete. The actual cause may be a compilation error, test failure, invalid configuration, missing artifact, permission issue or runtime problem. The failed goal and underlying exception must be inspected."
    },
    {
      question: "2. What is the difference between a plugin execution error and a plugin resolution error?",
      answer:
        "A resolution error means Maven cannot obtain or resolve the plugin or its dependencies. An execution error generally means Maven reached the plugin goal and that goal failed, although the visible exception can wrap an underlying resolution or runtime problem."
    },
    {
      question: "3. How do you find the first root-cause error?",
      answer:
        "Read the complete log around the first failed goal, inspect the earliest meaningful exception and follow the Caused by chain. Confirm the module, plugin, goal and execution ID before selecting a fix."
    },
    {
      question: "4. What does mvn -e do?",
      answer:
        "It displays execution error details and stack traces that help diagnose the failure."
    },
    {
      question: "5. What does mvn -X do?",
      answer:
        "It enables Maven debug output. It can reveal configuration and resolution details but may expose sensitive information, so output must be protected and redacted."
    },
    {
      question: "6. What is an effective POM?",
      answer:
        "It is the merged project configuration after inheritance, profiles and relevant Maven model processing. It helps identify the configuration that the build actually uses."
    },
    {
      question: "7. What is the difference between pluginManagement and plugins?",
      answer:
        "pluginManagement provides managed plugin versions and configuration. A plugin declared under build/plugins can participate in the build, and lifecycle bindings may also invoke plugins."
    },
    {
      question: "8. Why does a Maven build work locally but fail in CI?",
      answer:
        "Common reasons include different JDKs, Maven versions, environment variables, profiles, settings.xml, credentials, operating systems, permissions, repository access and undeclared local cache dependencies."
    },
    {
      question: "9. What is the difference between Surefire and Failsafe?",
      answer:
        "Surefire is primarily used for unit-test execution. Failsafe is designed for integration tests and normally separates integration-test execution from the final verify result."
    },
    {
      question: "10. What does -DskipTests do?",
      answer:
        "It skips test execution for standard Maven test-plugin configurations, but tests may still be compiled. Its exact effect depends on the plugins and POM. It must not be used to bypass required production quality gates."
    },
    {
      question: "11. What does -Dmaven.test.skip=true do?",
      answer:
        "It commonly skips both test compilation and test execution for Maven test-plugin integrations that honor the property. It is not equivalent to -DskipTests and can hide test-related build problems."
    },
    {
      question: "12. What does -U do?",
      answer:
        "It forces Maven to check for updated snapshots and previously missing releases according to repository policies. It cannot fix incorrect coordinates, authorization failures or a down repository."
    },
    {
      question: "13. How do you troubleshoot a compiler plugin failure?",
      answer:
        "Inspect the first compiler diagnostic, verify the JDK and compiler release settings, review the effective POM, and check dependencies, generated sources and annotation processors."
    },
    {
      question: "14. How do you troubleshoot a Surefire failure?",
      answer:
        "Inspect Surefire reports, distinguish assertion failures from forked JVM errors, check test discovery and provider compatibility, and verify environment dependencies and resource limits."
    },
    {
      question: "15. How do you troubleshoot a plugin dependency download failure?",
      answer:
        "Capture the artifact coordinates, repository URL and HTTP status. Check DNS, TLS, proxy, mirror configuration, credentials, repository health and local cache state."
    },
    {
      question: "16. What does a 401 response mean during Maven resolution?",
      answer:
        "It usually indicates missing or invalid authentication. Verify the correct credential source and matching repository or mirror ID without exposing secret values."
    },
    {
      question: "17. What does a 403 response mean?",
      answer:
        "Access is forbidden. The credentials may be valid but lack permission, or the repository may enforce an access policy."
    },
    {
      question: "18. What causes NoSuchMethodError in a Maven plugin?",
      answer:
        "It commonly indicates binary incompatibility between a plugin and one of its runtime dependencies, or conflicting plugin extensions. The missing method and classloader context help identify the mismatch."
    },
    {
      question: "19. Why can a clean build fail when an incremental build succeeds?",
      answer:
        "The incremental build may rely on stale generated files, ignored files, local artifacts or undeclared state. A clean build exposes missing inputs and incorrect generation order."
    },
    {
      question: "20. How do you investigate an OutOfMemoryError?",
      answer:
        "Identify the affected JVM, inspect heap or native-memory evidence, check container limits and concurrency, and tune memory based on measurements rather than blindly increasing heap size."
    },
    {
      question: "21. How do you troubleshoot a multi-module reactor failure?",
      answer:
        "Read the reactor summary, identify the first failed module and inspect upstream dependencies. Use -pl to select the module and -am to include required reactor projects."
    },
    {
      question: "22. Why is BUILD SUCCESS not enough for production release?",
      answer:
        "The command may not have run all required tests, quality gates, security checks or packaging stages. Release readiness must be established by the approved CI verification and promotion process."
    },
    {
      question: "23. How do you handle a quality-gate failure during an urgent release?",
      answer:
        "Identify the exact condition, assess risk, fix the issue when possible and follow the documented emergency exception process if policy allows one. Do not silently disable the gate."
    },
    {
      question: "24. How do you prevent plugin failures from recurring?",
      answer:
        "Pin compatible plugin versions, standardize JDK and Maven toolchains, use clean CI builds, monitor repository and agent health, preserve reports and document root-cause-specific prevention actions."
    },
    {
      question: "25. When should you delete the local Maven cache?",
      answer:
        "Only when evidence indicates a specific cached artifact is corrupt or stale. Prefer repairing the affected artifact directory or using an isolated repository rather than deleting the entire cache."
    },
    {
      question: "26. What evidence should an incident report contain?",
      answer:
        "Include incident timeline, impact, affected commit and module, first failed goal, relevant logs, confirmed root cause, corrective action, validation results, rollback decision and preventive owners."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Application and Maven module:",
    "Repository, branch and commit SHA:",
    "Build URL and CI agent:",
    "Environment affected:",
    "Incident start and recovery timestamps:",
    "Severity and business impact:",
    "Last known-good build:",
    "Maven version and JDK version:",
    "Failed plugin coordinates and goal:",
    "First meaningful exception:",
    "Relevant redacted logs and test reports:",
    "Recent code, POM, dependency or infrastructure changes:",
    "Root cause confirmed by evidence:",
    "Corrective action taken:",
    "Validation command and result:",
    "Artifact coordinates and verification status:",
    "Was anything deployed or published before the failure?",
    "Rollback decision and outcome:",
    "Preventive actions, owners and due dates:",
    "Runbook or monitoring improvements:"
  ],

  officialReferences: [
    "Maven Plugin Guide: https://maven.apache.org/guides/plugin/guide-java-plugin-development.html",
    "Maven Build Lifecycle: https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html",
    "Maven POM Reference: https://maven.apache.org/pom.html",
    "Maven Settings Reference: https://maven.apache.org/settings.html",
    "Maven CLI Reference: https://maven.apache.org/ref/current/maven-embedder/cli.html",
    "Maven Compiler Plugin: https://maven.apache.org/plugins/maven-compiler-plugin/",
    "Maven Surefire Plugin: https://maven.apache.org/surefire/maven-surefire-plugin/",
    "Maven Failsafe Plugin: https://maven.apache.org/surefire/maven-failsafe-plugin/",
    "Maven Resources Plugin: https://maven.apache.org/plugins/maven-resources-plugin/",
    "Maven JAR Plugin: https://maven.apache.org/plugins/maven-jar-plugin/",
    "Maven WAR Plugin: https://maven.apache.org/plugins/maven-war-plugin/",
    "Maven Dependency Plugin: https://maven.apache.org/plugins/maven-dependency-plugin/",
    "Maven Checkstyle Plugin: https://maven.apache.org/plugins/maven-checkstyle-plugin/",
    "JaCoCo Maven Plugin: https://www.jacoco.org/jacoco/trunk/doc/maven.html",
    "SpotBugs Maven Plugin: https://spotbugs.github.io/spotbugs-maven-plugin/",
    "SonarQube Maven Scanner: https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/scanners/sonarscanner-for-maven/"
  ]
};
