// ============================================================================
// DevMavox Enterprise Troubleshooting Guide
// Category: NGINX-TOMCAT
// Issue: Port Already In Use
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

export const PortAlreadyInUseGuide: TroubleshootingGuideItem = {
  id: "nginx-tomcat-portalreadyinuse",
  title: "Port Already In Use",
  category: "nginx-tomcat",
  severity: "Critical",
  description: "Comprehensive production-grade diagnostic and resolution guide for handling Port Already In Use in enterprise nginx-tomcat environments.",
  symptoms: [
    "Critical service degradation or unhandled exception loops in nginx-tomcat",
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
      command: "journalctl -u nginx-tomcat -n 100 --no-pager || kubectl logs -l app=nginx-tomcat --tail=100",
      explanation: "Isolate precise stack traces and error codes correlating with Port Already In Use."
    },
    {
      stepNumber: 2,
      title: "Validate Configuration & Permissions",
      command: "cat /etc/nginx-tomcat/config.yaml || printenv | grep -i nginx-tomcat",
      explanation: "Ensure all parameters conform strictly to enterprise schema and permissions."
    },
    {
      stepNumber: 3,
      title: "Execute Remediation & Restart",
      command: "systemctl restart nginx-tomcat || kubectl rollout restart deployment/nginx-tomcat",
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

export default PortAlreadyInUseGuide;
