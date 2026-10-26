const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');

function generateDeepContent(category, fileName) {
  const issueName = fileName.replace('.ts', '').replace('.backup', '');
  const title = issueName.replace(/([A-Z])/g, ' $1').trim();
  
  return `// ============================================================================
// DevMavox Enterprise Troubleshooting Guide & Automation Suite
// Category: ${category.toUpperCase()}
// Target Issue: ${title}
// Architecture: Distributed Production-Grade Infrastructure Diagnostics
// ============================================================================

export interface TroubleshootingGuideItem {
  id: string;
  title: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  symptoms: string[];
  rootCause: string[];
  diagnosticCommands: {
    tool: string;
    command: string;
    expectedOutput: string;
    description: string;
  }[];
  stepByStepResolution: {
    stepNumber: number;
    title: string;
    command?: string;
    explanation: string;
    codeSnippet?: string;
  }[];
  advancedRemediationPlaybook: string;
  preventionTips: string[];
  relatedLogsAndMetrics: string[];
}

export const ${issueName}Guide: TroubleshootingGuideItem = {
  id: "${category}-${issueName.toLowerCase()}",
  title: "${title}",
  category: "${category}",
  severity: "Critical",
  description: "Comprehensive enterprise diagnostic, log inspection, and automated remediation guide for resolving ${title} in production ${category} deployments. This document provides deep structural analysis, failure signatures, and battle-tested recovery scripts.",
  symptoms: [
    "Runtime execution halting unexpectedly with unhandled exception codes in ${category}",
    "Automated monitoring alerts triggering high-priority pages due to ${title}",
    "System and daemon logs exhibiting recurring stack traces, connection resets, or timeout exceptions",
    "Deployment pipelines or configuration synchronization agents failing silently during execution phases"
  ],
  rootCause: [
    "Misconfiguration of underlying environment parameters, permission scopes, or runtime configuration files",
    "Resource exhaustion including CPU throttling, memory leaks, file descriptor saturation, or network port starvation",
    "Version skew or incompatibility between client execution runtimes, daemon versions, and target node libraries",
    "Strict firewall rules, expired security certificates, or incorrect RBAC authorization policies"
  ],
  diagnosticCommands: [
    {
      tool: "System Journal / Daemon Log Inspector",
      command: "journalctl -u ${category} -n 150 --no-pager --timestamps",
      expectedOutput: "Recent operational logs highlighting exact failure signatures and timestamps.",
      description: "Captures the precise sequence of events leading up to the ${title} incident."
    },
    {
      tool: "Network Connectivity & Socket Probe",
      command: "nc -zv localhost 443 || ss -tulpn | grep LISTEN",
      expectedOutput: "Active listening sockets and confirmed TCP handshake success.",
      description: "Validates local binding ports and ensures no port collision or firewall drop is occurring."
    },
    {
      tool: "Resource Utilization Checker",
      command: "top -b -n 1 | head -n 25 && free -h",
      expectedOutput: "Available memory, CPU load averages, and swap usage metrics.",
      description: "Rules out underlying host resource exhaustion or out-of-memory (OOM) kills."
    }
  ],
  stepByStepResolution: [
    {
      stepNumber: 1,
      title: "Isolate and Capture Failure Signatures",
      command: "tail -n 200 /var/log/${category}/error.log | grep -i 'error\\|exception\\|fail'",
      explanation: "Extract precise error strings and stack traces to correlate with infrastructure changes.",
      codeSnippet: "[FATAL] [${category}] 2026-10-26T12:00:00Z - Initialization failure in ${issueName}: Resource temporarily unavailable."
    },
    {
      stepNumber: 2,
      title: "Validate Configuration Syntax and Permissions",
      command: "ansible-playbook site.yml --syntax-check || ${category} --validate-config",
      explanation: "Ensure all configuration parameters conform strictly to schema and file permissions are properly secured.",
      codeSnippet: "PLAY [Troubleshooting ${title}] *************************************************\nTASK [Verify Config Syntax] ****************************************************\nok: [localhost]"
    },
    {
      stepNumber: 3,
      title: "Execute Rolling Service Restart and Cache Purge",
      command: "systemctl restart ${category} && systemctl status ${category}",
      explanation: "Clear stale connection states, restart worker daemons, and re-establish clean communication channels.",
      codeSnippet: "● ${category}.service - Enterprise ${category} Daemon\n     Loaded: loaded (/lib/systemd/system/${category}.service; enabled)\n     Active: active (running) since Mon 2026-10-26 12:05:00 IST"
    },
    {
      stepNumber: 4,
      title: "Perform End-to-End Smoke Testing and Verification",
      command: "curl -X GET https://127.0.0.1/healthz -k -v",
      explanation: "Verify that application health endpoints return HTTP 200 OK status codes consistently.",
      codeSnippet: "< HTTP/1.1 200 OK\n< Content-Type: application/json\n< X-DevMavox-Status: Healthy"
    }
  ],
  advancedRemediationPlaybook: \`
---
- name: Automated Enterprise Remediation Playbook for ${title}
  hosts: all
  become: yes
  vars:
    target_service: "${category}"
    max_retries: 3
  tasks:
    - name: Stop affected service cleanly
      systemd:
        name: "{{ target_service }}"
        state: stopped

    - name: Clean stale lock files and temporary runtime caches
      file:
        path: "/var/run/{{ target_service }}.lock"
        state: absent

    - name: Restart service with fresh configuration
      systemd:
        name: "{{ target_service }}"
        state: restarted
        enabled: yes
\`,
  preventionTips: [
    "Establish automated synthetic health probes and alerting rules for early anomaly detection",
    "Enforce strict continuous integration (CI) linting and policy validation before deploying configurations",
    "Maintain automated backup and rapid recovery runbooks for all core infrastructure components",
    "Schedule regular audit reviews for role-based access controls, TLS certificates, and API tokens"
  ],
  relatedLogsAndMetrics: [
    "/var/log/${category}/error.log",
    "/var/log/${category}/access.log",
    "prometheus_metric_${category}_error_rate_total",
    "system_cpu_utilization_percentage",
    "system_memory_available_bytes"
  ]
};

export default ${issueName}Guide;
`;
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'scripts' && entry.name !== 'components') {
        walkDir(fullPath);
      }
    } else if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.endsWith('.backup') && entry.name !== 'page.tsx' && entry.name !== 'guides.ts') {
      const relPath = path.relative(baseDir, dir);
      const category = relPath.split(path.sep)[1] || 'general';
      const content = generateDeepContent(category, entry.name);
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Populated Deep Content: ${path.relative(baseDir, fullPath)}`);
    }
  }
}

if (fs.existsSync(baseDir)) {
  walkDir(baseDir);
  console.log('All tool guide files successfully populated with rich enterprise code!');
} else {
  console.error('Directory not found!');
}
