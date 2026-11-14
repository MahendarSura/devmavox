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
import YamlModuleLearningGuide from "./YamlModuleLearningGuide";
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

export default function YamlConfigWorkbench({ feature, slug = [] }: Props) {
  const [activeModule, setActiveModule] = useState("Learn YAML");
  const [moduleWorkspaceOpen, setModuleWorkspaceOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Learn");
  const [editorValue, setEditorValue] = useState(sampleYaml);
  const [notice, setNotice] = useState("");
  const [rightPanelSelection, setRightPanelSelection] = useState<string | null>(null);

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

  const rightPanelContent: Record<string, {
    title: string;
    intro: string;
    points: string[];
    example: string;
    takeaway: string;
  }> = {
    "quick:Syntax": {
      title: "YAML Syntax Fundamentals",
      intro: "YAML is a human-readable data serialization format. Its structure uses indentation, mappings, sequences and scalar values.",
      points: [
        "Use spaces for indentation. Tabs must not be used to structure YAML.",
        "Mappings store key-value pairs using a colon followed by a space.",
        "Sequences represent ordered lists. Each item starts with a hyphen and a space.",
        "Nested properties must be indented consistently beneath their parent.",
        "Comments begin with # and are ignored by the YAML parser.",
        "Quoted strings help preserve values that could otherwise be interpreted as another data type."
      ],
      example: `# Application configuration
app:
  name: devmavox
  environment: production
  ports:
    - 3000
    - 8080
  logging:
    enabled: true
    level: info`,
      takeaway: "Maintain consistent indentation and validate YAML after every meaningful edit."
    },
    "quick:Data types": {
      title: "YAML Data Types",
      intro: "YAML supports scalar values and collections. Correct data types matter because applications interpret configuration values according to their expected schemas.",
      points: [
        "Strings represent text such as application names and image references.",
        "Integers represent whole numbers such as replica counts.",
        "Floating-point numbers represent decimal values.",
        "Booleans represent true or false.",
        "Null represents an intentionally empty value.",
        "Sequences represent lists, while mappings represent related key-value properties.",
        "Quote values when you need to preserve their exact textual representation."
      ],
      example: `app:
  name: "devmavox"
  replicas: 3
  cpuLimit: 1.5
  enabled: true
  maintenanceMode: false
  description: null
  version: "1.0"
  environments:
    - development
    - staging
    - production`,
      takeaway: "Choose the correct data type and verify that it matches the target application's expected configuration."
    },
    "quick:Kubernetes": {
      title: "Kubernetes Manifest Structure",
      intro: "A Kubernetes manifest describes the desired state of a resource. Its main fields identify the API version, resource kind, metadata and resource specification.",
      points: [
        "apiVersion identifies the Kubernetes API group and version.",
        "kind specifies the resource type, such as Pod, Deployment or Service.",
        "metadata contains the resource name, namespace, labels and annotations.",
        "spec defines the desired configuration of the resource.",
        "The fields inside spec depend on the selected resource kind.",
        "A Deployment manages Pods through a selector and Pod template.",
        "Kubernetes controllers work to maintain the desired state."
      ],
      example: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: nginx
          image: nginx:1.27`,
      takeaway: "Use the correct API version and resource-specific fields. Keep Deployment selectors consistent with Pod template labels."
    },
    "quick:Validation": {
      title: "YAML and Kubernetes Validation",
      intro: "YAML syntax validation and Kubernetes resource validation are separate activities. A file can parse successfully while still containing invalid Kubernetes fields or values.",
      points: [
        "Syntax validation checks indentation, mappings, sequences and YAML parsing.",
        "A YAML linter can identify formatting and common structural problems.",
        "Kubernetes schema validation checks fields against the resource definition.",
        "kubectl apply --dry-run=server asks the API server to validate without persisting the resource.",
        "kubectl explain helps inspect supported resource fields.",
        "kubectl diff compares proposed configuration with live configuration.",
        "Runtime readiness and application behavior require additional checks after deployment."
      ],
      example: `# Check YAML formatting
yamllint deployment.yaml

# Inspect supported resource fields
kubectl explain deployment.spec

# Validate with the API server
kubectl apply --dry-run=server -f deployment.yaml

# Review proposed changes
kubectl diff -f deployment.yaml`,
      takeaway: "A successful YAML parse does not guarantee Kubernetes API acceptance or a healthy application."
    },
    "path:Understand": {
      title: "Step 1 - Understand YAML",
      intro: "Begin by learning how YAML represents structured data. Build a strong foundation before creating complex Kubernetes and DevOps configurations.",
      points: [
        "Understand key-value pairs and mappings.",
        "Learn parent-child relationships through indentation.",
        "Recognize sequences and nested lists.",
        "Identify strings, numbers, booleans and null values.",
        "Understand comments and quoted strings.",
        "Practice reading a small YAML file and explaining each property."
      ],
      example: `application:
  name: payments
  replicas: 2
  enabled: true
  environments:
    - development
    - production`,
      takeaway: "You should be able to read a YAML document and explain its structure without guessing."
    },
    "path:Explore": {
      title: "Step 2 - Explore Existing Configurations",
      intro: "Study real configuration files to understand how DevOps tools and applications organize their settings.",
      points: [
        "Read Kubernetes Pod and Deployment manifests.",
        "Compare ConfigMaps and Secrets and understand their purposes.",
        "Explore container images, ports and environment variables.",
        "Identify labels, selectors and metadata.",
        "Inspect nested properties and understand their parent relationships.",
        "Compare development and production configuration files."
      ],
      example: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-settings
data:
  APP_MODE: production
  LOG_LEVEL: info
  FEATURE_ENABLED: "true"`,
      takeaway: "Recognize common configuration patterns before writing your own manifests."
    },
    "path:Write": {
      title: "Step 3 - Write YAML Configurations",
      intro: "Create your own YAML files using the concepts you have learned. Start with small configurations and gradually build complete application manifests.",
      points: [
        "Create a YAML file with meaningful names and clear structure.",
        "Organize parent and nested properties with correct indentation.",
        "Add sequences for containers, ports and environment variables.",
        "Use labels and selectors consistently in Kubernetes resources.",
        "Keep configuration readable and avoid unnecessary duplication.",
        "Review the generated YAML before validation."
      ],
      example: `apiVersion: v1
kind: Pod
metadata:
  name: learning-pod
  labels:
    app: learning
spec:
  containers:
    - name: nginx
      image: nginx:1.27
      ports:
        - containerPort: 80`,
      takeaway: "Write configurations incrementally and inspect the resulting structure."
    },
    "path:Validate": {
      title: "Step 4 - Validate Configurations",
      intro: "Validate your YAML before using it. Check syntax first, then verify that the configuration meets the requirements of its target platform.",
      points: [
        "Run a YAML linter or parser to detect syntax problems.",
        "Check indentation, missing colons and malformed sequences.",
        "Verify Kubernetes apiVersion and kind.",
        "Inspect resource fields with kubectl explain.",
        "Use server-side dry-run to check API server acceptance.",
        "Review warnings and resolve configuration problems before deployment."
      ],
      example: `# Check YAML formatting
yamllint deployment.yaml

# Validate against the cluster API
kubectl apply --dry-run=server -f deployment.yaml

# Review configuration differences
kubectl diff -f deployment.yaml`,
      takeaway: "Passing syntax checks alone is not enough. Validate against the target platform too."
    },
    "path:Troubleshoot": {
      title: "Step 5 - Troubleshoot YAML Errors",
      intro: "Troubleshooting means identifying the actual cause of a configuration failure, collecting evidence and applying a safe correction.",
      points: [
        "Read parser errors and inspect the reported line and column.",
        "Check indentation and missing spaces after colons.",
        "Look for duplicate keys and incorrectly structured lists.",
        "Verify resource names, selectors, image references and field names.",
        "Use kubectl describe to investigate resource conditions and events.",
        "Use kubectl logs to inspect application container failures.",
        "Apply a minimal correction and validate the configuration again."
      ],
      example: `# Inspect Pods
kubectl get pods

# Investigate a failing Pod
kubectl describe pod <pod-name>

# Review recent events
kubectl get events --sort-by=.metadata.creationTimestamp

# Inspect container logs
kubectl logs <pod-name>

# Validate corrected manifest
kubectl apply --dry-run=server -f deployment.yaml`,
      takeaway: "Use error messages and cluster evidence to find the root cause instead of changing unrelated configuration."
    },
    "path:Apply": {
      title: "Step 6 - Apply Real-world Configurations",
      intro: "Use YAML in practical DevOps workflows. Combine application configuration, Kubernetes resources and automated delivery processes.",
      points: [
        "Create Deployments, Services, ConfigMaps and other Kubernetes resources.",
        "Organize environment-specific settings for development, staging and production.",
        "Use Helm values files to customize application releases.",
        "Understand how CI/CD pipelines consume YAML configuration.",
        "Use GitOps workflows to review and synchronize configuration changes.",
        "Monitor rollout status and verify application behavior.",
        "Track configuration changes through version control."
      ],
      example: `# Validate before deployment
kubectl apply --dry-run=server -f deployment.yaml

# Apply the configuration
kubectl apply -f deployment.yaml

# Monitor rollout
kubectl rollout status deployment/web-app

# Verify deployed resources
kubectl get deployments,pods,services`,
      takeaway: "A complete configuration workflow includes validation, controlled deployment and post-deployment verification."
    }
  };

  const selectedRightPanelContent = rightPanelSelection
    ? rightPanelContent[rightPanelSelection]
    : null;
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
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
              Learn · Write · Validate · Debug · Deploy
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              YAML Config Playground
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-5 text-slate-300 sm:text-base">
              A hands-on configuration learning workbench. Explore YAML concepts,
              build configuration files, understand validation and practice
              real-world DevOps workflows.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <div className="rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-2">
                <strong className="block text-2xl text-white">{feature.categories.length}</strong>
                <span className="text-xs text-slate-400">Categories</span>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-2">
                <strong className="block text-2xl text-white">{topicCount}</strong>
                <span className="text-xs text-slate-400">Learning topics</span>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-2">
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
                        scroll={false}
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
            {rightPanelSelection && selectedRightPanelContent ? (
              <div className="rounded-2xl border border-slate-800 bg-[#0d1523] p-5 sm:p-7">
                <button
                  type="button"
                  onClick={() => setRightPanelSelection(null)}
                  className="mb-6 inline-flex items-center gap-2 rounded-lg border border-cyan-800 bg-cyan-950/40 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:border-cyan-500 hover:bg-cyan-950"
                >
                  <span aria-hidden="true">←</span>
                  Back to {rightPanelSelection.startsWith("quick:") ? "Quick Reference" : "Learning Path"}
                </button>

                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  {rightPanelSelection.startsWith("quick:") ? "QUICK REFERENCE" : "LEARNING PATH"}
                </div>

                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  {selectedRightPanelContent.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {selectedRightPanelContent.intro}
                </p>

                <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                  <h3 className="text-base font-semibold text-white">
                    Key Concepts and Practical Details
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {selectedRightPanelContent.points.map((point, index) => (
                      <li key={index} className="flex gap-3 text-sm leading-6 text-slate-300">
                        <span className="mt-0.5 shrink-0 text-cyan-400">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 overflow-hidden rounded-xl border border-slate-700">
                  <div className="border-b border-slate-700 bg-slate-900 px-4 py-3">
                    <h3 className="text-sm font-semibold text-cyan-300">
                      Practical YAML / Command Example
                    </h3>
                  </div>
                  <pre className="overflow-x-auto bg-[#080d18] p-5 text-sm leading-6 text-emerald-300">
                    <code>{selectedRightPanelContent.example}</code>
                  </pre>
                </div>

                <div className="mt-6 rounded-xl border border-cyan-900 bg-cyan-950/20 p-4">
                  <h3 className="text-sm font-semibold text-cyan-300">
                    What You Should Remember
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {selectedRightPanelContent.takeaway}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setRightPanelSelection(null)}
                  className="mt-6 rounded-lg border border-cyan-800 bg-cyan-950/40 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:border-cyan-500"
                >
                  ← Back to {rightPanelSelection.startsWith("quick:") ? "Quick Reference" : "Learning Path"}
                </button>
              </div>
            ) : selectedTopic ? (
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
                        scroll={false}
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
                {!moduleWorkspaceOpen && (
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
                          setModuleWorkspaceOpen(true);
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

                                )}

{moduleWorkspaceOpen && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setModuleWorkspaceOpen(false);
                    setActiveModule("Learn YAML");
                    setNotice("");
                  }}
                  className="mb-4 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:border-cyan-600 hover:bg-slate-800"
                >
                  ← Back to Learning Modules
                </button><YamlModuleLearningGuide
                  moduleName={activeModule}
                  onLoadExample={(yaml) => {
                    setEditorValue(yaml);
                    setActiveModule("YAML Editor");
                    setNotice("Learning example loaded into the YAML Editor.");
                  }}
                />
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
                {[
                  ["Syntax", "Indentation, mappings and sequences"],
                  ["Data types", "Strings, numbers, booleans and null"],
                  ["Kubernetes", "apiVersion, kind, metadata and spec"],
                  ["Validation", "Syntax checks and schema checks are separate"],
                ].map(([label, description]) => (
                  <button
                      type="button"
                      key={label}
                      onClick={() => setRightPanelSelection(`quick:${label}`)}
                      className="w-full border-b border-slate-800 pb-3 text-left last:border-0 rounded-md transition hover:bg-slate-800/50 hover:px-2"
                    >
                      <div className="font-semibold text-cyan-300">{label}</div>
                      <p className="mt-1 leading-5 text-slate-400">{description}</p>
                    </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0d1523] p-5">
              <h2 className="text-sm font-bold text-white">Learning Path</h2>
              <div className="mt-4 space-y-3">
                {["Understand", "Explore", "Write", "Validate", "Troubleshoot", "Apply"].map((step, index) => (
                  <button
                    type="button"
                    key={step}
                    onClick={() => setRightPanelSelection(`path:${step}`)}
                    className="flex w-full items-center gap-3 rounded-md text-left transition hover:bg-slate-800/50 hover:px-2"
                    title={`Open ${step} learning section`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs text-cyan-300">
                      {index + 1}
                    </span>
                    <span className="text-xs text-slate-300">{step}</span>
                  </button>
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












