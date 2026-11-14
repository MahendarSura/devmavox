"use client";

import React, { useMemo, useState } from "react";
import { parseDocument } from "yaml";

type TopicName = "Service" | "Ingress" | "NetworkPolicy";

type LessonSection = {
  heading: string;
  explanation: string;
  details: string[];
};

type Exercise = {
  title: string;
  task: string;
  hint: string;
  solution: string;
};

type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type TopicContent = {
  subtitle: string;
  purpose: string;
  objectives: string[];
  sections: LessonSection[];
  yaml: string;
  brokenYaml: string;
  exercises: Exercise[];
  debugging: { symptom: string; cause: string; fix: string }[];
  scenarios: { title: string; situation: string; response: string }[];
  quiz: QuizQuestion[];
};

const content: Record<TopicName, TopicContent> = {
  Service: {
    subtitle: "Stable network identity and service discovery for Kubernetes workloads",
    purpose:
      "A Kubernetes Service exposes a logical group of Pods through a stable virtual network endpoint. Pods are replaceable and their IP addresses can change. A Service uses label selectors to discover matching Pods and provides a consistent destination for clients.",
    objectives: [
      "Explain why Pod IP addresses should not be used as permanent application endpoints.",
      "Choose between ClusterIP, NodePort, LoadBalancer and ExternalName.",
      "Understand selectors, ports, targetPort, named ports and EndpointSlices.",
      "Diagnose empty endpoints, incorrect selectors and application port mismatches.",
      "Design internal and external service exposure safely."
    ],
    sections: [
      {
        heading: "1. Service discovery and the Kubernetes network model",
        explanation:
          "Every Pod receives a cluster-network address, but a Pod is an ephemeral workload instance. A Deployment can replace a failed Pod, scale replicas or perform a rolling update. The replacement Pod can receive a different IP address. A Service provides a stable virtual address and DNS name while Kubernetes continuously tracks the selected backend endpoints.",
        details: [
          "A client normally connects to a Service DNS name such as api.default.svc.cluster.local.",
          "The Service selector matches Pod labels. Matching ready endpoints are published through EndpointSlices.",
          "The cluster network implementation and service proxying components provide the packet-routing behavior.",
          "A Service does not automatically make an application healthy. Readiness probes and correct endpoint selection matter.",
          "Services without selectors can represent manually managed or external endpoints, subject to Kubernetes endpoint configuration."
        ]
      },
      {
        heading: "2. Service types and exposure decisions",
        explanation:
          "The Service type determines how clients can reach the workload. ClusterIP is the default and is appropriate for most internal application-to-application communication. NodePort exposes a port on cluster nodes. LoadBalancer requests an external load-balancing integration from the environment. ExternalName maps a Service DNS name to an external DNS name rather than selecting Pods.",
        details: [
          "ClusterIP: internal virtual IP, normally reachable only from within the cluster network.",
          "NodePort: allocates a port from the configured NodePort range on each eligible node.",
          "LoadBalancer: asks a supported cloud or infrastructure integration to provision a load balancer.",
          "ExternalName: DNS alias behavior; it does not create a proxy or Pod endpoints.",
          "Headless Service: clusterIP: None. DNS can return endpoint addresses instead of a normal virtual ClusterIP.",
          "Choose the least exposed type that satisfies the application's access requirement."
        ]
      },
      {
        heading: "3. Ports, selectors and targetPort",
        explanation:
          "A Service port is the port clients use when connecting to the Service. targetPort is the destination port on each selected Pod. They can differ. A selector must match the actual labels on the Pods, not a Deployment name or an assumed label. Named container ports can make application configuration easier to read.",
        details: [
          "port: the Service-facing port.",
          "targetPort: the container/application destination port; it can be numeric or a named Pod port.",
          "protocol: TCP is common for HTTP applications; UDP is used by workloads that require it.",
          "selector: a key-value label map that must match the target Pods.",
          "A selector mismatch can produce a Service with no usable endpoints.",
          "The containerPort declaration documents and names a port; by itself it does not publish the application outside the Pod."
        ]
      },
      {
        heading: "4. EndpointSlices and traffic readiness",
        explanation:
          "EndpointSlices represent the network endpoints associated with a Service. Kubernetes controllers update them as matching Pods are created, deleted or change readiness. When an application is not ready, its endpoint conditions affect whether it receives normal Service traffic. This is why endpoint inspection is an important troubleshooting step.",
        details: [
          "Inspect endpoints with kubectl get endpointslices -l kubernetes.io/service-name=api.",
          "Check the Pod labels using kubectl get pods --show-labels.",
          "Check readiness conditions and events before changing selectors.",
          "A Service can exist successfully while having zero usable backends.",
          "Readiness probes should represent whether the application can safely receive traffic."
        ]
      },
      {
        heading: "5. DNS, namespaces and application connectivity",
        explanation:
          "Kubernetes DNS publishes names for Services. Within the same namespace, clients commonly use the short Service name. Cross-namespace clients can use service.namespace or the fully qualified service DNS name. DNS resolution and network reachability are separate checks: a name may resolve while a connection still fails.",
        details: [
          "Same namespace: api.",
          "Another namespace: api.backend.",
          "Fully qualified form: api.backend.svc.cluster.local, when the cluster domain is cluster.local.",
          "Verify DNS resolution separately from TCP connectivity.",
          "NetworkPolicy, application binding addresses, routing and readiness can still block traffic."
        ]
      },
      {
        heading: "6. Production design and safe operations",
        explanation:
          "A production Service should select the intended application tier, expose only the necessary port and use a suitable exposure type. External access is usually better handled through a deliberate ingress or load-balancing design instead of exposing every internal application independently.",
        details: [
          "Use consistent labels such as app.kubernetes.io/name and app.kubernetes.io/component.",
          "Keep internal databases and backend APIs on ClusterIP unless a clear external access requirement exists.",
          "Use readiness probes to prevent unready Pods from receiving normal traffic.",
          "Review cloud load-balancer annotations and security boundaries before provisioning.",
          "Plan DNS, TLS termination, health checks and observability for external services.",
          "Avoid changing a live selector without understanding its impact on production endpoints."
        ]
      }
    ],
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: default
  labels:
    app.kubernetes.io/name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/name: api
  template:
    metadata:
      labels:
        app.kubernetes.io/name: api
    spec:
      containers:
        - name: api
          image: nginx:1.27
          ports:
            - name: http
              containerPort: 8080
          readinessProbe:
            tcpSocket:
              port: http
            initialDelaySeconds: 5
            periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: api
  namespace: default
spec:
  type: ClusterIP
  selector:
    app.kubernetes.io/name: api
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: http`,
    brokenYaml: `apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  type: ClusterIP
  selector:
    app: frontend
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 30080`,
    exercises: [
      {
        title: "Exercise 1 — Internal API Service",
        task:
          "Create a ClusterIP Service named orders-api. Select Pods with app: orders-api. Expose Service port 80 and forward traffic to targetPort 8080 using TCP.",
        hint: "Use apiVersion v1, kind Service, spec.selector and spec.ports.",
        solution: `apiVersion: v1
kind: Service
metadata:
  name: orders-api
spec:
  type: ClusterIP
  selector:
    app: orders-api
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 8080`
      },
      {
        title: "Exercise 2 — External access decision",
        task:
          "A development team needs a temporary node-level access path for a test application. Describe the Service type and write the essential fields for a NodePort Service exposing port 80 with nodePort 30080.",
        hint: "NodePort includes a valid nodePort field under the Service port entry.",
        solution: `apiVersion: v1
kind: Service
metadata:
  name: test-web
spec:
  type: NodePort
  selector:
    app: test-web
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 30080`
      },
      {
        title: "Exercise 3 — Selector investigation",
        task:
          "Your Pods have label app.kubernetes.io/name: catalog. Write a Service selector that correctly selects them. Explain why selector app: catalog would not match.",
        hint: "Kubernetes selectors compare exact label keys and values.",
        solution: `spec:
  selector:
    app.kubernetes.io/name: catalog`
      }
    ],
    debugging: [
      {
        symptom: "Service exists but has no endpoints.",
        cause: "The selector does not match Pod labels, Pods are absent, or the Pods are not ready.",
        fix: "Compare kubectl get pods --show-labels with kubectl describe service api. Inspect EndpointSlices and readiness conditions before changing labels."
      },
      {
        symptom: "Connection is refused through the Service.",
        cause: "The application is not listening on targetPort, is bound only to localhost, or the selected backend port is wrong.",
        fix: "Inspect container logs and listening sockets. Confirm targetPort matches the actual application listener and test connectivity directly to a Pod."
      },
      {
        symptom: "Service DNS resolves but the application cannot be reached.",
        cause: "DNS is functioning, but network policy, routing, application readiness or port configuration may prevent the connection.",
        fix: "Test name resolution and TCP connectivity separately. Inspect NetworkPolicies, EndpointSlices, Pod readiness and application logs."
      },
      {
        symptom: "NodePort is unreachable from outside the cluster.",
        cause: "Node firewall rules, routing, node availability or infrastructure security rules may block the allocated port.",
        fix: "Verify the NodePort allocation, node reachability, firewall rules and cluster networking implementation. Do not assume NodePort automatically creates public internet access."
      }
    ],
    scenarios: [
      {
        title: "Production incident — API Service has zero endpoints",
        situation:
          "A deployment succeeds, but the frontend receives intermittent or total connection failures. The Service object exists and DNS resolves, yet no API Pod appears in its EndpointSlices.",
        response:
          "Check the Service selector against Pod labels. Inspect Pod readiness and events. Correct only the mismatched label or selector, verify the EndpointSlices repopulate, and test the Service from a controlled in-cluster client. Record the incident cause and add a deployment validation check."
      },
      {
        title: "Architecture decision — expose a database",
        situation:
          "An application team requests a public LoadBalancer Service for an internal database because the application needs to connect to it.",
        response:
          "Challenge the exposure requirement. Keep the database on ClusterIP and allow the application tier to reach it through internal DNS and explicit network controls. If an external administrative path is necessary, use an approved private connectivity mechanism with authentication and auditing."
      },
      {
        title: "Rolling update — traffic reaches old and new replicas",
        situation:
          "A Deployment is rolling out a new application version. The team observes traffic distribution across multiple replicas.",
        response:
          "Verify that the Service selector intentionally matches both eligible versions. Use readiness probes to control when new replicas become endpoints. If versions need isolated traffic, use distinct labels and separate Services or a deliberate traffic-management layer."
      }
    ],
    quiz: [
      {
        question: "What is the main purpose of a Kubernetes Service?",
        options: [
          "Build a container image",
          "Provide a stable network endpoint for selected workloads",
          "Store application secrets",
          "Schedule Pods onto nodes"
        ],
        answer: 1,
        explanation: "A Service provides stable discovery and access to a logical group of backend endpoints."
      },
      {
        question: "Which field determines the destination port on the selected Pod?",
        options: ["port", "nodePort", "targetPort", "externalName"],
        answer: 2,
        explanation: "targetPort specifies the backend destination port. Service port is the client-facing Service port."
      },
      {
        question: "A Service has no endpoints. What should you inspect first?",
        options: [
          "The Deployment image registry password",
          "The selector and Pod labels",
          "The cluster version only",
          "The Ingress TLS certificate"
        ],
        answer: 1,
        explanation: "The Service selector must match the labels on the intended Pods."
      },
      {
        question: "Which Service type is the default internal exposure type?",
        options: ["NodePort", "LoadBalancer", "ExternalName", "ClusterIP"],
        answer: 3,
        explanation: "ClusterIP provides a stable internal virtual IP by default."
      }
    ]
  },

  Ingress: {
    subtitle: "HTTP and HTTPS routing from external clients to Kubernetes Services",
    purpose:
      "Ingress defines HTTP and HTTPS routing rules that direct incoming requests to Services. An Ingress resource is configuration, not a traffic-handling server by itself. An Ingress controller must be installed and configured to implement those rules. The controller may integrate with a cloud load balancer, reverse proxy or another supported data plane.",
    objectives: [
      "Distinguish an Ingress resource from an Ingress controller.",
      "Understand ingressClassName, hosts, paths and pathType.",
      "Configure Service backends using the networking.k8s.io/v1 API.",
      "Understand TLS secrets and hostname matching.",
      "Troubleshoot controller, DNS, backend and certificate failures."
    ],
    sections: [
      {
        heading: "1. Ingress resource versus Ingress controller",
        explanation:
          "An Ingress resource describes desired HTTP and HTTPS routing. It does not independently accept network traffic. The Ingress controller watches resources and translates their rules into a working routing configuration. Without a compatible, running controller, creating an Ingress object alone does not guarantee that an external request can reach the application.",
        details: [
          "Ingress is an API resource stored by the Kubernetes control plane.",
          "The controller is the implementation that observes Ingress resources.",
          "Different controllers can support different annotations and capabilities.",
          "The controller must be installed, configured and reachable.",
          "Check the controller documentation before using implementation-specific annotations.",
          "The Kubernetes Gateway API is another option for richer traffic-management use cases."
        ]
      },
      {
        heading: "2. Host and path-based routing",
        explanation:
          "Ingress rules can route requests based on the HTTP host and request path. A single public entry point can route api.example.test to one Service and shop.example.test to another. Path rules can direct /api requests and /web requests to different backends. The controller determines the precise proxy behavior.",
        details: [
          "Host rules match the HTTP host header and commonly correspond to DNS names.",
          "Path Prefix matches a path prefix according to Kubernetes path matching semantics.",
          "Exact matches a specific path.",
          "Implementation-specific matching is controller-dependent.",
          "The backend references a Service name and Service port, not an individual Pod IP.",
          "DNS records and external load-balancer routing must direct clients to the controller."
        ]
      },
      {
        heading: "3. ingressClassName and controller ownership",
        explanation:
          "Clusters can run multiple Ingress controllers. ingressClassName identifies the IngressClass intended to handle a resource. The IngressClass connects a class name with a controller implementation. If the class is missing, incorrect or not watched by the controller, the rules may not be programmed.",
        details: [
          "Inspect classes with kubectl get ingressclass.",
          "Inspect controller arguments and class-selection configuration.",
          "Confirm the controller is watching the namespace containing the Ingress.",
          "Do not assume every controller supports the same annotations.",
          "Review controller logs when an Ingress is accepted by the API but not programmed."
        ]
      },
      {
        heading: "4. TLS termination and certificates",
        explanation:
          "Ingress TLS configuration associates hostnames with Kubernetes TLS Secrets. A controller typically terminates HTTPS and then routes the request to a backend Service. The Secret must contain the appropriate certificate and private key data, and the certificate must cover the requested hostname. Some environments use external certificate automation.",
        details: [
          "TLS entries include a hosts list and a secretName.",
          "The Secret is normally type kubernetes.io/tls.",
          "The certificate must be valid for the hostname requested by the client.",
          "Certificate expiration, incomplete chains and hostname mismatches cause client errors.",
          "Protect private keys and restrict who can read or update TLS Secrets.",
          "Backend TLS behavior depends on the selected controller and its configuration."
        ]
      },
      {
        heading: "5. Backend Services and request flow",
        explanation:
          "A typical request flows from a client to DNS, then to an external address or load balancer, then to the Ingress controller, which applies host/path rules and forwards the request to a Service backend. The Service selects eligible Pods. Every hop has separate configuration and health signals.",
        details: [
          "Check DNS and external load-balancer reachability first.",
          "Check controller Pods, Service and logs.",
          "Inspect Ingress rules and status.",
          "Check that backend Service names and ports exist in the expected namespace.",
          "Inspect backend EndpointSlices and application readiness.",
          "Test the backend Service directly to isolate controller routing from application availability."
        ]
      },
      {
        heading: "6. Production routing, security and lifecycle",
        explanation:
          "Production Ingress design needs clear ownership of hostnames, certificates, controller upgrades, routing rules and security controls. A routing rule should expose only the required application paths. Controller-specific rate limiting, request-size limits, authentication and other policies must be reviewed as implementation-specific capabilities rather than assumed portable Kubernetes fields.",
        details: [
          "Use an approved controller and explicit IngressClass.",
          "Automate certificate renewal and monitor certificate expiration.",
          "Review host ownership and DNS changes before cutover.",
          "Avoid exposing administrative endpoints unintentionally.",
          "Test path behavior, redirects, headers and timeouts with realistic requests.",
          "Plan controller high availability, resource limits and upgrade procedures."
        ]
      }
    ],
    yaml: `apiVersion: v1
kind: Service
metadata:
  name: web
  namespace: default
spec:
  type: ClusterIP
  selector:
    app: web
  ports:
    - name: http
      port: 80
      targetPort: 8080
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-routing
  namespace: default
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - app.example.test
      secretName: app-example-tls
  rules:
    - host: app.example.test
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web
                port:
                  number: 80
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api
                port:
                  number: 80`,
    brokenYaml: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: broken-routing
spec:
  rules:
    - host: app.example.test
      http:
        paths:
          - path: /api
            backend:
              service:
                name: api
                port: 8080`,
    exercises: [
      {
        title: "Exercise 1 — Host-based routing",
        task:
          "Create an Ingress named shop-ingress for shop.example.test. Use ingressClassName nginx and route / to Service shop-web on port 80 using Prefix matching.",
        hint: "Use networking.k8s.io/v1 and backend.service.port.number.",
        solution: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: shop-ingress
spec:
  ingressClassName: nginx
  rules:
    - host: shop.example.test
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: shop-web
                port:
                  number: 80`
      },
      {
        title: "Exercise 2 — HTTPS configuration",
        task:
          "Add TLS configuration for secure.example.test using an existing TLS Secret named secure-example-tls.",
        hint: "The TLS section belongs under spec and contains hosts plus secretName.",
        solution: `spec:
  tls:
    - hosts:
        - secure.example.test
      secretName: secure-example-tls`
      },
      {
        title: "Exercise 3 — Separate API route",
        task:
          "Add a /api Prefix path that sends requests to Service backend-api on port 8080.",
        hint: "Add a second entry under the same rule's http.paths list.",
        solution: `- path: /api
  pathType: Prefix
  backend:
    service:
      name: backend-api
      port:
        number: 8080`
      }
    ],
    debugging: [
      {
        symptom: "Ingress object exists, but external requests time out.",
        cause: "The controller may not be installed, may not own the IngressClass, or its external Service/load balancer may not be reachable.",
        fix: "Inspect kubectl get ingressclass, controller Pods, controller Service and external load-balancer status. Confirm DNS points to the intended address."
      },
      {
        symptom: "Ingress returns 404 for a valid hostname.",
        cause: "The host or path rule may not match, or the request may be reaching a default backend or a different controller.",
        fix: "Inspect the exact Host header and URL path, ingressClassName and controller logs. Compare the request with the configured host and pathType."
      },
      {
        symptom: "Ingress returns 503 or reports no available upstream.",
        cause: "The backend Service may have no ready endpoints, or its configured Service port may be wrong.",
        fix: "Inspect the backend Service, its port mapping, EndpointSlices and Pod readiness. Test the backend Service independently."
      },
      {
        symptom: "HTTPS certificate warning appears.",
        cause: "The TLS Secret may be missing, the certificate may not cover the hostname, or the certificate chain may be invalid or expired.",
        fix: "Inspect the TLS Secret metadata and certificate validity using approved secure procedures. Verify the Ingress host and secret reference. Never print private key contents into logs."
      },
      {
        symptom: "Ingress is ignored by the controller.",
        cause: "The resource may reference an IngressClass the controller does not watch, or controller-specific configuration may reject the rule.",
        fix: "Inspect IngressClass, controller startup arguments, events and logs. Confirm the controller supports the resource fields and any annotations used."
      }
    ],
    scenarios: [
      {
        title: "Production cutover — new hostname",
        situation:
          "A team launches a new application hostname. The Ingress object is ready, but customers receive a default backend response.",
        response:
          "Verify DNS points to the intended controller entry point. Check the incoming Host header, Ingress rule, class ownership and backend Service. Test using a controlled Host header before changing public DNS. Roll out the DNS change only after health checks pass."
      },
      {
        title: "TLS expiry incident",
        situation:
          "Browsers report an invalid certificate immediately after a certificate renewal window.",
        response:
          "Check certificate validity, SAN hostname coverage, Secret update time and controller reload status. Confirm the renewed Secret contains a valid certificate/key pair. Check automation events and introduce certificate-expiry monitoring."
      },
      {
        title: "Path routing regression",
        situation:
          "The homepage works, but requests under /api are sent to the frontend application.",
        response:
          "Compare path rules and matching semantics. Confirm the /api rule references the intended Service and port, inspect controller-specific rewrite behavior, and test exact request paths. Add route regression tests to the release process."
      }
    ],
    quiz: [
      {
        question: "Does creating an Ingress resource automatically install a traffic-handling controller?",
        options: ["Yes", "No", "Only for NodePort", "Only for StatefulSets"],
        answer: 1,
        explanation: "Ingress is routing configuration. A compatible Ingress controller must implement it."
      },
      {
        question: "Which API version is used for the stable Kubernetes Ingress API?",
        options: ["v1", "networking.k8s.io/v1", "extensions/v1beta1", "apps/v1"],
        answer: 1,
        explanation: "The stable Ingress API is networking.k8s.io/v1."
      },
      {
        question: "Where is the backend Service port specified in a v1 Ingress?",
        options: [
          "backend.service.port.number",
          "backend.containerPort",
          "spec.targetPort",
          "metadata.port"
        ],
        answer: 0,
        explanation: "The backend references a Service name and its Service port."
      },
      {
        question: "What does ingressClassName identify?",
        options: [
          "A Pod label",
          "The intended IngressClass/controller configuration",
          "A TLS private key",
          "A container image"
        ],
        answer: 1,
        explanation: "IngressClass associates the Ingress resource with a controller implementation."
      }
    ]
  },

  NetworkPolicy: {
    subtitle: "Pod-level network isolation and explicit ingress/egress traffic rules",
    purpose:
      "NetworkPolicy controls network communication involving selected Pods. It can restrict incoming traffic, outgoing traffic or both. Policies are additive: traffic allowed by any applicable policy remains allowed. NetworkPolicy enforcement depends on the cluster network plugin supporting it; creating a policy in a cluster without enforcement support does not provide the expected isolation.",
    objectives: [
      "Understand podSelector and policyTypes.",
      "Distinguish ingress rules from egress rules.",
      "Use namespaceSelector and podSelector correctly.",
      "Understand additive allow rules and default-deny patterns.",
      "Troubleshoot DNS, namespace matching and missing CNI enforcement."
    ],
    sections: [
      {
        heading: "1. NetworkPolicy purpose and enforcement boundary",
        explanation:
          "NetworkPolicy provides a declarative way to control network traffic to and from selected Pods. It is not a replacement for application authentication, authorization, TLS or host-level firewall controls. The cluster network implementation must support and enforce the policy API. Different networking implementations can have different operational details.",
        details: [
          "A NetworkPolicy selects Pods in one namespace.",
          "Ingress controls traffic entering selected Pods.",
          "Egress controls traffic leaving selected Pods.",
          "Policies are enforced by a compatible network plugin or CNI implementation.",
          "A policy object being accepted by the API does not prove that traffic is being filtered.",
          "NetworkPolicy does not automatically provide application-layer identity or HTTP authorization."
        ]
      },
      {
        heading: "2. podSelector and policyTypes",
        explanation:
          "The top-level podSelector determines which Pods are isolated by the policy. An empty podSelector selects all Pods in the policy namespace. policyTypes declares whether ingress, egress or both directions are governed. When a direction is isolated, traffic in that direction must match an applicable allow rule.",
        details: [
          "podSelector.matchLabels selects Pods using exact label keys and values.",
          "podSelector: {} selects every Pod in the policy namespace.",
          "Ingress policy rules describe permitted sources, ports and protocols.",
          "Egress policy rules describe permitted destinations, ports and protocols.",
          "An omitted policyTypes field has Kubernetes-defined defaulting behavior; explicitly declare intended directions for clarity.",
          "Multiple applicable policies combine their allowed traffic; they do not act as ordered deny/allow firewall rules."
        ]
      },
      {
        heading: "3. Ingress peers and namespace isolation",
        explanation:
          "Ingress rules can identify allowed traffic using podSelector, namespaceSelector, ipBlock or combinations supported by the NetworkPolicy API. A namespaceSelector matches namespace labels. A podSelector used alone in a peer selects Pods in the policy's own namespace. Combining namespaceSelector and podSelector in the same peer selects matching Pods in matching namespaces.",
        details: [
          "Use namespace labels to identify trusted application namespaces.",
          "Use pod labels to identify the intended source workload.",
          "Separate list entries can mean alternative allowed peers.",
          "A single peer containing both namespaceSelector and podSelector combines those constraints.",
          "ipBlock is intended for CIDR-based source/destination matching and must be designed with the cluster network topology in mind.",
          "Review label governance because changing labels can change network access."
        ]
      },
      {
        heading: "4. Egress, DNS and dependency access",
        explanation:
          "A default-deny egress policy can isolate outgoing connections. Applications may then fail to resolve DNS, connect to databases, call APIs or reach required external services unless explicit egress rules allow those dependencies. DNS is a frequent hidden dependency because applications often resolve Service names before connecting.",
        details: [
          "Identify DNS resolver Pods, namespaces and ports used by the cluster.",
          "Allow the required DNS protocol and port for the actual cluster DNS deployment.",
          "Allow only the database or external API destinations the application needs.",
          "Check both UDP and TCP DNS behavior where relevant.",
          "Account for service mesh sidecars, monitoring agents and other required dependencies.",
          "Do not blindly copy DNS selectors from another cluster without inspecting its labels and topology."
        ]
      },
      {
        heading: "5. Default-deny and layered allow policies",
        explanation:
          "A default-deny policy selects a group of Pods and declares a traffic direction without allowing peers in its rules. Additional policies can then allow narrowly scoped communication. Because policies are additive, a broad allow policy can unintentionally defeat the isolation intended by a restrictive policy.",
        details: [
          "Create a namespace-scoped baseline with deliberate ownership.",
          "Apply default-deny ingress and egress only after mapping required dependencies.",
          "Add explicit application-to-application allow policies.",
          "Review every policy that selects the same Pods.",
          "Test both allowed and forbidden traffic paths.",
          "Use rollout stages and monitoring to avoid breaking production dependencies."
        ]
      },
      {
        heading: "6. Production security and operational verification",
        explanation:
          "A reliable NetworkPolicy rollout begins with dependency discovery and a tested traffic matrix. Teams should document which workloads communicate, which namespaces are trusted and which external services are required. Enforcement must be verified in the real cluster because policy support and behavior depend on the networking implementation.",
        details: [
          "Verify the CNI supports NetworkPolicy enforcement.",
          "Label namespaces and workloads consistently.",
          "Use least-privilege source, destination and port rules.",
          "Test traffic from representative Pods, not only from an administrator workstation.",
          "Monitor DNS failures, connection timeouts and application errors during rollout.",
          "Keep policy changes under version control and review them like application security changes.",
          "Do not rely on NetworkPolicy alone for encryption or user authentication."
        ]
      }
    ],
    yaml: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-api
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              environment: production
          podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Ingress`,
    brokenYaml: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-isolation
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              environment: production
          podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080
  egress: []`,
    exercises: [
      {
        title: "Exercise 1 — Default-deny ingress",
        task:
          "Create a NetworkPolicy named default-deny-ingress in namespace production. Select every Pod in the namespace and isolate ingress traffic.",
        hint: "Use an empty podSelector and policyTypes containing Ingress. Do not add ingress allow rules.",
        solution: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Ingress`
      },
      {
        title: "Exercise 2 — Allow frontend to API",
        task:
          "Allow Pods labelled app: frontend in namespaces labelled environment: production to connect to app: api Pods on TCP port 8080.",
        hint: "Put namespaceSelector and podSelector in the same peer object.",
        solution: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: frontend-to-api
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              environment: production
          podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080`
      },
      {
        title: "Exercise 3 — Restrict egress",
        task:
          "Select Pods labelled app: reports and create an egress policy that allows TCP connections to destination port 5432 only when an appropriate destination peer rule is supplied. Explain why a broad unrestricted egress rule is unsafe.",
        hint: "Use policyTypes Egress and an egress list with to and ports.",
        solution: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: reports-egress
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: reports
  policyTypes:
    - Egress
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: database
      ports:
        - protocol: TCP
          port: 5432`
      }
    ],
    debugging: [
      {
        symptom: "A policy exists but unwanted traffic is still allowed.",
        cause: "The CNI may not enforce NetworkPolicy, or another applicable policy may allow the same traffic.",
        fix: "Confirm CNI enforcement support and inspect every policy selecting the target Pods. Remember that applicable allow rules are additive."
      },
      {
        symptom: "Frontend cannot reach API after a default-deny rollout.",
        cause: "The source Pod labels, namespace labels or allowed destination port do not match the actual traffic.",
        fix: "Inspect namespace and Pod labels, verify the peer selector structure and test the destination port. Add a narrowly scoped allow policy."
      },
      {
        symptom: "Applications fail to resolve Service DNS names.",
        cause: "Egress isolation blocks traffic to the cluster DNS resolver.",
        fix: "Identify the actual DNS Pods, namespace labels and resolver ports. Add an appropriate DNS egress allowance and verify both UDP and TCP where required."
      },
      {
        symptom: "A rule unexpectedly allows traffic from more Pods than intended.",
        cause: "namespaceSelector and podSelector may have been placed in separate peer list entries, making them alternatives rather than combined constraints.",
        fix: "Place both selectors in the same peer object when the intent is to require both the namespace and Pod labels."
      },
      {
        symptom: "NetworkPolicy YAML is accepted but behavior does not change.",
        cause: "The cluster network implementation may not support policy enforcement or may require a specific configuration.",
        fix: "Verify the installed networking plugin and its NetworkPolicy capabilities. Test from actual Pods and inspect plugin documentation and operational logs."
      }
    ],
    scenarios: [
      {
        title: "Security incident — unrestricted east-west traffic",
        situation:
          "A security review discovers that any workload in a namespace can connect to the internal API and database ports.",
        response:
          "Map legitimate dependencies first. Introduce staged default-deny isolation, then add explicit frontend-to-API and API-to-database allow rules. Test monitoring, DNS and operational dependencies before applying to production."
      },
      {
        title: "Production outage — DNS broken after egress isolation",
        situation:
          "A new egress policy is applied. Applications start reporting name-resolution failures even though their Service resources remain healthy.",
        response:
          "Confirm that DNS queries are blocked. Inspect the actual cluster DNS deployment and its labels. Add a narrowly scoped DNS allowance for the required resolver ports and retest Service discovery."
      },
      {
        title: "Multi-namespace security boundary",
        situation:
          "Frontend Pods in the production namespace must access API Pods in a backend namespace. Other namespaces must remain isolated.",
        response:
          "Use stable namespace labels and workload labels. Create an ingress policy in the backend namespace that combines namespaceSelector and podSelector in the same peer. Verify the intended source and a negative test from an untrusted namespace."
      }
    ],
    quiz: [
      {
        question: "What must be present for NetworkPolicy rules to actually enforce traffic filtering?",
        options: [
          "A compatible network plugin with policy enforcement",
          "An Ingress controller only",
          "A NodePort Service",
          "A Deployment replica count above one"
        ],
        answer: 0,
        explanation: "NetworkPolicy enforcement depends on the cluster networking implementation."
      },
      {
        question: "What does podSelector: {} select?",
        options: [
          "No Pods",
          "All Pods in the policy namespace",
          "All Pods in every cluster namespace",
          "Only system Pods"
        ],
        answer: 1,
        explanation: "An empty top-level podSelector selects all Pods in the NetworkPolicy namespace."
      },
      {
        question: "How do multiple applicable NetworkPolicies combine allowed traffic?",
        options: [
          "The last policy wins",
          "The most restrictive policy always wins",
          "Allowed traffic is additive",
          "Policies are processed alphabetically"
        ],
        answer: 2,
        explanation: "Applicable policies add their allowed traffic; they are not ordered firewall rules."
      },
      {
        question: "How do you require both a namespace label and a Pod label in one peer?",
        options: [
          "Put selectors in separate peer list entries",
          "Put namespaceSelector and podSelector in the same peer object",
          "Use only ipBlock",
          "Put both selectors under policyTypes"
        ],
        answer: 1,
        explanation: "The combined peer object applies both selector constraints together."
      },
      {
        question: "Why might DNS stop working after default-deny egress?",
        options: [
          "DNS requires a LoadBalancer",
          "The policy may block egress to the cluster DNS resolver",
          "A Service cannot have a selector",
          "IngressClass is missing"
        ],
        answer: 1,
        explanation: "DNS is an egress dependency and must be allowed when egress is isolated."
      }
    ]
  }
};

function validateNetworkingYaml(topic: TopicName, source: string) {
  const document = parseDocument(source, { uniqueKeys: true });
  const errors = document.errors.map((error) => error.message);
  const warnings = document.warnings.map((warning) => warning.message);
  const root = document.toJS() as Record<string, any> | undefined;

  if (!errors.length && root && typeof root === "object") {
    if (topic === "Service" && root.kind === "Service") {
      if (!root.metadata?.name) errors.push("Service requires metadata.name.");
      if (!root.spec?.ports?.length) errors.push("Service requires at least one spec.ports entry.");
      if (!root.spec?.selector && root.spec?.type !== "ExternalName") {
        warnings.push("No selector: verify that manually managed endpoints are intentional.");
      }
      for (const [index, port] of (root.spec?.ports ?? []).entries()) {
        if (!port.port) errors.push("Service port entry " + index + " requires port.");
        if (port.targetPort === undefined && root.spec?.type !== "ExternalName") {
          warnings.push("Service port entry " + index + " has no explicit targetPort.");
        }
        if (root.spec?.type !== "NodePort" && port.nodePort !== undefined) {
          warnings.push("nodePort is normally used with NodePort or supported LoadBalancer configurations.");
        }
      }
    }

    if (topic === "Ingress" && root.kind === "Ingress") {
      if (root.apiVersion !== "networking.k8s.io/v1") {
        errors.push("Use the stable networking.k8s.io/v1 Ingress API.");
      }
      if (!root.spec?.rules?.length) warnings.push("No host/path rules are configured.");
      for (const [index, rule] of (root.spec?.rules ?? []).entries()) {
        for (const [pathIndex, path] of (rule.http?.paths ?? []).entries()) {
          const prefix = "Rule " + index + ", path " + pathIndex + ": ";
          if (!path.pathType) errors.push(prefix + "pathType is required.");
          if (!path.backend?.service?.name) errors.push(prefix + "backend Service name is required.");
          if (path.backend?.service?.port?.number === undefined && !path.backend?.service?.port?.name) {
            errors.push(prefix + "backend Service port number or name is required.");
          }
        }
      }
      if (root.spec?.tls?.length && !root.spec?.tls?.every((entry: any) => entry.secretName)) {
        errors.push("Every TLS entry must reference a secretName.");
      }
      warnings.push("Ingress requires a compatible, installed controller; this local check cannot verify controller availability.");
    }

    if (topic === "NetworkPolicy" && root.kind === "NetworkPolicy") {
      if (!root.spec?.podSelector) errors.push("NetworkPolicy requires spec.podSelector.");
      if (!root.spec?.policyTypes?.length) {
        warnings.push("Declare policyTypes explicitly to make intended isolation directions clear.");
      }
      const allowedTypes = ["Ingress", "Egress"];
      for (const type of root.spec?.policyTypes ?? []) {
        if (!allowedTypes.includes(type)) errors.push("Unsupported policyType: " + type);
      }
      for (const rule of root.spec?.ingress ?? []) {
        for (const peer of rule.from ?? []) {
          if (peer.namespaceSelector && peer.podSelector) {
            // Both selectors in one peer are a combined constraint.
          }
        }
      }
      warnings.push("This check cannot verify CNI NetworkPolicy enforcement or live cluster behavior.");
    }

    if (root.kind && root.kind !== topic) {
      warnings.push("The selected topic is " + topic + " but this YAML resource kind is " + root.kind + ".");
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

export default function YamlKubernetesNetworkingWorkspace({
  topic,
  tab
}: {
  topic: string;
  tab: string;
}) {
  const selectedTopic: TopicName =
    topic === "Ingress" || topic === "NetworkPolicy" ? topic : "Service";

  const lesson = content[selectedTopic];
  const [yaml, setYaml] = useState(lesson.yaml);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showBroken, setShowBroken] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const validation = useMemo(
    () => validateNetworkingYaml(selectedTopic, yaml),
    [selectedTopic, yaml]
  );

  const score = lesson.quiz.reduce(
    (total, question, index) => total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  const normalizedTab = tab.toLowerCase();

  function resetEditor() {
    setYaml(lesson.yaml);
    setShowBroken(false);
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-cyan-900/60 bg-gradient-to-br from-[#10283a] to-[#0d1523] p-5 sm:p-7">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
          Kubernetes Networking Laboratory
        </div>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{selectedTopic}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{lesson.subtitle}</p>
        <p className="mt-4 text-sm leading-7 text-slate-400">{lesson.purpose}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-cyan-800 px-3 py-1 text-xs text-cyan-200">Deep learning</span>
          <span className="rounded-full border border-cyan-800 px-3 py-1 text-xs text-cyan-200">YAML validation</span>
          <span className="rounded-full border border-cyan-800 px-3 py-1 text-xs text-cyan-200">Hands-on lab</span>
          <span className="rounded-full border border-cyan-800 px-3 py-1 text-xs text-cyan-200">Production debugging</span>
        </div>
      </section>

      {normalizedTab === "learn" && (
        <section className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
            <h3 className="text-lg font-semibold text-white">Learning objectives</h3>
            <ul className="mt-3 space-y-2">
              {lesson.objectives.map((objective) => (
                <li key={objective} className="flex gap-3 text-sm leading-6 text-slate-300">
                  <span className="text-cyan-400">✓</span><span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
          {lesson.sections.map((section, index) => (
            <article key={section.heading} className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
              <div className="text-xs font-semibold text-cyan-300">CONCEPT {String(index + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 text-lg font-semibold text-white">{section.heading}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{section.explanation}</p>
              <ul className="mt-4 space-y-2">
                {section.details.map((detail) => (
                  <li key={detail} className="flex gap-2 text-sm leading-6 text-slate-400">
                    <span className="text-cyan-500">•</span><span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      )}

      {normalizedTab === "examples" && (
        <section className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
            <h3 className="text-lg font-semibold text-white">Complete configuration walkthrough</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Study the resource structure, API version, metadata, selectors, ports and relationships before using the configuration.
            </p>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-[#070c14] p-5 text-xs leading-6 text-cyan-100"><code>{lesson.yaml}</code></pre>
          <div className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
            <h3 className="font-semibold text-white">How to read this example</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Identify the API group and version, resource kind, metadata identity and namespace, then inspect each spec field. Follow every reference to its related Service, Pod labels, port or Secret. A valid YAML document can still contain incorrect Kubernetes relationships, so inspect both syntax and resource semantics.
            </p>
          </div>
        </section>
      )}

      {(normalizedTab === "practice" || normalizedTab === "scenarios") && (
        <section className="space-y-4">
          {normalizedTab === "practice" ? lesson.exercises.map((exercise, index) => (
            <article key={exercise.title} className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
              <div className="text-xs font-semibold text-cyan-300">PRACTICE {index + 1}</div>
              <h3 className="mt-2 text-lg font-semibold text-white">{exercise.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{exercise.task}</p>
              <details className="mt-4 rounded-lg bg-slate-950 p-3">
                <summary className="cursor-pointer text-sm font-medium text-amber-300">Show hint</summary>
                <p className="mt-2 text-sm leading-6 text-slate-400">{exercise.hint}</p>
              </details>
              <button type="button" onClick={() => setShowSolutions((value) => !value)} className="mt-3 rounded-lg border border-cyan-800 px-3 py-2 text-xs text-cyan-200">
                {showSolutions ? "Hide solution" : "Reveal solution"}
              </button>
              {showSolutions && <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-green-200"><code>{exercise.solution}</code></pre>}
            </article>
          )) : lesson.scenarios.map((scenario) => (
            <article key={scenario.title} className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
              <div className="text-xs font-semibold text-amber-300">PRODUCTION INCIDENT</div>
              <h3 className="mt-2 text-lg font-semibold text-white">{scenario.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{scenario.situation}</p>
              <div className="mt-4 rounded-lg border border-emerald-900/60 bg-emerald-950/20 p-4">
                <div className="text-xs font-semibold text-emerald-300">ENGINEERING RESPONSE</div>
                <p className="mt-2 text-sm leading-7 text-slate-300">{scenario.response}</p>
              </div>
            </article>
          ))}
        </section>
      )}

      {normalizedTab === "debug" && (
        <section className="space-y-4">
          <div className="rounded-xl border border-amber-900/50 bg-amber-950/20 p-5">
            <h3 className="font-semibold text-amber-200">Debugging laboratory</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Select a failure symptom, identify the most likely layer, gather evidence and validate the proposed correction before applying it to a cluster.
            </p>
          </div>
          {lesson.debugging.map((item, index) => (
            <article key={item.symptom} className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
              <div className="text-xs text-cyan-300">CASE {String(index + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 font-semibold text-white">{item.symptom}</h3>
              <p className="mt-3 text-sm leading-6 text-amber-200"><strong>Likely cause:</strong> {item.cause}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300"><strong className="text-emerald-300">Investigation and fix:</strong> {item.fix}</p>
            </article>
          ))}
        </section>
      )}

      {(normalizedTab === "validate" || normalizedTab === "practice") && (
        <section className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">Interactive YAML editor</h3>
                <p className="mt-1 text-xs text-slate-400">Edit the manifest and run local syntax plus topic-specific semantic checks.</p>
              </div>
              <button type="button" onClick={resetEditor} className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300">Reset example</button>
            </div>
            <textarea
              value={yaml}
              onChange={(event) => setYaml(event.target.value)}
              spellCheck={false}
              aria-label={selectedTopic + " YAML editor"}
              className="mt-4 min-h-[420px] w-full resize-y rounded-xl border border-slate-700 bg-[#070c14] p-4 font-mono text-xs leading-6 text-cyan-100 outline-none focus:border-cyan-600"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={"rounded-full px-3 py-1 text-xs " + (validation.valid ? "bg-emerald-950 text-emerald-300" : "bg-red-950 text-red-300")}>
                {validation.valid ? "Syntax and configured checks passed" : "Validation errors found"}
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {validation.errors.length} errors
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {validation.warnings.length} warnings
              </span>
            </div>
            {validation.errors.map((error, index) => (
              <p key={index} className="mt-2 text-sm text-red-300">Error: {error}</p>
            ))}
            {validation.warnings.map((warning, index) => (
              <p key={index} className="mt-2 text-sm text-amber-300">Warning: {warning}</p>
            ))}
            <p className="mt-4 text-xs leading-5 text-slate-500">
              These are local YAML parser and topic-specific checks, not a complete Kubernetes API server or cluster validation. Use kubectl apply --dry-run=server with the intended cluster and permissions for server-side validation.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
            <h3 className="font-semibold text-white">Intentional faulty configuration</h3>
            <p className="mt-2 text-sm text-slate-400">Study the incorrect example and identify its structural or semantic problems.</p>
            <button type="button" onClick={() => { setYaml(lesson.brokenYaml); setShowBroken(true); }} className="mt-3 rounded-lg border border-amber-800 px-3 py-2 text-xs text-amber-200">
              Load broken example into editor
            </button>
            {showBroken && <p className="mt-3 text-xs text-amber-300">Broken example loaded. Inspect the validation output above.</p>}
          </div>
        </section>
      )}

      {normalizedTab === "quiz" && (
        <section className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
            <h3 className="text-lg font-semibold text-white">Knowledge assessment</h3>
            <p className="mt-2 text-sm text-slate-400">Choose one answer for each question, then submit to calculate your score.</p>
          </div>
          {lesson.quiz.map((question, index) => (
            <article key={question.question} className="rounded-xl border border-slate-800 bg-[#0d1523] p-5">
              <h3 className="font-semibold text-white">{index + 1}. {question.question}</h3>
              <div className="mt-4 space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label key={option} className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-800 p-3 text-sm text-slate-300 hover:border-cyan-800">
                    <input
                      type="radio"
                      name={"networking-quiz-" + index}
                      checked={answers[index] === optionIndex}
                      onChange={() => { setAnswers((previous) => ({ ...previous, [index]: optionIndex })); setSubmitted(false); }}
                      className="mt-1 accent-cyan-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {submitted && (
                <div className={"mt-3 rounded-lg p-3 text-sm " + (answers[index] === question.answer ? "bg-emerald-950/40 text-emerald-300" : "bg-red-950/40 text-red-300")}>
                  {answers[index] === question.answer ? "Correct." : "Incorrect."} {question.explanation}
                </div>
              )}
            </article>
          ))}
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length !== lesson.quiz.length} className="rounded-lg bg-cyan-700 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">
              Submit assessment
            </button>
            <button type="button" onClick={() => { setAnswers({}); setSubmitted(false); }} className="rounded-lg border border-slate-700 px-4 py-3 text-sm text-slate-300">
              Retake quiz
            </button>
            {submitted && <span className="text-sm font-semibold text-cyan-200">Score: {score}/{lesson.quiz.length} ({Math.round(score / lesson.quiz.length * 100)}%)</span>}
          </div>
        </section>
      )}
    </div>
  );
}