import type { AtoZLesson } from "../lessons";

export const kubernetesAtoZLessons: Record<string, AtoZLesson> = {
  "kubernetes/container-orchestration": {
    "summary": "Container orchestration automates placement, scaling, networking and recovery of containerized applications across a cluster.",
    "diagram": {
      "title": "Container Orchestration control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Container orchestration automates placement, scaling, networking and recovery of containerized applications across a cluster.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Container Orchestration for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Container Orchestration for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get container-orchestration -A\nkubectl describe container-orchestration YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Container orchestration automates placement, scaling, networking and recovery of containerized applications across a cluster. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Container Orchestration in Kubernetes with a practical DevOps example.",
        "answer": "Container orchestration automates placement, scaling, networking and recovery of containerized applications across a cluster. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Container Orchestration issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Container Orchestration in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/kubernetes-introduction": {
    "summary": "Kubernetes is an open-source orchestration platform that manages containerized workloads through declarative APIs and controllers.",
    "diagram": {
      "title": "Kubernetes Introduction control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Kubernetes is an open-source orchestration platform that manages containerized workloads through declarative APIs and controllers.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Kubernetes Introduction for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Kubernetes Introduction for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get kubernetes-introduction -A\nkubectl describe kubernetes-introduction YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Kubernetes is an open-source orchestration platform that manages containerized workloads through declarative APIs and controllers. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Kubernetes Introduction in Kubernetes with a practical DevOps example.",
        "answer": "Kubernetes is an open-source orchestration platform that manages containerized workloads through declarative APIs and controllers. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Kubernetes Introduction issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Kubernetes Introduction in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/kubernetes-architecture": {
    "summary": "Kubernetes separates a control plane that stores and reconciles desired state from worker nodes that run application Pods.",
    "diagram": {
      "title": "Kubernetes Architecture control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Kubernetes separates a control plane that stores and reconciles desired state from worker nodes that run application Pods.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Kubernetes Architecture for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Kubernetes Architecture for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get kubernetes-architecture -A\nkubectl describe kubernetes-architecture YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Kubernetes separates a control plane that stores and reconciles desired state from worker nodes that run application Pods. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Kubernetes Architecture in Kubernetes with a practical DevOps example.",
        "answer": "Kubernetes separates a control plane that stores and reconciles desired state from worker nodes that run application Pods. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Kubernetes Architecture issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Kubernetes Architecture in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/control-plane": {
    "summary": "The Kubernetes control plane makes cluster-wide decisions and exposes the API used to manage resources.",
    "diagram": {
      "title": "Control Plane control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The Kubernetes control plane makes cluster-wide decisions and exposes the API used to manage resources.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Control Plane for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Control Plane for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get control-plane -A\nkubectl describe control-plane YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The Kubernetes control plane makes cluster-wide decisions and exposes the API used to manage resources. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Control Plane in Kubernetes with a practical DevOps example.",
        "answer": "The Kubernetes control plane makes cluster-wide decisions and exposes the API used to manage resources. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Control Plane issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Control Plane in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/worker-nodes": {
    "summary": "Worker nodes provide compute, networking and storage capacity for the Pods scheduled onto them.",
    "diagram": {
      "title": "Worker Nodes control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Worker nodes provide compute, networking and storage capacity for the Pods scheduled onto them.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Worker Nodes for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Worker Nodes for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get worker-nodes -A\nkubectl describe worker-nodes YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Worker nodes provide compute, networking and storage capacity for the Pods scheduled onto them. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Worker Nodes in Kubernetes with a practical DevOps example.",
        "answer": "Worker nodes provide compute, networking and storage capacity for the Pods scheduled onto them. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Worker Nodes issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Worker Nodes in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/kubernetes-api-server": {
    "summary": "The API server is the front door for Kubernetes API requests and validates, authenticates and authorizes operations.",
    "diagram": {
      "title": "Kubernetes API Server control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The API server is the front door for Kubernetes API requests and validates, authenticates and authorizes operations.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Kubernetes API Server for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Kubernetes API Server for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get kubernetes-api-server -A\nkubectl describe kubernetes-api-server YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The API server is the front door for Kubernetes API requests and validates, authenticates and authorizes operations. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Kubernetes API Server in Kubernetes with a practical DevOps example.",
        "answer": "The API server is the front door for Kubernetes API requests and validates, authenticates and authorizes operations. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Kubernetes API Server issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Kubernetes API Server in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/etcd": {
    "summary": "etcd is the distributed key-value store that persists Kubernetes cluster state.",
    "diagram": {
      "title": "etcd control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "etcd is the distributed key-value store that persists Kubernetes cluster state.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates etcd for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates etcd for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get etcd -A\nkubectl describe etcd YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "etcd is the distributed key-value store that persists Kubernetes cluster state. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain etcd in Kubernetes with a practical DevOps example.",
        "answer": "etcd is the distributed key-value store that persists Kubernetes cluster state. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a etcd issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect etcd in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/scheduler": {
    "summary": "The scheduler assigns unscheduled Pods to suitable nodes based on resources, constraints and policies.",
    "diagram": {
      "title": "Scheduler control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The scheduler assigns unscheduled Pods to suitable nodes based on resources, constraints and policies.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Scheduler for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Scheduler for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get scheduler -A\nkubectl describe scheduler YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The scheduler assigns unscheduled Pods to suitable nodes based on resources, constraints and policies. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Scheduler in Kubernetes with a practical DevOps example.",
        "answer": "The scheduler assigns unscheduled Pods to suitable nodes based on resources, constraints and policies. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Scheduler issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Scheduler in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/controller-manager": {
    "summary": "The controller manager runs control loops that compare actual state with desired state and reconcile differences.",
    "diagram": {
      "title": "Controller Manager control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The controller manager runs control loops that compare actual state with desired state and reconcile differences.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Controller Manager for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Controller Manager for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get controller-manager -A\nkubectl describe controller-manager YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The controller manager runs control loops that compare actual state with desired state and reconcile differences. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Controller Manager in Kubernetes with a practical DevOps example.",
        "answer": "The controller manager runs control loops that compare actual state with desired state and reconcile differences. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Controller Manager issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Controller Manager in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/cloud-controller-manager": {
    "summary": "The cloud controller manager integrates Kubernetes with cloud-provider APIs for resources such as nodes, routes and load balancers.",
    "diagram": {
      "title": "Cloud Controller Manager control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The cloud controller manager integrates Kubernetes with cloud-provider APIs for resources such as nodes, routes and load balancers.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Cloud Controller Manager for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Cloud Controller Manager for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get cloud-controller-manager -A\nkubectl describe cloud-controller-manager YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The cloud controller manager integrates Kubernetes with cloud-provider APIs for resources such as nodes, routes and load balancers. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Cloud Controller Manager in Kubernetes with a practical DevOps example.",
        "answer": "The cloud controller manager integrates Kubernetes with cloud-provider APIs for resources such as nodes, routes and load balancers. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Cloud Controller Manager issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Cloud Controller Manager in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/kubelet": {
    "summary": "kubelet is the node agent that ensures containers described by assigned Pod specifications are running and healthy.",
    "diagram": {
      "title": "kubelet control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "kubelet is the node agent that ensures containers described by assigned Pod specifications are running and healthy.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates kubelet for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates kubelet for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get kubelet -A\nkubectl describe kubelet YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "kubelet is the node agent that ensures containers described by assigned Pod specifications are running and healthy. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain kubelet in Kubernetes with a practical DevOps example.",
        "answer": "kubelet is the node agent that ensures containers described by assigned Pod specifications are running and healthy. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a kubelet issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect kubelet in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/kube-proxy": {
    "summary": "kube-proxy maintains node-level network rules that implement Kubernetes Service forwarding on supported configurations.",
    "diagram": {
      "title": "kube-proxy control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "kube-proxy maintains node-level network rules that implement Kubernetes Service forwarding on supported configurations.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates kube-proxy for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates kube-proxy for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get kube-proxy -A\nkubectl describe kube-proxy YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "kube-proxy maintains node-level network rules that implement Kubernetes Service forwarding on supported configurations. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain kube-proxy in Kubernetes with a practical DevOps example.",
        "answer": "kube-proxy maintains node-level network rules that implement Kubernetes Service forwarding on supported configurations. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a kube-proxy issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect kube-proxy in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/container-runtime": {
    "summary": "The container runtime pulls images and runs containers through the Kubernetes CRI interface.",
    "diagram": {
      "title": "Container Runtime control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The container runtime pulls images and runs containers through the Kubernetes CRI interface.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Container Runtime for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Container Runtime for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get container-runtime -A\nkubectl describe container-runtime YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The container runtime pulls images and runs containers through the Kubernetes CRI interface. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Container Runtime in Kubernetes with a practical DevOps example.",
        "answer": "The container runtime pulls images and runs containers through the Kubernetes CRI interface. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Container Runtime issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Container Runtime in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/pods": {
    "summary": "A Pod is Kubernetes' smallest deployable unit and groups one or more containers sharing network identity and volumes.",
    "diagram": {
      "title": "Pods control flow",
      "nodes": [
        "Deployment controller",
        "ReplicaSet",
        "Pod object",
        "kubelet",
        "container runtime"
      ],
      "explanation": "Deployment controller → ReplicaSet → Pod object → kubelet → container runtime. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A Pod is Kubernetes' smallest deployable unit and groups one or more containers sharing network identity and volumes.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Pods for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Deployment controller → ReplicaSet → Pod object → kubelet → container runtime. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Pods for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get pods -A -o wide\nkubectl describe pod YOUR_POD -n YOUR_NAMESPACE\nkubectl logs YOUR_POD -n YOUR_NAMESPACE --all-containers=true",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A Pod is Kubernetes' smallest deployable unit and groups one or more containers sharing network identity and volumes. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Pods in Kubernetes with a practical DevOps example.",
        "answer": "A Pod is Kubernetes' smallest deployable unit and groups one or more containers sharing network identity and volumes. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Pods issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Pods in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/replicasets": {
    "summary": "A ReplicaSet maintains a requested number of matching Pod replicas.",
    "diagram": {
      "title": "ReplicaSets control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A ReplicaSet maintains a requested number of matching Pod replicas.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates ReplicaSets for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates ReplicaSets for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get replicasets -A\nkubectl describe replicasets YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A ReplicaSet maintains a requested number of matching Pod replicas. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain ReplicaSets in Kubernetes with a practical DevOps example.",
        "answer": "A ReplicaSet maintains a requested number of matching Pod replicas. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a ReplicaSets issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect ReplicaSets in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/deployments": {
    "summary": "A Deployment manages stateless application rollouts by maintaining ReplicaSets and supporting scaling and rollback.",
    "diagram": {
      "title": "Deployments control flow",
      "nodes": [
        "Deployment spec",
        "ReplicaSet",
        "Pod replicas",
        "readiness checks",
        "Service endpoints"
      ],
      "explanation": "Deployment spec → ReplicaSet → Pod replicas → readiness checks → Service endpoints. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A Deployment manages stateless application rollouts by maintaining ReplicaSets and supporting scaling and rollback.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Deployments for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Deployment spec → ReplicaSet → Pod replicas → readiness checks → Service endpoints. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Deployments for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get deploy,rs,pods -n YOUR_NAMESPACE\nkubectl rollout status deployment/YOUR_DEPLOYMENT -n YOUR_NAMESPACE\nkubectl rollout history deployment/YOUR_DEPLOYMENT -n YOUR_NAMESPACE",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A Deployment manages stateless application rollouts by maintaining ReplicaSets and supporting scaling and rollback. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Deployments in Kubernetes with a practical DevOps example.",
        "answer": "A Deployment manages stateless application rollouts by maintaining ReplicaSets and supporting scaling and rollback. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Deployments issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Deployments in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/statefulsets": {
    "summary": "A StatefulSet manages Pods that need stable identities, ordered operations or persistent storage associations.",
    "diagram": {
      "title": "StatefulSets control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A StatefulSet manages Pods that need stable identities, ordered operations or persistent storage associations.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates StatefulSets for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates StatefulSets for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get statefulsets -A\nkubectl describe statefulsets YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A StatefulSet manages Pods that need stable identities, ordered operations or persistent storage associations. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain StatefulSets in Kubernetes with a practical DevOps example.",
        "answer": "A StatefulSet manages Pods that need stable identities, ordered operations or persistent storage associations. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a StatefulSets issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect StatefulSets in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/daemonsets": {
    "summary": "A DaemonSet ensures a copy of a Pod runs on each selected node or a defined subset of nodes.",
    "diagram": {
      "title": "DaemonSets control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A DaemonSet ensures a copy of a Pod runs on each selected node or a defined subset of nodes.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates DaemonSets for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates DaemonSets for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get daemonsets -A\nkubectl describe daemonsets YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A DaemonSet ensures a copy of a Pod runs on each selected node or a defined subset of nodes. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain DaemonSets in Kubernetes with a practical DevOps example.",
        "answer": "A DaemonSet ensures a copy of a Pod runs on each selected node or a defined subset of nodes. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a DaemonSets issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect DaemonSets in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/jobs": {
    "summary": "A Job runs Pods until a finite task completes successfully the required number of times.",
    "diagram": {
      "title": "Jobs control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A Job runs Pods until a finite task completes successfully the required number of times.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Jobs for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Jobs for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get jobs -A\nkubectl describe jobs YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A Job runs Pods until a finite task completes successfully the required number of times. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Jobs in Kubernetes with a practical DevOps example.",
        "answer": "A Job runs Pods until a finite task completes successfully the required number of times. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Jobs issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Jobs in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/cronjobs": {
    "summary": "A CronJob creates Jobs on a time-based schedule for recurring batch tasks.",
    "diagram": {
      "title": "CronJobs control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A CronJob creates Jobs on a time-based schedule for recurring batch tasks.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates CronJobs for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates CronJobs for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get cronjobs -A\nkubectl describe cronjobs YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A CronJob creates Jobs on a time-based schedule for recurring batch tasks. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain CronJobs in Kubernetes with a practical DevOps example.",
        "answer": "A CronJob creates Jobs on a time-based schedule for recurring batch tasks. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a CronJobs issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect CronJobs in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/namespaces": {
    "summary": "Namespaces partition namespaced resources and support delegated administration, quotas and policy boundaries.",
    "diagram": {
      "title": "Namespaces control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Namespaces partition namespaced resources and support delegated administration, quotas and policy boundaries.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Namespaces for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Namespaces for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get namespaces -A\nkubectl describe namespaces YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Namespaces partition namespaced resources and support delegated administration, quotas and policy boundaries. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Namespaces in Kubernetes with a practical DevOps example.",
        "answer": "Namespaces partition namespaced resources and support delegated administration, quotas and policy boundaries. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Namespaces issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Namespaces in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/labels-and-selectors": {
    "summary": "Labels attach key-value metadata to objects and selectors query matching resources for controllers and Services.",
    "diagram": {
      "title": "Labels and Selectors control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Labels attach key-value metadata to objects and selectors query matching resources for controllers and Services.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Labels and Selectors for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Labels and Selectors for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get labels-and-selectors -A\nkubectl describe labels-and-selectors YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Labels attach key-value metadata to objects and selectors query matching resources for controllers and Services. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Labels and Selectors in Kubernetes with a practical DevOps example.",
        "answer": "Labels attach key-value metadata to objects and selectors query matching resources for controllers and Services. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Labels and Selectors issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Labels and Selectors in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/services": {
    "summary": "A Service provides a stable virtual endpoint and DNS name for a changing set of Pods.",
    "diagram": {
      "title": "Services control flow",
      "nodes": [
        "Client",
        "Service DNS / ClusterIP",
        "EndpointSlice",
        "ready Pod IP"
      ],
      "explanation": "Client → Service DNS / ClusterIP → EndpointSlice → ready Pod IP. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A Service provides a stable virtual endpoint and DNS name for a changing set of Pods.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Services for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Client → Service DNS / ClusterIP → EndpointSlice → ready Pod IP. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Services for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get svc,endpointslices -n YOUR_NAMESPACE\nkubectl describe svc YOUR_SERVICE -n YOUR_NAMESPACE\nkubectl get pods -l app=YOUR_LABEL -o wide -n YOUR_NAMESPACE",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A Service provides a stable virtual endpoint and DNS name for a changing set of Pods. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Services in Kubernetes with a practical DevOps example.",
        "answer": "A Service provides a stable virtual endpoint and DNS name for a changing set of Pods. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Services issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Services in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/clusterip": {
    "summary": "ClusterIP exposes a Service on an internal virtual IP reachable from within the cluster.",
    "diagram": {
      "title": "ClusterIP control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "ClusterIP exposes a Service on an internal virtual IP reachable from within the cluster.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates ClusterIP for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates ClusterIP for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get clusterip -A\nkubectl describe clusterip YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "ClusterIP exposes a Service on an internal virtual IP reachable from within the cluster. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain ClusterIP in Kubernetes with a practical DevOps example.",
        "answer": "ClusterIP exposes a Service on an internal virtual IP reachable from within the cluster. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a ClusterIP issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect ClusterIP in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/nodeport": {
    "summary": "NodePort exposes a Service through a port on each node's network interfaces, subject to network reachability.",
    "diagram": {
      "title": "NodePort control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "NodePort exposes a Service through a port on each node's network interfaces, subject to network reachability.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates NodePort for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates NodePort for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get nodeport -A\nkubectl describe nodeport YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "NodePort exposes a Service through a port on each node's network interfaces, subject to network reachability. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain NodePort in Kubernetes with a practical DevOps example.",
        "answer": "NodePort exposes a Service through a port on each node's network interfaces, subject to network reachability. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a NodePort issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect NodePort in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/loadbalancer-service": {
    "summary": "A LoadBalancer Service requests an external load-balancing implementation from the cluster environment.",
    "diagram": {
      "title": "LoadBalancer Service control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A LoadBalancer Service requests an external load-balancing implementation from the cluster environment.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates LoadBalancer Service for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates LoadBalancer Service for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get loadbalancer-service -A\nkubectl describe loadbalancer-service YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A LoadBalancer Service requests an external load-balancing implementation from the cluster environment. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain LoadBalancer Service in Kubernetes with a practical DevOps example.",
        "answer": "A LoadBalancer Service requests an external load-balancing implementation from the cluster environment. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a LoadBalancer Service issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect LoadBalancer Service in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/ingress": {
    "summary": "Ingress defines HTTP and HTTPS routing rules implemented by an installed ingress controller.",
    "diagram": {
      "title": "Ingress control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ingress defines HTTP and HTTPS routing rules implemented by an installed ingress controller.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Ingress for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Ingress for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get ingress -A\nkubectl describe ingress YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ingress defines HTTP and HTTPS routing rules implemented by an installed ingress controller. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Ingress in Kubernetes with a practical DevOps example.",
        "answer": "Ingress defines HTTP and HTTPS routing rules implemented by an installed ingress controller. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Ingress issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Ingress in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/gateway-api": {
    "summary": "Gateway API provides role-oriented, extensible Kubernetes networking resources for listeners and traffic routes.",
    "diagram": {
      "title": "Gateway API control flow",
      "nodes": [
        "Client",
        "Gateway listener",
        "HTTPRoute match",
        "backend Service",
        "Pod"
      ],
      "explanation": "Client → Gateway listener → HTTPRoute match → backend Service → Pod. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Gateway API provides role-oriented, extensible Kubernetes networking resources for listeners and traffic routes.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Gateway API for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Client → Gateway listener → HTTPRoute match → backend Service → Pod. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Gateway API for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get gateway-api -A\nkubectl describe gateway-api YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Gateway API provides role-oriented, extensible Kubernetes networking resources for listeners and traffic routes. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Gateway API in Kubernetes with a practical DevOps example.",
        "answer": "Gateway API provides role-oriented, extensible Kubernetes networking resources for listeners and traffic routes. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Gateway API issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Gateway API in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/configmaps": {
    "summary": "A ConfigMap stores non-confidential configuration separately from container images.",
    "diagram": {
      "title": "ConfigMaps control flow",
      "nodes": [
        "ConfigMap API object",
        "Pod volume or environment variable",
        "application configuration"
      ],
      "explanation": "ConfigMap API object → Pod volume or environment variable → application configuration. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A ConfigMap stores non-confidential configuration separately from container images.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates ConfigMaps for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "ConfigMap API object → Pod volume or environment variable → application configuration. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates ConfigMaps for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get configmaps -n YOUR_NAMESPACE\nkubectl describe configmap YOUR_CONFIG -n YOUR_NAMESPACE",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A ConfigMap stores non-confidential configuration separately from container images. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain ConfigMaps in Kubernetes with a practical DevOps example.",
        "answer": "A ConfigMap stores non-confidential configuration separately from container images. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a ConfigMaps issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect ConfigMaps in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/secrets": {
    "summary": "A Kubernetes Secret stores sensitive configuration data; base64 encoding alone does not encrypt the value.",
    "diagram": {
      "title": "Secrets control flow",
      "nodes": [
        "Secret API object",
        "authorized kubelet",
        "mounted file / environment",
        "application"
      ],
      "explanation": "Secret API object → authorized kubelet → mounted file / environment → application. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A Kubernetes Secret stores sensitive configuration data; base64 encoding alone does not encrypt the value.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Secrets for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Secret API object → authorized kubelet → mounted file / environment → application. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Secrets for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get secrets -n YOUR_NAMESPACE\nkubectl describe secret YOUR_SECRET -n YOUR_NAMESPACE\nkubectl get secret YOUR_SECRET -o jsonpath='{.type}' -n YOUR_NAMESPACE",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A Kubernetes Secret stores sensitive configuration data; base64 encoding alone does not encrypt the value. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Secrets in Kubernetes with a practical DevOps example.",
        "answer": "A Kubernetes Secret stores sensitive configuration data; base64 encoding alone does not encrypt the value. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Secrets issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Secrets in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/persistent-volumes": {
    "summary": "A PersistentVolume represents storage provisioned for cluster workloads independently of an individual Pod.",
    "diagram": {
      "title": "Persistent Volumes control flow",
      "nodes": [
        "Storage backend",
        "PersistentVolume",
        "PersistentVolumeClaim",
        "Pod mount"
      ],
      "explanation": "Storage backend → PersistentVolume → PersistentVolumeClaim → Pod mount. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A PersistentVolume represents storage provisioned for cluster workloads independently of an individual Pod.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Persistent Volumes for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Storage backend → PersistentVolume → PersistentVolumeClaim → Pod mount. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Persistent Volumes for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get pv,pvc -A\nkubectl describe pvc YOUR_PVC -n YOUR_NAMESPACE\nkubectl get storageclass",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A PersistentVolume represents storage provisioned for cluster workloads independently of an individual Pod. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Persistent Volumes in Kubernetes with a practical DevOps example.",
        "answer": "A PersistentVolume represents storage provisioned for cluster workloads independently of an individual Pod. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Persistent Volumes issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Persistent Volumes in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/persistent-volume-claims": {
    "summary": "A PersistentVolumeClaim requests storage capacity and access modes for a workload.",
    "diagram": {
      "title": "Persistent Volume Claims control flow",
      "nodes": [
        "Pod volume reference",
        "PVC binding",
        "PV or provisioner",
        "mounted filesystem"
      ],
      "explanation": "Pod volume reference → PVC binding → PV or provisioner → mounted filesystem. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A PersistentVolumeClaim requests storage capacity and access modes for a workload.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Persistent Volume Claims for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Pod volume reference → PVC binding → PV or provisioner → mounted filesystem. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Persistent Volume Claims for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get persistent-volume-claims -A\nkubectl describe persistent-volume-claims YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A PersistentVolumeClaim requests storage capacity and access modes for a workload. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Persistent Volume Claims in Kubernetes with a practical DevOps example.",
        "answer": "A PersistentVolumeClaim requests storage capacity and access modes for a workload. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Persistent Volume Claims issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Persistent Volume Claims in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/storage-classes": {
    "summary": "A StorageClass describes a storage provisioner and parameters for dynamic volume provisioning.",
    "diagram": {
      "title": "Storage Classes control flow",
      "nodes": [
        "PVC",
        "StorageClass provisioner",
        "dynamically created PV",
        "PVC bound"
      ],
      "explanation": "PVC → StorageClass provisioner → dynamically created PV → PVC bound. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A StorageClass describes a storage provisioner and parameters for dynamic volume provisioning.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Storage Classes for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "PVC → StorageClass provisioner → dynamically created PV → PVC bound. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Storage Classes for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get storage-classes -A\nkubectl describe storage-classes YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A StorageClass describes a storage provisioner and parameters for dynamic volume provisioning. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Storage Classes in Kubernetes with a practical DevOps example.",
        "answer": "A StorageClass describes a storage provisioner and parameters for dynamic volume provisioning. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Storage Classes issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Storage Classes in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/requests-and-limits": {
    "summary": "Resource requests influence scheduling while CPU and memory limits constrain container resource consumption.",
    "diagram": {
      "title": "Requests and Limits control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Resource requests influence scheduling while CPU and memory limits constrain container resource consumption.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Requests and Limits for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Requests and Limits for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get requests-and-limits -A\nkubectl describe requests-and-limits YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Resource requests influence scheduling while CPU and memory limits constrain container resource consumption. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Requests and Limits in Kubernetes with a practical DevOps example.",
        "answer": "Resource requests influence scheduling while CPU and memory limits constrain container resource consumption. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Requests and Limits issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Requests and Limits in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/liveness-readiness-and-startup-probes": {
    "summary": "Liveness, readiness and startup probes let kubelet decide whether to restart a container, send it traffic or allow more startup time.",
    "diagram": {
      "title": "Liveness Readiness and Startup Probes control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Liveness, readiness and startup probes let kubelet decide whether to restart a container, send it traffic or allow more startup time.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Liveness Readiness and Startup Probes for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Liveness Readiness and Startup Probes for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get liveness-readiness-and-startup-probes -A\nkubectl describe liveness-readiness-and-startup-probes YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Liveness, readiness and startup probes let kubelet decide whether to restart a container, send it traffic or allow more startup time. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Liveness Readiness and Startup Probes in Kubernetes with a practical DevOps example.",
        "answer": "Liveness, readiness and startup probes let kubelet decide whether to restart a container, send it traffic or allow more startup time. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Liveness Readiness and Startup Probes issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Liveness Readiness and Startup Probes in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/scheduling": {
    "summary": "Kubernetes scheduling selects a node for each unscheduled Pod using resources, constraints and policies.",
    "diagram": {
      "title": "Scheduling control flow",
      "nodes": [
        "Pod pending state",
        "scheduler filters nodes",
        "scores candidates",
        "binding"
      ],
      "explanation": "Pod pending state → scheduler filters nodes → scores candidates → binding. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Kubernetes scheduling selects a node for each unscheduled Pod using resources, constraints and policies.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Scheduling for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Pod pending state → scheduler filters nodes → scores candidates → binding. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Scheduling for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get pods -A -o wide\nkubectl describe pod YOUR_PENDING_POD -n YOUR_NAMESPACE\nkubectl describe nodes",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Kubernetes scheduling selects a node for each unscheduled Pod using resources, constraints and policies. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Scheduling in Kubernetes with a practical DevOps example.",
        "answer": "Kubernetes scheduling selects a node for each unscheduled Pod using resources, constraints and policies. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Scheduling issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Scheduling in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/taints-and-tolerations": {
    "summary": "Taints repel Pods from nodes unless matching tolerations allow scheduling or continued execution.",
    "diagram": {
      "title": "Taints and Tolerations control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Taints repel Pods from nodes unless matching tolerations allow scheduling or continued execution.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Taints and Tolerations for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Taints and Tolerations for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get taints-and-tolerations -A\nkubectl describe taints-and-tolerations YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Taints repel Pods from nodes unless matching tolerations allow scheduling or continued execution. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Taints and Tolerations in Kubernetes with a practical DevOps example.",
        "answer": "Taints repel Pods from nodes unless matching tolerations allow scheduling or continued execution. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Taints and Tolerations issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Taints and Tolerations in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/node-and-pod-affinity": {
    "summary": "Affinity and anti-affinity rules express preferences or requirements about which nodes or Pods should be colocated or separated.",
    "diagram": {
      "title": "Node and Pod Affinity control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Affinity and anti-affinity rules express preferences or requirements about which nodes or Pods should be colocated or separated.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Node and Pod Affinity for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Node and Pod Affinity for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get node-and-pod-affinity -A\nkubectl describe node-and-pod-affinity YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Affinity and anti-affinity rules express preferences or requirements about which nodes or Pods should be colocated or separated. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Node and Pod Affinity in Kubernetes with a practical DevOps example.",
        "answer": "Affinity and anti-affinity rules express preferences or requirements about which nodes or Pods should be colocated or separated. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Node and Pod Affinity issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Node and Pod Affinity in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/hpa-and-vpa": {
    "summary": "Horizontal Pod Autoscaler changes replica counts while Vertical Pod Autoscaler recommends or adjusts container resource requests according to its mode.",
    "diagram": {
      "title": "HPA and VPA control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Horizontal Pod Autoscaler changes replica counts while Vertical Pod Autoscaler recommends or adjusts container resource requests according to its mode.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates HPA and VPA for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates HPA and VPA for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get hpa-and-vpa -A\nkubectl describe hpa-and-vpa YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Horizontal Pod Autoscaler changes replica counts while Vertical Pod Autoscaler recommends or adjusts container resource requests according to its mode. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain HPA and VPA in Kubernetes with a practical DevOps example.",
        "answer": "Horizontal Pod Autoscaler changes replica counts while Vertical Pod Autoscaler recommends or adjusts container resource requests according to its mode. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a HPA and VPA issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect HPA and VPA in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/rbac": {
    "summary": "Role-Based Access Control defines which identities can perform which API operations on which resources.",
    "diagram": {
      "title": "RBAC control flow",
      "nodes": [
        "User or ServiceAccount",
        "RoleBinding",
        "Role rules",
        "API authorization decision"
      ],
      "explanation": "User or ServiceAccount → RoleBinding → Role rules → API authorization decision. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Role-Based Access Control defines which identities can perform which API operations on which resources.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates RBAC for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "User or ServiceAccount → RoleBinding → Role rules → API authorization decision. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates RBAC for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl auth can-i list pods -n YOUR_NAMESPACE\nkubectl get roles,rolebindings -n YOUR_NAMESPACE\nkubectl get clusterroles,clusterrolebindings",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Role-Based Access Control defines which identities can perform which API operations on which resources. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain RBAC in Kubernetes with a practical DevOps example.",
        "answer": "Role-Based Access Control defines which identities can perform which API operations on which resources. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a RBAC issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect RBAC in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/service-accounts": {
    "summary": "ServiceAccounts provide workload identities for Pods that need to authenticate to the Kubernetes API or integrated systems.",
    "diagram": {
      "title": "Service Accounts control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "ServiceAccounts provide workload identities for Pods that need to authenticate to the Kubernetes API or integrated systems.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Service Accounts for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Service Accounts for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get service-accounts -A\nkubectl describe service-accounts YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "ServiceAccounts provide workload identities for Pods that need to authenticate to the Kubernetes API or integrated systems. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Service Accounts in Kubernetes with a practical DevOps example.",
        "answer": "ServiceAccounts provide workload identities for Pods that need to authenticate to the Kubernetes API or integrated systems. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Service Accounts issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Service Accounts in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/network-policies": {
    "summary": "NetworkPolicies define allowed Pod ingress and egress traffic when supported by the installed network plugin.",
    "diagram": {
      "title": "Network Policies control flow",
      "nodes": [
        "Pod traffic",
        "CNI policy enforcement",
        "allowed or denied connection"
      ],
      "explanation": "Pod traffic → CNI policy enforcement → allowed or denied connection. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "NetworkPolicies define allowed Pod ingress and egress traffic when supported by the installed network plugin.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Network Policies for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Pod traffic → CNI policy enforcement → allowed or denied connection. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Network Policies for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get network-policies -A\nkubectl describe network-policies YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "NetworkPolicies define allowed Pod ingress and egress traffic when supported by the installed network plugin. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Network Policies in Kubernetes with a practical DevOps example.",
        "answer": "NetworkPolicies define allowed Pod ingress and egress traffic when supported by the installed network plugin. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Network Policies issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Network Policies in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/helm": {
    "summary": "Helm packages Kubernetes resources into versioned charts and manages configurable releases.",
    "diagram": {
      "title": "Helm control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Helm packages Kubernetes resources into versioned charts and manages configurable releases.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Helm for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Helm for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get helm -A\nkubectl describe helm YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Helm packages Kubernetes resources into versioned charts and manages configurable releases. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Helm in Kubernetes with a practical DevOps example.",
        "answer": "Helm packages Kubernetes resources into versioned charts and manages configurable releases. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Helm issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Helm in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/custom-resource-definitions": {
    "summary": "A CustomResourceDefinition extends the Kubernetes API with a new resource kind and schema.",
    "diagram": {
      "title": "Custom Resource Definitions control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A CustomResourceDefinition extends the Kubernetes API with a new resource kind and schema.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Custom Resource Definitions for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Custom Resource Definitions for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get custom-resource-definitions -A\nkubectl describe custom-resource-definitions YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A CustomResourceDefinition extends the Kubernetes API with a new resource kind and schema. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Custom Resource Definitions in Kubernetes with a practical DevOps example.",
        "answer": "A CustomResourceDefinition extends the Kubernetes API with a new resource kind and schema. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Custom Resource Definitions issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Custom Resource Definitions in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/operators": {
    "summary": "An Operator combines custom resources and controller logic to automate application-specific lifecycle operations.",
    "diagram": {
      "title": "Operators control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "An Operator combines custom resources and controller logic to automate application-specific lifecycle operations.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Operators for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Operators for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get operators -A\nkubectl describe operators YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "An Operator combines custom resources and controller logic to automate application-specific lifecycle operations. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Operators in Kubernetes with a practical DevOps example.",
        "answer": "An Operator combines custom resources and controller logic to automate application-specific lifecycle operations. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Operators issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Operators in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/coredns": {
    "summary": "CoreDNS provides cluster DNS resolution for Services and configured cluster domains.",
    "diagram": {
      "title": "CoreDNS control flow",
      "nodes": [
        "Pod DNS query",
        "CoreDNS Service",
        "Kubernetes service records",
        "response"
      ],
      "explanation": "Pod DNS query → CoreDNS Service → Kubernetes service records → response. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "CoreDNS provides cluster DNS resolution for Services and configured cluster domains.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates CoreDNS for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Pod DNS query → CoreDNS Service → Kubernetes service records → response. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates CoreDNS for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get coredns -A\nkubectl describe coredns YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "CoreDNS provides cluster DNS resolution for Services and configured cluster domains. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain CoreDNS in Kubernetes with a practical DevOps example.",
        "answer": "CoreDNS provides cluster DNS resolution for Services and configured cluster domains. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a CoreDNS issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect CoreDNS in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/cni-plugins": {
    "summary": "Container Network Interface plugins configure Pod network connectivity and related IP address management.",
    "diagram": {
      "title": "CNI Plugins control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Container Network Interface plugins configure Pod network connectivity and related IP address management.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates CNI Plugins for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates CNI Plugins for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get cni-plugins -A\nkubectl describe cni-plugins YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Container Network Interface plugins configure Pod network connectivity and related IP address management. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain CNI Plugins in Kubernetes with a practical DevOps example.",
        "answer": "Container Network Interface plugins configure Pod network connectivity and related IP address management. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a CNI Plugins issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect CNI Plugins in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/csi-drivers": {
    "summary": "Container Storage Interface drivers integrate external storage systems with Kubernetes volume lifecycle operations.",
    "diagram": {
      "title": "CSI Drivers control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Container Storage Interface drivers integrate external storage systems with Kubernetes volume lifecycle operations.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates CSI Drivers for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates CSI Drivers for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get csi-drivers -A\nkubectl describe csi-drivers YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Container Storage Interface drivers integrate external storage systems with Kubernetes volume lifecycle operations. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain CSI Drivers in Kubernetes with a practical DevOps example.",
        "answer": "Container Storage Interface drivers integrate external storage systems with Kubernetes volume lifecycle operations. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a CSI Drivers issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect CSI Drivers in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/kubectl": {
    "summary": "kubectl is the command-line client used to query and change Kubernetes API resources.",
    "diagram": {
      "title": "kubectl control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "kubectl is the command-line client used to query and change Kubernetes API resources.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates kubectl for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates kubectl for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get kubectl -A\nkubectl describe kubectl YOUR_RESOURCE -n YOUR_NAMESPACE\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "kubectl is the command-line client used to query and change Kubernetes API resources. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain kubectl in Kubernetes with a practical DevOps example.",
        "answer": "kubectl is the command-line client used to query and change Kubernetes API resources. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a kubectl issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect kubectl in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/troubleshooting-kubernetes": {
    "summary": "Kubernetes troubleshooting uses resource status, events, logs, probes and dependency checks to isolate cluster and application failures.",
    "diagram": {
      "title": "Troubleshooting Kubernetes control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Kubernetes troubleshooting uses resource status, events, logs, probes and dependency checks to isolate cluster and application failures.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Troubleshooting Kubernetes for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Troubleshooting Kubernetes for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get pods -A -o wide\nkubectl get events -A --sort-by=.lastTimestamp\nkubectl describe pod YOUR_POD -n YOUR_NAMESPACE\nkubectl logs YOUR_POD -n YOUR_NAMESPACE --previous",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Kubernetes troubleshooting uses resource status, events, logs, probes and dependency checks to isolate cluster and application failures. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Troubleshooting Kubernetes in Kubernetes with a practical DevOps example.",
        "answer": "Kubernetes troubleshooting uses resource status, events, logs, probes and dependency checks to isolate cluster and application failures. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Troubleshooting Kubernetes issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Troubleshooting Kubernetes in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  },
  "kubernetes/cluster-upgrades-and-high-availability": {
    "summary": "Cluster upgrades move control-plane and node components through supported versions while high availability reduces single points of failure.",
    "diagram": {
      "title": "Cluster Upgrades and High Availability control flow",
      "nodes": [
        "kubectl / controller",
        "API server",
        "etcd desired state",
        "controller or node component",
        "observed status"
      ],
      "explanation": "kubectl / controller → API server → etcd desired state → controller or node component → observed status. Kubernetes controllers reconcile desired state toward actual state; inspect status and events to find the first blocked step."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Cluster upgrades move control-plane and node components through supported versions while high availability reduces single points of failure.",
          "This capability is important because it solves a specific scheduling, networking, storage, security or lifecycle requirement in a cluster. Knowing its responsibility prevents changing unrelated resources when an incident occurs."
        ],
        "bullets": [
          "Kubernetes is declarative: manifests describe desired state.",
          "The API server validates and stores accepted resource changes.",
          "Controllers and node agents work toward the requested state."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps engineer operates Cluster Upgrades and High Availability for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Use this capability in development, CI validation and production according to workload needs. Check Kubernetes version compatibility, installed add-ons, cloud-provider support and namespace boundaries."
        ],
        "bullets": [
          "Development: reproduce behavior in a disposable namespace or local cluster.",
          "CI/CD: validate manifests and policies before applying them.",
          "Production: use reviewed manifests, rollout checks, monitoring and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "kubectl / controller → API server → etcd desired state → controller or node component → observed status. The API server authenticates and authorizes the request, validates the object and persists accepted desired state in etcd. Relevant controllers, scheduler and kubelet then reconcile that state; status and events expose progress or failure.",
          "An accepted manifest does not prove that an application is ready. Check Pod conditions, container state, probes, endpoints and node health."
        ],
        "bullets": [
          "Spec is the desired configuration submitted to the API.",
          "Status is the observed state reported by Kubernetes components.",
          "Events and logs provide evidence for scheduling, image, mount and runtime failures."
        ]
      },
      {
        "heading": "4. Practical DevOps example and commands",
        "paragraphs": [
          "A DevOps engineer operates Cluster Upgrades and High Availability for an application running in a Kubernetes cluster. First confirm the current context and namespace, inspect desired and observed state, then check events, logs and dependencies before changing anything.",
          "Run the read-only commands below against a lab or approved cluster. Replace placeholders with actual names and inspect the current context first."
        ],
        "code": "kubectl config current-context\nkubectl get nodes -o wide\nkubectl version\nkubectl get pdb -A\nkubectl get pods -A",
        "note": "Do not expose Secret values in terminal output or shared logs. Before applying or deleting resources, inspect the diff and confirm the target context."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Keep manifests in version control and use declarative deployment workflows. Apply least-privilege RBAC, resource requests and limits, health probes, network controls and suitable disruption budgets.",
          "For stateful workloads, test backup and restore. Upgrade control-plane, nodes and add-ons using supported version-skew rules and staged rollouts."
        ],
        "bullets": [
          "Use namespaces, labels and ownership conventions consistently.",
          "Set resource requests, limits and probes based on measured behavior.",
          "Restrict ServiceAccount permissions and API access.",
          "Monitor events, workload health, capacity and control-plane metrics.",
          "Document rollout, rollback and recovery procedures."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with kubectl get and describe for the affected resource. Sort recent events, inspect container logs including --previous after a restart, and check node conditions, image pulls, probes, mounts, DNS and network policies as relevant.",
          "Compare the failing object with a known-good manifest and identify the first failed dependency. Make one controlled change, then verify status and application behavior."
        ],
        "bullets": [
          "Pending: inspect scheduler events, requests, taints, affinity and capacity.",
          "CrashLoopBackOff: inspect logs, exit code, probes and configuration.",
          "ImagePullBackOff: verify image name, tag, registry access and pull secret.",
          "Service unreachable: inspect selectors, EndpointSlices, ports, DNS and NetworkPolicy.",
          "Storage failure: inspect PVC binding, StorageClass, CSI driver and mount events."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Cluster upgrades move control-plane and node components through supported versions while high availability reduces single points of failure. In production, I would manage it declaratively, protect access with RBAC, monitor status and events, and use controlled rollout or rollback procedures."
        ],
        "bullets": [
          "Explain its purpose and API/control-plane flow.",
          "Describe how desired state becomes observed state.",
          "Give a failure scenario and the commands used to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Cluster Upgrades and High Availability in Kubernetes with a practical DevOps example.",
        "answer": "Cluster upgrades move control-plane and node components through supported versions while high availability reduces single points of failure. I would define it through version-controlled manifests or supported cluster configuration, validate it in a test environment, monitor the resulting status and document rollback."
      },
      {
        "question": "How do you troubleshoot a Cluster Upgrades and High Availability issue?",
        "answer": "Confirm kubectl context and namespace, inspect the resource and events, check related controller and Pod status, then review logs, probes, RBAC, scheduling, networking or storage dependencies as appropriate. Correct the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Inspect Cluster Upgrades and High Availability in a lab cluster and record desired state and observed status.",
      "Draw its API/control-plane/workload path and identify the component responsible for reconciliation.",
      "Create a safe test failure, capture describe output and events, then restore the working configuration.",
      "Write a runbook with validation, safe remediation, rollout verification and rollback."
    ]
  }
};
