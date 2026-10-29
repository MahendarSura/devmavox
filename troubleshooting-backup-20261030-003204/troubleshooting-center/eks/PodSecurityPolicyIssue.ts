
/**
 * File: app/troubleshooting-center/eks/PodSecurityPolicyIssue.ts
 *
 * Amazon EKS — Pod Security Policy Errors and Admission Failures
 *
 * Production runbook covering:
 * - Removed Kubernetes PodSecurityPolicy (PSP) API
 * - Pod Security Admission (PSA)
 * - Baseline and Restricted enforcement
 * - Namespace security labels
 * - SecurityContext and Linux capabilities
 * - runAsNonRoot, seccomp, read-only root filesystem
 * - Host namespaces, hostPath, privileged containers
 * - Kyverno, Gatekeeper, and custom admission webhooks
 * - Helm/GitOps migration, rollout recovery, and incident prevention
 *
 * IMPORTANT:
 * - Built-in PodSecurityPolicy was removed in Kubernetes 1.25.
 * - Do not reintroduce privileged settings simply to make a Pod start.
 * - Diagnose the exact admission denial before changing a policy.
 * - Validate all changes in a non-production namespace first.
 */

export const podSecurityPolicyIssueGuide = {
  metadata: {
    id: "eks-pod-security-policy-issue",
    title: "Amazon EKS — PodSecurityPolicy and Admission Policy Troubleshooting",
    file: "PodSecurityPolicyIssue.ts",
    category: "EKS Troubleshooting",
    difficulty: "Advanced",
    audience: [
      "SRE",
      "DevOps Engineer",
      "Platform Engineer",
      "Kubernetes Administrator",
      "Cloud Security Engineer",
    ],
    tags: [
      "EKS",
      "PodSecurityPolicy",
      "PodSecurityAdmission",
      "PSA",
      "PSS",
      "Restricted",
      "Baseline",
      "SecurityContext",
      "Kyverno",
      "Gatekeeper",
      "AdmissionWebhook",
      "Helm",
      "GitOps",
    ],
    estimatedDuration: "45–120 minutes",
    disclaimer:
      "Commands are templates. Replace example names with actual values and follow " +
      "the organization's production change-control process.",
  },

  overview: {
    coreProblem:
      "A Pod or Deployment cannot be created because a security policy rejects its Pod specification, " +
      "a legacy PSP configuration no longer exists, or an admission controller is unavailable or misconfigured.",

    criticalVersionFact:
      "The built-in PodSecurityPolicy API was deprecated in Kubernetes 1.21 and removed in Kubernetes 1.25. " +
      "On current EKS Kubernetes versions, investigate Pod Security Admission (PSA) and any installed " +
      "third-party policy engines rather than expecting the removed built-in PSP API to work.",

    distinguishMechanisms: [
      {
        mechanism: "Legacy PodSecurityPolicy",
        purpose:
          "A removed built-in API that older clusters and manifests may still reference.",
        diagnostic:
          "Look for PSP manifests, old Helm templates, RBAC references, and unsupported API errors.",
      },
      {
        mechanism: "Pod Security Admission",
        purpose:
          "A built-in admission controller enforcing Pod Security Standards at namespace level.",
        diagnostic:
          "Inspect namespace labels for enforce, audit, and warn levels.",
      },
      {
        mechanism: "Kyverno",
        purpose:
          "A policy engine that can validate, mutate, or generate Kubernetes resources.",
        diagnostic:
          "Inspect installed policies, policy reports, webhook status, and controller logs.",
      },
      {
        mechanism: "OPA Gatekeeper",
        purpose:
          "An admission policy engine based on constraints and templates.",
        diagnostic:
          "Inspect constraints, constraint templates, audit results, and webhook logs.",
      },
      {
        mechanism: "Custom admission webhook",
        purpose:
          "A validating or mutating webhook that can accept, reject, or fail requests.",
        diagnostic:
          "Inspect webhook configuration, service endpoints, TLS certificates, and controller health.",
      },
    ],

    commonSymptoms: [
      "Error from server (Forbidden) when creating a Pod.",
      "Deployment replicas remain unavailable because new Pods cannot be admitted.",
      "ReplicaSet events show FailedCreate.",
      "A Helm upgrade fails with a policy validation error.",
      "A previously working workload fails after a Kubernetes upgrade.",
      "A namespace was moved to restricted enforcement.",
      "A webhook timeout prevents resource creation.",
      "Legacy PSP YAML fails with no matches for kind PodSecurityPolicy.",
      "A security policy blocks hostPath, privileged mode, or host namespaces.",
    ],

    importantDistinction:
      "A rejected Pod is different from a Pod that was admitted but cannot start. " +
      "Admission errors occur before normal container startup. Image pulls, scheduling, " +
      "mount failures, and application crashes require separate diagnosis.",
  },

  incidentScenario: {
    title: "Production incident: deployment stalls after a security-policy change",

    timeline: [
      {
        time: "T+00",
        event:
          "A production deployment begins after a namespace policy update.",
      },
      {
        time: "T+03",
        event:
          "The Deployment has fewer available replicas than expected.",
      },
      {
        time: "T+05",
        event:
          "ReplicaSet events report FailedCreate and a security-policy denial.",
      },
      {
        time: "T+10",
        event:
          "The platform team compares the denied Pod specification with the active namespace policy.",
      },
      {
        time: "T+15",
        event:
          "The team identifies a container running as root and requesting an unnecessary capability.",
      },
      {
        time: "T+25",
        event:
          "The application manifest is corrected, tested, and deployed through the approved pipeline.",
      },
    ],

    impactQuestions: [
      "Which cluster, environment, namespace, and application are affected?",
      "Are existing replicas still serving traffic?",
      "Is this a new deployment failure or are running Pods being terminated?",
      "Did a namespace label, policy, Helm chart, or cluster version change recently?",
      "Is the rejection caused by PSA, Kyverno, Gatekeeper, or a custom webhook?",
      "Does the policy reject every workload or only one workload type?",
      "Are DaemonSets, monitoring agents, storage drivers, or network components affected?",
      "Are any resources already changed by the deployment?",
      "Can the application remain available while the rejected rollout is investigated?",
    ],

    severityGuidance: [
      {
        severity: "SEV-1",
        condition:
          "A critical application loses availability and no healthy replicas remain, or a cluster-wide admission failure blocks critical recovery.",
        response:
          "Declare an incident, involve platform and security owners, and preserve available service capacity.",
      },
      {
        severity: "SEV-2",
        condition:
          "A production rollout is blocked or several workloads cannot create replacement Pods.",
        response:
          "Identify the common policy or webhook dependency and apply a targeted, reviewed correction.",
      },
      {
        severity: "SEV-3",
        condition:
          "A non-production workload is rejected, or an obsolete PSP manifest breaks a pipeline.",
        response:
          "Correct the manifest or migration workflow and add a regression check.",
      },
    ],
  },

  firstFiveMinutes: {
    objective:
      "Confirm the environment, establish whether the failure is admission-related, and preserve evidence.",

    commands: [
      {
        purpose: "Confirm the cluster context",
        command: "kubectl config current-context",
        interpretation:
          "Stop if the context does not identify the intended cluster.",
      },
      {
        purpose: "Check cluster version",
        command:
          "kubectl version",
        interpretation:
          "Confirm the Kubernetes version and whether a legacy PSP assumption is valid.",
      },
      {
        purpose: "Check the Deployment",
        command:
          "kubectl get deployment \"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\" -o wide",
        interpretation:
          "Record desired, ready, and available replicas.",
      },
      {
        purpose: "Inspect the ReplicaSet",
        command:
          "kubectl get replicasets -n \"$NAMESPACE\"",
        interpretation:
          "Determine whether the latest ReplicaSet is failing to create Pods.",
      },
      {
        purpose: "Inspect recent namespace events",
        command:
          "kubectl get events -n \"$NAMESPACE\" --sort-by=.metadata.creationTimestamp",
        interpretation:
          "Look for FailedCreate, Forbidden, admission denials, and webhook failures.",
      },
      {
        purpose: "Inspect namespace security labels",
        command:
          "kubectl get namespace \"$NAMESPACE\" --show-labels",
        interpretation:
          "Look for pod-security.kubernetes.io/enforce, audit, and warn labels.",
      },
    ],

    safetyChecks: [
      "Confirm the correct AWS account, cluster, region, and namespace.",
      "Record the deployment revision and last known good state.",
      "Check whether a production rollout is still in progress.",
      "Preserve the exact admission error and timestamps.",
      "Do not disable namespace security enforcement as the first response.",
      "Do not delete healthy replicas while replacement Pods are being rejected.",
      "Do not assume every Forbidden error is a Pod Security Admission denial.",
    ],
  },

  evidenceCollection: {
    kubernetesSnapshot: [
      "kubectl config current-context",
      "kubectl version",
      "kubectl get deployment \"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\" -o yaml",
      "kubectl get replicasets -n \"$NAMESPACE\" -o wide",
      "kubectl get pods -n \"$NAMESPACE\" -o wide",
      "kubectl get events -n \"$NAMESPACE\" --sort-by=.metadata.creationTimestamp",
      "kubectl get namespace \"$NAMESPACE\" --show-labels",
    ],

    policySnapshot: [
      "kubectl get namespace \"$NAMESPACE\" -o yaml",
      "kubectl get validatingwebhookconfigurations",
      "kubectl get mutatingwebhookconfigurations",
      "kubectl api-resources",
      "kubectl get pods -A -o wide",
    ],

    record: [
      "Incident ID and severity",
      "Cluster name and Kubernetes version",
      "Namespace and workload",
      "Deployment and ReplicaSet revisions",
      "Exact admission denial message",
      "Pod Security Admission labels",
      "Relevant securityContext fields",
      "Installed policy engines and policy names",
      "Webhook configuration and health",
      "Recent Helm, GitOps, or infrastructure changes",
      "Number of healthy replicas and available capacity",
      "Approved remediation and validation results",
    ],

    warning:
      "Policy resources may contain internal infrastructure details. Redact secrets and sensitive metadata before sharing logs externally.",
  },

  diagnosticWorkflow: [
    {
      step: 1,
      name: "Confirm the environment and impact",
      commands: [
        "kubectl config current-context",
        "kubectl get nodes -o wide",
        "kubectl get deployment \"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\" -o wide",
        "kubectl get pods -n \"$NAMESPACE\" -o wide",
      ],
      inspect: [
        "Correct cluster and namespace",
        "Desired versus available replicas",
        "Whether old Pods are healthy",
        "Whether the issue affects one Deployment or several workloads",
      ],
      decision:
        "If existing replicas are healthy, preserve them while diagnosing the rejected replacement Pods.",
    },

    {
      step: 2,
      name: "Read the exact rejection message",
      commands: [
        "kubectl get events -n \"$NAMESPACE\" --sort-by=.metadata.creationTimestamp",
        "kubectl describe deployment \"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\"",
        "kubectl get replicasets -n \"$NAMESPACE\"",
      ],
      inspect: [
        "FailedCreate events",
        "Forbidden responses",
        "Policy engine name and policy identifier",
        "Field names mentioned in the denial",
        "Webhook timeout or service-unavailable errors",
      ],
      decision:
        "If the message names a specific policy, inspect that policy first. If it says the API kind is unknown, investigate a removed or unavailable API.",
    },

    {
      step: 3,
      name: "Check for removed PSP resources",
      commands: [
        "kubectl api-resources",
        "kubectl get psp",
      ],
      expectedBehavior:
        "On Kubernetes versions where the built-in PSP API has been removed, the second command fails because the resource type is unavailable.",

      searchRepositoryForLegacyReferences: [
        "PodSecurityPolicy",
        "policy/v1beta1",
        "use of deprecated Kubernetes APIs",
        "psp",
      ],

      decision:
        "If a Helm chart or manifest still creates a PodSecurityPolicy, migrate the chart and its security controls. Do not attempt to enable the removed built-in API.",
    },

    {
      step: 4,
      name: "Inspect Pod Security Admission labels",
      commands: [
        "kubectl get namespace \"$NAMESPACE\" -o yaml",
        "kubectl get namespace \"$NAMESPACE\" --show-labels",
      ],
      inspect: [
        "pod-security.kubernetes.io/enforce",
        "pod-security.kubernetes.io/enforce-version",
        "pod-security.kubernetes.io/audit",
        "pod-security.kubernetes.io/audit-version",
        "pod-security.kubernetes.io/warn",
        "pod-security.kubernetes.io/warn-version",
      ],
      decision:
        "Determine the effective namespace policy and version before changing labels. Do not assume the policy level from a namespace name.",
    },

    {
      step: 5,
      name: "Identify the failing container or Pod field",
      inspect: [
        "securityContext.runAsUser",
        "securityContext.runAsNonRoot",
        "securityContext.allowPrivilegeEscalation",
        "securityContext.privileged",
        "securityContext.capabilities",
        "securityContext.seccompProfile",
        "securityContext.readOnlyRootFilesystem",
        "hostNetwork",
        "hostPID",
        "hostIPC",
        "hostPath volumes",
      ],
      commands: [
        "kubectl get deployment \"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\" -o yaml",
      ],
      decision:
        "Compare the exact denied field against the active security standard or named policy. Avoid applying every possible hardening setting blindly.",
    },

    {
      step: 6,
      name: "Check whether a third-party policy engine is installed",
      commands: [
        "kubectl get pods -A -o wide",
        "kubectl get validatingwebhookconfigurations",
        "kubectl get mutatingwebhookconfigurations",
        "kubectl api-resources",
      ],
      inspect: [
        "Kyverno controller and webhook Pods",
        "Gatekeeper controller and audit Pods",
        "Custom admission webhook Pods",
        "Webhook service endpoints",
        "Policy and constraint resources",
      ],
      decision:
        "If a third-party policy engine is responsible, follow its specific policy and webhook troubleshooting workflow rather than changing PSA labels.",
    },

    {
      step: 7,
      name: "Validate the rendered manifest",
      commands: [
        "helm template \"$RELEASE_NAME\" \"$CHART_PATH\" -n \"$NAMESPACE\" -f \"$VALUES_FILE\"",
        "kubectl apply --dry-run=server -f rendered-manifests.yaml",
      ],
      inspect: [
        "Rendered ServiceAccount and Pod specification",
        "SecurityContext at Pod and container levels",
        "Legacy PSP resources",
        "Unexpected privileged settings",
        "Values that differ from the known-good release",
      ],
      decision:
        "If server-side dry-run is rejected by the same policy, use the response to identify the denied field. Remember that admission webhooks may also run during dry-run and may not support it.",
      caution:
        "The rendered-manifests.yaml file must be generated from the actual rendered output. Do not assume the file already exists.",
    },

    {
      step: 8,
      name: "Separate admission denial from scheduling and runtime failures",
      commands: [
        "kubectl get events -n \"$NAMESPACE\" --sort-by=.metadata.creationTimestamp",
        "kubectl describe pod \"$POD_NAME\" -n \"$NAMESPACE\"",
        "kubectl get pods -n \"$NAMESPACE\" -o wide",
      ],
      decisionTable: [
        {
          symptom: "Forbidden or FailedCreate",
          meaning: "Pod creation was rejected or blocked before normal startup.",
          next: "Inspect admission policies, RBAC, and the exact denial.",
        },
        {
          symptom: "Pending",
          meaning: "The Pod may be admitted but unable to schedule.",
          next: "Inspect node resources, taints, affinity, and scheduling events.",
        },
        {
          symptom: "ImagePullBackOff",
          meaning: "The Pod was admitted but image retrieval failed.",
          next: "Inspect image name, registry authentication, and network access.",
        },
        {
          symptom: "CrashLoopBackOff",
          meaning: "The container starts and repeatedly exits.",
          next: "Inspect container logs, command, configuration, and runtime security behavior.",
        },
      ],
    },

    {
      step: 9,
      name: "Check policy and webhook health",
      commands: [
        "kubectl get pods -A -o wide",
        "kubectl get svc -A",
        "kubectl get endpointslices -A",
        "kubectl get validatingwebhookconfigurations -o yaml",
        "kubectl get mutatingwebhookconfigurations -o yaml",
      ],
      inspect: [
        "Webhook service references",
        "Ready endpoints",
        "Webhook timeoutSeconds",
        "failurePolicy",
        "namespaceSelector",
        "objectSelector",
        "TLS certificate and CA bundle configuration",
      ],
      decision:
        "A timeout or unavailable webhook may block admissions even if the Pod itself satisfies the security policy. Identify the affected webhook before considering any exception.",
    },

    {
      step: 10,
      name: "Inspect policy engine logs and policy reports",
      examples: [
        {
          engine: "Kyverno",
          actions: [
            "Identify the installed Kyverno namespace and controller Pods.",
            "Read the relevant controller logs.",
            "Inspect matching policies and policy reports.",
          ],
          note:
            "Resource kinds and commands depend on the installed Kyverno version.",
        },
        {
          engine: "Gatekeeper",
          actions: [
            "Inspect Gatekeeper controller logs.",
            "List constraint templates and constraints.",
            "Inspect audit results and the constraint responsible for the denial.",
          ],
          note:
            "Do not assume every Gatekeeper installation uses the same constraint naming scheme.",
        },
      ],
      decision:
        "Use the policy name and rejected field from the error to narrow the investigation. Avoid editing unrelated policies.",
    },

    {
      step: 11,
      name: "Compare against the last known-good revision",
      commands: [
        "kubectl rollout history deployment/\"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\"",
        "helm history \"$RELEASE_NAME\" -n \"$NAMESPACE\"",
        "git diff",
      ],
      inspect: [
        "Namespace labels",
        "SecurityContext fields",
        "Helm chart version",
        "Image version",
        "Policy resource changes",
        "GitOps reconciliation changes",
      ],
      decision:
        "If the denial began after a known change, determine whether the change introduced a security-policy mismatch or exposed a pre-existing noncompliant workload.",
    },

    {
      step: 12,
      name: "Apply a least-privilege correction",
      checklist: [
        "Identify the exact rejecting policy.",
        "Confirm the application's actual security requirements.",
        "Prefer changing the workload to comply with the policy.",
        "Use a narrow, reviewed exception only when a legitimate requirement exists.",
        "Validate in staging.",
        "Apply the production change through the approved pipeline.",
      ],
      decision:
        "Do not weaken the namespace policy or remove admission controls merely to make the deployment green.",
    },

    {
      step: 13,
      name: "Verify rollout and production behavior",
      commands: [
        "kubectl rollout status deployment/\"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\"",
        "kubectl get deployment \"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\" -o wide",
        "kubectl get pods -n \"$NAMESPACE\" -o wide",
        "kubectl get events -n \"$NAMESPACE\" --sort-by=.metadata.creationTimestamp",
      ],
      inspect: [
        "Desired and available replicas",
        "New Pod security configuration",
        "Application readiness",
        "Service endpoints",
        "Error rate and latency",
        "Policy violations or audit findings",
      ],
      decision:
        "Close the incident only after both admission recovery and application health are confirmed.",
    },
  ],

  failureSignatureMatrix: [
    {
      symptom: "no matches for kind PodSecurityPolicy",
      likelyCauses: [
        "The chart uses the removed built-in PSP API.",
        "A legacy manifest targets an unsupported API version.",
        "A deployment pipeline assumes PSP is available.",
      ],
      evidence: [
        "Kubernetes version",
        "Rendered Helm manifests",
        "Repository search results",
        "API discovery output",
      ],
      fix:
        "Migrate the workload and security controls to supported Pod Security Admission or an appropriate policy engine.",
    },
    {
      symptom: "violates PodSecurity baseline",
      likelyCauses: [
        "The Pod requests a restricted host or privilege setting.",
        "A container requests disallowed capabilities.",
        "The Pod uses a prohibited security configuration.",
      ],
      evidence: [
        "Exact admission message",
        "Pod and container securityContext",
        "Namespace enforce label",
      ],
      fix:
        "Remove the unnecessary setting or use a narrowly justified, reviewed policy exception.",
    },
    {
      symptom: "violates PodSecurity restricted",
      likelyCauses: [
        "runAsNonRoot requirements are not met.",
        "Seccomp configuration is missing or disallowed.",
        "Privilege escalation is enabled.",
        "Capabilities or volume types violate the standard.",
      ],
      evidence: [
        "Exact policy rejection",
        "Rendered Pod specification",
        "Image user configuration",
      ],
      fix:
        "Correct the rejected security field and verify that the application still functions.",
    },
    {
      symptom: "failed calling webhook",
      likelyCauses: [
        "Webhook Pod is unavailable.",
        "Service has no ready endpoints.",
        "TLS certificate or CA bundle is incorrect.",
        "Network connectivity or timeout issue.",
      ],
      evidence: [
        "Webhook configuration",
        "Service and EndpointSlice state",
        "Controller logs",
        "Certificate expiry and CA configuration",
      ],
      fix:
        "Restore webhook health and validate admission behavior. Avoid disabling the webhook without an approved risk assessment.",
    },
    {
      symptom: "Deployment rollout stalls but old Pods remain healthy",
      likelyCauses: [
        "New Pod template violates admission policy.",
        "A Helm or GitOps change introduced an incompatible field.",
        "A new policy is stricter than the workload configuration.",
      ],
      evidence: [
        "ReplicaSet events",
        "Rendered manifest",
        "Rollout history",
        "Policy change history",
      ],
      fix:
        "Correct the template or restore the known-good release through the approved workflow.",
    },
    {
      symptom: "only one namespace is affected",
      likelyCauses: [
        "Different PSA labels",
        "Namespace-specific policy selection",
        "A namespace-specific webhook selector",
        "Different Helm values or ServiceAccounts",
      ],
      evidence: [
        "Namespace labels",
        "Matching policy selectors",
        "Deployment YAML comparison",
      ],
      fix:
        "Correct the affected namespace or workload configuration without weakening unrelated namespaces.",
    },
    {
      symptom: "all namespaces fail to create Pods",
      likelyCauses: [
        "A cluster-wide admission webhook is unavailable.",
        "A cluster-wide policy changed.",
        "A shared admission dependency is failing.",
      ],
      evidence: [
        "Webhook configuration",
        "Controller health",
        "Admission errors across namespaces",
        "Recent cluster-wide policy changes",
      ],
      fix:
        "Engage the platform and security owners, restore the shared dependency, and use a controlled recovery plan.",
    },
  ],

  podSecurityStandards: {
    levels: [
      {
        level: "Privileged",
        description:
          "Unrestricted policy level intended for workloads that explicitly require broad privileges. Use only where justified.",
      },
      {
        level: "Baseline",
        description:
          "Prevents known privilege escalations while allowing common container workloads.",
      },
      {
        level: "Restricted",
        description:
          "Applies stronger hardening requirements and requires workloads to meet stricter security controls.",
      },
    ],

    modes: [
      {
        mode: "enforce",
        effect:
          "Rejects Pods that violate the selected Pod Security Standard.",
      },
      {
        mode: "audit",
        effect:
          "Records policy violations for audit analysis without rejecting the Pod solely because of that audit mode.",
      },
      {
        mode: "warn",
        effect:
          "Returns warnings to the API client when a Pod violates the selected standard.",
      },
    ],

    labelExample: {
      enforce: "pod-security.kubernetes.io/enforce",
      enforceVersion: "pod-security.kubernetes.io/enforce-version",
      audit: "pod-security.kubernetes.io/audit",
      auditVersion: "pod-security.kubernetes.io/audit-version",
      warn: "pod-security.kubernetes.io/warn",
      warnVersion: "pod-security.kubernetes.io/warn-version",
    },

    versionPinning:
      "A version label can pin enforcement behavior to a particular Kubernetes minor version. " +
      "Review version pinning during cluster upgrades because policy requirements can evolve.",

    safety:
      "Do not copy namespace labels blindly. Choose a level based on workload requirements, " +
      "security review, and staging validation.",
  },

  securityContextTroubleshooting: {
    runAsNonRoot: {
      symptom:
        "Admission rejects a Pod because it does not satisfy a non-root requirement, or the container fails at startup when a non-root user is required.",
      inspect: [
        "Pod-level runAsNonRoot",
        "Container-level runAsNonRoot",
        "runAsUser",
        "Image USER directive",
        "Application file permissions",
      ],
      fix:
        "Run the application as a suitable non-root UID and ensure required files and directories are accessible to that UID.",
      caution:
        "Setting runAsNonRoot to true does not automatically make an image compatible with a non-root runtime.",
    },

    allowPrivilegeEscalation: {
      symptom:
        "The security policy rejects a container that permits privilege escalation.",
      inspect: [
        "securityContext.allowPrivilegeEscalation",
        "Whether the application truly needs setuid or similar behavior",
      ],
      fix:
        "Disable privilege escalation where compatible and test the application in staging.",
    },

    capabilities: {
      symptom:
        "A policy rejects added Linux capabilities.",
      inspect: [
        "securityContext.capabilities.add",
        "securityContext.capabilities.drop",
        "The application's actual kernel capability requirement",
      ],
      fix:
        "Drop unnecessary capabilities and add only those required by a documented, reviewed workload requirement.",
    },

    seccomp: {
      symptom:
        "A policy requires a supported seccomp profile.",
      inspect: [
        "Pod-level seccompProfile",
        "Container-level seccompProfile",
        "RuntimeDefault compatibility",
      ],
      fix:
        "Use a supported profile appropriate to the workload and validate in staging.",
    },

    readOnlyRootFilesystem: {
      symptom:
        "The workload fails when the root filesystem is read-only, or an organizational policy requires read-only operation.",
      inspect: [
        "Application write paths",
        "Temporary file usage",
        "Logs and cache locations",
        "Mounted writable volumes",
      ],
      fix:
        "Use explicit writable volumes for legitimate write paths and keep the root filesystem read-only where compatible.",
    },

    privilegedAndHostAccess: {
      symptom:
        "A Pod requests privileged mode, host networking, host PID, host IPC, or hostPath access.",
      inspect: [
        "Whether the workload is a node agent",
        "Exact host resources required",
        "Alternative APIs or mounted resources",
        "DaemonSet design and node security boundaries",
      ],
      fix:
        "Remove unnecessary host access. If the workload genuinely requires it, isolate it and obtain an explicit security exception.",
    },
  },

  webhookTroubleshooting: {
    symptoms: [
      "failed calling webhook",
      "context deadline exceeded",
      "no endpoints available for service",
      "x509 certificate errors",
      "connection refused",
    ],

    workflow: [
      "Identify the webhook name from the error.",
      "Find its ValidatingWebhookConfiguration or MutatingWebhookConfiguration.",
      "Inspect the referenced service and namespace.",
      "Check the service's EndpointSlices.",
      "Check controller Pod readiness and recent logs.",
      "Inspect TLS certificate and CA bundle configuration.",
      "Review webhook timeout and failurePolicy.",
      "Check whether namespaceSelector or objectSelector includes the affected workload.",
      "Test with a non-production request after recovery.",
    ],

    commands: [
      "kubectl get validatingwebhookconfigurations",
      "kubectl get mutatingwebhookconfigurations",
      "kubectl describe validatingwebhookconfiguration \"$WEBHOOK_CONFIG\"",
      "kubectl get svc -n \"$WEBHOOK_NAMESPACE\"",
      "kubectl get endpointslices -n \"$WEBHOOK_NAMESPACE\"",
      "kubectl get pods -n \"$WEBHOOK_NAMESPACE\" -o wide",
      "kubectl logs -n \"$WEBHOOK_NAMESPACE\" \"$WEBHOOK_POD\" --since=30m",
    ],

    failurePolicyWarning:
      "Changing a webhook failurePolicy from Fail to Ignore can allow requests through when the webhook is unavailable. " +
      "This may bypass a security control. Treat it as an exceptional, time-limited, explicitly approved action—not a routine fix.",

    recovery:
      "Restore the webhook service, controller, certificates, or policy configuration that caused the failure. " +
      "Validate the actual admission path before resuming a large rollout.",
  },

  helmAndGitOps: {
    commonFailures: [
      "A legacy chart still creates a PodSecurityPolicy resource.",
      "A chart changes the ServiceAccount or securityContext unexpectedly.",
      "A values file overrides the intended restricted settings.",
      "GitOps continuously reverts a manual repair.",
      "A chart upgrade introduces hostPath or privilege settings.",
      "A policy update is applied before dependent workloads are compliant.",
    ],

    commands: [
      "helm history \"$RELEASE_NAME\" -n \"$NAMESPACE\"",
      "helm get values \"$RELEASE_NAME\" -n \"$NAMESPACE\"",
      "helm get manifest \"$RELEASE_NAME\" -n \"$NAMESPACE\"",
      "helm template \"$RELEASE_NAME\" \"$CHART_PATH\" -n \"$NAMESPACE\" -f \"$VALUES_FILE\"",
      "git status --short",
      "git diff",
    ],

    procedure: [
      "Identify the source-of-truth repository and exact release revision.",
      "Render the intended chart version and values.",
      "Search for PSP resources and unsupported API versions.",
      "Compare securityContext settings with the active policy.",
      "Run approved server-side dry-run validation where supported.",
      "Commit the correction and deploy through the normal pipeline.",
      "Verify that GitOps does not revert the corrected configuration.",
    ],

    warning:
      "A direct kubectl edit can be overwritten by Helm, GitOps, or the next pipeline run. " +
      "Correct the declarative source of truth.",
  },

  recoveryAndRollback: {
    principles: [
      "Preserve healthy replicas wherever possible.",
      "Identify the exact policy and denied field before making changes.",
      "Prefer workload compliance over weakening security controls.",
      "Make a narrow, reviewed exception only when a genuine requirement exists.",
      "Use staging validation before production changes.",
      "Record rollback criteria and the responsible approver.",
    ],

    recoveryOptions: [
      {
        option: "Correct the Pod securityContext",
        when:
          "The workload does not satisfy the intended policy.",
        steps: [
          "Inspect the rendered Pod template.",
          "Identify the exact prohibited field.",
          "Choose a compliant alternative.",
          "Test in staging.",
          "Deploy through the approved workflow.",
          "Verify readiness and application behavior.",
        ],
      },
      {
        option: "Migrate from legacy PSP",
        when:
          "The chart or manifest references the removed PodSecurityPolicy API.",
        steps: [
          "Inventory all PSP resources and RBAC references.",
          "Identify the original security requirements.",
          "Map the requirements to PSA, Kyverno, Gatekeeper, or another supported mechanism.",
          "Test the new enforcement in a non-production namespace.",
          "Migrate workloads and validate admission behavior.",
          "Remove obsolete resources from the source repository.",
        ],
      },
      {
        option: "Recover an admission webhook",
        when:
          "Requests fail because a required webhook is unavailable.",
        steps: [
          "Capture the webhook error.",
          "Inspect the webhook controller and service endpoints.",
          "Repair the controller, TLS, or network issue.",
          "Validate admission with a test resource.",
          "Resume production deployment gradually.",
        ],
      },
      {
        option: "Rollback a deployment",
        when:
          "A newly deployed Pod template is the confirmed cause and the previous revision is known to be safe.",
        commands: [
          "kubectl rollout history deployment/\"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\"",
          "kubectl rollout undo deployment/\"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\"",
          "kubectl rollout status deployment/\"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\"",
        ],
        warning:
          "A Deployment rollback does not revert namespace labels, admission policies, or unrelated Helm and GitOps resources. " +
          "Confirm that the previous revision is compatible with the current policy.",
      },
    ],

    rollbackCriteria: [
      "Available replicas drop below the agreed safety threshold.",
      "The corrected workload fails readiness or application health checks.",
      "A policy change affects unrelated namespaces.",
      "A webhook recovery causes new admission failures.",
      "The change creates an unexpected privilege escalation or host access path.",
    ],
  },

  monitoringAndObservability: {
    signals: [
      {
        signal: "FailedCreate events",
        purpose:
          "Detect repeated Pod creation failures in ReplicaSets.",
      },
      {
        signal: "Deployment availability",
        purpose:
          "Detect customer-facing workload degradation during a blocked rollout.",
      },
      {
        signal: "Admission webhook errors",
        purpose:
          "Detect webhook timeouts, connection failures, and rejected requests.",
      },
      {
        signal: "Policy violation reports",
        purpose:
          "Identify noncompliant workloads before enforcement changes.",
      },
      {
        signal: "Policy audit and warning events",
        purpose:
          "Measure migration readiness before stricter enforcement.",
      },
    ],

    alertExamples: [
      {
        name: "DeploymentUnavailable",
        condition:
          "Available replicas fall below the application's configured SLO threshold.",
        response:
          "Check rollout status, ReplicaSet events, and admission denial messages.",
      },
      {
        name: "RepeatedFailedCreate",
        condition:
          "A ReplicaSet repeatedly fails to create Pods.",
        response:
          "Identify whether the cause is admission, quota, RBAC, or another API validation failure.",
      },
      {
        name: "AdmissionWebhookUnavailable",
        condition:
          "A required admission webhook is unavailable or repeatedly times out.",
        response:
          "Inspect webhook endpoints, controller health, TLS, and failurePolicy.",
      },
      {
        name: "SecurityPolicyViolationIncrease",
        condition:
          "Policy audit or warning findings increase after a release.",
        response:
          "Compare the new workload templates with the active policy and identify the source change.",
      },
    ],

    note:
      "Exact metrics and log fields depend on the installed policy engine and monitoring stack. " +
      "Confirm available signals before defining production alert rules.",
  },

  automation: {
    readOnlyPreflight: `#!/usr/bin/env bash
set -u

: "\${NAMESPACE:?Set NAMESPACE}"
: "\${DEPLOYMENT_NAME:?Set DEPLOYMENT_NAME}"

echo "=== Current context ==="
kubectl config current-context || exit 1

echo "=== Cluster version ==="
kubectl version || exit 1

echo "=== Namespace labels ==="
kubectl get namespace "$NAMESPACE" --show-labels || exit 1

echo "=== Deployment ==="
kubectl get deployment "$DEPLOYMENT_NAME" \\
  -n "$NAMESPACE" -o wide || exit 1

echo "=== ReplicaSets ==="
kubectl get replicasets -n "$NAMESPACE" -o wide || exit 1

echo "=== Pods ==="
kubectl get pods -n "$NAMESPACE" -o wide || exit 1

echo "=== Recent events ==="
kubectl get events -n "$NAMESPACE" \\
  --sort-by=.metadata.creationTimestamp || exit 1

echo "=== Admission webhooks ==="
kubectl get validatingwebhookconfigurations
kubectl get mutatingwebhookconfigurations

echo "Preflight completed. No resources were changed."
`,

    ciChecks: [
      "Reject manifests that create the removed PodSecurityPolicy API.",
      "Validate rendered Helm manifests against the target Kubernetes version.",
      "Check for prohibited privileged and host-access settings.",
      "Validate securityContext fields against the organization's baseline.",
      "Run server-side dry-run tests where supported.",
      "Require approval for namespace enforcement label changes.",
      "Detect policy-engine configuration changes in code review.",
      "Test critical workloads in staging before production enforcement.",
    ],

    safety:
      "The preflight script is read-only. It does not determine whether every Pod is compliant and does not automatically fix policies.",
  },

  rootCauseAnalysis: {
    method: [
      "Record the exact admission error.",
      "Identify whether the denial originates from PSA or a third-party webhook.",
      "Confirm the cluster version and supported APIs.",
      "Inspect the namespace policy and rendered Pod specification.",
      "Compare the affected release with the last known-good revision.",
      "Review policy, Helm, and GitOps changes around the incident timestamp.",
      "Validate the suspected cause using a controlled test.",
      "Apply a least-privilege correction.",
      "Verify both Pod admission and application health.",
      "Document the prevention action.",
    ],

    example: {
      observation:
        "A new Deployment cannot create Pods after a namespace is moved to restricted enforcement.",
      evidence: [
        "ReplicaSet events report a Pod Security violation.",
        "The rendered manifest enables privilege escalation.",
        "The workload does not require privilege escalation.",
        "Existing replicas remain healthy.",
      ],
      rootCause:
        "The new Pod template does not satisfy the active restricted policy.",
      remediation:
        "Update the Pod securityContext to meet the intended standard, validate the manifest, and deploy through the approved pipeline.",
      validation:
        "Confirm the new Pods are admitted, become Ready, and serve traffic normally.",
      prevention:
        "Add policy validation to CI and test namespace enforcement changes in staging before production rollout.",
    },
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    startTimeUTC: "",
    detectionTimeUTC: "",
    recoveryTimeUTC: "",
    cluster: "",
    kubernetesVersion: "",
    namespace: "",
    workload: "",
    policyMechanism: "",
    policyName: "",
    admissionError: "",
    affectedReplicas: 0,
    customerImpact: "",
    recentChanges: [],
    evidence: [],
    rootCause: "",
    remediation: "",
    rollbackPerformed: false,
    validationResults: [],
    preventionActions: [
      {
        action: "",
        owner: "",
        dueDate: "",
        status: "open",
      },
    ],
  },

  handsOnLabs: [
    {
      title: "Lab 1 — Identify a legacy PSP manifest",
      tasks: [
        "Search a test repository for PodSecurityPolicy.",
        "Render the associated Helm chart.",
        "Identify unsupported API resources.",
        "Document the security requirements the old policy enforced.",
      ],
      successCriteria:
        "Identify legacy PSP dependencies without modifying production resources.",
    },
    {
      title: "Lab 2 — Diagnose a PSA rejection",
      tasks: [
        "Create a test namespace.",
        "Apply a Pod Security Standard in the test namespace.",
        "Attempt to deploy a deliberately noncompliant test workload.",
        "Capture the admission error.",
        "Correct the workload to comply with the policy.",
      ],
      successCriteria:
        "Explain the rejected field and demonstrate a compliant replacement.",
    },
    {
      title: "Lab 3 — Validate securityContext",
      tasks: [
        "Inspect a test image's user and write requirements.",
        "Configure an appropriate non-root identity.",
        "Review capabilities and privilege escalation settings.",
        "Test writable paths with a read-only root filesystem where suitable.",
      ],
      successCriteria:
        "Demonstrate a secure configuration without breaking the application.",
    },
    {
      title: "Lab 4 — Diagnose an admission webhook failure",
      tasks: [
        "Inspect a non-production webhook configuration.",
        "Check the controller Pod and Service endpoints.",
        "Review logs and TLS configuration.",
        "Restore service health using the approved test procedure.",
      ],
      successCriteria:
        "Distinguish a policy rejection from an unavailable webhook.",
    },
    {
      title: "Lab 5 — Build a policy migration pipeline",
      tasks: [
        "Add legacy PSP detection to CI.",
        "Render Helm manifests.",
        "Run supported server-side validation.",
        "Review policy violations in staging.",
        "Add a controlled production rollout check.",
      ],
      successCriteria:
        "Prevent unsupported PSP resources and detect policy violations before deployment.",
    },
  ],

  interviewQuestions: [
    {
      question: "Is PodSecurityPolicy available in current Kubernetes versions?",
      answer:
        "The built-in PSP API was removed in Kubernetes 1.25. PSA and supported policy engines are common alternatives.",
    },
    {
      question: "What is Pod Security Admission?",
      answer:
        "A built-in admission controller that applies Pod Security Standards using namespace-level enforcement, audit, and warning modes.",
    },
    {
      question: "What is the difference between baseline and restricted?",
      answer:
        "Baseline blocks known privilege-escalation patterns. Restricted applies stronger hardening requirements.",
    },
    {
      question: "How do you investigate a Forbidden Pod error?",
      answer:
        "Read the exact error, inspect ReplicaSet events, identify the policy mechanism, inspect namespace labels, and compare the denied field with the policy.",
    },
    {
      question: "Why can a webhook failure block all deployments?",
      answer:
        "A required admission webhook can reject requests or fail closed when it is unavailable, depending on its configuration.",
    },
    {
      question: "Should you disable the policy to recover a deployment?",
      answer:
        "Not as a default response. Prefer a compliant workload or a narrowly justified, approved exception.",
    },
    {
      question: "Why can a Deployment rollback fail to fix a policy incident?",
      answer:
        "A Deployment rollback does not automatically restore namespace labels, admission webhook configuration, or independent policy resources.",
    },
    {
      question: "How do you migrate from PSP?",
      answer:
        "Inventory legacy policy requirements, map them to PSA or a policy engine, test in staging, migrate workloads, and remove obsolete resources.",
    },
    {
      question: "What is the difference between admission rejection and CrashLoopBackOff?",
      answer:
        "Admission rejection prevents the Pod from being created successfully; CrashLoopBackOff indicates a container repeatedly exits after creation.",
    },
    {
      question: "What should be validated after a security-policy fix?",
      answer:
        "Successful admission, rollout completion, workload readiness, application functionality, and preservation of the intended security boundary.",
    },
  ],

  completionChecklist: [
    "Correct cluster and namespace verified",
    "Production impact and healthy replicas recorded",
    "Exact admission error captured",
    "Kubernetes version checked",
    "Legacy PSP references investigated",
    "PSA labels inspected",
    "Third-party policy engine identified if applicable",
    "Rendered Pod specification inspected",
    "SecurityContext and host access requirements reviewed",
    "Webhook health checked where relevant",
    "Recent policy and deployment changes compared",
    "Root cause supported by evidence",
    "Least-privilege correction applied",
    "Rollout completed successfully",
    "Application health and security posture validated",
    "CI checks and preventive actions recorded",
  ],

  references: [
    {
      title: "Kubernetes — Pod Security Policies",
      url: "https://kubernetes.io/docs/concepts/security/pod-security-policy/",
      purpose:
        "Historical PSP documentation and removal context.",
    },
    {
      title: "Kubernetes — Pod Security Admission",
      url: "https://kubernetes.io/docs/concepts/security/pod-security-admission/",
      purpose:
        "PSA labels, enforcement, audit, and warning modes.",
    },
    {
      title: "Kubernetes — Pod Security Standards",
      url: "https://kubernetes.io/docs/concepts/security/pod-security-standards/",
      purpose:
        "Privileged, baseline, and restricted security requirements.",
    },
    {
      title: "Kubernetes — Admission Controllers",
      url: "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/",
      purpose:
        "Admission request processing and built-in admission controllers.",
    },
    {
      title: "Kubernetes — Dynamic Admission Control",
      url: "https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/",
      purpose:
        "Validating and mutating admission webhooks.",
    },
    {
      title: "Amazon EKS User Guide",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/",
      purpose:
        "EKS cluster operations and workload security guidance.",
    },
  ],
} as const;

export default podSecurityPolicyIssueGuide;
