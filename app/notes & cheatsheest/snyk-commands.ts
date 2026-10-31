import type { DevOpsTool } from "./command-types";

export const snykTool: DevOpsTool = {
    name: "Snyk",
    category: "Security",
    commands: [
      { command: "snyk --version", level: "Basic", english: "to display the Snyk CLI version", telugu: "Snyk CLI version చూడటానికి." },
      { command: "snyk test", level: "Intermediate", english: "to scan project dependencies for vulnerabilities", telugu: "Project dependencies లో vulnerabilities scan చేయటానికి." },
      { command: "snyk container test <image-name>", level: "Advanced", english: "to scan a container image for vulnerabilities", telugu: "Container image vulnerabilities తనిఖీ చేయటానికి." },
      { command: "snyk auth", level: "Troubleshooting", english: "to authenticate the Snyk CLI", telugu: "Snyk CLI authentication setup చేయటానికి." },
    ],
  };
