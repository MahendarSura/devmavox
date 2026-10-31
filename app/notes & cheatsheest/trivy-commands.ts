
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

export const trivyTool: DevOpsTool = {
  name: "Trivy",
  category: "DevSecOps & Security Scanning",
  commands: [
    ...makeCommands("Basic", [
      [
        "trivy version",
        "Display the installed Trivy version.",
        "Install aina Trivy version chupisthundi.",
      ],
      [
        "trivy --help",
        "Display Trivy CLI help and available commands.",
        "Trivy CLI help and available commands chupisthundi.",
      ],
      [
        "trivy image nginx:latest",
        "Scan a container image for security vulnerabilities and other findings.",
        "Container image lo security vulnerabilities and other findings scan chesthundi.",
      ],
      [
        "trivy fs .",
        "Scan the current filesystem directory for vulnerabilities and secrets.",
        "Current filesystem directory lo vulnerabilities and secrets scan chesthundi.",
      ],
      [
        "trivy repo .",
        "Scan a local Git repository for vulnerabilities and secrets.",
        "Local Git repository lo vulnerabilities and secrets scan chesthundi.",
      ],
      [
        "trivy config .",
        "Scan configuration files for security misconfigurations.",
        "Configuration files lo security misconfigurations scan chesthundi.",
      ],
      [
        "trivy sbom ./sbom.json",
        "Scan an SBOM file for vulnerabilities and licenses.",
        "SBOM file lo vulnerabilities and licenses scan chesthundi.",
      ],
      [
        "trivy rootfs /",
        "Scan a root filesystem for security issues.",
        "Root filesystem lo security issues scan chesthundi.",
      ],
      [
        "trivy clean --all",
        "Remove all Trivy cached data.",
        "Trivy cached data motham remove chesthundi.",
      ],
      [
        "trivy image --severity HIGH,CRITICAL nginx:latest",
        "Display only high and critical findings from an image scan.",
        "Image scan lo HIGH and CRITICAL findings matrame chupisthundi.",
      ],
      [
        "trivy image --ignore-unfixed nginx:latest",
        "Show only vulnerabilities with available fixes.",
        "Fix available unna vulnerabilities matrame chupisthundi.",
      ],
      [
        "trivy fs --scanners vuln,secret .",
        "Scan a filesystem for vulnerabilities and exposed secrets.",
        "Filesystem lo vulnerabilities and exposed secrets scan chesthundi.",
      ],
    ]),

    ...makeCommands("Intermediate", [
      [
        "trivy image --format json nginx:latest",
        "Display container image scan results in JSON format.",
        "Container image scan results JSON format lo chupisthundi.",
      ],
      [
        "trivy image --format json --output report.json nginx:latest",
        "Save image scan results to a JSON report file.",
        "Image scan results JSON report file lo save chesthundi.",
      ],
      [
        "trivy fs --format json --output fs-report.json .",
        "Generate a JSON report for filesystem scanning.",
        "Filesystem scanning kosam JSON report generate chesthundi.",
      ],
      [
        "trivy config --format json --output config-report.json .",
        "Save configuration misconfiguration findings as JSON.",
        "Configuration misconfiguration findings JSON lo save chesthundi.",
      ],
      [
        "trivy fs --severity MEDIUM,HIGH,CRITICAL .",
        "Filter filesystem scan results by selected severity levels.",
        "Selected severity levels prakaram filesystem scan results filter chesthundi.",
      ],
      [
        "trivy fs --scanners vuln,misconfig,secret .",
        "Scan files for vulnerabilities, misconfigurations, and secrets.",
        "Files lo vulnerabilities, misconfigurations and secrets scan chesthundi.",
      ],
      [
        "trivy repo https://github.com/aquasecurity/trivy-ci-test",
        "Scan a remote Git repository.",
        "Remote Git repository scan chesthundi.",
      ],
      [
        "trivy image --input image.tar",
        "Scan a container image from a local archive.",
        "Local archive nunchi container image scan chesthundi.",
      ],
      [
        "trivy clean --scan-cache",
        "Remove cached container and VM image scan results.",
        "Cached container and VM image scan results remove chesthundi.",
      ],
      [
        "trivy clean --vuln-db",
        "Remove the cached vulnerability database.",
        "Cached vulnerability database remove chesthundi.",
      ],
      [
        "trivy server --listen localhost:8080",
        "Start Trivy in server mode on the specified address.",
        "Specified address lo Trivy server mode start chesthundi.",
      ],
      [
        "trivy image --server http://127.0.0.1:8080 nginx:latest",
        "Scan an image using a Trivy server in client mode.",
        "Client mode lo Trivy server use chesi image scan chesthundi.",
      ],
      [
        "trivy convert --format cyclonedx --output report.cdx report.json",
        "Convert a Trivy JSON report into CycloneDX format.",
        "Trivy JSON report ni CycloneDX format loki convert chesthundi.",
      ],
      [
        "trivy image --download-db-only",
        "Download or update the vulnerability database without scanning an image.",
        "Image scan cheyakunda vulnerability database download or update chesthundi.",
      ],
    ]),

    ...makeCommands("Advanced", [
      [
        "trivy image --format cyclonedx --output sbom.cdx nginx:latest",
        "Generate a CycloneDX SBOM for a container image.",
        "Container image kosam CycloneDX SBOM generate chesthundi.",
      ],
      [
        "trivy fs --format spdx-json --output sbom.spdx.json .",
        "Generate an SPDX JSON software bill of materials for a filesystem.",
        "Filesystem kosam SPDX JSON SBOM generate chesthundi.",
      ],
      [
        "trivy image --exit-code 1 --severity HIGH,CRITICAL nginx:latest",
        "Return a non-zero exit code when high or critical findings are detected.",
        "HIGH or CRITICAL findings unte non-zero exit code return chesthundi.",
      ],
      [
        "trivy config --tf-vars terraform.tfvars .",
        "Use Terraform variable values while scanning configuration files.",
        "Configuration scan chesthunnappudu Terraform variable values use chesthundi.",
      ],
      [
        "trivy config --helm-values values.yaml ./charts",
        "Scan Helm configurations using the specified values file.",
        "Specified values file use chesi Helm configurations scan chesthundi.",
      ],
      [
        "trivy fs --skip-dirs node_modules,dist .",
        "Skip specified directories during filesystem scanning.",
        "Filesystem scanning time lo specified directories skip chesthundi.",
      ],
      [
        "trivy fs --skip-files '*.log' .",
        "Skip files matching the specified patterns.",
        "Specified patterns match aina files skip chesthundi.",
      ],
      [
        "trivy image --ignorefile .trivyignore nginx:latest",
        "Use a custom ignore file for vulnerability findings.",
        "Vulnerability findings kosam custom ignore file use chesthundi.",
      ],
      [
        "trivy --cache-dir /tmp/trivy-cache image nginx:latest",
        "Use a custom cache directory for image scanning.",
        "Image scanning kosam custom cache directory use chesthundi.",
      ],
      [
        "trivy image --timeout 10m nginx:latest",
        "Set the maximum duration for an image scan operation.",
        "Image scan operation ki maximum duration set chesthundi.",
      ],
      [
        "trivy image --scanners vuln,misconfig,secret,license nginx:latest",
        "Scan an image for vulnerabilities, misconfigurations, secrets, and licenses.",
        "Image lo vulnerabilities, misconfigurations, secrets and licenses scan chesthundi.",
      ],
      [
        "trivy repo --scanners license .",
        "Enable license scanning for a local repository.",
        "Local repository kosam license scanning enable chesthundi.",
      ],
    ]),

    ...makeCommands("Troubleshooting", [
      [
        "trivy --debug image nginx:latest",
        "Enable debug logging to investigate image scanning failures.",
        "Image scanning failures investigate cheyadaniki debug logging enable chesthundi.",
      ],
      [
        "trivy --quiet image nginx:latest",
        "Suppress progress and informational output during image scanning.",
        "Image scanning time lo progress and informational output suppress chesthundi.",
      ],
      [
        "trivy image --skip-db-update nginx:latest",
        "Skip vulnerability database updates when a suitable local database is already available.",
        "Suitable local database available unte vulnerability database updates skip chesthundi.",
      ],
      [
        "trivy image --skip-java-db-update nginx:latest",
        "Skip Java index database updates during image scanning.",
        "Image scanning time lo Java index database updates skip chesthundi.",
      ],
      [
        "trivy image --cache-backend memory nginx:latest",
        "Use an in-memory cache backend to avoid filesystem cache locking.",
        "Filesystem cache locking avoid cheyadaniki in-memory cache backend use chesthundi.",
      ],
      [
        "trivy clean --scan-cache",
        "Clear scan cache when cached scan data causes problems.",
        "Cached scan data valla problems vaste scan cache clear chesthundi.",
      ],
      [
        "ps aux | grep trivy",
        "Find running Trivy processes that may be holding the cache lock.",
        "Cache lock hold chesthunna Trivy processes identify chesthundi.",
      ],
      [
        "trivy --cache-dir /tmp/trivy-cache image nginx:latest",
        "Use a separate cache directory to avoid conflicts with other Trivy processes.",
        "Other Trivy processes tho cache conflicts avoid cheyadaniki separate cache directory use chesthundi.",
      ],
      [
        "trivy --timeout 15m image nginx:latest",
        "Increase the scan timeout when image analysis takes longer than expected.",
        "Image analysis expected time kanna ekkuva padithe scan timeout increase chesthundi.",
      ],
      [
        "trivy clean --all",
        "Clear all cached data when troubleshooting persistent cache problems.",
        "Persistent cache problems troubleshoot cheyadaniki cached data motham clear chesthundi.",
      ],
    ]),
  ],
};
