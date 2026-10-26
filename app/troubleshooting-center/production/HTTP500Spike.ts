// ============================================================================
// DevMavox Enterprise Troubleshooting Guide
// Tool / Category: PRODUCTION
// Issue: H T T P500 Spike
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

export const HTTP500SpikeGuide: TroubleshootingGuideItem = {
  id: "production-http500spike",
  title: "H T T P500 Spike",
  category: "production",
  severity: "Critical",
  description: "Comprehensive production-grade diagnostic and resolution guide for handling H T T P500 Spike in enterprise production environments.",
  symptoms: [
    "Critical service degradation or unhandled exception loops in production",
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
      command: "journalctl -u production -n 100 --no-pager || kubectl logs -l app=production --tail=100",
      explanation: "Isolate precise stack traces and error codes correlating with H T T P500 Spike."
    },
    {
      stepNumber: 2,
      title: "Validate Configuration & Permissions",
      command: "cat /etc/production/config.yaml || printenv | grep -i production",
      explanation: "Ensure all parameters conform strictly to enterprise schema and permissions."
    },
    {
      stepNumber: 3,
      title: "Execute Remediation & Restart",
      command: "systemctl restart production || kubectl rollout restart deployment/production",
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

export default HTTP500SpikeGuide;
