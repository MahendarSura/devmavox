import type { AtoZLesson } from "../lessons";

export const eksAtoZLessons: Record<string, AtoZLesson> = {
  "eks/amazon-eks-introduction": {
    "summary": "Amazon EKS is AWS's managed Kubernetes service that operates the Kubernetes control plane and integrates clusters with AWS identity, networking and infrastructure services.",
    "diagram": {
      "title": "Amazon EKS Introduction EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Amazon EKS is AWS's managed Kubernetes service that operates the Kubernetes control plane and integrates clusters with AWS identity, networking and infrastructure services.",
          "This capability is important because amazon eks introduction connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Amazon EKS Introduction when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\naws eks list-clusters --region ap-south-1\naws eks describe-cluster --name YOUR_CLUSTER --region ap-south-1",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Amazon EKS is AWS's managed Kubernetes service that operates the Kubernetes control plane and integrates clusters with AWS identity, networking and infrastructure services. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Amazon EKS Introduction in an EKS DevOps environment.",
        "answer": "Amazon EKS is AWS's managed Kubernetes service that operates the Kubernetes control plane and integrates clusters with AWS identity, networking and infrastructure services. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/eks-architecture": {
    "summary": "EKS architecture combines an AWS-managed Kubernetes control plane with customer-managed worker capacity and VPC networking.",
    "diagram": {
      "title": "EKS Architecture EKS workflow",
      "nodes": [
        "AWS-managed control plane",
        "VPC API endpoint",
        "worker nodes / Fargate",
        "VPC CNI Pod networking",
        "AWS integrations"
      ],
      "explanation": "AWS-managed control plane → VPC API endpoint → worker nodes / Fargate → VPC CNI Pod networking → AWS integrations. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "EKS architecture combines an AWS-managed Kubernetes control plane with customer-managed worker capacity and VPC networking.",
          "This capability is important because eks architecture connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use EKS Architecture when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "AWS-managed control plane → VPC API endpoint → worker nodes / Fargate → VPC CNI Pod networking → AWS integrations. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EKS architecture combines an AWS-managed Kubernetes control plane with customer-managed worker capacity and VPC networking. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EKS Architecture in an EKS DevOps environment.",
        "answer": "EKS architecture combines an AWS-managed Kubernetes control plane with customer-managed worker capacity and VPC networking. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/control-plane": {
    "summary": "The EKS control plane hosts Kubernetes API server and control-plane components across AWS-managed infrastructure.",
    "diagram": {
      "title": "Control Plane EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The EKS control plane hosts Kubernetes API server and control-plane components across AWS-managed infrastructure.",
          "This capability is important because control plane connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Control Plane when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The EKS control plane hosts Kubernetes API server and control-plane components across AWS-managed infrastructure. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Control Plane in an EKS DevOps environment.",
        "answer": "The EKS control plane hosts Kubernetes API server and control-plane components across AWS-managed infrastructure. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/managed-node-groups": {
    "summary": "Managed node groups let EKS manage EC2 worker node provisioning and lifecycle using an Auto Scaling group.",
    "diagram": {
      "title": "Managed Node Groups EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Managed node groups let EKS manage EC2 worker node provisioning and lifecycle using an Auto Scaling group.",
          "This capability is important because managed node groups connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Managed Node Groups when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Managed node groups let EKS manage EC2 worker node provisioning and lifecycle using an Auto Scaling group. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Managed Node Groups in an EKS DevOps environment.",
        "answer": "Managed node groups let EKS manage EC2 worker node provisioning and lifecycle using an Auto Scaling group. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/self-managed-nodes": {
    "summary": "Self-managed nodes are EC2 worker instances whose lifecycle, bootstrap and scaling are operated directly by the customer.",
    "diagram": {
      "title": "Self-managed Nodes EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Self-managed nodes are EC2 worker instances whose lifecycle, bootstrap and scaling are operated directly by the customer.",
          "This capability is important because self-managed nodes connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Self-managed Nodes when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Self-managed nodes are EC2 worker instances whose lifecycle, bootstrap and scaling are operated directly by the customer. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Self-managed Nodes in an EKS DevOps environment.",
        "answer": "Self-managed nodes are EC2 worker instances whose lifecycle, bootstrap and scaling are operated directly by the customer. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/fargate-profiles": {
    "summary": "Fargate profiles define which Pods run on AWS Fargate instead of customer-managed EC2 worker nodes.",
    "diagram": {
      "title": "Fargate Profiles EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Fargate profiles define which Pods run on AWS Fargate instead of customer-managed EC2 worker nodes.",
          "This capability is important because fargate profiles connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Fargate Profiles when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Fargate profiles define which Pods run on AWS Fargate instead of customer-managed EC2 worker nodes. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Fargate Profiles in an EKS DevOps environment.",
        "answer": "Fargate profiles define which Pods run on AWS Fargate instead of customer-managed EC2 worker nodes. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/eks-cluster-creation": {
    "summary": "EKS cluster creation configures the control plane, networking, IAM access and compute capacity needed for workloads.",
    "diagram": {
      "title": "EKS Cluster Creation EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "EKS cluster creation configures the control plane, networking, IAM access and compute capacity needed for workloads.",
          "This capability is important because eks cluster creation connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use EKS Cluster Creation when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EKS cluster creation configures the control plane, networking, IAM access and compute capacity needed for workloads. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EKS Cluster Creation in an EKS DevOps environment.",
        "answer": "EKS cluster creation configures the control plane, networking, IAM access and compute capacity needed for workloads. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/eksctl": {
    "summary": "eksctl is a command-line tool that creates and manages EKS clusters and related AWS resources through declarative configuration.",
    "diagram": {
      "title": "eksctl EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "eksctl is a command-line tool that creates and manages EKS clusters and related AWS resources through declarative configuration.",
          "This capability is important because eksctl connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use eksctl when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\neksctl get cluster\n eksctl get nodegroup --cluster YOUR_CLUSTER",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "eksctl is a command-line tool that creates and manages EKS clusters and related AWS resources through declarative configuration. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain eksctl in an EKS DevOps environment.",
        "answer": "eksctl is a command-line tool that creates and manages EKS clusters and related AWS resources through declarative configuration. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/aws-cli-for-eks": {
    "summary": "AWS CLI commands inspect and manage EKS clusters, node groups, add-ons and cluster access configuration.",
    "diagram": {
      "title": "AWS CLI for EKS EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "AWS CLI commands inspect and manage EKS clusters, node groups, add-ons and cluster access configuration.",
          "This capability is important because aws cli for eks connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use AWS CLI for EKS when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\naws eks list-clusters\naws eks describe-cluster --name YOUR_CLUSTER --query 'cluster.{status:status,version:version,endpoint:endpoint}'",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "AWS CLI commands inspect and manage EKS clusters, node groups, add-ons and cluster access configuration. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain AWS CLI for EKS in an EKS DevOps environment.",
        "answer": "AWS CLI commands inspect and manage EKS clusters, node groups, add-ons and cluster access configuration. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/cluster-endpoint-access": {
    "summary": "EKS endpoint access controls whether the Kubernetes API endpoint is reachable publicly, privately or through both paths.",
    "diagram": {
      "title": "Cluster Endpoint Access EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "EKS endpoint access controls whether the Kubernetes API endpoint is reachable publicly, privately or through both paths.",
          "This capability is important because cluster endpoint access connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Cluster Endpoint Access when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\naws eks describe-cluster --name YOUR_CLUSTER --query 'cluster.resourcesVpcConfig.{public:endpointPublicAccess,private:endpointPrivateAccess,subnets:subnetIds}'",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EKS endpoint access controls whether the Kubernetes API endpoint is reachable publicly, privately or through both paths. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Cluster Endpoint Access in an EKS DevOps environment.",
        "answer": "EKS endpoint access controls whether the Kubernetes API endpoint is reachable publicly, privately or through both paths. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/iam-authentication": {
    "summary": "EKS integrates IAM identities with Kubernetes authentication so AWS principals can obtain access to the Kubernetes API.",
    "diagram": {
      "title": "IAM Authentication EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "EKS integrates IAM identities with Kubernetes authentication so AWS principals can obtain access to the Kubernetes API.",
          "This capability is important because iam authentication connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use IAM Authentication when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\naws sts get-caller-identity\nkubectl auth can-i get pods -A",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EKS integrates IAM identities with Kubernetes authentication so AWS principals can obtain access to the Kubernetes API. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain IAM Authentication in an EKS DevOps environment.",
        "answer": "EKS integrates IAM identities with Kubernetes authentication so AWS principals can obtain access to the Kubernetes API. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/eks-access-entries": {
    "summary": "EKS access entries associate IAM principals with cluster access and Kubernetes or EKS access policies.",
    "diagram": {
      "title": "EKS Access Entries EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "EKS access entries associate IAM principals with cluster access and Kubernetes or EKS access policies.",
          "This capability is important because eks access entries connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use EKS Access Entries when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\naws eks list-access-entries --cluster-name YOUR_CLUSTER\naws eks list-associated-access-policies --cluster-name YOUR_CLUSTER --principal-arn YOUR_ROLE_ARN",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EKS access entries associate IAM principals with cluster access and Kubernetes or EKS access policies. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EKS Access Entries in an EKS DevOps environment.",
        "answer": "EKS access entries associate IAM principals with cluster access and Kubernetes or EKS access policies. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/oidc-provider": {
    "summary": "An EKS OIDC identity provider enables Kubernetes ServiceAccount tokens to be trusted by AWS IAM for workload identity integrations.",
    "diagram": {
      "title": "OIDC Provider EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "An EKS OIDC identity provider enables Kubernetes ServiceAccount tokens to be trusted by AWS IAM for workload identity integrations.",
          "This capability is important because oidc provider connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use OIDC Provider when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\naws eks describe-cluster --name YOUR_CLUSTER --query 'cluster.identity.oidc.issuer'",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "An EKS OIDC identity provider enables Kubernetes ServiceAccount tokens to be trusted by AWS IAM for workload identity integrations. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain OIDC Provider in an EKS DevOps environment.",
        "answer": "An EKS OIDC identity provider enables Kubernetes ServiceAccount tokens to be trusted by AWS IAM for workload identity integrations. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/irsa": {
    "summary": "IAM Roles for Service Accounts lets Kubernetes workloads assume dedicated IAM roles through OIDC federation.",
    "diagram": {
      "title": "IRSA EKS workflow",
      "nodes": [
        "Pod ServiceAccount token",
        "OIDC provider",
        "IAM role trust policy",
        "temporary STS credentials",
        "AWS API"
      ],
      "explanation": "Pod ServiceAccount token → OIDC provider → IAM role trust policy → temporary STS credentials → AWS API. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "IAM Roles for Service Accounts lets Kubernetes workloads assume dedicated IAM roles through OIDC federation.",
          "This capability is important because irsa connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use IRSA when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Pod ServiceAccount token → OIDC provider → IAM role trust policy → temporary STS credentials → AWS API. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl describe serviceaccount YOUR_SERVICE_ACCOUNT -n YOUR_NAMESPACE\naws sts get-caller-identity",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "IAM Roles for Service Accounts lets Kubernetes workloads assume dedicated IAM roles through OIDC federation. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain IRSA in an EKS DevOps environment.",
        "answer": "IAM Roles for Service Accounts lets Kubernetes workloads assume dedicated IAM roles through OIDC federation. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/eks-pod-identity": {
    "summary": "EKS Pod Identity associates IAM roles with Kubernetes ServiceAccounts through the EKS Pod Identity Agent and service integration.",
    "diagram": {
      "title": "EKS Pod Identity EKS workflow",
      "nodes": [
        "Pod ServiceAccount",
        "Pod Identity Agent",
        "EKS Auth API",
        "IAM role credentials",
        "AWS service"
      ],
      "explanation": "Pod ServiceAccount → Pod Identity Agent → EKS Auth API → IAM role credentials → AWS service. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "EKS Pod Identity associates IAM roles with Kubernetes ServiceAccounts through the EKS Pod Identity Agent and service integration.",
          "This capability is important because eks pod identity connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use EKS Pod Identity when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Pod ServiceAccount → Pod Identity Agent → EKS Auth API → IAM role credentials → AWS service. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get pods -n kube-system -l app.kubernetes.io/name=eks-pod-identity-agent\naws eks list-pod-identity-associations --cluster-name YOUR_CLUSTER",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EKS Pod Identity associates IAM roles with Kubernetes ServiceAccounts through the EKS Pod Identity Agent and service integration. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EKS Pod Identity in an EKS DevOps environment.",
        "answer": "EKS Pod Identity associates IAM roles with Kubernetes ServiceAccounts through the EKS Pod Identity Agent and service integration. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/vpc-cni": {
    "summary": "The Amazon VPC CNI plugin assigns VPC IP addresses to Kubernetes Pods and configures node networking.",
    "diagram": {
      "title": "VPC CNI EKS workflow",
      "nodes": [
        "Pod sandbox request",
        "CNI plugin",
        "IP address allocation",
        "ENI/IP configuration",
        "Pod network"
      ],
      "explanation": "Pod sandbox request → CNI plugin → IP address allocation → ENI/IP configuration → Pod network. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The Amazon VPC CNI plugin assigns VPC IP addresses to Kubernetes Pods and configures node networking.",
          "This capability is important because vpc cni connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use VPC CNI when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Pod sandbox request → CNI plugin → IP address allocation → ENI/IP configuration → Pod network. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl -n kube-system get pods -l k8s-app=aws-node\nkubectl -n kube-system logs ds/aws-node --tail=100",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The Amazon VPC CNI plugin assigns VPC IP addresses to Kubernetes Pods and configures node networking. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain VPC CNI in an EKS DevOps environment.",
        "answer": "The Amazon VPC CNI plugin assigns VPC IP addresses to Kubernetes Pods and configures node networking. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/coredns-add-on": {
    "summary": "The CoreDNS add-on provides DNS resolution for Kubernetes Services and cluster domains.",
    "diagram": {
      "title": "CoreDNS Add-on EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The CoreDNS add-on provides DNS resolution for Kubernetes Services and cluster domains.",
          "This capability is important because coredns add-on connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use CoreDNS Add-on when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl -n kube-system get deployment coredns\nkubectl -n kube-system logs deployment/coredns --tail=100",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The CoreDNS add-on provides DNS resolution for Kubernetes Services and cluster domains. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain CoreDNS Add-on in an EKS DevOps environment.",
        "answer": "The CoreDNS add-on provides DNS resolution for Kubernetes Services and cluster domains. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/kube-proxy-add-on": {
    "summary": "The kube-proxy add-on configures node networking rules that implement Kubernetes Service traffic forwarding.",
    "diagram": {
      "title": "kube-proxy Add-on EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The kube-proxy add-on configures node networking rules that implement Kubernetes Service traffic forwarding.",
          "This capability is important because kube-proxy add-on connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use kube-proxy Add-on when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl -n kube-system get ds kube-proxy\nkubectl -n kube-system get pods -l k8s-app=kube-proxy",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The kube-proxy add-on configures node networking rules that implement Kubernetes Service traffic forwarding. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain kube-proxy Add-on in an EKS DevOps environment.",
        "answer": "The kube-proxy add-on configures node networking rules that implement Kubernetes Service traffic forwarding. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/ebs-csi-driver": {
    "summary": "The EBS CSI driver provisions and attaches Amazon EBS volumes for Kubernetes persistent storage.",
    "diagram": {
      "title": "EBS CSI Driver EKS workflow",
      "nodes": [
        "PVC",
        "StorageClass",
        "CSI controller",
        "EBS volume",
        "node attach and mount",
        "Pod"
      ],
      "explanation": "PVC → StorageClass → CSI controller → EBS volume → node attach and mount → Pod. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The EBS CSI driver provisions and attaches Amazon EBS volumes for Kubernetes persistent storage.",
          "This capability is important because ebs csi driver connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use EBS CSI Driver when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "PVC → StorageClass → CSI controller → EBS volume → node attach and mount → Pod. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get csidrivers\nkubectl get pods -n kube-system -l app=ebs-csi-controller",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The EBS CSI driver provisions and attaches Amazon EBS volumes for Kubernetes persistent storage. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EBS CSI Driver in an EKS DevOps environment.",
        "answer": "The EBS CSI driver provisions and attaches Amazon EBS volumes for Kubernetes persistent storage. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/efs-csi-driver": {
    "summary": "The EFS CSI driver lets Kubernetes Pods mount shared Amazon EFS file systems.",
    "diagram": {
      "title": "EFS CSI Driver EKS workflow",
      "nodes": [
        "PVC / static PV",
        "EFS CSI driver",
        "EFS mount target",
        "NFS mount",
        "Pod"
      ],
      "explanation": "PVC / static PV → EFS CSI driver → EFS mount target → NFS mount → Pod. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The EFS CSI driver lets Kubernetes Pods mount shared Amazon EFS file systems.",
          "This capability is important because efs csi driver connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use EFS CSI Driver when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "PVC / static PV → EFS CSI driver → EFS mount target → NFS mount → Pod. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get csidrivers\nkubectl get pods -n kube-system | grep efs",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The EFS CSI driver lets Kubernetes Pods mount shared Amazon EFS file systems. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EFS CSI Driver in an EKS DevOps environment.",
        "answer": "The EFS CSI driver lets Kubernetes Pods mount shared Amazon EFS file systems. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/load-balancer-controller": {
    "summary": "The AWS Load Balancer Controller watches Kubernetes resources and provisions AWS load balancers for ingress and service traffic.",
    "diagram": {
      "title": "Load Balancer Controller EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The AWS Load Balancer Controller watches Kubernetes resources and provisions AWS load balancers for ingress and service traffic.",
          "This capability is important because load balancer controller connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Load Balancer Controller when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The AWS Load Balancer Controller watches Kubernetes resources and provisions AWS load balancers for ingress and service traffic. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Load Balancer Controller in an EKS DevOps environment.",
        "answer": "The AWS Load Balancer Controller watches Kubernetes resources and provisions AWS load balancers for ingress and service traffic. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/aws-load-balancer-controller": {
    "summary": "The AWS Load Balancer Controller maps Kubernetes Ingress and Service resources to ALB and NLB resources in AWS.",
    "diagram": {
      "title": "AWS Load Balancer Controller EKS workflow",
      "nodes": [
        "Ingress / Service",
        "controller reconciliation",
        "ALB/NLB provisioning",
        "target group",
        "Pod endpoints"
      ],
      "explanation": "Ingress / Service → controller reconciliation → ALB/NLB provisioning → target group → Pod endpoints. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The AWS Load Balancer Controller maps Kubernetes Ingress and Service resources to ALB and NLB resources in AWS.",
          "This capability is important because aws load balancer controller connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use AWS Load Balancer Controller when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ingress / Service → controller reconciliation → ALB/NLB provisioning → target group → Pod endpoints. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get deployment -n kube-system aws-load-balancer-controller\nkubectl logs deployment/aws-load-balancer-controller -n kube-system --tail=100",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The AWS Load Balancer Controller maps Kubernetes Ingress and Service resources to ALB and NLB resources in AWS. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain AWS Load Balancer Controller in an EKS DevOps environment.",
        "answer": "The AWS Load Balancer Controller maps Kubernetes Ingress and Service resources to ALB and NLB resources in AWS. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/eks-networking": {
    "summary": "EKS networking combines VPC subnets, security groups, CNI IP allocation, routes and load-balancer paths for Pods and Services.",
    "diagram": {
      "title": "EKS Networking EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "EKS networking combines VPC subnets, security groups, CNI IP allocation, routes and load-balancer paths for Pods and Services.",
          "This capability is important because eks networking connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use EKS Networking when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A -o wide\nkubectl -n kube-system get pods -l k8s-app=aws-node",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EKS networking combines VPC subnets, security groups, CNI IP allocation, routes and load-balancer paths for Pods and Services. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EKS Networking in an EKS DevOps environment.",
        "answer": "EKS networking combines VPC subnets, security groups, CNI IP allocation, routes and load-balancer paths for Pods and Services. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/security-groups-for-pods": {
    "summary": "Security Groups for Pods applies selected VPC security groups to Pod network interfaces for finer-grained network access control.",
    "diagram": {
      "title": "Security Groups for Pods EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Security Groups for Pods applies selected VPC security groups to Pod network interfaces for finer-grained network access control.",
          "This capability is important because security groups for pods connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Security Groups for Pods when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Security Groups for Pods applies selected VPC security groups to Pod network interfaces for finer-grained network access control. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Security Groups for Pods in an EKS DevOps environment.",
        "answer": "Security Groups for Pods applies selected VPC security groups to Pod network interfaces for finer-grained network access control. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/secrets-store-csi-driver": {
    "summary": "The Secrets Store CSI Driver mounts secrets from external providers into Pods through CSI volumes, often integrating with AWS Secrets Manager or Parameter Store.",
    "diagram": {
      "title": "Secrets Store CSI Driver EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The Secrets Store CSI Driver mounts secrets from external providers into Pods through CSI volumes, often integrating with AWS Secrets Manager or Parameter Store.",
          "This capability is important because secrets store csi driver connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Secrets Store CSI Driver when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The Secrets Store CSI Driver mounts secrets from external providers into Pods through CSI volumes, often integrating with AWS Secrets Manager or Parameter Store. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Secrets Store CSI Driver in an EKS DevOps environment.",
        "answer": "The Secrets Store CSI Driver mounts secrets from external providers into Pods through CSI volumes, often integrating with AWS Secrets Manager or Parameter Store. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/cluster-autoscaler": {
    "summary": "Cluster Autoscaler adjusts node group size when Pods cannot be scheduled or nodes are underutilized.",
    "diagram": {
      "title": "Cluster Autoscaler EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Cluster Autoscaler adjusts node group size when Pods cannot be scheduled or nodes are underutilized.",
          "This capability is important because cluster autoscaler connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Cluster Autoscaler when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get deployment -n kube-system cluster-autoscaler\nkubectl logs deployment/cluster-autoscaler -n kube-system --tail=100",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Cluster Autoscaler adjusts node group size when Pods cannot be scheduled or nodes are underutilized. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Cluster Autoscaler in an EKS DevOps environment.",
        "answer": "Cluster Autoscaler adjusts node group size when Pods cannot be scheduled or nodes are underutilized. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/karpenter": {
    "summary": "Karpenter provisions and consolidates Kubernetes worker nodes based on pending Pod requirements and configured NodePools.",
    "diagram": {
      "title": "Karpenter EKS workflow",
      "nodes": [
        "Pending Pods",
        "scheduler constraints",
        "Karpenter NodePool selection",
        "EC2 instance launch",
        "Pod scheduling"
      ],
      "explanation": "Pending Pods → scheduler constraints → Karpenter NodePool selection → EC2 instance launch → Pod scheduling. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Karpenter provisions and consolidates Kubernetes worker nodes based on pending Pod requirements and configured NodePools.",
          "This capability is important because karpenter connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Karpenter when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Pending Pods → scheduler constraints → Karpenter NodePool selection → EC2 instance launch → Pod scheduling. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodepools,nodeclaims\nkubectl logs -n kube-system deployment/karpenter --tail=100",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Karpenter provisions and consolidates Kubernetes worker nodes based on pending Pod requirements and configured NodePools. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Karpenter in an EKS DevOps environment.",
        "answer": "Karpenter provisions and consolidates Kubernetes worker nodes based on pending Pod requirements and configured NodePools. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/eks-upgrade": {
    "summary": "EKS upgrades move Kubernetes control plane, nodes and add-ons through supported versions with compatibility validation.",
    "diagram": {
      "title": "EKS Upgrade EKS workflow",
      "nodes": [
        "version compatibility review",
        "control plane upgrade",
        "add-on upgrade",
        "node group rollout",
        "workload validation"
      ],
      "explanation": "version compatibility review → control plane upgrade → add-on upgrade → node group rollout → workload validation. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "EKS upgrades move Kubernetes control plane, nodes and add-ons through supported versions with compatibility validation.",
          "This capability is important because eks upgrade connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use EKS Upgrade when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "version compatibility review → control plane upgrade → add-on upgrade → node group rollout → workload validation. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\naws eks describe-cluster --name YOUR_CLUSTER --query 'cluster.version'\nkubectl get nodes -o wide\naws eks describe-addon-versions",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EKS upgrades move Kubernetes control plane, nodes and add-ons through supported versions with compatibility validation. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EKS Upgrade in an EKS DevOps environment.",
        "answer": "EKS upgrades move Kubernetes control plane, nodes and add-ons through supported versions with compatibility validation. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/cluster-autoscaling": {
    "summary": "Cluster autoscaling adjusts cluster compute capacity in response to workload scheduling demand and node utilization.",
    "diagram": {
      "title": "Cluster Autoscaling EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Cluster autoscaling adjusts cluster compute capacity in response to workload scheduling demand and node utilization.",
          "This capability is important because cluster autoscaling connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Cluster Autoscaling when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Cluster autoscaling adjusts cluster compute capacity in response to workload scheduling demand and node utilization. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Cluster Autoscaling in an EKS DevOps environment.",
        "answer": "Cluster autoscaling adjusts cluster compute capacity in response to workload scheduling demand and node utilization. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/eks-logging-and-monitoring": {
    "summary": "EKS logging and monitoring collect control-plane, node, workload and AWS service telemetry for operations and incident response.",
    "diagram": {
      "title": "EKS Logging and Monitoring EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "EKS logging and monitoring collect control-plane, node, workload and AWS service telemetry for operations and incident response.",
          "This capability is important because eks logging and monitoring connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use EKS Logging and Monitoring when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EKS logging and monitoring collect control-plane, node, workload and AWS service telemetry for operations and incident response. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EKS Logging and Monitoring in an EKS DevOps environment.",
        "answer": "EKS logging and monitoring collect control-plane, node, workload and AWS service telemetry for operations and incident response. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/eks-backup-and-recovery": {
    "summary": "EKS backup and recovery protects Kubernetes resource definitions and persistent application data for restoration after failure.",
    "diagram": {
      "title": "EKS Backup and Recovery EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "EKS backup and recovery protects Kubernetes resource definitions and persistent application data for restoration after failure.",
          "This capability is important because eks backup and recovery connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use EKS Backup and Recovery when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EKS backup and recovery protects Kubernetes resource definitions and persistent application data for restoration after failure. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EKS Backup and Recovery in an EKS DevOps environment.",
        "answer": "EKS backup and recovery protects Kubernetes resource definitions and persistent application data for restoration after failure. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/eks-security": {
    "summary": "EKS security combines IAM access, Kubernetes RBAC, network isolation, image security, secrets protection and node hardening.",
    "diagram": {
      "title": "EKS Security EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "EKS security combines IAM access, Kubernetes RBAC, network isolation, image security, secrets protection and node hardening.",
          "This capability is important because eks security connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use EKS Security when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EKS security combines IAM access, Kubernetes RBAC, network isolation, image security, secrets protection and node hardening. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EKS Security in an EKS DevOps environment.",
        "answer": "EKS security combines IAM access, Kubernetes RBAC, network isolation, image security, secrets protection and node hardening. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  },
  "eks/eks-troubleshooting": {
    "summary": "EKS troubleshooting checks cluster endpoint access, IAM authentication, node health, CNI networking, add-ons, storage and workload events.",
    "diagram": {
      "title": "EKS Troubleshooting EKS workflow",
      "nodes": [
        "EKS control plane / AWS API",
        "IAM and VPC configuration",
        "node or Fargate capacity",
        "Kubernetes workload"
      ],
      "explanation": "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. EKS spans AWS control-plane services and customer VPC resources; validate IAM, networking and Kubernetes state as separate layers."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "EKS troubleshooting checks cluster endpoint access, IAM authentication, node health, CNI networking, add-ons, storage and workload events.",
          "This capability is important because eks troubleshooting connects Kubernetes operations with AWS infrastructure and identity. A working cluster depends on both Kubernetes resource state and AWS-side permissions, network configuration and service integrations."
        ],
        "bullets": [
          "Separate AWS IAM authorization from Kubernetes RBAC authorization.",
          "Check Region, cluster name, VPC and account before changes.",
          "Validate add-on and Kubernetes version compatibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use EKS Troubleshooting when operating production or non-production workloads on Amazon EKS. A practical workflow uses AWS IAM for controlled cluster access, VPC networking for Pod connectivity, managed add-ons for integrations and Kubernetes controllers for application state.",
          "For production, use private endpoints where appropriate, multiple AZs, tested node replacement and staged cluster upgrades."
        ],
        "bullets": [
          "Development: test cluster changes in a disposable environment.",
          "CI/CD: use short-lived IAM roles and context verification.",
          "Production: use least privilege, monitoring, backups and staged rollouts."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "EKS control plane / AWS API → IAM and VPC configuration → node or Fargate capacity → Kubernetes workload. AWS and Kubernetes components exchange control and data-plane information. IAM identity, VPC routing, security groups and add-on health can each independently affect the outcome.",
          "Do not assume that a healthy EKS control plane means workloads are healthy; inspect nodes, CNI, DNS, CSI, load balancers and application Pods."
        ],
        "bullets": [
          "AWS layer: account, IAM, VPC, subnets and managed services.",
          "Kubernetes layer: API resources, RBAC, scheduler and controllers.",
          "Node layer: kubelet, container runtime, CNI and CSI components.",
          "Application layer: Pods, Services, probes and logs."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run read-only discovery commands against the intended AWS account and cluster. Confirm AWS identity and kubectl context before making changes. Replace placeholders with your cluster, role and namespace."
        ],
        "code": "aws sts get-caller-identity\nkubectl config current-context\naws eks describe-cluster --name YOUR_CLUSTER\nkubectl get nodes -o wide\nkubectl get pods -A\nkubectl get events -A --sort-by=.lastTimestamp",
        "note": "Do not expose kubeconfig credentials, secret values or private endpoints in public logs. Avoid broad IAM policies and public API access unless the architecture requires it."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use managed node groups or a documented self-managed strategy, private networking where suitable, least-privilege IAM and Kubernetes RBAC, and supported add-on versions. Monitor cluster capacity, IP availability, node health and control-plane events.",
          "Back up persistent application data and critical configuration. Test cluster upgrade, node replacement and disaster-recovery procedures before relying on them."
        ],
        "bullets": [
          "Use multiple Availability Zones and adequate subnet IP capacity.",
          "Prefer EKS access entries or supported identity integration patterns.",
          "Use IRSA or EKS Pod Identity rather than static AWS keys in Pods.",
          "Pin and validate add-on versions against the Kubernetes version.",
          "Test node drain, PDB behavior and application recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start by verifying AWS account, Region, cluster status and kubectl context. If kubectl cannot connect, inspect endpoint access, network route, DNS and IAM authentication. If nodes or Pods fail, inspect kubelet, CNI, CoreDNS, CSI and controller logs.",
          "For pending Pods, inspect scheduling events, resource requests, taints and available IPs. For load-balancer or storage failures, inspect controller logs and AWS resource events."
        ],
        "bullets": [
          "Unauthorized: verify IAM principal, access entry and Kubernetes RBAC.",
          "API timeout: inspect endpoint mode, VPN/bastion path, security groups and DNS.",
          "Node NotReady: inspect node conditions, kubelet, runtime and VPC CNI.",
          "Pod IP failures: check subnet free IPs, ENI limits and aws-node logs.",
          "PVC Pending: inspect StorageClass, CSI controller and IAM permissions."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EKS troubleshooting checks cluster endpoint access, IAM authentication, node health, CNI networking, add-ons, storage and workload events. In production, I would secure the AWS and Kubernetes access layers separately, validate VPC and add-on dependencies, monitor node and workload health, and upgrade in controlled stages."
        ],
        "bullets": [
          "Explain EKS control plane versus worker data plane.",
          "Describe IAM authentication, access entries and workload identity.",
          "Explain VPC CNI, CSI and load-balancer controller responsibilities."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EKS Troubleshooting in an EKS DevOps environment.",
        "answer": "EKS troubleshooting checks cluster endpoint access, IAM authentication, node health, CNI networking, add-ons, storage and workload events. I would validate the AWS-side prerequisites and Kubernetes resources, apply least-privilege identity, test in a non-production cluster and monitor the resulting workload or integration health."
      },
      {
        "question": "How do you troubleshoot an EKS workload that cannot start or connect?",
        "answer": "Confirm AWS identity, Region and kubectl context. Inspect Pod events, node conditions and logs; check IAM access, VPC CNI IP availability, subnet routes and security groups, then verify CoreDNS, CSI and load-balancer components depending on the symptom. Fix the first failing dependency and verify recovery."
      }
    ],
    "handsOn": [
      "Connect to a non-production EKS cluster and record AWS identity, cluster version and kubectl context.",
      "Inspect nodes, kube-system add-ons, Pod IPs and recent events.",
      "Reproduce a safe issue in a lab, such as an incorrect Service selector or missing test permission, and diagnose it using the relevant commands.",
      "Write an EKS runbook that separates AWS IAM, VPC, node, add-on and workload checks."
    ]
  }
};
