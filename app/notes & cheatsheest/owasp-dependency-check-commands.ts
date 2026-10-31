import type { DevOpsTool } from "./command-types";

export const owaspDependencyCheckTool: DevOpsTool = {
    name: "OWASP Dependency-Check",
    category: "Security",
    commands: [
      { command: "dependency-check.sh --version", level: "Basic", english: "to display the Dependency-Check version", telugu: "Dependency-Check version చూడటానికి." },
      { command: "dependency-check.sh --project my-app --scan .", level: "Intermediate", english: "to scan project dependencies for known vulnerabilities", telugu: "Project dependencies లో తెలిసిన vulnerabilities scan చేయటానికి." },
      { command: "dependency-check.sh --project my-app --scan . --format HTML", level: "Advanced", english: "to generate an HTML vulnerability report", telugu: "Vulnerability report ను HTML format లో తయారు చేయటానికి." },
      { command: "dependency-check.sh --help", level: "Troubleshooting", english: "to inspect supported options and arguments", telugu: "Available options, arguments తెలుసుకోవటానికి." },
    ],
  };
