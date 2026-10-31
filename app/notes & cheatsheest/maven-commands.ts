
import type { DevOpsTool } from "./command-types";

type CommandLevel = DevOpsTool["commands"][number]["level"];

const makeCommands = (
  level: CommandLevel,
  rows: [string, string, string][]
) =>
  rows.map(([command, english, telugu]) => ({
    command,
    level,
    english,
    telugu,
  }));

export const mavenTool: DevOpsTool = {
  name: "Maven",
  category: "Automation & Build",

  commands: [
    // BASIC - 14
    ...makeCommands("Basic", [
      ["mvn -version", "Display Maven and Java versions.", "Maven mariyu Java versions chudataniki."],
      ["mvn -help", "Display Maven command-line help.", "Maven command options mariyu help chudataniki."],
      ["mvn validate", "Validate the Maven project structure and configuration.", "Maven project structure mariyu configuration validate cheyyataniki."],
      ["mvn compile", "Compile main source code.", "Main source code compile cheyyataniki."],
      ["mvn test", "Run project tests.", "Project tests run cheyyataniki."],
      ["mvn package", "Build the distributable project artifact.", "Project package or artifact create cheyyataniki."],
      ["mvn verify", "Run verification checks through the verify lifecycle phase.", "Verify lifecycle phase varaku checks execute cheyyataniki."],
      ["mvn install", "Install the built artifact into the local Maven repository.", "Build artifact ni local Maven repository lo install cheyyataniki."],
      ["mvn clean", "Remove generated build output.", "Generated target build files clean cheyyataniki."],
      ["mvn clean package", "Clean and package the project.", "Fresh build tho package create cheyyataniki."],
      ["mvn dependency:tree", "Display the project's dependency hierarchy.", "Project dependencies hierarchy chudataniki."],
      ["mvn help:effective-pom", "Display the effective POM after inheritance and profiles.", "Parent POM mariyu profiles merge ayina final configuration chudataniki."],
      ["mvn help:active-profiles", "List active Maven profiles.", "Active Maven profiles identify cheyyataniki."],
      ["mvn help:effective-settings", "Display the effective Maven settings.", "Maven final settings configuration chudataniki."],
    ]),

    // INTERMEDIATE - 19
    ...makeCommands("Intermediate", [
      ["mvn -DskipTests package", "Package the project without running tests.", "Tests run cheyyakunda package build cheyyataniki; CI lo tests skip cheyyadam avoid cheyyali."],
      ["mvn -DskipTests=false test", "Explicitly enable test execution.", "Build configuration tests skip chestunte tests enable cheyyataniki."],
      ["mvn -Pproduction package", "Build using the production profile.", "Production profile use chesi package build cheyyataniki; profile POM lo configure ayi undali."],
      ["mvn -Denv=dev verify", "Run verification with a custom environment property.", "Custom dev environment property tho verify cheyyataniki."],
      ["mvn -o verify", "Build in offline mode using cached dependencies.", "Cached dependencies use chesi offline lo verify cheyyataniki."],
      ["mvn -U clean verify", "Check for updated snapshot dependencies before verification.", "Updated SNAPSHOT dependencies check chesi clean verify cheyyataniki."],
      ["mvn -f path/to/pom.xml verify", "Run Maven using a specified POM file.", "Specified POM file tho Maven build run cheyyataniki."],
      ["mvn -s path/to/settings.xml verify", "Run Maven using a custom settings file.", "Custom settings.xml use chesi build run cheyyataniki."],
      ["mvn -pl module-name package", "Build a selected module in a multi-module project.", "Multi-module project lo selected module build cheyyataniki."],
      ["mvn -pl module-name -am package", "Build a selected module and its required upstream modules.", "Selected module tho paatu required dependency modules build cheyyataniki."],
      ["mvn -pl module-name -amd package", "Build a selected module and its dependent modules.", "Selected module meeda depend ayye modules kuda build cheyyataniki."],
      ["mvn -T 4 clean verify", "Run a parallel Maven build using four threads.", "Four threads tho parallel Maven build run cheyyataniki."],
      ["mvn dependency:resolve", "Resolve project dependencies.", "Project dependencies resolve cheyyataniki."],
      ["mvn dependency:go-offline", "Download dependencies and plugins required for offline builds.", "Offline builds kosam required dependencies mariyu plugins download cheyyataniki."],
      ["mvn dependency:analyze", "Analyze declared and used dependencies.", "Unused or missing dependencies identify cheyyataniki."],
      ["mvn help:describe -Dplugin=compiler", "Show information about the Maven Compiler Plugin.", "Compiler plugin details chudataniki."],
      ["mvn help:describe -Dplugin=compiler -Ddetail", "Show detailed Maven Compiler Plugin goals and parameters.", "Compiler plugin detailed goals mariyu parameters chudataniki."],
      ["mvn help:evaluate -Dexpression=project.version -q -DforceStdout", "Print the project version from the effective POM.", "Project version ni effective POM nunchi print cheyyataniki."],
      ["mvn -N validate", "Validate only the current project without building child modules.", "Child modules build cheyyakunda current project matrame validate cheyyataniki."],
    ]),

    // ADVANCED - 21
    ...makeCommands("Advanced", [
      ["mvn clean install", "Clean, build, test, and install the artifact locally.", "Clean chesi build, test complete chesi artifact local repository lo install cheyyataniki."],
      ["mvn clean deploy", "Clean, build, and deploy the artifact to a remote repository.", "Artifact ni remote Maven repository ki deploy cheyyataniki."],
      ["mvn release:prepare", "Prepare a project release and update release versions.", "Project release prepare chesi versions update cheyyataniki; SCM setup avasaram."],
      ["mvn release:perform", "Perform a prepared release.", "Prepared release execute cheyyataniki; release configuration mariyu credentials avasaram."],
      ["mvn versions:display-dependency-updates", "Display available dependency updates.", "Dependencies ki available updates chudataniki."],
      ["mvn versions:display-plugin-updates", "Display available Maven plugin updates.", "Maven plugins ki available updates chudataniki."],
      ["mvn versions:use-latest-versions", "Update dependencies to their latest available versions.", "Dependencies latest versions ki update cheyyataniki; POM changes review cheyyali."],
      ["mvn enforcer:enforce", "Enforce configured Maven project rules.", "Configured Maven rules enforce cheyyataniki."],
      ["mvn checkstyle:check", "Run Checkstyle source-code style checks.", "Java code style checks run cheyyataniki."],
      ["mvn pmd:check", "Run PMD static code analysis.", "PMD static code analysis execute cheyyataniki."],
      ["mvn spotbugs:check", "Run SpotBugs analysis for potential bugs.", "Potential Java bugs identify cheyyataniki."],
      ["mvn jacoco:report", "Generate a JaCoCo code coverage report.", "Code coverage report generate cheyyataniki."],
      ["mvn failsafe:integration-test failsafe:verify", "Run configured Failsafe integration-test goals.", "Configured integration tests run mariyu verify cheyyataniki."],
      ["mvn dependency:copy-dependencies", "Copy project dependencies into the configured output directory.", "Project dependencies ni configured folder loki copy cheyyataniki."],
      ["mvn install:install-file -Dfile=library.jar -DgroupId=com.example -DartifactId=library -Dversion=1.0 -Dpackaging=jar", "Install an external JAR into the local Maven repository.", "External JAR ni local Maven repository lo install cheyyataniki."],
      ["mvn deploy:deploy-file -Dfile=library.jar -DgroupId=com.example -DartifactId=library -Dversion=1.0 -Dpackaging=jar -DrepositoryId=internal -Durl=https://repo.example.com/releases", "Deploy an external artifact to a remote Maven repository.", "External artifact ni remote repository ki deploy cheyyataniki; URL mariyu credentials replace cheyyali."],
      ["mvn archetype:generate", "Generate a new Maven project from an archetype.", "Archetype template use chesi new Maven project create cheyyataniki."],
      ["mvn help:effective-pom -Doutput=effective-pom.xml", "Write the effective POM to a file.", "Effective POM ni XML file lo save cheyyataniki."],
      ["mvn site", "Generate the Maven project documentation site.", "Maven project documentation site generate cheyyataniki."],
      ["mvn site-deploy", "Deploy the generated Maven site to its configured destination.", "Generated Maven site ni configured destination ki deploy cheyyataniki."],
      ["mvn -pl module-name -am test", "Test a selected module and its required upstream modules.", "Selected module mariyu required upstream modules test cheyyataniki."],
    ]),

    // TROUBLESHOOTING - 23
    ...makeCommands("Troubleshooting", [
      ["mvn -e verify", "Display full error stack traces during verification.", "Build errors ki complete stack trace chudataniki."],
      ["mvn -X verify", "Enable Maven debug output during verification.", "Maven debug logs enable chesi issue troubleshoot cheyyataniki."],
      ["mvn -C verify", "Fail the build when dependency checksums do not match.", "Dependency checksum mismatch unte build fail cheyyataniki."],
      ["mvn -o clean verify", "Run a clean verification build in offline mode.", "Offline mode lo clean verify run cheyyataniki."],
      ["mvn -U -X clean verify", "Force snapshot update checks and enable debug logging.", "Snapshot updates check chestu debug logs tho build troubleshoot cheyyataniki."],
      ["mvn -rf :module-artifact-id verify", "Resume a multi-module build from the specified module.", "Failed multi-module build ni specified module nunchi resume cheyyataniki."],
      ["mvn -fae verify", "Continue building other modules after a module failure.", "Oka module fail ayina migatha modules build continue cheyyataniki."],
      ["mvn -Dtest=MyTest test", "Run a specific test class.", "Specific test class matrame run cheyyataniki."],
      ["mvn -Dtest=MyTest#myTestMethod test", "Run a specific test method.", "Specific test method matrame run cheyyataniki."],
      ["mvn -DskipTests=false test", "Re-enable tests when test execution has been skipped by a property.", "Tests skip ayinappudu malli enable cheyyataniki."],
      ["mvn -Dsurefire.failIfNoSpecifiedTests=false test", "Avoid failure when a specified test pattern matches no tests.", "Specified test pattern ki tests match kakapothe failure avoid cheyyataniki."],
      ["mvn -DtrimStackTrace=false test", "Show full test failure stack traces when supported by Surefire.", "Surefire support unte full test failure stack traces chudataniki."],
      ["mvn dependency:tree -Dverbose", "Display dependency-tree details including omitted dependency nodes.", "Omitted dependency details tho dependency tree chudataniki."],
      ["mvn dependency:tree -Dincludes=groupId:artifactId", "Filter the dependency tree to a specified artifact.", "Specified groupId mariyu artifactId dependencies matrame chudataniki."],
      ["mvn help:effective-settings -Doutput=effective-settings.xml", "Save effective Maven settings to a file.", "Effective Maven settings ni XML file lo save cheyyataniki."],
      ["mvn help:describe -Dcmd=compile", "Display information about the Maven compile lifecycle command.", "Maven compile command gurinchi details chudataniki."],
      ["mvn compiler:compile", "Invoke the Maven Compiler Plugin compile goal directly.", "Compiler plugin compile goal direct ga execute cheyyataniki."],
      ["mvn surefire:report", "Generate a report from Surefire test results.", "Surefire test results nunchi report generate cheyyataniki."],
      ["mvn -Dcheckstyle.skip=false checkstyle:check", "Explicitly enable Checkstyle checks when supported by the plugin.", "Plugin support unte Checkstyle checks enable cheyyataniki."],
      ["mvn -Dorg.slf4j.simpleLogger.showDateTime=true verify", "Include timestamps in Maven simple-logger output.", "Maven logs lo timestamps display cheyyataniki."],
      ["mvn -o package", "Build the project offline using locally cached dependencies.", "Local cache lo unna dependencies tho offline package build cheyyataniki."],
      ["mvn -U clean package", "Clean and package while checking for updated snapshot dependencies.", "Updated SNAPSHOT dependencies check chesi clean package build cheyyataniki."],
      ["mvn dependency:purge-local-repository", "Purge project dependencies from the local repository and resolve them again.", "Project cached dependencies clear chesi malli resolve/download cheyyataniki."],
    ]),
  ],
};
