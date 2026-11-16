"use client";

import React, { useMemo, useState } from "react";

type Lab = {
  id: string;
  module: string;
  title: string;
  incident: string;
  severity: string;
  broken: string;
  required: string[];
  commands: string[];
  evidence: Record<string,string>;
  hint: string[];
  root: string;
  expected: string;
  final: string;
  exam: string;
};

const LABS: Lab[] = [
{
 id:"KML-01", module:"Kubernetes Manifest Lab", title:"Deployment selector mismatch",
 incident:"Deployment creates no available Pods because its selector does not match the Pod template labels.",
 severity:"High",
 broken:`apiVersion: apps/v1
kind: Deployment
metadata:
  name: payments
spec:
  replicas: 2
  selector:
    matchLabels:
      app: payment
  template:
    metadata:
      labels:
        app: payments
    spec:
      containers:
        - name: app
          image: nginx:1.27`,
 required:["app: payments","matchLabels:","app: payments","replicas: 2"],
 commands:["kubectl get deployments","kubectl get pods --show-labels","kubectl describe deployment payments","kubectl get events --sort-by=.metadata.creationTimestamp"],
 evidence:{
  "kubectl get deployments":"NAME       READY   UP-TO-DATE   AVAILABLE\npayments   0/2     0            0",
  "kubectl get pods --show-labels":"No matching Pods are controlled by the expected selector.\nInspect Deployment selector and template labels.",
  "kubectl describe deployment payments":"Selector: app=payment\nPod Template Labels: app=payments\nReplicaSet cannot select the intended Pod template.",
  "kubectl get events --sort-by=.metadata.creationTimestamp":"Warning  FailedCreate  Deployment selector does not match Pod template labels."
 },
 hint:["Compare spec.selector.matchLabels with spec.template.metadata.labels.","The values must match exactly."],
 root:"The Deployment selector uses app=payment while the Pod template label is app=payments.",
 expected:"Deployment becomes available with 2/2 replicas and matching Pods.",
 final:"Deployment manifest repaired. Selector and Pod labels match. Expected replica count: 2.",
 exam:"Repair the selector without changing the application name."
},
{
 id:"KML-02", module:"Kubernetes Manifest Lab", title:"Service selector routes to no Pods",
 incident:"The Service exists, but requests have no ready backend endpoints.",
 severity:"High",
 broken:`apiVersion: v1
kind: Service
metadata:
  name: catalog
spec:
  selector:
    app: catalogue
  ports:
    - port: 80
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
        - name: web
          image: nginx:1.27
          ports:
            - containerPort: 8080`,
 required:["selector:","app: catalog","targetPort: 8080","containerPort: 8080"],
 commands:["kubectl get svc catalog","kubectl get endpoints catalog","kubectl get pods --show-labels","kubectl describe svc catalog"],
 evidence:{
  "kubectl get svc catalog":"NAME      TYPE        CLUSTER-IP      PORT(S)\ncatalog   ClusterIP   10.96.20.10     80/TCP",
  "kubectl get endpoints catalog":"NAME      ENDPOINTS\ncatalog   <none>",
  "kubectl get pods --show-labels":"catalog Pods found with label app=catalog.",
  "kubectl describe svc catalog":"Selector: app=catalogue\nNo Pod labels match the Service selector."
 },
 hint:["Inspect Service selector and Pod labels.","The Service selector must use the Deployment's Pod label."],
 root:"Service selector app=catalogue does not match Pod label app=catalog.",
 expected:"Service endpoints list the ready Pod IP addresses.",
 final:"Service selector repaired. Backend endpoints are expected to become available.",
 exam:"Restore Service-to-Pod routing by correcting only the selector."
},
{
 id:"KML-03", module:"Kubernetes Manifest Lab", title:"ConfigMap reference missing",
 incident:"Application Pods cannot start because the referenced ConfigMap name is incorrect.",
 severity:"Medium",
 broken:`apiVersion: v1
kind: ConfigMap
metadata:
  name: app-settings
data:
  APP_MODE: production
  LOG_LEVEL: info
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: config-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: config-demo
  template:
    metadata:
      labels:
        app: config-demo
    spec:
      containers:
        - name: app
          image: nginx:1.27
          envFrom:
            - configMapRef:
                name: app-setting`,
 required:["name: app-settings","configMapRef:","name: app-settings","APP_MODE: production"],
 commands:["kubectl get configmaps","kubectl describe pod config-demo","kubectl get events --sort-by=.metadata.creationTimestamp","kubectl get pods"],
 evidence:{
  "kubectl get configmaps":"NAME           DATA\napp-settings   2",
  "kubectl describe pod config-demo":"Warning: configMap app-setting not found.\nContainer cannot initialize environment variables.",
  "kubectl get events --sort-by=.metadata.creationTimestamp":"Warning  Failed  Error: configmap app-setting not found",
  "kubectl get pods":"NAME           READY   STATUS\nconfig-demo    0/1     CreateContainerConfigError"
 },
 hint:["Compare the ConfigMap metadata.name with envFrom.configMapRef.name.","Resource names must match exactly."],
 root:"Deployment references app-setting but the actual ConfigMap is app-settings.",
 expected:"Pod starts successfully and receives APP_MODE and LOG_LEVEL.",
 final:"ConfigMap reference corrected. Pod configuration is expected to initialize.",
 exam:"Fix the reference while preserving the ConfigMap data."
},
{
 id:"TL-01", module:"Troubleshooting Lab", title:"Invalid container image tag",
 incident:"A production rollout is stuck because the requested image tag does not exist.",
 severity:"Critical",
 broken:`apiVersion: apps/v1
kind: Deployment
metadata:
  name: checkout
spec:
  replicas: 2
  selector:
    matchLabels:
      app: checkout
  template:
    metadata:
      labels:
        app: checkout
    spec:
      containers:
        - name: checkout
          image: nginx:version-does-not-exist
          ports:
            - containerPort: 80`,
 required:["image: nginx:1.27","replicas: 2","app: checkout"],
 commands:["kubectl get pods","kubectl describe pod checkout","kubectl get events --sort-by=.metadata.creationTimestamp","kubectl rollout status deployment/checkout"],
 evidence:{
  "kubectl get pods":"NAME                       READY   STATUS\ncheckout-xxxxx             0/1     ImagePullBackOff",
  "kubectl describe pod checkout":"Warning  Failed  Failed to pull image nginx:version-does-not-exist\nError: manifest unknown",
  "kubectl get events --sort-by=.metadata.creationTimestamp":"Failed to pull image. Back-off pulling image.",
  "kubectl rollout status deployment/checkout":"Waiting for deployment checkout rollout to finish: 0 of 2 updated replicas are available."
 },
 hint:["Inspect the image name and tag in the Pod description.","Use a valid image tag available to the lab."],
 root:"The image tag does not exist in the registry, causing ImagePullBackOff.",
 expected:"Pods pull the valid image and become Ready.",
 final:"Image reference repaired. Rollout is expected to complete with 2/2 replicas.",
 exam:"Resolve the image pull failure and preserve the Deployment selector."
},
{
 id:"TL-02", module:"Troubleshooting Lab", title:"Container command exits immediately",
 incident:"The container exits repeatedly because its configured command terminates immediately.",
 severity:"High",
 broken:`apiVersion: v1
kind: Pod
metadata:
  name: worker
spec:
  restartPolicy: Always
  containers:
    - name: worker
      image: busybox:1.36
      command: ["sh", "-c", "exit 1"]`,
 required:["command:","sleep 3600","restartPolicy: Always","image: busybox:1.36"],
 commands:["kubectl get pods","kubectl describe pod worker","kubectl logs worker --previous","kubectl get events --sort-by=.metadata.creationTimestamp"],
 evidence:{
  "kubectl get pods":"NAME      READY   STATUS\nworker    0/1     CrashLoopBackOff",
  "kubectl describe pod worker":"Last State: Terminated\nReason: Error\nExit Code: 1\nRestart Count: 5",
  "kubectl logs worker --previous":"Previous container process exited with status 1.",
  "kubectl get events --sort-by=.metadata.creationTimestamp":"Back-off restarting failed container worker."
 },
 hint:["Inspect the command executed by the container.","The configured process exits with status 1. Replace it with a process that stays running."],
 root:"The shell command explicitly exits with code 1, so Kubernetes repeatedly restarts the container.",
 expected:"The container remains running and Pod becomes Ready.",
 final:"Container command repaired. Restart loop is expected to stop.",
 exam:"Replace the failing command with a long-running process."
},
{
 id:"TL-03", module:"Troubleshooting Lab", title:"Secret exposed in workload manifest",
 incident:"A workload contains a plaintext credential in an environment variable. Remove the exposed value and reference a Kubernetes Secret.",
 severity:"Critical",
 broken:`apiVersion: apps/v1
kind: Deployment
metadata:
  name: billing
spec:
  replicas: 1
  selector:
    matchLabels:
      app: billing
  template:
    metadata:
      labels:
        app: billing
    spec:
      containers:
        - name: billing
          image: nginx:1.27
          env:
            - name: DATABASE_PASSWORD
              value: "PlainText-Password-123"`,
 required:["secretKeyRef:","name: billing-db","key: password","DATABASE_PASSWORD"],
 commands:["kubectl get deployments","kubectl describe deployment billing","kubectl get secrets","kubectl get events"],
 evidence:{
  "kubectl get deployments":"NAME      READY\nbilling   1/1",
  "kubectl describe deployment billing":"Environment:\nDATABASE_PASSWORD: Plaintext value configured directly in the manifest.\nSecurity finding: credential exposed in workload configuration.",
  "kubectl get secrets":"NAME         TYPE\ntls-secret   kubernetes.io/tls\nbilling-db   Opaque",
  "kubectl get events":"No scheduling failure. Security inspection identified a plaintext credential."
 },
 hint:["Do not put the credential value in the Deployment YAML.","Use valueFrom.secretKeyRef with Secret name billing-db and key password."],
 root:"The database password is hard-coded in a Deployment manifest instead of being sourced from a Secret.",
 expected:"Deployment references the Secret key; plaintext credential is absent from the manifest.",
 final:"Credential exposure remediated in the manifest. Confirm Secret access permissions separately.",
 exam:"Replace the plaintext environment value with a Secret key reference."
},
{
 id:"CD-01", module:"CI/CD and GitOps Lab", title:"Pipeline deploys without validation",
 incident:"The pipeline attempts deployment without validating the Kubernetes manifest first.",
 severity:"High",
 broken:`name: deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: kubectl apply -f k8s/`,
 required:["name: Validate manifests","kubectl apply --dry-run=client -f k8s/","name: Deploy","kubectl apply -f k8s/"],
 commands:["cat .github/workflows/deploy.yml","git status --short","git diff -- .github/workflows/deploy.yml","kubectl apply --dry-run=client -f k8s/"],
 evidence:{
  "cat .github/workflows/deploy.yml":"Workflow contains checkout and deploy steps. No manifest validation step exists.",
  "git status --short":" M .github/workflows/deploy.yml",
  "git diff -- .github/workflows/deploy.yml":"No validation command is configured before deployment.",
  "kubectl apply --dry-run=client -f k8s/":"Simulation: validation command can be added as a pipeline gate before deployment."
 },
 hint:["Add a validation step after checkout and before Deploy.","Use kubectl apply --dry-run=client -f k8s/."],
 root:"The workflow has no manifest validation gate before deployment.",
 expected:"Pipeline validates manifests before the deployment step runs.",
 final:"Pipeline validation gate added to the workflow configuration.",
 exam:"Add a manifest validation step before the deployment command."
},
{
 id:"CD-02", module:"CI/CD and GitOps Lab", title:"Helm production values misconfigured",
 incident:"The production release uses one replica and an incorrect image tag.",
 severity:"High",
 broken:`replicaCount: 1
image:
  repository: nginx
  tag: latest
  pullPolicy: Always
service:
  type: ClusterIP
  port: 80
resources:
  requests:
    cpu: 100m
    memory: 128Mi`,
 required:["replicaCount: 3","tag: \"1.27\"","pullPolicy: IfNotPresent","cpu: 200m","memory: 256Mi"],
 commands:["helm list -A","helm get values checkout -n production","helm get manifest checkout -n production","helm status checkout -n production"],
 evidence:{
  "helm list -A":"NAME      NAMESPACE    REVISION   STATUS\ncheckout  production   4          deployed",
  "helm get values checkout -n production":"replicaCount: 1\nimage.tag: latest",
  "helm get manifest checkout -n production":"Rendered Deployment contains one replica and image nginx:latest.",
  "helm status checkout -n production":"Release: checkout\nNamespace: production\nStatus: deployed\nConfiguration review: production values do not meet release policy."
 },
 hint:["Compare replicaCount and image tag with production requirements.","Use three replicas and a pinned image tag."],
 root:"Production Helm values use one replica and the mutable latest image tag.",
 expected:"Rendered Helm manifest uses three replicas and pinned image nginx:1.27.",
 final:"Production Helm values repaired. Review rendered manifests before applying a real release.",
 exam:"Correct replica count, image tag, pull policy and resource request values."
},
{
 id:"CD-03", module:"CI/CD and GitOps Lab", title:"Argo CD desired state drift",
 incident:"The live workload has drifted from Git desired state and requires reconciliation.",
 severity:"High",
 broken:`apiVersion: apps/v1
kind: Deployment
metadata:
  name: storefront
spec:
  replicas: 1
  selector:
    matchLabels:
      app: storefront
  template:
    metadata:
      labels:
        app: storefront
    spec:
      containers:
        - name: storefront
          image: nginx:latest`,
 required:["replicas: 3","image: nginx:1.27","app: storefront"],
 commands:["argocd app get storefront","argocd app diff storefront","argocd app history storefront","kubectl get deployment storefront"],
 evidence:{
  "argocd app get storefront":"Name: storefront\nSync Status: OutOfSync\nHealth Status: Healthy",
  "argocd app diff storefront":"- replicas: 1\n+ replicas: 3\n- image: nginx:latest\n+ image: nginx:1.27",
  "argocd app history storefront":"Revision 12: previous desired state\nRevision 13: current Git desired state",
  "kubectl get deployment storefront":"NAME         READY   UP-TO-DATE\nstorefront   1/1     1"
 },
 hint:["Compare the manifest in Git with the live workload.","Restore the Git desired replica count and pinned image tag; then reconcile through Argo CD."],
 root:"The Git manifest has drifted from the required desired state: replica count and image tag are incorrect.",
 expected:"Git desired state specifies three replicas and nginx:1.27. Argo CD can reconcile the live state.",
 final:"Git desired-state manifest repaired. A connected Argo CD controller is required for real reconciliation.",
 exam:"Repair the Git manifest and verify the expected Argo CD diff."
}
];


// Lab-specific root cause assessment.
function evaluateLabRootCause(labId: string, answer: string) {
  const text = answer.toLowerCase().replace(/\s+/g, " ").trim();

  const rules: Record<string, string[][]> = {
    "KML-01": [["selector"], ["payment"], ["payments"], ["label"]],
    "KML-02": [["service"], ["selector"], ["catalogue"], ["catalog"], ["pod"]],
    "KML-03": [["configmap"], ["app-setting"], ["app-settings"], ["reference", "name"]],
    "TL-01": [["image"], ["tag"], ["does not exist", "invalid", "not found", "manifest unknown"], ["imagepullbackoff", "pull"]],
    "TL-02": [["command"], ["exit"], ["1", "one"], ["restart", "crashloopbackoff"]],
    "TL-03": [["plaintext", "plain text", "hard-coded", "hardcoded"], ["password", "credential"], ["secret"], ["secretkeyref", "secret key"]],
    "CD-01": [["validation", "validate"], ["before", "prior", "pre-deploy"], ["deploy", "deployment"], ["pipeline", "workflow"]],
    "CD-02": [["replica"], ["latest"], ["tag", "image"], ["production", "resource", "pull policy"]],
    "CD-03": [["git", "desired state"], ["drift", "outofsync", "out of sync"], ["replica"], ["image", "tag"]]
  };

  const groups = rules[labId];
  if (!groups) return { valid: false, missing: ["Unknown lab"] };

  const missing = groups
    .filter(group => !group.some(term => text.includes(term)))
    .map(group => group.join(" / "));

  return {
    valid: text.length >= 15 && missing.length === 0,
    missing
  };
}

// Structural validation for all nine lab YAML configurations.
function validateLabRepair(labId: string, yaml: string): string[] {
  const errors: string[] = [];
  const source = yaml.replace(/\r\n/g, "\n");
  const docs = source.split(/^\s*---\s*$/m);

  const has = (pattern: string, input = source) =>
    new RegExp(pattern, "im").test(input);

  switch (labId) {
    case "KML-01": {
      if (!has("selector:\\s*\\n\\s*matchLabels:\\s*\\n\\s*app:\\s*payments\\s*(?:\\n|$)"))
        errors.push("Deployment selector.matchLabels.app must be payments.");

      if (!has("template:\\s*\\n\\s*metadata:\\s*\\n\\s*labels:\\s*\\n\\s*app:\\s*payments\\s*(?:\\n|$)"))
        errors.push("Pod template metadata.labels.app must be payments.");

      if (!has("replicas:\\s*2\\s*(?:\\n|$)"))
        errors.push("Deployment replicas must be 2.");
      break;
    }

    case "KML-02": {
      const service = docs[0] || "";
      const deployment = docs[1] || "";

      if (!has("selector:\\s*\\n\\s*app:\\s*catalog\\s*(?:\\n|$)", service))
        errors.push("Service selector.app must be catalog.");

      if (!has("template:\\s*\\n\\s*metadata:\\s*\\n\\s*labels:\\s*\\n\\s*app:\\s*catalog\\s*(?:\\n|$)", deployment))
        errors.push("Deployment Pod template label must be catalog.");

      if (!has("targetPort:\\s*8080\\s*(?:\\n|$)", service))
        errors.push("Service targetPort must be 8080.");

      if (!has("containerPort:\\s*8080\\s*(?:\\n|$)", deployment))
        errors.push("Container port must be 8080.");
      break;
    }

    case "KML-03": {
      const configMap = docs[0] || "";
      const deployment = docs[1] || "";

      if (!has("kind:\\s*ConfigMap", configMap) ||
          !has("metadata:\\s*\\n\\s*name:\\s*app-settings\\s*(?:\\n|$)", configMap))
        errors.push("ConfigMap metadata.name must be app-settings.");

      if (!has("configMapRef:\\s*\\n\\s*name:\\s*app-settings\\s*(?:\\n|$)", deployment))
        errors.push("Deployment configMapRef.name must be app-settings.");

      if (!has("APP_MODE:\\s*production", configMap))
        errors.push("ConfigMap must preserve APP_MODE: production.");
      break;
    }

    case "TL-01": {
      if (!has("image:\\s*['\"]?nginx:1\\.27['\"]?\\s*(?:\\n|$)"))
        errors.push("Container image must be nginx:1.27.");

      if (!has("replicas:\\s*2\\s*(?:\\n|$)"))
        errors.push("Deployment must preserve 2 replicas.");

      if (!has("selector:\\s*\\n\\s*matchLabels:\\s*\\n\\s*app:\\s*checkout"))
        errors.push("Deployment selector must preserve app: checkout.");

      if (!has("template:\\s*\\n\\s*metadata:\\s*\\n\\s*labels:\\s*\\n\\s*app:\\s*checkout"))
        errors.push("Pod template label must preserve app: checkout.");
      break;
    }

    case "TL-02": {
      if (!has("command:\\s*(?:\\[[^\\]]*sleep\\s+3600[^\\]]*\\]|[^\\n]*sleep\\s+3600)"))
        errors.push("Container command must run sleep 3600.");

      if (has("command:[\\s\\S]{0,180}exit\\s+1"))
        errors.push("Remove the failing exit 1 command.");

      if (!has("restartPolicy:\\s*Always"))
        errors.push("restartPolicy must remain Always.");

      if (!has("image:\\s*['\"]?busybox:1\\.36['\"]?"))
        errors.push("Container image must remain busybox:1.36.");
      break;
    }

    case "TL-03": {
      const envStart = source.search(/^\s*env:\s*$/m);
      const envBlock = envStart >= 0 ? source.slice(envStart) : "";
      const match = envBlock.match(
        /-\s*name:\s*DATABASE_PASSWORD([\s\S]*?)(?=\n\s*-\s*name:|\n\s*[a-zA-Z][\w-]*:|$)/i
      );

      if (!match) {
        errors.push("DATABASE_PASSWORD environment variable is missing.");
      } else {
        const entry = match[1];

        if (!/valueFrom:\s*[\s\S]*?secretKeyRef:/i.test(entry))
          errors.push("DATABASE_PASSWORD must use valueFrom.secretKeyRef.");

        if (!/secretKeyRef:\s*[\s\S]*?name:\s*billing-db/i.test(entry))
          errors.push("Secret reference name must be billing-db.");

        if (!/secretKeyRef:\s*[\s\S]*?key:\s*password/i.test(entry))
          errors.push("Secret key must be password.");

        if (/^\s*value\s*:/im.test(entry))
          errors.push("Remove the plaintext value from DATABASE_PASSWORD.");
      }

      if (/PlainText-Password-123/i.test(source))
        errors.push("The exposed plaintext credential must not remain.");
      break;
    }

    case "CD-01": {
      const validateName = source.indexOf("name: Validate manifests");
      const validateCommand = source.indexOf("kubectl apply --dry-run=client -f k8s/");
      const deployName = source.indexOf("name: Deploy");
      const deployCommand = source.indexOf("kubectl apply -f k8s/");

      if (validateName < 0) errors.push("Add the Validate manifests step.");
      if (validateCommand < 0) errors.push("Add the client-side dry-run validation command.");
      if (deployName < 0) errors.push("Preserve the Deploy step.");
      if (deployCommand < 0) errors.push("Preserve the deployment command.");

      if (validateName >= 0 && deployName >= 0 && validateName >= deployName)
        errors.push("Validation step must appear before Deploy.");

      if (validateCommand >= 0 && deployCommand >= 0 && validateCommand >= deployCommand)
        errors.push("Validation command must execute before deployment.");

      if (validateName >= 0 && validateCommand >= 0 && validateCommand < validateName)
        errors.push("Validation command must follow its validation step name.");
      break;
    }

    case "CD-02": {
      if (!has("replicaCount:\\s*3\\s*(?:\\n|$)"))
        errors.push("replicaCount must be 3.");

      if (!has("tag:\\s*['\"]?1\\.27['\"]?\\s*(?:\\n|$)"))
        errors.push("Image tag must be 1.27.");

      if (!has("pullPolicy:\\s*IfNotPresent\\s*(?:\\n|$)"))
        errors.push("Image pullPolicy must be IfNotPresent.");

      if (!has("cpu:\\s*['\"]?200m['\"]?\\s*(?:\\n|$)"))
        errors.push("CPU request must be 200m.");

      if (!has("memory:\\s*['\"]?256Mi['\"]?\\s*(?:\\n|$)"))
        errors.push("Memory request must be 256Mi.");
      break;
    }

    case "CD-03": {
      if (!has("replicas:\\s*3\\s*(?:\\n|$)"))
        errors.push("Desired replicas must be 3.");

      if (!has("image:\\s*['\"]?nginx:1\\.27['\"]?\\s*(?:\\n|$)"))
        errors.push("Desired image must be nginx:1.27.");

      if (!has("selector:\\s*\\n\\s*matchLabels:\\s*\\n\\s*app:\\s*storefront"))
        errors.push("Deployment selector must preserve app: storefront.");

      if (!has("template:\\s*\\n\\s*metadata:\\s*\\n\\s*labels:\\s*\\n\\s*app:\\s*storefront"))
        errors.push("Pod template label must preserve app: storefront.");
      break;
    }

    default:
      errors.push("No structural validation rule exists for this lab.");
  }

  return errors;
}
const COMMANDS = Array.from(new Set(LABS.flatMap(x => x.commands)));

type YamlPracticalLabWorkspaceProps = {
  moduleName?: string;
  module?: string;
  title?: string;
  activeModule?: string;
  onLoadExample?: (yaml: string) => void;
};

export default function YamlPracticalLabWorkspace(props: YamlPracticalLabWorkspaceProps) {
 const incoming = String(props?.moduleName || props?.module || props?.title || props?.activeModule || "");
 const initialModule = incoming.toLowerCase().includes("troubleshoot") ? "Troubleshooting Lab" :
   (incoming.toLowerCase().includes("ci/cd") || incoming.toLowerCase().includes("gitops")) ? "CI/CD and GitOps Lab" :
   "Kubernetes Manifest Lab";

 const [moduleName,setModuleName] = useState(initialModule);
 const moduleLabs = useMemo(() => LABS.filter(x => x.module === moduleName),[moduleName]);
 const [index,setIndex] = useState(0);
 const lab = moduleLabs[Math.min(index,moduleLabs.length-1)] || LABS[0];
 const [yaml,setYaml] = useState(lab.broken);
 const [terminal,setTerminal] = useState("Lab ready. Choose Reproduce to start the incident.");
 const [command,setCommand] = useState(lab.commands[0]);
 const [ran,setRan] = useState<string[]>([]);
 const [hints,setHints] = useState(0);
 const [attempts,setAttempts] = useState(0);
 const [failed,setFailed] = useState(0);
 const [reproduced,setReproduced] = useState(false);
 const [verified,setVerified] = useState(false);
 const [examDone,setExamDone] = useState(false);
 const [rootAnswer,setRootAnswer] = useState("");
 const [rootChecked,setRootChecked] = useState(false);
 const [completed,setCompleted] = useState<string[]>([]);
 const [stage,setStage] = useState("Reproduce");

 const reset = (nextLab = lab) => {
   setYaml(nextLab.broken); setTerminal("Lab reset. Broken configuration restored.");
   setCommand(nextLab.commands[0]); setRan([]); setHints(0); setAttempts(0);
   setFailed(0); setReproduced(false); setVerified(false); setExamDone(false);
   setRootAnswer(""); setRootChecked(false); setStage("Reproduce");
 };

 const switchModule = (name:string) => {
   setModuleName(name); setIndex(0);
   const first = LABS.find(x => x.module === name)!;
   reset(first);
 };

 const reproduce = () => {
   setReproduced(true); setVerified(false); setStage("Investigate");
   setTerminal(">>> LAB APPLY\nApplying broken configuration...\nWarning: simulated lab incident reproduced.\nIncident: "+lab.incident+"\nStatus: FAILURE reproduced.\n\nLOCAL LAB SIMULATION — no external cluster or pipeline was contacted.");
 };

 const runCommand = () => {
    const key = command.trim();

    if (!reproduced) {
      setTerminal("Reproduce the incident before running diagnostic commands.");
      return;
    }

    if (!lab.commands.includes(key)) {
      setTerminal("Command rejected. Choose a diagnostic command listed for this lab.");
      return;
    }

    const output = lab.evidence[key];

    if (!output) {
      setTerminal("No simulated evidence is configured for this command.");
      return;
    }

    setRan(old => old.includes(key) ? old : [...old,key]);
    setStage("Investigate");
    setTerminal(">>> "+key+"\n"+output+
      "\n\nLOCAL LAB SIMULATION — output is generated by this browser lab, not a live cluster.");
  };
  const checkRoot = () => {
    setRootChecked(false);

    if (!reproduced) {
      setTerminal("Reproduce the incident and inspect its evidence before submitting root cause.");
      return;
    }

    const result = evaluateLabRootCause(lab.id, rootAnswer);

    if (result.valid) {
      setRootChecked(true);
      setStage("Repair");
      setTerminal("ROOT-CAUSE ASSESSMENT: PASS\nYour explanation includes the required technical concepts for this incident.\nContinue to Repair.");
    } else {
      setFailed(x=>x+1);
      setTerminal("ROOT-CAUSE ASSESSMENT: NOT PASSED\nMissing concepts:\n- "+
        result.missing.join("\n- ")+
        "\n\nReview the diagnostic evidence and submit a more specific explanation.");
    }
  };
  const checkFix = () => {
    setAttempts(x=>x+1);

    if (!reproduced) {
      setTerminal("Reproduce the incident before validating a repair.");
      return;
    }

    const errors = validateLabRepair(lab.id, yaml);

    if (errors.length === 0) {
      setVerified(true);
      setStage("Verify");
      setTerminal(">>> STRUCTURAL VALIDATION: PASS\nAll lab-specific YAML repair checks passed.\n>>> SIMULATED LAB RERUN: PASS\n"+lab.expected+
        "\n\nLOCAL LAB SIMULATION — no external infrastructure was contacted.");
    } else {
      setFailed(x=>x+1);
      setVerified(false);
      setTerminal(">>> STRUCTURAL VALIDATION: FAIL\nRepair checks that still need attention:\n- "+
        errors.join("\n- ")+
        "\n\nCorrect the specified YAML fields and retry.");
    }
  };
  const finish = () => {
    const missingSteps: string[] = [];

    if (!reproduced) missingSteps.push("Reproduce the incident.");
    if (ran.length === 0) missingSteps.push("Run at least one valid diagnostic command.");
    if (!rootChecked) missingSteps.push("Pass the lab-specific root-cause assessment.");
    if (!verified) missingSteps.push("Pass structural YAML repair validation.");

    if (missingSteps.length > 0) {
      setTerminal("ASSESSMENT INCOMPLETE\nRequired steps:\n- "+missingSteps.join("\n- "));
      return;
    }

    setExamDone(true);
    setStage("Assessment");
    setCompleted(old=>old.includes(lab.id)?old:[...old,lab.id]);

    setTerminal(">>> PRACTICAL ASSESSMENT: PASSED\nLab: "+lab.title+
      "\nIncident reproduced: YES"+
      "\nValid diagnostic commands executed: "+ran.length+
      "\nRoot cause assessment: CORRECT"+
      "\nStructural repair validation: PASS"+
      "\nRecovery verification: PASS"+
      "\nFailed attempts: "+failed+
      "\nRepair attempts: "+attempts+
      "\n\nFINAL OUTPUT\n"+lab.final+
      "\n\nLOCAL LAB SIMULATION — no live infrastructure was changed.");
  };
  const next = () => {
   if (!examDone) { setTerminal("Complete the practical assessment before moving to the next lab."); return; }
   const nextIndex = (index+1)%moduleLabs.length;
   setIndex(nextIndex); reset(moduleLabs[nextIndex]);
 };

 const progress = completed.filter(id=>moduleLabs.some(x=>x.id===id)).length;
 const score = Math.max(0,100-(failed*8)-(hints*3));

 return (
  <div className="w-full space-y-4 text-sm">
   <div className="rounded-xl border border-amber-400/50 bg-amber-500/10 p-3">
    <div className="font-bold">LOCAL LAB SIMULATION</div>
    <div>No live Kubernetes cluster, CI runner, Helm release or Argo CD controller is connected by this browser workspace. Commands and recovery outputs below are incident-specific simulated lab results.</div>
   </div>


   <div className="rounded-xl border p-4 space-y-3">
    <div className="flex flex-wrap items-center justify-between gap-2">
     <div><div className="font-bold text-lg">{lab.id} — {lab.title}</div><div className="text-xs opacity-70">{lab.module} · Severity: {lab.severity}</div></div>
     <div className="text-xs">Completed {progress}/{moduleLabs.length} · Score {score}/100</div>
    </div>
    <div className="flex flex-wrap gap-2">
     {["Reproduce","Investigate","Troubleshoot","Repair","Verify","Practice","Assessment"].map(s=>
      <span key={s} className={"rounded-full border px-2 py-1 text-xs "+(stage===s?"bg-blue-600 text-white":"")}>{s}</span>
     )}
    </div>
    <div className="rounded-lg bg-black/5 dark:bg-white/5 p-3">
     <div className="font-semibold">INCIDENT</div>{lab.incident}
    </div>
    <div className="flex flex-wrap gap-2">
     <button onClick={reproduce} className="rounded-lg bg-red-600 px-3 py-2 text-white">Reproduce incident / Apply broken YAML</button>
     <button onClick={()=>{setHints(x=>Math.min(x+1,lab.hint.length));setStage("Troubleshoot");}} className="rounded-lg border px-3 py-2">Hint ({hints}/{lab.hint.length})</button>
     <button onClick={()=>reset()} className="rounded-lg border px-3 py-2">Reset lab</button>
    </div>
    {reproduced && <div className="rounded-lg border border-red-400 p-3">Incident reproduced. Investigate the generated evidence below.</div>}
   </div>

   <div className="grid gap-4 lg:grid-cols-2">
    <section className="rounded-xl border p-4 space-y-3">
     <div className="font-bold text-base">YAML / CONFIGURATION EDITOR</div>
     <div className="text-xs opacity-70">Edit the broken configuration directly. Your changes remain in this lab until reset.</div>
     <div className="flex justify-end">
        <button
          type="button"
          onClick={() => props.onLoadExample?.(yaml)}
          className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400"
        >
          Open current lab YAML in YAML Editor →
        </button>
       </div>
       <textarea spellCheck={false} value={yaml} onChange={e=>{setYaml(e.target.value);setStage("Repair");setVerified(false);}} className="min-h-[390px] w-full rounded-lg border bg-black/5 dark:bg-black/30 p-3 font-mono text-xs" />
     <div className="flex flex-wrap gap-2">
      <button onClick={checkFix} disabled={!reproduced} className="rounded-lg bg-blue-600 px-3 py-2 text-white disabled:opacity-40">Validate repair & rerun lab</button>
      <button onClick={()=>setYaml(lab.broken)} className="rounded-lg border px-3 py-2">Restore broken YAML</button>
     </div>
     {verified && <div className="rounded-lg border border-green-500 p-3">Repair checks passed. Recovery verified in the local lab simulation.</div>}
    </section>

    <section className="space-y-4">
     <div className="rounded-xl border p-4 space-y-3">
      <div className="font-bold text-base">INTERACTIVE DIAGNOSTIC TERMINAL</div>
      <select value={command} onChange={e=>setCommand(e.target.value)} className="w-full rounded-lg border bg-transparent p-2">
       {lab.commands.map(c=><option key={c} value={c}>{c}</option>)}
      </select>
      <button onClick={runCommand} disabled={!reproduced} className="rounded-lg bg-slate-800 px-3 py-2 text-white disabled:opacity-40">Execute command</button>
      <pre className="min-h-[190px] whitespace-pre-wrap break-words rounded-lg bg-black p-3 text-xs text-green-300">{terminal}</pre>
      <div className="text-xs">Commands executed: {ran.length}/{lab.commands.length}</div>
      <div className="flex flex-wrap gap-2">
       {ran.map(c=><span key={c} className="rounded border px-2 py-1 text-xs">{c}</span>)}
      </div>
     </div>

     <div className="rounded-xl border p-4 space-y-3">
      <div className="font-bold">ROOT-CAUSE INVESTIGATION</div>
      {hints>0 && <div className="rounded-lg bg-amber-500/10 p-3 text-sm">{lab.hint.slice(0,hints).map((h,i)=><div key={i}>Hint {i+1}: {h}</div>)}</div>}
      <textarea value={rootAnswer} onChange={e=>{setRootAnswer(e.target.value);setRootChecked(false);}} placeholder="Enter the root cause based on the terminal evidence..." className="min-h-24 w-full rounded-lg border bg-transparent p-3" />
      <button onClick={checkRoot} disabled={!reproduced} className="rounded-lg border px-3 py-2 disabled:opacity-40">Submit root-cause finding</button>
      {rootChecked && <div className="rounded-lg bg-black/5 dark:bg-white/5 p-3 text-sm"><b>Reference root cause:</b> {lab.root}</div>}
     </div>
    </section>
   </div>

   <div className="rounded-xl border p-4 space-y-3">
    <div className="font-bold text-base">EXPECTED OUTPUT & COMPLETION CHECKS</div>
    <div><b>Expected recovery:</b> {lab.expected}</div>
    <div className="grid gap-2 sm:grid-cols-2">
     <div className="rounded-lg border p-3">Incident reproduced: {reproduced?"YES":"NOT YET"}</div>
     <div className="rounded-lg border p-3">Diagnostic commands: {ran.length>0?"EXECUTED":"PENDING"}</div>
     <div className="rounded-lg border p-3">Root-cause finding: {rootChecked?"SUBMITTED":"PENDING"}</div>
     <div className="rounded-lg border p-3">Repair validation: {verified?"PASSED":"PENDING"}</div>
    </div>
    <div className="flex flex-wrap gap-2">
     <button onClick={finish} className="rounded-lg bg-green-700 px-4 py-2 text-white">Submit practical exam & generate final output</button>
     <button onClick={next} disabled={!examDone} className="rounded-lg border px-4 py-2 disabled:opacity-40">Next lab</button>
    </div>
     {examDone && <div className="rounded-xl border border-green-500 p-4 space-y-3">
      <div className="font-bold text-lg">FINAL PRACTICAL INCIDENT REPORT — PASSED</div>

      <div className="grid gap-2 sm:grid-cols-2">
       <div className="rounded-lg border p-3"><b>Module:</b> {lab.module}</div>
       <div className="rounded-lg border p-3"><b>Lab ID:</b> {lab.id}</div>
       <div className="rounded-lg border p-3"><b>Incident:</b> {lab.title}</div>
       <div className="rounded-lg border p-3"><b>Severity:</b> {lab.severity}</div>
      </div>

      <div className="rounded-lg border p-3 space-y-1">
       <div className="font-semibold">1. Incident reproduction</div>
       <div>Status: {reproduced ? "PASSED" : "NOT COMPLETED"}</div>
       <div>{lab.incident}</div>
      </div>

      <div className="rounded-lg border p-3 space-y-1">
       <div className="font-semibold">2. Investigation evidence</div>
       <div>Diagnostic commands executed: {ran.length}</div>
       <div className="font-mono text-xs whitespace-pre-wrap break-words">{ran.length ? ran.join("\n") : "No commands executed."}</div>
      </div>

      <div className="rounded-lg border p-3 space-y-1">
       <div className="font-semibold">3. Root-cause analysis</div>
       <div><b>Your submitted finding:</b></div>
       <div className="whitespace-pre-wrap">{rootAnswer || "No finding submitted."}</div>
       <div><b>Reference root cause:</b> {lab.root}</div>
       <div>Status: {rootChecked ? "CORRECT — LAB-SPECIFIC CHECKS PASSED" : "NOT ACCEPTED"}</div>
      </div>

      <div className="rounded-lg border p-3 space-y-1">
       <div className="font-semibold">4. Repair and verification</div>
       <div>Repair validation: {verified ? "PASSED" : "NOT PASSED"}</div>
       <div>Repair attempts: {attempts}</div>
       <div>Expected recovery: {lab.expected}</div>
       <div>Actual simulated result: {verified ? "Recovery checks passed in the local lab simulation." : "Recovery not verified."}</div>
       <div>Resolution: {lab.final}</div>
      </div>

      <div className="rounded-lg border p-3 space-y-1">
       <div className="font-semibold">5. Practical assessment result</div>
       <div>Assessment: PASSED</div>
       <div>Score: {score}/100</div>
       <div>Failed attempts: {failed}</div>
       <div>Hints used: {hints}</div>
       <div>Lab completion: {progress}/{moduleLabs.length}</div>
       <div>Exam task: {lab.exam}</div>
      </div>

      <div className="rounded-lg border border-green-500 p-3">
       <div className="font-semibold">FINAL STATUS: SUCCESS</div>
       <div>{lab.final}</div>
      </div>

      <div className="text-xs opacity-70">
       Execution environment: Local browser-based lab simulation. No live Kubernetes cluster, CI runner, Helm release or Argo CD controller was modified.
      </div>
     </div>}
   </div>
  </div>
 );
}


