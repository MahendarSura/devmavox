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
                  <div className="rounded-2xl border border-slate-800 bg-[#0d1523] p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-bold text-white">YAML Example Workspace</h2>
                        <p className="mt-1 text-xs text-slate-400">Illustrative Kubernetes Deployment manifest</p>
                      </div>
                      <span className="rounded-full border border-emerald-900 bg-emerald-950/40 px-3 py-1 text-xs text-emerald-300">
                        Example YAML
                      </span>
                    </div>
                    <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-[#070c14] p-4 text-xs leading-6 text-emerald-300">
                      <code>{sampleYaml}</code>
                    </pre>
                    <button
                      type="button"
                      onClick={() => setActiveModule("YAML Editor")}
                      className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400"
                    >
                      Open in YAML Editor →
                    </button>
                  </div>
                )}
              </>
            )}

            {showEditor && (
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1523]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 p-4">
                  <div>
                    <h3 className="font-bold text-white">YAML Code Editor</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Monaco Editor · YAML syntax highlighting · Live parsing
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









