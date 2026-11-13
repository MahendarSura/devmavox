"use client";

import { useMemo, useState } from "react";
import { parseDocument } from "yaml";

type Section = { title: string; detail: string };
type Exercise = { title: string; task: string; hint: string; solution: string };
type Question = { question: string; answer: string; options: string[]; correct: number };
type Lesson = {
  summary: string;
  objective: string[];
  sections: Section[];
  yaml: string;
  companion: string;
  exercises: Exercise[];
  mistakes: { wrong: string; right: string; reason: string }[];
  incident: { title: string; symptoms: string[]; diagnosis: string[]; recovery: string[] };
  questions: Question[];
  checks: string[];
};

const lessons: Record<string, Lesson> = {
  ConfigMap: {
    summary: "ConfigMaps separate non-confidential application configuration from container images. They let the same image run in development, staging and production with different settings.",
    objective: [
      "Explain why configuration should be external to an application image.",
      "Create ConfigMaps using literal values and YAML data entries.",
      "Consume keys as environment variables and mounted files.",
      "Understand update behavior, rollout requirements and namespace scope."
    ],
    sections: [
      { title: "Configuration lifecycle and separation of concerns", detail: "A container image should contain the application and its runtime dependencies, not environment-specific endpoints, feature flags or log levels. A ConfigMap stores non-sensitive key-value configuration in the Kubernetes API. A Deployment can reference it without rebuilding the image. ConfigMaps are namespaced resources: a Pod normally consumes a ConfigMap from its own namespace. They are intended for small configuration data, not large binary files or confidential credentials." },
      { title: "Data, binaryData and key design", detail: "The data field stores UTF-8 strings. Keys become environment variable names or filenames when consumed. Choose stable, descriptive keys and avoid accidental collisions with application environment variables. binaryData is intended for base64-encoded binary values. A ConfigMap cannot be used as a substitute for a configuration database or an unlimited file store. Keep configuration understandable, version-controlled and reviewed." },
      { title: "Environment variables versus mounted volumes", detail: "A Pod can use env or envFrom to expose individual or all ConfigMap keys as environment variables. It can also mount a ConfigMap volume so keys appear as files. Environment variables are fixed when a container starts; changing the ConfigMap does not mutate an already-running process environment. Mounted ConfigMap volumes are eventually updated by Kubernetes, but applications must re-read files to observe changes. A subPath mount does not receive automatic updates." },
      { title: "Updates, immutable configuration and rollout strategy", detail: "Changing a ConfigMap does not automatically guarantee that an application reloads its configuration. A common release strategy is to version configuration or change a Pod-template annotation when configuration changes, causing a controlled Deployment rollout. immutable: true can prevent accidental data changes and is useful for versioned configuration objects. Plan cleanup and rollback before adopting immutable, versioned ConfigMaps." },
      { title: "Namespace, permissions and operational boundaries", detail: "A ConfigMap reference must resolve in the Pod's namespace. A missing name, misspelled key or missing optional reference can prevent container startup or leave an expected value absent. RBAC controls who can read or modify ConfigMaps. Since ConfigMaps are not designed for secrets, never put passwords, private keys, tokens or confidential connection strings in them." }
    ],
    yaml: `apiVersion: v1
kind: ConfigMap
metadata:
  name: web-settings
  namespace: demo
data:
  APP_ENV: "staging"
  LOG_LEVEL: "info"
  API_BASE_URL: "https://api.staging.example.test"
  application.yaml: |
    server:
      port: 8080
    features:
      checkout: true
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: demo
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
        - name: web
          image: nginx:1.27
          envFrom:
            - configMapRef:
                name: web-settings
          volumeMounts:
            - name: app-config
              mountPath: /etc/web-config
              readOnly: true
      volumes:
        - name: app-config
          configMap:
            name: web-settings`,
    companion: "The ConfigMap and Deployment are both in namespace demo. envFrom exposes the data keys as environment variables, while the volume makes application.yaml available under /etc/web-config. The example uses non-sensitive dummy configuration only.",
    exercises: [
      { title: "Add a feature flag", task: "Add a data key named FEATURE_SEARCH with the string value enabled. Keep the existing configuration unchanged.", hint: "Add a sibling key under data; YAML indentation must match APP_ENV.", solution: `data:\n  APP_ENV: "staging"\n  FEATURE_SEARCH: "enabled"` },
      { title: "Consume one key explicitly", task: "Change the Deployment to expose only LOG_LEVEL as an environment variable named APP_LOG_LEVEL.", hint: "Use env, name, valueFrom and configMapKeyRef.", solution: `env:\n  - name: APP_LOG_LEVEL\n    valueFrom:\n      configMapKeyRef:\n        name: web-settings\n        key: LOG_LEVEL` }
    ],
    mistakes: [
      { wrong: `envFrom:\n  - secretRef:\n      name: web-settings`, right: `envFrom:\n  - configMapRef:\n      name: web-settings`, reason: "The resource is a ConfigMap, not a Secret. The reference type must match the object kind." },
      { wrong: `volumes:\n  - name: config\n    configMap:\n      name: web-settings\n      items:\n        - key: missing-key\n          path: settings.yaml`, right: `volumes:\n  - name: config\n    configMap:\n      name: web-settings\n      items:\n        - key: application.yaml\n          path: settings.yaml`, reason: "The referenced key must exist in the ConfigMap data or binaryData." }
    ],
    incident: {
      title: "Application keeps using an old API endpoint after a ConfigMap update",
      symptoms: ["The ConfigMap shows the new endpoint.", "Existing Pods continue sending requests to the previous endpoint.", "No image change was made during the configuration update."],
      diagnosis: ["Check the ConfigMap in the Pod namespace.", "Inspect the Deployment's env and volume references.", "Determine whether the application reads environment variables only at process startup.", "Compare the Pod template and rollout history."],
      recovery: ["Update the Pod template through the approved configuration-release mechanism.", "Trigger a controlled rollout if environment variables changed.", "Verify new Pods receive the intended value without printing sensitive configuration.", "Keep the previous known-good configuration available for rollback."]
    },
    questions: [
      { question: "Does changing a ConfigMap automatically change an existing container's environment variables?", options: ["Yes, immediately", "No, environment variables are set when the container starts", "Only when a Service is restarted"], correct: 1, answer: "Environment variables are established when the container starts. A Pod restart or rollout is generally needed for the process to receive changed values." },
      { question: "Can a ConfigMap be referenced by a Pod in a different namespace?", options: ["Yes, by using a fully qualified name", "No, normal ConfigMap references are namespace-scoped", "Only for ClusterIP Services"], correct: 1, answer: "ConfigMaps are namespaced. The Pod normally references a ConfigMap in the same namespace." },
      { question: "Which data belongs in a ConfigMap?", options: ["Private SSH keys", "Database passwords", "Non-confidential application settings"], correct: 2, answer: "ConfigMaps are for non-confidential configuration. Sensitive values belong in appropriately protected Secret management." }
    ],
    checks: ["apiVersion must be v1.", "kind must be ConfigMap.", "metadata.name must be present.", "data must be a mapping of string keys to string values.", "A referenced ConfigMap must exist in the Pod namespace.", "Every explicitly referenced key must exist.", "Do not store credentials or private keys in ConfigMaps."]
  },

  Secret: {
    summary: "Kubernetes Secrets represent sensitive values such as tokens, passwords and certificates. Their safe use depends on encryption at rest, restrictive RBAC, careful delivery and avoiding accidental exposure.",
    objective: [
      "Distinguish Secret data encoding from encryption.",
      "Understand Opaque, kubernetes.io/tls and dockerconfigjson Secret types.",
      "Consume Secret values through environment variables and volumes.",
      "Apply least privilege and prevent secrets from leaking into logs or source control."
    ],
    sections: [
      { title: "Secret objects and threat model", detail: "A Secret is a namespaced Kubernetes API object intended for sensitive information. It is not automatically safe merely because it is called a Secret. Users with permission to read Secrets can retrieve their values, and workloads that mount a Secret can access it. Protect the API, cluster datastore, backups, node access, CI/CD credentials and workload identities. Decide who can create, read, update and mount each Secret." },
      { title: "Base64 is encoding, not encryption", detail: "The data field represents values using base64 encoding in YAML and API representations. Base64 is reversible and provides no confidentiality. Anyone who can decode the value can read it. stringData is a write-only convenience field accepted by the API for plain string input; the API stores the resulting data representation. Never commit real passwords or tokens to a repository just because they are base64 encoded." },
      { title: "Secret types and validation expectations", detail: "Opaque is the general-purpose type. kubernetes.io/tls conventionally contains tls.crt and tls.key. kubernetes.io/dockerconfigjson conventionally contains .dockerconfigjson. These types communicate expected structure but do not replace secure handling. Use the correct key names and ensure certificates, private keys and registry credentials are issued and rotated through approved processes." },
      { title: "Injecting values into workloads", detail: "A container can receive a single Secret key through secretKeyRef, several keys through secretRef, or files through a Secret volume. Prefer exposing only the specific key a process needs. Avoid putting secret values directly into command arguments, image layers, debug output or application logs. A mounted Secret is available to the container filesystem, so mount it only into containers that need it and use readOnly mounts where possible." },
      { title: "Encryption, RBAC, rotation and external secret systems", detail: "Configure encryption at rest for Secrets in the cluster datastore and tightly scope RBAC permissions. Avoid broad list or watch permissions because they can expose many objects. Rotate credentials with an overlap plan, update consumers, verify the new credential works, then revoke the old one. External secret managers and CSI integrations can reduce long-lived copies in manifests, but still require workload identity, access policies and audit controls." }
    ],
    yaml: `apiVersion: v1
kind: Secret
metadata:
  name: app-credentials
  namespace: demo
type: Opaque
stringData:
  username: "demo-user"
  password: "REPLACE_WITH_A_SECRET_FROM_A_SECURE_SOURCE"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: credential-consumer
  namespace: demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: credential-consumer
  template:
    metadata:
      labels:
        app: credential-consumer
    spec:
      containers:
        - name: app
          image: nginx:1.27
          env:
            - name: APP_USERNAME
              valueFrom:
                secretKeyRef:
                  name: app-credentials
                  key: username
            - name: APP_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: app-credentials
                  key: password`,
    companion: "The placeholder is deliberately not a real credential. In a real workflow, inject values from a secure secret manager or controlled pipeline rather than committing plaintext credentials to Git.",
    exercises: [
      { title: "Reference one secret key", task: "Add an environment variable named DB_USERNAME that reads the username key from app-credentials.", hint: "Use valueFrom.secretKeyRef.", solution: `- name: DB_USERNAME\n  valueFrom:\n    secretKeyRef:\n      name: app-credentials\n      key: username` },
      { title: "Define a TLS Secret structure", task: "Write a TLS Secret manifest with metadata.name web-tls and the conventional tls.crt and tls.key keys. Use placeholder values only.", hint: "Set type to kubernetes.io/tls. Never put a real private key in this exercise.", solution: `apiVersion: v1\nkind: Secret\nmetadata:\n  name: web-tls\n  namespace: demo\ntype: kubernetes.io/tls\nstringData:\n  tls.crt: "PLACEHOLDER_CERTIFICATE"\n  tls.key: "PLACEHOLDER_PRIVATE_KEY"` }
    ],
    mistakes: [
      { wrong: `data:\n  password: "my-password"`, right: `stringData:\n  password: "INJECT_FROM_SECURE_SECRET_SOURCE"`, reason: "The data field expects base64-encoded strings. stringData accepts plain strings at submission time, but the value must still be supplied securely." },
      { wrong: `type: kubernetes.io/tls\ndata:\n  certificate: "..."`, right: `type: kubernetes.io/tls\nstringData:\n  tls.crt: "PLACEHOLDER_CERTIFICATE"\n  tls.key: "PLACEHOLDER_PRIVATE_KEY"`, reason: "TLS Secret conventions use tls.crt and tls.key. This example uses placeholders and is not a deployable certificate." }
    ],
    incident: {
      title: "Pod fails to start after a credential Secret was renamed",
      symptoms: ["Pod events report a missing Secret or key.", "The application container does not start successfully.", "The Deployment references a Secret name that differs from the namespace object."],
      diagnosis: ["Check the Pod namespace and Secret metadata.name.", "Inspect the Deployment's secretKeyRef or secretRef names and key spelling.", "Review Pod events without printing Secret values.", "Confirm the workload identity and RBAC permissions are appropriate."],
      recovery: ["Restore the expected Secret reference or update the workload to the approved Secret name.", "Provision the required key through a secure source.", "Roll out the corrected workload if necessary.", "Verify application authentication and audit access; do not paste secret values into logs or tickets."]
    },
    questions: [
      { question: "Does base64 encoding encrypt a Kubernetes Secret?", options: ["Yes, with a strong cipher", "No, it is reversible encoding", "Only when type is Opaque"], correct: 1, answer: "Base64 is encoding, not encryption. Protect Secrets with encryption at rest, restrictive permissions and secure delivery." },
      { question: "Which keys are conventionally used by a TLS Secret?", options: ["tls.crt and tls.key", "certificate and password", "public and private"], correct: 0, answer: "The conventional keys are tls.crt and tls.key, with type kubernetes.io/tls." },
      { question: "What is the safer way to handle real credentials in a learning repository?", options: ["Commit base64 values", "Put credentials in ConfigMaps", "Use placeholders and inject values securely"], correct: 2, answer: "Use dummy placeholders in examples and retrieve real values from an approved secure secret source." }
    ],
    checks: ["apiVersion must be v1.", "kind must be Secret.", "metadata.name must be present.", "type should match the intended Secret format.", "data values must be base64 strings; stringData accepts plain strings.", "TLS Secrets conventionally use tls.crt and tls.key.", "Base64 is not encryption.", "Never expose real credentials in source control, terminal output or logs."]
  },

  RBAC: {
    summary: "Role-Based Access Control determines which authenticated identities can perform which actions on Kubernetes API resources. Good RBAC design starts with least privilege and a clear namespace or cluster scope.",
    objective: [
      "Differentiate Role from ClusterRole.",
      "Differentiate RoleBinding from ClusterRoleBinding.",
      "Understand apiGroups, resources, verbs and resourceNames.",
      "Design and troubleshoot least-privilege permissions."
    ],
    sections: [
      { title: "Identity, authentication and authorization", detail: "Authentication establishes who is making an API request. Authorization determines whether that identity may perform the requested action. Kubernetes RBAC is an authorization mechanism; it does not create user passwords or replace authentication. Subjects can include users, groups and ServiceAccounts. A workload commonly uses a ServiceAccount identity when calling the Kubernetes API. Keep application identities separate and grant only the API permissions they actually need." },
      { title: "Rules: API groups, resources and verbs", detail: "An RBAC rule combines apiGroups, resources and verbs. The core API group is represented by an empty string, while resources such as deployments belong to the apps API group. Common verbs include get, list, watch, create, update, patch and delete. Wildcards broaden access and should be avoided unless there is a documented reason. Subresources such as pods/log or deployments/scale may need explicit rule entries." },
      { title: "Role and ClusterRole scope", detail: "A Role defines permissions within one namespace. A ClusterRole is cluster-scoped as a definition and can describe permissions for cluster-scoped or namespaced resources. A ClusterRole can also be bound inside a namespace through a RoleBinding, which grants those permissions in the binding namespace. Defining a ClusterRole does not itself grant anyone access." },
      { title: "RoleBinding and ClusterRoleBinding", detail: "A RoleBinding grants the permissions in a Role or referenced ClusterRole within one namespace. A ClusterRoleBinding grants the referenced ClusterRole permissions across the cluster scope described by its rules. The binding connects subjects to a role. Check the binding namespace, subject kind, subject name and ServiceAccount namespace carefully. A RoleBinding referencing a ClusterRole is a common way to reuse a role definition while limiting the grant to one namespace." },
      { title: "Least privilege, testing and audit", detail: "Grant only required resources and verbs. Avoid cluster-admin for routine workloads. Use kubectl auth can-i with an explicit identity and namespace to test effective permissions. Review inherited group memberships and all bindings when access appears broader than expected. Audit changes, remove unused bindings and prefer dedicated ServiceAccounts for workloads. RBAC permissions are additive; a restrictive Role does not cancel a broader binding." }
    ],
    yaml: `apiVersion: v1
kind: ServiceAccount
metadata:
  name: report-reader
  namespace: demo
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: read-pods
  namespace: demo
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: report-reader-pod-access
  namespace: demo
subjects:
  - kind: ServiceAccount
    name: report-reader
    namespace: demo
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: read-pods
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: report-agent
  namespace: demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: report-agent
  template:
    metadata:
      labels:
        app: report-agent
    spec:
      serviceAccountName: report-reader
      containers:
        - name: agent
          image: nginx:1.27`,
    companion: "This example grants a dedicated ServiceAccount read-only access to Pods in namespace demo. It does not grant access to Secrets, Deployments or other namespaces.",
    exercises: [
      { title: "Add read access to ConfigMaps", task: "Extend the Role with read-only get and list access to ConfigMaps in the core API group.", hint: "Add another rule. The core apiGroups value is an empty string.", solution: `- apiGroups: [""]\n  resources: ["configmaps"]\n  verbs: ["get", "list"]` },
      { title: "Bind a different ServiceAccount", task: "Create a RoleBinding in namespace demo for ServiceAccount audit-reader using the existing read-pods Role.", hint: "The subject kind is ServiceAccount. roleRef kind is Role.", solution: `subjects:\n  - kind: ServiceAccount\n    name: audit-reader\n    namespace: demo\nroleRef:\n  apiGroup: rbac.authorization.k8s.io\n  kind: Role\n  name: read-pods` }
    ],
    mistakes: [
      { wrong: `apiGroups: ["apps"]\nresources: ["pods"]\nverbs: ["get"]`, right: `apiGroups: [""]\nresources: ["pods"]\nverbs: ["get"]`, reason: "Pods belong to the core API group, represented by an empty string. Deployments belong to the apps API group." },
      { wrong: `roleRef:\n  apiGroup: rbac.authorization.k8s.io\n  kind: ClusterRole\n  name: read-pods`, right: `roleRef:\n  apiGroup: rbac.authorization.k8s.io\n  kind: Role\n  name: read-pods`, reason: "The roleRef kind and name must identify the actual role object. This example created a Role, not a ClusterRole." }
    ],
    incident: {
      title: "Report agent receives Forbidden when listing Pods",
      symptoms: ["The Kubernetes API responds with Forbidden.", "The ServiceAccount token is available to the workload.", "The agent is querying Pods in namespace demo."],
      diagnosis: ["Confirm the Pod uses serviceAccountName report-reader.", "Check that the ServiceAccount exists in namespace demo.", "Inspect the RoleBinding namespace and subject identity.", "Verify the Role includes the core API group, pods resource and list verb.", "Test effective permissions using kubectl auth can-i with the correct identity and namespace."],
      recovery: ["Correct the Role or RoleBinding with the minimum required permission.", "Avoid granting cluster-admin as a quick fix.", "Restart or refresh the workload only if identity or token handling requires it.", "Repeat the authorization test and review audit events."]
    },
    questions: [
      { question: "Which binding grants permissions across the cluster?", options: ["RoleBinding", "ClusterRoleBinding", "Service"], correct: 1, answer: "ClusterRoleBinding grants the referenced ClusterRole at cluster scope." },
      { question: "Can a RoleBinding reference a ClusterRole?", options: ["Yes, but the grant is limited to the RoleBinding namespace", "No, never", "Only for Secrets"], correct: 0, answer: "A RoleBinding may reference a ClusterRole and grant its permissions within the binding namespace." },
      { question: "What is the least-privilege approach?", options: ["Give every workload cluster-admin", "Use wildcards for all resources", "Grant only required resources and verbs"], correct: 2, answer: "Grant only the resources and verbs required by the workload, scoped as narrowly as practical." }
    ],
    checks: ["RBAC apiVersion must be rbac.authorization.k8s.io/v1.", "Role and RoleBinding require metadata.namespace.", "A Role rule needs apiGroups, resources and verbs.", "Core resources such as pods use apiGroups: [\"\"].", "roleRef apiGroup must be rbac.authorization.k8s.io.", "roleRef kind and name must identify an existing Role or ClusterRole.", "ServiceAccount subjects need the correct namespace.", "Avoid wildcard permissions and cluster-admin for routine workloads."]
  }
};

const tabs = ["Learn", "Examples", "Practice", "Debug", "Validate", "Scenarios", "Quiz"];

export default function YamlKubernetesConfigurationWorkspace({
  topic,
  tab
}: {
  topic: string;
  tab: string;
}) {
  const lesson = lessons[topic];
  const [showSolutions, setShowSolutions] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [draft, setDraft] = useState(lesson?.yaml ?? "");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [notes, setNotes] = useState("");
  const [validationRequested, setValidationRequested] = useState(false);

  const validation = useMemo(() => {
    if (!lesson) return { errors: ["Unknown Kubernetes Configuration topic."], warnings: [] as string[] };
    if (!validationRequested) return { errors: [] as string[], warnings: [] as string[] };

    const doc = parseDocument(draft, { uniqueKeys: true });
    const errors = doc.errors.map((error) => error.message);
    const warnings = doc.warnings.map((warning) => warning.message);

    if (errors.length > 0) return { errors, warnings };

    const parsed = doc.toJS() as Record<string, unknown> | undefined;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      errors.push("The YAML document must contain a Kubernetes object.");
      return { errors, warnings };
    }

    const metadata = parsed.metadata as Record<string, unknown> | undefined;
    if (!parsed.apiVersion) errors.push("Missing apiVersion.");
    if (!parsed.kind) errors.push("Missing kind.");
    if (!metadata?.name) errors.push("Missing metadata.name.");

    if (parsed.kind === "ConfigMap") {
      if (parsed.apiVersion !== "v1") errors.push("ConfigMap apiVersion must be v1.");
      if (!parsed.data && !parsed.binaryData) warnings.push("No data or binaryData entries found.");
      if (parsed.data && typeof parsed.data !== "object") errors.push("ConfigMap data must be a mapping.");
    } else if (parsed.kind === "Secret") {
      if (parsed.apiVersion !== "v1") errors.push("Secret apiVersion must be v1.");
      if (!parsed.type) warnings.push("Secret type is not specified; Kubernetes defaults to Opaque.");
      if (!parsed.data && !parsed.stringData) warnings.push("No data or stringData entries found.");
      if (parsed.data && typeof parsed.data !== "object") errors.push("Secret data must be a mapping.");
      if (parsed.data && typeof parsed.data === "object") {
        warnings.push("Secret data values must be base64-encoded; base64 is not encryption.");
      }
    } else if (parsed.kind === "Role" || parsed.kind === "ClusterRole") {
      if (parsed.apiVersion !== "rbac.authorization.k8s.io/v1") errors.push("RBAC resources require rbac.authorization.k8s.io/v1.");
      if (!Array.isArray(parsed.rules) || parsed.rules.length === 0) errors.push("Role rules must contain at least one rule.");
      else parsed.rules.forEach((rule: any, index: number) => {
        if (!Array.isArray(rule.apiGroups)) errors.push(`Rule ${index + 1}: apiGroups must be an array.`);
        if (!Array.isArray(rule.resources) || rule.resources.length === 0) errors.push(`Rule ${index + 1}: resources must be a non-empty array.`);
        if (!Array.isArray(rule.verbs) || rule.verbs.length === 0) errors.push(`Rule ${index + 1}: verbs must be a non-empty array.`);
      });
    } else if (parsed.kind === "RoleBinding" || parsed.kind === "ClusterRoleBinding") {
      if (parsed.apiVersion !== "rbac.authorization.k8s.io/v1") errors.push("RBAC bindings require rbac.authorization.k8s.io/v1.");
      if (!Array.isArray(parsed.subjects) || parsed.subjects.length === 0) errors.push("Binding must contain at least one subject.");
      const roleRef = parsed.roleRef as Record<string, unknown> | undefined;
      if (!roleRef?.name || !roleRef?.kind || !roleRef?.apiGroup) errors.push("roleRef must include apiGroup, kind and name.");
      if (roleRef?.apiGroup !== "rbac.authorization.k8s.io") errors.push("roleRef.apiGroup must be rbac.authorization.k8s.io.");
    } else if (parsed.kind === "ServiceAccount") {
      if (parsed.apiVersion !== "v1") errors.push("ServiceAccount apiVersion must be v1.");
    } else if (parsed.kind === "Deployment") {
      if (parsed.apiVersion !== "apps/v1") errors.push("Deployment apiVersion must be apps/v1.");
    } else {
      warnings.push("This validator performs topic-focused checks for ConfigMap, Secret, RBAC, ServiceAccount and Deployment objects.");
    }

    return { errors, warnings };
  }, [draft, lesson, validationRequested]);

  if (!lesson) {
    return <div className="rounded-xl border border-rose-800 bg-rose-950/30 p-5 text-rose-200">Unknown Kubernetes Configuration topic: {topic}</div>;
  }

  const active = tabs.includes(tab) ? tab : "Learn";
  const score = lesson.questions.reduce((total, question, index) =>
    total + (quizAnswers[index] === question.correct ? 1 : 0), 0
  );

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-cyan-900/70 bg-gradient-to-br from-cyan-950/50 to-slate-950 p-5 sm:p-7">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Kubernetes Configuration · Hands-on Workspace</div>
        <h2 className="mt-2 text-2xl font-bold text-white">{topic}</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">{lesson.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-cyan-800 px-3 py-1 text-xs text-cyan-200">{lesson.sections.length} concept lessons</span>
          <span className="rounded-full border border-cyan-800 px-3 py-1 text-xs text-cyan-200">{lesson.exercises.length} practice tasks</span>
          <span className="rounded-full border border-cyan-800 px-3 py-1 text-xs text-cyan-200">{lesson.questions.length} quiz questions</span>
        </div>
      </div>


      {active === "Learn" && (
        <div className="space-y-4">
          <section className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <h3 className="text-lg font-bold text-white">Learning objectives</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
              {lesson.objective.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          {lesson.sections.map((section, index) => (
            <article key={section.title} className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="text-xs font-semibold text-cyan-400">CONCEPT {index + 1}</div>
              <h3 className="mt-2 text-lg font-bold text-white">{section.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{section.detail}</p>
            </article>
          ))}
        </div>
      )}

      {active === "Examples" && (
        <section className="rounded-xl border border-slate-800 bg-slate-950 p-5">
          <h3 className="text-lg font-bold text-white">Complete Kubernetes YAML example</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{lesson.companion}</p>
          <pre className="mt-4 max-h-[650px] overflow-auto rounded-lg border border-slate-800 bg-[#080e18] p-4 text-xs leading-6 text-emerald-200"><code>{lesson.yaml}</code></pre>
          <button onClick={() => setDraft(lesson.yaml)} className="mt-4 rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600">Load example into validator</button>
        </section>
      )}

      {active === "Practice" && (
        <div className="space-y-4">
          {lesson.exercises.map((exercise, index) => (
            <article key={exercise.title} className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="text-xs font-semibold text-cyan-400">TASK {index + 1}</div>
              <h3 className="mt-2 text-lg font-bold text-white">{exercise.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{exercise.task}</p>
              <details className="mt-4 rounded-lg border border-slate-800 p-3">
                <summary className="cursor-pointer text-sm font-semibold text-amber-300">Show hint</summary>
                <p className="mt-2 text-sm leading-6 text-slate-300">{exercise.hint}</p>
              </details>
              {showSolutions && <pre className="mt-3 overflow-auto rounded-lg bg-[#080e18] p-4 text-xs leading-6 text-emerald-200"><code>{exercise.solution}</code></pre>}
            </article>
          ))}
          <button onClick={() => setShowSolutions((value) => !value)} className="rounded-lg border border-cyan-700 px-4 py-2 text-sm font-semibold text-cyan-200">
            {showSolutions ? "Hide solutions" : "Reveal practice solutions"}
          </button>
          <label className="block text-sm font-semibold text-slate-200" htmlFor="yaml-config-notes">Your practice notes</label>
          <textarea id="yaml-config-notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} placeholder="Write your approach, commands to verify, and what you learned..." className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none focus:border-cyan-500" />
        </div>
      )}

      {active === "Debug" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-amber-900/70 bg-amber-950/20 p-5">
            <h3 className="text-lg font-bold text-amber-200">Common configuration mistakes</h3>
            <p className="mt-2 text-sm text-slate-300">Compare each incorrect configuration with the corrected version and understand the reason before changing a live workload.</p>
          </div>
          {lesson.mistakes.map((mistake, index) => (
            <article key={index} className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="text-xs font-semibold text-rose-300">INCORRECT CONFIGURATION</div>
              <pre className="mt-2 overflow-auto rounded-lg bg-rose-950/20 p-3 text-xs text-rose-200"><code>{mistake.wrong}</code></pre>
              <div className="mt-4 text-xs font-semibold text-emerald-300">CORRECTED CONFIGURATION</div>
              <pre className="mt-2 overflow-auto rounded-lg bg-emerald-950/20 p-3 text-xs text-emerald-200"><code>{mistake.right}</code></pre>
              <p className="mt-3 text-sm leading-6 text-slate-300">{mistake.reason}</p>
            </article>
          ))}
        </div>
      )}

      {active === "Validate" && (
        <div className="space-y-4">
          <section className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <h3 className="text-lg font-bold text-white">YAML editor and validator</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">Edit the YAML below. The local YAML parser checks syntax and duplicate keys; topic-aware checks inspect common Kubernetes fields. This is not a substitute for Kubernetes API server or admission-policy validation.</p>
            <textarea value={draft} onChange={(event) => { setDraft(event.target.value); setValidationRequested(false); }} spellCheck={false} rows={22} className="mt-4 w-full rounded-xl border border-slate-700 bg-[#080e18] p-4 font-mono text-xs leading-6 text-emerald-200 outline-none focus:border-cyan-500" />
            <button onClick={() => setValidationRequested(true)} className="mt-4 rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600">Validate YAML</button>
          </section>
          {validationRequested && (
            <section className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <h3 className="font-bold text-white">Validation results</h3>
              {validation.errors.length === 0 ? <p className="mt-3 text-sm font-semibold text-emerald-300">No YAML parser or implemented semantic errors detected.</p> : (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-rose-300">{validation.errors.map((error, index) => <li key={index}>{error}</li>)}</ul>
              )}
              {validation.warnings.length > 0 && <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-amber-300">{validation.warnings.map((warning, index) => <li key={index}>{warning}</li>)}</ul>}
            </section>
          )}
          <section className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <h3 className="font-bold text-white">Topic-specific validation checklist</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">{lesson.checks.map((check) => <li key={check}>{check}</li>)}</ul>
          </section>
        </div>
      )}

      {active === "Scenarios" && (
        <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">Production incident simulation</div>
          <h3 className="text-xl font-bold text-white">{lesson.incident.title}</h3>
          <div>
            <h4 className="font-semibold text-rose-200">Observed symptoms</h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">{lesson.incident.symptoms.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h4 className="font-semibold text-cyan-200">Investigation sequence</h4>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-300">{lesson.incident.diagnosis.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
          <div>
            <h4 className="font-semibold text-emerald-200">Recovery and verification</h4>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-300">{lesson.incident.recovery.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </section>
      )}

      {active === "Quiz" && (
        <div className="space-y-4">
          <section className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <h3 className="text-lg font-bold text-white">Knowledge assessment</h3>
            <p className="mt-2 text-sm text-slate-400">Choose one answer for each question. Reveal explanations after attempting the quiz.</p>
            <div className="mt-3 text-sm font-semibold text-cyan-300">Current score: {score} / {lesson.questions.length}</div>
          </section>
          {lesson.questions.map((question, index) => (
            <article key={index} className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <h4 className="font-semibold text-white">{index + 1}. {question.question}</h4>
              <div className="mt-3 space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-800 p-3 text-sm text-slate-300 hover:border-cyan-700">
                    <input type="radio" name={`quiz-${topic}-${index}`} checked={quizAnswers[index] === optionIndex} onChange={() => setQuizAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mt-1 accent-cyan-500" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {showAnswers && <p className={`mt-3 rounded-lg p-3 text-sm leading-6 ${quizAnswers[index] === question.correct ? "bg-emerald-950/30 text-emerald-200" : "bg-amber-950/30 text-amber-200"}`}>{quizAnswers[index] === question.correct ? "Correct. " : "Review this concept. "}{question.answer}</p>}
            </article>
          ))}
          <button onClick={() => setShowAnswers((value) => !value)} className="rounded-lg border border-cyan-700 px-4 py-2 text-sm font-semibold text-cyan-200">{showAnswers ? "Hide explanations" : "Submit and reveal answers"}</button>
        </div>
      )}
    </div>
  );
}