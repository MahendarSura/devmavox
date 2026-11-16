"use client";

import { useMemo, useState } from "react";

type Command = { command: string; output: string; purpose: string };
type Scenario = {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium";
  incident: string;
  impact: string;
  broken: string;
  fixed: string;
  rootCause: string;
  keywords: string[];
  commands: Command[];
  checks: string[];
  expected: string;
  prevention: string;
  hint: string;
  question: string;
  choices: string[];
  answer: string;
};

const scenarios: Record<string, Scenario[]> = {
  "Kubernetes Manifest Lab": [
    {
      id: "KML-01",
      title: "Deployment Selector Mismatch",
      severity: "High",
      incident: "The payments Deployment is accepted, but its ReplicaSet cannot manage the intended Pods because the selector and Pod template labels differ.",
      impact: "Payments has no healthy managed replicas. A rollout cannot provide the expected application capacity.",
      broken: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: payments
spec:
  replicas: 2
  selector:
    matchLabels:
      app: payments
  template:
    metadata:
      labels:
        app: payment
    spec:
      containers:
        - name: api
          image: nginx:1.27
          ports:
            - containerPort: 8080`,
      fixed: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: payments
spec:
  replicas: 2
  selector:
    matchLabels:
      app: payments
  template:
    metadata:
      labels:
        app: payments
    spec:
      containers:
        - name: api
          image: nginx:1.27
          ports:
            - containerPort: 8080`,
      rootCause: "The Deployment selector uses app=payments but the Pod template label is app=payment. They must match exactly.",
      keywords: ["selector", "template", "label", "payments", "payment"],
      commands: [
        { command: "kubectl get deployment payments", output: "NAME       READY   UP-TO-DATE   AVAILABLE\npayments   0/2     0            0", purpose: "Check desired and available replicas." },
        { command: "kubectl describe deployment payments", output: "Selector: app=payments\nPod template labels: app=payment\nWarning: selector does not match template labels.", purpose: "Compare selector and template labels." },
        { command: "kubectl get pods --show-labels", output: "No Pods are managed by the expected payments ReplicaSet.\nObserved template label: app=payment", purpose: "Inspect Pod labels." },
        { command: "kubectl get events --sort-by=.metadata.creationTimestamp", output: "Warning FailedCreate replicaset/payments\nSelector/template label mismatch detected in simulated incident evidence.", purpose: "Review event evidence." },
        { command: "kubectl rollout status deployment/payments", output: "Waiting for deployment payments rollout...\n0 of 2 updated replicas available.", purpose: "Inspect rollout status." }
      ],
      checks: ["selector app equals template label app", "replicas is 2", "Deployment has 2 available replicas"],
      expected: "Deployment: 2/2 available. ReplicaSet manages two Pods with label app=payments.",
      prevention: "Add manifest schema checks and selector/template label consistency checks to pull-request validation.",
      hint: "Compare spec.selector.matchLabels with spec.template.metadata.labels. The spelling must be identical.",
      question: "Which mismatch prevents the Deployment from selecting its intended Pods?",
      choices: ["Container image is unavailable", "Deployment selector and Pod template labels differ", "Service targetPort is wrong", "Namespace is missing"],
      answer: "Deployment selector and Pod template labels differ"
    },
    {
      id: "KML-02",
      title: "Service Selector Mismatch",
      severity: "Critical",
      incident: "The catalog Pods are Running, but the Service selects app=catalog-api while the Pods carry app=catalog.",
      impact: "Internal applications cannot reach catalog endpoints. Requests fail even though the containers are healthy.",
      broken: `apiVersion: v1
kind: Service
metadata:
  name: catalog
spec:
  selector:
    app: catalog-api
  ports:
    - name: http
      port: 80
      targetPort: 8080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: catalog
spec:
  replicas: 2
  selector:
    matchLabels:
      app: catalog
  template:
    metadata:
      labels:
        app: catalog
    spec:
      containers:
        - name: api
          image: nginx:1.27
          ports:
            - containerPort: 8080`,
      fixed: `apiVersion: v1
kind: Service
metadata:
  name: catalog
spec:
  selector:
    app: catalog
  ports:
    - name: http
      port: 80
      targetPort: 8080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: catalog
spec:
  replicas: 2
  selector:
    matchLabels:
      app: catalog
  template:
    metadata:
      labels:
        app: catalog
    spec:
      containers:
        - name: api
          image: nginx:1.27
          ports:
            - containerPort: 8080`,
      rootCause: "The Service selects app=catalog-api, but the Deployment creates Pods with app=catalog. The Service therefore has no matching endpoints.",
      keywords: ["service", "selector", "catalog-api", "catalog", "endpoint"],
      commands: [
        { command: "kubectl get pods --show-labels", output: "catalog-7c9d   1/1 Running   app=catalog\ncatalog-8f2a   1/1 Running   app=catalog", purpose: "Inspect actual Pod labels." },
        { command: "kubectl describe service catalog", output: "Selector: app=catalog-api\nPort: 80/TCP\nTargetPort: 8080/TCP", purpose: "Inspect Service selector and ports." },
        { command: "kubectl get endpoints catalog", output: "NAME      ENDPOINTS   AGE\ncatalog   <none>      8m", purpose: "Check whether the Service has endpoints." },
        { command: "kubectl get events", output: "Pods are healthy. No matching endpoints found for Service selector app=catalog-api.", purpose: "Collect service discovery evidence." },
        { command: "kubectl run network-test --image=busybox --rm -it -- wget -qO- http://catalog", output: "wget: can't connect to remote host: Connection refused (simulated)", purpose: "Reproduce service connectivity failure." }
      ],
      checks: ["Service selector is app=catalog", "Service targetPort is 8080", "Endpoints contain two Pod IPs"],
      expected: "Service catalog has two endpoints on port 8080. The in-cluster connectivity check succeeds.",
      prevention: "Validate Service selectors against workload labels and test endpoint availability after deployment.",
      hint: "The Service selector must match the labels shown by kubectl get pods --show-labels.",
      question: "Why does the Service have no endpoints?",
      choices: ["Pods are Pending", "Service selector does not match Pod labels", "Container image is invalid", "Cluster DNS is unavailable"],
      answer: "Service selector does not match Pod labels"
    },
    {
      id: "KML-03",
      title: "Missing ConfigMap Reference",
      severity: "High",
      incident: "The inventory application references a ConfigMap named inventory-settings, but the manifest creates inventory-config instead.",
      impact: "The application cannot mount its required configuration and the Pod remains unable to start correctly.",
      broken: `apiVersion: v1
kind: ConfigMap
metadata:
  name: inventory-config
data:
  APP_MODE: production
  LOG_LEVEL: info
---
apiVersion: v1
kind: Pod
metadata:
  name: inventory-api
spec:
  containers:
    - name: api
      image: nginx:1.27
      envFrom:
        - configMapRef:
            name: inventory-settings`,
      fixed: `apiVersion: v1
kind: ConfigMap
metadata:
  name: inventory-settings
data:
  APP_MODE: production
  LOG_LEVEL: info
---
apiVersion: v1
kind: Pod
metadata:
  name: inventory-api
spec:
  containers:
    - name: api
      image: nginx:1.27
      envFrom:
        - configMapRef:
            name: inventory-settings`,
      rootCause: "The Pod references inventory-settings, but the created ConfigMap is named inventory-config. The referenced ConfigMap does not exist.",
      keywords: ["configmap", "inventory-settings", "inventory-config", "reference", "name"],
      commands: [
        { command: "kubectl get configmaps", output: "NAME               DATA\ninventory-config   2", purpose: "List available ConfigMaps." },
        { command: "kubectl describe pod inventory-api", output: "Warning: configmap inventory-settings not found\nContainer configuration could not be resolved.", purpose: "Inspect Pod configuration errors." },
        { command: "kubectl get events --sort-by=.metadata.creationTimestamp", output: "Warning Failed: configmap \"inventory-settings\" not found", purpose: "Review Kubernetes Events." },
        { command: "kubectl get pod inventory-api -o wide", output: "inventory-api   0/1   CreateContainerConfigError", purpose: "Inspect current Pod state." },
        { command: "kubectl describe configmap inventory-config", output: "APP_MODE=production\nLOG_LEVEL=info\nExisting object name: inventory-config", purpose: "Compare the actual object name." }
      ],
      checks: ["ConfigMap metadata.name is inventory-settings", "Pod configMapRef name is inventory-settings", "Pod starts with its configuration loaded"],
      expected: "ConfigMap reference resolves. Pod reaches Running and its environment contains APP_MODE=production.",
      prevention: "Add manifest reference validation to CI and verify ConfigMaps exist in the target namespace.",
      hint: "Compare metadata.name of the ConfigMap with envFrom.configMapRef.name.",
      question: "What causes CreateContainerConfigError in this incident?",
      choices: ["Invalid image tag", "Referenced ConfigMap does not exist under that name", "Service has no endpoints", "Node has insufficient CPU"],
      answer: "Referenced ConfigMap does not exist under that name"
    }
  ],
  "Troubleshooting Lab": [
    {
      id: "TL-01",
      title: "ImagePullBackOff from Invalid Image Tag",
      severity: "High",
      incident: "A production reports Deployment uses an image tag that is not published in the container registry.",
      impact: "New replicas cannot start, rollout is blocked, and the reports service cannot scale.",
      broken: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: reports
spec:
  replicas: 1
  selector:
    matchLabels:
      app: reports
  template:
    metadata:
      labels:
        app: reports
    spec:
      containers:
        - name: reports
          image: nginx:99.99-not-real`,
      fixed: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: reports
spec:
  replicas: 1
  selector:
    matchLabels:
      app: reports
  template:
    metadata:
      labels:
        app: reports
    spec:
      containers:
        - name: reports
          image: nginx:1.27`,
      rootCause: "The configured image tag nginx:99.99-not-real does not exist in the registry, so the kubelet cannot pull the image.",
      keywords: ["image", "tag", "99.99", "registry", "pull"],
      commands: [
        { command: "kubectl get pods", output: "reports-7d6f   0/1   ImagePullBackOff   0   3m", purpose: "Identify the Pod failure state." },
        { command: "kubectl describe pod reports-7d6f", output: "Failed to pull image nginx:99.99-not-real\nmanifest unknown: requested tag not found", purpose: "Inspect image pull failure details." },
        { command: "kubectl get events --sort-by=.metadata.creationTimestamp", output: "Warning Failed kubelet: Failed to pull image\nWarning BackOff: Back-off pulling image", purpose: "Collect Events evidence." },
        { command: "kubectl get deployment reports", output: "NAME      READY   UP-TO-DATE   AVAILABLE\nreports   0/1     1            0", purpose: "Check rollout availability." },
        { command: "kubectl rollout status deployment/reports", output: "Waiting for deployment rollout: 0 of 1 updated replicas available.", purpose: "Confirm rollout is blocked." }
      ],
      checks: ["Image tag is nginx:1.27", "Pod image pull succeeds", "Deployment has one available replica"],
      expected: "Pod reaches Running and Ready. Deployment reports 1/1 available.",
      prevention: "Pin approved image tags, scan registry availability in CI, and avoid unverified image versions.",
      hint: "The Events output says manifest unknown. Check the repository and image tag.",
      question: "What is the direct cause of ImagePullBackOff?",
      choices: ["Image tag does not exist in registry", "Service selector mismatch", "Missing ConfigMap", "Readiness probe path is wrong"],
      answer: "Image tag does not exist in registry"
    },
    {
      id: "TL-02",
      title: "CrashLoopBackOff from Invalid Startup Command",
      severity: "Critical",
      incident: "The checkout container starts, executes a command that is not present in its image, exits, and is restarted repeatedly.",
      impact: "Checkout API becomes unavailable and restart counts increase continuously.",
      broken: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: checkout
spec:
  replicas: 1
  selector:
    matchLabels:
      app: checkout
  template:
    metadata:
      labels:
        app: checkout
    spec:
      containers:
        - name: api
          image: busybox:1.36
          command: ["sh", "-c", "run-checkout-server"]`,
      fixed: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: checkout
spec:
  replicas: 1
  selector:
    matchLabels:
      app: checkout
  template:
    metadata:
      labels:
        app: checkout
    spec:
      containers:
        - name: api
          image: busybox:1.36
          command: ["sh", "-c", "sleep 3600"]`,
      rootCause: "The startup command run-checkout-server is not available in the BusyBox image. The shell exits with code 127 and Kubernetes restarts the container.",
      keywords: ["command", "run-checkout-server", "not found", "127", "exit"],
      commands: [
        { command: "kubectl get pods", output: "checkout-6b8c   0/1   CrashLoopBackOff   6   4m", purpose: "Identify repeated container restarts." },
        { command: "kubectl describe pod checkout-6b8c", output: "Last State: Terminated\nReason: Error\nExit Code: 127\nRestart Count: 6", purpose: "Inspect termination reason." },
        { command: "kubectl logs checkout-6b8c --previous", output: "sh: run-checkout-server: not found", purpose: "Read logs from the previous container." },
        { command: "kubectl get events --sort-by=.metadata.creationTimestamp", output: "Warning BackOff: Back-off restarting failed container api", purpose: "Review restart Events." },
        { command: "kubectl get deployment checkout", output: "NAME       READY   UP-TO-DATE   AVAILABLE\ncheckout   0/1     1            0", purpose: "Check application availability." }
      ],
      checks: ["Startup command exists in the selected image", "Container process stays alive", "Restart count stops increasing"],
      expected: "Container remains Running. Restart count stays stable and Pod becomes Ready.",
      prevention: "Test container entrypoints in CI, use image-specific startup commands, and add startup health checks.",
      hint: "Exit code 127 commonly indicates that the requested command could not be found.",
      question: "What do the previous logs and exit code 127 indicate?",
      choices: ["Container command is missing from the image", "Image tag is unavailable", "Service selector is incorrect", "PVC is unbound"],
      answer: "Container command is missing from the image"
    },
    {
      id: "TL-03",
      title: "Secret Exposed in Manifest",
      severity: "Critical",
      incident: "A database password has been committed as plain text in a ConfigMap and is visible to anyone who can read the manifest repository.",
      impact: "Database credentials may be exposed. Unauthorized access and data compromise are possible.",
      broken: `apiVersion: v1
kind: ConfigMap
metadata:
  name: database-settings
data:
  DB_HOST: database.internal
  DB_USER: appuser
  DB_PASSWORD: PlainText-Production-Password`,
      fixed: `apiVersion: v1
kind: Secret
metadata:
  name: database-credentials
type: Opaque
stringData:
  DB_USER: appuser
  DB_PASSWORD: REPLACE_WITH_ROTATED_SECRET
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: database-settings
data:
  DB_HOST: database.internal
---
apiVersion: v1
kind: Pod
metadata:
  name: secure-app
spec:
  containers:
    - name: app
      image: nginx:1.27
      envFrom:
        - configMapRef:
            name: database-settings
        - secretRef:
            name: database-credentials`,
      rootCause: "The password is stored as plain text in a ConfigMap and committed to a readable manifest. It must be moved to a Secret and the exposed credential must be rotated.",
      keywords: ["password", "plaintext", "configmap", "secret", "rotate"],
      commands: [
        { command: "grep -R \"DB_PASSWORD\" ./manifests", output: "database-settings.yaml: DB_PASSWORD: PlainText-Production-Password", purpose: "Find exposed credential references." },
        { command: "kubectl get configmap database-settings -o yaml", output: "data:\n  DB_PASSWORD: PlainText-Production-Password\nFinding: sensitive value stored in ConfigMap.", purpose: "Inspect unsafe configuration." },
        { command: "git log --oneline -- manifests/", output: "a12bc91 Add database settings\nCredential exposure may exist in repository history.", purpose: "Determine whether the credential was committed." },
        { command: "kubectl get secrets", output: "No database-credentials Secret found in the simulated namespace.", purpose: "Check for a secure credential object." },
        { command: "security scan manifests/", output: "CRITICAL: plaintext credential detected in ConfigMap data.DB_PASSWORD", purpose: "Collect security scanner evidence." }
      ],
      checks: ["DB_PASSWORD is removed from ConfigMap", "Secret database-credentials exists", "Application references secretKey through Secret", "Exposed credential is rotated outside this manifest"],
      expected: "No plaintext password remains in the ConfigMap. Workload references a Kubernetes Secret. Old credential is treated as compromised and rotated.",
      prevention: "Use an external secret manager where possible, enable secret scanning, restrict RBAC, and rotate credentials after exposure. Base64 encoding alone is not encryption.",
      hint: "A Kubernetes Secret is not a reason to keep the old leaked password. Remove it from the ConfigMap and rotate it.",
      question: "What is the correct response to a committed plaintext database password?",
      choices: ["Rename the ConfigMap only", "Move it to a Secret and rotate the exposed credential", "Base64 encode the password in the ConfigMap", "Ignore it if the repository is private"],
      answer: "Move it to a Secret and rotate the exposed credential"
    }
  ],
  "CI/CD and GitOps Lab": [
    {
      id: "CD-01",
      title: "Pipeline Without Validation",
      severity: "High",
      incident: "A CI workflow runs deployment steps without first validating manifests. A malformed Kubernetes manifest reaches the deployment stage.",
      impact: "Broken configuration consumes deployment time and may interrupt a production release.",
      broken: `name: application-ci
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Deploy without validation
        run: kubectl apply -f k8s/`,
      fixed: `name: application-ci
on:
  push:
    branches: [main]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Validate YAML
        run: yamllint k8s/
      - name: Validate Kubernetes manifests
        run: kubectl apply --dry-run=client -f k8s/
  deploy:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Deploy
        run: kubectl apply -f k8s/`,
      rootCause: "The workflow has no validation job and the deployment job does not depend on validation. Invalid manifests can reach deployment.",
      keywords: ["validation", "dry-run", "needs", "deploy", "job"],
      commands: [
        { command: "cat .github/workflows/application-ci.yml", output: "Only checkout and deploy steps are configured.\nNo YAML or Kubernetes manifest validation step exists.", purpose: "Inspect workflow stages." },
        { command: "yamllint k8s/", output: "deployment.yaml: syntax error: unexpected indentation", purpose: "Run manifest linting in the simulated runner." },
        { command: "kubectl apply --dry-run=client -f k8s/", output: "error: unable to decode deployment.yaml: invalid YAML document", purpose: "Reproduce client-side manifest validation failure." },
        { command: "ci-runner inspect deploy", output: "Deploy job has no dependency on a validation job.\nUnsafe workflow ordering detected.", purpose: "Inspect job dependency." },
        { command: "git diff -- .github/workflows/application-ci.yml", output: "Missing validate job and needs: validate dependency identified.", purpose: "Capture workflow correction evidence." }
      ],
      checks: ["YAML lint step exists", "Kubernetes dry-run validation exists", "Deploy job depends on validate", "Deployment runs only after validation passes"],
      expected: "Validation job runs first. Invalid manifests fail before deployment. Deploy starts only after validation succeeds.",
      prevention: "Require pull-request checks, manifest linting, schema validation, policy checks, and protected deployment approvals.",
      hint: "A deployment job should depend on a validation job using needs: validate.",
      question: "What prevents invalid manifests from reaching deployment?",
      choices: ["Add a validation job and make deployment depend on it", "Increase runner CPU", "Skip manifest checks", "Deploy before checkout"],
      answer: "Add a validation job and make deployment depend on it"
    },
    {
      id: "CD-02",
      title: "Helm Production Values Mismatch",
      severity: "High",
      incident: "A production Helm chart template reads image.tag, but the production values file defines image.version. Rendering produces an incomplete image reference.",
      impact: "The release cannot reliably deploy the intended application version and rollout is blocked.",
      broken: `replicaCount: 3
image:
  repository: example/payments
  version: "2.4.1"
  pullPolicy: IfNotPresent
service:
  port: 80
  targetPort: 8080`,
      fixed: `replicaCount: 3
image:
  repository: example/payments
  tag: "2.4.1"
  pullPolicy: IfNotPresent
service:
  port: 80
  targetPort: 8080`,
      rootCause: "The values file uses image.version, while the Helm template reads .Values.image.tag. The chart therefore renders an empty image tag.",
      keywords: ["image", "version", "tag", "values", "template"],
      commands: [
        { command: "helm lint ./payments", output: "[ERROR] templates/deployment.yaml: image tag is empty", purpose: "Validate chart structure." },
        { command: "helm template payments ./payments -f values-production.yaml", output: "Rendered image: example/payments:\nError: invalid image reference due to missing tag.", purpose: "Render production manifests." },
        { command: "grep -n 'image:' ./payments/templates/deployment.yaml", output: "image: {{ .Values.image.repository }}:{{ .Values.image.tag }}", purpose: "Inspect the template value key." },
        { command: "grep -n -A4 '^image:' values-production.yaml", output: "image:\n  repository: example/payments\n  version: \"2.4.1\"", purpose: "Compare production values." },
        { command: "helm status payments", output: "STATUS: failed\nRelease did not complete successfully.", purpose: "Inspect release state." }
      ],
      checks: ["values-production.yaml defines image.tag", "repository remains example/payments", "helm lint succeeds", "helm template renders example/payments:2.4.1"],
      expected: "Helm renders image example/payments:2.4.1. Lint passes and the intended production replica count is three.",
      prevention: "Validate all environment values files with helm lint and helm template in CI before approving releases.",
      hint: "Compare the exact key used by the template with the key in values-production.yaml.",
      question: "Why is the rendered Helm image tag empty?",
      choices: ["The values key is version but the template reads tag", "Kubernetes DNS is down", "The Deployment selector is invalid", "The CI runner has no memory"],
      answer: "The values key is version but the template reads tag"
    },
    {
      id: "CD-03",
      title: "Argo CD Desired-State Drift",
      severity: "Critical",
      incident: "A manual production change modifies replicas in the cluster, while Git still declares a different replica count. Argo CD reports the Application OutOfSync.",
      impact: "The live cluster no longer matches the reviewed Git configuration. Deployment state is unpredictable and auditability is reduced.",
      broken: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: storefront
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/example/platform-config.git
    targetRevision: main
    path: apps/storefront
  destination:
    server: https://kubernetes.default.svc
    namespace: storefront
  syncPolicy:
    automated:
      prune: false
      selfHeal: false`,
      fixed: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: storefront
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/example/platform-config.git
    targetRevision: main
    path: apps/storefront
  destination:
    server: https://kubernetes.default.svc
    namespace: storefront
  syncPolicy:
    automated:
      prune: false
      selfHeal: true`,
      rootCause: "A manual live-cluster change caused drift from Git desired state. Argo CD detects the difference and self-healing is disabled.",
      keywords: ["drift", "manual", "git", "desired", "selfheal", "self-heal"],
      commands: [
        { command: "argocd app get storefront", output: "Name: storefront\nSync Status: OutOfSync\nHealth Status: Healthy\nAutomated Self-Heal: Disabled", purpose: "Inspect Application sync and health." },
        { command: "argocd app diff storefront", output: "Git desired replicas: 3\nLive cluster replicas: 5\nDifference: spec.replicas", purpose: "Compare desired and live state." },
        { command: "kubectl get deployment storefront -n storefront", output: "NAME        READY   UP-TO-DATE   AVAILABLE\nstorefront  5/5     5            5", purpose: "Inspect live Deployment state." },
        { command: "git show main:apps/storefront/deployment.yaml", output: "spec:\n  replicas: 3\nGit declares three replicas.", purpose: "Inspect the source of truth." },
        { command: "argocd app sync storefront --dry-run", output: "Simulation: reconciliation would change live replicas from 5 to 3.", purpose: "Preview the intended reconciliation." }
      ],
      checks: ["Git desired state is reviewed and committed", "Application diff is understood", "Sync or approved self-heal policy is enabled", "Live replicas match Git desired replicas"],
      expected: "After approved reconciliation, live replicas match the Git value of three and Application sync status is Synced.",
      prevention: "Restrict direct production changes, review Git changes, enable appropriate self-heal policies, and monitor drift alerts.",
      hint: "Compare the replica count in Git with the live Deployment. Do not blindly sync before reviewing the diff.",
      question: "What creates the OutOfSync state in this incident?",
      choices: ["Manual live change differs from Git desired state", "The Helm chart is missing", "The CI runner is stopped", "The Service targetPort is wrong"],
      answer: "Manual live change differs from Git desired state"
    }
  ]
};

const stages = [
  "Incident Setup", "Reproduce", "Troubleshoot", "Root Cause",
  "Repair", "Before / After", "Verify", "Assessment", "Incident Report"
];

function evaluateRepair(s: Scenario, yaml: string) {
  const text = yaml.toLowerCase();
  if (s.id === "KML-01") return /matchlabels:\s*\n\s+app:\s*payments/.test(text) && /labels:\s*\n\s+app:\s*payments/.test(text);
  if (s.id === "KML-02") return /selector:\s*\n\s+app:\s*catalog\s/.test(text) && !/selector:\s*\n\s+app:\s*catalog-api/.test(text);
  if (s.id === "KML-03") return /name:\s*inventory-settings/.test(text) && /configmapref:\s*\n\s+name:\s*inventory-settings/.test(text);
  if (s.id === "TL-01") return /image:\s*nginx:1\.27/.test(text);
  if (s.id === "TL-02") return !text.includes("run-checkout-server") && /command:/.test(text);
  if (s.id === "TL-03") return /kind:\s*secret/.test(text) && /name:\s*database-credentials/.test(text) && /secretref:/.test(text) && !/db_password:\s*plaintext-production-password/.test(text);
  if (s.id === "CD-01") return /name:\s*validate/.test(text) && /dry-run=client/.test(text) && /needs:\s*validate/.test(text);
  if (s.id === "CD-02") return /tag:\s*["']?2\.4\.1/.test(text) && !/version:\s*["']?2\.4\.1/.test(text);
  if (s.id === "CD-03") return /selfheal:\s*true/.test(text);
  return false;
}

function keywordsCorrect(s: Scenario, value: string) {
  const normalized = value.toLowerCase();
  const matched = s.keywords.filter((word) => normalized.includes(word.toLowerCase()));
  return matched.length >= Math.min(2, s.keywords.length);
}

export default function CompletePracticalLab({ moduleName }: { moduleName: string }) {
  const list = scenarios[moduleName] ?? scenarios["Kubernetes Manifest Lab"];
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [yaml, setYaml] = useState(list[0].broken);
  const [reproduced, setReproduced] = useState(false);
  const [executed, setExecuted] = useState<number[]>([]);
  const [cause, setCause] = useState("");
  const [repairPassed, setRepairPassed] = useState(false);
  const [assessment, setAssessment] = useState("");
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [hintShown, setHintShown] = useState(false);
  const [notice, setNotice] = useState("Start by reading the incident and reproducing the failure.");

  const scenario = list[scenarioIndex];
  const commandCount = scenario.commands.length;
  const causePassed = keywordsCorrect(scenario, cause);
  const assessmentPassed = assessment === scenario.answer;
  const score = (reproduced ? 10 : 0)
    + Math.min(executed.length, commandCount) * (30 / commandCount)
    + (causePassed ? 20 : 0)
    + (repairPassed ? 20 : 0)
    + (assessmentPassed ? 20 : 0);

  const completed = reproduced && executed.length === commandCount && causePassed && repairPassed && assessmentPassed;

  function resetScenario() {
    setYaml(scenario.broken);
    setStage(0);
    setReproduced(false);
    setExecuted([]);
    setCause("");
    setRepairPassed(false);
    setAssessment("");
    setAssessmentSubmitted(false);
    setAttempts(0);
    setHintShown(false);
    setNotice("Scenario reset. Original broken configuration restored.");
  }

  function loadScenario(index: number) {
    setScenarioIndex(index);
    setStage(0);
    setYaml(list[index].broken);
    setReproduced(false);
    setExecuted([]);
    setCause("");
    setRepairPassed(false);
    setAssessment("");
    setAssessmentSubmitted(false);
    setAttempts(0);
    setHintShown(false);
    setNotice("New incident loaded. Read the incident details before reproducing it.");
  }

  function runReproduction() {
    const text = yaml.toLowerCase();
    let broken = false;
    if (scenario.id === "KML-01") broken = /app:\s*payment\s*$/.test(text) && !/app:\s*payments\s*$/.test(text);
    else if (scenario.id === "KML-02") broken = text.includes("catalog-api");
    else if (scenario.id === "KML-03") broken = text.includes("inventory-config") && text.includes("inventory-settings");
    else if (scenario.id === "TL-01") broken = text.includes("99.99-not-real");
    else if (scenario.id === "TL-02") broken = text.includes("run-checkout-server");
    else if (scenario.id === "TL-03") broken = text.includes("plaintext-production-password") || text.includes("db_password:");
    else if (scenario.id === "CD-01") broken = !text.includes("needs: validate") || !text.includes("dry-run=client");
    else if (scenario.id === "CD-02") broken = text.includes("version:") && !text.includes("tag:");
    else if (scenario.id === "CD-03") broken = text.includes("selfheal: false");

    if (!broken) {
      setNotice("The current editor content does not reproduce this incident. Restore the broken configuration or compare it with the incident setup.");
      return;
    }
    setReproduced(true);
    setStage(1);
    setNotice("Incident reproduced in the local simulator. The displayed failure evidence is simulated, not generated by a real cluster.");
  }

  function validateRepair() {
    setAttempts((value) => value + 1);
    const valid = evaluateRepair(scenario, yaml);
    setRepairPassed(valid);
    if (valid) {
      setNotice("Repair validation passed. Scenario-specific simulated recovery checks are now available.");
      setStage(5);
    } else {
      setNotice("Repair validation failed. Compare the editor with the expected corrected configuration and try again.");
    }
  }

  function submitAssessment() {
    setAssessmentSubmitted(true);
    setAttempts((value) => value + 1);
    setNotice(assessmentPassed ? "Correct assessment answer." : "Incorrect answer. Review the evidence and retry.");
  }

  function nextScenario() {
    loadScenario((scenarioIndex + 1) % list.length);
  }

  return (
    <main className="space-y-5 text-slate-100">
      <header className="rounded-xl border border-cyan-800 bg-slate-950 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-widest text-cyan-300">DEVOPS PRACTICAL WORKSPACE</p>
            <h1 className="mt-2 text-2xl font-bold">{moduleName}</h1>
            <p className="mt-2 text-xs text-amber-300">LOCAL SIMULATION ONLY — commands show scenario-specific expected output. They do not execute against a real cluster, CI runner, Helm installation, or Argo CD server.</p>
          </div>
          <button type="button" onClick={resetScenario} className="rounded-lg border border-slate-600 px-4 py-2 text-sm">Reset lab</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {list.map((item, index) => (
            <button key={item.id} type="button" onClick={() => loadScenario(index)} className={`rounded-lg border px-3 py-2 text-left text-xs ${index === scenarioIndex ? "border-cyan-400 bg-cyan-950 text-cyan-200" : "border-slate-700 bg-slate-900 text-slate-300"}`}>
              <span className="block font-bold">{item.id}</span>
              <span>{item.title}</span>
              <span className="block text-amber-300">{item.severity} severity</span>
            </button>
          ))}
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs font-bold text-cyan-300">{scenario.id} · INCIDENT SETUP</p>
          <h2 className="mt-2 text-xl font-bold">{scenario.title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">{scenario.incident}</p>
          <p className="mt-2 text-sm leading-6 text-rose-300">Business impact: {scenario.impact}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Practice score</p>
          <p className="mt-1 text-3xl font-bold tabular-nums">{Math.round(score)}<span className="text-sm text-slate-500">/100</span></p>
          <p className="mt-2 text-xs text-slate-400">Attempts: {attempts}</p>
          <p className="mt-1 text-xs text-slate-400">Commands: {executed.length}/{commandCount}</p>
        </div>
      </section>

      <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {stages.map((name, index) => (
          <button key={name} type="button" onClick={() => setStage(index)} className={`rounded-lg border px-3 py-3 text-xs font-semibold ${stage === index ? "border-cyan-400 bg-cyan-950 text-cyan-200" : "border-slate-800 bg-slate-900 text-slate-400"}`}>
            {index + 1}. {name}
          </button>
        ))}
      </nav>

      {stage === 0 && (
        <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="font-bold">1. Incident setup and broken configuration</h3>
          <p className="text-sm text-slate-300">Read the production incident. The following is the intentionally broken configuration supplied to reproduce the problem.</p>
          <pre className="max-h-96 overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-rose-200">{scenario.broken}</pre>
          <button type="button" onClick={() => { setYaml(scenario.broken); setNotice("Broken configuration loaded into the editor."); }} className="rounded-lg border border-slate-600 px-4 py-2 text-xs">Load broken configuration into editor</button>
          <button type="button" onClick={runReproduction} className="ml-2 rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950">Start / Reproduce Incident</button>
        </section>
      )}

      {stage === 1 && (
        <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="font-bold">2. Reproduce the error</h3>
          <p className="text-sm text-slate-300">Load the broken configuration, then reproduce the scenario. The simulator checks the relevant broken setting.</p>
          <textarea value={yaml} onChange={(event) => { setYaml(event.target.value); setRepairPassed(false); }} spellCheck={false} className="min-h-64 w-full rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-xs leading-6 text-emerald-200" />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={runReproduction} className="rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950">Run reproduction check</button>
            <button type="button" onClick={() => setYaml(scenario.broken)} className="rounded-lg border border-slate-600 px-4 py-2 text-xs">Restore broken YAML</button>
          </div>
          <p className="text-xs text-slate-400">{reproduced ? "Incident reproduction recorded in this practice session." : "Incident not reproduced yet."}</p>
        </section>
      )}

      {stage === 2 && (
        <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="font-bold">3. Troubleshooting terminal and evidence collection</h3>
          <p className="text-xs text-amber-300">Simulation: clicking Execute reveals the expected output for this incident. No command is sent to a real terminal.</p>
          <div className="grid gap-3 lg:grid-cols-2">
            {scenario.commands.map((item, index) => (
              <article key={item.command} className="rounded-lg border border-slate-700 bg-slate-950 p-3">
                <p className="text-xs text-cyan-300">$ {item.command}</p>
                <p className="mt-2 text-xs text-slate-400">{item.purpose}</p>
                <pre className="mt-3 min-h-20 whitespace-pre-wrap rounded bg-black p-3 text-xs leading-5 text-emerald-300">{executed.includes(index) ? item.output : "Not executed in this simulation. Click Execute to reveal expected evidence."}</pre>
                <button type="button" disabled={!reproduced} onClick={() => { setExecuted((old) => old.includes(index) ? old : [...old, index]); setNotice("Simulated command evidence displayed."); }} className="mt-3 rounded border border-slate-600 px-3 py-2 text-xs disabled:opacity-40">Execute command</button>
              </article>
            ))}
          </div>
          <p className="text-xs text-slate-400">Evidence collected: {executed.length}/{commandCount}</p>
          <button type="button" disabled={executed.length !== commandCount} onClick={() => setStage(3)} className="rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-40">Continue after collecting all evidence</button>
        </section>
      )}

      {stage === 3 && (
        <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="font-bold">4. Root cause analysis</h3>
          <div className="rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm leading-6 text-slate-300">{scenario.commands.filter((_, index) => executed.includes(index)).map((item) => item.output).join("\n\n")}</div>
          <p className="text-sm text-slate-300">Explain the actual root cause in your own words. Your explanation is checked against incident-specific evidence terms.</p>
          <textarea value={cause} onChange={(event) => setCause(event.target.value)} placeholder="Describe the root cause and the evidence that proves it..." className="min-h-28 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-white" />
          <button type="button" onClick={() => { setAttempts((value) => value + 1); setNotice(causePassed ? "Root cause explanation accepted." : "Root cause not accepted yet. Use the evidence and include the key mismatch or failure."); }} disabled={!cause.trim()} className="rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-40">Submit root cause</button>
          {cause.trim() && <p className={`text-sm ${causePassed ? "text-emerald-300" : "text-amber-300"}`}>{causePassed ? "Root cause evidence check: PASS" : "Root cause evidence check: NOT YET PASSED"}</p>}
          <button type="button" onClick={() => setHintShown((value) => !value)} className="rounded border border-amber-700 px-3 py-2 text-xs text-amber-300">Show / hide hint</button>
          {hintShown && <p className="rounded bg-amber-950/30 p-3 text-sm text-amber-200">{scenario.hint}</p>}
          <button type="button" disabled={!causePassed} onClick={() => setStage(4)} className="rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-40">Continue to repair</button>
        </section>
      )}

      {stage === 4 && (
        <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="font-bold">5. Fix the error in the editor</h3>
          <p className="text-sm text-slate-300">Edit the configuration yourself, or load the reference repair and inspect the difference. Then validate your configuration.</p>
          <textarea value={yaml} onChange={(event) => { setYaml(event.target.value); setRepairPassed(false); }} spellCheck={false} className="min-h-80 w-full rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-xs leading-6 text-emerald-200" />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setYaml(scenario.fixed)} className="rounded border border-emerald-700 px-4 py-2 text-xs text-emerald-300">Load reference fix</button>
            <button type="button" onClick={validateRepair} className="rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950">Validate my repair</button>
          </div>
          <p className={`text-sm ${repairPassed ? "text-emerald-300" : "text-slate-400"}`}>{repairPassed ? "Repair validation: PASS" : "Repair has not passed validation."}</p>
        </section>
      )}

      {stage === 5 && (
        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-rose-900 bg-slate-900 p-4">
            <h3 className="font-bold text-rose-300">6A. Before — broken configuration</h3>
            <pre className="mt-3 overflow-auto rounded-lg bg-slate-950 p-3 text-xs leading-5 text-rose-200">{scenario.broken}</pre>
          </article>
          <article className="rounded-xl border border-emerald-900 bg-slate-900 p-4">
            <h3 className="font-bold text-emerald-300">6B. After — corrected configuration</h3>
            <pre className="mt-3 overflow-auto rounded-lg bg-slate-950 p-3 text-xs leading-5 text-emerald-200">{scenario.fixed}</pre>
          </article>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 lg:col-span-2">
            <h3 className="font-bold">Expected recovery result</h3>
            <p className="mt-2 text-sm text-slate-300">{scenario.expected}</p>
            <p className="mt-3 text-xs text-slate-400">Your editor validation status: {repairPassed ? "PASS" : "NOT PASSED"}</p>
            <button type="button" disabled={!repairPassed} onClick={() => setStage(6)} className="mt-3 rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-40">Continue to final verification</button>
          </div>
        </section>
      )}

      {stage === 6 && (
        <section className="space-y-3 rounded-xl border border-emerald-900 bg-slate-900 p-4">
          <h3 className="font-bold text-emerald-300">7. Final verification</h3>
          <p className="text-sm text-slate-300">Run the following verification checklist in the simulation. These are expected results, not live command execution.</p>
          {scenario.checks.map((check, index) => (
            <div key={check} className="rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm"><span className="mr-2 text-emerald-400">✓</span>{check}</div>
          ))}
          <div className="rounded-lg border border-emerald-900 bg-emerald-950/20 p-3">
            <p className="text-xs font-bold text-emerald-300">EXPECTED OUTPUT</p>
            <pre className="mt-2 whitespace-pre-wrap text-xs leading-5 text-emerald-200">{scenario.expected}</pre>
          </div>
          <button type="button" onClick={() => setStage(7)} disabled={!repairPassed} className="rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-40">Continue to assessment</button>
        </section>
      )}

      {stage === 7 && (
        <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="font-bold">8. Practical assessment</h3>
          <p className="text-sm text-slate-300">{scenario.question}</p>
          <div className="space-y-2">
            {scenario.choices.map((choice) => (
              <button key={choice} type="button" onClick={() => { setAssessment(choice); setAssessmentSubmitted(false); }} className={`block w-full rounded-lg border p-3 text-left text-sm ${assessment === choice ? "border-cyan-400 bg-cyan-950" : "border-slate-700 bg-slate-950"}`}>{choice}</button>
            ))}
          </div>
          <button type="button" disabled={!assessment} onClick={submitAssessment} className="rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-40">Submit assessment</button>
          {assessmentSubmitted && <p className={`text-sm ${assessmentPassed ? "text-emerald-300" : "text-rose-300"}`}>{assessmentPassed ? "Correct answer — PASS." : "Incorrect answer — review the hint and retry."}</p>}
          <button type="button" onClick={() => { setAssessment(""); setAssessmentSubmitted(false); }} className="rounded border border-slate-600 px-3 py-2 text-xs">Retry assessment</button>
          <button type="button" disabled={!assessmentPassed} onClick={() => setStage(8)} className="ml-2 rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-40">Generate final incident report</button>
        </section>
      )}

      {stage === 8 && (
        <section className="space-y-4 rounded-xl border border-cyan-900 bg-slate-900 p-4">
          <h3 className="font-bold">9. Final incident report</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-950 p-3"><p className="text-xs text-slate-400">Incident</p><p className="mt-1 text-sm">{scenario.title}</p></div>
            <div className="rounded-lg bg-slate-950 p-3"><p className="text-xs text-slate-400">Severity</p><p className="mt-1 text-sm">{scenario.severity}</p></div>
            <div className="rounded-lg bg-slate-950 p-3"><p className="text-xs text-slate-400">Root cause</p><p className="mt-1 text-sm">{scenario.rootCause}</p></div>
            <div className="rounded-lg bg-slate-950 p-3"><p className="text-xs text-slate-400">Fix</p><p className="mt-1 text-sm">{repairPassed ? "Configuration validation passed." : "Not validated."}</p></div>
            <div className="rounded-lg bg-slate-950 p-3"><p className="text-xs text-slate-400">Verification</p><p className="mt-1 text-sm">{scenario.expected}</p></div>
            <div className="rounded-lg bg-slate-950 p-3"><p className="text-xs text-slate-400">Prevention</p><p className="mt-1 text-sm">{scenario.prevention}</p></div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-950 p-4">
            <p className="text-xs font-bold text-cyan-300">FINAL STATUS</p>
            <p className="mt-2 text-xl font-bold">{completed ? "PRACTICE COMPLETED" : "PRACTICE INCOMPLETE"}</p>
            <p className="mt-1 text-sm text-slate-300">Score: {Math.round(score)}/100 · Commands: {executed.length}/{commandCount} · Attempts: {attempts}</p>
            <p className="mt-2 text-xs text-slate-400">This report describes a local learning simulation. It is not evidence of a production change.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={resetScenario} className="rounded border border-slate-600 px-4 py-2 text-xs">Reset / Retry scenario</button>
            <button type="button" onClick={nextScenario} className="rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950">Next scenario</button>
            <a href="/yaml-config-playground" className="rounded border border-cyan-700 px-4 py-2 text-xs text-cyan-200">Back to Learning Modules</a>
          </div>
        </section>
      )}

      <div role="status" aria-live="polite" className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300">{notice}</div>
      <footer className="flex flex-wrap items-center justify-between gap-2">
        <a href="/yaml-config-playground" className="text-sm text-cyan-300 hover:underline">← Back to Learning Modules</a>
        <div className="flex gap-2">
          <button type="button" disabled={stage === 0} onClick={() => setStage((value) => Math.max(0, value - 1))} className="rounded border border-slate-700 px-3 py-2 text-xs disabled:opacity-40">Previous step</button>
          <button type="button" disabled={stage === 8} onClick={() => setStage((value) => Math.min(8, value + 1))} className="rounded border border-slate-700 px-3 py-2 text-xs disabled:opacity-40">Next step</button>
        </div>
      </footer>
    </main>
  );
}