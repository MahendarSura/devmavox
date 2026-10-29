
export interface MemoryDiagnosticStep {
  title: string;
  purpose: string;
  commands: string[];
  expectedEvidence: string[];
  interpretation: string[];
  nextAction: string[];
}

export interface MemoryRootCausePlaybook {
  cause: string;
  evidence: string[];
  diagnosis: string[];
  remediation: string[];
  validation: string[];
}

export interface MemoryIncidentQuestion {
  question: string;
  answer: string;
  followUp: string;
}

export interface MemoryLimitsGuide {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  summary: string;
  overview: {
    definition: string;
    memoryConcepts: string[];
    symptoms: string[];
    commonCauses: string[];
  };
  impactAndSeverity: {
    environment: string;
    impact: string;
    severity: string;
    response: string;
  }[];
  safetyChecks: string[];
  incidentScenario: {
    title: string;
    timeline: string[];
    symptoms: string[];
    evidence: string[];
    possibleRootCause: string;
    recoveryPlan: string[];
  };
  evidenceCollection: {
    source: string;
    commands: string[];
    purpose: string;
    cautions: string[];
  }[];
  diagnosticWorkflow: MemoryDiagnosticStep[];
  metricReference: {
    metric: string;
    meaning: string;
    interpretation: string;
  }[];
  rootCausePlaybooks: MemoryRootCausePlaybook[];
  recoveryWorkflow: {
    phase: string;
    actions: string[];
    successCriteria: string[];
  }[];
  decisionTree: {
    symptom: string;
    evidence: string;
    likelyCause: string;
    nextAction: string;
  }[];
  prevention: {
    area: string;
    practices: string[];
  }[];
  commonMistakes: {
    mistake: string;
    whyItFails: string;
    betterApproach: string;
  }[];
  incidentReportTemplate: string[];
  productionRunbook: {
    phase: string;
    checklist: string[];
  }[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    expectedFinding: string;
    solution: string[];
  }[];
  interviewQuestions: MemoryIncidentQuestion[];
  references: {
    title: string;
    url: string;
  }[];
}

export const memoryLimitsGuide = {
  title: "Docker Memory Limits — Real Production Troubleshooting Guide",
  slug: "memory-limits",
  category: "Docker",
  difficulty: "Advanced",
  summary:
    "A production incident-response guide for Docker memory exhaustion, container OOM kills, memory leaks, sudden memory spikes, host pressure, cgroup metrics, JVM and Node.js heap behavior, resource limits, Compose and Kubernetes configurations, controlled recovery, monitoring, rollback, incident reporting, hands-on labs, and DevOps interview preparation.",

  overview: {
    definition:
      "Docker memory troubleshooting is the process of determining how much memory a container and its processes use, which limits apply, whether the host is under pressure, and why memory consumption causes degraded performance or process termination. Depending on the host kernel, cgroup version, container configuration, and workload, a memory limit can cause an allocation failure or an out-of-memory kill. A memory-related incident can affect one container or multiple workloads on the same host.",

    memoryConcepts: [
      "Container memory limit: the maximum memory usage enforced by the container's configured cgroup limit, subject to kernel and runtime behavior. It is not the same as the physical RAM installed in the host.",
      "Memory reservation: a softer memory-management setting in some Docker configurations. It is not equivalent to the hard memory limit and does not guarantee that the requested memory will always be available.",
      "Host memory: physical memory shared by the host operating system and its workloads. A container can remain below its own limit while the host is experiencing memory pressure.",
      "RSS: resident memory currently held in physical memory. RSS is useful but does not describe every aspect of cgroup memory accounting.",
      "Page cache: memory used to cache filesystem data. Depending on the kernel and cgroup accounting, cache contributes to container memory usage and may be reclaimable.",
      "Cgroup memory accounting: kernel accounting for memory attributed to a workload. The available files and semantics differ between cgroup v1 and cgroup v2.",
      "OOM kill: the kernel terminates one or more processes when it cannot satisfy memory demands under applicable constraints. A container-specific memory limit can trigger an OOM event even when the host has free memory.",
      "Memory leak: memory consumption grows over time because objects, buffers, references, native allocations, or other resources are not released as intended.",
      "Working-set estimate: a monitoring-system estimate of actively used memory. Its calculation varies by tool and is not interchangeable with raw cgroup usage.",
      "Application heap: memory managed by a runtime such as the JVM or Node.js. Heap usage is only one part of total process and container memory.",
      "Swap: disk-backed virtual memory that can change latency and resource behavior. Swap availability and accounting depend on host and container configuration.",
      "Memory headroom: the safe capacity remaining before a workload approaches its operational limit. The required headroom depends on normal spikes, traffic, startup behavior, and recovery needs."
    ],

    symptoms: [
      "Container exits unexpectedly with exit code 137.",
      "Docker inspection reports OOMKilled=true.",
      "The application becomes slow, requests time out, or latency rises before a crash.",
      "Memory usage increases continuously after each deployment or traffic increase.",
      "JVM reports OutOfMemoryError even though container-level memory has not reached an obvious limit.",
      "Node.js reports JavaScript heap out of memory while total container memory differs from the configured heap.",
      "Several unrelated containers become unhealthy on the same host.",
      "The host becomes unresponsive, swap activity rises, or the kernel records OOM events.",
      "A container starts successfully but fails during traffic spikes, cache warm-up, batch processing, or large requests.",
      "A deployment fails because old and new replicas temporarily overlap and exceed available host capacity."
    ],

    commonCauses: [
      "The hard memory limit is too low for normal application usage.",
      "A memory leak causes usage to increase over time.",
      "A sudden traffic spike increases concurrent requests, buffers, or in-flight work.",
      "The application creates large temporary objects, caches, or batch workloads.",
      "The JVM heap is configured too close to the container limit, leaving insufficient room for native memory.",
      "Node.js heap settings do not account for buffers, native allocations, or other process memory.",
      "A native library leaks memory outside the managed application heap.",
      "The container runs too many workers or processes concurrently.",
      "The host is overcommitted or experiences memory pressure from other workloads.",
      "A memory limit or Compose configuration was accidentally changed.",
      "A rolling deployment temporarily doubles resource consumption.",
      "Memory-intensive startup tasks exceed the normal steady-state budget.",
      "A kernel, cgroup, or runtime configuration behaves differently from the assumed environment.",
      "Memory metrics are misleading because the engineer compares different measurement definitions.",
      "A container is OOM-killed by a host-level event rather than its own configured memory limit."
    ]
  },

  impactAndSeverity: [
    {
      environment: "Development",
      impact:
        "A local application or test container runs out of memory. Shared services and customers are unaffected.",
      severity: "SEV-4 / Low",
      response:
        "Collect process and container metrics, reproduce the workload, and determine whether the issue is a local limit or an application defect."
    },
    {
      environment: "Staging / QA",
      impact:
        "Load tests, test execution, or release validation fail. A deployment may be blocked.",
      severity: "SEV-3 / Moderate",
      response:
        "Compare staging with production resource settings, repeat the workload under controlled conditions, and block release promotion until the cause is understood."
    },
    {
      environment: "Production — one replica affected",
      impact:
        "Available capacity is reduced. Remaining replicas may continue serving traffic but experience higher load.",
      severity: "SEV-2 / High",
      response:
        "Check remaining capacity, traffic distribution, memory trends, and the risk of cascading OOM events."
    },
    {
      environment: "Production — multiple replicas or host affected",
      impact:
        "Critical services may become unavailable, requests fail, queues accumulate, or several workloads are terminated.",
      severity: "SEV-1 / Critical",
      response:
        "Declare an incident, engage service and platform owners, protect remaining healthy capacity, preserve evidence, and select an approved mitigation or rollback."
    }
  ],

  safetyChecks: [
    "Confirm the exact environment, Docker context, host, region, service, container ID, and deployment revision.",
    "Run docker context show and verify the target before any production operation.",
    "Determine whether the workload is managed by standalone Docker, Compose, Swarm, Kubernetes, or another controller.",
    "Record the container image digest, configured memory limit, reservation, restart policy, and restart count.",
    "Check whether the problem affects one container, all replicas of one service, or unrelated containers on the same host.",
    "Establish whether the container is stateful and whether a restart or replacement could interrupt writes, jobs, transactions, or message processing.",
    "Capture container state, OOMKilled, exit code, timestamps, application logs, resource metrics, and kernel events before restarting anything.",
    "Check whether recent deployments, traffic spikes, cache warm-ups, batch jobs, or configuration changes preceded the incident.",
    "Check the host's memory capacity and remaining healthy workload capacity before considering a limit increase.",
    "Obtain required production approval and follow the incident-management process.",
    "Do not increase memory limits blindly. A higher limit can move the failure from one container to the entire host.",
    "Do not kill processes, restart shared infrastructure, remove containers, or delete volumes before understanding the impact.",
    "Never run memory stress tests against a production host or shared environment without explicit authorization, a defined resource budget, and an abort plan.",
    "Do not expose secrets from environment variables, process arguments, logs, or configuration files when collecting evidence.",
    "Record each command, change, approval, observed result, and rollback decision in the incident timeline."
  ],

  incidentScenario: {
    title:
      "Production API begins failing during a traffic increase after a new release",

    timeline: [
      "10:00 — The API is stable with the previous image and normal traffic.",
      "10:10 — A new application image is deployed through the approved pipeline.",
      "10:12 — Traffic rises after a customer campaign or scheduled batch starts.",
      "10:14 — Application latency and HTTP 5xx errors begin increasing.",
      "10:15 — Container memory approaches the configured limit and one replica terminates.",
      "10:16 — The orchestrator or restart policy starts another instance, but the same workload triggers the failure again.",
      "10:18 — The on-call engineer acknowledges the incident and checks healthy replica count and customer impact.",
      "10:20 — The engineer captures OOMKilled, exit code, memory limits, application logs, historical memory metrics, and kernel evidence.",
      "10:25 — Comparison with the previous release reveals a possible increase in per-request memory allocation. The hypothesis is checked against heap, RSS, concurrency, and traffic metrics.",
      "10:30 — The team assesses whether reducing traffic or concurrency, rolling back, or applying a targeted fix is safest.",
      "10:35 — An approved mitigation is applied through the normal deployment or traffic-management mechanism.",
      "10:40 — Memory consumption stabilizes, replicas remain healthy, and request errors decline.",
      "11:00 — The service owner confirms recovery after observing real requests, latency, memory headroom, and restart counts.",
      "After the incident — The team adds a regression test, memory alert, and workload-based capacity validation."
    ],

    symptoms: [
      "Increasing memory usage before termination.",
      "HTTP 502/503 responses or timeouts from the affected service.",
      "Container restarts and reduced healthy replica count.",
      "A memory alert, OOM event, or application heap error.",
      "Possible correlation with a new image, higher concurrency, or a batch job."
    ],

    evidence: [
      "Container ID, image digest, deployment ID, and configuration revision.",
      "State.OOMKilled, State.ExitCode, State.Error, StartedAt, FinishedAt, and RestartCount.",
      "Configured hard memory limit and any applicable reservation or swap settings.",
      "Historical memory usage, process RSS, heap metrics, allocation rate, and garbage-collection data where available.",
      "Host memory available, swap behavior, kernel OOM logs, and memory pressure indicators.",
      "Request rate, concurrent requests, queue depth, response latency, and error rate.",
      "Recent code, dependency, cache, concurrency, runtime, or configuration changes."
    ],

    possibleRootCause:
      "Illustrative hypothesis: the new release increases per-request memory allocation. Higher traffic multiplies concurrent allocations, causing the container to exceed its memory limit. Confirm this with historical metrics, application profiling, OOM evidence, and comparison with the previous revision. A memory increase alone does not prove a leak.",

    recoveryPlan: [
      "Preserve logs, memory metrics, container state, and the exact image digest.",
      "Determine whether the event is a container-limit OOM, host-level OOM, application-managed heap failure, or another memory problem.",
      "Protect healthy replicas and assess whether traffic or concurrency can be safely reduced.",
      "Compare the current release with the last known-good image and configuration.",
      "Choose a targeted fix or an approved rollback after checking schema and state compatibility.",
      "Do not increase the memory limit until host capacity and neighboring workload impact have been assessed.",
      "Validate startup, real requests, memory headroom, error rate, and stability under representative traffic.",
      "Document the verified root cause and add a regression test or capacity guard."
    ]
  },

  evidenceCollection: [
    {
      source: "Container identity and state",
      commands: [
        "docker context show",
        "docker ps -a --no-trunc",
        "docker inspect --format '{{.Id}} {{.Name}} {{.Config.Image}} {{.Image}} {{.State.Status}} {{.State.ExitCode}} {{.RestartCount}}' CONTAINER",
        "docker inspect --format 'OOMKilled={{.State.OOMKilled}} Error={{.State.Error}}' CONTAINER"
      ],
      purpose:
        "Confirm the target, capture the immutable container identity, and determine whether the container stopped or was marked OOM-killed.",
      cautions: [
        "Replace CONTAINER with the verified name or ID.",
        "A container name can be reused after recreation; record the full container ID.",
        "Exit code 137 alone is not proof of OOM.",
        "A false OOMKilled value does not exclude application heap exhaustion or every host-level memory problem."
      ]
    },
    {
      source: "Memory limit and resource configuration",
      commands: [
        "docker inspect --format 'Memory={{.HostConfig.Memory}} MemoryReservation={{.HostConfig.MemoryReservation}} MemorySwap={{.HostConfig.MemorySwap}}' CONTAINER",
        "docker inspect --format '{{.HostConfig.OomKillDisable}} {{.HostConfig.OomScoreAdj}}' CONTAINER",
        "docker stats --no-stream CONTAINER"
      ],
      purpose:
        "Inspect the configured resource constraints and current usage snapshot.",
      cautions: [
        "Memory fields may be displayed as byte values; convert them carefully.",
        "A value of zero for a field can mean no explicit value is configured, but exact behavior depends on the setting and runtime.",
        "A single docker stats sample may miss a short-lived memory spike.",
        "Do not enable OOM-kill disabling as a quick fix; it can put the host at greater risk."
      ]
    },
    {
      source: "Application logs",
      commands: [
        "docker logs --timestamps --tail 300 CONTAINER",
        "docker logs --timestamps --since 30m CONTAINER"
      ],
      purpose:
        "Find heap errors, allocation failures, cache growth messages, request patterns, and the final messages before termination.",
      cautions: [
        "Logs may be rotated, incomplete, or exported to an external logging service.",
        "An abrupt log ending is not proof of OOM.",
        "Redact credentials, tokens, customer data, and other sensitive information."
      ]
    },
    {
      source: "Docker events and host runtime",
      commands: [
        "docker events --since 30m --filter container=CONTAINER",
        "docker info",
        "journalctl -u docker --since '30 minutes ago'"
      ],
      purpose:
        "Correlate container lifecycle transitions with daemon or runtime events.",
      cautions: [
        "Host and daemon logs can require elevated permissions.",
        "Managed platforms may expose runtime evidence through a provider logging service instead.",
        "Do not restart the Docker daemon simply because a container is OOM-killed."
      ]
    },
    {
      source: "Host memory and storage",
      commands: [
        "free -h",
        "cat /proc/meminfo",
        "df -h",
        "df -i",
        "ps -eo pid,ppid,%mem,%cpu,rss,stat,cmd --sort=-rss | head -20"
      ],
      purpose:
        "Check host-wide memory availability, process RSS, and possible storage-related operational problems.",
      cautions: [
        "Commands are Linux-oriented and may not be available in Docker Desktop.",
        "RSS sorting is a snapshot, not historical evidence.",
        "Use historical monitoring to investigate short memory spikes.",
        "Disk and inode exhaustion can affect applications but should not automatically be classified as memory exhaustion."
      ]
    },
    {
      source: "Kernel OOM evidence",
      commands: [
        "dmesg -T | grep -i -E 'oom|out of memory|killed process'",
        "journalctl -k --since '30 minutes ago'"
      ],
      purpose:
        "Look for kernel evidence of memory pressure and process termination.",
      cautions: [
        "Kernel log access may be restricted.",
        "The host's logs may not be visible from a managed container.",
        "Correlate timestamps and process identity before attributing an event to the affected container."
      ]
    },
    {
      source: "Cgroup v2 memory counters",
      commands: [
        "cat /sys/fs/cgroup/memory.current",
        "cat /sys/fs/cgroup/memory.max",
        "cat /sys/fs/cgroup/memory.events",
        "cat /sys/fs/cgroup/memory.stat",
        "cat /sys/fs/cgroup/memory.pressure"
      ],
      purpose:
        "On a Linux cgroup v2 host, inspect the current cgroup's memory usage, limit, event counters, memory breakdown, and pressure data.",
      cautions: [
        "These paths refer to the cgroup visible from the shell where the command runs; on a host they may refer to the host root rather than a specific container.",
        "Locate the correct container cgroup before attributing these values to a workload.",
        "The files may not exist on cgroup v1 systems or non-Linux platforms.",
        "Use read-only inspection and avoid editing cgroup control files directly during an incident."
      ]
    },
    {
      source: "Cgroup v1 memory counters",
      commands: [
        "cat /sys/fs/cgroup/memory/memory.usage_in_bytes",
        "cat /sys/fs/cgroup/memory/memory.limit_in_bytes",
        "cat /sys/fs/cgroup/memory/memory.failcnt",
        "cat /sys/fs/cgroup/memory/memory.stat"
      ],
      purpose:
        "On a Linux cgroup v1 host, inspect usage, configured limit, limit-related failures, and memory statistics.",
      cautions: [
        "Paths and available counters depend on the host's mount layout.",
        "Do not use v1 counter names as if they were available on cgroup v2.",
        "Container runtime and host configuration can affect where the correct cgroup is mounted."
      ]
    },
    {
      source: "Docker Compose",
      commands: [
        "docker compose ps -a",
        "docker compose logs --timestamps --tail 300 SERVICE",
        "docker compose config --quiet"
      ],
      purpose:
        "Check service status, logs, and Compose model validation.",
      cautions: [
        "Run from the correct project directory and use the intended Compose files and environment.",
        "Compose configuration validation does not prove that memory settings are sufficient under load.",
        "Resolved configuration may expose sensitive values; do not publish it without sanitization."
      ]
    },
    {
      source: "Kubernetes-managed workload",
      commands: [
        "kubectl config current-context",
        "kubectl get pods -n NAMESPACE -o wide",
        "kubectl describe pod POD -n NAMESPACE",
        "kubectl logs POD -n NAMESPACE -c CONTAINER --previous --timestamps",
        "kubectl top pod POD -n NAMESPACE --containers"
      ],
      purpose:
        "Investigate memory limits, previous-container logs, OOMKilled status, and workload resource usage when Kubernetes manages the container.",
      cautions: [
        "Verify the cluster context and namespace before any action.",
        "Metrics-server or another supported metrics source must be available for kubectl top.",
        "A pod's reported memory usage may not capture the historical peak that caused an OOM event."
      ]
    }
  ],

  diagnosticWorkflow: [
    {
      title: "Step 1 — Confirm scope and preserve the incident context",
      purpose:
        "Identify the affected container and determine whether the incident is isolated or host-wide.",
      commands: [
        "docker context show",
        "docker ps -a --no-trunc",
        "docker stats --no-stream"
      ],
      expectedEvidence: [
        "Container names, IDs, images, states, and current resource usage.",
        "Other containers may be healthy or may show correlated resource pressure.",
        "The workload may be managed by a controller rather than directly by Docker."
      ],
      interpretation: [
        "If multiple unrelated containers fail on one host, investigate host pressure or runtime issues.",
        "If one application fails while the host remains healthy, investigate its own limit, memory behavior, and configuration.",
        "If the target is Kubernetes-managed, switch to Kubernetes-native diagnostics."
      ],
      nextAction: [
        "Record the environment, container ID, image digest, first failure time, and customer impact.",
        "Capture evidence before performing any disruptive recovery."
      ]
    },
    {
      title: "Step 2 — Confirm the termination evidence",
      purpose:
        "Determine whether the container actually experienced an OOM event or another kind of failure.",
      commands: [
        "docker inspect --format '{{json .State}}' CONTAINER",
        "docker inspect --format '{{.State.ExitCode}} {{.State.OOMKilled}} {{.State.Error}}' CONTAINER",
        "docker logs --timestamps --tail 300 CONTAINER"
      ],
      expectedEvidence: [
        "Exit code, OOMKilled, error details, start and finish timestamps.",
        "Application logs may show an explicit heap error or may end before the termination.",
        "The restart count may have increased."
      ],
      interpretation: [
        "OOMKilled=true is important evidence of an OOM-related termination.",
        "Exit code 137 is a clue for SIGKILL but is not proof of OOM.",
        "A JVM or Node.js heap error may occur without the kernel killing the container."
      ],
      nextAction: [
        "Correlate container state with kernel and application evidence.",
        "Do not increase the limit until the failure mode is classified."
      ]
    },
    {
      title: "Step 3 — Determine the effective memory limit",
      purpose:
        "Find the limit that actually applies to the container and compare it with workload requirements.",
      commands: [
        "docker inspect --format '{{.HostConfig.Memory}} {{.HostConfig.MemoryReservation}} {{.HostConfig.MemorySwap}}' CONTAINER",
        "docker stats --no-stream CONTAINER",
        "docker inspect --format '{{.Config.Image}} {{.Image}}' CONTAINER"
      ],
      expectedEvidence: [
        "Configured memory and reservation values, current usage, and exact image identity.",
        "A memory limit may be unset or may be smaller than the workload's required peak.",
        "The deployed image may differ from the previously approved image."
      ],
      interpretation: [
        "Do not assume that a reservation is a hard limit.",
        "Compare equivalent metrics and units; do not compare a working-set estimate directly with a different cgroup counter without understanding their definitions.",
        "Review the effective configuration in the managing platform if the Docker host setting is not the complete source of truth."
      ],
      nextAction: [
        "Record the configured limit and the best available peak-usage evidence.",
        "Check host capacity and neighboring workload reservations before proposing a limit change."
      ]
    },
    {
      title: "Step 4 — Check the host and cgroup evidence",
      purpose:
        "Distinguish a container-specific limit event from host-wide memory pressure.",
      commands: [
        "free -h",
        "cat /proc/meminfo",
        "journalctl -k --since '30 minutes ago'",
        "cat /sys/fs/cgroup/memory.events"
      ],
      expectedEvidence: [
        "Host available memory, kernel OOM events, or cgroup memory event counters where supported.",
        "On cgroup v2, the oom and oom_kill counters can help identify relevant events.",
        "The correct container cgroup may show a limit and usage that differ from host totals."
      ],
      interpretation: [
        "A host-wide OOM event can affect multiple workloads even when a particular container's configured limit is not the direct cause.",
        "Cgroup event counters are cumulative and must be compared over time to identify new events.",
        "The root cgroup's counters do not automatically describe an individual container."
      ],
      nextAction: [
        "Locate and inspect the correct cgroup for the target container.",
        "Escalate to the platform team if host capacity or runtime behavior is implicated."
      ]
    },
    {
      title: "Step 5 — Separate application heap from total memory",
      purpose:
        "Find whether the managed heap, native allocations, buffers, or other processes explain the usage.",
      commands: [
        "docker stats --no-stream CONTAINER",
        "docker top CONTAINER",
        "docker logs --timestamps --tail 300 CONTAINER"
      ],
      expectedEvidence: [
        "Process list and container-level memory usage.",
        "JVM logs may show garbage-collection pressure or OutOfMemoryError.",
        "Node.js logs may report JavaScript heap exhaustion while total process memory includes additional allocations."
      ],
      interpretation: [
        "The application heap is only one component of total container memory.",
        "A JVM process also requires native memory, thread stacks, metaspace, direct buffers, and runtime overhead.",
        "Node.js buffers and native modules can consume memory outside the JavaScript heap."
      ],
      nextAction: [
        "Use runtime-specific metrics or profiling tools in an approved environment.",
        "Do not set the heap equal to the entire container memory limit."
      ]
    },
    {
      title: "Step 6 — Investigate growth, concurrency, and workload shape",
      purpose:
        "Distinguish a leak from a legitimate workload peak or excessive concurrency.",
      commands: [
        "docker stats --no-stream CONTAINER",
        "docker logs --timestamps --since 30m CONTAINER"
      ],
      expectedEvidence: [
        "Memory may rise continuously over hours, jump during a batch, or track traffic and concurrent requests.",
        "Queue depth, cache size, request size, and worker counts may correlate with memory.",
        "A new release may have changed allocation behavior."
      ],
      interpretation: [
        "Steady growth under stable traffic may suggest a leak but requires profiling to prove it.",
        "A sharp spike during a batch may indicate a legitimate peak or unbounded batch size.",
        "A traffic-related spike may indicate excessive concurrency, large buffers, or insufficient backpressure."
      ],
      nextAction: [
        "Compare memory against request rate, concurrency, queue depth, and the previous release.",
        "Reproduce with a representative workload in staging and profile allocations where appropriate."
      ]
    },
    {
      title: "Step 7 — Review resource configuration and deployment changes",
      purpose:
        "Determine whether the resource budget or rollout behavior changed.",
      commands: [
        "docker inspect --format '{{.HostConfig.Memory}} {{.HostConfig.MemoryReservation}}' CONTAINER",
        "docker inspect --format '{{.Config.Image}} {{.Image}}' CONTAINER",
        "docker compose ps -a"
      ],
      expectedEvidence: [
        "Different memory limits or image digests between old and new workloads.",
        "Compose or deployment configuration may have changed.",
        "Rolling deployment overlap may temporarily increase total host memory demand."
      ],
      interpretation: [
        "A limit increase can help only if the workload's demand is legitimate and the host has capacity.",
        "A rolling update may require additional memory for old and new replicas at the same time.",
        "A successful deployment command does not prove that the workload can sustain production traffic."
      ],
      nextAction: [
        "Compare the release configuration with the approved version.",
        "Use the deployment controller's normal rollout or rollback mechanism."
      ]
    },
    {
      title: "Step 8 — Check related dependencies and host constraints",
      purpose:
        "Identify whether memory failure is a secondary symptom of host or dependency instability.",
      commands: [
        "docker info",
        "df -h",
        "df -i",
        "ps -eo pid,ppid,%mem,%cpu,rss,stat,cmd --sort=-rss | head -20",
        "journalctl -u docker --since '30 minutes ago'"
      ],
      expectedEvidence: [
        "Host process memory, runtime events, disk pressure, or competing workload activity.",
        "Other services may show correlated failures.",
        "A dependency outage may cause requests or retries to accumulate in memory."
      ],
      interpretation: [
        "Disk exhaustion is not itself proof of a memory problem, but it can worsen application behavior.",
        "Unbounded retries, request buffering, or queue growth can convert a dependency outage into memory pressure.",
        "If the runtime or host is implicated, coordinate with the platform team."
      ],
      nextAction: [
        "Check dependencies and backpressure behavior.",
        "Plan host-level remediation with capacity, statefulness, and availability requirements in mind."
      ]
    },
    {
      title: "Step 9 — Select a cause-specific correction",
      purpose:
        "Choose a remediation that addresses the confirmed cause rather than hiding the symptom.",
      commands: [
        "docker inspect --format '{{.Config.Image}} {{.Image}}' CONTAINER",
        "docker inspect --format '{{.HostConfig.Memory}}' CONTAINER"
      ],
      expectedEvidence: [
        "A specific cause is supported by application, runtime, resource, or deployment evidence.",
        "The proposed change has an expected measurable outcome.",
        "A rollback plan and resource budget are available."
      ],
      interpretation: [
        "A leak requires an application or allocation fix, not merely a larger limit.",
        "A legitimate capacity shortage may require a reviewed limit or capacity adjustment.",
        "A rollout regression may be safer to address through an approved rollback."
      ],
      nextAction: [
        "Test the correction in a controlled environment.",
        "Obtain production approval and change one major variable at a time where practical."
      ]
    },
    {
      title: "Step 10 — Validate recovery under realistic conditions",
      purpose:
        "Prove that the application is stable, not merely that it has restarted.",
      commands: [
        "docker ps --no-trunc",
        "docker stats --no-stream CONTAINER",
        "docker inspect --format '{{.State.Status}} {{.State.OOMKilled}} {{.RestartCount}}' CONTAINER",
        "docker logs --timestamps --tail 100 CONTAINER"
      ],
      expectedEvidence: [
        "The intended image is running and restart counts stop increasing.",
        "Memory stabilizes below the approved limit with adequate headroom.",
        "Real requests, health checks, and downstream operations succeed."
      ],
      interpretation: [
        "A single memory snapshot is not sufficient to confirm long-term stability.",
        "Test or observe representative traffic and startup or batch peaks.",
        "Check that remaining replicas and the host have adequate capacity."
      ],
      nextAction: [
        "Monitor memory, latency, error rate, OOM events, and restart trends during the agreed observation period.",
        "Document the verified root cause and preventive action."
      ]
    }
  ],

  metricReference: [
    {
      metric: "Container memory usage",
      meaning:
        "Memory attributed to the container by the runtime or cgroup accounting.",
      interpretation:
        "Use a consistent metric definition and compare it with the effective limit and historical trend."
    },
    {
      metric: "Memory limit",
      meaning:
        "The configured upper memory constraint for a container when a hard limit is applied.",
      interpretation:
        "A small limit can cause workload failure. A very large limit can expose the host to greater pressure."
    },
    {
      metric: "OOMKilled",
      meaning:
        "Docker state indicating that the container process was killed in an OOM-related event.",
      interpretation:
        "Correlate it with the exit code, kernel logs, cgroup counters, and resource metrics."
    },
    {
      metric: "Exit code 137",
      meaning:
        "Commonly associated with SIGKILL.",
      interpretation:
        "It is not proof of OOM; investigate the source of the kill."
    },
    {
      metric: "Host MemAvailable",
      meaning:
        "An estimate of memory available for new applications without swapping.",
      interpretation:
        "Useful for host-wide capacity assessment, but not a substitute for the container's own cgroup metrics."
    },
    {
      metric: "Cgroup v2 memory.current",
      meaning:
        "Current memory usage charged to the cgroup.",
      interpretation:
        "Read it from the correct container cgroup and compare it with memory.max and memory.events."
    },
    {
      metric: "Cgroup v2 memory.max",
      meaning:
        "The maximum memory setting for the cgroup; the literal value max indicates no explicit maximum at that level.",
      interpretation:
        "Ancestor cgroups may impose additional limits, so inspect the effective hierarchy."
    },
    {
      metric: "Cgroup v2 memory.events",
      meaning:
        "Counters such as high, max, oom, and oom_kill, depending on the kernel.",
      interpretation:
        "Compare counters over time. A nonzero historical counter does not necessarily mean the current incident caused it."
    },
    {
      metric: "RSS",
      meaning:
        "Resident memory associated with a process.",
      interpretation:
        "Useful for process-level analysis, but process RSS and cgroup memory are not interchangeable."
    },
    {
      metric: "Application heap usage",
      meaning:
        "Memory tracked by a managed runtime such as the JVM or JavaScript engine.",
      interpretation:
        "Low heap usage does not guarantee low total process memory because native allocations and other overhead may be significant."
    },
    {
      metric: "Memory pressure",
      meaning:
        "Indications that workloads are stalled or constrained while trying to obtain memory.",
      interpretation:
        "Use platform-specific pressure metrics and historical telemetry to identify sustained contention."
    }
  ],

  rootCausePlaybooks: [
    {
      cause: "Container hard memory limit is too low",
      evidence: [
        "OOM-related evidence aligns with usage approaching the configured hard limit.",
        "Representative workload testing shows the normal peak exceeds the current resource budget.",
        "Host capacity is sufficient for a carefully reviewed adjustment."
      ],
      diagnosis: [
        "Inspect the configured memory limit.",
        "Review historical usage and application peak behavior.",
        "Calculate the impact of the proposed limit across all replicas and deployment overlap."
      ],
      remediation: [
        "Increase the limit only when measured demand and host capacity justify it.",
        "Alternatively reduce per-request memory, batch size, concurrency, or cache usage.",
        "Roll out the change through the normal configuration or deployment mechanism."
      ],
      validation: [
        "The workload completes its representative peak without OOM events.",
        "The host retains adequate memory headroom.",
        "Latency, errors, and neighboring workloads remain healthy."
      ]
    },
    {
      cause: "Application memory leak",
      evidence: [
        "Memory trends upward over time under reasonably stable workload conditions.",
        "Garbage collection or allocation profiling shows retained objects, buffers, or native allocations.",
        "Restarting temporarily reduces usage but the same growth pattern returns."
      ],
      diagnosis: [
        "Compare heap snapshots, allocation profiles, object retention, and runtime metrics.",
        "Check caches, listeners, long-lived references, connection pools, and unbounded collections.",
        "Use a controlled reproduction with representative traffic."
      ],
      remediation: [
        "Fix the confirmed retention or native allocation problem.",
        "Bound caches and queues and close resources correctly.",
        "Use a temporary controlled restart only as a mitigation when required, with evidence preserved and service-owner approval."
      ],
      validation: [
        "Memory reaches a stable operating range under representative load.",
        "Profiling no longer shows the problematic retention pattern.",
        "The fix passes regression and soak tests."
      ]
    },
    {
      cause: "Traffic spike or excessive concurrency",
      evidence: [
        "Memory increases alongside request rate, in-flight requests, queue depth, or worker count.",
        "Peak usage exceeds the normal baseline.",
        "Latency and memory may rise together."
      ],
      diagnosis: [
        "Correlate memory metrics with request rate, concurrency, request size, and queue depth.",
        "Check for unbounded buffering, large payloads, or excessive worker creation.",
        "Compare the workload with capacity tests."
      ],
      remediation: [
        "Apply safe concurrency limits and backpressure.",
        "Bound request and batch sizes where appropriate.",
        "Scale replicas only when capacity and scheduling constraints permit.",
        "Increase the resource budget only after validating the total host and rollout impact."
      ],
      validation: [
        "Memory remains bounded during a representative traffic test.",
        "Queue depth, latency, and error rate return to acceptable levels.",
        "The service handles overload without a restart storm."
      ]
    },
    {
      cause: "JVM heap and native memory consume too much container memory",
      evidence: [
        "JVM heap approaches its configured maximum or the process is killed despite apparently reasonable heap usage.",
        "Native memory, thread stacks, metaspace, direct buffers, or runtime overhead are significant.",
        "The container limit is too close to the total JVM memory budget."
      ],
      diagnosis: [
        "Inspect JVM heap and garbage-collection metrics.",
        "Review container-aware JVM ergonomics and explicit heap settings.",
        "Measure native memory and thread counts with approved JVM diagnostics."
      ],
      remediation: [
        "Size the heap to leave room for native memory and other process overhead.",
        "Tune thread pools, direct buffers, and caches based on evidence.",
        "Change runtime flags only after testing the exact runtime and container configuration."
      ],
      validation: [
        "Heap and native memory fit within the container budget.",
        "Garbage-collection pauses and latency remain acceptable.",
        "Representative load tests do not trigger OOM events."
      ]
    },
    {
      cause: "Node.js heap exhaustion or external memory growth",
      evidence: [
        "Node.js reports JavaScript heap out of memory, or container memory grows while heap usage does not explain the total.",
        "Buffers, native modules, or concurrent requests may contribute to external memory.",
        "The failure correlates with a code or traffic change."
      ],
      diagnosis: [
        "Inspect Node.js heap, external memory, RSS, allocation profiles, and garbage-collection behavior.",
        "Check buffers, caches, streams, large JSON payloads, and native modules.",
        "Compare the configured heap with the container limit."
      ],
      remediation: [
        "Fix leaks or excessive buffering.",
        "Use streaming and bounded concurrency where appropriate.",
        "Adjust Node.js heap settings only after accounting for total container memory."
      ],
      validation: [
        "Heap and RSS remain stable under representative load.",
        "Large payloads are processed within defined memory bounds.",
        "No recurring heap fatal errors or OOM kills occur."
      ]
    },
    {
      cause: "Host-wide memory pressure",
      evidence: [
        "Several unrelated containers become unstable around the same time.",
        "Kernel logs indicate memory pressure or OOM events.",
        "Host memory availability falls sharply."
      ],
      diagnosis: [
        "Inspect host process memory, cgroup hierarchy, kernel logs, and workload placement.",
        "Identify the largest consumers and any capacity changes.",
        "Check whether the problem affects the host or only one container's cgroup."
      ],
      remediation: [
        "Engage the platform or infrastructure owner.",
        "Reduce load or move workloads only through an approved capacity and scheduling plan.",
        "Restore host headroom without blindly terminating processes or restarting the shared daemon."
      ],
      validation: [
        "Host memory pressure decreases.",
        "Unrelated workloads recover and remain stable.",
        "Capacity alerts and kernel OOM events stop recurring."
      ]
    },
    {
      cause: "Rolling deployment causes temporary memory overcommit",
      evidence: [
        "Memory pressure begins while old and new replicas overlap.",
        "The host's total resource usage rises during rollout.",
        "The new application may use more memory per replica."
      ],
      diagnosis: [
        "Compare per-replica memory and rollout surge settings.",
        "Calculate peak memory when old and new replicas coexist.",
        "Inspect scheduling and resource allocation across hosts."
      ],
      remediation: [
        "Use a rollout strategy compatible with available capacity.",
        "Reduce unnecessary overlap only when availability and platform policy permit.",
        "Add capacity or reduce application memory after a resource budget review."
      ],
      validation: [
        "The rollout completes without host-wide memory pressure.",
        "Desired replicas become healthy.",
        "The service retains enough capacity during future rollouts."
      ]
    },
    {
      cause: "Configuration drift or unexpected memory limit",
      evidence: [
        "The effective limit differs from the approved configuration.",
        "Compose, deployment manifests, or infrastructure definitions changed.",
        "The same image behaves differently between environments."
      ],
      diagnosis: [
        "Compare deployed configuration with the version-controlled source.",
        "Check environment-specific overrides and controller-managed settings.",
        "Verify the effective runtime value rather than relying only on a source file."
      ],
      remediation: [
        "Correct the source of truth and redeploy through the approved pipeline.",
        "Add configuration validation and drift detection.",
        "Avoid manual changes that will be overwritten by a controller."
      ],
      validation: [
        "The effective resource settings match the approved configuration.",
        "Deployment validation catches the previous drift pattern.",
        "The application operates within its tested budget."
      ]
    }
  ],

  recoveryWorkflow: [
    {
      phase: "1. Detect and acknowledge",
      actions: [
        "Acknowledge the memory alert and identify the incident owner.",
        "Check customer impact, healthy replica count, and affected services.",
        "Determine whether the event is container-specific or host-wide."
      ],
      successCriteria: [
        "The incident severity and scope are recorded.",
        "The team understands whether service capacity is immediately at risk."
      ]
    },
    {
      phase: "2. Preserve evidence",
      actions: [
        "Capture container state, OOMKilled, exit code, memory limit, restart count, logs, and image digest.",
        "Collect historical memory, traffic, heap, host, and kernel evidence.",
        "Record the deployment timeline and configuration version."
      ],
      successCriteria: [
        "Evidence is available for root-cause analysis.",
        "No unnecessary restart or destructive cleanup has removed useful context."
      ]
    },
    {
      phase: "3. Classify the memory failure",
      actions: [
        "Distinguish cgroup OOM, host-level OOM, managed-heap exhaustion, native memory growth, and a legitimate traffic peak.",
        "Compare equivalent metrics and confirm their units.",
        "Identify the exact workload or process causing the pressure."
      ],
      successCriteria: [
        "The hypothesis is supported by multiple relevant sources of evidence.",
        "The team knows whether the correction belongs in the application, configuration, or infrastructure."
      ]
    },
    {
      phase: "4. Select a safe mitigation",
      actions: [
        "Assess whether traffic reduction, concurrency limits, a targeted fix, scaling, or rollback offers the lowest risk.",
        "Check host capacity before increasing limits or adding replicas.",
        "Check schema compatibility and statefulness before rolling back.",
        "Obtain the required production approval."
      ],
      successCriteria: [
        "The mitigation has a documented owner, expected result, and rollback plan.",
        "The action will not knowingly put neighboring workloads or data at unacceptable risk."
      ]
    },
    {
      phase: "5. Apply and validate",
      actions: [
        "Apply the approved change through the normal deployment or infrastructure mechanism.",
        "Verify the intended image, configuration, startup behavior, and real application requests.",
        "Monitor memory headroom, OOM events, restart count, latency, and error rate."
      ],
      successCriteria: [
        "The service is stable under representative load.",
        "Memory usage remains within an approved budget.",
        "No new OOM events or unacceptable customer errors occur during the observation window."
      ]
    },
    {
      phase: "6. Close and prevent recurrence",
      actions: [
        "Confirm recovery with the service owner.",
        "Document the verified root cause and impact.",
        "Add regression tests, capacity checks, and monitoring.",
        "Assign preventive actions and update the runbook."
      ],
      successCriteria: [
        "Recovery is confirmed using service-level and resource evidence.",
        "Follow-up actions have owners and deadlines."
      ]
    }
  ],

  decisionTree: [
    {
      symptom: "OOMKilled=true and usage approaches the container limit",
      evidence:
        "Container state, configured memory limit, historical cgroup metrics, kernel logs",
      likelyCause:
        "Container memory budget is insufficient for the workload or an abnormal allocation spike",
      nextAction:
        "Check application memory behavior and host capacity. Fix leaks or workload peaks, or adjust the limit through an approved resource review."
    },
    {
      symptom: "Exit code 137 but OOMKilled is false",
      evidence:
        "Container events, host logs, operator activity, kernel evidence",
      likelyCause:
        "SIGKILL or another termination path; OOM is not established",
      nextAction:
        "Find the source of the kill before changing memory limits."
    },
    {
      symptom: "JVM reports OutOfMemoryError but the container is still running",
      evidence:
        "JVM logs, heap metrics, native memory, process RSS",
      likelyCause:
        "Managed heap or a JVM-specific allocation failure",
      nextAction:
        "Inspect the exact JVM error, heap configuration, garbage collection, and native memory budget."
    },
    {
      symptom: "Node.js reports JavaScript heap out of memory",
      evidence:
        "Node.js heap metrics, RSS, external memory, fatal error logs",
      likelyCause:
        "JavaScript heap exhaustion, a leak, or excessive allocation",
      nextAction:
        "Profile allocations and compare the heap budget with total container memory."
    },
    {
      symptom: "Memory steadily grows during normal traffic",
      evidence:
        "Historical memory graphs, heap snapshots, allocation profiles",
      likelyCause:
        "Possible memory leak, unbounded cache, retained objects, or native allocation growth",
      nextAction:
        "Reproduce under controlled load and profile the growth. Avoid relying on repeated restarts as the permanent fix."
    },
    {
      symptom: "Memory spikes only during high traffic",
      evidence:
        "Request rate, concurrency, buffers, queue depth, memory graph",
      likelyCause:
        "Excessive concurrency, large payloads, buffering, or insufficient capacity",
      nextAction:
        "Add backpressure and bounded concurrency, test representative traffic, and review the resource budget."
    },
    {
      symptom: "Multiple unrelated containers fail on the same host",
      evidence:
        "Kernel logs, host MemAvailable, process RSS, cgroup events",
      likelyCause:
        "Host-wide memory pressure or infrastructure problem",
      nextAction:
        "Escalate to the platform team and stabilize host capacity using the approved infrastructure procedure."
    },
    {
      symptom: "Memory spikes only during a deployment",
      evidence:
        "Rollout timeline, old/new replica counts, per-replica memory",
      likelyCause:
        "Temporary resource overcommit during rollout or a new release's higher memory demand",
      nextAction:
        "Review rollout capacity, surge settings, and per-replica memory before the next deployment."
    }
  ],

  prevention: [
    {
      area: "Application memory management",
      practices: [
        "Profile memory allocations during representative traffic.",
        "Bound caches, queues, request sizes, and batch sizes.",
        "Close files, connections, and other resources correctly.",
        "Avoid retaining large objects longer than necessary.",
        "Add leak detection and long-running soak tests.",
        "Track heap and non-heap memory separately where supported."
      ]
    },
    {
      area: "Container resource sizing",
      practices: [
        "Set memory limits from measured peak demand, not guesses.",
        "Leave headroom for startup, native memory, buffers, and traffic spikes.",
        "Assess host capacity across all replicas and deployment overlap.",
        "Monitor OOM events, restart rate, and memory pressure.",
        "Review memory budgets when application dependencies or runtime versions change."
      ]
    },
    {
      area: "CI and deployment",
      practices: [
        "Run representative load tests and memory regression tests.",
        "Validate resource configuration before deployment.",
        "Use staged or canary rollouts with health and error-rate gates.",
        "Retain immutable image digests and a tested rollback plan.",
        "Account for old and new replicas coexisting during rollouts."
      ]
    },
    {
      area: "Observability",
      practices: [
        "Collect container memory, host memory, and runtime-specific metrics.",
        "Alert on sustained high memory, rapid growth, OOM events, and loss of healthy replicas.",
        "Correlate memory metrics with traffic, queue depth, latency, and deployment IDs.",
        "Preserve logs and historical metrics across container replacement.",
        "Document the meaning and units of every memory metric."
      ]
    },
    {
      area: "Operational safety",
      practices: [
        "Maintain a production runbook for memory incidents.",
        "Require approval for production resource changes.",
        "Avoid blind process kills, restarts, and volume deletion.",
        "Use capacity-aware autoscaling and resource requests where supported.",
        "Review incidents and convert recurring causes into automated safeguards."
      ]
    }
  ],

  commonMistakes: [
    {
      mistake: "Increasing the memory limit immediately",
      whyItFails:
        "The application may have a leak, and the larger limit can move the failure to the host or other workloads.",
      betterApproach:
        "Confirm the failure mode, measure peak demand, inspect host capacity, and fix the underlying cause before changing the limit."
    },
    {
      mistake: "Treating exit code 137 as proof of OOM",
      whyItFails:
        "137 commonly indicates SIGKILL, which may have other causes.",
      betterApproach:
        "Correlate OOMKilled, cgroup events, kernel logs, and resource metrics."
    },
    {
      mistake: "Comparing heap usage with the entire container limit",
      whyItFails:
        "The process also consumes native memory, stacks, buffers, and runtime overhead.",
      betterApproach:
        "Measure heap, native memory, RSS, and cgroup usage separately."
    },
    {
      mistake: "Using one docker stats sample to prove a leak",
      whyItFails:
        "A snapshot may miss a spike or may show a normal cache warm-up.",
      betterApproach:
        "Use time-series metrics and profiling under representative workloads."
    },
    {
      mistake: "Disabling OOM protection to stop restarts",
      whyItFails:
        "It can expose the host and neighboring workloads to greater risk.",
      betterApproach:
        "Fix the memory budget or application behavior. Do not disable OOM protection as a routine workaround."
    },
    {
      mistake: "Running memory stress tests on a production host",
      whyItFails:
        "The test can trigger host-wide OOM, terminate unrelated workloads, or cause customer-facing outages.",
      betterApproach:
        "Reproduce in an isolated environment with a defined resource budget and explicit approval."
    },
    {
      mistake: "Deleting containers or volumes to solve memory pressure",
      whyItFails:
        "Deletion does not fix the memory cause and may remove evidence or persistent data.",
      betterApproach:
        "Capture evidence and use targeted, approved recovery. Never delete persistent volumes without a verified data recovery plan."
    },
    {
      mistake: "Adding more replicas without checking host capacity",
      whyItFails:
        "More replicas can increase total memory demand and worsen host pressure.",
      betterApproach:
        "Check available capacity, placement, resource requests, and per-replica usage before scaling."
    },
    {
      mistake: "Assuming every memory problem is a leak",
      whyItFails:
        "Traffic spikes, cache warm-up, legitimate batch peaks, and configuration changes can produce similar symptoms.",
      betterApproach:
        "Correlate memory with workload behavior and use profiling or controlled reproduction."
    },
    {
      mistake: "Closing the incident as soon as the container starts",
      whyItFails:
        "The workload may fail again when traffic or memory usage rises.",
      betterApproach:
        "Validate real requests, memory headroom, stable restart counts, and representative workload behavior."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Incident title: Docker Memory Limit / OOM Incident",
    "Environment / region / host / cluster:",
    "Affected service and container IDs:",
    "Image digest and deployment revision:",
    "Severity and incident owner:",
    "Detection time / acknowledgement time / recovery time:",
    "Customer impact and affected endpoints or jobs:",
    "Healthy replica count before and during the incident:",
    "Configured memory limit, reservation, and swap settings:",
    "Observed memory peak and metric definition:",
    "OOMKilled value and exit code:",
    "Kernel, cgroup, and application evidence:",
    "Heap, RSS, native memory, traffic, and concurrency evidence:",
    "Recent deployments and configuration changes:",
    "Verified root cause and supporting evidence:",
    "Mitigation applied and production approval:",
    "Rollback considered and compatibility risks:",
    "Recovery validation and observation window:",
    "Data integrity and backlog verification:",
    "Preventive action / owner / due date:",
    "Monitoring and runbook updates:",
    "Incident closure approved by:"
  ],

  productionRunbook: [
    {
      phase: "Detect and acknowledge",
      checklist: [
        "Acknowledge the alert and establish an incident owner.",
        "Confirm the affected service and environment.",
        "Check customer impact and remaining healthy replicas.",
        "Determine whether one container or the entire host is affected."
      ]
    },
    {
      phase: "Collect evidence",
      checklist: [
        "Record the container ID, image digest, state, exit code, OOMKilled, and restart count.",
        "Capture the effective memory limit and current resource usage.",
        "Collect timestamped application logs, events, and kernel evidence.",
        "Review historical memory, heap, traffic, and host metrics.",
        "Preserve the evidence before restarting or replacing the workload."
      ]
    },
    {
      phase: "Isolate root cause",
      checklist: [
        "Distinguish container OOM, host OOM, heap exhaustion, native memory growth, and legitimate workload peaks.",
        "Compare the current release with the last known-good version.",
        "Check memory growth against traffic, concurrency, and queue depth.",
        "Validate the hypothesis with multiple evidence sources."
      ]
    },
    {
      phase: "Mitigate and recover",
      checklist: [
        "Assess safe traffic reduction, concurrency controls, a targeted fix, scaling, or rollback.",
        "Check host capacity before changing memory limits or replica count.",
        "Obtain required production approval.",
        "Apply the correction through the appropriate deployment mechanism.",
        "Verify real requests, memory headroom, restart trends, and healthy capacity."
      ]
    },
    {
      phase: "Close and prevent recurrence",
      checklist: [
        "Confirm recovery with the service owner.",
        "Verify data integrity and background processing.",
        "Document the verified root cause and incident timeline.",
        "Add regression tests, memory alerts, and capacity validation.",
        "Assign preventive actions and update the runbook."
      ]
    }
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Inspect a container's memory configuration",
      objective:
        "Understand the difference between configured memory limits and observed usage.",
      steps: [
        "Choose a disposable development container.",
        "Run: docker inspect --format '{{.HostConfig.Memory}} {{.HostConfig.MemoryReservation}} {{.HostConfig.MemorySwap}}' CONTAINER",
        "Run: docker stats --no-stream CONTAINER",
        "Record the values, their units, and the time of collection.",
        "Compare them with the application's documented memory requirement."
      ],
      expectedFinding:
        "The configured resource values and the current memory snapshot answer different questions. A single snapshot does not establish the peak or prove a leak.",
      solution: [
        "Convert byte values carefully when comparing with MB or GiB.",
        "Collect time-series measurements during representative load.",
        "Do not change production limits based on a single observation."
      ]
    },
    {
      title: "Lab 2 — Inspect an OOM event safely",
      objective:
        "Learn to collect evidence before attributing a container termination to OOM.",
      steps: [
        "Use an existing development incident or a dedicated isolated test environment.",
        "Inspect the state: docker inspect --format '{{.State.ExitCode}} {{.State.OOMKilled}} {{.State.Error}}' CONTAINER",
        "Check the configured limit: docker inspect --format '{{.HostConfig.Memory}}' CONTAINER",
        "Review available kernel and cgroup evidence.",
        "Correlate the timestamps with memory metrics."
      ],
      expectedFinding:
        "OOMKilled, exit code, cgroup counters, and kernel evidence provide complementary information. No single exit code should be used as the only proof.",
      solution: [
        "Record the exact evidence and classify the event.",
        "Avoid stress testing a shared host.",
        "Use a controlled workload and a defined resource budget for further reproduction."
      ]
    },
    {
      title: "Lab 3 — Investigate suspected memory growth",
      objective:
        "Distinguish a memory leak from traffic growth or normal cache behavior.",
      steps: [
        "Collect a time series of container memory, RSS, and runtime heap metrics.",
        "Record request rate, concurrency, and queue depth over the same time window.",
        "Compare the growth pattern under stable workload conditions.",
        "Use approved heap snapshots or profiling in a controlled environment.",
        "Compare with a known-good release."
      ],
      expectedFinding:
        "Memory growth that persists under stable workload may suggest a leak, while traffic-correlated growth or a temporary cache warm-up can have different explanations.",
      solution: [
        "Use profiling evidence to identify retained objects or native allocations.",
        "Bound queues and caches where required.",
        "Run a regression or soak test after the correction."
      ]
    },
    {
      title: "Lab 4 — Compare JVM heap with container memory",
      objective:
        "Understand why a JVM container can exceed its memory limit even when the heap is not at its maximum.",
      steps: [
        "Inspect the JVM heap and garbage-collection metrics in a test environment.",
        "Measure process RSS and container memory.",
        "Review thread count, metaspace, direct buffers, and native allocations.",
        "Compare the total with the container's memory budget.",
        "Test a safe heap budget adjustment under representative load."
      ],
      expectedFinding:
        "Total process and container memory include more than the managed heap.",
      solution: [
        "Reserve adequate memory for native runtime overhead.",
        "Profile the component consuming memory.",
        "Validate latency, garbage collection, and total memory before release."
      ]
    },
    {
      title: "Lab 5 — Review a deployment memory budget",
      objective:
        "Estimate the risk of memory overcommit during a rolling deployment.",
      steps: [
        "Record the per-replica memory budget and the number of replicas.",
        "Estimate memory demand while old and new replicas coexist.",
        "Review host capacity, placement, and rollout surge settings.",
        "Compare the expected peak with measured usage and safety headroom.",
        "Write a rollout or rollback plan with explicit capacity checks."
      ],
      expectedFinding:
        "The deployment peak can be greater than steady-state demand because old and new replicas may overlap.",
      solution: [
        "Use measured peak demand and rollout behavior to validate capacity.",
        "Adjust the rollout strategy or infrastructure capacity through the approved process.",
        "Monitor memory and service health throughout the rollout."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is a Docker memory limit?",
      answer:
        "It is a configured memory constraint enforced through the container runtime and Linux resource controls. If a workload exceeds the applicable constraint, an allocation may fail or an OOM event may occur depending on the situation.",
      followUp:
        "How is a hard memory limit different from a memory reservation?"
    },
    {
      question: "Does exit code 137 always mean the container was OOM-killed?",
      answer:
        "No. It commonly indicates SIGKILL. I verify OOMKilled, kernel logs, cgroup events, and resource metrics before determining the cause.",
      followUp:
        "What evidence would you collect if OOMKilled is false?"
    },
    {
      question: "What is the difference between a container OOM and a host OOM?",
      answer:
        "A container-specific memory limit can trigger OOM handling for a workload even when the host has available memory. A host-level memory crisis can affect multiple workloads. I compare cgroup evidence with host memory and kernel logs.",
      followUp:
        "How can you determine whether multiple containers share the same failure cause?"
    },
    {
      question: "Why can a JVM container be OOM-killed when heap usage is below the heap maximum?",
      answer:
        "The JVM also uses native memory, thread stacks, metaspace, direct buffers, and other runtime allocations. Total container memory can exceed the limit even when the managed heap is not full.",
      followUp:
        "How would you budget memory for a JVM container?"
    },
    {
      question: "What is the difference between a memory leak and a traffic-related memory spike?",
      answer:
        "A leak often shows sustained growth caused by retained allocations, while a traffic-related spike may track request rate, concurrency, or payload size. Historical metrics and profiling help distinguish them.",
      followUp:
        "What evidence would you collect before declaring a leak?"
    },
    {
      question: "What would you do if several containers are OOM-killed on one host?",
      answer:
        "I would investigate host memory pressure, kernel events, process usage, and cgroup metrics, then engage the platform team. I would avoid increasing individual limits without understanding the shared capacity problem.",
      followUp:
        "Why can adding more replicas make this incident worse?"
    },
    {
      question: "How do you investigate a Node.js heap out-of-memory error?",
      answer:
        "I inspect heap metrics, RSS, external memory, allocation profiles, buffers, concurrency, and the container limit. I then identify whether the problem is a leak, excessive allocation, or an incorrectly sized heap.",
      followUp:
        "Why should the Node.js heap limit not automatically equal the container limit?"
    },
    {
      question: "Why is a single docker stats reading insufficient?",
      answer:
        "It is a snapshot and can miss a short peak or fail to reveal a growth trend. Historical metrics correlated with workload activity are necessary for diagnosing transient pressure and suspected leaks.",
      followUp:
        "Which metrics would you graph together during a memory incident?"
    },
    {
      question: "How can a rolling deployment cause memory pressure?",
      answer:
        "Old and new replicas can coexist temporarily, increasing total memory demand. A new release may also consume more memory per replica.",
      followUp:
        "How would you calculate whether the rollout can fit on the available hosts?"
    },
    {
      question: "What is cgroup v2 memory.events used for?",
      answer:
        "It exposes memory-related event counters such as high, max, oom, and oom_kill where supported. I inspect the correct container cgroup and compare counter changes over time.",
      followUp:
        "Why should you not read the host root cgroup and assume it represents one container?"
    },
    {
      question: "Should you increase a memory limit during an incident?",
      answer:
        "Only when the evidence supports insufficient capacity and the host can safely accommodate the change. If the cause is a leak or excessive concurrency, increasing the limit may only delay failure or harm neighboring workloads.",
      followUp:
        "What approval and rollback checks should happen before a production limit change?"
    },
    {
      question: "How do you validate a memory-related fix?",
      answer:
        "I verify the intended release, stable memory behavior under representative traffic, healthy requests, stable restart counts, adequate headroom, and no new OOM events during the observation period.",
      followUp:
        "Why is observing one successful restart not enough?"
    },
    {
      question: "What is memory headroom and why does it matter?",
      answer:
        "Memory headroom is the available margin between expected demand and the effective resource limit or host capacity. It protects against startup spikes, traffic bursts, runtime overhead, and rollout overlap.",
      followUp:
        "How would you establish an appropriate headroom target?"
    },
    {
      question: "How do you prevent recurring Docker memory incidents?",
      answer:
        "I use workload-based sizing, memory profiling, bounded caches and concurrency, resource monitoring, OOM alerts, staged rollouts, capacity validation, and tested recovery runbooks.",
      followUp:
        "Which automated checks would you add to CI/CD?"
    }
  ],

  references: [
    {
      title: "Docker — Resource constraints",
      url: "https://docs.docker.com/engine/containers/resource_constraints/"
    },
    {
      title: "Docker — docker stats",
      url: "https://docs.docker.com/reference/cli/docker/container/stats/"
    },
    {
      title: "Docker — docker inspect",
      url: "https://docs.docker.com/reference/cli/docker/inspect/"
    },
    {
      title: "Docker Compose — Services and resource configuration",
      url: "https://docs.docker.com/reference/compose-file/services/"
    },
    {
      title: "Linux kernel — Control Group v2",
      url: "https://docs.kernel.org/admin-guide/cgroup-v2.html"
    },
    {
      title: "Kubernetes — Resource management for Pods and containers",
      url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
    },
    {
      title: "Node.js — CLI and memory-related options",
      url: "https://nodejs.org/api/cli.html"
    },
    {
      title: "Oracle — Java troubleshooting and diagnostic tools",
      url: "https://docs.oracle.com/en/java/javase/"
    }
  ]
} satisfies MemoryLimitsGuide;

export default memoryLimitsGuide;
