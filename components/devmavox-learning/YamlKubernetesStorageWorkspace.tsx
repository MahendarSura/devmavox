"use client";

import { useMemo, useState } from "react";
import { parseDocument } from "yaml";

type StorageTopic = "PersistentVolume" | "PersistentVolumeClaim" | "StorageClass";
type LessonSection = { title: string; explanation: string; example?: string };

const lessons: Record<StorageTopic, {
  subtitle: string;
  purpose: string;
  sections: LessonSection[];
  manifest: string;
  incorrect: string;
  corrected: string;
  task: string;
  solution: string;
  incident: string;
  diagnosis: string[];
  quiz: { question: string; options: string[]; answer: number; explanation: string }[];
}> = {
  PersistentVolume: {
    subtitle: "Cluster storage resources and the lifecycle of provisioned capacity",
    purpose: "A PersistentVolume (PV) represents storage capacity made available to a Kubernetes cluster. It is a cluster-level resource with a lifecycle independent of an individual Pod. A PV can represent cloud block storage, network file storage, or another supported storage backend. Applications normally consume this capacity through a PersistentVolumeClaim rather than referring directly to a disk.",
    sections: [
      {
        title: "1. Understand the storage architecture",
        explanation: "Kubernetes separates storage supply from application demand. A cluster administrator or provisioner makes storage available as a PersistentVolume. An application team creates a PersistentVolumeClaim describing the capacity and access mode it needs. Kubernetes matches a suitable PV to that claim. A Pod then references the PVC. This separation allows application manifests to remain independent of the underlying disk name, cloud volume identifier, or storage implementation."
      },
      {
        title: "2. Capacity, access modes and volume modes",
        explanation: "The capacity field advertises the storage size available for matching. accessModes describes how a volume can be mounted: ReadWriteOnce (RWO) permits read-write mounting by one node at a time; ReadOnlyMany (ROX) permits read-only mounting by many nodes; ReadWriteMany (RWX) permits read-write mounting by many nodes; ReadWriteOncePod (RWOP) restricts read-write use to one Pod. Actual support depends on the CSI driver and storage backend. volumeMode defaults to Filesystem; Block requests a raw block device. Access modes are matching and mounting capabilities, not a complete application-level locking system."
      },
      {
        title: "3. PV lifecycle and binding",
        explanation: "A PV can move through Available, Bound, Released and Failed phases. Available means it is ready for a claim. Bound means a claim has reserved it. Released means the claim was deleted but the volume may still contain previous data. Failed indicates an error. A Released volume does not automatically mean its data has been safely erased or that it is ready for another workload. Inspect the reclaim policy and backend before attempting reuse."
      },
      {
        title: "4. Reclaim policies and data protection",
        explanation: "Retain leaves the underlying storage and data for an administrator to handle after a claim is released. Delete asks the provisioner to remove the storage asset when supported. Recycle is deprecated and should not be selected for new designs. The reclaim policy has serious data-loss implications. Production teams should define backup, restore, retention, deletion approval and recovery procedures independently of Kubernetes object deletion."
      },
      {
        title: "5. Static and dynamic provisioning",
        explanation: "With static provisioning, an administrator creates PV objects before applications request storage. With dynamic provisioning, a PVC references a StorageClass and Kubernetes asks its provisioner to create storage on demand. Static provisioning is useful when existing storage must be registered or special placement is required. Dynamic provisioning reduces manual work and is common in cloud-based clusters."
      },
      {
        title: "6. Production operations and capacity planning",
        explanation: "Monitor requested capacity, provisioned capacity, actual filesystem usage, inode usage, volume attachment limits, snapshot health and storage latency. A PVC being Bound does not prove the application can write data or that the disk has enough free space. Capacity expansion requires a compatible StorageClass and CSI driver, a PVC request update, and sometimes filesystem expansion. Validate the entire process in a non-production environment before relying on it during an incident."
      }
    ],
    manifest: `apiVersion: v1
kind: PersistentVolume
metadata:
  name: app-data-pv
  labels:
    environment: learning
spec:
  capacity:
    storage: 10Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: manual
  hostPath:
    path: /mnt/data/app-data
    type: DirectoryOrCreate`,
    incorrect: `apiVersion: v1
kind: PersistentVolume
metadata:
  name: app-data
spec:
  capacity:
    storage: 10
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Remove
  storageClassName: manual`,
    corrected: `apiVersion: v1
kind: PersistentVolume
metadata:
  name: app-data-pv
spec:
  capacity:
    storage: 10Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: manual
  hostPath:
    path: /mnt/data/app-data
    type: DirectoryOrCreate`,
    task: "Create a 10Gi Filesystem PV named reports-pv. Use ReadWriteOnce, Retain reclaim policy, and storageClassName manual. Add a label environment: practice.",
    solution: `apiVersion: v1
kind: PersistentVolume
metadata:
  name: reports-pv
  labels:
    environment: practice
spec:
  capacity:
    storage: 10Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: manual
  hostPath:
    path: /mnt/data/reports
    type: DirectoryOrCreate`,
    incident: "A team deletes an application's PVC during a cleanup. The PV changes to Released and a new PVC remains Pending. The team assumes the old volume is immediately reusable, but it contains production data and uses Retain.",
    diagnosis: [
      "Inspect the PV phase and the claimRef field to identify the previous claim.",
      "Check persistentVolumeReclaimPolicy before taking any cleanup action.",
      "Inspect the storage backend and verify whether the data must be retained or restored.",
      "Do not remove claim references or delete the PV until ownership and backup status are confirmed.",
      "Follow an approved recovery procedure before making the volume available to a new claim."
    ],
    quiz: [
      { question: "Which Kubernetes object represents storage capacity in the cluster?", options: ["Pod", "PersistentVolume", "ConfigMap", "Service"], answer: 1, explanation: "A PV represents provisioned storage capacity and has a lifecycle independent of a Pod." },
      { question: "What does the Retain reclaim policy do?", options: ["Immediately formats the disk", "Keeps the storage for manual handling", "Automatically creates a new PVC", "Deletes the namespace"], answer: 1, explanation: "Retain preserves the storage asset for administrator-controlled recovery or cleanup." },
      { question: "Which object normally requests storage for an application?", options: ["PVC", "Node", "Ingress", "Secret"], answer: 0, explanation: "A PersistentVolumeClaim requests storage capacity and access characteristics." }
    ]
  },
  PersistentVolumeClaim: {
    subtitle: "Application storage requests, volume binding and Pod consumption",
    purpose: "A PersistentVolumeClaim (PVC) is a namespaced request for storage. It describes the amount of capacity and access characteristics an application needs. Kubernetes binds a compatible PV to the claim or provisions a new volume through a StorageClass. Pods reference the PVC, keeping application workloads separate from the details of the physical or cloud storage.",
    sections: [
      {
        title: "1. PVC specification and matching",
        explanation: "A PVC commonly declares accessModes, resources.requests.storage, storageClassName and optionally volumeMode. Kubernetes searches for a compatible PV with enough capacity and matching characteristics. A claim requesting 8Gi cannot bind to a 5Gi PV. The requested capacity is a minimum requirement, not a guarantee that the filesystem will always have that much free space."
      },
      {
        title: "2. Binding modes and scheduling",
        explanation: "Immediate binding can provision or bind storage when the PVC is created. WaitForFirstConsumer delays provisioning or binding until a Pod using the claim is scheduled. This allows topology-aware storage to be selected in a compatible zone or node location. It is particularly important for zonal cloud block storage. A Pending claim under WaitForFirstConsumer may be expected until a consuming Pod exists; inspect events before treating it as a failure."
      },
      {
        title: "3. Using PVCs inside Pods",
        explanation: "A Pod references a claim through spec.volumes[].persistentVolumeClaim.claimName. A container mounts that volume through volumeMounts[].mountPath. The PVC and Pod must be in the same namespace. The claim must exist and be usable before the workload can mount it. Applications should handle filesystem permissions, ownership, concurrent writes, and graceful shutdown according to their storage requirements."
      },
      {
        title: "4. Access modes and workload design",
        explanation: "The requested access mode must be supported by the storage provisioner. ReadWriteOnce is node-oriented, not simply a promise that only one Pod can ever use the volume. Multiple Pods on the same node may be able to use an RWO volume depending on the driver and attachment behavior. ReadWriteMany is required for many multi-node shared-filesystem patterns. ReadWriteOncePod offers stricter single-Pod semantics when supported."
      },
      {
        title: "5. Expansion, resizing and snapshots",
        explanation: "PVC expansion is possible only when the StorageClass allows expansion and the storage driver supports it. Increasing resources.requests.storage does not mean every backend expands instantly. Check PVC conditions, events, CSI controller logs and filesystem resize status. Volume snapshots require a compatible CSI snapshot implementation and snapshot resources. A snapshot is not a substitute for testing application-consistent backups and restores."
      },
      {
        title: "6. PVC troubleshooting and safe operations",
        explanation: "For a Pending claim, inspect events, requested size, access modes, storageClassName, selector, binding mode, topology and provisioner health. For a Pod stuck in ContainerCreating, inspect volume attach and mount events. For permission errors, check container UID/GID, filesystem ownership, security context and CSI behavior. Never delete a claim as a casual troubleshooting step: the reclaim policy may cause data loss."
      }
    ],
    manifest: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  storageClassName: standard
  resources:
    requests:
      storage: 8Gi
---
apiVersion: v1
kind: Pod
metadata:
  name: storage-consumer
spec:
  containers:
    - name: app
      image: nginx:1.27
      volumeMounts:
        - name: app-storage
          mountPath: /usr/share/nginx/html
  volumes:
    - name: app-storage
      persistentVolumeClaim:
        claimName: app-data`,
    incorrect: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 800Gi
  storageClassName: missing-class`,
    corrected: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  storageClassName: standard
  resources:
    requests:
      storage: 8Gi`,
    task: "Create a PVC named database-data requesting 20Gi, ReadWriteOnce, Filesystem mode, and StorageClass standard. Then create a Pod that mounts the claim at /var/lib/database.",
    solution: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: database-data
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  storageClassName: standard
  resources:
    requests:
      storage: 20Gi
---
apiVersion: v1
kind: Pod
metadata:
  name: database-practice
spec:
  containers:
    - name: database
      image: postgres:16
      volumeMounts:
        - name: database-storage
          mountPath: /var/lib/database
  volumes:
    - name: database-storage
      persistentVolumeClaim:
        claimName: database-data`,
    incident: "A Deployment's Pods remain in ContainerCreating after a storage migration. The PVC is Bound, but the new node cannot attach or mount the disk.",
    diagnosis: [
      "Run kubectl describe pod and inspect Events for FailedAttachVolume or FailedMount.",
      "Check kubectl get pvc and kubectl describe pvc for claim and volume details.",
      "Inspect PV node affinity and storage topology, especially availability zones.",
      "Check CSI controller and node plugin health, cloud attachment limits and volume attachment objects.",
      "Confirm the old workload has safely detached before attempting a controlled recovery."
    ],
    quiz: [
      { question: "What does a PVC represent?", options: ["A storage request", "A network policy", "A container image", "A Kubernetes node"], answer: 0, explanation: "A PVC is a namespaced request for storage capacity and access characteristics." },
      { question: "Where does a Pod reference a PVC?", options: ["spec.volumes[].persistentVolumeClaim", "spec.containers[].image", "metadata.labels", "spec.nodeSelector"], answer: 0, explanation: "The Pod volume declaration identifies the claim by claimName." },
      { question: "What does WaitForFirstConsumer do?", options: ["Deletes unused PVCs", "Delays binding until a consuming Pod is scheduled", "Disables volume mounts", "Forces ReadWriteMany"], answer: 1, explanation: "It allows topology-aware provisioning or binding based on the consuming Pod's scheduling constraints." }
    ]
  },
  StorageClass: {
    subtitle: "Dynamic provisioning, CSI drivers, performance tiers and topology",
    purpose: "A StorageClass describes how storage should be dynamically provisioned. It connects PVC requests to a provisioner, parameters, reclaim policy and volume binding behavior. Platform teams can offer standard, high-performance, encrypted or topology-aware storage options without requiring every application team to manually create a PersistentVolume.",
    sections: [
      {
        title: "1. Why StorageClass exists",
        explanation: "Without dynamic provisioning, administrators may need to pre-create PVs for every storage request. A StorageClass provides a reusable provisioning policy. When a PVC references a valid class, the provisioner can create a volume that satisfies the request. The class name is part of the PVC contract, so application teams should use approved names and avoid depending on cloud-specific volume identifiers."
      },
      {
        title: "2. Provisioner and CSI architecture",
        explanation: "The provisioner identifies the storage driver responsible for creating volumes. Modern cloud and enterprise storage integrations commonly use Container Storage Interface (CSI) drivers. The CSI controller handles control-plane operations such as create, delete, attach and snapshot workflows; node components handle operations such as staging and mounting. A StorageClass does not install or repair a CSI driver. Driver installation, permissions, credentials and health must be managed separately."
      },
      {
        title: "3. Parameters and storage tiers",
        explanation: "StorageClass parameters are driver-specific. They may select a disk type, filesystem, encryption setting, performance tier or storage pool. Parameters from one CSI driver are not portable to another. Teams should document supported parameter values and test them against the actual driver version. Avoid copying cloud-specific parameters into a different provider's cluster."
      },
      {
        title: "4. Reclaim policy and expansion",
        explanation: "A StorageClass can define the reclaim policy for dynamically provisioned PVs. Delete is common for disposable development volumes, but it can remove the backing storage after claim deletion. Retain is safer when manual recovery or data preservation is required. allowVolumeExpansion enables supported PVC capacity increases. Neither setting replaces backups, retention controls or restore testing."
      },
      {
        title: "5. Volume binding and topology",
        explanation: "volumeBindingMode can be Immediate or WaitForFirstConsumer. With Immediate, provisioning can occur as soon as a claim is created. With WaitForFirstConsumer, Kubernetes waits for a consuming Pod so storage can be provisioned in a topology compatible with scheduling. This avoids creating a zonal disk in a location where the Pod cannot run. Topology constraints and allowedTopologies must reflect real infrastructure."
      },
      {
        title: "6. Default classes and platform governance",
        explanation: "A cluster may have a default StorageClass, allowing PVCs without storageClassName to use that default. Multiple defaults can create confusing behavior, so platform teams should govern which class is default. Explicit class names make application intent clearer. Review who can create claims, which tiers are permitted, cost implications, encryption requirements and lifecycle policies."
      }
    ],
    manifest: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard-practice
provisioner: csi.example.com
parameters:
  type: general-purpose
reclaimPolicy: Retain
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer`,
    incorrect: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
provisioner: unknown.driver.invalid
reclaimPolicy: Remove
allowVolumeExpansion: yes
volumeBindingMode: Immediate`,
    corrected: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard-practice
provisioner: csi.example.com
parameters:
  type: general-purpose
reclaimPolicy: Retain
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer`,
    task: "Create a StorageClass named production-retain. Use the example CSI provisioner csi.example.com, set reclaimPolicy Retain, enable expansion, and use WaitForFirstConsumer.",
    solution: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: production-retain
provisioner: csi.example.com
reclaimPolicy: Retain
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer`,
    incident: "New PVCs remain Pending after a cluster upgrade. The StorageClass exists, but dynamic provisioning no longer creates disks.",
    diagnosis: [
      "Inspect the PVC events for provisioner errors and provisioning timeouts.",
      "Check the StorageClass provisioner name and parameters against the installed CSI driver.",
      "Verify CSI controller Pods, node plugins, RBAC permissions and controller logs.",
      "Check cloud API permissions, quotas, credentials, network connectivity and storage limits.",
      "Validate the driver version and supported parameters before changing production StorageClass definitions."
    ],
    quiz: [
      { question: "What is the primary purpose of a StorageClass?", options: ["Describe dynamic storage provisioning policy", "Create a Pod", "Expose an HTTP route", "Store application passwords"], answer: 0, explanation: "A StorageClass describes the provisioner and policy used to dynamically create storage." },
      { question: "Which field identifies the CSI provisioner?", options: ["provisioner", "mountPath", "claimName", "nodeName"], answer: 0, explanation: "The provisioner field identifies the storage provisioner responsible for creating volumes." },
      { question: "What does WaitForFirstConsumer help with?", options: ["Topology-aware volume provisioning", "Automatic database backups", "Pod autoscaling", "Secret encryption"], answer: 0, explanation: "It delays binding/provisioning until Pod scheduling provides topology context." }
    ]
  }
};

const tabs = ["Learn", "Examples", "Practice", "Debug", "Scenarios", "Quiz"] as const;
type Tab = typeof tabs[number];

export default function YamlKubernetesStorageWorkspace({ topic, tab }: { topic: string; tab: string }) {
  const selected = (["PersistentVolume", "PersistentVolumeClaim", "StorageClass"].includes(topic) ? topic : "PersistentVolume") as StorageTopic;
  const lesson = lessons[selected];
  const active = (tabs.includes(tab as Tab) ? tab : "Learn") as Tab;
  const [editor, setEditor] = useState(lesson.manifest);
  const [showSolution, setShowSolution] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [validated, setValidated] = useState(false);

  const validation = useMemo(() => {
    try {
      const doc = parseDocument(editor);
      const errors = doc.errors.map((error) => error.message);
      const warnings = doc.warnings.map((warning) => warning.message);
      return { valid: errors.length === 0, errors, warnings };
    } catch (error) {
      return { valid: false, errors: [error instanceof Error ? error.message : "Unable to parse YAML"], warnings: [] as string[] };
    }
  }, [editor]);

  const topicOptions: StorageTopic[] = ["PersistentVolume", "PersistentVolumeClaim", "StorageClass"];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-background to-blue-500/10 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">DevMavox · Kubernetes Storage</p>
            <h2 className="mt-2 text-2xl font-bold">{selected}</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{lesson.subtitle}</p>
          </div>
          <span className="rounded-full border px-3 py-1 text-xs">Topic workspace</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {topicOptions.map((item) => (
            <button key={item} type="button" onClick={() => { window.dispatchEvent(new CustomEvent("devmavox-storage-topic", { detail: item })); }} className={`rounded-lg border px-3 py-2 text-xs ${selected === item ? "border-cyan-500 bg-cyan-500/15 font-semibold" : "hover:bg-muted"}`}>
              {item}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Parent curriculum selection controls the active topic. Use the topic navigation above to identify the storage concept you are studying.</p>
      </section>


      {active === "Learn" && (
        <div className="space-y-4">
          <section className="rounded-xl border p-5">
            <h3 className="text-lg font-semibold">Concept overview</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{lesson.purpose}</p>
          </section>
          {lesson.sections.map((section, index) => (
            <section key={section.title} className="rounded-xl border p-5">
              <p className="text-xs font-semibold text-cyan-600">LEARNING SECTION {index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold">{section.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.explanation}</p>
            </section>
          ))}
          <section className="rounded-xl border p-5">
            <h3 className="font-semibold">How the three storage resources work together</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg bg-muted/50 p-4"><strong className="text-sm">StorageClass</strong><p className="mt-2 text-xs text-muted-foreground">Defines how storage can be provisioned.</p></div>
              <div className="rounded-lg bg-muted/50 p-4"><strong className="text-sm">PVC</strong><p className="mt-2 text-xs text-muted-foreground">Requests the capacity and access needed by an application.</p></div>
              <div className="rounded-lg bg-muted/50 p-4"><strong className="text-sm">PV</strong><p className="mt-2 text-xs text-muted-foreground">Represents the actual provisioned storage resource.</p></div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">A Pod consumes the PVC through a volume declaration. Dynamic provisioning can create the PV through the StorageClass.</p>
          </section>
        </div>
      )}

      {active === "Examples" && (
        <div className="space-y-4">
          <section className="rounded-xl border p-5">
            <h3 className="font-semibold">Working YAML example</h3>
            <p className="mt-2 text-sm text-muted-foreground">Study the resource structure and identify the fields that control storage behavior.</p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100"><code>{lesson.manifest}</code></pre>
            <button type="button" onClick={() => { setEditor(lesson.manifest); setValidated(false); }} className="mt-3 rounded-lg border px-4 py-2 text-sm hover:bg-muted">Load into practice editor</button>
          </section>
          <section className="rounded-xl border p-5">
            <h3 className="font-semibold">Common incorrect configuration</h3>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-red-200"><code>{lesson.incorrect}</code></pre>
            <h4 className="mt-4 font-semibold">Corrected configuration</h4>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-emerald-200"><code>{lesson.corrected}</code></pre>
          </section>
        </div>
      )}

      {active === "Practice" && (
        <div className="space-y-4">
          <section className="rounded-xl border p-5">
            <p className="text-xs font-semibold text-cyan-600">HANDS-ON TASK</p>
            <h3 className="mt-2 font-semibold">Your challenge</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{lesson.task}</p>
            <textarea value={editor} onChange={(event) => { setEditor(event.target.value); setValidated(false); }} spellCheck={false} className="mt-4 min-h-[340px] w-full rounded-xl border bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100 outline-none focus:border-cyan-500" aria-label="YAML practice editor" />
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => setValidated(true)} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white">Validate YAML</button>
              <button type="button" onClick={() => { setEditor(lesson.manifest); setValidated(false); }} className="rounded-lg border px-4 py-2 text-sm">Reset example</button>
              <button type="button" onClick={() => setShowSolution(!showSolution)} className="rounded-lg border px-4 py-2 text-sm">{showSolution ? "Hide solution" : "Show solution"}</button>
            </div>
            {validated && (
              <div className={`mt-4 rounded-lg border p-4 ${validation.valid ? "border-emerald-500/40 bg-emerald-500/10" : "border-red-500/40 bg-red-500/10"}`}>
                <strong className="text-sm">{validation.valid ? "YAML syntax is valid" : "YAML syntax errors found"}</strong>
                {validation.errors.map((error, index) => <p key={index} className="mt-2 text-xs">{error}</p>)}
                {validation.warnings.map((warning, index) => <p key={index} className="mt-2 text-xs text-amber-600">Warning: {warning}</p>)}
                <p className="mt-2 text-xs text-muted-foreground">Syntax validation does not replace Kubernetes API schema validation, admission checks, CSI compatibility checks or a safe cluster test.</p>
              </div>
            )}
            {showSolution && <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-emerald-200"><code>{lesson.solution}</code></pre>}
          </section>
        </div>
      )}

      {active === "Debug" && (
        <div className="space-y-4">
          <section className="rounded-xl border p-5">
            <h3 className="font-semibold">Troubleshooting incorrect YAML</h3>
            <p className="mt-2 text-sm text-muted-foreground">Compare the incorrect example with the corrected manifest. Identify invalid fields, unsupported values, missing quantities or mismatched resource references.</p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-red-200"><code>{lesson.incorrect}</code></pre>
            <h4 className="mt-4 font-semibold">Corrected version</h4>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-emerald-200"><code>{lesson.corrected}</code></pre>
          </section>
          <section className="rounded-xl border p-5">
            <h3 className="font-semibold">Diagnostic workflow</h3>
            <div className="mt-3 space-y-3">
              {["kubectl get pv,pvc -A", "kubectl describe pvc <claim-name>", "kubectl describe pv <volume-name>", "kubectl get storageclass -o yaml", "kubectl get events -A --sort-by=.lastTimestamp"].map((command) => (
                <div key={command} className="rounded-lg bg-muted/50 p-3 font-mono text-xs">{command}</div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Use commands with the correct namespace and resource names. Review events and backend-specific CSI logs before changing or deleting storage resources.</p>
          </section>
        </div>
      )}

      {active === "Scenarios" && (
        <div className="space-y-4">
          <section className="rounded-xl border p-5">
            <p className="text-xs font-semibold text-amber-600">PRODUCTION INCIDENT</p>
            <h3 className="mt-2 text-lg font-semibold">{selected} operational failure</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{lesson.incident}</p>
          </section>
          <section className="rounded-xl border p-5">
            <h3 className="font-semibold">Safe investigation sequence</h3>
            <ol className="mt-4 space-y-3">
              {lesson.diagnosis.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-6">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-xs font-bold text-cyan-700">{index + 1}</span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </section>
          <section className="rounded-xl border p-5">
            <h3 className="font-semibold">Production safety checklist</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Confirm the affected namespace, workload, claim and volume.</li>
              <li>Review recent events and changes before modifying resources.</li>
              <li>Confirm backup and restore readiness before destructive operations.</li>
              <li>Check CSI driver health, storage topology and backend capacity.</li>
              <li>Validate recovery in a controlled environment and record the outcome.</li>
            </ul>
          </section>
        </div>
      )}

      {active === "Quiz" && (
        <div className="space-y-4">
          <section className="rounded-xl border p-5">
            <h3 className="text-lg font-semibold">Knowledge assessment</h3>
            <p className="mt-2 text-sm text-muted-foreground">Choose one answer for each question. Review explanations after selecting your answers.</p>
          </section>
          {lesson.quiz.map((item, index) => (
            <section key={item.question} className="rounded-xl border p-5">
              <h4 className="font-semibold">{index + 1}. {item.question}</h4>
              <div className="mt-3 space-y-2">
                {item.options.map((option, optionIndex) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm hover:bg-muted/50">
                    <input type="radio" name={`${selected}-quiz-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers((previous) => ({ ...previous, [index]: optionIndex }))} />
                    {option}
                  </label>
                ))}
              </div>
              {answers[index] !== undefined && (
                <p className={`mt-3 text-xs leading-5 ${answers[index] === item.answer ? "text-emerald-600" : "text-amber-600"}`}>
                  {answers[index] === item.answer ? "Correct. " : "Not quite. "} {item.explanation}
                </p>
              )}
            </section>
          ))}
          <section className="rounded-xl border p-5">
            <p className="text-sm font-semibold">Score: {lesson.quiz.filter((item, index) => answers[index] === item.answer).length} / {lesson.quiz.length}</p>
            <button type="button" onClick={() => setAnswers({})} className="mt-3 rounded-lg border px-4 py-2 text-sm">Retake quiz</button>
          </section>
        </div>
      )}
      <p className="text-xs text-muted-foreground">Parent tab context: {tab}. This workspace validates YAML syntax locally in the browser; it does not provision storage or apply resources to a Kubernetes cluster.</p>
    </div>
  );
}
