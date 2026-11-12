export type ArchitectureSection = {
  title: string;
  explanation: string;
  responsibilities: string[];
  implementation: string[];
  productionConsiderations: string[];
  failureModes: string[];
  practicalTask: string;
};

export type ArchitectureTopicContent = {
  title: string;
  subtitle: string;
  summary: string;
  objectives: string[];
  diagram: string[];
  sections: ArchitectureSection[];
  architectureDecisions: { decision: string; guidance: string }[];
  interviewQuestions: { question: string; answer: string }[];
};

export const architectureTopicContent: Record<string, ArchitectureTopicContent> = {
  "aws-architecture": {
    "architectureDecisions": [
      {
        "guidance": ". Keep unrelated responsibilities separate and document every cross-boundary dependency.",
        "decision": "Where should the responsibility boundary for AWS Architecture be placed?"
      },
      {
        "guidance": ": retry only safe operations, replace unhealthy capacity, fail over only when data and dependencies are ready, and preserve diagnostic evidence.",
        "decision": "How should the architecture handle failure?"
      },
      {
        "guidance": ", capacity tests, recovery exercises and operational ownership. .",
        "decision": "How will production readiness be demonstrated?"
      }
    ],
    "interviewQuestions": [
      {
        "question": "Explain the architecture and purpose of AWS Architecture.",
        "answer": "A practical AWS reference architecture covering global entry, network isolation, compute, data, identity, observability and recovery. The main components include Route 53, CloudFront, AWS WAF, VPC, public and private subnets, ALB, EC2, Auto Scaling, RDS, S3, IAM, CloudWatch. The request or operational flow is Users -> Route 53 -> CloudFront/WAF -> ALB -> Private EC2/ECS/EKS -> Data Services -> Monitoring. A production implementation must also address AWS account boundaries, regional infrastructure, VPC routing, managed services, identity boundaries and workload placement."
      },
      {
        "question": "What are the most important production failure scenarios in AWS Architecture?",
        "answer": "A regional service disruption, incorrect route, exhausted subnet CIDR, unhealthy target group, IAM denial or database connection saturation can interrupt different layers of the workload. I would isolate the affected layer, verify its configuration and permissions, inspect the relevant logs and metrics, and validate the complete dependency path before applying a recovery action."
      },
      {
        "question": "How would you secure and operate AWS Architecture in production?",
        "answer": "Use multi-AZ placement, least-privilege IAM roles, encryption, private data tiers, tested backups, service quotas, budgets and infrastructure-as-code reviews. I would additionally define ownership, alert thresholds, change review, recovery procedures and repeatable validation so that the architecture remains supportable after deployment."
      }
    ],
    "subtitle": "Designing secure, scalable and resilient workloads on Amazon Web Services",
    "title": "AWS Architecture",
    "diagram": [
      "Users -> Route 53 -> CloudFront/WAF -> ALB -> Private EC2/ECS/EKS -> Data Services -> Monitoring"
    ],
    "objectives": [
      "Explain the purpose and boundaries of AWS Architecture.",
      "Identify the architecture components: Route 53, CloudFront, AWS WAF, VPC, public and private subnets, ALB, EC2, Auto Scaling, RDS, S3, IAM, CloudWatch.",
      "Trace the architecture flow: Users -> Route 53 -> CloudFront/WAF -> ALB -> Private EC2/ECS/EKS -> Data Services -> Monitoring.",
      "Implement, secure and troubleshoot the design using production evidence."
    ],
    "sections": [
      {
        "implementation": [
          "Create an account and VPC design, define subnet tiers across availability zones, configure routing and security groups, deploy an application tier, attach managed data services and enable CloudWatch telemetry.",
          "Record the configuration, dependency and validation evidence in version control so that another engineer can reproduce the design."
        ],
        "title": "AWS account, region and workload boundaries",
        "productionConsiderations": [
          "Measure the service behavior at this layer instead of assuming that a healthy resource means the complete application is healthy.",
          "Review capacity, permissions, dependency limits and operational ownership before production rollout."
        ],
        "explanation": "A practical AWS reference architecture covering global entry, network isolation, compute, data, identity, observability and recovery. This section examines AWS account boundaries, regional infrastructure, VPC routing, managed services, identity boundaries and workload placement. The design starts by identifying the exact responsibility of each boundary and the conditions under which traffic or control passes to the next component.",
        "failureModes": [
          "A regional service disruption, incorrect route, exhausted subnet CIDR, unhealthy target group, IAM denial or database connection saturation can interrupt different layers of the workload.",
          "A configuration change can affect this layer while leaving neighboring resources apparently healthy; validate the complete request or data path."
        ],
        "responsibilities": [
          "Define the ownership and purpose of Route 53, CloudFront, AWS WAF, VPC, public and private subnets, ALB, EC2, Auto Scaling, RDS, S3, IAM, CloudWatch.",
          ".",
          "Identify which team operates the component and which team owns its downstream dependency."
        ],
        "practicalTask": "Design a three-tier AWS application in two availability zones. Document every subnet, route, security boundary, IAM role, health check and recovery dependency."
      },
      {
        "implementation": [
          "Create an account and VPC design, define subnet tiers across availability zones, configure routing and security groups, deploy an application tier, attach managed data services and enable CloudWatch telemetry.",
          ", deployment or infrastructure operation and capture the resulting logs, metrics and configuration state."
        ],
        "title": "VPC network and application-tier placement",
        "productionConsiderations": [
          "Check both forward and return paths, including authentication, name resolution, timeouts and downstream capacity.",
          "Document the behavior during partial failure and define which component is responsible for retry or recovery."
        ],
        "explanation": "The central architecture path is: Users -> Route 53 -> CloudFront/WAF -> ALB -> Private EC2/ECS/EKS -> Data Services -> Monitoring. For this topic, the important engineering decision is AWS account boundaries, regional infrastructure, VPC routing, managed services, identity boundaries and workload placement. Follow the path hop by hop and identify the configuration or API responsible for each transition. Do not treat the diagram as a collection of disconnected boxes; each connection represents a dependency that must be configured and tested.",
        "failureModes": [
          "A regional service disruption, incorrect route, exhausted subnet CIDR, unhealthy target group, IAM denial or database connection saturation can interrupt different layers of the workload.",
          "A dependency may be reachable but still fail because of authorization, protocol, schema, capacity or readiness mismatch."
        ],
        "responsibilities": [
          "Explain how Route 53, CloudFront, AWS WAF, VPC, public and private subnets, ALB, EC2, Auto Scaling, RDS, S3, IAM, CloudWatch participate in the end-to-end path.",
          "Identify the control plane or configuration object that determines each transition.",
          "Specify the expected healthy behavior and the evidence that proves it."
        ],
        "practicalTask": " from its initiating component to the final destination. For every hop, record the configuration, health signal and one failure test."
      },
      {
        "implementation": [
          "Use multi-AZ placement, least-privilege IAM roles, encryption, private data tiers, tested backups, service quotas, budgets and infrastructure-as-code reviews.",
          "Create a repeatable validation procedure and retain the result with the architecture change record."
        ],
        "title": "Managed services, security and operational resilience",
        "productionConsiderations": [
          "Set service-level expectations for availability, latency, capacity and recovery.",
          "Test the failure scenarios before relying on redundancy or automated recovery.",
          "Review cost, service quotas, version compatibility and operational skill requirements."
        ],
        "explanation": "Production readiness for AWS Architecture depends on more than successful initial deployment. Use multi-AZ placement, least-privilege IAM roles, encryption, private data tiers, tested backups, service quotas, budgets and infrastructure-as-code reviews. The operational design must define measurable health, ownership, recovery order and evidence that the architecture behaves as intended under failure.",
        "failureModes": [
          "A regional service disruption, incorrect route, exhausted subnet CIDR, unhealthy target group, IAM denial or database connection saturation can interrupt different layers of the workload.",
          "A recovery procedure that has not been exercised may fail because of missing permissions, stale configuration or an unavailable dependency."
        ],
        "responsibilities": [
          "Define the security and operational boundaries for Route 53, CloudFront, AWS WAF, VPC, public and private subnets, ALB, EC2, Auto Scaling, RDS, S3, IAM, CloudWatch.",
          "Assign responsibility for monitoring, incident response, configuration changes and recovery.",
          "Document the assumptions that must remain true for the architecture to operate safely."
        ],
        "practicalTask": "Design a three-tier AWS application in two availability zones. Document every subnet, route, security boundary, IAM role, health check and recovery dependency."
      }
    ],
    "summary": "A practical AWS reference architecture covering global entry, network isolation, compute, data, identity, observability and recovery."
  },
  "azure-architecture": {
    "architectureDecisions": [
      {
        "guidance": ". Keep unrelated responsibilities separate and document every cross-boundary dependency.",
        "decision": "Where should the responsibility boundary for Azure Architecture be placed?"
      },
      {
        "guidance": ": retry only safe operations, replace unhealthy capacity, fail over only when data and dependencies are ready, and preserve diagnostic evidence.",
        "decision": "How should the architecture handle failure?"
      },
      {
        "guidance": ", capacity tests, recovery exercises and operational ownership. .",
        "decision": "How will production readiness be demonstrated?"
      }
    ],
    "interviewQuestions": [
      {
        "question": "Explain the architecture and purpose of Azure Architecture.",
        "answer": "An Azure design showing subscription governance, virtual networking, application ingress, compute, data and operational management. The main components include Management Groups, Subscriptions, Resource Groups, Azure Policy, VNet, NSG, Application Gateway, Front Door, App Service, Azure SQL, Key Vault, Monitor. The request or operational flow is Users -> Azure DNS/Front Door -> Application Gateway/WAF -> App Service/VMs -> Azure SQL/Storage -> Azure Monitor. A production implementation must also address Management group hierarchy, subscription isolation, resource groups, VNet peering, NSGs and managed identities."
      },
      {
        "question": "What are the most important production failure scenarios in Azure Architecture?",
        "answer": "Incorrect NSG rules, exhausted address spaces, broken private DNS, unhealthy application gateway probes, expired certificates or denied managed-identity access can break service paths. I would isolate the affected layer, verify its configuration and permissions, inspect the relevant logs and metrics, and validate the complete dependency path before applying a recovery action."
      },
      {
        "question": "How would you secure and operate Azure Architecture in production?",
        "answer": "Apply Azure Policy, Defender recommendations, private endpoints, zone-aware deployment, Key Vault rotation, Azure Backup and tested regional recovery. I would additionally define ownership, alert thresholds, change review, recovery procedures and repeatable validation so that the architecture remains supportable after deployment."
      }
    ],
    "subtitle": "Building enterprise workloads with Microsoft Azure services",
    "title": "Azure Architecture",
    "diagram": [
      "Users -> Azure DNS/Front Door -> Application Gateway/WAF -> App Service/VMs -> Azure SQL/Storage -> Azure Monitor"
    ],
    "objectives": [
      "Explain the purpose and boundaries of Azure Architecture.",
      "Identify the architecture components: Management Groups, Subscriptions, Resource Groups, Azure Policy, VNet, NSG, Application Gateway, Front Door, App Service, Azure SQL, Key Vault, Monitor.",
      "Trace the architecture flow: Users -> Azure DNS/Front Door -> Application Gateway/WAF -> App Service/VMs -> Azure SQL/Storage -> Azure Monitor.",
      "Implement, secure and troubleshoot the design using production evidence."
    ],
    "sections": [
      {
        "implementation": [
          "Establish management groups and subscriptions, apply Azure Policy, create VNets and subnet boundaries, deploy application ingress, use managed identities for service access and store secrets in Key Vault.",
          "Record the configuration, dependency and validation evidence in version control so that another engineer can reproduce the design."
        ],
        "title": "Tenant, management group and subscription design",
        "productionConsiderations": [
          "Measure the service behavior at this layer instead of assuming that a healthy resource means the complete application is healthy.",
          "Review capacity, permissions, dependency limits and operational ownership before production rollout."
        ],
        "explanation": "An Azure design showing subscription governance, virtual networking, application ingress, compute, data and operational management. This section examines Management group hierarchy, subscription isolation, resource groups, VNet peering, NSGs and managed identities. The design starts by identifying the exact responsibility of each boundary and the conditions under which traffic or control passes to the next component.",
        "failureModes": [
          "Incorrect NSG rules, exhausted address spaces, broken private DNS, unhealthy application gateway probes, expired certificates or denied managed-identity access can break service paths.",
          "A configuration change can affect this layer while leaving neighboring resources apparently healthy; validate the complete request or data path."
        ],
        "responsibilities": [
          "Define the ownership and purpose of Management Groups, Subscriptions, Resource Groups, Azure Policy, VNet, NSG, Application Gateway, Front Door, App Service, Azure SQL, Key Vault, Monitor.",
          ".",
          "Identify which team operates the component and which team owns its downstream dependency."
        ],
        "practicalTask": "Create a secure application design across separate production and non-production subscriptions with private data access and centralized monitoring."
      },
      {
        "implementation": [
          "Establish management groups and subscriptions, apply Azure Policy, create VNets and subnet boundaries, deploy application ingress, use managed identities for service access and store secrets in Key Vault.",
          ", deployment or infrastructure operation and capture the resulting logs, metrics and configuration state."
        ],
        "title": "VNet, ingress and workload connectivity",
        "productionConsiderations": [
          "Check both forward and return paths, including authentication, name resolution, timeouts and downstream capacity.",
          "Document the behavior during partial failure and define which component is responsible for retry or recovery."
        ],
        "explanation": "The central architecture path is: Users -> Azure DNS/Front Door -> Application Gateway/WAF -> App Service/VMs -> Azure SQL/Storage -> Azure Monitor. For this topic, the important engineering decision is Management group hierarchy, subscription isolation, resource groups, VNet peering, NSGs and managed identities. Follow the path hop by hop and identify the configuration or API responsible for each transition. Do not treat the diagram as a collection of disconnected boxes; each connection represents a dependency that must be configured and tested.",
        "failureModes": [
          "Incorrect NSG rules, exhausted address spaces, broken private DNS, unhealthy application gateway probes, expired certificates or denied managed-identity access can break service paths.",
          "A dependency may be reachable but still fail because of authorization, protocol, schema, capacity or readiness mismatch."
        ],
        "responsibilities": [
          "Explain how Management Groups, Subscriptions, Resource Groups, Azure Policy, VNet, NSG, Application Gateway, Front Door, App Service, Azure SQL, Key Vault, Monitor participate in the end-to-end path.",
          "Identify the control plane or configuration object that determines each transition.",
          "Specify the expected healthy behavior and the evidence that proves it."
        ],
        "practicalTask": " from its initiating component to the final destination. For every hop, record the configuration, health signal and one failure test."
      },
      {
        "implementation": [
          "Apply Azure Policy, Defender recommendations, private endpoints, zone-aware deployment, Key Vault rotation, Azure Backup and tested regional recovery.",
          "Create a repeatable validation procedure and retain the result with the architecture change record."
        ],
        "title": "Managed identity, governance and recovery",
        "productionConsiderations": [
          "Set service-level expectations for availability, latency, capacity and recovery.",
          "Test the failure scenarios before relying on redundancy or automated recovery.",
          "Review cost, service quotas, version compatibility and operational skill requirements."
        ],
        "explanation": "Production readiness for Azure Architecture depends on more than successful initial deployment. Apply Azure Policy, Defender recommendations, private endpoints, zone-aware deployment, Key Vault rotation, Azure Backup and tested regional recovery. The operational design must define measurable health, ownership, recovery order and evidence that the architecture behaves as intended under failure.",
        "failureModes": [
          "Incorrect NSG rules, exhausted address spaces, broken private DNS, unhealthy application gateway probes, expired certificates or denied managed-identity access can break service paths.",
          "A recovery procedure that has not been exercised may fail because of missing permissions, stale configuration or an unavailable dependency."
        ],
        "responsibilities": [
          "Define the security and operational boundaries for Management Groups, Subscriptions, Resource Groups, Azure Policy, VNet, NSG, Application Gateway, Front Door, App Service, Azure SQL, Key Vault, Monitor.",
          "Assign responsibility for monitoring, incident response, configuration changes and recovery.",
          "Document the assumptions that must remain true for the architecture to operate safely."
        ],
        "practicalTask": "Create a secure application design across separate production and non-production subscriptions with private data access and centralized monitoring."
      }
    ],
    "summary": "An Azure design showing subscription governance, virtual networking, application ingress, compute, data and operational management."
  },
  "gcp-architecture": {
    "architectureDecisions": [
      {
        "guidance": ". Keep unrelated responsibilities separate and document every cross-boundary dependency.",
        "decision": "Where should the responsibility boundary for GCP Architecture be placed?"
      },
      {
        "guidance": ": retry only safe operations, replace unhealthy capacity, fail over only when data and dependencies are ready, and preserve diagnostic evidence.",
        "decision": "How should the architecture handle failure?"
      },
      {
        "guidance": ", capacity tests, recovery exercises and operational ownership. .",
        "decision": "How will production readiness be demonstrated?"
      }
    ],
    "interviewQuestions": [
      {
        "question": "Explain the architecture and purpose of GCP Architecture.",
        "answer": "A Google Cloud architecture connecting organization governance, projects, global networking, compute, data and operations. The main components include Organization, folders, projects, IAM, VPC, firewall rules, Cloud Load Balancing, GKE, Cloud Run, Cloud SQL, Cloud Storage, Cloud Logging. The request or operational flow is Users -> Cloud DNS -> Cloud CDN/Load Balancing -> GKE/Cloud Run/Compute Engine -> Cloud SQL/Cloud Storage -> Cloud Monitoring. A production implementation must also address Organization and project boundaries, global VPC behavior, IAM roles, service accounts and managed compute choices."
      },
      {
        "question": "What are the most important production failure scenarios in GCP Architecture?",
        "answer": "Incorrect project IAM, firewall priority conflicts, service-account permission gaps, regional capacity limits or database connection exhaustion can affect workloads. I would isolate the affected layer, verify its configuration and permissions, inspect the relevant logs and metrics, and validate the complete dependency path before applying a recovery action."
      },
      {
        "question": "How would you secure and operate GCP Architecture in production?",
        "answer": "Use organization policies, workload identity, private connectivity, regional redundancy, audit logs, budgets and recovery testing. I would additionally define ownership, alert thresholds, change review, recovery procedures and repeatable validation so that the architecture remains supportable after deployment."
      }
    ],
    "subtitle": "Designing cloud-native systems on Google Cloud",
    "title": "GCP Architecture",
    "diagram": [
      "Users -> Cloud DNS -> Cloud CDN/Load Balancing -> GKE/Cloud Run/Compute Engine -> Cloud SQL/Cloud Storage -> Cloud Monitoring"
    ],
    "objectives": [
      "Explain the purpose and boundaries of GCP Architecture.",
      "Identify the architecture components: Organization, folders, projects, IAM, VPC, firewall rules, Cloud Load Balancing, GKE, Cloud Run, Cloud SQL, Cloud Storage, Cloud Logging.",
      "Trace the architecture flow: Users -> Cloud DNS -> Cloud CDN/Load Balancing -> GKE/Cloud Run/Compute Engine -> Cloud SQL/Cloud Storage -> Cloud Monitoring.",
      "Implement, secure and troubleshoot the design using production evidence."
    ],
    "sections": [
      {
        "implementation": [
          "Create organization folders and projects, configure shared VPC where needed, assign service accounts, deploy a regional or global load-balanced workload and connect managed data services.",
          "Record the configuration, dependency and validation evidence in version control so that another engineer can reproduce the design."
        ],
        "title": "Organization, folder and project hierarchy",
        "productionConsiderations": [
          "Measure the service behavior at this layer instead of assuming that a healthy resource means the complete application is healthy.",
          "Review capacity, permissions, dependency limits and operational ownership before production rollout."
        ],
        "explanation": "A Google Cloud architecture connecting organization governance, projects, global networking, compute, data and operations. This section examines Organization and project boundaries, global VPC behavior, IAM roles, service accounts and managed compute choices. The design starts by identifying the exact responsibility of each boundary and the conditions under which traffic or control passes to the next component.",
        "failureModes": [
          "Incorrect project IAM, firewall priority conflicts, service-account permission gaps, regional capacity limits or database connection exhaustion can affect workloads.",
          "A configuration change can affect this layer while leaving neighboring resources apparently healthy; validate the complete request or data path."
        ],
        "responsibilities": [
          "Define the ownership and purpose of Organization, folders, projects, IAM, VPC, firewall rules, Cloud Load Balancing, GKE, Cloud Run, Cloud SQL, Cloud Storage, Cloud Logging.",
          ".",
          "Identify which team operates the component and which team owns its downstream dependency."
        ],
        "practicalTask": "Design a multi-project application environment with shared networking, separate service identities and centralized audit visibility."
      },
      {
        "implementation": [
          "Create organization folders and projects, configure shared VPC where needed, assign service accounts, deploy a regional or global load-balanced workload and connect managed data services.",
          ", deployment or infrastructure operation and capture the resulting logs, metrics and configuration state."
        ],
        "title": "Global VPC and managed compute selection",
        "productionConsiderations": [
          "Check both forward and return paths, including authentication, name resolution, timeouts and downstream capacity.",
          "Document the behavior during partial failure and define which component is responsible for retry or recovery."
        ],
        "explanation": "The central architecture path is: Users -> Cloud DNS -> Cloud CDN/Load Balancing -> GKE/Cloud Run/Compute Engine -> Cloud SQL/Cloud Storage -> Cloud Monitoring. For this topic, the important engineering decision is Organization and project boundaries, global VPC behavior, IAM roles, service accounts and managed compute choices. Follow the path hop by hop and identify the configuration or API responsible for each transition. Do not treat the diagram as a collection of disconnected boxes; each connection represents a dependency that must be configured and tested.",
        "failureModes": [
          "Incorrect project IAM, firewall priority conflicts, service-account permission gaps, regional capacity limits or database connection exhaustion can affect workloads.",
          "A dependency may be reachable but still fail because of authorization, protocol, schema, capacity or readiness mismatch."
        ],
        "responsibilities": [
          "Explain how Organization, folders, projects, IAM, VPC, firewall rules, Cloud Load Balancing, GKE, Cloud Run, Cloud SQL, Cloud Storage, Cloud Logging participate in the end-to-end path.",
          "Identify the control plane or configuration object that determines each transition.",
          "Specify the expected healthy behavior and the evidence that proves it."
        ],
        "practicalTask": " from its initiating component to the final destination. For every hop, record the configuration, health signal and one failure test."
      },
      {
        "implementation": [
          "Use organization policies, workload identity, private connectivity, regional redundancy, audit logs, budgets and recovery testing.",
          "Create a repeatable validation procedure and retain the result with the architecture change record."
        ],
        "title": "Service identity, data protection and operations",
        "productionConsiderations": [
          "Set service-level expectations for availability, latency, capacity and recovery.",
          "Test the failure scenarios before relying on redundancy or automated recovery.",
          "Review cost, service quotas, version compatibility and operational skill requirements."
        ],
        "explanation": "Production readiness for GCP Architecture depends on more than successful initial deployment. Use organization policies, workload identity, private connectivity, regional redundancy, audit logs, budgets and recovery testing. The operational design must define measurable health, ownership, recovery order and evidence that the architecture behaves as intended under failure.",
        "failureModes": [
          "Incorrect project IAM, firewall priority conflicts, service-account permission gaps, regional capacity limits or database connection exhaustion can affect workloads.",
          "A recovery procedure that has not been exercised may fail because of missing permissions, stale configuration or an unavailable dependency."
        ],
        "responsibilities": [
          "Define the security and operational boundaries for Organization, folders, projects, IAM, VPC, firewall rules, Cloud Load Balancing, GKE, Cloud Run, Cloud SQL, Cloud Storage, Cloud Logging.",
          "Assign responsibility for monitoring, incident response, configuration changes and recovery.",
          "Document the assumptions that must remain true for the architecture to operate safely."
        ],
        "practicalTask": "Design a multi-project application environment with shared networking, separate service identities and centralized audit visibility."
      }
    ],
    "summary": "A Google Cloud architecture connecting organization governance, projects, global networking, compute, data and operations."
  },
  "hybrid-cloud": {
    "architectureDecisions": [
      {
        "guidance": ". Keep unrelated responsibilities separate and document every cross-boundary dependency.",
        "decision": "Where should the responsibility boundary for Hybrid Cloud be placed?"
      },
      {
        "guidance": ": retry only safe operations, replace unhealthy capacity, fail over only when data and dependencies are ready, and preserve diagnostic evidence.",
        "decision": "How should the architecture handle failure?"
      },
      {
        "guidance": ", capacity tests, recovery exercises and operational ownership. .",
        "decision": "How will production readiness be demonstrated?"
      }
    ],
    "interviewQuestions": [
      {
        "question": "Explain the architecture and purpose of Hybrid Cloud.",
        "answer": "A hybrid architecture that connects enterprise data centers to cloud networks while controlling routing, identity, DNS and workload dependencies. The main components include Data center routers, VPN, Direct Connect, ExpressRoute, transit gateway, cloud routes, private DNS, identity federation, firewalls, monitoring. The request or operational flow is On-Prem Users -> Data Center Network -> VPN/Direct Connect or ExpressRoute -> Cloud Gateway -> Cloud VPC/VNet -> Applications. A production implementation must also address Private connectivity, routing exchange, overlapping CIDRs, DNS forwarding, identity federation and dependency ownership."
      },
      {
        "question": "What are the most important production failure scenarios in Hybrid Cloud?",
        "answer": "Route asymmetry, overlapping address ranges, tunnel failure, MTU mismatch, DNS split-horizon errors or identity-provider outages can isolate dependent systems. I would isolate the affected layer, verify its configuration and permissions, inspect the relevant logs and metrics, and validate the complete dependency path before applying a recovery action."
      },
      {
        "question": "How would you secure and operate Hybrid Cloud in production?",
        "answer": "Use redundant links, route filtering, segmentation, certificate lifecycle management, tested failover and end-to-end latency monitoring. I would additionally define ownership, alert thresholds, change review, recovery procedures and repeatable validation so that the architecture remains supportable after deployment."
      }
    ],
    "subtitle": "Connecting on-premises infrastructure with cloud services",
    "title": "Hybrid Cloud",
    "diagram": [
      "On-Prem Users -> Data Center Network -> VPN/Direct Connect or ExpressRoute -> Cloud Gateway -> Cloud VPC/VNet -> Applications"
    ],
    "objectives": [
      "Explain the purpose and boundaries of Hybrid Cloud.",
      "Identify the architecture components: Data center routers, VPN, Direct Connect, ExpressRoute, transit gateway, cloud routes, private DNS, identity federation, firewalls, monitoring.",
      "Trace the architecture flow: On-Prem Users -> Data Center Network -> VPN/Direct Connect or ExpressRoute -> Cloud Gateway -> Cloud VPC/VNet -> Applications.",
      "Implement, secure and troubleshoot the design using production evidence."
    ],
    "sections": [
      {
        "implementation": [
          "Inventory on-premises networks, allocate non-overlapping cloud CIDRs, establish redundant connectivity, configure route propagation and DNS forwarding, then validate application and identity paths.",
          "Record the configuration, dependency and validation evidence in version control so that another engineer can reproduce the design."
        ],
        "title": "Connectivity topology and address planning",
        "productionConsiderations": [
          "Measure the service behavior at this layer instead of assuming that a healthy resource means the complete application is healthy.",
          "Review capacity, permissions, dependency limits and operational ownership before production rollout."
        ],
        "explanation": "A hybrid architecture that connects enterprise data centers to cloud networks while controlling routing, identity, DNS and workload dependencies. This section examines Private connectivity, routing exchange, overlapping CIDRs, DNS forwarding, identity federation and dependency ownership. The design starts by identifying the exact responsibility of each boundary and the conditions under which traffic or control passes to the next component.",
        "failureModes": [
          "Route asymmetry, overlapping address ranges, tunnel failure, MTU mismatch, DNS split-horizon errors or identity-provider outages can isolate dependent systems.",
          "A configuration change can affect this layer while leaving neighboring resources apparently healthy; validate the complete request or data path."
        ],
        "responsibilities": [
          "Define the ownership and purpose of Data center routers, VPN, Direct Connect, ExpressRoute, transit gateway, cloud routes, private DNS, identity federation, firewalls, monitoring.",
          ".",
          "Identify which team operates the component and which team owns its downstream dependency."
        ],
        "practicalTask": "Connect an on-premises application to a private cloud database and document routing, DNS, authentication and failover behavior."
      },
      {
        "implementation": [
          "Inventory on-premises networks, allocate non-overlapping cloud CIDRs, establish redundant connectivity, configure route propagation and DNS forwarding, then validate application and identity paths.",
          ", deployment or infrastructure operation and capture the resulting logs, metrics and configuration state."
        ],
        "title": "Routing, DNS and identity integration",
        "productionConsiderations": [
          "Check both forward and return paths, including authentication, name resolution, timeouts and downstream capacity.",
          "Document the behavior during partial failure and define which component is responsible for retry or recovery."
        ],
        "explanation": "The central architecture path is: On-Prem Users -> Data Center Network -> VPN/Direct Connect or ExpressRoute -> Cloud Gateway -> Cloud VPC/VNet -> Applications. For this topic, the important engineering decision is Private connectivity, routing exchange, overlapping CIDRs, DNS forwarding, identity federation and dependency ownership. Follow the path hop by hop and identify the configuration or API responsible for each transition. Do not treat the diagram as a collection of disconnected boxes; each connection represents a dependency that must be configured and tested.",
        "failureModes": [
          "Route asymmetry, overlapping address ranges, tunnel failure, MTU mismatch, DNS split-horizon errors or identity-provider outages can isolate dependent systems.",
          "A dependency may be reachable but still fail because of authorization, protocol, schema, capacity or readiness mismatch."
        ],
        "responsibilities": [
          "Explain how Data center routers, VPN, Direct Connect, ExpressRoute, transit gateway, cloud routes, private DNS, identity federation, firewalls, monitoring participate in the end-to-end path.",
          "Identify the control plane or configuration object that determines each transition.",
          "Specify the expected healthy behavior and the evidence that proves it."
        ],
        "practicalTask": " from its initiating component to the final destination. For every hop, record the configuration, health signal and one failure test."
      },
      {
        "implementation": [
          "Use redundant links, route filtering, segmentation, certificate lifecycle management, tested failover and end-to-end latency monitoring.",
          "Create a repeatable validation procedure and retain the result with the architecture change record."
        ],
        "title": "Hybrid failure domains and operational ownership",
        "productionConsiderations": [
          "Set service-level expectations for availability, latency, capacity and recovery.",
          "Test the failure scenarios before relying on redundancy or automated recovery.",
          "Review cost, service quotas, version compatibility and operational skill requirements."
        ],
        "explanation": "Production readiness for Hybrid Cloud depends on more than successful initial deployment. Use redundant links, route filtering, segmentation, certificate lifecycle management, tested failover and end-to-end latency monitoring. The operational design must define measurable health, ownership, recovery order and evidence that the architecture behaves as intended under failure.",
        "failureModes": [
          "Route asymmetry, overlapping address ranges, tunnel failure, MTU mismatch, DNS split-horizon errors or identity-provider outages can isolate dependent systems.",
          "A recovery procedure that has not been exercised may fail because of missing permissions, stale configuration or an unavailable dependency."
        ],
        "responsibilities": [
          "Define the security and operational boundaries for Data center routers, VPN, Direct Connect, ExpressRoute, transit gateway, cloud routes, private DNS, identity federation, firewalls, monitoring.",
          "Assign responsibility for monitoring, incident response, configuration changes and recovery.",
          "Document the assumptions that must remain true for the architecture to operate safely."
        ],
        "practicalTask": "Connect an on-premises application to a private cloud database and document routing, DNS, authentication and failover behavior."
      }
    ],
    "summary": "A hybrid architecture that connects enterprise data centers to cloud networks while controlling routing, identity, DNS and workload dependencies."
  },
  "multi-cloud": {
    "architectureDecisions": [
      {
        "guidance": ". Keep unrelated responsibilities separate and document every cross-boundary dependency.",
        "decision": "Where should the responsibility boundary for Multi-Cloud be placed?"
      },
      {
        "guidance": ": retry only safe operations, replace unhealthy capacity, fail over only when data and dependencies are ready, and preserve diagnostic evidence.",
        "decision": "How should the architecture handle failure?"
      },
      {
        "guidance": ", capacity tests, recovery exercises and operational ownership. .",
        "decision": "How will production readiness be demonstrated?"
      }
    ],
    "interviewQuestions": [
      {
        "question": "Explain the architecture and purpose of Multi-Cloud.",
        "answer": "A multi-cloud design that separates provider-specific services while managing identity, connectivity, portability, observability and recovery. The main components include Cloud accounts, landing zones, cloud networks, private connectivity, federation, Kubernetes, API gateways, DNS, telemetry and data replication. The request or operational flow is Global DNS -> Provider Edge -> AWS/Azure/GCP Workloads -> Replicated Data or Event Interfaces -> Central Operations. A production implementation must also address Provider boundaries, portability trade-offs, identity federation, cross-cloud latency, data gravity and service ownership."
      },
      {
        "question": "What are the most important production failure scenarios in Multi-Cloud?",
        "answer": "Cross-cloud DNS failure, incompatible IAM semantics, provider API limits, replication lag, egress cost spikes or inconsistent deployment policies can disrupt services. I would isolate the affected layer, verify its configuration and permissions, inspect the relevant logs and metrics, and validate the complete dependency path before applying a recovery action."
      },
      {
        "question": "How would you secure and operate Multi-Cloud in production?",
        "answer": "Keep failure domains independent, define provider-specific recovery plans, centralize audit evidence and measure egress, latency and replication lag. I would additionally define ownership, alert thresholds, change review, recovery procedures and repeatable validation so that the architecture remains supportable after deployment."
      }
    ],
    "subtitle": "Operating workloads across multiple cloud providers",
    "title": "Multi-Cloud",
    "diagram": [
      "Global DNS -> Provider Edge -> AWS/Azure/GCP Workloads -> Replicated Data or Event Interfaces -> Central Operations"
    ],
    "objectives": [
      "Explain the purpose and boundaries of Multi-Cloud.",
      "Identify the architecture components: Cloud accounts, landing zones, cloud networks, private connectivity, federation, Kubernetes, API gateways, DNS, telemetry and data replication.",
      "Trace the architecture flow: Global DNS -> Provider Edge -> AWS/Azure/GCP Workloads -> Replicated Data or Event Interfaces -> Central Operations.",
      "Implement, secure and troubleshoot the design using production evidence."
    ],
    "sections": [
      {
        "implementation": [
          "Define workload placement criteria, establish independent landing zones, federate identities, create private connectivity, standardize deployment interfaces and test data movement.",
          "Record the configuration, dependency and validation evidence in version control so that another engineer can reproduce the design."
        ],
        "title": "Workload placement and provider boundaries",
        "productionConsiderations": [
          "Measure the service behavior at this layer instead of assuming that a healthy resource means the complete application is healthy.",
          "Review capacity, permissions, dependency limits and operational ownership before production rollout."
        ],
        "explanation": "A multi-cloud design that separates provider-specific services while managing identity, connectivity, portability, observability and recovery. This section examines Provider boundaries, portability trade-offs, identity federation, cross-cloud latency, data gravity and service ownership. The design starts by identifying the exact responsibility of each boundary and the conditions under which traffic or control passes to the next component.",
        "failureModes": [
          "Cross-cloud DNS failure, incompatible IAM semantics, provider API limits, replication lag, egress cost spikes or inconsistent deployment policies can disrupt services.",
          "A configuration change can affect this layer while leaving neighboring resources apparently healthy; validate the complete request or data path."
        ],
        "responsibilities": [
          "Define the ownership and purpose of Cloud accounts, landing zones, cloud networks, private connectivity, federation, Kubernetes, API gateways, DNS, telemetry and data replication.",
          ".",
          "Identify which team operates the component and which team owns its downstream dependency."
        ],
        "practicalTask": "Place a stateless API in one cloud and a dependent processing service in another. Document network, identity, data and failover constraints."
      },
      {
        "implementation": [
          "Define workload placement criteria, establish independent landing zones, federate identities, create private connectivity, standardize deployment interfaces and test data movement.",
          ", deployment or infrastructure operation and capture the resulting logs, metrics and configuration state."
        ],
        "title": "Cross-cloud networking and identity federation",
        "productionConsiderations": [
          "Check both forward and return paths, including authentication, name resolution, timeouts and downstream capacity.",
          "Document the behavior during partial failure and define which component is responsible for retry or recovery."
        ],
        "explanation": "The central architecture path is: Global DNS -> Provider Edge -> AWS/Azure/GCP Workloads -> Replicated Data or Event Interfaces -> Central Operations. For this topic, the important engineering decision is Provider boundaries, portability trade-offs, identity federation, cross-cloud latency, data gravity and service ownership. Follow the path hop by hop and identify the configuration or API responsible for each transition. Do not treat the diagram as a collection of disconnected boxes; each connection represents a dependency that must be configured and tested.",
        "failureModes": [
          "Cross-cloud DNS failure, incompatible IAM semantics, provider API limits, replication lag, egress cost spikes or inconsistent deployment policies can disrupt services.",
          "A dependency may be reachable but still fail because of authorization, protocol, schema, capacity or readiness mismatch."
        ],
        "responsibilities": [
          "Explain how Cloud accounts, landing zones, cloud networks, private connectivity, federation, Kubernetes, API gateways, DNS, telemetry and data replication participate in the end-to-end path.",
          "Identify the control plane or configuration object that determines each transition.",
          "Specify the expected healthy behavior and the evidence that proves it."
        ],
        "practicalTask": " from its initiating component to the final destination. For every hop, record the configuration, health signal and one failure test."
      },
      {
        "implementation": [
          "Keep failure domains independent, define provider-specific recovery plans, centralize audit evidence and measure egress, latency and replication lag.",
          "Create a repeatable validation procedure and retain the result with the architecture change record."
        ],
        "title": "Portability, data movement and failure isolation",
        "productionConsiderations": [
          "Set service-level expectations for availability, latency, capacity and recovery.",
          "Test the failure scenarios before relying on redundancy or automated recovery.",
          "Review cost, service quotas, version compatibility and operational skill requirements."
        ],
        "explanation": "Production readiness for Multi-Cloud depends on more than successful initial deployment. Keep failure domains independent, define provider-specific recovery plans, centralize audit evidence and measure egress, latency and replication lag. The operational design must define measurable health, ownership, recovery order and evidence that the architecture behaves as intended under failure.",
        "failureModes": [
          "Cross-cloud DNS failure, incompatible IAM semantics, provider API limits, replication lag, egress cost spikes or inconsistent deployment policies can disrupt services.",
          "A recovery procedure that has not been exercised may fail because of missing permissions, stale configuration or an unavailable dependency."
        ],
        "responsibilities": [
          "Define the security and operational boundaries for Cloud accounts, landing zones, cloud networks, private connectivity, federation, Kubernetes, API gateways, DNS, telemetry and data replication.",
          "Assign responsibility for monitoring, incident response, configuration changes and recovery.",
          "Document the assumptions that must remain true for the architecture to operate safely."
        ],
        "practicalTask": "Place a stateless API in one cloud and a dependent processing service in another. Document network, identity, data and failover constraints."
      }
    ],
    "summary": "A multi-cloud design that separates provider-specific services while managing identity, connectivity, portability, observability and recovery."
  },
  "vpc": {
  "title": "Amazon VPC Architecture",
  "subtitle": "Designing isolated, routable AWS networks for production workloads",
  "summary": "An Amazon Virtual Private Cloud provides a logically isolated network in AWS where teams control IP addressing, subnet boundaries, routing, connectivity, and traffic filtering. A production VPC design begins with a non-overlapping CIDR plan and separates public entry points from private application and data workloads. Route tables, gateways, security groups, network ACLs, DNS, endpoints, and hybrid connectivity work together to define the actual network behavior.",
  "objectives": [
    "Explain VPC isolation and regional scope",
    "Plan non-overlapping CIDR ranges and subnet capacity",
    "Understand routing, gateways, security groups, and network ACLs",
    "Design connectivity for applications, data tiers, and hybrid networks",
    "Troubleshoot packet paths using route and flow evidence"
  ],
  "diagram": [
    "Users and corporate networks",
    "Internet or private connectivity",
    "VPC CIDR boundary",
    "Public ingress subnets",
    "Private application subnets",
    "Isolated database subnets",
    "Route tables, security groups, network ACLs, and VPC endpoints"
  ],
  "sections": [
    {
      "title": "VPC Boundaries, CIDR Planning, and IP Ownership",
      "explanation": "A VPC is a regional virtual network with a private IPv4 address range and optional IPv6 configuration. Its CIDR blocks determine the addresses that subnets can allocate to EC2 instances, load balancers, databases, and network interfaces. CIDR planning must account for current capacity, future growth, peering, Transit Gateway attachments, VPN networks, and on-premises address ranges. Overlapping address spaces can prevent direct routing between connected networks, so address ownership should be documented before deployment.",
      "responsibilities": [
        "Select a primary IPv4 CIDR that does not overlap connected networks",
        "Add secondary CIDR blocks only when justified by capacity or segmentation",
        "Allocate subnet ranges with room for scaling and AWS-reserved addresses",
        "Document ownership of address ranges across accounts and environments"
      ],
      "implementation": [
        "Create the VPC with an approved CIDR using Terraform or CloudFormation",
        "Associate secondary CIDRs through a reviewed network change",
        "Record subnet allocations in an IP address management plan",
        "Enable VPC DNS support and DNS hostnames when required by workloads"
      ],
      "productionConsiderations": [
        "Reserve capacity for future Availability Zones and additional application tiers",
        "Check every peering, VPN, and Transit Gateway network for CIDR overlap",
        "Track IPv4 consumption and plan IPv6 adoption where appropriate"
      ],
      "failureModes": [
        "CIDR overlap prevents expected routes from being established",
        "Small subnet ranges exhaust addresses during scaling",
        "Incorrect DNS settings cause service discovery failures"
      ],
      "practicalTask": "Design a VPC address plan for three Availability Zones, with public, application, and database subnet ranges that do not overlap corporate networks."
    },
    {
      "title": "Subnet Segmentation and Traffic Routing",
      "explanation": "A subnet is an Availability Zone-scoped range of VPC addresses. Subnets are not automatically public or private because of their names; their associated route table determines where traffic can go. A public subnet normally has a route to an Internet Gateway, while private application subnets use controlled egress such as a NAT Gateway or VPC endpoints. Database subnets commonly have no direct internet route. Subnet placement should reflect workload exposure, availability, and operational ownership.",
      "responsibilities": [
        "Separate ingress, application, and data workloads into appropriate subnet tiers",
        "Distribute production subnets across multiple Availability Zones",
        "Associate each subnet with the intended route table",
        "Keep databases and internal services away from direct public routing"
      ],
      "implementation": [
        "Create subnet CIDRs inside the VPC address range",
        "Create one subnet per required tier and Availability Zone",
        "Associate explicit route tables with each subnet",
        "Review effective routes before deploying workloads"
      ],
      "productionConsiderations": [
        "Do not treat a subnet name as a security control",
        "Avoid routing private database traffic through public ingress paths",
        "Ensure load balancer subnets span the required Availability Zones"
      ],
      "failureModes": [
        "A public route exposes instances when public addressing and security rules also permit access",
        "Missing routes cause application-to-database connectivity failures",
        "Incorrect subnet associations send traffic through unintended gateways"
      ],
      "practicalTask": "Trace a request from an internet-facing load balancer to a private application instance and then to an isolated database subnet."
    },
    {
      "title": "VPC Security, Connectivity, and Operations",
      "explanation": "VPC security is implemented through multiple layers rather than a single network switch. Security groups provide stateful, resource-level traffic rules, while network ACLs provide stateless subnet-level filtering. Internet Gateways, NAT Gateways, VPC endpoints, VPN connections, and Transit Gateway attachments provide different connectivity paths. VPC Flow Logs help investigate accepted and rejected traffic, but they do not replace application logs or packet-level troubleshooting.",
      "responsibilities": [
        "Apply least-privilege security group rules to workload interfaces",
        "Use network ACLs only for deliberate subnet-level controls",
        "Choose gateways and endpoints according to traffic direction and service needs",
        "Collect Flow Logs for network investigation and audit evidence"
      ],
      "implementation": [
        "Allow application ports only from approved source security groups",
        "Use gateway or interface endpoints for supported AWS service access",
        "Configure VPN or Transit Gateway routes for private network connectivity",
        "Enable and retain Flow Logs in an approved destination"
      ],
      "productionConsiderations": [
        "Review egress as carefully as ingress",
        "Validate return routes for stateful and stateless network paths",
        "Control endpoint policies and private DNS behavior",
        "Alert on unexpected traffic patterns and configuration changes"
      ],
      "failureModes": [
        "A restrictive network ACL blocks return traffic because it is stateless",
        "An endpoint DNS or policy mismatch prevents private service access",
        "A missing return route creates one-way connectivity"
      ],
      "practicalTask": "Investigate a failed connection by checking DNS resolution, subnet route tables, security groups, network ACLs, and Flow Logs in order."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "One VPC or multiple VPCs",
      "guidance": "Use separate VPCs when account, environment, regulatory, or operational boundaries require isolation. Use shared network services only with clear ownership and controlled routing."
    },
    {
      "decision": "Public versus private workload placement",
      "guidance": "Expose only required entry points. Keep application and data workloads private unless a documented requirement justifies public addressing."
    },
    {
      "decision": "VPC endpoints versus NAT egress",
      "guidance": "Use endpoints for supported AWS services when they improve privacy or reduce NAT dependency. Retain NAT only for destinations that require general outbound internet access."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What makes a subnet public?",
      "answer": "A subnet is considered public when its associated route table contains a route to an Internet Gateway. An instance also needs suitable addressing and security rules to communicate with the internet."
    },
    {
      "question": "What is the difference between a security group and a network ACL?",
      "answer": "A security group is stateful and applies to network interfaces. A network ACL is stateless and applies at subnet boundaries, so inbound and outbound rules must both permit the traffic."
    },
    {
      "question": "Why should VPC CIDRs not overlap?",
      "answer": "Overlapping address ranges make routing between connected networks ambiguous or impossible. This can break VPC peering, VPN, and Transit Gateway communication."
    },
    {
      "question": "How do you troubleshoot VPC connectivity?",
      "answer": "Check DNS, source and destination addresses, subnet route tables, security groups, network ACLs, gateway or endpoint configuration, return routes, and Flow Logs."
    }
  ]
},
  "public-and-private-subnets": {
  "title": "Public and Private Subnet Architecture",
  "subtitle": "Separating internet-facing entry points from internal workloads",
  "summary": "Public and private subnets establish network exposure boundaries inside a VPC. A public subnet has a route to an Internet Gateway, while a private subnet does not use that direct internet route. Production applications commonly place internet-facing load balancers in public subnets, application servers in private subnets, and databases in isolated subnets. Security groups and route tables must reinforce this separation.",
  "objectives": [
    "Distinguish subnet routing from public IP assignment",
    "Design multi-AZ subnet tiers",
    "Place load balancers, application nodes, and databases correctly",
    "Understand NAT-based and endpoint-based egress",
    "Validate effective network isolation"
  ],
  "diagram": [
    "Internet clients",
    "Internet Gateway",
    "Public subnets: load balancers",
    "Private subnets: application instances",
    "Isolated subnets: databases",
    "NAT Gateway or VPC endpoints for approved egress"
  ],
  "sections": [
    {
      "title": "Public Subnet Routing and Ingress",
      "explanation": "A public subnet is defined by a route table containing a route to an Internet Gateway. That route alone does not make every resource reachable: the resource also needs an appropriate public address or supported public endpoint, and its security rules must allow the required traffic. Public subnets are commonly used for internet-facing Application Load Balancers, NAT Gateways, and carefully controlled network appliances. Application compute and databases should not be placed there merely because the VPC needs internet access.",
      "responsibilities": [
        "Provide internet ingress only to approved edge resources",
        "Use public subnets for internet-facing load balancers and required gateways",
        "Restrict inbound ports to the minimum required protocols",
        "Keep application and database interfaces private"
      ],
      "implementation": [
        "Create public subnets in the selected Availability Zones",
        "Associate a route table with a default route to the Internet Gateway",
        "Place an internet-facing load balancer in suitable public subnets",
        "Use security groups to permit only expected listener traffic"
      ],
      "productionConsiderations": [
        "Deploy edge resources across multiple Availability Zones",
        "Avoid public IP assignment to ordinary application instances",
        "Review load balancer listeners, certificates, and target health"
      ],
      "failureModes": [
        "A missing Internet Gateway route prevents internet routing",
        "A missing public address prevents direct IPv4 internet communication for an instance",
        "An overly broad security group exposes unintended services"
      ],
      "practicalTask": "Inspect an internet-facing load balancer and verify that its public subnets have correct routes while its targets remain private."
    },
    {
      "title": "Private Application Subnets and Controlled Egress",
      "explanation": "Private subnets do not have a direct route to an Internet Gateway. Application instances can still reach approved external destinations through a NAT Gateway or supported VPC endpoints. NAT Gateways allow outbound connections while preventing unsolicited internet-initiated connections from reaching private instances. VPC endpoints can provide private access to supported AWS services without sending that service traffic through public internet paths. The selected egress design affects cost, availability, and security.",
      "responsibilities": [
        "Keep application compute without direct public internet exposure",
        "Provide only the outbound access required by package repositories and APIs",
        "Use VPC endpoints for supported AWS service traffic",
        "Separate egress policy from inbound application access"
      ],
      "implementation": [
        "Create private route tables without a direct Internet Gateway default route",
        "Route required internet-bound IPv4 traffic through a NAT Gateway",
        "Configure endpoints for services such as S3 where appropriate",
        "Restrict application egress through security group rules and endpoint policies"
      ],
      "productionConsiderations": [
        "Use a NAT Gateway per Availability Zone when resilient zonal egress is required",
        "Account for NAT processing and data transfer charges",
        "Validate DNS and endpoint private DNS settings"
      ],
      "failureModes": [
        "Private instances cannot download dependencies because no egress path exists",
        "A single-AZ NAT dependency creates cross-AZ routing or a zonal failure dependency",
        "An endpoint policy denies a required AWS API call"
      ],
      "practicalTask": "Design private application subnets for three Availability Zones and identify which destinations need NAT versus VPC endpoints."
    },
    {
      "title": "Isolated Data Subnets and Tier-to-Tier Controls",
      "explanation": "Database subnets are commonly isolated from direct internet routes. Isolation does not mean that databases cannot communicate with application services; it means their permitted paths are intentionally limited. Database security groups should accept connections only from approved application security groups, and subnet route tables should avoid unnecessary external paths. Managed database services may require subnet groups spanning multiple Availability Zones even when the database endpoint is not publicly accessible.",
      "responsibilities": [
        "Place databases in dedicated private or isolated subnet groups",
        "Allow database ports only from authorized application tiers",
        "Avoid unnecessary default internet routes in data subnets",
        "Preserve multi-AZ placement requirements for managed databases"
      ],
      "implementation": [
        "Create database subnets in multiple Availability Zones",
        "Associate route tables with only required internal routes",
        "Configure database security groups to reference application security groups",
        "Set database public accessibility to disabled unless explicitly required"
      ],
      "productionConsiderations": [
        "Test application-to-database connectivity during deployment",
        "Keep backup, replication, and maintenance paths documented",
        "Review database subnet capacity before expanding the cluster"
      ],
      "failureModes": [
        "Database connections fail because application source rules are missing",
        "A database becomes exposed after an incorrect route or public-access setting",
        "Insufficient subnet coverage blocks managed database deployment"
      ],
      "practicalTask": "Build a network access matrix showing which application services can connect to database ports and which paths must be denied."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Where should the load balancer run?",
      "guidance": "Use public subnets for internet-facing load balancers and private subnets for internal load balancers, according to the intended client boundary."
    },
    {
      "decision": "How should private instances access AWS services?",
      "guidance": "Prefer suitable VPC endpoints for supported services; use NAT for destinations that require general outbound internet connectivity."
    },
    {
      "decision": "Should databases share application subnets?",
      "guidance": "Use dedicated database subnets to make routing, ownership, subnet groups, and security reviews clearer."
    }
  ],
  "interviewQuestions": [
    {
      "question": "Does a public subnet automatically make an EC2 instance public?",
      "answer": "No. The route table must provide an Internet Gateway route, and the instance also needs a suitable public IPv4 address or other public connectivity plus permissive security rules."
    },
    {
      "question": "Can a private subnet access the internet?",
      "answer": "Yes. It can use a NAT Gateway for outbound IPv4 internet access, or VPC endpoints for private access to supported AWS services."
    },
    {
      "question": "Why place databases in isolated subnets?",
      "answer": "Isolated subnet routing reduces unnecessary network paths. Database security groups can then allow connections only from approved application workloads."
    },
    {
      "question": "What is the difference between a NAT Gateway and an Internet Gateway?",
      "answer": "An Internet Gateway enables internet routing for public resources. A NAT Gateway enables outbound internet access for private IPv4 resources without allowing unsolicited inbound internet connections."
    }
  ]
},
  "route-tables": {
  "title": "AWS VPC Route Table Architecture",
  "subtitle": "Controlling packet destinations across subnet and network boundaries",
  "summary": "VPC route tables determine where network traffic is directed. Every subnet uses an associated route table, either an explicitly associated table or the VPC main route table. Routes can target local VPC communication, an Internet Gateway, NAT Gateway, Transit Gateway, virtual private gateway, peering connection, or VPC endpoint. Correct route selection and return paths are essential for application availability and secure connectivity.",
  "objectives": [
    "Understand local and destination-based routes",
    "Explain main and explicitly associated route tables",
    "Design routes for public, private, and isolated subnets",
    "Troubleshoot missing and asymmetric routes",
    "Manage route changes safely"
  ],
  "diagram": [
    "Source workload",
    "Subnet association",
    "Route table lookup",
    "Longest-prefix route selection",
    "Gateway, endpoint, peering, or local target",
    "Destination network and return route"
  ],
  "sections": [
    {
      "title": "Route Table Fundamentals and Associations",
      "explanation": "A route table contains destination CIDR ranges and targets. The VPC local route enables communication within the VPC address space. Each subnet is associated with one route table at a time; if there is no explicit association, the subnet uses the main route table. Route tables do not replace security groups or network ACLs. A route can exist while traffic is still blocked by filtering, DNS, or a missing return path.",
      "responsibilities": [
        "Maintain a clear route table for each network tier",
        "Understand the effect of the main route table on new subnet associations",
        "Preserve required local routes",
        "Document destination ranges and route targets"
      ],
      "implementation": [
        "Create dedicated route tables for public, application, and database tiers",
        "Associate each subnet explicitly when predictable routing is required",
        "Inspect route state and target health after changes",
        "Use infrastructure as code to review route differences"
      ],
      "productionConsiderations": [
        "Avoid relying on an undocumented main route table for production isolation",
        "Review route propagation and static routes together",
        "Require peer review for broad route changes"
      ],
      "failureModes": [
        "A subnet inherits an unintended main route table",
        "A deleted or invalid target leaves a route unusable",
        "A missing route causes traffic to follow an unexpected path"
      ],
      "practicalTask": "List every subnet and its effective route table, then identify any subnet relying on an unintended main route table."
    },
    {
      "title": "Route Selection, Gateways, and Hybrid Paths",
      "explanation": "When multiple routes match a destination, AWS selects the most specific matching prefix. Route targets determine the next network hop. Public subnets commonly use a default route to an Internet Gateway, private subnets may use a NAT Gateway, and connected networks may use Transit Gateway, VPN, or peering routes. Hybrid connectivity requires both sides to have compatible routes; configuring only the AWS side does not guarantee end-to-end reachability.",
      "responsibilities": [
        "Choose route targets according to destination and connectivity model",
        "Use specific routes for connected network ranges",
        "Keep return routes consistent across hybrid networks",
        "Understand route propagation where dynamic routing is used"
      ],
      "implementation": [
        "Add a default route only to the intended egress target",
        "Add private network routes to the correct attachment or gateway",
        "Verify route state after creating peering or Transit Gateway connections",
        "Coordinate on-premises route advertisements with network teams"
      ],
      "productionConsiderations": [
        "Prefer explicit destination routes over overly broad routing where isolation matters",
        "Validate both forward and return paths",
        "Check longest-prefix behavior when overlapping route entries exist"
      ],
      "failureModes": [
        "A more specific route sends traffic to an unexpected target",
        "A VPN or Transit Gateway attachment lacks a return route",
        "A route remains blackholed after its target is removed"
      ],
      "practicalTask": "Trace a packet from a private application subnet to an on-premises CIDR and document the forward and return routes."
    },
    {
      "title": "Route Troubleshooting and Change Control",
      "explanation": "Route troubleshooting starts by identifying the source subnet, destination address, and route table association. The selected route must be active and point to a valid target. Security groups, network ACLs, DNS, and endpoint policies must then be checked because routing alone does not authorize traffic. VPC Reachability Analyzer can help evaluate supported network paths, while Flow Logs provide traffic-level evidence. Route modifications should be tested and rolled out with rollback plans.",
      "responsibilities": [
        "Identify the exact source and destination addresses",
        "Verify subnet association and selected destination route",
        "Check route target state and security filtering",
        "Collect evidence before changing production routing"
      ],
      "implementation": [
        "Use route table descriptions and infrastructure code to identify ownership",
        "Use Reachability Analyzer for supported path analysis",
        "Inspect Flow Logs for accepted or rejected traffic records",
        "Apply reviewed route changes and verify application health"
      ],
      "productionConsiderations": [
        "Avoid replacing the main route table without understanding all dependent subnets",
        "Use staged changes for shared network route tables",
        "Record the previous route configuration for rollback"
      ],
      "failureModes": [
        "Route changes break outbound access for multiple subnets",
        "Asymmetric paths cause stateful inspection or return traffic failures",
        "A route is active but security controls still block traffic"
      ],
      "practicalTask": "Investigate a private subnet that can reach one internal service but cannot reach another, using route and flow evidence."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "One shared route table or tier-specific tables",
      "guidance": "Use separate route tables when subnet tiers need different destinations or egress controls. Share tables only when their routing behavior should be identical."
    },
    {
      "decision": "Static or propagated routes",
      "guidance": "Use static routes for stable, explicitly managed destinations. Use propagation where supported dynamic routing and operational ownership justify it."
    },
    {
      "decision": "Main route table policy",
      "guidance": "Keep the main route table conservative and explicitly associate production subnets to reduce accidental routing inheritance."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What happens when a subnet has no explicit route table association?",
      "answer": "It uses the VPC main route table. This makes main route table changes potentially affect every subnet that relies on the default association."
    },
    {
      "question": "How does AWS select a route?",
      "answer": "AWS uses the most specific matching destination prefix. A more specific route takes precedence over a broader route such as the default route."
    },
    {
      "question": "Does a route table allow traffic through a security group?",
      "answer": "No. Route tables select the network path. Security groups and network ACLs independently control whether traffic is permitted."
    },
    {
      "question": "How do you troubleshoot a missing route?",
      "answer": "Identify the source subnet and destination, inspect the subnet's associated route table, confirm the matching route and target state, then validate the return path and filtering controls."
    }
  ]
},
  "internet-gateway": {
  "title": "AWS Internet Gateway Architecture",
  "subtitle": "Providing internet routing for approved public VPC resources",
  "summary": "An Internet Gateway is a horizontally scaled VPC component that enables communication between a VPC and the public internet. It is attached to a VPC and becomes usable when subnet route tables direct eligible traffic to it. For IPv4 internet access, an instance generally needs a public IPv4 address or Elastic IP and suitable security rules. An Internet Gateway does not independently make every VPC resource public.",
  "objectives": [
    "Explain Internet Gateway attachment and routing",
    "Understand public IPv4 address requirements",
    "Distinguish internet ingress from private egress",
    "Secure public workloads",
    "Troubleshoot public connectivity"
  ],
  "diagram": [
    "Internet client",
    "Public DNS or public IP",
    "Internet Gateway",
    "Public subnet route table",
    "Public load balancer or approved instance",
    "Security group and application listener"
  ],
  "sections": [
    {
      "title": "Internet Gateway Attachment and VPC Routing",
      "explanation": "An Internet Gateway is a VPC-level resource that provides a target for internet routes. It must be attached to the VPC before route tables can use it. A route such as 0.0.0.0/0 targeting the Internet Gateway sends matching IPv4 traffic toward the internet. IPv6 routing uses the appropriate IPv6 destination route. The gateway performs the network address translation required for public IPv4 communication when an instance has a public IPv4 address.",
      "responsibilities": [
        "Attach one Internet Gateway to the intended VPC",
        "Create routes only for subnets intended to have internet connectivity",
        "Understand IPv4 public addressing and IPv6 routing separately",
        "Keep gateway ownership and lifecycle under infrastructure management"
      ],
      "implementation": [
        "Create the Internet Gateway resource",
        "Attach it to the correct VPC",
        "Add the appropriate default route to public subnet route tables",
        "Verify that the route is active and the gateway is attached"
      ],
      "productionConsiderations": [
        "Avoid routing private data subnets directly to the Internet Gateway",
        "Review public address assignment policies",
        "Coordinate route changes with load balancer and instance deployment"
      ],
      "failureModes": [
        "Gateway is detached and public routes become unusable",
        "Route points to an invalid or unavailable target",
        "A subnet has no matching internet route"
      ],
      "practicalTask": "Verify that an internet-facing load balancer's subnets use the intended Internet Gateway without changing private subnet routes."
    },
    {
      "title": "Public Addressing and Internet Reachability",
      "explanation": "A public route does not automatically assign a public address to an EC2 instance. IPv4 internet communication requires the appropriate public IPv4 mapping, an Internet Gateway route, and network rules that permit the traffic. An Elastic IP provides a stable public IPv4 address when a workload needs one. For most web applications, a public load balancer is a better public entry point than assigning public addresses to every application instance.",
      "responsibilities": [
        "Separate public routing from public address assignment",
        "Use stable public addresses only where operationally required",
        "Expose application listeners rather than management ports",
        "Prefer managed public load balancers for web ingress"
      ],
      "implementation": [
        "Enable public IPv4 assignment only for approved subnet or launch configurations",
        "Associate Elastic IPs only with workloads that need stable public addressing",
        "Restrict inbound security group rules to required listener ports",
        "Keep application targets in private subnets when possible"
      ],
      "productionConsiderations": [
        "Review public IPv4 costs and address inventory",
        "Use TLS termination and managed certificates at the edge where appropriate",
        "Monitor changes to public IP associations"
      ],
      "failureModes": [
        "Instance has an Internet Gateway route but no public IPv4 address",
        "Security group blocks the listener port",
        "An exposed management port permits unwanted access"
      ],
      "practicalTask": "Diagnose why an EC2 instance in a public subnet cannot accept an inbound IPv4 connection."
    },
    {
      "title": "Public Network Security and Operational Troubleshooting",
      "explanation": "Internet-facing resources require layered controls. Security groups should allow only required protocols and trusted sources where possible. Network ACLs must allow both directions because they are stateless. Host firewalls and application listeners must also be configured correctly. Troubleshooting should verify DNS, public address mapping, subnet route association, gateway attachment, security rules, operating system firewall, and application health rather than assuming the Internet Gateway is the only possible cause.",
      "responsibilities": [
        "Restrict inbound access to approved ports and sources",
        "Validate stateless network ACL return traffic",
        "Secure operating system and application listeners",
        "Monitor public exposure and configuration drift"
      ],
      "implementation": [
        "Use load balancer security groups as the public boundary",
        "Allow target traffic only from the load balancer security group",
        "Use Flow Logs and configuration history during incidents",
        "Remove unused public addresses and listeners"
      ],
      "productionConsiderations": [
        "Keep administrative access on controlled private paths",
        "Review public exposure continuously",
        "Test connectivity from an external network after approved changes"
      ],
      "failureModes": [
        "Network ACL return ports are blocked",
        "DNS points to an old public address",
        "The application process is not listening even though routing is correct"
      ],
      "practicalTask": "Create a troubleshooting checklist that follows a public request from DNS resolution to the application listener."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Public EC2 or public load balancer",
      "guidance": "Prefer a public load balancer as the controlled entry point and keep ordinary application instances private."
    },
    {
      "decision": "Elastic IP or automatically assigned public IP",
      "guidance": "Use an Elastic IP when a stable address is required. Avoid permanent public IPv4 addresses for workloads that do not need direct internet identity."
    },
    {
      "decision": "Internet Gateway or NAT Gateway",
      "guidance": "Use an Internet Gateway for public subnet routing. Use a NAT Gateway for private IPv4 workloads that need outbound internet access."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What does an Internet Gateway do?",
      "answer": "It enables internet communication for a VPC when the appropriate subnet routes and resource addressing are configured."
    },
    {
      "question": "Does attaching an Internet Gateway make all instances public?",
      "answer": "No. Subnet routing, public addressing, security groups, network ACLs, and host firewalls still determine whether an instance can communicate with the internet."
    },
    {
      "question": "Can a private subnet route directly to an Internet Gateway?",
      "answer": "A private subnet should not have a direct default route to the Internet Gateway. It normally uses a NAT Gateway for outbound IPv4 internet access."
    },
    {
      "question": "How do you troubleshoot a public EC2 instance?",
      "answer": "Check public IP assignment, Internet Gateway attachment, subnet route table, security group, network ACL, operating system firewall, DNS, and application listener."
    }
  ]
},
  "nat-gateway": {
  "title": "AWS NAT Gateway Architecture",
  "subtitle": "Controlled outbound internet connectivity for private IPv4 workloads",
  "summary": "A NAT Gateway allows resources in private IPv4 subnets to initiate connections to external destinations without accepting unsolicited inbound connections from the internet. A public NAT Gateway is placed in a public subnet and routes through an Internet Gateway. Private subnet route tables direct outbound traffic to it. Availability Zone placement, egress capacity, endpoint alternatives, and cost must be considered in production.",
  "objectives": [
    "Explain public NAT Gateway packet flow",
    "Understand Elastic IP and Internet Gateway dependency",
    "Design resilient multi-AZ egress",
    "Compare NAT with VPC endpoints",
    "Troubleshoot outbound connectivity and cost"
  ],
  "diagram": [
    "Private EC2 or workload",
    "Private subnet route table",
    "NAT Gateway in public subnet",
    "Elastic IP and public route",
    "Internet Gateway",
    "External repository or API"
  ],
  "sections": [
    {
      "title": "NAT Gateway Packet Flow and Dependencies",
      "explanation": "A public NAT Gateway translates private source IPv4 addresses for outbound internet communication. It is created in a public subnet and uses an Elastic IP. The private subnet route table directs internet-bound traffic to the NAT Gateway, while the NAT Gateway's public subnet routes traffic to the Internet Gateway. Return traffic is mapped to the originating private connection. A NAT Gateway does not provide unsolicited inbound access to private instances.",
      "responsibilities": [
        "Place the NAT Gateway in a public subnet",
        "Allocate and associate an Elastic IP",
        "Route private subnet internet traffic to the NAT Gateway",
        "Maintain the public subnet's Internet Gateway route"
      ],
      "implementation": [
        "Create the NAT Gateway in the intended Availability Zone",
        "Wait for the NAT Gateway to become available",
        "Update private route tables with the NAT target",
        "Test outbound DNS, HTTPS, and required destination access"
      ],
      "productionConsiderations": [
        "Do not place a public NAT Gateway in a private subnet",
        "Validate route targets after gateway replacement",
        "Document all private subnets that depend on each NAT Gateway"
      ],
      "failureModes": [
        "Private route table points to the wrong NAT Gateway",
        "NAT Gateway is still pending or unavailable",
        "Public subnet has no working Internet Gateway route"
      ],
      "practicalTask": "Trace an application instance's HTTPS request through its private route table, NAT Gateway, and Internet Gateway."
    },
    {
      "title": "Multi-AZ Egress Resilience and Capacity",
      "explanation": "NAT Gateway availability is associated with its Availability Zone. A single NAT Gateway shared by private subnets in several zones can create a zonal dependency and cross-AZ traffic charges. Production designs commonly deploy a NAT Gateway in each required Availability Zone and route each private subnet to its local gateway. Capacity planning should account for connection demand, destination diversity, and data processing costs.",
      "responsibilities": [
        "Distribute NAT Gateways across required Availability Zones",
        "Associate each private subnet with the intended zonal egress path",
        "Understand cross-AZ data transfer implications",
        "Monitor NAT connection and port allocation metrics"
      ],
      "implementation": [
        "Create one NAT Gateway per production Availability Zone when resilience requires it",
        "Create zone-specific private route tables",
        "Validate failover behavior and route replacement procedures",
        "Monitor CloudWatch NAT Gateway metrics and billing"
      ],
      "productionConsiderations": [
        "Balance resilience against NAT hourly and data processing costs",
        "Avoid assuming automatic cross-zone failover",
        "Test egress during an Availability Zone impairment"
      ],
      "failureModes": [
        "A single NAT Gateway failure removes internet egress for dependent zones",
        "Cross-AZ routing increases cost and introduces zonal dependency",
        "High connection volume creates port allocation pressure"
      ],
      "practicalTask": "Design a three-AZ private egress layout and explain what happens if one NAT Gateway becomes unavailable."
    },
    {
      "title": "VPC Endpoints, Egress Controls, and Cost",
      "explanation": "Not every private workload needs general internet access. Gateway endpoints for supported services such as S3 and DynamoDB can provide private service access through route tables. Interface endpoints use private network interfaces for supported AWS services. These endpoints can reduce NAT traffic and keep service communication on private AWS network paths. Endpoint policies, security groups, private DNS, and service-specific permissions must still allow the request.",
      "responsibilities": [
        "Identify AWS service traffic that can avoid NAT",
        "Choose gateway or interface endpoints according to service support",
        "Apply endpoint policies and security controls",
        "Measure NAT usage and optimize recurring data paths"
      ],
      "implementation": [
        "Create gateway endpoints and associate the required route tables",
        "Create interface endpoints in suitable subnets",
        "Configure private DNS where appropriate",
        "Restrict endpoint policies to approved resources and actions"
      ],
      "productionConsiderations": [
        "Compare endpoint hourly costs with NAT data processing costs",
        "Check DNS behavior before migrating service traffic",
        "Retain NAT for destinations that genuinely require internet access"
      ],
      "failureModes": [
        "Endpoint policy denies a required S3 or API action",
        "Private DNS resolves to an unexpected address",
        "Workload continues using NAT because endpoint routes or policies are incomplete"
      ],
      "practicalTask": "Review an application that downloads artifacts from S3 and decide whether a gateway endpoint can remove that traffic from NAT."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Single NAT Gateway or one per Availability Zone",
      "guidance": "Use zonal NAT Gateways for production workloads that require egress resilience and predictable zone-local routing. Evaluate cost and recovery requirements."
    },
    {
      "decision": "NAT Gateway or VPC endpoint",
      "guidance": "Use endpoints for supported AWS services when private service access is appropriate. Use NAT for general outbound IPv4 destinations."
    },
    {
      "decision": "Public or private NAT Gateway",
      "guidance": "A public NAT Gateway is used for internet egress through an Internet Gateway. A private NAT Gateway serves private network routing use cases and does not provide public internet access."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is the purpose of a NAT Gateway?",
      "answer": "It allows private IPv4 resources to initiate outbound connections to external destinations without exposing those resources to unsolicited inbound internet connections."
    },
    {
      "question": "Where should a public NAT Gateway be deployed?",
      "answer": "It must be deployed in a public subnet with a route to an Internet Gateway and an associated Elastic IP."
    },
    {
      "question": "Why deploy NAT Gateways in multiple Availability Zones?",
      "answer": "A zonal NAT Gateway failure can affect the private subnets that depend on it. Local NAT Gateways reduce cross-AZ dependency and improve zonal resilience."
    },
    {
      "question": "Can a VPC endpoint reduce NAT Gateway costs?",
      "answer": "Yes. Supported AWS service traffic can use gateway or interface endpoints instead of traversing a NAT Gateway, depending on service support and endpoint configuration."
    }
  ]
},
  "ec2": {
  "title": "Amazon EC2 Compute Architecture",
  "subtitle": "Designing secure, scalable, and recoverable virtual machine workloads",
  "summary": "Amazon EC2 provides resizable virtual machine capacity for applications that require operating system control, custom runtime configuration, or specialized compute. Production EC2 architecture combines instance families, AMIs, launch templates, Auto Scaling groups, load balancing, IAM roles, storage, security groups, monitoring, patching, and recovery procedures. Instance selection must reflect workload performance and availability requirements rather than only CPU count.",
  "objectives": [
    "Choose suitable instance families and sizes",
    "Understand AMIs, launch templates, and instance lifecycle",
    "Secure instances using IAM and network controls",
    "Design scalable and recoverable EC2 fleets",
    "Operate patching, monitoring, and storage safely"
  ],
  "diagram": [
    "Users",
    "Application Load Balancer",
    "Auto Scaling group",
    "EC2 instances across Availability Zones",
    "IAM instance profile",
    "EBS volumes and application storage",
    "CloudWatch monitoring and Systems Manager"
  ],
  "sections": [
    {
      "title": "Instance Selection, AMIs, and Launch Configuration",
      "explanation": "An EC2 instance is a virtual server whose CPU, memory, storage, and network capabilities depend on its instance type. Amazon Machine Images provide the operating system and initial software configuration. Launch templates define repeatable instance settings such as AMI, instance type, security groups, IAM profile, storage mappings, and user data. Versioned launch templates make fleet changes reviewable and support controlled replacement through Auto Scaling.",
      "responsibilities": [
        "Select instance families based on CPU, memory, storage, and network needs",
        "Use approved and patched AMIs",
        "Define repeatable launch templates",
        "Track configuration changes through version control"
      ],
      "implementation": [
        "Build an AMI with the required operating system and baseline agents",
        "Create a launch template with least-privilege instance settings",
        "Use user data only for predictable bootstrap tasks",
        "Test a new launch template version before broad rollout"
      ],
      "productionConsiderations": [
        "Benchmark real application behavior before changing instance families",
        "Keep AMIs current with security patches",
        "Avoid embedding credentials in user data or images"
      ],
      "failureModes": [
        "An incompatible AMI prevents successful boot",
        "Insufficient instance capacity blocks launches",
        "Incorrect user data causes repeated bootstrap failures"
      ],
      "practicalTask": "Create a launch configuration review checklist for a web application fleet that spans multiple Availability Zones."
    },
    {
      "title": "Instance Security, IAM, and Persistent Storage",
      "explanation": "EC2 security depends on network controls, identity permissions, operating system configuration, and storage encryption. Instance profiles provide temporary IAM credentials to applications without storing long-lived access keys on disk. Security groups should allow only required application and management traffic. EBS volumes provide persistent block storage and can be encrypted. Instance metadata access should be restricted appropriately, and administrative access should use controlled services such as Systems Manager where possible.",
      "responsibilities": [
        "Attach narrowly scoped IAM roles through instance profiles",
        "Restrict inbound network access and administrative paths",
        "Encrypt EBS volumes and protect snapshots",
        "Harden instance metadata and operating system access"
      ],
      "implementation": [
        "Create an IAM role with only required application permissions",
        "Attach security groups that allow approved source traffic",
        "Enable EBS encryption using approved keys",
        "Use Systems Manager for managed administration where supported"
      ],
      "productionConsiderations": [
        "Rotate and review IAM permissions regularly",
        "Protect snapshots and backup retention",
        "Patch operating systems and installed agents",
        "Monitor unexpected privilege or metadata access"
      ],
      "failureModes": [
        "Application cannot access S3 because its role lacks permission",
        "Unencrypted or unprotected snapshots expose data",
        "Open SSH or RDP access increases attack surface"
      ],
      "practicalTask": "Design an EC2 application role that can read one approved S3 bucket without using static access keys."
    },
    {
      "title": "Fleet Scaling, Health, and Recovery",
      "explanation": "Production EC2 applications commonly run behind a load balancer and use an Auto Scaling group to maintain desired capacity across Availability Zones. Health checks determine whether instances should remain in service. CloudWatch metrics and alarms reveal capacity or application problems, while Systems Manager supports patching and operational commands. Recovery planning must include instance replacement, EBS backup, AMI rebuilding, configuration restoration, and dependency recovery.",
      "responsibilities": [
        "Distribute instances across Availability Zones",
        "Use Auto Scaling desired, minimum, and maximum capacity deliberately",
        "Integrate load balancer health checks",
        "Monitor system and application health"
      ],
      "implementation": [
        "Register an Auto Scaling group with the target group",
        "Configure scaling policies based on measured workload signals",
        "Publish application metrics and logs",
        "Test replacement of an unhealthy instance"
      ],
      "productionConsiderations": [
        "Maintain spare capacity for expected traffic bursts",
        "Use lifecycle hooks only when their completion behavior is understood",
        "Back up required persistent data independently of instance lifetime"
      ],
      "failureModes": [
        "Unhealthy instances repeatedly return to service",
        "Scaling policies react too slowly to traffic spikes",
        "Instance replacement loses data stored only on ephemeral storage"
      ],
      "practicalTask": "Simulate an unhealthy EC2 instance behind a load balancer and describe how the fleet restores healthy capacity."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Pets or immutable instances",
      "guidance": "Prefer replaceable instances built from versioned AMIs and launch templates. Keep durable application data outside the instance lifecycle."
    },
    {
      "decision": "On-demand, Spot, or Savings Plans",
      "guidance": "Use On-Demand for flexible baseline capacity, Spot for interruption-tolerant workloads, and commitment discounts when usage patterns are predictable."
    },
    {
      "decision": "SSH access or managed administration",
      "guidance": "Prefer Systems Manager Session Manager where supported to reduce exposed management ports and centralize access auditing."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is an AMI?",
      "answer": "An Amazon Machine Image is a template used to launch EC2 instances. It contains the operating system and may include required software and configuration."
    },
    {
      "question": "Why use an instance profile?",
      "answer": "An instance profile supplies temporary IAM role credentials to applications running on EC2, avoiding the need to store long-lived access keys."
    },
    {
      "question": "What is the purpose of a launch template?",
      "answer": "A launch template defines repeatable instance launch settings, allowing Auto Scaling groups and other services to create instances consistently."
    },
    {
      "question": "How do you improve EC2 availability?",
      "answer": "Run instances across multiple Availability Zones, use a load balancer, configure Auto Scaling health checks, monitor the application, and keep persistent data backed up independently."
    }
  ]
},
  "application-load-balancer": {
  "title": "AWS Application Load Balancer Architecture",
  "subtitle": "Layer 7 request routing, health checks, and resilient application ingress",
  "summary": "An Application Load Balancer distributes HTTP and HTTPS requests across registered targets such as EC2 instances, containers, and IP addresses. It operates at the application layer and supports listener rules based on host headers, paths, HTTP methods, and other request attributes. Production design includes multi-AZ subnets, TLS certificates, target groups, health checks, security groups, access logs, and safe deployment integration.",
  "objectives": [
    "Understand listeners, rules, and target groups",
    "Design host-based and path-based routing",
    "Configure health checks and target registration",
    "Secure TLS and network access",
    "Troubleshoot unhealthy targets and routing errors"
  ],
  "diagram": [
    "Client and DNS",
    "Public or internal ALB",
    "HTTPS listener and certificate",
    "Listener rules",
    "Target groups",
    "EC2 or container targets",
    "Health checks and access logs"
  ],
  "sections": [
    {
      "title": "Listeners, Rules, and Target Groups",
      "explanation": "An ALB listener accepts connections on a configured protocol and port. Listener rules evaluate conditions such as host headers and URL paths, then forward requests to target groups or perform supported actions. A target group defines the destination type, protocol, port, health check, and registered targets. This separation allows one ALB to route requests to multiple services while keeping backend instances private.",
      "responsibilities": [
        "Define listeners for approved HTTP and HTTPS entry points",
        "Use listener rules to route requests to the correct service",
        "Create target groups around application health and deployment boundaries",
        "Register targets using the appropriate target type"
      ],
      "implementation": [
        "Configure an HTTPS listener with an approved certificate",
        "Add host-based or path-based listener rules",
        "Register EC2, IP, or supported container targets",
        "Set target group ports and protocols to match the application"
      ],
      "productionConsiderations": [
        "Keep rule priorities unique and intentional",
        "Avoid routing unrelated applications through overly broad rules",
        "Document default listener behavior"
      ],
      "failureModes": [
        "A rule sends requests to the wrong target group",
        "A target is registered on the wrong port",
        "The default action returns errors for unmatched requests"
      ],
      "practicalTask": "Design host-based routing for api.example.com and web.example.com using separate target groups."
    },
    {
      "title": "Health Checks and Availability",
      "explanation": "ALB health checks determine whether registered targets are eligible to receive traffic. Health check configuration includes protocol, port, path, interval, timeout, and healthy or unhealthy thresholds. The health endpoint should represent the application's ability to serve requests, not merely prove that a process exists. ALB nodes operate across configured Availability Zones, and target placement should provide sufficient healthy capacity in the zones used by the load balancer.",
      "responsibilities": [
        "Create meaningful application health endpoints",
        "Set health check paths and thresholds deliberately",
        "Distribute targets across Availability Zones",
        "Monitor healthy host counts and target response behavior"
      ],
      "implementation": [
        "Configure target group health checks for the application's actual readiness path",
        "Ensure security groups permit ALB-to-target traffic",
        "Register targets in the required Availability Zones",
        "Test startup and recovery timing before production rollout"
      ],
      "productionConsiderations": [
        "Avoid health endpoints that depend on every optional downstream service",
        "Account for slow application startup",
        "Maintain healthy capacity during deployments and scaling"
      ],
      "failureModes": [
        "All targets become unhealthy because the health path is wrong",
        "Targets fail checks because the ALB security group is not allowed",
        "Slow startup causes instances to be removed prematurely"
      ],
      "practicalTask": "Investigate an ALB target group that reports zero healthy targets even though EC2 instances are running."
    },
    {
      "title": "TLS, Security, Observability, and Deployment",
      "explanation": "An ALB can terminate TLS at its HTTPS listener using certificates managed through AWS Certificate Manager. Security groups should allow client traffic to the listener and target traffic only to the backend port. Access logs provide request-level evidence, while CloudWatch metrics show request counts, latency, and target health. During rolling deployments, the load balancer and target group health checks help prevent traffic from reaching targets that are not ready.",
      "responsibilities": [
        "Use HTTPS listeners and managed certificates",
        "Restrict target ingress to the ALB security group",
        "Enable access logging and operational metrics",
        "Integrate target health with deployment readiness"
      ],
      "implementation": [
        "Attach the correct certificate and configure secure listener policies",
        "Allow backend ports only from the ALB security group",
        "Enable access logs in an approved S3 destination",
        "Monitor 4xx, 5xx, latency, and healthy host metrics"
      ],
      "productionConsiderations": [
        "Plan certificate renewal and domain validation",
        "Protect access log buckets and retention",
        "Test deregistration delay and graceful shutdown behavior"
      ],
      "failureModes": [
        "Certificate mismatch causes TLS errors",
        "Backend security group blocks ALB health checks",
        "Deployment drains targets before requests complete"
      ],
      "practicalTask": "Create a production rollout checklist that verifies TLS, target health, access logs, and graceful target draining."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Internet-facing or internal ALB",
      "guidance": "Choose internet-facing for public client entry and internal for private service access. Do not use a public ALB simply to make private services easier to reach."
    },
    {
      "decision": "Path-based or host-based routing",
      "guidance": "Use path routing when services share a domain and host routing when services have distinct DNS names or ownership boundaries."
    },
    {
      "decision": "TLS termination at ALB or backend",
      "guidance": "Terminate TLS at the ALB for centralized certificate management, and use backend TLS as well when end-to-end encryption requirements demand it."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is an Application Load Balancer?",
      "answer": "An ALB is a Layer 7 load balancer that distributes HTTP and HTTPS requests to registered targets using listener rules and target groups."
    },
    {
      "question": "What is a target group?",
      "answer": "A target group defines the backend destinations, protocol, port, health check, and registration settings used by a listener rule."
    },
    {
      "question": "Why can an EC2 instance be running but unhealthy in an ALB?",
      "answer": "The health check path, port, protocol, application response, security group, network ACL, or startup timing may be incorrect."
    },
    {
      "question": "How do you route multiple applications through one ALB?",
      "answer": "Create listener rules using host or path conditions and forward each matching request to its own target group."
    }
  ]
},
  "auto-scaling": {
  "title": "AWS Auto Scaling Architecture",
  "subtitle": "Maintaining application capacity as demand and instance health change",
  "summary": "EC2 Auto Scaling maintains a fleet within configured minimum, desired, and maximum capacity. Scaling policies adjust capacity based on demand signals, schedules, or predictive patterns, while health checks replace unhealthy instances. Production architecture combines launch templates, multiple Availability Zones, load balancer target groups, CloudWatch metrics, instance lifecycle handling, and deployment controls. Scaling should be based on application behavior and recovery objectives, not arbitrary CPU thresholds.",
  "objectives": [
    "Explain Auto Scaling group capacity settings",
    "Choose target tracking, step, and scheduled policies",
    "Integrate load balancer health checks",
    "Design multi-AZ capacity and instance replacement",
    "Operate scaling safely during deployments and incidents"
  ],
  "diagram": [
    "Application demand",
    "CloudWatch metrics",
    "Scaling policy",
    "Auto Scaling group",
    "Launch template",
    "EC2 instances across Availability Zones",
    "Load balancer target group and health checks"
  ],
  "sections": [
    {
      "title": "Auto Scaling Groups and Capacity Management",
      "explanation": "An Auto Scaling group manages a collection of EC2 instances using a launch template and capacity settings. Minimum capacity defines the lowest maintained size, desired capacity represents the requested current size, and maximum capacity limits scale-out. The group can distribute instances across Availability Zones and replace instances that fail configured health checks. Desired capacity is not a guarantee that the application is healthy; load balancer and application monitoring remain necessary.",
      "responsibilities": [
        "Define minimum, desired, and maximum capacity",
        "Use versioned launch templates for consistent instances",
        "Distribute capacity across Availability Zones",
        "Integrate health checks and target groups"
      ],
      "implementation": [
        "Create an Auto Scaling group with approved subnets",
        "Attach a tested launch template version",
        "Set capacity values based on baseline and recovery needs",
        "Register the group with the application target group"
      ],
      "productionConsiderations": [
        "Keep enough baseline capacity for normal demand",
        "Check service quotas and instance availability",
        "Use instance refresh for controlled configuration changes"
      ],
      "failureModes": [
        "Maximum capacity is too low for traffic demand",
        "Insufficient subnet addresses prevent scale-out",
        "A broken launch template repeatedly creates unusable instances"
      ],
      "practicalTask": "Design an Auto Scaling group for a service that requires at least two healthy instances across two Availability Zones."
    },
    {
      "title": "Dynamic, Target Tracking, and Scheduled Scaling",
      "explanation": "Scaling policies change desired capacity in response to workload signals. Target tracking attempts to maintain a selected metric near a target value, while step scaling applies different capacity changes across alarm ranges. Scheduled scaling changes capacity at known times, and predictive scaling can use historical patterns where appropriate. The metric must represent actual pressure on the application; CPU alone may not reflect queue depth, request latency, or worker backlog.",
      "responsibilities": [
        "Select metrics that reflect real application demand",
        "Understand target tracking and step scaling behavior",
        "Use scheduled capacity for predictable traffic patterns",
        "Set cooldown and warm-up behavior to avoid unstable reactions"
      ],
      "implementation": [
        "Create CloudWatch alarms and scaling policies",
        "Use request count per target or queue depth where appropriate",
        "Test scale-out and scale-in behavior under representative load",
        "Set safe minimum and maximum boundaries"
      ],
      "productionConsiderations": [
        "Avoid noisy metrics that cause repeated scaling oscillation",
        "Account for application startup and cache warm-up time",
        "Ensure scale-in does not remove capacity during critical work"
      ],
      "failureModes": [
        "CPU remains low while request latency increases",
        "Aggressive scale-in removes capacity too quickly",
        "A scaling policy reaches maximum capacity without meeting demand"
      ],
      "practicalTask": "Choose a scaling metric for a queue-processing service and explain why average CPU may be insufficient."
    },
    {
      "title": "Instance Health, Lifecycle, and Operational Recovery",
      "explanation": "Auto Scaling health checks can use EC2 status and load balancer target health. When an instance is unhealthy, the group can terminate and replace it. Lifecycle hooks allow custom actions during launch or termination, such as registering configuration or draining application work. Instance refresh replaces existing instances according to controlled settings. Operators must monitor scaling activities, failed launches, warm-up periods, and capacity constraints during incidents.",
      "responsibilities": [
        "Combine EC2 and load balancer health signals appropriately",
        "Use lifecycle hooks for justified launch or termination work",
        "Drain traffic before terminating active application instances",
        "Monitor scaling activities and failed launch reasons"
      ],
      "implementation": [
        "Configure health check grace periods for application startup",
        "Use lifecycle hooks with timeout and failure handling",
        "Set deregistration delay and graceful shutdown behavior",
        "Run instance refresh with a tested rollout strategy"
      ],
      "productionConsiderations": [
        "Avoid lifecycle hooks that can remain stuck indefinitely",
        "Keep termination handling idempotent",
        "Verify replacement capacity before removing old instances"
      ],
      "failureModes": [
        "Health checks replace instances during normal startup",
        "Lifecycle hook timeout blocks termination",
        "Instance refresh reduces healthy capacity below safe levels"
      ],
      "practicalTask": "Plan an instance refresh that replaces an application fleet without dropping below its minimum healthy capacity."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Target tracking or step scaling",
      "guidance": "Use target tracking for a metric with a meaningful steady-state target. Use step scaling when different alarm ranges require deliberately different capacity changes."
    },
    {
      "decision": "CPU or application-level metric",
      "guidance": "Use CPU for compute-bound workloads. Prefer request, queue, concurrency, or latency-related signals when they better represent application demand."
    },
    {
      "decision": "Scheduled baseline capacity",
      "guidance": "Use scheduled scaling when demand follows predictable time patterns, while retaining dynamic policies for unexpected changes."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What are minimum, desired, and maximum capacity?",
      "answer": "Minimum is the lowest maintained group size, desired is the requested current size, and maximum is the upper limit that scaling policies cannot exceed."
    },
    {
      "question": "What is target tracking scaling?",
      "answer": "Target tracking adjusts group capacity to keep a selected metric near a configured target, similar to maintaining a desired average utilization."
    },
    {
      "question": "How does Auto Scaling replace an unhealthy instance?",
      "answer": "The group detects an unhealthy instance through configured health checks, terminates it, and launches a replacement using the group's launch configuration."
    },
    {
      "question": "Why might Auto Scaling fail to launch instances?",
      "answer": "Common causes include insufficient subnet addresses, unavailable instance capacity, service quota limits, invalid launch template settings, IAM problems, or security configuration errors."
    }
  ]
},
  "s3": {
  "title": "Amazon S3 Storage Architecture",
  "subtitle": "Durable object storage with controlled access, lifecycle, and recovery",
  "summary": "Amazon S3 stores data as objects inside buckets and provides scalable storage for application assets, backups, logs, artifacts, and data lakes. Production S3 architecture requires deliberate bucket ownership, IAM and bucket policies, encryption, versioning, lifecycle transitions, replication, access logging, and recovery controls. S3 is object storage rather than a traditional mounted block filesystem, so application design must account for object keys, consistency, access patterns, and request behavior.",
  "objectives": [
    "Understand buckets, objects, keys, and storage classes",
    "Apply IAM and bucket policy controls",
    "Configure encryption, versioning, and lifecycle rules",
    "Design replication and recovery",
    "Monitor access and troubleshoot authorization"
  ],
  "diagram": [
    "Application or user",
    "IAM identity and bucket policy evaluation",
    "S3 bucket",
    "Object key and metadata",
    "Encryption and versioning",
    "Lifecycle and replication",
    "CloudTrail data events and access logs"
  ],
  "sections": [
    {
      "title": "Bucket Design, Object Keys, and Storage Classes",
      "explanation": "An S3 bucket is a container for objects, and each object is identified by a key within that bucket. Prefixes provide a logical naming structure but do not behave like traditional filesystem directories. Storage classes allow teams to match data retention and access frequency with cost and retrieval requirements. Bucket names, account ownership, region, object size, and access patterns should be considered before application integration.",
      "responsibilities": [
        "Choose bucket ownership and regional placement deliberately",
        "Design stable object key conventions",
        "Select storage classes based on access frequency and retention",
        "Separate data according to environment and access boundary"
      ],
      "implementation": [
        "Create buckets with public access blocked unless a reviewed use case requires otherwise",
        "Use predictable prefixes for application, date, and environment organization",
        "Choose storage classes based on retrieval requirements",
        "Use multipart upload for suitable large-object workloads"
      ],
      "productionConsiderations": [
        "Avoid putting secrets or personal data in object keys",
        "Document lifecycle and retrieval expectations",
        "Consider request rates and application retry behavior"
      ],
      "failureModes": [
        "Applications write objects to the wrong prefix",
        "A storage class creates unexpected retrieval delay or cost",
        "Bucket ownership confusion prevents expected access"
      ],
      "practicalTask": "Design an S3 key convention for application logs, build artifacts, and daily backups across environments."
    },
    {
      "title": "Access Control, Encryption, and Data Protection",
      "explanation": "S3 authorization can involve IAM identity policies, bucket policies, access point policies, and organization-level controls. Public Access Block settings help prevent accidental public exposure. Server-side encryption protects objects at rest, with S3-managed or AWS KMS-managed key options depending on requirements. Versioning preserves multiple object versions and supports recovery from accidental overwrite or deletion, but it must be combined with retention and access controls.",
      "responsibilities": [
        "Apply least-privilege IAM and bucket policies",
        "Block unintended public access",
        "Enable suitable server-side encryption",
        "Use versioning and retention controls for important data"
      ],
      "implementation": [
        "Grant application roles only required bucket and prefix actions",
        "Use bucket policies to enforce approved access conditions",
        "Configure default encryption and KMS permissions where required",
        "Enable versioning for buckets that need object recovery"
      ],
      "productionConsiderations": [
        "Review KMS key policies and rotation practices",
        "Protect version deletion and retention configuration",
        "Test access from the actual application role"
      ],
      "failureModes": [
        "IAM policy allows access but bucket policy denies it",
        "KMS key permissions prevent object decryption",
        "A broad bucket policy exposes sensitive objects"
      ],
      "practicalTask": "Create an access design where a build role can upload artifacts to one prefix but cannot delete existing objects."
    },
    {
      "title": "Lifecycle, Replication, and Disaster Recovery",
      "explanation": "S3 lifecycle rules can transition or expire objects according to age, storage class, and version status. Replication copies eligible objects to another bucket and can support cross-region or same-region requirements. Versioning is generally required on source and destination buckets for replication. Replication is not a substitute for a complete recovery plan: delete markers, existing objects, retention, replication permissions, and destination ownership must be understood. Recovery objectives should define how much data loss and restoration delay are acceptable.",
      "responsibilities": [
        "Define retention and transition policies for current and noncurrent versions",
        "Use replication for documented resilience or compliance needs",
        "Protect backups against accidental or malicious deletion",
        "Test restoration and object recovery procedures"
      ],
      "implementation": [
        "Configure lifecycle rules by prefix and object tags where appropriate",
        "Enable versioning on replication source and destination buckets",
        "Configure replication roles and destination permissions",
        "Perform periodic restore tests"
      ],
      "productionConsiderations": [
        "Consider replication delay and failure metrics",
        "Use Object Lock where retention requirements justify it",
        "Estimate retrieval and cross-region transfer costs"
      ],
      "failureModes": [
        "Lifecycle rules expire data before its retention period ends",
        "Replication fails because destination permissions are incomplete",
        "A deleted object remains unavailable because recovery procedures were never tested"
      ],
      "practicalTask": "Design a backup bucket with versioning, retention, lifecycle transitions, and a tested cross-region recovery procedure."
    },
    {
      "title": "S3 Observability, Audit, and Application Integration",
      "explanation": "S3 operations can be monitored through CloudWatch metrics, request metrics, CloudTrail data events, server access logging, and storage inventory features. Audit requirements determine which events and object metadata must be retained. Applications should handle authorization errors, transient failures, multipart upload cleanup, and large-object retrieval deliberately. Monitoring should distinguish access-denied failures from missing keys, throttling, and service-side errors.",
      "responsibilities": [
        "Record required data access events",
        "Monitor storage growth and request failures",
        "Use inventory and metrics for operational visibility",
        "Build retry and error handling into applications"
      ],
      "implementation": [
        "Enable CloudTrail data events for required buckets and prefixes",
        "Configure access logging or other approved audit destinations",
        "Create alarms for relevant request and replication metrics",
        "Test application behavior for denied, missing, and unavailable objects"
      ],
      "productionConsiderations": [
        "Control log destination permissions and retention",
        "Avoid logging sensitive object contents",
        "Review monitoring cost and event volume"
      ],
      "failureModes": [
        "Access-denied errors are mistaken for missing objects",
        "Audit logs are incomplete because data events were not enabled",
        "Application retries amplify a persistent authorization problem"
      ],
      "practicalTask": "Build an incident checklist for an application that suddenly receives AccessDenied errors when reading S3 objects."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "One bucket or separate buckets",
      "guidance": "Use separate buckets when ownership, encryption, retention, region, or access boundaries differ materially. Use prefixes for organization within a consistent security boundary."
    },
    {
      "decision": "SSE-S3 or SSE-KMS",
      "guidance": "Use SSE-S3 for straightforward server-side encryption. Use SSE-KMS when key policy control, audit requirements, or explicit key administration is needed."
    },
    {
      "decision": "Versioning or replication",
      "guidance": "Use versioning for object recovery and replication for copying eligible objects to another bucket. Neither replaces tested backup and restore procedures."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is an S3 object?",
      "answer": "An S3 object is stored data together with a key and metadata inside a bucket. Applications retrieve or update it through S3 APIs rather than treating S3 as ordinary block storage."
    },
    {
      "question": "What is the purpose of S3 versioning?",
      "answer": "Versioning preserves multiple versions of an object and can help recover from accidental overwrite or deletion. Retention and permissions must also protect those versions."
    },
    {
      "question": "How do you prevent public S3 exposure?",
      "answer": "Enable S3 Block Public Access, review bucket and access point policies, apply least-privilege IAM permissions, and monitor configuration changes."
    },
    {
      "question": "Is S3 replication a complete backup strategy?",
      "answer": "No. Replication copies eligible objects, but deletion behavior, retention, permissions, replication delay, and recovery testing must be considered in a separate protection plan."
    }
  ]
},
  "docker": {
  "title": "Docker Container Architecture",
  "subtitle": "Understand how Docker packages applications and runs isolated containers using images, the Docker Engine, Linux kernel features, networking, and persistent storage.",
  "summary": "Docker provides a portable application packaging and execution model. Its architecture separates the Docker client, daemon, container runtime, images, registries, networks, and storage. Understanding these boundaries helps teams build reproducible images, operate secure containers, troubleshoot runtime failures, and move workloads consistently from development into production.",
  "objectives": [
    "Trace a Docker CLI request through the Docker API, daemon, container runtime, and Linux kernel.",
    "Explain the difference between images, containers, writable layers, registries, and image layers.",
    "Understand namespaces, cgroups, capabilities, seccomp, and container isolation boundaries.",
    "Design container networking and persistent storage without coupling application state to a disposable container.",
    "Apply image security, resource limits, health checks, logging, and lifecycle practices in production."
  ],
  "diagram": [
    "Developer or CI pipeline → Docker CLI or API client → Docker Engine API",
    "Docker Engine daemon → image build and image management → local image store",
    "Docker daemon → container runtime → container processes and Linux kernel isolation",
    "Container → bridge or custom network → other containers and external services",
    "Container filesystem → writable layer and mounted volumes → persistent data",
    "Docker image → authenticated container registry → deployment host image pull"
  ],
  "sections": [
    {
      "title": "Docker Engine Request Flow and Runtime Components",
      "explanation": "Docker commonly uses a client-server architecture. A developer invokes the Docker CLI, which sends an API request to the Docker daemon. The daemon coordinates image, container, network, and volume operations and delegates container execution to the configured runtime stack. The runtime creates the process environment using operating-system facilities. This separation matters operationally: a successful CLI connection does not prove that an application process is healthy, and a running daemon does not prove that a container can reach its dependencies.",
      "responsibilities": [
        "Docker CLI translates user commands into Docker Engine API requests.",
        "Docker daemon (dockerd) manages Docker objects and coordinates lifecycle operations.",
        "Container runtime creates and manages the container process environment.",
        "Linux kernel provides namespaces, cgroups, filesystem, networking, and process isolation.",
        "Docker API access is a privileged control boundary and must be protected."
      ],
      "implementation": [
        "Use docker version and docker info to inspect client and daemon capabilities.",
        "Use docker ps -a, docker inspect, and docker events to examine container lifecycle state.",
        "Use docker logs and docker exec for application-level inspection where permitted.",
        "Keep the Docker Engine API on a protected local socket or authenticated remote endpoint.",
        "Separate image build permissions from production runtime administration."
      ],
      "productionConsiderations": [
        "Restrict access to the Docker socket because daemon access can provide host-level control.",
        "Monitor daemon availability, container restart counts, runtime errors, and host resource pressure.",
        "Document whether workloads use rootful or rootless Docker and the implications for storage and networking.",
        "Keep the Engine, runtime, host kernel, and security profiles supported and patched.",
        "Do not treat a container's running state as an application readiness signal."
      ],
      "failureModes": [
        "Docker CLI cannot connect because the daemon is stopped or the socket is inaccessible.",
        "Container creation fails because the runtime cannot create namespaces or mount filesystems.",
        "A privileged process or exposed Docker socket weakens host isolation.",
        "Daemon resource exhaustion prevents new containers from starting.",
        "A container is running while its application process is unhealthy or unable to serve requests."
      ],
      "practicalTask": "Trace docker run nginx through the CLI, daemon, image lookup, container creation, network setup, and process start. Record which component would be investigated for a daemon connection failure versus an application health failure."
    },
    {
      "title": "Image Layers, Build Process, and Registry Distribution",
      "explanation": "A Docker image is a read-only template assembled from filesystem layers and image configuration. A Dockerfile describes how those layers are produced. During a build, reusable layers can be cached, so changing a late build instruction may avoid rebuilding earlier unchanged layers. A registry stores and distributes images by repository and tag or immutable digest. Production deployments should promote the same tested image artifact between environments instead of rebuilding different artifacts for each environment.",
      "responsibilities": [
        "Dockerfile defines build instructions, build context, and image configuration.",
        "Image layers represent reusable filesystem changes and contribute to image size.",
        "BuildKit provides modern build execution, caching, and build-secret capabilities.",
        "Registry stores image manifests and layer content for distribution.",
        "Image tags provide human-readable references while digests identify immutable content."
      ],
      "implementation": [
        "Use a small trusted base image and pin critical base-image versions.",
        "Apply multi-stage builds to keep compilers and build tools out of the final runtime image.",
        "Use .dockerignore to prevent unnecessary files and secrets entering the build context.",
        "Use BuildKit secret mounts instead of embedding credentials in Dockerfile layers.",
        "Scan images, generate provenance or SBOM evidence where supported, and deploy by digest."
      ],
      "productionConsiderations": [
        "Keep images minimal to reduce transfer time, storage, and vulnerability exposure.",
        "Use controlled registries, image signing or verification, and least-privilege pull credentials.",
        "Define image retention and cleanup policies without deleting artifacts needed for rollback.",
        "Rebuild images when base images or dependencies require security updates.",
        "Promote one immutable image digest through testing, staging, and production."
      ],
      "failureModes": [
        "A missing build-context file causes COPY or ADD instructions to fail.",
        "A changed dependency invalidates build cache and causes unexpectedly long builds.",
        "Registry authentication or network failures prevent image pulls.",
        "A mutable tag points to a different image than the one previously tested.",
        "Secrets copied into a layer remain recoverable even if a later layer deletes the file."
      ],
      "practicalTask": "Create a multi-stage application image, inspect its layers and size, push it to a test registry, and record its digest. Verify that the deployment uses that digest rather than relying only on a mutable tag."
    },
    {
      "title": "Container Isolation, Resource Controls, and Security",
      "explanation": "A container is an isolated process environment, not a separate kernel or a complete virtual machine. Linux namespaces isolate views of resources such as processes, mounts, network interfaces, and hostnames. Control groups account for and constrain CPU and memory usage. Linux capabilities, seccomp filters, and mandatory access-control profiles can further reduce privileges. These controls work together; a container boundary should not be treated as protection against every host or kernel compromise.",
      "responsibilities": [
        "Namespaces provide scoped views of operating-system resources.",
        "Cgroups account for and limit resource consumption.",
        "Linux capabilities divide traditionally broad root privileges into narrower permissions.",
        "Seccomp restricts the system calls available to a process.",
        "User namespaces and rootless operation can reduce the impact of container privilege."
      ],
      "implementation": [
        "Run application processes as non-root users wherever possible.",
        "Set appropriate CPU and memory limits based on measured workload behavior.",
        "Drop unnecessary Linux capabilities and avoid privileged containers.",
        "Use read-only root filesystems when the application supports them.",
        "Apply trusted seccomp and AppArmor or SELinux profiles appropriate to the host."
      ],
      "productionConsiderations": [
        "Set resource limits to protect neighboring workloads and the host from runaway processes.",
        "Review host kernel patching because containers share the host kernel.",
        "Keep secrets outside image layers and avoid exposing sensitive host paths.",
        "Audit privileged mode, host networking, host PID access, and Docker socket mounts.",
        "Test security restrictions against application startup, diagnostics, and runtime behavior."
      ],
      "failureModes": [
        "An unrestricted process consumes host memory and triggers host-wide pressure.",
        "An application fails because a restrictive seccomp profile blocks a required system call.",
        "A container exits with an out-of-memory condition after exceeding its memory limit.",
        "Excessive capabilities or privileged mode allow unnecessary host-level operations.",
        "A host kernel vulnerability crosses the expected container isolation boundary."
      ],
      "practicalTask": "Run a test container with CPU and memory limits, inspect its configuration, and compare its behavior with an unrestricted test container. Document the security effect of dropping an unnecessary capability."
    },
    {
      "title": "Container Networking, Storage, and Operational Lifecycle",
      "explanation": "Docker networking connects containers to one another and to external systems through network drivers such as bridge, host, and overlay, depending on the deployment model. User-defined bridge networks provide service-name DNS discovery for connected containers. Container writable layers are disposable, so important application data should use volumes or deliberate bind mounts. A production container lifecycle also requires reliable health checks, graceful shutdown, centralized logs, restart behavior, and a clear ownership model for persistent data.",
      "responsibilities": [
        "Network drivers define connectivity and isolation behavior between containers and external networks.",
        "Published ports expose selected container ports through the host networking layer.",
        "Volumes provide Docker-managed persistent storage independent of a container's writable layer.",
        "Health checks report application-level health according to configured commands.",
        "Logging drivers and runtime policies connect container output to operational monitoring."
      ],
      "implementation": [
        "Create user-defined networks and use service names rather than hard-coded container IP addresses.",
        "Publish only required ports and avoid exposing internal application ports unnecessarily.",
        "Use named volumes for persistent data and define backup and restore procedures.",
        "Configure health checks that test meaningful application readiness.",
        "Handle SIGTERM and configure a suitable stop grace period for graceful application shutdown."
      ],
      "productionConsiderations": [
        "Design network segmentation between public entry points, application services, and data services.",
        "Monitor container restarts, health transitions, disk usage, network errors, and application logs.",
        "Test volume recovery independently of container recreation.",
        "Define restart policies carefully; automatic restart does not fix a persistent application defect.",
        "Use orchestration for multi-host scheduling, desired-state management, and controlled rollout requirements."
      ],
      "failureModes": [
        "Containers cannot resolve peer services because they are attached to different networks or DNS is unhealthy.",
        "A published port conflicts with another process or exposes a service unintentionally.",
        "Data disappears after container replacement because it was stored only in the writable layer.",
        "A health check uses an unavailable executable or tests the wrong endpoint.",
        "The application loses requests during termination because it does not handle shutdown signals."
      ],
      "practicalTask": "Build a two-container web and database test environment on a user-defined network. Persist database files in a named volume, recreate the database container, and verify that the data remains available."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Choose a base image and build strategy",
      "guidance": "Prefer trusted, maintained, minimal base images and multi-stage builds. Pin important inputs and promote immutable image digests across environments."
    },
    {
      "decision": "Choose container privilege and isolation settings",
      "guidance": "Run as non-root, drop unnecessary capabilities, apply resource limits, and avoid privileged mode unless a documented requirement justifies it."
    },
    {
      "decision": "Choose networking and persistence boundaries",
      "guidance": "Use explicit networks and named volumes for durable data. Publish only required ports and keep state outside disposable container filesystems."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is the difference between a Docker image and a container?",
      "answer": "An image is a read-only template containing application files, dependencies, and runtime configuration. A container is a running or stopped instance created from that image with its own runtime configuration and writable layer. Multiple containers can be created from one image. The writable layer is normally disposable, so important data must be stored in volumes or external services."
    },
    {
      "question": "How does Docker provide container isolation?",
      "answer": "Docker relies on operating-system features. Namespaces isolate views of processes, networking, mounts, and other resources. Cgroups account for and limit resource usage. Capabilities, seccomp, and security profiles reduce the operations a process can perform. Containers share the host kernel, so they are not equivalent to virtual machines with separate kernels."
    },
    {
      "question": "Why should production images be deployed by digest?",
      "answer": "A tag is a human-readable reference that can be moved to a different image. A digest identifies specific image content. Deploying the digest that passed testing ensures production receives the same artifact, improves traceability, and makes rollback and incident investigation more reliable."
    },
    {
      "question": "Why should container data use volumes?",
      "answer": "A container's writable layer is tied to its lifecycle and can disappear when the container is removed. A volume exists independently and can be mounted by replacement containers. This separation supports upgrades, recreation, and recovery, but still requires backups, restore testing, and storage monitoring."
    }
  ]
},
  "docker-compose": {
  "title": "Docker Compose Architecture",
  "subtitle": "Design and operate multi-container applications through a declarative Compose model of services, networks, volumes, configuration, and lifecycle dependencies.",
  "summary": "Docker Compose describes a multi-container application in a Compose file and applies that model through the Compose CLI and Docker Engine. It is useful for local development, integration testing, reproducible environments, and selected single-host deployments. Its service model makes application dependencies explicit, but production readiness still depends on persistent storage, secrets, health checks, backups, and operational controls.",
  "objectives": [
    "Understand how Compose translates a YAML application model into Docker resources.",
    "Design services, networks, volumes, environment configuration, and dependency relationships.",
    "Use health checks and dependency conditions without confusing startup order with application readiness.",
    "Manage configuration, secrets, profiles, scaling, and deployment lifecycle safely.",
    "Troubleshoot multi-container connectivity, persistence, and service startup failures."
  ],
  "diagram": [
    "Developer or CI job → docker compose CLI → Compose application model",
    "compose.yaml → services, images/build, environment, ports, health checks",
    "Compose project → Docker Engine → service containers",
    "Compose network → service-name DNS → application-to-application traffic",
    "Named volumes and bind mounts → persistent files and development source mounts",
    "External registry and configuration sources → image and runtime settings"
  ],
  "sections": [
    {
      "title": "Compose Application Model and Project Lifecycle",
      "explanation": "Docker Compose uses a YAML file, commonly named compose.yaml, to describe application services and their configuration. The Compose CLI reads the model, resolves supported configuration inputs, and asks the Docker Engine to create or update the required resources. A project groups related services, networks, and volumes so that one application environment can be managed consistently. The declarative file is the reviewable source of configuration, while the actual containers are runtime instances that may need reconciliation.",
      "responsibilities": [
        "Compose file declares services and their runtime configuration.",
        "Compose CLI parses and validates the application model.",
        "Project name groups resources belonging to one application environment.",
        "Docker Engine creates containers, networks, and volumes from the model.",
        "Image references or build definitions determine the application artifacts."
      ],
      "implementation": [
        "Use docker compose config to render and validate the resolved configuration.",
        "Use docker compose up -d to create or update the application environment.",
        "Use docker compose ps, logs, and events to inspect runtime behavior.",
        "Use explicit project names when multiple environments run on the same host.",
        "Keep Compose files in version control and review configuration changes like application code."
      ],
      "productionConsiderations": [
        "Separate development, test, and production configuration deliberately.",
        "Record the Compose version and features supported by the deployment environment.",
        "Avoid treating a successful docker compose up as proof that all application dependencies are ready.",
        "Use controlled image tags or digests and a repeatable deployment process.",
        "Document which resources are Compose-managed and which are external."
      ],
      "failureModes": [
        "Invalid YAML or unsupported fields prevent configuration from being loaded.",
        "An unexpected project name creates duplicate networks or volumes.",
        "A changed image reference deploys a different artifact than expected.",
        "A manually modified container drifts from the Compose file.",
        "A service starts but fails later because a dependency is unavailable."
      ],
      "practicalTask": "Create a Compose project with a web service and a database service. Validate its resolved model, start it, inspect the generated resources, and recreate the project using the same project name."
    },
    {
      "title": "Service Discovery, Networks, and Dependency Relationships",
      "explanation": "Compose services connected to the same network can normally discover one another through service names. This avoids hard-coded container IP addresses and allows containers to be replaced without requiring application configuration to track changing addresses. Compose dependency declarations can influence creation and startup order, while health-based conditions can delay dependent service startup until a dependency reports healthy. These controls do not replace application-level retry logic because a dependency can fail after startup.",
      "responsibilities": [
        "Service definitions establish independently configured application components.",
        "Networks define which services can communicate with one another.",
        "Compose DNS resolves service names for connected containers.",
        "depends_on describes service dependency and startup relationships.",
        "Health checks provide signals that can be used for dependency conditions."
      ],
      "implementation": [
        "Place related services on explicit networks and separate public-facing and internal traffic where needed.",
        "Connect a database only to the application network when direct external access is unnecessary.",
        "Use service names and container ports for internal service-to-service communication.",
        "Use health checks with realistic commands and appropriate intervals and timeouts.",
        "Implement application retries, connection timeouts, and reconnection behavior."
      ],
      "productionConsiderations": [
        "Do not assume depends_on alone proves that a database is ready to accept queries.",
        "Keep internal database ports unpublished unless an operational requirement exists.",
        "Use network boundaries to reduce unnecessary lateral communication.",
        "Test service recovery after a network interruption or dependency restart.",
        "Avoid embedding container IP addresses in application settings."
      ],
      "failureModes": [
        "Name resolution fails because services do not share a network.",
        "A dependent service starts before its dependency can accept requests.",
        "A health check reports healthy while the application dependency is still unusable.",
        "A database port is exposed on the host without an operational need.",
        "Applications fail permanently after a dependency restart because they do not reconnect."
      ],
      "practicalTask": "Create separate frontend, backend, and database network attachments. Verify which services can resolve each other by service name and test application recovery after restarting the database."
    },
    {
      "title": "Volumes, Configuration, Secrets, and Environment Separation",
      "explanation": "Compose separates service definitions from runtime configuration and storage. Environment variables can supply application settings, while Compose secrets provide a controlled mechanism for exposing sensitive values to services in supported environments. Named volumes keep data independent of a container's writable layer, whereas bind mounts connect a host path to a container path and are often useful for development. These mechanisms have different portability and security characteristics and should not be interchanged without considering the deployment target.",
      "responsibilities": [
        "Environment configuration supplies non-secret runtime settings.",
        "Compose secrets expose sensitive values to explicitly authorized services.",
        "Named volumes persist data independently from service container replacement.",
        "Bind mounts connect host files or directories to container paths.",
        "Configuration files and override files support environment-specific behavior."
      ],
      "implementation": [
        "Keep non-secret configuration separate from application images.",
        "Use secrets for credentials instead of committing passwords into Compose YAML or source control.",
        "Mount database data directories on named volumes.",
        "Use bind mounts for source-code development and avoid broad host filesystem mounts.",
        "Use explicit configuration files or deployment variables for environment-specific values."
      ],
      "productionConsiderations": [
        "Restrict secret access to only the services that require each credential.",
        "Back up named volumes and test restoration into a clean environment.",
        "Review file ownership and permissions when using bind mounts across host platforms.",
        "Avoid printing credentials in logs, shell history, rendered configuration, or CI output.",
        "Document whether a secret mechanism is supported by the actual Compose deployment target."
      ],
      "failureModes": [
        "A missing environment variable causes an application to start with invalid configuration.",
        "A bind mount hides files that were already present in the image directory.",
        "A permission mismatch prevents the application from writing to a mounted volume.",
        "A secret is accidentally committed into source control or exposed in logs.",
        "A volume is removed or overwritten without a verified backup."
      ],
      "practicalTask": "Move database persistence to a named volume, move credentials out of plain-text application settings, and verify that a recreated database service can read the existing data."
    },
    {
      "title": "Health, Scaling, Deployment, and Troubleshooting",
      "explanation": "Compose supports operational controls for managing services on a Docker host, including health checks, restart policies, profiles, and service scaling in supported configurations. These capabilities simplify repeatable environments but do not provide the complete multi-host scheduling, distributed control plane, or automated placement behavior of a container orchestrator. Operators must understand the boundaries of the host, storage, network, and Compose deployment model before using it for production workloads.",
      "responsibilities": [
        "Health checks report whether a configured service test succeeds.",
        "Restart policies define how containers are handled after process exit.",
        "Profiles allow optional groups of services to be enabled for particular workflows.",
        "Scaling controls the number of service container instances where supported.",
        "Logs, resource metrics, and container inspection support incident diagnosis."
      ],
      "implementation": [
        "Define health checks for the application endpoint or process that matters.",
        "Use restart policies for recoverable process exits and alert on repeated restarts.",
        "Use profiles for optional development tools such as test runners or debug services.",
        "Inspect resource use with docker stats and service output with docker compose logs.",
        "Use an orchestrator when multi-host scheduling, advanced rollout, or distributed resilience is required."
      ],
      "productionConsiderations": [
        "Set CPU, memory, disk, and log-retention controls appropriate to the host.",
        "Test deployment and rollback procedures with the same Compose configuration used operationally.",
        "Monitor application readiness independently from container process state.",
        "Protect the Docker daemon and host credentials.",
        "Define a migration path if service availability or scaling requirements outgrow a single-host model."
      ],
      "failureModes": [
        "A container repeatedly restarts because the application exits on missing configuration.",
        "A service is healthy at process level but cannot complete real requests.",
        "A host failure takes down all services in a single-host Compose deployment.",
        "Scaling a service creates conflicts when all replicas attempt to bind the same host port.",
        "A deployment replaces a container while application data is stored only in its writable layer."
      ],
      "practicalTask": "Deploy a Compose application with health checks, a restart policy, a named volume, and an optional profile. Simulate an application failure and document how logs, health state, and restart behavior reveal the cause."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Choose Compose for the deployment boundary",
      "guidance": "Use Compose for reproducible local, test, and suitable single-host application environments. Choose an orchestrator when distributed scheduling, multi-host failover, or advanced rollout controls are required."
    },
    {
      "decision": "Choose service network boundaries",
      "guidance": "Connect only services that need to communicate. Keep databases on internal networks and expose only intended entry points."
    },
    {
      "decision": "Choose configuration and persistence mechanisms",
      "guidance": "Keep secrets out of images and source control. Use named volumes for durable container data and bind mounts primarily for deliberate host-file integration."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is Docker Compose?",
      "answer": "Docker Compose is a tool for defining and running multi-container applications using a YAML configuration file. The file describes services, images, networks, volumes, environment settings, and other runtime options. The Compose CLI reads this model and works with Docker Engine to create and manage the application resources as a project."
    },
    {
      "question": "How do containers communicate in Docker Compose?",
      "answer": "Services connected to the same Compose network can normally communicate using their service names as DNS names. Applications should use the destination service name and its container port instead of relying on changing container IP addresses. Network membership also provides a useful boundary for controlling which services can communicate."
    },
    {
      "question": "Does depends_on guarantee that a dependency is ready?",
      "answer": "A basic depends_on relationship controls service startup order, not necessarily application readiness. A health check and a supported healthy dependency condition can delay dependent startup until the dependency reports healthy. Applications should still implement retries and reconnection because dependencies can fail after the initial startup."
    },
    {
      "question": "When should a team move from Compose to Kubernetes or another orchestrator?",
      "answer": "A team should evaluate an orchestrator when it needs multi-host scheduling, automated placement, cluster-level desired-state reconciliation, advanced service discovery, rolling deployment controls, or resilience across worker failures. Compose remains useful for local development and simpler environments, but it does not provide the same distributed control plane."
    }
  ]
},
  "ecs": {
  "title": "Amazon ECS Architecture",
  "subtitle": "Understand AWS-native container orchestration through ECS clusters, task definitions, tasks, services, capacity providers, networking, load balancing, and deployment control.",
  "summary": "Amazon Elastic Container Service is a managed container orchestration service that schedules and operates container workloads on AWS. Its architecture separates workload configuration from compute capacity and service management. Tasks define what runs, services maintain desired task counts, and capacity options determine where tasks execute. Integrations with ECR, IAM, VPC networking, CloudWatch, and load balancers form the operational platform.",
  "objectives": [
    "Explain ECS clusters, task definitions, tasks, services, and container configuration.",
    "Compare Fargate and EC2 launch capacity models and understand capacity providers.",
    "Trace image delivery from Amazon ECR through task placement and container startup.",
    "Design task roles, execution roles, networking, load balancing, and service discovery.",
    "Operate ECS deployments with health checks, scaling, logging, and failure recovery."
  ],
  "diagram": [
    "Developer or CI pipeline → container build → Amazon ECR image repository",
    "ECS task definition → image, CPU, memory, ports, roles, volumes, logging",
    "ECS cluster → ECS scheduler and service desired state",
    "Capacity providers → Fargate capacity or EC2 container instances",
    "ECS task → one or more containers → ENI and task networking",
    "Application Load Balancer → target group → healthy ECS service tasks",
    "CloudWatch logs and metrics → operational monitoring and alarms"
  ],
  "sections": [
    {
      "title": "ECS Control Model: Clusters, Task Definitions, Tasks, and Services",
      "explanation": "Amazon ECS organizes container operations around clusters, task definitions, tasks, and services. A task definition is a versioned blueprint describing one or more containers, their images, resource requirements, ports, storage, logging, and IAM role settings. A task is a running instantiation of that definition. A service maintains a desired number of task instances and can replace tasks that stop or become unhealthy according to its configuration. This model separates workload intent from individual container processes.",
      "responsibilities": [
        "Cluster groups ECS capacity and workloads into an operational boundary.",
        "Task definition specifies container images and runtime configuration.",
        "Task represents a running instance of a task definition.",
        "Service maintains desired task count and manages task replacement.",
        "ECS scheduler places tasks according to available capacity and placement constraints."
      ],
      "implementation": [
        "Create task definitions with explicit CPU, memory, port, environment, and logging configuration.",
        "Register new task definition revisions when application configuration changes.",
        "Use ECS services for long-running applications that need a maintained desired count.",
        "Use standalone tasks for one-off jobs or controlled scheduled execution patterns.",
        "Inspect service events and task stopped reasons when deployments fail."
      ],
      "productionConsiderations": [
        "Keep task definition revisions traceable to source commits and image digests.",
        "Set realistic desired counts and deployment configuration for availability requirements.",
        "Separate unrelated workloads into suitable clusters or service boundaries.",
        "Use service events and stopped reasons as primary evidence during task placement incidents.",
        "Avoid treating a task definition registration as proof that the workload can run."
      ],
      "failureModes": [
        "Tasks remain pending because no compatible capacity is available.",
        "A task stops because its image cannot be pulled or its command exits.",
        "A service cannot reach desired count because health checks repeatedly fail.",
        "A task definition references an invalid port, role, secret, or volume configuration.",
        "An incorrect deployment configuration causes too many tasks to stop simultaneously."
      ],
      "practicalTask": "Register a task definition for a small web service, launch a task, and then create an ECS service with a desired count of two. Inspect the task definition revision, service events, and replacement behavior."
    },
    {
      "title": "Compute Capacity: Fargate, EC2, and Capacity Providers",
      "explanation": "ECS separates its scheduling control model from the compute capacity that executes tasks. With Fargate, AWS manages the underlying server capacity and the task requests supported CPU and memory combinations. With the EC2 launch model, the customer operates the container instances and is responsible for instance lifecycle, patching, scaling, and host-level capacity. Capacity providers connect ECS services and tasks to capacity strategies and help coordinate placement with Fargate or EC2 Auto Scaling capacity.",
      "responsibilities": [
        "Fargate runs supported tasks without requiring customers to manage worker instances.",
        "EC2 capacity uses registered container instances to execute tasks.",
        "Capacity providers represent capacity sources and scaling integration.",
        "Capacity provider strategies influence how tasks use configured capacity.",
        "Task CPU and memory requirements affect placement and supported configurations."
      ],
      "implementation": [
        "Choose Fargate when reducing host management is more important than direct host control.",
        "Choose EC2 capacity when workloads need specific instance types, host customization, or specialized capacity.",
        "Configure capacity providers and strategies deliberately for each service.",
        "Set EC2 Auto Scaling capacity to support expected task placement and deployment surge.",
        "Monitor cluster capacity, placement failures, and resource reservations."
      ],
      "productionConsiderations": [
        "Plan for spare capacity during rolling deployments and sudden traffic increases.",
        "Patch and replace EC2 container instances through controlled lifecycle procedures.",
        "Evaluate Fargate platform support and task sizing before committing to a workload design.",
        "Avoid overcommitting CPU and memory on EC2 container instances.",
        "Use capacity provider scaling signals and service desired count together when troubleshooting."
      ],
      "failureModes": [
        "Tasks remain pending because the EC2 cluster lacks compatible CPU or memory.",
        "An EC2 container instance fails to register or becomes disconnected.",
        "A capacity provider cannot scale because its Auto Scaling configuration is incorrect.",
        "A task requests an unsupported Fargate CPU and memory combination.",
        "Deployment surge consumes all available capacity and prevents replacement tasks from starting."
      ],
      "practicalTask": "Deploy the same test workload using Fargate and an EC2 capacity provider. Compare operational responsibilities, task placement evidence, scaling behavior, and the capacity signals visible to the operator."
    },
    {
      "title": "Task Networking, Load Balancing, and Service Discovery",
      "explanation": "ECS networking determines how tasks receive network interfaces and communicate with other services. In awsvpc mode, each task receives an elastic network interface in the configured VPC subnets and security groups. This provides task-level network identity and security controls. An Application Load Balancer can route incoming requests to healthy service tasks through a target group, while service discovery can provide internal name-based access. Routing, security groups, subnet reachability, and target health must be designed together.",
      "responsibilities": [
        "awsvpc networking assigns task-level network interfaces.",
        "VPC subnets determine task placement and network reachability.",
        "Security groups control permitted inbound and outbound traffic.",
        "Load balancer listeners and target groups distribute requests to service tasks.",
        "Service discovery supports internal communication between selected services."
      ],
      "implementation": [
        "Select subnets and security groups in the task or service network configuration.",
        "Allow inbound application traffic from the intended load balancer security group.",
        "Configure target groups with the correct target type and health check path.",
        "Use private subnets for application tasks when public inbound access is unnecessary.",
        "Use service discovery or internal load balancing for controlled east-west communication."
      ],
      "productionConsiderations": [
        "Check route tables, DNS, security groups, network ACLs, and target health during connectivity incidents.",
        "Plan subnet IP capacity for task scaling and deployment surge.",
        "Avoid assigning public IP addresses to tasks unless the architecture requires direct internet reachability.",
        "Use TLS termination and encryption between services where required by the security design.",
        "Monitor load balancer target health alongside ECS service health."
      ],
      "failureModes": [
        "Tasks fail to start because the selected subnet has insufficient available IP addresses.",
        "Load balancer targets remain unhealthy because the port or health check path is wrong.",
        "Security groups block traffic between the load balancer and task ENIs.",
        "A private task cannot pull an image or retrieve dependencies because required egress is missing.",
        "Service discovery returns stale or unreachable endpoints during task replacement."
      ],
      "practicalTask": "Place an ECS service in private subnets behind an Application Load Balancer. Verify the task ENI, security-group path, target registration, health check, and request flow."
    },
    {
      "title": "IAM, Image Delivery, Secrets, and Observability",
      "explanation": "ECS tasks rely on AWS identity and service integrations to retrieve images, write logs, access secrets, and call other AWS APIs. The task execution role supports ECS agent operations such as pulling private ECR images and publishing configured logs. The task role supplies credentials to application code inside the task. Separating these roles limits the permissions available to the application and avoids granting workload code permissions intended only for task startup. Logging and monitoring complete the operational feedback path.",
      "responsibilities": [
        "Task execution role authorizes supported ECS startup operations.",
        "Task role grants AWS API permissions to application code.",
        "Amazon ECR stores container images and provides image distribution.",
        "Secrets Manager and Systems Manager Parameter Store can supply sensitive configuration.",
        "CloudWatch Logs and metrics support runtime visibility and alerting."
      ],
      "implementation": [
        "Create separate least-privilege execution and task roles.",
        "Use ECR repositories and controlled image-pull permissions.",
        "Inject secrets using supported ECS secret configuration rather than hardcoding them.",
        "Configure awslogs or an approved logging approach in the task definition.",
        "Use CloudWatch alarms for service health, resource use, and application signals."
      ],
      "productionConsiderations": [
        "Review IAM policies whenever a task definition or application permission changes.",
        "Rotate secrets and verify that task replacements receive the intended configuration.",
        "Ensure private subnet tasks can reach ECR and other required AWS endpoints.",
        "Avoid logging credentials, access tokens, or sensitive customer data.",
        "Correlate task IDs, service events, deployment revisions, and application logs during incidents."
      ],
      "failureModes": [
        "Image pulls fail because the execution role or registry connectivity is incorrect.",
        "Application API calls fail because the task role lacks a required permission.",
        "Tasks start but logs are missing because logging configuration or permissions are wrong.",
        "Secret retrieval fails because the secret reference, KMS permission, or network path is invalid.",
        "Overly broad IAM policies allow a compromised application to access unrelated AWS resources."
      ],
      "practicalTask": "Create separate execution and task roles for a test service. Verify that the task can pull its image and publish logs, while application permissions remain limited to one intended AWS resource."
    },
    {
      "title": "Deployment Strategies, Scaling, and Production Recovery",
      "explanation": "ECS services support controlled deployment behavior by replacing task instances as new task definition revisions are deployed. Deployment configuration determines how many tasks can run during the transition and how many may be unavailable. Health checks from the service and load balancer influence whether new tasks are considered usable. Service Auto Scaling can adjust desired task count using supported scaling policies. Reliable production operations require enough capacity for deployment, meaningful health checks, rollback criteria, and observable application performance.",
      "responsibilities": [
        "ECS deployment configuration controls the replacement process for service tasks.",
        "Minimum and maximum healthy percentages influence deployment capacity and availability.",
        "Service Auto Scaling adjusts desired count according to configured policies.",
        "Load balancer and container health checks provide deployment health signals.",
        "Service events and CloudWatch metrics support failure detection and recovery."
      ],
      "implementation": [
        "Use immutable image references and a new task definition revision for each release.",
        "Configure deployment percentages to match capacity and availability requirements.",
        "Set service scaling policies using workload-relevant metrics such as CPU, memory, or request load.",
        "Define rollback behavior and validate the previous task definition remains deployable.",
        "Test deployments with failed health checks and insufficient capacity in a non-production environment."
      ],
      "productionConsiderations": [
        "Maintain enough spare capacity for deployment surge and recovery.",
        "Alert on desired-versus-running task count, deployment failures, and unhealthy targets.",
        "Use gradual traffic shifting where the deployment architecture supports it.",
        "Validate database and message schema compatibility before rolling application versions.",
        "Document rollback conditions and the operator actions needed when automatic recovery fails."
      ],
      "failureModes": [
        "New tasks fail health checks and prevent a deployment from reaching steady state.",
        "A deployment cannot start because there is insufficient compute or subnet IP capacity.",
        "Aggressive scaling causes rapid task churn and downstream connection pressure.",
        "A rollback fails because the previous image or secret version is no longer available.",
        "A service reports healthy tasks while application latency or error rate is unacceptable."
      ],
      "practicalTask": "Perform a controlled ECS service deployment using a new task definition revision. Observe task replacement, load balancer health, service events, and scaling metrics. Simulate an unhealthy release and document the rollback path."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Choose Fargate or EC2 capacity",
      "guidance": "Prefer Fargate when minimizing host operations is the priority. Choose EC2 when host-level control, specialized instance capacity, or a justified cost and utilization model requires it."
    },
    {
      "decision": "Choose task network placement",
      "guidance": "Use task-level VPC networking with private subnets for typical internal application workloads. Expose services through controlled load balancers and security-group relationships."
    },
    {
      "decision": "Choose IAM role boundaries",
      "guidance": "Keep task execution permissions separate from application task permissions. Grant the application only the AWS API access it needs."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is the difference between an ECS task definition, task, and service?",
      "answer": "A task definition is the versioned blueprint describing containers, images, resources, networking, roles, and other settings. A task is a running instance created from that blueprint. An ECS service maintains a desired number of task instances and manages replacement and deployment behavior for long-running applications."
    },
    {
      "question": "What is the difference between the ECS task role and execution role?",
      "answer": "The execution role authorizes ECS-related operations such as pulling private images and publishing configured logs. The task role provides AWS credentials to application code running inside the task. Keeping them separate prevents application code from automatically receiving permissions intended only for task startup."
    },
    {
      "question": "When should ECS use Fargate instead of EC2?",
      "answer": "Fargate is useful when a team wants AWS to manage the underlying server capacity and prefers task-level resource requests. EC2 is appropriate when workloads require host customization, particular instance families, specialized hardware, or a managed fleet with deliberate utilization and cost controls. The decision should include operational effort and scaling needs."
    },
    {
      "question": "How do you troubleshoot an ECS task that remains pending?",
      "answer": "Inspect the ECS service events and task details first. Check whether compatible capacity is available, whether CPU and memory requirements can be satisfied, and whether the selected subnets have available IP addresses. Then verify capacity provider configuration, placement constraints, task definition settings, and any image or IAM prerequisites that prevent task startup."
    }
  ]
},
  "eks": {
  "title": "Amazon EKS Architecture",
  "subtitle": "Explore managed Kubernetes on AWS, including the EKS control plane, worker compute, VPC networking, IAM integration, add-ons, ingress, and cluster operations.",
  "summary": "Amazon Elastic Kubernetes Service provides a managed Kubernetes control plane integrated with AWS infrastructure and identity services. An EKS cluster combines the Kubernetes API and control-plane services with worker compute such as managed node groups, self-managed nodes, or Fargate profiles. Networking, IAM authentication, storage integrations, add-ons, and observability determine how reliably applications operate on the cluster.",
  "objectives": [
    "Understand the managed EKS control plane and its relationship with worker nodes.",
    "Compare managed node groups, self-managed nodes, and Fargate profiles.",
    "Trace pod networking through the Amazon VPC CNI and Kubernetes service networking.",
    "Understand IAM authentication, access entries, RBAC, and workload identity.",
    "Operate EKS upgrades, add-ons, storage, ingress, and production monitoring."
  ],
  "diagram": [
    "Administrator or CI/CD → AWS IAM identity → EKS API endpoint",
    "Amazon EKS managed control plane → API server, scheduler, controllers, etcd",
    "VPC subnets → managed node groups or self-managed worker nodes",
    "Worker node → kubelet, container runtime, VPC CNI, kube-proxy or replacement",
    "Kubernetes Pod → service networking → ingress or AWS load balancer",
    "Pod identity and IAM roles → AWS service access",
    "EBS, EFS, and observability integrations → persistent data and operational signals"
  ],
  "sections": [
    {
      "title": "EKS Control Plane, Cluster API, and Worker Architecture",
      "explanation": "An EKS cluster provides a Kubernetes control plane managed by AWS and connected to customer-managed or service-managed worker compute. The control plane includes the Kubernetes API server, scheduler, controller processes, and the cluster's backing state store. Worker nodes run the kubelet, container runtime, networking components, and application Pods. The Kubernetes API is the control interface: deployments, services, and other objects are submitted to the API server, while controllers continuously work toward the declared desired state.",
      "responsibilities": [
        "EKS manages the Kubernetes control plane lifecycle and supported availability model.",
        "Kubernetes API server accepts and validates cluster API requests.",
        "Scheduler assigns eligible unscheduled Pods to worker nodes.",
        "Controllers reconcile observed cluster state with declared desired state.",
        "Worker nodes execute Pods and report status through the kubelet."
      ],
      "implementation": [
        "Create clusters in selected VPC subnets and choose endpoint access deliberately.",
        "Use kubectl with the correct kubeconfig context and authorized AWS identity.",
        "Inspect cluster state with kubectl get nodes, pods, events, and describe commands.",
        "Separate cluster administration permissions from application deployment permissions.",
        "Record cluster version, node versions, add-on versions, and endpoint configuration."
      ],
      "productionConsiderations": [
        "Plan control-plane and worker upgrades as coordinated but distinct activities.",
        "Protect the Kubernetes API endpoint with deliberate public and private access controls.",
        "Keep sufficient worker capacity while nodes are drained or replaced.",
        "Back up important application data and cluster configuration according to recovery requirements.",
        "Monitor API availability, node readiness, scheduling failures, and control-plane audit activity."
      ],
      "failureModes": [
        "kubectl cannot connect because the endpoint, DNS, routing, or access configuration is wrong.",
        "Nodes remain NotReady because kubelet, runtime, or network initialization fails.",
        "Pods remain Pending because node capacity or scheduling constraints are unsatisfied.",
        "API requests are rejected because IAM authentication or Kubernetes authorization is missing.",
        "A version mismatch or unsupported add-on combination disrupts cluster operations."
      ],
      "practicalTask": "Inspect an EKS cluster's Kubernetes version, endpoint access, node groups, and node readiness. Trace one Deployment creation from kubectl to the API server, scheduler, kubelet, and running Pod."
    },
    {
      "title": "Worker Compute Models and Node Lifecycle",
      "explanation": "EKS supports several ways to provide compute for Pods. Managed node groups use EC2 Auto Scaling infrastructure with AWS-managed integration for node group operations. Self-managed nodes provide more direct control over instance lifecycle and bootstrap configuration. Fargate profiles allow selected Pods to run on serverless compute without customers managing worker instances. These choices affect workload compatibility, daemon requirements, capacity planning, upgrade procedures, and operational ownership.",
      "responsibilities": [
        "Managed node groups coordinate EC2 worker capacity and node group updates.",
        "Self-managed nodes expose more responsibility for bootstrap, scaling, and lifecycle.",
        "Fargate profiles select eligible Pods for Fargate execution.",
        "Node labels, taints, tolerations, and affinity influence workload placement.",
        "Cluster Autoscaler or Karpenter can support node capacity automation when configured."
      ],
      "implementation": [
        "Choose node instance types based on measured CPU, memory, network, and storage needs.",
        "Use managed node groups when a managed EC2 worker lifecycle is suitable.",
        "Use Fargate profiles for compatible workloads that do not require unsupported node-level features.",
        "Apply labels and taints to separate workload classes and protected system components.",
        "Configure autoscaling with resource requests and workload scheduling constraints in mind."
      ],
      "productionConsiderations": [
        "Maintain spare capacity for rolling node updates and Pod rescheduling.",
        "Validate DaemonSet, privileged workload, storage, and networking compatibility before selecting Fargate.",
        "Patch node operating systems and container runtimes through a controlled replacement process.",
        "Use disruption budgets to reduce availability risk during voluntary node maintenance.",
        "Monitor pending Pods, node pressure, instance health, and autoscaler decisions."
      ],
      "failureModes": [
        "Managed node group updates stall because Pods cannot be safely evicted.",
        "Nodes fail to join because bootstrap, IAM, subnet, or security configuration is wrong.",
        "Pods remain Pending because taints, selectors, affinity, or resource requests exclude all nodes.",
        "Fargate profile selectors do not match the intended namespace and labels.",
        "Autoscaling cannot add nodes because quotas, subnet IPs, or instance capacity are exhausted."
      ],
      "practicalTask": "Create a workload placement plan for a general application, a system DaemonSet, and a workload with special compute requirements. Identify which EKS compute model and scheduling controls are appropriate for each."
    },
    {
      "title": "VPC CNI, Pod Addressing, Service Traffic, and Ingress",
      "explanation": "EKS networking connects Kubernetes workloads to the AWS VPC. The Amazon VPC CNI plugin assigns VPC addresses to Pods using network interfaces attached to worker nodes, subject to instance limits and configuration. Kubernetes Services provide stable service-level access to changing Pod endpoints, while ingress controllers or AWS load balancer integrations expose selected application routes. Network reachability depends on subnet capacity, routing, security groups, network policies where supported, and the configuration of the chosen CNI and service datapath.",
      "responsibilities": [
        "Amazon VPC CNI manages Pod network interfaces and IP address allocation.",
        "Subnets and VPC routing determine Pod and node network reachability.",
        "Kubernetes Services provide stable access to selected Pod endpoints.",
        "AWS Load Balancer Controller can provision supported AWS load balancer resources.",
        "Network policies and security groups for Pods can add workload-level traffic controls when configured."
      ],
      "implementation": [
        "Plan subnet CIDRs and available IP addresses for nodes, Pods, and load balancer interfaces.",
        "Review VPC CNI settings and instance network interface limits before scaling.",
        "Use ClusterIP for internal service access and suitable load balancer or ingress resources for external traffic.",
        "Configure security groups and network policies around actual application communication paths.",
        "Verify DNS, routes, target health, and service endpoints during connectivity troubleshooting."
      ],
      "productionConsiderations": [
        "Use IP address planning that accounts for peak Pod density and rolling deployment surge.",
        "Monitor CNI errors, IP allocation pressure, and subnet free address counts.",
        "Restrict public exposure and use private application subnets where appropriate.",
        "Validate compatibility between the Kubernetes version, CNI, and load balancer controller.",
        "Test traffic behavior during Pod replacement and node draining."
      ],
      "failureModes": [
        "Pods cannot start because the CNI cannot allocate an IP address.",
        "Service traffic fails because endpoints are empty or readiness probes fail.",
        "Load balancer targets are unhealthy because ports, routes, or security groups are incorrect.",
        "Pods cannot reach AWS APIs because NAT, endpoints, DNS, or IAM permissions are missing.",
        "Subnet exhaustion prevents new nodes, Pods, or load balancer interfaces from being created."
      ],
      "practicalTask": "Trace a request from an external client through an AWS load balancer, Kubernetes Service, and selected Pod. Verify the target health, service endpoints, Pod IP, subnet route, and security-group path."
    },
    {
      "title": "IAM Authentication, RBAC, and Workload Identity",
      "explanation": "EKS combines AWS identity mechanisms with Kubernetes authorization. An AWS IAM identity is used to authenticate access to the cluster, while Kubernetes RBAC determines which API operations that authenticated identity can perform. Application Pods should use workload identity mechanisms such as EKS Pod Identity or IAM Roles for Service Accounts where appropriate, instead of inheriting broad node permissions. Separating human access, automation access, node permissions, and application permissions reduces the impact of compromised credentials.",
      "responsibilities": [
        "IAM identities authenticate authorized users and automation to the EKS cluster.",
        "EKS access entries and supported access mechanisms connect IAM identities to cluster access.",
        "Kubernetes RBAC controls verbs and resources available to users and service accounts.",
        "Pod Identity or IRSA can provide scoped AWS credentials to application workloads.",
        "Node IAM roles provide only the permissions required for node operation."
      ],
      "implementation": [
        "Create distinct IAM roles for administrators, read-only operators, and deployment automation.",
        "Use EKS access entries and Kubernetes RBAC to grant the minimum required cluster permissions.",
        "Use Pod Identity or IRSA for application access to AWS APIs.",
        "Avoid granting broad application permissions through the worker node role.",
        "Audit role trust policies, service account associations, and Kubernetes role bindings."
      ],
      "productionConsiderations": [
        "Review access whenever team membership or deployment automation changes.",
        "Use short-lived credentials and avoid distributing long-lived access keys.",
        "Monitor EKS audit logs and AWS API activity for unusual access patterns.",
        "Test authorization with the actual workload identity rather than an administrator account.",
        "Separate permissions for reading cluster state from changing production workloads."
      ],
      "failureModes": [
        "kubectl authentication succeeds but requests are forbidden because RBAC is missing.",
        "A Pod receives AccessDenied because its workload role trust or policy is incorrect.",
        "A workload unexpectedly inherits excessive permissions from the node role.",
        "A CI identity can authenticate but cannot access the intended namespace.",
        "A stale access mapping prevents a user or automation role from reaching the cluster."
      ],
      "practicalTask": "Create a restricted deployment identity and a workload identity for a test Pod. Verify the intended Kubernetes API permissions and one allowed AWS API action, then confirm that unrelated actions are denied."
    },
    {
      "title": "Storage, Add-ons, Upgrades, and Production Operations",
      "explanation": "Production EKS depends on more than a healthy control plane. Cluster add-ons provide essential capabilities such as networking, DNS, proxying, storage integration, and observability. The EBS CSI driver and EFS CSI driver support different persistence patterns. Upgrades must consider Kubernetes version compatibility, node AMIs, add-on versions, API removals, and workload disruption. A production operating model therefore needs a version matrix, maintenance process, capacity strategy, backup plan, and clear ownership for both cluster services and application workloads.",
      "responsibilities": [
        "CoreDNS provides cluster DNS resolution for workloads.",
        "VPC CNI and kube-proxy or compatible alternatives support cluster networking.",
        "CSI drivers integrate Kubernetes persistent volumes with AWS storage services.",
        "Metrics, logs, events, and audit records provide operational evidence.",
        "Cluster and node upgrades require coordinated compatibility and disruption planning."
      ],
      "implementation": [
        "Track Kubernetes, node AMI, CNI, CoreDNS, kube-proxy, and CSI driver versions.",
        "Use PersistentVolumeClaims and suitable StorageClasses for persistent application data.",
        "Back up application data and required Kubernetes configuration before major changes.",
        "Upgrade in a test environment and validate removed APIs and add-on compatibility.",
        "Drain and replace nodes gradually while observing Pod disruption and application health."
      ],
      "productionConsiderations": [
        "Keep system add-ons supported and compatible with the target cluster version.",
        "Test persistent volume attachment, recovery, and restore behavior.",
        "Use PodDisruptionBudgets where they meaningfully protect availability during voluntary disruptions.",
        "Monitor node pressure, DNS failures, API errors, volume operations, and application service-level indicators.",
        "Maintain a documented rollback or recovery approach for failed upgrades."
      ],
      "failureModes": [
        "An add-on becomes incompatible after a Kubernetes version upgrade.",
        "A Pod cannot mount a volume because the CSI driver, IAM, or storage configuration is wrong.",
        "Node draining stalls because workloads cannot be evicted within disruption constraints.",
        "CoreDNS failures cause widespread service discovery problems.",
        "An upgrade succeeds at the control-plane level but workloads fail on the new node version."
      ],
      "practicalTask": "Build an EKS upgrade checklist covering control-plane version, node AMI, add-ons, deprecated APIs, Pod disruption, persistent storage, and rollback evidence. Apply it to a non-production cluster before a production upgrade."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Choose worker compute",
      "guidance": "Use managed node groups for standard EC2-backed worker operations, self-managed nodes only when additional control is justified, and Fargate profiles for compatible workloads that benefit from serverless task execution."
    },
    {
      "decision": "Choose cluster network and endpoint exposure",
      "guidance": "Plan private and public endpoint access, subnet IP capacity, Pod density, and load balancer integration together. Avoid public workload exposure unless required."
    },
    {
      "decision": "Choose workload identity",
      "guidance": "Use Pod Identity or IRSA for application AWS permissions. Keep node roles, execution identities, and human cluster access separate."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What does Amazon EKS manage and what does the customer manage?",
      "answer": "EKS manages the Kubernetes control plane as an AWS service. Customers remain responsible for workload design, cluster access, worker compute choices, networking configuration, add-ons, application security, storage, monitoring, and operational procedures. The exact division of responsibility depends on whether the cluster uses managed node groups, self-managed nodes, or Fargate."
    },
    {
      "question": "What is the role of the Amazon VPC CNI in EKS?",
      "answer": "The Amazon VPC CNI plugin provides Kubernetes Pod networking integrated with the AWS VPC. It manages network interfaces and allocates VPC IP addresses to Pods according to its configuration and the capacity of the worker instances and subnets. Incorrect CNI configuration or IP exhaustion can prevent Pods from starting or communicating."
    },
    {
      "question": "How are IAM and Kubernetes RBAC different in EKS?",
      "answer": "IAM authenticates AWS identities and is used in the cluster access process. Kubernetes RBAC authorizes operations against Kubernetes API resources by defining roles and bindings. A user may authenticate successfully but still receive a forbidden response if the required Kubernetes permissions are not granted."
    },
    {
      "question": "How should an EKS cluster upgrade be planned?",
      "answer": "An upgrade should validate Kubernetes version compatibility, deprecated APIs, node AMIs, CNI and other add-ons, storage drivers, workload disruption, and available capacity. Test the change in a non-production cluster, upgrade components in a supported order, drain nodes gradually, monitor application health, and keep a recovery plan for data and workloads."
    }
  ]
},
  "kubernetes": {
  "title": "Kubernetes Cluster Architecture",
  "subtitle": "Understand Kubernetes declarative orchestration through the control plane, worker nodes, API objects, scheduling, controllers, networking, storage, and workload lifecycle.",
  "summary": "Kubernetes is a container orchestration platform built around a declarative API and continuous reconciliation. Users describe desired state through API objects, the control plane stores and processes those objects, and controllers and node agents work to make actual runtime state match the declaration. Pods are the smallest deployable units, while Deployments, StatefulSets, DaemonSets, Services, and storage resources provide higher-level workload and platform behavior.",
  "objectives": [
    "Explain the Kubernetes control plane and the responsibilities of its major components.",
    "Understand Pods, controllers, Services, namespaces, and declarative desired state.",
    "Trace Pod scheduling and container startup on a worker node.",
    "Design service networking, DNS, ingress, persistent storage, and workload configuration.",
    "Troubleshoot scheduling, readiness, resource pressure, and reconciliation failures."
  ],
  "diagram": [
    "kubectl or CI/CD → Kubernetes API server → authentication, authorization, admission",
    "API server → etcd cluster state storage",
    "Scheduler → eligible worker node selection",
    "Controller manager → reconciliation loops for desired state",
    "Worker node → kubelet → container runtime → Pod containers",
    "CNI network plugin → Pod connectivity; Service datapath → stable service access",
    "Ingress or Gateway → external request routing → Service → Pod endpoints",
    "PersistentVolumeClaim → StorageClass and provisioner → persistent storage"
  ],
  "sections": [
    {
      "title": "Control Plane Architecture and API Request Processing",
      "explanation": "The Kubernetes control plane makes global decisions about the cluster and continuously coordinates workload state. The API server is the front end for Kubernetes API requests and applies authentication, authorization, admission, and validation. etcd stores cluster state. The scheduler selects nodes for Pods that do not yet have an assigned node, while controllers observe API objects and reconcile actual state. These components cooperate through the API rather than directly managing every application process themselves.",
      "responsibilities": [
        "kube-apiserver exposes the Kubernetes API and validates requests.",
        "etcd stores the cluster's persistent API state.",
        "kube-scheduler selects nodes for eligible unscheduled Pods.",
        "kube-controller-manager runs controllers that reconcile declared and observed state.",
        "Admission controls can validate or mutate requests before objects are persisted."
      ],
      "implementation": [
        "Use kubectl apply with declarative manifests for repeatable resource management.",
        "Inspect API resources with kubectl get, describe, and explain.",
        "Use kubectl get events and API server diagnostics to investigate rejected or stalled operations.",
        "Protect API access with authentication, RBAC, and admission policies.",
        "Back up etcd or use the supported backup process for the chosen cluster distribution."
      ],
      "productionConsiderations": [
        "Protect control-plane credentials and limit who can create privileged workloads.",
        "Monitor API latency, request errors, etcd health, and controller behavior.",
        "Run a highly available control plane for critical production clusters.",
        "Test backup restoration rather than assuming that backup creation alone is sufficient.",
        "Keep API versions and admission policies compatible with deployed manifests."
      ],
      "failureModes": [
        "API requests fail because authentication, authorization, or admission rejects them.",
        "The API server is unavailable or slow because of control-plane resource pressure.",
        "etcd loses availability or cannot persist cluster state.",
        "Pods remain unscheduled because the scheduler cannot find eligible nodes.",
        "Controllers fail to reconcile resources because of permissions or dependency errors."
      ],
      "practicalTask": "Apply a Deployment manifest and trace the request through the API server, persisted object state, scheduler decision, controller reconciliation, and eventual Pod creation."
    },
    {
      "title": "Worker Nodes, Kubelet, Container Runtime, and Pod Lifecycle",
      "explanation": "Worker nodes provide the compute environment where Kubernetes Pods execute. The kubelet on each node receives Pod specifications and ensures that the required containers are running. A container runtime such as containerd or CRI-O creates and manages container processes through the Container Runtime Interface. The node also runs networking and storage components needed by Pods. A Pod groups one or more tightly coupled containers that share network identity and can share volumes.",
      "responsibilities": [
        "kubelet manages Pod lifecycle on its assigned worker node.",
        "Container runtime executes containers and manages their local lifecycle.",
        "Pod is the smallest deployable Kubernetes workload unit.",
        "Node status and conditions report readiness and resource pressure.",
        "CNI and storage components provide networking and volume integration."
      ],
      "implementation": [
        "Inspect node readiness with kubectl get nodes and kubectl describe node.",
        "Use kubectl describe pod and kubectl logs to diagnose container startup failures.",
        "Use kubectl exec only when a running container and access policy permit interactive inspection.",
        "Configure readiness, liveness, and startup probes for application behavior.",
        "Use appropriate requests and limits for containers in each Pod."
      ],
      "productionConsiderations": [
        "Maintain node capacity for system services and application workloads.",
        "Patch node operating systems and runtimes through a controlled maintenance process.",
        "Use multiple worker nodes for workloads requiring node-level fault tolerance.",
        "Monitor disk pressure, memory pressure, PID pressure, and kubelet health.",
        "Design shutdown behavior so workloads can terminate gracefully during node replacement."
      ],
      "failureModes": [
        "Node becomes NotReady because kubelet, runtime, network, or host health has failed.",
        "Pod enters CrashLoopBackOff because its process repeatedly exits.",
        "ImagePullBackOff occurs because image reference, credentials, or registry connectivity is wrong.",
        "A container is OOMKilled after exceeding available or configured memory.",
        "A probe repeatedly fails because its path, port, timing, or application behavior is incorrect."
      ],
      "practicalTask": "Inspect a worker node and one Pod from creation to readiness. Identify the kubelet, runtime, probe, and node condition evidence you would collect when the Pod repeatedly restarts."
    },
    {
      "title": "Workload Controllers, Desired State, and Scheduling",
      "explanation": "Kubernetes workload controllers maintain application state by comparing desired configuration with observed resources. A Deployment manages stateless replicas through ReplicaSets and supports controlled updates. StatefulSets provide stable identities and storage associations for stateful workloads. DaemonSets place a Pod on selected nodes, while Jobs and CronJobs manage finite or scheduled tasks. The scheduler evaluates resource requests, node selectors, affinity, taints, tolerations, and other constraints when assigning Pods to nodes.",
      "responsibilities": [
        "Deployment manages declarative stateless application rollouts and replicas.",
        "ReplicaSet maintains the requested number of matching Pods.",
        "StatefulSet provides stable identity and ordered lifecycle for stateful workloads.",
        "DaemonSet places node-level agents on selected worker nodes.",
        "Job and CronJob manage finite and scheduled workload execution.",
        "Scheduler evaluates resource and placement constraints."
      ],
      "implementation": [
        "Use Deployments for stateless services and configure replica counts and rollout strategy.",
        "Use StatefulSets when stable Pod identity and storage association are required.",
        "Use DaemonSets for node-level agents such as logging or monitoring collectors.",
        "Set CPU and memory requests based on workload needs to support scheduling.",
        "Use labels, selectors, affinity, taints, and tolerations to express placement requirements."
      ],
      "productionConsiderations": [
        "Set disruption budgets and rollout limits based on availability requirements.",
        "Avoid excessive resource requests that prevent otherwise healthy workloads from scheduling.",
        "Use topology spread constraints when replicas should be distributed across failure domains.",
        "Monitor rollout progress, unavailable replicas, scheduling events, and controller errors.",
        "Test stateful workload recovery and volume reattachment before production use."
      ],
      "failureModes": [
        "Pods remain Pending because no node satisfies resource or placement requirements.",
        "A Deployment rollout stalls because new Pods never become Ready.",
        "A selector mismatch causes a Service or controller to target no Pods.",
        "A DaemonSet does not run on nodes because of taints or node selectors.",
        "A stateful workload cannot recover because its persistent volume is unavailable."
      ],
      "practicalTask": "Deploy a three-replica application and introduce a node selector that no worker satisfies. Inspect scheduling events, correct the placement requirement, and verify that the controller reaches the desired replica count."
    },
    {
      "title": "Service Networking, DNS, Ingress, and Traffic Routing",
      "explanation": "Pod IP addresses can change as workloads are recreated, so applications generally need stable service discovery rather than direct Pod addressing. A Kubernetes Service selects matching Pods and provides a stable virtual access point. Cluster DNS allows workloads to discover Services by name. Ingress or Gateway resources, together with a suitable controller or implementation, provide external HTTP routing. The actual packet path depends on the cluster's CNI plugin and service datapath, which must be understood when troubleshooting network behavior.",
      "responsibilities": [
        "CNI plugin provides Pod network connectivity.",
        "Service selectors and endpoints connect stable service access to matching Pods.",
        "CoreDNS provides cluster DNS resolution.",
        "Ingress or Gateway resources define application traffic routing through an implementation.",
        "Network policies can restrict Pod-to-Pod communication when supported by the networking plugin."
      ],
      "implementation": [
        "Use ClusterIP for internal application service access.",
        "Use NodePort or LoadBalancer only when the exposure model requires it.",
        "Configure Ingress or Gateway with an installed controller and valid backend Services.",
        "Use labels and selectors consistently between workloads and Services.",
        "Apply network policies to define required ingress and egress paths where supported."
      ],
      "productionConsiderations": [
        "Expose only intended application endpoints and keep internal services private.",
        "Monitor CoreDNS, CNI health, Service endpoints, and load balancer target health.",
        "Test DNS and connectivity from the same namespace and network context as the affected workload.",
        "Plan for TLS certificates, DNS records, and external load balancer lifecycle.",
        "Avoid assuming every cluster uses identical kube-proxy or CNI packet handling."
      ],
      "failureModes": [
        "Service has no endpoints because labels or selectors do not match.",
        "DNS resolution fails because CoreDNS or upstream resolution is unhealthy.",
        "Ingress returns errors because its controller, backend service, or health path is incorrect.",
        "Network policy blocks required application traffic.",
        "Pod connectivity fails because CNI routes, address allocation, or node networking are broken."
      ],
      "practicalTask": "Expose a sample web Deployment through a ClusterIP Service and an Ingress implementation. Trace DNS resolution, Service endpoints, selected Pod, and the response path."
    },
    {
      "title": "Configuration, Secrets, Persistent Storage, and Application Reliability",
      "explanation": "Kubernetes separates application configuration and durable storage from the container image. ConfigMaps provide non-sensitive configuration, while Secrets represent sensitive values and require appropriate access and encryption controls. PersistentVolumeClaims request storage, and StorageClasses connect those requests to provisioners. Probes communicate different aspects of application health: startup probes protect slow initialization, readiness probes control whether traffic should be sent, and liveness probes help restart processes that cannot recover. These resources must be designed together with application behavior.",
      "responsibilities": [
        "ConfigMaps provide non-sensitive configuration to workloads.",
        "Secrets provide a Kubernetes API resource for sensitive configuration.",
        "PersistentVolumeClaims request storage independently from Pod lifecycle.",
        "StorageClasses describe storage provisioning behavior.",
        "Startup, readiness, and liveness probes provide distinct health signals."
      ],
      "implementation": [
        "Use ConfigMaps for non-sensitive settings and mount or inject them deliberately.",
        "Restrict Secret access through RBAC and enable suitable encryption at rest.",
        "Use PersistentVolumeClaims for data that must survive Pod replacement.",
        "Select StorageClasses based on access mode, performance, and recovery requirements.",
        "Tune probes to test application startup, traffic readiness, and unrecoverable process failure separately."
      ],
      "productionConsiderations": [
        "Back up persistent data and test restore into a separate environment.",
        "Avoid placing credentials in container images, plain-text manifests, or application logs.",
        "Verify storage topology and access modes before scheduling stateful replicas.",
        "Set probe timeouts and thresholds based on real startup and dependency behavior.",
        "Use graceful termination and suitable termination grace periods for application shutdown."
      ],
      "failureModes": [
        "Pod cannot mount a volume because the claim is pending or attachment fails.",
        "A Secret is unavailable because of namespace, RBAC, or configuration mistakes.",
        "An aggressive liveness probe repeatedly restarts an application during normal startup.",
        "A readiness probe remains false and removes every replica from service endpoints.",
        "Persistent data becomes unavailable after a storage backend or zone failure."
      ],
      "practicalTask": "Deploy an application using a ConfigMap, Secret, PVC, and all three probe types. Recreate its Pod and verify configuration delivery, readiness behavior, and data persistence."
    },
    {
      "title": "Cluster Security, Observability, and Operational Troubleshooting",
      "explanation": "A Kubernetes production platform needs layered security and observability across API access, workloads, nodes, network traffic, and storage. RBAC limits API operations, admission policies can enforce workload standards, and Pod Security Standards provide a framework for restricting unsafe Pod configurations. Logs, metrics, events, traces, and audit records reveal different aspects of runtime behavior. Effective troubleshooting begins by locating the failure boundary: API request, controller, scheduling, node, container, network, storage, or application dependency.",
      "responsibilities": [
        "RBAC controls access to Kubernetes API resources and operations.",
        "Pod Security Standards define baseline security expectations for workloads.",
        "Admission controls can enforce organization-specific workload policies.",
        "Metrics, logs, events, and traces provide complementary operational evidence.",
        "Audit records show who performed API actions and when."
      ],
      "implementation": [
        "Use namespace-scoped Roles and RoleBindings where cluster-wide access is unnecessary.",
        "Run containers as non-root and restrict privileged capabilities and host access.",
        "Collect application logs and cluster metrics through maintained observability components.",
        "Use events and resource descriptions to identify scheduling and lifecycle failures.",
        "Define alerts for unavailable replicas, node conditions, resource pressure, and application service levels."
      ],
      "productionConsiderations": [
        "Apply least privilege to human, automation, and service-account identities.",
        "Protect audit logs and sensitive telemetry from unauthorized access.",
        "Set resource quotas and limits to prevent one namespace from exhausting shared capacity.",
        "Test policy enforcement in non-production before applying restrictive controls broadly.",
        "Maintain incident runbooks that connect symptoms to evidence and safe recovery steps."
      ],
      "failureModes": [
        "Overly broad RBAC permits unauthorized changes to production resources.",
        "A privileged Pod or hostPath mount weakens node isolation.",
        "Resource exhaustion causes eviction, throttling, or cluster instability.",
        "Missing metrics or logs delay detection and root-cause analysis.",
        "A restrictive admission policy blocks legitimate workload deployment."
      ],
      "practicalTask": "Create a namespace with limited RBAC, resource quotas, and a workload security policy. Generate a permitted and denied API request, then inspect audit evidence, events, and workload telemetry."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Choose workload controller by application behavior",
      "guidance": "Use Deployments for stateless replicas, StatefulSets for stable identity and storage needs, DaemonSets for node agents, and Jobs or CronJobs for finite or scheduled tasks."
    },
    {
      "decision": "Choose network exposure and service discovery",
      "guidance": "Use Services for stable internal access and an installed Ingress or Gateway implementation for external routing. Validate CNI and service datapath behavior rather than assuming all clusters are identical."
    },
    {
      "decision": "Choose storage and health semantics",
      "guidance": "Use PVCs for durable data and define startup, readiness, and liveness probes according to their distinct purposes. Validate backups and recovery, not just successful mounting."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What are the main Kubernetes control-plane components?",
      "answer": "The API server exposes the Kubernetes API, etcd stores cluster state, the scheduler assigns eligible Pods to nodes, and the controller manager runs reconciliation loops that maintain desired state. Together these components coordinate the cluster. Worker nodes then execute the assigned Pods through kubelet and a container runtime."
    },
    {
      "question": "What is the difference between a Pod and a Deployment?",
      "answer": "A Pod is the smallest deployable Kubernetes unit and contains one or more closely related containers that share network and storage context. A Deployment is a higher-level controller for managing stateless application replicas through ReplicaSets. It supports desired replica counts and controlled updates, so operators normally manage application replicas through Deployments rather than creating individual Pods manually."
    },
    {
      "question": "How does Kubernetes provide stable application networking?",
      "answer": "Pod addresses can change when Pods are recreated. A Kubernetes Service provides a stable virtual access point and selects matching Pods through labels and selectors. Cluster DNS allows clients to discover Services by name. Ingress or Gateway implementations can route external traffic to Services according to configured rules."
    },
    {
      "question": "What is the difference between readiness, liveness, and startup probes?",
      "answer": "A startup probe determines whether an application has completed its startup phase and can protect slow-starting containers from premature liveness checks. A readiness probe determines whether a Pod should receive traffic. A liveness probe detects a process that should be restarted. These probes have different purposes and should test appropriate application behavior."
    },
    {
      "question": "How do you troubleshoot a Pod stuck in Pending state?",
      "answer": "Start with kubectl describe pod and inspect its events. Check whether the cluster has enough CPU and memory, whether node selectors or affinity rules match available nodes, and whether taints have suitable tolerations. Also inspect PVC binding, storage topology, quota restrictions, and node readiness. The event messages usually identify which scheduling or prerequisite condition is blocking placement."
    }
  ]
},
  "jenkins": {
  "title": "Jenkins CI/CD Architecture",
  "subtitle": "A scalable automation architecture from source commit to verified production release",
  "summary": "Jenkins is an automation server that coordinates continuous integration and continuous delivery. Its architecture separates the controller, which manages jobs and scheduling, from agents that execute builds and deployments. Production implementations use Pipeline as Code, isolated execution environments, controlled credentials, immutable artifacts, quality gates, deployment approvals and recoverable controller state. A reliable design ensures that every release can be traced to source code, validated before promotion and recovered when deployment health deteriorates.",
  "objectives": [
    "Understand Jenkins controller, agents, executors, jobs and plugins.",
    "Design isolated and scalable build-agent infrastructure.",
    "Implement a complete Jenkins Pipeline as Code workflow.",
    "Secure credentials, promote immutable artifacts and recover production deployments."
  ],
  "diagram": [
    "Developer commit → Git repository and webhook",
    "Jenkins controller → Pipeline scheduling and orchestration",
    "Build agents → Checkout, compile, test and scan",
    "Artifact repository or container registry → Immutable artifact",
    "Staging deployment → Integration and smoke tests",
    "Approval gate → Production deployment",
    "Health verification → Release evidence and rollback readiness"
  ],
  "sections": [
    {
      "title": "Controller and Agent Architecture",
      "explanation": "The Jenkins controller stores pipeline configuration, schedules jobs, tracks execution and provides the management interface. Agents execute the actual build and deployment workload. This separation is important because compilation, container image creation and test execution can consume substantial CPU, memory and disk capacity. Running these workloads on the controller can delay scheduling and make the automation platform unstable. Production installations normally assign work to labelled agents, use dedicated execution environments and keep the controller focused on orchestration. Agent provisioning can be static or ephemeral depending on workload demand and isolation requirements.",
      "responsibilities": [
        "Keep orchestration responsibilities on the controller.",
        "Execute builds on dedicated agents.",
        "Use labels to route jobs to appropriate toolchains.",
        "Separate untrusted pull-request jobs from privileged release jobs."
      ],
      "implementation": [
        "Configure durable Jenkins home storage.",
        "Register agents using a secured connection method.",
        "Create labels for Linux, Docker and deployment workloads.",
        "Set executor limits according to CPU and memory capacity."
      ],
      "productionConsiderations": [
        "Monitor controller heap, disk, queue length and agent connectivity.",
        "Keep controller plugins and core versions tested together.",
        "Prefer disposable agents for untrusted or inconsistent workloads.",
        "Back up Jenkins configuration and validate restoration."
      ],
      "failureModes": [
        "Controller overload delays every pipeline.",
        "Offline agents leave jobs waiting.",
        "Excessive executors exhaust memory and CPU.",
        "A compromised agent may expose workspace data or credentials."
      ],
      "practicalTask": "Create separate build and deployment agent labels, execute a sample pipeline on each and verify that the controller is not processing application builds."
    },
    {
      "title": "Pipeline as Code and Stage Design",
      "explanation": "Jenkins Pipeline as Code stores the delivery workflow in a Jenkinsfile alongside application source. Declarative Pipeline provides a structured definition of agents, stages, environment values, conditions, options and post-build behavior. A production pipeline should represent meaningful engineering gates such as checkout, compilation, unit testing, dependency analysis, image creation and deployment. Stage boundaries make failures visible and allow teams to determine which validation failed. Pipeline definitions should be reviewed like application code, and privileged deployment behavior must not be exposed to arbitrary pull-request modifications.",
      "responsibilities": [
        "Version pipeline definitions with the application.",
        "Represent build and validation gates as explicit stages.",
        "Use conditional execution for branch-specific activities.",
        "Keep privileged deployment stages restricted to trusted revisions."
      ],
      "implementation": [
        "Create a Jenkinsfile in the repository root.",
        "Define checkout, build, test and package stages.",
        "Use stage-level agent labels when tools differ.",
        "Add timeouts, controlled retries and post actions."
      ],
      "productionConsiderations": [
        "Pin build tool versions and trusted execution images.",
        "Record source commit and pipeline revision.",
        "Fail promotion when mandatory tests or scans fail.",
        "Review shared-library changes before broad rollout."
      ],
      "failureModes": [
        "Invalid Jenkinsfile syntax prevents pipeline execution.",
        "Incorrect labels leave stages queued.",
        "Unlimited retries hide persistent failures.",
        "Untrusted pipeline changes may attempt to access secrets."
      ],
      "practicalTask": "Create a Jenkinsfile that builds an application, runs unit tests, archives test reports and prevents packaging when tests fail."
    },
    {
      "title": "Artifact Management and Release Promotion",
      "explanation": "A production delivery system should build an artifact once and promote that exact artifact through development, staging and production. Rebuilding separately for each environment can produce different binaries because dependencies, build tools or source revisions may change. Container images should be tagged with a commit identifier and recorded by digest. Jenkins should publish artifacts to an approved registry, preserve their metadata and deploy the verified artifact to each environment. Environment-specific configuration should be injected separately. A release should include health verification and a recovery route to the previously working artifact.",
      "responsibilities": [
        "Publish artifacts to controlled repositories.",
        "Associate artifacts with commit and build metadata.",
        "Promote the same artifact across environments.",
        "Maintain a known-good release for rollback."
      ],
      "implementation": [
        "Build an immutable image using the source commit.",
        "Push the image to an approved registry.",
        "Capture its digest and deployment metadata.",
        "Deploy to staging, verify health and promote the digest."
      ],
      "productionConsiderations": [
        "Use separate deployment identities for each environment.",
        "Require approvals for sensitive production releases.",
        "Use rolling or canary deployment where appropriate.",
        "Retain previous artifacts and deployment configuration."
      ],
      "failureModes": [
        "Mutable tags may deploy unexpected versions.",
        "Registry outages interrupt release execution.",
        "Environment configuration drift causes inconsistent behavior.",
        "A completed deployment command may still leave the service unhealthy."
      ],
      "practicalTask": "Publish one container image and deploy the same digest to staging and production, then demonstrate rollback to the previous digest."
    },
    {
      "title": "Security, Monitoring and Disaster Recovery",
      "explanation": "Jenkins can access source repositories, package registries, cloud accounts and production infrastructure, making it a critical automation control plane. Security requires controlled authentication, role-based authorization, limited credential scope, plugin governance and isolation between workloads. Operational reliability requires monitoring controller health, agent availability, build queues, disk capacity and job outcomes. Backups should cover Jenkins home and required configuration, with secrets handled according to organizational policy. Recovery procedures must be tested because a backup that has never been restored is not proven recovery capability.",
      "responsibilities": [
        "Integrate centralized identity and authorization.",
        "Store secrets in Jenkins Credentials or an approved vault.",
        "Monitor controller, agents, queues and build outcomes.",
        "Maintain and test controller recovery backups."
      ],
      "implementation": [
        "Restrict administrative permissions.",
        "Bind credentials only to required pipeline stages.",
        "Back up configuration and persistent Jenkins data.",
        "Test restoration and representative pipeline execution."
      ],
      "productionConsiderations": [
        "Review plugin updates before production rollout.",
        "Patch controller and agent operating systems.",
        "Restrict network exposure of the controller.",
        "Define recovery objectives and incident ownership."
      ],
      "failureModes": [
        "Leaked credentials enable unauthorized deployments.",
        "Plugin incompatibility can prevent startup.",
        "Incomplete backups cause lengthy recovery.",
        "Agent disk exhaustion interrupts otherwise healthy pipelines."
      ],
      "practicalTask": "Prepare an operational checklist covering authentication, credentials, plugins, queue health, agent capacity, disk usage and a tested restore procedure."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Static or ephemeral agents",
      "guidance": "Use static agents for stable specialist workloads and ephemeral agents for elastic capacity and stronger workspace isolation."
    },
    {
      "decision": "Controller or agent execution",
      "guidance": "Keep application builds on agents so controller scheduling and management remain responsive."
    },
    {
      "decision": "Rebuild or promote artifacts",
      "guidance": "Build once and promote immutable artifacts to preserve consistency and traceability."
    }
  ],
  "interviewQuestions": [
    {
      "question": "Why should Jenkins builds run on agents?",
      "answer": "Agents isolate build resource consumption from controller orchestration. This improves controller responsiveness, supports different toolchains and makes execution capacity easier to scale. It also provides a useful isolation boundary between untrusted validation jobs and trusted production releases."
    },
    {
      "question": "What is Jenkins Pipeline as Code?",
      "answer": "Pipeline as Code defines build, test and deployment workflows in a version-controlled Jenkinsfile. Teams can review pipeline changes, reproduce execution and maintain delivery logic alongside application source instead of relying entirely on manually configured jobs."
    },
    {
      "question": "How do you promote the same artifact across environments?",
      "answer": "Build once, publish an immutable artifact and record its digest. Deploy that same digest to development, staging and production while supplying environment-specific configuration separately. This avoids differences caused by rebuilding the application for each environment."
    },
    {
      "question": "How do you recover a failed Jenkins controller?",
      "answer": "Restore Jenkins home and required configuration from a verified backup, restore compatible plugins and credentials, restart the controller and reconnect agents. Validate representative pipelines before returning production release operations to normal."
    }
  ]
},
  "github-actions": {
  "title": "GitHub Actions Architecture",
  "subtitle": "Event-driven CI/CD with workflows, runners, reusable automation and protected deployments",
  "summary": "GitHub Actions automates repository workflows in response to events such as pushes, pull requests, releases and manual dispatch. Workflow YAML defines jobs, dependencies, permissions and execution environments. Runners execute the work, while actions and reusable workflows provide repeatable automation. A production design requires least-privilege tokens, trusted action dependencies, protected environments, isolated self-hosted runners, artifact traceability and controlled cloud authentication. The release process should connect a source commit to a tested immutable artifact and an auditable deployment.",
  "objectives": [
    "Understand events, workflows, jobs, steps, actions and runners.",
    "Design job dependency graphs and reusable workflows.",
    "Secure workflow tokens, action dependencies and runner environments.",
    "Implement artifact publication and protected production deployment."
  ],
  "diagram": [
    "Push, pull request, release or manual event",
    "Workflow YAML and event filters",
    "Job dependency graph and runner selection",
    "Checkout → build → test → scan",
    "Publish artifact or immutable container image",
    "Protected environment approval",
    "Deployment verification and release evidence"
  ],
  "sections": [
    {
      "title": "Event Triggers and Workflow Dependency Graph",
      "explanation": "GitHub Actions starts workflows when configured repository or external events occur. Common triggers include push, pull_request, release, schedule and workflow_dispatch. Workflow filters control branches, tags and paths. Each workflow contains jobs, and each job runs on a selected runner. Steps execute sequentially within the same job workspace, while jobs provide separate scheduling and execution boundaries. The needs property creates dependencies between jobs and can enable parallel execution when prerequisites are satisfied. Concurrency controls prevent conflicting workflows from modifying the same deployment target.",
      "responsibilities": [
        "Select events that match repository delivery policy.",
        "Use branch and path filters to control execution.",
        "Express dependencies through needs.",
        "Control duplicate or overlapping workflow runs."
      ],
      "implementation": [
        "Create YAML files under .github/workflows.",
        "Define pull-request and protected-branch triggers.",
        "Make deployment depend on successful validation jobs.",
        "Configure concurrency groups for shared deployment environments."
      ],
      "productionConsiderations": [
        "Keep required status checks stable.",
        "Avoid broad triggers that waste runner capacity.",
        "Keep production jobs restricted to trusted refs.",
        "Review workflow changes as application code."
      ],
      "failureModes": [
        "Incorrect filters skip required validation.",
        "Missing dependencies allow premature deployment.",
        "Overlapping runs can race against each other.",
        "Invalid expressions or YAML prevent expected workflow execution."
      ],
      "practicalTask": "Create a workflow with build, test and deployment jobs. Connect dependencies with needs and verify that deployment cannot run when tests fail."
    },
    {
      "title": "Runner Architecture and Reusable Automation",
      "explanation": "A GitHub Actions runner is the execution environment for a job. GitHub-hosted runners provide managed machines, while self-hosted runners provide access to private networks, specialized hardware or organization-controlled environments. Actions package reusable automation, and reusable workflows standardize complete job sequences. Runner selection should consider trust level, network access, toolchain requirements and resource capacity. A self-hosted runner that processes untrusted pull requests can expose internal services or persistent data, so runner groups, repository restrictions and cleanup controls are essential.",
      "responsibilities": [
        "Choose hosted or self-hosted execution deliberately.",
        "Use runner labels for workload placement.",
        "Reuse reviewed actions and approved workflow templates.",
        "Separate untrusted and privileged runner pools."
      ],
      "implementation": [
        "Configure runs-on with suitable runner labels.",
        "Use reusable workflows for shared pipeline standards.",
        "Restrict self-hosted runner groups to approved repositories.",
        "Prefer disposable runner instances for sensitive workloads."
      ],
      "productionConsiderations": [
        "Pin critical third-party actions to reviewed commit SHAs.",
        "Patch runner images and remove workspaces after jobs.",
        "Monitor queue time and runner utilization.",
        "Avoid sharing privileged runners with untrusted code."
      ],
      "failureModes": [
        "Persistent workspaces can leak data between jobs.",
        "A compromised action can access job permissions.",
        "Missing private network routes cause deployment failures.",
        "Runner pool exhaustion leaves jobs queued."
      ],
      "practicalTask": "Compare a hosted runner with a self-hosted runner and verify the differences in network access, isolation, setup and cleanup."
    },
    {
      "title": "Secure Build and Artifact Supply Chain",
      "explanation": "Workflow permissions determine what repository resources a job can access through its token. A secure pipeline grants only the permissions needed by each job and avoids exposing secrets to untrusted code. Build outputs should be passed through explicit workflow artifacts or published to a controlled registry. Container images should use immutable identifiers and be scanned before release. Third-party actions are executable dependencies and should be reviewed and pinned. Cloud access should use short-lived identity federation where supported rather than permanent credentials stored in repository secrets.",
      "responsibilities": [
        "Apply least-privilege GITHUB_TOKEN permissions.",
        "Transfer build outputs explicitly between jobs.",
        "Scan source dependencies and container images.",
        "Record commit, workflow run and artifact digest."
      ],
      "implementation": [
        "Set explicit permissions at workflow and job scope.",
        "Publish build artifacts or container images.",
        "Capture image digests for downstream deployment.",
        "Use OIDC federation for supported cloud providers."
      ],
      "productionConsiderations": [
        "Pin trusted action versions by commit SHA.",
        "Scope secrets to protected environments.",
        "Prevent secrets from appearing in logs.",
        "Verify artifact provenance before deployment."
      ],
      "failureModes": [
        "Over-permissioned tokens allow unintended repository changes.",
        "Mutable tags can resolve to unexpected image content.",
        "Exposed secrets remain a risk in workflow logs.",
        "Untrusted pull-request code may attempt secret access."
      ],
      "practicalTask": "Build and publish an image, capture its digest, restrict token permissions and ensure the deployment job consumes the recorded digest."
    },
    {
      "title": "Protected Environments and Deployment Governance",
      "explanation": "GitHub Actions environments create deployment boundaries where secrets and protection rules can be applied. A production job should target a protected environment after all mandatory validation jobs pass. Required reviewers can provide an approval checkpoint, and concurrency groups prevent simultaneous deployment runs from racing. Cloud deployments can use OIDC claims to obtain short-lived credentials constrained to a repository, branch or environment. Post-deployment verification should check application health rather than relying only on a successful deployment command. Rollback should reuse a previously verified artifact.",
      "responsibilities": [
        "Model staging and production as separate environments.",
        "Require approval for sensitive releases.",
        "Serialize deployment to shared targets.",
        "Verify application health and record release identity."
      ],
      "implementation": [
        "Configure protected environment rules.",
        "Scope secrets to the relevant environment.",
        "Use stable deployment concurrency groups.",
        "Run smoke tests after deployment."
      ],
      "productionConsiderations": [
        "Restrict production approvers and deployment permissions.",
        "Constrain cloud OIDC trust policies.",
        "Retain previous verified artifacts.",
        "Alert on failed health checks."
      ],
      "failureModes": [
        "Incorrect protection settings bypass approval.",
        "Missing concurrency permits overlapping releases.",
        "Broad OIDC trust allows unintended identities.",
        "A deployment can succeed while the application remains unhealthy."
      ],
      "practicalTask": "Configure a protected production environment, require approval and verify service health after deployment of an immutable artifact."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Hosted or self-hosted runners",
      "guidance": "Use hosted runners for standard workloads and self-hosted runners only for justified private-network, compliance or hardware requirements."
    },
    {
      "decision": "Action tags or commit SHA",
      "guidance": "Pin critical third-party actions to reviewed full commit SHAs to reduce dependency drift."
    },
    {
      "decision": "Static cloud keys or OIDC",
      "guidance": "Prefer short-lived OIDC credentials when supported by the cloud provider and organizational trust model."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is the difference between a job and a step?",
      "answer": "A job is a scheduling unit that executes on a runner and can depend on other jobs. Steps run sequentially inside the job and share its workspace. Separate jobs provide stronger execution isolation and can use different runner environments."
    },
    {
      "question": "Why should workflow permissions be restricted?",
      "answer": "Workflow tokens can access repository resources. Excessive permissions increase the impact of compromised workflow code or third-party actions. Explicit least-privilege permissions limit what a job can change or read."
    },
    {
      "question": "How can GitHub Actions authenticate to AWS without permanent keys?",
      "answer": "A workflow can request an OIDC token. AWS validates the token claims against a configured IAM trust relationship and provides short-lived role credentials. The trust policy should restrict repository, branch and environment claims."
    },
    {
      "question": "How do you prevent simultaneous production deployments?",
      "answer": "Configure a concurrency group associated with the production environment. This coordinates workflows targeting the same environment and applies the selected queue or cancellation behavior."
    }
  ]
},
  "gitlab-ci": {
  "title": "GitLab CI Architecture",
  "subtitle": "Pipeline orchestration with stages, DAG dependencies, runners and governed releases",
  "summary": "GitLab CI/CD defines delivery pipelines through .gitlab-ci.yml. GitLab evaluates workflow and job rules, creates stages and dependencies, schedules work and records deployment environments. GitLab Runners execute jobs using Docker, Kubernetes, shell or other supported executors. Production architecture must define runner trust boundaries, artifact retention, cache behavior, protected variables and deployment approvals. A well-designed pipeline creates an immutable artifact, verifies it and promotes the same version through controlled environments with traceable evidence.",
  "objectives": [
    "Understand pipeline creation, stages, jobs, rules and needs.",
    "Design runner pools and executor isolation.",
    "Manage artifacts, cache and container registry delivery.",
    "Secure variables, environments and production release workflows."
  ],
  "diagram": [
    "Commit, merge request, tag or scheduled event",
    ".gitlab-ci.yml evaluation and workflow rules",
    "Stage and DAG dependency creation",
    "GitLab scheduler → eligible GitLab Runner",
    "Build → test → scan → package",
    "Artifact registry → staging → production approval",
    "Health verification and deployment record"
  ],
  "sections": [
    {
      "title": "Pipeline Creation, Stages and DAG Execution",
      "explanation": "GitLab evaluates .gitlab-ci.yml to construct a pipeline for a commit or event. Stages provide broad execution ordering, with jobs in later stages normally waiting for earlier stages to finish. The needs keyword creates direct dependencies and allows jobs to start when their actual prerequisites complete. Rules determine whether a job is included for a branch, merge request, tag or changed path. Workflow rules control pipeline creation itself. These mechanisms should be designed together to avoid duplicate pipelines, missing validation and deployment jobs running for untrusted revisions.",
      "responsibilities": [
        "Define clear pipeline triggers and branch policies.",
        "Use stages for lifecycle boundaries.",
        "Use needs for direct job dependencies and parallelism.",
        "Prevent duplicate or unintended pipeline creation."
      ],
      "implementation": [
        "Create .gitlab-ci.yml in the repository root.",
        "Define build, test, scan and deploy stages.",
        "Use needs to express exact prerequisites.",
        "Validate configuration using GitLab CI Lint."
      ],
      "productionConsiderations": [
        "Keep production jobs restricted to protected refs.",
        "Review included templates and inherited rules.",
        "Make mandatory quality gates explicit.",
        "Measure pipeline duration and optimize independent work."
      ],
      "failureModes": [
        "Incorrect rules omit required jobs.",
        "Invalid needs references prevent pipeline creation.",
        "Wrong stage placement changes execution order.",
        "Duplicate event pipelines waste capacity."
      ],
      "practicalTask": "Create build and test jobs with a package job that depends on both. Validate the pipeline configuration and inspect its dependency graph."
    },
    {
      "title": "Runner Pools and Executor Isolation",
      "explanation": "GitLab Runners retrieve assigned jobs and execute them using configured executors. Docker executors provide container-based job environments, Kubernetes executors create job pods, and shell executors run directly on the runner host. Executor choice affects isolation, networking, tool installation and cleanup. Runner tags route jobs to suitable pools, but tags alone do not enforce security. Protected runner settings, project access restrictions and protected refs are required to keep privileged release workloads away from untrusted code. Capacity planning should account for concurrency, CPU, memory and temporary storage.",
      "responsibilities": [
        "Choose executors based on isolation and workload needs.",
        "Use tags to route jobs to suitable runners.",
        "Separate privileged deployment runners.",
        "Restrict runner access to approved projects and refs."
      ],
      "implementation": [
        "Register runners using controlled authentication.",
        "Configure Docker or Kubernetes executors with resource limits.",
        "Use dedicated tags for build and release jobs.",
        "Set concurrency according to available capacity."
      ],
      "productionConsiderations": [
        "Avoid privileged container execution without justification.",
        "Patch runner hosts and execution images.",
        "Use ephemeral workers for untrusted workloads.",
        "Monitor pending jobs and runner resource consumption."
      ],
      "failureModes": [
        "Missing tags leave jobs pending.",
        "Shell workspaces can leak state between jobs.",
        "Privileged containers may expose the host.",
        "Runner saturation increases pipeline queue time."
      ],
      "practicalTask": "Configure a dedicated runner tag for deployment and verify that only protected release jobs can access its runner pool."
    },
    {
      "title": "Artifacts, Cache and Registry Delivery",
      "explanation": "GitLab artifacts preserve outputs such as packages, test reports and generated metadata for downstream jobs or later inspection. Cache is intended to accelerate repeatable work, commonly dependency downloads, and should not be the only source of a required release output. Cache keys should reflect dependency lockfiles or toolchain versions to reduce stale reuse. Container images should be published to a controlled registry with immutable identifiers. Artifact retention and registry cleanup must be designed around release audit and rollback requirements.",
      "responsibilities": [
        "Use artifacts for required job outputs and reports.",
        "Use cache for repeatable dependency acceleration.",
        "Publish images to an approved container registry.",
        "Retain release outputs for recovery and audit."
      ],
      "implementation": [
        "Declare artifact paths and expiration policies.",
        "Use lockfile-aware cache keys.",
        "Pass required outputs through explicit job dependencies.",
        "Capture the published image digest."
      ],
      "productionConsiderations": [
        "Do not store secrets in artifacts or cache.",
        "Retain rollback artifacts for an agreed period.",
        "Avoid mutable image tags as deployment identity.",
        "Review registry retention and cleanup rules."
      ],
      "failureModes": [
        "Expired artifacts break later deployment jobs.",
        "Broad cache keys restore incompatible dependencies.",
        "Incorrect artifact paths produce missing outputs.",
        "Registry quota or authentication failures block publishing."
      ],
      "practicalTask": "Build an application, cache its dependencies, publish a test report and pass the resulting artifact to a downstream packaging job."
    },
    {
      "title": "Protected Environments and Production Delivery",
      "explanation": "GitLab environments represent deployment targets and provide visibility into deployed versions. Deployment jobs can be automatic or manual according to branch and release policy. Protected variables limit sensitive configuration to trusted refs, while protected environments and approval rules provide additional production controls. A release should deploy an artifact already built and tested rather than rebuild a different version for production. The environment record should identify the source commit, image digest, deployment result and responsible pipeline so operators can investigate incidents and recover previous versions.",
      "responsibilities": [
        "Represent staging and production as explicit environments.",
        "Restrict deployment jobs to trusted refs.",
        "Protect sensitive variables and credentials.",
        "Record artifact identity and deployment result."
      ],
      "implementation": [
        "Declare environment names in deployment jobs.",
        "Use protected variables for sensitive configuration.",
        "Require approval for production where appropriate.",
        "Deploy immutable image digests and verify health."
      ],
      "productionConsiderations": [
        "Use short-lived deployment credentials where supported.",
        "Restrict who can approve production changes.",
        "Keep previous artifacts available for rollback.",
        "Monitor the service after deployment."
      ],
      "failureModes": [
        "Unprotected variables expose deployment credentials.",
        "Manual jobs can block releases without clear ownership.",
        "Incorrect environment names distort deployment history.",
        "Successful job status does not guarantee application health."
      ],
      "practicalTask": "Deploy a verified image to staging, then require a protected manual production deployment and run a health check."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Stages or needs-based DAG",
      "guidance": "Use stages for broad lifecycle ordering and needs for direct dependencies that improve parallel execution."
    },
    {
      "decision": "Docker or Kubernetes executor",
      "guidance": "Choose Docker for simpler containerized jobs and Kubernetes for elastic pod-based execution when cluster operations are justified."
    },
    {
      "decision": "Cache or artifacts",
      "guidance": "Use cache to accelerate dependency retrieval and artifacts to preserve required outputs and release evidence."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is the difference between GitLab cache and artifacts?",
      "answer": "Cache accelerates repeated work by reusing dependencies or downloads. Artifacts preserve job outputs such as packages and reports and make them available to downstream jobs or users. Required release outputs should be artifacts."
    },
    {
      "question": "What does needs do in GitLab CI?",
      "answer": "The needs keyword defines direct job dependencies. It allows a downstream job to begin when its required upstream jobs finish instead of waiting for every job in an earlier stage, reducing pipeline duration."
    },
    {
      "question": "Why can a GitLab job remain pending?",
      "answer": "A job may not have an available online runner with matching tags, the runner may not be allowed to serve the project or protected ref, or the runner concurrency limit may be exhausted. Runner eligibility and capacity should be checked."
    },
    {
      "question": "How do you protect production variables?",
      "answer": "Use protected variables, protected branches or tags, restricted deployment jobs and protected runners. Scope credentials to the required environment and avoid printing secret values in job logs."
    }
  ]
},
  "argo-cd": {
  "title": "Argo CD GitOps Architecture",
  "subtitle": "Declarative Kubernetes delivery through Git-driven continuous reconciliation",
  "summary": "Argo CD is a GitOps continuous delivery controller for Kubernetes. Git stores the desired application configuration, while Argo CD compares that desired state with live cluster resources and reconciles differences. The architecture includes API services, a repository server and an application controller. Production implementations define clear repository ownership, Application and AppProject boundaries, synchronization policies, secret management, cluster permissions and recovery workflows. CI builds and publishes application artifacts; Git changes describe the desired deployment, and Argo CD applies those changes through its reconciliation loop.",
  "objectives": [
    "Understand Argo CD components and the GitOps reconciliation model.",
    "Design repository structures and Application resources.",
    "Configure sync, pruning, self-healing and health assessment safely.",
    "Secure multi-cluster deployment and recover through Git history."
  ],
  "diagram": [
    "Source commit → CI build, test and scan",
    "Immutable image published to registry",
    "CI updates desired image digest in Git",
    "Argo CD repository server renders manifests",
    "Application controller compares Git and live cluster state",
    "Synchronization applies resources through Kubernetes API",
    "Health assessment, drift detection and Git-based recovery"
  ],
  "sections": [
    {
      "title": "Argo CD Components and Reconciliation Loop",
      "explanation": "Argo CD follows a pull-based GitOps model. The API server provides the user and automation interface, the repository server retrieves Git content and renders manifests, and the application controller compares desired configuration with live Kubernetes resources. An Application resource defines the source repository, revision and path along with the destination cluster and namespace. The controller continuously evaluates the relationship between desired and live state. Sync status indicates configuration alignment, while health status evaluates resource operation. Both signals are needed to understand a deployment.",
      "responsibilities": [
        "Use Git as the authoritative desired-state source.",
        "Define Applications for repository and cluster destinations.",
        "Understand manifest rendering and reconciliation separately.",
        "Monitor synchronization and health independently."
      ],
      "implementation": [
        "Install Argo CD in a dedicated namespace.",
        "Create an Application with source and destination settings.",
        "Connect the repository using controlled credentials.",
        "Inspect sync and health through the UI or CLI."
      ],
      "productionConsiderations": [
        "Use highly available control-plane components where justified.",
        "Restrict Application destinations.",
        "Use read-only repository access where possible.",
        "Monitor controller latency and rendering failures."
      ],
      "failureModes": [
        "Repository server failure prevents fresh manifest rendering.",
        "Controller failure delays reconciliation.",
        "Wrong destination settings target the wrong cluster.",
        "Invalid manifests prevent comparison and synchronization."
      ],
      "practicalTask": "Install Argo CD in a test cluster, create an Application and observe desired state, live state, sync status and health status."
    },
    {
      "title": "Git Repository Structure and Manifest Rendering",
      "explanation": "Argo CD can render plain Kubernetes manifests, Helm charts and Kustomize configurations from a Git repository. Repository structure should make application ownership and environment differences explicit. Reusable base manifests can be combined with environment overlays so staging and production share common definitions without hiding important differences. CI should build and scan the application image, then update an immutable image reference in the configuration repository. Argo CD detects the Git change and reconciles the cluster. This keeps build responsibilities in CI and desired deployment state in version control.",
      "responsibilities": [
        "Separate reusable configuration from environment overlays.",
        "Choose Helm, Kustomize or plain manifests deliberately.",
        "Keep image changes reviewable in Git.",
        "Promote tested configuration through controlled changes."
      ],
      "implementation": [
        "Create a repository with base and environment-specific paths.",
        "Configure Application source path and revision.",
        "Use Helm values or Kustomize patches for differences.",
        "Update image digests through reviewed Git changes."
      ],
      "productionConsiderations": [
        "Never commit plaintext secrets.",
        "Pin chart versions and external dependencies.",
        "Review rendered manifests before production promotion.",
        "Avoid unmanaged manual cluster changes."
      ],
      "failureModes": [
        "Wrong paths produce missing resources.",
        "Invalid chart values prevent rendering.",
        "Broad overlays unintentionally alter production.",
        "Mutable image tags weaken deployment reproducibility."
      ],
      "practicalTask": "Create base manifests and staging and production overlays. Update an image digest in Git and verify the rendered resources for both environments."
    },
    {
      "title": "Sync Policies, Drift and Health Management",
      "explanation": "Argo CD compares rendered desired state with live Kubernetes resources and identifies whether an Application is Synced or OutOfSync. Synchronization can be manual or automated. Automated pruning removes resources no longer present in Git, while self-healing attempts to correct live drift. These features support Git as the source of truth but can have significant operational consequences if resource ownership is unclear. Health assessment evaluates whether deployed resources are operational, and sync waves or hooks can control ordering for dependencies. Production teams should test these behaviors before enabling automatic deletion or correction.",
      "responsibilities": [
        "Select manual or automated sync according to risk.",
        "Understand deletion behavior before enabling pruning.",
        "Use self-healing where Git must remain authoritative.",
        "Monitor resource health after synchronization."
      ],
      "implementation": [
        "Configure sync policy for each Application.",
        "Enable pruning only after ownership review.",
        "Test self-healing in a non-production namespace.",
        "Use sync waves for deliberate dependency ordering."
      ],
      "productionConsiderations": [
        "Alert on persistent OutOfSync and Degraded states.",
        "Avoid multiple controllers managing the same fields.",
        "Validate health checks against actual readiness.",
        "Document emergency manual change procedures."
      ],
      "failureModes": [
        "Pruning may delete an important resource.",
        "Self-healing may revert an emergency change.",
        "Incorrect health checks report false readiness.",
        "Conflicting field ownership creates repeated drift."
      ],
      "practicalTask": "Test manual sync, automated sync, pruning and self-healing in a disposable namespace and record the effects of each operation."
    },
    {
      "title": "Projects, Multi-Cluster Security and Recovery",
      "explanation": "Argo CD can manage applications across multiple Kubernetes clusters, which requires strict boundaries around repositories, destinations and resource permissions. AppProjects restrict allowed source repositories, target clusters, namespaces and resource kinds. Kubernetes RBAC controls the permissions used to apply resources. Repository and cluster credentials must be protected and rotated, and secrets should be delivered through an approved external secret-management workflow rather than stored in plaintext. Recovery normally occurs through a reviewed Git revert or a new desired-state commit, allowing the controller to reconcile the cluster to a known configuration.",
      "responsibilities": [
        "Use Projects to enforce team and environment boundaries.",
        "Apply least-privilege Kubernetes access.",
        "Manage secrets outside plaintext manifests.",
        "Recover deployments through traceable Git changes."
      ],
      "implementation": [
        "Create Projects with explicit source and destination permissions.",
        "Register clusters with controlled identities.",
        "Integrate an approved external secret solution.",
        "Revert faulty desired-state commits and verify reconciliation."
      ],
      "productionConsiderations": [
        "Protect API access using SSO and RBAC.",
        "Rotate repository and cluster credentials.",
        "Audit sync operations and emergency overrides.",
        "Back up declarative configuration and test recovery."
      ],
      "failureModes": [
        "Broad Project permissions enable unintended deployment targets.",
        "Leaked cluster credentials compromise managed resources.",
        "Plaintext secrets remain in repository history.",
        "Manual emergency changes are reverted when Git remains unchanged."
      ],
      "practicalTask": "Create Projects with different destination permissions, test an unauthorized deployment and recover a faulty change using Git revert."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Automated or manual synchronization",
      "guidance": "Use automated sync for trusted and tested delivery paths; retain approval gates for high-risk production releases."
    },
    {
      "decision": "Pruning and self-healing",
      "guidance": "Enable these only after resource ownership, deletion impact and emergency procedures are tested."
    },
    {
      "decision": "CI deployment commands or GitOps",
      "guidance": "Let CI build and publish artifacts and update Git; let Argo CD reconcile Kubernetes to the declared desired state."
    }
  ],
  "interviewQuestions": [
    {
      "question": "How is Argo CD different from a push-based deployment pipeline?",
      "answer": "A push-based pipeline connects to a cluster and sends deployment commands. Argo CD uses a pull-based reconciliation model: it retrieves desired state from Git, compares it with live resources and applies the required changes from its cluster-side control plane."
    },
    {
      "question": "What is the difference between Synced and Healthy?",
      "answer": "Synced means live resources match the desired configuration rendered from Git. Healthy describes whether resources meet their operational health assessment. An Application can be Synced but Degraded when its workloads are not ready or functioning."
    },
    {
      "question": "What is the risk of automated pruning?",
      "answer": "Pruning deletes live resources that are no longer present in desired manifests. An accidental manifest removal can therefore delete important resources. Teams should establish ownership, review changes and test deletion behavior before enabling pruning."
    },
    {
      "question": "How should CI work with Argo CD?",
      "answer": "CI should build, test, scan and publish an immutable artifact, then update the desired image reference in Git through a controlled change. Argo CD detects the change and reconciles Kubernetes. This separates artifact creation from deployment-state management."
    }
  ]
},
  "terraform": {
  "title": "Terraform Infrastructure as Code Architecture",
  "subtitle": "Declarative cloud infrastructure provisioning with reusable modules and controlled state",
  "summary": "Terraform is an Infrastructure as Code tool that describes infrastructure through declarative configuration files. Its architecture uses providers to communicate with cloud and platform APIs, resources to represent managed infrastructure, modules to package reusable designs and state to track the relationship between configuration and real resources. A production Terraform workflow separates planning from applying, protects state, controls provider versions, reviews infrastructure changes and uses reusable modules. The architecture should support multiple environments, collaboration, drift detection, policy validation and safe recovery from failed infrastructure changes.",
  "objectives": [
    "Understand Terraform configuration, providers, resources, modules and state.",
    "Design remote state storage with locking and environment isolation.",
    "Build reusable modules and controlled multi-environment infrastructure workflows.",
    "Apply secure plan, review, approval, apply and drift-management practices."
  ],
  "diagram": [
    "Developer changes Terraform configuration in Git",
    "Pull request → Formatting, validation and security checks",
    "Terraform init → Provider and module installation",
    "Terraform plan → State refresh and execution plan",
    "Plan review and approval",
    "Terraform apply → Cloud provider APIs",
    "Remote state update → Outputs, monitoring and drift detection"
  ],
  "sections": [
    {
      "title": "Terraform Core Architecture and Provider Lifecycle",
      "explanation": "Terraform uses a declarative configuration model to describe the desired infrastructure. The Terraform CLI reads configuration files, initializes required providers and modules, evaluates dependencies and builds an execution graph. Providers translate Terraform resource operations into API requests against platforms such as AWS, Azure, Google Cloud and Kubernetes. Resources represent managed infrastructure, while data sources read information about infrastructure that Terraform does not necessarily own. During planning, Terraform compares configuration with recorded state and observed remote objects to determine which operations are required. Understanding this lifecycle helps operators predict resource creation, modification, replacement and deletion before applying changes.",
      "responsibilities": [
        "Define desired infrastructure through version-controlled configuration.",
        "Use providers to communicate with external infrastructure APIs.",
        "Represent managed objects using resources and read-only lookups using data sources.",
        "Understand dependency relationships and execution graph behavior."
      ],
      "implementation": [
        "Declare required providers and their version constraints.",
        "Configure provider authentication through environment-based or approved identity mechanisms.",
        "Define resources with explicit names, tags and important configuration values.",
        "Use references and depends_on only where implicit dependencies are insufficient."
      ],
      "productionConsiderations": [
        "Commit the dependency lock file to maintain provider selections.",
        "Review provider upgrades before changing production infrastructure.",
        "Use least-privilege identities for Terraform execution.",
        "Inspect plans for unintended replacement or deletion operations."
      ],
      "failureModes": [
        "Missing provider configuration prevents initialization.",
        "Incompatible provider versions can change resource behavior.",
        "Incorrect dependency relationships cause ordering failures.",
        "A resource replacement may interrupt workloads if lifecycle behavior is not reviewed."
      ],
      "practicalTask": "Create a small Terraform configuration that provisions a network and a compute resource. Inspect the plan and identify which dependencies determine creation order."
    },
    {
      "title": "Terraform State, Remote Backend and Locking",
      "explanation": "Terraform state records the mapping between configuration addresses and real infrastructure objects, along with attributes needed for future planning. State is essential because Terraform uses it to determine which objects it manages and what changes are necessary. In a team environment, local state files are unsafe because different operators can work with inconsistent copies. A remote backend centralizes state storage, while backend-specific locking prevents simultaneous operations from corrupting the same state. State may contain sensitive infrastructure values, so encryption, access control, versioning and recovery procedures are important parts of the architecture.",
      "responsibilities": [
        "Maintain a reliable mapping between Terraform resources and real objects.",
        "Use remote state for shared team workflows.",
        "Prevent concurrent state modification through locking.",
        "Protect state contents and maintain recoverable versions."
      ],
      "implementation": [
        "Configure an approved remote backend such as an S3 backend.",
        "Enable backend encryption and versioning where supported.",
        "Configure locking using the backend-supported locking mechanism.",
        "Restrict state access to authorized infrastructure automation identities."
      ],
      "productionConsiderations": [
        "Never commit state files or state backups containing sensitive data.",
        "Test state restoration before relying on it for disaster recovery.",
        "Separate state by environment and ownership boundary.",
        "Investigate stale locks carefully instead of deleting them blindly."
      ],
      "failureModes": [
        "Concurrent applies can produce state conflicts without effective locking.",
        "Lost state can make Terraform lose its resource mapping.",
        "Incorrect backend configuration can point to another environment's state.",
        "Excessively broad state permissions expose sensitive infrastructure data."
      ],
      "practicalTask": "Configure a remote state backend, enable version recovery and demonstrate how two Terraform operations are prevented from modifying the same state simultaneously."
    },
    {
      "title": "Reusable Modules and Multi-Environment Architecture",
      "explanation": "Terraform modules package related resources, inputs and outputs into reusable infrastructure building blocks. A root module represents the configuration executed by Terraform, while child modules can provide standardized network, compute, database or security designs. Module inputs allow teams to configure behavior without copying entire infrastructure definitions. Outputs expose selected values to dependent configurations. Production module design should define stable interfaces, validate inputs, constrain versions and avoid excessive abstraction. Development, staging and production should have clear state boundaries and environment-specific values so a change intended for one environment cannot unintentionally modify another.",
      "responsibilities": [
        "Package reusable infrastructure patterns into modules.",
        "Define clear module inputs, outputs and validation rules.",
        "Separate environment configuration and state boundaries.",
        "Standardize infrastructure conventions across teams."
      ],
      "implementation": [
        "Create modules with separate main.tf, variables.tf and outputs.tf files.",
        "Expose configurable values through typed input variables.",
        "Return required resource identifiers through outputs.",
        "Use environment-specific root configurations and controlled module versions."
      ],
      "productionConsiderations": [
        "Version reusable modules and test changes before broad adoption.",
        "Avoid sharing one state file across unrelated production boundaries.",
        "Validate inputs to prevent unsafe resource configurations.",
        "Document module compatibility and upgrade behavior."
      ],
      "failureModes": [
        "Breaking module interface changes disrupt consuming projects.",
        "Incorrect defaults create inconsistent infrastructure.",
        "Shared state across environments increases accidental change risk.",
        "Circular module dependencies make the configuration difficult to evaluate."
      ],
      "practicalTask": "Build a reusable network module and call it from separate development and staging root configurations with different CIDR inputs."
    },
    {
      "title": "Terraform CI/CD, Security and Drift Management",
      "explanation": "Terraform infrastructure delivery should follow a controlled pipeline that validates configuration, initializes providers, creates a plan and applies approved changes. A pull request should expose the proposed resource operations so reviewers can identify risky replacements or deletions before execution. Automated checks can include formatting, validation, security scanning and policy enforcement. Production applies should use controlled identities and protected approval gates. Drift occurs when real infrastructure changes outside the Terraform workflow or when recorded state and actual resources diverge. Teams should investigate drift and update configuration through reviewed changes rather than blindly overwriting live infrastructure.",
      "responsibilities": [
        "Automate formatting, validation, planning and policy checks.",
        "Require review before production infrastructure changes.",
        "Use controlled identities and protected deployment permissions.",
        "Detect and investigate configuration drift."
      ],
      "implementation": [
        "Run terraform fmt and terraform validate in CI.",
        "Generate and publish a reviewable Terraform plan.",
        "Apply only an approved plan through a controlled release job.",
        "Schedule drift checks and route unexpected changes to infrastructure owners."
      ],
      "productionConsiderations": [
        "Use short-lived cloud credentials where supported.",
        "Scan configurations for public exposure and insecure defaults.",
        "Protect plan files because they may contain sensitive values.",
        "Keep an audit record of commits, plans, approvals and applies."
      ],
      "failureModes": [
        "Applying an outdated plan may not represent the latest configuration.",
        "Manual console changes create infrastructure drift.",
        "Leaked state or plan files may expose sensitive information.",
        "A pipeline using excessive permissions can modify unrelated infrastructure."
      ],
      "practicalTask": "Create a CI workflow that formats and validates Terraform, generates a plan for review and requires an approval before applying changes to a test environment."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Local state or remote state",
      "guidance": "Use local state only for isolated experiments. Production teams should use a protected remote backend with supported locking and version recovery."
    },
    {
      "decision": "One large state or multiple state boundaries",
      "guidance": "Separate state according to ownership, environment and lifecycle so unrelated infrastructure changes do not create unnecessary blast radius."
    },
    {
      "decision": "Reusable modules or duplicated configuration",
      "guidance": "Use versioned modules for stable repeated patterns, but keep module interfaces understandable and avoid abstractions that hide important infrastructure behavior."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is Terraform state and why is it important?",
      "answer": "Terraform state records the relationship between configuration resources and real infrastructure objects. It stores information Terraform uses to plan future operations. Without reliable state, Terraform may not know which resources it manages, making updates and recovery difficult."
    },
    {
      "question": "What is the difference between terraform plan and terraform apply?",
      "answer": "Terraform plan evaluates configuration and state to show proposed infrastructure operations without normally applying them. Terraform apply executes the approved operations against the provider APIs. Production workflows should review the plan before applying changes."
    },
    {
      "question": "Why is remote state locking important?",
      "answer": "Locking prevents multiple Terraform operations from modifying the same state simultaneously. Without locking, concurrent operations may produce inconsistent state or conflicting infrastructure changes. A remote backend provides a shared state location for team workflows."
    },
    {
      "question": "How do you manage Terraform across development and production?",
      "answer": "Use separate environment configurations and state boundaries, controlled variable values and reusable modules. Apply changes through reviewed pipelines, use environment-specific identities and prevent development operations from accessing production state or credentials."
    }
  ]
},
  "ansible": {
  "title": "Ansible Configuration Management Architecture",
  "subtitle": "Agentless automation for server configuration, orchestration and repeatable operations",
  "summary": "Ansible is an automation platform commonly used for configuration management, application deployment and operational orchestration. Its architecture uses a control node to execute automation, an inventory to identify managed hosts, playbooks to describe desired tasks and modules to perform operations on target systems. Ansible commonly connects to Linux hosts through SSH and Windows hosts through supported remote management mechanisms. Production designs require structured inventories, reusable roles, secure variable handling, privilege escalation, idempotent tasks and controlled execution. The objective is repeatable infrastructure operations with predictable results and auditable changes.",
  "objectives": [
    "Understand control nodes, managed nodes, inventory, playbooks and modules.",
    "Design reusable roles, variables and environment-specific inventories.",
    "Implement secure remote execution and privilege escalation.",
    "Build reliable automation with idempotency, validation and controlled rollout."
  ],
  "diagram": [
    "Operator or CI pipeline starts an Ansible job",
    "Control node loads configuration and inventory",
    "Variables, groups and host patterns resolve targets",
    "SSH or supported remote connection reaches managed hosts",
    "Playbook tasks execute Ansible modules",
    "Handlers and validation tasks verify configuration",
    "Execution results, logs and notifications are recorded"
  ],
  "sections": [
    {
      "title": "Control Node, Inventory and Connection Architecture",
      "explanation": "Ansible uses a control node to interpret playbooks and coordinate work against managed hosts. The inventory defines which systems are available for automation and can group them by environment, application role, region or operational ownership. Inventory variables provide host-specific and group-specific configuration. Ansible commonly connects to Linux systems using SSH, while other platforms use their supported connection mechanisms. This agentless model means a dedicated Ansible agent is not normally required on each Linux target, but the control node still needs appropriate connectivity, credentials and compatible Python support on managed systems for many modules.",
      "responsibilities": [
        "Maintain an authoritative inventory of managed hosts.",
        "Group hosts by environment, application and responsibility.",
        "Configure secure connection identities and host variables.",
        "Keep control-node execution and target-host permissions separate."
      ],
      "implementation": [
        "Create static inventory files or connect a supported dynamic inventory source.",
        "Define groups for development, staging and production.",
        "Configure SSH identity and connection settings securely.",
        "Test connectivity using Ansible ping before running configuration tasks."
      ],
      "productionConsiderations": [
        "Restrict SSH access to approved control nodes.",
        "Keep inventory sources accurate as infrastructure changes.",
        "Avoid hardcoding private keys or passwords in inventory files.",
        "Use environment-specific targeting to prevent accidental production execution."
      ],
      "failureModes": [
        "Incorrect host patterns result in zero targeted hosts.",
        "DNS or routing failures prevent remote connections.",
        "Invalid SSH credentials cause authentication failures.",
        "Stale inventory causes automation to target removed or incorrect machines."
      ],
      "practicalTask": "Create a development inventory group with two managed hosts, test Ansible connectivity and verify that production hosts are not selected."
    },
    {
      "title": "Playbooks, Tasks and Idempotent Execution",
      "explanation": "An Ansible playbook describes the desired sequence of operations for selected hosts. Each play identifies target hosts and contains tasks that call modules to manage packages, files, services, users or application configuration. Idempotency is a central design principle: running the same playbook repeatedly should leave a system in the desired state without causing unnecessary changes. Ansible modules generally report whether a task changed the system, allowing handlers to run only when related configuration changes. Shell and command tasks should be used carefully because they often need explicit change detection to behave predictably.",
      "responsibilities": [
        "Describe system configuration through readable playbooks.",
        "Use modules instead of unnecessary shell commands.",
        "Design tasks to be safe when executed repeatedly.",
        "Trigger handlers only when relevant configuration changes."
      ],
      "implementation": [
        "Create plays with explicit hosts and privilege settings.",
        "Use package, file, template and service modules.",
        "Use notify and handlers to restart services after configuration changes.",
        "Apply check mode and diff mode where supported to review intended changes."
      ],
      "productionConsiderations": [
        "Test playbooks against representative systems before broad rollout.",
        "Pin collection dependencies and maintain compatible versions.",
        "Use tags carefully so skipped tasks do not leave partial configuration.",
        "Define explicit validation after service or application changes."
      ],
      "failureModes": [
        "Non-idempotent commands repeatedly modify system state.",
        "Incorrect task order creates configuration dependencies that are not satisfied.",
        "A handler may restart a service before all required files are present.",
        "An overly broad play can change unrelated hosts."
      ],
      "practicalTask": "Write a playbook that installs a web server, manages its configuration through a template and restarts the service only when the template changes."
    },
    {
      "title": "Roles, Variables and Reusable Automation",
      "explanation": "Ansible roles organize automation into predictable directories for tasks, handlers, templates, files, variables and defaults. Roles allow teams to reuse configuration patterns without copying large playbooks. Variables control differences such as package versions, ports, service names and environment settings. Variable precedence determines which value wins when the same variable is defined in multiple locations, so excessive overrides can make behavior difficult to understand. Ansible Vault can encrypt sensitive variable data, while external secret systems can supply credentials at runtime. Clear role interfaces and naming conventions make automation easier to test and maintain.",
      "responsibilities": [
        "Package reusable automation into roles.",
        "Define documented role defaults and required inputs.",
        "Separate environment-specific configuration from reusable tasks.",
        "Protect sensitive variables through encryption or approved secret systems."
      ],
      "implementation": [
        "Create roles with tasks, handlers, templates and defaults directories.",
        "Call roles from environment-specific playbooks.",
        "Use group_vars and host_vars for scoped configuration.",
        "Encrypt sensitive values with Ansible Vault or integrate a secret manager."
      ],
      "productionConsiderations": [
        "Document variable precedence and role input requirements.",
        "Test roles independently before integrating them into larger playbooks.",
        "Avoid committing plaintext credentials.",
        "Version reusable collections and role dependencies."
      ],
      "failureModes": [
        "Unexpected variable precedence overrides intended configuration.",
        "Missing role dependencies cause execution failures.",
        "Unencrypted secrets leak through repository history.",
        "Poorly designed roles become difficult to reuse across environments."
      ],
      "practicalTask": "Create a reusable web-server role with configurable package, port and service values, then apply it to separate development and staging inventories."
    },
    {
      "title": "Production Orchestration, Security and Failure Recovery",
      "explanation": "Production Ansible automation must control how many hosts are modified at once, how failures affect later tasks and how operators recover partially completed operations. Serial execution can roll changes through a controlled group of hosts, while strategy settings influence task scheduling. Privilege escalation should grant administrative access only where required. CI integration should use protected credentials, reviewed playbook changes and environment approvals. Execution logs should capture the inventory, playbook revision, target hosts and task outcomes. A failed play should be investigated at the task and host level before rerunning it, especially when previous tasks may already have changed system state.",
      "responsibilities": [
        "Control rollout size and host execution order.",
        "Apply privilege escalation only to tasks requiring it.",
        "Integrate automation with reviewed CI/CD workflows.",
        "Capture execution evidence and recover partial changes safely."
      ],
      "implementation": [
        "Use serial to perform controlled rolling operations.",
        "Configure become and become_user for required administrative tasks.",
        "Run syntax checks and validation before production execution.",
        "Use CI credentials and protected environments for production automation."
      ],
      "productionConsiderations": [
        "Start with a canary host before broad production rollout.",
        "Use explicit failure conditions and post-change validation.",
        "Keep backups of important configuration before destructive changes.",
        "Audit remote access, secret usage and execution results."
      ],
      "failureModes": [
        "A failed task leaves some hosts updated and others unchanged.",
        "Incorrect privilege escalation causes permission failures.",
        "Excessive parallelism can overload production services.",
        "A destructive task can remove configuration required for recovery."
      ],
      "practicalTask": "Run a configuration change against a canary host, validate the service, then expand to a controlled host batch and record rollback steps."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Static or dynamic inventory",
      "guidance": "Use static inventory for small stable environments and dynamic inventory when cloud infrastructure changes frequently."
    },
    {
      "decision": "Shell commands or Ansible modules",
      "guidance": "Prefer purpose-built modules for predictable idempotent behavior; use shell commands only when a suitable module is unavailable."
    },
    {
      "decision": "Single large playbook or reusable roles",
      "guidance": "Use roles for repeated configuration responsibilities and keep playbooks focused on environment orchestration."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What does agentless mean in Ansible?",
      "answer": "Agentless means Ansible normally does not require a continuously running Ansible agent on each managed Linux host. The control node connects remotely, commonly using SSH, and executes modules to perform configuration tasks. The target still needs suitable access and runtime prerequisites."
    },
    {
      "question": "What is idempotency in Ansible?",
      "answer": "Idempotency means repeatedly applying the same automation should keep the system in the desired state without making unnecessary changes. For example, a package task should install a package if it is missing and report no change when the required version is already present."
    },
    {
      "question": "What is the difference between an inventory and a playbook?",
      "answer": "Inventory identifies the hosts and groups Ansible can manage, including connection and host variables. A playbook describes the operations to execute against selected hosts. Inventory defines the targets, while the playbook defines the automation behavior."
    },
    {
      "question": "How do you perform a safe production rollout with Ansible?",
      "answer": "Test the playbook, validate inventory and credentials, then begin with a canary host. Use serial batches to control rollout size, verify service health after each batch and stop when failures exceed the accepted threshold. Maintain a tested recovery procedure."
    }
  ]
},
  "cloudformation": {
  "title": "AWS CloudFormation Architecture",
  "subtitle": "AWS-native infrastructure provisioning through declarative templates and managed stacks",
  "summary": "AWS CloudFormation is an infrastructure provisioning service that creates and manages AWS resources from declarative templates. Templates describe resources, parameters, mappings, conditions, outputs and dependencies. CloudFormation processes these templates through stacks, which provide a lifecycle boundary for resource creation, updates and deletion. Production architecture should use reusable nested stacks or modules, parameter validation, change sets, IAM least privilege, drift detection and controlled stack policies. Reliable CloudFormation delivery makes infrastructure changes reviewable, repeatable and recoverable while preserving important data resources.",
  "objectives": [
    "Understand CloudFormation templates, stacks, resources and intrinsic functions.",
    "Design parameters, mappings, conditions and reusable nested stacks.",
    "Use change sets and stack policies for controlled infrastructure updates.",
    "Secure deployments and manage drift, rollback and stack recovery."
  ],
  "diagram": [
    "Developer authors CloudFormation YAML or JSON template",
    "Template validation and linting",
    "Parameters and mappings resolve environment configuration",
    "Change set previews resource operations",
    "Approval and IAM execution role",
    "CloudFormation stack orchestrates AWS resource APIs",
    "Stack outputs, drift detection and rollback monitoring"
  ],
  "sections": [
    {
      "title": "Template Structure and Stack Lifecycle",
      "explanation": "CloudFormation templates describe the AWS resources that should exist and the configuration required to create them. A template can contain parameters, mappings, conditions, resources, outputs and metadata. A stack is the managed deployment unit created from a template. CloudFormation interprets resource definitions, determines dependencies and coordinates API operations against AWS services. Stack operations include creation, update, deletion and rollback. Understanding the stack lifecycle is essential because an update can replace a resource, retain it, modify it in place or fail and initiate rollback. Resource lifecycle behavior should be considered before deploying changes to production.",
      "responsibilities": [
        "Describe AWS infrastructure in version-controlled templates.",
        "Understand stack creation, update, rollback and deletion.",
        "Use resource dependencies to control operation order.",
        "Expose useful infrastructure identifiers through outputs."
      ],
      "implementation": [
        "Create a YAML template with a Resources section.",
        "Define parameters for configurable resource values.",
        "Use intrinsic functions for references and substitutions.",
        "Deploy a test stack and inspect its events and outputs."
      ],
      "productionConsiderations": [
        "Use consistent stack names and ownership tags.",
        "Review resource replacement behavior before updates.",
        "Protect critical resources against accidental deletion.",
        "Keep template versions and deployment history available."
      ],
      "failureModes": [
        "Invalid resource properties cause stack creation failure.",
        "A dependency cycle prevents CloudFormation from ordering resources.",
        "An update may replace a resource and interrupt workloads.",
        "Stack rollback can fail when a resource cannot be restored."
      ],
      "practicalTask": "Create a test stack containing a security group and an EC2 instance. Inspect stack events and identify how CloudFormation handles resource dependencies."
    },
    {
      "title": "Parameters, Conditions and Reusable Stack Design",
      "explanation": "CloudFormation parameters allow templates to accept values at deployment time, such as environment names, instance sizes and network identifiers. Mappings provide lookup values for known configuration combinations, while conditions control whether resources or properties are included. Intrinsic functions such as Ref, Fn::GetAtt, Fn::Sub and Fn::If connect template components and construct values. Nested stacks allow larger architectures to be divided into reusable components, such as networking, application and database layers. Reusable design should define clear interfaces and avoid excessive nesting that makes dependencies and updates difficult to follow.",
      "responsibilities": [
        "Make environment-specific values configurable through parameters.",
        "Use conditions for controlled optional resources.",
        "Reuse infrastructure patterns through nested stacks.",
        "Expose only necessary values between stack components."
      ],
      "implementation": [
        "Define parameter types, defaults and allowed values.",
        "Use mappings for supported region or environment combinations.",
        "Use conditions to control optional resources.",
        "Create nested stacks with explicit template URLs and parameters."
      ],
      "productionConsiderations": [
        "Validate parameter combinations before production deployment.",
        "Keep nested template versions controlled.",
        "Avoid exposing sensitive values through stack outputs.",
        "Document cross-stack dependencies and update order."
      ],
      "failureModes": [
        "Invalid parameter values cause deployment errors.",
        "Incorrect conditions omit required resources.",
        "Nested stack failures can roll back the parent deployment.",
        "Unclear cross-stack references make updates difficult to coordinate."
      ],
      "practicalTask": "Build a reusable networking template with parameters for CIDR ranges and create separate development and production stacks using different values."
    },
    {
      "title": "Change Sets, Stack Policies and Controlled Updates",
      "explanation": "A CloudFormation change set previews the resource operations that an update would perform before the stack is modified. It helps reviewers identify additions, modifications, replacements and deletions. A change set does not guarantee that the update will succeed, but it provides important visibility into the intended impact. Stack policies can protect selected resources from update operations, while deletion policies and update-replace policies influence resource lifecycle behavior. Production pipelines should validate templates, create change sets, inspect risky replacements and require approval before executing changes against critical stacks.",
      "responsibilities": [
        "Preview infrastructure updates before execution.",
        "Protect critical resources from unintended modification.",
        "Control replacement and deletion behavior.",
        "Require review for high-impact stack changes."
      ],
      "implementation": [
        "Validate templates using CloudFormation validation and linting tools.",
        "Create a change set for the proposed template update.",
        "Review resource replacement and deletion actions.",
        "Execute the approved change set using a controlled deployment identity."
      ],
      "productionConsiderations": [
        "Use stack policies for resources that require additional protection.",
        "Apply deletion and update-replace policies according to data-retention needs.",
        "Keep change set details in deployment records.",
        "Test updates in a non-production stack before production execution."
      ],
      "failureModes": [
        "An unreviewed change set may replace a critical resource.",
        "A stack policy may block a required update if configured too strictly.",
        "A change set may become stale after underlying conditions change.",
        "A failed update can leave the stack in a rollback-related state."
      ],
      "practicalTask": "Modify a test stack, create a change set, inspect replacement and deletion actions, then execute only after confirming the expected impact."
    },
    {
      "title": "IAM Security, Drift Detection and Recovery",
      "explanation": "CloudFormation requires permissions to create and update the AWS resources defined by a template. A production deployment should use a dedicated IAM role with permissions limited to the required resource types and actions. CloudFormation service roles can separate deployment authorization from the identity initiating the operation. Drift detection compares supported live resource properties with the expected template configuration and helps identify changes made outside the stack workflow. Recovery requires understanding stack status, recent events, resource retention policies and whether rollback is possible. Critical data resources should have explicit retention and backup strategies.",
      "responsibilities": [
        "Use least-privilege IAM roles for stack operations.",
        "Detect configuration changes outside CloudFormation.",
        "Protect important data resources and backups.",
        "Define recovery procedures for failed stack updates."
      ],
      "implementation": [
        "Create a dedicated CloudFormation execution role.",
        "Restrict deployment permissions by resource and environment.",
        "Run drift detection on important production stacks.",
        "Inspect stack events and resource statuses before recovery actions."
      ],
      "productionConsiderations": [
        "Avoid broad administrator permissions for routine deployment.",
        "Protect templates and deployment roles from unauthorized changes.",
        "Enable backups and retention for important data stores.",
        "Test rollback and recovery procedures in a representative environment."
      ],
      "failureModes": [
        "Insufficient IAM permissions cause resource operations to fail.",
        "Manual console changes create stack drift.",
        "A failed rollback can leave a stack requiring operator intervention.",
        "Deleting a stack without retention planning can remove important data."
      ],
      "practicalTask": "Create a test stack with a dedicated execution role, modify a supported resource property manually and use drift detection to identify the difference."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "One large stack or nested stacks",
      "guidance": "Use nested stacks to separate independently reusable infrastructure layers, but keep dependencies and lifecycle ownership clear."
    },
    {
      "decision": "Direct update or change set",
      "guidance": "Use change sets for production updates so reviewers can inspect resource replacements and deletions before execution."
    },
    {
      "decision": "Delete or retain critical resources",
      "guidance": "Use retention and backup policies for data resources whose lifecycle must be independent of the application stack."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is the difference between a CloudFormation template and a stack?",
      "answer": "A template is the declarative document describing AWS resources and their configuration. A stack is the managed deployment created from that template. CloudFormation uses the stack to track resource lifecycle operations such as creation, update and deletion."
    },
    {
      "question": "What is a CloudFormation change set?",
      "answer": "A change set previews the operations CloudFormation expects to perform when a stack is updated. It shows resource additions, modifications, replacements and deletions. It helps teams review infrastructure impact before executing the update, although it does not guarantee success."
    },
    {
      "question": "What is CloudFormation drift detection?",
      "answer": "Drift detection compares supported live resource properties with the configuration expected by the stack. It helps identify changes made outside CloudFormation, such as manual console modifications, so infrastructure owners can investigate and restore the intended configuration."
    },
    {
      "question": "How do you protect important resources during stack deletion?",
      "answer": "Use suitable retention policies, stack policies, backups and controlled deletion permissions. Data resources should have lifecycle decisions independent of temporary application infrastructure, and operators should verify the impact before deleting a production stack."
    }
  ]
},
  "three-tier-architecture": {
  "title": "Three-Tier Architecture",
  "subtitle": "Separating presentation, application logic, and data responsibilities",
  "summary": "Three-tier architecture separates an application into presentation, application, and data tiers. Each tier has a clear responsibility and communicates through defined interfaces. This separation improves maintainability, security boundaries, independent scaling, and operational control. A production implementation must also account for network paths, authentication, database connection management, failure handling, observability, and deployment topology.",
  "objectives": [
    "Understand the responsibility and boundary of each tier",
    "Trace a user request from browser to database and back",
    "Design secure communication between tiers",
    "Operate and troubleshoot a multi-tier application in production"
  ],
  "diagram": [
    "User or browser",
    "DNS and HTTPS entry point",
    "Load balancer or reverse proxy",
    "Presentation tier: web UI",
    "Application tier: APIs and business logic",
    "Private database tier",
    "Response returns through the application and presentation tiers"
  ],
  "sections": [
    {
      "title": "Presentation Tier and Request Entry",
      "explanation": "The presentation tier is the user-facing layer that accepts browser or client interactions and renders the result. It may be implemented with a web server, a server-rendered application, or a frontend application served through a CDN. It should validate basic input formats and provide a usable interface, but it must not be trusted to enforce business authorization. In production, requests normally enter through DNS, TLS termination, a web application firewall, and a load balancer before reaching presentation instances. Static assets can be cached separately while authenticated API traffic follows controlled routes.",
      "responsibilities": [
        "Render pages and user interface components",
        "Collect input and perform basic client-side validation",
        "Communicate with backend APIs over HTTPS",
        "Handle user-facing errors without exposing internal details"
      ],
      "implementation": [
        "Serve frontend assets through a CDN or web server",
        "Configure HTTPS, security headers, and cache policies",
        "Use environment-specific API endpoints without embedding secrets",
        "Keep authentication tokens protected and apply secure cookie settings"
      ],
      "productionConsiderations": [
        "Use a CDN for static assets and define cache invalidation",
        "Apply WAF rules, rate limits, and TLS certificate monitoring",
        "Keep presentation instances stateless where practical",
        "Track browser errors, latency, and failed API requests"
      ],
      "failureModes": [
        "Broken frontend deployment or unavailable static assets",
        "Incorrect API base URL or CORS configuration",
        "Expired TLS certificate or misconfigured ingress",
        "Client-side validation incorrectly treated as authorization"
      ],
      "practicalTask": "Deploy a frontend behind HTTPS and a load balancer. Verify that static files are cached safely, API calls reach the application tier, and browser-visible errors do not expose stack traces or credentials."
    },
    {
      "title": "Application Tier and Business Logic",
      "explanation": "The application tier processes requests and implements the rules that make the system useful. It authenticates callers, authorizes operations, validates business constraints, coordinates transactions, and communicates with databases or external services. It should expose stable APIs rather than allowing browsers to connect directly to the database. In production, application instances are commonly placed in private subnets behind an internal load balancer, scaled using workload metrics, and deployed with health checks and controlled rollout strategies. Connection pools, timeouts, retries, and idempotency must be designed deliberately.",
      "responsibilities": [
        "Execute business rules and workflow orchestration",
        "Authenticate users and authorize requested operations",
        "Validate data and coordinate persistence",
        "Integrate with approved external APIs and internal services"
      ],
      "implementation": [
        "Expose versioned REST or GraphQL endpoints as appropriate",
        "Store secrets in a managed secret store",
        "Configure database pools, request timeouts, and bounded retries",
        "Provide readiness and liveness endpoints for orchestration"
      ],
      "productionConsiderations": [
        "Scale on request rate, CPU, memory, and queue depth",
        "Use idempotency keys for operations that may be retried",
        "Apply circuit breakers and bulkheads for unstable dependencies",
        "Deploy gradually and verify health before shifting all traffic"
      ],
      "failureModes": [
        "Connection pool exhaustion or slow database queries",
        "Unbounded retries causing cascading failures",
        "Incorrect authorization allowing access to another tenant",
        "Memory leaks or thread starvation under peak traffic"
      ],
      "practicalTask": "Deploy two application instances behind an internal load balancer. Add readiness checks, request timeouts, structured logs, and a bounded database connection pool, then test behavior during an instance restart."
    },
    {
      "title": "Data Tier, Persistence, and Network Isolation",
      "explanation": "The data tier stores the application's durable information and protects its consistency and confidentiality. It commonly contains a relational database, NoSQL store, cache, or object storage, depending on the workload. Application services should access data through controlled identities and network paths rather than exposing database endpoints publicly. Production design includes backup schedules, point-in-time recovery, encryption, schema migration controls, connection limits, replication, and tested restore procedures. A successful database backup is not sufficient evidence of recoverability until a restore has been performed and verified.",
      "responsibilities": [
        "Persist application records and enforce data constraints",
        "Provide transactional consistency where required",
        "Protect data through encryption and least-privilege access",
        "Support backup, recovery, and retention requirements"
      ],
      "implementation": [
        "Place database resources in private network subnets",
        "Use managed identities or rotated database credentials",
        "Enable encryption at rest and TLS in transit",
        "Automate schema migrations with backward-compatible changes"
      ],
      "productionConsiderations": [
        "Monitor storage growth, connections, replication lag, and query latency",
        "Test point-in-time recovery against recovery objectives",
        "Separate read workloads when replicas are appropriate",
        "Restrict database access with security groups and audit logging"
      ],
      "failureModes": [
        "Database failover or storage exhaustion",
        "Connection limits reached during application scaling",
        "Replication lag causing stale reads",
        "Unrecoverable data loss due to untested backups or unsafe migrations"
      ],
      "practicalTask": "Create a private database endpoint accessible only from the application security group. Enable automated backups, encryption, and database metrics, then perform a restore into a non-production environment."
    },
    {
      "title": "End-to-End Traffic Flow, Security, and Resilience",
      "explanation": "A three-tier design is effective only when the boundaries between tiers are enforced and the complete request path is observable. A typical request travels from a client through DNS and HTTPS to a load balancer, reaches the presentation layer, invokes an application API, and accesses the data tier through a private connection. Responses follow the reverse path. Each hop needs an explicit timeout, identity boundary, and failure behavior. Production operations should correlate logs and traces across tiers, distinguish dependency failures from application defects, and use graceful degradation rather than allowing one slow component to exhaust every upstream resource.",
      "responsibilities": [
        "Define allowed communication paths between tiers",
        "Protect identities and data at every boundary",
        "Maintain end-to-end request visibility",
        "Coordinate recovery when a tier or dependency fails"
      ],
      "implementation": [
        "Use separate network policies or security groups for each tier",
        "Propagate correlation IDs across HTTP and database operations",
        "Define tier-specific health checks and timeout budgets",
        "Use rolling or blue-green releases with rollback criteria"
      ],
      "productionConsiderations": [
        "Set service-level objectives for latency and availability",
        "Test loss of an application instance and database failover",
        "Use distributed tracing to locate latency across tier boundaries",
        "Document recovery ownership and dependency escalation paths"
      ],
      "failureModes": [
        "A public database route bypassing intended isolation",
        "A slow downstream tier exhausting upstream worker pools",
        "Health checks passing while user transactions are failing",
        "Deployment incompatibility between application and database schema"
      ],
      "practicalTask": "Trace one test transaction across all three tiers. Capture its correlation ID, verify each network boundary, inject an application-instance failure, and confirm that traffic recovers without exposing the database publicly."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Separate tiers into independent deployment units or keep them together?",
      "guidance": "Separate deployment units when teams need independent scaling, security boundaries, or release schedules. A smaller application may begin with fewer infrastructure components, but retain clear code and network boundaries."
    },
    {
      "decision": "Use a relational database or a NoSQL data store?",
      "guidance": "Choose based on access patterns, consistency needs, transaction requirements, and data relationships. Do not select a database solely because it is fashionable or easy to provision."
    },
    {
      "decision": "Place the database in a public or private subnet?",
      "guidance": "Use private subnets for production databases and permit access only from approved application identities and security groups. Public access should not be the default."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What are the three tiers in a three-tier architecture?",
      "answer": "The presentation tier handles the user interface, the application tier executes business logic and APIs, and the data tier stores and retrieves information. Separating them makes it easier to secure, maintain, scale, and troubleshoot each responsibility."
    },
    {
      "question": "Why should a browser not connect directly to the production database?",
      "answer": "A browser is outside the trusted server boundary. Direct database access would expose credentials and database operations to clients. The application tier provides authentication, authorization, validation, controlled queries, and auditing."
    },
    {
      "question": "How do you troubleshoot a slow three-tier application?",
      "answer": "Trace a single request across the tiers using logs and distributed tracing. Check frontend timing, load balancer metrics, application latency and resource use, database query time, connection pools, and network errors. Identify the slowest dependency before changing capacity."
    },
    {
      "question": "How do you improve availability in a three-tier design?",
      "answer": "Run redundant instances across failure zones, use health-checked load balancing, keep application instances replaceable, configure database backups and failover, monitor dependencies, and regularly test recovery procedures."
    }
  ]
},
  "microservices": {
  "title": "Microservices",
  "subtitle": "Independent services connected through explicit contracts",
  "summary": "Microservices architecture divides a business application into independently deployable services aligned with business capabilities. Each service owns a focused responsibility and communicates through APIs or messaging. This enables independent delivery and scaling, but introduces distributed-system concerns such as network failure, data consistency, service discovery, observability, and operational complexity. A sound design starts with service boundaries and ownership rather than splitting code into many small processes without a clear business reason.",
  "objectives": [
    "Identify service boundaries using business capabilities",
    "Understand synchronous and asynchronous communication",
    "Manage data ownership and distributed consistency",
    "Operate, secure, and troubleshoot independently deployed services"
  ],
  "diagram": [
    "Web or mobile client",
    "API gateway or edge routing",
    "Identity and service discovery",
    "Customer service",
    "Order service",
    "Payment service",
    "Independent service-owned data stores",
    "Event broker for asynchronous communication",
    "Central logs, metrics, traces, and deployment platform"
  ],
  "sections": [
    {
      "title": "Service Boundaries and Domain Ownership",
      "explanation": "A microservice should represent a cohesive business capability with a clear owner, API contract, and data responsibility. Domain-driven design concepts such as bounded contexts help teams avoid creating services around technical layers alone. If every small function becomes a separate service, network calls and operational dependencies can outweigh the benefits. A service boundary should minimize unnecessary cross-service transactions and allow the owning team to change its implementation without coordinating every release with other teams. Production boundaries must include ownership, on-call responsibility, versioning, and dependency documentation.",
      "responsibilities": [
        "Own a focused business capability and its rules",
        "Publish a stable contract for consumers",
        "Control changes to service-owned data",
        "Define team ownership and operational responsibility"
      ],
      "implementation": [
        "Identify bounded contexts from business workflows",
        "Document API schemas and compatibility expectations",
        "Keep service-specific persistence behind the service boundary",
        "Use contract tests to detect incompatible changes"
      ],
      "productionConsiderations": [
        "Measure coupling and cross-service call frequency",
        "Assign service owners and on-call escalation paths",
        "Review whether a proposed service deserves independent deployment",
        "Avoid shared database tables that bypass service ownership"
      ],
      "failureModes": [
        "Services split too finely and create excessive network chatter",
        "Multiple services modify the same database records",
        "Unclear ownership delays incident response",
        "Breaking API changes cause consumer failures"
      ],
      "practicalTask": "Choose an order-processing workflow and identify customer, order, and payment responsibilities. Draw service ownership boundaries and document which service owns each record and API."
    },
    {
      "title": "Service Communication, API Gateway, and Discovery",
      "explanation": "Microservices communicate through synchronous protocols such as HTTP or gRPC and asynchronous mechanisms such as queues or event streams. Synchronous calls are useful when a response is required immediately, but they couple availability and latency across the call chain. An API gateway can centralize external routing, authentication enforcement, rate limits, and request policies, while internal service discovery helps workloads locate changing service endpoints. Production communication must define timeouts, retry limits, authentication, payload limits, and compatibility so that a temporary network issue does not become a system-wide outage.",
      "responsibilities": [
        "Expose documented service APIs",
        "Route external requests through controlled entry points",
        "Resolve service endpoints as instances change",
        "Apply authentication and traffic policies"
      ],
      "implementation": [
        "Use OpenAPI or protobuf contracts",
        "Configure gateway routes, quotas, and authentication",
        "Use platform DNS or a service registry for discovery",
        "Set explicit connection and response timeouts"
      ],
      "productionConsiderations": [
        "Avoid long synchronous call chains",
        "Apply mTLS or workload identity for service-to-service access",
        "Monitor gateway rejection rates and dependency latency",
        "Version contracts and test consumer compatibility"
      ],
      "failureModes": [
        "Gateway configuration routes traffic to the wrong service",
        "Service discovery returns stale or unhealthy endpoints",
        "Retry storms overload an already failing dependency",
        "Incompatible payload changes break older consumers"
      ],
      "practicalTask": "Expose two services through an API gateway. Add authentication, a request timeout, rate limiting, and service discovery, then simulate an unavailable downstream service and observe the returned error."
    },
    {
      "title": "Data Ownership and Distributed Transactions",
      "explanation": "Each microservice should own its data model and expose business operations through its contract. Other services should not directly query or update its private tables because that creates hidden coupling and makes independent schema changes unsafe. A workflow that spans services cannot usually rely on one local database transaction. Patterns such as the Saga coordinate local transactions with compensating actions, while the transactional outbox reliably publishes events after a local database commit. Teams must define consistency expectations and make consumers idempotent because messages and requests may be delivered more than once.",
      "responsibilities": [
        "Maintain authoritative data for the service domain",
        "Expose business operations instead of shared-table access",
        "Coordinate cross-service workflows safely",
        "Handle duplicate delivery and eventual consistency"
      ],
      "implementation": [
        "Use the Saga pattern for multi-service business transactions",
        "Use an outbox table to publish committed changes reliably",
        "Add idempotency keys and deduplication records",
        "Create read models when cross-domain queries are required"
      ],
      "productionConsiderations": [
        "Define acceptable consistency delay for each workflow",
        "Monitor stuck Saga steps and undelivered outbox records",
        "Keep compensation operations safe and auditable",
        "Plan schema evolution without breaking active consumers"
      ],
      "failureModes": [
        "A partial workflow leaves an order in an invalid state",
        "Duplicate events charge or process a transaction twice",
        "Outbox publishing stops while database writes continue",
        "A shared database change unexpectedly breaks another service"
      ],
      "practicalTask": "Model an order and payment workflow using local transactions and a Saga. Simulate payment rejection and verify that the order is compensated without relying on a distributed database transaction."
    },
    {
      "title": "Deployment, Observability, and Resilience",
      "explanation": "Independent deployment is a central benefit of microservices, but it requires repeatable build pipelines, compatible contracts, runtime health checks, and clear rollback procedures. Containers and orchestration platforms can schedule service instances, while progressive delivery limits exposure during releases. Because a user request may cross several services, logs alone are insufficient; metrics and distributed traces are needed to understand latency and failures across boundaries. Resilience controls such as circuit breakers, bulkheads, bounded retries, and graceful degradation must be applied with care and tested under realistic traffic.",
      "responsibilities": [
        "Build and release services independently",
        "Maintain service health and deployment safety",
        "Correlate requests across service boundaries",
        "Contain dependency failures and preserve critical workflows"
      ],
      "implementation": [
        "Build immutable images and deploy through CI/CD",
        "Use readiness checks and progressive traffic shifting",
        "Propagate trace context and structured correlation IDs",
        "Configure circuit breakers and bounded retry policies"
      ],
      "productionConsiderations": [
        "Define service-level indicators and objectives",
        "Track deployment frequency, rollback rate, and change failures",
        "Test dependency loss and overload conditions",
        "Maintain a service catalog with owners and dependencies"
      ],
      "failureModes": [
        "A new service version breaks an older consumer",
        "Retry amplification causes cascading overload",
        "Missing trace context makes incidents difficult to isolate",
        "A deployment reports healthy while business transactions fail"
      ],
      "practicalTask": "Deploy two independently versioned services. Add distributed tracing and service-level metrics, release a backward-compatible API change, and verify that rollback and dependency-failure handling work."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Should a monolith be split into microservices immediately?",
      "guidance": "No. Start with business boundaries and operational needs. A modular monolith can be simpler until independent scaling, team ownership, or release requirements justify distributed services."
    },
    {
      "decision": "When should communication use events instead of synchronous APIs?",
      "guidance": "Use events when work can happen asynchronously and consumers do not need an immediate response. Use synchronous APIs when the caller needs a direct result and the dependency is part of the immediate request."
    },
    {
      "decision": "Should microservices share one database?",
      "guidance": "Prefer service-owned data stores or clearly isolated schemas and access paths. Shared tables create coupling and weaken independent ownership; use APIs or events for cross-service data needs."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What makes an application a microservices architecture?",
      "answer": "It is composed of independently deployable services aligned with business capabilities. Each service owns a focused responsibility and communicates through explicit APIs or messages. Independent deployment alone is not enough if services remain tightly coupled through shared data."
    },
    {
      "question": "How do you handle a transaction across multiple microservices?",
      "answer": "Use a Saga or another workflow coordination pattern with local transactions and compensating actions. Design each step to be idempotent, record workflow state, and monitor incomplete operations because a single ACID transaction normally cannot span independent service databases."
    },
    {
      "question": "What is the role of an API gateway?",
      "answer": "An API gateway provides a controlled entry point for external clients. It can route requests, enforce authentication, apply rate limits, and manage API policies. It should not become a place for all business logic or a single unprotected bottleneck."
    },
    {
      "question": "How do you troubleshoot a microservices incident?",
      "answer": "Start with the affected user journey and trace its request across services. Correlate distributed traces, service metrics, logs, recent deployments, and dependency health. Identify the failing boundary, contain cascading retries, and restore the critical workflow before deeper remediation."
    }
  ]
},
  "serverless": {
  "title": "Serverless",
  "subtitle": "Event-triggered compute with managed infrastructure",
  "summary": "Serverless architecture uses cloud-managed services to run code or workflows without requiring teams to manage application servers directly. Functions, managed APIs, queues, event buses, and managed databases scale according to demand and service configuration. Serverless does not mean that infrastructure disappears: teams still own permissions, networking, runtime configuration, concurrency, observability, cost, and reliability. Good designs account for cold starts, execution limits, duplicate events, downstream capacity, and provider service quotas.",
  "objectives": [
    "Understand functions, triggers, and managed service boundaries",
    "Design event-driven serverless workflows",
    "Secure permissions and control execution concurrency",
    "Monitor reliability, latency, and consumption-based cost"
  ],
  "diagram": [
    "Client or external event source",
    "API Gateway or event source",
    "Function or managed compute",
    "Queue / event bus for asynchronous work",
    "Managed database or object storage",
    "Dead-letter queue and retry handling",
    "Cloud logs, metrics, tracing, and alarms"
  ],
  "sections": [
    {
      "title": "Function Runtime, Triggers, and Execution Lifecycle",
      "explanation": "A serverless function runs in response to an event such as an HTTP request, queue message, object upload, scheduled event, or database change. The cloud provider provisions and manages the execution environment, but the application team remains responsible for handler code, runtime dependencies, configuration, and execution limits. Functions should perform focused work and avoid assuming that local memory or temporary files remain available between invocations. Production handlers must validate event shape, handle partial failures, and finish within configured time and memory limits.",
      "responsibilities": [
        "Process a defined event or request",
        "Validate inputs and return or publish a result",
        "Use configured runtime resources responsibly",
        "Handle errors within the platform execution contract"
      ],
      "implementation": [
        "Package a small handler with pinned dependencies",
        "Configure trigger permissions and environment variables",
        "Set timeout, memory, and runtime version explicitly",
        "Keep durable state in managed storage rather than process memory"
      ],
      "productionConsiderations": [
        "Measure cold-start latency and execution duration",
        "Set concurrency limits based on downstream capacity",
        "Keep deployment artifacts reproducible and versioned",
        "Use supported runtimes and plan runtime upgrades"
      ],
      "failureModes": [
        "Function timeout during a slow downstream operation",
        "Cold starts increase latency for infrequent workloads",
        "Temporary local state disappears between invocations",
        "A malformed event causes repeated handler failures"
      ],
      "practicalTask": "Deploy a function triggered by an object upload. Validate the event, write a result to managed storage, configure timeout and memory, and inspect execution logs for both successful and invalid events."
    },
    {
      "title": "Event Sources, Queues, and Asynchronous Workflows",
      "explanation": "Serverless applications commonly connect managed event sources to functions through queues, streams, or event buses. Asynchronous processing decouples the producer from the consumer and absorbs bursts, but it changes the delivery and ordering model. Messages may be delivered more than once, consumers may process them later than expected, and poison messages can repeatedly fail. Production systems therefore require idempotent handlers, visibility timeouts, retry policies, dead-letter destinations, event schema management, and monitoring for queue age and backlog.",
      "responsibilities": [
        "Accept and route events from supported sources",
        "Buffer bursts and isolate producer availability from consumers",
        "Retry transient processing failures safely",
        "Preserve required ordering and message traceability"
      ],
      "implementation": [
        "Connect producers to managed queues or event buses",
        "Configure batch size, visibility timeout, and retry limits",
        "Route exhausted messages to a dead-letter queue",
        "Version event schemas and validate consumer compatibility"
      ],
      "productionConsiderations": [
        "Monitor queue depth, oldest-message age, and failure rate",
        "Set consumer concurrency to protect downstream systems",
        "Define retention and replay procedures",
        "Test duplicate delivery and poison-message handling"
      ],
      "failureModes": [
        "A message is processed more than once",
        "Consumer throughput falls behind incoming event volume",
        "Visibility timeout expires while processing is still active",
        "Invalid messages repeatedly fail and block a batch"
      ],
      "practicalTask": "Connect a queue to a function consumer. Send valid and invalid messages, force a transient failure, and verify retries, idempotency, dead-letter routing, and queue-age alarms."
    },
    {
      "title": "Security, Identity, Networking, and Secrets",
      "explanation": "Serverless security depends on the identity assigned to each function and the permissions granted to its execution role. A function should receive only the actions and resources required for its task, rather than broad administrator access. Secrets belong in a managed secret store, and private resources may require VPC connectivity, endpoint policies, or controlled egress. Public API functions also need authentication, authorization, request validation, rate limiting, and protection against abuse. Production teams must audit role changes, rotate credentials, and distinguish deployment permissions from runtime permissions.",
      "responsibilities": [
        "Authenticate callers and authorize each operation",
        "Access cloud resources through least-privilege identities",
        "Protect secrets and sensitive event payloads",
        "Control network access to private dependencies"
      ],
      "implementation": [
        "Assign a dedicated execution role to each function",
        "Use managed secrets and encrypted environment configuration",
        "Configure private networking only when required",
        "Validate API requests and enforce gateway authorization"
      ],
      "productionConsiderations": [
        "Audit identity policies and resource-based permissions",
        "Monitor denied API calls and unusual invocation patterns",
        "Limit outbound access where the platform supports it",
        "Avoid logging credentials, tokens, or sensitive payloads"
      ],
      "failureModes": [
        "Over-permissive role enables unintended resource access",
        "Missing permission causes invocation or storage failures",
        "Incorrect VPC routing prevents access to a private database",
        "Secrets are exposed through logs or deployment configuration"
      ],
      "practicalTask": "Create a function role that can read one designated storage location and write to one result location. Verify allowed operations succeed and unrelated resource access is denied."
    },
    {
      "title": "Scaling, Observability, Cost, and Operational Limits",
      "explanation": "Serverless platforms scale execution capacity automatically within provider quotas and configured concurrency controls. Automatic scaling does not guarantee that downstream databases, APIs, or third-party services can handle the resulting load. Cost is influenced by invocation count, execution duration, allocated resources, data transfer, and supporting managed services. Production operation requires dashboards for errors, throttles, duration, concurrency, queue backlog, and business outcomes. Teams should load-test realistic bursts, set budget alerts, and define fallback behavior when quotas or dependencies are exhausted.",
      "responsibilities": [
        "Scale event processing while protecting dependencies",
        "Observe function and workflow health",
        "Control consumption and service quotas",
        "Provide safe recovery for throttling and dependency failure"
      ],
      "implementation": [
        "Set reserved or maximum concurrency where appropriate",
        "Configure alarms for errors, throttles, and duration",
        "Use tracing across functions and managed services",
        "Estimate cost using measured workload volume and execution time"
      ],
      "productionConsiderations": [
        "Load-test bursts and downstream connection capacity",
        "Set budgets and anomaly alerts for unexpected consumption",
        "Review provider quotas before launch and growth events",
        "Use idempotent retries and graceful failure responses"
      ],
      "failureModes": [
        "Concurrency bursts overwhelm a database connection limit",
        "Throttling creates growing queue backlog",
        "Unexpected invocation loops increase cost rapidly",
        "Missing alarms allow a failing workflow to remain unnoticed"
      ],
      "practicalTask": "Run a controlled load test against a function and its database dependency. Observe concurrency, throttles, execution duration, queue age, and estimated cost, then tune concurrency to protect the database."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Use a function or a long-running container service?",
      "guidance": "Choose functions for event-driven, bounded tasks with variable demand. Prefer containers or managed application services for long-running processes, specialized runtime needs, or workloads that exceed function execution constraints."
    },
    {
      "decision": "Process an event synchronously or through a queue?",
      "guidance": "Use synchronous execution when the caller needs an immediate result and latency is predictable. Use a queue when buffering, retry isolation, burst handling, or independent consumer scaling is more important."
    },
    {
      "decision": "Allow unrestricted automatic concurrency?",
      "guidance": "No. Set concurrency based on downstream capacity, provider quotas, and business latency objectives. Automatic scaling without dependency protection can turn a traffic spike into a database outage."
    }
  ],
  "interviewQuestions": [
    {
      "question": "Does serverless mean there are no servers?",
      "answer": "No. Servers and infrastructure still exist, but the cloud provider manages much of their provisioning and operation. The application team still configures code, permissions, networking, limits, monitoring, and reliability."
    },
    {
      "question": "What is a cold start?",
      "answer": "A cold start is the additional initialization time when the platform creates or prepares an execution environment for a function. It can affect latency, especially for infrequently used functions or runtimes with heavy initialization."
    },
    {
      "question": "How do you prevent duplicate event processing?",
      "answer": "Design handlers to be idempotent. Use a stable event identifier or business idempotency key, record completed operations durably, and ensure retries do not repeat irreversible actions such as charging a payment."
    },
    {
      "question": "How do you control serverless costs?",
      "answer": "Measure invocation volume, duration, memory allocation, concurrency, data transfer, and managed-service usage. Set budgets and anomaly alerts, remove accidental invocation loops, optimize handler execution, and control concurrency to avoid wasteful downstream retries."
    }
  ]
},
  "event-driven-architecture": {
  "title": "Event-Driven Architecture",
  "subtitle": "Building loosely coupled systems around business events",
  "summary": "Event-driven architecture allows components to publish and consume events that describe facts about something that has happened. Producers do not need direct knowledge of every consumer, which supports asynchronous workflows and independent integration. The architecture introduces important design requirements around event contracts, delivery guarantees, ordering, replay, idempotency, schema evolution, and operational visibility. Production event systems must make event ownership clear and provide a reliable way to detect, retry, and recover failed processing.",
  "objectives": [
    "Distinguish events, commands, queues, and event streams",
    "Design producers, brokers, and consumers around event contracts",
    "Handle duplicate delivery, ordering, and eventual consistency",
    "Operate event flows with replay, dead-letter handling, and observability"
  ],
  "diagram": [
    "Business service publishes an event",
    "Event broker or event bus",
    "Routing rules and subscriptions",
    "Consumer A: notification",
    "Consumer B: analytics",
    "Consumer C: fulfillment",
    "Consumer-owned data stores",
    "Retry policy and dead-letter destination",
    "Central event tracing and monitoring"
  ],
  "sections": [
    {
      "title": "Event Design, Producers, and Business Contracts",
      "explanation": "An event represents a fact that has already occurred, such as OrderPlaced, PaymentCaptured, or ShipmentDispatched. It should describe the business change rather than instructing a consumer to perform an action. Producers publish events using a documented schema and stable identity, while consumers decide how to react. A well-designed event includes an event ID, event type, timestamp, schema version, producer identity, and the business identifiers needed for processing. Production contracts should avoid leaking internal database structures and should evolve without unexpectedly breaking existing consumers.",
      "responsibilities": [
        "Publish facts after the corresponding business change occurs",
        "Define stable event names and payload contracts",
        "Assign event ownership and schema governance",
        "Include identifiers needed for traceability and deduplication"
      ],
      "implementation": [
        "Use a consistent event envelope with ID and version",
        "Publish business events rather than raw database rows",
        "Validate payloads before publication",
        "Document required and optional fields for consumers"
      ],
      "productionConsiderations": [
        "Use backward-compatible schema evolution",
        "Avoid placing secrets or unnecessary personal data in events",
        "Define retention and data classification rules",
        "Track producer versions and consumer compatibility"
      ],
      "failureModes": [
        "An event is published before its database transaction commits",
        "A breaking schema change causes consumer failures",
        "Events expose internal fields that consumers should not depend on",
        "Missing event identifiers prevent reliable deduplication"
      ],
      "practicalTask": "Design an OrderPlaced event with a stable event ID, schema version, timestamp, and order reference. Publish it after a committed order transaction and validate the payload against its schema."
    },
    {
      "title": "Event Broker, Routing, Queues, and Delivery Semantics",
      "explanation": "An event broker or event bus receives events and routes them to interested consumers through topics, subscriptions, rules, or queues. A queue commonly distributes work among competing consumers, while a publish-subscribe topic allows multiple independent subscriptions to receive the same event. Delivery guarantees vary by platform and configuration; many systems provide at-least-once delivery, meaning duplicates are possible. Ordering may be global, partition-based, or limited to a message group. Production design must select the appropriate broker model and understand retention, throughput, acknowledgement, visibility, and retry behavior.",
      "responsibilities": [
        "Accept and route events to matching subscriptions",
        "Buffer work for consumers with different processing speeds",
        "Provide configured delivery and retention behavior",
        "Expose broker health and delivery metrics"
      ],
      "implementation": [
        "Choose topics, queues, or event buses based on delivery needs",
        "Configure routing rules and consumer subscriptions",
        "Set retention, acknowledgement, and retry policies",
        "Use partition or message-group keys when ordering is required"
      ],
      "productionConsiderations": [
        "Monitor publish failures, delivery lag, and consumer backlog",
        "Understand platform-specific ordering and delivery guarantees",
        "Plan capacity and partition strategy for expected throughput",
        "Secure broker access with scoped producer and consumer identities"
      ],
      "failureModes": [
        "Incorrect routing sends events to no consumer",
        "A consumer backlog grows faster than processing capacity",
        "Ordering assumptions fail across partitions",
        "Broker quota or retention limits interrupt event delivery"
      ],
      "practicalTask": "Publish one event to a broker with two independent subscriptions. Verify that both consumers receive it, inspect delivery metadata, and test what happens when one consumer is temporarily unavailable."
    },
    {
      "title": "Consumer Processing, Idempotency, and Failure Recovery",
      "explanation": "Consumers process events independently and should acknowledge or checkpoint them only after the required work has completed safely. Because retries and redelivery can occur, a consumer must be idempotent: processing the same event again should not repeat an irreversible business action. Failed events need bounded retries, visibility into the cause, and a dead-letter or quarantine path for messages that cannot be processed automatically. Recovery procedures should support investigation, correction, and controlled replay without creating duplicate orders, payments, or notifications.",
      "responsibilities": [
        "Validate and process events according to business rules",
        "Prevent duplicate side effects",
        "Acknowledge successful work at the correct point",
        "Isolate poison messages and support controlled recovery"
      ],
      "implementation": [
        "Store processed event IDs or idempotency keys durably",
        "Use transactional writes for consumer state where possible",
        "Configure retry backoff and dead-letter handling",
        "Provide replay tooling with filters and audit records"
      ],
      "productionConsiderations": [
        "Alert on dead-letter growth and oldest-message age",
        "Separate transient errors from permanent validation failures",
        "Protect replay operations from duplicate side effects",
        "Document who can re-drive messages and under what approval"
      ],
      "failureModes": [
        "Consumer acknowledges before durable processing completes",
        "A retry repeats an external payment or notification",
        "Poison messages consume repeated processing capacity",
        "Manual replay reintroduces events already processed successfully"
      ],
      "practicalTask": "Build a consumer that records processed event IDs. Force the same event to be delivered twice and verify only one business side effect occurs; then route a malformed event to a dead-letter queue."
    },
    {
      "title": "Eventual Consistency, Observability, and Architecture Governance",
      "explanation": "Event-driven workflows often update different services at different times, so the system may be temporarily inconsistent while consumers catch up. User interfaces and APIs must communicate processing states honestly rather than assuming every downstream update is immediate. Observability should connect the producer event ID to broker delivery and consumer execution, allowing operators to identify where an event is delayed or lost. Governance includes schema ownership, compatibility testing, retention, replay policy, data privacy, and clear operational ownership. Production readiness requires measuring end-to-end event age, not merely checking that the broker is online.",
      "responsibilities": [
        "Define acceptable consistency delay for business workflows",
        "Trace events from publication through every consumer",
        "Govern event schemas, retention, and access",
        "Coordinate recovery across producer and consumer teams"
      ],
      "implementation": [
        "Propagate event IDs and correlation context",
        "Publish consumer lag and processing outcome metrics",
        "Use contract tests and schema compatibility checks",
        "Represent long-running workflows with explicit states"
      ],
      "productionConsiderations": [
        "Define end-to-end latency objectives for important events",
        "Monitor consumer lag, dead-letter counts, and processing age",
        "Test broker outage, consumer restart, and replay scenarios",
        "Audit event access and apply retention requirements"
      ],
      "failureModes": [
        "A user sees stale state without knowing processing is pending",
        "Events are delivered but silently ignored by a consumer",
        "Missing correlation IDs prevent end-to-end diagnosis",
        "Replay causes old events to overwrite newer business state"
      ],
      "practicalTask": "Trace a business event through two consumers using its event ID. Measure publication-to-processing delay, simulate a consumer outage, restore processing, and verify that the user-visible workflow reaches the correct final state."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Use a queue or a publish-subscribe event bus?",
      "guidance": "Use a queue to distribute work among competing workers. Use publish-subscribe when multiple independent consumers must each receive the event. Some systems combine both by routing a topic or event bus into separate queues."
    },
    {
      "decision": "Should consumers assume events arrive exactly once?",
      "guidance": "No. Design for duplicate delivery unless the selected platform and end-to-end workflow provide a rigorously verified stronger guarantee. Durable idempotency is essential for business side effects."
    },
    {
      "decision": "Should event payloads contain complete database records?",
      "guidance": "Publish a deliberate business contract containing the information consumers need. Avoid exposing internal table structures or sensitive fields; use versioned schemas and controlled APIs for additional data."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is an event in event-driven architecture?",
      "answer": "An event is a record of a fact that has already happened in a system, such as an order being placed or a payment being captured. Producers publish events and interested consumers process them without requiring direct calls between every component."
    },
    {
      "question": "What is the difference between a queue and a topic?",
      "answer": "A queue typically distributes each message to one competing consumer in a worker group. A publish-subscribe topic can deliver a copy to multiple independent subscriptions so different systems can react to the same event."
    },
    {
      "question": "Why is idempotency important for event consumers?",
      "answer": "Events may be delivered again after timeouts, retries, or acknowledgement failures. Idempotency ensures that processing the same event repeatedly does not repeat business side effects such as duplicate payments or duplicate order creation."
    },
    {
      "question": "How do you troubleshoot delayed event processing?",
      "answer": "Check producer publish errors, broker availability, routing rules, subscription configuration, queue depth, oldest-message age, consumer concurrency, processing latency, retry counts, and dead-letter messages. Follow the event ID across the complete flow to locate the delay."
    }
  ]
},
  "high-availability": {
  "title": "High Availability",
  "subtitle": "Designing services to remain operational during component failures",
  "summary": "High availability architecture minimizes service interruption by removing single points of failure, distributing workloads across independent failure domains, and providing automated health detection and recovery. It combines redundant compute, resilient networking, load balancing, data protection, and operational procedures. Availability is an end-to-end property: redundant servers alone cannot protect a service when DNS, identity, storage, databases, deployment pipelines, or shared dependencies remain single points of failure.",
  "objectives": [
    "Understand availability targets and failure domains",
    "Design redundant application and data paths",
    "Use health checks, load balancing, and automated recovery",
    "Validate availability through failure testing and operational metrics"
  ],
  "diagram": [
    "Users and DNS",
    "Global or regional traffic entry",
    "Highly available load balancer",
    "Application instances across independent Availability Zones",
    "Replicated or highly available data tier",
    "Health monitoring and automated recovery",
    "Logs, metrics, traces, and alerting"
  ],
  "sections": [
    {
      "title": "Availability Objectives and Failure-Domain Analysis",
      "explanation": "High availability begins by defining the service level objective and identifying the failures the architecture must tolerate. An availability percentage describes the permitted unavailability over a measurement period, but it does not explain which dependencies can fail or how recovery occurs. Map the complete request path, including DNS, identity, network routes, compute, storage, databases, and external APIs. Identify shared control planes and regional dependencies, then decide whether the design must survive an instance, host, zone, or regional outage. The objective should reflect business impact and realistic recovery capability.",
      "responsibilities": [
        "Define service-level indicators and availability objectives",
        "Identify single points of failure across the request path",
        "Classify instance, host, zone, and regional failure domains",
        "Map business-critical dependencies and ownership"
      ],
      "implementation": [
        "Measure successful requests, latency, and error rates",
        "Create a dependency and failure-domain map",
        "Calculate error budgets from the chosen objective",
        "Document the failure scenarios the system must tolerate"
      ],
      "productionConsiderations": [
        "Review actual dependency availability rather than adding component percentages blindly",
        "Include DNS, identity, certificates, and third-party services",
        "Align availability targets with business criticality and cost",
        "Reassess objectives after major workload changes"
      ],
      "failureModes": [
        "A hidden shared dependency defeats redundant application instances",
        "An unrealistic availability target cannot be demonstrated",
        "Monitoring measures server uptime but misses failed transactions",
        "External provider limits prevent expected failover"
      ],
      "practicalTask": "Create an end-to-end dependency map for a production API. Define an availability SLO and list the exact components whose failure must not interrupt successful user transactions."
    },
    {
      "title": "Redundant Compute and Load-Balanced Traffic",
      "explanation": "Compute redundancy prevents one failed process, virtual machine, or host from taking the entire application offline. Multiple healthy instances should run across independent failure domains and receive traffic through a load balancer that checks application readiness rather than only whether a machine responds to a network probe. Instances should be replaceable from immutable images or deployment artifacts, with configuration and durable state stored outside the instance. Capacity planning must account for losing one failure domain while still serving the required traffic.",
      "responsibilities": [
        "Run multiple application instances across separate failure domains",
        "Distribute requests only to healthy and ready targets",
        "Keep application nodes replaceable and stateless where possible",
        "Maintain sufficient spare capacity during a failure"
      ],
      "implementation": [
        "Deploy instances through an autoscaling group or orchestrator",
        "Configure target health checks against meaningful endpoints",
        "Use rolling replacement and immutable deployment artifacts",
        "Externalize sessions and durable application state"
      ],
      "productionConsiderations": [
        "Test whether remaining instances can handle peak load after a zone loss",
        "Set health-check thresholds to avoid flapping",
        "Use connection draining during replacement",
        "Monitor target health, saturation, and load-balancer errors"
      ],
      "failureModes": [
        "All instances are placed in one Availability Zone",
        "Health checks pass while business requests fail",
        "Autoscaling launches instances with broken configuration",
        "Insufficient remaining capacity causes overload after a node loss"
      ],
      "practicalTask": "Deploy an application across two Availability Zones behind a load balancer. Terminate one instance and verify that requests continue through healthy targets without losing user sessions."
    },
    {
      "title": "Data Availability, Replication, and Recovery",
      "explanation": "An application is not highly available if its compute layer survives while its database or storage layer becomes unavailable. Data architecture must define replication mode, consistency expectations, backup recovery, failover ownership, and the acceptable amount of data loss. Synchronous replication may provide stronger consistency but can increase write latency and depend on network health. Asynchronous replicas can reduce latency and support recovery, but replication lag may cause recent writes to be absent after promotion. Database failover must include connection recovery, DNS or endpoint changes, and application retry behavior.",
      "responsibilities": [
        "Protect durable records against storage and database failures",
        "Choose replication based on consistency and recovery needs",
        "Coordinate database failover with application reconnection",
        "Maintain independent backups for recovery from corruption"
      ],
      "implementation": [
        "Configure managed database multi-zone deployment where appropriate",
        "Monitor replica health and replication lag",
        "Use connection pools that recover from endpoint changes",
        "Automate backups and periodically test restoration"
      ],
      "productionConsiderations": [
        "Measure recovery time and potential data loss during failover",
        "Keep backup credentials and copies separate from production access",
        "Test write behavior during primary database replacement",
        "Review storage quotas and connection limits"
      ],
      "failureModes": [
        "Replica lag causes missing recent writes after promotion",
        "Applications continue using stale database connections",
        "Corruption is copied to replicas before detection",
        "Backups exist but cannot be restored within the recovery objective"
      ],
      "practicalTask": "Simulate a database failover in a non-production environment. Measure reconnection time, verify transaction consistency, inspect replica lag, and restore a backup to validate the recovery procedure."
    },
    {
      "title": "Health Monitoring, Failover, and Resilience Testing",
      "explanation": "High availability requires detecting meaningful failures quickly and responding without creating additional damage. Monitoring should combine infrastructure health with user-visible transaction success, latency, saturation, and dependency behavior. Automated failover is useful only when health signals are reliable and the target environment is ready to accept traffic. Retry policies must be bounded, because aggressive retries can overload a recovering dependency. Regular game days and controlled fault injection validate assumptions about traffic routing, capacity, recovery automation, and incident ownership.",
      "responsibilities": [
        "Detect failures through infrastructure and application signals",
        "Trigger safe recovery and traffic redistribution",
        "Prevent retry storms and cascading failures",
        "Prove resilience through repeatable failure exercises"
      ],
      "implementation": [
        "Create alerts for error rate, latency, saturation, and failed transactions",
        "Use circuit breakers and bounded retries for dependencies",
        "Automate replacement of unhealthy instances",
        "Record failover events and recovery actions"
      ],
      "productionConsiderations": [
        "Test failures during realistic traffic conditions",
        "Measure detection time and recovery time",
        "Ensure alerts reach the responsible on-call team",
        "Review false positives and missed failure signals"
      ],
      "failureModes": [
        "No alert fires when users cannot complete transactions",
        "Aggressive retries amplify a downstream outage",
        "Failover moves traffic to an under-provisioned environment",
        "Repeated health-check failures cause unnecessary instance replacement"
      ],
      "practicalTask": "Run a controlled availability exercise by disabling one application instance and one downstream dependency separately. Confirm alerting, traffic handling, recovery time, and incident evidence."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Active-active or active-passive application deployment?",
      "guidance": "Use active-active when independent instances can serve traffic concurrently and the data model supports it. Active-passive can be simpler for workloads that require a standby environment or have licensing and consistency constraints."
    },
    {
      "decision": "How many Availability Zones should host the service?",
      "guidance": "Choose enough independent zones to meet the availability objective and retain adequate capacity after losing one zone. Validate database and network support rather than counting compute instances alone."
    },
    {
      "decision": "Should every dependency be retried automatically?",
      "guidance": "No. Use bounded retries with backoff for transient failures and idempotent operations. Apply timeouts and circuit breakers to avoid turning a dependency outage into a cascading application failure."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is high availability?",
      "answer": "High availability is the ability of a system to continue providing its required service with minimal interruption when individual components fail. It is achieved through redundancy, health detection, failover, sufficient spare capacity, resilient data services, and tested operational recovery."
    },
    {
      "question": "What is a single point of failure?",
      "answer": "A single point of failure is a component or dependency whose failure can make the whole service unavailable. Examples include one application server, one database without failover, a shared network path, or a critical identity dependency."
    },
    {
      "question": "How do you test high availability?",
      "answer": "Perform controlled failure tests such as terminating an instance, removing a target, interrupting a dependency, or simulating a zone outage. Measure user-visible errors, detection time, recovery time, data consistency, and remaining capacity."
    },
    {
      "question": "Does running multiple application instances guarantee high availability?",
      "answer": "No. Instances must span independent failure domains and use resilient networking, load balancing, data services, identity, and deployment processes. The complete user request path must remain functional when a component fails."
    }
  ]
},
  "disaster-recovery": {
  "title": "Disaster Recovery",
  "subtitle": "Recovering critical workloads and data after major disruption",
  "summary": "Disaster recovery architecture defines how an organization restores applications, infrastructure, and data after a major event such as regional failure, ransomware, accidental deletion, or widespread corruption. It is based on business impact, recovery time objective, recovery point objective, backup integrity, alternate environments, and rehearsed recovery procedures. A disaster recovery plan is not proven by documentation or successful backup jobs; it must demonstrate that critical services can be restored within agreed time and data-loss limits.",
  "objectives": [
    "Define RTO, RPO, and business recovery priorities",
    "Design backup, replication, and alternate recovery environments",
    "Secure backups against deletion, corruption, and ransomware",
    "Rehearse recovery and verify business service restoration"
  ],
  "diagram": [
    "Production region and primary workloads",
    "Continuous monitoring and backup orchestration",
    "Encrypted backups and immutable recovery copies",
    "Replication or data transfer to recovery region",
    "Recovery infrastructure and network foundations",
    "Application restoration and dependency validation",
    "Traffic redirection and business verification"
  ],
  "sections": [
    {
      "title": "Business Impact Analysis, RTO, and RPO",
      "explanation": "Disaster recovery starts with business impact analysis rather than selecting a replication product. Recovery Time Objective defines the maximum acceptable time to restore a service after disruption. Recovery Point Objective defines the maximum acceptable data loss measured in time. Different applications may have different objectives based on revenue, customer impact, regulatory obligations, and dependencies. Map critical business workflows, identify the systems and people required to restore them, and establish a recovery order. Objectives must be measurable and achievable with the chosen technology and staffing model.",
      "responsibilities": [
        "Identify business-critical applications and data",
        "Define recovery time and recovery point objectives",
        "Map dependencies and restoration priorities",
        "Assign accountable recovery owners and approvers"
      ],
      "implementation": [
        "Conduct business impact analysis with service owners",
        "Document application dependency and recovery order",
        "Estimate restoration time using real recovery exercises",
        "Create recovery runbooks with decision authority"
      ],
      "productionConsiderations": [
        "Validate objectives against backup frequency and replication lag",
        "Include DNS, identity, secrets, certificates, and network prerequisites",
        "Account for staff availability and provider quotas",
        "Review objectives after application or business changes"
      ],
      "failureModes": [
        "RTO is lower than the time required to provision recovery infrastructure",
        "RPO is assumed without measuring actual data loss",
        "A critical dependency is omitted from the recovery sequence",
        "Business owners disagree about recovery priority during an incident"
      ],
      "practicalTask": "Choose a business-critical application and define its RTO and RPO. Map every required dependency and create a recovery sequence with an owner and measurable completion check for each step."
    },
    {
      "title": "Backup Architecture and Immutable Data Protection",
      "explanation": "Backups provide a recovery source when production data is deleted, corrupted, encrypted, or otherwise unusable. A reliable design combines automated schedules, application-consistent snapshots where needed, retention policies, encryption, access separation, and copies isolated from the production failure domain. Immutability or object lock can prevent unauthorized deletion during a retention period, while cross-account or cross-region copies reduce exposure to a single account or region. Backup success notifications are not enough: restore tests must verify data integrity, permissions, application compatibility, and realistic recovery duration.",
      "responsibilities": [
        "Create recoverable copies of databases, files, and configuration",
        "Protect backup data from accidental or malicious deletion",
        "Apply retention and encryption requirements",
        "Verify that restored data is usable by the application"
      ],
      "implementation": [
        "Automate scheduled backups and cross-region copies",
        "Use immutable retention controls where supported",
        "Separate backup administration from production roles",
        "Catalog recovery points and record backup job outcomes"
      ],
      "productionConsiderations": [
        "Test full and granular restores on a defined schedule",
        "Protect encryption keys and backup account access",
        "Monitor missed jobs, copy failures, and retention gaps",
        "Retain infrastructure configuration and deployment artifacts"
      ],
      "failureModes": [
        "Ransomware or compromised credentials delete accessible backups",
        "Snapshots are crash-consistent but not application-consistent",
        "Encryption keys are unavailable during restoration",
        "Backups complete successfully but restored applications fail validation"
      ],
      "practicalTask": "Create an isolated backup copy with restricted deletion permissions. Restore it into a clean environment and verify record counts, application startup, permissions, and data integrity."
    },
    {
      "title": "Recovery Environment, Replication, and Infrastructure Rebuild",
      "explanation": "A recovery environment may be maintained as a minimal foundation, partially provisioned standby, or fully running alternate deployment. The appropriate model depends on RTO, cost, workload complexity, and how quickly dependencies can be recreated. Infrastructure as code makes network, identity, compute, and application configuration repeatable, while replicated data reduces the amount of information that must be restored from backup. Recovery procedures must avoid accidental dependence on the failed production region, including secrets, container registries, DNS management, and external integrations.",
      "responsibilities": [
        "Provide an alternate environment for critical workloads",
        "Rebuild infrastructure consistently from controlled definitions",
        "Transfer or restore data to the recovery location",
        "Verify dependencies before application traffic is enabled"
      ],
      "implementation": [
        "Maintain tested infrastructure-as-code recovery templates",
        "Replicate required images, artifacts, secrets, and configuration",
        "Choose warm standby or pilot-light resources based on RTO",
        "Automate database restore and application deployment steps"
      ],
      "productionConsiderations": [
        "Pre-approve quotas and network ranges in the recovery region",
        "Prevent split-brain writes when promoting a standby database",
        "Keep recovery credentials independent from production access",
        "Test external integrations and allowlists from the alternate environment"
      ],
      "failureModes": [
        "Recovery infrastructure cannot be provisioned due to quota limits",
        "Required images or secrets exist only in the failed region",
        "Both primary and recovery systems accept conflicting writes",
        "Manual environment setup creates configuration drift"
      ],
      "practicalTask": "Deploy a minimal recovery environment from infrastructure as code in a separate region. Restore a recent database copy, deploy the application, and confirm that no required runtime dependency points to the failed environment."
    },
    {
      "title": "Failover Execution, Validation, and Recovery Rehearsals",
      "explanation": "Disaster recovery execution is a controlled sequence of decisions and technical actions. Incident leaders determine whether the event meets disaster criteria, confirm the recovery point, authorize promotion or restoration, and coordinate traffic changes. Technical teams validate data integrity, application dependencies, security controls, and business transactions before declaring service restored. DNS changes may be delayed by caching, and replication-based recovery may require a decision about possible data loss. Rehearsals expose missing permissions, unclear ownership, stale runbooks, and unrealistic recovery estimates before a real disaster occurs.",
      "responsibilities": [
        "Coordinate recovery decisions and technical execution",
        "Promote or restore data without creating conflicting writers",
        "Validate business functions before reopening traffic",
        "Record recovery evidence and update the plan"
      ],
      "implementation": [
        "Use an incident command structure and explicit go/no-go gates",
        "Automate safe traffic redirection and endpoint updates",
        "Run smoke tests and business transaction validation",
        "Record timestamps, recovery points, and approval decisions"
      ],
      "productionConsiderations": [
        "Measure actual RTO and RPO during exercises",
        "Communicate service state and data-loss implications",
        "Keep rollback or failback steps documented",
        "Review exercise findings and assign remediation owners"
      ],
      "failureModes": [
        "Traffic switches before data consistency is verified",
        "DNS caches continue sending users to the old endpoint",
        "Failback overwrites newer data with stale production records",
        "Recovery is declared complete while key workflows remain broken"
      ],
      "practicalTask": "Conduct a disaster recovery tabletop and technical rehearsal. Restore a selected recovery point, redirect test traffic, execute business smoke tests, and compare measured RTO and RPO with the approved objectives."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Backups or continuous replication?",
      "guidance": "Use backups for historical recovery and protection from corruption or deletion. Use replication when lower recovery time and data-loss objectives justify the cost, but retain independent backups because replication can copy unwanted changes."
    },
    {
      "decision": "Pilot light, warm standby, or active-active recovery?",
      "guidance": "Choose pilot light for lower cost and longer recovery time, warm standby for a faster partially running environment, and active-active when business requirements justify the operational complexity and consistency controls."
    },
    {
      "decision": "Should recovery failover be fully automatic?",
      "guidance": "Automate well-understood steps, but require explicit decision gates when data loss, split-brain risk, or business impact is significant. Test automation regularly and preserve human authority for critical decisions."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is the difference between RTO and RPO?",
      "answer": "RTO is the maximum acceptable time to restore a service after a disruption. RPO is the maximum acceptable amount of data loss measured in time. Backup frequency and replication behavior influence RPO, while provisioning and recovery procedures influence RTO."
    },
    {
      "question": "Why are backups not enough for disaster recovery?",
      "answer": "Backups provide data copies but do not automatically restore networks, identity, compute, application dependencies, DNS, secrets, and business workflows. A complete disaster recovery plan includes an alternate environment, recovery procedures, ownership, and tested restoration."
    },
    {
      "question": "What is a warm standby environment?",
      "answer": "A warm standby is a partially or mostly running recovery environment with critical infrastructure and data available, but usually at reduced capacity. It can be scaled and promoted during a disaster to restore service faster than building everything from scratch."
    },
    {
      "question": "How do you prove a disaster recovery plan works?",
      "answer": "Perform scheduled technical recovery exercises. Restore real backup data, provision or activate the recovery environment, redirect test traffic, validate business transactions, and measure actual RTO and RPO. Record failures and remediate them before the next exercise."
    }
  ]
},
  "multi-az": {
  "title": "Multi-AZ Architecture",
  "subtitle": "Distributing application and data services across Availability Zones",
  "summary": "Multi-AZ architecture distributes production resources across multiple isolated Availability Zones within one cloud region. It is designed to reduce the impact of a zone-level infrastructure failure while keeping application traffic and data services available. A sound design includes cross-zone traffic routing, zone-aware capacity, resilient data replication, private networking, and operational testing. Merely selecting a multi-zone database option does not make the entire application multi-AZ if compute, load balancers, dependencies, or network paths remain concentrated in one zone.",
  "objectives": [
    "Understand Availability Zones and regional failure boundaries",
    "Distribute application, network, and data components across zones",
    "Plan capacity and traffic behavior during a zone outage",
    "Validate failover, replication, and zone-level resilience"
  ],
  "diagram": [
    "Single cloud region",
    "Availability Zone A: load balancer targets, app nodes, subnet",
    "Availability Zone B: load balancer targets, app nodes, subnet",
    "Availability Zone C: optional additional capacity",
    "Zone-resilient database or replicated data service",
    "Regional monitoring and traffic health checks"
  ],
  "sections": [
    {
      "title": "Availability Zone Boundaries and Network Layout",
      "explanation": "An Availability Zone is an isolated location within a cloud region with independent infrastructure failure characteristics. Multi-AZ design places resources in more than one zone and connects them through regional networking. Each zone should have appropriate subnets, route tables, security rules, and sufficient address capacity. Workloads must not accidentally depend on a single-zone NAT gateway, firewall, endpoint, or shared appliance. Network design should make cross-zone communication intentional and ensure that surviving zones retain the routes and permissions needed to serve production traffic.",
      "responsibilities": [
        "Distribute workload subnets across separate zones",
        "Maintain valid routing and security policies in every zone",
        "Identify zonal dependencies and shared network appliances",
        "Preserve sufficient network address and endpoint capacity"
      ],
      "implementation": [
        "Create one or more application subnets per selected zone",
        "Associate correct route tables and security group rules",
        "Deploy redundant egress and private connectivity where required",
        "Document zone placement for every critical dependency"
      ],
      "productionConsiderations": [
        "Verify subnet capacity for replacement instances",
        "Review cross-zone data transfer and latency costs",
        "Check endpoint and NAT placement for zonal concentration",
        "Keep network policy consistent through infrastructure as code"
      ],
      "failureModes": [
        "All application subnets accidentally reside in one zone",
        "A single NAT gateway prevents outbound access after zone failure",
        "Route table differences make one zone unusable",
        "Subnet address exhaustion blocks scaling during recovery"
      ],
      "practicalTask": "Build a regional network with private subnets in two Availability Zones. Verify routing, security boundaries, egress paths, and available IP capacity in each zone."
    },
    {
      "title": "Zone-Distributed Compute and Traffic Management",
      "explanation": "Application compute should run in multiple Availability Zones so that loss of one zone does not remove every serving instance. A regional load balancer distributes requests to healthy targets, while an autoscaling mechanism replaces failed instances and adds capacity when demand rises. Capacity planning must account for the surviving zones carrying traffic that previously reached the failed zone. Stateful workloads need external session storage or a safe replication design so that traffic movement does not lose user context. Deployment tools should also avoid placing every replica in the same zone.",
      "responsibilities": [
        "Schedule application instances across independent zones",
        "Route requests away from unhealthy targets",
        "Maintain enough capacity after losing one zone",
        "Keep sessions and durable state independent of individual nodes"
      ],
      "implementation": [
        "Configure multi-zone load-balancer subnets and target groups",
        "Use zone-aware scheduling and autoscaling policies",
        "Externalize session state and shared files",
        "Apply deployment spread constraints where supported"
      ],
      "productionConsiderations": [
        "Load-test the surviving zone capacity",
        "Monitor per-zone target health and resource saturation",
        "Use connection draining during instance replacement",
        "Prevent deployments from concentrating replicas in one zone"
      ],
      "failureModes": [
        "All replicas are scheduled into one zone",
        "Remaining instances overload after a zonal outage",
        "Load balancer continues routing to unhealthy targets",
        "Local session state disappears when traffic shifts zones"
      ],
      "practicalTask": "Deploy a stateless service across two zones behind a regional load balancer. Remove one zone's test targets and confirm requests continue while the remaining zone maintains acceptable latency."
    },
    {
      "title": "Multi-AZ Database Design and Data Consistency",
      "explanation": "Database availability across zones depends on the service's replication and failover model. Managed relational databases may maintain a synchronous standby for failover, while distributed or NoSQL services may replicate data differently. A standby intended for availability is not necessarily a read replica for scaling, and the exact platform behavior must be understood. Applications must reconnect after failover, handle temporary write interruptions, and avoid assuming that every existing connection remains valid. Monitoring should include replication health, failover events, storage, and connection recovery.",
      "responsibilities": [
        "Keep critical data available after a zone failure",
        "Understand standby, replica, and failover behavior",
        "Restore application database connections safely",
        "Protect consistency during database role changes"
      ],
      "implementation": [
        "Enable the database service's supported multi-zone deployment mode",
        "Configure retry-safe connection handling and connection pools",
        "Monitor replication and database failover events",
        "Use backups in addition to zone-level redundancy"
      ],
      "productionConsiderations": [
        "Confirm whether standby nodes are readable or failover-only",
        "Measure failover duration and client reconnection behavior",
        "Test transactions during the failover window",
        "Keep database subnet groups across the intended zones"
      ],
      "failureModes": [
        "Applications retain stale connections after promotion",
        "A standby is incorrectly assumed to provide read scaling",
        "Replication or storage failure affects every zone",
        "Retries duplicate writes during a database role transition"
      ],
      "practicalTask": "Trigger a planned database failover in a test environment. Measure connection recovery, verify transaction behavior, inspect service events, and confirm that backups remain available independently."
    },
    {
      "title": "Zone Failure Operations, Capacity, and Validation",
      "explanation": "Multi-AZ architecture must be operated as a zone-level resilience capability, not just a deployment setting. Teams should know how to identify a zonal impairment, confirm which resources are affected, and verify that traffic is flowing through healthy zones. Automated scaling and load balancing must not amplify an outage by sending excessive retries to remaining capacity. Observability should break down errors, latency, saturation, and target health by zone. Regular tests should remove or isolate one zone in a controlled environment and verify both service continuity and safe restoration when the zone returns.",
      "responsibilities": [
        "Detect zone-specific degradation and service impairment",
        "Shift traffic to healthy zones safely",
        "Maintain capacity during reduced-zone operation",
        "Restore normal distribution after the failure ends"
      ],
      "implementation": [
        "Create per-zone dashboards and health alerts",
        "Use bounded retries and dependency circuit breakers",
        "Define operational steps for zonal isolation",
        "Automate reconciliation when failed-zone resources return"
      ],
      "productionConsiderations": [
        "Test one-zone loss under representative load",
        "Monitor cost and cross-zone traffic during failover",
        "Check that autoscaling does not create placement imbalance",
        "Document how to restore normal traffic distribution"
      ],
      "failureModes": [
        "Monitoring aggregates zones and hides local failure",
        "Remaining zones lack capacity for peak demand",
        "Automatic retries overload healthy targets",
        "Returning resources rejoin traffic before they are healthy"
      ],
      "practicalTask": "Run a zone-resilience exercise by isolating one zone's application targets. Validate alerting, traffic redistribution, remaining capacity, database behavior, and safe recovery of the isolated zone."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Use two zones or three zones?",
      "guidance": "Select the number based on availability objectives, platform support, workload capacity, and cost. Two zones can remove many single-zone risks; a third may improve fault tolerance and capacity flexibility but must be supported throughout the stack."
    },
    {
      "decision": "Should application traffic use cross-zone load balancing?",
      "guidance": "Enable it when the design benefits from distributing traffic across healthy targets in all zones. Evaluate data-transfer cost, zonal failure behavior, target health, and whether capacity is balanced without it."
    },
    {
      "decision": "Is a multi-AZ database the same as a read replica?",
      "guidance": "Not necessarily. A standby may exist for automatic failover rather than read traffic. Confirm the database service's exact replication, read, consistency, and promotion behavior before designing application access."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is a Multi-AZ architecture?",
      "answer": "Multi-AZ architecture places application and data resources across multiple isolated Availability Zones within one cloud region. It reduces dependence on one zone and allows traffic to continue through healthy zones when a zonal failure occurs."
    },
    {
      "question": "Does Multi-AZ protect against a complete regional outage?",
      "answer": "No. Availability Zones are within the same region. Multi-AZ protects against many zone-level failures, while regional disaster recovery requires a separate regional strategy with data protection and recovery procedures."
    },
    {
      "question": "What happens to traffic when one Availability Zone fails?",
      "answer": "Health checks and regional traffic management should stop routing new requests to unhealthy targets. Remaining zones must have sufficient capacity, and applications must reconnect to data services and dependencies that remain available."
    },
    {
      "question": "How do you verify a Multi-AZ deployment?",
      "answer": "Inspect actual resource placement, subnet and route configuration, database failover behavior, and per-zone health metrics. Conduct a controlled zone-loss test and measure user-visible errors, recovery time, capacity, and data consistency."
    }
  ]
},
  "multi-region": {
  "title": "Multi-Region Architecture",
  "subtitle": "Serving workloads across geographically separate cloud regions",
  "summary": "Multi-region architecture distributes application capabilities across geographically separate cloud regions to address regional outages, latency requirements, data residency, or global user demand. It introduces more complexity than multi-AZ design because regions have separate infrastructure, service quotas, networking, control planes, and often independent data copies. The architecture must define traffic steering, data replication, write ownership, conflict handling, failover authority, security boundaries, and failback procedures. Multi-region deployment is valuable only when the business requirement justifies its cost and operational burden.",
  "objectives": [
    "Understand regional failure domains and global traffic routing",
    "Choose active-active or active-passive deployment patterns",
    "Design cross-region data replication and consistency",
    "Operate regional failover, failback, and global observability"
  ],
  "diagram": [
    "Global users",
    "Global DNS or traffic manager",
    "Region A: edge entry, application, data services",
    "Cross-region replication or event exchange",
    "Region B: independent application and data services",
    "Regional health checks and failover controller",
    "Centralized monitoring with regional telemetry"
  ],
  "sections": [
    {
      "title": "Regional Topology, Global Entry, and Traffic Steering",
      "explanation": "A multi-region design begins by selecting regions that satisfy latency, service availability, data residency, and business continuity requirements. Each region should have the network, identity integration, compute, storage, and deployment dependencies needed to operate independently. Global DNS, anycast routing, or a managed traffic manager can direct users to a healthy region based on health, latency, geography, or policy. Health checks must represent real service capability and avoid routing traffic to a region whose application is running but whose data or critical dependencies are unavailable.",
      "responsibilities": [
        "Select regions based on business and regulatory requirements",
        "Provide independent regional infrastructure foundations",
        "Route users to suitable healthy regional endpoints",
        "Define health criteria and traffic-shifting ownership"
      ],
      "implementation": [
        "Deploy regional networks, subnets, and security boundaries",
        "Configure global DNS or traffic management policies",
        "Use regional health endpoints that validate critical dependencies",
        "Keep infrastructure definitions and releases consistent across regions"
      ],
      "productionConsiderations": [
        "Check service and feature availability in every chosen region",
        "Pre-plan quotas, certificates, secrets, and domain configuration",
        "Account for DNS caching and traffic convergence time",
        "Measure latency from actual user locations"
      ],
      "failureModes": [
        "A recovery region lacks a required cloud service or quota",
        "Global health checks report healthy while data access is broken",
        "DNS caching delays traffic movement",
        "Network and identity configuration differs between regions"
      ],
      "practicalTask": "Deploy a small test endpoint in two regions and configure global health-based routing. Disable one endpoint and measure how quickly test clients reach the healthy region."
    },
    {
      "title": "Active-Active and Active-Passive Regional Models",
      "explanation": "Active-active deployments serve traffic from multiple regions at the same time, improving geographic latency and reducing dependence on one region. They require careful data ownership, conflict handling, and consistent application behavior across locations. Active-passive deployments keep one region primary while another is ready to take over, simplifying write ownership but potentially increasing recovery time and standby cost. A pilot-light or warm-standby model can reduce cost while retaining essential recovery foundations. The choice must reflect data consistency, application state, operational maturity, and business recovery objectives.",
      "responsibilities": [
        "Select a regional operating model for each workload",
        "Maintain consistent application versions and configuration",
        "Control which region is permitted to accept writes",
        "Coordinate failover and failback authority"
      ],
      "implementation": [
        "Use active-active only with an explicit multi-writer data strategy",
        "Use active-passive promotion gates for primary ownership",
        "Automate regional infrastructure and application deployment",
        "Store regional state and secrets with controlled replication"
      ],
      "productionConsiderations": [
        "Test capacity when one region receives all global traffic",
        "Prevent two regions from promoting conflicting primary roles",
        "Keep release versions compatible during regional transition",
        "Define manual approval for high-impact write ownership changes"
      ],
      "failureModes": [
        "Active-active writes create conflicting records",
        "Both passive and primary regions accept writes after a network partition",
        "Standby region has insufficient capacity",
        "Regional configuration drift causes inconsistent application behavior"
      ],
      "practicalTask": "Document an active-passive plan for a stateful service. Define primary ownership, promotion approval, write fencing, traffic movement, and the conditions required before failback."
    },
    {
      "title": "Cross-Region Data Replication and Consistency",
      "explanation": "Data replication across regions is one of the most difficult parts of a multi-region system. Asynchronous replication can support low-latency local writes but introduces replication lag and potential data loss if the primary region fails before changes arrive. Synchronous cross-region writes may increase latency and depend on long-distance network availability. Active-active data stores may require conflict resolution, globally unique identifiers, partition ownership, or application-level reconciliation. Teams must define which data can be eventually consistent, which operations require a single writer, and how backups protect against replicated corruption or accidental deletion.",
      "responsibilities": [
        "Replicate required data to the recovery or serving region",
        "Define write ownership and conflict-resolution rules",
        "Measure replication lag and potential data loss",
        "Protect each region with independent backup and recovery"
      ],
      "implementation": [
        "Choose database-native replication or event-based synchronization",
        "Use stable identifiers and versioning for replicated records",
        "Implement conflict handling for concurrent updates",
        "Monitor replication state and apply controlled promotion procedures"
      ],
      "productionConsiderations": [
        "Set acceptable replication lag based on business RPO",
        "Test network interruption and delayed replication",
        "Keep encryption keys and backup copies independently recoverable",
        "Validate data integrity before switching regional writers"
      ],
      "failureModes": [
        "Recent writes are missing in the promoted region",
        "Conflicting updates overwrite valid business data",
        "Replication backlog grows unnoticed",
        "Corruption propagates to every replica and backup copy"
      ],
      "practicalTask": "Replicate test records between two regions. Introduce controlled network delay, measure replication lag, simulate primary loss, and verify the recovery point and conflict-handling rules."
    },
    {
      "title": "Regional Failover, Failback, and Global Operations",
      "explanation": "Regional failover is a coordinated business and technical operation. Teams must determine whether the primary region is genuinely unavailable, identify the last safe recovery point, fence the old writer, promote the recovery environment, validate application and data health, and redirect global traffic. Failback is not simply switching DNS back: the recovered region may contain stale data and must be reconciled before it can resume ownership. Global operations require regional dashboards, consistent alerting, deployment coordination, incident command, and repeated exercises that measure the complete user journey rather than only infrastructure status.",
      "responsibilities": [
        "Detect and declare regional incidents using agreed criteria",
        "Promote a safe recovery region without split-brain writes",
        "Validate transactions before directing production users",
        "Reconcile data and execute controlled failback"
      ],
      "implementation": [
        "Create a regional incident runbook with approval gates",
        "Automate health-based traffic changes with safe overrides",
        "Use write fencing or primary leases for stateful systems",
        "Maintain cross-region traces and business transaction checks"
      ],
      "productionConsiderations": [
        "Test recovery under realistic traffic and dependency conditions",
        "Measure actual RTO, RPO, and traffic convergence",
        "Coordinate releases so regions remain compatible",
        "Document data reconciliation and return-to-primary procedures"
      ],
      "failureModes": [
        "Old and new regions both accept writes",
        "Traffic moves before the recovery data is validated",
        "Failback overwrites newer records with stale copies",
        "Global monitoring hides a region-specific degradation"
      ],
      "practicalTask": "Conduct a controlled regional failover exercise. Fence the primary writer, promote the recovery region, validate critical transactions, redirect test traffic, and rehearse reconciliation before failback."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Active-active or active-passive across regions?",
      "guidance": "Choose active-active when global latency and continuous regional service justify complex data consistency and operations. Choose active-passive when one writer simplifies correctness and the recovery objective permits promotion time."
    },
    {
      "decision": "How should cross-region data be replicated?",
      "guidance": "Select synchronous or asynchronous replication based on latency, consistency, and RPO. Use database-native replication when supported, and define conflict resolution and write ownership explicitly for multi-writer systems."
    },
    {
      "decision": "Should global traffic fail over automatically?",
      "guidance": "Automatic routing is appropriate when health signals reliably prove that a region can serve valid requests. Stateful promotion may require approval and write fencing to prevent split-brain or data loss."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is the difference between Multi-AZ and Multi-Region?",
      "answer": "Multi-AZ distributes resources across isolated zones within one cloud region and mainly addresses zone-level failures. Multi-Region distributes workloads across geographically separate regions and can address regional outages and global latency, but adds data consistency and operational complexity."
    },
    {
      "question": "What is active-active multi-region architecture?",
      "answer": "Active-active means multiple regions serve production traffic simultaneously. It can reduce user latency and improve regional resilience, but requires a deliberate strategy for data replication, concurrent writes, conflict resolution, and global traffic distribution."
    },
    {
      "question": "What is the biggest challenge in multi-region architecture?",
      "answer": "Data consistency and safe ownership during failures are major challenges. Teams must understand replication lag, possible data loss, conflicting writes, and split-brain risks, while also maintaining independent regional infrastructure and reliable traffic steering."
    },
    {
      "question": "How do you perform regional failover safely?",
      "answer": "Confirm the incident, identify a safe recovery point, prevent the old region from accepting writes, promote the recovery region, validate data and business transactions, and then shift traffic. Record actual RTO and RPO and plan reconciliation before failback."
    }
  ]
},
  "monitoring-architecture": {
  "title": "Monitoring Architecture",
  "subtitle": "Designing metrics, alerting, and service health visibility",
  "summary": "Monitoring architecture collects and evaluates telemetry from applications, infrastructure, cloud services, and business workflows. It converts raw measurements into actionable information through metrics, dashboards, alert rules, and operational integrations. A production monitoring design must cover service-level objectives, signal quality, collection reliability, retention, cardinality, alert ownership, and failure of the monitoring platform itself. Monitoring should reveal user impact and system behavior rather than simply showing that servers are running.",
  "objectives": [
    "Understand metrics collection and monitoring pipelines",
    "Design service-level indicators and alert policies",
    "Build actionable dashboards for production operations",
    "Protect monitoring systems from gaps, overload, and blind spots"
  ],
  "diagram": [
    "Applications and infrastructure",
    "Metrics exporters and instrumentation",
    "Collectors and scrape agents",
    "Central metrics storage",
    "Query and dashboard layer",
    "Alert evaluation and notification routing",
    "On-call response and incident feedback"
  ],
  "sections": [
    {
      "title": "Instrumentation and Metrics Collection",
      "explanation": "Monitoring begins with reliable instrumentation at the application and infrastructure layers. Applications should expose measurements such as request count, error count, latency, queue depth, and active work, while infrastructure exporters report CPU, memory, disk, network, and platform health. Collection agents or scrapers gather these measurements and attach consistent labels that identify service, environment, region, and instance. Production instrumentation must avoid high-cardinality labels, protect endpoints from unauthorized access, and ensure that important signals remain available during scaling and deployment events.",
      "responsibilities": [
        "Instrument application and infrastructure health signals",
        "Standardize service and environment labels",
        "Expose metrics through secured collection endpoints",
        "Ensure telemetry coverage across critical dependencies"
      ],
      "implementation": [
        "Add application instrumentation for request rate, errors, and latency",
        "Deploy exporters for hosts, containers, and managed services",
        "Configure scrape intervals, discovery, and authentication",
        "Use consistent metric naming and units"
      ],
      "productionConsiderations": [
        "Control label cardinality to protect storage and query performance",
        "Monitor scrape failures and missing targets",
        "Keep instrumentation overhead within acceptable limits",
        "Validate metric coverage after autoscaling and deployments"
      ],
      "failureModes": [
        "Exporter endpoints become unreachable",
        "High-cardinality labels exhaust storage resources",
        "Metrics use inconsistent units and produce misleading dashboards",
        "New instances start without being discovered by collectors"
      ],
      "practicalTask": "Instrument a sample API and its runtime. Collect request rate, error rate, latency, CPU, and memory metrics, then verify that labels remain consistent when a new instance is added."
    },
    {
      "title": "Service-Level Indicators, Objectives, and Alert Design",
      "explanation": "A useful monitoring system connects technical measurements to user-visible service quality. Service-level indicators measure outcomes such as successful request ratio, latency, availability, and freshness. Service-level objectives define the target for those indicators over a measurement window, while an error budget represents the permitted unreliability. Alerts should identify conditions requiring action, not merely report every metric fluctuation. Multi-window burn-rate alerts can reveal rapid error-budget consumption, while symptom-based alerts help teams prioritize real customer impact over isolated infrastructure noise.",
      "responsibilities": [
        "Define measurable service-level indicators",
        "Set realistic objectives based on business expectations",
        "Alert on user impact and actionable failure conditions",
        "Track error-budget consumption and reliability trends"
      ],
      "implementation": [
        "Measure successful and failed requests at service boundaries",
        "Create latency indicators using appropriate percentiles",
        "Define SLO windows and error-budget policies",
        "Route alerts according to severity and service ownership"
      ],
      "productionConsiderations": [
        "Use sustained conditions to reduce transient alert noise",
        "Separate paging alerts from informational notifications",
        "Review alert usefulness after incidents",
        "Avoid treating CPU utilization alone as proof of service failure"
      ],
      "failureModes": [
        "Alerts trigger on harmless short-lived spikes",
        "Critical user failures remain invisible because only host metrics are monitored",
        "Incorrect SLO windows hide sustained degradation",
        "No owner receives an actionable notification"
      ],
      "practicalTask": "Define an availability SLI and latency SLI for an API. Set an SLO, create a burn-rate alert, and verify that a controlled error increase produces the expected notification."
    },
    {
      "title": "Dashboards, Capacity, and Operational Analysis",
      "explanation": "Dashboards organize telemetry so operators can understand service health, investigate changes, and identify resource constraints. A useful dashboard starts with service outcomes and then provides drill-down views for traffic, errors, latency, saturation, dependencies, and infrastructure. Capacity dashboards should show trends and limits rather than only current utilization. Variables and filters must make it possible to compare environments, regions, and service versions without creating misleading aggregations. Production dashboards should be version-controlled, reviewed during releases, and designed for incident use rather than decoration.",
      "responsibilities": [
        "Present service health and business outcomes clearly",
        "Enable drill-down from symptoms to contributing components",
        "Track capacity and resource saturation over time",
        "Standardize dashboards for consistent operations"
      ],
      "implementation": [
        "Create overview panels for traffic, errors, latency, and saturation",
        "Add dependency and per-instance drill-down views",
        "Use dashboard variables for environment and region filters",
        "Store dashboard definitions in version control"
      ],
      "productionConsiderations": [
        "Display units, time ranges, and aggregation methods clearly",
        "Avoid averages that hide tail latency",
        "Review dashboard performance and query cost",
        "Keep critical incident dashboards accessible during outages"
      ],
      "failureModes": [
        "Aggregated panels hide one failing instance or region",
        "Incorrect units lead to wrong capacity decisions",
        "Dashboards depend on unavailable external data sources",
        "Unversioned changes remove important incident panels"
      ],
      "practicalTask": "Build a service overview dashboard containing request rate, error ratio, p95 latency, CPU, memory, and dependency latency. Inject a controlled failure and use the dashboard to locate its impact."
    },
    {
      "title": "Alert Delivery, Monitoring Resilience, and Governance",
      "explanation": "Monitoring is itself a production dependency and must remain useful during incidents. Alert evaluation, notification routing, dashboards, and telemetry storage should have defined availability, access control, and retention. Notifications need deduplication, grouping, escalation, and clear runbook links so that responders can act quickly. Monitoring governance defines metric ownership, naming rules, retention, access permissions, and review practices. Teams should test alert delivery and monitor telemetry gaps, because a silent monitoring failure can make an application outage harder to detect and resolve.",
      "responsibilities": [
        "Deliver alerts to the correct on-call responders",
        "Protect monitoring data and administrative access",
        "Maintain telemetry availability and retention",
        "Govern alert rules, metric ownership, and runbooks"
      ],
      "implementation": [
        "Configure notification channels and escalation policies",
        "Use alert grouping, deduplication, and inhibition rules",
        "Back up monitoring configuration and dashboards",
        "Attach runbooks and service ownership metadata to alerts"
      ],
      "productionConsiderations": [
        "Test notification delivery and escalation regularly",
        "Monitor collector health and telemetry ingestion delay",
        "Restrict access to sensitive operational labels and data",
        "Define retention and disaster recovery for monitoring storage"
      ],
      "failureModes": [
        "Alert manager failure prevents incident notifications",
        "Notification storms overwhelm on-call responders",
        "Monitoring storage fills and drops new samples",
        "Stale alert rules continue paging after a service is retired"
      ],
      "practicalTask": "Simulate a critical alert and verify its complete path from metric evaluation to on-call notification. Test deduplication, escalation, runbook access, and monitoring-system health alerts."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Push-based or pull-based metric collection?",
      "guidance": "Use pull-based collection when targets can be discovered and scraped reliably. Use push or remote-write approaches for short-lived jobs, restricted networks, or systems where a collector cannot initiate connections. Protect the ingestion endpoint either way."
    },
    {
      "decision": "Alert on infrastructure metrics or service symptoms?",
      "guidance": "Prioritize user-visible symptoms such as errors, latency, and availability. Use infrastructure metrics to explain causes and predict capacity problems, rather than paging on every resource threshold."
    },
    {
      "decision": "Centralized or team-owned dashboards?",
      "guidance": "Use shared service-health conventions and platform-level views, while allowing teams to own detailed service dashboards. Version-control definitions and retain clear ownership so that dashboards remain reliable."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is the difference between monitoring and observability?",
      "answer": "Monitoring evaluates known signals and conditions using metrics, dashboards, and alerts. Observability is the ability to understand internal system behavior from emitted telemetry such as metrics, logs, and traces, including failures that were not anticipated in advance."
    },
    {
      "question": "What are the four golden signals?",
      "answer": "The four golden signals are latency, traffic, errors, and saturation. Latency measures response time, traffic measures demand, errors measure failed operations, and saturation shows how close a resource or service is to its capacity limit."
    },
    {
      "question": "What is an SLO and why is it important?",
      "answer": "A Service Level Objective is a measurable target for service reliability over a defined period. It helps teams balance feature delivery and operational risk by making reliability expectations and error-budget consumption visible."
    },
    {
      "question": "How do you reduce alert fatigue?",
      "answer": "Create alerts around actionable user impact, use sustained conditions and suitable thresholds, group duplicate notifications, assign clear ownership, and link runbooks. Regularly remove alerts that do not lead to useful investigation or action."
    }
  ]
},
  "logging-architecture": {
  "title": "Logging Architecture",
  "subtitle": "Centralized, searchable, and secure application log pipelines",
  "summary": "Logging architecture collects structured events from applications, containers, hosts, network components, and cloud services, then transports, processes, stores, and exposes them for investigation. A production design must handle bursts, backpressure, parsing errors, retention, access control, sensitive-data masking, and search performance. Logs should support incident investigation and audit needs without becoming an uncontrolled source of cost or confidential information. Correlation identifiers and consistent schemas make it possible to connect events across distributed services.",
  "objectives": [
    "Design structured logging and correlation conventions",
    "Build reliable log collection and ingestion pipelines",
    "Manage indexing, retention, access, and storage cost",
    "Use logs for incident investigation and security auditing"
  ],
  "diagram": [
    "Applications, containers, hosts, and cloud services",
    "Local log output and collection agents",
    "Buffering and transport layer",
    "Parsing, enrichment, and sensitive-data filtering",
    "Central log indexing and storage",
    "Search, dashboards, and alert rules",
    "Incident response and audit workflows"
  ],
  "sections": [
    {
      "title": "Structured Logging and Event Schema",
      "explanation": "Structured logs represent application events as consistently named fields rather than unstructured text alone. A JSON event can include timestamp, severity, service name, environment, trace ID, request ID, operation, and error details. This allows search systems to filter and aggregate events without fragile text matching. Teams should define severity levels and avoid logging passwords, access tokens, payment data, or unnecessary personal information. Production logging conventions must also account for time synchronization, multiline exceptions, schema evolution, and consistent correlation identifiers across services.",
      "responsibilities": [
        "Define a consistent structured log schema",
        "Record useful context for application and infrastructure events",
        "Propagate trace and request identifiers across services",
        "Prevent sensitive information from entering log output"
      ],
      "implementation": [
        "Emit JSON logs with stable field names and timestamps",
        "Use consistent severity levels and error categories",
        "Include service, environment, version, and correlation IDs",
        "Normalize exceptions and multiline stack traces"
      ],
      "productionConsiderations": [
        "Synchronize system clocks and use UTC timestamps",
        "Mask secrets and sensitive fields before collection",
        "Keep log messages useful without excessive payload size",
        "Validate schema compatibility across application versions"
      ],
      "failureModes": [
        "Unstructured messages make incident searches unreliable",
        "Missing correlation IDs prevent request tracing",
        "Credentials appear in logs and create a security incident",
        "Timestamp inconsistencies make event ordering misleading"
      ],
      "practicalTask": "Configure a sample service to emit JSON logs with timestamp, severity, service, environment, and trace ID. Generate an error and verify that the event can be filtered without exposing secrets."
    },
    {
      "title": "Collection Agents, Buffering, and Log Transport",
      "explanation": "Log collection agents read application files, container streams, system journals, or platform log endpoints and forward events to a central pipeline. The transport layer must tolerate network interruptions and ingestion bursts without silently losing critical events. Local buffers can absorb temporary outages, but they require disk limits and clear behavior when full. Container environments need metadata enrichment so operators can identify the workload, namespace, node, and deployment version that produced a log. Production collectors should be monitored for lag, dropped records, retry activity, and resource consumption.",
      "responsibilities": [
        "Collect logs from all required runtime sources",
        "Enrich records with workload and infrastructure metadata",
        "Buffer events during temporary transport failures",
        "Deliver logs reliably to central ingestion endpoints"
      ],
      "implementation": [
        "Deploy agents or sidecars using supported collection patterns",
        "Configure file rotation and container log discovery",
        "Use bounded buffers and retry with backoff",
        "Secure transport using TLS and authenticated endpoints"
      ],
      "productionConsiderations": [
        "Set disk and memory limits for collector buffers",
        "Monitor dropped records and ingestion lag",
        "Avoid duplicate collection from overlapping agents",
        "Test behavior during central endpoint unavailability"
      ],
      "failureModes": [
        "Buffer exhaustion causes log loss",
        "Agent configuration misses newly created containers",
        "Network interruption creates an unbounded retry backlog",
        "Duplicate collectors ingest the same source repeatedly"
      ],
      "practicalTask": "Deploy a log collector for a containerized service. Stop the central receiver temporarily, generate application logs, restore the receiver, and verify buffer behavior, delivery lag, and dropped-record metrics."
    },
    {
      "title": "Centralized Storage, Indexing, and Retention",
      "explanation": "Centralized log storage makes it possible to search events from multiple services and environments in one place. Ingestion pipelines commonly parse fields, normalize timestamps, enrich metadata, remove sensitive values, and route records to appropriate indexes or storage tiers. Indexing improves search but consumes compute and storage resources, especially when every field is indexed or high-cardinality values are used. Retention should reflect operational investigation needs, compliance requirements, and cost. Production platforms often combine fast searchable storage with lower-cost archival storage and documented deletion policies.",
      "responsibilities": [
        "Store logs centrally with searchable metadata",
        "Normalize and enrich events during ingestion",
        "Apply retention and archival policies",
        "Balance query performance against storage cost"
      ],
      "implementation": [
        "Create index or stream policies by service and environment",
        "Parse structured fields and route records by data class",
        "Use lifecycle policies for hot, warm, and archive tiers",
        "Automate retention and deletion according to policy"
      ],
      "productionConsiderations": [
        "Estimate daily ingest volume and index expansion",
        "Limit unnecessary indexed fields and high-cardinality data",
        "Monitor storage growth and query latency",
        "Test archive retrieval before relying on it for audits"
      ],
      "failureModes": [
        "Index growth exhausts storage or raises operating cost",
        "Parsing failures place records in unusable fields",
        "Retention removes evidence before an investigation completes",
        "Archive restoration takes longer than the incident process allows"
      ],
      "practicalTask": "Send structured logs into a central index, create a query for a correlation ID, and configure a retention policy. Verify that archived records can be retrieved and that expired data is removed as intended."
    },
    {
      "title": "Log Security, Search, Alerting, and Incident Investigation",
      "explanation": "Logs frequently contain operational details that can reveal architecture, identities, or sensitive business activity. Access should therefore be controlled by role and environment, and audit records should capture administrative searches, exports, and policy changes where required. Search and alert rules should focus on meaningful patterns such as repeated authentication failures, application exceptions, or unusual privilege activity. During an incident, responders should search by time window, service, severity, and correlation ID, then connect log evidence with metrics and traces. Logging systems must preserve useful evidence while respecting privacy and retention rules.",
      "responsibilities": [
        "Restrict log access according to operational responsibility",
        "Detect security and application patterns from log events",
        "Support rapid correlation during incident response",
        "Maintain auditability of log access and export"
      ],
      "implementation": [
        "Apply role-based access and environment separation",
        "Create alerts for important security and application events",
        "Use trace IDs and request IDs for cross-service searches",
        "Record access and administrative actions where supported"
      ],
      "productionConsiderations": [
        "Mask sensitive data before it reaches central storage",
        "Review permissions and export controls regularly",
        "Protect audit logs against unauthorized alteration",
        "Ensure incident responders can access required evidence"
      ],
      "failureModes": [
        "Overly broad access exposes confidential operational data",
        "Sensitive values leak through exception messages",
        "Alert rules miss attacks due to inconsistent log formats",
        "Log deletion or tampering removes incident evidence"
      ],
      "practicalTask": "Investigate a simulated authentication incident using centralized logs. Filter by identity, source, time, and correlation ID, verify access controls, and confirm that sensitive fields are masked."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Structured or plain-text logging?",
      "guidance": "Prefer structured JSON for production services because fields can be filtered and aggregated consistently. Plain text may remain useful for human-oriented tools, but it should not be the only source for important application events."
    },
    {
      "decision": "Collect logs with an agent, sidecar, or direct API?",
      "guidance": "Choose based on runtime, platform, isolation, and operational overhead. Node-level agents reduce per-container duplication, while sidecars can provide workload-specific processing. Direct APIs require careful buffering and retry design."
    },
    {
      "decision": "How long should logs be retained?",
      "guidance": "Set retention by operational use, audit obligations, privacy rules, and cost. Keep searchable high-value data for the required investigation window and archive only when retrieval time and integrity meet the business need."
    }
  ],
  "interviewQuestions": [
    {
      "question": "Why is structured logging important?",
      "answer": "Structured logging stores events as named fields such as timestamp, severity, service, and trace ID. This makes filtering, aggregation, alerting, and correlation more reliable than searching inconsistent free-form messages."
    },
    {
      "question": "What is log correlation?",
      "answer": "Log correlation connects events produced by different components using shared identifiers such as trace ID, request ID, or transaction ID. It helps responders follow one user request across multiple services and locate the component that failed."
    },
    {
      "question": "How do you prevent log loss during an ingestion outage?",
      "answer": "Use bounded local or intermediate buffers, reliable retry policies, monitored collectors, and capacity planning. Define what happens when buffers fill, and alert on dropped records and ingestion delay instead of assuming delivery is guaranteed."
    },
    {
      "question": "How do you secure a centralized logging platform?",
      "answer": "Use role-based access, encryption in transit and at rest, sensitive-data masking, retention controls, and audit logging. Restrict exports and administrative actions, and ensure that logs cannot expose credentials or unnecessary personal information."
    }
  ]
},
  "iam-architecture": {
  "title": "IAM Architecture",
  "subtitle": "Identity, authentication, authorization, and least-privilege access",
  "summary": "Identity and Access Management architecture controls who or what can access systems, APIs, cloud resources, and sensitive data. It combines identity providers, authentication, authorization policies, roles, federation, workload identities, credential lifecycle, and audit evidence. A production IAM design uses least privilege, short-lived credentials, strong authentication, separation of duties, and controlled privilege elevation. Identity is a critical dependency: outages, misconfigured trust relationships, or compromised credentials can affect the entire environment.",
  "objectives": [
    "Understand identity federation and authentication flows",
    "Design least-privilege roles and authorization policies",
    "Secure human and workload identities",
    "Audit access and manage credential lifecycle"
  ],
  "diagram": [
    "Human users and workload identities",
    "Identity provider and federation",
    "Authentication with MFA",
    "Role or policy evaluation",
    "Cloud APIs and application resources",
    "Short-lived session credentials",
    "Central audit logs and access reviews"
  ],
  "sections": [
    {
      "title": "Identity Providers, Federation, and Authentication",
      "explanation": "An identity provider establishes and verifies the identity of a human user or workload. Federation allows an application or cloud platform to trust an external identity provider through protocols such as SAML or OpenID Connect, reducing the need for separate long-lived credentials. Authentication proves who the principal is, while authorization determines what that principal may do. Production authentication should enforce multifactor authentication for privileged human access, validate token issuer and audience, use secure redirect settings, and define session duration and revocation behavior.",
      "responsibilities": [
        "Centralize identity verification where appropriate",
        "Federate users and workloads through trusted protocols",
        "Enforce strong authentication for sensitive operations",
        "Separate authentication from resource authorization"
      ],
      "implementation": [
        "Integrate supported identity providers using OIDC or SAML",
        "Require MFA for privileged and remote human access",
        "Validate token issuer, audience, signature, and expiry",
        "Configure session duration and logout behavior"
      ],
      "productionConsiderations": [
        "Protect federation metadata, signing keys, and redirect URIs",
        "Plan identity-provider outage and break-glass access",
        "Review authentication logs and unusual sign-in patterns",
        "Test token rotation and identity lifecycle changes"
      ],
      "failureModes": [
        "Incorrect trust configuration permits unauthorized federation",
        "Expired signing keys interrupt all logins",
        "Weak MFA policy exposes privileged accounts",
        "Incorrect token audience allows a token to be accepted by the wrong service"
      ],
      "practicalTask": "Configure a test application with OIDC federation. Validate issuer, audience, signature, and expiry, then verify that an unauthenticated user and an invalid token are rejected."
    },
    {
      "title": "Authorization, Roles, Policies, and Least Privilege",
      "explanation": "Authorization determines which actions an authenticated principal may perform on specific resources. Role-based access control assigns permissions through job or workload roles, while attribute-based policies can evaluate identity, resource, environment, and request context. Cloud IAM policies should grant only the actions and resource scopes required for a task. Broad wildcard permissions and shared administrator credentials increase the impact of compromise. Production authorization needs policy review, separation of duties, explicit deny behavior where supported, and testing of both allowed and denied actions.",
      "responsibilities": [
        "Grant only necessary actions on intended resources",
        "Separate administrative, deployment, and runtime permissions",
        "Use roles and policy conditions to express access boundaries",
        "Prevent privilege escalation through unsafe permissions"
      ],
      "implementation": [
        "Create task-specific roles for applications and operators",
        "Scope policies to resource identifiers and required actions",
        "Use conditions for environment, network, or identity context",
        "Test policy changes using simulation or controlled accounts"
      ],
      "productionConsiderations": [
        "Review wildcard actions and resource permissions",
        "Separate production approval from deployment execution",
        "Use time-bound privilege elevation for sensitive access",
        "Maintain documented ownership for privileged roles"
      ],
      "failureModes": [
        "A broad wildcard policy grants unintended access",
        "A deployment role can modify its own trust policy",
        "Shared credentials prevent accountability",
        "Policy conditions block legitimate automation or fail open unexpectedly"
      ],
      "practicalTask": "Create a least-privilege role for a deployment task. Verify required actions succeed, unrelated resource access is denied, and the role cannot grant itself additional permissions."
    },
    {
      "title": "Workload Identity, Secrets, and Credential Lifecycle",
      "explanation": "Applications, CI/CD pipelines, containers, and virtual machines need identities to access cloud APIs and internal services. Workload identity provides a controlled alternative to embedding permanent access keys in source code or configuration files. Short-lived credentials reduce the time available to misuse a stolen token, while secret managers support rotation and controlled retrieval for credentials that remain necessary. Production systems must define trust boundaries, token audiences, service-account permissions, secret rotation, and emergency revocation. Credentials should never be printed in build logs or container images.",
      "responsibilities": [
        "Give each workload a distinct identity",
        "Replace long-lived embedded keys with short-lived credentials",
        "Manage required secrets through approved secret stores",
        "Rotate and revoke credentials safely"
      ],
      "implementation": [
        "Use instance roles, workload federation, or service-account identity",
        "Retrieve secrets at runtime using scoped permissions",
        "Automate rotation and update dependent services safely",
        "Scan repositories and build artifacts for exposed credentials"
      ],
      "productionConsiderations": [
        "Limit token lifetime and audience",
        "Audit workload identity assumptions and trust policies",
        "Prevent secrets from appearing in logs or image layers",
        "Test rotation without causing service interruption"
      ],
      "failureModes": [
        "A leaked access key remains valid for months",
        "A workload assumes a role outside its intended trust boundary",
        "Secret rotation breaks applications using cached credentials",
        "Container images contain credentials copied during build"
      ],
      "practicalTask": "Replace a test pipeline access key with federated workload identity. Run the deployment, verify the issued session permissions and expiry, and confirm no permanent credential is stored in the repository."
    },
    {
      "title": "Access Governance, Auditing, and Emergency Privilege",
      "explanation": "IAM governance ensures access remains appropriate as people, services, and responsibilities change. Joiner, mover, and leaver processes should create, modify, and revoke access promptly. Periodic access reviews identify unused roles, excessive permissions, stale credentials, and orphaned service identities. Audit logs provide evidence of authentication, policy changes, role assumptions, and sensitive resource operations. Emergency break-glass access should be tightly controlled, monitored, time-limited, and tested so that it remains available during identity-provider or automation failures without becoming a routine administrator path.",
      "responsibilities": [
        "Manage access throughout the identity lifecycle",
        "Review and remove unused or excessive permissions",
        "Maintain audit evidence for sensitive operations",
        "Provide controlled emergency access procedures"
      ],
      "implementation": [
        "Automate provisioning and deprovisioning from authoritative identity sources",
        "Run scheduled access reviews and stale credential reports",
        "Centralize IAM audit events and alert on privilege changes",
        "Create protected break-glass roles with approval and logging"
      ],
      "productionConsiderations": [
        "Revoke access promptly when employment or ownership changes",
        "Test emergency access without exposing permanent credentials",
        "Separate policy administration from routine application deployment",
        "Retain audit records according to compliance requirements"
      ],
      "failureModes": [
        "Former users retain active access",
        "Orphaned workload identities remain privileged",
        "Emergency credentials are used without review",
        "Audit logs are disabled or unavailable during a security incident"
      ],
      "practicalTask": "Perform an access review in a test environment. Identify unused roles, revoke a test identity, verify audit events, and exercise the documented break-glass approval and expiration process."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Use long-lived access keys or federated workload identity?",
      "guidance": "Prefer short-lived federated or platform-issued credentials for workloads. Use static secrets only when a target system requires them, and then store, rotate, scope, and audit them through a managed secret process."
    },
    {
      "decision": "Use role-based or attribute-based authorization?",
      "guidance": "Use role-based access for clear job and workload responsibilities. Add attribute-based conditions when resource ownership, environment, network, or request context must further restrict access. Avoid policies that are too complex to audit."
    },
    {
      "decision": "Should administrators have permanent broad access?",
      "guidance": "Avoid routine permanent administrator privileges. Use least-privilege roles and time-bound elevation with approval, strong authentication, and audit trails. Keep a separately protected emergency path for genuine identity outages."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is the difference between authentication and authorization?",
      "answer": "Authentication verifies the identity of a user or workload. Authorization evaluates what that authenticated identity is allowed to do on a resource. A valid login does not automatically grant permission to perform every operation."
    },
    {
      "question": "What is the principle of least privilege?",
      "answer": "Least privilege means granting only the minimum actions, resources, and duration required to complete a task. It reduces the impact of compromised accounts, accidental changes, and excessive application permissions."
    },
    {
      "question": "Why is workload identity better than storing cloud access keys?",
      "answer": "Workload identity can issue short-lived credentials based on a trusted runtime or federation relationship. This avoids embedding permanent keys in repositories, images, or pipeline variables and makes access easier to scope and audit."
    },
    {
      "question": "What is a break-glass account?",
      "answer": "A break-glass account is a tightly controlled emergency identity used when normal authentication or administrative paths are unavailable. It should have strong protection, limited use, approval and audit requirements, and a tested recovery procedure."
    }
  ]
},
  "network-security": {
  "title": "Network Security",
  "subtitle": "Protecting network boundaries, traffic flows, and service connectivity",
  "summary": "Network security architecture protects workloads and data by controlling ingress, egress, east-west communication, and administrative access. It combines network segmentation, firewalls, security groups, network ACLs, private endpoints, encryption, DNS controls, web application protection, and centralized inspection. A production design begins with explicit traffic requirements and a threat model rather than opening broad network ranges for convenience. Security controls must preserve service availability, provide useful audit evidence, and be tested whenever network routes or application dependencies change.",
  "objectives": [
    "Design secure network segmentation and traffic boundaries",
    "Control ingress, egress, and east-west communication",
    "Use encryption, private connectivity, and inspection controls",
    "Monitor network threats and validate security policy changes"
  ],
  "diagram": [
    "Internet and untrusted clients",
    "DNS, CDN, and web application firewall",
    "Public ingress load balancer",
    "Private application subnets and service boundaries",
    "Restricted database and data subnets",
    "Egress inspection and private service endpoints",
    "Network flow logs, security analytics, and alerts"
  ],
  "sections": [
    {
      "title": "Network Segmentation and Security Boundaries",
      "explanation": "Network segmentation limits how far an attacker or misconfigured workload can move after gaining access to one component. Public entry points, application workloads, data services, management interfaces, and shared platform services should have distinct boundaries with explicitly permitted communication paths. Cloud security groups commonly provide stateful workload-level filtering, while network ACLs or firewalls can enforce additional subnet or network-wide controls. Production segmentation must reflect actual application dependencies and should be managed consistently through infrastructure as code to avoid undocumented access paths.",
      "responsibilities": [
        "Separate public, application, data, and management zones",
        "Allow only documented source and destination traffic",
        "Limit lateral movement between workloads",
        "Maintain traceable ownership for network rules"
      ],
      "implementation": [
        "Create subnet and security-group boundaries by workload role",
        "Use narrowly scoped ports and source identities",
        "Apply network policies for container and service traffic",
        "Manage network rules through reviewed infrastructure code"
      ],
      "productionConsiderations": [
        "Review broad CIDR ranges and unrestricted ports",
        "Document required east-west service dependencies",
        "Test policy changes in a controlled environment",
        "Remove stale rules after service retirement"
      ],
      "failureModes": [
        "A public subnet exposes a database endpoint",
        "Broad internal rules allow unrestricted lateral movement",
        "A missing dependency rule causes production outages",
        "Manual changes create configuration drift between environments"
      ],
      "practicalTask": "Create separate public, application, and database network zones. Permit only HTTPS ingress and the required application-to-database port, then verify that unrelated paths are denied."
    },
    {
      "title": "Ingress, Egress, and Web Traffic Protection",
      "explanation": "Ingress controls determine which external clients can reach an application, while egress controls determine where workloads can send traffic. Public applications commonly use a CDN, web application firewall, and load balancer to absorb traffic, terminate TLS, and block common web attacks before requests reach private services. Egress filtering limits data exfiltration and reduces the impact of compromised workloads, but it must account for package repositories, APIs, DNS, time synchronization, and cloud service endpoints. Production policies should be based on observed dependencies and reviewed as application integrations change.",
      "responsibilities": [
        "Protect public entry points from malicious and excessive traffic",
        "Restrict outbound destinations to approved dependencies",
        "Terminate and validate encrypted web connections",
        "Preserve required application connectivity during filtering"
      ],
      "implementation": [
        "Place WAF and load-balancing controls before application targets",
        "Use TLS certificates and secure protocol configurations",
        "Route outbound traffic through controlled gateways or inspection",
        "Use private endpoints for supported cloud services"
      ],
      "productionConsiderations": [
        "Monitor blocked requests and unusual outbound destinations",
        "Test WAF rules to avoid blocking legitimate application traffic",
        "Rotate certificates before expiration",
        "Review DNS and proxy paths for unexpected bypasses"
      ],
      "failureModes": [
        "Unrestricted egress enables data exfiltration",
        "Overly strict egress blocks critical APIs or updates",
        "WAF false positives reject legitimate customer requests",
        "Expired certificates interrupt secure connections"
      ],
      "practicalTask": "Place a test web application behind a WAF and load balancer. Configure HTTPS and a controlled egress policy, then verify legitimate requests succeed and an intentionally disallowed outbound destination is blocked."
    },
    {
      "title": "Encryption, Private Connectivity, and Network Identity",
      "explanation": "Network security requires protecting data while it moves between users, services, and infrastructure. TLS provides encryption and server identity for network connections, while mutual TLS can authenticate both communicating services. Private endpoints and private service connectivity reduce exposure to public internet routes when accessing supported managed services. Network identity should complement, not replace, application authorization: a workload allowed to connect to a port must still prove its identity and receive permission for the requested operation. Certificate lifecycle, trust bundles, DNS resolution, and private routing must be managed consistently.",
      "responsibilities": [
        "Encrypt sensitive traffic in transit",
        "Authenticate service endpoints and clients where required",
        "Use private paths for supported managed services",
        "Separate network reachability from application authorization"
      ],
      "implementation": [
        "Enforce modern TLS configurations and certificate validation",
        "Use mTLS for sensitive service-to-service communication where justified",
        "Configure private endpoints and private DNS zones",
        "Automate certificate issuance, renewal, and trust distribution"
      ],
      "productionConsiderations": [
        "Monitor certificate expiry and failed handshakes",
        "Validate DNS resolution from every workload network",
        "Restrict private endpoint policies and consumer access",
        "Rotate trust material without interrupting active services"
      ],
      "failureModes": [
        "Expired certificates cause widespread connection failures",
        "Incorrect private DNS resolves to public endpoints",
        "Trust-store mismatch breaks mutual TLS",
        "Private connectivity is mistaken for sufficient authorization"
      ],
      "practicalTask": "Configure a test service with TLS and a private endpoint. Validate certificate trust, DNS resolution from an approved subnet, and denial of access from an unauthorized network."
    },
    {
      "title": "Network Monitoring, Threat Detection, and Policy Operations",
      "explanation": "Network security controls must produce evidence that operators can use to detect suspicious traffic and troubleshoot legitimate connectivity failures. Flow logs, firewall events, WAF records, DNS query logs, and load-balancer access logs provide different views of network behavior. Central analysis can identify unexpected ports, unusual outbound destinations, denied connection spikes, scanning patterns, and traffic changes after deployments. Security teams should correlate network evidence with identity and application logs, while network changes should follow review, staged deployment, validation, and rollback procedures.",
      "responsibilities": [
        "Collect network and firewall evidence centrally",
        "Detect suspicious traffic and policy violations",
        "Troubleshoot denied and unexpectedly allowed connections",
        "Govern network policy changes and emergency access"
      ],
      "implementation": [
        "Enable supported flow logs and firewall logging",
        "Route WAF, DNS, and load-balancer logs to central analysis",
        "Create alerts for unusual traffic and rule changes",
        "Use change reviews and automated policy validation"
      ],
      "productionConsiderations": [
        "Protect log integrity and restrict security-log access",
        "Monitor log delivery gaps and retention",
        "Correlate network events with workload identity and traces",
        "Test rollback procedures for high-impact network changes"
      ],
      "failureModes": [
        "Missing flow logs hide unauthorized communication",
        "Noisy alerts obscure real scanning or exfiltration",
        "A policy change blocks a critical dependency",
        "Emergency firewall changes remain open after the incident"
      ],
      "practicalTask": "Enable flow logs and firewall logging for a test network. Generate allowed and denied connections, search by source and destination, and verify that a policy change is auditable and reversible."
    }
  ],
  "architectureDecisions": [
    {
      "decision": "Use security groups or network ACLs for workload protection?",
      "guidance": "Use stateful security groups for workload-level communication controls and subnet-level ACLs or firewalls for additional boundary enforcement. Understand rule evaluation and return-traffic behavior before combining them."
    },
    {
      "decision": "Allow broad outbound internet access or controlled egress?",
      "guidance": "Prefer controlled egress for sensitive production workloads. Define approved destinations, use private endpoints where possible, and monitor blocked requests so security restrictions do not silently break required application operations."
    },
    {
      "decision": "Is a private subnet enough to secure a database?",
      "guidance": "No. Private placement reduces public exposure but must be combined with narrow network rules, strong identity, database authorization, encryption, patching, auditing, and tested backup and recovery controls."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is network segmentation?",
      "answer": "Network segmentation divides infrastructure into separate security zones and restricts communication between them. It reduces lateral movement, limits exposure, and ensures that only required traffic can pass between public entry points, application services, databases, and management systems."
    },
    {
      "question": "What is the difference between ingress and egress filtering?",
      "answer": "Ingress filtering controls traffic entering a network or workload. Egress filtering controls traffic leaving it. Both are important because ingress reduces unauthorized access while egress limits unwanted communication and potential data exfiltration."
    },
    {
      "question": "What is the purpose of a Web Application Firewall?",
      "answer": "A WAF inspects HTTP and HTTPS requests and can block or challenge common web attacks, malicious request patterns, and unwanted traffic. It protects web entry points but does not replace secure application code, authentication, or network segmentation."
    },
    {
      "question": "How do you troubleshoot a network connectivity failure securely?",
      "answer": "Trace the connection path from source to destination. Check DNS resolution, routes, security groups, network ACLs, firewalls, private endpoints, TLS certificates, and application listeners. Use flow logs and firewall events to identify the exact denied hop, then change only the required rule."
    }
  ]
}
} as Record<string, ArchitectureTopicContent>;

export function getArchitectureTopic(topic: string) {
  const key = topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return architectureTopicContent[key] ?? null;
}
