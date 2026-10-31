import type { DevOpsTool } from "./command-types";

export const sonarqubeTool: DevOpsTool = {
    name: "SonarQube",
    category: "Security",
    commands: [
      { command: "curl -I <sonarqube-url>", level: "Basic", english: "to check the SonarQube endpoint response", telugu: "SonarQube URL response ఇస్తుందో చూడటానికి." },
      { command: "sonar-scanner --version", level: "Intermediate", english: "to check the scanner version", telugu: "SonarScanner version చూడటానికి." },
      { command: "sonar-scanner", level: "Advanced", english: "to run analysis using the project configuration", telugu: "Project configuration ఆధారంగా code analysis చేయటానికి." },
      { command: "curl -sS <sonarqube-url>/api/system/status", level: "Troubleshooting", english: "to inspect SonarQube system status", telugu: "SonarQube system status తెలుసుకోవటానికి." },
    ],
  };
