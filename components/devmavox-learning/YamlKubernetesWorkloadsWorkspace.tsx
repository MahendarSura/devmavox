"use client";

import React, { useEffect, useMemo, useState } from "react";
import { parseDocument } from "yaml";

type Section = { title: string; body: string };
type Exercise = { title: string; task: string; hint: string; solution: string };
type Mistake = { title: string; wrong: string; correct: string; reason: string };
type Question = { question: string; options: string[]; answer: number; explanation: string };
type Lesson = {
  purpose: string;
  objectives: string[];
  sections: Section[];
  manifest: string;
  walkthrough: string[];
  exercises: Exercise[];
  mistakes: Mistake[];
  scenario: { title: string; situation: string; investigation: string[]; recovery: string[] };
  questions: Question[];
};

const lessons: Record<string, Lesson> = {
  Pod: {
    purpose: "Understand the Pod as Kubernetes' smallest deployable workload unit, how containers share a network identity and storage context, and how to design, inspect and troubleshoot Pods safely.",
    objectives: [
      "Explain why Kubernetes schedules Pods rather than individual containers.",
      "Distinguish a Pod's lifecycle from the lifecycle of its containers.",
      "Configure labels, restart policy, probes, resources and security context.",
      "Use kubectl evidence to diagnose Pending, ImagePullBackOff and CrashLoopBackOff states."
    ],
    sections: [
      { title: "Pod as the scheduling boundary", body: "A Pod is a group of one or more tightly coupled containers that Kubernetes schedules onto one node as a unit. Containers in the same Pod share the Pod IP and port space, and can communicate over localhost. They can also mount the same declared volumes. A Pod is not a general-purpose container bundle: place containers together only when they must share lifecycle, network identity or tightly coupled storage. A web application and an unrelated database normally belong in separate workload resources." },
      { title: "Pod lifecycle and container states", body: "The Pod phase gives a high-level view such as Pending, Running, Succeeded, Failed or Unknown. Container state is more specific: Waiting, Running or Terminated. A Running Pod does not guarantee that the application is ready to receive traffic. Readiness is a separate signal. Restart behavior depends on restartPolicy and the owning controller. A Pod created directly by a user is not automatically recreated after deletion; controllers such as Deployments provide that reconciliation." },
      { title: "Labels, selectors and metadata", body: "Labels are key/value metadata used for selection, grouping and operational queries. Annotations store descriptive metadata that is not normally used for selection. Labels become especially important when Services and controllers select Pods. Use stable application identity labels such as app.kubernetes.io/name and app.kubernetes.io/component. Avoid putting changing release values into a selector that must remain stable, because immutable selector changes can prevent workload updates." },
      { title: "Health checks and resource boundaries", body: "A startup probe gives slow-starting applications time to initialize before liveness and readiness checks take over. A liveness probe detects a process that should be restarted; a readiness probe controls whether the Pod should receive Service traffic. CPU requests influence scheduling and CPU limits constrain consumption. Memory limits are enforced by the kernel and can result in OOMKilled termination. Probe paths, ports and thresholds must reflect actual application behavior." },
      { title: "Pod security and operational design", body: "Prefer non-root execution, read-only root filesystems where possible, dropped Linux capabilities, and an explicit seccomp profile. Avoid privileged containers unless there is a reviewed operational requirement. Do not place real credentials in example manifests or source control. Use a Secret reference for sensitive values and a ConfigMap for non-sensitive configuration. A standalone Pod is useful for learning and debugging, while production stateless workloads are generally managed by a controller." }
    ],
    manifest: `apiVersion: v1
kind: Pod
metadata:
  name: web-demo
  namespace: default
  labels:
    app.kubernetes.io/name: web-demo
    app.kubernetes.io/component: frontend
spec:
  restartPolicy: Always
  containers:
    - name: nginx
      image: nginx:1.27
      ports:
        - name: http
          containerPort: 80
          protocol: TCP
      resources:
        requests:
          cpu: 100m
          memory: 64Mi
        limits:
          cpu: 500m
          memory: 128Mi
      readinessProbe:
        httpGet:
          path: /
          port: http
        initialDelaySeconds: 3
        periodSeconds: 5
      livenessProbe:
        httpGet:
          path: /
          port: http
        initialDelaySeconds: 10
        periodSeconds: 10
      securityContext:
        allowPrivilegeEscalation: false
        capabilities:
          drop: ["ALL"]`,
    walkthrough: [
      "apiVersion v1 and kind Pod identify the core Kubernetes API resource.",
      "metadata.name gives the Pod a unique name in its namespace; labels make it discoverable.",
      "spec.containers declares the container runtime configuration. The containerPort documents the listening port; it does not expose the Pod outside the cluster.",
      "Resource requests help the scheduler choose a node. Limits constrain runtime consumption.",
      "Readiness and liveness have different purposes. A failed readiness check removes the Pod from eligible Service endpoints; a failed liveness check can trigger a restart."
    ],
    exercises: [
      { title: "Exercise 1 — Add a second container", task: "Add a sidecar container named log-viewer using busybox:1.36. Configure it to run a long-lived sleep command. Keep the existing nginx container unchanged.", hint: "Add another item under spec.containers. Each container needs its own name and image.", solution: `      - name: log-viewer
        image: busybox:1.36
        command: ["sh", "-c", "while true; do sleep 3600; done"]` },
      { title: "Exercise 2 — Make the Pod safer", task: "Add a Pod-level securityContext that runs containers with a non-root user ID of 10001 and a RuntimeDefault seccomp profile.", hint: "Pod-level securityContext belongs under spec, alongside containers.", solution: `  securityContext:
    runAsNonRoot: true
    runAsUser: 10001
    seccompProfile:
      type: RuntimeDefault` }
    ],
    mistakes: [
      { title: "Using containerPort as external exposure", wrong: "ports:\n  - containerPort: 80", correct: "Create a Service resource to provide a stable network endpoint for the Pod.", reason: "containerPort is descriptive container configuration. It does not create a Service, load balancer or external route." },
      { title: "Treating Running as Ready", wrong: "Assume phase: Running means the app can receive requests.", correct: "Configure a readinessProbe that checks the application's real readiness condition.", reason: "A process can be running while initialization, dependency checks or application startup are still incomplete." },
      { title: "Using a standalone Pod for a replicated app", wrong: "Create one Pod and expect Kubernetes to replace it after deletion.", correct: "Use a Deployment for stateless replicas or another suitable controller.", reason: "A standalone Pod has no controller responsible for replacing a deleted Pod." }
    ],
    scenario: {
      title: "Production incident — Pod repeatedly restarts",
      situation: "A newly created Pod enters CrashLoopBackOff. The team reports that the image was pulled successfully, but the application never becomes healthy.",
      investigation: ["Run kubectl describe pod web-demo and inspect Events, container state and restart count.", "Run kubectl logs web-demo --previous to inspect the previous crashed container.", "Check whether the configured command, environment variables and mounted files match the application's startup requirements.", "Inspect lastState.terminated.reason and exitCode. Check for OOMKilled, permission errors and failed dependency initialization."],
      recovery: ["Correct the invalid command or missing configuration rather than repeatedly deleting the Pod.", "If memory pressure caused OOMKilled, measure usage and set a justified request and limit.", "Correct probe paths and timing only when evidence shows the probe does not match application startup behavior.", "For production, move the corrected Pod template into a Deployment and roll it out through the normal release process."]
    },
    questions: [
      { question: "What is the Kubernetes scheduling unit for containers?", options: ["Image", "Pod", "Service", "Namespace"], answer: 1, explanation: "Kubernetes schedules Pods onto nodes. Containers in one Pod are co-located." },
      { question: "Which probe controls whether a Pod should receive Service traffic?", options: ["Liveness", "Readiness", "Startup only", "Node probe"], answer: 1, explanation: "Readiness determines whether the Pod is eligible to receive traffic through matching Services." },
      { question: "What normally recreates a deleted application Pod?", options: ["A label", "A containerPort", "A controller such as Deployment", "An annotation"], answer: 2, explanation: "A controller continuously reconciles the desired replica count and creates replacement Pods." }
    ]
  },
  Deployment: {
    purpose: "Learn how Deployments manage stateless applications through ReplicaSets, declarative desired state, rolling updates, rollout history and rollback.",
    objectives: [
      "Explain the relationship between Deployment, ReplicaSet and Pod.",
      "Design stable selectors and replica templates.",
      "Control rolling update behavior and availability.",
      "Inspect, pause, resume and roll back a rollout."
    ],
    sections: [
      { title: "Desired state and reconciliation", body: "A Deployment declares the desired number of interchangeable application replicas and a Pod template. The Deployment controller creates or updates a ReplicaSet, and the ReplicaSet controller creates Pods. Controllers continuously compare observed state with desired state and take corrective action. This reconciliation model is why manually editing a Pod is not a durable way to change an application managed by a Deployment." },
      { title: "Selectors and Pod templates", body: "spec.selector.matchLabels must match labels in spec.template.metadata.labels. The selector identifies the Pods controlled by the Deployment and is immutable after creation for apps/v1 Deployments. Choose stable labels that represent application identity. Put image, environment, ports, probes, resources and security settings in the Pod template. A template change creates a new rollout; changing only the replica count scales the workload." },
      { title: "Rolling update strategy", body: "The RollingUpdate strategy gradually replaces old Pods with new Pods. maxSurge controls how many extra Pods may be created above the desired replica count, while maxUnavailable controls how many replicas may be unavailable during the update. These values must be selected with capacity, readiness and application compatibility in mind. A readiness probe is important because Kubernetes should not count an unready new Pod as a healthy replacement." },
      { title: "Rollout status and history", body: "Use kubectl rollout status deployment/name to watch progress and kubectl rollout history to inspect revisions. Events and ReplicaSet age help identify scheduling, image-pull, probe or quota problems. A rollout can stall if new Pods cannot schedule or never become Ready. A successful API update does not prove the application is healthy; verify endpoints and application-level behavior after the rollout." },
      { title: "Rollback and safe release practice", body: "A rollback restores a previous Deployment revision when history is available. It is a recovery mechanism, not a replacement for diagnosing the failed release. Image tags should be traceable and preferably immutable in controlled delivery systems. Database schema changes and external side effects may not be reversed by rolling back Pods. Coordinate application and data compatibility when planning releases." },
      { title: "Scaling and production safeguards", body: "Manual scaling changes the desired replica count, but an autoscaler may later manage that field. Requests affect scheduling and capacity planning. PodDisruptionBudgets help constrain voluntary disruptions but do not guarantee availability during every failure. Spread replicas across nodes or zones using topology spread constraints or anti-affinity when the availability requirement justifies it." }
    ],
    manifest: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: checkout
  labels:
    app.kubernetes.io/name: checkout
spec:
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/name: checkout
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  minReadySeconds: 10
  revisionHistoryLimit: 5
  template:
    metadata:
      labels:
        app.kubernetes.io/name: checkout
    spec:
      containers:
        - name: checkout
          image: nginx:1.27
          ports:
            - name: http
              containerPort: 80
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 256Mi
          readinessProbe:
            httpGet:
              path: /
              port: http
            periodSeconds: 5`,
    walkthrough: [
      "apps/v1 is the stable API group for Deployment.",
      "replicas: 3 declares the desired number of Pods, not a guaranteed number of currently healthy Pods.",
      "selector.matchLabels must match template.metadata.labels exactly.",
      "maxSurge: 1 permits one extra Pod during an update; maxUnavailable: 0 aims to keep all desired replicas available during the rollout.",
      "The template contains the Pod specification. Changing the image or template metadata creates a new ReplicaSet and rollout."
    ],
    exercises: [
      { title: "Exercise 1 — Scale the workload", task: "Change the desired replica count to five. Keep the selector and Pod template labels unchanged.", hint: "Change only spec.replicas.", solution: `spec:
  replicas: 5` },
      { title: "Exercise 2 — Pin the release image", task: "Change the image from nginx:1.27 to nginx:1.27.5 and explain why a controlled release should avoid the latest tag.", hint: "Edit the image under the checkout container.", solution: `          image: nginx:1.27.5\n\nUse an explicit version so the intended artifact is reviewable and repeatable.` }
    ],
    mistakes: [
      { title: "Selector does not match template labels", wrong: "selector.matchLabels.app: checkout\n template.metadata.labels.app: frontend", correct: "Use the same stable key/value pair in both selector and template labels.", reason: "The Deployment cannot adopt Pods unless the selector matches the template labels. The selector is immutable after creation." },
      { title: "Expecting a rollout from replica-only change", wrong: "Change replicas and expect a new image revision.", correct: "Change the Pod template to roll out a new revision; change replicas to scale.", reason: "Replica count and Pod template changes have different controller behavior." },
      { title: "Setting maxUnavailable without capacity planning", wrong: "Allow most replicas to become unavailable during a release.", correct: "Choose maxSurge and maxUnavailable based on capacity, readiness and availability objectives.", reason: "An aggressive rollout can reduce serving capacity or cause scheduling pressure." }
    ],
    scenario: {
      title: "Production incident — Deployment rollout is stuck",
      situation: "A release changes the application image. The Deployment shows Progressing for several minutes and the new ReplicaSet has Pods that are not Ready.",
      investigation: ["Run kubectl rollout status deployment/checkout and kubectl describe deployment checkout.", "Inspect Pods from the new ReplicaSet with kubectl get pods -l app.kubernetes.io/name=checkout.", "Describe an unready Pod and inspect Events for image pull, scheduling, probe or quota errors.", "Read current and previous container logs. Compare the new image and configuration with the last healthy revision."],
      recovery: ["If the artifact is unavailable or defective, restore the known-good image through the release workflow or use kubectl rollout undo deployment/checkout as an incident recovery action.", "Fix resource requests, registry access or probe configuration based on the observed cause.", "Verify rollout status, ready replicas, Service endpoints and application behavior.", "Record the failed revision and root cause before attempting another release."]
    },
    questions: [
      { question: "Which resource creates and manages ReplicaSets for a stateless application?", options: ["Deployment", "ConfigMap", "Service", "Secret"], answer: 0, explanation: "The Deployment controller manages ReplicaSets and their rollout lifecycle." },
      { question: "What must match between a Deployment selector and Pod template?", options: ["Container image", "Labels", "Namespace name only", "Probe path"], answer: 1, explanation: "The selector's matchLabels must be present with matching values on the Pod template." },
      { question: "Which command watches rollout progress?", options: ["kubectl rollout status", "kubectl get nodes", "kubectl config view", "kubectl explain"], answer: 0, explanation: "rollout status reports whether the Deployment rollout has completed or is progressing." }
    ]
  },
  StatefulSet: {
    purpose: "Understand workloads that need stable network identities, ordered lifecycle behavior and persistent storage identities, such as databases and clustered systems.",
    objectives: [
      "Distinguish StatefulSet behavior from Deployment behavior.",
      "Understand governing Services and stable Pod identities.",
      "Configure volumeClaimTemplates and storage requirements.",
      "Troubleshoot ordered rollouts, PVC binding and replica readiness."
    ],
    sections: [
      { title: "Why StatefulSets exist", body: "A StatefulSet manages Pods that need stable identities or persistent storage associations. Unlike interchangeable Deployment replicas, StatefulSet Pods have predictable ordinal names such as database-0 and database-1. Their identity remains associated with the ordinal when a Pod is recreated. This is useful for clustered systems that use stable member names, but it does not automatically configure database replication, quorum or data consistency." },
      { title: "Stable network identity", body: "A StatefulSet commonly uses a headless Service as its governing service. The Service provides stable DNS identities for individual Pods. Each ordinal can be addressed through a predictable DNS record when cluster DNS and the Service are configured correctly. A headless Service does not load-balance traffic like a normal ClusterIP Service; it publishes endpoint records that clients can use to locate members." },
      { title: "Persistent volume claim templates", body: "volumeClaimTemplates create a distinct PersistentVolumeClaim for each StatefulSet Pod. The claim is associated with the Pod ordinal and normally remains when that Pod is deleted, allowing replacement Pods to reattach the same claim when supported by the storage system. StorageClass, access modes, capacity and volume topology must be planned. Deleting a StatefulSet does not mean data is safely backed up or that storage lifecycle is automatically understood." },
      { title: "Ordered creation and termination", body: "The default OrderedReady policy creates Pods in ordinal order and waits for each to become Ready before proceeding. Deletion and scaling down also follow ordered behavior. This can be important for clustered applications but can create a rollout deadlock when readiness depends on peer members that have not yet been created. Parallel pod management changes ordering behavior and should only be used when the application supports it." },
      { title: "Update strategies and recovery", body: "RollingUpdate updates StatefulSet Pods according to their ordinal sequence, normally from the highest ordinal downward. partition can hold lower ordinals on an earlier revision for controlled canary-style updates. OnDelete waits for manual Pod deletion before replacing Pods with the updated template. Recovery requires checking the application's own replication state and storage health, not merely the Kubernetes Ready condition." },
      { title: "Stateful application operations", body: "A StatefulSet does not replace database-native backup, restore, replication, fencing or quorum procedures. Before changing storage, image versions or topology, review the application's supported upgrade process. Confirm PVC binding, zone placement, permissions, filesystem ownership and backup recovery points. Use tested runbooks for failover and restore; never treat deleting a PVC as a routine restart action." }
    ],
    manifest: `apiVersion: v1
kind: Service
metadata:
  name: ledger
spec:
  clusterIP: None
  selector:
    app: ledger
  ports:
    - name: database
      port: 5432
      targetPort: 5432
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: ledger
spec:
  serviceName: ledger
  replicas: 3
  selector:
    matchLabels:
      app: ledger
  template:
    metadata:
      labels:
        app: ledger
    spec:
      containers:
        - name: database
          image: postgres:16
          ports:
            - name: database
              containerPort: 5432
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi`,
    walkthrough: [
      "The headless Service has clusterIP: None and selects the same app label used by the StatefulSet Pods.",
      "serviceName connects the StatefulSet to its governing Service for stable DNS identity.",
      "replicas: 3 produces ordinal Pods such as ledger-0, ledger-1 and ledger-2.",
      "volumeMounts references the claim template name data; each ordinal receives its own claim.",
      "The sample demonstrates Kubernetes storage wiring only. A real PostgreSQL cluster needs secure initialization, credentials, replication design, backup and recovery procedures."
    ],
    exercises: [
      { title: "Exercise 1 — Increase cluster members", task: "Change the StatefulSet to request four replicas. Explain why the storage claim template creates a separate claim for the new ordinal.", hint: "Change spec.replicas and inspect volumeClaimTemplates.", solution: `spec:\n  replicas: 4\n\nThe new ledger-3 Pod receives its own data-ledger-3 PVC from the claim template.` },
      { title: "Exercise 2 — Request larger storage", task: "Change the claim template request from 10Gi to 20Gi. Identify why changing a template does not automatically resize every existing PVC.", hint: "Update resources.requests.storage and review your StorageClass expansion support.", solution: `          requests:\n            storage: 20Gi\n\nExisting PVC expansion is a separate storage operation and depends on StorageClass and CSI support.` }
    ],
    mistakes: [
      { title: "Using a normal Service for stable member DNS", wrong: "Assume a normal ClusterIP Service provides each Pod's stable DNS identity.", correct: "Use a governing headless Service when individual StatefulSet Pod discovery is required.", reason: "A headless Service publishes endpoint identities rather than a single virtual IP." },
      { title: "Assuming StatefulSet equals database replication", wrong: "Create three database Pods and assume they automatically form a healthy cluster.", correct: "Configure and test the database's own replication, bootstrap, quorum and failover process.", reason: "StatefulSet controls Kubernetes lifecycle and identity, not application-level data consistency." },
      { title: "Deleting PVCs to restart Pods", wrong: "Delete the data claim to force a Pod restart.", correct: "Restart or replace the Pod while preserving its claim; follow storage recovery procedures.", reason: "A PVC can represent the only persistent copy of application data." }
    ],
    scenario: {
      title: "Production incident — StatefulSet Pod stuck Pending",
      situation: "ledger-2 remains Pending after a scale-up. The first two members are running and the team suspects the new image.",
      investigation: ["Run kubectl describe pod ledger-2 and inspect scheduler Events.", "Check the matching PVC with kubectl get pvc and kubectl describe pvc.", "Inspect StorageClass, available capacity, zone constraints and access modes.", "Check whether the StatefulSet is waiting for ledger-1 readiness because of OrderedReady behavior."],
      recovery: ["Resolve the specific storage provisioning, capacity or topology issue shown in Events.", "Do not delete existing PVCs as a shortcut.", "Confirm the new member initializes and joins the application cluster using application-native health checks.", "Verify all members, persistent claims, backups and replication status before declaring recovery."]
    },
    questions: [
      { question: "What provides stable ordinal Pod identities?", options: ["Deployment", "StatefulSet", "Job", "ConfigMap"], answer: 1, explanation: "StatefulSet Pods have stable ordinal identities." },
      { question: "What does a volumeClaimTemplate create?", options: ["One shared claim for all Pods", "A separate PVC per Pod ordinal", "A Service", "A Secret"], answer: 1, explanation: "Each StatefulSet Pod ordinal receives its own PVC from the template." },
      { question: "Does StatefulSet automatically configure database replication?", options: ["Yes, always", "Only with three replicas", "No, the application must implement it", "Only on a headless Service"], answer: 2, explanation: "StatefulSet manages Kubernetes identity and lifecycle, not database replication semantics." }
    ]
  },
  DaemonSet: {
    purpose: "Learn how DaemonSets run a Pod on every eligible node, including node selection, tolerations, rolling updates and cluster-wide agents.",
    objectives: [
      "Identify workloads suited to DaemonSets.",
      "Control eligible nodes with selectors, affinity and tolerations.",
      "Understand update behavior and node coverage.",
      "Troubleshoot missing or unhealthy node agents."
    ],
    sections: [
      { title: "One Pod per eligible node", body: "A DaemonSet ensures that a copy of a Pod runs on each node that matches its scheduling constraints. Common examples include log collectors, node monitoring agents, storage daemons and networking components. The number of Pods is determined by eligible nodes rather than a manually chosen replicas field. When nodes are added, matching DaemonSet Pods are created; when nodes become ineligible or are removed, the controller adjusts the set." },
      { title: "Node selection and tolerations", body: "nodeSelector and node affinity limit which nodes should run the agent. Taints repel Pods unless matching tolerations are present. System-level DaemonSets may need tolerations for node taints so they can run on control-plane or specialized nodes, but tolerations should be intentional. Broad tolerations can place privileged agents on nodes where they are not needed." },
      { title: "Update strategy", body: "RollingUpdate replaces DaemonSet Pods gradually according to its update strategy and maxUnavailable. OnDelete updates the Pod template but waits for existing Pods to be deleted before creating replacements. For critical node agents, rollout speed should account for cluster capacity and the impact of temporarily missing telemetry, storage or networking functionality." },
      { title: "Resources and host access", body: "Node agents may need hostPath mounts, host networking or elevated capabilities. These permissions increase blast radius and should be minimized. Define resource requests so the scheduler and cluster operators can account for per-node overhead. A DaemonSet that consumes too much memory on every node can create a cluster-wide capacity incident." },
      { title: "Coverage and observability", body: "Compare desired, current, ready, available and misscheduled counts in the DaemonSet status. Check node labels, taints, allocatable resources, image availability and Pod Events. A DaemonSet can appear healthy overall while missing a particular node pool. Monitor per-node agent health, not only aggregate Pod counts." }
    ],
    manifest: `apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: node-log-agent
  namespace: kube-system
spec:
  selector:
    matchLabels:
      app: node-log-agent
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
  template:
    metadata:
      labels:
        app: node-log-agent
    spec:
      tolerations:
        - operator: Exists
      containers:
        - name: agent
          image: busybox:1.36
          command: ["sh", "-c", "while true; do sleep 3600; done"]
          resources:
            requests:
              cpu: 50m
              memory: 32Mi
            limits:
              memory: 128Mi`,
    walkthrough: [
      "kind DaemonSet declares a node-scoped workload controller.",
      "The selector must match the Pod template labels.",
      "maxUnavailable: 1 limits the number of unavailable DaemonSet Pods during a rolling update.",
      "The Exists toleration matches taints regardless of key and effect. It is intentionally broad for demonstration and must be narrowed for a real agent where possible.",
      "No replicas field is used; eligible node count determines desired Pod count."
    ],
    exercises: [
      { title: "Exercise 1 — Restrict to worker nodes", task: "Add a nodeSelector for node-role.kubernetes.io/worker: ''. Explain that your cluster must actually label nodes with this key for the selector to match.", hint: "Place nodeSelector under the Pod template's spec, not the DaemonSet's top-level spec.", solution: `      nodeSelector:\n        node-role.kubernetes.io/worker: ""` },
      { title: "Exercise 2 — Reduce rollout disruption", task: "Change maxUnavailable to 2 and describe the operational trade-off for a cluster-wide logging agent.", hint: "Find updateStrategy.rollingUpdate.", solution: `      maxUnavailable: 2\n\nThis can speed up rollout but may temporarily leave two eligible nodes without the agent.` }
    ],
    mistakes: [
      { title: "Adding replicas to DaemonSet", wrong: "spec:\n  replicas: 5", correct: "Use node selection and cluster node eligibility to control where the DaemonSet runs.", reason: "DaemonSet desired Pod count follows eligible nodes; it does not use a replicas field." },
      { title: "Ignoring taints", wrong: "Assume every node will accept the DaemonSet Pod.", correct: "Inspect node taints and add only the tolerations the agent requires.", reason: "Taints can prevent scheduling on otherwise matching nodes." },
      { title: "Mounting the entire host filesystem", wrong: "Grant broad hostPath and privileged access without a requirement.", correct: "Mount only required host paths and minimize capabilities and privileges.", reason: "Node-level agents have broad access and can affect every workload on a node." }
    ],
    scenario: {
      title: "Production incident — Logging agent missing from new nodes",
      situation: "A node pool was added, but the centralized logging dashboard shows no logs from those nodes.",
      investigation: ["Run kubectl get ds node-log-agent -n kube-system -o wide and compare desired and ready counts.", "Inspect the new nodes' labels and taints with kubectl describe node.", "Check DaemonSet Pod Events for selector mismatch, taints, insufficient resources or image-pull failures.", "Compare the new node pool's architecture and runtime with the agent image and configuration."],
      recovery: ["Apply the correct node labels or adjust the intended selector after confirming the node pool scope.", "Add only the required tolerations for the node pool's taints.", "Resolve resource or image compatibility problems and observe the DaemonSet rollout.", "Verify a healthy agent and test log delivery from each affected node."]
    },
    questions: [
      { question: "How is DaemonSet Pod count primarily determined?", options: ["A replicas field", "Eligible cluster nodes", "Service endpoints", "Cron schedule"], answer: 1, explanation: "A DaemonSet targets eligible nodes and ensures a Pod on each." },
      { question: "Which field allows a Pod to be scheduled despite a matching taint?", options: ["Annotation", "Toleration", "containerPort", "volumeMount"], answer: 1, explanation: "A toleration allows scheduling onto nodes with matching taints, subject to other constraints." },
      { question: "Which is a common DaemonSet use case?", options: ["One-time report", "Node log collection", "Web application replica count", "Scheduled backup once a day"], answer: 1, explanation: "Node-level agents such as log collectors and monitoring agents are common DaemonSets." }
    ]
  },
  Job: {
    purpose: "Understand batch workloads that run to completion, including completions, parallelism, retry behavior, deadlines, cleanup and idempotent task design.",
    objectives: [
      "Distinguish Job completion from long-running services.",
      "Configure completions, parallelism and backoffLimit.",
      "Understand restartPolicy and Pod failure behavior.",
      "Design retry-safe batch work and inspect failed executions."
    ],
    sections: [
      { title: "Run-to-completion controller", body: "A Job creates one or more Pods and tracks successful completion. It is suitable for finite work such as data processing, migration tasks, report generation or controlled maintenance. A Job is not intended to serve continuous network traffic. Completion is based on successful Pod outcomes according to the Job specification, not merely on the process starting." },
      { title: "Completions and parallelism", body: "completions defines how many successful completions are required. parallelism controls how many Pods may run concurrently. A Job with completions: 5 and parallelism: 2 aims to complete five successful work units while running no more than two concurrently. Work partitioning must be designed by the application; Kubernetes does not automatically split arbitrary data into independent tasks." },
      { title: "Retries and failure policy", body: "backoffLimit controls retry behavior for failed Pods. restartPolicy for Job Pods is typically Never or OnFailure; Always is not allowed for a Job Pod template. Retries can repeat work, so tasks should be idempotent or use durable checkpoints and deduplication. A retry policy cannot make a non-repeatable external side effect safe." },
      { title: "Deadlines, parallel failure and cleanup", body: "activeDeadlineSeconds limits how long a Job may remain active. ttlSecondsAfterFinished can allow finished Jobs and dependent Pods to be cleaned up after a retention period when the TTL controller is available. Set retention based on debugging and audit requirements. Too-short cleanup can remove useful evidence before operators investigate." },
      { title: "Operational observability", body: "Inspect Job conditions, succeeded and failed counts, Pod logs and Events. A Job may fail because of invalid commands, missing permissions, unavailable dependencies, image-pull errors or resource constraints. Use labels to associate Pods with the Job and preserve enough logs and external task state to diagnose a failed batch." }
    ],
    manifest: `apiVersion: batch/v1
kind: Job
metadata:
  name: report-generator
spec:
  completions: 5
  parallelism: 2
  backoffLimit: 3
  activeDeadlineSeconds: 900
  ttlSecondsAfterFinished: 3600
  template:
    metadata:
      labels:
        app: report-generator
    spec:
      restartPolicy: Never
      containers:
        - name: worker
          image: busybox:1.36
          command: ["sh", "-c", "echo generating report; sleep 5; echo complete"]
          resources:
            requests:
              cpu: 100m
              memory: 64Mi`,
    walkthrough: [
      "batch/v1 is the API group for Job.",
      "completions: 5 asks the Job to obtain five successful completions.",
      "parallelism: 2 caps concurrent active Pods for the Job.",
      "backoffLimit: 3 sets the retry budget for failed Pods.",
      "restartPolicy: Never means a failed Pod is replaced according to Job retry behavior rather than restarting the same container indefinitely."
    ],
    exercises: [
      { title: "Exercise 1 — Make the work sequential", task: "Change the Job to require three completions but run only one Pod at a time.", hint: "Edit completions and parallelism.", solution: `  completions: 3\n  parallelism: 1` },
      { title: "Exercise 2 — Add a time budget", task: "Set the active execution deadline to 300 seconds and explain why an application-level timeout may still be needed.", hint: "Set activeDeadlineSeconds under Job spec.", solution: `  activeDeadlineSeconds: 300\n\nThe Job deadline bounds the active Job duration; application-level timeouts are still needed for graceful cancellation and external calls.` }
    ],
    mistakes: [
      { title: "Using restartPolicy Always", wrong: "restartPolicy: Always", correct: "restartPolicy: Never", reason: "Job Pod templates support Never or OnFailure, not Always." },
      { title: "Assuming parallelism splits the input", wrong: "Set parallelism: 10 and assume ten unique data partitions are created.", correct: "Implement explicit partition assignment or queue-based work distribution in the application.", reason: "Kubernetes controls concurrent Pods; it does not know how to partition application data." },
      { title: "Ignoring duplicate execution", wrong: "Retry a task that charges a customer or writes an external record without deduplication.", correct: "Use idempotency keys, transactions, checkpoints or deduplication for side effects.", reason: "A failed Pod may have completed an external action before Kubernetes observed its failure." }
    ],
    scenario: {
      title: "Production incident — Batch Job repeatedly fails",
      situation: "A nightly report Job has failed three times. The team sees multiple failed Pods and is unsure whether the report was partially written.",
      investigation: ["Run kubectl describe job report-generator and inspect conditions and failed counts.", "List Pods selected by the Job and inspect logs for each attempt.", "Check whether the process failed before or after writing output to external storage.", "Inspect service-account permissions, mounted configuration, resource limits and dependency availability."],
      recovery: ["Determine whether partial output exists and whether rerunning can create duplicates.", "Correct the evidenced permission, configuration, resource or dependency failure.", "Use a safe idempotent retry or clean up partial output through the application's supported process.", "Verify the Job reaches the required successful completion count and validate the generated report."]
    },
    questions: [
      { question: "What is the primary purpose of a Job?", options: ["Serve continuous traffic", "Run work to completion", "Expose a Pod IP", "Store configuration"], answer: 1, explanation: "A Job manages Pods that perform finite work and records successful completions." },
      { question: "Which restartPolicy values are valid for Job Pods?", options: ["Always only", "Never or OnFailure", "UnlessStopped", "Manual"], answer: 1, explanation: "Job Pod templates support Never and OnFailure." },
      { question: "What does parallelism control?", options: ["Successful total completions", "Maximum concurrent Pods", "Container memory", "Job history count"], answer: 1, explanation: "parallelism controls how many Job Pods may run concurrently." }
    ]
  },
  CronJob: {
    purpose: "Learn scheduled batch execution, cron expressions, concurrency policies, missed schedules, deadlines, history limits and safe recurring operations.",
    objectives: [
      "Read and write Kubernetes cron schedules.",
      "Configure concurrencyPolicy and starting deadlines.",
      "Understand Job history and time zones.",
      "Design recurring tasks that are safe under retries and delayed execution."
    ],
    sections: [
      { title: "CronJob creates Jobs on a schedule", body: "A CronJob creates Job objects according to a cron schedule. The Job then creates Pods to perform the task. This separation matters during troubleshooting: the CronJob controls scheduling, the Job represents one execution, and the Pod runs the container. A schedule does not guarantee that a task starts at an exact wall-clock instant; controller delays, missed schedules and cluster availability can affect execution." },
      { title: "Cron expression and time zone", body: "The schedule field uses five cron fields: minute, hour, day of month, month and day of week. For example, 0 2 * * * means every day at 02:00 in the schedule's applicable time zone. Kubernetes versions that support spec.timeZone allow an explicit time zone such as Etc/UTC. Confirm cluster version support and choose a time zone deliberately to avoid daylight-saving surprises." },
      { title: "Concurrency policies", body: "Allow permits overlapping Jobs, Forbid skips a new scheduled run while the previous Job is still active, and Replace replaces an active Job with a new scheduled run. Select based on whether overlap is safe. For backups or billing jobs, overlapping execution may corrupt output or duplicate work. For short independent tasks, Allow may be acceptable if the application handles concurrency." },
      { title: "Missed schedules and starting deadlines", body: "startingDeadlineSeconds limits how late a missed schedule may still be started. suspend prevents future scheduled Job creation while leaving existing Jobs unaffected. If a controller has been unavailable for a long time, many schedules may have been missed; Kubernetes limits excessive catch-up calculations. Do not assume every missed occurrence will necessarily run after recovery." },
      { title: "History, retention and observability", body: "successfulJobsHistoryLimit and failedJobsHistoryLimit control how many completed Job records are retained. TTL cleanup can also be configured on the Job template. Retention should balance cluster hygiene with incident investigation and audit needs. Monitor lastScheduleTime, active Jobs, failed Jobs and the actual output or side effect of the scheduled process." },
      { title: "Reliable recurring task design", body: "A scheduled task should tolerate delayed starts, retries and occasional duplicate execution. Use a durable lock or idempotency mechanism when only one run may perform a critical action. Set timeouts and resource requests, use least-privilege service accounts, and store credentials outside the manifest. A successful Job status does not prove a backup is restorable; test restore procedures separately." }
    ],
    manifest: `apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-report
spec:
  schedule: "0 2 * * *"
  timeZone: "Etc/UTC"
  concurrencyPolicy: Forbid
  startingDeadlineSeconds: 300
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 5
  jobTemplate:
    spec:
      backoffLimit: 2
      activeDeadlineSeconds: 600
      ttlSecondsAfterFinished: 86400
      template:
        spec:
          restartPolicy: Never
          containers:
            - name: report
              image: busybox:1.36
              command: ["sh", "-c", "echo report started; date; echo report complete"]
              resources:
                requests:
                  cpu: 100m
                  memory: 64Mi`,
    walkthrough: [
      "schedule uses five cron fields. 0 2 * * * requests a run every day at 02:00.",
      "timeZone makes the intended schedule zone explicit on Kubernetes versions that support the field.",
      "Forbid prevents a new scheduled Job from overlapping an active Job; a schedule can be skipped while the prior Job is still running.",
      "startingDeadlineSeconds bounds how late a missed schedule may be started.",
      "jobTemplate contains the Job specification, which in turn contains the Pod template."
    ],
    exercises: [
      { title: "Exercise 1 — Schedule a weekly task", task: "Change the schedule to run every Sunday at 03:30 UTC.", hint: "The five cron fields are minute, hour, day of month, month and day of week. Sunday is commonly represented as 0 or 7.", solution: `  schedule: "30 3 * * 0"\n  timeZone: "Etc/UTC"` },
      { title: "Exercise 2 — Allow overlap intentionally", task: "Change concurrencyPolicy to Allow and state one condition that must be true before this is safe.", hint: "The application must safely handle simultaneous executions.", solution: `  concurrencyPolicy: Allow\n\nThis is safe only when concurrent runs are independent or protected by application-level locking and idempotency.` }
    ],
    mistakes: [
      { title: "Wrong cron field order", wrong: 'schedule: "2 0 * * *"', correct: 'schedule: "0 2 * * *"', reason: "The first field is minute and the second is hour. These examples mean different times." },
      { title: "Assuming Forbid queues every missed run", wrong: "Expect every skipped occurrence to run later automatically.", correct: "Monitor missed schedules and design recovery or backfill procedures for important work.", reason: "Forbid prevents overlap; it is not a durable queue of every missed occurrence." },
      { title: "Treating Job success as backup verification", wrong: "Declare backup recoverable because the Job completed.", correct: "Validate artifact integrity and perform scheduled restore tests.", reason: "A process can exit successfully while producing an incomplete or unusable backup." }
    ],
    scenario: {
      title: "Production incident — Nightly task did not run",
      situation: "The morning operations report is missing. The CronJob exists, but there is no successful Job for the expected schedule.",
      investigation: ["Run kubectl describe cronjob nightly-report and inspect schedule, suspend state, lastScheduleTime and Events.", "List Jobs owned by the CronJob and inspect failed executions and their Pods.", "Check controller availability, time zone, startingDeadlineSeconds and concurrencyPolicy.", "Inspect the previous Job duration. A long-running active Job combined with Forbid may have skipped a later schedule."],
      recovery: ["Determine whether a backfill is required and whether rerunning the task is safe.", "Correct the schedule, time zone, suspension or runtime failure based on evidence.", "Trigger a controlled one-off Job from the approved template if the missed business operation must be recovered.", "Verify the output itself and add monitoring for missed schedules and failed Jobs."]
    },
    questions: [
      { question: "What resource does a CronJob create on a schedule?", options: ["Deployment", "Job", "Service", "PersistentVolume"], answer: 1, explanation: "CronJob creates Job objects according to its schedule." },
      { question: "What does concurrencyPolicy: Forbid do?", options: ["Always overlap Jobs", "Skip a new run while an earlier Job is active", "Delete every completed Job", "Pause the cluster"], answer: 1, explanation: "Forbid prevents concurrent active Jobs for that CronJob." },
      { question: "Which cron expression means daily at 02:00?", options: ["2 0 * * *", "0 2 * * *", "0 * 2 * *", "0 0 2 * *"], answer: 1, explanation: "The fields are minute, hour, day of month, month and day of week." }
    ]
  }
};

const tabNames = ["Learn", "Examples", "Practice", "Debug", "Validate", "Scenarios", "Quiz"];

export default function YamlKubernetesWorkloadsWorkspace({ topic, tab }: { topic: string; tab: string }) {
  const lesson = lessons[topic];
  const [editorValue, setEditorValue] = useState(lesson?.manifest ?? "");
  const [validation, setValidation] = useState<{ ok: boolean; messages: string[] } | null>(null);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setEditorValue(lesson?.manifest ?? "");
    setValidation(null);
    setRevealed({});
    setAnswers({});
    setSubmitted(false);
  }, [topic, lesson]);

  const activeTab = tabNames.includes(tab) ? tab : "Learn";
  const score = useMemo(
    () => lesson ? lesson.questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0) : 0,
    [lesson, answers]
  );

  if (!lesson) {
    return (
      <section className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-950">
        <h3 className="font-semibold">Kubernetes Workloads lesson is not mapped yet</h3>
        <p className="mt-2">Selected topic: {topic}. The six supported topics are Pod, Deployment, StatefulSet, DaemonSet, Job and CronJob.</p>
      </section>
    );
  }

  const toggle = (key: string) => setRevealed(current => ({ ...current, [key]: !current[key] }));

  const validateYaml = () => {
    const document = parseDocument(editorValue, { uniqueKeys: true });
    const messages = [
      ...document.errors.map(error => `${error.name}: ${error.message} (line ${error.linePos?.[0]?.line ?? "?"}, column ${error.linePos?.[0]?.col ?? "?"})`),
      ...document.warnings.map(warning => `${warning.name}: ${warning.message}`)
    ];
    setValidation({ ok: document.errors.length === 0, messages: messages.length ? messages : ["YAML syntax is valid. This parser check does not replace Kubernetes API server or schema validation."] });
  };

  const markComplete = (key: string) => setCompleted(current => ({ ...current, [key]: true }));

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-800 p-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Kubernetes Workloads · Topic workspace</p>
            <h2 className="mt-2 text-2xl font-bold">{topic}</h2>
          </div>
          <span className="rounded-full border border-cyan-300/40 px-3 py-1 text-xs text-cyan-100">Learn · Practice · Debug</span>
        </div>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-200">{lesson.purpose}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-lg bg-white/10 px-3 py-2 text-xs">{lesson.sections.length} concept sections</span>
          <span className="rounded-lg bg-white/10 px-3 py-2 text-xs">{lesson.exercises.length} hands-on exercises</span>
          <span className="rounded-lg bg-white/10 px-3 py-2 text-xs">{lesson.mistakes.length} debugging cases</span>
          <span className="rounded-lg bg-white/10 px-3 py-2 text-xs">{lesson.questions.length} quiz questions</span>
        </div>
      </section>


      {activeTab === "Learn" && (
        <div className="space-y-4">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-bold text-slate-900">Learning objectives</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
              {lesson.objectives.map(item => <li key={item}>{item}</li>)}
            </ul>
          </section>
          {lesson.sections.map((section, index) => (
            <article key={section.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700">Concept {index + 1}</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">{section.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{section.body}</p>
              <button onClick={() => markComplete(section.title)} className="mt-3 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                {completed[section.title] ? "Read · Completed" : "Mark section as read"}
              </button>
            </article>
          ))}
        </div>
      )}

      {activeTab === "Examples" && (
        <div className="space-y-4">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-bold text-slate-900">{topic} manifest example</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">This is an educational manifest. Review API compatibility, security, storage, resource and application requirements before using a real cluster.</p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-cyan-100"><code>{lesson.manifest}</code></pre>
          </section>
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-bold text-slate-900">Manifest walkthrough</h3>
            <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-700">
              {lesson.walkthrough.map((line, index) => <li key={index}>{line}</li>)}
            </ol>
          </section>
        </div>
      )}

      {activeTab === "Practice" && (
        <div className="space-y-4">
          {lesson.exercises.map((exercise, index) => (
            <article key={exercise.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">{exercise.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{exercise.task}</p>
              <button onClick={() => toggle(`hint-${index}`)} className="mt-3 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold"> {revealed[`hint-${index}`] ? "Hide hint" : "Show hint"} </button>
              {revealed[`hint-${index}`] && <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-950">{exercise.hint}</p>}
              <button onClick={() => toggle(`solution-${index}`)} className="ml-2 mt-3 rounded-lg border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-800">{revealed[`solution-${index}`] ? "Hide reference solution" : "Reveal reference solution"}</button>
              {revealed[`solution-${index}`] && <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs leading-6 text-emerald-200"><code>{exercise.solution}</code></pre>}
            </article>
          ))}
        </div>
      )}

      {activeTab === "Debug" && (
        <div className="space-y-4">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-bold text-slate-900">Common configuration mistakes</h3>
            <p className="mt-2 text-sm text-slate-600">Compare the faulty pattern with the safer correction and understand the operational consequence.</p>
          </section>
          {lesson.mistakes.map((mistake, index) => (
            <article key={mistake.title} className="rounded-xl border border-rose-200 bg-white p-5">
              <h4 className="font-bold text-slate-900">{index + 1}. {mistake.title}</h4>
              <p className="mt-3 text-xs font-semibold uppercase text-rose-700">Incorrect pattern</p>
              <pre className="mt-1 overflow-x-auto rounded-lg bg-rose-50 p-3 text-xs leading-6 text-rose-950"><code>{mistake.wrong}</code></pre>
              <p className="mt-3 text-xs font-semibold uppercase text-emerald-700">Correct approach</p>
              <pre className="mt-1 overflow-x-auto rounded-lg bg-emerald-50 p-3 text-xs leading-6 text-emerald-950"><code>{mistake.correct}</code></pre>
              <p className="mt-3 text-sm leading-6 text-slate-700">{mistake.reason}</p>
            </article>
          ))}
        </div>
      )}

      {activeTab === "Validate" && (
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-bold text-slate-900">YAML syntax validation workspace</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Edit this topic's manifest and validate YAML syntax. This checks parsing and duplicate keys; Kubernetes API schema and cluster admission checks are separate validation layers.</p>
          <textarea value={editorValue} onChange={event => { setEditorValue(event.target.value); setValidation(null); }} spellCheck={false} className="mt-4 min-h-[360px] w-full rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-xs leading-6 text-emerald-100 outline-none focus:ring-2 focus:ring-cyan-500" />
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={validateYaml} className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800">Validate YAML</button>
            <button onClick={() => { setEditorValue(lesson.manifest); setValidation(null); }} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Reset example</button>
          </div>
          {validation && (
            <div className={`mt-4 rounded-xl border p-4 ${validation.ok ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50"}`}>
              <p className={`font-semibold ${validation.ok ? "text-emerald-900" : "text-rose-900"}`}>{validation.ok ? "YAML parsed successfully" : "YAML parsing errors found"}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {validation.messages.map((message, index) => <li key={index}>{message}</li>)}
              </ul>
            </div>
          )}
        </section>
      )}

      {activeTab === "Scenarios" && (
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">Production incident simulation</p>
            <h3 className="mt-1 text-lg font-bold text-slate-900">{lesson.scenario.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">{lesson.scenario.situation}</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Investigation plan</h4>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
              {lesson.scenario.investigation.map((item, index) => <li key={index}>{item}</li>)}
            </ol>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Recovery and verification</h4>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
              {lesson.scenario.recovery.map((item, index) => <li key={index}>{item}</li>)}
            </ol>
          </div>
          <p className="rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-950">Practice note: these are investigation and recovery procedures for a lab. Do not execute destructive storage or production commands without an approved change and backup plan.</p>
        </section>
      )}

      {activeTab === "Quiz" && (
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{topic} knowledge check</h3>
            <p className="mt-1 text-sm text-slate-600">Choose one answer for each question, then submit to see your score and explanations.</p>
          </div>
          {lesson.questions.map((question, index) => (
            <article key={question.question} className="rounded-xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">{index + 1}. {question.question}</p>
              <div className="mt-3 space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label key={option} className="flex cursor-pointer items-center gap-2 rounded-lg bg-slate-50 p-2 text-sm text-slate-700">
                    <input type="radio" name={`quiz-${topic}-${index}`} checked={answers[index] === optionIndex} onChange={() => { setAnswers(current => ({ ...current, [index]: optionIndex })); setSubmitted(false); }} />
                    {option}
                  </label>
                ))}
              </div>
              {submitted && <p className={`mt-3 text-sm leading-6 ${answers[index] === question.answer ? "text-emerald-700" : "text-rose-700"}`}>{answers[index] === question.answer ? "Correct. " : `Correct answer: ${question.options[question.answer]}. `}{question.explanation}</p>}
            </article>
          ))}
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length !== lesson.questions.length} className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">Submit quiz</button>
            <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Retry quiz</button>
            {submitted && <span className="text-sm font-bold text-slate-900">Score: {score}/{lesson.questions.length}</span>}
          </div>
        </section>
      )}
    </div>
  );
}
