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
    overview,
    purpose,
    architecture,
    workflow,
    example,
    commands,
    configuration,
    failures,
    recovery,
    bestPractices,
    exercise
  };
}

export const stageFourLessonOverrides: Record<string, CicdTopicLesson> = {

  "4|Maven Fundamentals": makeLesson(
    "Apache Maven is a Java build automation and dependency management tool. It uses a project object model defined in pom.xml to describe project metadata, dependencies, plugins and build behavior. Maven provides standard lifecycle phases so developers can compile, test, package and verify applications consistently.",
    "Maven reduces manual build steps and makes Java projects easier to reproduce across developer machines and CI agents. A Jenkins pipeline can use the same Maven commands that developers use locally, reducing differences between local and automated builds.",
    "Java source code and pom.xml → Maven model construction → dependency resolution → lifecycle and plugin execution → compiled classes → test reports → JAR or WAR artifact.",
    [
      "Install a supported JDK and Maven distribution.",
      "Create or inspect the project's pom.xml.",
      "Run mvn validate to check the project model.",
      "Run mvn compile to compile application sources.",
      "Run mvn test and inspect test results.",
      "Run mvn package to create the configured artifact.",
      "Verify the generated artifact before publishing it."
    ],
    "The payment-service project uses Maven to download Spring Boot dependencies, compile Java code, execute JUnit tests and create payment-service.jar. Jenkins runs mvn clean verify before allowing the artifact to proceed to container packaging.",
    [
      "mvn -version",
      "mvn validate",
      "mvn compile",
      "mvn test",
      "mvn package",
      "mvn clean verify",
      "mvn help:effective-pom"
    ],
    "Define groupId, artifactId, version, packaging, properties, dependencies and plugins in pom.xml. Pin important plugin and dependency versions. Keep environment-specific settings outside the project model when they contain secrets.",
    [
      "Maven cannot find a required dependency in configured repositories.",
      "Compilation fails because the configured Java release is incompatible.",
      "Tests fail even though compilation succeeds.",
      "The expected JAR is not created because the lifecycle stopped earlier."
    ],
    [
      "Read the first meaningful Maven error rather than focusing only on the final BUILD FAILURE line.",
      "Verify mvn -version and the active JDK.",
      "Inspect dependency resolution with mvn dependency:tree.",
      "Run the failing lifecycle phase separately.",
      "Verify target output and test reports after correcting the issue."
    ],
    [
      "Use a consistent Maven and JDK version across development and CI.",
      "Keep pom.xml under version control.",
      "Pin plugin versions for reproducible builds.",
      "Run clean verify before release promotion.",
      "Treat test failures as build failures."
    ],
    "Create a small Spring Boot payment-service project. Run validate, compile, test, package and verify. Inspect target/ and explain which Maven phase produced each output."
  ),

  "4|Maven Installation": makeLesson(
    "Maven installation prepares a machine to execute Java builds. Maven requires a compatible Java runtime and can be installed using an operating-system package manager or an official Apache distribution. The executable must be available through the system PATH so terminals and Jenkins agents can invoke mvn.",
    "A consistent installation prevents CI failures caused by missing tools or different local and server versions. Engineers must verify both the Maven version and the Java runtime actually used by the Maven process.",
    "Operating system → JDK installation → Maven distribution → PATH and environment variables → Maven command → project build.",
    [
      "Install a supported JDK.",
      "Set JAVA_HOME to the JDK installation directory.",
      "Install Maven using an approved distribution method.",
      "Add Maven's bin directory to PATH.",
      "Open a new terminal and verify Java and Maven versions.",
      "Run a small Maven project build."
    ],
    "A Jenkins Linux agent receives a Spring Boot repository. Before the pipeline starts, the administrator verifies that the agent has the required JDK and Maven versions so the build does not depend on a developer's workstation.",
    [
      "java -version",
      "javac -version",
      "mvn -version",
      "where.exe java",
      "where.exe mvn",
      "echo $env:JAVA_HOME"
    ],
    "Set JAVA_HOME to the JDK root, not its bin directory. Add the Maven bin directory to PATH. On Jenkins, configure a managed Maven installation or a controlled agent image and ensure the service account receives the same environment.",
    [
      "The terminal reports mvn is not recognized or command not found.",
      "JAVA_HOME points to a missing directory or a JRE instead of the required JDK.",
      "Maven uses a different Java runtime than expected.",
      "A Jenkins service account has a different PATH from an interactive user."
    ],
    [
      "Check the executable path with where.exe mvn or which mvn.",
      "Inspect JAVA_HOME and verify that its bin directory contains the Java executable.",
      "Run mvn -version to see the Java runtime Maven actually uses.",
      "Correct PATH and environment settings, then open a fresh terminal.",
      "Verify the same commands under the Jenkins agent service account."
    ],
    [
      "Use supported JDK and Maven releases.",
      "Document installation versions for CI agents.",
      "Avoid relying on a developer-specific PATH.",
      "Use managed tool installations or reproducible agent images.",
      "Validate tool versions before running release pipelines."
    ],
    "Install a JDK and Maven on a test machine. Capture java -version and mvn -version output. Change the Maven PATH in a controlled test, diagnose the command-not-found error and restore the correct configuration."
  ),

  "4|Project Object Model": makeLesson(
    "The Project Object Model, or POM, is Maven's XML-based description of a project. The pom.xml file defines project identity, dependencies, properties, build plugins, repositories and relationships with parent projects. Maven reads this model before deciding how to execute a build.",
    "The POM provides a common place to describe build requirements. It helps developers and Jenkins agents resolve the same dependencies and execute the same build lifecycle without maintaining separate manual instructions.",
    "pom.xml → parent and property resolution → effective POM → dependency graph → plugin configuration → lifecycle execution.",
    [
      "Open the project's pom.xml.",
      "Identify the project coordinates and packaging.",
      "Review parent POM and inherited properties.",
      "Inspect declared dependencies and plugin configuration.",
      "Generate the effective POM to see inherited values.",
      "Validate the project model and execute a build."
    ],
    "The payment-service inherits Spring Boot dependency management from a parent POM. Its own pom.xml declares the application dependency and test libraries, while the parent provides compatible managed versions.",
    [
      "mvn validate",
      "mvn help:effective-pom",
      "mvn help:active-profiles",
      "mvn help:all-profiles",
      "mvn help:describe -Dcmd=compile",
      "mvn dependency:tree"
    ],
    "Use standard POM sections such as modelVersion, parent, groupId, artifactId, version, properties, dependencyManagement, dependencies, build and profiles. Keep XML valid and avoid duplicating inherited configuration unnecessarily.",
    [
      "Malformed XML prevents Maven from reading the project.",
      "An incorrect parent version causes model resolution failure.",
      "A property is referenced but never defined.",
      "Inherited plugin or dependency configuration behaves differently than expected."
    ],
    [
      "Inspect the exact XML location reported by Maven.",
      "Validate parent coordinates and repository access.",
      "Generate the effective POM to inspect inherited configuration.",
      "Search for undefined properties and incorrect property names.",
      "Run mvn validate again before executing later phases."
    ],
    [
      "Keep the POM readable and consistently formatted.",
      "Use properties for centrally managed version values.",
      "Use dependencyManagement for coordinated dependency versions.",
      "Avoid unnecessary parent inheritance.",
      "Review effective POM output when debugging inherited settings."
    ],
    "Create a POM for a sample payment-service. Define its coordinates, Java version property, Spring Boot dependency and test dependency. Generate the effective POM and identify which values are inherited."
  ),

  "4|Coordinates and Packaging": makeLesson(
    "Maven coordinates uniquely identify a project artifact. The main coordinates are groupId, artifactId and version. Packaging describes the output type, such as jar or war. Together these values determine the artifact's identity and help Maven repositories store and retrieve it.",
    "Correct coordinates prevent teams from publishing unrelated builds under confusing names. Packaging tells Maven which build lifecycle behavior and output format should be used for the project.",
    "Project coordinates → packaging type → Maven lifecycle and packaging plugin → target artifact → repository path and artifact identity.",
    [
      "Choose a stable groupId for the organization or project.",
      "Choose an artifactId that identifies the application.",
      "Define a version and packaging type.",
      "Run mvn help:effective-pom to confirm resolved values.",
      "Run mvn package to generate the artifact.",
      "Inspect the generated filename and contents."
    ],
    "The payment service uses com.devmavox as groupId, payment-service as artifactId and 1.0.0 as version. A JAR packaging project generates target/payment-service-1.0.0.jar.",
    [
      "mvn help:evaluate -Dexpression=project.groupId -q -DforceStdout",
      "mvn help:evaluate -Dexpression=project.artifactId -q -DforceStdout",
      "mvn help:evaluate -Dexpression=project.version -q -DforceStdout",
      "mvn help:evaluate -Dexpression=project.packaging -q -DforceStdout",
      "mvn package",
      "Get-ChildItem .\\target"
    ],
    "Define stable coordinates in pom.xml. Use a consistent versioning strategy and select jar or war packaging according to the application runtime. Avoid changing artifact coordinates unexpectedly because downstream pipelines and deployment automation may depend on them.",
    [
      "Artifact is published under an unexpected filename.",
      "Two unrelated projects use conflicting coordinates.",
      "A downstream pipeline expects a JAR but the project produces a WAR.",
      "A release uses an incorrect or snapshot version."
    ],
    [
      "Evaluate the resolved Maven project coordinates.",
      "Inspect the packaging value and effective POM.",
      "Check the generated target directory and artifact filename.",
      "Compare repository coordinates with the downstream pipeline configuration.",
      "Correct the project identity and rebuild before publishing."
    ],
    [
      "Use stable organization-based groupIds.",
      "Keep artifactIds descriptive and consistent.",
      "Choose packaging based on the deployment model.",
      "Use release and snapshot versions intentionally.",
      "Record artifact coordinates in release metadata."
    ],
    "Set payment-service coordinates and JAR packaging. Build the project, verify the output filename and explain how Maven coordinates identify the artifact in a repository."
  ),

  "4|Dependency Management": makeLesson(
    "Dependency management controls which external libraries a Maven project needs and which versions should be used. Maven resolves declared dependencies from local and remote repositories. The dependencyManagement section can centralize version and scope information without automatically adding every managed dependency to the project.",
    "Good dependency management avoids manually copying JAR files and reduces version conflicts. It helps teams maintain compatible library versions and makes application builds repeatable across Jenkins agents.",
    "pom.xml dependencies and dependencyManagement → Maven dependency model → local repository lookup → remote repository download → compile and runtime classpath.",
    [
      "Identify the libraries required by the application.",
      "Declare each required dependency in the dependencies section.",
      "Use dependencyManagement or a parent BOM to control versions.",
      "Run dependency:tree to inspect the resolved graph.",
      "Build and execute tests.",
      "Review dependency updates and security findings."
    ],
    "The payment-service uses Spring Web for REST endpoints and Spring Boot Test for testing. Dependency versions are managed through the Spring Boot parent so related libraries remain compatible.",
    [
      "mvn dependency:tree",
      "mvn dependency:analyze",
      "mvn help:effective-pom",
      "mvn -U clean verify",
      "mvn dependency:resolve"
    ],
    "Declare application dependencies under dependencies. Use dependencyManagement for centrally managed versions and import a BOM with type pom and scope import when appropriate. Avoid unnecessary dependencies and uncontrolled version ranges.",
    [
      "Dependency resolution fails because an artifact is unavailable.",
      "Two libraries require incompatible versions of the same component.",
      "An application compiles but fails at runtime due to a missing dependency.",
      "An unintended library is introduced through a transitive dependency."
    ],
    [
      "Inspect the full dependency tree and identify the introducing dependency.",
      "Check repository availability and artifact coordinates.",
      "Use dependencyManagement or a targeted exclusion to resolve conflicts.",
      "Run tests that exercise the affected runtime functionality.",
      "Review the final dependency graph before release."
    ],
    [
      "Declare only dependencies actually used by the application.",
      "Centralize versions through a parent or BOM.",
      "Review dependency trees during upgrades.",
      "Scan dependencies for known vulnerabilities.",
      "Avoid committing downloaded JAR files into the repository."
    ],
    "Add Spring Web and Spring Boot Test to a sample POM. Run dependency:tree, identify their resolved versions and explain how the parent POM controls dependency versions."
  ),

  "4|Dependency Scopes": makeLesson(
    "Maven dependency scope controls when a dependency is available during compilation, testing and runtime. Common scopes include compile, provided, runtime, test and system. Scope affects classpaths and dependency propagation, so choosing the wrong scope can cause missing classes or unnecessarily large application packages.",
    "Scopes keep application dependencies aligned with the environment where they are needed. For example, a test library should not become a production runtime dependency, while a runtime database driver must be available when the application starts.",
    "Dependency declaration → scope selection → compile and test classpaths → packaging behavior → application runtime classpath.",
    [
      "Identify whether the library is needed for compilation, testing or runtime.",
      "Select the appropriate Maven scope.",
      "Inspect the resolved dependency tree.",
      "Compile and run tests.",
      "Package the application and inspect its contents.",
      "Validate that required runtime libraries are available."
    ],
    "The payment-service uses Spring Boot Test with test scope because it is needed only during automated testing. A JDBC driver may use runtime scope if application code does not directly reference its classes during compilation.",
    [
      "mvn dependency:tree",
      "mvn dependency:tree -Dscope=test",
      "mvn dependency:tree -Dscope=runtime",
      "mvn clean test",
      "mvn package"
    ],
    "Declare scope inside each dependency. Use compile when no scope is specified and normal compile/runtime availability is required. Use test for testing libraries, provided when the runtime environment supplies the library, and runtime for dependencies needed only during execution.",
    [
      "A test library is included in a production dependency set.",
      "A runtime library is missing when the application starts.",
      "A provided dependency is absent from the actual deployment environment.",
      "A system-scoped dependency works only on one developer machine."
    ],
    [
      "Inspect the dependency scope in the effective POM and dependency tree.",
      "Compare the expected classpath with the actual deployment runtime.",
      "Change the scope only after confirming where the dependency is required.",
      "Rebuild the package and inspect its contents.",
      "Run an integration test using the same runtime environment as deployment."
    ],
    [
      "Choose scopes based on actual usage.",
      "Use test scope for test-only libraries.",
      "Avoid system scope because it relies on machine-specific paths.",
      "Verify provided dependencies exist in the target runtime.",
      "Review packaged artifacts after scope changes."
    ],
    "Create a Maven project with a test library, a runtime database driver and a compile-time application library. Assign suitable scopes, inspect dependency:tree and explain which classpaths contain each dependency."
  ),

  "4|Transitive Dependencies": makeLesson(
    "A transitive dependency is a library required by another dependency. Maven automatically resolves these additional libraries and builds a dependency graph. This saves developers from declaring every supporting library manually, but it can also introduce unexpected versions or vulnerable components.",
    "Understanding transitive dependencies is essential when diagnosing version conflicts, class-loading failures and security findings. Engineers must know which direct dependency introduced an unexpected library.",
    "Direct dependency → its declared dependencies → further transitive dependencies → conflict mediation → resolved dependency graph and classpath.",
    [
      "Declare the application's direct dependencies.",
      "Run dependency:tree to view transitive relationships.",
      "Identify which direct library introduces a particular artifact.",
      "Check whether Maven selected the expected version.",
      "Use dependencyManagement or exclusions when a justified correction is needed.",
      "Run tests and scan the final dependency set."
    ],
    "A payment-service adds a Spring starter. That starter brings several supporting Spring libraries transitively. If an older logging library enters through another dependency, the team traces its path and corrects the dependency graph.",
    [
      "mvn dependency:tree",
      "mvn dependency:tree -Dverbose",
      "mvn dependency:tree -Dincludes=org.slf4j",
      "mvn dependency:analyze",
      "mvn clean verify"
    ],
    "Use dependencyManagement to control versions where appropriate. Use exclusions on the dependency that introduces an unwanted transitive artifact. Do not remove a transitive library until its role and runtime impact are understood.",
    [
      "An unexpected transitive version wins during dependency mediation.",
      "A required class is missing after an exclusion.",
      "A vulnerable transitive library is discovered by a scanner.",
      "Different direct dependencies introduce incompatible library versions."
    ],
    [
      "Use dependency:tree -Dverbose to inspect omitted and selected versions.",
      "Identify the direct dependency that introduces the artifact.",
      "Check compatibility requirements before changing its version.",
      "Apply a narrow exclusion or managed version.",
      "Run unit and integration tests and rescan dependencies."
    ],
    [
      "Review transitive dependencies during major upgrades.",
      "Prefer targeted exclusions over broad dependency removal.",
      "Use dependency management for consistent versions.",
      "Scan the complete resolved dependency graph.",
      "Document compatibility decisions for critical libraries."
    ],
    "Add two dependencies that introduce a common transitive library. Inspect the dependency tree, identify the selected version and document how you would resolve a version conflict safely."
  ),

  "4|Build Lifecycle": makeLesson(
    "The Maven build lifecycle is an ordered sequence of phases used to perform a build. Important phases include validate, compile, test, package, verify, install and deploy. Running a later phase executes the preceding phases in that lifecycle, which gives Maven a predictable build process.",
    "The lifecycle standardizes how Java applications are built. Jenkins can use mvn clean verify to execute the required validation, compilation, testing, packaging and verification steps through one repeatable command.",
    "Maven command → lifecycle selection → ordered phase execution → plugin goals bound to phases → compiled output, reports and packaged artifact.",
    [
      "Start with validate to check the project model.",
      "Run compile to build application classes.",
      "Run test to execute unit tests.",
      "Run package to create the configured artifact.",
      "Run verify to execute additional verification checks.",
      "Use install or deploy only when publishing to the intended repository is required."
    ],
    "The payment-service Jenkins pipeline runs mvn clean verify. Maven executes the required earlier phases, including compilation, tests and packaging, before completing verification.",
    [
      "mvn validate",
      "mvn compile",
      "mvn test",
      "mvn package",
      "mvn verify",
      "mvn install",
      "mvn deploy"
    ],
    "Bind build plugins to lifecycle phases in the POM. Use clean before a fresh build when stale output could affect results. Configure repository distribution details carefully before using deploy because it publishes artifacts to a remote repository.",
    [
      "A lifecycle phase fails because an earlier phase failed.",
      "Tests are skipped due to an unintended build property.",
      "The package phase produces an artifact with unexpected contents.",
      "Deploy fails because repository credentials or distribution configuration are missing."
    ],
    [
      "Identify the exact lifecycle phase that failed.",
      "Inspect the first plugin or test error in the output.",
      "Check whether tests were skipped or excluded.",
      "Inspect target output after package or verify.",
      "Validate repository settings before attempting deploy again."
    ],
    [
      "Understand which phases are executed by each requested phase.",
      "Use verify as a strong local and CI validation target.",
      "Do not use deploy casually against production repositories.",
      "Keep lifecycle configuration explicit.",
      "Retain build logs and reports for failed runs."
    ],
    "Run Maven phases in order on a sample project. Compare mvn package with mvn verify and document which steps execute when a later lifecycle phase is requested."
  ),

  "4|Phases and Goals": makeLesson(
    "A Maven phase is a named point in a lifecycle, while a plugin goal performs a specific task. A phase can have one or more plugin goals bound to it. Engineers can also invoke a plugin goal directly, such as dependency:tree or help:effective-pom.",
    "Knowing the difference helps engineers understand why Maven executes particular tasks and how custom build behavior is attached to lifecycle phases. It is also useful when debugging plugin configuration.",
    "Lifecycle phase → configured plugin binding → plugin goal → task execution → build output or report.",
    [
      "Identify the lifecycle phase required by the build.",
      "Inspect which plugin goals are bound to that phase.",
      "Run the phase and review the executed plugin goals.",
      "Invoke a diagnostic plugin goal directly when needed.",
      "Configure a plugin execution if the project needs custom behavior.",
      "Verify the result in the target directory or report output."
    ],
    "The payment-service runs the package phase, which invokes the configured packaging plugin. The team separately runs dependency:tree to investigate library resolution without changing the application package.",
    [
      "mvn package",
      "mvn clean verify",
      "mvn dependency:tree",
      "mvn help:effective-pom",
      "mvn help:describe -Dplugin=org.apache.maven.plugins:maven-compiler-plugin",
      "mvn compiler:compile"
    ],
    "Configure plugin goals under build/plugins and specify executions and phase bindings when necessary. Prefer standard lifecycle bindings unless a real project requirement needs custom behavior. Pin plugin versions.",
    [
      "A goal is invoked with incorrect plugin coordinates.",
      "A plugin goal is not bound to the expected lifecycle phase.",
      "The configured goal runs more than once.",
      "A direct goal invocation skips required earlier build phases."
    ],
    [
      "Use help:describe to inspect plugin goals and parameters.",
      "Generate the effective POM to inspect plugin executions.",
      "Check the exact lifecycle phase used by the pipeline.",
      "Run the required lifecycle phase instead of an isolated goal when dependencies must be prepared.",
      "Validate the output and report after correcting the binding."
    ],
    [
      "Understand phase ordering and goal execution.",
      "Use direct goals for diagnostics and targeted tasks.",
      "Use lifecycle phases for complete build workflows.",
      "Pin plugin versions and document custom executions.",
      "Avoid duplicate plugin bindings."
    ],
    "Inspect the compiler and Surefire plugin goals in a sample POM. Run compile and test phases, identify the plugin goals invoked and explain why a lifecycle phase differs from a direct goal."
  ),

  "4|Maven Plugins": makeLesson(
    "Maven plugins provide the operations that perform compilation, testing, packaging, reporting and other build tasks. Maven itself coordinates the lifecycle, while plugins implement many of the actions. Common examples include the compiler, Surefire, Failsafe, JAR and Spring Boot Maven plugins.",
    "Plugins make the build extensible and configurable. Pinning plugin versions and reviewing their configuration prevents unexpected behavior when a new plugin release becomes available.",
    "Maven lifecycle → plugin binding → plugin configuration in pom.xml → goal execution → classes, test reports, packages and verification output.",
    [
      "Identify the build operation that requires a plugin.",
      "Find the correct plugin coordinates and supported version.",
      "Add the plugin under the build/plugins section.",
      "Configure the required goals and parameters.",
      "Run the related lifecycle phase.",
      "Inspect logs and generated outputs."
    ],
    "The payment-service uses the Maven Compiler Plugin to compile Java sources and the Spring Boot Maven Plugin to create an executable application package. Jenkins verifies the output before archiving it.",
    [
      "mvn help:describe -Dplugin=org.apache.maven.plugins:maven-compiler-plugin",
      "mvn help:describe -Dplugin=org.apache.maven.plugins:maven-surefire-plugin",
      "mvn help:effective-pom",
      "mvn clean compile",
      "mvn test",
      "mvn package"
    ],
    "Declare plugins under build/plugins and specify stable versions. Configure compiler release, test execution and packaging behavior explicitly. Avoid relying on undocumented defaults that may differ across Maven environments.",
    [
      "Plugin cannot be downloaded from configured repositories.",
      "Plugin version is incompatible with the project or Maven runtime.",
      "A plugin parameter is misspelled or has an invalid value.",
      "Plugin execution is bound to the wrong phase."
    ],
    [
      "Inspect Maven's plugin resolution error and repository settings.",
      "Check plugin compatibility and configured version.",
      "Use help:describe to confirm valid parameters.",
      "Inspect effective POM and plugin execution bindings.",
      "Rerun the relevant phase and verify generated files."
    ],
    [
      "Pin plugin versions in the POM.",
      "Use maintained and trusted plugins.",
      "Keep plugin configuration understandable.",
      "Review plugin changes during dependency upgrades.",
      "Test plugin updates in CI before production adoption."
    ],
    "Configure the Maven Compiler Plugin with an explicit Java release and run mvn clean compile. Inspect the effective POM and explain which plugin goal performs compilation."
  ),

  "4|Maven Profiles": makeLesson(
    "Maven profiles allow different build configuration to be activated for different environments or conditions. A profile can define properties, dependencies, plugin settings and other project configuration. Profiles can be activated explicitly or through supported conditions.",
    "Profiles help teams manage development, testing and production build differences without maintaining unrelated POM files. They should not become a place to store passwords or other sensitive environment values.",
    "Base POM → profile activation → effective model → selected properties and plugin configuration → build output.",
    [
      "Define a common base configuration in pom.xml.",
      "Create profiles for justified build variations.",
      "Activate a profile explicitly or through a documented condition.",
      "Inspect active profiles and the effective POM.",
      "Run the build using the selected profile.",
      "Verify that the output matches the intended environment."
    ],
    "The payment-service uses a dev profile for local development settings and a production profile for production-specific build metadata. Actual database passwords and API keys are supplied through a secure runtime secret mechanism, not stored in the POM.",
    [
      "mvn help:all-profiles",
      "mvn help:active-profiles",
      "mvn help:effective-pom -Pdev",
      "mvn clean verify -Pdev",
      "mvn clean verify -Pproduction"
    ],
    "Define profiles inside the profiles section and activate them with -PprofileId when required. Keep common configuration in the base POM. Do not use Maven profiles as a substitute for secure runtime configuration or deployment secrets.",
    [
      "The intended profile is not activated.",
      "Two active profiles override the same property unexpectedly.",
      "A developer's machine activates a profile automatically but Jenkins does not.",
      "Sensitive values are accidentally committed inside profile configuration."
    ],
    [
      "Run help:active-profiles to see the active profile set.",
      "Inspect the effective POM with the intended profile.",
      "Check activation conditions and command-line profile selection.",
      "Move sensitive values to a secret manager or protected CI credential.",
      "Rebuild with an explicit and verified profile."
    ],
    [
      "Keep profiles few and purpose-specific.",
      "Prefer explicit profile activation in CI.",
      "Keep secrets outside source-controlled POM files.",
      "Inspect active profiles during troubleshooting.",
      "Avoid uncontrolled profile combinations."
    ],
    "Create dev and production Maven profiles with different non-secret properties. Run help:active-profiles and help:effective-pom for each profile and verify that the expected values are selected."
  ),

  "4|Repositories": makeLesson(
    "Maven repositories store project artifacts, dependencies and plugins. The local repository is a cache on the build machine, while remote repositories provide artifacts shared across teams. Maven Central is a common public repository, and organizations often use private repositories such as Nexus or Artifactory.",
    "Repositories allow Maven to resolve dependencies consistently and allow teams to publish reusable internal libraries. Repository configuration also affects build availability, security and dependency provenance.",
    "pom.xml and settings.xml → local repository lookup → configured remote repositories → artifact download → local cache → build or artifact publication.",
    [
      "Identify the dependency or plugin Maven needs.",
      "Check the local Maven repository.",
      "Inspect remote repository configuration.",
      "Verify network and authentication access.",
      "Resolve the dependency and inspect its version.",
      "Publish internal artifacts only to the intended repository."
    ],
    "The payment-service downloads public Spring libraries and internal company libraries from a Nexus repository. Jenkins uses a protected Maven settings file to authenticate to the private repository without committing credentials to Git.",
    [
      "mvn help:effective-settings",
      "mvn dependency:resolve",
      "mvn dependency:tree",
      "mvn -U clean verify",
      "mvn deploy"
    ],
    "Use repositories and distributionManagement in the appropriate POM sections. Put server credentials in the user's settings.xml under matching server IDs. In CI, provide settings through protected configuration and avoid committing passwords or tokens.",
    [
      "Maven cannot resolve an artifact because the repository is unreachable.",
      "Private repository authentication returns 401 or 403.",
      "A repository contains an incorrect or missing artifact version.",
      "A cached artifact hides a newly published repository correction."
    ],
    [
      "Inspect Maven's download URL and repository ID in the error output.",
      "Verify DNS, proxy and TLS connectivity to the repository.",
      "Check server IDs and credentials in the active settings.xml.",
      "Use -U when an update check is appropriate.",
      "Verify the artifact exists in the expected repository before rebuilding."
    ],
    [
      "Use trusted repositories and controlled mirrors.",
      "Keep credentials in settings.xml or secure CI credentials.",
      "Use immutable release versions where possible.",
      "Protect internal artifact repositories with access controls.",
      "Monitor repository availability and storage."
    ],
    "Configure a test Maven project to resolve one public dependency and one internal test artifact from a repository manager. Inspect effective settings and verify that credentials are not present in source control."
  ),

  "4|Spring Boot Packaging": makeLesson(
    "Spring Boot packaging creates an executable application artifact that includes the application classes and required runtime dependencies. The Spring Boot Maven Plugin can repackage a conventional JAR into an executable archive with a suitable launcher and nested dependencies.",
    "Executable packaging makes it easier to run the same application artifact on developer machines, Jenkins agents, virtual machines and container images. The deployment pipeline can promote a verified JAR instead of reconstructing the application at every environment.",
    "Java source and resources → Maven compile and package → Spring Boot repackage goal → executable JAR → java -jar → application runtime.",
    [
      "Configure the Spring Boot Maven Plugin.",
      "Verify the application main class and build configuration.",
      "Run mvn clean package.",
      "Inspect the generated JAR and its nested dependencies.",
      "Start the JAR in a test environment.",
      "Verify the health endpoint and application logs."
    ],
    "Jenkins packages payment-service.jar after all tests pass. A Docker build stage copies that exact JAR into the runtime image. The container starts the application using java -jar.",
    [
      "mvn clean package",
      "jar tf target/payment-service.jar",
      "java -jar target/payment-service.jar",
      "curl -I http://localhost:8080/actuator/health",
      "mvn help:effective-pom"
    ],
    "Configure the Spring Boot Maven Plugin under build/plugins and ensure it is compatible with the selected Spring Boot version. Use a supported Java runtime and keep application configuration and secrets outside the packaged artifact.",
    [
      "JAR is created but cannot run because it lacks the expected launcher.",
      "Application fails because the main class or plugin configuration is incorrect.",
      "A required runtime dependency is missing.",
      "The application starts locally but fails due to missing environment configuration."
    ],
    [
      "Inspect the effective POM and Spring Boot plugin execution.",
      "Inspect the JAR contents with jar tf.",
      "Run java -jar and capture the first startup exception.",
      "Check Java compatibility and runtime dependencies.",
      "Verify environment variables and external service connectivity."
    ],
    [
      "Build executable artifacts through a controlled Maven configuration.",
      "Test the packaged JAR rather than only running from an IDE.",
      "Keep secrets and environment-specific configuration external.",
      "Record the artifact checksum and source commit.",
      "Promote the same verified artifact across environments."
    ],
    "Package a Spring Boot payment-service as an executable JAR. Inspect its contents, start it using java -jar and verify the health endpoint. Record the artifact checksum for the next Docker stage."
  ),

  "4|Surefire and Failsafe": makeLesson(
    "Maven Surefire Plugin runs unit tests during the test phase. Maven Failsafe Plugin is commonly used for integration tests, with its goals bound to integration-test and verify phases. Separating these test types helps teams control test execution and ensure integration checks complete before the build is accepted.",
    "Unit tests validate individual components quickly, while integration tests verify interactions between application components or external services. Correct plugin configuration helps Jenkins report failures clearly and prevents a release from passing when required tests were not executed.",
    "Maven test lifecycle → Surefire unit tests → integration-test phase → Failsafe integration tests → verify phase → build result and test reports.",
    [
      "Place unit tests in the project's test source directory.",
      "Configure Surefire for the unit test naming conventions.",
      "Configure Failsafe for integration test naming conventions.",
      "Run mvn test and inspect Surefire reports.",
      "Run mvn verify to execute the configured integration lifecycle.",
      "Inspect both report sets and confirm failures affect the build."
    ],
    "The payment-service uses Surefire for PaymentServiceTest and Failsafe for PaymentRepositoryIT. Jenkins executes mvn clean verify so unit and integration tests run before the JAR is promoted.",
    [
      "mvn test",
      "mvn -Dtest=PaymentServiceTest test",
      "mvn integration-test",
      "mvn verify",
      "Get-ChildItem .\\target\\surefire-reports",
      "Get-ChildItem .\\target\\failsafe-reports"
    ],
    "Configure plugin versions and test include/exclude patterns carefully. Bind Failsafe integration-test and verify goals to their intended lifecycle phases. Use mvn verify for the complete configured test lifecycle rather than stopping at integration-test.",
    [
      "Unit tests are not discovered because naming patterns are incorrect.",
      "Integration tests run during the wrong lifecycle phase.",
      "A test fails but the pipeline does not inspect its report.",
      "External test services are unavailable and cause integration failures."
    ],
    [
      "Inspect Surefire and Failsafe report directories.",
      "Check test class names and plugin include patterns.",
      "Run the relevant Maven lifecycle phase and inspect plugin execution logs.",
      "Verify databases, containers and external services required by integration tests.",
      "Rerun mvn verify and confirm that failures return a non-zero build result."
    ],
    [
      "Keep unit and integration tests clearly separated.",
      "Use mvn verify for release validation.",
      "Publish both report types in Jenkins.",
      "Make integration dependencies reproducible.",
      "Do not silently skip failed tests in release builds."
    ],
    "Create one unit test and one integration test for the payment service. Configure Surefire and Failsafe, run mvn verify and inspect both report directories. Introduce a controlled failing integration assertion and verify the build fails."
  ),

  "4|Build Troubleshooting": makeLesson(
    "Maven build troubleshooting is the process of identifying why a project cannot validate, compile, test, package or resolve dependencies. A Maven error may originate from Java compatibility, invalid POM configuration, repository access, plugin execution, test failures or insufficient machine resources.",
    "A structured diagnostic process prevents engineers from making random changes or repeatedly rerunning the full pipeline. The first meaningful error usually provides a better clue than the final summary line.",
    "Jenkins build step → Maven lifecycle and plugin execution → dependency or compiler operation → first failing error → diagnostic evidence → corrective action and rebuild.",
    [
      "Identify the exact Maven command and build environment.",
      "Find the first meaningful error in the console log.",
      "Verify Java and Maven versions.",
      "Inspect POM configuration and effective settings.",
      "Check dependency resolution, repository access and test reports.",
      "Correct the root cause and rerun the smallest useful validation."
    ],
    "The payment-service Jenkins build fails because the agent uses an older JDK than the Java release configured in pom.xml. The engineer confirms mvn -version, updates the agent toolchain and reruns clean verify.",
    [
      "mvn -version",
      "mvn validate",
      "mvn -e clean verify",
      "mvn -X validate",
      "mvn dependency:tree",
      "mvn help:effective-pom",
      "mvn clean verify"
    ],
    "Configure consistent JDK and Maven versions, stable plugin versions, repository mirrors and appropriate build timeouts. Use -e for exception details and -X for detailed diagnostics only when needed. Avoid exposing credentials in debug logs.",
    [
      "Compilation fails with an unsupported Java release.",
      "Dependency resolution returns missing artifact or authentication errors.",
      "A plugin fails because of invalid configuration or incompatible versions.",
      "Tests fail or hang due to external service dependencies.",
      "The agent runs out of disk space or memory."
    ],
    [
      "Read the first error and identify whether it belongs to Java, Maven, a plugin, dependency resolution or tests.",
      "Check mvn -version and compare it with the POM Java release.",
      "Inspect effective POM, settings and dependency tree.",
      "Check repository connectivity and agent resource usage.",
      "Run the failing phase independently and verify the fix before a full pipeline retry."
    ],
    [
      "Keep tool versions consistent between local and CI environments.",
      "Preserve complete build logs and test reports.",
      "Use diagnostic flags only when needed.",
      "Avoid disabling tests to hide build failures.",
      "Record root causes and permanent preventive actions."
    ],
    "Create a Maven build failure in a test branch by selecting an incompatible Java release or an invalid dependency version. Diagnose it from the console log, fix the configuration and prove that mvn clean verify succeeds."
  ),

  "4|Production Hands-on Lab": makeLesson(
    "This lab combines Maven installation, POM configuration, dependency management, lifecycle execution, plugins, profiles, repositories, Spring Boot packaging and test reporting. The result is a reproducible payment-service build that Jenkins can consume in the next CI/CD stages.",
    "A complete lab demonstrates how a Java application becomes a verified release artifact. It teaches engineers to distinguish build success from actual test and package validation and to preserve evidence for later container creation.",
    "GitHub payment-service repository → Jenkins Java and Maven toolchain → POM model → dependency resolution → compile → Surefire and Failsafe tests → Spring Boot executable JAR → checksum and archived artifact.",
    [
      "Prepare a Spring Boot payment-service repository.",
      "Install and verify the required JDK and Maven versions.",
      "Configure project coordinates and Java release in pom.xml.",
      "Add required application and test dependencies.",
      "Configure compiler, Surefire, Failsafe and Spring Boot plugins.",
      "Create environment profiles using non-secret properties.",
      "Run mvn clean verify and inspect all test reports.",
      "Start the packaged JAR and verify its health endpoint.",
      "Record the artifact filename, checksum and source commit.",
      "Run the same build on a Jenkins agent and archive the verified JAR."
    ],
    "The payment-service is checked out by Jenkins, built using a controlled Maven toolchain, tested through unit and integration tests, packaged as an executable JAR and archived with its commit SHA and checksum. A deliberately broken test blocks the pipeline until corrected.",
    [
      "java -version",
      "mvn -version",
      "mvn help:effective-pom",
      "mvn dependency:tree",
      "mvn clean verify",
      "jar tf target/payment-service.jar",
      "java -jar target/payment-service.jar",
      "Get-FileHash .\\target\\payment-service.jar -Algorithm SHA256",
      "git rev-parse HEAD"
    ],
    "Keep all build configuration in the project POM and Jenkinsfile. Use version-controlled plugin settings, explicit Java release, test report publication and protected repository credentials. Do not store passwords in Maven profiles or commit settings.xml containing secrets.",
    [
      "Jenkins agent uses a different JDK or Maven version from the expected toolchain.",
      "Dependency resolution fails because the private repository is unreachable.",
      "Surefire or Failsafe does not discover the intended test classes.",
      "Spring Boot packaging produces a non-executable or incomplete JAR.",
      "The packaged application fails its startup or health check."
    ],
    [
      "Compare the agent toolchain with mvn -version.",
      "Inspect the effective POM and repository settings.",
      "Review dependency:tree and test report directories.",
      "Inspect the JAR contents and Spring Boot plugin execution.",
      "Run the artifact in a test environment and inspect startup logs.",
      "Rebuild from the intended Git commit and verify the checksum before archiving."
    ],
    [
      "Use reproducible JDK and Maven toolchains.",
      "Pin dependencies and plugin versions.",
      "Run clean verify before release packaging.",
      "Publish unit and integration test reports.",
      "Promote the exact tested artifact instead of rebuilding it later.",
      "Keep secrets outside source control.",
      "Record commit SHA, build number and artifact checksum."
    ],
    "Complete the payment-service Maven build from checkout to executable JAR. Demonstrate dependency resolution, unit tests, integration tests, packaging and runtime health validation. Introduce one controlled failure, capture the evidence, correct it and produce a final verified artifact with its checksum."
  )
};
