// ============================================================================
// DevMavox Enterprise Troubleshooting Guide
// Tool / Category: AWS-EKS
// Issue: V P C- Route Table Issue
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

export const VPC-RouteTableIssueGuide: TroubleshootingGuideItem = {
  id: "aws-eks-vpc-routetableissue",
  title: "V P C- Route Table Issue",
  category: "aws-eks",
  severity: "Critical",
  description: "Comprehensive production-grade diagnostic and resolution guide for handling V P C- Route Table Issue in enterprise aws-eks environments.",
  symptoms: [
    "Critical service degradation or unhandled exception loops in aws-eks",
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
      command: "journalctl -u aws-eks -n 100 --no-pager || kubectl logs -l app=aws-eks --tail=100",
      explanation: "Isolate precise stack traces and error codes correlating with V P C- Route Table Issue."
    },
    {
      stepNumber: 2,
      title: "Validate Configuration & Permissions",
      command: "cat /etc/aws-eks/config.yaml || printenv | grep -i aws-eks",
      explanation: "Ensure all parameters conform strictly to enterprise schema and permissions."
    },
    {
      stepNumber: 3,
      title: "Execute Remediation & Restart",
      command: "systemctl restart aws-eks || kubectl rollout restart deployment/aws-eks",
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

export default VPC-RouteTableIssueGuide;
