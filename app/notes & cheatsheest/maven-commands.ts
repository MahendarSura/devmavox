import type { DevOpsTool } from "./command-types";

export const mavenTool: DevOpsTool = {
    name: "Maven",
    category: "Automation & Build",
    commands: [
      { command: "mvn -version", level: "Basic", english: "to display Maven and Java versions", telugu: "Maven, Java versions చూడటానికి." },
      { command: "mvn test", level: "Intermediate", english: "to run project tests", telugu: "Project tests run చేయటానికి." },
      { command: "mvn package", level: "Advanced", english: "to build the distributable project artifact", telugu: "Project package లేదా artifact తయారు చేయటానికి." },
      { command: "mvn dependency:tree", level: "Troubleshooting", english: "to inspect the dependency tree", telugu: "Project dependencies hierarchy చూడటానికి." },
      {
        command: "mvn validate",
        level: "Basic",
        english: "Validate the Maven project structure and configuration.",
        telugu: "Maven project configuration validate cheyyataniki.",
      },
      {
        command: "mvn compile",
        level: "Basic",
        english: "Compile main source code.",
        telugu: "Main source code compile cheyyataniki.",
      },
      {
        command: "mvn verify",
        level: "Intermediate",
        english: "Run verification checks through the verify lifecycle phase.",
        telugu: "Integration/verification checks execute cheyyataniki.",
      },
      {
        command: "mvn clean",
        level: "Basic",
        english: "Remove generated build output.",
        telugu: "Generated target build files clean cheyyataniki.",
      },
      {
        command: "mvn clean package",
        level: "Basic",
        english: "Clean and package the project.",
        telugu: "Fresh build tho package create cheyyataniki.",
      },
      {
        command: "mvn dependency:analyze",
        level: "Advanced",
        english: "Analyze declared and used dependencies.",
        telugu: "Unused/missing dependencies identify cheyyataniki.",
      },
      {
        command: "mvn help:effective-pom",
        level: "Intermediate",
        english: "Display the effective POM after inheritance and profiles.",
        telugu: "Parent POM/profile merge ayina final configuration chudataniki.",
      },
      {
        command: "mvn help:active-profiles",
        level: "Basic",
        english: "List active Maven profiles.",
        telugu: "Active Maven profiles identify cheyyataniki.",
      },
      {
        command: "mvn -DskipTests package",
        level: "Intermediate",
        english: "Package the project without running tests.",
        telugu: "Tests run cheyyakunda package build cheyyataniki; CI lo tests skip cheyyadam avoid cheyyali.",
      },
      {
        command: "mvn -Dmaven.test.skip=true package",
        level: "Advanced",
        english: "Skip test compilation and execution for the package build.",
        telugu: "Test compile/execution skip chestundi; only intentional scenarios lo use cheyyali.",
      },
      {
        command: "mvn -o package",
        level: "Troubleshooting",
        english: "Build in offline mode using cached dependencies.",
        telugu: "Network unavailable appudu cached dependencies tho build try cheyyataniki.",
      },
      {
        command: "mvn -U clean package",
        level: "Troubleshooting",
        english: "Force checks for updated snapshot dependencies.",
        telugu: "Stale SNAPSHOT dependency issue troubleshoot cheyyataniki.",
      },
      {
        command: "mvn -pl module-name -am test",
        level: "Advanced",
        english: "Test a selected module and required upstream modules.",
        telugu: "Selected Maven module mariyu required upstream modules test cheyyataniki.",
      },
      {
        command: "mvn -DskipTests=false test",
        level: "Intermediate",
        english: "Explicitly enable test execution.",
        telugu: "Build configuration tests skip chestunte tests enable cheyyataniki.",
      },
      {
        command: "mvn dependency:purge-local-repository",
        level: "Advanced",
        english: "Purge selected project dependencies from the local repository and resolve again.",
        telugu: "Corrupted cached dependencies troubleshoot cheyyataniki; dependencies malli download avuthayi.",
      },
      {
        command: "mvn help:describe -Dplugin=compiler -Ddetail",
        level: "Intermediate",
        english: "Show detailed Maven compiler plugin information.",
        telugu: "Compiler plugin goals/options inspect cheyyataniki.",
      },
    ],
  };
