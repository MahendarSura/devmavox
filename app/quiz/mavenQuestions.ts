export interface MavenQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const mavenQuestions: MavenQuestion[] = [
  {
    question: "1. What is Apache Maven primarily used for?",
    options: [
      "Managing Linux users",
      "Building projects and managing dependencies",
      "Monitoring CPU usage",
      "Creating virtual machines"
    ],
    answer: 1
  },
  {
    question: "2. Which file is the main configuration file of a Maven project?",
    options: [
      "build.gradle",
      "Dockerfile",
      "pom.xml",
      "package.json"
    ],
    answer: 2
  },
  {
    question: "3. What does POM stand for?",
    options: [
      "Project Object Model",
      "Program Output Manager",
      "Package Operation Method",
      "Project Order Mapping"
    ],
    answer: 0
  },
  {
    question: "4. Which command checks the installed Maven version?",
    options: [
      "mvn install",
      "mvn package",
      "mvn compile",
      "mvn -version"
    ],
    answer: 3
  },
  {
    question: "5. Which command compiles a Maven project?",
    options: [
      "mvn clean",
      "mvn compile",
      "mvn site",
      "mvn validate"
    ],
    answer: 1
  },
  {
    question: "6. Which command removes build output from the target directory?",
    options: [
      "mvn verify",
      "mvn deploy",
      "mvn clean",
      "mvn test"
    ],
    answer: 2
  },
  {
    question: "7. Which Maven command compiles the code, runs tests, and creates the package?",
    options: [
      "mvn package",
      "mvn clean",
      "mvn help",
      "mvn validate"
    ],
    answer: 0
  },
  {
    question: "8. Which command installs a project's artifact into the local Maven repository?",
    options: [
      "mvn compile",
      "mvn validate",
      "mvn clean",
      "mvn install"
    ],
    answer: 3
  },
  {
    question: "9. Which command normally uploads a project artifact to a configured remote repository?",
    options: [
      "mvn test",
      "mvn deploy",
      "mvn clean",
      "mvn validate"
    ],
    answer: 1
  },
  {
    question: "10. Where are Maven build output files normally generated?",
    options: [
      "src/main",
      "src/test",
      "target",
      ".git"
    ],
    answer: 2
  },
  {
    question: "11. Which Maven lifecycle phase validates that the project is correct and necessary information is available?",
    options: [
      "validate",
      "package",
      "deploy",
      "clean"
    ],
    answer: 0
  },
  {
    question: "12. What does the test phase primarily do?",
    options: [
      "Uploads the artifact to production",
      "Deletes source files",
      "Creates a remote repository",
      "Runs unit tests"
    ],
    answer: 3
  },
  {
    question: "13. What does the verify phase generally do?",
    options: [
      "Only deletes target",
      "Runs checks on the results of integration and package-related work",
      "Only downloads dependencies",
      "Only creates Java source files"
    ],
    answer: 1
  },
  {
    question: "14. What does the package phase do?",
    options: [
      "Deletes the local repository",
      "Starts a Jenkins server",
      "Packages compiled code into a distributable format",
      "Creates Linux users"
    ],
    answer: 2
  },
  {
    question: "15. Which Maven lifecycle is used to clean previous build output?",
    options: [
      "Clean lifecycle",
      "Default lifecycle",
      "Site lifecycle",
      "Deploy lifecycle"
    ],
    answer: 0
  },
  {
    question: "16. What happens when you run mvn package?",
    options: [
      "Only the package phase runs with no preceding phases",
      "Only unit tests run",
      "The remote artifact is always deployed",
      "Earlier phases in the default lifecycle are executed first"
    ],
    answer: 3
  },
  {
    question: "17. Which command runs the default lifecycle through the verify phase?",
    options: [
      "mvn clean",
      "mvn verify",
      "mvn help",
      "mvn site"
    ],
    answer: 1
  },
  {
    question: "18. What is the difference between a Maven phase and a goal?",
    options: [
      "They always mean exactly the same thing",
      "A goal is a repository; a phase is a dependency",
      "A phase is a lifecycle step, while a goal performs a specific task",
      "A phase only applies to Linux"
    ],
    answer: 2
  },
  {
    question: "19. What is a Maven plugin?",
    options: [
      "A component that provides build tasks through goals",
      "A Linux kernel module",
      "A Git branch",
      "A Java database"
    ],
    answer: 0
  },
  {
    question: "20. What is the purpose of a Maven goal?",
    options: [
      "Store passwords in source code",
      "Create a Git repository",
      "Manage Linux permissions",
      "Execute a specific build task"
    ],
    answer: 3
  },
  {
    question: "21. Which POM element defines a project's group identifier?",
    options: [
      "<name>",
      "<groupId>",
      "<version>",
      "<packaging>"
    ],
    answer: 1
  },
  {
    question: "22. Which POM element identifies the artifact's name within its group?",
    options: [
      "<description>",
      "<url>",
      "<artifactId>",
      "<scope>"
    ],
    answer: 2
  },
  {
    question: "23. Which three coordinates commonly identify a Maven artifact?",
    options: [
      "groupId, artifactId, version",
      "username, password, host",
      "branch, commit, tag",
      "CPU, RAM, disk"
    ],
    answer: 0
  },
  {
    question: "24. Which POM element specifies the project's packaging type?",
    options: [
      "<scope>",
      "<modules>",
      "<properties>",
      "<packaging>"
    ],
    answer: 3
  },
  {
    question: "25. What is the default packaging type for many Java Maven projects?",
    options: [
      "war",
      "jar",
      "pom",
      "ear"
    ],
    answer: 1
  },
  {
    question: "26. What does packaging type war usually produce?",
    options: [
      "A Linux executable",
      "A Maven settings file",
      "A Web Application Archive",
      "A Git patch"
    ],
    answer: 2
  },
  {
    question: "27. Which POM element declares a project dependency?",
    options: [
      "<dependency>",
      "<plugin>",
      "<profile>",
      "<repository>"
    ],
    answer: 0
  },
  {
    question: "28. Which POM section contains normal project dependencies?",
    options: [
      "<build>",
      "<developers>",
      "<distributionManagement>",
      "<dependencies>"
    ],
    answer: 3
  },
  {
    question: "29. What is the purpose of dependency management in a parent POM?",
    options: [
      "Automatically run every plugin goal",
      "Centralize dependency versions and related configuration",
      "Delete transitive dependencies from all builds",
      "Replace the Maven lifecycle"
    ],
    answer: 1
  },
  {
    question: "30. Does dependencyManagement alone normally add a dependency to a module's classpath?",
    options: [
      "Yes, every managed dependency is always added",
      "Only on Linux",
      "No, the module normally must declare the dependency",
      "Yes, but only after mvn clean"
    ],
    answer: 2
  },
  {
    question: "31. What does Maven mean by a transitive dependency?",
    options: [
      "A dependency required by one of your direct dependencies",
      "A dependency that is never downloaded",
      "A Git submodule",
      "A Linux package"
    ],
    answer: 0
  },
  {
    question: "32. What is the purpose of dependency scope?",
    options: [
      "Set the server hostname",
      "Choose the Git branch",
      "Specify the JDK installation directory only",
      "Control dependency availability across build stages and classpaths"
    ],
    answer: 3
  },
  {
    question: "33. Which dependency scope is commonly used for JUnit in unit tests?",
    options: [
      "provided",
      "test",
      "system",
      "import"
    ],
    answer: 1
  },
  {
    question: "34. What does the compile scope mean?",
    options: [
      "The dependency is only available at runtime",
      "The dependency is never included in the classpath",
      "The dependency is available for compilation and generally runtime",
      "The dependency is only available to Maven itself"
    ],
    answer: 2
  },
  {
    question: "35. What does the provided scope generally indicate?",
    options: [
      "The JDK or runtime environment is expected to provide the dependency",
      "The dependency must always be bundled into the application",
      "The dependency is only for source control",
      "The dependency is deleted before compilation"
    ],
    answer: 0
  },
  {
    question: "36. Which scope is generally intended for dependencies needed at runtime but not compilation?",
    options: [
      "test",
      "provided",
      "import",
      "runtime"
    ],
    answer: 3
  },
  {
    question: "37. What is the purpose of optional=true on a dependency?",
    options: [
      "It forces the dependency to be downloaded from every repository",
      "It prevents the dependency from being transitively required by downstream consumers by default",
      "It makes the dependency a Maven plugin",
      "It automatically changes its version"
    ],
    answer: 1
  },
  {
    question: "38. What does an exclusion in a dependency declaration do?",
    options: [
      "Excludes the entire Maven lifecycle",
      "Deletes the dependency from the remote repository",
      "Prevents a specified transitive dependency from being brought in through that dependency path",
      "Removes the dependency from all other projects globally"
    ],
    answer: 2
  },
  {
    question: "39. How does Maven generally resolve conflicting versions of the same dependency?",
    options: [
      "It commonly uses nearest-definition mediation, with declaration order relevant for ties",
      "It always selects the newest version",
      "It always selects the oldest version",
      "It downloads every version into one identical classpath"
    ],
    answer: 0
  },
  {
    question: "40. Which command helps inspect a project's dependency tree?",
    options: [
      "mvn clean",
      "mvn validate",
      "mvn package-only",
      "mvn dependency:tree"
    ],
    answer: 3
  },
  {
    question: "41. Which command can help identify unused declared dependencies?",
    options: [
      "mvn clean",
      "mvn dependency:analyze",
      "mvn site:run-only",
      "mvn deploy:delete"
    ],
    answer: 1
  },
  {
    question: "42. Where is the default local Maven repository typically located?",
    options: [
      "/etc/maven",
      "/usr/bin/mvn",
      "~/.m2/repository",
      "/var/log/maven"
    ],
    answer: 2
  },
  {
    question: "43. Which file commonly configures Maven user-level settings and credentials?",
    options: [
      "~/.m2/settings.xml",
      "~/.gitconfig only",
      "/etc/hosts",
      "src/main/java/settings.xml"
    ],
    answer: 0
  },
  {
    question: "44. What is Maven Central?",
    options: [
      "A local Java source directory",
      "A Jenkins agent",
      "A Git hosting branch",
      "A public repository containing Java and other build artifacts"
    ],
    answer: 3
  },
  {
    question: "45. What is a remote Maven repository?",
    options: [
      "A local target directory",
      "A server or repository endpoint from which artifacts can be retrieved or to which artifacts can be published",
      "A Java package declaration",
      "A shell history file"
    ],
    answer: 1
  },
  {
    question: "46. What is the purpose of a repository mirror in settings.xml?",
    options: [
      "Change the Java language version automatically",
      "Delete all remote repositories",
      "Route repository requests through an alternate repository endpoint",
      "Disable dependency resolution permanently"
    ],
    answer: 2
  },
  {
    question: "47. Which setting identifies credentials for a matching repository server ID?",
    options: [
      "<servers>",
      "<profiles>",
      "<mirrors>",
      "<activeProfiles>"
    ],
    answer: 0
  },
  {
    question: "48. What should match between a repository declaration and its server credentials in settings.xml?",
    options: [
      "The developer's full name",
      "The source file name",
      "The JDK vendor",
      "The repository or distribution server ID"
    ],
    answer: 3
  },
  {
    question: "49. Maven reports that an artifact cannot be found. What should you check first?",
    options: [
      "Only the terminal font",
      "Coordinates, repository configuration, network access, and artifact availability",
      "Only the operating system wallpaper",
      "Only the Git branch name"
    ],
    answer: 1
  },
  {
    question: "50. What does mvn -U do for relevant snapshot and missing-release checks?",
    options: [
      "Uninstalls all dependencies",
      "Updates the Java compiler",
      "Forces checks for updated snapshots and missing releases",
      "Uploads every artifact to production"
    ],
    answer: 2
  },
  {
    question: "51. Which plugin is commonly used to compile Java source code?",
    options: [
      "maven-compiler-plugin",
      "maven-clean-plugin only",
      "maven-site-plugin only",
      "maven-deploy-plugin only"
    ],
    answer: 0
  },
  {
    question: "52. Which plugin is commonly used to execute unit tests?",
    options: [
      "maven-resources-plugin",
      "maven-clean-plugin",
      "maven-help-plugin",
      "maven-surefire-plugin"
    ],
    answer: 3
  },
  {
    question: "53. Which plugin is commonly used for integration tests with Failsafe conventions?",
    options: [
      "maven-jar-plugin",
      "maven-failsafe-plugin",
      "maven-clean-plugin",
      "maven-help-plugin"
    ],
    answer: 1
  },
  {
    question: "54. Which plugin commonly creates a JAR artifact?",
    options: [
      "maven-site-plugin",
      "maven-dependency-plugin",
      "maven-jar-plugin",
      "maven-help-plugin"
    ],
    answer: 2
  },
  {
    question: "55. Which plugin commonly packages a web application as a WAR?",
    options: [
      "maven-war-plugin",
      "maven-clean-plugin",
      "maven-help-plugin",
      "maven-surefire-plugin"
    ],
    answer: 0
  },
  {
    question: "56. What is the purpose of the Maven Resources Plugin?",
    options: [
      "Manage Linux processes",
      "Create Git commits",
      "Configure SSH",
      "Copy and process project resources"
    ],
    answer: 3
  },
  {
    question: "57. What does the Maven Clean Plugin do?",
    options: [
      "Publishes artifacts to a repository",
      "Removes generated build files",
      "Creates a Git tag",
      "Runs production database migrations"
    ],
    answer: 1
  },
  {
    question: "58. What does the Maven Help Plugin help with?",
    options: [
      "Monitoring Kubernetes nodes",
      "Creating Docker images automatically in every project",
      "Inspecting effective POMs, settings, and Maven project information",
      "Managing Linux users"
    ],
    answer: 2
  },
  {
    question: "59. Which command displays the effective POM after inheritance and configuration are applied?",
    options: [
      "mvn help:effective-pom",
      "mvn clean:effective-pom",
      "mvn git:status",
      "mvn docker:logs"
    ],
    answer: 0
  },
  {
    question: "60. Which command displays Maven's effective settings?",
    options: [
      "mvn package:settings",
      "mvn clean:settings",
      "mvn test:settings",
      "mvn help:effective-settings"
    ],
    answer: 3
  },
  {
    question: "61. What is the purpose of properties in pom.xml?",
    options: [
      "Replace all dependencies with plugins",
      "Define reusable configuration values such as version numbers",
      "Delete remote repositories",
      "Create Linux environment users"
    ],
    answer: 1
  },
  {
    question: "62. How can a property named app.version be referenced in a POM?",
    options: [
      "${project.app.version}",
      "$app.version",
      "${app.version}",
      "@app.version@"
    ],
    answer: 2
  },
  {
    question: "63. What is a Maven profile?",
    options: [
      "A set of configuration that can be activated under specified conditions",
      "A replacement for Java source code",
      "A remote Git repository",
      "A Linux user account"
    ],
    answer: 0
  },
  {
    question: "64. Which command explicitly activates a profile named production?",
    options: [
      "mvn --profile production-only",
      "mvn activate production",
      "mvn -Dprofile production",
      "mvn -Pproduction"
    ],
    answer: 3
  },
  {
    question: "65. What is the purpose of parent POM inheritance?",
    options: [
      "Force all modules to use identical source files",
      "Share common build configuration and dependency management",
      "Automatically deploy every commit",
      "Replace the Maven repository"
    ],
    answer: 1
  },
  {
    question: "66. What is a multi-module Maven project?",
    options: [
      "One project with no POM",
      "A project that cannot compile Java",
      "A parent project that aggregates multiple Maven modules",
      "A repository containing only shell scripts"
    ],
    answer: 2
  },
  {
    question: "67. Which POM element lists modules in an aggregator project?",
    options: [
      "<modules>",
      "<servers>",
      "<mirrors>",
      "<licenses>"
    ],
    answer: 0
  },
  {
    question: "68. What does the Maven reactor do?",
    options: [
      "Starts the operating system",
      "Encrypts application passwords",
      "Replaces Git version control",
      "Collects and orders projects for a multi-project build"
    ],
    answer: 3
  },
  {
    question: "69. Which command builds a module and its required reactor projects?",
    options: [
      "mvn -pl module-a",
      "mvn -pl module-a -am",
      "mvn -am module-a-only",
      "mvn --delete-modules"
    ],
    answer: 1
  },
  {
    question: "70. What does the Maven option -pl do?",
    options: [
      "Prints all logs",
      "Publishes every artifact",
      "Selects specific projects or modules to build",
      "Disables the compiler"
    ],
    answer: 2
  },
  {
    question: "71. What is the purpose of the Maven Wrapper?",
    options: [
      "Help run a project with its configured Maven version without requiring a separately installed Maven version",
      "Replace the JDK",
      "Replace the Git repository",
      "Automatically create a production cluster"
    ],
    answer: 0
  },
  {
    question: "72. Which command runs a project using the Maven Wrapper on Linux or macOS?",
    options: [
      "java-wrapper run",
      "maven start",
      "npm mvn",
      "./mvnw clean package"
    ],
    answer: 3
  },
  {
    question: "73. Which command commonly runs a Maven build on Windows using the Wrapper?",
    options: [
      "./mvnw.sh package",
      "mvnw.cmd clean package",
      "npm run maven",
      "java mvnw"
    ],
    answer: 1
  },
  {
    question: "74. What does the -D option commonly do in a Maven command?",
    options: [
      "Deletes the repository",
      "Disables all plugins",
      "Defines a user or system property for the Maven execution",
      "Changes the source code automatically"
    ],
    answer: 2
  },
  {
    question: "75. What does mvn -q generally do?",
    options: [
      "Reduces normal Maven output",
      "Runs every test twice",
      "Forces all dependencies to update",
      "Deploys artifacts automatically"
    ],
    answer: 0
  },
  {
    question: "76. Which Maven option provides additional debug output?",
    options: [
      "-q",
      "-o",
      "-N",
      "-X"
    ],
    answer: 3
  },
  {
    question: "77. Which Maven option runs in offline mode?",
    options: [
      "-X",
      "-o",
      "-U",
      "-T"
    ],
    answer: 1
  },
  {
    question: "78. Maven compilation fails with 'invalid target release'. What should you check?",
    options: [
      "Only the Git remote URL",
      "Only the application port",
      "The installed JDK and compiler source/target or release configuration",
      "Only the Docker image name"
    ],
    answer: 2
  },
  {
    question: "79. Maven reports 'JAVA_HOME is not defined correctly'. What should you check?",
    options: [
      "JAVA_HOME points to a valid JDK installation",
      "The Maven artifact name only",
      "The Jenkins job description only",
      "The Git commit message only"
    ],
    answer: 0
  },
  {
    question: "80. Maven tests fail locally but pass on another machine. What should you compare?",
    options: [
      "Only screen resolution",
      "Only terminal colors",
      "Only username spelling",
      "JDK and Maven versions, environment variables, profiles, and test configuration"
    ],
    answer: 3
  },
  {
    question: "81. What is a common cause of 'Could not resolve dependencies' in CI?",
    options: [
      "The code contains comments",
      "Repository connectivity, credentials, incorrect coordinates, or missing artifacts",
      "The project has a README",
      "The Git branch contains hyphens"
    ],
    answer: 1
  },
  {
    question: "82. Maven downloads dependencies repeatedly in CI. What can improve build efficiency?",
    options: [
      "Delete pom.xml after every build",
      "Disable dependency resolution",
      "Configure a safe cache for the local Maven repository",
      "Download dependencies manually into source code"
    ],
    answer: 2
  },
  {
    question: "83. Which Jenkins pipeline step commonly invokes Maven through a shell?",
    options: [
      "sh 'mvn clean verify'",
      "docker ps",
      "kubectl get pods",
      "git branch --delete"
    ],
    answer: 0
  },
  {
    question: "84. Why is mvn clean verify commonly used in CI pipelines?",
    options: [
      "It skips compilation",
      "It automatically deploys to production",
      "It ignores test failures",
      "It cleans old output and runs the build through verification"
    ],
    answer: 3
  },
  {
    question: "85. How should CI pipelines handle Maven repository credentials?",
    options: [
      "Hardcode passwords in pom.xml",
      "Use the CI secret store and protected settings configuration",
      "Commit plaintext tokens to Git",
      "Print credentials into the build log"
    ],
    answer: 1
  },
  {
    question: "86. What should a pipeline do when Maven tests fail?",
    options: [
      "Always mark the build successful",
      "Delete the test reports",
      "Fail the relevant build stage and publish test reports for diagnosis",
      "Automatically disable all future tests"
    ],
    answer: 2
  },
  {
    question: "87. Which directory commonly contains Maven Surefire test reports?",
    options: [
      "target/surefire-reports",
      "src/main/java/reports",
      ".git/surefire",
      "/etc/maven/reports"
    ],
    answer: 0
  },
  {
    question: "88. How can a Maven artifact be published to a private repository?",
    options: [
      "Use chmod on pom.xml",
      "Copy it into /etc/hosts",
      "Rename it to Dockerfile",
      "Configure distributionManagement and suitable repository credentials, then deploy"
    ],
    answer: 3
  },
  {
    question: "89. What is the difference between install and deploy?",
    options: [
      "Both only compile code",
      "Install puts the artifact in the local repository; deploy publishes it to a configured remote repository",
      "Deploy deletes all dependencies",
      "Install always uploads to production"
    ],
    answer: 1
  },
  {
    question: "90. What is a SNAPSHOT version commonly used for?",
    options: [
      "Permanently frozen release artifacts only",
      "Operating system snapshots",
      "Development versions that may change before a final release",
      "GitHub Actions workflow names"
    ],
    answer: 2
  },
  {
    question: "91. What is a RELEASE version generally intended to represent?",
    options: [
      "A stable, non-SNAPSHOT version of an artifact",
      "A version that changes every minute",
      "A missing dependency",
      "A local environment variable"
    ],
    answer: 0
  },
  {
    question: "92. What is the purpose of a BOM (Bill of Materials) POM?",
    options: [
      "Compile all Java files into one source file",
      "Replace all Maven plugins",
      "Store operating system logs",
      "Centralize dependency version recommendations for related artifacts"
    ],
    answer: 3
  },
  {
    question: "93. How is a BOM commonly imported into dependencyManagement?",
    options: [
      "Use scope=runtime without type",
      "Declare type=pom and scope=import",
      "Declare type=jar and scope=test only",
      "Place it inside build/plugins only"
    ],
    answer: 1
  },
  {
    question: "94. What is the purpose of pluginManagement in a POM?",
    options: [
      "Automatically execute every plugin goal",
      "Declare all application runtime dependencies",
      "Centralize plugin versions and configuration for use by build plugins",
      "Replace dependencyManagement"
    ],
    answer: 2
  },
  {
    question: "95. A Maven build succeeds locally but fails in Jenkins because of a missing plugin. What should you inspect?",
    options: [
      "Plugin coordinates and versions, repository access, and CI JDK/Maven configuration",
      "Only the monitor settings",
      "Only the developer's desktop background",
      "Only the number of Git branches"
    ],
    answer: 0
  },
  {
    question: "96. What is the purpose of the -pl and -am options together?",
    options: [
      "Skip every module's dependencies",
      "Run only the clean lifecycle",
      "Publish all modules to production",
      "Build selected modules along with required reactor dependencies"
    ],
    answer: 3
  },
  {
    question: "97. What is a good way to investigate an unexpectedly slow Maven build?",
    options: [
      "Increase every dependency version blindly",
      "Inspect build logs, slow tests, plugin execution, downloads, and cache behavior",
      "Delete all tests",
      "Disable source compilation"
    ],
    answer: 1
  },
  {
    question: "98. Why should Maven dependency versions be managed consistently?",
    options: [
      "To make every build use random libraries",
      "To avoid using version control",
      "To improve reproducibility and reduce dependency conflicts",
      "To force production deployments on every build"
    ],
    answer: 2
  },
  {
    question: "99. What should you check when a packaged JAR fails with NoClassDefFoundError?",
    options: [
      "Whether required classes or dependencies are available at runtime and packaged correctly",
      "Only the Maven installation directory name",
      "Only the Git branch color",
      "Only the source file indentation"
    ],
    answer: 0
  },
  {
    question: "100. What is a good Maven build practice for a production DevOps pipeline?",
    options: [
      "Ignore failed tests",
      "Use unpinned dependencies and expose credentials",
      "Deploy every unverified artifact directly to production",
      "Use a controlled JDK, reproducible build configuration, tests, artifact versioning, and secure publishing"
    ],
    answer: 3
  }
];
