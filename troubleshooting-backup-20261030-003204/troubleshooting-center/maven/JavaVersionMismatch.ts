export interface JavaVersionMismatchGuide {
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

export const javaVersionMismatchGuide: JavaVersionMismatchGuide = {
  title: "Java Version Mismatch — Production Troubleshooting",
  category: "Maven / Java / Jenkins / Docker / CI-CD",
  severity: "SEV-2 or SEV-3 depending on release impact",

  overview: `
Java version mismatch occurs when the JDK/JRE used by the shell, Maven,
compiler, test runner, build agent, container, or production runtime does not
match the version required by the project.

Typical failures include:
- invalid target release
- release version not supported
- Source option is no longer supported
- Unsupported class file major version
- UnsupportedClassVersionError
- No compiler is provided in this environment
- JAVA_HOME is not defined correctly
- Maven uses a different Java version than the terminal
- Tests pass locally but fail on Jenkins
- Build succeeds but the application fails during production startup
- Annotation processors or Maven plugins fail on a newer JDK
- A multi-module project compiles different modules with incompatible settings

Important distinctions:
1. Maven runtime JDK: Java running Maven itself.
2. Compiler JDK: Java compiler used to compile application source code.
3. Target bytecode level: Java class-file level produced by the compiler.
4. API compatibility level: Java APIs available to compiled source.
5. Test runtime JDK: Java used to execute tests.
6. Production runtime: Java used to run the packaged application.

These versions can differ, but every difference must be intentional and supported.
Setting source and target values alone does not guarantee compatibility with the
older Java API. Prefer the compiler release option when supported.
`,

  incidentScenario: [
    "A previously successful Jenkins pipeline starts failing after an agent image update.",
    "A developer upgrades to JDK 21, but the project requires Java 17.",
    "Maven reports invalid target release: 21 even though java -version shows Java 21.",
    "A project compiles locally but fails with UnsupportedClassVersionError in production.",
    "A Docker build uses a newer JDK than the final runtime image.",
    "A parent POM changes maven.compiler.release and breaks several child modules.",
    "A Maven plugin or annotation processor fails after a JDK upgrade.",
    "An application rollout is blocked because the artifact requires a newer Java runtime than the production servers provide."
  ],

  impactAssessment: [
    "Identify the affected service, repository, branch, commit SHA, module, pipeline, and environment.",
    "Determine whether the failure happens during Maven startup, compilation, tests, packaging, container creation, or application startup.",
    "Check whether all agents are affected or only agents using a recently updated image.",
    "Determine whether the artifact was built, published, deployed, or partially rolled out.",
    "Compare the last known-good build with the failing build and identify JDK, Maven, image, or POM changes.",
    "Assess whether production instances are still healthy and whether the new artifact is compatible with the current runtime.",
    "Pause release promotion when compatibility is unverified. Do not upgrade production Java during an incident without an approved rollout plan."
  ],

  safetyChecks: [
    "Confirm the correct repository, branch, commit, module, and target environment.",
    "Record the required Java version from project documentation, parent POM, toolchain configuration, and deployment standard.",
    "Check whether Java is managed by a version manager, CI image, build toolchain, or operating-system package.",
    "Do not change the system-wide JAVA_HOME on a shared production server without impact analysis.",
    "Do not uninstall an existing JDK before confirming all services and build jobs that depend on it.",
    "Do not assume java -version and javac -version refer to the same installation.",
    "Do not assume Maven uses the same Java as the interactive terminal.",
    "Do not change compiler release, source, and target values merely to silence a compilation error.",
    "Do not deploy Java bytecode to a runtime that cannot load it.",
    "Keep a last known-good JDK image, build artifact, and deployment configuration available for rollback.",
    "Avoid printing environment dumps that may expose credentials or unrelated secrets."
  ],

  evidenceCollection: [
    "Capture the exact error message and the first meaningful compiler or plugin exception.",
    "Record timestamp, pipeline URL, agent name, commit SHA, branch, module, Maven goal, and exit code.",
    "Capture mvn -version, java -version, javac -version, and the Maven Wrapper version.",
    "Record JAVA_HOME, PATH resolution, Maven toolchain configuration, and active profiles.",
    "Inspect the POM hierarchy for maven.compiler.release, maven.compiler.source, maven.compiler.target, and compiler plugin versions.",
    "Capture the test runtime, container build image, final runtime image, and production java -version.",
    "Compare the last successful pipeline's agent image and toolchain with the failing pipeline.",
    "Capture the artifact class-file version or inspect compiled classes when the error indicates a bytecode mismatch.",
    "Preserve logs before changing the JDK or rebuilding the artifact."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Classify the failure stage",
      objective:
        "Identify whether the mismatch occurs in Maven startup, compilation, tests, packaging, or runtime.",
      commands: [
        "mvn -B -ntp clean verify",
        "mvn -version"
      ],
      interpretOutput: [
        "If Maven does not start, investigate its runtime Java requirement and JAVA_HOME.",
        "If compilation reports invalid target release, the compiler likely does not support the requested release.",
        "If tests fail with UnsupportedClassVersionError, inspect the test JVM and the class being loaded.",
        "If the application fails after deployment, inspect the production JVM and the bytecode level of the deployed artifact."
      ],
      nextAction: [
        "Record the exact phase and first causal exception.",
        "Do not change production runtime settings until the failing component is identified.",
        "Continue with executable and environment checks."
      ]
    },
    {
      step: 2,
      title: "Inspect the Java used by the shell",
      objective:
        "Find which Java executable the current terminal resolves.",
      commands: [
        "java -version",
        "javac -version",
        "where.exe java",
        "where.exe javac",
        "echo $env:JAVA_HOME"
      ],
      interpretOutput: [
        "java -version reports the runtime executable found through the current environment.",
        "javac -version reports the compiler executable selected by PATH.",
        "Multiple results from where.exe can indicate several JDK installations.",
        "A missing javac often indicates that a JRE-only installation or an incorrect PATH is being used.",
        "JAVA_HOME should point to the intended JDK installation directory, not its bin directory."
      ],
      nextAction: [
        "Compare the resolved Java and compiler paths.",
        "Confirm that JAVA_HOME refers to the required JDK.",
        "If multiple installations exist, establish which one the project and build agent should use before editing PATH."
      ]
    },
    {
      step: 3,
      title: "Inspect Maven's runtime Java",
      objective:
        "Verify the JVM Maven actually runs on.",
      commands: [
        "mvn -version",
        ".\\mvnw.cmd -version"
      ],
      interpretOutput: [
        "Maven reports its own version, Java version, and Java home.",
        "Maven may run on a different JDK from the one expected by the shell.",
        "The Maven Wrapper may select the same Maven distribution as global Maven but still use the Java provided by its environment.",
        "If global Maven and the wrapper report different Java homes, investigate their launch environments."
      ],
      nextAction: [
        "Use the project's documented Maven Wrapper when appropriate.",
        "Compare the Maven Java home with the required toolchain.",
        "Check IDE launch settings and CI agent environment if Maven uses an unexpected JDK."
      ]
    },
    {
      step: 4,
      title: "Inspect environment variables and PATH",
      objective:
        "Find stale paths, incorrect JAVA_HOME, and shell-specific configuration differences.",
      commands: [
        "echo $env:JAVA_HOME",
        "$env:PATH -split ';'",
        "Get-Command java -All",
        "Get-Command javac -All"
      ],
      interpretOutput: [
        "Get-Command can reveal PowerShell aliases, functions, or multiple executable locations.",
        "A stale Java path earlier in PATH may override the intended JDK.",
        "A terminal opened before an environment change may retain an old environment.",
        "A service or Jenkins agent can run with environment variables different from an interactive login."
      ],
      nextAction: [
        "Correct the user, process, service, or CI configuration at the proper scope.",
        "Restart the relevant terminal or agent service only when authorized.",
        "Re-run the executable and Maven version checks after the change."
      ]
    },
    {
      step: 5,
      title: "Inspect compiler release and source settings",
      objective:
        "Determine which Java language and bytecode level the project requests.",
      commands: [
        "git diff -- pom.xml",
        "git grep -n -E 'maven.compiler.release|maven.compiler.source|maven.compiler.target|<release>|<source>|<target>' -- '**/pom.xml'"
      ],
      interpretOutput: [
        "maven.compiler.release requests a language, bytecode, and platform API level when supported by the compiler.",
        "source and target specify language and bytecode levels but do not by themselves guarantee older Java API compatibility.",
        "A property may be inherited from a parent POM or overridden by a profile.",
        "A child module can override the parent compiler settings."
      ],
      nextAction: [
        "Compare the requested release with the actual compiler JDK.",
        "Inspect the parent and child POMs before editing a property.",
        "Choose the release based on the supported application runtime, not merely the newest installed JDK."
      ]
    },
    {
      step: 6,
      title: "Inspect the effective POM and active profiles",
      objective:
        "Find inherited compiler configuration or profile-based overrides.",
      commands: [
        "mvn help:effective-pom -Doutput=effective-pom.xml",
        "mvn help:active-profiles"
      ],
      interpretOutput: [
        "The effective POM combines parent configuration, properties, plugin management, and active profiles.",
        "A compiler release value may come from a parent POM rather than the module's own POM.",
        "An environment-specific profile can change the target release unexpectedly.",
        "These diagnostic goals may themselves fail if the Help Plugin cannot be downloaded."
      ],
      nextAction: [
        "Inspect the generated effective POM locally.",
        "Compare active profiles between working and failing environments.",
        "If the Help Plugin cannot resolve, inspect the source POM hierarchy and Maven debug logs."
      ]
    },
    {
      step: 7,
      title: "Check Maven Compiler Plugin configuration",
      objective:
        "Verify the compiler plugin version and the JDK capabilities it needs.",
      commands: [
        "mvn -X -B -ntp -pl <module-name> -am compile"
      ],
      interpretOutput: [
        "Invalid target release commonly means the selected compiler cannot compile for the requested release.",
        "The debug output can show which compiler executable or compiler implementation is used.",
        "Plugin configuration may specify fork, executable, source, target, release, or toolchain-related settings.",
        "A plugin may have its own JDK compatibility requirements."
      ],
      nextAction: [
        "Confirm the compiler plugin version supports the configured JDK and release.",
        "Check whether forked compilation points to a different javac executable.",
        "Align the compiler and release settings with the project's supported Java version."
      ]
    },
    {
      step: 8,
      title: "Inspect Maven Toolchains",
      objective:
        "Determine whether Maven selects a separate JDK for compilation.",
      commands: [
        "Get-Content .\\toolchains.xml",
        "Get-Content .\\$env:USERPROFILE\\.m2\\toolchains.xml",
        "mvn -X -B -ntp compile"
      ],
      interpretOutput: [
        "A Maven toolchains configuration can select a JDK independently of the JVM running Maven.",
        "A toolchain may reference a JDK path that no longer exists on an updated agent.",
        "A compiler plugin must be configured to use the toolchain for that selection to affect compilation.",
        "The project or user toolchain file may be absent; check the actual configured path rather than assuming both locations exist."
      ],
      nextAction: [
        "Verify the configured JDK path exists and has the required version.",
        "Confirm the compiler plugin is using the selected toolchain.",
        "Update the agent configuration through the approved infrastructure process."
      ]
    },
    {
      step: 9,
      title: "Inspect Java compatibility across modules",
      objective:
        "Find inconsistent Java settings in a multi-module reactor.",
      commands: [
        "mvn -B -ntp -pl <module-name> -am validate",
        "git grep -n -E 'maven.compiler.release|maven.compiler.source|maven.compiler.target' -- '**/pom.xml'"
      ],
      interpretOutput: [
        "A parent POM can define common compiler settings while a child module overrides them.",
        "One module may compile with a newer release than another.",
        "A module can compile successfully but fail when its classes are consumed by a module running an older JDK."
      ],
      nextAction: [
        "Define the intended Java baseline centrally where possible.",
        "Identify modules that intentionally require a newer Java version.",
        "Validate all downstream consumers before changing the shared parent configuration."
      ]
    },
    {
      step: 10,
      title: "Check tests and test runtime",
      objective:
        "Determine whether tests execute with a different Java version from compilation.",
      commands: [
        "mvn -B -ntp -DskipTests compile",
        "mvn -B -ntp test"
      ],
      interpretOutput: [
        "If compilation succeeds but tests fail, inspect the JVM used by the test runner.",
        "Surefire or Failsafe configuration, forked JVM settings, and CI environment variables can influence the test runtime.",
        "Skipping tests is a diagnostic isolation step only; it is not evidence that a release is safe."
      ],
      nextAction: [
        "Check the Java executable used by the test process.",
        "Review Surefire/Failsafe plugin configuration and any forked JVM options.",
        "Run the complete required test suite after correcting the environment."
      ]
    },
    {
      step: 11,
      title: "Diagnose UnsupportedClassVersionError",
      objective:
        "Identify a class compiled for a newer Java version than the runtime supports.",
      commands: [
        "javap -verbose <fully-qualified-class-name>",
        "java -version"
      ],
      interpretOutput: [
        "UnsupportedClassVersionError indicates a class-file compatibility issue.",
        "javap -verbose can display the class-file major version.",
        "A class may come from a third-party dependency rather than the project's own output.",
        "The failing runtime may be a container, application server, test JVM, or production host."
      ],
      nextAction: [
        "Identify the exact class and its containing JAR.",
        "Determine which Java version produced that class.",
        "Either use a supported dependency version or move the runtime to an approved compatible JDK after impact assessment."
      ]
    },
    {
      step: 12,
      title: "Inspect Docker build and runtime images",
      objective:
        "Verify that the build image and final runtime image are compatible.",
      commands: [
        "docker image inspect <image-name>",
        "docker run --rm <build-image> java -version",
        "docker run --rm <runtime-image> java -version",
        "docker build --no-cache -t <test-image> ."
      ],
      interpretOutput: [
        "A multi-stage build can compile with one JDK and run with a different runtime image.",
        "A runtime image may be older than the build image.",
        "An image tag can move over time if it is not pinned to an immutable digest.",
        "The Java version in a developer shell does not establish the version inside the container."
      ],
      nextAction: [
        "Inspect the Dockerfile's build and runtime stages.",
        "Align the target release with the final runtime image.",
        "Use approved image tags or digests and rebuild the image.",
        "Test the exact image intended for deployment."
      ]
    },
    {
      step: 13,
      title: "Inspect Jenkins or CI agent configuration",
      objective:
        "Find differences between the declared JDK and the JDK actually used by the job.",
      commands: [
        "mvn -version",
        "java -version",
        "javac -version",
        "where.exe java"
      ],
      interpretOutput: [
        "The Jenkins controller, build agent, shell step, and container can have different Java installations.",
        "A configured Jenkins JDK tool may not be selected by the failing pipeline stage.",
        "A long-running agent may retain old environment configuration until restarted.",
        "An agent image update can affect many repositories simultaneously."
      ],
      nextAction: [
        "Inspect the Jenkins tool configuration and pipeline environment.",
        "Compare the failing agent with a known-good agent.",
        "Correct the pipeline or agent image declaratively rather than relying on manual machine changes.",
        "Re-run on a controlled agent and retain the tool versions in the build log."
      ]
    },
    {
      step: 14,
      title: "Check annotation processors and Maven plugins",
      objective:
        "Isolate failures caused by compiler plugins or code-generation libraries.",
      commands: [
        "mvn -X -B -ntp -pl <module-name> -am compile",
        "mvn -B -ntp dependency:tree"
      ],
      interpretOutput: [
        "Annotation processors such as code generators may have their own JDK compatibility requirements.",
        "Older plugins can use JDK internals that change between Java releases.",
        "The failure may occur in a plugin before application code is compiled.",
        "The dependency tree goal may fail if the plugin itself cannot be resolved."
      ],
      nextAction: [
        "Identify the failing plugin or processor from the stack trace.",
        "Check vendor compatibility notes for the selected JDK.",
        "Upgrade to a supported plugin version in a controlled branch and run regression tests.",
        "Avoid changing the application target release when the real cause is a broken plugin."
      ]
    },
    {
      step: 15,
      title: "Inspect third-party dependency bytecode",
      objective:
        "Find libraries that require a newer Java runtime than the application supports.",
      commands: [
        "mvn dependency:tree -Dverbose",
        "javap -verbose -classpath <path-to-jar> <fully-qualified-class-name>"
      ],
      interpretOutput: [
        "A dependency can be compiled for a newer Java version than the application's own source.",
        "The dependency tree identifies candidate libraries but does not alone prove which class caused the failure.",
        "Multi-release JARs can contain version-specific classes; inspect them carefully before drawing conclusions."
      ],
      nextAction: [
        "Map the failing class to its JAR and artifact version.",
        "Consult the library's Java compatibility requirements.",
        "Select a compatible supported release or update the application runtime through the approved process."
      ]
    },
    {
      step: 16,
      title: "Check bytecode and platform API compatibility",
      objective:
        "Avoid the false assumption that matching source and target values guarantee runtime compatibility.",
      commands: [
        "javac --help",
        "javac --release <supported-version> -d target/test-classes <source-file.java>"
      ],
      interpretOutput: [
        "The release option restricts language features, generated bytecode, and available platform APIs for the specified release.",
        "Source and target alone do not prevent all accidental references to newer platform APIs.",
        "The compiler must support the selected release."
      ],
      nextAction: [
        "Use the compiler release option where supported by the chosen compiler.",
        "Ensure the selected JDK can target the required release.",
        "Test on the oldest supported runtime, especially when supporting multiple Java versions."
      ]
    },
    {
      step: 17,
      title: "Compare with the last known-good build",
      objective:
        "Isolate the change that introduced the mismatch.",
      commands: [
        "git log -n 10 --oneline",
        "git diff <last-good-commit>..HEAD -- pom.xml",
        "git diff <last-good-commit>..HEAD -- Dockerfile",
        "git diff <last-good-commit>..HEAD -- .github/workflows"
      ],
      interpretOutput: [
        "A parent POM, compiler plugin, agent image, Dockerfile, or workflow change may be responsible.",
        "If the source code is unchanged but the build image changed, investigate the toolchain first.",
        "If the JDK is unchanged but the POM changed, investigate compiler settings and plugin compatibility."
      ],
      nextAction: [
        "Build a hypothesis from the exact change and confirm it with a controlled test.",
        "Avoid reverting unrelated changes.",
        "Use a targeted rollback if the change is confirmed as the cause."
      ]
    },
    {
      step: 18,
      title: "Apply the smallest compatible fix",
      objective:
        "Correct the actual mismatch without hiding compatibility problems.",
      commands: [
        "mvn -B -ntp -pl <module-name> -am clean compile",
        "mvn -B -ntp -pl <module-name> -am test",
        "mvn -B -ntp clean verify"
      ],
      interpretOutput: [
        "A successful compile confirms that the compiler configuration is accepted.",
        "A successful test phase provides additional evidence but does not prove production runtime compatibility.",
        "The full verification lifecycle should pass before release promotion."
      ],
      nextAction: [
        "Validate the chosen JDK, compiler release, plugin versions, and runtime image as one compatible set.",
        "Run integration and application startup tests.",
        "Review dependency security and compatibility reports.",
        "Retain the previous artifact and deployment configuration until validation is complete."
      ]
    },
    {
      step: 19,
      title: "Recover the release safely",
      objective:
        "Restore a known-good build and prevent incompatible artifacts from reaching production.",
      commands: [
        "git diff --check",
        "git status --short",
        "mvn -B -ntp clean verify"
      ],
      interpretOutput: [
        "A clean verification should use the intended commit and approved toolchain.",
        "A passing build is not sufficient if the final runtime image uses an incompatible Java version.",
        "The release artifact must correspond to the tested commit and validated build."
      ],
      nextAction: [
        "Publish only after required quality, compatibility, and security checks pass.",
        "Promote the exact validated artifact through the normal release process.",
        "If the fix is unsafe, revert the targeted change or restore the last known-good artifact.",
        "Document the root cause and preventive actions."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "invalid target release",
      likelyCause: "The selected compiler does not support the configured release.",
      confirmation: "Compare mvn -version, compiler configuration, and the compiler executable selected by Maven.",
      resolution: "Use a compiler JDK that supports the intended release or choose a supported project release after compatibility review."
    },
    {
      symptom: "JAVA_HOME is not defined correctly",
      likelyCause: "JAVA_HOME is missing, stale, or points to an incorrect directory.",
      confirmation: "Inspect JAVA_HOME, resolved Java paths, and Maven's reported Java home.",
      resolution: "Set JAVA_HOME to the intended JDK and ensure PATH resolves the intended executable."
    },
    {
      symptom: "java -version differs from mvn -version",
      likelyCause: "Maven runs under another environment or JDK.",
      confirmation: "Compare Maven's Java home with the shell's resolved Java executable.",
      resolution: "Correct the Maven launcher, CI environment, IDE settings, or agent configuration."
    },
    {
      symptom: "UnsupportedClassVersionError",
      likelyCause: "A class was compiled for a newer Java version than the runtime supports.",
      confirmation: "Identify the failing class and inspect its class-file major version.",
      resolution: "Use a compatible library or deploy on an approved runtime that supports the class."
    },
    {
      symptom: "No compiler is provided in this environment",
      likelyCause: "The selected environment lacks a usable JDK/compiler.",
      confirmation: "Check javac -version, JAVA_HOME, and the actual Java installation path.",
      resolution: "Configure a supported JDK and verify Maven uses it."
    },
    {
      symptom: "Local build passes but CI compilation fails",
      likelyCause: "Different JDK, Maven version, compiler toolchain, profiles, or agent image.",
      confirmation: "Compare tool versions, commit SHA, active profiles, and toolchain settings.",
      resolution: "Standardize the wrapper, JDK toolchain, CI image, and pipeline configuration."
    },
    {
      symptom: "Build passes but production startup fails",
      likelyCause: "The deployed runtime is older than the class-file level or a dependency requirement.",
      confirmation: "Check java -version inside the final runtime environment and inspect the failing class.",
      resolution: "Use a compatible dependency or roll out a supported runtime upgrade with validation."
    },
    {
      symptom: "Tests fail after compilation",
      likelyCause: "Test runner uses a different JVM or a dependency requires a newer runtime.",
      confirmation: "Inspect Surefire/Failsafe configuration and the test process environment.",
      resolution: "Align the test runtime and validate the full test suite."
    },
    {
      symptom: "Maven Compiler Plugin fails on a new JDK",
      likelyCause: "An older plugin or annotation processor is incompatible with the JDK.",
      confirmation: "Inspect the first plugin exception and vendor compatibility notes.",
      resolution: "Upgrade to a supported plugin or processor version in a controlled change."
    },
    {
      symptom: "Only one module fails",
      likelyCause: "Child POM overrides, inconsistent compiler properties, or module-specific plugins.",
      confirmation: "Compare effective configuration and compiler settings across modules.",
      resolution: "Align module settings or document a deliberate module-specific Java baseline."
    },
    {
      symptom: "Docker image fails with UnsupportedClassVersionError",
      likelyCause: "Build and runtime images use incompatible Java versions.",
      confirmation: "Run java -version in both images and inspect the deployed artifact.",
      resolution: "Align the artifact release and runtime image; rebuild and retest the image."
    },
    {
      symptom: "New dependency requires a newer Java version",
      likelyCause: "A transitive or direct library has raised its minimum supported JDK.",
      confirmation: "Map the failing class to its JAR and check the vendor compatibility matrix.",
      resolution: "Select a supported library release or upgrade the application runtime after review."
    }
  ],

  recoveryProcedures: [
    {
      scenario: "Compiler target is newer than the installed compiler",
      steps: [
        "Capture the compiler error and the actual Maven Java home.",
        "Inspect the configured release and compiler plugin version.",
        "Confirm the intended application runtime baseline.",
        "Install or select an approved compiler JDK that supports the target release, or correct the release only if the project requirement was wrong.",
        "Keep the change limited to the relevant toolchain or compiler configuration."
      ],
      validation: [
        "Run mvn -version and javac -version.",
        "Run the focused module compile.",
        "Run unit tests and the complete Maven verification lifecycle.",
        "Run tests on the oldest supported runtime."
      ],
      rollback: [
        "Restore the last known-good compiler configuration if validation fails.",
        "Restore the previous CI image or JDK selection when that change caused the incident.",
        "Do not publish an artifact until runtime compatibility is confirmed."
      ]
    },
    {
      scenario: "Production runtime is older than the compiled artifact",
      steps: [
        "Identify the exact artifact and the class that fails to load.",
        "Confirm the Java version inside the actual production container or host.",
        "Determine whether the intended fix is a compatible artifact or a runtime upgrade.",
        "Assess runtime upgrade compatibility, memory settings, certificates, agents, and service dependencies.",
        "Use the approved deployment and change-management process."
      ],
      validation: [
        "Test the exact artifact against the intended runtime.",
        "Run application startup, health-check, integration, and smoke tests.",
        "Verify monitoring and service dependencies before increasing rollout percentage."
      ],
      rollback: [
        "If runtime upgrade validation fails, restore the previous approved runtime image or configuration.",
        "If the new artifact is incompatible, redeploy the last known-good artifact according to the release policy.",
        "Do not mix unverified runtime and application changes during recovery."
      ]
    },
    {
      scenario: "Jenkins agent unexpectedly selects the wrong JDK",
      steps: [
        "Capture mvn -version, java -version, javac -version, and the agent identity.",
        "Inspect the Jenkins tool configuration and pipeline environment.",
        "Compare the failing agent with a known-good agent.",
        "Update the declared JDK selection, agent image, or PATH configuration in version-controlled infrastructure.",
        "Recreate or restart the agent only when approved."
      ],
      validation: [
        "Confirm the expected Java home in a fresh pipeline execution.",
        "Run the full build on the intended agent type.",
        "Check that other jobs sharing the agent are not unintentionally affected."
      ],
      rollback: [
        "Restore the previous known-good agent image or tool selection if other jobs regress.",
        "Keep the failed logs and agent image identifier for the incident report.",
        "Avoid untracked manual changes to shared agents."
      ]
    },
    {
      scenario: "A JDK upgrade breaks a Maven plugin or annotation processor",
      steps: [
        "Identify the exact failing plugin or processor from the stack trace.",
        "Check its supported JDK versions and release notes.",
        "Reproduce the issue on an isolated branch with the same JDK.",
        "Upgrade the incompatible component or use the approved JDK version.",
        "Review transitive plugin dependencies and generated source behavior."
      ],
      validation: [
        "Run clean compilation and the full test suite.",
        "Review generated sources and compiled artifacts.",
        "Run integration tests and the application startup test."
      ],
      rollback: [
        "Revert the plugin or processor change if it fails validation.",
        "Restore the last supported toolchain until a tested upgrade is available.",
        "Do not permanently pin an obsolete JDK without a documented remediation plan."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "Java version differs between IDE and command line",
      investigation: [
        "Check the IDE project SDK, language level, Maven runner JDK, and terminal JDK.",
        "Compare the IDE Maven runner output with mvn -version in the terminal.",
        "Check whether the IDE uses a project-specific Maven installation or wrapper."
      ],
      resolution: [
        "Align the project SDK, Maven runner JDK, and terminal configuration with the documented toolchain.",
        "Reload the Maven project and re-run the build from a clean terminal."
      ],
      prevention: [
        "Document the required JDK and Maven Wrapper.",
        "Keep toolchain settings and build configuration in version control where practical."
      ]
    },
    {
      scenario: "Maven runs on one JDK while compilation uses another",
      investigation: [
        "Inspect Maven Toolchains configuration and compiler plugin settings.",
        "Review debug output for the selected compiler or forked executable.",
        "Compare the toolchain path with the configured JAVA_HOME."
      ],
      resolution: [
        "Correct the toolchain path or compiler plugin configuration.",
        "Ensure the compiler JDK supports the requested release."
      ],
      prevention: [
        "Validate toolchain selection in CI.",
        "Log safe toolchain version information for each build."
      ]
    },
    {
      scenario: "A Java upgrade causes TLS or certificate failures",
      investigation: [
        "Check the Java truststore used by the JVM running Maven.",
        "Inspect certificate chain errors and any enterprise TLS interception.",
        "Compare the old and new JDK truststore and security defaults."
      ],
      resolution: [
        "Install the approved CA certificate or correct the server certificate chain.",
        "Follow enterprise truststore management procedures.",
        "Do not disable certificate validation to work around the failure."
      ],
      prevention: [
        "Test repository and external-service connectivity during JDK upgrades.",
        "Maintain managed certificate and truststore procedures."
      ]
    },
    {
      scenario: "A dependency uses a newer Java class-file version",
      investigation: [
        "Find the failing class and its containing JAR.",
        "Inspect the dependency tree and library compatibility requirements.",
        "Determine whether the library is a direct or transitive dependency."
      ],
      resolution: [
        "Use a supported library version or upgrade the runtime after compatibility review.",
        "Retest the packaged application, not only compilation."
      ],
      prevention: [
        "Include dependency compatibility checks in upgrade reviews.",
        "Test on the minimum supported runtime."
      ]
    },
    {
      scenario: "A base container image changes without a source change",
      investigation: [
        "Compare image tags and immutable digests between the last successful and failing builds.",
        "Inspect Java versions in the build and runtime stages.",
        "Review automated base-image update pull requests."
      ],
      resolution: [
        "Pin or restore an approved image digest while investigating.",
        "Update the image and Java baseline together through a controlled change."
      ],
      prevention: [
        "Use automated image update review and container scanning.",
        "Record image digests in build provenance."
      ]
    },
    {
      scenario: "An older JDK is required for a legacy service",
      investigation: [
        "Identify the service's supported Java baseline and dependencies.",
        "Check whether the service is isolated from other applications.",
        "Assess security support and the migration roadmap."
      ],
      resolution: [
        "Use an approved isolated build and runtime environment.",
        "Keep dependencies and the JDK patched within the supported baseline.",
        "Create a migration plan if the required JDK is out of support."
      ],
      prevention: [
        "Track JDK end-of-support dates.",
        "Avoid changing a shared machine's default JDK for a single legacy service."
      ]
    },
    {
      scenario: "Build uses different Java versions across parallel agents",
      investigation: [
        "Collect Java and Maven version output from each agent.",
        "Compare image digest, labels, tool installations, and environment configuration.",
        "Check whether the pipeline schedules jobs on different agent pools."
      ],
      resolution: [
        "Use a standardized agent image or explicit JDK tool selection.",
        "Re-run the affected build on a controlled agent."
      ],
      prevention: [
        "Add a toolchain preflight step.",
        "Alert when agents drift from the approved JDK baseline."
      ]
    }
  ],

  monitoringAndPrevention: [
    "Standardize Java versions through approved CI images, toolchains, and the Maven Wrapper.",
    "Declare and document the project's supported Java release.",
    "Use maven.compiler.release where supported rather than relying only on source and target.",
    "Pin Maven Compiler Plugin and other build plugin versions.",
    "Check Java versions in the build image, test environment, and final runtime image.",
    "Add a CI preflight that records java -version, javac -version, and mvn -version.",
    "Run clean builds on controlled agents to detect environment drift.",
    "Test application startup on the minimum supported runtime.",
    "Include dependency compatibility and vulnerability checks in CI.",
    "Review JDK, Maven, plugin, and base-image upgrades before broad rollout.",
    "Track JDK end-of-support dates and plan upgrades before emergency deadlines.",
    "Monitor application startup failures, container restart loops, health checks, and Java process errors after deployment.",
    "Keep known-good toolchain images and deployment artifacts available for rollback.",
    "Store build provenance, commit SHA, image digest, and artifact checksum.",
    "Use canary or staged rollout for runtime upgrades when supported by the service architecture."
  ],

  incidentRunbook: [
    "1. Acknowledge the incident and record the pipeline or service affected.",
    "2. Determine whether the failure occurs during Maven startup, compilation, testing, packaging, or production runtime.",
    "3. Capture java -version, javac -version, mvn -version, commit SHA, and agent or image identity.",
    "4. Inspect JAVA_HOME, PATH, Maven Wrapper, toolchains, active profiles, and compiler release.",
    "5. Compare the failing environment with the last known-good build.",
    "6. Identify the exact failing plugin, class, dependency, or Java executable.",
    "7. Apply the smallest evidence-supported correction.",
    "8. Run clean compilation, tests, full verification, and runtime compatibility checks.",
    "9. Promote only the exact validated artifact and runtime image.",
    "10. If validation fails, restore the last known-good toolchain or artifact according to the rollback plan.",
    "11. Monitor service health after deployment.",
    "12. Record the timeline, root cause, recovery, impact, and preventive actions."
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Inspect multiple installed JDKs",
      objective: "Understand how the terminal selects Java.",
      steps: [
        "Run java -version and javac -version.",
        "Run where.exe java and where.exe javac on Windows.",
        "Inspect JAVA_HOME and PATH.",
        "Compare the executable paths with the required project JDK.",
        "Correct the selection only in a controlled development environment."
      ],
      expectedResult:
        "The learner can identify the active JDK and explain why multiple Java installations can cause confusion."
    },
    {
      title: "Lab 2 — Reproduce an invalid target release",
      objective: "Understand compiler and release compatibility.",
      steps: [
        "Use a disposable test project.",
        "Configure a release that the selected compiler cannot support.",
        "Run the compile goal and capture the error.",
        "Select a compiler that supports the intended release or correct the test configuration.",
        "Run compilation and tests again."
      ],
      expectedResult:
        "The learner identifies the mismatch from the compiler error instead of randomly changing POM values."
    },
    {
      title: "Lab 3 — Compare Maven runtime and compiler JDK",
      objective: "Understand Maven Toolchains.",
      steps: [
        "Capture mvn -version.",
        "Inspect the configured Maven toolchain and compiler plugin.",
        "Identify the selected compiler executable.",
        "Compare the Maven runtime with the compiler JDK.",
        "Run a controlled compile using the intended toolchain."
      ],
      expectedResult:
        "The learner explains how Maven and compilation can use different JDK installations."
    },
    {
      title: "Lab 4 — Inspect effective compiler configuration",
      objective: "Find parent POM and profile overrides.",
      steps: [
        "Generate the effective POM.",
        "Inspect active profiles and compiler release settings.",
        "Compare the parent POM and child module configuration.",
        "Correct an intentionally inconsistent test configuration.",
        "Regenerate the effective POM and verify the intended release."
      ],
      expectedResult:
        "The learner can trace the final compiler setting to its source."
    },
    {
      title: "Lab 5 — Diagnose a bytecode runtime mismatch",
      objective: "Understand UnsupportedClassVersionError.",
      steps: [
        "Use a disposable class compiled for a newer Java version.",
        "Attempt to run it on an older compatible test runtime.",
        "Capture the exception.",
        "Inspect the class-file version using javap -verbose.",
        "Run it on a compatible runtime or recompile for the supported release."
      ],
      expectedResult:
        "The learner connects the runtime exception to the class-file version."
    },
    {
      title: "Lab 6 — Validate a multi-module project",
      objective: "Find inconsistent Java settings across modules.",
      steps: [
        "Inspect all module POMs.",
        "Compare compiler release and plugin configuration.",
        "Generate effective POMs for the relevant modules.",
        "Align the test project with its intended baseline.",
        "Run the complete reactor verification."
      ],
      expectedResult:
        "The learner identifies module-level overrides and validates the full project."
    },
    {
      title: "Lab 7 — Check Docker Java versions",
      objective: "Verify build and runtime image compatibility.",
      steps: [
        "Inspect the Dockerfile's build and runtime stages.",
        "Run java -version inside each image.",
        "Build a test image using the intended release.",
        "Run the application and its health checks in the test container.",
        "Record the image digest and test result."
      ],
      expectedResult:
        "The learner verifies the actual Java runtime inside the container instead of relying on the host."
    },
    {
      title: "Lab 8 — Add a CI toolchain preflight",
      objective: "Detect JDK drift before compilation.",
      steps: [
        "Add a preflight stage to a test pipeline.",
        "Print java -version, javac -version, and mvn -version.",
        "Compare the reported versions with the documented baseline.",
        "Fail early when a required tool is missing or incompatible.",
        "Run the complete build only after the preflight passes."
      ],
      expectedResult:
        "The learner creates a repeatable toolchain check that improves incident diagnosis."
    }
  ],

  interviewQuestions: [
    {
      question: "1. What is a Java version mismatch?",
      answer:
        "It occurs when the Java version used by the compiler, Maven, tests, dependencies, or runtime is inconsistent with the project's supported requirements."
    },
    {
      question: "2. What does invalid target release mean?",
      answer:
        "The selected compiler cannot compile for the requested release. Check the actual compiler JDK and the configured release."
    },
    {
      question: "3. What is JAVA_HOME?",
      answer:
        "It identifies a Java installation used by tools and scripts. It should point to the intended JDK root directory, not its bin subdirectory."
    },
    {
      question: "4. Why can java -version differ from mvn -version?",
      answer:
        "Maven can run with a different environment or Java installation than the executable resolved by the current shell."
    },
    {
      question: "5. What is the difference between JDK and JRE?",
      answer:
        "A JDK provides development tools such as the compiler. A runtime environment provides the components needed to run Java applications; modern Java distributions commonly package runtime components within the JDK."
    },
    {
      question: "6. What is maven.compiler.release?",
      answer:
        "It configures the Java release targeted by the compiler, including language, bytecode, and platform API compatibility when supported."
    },
    {
      question: "7. What is the difference between source, target, and release?",
      answer:
        "Source controls accepted language syntax, target controls generated bytecode level, and release also restricts platform APIs to the specified Java release."
    },
    {
      question: "8. What is UnsupportedClassVersionError?",
      answer:
        "The runtime cannot load a class because its class-file version is newer than the runtime supports."
    },
    {
      question: "9. How do you find a class-file version?",
      answer:
        "Use javap -verbose on the class and inspect the major version. Then identify the JAR and Java version that produced it."
    },
    {
      question: "10. Why can a project compile but fail in production?",
      answer:
        "The production runtime may be older than the compiled bytecode or a dependency's minimum runtime requirement."
    },
    {
      question: "11. What is Maven Toolchains?",
      answer:
        "It allows supported Maven plugins to select a configured tool such as a JDK independently of the JVM running Maven."
    },
    {
      question: "12. How do you troubleshoot Java mismatch in Jenkins?",
      answer:
        "Capture Java, compiler, and Maven versions on the failing agent; inspect tool selection, environment variables, agent images, and the compiler configuration."
    },
    {
      question: "13. What is the Maven Wrapper?",
      answer:
        "It standardizes the Maven distribution used by the project. The Java runtime still needs to be configured appropriately."
    },
    {
      question: "14. Why might a Maven plugin fail after a JDK upgrade?",
      answer:
        "The plugin or one of its dependencies may not support the new JDK or may rely on changed internal APIs."
    },
    {
      question: "15. How can Docker introduce a Java mismatch?",
      answer:
        "The build stage may use a newer JDK than the final runtime image, or a mutable image tag may resolve to a different base image."
    },
    {
      question: "16. How do you find a Java mismatch in a multi-module project?",
      answer:
        "Compare parent and child POMs, effective compiler settings, profiles, plugins, and toolchain selection across modules."
    },
    {
      question: "17. Should you lower the Java release whenever compilation fails?",
      answer:
        "No. First determine the intended runtime baseline and the actual cause. Lowering the release may introduce unsupported language or API behavior."
    },
    {
      question: "18. What if a dependency requires a newer Java version?",
      answer:
        "Identify the artifact and its compatibility requirements, then choose a supported library version or plan an approved runtime upgrade."
    },
    {
      question: "19. How do you validate a JDK upgrade?",
      answer:
        "Run a clean build, tests, integration tests, packaging checks, application startup tests, security checks, and validation on the intended runtime."
    },
    {
      question: "20. How do you roll back a Java upgrade?",
      answer:
        "Restore the last known-good toolchain or runtime image and redeploy the last approved artifact according to the service rollback plan."
    },
    {
      question: "21. What should a Java toolchain preflight report?",
      answer:
        "The commit, agent or image identity, Java version, compiler version, Maven version, selected toolchain, and required release baseline."
    },
    {
      question: "22. How do you prevent Java version incidents?",
      answer:
        "Standardize toolchains, pin supported build tools, test the minimum runtime, validate container images, and review JDK upgrades before deployment."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Detection timestamp:",
    "Affected application and module:",
    "Repository, branch, and commit SHA:",
    "Affected pipeline, agent, or production service:",
    "Expected Java version:",
    "Shell Java version:",
    "Maven runtime Java version:",
    "Compiler JDK and release setting:",
    "Test runtime version:",
    "Production or container runtime version:",
    "First causal error:",
    "Recent POM, plugin, JDK, or image changes:",
    "Customer or release impact:",
    "Confirmed root cause and evidence:",
    "Corrective change and reviewer:",
    "Build and runtime validation results:",
    "Artifact version and digest:",
    "Rollback decision:",
    "Preventive actions, owners, and deadlines:"
  ],

  officialReferences: [
    "Maven Compiler Plugin: https://maven.apache.org/plugins/maven-compiler-plugin/",
    "Maven Compiler Plugin compile goal: https://maven.apache.org/plugins/maven-compiler-plugin/compile-mojo.html",
    "Maven Toolchains: https://maven.apache.org/guides/mini/guide-using-toolchains.html",
    "Maven Wrapper: https://maven.apache.org/wrapper/",
    "Maven POM reference: https://maven.apache.org/pom.html",
    "Java javac command reference: https://docs.oracle.com/en/java/javase/",
    "Java Virtual Machine Specification: https://docs.oracle.com/javase/specs/",
    "Docker build documentation: https://docs.docker.com/build/",
    "Jenkins Pipeline documentation: https://www.jenkins.io/doc/book/pipeline/"
  ]
};
