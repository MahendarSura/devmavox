"use client";

import YamlKubernetesWorkloadsWorkspace from "./YamlKubernetesWorkloadsWorkspace";
import YamlKubernetesNetworkingWorkspace from "./YamlKubernetesNetworkingWorkspace";
import YamlKubernetesConfigurationWorkspace from "./YamlKubernetesConfigurationWorkspace";
import YamlKubernetesStorageWorkspace from "./YamlKubernetesStorageWorkspace";
import YamlKubernetesOperationsWorkspace from "./YamlKubernetesOperationsWorkspace";
import YamlCICDConfigurationsWorkspace from "./YamlCICDConfigurationsWorkspace";
import YamlContainerConfigurationsWorkspace from "./YamlContainerConfigurationsWorkspace";
import YamlGitOpsConfigurationsWorkspace from "./YamlGitOpsConfigurationsWorkspace";
import YamlAutomationConfigurationsWorkspace from "./YamlAutomationConfigurationsWorkspace";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import YamlFundamentalsWorkspace from "./YamlFundamentalsWorkspace";
import { parseDocument, stringify } from "yaml";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[460px] items-center justify-center bg-[#070c14] text-sm text-slate-400">
        Loading YAML editor...
      </div>
    ),
  }
);

type YamlFeature = {
  id: string;
  title: string;
  description: string;
  label: string;
  categories: {
    name: string;
    subcategories: {
      name: string;
      topics: string[];
    }[];
  }[];
};

type Props = {
  feature: YamlFeature;
  slug?: string[];
};

const sampleYaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-app
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.27
          ports:
            - containerPort: 80`;

const modules = [
  { name: "Learn YAML", detail: "Concepts, syntax and configuration foundations", icon: "01" },
  { name: "YAML Editor", detail: "Write and organize YAML configurations", icon: "02" },
  { name: "YAML Validator", detail: "Live syntax validation and error reporting", icon: "03" },
  { name: "Kubernetes Manifest Lab", detail: "Explore Kubernetes resource manifests", icon: "04" },
  { name: "Troubleshooting Lab", detail: "Investigate and correct configuration errors", icon: "05" },
  { name: "CI/CD and GitOps Lab", detail: "Pipeline, Helm and GitOps configuration", icon: "06" },
  { name: "Production Scenarios", detail: "Practice real-world configuration workflows", icon: "07" },
  { name: "Quiz and Assessment", detail: "Check knowledge and practical understanding", icon: "08" },
];

const learningTabs = [
  "Learn",
  "Examples",
  "Practice",
  "Validate",
  "Debug",
  "Scenarios",
  "Quiz",
];

const topicSections = [
  "Topic overview and learning objectives",
  "Core concepts and architecture",
  "Configuration structure and components",
  "Field-by-field reference",
  "Working YAML examples",
  "Validation and troubleshooting",
  "Production considerations",
  "Hands-on practice challenge",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ActionButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-700 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}


type QuickReferenceItem = [string, string];

const topicQuickReferences: Record<string, QuickReferenceItem[]> = {
  "Syntax and Structure": [
    ["Document", "Use --- to mark a YAML document start"],
    ["Mapping", "Represent key-value pairs with a colon"],
    ["Sequence", "Represent ordered items with a hyphen"],
    ["Comments", "Use # for human-readable comments"]
  ],
  "Data Types": [
    ["String", "Quote ambiguous values and strings with special characters"],
    ["Integer", "Use numeric values without unnecessary quotes"],
    ["Boolean", "Use true or false consistently"],
    ["Null", "Use null or ~ for an explicit empty value"]
  ],
  "Lists": [
    ["Sequence", "Use a hyphen followed by a space"],
    ["Nested list", "Indent child items consistently"],
    ["List of objects", "Place mapping fields under each list item"],
    ["Validation", "Check indentation and item alignment"]
  ],
  "Objects": [
    ["Mapping", "Use key-value pairs"],
    ["Nested mapping", "Indent child mappings under their parent"],
    ["Keys", "Use unique keys within a mapping"],
    ["Values", "Use appropriate scalar, sequence or mapping types"]
  ],
  "Indentation": [
    ["Spaces", "Use spaces rather than tabs"],
    ["Consistency", "Keep sibling keys at the same indentation"],
    ["Nesting", "Indent child structures consistently"],
    ["Review", "Check list and mapping boundaries"]
  ],
  "Pod": [
    ["API", "apiVersion: v1"],
    ["Resource", "kind: Pod"],
    ["Container", "spec.containers"],
    ["Restart", "spec.restartPolicy"]
  ],
  "Deployment": [
    ["API", "apiVersion: apps/v1"],
    ["Replicas", "spec.replicas"],
    ["Selector", "spec.selector.matchLabels"],
    ["Template", "spec.template.metadata.labels"]
  ],
  "StatefulSet": [
    ["API", "apps/v1"],
    ["Identity", "spec.serviceName"],
    ["Storage", "spec.volumeClaimTemplates"],
    ["Updates", "spec.updateStrategy"]
  ],
  "DaemonSet": [
    ["API", "apps/v1"],
    ["Selector", "spec.selector"],
    ["Pods", "spec.template"],
    ["Updates", "spec.updateStrategy"]
  ],
  "Job": [
    ["API", "batch/v1"],
    ["Completions", "spec.completions"],
    ["Parallelism", "spec.parallelism"],
    ["Retries", "spec.backoffLimit"]
  ],
  "CronJob": [
    ["API", "batch/v1"],
    ["Schedule", "spec.schedule"],
    ["Template", "spec.jobTemplate"],
    ["Concurrency", "spec.concurrencyPolicy"]
  ],
  "Service": [
    ["API", "apiVersion: v1"],
    ["Selector", "spec.selector"],
    ["Ports", "spec.ports"],
    ["Target", "port and targetPort"]
  ],
  "Ingress": [
    ["API", "networking.k8s.io/v1"],
    ["Class", "spec.ingressClassName"],
    ["Routing", "spec.rules and HTTP paths"],
    ["TLS", "spec.tls"]
  ],
  "NetworkPolicy": [
    ["API", "networking.k8s.io/v1"],
    ["Selector", "spec.podSelector"],
    ["Direction", "spec.policyTypes"],
    ["Rules", "spec.ingress and spec.egress"]
  ],
  "ConfigMap": [
    ["API", "apiVersion: v1"],
    ["Values", "data"],
    ["Binary", "binaryData"],
    ["Immutability", "immutable"]
  ],
  "Secret": [
    ["API", "apiVersion: v1"],
    ["Type", "type"],
    ["Values", "data or stringData"],
    ["Security", "Base64 is not encryption; protect Secret access"]
  ],
  "RBAC": [
    ["API", "rbac.authorization.k8s.io/v1"],
    ["Permissions", "rules, apiGroups, resources and verbs"],
    ["Binding", "RoleBinding or ClusterRoleBinding"],
    ["Identity", "subjects"]
  ],
  "PersistentVolume": [
    ["API", "apiVersion: v1"],
    ["Capacity", "spec.capacity.storage"],
    ["Access", "spec.accessModes"],
    ["Reclaim", "spec.persistentVolumeReclaimPolicy"]
  ],
  "PersistentVolumeClaim": [
    ["API", "apiVersion: v1"],
    ["Request", "spec.resources.requests.storage"],
    ["Access", "spec.accessModes"],
    ["Binding", "spec.storageClassName or volumeName"]
  ],
  "StorageClass": [
    ["API", "storage.k8s.io/v1"],
    ["Provisioner", "provisioner"],
    ["Policy", "reclaimPolicy"],
    ["Binding", "volumeBindingMode"]
  ],
  "Liveness Probe": [
    ["Purpose", "Detect an unhealthy container"],
    ["Methods", "httpGet, tcpSocket or exec"],
    ["Timing", "periodSeconds and timeoutSeconds"],
    ["Failure", "failureThreshold"]
  ],
  "Readiness Probe": [
    ["Purpose", "Determine whether a Pod can receive traffic"],
    ["Methods", "httpGet, tcpSocket or exec"],
    ["Success", "successThreshold"],
    ["Failure", "failureThreshold"]
  ],
  "Startup Probe": [
    ["Purpose", "Allow slow-starting applications to initialize"],
    ["Methods", "httpGet, tcpSocket or exec"],
    ["Timing", "periodSeconds"],
    ["Failure", "failureThreshold controls startup allowance"]
  ],
  "Resource Requests and Limits": [
    ["CPU request", "resources.requests.cpu"],
    ["Memory request", "resources.requests.memory"],
    ["CPU limit", "resources.limits.cpu"],
    ["Memory limit", "resources.limits.memory"]
  ],
  "HPA": [
    ["API", "autoscaling/v2"],
    ["Target", "spec.scaleTargetRef"],
    ["Bounds", "spec.minReplicas and maxReplicas"],
    ["Metrics", "spec.metrics"]
  ],
  "Jenkinsfile": [
    ["Pipeline", "pipeline"],
    ["Agent", "agent"],
    ["Stages", "stages and stage"],
    ["Execution", "steps, post and environment"]
  ],
  "GitHub Actions Workflow": [
    ["Triggers", "on"],
    ["Jobs", "jobs"],
    ["Runner", "runs-on"],
    ["Steps", "steps, uses and run"]
  ],
  "GitLab CI Pipeline": [
    ["Stages", "stages"],
    ["Commands", "script"],
    ["Dependencies", "needs"],
    ["Artifacts", "artifacts and paths"]
  ],
  "Docker Compose": [
    ["Services", "services"],
    ["Ports", "ports"],
    ["Storage", "volumes"],
    ["Health", "healthcheck and depends_on conditions"]
  ],
  "Dockerfile": [
    ["Base image", "FROM"],
    ["Working directory", "WORKDIR"],
    ["Copy files", "COPY"],
    ["Runtime", "USER, ENTRYPOINT and CMD"]
  ],
  "Argo CD Application": [
    ["API", "argoproj.io/v1alpha1"],
    ["Source", "spec.source"],
    ["Destination", "spec.destination"],
    ["Sync", "spec.syncPolicy"]
  ],
  "Helm Values": [
    ["Image", "image.repository and image.tag"],
    ["Replicas", "replicaCount"],
    ["Resources", "resources.requests and limits"],
    ["Exposure", "service and ingress"]
  ],
  "Ansible Playbook": [
    ["Target", "hosts"],
    ["Tasks", "tasks and module arguments"],
    ["Privilege", "become"],
    ["Handlers", "notify and handlers"]
  ],
  "Ansible Inventory": [
    ["Groups", "all, children and hosts"],
    ["Host address", "ansible_host"],
    ["Connection", "ansible_user and ansible_port"],
    ["Variables", "group_vars and host_vars"]
  ]
};

const categoryQuickReferences: Record<string, QuickReferenceItem[]> = {
  "YAML Fundamentals": [
    ["Syntax", "Mappings, sequences, scalars and document markers"],
    ["Types", "Strings, numbers, booleans and null"],
    ["Structure", "Nested mappings and sequences"],
    ["Validation", "Check indentation, duplicate keys and parsing"]
  ],
  "Kubernetes Workloads": [
    ["API", "apps/v1 or batch/v1 depending on resource"],
    ["Selector", "Match workload selectors with Pod template labels"],
    ["Template", "spec.template defines Pod configuration"],
    ["Rollout", "Review replicas, strategy and readiness"]
  ],
  "Kubernetes Networking": [
    ["Service", "Stable virtual endpoint for selected Pods"],
    ["Ingress", "HTTP and HTTPS routing through an Ingress controller"],
    ["Policy", "Pod-level network traffic rules"],
    ["Check", "Selectors, ports, endpoints and controller status"]
  ],
  "Kubernetes Configuration": [
    ["ConfigMap", "Non-sensitive application configuration"],
    ["Secret", "Sensitive values with access controls"],
    ["RBAC", "Roles, bindings, subjects and permissions"],
    ["Security", "Least privilege and safe secret handling"]
  ],
  "Kubernetes Storage": [
    ["PV", "Cluster storage resource"],
    ["PVC", "Workload storage request"],
    ["StorageClass", "Dynamic provisioning configuration"],
    ["Check", "Capacity, access modes and binding status"]
  ],
  "Kubernetes Operations": [
    ["Probes", "Startup, readiness and liveness checks"],
    ["Resources", "CPU and memory requests and limits"],
    ["Autoscaling", "HPA target and metrics"],
    ["Safety", "Avoid probe and resource settings that cause restarts"]
  ],
  "CI/CD Configurations": [
    ["Pipeline", "Stages, jobs, agents and runners"],
    ["Execution", "Steps, scripts and reusable actions"],
    ["Security", "Scoped credentials and least-privilege permissions"],
    ["Delivery", "Artifacts, dependencies and deployment gates"]
  ],
  "Container Configurations": [
    ["Compose", "Services, networks and volumes"],
    ["Dockerfile", "Build instructions and runtime defaults"],
    ["Security", "Non-root users and trusted base images"],
    ["Health", "Health checks and startup dependencies"]
  ],
  "GitOps Configurations": [
    ["Application", "Source repository and destination cluster"],
    ["Values", "Helm chart configuration"],
    ["Sync", "Automated or manual reconciliation"],
    ["Safety", "Review pruning, self-heal and rollback behavior"]
  ],
  "Automation Configurations": [
    ["Playbook", "Plays, hosts, tasks and modules"],
    ["Inventory", "Hosts, groups and connection variables"],
    ["Execution", "Syntax check, check mode and limited rollout"],
    ["Security", "Vault, SSH credentials and least privilege"]
  ]
};

function getTopicQuickReference(topic?: string, category?: string): QuickReferenceItem[] {
  if (topic && topicQuickReferences[topic]) return topicQuickReferences[topic];
  if (category && categoryQuickReferences[category]) return categoryQuickReferences[category];
  return [
    ["YAML", "Use consistent spaces and valid mappings or sequences"],
    ["Structure", "Keep nested values under their parent keys"],
    ["Safety", "Protect credentials and review changes before applying"],
    ["Validation", "Separate YAML syntax checks from tool-specific schema checks"]
  ];
}

export default function YamlConfigWorkbench({ feature, slug = [] }: Props) {
  const [activeModule, setActiveModule] = useState("Learn YAML");
  const [activeTab, setActiveTab] = useState("Learn");
  const [editorValue, setEditorValue] = useState(sampleYaml);
  const [notice, setNotice] = useState("");

  const validation = useMemo(() => {
    try {
      const document = parseDocument(editorValue, {
        uniqueKeys: true,
      });

      const errors = document.errors.map((error) => ({
        message: error.message,
        line: error.linePos?.[0]?.line ?? null,
        column: error.linePos?.[0]?.col ?? null,
      }));

      const warnings = document.warnings.map((warning) => ({
        message: warning.message,
        line: warning.linePos?.[0]?.line ?? null,
        column: warning.linePos?.[0]?.col ?? null,
      }));

      return {
        valid: errors.length === 0,
        errors,
        warnings,
        document,
      };
    } catch (error) {
      return {
        valid: false,
        errors: [{
          message: error instanceof Error ? error.message : "Unknown YAML parsing error",
          line: null,
          column: null,
        }],
        warnings: [],
        document: null,
      };
    }
  }, [editorValue]);

  const selectedCategory = feature.categories.find(
    (item) => slugify(item.name) === slug[0]
  );

  const selectedSubcategory = selectedCategory?.subcategories.find(
    (item) => slugify(item.name) === slug[1]
  );

  const selectedTopic = selectedSubcategory?.topics.find(
    (item) => slugify(item) === slug[2]
  );

  const topicCount = feature.categories.reduce(
    (total, category) =>
      total +
      category.subcategories.reduce(
        (subtotal, subcategory) => subtotal + subcategory.topics.length,
        0
      ),
    0
  );

  const base = `/${feature.id}`;

  const showEditor =
    activeModule === "YAML Editor" ||
    activeModule === "YAML Validator" ||
    (Boolean(selectedTopic) &&
      ["Practice", "Examples", "Validate", "Debug"].includes(activeTab));

  function formatYaml() {
    if (!validation.valid || !validation.document) {
      setNotice("Fix YAML syntax errors before formatting.");
      return;
    }

    try {
      setEditorValue(stringify(validation.document, { indent: 2 }));
      setNotice("YAML formatted successfully.");
    } catch {
      setNotice("Unable to format this YAML document.");
    }
  }

  async function copyYaml() {
    try {
      await navigator.clipboard.writeText(editorValue);
      setNotice("YAML copied to clipboard.");
    } catch {
      setNotice("Clipboard access was blocked by the browser.");
    }
  }

  function downloadYaml() {
    const blob = new Blob([editorValue], {
      type: "application/yaml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "configuration.yaml";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("YAML download started.");
  }

  function resetYaml() {
    setEditorValue(sampleYaml);
    setNotice("Editor restored to the sample Deployment manifest.");
  }

  return (
    <main className="min-h-screen bg-[#080d18] text-slate-100">
      <div className="border-b border-slate-800 bg-[#0b1220]">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="text-sm text-slate-400 transition hover:text-white">
            ← DevMavox Home
          </Link>
          <div className="text-sm font-semibold tracking-wide text-cyan-300">
            {"{ }"} Configuration Workbench
          </div>
          <span className="hidden rounded-full border border-cyan-900 bg-cyan-950/40 px-3 py-1 text-xs text-cyan-300 sm:inline-flex">
            YAML Editor · Validator
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 lg:px-8">
        <section className="mb-7 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-[#10233a] via-[#101b2d] to-[#111827] p-6 sm:p-9">
          <div className="max-w-4xl">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
              Learn · Write · Validate · Debug · Deploy
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              YAML Config Playground
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              A hands-on configuration learning workbench. Explore YAML concepts,
              build configuration files, understand validation and practice
              real-world DevOps workflows.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3">
                <strong className="block text-2xl text-white">{feature.categories.length}</strong>
                <span className="text-xs text-slate-400">Categories</span>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3">
                <strong className="block text-2xl text-white">{topicCount}</strong>
                <span className="text-xs text-slate-400">Learning topics</span>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3">
                <strong className="block text-2xl text-white">08</strong>
                <span className="text-xs text-slate-400">Learning modules</span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)_245px]">
          <aside className="rounded-2xl border border-slate-800 bg-[#0d1523] p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-white">Learning Curriculum</h2>
              <span className="text-xs text-slate-500">{feature.categories.length} categories</span>
            </div>

            <input
              aria-label="Search YAML topics"
              placeholder="Search topics..."
              className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-600"
              onChange={(event) => {
                const value = event.target.value.toLowerCase();
                document.querySelectorAll("[data-yaml-search]").forEach((node) => {
                  const element = node as HTMLElement;
                  element.style.display = element.dataset.yamlSearch?.includes(value) ? "" : "none";
                });
              }}
            />

            <nav className="space-y-2">
              {feature.categories.map((category, index) => {
                const categorySlug = slugify(category.name);
                const categoryActive = slug[0] === categorySlug;

                return (
                  <div
                    key={category.name}
                    data-yaml-search={(category.name + " " + category.subcategories.map((sub) => sub.name + " " + sub.topics.join(" ")).join(" ")).toLowerCase()}
                    className="rounded-lg border border-slate-800 bg-slate-900/50 p-3"
                  >
                    <Link
                      href={`${base}/${categorySlug}`}
                      className={`flex items-center gap-2 text-sm font-semibold ${
                        categoryActive ? "text-cyan-300" : "text-slate-200 hover:text-cyan-300"
                      }`}
                    >
                      <span className="text-xs text-slate-500">{String(index + 1).padStart(2, "0")}</span>
                      <span>{category.name}</span>
                    </Link>
                  </div>
                );
              })}
            </nav>
          </aside>

          <section className="min-w-0 space-y-5">
            {selectedTopic ? (
              <>
                <div className="rounded-2xl border border-slate-800 bg-[#0d1523] p-5 sm:p-7">
                  <Link
                    href={`${base}/${slug[0]}`}
                    className="mb-5 inline-flex items-center gap-2 rounded-lg border border-cyan-800 bg-cyan-950/40 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:border-cyan-500 hover:bg-cyan-950"
                  >
                    <span aria-hidden="true">←</span>
                    Back to Topics
                  </Link>
                  <div className="mb-3 text-xs text-cyan-300">
                    {selectedCategory?.name}
                  </div>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">{selectedTopic}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Dedicated topic workspace with learning, examples, practice,
                    validation, debugging and scenario tabs.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 rounded-xl border border-slate-800 bg-[#0d1523] p-3">
                  {learningTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                        activeTab === tab
                          ? "bg-cyan-500 text-slate-950"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {["Ansible Playbook", "Ansible Inventory"].includes(selectedTopic) ? (
                  <YamlAutomationConfigurationsWorkspace topic={selectedTopic} tab={activeTab} />
                ) : ["Argo CD Application", "Helm Values"].includes(selectedTopic) ? (
                  <YamlGitOpsConfigurationsWorkspace topic={selectedTopic} tab={activeTab} />
                ) : ["Docker Compose", "Dockerfile"].includes(selectedTopic) ? (
                  <YamlContainerConfigurationsWorkspace topic={selectedTopic} tab={activeTab} />
                ) : ["Jenkinsfile", "GitHub Actions Workflow", "GitLab CI Pipeline"].includes(selectedTopic) ? (
                  <YamlCICDConfigurationsWorkspace topic={selectedTopic} tab={activeTab} />
                ) : ["Liveness Probe", "Readiness Probe", "Startup Probe", "Resource Requests and Limits", "HPA"].includes(selectedTopic) ? (
                  <YamlKubernetesOperationsWorkspace topic={selectedTopic} tab={activeTab} />
                ) : ["PersistentVolume", "PersistentVolumeClaim", "StorageClass"].includes(selectedTopic) ? (
                  <YamlKubernetesStorageWorkspace topic={selectedTopic} tab={activeTab} />
                ) : ["ConfigMap", "Secret", "RBAC"].includes(selectedTopic) ? (
                  <YamlKubernetesConfigurationWorkspace topic={selectedTopic} tab={activeTab} />
                ) : ["Pod", "Deployment", "StatefulSet", "DaemonSet", "Job", "CronJob"].includes(selectedTopic) ? (
                  <YamlKubernetesWorkloadsWorkspace topic={selectedTopic} tab={activeTab} />
                ) : ["Service", "Ingress", "NetworkPolicy"].includes(selectedTopic) ? (
                  <YamlKubernetesNetworkingWorkspace topic={selectedTopic} tab={activeTab} />
                ) : (
                  <YamlFundamentalsWorkspace topic={selectedTopic} tab={activeTab} />
                )}
              </>
            ) : selectedCategory ? (
              <div className="rounded-2xl border border-slate-800 bg-[#0d1523] p-6">
                <div className="text-xs font-semibold text-cyan-300">
                  CURRICULUM TOPICS
                </div>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  {selectedCategory.name}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Select any topic to open its dedicated learning workspace.
                  Your existing lessons, examples, practice, validation,
                  debugging and scenario content are preserved.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedCategory.subcategories
                    .flatMap((subcategory) =>
                      subcategory.topics.map((topic) => ({
                        subcategory,
                        topic,
                      }))
                    )
                    .map(({ subcategory, topic }, index) => (
                      <Link
                        key={`${subcategory.name}-${topic}`}
                        href={`${base}/${slugify(selectedCategory.name)}/${slugify(subcategory.name)}/${slugify(topic)}`}
                        className="group rounded-xl border border-slate-700 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-cyan-600 hover:bg-slate-800"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <span className="rounded-lg bg-cyan-950/70 px-3 py-2 text-xs font-bold text-cyan-300">
                            TOPIC {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-lg text-cyan-400">↗</span>
                        </div>

                        <h3 className="font-bold text-white group-hover:text-cyan-200">
                          {topic}
                        </h3>

                        <p className="mt-3 text-xs text-slate-400">
                          Open dedicated learning workspace →
                        </p>
                      </Link>
                    ))}
                </div>
              </div>            ) : (
              <>
                <div className="rounded-2xl border border-slate-800 bg-[#0d1523] p-5">
                  <h2 className="text-xl font-bold text-white">Learning Modules</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Choose a module to open its workspace.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {modules.map((module) => (
                      <button
                        type="button"
                        key={module.name}
                        onClick={() => {
                          setActiveModule(module.name);
                          setNotice("");
                        }}
                        className={`rounded-xl border p-4 text-left transition ${
                          activeModule === module.name
                            ? "border-cyan-700 bg-cyan-950/30"
                            : "border-slate-800 bg-slate-900/60 hover:border-slate-600"
                        }`}
                      >
                        <div className="mb-3 text-xs font-bold text-cyan-400">{module.icon}</div>
                        <h3 className="text-sm font-bold text-white">{module.name}</h3>
                        <p className="mt-2 text-xs leading-5 text-slate-400">{module.detail}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {!showEditor && (
                  <YamlModuleWorkspaces
                    moduleName={activeModule}
                    onOpenEditor={() => setActiveModule("YAML Editor")}
                    onLoadExample={(yaml) => setEditorValue(yaml)}
                  />
                )}
              </>
            )}

            {showEditor && (
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1523]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 p-4">
                  <div>
                    <h3 className="font-bold text-white">
                      {activeModule === "YAML Validator"
                        ? "YAML Validation Workspace"
                        : "YAML Code Editor"}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {activeModule === "YAML Validator"
                        ? "Validate YAML syntax, inspect parser errors and review warnings in real time."
                        : "Write, edit, format, copy and download YAML configuration files."}
                    </p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold ${
                    validation.valid
                      ? "border-emerald-800 bg-emerald-950/40 text-emerald-300"
                      : "border-red-800 bg-red-950/40 text-red-300"
                  }`}>
                    {validation.valid ? "✓ Valid YAML Syntax" : "✕ Invalid YAML"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 border-b border-slate-800 p-3">
                  <ActionButton onClick={formatYaml} disabled={!validation.valid}>
                    Format YAML
                  </ActionButton>
                  <ActionButton onClick={copyYaml}>Copy</ActionButton>
                  <ActionButton onClick={downloadYaml}>Download .yaml</ActionButton>
                  <ActionButton onClick={resetYaml}>Reset</ActionButton>
                </div>

                <div className="min-h-[460px]">
                  <MonacoEditor
                    height="460px"
                    language="yaml"
                    theme="vs-dark"
                    value={editorValue}
                    onChange={(value) => {
                      setEditorValue(value ?? "");
                      setNotice("");
                    }}
                    options={{
                      automaticLayout: true,
                      minimap: { enabled: false },
                      fontSize: 13,
                      lineNumbers: "on",
                      tabSize: 2,
                      insertSpaces: true,
                      detectIndentation: false,
                      wordWrap: "on",
                      scrollBeyondLastLine: false,
                      formatOnPaste: true,
                      formatOnType: true,
                      renderWhitespace: "selection",
                      padding: { top: 14, bottom: 14 },
                      suggestOnTriggerCharacters: true,
                    }}
                  />
                </div>

                <div className="border-t border-slate-800 p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">Validation Results</h4>
                    <span className={`text-xs font-semibold ${
                      validation.valid ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {validation.errors.length} errors · {validation.warnings.length} warnings
                    </span>
                  </div>

                  {validation.valid ? (
                    <div className="rounded-lg border border-emerald-900 bg-emerald-950/20 p-3 text-sm text-emerald-300">
                      YAML syntax is valid. The document can be parsed successfully.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {validation.errors.map((error, index) => (
                        <div key={`${index}-${error.message}`} className="rounded-lg border border-red-900 bg-red-950/20 p-3">
                          <div className="text-xs font-bold text-red-300">
                            Error {index + 1}
                            {error.line !== null && (
                              <span className="ml-2 text-red-400">
                                Line {error.line}, Column {error.column}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 break-words text-xs leading-5 text-red-200">
                            {error.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {validation.warnings.map((warning, index) => (
                    <div key={`${index}-${warning.message}`} className="mt-2 rounded-lg border border-amber-900 bg-amber-950/20 p-3 text-xs text-amber-300">
                      Warning: {warning.message}
                    </div>
                  ))}

                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    This validator checks YAML syntax and parsing. It does not yet
                    verify Kubernetes API schemas, cluster policies or deployment readiness.
                  </p>
                </div>

                {notice && (
                  <div className="border-t border-slate-800 bg-slate-900/60 px-4 py-3 text-xs text-cyan-300">
                    {notice}
                  </div>
                )}
              </div>
            )}
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-[#0d1523] p-5">
              <h2 className="text-sm font-bold text-white">Quick Reference</h2>
              <div className="mt-4 space-y-3 text-xs">
                {getTopicQuickReference(selectedTopic, selectedCategory?.name).map(([label, description]) => (
                  <div key={label} className="border-b border-slate-800 pb-3 last:border-0">
                    <div className="font-semibold text-cyan-300">{label}</div>
                    <p className="mt-1 leading-5 text-slate-400">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0d1523] p-5">
              <h2 className="text-sm font-bold text-white">Learning Path</h2>
              <div className="mt-4 space-y-3">
                {["Understand", "Explore", "Write", "Validate", "Troubleshoot", "Apply"].map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs text-cyan-300">
                      {index + 1}
                    </span>
                    <span className="text-xs text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <footer className="mt-10 border-t border-slate-800 px-5 py-6 text-center text-xs text-slate-500">
        DevMavox · Practical DevOps Learning
      </footer>
    </main>
  );
}

// -----------------------------------------------------------------------------
// Dedicated YAML Config Playground module workspaces
// -----------------------------------------------------------------------------

interface YamlModuleWorkspacesProps {
  moduleName: string;
  onOpenEditor: () => void;
  onLoadExample: (yaml: string) => void;
}

function YamlModuleWorkspaces({
  moduleName,
  onOpenEditor,
  onLoadExample,
}: YamlModuleWorkspacesProps) {
  const [selectedResource, setSelectedResource] = useState("Deployment");
  const [selectedIncident, setSelectedIncident] = useState(0);
  const [selectedProductionScenario, setSelectedProductionScenario] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const examples: Record<string, string> = {
    Deployment: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web
          image: nginx:1.27
          ports:
            - containerPort: 80
`,

    Service: `apiVersion: v1
kind: Service
metadata:
  name: web-service
  namespace: production
spec:
  type: ClusterIP
  selector:
    app: web-app
  ports:
    - name: http
      port: 80
      targetPort: 80
`,

    ConfigMap: `apiVersion: v1
kind: ConfigMap
metadata:
  name: application-config
  namespace: production
data:
  APP_ENV: production
  LOG_LEVEL: info
  FEATURE_FLAG: "true"
`,

    Secret: `apiVersion: v1
kind: Secret
metadata:
  name: application-secret
  namespace: production
type: Opaque
stringData:
  DATABASE_USER: app_user
  DATABASE_PASSWORD: replace-with-secret-manager-value
`,
  };

  const incidents = [
    {
      title: "Pod remains in CrashLoopBackOff",
      symptom: "The container repeatedly starts and exits. Restart count keeps increasing.",
      causes: [
        "Incorrect container command or entrypoint",
        "Missing environment variables or configuration",
        "Application startup failure",
        "Liveness probe terminates the container"
      ],
      checks: [
        "Inspect kubectl describe pod output",
        "Review kubectl logs --previous",
        "Check ConfigMap and Secret references",
        "Review startup and liveness probe configuration"
      ],
      fix: "Correct the application configuration or startup command, validate the manifest, and roll out a controlled update."
    },
    {
      title: "Service cannot reach application Pods",
      symptom: "The Service exists, but requests fail or have no endpoints.",
      causes: [
        "Service selector does not match Pod labels",
        "Incorrect targetPort",
        "Pods are not Ready",
        "NetworkPolicy blocks traffic"
      ],
      checks: [
        "Run kubectl get endpoints",
        "Compare Service selectors with Pod labels",
        "Inspect container listening ports",
        "Review namespace NetworkPolicies"
      ],
      fix: "Align Service selectors and Pod labels, correct targetPort, and verify endpoint readiness."
    },
    {
      title: "Configuration changes are not reflected",
      symptom: "A workload continues using an older configuration.",
      causes: [
        "Incorrect ConfigMap reference",
        "Application does not reload mounted configuration",
        "Environment variables require a Pod restart",
        "GitOps reconciliation has not completed"
      ],
      checks: [
        "Inspect the ConfigMap resource",
        "Check Pod volume mounts and environment references",
        "Compare live and desired manifests",
        "Inspect rollout and GitOps synchronization status"
      ],
      fix: "Correct the configuration reference and use an appropriate rollout or application reload strategy."
    },
  ];

  const productionScenarios = [
    {
      title: "Production deployment with zero-downtime rollout",
      objective: "Deploy a new application version while maintaining service availability.",
      plan: [
        "Confirm the current replica count and Pod readiness",
        "Configure a rolling update strategy",
        "Use readiness probes and sensible resource requests",
        "Apply the change in a controlled deployment window",
        "Monitor rollout status and application health",
        "Prepare rollback to the last known-good revision"
      ],
      risk: "Insufficient replicas, incorrect readiness probes, or an unhealthy rollout can interrupt traffic."
    },
    {
      title: "Emergency Secret rotation",
      objective: "Rotate application credentials without exposing sensitive values.",
      plan: [
        "Identify every workload consuming the affected Secret",
        "Generate new credentials in an approved secret manager",
        "Update the Kubernetes Secret reference securely",
        "Coordinate application reload or controlled Pod restart",
        "Verify successful authentication",
        "Revoke the old credential after validation"
      ],
      risk: "Premature revocation or inconsistent application updates can cause authentication failures."
    },
    {
      title: "GitOps drift remediation",
      objective: "Restore agreement between the Git repository and live cluster state.",
      plan: [
        "Identify the desired state in the Git repository",
        "Compare the live object with the committed manifest",
        "Determine whether the drift is intentional or accidental",
        "Correct the source of truth",
        "Review the reconciliation plan",
        "Verify synchronization and application health"
      ],
      risk: "Blindly applying manifests can overwrite legitimate emergency changes or operational settings."
    },
  ];

  const quizQuestions = [
    {
      question: "Which YAML structure represents an ordered collection?",
      options: ["Mapping", "Sequence", "Scalar", "Comment"],
      answer: "Sequence",
      explanation: "A YAML sequence represents an ordered list. Each item is commonly introduced with a hyphen."
    },
    {
      question: "Which Kubernetes field identifies the container image?",
      options: ["metadata.name", "spec.selector", "spec.containers[].image", "apiVersion"],
      answer: "spec.containers[].image",
      explanation: "The image field inside a container specification identifies the container image to run."
    },
    {
      question: "What is the safest way to manage production credentials?",
      options: [
        "Commit passwords to Git",
        "Put credentials in comments",
        "Use an approved secret-management solution",
        "Use public ConfigMaps"
      ],
      answer: "Use an approved secret-management solution",
      explanation: "Credentials should be protected through approved secret-management controls and least-privilege access."
    },
    {
      question: "What does a Kubernetes readiness probe determine?",
      options: [
        "Whether a container image exists",
        "Whether a Pod is ready to receive traffic",
        "Whether a node is powered off",
        "Whether YAML indentation is correct"
      ],
      answer: "Whether a Pod is ready to receive traffic",
      explanation: "Readiness controls whether a Pod should receive Service traffic."
    },
    {
      question: "What is the GitOps source of truth?",
      options: [
        "A developer's terminal history",
        "The committed desired configuration in Git",
        "A manually edited Pod",
        "A container log file"
      ],
      answer: "The committed desired configuration in Git",
      explanation: "GitOps uses version-controlled desired state to drive automated reconciliation."
    },
  ];

  const score = quizQuestions.filter(
    (question, index) => answers[index] === question.answer
  ).length;

  const loadExample = (yaml: string) => {
    onLoadExample(yaml);
    onOpenEditor();
  };

  const panelClass =
    "rounded-2xl border border-slate-800 bg-[#0d1523] p-5 sm:p-7";

  const headingClass = "text-xl font-bold text-white";
  const mutedClass = "text-sm leading-7 text-slate-400";

  const actionClass =
    "rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-cyan-400";

  return (
    <section
      data-yaml-module-workspace={moduleName}
      className="space-y-5"
    >
      {moduleName === "Learn YAML" && (
        <>
          <div className={panelClass}>
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              MODULE 01 · LEARNING FOUNDATION
            </div>
            <h2 className={`${headingClass} mt-3`}>Learn YAML</h2>
            <p className={`${mutedClass} mt-3`}>
              Understand YAML from the fundamentals through real DevOps
              configuration patterns. Learn how YAML structure maps to
              application settings, Kubernetes resources and automation tools.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "1. Scalars and data types",
                description: "Understand strings, integers, booleans, null values and explicit quoting.",
                example: 'appName: "payment-service"\nreplicas: 3\nenabled: true\nmaintenanceWindow: null'
              },
              {
                title: "2. Mappings and nesting",
                description: "Represent related configuration properties using indentation and key-value mappings.",
                example: "application:\n  name: payment-service\n  environment:\n    name: production\n    region: ap-south-1"
              },
              {
                title: "3. Sequences and lists",
                description: "Represent containers, ports, environments and other ordered collections.",
                example: "containers:\n  - name: api\n    image: nginx:1.27\n  - name: worker\n    image: busybox:1.36"
              },
              {
                title: "4. Reusable configuration",
                description: "Explore anchors, aliases, document boundaries and safe reuse patterns.",
                example: "defaults: &defaults\n  restartPolicy: Always\n\nworker:\n  <<: *defaults\n  name: background-worker"
              }
            ].map((lesson) => (
              <article key={lesson.title} className={panelClass}>
                <h3 className="font-bold text-cyan-300">{lesson.title}</h3>
                <p className={`${mutedClass} mt-2`}>{lesson.description}</p>
                <pre className="mt-4 overflow-x-auto rounded-xl bg-[#070c14] p-4 text-xs leading-6 text-emerald-300">
                  {lesson.example}
                </pre>
                <button
                  type="button"
                  className={`${actionClass} mt-4`}
                  onClick={() => loadExample(lesson.example)}
                >
                  Practice this example
                </button>
              </article>
            ))}
          </div>

          <div className={panelClass}>
            <h3 className="font-bold text-white">YAML authoring rules</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
              <li>Use spaces for indentation; do not use tabs.</li>
              <li>Keep indentation consistent throughout a document.</li>
              <li>Quote values when their interpretation could be ambiguous.</li>
              <li>Use meaningful names and predictable configuration structures.</li>
              <li>Never commit production credentials or private keys to source control.</li>
              <li>Validate syntax and the target application's schema separately.</li>
            </ul>
          </div>
        </>
      )}

      {moduleName === "Kubernetes Manifest Lab" && (
        <>
          <div className={panelClass}>
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              MODULE 04 · KUBERNETES PRACTICE
            </div>
            <h2 className={`${headingClass} mt-3`}>Kubernetes Manifest Lab</h2>
            <p className={`${mutedClass} mt-3`}>
              Explore Kubernetes API resources, metadata, specifications,
              selectors, Pod templates, configuration references and workload
              relationships through practical manifest examples.
            </p>
          </div>

          <div className={panelClass}>
            <h3 className="font-bold text-white">Choose a resource to explore</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.keys(examples).map((resource) => (
                <button
                  key={resource}
                  type="button"
                  onClick={() => setSelectedResource(resource)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold ${
                    selectedResource === resource
                      ? "bg-cyan-500 text-slate-950"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {resource}
                </button>
              ))}
            </div>

            <pre className="mt-5 overflow-x-auto rounded-xl bg-[#070c14] p-4 text-xs leading-6 text-emerald-300">
              {examples[selectedResource]}
            </pre>

            <button
              type="button"
              className={`${actionClass} mt-4`}
              onClick={() => loadExample(examples[selectedResource])}
            >
              Open {selectedResource} in YAML Editor
            </button>
          </div>

          <div className={panelClass}>
            <h3 className="font-bold text-white">Manifest review checklist</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
              <li>Confirm apiVersion and kind match the intended resource.</li>
              <li>Use unique metadata names and the correct namespace.</li>
              <li>Match Deployment selectors with Pod template labels.</li>
              <li>Verify Service selectors and targetPort values.</li>
              <li>Review resource requests, limits and health probes.</li>
              <li>Protect sensitive values and inspect RBAC permissions.</li>
            </ul>
            <p className="mt-4 text-xs leading-6 text-amber-300">
              These examples are learning manifests. Kubernetes API-server
              validation and cluster admission checks require a separate
              schema-aware or cluster-connected validation step.
            </p>
          </div>
        </>
      )}

      {moduleName === "Troubleshooting Lab" && (
        <>
          <div className={panelClass}>
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              MODULE 05 · DIAGNOSIS AND RECOVERY
            </div>
            <h2 className={`${headingClass} mt-3`}>Troubleshooting Lab</h2>
            <p className={`${mutedClass} mt-3`}>
              Practice evidence-driven troubleshooting. Start with symptoms,
              collect evidence, identify probable root causes, verify the
              diagnosis and apply a controlled recovery.
            </p>
          </div>

          <div className={panelClass}>
            <h3 className="font-bold text-white">Select an incident</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {incidents.map((incident, index) => (
                <button
                  key={incident.title}
                  type="button"
                  onClick={() => setSelectedIncident(index)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                    selectedIncident === index
                      ? "bg-cyan-500 text-slate-950"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  Incident {index + 1}
                </button>
              ))}
            </div>

            <h4 className="mt-5 font-bold text-cyan-300">
              {incidents[selectedIncident].title}
            </h4>
            <p className={`${mutedClass} mt-2`}>
              {incidents[selectedIncident].symptom}
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-800 p-4">
                <h5 className="font-semibold text-white">Possible root causes</h5>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-xs leading-6 text-slate-300">
                  {incidents[selectedIncident].causes.map((cause) => (
                    <li key={cause}>{cause}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-800 p-4">
                <h5 className="font-semibold text-white">Evidence collection</h5>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-xs leading-6 text-slate-300">
                  {incidents[selectedIncident].checks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-emerald-900 bg-emerald-950/20 p-4">
              <h5 className="font-semibold text-emerald-300">Recovery direction</h5>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {incidents[selectedIncident].fix}
              </p>
            </div>
          </div>

          <div className={panelClass}>
            <h3 className="font-bold text-white">Safe troubleshooting sequence</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-300">
              <li>Establish incident scope, impact and severity.</li>
              <li>Collect logs, events, resource descriptions and recent changes.</li>
              <li>Form a root-cause hypothesis based on evidence.</li>
              <li>Test the hypothesis without introducing unnecessary changes.</li>
              <li>Apply the smallest safe corrective action.</li>
              <li>Verify recovery and document preventive measures.</li>
            </ol>
          </div>
        </>
      )}

      {moduleName === "CI/CD and GitOps Lab" && (
        <>
          <div className={panelClass}>
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              MODULE 06 · DELIVERY AUTOMATION
            </div>
            <h2 className={`${headingClass} mt-3`}>CI/CD and GitOps Lab</h2>
            <p className={`${mutedClass} mt-3`}>
              Learn how YAML defines automated build, test, deployment and
              reconciliation workflows. Understand the difference between
              pipeline execution and GitOps desired-state management.
            </p>
          </div>

          <div className={panelClass}>
            <h3 className="font-bold text-white">Example: GitHub Actions pipeline</h3>
            <p className={`${mutedClass} mt-2`}>
              This example checks out source code, configures a runtime,
              validates a YAML file and builds an application artifact.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-[#070c14] p-4 text-xs leading-6 text-emerald-300">
{`name: application-ci

on:
  push:
    branches: [main]
  pull_request:

jobs:
  validate-and-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout source
        uses: actions/checkout@v4

      - name: Validate configuration
        run: |
          python -c "import yaml; yaml.safe_load(open('config.yaml'))"

      - name: Build application
        run: echo "Run application build here"
`}
            </pre>
            <button
              type="button"
              className={`${actionClass} mt-4`}
              onClick={() => loadExample(`name: application-ci

on:
  push:
    branches: [main]
  pull_request:

jobs:
  validate-and-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout source
        uses: actions/checkout@v4
      - name: Validate configuration
        run: echo "Validate YAML"
      - name: Build application
        run: echo "Build application"
`)}
            >
              Open pipeline example in editor
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className={panelClass}>
              <h3 className="font-bold text-cyan-300">CI/CD workflow</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-300">
                <li>Source change and pull request</li>
                <li>Lint and configuration validation</li>
                <li>Automated tests and security checks</li>
                <li>Build and publish an artifact</li>
                <li>Deployment approval and rollout</li>
              </ol>
            </article>
            <article className={panelClass}>
              <h3 className="font-bold text-cyan-300">GitOps workflow</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-300">
                <li>Commit desired deployment state to Git</li>
                <li>Review and approve the change</li>
                <li>GitOps controller detects repository changes</li>
                <li>Controller reconciles cluster resources</li>
                <li>Observe health, drift and synchronization status</li>
              </ol>
            </article>
          </div>
        </>
      )}

      {moduleName === "Production Scenarios" && (
        <>
          <div className={panelClass}>
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              MODULE 07 · REAL-WORLD OPERATIONS
            </div>
            <h2 className={`${headingClass} mt-3`}>Production Scenarios</h2>
            <p className={`${mutedClass} mt-3`}>
              Apply YAML and DevOps knowledge to realistic operational
              situations. Evaluate risk, plan controlled changes and verify
              outcomes before considering an incident resolved.
            </p>
          </div>

          <div className={panelClass}>
            <h3 className="font-bold text-white">Choose a production exercise</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {productionScenarios.map((scenario, index) => (
                <button
                  key={scenario.title}
                  type="button"
                  onClick={() => setSelectedProductionScenario(index)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                    selectedProductionScenario === index
                      ? "bg-cyan-500 text-slate-950"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  Scenario {index + 1}
                </button>
              ))}
            </div>

            <h4 className="mt-5 text-lg font-bold text-cyan-300">
              {productionScenarios[selectedProductionScenario].title}
            </h4>
            <p className={`${mutedClass} mt-2`}>
              {productionScenarios[selectedProductionScenario].objective}
            </p>

            <h5 className="mt-5 font-semibold text-white">Execution plan</h5>
            <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-300">
              {productionScenarios[selectedProductionScenario].plan.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <div className="mt-5 rounded-xl border border-amber-900 bg-amber-950/20 p-4">
              <h5 className="font-semibold text-amber-300">Operational risk</h5>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {productionScenarios[selectedProductionScenario].risk}
              </p>
            </div>
          </div>
        </>
      )}

      {moduleName === "Quiz and Assessment" && (
        <>
          <div className={panelClass}>
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              MODULE 08 · KNOWLEDGE ASSESSMENT
            </div>
            <h2 className={`${headingClass} mt-3`}>Quiz and Assessment</h2>
            <p className={`${mutedClass} mt-3`}>
              Test your understanding of YAML fundamentals, Kubernetes
              configuration, security, operational readiness and GitOps.
              Select one answer for every question and submit your assessment.
            </p>
            <div className="mt-4 text-xs text-slate-400">
              {Object.keys(answers).length} of {quizQuestions.length} questions answered
            </div>
          </div>

          {quizQuestions.map((question, index) => (
            <article key={question.question} className={panelClass}>
              <h3 className="font-semibold text-white">
                Question {index + 1}: {question.question}
              </h3>

              <div className="mt-4 grid gap-2">
                {question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    disabled={quizSubmitted}
                    onClick={() =>
                      setAnswers((previous) => ({
                        ...previous,
                        [index]: option,
                      }))
                    }
                    className={`rounded-lg border p-3 text-left text-sm transition ${
                      answers[index] === option
                        ? "border-cyan-500 bg-cyan-950/40 text-cyan-200"
                        : "border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {quizSubmitted && (
                <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/60 p-3">
                  <p className={`text-sm font-semibold ${
                    answers[index] === question.answer
                      ? "text-emerald-300"
                      : "text-red-300"
                  }`}>
                    {answers[index] === question.answer
                      ? "Correct answer"
                      : `Correct answer: ${question.answer}`}
                  </p>
                  <p className="mt-2 text-xs leading-6 text-slate-300">
                    {question.explanation}
                  </p>
                </div>
              )}
            </article>
          ))}

          <div className={panelClass}>
            {!quizSubmitted ? (
              <button
                type="button"
                className={actionClass}
                disabled={Object.keys(answers).length !== quizQuestions.length}
                onClick={() => setQuizSubmitted(true)}
              >
                Submit assessment
              </button>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white">
                  Assessment result: {score}/{quizQuestions.length}
                </h3>
                <p className={`${mutedClass} mt-2`}>
                  {score === quizQuestions.length
                    ? "Excellent work. All answers are correct."
                    : "Review the explanations above and practice the topics you missed."}
                </p>
                <button
                  type="button"
                  className={`${actionClass} mt-4`}
                  onClick={() => {
                    setAnswers({});
                    setQuizSubmitted(false);
                  }}
                >
                  Retake assessment
                </button>
              </>
            )}
          </div>
        </>
      )}

    </section>
  );
}

