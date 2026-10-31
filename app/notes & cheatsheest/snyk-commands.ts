
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

export const snykTool: DevOpsTool = {
  name: "Snyk",
  category: "DevSecOps & Application Security",
  commands: [
    ...makeCommands("Basic", [
      [
        "snyk --version",
        "Display the installed Snyk CLI version.",
        "Install aina Snyk CLI version chupisthundi.",
      ],
      [
        "snyk --help",
        "Display Snyk CLI help and available commands.",
        "Snyk CLI help and available commands chupisthundi.",
      ],
      [
        "snyk auth",
        "Authenticate the Snyk CLI with your Snyk account.",
        "Snyk account tho CLI authenticate chesthundi.",
      ],
      [
        "snyk test",
        "Scan the current project for open-source vulnerabilities and license issues.",
        "Current project lo open-source vulnerabilities and license issues scan chesthundi.",
      ],
      [
        "snyk monitor",
        "Take a project snapshot and continuously monitor for new vulnerabilities.",
        "Project snapshot create chesi new vulnerabilities kosam monitor chesthundi.",
      ],
      [
        "snyk code test",
        "Scan source code for security issues using static application security testing.",
        "Static application security testing dwara source code security issues scan chesthundi.",
      ],
      [
        "snyk secrets test",
        "Scan source files for hardcoded secrets such as passwords and API keys.",
        "Source files lo hardcoded passwords and API keys scan chesthundi.",
      ],
      [
        "snyk container test nginx:latest",
        "Scan a container image for known vulnerabilities.",
        "Container image lo known vulnerabilities scan chesthundi.",
      ],
      [
        "snyk container monitor nginx:latest",
        "Monitor a container image and its dependencies for vulnerabilities.",
        "Container image and dependencies vulnerabilities kosam monitor chesthundi.",
      ],
      [
        "snyk iac test .",
        "Scan Infrastructure as Code files for security misconfigurations.",
        "Infrastructure as Code files lo security misconfigurations scan chesthundi.",
      ],
      [
        "snyk sbom --format=cyclonedx1.6+json",
        "Generate a CycloneDX JSON software bill of materials.",
        "CycloneDX JSON format lo software bill of materials generate chesthundi.",
      ],
      [
        "snyk config --help",
        "Display help for Snyk CLI configuration commands.",
        "Snyk CLI configuration commands help chupisthundi.",
      ],
    ]),

    ...makeCommands("Intermediate", [
      [
        "snyk test --all-projects",
        "Detect and scan all supported projects in the current directory.",
        "Current directory lo supported projects anni detect chesi scan chesthundi.",
      ],
      [
        "snyk test --dev",
        "Include development dependencies in the vulnerability scan.",
        "Vulnerability scan lo development dependencies kuda include chesthundi.",
      ],
      [
        "snyk test --severity-threshold=high",
        "Report vulnerabilities with high severity or above.",
        "High severity or above vulnerabilities matrame report chesthundi.",
      ],
      [
        "snyk test --json",
        "Display open-source vulnerability results in JSON format.",
        "Open-source vulnerability results JSON format lo chupisthundi.",
      ],
      [
        "snyk test --json-file-output=snyk-report.json",
        "Save open-source scan results to a JSON report file.",
        "Open-source scan results JSON report file lo save chesthundi.",
      ],
      [
        "snyk code test --sarif-file-output=snyk-code.sarif",
        "Export Snyk Code findings in SARIF format.",
        "Snyk Code findings SARIF format lo export chesthundi.",
      ],
      [
        "snyk secrets test --json-file-output=secrets-report.json",
        "Save hardcoded-secret scan results in JSON format.",
        "Hardcoded-secret scan results JSON format lo save chesthundi.",
      ],
      [
        "snyk container test --platform=linux/amd64 nginx:latest",
        "Scan a container image for a specified platform.",
        "Specified platform kosam container image scan chesthundi.",
      ],
      [
        "snyk container sbom --format=cyclonedx1.6+json nginx:latest",
        "Generate a CycloneDX JSON SBOM for a container image.",
        "Container image kosam CycloneDX JSON SBOM generate chesthundi.",
      ],
      [
        "snyk iac test --json-file-output=iac-report.json .",
        "Save Infrastructure as Code scan results to a JSON file.",
        "Infrastructure as Code scan results JSON file lo save chesthundi.",
      ],
      [
        "snyk sbom --file=pom.xml --format=cyclonedx1.6+json",
        "Generate a CycloneDX SBOM for a Maven project.",
        "Maven project kosam CycloneDX SBOM generate chesthundi.",
      ],
      [
        "snyk sbom test --file=bom.cdx.json",
        "Check an SBOM file for open-source package vulnerabilities.",
        "SBOM file lo open-source package vulnerabilities check chesthundi.",
      ],
    ]),

    ...makeCommands("Advanced", [
      [
        "snyk monitor --all-projects",
        "Monitor all supported projects in the current directory.",
        "Current directory lo supported projects anni monitor chesthundi.",
      ],
      [
        "snyk monitor --project-name=production-api",
        "Set a custom project name when creating a monitored project snapshot.",
        "Monitored project snapshot create chesthunnappudu custom project name set chesthundi.",
      ],
      [
        "snyk monitor --project-environment=production",
        "Assign an environment classification to a monitored project.",
        "Monitored project ki environment classification assign chesthundi.",
      ],
      [
        "snyk container monitor --app-vulns nginx:latest",
        "Include application dependencies when monitoring a container image.",
        "Container image monitor chesthunnappudu application dependencies include chesthundi.",
      ],
      [
        "snyk iac describe",
        "Detect and report unmanaged cloud resources.",
        "Unmanaged cloud resources detect chesi report chesthundi.",
      ],
      [
        "snyk iac update-exclude-policy",
        "Generate exclusion rules for unmanaged cloud resources.",
        "Unmanaged cloud resources kosam exclusion rules generate chesthundi.",
      ],
      [
        "snyk aibom",
        "Generate an AI Bill of Materials for a supported local project.",
        "Supported local project kosam AI Bill of Materials generate chesthundi.",
      ],
      [
        "snyk aibom test",
        "Generate an AI Bill of Materials and test it against configured policies.",
        "AI Bill of Materials generate chesi configured policies tho test chesthundi.",
      ],
      [
        "snyk log4shell",
        "Check for Log4Shell vulnerability exposure.",
        "Log4Shell vulnerability exposure check chesthundi.",
      ],
      [
        "snyk ignore --id=<ISSUE_ID> --reason=<REASON> --expiry=30d",
        "Create an issue ignore policy with a reason and expiry.",
        "Reason and expiry tho issue ignore policy create chesthundi.",
      ],
      [
        "snyk policy",
        "Display the Snyk policy associated with the project.",
        "Project ki sambandhinchina Snyk policy display chesthundi.",
      ],
      [
        "snyk config environment SNYK-EU-01",
        "Configure the Snyk API environment for the European region.",
        "European region kosam Snyk API environment configure chesthundi.",
      ],
    ]),

    ...makeCommands("Troubleshooting", [
      [
        "snyk -d test",
        "Enable debug logging to investigate open-source scan failures.",
        "Open-source scan failures investigate cheyadaniki debug logging enable chesthundi.",
      ],
      [
        "snyk test --fail-fast",
        "Stop scanning further projects after the first failure.",
        "First failure vachaka remaining projects scanning stop chesthundi.",
      ],
      [
        "snyk test --print-deps",
        "Display the dependency tree used during vulnerability analysis.",
        "Vulnerability analysis lo use aina dependency tree chupisthundi.",
      ],
      [
        "snyk test --show-vulnerable-paths=all",
        "Display all dependency paths leading to vulnerable packages.",
        "Vulnerable packages ki lead ayye dependency paths anni chupisthundi.",
      ],
      [
        "snyk test --ignore-policy",
        "Run a scan without applying the project's ignore policy.",
        "Project ignore policy apply cheyakunda scan run chesthundi.",
      ],
      [
        "snyk test --policy-path=.snyk",
        "Specify the policy file used during vulnerability scanning.",
        "Vulnerability scanning time lo use cheyalsina policy file specify chesthundi.",
      ],
      [
        "snyk test --exclude=node_modules,dist",
        "Exclude specified directories or projects from dependency scanning.",
        "Dependency scanning nunchi specified directories or projects exclude chesthundi.",
      ],
      [
        "snyk test --detection-depth=4",
        "Limit dependency project detection to a specified directory depth.",
        "Dependency project detection ni specified directory depth varaku limit chesthundi.",
      ],
      [
        "snyk config get endpoint",
        "Display the configured Snyk API endpoint.",
        "Configured Snyk API endpoint chupisthundi.",
      ],
      [
        "snyk config unset org",
        "Remove the configured default organization from local CLI settings.",
        "Local CLI settings nunchi default organization configuration remove chesthundi.",
      ],
      [
        "snyk config clear",
        "Remove all locally stored Snyk CLI configuration values.",
        "Local ga store aina Snyk CLI configuration values anni remove chesthundi.",
      ],
      [
        "snyk test --file=package-lock.json",
        "Scan dependencies using a specified package manifest or lockfile.",
        "Specified package manifest or lockfile use chesi dependencies scan chesthundi.",
      ],
    ]),
  ],
};
