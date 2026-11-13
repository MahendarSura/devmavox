"use client";

import { useState } from "react";
import { parseDocument } from "yaml";

type OperationsTopic = {
  title: string;
  description: string;
  purpose: string;
  concepts: string[];
  yaml: string;
  practice: string[];
  mistakes: string[];
  incident: string;
  recovery: string[];
  quiz: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  }[];
};

const lessons: Record<string, OperationsTopic> = {
  "Liveness Probe": {
    title: "Kubernetes Liveness Probe",
    description:
      "A liveness probe helps Kubernetes determine whether a running container is still healthy enough to continue operating. When a liveness check repeatedly fails, kubelet restarts the affected container.",
    purpose:
      "Use liveness probes to recover from processes that are alive but stuck, deadlocked, or unable to make progress. A liveness probe should not be used as a substitute for application monitoring or dependency health checks.",
    concepts: [
      "httpGet checks an HTTP endpoint and treats successful HTTP response codes as healthy.",
      "tcpSocket checks whether a TCP connection can be established to the configured port.",
      "exec executes a command inside the container and evaluates its exit code.",
      "initialDelaySeconds controls how long kubelet waits before the first probe.",
      "periodSeconds controls the interval between probe attempts.",
      "timeoutSeconds defines the maximum time allowed for one probe.",
      "failureThreshold determines consecutive failures before the probe is considered failed.",
      "successThreshold controls consecutive successes required to recover; liveness probes require a success threshold of 1.",
      "A failed liveness probe causes a container restart, not necessarily a Pod replacement.",
      "Aggressive liveness checks can create restart loops during temporary load or dependency interruptions."
    ],
    yaml: `apiVersion: v1
kind: Pod
metadata:
  name: liveness-demo
  labels:
    app: liveness-demo
spec:
  containers:
    - name: application
      image: nginx:1.27
      ports:
        - name: http
          containerPort: 80
      livenessProbe:
        httpGet:
          path: /
          port: http
          scheme: HTTP
        initialDelaySeconds: 10
        periodSeconds: 10
        timeoutSeconds: 2
        failureThreshold: 3
        successThreshold: 1
      terminationMessagePolicy: File
      resources:
        requests:
          cpu: 100m
          memory: 64Mi
        limits:
          cpu: 500m
          memory: 256Mi`,
    practice: [
      "Configure an HTTP liveness endpoint at /healthz on port 8080.",
      "Set the initial delay to 15 seconds and the probe interval to 10 seconds.",
      "Configure a timeout of 3 seconds and a failure threshold of 3.",
      "Explain why a liveness probe should not restart an application simply because its database is temporarily unavailable."
    ],
    mistakes: [
      "Using an endpoint that checks every external dependency can restart healthy application processes during an external outage.",
      "Setting initialDelaySeconds too low can restart applications before they finish initialization.",
      "Using an unnecessarily short timeout can cause false failures under CPU pressure.",
      "A liveness probe that always returns success cannot detect a stuck application.",
      "Ignoring restart counts can hide repeated liveness failures."
    ],
    incident:
      "A production application enters a CrashLoopBackOff state after a database outage. Its liveness endpoint checks database connectivity, so every application container is restarted even though the application process itself is functioning correctly.",
    recovery: [
      "Inspect kubectl describe pod and review liveness probe failure events.",
      "Check kubectl logs and kubectl logs --previous for the container's previous execution.",
      "Separate process-health checks from external dependency readiness checks.",
      "Make the liveness endpoint verify that the application process can make progress.",
      "Adjust probe timing based on observed startup and response latency.",
      "Monitor restart counts after the configuration change."
    ],
    quiz: [
      {
        question: "What happens when a liveness probe repeatedly fails?",
        options: ["The container is restarted", "The Service is deleted", "The node is always rebooted", "The image is rebuilt"],
        answer: 0,
        explanation: "Kubelet restarts the container after the configured consecutive failures."
      },
      {
        question: "Which probe mechanism checks an HTTP endpoint?",
        options: ["tcpSocket", "httpGet", "exec only", "persistentVolume"],
        answer: 1,
        explanation: "httpGet performs an HTTP request against the configured endpoint."
      },
      {
        question: "Should liveness normally fail because a database is temporarily unavailable?",
        options: ["Yes, always", "Only during deployments", "No, not by default", "It must delete the Pod"],
        answer: 2,
        explanation: "Dependency availability is usually better represented by readiness, avoiding unnecessary restarts."
      }
    ]
  },

  "Readiness Probe": {
    title: "Kubernetes Readiness Probe",
    description:
      "A readiness probe determines whether a container is ready to receive traffic. Kubernetes uses readiness status to decide whether the Pod should be included as a ready backend for matching Services.",
    purpose:
      "Use readiness checks to prevent traffic from reaching applications that are starting, temporarily overloaded, initializing, or unable to serve requests correctly.",
    concepts: [
      "A successful readiness probe marks the container ready.",
      "A failed readiness probe removes the Pod from ready Service endpoints while the failure persists.",
      "Readiness failures do not automatically restart the container.",
      "httpGet, tcpSocket and exec can be used for readiness checks.",
      "readinessGates allow additional conditions to influence Pod readiness.",
      "periodSeconds controls how frequently readiness is checked.",
      "successThreshold can require multiple successful checks before readiness returns.",
      "Readiness probes are useful during application initialization and temporary overload.",
      "A Service normally sends traffic only to eligible ready endpoints.",
      "Readiness checks should represent the application's ability to serve real requests."
    ],
    yaml: `apiVersion: v1
kind: Pod
metadata:
  name: readiness-demo
  labels:
    app: readiness-demo
spec:
  containers:
    - name: application
      image: nginx:1.27
      ports:
        - name: http
          containerPort: 80
      readinessProbe:
        httpGet:
          path: /
          port: http
        initialDelaySeconds: 5
        periodSeconds: 5
        timeoutSeconds: 2
        failureThreshold: 3
        successThreshold: 2
      resources:
        requests:
          cpu: 100m
          memory: 64Mi
        limits:
          cpu: 500m
          memory: 256Mi`,
    practice: [
      "Create a readiness probe using HTTP path /ready on port 8080.",
      "Set periodSeconds to 5 and failureThreshold to 3.",
      "Require two consecutive successful checks before readiness returns.",
      "Explain how a readiness failure affects traffic through a Kubernetes Service."
    ],
    mistakes: [
      "Assuming a failed readiness probe restarts the container.",
      "Using an endpoint that always returns success even when the application cannot serve traffic.",
      "Checking a dependency that is not actually required for serving the request.",
      "Configuring readiness without considering startup behavior.",
      "Confusing Pod Running status with Pod Ready status."
    ],
    incident:
      "A new application Pod becomes Running but receives traffic before its cache and application routes are initialized. Users experience intermittent HTTP 500 responses during deployment.",
    recovery: [
      "Inspect Pod conditions using kubectl get pods and kubectl describe pod.",
      "Check Service endpoints using kubectl get endpointslices.",
      "Review the readiness endpoint response and application initialization logs.",
      "Add or correct the readiness probe so it represents actual traffic readiness.",
      "Verify that the Pod becomes ready only after initialization completes.",
      "Perform a controlled rollout and monitor error rates."
    ],
    quiz: [
      {
        question: "What does a failed readiness probe normally do?",
        options: ["Restart the node", "Remove the Pod from ready traffic endpoints", "Delete the Deployment", "Rebuild the container"],
        answer: 1,
        explanation: "The container remains running, but the Pod is not considered ready to serve traffic."
      },
      {
        question: "Which probe is most directly responsible for deciding traffic readiness?",
        options: ["Readiness", "Liveness", "StorageClass", "HPA"],
        answer: 0,
        explanation: "Readiness determines whether the workload should receive traffic."
      },
      {
        question: "Can a Pod be Running but not Ready?",
        options: ["No", "Only on Windows", "Yes", "Only with StatefulSets"],
        answer: 2,
        explanation: "Running describes the Pod phase; readiness is a separate condition."
      }
    ]
  },

  "Startup Probe": {
    title: "Kubernetes Startup Probe",
    description:
      "A startup probe gives slow-starting containers time to initialize. Until the startup probe succeeds, Kubernetes does not run the configured liveness and readiness probes for that container.",
    purpose:
      "Use startup probes for applications that need substantial initialization time, such as Java services, applications performing migrations, or systems loading large configuration and cache datasets.",
    concepts: [
      "Startup probes protect slow-starting applications from premature liveness restarts.",
      "A successful startup probe allows liveness and readiness probes to begin.",
      "A failed startup probe after its failure threshold causes the container to be restarted.",
      "failureThreshold multiplied by periodSeconds provides an approximate startup failure window.",
      "initialDelaySeconds can delay the first startup probe.",
      "timeoutSeconds limits the duration of an individual probe.",
      "Startup probes can use httpGet, tcpSocket or exec.",
      "A startup probe should measure completion of initialization, not merely process creation.",
      "Liveness and readiness can be configured together with startup probes.",
      "The startup probe should be based on realistic worst-case startup duration."
    ],
    yaml: `apiVersion: v1
kind: Pod
metadata:
  name: startup-demo
spec:
  containers:
    - name: application
      image: nginx:1.27
      ports:
        - name: http
          containerPort: 80
      startupProbe:
        httpGet:
          path: /
          port: http
        periodSeconds: 10
        timeoutSeconds: 3
        failureThreshold: 30
      livenessProbe:
        httpGet:
          path: /
          port: http
        periodSeconds: 10
        failureThreshold: 3
      readinessProbe:
        httpGet:
          path: /
          port: http
        periodSeconds: 5
        failureThreshold: 3`,
    practice: [
      "Configure a startup probe using /startup on port 8080.",
      "Allow up to 5 minutes for startup using periodSeconds 10 and failureThreshold 30.",
      "Add a liveness probe that checks /healthz after startup succeeds.",
      "Explain how startup probes protect slow-starting applications."
    ],
    mistakes: [
      "Using a startup failure threshold that is too small for real application initialization.",
      "Assuming startup probes replace readiness and liveness probes permanently.",
      "Checking an endpoint that becomes successful before initialization is actually complete.",
      "Using an extremely long startup window that hides genuine application failures.",
      "Ignoring container restart history after startup probe failures."
    ],
    incident:
      "A Java application requires approximately 150 seconds to load configuration, initialize its framework, and warm up caches. A liveness probe begins too early and repeatedly restarts the container before initialization finishes.",
    recovery: [
      "Inspect Pod events and previous container logs.",
      "Measure actual application startup time under realistic load.",
      "Configure a startup probe with a realistic failure window.",
      "Keep liveness focused on post-startup process health.",
      "Keep readiness focused on the ability to serve traffic.",
      "Validate startup behavior during a controlled rollout."
    ],
    quiz: [
      {
        question: "What is the main purpose of a startup probe?",
        options: ["Scale replicas", "Protect slow application startup", "Create a Service", "Allocate storage"],
        answer: 1,
        explanation: "It prevents liveness and readiness checks from running before startup succeeds."
      },
      {
        question: "What happens to liveness checks before startup succeeds?",
        options: ["They run normally", "They are skipped", "They delete the Deployment", "They scale the Pod"],
        answer: 1,
        explanation: "The startup probe controls when the other probes begin for that container."
      },
      {
        question: "Which setting controls consecutive startup failures?",
        options: ["replicas", "maxSurge", "failureThreshold", "storageClassName"],
        answer: 2,
        explanation: "failureThreshold determines the number of consecutive failed checks before failure."
      }
    ]
  },

  "Resource Requests and Limits": {
    title: "Kubernetes Resource Requests and Limits",
    description:
      "Resource requests and limits define how Kubernetes schedules and constrains CPU and memory usage for containers. Requests influence scheduling, while limits establish resource ceilings enforced by the container runtime and Linux kernel.",
    purpose:
      "Use resource configuration to improve scheduling decisions, reduce noisy-neighbor problems, protect nodes from resource exhaustion, and make workload capacity more predictable.",
    concepts: [
      "CPU requests represent the amount of CPU used for scheduling decisions.",
      "CPU limits restrict CPU consumption and can cause throttling when exceeded.",
      "Memory requests influence scheduling and are not a hard memory usage ceiling.",
      "Memory limits establish a maximum memory boundary; exceeding it can result in OOM termination.",
      "1000m CPU represents one CPU core; 100m represents one tenth of a core.",
      "Memory quantities commonly use Mi and Gi binary units or M and G decimal units.",
      "A Pod can remain Pending when nodes cannot satisfy its resource requests.",
      "QoS classes include Guaranteed, Burstable and BestEffort.",
      "CPU and memory resource settings are configured per container.",
      "Actual usage should be measured before setting production requests and limits."
    ],
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: resource-demo
spec:
  replicas: 3
  selector:
    matchLabels:
      app: resource-demo
  template:
    metadata:
      labels:
        app: resource-demo
    spec:
      containers:
        - name: application
          image: nginx:1.27
          ports:
            - containerPort: 80
          resources:
            requests:
              cpu: 250m
              memory: 256Mi
            limits:
              cpu: 1000m
              memory: 512Mi`,
    practice: [
      "Set CPU request to 200m and CPU limit to 500m.",
      "Set memory request to 256Mi and memory limit to 512Mi.",
      "Create a Deployment with three replicas and resource configuration.",
      "Explain why CPU limit violations and memory limit violations can have different symptoms.",
      "Investigate why a Pod may remain Pending when its resource requests cannot fit on available nodes."
    ],
    mistakes: [
      "Setting memory requests much higher than actual workload requirements can waste schedulable cluster capacity.",
      "Setting CPU limits too low can cause throttling and high application latency.",
      "Setting memory limits too low can result in OOMKilled containers.",
      "Using BestEffort workloads unintentionally in production.",
      "Copying resource values from another application without measuring actual usage."
    ],
    incident:
      "A production API experiences latency spikes after a deployment. CPU usage is consistently throttled because the configured CPU limit is too restrictive. Another workload is OOMKilled because its memory limit is below its actual working-set requirement.",
    recovery: [
      "Inspect kubectl describe pod for OOMKilled status and resource-related events.",
      "Review current usage using kubectl top pods and kubectl top nodes when Metrics Server is available.",
      "Inspect historical monitoring data to understand normal and peak resource consumption.",
      "Adjust CPU requests and limits based on measured utilization and performance requirements.",
      "Set memory limits with adequate headroom and monitor OOM events.",
      "Check node allocatable resources and scheduling capacity before increasing requests.",
      "Validate changes with a controlled rollout."
    ],
    quiz: [
      {
        question: "What primarily influences Kubernetes scheduling?",
        options: ["Resource requests", "Container logs", "Service ports", "Image tags"],
        answer: 0,
        explanation: "The scheduler evaluates resource requests against available node capacity."
      },
      {
        question: "What can happen when a container exceeds its CPU limit?",
        options: ["Automatic node deletion", "CPU throttling", "PersistentVolume deletion", "Service recreation"],
        answer: 1,
        explanation: "CPU consumption can be throttled when the configured CPU limit is reached."
      },
      {
        question: "What does OOMKilled commonly indicate?",
        options: ["CPU request missing", "Memory limit or available memory exhaustion", "Ingress misconfiguration", "Readiness success"],
        answer: 1,
        explanation: "The container was terminated because it exceeded available memory constraints or encountered an out-of-memory condition."
      }
    ]
  },

  "HPA": {
    title: "Horizontal Pod Autoscaler (HPA)",
    description:
      "The Horizontal Pod Autoscaler automatically adjusts the number of workload replicas based on observed metrics. It commonly scales Deployments and StatefulSets using CPU utilization, memory metrics, or custom and external metrics.",
    purpose:
      "Use HPA to increase or decrease application replicas as workload demand changes. It helps maintain application capacity without requiring operators to manually change replica counts for every traffic fluctuation.",
    concepts: [
      "HPA adjusts the desired replica count of a supported scalable workload.",
      "CPU utilization targets are calculated relative to requested CPU resources.",
      "Metrics Server commonly supplies resource metrics such as CPU and memory.",
      "Custom metrics can be used for application-specific scaling signals.",
      "External metrics can represent signals outside the Kubernetes object model.",
      "minReplicas establishes the minimum allowed replica count.",
      "maxReplicas establishes the maximum allowed replica count.",
      "scaleTargetRef identifies the target workload.",
      "The autoscaling/v2 API supports multiple metrics and scaling behavior policies.",
      "HPA works with resource requests; missing CPU requests can prevent meaningful CPU utilization calculations.",
      "HPA does not create additional cluster nodes by itself; Cluster Autoscaler or another node provisioning mechanism may be needed.",
      "Scaling stabilization and rate policies help avoid rapid replica fluctuations."
    ],
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: hpa-demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hpa-demo
  template:
    metadata:
      labels:
        app: hpa-demo
    spec:
      containers:
        - name: application
          image: nginx:1.27
          ports:
            - containerPort: 80
          resources:
            requests:
              cpu: 200m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 256Mi
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: hpa-demo
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: hpa-demo
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300`,
    practice: [
      "Create an HPA targeting a Deployment named api-server.",
      "Set minReplicas to 2 and maxReplicas to 8.",
      "Configure a CPU utilization target of 65 percent.",
      "Ensure the target containers have CPU requests configured.",
      "Explain why HPA may show unknown metrics when Metrics Server is unavailable.",
      "Explain why HPA scaling may increase Pod count without increasing cluster node count."
    ],
    mistakes: [
      "Forgetting CPU requests and expecting CPU utilization-based scaling to work correctly.",
      "Assuming HPA automatically installs or repairs Metrics Server.",
      "Setting maxReplicas too high without checking cluster capacity.",
      "Assuming HPA automatically provisions more worker nodes.",
      "Using noisy metrics without stabilization or suitable scaling behavior.",
      "Manually changing replicas repeatedly while HPA controls the same workload."
    ],
    incident:
      "An API deployment stays at two replicas during a traffic spike. HPA reports unknown CPU metrics because Metrics Server is unavailable. In another case, HPA requests additional replicas but the Pods remain Pending because the cluster has insufficient capacity.",
    recovery: [
      "Inspect HPA status with kubectl get hpa and kubectl describe hpa.",
      "Check Metrics Server health and API availability.",
      "Verify CPU requests exist on all relevant containers.",
      "Confirm that the scaleTargetRef matches the intended Deployment.",
      "Check Pod events and node capacity when new replicas remain Pending.",
      "Review minimum, maximum and stabilization settings.",
      "Validate scaling behavior under controlled load before production use."
    ],
    quiz: [
      {
        question: "What does HPA primarily change?",
        options: ["Container image", "Number of workload replicas", "Node operating system", "Storage class"],
        answer: 1,
        explanation: "HPA adjusts the desired replica count of a scalable workload."
      },
      {
        question: "Which API version supports modern HPA metric and behavior configuration?",
        options: ["v1", "apps/v1", "autoscaling/v2", "networking/v1"],
        answer: 2,
        explanation: "autoscaling/v2 supports multiple metric types and scaling behavior configuration."
      },
      {
        question: "Does HPA automatically add worker nodes?",
        options: ["Yes, always", "No, node scaling requires a separate mechanism", "Only with Services", "Only with ConfigMaps"],
        answer: 1,
        explanation: "HPA scales Pods; node provisioning is handled by a separate node autoscaling system."
      }
    ]
  }
};


export default function YamlKubernetesOperationsWorkspace({
  topic,
  tab
}: {
  topic: string;
  tab: string;
}) {
  const lesson = lessons[topic] ?? lessons["Liveness Probe"];
  const activeTab = tab || "Learn";
  const [yamlText, setYamlText] = useState(lesson.yaml);
  const [validation, setValidation] = useState("");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const selectedCount = Object.keys(quizAnswers).length;
  const correctCount = lesson.quiz.filter(
    (item, index) => quizAnswers[index] === item.answer
  ).length;

  function validateYaml() {
    try {
      const document = parseDocument(yamlText, { uniqueKeys: true });
      if (document.errors.length > 0) {
        setValidation(document.errors.map(error => error.message).join("\n"));
        return;
      }

      const parsed = document.toJS();
      if (!parsed || typeof parsed !== "object") {
        setValidation("YAML parsed, but the document does not contain a Kubernetes object.");
        return;
      }

      const objects = Array.isArray(parsed) ? parsed : [parsed];
      const problems: string[] = [];

      objects.forEach((object, index) => {
        if (!object || typeof object !== "object") {
          problems.push(`Document ${index + 1}: expected a Kubernetes object.`);
          return;
        }

        if (!object.apiVersion) problems.push(`Document ${index + 1}: apiVersion is missing.`);
        if (!object.kind) problems.push(`Document ${index + 1}: kind is missing.`);
        if (!object.metadata?.name) problems.push(`Document ${index + 1}: metadata.name is missing.`);
      });

      setValidation(
        problems.length
          ? "YAML syntax is valid, but structural checks found:\n" + problems.join("\n")
          : `PASS: ${objects.length} YAML document(s) parsed successfully. Basic Kubernetes object structure is present. This is a local structural check, not a live cluster admission test.`
      );
    } catch (error) {
      setValidation(error instanceof Error ? error.message : "Unknown YAML validation error.");
    }
  }

  function loadExample() {
    setYamlText(lesson.yaml);
    setValidation("");
  }

  return (
    <section className="w-full space-y-6">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Kubernetes Operations Learning Workspace
          </span>
          <span className="text-xs rounded-full px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            Topic-specific learning
          </span>
        </div>
        <h2 className="text-2xl font-bold">{lesson.title}</h2>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
          {lesson.description}
        </p>
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4">
          <h3 className="font-semibold mb-2">Why this concept matters in production</h3>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            {lesson.purpose}
          </p>
        </div>
      </div>


      {activeTab === "Learn" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Concepts and Technical Foundations</h3>
          {lesson.concepts.map((concept, index) => (
            <div key={index} className="flex gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <span className="font-bold text-blue-600">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-7">{concept}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Examples" && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Production-oriented YAML Example</h3>
          <p className="text-sm text-slate-500">
            Study the API version, resource kind, metadata, specification and topic-specific configuration.
          </p>
          <pre className="overflow-x-auto rounded-xl bg-slate-950 text-green-300 p-5 text-sm leading-7">
            <code>{lesson.yaml}</code>
          </pre>
          <button onClick={loadExample} className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm">
            Load example into editor
          </button>
        </div>
      )}

      {activeTab === "Practice" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Hands-on Practice Tasks</h3>
          {lesson.practice.map((task, index) => (
            <div key={index} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="font-medium text-sm">Exercise {index + 1}</p>
              <p className="mt-2 text-sm leading-7">{task}</p>
            </div>
          ))}
          <p className="text-sm text-slate-500">
            Complete each exercise by modifying the YAML editor and validating your configuration.
          </p>
        </div>
      )}

      {activeTab === "Debug" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Common Mistakes and Troubleshooting</h3>
          {lesson.mistakes.map((mistake, index) => (
            <div key={index} className="rounded-xl border border-amber-200 dark:border-amber-900 p-4">
              <p className="text-sm leading-7">
                <strong>Problem {index + 1}:</strong> {mistake}
              </p>
            </div>
          ))}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4 space-y-2">
            <h4 className="font-semibold">Useful diagnostic commands</h4>
            <pre className="overflow-x-auto text-xs leading-7">
              <code>{`kubectl get pods -o wide
kubectl describe pod <pod-name>
kubectl get events --sort-by=.lastTimestamp
kubectl logs <pod-name> --all-containers
kubectl logs <pod-name> --previous
kubectl top pods
kubectl top nodes`}</code>
            </pre>
            <p className="text-xs text-slate-500">
              Some commands require the relevant metrics components or permissions. Replace placeholders with actual resource names.
            </p>
          </div>
        </div>
      )}

      {activeTab === "Validate" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">YAML Editor and Validator</h3>
          <p className="text-sm text-slate-500">
            Edit the YAML and run local parsing plus basic Kubernetes object structure checks.
          </p>
          <textarea
            value={yamlText}
            onChange={event => {
              setYamlText(event.target.value);
              setValidation("");
            }}
            spellCheck={false}
            className="w-full min-h-[420px] rounded-xl bg-slate-950 text-green-300 p-5 font-mono text-sm leading-6"
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={validateYaml} className="rounded-lg bg-green-700 text-white px-5 py-2 text-sm font-semibold">
              Validate YAML
            </button>
            <button onClick={loadExample} className="rounded-lg border border-slate-300 px-5 py-2 text-sm">
              Restore example
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
          <h3 className="text-xl font-semibold">Production Incident Scenario</h3>
          <div className="rounded-xl border border-red-200 dark:border-red-900 p-5 space-y-3">
            <span className="text-xs font-semibold uppercase text-red-600">Production incident</span>
            <p className="text-sm leading-7">{lesson.incident}</p>
          </div>
          <h4 className="font-semibold">Investigation and recovery workflow</h4>
          {lesson.recovery.map((step, index) => (
            <div key={index} className="flex gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
              <span className="rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">
                {index + 1}
              </span>
              <p className="text-sm leading-7">{step}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Quiz" && (
        <div className="space-y-5">
          <div>
            <h3 className="text-xl font-semibold">Knowledge Assessment</h3>
            <p className="text-sm text-slate-500 mt-1">
              Answer the questions and review the explanations.
            </p>
          </div>
          {lesson.quiz.map((question, index) => (
            <div key={index} className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
              <p className="font-semibold text-sm">{index + 1}. {question.question}</p>
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name={`quiz-${topic}-${index}`}
                    checked={quizAnswers[index] === optionIndex}
                    onChange={() => setQuizAnswers(current => ({ ...current, [index]: optionIndex }))}
                  />
                  {option}
                </label>
              ))}
              {quizAnswers[index] !== undefined && (
                <div className={`rounded-lg p-3 text-sm ${
                  quizAnswers[index] === question.answer
                    ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300"
                    : "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                }`}>
                  <strong>{quizAnswers[index] === question.answer ? "Correct" : "Review this answer"}</strong>
                  <p className="mt-1">{question.explanation}</p>
                </div>
              )}
            </div>
          ))}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4">
            <p className="font-semibold">Assessment progress: {selectedCount}/{lesson.quiz.length}</p>
            <p className="text-sm mt-1">Correct answers: {correctCount}/{lesson.quiz.length}</p>
            <button
              onClick={() => setQuizAnswers({})}
              className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-sm"
            >
              Reset assessment
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
