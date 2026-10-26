// ============================================================================
// DevMavox Enterprise Troubleshooting Guide: Kubernetes - PersistentStorage
// ============================================================================

export interface KubernetesGuideItem {
  id: string;
  title: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium';
  description: string;
  symptoms: string[];
  diagnosticCommands: string[];
  remediationSteps: string[];
}

export const PersistentStorageGuide: KubernetesGuideItem = {
  id: "k8s-PersistentStorage.toLowerCase()",
  title: "PersistentStorage Troubleshooting",
  category: "kubernetes",
  severity: "Critical",
  description: "Production-grade diagnostic and resolution guide for PersistentStorage in Kubernetes clusters.",
  symptoms: [
    "Pods entering CrashLoopBackOff or Pending state due to PersistentStorage issues",
    "Service endpoint routing failures and intermittent timeouts",
    "Storage volume mount timeouts or DNS lookup failures"
  ],
  diagnosticCommands: [
    "kubectl get pods -A -o wide",
    "kubectl describe pod <pod-name> -n <namespace>",
    "kubectl logs <pod-name> --tail=100 --previous"
  ],
  remediationSteps: [
    "Identify exact error signatures using kubectl describe and system logs",
    "Validate resource quotas, node selectors, and persistent volume claims",
    "Apply corrected manifests and verify cluster reconciliation state"
  ]
};

export default PersistentStorageGuide;
