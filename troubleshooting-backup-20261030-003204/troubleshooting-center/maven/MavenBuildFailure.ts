export interface MavenBuildFailureGuide {
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

export const mavenBuildFailureGuide: MavenBuildFailureGuide = {
  title: "Maven Build Failure — Real Production Troubleshooting",
  category: "Maven / Java / Jenkins / Docker / CI-CD",
  severity: "SEV-2 or SEV-3 depending on release and customer impact",

  overview: `
A Maven build failure occurs when Maven cannot complete the requested build
lifecycle or goal.

A build may fail during:
- Project model validation
- Parent POM or BOM resolution
- Dependency collection or download
- Plugin resolution
- Resource processing
- Java compilation
- Unit tests or integration tests
- Packaging
- Verification, static analysis, or quality gates
- Artifact publication

Typical errors:
- BUILD FAILURE
- Compilation failure
- Failed to execute goal
- Could not resolve dependencies
- Non-resolvable parent POM
- PluginResolutionException
- Tests run: failures or errors
- OutOfMemoryError
- Failed to transfer artifact
- Checkstyle, SpotBugs, or coverage gate failure
- JAR or WAR missing after build
- Works locally but fails on Jenkins
- Build succeeds but deployment fails

Important production principle:
The final BUILD FAILURE summary is not necessarily the root cause. Find the
first meaningful error in the failing Maven phase, identify the component that
produced it, and follow evidence before making changes.

Do not immediately delete ~/.m2, skip all tests, upgrade every plugin, or rerun
a failed production deployment without checking its current state.
`,

  incidentScenario: [
    "A Jenkins pipeline that passed for weeks suddenly fails during mvn clean verify.",
    "A source-code commit introduces a compilation error and blocks the release.",
    "A Maven build fails only on one agent because its JDK, settings, or local cache differs.",
    "A repository manager becomes slow and builds fail while downloading dependencies.",
    "Unit tests pass locally but fail on CI because of environment assumptions or test ordering.",
    "A quality gate fails because coverage, static analysis, or security requirements are no longer met.",
    "A multi-module project fails because one child module or shared parent configuration changed.",
    "A Docker build fails during Maven packaging even though the same code builds on the developer workstation.",
    "The build succeeds but the expected JAR or WAR is missing, invalid, or not published.",
    "A release pipeline is blocked and the team needs to decide whether to fix forward or restore the last known-good artifact."
  ],

  impactAssessment: [
    "Identify the affected service, repository, branch, commit SHA, module, Maven goal, pipeline run, and environment.",
    "Determine whether only one module failed or all projects using a shared parent POM, plugin, or repository are affected.",
    "Identify the failing lifecycle phase: validate, compile, test, package, verify, install, or deploy.",
    "Check whether the application artifact was created, uploaded, promoted, or deployed before the failure.",
    "Determine whether the failure is deterministic or intermittent.",
    "Compare the current build with the last known-good pipeline and its toolchain.",
    "Assess release deadlines, customer impact, security implications, and deployment risk.",
    "Pause release promotion if the artifact cannot be validated. A failed build alone does not mean a running production application must be rolled back."
  ],

  safetyChecks: [
    "Confirm the correct repository, branch, commit, module, and target environment.",
    "Confirm the intended Java version, Maven Wrapper, Maven settings, active profiles, and build agent.",
    "Check whether production changes require approval or a change ticket.",
    "Preserve the original build log before retrying or modifying configuration.",
    "Do not print credentials from settings.xml, environment variables, or CI secrets into logs.",
    "Do not delete the entire local Maven repository as the first troubleshooting action.",
    "Do not disable TLS validation or bypass the approved repository manager.",
    "Do not use -DskipTests as a permanent fix for a failing test suite.",
    "Do not suppress quality or security gates merely to produce a green pipeline.",
    "Do not publish an artifact whose version, checksum, test status, or source commit cannot be verified.",
    "Use a disposable branch or test environment for reproductions that deliberately break the build."
  ],

  evidenceCollection: [
    "Capture the complete Maven console output, including the first causal exception and the final BUILD FAILURE summary.",
    "Record pipeline URL, build number, timestamp, agent identity, commit SHA, branch, and exit code.",
    "Capture mvn -version, java -version, and the Maven Wrapper version.",
    "Record the exact Maven command, profiles, properties, and module selectors.",
    "Capture POM changes, parent POM changes, plugin versions, dependency changes, and active profiles.",
    "Record whether the build uses a local repository, remote repository manager, proxy, or custom settings file.",
    "Capture test reports from target/surefire-reports and target/failsafe-reports when available.",
    "Capture compiler output, test failure stack traces, heap errors, and repository HTTP response codes.",
    "Record whether the failure reproduces on a second agent and in a clean workspace.",
    "Preserve the previous successful artifact coordinates and checksum for rollback comparison."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Find the first causal error",
      objective:
        "Identify the failing phase and avoid treating the final summary as the root cause.",
      commands: [
        "mvn -B -ntp clean verify",
        "mvn -B -ntp -e clean verify"
      ],
      interpretOutput: [
        "BUILD FAILURE is a summary, not a diagnosis.",
        "Failed to execute goal identifies the Maven plugin and goal that failed.",
        "Compilation failure points toward source code, compiler configuration, or generated code.",
        "Could not resolve dependencies or plugins points toward model, repository, or artifact resolution.",
        "Tests run: failures indicates assertion or behavioral failures; errors often indicate exceptions or setup problems.",
        "An OutOfMemoryError points toward memory usage, forked processes, or an unexpectedly large build."
      ],
      nextAction: [
        "Record the first meaningful error and its surrounding stack trace.",
        "Identify the Maven phase, plugin, module, and failing coordinate.",
        "Continue to the corresponding diagnostic step instead of changing multiple settings at once."
      ]
    },
    {
      step: 2,
      title: "Capture build environment and tool versions",
      objective:
        "Detect differences between local development, CI agents, and containers.",
      commands: [
        "mvn -version",
        "java -version",
        "javac -version",
        "git rev-parse HEAD",
        "git status --short"
      ],
      interpretOutput: [
        "Maven reports the Java runtime it actually uses.",
        "java and javac can resolve to different installations.",
        "The Maven Wrapper may standardize Maven but does not automatically standardize every JDK or operating-system setting.",
        "Different commit SHAs or uncommitted files make local and CI results difficult to compare."
      ],
      nextAction: [
        "Compare the failing environment with the last successful run.",
        "Check JAVA_HOME, PATH, Maven Wrapper, JDK toolchain, and agent image.",
        "Reproduce with the same commit and intended toolchain."
      ]
    },
    {
      step: 3,
      title: "Confirm the Maven lifecycle phase",
      objective:
        "Narrow down whether the failure is in validation, compilation, tests, packaging, or publication.",
      commands: [
        "mvn -B -ntp validate",
        "mvn -B -ntp compile",
        "mvn -B -ntp test",
        "mvn -B -ntp package",
        "mvn -B -ntp verify"
      ],
      interpretOutput: [
        "validate checks project structure and configuration.",
        "compile builds main source code and can invoke generated-source tooling.",
        "test runs configured unit tests.",
        "package creates the configured artifact, such as a JAR or WAR.",
        "verify runs preceding lifecycle phases and configured verification checks.",
        "Passing an earlier phase does not prove later phases or deployment will succeed."
      ],
      nextAction: [
        "Run the narrowest useful goal to isolate the failing phase.",
        "Return to the full required lifecycle after diagnosing the issue.",
        "Do not report a build as production-ready merely because compile passed."
      ]
    },
    {
      step: 4,
      title: "Inspect recent code and POM changes",
      objective:
        "Identify a source or configuration change that introduced the failure.",
      commands: [
        "git log -n 10 --oneline",
        "git diff HEAD~1..HEAD -- pom.xml",
        "git diff HEAD~1..HEAD -- '**/pom.xml'",
        "git diff --check"
      ],
      interpretOutput: [
        "A changed parent version or plugin version may affect multiple modules.",
        "A dependency upgrade can introduce API incompatibilities or a new minimum Java requirement.",
        "A profile or property change may alter build behavior only in CI.",
        "A source-code compile failure may be unrelated to Maven configuration."
      ],
      nextAction: [
        "Compare with the last known-good commit.",
        "Identify the smallest relevant change and test the hypothesis in a branch.",
        "Avoid reverting unrelated changes without evidence."
      ]
    },
    {
      step: 5,
      title: "Validate the POM and effective configuration",
      objective:
        "Find invalid POM structure, inherited settings, and profile overrides.",
      commands: [
        "mvn -B -ntp validate",
        "mvn help:effective-pom -Doutput=effective-pom.xml",
        "mvn help:active-profiles"
      ],
      interpretOutput: [
        "Invalid POM or model-building errors can prevent Maven from reaching compilation.",
        "The effective POM combines parent settings, plugin management, properties, and active profiles.",
        "A profile activated on CI may change dependency versions or compiler settings.",
        "Help Plugin goals may fail if Maven cannot download the plugin itself."
      ],
      nextAction: [
        "Inspect the effective POM locally and compare working versus failing environments.",
        "Check parent POM resolution, profile activation, and property overrides.",
        "If the Help Plugin cannot run, inspect source POMs and the original debug output."
      ]
    },
    {
      step: 6,
      title: "Diagnose dependency resolution",
      objective:
        "Determine whether a missing or incompatible dependency prevents the build.",
      commands: [
        "mvn -B -ntp -e validate",
        "mvn dependency:tree -Dverbose",
        "mvn dependency:tree -Dincludes=<groupId>:<artifactId>"
      ],
      interpretOutput: [
        "Could not find artifact can indicate incorrect coordinates or an unpublished version.",
        "HTTP 401 commonly indicates authentication failure; HTTP 403 commonly indicates denied access.",
        "HTTP 429 may indicate rate limiting; HTTP 5xx may indicate repository or upstream failure.",
        "A dependency tree shows transitive paths and can reveal unexpected version selection.",
        "The Dependency Plugin may itself be unavailable during a repository incident."
      ],
      nextAction: [
        "Capture the exact failing groupId, artifactId, version, classifier, and repository URL.",
        "Check dependency management, BOM imports, exclusions, mirror configuration, and credentials.",
        "Use repository logs or cached POM evidence if the diagnostic plugin cannot be downloaded."
      ]
    },
    {
      step: 7,
      title: "Check Maven plugin resolution",
      objective:
        "Separate build-plugin failures from application dependency failures.",
      commands: [
        "mvn -X -B -ntp validate",
        "mvn -B -ntp clean verify"
      ],
      interpretOutput: [
        "PluginResolutionException indicates Maven cannot obtain or use a required plugin.",
        "A plugin may fail because its version is unavailable, the repository blocks it, or its transitive dependencies cannot resolve.",
        "A plugin can also be incompatible with the selected JDK.",
        "Application dependencyManagement is not automatically the fix for a plugin-resolution error."
      ],
      nextAction: [
        "Identify the exact plugin coordinate and repository response.",
        "Check plugin version, plugin repositories, mirrors, and JDK compatibility.",
        "Pin a supported plugin version in the appropriate plugin configuration when justified."
      ]
    },
    {
      step: 8,
      title: "Investigate Java compilation errors",
      objective:
        "Determine whether the failure is caused by source code, compiler release, or the selected JDK.",
      commands: [
        "mvn -B -ntp -pl <module-name> -am compile",
        "mvn -version",
        "javac -version"
      ],
      interpretOutput: [
        "Cannot find symbol often indicates missing imports, incorrect names, generated-source problems, or an incompatible dependency API.",
        "Invalid target release indicates the compiler cannot support the requested release.",
        "UnsupportedClassVersionError points to a class-file version newer than the runtime supports.",
        "Compilation failures may occur in generated source or annotation processors rather than handwritten source."
      ],
      nextAction: [
        "Inspect the first compiler error and its source location.",
        "Compare compiler release, JDK, plugin version, and dependency API changes.",
        "Run focused compilation and then the complete build after correction."
      ]
    },
    {
      step: 9,
      title: "Analyze unit test failures",
      objective:
        "Determine whether tests fail because of code defects, environmental assumptions, or test configuration.",
      commands: [
        "mvn -B -ntp test",
        "Get-ChildItem -Recurse -Path . -Filter '*.txt' -ErrorAction SilentlyContinue | Where-Object { $_.FullName -match 'surefire-reports|failsafe-reports' }"
      ],
      interpretOutput: [
        "Assertion failures usually indicate behavior differs from the expected result.",
        "Errors can indicate exceptions, setup failures, unavailable services, or environment problems.",
        "Tests that pass individually but fail together may share state, ports, files, or databases.",
        "A missing test report may mean the test phase never ran or the plugin failed before writing reports."
      ],
      nextAction: [
        "Inspect the exact failed test and full stack trace.",
        "Check test data, time zone, locale, ports, service dependencies, and test ordering.",
        "Re-run the failing test in isolation and then in the full suite.",
        "Do not permanently skip failing tests to make the pipeline green."
      ]
    },
    {
      step: 10,
      title: "Investigate flaky tests and parallel execution",
      objective:
        "Find nondeterministic failures caused by shared resources or timing.",
      commands: [
        "mvn -B -ntp -Dtest=<TestClass> test",
        "mvn -B -ntp test"
      ],
      interpretOutput: [
        "A test that passes alone but fails in the suite may depend on shared state or execution order.",
        "Parallel execution can expose race conditions, shared temporary files, and port conflicts.",
        "A single successful retry does not establish that the defect is fixed."
      ],
      nextAction: [
        "Capture repeated failures and compare timestamps and test order.",
        "Isolate test data, use unique temporary resources, and fix synchronization issues.",
        "Use retries only as a diagnostic or policy-controlled mitigation, not as a substitute for fixing flaky tests."
      ]
    },
    {
      step: 11,
      title: "Check resource processing and generated sources",
      objective:
        "Find failures involving missing resources, filtering, code generation, or annotation processors.",
      commands: [
        "mvn -B -ntp -pl <module-name> -am process-resources",
        "mvn -B -ntp -pl <module-name> -am generate-sources",
        "Get-ChildItem -Recurse -Path .\\target -ErrorAction SilentlyContinue"
      ],
      interpretOutput: [
        "Resource filtering can fail because of encoding, invalid expressions, or missing files.",
        "Generated source directories may be empty if a generator failed or was not configured.",
        "Build plugins may produce generated code that later compilation depends on."
      ],
      nextAction: [
        "Inspect resource paths, encoding, filtering configuration, and plugin output.",
        "Verify generated source directories and their lifecycle bindings.",
        "Fix the generator or resource configuration before changing application source code."
      ]
    },
    {
      step: 12,
      title: "Diagnose packaging and artifact output",
      objective:
        "Confirm the build creates the expected artifact in the expected location.",
      commands: [
        "mvn -B -ntp package",
        "Get-ChildItem -Recurse -Path . -Include *.jar,*.war -ErrorAction SilentlyContinue"
      ],
      interpretOutput: [
        "A successful compile does not prove packaging succeeded.",
        "The output artifact name may include a version, classifier, or module-specific finalName.",
        "A multi-module build can create artifacts under child-module target directories.",
        "A later cleanup step or pipeline workspace change may remove the expected file."
      ],
      nextAction: [
        "Inspect the packaging plugin and module output directory.",
        "Verify artifact type, filename, size, and expected contents.",
        "Ensure the CI archive or publish step points to the correct module output."
      ]
    },
    {
      step: 13,
      title: "Investigate Maven memory failures",
      objective:
        "Distinguish JVM heap exhaustion from operating-system or container memory limits.",
      commands: [
        "mvn -version",
        "echo $env:MAVEN_OPTS",
        "echo $env:JAVA_TOOL_OPTIONS"
      ],
      interpretOutput: [
        "Java heap space indicates the JVM could not allocate the required heap.",
        "GC overhead limit exceeded can indicate severe memory pressure.",
        "A process can be killed by a container or operating system without producing a Java heap dump.",
        "MAVEN_OPTS and JAVA_TOOL_OPTIONS can affect different Java processes, including forked tools.",
        "Increasing heap without checking the container limit may cause more memory pressure."
      ],
      nextAction: [
        "Inspect the JVM heap settings, agent memory, container limits, and forked test processes.",
        "Check whether the failure correlates with parallel builds, large generated sources, or memory-heavy tests.",
        "Tune heap and parallelism within the actual memory budget.",
        "Repeat the build and monitor both process and container memory."
      ]
    },
    {
      step: 14,
      title: "Check local Maven cache safely",
      objective:
        "Investigate incomplete downloads or stale local metadata.",
      commands: [
        "mvn -B -ntp -U -pl <module-name> -am verify",
        "mvn -version"
      ],
      interpretOutput: [
        "The local repository normally resides under the user's .m2/repository directory.",
        "Failed transfers can leave cached metadata or incomplete artifact state.",
        "-U requests update checks for snapshots and missing releases; it does not fix every cache or repository problem.",
        "A build that works with a fresh cache suggests a cache difference but does not alone prove the remote repository is healthy."
      ],
      nextAction: [
        "Capture the original failure before retrying.",
        "Use an isolated local repository for controlled reproduction when appropriate.",
        "If corruption is confirmed, back up and isolate only the affected artifact directory.",
        "Do not delete the entire Maven cache as the default response."
      ]
    },
    {
      step: 15,
      title: "Check CI agent, proxy, and repository health",
      objective:
        "Identify failures that affect multiple projects or only a particular build environment.",
      commands: [
        "mvn -version",
        "nslookup <repository-host>",
        "curl -I https://<repository-host>/<artifact-path>"
      ],
      interpretOutput: [
        "DNS failure or connection timeout may indicate network, proxy, firewall, or service problems.",
        "A 401 or 403 suggests authentication or authorization.",
        "A 429 suggests throttling; 5xx responses suggest a repository or upstream problem.",
        "A successful repository root response does not prove the exact artifact is available.",
        "A HEAD request may not be supported by every repository; confirm with an authorized GET when necessary."
      ],
      nextAction: [
        "Compare a working agent and a failing agent using the same commit.",
        "Check repository-manager health, proxy settings, server IDs, and CI credentials.",
        "Redact tokens and sensitive URLs from logs.",
        "Escalate a shared repository outage to its service owner."
      ]
    },
    {
      step: 16,
      title: "Investigate multi-module reactor failures",
      objective:
        "Find module order, parent-child, or internal artifact issues.",
      commands: [
        "mvn -B -ntp -pl <module-name> -am verify",
        "mvn -B -ntp -pl <module-name> -amd verify"
      ],
      interpretOutput: [
        "-am also builds required projects in the reactor.",
        "-amd selects projects that depend on the specified project.",
        "A child module may depend on an internal artifact that is missing from the reactor or remote repository.",
        "A parent or child may override versions or plugin configuration unexpectedly."
      ],
      nextAction: [
        "Check the root aggregator POM and module declarations.",
        "Confirm internal artifact versions and build order.",
        "Build the required reactor modules together where appropriate.",
        "Do not rely on manually installed artifacts from a developer machine."
      ]
    },
    {
      step: 17,
      title: "Compare local and Jenkins behavior",
      objective:
        "Determine whether the failure is source-related or environment-specific.",
      commands: [
        "git rev-parse HEAD",
        "mvn -version",
        "java -version",
        "mvn help:active-profiles"
      ],
      interpretOutput: [
        "Different commits, profiles, Java versions, Maven versions, or settings files can produce different outcomes.",
        "A warm developer cache can hide an unpublished artifact.",
        "A Jenkins container may use a different operating system, locale, file permissions, or filesystem behavior."
      ],
      nextAction: [
        "Reproduce with the same commit, wrapper, JDK, and intended profiles.",
        "Compare sanitized effective configuration.",
        "Add a CI preflight check when the difference is a recurring toolchain problem."
      ]
    },
    {
      step: 18,
      title: "Inspect quality gates and static analysis",
      objective:
        "Separate code-quality policy failures from Maven infrastructure failures.",
      commands: [
        "mvn -B -ntp verify",
        "mvn -B -ntp -DskipTests package"
      ],
      interpretOutput: [
        "Checkstyle, SpotBugs, coverage, and static-analysis plugins can fail the build even when compilation succeeds.",
        "A quality-gate failure may be an intentional policy block rather than a broken build tool.",
        "Skipping tests or verification can help isolate a phase during diagnosis, but cannot establish release readiness."
      ],
      nextAction: [
        "Read the specific rule, threshold, report, or policy that failed.",
        "Fix the violation or use the formally approved exception process.",
        "Restore all mandatory quality gates before release promotion."
      ]
    },
    {
      step: 19,
      title: "Apply the smallest corrective change",
      objective:
        "Fix the proven cause without changing unrelated dependencies or build settings.",
      commands: [
        "git diff --check",
        "mvn -B -ntp -pl <module-name> -am verify"
      ],
      interpretOutput: [
        "A focused module build can confirm whether the local correction addresses the failure.",
        "A successful focused build does not guarantee the entire reactor or deployment is healthy.",
        "A broad POM change can affect every child module and downstream consumer."
      ],
      nextAction: [
        "Change one cause at a time and retain a reviewable diff.",
        "Run focused tests followed by the complete required lifecycle.",
        "Inspect the resulting artifact and dependency graph."
      ]
    },
    {
      step: 20,
      title: "Validate artifact and deployment readiness",
      objective:
        "Confirm the exact artifact intended for release is valid and traceable.",
      commands: [
        "mvn -B -ntp clean verify",
        "git rev-parse HEAD",
        "git status --short"
      ],
      interpretOutput: [
        "A clean verification should pass for the intended commit and approved toolchain.",
        "The artifact must match the module, version, and build that passed validation.",
        "A green build alone does not prove that deployment configuration or production runtime is compatible."
      ],
      nextAction: [
        "Run integration tests and application startup checks.",
        "Record the artifact checksum and source commit.",
        "Promote the exact tested artifact through the normal approval workflow.",
        "Monitor health checks and application metrics after deployment."
      ]
    },
    {
      step: 21,
      title: "Recover or roll back safely",
      objective:
        "Restore a trustworthy build or release without destroying evidence.",
      commands: [
        "git diff --check",
        "git status --short",
        "mvn -B -ntp clean verify"
      ],
      interpretOutput: [
        "A successful rerun should be linked to a specific commit, agent image, and artifact.",
        "If the same failure persists, repeated retries are unlikely to help unless the cause is transient.",
        "If a dependency or toolchain change remains unsafe, preserve the last known-good configuration and artifact."
      ],
      nextAction: [
        "Fix forward only when the correction is validated and approved.",
        "Otherwise revert the targeted change or restore the last approved artifact.",
        "Record impact, timeline, root cause, and preventive actions."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Compilation failure",
      likelyCause: "Source error, incompatible API, incorrect JDK, or generated source failure.",
      confirmation: "Inspect the first compiler error, source location, compiler release, and dependency tree.",
      resolution: "Fix the source or generated code, align compatible dependencies, and verify the compiler toolchain."
    },
    {
      symptom: "Could not resolve dependencies",
      likelyCause: "Incorrect coordinates, unavailable artifact, repository access, or authentication failure.",
      confirmation: "Inspect the exact failing coordinate, repository URL, HTTP response, and dependency path.",
      resolution: "Correct coordinates or restore authorized repository access and artifact publication."
    },
    {
      symptom: "PluginResolutionException",
      likelyCause: "Missing plugin version, repository policy, network failure, or incompatible plugin.",
      confirmation: "Inspect the plugin coordinate and first causal exception.",
      resolution: "Correct plugin configuration or repository access and use a supported plugin version."
    },
    {
      symptom: "Tests fail only on Jenkins",
      likelyCause: "Environment differences, test ordering, missing services, locale, time zone, or test data.",
      confirmation: "Inspect test reports and compare environment variables, services, and tool versions.",
      resolution: "Fix the test or environment dependency and validate the full test suite."
    },
    {
      symptom: "BUILD FAILURE after JDK update",
      likelyCause: "Compiler release mismatch or plugin/processor incompatibility.",
      confirmation: "Compare mvn -version, compiler settings, and the first plugin or compiler exception.",
      resolution: "Align JDK, release settings, and compatible plugin versions."
    },
    {
      symptom: "OutOfMemoryError",
      likelyCause: "Insufficient JVM heap, memory-heavy tests, excessive parallelism, or container limits.",
      confirmation: "Inspect JVM options, container memory, process termination events, and build phase.",
      resolution: "Tune memory and parallelism based on measurements and the actual resource budget."
    },
    {
      symptom: "Artifact missing after successful build",
      likelyCause: "Wrong module path, unexpected artifact name, classifier, or pipeline archive pattern.",
      confirmation: "Inspect packaging configuration and module target directories.",
      resolution: "Correct the artifact path and verify file type, size, and checksum."
    },
    {
      symptom: "Build passes locally but fails on CI",
      likelyCause: "Different commit, toolchain, profiles, credentials, repository access, or cache.",
      confirmation: "Compare commit SHA, Maven/Java versions, profiles, and sanitized configuration.",
      resolution: "Standardize the build environment and reproduce the same commit."
    },
    {
      symptom: "Maven test phase reports assertion failures",
      likelyCause: "Application behavior differs from the test expectation.",
      confirmation: "Inspect the failing assertion and test inputs.",
      resolution: "Fix the code or correct the test only when the expected behavior has legitimately changed."
    },
    {
      symptom: "Maven test phase reports errors",
      likelyCause: "Exceptions, test setup failure, unavailable dependencies, or environment problems.",
      confirmation: "Inspect the full test stack trace and test report.",
      resolution: "Fix the underlying exception or provision the required test environment."
    },
    {
      symptom: "Quality gate fails",
      likelyCause: "Coverage, static-analysis, security, or policy violation.",
      confirmation: "Inspect the specific report, rule, and threshold.",
      resolution: "Fix the violation or follow the approved exception process."
    },
    {
      symptom: "Multi-module build fails on an internal artifact",
      likelyCause: "Incorrect module declaration, version mismatch, or missing published artifact.",
      confirmation: "Inspect reactor membership, parent POM, and dependency coordinates.",
      resolution: "Correct the module relationship or publish the required artifact through the approved process."
    },
    {
      symptom: "Build fails intermittently during downloads",
      likelyCause: "Repository throttling, transient network failure, proxy, or upstream instability.",
      confirmation: "Correlate HTTP responses, timestamps, and repository health metrics.",
      resolution: "Restore repository health, use bounded retries, and improve dependency caching."
    },
    {
      symptom: "Docker build fails but local Maven succeeds",
      likelyCause: "Different JDK, image, working directory, settings, network, or build context.",
      confirmation: "Inspect Dockerfile stages, image digest, and Maven/Java versions inside the build container.",
      resolution: "Align the build environment and verify the exact containerized build."
    }
  ],

  recoveryProcedures: [
    {
      scenario: "Compilation fails after a code or dependency change",
      steps: [
        "Capture the compiler error and identify the failing module and source location.",
        "Compare the changed code and dependency versions with the last known-good commit.",
        "Check Java version, compiler release, and API compatibility.",
        "Apply the smallest correction in a reviewable branch.",
        "Avoid broad dependency upgrades until the exact incompatible component is identified."
      ],
      validation: [
        "Run focused compilation.",
        "Run unit tests and the full Maven verification lifecycle.",
        "Inspect the final dependency tree where relevant.",
        "Run integration and application startup tests."
      ],
      rollback: [
        "Revert the targeted source or dependency change if validation fails.",
        "Preserve the last approved artifact.",
        "Do not promote an unverified build."
      ]
    },
    {
      scenario: "Repository or plugin downloads fail",
      steps: [
        "Identify the failing artifact or plugin coordinate.",
        "Check the exact repository URL, status code, mirror configuration, and server ID.",
        "Verify DNS, proxy, TLS, credentials, and repository-manager health.",
        "Ask the repository owner to repair upstream or cached artifact issues when necessary.",
        "Retry with bounded attempts only after identifying a plausible transient failure."
      ],
      validation: [
        "Confirm the exact dependency or plugin can be resolved.",
        "Run the original failing Maven goal.",
        "Verify artifact integrity and ensure credentials remain protected."
      ],
      rollback: [
        "Restore the last approved repository configuration if a recent change caused the issue.",
        "Keep the previous verified artifact available.",
        "Hold release promotion while dependencies remain unverified."
      ]
    },
    {
      scenario: "Tests fail after a release change",
      steps: [
        "Inspect Surefire and Failsafe reports.",
        "Determine whether the failure is an assertion, exception, timeout, or missing service.",
        "Reproduce the failing test in isolation.",
        "Compare the previous and current code, test data, JDK, and environment.",
        "Correct the behavior or test environment without permanently disabling the test."
      ],
      validation: [
        "Run the failing test in isolation.",
        "Run the full suite to detect ordering and shared-state problems.",
        "Run integration tests and verify the release gates."
      ],
      rollback: [
        "Revert the targeted change if the issue cannot be safely fixed in the release window.",
        "Use the last approved artifact according to the deployment policy.",
        "Create a tracked follow-up for any deferred test defect."
      ]
    },
    {
      scenario: "Build agent runs out of memory",
      steps: [
        "Identify the phase and exact memory error.",
        "Inspect agent/container limits, JVM heap settings, and forked test processes.",
        "Check whether parallelism or generated source volume increased.",
        "Tune heap and concurrency based on measured resource use.",
        "Separate resource pressure from a genuine application memory leak."
      ],
      validation: [
        "Run the build while monitoring JVM and container memory.",
        "Verify the build and test results.",
        "Confirm other jobs sharing the agent are not starved of resources."
      ],
      rollback: [
        "Restore previous resource settings if the new values destabilize the agent.",
        "Use a known-good agent image if a recent image change caused the problem.",
        "Preserve heap dumps only according to secure handling requirements."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "The build fails after a parent POM update",
      investigation: [
        "Compare the old and new parent POM versions.",
        "Inspect effective compiler settings, pluginManagement, dependencyManagement, and profiles.",
        "Identify all child modules affected by the shared configuration.",
        "Compare the first error in each failing module."
      ],
      resolution: [
        "Correct the shared parent configuration or update the affected modules deliberately.",
        "Test the full reactor rather than validating only one child.",
        "Avoid changing the parent version again without identifying the original cause."
      ],
      prevention: [
        "Add multi-module verification to CI.",
        "Review shared parent changes for downstream impact.",
        "Use controlled dependency and plugin upgrades."
      ]
    },
    {
      scenario: "A clean build fails but a warm-cache build succeeds",
      investigation: [
        "Compare the configured repositories and the local cache state.",
        "Check whether an internal artifact was installed manually but never published.",
        "Inspect snapshots, mutable versions, plugin versions, and repository metadata.",
        "Reproduce in an isolated local repository."
      ],
      resolution: [
        "Publish required artifacts to the approved repository.",
        "Correct repository routing or missing metadata.",
        "Pin appropriate versions and avoid relying on workstation-specific artifacts."
      ],
      prevention: [
        "Run clean builds regularly on isolated CI agents.",
        "Use managed repository caching.",
        "Track internal artifact publication and retention."
      ]
    },
    {
      scenario: "Build passes but the published artifact is wrong",
      investigation: [
        "Check module packaging configuration, version, classifier, and artifact path.",
        "Compare the published checksum with the local build artifact.",
        "Inspect pipeline archive and upload patterns.",
        "Verify whether a stale artifact from an earlier run was reused."
      ],
      resolution: [
        "Correct artifact selection and ensure publication uses the current successful build output.",
        "Republish only under the approved artifact versioning and repository policy.",
        "Do not overwrite immutable release coordinates with different content."
      ],
      prevention: [
        "Record artifact checksums and source commit SHA.",
        "Use unique build outputs and controlled promotion stages.",
        "Verify artifact identity before deployment."
      ]
    },
    {
      scenario: "A Maven build fails only under parallel execution",
      investigation: [
        "Compare serial and parallel build results in a controlled environment.",
        "Inspect shared temporary files, test ports, generated outputs, and inter-module dependencies.",
        "Check whether tests depend on execution order or shared databases.",
        "Measure resource usage during parallel execution."
      ],
      resolution: [
        "Fix shared-state or ordering assumptions.",
        "Correct reactor dependency declarations.",
        "Adjust parallelism temporarily if required while a durable fix is developed."
      ],
      prevention: [
        "Make tests isolated and repeatable.",
        "Use unique test resources and reliable cleanup.",
        "Set CI concurrency based on agent capacity."
      ]
    },
    {
      scenario: "A build fails after a repository manager outage",
      investigation: [
        "Correlate failures with repository health and HTTP response codes.",
        "Identify whether missing artifacts are absent remotely or merely unreachable.",
        "Check cache health and upstream connectivity.",
        "Determine whether failed builds produced any partial release outputs."
      ],
      resolution: [
        "Restore repository service and validate exact dependency availability.",
        "Rerun the build after the service is healthy.",
        "Verify the produced artifact before promotion."
      ],
      prevention: [
        "Monitor repository availability, latency, disk usage, and error rates.",
        "Use approved repository proxies and caching.",
        "Define escalation and recovery procedures for repository outages."
      ]
    },
    {
      scenario: "Build succeeds but deployment health checks fail",
      investigation: [
        "Confirm that the deployed artifact matches the validated build.",
        "Inspect application startup logs and runtime Java version.",
        "Check configuration, secrets, ports, database access, and dependent services.",
        "Compare deployment configuration with the last known-good release."
      ],
      resolution: [
        "Separate build failures from deployment and runtime failures.",
        "Fix the confirmed configuration or compatibility issue.",
        "Use staged rollout and application health checks."
      ],
      prevention: [
        "Add smoke tests and deployment verification.",
        "Promote the same immutable artifact across environments.",
        "Monitor startup exceptions, latency, error rate, and readiness."
      ]
    },
    {
      scenario: "A security scan blocks the build",
      investigation: [
        "Identify the vulnerable dependency, affected version, severity, and exploitability.",
        "Check whether the component is direct, transitive, test-only, or runtime.",
        "Review the scanner policy and approved exception process.",
        "Determine whether a fixed compatible version is available."
      ],
      resolution: [
        "Upgrade to a supported fixed version or use an approved mitigation.",
        "Run compatibility tests after dependency changes.",
        "Document any formally approved temporary exception."
      ],
      prevention: [
        "Integrate dependency scanning into CI.",
        "Set remediation SLAs and ownership.",
        "Generate and retain software bill of materials data when required."
      ]
    }
  ],

  monitoringAndPrevention: [
    "Standardize Maven and Java through the Maven Wrapper and approved CI images.",
    "Pin Maven plugin versions and document the supported Java release.",
    "Run a toolchain preflight before compilation.",
    "Use clean CI workspaces periodically to detect hidden cache dependencies.",
    "Cache dependencies through an approved repository manager.",
    "Monitor repository errors, latency, throttling, storage, and proxy health.",
    "Publish test reports and preserve the first causal build error.",
    "Run unit, integration, packaging, and runtime smoke tests.",
    "Keep quality and security gates enabled.",
    "Track build duration, failure rate, flaky tests, and failure category by module.",
    "Use dependency convergence and vulnerability checks where appropriate.",
    "Record commit SHA, toolchain, container image digest, artifact version, and checksum.",
    "Make generated sources and build inputs deterministic.",
    "Avoid mutable release dependencies and uncontrolled plugin versions.",
    "Review parent POM, BOM, JDK, and base-image changes before broad rollout.",
    "Maintain a last known-good artifact and documented rollback procedure."
  ],

  incidentRunbook: [
    "1. Acknowledge the build incident and record the pipeline URL and timestamp.",
    "2. Confirm the affected repository, commit, module, environment, and release stage.",
    "3. Capture the full Maven output and identify the first causal error.",
    "4. Record Maven, Java, compiler, agent, and container versions.",
    "5. Identify the failing lifecycle phase and plugin or dependency.",
    "6. Inspect recent source, POM, parent, profile, toolchain, and image changes.",
    "7. Check repository, credentials, cache, resource, and test environment where relevant.",
    "8. Apply the smallest evidence-supported correction.",
    "9. Run focused diagnostics followed by the complete required verification lifecycle.",
    "10. Verify artifact identity, checksum, security results, and runtime compatibility.",
    "11. Promote the validated artifact or restore the last known-good artifact according to policy.",
    "12. Monitor post-deployment health and record the incident report."
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Diagnose a compile failure",
      objective: "Identify the first compiler error and its source location.",
      steps: [
        "Use a disposable branch or sample project.",
        "Introduce a harmless, controlled source compilation error.",
        "Run mvn -B -ntp compile.",
        "Read the first compiler error and locate the source file and line.",
        "Correct the test error and rerun compilation."
      ],
      expectedResult:
        "The learner identifies a source compilation failure without changing unrelated Maven configuration."
    },
    {
      title: "Lab 2 — Inspect Maven lifecycle phases",
      objective: "Understand how build failures map to lifecycle phases.",
      steps: [
        "Run validate, compile, test, package, and verify on a sample project.",
        "Record the output artifact and reports from each relevant phase.",
        "Introduce a controlled test failure in a disposable branch.",
        "Identify the first phase that fails.",
        "Restore the test and rerun the full lifecycle."
      ],
      expectedResult:
        "The learner can isolate a failure by lifecycle phase and understands that earlier success does not prove release readiness."
    },
    {
      title: "Lab 3 — Reproduce dependency resolution failure",
      objective: "Understand missing coordinates and repository diagnostics.",
      steps: [
        "Use a disposable project with a deliberately invalid dependency version.",
        "Run Maven and capture the failing coordinate.",
        "Inspect the configured repository and the complete error.",
        "Restore the valid coordinate.",
        "Rerun the original failing goal."
      ],
      expectedResult:
        "The learner distinguishes a missing artifact from a compiler or test failure."
    },
    {
      title: "Lab 4 — Investigate CI environment drift",
      objective: "Compare local and CI toolchains.",
      steps: [
        "Capture Java, compiler, Maven, and commit information from a local build.",
        "Capture the same information from a test CI agent.",
        "Compare versions, active profiles, and image identity.",
        "Correct one intentional environment mismatch in a test pipeline.",
        "Verify the full build on the standardized toolchain."
      ],
      expectedResult:
        "The learner identifies environment differences with evidence rather than guessing."
    },
    {
      title: "Lab 5 — Troubleshoot failing tests",
      objective: "Separate test assertion failures from test environment errors.",
      steps: [
        "Use a sample project with a controlled failing test.",
        "Run the test phase and inspect Surefire reports.",
        "Run the failing test in isolation.",
        "Determine whether the issue is behavior, setup, shared state, or an external service.",
        "Fix the test or code and rerun the full suite."
      ],
      expectedResult:
        "The learner uses test reports and repeatable reproduction instead of permanently skipping tests."
    },
    {
      title: "Lab 6 — Inspect a multi-module reactor",
      objective: "Understand internal module dependencies and reactor order.",
      steps: [
        "Use a disposable multi-module Maven project.",
        "Make one module depend on another internal module.",
        "Run the dependent module alone.",
        "Run the correct build with -pl and -am.",
        "Compare results and inspect module versions."
      ],
      expectedResult:
        "The learner explains reactor order and missing internal artifact issues."
    },
    {
      title: "Lab 7 — Diagnose a memory-constrained build",
      objective: "Understand heap and container memory limits.",
      steps: [
        "Use an isolated test build agent with a controlled memory limit.",
        "Capture the failure phase and memory metrics.",
        "Compare heap settings with the actual container or agent budget.",
        "Adjust parallelism or heap in a test environment.",
        "Repeat the build while monitoring memory."
      ],
      expectedResult:
        "The learner identifies resource constraints and avoids blindly increasing JVM memory."
    },
    {
      title: "Lab 8 — Create a CI build preflight",
      objective: "Prevent avoidable toolchain and configuration failures.",
      steps: [
        "Create a test pipeline using a fixed commit.",
        "Record Java, Maven, and agent image versions.",
        "Run validation and compilation before tests and packaging.",
        "Publish sanitized reports and fail the pipeline on required checks.",
        "Verify that only the validated artifact can enter the release stage."
      ],
      expectedResult:
        "The learner creates a traceable build pipeline with early diagnostics and release controls."
    }
  ],

  interviewQuestions: [
    {
      question: "1. What is a Maven build failure?",
      answer:
        "It occurs when Maven cannot complete a requested lifecycle or goal because of source errors, configuration problems, dependency resolution, test failures, plugin failures, or resource limits."
    },
    {
      question: "2. What is the first step when Maven reports BUILD FAILURE?",
      answer:
        "Find the first meaningful error and identify the failing phase, module, plugin, and causal exception. The final summary is not necessarily the root cause."
    },
    {
      question: "3. What is the Maven lifecycle?",
      answer:
        "It is a sequence of build phases. Common phases include validate, compile, test, package, verify, install, and deploy."
    },
    {
      question: "4. What is the difference between package, verify, install, and deploy?",
      answer:
        "package creates the artifact, verify runs preceding phases and verification checks, install places the artifact in the local repository, and deploy publishes it to a configured remote repository."
    },
    {
      question: "5. Why does Maven work locally but fail in Jenkins?",
      answer:
        "Possible causes include different commits, Java or Maven versions, profiles, settings.xml, credentials, network access, filesystem behavior, and cached artifacts."
    },
    {
      question: "6. How do you troubleshoot dependency resolution?",
      answer:
        "Capture the exact artifact coordinates and repository URL, inspect dependency paths, and check publication, credentials, mirror settings, network, and repository health."
    },
    {
      question: "7. What is the difference between a dependency and a plugin?",
      answer:
        "A project dependency is used by application or test code. A Maven plugin executes build tasks and has its own resolution and compatibility requirements."
    },
    {
      question: "8. What does mvn -e do?",
      answer:
        "It requests fuller exception information, which can help identify the underlying cause of a failed goal."
    },
    {
      question: "9. What does mvn -X do?",
      answer:
        "It enables debug logging. Logs can expose sensitive configuration, so redact them before sharing."
    },
    {
      question: "10. What does -B mean?",
      answer:
        "It enables batch mode, which is useful for non-interactive CI environments."
    },
    {
      question: "11. What does -ntp mean?",
      answer:
        "It disables Maven transfer-progress output, making CI logs easier to read."
    },
    {
      question: "12. What does -U do?",
      answer:
        "It requests update checks for snapshots and missing releases. It is not a universal fix for repository or cache problems."
    },
    {
      question: "13. How do you troubleshoot a failing unit test?",
      answer:
        "Inspect the test report and stack trace, reproduce the failure in isolation, compare the environment and test data, and then run the complete suite after correction."
    },
    {
      question: "14. Should you skip tests to fix a build?",
      answer:
        "No. Skipping tests can help isolate a phase during diagnosis but does not prove the artifact is safe to release. Required tests must pass before release."
    },
    {
      question: "15. What is a multi-module Maven project?",
      answer:
        "It is a project composed of related modules managed by an aggregator or parent POM. Module dependencies and reactor order influence the build."
    },
    {
      question: "16. What do -pl and -am do?",
      answer:
        "-pl selects projects in the reactor and -am also builds projects required by the selected projects."
    },
    {
      question: "17. How do you troubleshoot OutOfMemoryError?",
      answer:
        "Identify the failing process and phase, inspect heap settings and container limits, and measure resource usage before changing heap or parallelism."
    },
    {
      question: "18. Why can a build succeed but deployment fail?",
      answer:
        "The artifact may be incompatible with the runtime, have missing configuration, use incorrect deployment settings, or fail health checks."
    },
    {
      question: "19. What is the purpose of the Maven Wrapper?",
      answer:
        "It standardizes the Maven distribution used by the project. Java, settings, environment, and operating-system differences still need to be controlled."
    },
    {
      question: "20. What is the effective POM?",
      answer:
        "It is the resulting project model after parent inheritance, profiles, properties, and plugin and dependency management are applied."
    },
    {
      question: "21. How do you troubleshoot a missing JAR or WAR?",
      answer:
        "Inspect the packaging phase, module output directory, finalName, classifier, and CI artifact path. Verify the file and checksum before publication."
    },
    {
      question: "22. What should you do after a shared repository outage?",
      answer:
        "Confirm repository health, validate exact dependencies, rerun the original build, verify the artifact, and promote only after required checks pass."
    },
    {
      question: "23. How do you investigate flaky tests?",
      answer:
        "Compare isolated and suite execution, examine shared state and timing, reproduce repeatedly, and correct the nondeterministic behavior."
    },
    {
      question: "24. What is a safe production build rollback?",
      answer:
        "Restore the last approved artifact or revert the targeted change according to the release policy, while preserving logs and incident evidence."
    },
    {
      question: "25. How do you prevent recurring Maven failures?",
      answer:
        "Standardize toolchains, pin plugin versions, monitor repository health, run clean CI builds, publish test reports, and track recurring failure categories."
    },
    {
      question: "26. What information belongs in a build incident report?",
      answer:
        "Impact, timeline, commit, toolchain, failing phase, causal error, evidence, root cause, corrective action, validation, artifact identity, and prevention owners."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Date and time detected:",
    "Affected repository and module:",
    "Branch and commit SHA:",
    "Pipeline URL and build number:",
    "Agent or container image:",
    "Java version:",
    "Maven version:",
    "Exact Maven command:",
    "Failing lifecycle phase and plugin:",
    "First causal error:",
    "Dependency or repository involved:",
    "Customer or release impact:",
    "Severity and incident owner:",
    "Evidence collected:",
    "Confirmed root cause:",
    "Corrective change and reviewer:",
    "Validation commands and results:",
    "Artifact version and checksum:",
    "Rollback or recovery decision:",
    "Preventive actions, owners, and deadlines:"
  ],

  officialReferences: [
    "Maven lifecycle guide: https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html",
    "Maven POM reference: https://maven.apache.org/pom.html",
    "Maven Compiler Plugin: https://maven.apache.org/plugins/maven-compiler-plugin/",
    "Maven Dependency Plugin: https://maven.apache.org/plugins/maven-dependency-plugin/",
    "Maven settings reference: https://maven.apache.org/settings.html",
    "Maven Wrapper: https://maven.apache.org/wrapper/",
    "Maven Surefire Plugin: https://maven.apache.org/surefire/maven-surefire-plugin/",
    "Maven Failsafe Plugin: https://maven.apache.org/surefire/maven-failsafe-plugin/",
    "Maven Enforcer Plugin: https://maven.apache.org/enforcer/maven-enforcer-plugin/",
    "Docker build documentation: https://docs.docker.com/build/",
    "Jenkins Pipeline documentation: https://www.jenkins.io/doc/book/pipeline/",
    "OWASP Dependency-Check: https://owasp.org/www-project-dependency-check/"
  ]
};
