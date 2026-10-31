import type { DevOpsTool } from "./command-types";

export const trivyTool: DevOpsTool = {
    name: "Trivy",
    category: "Security",
    commands: [
      { command: "trivy --version", level: "Basic", english: "to display the Trivy version", telugu: "Trivy version చూడటానికి." },
      { command: "trivy image <image-name>", level: "Intermediate", english: "to scan an image for vulnerabilities", telugu: "Container image లో vulnerabilities scan చేయటానికి." },
      { command: "trivy fs --scanners vuln,secret,misconfig .", level: "Advanced", english: "to scan a repository for vulnerabilities, secrets and misconfiguration", telugu: "Repository లో vulnerabilities, secrets, misconfiguration తనిఖీ చేయటానికి." },
      { command: "trivy image --severity HIGH,CRITICAL <image-name>", level: "Troubleshooting", english: "to focus an image scan on high-severity findings", telugu: "Image లో High, Critical findings మాత్రమే చూడటానికి." },
    ],
  };
