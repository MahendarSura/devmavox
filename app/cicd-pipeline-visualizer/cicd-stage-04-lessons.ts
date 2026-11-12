import type { CicdTopicLesson } from "./cicd-topic-lessons";

function makeLesson(
  overview: string,
  purpose: string,
  architecture: string,
  workflow: string[],
  example: string,
  commands: string[],
  configuration: string,
  failures: string[],
  recovery: string[],
  bestPractices: string[],
  exercise: string
): CicdTopicLesson {
  return {
    overview, purpose, architecture, workflow, example,
    commands, configuration, failures, recovery,
    bestPractices, exercise
  };
}

export const stageFourLessonOverrides: Record<string, CicdTopicLesson> = {
  "4|Maven Fundamentals": {
    overview: "Apache Maven is a build automation and project management tool mainly used for Java applications. It provides a standard way to describe a project and execute repeatable build operations. Developers use Maven to validate a project, compile application source code, execute automated tests, and generate build output. Maven reads the project definition and coordinates the work required to produce a consistent build.",
    purpose: "Maven removes the need for every developer to maintain a different manual build procedure. A team can keep its build definition with the application source code and use the same Maven commands on developer workstations and CI agents. This makes build execution easier to reproduce, review, troubleshoot, and automate. Maven is commonly used when Java applications must be built consistently before they are released.",
    architecture: "A Maven-based project has a project descriptor named pom.xml, application source files, test source files, and generated build output. The Maven command-line interface starts a build request. Maven reads the project descriptor and constructs the project model. It coordinates the required build operations and uses dependencies and plugins when the requested operation needs them. Conventional source directories include src/main/java for application code, src/main/resources for application resources, and src/test/java for test code. Generated output is normally placed in target.",
    workflow: [
      "A developer checks out the Java application repository from source control.",
      "The developer opens a terminal in the project root where pom.xml is located.",
      "The developer runs a Maven command for the required build operation.",
      "Maven reads pom.xml and constructs the project model.",
      "Maven identifies the build work required by the requested command.",
      "Maven executes the required operations and reports their results.",
      "Generated files are written into the project's target directory.",
      "The developer or CI pipeline reviews the result before accepting the build."
    ],
    example: "Consider a DevMavox order-service application maintained by a Java development team. The repository contains Java source code, automated tests, and a pom.xml file. A developer runs mvn clean verify from the project root. Maven reads the project definition, performs the requested build work, and reports whether the project completed successfully. A Jenkins agent can execute the same command against a checked-out commit so that the CI result reflects the committed source code rather than a developer's local build output.",
    commands: [
      "mvn -version — display the Maven version and Java runtime information used by Maven.",
      "mvn validate — check whether the project is correctly described and ready for build processing.",
      "mvn compile — compile the project's main application source code.",
      "mvn test — execute the project's automated tests.",
      "mvn package — create the configured distributable package.",
      "mvn verify — execute the checks required to verify the built project.",
      "mvn clean verify — remove previous generated output and perform a fresh verification build."
    ],
    configuration: "The pom.xml file is the project-level build descriptor Maven reads when executing a project build. It identifies the project and declares the information needed to understand its build. Keep this file in the repository root and commit it to source control. Follow the conventional Maven directory structure so developers, IDEs, and CI agents can locate application code, resources, and tests consistently. Treat target as generated output rather than the source of truth for application code.",
    failures: [
      "Maven reports that no POM file is available because the command was executed outside the intended project directory.",
      "Maven cannot read the project because pom.xml contains malformed XML.",
      "The build stops because application source code contains compilation errors.",
      "The requested build operation reports failure because an automated test did not pass.",
      "A developer assumes that an old file in target represents the result of the latest build even though the current build failed."
    ],
    recovery: [
      "Use Get-Location or pwd to confirm the current directory and verify that the intended pom.xml exists there.",
      "Read the POM parsing error and correct the malformed XML before running the build again.",
      "Inspect the first relevant compiler error and correct the reported Java source problem.",
      "Identify the failing test from the test output and correct the application behavior or test expectation.",
      "Run mvn clean verify again and confirm that the command finishes successfully before using its generated output.",
      "Preserve the complete Maven console output when reporting a build failure so the cause can be diagnosed."
    ],
    bestPractices: [
      "Keep the Maven project definition and application source code together in source control.",
      "Use the standard Maven directory structure unless the project has a documented reason to use another layout.",
      "Run build commands from the correct project root.",
      "Use consistent Maven commands in local development and CI pipelines.",
      "Review the actual command result instead of assuming that an artifact exists because a previous build created one.",
      "Keep generated build output separate from maintained application source code.",
      "Read the first meaningful build error before attempting repeated builds."
    ],
    exercise: "Create a small Java Maven project and inspect its project root, pom.xml, application source directory, test source directory, and target directory. Run mvn validate, mvn compile, mvn test, and mvn package. Record what each command reports and identify which files are generated by the build. Finally, run mvn clean verify and explain how the same command can be used by a CI agent to check a committed application revision."
  },

  "4|Maven Installation": makeLesson(
    "Maven installation makes the Maven command-line build tool available on a developer workstation or CI agent. Maven requires a compatible Java Development Kit because Maven itself runs on the JVM and Java projects usually require compiler tooling.",
    "A consistent installation allows developers and build agents to execute the same build commands. Correct installation prevents environment-related build failures.",
    "The machine contains a JDK, Maven binaries, environment variables, and a terminal. JAVA_HOME points to the JDK installation, while PATH contains the Maven bin directory so the mvn command can be executed.",
    ["Install a supported JDK.", "Set JAVA_HOME to the JDK directory.", "Download and extract Apache Maven.", "Set MAVEN_HOME or M2_HOME if required by the environment.", "Add the Maven bin directory to PATH.", "Open a new terminal.", "Verify Java and Maven versions."],
    "A Jenkins Linux agent installs a JDK and Maven, configures JAVA_HOME and PATH, and executes mvn -version before accepting Java build jobs.",
    ["java -version", "javac -version", "mvn -version", "$env:JAVA_HOME", "$env:PATH", "where.exe mvn", "which mvn"],
    "On Windows, JAVA_HOME should point to the JDK installation directory, not its bin directory. PATH should include %JAVA_HOME%\\bin and the Maven bin directory. On Linux, export JAVA_HOME and add $JAVA_HOME/bin and Maven's bin directory to PATH.",
    ["mvn is not recognized as a command.", "JAVA_HOME points to an invalid directory.", "The terminal uses an old PATH value.", "An incompatible JDK version causes build errors."],
    ["Confirm the JDK directory exists.", "Correct JAVA_HOME and PATH.", "Open a new terminal after changing environment variables.", "Run mvn -version and verify the Java home displayed by Maven."],
    ["Standardize JDK and Maven versions across build agents.", "Document installation steps.", "Use managed build images for CI agents.", "Avoid installing tools manually in every pipeline execution."],
    "Install a JDK and Maven on a clean machine, configure environment variables, and capture the output of java -version and mvn -version."
  ),

  "4|Project Object Model": makeLesson(
    "The Project Object Model, commonly called POM, is Maven's XML-based project configuration model. The pom.xml file describes project identity, dependencies, build plugins, properties, packaging, and other build requirements.",
    "The POM provides one central and version-controlled place to define how a Java project should be built. It helps developers and CI servers reproduce the same build configuration.",
    "Maven reads the project's POM and builds an effective model by considering parent POMs, inherited configuration, properties, dependency management, and active profiles. Maven then uses that model to execute the requested lifecycle.",
    ["Create a pom.xml in the project root.", "Define groupId, artifactId, and version.", "Choose packaging such as jar or war.", "Declare dependencies and properties.", "Configure build plugins.", "Run Maven to validate and build the project.", "Inspect the effective POM when inherited configuration is unclear."],
    "A payment service defines com.devmavox as groupId, payment-service as artifactId, and 1.0.0 as version. It declares Spring Boot dependencies and configures the compiler plugin in pom.xml.",
    ["mvn validate", "mvn help:effective-pom", "mvn help:effective-settings", "mvn help:describe -Dcmd=compile", "mvn help:effective-pom -Doutput=effective-pom.xml"],
    "A basic POM contains modelVersion, groupId, artifactId, version, properties, dependencies, and build/plugins. A child project can inherit common configuration from a parent POM.",
    ["Malformed XML prevents Maven from reading the POM.", "A missing parent POM causes model resolution failure.", "Conflicting properties produce unexpected plugin configuration.", "An incorrect artifact coordinate creates confusing dependency resolution."],
    ["Validate XML structure and element names.", "Check parent coordinates and repository access.", "Inspect the effective POM.", "Use Maven help goals to understand resolved configuration."],
    ["Keep the POM readable and organized.", "Use properties for centrally managed versions.", "Avoid unnecessary duplicated plugin configuration.", "Review POM changes during code review."],
    "Create a POM for a Java service, define project coordinates and properties, add a dependency, and inspect the effective POM."
  ),

  "4|Coordinates and Packaging": makeLesson(
    "Maven coordinates uniquely identify a project or dependency. The main coordinates are groupId, artifactId, and version. Packaging describes the artifact format Maven produces, such as JAR, WAR, or POM.",
    "Coordinates allow Maven to locate dependencies and publish build outputs to repositories. Consistent coordinates make artifacts traceable across development, testing, and production environments.",
    "Maven combines groupId, artifactId, version, and packaging to identify an artifact. Repository paths are derived from these coordinates. For example, com.example:payment-service:1.0.0:jar maps to a repository location under com/example/payment-service/1.0.0.",
    ["Choose a stable organization or group identifier.", "Choose a meaningful artifact name.", "Set the project version.", "Select the required packaging type.", "Run the package lifecycle.", "Inspect the artifact generated under target.", "Publish the artifact using its coordinates."],
    "A payment service with coordinates com.devmavox:payment-service:1.2.0 and JAR packaging produces payment-service-1.2.0.jar.",
    ["mvn help:evaluate -Dexpression=project.groupId -q -DforceStdout", "mvn help:evaluate -Dexpression=project.artifactId -q -DforceStdout", "mvn help:evaluate -Dexpression=project.version -q -DforceStdout", "mvn package", "mvn install"],
    "Use explicit groupId, artifactId, and version in the POM. Set packaging to jar for a typical executable Java library or application, war for a traditional web archive, and pom for parent or aggregator projects.",
    ["Artifact names do not match expected release names.", "A snapshot version is mistakenly treated as a final release.", "The wrong packaging type is configured.", "Two unrelated projects reuse the same coordinates."],
    ["Inspect the effective POM and generated target files.", "Correct project coordinates and packaging.", "Verify the repository path and artifact metadata.", "Use release versions for immutable production releases."],
    ["Use organization-based group IDs.", "Follow consistent artifact naming conventions.", "Do not overwrite released versions.", "Make artifact version visible in CI build metadata."],
    "Create a Maven project with your own coordinates, package it as a JAR, and verify the artifact filename and version."
  ),

  "4|Dependency Management": makeLesson(
    "Dependency management is the process of declaring and controlling external libraries required by a Maven project. Maven downloads dependencies from configured repositories and makes them available during the appropriate build phases.",
    "It prevents developers from manually downloading JAR files and helps teams maintain consistent library versions. It also improves build repeatability and simplifies security updates.",
    "Dependencies are declared in the POM. Maven resolves direct and transitive dependencies, checks local and remote repositories, and constructs a dependency graph for the project. Dependency management in a parent POM can centrally control versions used by child modules.",
    ["Identify the library required by the application.", "Find its Maven coordinates.", "Declare the dependency in pom.xml.", "Specify or inherit a controlled version.", "Run Maven to resolve the dependency.", "Compile and test the application.", "Review dependency updates and vulnerabilities."],
    "A payment API declares Spring Web and validation libraries. Maven downloads the required artifacts and makes their classes available to the compiler and runtime.",
    ["mvn dependency:tree", "mvn dependency:resolve", "mvn dependency:analyze", "mvn clean compile", "mvn help:effective-pom"],
    "Declare dependencies under dependencies. Use dependencyManagement in a parent POM to define versions centrally; it manages versions but does not automatically add every managed dependency to child modules.",
    ["A dependency cannot be downloaded.", "Two libraries require incompatible versions.", "A required version is missing.", "An unused dependency increases artifact size."],
    ["Inspect mvn dependency:tree.", "Check repository configuration and network access.", "Use dependencyManagement or exclusions to resolve conflicts.", "Remove unused dependencies after validating application usage."],
    ["Avoid dynamic version ranges for production builds.", "Centralize versions in parent POMs or BOMs.", "Review dependency security advisories.", "Keep only required dependencies."],
    "Add a JSON library to a Maven project, build the application, inspect the dependency tree, and explain how Maven resolves it."
  ),

  "4|Dependency Scopes": makeLesson(
    "Maven dependency scopes define where a dependency is available during compilation, testing, and runtime. Common scopes include compile, provided, runtime, test, and system. The scope determines which classpaths include the dependency and whether it is packaged.",
    "Scopes prevent unnecessary libraries from entering production artifacts. They also distinguish libraries needed only for testing from libraries supplied by the application server or runtime platform.",
    "Maven applies dependency scopes while constructing compile, test, and runtime classpaths. Compile is the default scope. Provided dependencies are available for compilation and tests but are expected from the runtime environment. Test dependencies are limited to test execution.",
    ["Identify when the library is required.", "Choose the correct scope in pom.xml.", "Run compilation and tests.", "Inspect the dependency tree.", "Build the artifact.", "Verify which libraries are packaged or supplied externally."],
    "A Spring application uses JUnit with test scope because it is needed only for automated tests. A servlet API may use provided scope when the target application server supplies it.",
    ["mvn dependency:tree", "mvn test", "mvn package", "mvn dependency:build-classpath", "mvn help:effective-pom"],
    "Set scope inside each dependency declaration, for example <scope>test</scope>. Omit scope when compile is intended. Use provided only when the deployment environment guarantees the dependency.",
    ["A test library is accidentally included in production.", "A runtime dependency is missing from the packaged application.", "Provided dependencies are unavailable in the local runtime.", "Incorrect scope causes compilation failures."],
    ["Inspect the dependency tree and POM.", "Confirm the target runtime supplies provided dependencies.", "Change the scope based on actual application requirements.", "Run tests and launch the packaged application."],
    ["Choose scopes based on real runtime needs.", "Do not mark application-required libraries as provided without justification.", "Keep test frameworks in test scope.", "Verify the final artifact in a clean environment."],
    "Add one compile dependency and one test dependency, inspect the dependency tree, and explain why each scope is appropriate."
  ),

  "4|Transitive Dependencies": makeLesson(
    "A transitive dependency is a library required by another dependency in the project. Maven automatically discovers and downloads these indirect dependencies so developers do not need to declare every supporting library manually.",
    "Transitive resolution simplifies dependency management, but it can introduce version conflicts and unexpected libraries. Understanding the dependency graph helps teams troubleshoot classpath and security issues.",
    "Maven reads dependency metadata from repositories and follows dependency relationships to construct a graph. It applies mediation rules, including nearest-definition behavior, to choose versions when multiple paths request different versions.",
    ["Declare the direct dependency.", "Maven reads its dependency metadata.", "Maven discovers its required libraries.", "Maven resolves versions across the dependency graph.", "The project receives the resolved classpath.", "Inspect the graph when conflicts or unexpected libraries appear."],
    "A payment service adds a web framework dependency. That framework requires logging and utility libraries. Maven resolves these transitive dependencies automatically.",
    ["mvn dependency:tree", "mvn dependency:tree -Dverbose", "mvn dependency:analyze", "mvn dependency:resolve", "mvn help:effective-pom"],
    "Use exclusions within a dependency when a specific transitive library must not be included. Declare a required replacement explicitly and control versions through dependencyManagement.",
    ["Different dependencies request incompatible versions.", "An unwanted transitive library introduces a vulnerability.", "A class is missing at runtime.", "An exclusion removes a library that the application still needs."],
    ["Inspect the complete dependency tree.", "Identify which direct dependency introduces the library.", "Apply a narrow exclusion or version override.", "Run tests and verify the packaged application."],
    ["Review transitive dependencies during security checks.", "Avoid broad exclusions without impact analysis.", "Prefer maintained dependency versions.", "Document important dependency overrides."],
    "Add a framework dependency, inspect its transitive dependencies, identify one indirect library, and practice excluding it safely."
  ),

  "4|Build Lifecycle": makeLesson(
    "The Maven build lifecycle is an ordered sequence of phases that standardizes project validation, compilation, testing, packaging, verification, installation, and deployment. Maven provides default, clean, and site lifecycles.",
    "Lifecycle phases provide predictable build behavior. A single command such as mvn verify can execute all earlier required phases, reducing the need for manually chained build commands.",
    "Maven executes phases in lifecycle order. Each phase can invoke configured plugin goals. The default lifecycle handles application builds, clean removes generated output, and site creates project documentation.",
    ["Developer starts a lifecycle command.", "Maven determines the requested phase.", "Maven executes all preceding phases in order.", "Plugins perform validation, compilation, and testing tasks.", "Packaging creates the artifact.", "Verification checks the build result.", "CI publishes the validated artifact."],
    "A Jenkins pipeline runs mvn clean verify. Maven removes old output, compiles the payment service, executes tests, packages the application, and completes verification.",
    ["mvn validate", "mvn compile", "mvn test", "mvn package", "mvn verify", "mvn install", "mvn deploy", "mvn clean"],
    "Configure lifecycle behavior through plugin declarations in the build section. Use clean before a fresh build and verify as a useful CI validation boundary.",
    ["A build fails in an earlier lifecycle phase.", "Old generated files affect a build.", "Tests are skipped unintentionally.", "Deployment runs before verification is complete."],
    ["Read the first meaningful Maven error.", "Run mvn clean verify.", "Check plugin executions and skipped-test flags.", "Keep artifact publication after successful verification."],
    ["Use lifecycle phases instead of manually invoking unrelated goals.", "Run clean builds in CI when required.", "Do not publish failed builds.", "Keep test execution enabled for normal verification."],
    "Run validate, compile, test, package, and verify separately; record which phases execute before each requested phase."
  ),

  "4|Phases and Goals": makeLesson(
    "A Maven phase is a step in a lifecycle, while a plugin goal is a specific task performed by a plugin. A phase may trigger one or more goals. Developers can also invoke a plugin goal directly from the command line.",
    "Understanding phases and goals helps developers configure builds correctly and troubleshoot why a plugin runs or does not run.",
    "The lifecycle defines phase ordering. Plugins provide goals such as compiler:compile, surefire:test, and jar:jar. Plugin executions bind goals to lifecycle phases, while command-line syntax can invoke a goal directly.",
    ["Select the lifecycle phase needed.", "Identify the plugin goal responsible for the task.", "Check whether the goal is bound by default or configured in the POM.", "Run the phase or direct goal.", "Inspect Maven output for plugin execution.", "Adjust plugin configuration if necessary."],
    "Running mvn package invokes the package phase and preceding phases. Running mvn compiler:compile invokes the compiler plugin goal directly and does not represent the full normal lifecycle.",
    ["mvn help:describe -Dcmd=package", "mvn help:describe -Dplugin=org.apache.maven.plugins:maven-compiler-plugin", "mvn compiler:compile", "mvn surefire:test", "mvn clean package"],
    "Configure plugin goals and executions inside build/plugins. Bind a goal to a phase using an execution block when the default lifecycle binding is not sufficient.",
    ["A goal is never executed because it is not bound to a phase.", "A plugin goal is invoked with incorrect parameters.", "A direct goal skips required earlier lifecycle work.", "A plugin version changes goal behavior."],
    ["Inspect Maven logs for plugin and goal names.", "Use help:describe to inspect goal parameters.", "Run the appropriate lifecycle phase.", "Pin and configure the plugin version."],
    ["Use lifecycle commands for complete builds.", "Use direct goals for focused maintenance tasks.", "Document custom phase bindings.", "Avoid duplicate plugin executions."],
    "Compare mvn package with mvn compiler:compile and explain which lifecycle phases and plugin goals are executed."
  ),

  "4|Maven Plugins": makeLesson(
    "Maven plugins provide the actual build operations used by Maven. Plugins contain goals for compiling code, running tests, creating archives, checking code quality, generating reports, and publishing artifacts.",
    "Plugins make Maven extensible and allow teams to standardize build behavior without writing custom scripts for every project.",
    "The POM configures plugins under build/plugins. Maven resolves plugin artifacts and executes configured goals during lifecycle phases or through direct command-line invocation.",
    ["Identify a required build operation.", "Select a maintained Maven plugin.", "Configure an explicit plugin version.", "Configure the required goals and parameters.", "Bind goals to lifecycle phases where needed.", "Run the build and inspect plugin output.", "Update plugin versions through controlled testing."],
    "A Java payment service uses the compiler plugin for Java compilation, Surefire for unit tests, and the JAR plugin to create its application library.",
    ["mvn help:effective-pom", "mvn help:describe -Dplugin=org.apache.maven.plugins:maven-compiler-plugin", "mvn compiler:compile", "mvn surefire:test", "mvn package"],
    "Declare plugins under build/plugins. Set versions explicitly and configure executions and configuration values for compiler release, test behavior, packaging, or other build requirements.",
    ["Plugin cannot be resolved from configured repositories.", "An outdated plugin does not support the configured JDK.", "Incorrect plugin configuration breaks the build.", "A goal is bound to an unexpected phase."],
    ["Verify plugin coordinates and repository access.", "Check plugin compatibility with the JDK and Maven version.", "Inspect effective POM and debug logs.", "Correct plugin configuration and rerun the lifecycle."],
    ["Pin plugin versions.", "Prefer official and maintained plugins.", "Avoid unnecessary plugin executions.", "Test plugin upgrades before production rollout."],
    "Configure the compiler and test plugins with explicit versions, run the build, and inspect the goals executed by Maven."
  ),

  "4|Maven Profiles": makeLesson(
    "Maven profiles allow different build configuration to be activated for different environments or conditions. A profile can change properties, dependencies, repositories, and plugin configuration.",
    "Profiles help teams support development, testing, staging, and production build variations while keeping a common project structure.",
    "Profiles can be declared in pom.xml or Maven settings. They may be activated explicitly, by properties, by JDK version, by operating system, or through other supported activation conditions.",
    ["Define a common base configuration.", "Create environment-specific profiles.", "Set profile-specific properties or plugin configuration.", "Activate the required profile.", "Run the build.", "Inspect active profiles and generated output.", "Keep secrets outside profile definitions."],
    "A payment application uses a dev profile for local settings and a production profile for production-specific non-secret build properties. Deployment credentials remain in the CI secret store.",
    ["mvn help:all-profiles", "mvn help:active-profiles", "mvn package -Pdev", "mvn package -Pprod", "mvn help:effective-pom -Pprod"],
    "Declare profiles inside profiles/profile in pom.xml. Activate a profile with -PprofileName. Use settings.xml for machine-specific configuration and environment variables or secret stores for sensitive values.",
    ["The expected profile is not activated.", "Two profiles override the same property unexpectedly.", "A developer accidentally builds with production settings.", "Secrets are committed to source control."],
    ["Check active profiles.", "Inspect the effective POM with the selected profile.", "Use explicit profile activation in CI.", "Remove credentials from project files and rotate exposed secrets."],
    ["Keep common configuration outside profiles.", "Use clear profile names.", "Make production profile selection explicit.", "Never store passwords or tokens in a committed POM."],
    "Create dev and prod Maven profiles, activate each profile, and compare their effective POM output."
  ),

  "4|Repositories": makeLesson(
    "Maven repositories store project dependencies, plugins, and published build artifacts. Maven uses a local repository on the machine and remote repositories such as Maven Central or an organization's artifact manager.",
    "Repositories allow teams to share dependencies, cache downloads, control approved libraries, and publish versioned artifacts for downstream projects.",
    "Maven first checks its local repository cache and then configured remote repositories when an artifact is unavailable locally. Corporate repository managers can proxy public repositories and host internal releases and snapshots.",
    ["Configure repository access where required.", "Declare dependencies and plugins in the POM.", "Maven checks the local cache.", "Maven downloads missing artifacts from remote repositories.", "The build uses resolved artifacts.", "Publish internal artifacts to an approved repository.", "Promote release artifacts through controlled environments."],
    "A company uses Nexus as an internal Maven repository. Jenkins downloads approved dependencies through Nexus and publishes successful payment-service release artifacts to its hosted release repository.",
    ["mvn dependency:resolve", "mvn dependency:tree", "mvn help:effective-settings", "mvn deploy", "mvn -U clean verify"],
    "Configure repository and server credentials in settings.xml. Keep passwords encrypted or supplied through approved secret mechanisms. Configure distributionManagement for deployment destinations and use separate release and snapshot repositories.",
    ["Remote repository is unavailable.", "Authentication fails during artifact deployment.", "A dependency is missing from all configured repositories.", "A snapshot or release is published to the wrong repository."],
    ["Check repository URLs and network connectivity.", "Verify server IDs match settings.xml credentials.", "Inspect Maven settings and repository policy.", "Confirm the artifact coordinates and release/snapshot destination."],
    ["Use an approved repository manager.", "Do not commit repository passwords.", "Separate snapshot and release repositories.", "Keep release artifacts immutable and traceable."],
    "Configure a local Maven repository manager in a test environment, resolve a dependency through it, and explain the local and remote repository roles."
  ),

  "4|Spring Boot Packaging": makeLesson(
    "Spring Boot packaging creates an application artifact that contains the application code and the dependencies required to run it. The Spring Boot Maven plugin can create executable JAR files suitable for container images and deployment pipelines.",
    "Executable packaging simplifies deployment because the application can be started with java -jar without manually assembling a classpath or deploying to a traditional application server.",
    "Maven compiles the Spring Boot application, resolves dependencies, and invokes the Spring Boot Maven plugin's repackage goal. The resulting executable archive contains application classes and nested dependencies with a suitable launcher.",
    ["Create a Spring Boot application.", "Declare Spring Boot dependencies and parent or dependency management.", "Configure the Spring Boot Maven plugin.", "Run mvn clean package.", "Inspect the generated JAR.", "Start the application using java -jar.", "Publish the tested artifact to the deployment pipeline."],
    "A payment API is packaged as payment-service.jar. The CI pipeline builds the executable JAR, runs tests, creates a container image, and deploys the service to Kubernetes.",
    ["mvn clean package", "mvn spring-boot:repackage", "jar tf target/payment-service.jar", "java -jar target/payment-service.jar", "mvn clean verify"],
    "Configure spring-boot-maven-plugin in build/plugins. Use a compatible Spring Boot version and ensure the repackage goal is applied to the intended executable module.",
    ["JAR is not executable because repackage did not run.", "Application starts locally but fails due to missing configuration.", "The wrong main class is selected.", "The packaged artifact contains an unexpected dependency version."],
    ["Inspect plugin execution in Maven logs.", "Verify the JAR manifest and archive contents.", "Check application configuration and environment variables.", "Run the exact packaged artifact in a clean test environment."],
    ["Build one immutable artifact and promote it between environments.", "Externalize environment-specific configuration.", "Use non-root containers when deploying.", "Verify startup and health checks before production rollout."],
    "Build a Spring Boot executable JAR, inspect its contents, run it locally, and record its startup and health-check results."
  ),

  "4|Surefire and Failsafe": makeLesson(
    "Maven Surefire and Failsafe are plugins used to execute automated tests. Surefire is commonly used for unit tests during the test phase, while Failsafe is designed for integration tests across the integration-test and verify phases.",
    "Separating unit and integration tests gives teams faster feedback and clearer control over expensive tests that require databases, services, containers, or external dependencies.",
    "The Maven lifecycle invokes Surefire during the test phase. Failsafe runs integration tests during integration-test and checks their results during verify, allowing post-integration-test cleanup to complete before the build is marked successful.",
    ["Organize unit and integration test classes.", "Configure Surefire for unit tests.", "Configure Failsafe for integration tests.", "Run the test lifecycle.", "Review generated reports.", "Run verify to evaluate integration-test results.", "Publish only after all required tests pass."],
    "A payment service runs fast unit tests with Surefire and database-backed integration tests with Failsafe. Jenkins executes mvn clean verify before building the production container.",
    ["mvn test", "mvn integration-test", "mvn verify", "mvn -DskipTests package", "mvn -DskipITs verify"],
    "Configure maven-surefire-plugin and maven-failsafe-plugin under build/plugins. Failsafe commonly binds integration-test and verify goals. Use explicit include/exclude naming patterns for integration tests.",
    ["Unit tests are not discovered.", "Integration tests run during an unintended phase.", "Tests fail because the database is unavailable.", "The build skips tests due to incorrect flags."],
    ["Inspect Surefire and Failsafe reports under target/surefire-reports and target/failsafe-reports.", "Check test naming patterns and plugin configuration.", "Verify integration dependencies are healthy.", "Remove unintended skip flags and rerun mvn verify."],
    ["Keep unit tests fast and isolated.", "Run integration tests in controlled environments.", "Avoid skipping tests in release pipelines.", "Archive test reports as CI artifacts."],
    "Create one unit test and one integration test, configure the two plugins, run mvn verify, and compare their reports."
  ),

  "4|Build Troubleshooting": makeLesson(
    "Maven build troubleshooting is the process of identifying and resolving failures in project configuration, dependency resolution, compilation, testing, plugins, and artifact packaging.",
    "A structured troubleshooting method reduces build recovery time and prevents teams from applying random changes that hide the original problem.",
    "A Maven build passes through model loading, dependency and plugin resolution, lifecycle execution, compilation, tests, packaging, and optional publication. The failure stage and first meaningful error usually identify the responsible area.",
    ["Capture the complete Maven command and build log.", "Identify the first meaningful error rather than only the final BUILD FAILURE line.", "Determine whether the failure is configuration, dependency, compilation, test, or plugin related.", "Reproduce the failure locally or on a clean CI agent.", "Apply the smallest safe correction.", "Run mvn clean verify.", "Record the root cause and preventive action."],
    "A Jenkins payment-service build fails because Maven cannot download a dependency. The engineer checks repository connectivity and credentials, confirms the artifact coordinates, restores access, and reruns the same build.",
    ["mvn -e clean verify", "mvn -X clean verify", "mvn dependency:tree", "mvn help:effective-pom", "mvn -U clean verify", "mvn -o clean verify"],
    "Use -e for exception details and -X for debug output. Use -U to check updated remote metadata and -o only when all required artifacts are already cached. Avoid changing multiple unrelated settings during diagnosis.",
    ["Dependency resolution failure.", "Compilation errors caused by incompatible Java versions.", "Unit or integration test failures.", "Plugin resolution or configuration errors.", "Packaging failure caused by missing resources."],
    ["Classify the failure stage.", "Inspect the first causal error and relevant stack trace.", "Check JDK, Maven, POM, repositories, and plugin versions.", "Reproduce with a clean build.", "Verify the correction with tests and artifact inspection."],
    ["Preserve complete CI logs.", "Use reproducible build environments.", "Do not suppress errors to force a green pipeline.", "Keep dependency and plugin versions controlled.", "Track recurring failures and eliminate root causes."],
    "Intentionally introduce a missing dependency or compilation error, diagnose it from Maven logs, fix the root cause, and confirm a successful clean verify."
  ),

  "4|Production Hands-on Lab": makeLesson(
    "This production hands-on lab combines Maven project configuration, dependency management, automated testing, executable packaging, and CI artifact publishing into one realistic delivery workflow.",
    "The lab demonstrates how a Java application moves from source code to a validated, versioned artifact that can be promoted through development, staging, and production.",
    "The workflow uses Git for source control, Maven for builds, Surefire and Failsafe for tests, a repository manager for artifact storage, Jenkins for automation, and a container platform for deployment.",
    ["Create a Java or Spring Boot payment service.", "Define stable Maven coordinates and controlled dependency versions.", "Configure compiler, unit-test, integration-test, and packaging plugins.", "Run mvn clean verify locally.", "Commit the POM and application source to Git.", "Configure Jenkins to use a known JDK and Maven installation.", "Run the same Maven verification command in CI.", "Publish the versioned artifact to the approved repository.", "Deploy the artifact to a test environment.", "Validate health checks and retain build evidence."],
    "A payment application is built from a Git commit. Jenkins executes mvn clean verify, archives the versioned executable JAR, publishes it to Nexus, and uses the same artifact for staging validation before production promotion.",
    ["git checkout main", "mvn -version", "mvn clean verify", "mvn dependency:tree", "mvn help:effective-pom", "mvn package", "jar tf target/*.jar", "java -jar target/payment-service.jar"],
    "The project should pin important plugin versions, use properties or a BOM for dependency version alignment, keep secrets outside Git, configure repository credentials through Jenkins credentials, and retain test reports and artifact checksums.",
    ["CI uses a different JDK from developer machines.", "Dependency repository access fails.", "Integration tests cannot reach required services.", "The artifact is published with an incorrect version.", "A deployment uses a newly rebuilt artifact instead of the tested artifact."],
    ["Standardize the JDK and Maven environment.", "Verify repository connectivity and credentials.", "Provision integration dependencies before test execution.", "Validate coordinates and artifact checksum before publication.", "Promote the exact tested artifact between environments."],
    ["Use clean, repeatable CI builds.", "Keep production credentials in a secret manager.", "Run unit and integration tests before publication.", "Use immutable release versions.", "Archive logs, reports, artifact metadata, and checksums.", "Require deployment approval and post-deployment health validation."],
    "Build a sample payment service end to end. Demonstrate a successful mvn clean verify in a local terminal and Jenkins, publish one versioned artifact, deploy it to a test environment, and document the build evidence and rollback approach."
  )
};
