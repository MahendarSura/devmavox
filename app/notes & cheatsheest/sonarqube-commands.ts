
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

export const sonarqubeTool: DevOpsTool = {
  name: "SonarQube",
  category: "Code Quality & Security",
  commands: [
    ...makeCommands("Basic", [
      [
        "sonar-scanner --version",
        "Display the installed SonarScanner CLI version.",
        "Install aina SonarScanner version chupisthundi.",
      ],
      [
        "sonar-scanner --help",
        "Display SonarScanner command-line help.",
        "SonarScanner commands and options help chupisthundi.",
      ],
      [
        "sonar-scanner",
        "Run code analysis using the project configuration.",
        "Project configuration use chesi code analysis run chesthundi.",
      ],
      [
        "sonar-scanner -X",
        "Run analysis with detailed debug logging.",
        "Detailed debug logs tho analysis run chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.projectKey=my-project",
        "Set the project key directly from the command line.",
        "Command line nunchi project key set chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.projectName=MyProject",
        "Set the project display name for analysis.",
        "Analysis kosam project display name set chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.sources=src",
        "Specify the source-code directory to analyze.",
        "Analyze cheyalsina source code directory specify chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.tests=tests",
        "Specify the test-source directory.",
        "Test source files unna directory specify chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.sourceEncoding=UTF-8",
        "Set the source-file encoding to UTF-8.",
        "Source files encoding UTF-8 ga set chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.projectVersion=1.0",
        "Set the project version for the analysis.",
        "Analysis kosam project version set chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.host.url=http://localhost:9000",
        "Set the SonarQube server URL.",
        "SonarQube server URL set chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.token=<TOKEN>",
        "Provide an authentication token for analysis.",
        "Analysis authentication kosam token provide chesthundi.",
      ],
      [
        "export SONAR_HOST_URL=http://localhost:9000",
        "Set the SonarQube server URL as an environment variable.",
        "Environment variable lo SonarQube server URL set chesthundi.",
      ],
      [
        "export SONAR_TOKEN=<TOKEN>",
        "Set the SonarQube authentication token as an environment variable.",
        "Environment variable lo authentication token set chesthundi.",
      ],
      [
        "cat sonar-project.properties",
        "Display the SonarQube project configuration file.",
        "SonarQube project configuration file content chupisthundi.",
      ],
      [
        "sonar-scanner -Dsonar.verbose=true",
        "Enable verbose scanner logging.",
        "Scanner lo detailed verbose logging enable chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.projectBaseDir=.",
        "Set the current directory as the project base directory.",
        "Current directory ni project base directory ga set chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.exclusions=**/node_modules/**",
        "Exclude matching files and directories from analysis.",
        "Matching files and directories ni analysis nunchi exclude chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.tests=src/test",
        "Configure the test directory for analysis.",
        "Analysis kosam test directory configure chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/system/status\"",
        "Check the current SonarQube server status through its Web API.",
        "Web API dwara SonarQube server status check chesthundi.",
      ],
    ]),

    ...makeCommands("Intermediate", [
      [
        "sonar-scanner -Dsonar.sources=src -Dsonar.tests=test",
        "Analyze source code and test directories together.",
        "Source code and test directories rendu analyze chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.coverage.exclusions=**/*Test*",
        "Exclude matching files from code-coverage calculations.",
        "Code coverage calculations nunchi matching files exclude chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.cpd.exclusions=**/generated/**",
        "Exclude generated files from duplication detection.",
        "Duplication detection nunchi generated files exclude chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.inclusions=src/**/*.java",
        "Restrict analysis to matching source files.",
        "Matching source files matrame analysis ki select chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.exclusions=**/*.min.js,**/vendor/**",
        "Exclude minified JavaScript and vendor directories.",
        "Minified JavaScript and vendor directories exclude chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.scm.disabled=true",
        "Disable SCM integration for the analysis.",
        "Analysis kosam SCM integration disable chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.qualitygate.wait=true",
        "Wait for the Quality Gate result after analysis submission.",
        "Analysis submit ayyaka Quality Gate result kosam wait chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.qualitygate.timeout=300",
        "Set the maximum wait time for the Quality Gate result.",
        "Quality Gate result kosam maximum wait time set chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.log.level=DEBUG",
        "Set the scanner log level to DEBUG.",
        "Scanner log level ni DEBUG ga set chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.projectKey=my-project -Dsonar.sources=src",
        "Run analysis with an explicit project key and source directory.",
        "Project key and source directory specify chesi analysis run chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/server/version\"",
        "Retrieve the SonarQube server version.",
        "SonarQube server version retrieve chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/authentication/validate\"",
        "Validate the current authentication credentials.",
        "Current authentication credentials valid ga unnayo check chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/projects/search\"",
        "Search for projects available to the authenticated user.",
        "Authenticated user ki available projects search chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/qualitygates/list\"",
        "List the Quality Gates configured on the server.",
        "Server lo configure chesina Quality Gates list chupisthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/qualitygates/project_status?projectKey=my-project\"",
        "Retrieve the Quality Gate status for a project.",
        "Project yokka Quality Gate status retrieve chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/measures/component?component=my-project&metricKeys=bugs,vulnerabilities,code_smells\"",
        "Retrieve selected project metrics.",
        "Selected project metrics retrieve chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/issues/search?componentKeys=my-project\"",
        "Search issues associated with a project.",
        "Project ki sambandhinchina issues search chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/rules/search?languages=java\"",
        "Search coding rules for a specified language.",
        "Specified language ki coding rules search chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/components/show?component=my-project\"",
        "Retrieve details about a project or component.",
        "Project or component details retrieve chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/system/health\"",
        "Check the health status of the SonarQube instance.",
        "SonarQube instance health status check chesthundi.",
      ],
    ]),

    ...makeCommands("Advanced", [
      [
        "sonar-scanner -Dsonar.projectKey=my-project -Dsonar.sources=src -Dsonar.tests=test -Dsonar.qualitygate.wait=true",
        "Run analysis and wait for the Quality Gate result.",
        "Analysis run chesi Quality Gate result kosam wait chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.branch.name=feature/login",
        "Analyze a specific branch when branch analysis is supported by the edition.",
        "Edition support unte specific branch ni analyze chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.pullrequest.key=123 -Dsonar.pullrequest.branch=feature/login -Dsonar.pullrequest.base=main",
        "Configure pull-request analysis parameters.",
        "Pull request analysis parameters configure chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.newCode.referenceBranch=main",
        "Use a reference branch to define new-code comparison.",
        "New code comparison kosam reference branch set chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.project.settings=../sonar-project.properties",
        "Load analysis settings from an alternate properties file.",
        "Alternate properties file nunchi analysis settings load chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.projectBaseDir=/workspace/project",
        "Run analysis using a specified project base directory.",
        "Specified project base directory use chesi analysis run chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.java.binaries=target/classes",
        "Specify compiled Java bytecode required for Java analysis.",
        "Java analysis ki required compiled bytecode directory specify chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.java.libraries=lib/*.jar",
        "Specify additional libraries for Java analysis.",
        "Java analysis kosam additional libraries specify chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml",
        "Import a JaCoCo XML coverage report.",
        "JaCoCo XML coverage report import chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.junit.reportPaths=target/surefire-reports",
        "Import test execution reports from the configured directory.",
        "Configured directory nunchi test execution reports import chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/ce/task?id=<TASK_ID>\"",
        "Retrieve the status and details of a Compute Engine task.",
        "Compute Engine task status and details retrieve chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/ce/activity?component=my-project\"",
        "Retrieve background analysis activity for a project.",
        "Project background analysis activity retrieve chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/measures/component_tree?component=my-project&metricKeys=bugs,coverage,ncloc\"",
        "Retrieve metrics for a project and its component tree.",
        "Project and component tree metrics retrieve chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/measures/search_history?component=my-project&metrics=bugs,coverage\"",
        "Retrieve historical metric values for a project.",
        "Project historical metric values retrieve chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/qualitygates/get_by_project?project=my-project\"",
        "Retrieve the Quality Gate associated with a project.",
        "Project ki associate aina Quality Gate retrieve chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/qualitygates/show?name=Sonar%20way\"",
        "Display the conditions and details of a Quality Gate.",
        "Quality Gate conditions and details display chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/issues/search?componentKeys=my-project&severities=CRITICAL,BLOCKER\"",
        "Search for critical and blocker issues in a project.",
        "Project lo critical and blocker issues search chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/issues/search?componentKeys=my-project&types=BUG,VULNERABILITY,CODE_SMELL\"",
        "Filter project issues by issue type.",
        "Issue type batti project issues filter chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/rules/search?activation=true&languages=java\"",
        "Search active coding rules for Java.",
        "Java kosam active coding rules search chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/system/info\"",
        "Retrieve detailed SonarQube server information.",
        "SonarQube server detailed information retrieve chesthundi.",
      ],
    ]),

    ...makeCommands("Troubleshooting", [
      [
        "sonar-scanner -X",
        "Enable debug output to investigate scanner execution failures.",
        "Scanner execution failures investigate cheyadaniki debug output enable chesthundi.",
      ],
      [
        "sonar-scanner -Dsonar.verbose=true",
        "Enable verbose logs to identify analysis problems.",
        "Analysis problems identify cheyadaniki verbose logs enable chesthundi.",
      ],
      [
        "java -version",
        "Check the installed Java runtime version.",
        "Installed Java runtime version check chesthundi.",
      ],
      [
        "echo \"$SONAR_HOST_URL\"",
        "Verify that the SonarQube server URL environment variable is set.",
        "SonarQube server URL environment variable set ayindo check chesthundi.",
      ],
      [
        "test -n \"$SONAR_TOKEN\" && echo \"SONAR_TOKEN is set\"",
        "Check whether the authentication token environment variable is present without printing it.",
        "Token value print cheyakunda environment variable set ayindo check chesthundi.",
      ],
      [
        "curl -I \"$SONAR_HOST_URL\"",
        "Check whether the SonarQube server responds to an HTTP request.",
        "SonarQube server HTTP request ki respond chesthundo check chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/system/ping\"",
        "Check basic SonarQube API connectivity.",
        "Basic SonarQube API connectivity check chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/authentication/validate\"",
        "Investigate authentication and token-related failures.",
        "Authentication and token related failures investigate chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/system/status\"",
        "Check whether the server is UP, STARTING, or in another state.",
        "Server UP, STARTING or vere state lo undo check chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/system/health\"",
        "Investigate SonarQube server health problems.",
        "SonarQube server health problems investigate chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/ce/task?id=<TASK_ID>\"",
        "Investigate a failed or stuck background analysis task.",
        "Failed or stuck background analysis task investigate chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/ce/activity?component=my-project&status=FAILED\"",
        "Search for failed Compute Engine activities for a project.",
        "Project lo failed Compute Engine activities search chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/issues/search?componentKeys=my-project&resolved=false\"",
        "Find unresolved issues after an analysis.",
        "Analysis tarvatha unresolved issues find chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/qualitygates/project_status?projectKey=my-project\"",
        "Investigate why a project failed its Quality Gate.",
        "Project Quality Gate fail avvadaniki reason investigate chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/projects/search?projects=my-project\"",
        "Check whether a project exists and is visible to the current user.",
        "Project exist avutundo and current user ki visible ga undo check chesthundi.",
      ],
      [
        "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/measures/component?component=my-project&metricKeys=coverage,bugs,vulnerabilities\"",
        "Inspect project metrics when dashboard values appear unexpected.",
        "Dashboard values unexpected ga unte project metrics inspect chesthundi.",
      ],
      [
        "tail -n 100 .scannerwork/report-task.txt",
        "Inspect the scanner task report for the submitted analysis task details.",
        "Submitted analysis task details kosam scanner task report inspect chesthundi.",
      ],
      [
        "find .scannerwork -maxdepth 2 -type f",
        "List scanner working-directory files for troubleshooting.",
        "Troubleshooting kosam scanner working directory files list chesthundi.",
      ],
      [
        "df -h",
        "Check available disk space when scanner execution fails due to storage limits.",
        "Storage limits valla scanner fail aithe available disk space check chesthundi.",
      ],
      [
        "free -h",
        "Check available memory when analysis encounters memory-related failures.",
        "Analysis memory problems face chesthe available memory check chesthundi.",
      ],
    ]),
  ],
};
