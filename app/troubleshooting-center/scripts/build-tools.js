const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const toolCategories = {
  kubernetes: [
    "CrashLoopBackOff", "ImagePullBackOff", "PodOOMKilled", "PodStuckInPending", 
    "NodeNotReady", "ServiceNotReachingPods", "Ingress404-502", "CoreDNSResolutionFailure"
  ],
  docker: [
    "ContainerExitCode137", "DockerBuildFailure", "ContainerRestartLoop", 
    "DockerDaemonNotRunning", "PortMappingFailure", "VolumeDataMissing"
  ],
  "aws-eks": [
    "EC2SSHNotWorking", "IAMAccessDenied", "ALB502-503", "S3AccessDenied", 
    "VPC-RouteTableIssue", "EKSUpgradeFailure", "EBSVolumeIssue"
  ],
  "linux-networking": [
    "DiskSpaceFull", "HighCPUUsage", "HighMemoryUsage", "DNSResolutionFailure", 
    "SSHConnectionFailure", "PortBlocked", "FirewallRuleFailure", "InodeExhaustion"
  ],
  "jenkins-github": [
    "PipelineStageFailure", "RunnerUnavailable", "CredentialsBindingFailure", 
    "BuildFailsInCI", "WebhookNotTriggering", "ArtifactUploadFailure"
  ],
  terraform: [
    "StateLockError", "StateDriftDetected", "ProviderVersionConflict", 
    "RemoteBackendStateFailure", "ResourceDependencyCycle", "ValidateConfigurationError"
  ],
  "argocd-helm": [
    "SyncFailed", "ApplicationOutOfSync", "HelmUpgradeFailure", 
    "ChartInstallationFailure", "ResourceAlreadyExists", "TemplateRenderingError"
  ],
  monitoring: [
    "AlertNotFiring", "PrometheusServiceDown", "GrafanaServiceDown", 
    "TargetsDown", "NoDataInDashboard", "ScrapeFailure", "MetricCollectionFailure"
  ],
  "nginx-tomcat": [
    "HTTP502BadGateway", "HTTP504GatewayTimeout", "PortAlreadyInUse", 
    "SSLCertificateFailure", "UpstreamConnectionRefused", "OutOfMemoryError"
  ],
  "maven-gradle-nexus": [
    "MavenBuildFailure", "GradleBuildFailure", "DependencyResolutionFailure", 
    "NexusServiceUnavailable", "ArtifactDownloadFailure", "JavaVersionMismatch"
  ],
  ansible: [
    "SSHConnectionFailure", "InventoryHostNotFound", "PlaybookTaskHangs", 
    "PrivilegeEscalationFailure", "PythonInterpreterFailure", "UndefinedVariable"
  ],
  databases: [
    "DatabaseConnectionFailure", "QueryTimeout", "TooManyConnections", 
    "DatabaseMigrationFailure", "ReplicationLag", "DiskSpaceFull"
  ],
  security: [
    "SecretExposedInRepository", "DependencyVulnerabilityDetected", 
    "IAMLeastPrivilegeViolation", "TLSMisconfiguration", "TrivyScanFailure"
  ],
  production: [
    "ApplicationDown", "CascadingServiceFailure", "HighCPUAfterDeployment", 
    "HTTP500Spike", "DatabaseOutage", "SecretRotationFailure"
  ]
};

// Create tool folders and .ts files inside app/troubleshooting-center/
for (const [tool, issues] of Object.entries(toolCategories)) {
  const toolDir = path.join(rootDir, tool);
  fs.mkdirSync(toolDir, { recursive: true });

  for (const issue of issues) {
    const filePath = path.join(toolDir, `${issue}.ts`);
    const title = issue.replace(/([A-Z])/g, ' $1').trim();

    const fileContent = `// ============================================================================
// DevMavox Enterprise Troubleshooting Guide
// Tool / Category: ${tool.toUpperCase()}
// Issue: ${title}
// ============================================================================

export interface TroubleshootingGuideItem {
  id: string;
  title: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  symptoms: string[];
  rootCause: string[];
  stepByStepResolution: {
    stepNumber: number;
    title: string;
    command?: string;
    explanation: string;
  }[];
  preventionTips: string[];
}

export const ${issue}Guide: TroubleshootingGuideItem = {
  id: "${tool}-${issue.toLowerCase()}",
  title: "${title}",
  category: "${tool}",
  severity: "Critical",
  description: "Comprehensive production-grade diagnostic and resolution guide for handling ${title} in enterprise ${tool} environments.",
  symptoms: [
    "Critical service degradation or unhandled exception loops in ${tool}",
    "Automated monitoring alerts firing high-priority incidents",
    "System journals and audit logs showing recurring timeout signatures"
  ],
  rootCause: [
    "Runtime misconfiguration, expired credentials, or incorrect environment variables",
    "Infrastructure resource exhaustion (CPU throttling, memory leaks, disk fullness)",
    "Network partitioning, firewall rules, or DNS resolution failures"
  ],
  stepByStepResolution: [
    {
      stepNumber: 1,
      title: "Initial Telemetry & Log Extraction",
      command: "journalctl -u ${tool} -n 100 --no-pager || kubectl logs -l app=${tool} --tail=100",
      explanation: "Isolate precise stack traces and error codes correlating with ${title}."
    },
    {
      stepNumber: 2,
      title: "Validate Configuration & Permissions",
      command: "cat /etc/${tool}/config.yaml || printenv | grep -i ${tool}",
      explanation: "Ensure all parameters conform strictly to enterprise schema and permissions."
    },
    {
      stepNumber: 3,
      title: "Execute Remediation & Restart",
      command: "systemctl restart ${tool} || kubectl rollout restart deployment/${tool}",
      explanation: "Apply corrective configuration and perform a clean service restart."
    },
    {
      stepNumber: 4,
      title: "Verify Post-Fix Health",
      command: "curl -I https://localhost/healthz -k",
      explanation: "Confirm that health probes return HTTP 200 OK and metrics stabilize."
    }
  ],
  preventionTips: [
    "Establish automated synthetic monitoring and alerting thresholds",
    "Enforce rigorous CI linting and policy validation checks before deployment",
    "Maintain automated point-in-time snapshots and rapid recovery runbooks"
  ]
};

export default ${issue}Guide;
`;
    fs.writeFileSync(filePath, fileContent, 'utf8');
  }
}

console.log('All tool folders and .ts files generated successfully inside troubleshooting-center!');
