"use client";

import { useState } from "react";
import { parseDocument } from "yaml";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type Lesson = {
  title: string;
  description: string;
  purpose: string;
  concepts: string[];
  example: string;
  practice: string[];
  mistakes: string[];
  incident: string;
  recovery: string[];
  quiz: Question[];
};

const lessons: Record<string, Lesson> = {
  "Argo CD Application": {
    title: "Argo CD Application — Declarative GitOps Delivery",
    description:
      "An Argo CD Application is a Kubernetes custom resource that connects a source of desired configuration to a destination cluster and namespace. It tells Argo CD where application manifests or Helm charts are stored, which revision or chart version should be used, how resources should be rendered, and where those resources should be synchronized. Argo CD continuously compares the desired state in Git with the live state in Kubernetes and reports differences through application status and health information.",
    purpose:
      "The Application resource is the central delivery contract in an Argo CD GitOps workflow. Platform teams use it to standardize application deployment, make Git the auditable source of desired state, review configuration changes through pull requests, and detect drift between declared and running resources. Automated synchronization can apply approved changes, while manual synchronization provides an explicit operational approval step.",
    concepts: [
      "apiVersion identifies the Argo CD Application API version. The installed Argo CD CRDs and controller version must support the chosen API.",
      "kind: Application identifies the resource managed by Argo CD.",
      "metadata.name identifies the Application resource. Use a consistent naming convention that reflects the application and environment.",
      "metadata.namespace normally identifies the namespace where the Argo CD Application resource itself is stored, commonly the Argo CD control-plane namespace.",
      "spec.project associates the Application with an AppProject, which controls permitted source repositories, destinations and resource kinds.",
      "spec.source.repoURL identifies the Git repository or chart repository containing the desired application definition.",
      "spec.source.targetRevision selects a Git branch, tag, commit, or chart version depending on the source type.",
      "spec.source.path identifies the directory containing Kubernetes manifests or the chart path in a Git repository.",
      "spec.source.chart identifies a Helm chart when the source is a Helm repository.",
      "spec.source.helm.valueFiles selects values files used to customize a Helm chart.",
      "spec.source.helm.parameters can override chart values. Keep overrides intentional and review precedence carefully.",
      "spec.destination.server identifies the Kubernetes API server targeted by the Application. An Argo CD cluster registration can provide the destination connection.",
      "spec.destination.namespace selects the destination namespace for namespaced resources when applicable.",
      "spec.syncPolicy.automated enables automatic synchronization when configured. Understand the operational approval requirements before enabling it.",
      "automated.prune controls whether resources removed from the desired source can be deleted during synchronization.",
      "automated.selfHeal allows Argo CD to correct certain live-state changes that differ from the declared desired state.",
      "syncOptions customize synchronization behavior. Options must be selected based on the resource lifecycle and cluster requirements.",
      "retry configuration can help recover from transient synchronization failures, but it does not repair invalid manifests or incorrect permissions.",
      "ignoreDifferences configures selected fields that should not trigger ordinary difference reporting. Broad ignore rules can hide meaningful drift.",
      "sync waves and resource hooks can coordinate ordered deployment tasks. They should not be used as a substitute for sound application readiness design.",
      "Application health and sync status are different signals. A resource may be synchronized but unhealthy.",
      "An AppProject provides repository and destination boundaries and can restrict permitted resource kinds.",
      "App-of-apps patterns and ApplicationSets help manage many applications, but introduce additional ownership and lifecycle considerations.",
      "A successful Git commit does not prove that a destination cluster can pull images, create resources or pass health checks.",
      "Rollback and recovery must account for the source revision, automated sync policy, database compatibility and resource deletion behavior."
    ],
    example: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: payments-staging
  namespace: argocd
spec:
  project: staging
  source:
    repoURL: https://github.com/example/platform-config.git
    targetRevision: main
    path: applications/payments/overlays/staging
  destination:
    server: https://kubernetes.default.svc
    namespace: payments-staging
  syncPolicy:
    automated:
      prune: false
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m`,
    practice: [
      "Create an Application resource with apiVersion, kind, metadata and spec. Explain the purpose of each top-level field.",
      "Configure repoURL, targetRevision and path for an application stored in a Git repository.",
      "Create separate staging and production Application definitions that use different overlay directories.",
      "Configure destination.server and destination.namespace and explain the difference between the Application resource namespace and destination namespace.",
      "Create an AppProject reference and identify the repository and destination permissions required by the Application.",
      "Enable automated synchronization in a non-production test environment and observe how a Git change is applied.",
      "Compare automated synchronization with manual synchronization and describe the approval controls each approach provides.",
      "Enable selfHeal in a safe test environment and observe how a manually modified managed resource is reconciled.",
      "Study prune behavior by removing a disposable test resource from Git. Verify the deletion implications before enabling pruning in a real environment.",
      "Configure retry behavior and distinguish temporary API errors from permanent manifest or permission failures.",
      "Inspect an Application with argocd app get and kubectl get application to compare CLI and Kubernetes resource views.",
      "Use argocd app diff to investigate differences between Git desired state and live cluster state.",
      "Create an environment-specific deployment path and verify that production cannot accidentally reference staging configuration.",
      "Explain how sync waves, health checks and resource hooks influence coordinated application delivery."
    ],
    mistakes: [
      "Using a repository URL or path that does not exist or is inaccessible to the Argo CD repository service.",
      "Selecting a targetRevision that does not contain the expected application configuration.",
      "Confusing the namespace containing the Application CR with the destination namespace for application resources.",
      "Referencing an AppProject that does not permit the repository or target cluster.",
      "Enabling automated pruning without reviewing which resources Argo CD owns and may delete.",
      "Assuming selfHeal repairs every possible runtime failure. It reconciles declared configuration differences, not application bugs.",
      "Ignoring OutOfSync status and assuming the application is healthy because resources exist.",
      "Treating Synced status as proof that the application is operational and all health checks pass.",
      "Using broad ignoreDifferences rules that conceal important configuration drift.",
      "Using mutable Git references without a controlled promotion and audit process.",
      "Changing production manifests directly in the cluster instead of updating the declared source.",
      "Assuming retry configuration can resolve invalid YAML, missing charts or denied Kubernetes permissions.",
      "Allowing an overly permissive AppProject to deploy arbitrary resources to sensitive clusters.",
      "Deleting an Application without understanding resource finalizers and cascading deletion behavior."
    ],
    incident:
      "A production Argo CD Application becomes OutOfSync after a release. The Git repository contains a new Deployment configuration, but synchronization fails with a permission error. A manual change to the live Deployment is also being repeatedly reverted in a different environment. The team needs to distinguish repository access, Kubernetes RBAC, project restrictions and self-healing behavior before changing production state.",
    recovery: [
      "Capture the Application name, destination cluster, namespace, source revision and current sync and health status.",
      "Run argocd app get payments-staging and inspect the reported source, destination, conditions and sync status.",
      "Run argocd app diff payments-staging to understand the exact desired-versus-live differences.",
      "Check whether the repository can be accessed and whether the configured targetRevision and path exist.",
      "Inspect the AppProject and verify that the repository, destination and required resource kinds are permitted.",
      "Inspect Argo CD controller and application-controller logs for reconciliation errors.",
      "Verify the destination cluster connection and the Kubernetes permissions available to the Argo CD application controller.",
      "Inspect the failed resource events and identify whether the failure is caused by RBAC, admission policy, quota or invalid configuration.",
      "Review automated sync, selfHeal and prune settings before making a manual cluster change.",
      "Correct the source configuration or project permissions through a reviewed Git change.",
      "Use a controlled synchronization after verifying the diff and deletion implications.",
      "Confirm the Application reaches the intended sync status and that its resources become healthy.",
      "Verify application endpoints, logs and operational metrics independently of Argo CD sync status.",
      "Document the root cause, affected revision, recovery action and preventive permission checks."
    ],
    quiz: [
      {
        question: "What does spec.source.path identify for a Git-based Argo CD Application?",
        options: ["The Kubernetes API endpoint", "The repository directory containing application configuration", "The destination namespace", "The Argo CD controller log directory"],
        answer: 1,
        explanation: "The source path identifies the directory in the repository containing the manifests or configuration Argo CD should render."
      },
      {
        question: "What is the purpose of automated selfHeal?",
        options: ["Reconcile certain live-state drift back to the declared desired state", "Automatically repair application source code", "Rotate every cluster credential", "Create a Git repository"],
        answer: 0,
        explanation: "Self-healing helps Argo CD correct live-state changes that differ from the declared configuration, subject to the configured behavior."
      },
      {
        question: "What does prune control during synchronization?",
        options: ["Whether removed desired resources can be deleted", "Whether YAML indentation is corrected", "Whether container images are built", "Whether Git commits are signed"],
        answer: 0,
        explanation: "Pruning controls deletion of managed resources that are no longer present in the desired application source."
      },
      {
        question: "Does Synced necessarily mean the application is healthy?",
        options: ["Yes, always", "No, synchronization and health are separate signals", "Only for Helm applications", "Only when prune is enabled"],
        answer: 1,
        explanation: "Synced indicates desired and live state are aligned according to comparison rules. Health is a separate assessment."
      }
    ]
  },

  "Helm Values": {
    title: "Helm Values — Reusable Kubernetes Configuration",
    description:
      "Helm values are configuration inputs used to customize a Helm chart without rewriting its templates. A chart defines reusable templates and default values, while a values file supplies environment-specific settings such as replica counts, container images, resource requests, service configuration, ingress rules and application settings. Helm combines chart defaults with supplied overrides to render Kubernetes manifests.",
    purpose:
      "Values files help teams maintain reusable charts across development, staging and production. Instead of duplicating entire Kubernetes manifests, teams keep a common chart and provide reviewed configuration for each environment. This makes release configuration easier to audit, promote and test while separating application packaging from deployment-specific choices.",
    concepts: [
      "Chart.yaml describes chart metadata including name, version and chart dependencies.",
      "values.yaml defines the chart's default configuration values.",
      "Custom values files override selected defaults for a particular environment or release.",
      "Helm templates use Go template expressions to generate Kubernetes resources from chart values.",
      "The .Values object exposes merged configuration to templates.",
      "Nested values are commonly organized by component, such as image, service, ingress, resources and autoscaling.",
      "The --values or -f option supplies one or more values files to Helm commands.",
      "The --set option supplies command-line overrides. Use it carefully for values that are difficult to express in shell syntax.",
      "The --set-string option forces a value to be treated as a string, which can matter for identifiers and values resembling numbers or booleans.",
      "When multiple values files are supplied, later files can override earlier values for overlapping keys.",
      "Helm's values merge behavior must be understood when maps and lists are combined. Lists do not behave like recursively merged maps in every situation.",
      "A chart can define a values.schema.json file to validate the shape and types of values.",
      "Required template functions can enforce that essential values are supplied before rendering.",
      "Helm lint checks chart structure and common chart problems.",
      "helm template renders manifests locally without installing them into a cluster.",
      "helm upgrade --install supports repeatable release installation and upgrade workflows.",
      "helm get values can inspect user-supplied release values, while helm get values --all includes computed values.",
      "helm get manifest helps inspect the manifests associated with an installed release.",
      "Image repository, tag and pull policy should be controlled through deliberate release configuration.",
      "Resource requests and limits should reflect workload behavior and cluster capacity.",
      "Autoscaling configuration should be coordinated with replica settings and the metrics infrastructure.",
      "Environment-specific secrets should be sourced from approved secret-management mechanisms rather than committed as plaintext values.",
      "A values file should be validated against the exact chart version that will consume it.",
      "A successful YAML parse does not prove that a chart recognizes every key. Unknown keys may be ignored unless schema or template validation catches them.",
      "Helm release history and rollback commands help recover from failed upgrades, but data migrations and external side effects require separate recovery planning."
    ],
    example: `replicaCount: 3

image:
  repository: ghcr.io/example/payments-api
  tag: "1.4.2"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 8080
  targetPort: 8080

ingress:
  enabled: true
  className: nginx
  hosts:
    - host: payments.example.internal
      paths:
        - path: /
          pathType: Prefix

resources:
  requests:
    cpu: 250m
    memory: 256Mi
  limits:
    cpu: "1"
    memory: 768Mi

autoscaling:
  enabled: false
  minReplicas: 3
  maxReplicas: 8
  targetCPUUtilizationPercentage: 70

podAnnotations:
  team: payments
  environment: staging`,
    practice: [
      "Inspect a Helm chart and identify Chart.yaml, values.yaml, templates and optional values.schema.json.",
      "Change replicaCount in a staging values file and render the chart with helm template.",
      "Create development, staging and production values files while keeping the same chart version.",
      "Override the image repository and tag without modifying the chart templates.",
      "Supply multiple values files and verify which file wins when the same key is defined more than once.",
      "Compare --set and --set-string with a value such as an account identifier containing leading zeroes.",
      "Configure service type, port and targetPort, then inspect the rendered Service resource.",
      "Configure ingress values and verify the rendered host, paths, class and annotations.",
      "Set CPU and memory requests and limits and explain how they affect scheduling and container resource enforcement.",
      "Configure autoscaling values and inspect whether the chart renders an HPA resource.",
      "Use helm lint and helm template to identify chart and rendering errors before a cluster upgrade.",
      "Inspect helm get values and helm get manifest for an installed release.",
      "Add a schema for required values and invalid types, then test both valid and invalid inputs.",
      "Perform a controlled upgrade in a disposable test namespace and inspect release history.",
      "Practice rollback in a non-production environment and identify external data changes that Helm rollback cannot automatically reverse."
    ],
    mistakes: [
      "Using values keys that the selected chart does not recognize or consume.",
      "Assuming a YAML parser validates the semantic meaning of every chart value.",
      "Using a values file written for a different chart version.",
      "Misunderstanding override precedence when multiple -f files are supplied.",
      "Assuming lists merge in the same way as nested maps.",
      "Using --set for complex nested structures without checking shell quoting and escaping.",
      "Writing numeric-looking identifiers without quotes when the chart expects a string.",
      "Committing plaintext credentials, tokens or private keys in values files.",
      "Setting resource limits too low and causing CPU throttling or memory-related container termination.",
      "Enabling autoscaling without the necessary metrics support or compatible chart configuration.",
      "Changing replicaCount while autoscaling is enabled without understanding which controller owns the desired replica count.",
      "Using mutable image tags that make release provenance difficult to establish.",
      "Skipping helm template and helm lint before deployment.",
      "Assuming helm rollback reverses database migrations or external infrastructure changes.",
      "Using an unreviewed production override file that silently changes service exposure or resource allocation."
    ],
    incident:
      "A Helm release upgrade renders successfully but the new application pods fail to become healthy. The production values file contains an unexpected image tag override and a memory limit that is too low. A second values file was supplied later in the command, overriding the intended image configuration. The operations team must identify the final merged values and restore a known-good release safely.",
    recovery: [
      "Identify the release name, namespace, chart version and failed upgrade revision.",
      "Run helm history payments -n payments to inspect release revisions and upgrade status.",
      "Run helm get values payments -n payments --all to inspect the computed release values.",
      "Inspect the deployment and pod events to identify image-pull, scheduling, memory or application startup failures.",
      "Review the exact order of -f values files and command-line overrides used in the failed pipeline.",
      "Render the intended configuration with helm template using the same chart version and the exact values-file order.",
      "Compare the rendered Deployment image and resource settings against the approved release configuration.",
      "Correct the environment values and run helm lint before another upgrade.",
      "Review the resulting diff and validate the target image exists and is accessible to the cluster.",
      "Upgrade in a controlled manner and observe rollout status and pod health.",
      "If necessary, perform a tested Helm rollback to a known-good revision after evaluating database and external side effects.",
      "Verify application functionality, logs, resource usage and service endpoints after recovery.",
      "Record the exact values-file order and chart version in the release pipeline to prevent recurrence."
    ],
    quiz: [
      {
        question: "What is the main purpose of a Helm values file?",
        options: ["Define the Kubernetes API server", "Customize chart templates without rewriting them", "Replace the container runtime", "Create Git branches"],
        answer: 1,
        explanation: "Values files provide configuration inputs that chart templates use to generate Kubernetes resources."
      },
      {
        question: "What is helm template commonly used for?",
        options: ["Render chart manifests locally", "Delete all chart releases", "Create a Kubernetes cluster", "Build container images"],
        answer: 0,
        explanation: "helm template renders the chart into Kubernetes manifests without installing the release into a cluster."
      },
      {
        question: "When multiple values files define the same key, what generally happens?",
        options: ["The first file always wins", "The later file can override the earlier file", "Helm always rejects the configuration", "The key is removed"],
        answer: 1,
        explanation: "Helm processes values files in order, with later overrides taking precedence for overlapping values."
      },
      {
        question: "Does successful YAML parsing guarantee that a chart uses every supplied key?",
        options: ["Yes", "No, chart schema and templates determine which values are recognized", "Only for production", "Only when using --set"],
        answer: 1,
        explanation: "YAML parsing checks syntax. Chart schema and template logic determine whether values are valid and consumed."
      }
    ]
  }
};


export default function YamlGitOpsConfigurationsWorkspace({
  topic,
  tab
}: {
  topic: string;
  tab: string;
}) {
  const lesson = lessons[topic] ?? lessons["Argo CD Application"];
  const activeTab = tab || "Learn";
  const [source, setSource] = useState(lesson.example);
  const [validation, setValidation] = useState("");
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const correct = lesson.quiz.filter((question, index) => answers[index] === question.answer).length;

  function restoreExample() {
    setSource(lesson.example);
    setValidation("");
  }

  function validateSource() {
    try {
      const document = parseDocument(source, { uniqueKeys: true });

      if (document.errors.length) {
        setValidation(document.errors.map(error => error.message).join("\n"));
        return;
      }

      const parsed = document.toJS();
      const issues: string[] = [];

      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        issues.push("The YAML document must contain a root mapping.");
      } else if (topic === "Argo CD Application") {
        if (parsed.apiVersion !== "argoproj.io/v1alpha1") {
          issues.push("Expected apiVersion: argoproj.io/v1alpha1.");
        }
        if (parsed.kind !== "Application") {
          issues.push("Expected kind: Application.");
        }
        if (!parsed.metadata?.name) {
          issues.push("metadata.name is required.");
        }
        if (!parsed.spec || typeof parsed.spec !== "object") {
          issues.push("spec mapping is required.");
        } else {
          if (!parsed.spec.project) issues.push("spec.project is required.");
          if (!parsed.spec.source || typeof parsed.spec.source !== "object") {
            issues.push("spec.source mapping is required.");
          } else {
            if (!parsed.spec.source.repoURL) issues.push("spec.source.repoURL is required.");
            if (!parsed.spec.source.targetRevision) issues.push("spec.source.targetRevision is required.");
            if (!parsed.spec.source.path && !parsed.spec.source.chart) {
              issues.push("spec.source.path or spec.source.chart is required.");
            }
          }
          if (!parsed.spec.destination || typeof parsed.spec.destination !== "object") {
            issues.push("spec.destination mapping is required.");
          } else if (!parsed.spec.destination.server && !parsed.spec.destination.name) {
            issues.push("spec.destination.server or spec.destination.name is required.");
          }
        }
      } else {
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          issues.push("Helm values must be a YAML mapping.");
        }
        if (parsed.image !== undefined && (
          !parsed.image || typeof parsed.image !== "object" || Array.isArray(parsed.image)
        )) {
          issues.push("image must be a mapping when provided.");
        }
        if (parsed.resources !== undefined && (
          !parsed.resources || typeof parsed.resources !== "object" || Array.isArray(parsed.resources)
        )) {
          issues.push("resources must be a mapping when provided.");
        }
        if (parsed.replicaCount !== undefined && (
          typeof parsed.replicaCount !== "number" || parsed.replicaCount < 0
        )) {
          issues.push("replicaCount should be a non-negative number.");
        }
      }

      setValidation(
        issues.length
          ? "YAML syntax is valid, but structural checks found:\n" + issues.join("\n")
          : "PASS: YAML syntax and basic " + topic + " structure checks passed. Validate against the installed CRDs or exact Helm chart version before deployment."
      );
    } catch (error) {
      setValidation(error instanceof Error ? error.message : "Unknown validation error.");
    }
  }

  return (
    <section className="w-full space-y-6">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          GitOps Configurations Learning Workspace
        </span>
        <h2 className="text-2xl font-bold">{lesson.title}</h2>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{lesson.description}</p>
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4">
          <h3 className="font-semibold mb-2">Purpose in real DevOps workflows</h3>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{lesson.purpose}</p>
        </div>
      </div>


      {activeTab === "Learn" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Core Concepts and Architecture</h3>
          {lesson.concepts.map((item, index) => (
            <div key={index} className="flex gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <span className="font-bold text-blue-600">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-7">{item}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Examples" && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Complete Configuration Example</h3>
          <pre className="overflow-x-auto rounded-xl bg-slate-950 text-green-300 p-5 text-sm leading-7">
            <code>{lesson.example}</code>
          </pre>
          <button onClick={restoreExample} className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm">
            Load example into editor
          </button>
        </div>
      )}

      {activeTab === "Practice" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Hands-on GitOps Exercises</h3>
          {lesson.practice.map((item, index) => (
            <div key={index} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="font-semibold text-sm">Exercise {index + 1}</p>
              <p className="mt-2 text-sm leading-7">{item}</p>
            </div>
          ))}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4">
            <h4 className="font-semibold">Useful CLI commands</h4>
            <pre className="overflow-x-auto text-xs leading-7 mt-2">
              <code>{topic === "Argo CD Application"
                ? `argocd app list
argocd app get <application>
argocd app diff <application>
argocd app history <application>
argocd app sync <application>
kubectl get applications -A`
                : `helm lint ./chart
helm template <release> ./chart -f values.yaml
helm show values <chart>
helm get values <release> -n <namespace> --all
helm get manifest <release> -n <namespace>
helm history <release> -n <namespace>`}</code>
            </pre>
          </div>
        </div>
      )}

      {activeTab === "Debug" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Common GitOps Configuration Failures</h3>
          {lesson.mistakes.map((item, index) => (
            <div key={index} className="rounded-xl border border-amber-200 dark:border-amber-900 p-4">
              <p className="text-sm leading-7"><strong>Issue {index + 1}:</strong> {item}</p>
            </div>
          ))}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4 space-y-2">
            <h4 className="font-semibold">Investigation commands</h4>
            <pre className="overflow-x-auto text-xs leading-7">
              <code>{topic === "Argo CD Application"
                ? `kubectl get application -A
kubectl describe application <name> -n argocd
argocd app get <application>
argocd app diff <application>
kubectl logs -n argocd deploy/argocd-application-controller`
                : `helm lint ./chart
helm template <release> ./chart -f values.yaml
helm get values <release> -n <namespace> --all
helm get manifest <release> -n <namespace>
helm history <release> -n <namespace>
kubectl describe pod <pod> -n <namespace>`}</code>
            </pre>
          </div>
        </div>
      )}

      {activeTab === "Validate" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">GitOps Configuration Editor</h3>
          <p className="text-sm text-slate-500">
            YAML syntax and basic topic-specific structure checks. This is not a replacement for Argo CD CRD validation or Helm chart rendering.
          </p>
          <textarea
            value={source}
            onChange={event => {
              setSource(event.target.value);
              setValidation("");
            }}
            spellCheck={false}
            className="w-full min-h-[440px] rounded-xl bg-slate-950 text-green-300 p-5 font-mono text-sm leading-6"
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={validateSource} className="rounded-lg bg-green-700 text-white px-5 py-2 text-sm font-semibold">
              Validate Configuration
            </button>
            <button onClick={restoreExample} className="rounded-lg border border-slate-300 px-5 py-2 text-sm">
              Restore Example
            </button>
          </div>
          {validation && (
            <pre className="whitespace-pre-wrap rounded-xl border border-slate-300 dark:border-slate-700 p-4 text-sm leading-6">
              {validation}
            </pre>
          )}
        </div>
      )}

      {activeTab === "Scenarios" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Production Incident Simulation</h3>
          <div className="rounded-xl border border-red-200 dark:border-red-900 p-5 space-y-3">
            <span className="text-xs font-semibold uppercase text-red-600">Incident scenario</span>
            <p className="text-sm leading-7">{lesson.incident}</p>
          </div>
          <h4 className="font-semibold">Investigation and recovery workflow</h4>
          {lesson.recovery.map((item, index) => (
            <div key={index} className="flex gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
              <span className="rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">
                {index + 1}
              </span>
              <p className="text-sm leading-7">{item}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Quiz" && (
        <div className="space-y-5">
          <div>
            <h3 className="text-xl font-semibold">GitOps Engineering Assessment</h3>
            <p className="text-sm text-slate-500 mt-1">Select an answer and review the explanation.</p>
          </div>
          {lesson.quiz.map((item, index) => (
            <div key={index} className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
              <p className="font-semibold text-sm">{index + 1}. {item.question}</p>
              {item.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name={`gitops-quiz-${topic}-${index}`}
                    checked={answers[index] === optionIndex}
                    onChange={() => setAnswers(current => ({ ...current, [index]: optionIndex }))}
                  />
                  {option}
                </label>
              ))}
              {answers[index] !== undefined && (
                <div className={`rounded-lg p-3 text-sm ${
                  answers[index] === item.answer
                    ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300"
                    : "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                }`}>
                  <strong>{answers[index] === item.answer ? "Correct" : "Review this answer"}</strong>
                  <p className="mt-1">{item.explanation}</p>
                </div>
              )}
            </div>
          ))}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4">
            <p className="font-semibold">Answered: {Object.keys(answers).length}/{lesson.quiz.length}</p>
            <p className="text-sm mt-1">Correct answers: {correct}/{lesson.quiz.length}</p>
            <button onClick={() => setAnswers({})} className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-sm">
              Reset assessment
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
